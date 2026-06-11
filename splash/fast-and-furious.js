// CinéQuiz splash chunk — Fast and Furious
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Fast and Furious"]={
   name:'Fast and Furious',
   color:'200,60,20',
   ref:'The Fast and the Furious \u2014 Rob Cohen, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _fnfS=document.getElementById('_fnf_s');
    if(!_fnfS){_fnfS=document.createElement('style');_fnfS.id='_fnf_s';document.head.appendChild(_fnfS);}
    _fnfS.textContent=`
     

     #splash-content-wrap{top:23%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(255,255,255,0.92)!important;font-size:14px!important;text-shadow:0 1px 10px rgba(0,0,0,0.95)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _fnfW=setInterval(()=>{if(stop.v){_fnfS.textContent='';clearInterval(_fnfW);}},200);

    /* ══ GÉOMÉTRIE ══ */
    const VP={x:cx, y:H*0.52};   /* point de fuite — route en perspective */
    const roadW=W*0.82;           /* largeur de la route en bas */

    /* ── Voiture frontale — dessinée en canvas ── */
    /* Elle arrive du point de fuite et grossit progressivement */
    /* Cycle : s'approche lentement puis repart */
    let carScale=0.0;
    let carDir=1; /* 1 = s'approche, -1 = repart */
    const CAR_SPD=0.0018;

    /* ── Néons underglow — couleur qui cycle ── */
    const NEON_COLS=[
      [0,200,255],   /* cyan */
      [255,60,0],    /* orange */
      [180,0,255],   /* violet */
      [0,255,120],   /* vert */
    ];
    let neonIdx=0;
    let neonT=0;

    /* ── Lignes de vitesse latérales ── */
    const streaks=Array.from({length:22},(_,i)=>({
      x:Math.random()*W,
      y:VP.y + (H-VP.y)*(0.1+Math.random()*0.85),
      len:W*(0.06+Math.random()*0.18),
      spd:W*(0.04+Math.random()*0.08),
      op:0.15+Math.random()*0.45,
      warm:Math.random()<0.5,
    }));

    /* ── Étincelles au sol ── */
    const sparks=Array.from({length:45},()=>({
      x:0,y:0,vx:0,vy:0,life:0,maxLife:0,r:0,active:false
    }));
    let sparkTimer=0;
    function spawnSpark(){
      sparkTimer++;
      if(sparkTimer%4!==0)return;
      const p=sparks.find(s=>!s.active)||sparks[0];
      /* Naissent le long de la route, côté sol */
      const rx=cx+(Math.random()-0.5)*roadW*0.7;
      const ry=H*0.72+Math.random()*H*0.20;
      p.x=rx; p.y=ry;
      p.vx=(Math.random()-0.5)*3.5;
      p.vy=-(Math.random()*2.5+0.5);
      p.maxLife=20+Math.random()*25;
      p.life=p.maxLife;
      p.r=0.8+Math.random()*1.8;
      p.active=true;
    }

    /* ── Lumières de ville en arrière-plan ── */
    const cityLights=Array.from({length:55},(_,i)=>({
      x:Math.random()*W,
      y:H*(0.10+Math.random()*0.42),
      r:W*(0.006+Math.random()*0.018),
      col:[[255,150,50],[80,160,255],[255,80,180],[255,200,60],[0,220,255]][i%5],
      op:0.12+Math.random()*0.30,
      ph:Math.random()*Math.PI*2,
      spd:0.015+Math.random()*0.025,
    }));

    function drawCity(){
      /* Skyline de buildings en silhouette */
      ctx.fillStyle='rgba(12,10,22,0.95)';
      const bldgs=[
        {x:0,w:W*0.08,h:H*0.18},{x:W*0.07,w:W*0.05,h:H*0.12},
        {x:W*0.11,w:W*0.07,h:H*0.22},{x:W*0.17,w:W*0.04,h:H*0.14},
        {x:W*0.20,w:W*0.06,h:H*0.10},{x:W*0.25,w:W*0.08,h:H*0.20},
        {x:W*0.32,w:W*0.05,h:H*0.08},{x:W*0.36,w:W*0.06,h:H*0.16},
        {x:W*0.41,w:W*0.07,h:H*0.12},{x:W*0.47,w:W*0.09,h:H*0.24},
        {x:W*0.55,w:W*0.06,h:H*0.18},{x:W*0.60,w:W*0.05,h:H*0.10},
        {x:W*0.64,w:W*0.08,h:H*0.22},{x:W*0.71,w:W*0.06,h:H*0.14},
        {x:W*0.76,w:W*0.07,h:H*0.20},{x:W*0.82,w:W*0.05,h:H*0.10},
        {x:W*0.86,w:W*0.08,h:H*0.16},{x:W*0.93,w:W*0.08,h:H*0.20},
      ];
      const horizY=H*0.50;
      for(const b of bldgs){
        ctx.fillRect(b.x, horizY-b.h, b.w, b.h);
        /* Quelques fenêtres jaunes/blanches */
        for(let wy=horizY-b.h+4;wy<horizY-6;wy+=H*0.022){
          for(let wx=b.x+3;wx<b.x+b.w-4;wx+=W*0.022){
            if(Math.sin(wx*7+wy*3+t*0.1)>0.3){
              ctx.fillStyle=`rgba(255,220,120,${0.12+Math.random()*0.08})`;
              ctx.fillRect(wx,wy,W*0.009,H*0.012);
            }
          }
        }
        ctx.fillStyle='rgba(12,10,22,0.95)';
      }

      /* Lumières de ville — bokeh flou */
      for(const l of cityLights){
        l.ph+=l.spd;
        const pulse=0.5+0.5*Math.sin(l.ph);
        const lg=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*3);
        lg.addColorStop(0,`rgba(${l.col[0]},${l.col[1]},${l.col[2]},${l.op*pulse})`);
        lg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=lg;
        ctx.beginPath();ctx.arc(l.x,l.y,l.r*3,0,Math.PI*2);ctx.fill();
      }
    }

    function drawRoad(){
      /* Route en asphalte avec perspective */
      const rg=ctx.createLinearGradient(0,VP.y,0,H);
      rg.addColorStop(0,'rgba(18,16,28,0.95)');
      rg.addColorStop(0.3,'rgba(22,20,32,0.98)');
      rg.addColorStop(1,'rgba(10,8,16,1.0)');
      ctx.fillStyle=rg;
      ctx.beginPath();
      ctx.moveTo(VP.x,VP.y);
      ctx.lineTo(0,H); ctx.lineTo(W,H);
      ctx.closePath(); ctx.fill();

      /* Reflet humide de la route — bande centrale luisante */
      const wetCx=cx, wetW=roadW*0.18;
      const wg=ctx.createLinearGradient(wetCx-wetW,VP.y,wetCx+wetW,VP.y);
      wg.addColorStop(0,'rgba(0,0,0,0)');
      wg.addColorStop(0.5,`rgba(60,80,140,${0.12+Math.sin(t*0.5)*0.04})`);
      wg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wg;
      ctx.beginPath();
      ctx.moveTo(VP.x,VP.y);
      ctx.lineTo(wetCx-wetW,H);
      ctx.lineTo(wetCx+wetW,H);
      ctx.closePath(); ctx.fill();

      /* Lignes de marquage en perspective */
      const dashCount=12;
      for(let i=0;i<dashCount;i++){
        const f0=(i+((t*0.8)%1))/dashCount;
        const f1=(i+0.4+((t*0.8)%1))/dashCount;
        if(f0>1||f1>1) continue;
        const y0=VP.y+(H-VP.y)*f0;
        const y1=VP.y+(H-VP.y)*Math.min(f1,1);
        const spread=f0*roadW*0.5;
        const lw=Math.max(1,f0*W*0.008);
        /* Ligne centrale jaune */
        ctx.strokeStyle=`rgba(220,190,50,${0.35+f0*0.30})`;
        ctx.lineWidth=lw;
        ctx.beginPath();ctx.moveTo(cx,y0);ctx.lineTo(cx,y1);ctx.stroke();
        /* Bords de la route */
        ctx.strokeStyle=`rgba(180,190,210,${0.18+f0*0.15})`;
        ctx.lineWidth=lw*0.7;
        ctx.beginPath();ctx.moveTo(VP.x-spread,y0);ctx.lineTo(VP.x-spread*(H-VP.y)/(H-VP.y+0.001),y1);ctx.stroke();
        ctx.beginPath();ctx.moveTo(VP.x+spread,y0);ctx.lineTo(VP.x+spread,y1);ctx.stroke();
      }
    }

    function drawStreaks(){
      for(const s of streaks){
        s.x-=s.spd;
        if(s.x+s.len<0){ s.x=W+s.len; s.y=VP.y+(H-VP.y)*(0.1+Math.random()*0.85); }
        const col=s.warm?'255,140,40':'200,220,255';
        const sg=ctx.createLinearGradient(s.x,s.y,s.x+s.len,s.y);
        sg.addColorStop(0,`rgba(${col},0)`);
        sg.addColorStop(0.3,`rgba(${col},${s.op})`);
        sg.addColorStop(1,`rgba(${col},0)`);
        ctx.strokeStyle=sg;
        ctx.lineWidth=W*0.0015+Math.random()*W*0.0008;
        ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x+s.len,s.y);ctx.stroke();
      }
    }

    function drawCar(){
      /* Voiture stylisée de face — approche depuis le VP */
      /* carScale : 0=au VP (invisible), 1=pleine taille */
      carScale+=CAR_SPD*carDir;
      if(carScale>0.88){ carDir=-1; }
      if(carScale<0.0){ carDir=1; carScale=0; }

      const cs=carScale;
      if(cs<0.02) return;

      /* Position et taille */
      const carW=W*0.55*cs;
      const carH=carW*0.38;
      const carX=cx-carW/2;
      const carY=VP.y+(H-VP.y)*0.45-carH*0.5
               + (H-VP.y)*0.45*(1-cs); /* descend en s'approchant */

      /* Halo de phares — projetés vers le bas de la route */
      const headL=carX+carW*0.18;
      const headR=carX+carW*0.82;
      const headY=carY+carH*0.35;
      for(const hx of [headL,headR]){
        const bg=ctx.createRadialGradient(hx,headY,0,hx,headY,W*0.35*cs);
        bg.addColorStop(0,`rgba(255,240,200,${0.55*cs})`);
        bg.addColorStop(0.2,`rgba(220,200,150,${0.18*cs})`);
        bg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
        /* Cone lumineux vers la route */
        const cg=ctx.createLinearGradient(hx,headY,hx,H);
        cg.addColorStop(0,`rgba(255,240,180,${0.12*cs})`);
        cg.addColorStop(0.5,`rgba(200,180,120,${0.05*cs})`);
        cg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=cg;
        ctx.beginPath();
        ctx.moveTo(hx-W*0.02*cs,headY);
        ctx.lineTo(hx-W*0.30*cs,H);
        ctx.lineTo(hx+W*0.30*cs,H);
        ctx.lineTo(hx+W*0.02*cs,headY);
        ctx.closePath();ctx.fill();
      }

      /* Néon underglow */
      neonT+=0.008;
      const ni=Math.floor(neonT)%NEON_COLS.length;
      const nf=neonT%1;
      const nc0=NEON_COLS[ni];
      const nc1=NEON_COLS[(ni+1)%NEON_COLS.length];
      const nr=Math.round(nc0[0]+(nc1[0]-nc0[0])*nf);
      const ng=Math.round(nc0[1]+(nc1[1]-nc0[1])*nf);
      const nb2=Math.round(nc0[2]+(nc1[2]-nc0[2])*nf);
      const neonAlpha=0.45*cs;
      const glowG=ctx.createRadialGradient(cx,carY+carH,0,cx,carY+carH,carW*0.65);
      glowG.addColorStop(0,`rgba(${nr},${ng},${nb2},${neonAlpha})`);
      glowG.addColorStop(0.5,`rgba(${nr},${ng},${nb2},${neonAlpha*0.3})`);
      glowG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=glowG;
      ctx.beginPath();ctx.ellipse(cx,carY+carH,carW*0.65,carW*0.12,0,0,Math.PI*2);ctx.fill();

      /* Carrosserie */
      const bodyG=ctx.createLinearGradient(carX,carY,carX+carW,carY+carH);
      bodyG.addColorStop(0,'rgba(55,55,70,0.98)');
      bodyG.addColorStop(0.4,'rgba(80,80,95,0.96)');
      bodyG.addColorStop(1,'rgba(30,30,42,0.99)');
      ctx.fillStyle=bodyG;
      /* Corps principal */
      ctx.beginPath();
      ctx.moveTo(carX+carW*0.05,carY+carH);
      ctx.lineTo(carX,carY+carH*0.65);
      ctx.bezierCurveTo(carX,carY+carH*0.40,carX+carW*0.15,carY,carX+carW*0.28,carY);
      ctx.lineTo(carX+carW*0.72,carY);
      ctx.bezierCurveTo(carX+carW*0.85,carY,carX+carW,carY+carH*0.40,carX+carW,carY+carH*0.65);
      ctx.lineTo(carX+carW*0.95,carY+carH);
      ctx.closePath(); ctx.fill();

      /* Pare-brise */
      ctx.fillStyle=`rgba(50,80,120,${0.35*cs})`;
      ctx.beginPath();
      ctx.moveTo(carX+carW*0.25,carY+H*0.002);
      ctx.lineTo(carX+carW*0.75,carY+H*0.002);
      ctx.lineTo(carX+carW*0.68,carY+carH*0.48);
      ctx.lineTo(carX+carW*0.32,carY+carH*0.48);
      ctx.closePath(); ctx.fill();

      /* Phares avant — ovales lumineux */
      for(const hx of [carX+carW*0.14,carX+carW*0.86]){
        const hg=ctx.createRadialGradient(hx,headY,0,hx,headY,carW*0.10);
        hg.addColorStop(0,`rgba(255,252,230,${0.95*cs})`);
        hg.addColorStop(0.4,`rgba(220,210,180,${0.60*cs})`);
        hg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=hg;
        ctx.beginPath();ctx.ellipse(hx,headY,carW*0.10,carH*0.12,0,0,Math.PI*2);ctx.fill();
      }

      /* Reflet central sur capot */
      ctx.fillStyle=`rgba(180,190,210,${0.08*cs})`;
      ctx.beginPath();ctx.ellipse(cx,carY+carH*0.20,carW*0.12,carH*0.10,0,0,Math.PI*2);ctx.fill();

      /* Ombre portée sous la voiture */
      const shG=ctx.createRadialGradient(cx,carY+carH,0,cx,carY+carH,carW*0.5);
      shG.addColorStop(0,`rgba(0,0,0,${0.50*cs})`);
      shG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shG;
      ctx.beginPath();ctx.ellipse(cx,carY+carH+carH*0.08,carW*0.5,carH*0.12,0,0,Math.PI*2);ctx.fill();
    }

    function drawSparks(){
      spawnSpark();
      for(const p of sparks){
        if(!p.active)continue;
        p.x+=p.vx; p.y+=p.vy; p.vy+=0.12; p.life--;
        if(p.life<=0){p.active=false;continue;}
        const ef=p.life/p.maxLife;
        const col=Math.random()<0.6?`255,${140+Math.random()*80|0},20`:'255,255,220';
        ctx.fillStyle=`rgba(${col},${ef*0.85})`;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r*ef,0,Math.PI*2);ctx.fill();
      }
    }

    function frame(){
      if(stop.v)return;

      ctx.fillStyle='#050508'; ctx.fillRect(0,0,W,H);

      /* Ciel — dégradé nuit urbaine */
      const sky=ctx.createLinearGradient(0,0,0,H*0.52);
      sky.addColorStop(0,'rgb(4,4,10)');
      sky.addColorStop(0.5,'rgb(8,7,18)');
      sky.addColorStop(1,'rgb(14,12,28)');
      ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*0.52);

      drawCity();
      drawRoad();
      drawStreaks();
      drawCar();
      drawSparks();

      /* Vignette intense */
      const vg=ctx.createRadialGradient(cx,H*0.52,H*0.04,cx,H*0.52,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.42,'rgba(3,2,8,0.08)');
      vg.addColorStop(0.72,'rgba(3,2,8,0.52)');
      vg.addColorStop(1,'rgba(2,1,6,0.97)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Motion blur horizontal — sensation de vitesse */
      ctx.fillStyle=`rgba(5,5,8,${0.04+carScale*0.06})`;
      ctx.fillRect(0,0,W,H);

      /* Grain */
      for(let i=0;i<22;i++){
        const gv=15+Math.random()*25|0;
        ctx.fillStyle=`rgba(${gv},${gv+5},${gv+15},${Math.random()*0.018})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
