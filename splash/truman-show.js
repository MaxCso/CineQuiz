// CinéQuiz splash chunk — Truman Show
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Truman Show"]={
   name:'Truman Show',
   color:'80,160,220',
   ref:'The Truman Show \u2014 Peter Weir, 1998',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Masque les orbes du splash ── */
    let _tsStyle=document.getElementById('_tshow_splash_style');
    if(!_tsStyle){_tsStyle=document.createElement('style');_tsStyle.id='_tshow_splash_style';document.head.appendChild(_tsStyle);}
    _tsStyle.textContent='#splash-bg,#splash-bg-anim{opacity:0!important;}#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _tsWatch=setInterval(()=>{if(stop.v){_tsStyle.textContent='';clearInterval(_tsWatch);}},200);

    /* ══ IMAGE DE FOND ══ */
    const bg=new Image();
    bg.src='images/Truman.png';
    let bgReady=false;
    bg.onload=()=>{bgReady=true;};

    /* ══ NUAGES qui dérivent (overlays semi-transparents) ══ */
    /* Quelques ellipses floues qui traversent lentement le ciel */
    const clouds=Array.from({length:5},(_,i)=>({
     x:Math.random()*W*1.4-W*0.2,
     y:H*(0.04+i*0.06+Math.random()*0.04),
     w:W*(0.28+Math.random()*0.22),
     h:H*(0.04+Math.random()*0.03),
     spd:0.12+Math.random()*0.10,   /* très lent */
     op:0.06+Math.random()*0.08     /* très subtil — on ne veut pas couvrir l'image */
    }));

    /* ══ ONDULATIONS sur l'eau (bas d'image, ~55% vers le bas) ══ */
    /* Série de demi-ellipses concentriques qui s'expandent et s'estompent */
    const RIPPLE_COUNT=5;
    const ripples=Array.from({length:RIPPLE_COUNT},(_,i)=>({
     cx:W*(0.25+Math.random()*0.5),
     cy:H*(0.72+Math.random()*0.15),
     r:Math.random()*W*0.08,       /* rayon de départ décalé */
     maxR:W*(0.18+Math.random()*0.14),
     spd:0.30+Math.random()*0.25,
     op:0.0
    }));
    /* Décaler les phases pour qu'elles ne démarrent pas toutes ensemble */
    ripples.forEach((r,i)=>{r.r=r.maxR*(i/RIPPLE_COUNT);});

    /* ══ PARTICULES DE STUDIO (poussière de projecteur) ══ */
    const dust=Array.from({length:35},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.55,   /* seulement dans la moitié ciel */
     r:0.5+Math.random()*1.2,
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.04+Math.random()*0.12),
     op:0.08+Math.random()*0.28,
     ph:Math.random()*Math.PI*2,
     col:'200,230,255'          /* teinte bleu ciel clair */
    }));

    /* ══ SCAN LINE TV ══ */
    let scanY=0;

    function frame(){
     if(stop.v)return;

     /* ── Fond image Truman.png — cover ── */
     if(bgReady){
      const iw=bg.naturalWidth,ih=bg.naturalHeight;
      const scale=Math.max(W/iw,H/ih);
      const dw=iw*scale,dh=ih*scale;
      ctx.drawImage(bg,(W-dw)/2,(H-dh)/2,dw,dh);
     } else {
      ctx.fillStyle='#4a90d9';
      ctx.fillRect(0,0,W,H);
     }

     /* ── Nuages qui dérivent ── */
     /* Dessinés en mode 'screen' pour s'intégrer au ciel sans le couvrir */
     ctx.save();
     ctx.globalCompositeOperation='screen';
     for(const c of clouds){
      c.x-=c.spd;
      if(c.x+c.w<0) c.x=W+c.w*0.3;
      const cg=ctx.createRadialGradient(c.x+c.w/2,c.y+c.h/2,0,c.x+c.w/2,c.y+c.h/2,c.w/2);
      cg.addColorStop(0,`rgba(255,255,255,${c.op})`);
      cg.addColorStop(0.5,`rgba(240,248,255,${c.op*0.5})`);
      cg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.ellipse(c.x+c.w/2,c.y+c.h/2,c.w/2,c.h/2,0,0,Math.PI*2);ctx.fill();
     }
     ctx.restore();

     /* ── Ondulations sur l'eau ── */
     ctx.save();
     /* On clippe sur la moitié basse — la partie "eau" de l'image */
     ctx.beginPath();ctx.rect(0,H*0.54,W,H*0.46);ctx.clip();
     for(const rp of ripples){
      rp.r+=rp.spd;
      rp.op=Math.max(0, 0.22*(1-rp.r/rp.maxR));
      if(rp.r>=rp.maxR){
       rp.r=0;
       rp.cx=W*(0.12+Math.random()*0.76);
       rp.cy=H*(0.70+Math.random()*0.18);
      }
      ctx.strokeStyle=`rgba(180,215,240,${rp.op})`;
      ctx.lineWidth=0.8;
      ctx.beginPath();
      /* Demi-ellipse seulement (aplatie horizontalement = reflet dans l'eau) */
      ctx.ellipse(rp.cx,rp.cy,rp.r,rp.r*0.32,0,Math.PI,0);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(rp.cx,rp.cy,rp.r,rp.r*0.32,0,0,Math.PI);
      ctx.stroke();
     }
     ctx.restore();

     /* ── Particules de poussière / lumière de studio ── */
     for(const d of dust){
      d.x+=d.vx; d.y+=d.vy; d.ph+=0.020;
      if(d.y<0){d.y=H*0.55;d.x=Math.random()*W;}
      if(d.x<0)d.x=W; if(d.x>W)d.x=0;
      const pop=d.op*(0.35+0.65*Math.abs(Math.sin(d.ph)));
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${d.col},${pop})`;ctx.fill();
     }

     /* ── Scan line TV (très subtil, rappelle l'écran de télé) ── */
     scanY=(scanY+0.5)%H;
     const slg=ctx.createLinearGradient(0,scanY-5,0,scanY+5);
     slg.addColorStop(0,'rgba(255,255,255,0)');
     slg.addColorStop(0.5,'rgba(255,255,255,0.025)');
     slg.addColorStop(1,'rgba(255,255,255,0)');
     ctx.fillStyle=slg;ctx.fillRect(0,scanY-5,W,10);
     /* Trame TV fine — 1px sur 3 */
     ctx.fillStyle='rgba(0,0,0,0.04)';
     for(let y=0;y<H;y+=3)ctx.fillRect(0,y,W,1);

     /* ── Vignette TV — coins arrondis sombres ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.12,cx,H*0.50,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.06)');
     vg.addColorStop(0.80,'rgba(0,0,20,0.38)');
     vg.addColorStop(1,'rgba(0,0,20,0.75)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
