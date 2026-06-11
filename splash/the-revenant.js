// CinéQuiz splash chunk — The Revenant
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["The Revenant"]={
   name:'The Revenant',
   color:'120,160,200',
   ref:'The Revenant — Alejandro G. Iñárritu, 2015',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _rvS=document.getElementById('_rv_s');
    if(!_rvS){_rvS=document.createElement('style');_rvS.id='_rv_s';document.head.appendChild(_rvS);}
    _rvS.textContent=`
     

     #splash-content-wrap{top:30%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(0,0,0,0.92)!important;font-size:14px!important;text-shadow:none!important;}
     #splash-film-ref,#splash-film-ref *{color:#000000!important;-webkit-text-fill-color:#000000!important;text-shadow:none!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _rvW=setInterval(()=>{if(stop.v){_rvS.textContent='';clearInterval(_rvW);}},200);

    /* ── Image de fond PNG — plein écran ── */
    const bgImg=new Image(); let bgReady=false;
    bgImg.onload=()=>{ bgReady=true; };
    bgImg.src='images/Revenant.png';

    /* ── Flocons de neige ── */
    const flakes=Array.from({length:90},()=>({
      x:Math.random()*W,
      y:Math.random()*H,
      r:0.5+Math.random()*2.2,
      vy:0.22+Math.random()*0.55,
      vx:(Math.random()-0.5)*0.35,
      op:0.25+Math.random()*0.55,
      ph:Math.random()*Math.PI*2,
      spd:0.012+Math.random()*0.022,
      drift:0.30+Math.random()*0.55,
    }));

    /* ── Nuages effilochés hivernaux ── */
    const clouds=Array.from({length:9},(_,i)=>({
      x:  (i%3)*W*0.40 + Math.random()*W*0.20 - W*0.10,
      y:  H*(0.04 + Math.floor(i/3)*0.045 + Math.random()*0.020),
      w:  W*(0.45+Math.random()*0.40),
      h:  H*(0.008+Math.random()*0.010),
      op: 0.28+Math.random()*0.30,
      ph: Math.random()*Math.PI*2,
      spd:0.002+Math.random()*0.003,
      dx: 0.025+Math.random()*0.040,
      dy: (Math.random()-0.5)*0.006,
    }));

    /* ── Nuages additionnels — plus bas, sous le logo (30%→55%) ── */
    const cloudsLow=Array.from({length:10},(_,i)=>({
      x:  (i%4)*W*0.30 + Math.random()*W*0.18 - W*0.08,
      y:  H*(0.30 + Math.random()*0.22),
      w:  W*(0.35+Math.random()*0.50),
      h:  H*(0.010+Math.random()*0.014),
      op: 0.16+Math.random()*0.22,
      ph: Math.random()*Math.PI*2,
      spd:0.002+Math.random()*0.003,
      dx: 0.018+Math.random()*0.032,
      dy: (Math.random()-0.5)*0.005,
    }));

    /* ── Particules de brume froide ── */
    const mists=Array.from({length:6},()=>({
      x:Math.random()*W*1.4-W*0.2,
      y:H*(0.48+Math.random()*0.12),
      w:W*(0.40+Math.random()*0.40),
      h:H*(0.025+Math.random()*0.030),
      op:0.04+Math.random()*0.06,
      ph:Math.random()*Math.PI*2,
      spd:0.004+Math.random()*0.006,
      dx:(Math.random()-0.5)*0.15,
    }));

    function drawClouds(){
      for(const c of [...clouds, ...cloudsLow]){
        c.ph += c.spd;
        c.x  += c.dx;
        c.y  += Math.sin(c.ph*0.5)*c.dy;
        if(c.x > W*1.15) c.x = -c.w;
        const pulse = 0.80 + 0.20*Math.sin(c.ph);
        const cx2 = c.x + c.w*0.5, cy2 = c.y;
        const lg = ctx.createLinearGradient(c.x, 0, c.x+c.w, 0);
        lg.addColorStop(0,   'rgba(210,230,248,0)');
        lg.addColorStop(0.08,`rgba(225,240,252,${c.op*pulse})`);
        lg.addColorStop(0.35,`rgba(232,244,255,${c.op*pulse*1.10})`);
        lg.addColorStop(0.65,`rgba(228,242,254,${c.op*pulse*1.05})`);
        lg.addColorStop(0.92,`rgba(218,236,250,${c.op*pulse})`);
        lg.addColorStop(1,   'rgba(210,230,248,0)');
        ctx.fillStyle = lg;
        ctx.beginPath();
        ctx.ellipse(cx2, cy2, c.w*0.5, c.h, 0, 0, Math.PI*2);
        ctx.fill();
        const tg = ctx.createLinearGradient(c.x, cy2-c.h*2.5, c.x+c.w, cy2-c.h*2.5);
        tg.addColorStop(0,   'rgba(215,235,252,0)');
        tg.addColorStop(0.12,`rgba(220,238,254,${c.op*pulse*0.45})`);
        tg.addColorStop(0.50,`rgba(225,242,255,${c.op*pulse*0.55})`);
        tg.addColorStop(0.88,`rgba(220,238,254,${c.op*pulse*0.45})`);
        tg.addColorStop(1,   'rgba(215,235,252,0)');
        ctx.fillStyle = tg;
        ctx.beginPath();
        ctx.ellipse(cx2, cy2-c.h*1.2, c.w*0.46, c.h*1.4, 0, 0, Math.PI*2);
        ctx.fill();
      }
    }

    function drawMist(){
      for(const m of mists){
        m.ph+=m.spd; m.x+=m.dx;
        if(m.x>W*1.2)m.x=-m.w; if(m.x<-m.w)m.x=W*1.1;
        const pulse=0.7+0.3*Math.sin(m.ph);
        const mg=ctx.createLinearGradient(m.x,0,m.x+m.w,0);
        mg.addColorStop(0,'rgba(180,210,235,0)');
        mg.addColorStop(0.3,`rgba(180,210,235,${m.op*pulse})`);
        mg.addColorStop(0.7,`rgba(180,210,235,${m.op*pulse})`);
        mg.addColorStop(1,'rgba(180,210,235,0)');
        ctx.fillStyle=mg;
        ctx.beginPath();
        ctx.ellipse(m.x+m.w*0.5, m.y, m.w*0.5, m.h, 0, 0, Math.PI*2);
        ctx.fill();
      }
    }

    function drawFlakes(){
      for(const f of flakes){
        f.ph+=f.spd;
        f.x+=f.vx+Math.sin(f.ph)*f.drift;
        f.y+=f.vy;
        if(f.y>H+f.r){f.y=-f.r; f.x=Math.random()*W;}
        if(f.x<-f.r)f.x=W+f.r; if(f.x>W+f.r)f.x=-f.r;
        ctx.fillStyle=`rgba(255,255,255,${f.op*(0.6+0.4*Math.abs(Math.sin(f.ph)))})`;
        ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill();
      }
    }

    function drawDecor(){
      if(!revReady) return;
      /* SVG 737×574 — pleine largeur, ancré en bas */
      const imgW=W*1.02;
      const imgH=imgW/REV_RATIO;
      const imgX=cx-imgW/2;
      const imgY=H-imgH+imgH*0.02;
      ctx.drawImage(revImg, imgX, imgY, imgW, imgH);
    }

    function frame(){
      if(stop.v) return;

      /* Image de fond PNG plein écran */
      if(bgReady){
        ctx.drawImage(bgImg, 0, 0, W, H);
      } else {
        ctx.fillStyle='#9ec8e0'; ctx.fillRect(0,0,W,H);
      }

      drawClouds();
      drawMist();
      drawFlakes();

      /* Vignette bleue */
      const vg=ctx.createRadialGradient(cx,H*0.46,H*0.05,cx,H*0.46,H*0.90);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.50,'rgba(10,28,50,0.06)');
      vg.addColorStop(0.78,'rgba(10,25,45,0.45)');
      vg.addColorStop(1,'rgba(8,20,38,0.92)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain froid très léger */
      for(let i=0;i<20;i++){
        const gv=140+Math.random()*60|0;
        ctx.fillStyle=`rgba(${gv},${gv+15},${gv+30},${Math.random()*0.014})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.3+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
