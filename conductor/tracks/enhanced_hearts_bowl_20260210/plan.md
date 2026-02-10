# Implementation Plan: Enhanced Hearts and Bowl Platform

This plan outlines the steps to implement smooth-shaded hearts, a bowl-shaped platform with trimesh collisions, and an increased, variable spawning rate.

## Phase 1: Heart Visual Improvement [checkpoint: 5077b48]
- [x] Task: Update Heart Geometry to Smooth Normals 90bca24
    - [x] Modify heart creation logic to compute or use smooth vertex normals.
    - [x] Verify visual appearance in scene (smooth vs. faceted).
- [x] Task: Conductor - User Manual Verification 'Heart Visual Improvement' (Protocol in workflow.md) 5077b48

## Phase 2: Bowl Platform Implementation [checkpoint: 131cbc2]
- [x] Task: Create Bowl Geometry and Visuals 7aea94a
    - [x] Replace flat box geometry with a `Three.SphereGeometry` (clipped) or custom lathe/shape to create a bowl.
    - [x] Position the bowl below the center of the screen.
- [x] Task: Implement High-Fidelity Bowl Physics 7aea94a
    - [x] Remove box collider for the platform.
    - [x] Create a Rapier Trimesh collider from the bowl's geometry data.
    - [x] Verify that hearts collide correctly with the interior of the bowl.
- [x] Task: Conductor - User Manual Verification 'Bowl Platform Implementation' (Protocol in workflow.md) 131cbc2

## Phase 3: Spawning Logic Update
- [ ] Task: Update Spawning Frequency and Variance
    - [ ] Modify the spawning timer to use a random interval between 0.3s and 0.7s.
    - [ ] Ensure the average rate remains approximately 0.5s (2 hearts/sec).
- [ ] Task: Adjust Heart Deletion Logic
    - [ ] Ensure hearts are deleted if they fall significantly below the bowl's vertical position.
- [ ] Task: Conductor - User Manual Verification 'Spawning Logic Update' (Protocol in workflow.md)
