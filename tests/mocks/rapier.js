export const init = jest.fn(() => Promise.resolve());
export const World = jest.fn(() => ({
    free: jest.fn(),
    step: jest.fn(),
    createRigidBody: jest.fn(),
    createCollider: jest.fn(),
}));
export const RigidBodyDesc = {
    fixed: jest.fn(() => ({ setTranslation: jest.fn() })),
    dynamic: jest.fn(() => ({ setTranslation: jest.fn() })),
};
export const ColliderDesc = {
    cuboid: jest.fn(() => ({ setRestitution: jest.fn(), setFriction: jest.fn() })),
};
