// CinéQuiz splash chunk — Un jour sans fin
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Un jour sans fin"]={
   name:'Un jour sans fin',
   color:'120,160,200',
   ref:'Groundhog Day \u2014 Harold Ramis, 1993',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _s=document.getElementById('_gd_s');
    if(!_s){_s=document.createElement('style');_s.id='_gd_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Marmotte SVG ── */
    const marmoImg=new Image();let marmoReady=false;
    marmoImg.onload=()=>{marmoReady=true;};
    marmoImg.src='images/Marmotte.svg';
    const marmoOC=document.createElement('canvas');let marmoOCBuilt=false;

    /* ════════════════════════════════════════════
       BOUCLE TEMPORELLE — cycle de 12 secondes
       Phase 0→1 : nuit → aube → jour → rembobinage
    ════════════════════════════════════════════ */
    const CYCLE = 12.0; /* durée d'un cycle complet en secondes */

    /* ── Neige — plus dense et variée ── */
    const snow=Array.from({length:140},(_,i)=>({
      x:Math.random()*W,
      y:Math.random()*H,
      vy:0.12+Math.random()*0.32,
      vx:(Math.random()-0.5)*0.10,
      r: i<40 ? (1.4+Math.random()*1.8) : (0.3+Math.random()*0.9),
      op: i<40 ? (0.55+Math.random()*0.35) : (0.20+Math.random()*0.30),
      wb:Math.random()*Math.PI*2,
      wSpd:0.005+Math.random()*0.012,
    }));

    /* ── Étoiles ── */
    const stars=Array.from({length:55},()=>({
      x:Math.random()*W,
      y:Math.random()*H*0.58,
      r:Math.random()*0.9+0.2,
      op:0.10+Math.random()*0.40,
      ph:Math.random()*Math.PI*2,
    }));

    /* ── Silhouette Punxsutawney améliorée ── */
    const bldgs=[
      {x:0,      h:H*0.10, w:W*0.055},
      {x:W*0.05, h:H*0.13, w:W*0.042},
      {x:W*0.09, h:H*0.17, w:W*0.052},
      {x:W*0.14, h:H*0.12, w:W*0.036},
      {x:W*0.18, h:H*0.15, w:W*0.048},
      {x:W*0.23, h:H*0.09, w:W*0.032},
      {x:W*0.26, h:H*0.21, w:W*0.040},/* clocher */
      {x:W*0.31, h:H*0.12, w:W*0.040},
      {x:W*0.36, h:H*0.14, w:W*0.045},
      {x:W*0.41, h:H*0.10, w:W*0.038},
      {x:W*0.45, h:H*0.16, w:W*0.050},
      {x:W*0.51, h:H*0.09, w:W*0.034},
      {x:W*0.55, h:H*0.14, w:W*0.044},
      {x:W*0.60, h:H*0.18, w:W*0.040},
      {x:W*0.65, h:H*0.11, w:W*0.038},
      {x:W*0.69, h:H*0.15, w:W*0.048},
      {x:W*0.74, h:H*0.09, w:W*0.034},
      {x:W*0.78, h:H*0.17, w:W*0.052},
      {x:W*0.84, h:H*0.12, w:W*0.040},
      {x:W*0.89, h:H*0.10, w:W*0.115},
    ];
    const GROUND_Y=H*0.72;
    /* Fenêtres pré-générées sur les buildings */
    const bldgWins=bldgs.map(b=>Array.from({length:12},()=>({
      xf:0.15+Math.random()*0.70,
      yf:0.15+Math.random()*0.65,
      on:Math.random()<0.45,
      warm:Math.random()<0.60,
      ph:Math.random()*Math.PI*2,
    })));

    /* ── Réveil radio — position ── */
    const alarmW=W*0.18, alarmH=H*0.060;
    const alarmX=cx-alarmW/2, alarmY=H*0.375;

    /* ── Particules de rembobinage — surgissent quand le cycle reset ── */
    const rewindParts=Array.from({length:28},()=>({x:0,y:0,vx:0,vy:0,life:0,active:false}));
    let lastCycleInt=-1;

    function triggerRewind(){
      for(const p of rewindParts){
        p.x=cx+(Math.random()-0.5)*W*0.80;
        p.y=GROUND_Y+(Math.random()-0.5)*H*0.18;
        const a=Math.random()*Math.PI*2;
        const spd=1.5+Math.random()*3.0;
        p.vx=Math.cos(a)*spd; p.vy=Math.sin(a)*spd-2;
        p.life=1; p.active=true;
      }
    }

    function drawBg(phase){
      /* phase 0→0.3 : nuit profonde
         phase 0.3→0.7 : aube rose-bleue
         phase 0.7→0.9 : matin froid clair
         phase 0.9→1.0 : fondu rembobinage vers nuit */

      let skyTop,skyMid,skyBot;
      if(phase<0.30){
        const p=phase/0.30;
        skyTop=`rgb(${2+p*6|0},${3+p*8|0},${14+p*20|0})`;
        skyMid=`rgb(${4+p*10|0},${5+p*12|0},${20+p*28|0})`;
        skyBot=`rgb(${8+p*30|0},${10+p*20|0},${30+p*15|0})`;
      } else if(phase<0.70){
        const p=(phase-0.30)/0.40;
        skyTop=`rgb(${8+p*22|0},${11+p*28|0},${34+p*30|0})`;
        skyMid=`rgb(${14+p*55|0},${17+p*35|0},${48+p*10|0})`;
        skyBot=`rgb(${38+p*90|0},${30+p*60|0},${45+p*20|0})`;
      } else if(phase<0.90){
        const p=(phase-0.70)/0.20;
        skyTop=`rgb(${30+p*20|0},${39+p*25|0},${64+p*20|0})`;
        skyMid=`rgb(${69+p*30|0},${52+p*30|0},${58+p*15|0})`;
        skyBot=`rgb(${128+p*30|0},${90+p*30|0},${65+p*10|0})`;
      } else {
        const p=(phase-0.90)/0.10;
        skyTop=`rgb(${50-p*44|0},${64-p*58|0},${84-p*68|0})`;
        skyMid=`rgb(${99-p*85|0},${82-p*70|0},${73-p*53|0})`;
        skyBot=`rgb(${158-p*120|0},${120-p*82|0},${75-p*45|0})`;
      }

      const sky=ctx.createLinearGradient(0,0,0,GROUND_Y);
      sky.addColorStop(0,skyTop);
      sky.addColorStop(0.45,skyMid);
      sky.addColorStop(1,skyBot);
      ctx.fillStyle=sky;ctx.fillRect(0,0,W,GROUND_Y);

      /* Sol enneigé */
      const groundG=ctx.createLinearGradient(0,GROUND_Y,0,H);
      groundG.addColorStop(0,phase>0.5?'rgb(55,58,70)':'rgb(22,20,36)');
      groundG.addColorStop(1,phase>0.5?'rgb(30,32,42)':'rgb(12,10,22)');
      ctx.fillStyle=groundG;ctx.fillRect(0,GROUND_Y,W,H-GROUND_Y);

      /* Reflet d'aube sur neige */
      if(phase>0.25&&phase<0.95){
        const glowP=Math.sin(Math.PI*(phase-0.25)/0.70);
        const snowRefl=ctx.createLinearGradient(0,GROUND_Y,0,GROUND_Y+H*0.05);
        snowRefl.addColorStop(0,`rgba(160,100,120,${0.18*glowP})`);
        snowRefl.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=snowRefl;ctx.fillRect(0,GROUND_Y,W,H*0.05);
      }
    }

    function drawStars(phase){
      /* Étoiles visibles seulement de nuit/début d'aube */
      const starAlpha=phase<0.30 ? 1 : phase<0.55 ? 1-(phase-0.30)/0.25 : 0;
      if(starAlpha<=0)return;
      for(const s of stars){
        s.ph+=0.008;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(200,210,240,${s.op*(0.4+0.6*Math.abs(Math.sin(s.ph)))*starAlpha})`;
        ctx.fill();
      }
    }

    function drawCity(phase){
      const cityAlpha=0.88+phase*0.10;
      const cityG=ctx.createLinearGradient(0,GROUND_Y*0.52,0,GROUND_Y);
      cityG.addColorStop(0,`rgba(8,6,20,${cityAlpha})`);
      cityG.addColorStop(1,`rgba(6,5,16,${cityAlpha})`);

      for(let bi=0;bi<bldgs.length;bi++){
        const b=bldgs[bi];
        const by=GROUND_Y-b.h;

        /* Façade principale — dégradé vertical pour donner du relief */
        const facG=ctx.createLinearGradient(b.x,by,b.x+b.w,by);
        facG.addColorStop(0,`rgba(12,10,28,${cityAlpha})`);
        facG.addColorStop(0.4,`rgba(18,15,35,${cityAlpha})`);
        facG.addColorStop(1,`rgba(8,6,20,${cityAlpha})`);
        ctx.fillStyle=facG;
        ctx.fillRect(b.x,by,b.w,b.h);

        /* Liseré latéral gauche — effet de profondeur */
        ctx.fillStyle=`rgba(30,25,55,${cityAlpha*0.6})`;
        ctx.fillRect(b.x,by,Math.max(1,b.w*0.06),b.h);

        /* Liseré latéral droit — ombre portée */
        ctx.fillStyle=`rgba(2,2,8,${cityAlpha*0.7})`;
        ctx.fillRect(b.x+b.w-Math.max(1,b.w*0.06),by,Math.max(1,b.w*0.06),b.h);

        /* Toit plat avec bandeau technique */
        const roofH=Math.max(2,b.h*0.06);
        ctx.fillStyle=`rgba(22,18,42,${cityAlpha})`;
        ctx.fillRect(b.x-1,by,b.w+2,roofH);

        /* Parapet / rebord de toit */
        ctx.fillStyle=`rgba(35,30,60,${cityAlpha*0.9})`;
        ctx.fillRect(b.x-1,by-Math.max(1,H*0.004),b.w+2,Math.max(1,H*0.004));

        /* Neige sur les toits */
        const snowDepth=H*0.012;
        const snowAlpha=phase>0.50?0.65:0.38;
        ctx.fillStyle=`rgba(200,205,220,${snowAlpha})`;
        ctx.fillRect(b.x,by,b.w,snowDepth);
        /* Petits tas aux coins */
        ctx.fillRect(b.x,by,b.w*0.15,snowDepth*1.4);
        ctx.fillRect(b.x+b.w-b.w*0.15,by,b.w*0.15,snowDepth*1.4);

        /* Fenêtres allumées */
        const wins=bldgWins[bi];
        const fw=Math.max(1.8,b.w*0.18),fh=Math.max(2,b.h*0.10);
        for(const w of wins){
          if(!w.on)continue;
          const wx=b.x+w.xf*(b.w-fw);
          const wy=by+w.yf*(b.h-fh*2)+fh+roofH;
          if(wy>GROUND_Y-fh)continue;
          const flicker=0.6+0.4*Math.abs(Math.sin(t*0.8+w.ph));
          const col=w.warm?`rgba(220,170,60,${0.55*flicker})`:`rgba(150,195,240,${0.40*flicker})`;
          ctx.fillStyle=col;ctx.fillRect(wx,wy,fw,fh);
          /* Reflet de la fenêtre sur la façade */
          if(flicker>0.7){
            ctx.fillStyle=w.warm?`rgba(220,170,60,${0.06*flicker})`:`rgba(150,195,240,${0.05*flicker})`;
            ctx.fillRect(wx-fw*0.5,wy,fw*2,fh*3);
          }
        }
      }

      /* Clocher — pointe */
      ctx.fillStyle=`rgba(8,6,20,${cityAlpha})`;
      ctx.beginPath();
      ctx.moveTo(W*0.28,GROUND_Y-bldgs[6].h);
      ctx.lineTo(W*0.265,GROUND_Y-bldgs[6].h-H*0.065);
      ctx.lineTo(W*0.295,GROUND_Y-bldgs[6].h-H*0.065);
      ctx.closePath();ctx.fill();
    }

    function drawReveil(phase){
      /* Corps du réveil */
      ctx.fillStyle='rgba(22,16,10,0.92)';
      ctx.beginPath();ctx.roundRect(alarmX,alarmY,alarmW,alarmH,W*0.007);ctx.fill();
      ctx.strokeStyle='rgba(80,65,40,0.55)';ctx.lineWidth=0.8;
      ctx.beginPath();ctx.roundRect(alarmX,alarmY,alarmW,alarmH,W*0.007);ctx.stroke();

      /* Écran LCD */
      ctx.fillStyle='rgba(15,32,8,0.92)';
      ctx.fillRect(alarmX+alarmW*0.10,alarmY+alarmH*0.16,alarmW*0.58,alarmH*0.55);

      /* 6:00 — clignote en rythme et repart à zéro avec le cycle */
      const blinkOn=(Math.floor(t*1.8)%2===0);
      ctx.fillStyle=blinkOn?'rgba(70,210,45,0.95)':'rgba(15,55,10,0.55)';
      ctx.font=`bold ${W*0.028}px monospace`;
      ctx.textAlign='left';ctx.textBaseline='middle';
      ctx.fillText('6:00',alarmX+alarmW*0.12,alarmY+alarmH*0.49);

      /* Boutons dessus */
      for(let bi=0;bi<3;bi++){
        ctx.fillStyle='rgba(50,40,22,0.85)';
        ctx.beginPath();ctx.arc(alarmX+alarmW*(0.75+bi*0.08),alarmY+alarmH*0.38,alarmW*0.038,0,Math.PI*2);ctx.fill();
      }

      /* Halo LCD vert */
      if(blinkOn){
        const ag=ctx.createRadialGradient(alarmX+alarmW*0.35,alarmY+alarmH*0.49,0,alarmX+alarmW*0.35,alarmY+alarmH*0.49,alarmW*0.55);
        ag.addColorStop(0,'rgba(60,200,40,0.07)');ag.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=ag;ctx.fillRect(alarmX-alarmW*0.1,alarmY-alarmH*0.4,alarmW*1.2,alarmH*1.8);
      }

      /* Onde radio — petits arcs animés sortant du réveil */
      const waveAmt=phase>0.15&&phase<0.90 ? Math.sin(Math.PI*(phase-0.15)/0.75) : 0;
      if(waveAmt>0.05){
        for(let wi=1;wi<=3;wi++){
          const wr=alarmW*(0.22+wi*0.14)*(0.7+Math.sin(t*2.5-wi*0.8)*0.3);
          const wa=0.20*waveAmt*(1-wi*0.22);
          ctx.strokeStyle=`rgba(70,210,45,${wa})`;
          ctx.lineWidth=0.9;
          ctx.beginPath();
          ctx.arc(alarmX+alarmW*0.35,alarmY+alarmH*0.49,wr,-Math.PI*0.7,-Math.PI*0.1);
          ctx.stroke();
        }
      }
    }

    function drawMarmotte(phase){
      if(!marmoReady)return;
      const mW=W*0.37,mH=mW*(1220/1280);

      /* Build off-screen once */
      if(!marmoOCBuilt||marmoOC.width!==Math.ceil(mW)){
        marmoOC.width=Math.ceil(mW);marmoOC.height=Math.ceil(mH);
        const ot=marmoOC.getContext('2d');
        ot.clearRect(0,0,marmoOC.width,marmoOC.height);
        ot.drawImage(marmoImg,0,0,mW,mH);
        ot.globalCompositeOperation='source-in';
        ot.fillStyle='rgba(88,58,28,0.97)';
        ot.fillRect(0,0,mW,mH);
        marmoOCBuilt=true;
      }

      const mX=cx-mW/2;
      const mY=GROUND_Y-mH*0.48+H*0.05;

      /* Ombre portée au sol */
      const shadowPhase=phase>0.30&&phase<0.90 ? Math.sin(Math.PI*(phase-0.30)/0.60) : 0;
      if(shadowPhase>0.02){
        const shadowLen=W*(0.08+shadowPhase*0.22);
        const shadowG=ctx.createRadialGradient(
          cx+shadowLen*0.3,GROUND_Y+4, 2,
          cx+shadowLen*0.3,GROUND_Y+4, shadowLen
        );
        shadowG.addColorStop(0,`rgba(0,0,0,${0.35*shadowPhase})`);
        shadowG.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=shadowG;
        ctx.beginPath();
        ctx.ellipse(cx+shadowLen*0.3,GROUND_Y+4,shadowLen,shadowLen*0.18,0,0,Math.PI*2);
        ctx.fill();
      }

      /* Halo d'aube derrière la marmotte */
      const rimOp=0.15+shadowPhase*0.18;
      const rimG=ctx.createRadialGradient(cx,mY+mH*0.35,0,cx,mY+mH*0.35,mW*0.68);
      rimG.addColorStop(0,`rgba(${100+shadowPhase*60|0},${70+shadowPhase*40|0},${160-shadowPhase*30|0},${rimOp})`);
      rimG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rimG;ctx.fillRect(mX-mW*0.3,mY,mW*1.6,mH);

      ctx.save();ctx.globalAlpha=0.97;
      ctx.drawImage(marmoOC,mX,mY);
      ctx.restore();
    }

    function drawSnow(){
      for(const s of snow){
        s.y+=s.vy;s.x+=s.vx;s.wb+=s.wSpd;
        s.x+=Math.sin(s.wb)*0.16;
        if(s.y>H+4){s.y=-4;s.x=Math.random()*W;}
        if(s.x<0)s.x=W;if(s.x>W)s.x=0;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(215,218,238,${s.op})`;ctx.fill();
      }
    }

    function drawRewindEffect(){
      let anyAlive=false;
      for(const p of rewindParts){
        if(!p.active||p.life<=0)continue;
        anyAlive=true;
        p.x+=p.vx;p.y+=p.vy;p.vy+=0.06;p.vx*=0.96;p.life-=0.035;
        const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,W*0.018);
        pg.addColorStop(0,`rgba(140,180,255,${p.life*0.80})`);
        pg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=pg;ctx.beginPath();ctx.arc(p.x,p.y,W*0.018,0,Math.PI*2);ctx.fill();
      }
      return anyAlive;
    }

    function frame(){
      if(stop.v)return;

      /* Phase dans le cycle 0→1 */
      const cycleT=(t%CYCLE)/CYCLE;
      const cycleInt=Math.floor(t/CYCLE);

      /* Déclenchement du rembobinage à chaque nouveau cycle */
      if(cycleInt!==lastCycleInt){lastCycleInt=cycleInt;triggerRewind();}

      /* Persistance douce */
      ctx.fillStyle='rgba(4,5,16,0.14)';ctx.fillRect(0,0,W,H);

      drawBg(cycleT);
      drawStars(cycleT);
      drawCity(cycleT);
      drawSnow();
      drawReveil(cycleT);
      drawMarmotte(cycleT);
      drawRewindEffect();

      /* Vignette */
      const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.86);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.48,'rgba(0,0,0,0.08)');
      vg.addColorStop(0.75,'rgba(0,0,0,0.42)');
      vg.addColorStop(1,'rgba(0,0,0,0.92)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

      /* Grain pellicule */
      for(let i=0;i<18;i++){
        const gv=5+Math.random()*12|0;
        ctx.fillStyle=`rgba(${gv+3},${gv+5},${gv+12},${Math.random()*0.014})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }

      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
