// CinéQuiz splash chunk — Aftersun
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Aftersun"]={
   name:'Aftersun',
   color:'60,160,200',
   ref:'Aftersun \u2014 Charlotte Wells, 2022',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond plein écran — plus de bandes noires ── */
    let _asStyle=document.getElementById('_as_splash_style');
    if(!_asStyle){_asStyle=document.createElement('style');_asStyle.id='_as_splash_style';document.head.appendChild(_asStyle);}
    _asStyle.textContent=`
      
      
      
      
      
      #splash-canvas{width:100%!important;height:100%!important;left:0!important;right:0!important;}
    `;
    const _asWatch=setInterval(()=>{if(stop.v){_asStyle.textContent='';clearInterval(_asWatch);}},200);

    /* ── Vagues — ondulation douce par variation de teinte ── */
    const waveRows=Array.from({length:6},(_,i)=>({
     phase:Math.random()*Math.PI*2,
     spd:0.006+Math.random()*0.008,
     amp:H*(0.0012+Math.random()*0.0016),
     offsetY:i*(H*0.032),
     alpha:0.045+Math.random()*0.045,
     freq:0.014+Math.random()*0.010,
    }));

    /* ── Oiseaux ── */
    const birds=Array.from({length:12},(_,i)=>({
     x:Math.random()*W*1.4-W*0.2,
     y:H*(0.06+Math.random()*0.28),
     vx:0.25+Math.random()*0.45,
     phase:Math.random()*Math.PI*2,
     size:Math.random()*2.2+1.0,
     flapSpd:0.04+Math.random()*0.03,
     layer:Math.random(),      /* profondeur — opacité */
    }));

    /* ── Silhouettes ── */
    let bobT=0;

    function drawIslands(seaY){
     /* Île gauche */
     ctx.fillStyle='rgba(50,82,62,0.90)';
     ctx.beginPath();
     ctx.moveTo(-W*0.02,seaY+4);
     ctx.bezierCurveTo(W*0.02,seaY-H*0.060, W*0.10,seaY-H*0.082, W*0.17,seaY-H*0.065);
     ctx.bezierCurveTo(W*0.23,seaY-H*0.048, W*0.27,seaY-H*0.022, W*0.30,seaY+4);
     ctx.closePath();ctx.fill();
     /* Relief sombre */
     ctx.fillStyle='rgba(32,58,44,0.50)';
     ctx.beginPath();
     ctx.moveTo(W*0.05,seaY-H*0.042);
     ctx.bezierCurveTo(W*0.09,seaY-H*0.072, W*0.13,seaY-H*0.076, W*0.17,seaY-H*0.060);
     ctx.bezierCurveTo(W*0.13,seaY-H*0.062, W*0.09,seaY-H*0.054, W*0.05,seaY-H*0.042);
     ctx.closePath();ctx.fill();

     /* Île droite */
     ctx.fillStyle='rgba(50,82,62,0.80)';
     ctx.beginPath();
     ctx.moveTo(W*0.70,seaY+4);
     ctx.bezierCurveTo(W*0.73,seaY-H*0.034, W*0.80,seaY-H*0.048, W*0.87,seaY-H*0.030);
     ctx.bezierCurveTo(W*0.92,seaY-H*0.016, W*0.97,seaY-H*0.004, W*1.02,seaY+4);
     ctx.closePath();ctx.fill();
     /* Relief île droite */
     ctx.fillStyle='rgba(32,58,44,0.40)';
     ctx.beginPath();
     ctx.moveTo(W*0.76,seaY-H*0.020);
     ctx.bezierCurveTo(W*0.80,seaY-H*0.042, W*0.84,seaY-H*0.044, W*0.87,seaY-H*0.028);
     ctx.bezierCurveTo(W*0.84,seaY-H*0.032, W*0.80,seaY-H*0.028, W*0.76,seaY-H*0.020);
     ctx.closePath();ctx.fill();
    }

    function drawFigures(seaY){
     bobT+=0.018;
     const bob=Math.sin(bobT)*H*0.003;
     const fx=cx-W*0.08, fy=seaY-H*0.010+bob;
     const s=W*0.013;

     ctx.fillStyle='rgba(38,52,68,0.82)';
     /* Adulte */
     ctx.beginPath();ctx.ellipse(fx,fy-s*1.2,s*0.55,s*0.55,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.roundRect(fx-s*0.5,fy-s*0.9,s,s*1.4,s*0.2);ctx.fill();
     /* Enfant */
     const fx2=fx+s*1.9;
     ctx.beginPath();ctx.ellipse(fx2,fy-s*0.85,s*0.42,s*0.42,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.roundRect(fx2-s*0.38,fy-s*0.65,s*0.76,s*1.0,s*0.15);ctx.fill();
     /* Matelas gonflable */
     ctx.fillStyle='rgba(75,105,135,0.50)';
     ctx.beginPath();ctx.ellipse(fx+s*0.85,fy+s*0.62,s*2.1,s*0.36,0,0,Math.PI*2);ctx.fill();
    }

    function frame(){
     if(stop.v)return;

     /* ── Ciel — dégradé riche, lumière de fin d'après-midi ── */
     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0.00,'#4e90b8');   /* bleu profond en haut */
     sky.addColorStop(0.18,'#5ea0c5');
     sky.addColorStop(0.38,'#72b4d0');
     sky.addColorStop(0.55,'#88c4d8');
     sky.addColorStop(0.70,'#9ecdd8');   /* bleu-vert pâle vers l'horizon */
     sky.addColorStop(0.80,'#b4d4d6');
     sky.addColorStop(0.88,'#c8dcd8');   /* horizon légèrement rosé-blanc */
     sky.addColorStop(1.00,'#d2ddd6');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

     /* ── Légère chaleur dorée à l'horizon ── */
     const haze=ctx.createLinearGradient(0,H*0.65,0,H*0.82);
     haze.addColorStop(0,'rgba(255,220,160,0)');
     haze.addColorStop(0.5,`rgba(255,215,150,${0.08+Math.sin(t*0.2)*0.015})`);
     haze.addColorStop(1,'rgba(255,220,160,0)');
     ctx.fillStyle=haze;ctx.fillRect(0,H*0.65,W,H*0.17);

     /* ── Oiseaux ── */
     for(const b of birds){
      b.x+=b.vx*(0.5+b.layer*0.7);
      b.phase+=b.flapSpd;
      if(b.x>W+40) b.x=-40;
      const flap=Math.sin(b.phase);
      const bw=b.size*3.2*Math.max(0.15,Math.abs(flap));
      const by2=b.y-Math.abs(flap)*b.size*0.6; /* légère montée au battement */
      const op=0.22+b.layer*0.38;
      ctx.save();
      ctx.translate(b.x,by2);
      ctx.strokeStyle=`rgba(45,75,95,${op})`;
      ctx.lineWidth=b.size*0.55;ctx.lineCap='round';
      /* Aile gauche */
      ctx.beginPath();ctx.moveTo(-bw,flap>0?-b.size*0.3:b.size*0.1);ctx.lineTo(0,0);ctx.stroke();
      /* Aile droite */
      ctx.beginPath();ctx.moveTo(bw,flap>0?-b.size*0.3:b.size*0.1);ctx.lineTo(0,0);ctx.stroke();
      ctx.restore();
     }

     /* ── Mer ── */
     const seaY=H*0.800;
     const sea=ctx.createLinearGradient(0,seaY,0,H);
     sea.addColorStop(0,'rgba(68,148,158,0.96)');
     sea.addColorStop(0.20,'rgba(55,132,144,0.97)');
     sea.addColorStop(0.50,'rgba(44,118,130,0.98)');
     sea.addColorStop(0.80,'rgba(36,105,118,0.99)');
     sea.addColorStop(1,'rgba(28,92,106,1.0)');
     ctx.fillStyle=sea;ctx.fillRect(0,seaY,W,H-seaY);

     /* ── Vagues — ondulation douce par bandes de teinte ── */
     for(const w of waveRows){
      w.phase+=w.spd;
      const wy=seaY+w.offsetY;
      /* Gradient vertical fin — légèrement plus clair sur la crête */
      const wg=ctx.createLinearGradient(0,wy-w.amp*2,0,wy+w.amp*2);
      wg.addColorStop(0,'rgba(0,0,0,0)');
      wg.addColorStop(0.5,`rgba(110,175,185,${w.alpha})`);
      wg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wg;
      ctx.beginPath();
      ctx.moveTo(0,wy+w.amp*2);
      for(let xi=0;xi<=W;xi+=6){
       const wyy=wy+Math.sin(xi*w.freq+w.phase)*w.amp+Math.sin(xi*w.freq*1.6-w.phase*0.7)*w.amp*0.3;
       ctx.lineTo(xi,wyy);
      }
      ctx.lineTo(W,wy+w.amp*2);
      ctx.closePath();
      ctx.fill();
     }

     /* ── Lueur solaire diffuse sur l'eau — un seul reflet doux ── */
     const sunRefl=ctx.createRadialGradient(cx*0.6,seaY+H*0.06,0,cx*0.6,seaY+H*0.06,W*0.28);
     sunRefl.addColorStop(0,`rgba(190,225,230,${0.06+Math.sin(t*0.25)*0.02})`);
     sunRefl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunRefl;
     ctx.fillRect(0,seaY,W,H-seaY);

     /* ── Îles ── */
     drawIslands(seaY+2);

     /* ── Deux silhouettes ── */
     drawFigures(seaY);

     /* ── Grain argentique ── */
     for(let i=0;i<480;i++){
      const gx=Math.random()*W, gy=Math.random()*H;
      const gs=Math.random()>0.5?1:0.5;
      ctx.fillStyle=`rgba(180,190,195,${Math.random()*0.048})`;
      ctx.fillRect(gx,gy,gs,gs);
     }

     /* ── Vignette douce — centré, pas sur les côtés ── */
     const vg=ctx.createRadialGradient(cx,H*0.42,H*0.22,cx,H*0.42,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.65,'rgba(0,0,0,0.03)');
     vg.addColorStop(1,'rgba(0,0,0,0.28)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
