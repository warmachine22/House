# Original Goal

## Project

**BLACKOUT HOUSE XR** — a procedurally generated, browser-based horror shooter for Meta Quest 3, with a playable desktop mode for development and testing.

## Mission

Design, implement, test, and publish a complete single-player WebXR game. The player explores a dark, procedurally generated multistory house, finds and eliminates every hostile enemy, and survives. Each new house should be reproducible from a seed and substantially different from other runs.

The experience should combine tactical room clearing, survival horror, exploration, and unpredictable encounters. The flashlight is essential for seeing; the player uses a pistol and must manage ammunition, health, and threats.

## Platform and delivery

- Run client-side in a modern browser, with native immersive WebXR support for Meta Quest Browser and desktop play for testing.
- Use HTTPS in production, show an **ENTER VR** control when supported, and provide playable desktop controls.
- Favor TypeScript, Vite, Three.js, Web Audio, and lightweight procedural geometry. Avoid unnecessary backend services and external runtime assets.
- Keep the code organized into understandable generation, world, player, enemy, UI, and test systems.
- Publish the source to GitHub and the production website to Vercel. Document installation, controls, generation seeds, architecture, known limits, and headset checks.

## Core house requirements

- Generate four accessible levels: basement, ground floor, second floor, and attic.
- Target about 3,000–5,000 square feet of traversable interior space.
- Vary the footprint, rooms, proportions, corridors, doorways, stair locations, furniture, lighting, and enemy encounters.
- Support deterministic seeds, including a `?seed=` URL parameter, a new random house, and replaying the current seed.
- Keep every room and floor connected. Doors, halls, stairs, spawns, and furniture must not make required routes inaccessible.
- Use walkable stairs and collision that prevent passing through walls, floors, and furniture.
- Furnish rooms with simple recognizable geometry and leave reasonable paths through them.

## Player and combat

- Place the player in a safe, valid starting area with 100 health, a pistol, and a flashlight.
- In VR, use controller-based locomotion and turning, controller-aimed flashlight and pistol, trigger firing, and a reload control. Preserve headset comfort and viewpoint control.
- On desktop, support WASD, mouse look, click/Space to fire, F for flashlight, R to reload, Shift to run, and Escape for the menu.
- Implement a functioning flashlight, pistol, raycast hit detection, ammunition, reload timing, fire-rate limits, enemy damage, player damage, death, victory, restart, and new-house flows.
- Show a small readable HUD for health, enemies remaining, ammunition, and floor as useful.

## Enemy behavior and atmosphere

- Create inexpensive recognizable humanoid enemies with varied silhouettes and readable reactions.
- Give enemies perception, line-of-sight checks, sound awareness, memory, patrol, investigation, pursuit, attack, and retreat or cover behavior.
- Use several behavior archetypes, including stalkers, rushers, shooters, ambushers, and defenders.
- Let melee and ranged enemies attack with plausible movement, cooldowns, cues, and obstruction by walls or cover.
- Ensure enemies can navigate rooms and stairs without moving through walls or floors.
- Build horror atmosphere with darkness, useful flashlight illumination, restrained practical lights, spatial sound, footsteps, vocalizations, gunfire, and occasional context-sensitive scares.

## Performance and user experience

- Favor stable standalone Quest performance through simple geometry, shared materials, efficient updates, and restrained lighting and effects.
- Provide a clear futuristic horror menu with play, VR entry, new-house, replay-seed, settings, and how-to-play access.
- Add only settings that work; include appropriate comfort options where practical.
- Keep the interface legible in VR and avoid forced camera movement, excessive strobing, or harsh audio spikes.

## Verification and acceptance

Test procedural generation across at least 1,000 seeds. Check the four floors, target area, connectivity, stairs, door clearances, legal spawns, enemy reachability, furniture obstruction, and deterministic replay. Test gameplay rules such as health, ammunition, reloads, attacks, pathfinding, victory, and restart. Run a desktop browser smoke test where practical, and run the production build and test commands before deployment.

The intended result is a playable HTTPS site where users can start a run, explore all four floors, fight a finite enemy population, win or die, and start another seeded house. Clearly separate functionality verified in software from behaviors that still require physical Quest 3 testing.

## Initial implementation priorities

1. Reliable Quest 3 WebXR gameplay.
2. Connected procedural multistory houses.
3. Working movement, collisions, stairs, and doors.
4. Enemies that perceive, navigate, pursue, use cover, and fight.
5. Flashlight-led horror atmosphere.
6. Consistent performance and visual polish.

