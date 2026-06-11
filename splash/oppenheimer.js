// CinéQuiz splash chunk — Oppenheimer
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Oppenheimer"]={
   name:'Oppenheimer',
   color:'255,120,20',
   ref:'Oppenheimer \u2014 Christopher Nolan, 2023',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Positionnement citation + logo juste au-dessus des buildings ── */
    let _oppPos=document.getElementById('_opp_splash_pos');
    if(!_oppPos){_oppPos=document.createElement('style');_oppPos.id='_opp_splash_pos';document.head.appendChild(_oppPos);}
    _oppPos.textContent='#splash-content-wrap{top:56%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _oppPosWatch=setInterval(()=>{if(stop.v){_oppPos.textContent='';clearInterval(_oppPosWatch);}},200);

    /* ── Override fond : dégradé orange chaud de l'affiche ── */
    let _oppStyle=document.getElementById('_opp_splash_style');
    if(!_oppStyle){_oppStyle=document.createElement('style');_oppStyle.id='_opp_splash_style';document.head.appendChild(_oppStyle);}
    _oppStyle.textContent=`
      
      
      
      
    `;
    const _oppWatch=setInterval(()=>{if(stop.v){_oppStyle.textContent='';clearInterval(_oppWatch);}},200);

    /* ── Paramètres du symbole atomique ── */
    const atomCX=cx, atomCY=H*0.36;
    const orbitRX=W*0.300, orbitRY=W*0.108;

    /* 3 orbites inclinées — accélération très rapide */
    const orbits=[
     {tilt:0,           baseSpeed:0.018, angle:0},
     {tilt:Math.PI/3,   baseSpeed:-0.014,angle:2.1},
     {tilt:2*Math.PI/3, baseSpeed:0.016, angle:4.2},
    ];

    /* ── Particules de brillance autour du symbole ── */
    const sparks=Array.from({length:38},()=>({
     angle:Math.random()*Math.PI*2,
     dist:orbitRX*(0.72+Math.random()*0.55),
     size:Math.random()*2.2+0.4,
     op:Math.random()*0.35+0.08,
     phase:Math.random()*Math.PI*2,
     spd:(Math.random()-0.5)*0.018+0.006,
    }));

    /* ── Flash périodique Trinity ── */
    let flashTimer=120, flashOp=0;

    /* ── Silhouette de ville en bas ── */
    function drawSkyline(baseY){
     ctx.fillStyle='rgba(28,12,2,0.97)';
     const buildings=[
      [0.00,0.88,0.08],[0.06,0.82,0.06],[0.10,0.86,0.05],[0.14,0.78,0.07],
      [0.20,0.84,0.04],[0.23,0.80,0.06],[0.28,0.74,0.09],[0.36,0.82,0.05],
      [0.40,0.76,0.07],[0.46,0.85,0.04],[0.49,0.79,0.06],[0.54,0.72,0.10],
      [0.63,0.80,0.06],[0.68,0.86,0.05],[0.72,0.77,0.08],[0.79,0.83,0.04],
      [0.82,0.75,0.07],[0.88,0.81,0.05],[0.92,0.87,0.06],[0.96,0.84,0.04],
     ];
     for(const [xr,yr,wr] of buildings){
      const bx=xr*W,bw=wr*W,bh=(1-yr)*(H-baseY)*2.0;
      ctx.fillRect(bx,baseY-bh,bw,bh+4);
     }
     /* Remplir tout l'espace sous la skyline jusqu'en bas */
     ctx.fillRect(0,baseY,W,H-baseY);
    }

    /* ── Dessine une orbite elliptique inclinée ── */
    function drawOrbit(tilt,alpha){
     ctx.save();
     ctx.translate(atomCX,atomCY);
     ctx.rotate(tilt);
     ctx.strokeStyle=`rgba(255,248,220,${alpha})`;
     ctx.lineWidth=W*0.012;
     ctx.shadowColor='rgba(255,230,140,0.55)';
     ctx.shadowBlur=12;
     ctx.beginPath();
     ctx.ellipse(0,0,orbitRX,orbitRY,0,0,Math.PI*2);
     ctx.stroke();
     ctx.restore();
    }

    /* ── Position d'un électron sur son orbite inclinée ── */
    function electronPos(tilt,angle){
     const lx=Math.cos(angle)*orbitRX;
     const ly=Math.sin(angle)*orbitRY;
     return {
      x:atomCX+lx*Math.cos(tilt)-ly*Math.sin(tilt),
      y:atomCY+lx*Math.sin(tilt)+ly*Math.cos(tilt),
     };
    }

    /* ── Chapeau fedora centré ── */
    function drawFedora(cx2,cy2,s){
     ctx.save();
     ctx.shadowColor='rgba(0,0,0,0.55)';ctx.shadowBlur=18;
     ctx.fillStyle='rgba(18,8,2,0.98)';
     ctx.beginPath();ctx.ellipse(cx2,cy2+s*0.12,s*0.70,s*0.18,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();
     ctx.moveTo(cx2-s*0.40,cy2+s*0.10);
     ctx.bezierCurveTo(cx2-s*0.42,cy2-s*0.50,cx2+s*0.42,cy2-s*0.50,cx2+s*0.40,cy2+s*0.10);
     ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(8,3,1,0.98)';
     ctx.fillRect(cx2-s*0.40,cy2-s*0.05,s*0.80,s*0.14);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Flash Trinity périodique */
     flashTimer++;
     if(flashTimer>200){flashTimer=0;flashOp=0.55;}
     flashOp*=0.91;

     /* Fond dégradé poster */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#f0a020');
     bg.addColorStop(0.30,'#d4780c');
     bg.addColorStop(0.62,'#b85c08');
     bg.addColorStop(0.80,'#7a3404');
     bg.addColorStop(1.00,'#3a1502');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Flash lumineux */
     if(flashOp>0.005){
      const fg=ctx.createRadialGradient(atomCX,atomCY,0,atomCX,atomCY,W*0.70);
      fg.addColorStop(0,`rgba(255,240,180,${flashOp*0.55})`);
      fg.addColorStop(0.45,`rgba(255,180,40,${flashOp*0.18})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.fillRect(0,0,W,H);
     }

     /* Lueur centrale douce */
     const glow=ctx.createRadialGradient(atomCX,atomCY,0,atomCX,atomCY,orbitRX*1.25);
     glow.addColorStop(0,`rgba(255,220,100,${0.14+flashOp*0.18})`);
     glow.addColorStop(0.55,'rgba(220,130,20,0.06)');
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow;ctx.beginPath();ctx.arc(atomCX,atomCY,orbitRX*1.25,0,Math.PI*2);ctx.fill();

     /* Accélération très rapide — vitesse × (1 + t*0.8), plafonnée à 12× */
     const speedMult=Math.min(1+t*0.80, 12.0);
     orbits.forEach(o=>{o.angle+=o.baseSpeed*speedMult;});
     orbits.forEach(o=>drawOrbit(o.tilt,0.72));

     /* Noyau central */
     const nucG=ctx.createRadialGradient(atomCX,atomCY,0,atomCX,atomCY,W*0.038);
     nucG.addColorStop(0,`rgba(255,245,200,${0.90+flashOp*0.10})`);
     nucG.addColorStop(0.40,'rgba(255,200,80,0.60)');
     nucG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nucG;ctx.beginPath();ctx.arc(atomCX,atomCY,W*0.038,0,Math.PI*2);ctx.fill();
     ctx.fillStyle=`rgba(255,250,230,${0.95+flashOp*0.05})`;
     ctx.beginPath();ctx.arc(atomCX,atomCY,W*0.016,0,Math.PI*2);ctx.fill();

     /* Chapeau fedora au centre */
     drawFedora(atomCX,atomCY,W*0.130);

     /* Électrons */
     for(const o of orbits){
      const ep=electronPos(o.tilt,o.angle);
      const electronSize=W*0.028;
      const eg=ctx.createRadialGradient(ep.x,ep.y,0,ep.x,ep.y,electronSize*1.6);
      eg.addColorStop(0,`rgba(255,245,190,${0.80+flashOp*0.15})`);
      eg.addColorStop(0.50,'rgba(255,200,80,0.35)');
      eg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eg;ctx.beginPath();ctx.arc(ep.x,ep.y,electronSize*1.6,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,250,220,${0.95+flashOp*0.05})`;
      ctx.beginPath();ctx.arc(ep.x,ep.y,electronSize,0,Math.PI*2);ctx.fill();
     }

     /* ── Éclairs entre électrons — s'intensifient avec speedMult ── */
     const boltAlpha=Math.max(0,Math.min(1,(speedMult-2.5)/7.0));
     if(boltAlpha>0.01){
      const epos=orbits.map(o=>electronPos(o.tilt,o.angle));
      const pairs=[[0,1],[1,2],[2,0]];
      for(const [a,b] of pairs){
       const p1=epos[a],p2=epos[b];
       const segs=5+Math.floor(speedMult*0.8);
       const jitter=W*(0.018+speedMult*0.006);
       for(let stroke=0;stroke<2;stroke++){
        const lw=stroke===0?2.5:1.0;
        const la=boltAlpha*(stroke===0?0.75:0.40)*(0.6+Math.random()*0.4);
        ctx.save();
        ctx.strokeStyle=`rgba(255,${200+Math.random()*55|0},80,${la})`;
        ctx.lineWidth=lw;
        ctx.shadowColor=`rgba(255,220,60,${la*0.8})`;
        ctx.shadowBlur=stroke===0?10:4;
        ctx.lineCap='round';
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y);
        for(let si=1;si<segs;si++){
         const frac=si/segs;
         const mx=p1.x+(p2.x-p1.x)*frac+(Math.random()-0.5)*jitter;
         const my=p1.y+(p2.y-p1.y)*frac+(Math.random()-0.5)*jitter;
         ctx.lineTo(mx,my);
        }
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
        ctx.restore();
       }
      }
     }

     /* Particules de brillance */
     for(const sp of sparks){
      sp.angle+=sp.spd;sp.phase+=0.030;
      const sx=atomCX+Math.cos(sp.angle)*sp.dist*(1+Math.sin(sp.phase)*0.08);
      const sy=atomCY+Math.sin(sp.angle)*sp.dist*0.42*(1+Math.sin(sp.phase)*0.08);
      const sa=sp.op*(0.5+0.5*Math.sin(sp.phase))*(1+flashOp*0.6);
      ctx.fillStyle=`rgba(255,220,100,${sa})`;
      ctx.beginPath();ctx.arc(sx,sy,sp.size,0,Math.PI*2);ctx.fill();
     }

     /* Silhouette de ville */
     drawSkyline(H*0.835);

     /* Grain cinématique */
     for(let i=0;i<40;i++){
      const g=80+Math.random()*60|0;
      ctx.fillStyle=`rgba(${g+30},${g+10},${g-20},${Math.random()*0.022})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
