export type Upgrade='DAMAGE'|'SPREAD'|'PIERCE'|'BATTERY'|'RECHARGE'|'RAPID'|'HEALTH'|'RELOAD'|'ARMOR';
export const UPGRADES:Upgrade[]=['DAMAGE','SPREAD','PIERCE','BATTERY','RECHARGE','RAPID','HEALTH','RELOAD','ARMOR'];
export function newRun(){return{battery:100,capacity:100,recharge:5,drain:4,damage:3,pellets:1,pierce:0,interval:.3,reloadSeconds:5,armor:0,level:1,xp:0,nextXp:6}}
export type Run=ReturnType<typeof newRun>;
export function upgrade(r:Run,k:Upgrade){if(k==='RELOAD')r.reloadSeconds=Math.max(1.2,r.reloadSeconds*.78);if(k==='ARMOR')r.armor=Math.min(.65,r.armor+.12);if(k==='DAMAGE')r.damage+=1.5;if(k==='SPREAD')r.pellets=Math.min(7,r.pellets+2);if(k==='PIERCE')r.pierce=Math.min(5,r.pierce+1);if(k==='BATTERY'){r.capacity+=35;r.battery=r.capacity}if(k==='RECHARGE')r.recharge+=2;if(k==='RAPID')r.interval=Math.max(.09,r.interval*.82)}
export function batteryTick(r:Run,on:boolean,dt:number){r.battery=Math.max(0,Math.min(r.capacity,r.battery+(on?-r.drain:r.recharge)*dt));return on&&r.battery>0}
export function pressure(seconds:number){const m=seconds/60;return{interval:Math.max(.18,4/(1+m*.55+m*m*.06)),cap:Math.min(75,8+Math.floor(m*4.5)),hp:9+Math.floor(m)*2,speed:Math.min(2.3,.65+m*.065),damage:32+Math.floor(m)}}
export function shotDamage(r:Run,head:boolean){return r.damage*(head?2.5:1)}

export function contactDamage(r:Run,amount:number){return amount*(1-r.armor)}
