export const OrbitControls = jest.fn(() => ({ update: jest.fn() }));
export const EffectComposer = jest.fn(() => ({
    addPass: jest.fn(),
    render: jest.fn(),
    setSize: jest.fn(),
    setPixelRatio: jest.fn()
}));
export const RenderPass = jest.fn();
export const UnrealBloomPass = jest.fn(() => ({
    threshold: 0,
    strength: 1,
    radius: 0
}));