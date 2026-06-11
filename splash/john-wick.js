// CinéQuiz splash chunk — John Wick
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["John Wick"]={
   name:'John Wick',
   color:'40,80,160',
   ref:'John Wick \u2014 Chad Stahelski, 2014',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_jw_s');
    if(!_s){_s=document.createElement('style');_s.id='_jw_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── SVG silhouette blanche ── */
    const jwImg=new Image();let jwReady=false;
    jwImg.onload=()=>{jwReady=true;};
    jwImg.src='images/JW.svg';;

    /* ── Douilles dorées en chute ── */
    const shells=Array.from({length:38},()=>{
     const z=0.3+Math.random()*0.7;
     return{x:Math.random()*W,y:Math.random()*H-H,
      vy:1.8+z*3.2,vx:(Math.random()-0.5)*0.6,
      rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-0.5)*0.07,
      len:W*(0.022+z*0.018),thick:W*(0.003+z*0.002),z};
    });

    /* ── Pluie fine ── */
    const rain=Array.from({length:60},()=>{
     return{x:Math.random()*W*1.2-W*0.1,y:Math.random()*H,
      vy:14+Math.random()*8,vx:-2-Math.random()*1.2,
      len:H*(0.025+Math.random()*0.020),op:0.06+Math.random()*0.10};
    });

    /* ── Particules de fumée ── */
    const smoke=Array.from({length:18},()=>{
     return{x:Math.random()*W,y:H*(0.30+Math.random()*0.55),
      vx:(Math.random()-0.5)*0.20,vy:-(0.08+Math.random()*0.15),
      r:W*(0.04+Math.random()*0.06),op:0.04+Math.random()*0.06,
      ph:Math.random()*Math.PI*2};
    });

    function frame(){
     if(stop.v)return;

     /* ── CIEL — bleu-cyan fumeux comme l'affiche ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#050e18');
     bg.addColorStop(0.20,'#071828');
     bg.addColorStop(0.45,'#0a2035');
     bg.addColorStop(0.70,'#071828');
     bg.addColorStop(1.00,'#030c14');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo cyan principal — lumière sur la scène */
     const cyanG=ctx.createRadialGradient(cx*0.85,H*0.28,0,cx*0.85,H*0.28,W*0.80);
     cyanG.addColorStop(0,`rgba(30,140,180,${0.30+Math.sin(t*0.22)*0.04})`);
     cyanG.addColorStop(0.25,'rgba(20,100,145,0.16)');
     cyanG.addColorStop(0.55,'rgba(10,65,110,0.07)');
     cyanG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cyanG;ctx.fillRect(0,0,W,H);

     /* Halo secondaire légèrement décalé */
     const cyanG2=ctx.createRadialGradient(cx*1.20,H*0.42,0,cx*1.20,H*0.42,W*0.55);
     cyanG2.addColorStop(0,`rgba(15,110,160,${0.20+Math.sin(t*0.28+1.2)*0.04})`);
     cyanG2.addColorStop(0.4,'rgba(8,70,120,0.08)');
     cyanG2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cyanG2;ctx.fillRect(0,0,W,H);

     /* Halo feu/explosion orange bas-gauche — comme l'affiche */
     const fireG=ctx.createRadialGradient(W*0.12,H*0.76,0,W*0.12,H*0.76,W*0.38);
     fireG.addColorStop(0,`rgba(255,140,20,${0.25+Math.sin(t*0.40)*0.06})`);
     fireG.addColorStop(0.25,'rgba(220,80,10,0.12)');
     fireG.addColorStop(0.55,'rgba(160,40,0,0.05)');
     fireG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=fireG;ctx.fillRect(0,0,W,H);

     /* ── Fumée — volutes bleutées ── */
     for(const s of smoke){
      s.x+=s.vx;s.y+=s.vy;s.ph+=0.015;s.r+=0.06;s.op*=0.9992;
      if(s.r>W*0.18||s.op<0.005){
       s.x=Math.random()*W;s.y=H*(0.45+Math.random()*0.40);
       s.r=W*(0.04+Math.random()*0.04);s.op=0.04+Math.random()*0.05;
       s.vx=(Math.random()-0.5)*0.20;s.vy=-(0.08+Math.random()*0.12);
      }
      ctx.fillStyle=`rgba(25,80,130,${s.op*(0.5+0.5*Math.sin(s.ph))})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Sol mouillé — reflets ── */
     const groundY=H*0.80;
     const groundG=ctx.createLinearGradient(0,groundY,0,H);
     groundG.addColorStop(0,'rgba(5,18,30,0.95)');
     groundG.addColorStop(0.3,'rgba(4,14,24,1)');
     groundG.addColorStop(1,'rgba(2,8,14,1)');
     ctx.fillStyle=groundG;ctx.fillRect(0,groundY,W,H-groundY);

     /* Reflet cyan sur sol mouillé */
     const reflG=ctx.createRadialGradient(cx*0.85,groundY+H*0.04,0,cx*0.85,groundY+H*0.04,W*0.55);
     reflG.addColorStop(0,`rgba(20,100,150,${0.18+Math.sin(t*0.22)*0.04})`);
     reflG.addColorStop(0.4,'rgba(12,65,110,0.08)');
     reflG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=reflG;ctx.fillRect(0,groundY,W,H-groundY);

     /* Reflet feu sur sol */
     const reflFire=ctx.createRadialGradient(W*0.12,groundY+H*0.02,0,W*0.12,groundY+H*0.02,W*0.28);
     reflFire.addColorStop(0,`rgba(240,120,10,${0.14+Math.sin(t*0.40)*0.04})`);
     reflFire.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=reflFire;ctx.fillRect(0,groundY,W,H-groundY);

     /* ── Pluie ── */
     ctx.lineCap='round';
     for(const r of rain){
      r.x+=r.vx;r.y+=r.vy;
      if(r.y>H+10){r.y=-20;r.x=Math.random()*W*1.2-W*0.1;}
      ctx.strokeStyle=`rgba(100,160,200,${r.op})`;
      ctx.lineWidth=0.6;
      ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+r.vx*0.35,r.y+r.len);ctx.stroke();
     }

     /* ── SVG silhouette blanche ── */
     if(jwReady){
      const svgSize=W*1.0;
      const svgX=cx-svgSize/2;
      const svgY=H*0.40;
      /* Légère lueur derrière la silhouette */
      const silGlow=ctx.createRadialGradient(cx,svgY+svgSize*0.45,0,cx,svgY+svgSize*0.45,svgSize*0.38);
      silGlow.addColorStop(0,'rgba(30,120,170,0.22)');
      silGlow.addColorStop(0.5,'rgba(15,80,130,0.10)');
      silGlow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=silGlow;ctx.fillRect(0,0,W,H);
      ctx.drawImage(jwImg,svgX,svgY,svgSize,svgSize);
     }

     /* ── Douilles dorées ── */
     for(const sh of shells){
      sh.x+=sh.vx;sh.y+=sh.vy;sh.rot+=sh.rotSpd;
      if(sh.y>H+20){sh.y=-20;sh.x=Math.random()*W;}
      ctx.save();
      ctx.translate(sh.x,sh.y);ctx.rotate(sh.rot);
      ctx.strokeStyle=`rgba(220,180,55,${0.45+sh.z*0.45})`;
      ctx.lineWidth=sh.thick;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(0,-sh.len/2);ctx.lineTo(0,sh.len/2);ctx.stroke();
      ctx.restore();
     }

     /* ── Vignette ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.06,cx,H*0.48,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(0,0,0,0.10)');
     vg.addColorStop(0.72,'rgba(0,0,0,0.48)');
     vg.addColorStop(1,'rgba(0,0,0,0.95)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
