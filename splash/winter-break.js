// CinéQuiz splash chunk — Winter Break
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Winter Break"]={
   name:'Winter Break',
   color:'120,180,220',
   ref:'The Holdovers \u2014 Alexander Payne, 2023',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _wbS=document.getElementById('_wb_s');
    if(!_wbS){_wbS=document.createElement('style');_wbS.id='_wb_s';document.head.appendChild(_wbS);}
    _wbS.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(240,230,210,0.92)!important;font-size:14px!important;text-shadow:0 1px 10px rgba(0,0,0,0.80)!important;}
     #splash-film-logo{max-width:60%!important;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.6))!important;}
    `;
    const _wbW=setInterval(()=>{if(stop.v){_wbS.textContent='';clearInterval(_wbW);}},200);

    /* ── Flocons de neige — deux tailles, tombent en biais ── */
    const flakes=Array.from({length:80},(_,i)=>({
      x:Math.random()*W*1.2-W*0.1,
      y:Math.random()*H,
      r: i<55 ? 1.0+Math.random()*1.8   /* petits */
               : 2.2+Math.random()*3.0,  /* gros premier plan */
      vy:0.25+Math.random()*0.55,
      vx:0.05+Math.random()*0.20,        /* léger biais à droite */
      op: i<55 ? 0.35+Math.random()*0.40
               : 0.50+Math.random()*0.40,
      ph:Math.random()*Math.PI*2,
      spd:0.008+Math.random()*0.018,
      drift:0.18+Math.random()*0.40,
    }));

    /* ── Bâtiment principal — Barton Academy ── */
    /* Façade de brique avec fenêtres orangées, pignon pointu */
    const bldW=W*0.62, bldH=H*0.55;
    const bldX=cx-bldW/2, bldY=H*0.36;

    /* Fenêtres du bâtiment — 3 rangées × 4 colonnes */
    const WIN_COLS=4, WIN_ROWS=3;
    const windows=Array.from({length:WIN_ROWS*WIN_COLS},(_,i)=>{
      const col=i%WIN_COLS, row=Math.floor(i/WIN_COLS);
      return {
        col, row,
        lit: Math.random()<0.78,
        warm: Math.random()<0.70,   /* orange chaud ou blanc froid */
        ph: Math.random()*Math.PI*2,
        spd: 0.004+Math.random()*0.008,
        flicker: Math.random()<0.15, /* quelques fenêtres qui vacillent */
      };
    });

    /* ── Arbres enneigés (sapins) des deux côtés ── */
    const leftTrees=[
      {x:W*0.02, h:H*0.28, w:W*0.10},
      {x:W*0.08, h:H*0.22, w:W*0.08},
      {x:W*0.14, h:H*0.18, w:W*0.07},
    ];
    const rightTrees=[
      {x:W*0.98, h:H*0.26, w:W*0.10},
      {x:W*0.92, h:H*0.20, w:W*0.08},
      {x:W*0.86, h:H*0.16, w:W*0.07},
    ];

    /* ── Sol enneigé ── */
    const snowBaseY=H*0.86;

    /* ── Lampadaire — lumière chaude ── */
    const lampX=W*0.20, lampBaseY=snowBaseY, lampH=H*0.28;

    function drawSky(){
      /* Ciel bleu-marine hivernal — plus lumineux vers l'horizon */
      const sky=ctx.createLinearGradient(0,0,0,snowBaseY);
      sky.addColorStop(0.00,'#080f1c');
      sky.addColorStop(0.30,'#0d1828');
      sky.addColorStop(0.62,'#152035');
      sky.addColorStop(0.85,'#1e2d42'); /* horizon plus clair */
      sky.addColorStop(1.00,'#243348');
      ctx.fillStyle=sky; ctx.fillRect(0,0,W,snowBaseY);

      /* Lueur ambrée de la ville/campus loin derrière — mélancolie */
      const ambG=ctx.createRadialGradient(cx,snowBaseY,0,cx,snowBaseY,W*0.75);
      ambG.addColorStop(0,`rgba(180,130,60,${0.12+Math.sin(t*0.15)*0.02})`);
      ambG.addColorStop(0.4,'rgba(120,80,30,0.05)');
      ambG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ambG; ctx.fillRect(0,0,W,snowBaseY);

      /* Quelques étoiles discrètes */
      if(!drawSky._stars){
        drawSky._stars=Array.from({length:30},()=>({
          x:Math.random()*W, y:Math.random()*H*0.55,
          r:0.5+Math.random()*1.0,
          op:0.15+Math.random()*0.35,
          ph:Math.random()*Math.PI*2,
          spd:0.006+Math.random()*0.012,
        }));
      }
      for(const s of drawSky._stars){
        s.ph+=s.spd;
        ctx.fillStyle=`rgba(220,230,255,${s.op*(0.5+0.5*Math.abs(Math.sin(s.ph)))})`;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
      }
    }

    function drawTree(x, h, w, mirrorX){
      const bx = mirrorX ? x-w : x-w;
      const baseY=snowBaseY+H*0.01;
      const tipY=baseY-h;
      const tipX = mirrorX ? x-w*0.5 : x;

      /* 3 étages de sapin */
      for(let s=0;s<3;s++){
        const sy=baseY - h*(s*0.30);
        const sh=h*(0.55-s*0.10);
        const sw=w*(1.0-s*0.28);
        /* Couleur sapin — vert très sombre avec neige */
        ctx.fillStyle='rgba(15,28,18,0.95)';
        ctx.beginPath();
        ctx.moveTo(tipX, sy-sh);
        ctx.lineTo(tipX-sw, sy);
        ctx.lineTo(tipX+sw, sy);
        ctx.closePath(); ctx.fill();
        /* Neige sur les branches */
        ctx.fillStyle='rgba(228,238,248,0.75)';
        ctx.beginPath();
        ctx.moveTo(tipX-sw*0.85, sy-sh*0.08);
        ctx.lineTo(tipX-sw*0.85+sw*0.18, sy);
        ctx.lineTo(tipX-sw*0.62, sy);
        ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tipX+sw*0.85, sy-sh*0.08);
        ctx.lineTo(tipX+sw*0.85-sw*0.18, sy);
        ctx.lineTo(tipX+sw*0.62, sy);
        ctx.closePath(); ctx.fill();
      }
      /* Tronc */
      ctx.fillStyle='rgba(30,20,12,0.85)';
      ctx.fillRect(tipX-w*0.06, baseY-h*0.12, w*0.12, h*0.13);
      /* Neige au sol sous le sapin */
      ctx.fillStyle='rgba(218,232,245,0.55)';
      ctx.beginPath();
      ctx.ellipse(tipX, baseY+H*0.005, w*0.65, H*0.018, 0, 0, Math.PI*2);
      ctx.fill();
    }

    function drawBuilding(){
      /* Ombre portée du bâtiment */
      const shG=ctx.createLinearGradient(bldX,bldY+bldH,bldX+bldW,bldY+bldH);
      shG.addColorStop(0,'rgba(0,0,0,0)');
      shG.addColorStop(0.5,'rgba(0,0,0,0.20)');
      shG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shG; ctx.fillRect(bldX,bldY+bldH,bldW,H*0.03);

      /* Façade brique — brun-rouge sombre avec texture bleutée (nuit) */
      const wallG=ctx.createLinearGradient(bldX,bldY,bldX+bldW,bldY+bldH);
      wallG.addColorStop(0,'rgba(30,25,38,0.96)');
      wallG.addColorStop(0.4,'rgba(35,28,42,0.95)');
      wallG.addColorStop(1,'rgba(22,18,30,0.98)');
      ctx.fillStyle=wallG;
      ctx.fillRect(bldX, bldY, bldW, bldH);

      /* Pignon central pointu — silhouette sombre */
      const peakH=H*0.18;
      ctx.fillStyle='rgba(18,14,26,0.97)';
      ctx.beginPath();
      ctx.moveTo(bldX, bldY);
      ctx.lineTo(cx, bldY-peakH);
      ctx.lineTo(bldX+bldW, bldY);
      ctx.closePath(); ctx.fill();

      /* Clocher / flèche centrale */
      const spireW=W*0.038, spireH=H*0.12;
      ctx.fillStyle='rgba(14,10,22,0.98)';
      ctx.beginPath();
      ctx.moveTo(cx, bldY-peakH-spireH);
      ctx.lineTo(cx-spireW, bldY-peakH+spireH*0.15);
      ctx.lineTo(cx+spireW, bldY-peakH+spireH*0.15);
      ctx.closePath(); ctx.fill();

      /* Colonnes de la façade */
      const colW=bldW/6;
      for(let c=0;c<5;c++){
        const cx2=bldX+colW*(c+0.5)+colW*0.3;
        ctx.fillStyle='rgba(24,20,32,0.60)';
        ctx.fillRect(cx2-colW*0.08, bldY, colW*0.16, bldH);
      }

      /* Fenêtres éclairées */
      const padX=bldW*0.10, padY=bldH*0.10;
      const cellW=(bldW-padX*2)/WIN_COLS;
      const cellH=(bldH-padY*2)/WIN_ROWS;
      const winW=cellW*0.52, winH=cellH*0.58;

      for(const w of windows){
        w.ph+=w.spd;
        const wx=bldX+padX+w.col*cellW+(cellW-winW)*0.5;
        const wy=bldY+padY+w.row*cellH+(cellH-winH)*0.5;
        if(!w.lit) continue;

        /* Vacillement */
        const flick = w.flicker ? 0.6+0.4*Math.abs(Math.sin(w.ph*3.2)) : 1.0;
        const brightness=0.62+Math.sin(w.ph)*0.08;

        /* Halo derrière la fenêtre */
        const wCx=wx+winW*0.5, wCy=wy+winH*0.5;
        const col=w.warm?[220,145,55]:[180,200,230];
        const hG=ctx.createRadialGradient(wCx,wCy,0,wCx,wCy,winW*1.4);
        hG.addColorStop(0,`rgba(${col[0]},${col[1]},${col[2]},${0.22*brightness*flick})`);
        hG.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=hG;
        ctx.fillRect(wx-winW*0.5,wy-winH*0.5,winW*2,winH*2);

        /* Vitre */
        const wG=ctx.createLinearGradient(wx,wy,wx+winW,wy+winH);
        wG.addColorStop(0,`rgba(${col[0]},${col[1]},${col[2]},${(0.55+brightness*0.20)*flick})`);
        wG.addColorStop(0.5,`rgba(${col[0]-20},${col[1]-10},${col[2]},${(0.45+brightness*0.15)*flick})`);
        wG.addColorStop(1,`rgba(${col[0]-30},${col[1]-20},${col[2]-20},${(0.35+brightness*0.10)*flick})`);
        ctx.fillStyle=wG;
        if(ctx.roundRect) ctx.roundRect(wx,wy,winW,winH,W*0.004);
        else ctx.rect(wx,wy,winW,winH);
        ctx.fill();

        /* Reflet blanc en haut à gauche de la vitre */
        ctx.fillStyle=`rgba(255,255,255,${0.12*flick})`;
        ctx.fillRect(wx+winW*0.06,wy+winH*0.06,winW*0.28,winH*0.12);

        /* Croisillon de la fenêtre */
        ctx.strokeStyle=`rgba(15,12,22,${0.60*flick})`;
        ctx.lineWidth=W*0.003;
        ctx.beginPath();ctx.moveTo(wx+winW*0.5,wy);ctx.lineTo(wx+winW*0.5,wy+winH);ctx.stroke();
        ctx.beginPath();ctx.moveTo(wx,wy+winH*0.5);ctx.lineTo(wx+winW,wy+winH*0.5);ctx.stroke();
      }

      /* Neige accumulée sur le rebord du toit */
      ctx.fillStyle='rgba(225,235,248,0.82)';
      ctx.beginPath();
      ctx.moveTo(bldX-W*0.01, bldY);
      for(let nx=0;nx<=20;nx++){
        const nx2=bldX+nx*(bldW/20);
        const ny=bldY - Math.sin(nx*0.8)*H*0.005 - H*0.008;
        ctx.lineTo(nx2, ny);
      }
      ctx.lineTo(bldX+bldW+W*0.01,bldY);
      ctx.closePath(); ctx.fill();
    }

    function drawLamp(){
      /* Poteau */
      ctx.strokeStyle='rgba(55,45,35,0.80)';
      ctx.lineWidth=W*0.010; ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(lampX,lampBaseY);ctx.lineTo(lampX,lampBaseY-lampH);ctx.stroke();
      /* Bras courbé */
      ctx.beginPath();
      ctx.moveTo(lampX,lampBaseY-lampH);
      ctx.quadraticCurveTo(lampX+W*0.03,lampBaseY-lampH+H*0.02,lampX+W*0.05,lampBaseY-lampH+H*0.04);
      ctx.stroke();

      /* Halo lampe — chaud, pulse très légèrement */
      const lPulse=0.88+Math.sin(t*0.30)*0.08;
      const lx=lampX+W*0.05, ly=lampBaseY-lampH+H*0.04;
      const lG=ctx.createRadialGradient(lx,ly,0,lx,ly,W*0.26);
      lG.addColorStop(0,`rgba(255,200,80,${0.65*lPulse})`);
      lG.addColorStop(0.12,`rgba(220,160,50,${0.30*lPulse})`);
      lG.addColorStop(0.35,'rgba(160,110,30,0.08)');
      lG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lG; ctx.fillRect(0,0,W,H*0.90);

      /* Ampoule */
      ctx.fillStyle=`rgba(255,230,140,${0.95*lPulse})`;
      ctx.beginPath();ctx.arc(lx,ly,W*0.014,0,Math.PI*2);ctx.fill();
      /* Capuchon */
      ctx.fillStyle='rgba(40,35,28,0.88)';
      ctx.beginPath();ctx.ellipse(lx,ly-W*0.014,W*0.022,W*0.009,0,0,Math.PI*2);ctx.fill();
    }

    function drawSnow(){
      /* Sol enneigé — colline douce */
      const snowG=ctx.createLinearGradient(0,snowBaseY,0,H);
      snowG.addColorStop(0,'rgba(218,232,248,0.98)');
      snowG.addColorStop(0.3,'rgba(208,225,242,0.99)');
      snowG.addColorStop(1,'rgba(195,215,235,1.0)');
      ctx.fillStyle=snowG;
      ctx.beginPath();
      ctx.moveTo(0,snowBaseY);
      /* Colline légèrement bombée */
      for(let sx=0;sx<=W;sx+=W/30){
        const sy=snowBaseY + Math.sin((sx/W)*Math.PI)*H*0.025 - H*0.010;
        sx===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);
      }
      ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();

      /* Reflet bleuté de nuit sur la neige */
      const blueG=ctx.createLinearGradient(0,snowBaseY,0,H);
      blueG.addColorStop(0,`rgba(100,140,200,${0.12+Math.sin(t*0.10)*0.02})`);
      blueG.addColorStop(1,'rgba(60,100,160,0.04)');
      ctx.fillStyle=blueG; ctx.fillRect(0,snowBaseY,W,H-snowBaseY);
    }

    function drawFlakes(){
      for(const f of flakes){
        f.ph+=f.spd;
        f.x+=f.vx+Math.sin(f.ph)*f.drift;
        f.y+=f.vy;
        if(f.y>H+4){f.y=-4; f.x=Math.random()*W*1.2-W*0.1;}
        if(f.x>W+4) f.x=-4;
        const alpha=f.op*(0.55+0.45*Math.abs(Math.sin(f.ph*0.7)));
        if(f.r>2.0){
          /* Gros flocon avec halo */
          const fg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*2.5);
          fg.addColorStop(0,`rgba(230,240,255,${alpha})`);
          fg.addColorStop(0.5,`rgba(200,220,245,${alpha*0.4})`);
          fg.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=fg; ctx.beginPath();ctx.arc(f.x,f.y,f.r*2.5,0,Math.PI*2);ctx.fill();
        } else {
          ctx.fillStyle=`rgba(220,235,252,${alpha})`;
          ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();
        }
      }
    }

    function frame(){
      if(stop.v)return;

      ctx.fillStyle='#080f1c'; ctx.fillRect(0,0,W,H);

      drawSky();
      drawSnow();

      /* Arbres */
      for(const tr of leftTrees)  drawTree(tr.x+tr.w*0.5, tr.h, tr.w, false);
      for(const tr of rightTrees) drawTree(tr.x-tr.w*0.5, tr.h, tr.w, true);

      drawBuilding();
      drawLamp();
      drawFlakes();

      /* Vignette chaleureuse — plus claire au centre */
      const vg=ctx.createRadialGradient(cx,H*0.48,H*0.08,cx,H*0.48,H*0.85);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.50,'rgba(5,10,20,0.04)');
      vg.addColorStop(0.78,'rgba(5,10,20,0.38)');
      vg.addColorStop(1,'rgba(4,8,16,0.88)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain pellicule — légère teinte chaude, style 70s */
      for(let i=0;i<25;i++){
        const gv=90+Math.random()*55|0;
        ctx.fillStyle=`rgba(${gv+20},${gv+10},${gv},${Math.random()*0.018})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
