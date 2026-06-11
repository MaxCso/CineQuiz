// CinéQuiz splash chunk — Mad Max: Fury Road
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Mad Max: Fury Road"]={
   name:'Mad Max: Fury Road',
   color:'255,100,10',
   ref:'Mad Max: Fury Road \u2014 George Miller, 2015',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2, cy=H/2;

    /* ── CSS ── */
    let _mmPos=document.getElementById('_mm_pos_s');
    if(!_mmPos){_mmPos=document.createElement('style');_mmPos.id='_mm_pos_s';document.head.appendChild(_mmPos);}
    _mmPos.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _mmPosW=setInterval(()=>{if(stop.v){_mmPos.textContent='';clearInterval(_mmPosW);}},200);

    /* ── Image de fond ── */
    const bgImg=new Image();
    let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/MadMax.png';

    /* ── Grains de sable — tempête à toute vitesse ── */
    const sand=Array.from({length:260},()=>({
     x:Math.random()*W,
     y:H*(0.30+Math.random()*0.70),
     vx:-(1.8+Math.random()*4.5),
     vy:(Math.random()-0.5)*0.55,
     r:Math.random()*1.5+0.2,
     op:0.12+Math.random()*0.32,
     ph:Math.random()*Math.PI*2,
     phSpd:0.012+Math.random()*0.022,
     layer:Math.random(), /* 0=loin, 1=proche */
    }));

    /* ── Streaks — traînées horizontales rapides ── */
    const streaks=Array.from({length:45},()=>({
     x:Math.random()*W,
     y:H*(0.28+Math.random()*0.68),
     vx:-(4.5+Math.random()*9.0),
     len:W*(0.03+Math.random()*0.09),
     op:0.08+Math.random()*0.22,
     w:0.4+Math.random()*1.1,
    }));

    /* ── Débris lourds — cailloux/éclats qui filent ── */
    const debris=Array.from({length:14},()=>({
     x:Math.random()*W,
     y:H*(0.40+Math.random()*0.55),
     vx:-(2.5+Math.random()*6.0),
     vy:(Math.random()-0.5)*1.2,
     size:W*(0.004+Math.random()*0.009),
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.18,
     op:0.35+Math.random()*0.55,
    }));

    /* ── Poussière chaude — monte depuis le bas ── */
    const heat=Array.from({length:30},()=>({
     x:Math.random()*W,
     y:H*(0.70+Math.random()*0.30),
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.10+Math.random()*0.20),
     r:W*(0.018+Math.random()*0.030),
     op:0.03+Math.random()*0.06,
     ph:Math.random()*Math.PI*2,
     phSpd:0.005+Math.random()*0.008,
    }));

    /* ── Dust clouds — traversent l'horizon ── */
    const dustClouds=Array.from({length:5},(_,i)=>({
     x:Math.random()*W*1.5-W*0.25,
     y:H*(0.44+Math.random()*0.10),
     vx:-(0.30+Math.random()*0.50),
     w:W*(0.18+Math.random()*0.22),
     h:H*(0.030+Math.random()*0.025),
     op:0.06+Math.random()*0.09,
     ph:Math.random()*Math.PI*2,
     phSpd:0.003+Math.random()*0.005,
    }));

    function frame(){
     if(stop.v)return;

     /* ── Fond ── */
     if(bgReady){
      ctx.drawImage(bgImg,0,0,W,H);
     } else {
      const fb=ctx.createLinearGradient(0,0,0,H);
      fb.addColorStop(0,'#0d7a8a');fb.addColorStop(0.5,'#e8a020');fb.addColorStop(1,'#c04800');
      ctx.fillStyle=fb;ctx.fillRect(0,0,W,H);
     }

     /* ── Dust clouds à l'horizon ── */
     for(const d of dustClouds){
      d.ph+=d.phSpd;d.x+=d.vx;
      if(d.x<-d.w)d.x=W+d.w*0.5;
      const pulse=0.6+0.4*Math.abs(Math.sin(d.ph));
      const dg=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.w*0.5);
      dg.addColorStop(0,`rgba(240,180,60,${d.op*pulse})`);
      dg.addColorStop(0.5,`rgba(210,145,40,${d.op*pulse*0.45})`);
      dg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=dg;
      ctx.beginPath();ctx.ellipse(d.x,d.y,d.w*0.5,d.h,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Streaks horizontales ── */
     for(const s of streaks){
      s.x+=s.vx;
      if(s.x<-s.len){s.x=W+s.len*0.5;s.y=H*(0.28+Math.random()*0.68);}
      ctx.save();
      ctx.strokeStyle=`rgba(235,180,70,${s.op})`;
      ctx.lineWidth=s.w;
      ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x+s.len,s.y);ctx.stroke();
      ctx.restore();
     }

     /* ── Grains de sable ── */
     for(const s of sand){
      s.ph+=s.phSpd;
      const spd=1.0+s.layer*1.8; /* proches = plus rapides */
      s.x+=s.vx*spd+Math.sin(s.ph*0.5)*0.12;
      s.y+=s.vy;
      if(s.x<-2){s.x=W+2;s.y=H*(0.30+Math.random()*0.70);}
      const so=s.op*(0.5+0.5*Math.abs(Math.sin(s.ph)));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*(0.6+s.layer*0.8),0,Math.PI*2);
      ctx.fillStyle=`rgba(235,178,68,${so})`;ctx.fill();
     }

     /* ── Débris lourds ── */
     for(const d of debris){
      d.x+=d.vx;d.y+=d.vy;d.rot+=d.rotSpd;
      if(d.x<-10){
       d.x=W+10;
       d.y=H*(0.40+Math.random()*0.55);
       d.vx=-(2.5+Math.random()*6.0);
       d.vy=(Math.random()-0.5)*1.2;
      }
      ctx.save();
      ctx.translate(d.x,d.y);ctx.rotate(d.rot);
      ctx.fillStyle=`rgba(190,140,60,${d.op})`;
      /* Forme irrégulière */
      ctx.beginPath();
      ctx.moveTo(-d.size,-d.size*0.5);
      ctx.lineTo(d.size*0.5,-d.size);
      ctx.lineTo(d.size,d.size*0.4);
      ctx.lineTo(-d.size*0.3,d.size);
      ctx.closePath();ctx.fill();
      ctx.restore();
      /* Traînée courte */
      ctx.strokeStyle=`rgba(220,160,50,${d.op*0.35})`;
      ctx.lineWidth=d.size*0.6;
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x-d.vx*3,d.y-d.vy*3);ctx.stroke();
     }

     /* ── Chaleur montante ── */
     for(const h of heat){
      h.ph+=h.phSpd;
      h.x+=h.vx+Math.sin(h.ph*0.7)*0.14;
      h.y+=h.vy;
      h.r+=0.04;h.op-=0.0004;
      if(h.y<H*0.45||h.op<0.005||h.r>W*0.065){
       h.y=H*(0.80+Math.random()*0.20);
       h.x=Math.random()*W;
       h.r=W*(0.014+Math.random()*0.022);
       h.op=0.025+Math.random()*0.045;
      }
      const pulse=0.55+0.45*Math.abs(Math.sin(h.ph));
      const hg=ctx.createRadialGradient(h.x,h.y,0,h.x,h.y,h.r);
      hg.addColorStop(0,`rgba(255,160,40,${h.op*pulse})`);
      hg.addColorStop(0.6,`rgba(220,120,20,${h.op*pulse*0.35})`);
      hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(h.x,h.y,h.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Grain de chaleur ── */
     for(let i=0;i<18;i++){
      ctx.fillStyle=`rgba(255,${140+Math.random()*60|0},20,${Math.random()*0.018})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.5,Math.random()*2+0.5);
     }

     /* ── Vignette pulsante ── */
     ctx.globalAlpha=1;
     const vigPulse=0.82+Math.sin(t*0.28)*0.04;
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.08,cx,H*0.50,H*0.96);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(0,0,0,0.06)');
     vg.addColorStop(0.68,`rgba(0,0,0,${0.38*vigPulse})`);
     vg.addColorStop(1,`rgba(0,0,0,${0.85*vigPulse})`);
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
