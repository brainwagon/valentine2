import { init } from '../main.js';
import * as THREE from 'three';

describe('Interactivity: Clicking & Sparkles', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('adds a click event listener', async () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    await init();
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
  });

  test('triggers raycaster on click', async () => {
    await init();
    
    // Simulate click
    const clickEvent = new MouseEvent('click', {
      clientX: 100,
      clientY: 100
    });
    window.dispatchEvent(clickEvent);

    expect(THREE.Raycaster).toHaveBeenCalled();
    const raycasterInstance = THREE.Raycaster.mock.results[0].value;
    expect(raycasterInstance.setFromCamera).toHaveBeenCalled();
    expect(raycasterInstance.intersectObjects).toHaveBeenCalled();
  });

  test('creates sparkles on heart intersection', async () => {
    await init();
    
    // Mock intersection
    const raycasterInstance = THREE.Raycaster.mock.results[0].value;
    raycasterInstance.intersectObjects.mockReturnValue([{ point: { x: 1, y: 2, z: 3 } }]);

    // Trigger click
    window.dispatchEvent(new MouseEvent('click'));

    // Verify Points (sparkles) were created
    // The starfield now uses InstancedMesh, so Points is only for sparkles
    expect(THREE.Points).toHaveBeenCalledTimes(1);
    
    const sceneInstance = THREE.Scene.mock.results[0].value;
    expect(sceneInstance.add).toHaveBeenCalledTimes(5); // ambient, dir, starfield, platform, sparkles
  });
});
