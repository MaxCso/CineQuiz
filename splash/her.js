// CinéQuiz splash chunk — Her
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Her"]={
   name:'Her',
   color:'255,120,60',
   ref:'Her \u2014 Spike Jonze, 2013',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.68';
    let t=0;

    /* ── Citation plus basse + logo réduit ── */
    let _herS=document.getElementById('_her_s');
    if(!_herS){_herS=document.createElement('style');_herS.id='_her_s';document.head.appendChild(_herS);}
    _herS.textContent='#splash-content-wrap{top:58%!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-film-logo{max-width:130px!important;}';
    const _herW=setInterval(()=>{if(stop.v){_herS.textContent='';clearInterval(_herW);}},200);

    const waves=Array.from({length:7},(_,i)=>({
     phase:i*Math.PI*0.28, freq:0.012+i*0.002,
     amp:18+i*8, spd:0.8+i*0.15,
     hue:18+i*10, op:0.18-i*0.018
    }));

    const motes=Array.from({length:55},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.3, vy:-(Math.random()*0.25+0.05),
     r:Math.random()*2.5+0.5,
     op:Math.random()*0.4+0.1,
     phase:Math.random()*Math.PI*2
    }));
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(8,4,2,0.14)';ctx.fillRect(0,0,W,H);

     const lg=ctx.createRadialGradient(W*0.5,H*0.38,30,W*0.5,H*0.38,W*0.65);
     lg.addColorStop(0,`rgba(${230+Math.sin(t*0.3)*15|0},${140+Math.sin(t*0.2)*10|0},60,0.10)`);
     lg.addColorStop(0.6,`rgba(180,80,20,0.04)`);
     lg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lg;ctx.fillRect(0,0,W,H);

     for(const w of waves){
      ctx.beginPath();
      for(let x=0;x<=W;x+=3){
       const y=H*0.43+Math.sin(x*w.freq+t*w.spd+w.phase)*w.amp
           +Math.sin(x*w.freq*1.7+t*w.spd*0.6+w.phase)*w.amp*0.4;
       x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle=`rgba(255,255,255,${(w.op+Math.sin(t*0.4+w.phase)*0.04)*1.8})`;
      ctx.lineWidth=1.4;ctx.stroke();
     }

     for(const m of motes){
      m.x+=m.vx+Math.sin(t*0.3+m.phase)*0.15;
      m.y+=m.vy;
      if(m.y<-5){m.y=H+5;m.x=Math.random()*W;}
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,${170+Math.random()*40|0},80,${m.op})`;ctx.fill();
     }

     const vg=ctx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.75);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(12,5,0,0.55)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
