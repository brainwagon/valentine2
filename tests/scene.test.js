import { init } from '../main.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

describe('Three.js Scene Initialization', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('init creates Scene, Camera, Renderer, Controls, and Lights', async () => {
    await init();

    expect(THREE.Scene).toHaveBeenCalled();
    expect(THREE.PerspectiveCamera).toHaveBeenCalled();
    expect(THREE.WebGLRenderer).toHaveBeenCalled();
    // Check if renderer domElement is added to body
    expect(document.body.querySelector('canvas')).not.toBeNull();
    
    // Controls
    expect(OrbitControls).toHaveBeenCalled();
    
    // Lights
    expect(THREE.AmbientLight).toHaveBeenCalled();
    expect(THREE.DirectionalLight).toHaveBeenCalled();
  });
});
