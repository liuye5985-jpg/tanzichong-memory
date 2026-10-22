export const clamp=(x,min=0,max=1)=>Math.max(min,Math.min(max,x));
export function interpretPose(pose){
 const visible=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&(p.visibility??1)>.55;
 if(!pose||![11,12,15,16].every(i=>visible(pose[i])))return null;
 const [ls,rs,lw,rw]=[pose[11],pose[12],pose[15],pose[16]];
 const shoulder=Math.max(.08,Math.hypot(ls.x-rs.x,ls.y-rs.y));
 const opening=clamp((Math.hypot(lw.x-rw.x,lw.y-rw.y)/shoulder-1.25)/2.1);
 const hands=[lw,rw].map(p=>({x:clamp(1-p.x),y:clamp(p.y)}));
 const nose=pose[0];let page=0;
 if(visible(nose)){const left=lw.y<nose.y-.06,right=rw.y<nose.y-.06;if(left!==right)page=right?1:-1;}
 return {opening,hands,page,light:clamp(1-(lw.y+rw.y)/2)};
}
export class DwellTarget{
 constructor(duration=1050){this.duration=duration;this.key=null;this.start=0;this.latched=null;}
 update(key,now){if(!key){this.key=null;this.latched=null;return false;}if(key!==this.key){this.key=key;this.start=now;this.latched=null;}if(this.latched===key)return false;if(now-this.start>=this.duration){this.latched=key;return true;}return false;}
}
