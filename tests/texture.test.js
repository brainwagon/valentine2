import { createLabelTexture } from '../main.js';
import * as THREE from 'three';

describe('createLabelTexture', () => {
  test('it creates a CanvasTexture with specified text', () => {
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
        width: 256,
        height: 256
    });

    const texture = createLabelTexture('I WUV U');
    
    expect(createElementSpy).toHaveBeenCalledWith('canvas');
    // 'I WUV U' should be split into 3 calls to fillText because of the spaces
    expect(mockContext.fillText).toHaveBeenCalledTimes(3);
    expect(mockContext.fillText).toHaveBeenCalledWith('I', expect.any(Number), expect.any(Number));
    expect(mockContext.fillText).toHaveBeenCalledWith('WUV', expect.any(Number), expect.any(Number));
    expect(mockContext.fillText).toHaveBeenCalledWith('U', expect.any(Number), expect.any(Number));
    expect(THREE.CanvasTexture).toHaveBeenCalled();
    
    createElementSpy.mockRestore();
  });

  test('it increases font size and moves position for single-line labels', () => {
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
        width: 256,
        height: 256
    });

    createLabelTexture('KISS');
    
    // Original fontSize was 60, single line should be 72
    expect(mockContext.font).toBe('bold 72px Arial');
    
    // Vertical center was 128 (256/2). 
    // Shifted up by 8% of 256 (20.48).
    // 128 - 20.48 = 107.52
    expect(mockContext.fillText).toHaveBeenCalledWith('KISS', 128, 107.52);
    
    createElementSpy.mockRestore();
  });
});
