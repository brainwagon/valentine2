export const init = jest.fn(() => Promise.resolve());
export const World = jest.fn(() => ({
    free: jest.fn(),
    step: jest.fn(),
    createRigidBody: jest.fn(),
    createCollider: jest.fn(),
}));