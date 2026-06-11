// CinéQuiz splash chunk — Stand by Me
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Stand by Me"]={
   name:'Stand by Me',
   color:'180,140,80',
   ref:'Stand by Me \u2014 Rob Reiner, 1986',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.74';
    let t=0;
    const cx=W/2;

    /* ── Position citation sous le logo CinéQuiz ── */
    let _sbmS=document.getElementById('_sbm_s');
    if(!_sbmS){_sbmS=document.createElement('style');_sbmS.id='_sbm_s';document.head.appendChild(_sbmS);}
    _sbmS.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _sbmW=setInterval(()=>{if(stop.v){_sbmS.textContent='';clearInterval(_sbmW);}},200);

    // ── Point de fuite des rails ──
    const vpX=cx, vpY=H*0.42;
    const railBaseSpread=W*0.30; // écartement des rails en bas

    // ── Lucioles ──
    const fireflies=Array.from({length:38},()=>({
     x:Math.random()*W, y:H*0.45+Math.random()*H*0.45,
     vx:(Math.random()-0.5)*0.45,
     vy:(Math.random()-0.5)*0.25,
     phase:Math.random()*Math.PI*2,
     phaseSpd:Math.random()*0.06+0.03,
     r:Math.random()*2.2+0.8,
     hue:42+Math.random()*25
    }));

    // ── Étoiles ──
    const stars=Array.from({length:60},()=>({
     x:Math.random()*W, y:Math.random()*vpY*0.9,
     r:Math.random()*0.9+0.2,
     op:Math.random()*0.5+0.15,
     twinkle:Math.random()*Math.PI*2
    }));

    // ── Étoiles filantes ──
    const shootingStars=Array.from({length:4},()=>({
     x:-W*0.2, y:0,
     active:false,
     waitTimer:Math.random()*420+60,
     vx:0, vy:0,
     len:0, op:0, life:0
    }));

    function spawnShootingStar(s){
     const angle=(Math.PI*0.14)+Math.random()*Math.PI*0.12;
     const spd=W*(0.012+Math.random()*0.010);
     s.x=Math.random()*W*0.8;
     s.y=Math.random()*vpY*0.65;
     s.vx=Math.cos(angle)*spd;
     s.vy=Math.sin(angle)*spd;
     s.len=W*(0.08+Math.random()*0.10);
     s.op=0.7+Math.random()*0.25;
     s.life=0;
     s.active=true;
    }

    // ── 4 silhouettes de gamins sur les rails ──
    // Positionnées en perspective sur les rails, espacées
    const kids=[
     {prog:0.88, offset:-0.05, h:26}, // le plus proche, légèrement à gauche du centre
     {prog:0.82, offset: 0.04, h:23},
     {prog:0.75, offset:-0.03, h:20},
     {prog:0.68, offset: 0.05, h:17}, // le plus loin
    ];

    function railX(side, prog){
     // side: -1 = rail gauche, +1 = rail droit
     // prog: 0=horizon, 1=bas écran
     const spread=4+railBaseSpread*prog;
     return vpX + side * spread;
    }

    function drawRails(){
     // ── Ballast (gravier sous les rails) ──
     const ballastGrad=ctx.createLinearGradient(0,vpY,0,H);
     ballastGrad.addColorStop(0,'rgba(40,30,20,0)');
     ballastGrad.addColorStop(0.3,'rgba(35,28,18,0.55)');
     ballastGrad.addColorStop(1,'rgba(28,22,14,0.80)');
     ctx.fillStyle=ballastGrad;
     ctx.beginPath();
     ctx.moveTo(vpX-6,vpY);
     ctx.lineTo(cx-railBaseSpread*1.5,H);
     ctx.lineTo(cx+railBaseSpread*1.5,H);
     ctx.lineTo(vpX+6,vpY);
     ctx.closePath();ctx.fill();

     // ── Traverses en bois ──
     const nTies=22;
     for(let i=1;i<=nTies;i++){
      const prog=Math.pow(i/nTies,1.5);
      const y=vpY+(H-vpY)*prog;
      const xl=railX(-1,prog);
      const xr=railX(1,prog);
      const tieW=(xr-xl)*1.35;
      const tieH=Math.max(2,prog*7);
      const alpha=0.25+prog*0.45;
      const dark=12+prog*18;
      ctx.fillStyle=`rgba(${dark+8},${dark+4},${dark},${alpha})`;
      ctx.fillRect(cx-tieW/2, y-tieH/2, tieW, tieH);
      // Grain du bois (ligne centrale)
      ctx.strokeStyle=`rgba(${dark+16},${dark+10},${dark+4},${alpha*0.4})`;
      ctx.lineWidth=0.5;
      ctx.beginPath();ctx.moveTo(cx-tieW/2,y);ctx.lineTo(cx+tieW/2,y);ctx.stroke();
     }

     // ── Rails (2 lignes métalliques) ──
     for(const side of [-1,1]){
      // Ombre portée du rail
      ctx.strokeStyle='rgba(8,6,4,0.45)';
      ctx.lineWidth=3;
      ctx.beginPath();
      ctx.moveTo(vpX+side*4,vpY);
      ctx.lineTo(railX(side,1)+2,H);
      ctx.stroke();

      // Rail principal
      const railGrad=ctx.createLinearGradient(0,vpY,0,H);
      railGrad.addColorStop(0,'rgba(100,90,75,0.55)');
      railGrad.addColorStop(0.3,'rgba(145,130,105,0.80)');
      railGrad.addColorStop(0.7,'rgba(160,145,115,0.90)');
      railGrad.addColorStop(1,'rgba(140,125,100,0.85)');
      ctx.strokeStyle=railGrad;
      ctx.lineWidth=3;
      ctx.beginPath();
      ctx.moveTo(vpX+side*4,vpY);
      ctx.lineTo(railX(side,1),H);
      ctx.stroke();

      // Reflet sur le dessus du rail (ligne claire)
      ctx.strokeStyle='rgba(220,210,185,0.28)';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(vpX+side*4,vpY);
      ctx.lineTo(railX(side,1),H);
      ctx.stroke();
     }
    }

    function drawForest(){
     // Arbres de chaque côté des rails — silhouettes sombres
     const treeY=H*0.62; // ligne du sol de la forêt
     function drawTree(x,h,w){
      ctx.fillStyle='rgba(4,8,3,0.82)';
      // Tronc
      ctx.fillRect(x-w*0.08,treeY-h*0.3,w*0.16,h*0.30);
      // Feuillage (3 couches triangulaires)
      for(let l=0;l<3;l++){
       const ly=treeY-h*0.30-h*(0.25+l*0.22);
       const lw=w*(0.85-l*0.2);
       ctx.beginPath();
       ctx.moveTo(x,ly-h*0.22);
       ctx.lineTo(x+lw/2,ly);
       ctx.lineTo(x-lw/2,ly);
       ctx.closePath();ctx.fill();
      }
     }
     // Forêt gauche
     const leftTrees=[
      {x:W*0.00,h:105,w:55},{x:W*0.06,h:130,w:65},{x:W*0.13,h:90,w:50},
      {x:W*0.19,h:115,w:58},{x:W*0.03,h:80,w:42},{x:W*0.09,h:145,w:70},
     ];
     // Forêt droite
     const rightTrees=[
      {x:W*1.00,h:110,w:55},{x:W*0.94,h:125,w:62},{x:W*0.87,h:95,w:52},
      {x:W*0.81,h:120,w:60},{x:W*0.97,h:85,w:45},{x:W*0.91,h:140,w:68},
     ];
     [...leftTrees,...rightTrees].forEach(tr=>drawTree(tr.x,tr.h,tr.w));
    }

    function drawKids(){
     for(const k of kids){
      const prog=k.prog;
      const fy=vpY+(H-vpY)*Math.pow(prog,1.5); // Y en perspective
      const fx=vpX+k.offset*(railBaseSpread*prog*1.8);
      const sc=prog*0.9; // échelle perspective
      const kh=k.h*sc;

      ctx.save();ctx.translate(fx,fy);
      ctx.fillStyle='rgba(4,3,2,0.90)';
      // Jambes
      ctx.fillRect(-2*sc,0,2*sc,kh*0.42);
      ctx.fillRect(1*sc,0,2*sc,kh*0.42);
      // Corps
      ctx.beginPath();
      ctx.ellipse(0,-kh*0.55,3.5*sc,kh*0.30,0,0,Math.PI*2);
      ctx.fill();
      // Tête
      ctx.beginPath();ctx.arc(0,-kh*0.90,3*sc,0,Math.PI*2);ctx.fill();
      // Bras balancés (selon t)
      const swing=Math.sin(t*2+k.prog*8)*0.3*sc;
      ctx.strokeStyle='rgba(4,3,2,0.90)';ctx.lineWidth=2*sc;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(-3*sc,-kh*0.62);ctx.lineTo(-6*sc-swing,-kh*0.32);ctx.stroke();
      ctx.beginPath();ctx.moveTo(3*sc,-kh*0.62);ctx.lineTo(6*sc+swing,-kh*0.32);ctx.stroke();
      ctx.restore();
     }
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(2,2,1,0.13)';ctx.fillRect(0,0,W,H);

     // ── Ciel été Oregon — coucher de soleil chaud ──
     const sky=ctx.createLinearGradient(0,0,0,vpY);
     sky.addColorStop(0,`rgba(8,10,24,0.10)`);
     sky.addColorStop(0.4,`rgba(${30+Math.sin(t*0.12)*4|0},20,40,0.08)`);
     sky.addColorStop(0.75,`rgba(${80+Math.sin(t*0.1)*8|0},35,15,0.10)`);
     sky.addColorStop(1,`rgba(${120+Math.sin(t*0.08)*10|0},50,10,0.12)`);
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,vpY);

     // Lueur d'horizon chaude (soleil qui descend)
     const sunX=cx-W*0.12;
     const sunGlow=ctx.createRadialGradient(sunX,vpY,0,sunX,vpY,W*0.55);
     sunGlow.addColorStop(0,`rgba(${230+Math.sin(t*0.15)*10|0},${80+Math.sin(t*0.12)*8|0},15,${0.22+Math.sin(t*0.2)*0.04})`);
     sunGlow.addColorStop(0.35,'rgba(160,45,5,0.08)');
     sunGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunGlow;ctx.fillRect(0,0,W,H*0.75);

     // ── Étoiles (début de nuit) ──
     for(const s of stars){
      s.twinkle+=0.02;
      const op=s.op*(0.6+Math.sin(s.twinkle)*0.4);
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(240,235,220,${op})`;ctx.fill();
     }

     // ── Étoiles filantes ──
     for(const s of shootingStars){
      if(!s.active){
       s.waitTimer--;
       if(s.waitTimer<=0) spawnShootingStar(s);
      } else {
       s.life+=0.028;
       s.x+=s.vx; s.y+=s.vy;
       /* fade in rapide, fade out doux */
       const fade=s.life<0.15 ? s.life/0.15 : Math.max(0,1-(s.life-0.15)/0.85);
       const curOp=s.op*fade;
       if(curOp>0.01&&s.y<vpY){
        const tx=s.x-Math.cos(Math.atan2(s.vy,s.vx))*s.len*fade;
        const ty=s.y-Math.sin(Math.atan2(s.vy,s.vx))*s.len*fade;
        const sg=ctx.createLinearGradient(tx,ty,s.x,s.y);
        sg.addColorStop(0,'rgba(255,255,240,0)');
        sg.addColorStop(0.6,`rgba(255,252,230,${curOp*0.45})`);
        sg.addColorStop(1,`rgba(255,255,245,${curOp})`);
        ctx.save();
        ctx.strokeStyle=sg;
        ctx.lineWidth=1.4;
        ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(s.x,s.y);ctx.stroke();
        /* petit point brillant en tête */
        ctx.beginPath();ctx.arc(s.x,s.y,1.6*fade,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,240,${curOp})`;ctx.fill();
        ctx.restore();
       }
       if(s.life>=1||s.y>=vpY||s.x>W){
        s.active=false;
        s.waitTimer=180+Math.random()*360;
       }
      }
     }

     // ── Sol herbeux ──
     const ground=ctx.createLinearGradient(0,vpY,0,H);
     ground.addColorStop(0,`rgba(${20+Math.sin(t*0.1)*3|0},28,10,0.65)`);
     ground.addColorStop(0.4,'rgba(12,18,6,0.80)');
     ground.addColorStop(1,'rgba(5,8,2,0.90)');
     ctx.fillStyle=ground;ctx.fillRect(0,vpY,W,H-vpY);

     // ── Forêt ──
     drawForest();

     // ── Rails + traverses ──
     drawRails();

     // ── Gamins ──
     drawKids();

     // ── Lucioles ──
     for(const f of fireflies){
      f.x+=f.vx;f.y+=f.vy;
      f.phase+=f.phaseSpd;
      if(f.x<0)f.x=W;if(f.x>W)f.x=0;
      if(f.y<vpY*0.6)f.y=H*0.82;if(f.y>H*0.92)f.y=vpY*0.7;
      const glow=0.5+Math.sin(f.phase*2.5)*0.5;
      if(glow<0.1)continue; // clignotement — invisible par intermittence
      // Halo externe
      const hg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*6);
      hg.addColorStop(0,`hsla(${f.hue},90%,72%,${glow*0.18})`);
      hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(f.x,f.y,f.r*6,0,Math.PI*2);ctx.fill();
      // Corps lumineux
      ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${f.hue},95%,80%,${glow*0.90})`;ctx.fill();
     }

     // Vignette
     const vg=ctx.createRadialGradient(cx,H*0.55,H*0.05,cx,H*0.55,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(1,2,0,0.15)');
     vg.addColorStop(1,'rgba(1,3,0,0.78)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
