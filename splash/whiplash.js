// CinéQuiz splash chunk — Whiplash
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Whiplash"]={
   name:'Whiplash',
   color:'180,40,20',
   ref:'Whiplash \u2014 Damien Chazelle, 2014',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';

    /* ── Noir total — orbes supprimées ── */
    let _wpStyle=document.getElementById('_wp_splash_style');
    if(!_wpStyle){_wpStyle=document.createElement('style');_wpStyle.id='_wp_splash_style';document.head.appendChild(_wpStyle);}
    _wpStyle.textContent=`

      
      #splash-bg{background:none!important;}
      #splash-content-wrap{top:64%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _wpWatch=setInterval(()=>{if(stop.v){_wpStyle.textContent='';clearInterval(_wpWatch);}},200);

    let t=0;
    const cx=W/2;

    /* ── Dimensions de la caisse claire ── */
    const DRUM_CY=H*0.42;
    const DRUM_R=W*0.38;      /* rayon de la peau */
    const RIM_W=W*0.038;      /* épaisseur du cerclage */
    const LUG_COUNT=12;       /* nombre de lugs (vis de tension) */

    /* ── Cycle de beat ── */
    let beatTimer=0;
    let beatPhase=0; /* 0=repos, 1=impact, décroit */
    const BEAT_INTERVAL=()=>55+Math.floor(Math.random()*35); /* frames entre coups */

    /* ── Éclaboussures de sang — pré-générées ── */
    const splats=Array.from({length:22},(_,i)=>{
     const angle=Math.random()*Math.PI*2;
     const dist=(0.05+Math.random()*0.55)*DRUM_R;
     return {
      x:cx+Math.cos(angle)*dist,
      y:DRUM_CY+Math.sin(angle)*dist*0.85,
      r:Math.random()*W*0.014+W*0.004,
      alpha:0.75+Math.random()*0.25,
      elongX:0.8+Math.random()*0.6,
      elongY:0.5+Math.random()*0.8,
      rot:angle+Math.random()*0.8,
     };
    });
    /* Petites gouttes satellites */
    const droplets=Array.from({length:35},(_,i)=>{
     const angle=Math.random()*Math.PI*2;
     const dist=(0.10+Math.random()*0.85)*DRUM_R;
     return {
      x:cx+Math.cos(angle)*dist,
      y:DRUM_CY+Math.sin(angle)*dist*0.85,
      r:Math.random()*W*0.005+W*0.002,
      alpha:0.55+Math.random()*0.45,
     };
    });

    /* ── Gouttes qui tombent depuis les baguettes ── */
    const fallingDrops=Array.from({length:8},(_,i)=>({
     x:0,y:0, /* sera défini depuis l'extrémité des baguettes */
     vy:1.2+Math.random()*1.5,
     vx:(Math.random()-0.5)*0.8,
     life:Math.random(),
     maxLife:0.8+Math.random()*0.4,
     r:W*0.006+Math.random()*W*0.005,
     side:i%2, /* 0=baguette gauche, 1=baguette droite */
    }));

    /* ── Positions des baguettes ── */
    /* Baguette gauche : descend depuis bas-gauche, croise vers centre-haut */
    /* Baguette droite : descend depuis bas-droit, croise vers centre-haut */
    const STICK_L={
     x1:cx-DRUM_R*0.88, y1:DRUM_CY+DRUM_R*0.75,  /* extrémité basse */
     x2:cx+DRUM_R*0.12, y2:DRUM_CY-DRUM_R*0.35,   /* extrémité haute */
    };
    const STICK_R={
     x1:cx+DRUM_R*0.88, y1:DRUM_CY+DRUM_R*0.75,
     x2:cx-DRUM_R*0.12, y2:DRUM_CY-DRUM_R*0.35,
    };

    /* Init positions gouttes */
    for(const d of fallingDrops){
     const stick=d.side===0?STICK_L:STICK_R;
     d.x=stick.x1+(Math.random()-0.5)*W*0.03;
     d.y=stick.y1-DRUM_R*0.2+Math.random()*DRUM_R*0.3;
    }

    function drawDrum(vibration){
     /* ── HALO très subtil derrière la caisse ── */
     const hg=ctx.createRadialGradient(cx,DRUM_CY,DRUM_R*0.3,cx,DRUM_CY,DRUM_R*1.4);
     hg.addColorStop(0,`rgba(35,30,28,${0.18+vibration*0.08})`);
     hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.beginPath();ctx.arc(cx,DRUM_CY,DRUM_R*1.4,0,Math.PI*2);ctx.fill();

     /* ── CERCLAGE MÉTALLIQUE ── */
     /* Ombre portée du cerclage */
     ctx.shadowColor='rgba(0,0,0,0.8)';ctx.shadowBlur=12;
     const rimG=ctx.createRadialGradient(cx-DRUM_R*0.2,DRUM_CY-DRUM_R*0.2,DRUM_R*0.5,cx,DRUM_CY,DRUM_R+RIM_W);
     rimG.addColorStop(0,'rgba(168,168,168,1.0)');
     rimG.addColorStop(0.4,'rgba(138,138,138,1.0)');
     rimG.addColorStop(0.75,'rgba(105,105,105,1.0)');
     rimG.addColorStop(1,'rgba(85,85,85,1.0)');
     ctx.fillStyle=rimG;
     ctx.beginPath();ctx.arc(cx,DRUM_CY,DRUM_R+RIM_W,0,Math.PI*2);ctx.fill();
     ctx.shadowBlur=0;

     /* ── PEAU DE CAISSE — blanc cassé crème ── */
     const skinG=ctx.createRadialGradient(cx-DRUM_R*0.15,DRUM_CY-DRUM_R*0.18,5,cx,DRUM_CY,DRUM_R*1.05);
     skinG.addColorStop(0,'rgba(248,244,232,1.0)');
     skinG.addColorStop(0.5,'rgba(238,232,218,1.0)');
     skinG.addColorStop(0.85,'rgba(222,215,198,1.0)');
     skinG.addColorStop(1,'rgba(200,192,175,1.0)');
     ctx.fillStyle=skinG;
     ctx.beginPath();ctx.arc(cx,DRUM_CY,DRUM_R,0,Math.PI*2);ctx.fill();

     /* Légère texture de la peau — cercles concentriques très fins */
     ctx.strokeStyle='rgba(190,182,165,0.20)';ctx.lineWidth=0.6;
     for(let ri=1;ri<=5;ri++){
      ctx.beginPath();ctx.arc(cx,DRUM_CY,DRUM_R*ri/5.2,0,Math.PI*2);ctx.stroke();
     }

     /* ── LUGS (vis de tension) autour du cerclage ── */
     for(let i=0;i<LUG_COUNT;i++){
      const angle=(i/LUG_COUNT)*Math.PI*2-Math.PI/2;
      const lx=cx+Math.cos(angle)*(DRUM_R+RIM_W*0.55);
      const ly=DRUM_CY+Math.sin(angle)*(DRUM_R+RIM_W*0.55);
      /* Corps du lug */
      ctx.fillStyle='rgba(115,112,108,0.95)';
      ctx.save();ctx.translate(lx,ly);ctx.rotate(angle);
      ctx.beginPath();ctx.roundRect(-RIM_W*0.22,-RIM_W*0.48,RIM_W*0.44,RIM_W*0.96,2);ctx.fill();
      /* Reflet lug */
      ctx.fillStyle='rgba(188,185,180,0.55)';
      ctx.beginPath();ctx.roundRect(-RIM_W*0.12,-RIM_W*0.38,RIM_W*0.20,RIM_W*0.40,1);ctx.fill();
      ctx.restore();
     }
    }

    function drawBlood(vibration){
     /* ── ÉCLABOUSSURES principales ── */
     const pulse=1+vibration*0.04;
     for(const s of splats){
      ctx.fillStyle=`rgba(${175+Math.random()*15|0},${8+Math.random()*8|0},${5+Math.random()*5|0},${s.alpha})`;
      ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.rot);
      ctx.scale(pulse,pulse);
      ctx.beginPath();ctx.ellipse(0,0,s.r*s.elongX,s.r*s.elongY,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }
     /* ── PETITES GOUTTES SATELLITES ── */
     for(const d of droplets){
      ctx.fillStyle=`rgba(155,12,8,${d.alpha})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r*pulse,0,Math.PI*2);ctx.fill();
     }
    }

    function drawSticks(vibration){
     const vib=vibration*W*0.006; /* tremblement des baguettes */

     /* ── BAGUETTE GAUCHE ── */
     const lx1=STICK_L.x1+( Math.random()-0.5)*vib*2;
     const ly1=STICK_L.y1+( Math.random()-0.5)*vib;
     const lx2=STICK_L.x2+(Math.random()-0.5)*vib;
     const ly2=STICK_L.y2+(Math.random()-0.5)*vib*2;

     /* Corps bois naturel */
     const lg=ctx.createLinearGradient(lx1,ly1,lx2,ly2);
     lg.addColorStop(0,'rgba(185,125,55,1.0)');  /* extrémité basse — tachée de rouge */
     lg.addColorStop(0.25,'rgba(200,85,35,0.95)'); /* zone sanguin */
     lg.addColorStop(0.50,'rgba(188,138,72,1.0)');
     lg.addColorStop(1,'rgba(205,165,95,1.0)');   /* bout haut — bois propre */
     ctx.strokeStyle=lg;
     ctx.lineWidth=W*0.018;ctx.lineCap='round';ctx.lineJoin='round';
     ctx.beginPath();ctx.moveTo(lx1,ly1);ctx.lineTo(lx2,ly2);ctx.stroke();
     /* Reflet sur la baguette */
     ctx.strokeStyle='rgba(240,200,140,0.20)';ctx.lineWidth=W*0.005;
     ctx.beginPath();ctx.moveTo(lx1+W*0.006,ly1-W*0.003);ctx.lineTo(lx2+W*0.004,ly2-W*0.003);ctx.stroke();

     /* ── BAGUETTE DROITE ── */
     const rx1=STICK_R.x1+(Math.random()-0.5)*vib*2;
     const ry1=STICK_R.y1+(Math.random()-0.5)*vib;
     const rx2=STICK_R.x2+(Math.random()-0.5)*vib;
     const ry2=STICK_R.y2+(Math.random()-0.5)*vib*2;

     const rg=ctx.createLinearGradient(rx1,ry1,rx2,ry2);
     rg.addColorStop(0,'rgba(180,100,40,1.0)');
     rg.addColorStop(0.22,'rgba(195,70,30,0.95)');
     rg.addColorStop(0.50,'rgba(188,138,72,1.0)');
     rg.addColorStop(1,'rgba(205,165,95,1.0)');
     ctx.strokeStyle=rg;ctx.lineWidth=W*0.018;
     ctx.beginPath();ctx.moveTo(rx1,ry1);ctx.lineTo(rx2,ry2);ctx.stroke();
     ctx.strokeStyle='rgba(240,200,140,0.20)';ctx.lineWidth=W*0.005;
     ctx.beginPath();ctx.moveTo(rx1-W*0.006,ry1-W*0.003);ctx.lineTo(rx2-W*0.004,ry2-W*0.003);ctx.stroke();
    }

    function frame(){
     if(stop.v)return;

     /* ── Beat cycle ── */
     beatTimer--;
     if(beatTimer<=0){beatPhase=1.0;beatTimer=BEAT_INTERVAL();}
     beatPhase=Math.max(0,beatPhase-0.045);
     const vibration=beatPhase;

     /* ── FOND NOIR TOTAL ── */
     ctx.fillStyle='rgba(0,0,0,1.0)';ctx.fillRect(0,0,W,H);

     /* Flash d'impact */
     if(vibration>0.7){
      ctx.fillStyle=`rgba(200,20,10,${(vibration-0.7)*0.18})`;
      ctx.fillRect(0,0,W,H);
     }

     /* ── CAISSE ── */
     drawDrum(vibration);

     /* ── SANG ── */
     drawBlood(vibration);

     /* ── BAGUETTES (par-dessus le sang) ── */
     drawSticks(vibration);

     /* ── GOUTTES QUI TOMBENT des baguettes ── */
     for(const d of fallingDrops){
      d.y+=d.vy;d.x+=d.vx;d.life-=0.012;
      if(d.life<=0){
       const stick=d.side===0?STICK_L:STICK_R;
       d.x=stick.x1+(Math.random()-0.5)*W*0.04;
       d.y=stick.y1-DRUM_R*0.15;
       d.vy=1.2+Math.random()*1.5;
       d.vx=(Math.random()-0.5)*0.6;
       d.life=d.maxLife;
      }
      /* Seulement si hors de la caisse */
      const dx=d.x-cx,dy=d.y-DRUM_CY;
      if(dx*dx+dy*dy>DRUM_R*DRUM_R*0.95){
       const da=d.life/d.maxLife*0.75;
       ctx.fillStyle=`rgba(170,15,8,${da})`;
       ctx.beginPath();
       /* Forme légèrement allongée vers le bas = teardrop */
       ctx.ellipse(d.x,d.y,d.r,d.r*1.35,0,0,Math.PI*2);
       ctx.fill();
      }
     }

     /* ── VIGNETTE ── */
     const vg=ctx.createRadialGradient(cx,H*0.42,H*0.08,cx,H*0.42,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.18)');
     vg.addColorStop(1,'rgba(0,0,0,0.98)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
