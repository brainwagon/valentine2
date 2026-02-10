# Specification: Rounded Hearts with Personal Label

## Overview
This feature improves the visual design of the falling hearts by softening their bottom geometry and adding a personalized label ("M❤C") to one side of each heart.

## Functional Requirements
- **Rounded Heart Geometry:**
    - Modify the `createHeartShape` function in `main.js`.
    - Adjust the `bezierCurveTo` parameters to create a softer, more rounded tip at the bottom of the heart instead of a sharp point.
- **Personalized Label ("M❤C"):**
    - Generate a dynamic canvas texture for each heart or a shared pool of textures.
    - The texture should contain the text "M❤C" (where ❤ is the heart emoji or icon).
    - Map this texture onto the **front face** only of the heart's `ExtrudeGeometry`.
    - Use separate materials for the faces and the sides (bevel/extrude) of the heart mesh to ensure the label only appears on the intended flat surface.
- **Physics Synchronization:**
    - Ensure the new geometry and any material changes do not negatively impact the existing physics simulation or collision detection.

## Acceptance Criteria
- [ ] Hearts have a clearly rounded bottom tip.
- [ ] The label "M❤C" is clearly legible on one side of each falling heart.
- [ ] The label does not appear on the sides (depth) or the back face of the heart.
- [ ] Existing physics behavior (bouncing, cleanup) remains intact.

## Out of Scope
- Adding different messages or randomizing the label text.
- 3D sculpted/embossed text.
