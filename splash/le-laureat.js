// CinéQuiz splash chunk — Le Lauréat
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Lauréat"]={
   name:'Le Laur\u00e9at',
   color:'80,120,60',
   ref:'The Graduate \u2014 Mike Nichols, 1967',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_laur_s');
    if(!_s){_s=document.createElement('style');_s.id='_laur_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-film-ref-bottom,#splash-film-ref,#splash-film-ref *{color:#000000!important;-webkit-text-fill-color:#000000!important;text-shadow:none!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Zones ── */
    const TILE_H  = H*0.10;   /* carrelage bord piscine en haut */
    const POOL_TOP = TILE_H;   /* surface eau commence ici */

    /* ── Reflets ondulants sur le fond de la piscine ── */
    const caustics = Array.from({length:22},(_,i)=>({
     x: Math.random()*W,
     y: POOL_TOP + Math.random()*(H-POOL_TOP),
     rx: W*(0.04+Math.random()*0.10),
     ry: H*(0.008+Math.random()*0.020),
     ph: Math.random()*Math.PI*2,
     spd: 0.018+Math.random()*0.025,
     rot: Math.random()*Math.PI,
     rotSpd:(Math.random()-0.5)*0.008,
    }));

    /* ── Vagues de piscine — plusieurs couches ── */
    const WAVE_LAYERS=[
     {y0:POOL_TOP+H*0.000,amp:H*0.004,freq:0.018,spd:0.012,col:[20, 130,185],op:0.60},
     {y0:POOL_TOP+H*0.055,amp:H*0.006,freq:0.015,spd:0.010,col:[18, 148,200],op:0.55},
     {y0:POOL_TOP+H*0.120,amp:H*0.008,freq:0.013,spd:0.014,col:[15, 162,210],op:0.52},
     {y0:POOL_TOP+H*0.200,amp:H*0.009,freq:0.011,spd:0.011,col:[12, 175,218],op:0.50},
     {y0:POOL_TOP+H*0.295,amp:H*0.010,freq:0.010,spd:0.013,col:[10, 185,222],op:0.48},
     {y0:POOL_TOP+H*0.405,amp:H*0.011,freq:0.009,spd:0.009,col:[ 8, 192,225],op:0.46},
     {y0:POOL_TOP+H*0.530,amp:H*0.012,freq:0.008,spd:0.012,col:[ 6, 198,228],op:0.44},
     {y0:POOL_TOP+H*0.665,amp:H*0.013,freq:0.007,spd:0.010,col:[ 4, 202,230],op:0.42},
    ];
    const wavePhases=WAVE_LAYERS.map(()=>Math.random()*Math.PI*2);

    /* ── Bulles qui montent — plus nombreuses, plus variées ── */
    const bubbles=Array.from({length:65},()=>({
     x: W*(0.05+Math.random()*0.90),
     y: POOL_TOP+H*0.20+Math.random()*(H*0.78),
     vy:-(0.18+Math.random()*0.55),
     r: W*(0.002+Math.random()*0.007),
     op: 0.15+Math.random()*0.35,
     ph: Math.random()*Math.PI*2,
     wx: (Math.random()-0.5)*0.22,
    }));

    /* ── Particules de lumière solaire dans l'eau ── */
    const sunMotes=Array.from({length:50},()=>({
     x: Math.random()*W,
     y: POOL_TOP+Math.random()*(H-POOL_TOP),
     vx:(Math.random()-0.5)*0.12,
     vy:-(0.02+Math.random()*0.06),
     r: W*(0.001+Math.random()*0.003),
     op: 0.08+Math.random()*0.18,
     ph: Math.random()*Math.PI*2,
     spd: 0.012+Math.random()*0.020,
    }));

    /* ── Scintillements de surface ── */
    const sparkles=Array.from({length:30},()=>({
     x: Math.random()*W,
     y: POOL_TOP+Math.random()*H*0.12,
     ph: Math.random()*Math.PI*2,
     spd: 0.04+Math.random()*0.08,
     r: W*(0.003+Math.random()*0.006),
     op: 0.4+Math.random()*0.5,
    }));

    /* ── Matelas pneumatique — forme et couleur années 60 ── */
    const RAFT_W = W*0.52;
    const RAFT_H = H*0.065;
    /* Benjamin flottant — paramètres */
    const BEN_X = cx + W*0.04;

    /* ── SVG Benjamin allongé ── */
    const benImg=new Image();
    benImg.src='images/Benjamin.svg';
    let benReady=false;
    benImg.onload=()=>{benReady=true;};

    /* ── Silhouette Mrs Robinson debout au bord — haut gauche ── */

    function drawTile(){
     /* Bande de carrelage blanc/beige en haut — bord de piscine */
     const tileG=ctx.createLinearGradient(0,0,0,TILE_H);
     tileG.addColorStop(0,'rgba(235,225,205,1.0)');
     tileG.addColorStop(0.55,'rgba(220,210,188,1.0)');
     tileG.addColorStop(1,'rgba(200,190,168,1.0)');
     ctx.fillStyle=tileG;ctx.fillRect(0,0,W,TILE_H);
     /* Joints horizontaux */
     ctx.strokeStyle='rgba(170,160,140,0.55)';ctx.lineWidth=0.8;
     for(let row=1;row<=2;row++){
      ctx.beginPath();ctx.moveTo(0,TILE_H*(row/3));ctx.lineTo(W,TILE_H*(row/3));ctx.stroke();
     }
     /* Joints verticaux — décalés en brique */
     for(let row=0;row<3;row++){
      const tileW=W/7;
      const off=row%2===0?0:tileW/2;
      for(let col=0;col<9;col++){
       ctx.beginPath();ctx.moveTo(off+col*tileW,TILE_H*(row/3));ctx.lineTo(off+col*tileW,TILE_H*((row+1)/3));ctx.stroke();
      }
     }
     /* Tranche du bord — rebord arrondi */
     const edgeG=ctx.createLinearGradient(0,TILE_H-H*0.010,0,TILE_H+H*0.012);
     edgeG.addColorStop(0,'rgba(200,195,178,1.0)');
     edgeG.addColorStop(0.50,'rgba(160,155,135,0.90)');
     edgeG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=edgeG;ctx.fillRect(0,TILE_H-H*0.008,W,H*0.022);
     /* Ombre de la terrasse sur l'eau */
     const shadowG=ctx.createLinearGradient(0,POOL_TOP,0,POOL_TOP+H*0.06);
     shadowG.addColorStop(0,'rgba(0,40,70,0.35)');
     shadowG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shadowG;ctx.fillRect(0,POOL_TOP,W,H*0.06);
    }

    function drawPool(){
     /* Fond de piscine — bleu californien ensoleillé */
     const poolG=ctx.createLinearGradient(0,POOL_TOP,0,H);
     poolG.addColorStop(0.00,'#1a9fcc');
     poolG.addColorStop(0.20,'#1595c0');
     poolG.addColorStop(0.45,'#1088b0');
     poolG.addColorStop(0.72,'#0a7898');
     poolG.addColorStop(1.00,'#065f80');
     ctx.fillStyle=poolG;ctx.fillRect(0,POOL_TOP,W,H-POOL_TOP);

     /* Carrelage du fond — grille subtile */
     ctx.strokeStyle='rgba(0,80,120,0.12)';ctx.lineWidth=0.5;
     const tW=W/8,tH=H/10;
     for(let c=0;c<=8;c++){ctx.beginPath();ctx.moveTo(c*tW,POOL_TOP);ctx.lineTo(c*tW,H);ctx.stroke();}
     for(let r=0;r<=10;r++){ctx.beginPath();ctx.moveTo(0,POOL_TOP+r*tH);ctx.lineTo(W,POOL_TOP+r*tH);ctx.stroke();}

     /* Lumiere du soleil — rayon diagonal depuis le haut droit */
     const sunBeam=ctx.createLinearGradient(W*0.60,POOL_TOP,W*0.30,H*0.50);
     sunBeam.addColorStop(0,`rgba(255,240,180,${0.14+Math.sin(t*0.5)*0.04})`);
     sunBeam.addColorStop(0.40,`rgba(200,230,255,${0.07+Math.sin(t*0.4)*0.03})`);
     sunBeam.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunBeam;ctx.fillRect(0,POOL_TOP,W,H-POOL_TOP);

     /* Reflets caustiques ondulants */
     for(const c of caustics){
      c.ph+=c.spd;c.rot+=c.rotSpd;
      const alpha=(0.06+Math.abs(Math.sin(c.ph))*0.10);
      ctx.save();
      ctx.translate(c.x,c.y);ctx.rotate(c.rot);
      const cg=ctx.createRadialGradient(0,0,0,0,0,c.rx);
      cg.addColorStop(0,`rgba(255,255,255,${alpha})`);
      cg.addColorStop(0.5,`rgba(200,240,255,${alpha*0.5})`);
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;
      ctx.scale(1,c.ry/c.rx);
      ctx.beginPath();ctx.arc(0,0,c.rx,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* Vagues de surface */
     for(let wi=0;wi<WAVE_LAYERS.length;wi++){
      const wl=WAVE_LAYERS[wi];
      wavePhases[wi]+=wl.spd;
      const [r,g,b]=wl.col;
      ctx.fillStyle=`rgba(${r},${g},${b},${wl.op})`;
      ctx.beginPath();ctx.moveTo(0,wl.y0);
      for(let x=0;x<=W;x+=5){
       const y=wl.y0+Math.sin(wavePhases[wi]+x*wl.freq)*wl.amp+Math.sin(wavePhases[wi]*0.7+x*wl.freq*1.6)*wl.amp*0.4;
       ctx.lineTo(x,y);
      }
      ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
     }

     /* Bulles montantes */
     for(const b of bubbles){
      b.y+=b.vy;b.x+=b.wx;b.ph+=0.03;
      if(b.y<POOL_TOP-b.r*2){b.y=H*0.70+Math.random()*H*0.28;b.x=W*(0.10+Math.random()*0.80);}
      const ba=b.op*(0.45+0.55*Math.abs(Math.sin(b.ph)));
      ctx.strokeStyle=`rgba(200,240,255,${ba})`;ctx.lineWidth=0.9;
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.stroke();
      /* Reflet interne */
      ctx.fillStyle=`rgba(255,255,255,${ba*0.35})`;
      ctx.beginPath();ctx.arc(b.x-b.r*0.28,b.y-b.r*0.28,b.r*0.35,0,Math.PI*2);ctx.fill();
     }
    }

    function drawRaft(){
     /* Position avec légère oscillation */
     const raftY=POOL_TOP+H*0.42+Math.sin(t*0.55)*H*0.008;
     const tiltR=Math.sin(t*0.42)*0.025;

     ctx.save();ctx.translate(BEN_X,raftY);ctx.rotate(tiltR);

     /* Ombre du matelas dans l'eau */
     ctx.fillStyle='rgba(0,50,90,0.22)';
     ctx.beginPath();ctx.ellipse(W*0.01,RAFT_H*0.8,RAFT_W*0.48,RAFT_H*0.25,0,0,Math.PI*2);ctx.fill();

     /* Matelas pneumatique — jaune/or années 60 */
     const raftG=ctx.createLinearGradient(-RAFT_W/2,-RAFT_H/2,RAFT_W/2,RAFT_H/2);
     raftG.addColorStop(0,'rgba(255,215,60,0.96)');
     raftG.addColorStop(0.40,'rgba(240,190,30,0.95)');
     raftG.addColorStop(0.75,'rgba(220,165,15,0.95)');
     raftG.addColorStop(1,'rgba(200,145,10,0.94)');
     ctx.fillStyle=raftG;
     ctx.beginPath();ctx.ellipse(0,0,RAFT_W/2,RAFT_H/2,0,0,Math.PI*2);ctx.fill();
     /* Reflet sur le matelas */
     ctx.fillStyle='rgba(255,245,180,0.30)';
     ctx.beginPath();ctx.ellipse(-RAFT_W*0.08,-RAFT_H*0.22,RAFT_W*0.28,RAFT_H*0.16,0,0,Math.PI*2);ctx.fill();
     /* Rayure centrale — style matelas vintage */
     ctx.strokeStyle='rgba(200,140,0,0.40)';ctx.lineWidth=H*0.006;
     ctx.beginPath();ctx.moveTo(-RAFT_W*0.45,0);ctx.lineTo(RAFT_W*0.45,0);ctx.stroke();
     /* Bord gonflé */
     ctx.strokeStyle='rgba(255,220,80,0.55)';ctx.lineWidth=H*0.008;
     ctx.beginPath();ctx.ellipse(0,0,RAFT_W/2,RAFT_H/2,0,0,Math.PI*2);ctx.stroke();

     /* Benjamin allongé — SVG */
     const bob=Math.sin(t*0.55)*H*0.004;
     /* SVG ratio 600×96 — on scale à la largeur du matelas */
     const benW=RAFT_W*1.05;
     const benH=benW*(96/600);
     if(benReady){
      ctx.drawImage(benImg, -benW*0.48, bob-RAFT_H*0.55-benH*0.65, benW, benH);
     }

     ctx.restore();
    }

    function drawMrsRobinson(){
     /* Silhouette Mrs Robinson debout au bord de la piscine — bord gauche */
     const mrX=W*0.14;
     const mrY=TILE_H*0.88; /* pieds sur le carrelage */
     const sc=0.85;
     ctx.fillStyle='rgba(22,14,8,0.97)';
     /* Tête */
     ctx.beginPath();ctx.arc(mrX,mrY-H*0.170*sc,W*0.021*sc,0,Math.PI*2);ctx.fill();
     /* Corps — robe ajustée */
     ctx.beginPath();
     ctx.moveTo(mrX-W*0.016*sc, mrY-H*0.140*sc);
     ctx.bezierCurveTo(mrX-W*0.022*sc,mrY-H*0.085*sc, mrX-W*0.028*sc,mrY-H*0.042*sc, mrX-W*0.018*sc,mrY);
     ctx.lineTo(mrX+W*0.018*sc,mrY);
     ctx.bezierCurveTo(mrX+W*0.028*sc,mrY-H*0.042*sc, mrX+W*0.022*sc,mrY-H*0.085*sc, mrX+W*0.016*sc,mrY-H*0.140*sc);
     ctx.closePath();ctx.fill();
     /* Bras posé sur la hanche */
     ctx.strokeStyle='rgba(22,14,8,0.97)';ctx.lineWidth=W*0.011*sc;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(mrX+W*0.018*sc,mrY-H*0.115*sc);
     ctx.quadraticCurveTo(mrX+W*0.040*sc,mrY-H*0.090*sc, mrX+W*0.034*sc,mrY-H*0.062*sc);
     ctx.stroke();
     /* Jambes avec talons */
     ctx.strokeStyle='rgba(22,14,8,0.97)';ctx.lineWidth=W*0.010*sc;
     ctx.beginPath();ctx.moveTo(mrX-W*0.008*sc,mrY);ctx.lineTo(mrX-W*0.010*sc,mrY+H*0.068*sc);ctx.stroke();
     ctx.beginPath();ctx.moveTo(mrX+W*0.008*sc,mrY);ctx.lineTo(mrX+W*0.010*sc,mrY+H*0.065*sc);ctx.stroke();
     /* Talons aiguilles */
     ctx.beginPath();ctx.moveTo(mrX-W*0.010*sc,mrY+H*0.068*sc);ctx.lineTo(mrX-W*0.022*sc,mrY+H*0.072*sc);ctx.stroke();
     ctx.beginPath();ctx.moveTo(mrX+W*0.010*sc,mrY+H*0.065*sc);ctx.lineTo(mrX+W*0.022*sc,mrY+H*0.069*sc);ctx.stroke();
    }

    function frame(){
     if(stop.v)return;

     drawPool();
     drawTile();

     /* ── Particules de lumière solaire flottant dans l'eau ── */
     for(const m of sunMotes){
      m.ph+=m.spd; m.x+=m.vx; m.y+=m.vy;
      if(m.y<POOL_TOP){m.y=H*0.85+Math.random()*H*0.12;m.x=Math.random()*W;}
      if(m.x<0)m.x=W; if(m.x>W)m.x=0;
      const pulse=0.35+0.65*Math.abs(Math.sin(m.ph));
      ctx.fillStyle=`rgba(255,245,180,${m.op*pulse})`;
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Scintillements de surface — petits éclats blancs ── */
     for(const sp of sparkles){
      sp.ph+=sp.spd;
      const pk=Math.pow(Math.max(0,Math.sin(sp.ph)),5);
      if(pk>0.1){
       ctx.save();ctx.globalAlpha=pk*sp.op;
       ctx.strokeStyle='rgba(255,255,255,0.9)';ctx.lineWidth=0.8;
       ctx.beginPath();ctx.moveTo(sp.x-sp.r*2,sp.y);ctx.lineTo(sp.x+sp.r*2,sp.y);ctx.stroke();
       ctx.beginPath();ctx.moveTo(sp.x,sp.y-sp.r*2);ctx.lineTo(sp.x,sp.y+sp.r*2);ctx.stroke();
       ctx.restore();
      }
     }

     drawRaft();
     drawMrsRobinson();

     /* Lumiere solaire californienne — halo chaud depuis le haut droit */
     const sunG=ctx.createRadialGradient(W*0.85,H*0.04,0,W*0.85,H*0.04,W*0.65);
     sunG.addColorStop(0,`rgba(255,230,120,${0.14+Math.sin(t*0.3)*0.04})`);
     sunG.addColorStop(0.30,'rgba(255,200,80,0.05)');
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H*0.35);

     /* Vignette tres legere */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.18,cx,H*0.50,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.70,'rgba(0,0,0,0.03)');
     vg.addColorStop(1,'rgba(0,0,0,0.38)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }

  };
})();
