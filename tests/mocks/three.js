export const Scene = jest.fn(() => ({ add: jest.fn() }));
export const PerspectiveCamera = jest.fn(() => ({ position: { set: jest.fn() }, lookAt: jest.fn() }));
export const WebGLRenderer = jest.fn(() => ({ 
    setSize: jest.fn(), 
    render: jest.fn(), 
    domElement: document.createElement('canvas'),
    setPixelRatio: jest.fn()
}));
export const AmbientLight = jest.fn();
export const DirectionalLight = jest.fn(() => ({ position: { set: jest.fn() } }));
