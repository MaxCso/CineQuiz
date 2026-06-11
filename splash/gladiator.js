// CinéQuiz splash chunk — Gladiator
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Gladiator"]={
   name:'Gladiator',
   color:'200,160,60',
   ref:'Gladiator \u2014 Ridley Scott, 2000',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2, cy=H/2;

    let _glS=document.getElementById('_gl_pos_s');
    if(!_glS){_glS=document.createElement('style');_glS.id='_gl_pos_s';document.head.appendChild(_glS);}
    _glS.textContent='#splash-content-wrap{top:40%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _glW=setInterval(()=>{if(stop.v){_glS.textContent='';clearInterval(_glW);}},200);

    /* ── Image de fond ── */
    const bgImg=new Image();
    let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/Gladiator.png';

    /* ── Cendres/braises qui montent ── */
    const embers=Array.from({length:70},()=>({
     x:Math.random()*W,
     y:H*(0.4+Math.random()*0.6),
     vx:(Math.random()-0.5)*0.35,
     vy:-(0.3+Math.random()*0.55),
     r:Math.random()*1.6+0.4,
     op:0.12+Math.random()*0.30,
     ph:Math.random()*Math.PI*2,
     phSpd:0.018+Math.random()*0.022,
     warm:Math.random()<0.65
    }));

    /* ── Particules de sable qui dérivent ── */
    const sand=Array.from({length:40},()=>({
     x:Math.random()*W,
     y:H*(0.55+Math.random()*0.45),
     vx:0.18+Math.random()*0.28,
     vy:(Math.random()-0.5)*0.08,
     r:Math.random()*1.2+0.3,
     op:0.06+Math.random()*0.12,
     ph:Math.random()*Math.PI*2,
     phSpd:0.008+Math.random()*0.012
    }));

    /* ── Feuilles sèches — tombent du haut, nombreuses et variées ── */
    const leaves=Array.from({length:48},(_,i)=>({
     x:Math.random()*W,
     y:-(Math.random()*H*0.8),        /* réparties au-dessus du canvas */
     vx:(Math.random()-0.5)*0.55,
     vy:0.20+Math.random()*0.50,       /* vitesse de chute variée */
     rot:Math.random()*Math.PI*2,
     vrot:(Math.random()-0.5)*0.026,
     w:W*(0.007+Math.random()*0.014),  /* tailles variées */
     h:W*(0.003+Math.random()*0.006),
     wobble:Math.random()*Math.PI*2,
     wobbleSpd:0.018+Math.random()*0.030,
     /* Couleurs ocre/rouille/brun — gamme Gladiator */
     r:Math.floor(140+Math.random()*80),
     g:Math.floor(60+Math.random()*60),
     b:Math.floor(10+Math.random()*30),
     op:0.30+Math.random()*0.55,
    }));

    /* ── Particules de poussière dorée qui tombent ── */
    const dustFall=Array.from({length:35},()=>({
     x:Math.random()*W,
     y:-(Math.random()*H*0.5),
     vx:(Math.random()-0.5)*0.25,
     vy:0.12+Math.random()*0.28,
     r:Math.random()*1.8+0.4,
     op:0.08+Math.random()*0.18,
     ph:Math.random()*Math.PI*2,
     phSpd:0.012+Math.random()*0.020,
    }));

    function drawLeaf(l){
     ctx.save();
     ctx.translate(l.x,l.y);ctx.rotate(l.rot);
     ctx.globalAlpha=l.op;
     ctx.fillStyle=`rgba(${l.r},${l.g},${l.b},0.90)`;
     ctx.beginPath();ctx.ellipse(0,0,l.w,l.h,0,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle=`rgba(${l.r*0.6|0},${l.g*0.5|0},${l.b*0.4|0},0.32)`;
     ctx.lineWidth=0.5;
     ctx.beginPath();ctx.moveTo(-l.w*0.85,0);ctx.lineTo(l.w*0.85,0);ctx.stroke();
     /* quelques nervures secondaires sur les grandes feuilles */
     if(l.w>W*0.014){
       for(let n=1;n<=2;n++){
         const nx=l.w*(n*0.30);
         ctx.beginPath();ctx.moveTo(nx,0);ctx.lineTo(nx+l.w*0.20,l.h*0.85);ctx.stroke();
         ctx.beginPath();ctx.moveTo(-nx,0);ctx.lineTo(-nx-l.w*0.20,l.h*0.85);ctx.stroke();
       }
     }
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Image de fond plein canvas ── */
     if(bgReady){
      ctx.drawImage(bgImg,0,0,W,H);
     } else {
      ctx.fillStyle='#1a0a00';ctx.fillRect(0,0,W,H);
     }

     /* ── Particules de poussière dorée tombantes ── */
     for(const d of dustFall){
      d.ph+=d.phSpd;
      d.x+=d.vx+Math.sin(d.ph)*0.20;
      d.y+=d.vy;
      if(d.y>H+4){d.y=-(Math.random()*H*0.3);d.x=Math.random()*W;}
      const flicker=0.5+0.5*Math.abs(Math.sin(d.ph));
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(210,170,70,${d.op*flicker})`;ctx.fill();
     }

     /* ── Cendres/braises ── */
     for(const e of embers){
      e.ph+=e.phSpd;
      e.x+=e.vx+Math.sin(e.ph*0.7)*0.18;e.y+=e.vy;
      if(e.y<-4){e.y=H*(0.55+Math.random()*0.45);e.x=Math.random()*W;}
      if(e.x<0)e.x=W;if(e.x>W)e.x=0;
      const flicker=0.5+0.5*Math.abs(Math.sin(e.ph));
      const col=e.warm
       ?`rgba(255,${130+Math.random()*60|0},20,${e.op*flicker})`
       :`rgba(220,${180+Math.random()*40|0},100,${e.op*flicker*0.6})`;
      ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
      ctx.fillStyle=col;ctx.fill();
      if(e.warm&&e.r>1.2){
       const eg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r*3.5);
       eg.addColorStop(0,`rgba(255,100,10,${e.op*flicker*0.18})`);
       eg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=eg;ctx.beginPath();ctx.arc(e.x,e.y,e.r*3.5,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Particules de sable ── */
     for(const s of sand){
      s.ph+=s.phSpd;s.x+=s.vx;s.y+=s.vy+Math.sin(s.ph)*0.05;
      if(s.x>W+2){s.x=-2;s.y=H*(0.55+Math.random()*0.45);}
      const so=s.op*(0.5+0.5*Math.abs(Math.sin(s.ph)));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(210,170,90,${so})`;ctx.fill();
     }

     /* ── Feuilles sèches tombantes ── */
     for(const l of leaves){
      l.wobble+=l.wobbleSpd;
      l.x+=l.vx+Math.sin(l.wobble)*0.28;
      l.y+=l.vy;
      l.rot+=l.vrot+Math.sin(l.wobble*0.6)*0.010;
      if(l.y>H+l.w*2){l.y=-(Math.random()*H*0.3);l.x=Math.random()*W;}
      drawLeaf(l);
     }

     /* ── Vignette pulsante subtile ── */
     ctx.globalAlpha=1;
     const vigPulse=0.82+Math.sin(t*0.35)*0.04;
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.08,cx,H*0.48,H*0.95);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(0,0,0,0.10)');
     vg.addColorStop(0.72,`rgba(0,0,0,${0.45*vigPulse})`);
     vg.addColorStop(1,`rgba(0,0,0,${0.90*vigPulse})`);
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
