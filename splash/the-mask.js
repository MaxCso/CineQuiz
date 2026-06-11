// CinéQuiz splash chunk — The Mask
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["The Mask"]={
   name:'The Mask',
   color:'40,180,40',
   ref:'The Mask \u2014 Chuck Russell, 1994',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2,cy=H*0.42;
    let _s=document.getElementById('_msk_s');
    if(!_s){_s=document.createElement('style');_s.id='_msk_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:67%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    function _mskCleanup(){
      _s.textContent='';
      ['_msk_hat','_msk_vig','_msk_hat_s'].forEach(id=>{const el=document.getElementById(id);if(el&&el.parentNode)el.parentNode.removeChild(el);});
    }
    const _w=setInterval(()=>{if(stop.v){_mskCleanup();clearInterval(_w);}},200);

    /* ══ NIGHTCLUB CUBAIN — univers The Mask ══ */

    /* Couleurs fête */
    const CONF_COLS=['255,60,120','255,210,0','0,220,120','100,80,255','255,140,0','0,210,255','255,255,255'];

    /* ── Confettis ── */
    const confetti=Array.from({length:90},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vy:0.8+Math.random()*1.4, vx:(Math.random()-0.5)*0.8,
     rot:Math.random()*Math.PI*2, vrot:(Math.random()-0.5)*0.12,
     w:W*(0.012+Math.random()*0.016), h:W*(0.005+Math.random()*0.006),
     col:CONF_COLS[Math.floor(Math.random()*CONF_COLS.length)],
     ph:Math.random()*Math.PI*2, wob:0.008+Math.random()*0.012,
    }));

    /* ── Spots de lumière balayants ── */
    const spots=[
     {angle:0,    spd:0.018, col:'255,60,180',  r:W*0.55, op:0.38},
     {angle:2.09, spd:-0.022,col:'255,200,0',   r:W*0.50, op:0.35},
     {angle:4.19, spd:0.015, col:'0,220,255',   r:W*0.48, op:0.32},
     {angle:1.0,  spd:-0.019,col:'120,80,255',  r:W*0.52, op:0.30},
    ];

    /* ── Ballons ── */
    const ballons=Array.from({length:12},()=>({
     x:Math.random()*W,
     y:H*0.60+Math.random()*H*0.45,
     vy:-(0.20+Math.random()*0.25),
     vx:(Math.random()-0.5)*0.20,
     r:W*(0.030+Math.random()*0.025),
     col:CONF_COLS[Math.floor(Math.random()*CONF_COLS.length)],
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Étoiles cartoon en fond ── */
    const bgStars=Array.from({length:18},()=>({
     x:Math.random()*W, y:Math.random()*H*0.55,
     r:W*(0.008+Math.random()*0.010),
     col:CONF_COLS[Math.floor(Math.random()*CONF_COLS.length)],
     ph:Math.random()*Math.PI*2, spd:0.04+Math.random()*0.06,
     rot:Math.random()*Math.PI*2,
    }));

    /* ── Notes de musique ── */
    const notes=Array.from({length:10},()=>({
     x:Math.random()*W, y:H*0.3+Math.random()*H*0.5,
     vy:-(0.40+Math.random()*0.60), vx:(Math.random()-0.5)*0.5,
     alpha:0.6+Math.random()*0.4,
     size:W*(0.030+Math.random()*0.028),
     type:Math.random()<0.5?'\u266a':'\u266b',
     col:CONF_COLS[Math.floor(Math.random()*CONF_COLS.length)],
     life:Math.random(),
    }));

    const FACE_Y=H*0.44;
    const FACE_S=W*0.0058;

    /* ── Visage The Mask qui groove ── */
    function drawFace(px,py,scale,alpha){
     ctx.save();
     ctx.translate(px,py);ctx.scale(scale,scale);ctx.globalAlpha=alpha;
     const groove=Math.sin(t*4.2)*0.12;
     const bounce=Math.abs(Math.sin(t*4.2))*(-4);
     ctx.rotate(groove);ctx.translate(0,bounce);
     /* Halo */
     const halo=ctx.createRadialGradient(0,0,10,0,0,72);
     halo.addColorStop(0,'rgba(80,255,40,0.35)');halo.addColorStop(0.5,'rgba(40,180,10,0.12)');halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.beginPath();ctx.ellipse(0,0,72,76,0,0,Math.PI*2);ctx.fill();
     /* Ombre */
     ctx.fillStyle='rgba(0,0,0,0.28)';ctx.beginPath();ctx.ellipse(4,52,28,8,0,0,Math.PI*2);ctx.fill();
     /* Contour noir */
     ctx.fillStyle='rgba(0,0,0,0.90)';
     ctx.beginPath();ctx.moveTo(0,-48);ctx.bezierCurveTo(-24,-48,-38,-31,-38,-10);ctx.bezierCurveTo(-38,10,-34,24,-22,34);ctx.bezierCurveTo(-13,42,-6,48,0,50);ctx.bezierCurveTo(6,48,13,42,22,34);ctx.bezierCurveTo(34,24,38,10,38,-10);ctx.bezierCurveTo(38,-31,24,-48,0,-48);ctx.closePath();ctx.fill();
     /* Peau verte */
     const faceG=ctx.createRadialGradient(-8,-20,4,-3,-12,46);
     faceG.addColorStop(0,'rgba(170,255,75,1)');faceG.addColorStop(0.35,'rgba(100,222,40,1)');faceG.addColorStop(0.65,'rgba(50,186,18,1)');faceG.addColorStop(1,'rgba(18,128,5,1)');
     ctx.fillStyle=faceG;
     ctx.beginPath();ctx.moveTo(0,-46);ctx.bezierCurveTo(-22,-46,-36,-30,-36,-10);ctx.bezierCurveTo(-36,9,-32,22,-21,32);ctx.bezierCurveTo(-12,40,-6,47,0,48);ctx.bezierCurveTo(6,47,12,40,21,32);ctx.bezierCurveTo(32,22,36,9,36,-10);ctx.bezierCurveTo(36,-30,22,-46,0,-46);ctx.closePath();ctx.fill();
     /* Reflet */
     const shine=ctx.createRadialGradient(-10,-32,0,-8,-28,22);shine.addColorStop(0,'rgba(215,255,165,0.45)');shine.addColorStop(1,'rgba(215,255,165,0)');
     ctx.fillStyle=shine;ctx.beginPath();ctx.ellipse(-8,-30,16,11,-0.3,0,Math.PI*2);ctx.fill();
     /* Rides */
     ctx.strokeStyle='rgba(18,108,5,0.32)';ctx.lineWidth=1.3;ctx.lineCap='round';
     for(let ri=0;ri<3;ri++){const ry=-36+ri*5;ctx.beginPath();ctx.moveTo(-14,ry);ctx.quadraticCurveTo(0,ry-2,14,ry);ctx.stroke();}
     /* Sourcils */
     ctx.strokeStyle='rgba(0,0,0,0.95)';ctx.lineWidth=5.0;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-28,-21);ctx.quadraticCurveTo(-18,-33,-6,-23);ctx.stroke();
     ctx.beginPath();ctx.moveTo(28,-21);ctx.quadraticCurveTo(18,-33,6,-23);ctx.stroke();
     /* Nez */
     ctx.fillStyle='rgba(14,104,4,0.52)';ctx.beginPath();ctx.ellipse(2,4,9,8,0,0,Math.PI*2);ctx.fill();
     const noseG=ctx.createRadialGradient(-1,2,0,0,4,11);noseG.addColorStop(0,'rgba(148,242,62,1)');noseG.addColorStop(1,'rgba(44,170,14,1)');
     ctx.fillStyle=noseG;ctx.beginPath();ctx.ellipse(1,3,10,9,0.1,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(0,0,0,0.48)';ctx.lineWidth=1.6;ctx.beginPath();ctx.ellipse(1,3,10,9,0.1,0,Math.PI*2);ctx.stroke();
     ctx.fillStyle='rgba(8,68,2,0.72)';
     ctx.beginPath();ctx.ellipse(-4.5,8,3.2,2.2,0.3,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(6.5,8,3.2,2.2,-0.3,0,Math.PI*2);ctx.fill();
     /* Yeux */
     const eyePop=1+0.25*Math.abs(Math.sin(t*2.2));
     ctx.fillStyle='rgba(8,78,2,0.30)';
     ctx.beginPath();ctx.ellipse(-16,-12,14*eyePop,16*eyePop,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(16,-12,14*eyePop,16*eyePop,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='#fffef0';
     ctx.beginPath();ctx.ellipse(-16,-12,12*eyePop,15*eyePop,0.10,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(16,-12,12*eyePop,15*eyePop,-0.10,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(0,0,0,0.80)';ctx.lineWidth=2.4;
     ctx.beginPath();ctx.ellipse(-16,-12,12*eyePop,15*eyePop,0.10,0,Math.PI*2);ctx.stroke();
     ctx.beginPath();ctx.ellipse(16,-12,12*eyePop,15*eyePop,-0.10,0,Math.PI*2);ctx.stroke();
     ctx.fillStyle='rgba(140,85,18,0.92)';
     ctx.beginPath();ctx.ellipse(-16,-11,6.5*eyePop,8*eyePop,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(16,-11,6.5*eyePop,8*eyePop,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='#040404';
     ctx.beginPath();ctx.ellipse(-16,-10.5,3.8*eyePop,4.8*eyePop,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(16,-10.5,3.8*eyePop,4.8*eyePop,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.95)';
     ctx.beginPath();ctx.ellipse(-18.5,-14,2.6,3.2,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(13.5,-14,2.6,3.2,0,0,Math.PI*2);ctx.fill();
     /* Joues */
     ctx.fillStyle='rgba(55,210,18,0.28)';
     ctx.beginPath();ctx.ellipse(-26,10,11,8,0.3,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(26,10,11,8,-0.3,0,Math.PI*2);ctx.fill();
     /* Sourire immense */
     ctx.fillStyle='rgba(5,54,2,0.66)';
     ctx.beginPath();ctx.moveTo(-24,20);ctx.bezierCurveTo(-26,14,-24,10,-20,9);ctx.bezierCurveTo(-10,5,10,5,20,9);ctx.bezierCurveTo(24,10,26,14,24,20);ctx.bezierCurveTo(26,30,22,42,0,44);ctx.bezierCurveTo(-22,42,-26,30,-24,20);ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(4,16,2,0.96)';
     ctx.beginPath();ctx.moveTo(-22,19);ctx.bezierCurveTo(-24,13,-22,10,-18,9);ctx.bezierCurveTo(-10,6,10,6,18,9);ctx.bezierCurveTo(22,10,24,13,22,19);ctx.bezierCurveTo(24,29,20,40,0,42);ctx.bezierCurveTo(-20,40,-24,29,-22,19);ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(18,140,6,1)';
     ctx.beginPath();ctx.moveTo(-22,19);ctx.bezierCurveTo(-14,11,-8,9,0,9);ctx.bezierCurveTo(8,9,14,11,22,19);ctx.bezierCurveTo(14,14,6,13,0,13);ctx.bezierCurveTo(-6,13,-14,14,-22,19);ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(22,155,8,1)';
     ctx.beginPath();ctx.moveTo(-18,38);ctx.bezierCurveTo(-8,43,8,43,18,38);ctx.bezierCurveTo(8,40,0,41,-18,38);ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(0,0,0,0.85)';ctx.lineWidth=2.8;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-24,19);ctx.bezierCurveTo(-26,13,-24,9,-20,8);ctx.bezierCurveTo(-10,4,10,4,20,8);ctx.bezierCurveTo(24,9,26,13,24,19);ctx.bezierCurveTo(26,30,22,42,0,44);ctx.bezierCurveTo(-22,42,-26,30,-24,19);ctx.stroke();
     /* Dents */
     ctx.fillStyle='rgba(255,252,225,1)';
     for(let i=-2;i<=1;i++){const tx=i*6+3;ctx.beginPath();ctx.roundRect(tx-2.7,10,5.4,13,2.0);ctx.fill();}
     ctx.strokeStyle='rgba(180,160,110,0.52)';ctx.lineWidth=0.9;
     for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(i*6+3+2.7,10);ctx.lineTo(i*6+3+2.7,23);ctx.stroke();}
     /* Chapeau de fête */
     ctx.save();ctx.translate(0,-46);
     ctx.fillStyle='rgba(255,210,0,0.95)';
     ctx.beginPath();ctx.moveTo(0,-32);ctx.lineTo(-14,0);ctx.lineTo(14,0);ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(0,0,0,0.70)';ctx.lineWidth=2;
     ctx.beginPath();ctx.moveTo(0,-32);ctx.lineTo(-14,0);ctx.lineTo(14,0);ctx.closePath();ctx.stroke();
     ctx.fillStyle='rgba(255,80,120,0.90)';
     for(const [hx,hy] of [[-4,-18],[4,-10],[0,-24],[-6,-8]]){ctx.beginPath();ctx.arc(hx,hy,2.2,0,Math.PI*2);ctx.fill();}
     ctx.fillStyle='rgba(255,80,120,0.95)';ctx.beginPath();ctx.arc(0,-33,4.5,0,Math.PI*2);ctx.fill();
     ctx.restore();
     ctx.restore();
    }

    /* ── Ballon ── */
    function drawBallon(bx,by,br,col){
     ctx.save();ctx.translate(bx,by);
     const bg=ctx.createRadialGradient(-br*0.30,-br*0.30,0,0,0,br);
     bg.addColorStop(0,`rgba(${col},1)`);bg.addColorStop(0.6,`rgba(${col},0.82)`);bg.addColorStop(1,`rgba(${col},0.50)`);
     ctx.fillStyle=bg;ctx.beginPath();ctx.ellipse(0,0,br,br*1.12,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.35)';ctx.beginPath();ctx.ellipse(-br*0.28,-br*0.30,br*0.22,br*0.16,-0.4,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle=`rgba(${col},0.88)`;ctx.lineWidth=1.5;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(0,br*1.12);ctx.bezierCurveTo(br*0.1,br*1.4,-br*0.1,br*1.7,0,br*2.0);ctx.stroke();
     ctx.restore();
    }

    /* ── Étoile 5 branches ── */
    function drawStar5(sx,sy,r1,r2,alpha,col,spin){
     ctx.save();ctx.translate(sx,sy);ctx.rotate(spin||0);ctx.globalAlpha=alpha;
     ctx.fillStyle=`rgba(${col},1)`;ctx.shadowColor=`rgba(${col},0.75)`;ctx.shadowBlur=r1*0.9;
     ctx.beginPath();
     for(let i=0;i<10;i++){const a=(i/10)*Math.PI*2-Math.PI/2;const r=i%2===0?r1:r2;i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}
     ctx.closePath();ctx.fill();ctx.restore();
    }

    /* ── Injection vignette ── */
    function _mskInject(){
     if(!document.getElementById('_msk_vig')){
      const v=document.createElement('div');v.id='_msk_vig';
      Object.assign(v.style,{position:'absolute',inset:'0',zIndex:'2',pointerEvents:'none',
       background:'radial-gradient(ellipse 75% 70% at 50% 44%, transparent 30%, rgba(0,12,2,.60) 100%)'});
      cv.parentElement.appendChild(v);
     }
    }
    const _splash=document.getElementById('splash');
    if(_splash&&_splash.classList.contains('curtain-open')){_mskInject();}
    else if(_splash){
     const _mskObs=new MutationObserver(()=>{if(_splash.classList.contains('curtain-open')){_mskObs.disconnect();_mskInject();}});
     _mskObs.observe(_splash,{attributes:true,attributeFilter:['class']});
     const _mskObsCleanup=stop.cleanup;
     stop.cleanup=function(){if(_mskObsCleanup)_mskObsCleanup();_mskObs.disconnect();};
    }

    function frame(){
     if(stop.v){_mskCleanup();return;}

     /* Fond nightclub — plus lumineux */
     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0,'#1a0830');sky.addColorStop(0.40,'#22103a');sky.addColorStop(0.75,'#0e2818');sky.addColorStop(1,'#081a10');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

     /* Parquet de danse */
     const FLOOR_Y=H*0.75;
     const floorG=ctx.createLinearGradient(0,FLOOR_Y,0,H);
     floorG.addColorStop(0,'#3a1850');floorG.addColorStop(0.4,'#2a1238');floorG.addColorStop(1,'#140a22');
     ctx.fillStyle=floorG;ctx.fillRect(0,FLOOR_Y,W,H-FLOOR_Y);
     const TILE=W*0.115;
     for(let row=0;row<4;row++){
      for(let col=0;col<10;col++){
       const tx=col*TILE-TILE/2,ty=FLOOR_Y+row*TILE*0.55;
       const tp=Math.sin(t*2.8+col*0.7+row*1.3);
       if(tp>0.5){const tc=CONF_COLS[(col+row)%CONF_COLS.length];ctx.fillStyle=`rgba(${tc},${(tp-0.5)*0.18})`;ctx.fillRect(tx+1,ty+1,TILE-2,TILE*0.55-2);}
      }
     }

     /* Spots de lumière balayants */
     for(const sp of spots){
      sp.angle+=sp.spd;
      const tx=cx+Math.cos(sp.angle)*sp.r*0.5;
      const ty=H*0.10+Math.sin(sp.angle*0.7)*H*0.08;
      const cone=ctx.createRadialGradient(tx,ty,0,tx,ty+H*0.60,W*0.28);
      cone.addColorStop(0,`rgba(${sp.col},${sp.op})`);cone.addColorStop(0.4,`rgba(${sp.col},${sp.op*0.40})`);cone.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cone;ctx.fillRect(0,0,W,H);
      const src=ctx.createRadialGradient(tx,ty,0,tx,ty,W*0.08);
      src.addColorStop(0,`rgba(${sp.col},1.0)`);src.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=src;ctx.fillRect(tx-W*0.06,ty-W*0.06,W*0.12,W*0.12);
     }

     /* Boule disco */
     const discoX=cx,discoY=H*0.10,discoR=W*0.055;
     const discoBg=ctx.createRadialGradient(discoX-discoR*0.3,discoY-discoR*0.3,0,discoX,discoY,discoR);
     discoBg.addColorStop(0,'rgba(200,200,200,0.90)');discoBg.addColorStop(0.6,'rgba(120,120,130,0.88)');discoBg.addColorStop(1,'rgba(50,50,55,0.90)');
     ctx.fillStyle=discoBg;ctx.beginPath();ctx.arc(discoX,discoY,discoR,0,Math.PI*2);ctx.fill();
     for(let mi=0;mi<7;mi++){for(let mj=0;mj<7;mj++){
      const mt=(mi/7)*Math.PI-Math.PI/2,mp=(mj/7)*Math.PI*2+t*0.8;
      const mx2=discoX+discoR*Math.cos(mt)*Math.cos(mp),my2=discoY+discoR*Math.sin(mt);
      const ms=discoR*0.14,ml=0.3+0.7*((mi+mj)%2);
      ctx.fillStyle=`rgba(255,255,255,${ml*0.55})`;ctx.fillRect(mx2-ms/2,my2-ms/2,ms,ms);
     }}
     for(let ri=0;ri<8;ri++){
      const ra=t*1.2+(ri/8)*Math.PI*2;
      const rx=discoX+Math.cos(ra)*W*0.42,ry=discoY+Math.sin(ra)*H*0.28;
      const rg=ctx.createRadialGradient(rx,ry,0,rx,ry,W*0.022);
      const rc=CONF_COLS[ri%CONF_COLS.length];
      rg.addColorStop(0,`rgba(${rc},0.55)`);rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;ctx.beginPath();ctx.arc(rx,ry,W*0.022,0,Math.PI*2);ctx.fill();
     }
     ctx.strokeStyle='rgba(140,140,150,0.70)';ctx.lineWidth=2;
     ctx.beginPath();ctx.moveTo(discoX,0);ctx.lineTo(discoX,discoY-discoR);ctx.stroke();

     /* Ballons */
     for(const b of ballons){
      b.y+=b.vy;b.x+=b.vx;b.ph+=0.02;b.x+=Math.sin(b.ph)*0.3;
      if(b.y<-b.r*3){b.y=H+b.r;b.x=Math.random()*W;}
      drawBallon(b.x,b.y,b.r,b.col);
     }

     /* Étoiles cartoon */
     for(const s of bgStars){
      s.ph+=s.spd;s.rot+=0.04;
      drawStar5(s.x,s.y,s.r,s.r*0.40,0.4+0.6*Math.abs(Math.sin(s.ph)),s.col,s.rot);
     }

     /* Confettis */
     for(const c of confetti){
      c.y+=c.vy;c.x+=c.vx;c.rot+=c.vrot;c.ph+=c.wob;c.x+=Math.sin(c.ph)*0.6;
      if(c.y>H+10){c.y=-10;c.x=Math.random()*W;}
      ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);
      ctx.fillStyle=`rgba(${c.col},0.88)`;ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);
      ctx.restore();
     }

     /* Notes de musique */
     for(const n of notes){
      n.y+=n.vy;n.x+=n.vx;n.life+=0.010;
      const nAlpha=n.alpha*(1-Math.min(1,n.life));
      if(n.life>=1||nAlpha<0.02){
       n.x=W*0.10+Math.random()*W*0.80;n.y=H*0.40+Math.random()*H*0.30;n.life=0;
       n.vy=-(0.35+Math.random()*0.55);n.vx=(Math.random()-0.5)*0.5;
       n.col=CONF_COLS[Math.floor(Math.random()*CONF_COLS.length)];
       n.type=Math.random()<0.5?'\u266a':'\u266b';
      }
      ctx.save();ctx.globalAlpha=nAlpha;
      ctx.fillStyle=`rgba(${n.col},1)`;ctx.shadowColor=`rgba(${n.col},0.70)`;ctx.shadowBlur=n.size*0.8;
      ctx.font=`bold ${n.size*1.2}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(n.type,n.x,n.y);ctx.restore();
     }

     /* Visage qui groove */
     const faceGlowR=W*0.42*(1+0.05*Math.sin(t*1.8));
     const fg=ctx.createRadialGradient(cx,FACE_Y,0,cx,FACE_Y,faceGlowR);
     fg.addColorStop(0,'rgba(60,220,25,0.50)');fg.addColorStop(0.35,'rgba(35,150,10,0.25)');fg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=fg;ctx.fillRect(cx-faceGlowR,FACE_Y-faceGlowR,faceGlowR*2,faceGlowR*2);
     drawFace(cx,FACE_Y,FACE_S,1.0);

     /* Vignette */
     const vig=ctx.createRadialGradient(cx,H*0.44,H*0.20,cx,H*0.44,H*0.82);
     vig.addColorStop(0,'rgba(0,0,0,0)');vig.addColorStop(0.5,'rgba(0,0,0,0)');vig.addColorStop(1,'rgba(0,0,0,0.55)');
     ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
