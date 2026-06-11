// CinéQuiz splash chunk — Les Goonies
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Les Goonies"]={
   name:'Les Goonies',
   color:'40,120,200',
   ref:'Les Goonies \u2014 Richard Donner, 1985',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    let _goS=document.getElementById('_go_s');
    if(!_goS){_goS=document.createElement('style');_goS.id='_go_s';document.head.appendChild(_goS);}
    _goS.textContent='#splash-content-wrap{top:68%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _goW=setInterval(()=>{if(stop.v){_goS.textContent='';clearInterval(_goW);}},200);

    /* Pieces d or */
    const coins=Array.from({length:26},()=>({
     x:Math.random()*W, y:H*0.4+Math.random()*H*0.4,
     vx:(Math.random()-0.5)*1.4, vy:-(Math.random()*1.6+0.5),
     r:Math.random()*6+3, rot:Math.random()*Math.PI*2, vrot:(Math.random()-0.5)*0.08
    }));

    /* Etoiles visibles dans l ouverture */
    const stars=Array.from({length:60},()=>({
     x:W*0.22+Math.random()*W*0.56, y:Math.random()*H*0.28,
     r:Math.random()*1.0+0.2, op:Math.random()*0.7+0.2,
     tw:Math.random()*Math.PI*2, tf:0.02+Math.random()*0.035
    }));

    /* Gouttelettes d eau */
    const drops=Array.from({length:14},()=>({
     x:W*(0.22+Math.random()*0.56), y:Math.random()*H*0.5,
     vy:1.2+Math.random()*2.0, trail:[], splashOp:0, splashR:0
    }));

    /* Particules de poussiere */
    const dust=Array.from({length:30},()=>({
     x:Math.random()*W*0.6+W*0.2, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18, vy:-(Math.random()*0.12+0.04),
     r:Math.random()*1.4+0.4, op:Math.random()*0.25+0.05
    }));

    function drawTreasureChest(tx,ty){
     const cs=W*0.15;
     ctx.save(); ctx.translate(tx,ty);
     const shadow=ctx.createRadialGradient(0,cs*0.52,2,0,cs*0.52,cs*0.7);
     shadow.addColorStop(0,'rgba(0,0,0,0.45)'); shadow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shadow; ctx.beginPath(); ctx.ellipse(0,cs*0.54,cs*0.7,cs*0.14,0,0,Math.PI*2); ctx.fill();
     const cg=ctx.createLinearGradient(-cs*0.5,0,cs*0.5,cs*0.5);
     cg.addColorStop(0,'rgba(110,65,18,0.97)'); cg.addColorStop(1,'rgba(60,32,8,0.99)');
     ctx.fillStyle=cg; ctx.beginPath(); ctx.roundRect(-cs*0.5,0,cs,cs*0.50,4); ctx.fill();
     ctx.strokeStyle='rgba(180,115,25,0.65)'; ctx.lineWidth=1.5;
     ctx.beginPath(); ctx.roundRect(-cs*0.5,0,cs,cs*0.50,4); ctx.stroke();
     ctx.strokeStyle='rgba(160,110,20,0.45)'; ctx.lineWidth=1.2;
     ctx.beginPath(); ctx.moveTo(-cs*0.5,cs*0.18); ctx.lineTo(cs*0.5,cs*0.18); ctx.stroke();
     ctx.beginPath(); ctx.moveTo(-cs*0.5,cs*0.36); ctx.lineTo(cs*0.5,cs*0.36); ctx.stroke();
     const lid=ctx.createLinearGradient(-cs*0.5,-cs*0.30,cs*0.5,0);
     lid.addColorStop(0,'rgba(120,75,20,0.96)'); lid.addColorStop(0.6,'rgba(85,48,12,0.98)'); lid.addColorStop(1,'rgba(65,36,8,0.99)');
     ctx.fillStyle=lid;
     ctx.beginPath();
     ctx.moveTo(-cs*0.5,0); ctx.bezierCurveTo(-cs*0.5,-cs*0.32,cs*0.5,-cs*0.32,cs*0.5,0); ctx.closePath();
     ctx.fill();
     ctx.strokeStyle='rgba(180,115,25,0.55)'; ctx.lineWidth=1.5;
     ctx.beginPath();
     ctx.moveTo(-cs*0.5,0); ctx.bezierCurveTo(-cs*0.5,-cs*0.32,cs*0.5,-cs*0.32,cs*0.5,0);
     ctx.stroke();
     ctx.strokeStyle=`rgba(230,180,35,${0.88+Math.sin(t*2.2)*0.10})`; ctx.lineWidth=2.5;
     ctx.beginPath(); ctx.arc(0,-cs*0.11,cs*0.115,0,Math.PI*2); ctx.stroke();
     const lockG=ctx.createRadialGradient(-cs*0.03,-cs*0.14,1,0,-cs*0.11,cs*0.07);
     lockG.addColorStop(0,'rgba(255,220,60,0.98)'); lockG.addColorStop(1,'rgba(190,138,18,0.82)');
     ctx.fillStyle=lockG; ctx.beginPath(); ctx.arc(0,-cs*0.11,cs*0.055,0,Math.PI*2); ctx.fill();
     const glowG=ctx.createRadialGradient(0,cs*0.15,1,0,cs*0.15,cs*0.38);
     glowG.addColorStop(0,`rgba(255,195,35,${0.42+Math.sin(t*1.9)*0.14})`);
     glowG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glowG; ctx.fillRect(-cs*0.5,0,cs,cs*0.50);
     ctx.restore();
    }

    /* Stalactites fixes */
    const stalactites=[
     {x:W*0.24,len:H*0.055,w:W*0.018},{x:W*0.30,len:H*0.038,w:W*0.013},
     {x:W*0.37,len:H*0.065,w:W*0.016},{x:W*0.44,len:H*0.030,w:W*0.011},
     {x:W*0.50,len:H*0.048,w:W*0.015},{x:W*0.57,len:H*0.070,w:W*0.018},
     {x:W*0.63,len:H*0.035,w:W*0.012},{x:W*0.70,len:H*0.055,w:W*0.016},
     {x:W*0.76,len:H*0.042,w:W*0.014},
    ];

    function drawWalls(){
     /* ── Mur gauche avec gradient pierre ── */
     const wgL=ctx.createLinearGradient(0,0,W*0.26,0);
     wgL.addColorStop(0,'rgba(8,5,2,1)');
     wgL.addColorStop(0.45,'rgba(62,40,18,0.98)');
     wgL.addColorStop(0.75,'rgba(88,58,25,0.92)');
     wgL.addColorStop(1,'rgba(105,70,28,0.55)');
     ctx.fillStyle=wgL;
     ctx.beginPath();
     ctx.moveTo(0,0); ctx.lineTo(W*0.24,0);
     ctx.lineTo(W*0.20,H*0.12); ctx.lineTo(W*0.25,H*0.22);
     ctx.lineTo(W*0.16,H*0.32); ctx.lineTo(W*0.20,H*0.42);
     ctx.lineTo(W*0.12,H*0.52); ctx.lineTo(W*0.17,H*0.63);
     ctx.lineTo(W*0.13,H*0.75); ctx.lineTo(W*0.18,H*0.88);
     ctx.lineTo(W*0.14,H); ctx.lineTo(0,H);
     ctx.closePath(); ctx.fill();
     /* Détail de texture gauche */
     ctx.strokeStyle='rgba(130,85,30,0.18)';ctx.lineWidth=1;
     for(let i=0;i<6;i++){
      const fy=H*(0.08+i*0.16);
      ctx.beginPath();ctx.moveTo(W*0.06,fy);ctx.lineTo(W*0.20,fy+H*0.04);ctx.stroke();
     }
     /* Bord lumineux gauche — reflet torche */
     const edgeL=ctx.createLinearGradient(W*0.14,0,W*0.26,0);
     edgeL.addColorStop(0,'rgba(180,110,30,0.0)');
     edgeL.addColorStop(1,'rgba(180,110,30,0.22)');
     ctx.fillStyle=edgeL;
     ctx.beginPath();
     ctx.moveTo(W*0.14,0); ctx.lineTo(W*0.24,0);
     ctx.lineTo(W*0.20,H*0.12); ctx.lineTo(W*0.25,H*0.22);
     ctx.lineTo(W*0.16,H*0.32); ctx.lineTo(W*0.20,H*0.42);
     ctx.lineTo(W*0.12,H*0.52); ctx.lineTo(W*0.14,H);
     ctx.closePath(); ctx.fill();

     /* ── Mur droit ── */
     const wgR=ctx.createLinearGradient(W,0,W*0.74,0);
     wgR.addColorStop(0,'rgba(8,5,2,1)');
     wgR.addColorStop(0.45,'rgba(62,40,18,0.98)');
     wgR.addColorStop(0.75,'rgba(88,58,25,0.92)');
     wgR.addColorStop(1,'rgba(105,70,28,0.55)');
     ctx.fillStyle=wgR;
     ctx.beginPath();
     ctx.moveTo(W,0); ctx.lineTo(W*0.76,0);
     ctx.lineTo(W*0.80,H*0.12); ctx.lineTo(W*0.75,H*0.22);
     ctx.lineTo(W*0.84,H*0.32); ctx.lineTo(W*0.80,H*0.42);
     ctx.lineTo(W*0.88,H*0.52); ctx.lineTo(W*0.83,H*0.63);
     ctx.lineTo(W*0.87,H*0.75); ctx.lineTo(W*0.82,H*0.88);
     ctx.lineTo(W*0.86,H); ctx.lineTo(W,H);
     ctx.closePath(); ctx.fill();
     ctx.strokeStyle='rgba(130,85,30,0.18)';ctx.lineWidth=1;
     for(let i=0;i<6;i++){
      const fy=H*(0.08+i*0.16);
      ctx.beginPath();ctx.moveTo(W*0.94,fy);ctx.lineTo(W*0.80,fy+H*0.04);ctx.stroke();
     }
     const edgeR=ctx.createLinearGradient(W*0.86,0,W*0.74,0);
     edgeR.addColorStop(0,'rgba(180,110,30,0.0)');
     edgeR.addColorStop(1,'rgba(180,110,30,0.22)');
     ctx.fillStyle=edgeR;
     ctx.beginPath();
     ctx.moveTo(W*0.86,0); ctx.lineTo(W*0.76,0);
     ctx.lineTo(W*0.80,H*0.12); ctx.lineTo(W*0.75,H*0.22);
     ctx.lineTo(W*0.84,H*0.32); ctx.lineTo(W*0.80,H*0.42);
     ctx.lineTo(W*0.88,H*0.52); ctx.lineTo(W*0.86,H);
     ctx.closePath(); ctx.fill();

     /* ── Sol de la grotte ── */
     const floorG=ctx.createLinearGradient(0,H*0.85,0,H);
     floorG.addColorStop(0,'rgba(45,28,10,0.95)');
     floorG.addColorStop(1,'rgba(12,7,2,0.98)');
     ctx.fillStyle=floorG;
     ctx.beginPath();
     ctx.moveTo(0,H); ctx.lineTo(W,H); ctx.lineTo(W,H*0.88);
     ctx.lineTo(W*0.85,H*0.86); ctx.lineTo(W*0.70,H*0.88);
     ctx.lineTo(W*0.55,H*0.85); ctx.lineTo(cx,H*0.87);
     ctx.lineTo(W*0.40,H*0.85); ctx.lineTo(W*0.25,H*0.88);
     ctx.lineTo(W*0.12,H*0.86); ctx.lineTo(0,H*0.88);
     ctx.closePath(); ctx.fill();

     /* ── Plafond de la grotte ── */
     const ceilG=ctx.createLinearGradient(0,0,0,H*0.08);
     ceilG.addColorStop(0,'rgba(22,14,5,1)');
     ceilG.addColorStop(1,'rgba(35,22,8,0.0)');
     ctx.fillStyle=ceilG;ctx.fillRect(W*0.22,0,W*0.56,H*0.08);

     /* ── Stalactites ── */
     for(const s of stalactites){
      const sg=ctx.createLinearGradient(s.x,0,s.x,s.len);
      sg.addColorStop(0,'rgba(55,35,14,0.95)');
      sg.addColorStop(0.6,'rgba(78,52,20,0.85)');
      sg.addColorStop(1,'rgba(95,64,24,0.0)');
      ctx.fillStyle=sg;
      ctx.beginPath();
      ctx.moveTo(s.x-s.w*0.5,0);
      ctx.lineTo(s.x+s.w*0.5,0);
      ctx.lineTo(s.x,s.len);
      ctx.closePath();ctx.fill();
      /* Reflet humide */
      ctx.fillStyle='rgba(180,140,70,0.10)';
      ctx.beginPath();
      ctx.moveTo(s.x-s.w*0.12,0);
      ctx.lineTo(s.x-s.w*0.05,0);
      ctx.lineTo(s.x-s.w*0.08,s.len*0.65);
      ctx.closePath();ctx.fill();
     }
    }

    function drawTorches(){
     for(const [tx2,ty2,side] of [[W*0.195,H*0.30,-1],[W*0.805,H*0.30,1]]){
      const fl=0.55+Math.sin(t*11.3+tx2*0.01)*0.28+Math.sin(t*17.7+tx2*0.02)*0.12;
      /* Grande aureole murale */
      const tgW=ctx.createRadialGradient(tx2,ty2,2,tx2,ty2,W*0.38);
      tgW.addColorStop(0,`rgba(255,160,40,${fl*0.70})`);
      tgW.addColorStop(0.20,`rgba(220,110,20,${fl*0.38})`);
      tgW.addColorStop(0.55,`rgba(160,70,8,${fl*0.14})`);
      tgW.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=tgW; ctx.fillRect(tx2-W*0.38,ty2-W*0.25,W*0.76,W*0.55);
      /* Halo serré très brillant */
      const tg=ctx.createRadialGradient(tx2,ty2,1,tx2,ty2,W*0.10);
      tg.addColorStop(0,`rgba(255,220,120,${fl*0.92})`);
      tg.addColorStop(0.45,`rgba(255,155,35,${fl*0.55})`);
      tg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=tg; ctx.fillRect(tx2-W*0.10,ty2-W*0.10,W*0.20,W*0.20);
      ctx.fillStyle='rgba(80,50,20,0.95)';
      ctx.fillRect(tx2-2,ty2,4,H*0.042);
      ctx.save(); ctx.translate(tx2,ty2);
      const fh=H*0.030*fl;
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.bezierCurveTo(-4,-fh*0.4,-3,-fh*0.9+side*2,0,-fh);
      ctx.bezierCurveTo(3,-fh*0.9-side*2,4,-fh*0.4,0,0);
      ctx.fillStyle=`rgba(255,${170+Math.sin(t*8)*20|0},40,${fl})`;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0,-2);
      ctx.bezierCurveTo(-2,-fh*0.35,2,-fh*0.35,0,-fh*0.6);
      ctx.fillStyle=`rgba(255,240,180,${fl*0.7})`;
      ctx.fill();
      ctx.restore();
     }
    }

    function frame(){
     if(stop.v)return;

     ctx.fillStyle='rgba(18,11,4,1)'; ctx.fillRect(0,0,W,H);

     /* Ciel nocturne dans l'ouverture — plus lumineux et bleuté */
     const skyG=ctx.createRadialGradient(cx,H*0.08,0,cx,H*0.08,H*0.38);
     skyG.addColorStop(0,'rgba(22,32,65,0.88)');
     skyG.addColorStop(0.35,'rgba(12,18,42,0.65)');
     skyG.addColorStop(0.70,'rgba(5,8,18,0.35)');
     skyG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=skyG; ctx.fillRect(W*0.22,0,W*0.56,H*0.38);

     for(const s of stars){
      s.tw+=s.tf;
      const op=s.op*(0.4+Math.sin(s.tw)*0.6);
      ctx.fillStyle=`rgba(255,250,220,${op})`;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
     }

     drawWalls();
     drawTorches();
     drawTreasureChest(cx, H*0.46);

     /* Lueur du coffre — plus forte et plus large */
     const tg=ctx.createRadialGradient(cx,H*0.50,8,cx,H*0.50,W*0.65);
     tg.addColorStop(0,`rgba(255,190,35,${0.42+Math.sin(t*1.6)*0.10})`);
     tg.addColorStop(0.18,`rgba(210,145,18,${0.28+Math.sin(t*1.4)*0.07})`);
     tg.addColorStop(0.42,'rgba(140,90,8,0.14)');
     tg.addColorStop(0.70,'rgba(60,35,2,0.06)');
     tg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tg; ctx.fillRect(0,H*0.15,W,H*0.65);
     /* Lumière ambiante douce sur tout le bas de la grotte */
     const ambG=ctx.createLinearGradient(0,H*0.55,0,H*0.90);
     ambG.addColorStop(0,'rgba(120,75,10,0.10)');
     ambG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ambG;ctx.fillRect(0,H*0.55,W,H*0.35);

     for(const c of coins){
      c.y+=c.vy; c.x+=c.vx; c.rot+=c.vrot;
      if(c.y<-c.r*4){c.y=H*0.82;c.x=cx+(Math.random()-0.5)*W*0.38;c.vy=-(Math.random()*1.6+0.5);}
      const scaleX=Math.abs(Math.cos(c.rot))*0.88+0.12;
      ctx.save(); ctx.translate(c.x,c.y); ctx.scale(scaleX,1);
      const cg=ctx.createRadialGradient(-c.r*0.2,-c.r*0.2,0.5,0,0,c.r);
      cg.addColorStop(0,'rgba(255,215,55,0.96)');
      cg.addColorStop(0.5,'rgba(205,152,18,0.82)');
      cg.addColorStop(1,'rgba(145,92,5,0.68)');
      ctx.fillStyle=cg;
      ctx.beginPath(); ctx.arc(0,0,c.r,0,Math.PI*2); ctx.fill();
      ctx.restore();
     }

     for(const d of drops){
      d.y+=d.vy;
      d.trail.unshift({x:d.x,y:d.y});
      if(d.trail.length>5) d.trail.pop();
      if(d.y>H*0.85){
       d.splashOp=0.7; d.splashR=0;
       d.y=Math.random()*H*0.35+H*0.04;
       d.x=W*(0.22+Math.random()*0.56);
       d.trail=[];
      }
      for(let i=0;i<d.trail.length;i++){
       ctx.fillStyle=`rgba(160,200,230,${0.18-i*0.035})`;
       ctx.beginPath(); ctx.arc(d.trail[i].x,d.trail[i].y,0.8,0,Math.PI*2); ctx.fill();
      }
      ctx.fillStyle='rgba(180,215,240,0.65)';
      ctx.beginPath(); ctx.ellipse(d.x,d.y,1.2,2.4,0,0,Math.PI*2); ctx.fill();
      if(d.splashOp>0){
       d.splashR+=1.5; d.splashOp-=0.06;
       ctx.strokeStyle=`rgba(160,200,225,${d.splashOp*0.5})`;
       ctx.lineWidth=0.7;
       ctx.beginPath(); ctx.ellipse(d.x,H*0.85,d.splashR,d.splashR*0.22,0,0,Math.PI*2); ctx.stroke();
      }
     }

     for(const p of dust){
      p.x+=p.vx+Math.sin(t*0.6+p.y*0.01)*0.08;
      p.y+=p.vy;
      if(p.y<-4) p.y=H*0.9;
      ctx.fillStyle=`rgba(220,180,60,${p.op})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
     }

     const vg=ctx.createRadialGradient(cx,H*0.46,H*0.06,cx,H*0.46,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(2,1,0,0.22)');
     vg.addColorStop(1,'rgba(0,0,0,0.97)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
