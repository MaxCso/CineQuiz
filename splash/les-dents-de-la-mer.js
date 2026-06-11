// CinéQuiz splash chunk — Les Dents de la Mer
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Les Dents de la Mer"]={
   name:'Les Dents de la Mer',
   color:'20,80,180',
   ref:'Les Dents de la Mer \u2014 Steven Spielberg, 1975',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.65';
    let t=0;
    const cx=W/2;

    /* ── Position citation + logo ── */
    let _dmS=document.getElementById('_dm_s');
    if(!_dmS){_dmS=document.createElement('style');_dmS.id='_dm_s';document.head.appendChild(_dmS);}
    _dmS.textContent='#splash-content-wrap{top:52%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _dmW=setInterval(()=>{if(stop.v){_dmS.textContent='';clearInterval(_dmW);}},200);

    /* ── Aileron de requin ── */
    let finX = W * -0.15;
    let finDir = 1;
    const finSpd = 1.4;

    function drawFin(){
     /* Y de la surface de l'eau à la position de l'aileron */
     const surfY = H*0.38 + Math.sin(finX*0.02 + t*0.8)*8 + Math.sin(finX*0.04 - t*0.5)*4;
     const fy = surfY;

     /* ── Sillage derrière l'aileron — plus visible ── */
     const wakeLen = W * 0.28;
     const wakeDir = finDir < 0 ? 1 : -1;
     const wakeGrad = ctx.createLinearGradient(finX, fy, finX + wakeDir * wakeLen, fy);
     wakeGrad.addColorStop(0, 'rgba(80,180,240,0.45)');
     wakeGrad.addColorStop(0.3, 'rgba(40,130,190,0.22)');
     wakeGrad.addColorStop(1, 'rgba(0,0,0,0)');
     ctx.fillStyle = wakeGrad;
     ctx.beginPath();
     ctx.moveTo(finX, fy - 5);
     ctx.lineTo(finX + wakeDir * wakeLen, fy - 14);
     ctx.lineTo(finX + wakeDir * wakeLen, fy + 14);
     ctx.lineTo(finX, fy + 5);
     ctx.closePath();
     ctx.fill();

     /* ── Rides concentriques — bien visibles ── */
     for(let r = 0; r < 4; r++){
      const rr = 22 + r * 28 + Math.sin(t*2 + r)*5;
      const rAlpha = (0.45 - r * 0.09) * (0.7 + Math.sin(t*1.5)*0.3);
      ctx.strokeStyle = `rgba(80,180,240,${rAlpha})`;
      ctx.lineWidth = 1.8 - r*0.3;
      ctx.beginPath();
      ctx.ellipse(finX + 12, fy, rr * 2.0, rr * 0.38, 0, 0, Math.PI * 2);
      ctx.stroke();
     }

     /* ── Lueur sous-marine autour de l'aileron ── */
     const glowG = ctx.createRadialGradient(finX+12, fy+20, 5, finX+12, fy+20, W*0.18);
     glowG.addColorStop(0, `rgba(20,80,160,${0.35+Math.sin(t*1.2)*0.08})`);
     glowG.addColorStop(0.5, 'rgba(10,40,100,0.12)');
     glowG.addColorStop(1, 'rgba(0,0,0,0)');
     ctx.fillStyle = glowG;
     ctx.fillRect(finX - W*0.18, fy, W*0.36, H*0.15);

     /* ── Aileron principal — agrandi et bien contrasté ── */
     const flipFin = finDir < 0;
     ctx.save();
     ctx.translate(finX + 12, fy);
     if(flipFin) ctx.scale(-1, 1);

     /* Taille augmentée : ~2.5x plus grand */
     const finH = H * 0.11;
     const finW = finH * 1.1;

     /* Ombre sous la surface */
     const subG = ctx.createLinearGradient(0, 0, 0, finH * 0.4);
     subG.addColorStop(0, 'rgba(5,15,30,0)');
     subG.addColorStop(1, 'rgba(5,20,40,0.50)');
     ctx.fillStyle = subG;
     ctx.beginPath();
     ctx.ellipse(0, finH*0.08, finW*0.55, finH*0.18, 0, 0, Math.PI*2);
     ctx.fill();

     /* Halo lumineux derrière l'aileron pour le faire ressortir */
     const haloG = ctx.createRadialGradient(0, -finH*0.5, 5, 0, -finH*0.3, finH*1.2);
     haloG.addColorStop(0, `rgba(30,100,180,${0.28+Math.sin(t*0.8)*0.06})`);
     haloG.addColorStop(1, 'rgba(0,0,0,0)');
     ctx.fillStyle = haloG;
     ctx.fillRect(-finW, -finH*1.4, finW*2, finH*1.8);

     /* Corps aileron — dégradé sombre avec reflets */
     const finColor = ctx.createLinearGradient(-finW*0.2, -finH, finW*0.5, 0);
     finColor.addColorStop(0, 'rgba(22,22,28,1)');
     finColor.addColorStop(0.4, 'rgba(35,35,45,0.97)');
     finColor.addColorStop(1, 'rgba(18,18,24,1)');
     ctx.fillStyle = finColor;
     ctx.beginPath();
     ctx.moveTo(-finW*0.45, 2);
     ctx.bezierCurveTo(-finW*0.40, -finH*0.5, -finW*0.25, -finH*0.88, -finW*0.05, -finH);
     ctx.bezierCurveTo(finW*0.15, -finH*0.95, finW*0.45, -finH*0.65, finW*0.60, -finH*0.28);
     ctx.bezierCurveTo(finW*0.70, -finH*0.08, finW*0.55, 0, finW*0.45, 2);
     ctx.closePath();
     ctx.fill();

     /* Contour lumineux pour détacher l'aileron de l'eau */
     ctx.strokeStyle = `rgba(100,160,220,${0.55+Math.sin(t*1.2)*0.15})`;
     ctx.lineWidth = 1.8;
     ctx.beginPath();
     ctx.moveTo(-finW*0.45, 2);
     ctx.bezierCurveTo(-finW*0.40, -finH*0.5, -finW*0.25, -finH*0.88, -finW*0.05, -finH);
     ctx.bezierCurveTo(finW*0.15, -finH*0.95, finW*0.45, -finH*0.65, finW*0.60, -finH*0.28);
     ctx.bezierCurveTo(finW*0.70, -finH*0.08, finW*0.55, 0, finW*0.45, 2);
     ctx.stroke();

     /* Reflet lumineux sur le bord avant */
     ctx.strokeStyle = 'rgba(140,200,255,0.55)';
     ctx.lineWidth = 2.0;
     ctx.beginPath();
     ctx.moveTo(-finW*0.42, 1);
     ctx.bezierCurveTo(-finW*0.38, -finH*0.45, -finW*0.22, -finH*0.82, -finW*0.04, -finH*0.97);
     ctx.stroke();

     /* Point lumineux au sommet */
     ctx.fillStyle = `rgba(160,220,255,${0.55+Math.sin(t*2)*0.20})`;
     ctx.beginPath();
     ctx.ellipse(-finW*0.08, -finH*0.88, finW*0.05, finH*0.06, -0.3, 0, Math.PI*2);
     ctx.fill();

     ctx.restore();

     /* ── Éclaboussures à la base — plus marquées ── */
     for(let s = 0; s < 7; s++){
      const sx = finX + (s - 3) * 14 + Math.sin(t*3 + s) * 5;
      const sy = fy + Math.sin(t*2.5 + s*1.2) * 3;
      const sa = (0.30 + Math.sin(t*2+s)*0.12) * Math.max(0, Math.sin(t*1.8+s*0.7));
      if(sa > 0.02){
       ctx.fillStyle = `rgba(120,200,255,${sa})`;
       ctx.beginPath();
       ctx.ellipse(sx, sy, 4 + s*0.8, 2, 0, 0, Math.PI*2);
       ctx.fill();
      }
     }
    }

    const bloodClouds=Array.from({length:8},()=>({
     x:Math.random()*W,y:H*0.4+Math.random()*H*0.3,
     r:Math.random()*30+15,op:Math.random()*0.12+0.04,
     vx:(Math.random()-0.5)*0.2
    }));
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,8,15,0.15)';ctx.fillRect(0,0,W,H);

     const og=ctx.createLinearGradient(0,0,0,H);
     og.addColorStop(0,'rgba(0,30,80,0.07)');og.addColorStop(0.5,'rgba(0,15,40,0.09)');og.addColorStop(1,'rgba(0,5,15,0.12)');
     ctx.fillStyle=og;ctx.fillRect(0,0,W,H);

     ctx.strokeStyle='rgba(20,80,130,0.25)';ctx.lineWidth=1.5;
     ctx.beginPath();
     for(let x=0;x<=W;x+=4){
      const y=H*0.38+Math.sin(x*0.02+t*0.8)*8+Math.sin(x*0.04-t*0.5)*4;
      x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
     }
     ctx.stroke();

     for(const b of bloodClouds){
      b.x+=b.vx;if(b.x<-b.r)b.x=W+b.r;if(b.x>W+b.r)b.x=-b.r;
      const bg=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
      bg.addColorStop(0,`rgba(160,10,20,${b.op})`);bg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg;ctx.fillRect(b.x-b.r,b.y-b.r,b.r*2,b.r*2);
     }

     /* Déplacement de l'aileron */
     finX += finDir * finSpd;
     if(finX > W * 1.15){ finDir = -1; }
     if(finX < W * -0.15){ finDir = 1; }
     drawFin();
     const vg=ctx.createRadialGradient(cx,H/2,H*0.1,cx,H/2,H*0.8);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,5,15,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
