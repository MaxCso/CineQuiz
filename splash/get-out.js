// CinéQuiz splash chunk — Get Out
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Get Out"]={
   name:'Get Out',
   color:'80,40,20',
   ref:'Get Out \u2014 Jordan Peele, 2017',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.72';
    let t=0;
    const cx=W/2;

    // ── Centre de l'hypnose (légèrement au-dessus du milieu) ──
    const hx=cx, hy=H*0.52;

    // ── Larmes ──
    const tears=Array.from({length:5},(_,i)=>({
     x:cx+[-18,-6,4,14,22][i],
     y:H*0.30+Math.random()*10,
     vy:0.7+Math.random()*0.5,
     trail:[],
     op:0.5+Math.random()*0.4,
     phase:Math.random()*Math.PI*2
    }));

    // ── Tasse + cuillère ──
    let spoonAngle=0;

    // ── Particules "sunken place" qui tombent dans la spirale ──
    const sunkParticles=Array.from({length:22},()=>({
     angle:Math.random()*Math.PI*2,
     r:Math.random()*W*0.35+W*0.05,
     vr:-(Math.random()*0.8+0.3),
     op:Math.random()*0.35+0.05,
     size:Math.random()*2+0.5
    }));

    function drawFace(){
     // Silhouette de visage — profil 3/4
     const fx=cx, fy=H*0.28;
     ctx.save();
     ctx.fillStyle='rgba(4,3,5,0.88)';
     // Tête
     ctx.beginPath();ctx.ellipse(fx,fy,38,46,0,0,Math.PI*2);ctx.fill();
     // Cou
     ctx.beginPath();
     ctx.moveTo(fx-12,fy+44);ctx.lineTo(fx-14,fy+72);
     ctx.lineTo(fx+14,fy+72);ctx.lineTo(fx+12,fy+44);
     ctx.fill();
     // Épaules
     ctx.beginPath();
     ctx.moveTo(fx-14,fy+72);
     ctx.quadraticCurveTo(fx-55,fy+80,fx-60,fy+105);
     ctx.lineTo(fx+60,fy+105);
     ctx.quadraticCurveTo(fx+55,fy+80,fx+14,fy+72);
     ctx.fill();
     // Œil gauche — ouvert, figé (le regard du sunken place)
     const eyeX=fx-13, eyeY=fy-4;
     ctx.fillStyle='rgba(240,235,225,0.70)';
     ctx.beginPath();ctx.ellipse(eyeX,eyeY,9,5,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(10,8,12,0.95)';
     ctx.beginPath();ctx.arc(eyeX,eyeY,3.5,0,Math.PI*2);ctx.fill();
     // Reflet œil
     ctx.fillStyle='rgba(255,255,255,0.60)';
     ctx.beginPath();ctx.arc(eyeX-1.5,eyeY-1.5,1.2,0,Math.PI*2);ctx.fill();
     // Œil droit
     const eyeX2=fx+13, eyeY2=fy-4;
     ctx.fillStyle='rgba(240,235,225,0.70)';
     ctx.beginPath();ctx.ellipse(eyeX2,eyeY2,9,5,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(10,8,12,0.95)';
     ctx.beginPath();ctx.arc(eyeX2,eyeY2,3.5,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.60)';
     ctx.beginPath();ctx.arc(eyeX2-1.5,eyeY2-1.5,1.2,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    function drawTeacup(){
     const tx=cx, ty=H*0.80;
     ctx.save();
     // Tasse
     ctx.fillStyle='rgba(240,235,220,0.22)';
     ctx.beginPath();
     ctx.moveTo(tx-22,ty-14);ctx.lineTo(tx-18,ty+12);
     ctx.quadraticCurveTo(tx,ty+18,tx+18,ty+12);
     ctx.lineTo(tx+22,ty-14);
     ctx.quadraticCurveTo(tx,ty-10,tx-22,ty-14);
     ctx.fill();
     // Anse
     ctx.strokeStyle='rgba(240,235,220,0.18)';ctx.lineWidth=2.5;
     ctx.beginPath();
     ctx.moveTo(tx+22,ty-8);
     ctx.quadraticCurveTo(tx+38,ty,tx+22,ty+8);
     ctx.stroke();
     // Soucoupe
     ctx.fillStyle='rgba(240,235,220,0.14)';
     ctx.beginPath();ctx.ellipse(tx,ty+16,30,5,0,0,Math.PI*2);ctx.fill();
     // Surface du thé (cercle qui tourne avec la cuillère)
     ctx.fillStyle='rgba(140,100,40,0.20)';
     ctx.beginPath();ctx.ellipse(tx,ty-14,20,4,0,0,Math.PI*2);ctx.fill();
     // Cuillère qui tourne
     spoonAngle+=0.04;
     const sx=tx+Math.cos(spoonAngle)*14;
     const sy=ty-14+Math.sin(spoonAngle)*3;
     ctx.strokeStyle='rgba(200,190,170,0.45)';ctx.lineWidth=2;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(sx-Math.cos(spoonAngle)*18,sy-Math.sin(spoonAngle)*5);
     ctx.lineTo(sx,sy);
     ctx.stroke();
     // Tête cuillère
     ctx.beginPath();ctx.ellipse(sx,sy,4,2.5,spoonAngle,0,Math.PI*2);
     ctx.fillStyle='rgba(200,190,170,0.40)';ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(3,2,5,0.13)';ctx.fillRect(0,0,W,H);

     // ── Spirale hypnotique ──
     const maxR=Math.min(W,H)*0.42;
     const turns=9;
     ctx.save();
     for(let i=0;i<280;i++){
      const progress=i/280;
      const r=progress*maxR;
      const angle=progress*Math.PI*2*turns - t*0.7;
      const x=hx+Math.cos(angle)*r;
      const y=hy+Math.sin(angle)*r*0.92;
      const bright=8+progress*45;
      const alpha=0.55-progress*0.35;
      const ptSize=0.8+progress*2.2;
      ctx.beginPath();ctx.arc(x,y,ptSize,0,Math.PI*2);
      ctx.fillStyle=`rgba(${bright+12},${bright+8},${bright+18},${alpha})`;
      ctx.fill();
     }
     ctx.restore();

     // Cercles concentriques pulsants
     for(let i=1;i<=6;i++){
      const r=(i/6)*maxR*(0.95+Math.sin(t*0.4+i)*0.04);
      const alpha=0.03+i*0.008+Math.sin(t*0.6+i*0.8)*0.01;
      ctx.beginPath();ctx.arc(hx,hy,r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(200,195,210,${alpha})`;
      ctx.lineWidth=0.7;ctx.stroke();
     }

     // ── Particules sunken place ──
     for(const p of sunkParticles){
      p.angle+=0.012;
      p.r+=p.vr;
      if(p.r<8){p.r=W*0.40;p.op=Math.random()*0.3+0.04;}
      const px=hx+Math.cos(p.angle)*p.r;
      const py=hy+Math.sin(p.angle)*p.r*0.88;
      ctx.beginPath();ctx.arc(px,py,p.size,0,Math.PI*2);
      ctx.fillStyle=`rgba(220,215,230,${p.op*(1-p.r/(W*0.4))})`;
      ctx.fill();
     }

     // ── Silhouette visage ──
     drawFace();

     // ── Larmes ──
     for(const tr of tears){
      const wobble=Math.sin(t*1.8+tr.phase)*1.2;
      tr.y+=tr.vy;
      tr.trail.push({x:tr.x+wobble,y:tr.y});
      if(tr.trail.length>28)tr.trail.shift();
      if(tr.y>H*0.42){tr.y=H*0.30+Math.random()*8;tr.trail=[];}
      // Traîne
      if(tr.trail.length>2){
       ctx.beginPath();ctx.moveTo(tr.trail[0].x,tr.trail[0].y);
       for(const p of tr.trail)ctx.lineTo(p.x,p.y);
       ctx.strokeStyle=`rgba(160,205,245,${tr.op*0.55})`;
       ctx.lineWidth=1.4;ctx.lineCap='round';ctx.stroke();
      }
      // Goutte
      ctx.beginPath();
      ctx.arc(tr.x+wobble,tr.y,2.8,0,Math.PI*2);
      ctx.fillStyle=`rgba(175,215,250,${tr.op})`;ctx.fill();
      // Reflet goutte
      ctx.beginPath();ctx.arc(tr.x+wobble-1,tr.y-1,1,0,Math.PI*2);
      ctx.fillStyle=`rgba(240,250,255,${tr.op*0.7})`;ctx.fill();
     }

     // ── Tasse de thé ──
     drawTeacup();

     // ── Flash rouge très discret (le danger latent) ──
     const redPulse=Math.max(0,Math.sin(t*0.25)*0.5-0.3);
     if(redPulse>0){
      const rg=ctx.createRadialGradient(cx,H*0.5,0,cx,H*0.5,W*0.6);
      rg.addColorStop(0,`rgba(120,0,0,${redPulse*0.06})`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);
     }

     // Vignette profonde
     const vg=ctx.createRadialGradient(cx,hy,H*0.04,cx,hy,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(2,1,4,0.12)');
     vg.addColorStop(1,'rgba(1,0,3,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
