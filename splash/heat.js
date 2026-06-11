// CinéQuiz splash chunk — Heat
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Heat"]={
   name:'Heat',
   color:'30,80,180',
   ref:'Heat \u2014 Michael Mann, 1995',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;

    /* ── CSS : centrage vertical du contenu ── */
    let _htS=document.getElementById('_ht_s');
    if(!_htS){_htS=document.createElement('style');_htS.id='_ht_s';document.head.appendChild(_htS);}
    _htS.textContent=`
      #splash-content-wrap{top:25%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _htW=setInterval(()=>{if(stop.v){_htS.textContent='';clearInterval(_htW);}},200);

    /* ── Image de fond Heat.png ── */
    const bgImg=new Image();
    let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/Heat.png';

    /* ── Étoiles scintillantes dans le ciel (zone haute ~60% du canvas) ── */
    const stars=Array.from({length:180},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.62,
     r:Math.random()*1.2+0.2,
     baseOp:Math.random()*0.55+0.15,
     ph:Math.random()*Math.PI*2,
     freq:0.008+Math.random()*0.030,
     color:Math.random()>0.88?'200,220,255':'255,255,255',
    }));

    /* ── Étoiles filantes ── */
    const shootingStars=Array.from({length:3},()=>({
     active:false, x:0, y:0, vx:0, vy:0,
     len:0, op:0, life:0, maxLife:0,
     nextSpawn:Math.random()*420+180,
    }));

    /* ── Halo ville respirant (lueur bleue diffuse) ── */
    const cityGlowY=H*0.72; /* horizon approximatif */

    /* ── Flash lumineux (rares, fugaces) ── */
    let flashOp=0;
    let flashTimer=Math.random()*600+400;
    let flashX=W*0.5;

    /* ── Lueurs de fenêtres animées sur la skyline ── */
    // Points de lumière distribués sur la bande basse du ciel / toits
    const cityLights=Array.from({length:55},()=>({
     x:Math.random()*W,
     y:H*(0.60+Math.random()*0.18),
     r:Math.random()*2.0+0.6,
     baseOp:Math.random()*0.35+0.05,
     ph:Math.random()*Math.PI*2,
     freq:0.012+Math.random()*0.040,
     warm:Math.random()>0.45,
    }));

    /* ── Avion (point lumineux clignotant traversant) ── */
    const plane={
     x:-W*0.05, y:H*(0.08+Math.random()*0.18),
     spd:W*0.0008+Math.random()*W*0.0006,
     blinkPh:0,
     active:true,
    };

    function spawnShootingStar(ss){
     ss.x=W*(0.05+Math.random()*0.65);
     ss.y=H*(0.02+Math.random()*0.28);
     const angle=Math.PI*0.18+Math.random()*Math.PI*0.14;
     const spd=W*(0.016+Math.random()*0.018);
     ss.vx=Math.cos(angle)*spd;
     ss.vy=Math.sin(angle)*spd;
     ss.len=W*(0.06+Math.random()*0.09);
     ss.op=0;
     ss.life=0;
     ss.maxLife=55+Math.random()*35;
     ss.active=true;
    }

    function frame(){
     if(stop.v)return;

     /* ── Image de fond plein-canvas ── */
     if(bgReady){
      ctx.save();
      ctx.globalAlpha=1.0;
      // cover : centrer + remplir tout le canvas
      const ir=bgImg.naturalWidth/bgImg.naturalHeight;
      const cr=W/H;
      let dw,dh,dx,dy;
      if(ir>cr){dh=H;dw=dh*ir;dx=(W-dw)/2;dy=0;}
      else{dw=W;dh=dw/ir;dx=0;dy=(H-dh)/2;}
      ctx.drawImage(bgImg,dx,dy,dw,dh);
      ctx.restore();
     } else {
      /* fallback fond noir pendant le chargement */
      ctx.fillStyle='#01030a';ctx.fillRect(0,0,W,H);
     }

     /* ── Overlay très léger pour assombrir légèrement et homogénéiser ── */
     ctx.fillStyle='rgba(0,4,18,0.18)';ctx.fillRect(0,0,W,H);

     /* ── Halo de lueur bleue autour du centre-ville ── */
     const glowPulse=0.22+Math.sin(t*0.28)*0.04;
     const cityGlow=ctx.createRadialGradient(W*0.5,cityGlowY,0,W*0.5,cityGlowY,W*0.75);
     cityGlow.addColorStop(0,`rgba(15,45,110,${glowPulse})`);
     cityGlow.addColorStop(0.35,`rgba(8,22,60,${glowPulse*0.45})`);
     cityGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cityGlow;ctx.fillRect(0,cityGlowY-H*0.35,W,H*0.55);

     /* ── Étoiles scintillantes ── */
     for(const s of stars){
      s.ph+=s.freq;
      const op=s.baseOp*(0.55+0.45*Math.sin(s.ph));
      ctx.fillStyle=`rgba(${s.color},${op})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
      /* halo discret sur les plus grandes */
      if(s.r>1.0&&op>0.4){
       const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3.5);
       sg.addColorStop(0,`rgba(${s.color},${op*0.18})`);
       sg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r*3.5,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Lueurs de fenêtres ── */
     for(const c of cityLights){
      c.ph+=c.freq;
      const op=c.baseOp*(0.5+0.5*Math.sin(c.ph));
      if(op<0.01)continue;
      ctx.fillStyle=c.warm?`rgba(230,180,60,${op})`:`rgba(100,155,255,${op})`;
      ctx.beginPath();ctx.arc(c.x,c.y,c.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Étoiles filantes ── */
     for(const ss of shootingStars){
      if(!ss.active){
       ss.nextSpawn--;
       if(ss.nextSpawn<=0) spawnShootingStar(ss);
       continue;
      }
      ss.life++;
      const progress=ss.life/ss.maxLife;
      /* fade in rapide, fade out progressif */
      if(progress<0.15) ss.op=progress/0.15;
      else ss.op=1-(progress-0.15)/0.85;
      ss.op=Math.max(0,Math.min(1,ss.op))*0.75;
      ss.x+=ss.vx;ss.y+=ss.vy;
      /* traîne lumineuse */
      const tx=ss.x-ss.vx*(ss.len/Math.hypot(ss.vx,ss.vy));
      const ty=ss.y-ss.vy*(ss.len/Math.hypot(ss.vx,ss.vy));
      const grad=ctx.createLinearGradient(tx,ty,ss.x,ss.y);
      grad.addColorStop(0,'rgba(255,255,255,0)');
      grad.addColorStop(1,`rgba(220,235,255,${ss.op})`);
      ctx.strokeStyle=grad;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(ss.x,ss.y);ctx.stroke();
      if(ss.life>=ss.maxLife){
       ss.active=false;
       ss.nextSpawn=Math.random()*500+250;
      }
     }

     /* ── Avion clignotant ── */
     plane.x+=plane.spd;
     plane.blinkPh+=0.06;
     if(plane.x>W*1.05){
      plane.x=-W*0.05;
      plane.y=H*(0.05+Math.random()*0.22);
      plane.spd=W*0.0007+Math.random()*W*0.0007;
     }
     const blinkVisible=Math.sin(plane.blinkPh)>0.3;
     if(blinkVisible){
      ctx.fillStyle=`rgba(255,240,200,0.7)`;
      ctx.beginPath();ctx.arc(plane.x,plane.y,1.5,0,Math.PI*2);ctx.fill();
     }

     /* ── Flash lumineux ── */
     flashTimer--;
     if(flashTimer<=0){
      flashOp=0.55+Math.random()*0.30;
      flashX=W*(0.15+Math.random()*0.70);
      flashTimer=Math.random()*700+350;
     }
     if(flashOp>0.01){
      const fg=ctx.createRadialGradient(flashX,H*0.45,0,flashX,H*0.45,W*0.55);
      fg.addColorStop(0,`rgba(180,210,255,${flashOp*0.12})`);
      fg.addColorStop(0.3,`rgba(100,160,255,${flashOp*0.05})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.fillRect(0,0,W,H);
      flashOp*=0.82;
     }

     /* ── Vignette cinématographique ── */
     const vg=ctx.createRadialGradient(W/2,H*0.48,H*0.08,W/2,H*0.48,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.78,'rgba(0,0,0,0.42)');
     vg.addColorStop(1,'rgba(0,0,0,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
