// CinéQuiz splash chunk — Ghost in the Shell
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Ghost in the Shell"]={
   name:'Ghost in the Shell',
   color:'0,200,120',
   ref:'Ghost in the Shell \u2014 Mamoru Oshii, 1995',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;

    /* ── Style UI ── */
    let _s=document.getElementById('_gits_s');
    if(!_s){_s=document.createElement('style');_s.id='_gits_s';document.head.appendChild(_s);}
    _s.textContent=`
     #splash-content-wrap{top:22%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(160,255,200,0.90)!important;text-shadow:0 0 12px rgba(0,255,120,0.4)!important;}
     #splash-film-logo{max-width:72%!important;filter:drop-shadow(0 0 8px rgba(0,220,140,0.5))!important;}
    `;
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Image de fond PNG ── */
    const bgImg=new Image(); let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/GITS.png';

    /* ── Pluie numérique — katakana + hex, très discrets ── */
    const FONT_SZ=11;
    const cols=Math.floor(W/FONT_SZ);
    const drops=Array.from({length:cols},()=>({
     y:Math.random()*-80|0,
     spd:0.28+Math.random()*0.40,
     op:0.08+Math.random()*0.18,   /* très subtil par-dessus le PNG */
     bright:Math.random()<0.08,     /* quelques caractères plus lumineux */
    }));
    const codeChars='アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ0123456789';

    /* ── Particules lumineuses flottantes (données / esprits) ── */
    const sparks=Array.from({length:55},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vy:-(0.10+Math.random()*0.22),
     vx:(Math.random()-0.5)*0.10,
     r:W*(0.0015+Math.random()*0.003),
     op:0.20+Math.random()*0.45,
     ph:Math.random()*Math.PI*2,
     col:Math.random()<0.7?'80,255,160':'140,220,255', /* vert néon ou cyan */
    }));

    /* ── Scan line ── une bande lumineuse qui descend lentement ── */
    let scanY=0;

    function frame(){
     if(stop.v)return;

     /* 1. Image de fond plein canvas */
     if(bgReady){
      /* Couvre tout le canvas en conservant le ratio (cover) */
      const iR=bgImg.naturalWidth/bgImg.naturalHeight;
      const cR=W/H;
      let sw,sh,sx,sy;
      if(iR>cR){ sh=bgImg.naturalHeight; sw=sh*cR; sx=(bgImg.naturalWidth-sw)/2; sy=0; }
      else      { sw=bgImg.naturalWidth;  sh=sw/cR; sx=0; sy=(bgImg.naturalHeight-sh)/2; }
      ctx.drawImage(bgImg,sx,sy,sw,sh,0,0,W,H);
     } else {
      ctx.fillStyle='#050e08';ctx.fillRect(0,0,W,H);
     }

     /* 2. Overlay sombre très léger pour améliorer lisibilité du texte UI */
     const ov=ctx.createLinearGradient(0,0,0,H);
     ov.addColorStop(0,'rgba(0,8,4,0.45)');
     ov.addColorStop(0.45,'rgba(0,8,4,0.15)');
     ov.addColorStop(1,'rgba(0,8,4,0.55)');
     ctx.fillStyle=ov;ctx.fillRect(0,0,W,H);

     /* 3. Pluie numérique — katakana discrets */
     ctx.font=`${FONT_SZ}px monospace`;
     for(let i=0;i<cols;i++){
      const d=drops[i];
      const c=codeChars[Math.random()*codeChars.length|0];
      const px=i*FONT_SZ, py=d.y*FONT_SZ;
      if(d.bright){
       ctx.fillStyle=`rgba(200,255,220,${d.op*2.2})`;
      } else {
       ctx.fillStyle=`rgba(60,220,110,${d.op})`;
      }
      ctx.fillText(c,px,py);
      if(py>H&&Math.random()>0.982){ d.y=-(2+Math.random()*6|0); d.bright=Math.random()<0.08; }
      else d.y+=d.spd;
     }

     /* 4. Particules lumineuses flottantes */
     for(const sp of sparks){
      sp.y+=sp.vy; sp.x+=sp.vx; sp.ph+=0.025;
      if(sp.y<-4){ sp.y=H+4; sp.x=Math.random()*W; }
      if(sp.x<0||sp.x>W) sp.vx*=-1;
      const pulse=0.5+0.5*Math.sin(sp.ph);
      ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r*(0.7+0.6*pulse),0,Math.PI*2);
      ctx.fillStyle=`rgba(${sp.col},${sp.op*pulse})`;ctx.fill();
      /* micro halo */
      const hg=ctx.createRadialGradient(sp.x,sp.y,0,sp.x,sp.y,sp.r*5);
      hg.addColorStop(0,`rgba(${sp.col},${sp.op*0.3*pulse})`);
      hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r*5,0,Math.PI*2);ctx.fill();
     }

     /* 5. Scan line horizontale — descend sur toute la hauteur, cycle continu */
     scanY=(scanY+0.28)%H;
     const scanH=H*0.012;
     const sg=ctx.createLinearGradient(0,scanY-scanH,0,scanY+scanH);
     sg.addColorStop(0,'rgba(80,255,160,0)');
     sg.addColorStop(0.5,`rgba(80,255,160,${0.06+0.03*Math.sin(t*0.8)})`);
     sg.addColorStop(1,'rgba(80,255,160,0)');
     ctx.fillStyle=sg;ctx.fillRect(0,scanY-scanH,W,scanH*2);

     /* 6. Vignettage dynamique — bords sombres pulsants */
     const vig=ctx.createRadialGradient(cx,H*0.5,H*0.28,cx,H*0.5,H*0.82);
     vig.addColorStop(0,'rgba(0,0,0,0)');
     vig.addColorStop(1,`rgba(0,4,2,${0.52+0.06*Math.sin(t*0.25)})`);
     ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
