import { init } from '../main.js';
import * as THREE from 'three';

describe('Audio Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('initializes AudioListener and starts ambient music', async () => {
    await init();

    expect(THREE.AudioListener).toHaveBeenCalled();
    expect(THREE.Audio).toHaveBeenCalled();
    expect(THREE.AudioLoader).toHaveBeenCalled();
    
    const loaderInstance = THREE.AudioLoader.mock.results[0].value;
    expect(loaderInstance.load).toHaveBeenCalledWith(expect.stringContaining('raw.githubusercontent'), expect.any(Function), undefined, expect.any(Function));
  });
});
