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

**VR:** left thumbstick moves relative to the direction you look (forward/backward/strafe), right thumbstick snap-turns around your headset, left trigger toggles the flashlight (or replays after victory/defeat), right trigger fires, right grip/secondary button reloads. The pistol and its flashlight follow the right controller; shots follow its aim, and a gun display shows health, ammunition, and threats. (Controller mapping can vary by browser.)

Survive escalating zombie hordes for as long as possible. Walk over glowing pickups to collect upgrades. New House creates a new seed; Replay Seed repeats the current layout. Add `?seed=123456` to reproduce a run.

## Current arena mode

The current game uses a seeded, single-floor 10×10 maze arena with 3.6 meter cells, connected passages, and extra loops. The original house specification is retained in ORIGINAL_GOAL.md as historical context. All enemies start away from the player's starting cell and use graph routes through legal passages.

With the gun flashlight off, unlit areas are nearly black. Wall switches have a faint blue marker. Turn them on or off with E, the touch USE button, or left controller grip while nearby. Alternatively aim at the switch and pull the firing trigger; this interaction does not spend ammunition. Lights remain on until toggled, sabotaged, or a new run starts. Enemies seek nearby lit switches, walk to them, and turn them off after a short grace period.

`npm test` checks maze connectivity across 1,000 seeds, safe enemy distribution, deterministic seeds, collision clearance, and persistent light/sabotage rules. `npm run build` builds production assets. Quest controller tracking and comfort still need physical headset checks.

## Licensing

Original code and procedural geometric content. No third-party game art or audio assets are bundled. Three.js is distributed under the MIT license. The menu font uses Google Fonts and can be removed/replaced for an entirely offline deployment.

## VR repair pass

Fixed controller parenting and handedness mapping, gun-direction shooting, weapon-mounted VR light, duplicate walls sealing rooms, floor selection, and safe starting room. Reduced dynamic room lights and added a gun display and left-trigger replay. Browser checks cover player movement, starting doorway clearance, enemy damage, and controller rig parenting; physical Quest tracking and comfort remain unverified.

Movement uses the current XR viewer pose and applies player yaw once. Thumbstick drift is filtered with an 18% dead zone; diagonal movement has the same top speed as forward movement. Looking straight up/down retains the last horizontal heading. Automated tests cover all cardinal movement directions, snap yaw, drift, and diagonal speed. Physical Quest comfort remains unverified.

## Zombie survival progression

Survival mode is endless: clearing nearby zombies buys breathing room; it does not end the run. A fresh seed creates a finite 36×36 meter maze. Five initial zombies are followed by escalating spawns outside a ten-meter safety radius. Walkers, fast runners (after one minute), and armored brutes (after three minutes) use the maze graph. Nearby detection, flashlight illumination, or lit cells trigger pursuit and nearby alerts. All zombies use melee attacks. Damage has a short player invulnerability window to avoid simultaneous instant kills.

The initial tuning targets heavy pressure around 10–15 minutes, increasing spawn rate, active population, health, damage and speed. The active population is capped at 75 for performance, with AI updates throttled and distant zombie rendering culled. The target survival length and Quest frame rate have not been validated by a full hardware playtest.

The flashlight initially lasts 25 seconds and fully recharges in 20 seconds while off. When empty it switches off; toggle it on again after charging. Area lights still work independently, and zombies still sabotage them.

Weapons start with 15 rounds, unlimited reserve ammo, 3 damage per body hit and 2.5× headshot damage against zombies starting at 9 health. Hold the trigger/FIRE button to repeat fire; reload with the existing control. Tracers, muzzle flashes, synthesized gun noise, localized hits/growls and right-controller haptics provide feedback without camera shake.

Walk over labeled glowing pickups: DAMAGE (+1.5), SPREAD (+2 pellets up to 7), PIERCE (+1 zombie up to 5), BATTERY (+35 capacity/refill), RECHARGE (+2 per second), RAPID (18% faster, capped), HEALTH (+35 up to 100). Twenty initial pickups encourage exploration; more appear over time and every third kill drops one. Kills also earn automatic cycling upgrades at increasing level thresholds. Upgrades are reset every run; permanent meta progression and upgrade-choice menus are not implemented.

Reference research: [Nightmare Reaper](https://store.steampowered.com/app/1051690/Nightmare_Reaper/) for retro FPS loot progression; [Yet Another Zombie Survivors](https://store.steampowered.com/app/2163330/Yet_Another_Zombie_Survivors/) for horde survival. All game content here remains original.
