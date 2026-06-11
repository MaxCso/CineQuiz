// CinéQuiz splash chunk — Alien
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Alien"]={
   name:'Alien',
   color:'0,180,40',
   ref:'Alien \u2014 Ridley Scott, 1979',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Position citation + logo sous le header ── */
    let _alStyle=document.getElementById('_al_s');
    if(!_alStyle){_alStyle=document.createElement('style');_alStyle.id='_al_s';document.head.appendChild(_alStyle);}
    _alStyle.textContent='#splash-content-wrap{top:26%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _alW=setInterval(()=>{if(stop.v){_alStyle.textContent='';clearInterval(_alW);}},200);

    /* ── Radar — grand, décalé en bas ── */
    const radarCX=cx, radarCY=H*0.65, radarR=W*0.42;

    /* Blips — positions fixes, révélés par le balayage */
    const blips=Array.from({length:8},()=>({
     angle:Math.random()*Math.PI*2,
     dist:Math.random()*0.78+0.14,
     life:0,
     size:Math.random()*1.8+1.2,
     ripples:[] /* ondes de propagation */
    }));

    /* ── Lignes HUD / terminal MOTHER ── */
    const hudLines=[
     {text:'NOSTROMO — NCC-1701',   x:W*0.04, y:H*0.06,  op:0.55, blink:false},
     {text:'CREW STATUS: 7 / 7',    x:W*0.04, y:H*0.095, op:0.50, blink:false, tag:'crew'},
     {text:'MOTION DETECTED',       x:W*0.04, y:H*0.130, op:0.0,  blink:true,  tag:'motion'},
     {text:'GRID REF: 22-7N',       x:W*0.62, y:H*0.06,  op:0.45, blink:false},
     {text:'DIST: 0.8 AU',          x:W*0.62, y:H*0.095, op:0.42, blink:false},
     {text:'SIGNING OFF...',        x:W*0.62, y:H*0.130, op:0.0,  blink:true,  tag:'signing'},
    ];
    /* Compteur crew : descend de 7 à 1 au fil du temps */
    let crewCount=7, crewTimer=280;

    /* ── Spores flottantes ── */
    const spores=Array.from({length:55},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.15, vy:-(Math.random()*0.22+0.04),
     r:Math.random()*1.6+0.3,
     op:Math.random()*0.28+0.05,
     phase:Math.random()*Math.PI*2
    }));

    /* ── Structures Nostromo — tuyaux & colonnes ── */
    function drawNostromo(){
     /* Tuyaux horizontaux haut */
     const pipes=[
      {y:H*0.185, x1:0,      x2:W*0.28, r:5},
      {y:H*0.215, x1:W*0.18, x2:W*0.52, r:3.5},
      {y:H*0.175, x1:W*0.62, x2:W,      r:5},
      {y:H*0.205, x1:W*0.48, x2:W*0.84, r:3.5},
      {y:H*0.230, x1:0,      x2:W*0.14, r:3},
      {y:H*0.230, x1:W*0.86, x2:W,      r:3},
     ];
     for(const p of pipes){
      /* Corps du tuyau */
      const pg=ctx.createLinearGradient(0,p.y-p.r,0,p.y+p.r);
      pg.addColorStop(0,'rgba(0,55,12,0.72)');
      pg.addColorStop(0.4,'rgba(0,80,18,0.60)');
      pg.addColorStop(1,'rgba(0,30,6,0.80)');
      ctx.fillStyle=pg;
      ctx.fillRect(p.x1,p.y-p.r,p.x2-p.x1,p.r*2);
      /* Reflet vert phosphore */
      ctx.fillStyle='rgba(0,200,50,0.06)';
      ctx.fillRect(p.x1,p.y-p.r,p.x2-p.x1,p.r*0.55);
      /* Joints */
      ctx.strokeStyle='rgba(0,90,20,0.35)';ctx.lineWidth=1;
      for(let jx=p.x1+20;jx<p.x2-10;jx+=Math.random()*60+40){
       ctx.beginPath();ctx.moveTo(jx,p.y-p.r);ctx.lineTo(jx,p.y+p.r);ctx.stroke();
      }
     }

     /* Colonnes verticales */
     const cols=[
      {x:W*0.04, y1:H*0.17, y2:H*0.52, w:9},
      {x:W*0.09, y1:H*0.17, y2:H*0.38, w:5},
      {x:W*0.94, y1:H*0.17, y2:H*0.48, w:9},
      {x:W*0.89, y1:H*0.17, y2:H*0.36, w:5},
      {x:W*0.50, y1:H*0.17, y2:H*0.26, w:6},
     ];
     for(const c of cols){
      const cg=ctx.createLinearGradient(c.x-c.w/2,0,c.x+c.w/2,0);
      cg.addColorStop(0,'rgba(0,45,10,0.85)');
      cg.addColorStop(0.35,'rgba(0,70,16,0.70)');
      cg.addColorStop(1,'rgba(0,30,7,0.90)');
      ctx.fillStyle=cg;
      ctx.fillRect(c.x-c.w/2,c.y1,c.w,c.y2-c.y1);
      /* Voyant clignotant */
      const vp=0.5+Math.sin(t*1.8+c.x*0.05)*0.5;
      const vc=ctx.createRadialGradient(c.x,c.y2-10,0,c.x,c.y2-10,6);
      vc.addColorStop(0,`rgba(0,255,60,${0.70*vp})`);
      vc.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=vc;ctx.beginPath();ctx.arc(c.x,c.y2-10,6,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(0,220,50,${0.85*vp})`;
      ctx.beginPath();ctx.arc(c.x,c.y2-10,2,0,Math.PI*2);ctx.fill();
     }

     /* Grille technique basse */
     ctx.strokeStyle='rgba(0,80,18,0.10)';ctx.lineWidth=0.5;
     for(let gx=0;gx<W;gx+=W*0.07){
      ctx.beginPath();ctx.moveTo(gx,H*0.82);ctx.lineTo(gx,H);ctx.stroke();
     }
     for(let gy=H*0.84;gy<H;gy+=H*0.04){
      ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();
     }
    }

    /* ── HUD terminal ── */
    function drawHUD(){
     ctx.save();
     ctx.font=`${W*0.028}px 'Courier New',monospace`;
     ctx.textBaseline='top';

     /* Mise à jour crew */
     crewTimer--;
     if(crewTimer<=0 && crewCount>1){
      crewCount--;
      crewTimer=220+Math.floor(Math.random()*180);
      /* Met à jour la ligne crew */
      for(const l of hudLines){
       if(l.tag==='crew') l.text=`CREW STATUS: ${crewCount} / 7`;
      }
     }

     for(const l of hudLines){
      /* Lignes clignotantes */
      if(l.blink){
       if(l.tag==='motion') l.op=0.30+Math.sin(t*3.8)*0.28;
       if(l.tag==='signing') l.op=crewCount<=3?0.35+Math.sin(t*2.2)*0.30:0;
      }
      if(l.op<=0.01) continue;

      /* Lueur verte derrière le texte */
      const metrics=ctx.measureText(l.text);
      const glow=ctx.createRadialGradient(l.x+metrics.width*0.5,l.y+6,1,l.x+metrics.width*0.5,l.y+6,metrics.width*0.6);
      glow.addColorStop(0,`rgba(0,180,40,${l.op*0.12})`);
      glow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=glow;
      ctx.fillRect(l.x-8,l.y-4,metrics.width+16,20);

      /* Texte */
      ctx.shadowColor='rgba(0,255,60,0.6)';
      ctx.shadowBlur=6;
      ctx.fillStyle=`rgba(0,${200+Math.sin(t*0.8)*30|0},50,${l.op})`;
      ctx.fillText(l.text,l.x,l.y);
      ctx.shadowBlur=0;
     }

     /* Ligne de statut bas — défilement */
     const statusMsgs=[
      'LIFE SUPPORT: NOMINAL',
      'HYPERSLEEP: DISENGAGED',
      'SCIENCE OFFICER: OFFLINE',
      'EMERGENCY BEACON: ACTIVE',
      'HULL INTEGRITY: 94%',
     ];
     const si=Math.floor(t*0.08)%statusMsgs.length;
     ctx.font=`${W*0.022}px 'Courier New',monospace`;
     ctx.fillStyle=`rgba(0,160,35,0.30)`;
     ctx.fillText(`> ${statusMsgs[si]}_`, W*0.04, H*0.895);

     ctx.restore();
    }

    /* ── Radar ── */
    function drawRadar(){
     ctx.save();

     /* Fond du radar — disque sombre */
     const rfg=ctx.createRadialGradient(radarCX,radarCY,0,radarCX,radarCY,radarR);
     rfg.addColorStop(0,'rgba(0,28,6,0.55)');
     rfg.addColorStop(0.55,'rgba(0,18,4,0.42)');
     rfg.addColorStop(0.88,'rgba(0,12,2,0.28)');
     rfg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rfg;
     ctx.beginPath();ctx.arc(radarCX,radarCY,radarR,0,Math.PI*2);ctx.fill();

     /* Bordure du radar */
     ctx.strokeStyle='rgba(0,140,30,0.22)';ctx.lineWidth=1.2;
     ctx.beginPath();ctx.arc(radarCX,radarCY,radarR,0,Math.PI*2);ctx.stroke();

     /* Cercles concentriques */
     for(let i=1;i<=5;i++){
      const r=radarR*(i/5);
      ctx.beginPath();ctx.arc(radarCX,radarCY,r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(0,${90+i*22},${i*4},${0.14+i*0.028})`;
      ctx.lineWidth=i===5?1.0:0.6;
      ctx.stroke();
      /* Label distance */
      if(i<5){
       ctx.fillStyle=`rgba(0,150,35,0.22)`;
       ctx.font=`${W*0.020}px 'Courier New',monospace`;
       ctx.fillText(`${i*20}m`,radarCX+r+3,radarCY+4);
      }
     }

     /* Axes croisés */
     ctx.strokeStyle='rgba(0,140,30,0.16)';ctx.lineWidth=0.7;
     ctx.beginPath();ctx.moveTo(radarCX-radarR,radarCY);ctx.lineTo(radarCX+radarR,radarCY);ctx.stroke();
     ctx.beginPath();ctx.moveTo(radarCX,radarCY-radarR);ctx.lineTo(radarCX,radarCY+radarR);ctx.stroke();
     /* Diagonales */
     ctx.strokeStyle='rgba(0,100,20,0.09)';
     for(const angle of [Math.PI/4, -Math.PI/4]){
      ctx.beginPath();
      ctx.moveTo(radarCX+Math.cos(angle)*radarR,radarCY+Math.sin(angle)*radarR);
      ctx.lineTo(radarCX-Math.cos(angle)*radarR,radarCY-Math.sin(angle)*radarR);
      ctx.stroke();
     }

     /* ── Balayage — traînée lumineuse ── */
     const sweep=t*1.05;
     const trailSteps=60;
     const trailLen=Math.PI*0.65;
     for(let s=0;s<trailSteps;s++){
      const a=sweep - s*(trailLen/trailSteps);
      const fade=1-s/trailSteps;
      const op=fade*fade*0.42; /* quadratique — tombe vite */
      const green=100+Math.floor(fade*120);
      ctx.strokeStyle=`rgba(0,${green},8,${op})`;
      ctx.lineWidth=2.5-s*0.03;
      ctx.beginPath();
      ctx.moveTo(radarCX,radarCY);
      ctx.lineTo(radarCX+Math.cos(a)*radarR*0.97,radarCY+Math.sin(a)*radarR*0.97);
      ctx.stroke();
     }
     /* Ligne principale du balayage */
     const lineG=ctx.createLinearGradient(radarCX,radarCY,
      radarCX+Math.cos(sweep)*radarR,radarCY+Math.sin(sweep)*radarR);
     lineG.addColorStop(0,'rgba(0,255,60,0.0)');
     lineG.addColorStop(0.3,'rgba(0,255,60,0.25)');
     lineG.addColorStop(1,'rgba(0,255,60,0.72)');
     ctx.strokeStyle=lineG;ctx.lineWidth=1.8;
     ctx.beginPath();
     ctx.moveTo(radarCX,radarCY);
     ctx.lineTo(radarCX+Math.cos(sweep)*radarR*0.97,radarCY+Math.sin(sweep)*radarR*0.97);
     ctx.stroke();

     /* ── Blips + ondes de propagation ── */
     for(const b of blips){
      const da=sweep%(Math.PI*2);
      const ba=b.angle%(Math.PI*2);
      const diff=(da-ba+Math.PI*2)%(Math.PI*2);
      if(diff<0.10){
       b.life=1.0;
       /* Lance une nouvelle onde */
       b.ripples.push({r:0,op:1.0});
      }
      b.life*=0.968;

      /* Mise à jour des ondes */
      b.ripples=b.ripples.filter(rp=>rp.op>0.02);
      for(const rp of b.ripples){
       rp.r+=0.55;
       rp.op*=0.96;
      }

      const bx=radarCX+Math.cos(b.angle)*radarR*b.dist;
      const by=radarCY+Math.sin(b.angle)*radarR*b.dist;

      /* Ondes */
      for(const rp of b.ripples){
       ctx.beginPath();ctx.arc(bx,by,b.size+rp.r,0,Math.PI*2);
       ctx.strokeStyle=`rgba(0,220,55,${rp.op*0.35})`;
       ctx.lineWidth=0.8;ctx.stroke();
      }

      /* Point central du blip */
      if(b.life>0.04){
       /* Halo */
       const bg2=ctx.createRadialGradient(bx,by,0,bx,by,b.size+b.life*14);
       bg2.addColorStop(0,`rgba(0,255,70,${b.life*0.55})`);
       bg2.addColorStop(0.3,`rgba(0,200,50,${b.life*0.22})`);
       bg2.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=bg2;
       ctx.beginPath();ctx.arc(bx,by,b.size+b.life*14,0,Math.PI*2);ctx.fill();
       /* Point */
       ctx.beginPath();ctx.arc(bx,by,b.size+b.life*3,0,Math.PI*2);
       ctx.fillStyle=`rgba(120,255,140,${b.life*0.95})`;ctx.fill();
      }
     }

     /* Centre du radar */
     const cg=ctx.createRadialGradient(radarCX,radarCY,0,radarCX,radarCY,5);
     cg.addColorStop(0,'rgba(0,255,60,0.85)');
     cg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cg;ctx.beginPath();ctx.arc(radarCX,radarCY,5,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    /* ── Scanlines CRT ── */
    function drawCRT(){
     ctx.save();
     ctx.globalAlpha=0.045;
     for(let sy=0;sy<H;sy+=3){
      ctx.fillStyle='rgba(0,0,0,1)';
      ctx.fillRect(0,sy,W,1);
     }
     /* Légère courbure bord */
     const edge=ctx.createRadialGradient(cx,H*0.5,H*0.3,cx,H*0.5,H*0.82);
     edge.addColorStop(0,'rgba(0,0,0,0)');
     edge.addColorStop(1,'rgba(0,0,0,0.18)');
     ctx.globalAlpha=1;
     ctx.fillStyle=edge;ctx.fillRect(0,0,W,H);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Fond — noir profond avec persistance vert très sombre */
     ctx.fillStyle='rgba(0,3,1,0.22)';ctx.fillRect(0,0,W,H);

     /* Ambiance générale — halo vert centré */
     const amb=ctx.createRadialGradient(cx,H*0.52,20,cx,H*0.52,W*0.72);
     amb.addColorStop(0,`rgba(0,${20+Math.sin(t*0.3)*4|0},5,0.18)`);
     amb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=amb;ctx.fillRect(0,0,W,H);

     /* Structures */
     drawNostromo();

     /* Spores flottantes */
     for(const s of spores){
      s.x+=s.vx+Math.sin(t*0.4+s.phase)*0.10;
      s.y+=s.vy;
      if(s.y<-5){s.y=H+5;s.x=Math.random()*W;}
      const gp=0.55+Math.sin(t*1.6+s.phase)*0.45;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,${130+Math.random()*55|0},25,${s.op*gp})`;
      ctx.fill();
     }

     /* Radar */
     drawRadar();

     /* HUD terminal */
     drawHUD();

     /* Scanlines CRT */
     drawCRT();

     /* Vignette finale */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.10,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,4,1,0.12)');
     vg.addColorStop(1,'rgba(0,2,0,0.90)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
