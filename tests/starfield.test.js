import { init } from '../main.js';
import * as THREE from 'three';

describe('Starfield Background', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('creates a starfield (InstancedMesh) and adds it to the scene', async () => {
    await init();

    // Verify InstancedMesh creation
    expect(THREE.InstancedMesh).toHaveBeenCalled();
    expect(THREE.ShapeGeometry).toHaveBeenCalled();
    expect(THREE.MeshBasicMaterial).toHaveBeenCalledWith(expect.objectContaining({ color: 0xffff00 }));

    // Verify it was added to the scene
    const sceneInstance = THREE.Scene.mock.results[0].value;
    const starfieldInstance = THREE.InstancedMesh.mock.instances[0];
    expect(sceneInstance.add).toHaveBeenCalledWith(starfieldInstance);
  });

  test('sets up animation loop', async () => {
      await init();
      const rendererInstance = THREE.WebGLRenderer.mock.results[0].value;
      expect(rendererInstance.setAnimationLoop).toHaveBeenCalledWith(expect.any(Function));
  });
});
