// CinéQuiz splash chunk — The Dark Knight
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["The Dark Knight"]={
   name:'The Dark Knight',
   color:'40,100,200',
   ref:'The Dark Knight \u2014 Christopher Nolan, 2008',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;

    /* ── CSS positionnement ── */
    let _s=document.getElementById('_tdk_s');
    if(!_s){_s=document.createElement('style');_s.id='_tdk_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Image de fond TDK.png ── */
    const bgImg=new Image();let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/TDK.png';

    /* ── Chauves-souris ── */
    function makeBat(fromBatman){
     const startX=W*0.30+Math.random()*W*0.08;
     const startY=H*0.72+Math.random()*H*0.05;
     const angle=-(Math.PI*0.25+Math.random()*Math.PI*0.50);
     const spd=W*(0.0018+Math.random()*0.0022);
     return{
      x:startX, y:startY,
      vx:Math.cos(angle)*spd, vy:Math.sin(angle)*spd,
      scale:0.4+Math.random()*0.5,
      wingPh:Math.random()*Math.PI*2,
      wingSpd:0.18+Math.random()*0.14,
      op:0, fadeIn:true,
      drift:(Math.random()-0.5)*0.0008,
      active:true,
     };
    }
    const bats=[];
    let batSpawn=0;
    const BAT_INTERVAL=55; // frames entre chaque nouvelle chauve-souris

    /* ── Étoiles scintillantes (zone ciel ~haut 65%) ── */
    const stars=Array.from({length:60},()=>({
     x:Math.random()*W, y:Math.random()*H*0.62,
     r:Math.random()*1.0+0.2,
     op:Math.random()*0.40+0.10,
     ph:Math.random()*Math.PI*2,
     freq:0.010+Math.random()*0.025,
    }));

    /* ── Lueurs de fenêtres sur les buildings (bande basse) ── */
    const winLights=Array.from({length:40},()=>({
     x:Math.random()*W,
     y:H*(0.62+Math.random()*0.22),
     r:Math.random()*1.6+0.4,
     op:Math.random()*0.30+0.05,
     ph:Math.random()*Math.PI*2,
     freq:0.008+Math.random()*0.030,
     warm:Math.random()>0.5,
    }));

    /* ── Nuages dérivant lentement ── */
    const clouds=Array.from({length:5},(_,i)=>({
     x:Math.random()*W*1.5-W*0.25,
     y:H*(0.05+i*0.08+Math.random()*0.05),
     w:W*(0.55+Math.random()*0.55),
     op:0.04+Math.random()*0.06,
     spd:0.04+Math.random()*0.06,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Halo horizon bleu-cyan ── */
    const horizonY=H*0.74;

    /* Dessiner une chauve-souris stylisée */
    function drawBat(bx,by,sc,wingPh){
     const w=W*0.028*sc;
     const wf=Math.sin(wingPh); // -1..1 battement d'ailes
     ctx.save();
     ctx.translate(bx,by);
     ctx.fillStyle='rgba(5,8,18,0.92)';
     ctx.beginPath();
     /* Corps central */
     ctx.ellipse(0,0,w*0.18,w*0.22,0,0,Math.PI*2);
     ctx.fill();
     /* Aile gauche */
     ctx.beginPath();
     ctx.moveTo(0,-w*0.05);
     ctx.bezierCurveTo(-w*0.35,w*(-0.28+wf*0.22),-w*0.70,w*(0.05+wf*0.18),-w*0.85,w*(0.18+wf*0.12));
     ctx.bezierCurveTo(-w*0.55,w*(0.20+wf*0.08),-w*0.28,w*0.22,0,w*0.08);
     ctx.fill();
     /* Aile droite (miroir) */
     ctx.beginPath();
     ctx.moveTo(0,-w*0.05);
     ctx.bezierCurveTo(w*0.35,w*(-0.28+wf*0.22),w*0.70,w*(0.05+wf*0.18),w*0.85,w*(0.18+wf*0.12));
     ctx.bezierCurveTo(w*0.55,w*(0.20+wf*0.08),w*0.28,w*0.22,0,w*0.08);
     ctx.fill();
     /* Oreilles */
     ctx.beginPath();ctx.moveTo(-w*0.08,-w*0.18);ctx.lineTo(-w*0.04,-w*0.32);ctx.lineTo(0,-w*0.18);ctx.fill();
     ctx.beginPath();ctx.moveTo(w*0.08,-w*0.18);ctx.lineTo(w*0.04,-w*0.32);ctx.lineTo(0,-w*0.18);ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Image de fond plein-canvas (cover) ── */
     if(bgReady){
      ctx.save();ctx.globalAlpha=1.0;
      const ir=bgImg.naturalWidth/bgImg.naturalHeight;
      const cr=W/H;
      let dw,dh,dx,dy;
      if(ir>cr){dh=H;dw=dh*ir;dx=(W-dw)/2;dy=0;}
      else{dw=W;dh=dw/ir;dx=0;dy=(H-dh)/2;}
      ctx.drawImage(bgImg,dx,dy,dw,dh);
      ctx.restore();
     } else {
      ctx.fillStyle='#060d1a';ctx.fillRect(0,0,W,H);
     }

     /* ── Overlay bleu très léger ── */
     ctx.fillStyle='rgba(4,10,28,0.12)';ctx.fillRect(0,0,W,H);

     /* ── Nuages dérivants ── */
     for(const c of clouds){
      c.x+=c.spd;c.ph+=0.003;
      if(c.x>W+c.w*0.5)c.x=-c.w*0.5;
      const cg=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.w*0.42);
      const cop=c.op*(0.7+0.3*Math.sin(c.ph));
      cg.addColorStop(0,`rgba(120,160,210,${cop})`);
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.ellipse(c.x,c.y,c.w*0.42,c.w*0.13,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Halo horizon bleu-cyan respirant ── */
     const hpulse=0.16+Math.sin(t*0.22)*0.04;
     const hg=ctx.createRadialGradient(cx,horizonY,0,cx,horizonY,W*0.85);
     hg.addColorStop(0,`rgba(30,90,180,${hpulse})`);
     hg.addColorStop(0.4,`rgba(15,50,120,${hpulse*0.40})`);
     hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.fillRect(0,horizonY-H*0.25,W,H*0.40);

     /* ── Étoiles ── */
     for(const s of stars){
      s.ph+=s.freq;
      const sop=s.op*(0.5+0.5*Math.sin(s.ph));
      if(sop<0.02)continue;
      ctx.fillStyle=`rgba(200,220,255,${sop})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Lueurs fenêtres buildings ── */
     for(const wl of winLights){
      wl.ph+=wl.freq;
      const wop=wl.op*(0.4+0.6*Math.sin(wl.ph));
      if(wop<0.01)continue;
      ctx.fillStyle=wl.warm?`rgba(220,180,80,${wop})`:`rgba(80,140,255,${wop})`;
      ctx.beginPath();ctx.arc(wl.x,wl.y,wl.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Spawn + update chauves-souris ── */
     batSpawn++;
     if(batSpawn>=BAT_INTERVAL && bats.length<10){
      bats.push(makeBat());batSpawn=0;
     }
     for(let i=bats.length-1;i>=0;i--){
      const b=bats[i];
      b.x+=b.vx;b.y+=b.vy;
      b.vx+=b.drift;
      b.wingPh+=b.wingSpd;
      /* fade in */
      if(b.fadeIn){b.op=Math.min(b.op+0.04,0.88);if(b.op>=0.88)b.fadeIn=false;}
      /* fade out en approchant des bords */
      const margin=W*0.12;
      if(b.x<margin)b.op=Math.max(0,b.op-0.035);
      if(b.x>W-margin)b.op=Math.max(0,b.op-0.035);
      if(b.y<H*0.02)b.op=Math.max(0,b.op-0.035);
      if(b.op<=0||b.y<-W*0.05||b.x<-W*0.1||b.x>W*1.1){bats.splice(i,1);continue;}
      ctx.globalAlpha=b.op;
      drawBat(b.x,b.y,b.scale,b.wingPh);
      ctx.globalAlpha=1;
     }

     /* ── Vignette cinématographique ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.48,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.75,'rgba(0,0,0,0.45)');
     vg.addColorStop(1,'rgba(0,0,0,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
