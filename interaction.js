export const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
export const POINTS=[
 {id:'door',scene:0,title:'推门',hint:'双臂展开'},
 {id:'mist',scene:1,title:'拂雾',hint:'横向挥手'},
 {id:'pond',scene:1,title:'点水',hint:'手在水面移动'},
 {id:'bamboo',scene:1,title:'摇竹',hint:'停手竹影间'},
 {id:'sun',scene:1,title:'引光',hint:'单手举高'},
 {id:'chime',scene:1,title:'听铃',hint:'停手檐铃旁'},
 {id:'window',scene:2,title:'开窗',hint:'停手窗前，再展开双臂'},
 {id:'book',scene:2,title:'翻书',hint:'停手书页，再左右挥动'},
 {id:'ink',scene:2,title:'写意',hint:'停手笔尖，再在纸上移动'},
 {id:'seal',scene:2,title:'落印',hint:'写意后双手合拢'},
 {id:'lantern',scene:2,title:'点灯',hint:'双手举过头顶'},
 {id:'postcard',scene:3,title:'留影',hint:'双手合拢并保持'}
];
export function interpretPose(pose){
 const visible=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&(p.visibility??1)>.55;
 if(!pose||![11,12,15,16].every(i=>visible(pose[i])))return null;
 const [ls,rs,lw,rw]=[pose[11],pose[12],pose[15],pose[16]],nose=pose[0];
 const shoulder=Math.max(.08,Math.hypot(ls.x-rs.x,ls.y-rs.y));
 const handDistance=Math.hypot(lw.x-rw.x,lw.y-rw.y);
 const hands=[lw,rw].map(p=>({x:clamp(((1-p.x)-.10)/.80),y:clamp((p.y-.10)/.80)}));
 const high=visible(nose)?[lw.y<nose.y-.035,rw.y<nose.y-.035]:[false,false];
 return {hands,opening:clamp((handDistance/shoulder-1.2)/1.9),together:handDistance/shoulder<.6&&((lw.y+rw.y)/2)>.32,
 high,bothHigh:high.every(Boolean),singleHigh:high[0]!==high[1],light:clamp(1-(lw.y+rw.y)/2),lean:clamp(((ls.x+rs.x)/2-.5)*3,-1,1)};
}
export class DwellTarget{
 constructor(duration=1000){this.duration=duration;this.reset();}
 reset(){this.key=null;this.start=0;this.latched=null;this.progress=0;}
 update(key,now){if(!key){this.reset();return false;}if(key!==this.key){this.key=key;this.start=now;this.latched=null;}this.progress=clamp((now-this.start)/this.duration);if(this.latched===key)return false;if(this.progress===1){this.latched=key;return true;}return false;}
}
export class HoldGesture{
 constructor(duration){this.duration=duration;this.reset();}
 reset(){this.start=null;this.fired=false;this.progress=0;}
 update(active,now){if(!active){this.reset();return false;}if(this.start===null)this.start=now;this.progress=clamp((now-this.start)/this.duration);if(!this.fired&&this.progress===1){this.fired=true;return true;}return false;}
}
export class SwipeGesture{
 constructor(){this.reset();this.lastFire=-Infinity;}
 reset(){this.samples=[];}
 update(hands,now){
  this.samples.push({hands:hands.map(h=>({...h})),time:now});this.samples=this.samples.filter(s=>now-s.time<600);
  if(now-this.lastFire<1000||this.samples.length<3)return 0;
  const first=this.samples[0],dt=(now-first.time)/1000;if(dt<.16)return 0;
  for(let i=0;i<2;i++){const dx=hands[i].x-first.hands[i].x,dy=Math.abs(hands[i].y-first.hands[i].y);if(Math.abs(dx)>.18&&Math.abs(dx)/dt>.45&&dy<.18){this.lastFire=now;this.samples=[];return Math.sign(dx);}}
  return 0;
 }
}
