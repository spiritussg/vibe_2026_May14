
# Project Blueprint

## Overview

This project is a simple web application that provides a set of useful tools. The initial feature is a Toto random number generator. The application features a "Neon Cosmic Console" space futuristic theme, supporting both Light (Day) and Dark (Night) versions, with Dark mode serving as the primary futuristic experience.

## Current Features

### Toto Random Number Generator

*   **Purpose:** To generate random numbers for the Toto lottery game.
*   **Implementation:** A web component that generates and displays 6 unique random numbers between 1 and 49.
*   **UI:**
    *   A button to trigger the number generation with a "system scan" effect.
    *   A display area for the generated numbers, styled as futuristic energy orbs or tech-balls.

### Day and Night Theme (Space Futuristic)

*   **Purpose:** To provide a comfortable viewing experience in different lighting conditions with a strong aesthetic focus.
*   **Implementation:**
    *   **Space Theme (Dark):** Deep space backgrounds, neon cyan/purple accents, and an animated starfield.
    *   **Light Theme:** A cleaner, "White Space Station" look with subtle tech accents.
    *   CSS Variables (Design Tokens) using `oklch` for maximum color vibrancy.
    *   Persistence using `localStorage` and system preference detection.

## Development Plan

### Current Task: Implement Space Futuristic Theme (Neon Cosmic Console)

1.  **DONE** Create `blueprint.md` to document the project.
2.  **DONE** Define "Neon Cosmic" theme variables in `style.css`.
3.  **DONE** Implement a CSS-based animated starfield background in `style.css`.
4.  **DONE** Update `index.html` to include futuristic typography ('Orbitron').
5.  **DONE** Refactor `toto-generator` in `main.js` with futuristic "scanning" animations and neon glows.
6.  **DONE** Update `theme-toggle` in `main.js` to align with the cosmic aesthetic.
