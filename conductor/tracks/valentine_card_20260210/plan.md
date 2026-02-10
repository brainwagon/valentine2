# Implementation Plan - Valentine's Day Card

This plan outlines the steps to build the interactive Valentine's Day card.

## Phase 1: Project Foundation & Environment
- [~] Task: Set up basic HTML/CSS/JS structure
    - [~] Create `index.html` with basic layout and CDN links for Three.js and Rapier.
    - [~] Create `style.css` for typography and basic UI styling.
    - [~] Create `main.js` as the entry point.
- [ ] Task: Initialize Three.js Scene
    - [ ] Set up Scene, Camera (Perspective), and Renderer.
    - [ ] Add OrbitControls for camera interaction.
    - [ ] Add basic lighting (Ambient and Directional).
- [ ] Task: Implement Starfield Background
    - [ ] Create a particle system for stars.
    - [ ] Implement gentle rotation logic for the starfield.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Project Foundation & Environment' (Protocol in workflow.md)

## Phase 2: Physics Integration & Core Mechanics
- [ ] Task: Initialize Rapier Physics
    - [ ] Load and initialize the Rapier WASM module.
    - [ ] Set up the Rapier World with gravity.
- [ ] Task: Create the Platform
    - [ ] Create a Three.js mesh for the 5x5 platform.
    - [ ] Create a corresponding static Rapier rigid body and collider.
- [ ] Task: Implement Heart Spawning & Physics
    - [ ] Create a function to generate a 3D heart geometry.
    - [ ] Implement a spawning loop (once per second).
    - [ ] Create dynamic Rapier rigid bodies and colliders for each heart.
    - [ ] Sync Three.js mesh positions/rotations with Rapier bodies in the animation loop.
- [ ] Task: Implement Heart Cleanup
    - [ ] Add logic to delete hearts and their physics bodies when they fall below a certain height.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Physics Integration & Core Mechanics' (Protocol in workflow.md)

## Phase 3: Interactivity & Visual Effects
- [ ] Task: Implement Clicking/Sparkle Effect
    - [ ] Implement raycasting to detect clicks near hearts.
    - [ ] Create a particle-based sparkle effect triggered on click.
- [ ] Task: Add Post-Processing
    - [ ] Implement UnrealBloomPass or similar for a soft glow/bloom effect.
- [ ] Task: UI & Personalized Message
    - [ ] Add "Happy Valentine's Day Carmen!" message using HTML/CSS.
    - [ ] Apply whimsical styling and positioning.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Interactivity & Visual Effects' (Protocol in workflow.md)

## Phase 4: Audio & Polishing
- [ ] Task: Add Ambient Music & SFX
    - [ ] Integrate subtle ambient music.
    - [ ] Add collision/spawn sound effects.
- [ ] Task: Final Polish & Responsive Fixes
    - [ ] Ensure the scene handles window resizing correctly.
    - [ ] Fine-tune physics parameters (friction, restitution) for "bouncy" hearts.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Audio & Polishing' (Protocol in workflow.md)
