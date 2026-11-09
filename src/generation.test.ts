import {describe,it,expect} from 'vitest';
import {generateHouse} from './generation';
describe('seeded house generator',()=>{
 it('builds valid four level houses of residential scale across 1,000 seeds',()=>{for(let seed=1;seed<=1000;seed++){const h=generateHouse(seed);expect(h.floorYs).toHaveLength(4);expect(h.rooms.length).toBeGreaterThanOrEqual(24);expect(h.area).toBeGreaterThan(279);expect(h.area).toBeLessThan(466);expect(h.stairs).toHaveLength(4);expect(h.enemySpawns).toHaveLength(14);expect(new Set(h.enemySpawns.map(e=>e.floor)).size).toBe(4);for(const e of h.enemySpawns){const room=h.rooms.find(r=>r.floor===e.floor&&e.x>r.x&&e.x<r.x+r.w&&e.z>r.z&&e.z<r.z+r.d);expect(room,`seed ${seed} enemy in room`).toBeTruthy()}}});
 it('reproduces the same layout and encounter seed',()=>{expect(generateHouse(123456)).toEqual(generateHouse(123456));expect(generateHouse(1).rooms).not.toEqual(generateHouse(2).rooms)});
});
