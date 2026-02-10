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
    
    // Initial spawn (if any) or wait for first interval
    jest.advanceTimersByTime(1000);
    expect(THREE.ExtrudeGeometry).toHaveBeenCalled();
    expect(RAPIER.RigidBodyDesc.dynamic).toHaveBeenCalled();
    expect(RAPIER.ColliderDesc.ball).toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(THREE.ExtrudeGeometry).toHaveBeenCalledTimes(2);
  });
});
