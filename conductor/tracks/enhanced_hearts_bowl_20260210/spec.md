# Specification: Enhanced Hearts and Bowl Platform

## 1. Overview
This track focuses on improving the visual quality of the hearts, replacing the flat platform with a functional 3D bowl, and increasing the heart spawning frequency with natural variance.

## 2. Functional Requirements
### 2.1 Smooth Hearts
- Modify the heart geometry generation to use smooth vertex normals.
- Ensure the hearts appear rounded and soft under lighting, removing the current faceted/low-poly look.

### 2.2 Bowl Platform
- Replace the 5x5 flat platform with a smooth, rounded bowl or semi-sphere geometry.
- Position the bowl below the center of the screen to serve as a container for falling hearts.
- Implement a high-fidelity trimesh collider for the bowl to ensure accurate physics interactions with hearts inside the curved surface.

### 2.3 Increased Spawning Rate
- Increase the spawning frequency to an average of two hearts per second.
- Implement random variance: hearts should spawn at intervals between 0.3 and 0.7 seconds.

## 3. Non-Functional Requirements
- **Performance:** Ensure the trimesh collider does not significantly degrade performance during high heart counts.
- **Visual Consistency:** Maintain the existing pastel color palette for the hearts.

## 4. Acceptance Criteria
- Hearts appear smooth and rounded without visible facet edges.
- The platform is a bowl that correctly catches and contains hearts.
- Hearts bounce naturally off the interior curves of the bowl.
- Hearts spawn at irregular intervals averaging 0.5 seconds.
- Hearts are still deleted if they fall below the bowl's position (e.g., if they spill over).

## 5. Out of Scope
- Changing the heart shape itself (beyond normal smoothing).
- Adding new textures or complex materials.
- Changing the background or camera controls.
