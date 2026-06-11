// CinéQuiz splash chunk — Apocalypse Now
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Apocalypse Now"]={
   name:'Apocalypse Now',
   color:'255,120,20',
   ref:'Apocalypse Now \u2014 Coppola, 1979',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.72';
    let t=0;

    /* ── Position citation sous le logo CinéQuiz ── */
    let _anS=document.getElementById('_an_s');
    if(!_anS){_anS=document.createElement('style');_anS.id='_an_s';document.head.appendChild(_anS);}
    _anS.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _anW=setInterval(()=>{if(stop.v){_anS.textContent='';clearInterval(_anW);}},200);

    /* ── Jungle pré-dessinée une seule fois sur offscreen canvas ── */
    const jc=document.createElement('canvas');
    jc.width=W;jc.height=H;
    const jx=jc.getContext('2d');
    const horizY=H*0.62;

    function palmLeaf(jx,px,py,angle,len,dark){
     jx.save();jx.translate(px,py);jx.rotate(angle);
     jx.beginPath();jx.moveTo(0,0);
     jx.bezierCurveTo(len*0.3,-len*0.12, len*0.7,-len*0.18, len,-len*0.08);
     jx.bezierCurveTo(len*0.7,-len*0.28, len*0.3,-len*0.22, 0,0);
     jx.fillStyle=dark?'rgba(2,6,1,0.95)':'rgba(5,15,3,0.88)';
     jx.fill();jx.restore();
    }

    function drawPalm(jx,px,py,trunkH,dark){
     /* tronc légèrement courbé */
     jx.save();
     jx.strokeStyle=dark?'rgba(3,8,2,0.95)':'rgba(6,18,4,0.9)';
     jx.lineWidth=dark?5:4;
     jx.beginPath();jx.moveTo(px,py);
     jx.quadraticCurveTo(px+trunkH*0.1,py-trunkH*0.5,px+trunkH*0.05,py-trunkH);
     jx.stroke();jx.restore();
     const topX=px+trunkH*0.05, topY=py-trunkH;
     /* 6 feuilles rayonnantes */
     const angles=[-1.2,-0.7,-0.2,0.2,0.7,1.3];
     const lens=[trunkH*0.55,trunkH*0.65,trunkH*0.6,trunkH*0.58,trunkH*0.62,trunkH*0.5];
     angles.forEach((a,i)=>palmLeaf(jx,topX,topY,a-Math.PI/2,lens[i],dark));
    }

    /* Couche 1 : végétation arrière (collines boisées) */
    jx.fillStyle='rgba(6,16,4,0.85)';
    jx.beginPath();jx.moveTo(0,H);
    const pts1=[];
    for(let i=0;i<=20;i++){
     const x=i/20*W;
     const y=horizY+Math.sin(i*0.7)*H*0.035+Math.sin(i*1.3+1)*H*0.022+Math.sin(i*0.3+2)*H*0.018;
     pts1.push({x,y});jx.lineTo(x,y);
    }
    jx.lineTo(W,H);jx.closePath();jx.fill();

    /* Palmiers couche arrière */
    [0.1,0.22,0.38,0.55,0.68,0.82,0.93].forEach((frac,i)=>{
     const px=W*frac;
     const baseY=pts1[Math.round(frac*20)]?.y||horizY+H*0.02;
     drawPalm(jx,px,baseY,H*(0.10+[0,0.02,-0.01,0.03,-0.02,0.01,0][i]),false);
    });

    /* Couche 2 : végétation milieu */
    jx.fillStyle='rgba(4,11,3,0.90)';
    jx.beginPath();jx.moveTo(0,H);
    const pts2=[];
    for(let i=0;i<=20;i++){
     const x=i/20*W;
     const y=H*0.74+Math.sin(i*0.9+0.5)*H*0.028+Math.sin(i*1.6+1.5)*H*0.018;
     pts2.push({x,y});jx.lineTo(x,y);
    }
    jx.lineTo(W,H);jx.closePath();jx.fill();

    /* Couche 3 : premier plan très sombre */
    jx.fillStyle='rgba(2,6,1,0.97)';
    jx.beginPath();jx.moveTo(0,H);
    const pts3=[];
    for(let i=0;i<=24;i++){
     const x=i/24*W;
     const y=H*0.84+Math.sin(i*1.1+2)*H*0.022+Math.sin(i*0.5+3)*H*0.016;
     pts3.push({x,y});jx.lineTo(x,y);
    }
    jx.lineTo(W,H);jx.closePath();jx.fill();

    /* Grands palmiers premier plan */
    [0.05,0.18,0.42,0.61,0.79,0.95].forEach((frac,i)=>{
     const px=W*frac;
     const baseY=pts3[Math.round(frac*24)]?.y||H*0.84;
     drawPalm(jx,px,baseY,H*(0.18+[0,0.04,-0.02,0.03,-0.03,0.02][i]),true);
    });

    /* ── Hélicoptères (3 en formation) ── */
    const helis=[
     {xOff:0,      yOff:0,       scale:1,   spd:1.0},
     {xOff:-W*0.28,yOff:H*0.04,  scale:0.72,spd:1.0},
     {xOff: W*0.24,yOff:H*0.055, scale:0.60,spd:1.0},
    ];
    let heliX=-W*0.25;

    function drawHeli(x,y,sc,rot){
     ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);
     ctx.fillStyle='rgba(0,0,0,0.90)';
     ctx.beginPath();ctx.ellipse(0,0,22,7,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(32,-3);ctx.lineTo(32,3);ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(20,35,45,0.75)';
     ctx.beginPath();ctx.ellipse(-4,-4,9,6,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(0,0,0,0.90)';
     ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(-42,-8);ctx.lineTo(-40,-10);ctx.lineTo(-20,-2);ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(0,0,0,0.80)';ctx.lineWidth=2;
     ctx.beginPath();
     ctx.moveTo(Math.cos(rot)*34,Math.sin(rot)*3-9);
     ctx.lineTo(Math.cos(rot+Math.PI)*34,Math.sin(rot+Math.PI)*3-9);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(Math.cos(rot+Math.PI/2)*34,Math.sin(rot+Math.PI/2)*3-9);
     ctx.lineTo(Math.cos(rot+Math.PI*1.5)*34,Math.sin(rot+Math.PI*1.5)*3-9);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(-40+Math.cos(rot*1.4)*6,-9+Math.sin(rot*1.4)*6);
     ctx.lineTo(-40+Math.cos(rot*1.4+Math.PI)*6,-9+Math.sin(rot*1.4+Math.PI)*6);
     ctx.stroke();
     ctx.restore();
    }

    /* ── Fumée de napalm (colonnes) ── */
    const smokeColumns=[
     {x:W*0.18,particles:Array.from({length:20},()=>({ox:0,oy:0,vx:(Math.random()-0.5)*0.5,vy:-(Math.random()*1+0.4),r:Math.random()*18+8,life:Math.random(),decay:Math.random()*0.006+0.003}))},
     {x:W*0.52,particles:Array.from({length:20},()=>({ox:0,oy:0,vx:(Math.random()-0.5)*0.4,vy:-(Math.random()*1.2+0.3),r:Math.random()*22+10,life:Math.random(),decay:Math.random()*0.005+0.003}))},
     {x:W*0.78,particles:Array.from({length:15},()=>({ox:0,oy:0,vx:(Math.random()-0.5)*0.6,vy:-(Math.random()*0.9+0.4),r:Math.random()*16+7,life:Math.random(),decay:Math.random()*0.007+0.003}))},
    ];

    /* ── Braises ── */
    const embers=Array.from({length:110},()=>({
     x:Math.random()*W,y:H*0.6+Math.random()*H*0.4,
     vx:(Math.random()-0.5)*0.9,vy:-(Math.random()*1.6+0.5),
     size:Math.random()*2.4+0.5,life:Math.random(),hue:8+Math.random()*28
    }));

    /* ── Explosions de napalm ── */
    const blasts=Array.from({length:18},()=>({
     x:Math.random()*W,y:H*0.72+Math.random()*H*0.28,
     vx:(Math.random()-0.5)*1.2,vy:-(Math.random()*3+1.5),
     life:Math.random(),decay:Math.random()*0.014+0.006,
     size:Math.random()*22+8,hue:8+Math.random()*22
    }));

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(4,1,0,0.16)';ctx.fillRect(0,0,W,H);

     /* ciel couchant */
     const sky=ctx.createLinearGradient(0,0,0,horizY);
     sky.addColorStop(0,`rgba(12,5,2,0.68)`);
     sky.addColorStop(0.35,`rgba(${78+Math.sin(t*0.15)*10|0},22,2,0.58)`);
     sky.addColorStop(0.7,`rgba(${195+Math.sin(t*0.2)*12|0},${65+Math.sin(t*0.18)*8|0},4,0.52)`);
     sky.addColorStop(1,`rgba(${218+Math.sin(t*0.25)*10|0},${85+Math.sin(t*0.18)*10|0},8,0.48)`);
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,horizY);

     /* soleil */
     const sunX=W*0.62,sunY=horizY*0.72,sunR=W*0.11;
     const sunG=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunR*2.8);
     sunG.addColorStop(0,`rgba(255,${195+Math.sin(t*0.35)*15|0},70,0.78)`);
     sunG.addColorStop(0.22,`rgba(240,${95+Math.sin(t*0.3)*10|0},8,0.52)`);
     sunG.addColorStop(0.6,'rgba(180,45,0,0.18)');sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(sunX-sunR*3,sunY-sunR*3,sunR*6,sunR*6);
     ctx.beginPath();ctx.arc(sunX,sunY,sunR,0,Math.PI*2);
     const disc=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunR);
     disc.addColorStop(0,'rgba(255,242,185,0.92)');disc.addColorStop(0.55,'rgba(255,155,25,0.78)');disc.addColorStop(1,'rgba(218,75,0,0.55)');
     ctx.fillStyle=disc;ctx.fill();

     /* lueur horizon */
     const glow=ctx.createLinearGradient(0,horizY-50,0,horizY+90);
     glow.addColorStop(0,'rgba(0,0,0,0)');
     glow.addColorStop(0.45,`rgba(${195+Math.sin(t*0.45)*18|0},52,0,0.38)`);
     glow.addColorStop(1,`rgba(${235+Math.sin(t*0.28)*10|0},68,0,0.58)`);
     ctx.fillStyle=glow;ctx.fillRect(0,horizY-50,W,140);

     /* fumée colonnes */
     for(const col of smokeColumns){
      const baseY=H*0.68;
      for(const p of col.particles){
       p.ox+=p.vx+Math.sin(t*0.5+p.r)*0.12;p.oy+=p.vy;p.life-=p.decay;p.r+=0.04;
       if(p.life<=0){p.ox=0;p.oy=0;p.vx=(Math.random()-0.5)*0.5;p.vy=-(Math.random()*1+0.4);p.life=0.6+Math.random()*0.4;p.r=Math.random()*18+8;}
       const opa=p.life*0.13;
       const sg=ctx.createRadialGradient(col.x+p.ox,baseY+p.oy,0,col.x+p.ox,baseY+p.oy,p.r*(1-p.life*0.2));
       sg.addColorStop(0,`rgba(35,18,8,${opa})`);sg.addColorStop(1,'rgba(10,5,2,0)');
       ctx.fillStyle=sg;ctx.beginPath();ctx.arc(col.x+p.ox,baseY+p.oy,p.r*(1-p.life*0.2),0,Math.PI*2);ctx.fill();
      }
     }

     /* jungle statique (offscreen) */
     ctx.drawImage(jc,0,0);

     /* hélicoptères */
     heliX+=1.1;if(heliX>W*1.3)heliX=-W*0.3;
     const rot=t*9;
     for(const h of helis) drawHeli(heliX+h.xOff,H*0.25+h.yOff,h.scale,rot);

     /* explosions */
     for(const f of blasts){
      f.x+=f.vx;f.y+=f.vy;f.life-=f.decay;
      if(f.life<=0){f.x=Math.random()*W;f.y=H*0.72+Math.random()*H*0.28;f.vy=-(Math.random()*3+1.5);f.life=0.7+Math.random()*0.3;f.vx=(Math.random()-0.5)*1.2;}
      const fg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.size*(1-f.life*0.15));
      fg.addColorStop(0,`hsla(${f.hue},100%,72%,${f.life*0.8})`);fg.addColorStop(0.4,`hsla(${f.hue-5},95%,48%,${f.life*0.5})`);fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.beginPath();ctx.arc(f.x,f.y,f.size*(1-f.life*0.15),0,Math.PI*2);ctx.fill();
     }

     /* braises */
     for(const e of embers){
      e.x+=e.vx+Math.sin(t*1.2+e.life*8)*0.35;e.y+=e.vy;e.life-=0.0045;
      if(e.life<=0||e.y<-10){e.x=Math.random()*W;e.y=H*0.62+Math.random()*H*0.38;e.vy=-(Math.random()*1.6+0.5);e.life=0.8+Math.random()*0.2;}
      ctx.beginPath();ctx.arc(e.x,e.y,e.size,0,Math.PI*2);
      ctx.fillStyle=`hsla(${e.hue},92%,65%,${e.life*0.8})`;ctx.fill();
     }

     /* vignette */
     const vg=ctx.createRadialGradient(W/2,H*0.4,H*0.08,W/2,H*0.4,H*0.9);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.55,'rgba(4,1,0,0.22)');vg.addColorStop(1,'rgba(4,1,0,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
