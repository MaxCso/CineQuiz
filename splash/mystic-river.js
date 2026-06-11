// CinéQuiz splash chunk — Mystic River
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Mystic River"]={
   name:'Mystic River',
   color:'40,80,120',
   ref:'Mystic River \u2014 Clint Eastwood, 2003',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';

    /* ── Palette affiche — bleu roi franc ── */
    let _mrStyle=document.getElementById('_mr_splash_style');
    if(!_mrStyle){_mrStyle=document.createElement('style');_mrStyle.id='_mr_splash_style';document.head.appendChild(_mrStyle);}
    _mrStyle.textContent=`

      
      #splash-bg{background:none!important;}
      #splash-content-wrap{top:20%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _mrWatch=setInterval(()=>{if(stop.v){_mrStyle.textContent='';clearInterval(_mrWatch);}},200);

    let t=0;
    const cx=W/2;

    /* ── Couleurs affiche ── */
    const BG_BLUE   ='#1a7bbf';   /* bleu roi fond */
    const RIVER_LIGHT='rgba(56,162,215,1.0)';  /* eau claire */
    const BANK_DARK  ='rgba(18,48,98,1.0)';    /* rives sombres */
    const BRIDGE_COL ='rgba(14,38,82,0.97)';   /* pont/treillis */
    const HORIZ      =H*0.42;                  /* ligne d'horizon */

    /* Particules reflets sur l'eau */
    const glints=Array.from({length:38},()=>({
     x:Math.random()*W,
     y:HORIZ+H*0.08+Math.random()*H*0.30,
     r:Math.random()*2.5+0.5,
     ph:Math.random()*Math.PI*2,
     spd:0.025+Math.random()*0.045,
     op:0.15+Math.random()*0.35,
     vx:(Math.random()-0.5)*0.14,
    }));

    /* ── Brume sur la rivière — volutes qui dérivent ── */
    const mistPuffs=Array.from({length:18},()=>({
     x:Math.random()*W,
     y:HORIZ+H*(0.02+Math.random()*0.22),
     r:W*(0.06+Math.random()*0.10),
     op:0.04+Math.random()*0.08,
     ph:Math.random()*Math.PI*2,
     spd:0.003+Math.random()*0.005,
     vx:(Math.random()-0.5)*0.18,
    }));

    /* ── Nuages lents dans le ciel ── */
    const clouds=Array.from({length:5},(_,i)=>({
     x:W*(0.05+i*0.22)+Math.random()*W*0.08,
     y:H*(0.06+Math.random()*0.22),
     rx:W*(0.10+Math.random()*0.12),
     ry:H*(0.018+Math.random()*0.022),
     op:0.12+Math.random()*0.16,
     ph:Math.random()*Math.PI*2,
     spd:0.002+Math.random()*0.003,
     vx:0.06+Math.random()*0.08,
    }));

    /* ── Oiseaux — silhouettes traversant le ciel ── */
    const birds=Array.from({length:6},(_,i)=>({
     x:Math.random()*W,
     y:H*(0.06+Math.random()*0.26),
     vx:0.25+Math.random()*0.35,
     ph:Math.random()*Math.PI*2,
     spd:0.08+Math.random()*0.06,
     size:W*(0.008+Math.random()*0.006),
     delay:i*80+Math.random()*120,
    }));

    /* ── Débris flottants sur l'eau ── */
    const debris=Array.from({length:8},()=>({
     x:Math.random()*W,
     y:HORIZ+H*(0.12+Math.random()*0.28),
     vx:(Math.random()-0.5)*0.12,
     ph:Math.random()*Math.PI*2,
     spd:0.012+Math.random()*0.016,
     size:W*(0.004+Math.random()*0.006),
     op:0.35+Math.random()*0.30,
    }));

    /* ── Dessine la rivière sinueuse vue de dessus en perspective ── */
    function drawRiver(){
     /* La rivière serpente : part large en bas centre, monte en sinuant vers l'horizon */
     /* Points de contrôle de la rive gauche et droite */

     /* Version simplifiée : trapèze sinueux par bandes horizontales */
     const steps=Math.ceil(H-HORIZ);
     for(let i=0;i<steps;i++){
      const y=HORIZ+i;
      const progress=i/(H-HORIZ); /* 0=horizon, 1=bas */

      /* Largeur de la rivière : étroite à l'horizon, large en bas */
      const riverW=W*(0.04+progress*0.55);

      /* Sinuosité : déplacement horizontal du centre de la rivière */
      const sway=Math.sin(progress*Math.PI*1.4-0.5)*W*(0.08+progress*0.08);
      /* Légère ondulation animée */
      const ripple=Math.sin(t*0.6+progress*8)*W*(0.006*(1-progress));

      const riverCX=cx+sway+ripple;
      const lx=riverCX-riverW/2;
      const rx=riverCX+riverW/2;

      /* Rive gauche (fond sombre) */
      ctx.fillStyle=BANK_DARK;
      ctx.fillRect(0,y,Math.max(0,lx),1);
      /* Rivière (bleu clair) */
      if(rx>lx){
       /* Légère variation de teinte avec la profondeur */
       const rAlpha=0.85+progress*0.15;
       ctx.fillStyle=`rgba(56,162,215,${rAlpha})`;
       ctx.fillRect(lx,y,rx-lx,1);
      }
      /* Rive droite */
      ctx.fillStyle=BANK_DARK;
      ctx.fillRect(Math.min(W,rx),y,W-Math.min(W,rx),1);
     }

     /* Bord d'horizon — bandes de terre sombre gauche et droite */
     ctx.fillStyle=BANK_DARK;
     ctx.fillRect(0,HORIZ,W*0.28,H*0.08);
     ctx.fillRect(W*0.72,HORIZ,W*0.28,H*0.08);
    }

    /* ── Dessine le pont métallique à treillis ── */
    function drawBridge(){
     const bridgeY=HORIZ;          /* base du pont = ligne horizon */
     const bridgeH=H*0.12;         /* hauteur de la structure */
     const pylon1X=W*0.20;         /* pylône gauche */
     const pylon2X=W*0.80;         /* pylône droit */
     const pylonH=bridgeH*1.10;    /* pylônes un peu plus hauts */
     const deckY=bridgeY-bridgeH*0.18; /* niveau tablier */

     ctx.strokeStyle=BRIDGE_COL;
     ctx.fillStyle=BRIDGE_COL;
     ctx.lineCap='round';
     ctx.lineJoin='round';

     /* ── Tablier horizontal ── */
     ctx.lineWidth=3.5;
     ctx.beginPath();
     ctx.moveTo(0,deckY);
     ctx.lineTo(W,deckY);
     ctx.stroke();

     /* Poutre basse */
     ctx.lineWidth=2.5;
     ctx.beginPath();
     ctx.moveTo(0,bridgeY);
     ctx.lineTo(W,bridgeY);
     ctx.stroke();

     /* ── Treillis triangulaires entre les deux poutres ── */
     const trussCount=16;
     const trussW=W/trussCount;
     ctx.lineWidth=1.5;
     for(let i=0;i<trussCount;i++){
      const x1=i*trussW;
      const x2=(i+1)*trussW;
      const xm=(x1+x2)/2;
      /* Triangle montant */
      ctx.beginPath();
      ctx.moveTo(x1,bridgeY);
      ctx.lineTo(xm,deckY);
      ctx.lineTo(x2,bridgeY);
      ctx.stroke();
      /* Verticales */
      ctx.beginPath();
      ctx.moveTo(x1,bridgeY);
      ctx.lineTo(x1,deckY);
      ctx.stroke();
     }

     /* ── Pylônes ── */
     const pylW=W*0.022;
     ctx.lineWidth=0;
     /* Pylône gauche */
     ctx.fillRect(pylon1X-pylW/2,bridgeY-pylonH,pylW,pylonH+H*0.04);
     /* Pylône droit */
     ctx.fillRect(pylon2X-pylW/2,bridgeY-pylonH,pylW,pylonH+H*0.04);
     /* Chapiteaux */
     ctx.fillRect(pylon1X-pylW,bridgeY-pylonH,pylW*2,H*0.008);
     ctx.fillRect(pylon2X-pylW,bridgeY-pylonH,pylW*2,H*0.008);

     /* Câbles diagonaux depuis les pylônes */
     ctx.lineWidth=1.2;
     ctx.globalAlpha=0.70;
     for(const px of [pylon1X,pylon2X]){
      for(let k=1;k<=5;k++){
       const dir=px===pylon1X?-1:1;
       const ex=px+dir*W*0.12*k;
       ctx.beginPath();
       ctx.moveTo(px,bridgeY-pylonH*0.85);
       ctx.lineTo(ex,deckY);
       ctx.stroke();
      }
     }
     ctx.globalAlpha=1;
    }

    /* ── Dessine la brume sur la rivière ── */
    function drawMist(){
     for(const m of mistPuffs){
      m.ph+=m.spd; m.x+=m.vx;
      if(m.x<-m.r*2)m.x=W+m.r; if(m.x>W+m.r*2)m.x=-m.r;
      const pulse=0.5+0.5*Math.sin(m.ph);
      const mg=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r);
      mg.addColorStop(0,`rgba(180,210,235,${m.op*pulse})`);
      mg.addColorStop(0.5,`rgba(160,195,225,${m.op*pulse*0.5})`);
      mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;ctx.beginPath();ctx.ellipse(m.x,m.y,m.r,m.r*0.38,0,0,Math.PI*2);ctx.fill();
     }
    }

    /* ── Dessine les nuages ── */
    function drawClouds(){
     for(const c of clouds){
      c.ph+=c.spd; c.x+=c.vx;
      if(c.x>W+c.rx*2)c.x=-c.rx*2;
      const pulse=0.7+0.3*Math.sin(c.ph);
      const cg=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.rx);
      cg.addColorStop(0,`rgba(14,55,95,${c.op*pulse})`);
      cg.addColorStop(0.6,`rgba(12,48,85,${c.op*pulse*0.5})`);
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.ellipse(c.x,c.y,c.rx,c.ry,0,0,Math.PI*2);ctx.fill();
     }
    }

    /* ── Dessine les oiseaux ── */
    function drawBirds(){
     for(const b of birds){
      if(b.delay>0){b.delay--;continue;}
      b.x+=b.vx; b.ph+=b.spd;
      if(b.x>W+b.size*4){b.x=-b.size*4;b.y=H*(0.06+Math.random()*0.26);}
      const wingFlap=Math.sin(b.ph)*b.size*0.55;
      const bx=b.x, by=b.y;
      ctx.strokeStyle=`rgba(12,38,75,${0.55+Math.sin(b.ph*0.3)*0.15})`;
      ctx.lineWidth=1.2; ctx.lineCap='round';
      /* Aile gauche */
      ctx.beginPath();
      ctx.moveTo(bx,by);
      ctx.quadraticCurveTo(bx-b.size*0.6,by-wingFlap,bx-b.size*1.2,by+wingFlap*0.3);
      ctx.stroke();
      /* Aile droite */
      ctx.beginPath();
      ctx.moveTo(bx,by);
      ctx.quadraticCurveTo(bx+b.size*0.6,by-wingFlap,bx+b.size*1.2,by+wingFlap*0.3);
      ctx.stroke();
     }
    }

    /* ── Dessine les débris flottants ── */
    function drawDebris(){
     for(const d of debris){
      d.ph+=d.spd; d.x+=d.vx+Math.sin(d.ph*0.4)*0.08;
      if(d.x<0)d.x=W; if(d.x>W)d.x=0;
      const dy=d.y+Math.sin(d.ph)*H*0.003;
      const da=d.op*(0.6+0.4*Math.abs(Math.sin(d.ph)));
      ctx.fillStyle=`rgba(20,50,90,${da})`;
      ctx.save();
      ctx.translate(d.x,dy);
      ctx.rotate(Math.sin(d.ph*0.5)*0.3);
      ctx.fillRect(-d.size/2,-d.size*0.3,d.size,d.size*0.3);
      ctx.restore();
     }
    }

    function frame(){
     if(stop.v)return;

     /* ── FOND bleu roi plein ── */
     ctx.fillStyle=BG_BLUE;
     ctx.fillRect(0,0,W,H);

     /* Légère variation de luminosité dans le ciel */
     const skyG=ctx.createLinearGradient(0,0,0,HORIZ);
     skyG.addColorStop(0,'rgba(16,68,112,0.25)');
     skyG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=skyG;ctx.fillRect(0,0,W,HORIZ);

     /* ── NUAGES ── */
     drawClouds();

     /* ── OISEAUX ── */
     drawBirds();

     /* ── RIVIÈRE + RIVES ── */
     drawRiver();

     /* ── PONT ── */
     drawBridge();

     /* ── BRUME sur la rivière ── */
     drawMist();

     /* ── ONDULATIONS légères à la surface de l'eau ── */
     for(let row=0;row<5;row++){
      const ry=HORIZ+H*0.05+row*H*0.06;
      const progress=(ry-HORIZ)/(H-HORIZ);
      /* Centre de la rivière à cette hauteur */
      const sway=Math.sin(progress*Math.PI*1.4-0.5)*W*(0.08+progress*0.08);
      const riverW=W*(0.04+progress*0.55);
      const rCX=cx+sway;
      const alpha=0.12-row*0.018;
      ctx.strokeStyle=`rgba(90,185,235,${alpha})`;
      ctx.lineWidth=0.8+progress*0.6;
      ctx.beginPath();
      for(let x=rCX-riverW/2+2;x<rCX+riverW/2-2;x+=3){
       const disp=Math.sin(t*0.8+x*0.038+row*1.3)*2.5*(1+progress);
       x===rCX-riverW/2+2?ctx.moveTo(x,ry+disp):ctx.lineTo(x,ry+disp);
      }
      ctx.stroke();
     }

     /* ── REFLETS lumineux sur l'eau ── */
     for(const g of glints){
      g.ph+=g.spd;
      const pulse=0.4+0.6*Math.abs(Math.sin(g.ph));
      g.x+=g.vx+Math.sin(g.ph*0.4)*0.10;
      if(g.x<0)g.x=W;if(g.x>W)g.x=0;
      const gy=g.y+Math.sin(g.ph*0.6)*2;
      const grd=ctx.createRadialGradient(g.x,gy,0,g.x,gy,g.r*4);
      grd.addColorStop(0,`rgba(200,235,255,${g.op*pulse})`);
      grd.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=grd;
      ctx.beginPath();ctx.arc(g.x,gy,g.r*4,0,Math.PI*2);ctx.fill();
     }

     /* ── DÉBRIS flottants ── */
     drawDebris();

     /* ── VIGNETTE douce — bords bleu marine ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.12,cx,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(8,28,65,0.20)');
     vg.addColorStop(1,'rgba(8,24,58,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
