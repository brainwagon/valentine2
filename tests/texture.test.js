import { createLabelTexture } from '../main.js';
import * as THREE from 'three';

describe('createLabelTexture', () => {
  test('it creates a CanvasTexture with M❤C', () => {
    // Mock getContext if needed
    const mockContext = {
        fillRect: jest.fn(),
        fillText: jest.fn(),
        clearRect: jest.fn(),
        strokeText: jest.fn(),
        fillStyle: '',
        font: '',
        textAlign: '',
        textBaseline: ''
    };
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue({
        getContext: jest.fn(() => mockContext),
        width: 0,
        height: 0
    });

    const texture = createLabelTexture(0xff0000);
    
    expect(createElementSpy).toHaveBeenCalledWith('canvas');
    expect(mockContext.fillText).toHaveBeenCalledWith('M❤C', expect.any(Number), expect.any(Number));
    expect(THREE.CanvasTexture).toHaveBeenCalled();
    
    createElementSpy.mockRestore();
  });
});
