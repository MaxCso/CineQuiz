// CinéQuiz splash chunk — Casino
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Casino"]={
   name:'Casino',
   color:'200,40,40',
   ref:'Casino \u2014 Martin Scorsese, 1995',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _csS=document.getElementById('_cs_s');
    if(!_csS){_csS=document.createElement('style');_csS.id='_cs_s';document.head.appendChild(_csS);}
    _csS.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(255,245,225,0.92)!important;font-size:14px!important;text-shadow:0 1px 8px rgba(80,0,0,0.70)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _csW=setInterval(()=>{if(stop.v){_csS.textContent='';clearInterval(_csW);}},200);

    /* ── SVG revolver (432×579, ratio ~0.745) ── */
    const gunImg=new Image(); let gunReady=false;
    gunImg.onload=()=>{ gunReady=true; };
    gunImg.src='images/Casino.svg';
    const GUN_RATIO=432/579;

    /* ── Jetons qui tombent ── */
    /* Chaque jeton : ellipse noire/rouge avec rotation en perspective */
    function mkChip(){
      const side=Math.random()<0.5?-1:1;
      return {
        x: cx + side*(W*(0.04+Math.random()*0.24)),
        y: -(H*(0.05+Math.random()*0.20)),
        vy: H*(0.004+Math.random()*0.006),
        vx: (Math.random()-0.5)*W*0.002,
        rot: Math.random()*Math.PI*2,      /* angle de rotation plan XY */
        rotSpd: (Math.random()-0.5)*0.08,  /* vitesse de rotation */
        tilt: Math.random()*0.85,          /* inclinaison perspective 0=face, 1=tranche */
        tiltSpd: (Math.random()-0.5)*0.025,
        r: W*(0.048+Math.random()*0.038),  /* rayon du jeton */
        col: Math.random()<0.55 ? 'dark':'light', /* noir ou blanc cassé */
        accel: 0.08+Math.random()*0.12,    /* accélération gravité */
        op: 0.80+Math.random()*0.20,
        shadow: Math.random()*0.40+0.20,
      };
    }
    const chips=Array.from({length:14}, mkChip);

    function drawChip(chip){
      const {x,y,rot,tilt,r,col,op} = chip;

      /* Hauteur apparente selon inclinaison (tilt) — 0=cercle, 1=ligne */
      const tiltClamped=Math.max(0.05, Math.abs(Math.cos(tilt)));
      const ry=r*tiltClamped; /* demi-hauteur apparente */

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha=op;

      /* Ombre portée sous le jeton */
      const shG=ctx.createRadialGradient(0,ry*0.4,0,0,ry*0.4,r*1.2);
      shG.addColorStop(0,`rgba(80,0,0,${chip.shadow*0.6})`);
      shG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shG;
      ctx.beginPath();ctx.ellipse(0,ry*0.5,r*1.1,ry*0.35,0,0,Math.PI*2);ctx.fill();

      if(col==='dark'){
        /* Jeton noir — comme l'affiche */
        /* Tranche */
        if(tiltClamped<0.7){
          ctx.fillStyle='rgba(20,15,12,0.95)';
          ctx.beginPath();ctx.ellipse(0,ry*0.12,r,ry*1.1,0,0,Math.PI*2);ctx.fill();
        }
        /* Face principale */
        const cG=ctx.createRadialGradient(-r*0.25,-ry*0.25,0,0,0,r);
        cG.addColorStop(0,'rgba(55,50,45,1.0)');
        cG.addColorStop(0.5,'rgba(30,25,22,1.0)');
        cG.addColorStop(1,'rgba(15,12,10,1.0)');
        ctx.fillStyle=cG;
        ctx.beginPath();ctx.ellipse(0,0,r,ry,0,0,Math.PI*2);ctx.fill();
        /* Cercle intérieur */
        ctx.strokeStyle='rgba(220,210,195,0.35)';ctx.lineWidth=r*0.08;
        ctx.beginPath();ctx.ellipse(0,0,r*0.72,ry*0.72,0,0,Math.PI*2);ctx.stroke();
        /* Petits marqueurs blancs sur le bord */
        for(let mi=0;mi<8;mi++){
          const ma=mi/8*Math.PI*2;
          const mx=Math.cos(ma)*r*0.88;
          const my=Math.sin(ma)*ry*0.88;
          ctx.fillStyle='rgba(255,250,240,0.45)';
          ctx.beginPath();ctx.ellipse(mx,my,r*0.05,ry*0.05,0,0,Math.PI*2);ctx.fill();
        }
        /* Reflet lumière */
        const rG=ctx.createRadialGradient(-r*0.30,-ry*0.30,0,-r*0.20,-ry*0.20,r*0.55);
        rG.addColorStop(0,'rgba(255,245,230,0.22)');
        rG.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=rG;
        ctx.beginPath();ctx.ellipse(0,0,r,ry,0,0,Math.PI*2);ctx.fill();

      } else {
        /* Jeton blanc/rouge — comme l'affiche */
        if(tiltClamped<0.7){
          ctx.fillStyle='rgba(200,200,190,0.90)';
          ctx.beginPath();ctx.ellipse(0,ry*0.12,r,ry*1.1,0,0,Math.PI*2);ctx.fill();
        }
        const cG=ctx.createRadialGradient(-r*0.2,-ry*0.2,0,0,0,r);
        cG.addColorStop(0,'rgba(240,235,225,1.0)');
        cG.addColorStop(0.6,'rgba(215,210,200,1.0)');
        cG.addColorStop(1,'rgba(185,180,170,1.0)');
        ctx.fillStyle=cG;
        ctx.beginPath();ctx.ellipse(0,0,r,ry,0,0,Math.PI*2);ctx.fill();
        /* Bande rouge */
        ctx.fillStyle='rgba(180,20,10,0.75)';
        ctx.beginPath();ctx.ellipse(0,0,r*0.65,ry*0.65,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='rgba(255,250,240,0.50)';ctx.lineWidth=r*0.06;
        ctx.beginPath();ctx.ellipse(0,0,r*0.85,ry*0.85,0,0,Math.PI*2);ctx.stroke();
        const rG=ctx.createRadialGradient(-r*0.28,-ry*0.28,0,-r*0.15,-ry*0.15,r*0.5);
        rG.addColorStop(0,'rgba(255,255,255,0.30)');
        rG.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=rG;
        ctx.beginPath();ctx.ellipse(0,0,r,ry,0,0,Math.PI*2);ctx.fill();
      }

      ctx.restore();
    }

    function drawGun(){
      if(!gunReady)return;
      const imgW=W*0.82;
      const imgH=imgW/GUN_RATIO;
      const imgX=cx-imgW/2;
      /* Positionner le pistolet sous la citation+logo (top:22%) */
      const imgY=H*0.42;
      ctx.drawImage(gunImg, imgX, imgY, imgW, imgH);
    }

    function frame(){
      if(stop.v)return;

      /* Fond rouge Casino — dégradé radial très subtil */
      const bg=ctx.createRadialGradient(cx,H*0.40,0,cx,H*0.40,H*0.80);
      bg.addColorStop(0,'#d42510');
      bg.addColorStop(0.55,'#c0200a');
      bg.addColorStop(1,'#8a1206');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      /* Mise à jour et dessin des jetons */
      for(let i=0;i<chips.length;i++){
        const c=chips[i];
        c.vy+=c.accel*0.016;
        c.x+=c.vx;
        c.y+=c.vy;
        c.rot+=c.rotSpd;
        c.tilt+=c.tiltSpd;
        if(c.y>H+c.r*2) chips[i]=mkChip();
        drawChip(c);
      }

      drawGun();

      /* Vignette rouge sombre sur les bords */
      /* Vignette uniquement haut et bas — pas de bandes latérales */
      const vigT=ctx.createLinearGradient(0,0,0,H*0.18);
      vigT.addColorStop(0,'rgba(40,0,0,0.30)');
      vigT.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=vigT; ctx.fillRect(0,0,W,H*0.18);
      const vigB=ctx.createLinearGradient(0,H*0.82,0,H);
      vigB.addColorStop(0,'rgba(0,0,0,0)');
      vigB.addColorStop(1,'rgba(30,0,0,0.75)');
      ctx.fillStyle=vigB; ctx.fillRect(0,H*0.82,W,H*0.18);

      /* Grain pellicule teinté rouge — texture affiche sérigraphiée */
      for(let i=0;i<28;i++){
        const gv=Math.random()*20|0;
        ctx.fillStyle=`rgba(${gv+40},${gv},${gv},${Math.random()*0.018})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.4,Math.random()*1.5+0.4);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
