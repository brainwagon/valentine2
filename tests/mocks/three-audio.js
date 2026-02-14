export const AudioListener = jest.fn(() => ({
    position: { set: jest.fn() },
    rotation: { set: jest.fn() }
}));
export const Audio = jest.fn(() => ({
    setBuffer: jest.fn(),
    setLoop: jest.fn(),
    setVolume: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    isPlaying: false
}));
export const AudioLoader = jest.fn(() => ({
    load: jest.fn()
}));
