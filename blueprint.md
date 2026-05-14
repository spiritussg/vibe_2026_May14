
# Project Blueprint

## Overview

This project is a simple web application that provides a set of useful tools. The initial feature is a Toto random number generator. The application features an "RSI Industrial HUD" space futuristic theme, inspired by Star Citizen and Squadron 42, supporting both Light (Showroom) and Dark (Flight HUD) versions.

## Current Features

### Toto Random Number Generator (MFD Interface)

*   **Purpose:** To generate random numbers for the Toto lottery game using a high-fidelity aerospace interface.
*   **Implementation:** A Multi-Function Display (MFD) web component that simulates a UEE data retrieval sequence.
*   **UI:**
    *   An "EXECUTE_DATA_PULL" button that initiates a technical scanning sequence.
    *   Results displayed as "Digital Data Blocks" with precision targeting brackets.
    *   Static technical readouts for immersion (e.g., SENSOR_LINK, COMM_STATE).

### Day and Night Theme (Aerospace HUD)

*   **Purpose:** To provide a comfortable viewing experience in different operating environments (Space vs. Station).
*   **Implementation:**
    *   **Flight HUD (Dark):** Deep charcoal backgrounds, RSI Cyan accents, and digital grid overlays.
    *   **Showroom Interface (Light):** Pristine white/silver surfaces with soft blue highlights, inspired by high-end aerospace showrooms.
    *   CSS Variables using `oklch` for high-fidelity color reproduction.
    *   Persistence using `localStorage` and system preference detection.

## Development Plan

### Current Task: Implement RSI Industrial HUD Theme

1.  **DONE** Create `blueprint.md` to document the project.
2.  **DONE** Define RSI-specific theme variables and grid patterns in `style.css`.
3.  **DONE** Implement high-fidelity glassmorphism with "digital noise" in `style.css`.
4.  **DONE** Update `index.html` with grid overlays and UEE-themed text.
5.  **DONE** Redesign `toto-generator` as a technical MFD in `main.js`.
6.  **DONE** Redesign `theme-toggle` as an industrial power/HUD switch in `main.js`.
