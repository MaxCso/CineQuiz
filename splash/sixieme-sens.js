// CinéQuiz splash chunk — Sixième Sens
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Sixième Sens"]={
   name:'Sixi\u00e8me Sens',
   color:'60,20,80',
   ref:'The Sixth Sense \u2014 M. Night Shyamalan, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ss_s');
    if(!_s){_s=document.createElement('style');_s.id='_ss_s';document.head.appendChild(_s);}
    _s.textContent=`
     

     #splash-content-wrap{top:70%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(255,225,200,0.92)!important;font-size:14px!important;text-shadow:0 1px 12px rgba(0,0,0,0.95)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Position de la silhouette ── */
    const figX=cx, figY=H*0.46;
    const figH=H*0.22; /* hauteur de la silhouette */

    /* ── Rayons de lumière — 16 faisceaux irréguliers ── */
    const rays=Array.from({length:16},(_,i)=>({
     angle:(Math.PI*2/16)*i + (Math.random()-0.5)*0.18,
     len:W*(0.38+Math.random()*0.30),
     width:0.04+Math.random()*0.06, /* angle du cône */
     op:0.45+Math.random()*0.45,
     pulse:Math.random()*Math.PI*2,
     pulseSpd:0.008+Math.random()*0.012,
    }));

    /* ── Particules rouges — signature Shyamalan ── */
    const redDots=Array.from({length:28},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:W*(0.002+Math.random()*0.010),
     op:0.20+Math.random()*0.55,
     ph:Math.random()*Math.PI*2,
     spd:0.007+Math.random()*0.022,
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.05+Math.random()*0.18),
    }));

    /* ── Poussière froide — particules bleutées/grises qui dérivent ── */
    const dustMotes=Array.from({length:40},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:W*(0.001+Math.random()*0.004),
     op:0.08+Math.random()*0.22,
     ph:Math.random()*Math.PI*2,
     spd:0.005+Math.random()*0.012,
     vx:(Math.random()-0.5)*0.28,
     vy:-(0.02+Math.random()*0.08),
     warm:Math.random()<0.3,
    }));

    /* ── Braises montantes — minuscules étincelles orangées ── */
    const embers=Array.from({length:18},()=>({
     x:cx+(Math.random()-0.5)*W*0.30,
     y:H*(0.40+Math.random()*0.35),
     r:W*(0.001+Math.random()*0.003),
     op:0.35+Math.random()*0.50,
     ph:Math.random()*Math.PI*2,
     spd:0.018+Math.random()*0.030,
     vx:(Math.random()-0.5)*0.22,
     vy:-(0.30+Math.random()*0.55),
    }));

    /* ── Souffle condensé — cold breath ── */
    let breathT=0;

    function drawSilhouette(x, y, h, alpha){
     const sc=h/220; /* 220 = hauteur de référence en units */
     ctx.save();
     ctx.globalAlpha=alpha;
     ctx.fillStyle='#000000';
     ctx.strokeStyle='#000000';
     ctx.lineCap='round';
     ctx.lineJoin='round';
     /* Tête */
     ctx.beginPath();ctx.arc(x, y-h*0.82, h*0.10, 0, Math.PI*2);ctx.fill();
     /* Cou + torse */
     ctx.beginPath();
     ctx.moveTo(x-h*0.08, y-h*0.70);
     ctx.bezierCurveTo(x-h*0.14,y-h*0.60, x-h*0.16,y-h*0.40, x-h*0.12,y-h*0.18);
     ctx.lineTo(x+h*0.12, y-h*0.18);
     ctx.bezierCurveTo(x+h*0.16,y-h*0.40, x+h*0.14,y-h*0.60, x+h*0.08,y-h*0.70);
     ctx.closePath();ctx.fill();
     /* Bras gauche — légèrement le long du corps */
     ctx.lineWidth=h*0.055;
     ctx.beginPath();ctx.moveTo(x-h*0.12,y-h*0.60);ctx.quadraticCurveTo(x-h*0.20,y-h*0.35,x-h*0.16,y-h*0.16);ctx.stroke();
     /* Bras droit */
     ctx.beginPath();ctx.moveTo(x+h*0.12,y-h*0.60);ctx.quadraticCurveTo(x+h*0.20,y-h*0.35,x+h*0.16,y-h*0.16);ctx.stroke();
     /* Jambe gauche */
     ctx.lineWidth=h*0.060;
     ctx.beginPath();ctx.moveTo(x-h*0.05,y-h*0.18);ctx.quadraticCurveTo(x-h*0.08,y-h*0.02,x-h*0.06,y);ctx.stroke();
     /* Jambe droite */
     ctx.beginPath();ctx.moveTo(x+h*0.05,y-h*0.18);ctx.quadraticCurveTo(x+h*0.08,y-h*0.02,x+h*0.06,y);ctx.stroke();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     breathT+=0.016;

     /* ── Fond noir absolu ── */
     ctx.fillStyle='#000000';ctx.fillRect(0,0,W,H);

     /* ── Lueur centrale — halo chaud orange/ambré ── */
     const baseGlow=ctx.createRadialGradient(figX,figY-figH*0.45,0,figX,figY-figH*0.45,W*0.52);
     baseGlow.addColorStop(0,`rgba(255,${120+Math.sin(t*0.4)*15|0},15,${0.52+Math.sin(t*0.35)*0.06})`);
     baseGlow.addColorStop(0.18,`rgba(220,75,10,${0.32+Math.sin(t*0.30)*0.05})`);
     baseGlow.addColorStop(0.45,`rgba(150,35,6,${0.16+Math.sin(t*0.25)*0.03})`);
     baseGlow.addColorStop(0.75,'rgba(60,8,0,0.06)');
     baseGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=baseGlow;ctx.fillRect(0,0,W,H);

     /* ── Rayons de lumière ── */
     const rayOriginX=figX, rayOriginY=figY-figH*0.45;
     for(const ray of rays){
      ray.pulse+=ray.pulseSpd;
      const ro=ray.op*(0.55+0.45*Math.abs(Math.sin(ray.pulse)));
      /* Gradient le long du rayon */
      const ex=rayOriginX+Math.cos(ray.angle)*ray.len;
      const ey=rayOriginY+Math.sin(ray.angle)*ray.len;
      const rg=ctx.createLinearGradient(rayOriginX,rayOriginY,ex,ey);
      /* Couleur : blanc chaud → orange → rouge → transparent */
      rg.addColorStop(0,`rgba(255,235,160,${ro*1.0})`);
      rg.addColorStop(0.08,`rgba(255,${160+Math.sin(ray.pulse)*20|0},50,${ro*0.95})`);
      rg.addColorStop(0.30,`rgba(220,75,12,${ro*0.65})`);
      rg.addColorStop(0.65,`rgba(150,28,6,${ro*0.28})`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      /* Dessin du cône de rayon */
      const halfW=ray.width;
      const a1=ray.angle-halfW, a2=ray.angle+halfW;
      ctx.beginPath();
      ctx.moveTo(rayOriginX,rayOriginY);
      ctx.lineTo(rayOriginX+Math.cos(a1)*ray.len, rayOriginY+Math.sin(a1)*ray.len);
      ctx.lineTo(ex,ey);
      ctx.lineTo(rayOriginX+Math.cos(a2)*ray.len, rayOriginY+Math.sin(a2)*ray.len);
      ctx.closePath();
      ctx.fillStyle=rg;ctx.fill();
     }

     /* ── Silhouette de l'enfant — noire, sur les rayons ── */
     drawSilhouette(figX, figY, figH, 1.0);

     /* ── Halo de contour — liseré orange brûlant autour de la silhouette ── */
     /* Léger glow de bord */
     ctx.save();
     ctx.globalCompositeOperation='screen';
     const edgeGlow=ctx.createRadialGradient(figX,figY-figH*0.42,figH*0.06,figX,figY-figH*0.42,figH*0.70);
     edgeGlow.addColorStop(0,'rgba(0,0,0,0)');
     edgeGlow.addColorStop(0.80,'rgba(0,0,0,0)');
     edgeGlow.addColorStop(0.92,`rgba(255,${100+Math.sin(t*0.8)*20|0},10,${0.45+Math.sin(t*0.6)*0.08})`);
     edgeGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=edgeGlow;ctx.beginPath();ctx.ellipse(figX,figY-figH*0.42,figH*0.30,figH*0.72,0,0,Math.PI*2);ctx.fill();
     ctx.globalCompositeOperation='source-over';
     ctx.restore();

     /* ── Souffle condensé — cold breath ── */
     const bp=(breathT%3.2)/3.2;
     if(bp<0.55){
      const bpn=bp/0.55; /* 0→1 */
      const breathG=ctx.createRadialGradient(
       figX+W*0.018, figY-figH*0.90,
       0,
       figX+W*0.022+bpn*W*0.055, figY-figH*0.93,
       W*(0.018+bpn*0.045)
      );
      breathG.addColorStop(0,`rgba(255,200,160,${0.18*(1-bpn)})`);
      breathG.addColorStop(0.5,`rgba(200,140,80,${0.08*(1-bpn)})`);
      breathG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=breathG;
      ctx.fillRect(figX-W*0.02,figY-figH*1.02,W*0.14,H*0.08);
     }

     /* ── Points rouges — signature ── */
     for(const d of redDots){
      d.ph+=d.spd;
      d.x+=d.vx; d.y+=d.vy;
      if(d.x<0)d.x=W; if(d.x>W)d.x=0;
      if(d.y<0){d.y=H*(0.3+Math.random()*0.6);d.x=Math.random()*W;}
      const da=d.op*(0.3+0.7*Math.abs(Math.sin(d.ph)));
      /* Petit halo rouge */
      const dg=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*4);
      dg.addColorStop(0,`rgba(220,15,15,${da})`);
      dg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=dg;ctx.beginPath();ctx.arc(d.x,d.y,d.r*4,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,20,20,${da})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Poussière froide ── */
     for(const m of dustMotes){
      m.ph+=m.spd; m.x+=m.vx; m.y+=m.vy;
      if(m.x<0)m.x=W; if(m.x>W)m.x=0;
      if(m.y<0){m.y=H; m.x=Math.random()*W;}
      const ma=m.op*(0.4+0.6*Math.abs(Math.sin(m.ph)));
      const col=m.warm?`rgba(255,180,120,${ma})`:`rgba(160,180,220,${ma})`;
      ctx.fillStyle=col;
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Braises montantes ── */
     for(const e of embers){
      e.ph+=e.spd; e.x+=e.vx; e.y+=e.vy;
      if(e.y<H*0.05){e.y=H*(0.55+Math.random()*0.25);e.x=cx+(Math.random()-0.5)*W*0.30;}
      const ea=e.op*(0.5+0.5*Math.abs(Math.sin(e.ph)));
      const eg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r*5);
      eg.addColorStop(0,`rgba(255,140,20,${ea})`);
      eg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eg;ctx.beginPath();ctx.arc(e.x,e.y,e.r*5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,200,80,${ea})`;
      ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette sombre sur les bords ── */
     const vg=ctx.createRadialGradient(cx,H*0.46,H*0.12,cx,H*0.46,H*0.78);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(0,0,0,0.02)');
     vg.addColorStop(0.80,'rgba(0,0,0,0.35)');
     vg.addColorStop(1,'rgba(0,0,0,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
