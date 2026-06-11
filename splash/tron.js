// CinéQuiz splash chunk — Tron
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Tron"]={
   name:'Tron',
   color:'0,200,255',
   ref:'Tron \u2014 Steven Lisberger, 1982',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.78';
    let t=0;
    const cx=W/2;
    const horizon=H*0.56;

    /* ── Positionner citation + logo dans la zone bleue ── */
    let _tronPos=document.getElementById('_tron_pos');
    if(!_tronPos){_tronPos=document.createElement('style');_tronPos.id='_tron_pos';document.head.appendChild(_tronPos);}
    _tronPos.textContent='#splash-content-wrap{top:31%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-film-logo{max-width:62%!important;}';
    const _tronPosW=setInterval(()=>{if(stop.v){_tronPos.textContent='';clearInterval(_tronPosW);}},200);

    // ── Grille perspective pré-calculée ──
    const gridC=document.createElement('canvas');
    gridC.width=W;gridC.height=H;
    const gx=gridC.getContext('2d');
    const vp={x:cx,y:horizon};

    // Lignes de fuite
    const nV=20;
    for(let i=0;i<=nV;i++){
     const fx=i/nV*W;
     const isMajor=(i===0||i===nV||i%5===0);
     const alpha=isMajor?0.18:0.07;
     gx.strokeStyle=`rgba(0,220,255,${alpha})`;
     gx.lineWidth=isMajor?1.2:0.6;
     gx.beginPath();
     gx.moveTo(vp.x+(fx-vp.x)*0.001,horizon);
     gx.lineTo(fx,H+20);
     gx.stroke();
    }
    // Horizontales en perspective
    const nH=16;
    for(let j=0;j<=nH;j++){
     const p=j/nH;
     const ep=Math.pow(p,1.7);
     const y=horizon+ep*(H-horizon+20);
     const spread=ep;
     const alpha=0.04+ep*0.18;
     gx.strokeStyle=`rgba(0,220,255,${alpha})`;
     gx.lineWidth=ep>0.7?1.0:0.5;
     gx.beginPath();
     gx.moveTo(vp.x-W*0.52*spread,y);
     gx.lineTo(vp.x+W*0.52*spread,y);
     gx.stroke();
    }

    // ── Light cycles — rails verticaux uniquement ──
    const TRAIL_LEN=280;

    function lanePos(laneX,laneT){
     const ep=Math.pow(laneT,1.7);
     const y=horizon+ep*(H-horizon+20);
     const x=cx+(laneX-cx)*ep;
     return {x,y};
    }

    const cycles=[
     {laneX:cx-W*0.38, laneT:0.04,  spd:0.006,  color:'0,220,255',  trail:[], delay:0},
     {laneX:cx+W*0.30, laneT:0.12,  spd:0.005,  color:'255,100,20', trail:[], delay:90},
     {laneX:cx-W*0.18, laneT:0.08,  spd:0.004,  color:'0,200,240',  trail:[], delay:160},
     {laneX:cx+W*0.48, laneT:0.06,  spd:0.0035, color:'255,140,30', trail:[], delay:240},
    ];

    function drawCycles(){
     for(const c of cycles){
      if(c.delay>0){c.delay--;continue;}
      c.laneT+=c.spd;
      if(c.laneT>1.02){
       c.laneT=0.02;
       c.delay=Math.floor(Math.random()*120+60);
       c.trail=[];continue;
      }
      const pos=lanePos(c.laneX,c.laneT);
      c.trail.push({...pos});
      if(c.trail.length>TRAIL_LEN)c.trail.shift();
      if(c.trail.length>2){
       for(let i=1;i<c.trail.length;i++){
        const prog=i/c.trail.length;
        ctx.strokeStyle=`rgba(${c.color},${Math.pow(prog,1.8)*0.85})`;
        ctx.lineWidth=0.8+prog*3.5;ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(c.trail[i-1].x,c.trail[i-1].y);ctx.lineTo(c.trail[i].x,c.trail[i].y);ctx.stroke();
       }
      }
      const hg=ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,14);
      hg.addColorStop(0,`rgba(${c.color},1.0)`);hg.addColorStop(0.4,`rgba(${c.color},0.5)`);hg.addColorStop(1,`rgba(${c.color},0)`);
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(pos.x,pos.y,14,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.9)';ctx.beginPath();ctx.arc(pos.x,pos.y,2.5,0,Math.PI*2);ctx.fill();
     }
    }

    // ── Disque identitaire — descendu dans la zone header ──
    const discR=Math.min(W,H)*0.078;
    const discX=cx, discY=H*0.235;
    let discAngle=0;

    // ── Particules de données ──
    const dataPts=Array.from({length:35},()=>({
     x:Math.random()*W,
     y:horizon+Math.random()*(H-horizon),
     vx:(Math.random()-0.5)*0.5,
     vy:-(Math.random()*0.3+0.1),
     r:Math.random()*1.2+0.3,
     op:Math.random()*0.35+0.08
    }));

    function drawDisc(){
     discAngle+=0.018;
     const R=discR;
     const dx=discX, dy=discY;

     // Halo externe pulsant
     const pulse=0.12+Math.sin(t*0.9)*0.05;
     const halo=ctx.createRadialGradient(dx,dy,R*0.8,dx,dy,R*2.8);
     halo.addColorStop(0,`rgba(0,210,255,${pulse})`);
     halo.addColorStop(0.4,`rgba(0,180,240,${pulse*0.3})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;
     ctx.fillRect(dx-R*3,dy-R*3,R*6,R*6);

     ctx.save();ctx.translate(dx,dy);

     // Fond du disque (très sombre, translucide)
     ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);
     ctx.fillStyle='rgba(0,8,20,0.60)';ctx.fill();

     ctx.rotate(discAngle);

     // Anneau externe — segments avec gaps
     const nSeg=12;
     for(let i=0;i<nSeg;i++){
      const a0=i/nSeg*Math.PI*2+0.08;
      const a1=(i+0.78)/nSeg*Math.PI*2;
      const bright=0.7+Math.sin(t*2+i*0.8)*0.25;
      ctx.beginPath();ctx.arc(0,0,R,a0,a1);
      ctx.strokeStyle=`rgba(0,230,255,${bright})`;
      ctx.lineWidth=R*0.08;ctx.stroke();
     }

     // Anneau médian
     const nSegM=8;
     for(let i=0;i<nSegM;i++){
      const a0=i/nSegM*Math.PI*2+0.12;
      const a1=(i+0.72)/nSegM*Math.PI*2;
      ctx.beginPath();ctx.arc(0,0,R*0.72,a0,a1);
      ctx.strokeStyle=`rgba(0,200,240,${0.45+Math.sin(t*1.5+i)*0.15})`;
      ctx.lineWidth=R*0.04;ctx.stroke();
     }

     // Cercle intérieur fin
     ctx.beginPath();ctx.arc(0,0,R*0.50,0,Math.PI*2);
     ctx.strokeStyle='rgba(0,180,230,0.25)';
     ctx.lineWidth=R*0.02;ctx.stroke();

     // Rayons internes (4)
     for(let i=0;i<4;i++){
      const a=i/4*Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a)*R*0.15,Math.sin(a)*R*0.15);
      ctx.lineTo(Math.cos(a)*R*0.48,Math.sin(a)*R*0.48);
      ctx.strokeStyle='rgba(0,210,255,0.30)';
      ctx.lineWidth=1.2;ctx.stroke();
     }

     // Centre lumineux
     const cg=ctx.createRadialGradient(0,0,0,0,0,R*0.14);
     cg.addColorStop(0,`rgba(180,245,255,${0.6+Math.sin(t*1.8)*0.2})`);
     cg.addColorStop(1,'rgba(0,150,220,0)');
     ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,0,R*0.14,0,Math.PI*2);ctx.fill();

     ctx.restore();

     // Reflet fixe (contre-rotation)
     ctx.save();ctx.translate(dx,dy);
     ctx.save();ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.clip();
     const spec=ctx.createRadialGradient(-R*0.35,-R*0.35,0,-R*0.2,-R*0.2,R*0.55);
     spec.addColorStop(0,'rgba(200,245,255,0.14)');
     spec.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=spec;ctx.fillRect(-R,-R,R*2,R*2);
     ctx.restore();ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,2,8,0.18)';ctx.fillRect(0,0,W,H);

     // Fond bleu nuit profond
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'rgba(0,4,14,0.08)');
     bg.addColorStop(0.5,'rgba(0,8,22,0.06)');
     bg.addColorStop(1,'rgba(0,3,10,0.08)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     // Grille
     ctx.drawImage(gridC,0,0);

     // Ligne d'horizon
     const hLine=ctx.createLinearGradient(0,horizon,W,horizon);
     hLine.addColorStop(0,'rgba(0,220,255,0)');
     hLine.addColorStop(0.25,`rgba(0,230,255,${0.30+Math.sin(t*0.7)*0.08})`);
     hLine.addColorStop(0.75,`rgba(0,230,255,${0.30+Math.sin(t*0.7)*0.08})`);
     hLine.addColorStop(1,'rgba(0,220,255,0)');
     ctx.strokeStyle=hLine;ctx.lineWidth=1.5;
     ctx.beginPath();ctx.moveTo(0,horizon);ctx.lineTo(W,horizon);ctx.stroke();

     // Lueur d'horizon
     const hGlow=ctx.createRadialGradient(cx,horizon,0,cx,horizon,W*0.55);
     hGlow.addColorStop(0,`rgba(0,180,255,${0.08+Math.sin(t*0.4)*0.03})`);
     hGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hGlow;ctx.fillRect(0,horizon-W*0.4,W,W*0.8);

     // Disque
     drawDisc();

     // Light cycles sur rails
     drawCycles();

     // Particules de données
     for(const p of dataPts){
      p.x+=p.vx;p.y+=p.vy;
      if(p.y<horizon)p.y=H-10;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,210,255,${p.op})`;ctx.fill();
     }

     // Vignette
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.06,cx,H*0.5,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,'rgba(0,2,8,0.20)');
     vg.addColorStop(1,'rgba(0,1,6,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
