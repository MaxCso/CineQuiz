// CinéQuiz splash chunk — Boyz n the Hood
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Boyz n the Hood"]={
   name:'Boyz n the Hood',
   color:'200,60,20',
   ref:"Boyz n the Hood \u2014 John Singleton, 1991",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_bnh_s');
    if(!_s){_s=document.createElement('style');_s.id='_bnh_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:28%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ══ GÉOMÉTRIE DE LA SCÈNE ══ */
    const SIDEWALK_Y = H*0.735;  /* haut du trottoir */
    const ROAD_Y     = H*0.760;  /* chaussée */
    const HORIZON_Y  = H*0.520;  /* ligne d'horizon */

    /* ── Machine à états : WALK → ALERT → RUN ── */
    /* La voiture part hors-champ à droite, entre en scène, les persos la détectent */
    let sceneState = 'WALK'; /* WALK | ALERT | RUN */
    let alertTimer  = 0;     /* frames depuis le passage en ALERT */

    /* ── Voiture ── */
    const car = {
     x: W * 1.40,          /* démarre hors champ à droite */
     spd: W * 0.0045,      /* vitesse de base */
     flash: 0,
     flashAngle: -Math.PI * 0.65,
     shotTimer: 0,
     nextShot: 110 + Math.random()*80,
    };

    /* ── Personnages — 3 mecs qui marchent côte à côte ── */
    const guys = Array.from({length:3},(_,i)=>({
     x: W*(0.52 + i*0.10),   /* groupés au centre-droite */
     ph: (i/3)*Math.PI*2,
     spd: W*0.0014,           /* vitesse marche */
    }));

    /* ── Étoiles ── */
    const stars = Array.from({length:55},()=>({
     x:Math.random()*W, y:Math.random()*HORIZON_Y*0.85,
     r:Math.random()*1.0+0.2, op:0.25+Math.random()*0.55,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Lampadaires — 3 le long du trottoir ── */
    const lamps = [W*0.12, W*0.46, W*0.80].map(lx=>({x:lx}));

    /* ══ DESSIN PERSONNAGE — marche ou course selon runFactor (0=marche, 1=sprint) ══ */
    function drawGuy(gx, ph, runFactor, size){
     const h     = size;
     const thigh = h * 0.25;
     const shin  = h * 0.23;
     /* lean augmente avec runFactor */
     const lean  = 0.10 + runFactor * 0.32;
     /* amplitude jambe augmente avec runFactor */
     const legAmp = 0.42 + runFactor * 0.52;
     /* flexion genou : nulle en marche, forte en course */
     const kneeAmp = runFactor * 1.05;

     function legPts(lph){
      const ta = Math.sin(lph) * legAmp;
      const kf = Math.max(0, Math.sin(lph - 0.5)) * kneeAmp;
      const sa = ta - kf;
      const hx2 = gx;
      const hy2 = SIDEWALK_Y - h * 0.50;
      const kx2 = hx2 + Math.sin(ta) * thigh;
      const ky2 = hy2 + Math.cos(Math.abs(ta)) * thigh;
      const fx2 = kx2 + Math.sin(sa) * shin;
      const fy2 = Math.min(SIDEWALK_Y, ky2 + Math.cos(Math.abs(sa)) * shin);
      return {hx:hx2,hy:hy2,kx:kx2,ky:ky2,fx:fx2,fy:fy2};
     }

     const lL = legPts(ph);
     const lR = legPts(ph + Math.PI);
     const hipX = (lL.hx + lR.hx) * 0.5;
     const hipY = (lL.hy + lR.hy) * 0.5;
     const shdX = hipX - Math.sin(lean) * h * 0.28;
     const shdY = hipY - Math.cos(lean) * h * 0.28;
     const hdX  = shdX - Math.sin(lean) * h * 0.10;
     const hdY  = shdY - Math.cos(lean) * h * 0.10;

     const col = 'rgba(20,22,30,0.96)';
     ctx.strokeStyle = col; ctx.lineCap = 'round';

     /* Jambes */
     ctx.lineWidth = h * 0.085;
     for(const leg of [lL, lR]){
      ctx.beginPath(); ctx.moveTo(leg.hx,leg.hy); ctx.lineTo(leg.kx,leg.ky); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(leg.kx,leg.ky); ctx.lineTo(leg.fx,leg.fy); ctx.stroke();
     }
     /* Torse */
     ctx.lineWidth = h * 0.095;
     ctx.beginPath(); ctx.moveTo(hipX,hipY); ctx.lineTo(shdX,shdY); ctx.stroke();

     /* Bras */
     const armAmp = 0.45 + runFactor * 0.40;
     const armLen = h * 0.20;
     ctx.lineWidth = h * 0.072;
     [-1,1].forEach(side=>{
      const aph = ph + (side<0?Math.PI:0);
      const sw  = Math.sin(aph) * armAmp;
      const ex  = shdX + side*h*0.06 + Math.sin(sw)*armLen*0.55;
      const ey  = shdY + Math.cos(Math.abs(sw))*armLen*0.45;
      const wx  = ex + Math.sin(sw*0.5)*armLen*0.48;
      const wy  = ey + armLen*(0.28 + runFactor*0.12);
      ctx.beginPath(); ctx.moveTo(shdX+side*h*0.06,shdY); ctx.lineTo(ex,ey); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(wx,wy); ctx.stroke();
     });

     /* Tête */
     ctx.fillStyle = col;
     ctx.beginPath(); ctx.arc(hdX, hdY, h*0.115, 0, Math.PI*2); ctx.fill();
    }

    /* ══ BÂTIMENTS DE BANLIEUE ══ */
    function drawBuildings(){
     /* Rangée de maisons/immeubles bas sur fond */
     const bldgs=[
      {x:0,      w:W*0.18, h:H*0.14, col:'#0e1018', win:[[0.25,0.30],[0.65,0.30],[0.25,0.60],[0.65,0.60]]},
      {x:W*0.17, w:W*0.12, h:H*0.09, col:'#0c0e15', win:[[0.30,0.40],[0.70,0.40]]},
      {x:W*0.28, w:W*0.22, h:H*0.16, col:'#0d1020', win:[[0.20,0.25],[0.50,0.25],[0.80,0.25],[0.20,0.55],[0.50,0.55],[0.80,0.55]]},
      {x:W*0.49, w:W*0.15, h:H*0.10, col:'#0b0d14', win:[[0.30,0.35],[0.70,0.35]]},
      {x:W*0.63, w:W*0.20, h:H*0.13, col:'#0e1018', win:[[0.25,0.30],[0.60,0.30],[0.25,0.65],[0.60,0.65]]},
      {x:W*0.82, w:W*0.20, h:H*0.18, col:'#0c0f1c', win:[[0.25,0.22],[0.55,0.22],[0.80,0.22],[0.25,0.50],[0.55,0.50],[0.80,0.50],[0.25,0.72],[0.55,0.72]]},
     ];
     for(const b of bldgs){
      const top = HORIZON_Y - b.h;
      ctx.fillStyle = b.col;
      ctx.fillRect(b.x, top, b.w, b.h);
      /* Fenêtres allumées (certaines) */
      for(let wi=0;wi<b.win.length;wi++){
       const [wx,wy2] = b.win[wi];
       const wlit = ((wi*13+7) % 5) !== 0; /* ~80% allumées */
       const wwid = b.w*0.10, whgt = b.h*0.10;
       const wX = b.x + wx*b.w - wwid/2;
       const wY = top + wy2*b.h - whgt/2;
       if(wlit){
        ctx.fillStyle=`rgba(255,220,120,${0.45+Math.sin(t*0.3+wi)*0.12})`;
        ctx.fillRect(wX,wY,wwid,whgt);
        /* Halo fenêtre */
        const wg=ctx.createRadialGradient(wX+wwid/2,wY+whgt/2,0,wX+wwid/2,wY+whgt/2,wwid*2.5);
        wg.addColorStop(0,`rgba(255,200,80,${0.10+Math.sin(t*0.3+wi)*0.04})`);
        wg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=wg; ctx.fillRect(wX-wwid,wY-whgt,wwid*3,whgt*3);
       } else {
        ctx.fillStyle='rgba(20,25,40,0.80)';
        ctx.fillRect(wX,wY,wwid,whgt);
       }
      }
      /* Ligne de toit légère */
      ctx.strokeStyle='rgba(40,45,62,0.60)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(b.x,top); ctx.lineTo(b.x+b.w,top); ctx.stroke();
     }
    }

    /* ══ VOITURE (muscle car sombre) ══ */
    function drawCar(c){
     const x=c.x, y=ROAD_Y+H*0.020;
     const cw=W*0.19, ch=H*0.032;
     /* Carrosserie basse */
     ctx.fillStyle='rgba(10,11,16,0.98)';
     ctx.beginPath();ctx.roundRect(x-cw/2,y-ch,cw,ch,cw*0.04);ctx.fill();
     /* Toit */
     ctx.fillStyle='rgba(8,9,14,0.98)';
     ctx.beginPath();ctx.roundRect(x-cw*0.38,y-ch*2.20,cw*0.72,ch*1.28,cw*0.04);ctx.fill();
     /* Bande chromée */
     ctx.strokeStyle='rgba(55,60,80,0.70)';ctx.lineWidth=H*0.003;
     ctx.beginPath();ctx.moveTo(x-cw/2,y-ch*0.35);ctx.lineTo(x+cw/2,y-ch*0.35);ctx.stroke();
     /* Roues */
     for(const rx of [-cw*0.34, cw*0.34]){
      ctx.fillStyle='rgba(6,6,10,1)';
      ctx.beginPath();ctx.arc(x+rx,y+H*0.005,H*0.016,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(45,48,65,0.90)';ctx.lineWidth=H*0.006;
      ctx.beginPath();ctx.arc(x+rx,y+H*0.005,H*0.011,0,Math.PI*2);ctx.stroke();
     }
     /* Phares (gauche = avant car va vers la gauche) */
     const hlx=x-cw*0.48, hly=y-ch*0.65;
     const hg=ctx.createRadialGradient(hlx,hly,0,hlx-cw*0.22,hly,cw*0.55);
     hg.addColorStop(0,'rgba(255,248,210,0.92)');
     hg.addColorStop(0.25,'rgba(240,225,160,0.35)');
     hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg; ctx.fillRect(hlx-cw*0.55,hly-H*0.10,cw*0.60,H*0.18);
     ctx.fillStyle='rgba(255,250,215,0.96)';
     ctx.beginPath();ctx.arc(hlx,hly,cw*0.030,0,Math.PI*2);ctx.fill();
     /* Feux arrière */
     const rlx=x+cw*0.48;
     const rlg=ctx.createRadialGradient(rlx,hly,0,rlx,hly,cw*0.18);
     rlg.addColorStop(0,'rgba(220,20,5,0.70)');rlg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rlg; ctx.fillRect(rlx-cw*0.06,hly-H*0.06,cw*0.18,H*0.10);
     ctx.fillStyle='rgba(220,18,5,0.92)';
     ctx.beginPath();ctx.arc(rlx,hly,cw*0.022,0,Math.PI*2);ctx.fill();
    }

    /* ══ FLASH DE TIR ══ */
    function drawFlash(c){
     if(c.flash<=0.02)return;
     const ox=c.x-W*0.08, oy=ROAD_Y-H*0.022;
     const fl=c.flash;
     const mg=ctx.createRadialGradient(ox,oy,0,ox,oy,W*0.075*fl);
     mg.addColorStop(0,`rgba(255,245,120,${fl*0.95})`);
     mg.addColorStop(0.25,`rgba(255,150,15,${fl*0.60})`);
     mg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mg; ctx.beginPath();ctx.arc(ox,oy,W*0.09*fl,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle=`rgba(255,210,60,${fl*0.80})`;ctx.lineWidth=W*0.003;ctx.lineCap='round';
     for(let r=0;r<5;r++){
      const ra=c.flashAngle+(r-2)*0.20;
      ctx.beginPath();ctx.moveTo(ox,oy);
      ctx.lineTo(ox+Math.cos(ra)*W*(0.04+Math.random()*0.03)*fl,oy+Math.sin(ra)*W*0.04*fl);
      ctx.stroke();
     }
     if(fl>0.45){ctx.fillStyle=`rgba(255,160,20,${fl*0.06})`;ctx.fillRect(0,0,W,H);}
    }

    function frame(){
     if(stop.v)return;

     /* ── CIEL nuit de Compton ── */
     const sky=ctx.createLinearGradient(0,0,0,HORIZON_Y);
     sky.addColorStop(0,'#050810');
     sky.addColorStop(0.50,'#080c18');
     sky.addColorStop(1,'#0d1225');
     ctx.fillStyle=sky; ctx.fillRect(0,0,W,HORIZON_Y);

     /* Smog orangé à l'horizon — lueur de LA */
     const smog=ctx.createLinearGradient(0,HORIZON_Y-H*0.12,0,HORIZON_Y);
     smog.addColorStop(0,'rgba(0,0,0,0)');
     smog.addColorStop(1,'rgba(180,75,10,0.28)');
     ctx.fillStyle=smog; ctx.fillRect(0,HORIZON_Y-H*0.12,W,H*0.12);

     /* Étoiles */
     for(const s of stars){
      s.ph+=0.010;
      ctx.fillStyle=`rgba(215,210,195,${s.op*(0.45+0.55*Math.abs(Math.sin(s.ph)))})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── BÂTIMENTS ── */
     drawBuildings();

     /* ── TROTTOIR ET ROUTE ── */
     /* Trottoir béton */
     const swG=ctx.createLinearGradient(0,HORIZON_Y,0,SIDEWALK_Y);
     swG.addColorStop(0,'rgba(28,30,42,0.95)');
     swG.addColorStop(1,'rgba(32,35,48,0.98)');
     ctx.fillStyle=swG; ctx.fillRect(0,HORIZON_Y,W,SIDEWALK_Y-HORIZON_Y);
     /* Route asphaltée */
     const rdG=ctx.createLinearGradient(0,SIDEWALK_Y,0,H);
     rdG.addColorStop(0,'rgba(18,20,30,0.98)');
     rdG.addColorStop(1,'rgba(12,14,22,0.98)');
     ctx.fillStyle=rdG; ctx.fillRect(0,SIDEWALK_Y,W,H-SIDEWALK_Y);
     /* Bordure trottoir */
     ctx.fillStyle='rgba(42,46,62,0.95)';
     ctx.fillRect(0,SIDEWALK_Y,W,H*0.008);
     /* Ligne médiane pointillée */
     ctx.strokeStyle='rgba(200,170,50,0.28)';ctx.lineWidth=1.5;
     ctx.setLineDash([W*0.045,W*0.055]);
     ctx.beginPath();ctx.moveTo(0,ROAD_Y+H*0.038);ctx.lineTo(W,ROAD_Y+H*0.038);ctx.stroke();
     ctx.setLineDash([]);

     /* ── HALOS DES LAMPADAIRES sur la chaussée ── */
     for(const lp of lamps){
      const cG=ctx.createRadialGradient(lp.x,SIDEWALK_Y,0,lp.x,SIDEWALK_Y,W*0.22);
      cG.addColorStop(0,'rgba(255,195,60,0.22)');
      cG.addColorStop(0.45,'rgba(200,145,30,0.09)');
      cG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cG; ctx.fillRect(lp.x-W*0.22,SIDEWALK_Y-H*0.05,W*0.44,H*0.22);
     }

     /* ── POTEAUX LAMPADAIRES ── */
     for(const lp of lamps){
      /* Poteau */
      ctx.strokeStyle='rgba(48,52,70,0.92)';ctx.lineWidth=W*0.006;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(lp.x,SIDEWALK_Y);ctx.lineTo(lp.x,SIDEWALK_Y-H*0.16);ctx.stroke();
      /* Bras horizontal */
      ctx.beginPath();ctx.moveTo(lp.x,SIDEWALK_Y-H*0.16);ctx.lineTo(lp.x+W*0.035,SIDEWALK_Y-H*0.175);ctx.stroke();
      /* Ampoule */
      const bG=ctx.createRadialGradient(lp.x+W*0.035,SIDEWALK_Y-H*0.178,0,lp.x+W*0.035,SIDEWALK_Y-H*0.178,W*0.018);
      bG.addColorStop(0,'rgba(255,230,120,1)');bG.addColorStop(1,'rgba(255,170,30,0)');
      ctx.fillStyle=bG;
      ctx.beginPath();ctx.arc(lp.x+W*0.035,SIDEWALK_Y-H*0.178,W*0.010,0,Math.PI*2);ctx.fill();
     }

     /* ══ MACHINE À ÉTATS ══ */
     /* Distance voiture → groupe */
     const carDist = car.x - guys[0].x;

     if(sceneState==='WALK'){
      if(carDist < W*0.55){ sceneState='ALERT'; alertTimer=0; }
     } else if(sceneState==='ALERT'){
      alertTimer++;
      if(alertTimer > 40) sceneState='RUN'; /* ~0.65s de réaction */
     }

     const runFactor = sceneState==='WALK' ? 0 :
                       sceneState==='ALERT' ? Math.min(1, alertTimer/40) : 1;

     /* Cadence et vitesse selon l'état */
     const cadence = 0.055 + runFactor * 0.245;  /* 0.055 marche → 0.30 sprint */
     const walkSpd = W * (0.0010 + runFactor * 0.0042);

     /* ── PERSONNAGES ── */
     const personSize = H * 0.058; /* taille correcte — pas trop grande */
     for(const g of guys){
      g.ph  += cadence;
      g.x   -= walkSpd;
      /* Les personnages disparaissent à gauche et ne reviennent qu'au reset global */
      drawGuy(g.x, g.ph, runFactor, personSize);
     }

     /* ── VOITURE ── */
     /* La voiture accélère légèrement quand les persos courent */
     const carSpd = W*(0.0045 + runFactor*0.0025);
     car.x -= carSpd;
     if(car.x < -W*0.25){
      car.x = W*1.40;
      /* Réinitialiser la scène */
      sceneState='WALK'; alertTimer=0;
      guys.forEach((g,i)=>{ g.x=W*(0.52+i*0.10); });
     }

     /* Tirs uniquement en phase RUN */
     if(sceneState==='RUN'){
      car.shotTimer++;
      if(car.shotTimer >= car.nextShot){
       car.shotTimer=0; car.nextShot=60+Math.random()*90;
       car.flash=1.0;
       car.flashAngle=-Math.PI*0.62-Math.random()*0.25;
      }
     }
     if(car.flash>0) car.flash=Math.max(0,car.flash-0.09);

     drawCar(car);
     drawFlash(car);

     /* ── VIGNETTE ── */
     const vig=ctx.createRadialGradient(cx,H*0.58,H*0.10,cx,H*0.58,H*0.78);
     vig.addColorStop(0,'rgba(0,0,0,0)');
     vig.addColorStop(0.55,'rgba(0,0,0,0.10)');
     vig.addColorStop(1,'rgba(0,0,0,0.68)');
     ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
