# Specification: Interactive Valentine's Day Card

## Overview
A single-page application (SPA) that serves as an interactive Valentine's Day card. It features a 3D scene with a floating platform and falling hearts controlled by a physics engine.

## Functional Requirements
- **3D Scene:**
    - Rendered using Three.js.
    - Floating square platform (5x5 units).
    - Starfield background with glowing particles and gentle rotation.
    - Camera control (OrbitControls) for rotation and zooming.
- **Physics Simulation:**
    - Powered by Rapier physics engine.
    - Gravity pulling objects downward.
    - Hearts spawn once per second above the platform at random positions.
    - Hearts have a complex shape (approx. 1 unit size) and collide with the platform and each other.
    - Hearts falling below the platform (e.g., y < -10) are removed from the scene and physics world.
- **Interactivity:**
    - Clicking/Tapping near a heart triggers a "sparkle" visual effect.
    - User can orbit and zoom the camera.
- **Visuals & UI:**
    - Hearts are in various pastel colors.
    - Soft bloom/glow post-processing effect.
    - Persistent personalized message: "Happy Valentine's Day Carmen!".
    - Whimsical/rounded typography for the UI.
- **Audio:**
    - Subtle ambient romantic music.
    - Soft sound effects on heart collisions or spawning.

## Technical Requirements
- Vanilla JavaScript (ES6+), no frameworks.
- Three.js and Rapier loaded via CDN.
- HTML5 and CSS3 for layout and basic UI.
- Responsive design (works on mobile and desktop).
