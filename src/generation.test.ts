import {it,expect} from 'vitest';
import {generateHouse,route,cellAt} from './generation';
import {toggleArea,sabotage} from './arena-light';
it('connects every arena cell across 1,000 seeds with safe enemy spawns',()=>{for(let seed=0;seed<1000;seed++){const h=generateHouse(seed);expect(h.rooms.length).toBe(100);for(let cell=0;cell<100;cell++){expect(route(h,0,cell).at(-1)).toBe(cell);for(const next of h.links[cell])expect(h.links[next]).toContain(cell)}for(const e of h.enemySpawns){expect(e.x+e.z).toBeGreaterThan(h.size*4);expect(h.rooms[cellAt(h,e.x,e.z)]).toBeTruthy()}expect(h.switches.length).toBeGreaterThan(0)}},30000);
it('reproduces a seed and varies arena walls',()=>{expect(generateHouse(42)).toEqual(generateHouse(42));expect(generateHouse(42).walls).not.toEqual(generateHouse(43).walls)});
it('keeps area lighting on until toggled or sabotaged at close range',()=>{const light={on:false,changedAt:0};toggleArea(light,1);expect(light.on).toBe(true);expect(sabotage(light,4,20)).toBe(false);expect(light.on).toBe(true);expect(sabotage(light,.5,4)).toBe(false);expect(sabotage(light,.5,7)).toBe(true);expect(light.on).toBe(false);toggleArea(light,8);expect(light.on).toBe(true)});
