export type Room={id:string,floor:number,x:number,z:number,w:number,d:number,type:string,centerX:number,centerZ:number};
export type House={seed:number,rooms:Room[],floorYs:number[],stairs:{floor:number,x:number,z:number,width:number,run:number,rise:number}[],area:number,enemySpawns:{x:number,y:number,z:number,floor:number,kind:string}[],player:{x:number,y:number,z:number,floor:number},links:number[][],walls:{x:number,z:number,w:number,d:number}[],switches:{cell:number,x:number,z:number}[],size:number};
export function rng(seed:number){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
export function generateHouse(seed:number):House{
 const r=rng(seed),n=6,size=3.6,rooms:Room[]=[],links:number[][]=Array.from({length:n*n},()=>[]),walls:House['walls']=[];
 for(let z=0;z<n;z++)for(let x=0;x<n;x++)rooms.push({id:String(z*n+x),floor:0,x:x*size,z:z*size,w:size,d:size,type:'ARENA',centerX:(x+.5)*size,centerZ:(z+.5)*size});
 const neighbors=(i:number)=>[i%n>0?i-1:-1,i%n<n-1?i+1:-1,i>=n?i-n:-1,i<n*(n-1)?i+n:-1].filter(j=>j>=0);
 const join=(a:number,b:number)=>{if(!links[a].includes(b)){links[a].push(b);links[b].push(a)}};
 const visited=new Set([0]),stack=[0];while(stack.length){const a=stack[stack.length-1],options=neighbors(a).filter(b=>!visited.has(b));if(!options.length){stack.pop();continue}const b=options[Math.floor(r()*options.length)];join(a,b);visited.add(b);stack.push(b)}
 for(let a=0;a<n*n;a++)for(const b of neighbors(a))if(r()<.18)join(a,b);
 const switches:House['switches']=[];
 for(let i=0;i<rooms.length;i++){const q=rooms[i],x=i%n,z=Math.floor(i/n);if(x===0)walls.push({x:q.x,z:q.centerZ,w:.18,d:size});if(z===0)walls.push({x:q.centerX,z:q.z,w:size,d:.18});if(x===n-1||!links[i].includes(i+1)){walls.push({x:q.x+size,z:q.centerZ,w:.18,d:size});if(i===0||r()<.28)switches.push({cell:i,x:q.x+size-.15,z:q.centerZ})}if(z===n-1||!links[i].includes(i+n)){walls.push({x:q.centerX,z:q.z+size,w:size,d:.18});if(r()<.2)switches.push({cell:i,x:q.centerX,z:q.z+size-.15})}}
 if(!switches.some(s=>s.cell===0))switches.unshift({cell:0,x:.15,z:size/2});
 const eligible=rooms.filter(q=>q.centerX+q.centerZ>size*4),kinds=['stalker','rusher','shooter','ambusher','defender'];const enemySpawns=Array.from({length:12},(_,i)=>{const q=eligible[Math.floor(r()*eligible.length)];return{x:q.centerX,y:0,z:q.centerZ,floor:0,kind:kinds[i%5]}});
 return{seed,rooms,floorYs:[0],stairs:[],area:n*n*size*size,enemySpawns,player:{x:size/2,y:0,z:size/2,floor:0},links,walls,switches:switches.slice(0,8),size};
}
export function cellAt(h:House,x:number,z:number){const col=Math.max(0,Math.min(5,Math.floor(x/h.size))),row=Math.max(0,Math.min(5,Math.floor(z/h.size)));return row*6+col}
export function route(h:House,from:number,to:number){const queue=[from],prev=new Map<number,number>([[from,-1]]);for(let k=0;k<queue.length;k++){const a=queue[k];if(a===to)break;for(const b of h.links[a])if(!prev.has(b)){prev.set(b,a);queue.push(b)}}if(!prev.has(to))return[];const path=[to];while(path[0]!==from)path.unshift(prev.get(path[0])!);return path}
