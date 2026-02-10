# Implementation Plan - Rounded Hearts with Label

This plan outlines the steps to implement rounded heart geometry and the "M❤C" label.

## Phase 1: Rounded Geometry Implementation [checkpoint: d3d5d14]
- [x] Task: Update `createHeartShape` for rounded bottom
    - [x] Write a test to verify the heart shape is being generated (using a mock for THREE.Shape).
    - [x] Modify `bezierCurveTo` parameters in `main.js` to soften the bottom vertex.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Rounded Geometry Implementation' (Protocol in workflow.md) d3d5d14

## Phase 2: Texture & Material Implementation
- [ ] Task: Create Label Texture Generator
    - [ ] Implement a utility function to create an HTML5 canvas and draw "M❤C" on it.
    - [ ] Convert the canvas to a `THREE.CanvasTexture`.
- [ ] Task: Apply Multi-Material to Hearts
    - [ ] Define two materials: one plain (for sides and back) and one with the label texture (for the front face).
    - [ ] Update the `THREE.Mesh` creation in `spawnHeart` to use an array of materials.
    - [ ] Verify that the label appears correctly on the front face through manual inspection.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Texture & Material Implementation' (Protocol in workflow.md)

## Phase 3: Final Polish
- [ ] Task: Verify Physics Consistency
    - [ ] Ensure the increased collider size still matches the new rounded geometry.
    - [ ] Run existing physics tests to ensure no regressions in spawning or cleanup.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Polish' (Protocol in workflow.md)
