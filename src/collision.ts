export const PLAYER_RADIUS = 0.23;
export type Bounds = {min:{x:number;y:number;z:number};max:{x:number;y:number;z:number}};
export function bodyIntersects(x:number,feet:number,z:number,b:Bounds,radius=PLAYER_RADIUS){
 if(feet+1.65<=b.min.y||feet+.04>=b.max.y)return false;
 const dx=x-Math.max(b.min.x,Math.min(x,b.max.x));
 const dz=z-Math.max(b.min.z,Math.min(z,b.max.z));
 return dx*dx+dz*dz<radius*radius;
}
