// CinéQuiz splash chunk — Intouchables
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Intouchables"]={
   name:'Intouchables',
   color:'40,180,200',
   ref:'Intouchables \u2014 Nakache & Toledano, 2011',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    let _s=document.getElementById('_intou_s');
    if(!_s){_s=document.createElement('style');_s.id='_intou_s';document.head.appendChild(_s);}
    _s.textContent=`

      #splash-content-wrap{top:30%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
      #splash-quote-text{color:rgba(255,255,255,0.95)!important;text-shadow:0 1px 12px rgba(0,0,0,0.60)!important;}
      #splash-film-logo{filter:drop-shadow(0 2px 10px rgba(0,0,0,0.50))!important;}
    `;
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Image de fond PNG ── */
    const bgImg=new Image(); let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/Intouchables.png';

    /* ── Parapentes ── */
    const paragliders=[
     {x:W*0.72, y:H*0.28, vx:0.22, vy:-0.04, sc:1.0,
      colors:['#e8342a','#f5a623','#4a90d9'], ph:0},
     {x:W*0.55, y:H*0.42, vx:0.14, vy:0.02, sc:0.62,
      colors:['#2ecc71','#f1c40f','#9b59b6'], ph:1.8},
     {x:W*0.85, y:H*0.35, vx:0.18, vy:-0.03, sc:0.48,
      colors:['#e74c3c','#ecf0f1'], ph:3.2},
    ];

    function drawParaglider(p){
     const s=p.sc;
     const x=p.x, y=p.y;
     ctx.save();ctx.translate(x,y);
     /* Aile — demi-ellipse colorée en segments */
     const aW=W*0.055*s, aH=H*0.014*s;
     const segs=p.colors.length;
     for(let i=0;i<segs;i++){
      const a1=Math.PI+(i/segs)*Math.PI;
      const a2=Math.PI+((i+1)/segs)*Math.PI;
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.ellipse(0,0,aW,aH,0,a1,a2);
      ctx.closePath();
      ctx.fillStyle=p.colors[i];
      ctx.globalAlpha=0.88;
      ctx.fill();
     }
     /* Lignes de suspension */
     ctx.globalAlpha=0.55;
     ctx.strokeStyle='rgba(30,30,30,0.6)';
     ctx.lineWidth=0.6;
     for(let i=-2;i<=2;i++){
      ctx.beginPath();
      ctx.moveTo(aW*0.70*(i/2.5),-aH*0.3);
      ctx.lineTo(0,aH*1.8);
      ctx.stroke();
     }
     /* Pilote — petit point sous l'aile */
     ctx.globalAlpha=0.90;
     ctx.fillStyle='rgba(20,20,20,0.85)';
     ctx.beginPath();ctx.ellipse(0,aH*2.2,aW*0.06,aH*0.55,0,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    /* ── Oiseaux ── */
    const birdFlocks=[
     {birds:Array.from({length:6},(_,i)=>({
       ox:W*(0.05+i*0.038), oy:H*(0.12+i*0.008),
       ph:i*0.55, spd:0.022
      })), vx:0.28, x:0, y:0},
     {birds:Array.from({length:4},(_,i)=>({
       ox:W*(0.02+i*0.045), oy:H*(0.22+i*0.006),
       ph:i*0.70+1.2, spd:0.018
      })), vx:0.20, x:W*0.35, y:0},
    ];

    function drawBird(x,y,wingPhase,s){
     const w=W*0.010*s;
     const flap=Math.sin(wingPhase)*w*0.55;
     ctx.beginPath();
     ctx.moveTo(x-w,y+flap);
     ctx.quadraticCurveTo(x-w*0.4,y,x,y);
     ctx.quadraticCurveTo(x+w*0.4,y,x+w,y+flap);
     ctx.stroke();
    }

    function drawBirds(){
     ctx.strokeStyle='rgba(15,25,30,0.72)';
     ctx.lineWidth=1.2;ctx.lineCap='round';
     for(const flock of birdFlocks){
      flock.x+=flock.vx;
      if(flock.x>W*1.25)flock.x=-W*0.25;
      for(const b of flock.birds){
       b.ph+=b.spd;
       drawBird(flock.x+b.ox,b.oy,b.ph,0.85+Math.sin(b.ph*0.3)*0.25);
      }
     }
    }

    /* ── Particules légères (graines/poussière) ── */
    const seeds=Array.from({length:35},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.70,
     vx:(Math.random()-0.4)*0.22,
     vy:-(0.08+Math.random()*0.14),
     r:Math.random()*1.8+0.4,
     op:0.25+Math.random()*0.45,
     ph:Math.random()*Math.PI*2,
     spd:0.015+Math.random()*0.025,
    }));

    /* ── Nuages légers ── */
    const cloudPuffs=Array.from({length:8},(_,i)=>({
     x: W*(0.05+i*0.135)+Math.random()*W*0.08,
     y: H*(0.05+Math.random()*0.20),
     w: W*(0.12+Math.random()*0.18),
     h: H*(0.018+Math.random()*0.020),
     op:0.12+Math.random()*0.18,
     vx:0.018+Math.random()*0.025,
     ph:Math.random()*Math.PI*2,
     spd:0.003+Math.random()*0.004,
    }));

    function drawClouds(){
     for(const c of cloudPuffs){
      c.x+=c.vx; c.ph+=c.spd;
      if(c.x>W+c.w)c.x=-c.w;
      const pulse=0.85+0.15*Math.sin(c.ph);
      const cg=ctx.createLinearGradient(c.x,0,c.x+c.w,0);
      cg.addColorStop(0,'rgba(255,255,255,0)');
      cg.addColorStop(0.15,`rgba(255,255,255,${c.op*pulse})`);
      cg.addColorStop(0.85,`rgba(255,255,255,${c.op*pulse})`);
      cg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();
      ctx.ellipse(c.x+c.w*0.5,c.y,c.w*0.5,c.h,0,0,Math.PI*2);
      ctx.fill();
      /* Volume supérieur */
      ctx.beginPath();
      ctx.ellipse(c.x+c.w*0.42,c.y-c.h*1.1,c.w*0.32,c.h*1.2,0,0,Math.PI*2);
      ctx.fill();
     }
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond PNG plein canvas ── */
     ctx.fillStyle='#a8dde0';ctx.fillRect(0,0,W,H);
     if(bgReady){
      const iW=bgImg.naturalWidth||bgImg.width;
      const iH=bgImg.naturalHeight||bgImg.height;
      const scale=Math.max(W/iW, H/iH);
      const dW=iW*scale, dH=iH*scale;
      ctx.drawImage(bgImg,(W-dW)/2,(H-dH)/2,dW,dH);
     }

     /* ── Nuages ── */
     drawClouds();

     /* ── Oiseaux ── */
     drawBirds();

     /* ── Parapentes ── */
     for(const p of paragliders){
      p.x+=p.vx;
      p.y+=p.vy+Math.sin(t*0.35+p.ph)*0.12;
      p.ph+=0.012;
      if(p.x>W*1.15){p.x=-W*0.10;}
      if(p.y<H*0.08)p.vy=Math.abs(p.vy);
      if(p.y>H*0.55)p.vy=-Math.abs(p.vy);
      drawParaglider(p);
     }

     /* ── Particules graines ── */
     for(const s of seeds){
      s.x+=s.vx+Math.sin(t*0.5+s.ph)*0.15;
      s.y+=s.vy;
      s.ph+=s.spd;
      if(s.y<-5){s.y=H*0.70+Math.random()*H*0.10;s.x=Math.random()*W;}
      if(s.x<-5)s.x=W+5;if(s.x>W+5)s.x=-5;
      const flicker=0.65+0.35*Math.sin(s.ph*2.2);
      ctx.fillStyle=`rgba(255,252,240,${s.op*flicker})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette très légère ── */
     const vg=ctx.createRadialGradient(cx,H*0.52,H*0.12,cx,H*0.52,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.04)');
     vg.addColorStop(1,'rgba(0,0,0,0.38)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
