// CinéQuiz splash chunk — Les Affranchis
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Les Affranchis"]={

   name:'Les Affranchis',
   color:'200,60,20',
   ref:'Les Affranchis \u2014 Martin Scorsese, 1990',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2, cy=H/2;

    /* ── CSS ── */
    let _afPos=document.getElementById('_af_splash_pos');
    if(!_afPos){_afPos=document.createElement('style');_afPos.id='_af_splash_pos';document.head.appendChild(_afPos);}
    _afPos.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _afWatch=setInterval(()=>{if(stop.v){_afPos.textContent='';clearInterval(_afWatch);}},200);

    /* ── Image de fond ── */
    const bgImg=new Image();
    let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/Goodfellas.png';

    /* ── Particules de brume cyan — flottent dans la forêt ── */
    const mistParticles=Array.from({length:55},()=>({
     x:Math.random()*W,
     y:H*(0.05+Math.random()*0.70),
     vx:(Math.random()-0.5)*0.14,
     vy:(Math.random()-0.5)*0.07,
     r:W*(0.012+Math.random()*0.022),
     op:0.14+Math.random()*0.22,
     ph:Math.random()*Math.PI*2,
     phSpd:0.005+Math.random()*0.008
    }));

    /* ── Feuilles mortes — tombent lentement ── */
    const leaves=Array.from({length:22},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vx:(Math.random()-0.5)*0.30,
     vy:0.15+Math.random()*0.25,
     rot:Math.random()*Math.PI*2,
     vrot:(Math.random()-0.5)*0.020,
     w:W*(0.007+Math.random()*0.009),
     h:W*(0.003+Math.random()*0.004),
     op:0.30+Math.random()*0.40
    }));

    /* ── Brume rampante au sol ── */
    const groundMist=Array.from({length:9},(_,i)=>({
     x:W*(i/9)+Math.random()*W*0.2,
     y:H*(0.70+Math.random()*0.18),
     w:W*(0.30+Math.random()*0.32),
     h:H*(0.07+Math.random()*0.05),
     vx:(Math.random()-0.5)*0.09,
     op:0.12+Math.random()*0.10,
     ph:Math.random()*Math.PI*2,
     phSpd:0.003+Math.random()*0.004
    }));

    /* ── Braises rouges (cigarette, feux) ── */
    const embers=Array.from({length:22},()=>({
     x:Math.random()*W,
     y:H*(0.55+Math.random()*0.40),
     vx:(Math.random()-0.5)*0.28,
     vy:-(0.10+Math.random()*0.22),
     r:Math.random()*1.8+0.4,
     op:0.4+Math.random()*0.45,
     life:Math.random(),
     decay:0.010+Math.random()*0.012
    }));
    function resetEmber(e){
     e.x=Math.random()*W;e.y=H*(0.70+Math.random()*0.28);
     e.vx=(Math.random()-0.5)*0.28;e.vy=-(0.10+Math.random()*0.22);
     e.op=0.4+Math.random()*0.45;e.life=0;
    }
    embers.forEach(resetEmber);

    /* ── Grain pellicule noir ── */
    const grainC=document.createElement('canvas');
    grainC.width=W;grainC.height=H;
    const gx=grainC.getContext('2d');
    const grainData=gx.createImageData(W,H);
    for(let i=0;i<grainData.data.length;i+=4){
     const v=Math.random()*40|0;
     grainData.data[i]=v;grainData.data[i+1]=v*0.6|0;grainData.data[i+2]=v*0.4|0;
     grainData.data[i+3]=Math.random()>0.58?16:0;
    }
    gx.putImageData(grainData,0,0);

    function frame(){
     if(stop.v)return;

     /* ── Fond ── */
     if(bgReady){
      ctx.drawImage(bgImg,0,0,W,H);
     } else {
      ctx.fillStyle='#03090c';
      ctx.fillRect(0,0,W,H);
     }

     /* ── Voile sombre — fait ressortir les particules sur le PNG ── */
     ctx.fillStyle=`rgba(2,5,3,${0.18+Math.sin(t*0.20)*0.03})`;
     ctx.fillRect(0,0,W,H);

     /* ── Pulsation halo rouge (feux arrière) ── */
     const redPulse=0.55+Math.sin(t*1.10)*0.20+Math.sin(t*2.30)*0.08;
     const rg=ctx.createRadialGradient(cx*0.92,H*0.685,0,cx*0.92,H*0.685,W*0.38);
     rg.addColorStop(0,`rgba(200,10,5,${0.22*redPulse})`);
     rg.addColorStop(0.4,`rgba(160,5,0,${0.12*redPulse})`);
     rg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg;ctx.fillRect(0,H*0.45,W,H*0.55);

     /* ── Brume rampante au sol ── */
     for(const m of groundMist){
      m.ph+=m.phSpd;m.x+=m.vx;
      if(m.x>W+m.w)m.x=-m.w;
      if(m.x<-m.w)m.x=W+m.w;
      const pulse=0.55+0.45*Math.abs(Math.sin(m.ph));
      const mg=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.w*0.5);
      mg.addColorStop(0,`rgba(30,80,90,${m.op*pulse})`);
      mg.addColorStop(0.5,`rgba(20,55,65,${m.op*pulse*0.45})`);
      mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;
      ctx.beginPath();ctx.ellipse(m.x,m.y,m.w*0.5,m.h,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Particules de brume cyan ── */
     for(const p of mistParticles){
      p.ph+=p.phSpd;
      p.x+=p.vx+Math.sin(p.ph*0.6)*0.10;
      p.y+=p.vy+Math.cos(p.ph*0.4)*0.06;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H*0.70;if(p.y>H*0.75)p.y=H*(0.05+Math.random()*0.30);
      const glow=0.45+0.55*Math.abs(Math.sin(p.ph));
      const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      pg.addColorStop(0,`rgba(60,200,210,${p.op*glow})`);
      pg.addColorStop(0.5,`rgba(30,150,170,${p.op*glow*0.40})`);
      pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Feuilles mortes ── */
     for(const l of leaves){
      l.x+=l.vx+Math.sin(t*0.5+l.rot)*0.10;
      l.y+=l.vy;l.rot+=l.vrot;
      if(l.y>H+6){l.y=-6;l.x=Math.random()*W;}
      ctx.save();
      ctx.translate(l.x,l.y);ctx.rotate(l.rot);
      ctx.globalAlpha=l.op;
      ctx.fillStyle='rgba(30,15,8,0.92)';
      ctx.beginPath();ctx.ellipse(0,0,l.w,l.h,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* ── Braises rouges ── */
     for(const e of embers){
      e.life+=e.decay;e.x+=e.vx;e.y+=e.vy;
      if(e.life>=1)resetEmber(e);
      const fade=1-e.life;
      ctx.fillStyle=e.life<0.4
       ?`rgba(255,${140+Math.random()*80|0},10,${e.op*fade})`
       :`rgba(200,${30+Math.random()*30|0},5,${e.op*fade*0.7})`;
      ctx.beginPath();ctx.arc(e.x,e.y,e.r*fade,0,Math.PI*2);ctx.fill();
      if(fade>0.5){
       const eg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r*4.5);
       eg.addColorStop(0,`rgba(255,80,5,${e.op*fade*0.14})`);
       eg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=eg;ctx.beginPath();ctx.arc(e.x,e.y,e.r*4.5,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Grain pellicule ── */
     ctx.globalAlpha=0.42;
     ctx.drawImage(grainC,0,0);
     ctx.globalAlpha=1;

     /* ── Vignette pulsante ── */
     ctx.globalAlpha=1;
     const vigPulse=0.88+Math.sin(t*0.32)*0.04;
     const vg=ctx.createRadialGradient(cx*0.85,H*0.46,H*0.06,cx*0.85,H*0.46,H*0.95);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.40,'rgba(0,0,0,0.10)');
     vg.addColorStop(0.68,`rgba(0,0,0,${0.48*vigPulse})`);
     vg.addColorStop(1,`rgba(0,0,0,${0.94*vigPulse})`);
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
