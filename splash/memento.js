// CinéQuiz splash chunk — Memento
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Memento"]={
   name:'Memento',
   color:'100,80,60',
   ref:'Memento \u2014 Christopher Nolan, 2000',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2,cy=H/2;

    let _s=document.getElementById('_me_s');
    if(!_s){_s=document.createElement('style');_s.id='_me_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:50%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:rgba(200,195,210,0.92)!important;text-shadow:0 1px 10px rgba(0,0,0,0.90)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Chargement du fond Memento ── */
    const bgImg=new Image();
    let bgLoaded=false;
    bgImg.onload=()=>{bgLoaded=true;};
    bgImg.src='images/Memento.png';

    /* ── Fragments polaroid — dérivent très lentement ── */
    const fragments=Array.from({length:9},(_,i)=>{
     const sr=n=>(Math.abs(Math.sin(i*17.3+n*131.7)*43758.5))%1;
     return {
      x: W*(0.08+sr(1)*0.84),
      y: H*(0.08+sr(2)*0.84),
      w: W*(0.055+sr(3)*0.055),
      rot: (sr(4)-0.5)*0.55,
      vx: (sr(5)-0.5)*0.055,
      vy: (sr(6)-0.5)*0.035,
      vrot: (sr(7)-0.5)*0.0003,
      op: 0.10+sr(8)*0.18,
      ph: sr(9)*Math.PI*2,
      spd: 0.004+sr(0)*0.006,
     };
    });

    /* ── Poussière froide — particules bleutées/grises ── */
    const dust=Array.from({length:35},()=>({
     x: Math.random()*W,
     y: Math.random()*H,
     vx: (Math.random()-0.5)*0.12,
     vy: -(0.04+Math.random()*0.10),
     r: W*(0.001+Math.random()*0.003),
     op: 0.06+Math.random()*0.14,
     ph: Math.random()*Math.PI*2,
     spd: 0.006+Math.random()*0.010,
    }));

    /* ── Lignes de scan — effet mémoire fragmentée ── */
    const scanLines=Array.from({length:3},(_,i)=>({
     y: H*(0.15+i*0.28)+Math.random()*H*0.08,
     vy: 0.12+Math.random()*0.18,
     op: 0.04+Math.random()*0.06,
     w: W*(0.25+Math.random()*0.55),
     x: W*(Math.random()*0.5),
     h: H*(0.002+Math.random()*0.003),
     delay: i*120+Math.random()*80,
    }));

    /* ── Dessine un fragment de polaroid ── */
    function drawFragment(f){
     const h=f.w*1.25;
     ctx.save();
     ctx.translate(f.x,f.y);
     ctx.rotate(f.rot);
     ctx.globalAlpha=f.op*(0.6+0.4*Math.abs(Math.sin(f.ph)));
     ctx.shadowColor='rgba(0,0,0,0.5)';
     ctx.shadowBlur=f.w*0.15;
     /* Cadre blanc polaroid */
     ctx.fillStyle='rgba(235,230,220,0.88)';
     ctx.beginPath();ctx.roundRect(-f.w/2,-h/2,f.w,h,f.w*0.02);ctx.fill();
     /* Zone photo grise avec grain */
     const ph=h*0.72;
     ctx.fillStyle='rgba(80,85,100,0.55)';
     ctx.fillRect(-f.w/2+f.w*0.07,-h/2+f.w*0.07,f.w*0.86,ph);
     /* Reflet léger */
     ctx.fillStyle='rgba(200,210,230,0.12)';
     ctx.beginPath();
     ctx.moveTo(-f.w/2+f.w*0.07,-h/2+f.w*0.07);
     ctx.lineTo(-f.w/2+f.w*0.07+f.w*0.42,-h/2+f.w*0.07);
     ctx.lineTo(-f.w/2+f.w*0.07,-h/2+f.w*0.07+ph*0.55);
     ctx.closePath();ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond : Memento.png en cover ── */
     ctx.fillStyle='#12101a';ctx.fillRect(0,0,W,H);
     if(bgLoaded){
      const iW=bgImg.naturalWidth,iH=bgImg.naturalHeight;
      const scale=Math.max(W/iW,H/iH);
      const dW=iW*scale,dH=iH*scale;
      ctx.drawImage(bgImg,(W-dW)/2,(H-dH)/2,dW,dH);
     }

     /* Voile très léger pour que les animations ressortent */
     ctx.fillStyle='rgba(10,8,18,0.22)';ctx.fillRect(0,0,W,H);

     /* ── Fragments polaroid qui dérivent ── */
     for(const f of fragments){
      f.ph+=f.spd;
      f.x+=f.vx;f.y+=f.vy;f.rot+=f.vrot;
      if(f.x<-f.w*2)f.x=W+f.w; if(f.x>W+f.w*2)f.x=-f.w;
      if(f.y<-f.w*2)f.y=H+f.w; if(f.y>H+f.w*2)f.y=-f.w;
      drawFragment(f);
     }
     ctx.globalAlpha=1;

     /* ── Lignes de scan ── */
     for(const s of scanLines){
      if(s.delay>0){s.delay--;continue;}
      s.y+=s.vy;
      if(s.y>H+s.h*2){s.y=-s.h;s.x=W*(Math.random()*0.45);s.w=W*(0.25+Math.random()*0.55);}
      const sg=ctx.createLinearGradient(s.x,0,s.x+s.w,0);
      sg.addColorStop(0,'rgba(180,185,220,0)');
      sg.addColorStop(0.15,`rgba(180,185,220,${s.op})`);
      sg.addColorStop(0.85,`rgba(180,185,220,${s.op})`);
      sg.addColorStop(1,'rgba(180,185,220,0)');
      ctx.fillStyle=sg;
      ctx.fillRect(s.x,s.y,s.w,s.h);
     }

     /* ── Poussière froide ── */
     for(const d of dust){
      d.ph+=d.spd;d.x+=d.vx;d.y+=d.vy;
      if(d.y<-2){d.y=H+2;d.x=Math.random()*W;}
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      const da=d.op*(0.5+0.5*Math.abs(Math.sin(d.ph)));
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(170,175,210,${da})`;ctx.fill();
     }

     /* ── Grain filmique animé — très subtil ── */
     const grainAlpha=0.022+Math.sin(t*7.1)*0.004;
     for(let i=0;i<160;i++){
      const gx=Math.random()*W,gy=Math.random()*H;
      const gs=Math.random()*1.8+0.4;
      const gb=Math.round(140+Math.random()*115);
      ctx.fillStyle=`rgba(${gb},${gb},${gb+15},${grainAlpha*(0.4+Math.random()*0.6)})`;
      ctx.fillRect(gx,gy,gs,gs);
     }

     /* ── Vignette douce ── */
     ctx.globalAlpha=1;
     const vg=ctx.createRadialGradient(cx,cy*0.90,H*0.06,cx,cy*0.90,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(5,4,12,0.10)');
     vg.addColorStop(0.72,'rgba(5,4,12,0.42)');
     vg.addColorStop(1,'rgba(5,4,12,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
