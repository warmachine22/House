import {expect,it} from 'vitest';
import {bodyIntersects} from './collision';
it('allows the player through a doorway while blocking jambs',()=>{
 const left={min:{x:-2,y:0,z:-.09},max:{x:-.725,y:3,z:.09}};
 const right={min:{x:.725,y:0,z:-.09},max:{x:2,y:3,z:.09}};
 for(let z=-.5;z<=.5;z+=.01)expect([left,right].some(b=>bodyIntersects(0,0,z,b))).toBe(false);
 expect(bodyIntersects(.6,0,0,right)).toBe(true);
});
it('uses a round body at corners and ignores the floor below the feet',()=>{
 expect(bodyIntersects(.2,0,.2,{min:{x:.4,y:0,z:.4},max:{x:1,y:2,z:1}})).toBe(false);
 expect(bodyIntersects(0,3.2,0,{min:{x:-2,y:3,z:-2},max:{x:2,y:3.2,z:2}})).toBe(false);
});
