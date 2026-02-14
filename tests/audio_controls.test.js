import { init } from '../main.js';
import * as THREE from 'three';

describe('Audio Controls UI', () => {
    let playPauseBtn, rewindBtn, stopBtn, playIcon, pauseIcon;

    beforeEach(async () => {
        document.body.innerHTML = `
            <div id="ui">
                <div id="audio-controls">
                    <button id="rewind-button"></button>
                    <button id="stop-button"></button>
                    <button id="play-pause-button">
                        <svg id="play-icon"></svg>
                        <svg id="pause-icon"></svg>
                    </button>
                </div>
            </div>
        `;
        jest.clearAllMocks();
        await init();
        
        playPauseBtn = document.getElementById('play-pause-button');
        rewindBtn = document.getElementById('rewind-button');
        stopBtn = document.getElementById('stop-button');
        playIcon = document.getElementById('play-icon');
        pauseIcon = document.getElementById('pause-icon');
    });

    test('play/pause button toggles audio and icons', () => {
        const audioInstance = THREE.Audio.mock.results[0].value;
        audioInstance.buffer = {}; // Mock buffer existence
        audioInstance.isPlaying = false;
        
        // Trigger play
        playPauseBtn.click();
        expect(audioInstance.play).toHaveBeenCalled();
        expect(playIcon.style.display).toBe('none');
        expect(pauseIcon.style.display).toBe('block');

        // Trigger pause
        audioInstance.isPlaying = true;
        playPauseBtn.click();
        expect(audioInstance.pause).toHaveBeenCalled();
        expect(playIcon.style.display).toBe('block');
        expect(pauseIcon.style.display).toBe('none');
    });

    test('rewind button stops and re-plays if it was playing', () => {
        const audioInstance = THREE.Audio.mock.results[0].value;
        audioInstance.buffer = {}; // Mock buffer existence
        audioInstance.isPlaying = true;
        
        rewindBtn.click();
        expect(audioInstance.stop).toHaveBeenCalled();
        expect(audioInstance.play).toHaveBeenCalled();
    });

    test('stop button resets audio and icons', () => {
        const audioInstance = THREE.Audio.mock.results[0].value;
        audioInstance.buffer = {}; // Mock buffer existence
        audioInstance.isPlaying = true;
        
        stopBtn.click();
        expect(audioInstance.stop).toHaveBeenCalled();
        expect(playIcon.style.display).toBe('block');
        expect(pauseIcon.style.display).toBe('none');
    });

    test('global click does NOT start audio', () => {
        const audioInstance = THREE.Audio.mock.results[0].value;
        audioInstance.buffer = {}; // Mock buffer existence
        audioInstance.isPlaying = false;
        
        window.dispatchEvent(new MouseEvent('click'));
        
        expect(audioInstance.play).not.toHaveBeenCalled();
    });

    test('audio onEnded resets icons', () => {
        const audioInstance = THREE.Audio.mock.results[0].value;
        
        // Setup initial state as playing
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        
        // Trigger onEnded
        if (audioInstance.onEnded) {
            audioInstance.onEnded();
        }
        
        expect(playIcon.style.display).toBe('block');
        expect(pauseIcon.style.display).toBe('none');
    });
});
