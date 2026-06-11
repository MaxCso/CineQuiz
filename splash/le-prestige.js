// CinéQuiz splash chunk — Le Prestige
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Prestige"]={
   name:'Le Prestige',
   color:'30,30,30',
   ref:'The Prestige \u2014 Christopher Nolan, 2006',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_lp_s');
    if(!_s){_s=document.createElement('style');_s.id='_lp_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:rgba(255,255,255,0.92)!important;text-shadow:0 2px 12px rgba(0,0,0,0.95)!important;}#splash-film-logo{filter:drop-shadow(0 2px 12px rgba(0,0,0,0.95))!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Chapeau SVG — chargé depuis le dossier images ── */
    const hatImg=new Image(); let hatReady=false;
    hatImg.onload=()=>{hatReady=true;};
    hatImg.src='images/Chapeau.svg';

    /* ── Population de chapeaux en chute ── */
    /* ratio SVG 1280x909 ≈ 1.408 (large) */
    const HAT_RATIO=1280/909;

    function makeHat(fromTop){
     const layer=Math.random(); /* 0=fond, 1=premier plan */
     const sc=0.08+layer*0.22;  /* taille relative à W */
     return {
      x:Math.random()*W*1.20-W*0.10,
      y:fromTop ? -W*sc*1.5-Math.random()*H : Math.random()*H*1.10-H*0.05,
      rot:(Math.random()-0.5)*Math.PI*2,
      rotSpd:(Math.random()-0.5)*0.022,
      vy:0.55+layer*1.20+Math.random()*0.60,
      vx:(Math.random()-0.5)*0.35,
      sc,
      op:0.25+layer*0.72,
      layer,
     };
    }

    /* 38 chapeaux — positions initiales réparties sur tout l'écran */
    const hats=Array.from({length:38},()=>makeHat(false));
    /* Trier par layer pour le rendu arrière→avant */
    hats.sort((a,b)=>a.layer-b.layer);

    function drawHat(h){
     if(!hatReady)return;
     const hW=W*h.sc*HAT_RATIO;
     const hH=W*h.sc;
     ctx.save();
     ctx.globalAlpha=h.op;
     ctx.translate(h.x,h.y);
     ctx.rotate(h.rot);
     /* Ombre portée douce */
     ctx.shadowColor='rgba(0,0,0,0.28)';
     ctx.shadowBlur=hH*0.18;
     ctx.shadowOffsetX=hH*0.04;
     ctx.shadowOffsetY=hH*0.06;
     ctx.drawImage(hatImg,-hW/2,-hH/2,hW,hH);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond : beige/crème en bas → noir en haut, comme l'affiche ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'rgba(0,0,0,1)');
     bg.addColorStop(0.28,'rgba(18,12,10,1)');
     bg.addColorStop(0.52,'rgba(55,42,35,1)');
     bg.addColorStop(0.72,'rgba(175,162,148,1)');
     bg.addColorStop(0.88,'rgba(218,208,194,1)');
     bg.addColorStop(1.00,'rgba(232,224,212,1)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── Mise à jour et dessin des chapeaux ── */
     for(const h of hats){
      h.y+=h.vy;
      h.x+=h.vx;
      h.rot+=h.rotSpd;
      /* Léger balancement sinusoïdal */
      h.x+=Math.sin(t*0.4+h.layer*3.2)*0.18;
      /* Recyclage quand le chapeau sort par le bas */
      if(h.y>H+W*h.sc*1.5){
       const n=makeHat(true);
       Object.assign(h,n);
      }
      drawHat(h);
     }

     /* ── Vignette bords gauche/droite — renforce la profondeur ── */
     const vgLR=ctx.createLinearGradient(0,0,W,0);
     vgLR.addColorStop(0,'rgba(0,0,0,0.22)');
     vgLR.addColorStop(0.15,'rgba(0,0,0,0)');
     vgLR.addColorStop(0.85,'rgba(0,0,0,0)');
     vgLR.addColorStop(1,'rgba(0,0,0,0.22)');
     ctx.fillStyle=vgLR;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }

  };
})();
