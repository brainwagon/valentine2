import { createHeartShape } from '../main.js';
import * as THREE from 'three';

describe('createHeartShape', () => {
  test('it uses THREE.Shape and defines curves', () => {
    const shape = createHeartShape();
    expect(THREE.Shape).toHaveBeenCalled();
    
    // Check if moveTo and bezierCurveTo were called
    expect(shape.moveTo).toHaveBeenCalledWith(0, 0);
    expect(shape.bezierCurveTo).toHaveBeenCalled();
  });
});
