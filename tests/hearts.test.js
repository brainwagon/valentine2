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

  test('spawns hearts at an increased rate (average 0.5s)', async () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5); // delay will be 500ms
    await init();
    
    // First spawn after 500ms
    jest.advanceTimersByTime(501); 
    expect(THREE.ExtrudeGeometry).toHaveBeenCalledTimes(1);
    
    // Second spawn after another 500ms
    jest.advanceTimersByTime(500);
    expect(THREE.ExtrudeGeometry).toHaveBeenCalledTimes(2);

    randomSpy.mockRestore();
  });

  test('deletes hearts that fall below y = -12', async () => {
    await init();
    
    // Spawn a heart
    jest.advanceTimersByTime(1000);
    
    const worldInstance = RAPIER.World.mock.results[RAPIER.World.mock.results.length - 1].value;
    
    // The first body created is the platform (fixed), the second is the spawned heart (dynamic)
    const heartBodyInstance = worldInstance.createRigidBody.mock.results[1].value;
    heartBodyInstance.translation.mockReturnValue({ x: 0, y: -13, z: 0 });
    
    const rendererInstance = THREE.WebGLRenderer.mock.results[THREE.WebGLRenderer.mock.results.length - 1].value;
    const animateCallback = rendererInstance.setAnimationLoop.mock.calls[0][0];
    
    animateCallback(); // This should trigger cleanup

    const sceneInstance = THREE.Scene.mock.results[THREE.Scene.mock.results.length - 1].value;
    expect(sceneInstance.remove).toHaveBeenCalled();
    expect(worldInstance.removeRigidBody).toHaveBeenCalledWith(heartBodyInstance);
  });
});