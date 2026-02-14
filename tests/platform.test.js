import { init } from '../main.js';
import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';

describe('Platform Creation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('creates a bowl-shaped platform and a Rapier trimesh collider', async () => {
    await init();

    // Three.js
    expect(THREE.LatheGeometry).toHaveBeenCalled();
    expect(THREE.MeshStandardMaterial).toHaveBeenCalledWith(expect.objectContaining({
        color: 0xD4AF37,
        metalness: 1.0,
        roughness: 0.5
    }));
    expect(THREE.Mesh).toHaveBeenCalled();
    const sceneInstance = THREE.Scene.mock.results[0].value;
    expect(sceneInstance.add).toHaveBeenCalledWith(expect.any(Object));

    // Rapier
    expect(RAPIER.RigidBodyDesc.fixed).toHaveBeenCalled();
    const worldInstance = RAPIER.World.mock.results[0].value;
    expect(worldInstance.createRigidBody).toHaveBeenCalled();
    expect(RAPIER.ColliderDesc.trimesh).toHaveBeenCalled();
    expect(worldInstance.createCollider).toHaveBeenCalled();
  });
});
