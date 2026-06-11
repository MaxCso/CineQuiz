// CinéQuiz splash chunk — Eyes Wide Shut
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Eyes Wide Shut"]={
   name:'Eyes Wide Shut',
   color:'180,140,60',
   ref:'Eyes Wide Shut \u2014 Stanley Kubrick, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Fond noir absolu — annule tous les orbes par défaut ── */
    let _ewStyle=document.getElementById('_ews_splash_style');
    if(!_ewStyle){_ewStyle=document.createElement('style');_ewStyle.id='_ews_splash_style';document.head.appendChild(_ewStyle);}
    _ewStyle.textContent=`
      

    `;
    const _ewWatch=setInterval(()=>{if(stop.v){_ewStyle.textContent='';clearInterval(_ewWatch);}},200);

    /* ── Citation remontée sous logo CinéQuiz ── */
    let _ewPos=document.getElementById('_ews_pos_s');
    if(!_ewPos){_ewPos=document.createElement('style');_ewPos.id='_ews_pos_s';document.head.appendChild(_ewPos);}
    _ewPos.textContent='#splash-content-wrap{top:24%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:rgba(255,255,255,0.88)!important;text-shadow:0 0 18px rgba(255,255,255,0.18)!important;}';
    const _ewPosW=setInterval(()=>{if(stop.v){_ewPos.textContent='';clearInterval(_ewPosW);}},200);

    /* ── Chargement SVG œil ── */
    let eyeReady=false, eyeAlpha=0;
    const eyeImg=new Image();
    eyeImg.onload=()=>{eyeReady=true;};
    eyeImg.src='images/sprite_35.svg';

    /* ── Dimensions de l'œil ── */
    /* On lui donne ~88% de la largeur, centré verticalement dans la partie basse */
    const eyeW=W*0.88;
    const eyeH=eyeW/1.4913294797687862;
    const eyeX=cx-eyeW/2;
    const eyeY=H*0.53;  /* bord haut de l'image, l'œil tombe dans la zone 53%–80% */

    /* Centre géométrique de la pupille dans le SVG : ~cx, ~40% de la hauteur */
    const pupilCX=cx;
    const pupilCY=eyeY+eyeH*0.40;

    /* ── Particules de poussière blanche ── */
    const dust=Array.from({length:180},(_,i)=>({
     x:Math.random()*W, y:i<100 ? Math.random()*H*0.55 : Math.random()*H,
     r:Math.random()*1.5+0.10,
     vx:(Math.random()-0.5)*0.20,
     vy:-(Math.random()*0.20+0.02),
     op:Math.random()*0.35+0.04,
     phase:Math.random()*Math.PI*2,
     drift:(Math.random()-0.5)*0.30
    }));

    /* ── Scintillements (éclats lumineux ponctuels) ── */
    const sparkles=Array.from({length:22},()=>({
     x:Math.random()*W, y:Math.random()*H,
     life:Math.random(), speed:0.003+Math.random()*0.007,
     size:Math.random()*2.0+0.4, phase:Math.random()*Math.PI*2
    }));

    /* ── Ondulation de lumière autour de la pupille ── supprimée ── */
    const rings=[];

    /* ── Rectangles violets Old Boy — même animation, superposée ── */
    const ants=Array.from({length:60},()=>({x:Math.random()*W,y:Math.random()*H,angle:Math.random()*Math.PI*2,spd:0.35+Math.random()*0.45,size:W*(0.006+Math.random()*0.008),op:0.20+Math.random()*0.35,turn:(Math.random()-0.5)*0.12}));

    let breathT=0;

    function frame(){
     if(stop.v)return;
     breathT+=0.016;

     /* ── Fond noir — trail léger pour les animations ── */
     ctx.fillStyle='rgba(0,0,0,0.94)';
     ctx.fillRect(0,0,W,H);

     /* ── Halo rouge sombre pulsé derrière l'œil ── */
     const redPulse=0.18+Math.sin(breathT*0.55)*0.06;
     const haloRed=ctx.createRadialGradient(cx,pupilCY,W*0.04,cx,pupilCY,W*0.62);
     haloRed.addColorStop(0,`rgba(38,0,0,${redPulse})`);
     haloRed.addColorStop(0.45,`rgba(16,0,0,${redPulse*0.45})`);
     haloRed.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=haloRed;
     ctx.fillRect(0,0,W,H);

     /* ── Halo blanc très doux sur la pupille ── */
     const whitePulse=0.07+Math.sin(breathT*0.9)*0.025;
     const haloWhite=ctx.createRadialGradient(pupilCX,pupilCY,3,pupilCX,pupilCY,W*0.12);
     haloWhite.addColorStop(0,`rgba(255,255,255,${whitePulse})`);
     haloWhite.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=haloWhite;
     ctx.fillRect(0,0,W,H);

     /* ── Ondulations concentriques autour de la pupille ── */
     for(const ring of rings){
      ring.phase+=ring.speed;
      const rLife=(Math.sin(ring.phase)+1)/2; /* 0→1→0 */
      const rRadius=W*(0.06+rLife*0.28);
      const rAlpha=(1-rLife)*0.12;
      ctx.strokeStyle=`rgba(255,255,255,${rAlpha})`;
      ctx.lineWidth=1.2;
      ctx.beginPath();
      ctx.ellipse(pupilCX,pupilCY,rRadius,rRadius*0.55,0,0,Math.PI*2);
      ctx.stroke();
     }

     /* ── SVG Œil avec légère respiration ── */
     if(eyeReady){
      eyeAlpha=Math.min(1,eyeAlpha+0.006);
      const breath=1+Math.sin(breathT*0.45)*0.004;
      ctx.save();
      ctx.globalAlpha=eyeAlpha;
      ctx.translate(cx,pupilCY);
      ctx.scale(breath,breath);
      ctx.translate(-cx,-pupilCY);
      ctx.drawImage(eyeImg,eyeX,eyeY,eyeW,eyeH);
      ctx.restore();
     }

     /* ── Poussière blanche montante ── */
     for(const p of dust){
      p.x+=p.vx+Math.sin(breathT*0.6+p.phase)*p.drift;
      p.y+=p.vy;
      p.phase+=0.016;
      if(p.y<-6){p.y=H+6;p.x=Math.random()*W;}
      if(p.x<-5)p.x=W+5; if(p.x>W+5)p.x=-5;
      const pa=p.op*(0.55+0.45*Math.sin(p.phase));
      ctx.fillStyle=`rgba(255,255,255,${pa})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Scintillements ── */
     for(const sp of sparkles){
      sp.life+=sp.speed;
      if(sp.life>1){sp.life=0;sp.x=Math.random()*W;sp.y=Math.random()*H;sp.size=Math.random()*2.0+0.4;}
      const sa=Math.sin(sp.life*Math.PI)*0.50;
      ctx.fillStyle=`rgba(255,255,255,${sa})`;
      ctx.beginPath();ctx.arc(sp.x,sp.y,sp.size,0,Math.PI*2);ctx.fill();
      if(sp.size>1.4){
       ctx.strokeStyle=`rgba(255,255,255,${sa*0.4})`;
       ctx.lineWidth=0.6;ctx.lineCap='round';
       ctx.beginPath();
       ctx.moveTo(sp.x-sp.size*2.8,sp.y);ctx.lineTo(sp.x+sp.size*2.8,sp.y);
       ctx.moveTo(sp.x,sp.y-sp.size*2.8);ctx.lineTo(sp.x,sp.y+sp.size*2.8);
       ctx.stroke();
      }
     }

     /* ── Rectangles violets (Old Boy) ── */
     for(const a of ants){a.angle+=a.turn;a.x+=Math.cos(a.angle)*a.spd;a.y+=Math.sin(a.angle)*a.spd;if(a.x<0)a.x=W;if(a.x>W)a.x=0;if(a.y<0)a.y=H;if(a.y>H)a.y=0;
      ctx.save();ctx.translate(a.x,a.y);ctx.rotate(a.angle);ctx.globalAlpha=a.op;ctx.fillStyle='rgba(80,40,110,0.85)';ctx.fillRect(-a.size*2,-a.size*0.5,a.size*4,a.size);ctx.restore();}

     /* ── Grain pellicule ── */
     for(let gi=0;gi<50;gi++){
      const g=180+Math.random()*75|0;
      ctx.fillStyle=`rgba(${g},${g},${g},${Math.random()*0.018})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.8+0.2,1);
     }

     /* ── Vignette noire — coins très sombres ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.05,cx,H*0.50,H*0.95);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(0,0,0,0.14)');
     vg.addColorStop(0.68,'rgba(0,0,0,0.60)');
     vg.addColorStop(1,'rgba(0,0,0,0.97)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
