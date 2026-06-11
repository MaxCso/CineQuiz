// CinéQuiz splash chunk — Donnie Darko
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Donnie Darko"]={
   name:'Donnie Darko',
   color:'40,60,160',
   ref:'Donnie Darko \u2014 Richard Kelly, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── CSS ── */
    let _dd=document.getElementById('_dd_s');
    if(!_dd){_dd=document.createElement('style');_dd.id='_dd_s';document.head.appendChild(_dd);}
    _dd.textContent=`
     

     #splash-content-wrap{top:25%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{
       color:rgba(195,210,240,0.90)!important;
       text-shadow:0 2px 18px rgba(0,0,0,1),0 0 32px rgba(80,100,200,0.40)!important;
       font-style:italic!important;
     }
     #splash-film-logo{
       filter:drop-shadow(0 4px 24px rgba(0,0,0,0.98)) drop-shadow(0 0 14px rgba(80,100,220,0.35))!important;
     }
    `;
    const _ddW=setInterval(()=>{if(stop.v){_dd.textContent='';clearInterval(_ddW);}},200);

    /* ── Étoiles ── */
    const stars=Array.from({length:160},()=>({
     x:Math.random()*W, y:Math.random()*H*0.80,
     r:Math.random()*1.1+0.12,
     op:Math.random()*0.65+0.12,
     ph:Math.random()*Math.PI*2,
     spd:0.008+Math.random()*0.025,
    }));

    /* ── Nuages nocturnes ── */
    const clouds=Array.from({length:5},(_,i)=>({
     x:Math.random()*W*1.4-W*0.2,
     y:H*(0.08+i*0.10),
     w:W*(0.35+Math.random()*0.45),
     h:H*(0.055+Math.random()*0.040),
     vx:0.08+Math.random()*0.12,
     op:0.08+Math.random()*0.14,
    }));

    /* ── Particules du vortex temporel ── */
    const vortexPts=Array.from({length:180},(_,i)=>({
     angle:(i/180)*Math.PI*2,
     radius:W*(0.12+Math.random()*0.28),
     speed:0.008+Math.random()*0.018,
     dir:Math.random()<0.5?1:-1,
     op:0.20+Math.random()*0.55,
     size:W*(0.005+Math.random()*0.010),
     layer:Math.floor(Math.random()*4),
    }));

    /* ── Traînées temporelles (spear) ── */
    const spears=Array.from({length:8},(_,i)=>({
     angle:(i/8)*Math.PI*2+Math.PI/6,
     len:0,
     maxLen:W*(0.38+Math.random()*0.28),
     speed:W*0.0045,
     op:0.30+Math.random()*0.35,
     width:W*(0.006+Math.random()*0.007),
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Avion ── */
    const plane={
     x:-W*0.12, y:H*0.22,
     vx:W*0.0025,
     op:0,
     trailPts:[],
    };
    let planeActive=false;
    setTimeout(()=>planeActive=true, 4000);

    /* ── Frank le lapin — silhouette ── */
    function drawFrank(){
     const fx=cx, fy=H*0.92;
     const h=H*0.38;
     ctx.save();ctx.translate(fx,fy);

     // Halo inquiétant
     const haloG=ctx.createRadialGradient(0,-h*0.45,0,0,-h*0.45,W*0.42);
     haloG.addColorStop(0,`rgba(55,65,160,${0.32+Math.sin(t*0.15)*0.06})`);
     haloG.addColorStop(0.5,'rgba(35,42,120,0.12)');
     haloG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=haloG;
     ctx.beginPath();ctx.ellipse(0,-h*0.45,W*0.42,h*0.90,0,0,Math.PI*2);ctx.fill();

     ctx.fillStyle='rgba(4,5,15,0.98)';

     // Jambes
     ctx.beginPath();
     ctx.moveTo(-W*0.028,0);ctx.lineTo(-W*0.032,-h*0.42);
     ctx.lineTo(-W*0.008,-h*0.42);ctx.lineTo(-W*0.004,0);
     ctx.closePath();ctx.fill();
     ctx.beginPath();
     ctx.moveTo(W*0.004,0);ctx.lineTo(W*0.008,-h*0.42);
     ctx.lineTo(W*0.032,-h*0.42);ctx.lineTo(W*0.028,0);
     ctx.closePath();ctx.fill();

     // Corps
     ctx.beginPath();
     ctx.moveTo(-W*0.035,-h*0.42);
     ctx.bezierCurveTo(-W*0.040,-h*0.62,-W*0.038,-h*0.76,-W*0.022,-h*0.82);
     ctx.lineTo(W*0.022,-h*0.82);
     ctx.bezierCurveTo(W*0.038,-h*0.76,W*0.040,-h*0.62,W*0.035,-h*0.42);
     ctx.closePath();ctx.fill();

     // Bras — légèrement écartés
     ctx.beginPath();
     ctx.moveTo(-W*0.035,-h*0.72);
     ctx.bezierCurveTo(-W*0.060,-h*0.65,-W*0.068,-h*0.52,-W*0.058,-h*0.40);
     ctx.lineTo(-W*0.042,-h*0.42);
     ctx.bezierCurveTo(-W*0.050,-h*0.52,-W*0.044,-h*0.63,-W*0.020,-h*0.70);
     ctx.closePath();ctx.fill();
     ctx.beginPath();
     ctx.moveTo(W*0.035,-h*0.72);
     ctx.bezierCurveTo(W*0.060,-h*0.65,W*0.068,-h*0.52,W*0.058,-h*0.40);
     ctx.lineTo(W*0.042,-h*0.42);
     ctx.bezierCurveTo(W*0.050,-h*0.52,W*0.044,-h*0.63,W*0.020,-h*0.70);
     ctx.closePath();ctx.fill();

     // Tête — masque de lapin
     const headY=-h*0.96, headR=h*0.072;
     ctx.beginPath();ctx.arc(0,headY,headR,0,Math.PI*2);ctx.fill();

     // Oreilles de lapin — longues et effilées
     ctx.beginPath();
     ctx.moveTo(-headR*0.55,headY-headR*0.60);
     ctx.bezierCurveTo(-headR*0.75,headY-headR*2.8,-headR*0.50,headY-headR*3.6,-headR*0.25,headY-headR*3.4);
     ctx.bezierCurveTo(headR*0.02,headY-headR*3.2,headR*0.05,headY-headR*2.4,-headR*0.20,headY-headR*0.70);
     ctx.closePath();ctx.fill();
     ctx.beginPath();
     ctx.moveTo(headR*0.55,headY-headR*0.60);
     ctx.bezierCurveTo(headR*0.75,headY-headR*2.8,headR*0.50,headY-headR*3.6,headR*0.25,headY-headR*3.4);
     ctx.bezierCurveTo(-headR*0.02,headY-headR*3.2,-headR*0.05,headY-headR*2.4,headR*0.20,headY-headR*0.70);
     ctx.closePath();ctx.fill();

     // Yeux — deux points lumineux rouges
     ctx.fillStyle=`rgba(200,40,40,${0.75+Math.sin(t*0.20)*0.18})`;
     ctx.beginPath();ctx.arc(-headR*0.35,headY-headR*0.12,headR*0.14,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(headR*0.35,headY-headR*0.12,headR*0.14,0,Math.PI*2);ctx.fill();
     // Lueur des yeux
     const eyeG=ctx.createRadialGradient(0,headY-headR*0.12,0,0,headY-headR*0.12,headR*0.80);
     eyeG.addColorStop(0,`rgba(200,40,40,${0.15+Math.sin(t*0.20)*0.06})`);
     eyeG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=eyeG;
     ctx.beginPath();ctx.ellipse(0,headY-headR*0.12,headR*0.80,headR*0.50,0,0,Math.PI*2);ctx.fill();

     // Traînée temporelle du torse
     const spearX=0, spearY=-h*0.60;
     const spearLen=h*0.18*(0.6+0.4*Math.sin(t*0.8));
     const spearG=ctx.createRadialGradient(spearX,spearY,0,spearX,spearY,spearLen*1.5);
     spearG.addColorStop(0,`rgba(120,140,255,${0.55+Math.sin(t*1.2)*0.12})`);
     spearG.addColorStop(0.4,`rgba(80,100,210,0.22)`);
     spearG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=spearG;
     ctx.beginPath();ctx.ellipse(spearX,spearY,spearLen*0.6,spearLen,0,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    /* ── Vortex temporel ── */
    function drawVortex(){
     const vx=cx, vy=H*0.60;
     const baseR=W*(0.40+Math.sin(t*0.12)*0.012);

     // Couches concentriques
     for(let layer=4;layer>=0;layer--){
      const lr=baseR*(0.3+layer*0.18);
      const alpha=0.06+layer*0.03;
      const vgL=ctx.createRadialGradient(vx,vy,lr*0.5,vx,vy,lr);
      vgL.addColorStop(0,`rgba(${60+layer*20},${80+layer*18},${200+layer*8},${alpha+Math.sin(t*0.15+layer)*0.02})`);
      vgL.addColorStop(0.6,`rgba(${40+layer*12},${55+layer*12},${175+layer*5},${alpha*0.4})`);
      vgL.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=vgL;
      ctx.beginPath();ctx.arc(vx,vy,lr,0,Math.PI*2);ctx.fill();
     }

     // Spirale centrale
     ctx.save();ctx.translate(vx,vy);
     for(let arm=0;arm<3;arm++){
      const armAngle=(arm/3)*Math.PI*2+t*0.25;
      ctx.strokeStyle=`rgba(100,130,255,${0.30+Math.sin(t*0.20+arm)*0.08})`;
      ctx.lineWidth=W*0.006;ctx.lineCap='round';
      ctx.beginPath();
      for(let i=0;i<80;i++){
       const s=i/80;
       const r=baseR*0.85*s;
       const a=armAngle+s*Math.PI*4.5;
       const px2=Math.cos(a)*r, py2=Math.sin(a)*r;
       if(i===0)ctx.moveTo(px2,py2);else ctx.lineTo(px2,py2);
      }
      ctx.stroke();
     }

     // Particules orbitales — coordonnées relatives au translate(vx,vy)
     for(const p of vortexPts){
      p.angle+=p.speed*p.dir;
      const orbitR=baseR*(0.15+p.layer*0.22);
      const px2=Math.cos(p.angle)*orbitR*(1+Math.sin(t*0.3+p.angle)*0.08);
      const py2=Math.sin(p.angle)*orbitR*(1+Math.cos(t*0.25+p.angle)*0.06);
      const pulse=0.6+0.4*Math.sin(t*1.5+p.angle*3);
      ctx.fillStyle=`rgba(${100+p.layer*30},${130+p.layer*25},255,${p.op*pulse})`;
      ctx.beginPath();ctx.arc(px2,py2,p.size*(0.5+0.5*pulse),0,Math.PI*2);ctx.fill();
     }

     // Traînées depuis le vortex
     for(const sp of spears){
      sp.len+=sp.speed;
      if(sp.len>sp.maxLen){sp.len=0;sp.angle=(Math.random()*Math.PI*2);}
      sp.ph+=0.04;
      const ex2=Math.cos(sp.angle)*sp.len;
      const ey2=Math.sin(sp.angle)*sp.len;
      const trailG=ctx.createLinearGradient(0,0,ex2,ey2);
      trailG.addColorStop(0,`rgba(130,160,255,${sp.op*(0.7+0.3*Math.sin(sp.ph))})`);
      trailG.addColorStop(0.6,`rgba(90,110,220,${sp.op*0.35})`);
      trailG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.strokeStyle=trailG;ctx.lineWidth=sp.width;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(ex2,ey2);ctx.stroke();
     }
     ctx.restore();
    }

    /* ── Avion ── */
    function drawPlane(){
     if(!planeActive)return;
     plane.x+=plane.vx;
     plane.op=Math.min(1,plane.op+0.015);
     if(plane.x>W*1.15){
      plane.x=-W*0.12;plane.y=H*(0.15+Math.random()*0.15);plane.op=0;
     }

     // Trail
     plane.trailPts.push({x:plane.x,y:plane.y});
     if(plane.trailPts.length>80)plane.trailPts.shift();

     ctx.save();ctx.globalAlpha=plane.op*0.55;
     for(let i=1;i<plane.trailPts.length;i++){
      const fade=i/plane.trailPts.length;
      ctx.strokeStyle=`rgba(180,195,240,${fade*0.40})`;
      ctx.lineWidth=W*0.003*fade;
      ctx.beginPath();
      ctx.moveTo(plane.trailPts[i-1].x,plane.trailPts[i-1].y);
      ctx.lineTo(plane.trailPts[i].x,plane.trailPts[i].y);
      ctx.stroke();
     }
     ctx.restore();

     // Corps avion
     ctx.save();ctx.translate(plane.x,plane.y);ctx.globalAlpha=plane.op*0.72;
     ctx.fillStyle='rgba(200,210,235,0.88)';
     // Fuselage
     ctx.beginPath();
     ctx.ellipse(0,0,W*0.035,W*0.007,0,0,Math.PI*2);ctx.fill();
     // Ailes
     ctx.beginPath();
     ctx.moveTo(-W*0.008,-W*0.001);
     ctx.lineTo(-W*0.002,-W*0.018);
     ctx.lineTo(W*0.010,-W*0.001);
     ctx.closePath();ctx.fill();
     ctx.beginPath();
     ctx.moveTo(-W*0.008,W*0.001);
     ctx.lineTo(-W*0.002,W*0.018);
     ctx.lineTo(W*0.010,W*0.001);
     ctx.closePath();ctx.fill();
     // Queue
     ctx.beginPath();
     ctx.moveTo(-W*0.028,-W*0.001);
     ctx.lineTo(-W*0.022,-W*0.008);
     ctx.lineTo(-W*0.018,-W*0.001);
     ctx.closePath();ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── CIEL NOCTURNE ── */
     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0,'rgba(4,5,16,1)');
     sky.addColorStop(0.30,'rgba(6,8,22,1)');
     sky.addColorStop(0.55,'rgba(8,10,28,1)');
     sky.addColorStop(0.78,'rgba(6,8,20,1)');
     sky.addColorStop(1,'rgba(4,5,14,1)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

     /* Lueur bleue-violette générale */
     const ambG=ctx.createRadialGradient(cx,H*0.45,0,cx,H*0.45,W*0.80);
     ambG.addColorStop(0,`rgba(30,40,110,${0.22+Math.sin(t*0.08)*0.04})`);
     ambG.addColorStop(0.45,'rgba(18,24,75,0.10)');
     ambG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ambG;ctx.fillRect(0,0,W,H);

     /* ── NUAGES ── */
     for(const c of clouds){
      c.x+=c.vx;
      if(c.x>W*1.3)c.x=-c.w;
      const cG=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.w*0.5);
      cG.addColorStop(0,`rgba(20,28,65,${c.op})`);
      cG.addColorStop(0.6,`rgba(14,20,50,${c.op*0.5})`);
      cG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cG;
      ctx.beginPath();ctx.ellipse(c.x,c.y,c.w*0.5,c.h,0,0,Math.PI*2);ctx.fill();
     }

     /* ── ÉTOILES ── */
     for(const s of stars){
      s.ph+=s.spd;
      const pulse=0.55+0.45*Math.sin(s.ph);
      ctx.fillStyle=`rgba(200,210,240,${s.op*pulse})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*(0.7+0.3*pulse),0,Math.PI*2);ctx.fill();
     }

     /* ── VORTEX ── */
     drawVortex();

     /* ── AVION ── */
     drawPlane();

     /* ── FRANK ── */
     drawFrank();

     /* ── VIGNETTE ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.06,cx,H*0.48,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(2,3,10,0.05)');
     vg.addColorStop(0.62,'rgba(2,3,10,0.38)');
     vg.addColorStop(0.82,'rgba(1,2,8,0.72)');
     vg.addColorStop(1,'rgba(1,1,6,0.95)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Bande top */
     const tb=ctx.createLinearGradient(0,0,0,H*0.15);
     tb.addColorStop(0,'rgba(4,5,16,0.90)');
     tb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tb;ctx.fillRect(0,0,W,H*0.15);

     /* Grain film */
     for(let i=0;i<22;i++){
      const gv=2+Math.random()*8|0;
      ctx.fillStyle=`rgba(${gv+6},${gv+8},${gv+18},${Math.random()*0.012})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
