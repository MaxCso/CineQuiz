// CinéQuiz splash chunk — La La Land
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["La La Land"]={
   name:'La La Land',
   color:'200,100,200',
   ref:'La La Land \u2014 Damien Chazelle, 2016',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2,cy=H/2;

    /* ── Surcharge CSS : citation + logo remontés dans le ciel ── */
    let _llStyle=document.getElementById('_ll_pos_s');
    if(!_llStyle){_llStyle=document.createElement('style');_llStyle.id='_ll_pos_s';document.head.appendChild(_llStyle);}
    _llStyle.textContent=`
      #splash-content-wrap{top:42%!important;}
    `;
    const _llW=setInterval(()=>{if(stop.v){_llStyle.textContent='';clearInterval(_llW);}},200);

    /* ── Étoiles ── */
    const stars=Array.from({length:110},()=>({
     x:Math.random()*W,y:Math.random()*H*0.58,
     r:Math.random()*1.8+0.3,op:Math.random()*0.7+0.2,
     phase:Math.random()*Math.PI*2,twinkle:Math.random()*0.04+0.01
    }));

    /* ── Notes de musique flottantes ── */
    const notes=['♩','♪','♫','♬'];
    const musicNotes=Array.from({length:14},()=>({
     x:Math.random()*W,y:Math.random()*H*0.75,
     vy:-(Math.random()*0.6+0.15),vx:(Math.random()-0.5)*0.25,
     note:notes[Math.floor(Math.random()*4)],
     size:Math.random()*10+7,op:Math.random()*0.30+0.08,
     hue:260+Math.random()*60,
     rot:(Math.random()-0.5)*0.4
    }));

    /* ── Skyline de L.A. ── */
    const buildings=[
     /* [x, y_sommet, largeur, hauteur depuis bas] */
     {x:0,      w:W*0.06,top:H*0.680,wins:2},
     {x:W*0.04, w:W*0.05,top:H*0.700,wins:1},
     {x:W*0.08, w:W*0.08,top:H*0.640,wins:3},
     {x:W*0.15, w:W*0.05,top:H*0.720,wins:2},
     {x:W*0.19, w:W*0.07,top:H*0.610,wins:3},
     {x:W*0.25, w:W*0.04,top:H*0.680,wins:1},
     {x:W*0.28, w:W*0.06,top:H*0.590,wins:2},
     {x:W*0.33, w:W*0.05,top:H*0.660,wins:2},
     /* Centre — bâtiments lointains plus petits */
     {x:W*0.37, w:W*0.04,top:H*0.710,wins:1},
     {x:W*0.40, w:W*0.05,top:H*0.690,wins:1},
     {x:W*0.44, w:W*0.04,top:H*0.720,wins:1},
     {x:W*0.47, w:W*0.05,top:H*0.700,wins:1},
     {x:W*0.51, w:W*0.04,top:H*0.715,wins:1},
     {x:W*0.54, w:W*0.06,top:H*0.680,wins:2},
     /* Droite */
     {x:W*0.60, w:W*0.05,top:H*0.650,wins:2},
     {x:W*0.64, w:W*0.07,top:H*0.600,wins:3},
     {x:W*0.70, w:W*0.05,top:H*0.670,wins:2},
     {x:W*0.74, w:W*0.08,top:H*0.620,wins:3},
     {x:W*0.81, w:W*0.05,top:H*0.700,wins:1},
     {x:W*0.85, w:W*0.07,top:H*0.640,wins:2},
     {x:W*0.91, w:W*0.05,top:H*0.710,wins:1},
     {x:W*0.95, w:W*0.05,top:H*0.680,wins:2},
    ];

    /* ── Lampadaire ── */
    const lampX=cx-W*0.18;
    const lampBaseY=H;
    const lampPostH=H*0.32;
    const lampHeadY=lampBaseY-lampPostH;

    function drawSky(){
     /* Ciel dégradé violet/magenta/indigo — coucher de soleil L.A. */
     const sky=ctx.createLinearGradient(0,0,0,H*0.72);
     sky.addColorStop(0,`rgba(${18+Math.sin(t*0.1)*3|0},8,${45+Math.sin(t*0.08)*5|0},0.92)`);
     sky.addColorStop(0.25,`rgba(${55+Math.sin(t*0.12)*6|0},15,${80+Math.sin(t*0.09)*8|0},0.85)`);
     sky.addColorStop(0.55,`rgba(${90+Math.sin(t*0.14)*8|0},25,${70+Math.sin(t*0.11)*6|0},0.70)`);
     sky.addColorStop(0.80,`rgba(${120+Math.sin(t*0.13)*6|0},40,${55+Math.sin(t*0.10)*5|0},0.45)`);
     sky.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.72);

     /* Lueur dorée/rose à l'horizon */
     const horiz=ctx.createLinearGradient(0,H*0.60,0,H*0.78);
     horiz.addColorStop(0,'rgba(0,0,0,0)');
     horiz.addColorStop(0.3,`rgba(${200+Math.sin(t*0.15)*10|0},${80+Math.sin(t*0.12)*8|0},30,${0.14+Math.sin(t*0.2)*0.03})`);
     horiz.addColorStop(0.65,`rgba(${160+Math.sin(t*0.18)*8|0},40,${100+Math.sin(t*0.13)*6|0},${0.10+Math.sin(t*0.16)*0.02})`);
     horiz.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=horiz;ctx.fillRect(0,H*0.60,W,H*0.18);

     /* Halo magenta large à gauche (style Chazelle) */
     const mg=ctx.createRadialGradient(W*0.2,H*0.45,0,W*0.2,H*0.45,W*0.55);
     mg.addColorStop(0,`rgba(160,30,120,${0.08+Math.sin(t*0.18)*0.02})`);
     mg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mg;ctx.fillRect(0,0,W,H);

     /* Halo violet à droite */
     const vio=ctx.createRadialGradient(W*0.8,H*0.38,0,W*0.8,H*0.38,W*0.45);
     vio.addColorStop(0,`rgba(80,20,160,${0.07+Math.sin(t*0.14)*0.02})`);
     vio.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vio;ctx.fillRect(0,0,W,H);
    }

    function drawSkyline(){
     /* Lueur de ville à l'horizon — halo ambré */
     const cityHalo=ctx.createLinearGradient(0,H*0.62,0,H*0.76);
     cityHalo.addColorStop(0,'rgba(0,0,0,0)');
     cityHalo.addColorStop(0.4,`rgba(180,100,20,${0.10+Math.sin(t*0.2)*0.02})`);
     cityHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cityHalo;ctx.fillRect(0,H*0.62,W,H*0.14);

     for(const b of buildings){
      const bH=H-b.top;
      /* Silhouette du bâtiment */
      ctx.fillStyle='rgba(4,2,10,0.96)';
      ctx.fillRect(b.x,b.top,b.w,bH);

      /* Fenêtres lumineuses */
      const cols=Math.max(1,Math.floor(b.w/8));
      const rows=Math.floor(bH/10);
      for(let r=1;r<rows-1;r++) for(let c=0;c<cols;c++){
       if(Math.sin(b.x*0.3+r*c*1.7+t*0.05)>0.15){
        const wx=b.x+c*(b.w/cols)+2;
        const wy=b.top+r*10+2;
        const wp=0.5+Math.sin(t*0.3+r+c*0.7)*0.15;
        ctx.fillStyle=`rgba(255,${180+Math.sin(r*c)*20|0},60,${0.35*wp})`;
        ctx.fillRect(wx,wy,Math.max(2,b.w/cols-3),4);
       }
      }
     }

     /* Sol / route */
     const road=ctx.createLinearGradient(0,H*0.76,0,H);
     road.addColorStop(0,'rgba(6,3,14,0.95)');
     road.addColorStop(1,'rgba(3,1,8,0.99)');
     ctx.fillStyle=road;ctx.fillRect(0,H*0.76,W,H*0.24);
    }

    function drawLamppost(){
     /* Halo au sol */
     const groundHalo=ctx.createRadialGradient(lampX,lampBaseY,0,lampX,lampBaseY,W*0.18);
     groundHalo.addColorStop(0,`rgba(255,210,80,${0.09+Math.sin(t*0.6)*0.02})`);
     groundHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=groundHalo;ctx.fillRect(lampX-W*0.2,H*0.78,W*0.4,H*0.22);

     /* Halo de tête de lampe */
     const headHalo=ctx.createRadialGradient(lampX,lampHeadY,0,lampX,lampHeadY,W*0.22);
     headHalo.addColorStop(0,`rgba(255,220,100,${0.18+Math.sin(t*0.5)*0.05})`);
     headHalo.addColorStop(0.3,`rgba(255,180,60,${0.06+Math.sin(t*0.4)*0.02})`);
     headHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=headHalo;ctx.fillRect(lampX-W*0.25,lampHeadY-W*0.22,W*0.5,W*0.44);

     /* Poteau */
     ctx.strokeStyle='rgba(30,22,45,0.95)';ctx.lineWidth=3.5;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(lampX,lampBaseY);ctx.lineTo(lampX,lampHeadY+14);ctx.stroke();

     /* Bras courbé */
     ctx.strokeStyle='rgba(28,20,42,0.95)';ctx.lineWidth=2.8;
     ctx.beginPath();
     ctx.moveTo(lampX,lampHeadY+14);
     ctx.bezierCurveTo(lampX,lampHeadY+2,lampX+22,lampHeadY-4,lampX+28,lampHeadY-6);
     ctx.stroke();

     /* Tête de lampe */
     ctx.fillStyle='rgba(22,16,35,0.97)';
     ctx.beginPath();ctx.ellipse(lampX+28,lampHeadY-6,10,5,0.3,0,Math.PI*2);ctx.fill();

     /* Ampoule */
     const bulbPulse=0.85+Math.sin(t*0.7)*0.15;
     ctx.fillStyle=`rgba(255,240,160,${0.9*bulbPulse})`;
     ctx.beginPath();ctx.arc(lampX+28,lampHeadY-6,3,0,Math.PI*2);ctx.fill();

     /* Rayon de lumière conique vers le bas */
     const cone=ctx.createLinearGradient(lampX+28,lampHeadY,lampX+28,lampHeadY+H*0.18);
     cone.addColorStop(0,`rgba(255,220,100,${0.10*bulbPulse})`);
     cone.addColorStop(1,'rgba(255,200,80,0)');
     ctx.fillStyle=cone;
     ctx.beginPath();
     ctx.moveTo(lampX+28,lampHeadY);
     ctx.lineTo(lampX+28-W*0.08,lampHeadY+H*0.18);
     ctx.lineTo(lampX+28+W*0.08,lampHeadY+H*0.18);
     ctx.closePath();ctx.fill();
    }

    let dancePhase=0;
    function drawDancers(){
     dancePhase+=0.025;
     const d1x=cx+W*0.08+Math.sin(dancePhase)*9;
     const d2x=cx+W*0.20-Math.sin(dancePhase)*9;
     const dy=H*0.80+Math.sin(dancePhase*2)*5;

     [[d1x,dy,-1],[d2x,dy,1]].forEach(([sx,sy,dir])=>{
      ctx.save();ctx.globalAlpha=0.75;
      /* Corps */
      ctx.fillStyle='rgba(8,4,18,0.92)';
      ctx.beginPath();ctx.ellipse(sx,sy-22,5,7,Math.sin(dancePhase)*0.2*dir,0,Math.PI*2);ctx.fill();
      ctx.save();ctx.translate(sx,sy);ctx.rotate(Math.sin(dancePhase)*0.1*dir);
      ctx.fillRect(-5,-12,10,18);ctx.restore();
      /* Bras */
      ctx.strokeStyle='rgba(8,4,18,0.88)';ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(sx-4,sy-6);ctx.lineTo(sx-16+Math.sin(dancePhase+dir)*8,sy-16+Math.cos(dancePhase)*5);ctx.stroke();
      ctx.beginPath();ctx.moveTo(sx+4,sy-6);ctx.lineTo(sx+16-Math.sin(dancePhase+dir)*8,sy-16+Math.cos(dancePhase+0.5)*5);ctx.stroke();
      /* Halo coloré autour des danseurs */
      const dg=ctx.createRadialGradient(sx,sy-10,0,sx,sy-10,32);
      dg.addColorStop(0,`rgba(${dir>0?180:120},${dir>0?60:40},${dir>0?220:180},0.07)`);
      dg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.globalAlpha=1;ctx.fillStyle=dg;ctx.fillRect(sx-35,sy-45,70,70);
      ctx.restore();
     });
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(2,1,8,0.14)';ctx.fillRect(0,0,W,H);
     t+=0.016;

     drawSky();
     drawSkyline();
     drawLamppost();

     /* Étoiles */
     for(const s of stars){
      s.phase+=s.twinkle;
      const pulse=1+Math.sin(s.phase)*0.35;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*pulse,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,240,210,${s.op*pulse})`;ctx.fill();
     }

     /* Notes musicales */
     for(const n of musicNotes){
      n.x+=n.vx;n.y+=n.vy;
      if(n.y<-20){n.y=H*0.80+Math.random()*H*0.15;n.x=Math.random()*W;}
      ctx.save();ctx.translate(n.x,n.y);ctx.rotate(n.rot);
      ctx.font=`${n.size}px serif`;
      ctx.fillStyle=`hsla(${n.hue},65%,72%,${n.op})`;
      ctx.fillText(n.note,0,0);
      ctx.restore();
     }

     drawDancers();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,cy,H*0.08,cx,cy,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(2,0,8,0.18)');
     vg.addColorStop(1,'rgba(3,1,10,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
