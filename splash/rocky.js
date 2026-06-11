// CinéQuiz splash chunk — Rocky
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Rocky"]={
   name:'Rocky',
   color:'200,60,20',
   ref:'Rocky \u2014 John G. Avildsen, 1976',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── CSS override : remonter citation + logo sous le header ── */
    let _rkS=document.getElementById('_rk_s');
    if(!_rkS){_rkS=document.createElement('style');_rkS.id='_rk_s';document.head.appendChild(_rkS);}
    _rkS.textContent=`
     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
    `;
    const _rkW=setInterval(()=>{if(stop.v){_rkS.textContent='';clearInterval(_rkW);}},200);

    // ── Particules de buée (souffle dans le froid de l'aube) ──
    const breath=Array.from({length:18},()=>({
     x:cx+(Math.random()-0.5)*30,
     y:H*0.38+Math.random()*20,
     vx:(Math.random()-0.5)*0.4,
     vy:-(Math.random()*0.6+0.2),
     r:Math.random()*8+4,
     life:Math.random(),
     decay:Math.random()*0.006+0.003
    }));

    // ── Étoiles (aube — presque disparues) ──
    const stars=Array.from({length:40},()=>({
     x:Math.random()*W, y:Math.random()*H*0.55,
     r:Math.random()*0.9+0.2,
     op:Math.random()*0.25+0.05
    }));

    // ── Confettis / papiers de journal (ambiance Philly) ──
    const debris=Array.from({length:12},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*1.2,
     vy:-(Math.random()*0.3+0.1),
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.08,
     w:Math.random()*12+5, h:Math.random()*8+3,
     op:Math.random()*0.12+0.04
    }));

    function drawSteps(){
     // Marches du Philadelphia Museum of Art vues de face
     // La silhouette se tient en haut — on dessine les marches en-dessous
     const stepsBottom=H*0.82;
     const nSteps=12;
     const stepH=H*0.018;

     for(let i=0;i<nSteps;i++){
      const y=stepsBottom-i*stepH;
      const spread=0.32+i*0.025; // plus large vers le bas
      const x0=cx-W*spread;
      const x1=cx+W*spread;
      const lightness=8+i*1.5;
      // Face supérieure de la marche (légèrement éclairée)
      ctx.fillStyle=`rgba(${lightness+12},${lightness+8},${lightness+4},0.70)`;
      ctx.fillRect(x0,y,x1-x0,stepH*0.45);
      // Contremarche (côté vertical, plus sombre)
      ctx.fillStyle=`rgba(${lightness},${lightness-2},${lightness-4},0.55)`;
      ctx.fillRect(x0,y+stepH*0.45,x1-x0,stepH*0.55);
     }

     // Palier supérieur (plateau où se tient Rocky)
     const palierY=stepsBottom-nSteps*stepH;
     ctx.fillStyle='rgba(22,18,14,0.65)';
     ctx.fillRect(cx-W*0.62,palierY-stepH*0.5,W*1.24,stepH*0.5);
    }

    // ── SVG Rocky ──
    const rockyImg=new Image();
    let rockyReady=false;
    rockyImg.onload=()=>{rockyReady=true;};
    rockyImg.src='images/Rocky.svg';
    const SVG_W=261, SVG_H=861;

    function drawRocky(){
     const targetH=H*0.20;
     const targetW=targetH*(SVG_W/SVG_H);
     const drawX=cx-targetW/2;
     const drawY=H*0.65-targetH;
     if(rockyReady){
      ctx.save();ctx.globalAlpha=0.93;
      ctx.drawImage(rockyImg,drawX,drawY,targetW,targetH);
      ctx.restore();
     }
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(3,2,1,0.08)';ctx.fillRect(0,0,W,H);

     // ── Ciel aube — dégradé chaud/froid ──
     const sky=ctx.createLinearGradient(0,0,0,H*0.65);
     sky.addColorStop(0,`rgba(8,12,28,0.10)`);
     sky.addColorStop(0.3,`rgba(${20+Math.sin(t*0.15)*5|0},18,35,0.08)`);
     sky.addColorStop(0.65,`rgba(${90+Math.sin(t*0.12)*8|0},48,18,0.18)`);
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.65);

     // Soleil levant — horizon orangé
     const sunY=H*0.62;
     const sunGlow=ctx.createRadialGradient(cx,sunY,0,cx,sunY,W*0.65);
     sunGlow.addColorStop(0,`rgba(${220+Math.sin(t*0.2)*15|0},${110+Math.sin(t*0.15)*10|0},30,${0.50+Math.sin(t*0.3)*0.06})`);
     sunGlow.addColorStop(0.3,`rgba(180,70,15,0.22)`);
     sunGlow.addColorStop(0.6,`rgba(100,30,5,0.10)`);
     sunGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunGlow;ctx.fillRect(0,0,W,H);

     // Lumière bleue froide du petit matin (à gauche)
     const coldLight=ctx.createRadialGradient(0,H*0.4,0,0,H*0.4,W*0.7);
     coldLight.addColorStop(0,`rgba(30,55,130,${0.14+Math.sin(t*0.25)*0.03})`);
     coldLight.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=coldLight;ctx.fillRect(0,0,W,H);

     // ── Étoiles pâles ──
     for(const s of stars){
      const fade=Math.max(0,0.3-s.y/H*0.5); // s'estompent vers l'horizon
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(220,230,255,${s.op*fade})`;ctx.fill();
     }

     // ── Skyline de Philadelphie (silhouettes immeubles) ──
     const buildings=[
      {x:0,      w:W*0.10,h:H*0.12},
      {x:W*0.08, w:W*0.06,h:H*0.18},
      {x:W*0.13, w:W*0.09,h:H*0.10},
      {x:W*0.72, w:W*0.08,h:H*0.14},
      {x:W*0.79, w:W*0.06,h:H*0.20},
      {x:W*0.84, w:W*0.10,h:H*0.11},
      {x:W*0.93, w:W*0.08,h:H*0.16},
     ];
     const horizY=H*0.63;
     for(const b of buildings){
      ctx.fillStyle='rgba(6,4,8,0.72)';
      ctx.fillRect(b.x,horizY-b.h,b.w,b.h);
      // Quelques fenêtres allumées
      for(let r=0;r<Math.floor(b.h/14);r++){
       for(let c=0;c<Math.floor(b.w/9);c++){
        if(Math.sin(b.x*0.3+r*c*1.1)>0.5){
         ctx.fillStyle='rgba(255,190,70,0.50)';
         ctx.fillRect(b.x+c*9+2,horizY-b.h+r*14+3,4,5);
        }
       }
      }
     }
     // Sol horizon
     const ground=ctx.createLinearGradient(0,horizY,0,H);
     ground.addColorStop(0,'rgba(14,10,7,0.55)');
     ground.addColorStop(1,'rgba(8,5,3,0.75)');
     ctx.fillStyle=ground;ctx.fillRect(0,horizY,W,H-horizY);

     // ── Marches ──
     drawSteps();

     // ── Silhouette Rocky ──
     drawRocky();

     // ── Buée du souffle ──
     for(const b of breath){
      b.x+=b.vx;b.y+=b.vy;b.r+=0.3;b.life-=b.decay;
      if(b.life<=0){
       b.x=cx+(Math.random()-0.5)*20;
       b.y=H*0.38+Math.random()*10;
       b.r=Math.random()*5+3;b.life=0.8+Math.random()*0.2;
       b.vy=-(Math.random()*0.5+0.2);
      }
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(220,215,210,${b.life*0.12})`;ctx.fill();
     }

     // ── Débris / papiers ──
     for(const d of debris){
      d.x+=d.vx;d.y+=d.vy;d.rot+=d.rotSpd;
      if(d.y<-20)d.y=H+10;
      if(d.x<-20)d.x=W+10;if(d.x>W+20)d.x=-10;
      ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.rot);
      ctx.fillStyle=`rgba(200,190,170,${d.op})`;
      ctx.fillRect(-d.w/2,-d.h/2,d.w,d.h);
      ctx.restore();
     }

     // Vignette
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.05,cx,H*0.5,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.6,'rgba(3,1,0,0.08)');
     vg.addColorStop(1,'rgba(5,1,0,0.45)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
