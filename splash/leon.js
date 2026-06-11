// CinéQuiz splash chunk — Léon
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Léon"]={
   name:'L\u00e9on',
   color:'40,120,60',
   ref:'L\u00e9on \u2014 Luc Besson, 1994',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let _lnStyle=document.getElementById('_ln_splash_style');
    if(!_lnStyle){_lnStyle=document.createElement('style');_lnStyle.id='_ln_splash_style';document.head.appendChild(_lnStyle);}
    _lnStyle.textContent=`

      
      #splash-bg{background:none!important;}
      #splash-content-wrap{top:26%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _lnWatch=setInterval(()=>{if(stop.v){_lnStyle.textContent='';clearInterval(_lnWatch);}},200);

    let t=0;
    const cx=W/2;

    /* ── Positionnement citation + logo juste sous Cinéquiz ── */
    let _lnPos=document.getElementById('_ln_pos');
    if(!_lnPos){_lnPos=document.createElement('style');_lnPos.id='_ln_pos';document.head.appendChild(_lnPos);}
    _lnPos.textContent='#splash-content-wrap{top:calc(19% + 2px)!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _lnPosW=setInterval(()=>{if(stop.v){_lnPos.textContent='';clearInterval(_lnPosW);}},200);

    /* ── Particules ── */
    const particles=Array.from({length:28},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.15+Math.random()*0.25),
     r:Math.random()*1.6+0.4,
     op:Math.random()*0.18+0.05,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Gouttes de pluie — ambiance NYC nocturne ── */
    const rainDrops=Array.from({length:80},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     len:Math.random()*22+10,
     speed:Math.random()*4+3,
     op:Math.random()*0.28+0.14,
     w:Math.random()*0.7+0.3,
     ang:(Math.PI/2)+(Math.random()-0.5)*0.12,
    }));

    /* ── Lens flare spots ── */
    const lensFlares=[
     {ox:-0.28,oy:-0.22,r:0.055,col:[255,230,160]},
     {ox:0.18,oy:0.10,r:0.025,col:[255,200,100]},
     {ox:-0.05,oy:0.32,r:0.018,col:[200,160,80]},
    ];

    /* ── Charger le SVG complet en base64 ── */
    let svgImg=null;
    const img=new Image();
    img.onload=()=>{svgImg=img;};
    img.src='images/sprite_19.svg';

    /* ── Grain de texture ── */
    const grainCanvas=document.createElement('canvas');
    grainCanvas.width=W;grainCanvas.height=H;
    const gc=grainCanvas.getContext('2d');
    for(let i=0;i<W*H*0.12;i++){
     const gx2=Math.random()*W|0,gy2=Math.random()*H|0;
     const gv=Math.random()*40-20;
     gc.fillStyle=`rgba(${gv>0?255:0},${gv>0?200:0},${gv>0?100:0},${Math.random()*0.04})`;
     gc.fillRect(gx2,gy2,1,1);
    }

    function frame(){
     if(stop.v)return;

     /* ── FOND brun-rouille de l'affiche ── */
     const breathe=Math.sin(t*0.18)*4;
     const r=122+breathe|0,g=58+breathe*0.3|0,b=24;
     ctx.fillStyle=`rgb(${r},${g},${b})`;
     ctx.fillRect(0,0,W,H);

     /* ── Scintillement projecteur (flicker rapide très discret) ── */
     const flicker=1+Math.sin(t*23.7)*0.008+Math.sin(t*37.1)*0.005+Math.sin(t*11.3)*0.006;
     const spotInt=0.22*flicker+Math.sin(t*0.31)*0.04;

     /* Halo central légèrement plus chaud */
     const halo=ctx.createRadialGradient(cx,H*0.62,0,cx,H*0.62,W*0.75);
     halo.addColorStop(0,`rgba(160,80,30,${spotInt})`);
     halo.addColorStop(0.5,'rgba(100,40,10,0.06)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

     /* ── Halo projecteur secondaire en haut à gauche ── */
     const projX=cx+Math.sin(t*0.09)*W*0.08;
     const projY=H*0.18+Math.cos(t*0.07)*H*0.03;
     const proj2=ctx.createRadialGradient(projX,projY,0,projX,projY,W*0.55);
     proj2.addColorStop(0,`rgba(255,220,150,${0.06+Math.sin(t*0.19)*0.02})`);
     proj2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=proj2;ctx.fillRect(0,0,W,H);

     /* ── SVG centré — silhouettes Léon + Mathilda + plante avec léger balancement ── */
     if(svgImg){
      const sway=Math.sin(t*0.11)*2.5;        /* balancement très doux */
      const breathSVG=1+Math.sin(t*0.19)*0.004; /* micro-respiration */
      const svgW=W*0.88*breathSVG;
      const svgH=svgW*(521/362);
      const svgX=(W-svgW)/2+sway;
      const svgY=H-svgH+H*0.05;
      ctx.drawImage(svgImg,svgX,svgY,svgW,svgH);
     }

     /* ── Lens flares discrets ── */
     for(const lf of lensFlares){
      const lfx=cx+lf.ox*W+Math.sin(t*0.13+lf.ox*10)*3;
      const lfy=H*0.45+lf.oy*H+Math.cos(t*0.09+lf.oy*8)*2;
      const lfr=lf.r*W;
      const lfPulse=0.03+0.015*Math.sin(t*0.27+lf.ox*5);
      const lfg=ctx.createRadialGradient(lfx,lfy,0,lfx,lfy,lfr);
      lfg.addColorStop(0,`rgba(${lf.col[0]},${lf.col[1]},${lf.col[2]},${lfPulse})`);
      lfg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lfg;ctx.fillRect(0,0,W,H);
     }

     /* ── Particules dorées flottantes ── */
     for(const p of particles){
      p.x+=p.vx+Math.sin(t*0.5+p.ph)*0.12;
      p.y+=p.vy; p.ph+=0.020;
      if(p.y<-8){p.y=H+8;p.x=Math.random()*W;}
      const pulse=0.5+0.5*Math.sin(p.ph);
      ctx.fillStyle=`rgba(200,140,60,${p.op*pulse})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Pluie visible — NYC nocturne ── */
     ctx.save();
     for(const rd of rainDrops){
      rd.y+=rd.speed;
      if(rd.y>H+rd.len){rd.y=-rd.len;rd.x=Math.random()*W;}
      const rainPulse=rd.op*(0.7+0.3*Math.sin(t*1.8+rd.x*0.04));
      ctx.strokeStyle=`rgba(220,200,160,${rainPulse})`;
      ctx.lineWidth=rd.w;
      ctx.beginPath();
      ctx.moveTo(rd.x,rd.y);
      ctx.lineTo(rd.x+Math.cos(rd.ang)*rd.len,rd.y+Math.sin(rd.ang)*rd.len);
      ctx.stroke();
     }
     ctx.restore();

     /* ── Grain texture affiche ── */
     ctx.globalAlpha=0.55;
     ctx.drawImage(grainCanvas,0,0);
     ctx.globalAlpha=1;

     /* ── Vignette douce — sans bandes latérales ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.06,cx,H*0.48,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.06)');
     vg.addColorStop(1,'rgba(0,0,0,0.65)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
