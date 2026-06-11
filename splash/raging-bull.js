// CinéQuiz splash chunk — Raging Bull
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Raging Bull"]={
   name:'Raging Bull',
   color:'80,20,20',
   ref:'Raging Bull \u2014 Martin Scorsese, 1980',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    let _rblS=document.getElementById('_rbl_s');
    if(!_rblS){_rblS=document.createElement('style');_rblS.id='_rbl_s';document.head.appendChild(_rblS);}
    _rblS.textContent='#splash-content-wrap{top:40%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _rblW=setInterval(()=>{if(stop.v){_rblS.textContent='';clearInterval(_rblW);}},200);

    /* ── Image de fond PNG ── */
    const bgImg=new Image(); let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/RagingBull.png';

    /* ── Fumée rouge/violette par-dessus l'image ── */
    const smoke=Array.from({length:22},()=>({
     x:cx+(Math.random()-0.5)*W*1.1,
     y:H*(0.10+Math.random()*0.70),
     r:W*(0.10+Math.random()*0.22),
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.04+Math.random()*0.08),
     op:0.02+Math.random()*0.055,
     ph:Math.random()*Math.PI*2,
     warm:Math.random(), /* 0=violet, 1=rouge */
    }));

    /* ── Particules de poussière de ring ── */
    const drops=Array.from({length:55},()=>({
     x:Math.random()*W,
     y:H*(0.45+Math.random()*0.50),
     vx:(Math.random()-0.5)*0.55,
     vy:-(0.08+Math.random()*0.22),
     r:Math.random()*1.6+0.3,
     life:Math.random(),
     decay:0.003+Math.random()*0.006,
     wobble:Math.random()*Math.PI*2,
     wobbleSpd:(Math.random()-0.5)*0.04,
    }));

    /* ── Flashes photo depuis les bords — ringside ── */
    let flashT=70, flashA=0, flashX=cx, flashY=H*0.75;
    const audienceFlashes=Array.from({length:10},(_,i)=>({
     x:W*(0.03+i*0.105),
     y:H*(0.88+Math.random()*0.06),
     t:Math.floor(Math.random()*80),
     a:0,
    }));

    function frame(){
     if(stop.v)return;

     /* ── Fond : image PNG plein canvas ── */
     ctx.fillStyle='#0a0005';ctx.fillRect(0,0,W,H);
     if(bgReady){
      /* Couverture cover — centré, recadrage proportionnel */
      const iW=bgImg.naturalWidth||bgImg.width;
      const iH=bgImg.naturalHeight||bgImg.height;
      const scaleW=W/iW, scaleH=H/iH;
      const scale=Math.max(scaleW,scaleH);
      const dW=iW*scale, dH=iH*scale;
      const dX=(W-dW)/2, dY=(H-dH)/2;
      ctx.drawImage(bgImg,dX,dY,dW,dH);
     }

     /* ── Voile coloré dynamique — renforce la teinte rouge/violet de l'image ── */
     const tintPulse=0.06+Math.sin(t*0.18)*0.02;
     const tintG=ctx.createRadialGradient(cx*0.9,H*0.35,0,cx,H*0.42,W*0.85);
     tintG.addColorStop(0,`rgba(80,0,40,${tintPulse})`);
     tintG.addColorStop(0.5,`rgba(120,0,30,${tintPulse*0.6})`);
     tintG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tintG;ctx.fillRect(0,0,W,H);

     /* ── Fumée par-dessus ── */
     for(const s of smoke){
      s.x+=s.vx;s.y+=s.vy;s.ph+=0.008;s.r+=0.05;
      if(s.y<-s.r||s.r>W*0.40){
       s.x=cx+(Math.random()-0.5)*W*1.0;
       s.y=H*(0.55+Math.random()*0.30);
       s.r=W*(0.08+Math.random()*0.14);
       s.op=0.025+Math.random()*0.050;
       s.warm=Math.random();
      }
      s.op-=0.00006;
      const r2=s.warm>0.5?`rgba(80,4,18,${s.op})`:`rgba(48,4,55,${s.op})`;
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,r2);sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Flash global — éclat stroboscopique ── */
     flashT--;
     if(flashT<=0){
      flashA=0.55+Math.random()*0.30;
      flashT=55+Math.floor(Math.random()*100);
      flashX=W*(0.10+Math.random()*0.80);
      flashY=H*(0.60+Math.random()*0.28);
     } else { flashA=Math.max(0,flashA-0.028); }
     if(flashA>0.01){
      /* Halo concentré au point de flash */
      const fg=ctx.createRadialGradient(flashX,flashY,0,flashX,flashY,W*0.55);
      fg.addColorStop(0,`rgba(255,250,240,${flashA*0.55})`);
      fg.addColorStop(0.15,`rgba(255,240,220,${flashA*0.20})`);
      fg.addColorStop(0.40,`rgba(240,220,200,${flashA*0.06})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.fillRect(0,0,W,H);
      /* Surbrillance totale très brève */
      ctx.fillStyle=`rgba(255,252,248,${flashA*0.08})`;ctx.fillRect(0,0,W,H);
     }

     /* ── Flashes du public — petits éclats en bas ── */
     for(const af of audienceFlashes){
      af.t--;
      if(af.t<=0){af.a=0.70+Math.random()*0.28;af.t=45+Math.floor(Math.random()*90);}
      else af.a=Math.max(0,af.a-0.065);
      if(af.a>0.02){
       const afg=ctx.createRadialGradient(af.x,af.y,0,af.x,af.y,W*0.07);
       afg.addColorStop(0,`rgba(255,248,235,${af.a})`);
       afg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=afg;ctx.beginPath();ctx.arc(af.x,af.y,W*0.07,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Particules de poussière ── */
     for(const d of drops){
      d.x+=d.vx+Math.sin(d.wobble)*0.30;
      d.y+=d.vy;
      d.wobble+=d.wobbleSpd;
      d.vy*=0.995;
      d.life-=d.decay;
      if(d.life<=0){
       d.x=Math.random()*W;
       d.y=H*(0.75+Math.random()*0.22);
       d.vx=(Math.random()-0.5)*0.50;
       d.vy=-(0.06+Math.random()*0.20);
       d.life=0.60+Math.random()*0.40;
       d.r=Math.random()*1.6+0.3;
      }
      const da=d.life*0.50;
      const gr=Math.floor(180+Math.random()*40);
      ctx.fillStyle=`rgba(${gr},${gr-20},${gr-40},${da})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette — resserre légèrement au rythme des flashs ── */
     const vigStr=0.94+flashA*0.04;
     const vg=ctx.createRadialGradient(cx,H*0.52,H*0.04,cx,H*0.52,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.30,'rgba(0,0,0,0.04)');
     vg.addColorStop(0.60,`rgba(0,0,0,${0.42*vigStr})`);
     vg.addColorStop(0.82,`rgba(0,0,0,${0.82*vigStr})`);
     vg.addColorStop(1,`rgba(0,0,0,${vigStr})`);
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* ── Grain 35mm — style Scorsese ── */
     for(let i=0;i<100;i++){
      const gv=4+Math.random()*22|0;
      ctx.fillStyle=`rgba(${gv},${gv},${gv},${Math.random()*0.032})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2.0+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
