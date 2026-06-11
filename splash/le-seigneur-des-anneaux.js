// CinéQuiz splash chunk — Le Seigneur des Anneaux
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Seigneur des Anneaux"]={
   name:'Le Seigneur des Anneaux',
   color:'180,140,60',
   ref:'Le Seigneur des Anneaux \u2014 Peter Jackson, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.72';
    let t=0;
    const cx=W/2, cy=H*0.52;
    const RR=Math.min(W,H)*0.24; // rayon de l'anneau

    /* ── Cendres ── */
    const ashes=Array.from({length:90},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.5, vy:-(Math.random()*0.6+0.1),
     r:Math.random()*2.2+0.4, op:Math.random()*0.5+0.1,
     spin:Math.random()*0.04-0.02, angle:Math.random()*Math.PI*2,
     drift:Math.random()*0.008
    }));

    /* ── Flammes de Mordor (bas) ── */
    const lava=Array.from({length:35},()=>({
     x:Math.random()*W, y:H+Math.random()*20,
     vx:(Math.random()-0.5)*0.8, vy:-(Math.random()*2+1),
     life:Math.random(), decay:Math.random()*0.01+0.005,
     size:Math.random()*18+8, hue:10+Math.random()*20
    }));

    /* ── Lueur du Mont Doom ── */
    function drawMordor(){
     /* ciel de Mordor — nuages noirs et rouges */
     const sky=ctx.createLinearGradient(0,0,0,H*0.65);
     sky.addColorStop(0,'rgba(4,2,0,0)');
     sky.addColorStop(0.5,`rgba(${40+Math.sin(t*0.2)*8|0},12,0,0.55)`);
     sky.addColorStop(1,`rgba(${80+Math.sin(t*0.4)*15|0},25,0,0.7)`);
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.65);

     /* Mont Doom en silhouette */
     const mX=cx, mBase=H*0.72, mH=H*0.32;
     ctx.beginPath();
     ctx.moveTo(0,mBase);
     ctx.lineTo(mX-W*0.28,mBase);
     ctx.lineTo(mX-W*0.1,mBase-mH*0.45);
     ctx.lineTo(mX,mBase-mH);
     ctx.lineTo(mX+W*0.1,mBase-mH*0.45);
     ctx.lineTo(mX+W*0.28,mBase);
     ctx.lineTo(W,mBase);ctx.lineTo(W,H);ctx.lineTo(0,H);
     ctx.closePath();
     const mg=ctx.createLinearGradient(mX,mBase-mH,mX,mBase);
     mg.addColorStop(0,'rgba(8,4,0,1)');
     mg.addColorStop(0.7,'rgba(12,5,0,1)');
     mg.addColorStop(1,'rgba(18,6,0,1)');
     ctx.fillStyle=mg;ctx.fill();

     /* lave du sommet */
     const lv=ctx.createRadialGradient(mX,mBase-mH+12,0,mX,mBase-mH+12,W*0.18);
     lv.addColorStop(0,`rgba(${255},${120+Math.sin(t*1.2)*30|0},0,${0.7+Math.sin(t*0.9)*0.15})`);
     lv.addColorStop(0.3,`rgba(200,50,0,${0.4+Math.sin(t*0.7)*0.1})`);
     lv.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lv;ctx.fillRect(mX-W*0.25,mBase-mH-20,W*0.5,W*0.4);

     /* lueur ambiante de la lave sur tout le bas */
     const ambg=ctx.createLinearGradient(0,H*0.55,0,H);
     ambg.addColorStop(0,'rgba(0,0,0,0)');
     ambg.addColorStop(0.4,`rgba(${160+Math.sin(t*0.5)*25|0},40,0,0.18)`);
     ambg.addColorStop(1,`rgba(${220+Math.sin(t*0.3)*20|0},60,0,0.38)`);
     ctx.fillStyle=ambg;ctx.fillRect(0,H*0.55,W,H*0.45);
    }

    /* ── Anneau Unique ── */
    function drawRing(){
     const pulse=1+Math.sin(t*1.1)*0.018;
     const glow=0.55+Math.sin(t*0.8)*0.2;
     const R=RR*pulse;

     /* halo externe diffus */
     const halo=ctx.createRadialGradient(cx,cy,R*0.7,cx,cy,R*2.4);
     halo.addColorStop(0,`rgba(255,${140+Math.sin(t)*25|0},0,${glow*0.28})`);
     halo.addColorStop(0.4,`rgba(200,80,0,${glow*0.12})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(cx-R*2.5,cy-R*2.5,R*5,R*5);

     /* corps de l'anneau — épaisseur 3D simulée */
     const thick=R*0.18;
     /* face intérieure sombre */
     ctx.beginPath();ctx.arc(cx,cy,R+thick/2,0,Math.PI*2);
     ctx.arc(cx,cy,R-thick/2,0,Math.PI*2,true);
     ctx.closePath();
     const ringFill=ctx.createRadialGradient(cx-R*0.3,cy-R*0.3,R*0.1,cx,cy,R+thick);
     ringFill.addColorStop(0,`rgba(255,${210+Math.sin(t*1.3)*20|0},80,${glow})`);
     ringFill.addColorStop(0.35,`rgba(${220+Math.sin(t)*15|0},140,20,${glow*0.9})`);
     ringFill.addColorStop(0.7,`rgba(160,80,0,${glow*0.8})`);
     ringFill.addColorStop(1,`rgba(80,30,0,${glow*0.7})`);
     ctx.fillStyle=ringFill;ctx.fill();

     /* reflet spéculaire haut gauche */
     ctx.save();ctx.clip();
     ctx.beginPath();ctx.arc(cx,cy,R+thick/2,0,Math.PI*2);
     ctx.arc(cx,cy,R-thick/2,0,Math.PI*2,true);ctx.closePath();
     const spec=ctx.createLinearGradient(cx-R,cy-R,cx+R*0.3,cy+R*0.3);
     spec.addColorStop(0,`rgba(255,240,180,${0.55*glow})`);
     spec.addColorStop(0.3,'rgba(255,200,80,0.1)');
     spec.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=spec;ctx.fill();
     ctx.restore();

     /* inscriptions elfiques — glyphes qui tournent sur l'anneau */
     const GLYPHS='ᚨᚾᚢᛚᛗᛖᚱ ᛞᚢᚱᛒᚨᛏᚢᛚᚢᚴ ᛗᛟᚱᚷᚢᛚ';
     const nG=GLYPHS.length;
     ctx.save();
     for(let i=0;i<nG;i++){
      const a=(i/nG)*Math.PI*2 - t*0.18;
      const gx=cx+Math.cos(a)*R, gy=cy+Math.sin(a)*R;
      ctx.save();ctx.translate(gx,gy);ctx.rotate(a+Math.PI/2);
      const fi=0.6+Math.sin(t*2.2+i*0.4)*0.4;
      ctx.fillStyle=`rgba(255,${180+Math.sin(t+i)*40|0},0,${fi*glow*0.9})`;
      ctx.font=`bold ${R*0.13}px serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.shadowColor=`rgba(255,120,0,${fi*0.8})`;ctx.shadowBlur=6;
      ctx.fillText(GLYPHS[i],0,0);
      ctx.restore();
     }
     ctx.restore();

     /* reflet sous l'anneau (sol en lave) */
     ctx.save();ctx.globalAlpha=0.18;
     ctx.scale(1,-0.25);ctx.translate(0,-H*2-cy*1.5);
     ctx.beginPath();ctx.arc(cx,cy,R+thick/2,0,Math.PI*2);
     ctx.arc(cx,cy,R-thick/2,0,Math.PI*2,true);ctx.closePath();
     ctx.fillStyle=`rgba(255,120,0,0.5)`;ctx.fill();
     ctx.restore();
    }

    /* ── Flammes en bas ── */
    function drawFlames(){
     for(const f of lava){
      f.x+=f.vx;f.y+=f.vy;f.life-=f.decay;
      if(f.life<=0){f.x=Math.random()*W;f.y=H+10;f.vy=-(Math.random()*2+1);f.life=0.7+Math.random()*0.3;f.vx=(Math.random()-0.5)*0.8;}
      const fg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.size*(1-f.life*0.2));
      fg.addColorStop(0,`hsla(${f.hue},100%,72%,${f.life*0.7})`);
      fg.addColorStop(0.5,`hsla(${f.hue-8},95%,45%,${f.life*0.4})`);
      fg.addColorStop(1,`hsla(${f.hue-15},80%,20%,0)`);
      ctx.fillStyle=fg;ctx.beginPath();ctx.arc(f.x,f.y,f.size*(1-f.life*0.2),0,Math.PI*2);ctx.fill();
     }
    }

    /* ── Cendres ── */
    function drawAshes(){
     for(const a of ashes){
      a.x+=a.vx+Math.sin(t*a.drift*80+a.angle)*0.3;
      a.y+=a.vy;a.angle+=a.spin;
      if(a.y<-5){a.y=H+5;a.x=Math.random()*W;}
      ctx.save();ctx.translate(a.x,a.y);ctx.rotate(a.angle);
      ctx.fillStyle=`rgba(${80+Math.random()*60|0},${30+Math.random()*20|0},0,${a.op})`;
      ctx.fillRect(-a.r,-a.r*0.5,a.r*2,a.r);
      ctx.restore();
     }
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(3,1,0,0.2)';ctx.fillRect(0,0,W,H);
     drawMordor();
     drawFlames();
     drawRing();
     drawAshes();
     /* vignette finale */
     const vg=ctx.createRadialGradient(cx,cy*0.7,RR*0.3,cx,cy*0.7,H*0.9);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.6,'rgba(3,1,0,0.2)');
     vg.addColorStop(1,'rgba(3,1,0,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
