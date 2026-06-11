// CinéQuiz splash chunk — Sinners
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Sinners"]={
   name:'Sinners',
   color:'180,20,20',
   ref:'Sinners \u2014 Ryan Coogler, 2025',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_sin_s');
    if(!_s){_s=document.createElement('style');_s.id='_sin_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:23%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Braises ── */
    const embers=Array.from({length:55},()=>({
     x:Math.random()*W,y:H*(0.42+Math.random()*0.45),
     vx:(Math.random()-0.5)*0.50,vy:-(0.22+Math.random()*0.60),
     r:Math.random()*2.4+0.4,life:0.7+Math.random()*0.5,
     col:Math.random()<0.55?'255,50,0':Math.random()<0.7?'220,120,0':'200,10,0',
    }));

    /* ── Étoiles ── */
    const stars=Array.from({length:50},()=>({
     x:Math.random()*W,y:Math.random()*H*0.48,
     r:Math.random()*1.0+0.2,op:0.25+Math.random()*0.40,ph:Math.random()*Math.PI*2,
    }));

    /* ── Ondes blues ── */
    const bluesWaves=Array.from({length:6},(_,i)=>({
     phase:i*Math.PI*0.4,spd:0.025+i*0.005,
     amp:H*(0.022+i*0.006),
     op:0.14+i*0.025,
    }));

    /* ── Flammes basses gauche + droite ── */
    const flames=Array.from({length:8},(_,i)=>({
     x:i<4?W*(0.02+i*0.08):W*(0.70+((i-4)*0.08)),
     baseY:H*0.62,h:H*(0.08+Math.random()*0.07),
     w:W*(0.018+Math.random()*0.012),ph:Math.random()*Math.PI*2,
     spd:0.06+Math.random()*0.05,
    }));

    /* ── Silhouettes dansantes ── */
    /* 4 personnages : 2 couples, positions fixes réparties */
    const dancers=Array.from({length:4},(_,i)=>({
     x:W*(0.15+i*0.22),
     baseY:H*0.62,
     size:H*(0.040+Math.random()*0.008),
     /* phase décalée pour que chaque danseur soit désynchronisé */
     ph:i*Math.PI*0.55+Math.random()*0.5,
     sway:0.018+Math.random()*0.012,  /* amplitude déhanchement */
     armPh:i*Math.PI*0.4,             /* phase des bras */
    }));

    function drawDancer(x,y,sz,ph,armPh){
     const sway=Math.sin(ph)*sz*0.18;
     const bob=Math.abs(Math.sin(ph*2))*sz*0.08;
     const lean=Math.sin(ph)*0.12; /* légère inclinaison */

     ctx.save();
     ctx.translate(x+sway, y-bob);
     ctx.rotate(lean);

     ctx.fillStyle='rgba(8,0,0,0.97)';
     ctx.strokeStyle='rgba(8,0,0,0.97)';
     ctx.lineCap='round';

     /* Tête */
     ctx.beginPath();ctx.arc(0,-sz*2.55,sz*0.40,0,Math.PI*2);ctx.fill();

     /* Corps */
     ctx.beginPath();ctx.ellipse(0,-sz*1.50,sz*0.28,sz*0.72,0,0,Math.PI*2);ctx.fill();

     /* Hanches — légèrement plus larges */
     ctx.beginPath();ctx.ellipse(0,-sz*0.78,sz*0.32,sz*0.30,0,0,Math.PI*2);ctx.fill();

     /* Bras gauche */
     const armL=Math.sin(armPh)*sz*0.55;
     ctx.lineWidth=sz*0.30;
     ctx.beginPath();
     ctx.moveTo(-sz*0.22,-sz*1.80);
     ctx.quadraticCurveTo(-sz*0.65+armL,-sz*1.20,-sz*0.55+armL*0.6,-sz*0.68);
     ctx.stroke();

     /* Bras droit */
     const armR=Math.sin(armPh+Math.PI)*sz*0.55;
     ctx.beginPath();
     ctx.moveTo(sz*0.22,-sz*1.80);
     ctx.quadraticCurveTo(sz*0.65+armR,-sz*1.20,sz*0.55+armR*0.6,-sz*0.68);
     ctx.stroke();

     /* Jambe gauche */
     const legL=Math.sin(ph+Math.PI*0.5)*sz*0.35;
     ctx.beginPath();
     ctx.moveTo(-sz*0.12,-sz*0.52);
     ctx.quadraticCurveTo(-sz*0.30+legL,-sz*0.10,-sz*0.20+legL,sz*0.04);
     ctx.stroke();

     /* Jambe droite */
     const legR=Math.sin(ph-Math.PI*0.5)*sz*0.35;
     ctx.beginPath();
     ctx.moveTo(sz*0.12,-sz*0.52);
     ctx.quadraticCurveTo(sz*0.30+legR,-sz*0.10,sz*0.20+legR,sz*0.04);
     ctx.stroke();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── FOND — moins sombre, halo chaud visible ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#0a0100');
     bg.addColorStop(0.30,'#120200');
     bg.addColorStop(0.60,'#1c0400');
     bg.addColorStop(0.85,'#240600');
     bg.addColorStop(1,'#1a0300');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo rouge-orangé central — juke-joint en feu ── */
     const fireGlow=ctx.createRadialGradient(cx,H*0.60,0,cx,H*0.60,W*0.75);
     fireGlow.addColorStop(0,`rgba(255,60,0,${0.22+Math.sin(t*0.35)*0.05})`);
     fireGlow.addColorStop(0.25,'rgba(200,30,0,0.12)');
     fireGlow.addColorStop(0.55,'rgba(140,15,0,0.06)');
     fireGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=fireGlow;ctx.fillRect(0,0,W,H);

     /* Halo secondaire plus haut — ambiance */
     const ambGlow=ctx.createRadialGradient(cx,H*0.35,0,cx,H*0.35,W*0.55);
     ambGlow.addColorStop(0,`rgba(180,20,0,${0.12+Math.sin(t*0.25+1)*0.03})`);
     ambGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ambGlow;ctx.fillRect(0,0,W,H);

     /* ── Étoiles ── */
     for(const s of stars){
      s.ph+=0.013;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,200,150,${s.op*(0.5+0.5*Math.sin(s.ph))})`;ctx.fill();
     }

     /* ── Croix — ombre en arrière-plan ── */
     const crossX=cx,crossY=H*0.38,crossW=W*0.006,crossH=H*0.18;
     ctx.fillStyle=`rgba(180,10,0,${0.08+Math.sin(t*0.20)*0.02})`;
     ctx.fillRect(crossX-crossW/2,crossY-crossH/2,crossW,crossH);
     ctx.fillRect(crossX-crossH*0.30,crossY-crossW*1.5,crossH*0.60,crossW*3);

     /* ── Plaine du Delta — horizon sombre ── */
     ctx.fillStyle='rgba(10,1,0,0.97)';
     ctx.beginPath();ctx.moveTo(0,H*0.62);
     for(let x=0;x<=W;x+=W*0.04){
      ctx.lineTo(x,H*(0.62+Math.sin(x*0.012+t*0.08)*0.015));
     }
     ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();

     /* ── Flammes basses ── */
     for(const f of flames){
      f.ph+=f.spd;
      const flicker=0.65+0.35*Math.abs(Math.sin(f.ph));
      const fh=f.h*flicker;
      const fg=ctx.createLinearGradient(f.x,f.baseY,f.x,f.baseY-fh);
      fg.addColorStop(0,`rgba(255,80,0,${0.80*flicker})`);
      fg.addColorStop(0.4,`rgba(220,40,0,${0.55*flicker})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;
      ctx.beginPath();
      ctx.moveTo(f.x-f.w,f.baseY);
      ctx.bezierCurveTo(f.x-f.w*0.5,f.baseY-fh*0.45,f.x+f.w*0.3,f.baseY-fh*0.60,f.x,f.baseY-fh);
      ctx.bezierCurveTo(f.x-f.w*0.3,f.baseY-fh*0.60,f.x+f.w*0.5,f.baseY-fh*0.45,f.x+f.w,f.baseY);
      ctx.closePath();ctx.fill();
     }

     /* ── Ondes blues ── */
     for(const wv of bluesWaves){
      wv.phase+=wv.spd;
      ctx.strokeStyle=`rgba(230,35,0,${wv.op+Math.abs(Math.sin(wv.phase))*0.08})`;
      ctx.lineWidth=1.3;
      ctx.beginPath();ctx.moveTo(0,H*0.54);
      for(let x=0;x<=W;x+=5){
       ctx.lineTo(x,H*0.54+Math.sin(wv.phase+x*0.020)*wv.amp);
      }
      ctx.stroke();
     }

     /* ── Silhouettes dansantes ── */
     for(const d of dancers){
      d.ph+=d.sway;d.armPh+=d.sway*1.4;
      drawDancer(d.x,d.baseY,d.size,d.ph,d.armPh);
     }

     /* ── Braises ── */
     for(const e of embers){
      e.x+=e.vx;e.y+=e.vy;e.vy+=0.016;e.life-=0.008;
      if(e.life<=0){
       e.x=W*0.08+Math.random()*W*0.84;e.y=H*(0.52+Math.random()*0.18);
       e.vx=(Math.random()-0.5)*0.50;e.vy=-(0.22+Math.random()*0.60);
       e.life=0.7+Math.random()*0.5;
      }
      ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${e.col},${0.65*e.life})`;ctx.fill();
     }

     /* ── Vignette ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.06,cx,H*0.48,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.10)');
     vg.addColorStop(0.75,'rgba(0,0,0,0.45)');
     vg.addColorStop(1,'rgba(0,0,0,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
