import { init } from '../main.js';
import * as THREE from 'three';

describe('Starfield Background', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('creates a starfield (Points) and adds it to the scene', async () => {
    await init();

    // Verify Points creation
    expect(THREE.Points).toHaveBeenCalled();
    expect(THREE.BufferGeometry).toHaveBeenCalled();
    expect(THREE.PointsMaterial).toHaveBeenCalled();

    // Verify it was added to the scene
    // We need to capture the scene instance created in init
    const sceneInstance = THREE.Scene.mock.results[0].value;
    const pointsInstance = THREE.Points.mock.instances[0];
    expect(sceneInstance.add).toHaveBeenCalledWith(pointsInstance);
  });

  test('sets up animation loop', async () => {
      await init();
      const rendererInstance = THREE.WebGLRenderer.mock.results[0].value;
      expect(rendererInstance.setAnimationLoop).toHaveBeenCalledWith(expect.any(Function));
  });
});
