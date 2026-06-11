// CinéQuiz splash chunk — Grease
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Grease"]={
   name:'Grease',
   color:'200,100,180',
   ref:'Grease \u2014 Randal Kleiser, 1978',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_gr_s');
    if(!_s){_s=document.createElement('style');_s.id='_gr_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Étoiles fond */
    const stars=Array.from({length:80},()=>({x:Math.random()*W,y:Math.random()*H*0.55,r:Math.random()*1.3+0.2,op:0.3+Math.random()*0.5,ph:Math.random()*Math.PI*2}));
    /* Notes de musique */
    const NOTES=['♪','♫','♩','♬'];
    const notes=Array.from({length:20},()=>({
     x:Math.random()*W,y:H*0.10+Math.random()*H*0.80,
     vy:-(0.20+Math.random()*0.35),vx:(Math.random()-0.5)*0.15,
     op:0.15+Math.random()*0.28,size:W*(0.035+Math.random()*0.030),
     note:NOTES[Math.floor(Math.random()*NOTES.length)],
     ph:Math.random()*Math.PI*2,col:Math.random()<0.5?'255,60,180':'255,200,40',
    }));
    /* Paillettes */
    const glitters=Array.from({length:35},()=>({
     x:Math.random()*W,y:Math.random()*H,r:Math.random()*2.0+0.4,
     op:Math.random()*0.55+0.10,ph:Math.random()*Math.PI*2,spd:0.04+Math.random()*0.06,
     col:['255,80,200','255,200,40','80,200,255','200,80,255'][Math.floor(Math.random()*4)],
    }));

    /* ── Silhouettes dansantes ── */
    /* 5 danseurs autour de la voiture, chacun avec une chorégraphie rock'n'roll */
    const dancers=[
     {xr:-0.42, side:-1, phase:0.0,    spd:0.08, style:'twist'},
     {xr:-0.28, side:-1, phase:1.1,    spd:0.09, style:'jive'},
     {xr: 0.30, side: 1, phase:0.5,    spd:0.085,style:'jive'},
     {xr: 0.44, side: 1, phase:2.2,    spd:0.075,style:'twist'},
     {xr:-0.12, side:-1, phase:3.4,    spd:0.10, style:'jump'},
    ];

    function drawDancer(dx,dy,sc,ph,style,side){
     ctx.save();ctx.translate(dx,dy);
     /* Corps principal */
     const armSwing=Math.sin(ph)*0.55;
     const legSwing=Math.sin(ph)*0.40;
     const bodyTilt=Math.sin(ph*0.5)*0.08;
     ctx.rotate(bodyTilt*side);
     ctx.fillStyle='rgba(8,4,18,0.92)';
     ctx.strokeStyle='rgba(8,4,18,0.92)';
     ctx.lineCap='round';

     if(style==='jump'){
      /* Saut — corps en l'air */
      const jumpH=Math.max(0,Math.sin(ph))*sc*0.18;
      ctx.translate(0,-jumpH);
      /* Jambes écartées en saut */
      ctx.lineWidth=sc*0.13;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-sc*0.20,sc*0.32+Math.abs(Math.sin(ph))*sc*0.08);ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(sc*0.20,sc*0.32+Math.abs(Math.sin(ph))*sc*0.08);ctx.stroke();
     } else {
      /* Jambes — alternance */
      ctx.lineWidth=sc*0.13;
      ctx.beginPath();ctx.moveTo(-sc*0.06,0);ctx.lineTo(-sc*0.14+legSwing*sc*0.15,sc*0.38);ctx.stroke();
      ctx.beginPath();ctx.moveTo(sc*0.06,0);ctx.lineTo(sc*0.14-legSwing*sc*0.15,sc*0.38);ctx.stroke();
     }
     /* Corps */
     ctx.lineWidth=sc*0.16;
     ctx.beginPath();ctx.moveTo(0,-sc*0.22);ctx.lineTo(0,0);ctx.stroke();
     /* Bras */
     ctx.lineWidth=sc*0.10;
     if(style==='twist'){
      /* Bras levés en twist */
      ctx.beginPath();ctx.moveTo(-sc*0.04,-sc*0.10);ctx.lineTo(-sc*0.28,-sc*0.22+armSwing*sc*0.12);ctx.stroke();
      ctx.beginPath();ctx.moveTo(sc*0.04,-sc*0.10);ctx.lineTo(sc*0.28,-sc*0.22-armSwing*sc*0.12);ctx.stroke();
     } else {
      /* Bras en jive */
      ctx.beginPath();ctx.moveTo(-sc*0.04,-sc*0.12);ctx.lineTo(-sc*0.24,sc*0.04+armSwing*sc*0.20);ctx.stroke();
      ctx.beginPath();ctx.moveTo(sc*0.04,-sc*0.12);ctx.lineTo(sc*0.26,-sc*0.05-armSwing*sc*0.18);ctx.stroke();
     }
     /* Tête */
     ctx.fillStyle='rgba(8,4,18,0.92)';
     ctx.beginPath();ctx.arc(0,-sc*0.30,sc*0.10,0,Math.PI*2);ctx.fill();
     /* Jupe pour 2 danseurs (côtés) */
     if(style==='twist'){
      ctx.fillStyle='rgba(12,5,22,0.75)';
      ctx.beginPath();
      ctx.moveTo(-sc*0.12,0);
      ctx.bezierCurveTo(-sc*0.24+Math.sin(ph)*sc*0.06,sc*0.20,-sc*0.18,sc*0.36,-sc*0.08,sc*0.38);
      ctx.bezierCurveTo(0,sc*0.40,sc*0.08,sc*0.38,sc*0.18,sc*0.38);
      ctx.bezierCurveTo(sc*0.24,sc*0.36,sc*0.24+Math.sin(ph)*sc*0.06,sc*0.20,sc*0.12,0);
      ctx.closePath();ctx.fill();
     }
     ctx.restore();
    }

    function drawCar(){
     const carY=H*0.74;
     const sc=H; /* référence pour les dimensions */

     /* Sol avec reflet */
     const floorG=ctx.createLinearGradient(0,carY,0,carY+H*0.10);
     floorG.addColorStop(0,'rgba(50,15,70,0.90)');floorG.addColorStop(0.5,'rgba(30,8,45,0.60)');floorG.addColorStop(1,'rgba(10,5,18,0.0)');
     ctx.fillStyle=floorG;ctx.fillRect(0,carY,W,H*0.10);

     /* Halo des phares avant — lumière chaude jaune */
     const headlightL=cx-W*0.26;
     const headlightR=cx+W*0.26;
     for(const [hx,dir] of [[headlightL,-1],[headlightR,1]]){
      const hg=ctx.createConicalGradient?ctx.createConicalGradient(hx,carY-sc*0.04,0):null;
      /* Cône de lumière */
      const coneG=ctx.createLinearGradient(hx,carY-sc*0.04,hx+dir*W*0.45,carY+H*0.05);
      coneG.addColorStop(0,`rgba(255,230,120,${0.18+Math.sin(t*2.2)*0.04})`);
      coneG.addColorStop(0.4,`rgba(255,200,80,${0.07+Math.sin(t*1.8)*0.02})`);
      coneG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=coneG;
      ctx.beginPath();
      ctx.moveTo(hx,carY-sc*0.04);
      ctx.lineTo(hx+dir*W*0.45,carY-H*0.04);
      ctx.lineTo(hx+dir*W*0.45,carY+H*0.06);
      ctx.closePath();ctx.fill();
     }

     /* Néon sous-caisse — rose pulsant */
     const neonY=carY+sc*0.002;
     const neonG=ctx.createLinearGradient(cx-W*0.30,neonY,cx+W*0.30,neonY);
     neonG.addColorStop(0,'rgba(0,0,0,0)');
     neonG.addColorStop(0.15,`rgba(255,40,160,${0.35+Math.sin(t*1.5)*0.10})`);
     neonG.addColorStop(0.50,`rgba(255,40,160,${0.42+Math.sin(t*1.8)*0.10})`);
     neonG.addColorStop(0.85,`rgba(255,40,160,${0.35+Math.sin(t*1.5)*0.10})`);
     neonG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.strokeStyle=neonG;ctx.lineWidth=3;
     ctx.beginPath();ctx.moveTo(cx-W*0.28,neonY);ctx.lineTo(cx+W*0.28,neonY);ctx.stroke();
     /* Reflet néon au sol */
     const refG=ctx.createLinearGradient(cx-W*0.30,neonY+5,cx+W*0.30,neonY+5);
     refG.addColorStop(0,'rgba(0,0,0,0)');
     refG.addColorStop(0.5,`rgba(255,40,160,${0.12+Math.sin(t*1.5)*0.04})`);
     refG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.strokeStyle=refG;ctx.lineWidth=8;
     ctx.beginPath();ctx.moveTo(cx-W*0.25,neonY+H*0.010);ctx.lineTo(cx+W*0.25,neonY+H*0.010);ctx.stroke();

     /* Carrosserie principale */
     ctx.fillStyle='rgba(10,5,18,0.98)';
     ctx.beginPath();
     ctx.moveTo(cx-W*0.30,carY);
     ctx.lineTo(cx-W*0.24,carY-H*0.038);
     ctx.bezierCurveTo(cx-W*0.18,carY-H*0.062,cx-W*0.10,carY-H*0.078,cx-W*0.04,carY-H*0.080);
     ctx.bezierCurveTo(cx+W*0.04,carY-H*0.082,cx+W*0.12,carY-H*0.080,cx+W*0.20,carY-H*0.060);
     ctx.lineTo(cx+W*0.30,carY);
     ctx.closePath();ctx.fill();

     /* Toit bombé — coupé cabriolet */
     ctx.fillStyle='rgba(8,4,15,0.98)';
     ctx.beginPath();
     ctx.moveTo(cx-W*0.14,carY-H*0.062);
     ctx.bezierCurveTo(cx-W*0.14,carY-H*0.118,cx-W*0.08,carY-H*0.130,cx,carY-H*0.132);
     ctx.bezierCurveTo(cx+W*0.08,carY-H*0.130,cx+W*0.14,carY-H*0.118,cx+W*0.14,carY-H*0.062);
     ctx.closePath();ctx.fill();

     /* Pare-brise */
     ctx.strokeStyle=`rgba(120,180,255,${0.14+Math.sin(t*0.8)*0.04})`;ctx.lineWidth=W*0.006;
     ctx.beginPath();
     ctx.moveTo(cx-W*0.14,carY-H*0.062);
     ctx.bezierCurveTo(cx-W*0.12,carY-H*0.116,cx+W*0.12,carY-H*0.116,cx+W*0.14,carY-H*0.062);
     ctx.stroke();

     /* Aileron arrière droit */
     ctx.fillStyle='rgba(10,5,18,0.98)';
     ctx.beginPath();
     ctx.moveTo(cx+W*0.26,carY-H*0.028);
     ctx.lineTo(cx+W*0.35,carY-H*0.060);
     ctx.lineTo(cx+W*0.36,carY);
     ctx.closePath();ctx.fill();

     /* Détails chromés — contour carrosserie */
     ctx.strokeStyle=`rgba(255,200,120,${0.22+Math.sin(t*1.2)*0.06})`;ctx.lineWidth=W*0.004;
     ctx.beginPath();
     ctx.moveTo(cx-W*0.30,carY);
     ctx.lineTo(cx-W*0.24,carY-H*0.038);
     ctx.bezierCurveTo(cx-W*0.18,carY-H*0.062,cx-W*0.10,carY-H*0.078,cx-W*0.04,carY-H*0.080);
     ctx.bezierCurveTo(cx+W*0.04,carY-H*0.082,cx+W*0.12,carY-H*0.080,cx+W*0.20,carY-H*0.060);
     ctx.lineTo(cx+W*0.30,carY);
     ctx.stroke();

     /* Phares avant (feux ambrés) */
     for(const [hx,pulse] of [[headlightL,Math.sin(t*2.2)],[headlightR,Math.sin(t*2.2+0.3)]]){
      const hg=ctx.createRadialGradient(hx,carY-sc*0.040,0,hx,carY-sc*0.040,W*0.048);
      hg.addColorStop(0,`rgba(255,245,180,${0.90+pulse*0.08})`);
      hg.addColorStop(0.35,`rgba(255,210,80,${0.55+pulse*0.06})`);
      hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(hx,carY-sc*0.040,W*0.048,0,Math.PI*2);ctx.fill();
      /* Lentille */
      ctx.fillStyle=`rgba(255,240,160,${0.72+pulse*0.10})`;
      ctx.beginPath();ctx.ellipse(hx,carY-sc*0.040,W*0.018,W*0.011,0,0,Math.PI*2);ctx.fill();
     }

     /* Feux arrière rouges */
     const tailG=ctx.createRadialGradient(cx+W*0.30,carY-sc*0.025,0,cx+W*0.30,carY-sc*0.025,W*0.032);
     tailG.addColorStop(0,`rgba(255,20,20,${0.75+Math.sin(t*2)*0.12})`);
     tailG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tailG;ctx.beginPath();ctx.arc(cx+W*0.30,carY-sc*0.025,W*0.032,0,Math.PI*2);ctx.fill();

     /* Roues */
     ctx.fillStyle='rgba(6,3,12,0.98)';
     ctx.beginPath();ctx.arc(cx-W*0.19,carY+H*0.006,W*0.042,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(cx+W*0.19,carY+H*0.006,W*0.042,0,Math.PI*2);ctx.fill();
     /* Rayons chromés animés */
     ctx.strokeStyle=`rgba(255,220,160,${0.35+Math.sin(t*3)*0.10})`;ctx.lineWidth=1.5;
     for(const wxc of [cx-W*0.19,cx+W*0.19]){
      ctx.beginPath();ctx.arc(wxc,carY+H*0.006,W*0.024,0,Math.PI*2);ctx.stroke();
      for(let sp=0;sp<6;sp++){
       const sa=t*2.5+sp*Math.PI/3;
       ctx.beginPath();ctx.moveTo(wxc,carY+H*0.006);
       ctx.lineTo(wxc+Math.cos(sa)*W*0.020,carY+H*0.006+Math.sin(sa)*W*0.020);ctx.stroke();
      }
     }

     /* Reflet carrosserie au sol */
     ctx.save();ctx.globalAlpha=0.12;
     ctx.fillStyle='rgba(180,80,255,0.35)';
     ctx.beginPath();ctx.ellipse(cx,carY+H*0.008,W*0.26,H*0.008,0,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     /* Fond nuit années 50 — violet profond, bas éclairci */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#04020a');bg.addColorStop(0.45,'#0a0510');bg.addColorStop(0.72,'#1a0a28');bg.addColorStop(1,'#2a1040');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo néon rose — élargi vers le bas */
     const neon=ctx.createRadialGradient(cx,H*0.70,0,cx,H*0.70,W*0.80);
     neon.addColorStop(0,'rgba(255,40,160,0.22)');neon.addColorStop(0.45,'rgba(200,20,120,0.10)');neon.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=neon;ctx.fillRect(0,0,W,H);

     /* Lumière de scène — spot chaud ambré depuis le haut, zone danseurs */
     const spotG=ctx.createRadialGradient(cx,H*0.50,0,cx,H*0.50,W*0.55);
     spotG.addColorStop(0,`rgba(255,180,60,${0.12+Math.sin(t*0.3)*0.02})`);
     spotG.addColorStop(0.5,'rgba(200,100,30,0.05)');
     spotG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=spotG;ctx.fillRect(0,H*0.40,W,H*0.60);

     /* Reflet au sol — asphalte brillant sous la voiture et les danseurs */
     const floorGlow=ctx.createLinearGradient(0,H*0.72,0,H);
     floorGlow.addColorStop(0,`rgba(180,60,120,${0.22+Math.sin(t*0.5)*0.04})`);
     floorGlow.addColorStop(0.4,'rgba(120,30,80,0.10)');
     floorGlow.addColorStop(1,'rgba(60,10,40,0.05)');
     ctx.fillStyle=floorGlow;ctx.fillRect(0,H*0.72,W,H*0.28);

     /* Étoiles */
     for(const s of stars){
      s.ph+=0.018;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,220,255,${s.op*(0.55+0.45*Math.sin(s.ph))})`;ctx.fill();
     }

     /* Notes flottantes */
     ctx.textAlign='center';ctx.textBaseline='middle';
     for(const n of notes){
      n.y+=n.vy;n.x+=n.vx;n.ph+=0.020;
      if(n.y<-30){n.y=H+20;n.x=Math.random()*W;n.note=NOTES[Math.floor(Math.random()*NOTES.length)];}
      ctx.font=`${n.size}px serif`;
      ctx.fillStyle=`rgba(${n.col},${n.op*(0.6+0.4*Math.sin(n.ph))})`;
      ctx.fillText(n.note,n.x,n.y);
     }

     /* Paillettes */
     for(const g of glitters){
      g.ph+=g.spd;
      const ga=g.op*(0.4+0.6*Math.abs(Math.sin(g.ph)));
      ctx.beginPath();ctx.arc(g.x,g.y,g.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${g.col},${ga})`;ctx.fill();
     }

     /* Voiture améliorée */
     drawCar();

     /* Silhouettes dansantes — devant la voiture */
     const carY=H*0.74;
     for(const d of dancers){
      d.phase+=d.spd;
      const dx=cx+W*d.xr;
      const scale=H*0.085;
      /* Légère oscillation verticale au rythme de la danse */
      const bounce=Math.abs(Math.sin(d.phase))*scale*0.12;
      /* Halo de scène sous le danseur */
      const dSpot=ctx.createRadialGradient(dx,carY,0,dx,carY,scale*1.6);
      dSpot.addColorStop(0,`rgba(255,80,180,${0.14+Math.abs(Math.sin(d.phase))*0.06})`);
      dSpot.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=dSpot;ctx.beginPath();ctx.ellipse(dx,carY,scale*1.6,scale*0.55,0,0,Math.PI*2);ctx.fill();
      drawDancer(dx,carY-bounce,scale,d.phase,d.style,d.side);
      /* Ombre au sol */
      ctx.fillStyle=`rgba(5,2,15,${0.25+Math.abs(Math.sin(d.phase))*0.08})`;
      ctx.beginPath();ctx.ellipse(dx,carY+H*0.004,scale*0.28,H*0.006,0,0,Math.PI*2);ctx.fill();
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
