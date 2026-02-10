import { init } from '../main.js';
import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';

describe('Platform Creation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('creates a Three.js platform and a Rapier rigid body', async () => {
    await init();

    // Three.js
    expect(THREE.BoxGeometry).toHaveBeenCalledWith(5, 0.5, 5);
    expect(THREE.Mesh).toHaveBeenCalled();
    const sceneInstance = THREE.Scene.mock.results[0].value;
    expect(sceneInstance.add).toHaveBeenCalledWith(expect.any(Object));

    // Rapier
    expect(RAPIER.RigidBodyDesc.fixed).toHaveBeenCalled();
    const worldInstance = RAPIER.World.mock.results[0].value;
    expect(worldInstance.createRigidBody).toHaveBeenCalled();
    expect(RAPIER.ColliderDesc.cuboid).toHaveBeenCalledWith(2.5, 0.25, 2.5);
    expect(worldInstance.createCollider).toHaveBeenCalled();
  });
});
