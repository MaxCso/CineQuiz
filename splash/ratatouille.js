// CinéQuiz splash chunk — Ratatouille
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Ratatouille"]={
   name:'Ratatouille',
   color:'200,60,30',
   ref:'Ratatouille \u2014 Brad Bird, 2007',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Fond override : beurre chaud parisien ── */
    let _rs=document.getElementById('_rata_s');
    if(!_rs){_rs=document.createElement('style');_rs.id='_rata_s';document.head.appendChild(_rs);}
    _rs.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _rw=setInterval(()=>{if(stop.v){_rs.textContent='';clearInterval(_rw);}},200);

    /* ── Étoiles parisiennes ── */
    const stars=Array.from({length:55},()=>({
      x:Math.random()*W, y:Math.random()*H*0.42,
      r:Math.random()*1.2+0.2, ph:Math.random()*Math.PI*2,
      spd:Math.random()*0.025+0.008
    }));

    /* ── Lune ── */
    const MOON_X=W*0.78, MOON_Y=H*0.10, MOON_R=W*0.065;

    /* ── Éclaboussures de la casserole ── */
    const splatters=Array.from({length:14},(_,i)=>({
      life:Math.random(),
      spd:0.018+Math.random()*0.022,
      angle:-Math.PI*0.5+(Math.random()-0.5)*Math.PI*0.8,
      vel:H*(0.0030+Math.random()*0.0035),
      baseX:cx+(Math.random()-0.5)*W*0.28,
      r:W*(0.004+Math.random()*0.005),
      hue:Math.random()*25+10,
    }));

    /* ── Rémy — amplitude de respiration ── */
    let remyBreath=0;

    /* ── Particules d'arômes dorées ── */
    const aromas=Array.from({length:38},()=>({
      x:cx+(Math.random()-0.5)*W*0.55,
      y:H*(0.55+Math.random()*0.18),
      vx:(Math.random()-0.5)*0.38,
      vy:-(Math.random()*0.55+0.18),
      r:Math.random()*3.5+1.0,
      ph:Math.random()*Math.PI*2,
      hue:Math.random()*40+20,   /* doré → orangé */
      life:Math.random()
    }));

    /* ── Vapeur de casserole ── */
    const steams=Array.from({length:22},(_,i)=>({
      x:0,y:0,
      vx:(Math.random()-0.5)*0.55,
      vy:-(Math.random()*0.70+0.30),
      r:Math.random()*18+8,
      alpha:Math.random()*0.10+0.04,
      life:Math.random(),
      offX:(Math.random()-0.5)*W*0.14
    }));

    /* ── Flammes de la cuisinière ── */
    const flames=Array.from({length:6},(_,i)=>({idx:i, ph:Math.random()*Math.PI*2}));

    /* ── Silhouette Paris (toits) ── */
    /* ── Fenêtres pré-calculées (positions fixes, pas de scintillement) ── */
    const skylineBaseY=H*0.92;
    const windows=Array.from({length:18},(_,i)=>({
      x: W*(0.04+i*0.054),
      y: skylineBaseY-H*(0.03+((i*7+3)%9)*0.008),
      warm: i%3!==2,
    }));

    function drawParisSkyline(){
      const baseY=skylineBaseY;
      ctx.fillStyle='rgba(8,5,2,0.97)';
      ctx.beginPath();
      ctx.moveTo(0,H);
      /* Toits haussmanniens stylisés */
      const pts=[
        [0,baseY],[W*0.04,baseY-H*0.06],[W*0.06,baseY-H*0.06],
        [W*0.08,baseY],[W*0.10,baseY-H*0.10],[W*0.115,baseY-H*0.10],
        /* petite cheminée */
        [W*0.110,baseY-H*0.14],[W*0.120,baseY-H*0.14],[W*0.115,baseY-H*0.10],
        [W*0.13,baseY-H*0.10],[W*0.16,baseY],
        [W*0.17,baseY-H*0.07],[W*0.19,baseY-H*0.07],
        [W*0.20,baseY],[W*0.22,baseY-H*0.09],[W*0.24,baseY-H*0.09],
        /* Dôme Sacré-Cœur simplifié */
        [W*0.25,baseY-H*0.09],[W*0.27,baseY-H*0.16],[W*0.285,baseY-H*0.20],
        [W*0.30,baseY-H*0.16],[W*0.32,baseY-H*0.09],[W*0.34,baseY],
        [W*0.36,baseY-H*0.08],[W*0.38,baseY-H*0.08],
        [W*0.40,baseY],[W*0.42,baseY-H*0.05],[W*0.44,baseY-H*0.05],
        [W*0.46,baseY],[W*0.48,baseY-H*0.11],[W*0.50,baseY-H*0.11],
        /* Tour Eiffel très épurée au centre-droit */
        [W*0.52,baseY],[W*0.56,baseY-H*0.02],
        [W*0.60,baseY-H*0.02],[W*0.61,baseY],
        [W*0.62,baseY-H*0.09],[W*0.64,baseY-H*0.09],
        [W*0.66,baseY],[W*0.68,baseY-H*0.12],[W*0.70,baseY-H*0.12],
        [W*0.68,baseY-H*0.12],[W*0.69,baseY-H*0.17],[W*0.71,baseY-H*0.17],
        [W*0.72,baseY-H*0.12],
        [W*0.73,baseY],[W*0.76,baseY-H*0.07],[W*0.78,baseY-H*0.07],
        [W*0.80,baseY],[W*0.82,baseY-H*0.09],[W*0.84,baseY-H*0.09],
        [W*0.86,baseY],[W*0.88,baseY-H*0.06],[W*0.92,baseY-H*0.06],
        [W*0.94,baseY],[W,baseY],[W,H],[0,H]
      ];
      for(const [px,py] of pts) ctx.lineTo(px,py);
      ctx.closePath();ctx.fill();

      /* Lumières de fenêtres — positions fixes, seul le flicker est animé */
      ctx.save();
      for(let i=0;i<windows.length;i++){
        const w=windows[i];
        const flicker=0.4+Math.sin(t*3+i*1.7)*0.3;
        ctx.fillStyle=w.warm
          ?`rgba(255,200,80,${flicker*0.55})`
          :`rgba(180,210,255,${flicker*0.40})`;
        ctx.fillRect(w.x,w.y,3,2);
      }
      ctx.restore();
    }

    /* ── Casserole sur la cuisinière ── */
    function drawStove(){
      const py=H*0.64;
      const pw=W*0.52, ph=H*0.075;
      /* Plan de travail */
      const ctr=ctx.createLinearGradient(0,py,0,py+ph*1.5);
      ctr.addColorStop(0,'#3a2a14');ctr.addColorStop(1,'#1e1508');
      ctx.fillStyle=ctr;ctx.fillRect(0,py,W,ph*2);
      /* Corps de la cuisinière */
      const sr=ctx.createLinearGradient(cx-pw/2,py-H*0.04,cx+pw/2,py-H*0.04);
      sr.addColorStop(0,'#2a1e0e');sr.addColorStop(0.5,'#3c2c14');sr.addColorStop(1,'#2a1e0e');
      ctx.fillStyle=sr;ctx.beginPath();ctx.roundRect(cx-pw/2,py-H*0.04,pw,H*0.055,4);ctx.fill();
      /* Flammes bleues/orange */
      const flameY=py-H*0.04;
      for(const fl of flames){
        fl.ph+=0.12;
        const fh=W*0.026+Math.sin(fl.ph*7.1+fl.idx)*W*0.011;
        const fx=cx+(fl.idx-2.5)*W*0.062;
        const fa=Math.sin(fl.ph*5.3+fl.idx*1.2)*0.4;
        /* coeur bleu */
        const bg2=ctx.createRadialGradient(fx+fa*4,flameY-fh*0.4,1,fx,flameY,fh*1.1);
        bg2.addColorStop(0,`rgba(120,210,255,${0.80+Math.sin(fl.ph*6)*0.15})`);
        bg2.addColorStop(0.45,`rgba(60,140,255,${0.55})`);
        bg2.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=bg2;ctx.beginPath();ctx.arc(fx+fa*4,flameY-fh*0.45,fh*0.9,0,Math.PI*2);ctx.fill();
        /* couronne orange */
        const og=ctx.createRadialGradient(fx,flameY,1,fx,flameY-fh*0.15,fh*1.4);
        og.addColorStop(0,`rgba(255,160,30,${0.40+Math.sin(fl.ph*4+fl.idx)*0.15})`);
        og.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=og;ctx.beginPath();ctx.arc(fx,flameY-fh*0.2,fh*1.3,0,Math.PI*2);ctx.fill();
      }
      /* Casserole */
      const potY=py-H*0.13;
      const potW=W*0.36, potH=H*0.085;
      /* Corps */
      const potG=ctx.createLinearGradient(cx-potW/2,potY,cx+potW/2,potY+potH);
      potG.addColorStop(0,'#7a6545');potG.addColorStop(0.4,'#a08858');potG.addColorStop(1,'#4a3b22');
      ctx.fillStyle=potG;ctx.beginPath();ctx.roundRect(cx-potW/2,potY,potW,potH,6);ctx.fill();
      /* Rebord haut */
      const rimG=ctx.createLinearGradient(cx-potW/2-4,potY-4,cx+potW/2+4,potY);
      rimG.addColorStop(0,'#b09060');rimG.addColorStop(0.5,'#d0b070');rimG.addColorStop(1,'#8a6840');
      ctx.fillStyle=rimG;ctx.beginPath();ctx.roundRect(cx-potW/2-5,potY-6,potW+10,12,3);ctx.fill();
      /* Liquide bouillonnant */
      ctx.save();ctx.beginPath();ctx.roundRect(cx-potW/2,potY,potW,potH,6);ctx.clip();
      const liqG=ctx.createLinearGradient(0,potY,0,potY+potH);
      liqG.addColorStop(0,'rgba(180,80,30,0.92)');liqG.addColorStop(1,'rgba(120,45,15,0.96)');
      ctx.fillStyle=liqG;ctx.fillRect(cx-potW/2,potY+potH*0.30,potW,potH*0.70);
      /* Bulles */
      for(let b=0;b<8;b++){
        const bx=cx-potW/2+potW*(b/7.5);
        const by=potY+potH*0.48+Math.sin(t*4+b*0.9)*H*0.008;
        const br=W*(0.006+Math.sin(t*5+b)*0.003);
        ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,180,60,${0.4+Math.sin(t*6+b)*0.2})`;ctx.fill();
      }
      ctx.restore();
      /* Poignée */
      ctx.strokeStyle='#6a5535';ctx.lineWidth=8;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(cx+potW/2+5,potY+potH*0.4);ctx.lineTo(cx+potW/2+W*0.09,potY+potH*0.45);ctx.stroke();
      ctx.strokeStyle='#4a3820';ctx.lineWidth=4;
      ctx.beginPath();ctx.moveTo(cx+potW/2+5,potY+potH*0.4);ctx.lineTo(cx+potW/2+W*0.09,potY+potH*0.45);ctx.stroke();
    }

    /* ── Rémy — rat chef stylisé ── */
    function drawRemy(){
      const ry=H*0.565;
      const rx=cx+W*0.10;
      const s=W*0.090;
      ctx.save();ctx.translate(rx,ry);

      /* Ombre au sol */
      const sg=ctx.createRadialGradient(0,s*0.35,2,0,s*0.35,s*1.0);
      sg.addColorStop(0,'rgba(0,0,0,0.38)');sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.ellipse(0,s*0.5,s*1.1,s*0.22,0,0,Math.PI*2);ctx.fill();

      /* Corps */
      const bg2=ctx.createRadialGradient(-s*0.12,s*0.08,3,0,0,s*0.92);
      bg2.addColorStop(0,'#6e6258');bg2.addColorStop(0.6,'#4a4038');bg2.addColorStop(1,'#2e2820');
      ctx.fillStyle=bg2;ctx.beginPath();ctx.ellipse(0,0,s*0.70,s*0.90,0,0,Math.PI*2);ctx.fill();
      /* Ventre clair */
      ctx.fillStyle='rgba(195,178,158,0.72)';ctx.beginPath();ctx.ellipse(0,s*0.18,s*0.34,s*0.44,0,0,Math.PI*2);ctx.fill();

      /* Oreilles */
      for(const ex of [-s*0.44,s*0.44]){
        ctx.fillStyle='#524840';ctx.beginPath();ctx.ellipse(ex,-s*0.82,s*0.23,s*0.30,ex>0?0.30:-0.30,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(190,135,125,0.68)';ctx.beginPath();ctx.ellipse(ex,-s*0.82,s*0.13,s*0.17,ex>0?0.30:-0.30,0,Math.PI*2);ctx.fill();
      }

      /* Tête */
      const hg=ctx.createRadialGradient(-s*0.07,-s*0.94,3,0,-s*0.90,s*0.50);
      hg.addColorStop(0,'#726458');hg.addColorStop(1,'#3e3630');
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(0,-s*0.90,s*0.50,0,Math.PI*2);ctx.fill();

      /* Toque de chef — blanc immaculé */
      /* Base */
      ctx.fillStyle='rgba(245,242,238,0.96)';
      ctx.beginPath();ctx.ellipse(0,-s*1.28,s*0.40,s*0.11,0,0,Math.PI*2);ctx.fill();
      /* Corps cylindrique */
      const tg=ctx.createLinearGradient(-s*0.38,-s*1.72,s*0.38,-s*1.72);
      tg.addColorStop(0,'rgba(235,232,228,0.95)');tg.addColorStop(0.5,'rgba(252,250,247,0.98)');tg.addColorStop(1,'rgba(230,227,222,0.95)');
      ctx.fillStyle=tg;ctx.beginPath();ctx.roundRect(-s*0.38,-s*1.72,s*0.76,s*0.46,s*0.06);ctx.fill();
      /* Dôme bouffi */
      const dg=ctx.createRadialGradient(-s*0.08,-s*1.78,s*0.05,0,-s*1.72,s*0.35);
      dg.addColorStop(0,'rgba(255,253,250,0.98)');dg.addColorStop(0.7,'rgba(240,238,234,0.93)');dg.addColorStop(1,'rgba(220,218,212,0.80)');
      ctx.fillStyle=dg;ctx.beginPath();ctx.ellipse(0,-s*1.78,s*0.36,s*0.26,0,0,Math.PI*2);ctx.fill();

      /* Yeux */
      for(const ex of [-s*0.19,s*0.19]){
        ctx.fillStyle='rgba(6,5,4,0.97)';ctx.beginPath();ctx.arc(ex,-s*0.90,s*0.115,0,Math.PI*2);ctx.fill();
        /* Reflet */
        ctx.fillStyle='rgba(255,255,255,0.90)';ctx.beginPath();ctx.arc(ex-s*0.035,-s*0.944,s*0.046,0,Math.PI*2);ctx.fill();
        /* Iris couleur bleue-grise (rat Pixar) */
        ctx.fillStyle='rgba(90,110,140,0.80)';ctx.beginPath();ctx.arc(ex,-s*0.90,s*0.068,0,Math.PI*2);ctx.fill();
      }

      /* Museau / nez */
      ctx.fillStyle='rgba(190,105,95,0.92)';ctx.beginPath();ctx.ellipse(0,-s*0.60,s*0.135,s*0.092,0,0,Math.PI*2);ctx.fill();

      /* Bras levés (comme un chef !) */
      ctx.strokeStyle='#4a4038';ctx.lineWidth=s*0.16;ctx.lineCap='round';
      /* Bras gauche levé avec cuillère */
      ctx.beginPath();ctx.moveTo(-s*0.55,s*0.05);ctx.quadraticCurveTo(-s*0.80,-s*0.30,-s*0.70,-s*0.55);ctx.stroke();
      /* Bras droit levé */
      ctx.beginPath();ctx.moveTo(s*0.55,s*0.05);ctx.quadraticCurveTo(s*0.82,-s*0.25,s*0.75,-s*0.48);ctx.stroke();
      /* Cuillère en bois */
      ctx.strokeStyle='#7a5e38';ctx.lineWidth=s*0.07;
      ctx.beginPath();ctx.moveTo(-s*0.72,-s*0.52);ctx.lineTo(-s*0.78,-s*0.95);ctx.stroke();
      ctx.fillStyle='#8a6840';ctx.beginPath();ctx.ellipse(-s*0.78,-s*0.98,s*0.10,s*0.07,-0.3,0,Math.PI*2);ctx.fill();

      ctx.restore();
    }

    function frame(){
      if(stop.v)return;

      /* Ciel nuit parisien dégradé chaud */
      const sky=ctx.createLinearGradient(0,0,0,H);
      sky.addColorStop(0.00,'#090508');
      sky.addColorStop(0.22,'#160c04');
      sky.addColorStop(0.45,'#281408');
      sky.addColorStop(0.65,'#3a1e08');
      sky.addColorStop(0.80,'#2a1405');
      sky.addColorStop(1.00,'#120a02');
      ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

      /* Halo chaud central (lumière cuisine) */
      const kitchenGlow=ctx.createRadialGradient(cx,H*0.52,20,cx,H*0.52,W*0.75);
      kitchenGlow.addColorStop(0,`rgba(255,155,30,${0.22+Math.sin(t*0.8)*0.05})`);
      kitchenGlow.addColorStop(0.35,`rgba(220,100,20,${0.10+Math.sin(t*0.6)*0.03})`);
      kitchenGlow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=kitchenGlow;ctx.fillRect(0,0,W,H);

      /* Lueur bleutée des flammes en bas */
      const flameGlow=ctx.createRadialGradient(cx,H*0.68,5,cx,H*0.70,W*0.50);
      flameGlow.addColorStop(0,`rgba(60,140,255,${0.14+Math.sin(t*1.5)*0.04})`);
      flameGlow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=flameGlow;ctx.fillRect(0,0,W,H);

      /* Étoiles parisiennes */
      for(const s of stars){
        s.ph+=s.spd;
        const op=0.3+Math.sin(s.ph)*0.25;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,245,220,${op})`;ctx.fill();
      }

      /* ── Lune — halo + disque ── */
      const moonHalo=ctx.createRadialGradient(MOON_X,MOON_Y,MOON_R*0.6,MOON_X,MOON_Y,MOON_R*3.2);
      moonHalo.addColorStop(0,`rgba(255,245,200,${0.14+Math.sin(t*0.3)*0.03})`);
      moonHalo.addColorStop(0.4,'rgba(255,235,160,0.04)');
      moonHalo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=moonHalo;ctx.fillRect(0,0,W,H);
      const moonG=ctx.createRadialGradient(MOON_X-MOON_R*0.25,MOON_Y-MOON_R*0.25,0,MOON_X,MOON_Y,MOON_R);
      moonG.addColorStop(0,'rgba(255,252,230,0.97)');
      moonG.addColorStop(0.55,'rgba(248,242,210,0.93)');
      moonG.addColorStop(1,'rgba(230,220,180,0.85)');
      ctx.fillStyle=moonG;ctx.beginPath();ctx.arc(MOON_X,MOON_Y,MOON_R,0,Math.PI*2);ctx.fill();
      /* Ombre douce sur la lune */
      const moonShadow=ctx.createRadialGradient(MOON_X+MOON_R*0.4,MOON_Y+MOON_R*0.1,0,MOON_X+MOON_R*0.3,MOON_Y,MOON_R*0.9);
      moonShadow.addColorStop(0,'rgba(30,20,8,0.22)');
      moonShadow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=moonShadow;ctx.beginPath();ctx.arc(MOON_X,MOON_Y,MOON_R,0,Math.PI*2);ctx.fill();

      /* Cuisinière + casserole */
      drawStove();

      /* Skyline Paris — dessinée après le sol pour être visible */
      drawParisSkyline();

      /* Vapeur */
      const potTopY=H*0.53;
      for(const sm of steams){
        sm.life+=0.007;sm.x+=sm.vx;sm.y+=sm.vy;sm.r+=0.28;
        if(sm.life>=1||sm.y<H*0.12){
          sm.x=cx+sm.offX+(Math.random()-0.5)*W*0.06;
          sm.y=potTopY;sm.life=0;sm.r=Math.random()*10+5;
        }
        const smop=sm.alpha*(1-sm.life)*(0.7+Math.sin(t*2+sm.life*4)*0.3);
        const sg2=ctx.createRadialGradient(sm.x,sm.y,2,sm.x,sm.y,sm.r);
        sg2.addColorStop(0,`rgba(230,218,200,${smop})`);
        sg2.addColorStop(0.5,`rgba(200,190,175,${smop*0.5})`);
        sg2.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=sg2;ctx.beginPath();ctx.arc(sm.x,sm.y,sm.r,0,Math.PI*2);ctx.fill();
      }

      /* Particules d'arômes dorées */
      for(const a of aromas){
        a.x+=a.vx;a.y+=a.vy;a.ph+=0.06;a.life+=0.008;
        if(a.y<H*0.08||a.life>=1){
          a.x=cx+(Math.random()-0.5)*W*0.42;
          a.y=H*(0.52+Math.random()*0.12);
          a.life=0;a.vy=-(Math.random()*0.55+0.18);
        }
        const op=(0.12+Math.abs(Math.sin(a.ph))*0.45)*(1-a.life*0.7);
        ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${a.hue},90%,65%,${op})`;ctx.fill();
      }

      /* ── Éclaboussures de la casserole bouillonnante ── */
      const splatTopY=H*0.52;
      for(const sp of splatters){
        sp.life+=sp.spd;
        if(sp.life>=1){ sp.life=0; sp.angle=-Math.PI*0.5+(Math.random()-0.5)*Math.PI*0.8; sp.vel=H*(0.0030+Math.random()*0.0035); sp.baseX=cx+(Math.random()-0.5)*W*0.28; }
        const progress=sp.life;
        const sx=sp.baseX+Math.cos(sp.angle)*sp.vel*progress*60;
        const sy=splatTopY+Math.sin(sp.angle)*sp.vel*progress*60+0.5*0.0008*progress*progress*3600;
        if(sy>splatTopY) continue; /* reste au-dessus de la casserole */
        const sop=(1-progress)*(0.55+Math.sin(progress*Math.PI)*0.35);
        ctx.beginPath();ctx.arc(sx,sy,sp.r*(1-progress*0.5),0,Math.PI*2);
        ctx.fillStyle=`hsla(${sp.hue},85%,55%,${sop})`;ctx.fill();
      }

      /* Rémy le rat chef — avec légère respiration */
      remyBreath=Math.sin(t*1.1)*0.012;
      ctx.save();
      const _remyCX=cx+W*0.10, _remyCY=H*0.565;
      ctx.translate(_remyCX,_remyCY);
      ctx.scale(1+remyBreath, 1-remyBreath*0.5);
      ctx.translate(-_remyCX,-_remyCY);
      drawRemy();
      ctx.restore();

      /* Vignette douce */
      const vg=ctx.createRadialGradient(cx,H*0.48,H*0.08,cx,H*0.48,H*0.95);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.45,'rgba(4,2,0,0.10)');
      vg.addColorStop(1,'rgba(4,2,0,0.96)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
