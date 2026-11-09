export const STICK_DEADZONE=.18;
export type Heading={x:number;z:number};
export function headsetHeading(q:{x:number;y:number;z:number;w:number},rigYaw:number,fallback:Heading={x:0,z:-1}):Heading{
 const x=-2*(q.x*q.z+q.w*q.y),z=-(1-2*(q.x*q.x+q.y*q.y));
 const length=Math.hypot(x,z);if(length<.05)return fallback;
 const c=Math.cos(rigYaw),s=Math.sin(rigYaw);
 return{x:(x*c+z*s)/length,z:(z*c-x*s)/length};
}
export function headRelativeMove(x:number,y:number,heading:Heading,distance:number):Heading{
 const length=Math.hypot(x,y);if(length<STICK_DEADZONE)return{x:0,z:0};
 const amount=(Math.min(1,length)-STICK_DEADZONE)/(1-STICK_DEADZONE)*distance;
 const side=x/length,forward=-y/length;
 return{x:(heading.x*forward-heading.z*side)*amount,z:(heading.z*forward+heading.x*side)*amount};
}
