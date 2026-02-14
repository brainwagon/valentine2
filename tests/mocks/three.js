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
    setAnimationLoop: jest.fn(),
    setClearColor: jest.fn(),
}));
export const AmbientLight = jest.fn();
export const DirectionalLight = jest.fn(() => ({ position: { set: jest.fn() } }));
export const Points = jest.fn(() => ({ 
    rotation: { y: 0 },
    geometry: { attributes: { position: { array: new Float32Array(100) } } },
    material: { opacity: 1 }
}));
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
export const SphereGeometry = jest.fn(() => ({
    center: jest.fn(),
    dispose: jest.fn(),
    computeVertexNormals: jest.fn(),
    attributes: {
        position: {
            array: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
            count: 3
        }
    },
    index: {
        array: new Uint32Array([0, 1, 2]),
        count: 3
    }
}));
export const LatheGeometry = jest.fn(() => ({
    center: jest.fn(),
    dispose: jest.fn(),
    computeVertexNormals: jest.fn(),
    attributes: {
        position: {
            array: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
            count: 3
        }
    },
    index: {
        array: new Uint32Array([0, 1, 2]),
        count: 3
    }
}));
export const Matrix4 = jest.fn(() => ({
    makeTranslation: jest.fn().mockReturnThis(),
    makeRotationX: jest.fn().mockReturnThis(),
    makeRotationY: jest.fn().mockReturnThis(),
    makeRotationZ: jest.fn().mockReturnThis(),
    makeScale: jest.fn().mockReturnThis(),
    compose: jest.fn().mockReturnThis(),
    identity: jest.fn().mockReturnThis(),
    multiply: jest.fn().mockReturnThis(),
    setPosition: jest.fn().mockReturnThis(),
}));
export const InstancedMesh = jest.fn(() => ({
    setMatrixAt: jest.fn(),
    instanceMatrix: { needsUpdate: false },
    rotation: { y: 0 },
    position: { set: jest.fn() },
    add: jest.fn(),
    rotateOnAxis: jest.fn(),
    userData: {}
}));
export const ShapeGeometry = jest.fn(() => ({
    dispose: jest.fn(),
    center: jest.fn()
}));
export const PlaneGeometry = jest.fn();
export const MeshStandardMaterial = jest.fn(() => ({
    dispose: jest.fn()
}));
export const MeshBasicMaterial = jest.fn(() => ({
    dispose: jest.fn()
}));
export const ShaderMaterial = jest.fn(() => ({
    dispose: jest.fn()
}));
export const Mesh = jest.fn(() => ({ 
    position: { set: jest.fn(), copy: jest.fn() },
    quaternion: { set: jest.fn(), copy: jest.fn() },
    rotation: { set: jest.fn(), y: 0 },
    geometry: { dispose: jest.fn() },
    material: { dispose: jest.fn() },
    add: jest.fn(),
    rotateOnAxis: jest.fn(),
    userData: {},
    children: []
}));
export const Shape = jest.fn(() => ({
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    bezierCurveTo: jest.fn(),
}));
export const ExtrudeGeometry = jest.fn(() => ({
    center: jest.fn(),
    dispose: jest.fn(),
    computeVertexNormals: jest.fn(),
    groups: []
}));
export const Quaternion = jest.fn(() => ({ 
    set: jest.fn(), 
    copy: jest.fn(),
    clone: jest.fn().mockReturnThis(),
    multiply: jest.fn().mockReturnThis(),
    setFromAxisAngle: jest.fn().mockReturnThis(),
    setFromEuler: jest.fn().mockReturnThis() 
}));
export const Vector3 = jest.fn((x = 0, y = 0, z = 0) => ({ 
    x, y, z,
    set: jest.fn(function(nx, ny, nz) { this.x = nx; this.y = ny; this.z = nz; return this; }), 
    copy: jest.fn(function(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }), 
    clone: jest.fn(function() { return { ...this }; }),
    normalize: jest.fn().mockReturnThis(),
    sub: jest.fn(function(v) { 
        return { 
            lengthSq: jest.fn(() => {
                const dx = this.x - v.x;
                const dy = this.y - v.y;
                const dz = this.z - v.z;
                return dx * dx + dy * dy + dz * dz;
            }) 
        };
    }),
    distanceToSquared: jest.fn(function(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }),
    distanceTo: jest.fn(function(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }),
    dot: jest.fn(function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }),
    multiplyScalar: jest.fn(function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    })
}));
export const Euler = jest.fn(() => ({
    set: jest.fn()
}));
export const Raycaster = jest.fn(() => ({
    setFromCamera: jest.fn(),
    intersectObjects: jest.fn(() => [])
}));
export const Vector2 = jest.fn(() => ({ set: jest.fn() }));
export const AdditiveBlending = 1;
export const FrontSide = 0;
export const DoubleSide = 2;
export const CanvasTexture = jest.fn(() => ({
    colorSpace: '',
    needsUpdate: false
}));
export const AudioListener = jest.fn(() => ({
    position: { set: jest.fn() },
    rotation: { set: jest.fn() },
    context: { 
        state: 'suspended', 
        resume: jest.fn(function() { this.state = 'running'; }) 
    }
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
    load: jest.fn((url, onLoad) => {
        if (onLoad) onLoad({});
    })
}));
