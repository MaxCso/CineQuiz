// CinéQuiz splash chunk — WALL·E
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["WALL·E"]={
   name:'WALL·E',
   color:'20,80,200',
   ref:'WALL\u00b7E \u2014 Andrew Stanton, 2008',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    let _weS=document.getElementById('_we_s');
    if(!_weS){_weS=document.createElement('style');_weS.id='_we_s';document.head.appendChild(_weS);}
    _weS.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _weW=setInterval(()=>{if(stop.v){_weS.textContent='';clearInterval(_weW);}},200);

    /* ── Étoiles — 3 couches de profondeur ── */
    const stars=Array.from({length:160},(_,i)=>({
     x:Math.random()*W, y:Math.random()*H,
     r:i<100?Math.random()*0.8+0.2 : Math.random()*1.4+0.6,
     op:Math.random()*0.5+0.15,
     phase:Math.random()*Math.PI*2,
     twinkle:Math.random()*0.018+0.006
    }));

    /* ── Terre en arrière-plan — grande sphère floue bas-gauche ── */
    const earthX=W*0.18, earthY=H*0.82, earthR=W*0.35;

    /* ── WALL-E : position et dérive lente ── */
    const walle={
     x:cx, y:H*0.52,
     /* dérive douce et irrégulière */
     driftX:0, driftY:0,
     /* légère rotation globale du robot */
     tilt:0, tiltSpd:0.0006,
     /* battement des yeux */
     blinkTimer:0, blinkDur:0, isBlinking:false
    };

    function drawWalle(x,y,tilt){
     ctx.save();
     ctx.translate(x,y);
     ctx.rotate(tilt);
     const sc=W*0.0018; // taille relative à l'écran
     ctx.scale(sc,sc);

     /* ── Chenilles (bas) ── */
     ctx.fillStyle='rgba(85,72,48,0.92)';
     ctx.beginPath();ctx.roundRect(-38,28,76,18,6);ctx.fill();
     ctx.strokeStyle='rgba(50,40,28,0.7)';ctx.lineWidth=1.5;
     ctx.beginPath();ctx.roundRect(-38,28,76,18,6);ctx.stroke();
     /* roues */
     [-28,0,28].forEach(ox=>{
      ctx.fillStyle='rgba(60,52,35,0.9)';
      ctx.beginPath();ctx.arc(ox,37,7,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(90,78,52,0.6)';
      ctx.beginPath();ctx.arc(ox,37,3,0,Math.PI*2);ctx.fill();
     });

     /* ── Corps principal ── */
     ctx.fillStyle='rgba(175,148,88,0.95)';
     ctx.beginPath();ctx.roundRect(-30,-10,60,40,5);ctx.fill();
     ctx.strokeStyle='rgba(120,100,58,0.6)';ctx.lineWidth=1.5;
     ctx.beginPath();ctx.roundRect(-30,-10,60,40,5);ctx.stroke();
     /* détails corps */
     ctx.strokeStyle='rgba(100,85,48,0.4)';ctx.lineWidth=1;
     ctx.beginPath();ctx.moveTo(-30,10);ctx.lineTo(30,10);ctx.stroke();

     /* ── Tête ── */
     ctx.fillStyle='rgba(188,162,98,0.97)';
     ctx.beginPath();ctx.roundRect(-26,-46,52,38,7);ctx.fill();
     ctx.strokeStyle='rgba(130,108,62,0.55)';ctx.lineWidth=1.5;
     ctx.beginPath();ctx.roundRect(-26,-46,52,38,7);ctx.stroke();

     /* ── Yeux (expression clé du personnage) ── */
     const eyeOpenL=walle.isBlinking?0.05:1;
     const eyeOpenR=walle.isBlinking?0.05:1;
     /* boitier oeil gauche */
     ctx.fillStyle='rgba(40,35,22,0.95)';
     ctx.beginPath();ctx.roundRect(-22,-42,18,28,4);ctx.fill();
     /* boitier oeil droit */
     ctx.beginPath();ctx.roundRect(4,-42,18,28,4);ctx.fill();
     /* lentille oeil gauche */
     ctx.save();ctx.beginPath();ctx.roundRect(-22,-42,18,28,4);ctx.clip();
     const eg1=ctx.createRadialGradient(-13,-28,0,-13,-28,9);
     eg1.addColorStop(0,`rgba(200,220,255,${0.92*eyeOpenL})`);
     eg1.addColorStop(0.5,`rgba(140,180,255,${0.75*eyeOpenL})`);
     eg1.addColorStop(1,`rgba(60,100,200,${0.4*eyeOpenL})`);
     ctx.fillStyle=eg1;ctx.fillRect(-22,-42,18,28);
     /* pupille */
     ctx.fillStyle=`rgba(15,12,8,${0.9*eyeOpenL})`;
     ctx.beginPath();ctx.arc(-13,-28,4,0,Math.PI*2);ctx.fill();
     /* reflet */
     ctx.fillStyle=`rgba(255,255,255,${0.8*eyeOpenL})`;
     ctx.beginPath();ctx.arc(-16,-32,2,0,Math.PI*2);ctx.fill();
     ctx.restore();
     /* lentille oeil droit */
     ctx.save();ctx.beginPath();ctx.roundRect(4,-42,18,28,4);ctx.clip();
     const eg2=ctx.createRadialGradient(13,-28,0,13,-28,9);
     eg2.addColorStop(0,`rgba(200,220,255,${0.92*eyeOpenR})`);
     eg2.addColorStop(0.5,`rgba(140,180,255,${0.75*eyeOpenR})`);
     eg2.addColorStop(1,`rgba(60,100,200,${0.4*eyeOpenR})`);
     ctx.fillStyle=eg2;ctx.fillRect(4,-42,18,28);
     ctx.fillStyle=`rgba(15,12,8,${0.9*eyeOpenR})`;
     ctx.beginPath();ctx.arc(13,-28,4,0,Math.PI*2);ctx.fill();
     ctx.fillStyle=`rgba(255,255,255,${0.8*eyeOpenR})`;
     ctx.beginPath();ctx.arc(10,-32,2,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* ── Petits bras repliés ── */
     ctx.strokeStyle='rgba(155,132,78,0.85)';ctx.lineWidth=5;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-30,5);ctx.lineTo(-44,16);ctx.stroke();
     ctx.beginPath();ctx.moveTo(30,5);ctx.lineTo(44,16);ctx.stroke();
     /* mains */
     ctx.fillStyle='rgba(130,108,62,0.88)';
     ctx.beginPath();ctx.arc(-44,16,5,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(44,16,5,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Trail — noir espace profond */
     ctx.fillStyle='rgba(1,1,6,0.25)';ctx.fillRect(0,0,W,H);

     /* ── Terre — rendu réaliste ── */
     ctx.save();
     /* Clip à la sphère */
     ctx.beginPath();ctx.arc(earthX,earthY,earthR,0,Math.PI*2);ctx.clip();

     /* Fond océan — dégradé bleu profond */
     const oceanG=ctx.createRadialGradient(earthX-earthR*0.3,earthY-earthR*0.35,earthR*0.05,earthX,earthY,earthR);
     oceanG.addColorStop(0,'rgba(30,100,200,0.95)');
     oceanG.addColorStop(0.35,'rgba(18,72,165,0.97)');
     oceanG.addColorStop(0.7,'rgba(10,45,120,0.98)');
     oceanG.addColorStop(1,'rgba(4,18,60,1)');
     ctx.fillStyle=oceanG;ctx.fillRect(earthX-earthR,earthY-earthR,earthR*2,earthR*2);

     /* Continents — formes simplifiées tournant lentement */
     const cr=t*0.008; /* rotation continue des continents */
     ctx.fillStyle='rgba(55,140,50,0.85)';
     /* Amérique du Nord / du Sud */
     ctx.save();ctx.translate(earthX,earthY);ctx.rotate(cr);
     ctx.beginPath();
     ctx.ellipse(-earthR*0.28,-earthR*0.22,earthR*0.20,earthR*0.30,0.3,0,Math.PI*2);ctx.fill();
     ctx.beginPath();
     ctx.ellipse(-earthR*0.22,earthR*0.15,earthR*0.12,earthR*0.22,-0.2,0,Math.PI*2);ctx.fill();
     /* Europe / Afrique */
     ctx.fillStyle='rgba(62,155,55,0.82)';
     ctx.beginPath();
     ctx.ellipse(earthR*0.08,-earthR*0.18,earthR*0.12,earthR*0.14,0.15,0,Math.PI*2);ctx.fill();
     ctx.beginPath();
     ctx.ellipse(earthR*0.10,earthR*0.10,earthR*0.13,earthR*0.25,-0.1,0,Math.PI*2);ctx.fill();
     /* Asie */
     ctx.fillStyle='rgba(70,160,58,0.80)';
     ctx.beginPath();
     ctx.ellipse(earthR*0.35,-earthR*0.10,earthR*0.28,earthR*0.22,0.25,0,Math.PI*2);ctx.fill();
     /* Australie */
     ctx.fillStyle='rgba(180,140,55,0.72)';
     ctx.beginPath();
     ctx.ellipse(earthR*0.40,earthR*0.30,earthR*0.10,earthR*0.08,0.2,0,Math.PI*2);ctx.fill();
     /* Antarctique */
     ctx.fillStyle='rgba(220,230,240,0.65)';
     ctx.beginPath();
     ctx.ellipse(0,earthR*0.78,earthR*0.38,earthR*0.14,0,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* Nuages — plusieurs couches qui dérivent */
     ctx.fillStyle='rgba(240,245,255,0.22)';
     ctx.beginPath();ctx.ellipse(earthX+earthR*(0.05+Math.sin(t*0.04)*0.15),earthY-earthR*0.30,earthR*0.32,earthR*0.09,0.4,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(240,245,255,0.18)';
     ctx.beginPath();ctx.ellipse(earthX-earthR*(0.20+Math.sin(t*0.05)*0.12),earthY-earthR*0.05,earthR*0.25,earthR*0.07,-0.2,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(240,245,255,0.15)';
     ctx.beginPath();ctx.ellipse(earthX+earthR*(0.10+Math.sin(t*0.03)*0.10),earthY+earthR*0.25,earthR*0.28,earthR*0.08,0.3,0,Math.PI*2);ctx.fill();
     /* Calotte polaire nord */
     ctx.fillStyle='rgba(230,240,255,0.45)';
     ctx.beginPath();ctx.ellipse(earthX,earthY-earthR*0.75,earthR*0.28,earthR*0.16,0,0,Math.PI*2);ctx.fill();

     ctx.restore(); /* fin du clip sphère */

     /* ── Terminateur (ligne jour/nuit) ── */
     const termG=ctx.createRadialGradient(earthX+earthR*0.38,earthY,earthR*0.05,earthX+earthR*0.45,earthY,earthR*1.05);
     termG.addColorStop(0,'rgba(0,0,0,0)');
     termG.addColorStop(0.55,'rgba(0,0,0,0)');
     termG.addColorStop(0.72,'rgba(0,0,20,0.45)');
     termG.addColorStop(0.88,'rgba(0,0,10,0.72)');
     termG.addColorStop(1,'rgba(0,0,5,0.88)');
     ctx.fillStyle=termG;ctx.beginPath();ctx.arc(earthX,earthY,earthR,0,Math.PI*2);ctx.fill();

     /* ── Atmosphère — halo bleu lumineux autour ── */
     const atm2=ctx.createRadialGradient(earthX,earthY,earthR*0.90,earthX,earthY,earthR*1.18);
     atm2.addColorStop(0,'rgba(80,160,255,0.28)');
     atm2.addColorStop(0.35,'rgba(60,130,230,0.14)');
     atm2.addColorStop(0.65,'rgba(40,90,200,0.06)');
     atm2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=atm2;ctx.beginPath();ctx.arc(earthX,earthY,earthR*1.18,0,Math.PI*2);ctx.fill();

     /* Reflet lumière solaire sur l'atmosphère */
     const sunRef=ctx.createRadialGradient(earthX-earthR*0.42,earthY-earthR*0.42,0,earthX-earthR*0.38,earthY-earthR*0.38,earthR*0.55);
     sunRef.addColorStop(0,'rgba(180,220,255,0.22)');
     sunRef.addColorStop(0.4,'rgba(120,180,255,0.08)');
     sunRef.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunRef;ctx.beginPath();ctx.arc(earthX,earthY,earthR,0,Math.PI*2);ctx.fill();

     /* ── Étoiles ── */
     for(const s of stars){
      const pulse=1+Math.sin(t*s.twinkle*60+s.phase)*0.18;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*pulse,0,Math.PI*2);
      ctx.fillStyle=`rgba(235,228,210,${s.op*pulse})`;ctx.fill();
     }

     /* ── Dérive de WALL-E — vitesse augmentée ── */
     walle.driftX=Math.sin(t*0.42)*W*0.072+Math.sin(t*0.27)*W*0.032;
     walle.driftY=Math.cos(t*0.34)*H*0.052+Math.cos(t*0.21)*H*0.026;
     walle.tilt=Math.sin(t*0.38)*0.15;

     /* ── Clignement des yeux ── */
     walle.blinkTimer+=0.016;
     if(!walle.isBlinking && walle.blinkTimer>3.5+Math.random()*3){
      walle.isBlinking=true; walle.blinkDur=0; walle.blinkTimer=0;
     }
     if(walle.isBlinking){
      walle.blinkDur+=0.016;
      if(walle.blinkDur>0.18){walle.isBlinking=false;}
     }

     /* ── WALL-E ── */
     drawWalle(walle.x+walle.driftX, walle.y+walle.driftY, walle.tilt);

     /* ── Vignette espace ── */
     const vg=ctx.createRadialGradient(W/2,H/2,H*0.18,W/2,H/2,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.6,'rgba(0,0,4,0.15)');
     vg.addColorStop(1,'rgba(0,0,8,0.78)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
