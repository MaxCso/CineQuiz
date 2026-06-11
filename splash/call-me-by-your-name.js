// CinéQuiz splash chunk — Call Me by Your Name
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Call Me by Your Name"]={
   name:'Call Me by Your Name',
   color:'220,140,60',
   ref:'Call Me by Your Name \u2014 Luca Guadagnino, 2017',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;

    /* ── CSS positionnement ── */
    let _s=document.getElementById('_cmbyn_s');
    if(!_s){_s=document.createElement('style');_s.id='_cmbyn_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Image de fond CMBYN.png ── */
    const bgImg=new Image();
    let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/CMBYN.png';

    /* ── Particules de pollen / lumière d'été (flottent doucement) ── */
    const pollen=Array.from({length:90},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.12,
     vy:-(0.06+Math.random()*0.12),
     r:Math.random()*1.6+0.3,
     op:0.10+Math.random()*0.20,
     ph:Math.random()*Math.PI*2,
     freq:0.010+Math.random()*0.018,
    }));

    /* ── Poussière de lumière fine (plus rapide) ── */
    const motes=Array.from({length:55},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.08,
     vy:-(0.18+Math.random()*0.28),
     r:Math.random()*0.6+0.12,
     op:0.06+Math.random()*0.12,
     ph:Math.random()*Math.PI*2,
     freq:0.020+Math.random()*0.030,
    }));

    /* ── Lueurs de chaleur — shimmer bleu subtil ── */
    const heatPh=Math.random()*Math.PI*2;

    /* ── Reflets / raies de lumière traversantes ── */
    const rays=Array.from({length:4},(_,i)=>({
     x:W*(0.10+i*0.25+Math.random()*0.10),
     angle:-Math.PI*0.35+Math.random()*0.20,
     width:W*(0.012+Math.random()*0.020),
     op:0.0,
     maxOp:0.06+Math.random()*0.06,
     ph:Math.random()*Math.PI*2,
     freq:0.004+Math.random()*0.006,
    }));

    /* ── Petites étincelles dorées (lumière solaire filtrée) ── */
    const sparks=Array.from({length:18},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.65,
     r:Math.random()*2.2+0.5,
     ph:Math.random()*Math.PI*2,
     freq:0.018+Math.random()*0.035,
     op:0.12+Math.random()*0.22,
    }));

    /* ── Lueur solaire coin haut-gauche / haut-droit ── */
    let sunPh=Math.random()*Math.PI*2;

    function frame(){
     if(stop.v)return;

     /* ── Image de fond plein-canvas (cover) ── */
     if(bgReady){
      ctx.save();ctx.globalAlpha=1.0;
      const ir=bgImg.naturalWidth/bgImg.naturalHeight;
      const cr=W/H;
      let dw,dh,dx,dy;
      if(ir>cr){dh=H;dw=dh*ir;dx=(W-dw)/2;dy=0;}
      else{dw=W;dh=dw/ir;dx=0;dy=(H-dh)/2;}
      ctx.drawImage(bgImg,dx,dy,dw,dh);
      ctx.restore();
     } else {
      /* fallback */
      const bg=ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,'#1a4aaa');bg.addColorStop(1,'#102e60');
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
     }

     /* ── Overlay très léger pour garder la profondeur ── */
     ctx.fillStyle='rgba(10,30,80,0.10)';ctx.fillRect(0,0,W,H);

     /* ── Lueur solaire en haut (légère, chaude) ── */
     sunPh+=0.008;
     const sunOp=0.10+Math.sin(sunPh)*0.04;
     const sunG=ctx.createRadialGradient(W*0.72,0,0,W*0.72,0,H*0.55);
     sunG.addColorStop(0,`rgba(255,230,140,${sunOp})`);
     sunG.addColorStop(0.35,`rgba(255,190,80,${sunOp*0.30})`);
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H*0.55);

     /* ── Raies de lumière traversantes ── */
     for(const r of rays){
      r.ph+=r.freq;
      r.op=r.maxOp*(0.4+0.6*Math.abs(Math.sin(r.ph)));
      if(r.op<0.005)continue;
      ctx.save();
      ctx.translate(r.x,0);ctx.rotate(r.angle);
      const lg=ctx.createLinearGradient(0,0,r.width,0);
      lg.addColorStop(0,'rgba(255,255,255,0)');
      lg.addColorStop(0.5,`rgba(255,245,200,${r.op})`);
      lg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=lg;ctx.fillRect(-r.width,0,r.width*2,H*1.4);
      ctx.restore();
     }

     /* ── Particules pollen ── */
     for(const p of pollen){
      p.x+=p.vx+Math.sin(t*0.5+p.ph)*0.06;
      p.y+=p.vy;p.ph+=p.freq;
      if(p.y<-8){p.y=H+8;p.x=Math.random()*W;}
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      const pop=p.op*(0.45+0.55*Math.sin(p.ph));
      if(pop<0.01)continue;
      const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*2.5);
      pg.addColorStop(0,`rgba(255,255,255,${pop})`);
      pg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(p.x,p.y,p.r*2.5,0,Math.PI*2);ctx.fill();
     }

     /* ── Poussière fine ── */
     for(const m of motes){
      m.x+=m.vx;m.y+=m.vy;m.ph+=m.freq;
      if(m.y<-5){m.y=H+5;m.x=Math.random()*W;}
      if(m.x<0)m.x=W;if(m.x>W)m.x=0;
      const mop=m.op*(0.3+0.7*Math.abs(Math.sin(m.ph)));
      if(mop<0.008)continue;
      ctx.fillStyle=`rgba(220,235,255,${mop})`;
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Étincelles dorées (zone haute — lumière filtrée) ── */
     for(const sp of sparks){
      sp.ph+=sp.freq;
      const sop=sp.op*(0.5+0.5*Math.sin(sp.ph));
      if(sop<0.01)continue;
      const sg=ctx.createRadialGradient(sp.x,sp.y,0,sp.x,sp.y,sp.r*3);
      sg.addColorStop(0,`rgba(255,225,120,${sop})`);
      sg.addColorStop(0.5,`rgba(255,200,80,${sop*0.35})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r*3,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette douce sur les bords ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.10,cx,H*0.48,H*0.78);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(8,22,60,0.08)');
     vg.addColorStop(0.78,'rgba(6,18,50,0.38)');
     vg.addColorStop(1,'rgba(4,12,40,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
