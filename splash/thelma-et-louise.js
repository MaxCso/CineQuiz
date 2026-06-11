// CinéQuiz splash chunk — Thelma et Louise
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Thelma et Louise"]={
   name:'Thelma et Louise',
   color:'220,140,40',
   ref:'Thelma et Louise \u2014 Ridley Scott, 1991',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond ── */
    let _tlStyle=document.getElementById('_tl_splash_style');
    if(!_tlStyle){_tlStyle=document.createElement('style');_tlStyle.id='_tl_splash_style';document.head.appendChild(_tlStyle);}
    _tlStyle.textContent=`
      

            
    `;
    const _tlWatch=setInterval(()=>{if(stop.v){_tlStyle.textContent='';clearInterval(_tlWatch);}},200);

    /* ── Positionnement citation + logo sous le logo Cinéquiz ── */
    let _tlPos=document.getElementById('_tl_pos');
    if(!_tlPos){_tlPos=document.createElement('style');_tlPos.id='_tl_pos';document.head.appendChild(_tlPos);}
    _tlPos.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _tlPosW=setInterval(()=>{if(stop.v){_tlPos.textContent='';clearInterval(_tlPosW);}},200);

    /* ── SVG voiture ── */
    const CAR_SVG='images/sprite_29.svg';
    const carImg=new Image();let carReady=false;
    carImg.onload=()=>{carReady=true;};carImg.src=CAR_SVG;

    /* ── Dimensions clés ── */
    /* Soleil + voiture repositionnés plus bas */
    const SUN_R=W*0.28;
    const SUN_CX=cx+W*0.02;
    const SUN_CY=H*0.460; /* soleil bien haut dans le ciel */
    const CLIFF_Y=H*0.720; /* mesas plus basses — canyon en bas */
    const CAR_W=W*0.75, CAR_H=CAR_W*(80/275);
    const CAR_BASE_X=cx-CAR_W*0.50;
    const CAR_BASE_Y=H*0.420; /* voiture qui vole au-dessus du canyon */

    /* ── Nuages (style Grand Canyon — blancs cotonneux) ── */
    const clouds=Array.from({length:6},(_,i)=>({
     x: (i/6)*W*1.4 - W*0.1,
     y: H*(0.06+Math.random()*0.16),
     w: W*(0.18+Math.random()*0.22),
     h: H*(0.045+Math.random()*0.055),
     spd: 0.10+Math.random()*0.08,
     op: 0.82+Math.random()*0.15,
     puffs: Array.from({length:5},(_,j)=>({
      dx:(j-2)*0.22, dy:Math.random()*0.30-0.10, rs:0.45+Math.random()*0.45
     }))
    }));

    /* ── Traînée de poussière ── */
    const trail=Array.from({length:22},(_,i)=>({phase:Math.random()*Math.PI*2}));

    /* ── Étoiles filantes ── */
    const shootingStars=Array.from({length:4},()=>({
     x:0,y:0,len:0,spd:0,op:0,maxOp:0,active:false,cooldown:Math.random()*180
    }));

    let floatT=0;

    /* ── Dessin d'un nuage cotonneux ── */
    function drawCloud(cloud){
     ctx.save();
     ctx.globalAlpha=cloud.op;
     const cw=cloud.w, ch=cloud.h;
     for(const p of cloud.puffs){
      const px=cloud.x+p.dx*cw, py=cloud.y+p.dy*ch, pr=cw*(p.rs*0.38);
      const cg=ctx.createRadialGradient(px,py-pr*0.2,pr*0.1,px,py,pr);
      cg.addColorStop(0,'rgba(255,255,255,0.95)');
      cg.addColorStop(0.55,'rgba(240,245,248,0.75)');
      cg.addColorStop(1,'rgba(220,235,240,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.arc(px,py,pr,0,Math.PI*2);ctx.fill();
     }
     ctx.restore();
    }

    /* ── Dessin des mesas du Grand Canyon — larges, plates, stratifiées ── */
    function drawCliffs(){
     /* ── Mesa principale gauche — large plateau ── */
     const lTop=CLIFF_Y-H*0.19;
     const lG=ctx.createLinearGradient(0,lTop,0,H);
     lG.addColorStop(0,'rgba(165,88,42,0.97)');
     lG.addColorStop(0.12,'rgba(148,72,32,0.97)');
     lG.addColorStop(0.30,'rgba(120,58,24,0.98)');
     lG.addColorStop(0.60,'rgba(90,42,16,0.99)');
     lG.addColorStop(1,'rgba(58,28,10,1.0)');
     ctx.fillStyle=lG;
     ctx.beginPath();
     ctx.moveTo(-W*0.02, H);
     ctx.lineTo(-W*0.02, CLIFF_Y+H*0.02);
     /* Face gauche — érosion verticale légèrement irrégulière */
     ctx.lineTo(W*0.02,  CLIFF_Y-H*0.005);
     ctx.lineTo(W*0.04,  CLIFF_Y-H*0.018);
     ctx.lineTo(W*0.055, CLIFF_Y-H*0.010);
     ctx.lineTo(W*0.07,  CLIFF_Y-H*0.022);
     ctx.lineTo(W*0.10,  CLIFF_Y-H*0.038);
     ctx.lineTo(W*0.13,  CLIFF_Y-H*0.055);
     ctx.lineTo(W*0.16,  CLIFF_Y-H*0.068);
     ctx.lineTo(W*0.19,  CLIFF_Y-H*0.080);
     ctx.lineTo(W*0.215, CLIFF_Y-H*0.088);
     /* Plateau plat sur le dessus — légèrement ondulé */
     ctx.lineTo(W*0.240, CLIFF_Y-H*0.092);
     ctx.lineTo(W*0.270, CLIFF_Y-H*0.188); /* montée vers le plateau */
     ctx.lineTo(W*0.290, CLIFF_Y-H*0.192);
     ctx.lineTo(W*0.310, CLIFF_Y-H*0.190); /* plateau quasi-horizontal */
     ctx.lineTo(W*0.335, CLIFF_Y-H*0.193);
     ctx.lineTo(W*0.355, CLIFF_Y-H*0.188);
     ctx.lineTo(W*0.370, CLIFF_Y-H*0.175); /* bord droit de la mesa */
     ctx.lineTo(W*0.385, CLIFF_Y-H*0.100);
     ctx.lineTo(W*0.400, CLIFF_Y-H*0.060);
     ctx.lineTo(W*0.415, H*0.620);
     ctx.lineTo(W*0.415, H);
     ctx.closePath();ctx.fill();

     /* Strates horizontales gauche — lignes de sédiment */
     const strataL=[
      {y:CLIFF_Y-H*0.14, alpha:0.50, col:'rgba(190,110,55,0.7)'},
      {y:CLIFF_Y-H*0.10, alpha:0.40, col:'rgba(175,95,45,0.6)'},
      {y:CLIFF_Y-H*0.065,alpha:0.35, col:'rgba(140,72,32,0.55)'},
      {y:CLIFF_Y-H*0.032,alpha:0.28, col:'rgba(110,55,22,0.45)'},
     ];
     for(const s of strataL){
      ctx.save();ctx.globalAlpha=s.alpha;
      ctx.strokeStyle=s.col;ctx.lineWidth=H*0.005;
      ctx.beginPath();
      ctx.moveTo(-W*0.02, s.y);
      ctx.bezierCurveTo(W*0.10,s.y-H*0.004, W*0.25,s.y-H*0.006, W*0.38,s.y+H*0.002);
      ctx.stroke();
      ctx.restore();
     }

     /* ── Mesa principale droite ── */
     const rG=ctx.createLinearGradient(0,CLIFF_Y-H*0.17,0,H);
     rG.addColorStop(0,'rgba(158,82,38,0.96)');
     rG.addColorStop(0.15,'rgba(138,65,28,0.97)');
     rG.addColorStop(0.35,'rgba(108,50,20,0.98)');
     rG.addColorStop(0.65,'rgba(82,38,14,0.99)');
     rG.addColorStop(1,'rgba(52,25,8,1.0)');
     ctx.fillStyle=rG;
     ctx.beginPath();
     ctx.moveTo(W*1.02, H);
     ctx.lineTo(W*1.02, CLIFF_Y+H*0.02);
     ctx.lineTo(W*0.98,  CLIFF_Y+H*0.004);
     ctx.lineTo(W*0.95,  CLIFF_Y-H*0.008);
     ctx.lineTo(W*0.92,  CLIFF_Y-H*0.022);
     ctx.lineTo(W*0.88,  CLIFF_Y-H*0.042);
     ctx.lineTo(W*0.84,  CLIFF_Y-H*0.062);
     ctx.lineTo(W*0.81,  CLIFF_Y-H*0.075);
     /* Bord de la mesa droite */
     ctx.lineTo(W*0.785, CLIFF_Y-H*0.082);
     ctx.lineTo(W*0.760, CLIFF_Y-H*0.165); /* montée vers plateau */
     ctx.lineTo(W*0.740, CLIFF_Y-H*0.172);
     ctx.lineTo(W*0.720, CLIFF_Y-H*0.170); /* plateau horizontal */
     ctx.lineTo(W*0.700, CLIFF_Y-H*0.173);
     ctx.lineTo(W*0.680, CLIFF_Y-H*0.168);
     ctx.lineTo(W*0.660, CLIFF_Y-H*0.155);
     ctx.lineTo(W*0.640, CLIFF_Y-H*0.090);
     ctx.lineTo(W*0.620, CLIFF_Y-H*0.048);
     ctx.lineTo(W*0.600, H*0.625);
     ctx.lineTo(W*0.600, H);
     ctx.closePath();ctx.fill();

     /* Strates droite */
     const strataR=[
      {y:CLIFF_Y-H*0.12, alpha:0.45, col:'rgba(185,100,50,0.65)'},
      {y:CLIFF_Y-H*0.082,alpha:0.38, col:'rgba(165,88,40,0.55)'},
      {y:CLIFF_Y-H*0.048,alpha:0.30, col:'rgba(130,65,28,0.48)'},
      {y:CLIFF_Y-H*0.020,alpha:0.22, col:'rgba(100,50,18,0.40)'},
     ];
     for(const s of strataR){
      ctx.save();ctx.globalAlpha=s.alpha;
      ctx.strokeStyle=s.col;ctx.lineWidth=H*0.005;
      ctx.beginPath();
      ctx.moveTo(W*1.02, s.y);
      ctx.bezierCurveTo(W*0.90,s.y-H*0.003, W*0.72,s.y-H*0.005, W*0.60,s.y+H*0.002);
      ctx.stroke();
      ctx.restore();
     }

     /* ── Fond de canyon — sol rouge-brun entre les deux mesas ── */
     const floorG=ctx.createLinearGradient(0,CLIFF_Y,0,H);
     floorG.addColorStop(0,'rgba(100,52,22,0.92)');
     floorG.addColorStop(0.25,'rgba(75,38,15,0.96)');
     floorG.addColorStop(0.60,'rgba(52,26,10,0.99)');
     floorG.addColorStop(1,'rgba(35,17,6,1.0)');
     ctx.fillStyle=floorG;
     ctx.fillRect(W*0.415,CLIFF_Y,W*(0.600-0.415),H-CLIFF_Y);

     /* ── Petite butte au fond (entre les deux grandes mesas) ── */
     const bG=ctx.createLinearGradient(0,CLIFF_Y-H*0.10,0,CLIFF_Y+H*0.05);
     bG.addColorStop(0,'rgba(145,78,35,0.82)');
     bG.addColorStop(0.5,'rgba(115,58,22,0.90)');
     bG.addColorStop(1,'rgba(82,40,14,0.96)');
     ctx.fillStyle=bG;
     ctx.beginPath();
     ctx.moveTo(W*0.415, H);
     ctx.lineTo(W*0.415, CLIFF_Y-H*0.020);
     ctx.lineTo(W*0.430, CLIFF_Y-H*0.045);
     ctx.lineTo(W*0.445, CLIFF_Y-H*0.075); /* paroi gauche verticale */
     ctx.lineTo(W*0.460, CLIFF_Y-H*0.095);
     ctx.lineTo(W*0.475, CLIFF_Y-H*0.100); /* plateau de la butte */
     ctx.lineTo(W*0.500, CLIFF_Y-H*0.102);
     ctx.lineTo(W*0.525, CLIFF_Y-H*0.100);
     ctx.lineTo(W*0.545, CLIFF_Y-H*0.092); /* descente droite */
     ctx.lineTo(W*0.565, CLIFF_Y-H*0.065);
     ctx.lineTo(W*0.585, CLIFF_Y-H*0.030);
     ctx.lineTo(W*0.600, CLIFF_Y-H*0.005);
     ctx.lineTo(W*0.600, H);
     ctx.closePath();ctx.fill();
     /* Strate sur la butte */
     ctx.save();ctx.globalAlpha=0.30;
     ctx.strokeStyle='rgba(180,100,48,0.55)';ctx.lineWidth=H*0.004;
     ctx.beginPath();
     ctx.moveTo(W*0.445, CLIFF_Y-H*0.062);
     ctx.bezierCurveTo(W*0.475,CLIFF_Y-H*0.066, W*0.525,CLIFF_Y-H*0.066, W*0.558,CLIFF_Y-H*0.050);
     ctx.stroke();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Ciel bleu vif (Grand Canyon) ── */
     const sky=ctx.createLinearGradient(0,0,0,H*0.72);
     sky.addColorStop(0.00,'#4a90aa');
     sky.addColorStop(0.35,'#5aa0b8');
     sky.addColorStop(0.70,'#6ab8c8');
     sky.addColorStop(1.00,'#7accd8');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.72);

     /* ── Fond sol (après les falaises) ── */
     const ground=ctx.createLinearGradient(0,CLIFF_Y,0,H);
     ground.addColorStop(0,'#4a2810');
     ground.addColorStop(0.3,'#3a2010');
     ground.addColorStop(1,'#28180a');
     ctx.fillStyle=ground;ctx.fillRect(0,CLIFF_Y,W,H-CLIFF_Y);

     /* ── Étoiles filantes (discrètes) ── */
     for(const s of shootingStars){
      if(!s.active){
       s.cooldown--;
       if(s.cooldown<=0){s.active=true;s.x=Math.random()*W*0.6;s.y=Math.random()*H*0.22;s.len=W*(0.06+Math.random()*0.08);s.spd=W*0.007;s.op=0;s.maxOp=0.5+Math.random()*0.3;}
      } else {
       s.x+=s.spd;s.y+=s.spd*0.35;s.op=Math.min(s.maxOp,s.op+0.05);
       if(s.x>W||s.y>H*0.3){s.active=false;s.cooldown=100+Math.random()*180;s.op=0;}
       const grd=ctx.createLinearGradient(s.x-s.len,s.y-s.len*0.35,s.x,s.y);
       grd.addColorStop(0,'rgba(255,248,235,0)');grd.addColorStop(1,`rgba(255,248,235,${s.op})`);
       ctx.save();ctx.strokeStyle=grd;ctx.lineWidth=1.1;
       ctx.beginPath();ctx.moveTo(s.x-s.len,s.y-s.len*0.35);ctx.lineTo(s.x,s.y);ctx.stroke();
       ctx.restore();
      }
     }

     /* ── Nuages cotonneux ── */
     for(const c of clouds){
      c.x+=c.spd*0.18;
      if(c.x>W+c.w)c.x=-c.w;
      drawCloud(c);
     }

     /* ── Halo pulsant du soleil ── */
     const pulse=0.93+0.07*Math.sin(t*0.85);
     const outerH=ctx.createRadialGradient(SUN_CX,SUN_CY,SUN_R*0.65,SUN_CX,SUN_CY,SUN_R*1.6*pulse);
     outerH.addColorStop(0,'rgba(255,160,40,0.28)');
     outerH.addColorStop(0.4,'rgba(230,110,20,0.12)');
     outerH.addColorStop(1,'rgba(200,70,10,0)');
     ctx.fillStyle=outerH;ctx.beginPath();ctx.arc(SUN_CX,SUN_CY,SUN_R*1.6*pulse,0,Math.PI*2);ctx.fill();

     /* ── Soleil coucher — blanc-jaune au cœur, orange vif, rouge-orangé aux bords ── */
     const sunG=ctx.createRadialGradient(SUN_CX,SUN_CY,0,SUN_CX,SUN_CY,SUN_R);
     sunG.addColorStop(0,'rgba(255,252,220,1.00)');
     sunG.addColorStop(0.18,'rgba(255,235,130,0.99)');
     sunG.addColorStop(0.42,'rgba(255,175,40,0.97)');
     sunG.addColorStop(0.70,'rgba(255,110,15,0.90)');
     sunG.addColorStop(0.88,'rgba(235,75,10,0.72)');
     sunG.addColorStop(1,'rgba(210,55,0,0)');
     ctx.fillStyle=sunG;ctx.beginPath();ctx.arc(SUN_CX,SUN_CY,SUN_R,0,Math.PI*2);ctx.fill();

     /* ── Falaises du Grand Canyon ── */
     drawCliffs();

     /* ── Traînée de poussière derrière la voiture ── */
     floatT+=0.022;
     const floatY=Math.sin(floatT)*H*0.007;
     const trailBaseX=CAR_BASE_X+W*0.035;
     const trailBaseY=CAR_BASE_Y+CAR_H*0.90+floatY;
     for(let i=0;i<trail.length;i++){
      const age=i/trail.length;
      const tx=trailBaseX-i*W*0.020;
      const ty=trailBaseY-age*H*0.015;
      const tr=W*(0.010+age*0.022);
      trail[i].phase+=0.04;
      const top=(0.16-age*0.14)*Math.abs(Math.sin(t*1.1+i*0.45));
      if(top<=0.005)continue;
      const dustG=ctx.createRadialGradient(tx,ty,0,tx,ty,tr);
      dustG.addColorStop(0,`rgba(200,170,130,${top})`);
      dustG.addColorStop(1,'rgba(180,150,110,0)');
      ctx.fillStyle=dustG;ctx.beginPath();ctx.arc(tx,ty,tr,0,Math.PI*2);ctx.fill();
     }

     /* ── Voiture SVG ── */
     if(carReady){
      /* Ombre portée */
      ctx.save();ctx.globalAlpha=0.22;
      const shG=ctx.createRadialGradient(cx,CAR_BASE_Y+CAR_H+floatY+H*0.006,0,cx,CAR_BASE_Y+CAR_H+floatY+H*0.006,CAR_W*0.44);
      shG.addColorStop(0,'rgba(40,20,8,0.75)');shG.addColorStop(1,'rgba(40,20,8,0)');
      ctx.fillStyle=shG;ctx.beginPath();ctx.ellipse(cx,CAR_BASE_Y+CAR_H+floatY+H*0.004,CAR_W*0.44,H*0.016,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
      ctx.save();ctx.globalAlpha=0.97;
      ctx.drawImage(carImg,CAR_BASE_X,CAR_BASE_Y+floatY,CAR_W,CAR_H);
      ctx.restore();
     }

     /* ── Vignette haut/bas uniquement — pas sur les côtés ── */
     const vigTop=ctx.createLinearGradient(0,0,0,H*0.15);
     vigTop.addColorStop(0,'rgba(20,50,65,0.50)');
     vigTop.addColorStop(1,'rgba(20,50,65,0)');
     ctx.fillStyle=vigTop;ctx.fillRect(0,0,W,H*0.15);

     const vigBot=ctx.createLinearGradient(0,H*0.88,0,H);
     vigBot.addColorStop(0,'rgba(10,30,20,0)');
     vigBot.addColorStop(1,'rgba(10,30,20,0.44)');
     ctx.fillStyle=vigBot;ctx.fillRect(0,H*0.88,W,H*0.12);

     /* ── Grain pellicule ── */
     for(let i=0;i<24;i++){
      const g=18+Math.random()*26|0;
      ctx.fillStyle=`rgba(${g+10},${g+12},${g+8},${Math.random()*0.015})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.6+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
