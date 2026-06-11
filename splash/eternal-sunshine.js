// CinéQuiz splash chunk — Eternal Sunshine
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Eternal Sunshine"]={
   name:'Eternal Sunshine',
   color:'80,140,200',
   ref:'Eternal Sunshine of the Spotless Mind \u2014 Michel Gondry, 2004',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;const cx=W/2;

    /* ── CSS ── */
    let _es=document.getElementById('_es_s');if(!_es){_es=document.createElement('style');_es.id='_es_s';document.head.appendChild(_es);}
    _es.textContent='#splash-content-wrap{top:65%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:rgba(255,255,255,0.95)!important;text-shadow:0 1px 12px rgba(100,160,220,0.60)!important;}';
    const _esW=setInterval(()=>{if(stop.v){_es.textContent='';clearInterval(_esW);}},200);

    /* ── Image de fond ESOTSM.png ── */
    const bgImg=new Image();let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/ESOTSM.png';

    /* ── Flocons — plus nombreux et variés ── */
    const flakes=Array.from({length:80},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vy:0.18+Math.random()*0.55, vx:(Math.random()-0.5)*0.30,
     r:Math.random()*2.4+0.4,
     op:Math.random()*0.55+0.12,
     wb:Math.random()*Math.PI*2, wSpd:0.006+Math.random()*0.010,
     twinkle:Math.random()*Math.PI*2, twSpd:0.02+Math.random()*0.03,
    }));

    /* ── Particules de mémoire — petits points bleutés qui s'effacent ── */
    const memories=Array.from({length:28},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.20, vy:-(0.08+Math.random()*0.18),
     r:Math.random()*3+1,
     life:Math.random(), decay:0.0018+Math.random()*0.0022,
     col:Math.random()<0.5?'140,190,240':'200,220,255',
    }));

    /* ── Étoiles fixes dans le ciel ── */
    const stars=Array.from({length:35},()=>({
     x:Math.random()*W, y:Math.random()*H*0.55,
     r:Math.random()*1.2+0.3,
     ph:Math.random()*Math.PI*2, spd:0.018+Math.random()*0.025,
    }));

    /* ── Fissures dans la glace ── */
    function drawCracks(ox,oy,scale){
     ctx.save();ctx.translate(ox,oy);ctx.scale(scale,scale);
     ctx.strokeStyle='rgba(200,225,255,0.45)';ctx.lineWidth=1.0;ctx.lineCap='round';
     const arms=[[0,0,-55,-28],[0,0,-30,-65],[0,0,18,-72],[0,0,58,-18],[0,0,42,38],[0,0,-20,55],[0,0,-62,12]];
     for(const [x1,y1,x2,y2] of arms){
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
      const mx=(x1+x2)*.55,my=(y1+y2)*.55;
      const nx=-(y2-y1)*.28,ny=(x2-x1)*.28;
      ctx.lineWidth=0.55;
      ctx.beginPath();ctx.moveTo(mx,my);ctx.lineTo(mx+nx,my+ny);ctx.stroke();
      ctx.beginPath();ctx.moveTo(mx,my);ctx.lineTo(mx-nx*.6,my-ny*.6);ctx.stroke();
      ctx.lineWidth=1.0;
     }
     ctx.restore();
    }

    /* ── Souffle de vent ── */
    const windLines=Array.from({length:12},()=>({
     x:Math.random()*W*1.4-W*0.2, y:H*0.15+Math.random()*H*0.50,
     len:W*(0.04+Math.random()*0.06),
     vy:(Math.random()-0.5)*0.08, vx:0.6+Math.random()*0.8,
     op:0.06+Math.random()*0.10,
    }));

    function frame(){
     if(stop.v)return;

     /* ── Image de fond plein écran ── */
     if(bgReady){
      /* Couvre tout le canvas en préservant le ratio par "cover" */
      const iR=bgImg.naturalWidth/bgImg.naturalHeight;
      const cR=W/H;
      let sw,sh,sx,sy;
      if(iR>cR){sh=bgImg.naturalHeight;sw=sh*cR;sx=(bgImg.naturalWidth-sw)/2;sy=0;}
      else{sw=bgImg.naturalWidth;sh=sw/cR;sx=0;sy=(bgImg.naturalHeight-sh)/2;}
      ctx.drawImage(bgImg,sx,sy,sw,sh,0,0,W,H);
     } else {
      /* Fallback gradient pendant le chargement */
      const fb=ctx.createLinearGradient(0,0,0,H);
      fb.addColorStop(0,'#a8cce0');fb.addColorStop(0.5,'#6aaad0');fb.addColorStop(1,'#1a3a60');
      ctx.fillStyle=fb;ctx.fillRect(0,0,W,H);
     }

     /* ── Voile bleuté très léger pour harmoniser les animations ── */
     ctx.fillStyle='rgba(60,100,160,0.08)';ctx.fillRect(0,0,W,H);

     /* ── Étoiles scintillantes ── */
     for(const s of stars){
      s.ph+=s.spd;
      const op=0.20+0.65*Math.abs(Math.sin(s.ph));
      ctx.fillStyle=`rgba(255,255,255,${op})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Fissures de glace ── */
     drawCracks(W*0.38,H*0.62,W/240);
     /* Seconde fissure plus petite */
     ctx.globalAlpha=0.55;
     drawCracks(W*0.55,H*0.58,W/480);
     ctx.globalAlpha=1;

     /* ── Particules de mémoire (se dissolvent) ── */
     for(const m of memories){
      m.x+=m.vx;m.y+=m.vy;m.life-=m.decay;
      if(m.life<=0){
       m.x=Math.random()*W;m.y=H*0.40+Math.random()*H*0.40;
       m.life=0.6+Math.random()*0.4;m.vy=-(0.08+Math.random()*0.18);
       m.vx=(Math.random()-0.5)*0.20;
       m.col=Math.random()<0.5?'140,190,240':'200,220,255';
      }
      const mg=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r*2.5);
      mg.addColorStop(0,`rgba(${m.col},${m.life*0.70})`);
      mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;ctx.beginPath();ctx.arc(m.x,m.y,m.r*2.5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(${m.col},${m.life*0.85})`;
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Lignes de vent ── */
     ctx.lineCap='round';
     for(const w of windLines){
      w.x+=w.vx;w.y+=w.vy;
      if(w.x>W+w.len*2){w.x=-w.len*2;w.y=H*0.15+Math.random()*H*0.50;}
      ctx.strokeStyle=`rgba(220,235,255,${w.op})`;ctx.lineWidth=0.7;
      ctx.beginPath();ctx.moveTo(w.x,w.y);ctx.lineTo(w.x+w.len,w.y);ctx.stroke();
     }

     /* ── Flocons de neige ── */
     for(const f of flakes){
      f.y+=f.vy;f.x+=f.vx;
      f.wb+=f.wSpd;f.x+=Math.sin(f.wb)*0.28;
      f.twinkle+=f.twSpd;
      if(f.y>H+6){f.y=-6;f.x=Math.random()*W;}
      if(f.x<-4)f.x=W+4;if(f.x>W+4)f.x=-4;
      const fop=f.op*(0.55+0.45*Math.abs(Math.sin(f.twinkle)));
      /* Halo doux autour du flocon */
      const fg2=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*2.2);
      fg2.addColorStop(0,`rgba(255,255,255,${fop*0.35})`);
      fg2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg2;ctx.beginPath();ctx.arc(f.x,f.y,f.r*2.2,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,255,255,${fop})`;
      ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette douce sur les bords et en bas ── */
     const vig=ctx.createRadialGradient(cx,H*0.42,H*0.10,cx,H*0.42,H*0.82);
     vig.addColorStop(0,'rgba(0,0,0,0)');
     vig.addColorStop(0.50,'rgba(0,0,0,0.04)');
     vig.addColorStop(1,'rgba(0,0,0,0.60)');
     ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);
     /* Fondu bas */
     const fd=ctx.createLinearGradient(0,H*0.72,0,H);
     fd.addColorStop(0,'rgba(5,15,35,0)');fd.addColorStop(1,'rgba(5,15,35,0.70)');
     ctx.fillStyle=fd;ctx.fillRect(0,H*0.72,W,H*0.28);

     t+=0.014;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
