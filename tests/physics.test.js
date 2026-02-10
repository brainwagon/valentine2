import { init } from '../main.js';
import * as RAPIER from '@dimforge/rapier3d-compat';

describe('Rapier Physics Initialization', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('init calls RAPIER.init and creates a World', async () => {
    await init();

    expect(RAPIER.init).toHaveBeenCalled();
    expect(RAPIER.World).toHaveBeenCalled();
  });
});
