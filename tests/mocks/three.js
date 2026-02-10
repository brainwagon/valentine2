export const Scene = jest.fn(() => ({ add: jest.fn() }));
export const PerspectiveCamera = jest.fn(() => ({ position: { set: jest.fn() }, lookAt: jest.fn() }));
export const WebGLRenderer = jest.fn(() => ({ 
    setSize: jest.fn(), 
    render: jest.fn(), 
    domElement: document.createElement('canvas'),
    setPixelRatio: jest.fn(),
    setAnimationLoop: jest.fn()
}));
export const AmbientLight = jest.fn();
export const DirectionalLight = jest.fn(() => ({ position: { set: jest.fn() } }));
export const Points = jest.fn(() => ({ rotation: { y: 0 } }));
export const BufferGeometry = jest.fn(() => ({ setAttribute: jest.fn() }));
export const Float32BufferAttribute = jest.fn();
export const PointsMaterial = jest.fn();
export const Color = jest.fn();
export const MathUtils = { randFloatSpread: jest.fn(() => 0.5) };
export const BoxGeometry = jest.fn();
export const MeshStandardMaterial = jest.fn();
export const Mesh = jest.fn(() => ({ position: { set: jest.fn() } }));
