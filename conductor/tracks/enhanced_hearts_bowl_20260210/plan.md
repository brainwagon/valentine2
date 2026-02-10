# Implementation Plan: Enhanced Hearts and Bowl Platform

This plan outlines the steps to implement smooth-shaded hearts, a bowl-shaped platform with trimesh collisions, and an increased, variable spawning rate.

## Phase 1: Heart Visual Improvement
- [x] Task: Update Heart Geometry to Smooth Normals 90bca24
    - [x] Modify heart creation logic to compute or use smooth vertex normals.
    - [x] Verify visual appearance in scene (smooth vs. faceted).
- [ ] Task: Conductor - User Manual Verification 'Heart Visual Improvement' (Protocol in workflow.md)

## Phase 2: Bowl Platform Implementation
- [ ] Task: Create Bowl Geometry and Visuals
    - [ ] Replace flat box geometry with a `Three.SphereGeometry` (clipped) or custom lathe/shape to create a bowl.
    - [ ] Position the bowl below the center of the screen.
- [ ] Task: Implement High-Fidelity Bowl Physics
    - [ ] Remove box collider for the platform.
    - [ ] Create a Rapier Trimesh collider from the bowl's geometry data.
    - [ ] Verify that hearts collide correctly with the interior of the bowl.
- [ ] Task: Conductor - User Manual Verification 'Bowl Platform Implementation' (Protocol in workflow.md)

## Phase 3: Spawning Logic Update
- [ ] Task: Update Spawning Frequency and Variance
    - [ ] Modify the spawning timer to use a random interval between 0.3s and 0.7s.
    - [ ] Ensure the average rate remains approximately 0.5s (2 hearts/sec).
- [ ] Task: Adjust Heart Deletion Logic
    - [ ] Ensure hearts are deleted if they fall significantly below the bowl's vertical position.
- [ ] Task: Conductor - User Manual Verification 'Spawning Logic Update' (Protocol in workflow.md)
