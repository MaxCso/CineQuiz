// CinéQuiz splash chunk — Il faut sauver le soldat Ryan
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Il faut sauver le soldat Ryan"]={
   name:'Il faut sauver le soldat Ryan',
   color:'80,100,60',
   ref:'Il faut sauver le soldat Ryan \u2014 Steven Spielberg, 1998',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : sépia/kaki de l'affiche ── */
    let _ryStyle=document.getElementById('_ry_splash_style');
    if(!_ryStyle){_ryStyle=document.createElement('style');_ryStyle.id='_ry_splash_style';document.head.appendChild(_ryStyle);}
    _ryStyle.textContent=`
      

      #splash-content-wrap{top:20%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _ryW=setInterval(()=>{if(stop.v){_ryStyle.textContent='';clearInterval(_ryW);}},200);

    /* ── SVG soldat Ryan (144×183) ── */
    const RYAN_SVG='images/sprite_18.svg';
    const ryanImg=new Image();let ryanReady=false;
    ryanImg.onload=()=>{ryanReady=true;};ryanImg.src=RYAN_SVG;

    /* Soldat : hauteur 55% écran, ancré en bas, centré */
    const SOL_H=H*0.55;
    const SOL_W=SOL_H*(144/183);
    const SOL_X=cx-SOL_W/2;
    const SOL_Y=H*0.96-SOL_H; /* pied du soldat à 96% de l'écran */

    /* ── Pluie fine — Normandie ── */
    const rain=Array.from({length:90},()=>{
     return {
      x:Math.random()*W*1.3-W*0.15,
      y:Math.random()*H,
      len:H*(0.018+Math.random()*0.020),
      spd:H*(0.007+Math.random()*0.005),
      op:0.10+Math.random()*0.18,
     };
    });

    /* ── Particules de poussière / fumée ── */
    const dust=Array.from({length:18},()=>{
     return {
      x:Math.random()*W,
      y:H*0.30+Math.random()*H*0.55,
      r:W*(0.025+Math.random()*0.045),
      op:Math.random()*0.12+0.03,
      vx:(Math.random()-0.5)*0.18,
      vy:-(Math.random()*0.08+0.02),
      phase:Math.random()*Math.PI*2,
     };
    });


    /* ── Avions de combat ── */
    const av1Img=new Image();let av1Ready=false;
    av1Img.onload=()=>{av1Ready=true;};av1Img.src='images/Avion 1.svg';
    const av2Img=new Image();let av2Ready=false;
    av2Img.onload=()=>{av2Ready=true;};av2Img.src='images/Avion 2.svg';
    /* Avion 1 — gauche→droite, haut du ciel */
    const plane1={x:-W*0.28, y:H*0.18, spd:W*0.0018, w:W*0.28, h:W*0.28*(640/1280)};
    /* Avion 2 — droite→gauche, légèrement plus bas */
    const plane2={x:W*1.15, y:H*0.28, spd:W*0.0013, w:W*0.22, h:W*0.22*(681/1280)};
    /* ── Éclairs d'obus périodiques ── */
    let flashTimer=0, flashOp=0, flashX=cx;

    function frame(){
     if(stop.v)return;

     /* Fond sépia-kaki dégradé — comme l'affiche */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#1e1a0e');
     bg.addColorStop(0.25,'#2a2415');
     bg.addColorStop(0.55,'#35301e');
     bg.addColorStop(0.78,'#2a2010');
     bg.addColorStop(1.00,'#1a1508');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Léger halo central — lumière voilée de guerre */
     const cg=ctx.createRadialGradient(cx,H*0.42,0,cx,H*0.42,W*0.55);
     cg.addColorStop(0,'rgba(100,88,55,0.12)');
     cg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cg;ctx.fillRect(0,0,W,H);

     /* Flash d'obus */
     flashTimer++;
     if(flashTimer>110+Math.random()*80){flashTimer=0;flashOp=0.55;flashX=cx+(Math.random()-0.5)*W*0.55;}
     flashOp*=0.88;
     if(flashOp>0.01){
      const fg=ctx.createRadialGradient(flashX,H*0.35,0,flashX,H*0.35,W*0.45);
      fg.addColorStop(0,`rgba(220,185,80,${flashOp*0.50})`);
      fg.addColorStop(0.4,`rgba(160,120,30,${flashOp*0.15})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.fillRect(0,0,W,H);
     }


     /* ── Avions dans le ciel ── */
     plane1.x+=plane1.spd;
     if(plane1.x>W*1.15)plane1.x=-plane1.w;
     if(av1Ready){
      ctx.save();ctx.globalAlpha=0.68;
      ctx.drawImage(av1Img,plane1.x,plane1.y+Math.sin(t*0.55)*H*0.006,plane1.w,plane1.h);
      ctx.restore();
     }
     plane2.x-=plane2.spd;
     if(plane2.x<-plane2.w)plane2.x=W*1.10;
     if(av2Ready){
      ctx.save();ctx.globalAlpha=0.60;
      ctx.translate(plane2.x+plane2.w,plane2.y+Math.sin(t*0.42+1.2)*H*0.005);
      ctx.scale(-1,1);
      ctx.drawImage(av2Img,0,0,plane2.w,plane2.h);
      ctx.restore();
     }

     /* Fumée de fond */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.phase+=0.018;
      if(d.y<H*0.15){d.y=H*0.70+Math.random()*H*0.20;d.x=Math.random()*W;}
      const dg=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r);
      dg.addColorStop(0,`rgba(55,48,30,${d.op*(0.5+0.5*Math.sin(d.phase))})`);
      dg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=dg;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* Pluie inclinée */
     ctx.save();ctx.rotate(0.05);
     for(const r of rain){
      r.y+=r.spd;
      if(r.y>H+10){r.y=-10;r.x=Math.random()*W*1.3-W*0.15;}
      ctx.strokeStyle=`rgba(90,82,60,${r.op})`;ctx.lineWidth=0.6;
      ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x,r.y+r.len);ctx.stroke();
     }
     ctx.restore();

     /* Soldat SVG centré, rendu en couleur sépia via compositing */
     if(ryanReady){
      /* Dessiner le SVG sur canvas offscreen pour teinter en sépia */
      const oc=document.createElement('canvas');
      oc.width=SOL_W;oc.height=SOL_H;
      const ot=oc.getContext('2d');
      ot.drawImage(ryanImg,0,0,SOL_W,SOL_H);
      /* Teinte sépia par-dessus */
      ot.globalCompositeOperation='source-atop';
      ot.fillStyle='rgba(45,38,20,0.82)';
      ot.fillRect(0,0,SOL_W,SOL_H);
      ctx.save();
      ctx.globalAlpha=0.92;
      ctx.drawImage(oc,SOL_X,SOL_Y);
      ctx.restore();
     }

     /* Vignette intense — ambiance guerre */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.08,cx,H*0.45,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.20)');
     vg.addColorStop(1,'rgba(0,0,0,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain pellicule */
     for(let i=0;i<40;i++){const g=8+Math.random()*18|0;ctx.fillStyle=`rgba(${g+6},${g+4},${g},${Math.random()*0.020})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
