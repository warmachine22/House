# BLACKOUT HOUSE XR

A client-side procedural survival horror shooter built with TypeScript, Vite, and Three.js. Runs in desktop browsers and requests immersive WebXR sessions where supported. No runtime services, accounts, or external game assets are required.

The initial project brief and acceptance goals are archived in [ORIGINAL_GOAL.md](./ORIGINAL_GOAL.md).

## Run locally

```sh
npm install
npm run dev
npm run build
npm test
```

Open the Vite URL in a modern desktop browser. For Quest Browser, serve the deployed HTTPS URL and press **ENTER VR** from the page. The headset must allow immersive VR and motion controls.

## Production hosting

- **Host:** Vercel
- **Vercel project:** `blackout-house-xr`
- **Production URL:** [https://housx.vercel.app](https://housx.vercel.app)
- **Other working aliases:** [https://blackout-house.vercel.app](https://blackout-house.vercel.app) and [https://blackout-house-xr.vercel.app](https://blackout-house-xr.vercel.app)
- **Build:** `npm run build`; Vercel serves the `dist` directory over HTTPS.

The current production deployment was uploaded to Vercel directly. The Vercel project is not connected to this GitHub repository for automatic deployments, so pushing to `main` does not publish a new production build by itself.

## Controls

**Desktop:** WASD to move, mouse to look, click or Space to fire, F toggles the flashlight, R reloads, Shift runs, Escape returns to the menu.

**Touchscreen (iPad/iPhone):** tap **PLAY ON DESKTOP**, drag the left control to move, drag on the right half of the screen to look, and use FIRE, LIGHT, RELOAD, and RUN on-screen buttons. Touch controls appear automatically on devices that report a coarse pointer.

**VR:** left thumbstick moves, right thumbstick turns, left trigger toggles the flashlight, right trigger fires, right grip/secondary button reloads. The flashlight and pistol are attached to the corresponding controller. (Controller mapping can vary by browser.)

Eliminate the finite enemy population. New House creates a new seed; Replay Seed repeats the current layout. Add `?seed=123456` to reproduce a run.

## Generation and architecture

`src/generation.ts` is a deterministic seeded layout generator. Each of four levels contains a central hall and variable rooms along both sides, with door gaps, room-specific furniture, and an inter-floor sloped stair route. Layout size is normalized to about 380 m² (4,090 square feet) of interior floor area. `src/main.ts` contains rendering, controls, collision, combat, audio synthesis, and simple enemy state logic. All meshes use primitive geometry and shared materials.

## Tests

`npm test` runs deterministic/property checks over 1,000 generated seeds for four floors, residential floor area, encounter count, valid room spawns, and seed repeatability. `npm run build` type-checks and builds production assets.

## Known simplifications

This is a compact playable implementation. Enemy navigation is direct steering with floor-to-floor stair routing; it does not currently use A* around every piece of furniture. Patrol/search/pursue/cover/ambush states, melee attacks, and ranged attacks are implemented with simple perception and line-of-sight checks. Enemy sounds and gunfire use synthesized tones; sound positioning and a rich sound library are not yet implemented. VR controller inputs and WebXR session entry are wired, but this release has not been verified on physical Quest 3 hardware. The four levels are represented in the procedural layout, though stair openings, door animation, true capsule physics, head-hit multipliers, robust cover pathing, and headset wrist UI remain simplified.

## Quest 3 manual verification

1. Open the production HTTPS URL in Meta Quest Browser.
2. Allow the page to enter immersive VR and verify both controllers are tracked.
3. Check that the left stick walks, right stick turns, left trigger toggles the flashlight, and right trigger fires.
4. Walk through a room door and traverse each staircase in both directions.
5. Confirm that walls and furniture block player movement and gunfire.
6. Confirm enemies appear on all floors, react to illumination/shots, and can reach the player across stair routes.
7. Observe frame rate and comfort during a full run; verify death, replay seed, and new house.

## Licensing

Original code and procedural geometric content. No third-party game art or audio assets are bundled. Three.js is distributed under the MIT license. The menu font uses Google Fonts and can be removed/replaced for an entirely offline deployment.
