// CinéQuiz splash chunk — Jurassic Park
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Jurassic Park"]={
   name:'Jurassic Park',
   color:'40,160,40',
   ref:'Jurassic Park \u2014 Steven Spielberg, 1993',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2, cy=H/2;

    /* ── CSS ── */
    let _jpS=document.getElementById('_jp_pos_s');
    if(!_jpS){_jpS=document.createElement('style');_jpS.id='_jp_pos_s';document.head.appendChild(_jpS);}
    _jpS.textContent='#splash-content-wrap{top:22%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _jpW=setInterval(()=>{if(stop.v){_jpS.textContent='';clearInterval(_jpW);}},200);

    /* ── Image de fond ── */
    const bgImg=new Image();
    let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/JurrasicPark.png';

    /* ── Torches ── */
    const torches=[
     {x:W*0.115, y:H*0.195},
     {x:W*0.885, y:H*0.195},
     {x:W*0.060, y:H*0.520},
     {x:W*0.940, y:H*0.520},
    ];

    /* ── Braises ── */
    const emberGroups=torches.map(torch=>
     Array.from({length:10},()=>({
      x:torch.x, y:torch.y,
      vx:(Math.random()-0.5)*0.55,
      vy:-(0.40+Math.random()*0.65),
      r:Math.random()*1.4+0.4,
      op:0.55+Math.random()*0.35,
      life:Math.random(),
      decay:0.012+Math.random()*0.016,
      tx:torch.x, ty:torch.y
     }))
    );

    /* ── Pluie tropicale ── */
    const rain=Array.from({length:120},()=>({
     x:Math.random()*W*1.3-W*0.15,
     y:Math.random()*H,
     len:H*(0.020+Math.random()*0.022),
     spd:H*(0.007+Math.random()*0.006),
     op:0.05+Math.random()*0.12,
     w:0.4+Math.random()*0.5,
    }));

    /* ── Splash de pluie au sol ── */
    const splashes=Array.from({length:18},()=>({
     x:Math.random()*W,
     y:H*(0.88+Math.random()*0.10),
     life:Math.random(),
     decay:0.04+Math.random()*0.06,
     r:0,
    }));

    /* ── Feuilles tropicales — beaucoup plus nombreuses et variées ── */
    const leaves=Array.from({length:42},(_,i)=>({
     x:Math.random()*W,
     y:-(Math.random()*H*0.5),           /* tombent depuis le haut */
     vx:(Math.random()-0.5)*0.45,
     vy:0.18+Math.random()*0.50,          /* vitesse de chute */
     rot:Math.random()*Math.PI*2,
     vrot:(Math.random()-0.5)*0.022,
     /* Tailles variées — grandes feuilles tropicales */
     w:W*(0.012+Math.random()*0.028),
     h:W*(0.004+Math.random()*0.010),
     /* Couleurs de vert variées */
     green:Math.floor(65+Math.random()*90),
     dark:Math.random()>0.5,
     op:0.35+Math.random()*0.55,
     wobble:Math.random()*Math.PI*2,
     wobbleSpd:0.020+Math.random()*0.035,
    }));

    /* ── Brume tropicale qui dérive ── */
    const mists=Array.from({length:6},(_,i)=>({
     x:Math.random()*W,
     y:H*(0.55+i*0.07+Math.random()*0.06),
     w:W*(0.35+Math.random()*0.45),
     op:0.04+Math.random()*0.06,
     ph:Math.random()*Math.PI*2,
     spd:0.003+Math.random()*0.004,
     dx:0.08+Math.random()*0.18,
    }));

    /* ── Lucioles/insectes lumineux ── */
    const fireflies=Array.from({length:22},()=>({
     x:Math.random()*W,
     y:H*(0.30+Math.random()*0.60),
     vx:(Math.random()-0.5)*0.30,
     vy:(Math.random()-0.5)*0.20,
     ph:Math.random()*Math.PI*2,
     phSpd:0.04+Math.random()*0.08,
     r:1.2+Math.random()*1.8,
     hue:90+Math.random()*60,  /* vert-jaune */
    }));

    function drawTorchFlame(tx,ty,i){
     const flicker=0.72+Math.sin(t*6.5+i*1.8)*0.14+Math.sin(t*11.2+i*2.6)*0.07;
     const fh=H*0.055*flicker;
     const halo=ctx.createRadialGradient(tx,ty,0,tx,ty,W*0.12);
     halo.addColorStop(0,`rgba(255,160,30,${0.22*flicker})`);
     halo.addColorStop(0.4,`rgba(220,80,10,${0.10*flicker})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(tx-W*0.12,ty-W*0.12,W*0.24,W*0.24);
     ctx.save();ctx.translate(tx,ty);
     const fg=ctx.createLinearGradient(0,0,0,-fh);
     fg.addColorStop(0,`rgba(255,${140+Math.sin(t*8+i)*30|0},10,${0.90*flicker})`);
     fg.addColorStop(0.4,`rgba(255,${80+Math.sin(t*6+i)*20|0},0,${0.70*flicker})`);
     fg.addColorStop(1,'rgba(255,200,60,0)');
     ctx.fillStyle=fg;
     ctx.beginPath();
     ctx.moveTo(-W*0.018,0);
     ctx.bezierCurveTo(-W*0.022,-fh*0.4, W*0.010+Math.sin(t*4+i)*W*0.006,-fh*0.7, 0,-fh);
     ctx.bezierCurveTo(-W*0.010+Math.sin(t*5+i)*W*0.006,-fh*0.7, W*0.022,-fh*0.4, W*0.018,0);
     ctx.closePath();ctx.fill();
     ctx.restore();
    }

    function drawLeaf(l){
     ctx.save();
     ctx.translate(l.x,l.y);
     ctx.rotate(l.rot);
     ctx.globalAlpha=l.op;
     /* Feuille ovale avec nervure */
     const g=l.green;
     ctx.fillStyle=l.dark?`rgba(${g*0.3|0},${g},${g*0.25|0},0.90)`:`rgba(${g*0.4|0},${g},${g*0.30|0},0.85)`;
     ctx.beginPath();ctx.ellipse(0,0,l.w,l.h,0,0,Math.PI*2);ctx.fill();
     /* Nervure centrale */
     ctx.strokeStyle=`rgba(${g*0.2|0},${g*0.5|0},${g*0.18|0},0.35)`;
     ctx.lineWidth=Math.max(0.4,l.h*0.4);
     ctx.beginPath();ctx.moveTo(-l.w*0.85,0);ctx.lineTo(l.w*0.85,0);ctx.stroke();
     /* Nervures secondaires sur grandes feuilles */
     if(l.w>W*0.022){
       ctx.lineWidth=0.4;
       for(let n=1;n<=3;n++){
         const nx=l.w*(n*0.22-0.1);
         ctx.beginPath();ctx.moveTo(nx,0);ctx.lineTo(nx+l.w*0.18,l.h*0.9);ctx.stroke();
         ctx.beginPath();ctx.moveTo(-nx,0);ctx.lineTo(-nx-l.w*0.18,l.h*0.9);ctx.stroke();
       }
     }
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond ── */
     if(bgReady){
      ctx.drawImage(bgImg,0,0,W,H);
     } else {
      ctx.fillStyle='#050e0a';ctx.fillRect(0,0,W,H);
     }

     /* ── Brume tropicale ── */
     for(const m of mists){
      m.ph+=m.spd;m.x+=m.dx;
      if(m.x>W*1.1)m.x=-m.w;
      const pulse=0.65+0.35*Math.sin(m.ph);
      const mg=ctx.createLinearGradient(m.x,0,m.x+m.w,0);
      mg.addColorStop(0,'rgba(120,180,130,0)');
      mg.addColorStop(0.3,`rgba(140,195,150,${m.op*pulse})`);
      mg.addColorStop(0.7,`rgba(130,185,140,${m.op*pulse})`);
      mg.addColorStop(1,'rgba(120,180,130,0)');
      ctx.fillStyle=mg;
      ctx.beginPath();ctx.ellipse(m.x+m.w*0.5,m.y,m.w*0.5,H*0.028,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Lueur entre les portes ── */
     const gatePulse=0.65+Math.sin(t*0.55)*0.18+Math.sin(t*1.40)*0.08;
     const gg=ctx.createLinearGradient(cx,H*0.28,cx,H*0.92);
     gg.addColorStop(0,`rgba(255,240,180,${0.10*gatePulse})`);
     gg.addColorStop(0.3,`rgba(240,220,140,${0.06*gatePulse})`);
     gg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=gg;ctx.fillRect(cx-W*0.025,H*0.28,W*0.050,H*0.64);

     /* ── Flammes ── */
     torches.forEach((torch,i)=>drawTorchFlame(torch.x,torch.y,i));

     /* ── Braises ── */
     for(const group of emberGroups){
      for(const e of group){
       e.life+=e.decay;e.x+=e.vx;e.y+=e.vy;
       e.vx+=Math.sin(t*3+e.life)*0.012;
       if(e.life>=1){
        e.life=0;e.x=e.tx+(Math.random()-0.5)*W*0.012;e.y=e.ty;
        e.vx=(Math.random()-0.5)*0.55;e.vy=-(0.40+Math.random()*0.65);
       }
       const fade=1-e.life;
       ctx.beginPath();ctx.arc(e.x,e.y,e.r*fade,0,Math.PI*2);
       ctx.fillStyle=`rgba(255,${120+Math.random()*80|0},20,${e.op*fade})`;ctx.fill();
      }
     }

     /* ── Pluie ── */
     ctx.save();ctx.rotate(Math.PI*0.06);
     for(const d of rain){
      d.y+=d.spd;
      if(d.y>H*1.1){d.y=-d.len;d.x=Math.random()*W*1.3-W*0.15;}
      ctx.strokeStyle=`rgba(160,205,225,${d.op})`;ctx.lineWidth=d.w;
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x,d.y+d.len);ctx.stroke();
     }
     ctx.restore();

     /* ── Splashes pluie au sol ── */
     for(const s of splashes){
      s.life+=s.decay;s.r=s.life*W*0.012;
      if(s.life>=1){s.life=0;s.x=Math.random()*W;s.r=0;}
      const sa=Math.max(0,(1-s.life)*0.18);
      ctx.strokeStyle=`rgba(160,205,225,${sa})`;ctx.lineWidth=0.6;
      ctx.beginPath();ctx.ellipse(s.x,s.y,s.r,s.r*0.35,0,0,Math.PI*2);ctx.stroke();
     }

     /* ── Feuilles ── */
     for(const l of leaves){
      l.wobble+=l.wobbleSpd;
      l.x+=l.vx+Math.sin(l.wobble)*0.22;
      l.y+=l.vy;
      l.rot+=l.vrot+Math.sin(l.wobble*0.7)*0.008;
      if(l.y>H+l.w*2){
       l.y=-(Math.random()*H*0.3);
       l.x=Math.random()*W;
      }
      drawLeaf(l);
     }

     /* ── Lucioles ── */
     for(const f of fireflies){
      f.ph+=f.phSpd;
      f.x+=f.vx+Math.sin(f.ph*0.7)*0.25;
      f.y+=f.vy+Math.cos(f.ph*0.5)*0.18;
      if(f.x<0)f.x=W;if(f.x>W)f.x=0;
      if(f.y<H*0.25)f.y=H*0.90;if(f.y>H*0.95)f.y=H*0.30;
      const glow=0.5+0.5*Math.sin(f.ph);
      if(glow>0.2){
       const fg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*4);
       fg.addColorStop(0,`hsla(${f.hue},95%,80%,${glow*0.85})`);
       fg.addColorStop(0.4,`hsla(${f.hue},90%,65%,${glow*0.35})`);
       fg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=fg;ctx.beginPath();ctx.arc(f.x,f.y,f.r*4,0,Math.PI*2);ctx.fill();
       ctx.fillStyle=`hsla(${f.hue},100%,92%,${glow})`;
       ctx.beginPath();ctx.arc(f.x,f.y,f.r*0.5,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Vignette pulsante ── */
     ctx.globalAlpha=1;
     const vigPulse=0.84+Math.sin(t*0.30)*0.04;
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.10,cx,H*0.50,H*0.96);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.68,`rgba(0,0,0,${0.44*vigPulse})`);
     vg.addColorStop(1,`rgba(0,0,0,${0.92*vigPulse})`);
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
