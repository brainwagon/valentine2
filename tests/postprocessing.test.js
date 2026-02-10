import { init } from '../main.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

describe('Post-Processing: Bloom Effect', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('initializes EffectComposer with RenderPass and UnrealBloomPass', async () => {
    await init();

    expect(EffectComposer).toHaveBeenCalled();
    expect(RenderPass).toHaveBeenCalled();
    expect(UnrealBloomPass).toHaveBeenCalled();
    
    const composerInstance = EffectComposer.mock.results[0].value;
    expect(composerInstance.addPass).toHaveBeenCalledTimes(2);
  });
});
