import {it,expect} from 'vitest';
import {headRelativeMove,headsetHeading} from './locomotion';
it('maps forward, backward and strafing correctly for every cardinal headset heading',()=>{
 for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2]){
 const h=headsetHeading({x:0,y:Math.sin(yaw/2),z:0,w:Math.cos(yaw/2)},0);
 const f=headRelativeMove(0,-1,h,1),b=headRelativeMove(0,1,h,1),r=headRelativeMove(1,0,h,1);
 expect(f.x).toBeCloseTo(-Math.sin(yaw));expect(f.z).toBeCloseTo(-Math.cos(yaw));expect(b.x).toBeCloseTo(-f.x);expect(b.z).toBeCloseTo(-f.z);expect(r.x).toBeCloseTo(-h.z);expect(r.z).toBeCloseTo(h.x);
 }
});
it('applies snap yaw once, suppresses stick drift and caps diagonal speed',()=>{
 const h=headsetHeading({x:0,y:0,z:0,w:1},Math.PI/2);
 expect(h.x).toBeCloseTo(-1);expect(h.z).toBeCloseTo(0);
 expect(headRelativeMove(.05,.08,h,1)).toEqual({x:0,z:0});
 const d=headRelativeMove(1,-1,h,1);expect(Math.hypot(d.x,d.z)).toBeCloseTo(1);
});
it('keeps the previous horizontal heading when looking straight up',()=>{const last={x:1,z:0};expect(headsetHeading({x:Math.SQRT1_2,y:0,z:0,w:Math.SQRT1_2},0,last)).toEqual(last)});
