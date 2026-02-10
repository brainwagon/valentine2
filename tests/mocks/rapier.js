export const init = jest.fn(() => Promise.resolve());
export const World = jest.fn(() => ({
    free: jest.fn(),
    step: jest.fn(),
    createRigidBody: jest.fn(() => ({
        translation: jest.fn(() => ({ x: 0, y: 0, z: 0 })),
        rotation: jest.fn(() => ({ x: 0, y: 0, z: 0, w: 1 })),
        handle: 0
    })),
    createCollider: jest.fn(),
    removeRigidBody: jest.fn(),
}));

export const EventQueue = jest.fn(() => ({
    drainCollisionEvents: jest.fn(),
}));

export const ActiveEvents = {
    COLLISION_EVENTS: 1,
};

const mockDesc = {
    setTranslation: jest.fn().mockReturnThis(),
    setRotation: jest.fn().mockReturnThis(),
    setRestitution: jest.fn().mockReturnThis(),
    setFriction: jest.fn().mockReturnThis(),
    setActiveEvents: jest.fn().mockReturnThis(),
};

export const RigidBodyDesc = {
    fixed: jest.fn(() => mockDesc),
    dynamic: jest.fn(() => mockDesc),
};
export const ColliderDesc = {
    cuboid: jest.fn(() => mockDesc),
    ball: jest.fn(() => mockDesc),
    trimesh: jest.fn(() => mockDesc),
};