// CinéQuiz splash chunk — Dirty Dancing
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Dirty Dancing"]={
   name:'Dirty Dancing',
   color:'200,80,120',
   ref:'Dirty Dancing \u2014 Emile Ardolino, 1987',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : rose vif du poster ── */
    let _ddStyle=document.getElementById('_dd_splash_style');
    if(!_ddStyle){_ddStyle=document.createElement('style');_ddStyle.id='_dd_splash_style';document.head.appendChild(_ddStyle);}
    _ddStyle.textContent=`
      
      
      

    `;
    const _ddWatch=setInterval(()=>{if(stop.v){_ddStyle.textContent='';clearInterval(_ddWatch);}},200);

    /* ── SVG danseurs → Image ── */
    const DD_SVG='images/sprite_42.svg';
    const ddImg=new Image();let ddReady=false;
    ddImg.onload=()=>{ddReady=true;};ddImg.src=DD_SVG;

    /* ── Dimensions du SVG original : 148 × 264 ── */
    const SVG_W=148,SVG_H=264;
    /* Hauteur cible : 72% de l'écran */
    const dstH=H*0.72;
    const dstW=dstH*(SVG_W/SVG_H);
    const dstX=cx-dstW/2;
    const dstY=H*0.16;

    /* ── Notes de musique qui flottent ── */
    const NOTES=['♪','♫','♩','♬','♭','♮'];
    const notes=Array.from({length:22},()=>({
     x:W*0.05+Math.random()*W*0.90,
     y:H*0.10+Math.random()*H*0.80,
     vy:-(0.25+Math.random()*0.45),
     vx:(Math.random()-0.5)*0.18,
     op:0.20+Math.random()*0.35,
     size:W*(0.040+Math.random()*0.038),
     note:NOTES[Math.floor(Math.random()*NOTES.length)],
     phase:Math.random()*Math.PI*2,
     wobble:Math.random()*Math.PI*2,
    }));

    /* ── Particules brillantes (paillettes de danse) ── */
    const glitters=Array.from({length:30},()=>({
     x:Math.random()*W,y:Math.random()*H,
     r:Math.random()*2.2+0.5,
     op:Math.random()*0.55+0.10,
     phase:Math.random()*Math.PI*2,
     spd:0.04+Math.random()*0.06,
    }));

    /* ── Oscillation lente des danseurs ── */
    let breathT=0;

    function frame(){
     if(stop.v)return;

     /* Fond rose vif dégradé */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#f050b0');
     bg.addColorStop(0.50,'#e8409a');
     bg.addColorStop(1.00,'#c02080');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo central derrière les danseurs */
     const halo=ctx.createRadialGradient(cx,H*0.52,0,cx,H*0.52,W*0.55);
     halo.addColorStop(0,'rgba(255,200,230,0.18)');
     halo.addColorStop(0.55,'rgba(255,120,180,0.06)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

     /* Notes de musique */
     ctx.textBaseline='middle';ctx.textAlign='center';
     for(const n of notes){
      n.y+=n.vy;n.x+=n.vx;n.phase+=0.022;n.wobble+=0.015;
      n.x+=Math.sin(n.wobble)*0.20;
      if(n.y<-40){n.y=H+20;n.x=W*0.05+Math.random()*W*0.90;n.note=NOTES[Math.floor(Math.random()*NOTES.length)];}
      ctx.font=`${n.size}px serif`;
      ctx.globalAlpha=n.op*(0.6+0.4*Math.sin(n.phase));
      ctx.fillStyle='rgba(255,255,255,1)';
      ctx.fillText(n.note,n.x,n.y);
     }
     ctx.globalAlpha=1;

     /* Paillettes scintillantes */
     for(const g of glitters){
      g.phase+=g.spd;
      const ga=g.op*(0.4+0.6*Math.abs(Math.sin(g.phase)));
      ctx.beginPath();ctx.arc(g.x,g.y,g.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${ga})`;ctx.fill();
     }

     /* ── SVG danseurs avec légère respiration ── */
     breathT+=0.018;
     const breathY=Math.sin(breathT)*H*0.004; /* montée/descente très douce */
     const breathS=1+Math.sin(breathT*0.7)*0.006; /* micro-scale */
     if(ddReady){
      ctx.save();
      ctx.translate(cx,dstY+dstH/2+breathY);
      ctx.scale(breathS,breathS);
      ctx.globalAlpha=0.97;
      ctx.drawImage(ddImg,-dstW/2,-dstH/2,dstW,dstH);
      /* Ombre douce sous les pieds */
      ctx.globalAlpha=0.18;
      ctx.fillStyle='rgba(160,0,80,1)';
      ctx.beginPath();ctx.ellipse(0,dstH/2+H*0.008,dstW*0.28,H*0.012,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }
     ctx.globalAlpha=1;

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
