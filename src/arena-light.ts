export type LightState={on:boolean;changedAt:number};
export function toggleArea(light:LightState,time:number){light.on=!light.on;light.changedAt=time}
export function sabotage(light:LightState,distance:number,time:number){if(light.on&&distance<.9&&time-light.changedAt>5){light.on=false;light.changedAt=time;return true}return false}
