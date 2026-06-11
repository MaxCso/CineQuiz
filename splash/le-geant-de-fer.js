// CinéQuiz splash chunk — Le Géant de fer
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Géant de fer"]={
   name:'Le G\u00e9ant de fer',
   color:'40,120,200',
   ref:'Le G\u00e9ant de fer \u2014 Brad Bird, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : nuit profonde ── */
    let _igStyle=document.getElementById('_ig_splash_style');
    if(!_igStyle){_igStyle=document.createElement('style');_igStyle.id='_ig_splash_style';document.head.appendChild(_igStyle);}
    _igStyle.textContent=`
      

    `;
    const _igWatch=setInterval(()=>{if(stop.v){_igStyle.textContent='';clearInterval(_igWatch);}},200);

    /* Étoiles — plus nombreuses, couvrent tout l'écran */
    const stars=Array.from({length:180},()=>({
     x:Math.random()*W, y:Math.random()*H*0.72,
     r:Math.random()*1.5+0.2,
     op:Math.random()*0.70+0.15,
     twinkle:Math.random()*Math.PI*2,
    }));
    /* Météores */
    const meteors=Array.from({length:6},()=>({
     x:Math.random()*W, y:Math.random()*H*0.30,
     vx:-(Math.random()*4+2), vy:Math.random()*2.5+1,
     len:Math.random()*60+30, active:Math.random()<0.3,
    }));
    let meteorTimer=0;
    /* Pulse des yeux */
    let pulse=0;

    /* ── Giant — centré verticalement, très grand ── */
    const gS=W*1.55; /* échelle : robot très imposant */
    /* Le corps s'étend de y=0 (torse) à y≈gS*0.56 (pieds), tête à y≈-gS*0.165
       Centre visuel du robot ≈ gS*0.20 → on centre sur H*0.50 */
    const giantX=cx, giantY=H*0.50-gS*0.20;

    function drawGiant(x,y){
     ctx.save();ctx.translate(x,y);
     const s=gS;
     /* Ombre portée au sol */
     const shadowG=ctx.createRadialGradient(0,s*0.52,0,0,s*0.52,s*0.38);
     shadowG.addColorStop(0,'rgba(0,0,0,0.55)');shadowG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shadowG;ctx.beginPath();ctx.ellipse(0,s*0.52,s*0.38,s*0.07,0,0,Math.PI*2);ctx.fill();

     const col='rgba(14,16,20,0.98)';
     ctx.fillStyle=col;
     /* Jambes */
     ctx.beginPath();ctx.roundRect(-s*0.080,s*0.255,s*0.072,s*0.265,5);ctx.fill();
     ctx.beginPath();ctx.roundRect( s*0.008,s*0.255,s*0.072,s*0.265,5);ctx.fill();
     /* Pieds */
     ctx.beginPath();ctx.roundRect(-s*0.100,s*0.500,s*0.095,s*0.055,4);ctx.fill();
     ctx.beginPath();ctx.roundRect( s*0.005,s*0.500,s*0.095,s*0.055,4);ctx.fill();
     /* Torse */
     ctx.beginPath();ctx.roundRect(-s*0.105,s*0.02,s*0.210,s*0.245,8);ctx.fill();
     /* Épaules / détail haut de torse */
     ctx.beginPath();ctx.roundRect(-s*0.118,s*0.02,s*0.236,s*0.065,6);ctx.fill();
     /* Bras gauche */
     ctx.beginPath();ctx.roundRect(-s*0.205,s*0.025,s*0.085,s*0.200,6);ctx.fill();
     /* Bras droit */
     ctx.beginPath();ctx.roundRect( s*0.120,s*0.025,s*0.085,s*0.200,6);ctx.fill();
     /* Mains */
     ctx.beginPath();ctx.roundRect(-s*0.220,s*0.215,s*0.105,s*0.065,5);ctx.fill();
     ctx.beginPath();ctx.roundRect( s*0.115,s*0.215,s*0.105,s*0.065,5);ctx.fill();
     /* Cou */
     ctx.beginPath();ctx.roundRect(-s*0.042,-s*0.015,s*0.084,s*0.045,4);ctx.fill();
     /* Tête */
     ctx.beginPath();ctx.roundRect(-s*0.082,-s*0.165,s*0.164,s*0.160,10);ctx.fill();
     /* Antennes / oreilles */
     ctx.beginPath();ctx.roundRect(-s*0.098,-s*0.155,s*0.020,s*0.060,3);ctx.fill();
     ctx.beginPath();ctx.roundRect( s*0.078,-s*0.155,s*0.020,s*0.060,3);ctx.fill();

     /* Yeux — lueur cyan intense */
     for(const ex of [-s*0.032, s*0.032]){
      const ey=-s*0.090;
      /* Halo large */
      const eyeG=ctx.createRadialGradient(ex,ey,1,ex,ey,s*0.055);
      eyeG.addColorStop(0,`rgba(120,240,255,${0.90+Math.sin(pulse*1.2)*0.08})`);
      eyeG.addColorStop(0.4,`rgba(60,180,255,${0.50+Math.sin(pulse)*0.10})`);
      eyeG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eyeG;ctx.beginPath();ctx.arc(ex,ey,s*0.055,0,Math.PI*2);ctx.fill();
      /* Pupille lumineuse */
      ctx.fillStyle=`rgba(200,248,255,${0.95+Math.sin(pulse*1.5)*0.04})`;
      ctx.beginPath();ctx.arc(ex,ey,s*0.014,0,Math.PI*2);ctx.fill();
      /* Point blanc central */
      ctx.fillStyle='rgba(255,255,255,0.98)';
      ctx.beginPath();ctx.arc(ex,ey,s*0.006,0,Math.PI*2);ctx.fill();
     }
     /* Reflet métallique sur torse */
     const shine=ctx.createLinearGradient(-s*0.10,s*0.02,s*0.10,s*0.15);
     shine.addColorStop(0,'rgba(80,100,130,0.18)');
     shine.addColorStop(0.5,'rgba(120,150,180,0.08)');
     shine.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shine;ctx.beginPath();ctx.roundRect(-s*0.105,s*0.02,s*0.210,s*0.245,8);ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     /* Fond noir profond */
     ctx.fillStyle='#01020a';ctx.fillRect(0,0,W,H);

     /* Ciel dégradé nuit — avec légère lueur chaude basse */
     const sky=ctx.createLinearGradient(0,0,0,H*0.72);
     sky.addColorStop(0,'rgba(1,2,12,1)');
     sky.addColorStop(0.50,'rgba(3,6,20,1)');
     sky.addColorStop(0.80,'rgba(8,14,28,1)');
     sky.addColorStop(1,'rgba(15,22,18,1)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.72);

     /* Étoiles */
     for(const s of stars){
      s.twinkle+=0.018;
      const op=s.op*(0.60+0.40*Math.sin(s.twinkle));
      ctx.fillStyle=`rgba(215,225,245,${op})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* Météores */
     meteorTimer--;
     if(meteorTimer<=0){meteorTimer=60+Math.floor(Math.random()*120);for(const m of meteors)if(!m.active){m.active=true;m.x=W*0.2+Math.random()*W*0.8;m.y=Math.random()*H*0.18;break;}}
     for(const m of meteors){
      if(!m.active)continue;m.x+=m.vx;m.y+=m.vy;
      if(m.x<-m.len||m.y>H*0.60)m.active=false;
      const mg=ctx.createLinearGradient(m.x,m.y,m.x-m.vx*m.len*0.5,m.y-m.vy*m.len*0.5);
      mg.addColorStop(0,'rgba(230,240,255,0.90)');mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.strokeStyle=mg;ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(m.x-m.vx*m.len*0.5,m.y-m.vy*m.len*0.5);ctx.stroke();
     }

     /* Collines sombres — horizon plus bas */
     ctx.fillStyle='rgba(6,10,5,1)';
     ctx.beginPath();ctx.moveTo(0,H*0.72);
     const hills=[[0,H*0.72],[W*0.10,H*0.60],[W*0.25,H*0.66],[W*0.42,H*0.55],[W*0.58,H*0.62],[W*0.74,H*0.52],[W*0.88,H*0.59],[W,H*0.65],[W,H]];
     for(const [hx,hy] of hills)ctx.lineTo(hx,hy);
     ctx.lineTo(0,H);ctx.closePath();ctx.fill();

     /* Sol */
     ctx.fillStyle='rgba(8,12,5,1)';ctx.fillRect(0,H*0.72,W,H);

     pulse+=0.022;

     /* Grand halo cyan des yeux — projeté sur le décor */
     const eyeHaloY=giantY-gS*0.090;
     const bigBeam=ctx.createRadialGradient(giantX,eyeHaloY,10,giantX,eyeHaloY,W*0.70);
     bigBeam.addColorStop(0,`rgba(80,210,255,${0.28+Math.sin(pulse*1.1)*0.06})`);
     bigBeam.addColorStop(0.30,`rgba(40,150,220,${0.14+Math.sin(pulse)*0.04})`);
     bigBeam.addColorStop(0.65,'rgba(10,60,120,0.06)');
     bigBeam.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bigBeam;ctx.fillRect(0,0,W,H);

     /* Reflet au sol sous les yeux */
     const groundBeam=ctx.createRadialGradient(giantX,H*0.72,5,giantX,H*0.72,W*0.45);
     groundBeam.addColorStop(0,`rgba(60,200,255,${0.22+Math.sin(pulse)*0.06})`);
     groundBeam.addColorStop(0.5,'rgba(20,100,180,0.06)');
     groundBeam.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=groundBeam;ctx.beginPath();ctx.ellipse(giantX,H*0.73,W*0.42,H*0.08,0,0,Math.PI*2);ctx.fill();

     /* Aura bleue autour du corps */
     const bodyAura=ctx.createRadialGradient(giantX,giantY+gS*0.20,gS*0.05,giantX,giantY+gS*0.20,gS*0.55);
     bodyAura.addColorStop(0,`rgba(30,80,160,${0.18+Math.sin(pulse*0.6)*0.04})`);
     bodyAura.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bodyAura;ctx.beginPath();ctx.arc(giantX,giantY+gS*0.20,gS*0.55,0,Math.PI*2);ctx.fill();

     /* Giant */
     drawGiant(giantX,giantY);

     /* Vignette douce — seulement sur les bords */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.20,cx,H*0.45,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.08)');
     vg.addColorStop(1,'rgba(0,0,0,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain léger */
     for(let i=0;i<18;i++){const g=4+Math.random()*10|0;ctx.fillStyle=`rgba(${g},${g+4},${g+8},${Math.random()*0.018})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.4,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
