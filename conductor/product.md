# Initial Concept

I'd like to build a simple single page application that doesn't use any frameworks like react that will be a kind of interactive Valentine's Day card for my wife.  It should use Rapier and Three.js served from a CDN.  It should display a simple square platform, floating in space.  Once a second, a small three dimensional heart should materialize somewhere above the platform, and fall toward the plate, using the physics engine to bounce off other hearts and the platform.  If a heart goes below the platform, it can be deleted.  Hearts should have pastel colors.  The approximate size of the heart shoudl be around 1 unit, the platform should be 5x5.

# Product Definition

## 1. Vision & Goals
**Vision:** To create a heartwarming and interactive 3D Valentine's Day card for the user's wife. The application will be a single-page web experience featuring a physics-simulation of falling hearts.
**Core Message:** The project aims to convey love, playfulness, and a touch of magic through a soft, pastel visual aesthetic and engaging physics interactions.

## 2. Target Audience
*   **Primary User:** The user's wife.
*   **Experience:** A personalized, romantic digital keepsake that is easy to view and interact with.

## 3. Key Features
*   **Physics Simulation:** 
    *   Powered by Rapier physics engine.
    *   A 5x5 square platform floating in space.
    *   3D hearts (approx size 1 unit) spawn once per second above the platform.
    *   Hearts fall, bounce off the platform and each other, and are deleted if they fall below the platform.
*   **Visual Design:**
    *   Hearts are colored in various soft pastel shades.
    *   A romantic background environment (e.g., starry sky or soft gradients) to set the mood.
    *   A personalized Valentine's message displayed on screen.
*   **Interactivity:**
    *   **Camera Control:** Users can orbit (rotate) and zoom the camera to view the scene from different angles (using Three.js OrbitControls).
    *   **Direct Interaction:** Users can click or interact with the hearts (e.g., potentially spawning more or affecting their movement).

## 4. Technical Constraints
*   **Framework:** No frontend frameworks (React, Vue, etc.). Vanilla JavaScript only.
*   **Libraries:** Three.js and Rapier loaded via CDN.
*   **Platform:** Web browser (Single Page Application).
