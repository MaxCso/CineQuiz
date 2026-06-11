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

    /* ── Particules de poussière magique — dorées et blanches ── */
    const dust=Array.from({length:55},()=>({
     x:Math.random()*W,
     y:H*0.35+Math.random()*H*0.55,
     vx:(Math.random()-0.5)*0.12,
     vy:-(0.06+Math.random()*0.14),
     r:Math.random()*1.6+0.4,
     life:Math.random(),
     decay:0.0014+Math.random()*0.0018,
     op:0.55+Math.random()*0.40,
     col:Math.random()<0.55?'220,175,60':Math.random()<0.5?'255,240,200':'180,210,255',
     ph:Math.random()*Math.PI*2,
     wf:0.008+Math.random()*0.012,
    }));

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

     /* ── Fond noir théâtral ── */
     ctx.fillStyle='#05030a';ctx.fillRect(0,0,W,H);

     /* ── Spotlight radial — halo doré au centre, comme un feu de scène ── */
     const spotY=H*0.52;
     const spot=ctx.createRadialGradient(cx,spotY,0,cx,spotY,W*0.82);
     spot.addColorStop(0.00,`rgba(160,110,40,${0.32+Math.sin(t*0.25)*0.04})`);
     spot.addColorStop(0.18,`rgba(90,55,18,${0.22+Math.sin(t*0.18)*0.03})`);
     spot.addColorStop(0.42,'rgba(35,20,8,0.18)');
     spot.addColorStop(0.70,'rgba(10,6,2,0.08)');
     spot.addColorStop(1.00,'rgba(0,0,0,0)');
     ctx.fillStyle=spot;ctx.fillRect(0,0,W,H);

     /* ── Halo bleu-nuit en haut — plafond du théâtre ── */
     const topH=ctx.createRadialGradient(cx,0,0,cx,0,W*0.70);
     topH.addColorStop(0,'rgba(15,18,40,0.55)');
     topH.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=topH;ctx.fillRect(0,0,W,H*0.55);

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

     /* ── Particules de poussière magique ── */
     for(const p of dust){
      p.x+=p.vx+Math.sin(t*p.wf+p.ph)*0.18;
      p.y+=p.vy;
      p.life-=p.decay;
      if(p.life<=0){
       p.x=Math.random()*W;p.y=H*0.40+Math.random()*H*0.45;
       p.life=0.6+Math.random()*0.4;p.vy=-(0.06+Math.random()*0.14);
       p.vx=(Math.random()-0.5)*0.12;
      }
      const pa=p.life*p.op;
      const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*2.2);
      pg.addColorStop(0,`rgba(${p.col},${pa})`);
      pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(p.x,p.y,p.r*2.2,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(${p.col},${Math.min(1,pa*1.4)})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette forte sur les bords ── */
     const vgLR=ctx.createLinearGradient(0,0,W,0);
     vgLR.addColorStop(0,'rgba(0,0,0,0.55)');
     vgLR.addColorStop(0.18,'rgba(0,0,0,0)');
     vgLR.addColorStop(0.82,'rgba(0,0,0,0)');
     vgLR.addColorStop(1,'rgba(0,0,0,0.55)');
     ctx.fillStyle=vgLR;ctx.fillRect(0,0,W,H);
     /* Vignette radiale globale */
     const vgR=ctx.createRadialGradient(cx,H*0.50,H*0.12,cx,H*0.50,H*0.80);
     vgR.addColorStop(0,'rgba(0,0,0,0)');
     vgR.addColorStop(0.55,'rgba(0,0,0,0.08)');
     vgR.addColorStop(1,'rgba(0,0,0,0.72)');
     ctx.fillStyle=vgR;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }

  };
})();
