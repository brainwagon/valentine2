# Specification: Metallic Gold Bowl Platform

## 1. Overview
This track updates the visual appearance of the bowl platform to a metallic gold finish, providing a more premium and warm aesthetic.

## 2. Functional Requirements
### 2.1 Metallic Gold Material
- Update the bowl's material to a "Satin Gold" finish.
- **Color:** Classic Gold (#D4AF37).
- **Properties:**
    - `metalness`: High (e.g., 1.0) to achieve a metallic effect.
    - `roughness`: Medium (e.g., 0.4 - 0.5) for a satin/brushed look.

## 3. Non-Functional Requirements
- **Visual Consistency:** The gold color should complement the pastel hearts.
- **Performance:** Using `metalness` and `roughness` in `MeshStandardMaterial` is performance-efficient.

## 4. Acceptance Criteria
- The bowl platform has a metallic gold color.
- The surface has a satin finish (not overly shiny, but clearly metallic).
- The bowl's physics and geometry remain unchanged.

## 5. Out of Scope
- Changing the bowl's shape or position.
- Adding complex environment reflections (beyond standard lighting).
- Modifying the hearts or background.
