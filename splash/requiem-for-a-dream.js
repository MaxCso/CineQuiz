// CinéQuiz splash chunk — Requiem for a Dream
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Requiem for a Dream"]={
   name:'Requiem for a Dream',
   color:'120,20,120',
   ref:'Requiem for a Dream \u2014 Darren Aronofsky, 2000',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.92';
    let t=0;
    const cx=W/2, cy=H/2;

    /* ── Override fond : noir profond ── */
    let _s=document.getElementById('_rfd_s');
    if(!_s){_s=document.createElement('style');_s.id='_rfd_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:23%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';['_mib_fig','_mib_vig'].forEach(id=>{const el=document.getElementById(id);if(el&&el.parentNode)el.parentNode.removeChild(el);});clearInterval(_w);}},200);

    /* ── Télévision CRT — dimensions et position ── */
    const tvW=W*0.62, tvH=tvW*0.76;
    const tvX=cx-tvW/2, tvY=H*0.60-tvH*0.5;
    const scrW=tvW*0.80, scrH=tvH*0.74;
    const scrX=tvX+(tvW-scrW)/2, scrY=tvY+(tvH-scrH)/2-tvH*0.02;

    /* ── Contenu TV : alternance de "scènes" ── */
    /* Chaque scène dure ~2s, cut brutal façon hip-hop montage */
    const SCENE_DUR=2.8; /* secondes */
    let sceneIdx=0;
    let sceneT=0;

    /* ── Shake camera — snorricam ── */
    let shakeX=0, shakeY=0, shakeDur=0;
    function triggerShake(intensity){shakeX=(Math.random()-0.5)*intensity;shakeY=(Math.random()-0.5)*intensity;shakeDur=6;}

    /* ── Lignes de scan TV ── */
    function drawScanlines(alpha){
     const lineH=3;
     for(let y=scrY;y<scrY+scrH;y+=lineH*2){
      ctx.fillStyle=`rgba(0,0,0,${alpha})`;
      ctx.fillRect(scrX,y,scrW,lineH);
     }
    }

    /* ── Scène 0 : Sara devant la télé — silhouette froide ── */
    function drawSaraScene(st){
     /* Fond bleu glacé TV */
     const bg=ctx.createLinearGradient(scrX,scrY,scrX,scrY+scrH);
     bg.addColorStop(0,'rgba(20,30,50,1)');
     bg.addColorStop(1,'rgba(8,12,28,1)');
     ctx.fillStyle=bg; ctx.fillRect(scrX,scrY,scrW,scrH);
     /* Lueur du show TV — blanc bleuté pulsant */
     const glow=ctx.createRadialGradient(scrX+scrW*0.5,scrY+scrH*0.35,scrW*0.05,scrX+scrW*0.5,scrY+scrH*0.35,scrW*0.60);
     const pulse=0.55+Math.sin(st*4.5)*0.30;
     glow.addColorStop(0,`rgba(200,220,255,${pulse*0.22})`);
     glow.addColorStop(0.5,`rgba(120,160,220,${pulse*0.08})`);
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow; ctx.fillRect(scrX,scrY,scrW,scrH);
     /* Silhouette Sara assise — tête+épaules, dos à nous */
     const sX=scrX+scrW*0.50, sY=scrY+scrH*0.82;
     ctx.fillStyle='rgba(5,8,18,0.98)';
     /* Corps */
     ctx.beginPath(); ctx.ellipse(sX,sY,scrW*0.14,scrH*0.16,0,0,Math.PI*2); ctx.fill();
     /* Tête */
     ctx.beginPath(); ctx.arc(sX,sY-scrH*0.20,scrW*0.085,0,Math.PI*2); ctx.fill();
     /* Cheveux permanentés (halo) */
     ctx.fillStyle='rgba(12,16,30,0.90)';
     ctx.beginPath(); ctx.arc(sX,sY-scrH*0.21,scrW*0.105,0,Math.PI*2); ctx.fill();
     ctx.fillStyle='rgba(5,8,18,0.98)';
     ctx.beginPath(); ctx.arc(sX,sY-scrH*0.20,scrW*0.080,0,Math.PI*2); ctx.fill();
    }

    /* ── Scène 1 : fond rouge — moment de crise ── */
    function drawRedScene(st){
     const pulse=0.5+Math.sin(st*6)*0.5;
     const bg=ctx.createRadialGradient(scrX+scrW*0.5,scrY+scrH*0.5,scrW*0.05,scrX+scrW*0.5,scrY+scrH*0.5,scrW*0.72);
     bg.addColorStop(0,`rgba(${200+pulse*30|0},${8+pulse*12|0},${8+pulse*8|0},1)`);
     bg.addColorStop(0.55,`rgba(140,5,5,1)`);
     bg.addColorStop(1,'rgba(60,0,0,1)');
     ctx.fillStyle=bg; ctx.fillRect(scrX,scrY,scrW,scrH);
     /* Veines / craquelures */
     ctx.strokeStyle=`rgba(255,60,60,${0.12+pulse*0.10})`; ctx.lineWidth=0.8;
     for(let i=0;i<5;i++){
      const vx=scrX+scrW*(0.1+i*0.2);
      ctx.beginPath(); ctx.moveTo(vx,scrY);
      ctx.bezierCurveTo(vx+(Math.random()-0.5)*20,scrY+scrH*0.3,vx+(Math.random()-0.5)*20,scrY+scrH*0.6,vx+(Math.random()-0.5)*15,scrY+scrH);
      ctx.stroke();
     }
    }

    /* ── Scène 2 : fond blanc stroboscopique ── */
    function drawStrobeScene(st){
     const strobe=Math.pow(Math.max(0,Math.sin(st*22)),8);
     const r=8+strobe*240|0, g=8+strobe*240|0, b=8+strobe*255|0;
     ctx.fillStyle=`rgb(${r},${g},${b})`; ctx.fillRect(scrX,scrY,scrW,scrH);
    }

    /* ── Scène 3 : nuit, appartement — lampe de chevet ── */
    function drawNightScene(st){
     ctx.fillStyle='rgba(4,4,10,1)'; ctx.fillRect(scrX,scrY,scrW,scrH);
     /* Lampe de chevet — ambre chaud */
     const lampX=scrX+scrW*0.72, lampY=scrY+scrH*0.42;
     const lg=ctx.createRadialGradient(lampX,lampY,2,lampX,lampY,scrW*0.28);
     const warmPulse=0.65+Math.sin(st*1.8)*0.12;
     lg.addColorStop(0,`rgba(255,200,80,${warmPulse*0.90})`);
     lg.addColorStop(0.3,`rgba(200,130,30,${warmPulse*0.30})`);
     lg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lg; ctx.fillRect(scrX,scrY,scrW,scrH);
     /* Abat-jour */
     ctx.fillStyle='rgba(180,120,40,0.88)';
     ctx.beginPath();
     ctx.moveTo(lampX-scrW*0.06,lampY);
     ctx.lineTo(lampX-scrW*0.10,lampY+scrH*0.12);
     ctx.lineTo(lampX+scrW*0.10,lampY+scrH*0.12);
     ctx.lineTo(lampX+scrW*0.06,lampY);
     ctx.closePath(); ctx.fill();
     /* Pied de lampe */
     ctx.fillStyle='rgba(100,70,20,0.85)';
     ctx.fillRect(lampX-scrW*0.010,lampY+scrH*0.12,scrW*0.020,scrH*0.22);
    }

    /* ── Glitch horizontal ── */
    let glitchTimer=0;
    let glitchActive=false, glitchY=0, glitchH2=0;
    function maybeGlitch(){
     glitchTimer--;
     if(glitchTimer<=0){
      glitchTimer=Math.floor(Math.random()*45)+20;
      glitchActive=Math.random()<0.55;
      glitchY=scrY+Math.random()*scrH;
      glitchH2=3+Math.random()*10|0;
     }
    }

    function drawTV(){
     /* ── Caisse CRT — corps gris beige ── */
     const bodyCol='rgba(48,44,40,1)';
     /* Corps principal avec coins arrondis */
     ctx.fillStyle=bodyCol;
     ctx.beginPath(); ctx.roundRect(tvX,tvY,tvW,tvH,tvW*0.06); ctx.fill();
     /* Reflet de brillance sur le dessus */
     const shineG=ctx.createLinearGradient(tvX,tvY,tvX,tvY+tvH*0.35);
     shineG.addColorStop(0,'rgba(255,255,255,0.06)'); shineG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shineG; ctx.beginPath(); ctx.roundRect(tvX,tvY,tvW,tvH*0.35,tvW*0.06); ctx.fill();

     /* ── Écran ── */
     /* Fond écran noir par défaut */
     ctx.fillStyle='rgba(4,5,8,1)';
     ctx.beginPath(); ctx.roundRect(scrX,scrY,scrW,scrH,scrW*0.03); ctx.fill();

     /* Contenu de la scène courante */
     ctx.save();
     ctx.beginPath(); ctx.roundRect(scrX,scrY,scrW,scrH,scrW*0.03); ctx.clip();
     if(sceneIdx===0) drawSaraScene(sceneT);
     else if(sceneIdx===1) drawRedScene(sceneT);
     else if(sceneIdx===2) drawStrobeScene(sceneT);
     else drawNightScene(sceneT);

     /* Lignes de scan */
     drawScanlines(0.18);

     /* Glitch horizontal */
     maybeGlitch();
     if(glitchActive){
      const slice=ctx.getImageData(scrX|0,glitchY|0,scrW|0,glitchH2);
      ctx.putImageData(slice,scrX+(Math.random()-0.5)*12|0,glitchY|0);
     }

     /* Légère lueur phosphore CRT */
     const screenSheen=ctx.createRadialGradient(scrX+scrW*0.45,scrY+scrH*0.38,0,scrX+scrW*0.45,scrY+scrH*0.38,scrW*0.65);
     screenSheen.addColorStop(0,'rgba(180,200,255,0.04)'); screenSheen.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=screenSheen; ctx.fillRect(scrX,scrY,scrW,scrH);
     ctx.restore();

     /* ── Reflet courbé sur la vitre CRT ── */
     const refG=ctx.createLinearGradient(scrX,scrY,scrX+scrW*0.35,scrY+scrH*0.4);
     refG.addColorStop(0,'rgba(255,255,255,0.06)'); refG.addColorStop(0.5,'rgba(255,255,255,0.02)'); refG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=refG;
     ctx.beginPath(); ctx.roundRect(scrX,scrY,scrW,scrH,scrW*0.03); ctx.fill();

     /* ── Bouton ON/OFF ── */
     ctx.fillStyle='rgba(28,26,24,1)';
     ctx.beginPath(); ctx.arc(tvX+tvW*0.88,tvY+tvH*0.78,tvW*0.025,0,Math.PI*2); ctx.fill();
     ctx.fillStyle='rgba(8,8,8,1)';
     ctx.beginPath(); ctx.arc(tvX+tvW*0.88,tvY+tvH*0.78,tvW*0.016,0,Math.PI*2); ctx.fill();

     /* ── Haut-parleurs latéraux — grille de points ── */
     ctx.fillStyle='rgba(30,28,26,0.90)';
     for(let row=0;row<4;row++) for(let col=0;col<2;col++){
      ctx.beginPath(); ctx.arc(tvX+tvW*0.06+col*tvW*0.04,tvY+tvH*0.42+row*tvH*0.08,tvW*0.010,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(tvX+tvW*0.90+col*tvW*0.040,tvY+tvH*0.42+row*tvH*0.08,tvW*0.010,0,Math.PI*2); ctx.fill();
     }

     /* ── Pied / socle ── */
     ctx.fillStyle='rgba(38,35,32,1)';
     ctx.beginPath(); ctx.roundRect(cx-tvW*0.22,tvY+tvH-tvH*0.02,tvW*0.44,tvH*0.05,4); ctx.fill();
     ctx.beginPath(); ctx.roundRect(cx-tvW*0.32,tvY+tvH+tvH*0.030,tvW*0.64,tvH*0.040,6); ctx.fill();
    }

    /* ── Lueur TV sur les murs / sol ── */
    function drawTVGlow(){
     let glowCol;
     if(sceneIdx===0) glowCol=[100,130,200];
     else if(sceneIdx===1) glowCol=[220,20,20];
     else if(sceneIdx===2) glowCol=[200,200,220];
     else glowCol=[160,100,30];
     const pulse=0.55+Math.sin(sceneT*4)*0.18;
     const glow=ctx.createRadialGradient(cx,tvY+tvH*0.5,tvW*0.1,cx,tvY+tvH*0.5,W*0.95);
     glow.addColorStop(0,`rgba(${glowCol[0]},${glowCol[1]},${glowCol[2]},${pulse*0.22})`);
     glow.addColorStop(0.4,`rgba(${glowCol[0]},${glowCol[1]},${glowCol[2]},${pulse*0.06})`);
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);
    }

    function frame(){
     if(stop.v)return;

     /* Avancer la scène */
     sceneT+=0.016;
     if(sceneT>SCENE_DUR){
      sceneT=0;
      sceneIdx=(sceneIdx+1)%4;
      triggerShake(sceneIdx===1?6:3); /* cut plus violent vers la scène rouge */
     }

     /* Shake */
     if(shakeDur>0){shakeX*=0.72;shakeY*=0.72;shakeDur--;}else{shakeX=0;shakeY=0;}

     ctx.save();
     if(shakeX||shakeY) ctx.translate(shakeX,shakeY);

     /* Fond */
     ctx.fillStyle='rgba(0,0,0,0.22)'; ctx.fillRect(0,0,W,H);

     /* Lueur TV */
     drawTVGlow();

     /* Télé */
     drawTV();

     ctx.restore();

     /* Vignette — noir dans les coins */
     const vg=ctx.createRadialGradient(cx,cy,H*0.10,cx,cy,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(0,0,0,0.18)');
     vg.addColorStop(0.78,'rgba(0,0,0,0.65)');
     vg.addColorStop(1,'rgba(0,0,0,0.98)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     /* Grain pellicule */
     for(let i=0;i<55;i++){
      const gv=6+Math.random()*18|0;
      ctx.fillStyle=`rgba(${gv},${gv*0.85|0},${gv},${Math.random()*0.028})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.4,1);
     }

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
