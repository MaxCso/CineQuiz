// CinéQuiz splash chunk — Vanilla Sky
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Vanilla Sky"]={
   name:'Vanilla Sky',
   color:'80,120,200',
   ref:'Vanilla Sky \u2014 Cameron Crowe, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Supprimer les orbes du splash par défaut ── */
    let _vsStyle=document.getElementById('_vs_splash_style');
    if(!_vsStyle){_vsStyle=document.createElement('style');_vsStyle.id='_vs_splash_style';document.head.appendChild(_vsStyle);}
    _vsStyle.textContent=``;
    const _vsWatch=setInterval(()=>{if(stop.v){_vsStyle.textContent='';clearInterval(_vsWatch);}},200);

    /* ── Particules dorées flottant vers le haut ── */
    const dust=Array.from({length:28},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:Math.random()*1.6+0.3,
     vy:-(0.12+Math.random()*0.22),
     vx:(Math.random()-.5)*.06,
     op:Math.random()*.28+0.06,
     ph:Math.random()*Math.PI*2
    }));

    /* ── Chargement SVG Buildings + personnage ── */
    let buildingsReady=false, persoReady=false;
    let fadeIn=0;

    const imgBuildings=new Image();
    imgBuildings.onload=()=>{buildingsReady=true;};
    imgBuildings.src='images/sprite_36.svg';

    const imgPerso=new Image();
    imgPerso.onload=()=>{persoReady=true;};
    imgPerso.src='images/sprite_37.svg';

    /* ── Personnage qui chute ── */
    /* SVG 2705600 : 1280×893 → ratio 1.433 */
    const PRATIO=1280/893;
    const PW=W*.52;  /* largeur affichée */
    const PH=PW/PRATIO;
    const figure={
     y:H*.14,
     vy:.15,
     rot:.12,
     vrot:.0016,
     ox:0
    };

    function frame(){
     if(stop.v){return;}

     /* ── CIEL COUCHER DE SOLEIL — violet → rose → orange ── */
     const skyG=ctx.createLinearGradient(0,0,0,H);
     skyG.addColorStop(0.00,'rgba(88, 72,155,1.0)');
     skyG.addColorStop(0.18,'rgba(120, 88,175,1.0)');
     skyG.addColorStop(0.38,'rgba(175,100,165,1.0)');
     skyG.addColorStop(0.55,'rgba(215,120,140,1.0)');
     skyG.addColorStop(0.70,'rgba(235,148,105,1.0)');
     skyG.addColorStop(0.85,'rgba(248,180, 75,1.0)');
     skyG.addColorStop(1.00,'rgba(252,205, 65,1.0)');
     ctx.fillStyle=skyG;ctx.fillRect(0,0,W,H);

     /* Nuages légers animés — filaments roses */
     const cloudPulse=0.06+Math.sin(t*0.12)*0.02;
     const clouds2=[
      {x:W*0.12+Math.sin(t*0.04)*W*0.01,y:H*0.18,w:W*0.55,h:H*0.040,op:cloudPulse*0.9},
      {x:W*0.30+Math.sin(t*0.03)*W*0.008,y:H*0.26,w:W*0.42,h:H*0.028,op:cloudPulse*0.7},
      {x:W*0.05+Math.sin(t*0.05)*W*0.012,y:H*0.38,w:W*0.35,h:H*0.022,op:cloudPulse*0.5},
      {x:W*0.48+Math.sin(t*0.035)*W*0.010,y:H*0.44,w:W*0.48,h:H*0.018,op:cloudPulse*0.45},
     ];
     for(const c of clouds2){
      const cg=ctx.createRadialGradient(c.x+c.w*0.5,c.y,3,c.x+c.w*0.5,c.y,c.w*0.55);
      cg.addColorStop(0,`rgba(255,220,200,${c.op*1.8})`);
      cg.addColorStop(0.5,`rgba(255,190,170,${c.op})`);
      cg.addColorStop(1,'rgba(255,180,160,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.ellipse(c.x+c.w*0.5,c.y,c.w*0.5,c.h*0.5,0,0,Math.PI*2);ctx.fill();
     }

     /* Halo soleil en bas */
     const sunG=ctx.createRadialGradient(cx,H*0.88,W*0.03,cx,H*0.92,W*0.68);
     sunG.addColorStop(0,`rgba(255,235,120,${0.22+Math.sin(t*0.20)*0.05})`);
     sunG.addColorStop(0.40,`rgba(255,190,80,${0.10+Math.sin(t*0.18)*0.03})`);
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,H*0.55,W,H*0.45);

     /* ── Particules dorées ── */
     for(const d of dust){
      d.y+=d.vy; d.x+=d.vx; d.ph+=.025;
      if(d.y<-8){d.y=H+8;d.x=Math.random()*W;}
      ctx.globalAlpha=d.op*(.5+.5*Math.sin(d.ph));
      ctx.fillStyle='rgba(255,220,160,1)';
      ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill();
     }
     ctx.globalAlpha=1;

     /* ── Personnage SVG qui chute ── */
     figure.y+=figure.vy;
     figure.rot+=figure.vrot;
     figure.ox=Math.sin(t*.38)*W*.022;
     /* Reset au sommet quand il atteint la zone skyline */
     if(figure.y>H*.68){figure.y=H*.10;figure.rot=.12;figure.vrot=(Math.random()*.003-.0015)+.0012;}

     if(persoReady){
      ctx.save();
      const fx=cx+figure.ox, fy=figure.y;
      ctx.translate(fx,fy);
      ctx.rotate(figure.rot);
      ctx.globalAlpha=Math.min(1,(figure.y-H*.06)/(H*.10))*.92;
      ctx.drawImage(imgPerso,-PW/2,-PH/2,PW,PH);
      ctx.globalAlpha=1;
      ctx.restore();
     }

     /* ── Buildings SVG en bas — skyline sur le coucher de soleil ── */
     if(buildingsReady){
      /* Buildings 1060×482 → ratio 2.20 → on prend toute la largeur */
      const BW=W;
      const BH=BW*(482/1060);
      /* Collé au bas de l'écran */
      const BX=0;
      const BY=H-BH;
      ctx.save();
      /* Teinter les buildings dans les tons chauds du ciel */
      ctx.globalCompositeOperation='multiply';
      ctx.globalAlpha=0.92;
      ctx.drawImage(imgBuildings,BX,BY,BW,BH);
      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1.0;
      ctx.restore();
     }

     /* ── Vignette douce — sans bandes latérales ── */
     const vg=ctx.createRadialGradient(cx,H*.45,H*.08,cx,H*.45,H*.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(.55,'rgba(40,10,20,.05)');
     vg.addColorStop(1,'rgba(30,8,15,.55)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
     /* Fondu bas */
     const vgB=ctx.createLinearGradient(0,H,0,H*.82);
     vgB.addColorStop(0,'rgba(40,15,5,.55)'); vgB.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgB; ctx.fillRect(0,H*.82,W,H*.18);

     /* ── Fade-in entrée ── */
     if(fadeIn<1){
      fadeIn=Math.min(1,fadeIn+.018);
      ctx.fillStyle=`rgba(180,100,80,${(1-fadeIn)*(1-fadeIn)})`;
      ctx.fillRect(0,0,W,H);
     }

     t+=.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
