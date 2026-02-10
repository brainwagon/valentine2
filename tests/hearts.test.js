import { init } from '../main.js';
import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';

describe('Heart Spawning & Physics', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('spawns a heart every second', async () => {
    await init();
    
    jest.advanceTimersByTime(1000);
    expect(THREE.ExtrudeGeometry).toHaveBeenCalled();
    expect(RAPIER.RigidBodyDesc.dynamic).toHaveBeenCalled();
    expect(RAPIER.ColliderDesc.ball).toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(THREE.ExtrudeGeometry).toHaveBeenCalledTimes(2);
  });

  test('deletes hearts that fall below y = -10', async () => {
    await init();
    
    // Spawn a heart
    jest.advanceTimersByTime(1000);
    
    const worldInstance = RAPIER.World.mock.results[RAPIER.World.mock.results.length - 1].value;
    
    // The first body created is the platform (fixed), the second is the spawned heart (dynamic)
    const heartBodyInstance = worldInstance.createRigidBody.mock.results[1].value;
    heartBodyInstance.translation.mockReturnValue({ x: 0, y: -11, z: 0 });
    
    const rendererInstance = THREE.WebGLRenderer.mock.results[THREE.WebGLRenderer.mock.results.length - 1].value;
    const animateCallback = rendererInstance.setAnimationLoop.mock.calls[0][0];
    
    animateCallback(); // This should trigger cleanup

    const sceneInstance = THREE.Scene.mock.results[THREE.Scene.mock.results.length - 1].value;
    expect(sceneInstance.remove).toHaveBeenCalled();
    expect(worldInstance.removeRigidBody).toHaveBeenCalledWith(heartBodyInstance);
  });
});