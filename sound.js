/** Browser-synthesized ambience; no microphone or external audio files. */
export class Soundscape {
 constructor(){this.enabled=false;this.context=null;this.master=null;}
 async start(){
  if(!this.context){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw Error('audio unsupported');const ac=this.context=new AC();this.master=ac.createGain();this.master.gain.value=0;this.master.connect(ac.destination);
   const buffer=ac.createBuffer(1,ac.sampleRate*4,ac.sampleRate),data=buffer.getChannelData(0);let brown=0;for(let i=0;i<data.length;i++){brown=(brown+Math.random()*.025-.0125)/1.025;data[i]=brown;}
   this.wind=ac.createBufferSource();this.wind.buffer=buffer;this.wind.loop=true;this.filter=ac.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=410;this.windGain=ac.createGain();this.windGain.gain.value=.35;this.wind.connect(this.filter);this.filter.connect(this.windGain);this.windGain.connect(this.master);this.wind.start();
  }await this.context.resume();this.enabled=true;this.master.gain.setTargetAtTime(.55,this.context.currentTime,.3);
 }
 mute(){this.enabled=false;if(this.context)this.master.gain.setTargetAtTime(0,this.context.currentTime,.2);}
 tone(frequency,duration=1,volume=.05,delay=0,type='sine'){
  if(!this.enabled||!this.context)return;const ac=this.context,t=ac.currentTime+delay,o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(frequency,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+duration+.04);o.onended=()=>{o.disconnect();g.disconnect();};
 }
 play(kind,energy=.5){const v=.025+Math.min(1,energy)*.035;
  if(kind==='water'){this.tone(550+energy*350,.35,v);this.tone(900,.25,v*.4,.05);}
  else if(kind==='bell'){[392,587.33,783.99].forEach((f,i)=>this.tone(f,1.8,v,i*.065));}
  else if(kind==='paper'){this.tone(150,.07,.02,0,'triangle');this.tone(230,.09,.012,.05,'triangle');}
  else if(kind==='seal'){this.tone(90,.12,.065,0,'triangle');}
  else if(kind==='door'){this.tone(95,.7,.022,0,'triangle');this.tone(142,.5,.018,.1,'triangle');}
  else if(kind==='bamboo'){this.tone(290,.2,.023,0,'triangle');this.tone(435,.15,.017,.12);}
  else if(kind==='camera'){this.tone(800,.05,.04);this.tone(500,.07,.035,.08);}
  else this.tone(523.25,.8,v*.6);
 }
 update(wind,light){if(!this.context||!this.enabled)return;const t=this.context.currentTime;this.filter.frequency.setTargetAtTime(280+wind*600+light*120,t,.4);this.windGain.gain.setTargetAtTime(.2+wind*.7,t,.5);}
 suspend(){this.context?.suspend();}
 resume(){if(this.enabled)this.context?.resume().catch(()=>{});}
 close(){this.context?.close();}
}
