export const Scene = jest.fn(() => ({ add: jest.fn(), remove: jest.fn() }));
export const PerspectiveCamera = jest.fn(() => ({ 
    position: { set: jest.fn() }, 
    lookAt: jest.fn(),
    add: jest.fn(),
    updateProjectionMatrix: jest.fn()
}));
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
export const BufferGeometry = jest.fn(() => ({ 
    setAttribute: jest.fn(),
    center: jest.fn(),
    dispose: jest.fn()
}));
export const Float32BufferAttribute = jest.fn();
export const PointsMaterial = jest.fn();
export const Color = jest.fn();
export const MathUtils = { 
    randFloatSpread: jest.fn((range) => (Math.random() - 0.5) * range),
    randFloat: jest.fn((low, high) => Math.random() * (high - low) + low)
};
export const BoxGeometry = jest.fn(() => ({
    center: jest.fn(),
    dispose: jest.fn()
}));
export const MeshStandardMaterial = jest.fn(() => ({
    dispose: jest.fn()
}));
export const Mesh = jest.fn(() => ({ 
    position: { set: jest.fn(), copy: jest.fn() },
    quaternion: { set: jest.fn(), copy: jest.fn() },
    geometry: { dispose: jest.fn() },
    material: { dispose: jest.fn() }
}));
export const Shape = jest.fn(() => ({
    moveTo: jest.fn(),
    bezierCurveTo: jest.fn(),
}));
export const ExtrudeGeometry = jest.fn(() => ({
    center: jest.fn(),
    dispose: jest.fn()
}));
export const Quaternion = jest.fn(() => ({ 
    set: jest.fn(), 
    copy: jest.fn(),
    setFromEuler: jest.fn().mockReturnThis() 
}));
export const Vector3 = jest.fn(() => ({ set: jest.fn(), copy: jest.fn(), sub: jest.fn(() => ({ lengthSq: jest.fn(() => 0) })) }));
export const Euler = jest.fn();
export const Raycaster = jest.fn(() => ({
    setFromCamera: jest.fn(),
    intersectObjects: jest.fn(() => [])
}));
export const Vector2 = jest.fn(() => ({ set: jest.fn() }));
export const AdditiveBlending = 1;
export const AudioListener = jest.fn(() => ({
    position: { set: jest.fn() },
    rotation: { set: jest.fn() }
}));
export const Audio = jest.fn(() => ({
    setBuffer: jest.fn(),
    setLoop: jest.fn(),
    setVolume: jest.fn(),
    play: jest.fn(),
    stop: jest.fn(),
    isPlaying: false
}));
export const AudioLoader = jest.fn(() => ({
    load: jest.fn()
}));

