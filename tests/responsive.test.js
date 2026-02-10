import { init } from '../main.js';
import * as THREE from 'three';

describe('Responsive Fixes: Window Resize', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('updates camera aspect and renderer size on resize', async () => {
    await init();
    
    // Trigger resize event
    window.innerWidth = 500;
    window.innerHeight = 500;
    window.dispatchEvent(new Event('resize'));

    const cameraInstance = THREE.PerspectiveCamera.mock.results[0].value;
    expect(cameraInstance.aspect).toBe(1);
    expect(cameraInstance.updateProjectionMatrix).toHaveBeenCalled();

    const rendererInstance = THREE.WebGLRenderer.mock.results[0].value;
    expect(rendererInstance.setSize).toHaveBeenCalledWith(500, 500);
    
    const composerInstance = THREE.EffectComposer ? THREE.EffectComposer.mock.results[0].value : null;
    if (composerInstance) {
        expect(composerInstance.setSize).toHaveBeenCalledWith(500, 500);
    }
  });
});
