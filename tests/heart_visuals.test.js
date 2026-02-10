import { createHeartGeometry } from '../main.js';
import * as THREE from 'three';

describe('Heart Visuals', () => {
    test('createHeartGeometry returns geometry with computed vertex normals', () => {
        const geometry = createHeartGeometry();
        
        // We expect computeVertexNormals to have been called to smooth the faceted look
        expect(geometry.computeVertexNormals).toHaveBeenCalled();
    });
});