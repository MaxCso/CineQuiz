// CinéQuiz splash chunk — Moonlight
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Moonlight"]={
   name:'Moonlight',
   color:'40,80,180',
   ref:'Moonlight \u2014 Barry Jenkins, 2016',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ml_s');
    if(!_s){_s=document.createElement('style');_s.id='_ml_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:28%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── SVG silhouette + vagues ── */
    const silImg=new Image();let silReady=false;
    silImg.onload=()=>{silReady=true;};
    silImg.src='images/Moonlight.svg';;

    /* ── Vagues animées ── */
    const waveCount=6;
    const waves=Array.from({length:waveCount},(_,i)=>{
     const prog=i/waveCount;
     return{
      phase:Math.random()*Math.PI*2,
      spd:0.006+i*0.0015,
      amp:H*(0.012+i*0.005),
      y:H*(0.58+i*0.055),
      r:Math.round(18+i*14),
      g:Math.round(72+i*18),
      b:Math.round(118+i*14),
      op:0.55+i*0.06,
     };
    });

    /* ── Reflets lunaires sur l'eau ── */
    const reflects=Array.from({length:12},(_,i)=>{
     return{
      x:cx+(i%2===0?-1:1)*(W*0.015+i*W*0.018),
      y:H*(0.60+i*0.022),
      w:W*(0.008+i*0.003),
      h:H*(0.012+i*0.002),
      op:0.35-i*0.02,
      ph:Math.random()*Math.PI*2,
     };
    });

    /* ── Étoiles ── */
    const stars=Array.from({length:55},()=>{
     return{
      x:Math.random()*W,
      y:Math.random()*H*0.52,
      r:Math.random()*1.1+0.2,
      op:0.1+Math.random()*0.55,
      ph:Math.random()*Math.PI*2,
     };
    });

    function frame(){
     if(stop.v)return;

     /* ── FOND — gris-bleu ardoise comme l'affiche ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#1e2c3a');
     bg.addColorStop(0.35,'#243444');
     bg.addColorStop(0.65,'#2a3d52');
     bg.addColorStop(1,'#1a2d40');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── Étoiles ── */
     for(const s of stars){
      s.ph+=0.012;
      const a=s.op*(0.4+0.6*Math.abs(Math.sin(s.ph)));
      ctx.fillStyle=`rgba(210,225,245,${a})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── LUNE — grande, lumineuse, centrale ── */
     const moonX=cx, moonY=H*0.30;
     const moonR=W*0.155;

     /* Halo extérieur très doux */
     const halo=ctx.createRadialGradient(moonX,moonY,moonR*0.8,moonX,moonY,moonR*3.2);
     halo.addColorStop(0,`rgba(200,220,245,${0.20+Math.sin(t*0.3)*0.03})`);
     halo.addColorStop(0.3,'rgba(180,205,235,0.08)');
     halo.addColorStop(0.7,'rgba(150,180,220,0.03)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

     /* Halo intermédiaire */
     const halo2=ctx.createRadialGradient(moonX,moonY,moonR*0.9,moonX,moonY,moonR*1.55);
     halo2.addColorStop(0,'rgba(230,240,255,0.22)');
     halo2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo2;ctx.fillRect(0,0,W,H);

     /* Disque lunaire */
     const moonG=ctx.createRadialGradient(moonX-moonR*0.15,moonY-moonR*0.15,0,moonX,moonY,moonR);
     moonG.addColorStop(0,'rgba(240,248,255,1.0)');
     moonG.addColorStop(0.4,'rgba(225,238,255,0.99)');
     moonG.addColorStop(0.8,'rgba(205,222,248,0.97)');
     moonG.addColorStop(1,'rgba(185,205,240,0.90)');
     ctx.fillStyle=moonG;
     ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.fill();

     /* Texture douce sur la lune */
     const moonTex=ctx.createRadialGradient(moonX+moonR*0.25,moonY+moonR*0.20,0,moonX,moonY,moonR);
     moonTex.addColorStop(0,'rgba(160,185,220,0.10)');
     moonTex.addColorStop(0.5,'rgba(140,170,210,0.06)');
     moonTex.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonTex;
     ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.fill();

     /* ── OCEAN — zone de couleur bleue sous la lune ── */
     const oceanY=H*0.60;
     const oceanG=ctx.createLinearGradient(0,oceanY,0,H);
     oceanG.addColorStop(0,'rgba(22,68,112,0.95)');
     oceanG.addColorStop(0.3,'rgba(18,58,98,0.98)');
     oceanG.addColorStop(0.7,'rgba(12,44,78,1)');
     oceanG.addColorStop(1,'rgba(8,30,55,1)');
     ctx.fillStyle=oceanG;ctx.fillRect(0,oceanY,W,H-oceanY);

     /* ── Reflets de la lune sur l'eau ── */
     for(const r of reflects){
      r.ph+=0.025;
      const a=r.op*(0.5+0.5*Math.sin(r.ph));
      ctx.fillStyle=`rgba(200,225,255,${a})`;
      ctx.beginPath();ctx.ellipse(r.x,r.y,r.w*(0.8+Math.sin(r.ph*0.7)*0.2),r.h,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Vagues animées ── */
     for(let wi=0;wi<waves.length;wi++){
      const w=waves[wi];w.phase+=w.spd;
      ctx.beginPath();
      ctx.moveTo(0,w.y);
      for(let px=0;px<=W;px+=4){
       const py=w.y+Math.sin(px/W*Math.PI*2.5+w.phase)*w.amp
                +Math.sin(px/W*Math.PI*1.2+w.phase*0.7)*w.amp*0.4;
       ctx.lineTo(px,py);
      }
      ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();
      ctx.fillStyle=`rgba(${w.r},${w.g},${w.b},${w.op})`;ctx.fill();
     }

     /* ── SVG silhouette + bas ── */
     if(silReady){
      /* SVG viewBox 682×514 — on le place en bas centré */
      const svgW=W*1.05;
      const svgH=svgW*(514/682);
      const svgX=cx-svgW/2;
      const svgY=H-svgH*0.88;
      ctx.drawImage(silImg,svgX,svgY,svgW,svgH);
     }

     /* ── Vignette douce ── */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.08,cx,H*0.45,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.80,'rgba(0,0,0,0.35)');
     vg.addColorStop(1,'rgba(0,0,0,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
