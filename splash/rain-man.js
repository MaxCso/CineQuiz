// CinéQuiz splash chunk — Rain Man
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Rain Man"]={
   name:'Rain Man',
   color:'100,140,180',
   ref:'Rain Man \u2014 Barry Levinson, 1988',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_rm_s');
    if(!_s){_s=document.createElement('style');_s.id='_rm_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Horizon — géographie ── */
    const horizY=H*0.52;
    const sunY=horizY-H*0.06;

    /* ── Nuages dessinés en ellipses ── */
    const clouds=[
     {x:W*0.12,y:H*0.16,rx:W*0.18,ry:H*0.055,col:'rgba(200,80,30,0.75)'},
     {x:W*0.72,y:H*0.13,rx:W*0.22,ry:H*0.065,col:'rgba(180,60,20,0.70)'},
     {x:W*0.40,y:H*0.08,rx:W*0.15,ry:H*0.040,col:'rgba(160,50,18,0.60)'},
     {x:W*0.88,y:H*0.22,rx:W*0.14,ry:H*0.048,col:'rgba(190,70,25,0.65)'},
     {x:W*0.08,y:H*0.28,rx:W*0.12,ry:H*0.038,col:'rgba(150,45,15,0.55)'},
     {x:W*0.58,y:H*0.25,rx:W*0.16,ry:H*0.045,col:'rgba(170,55,20,0.58)'},
    ];

    /* ── Cartes qui voltigent — plus grandes, mieux éparpillées ── */
    const SUITS=['♥','♦','♣','♠'];
    const VALS=['3','4','6','7','K','A','8','J'];
    const cards=Array.from({length:12},(_,i)=>({
     x:W*(0.30+Math.random()*0.65),
     y:H*(0.28+Math.random()*0.25),
     vx:W*(0.0010+Math.random()*0.0014)*(Math.random()<0.3?-1:1),
     vy:-(H*(0.0003+Math.random()*0.0007)),
     rot:Math.random()*Math.PI*0.8-0.4,
     rotSpd:(Math.random()-0.5)*0.016,
     w:W*0.075, h:W*0.105,
     suit:SUITS[i%4],
     val:VALS[i%8],
     red:i%4<2,
    }));

    /* ── Voiture Buick — avance vers le bas ── */
    let carScale=0.35;
    const carSpd=0.0008;
    const carY=H*0.66;

    function drawSun(){
     /* Soleil bas sur l'horizon — atmosphérique */
     /* Halo atmosphérique géant */
     const sa=ctx.createRadialGradient(cx,sunY,0,cx,sunY,W*0.55);
     sa.addColorStop(0,`rgba(255,230,120,${0.30+Math.sin(t*0.18)*0.04})`);
     sa.addColorStop(0.22,'rgba(255,170,60,0.14)');
     sa.addColorStop(0.55,'rgba(220,100,20,0.05)');
     sa.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sa;ctx.fillRect(0,0,W,horizY+H*0.10);
     /* Colonne de lumière vers le sol */
     const col=ctx.createLinearGradient(cx,sunY,cx,H);
     col.addColorStop(0,`rgba(255,220,100,${0.12+Math.sin(t*0.22)*0.03})`);
     col.addColorStop(0.4,'rgba(255,180,60,0.05)');
     col.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=col;
     ctx.beginPath();ctx.moveTo(cx-W*0.15,sunY);ctx.lineTo(cx+W*0.15,sunY);
     ctx.lineTo(cx+W*0.42,H);ctx.lineTo(cx-W*0.42,H);ctx.closePath();ctx.fill();
     /* Couronne diffuse */
     const sc2=ctx.createRadialGradient(cx,sunY,W*0.09,cx,sunY,W*0.22);
     sc2.addColorStop(0,`rgba(255,210,80,${0.80+Math.sin(t*0.15)*0.08})`);
     sc2.addColorStop(0.40,'rgba(255,160,40,0.30)');
     sc2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sc2;ctx.beginPath();ctx.arc(cx,sunY,W*0.22,0,Math.PI*2);ctx.fill();
     /* Disque solaire dur */
     const sd=ctx.createRadialGradient(cx-W*0.02,sunY-W*0.02,0,cx,sunY,W*0.090);
     sd.addColorStop(0,'rgba(255,255,220,1)');
     sd.addColorStop(0.30,'rgba(255,248,190,1)');
     sd.addColorStop(0.65,'rgba(255,220,120,0.96)');
     sd.addColorStop(1,'rgba(255,180,60,0.80)');
     ctx.fillStyle=sd;ctx.beginPath();ctx.arc(cx,sunY,W*0.090,0,Math.PI*2);ctx.fill();
    }

    function drawRoad(){
     const rStart=horizY+H*0.002;
     /* ── Asphalte principal — gris bleuté avec reflet soleil ── */
     const roadG=ctx.createLinearGradient(0,rStart,0,H);
     roadG.addColorStop(0,'#2e3d52');
     roadG.addColorStop(0.18,'#283548');
     roadG.addColorStop(0.55,'#222e40');
     roadG.addColorStop(1,'#1a2535');
     ctx.fillStyle=roadG;
     ctx.beginPath();
     ctx.moveTo(cx-W*0.048,rStart);ctx.lineTo(cx+W*0.048,rStart);
     ctx.lineTo(cx+W*0.54,H);ctx.lineTo(cx-W*0.54,H);
     ctx.closePath();ctx.fill();

     /* Reflet du soleil sur la route — colonne centrale brillante */
     const reflG=ctx.createLinearGradient(0,rStart,0,H*0.72);
     reflG.addColorStop(0,`rgba(255,220,100,${0.18+Math.sin(t*0.22)*0.05})`);
     reflG.addColorStop(0.35,'rgba(255,200,80,0.06)');
     reflG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=reflG;
     ctx.beginPath();
     ctx.moveTo(cx-W*0.030,rStart);ctx.lineTo(cx+W*0.030,rStart);
     ctx.lineTo(cx+W*0.20,H*0.72);ctx.lineTo(cx-W*0.20,H*0.72);
     ctx.closePath();ctx.fill();

     /* Lignes blanches latérales — perspective + légère brillance */
     const lw=ctx.createLinearGradient(0,rStart,0,H);
     lw.addColorStop(0,'rgba(255,248,215,0.90)');
     lw.addColorStop(1,'rgba(220,210,180,0.55)');
     ctx.strokeStyle=lw;ctx.lineWidth=W*0.007;ctx.lineCap='butt';
     ctx.beginPath();ctx.moveTo(cx-W*0.048,rStart);ctx.lineTo(cx-W*0.52,H);ctx.stroke();
     ctx.beginPath();ctx.moveTo(cx+W*0.048,rStart);ctx.lineTo(cx+W*0.52,H);ctx.stroke();

     /* Bandes latérales herbeuses (accotement) */
     for(const side of [-1,1]){
      const sg2=ctx.createLinearGradient(0,rStart,0,H);
      sg2.addColorStop(0,'rgba(180,130,50,0.20)');
      sg2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg2;
      ctx.beginPath();
      if(side===-1){ctx.moveTo(cx-W*0.048,rStart);ctx.lineTo(cx-W*0.52,H);ctx.lineTo(0,H);ctx.lineTo(0,rStart);}
      else{ctx.moveTo(cx+W*0.048,rStart);ctx.lineTo(cx+W*0.52,H);ctx.lineTo(W,H);ctx.lineTo(W,rStart);}
      ctx.closePath();ctx.fill();
     }

     /* Ligne centrale jaune — tirets avec animation de défilement */
     const dashAnim=(t*18)%1;
     const dashTotal=10;
     for(let di=0;di<dashTotal;di++){
      const p0=(di+dashAnim)/dashTotal, p1=(di+dashAnim+0.42)/dashTotal;
      if(p0>1||p1<0)continue;
      const cp0=Math.min(1,Math.max(0,p0)), cp1=Math.min(1,Math.max(0,p1));
      const y0=rStart+(H-rStart)*cp0, y1=rStart+(H-rStart)*cp1;
      const w0=W*0.094*cp0, w1=W*0.094*cp1;
      const yg=ctx.createLinearGradient(0,y0,0,y1);
      yg.addColorStop(0,'rgba(240,200,60,0.90)');
      yg.addColorStop(1,'rgba(210,170,40,0.70)');
      ctx.fillStyle=yg;
      ctx.beginPath();
      ctx.moveTo(cx-w0/2,y0);ctx.lineTo(cx+w0/2,y0);
      ctx.lineTo(cx+w1/2,y1);ctx.lineTo(cx-w1/2,y1);
      ctx.closePath();ctx.fill();
     }
    }

    function drawDesert(){
     const rStart=horizY+H*0.002;
     /* ── Terrain désertique Nevada — teintes chaudes ── */
     /* Gauche */
     const dgl=ctx.createLinearGradient(0,rStart,0,H);
     dgl.addColorStop(0,'rgba(165,95,30,0.98)');
     dgl.addColorStop(0.30,'rgba(175,105,28,0.97)');
     dgl.addColorStop(0.65,'rgba(160,90,20,0.97)');
     dgl.addColorStop(1,'rgba(140,78,15,0.96)');
     ctx.fillStyle=dgl;
     ctx.beginPath();ctx.moveTo(0,rStart);ctx.lineTo(cx-W*0.048,rStart);
     ctx.lineTo(cx-W*0.52,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
     /* Droite */
     ctx.fillStyle=dgl;
     ctx.beginPath();ctx.moveTo(W,rStart);ctx.lineTo(cx+W*0.048,rStart);
     ctx.lineTo(cx+W*0.52,H);ctx.lineTo(W,H);ctx.closePath();ctx.fill();

     /* Lueur chaude au sol depuis le soleil */
     const sunGlow=ctx.createRadialGradient(cx,rStart,0,cx,rStart,W*0.55);
     sunGlow.addColorStop(0,`rgba(255,200,80,${0.20+Math.sin(t*0.18)*0.04})`);
     sunGlow.addColorStop(0.35,'rgba(230,140,40,0.08)');
     sunGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunGlow;ctx.fillRect(0,rStart,W,H-rStart);

     /* Herbes sèches — touffes stylisées sur les côtés */
     ctx.strokeStyle='rgba(100,65,10,0.55)';ctx.lineWidth=W*0.003;ctx.lineCap='round';
     const grassPositions=[
      {x:W*0.06,y:H*0.68},{x:W*0.12,y:H*0.75},{x:W*0.04,y:H*0.82},
      {x:W*0.88,y:H*0.70},{x:W*0.94,y:H*0.77},{x:W*0.84,y:H*0.85},
      {x:W*0.18,y:H*0.88},{x:W*0.80,y:H*0.90},
     ];
     for(const g of grassPositions){
      const gh=H*(0.018+Math.sin(g.x)*0.008);
      for(let b=0;b<4;b++){
       const ba=(b-1.5)*0.22+Math.sin(t*0.8+g.x)*0.04;
       ctx.beginPath();ctx.moveTo(g.x,g.y);ctx.lineTo(g.x+Math.sin(ba)*gh,g.y-gh*Math.cos(ba*0.4));ctx.stroke();
      }
     }

     /* Grain sableux subtil */
     for(let i=0;i<30;i++){
      const gx=Math.random()*W, gy=rStart+Math.random()*(H-rStart);
      const inRoad=gx>cx-W*0.54*(gy-rStart)/(H-rStart) && gx<cx+W*0.54*(gy-rStart)/(H-rStart);
      if(inRoad)continue;
      ctx.fillStyle=`rgba(200,140,50,${Math.random()*0.08})`;
      ctx.beginPath();ctx.arc(gx,gy,Math.random()*2+0.5,0,Math.PI*2);ctx.fill();
     }
    }

    function drawCar(sc){
     const cw=W*0.62*sc, ch=cw*0.58;
     const carX=cx, cY=carY;

     /* Ombre portée au sol */
     ctx.fillStyle=`rgba(0,0,0,${0.28*sc})`;
     ctx.beginPath();ctx.ellipse(carX,cY+ch*0.18,cw*0.46,ch*0.08,0,0,Math.PI*2);ctx.fill();

     /* ── Carrosserie principale — crème/beige 1949 ── */
     ctx.save();
     /* Bas de caisse rectangulaire */
     const bodyLow=ctx.createLinearGradient(carX,cY-ch*0.04,carX,cY+ch*0.18);
     bodyLow.addColorStop(0,'rgba(228,210,168,0.97)');
     bodyLow.addColorStop(0.5,'rgba(210,192,150,0.97)');
     bodyLow.addColorStop(1,'rgba(185,165,122,0.96)');
     ctx.fillStyle=bodyLow;
     ctx.beginPath();ctx.roundRect(carX-cw*0.48,cY-ch*0.04,cw*0.96,ch*0.22,cw*0.025);ctx.fill();

     /* Toit arrondi — signature Buick */
     const roofG=ctx.createLinearGradient(carX-cw*0.30,cY-ch*0.60,carX+cw*0.10,cY-ch*0.02);
     roofG.addColorStop(0,'rgba(240,225,185,0.98)');
     roofG.addColorStop(0.30,'rgba(228,212,172,0.97)');
     roofG.addColorStop(0.65,'rgba(210,193,152,0.96)');
     roofG.addColorStop(1,'rgba(190,170,128,0.95)');
     ctx.fillStyle=roofG;
     ctx.beginPath();
     /* Forme avec toit bombé typique années 40 */
     ctx.moveTo(carX-cw*0.48,cY-ch*0.04);
     ctx.lineTo(carX-cw*0.48,cY-ch*0.22);
     ctx.bezierCurveTo(carX-cw*0.46,cY-ch*0.56,carX-cw*0.28,cY-ch*0.62,carX-cw*0.10,cY-ch*0.62);
     ctx.lineTo(carX+cw*0.10,cY-ch*0.62);
     ctx.bezierCurveTo(carX+cw*0.28,cY-ch*0.62,carX+cw*0.46,cY-ch*0.56,carX+cw*0.48,cY-ch*0.22);
     ctx.lineTo(carX+cw*0.48,cY-ch*0.04);
     ctx.closePath();ctx.fill();

     /* Coffre arrière — légèrement bombé */
     const trunkG=ctx.createLinearGradient(carX,cY-ch*0.06,carX,cY+ch*0.16);
     trunkG.addColorStop(0,'rgba(218,200,158,0.96)');
     trunkG.addColorStop(1,'rgba(195,175,132,0.95)');
     ctx.fillStyle=trunkG;
     ctx.beginPath();
     ctx.moveTo(carX-cw*0.44,cY-ch*0.04);
     ctx.bezierCurveTo(carX-cw*0.46,cY+ch*0.08,carX-cw*0.46,cY+ch*0.14,carX-cw*0.44,cY+ch*0.18);
     ctx.lineTo(carX+cw*0.44,cY+ch*0.18);
     ctx.bezierCurveTo(carX+cw*0.46,cY+ch*0.14,carX+cw*0.46,cY+ch*0.08,carX+cw*0.44,cY-ch*0.04);
     ctx.closePath();ctx.fill();
     ctx.restore();

     /* ── Pare-brise arrière ── */
     const windG=ctx.createLinearGradient(carX-cw*0.25,cY-ch*0.58,carX,cY-ch*0.20);
     windG.addColorStop(0,'rgba(80,110,150,0.45)');
     windG.addColorStop(1,'rgba(50,80,120,0.30)');
     ctx.fillStyle=windG;
     ctx.beginPath();
     ctx.moveTo(carX-cw*0.28,cY-ch*0.22);
     ctx.bezierCurveTo(carX-cw*0.26,cY-ch*0.58,carX-cw*0.08,cY-ch*0.60,carX,cY-ch*0.60);
     ctx.lineTo(carX,cY-ch*0.60);
     ctx.bezierCurveTo(carX+cw*0.08,cY-ch*0.60,carX+cw*0.26,cY-ch*0.58,carX+cw*0.28,cY-ch*0.22);
     ctx.closePath();ctx.fill();
     /* Reflet diagonal sur le pare-brise */
     ctx.fillStyle='rgba(255,245,200,0.10)';
     ctx.beginPath();
     ctx.moveTo(carX-cw*0.22,cY-ch*0.56);
     ctx.lineTo(carX-cw*0.08,cY-ch*0.56);
     ctx.lineTo(carX-cw*0.18,cY-ch*0.26);
     ctx.lineTo(carX-cw*0.28,cY-ch*0.28);
     ctx.closePath();ctx.fill();

     /* ── Montants de toit chromés ── */
     ctx.strokeStyle='rgba(200,195,180,0.60)';ctx.lineWidth=cw*0.012;
     ctx.beginPath();ctx.moveTo(carX-cw*0.28,cY-ch*0.22);ctx.lineTo(carX-cw*0.28,cY-ch*0.58);ctx.stroke();
     ctx.beginPath();ctx.moveTo(carX+cw*0.28,cY-ch*0.22);ctx.lineTo(carX+cw*0.28,cY-ch*0.58);ctx.stroke();

     /* ── Pare-chocs arrière chromé ── */
     const bumperG=ctx.createLinearGradient(carX-cw*0.50,cY+ch*0.12,carX-cw*0.50,cY+ch*0.22);
     bumperG.addColorStop(0,'rgba(225,225,218,0.96)');
     bumperG.addColorStop(0.30,'rgba(200,200,192,0.97)');
     bumperG.addColorStop(0.65,'rgba(175,175,168,0.95)');
     bumperG.addColorStop(1,'rgba(155,155,148,0.90)');
     ctx.fillStyle=bumperG;
     ctx.beginPath();ctx.roundRect(carX-cw*0.50,cY+ch*0.12,cw*1.00,ch*0.10,cw*0.018);ctx.fill();
     /* Reflet chrome */
     ctx.fillStyle='rgba(255,255,255,0.22)';
     ctx.beginPath();ctx.roundRect(carX-cw*0.46,cY+ch*0.13,cw*0.92,ch*0.025,cw*0.01);ctx.fill();
     /* Ligne sombre sous chrome */
     ctx.strokeStyle='rgba(100,95,88,0.45)';ctx.lineWidth=cw*0.008;
     ctx.beginPath();ctx.moveTo(carX-cw*0.50,cY+ch*0.22);ctx.lineTo(carX+cw*0.50,cY+ch*0.22);ctx.stroke();

     /* ── Feux arrière rouges ── */
     for(const side of [-1,1]){
      const tx=carX+side*cw*0.40;
      const ty=cY-ch*0.04;
      /* Corps du feu — vertical, allongé */
      const tg=ctx.createLinearGradient(tx-cw*0.05,ty,tx+cw*0.05,ty);
      tg.addColorStop(0,`rgba(180,20,15,0.92)`);
      tg.addColorStop(0.5,`rgba(220,30,20,0.96)`);
      tg.addColorStop(1,`rgba(170,15,10,0.90)`);
      ctx.fillStyle=tg;
      ctx.beginPath();ctx.roundRect(tx-cw*0.055,ty-ch*0.18,cw*0.10,ch*0.16,cw*0.018);ctx.fill();
      /* Liseré chrome */
      ctx.strokeStyle='rgba(200,195,185,0.75)';ctx.lineWidth=cw*0.010;
      ctx.beginPath();ctx.roundRect(tx-cw*0.055,ty-ch*0.18,cw*0.10,ch*0.16,cw*0.018);ctx.stroke();
      /* Lueur rouge */
      const rg=ctx.createRadialGradient(tx,ty-ch*0.10,0,tx,ty-ch*0.10,cw*0.12);
      rg.addColorStop(0,`rgba(255,50,30,${0.25+Math.sin(t*1.8+side)*0.06})`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;ctx.fillRect(tx-cw*0.12,ty-ch*0.22,cw*0.24,ch*0.24);
      /* Lignes internes feu */
      ctx.strokeStyle='rgba(140,15,10,0.55)';ctx.lineWidth=cw*0.005;
      for(let li=1;li<3;li++){
       ctx.beginPath();
       ctx.moveTo(tx-cw*0.04,ty-ch*0.18+li*ch*0.055);
       ctx.lineTo(tx+cw*0.04,ty-ch*0.18+li*ch*0.055);
       ctx.stroke();
      }
     }

     /* ── Baguette chromée latérale ── */
     ctx.strokeStyle='rgba(210,205,195,0.65)';ctx.lineWidth=cw*0.008;
     ctx.beginPath();
     ctx.moveTo(carX-cw*0.48,cY-ch*0.04);
     ctx.lineTo(carX+cw*0.48,cY-ch*0.04);
     ctx.stroke();

     /* ── Plaque d'immatriculation ── */
     ctx.fillStyle='rgba(235,232,220,0.90)';
     ctx.beginPath();ctx.roundRect(carX-cw*0.12,cY+ch*0.06,cw*0.24,ch*0.07,cw*0.012);ctx.fill();
     ctx.strokeStyle='rgba(180,165,130,0.70)';ctx.lineWidth=cw*0.006;
     ctx.beginPath();ctx.roundRect(carX-cw*0.12,cY+ch*0.06,cw*0.24,ch*0.07,cw*0.012);ctx.stroke();

     /* ── Roues ── */
     for(const wx of [carX-cw*0.40,carX+cw*0.40]){
      const wy=cY+ch*0.16;
      const wr=cw*0.16;
      /* Pneu */
      ctx.fillStyle='rgba(14,12,8,0.97)';
      ctx.beginPath();ctx.arc(wx,wy,wr,0,Math.PI*2);ctx.fill();
      /* Jante chromée */
      const jg=ctx.createRadialGradient(wx-wr*0.15,wy-wr*0.15,wr*0.05,wx,wy,wr*0.80);
      jg.addColorStop(0,'rgba(218,215,205,0.95)');
      jg.addColorStop(0.45,'rgba(185,180,170,0.90)');
      jg.addColorStop(0.80,'rgba(155,150,140,0.85)');
      jg.addColorStop(1,'rgba(120,115,105,0.80)');
      ctx.fillStyle=jg;
      ctx.beginPath();ctx.arc(wx,wy,wr*0.75,0,Math.PI*2);ctx.fill();
      /* Rayons */
      ctx.strokeStyle='rgba(160,155,145,0.60)';ctx.lineWidth=cw*0.014;
      for(let ri=0;ri<6;ri++){
       const ra=(ri/6)*Math.PI*2;
       ctx.beginPath();
       ctx.moveTo(wx+Math.cos(ra)*wr*0.18,wy+Math.sin(ra)*wr*0.18);
       ctx.lineTo(wx+Math.cos(ra)*wr*0.68,wy+Math.sin(ra)*wr*0.68);
       ctx.stroke();
      }
      /* Moyeu */
      const hg=ctx.createRadialGradient(wx-wr*0.06,wy-wr*0.06,0,wx,wy,wr*0.20);
      hg.addColorStop(0,'rgba(235,230,220,0.95)');
      hg.addColorStop(1,'rgba(185,180,170,0.88)');
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(wx,wy,wr*0.20,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(140,135,125,0.70)';ctx.lineWidth=cw*0.008;
      ctx.beginPath();ctx.arc(wx,wy,wr*0.20,0,Math.PI*2);ctx.stroke();
      /* Centre */
      ctx.fillStyle='rgba(100,95,85,0.90)';
      ctx.beginPath();ctx.arc(wx,wy,wr*0.06,0,Math.PI*2);ctx.fill();
     }

     /* Sangle de toit — détail vintage */
     ctx.strokeStyle='rgba(150,135,105,0.50)';ctx.lineWidth=cw*0.008;
     ctx.beginPath();
     ctx.moveTo(carX-cw*0.18,cY-ch*0.62);
     ctx.quadraticCurveTo(carX,cY-ch*0.64,carX+cw*0.18,cY-ch*0.62);
     ctx.stroke();

     /* ── Silhouettes passagers ── */
     ctx.save();
     ctx.globalAlpha=sc*0.82;
     /* Charlie — conducteur à gauche, tête penchée légèrement vers la route */
     ctx.fillStyle='rgba(12,8,4,0.88)';
     /* Tête Charlie */
     ctx.beginPath();ctx.ellipse(carX-cw*0.14,cY-ch*0.44,cw*0.055,cw*0.065,-0.12,0,Math.PI*2);ctx.fill();
     /* Épaule/torse Charlie */
     ctx.beginPath();
     ctx.moveTo(carX-cw*0.22,cY-ch*0.22);
     ctx.bezierCurveTo(carX-cw*0.22,cY-ch*0.38,carX-cw*0.04,cY-ch*0.38,carX-cw*0.04,cY-ch*0.22);
     ctx.closePath();ctx.fill();
     /* Raymond — passager à droite, posture rigide caractéristique */
     ctx.fillStyle='rgba(8,5,2,0.88)';
     /* Tête Raymond — droite, rigide */
     ctx.beginPath();ctx.ellipse(carX+cw*0.14,cY-ch*0.46,cw*0.052,cw*0.063,0.05,0,Math.PI*2);ctx.fill();
     /* Casquette */
     ctx.beginPath();ctx.ellipse(carX+cw*0.14,cY-ch*0.52,cw*0.065,cw*0.018,0,0,Math.PI*2);ctx.fill();
     /* Torse Raymond */
     ctx.beginPath();
     ctx.moveTo(carX+cw*0.04,cY-ch*0.22);
     ctx.bezierCurveTo(carX+cw*0.04,cY-ch*0.40,carX+cw*0.24,cY-ch*0.40,carX+cw*0.24,cY-ch*0.22);
     ctx.closePath();ctx.fill();
     ctx.restore();
    }

    /* ── Panneau routier Highway ── */
    function drawSign(){
     const sx=W*0.82,sy=H*0.66;
     const pw=W*0.12,ph=H*0.080;
     /* Poteau */
     ctx.fillStyle='rgba(140,120,80,0.70)';
     ctx.fillRect(sx-W*0.005,sy,W*0.010,H*0.12);
     /* Panneau vert */
     ctx.fillStyle='rgba(15,75,30,0.88)';
     ctx.beginPath();ctx.roundRect(sx-pw/2,sy-ph,pw,ph,W*0.008);ctx.fill();
     /* Bordure blanche */
     ctx.strokeStyle='rgba(240,235,220,0.70)';ctx.lineWidth=W*0.005;
     ctx.beginPath();ctx.roundRect(sx-pw/2+W*0.006,sy-ph+H*0.008,pw-W*0.012,ph-H*0.016,W*0.005);ctx.stroke();
     /* Texte */
     ctx.fillStyle='rgba(240,235,220,0.88)';
     ctx.font=`bold ${W*0.022}px sans-serif`;ctx.textAlign='center';
     ctx.fillText('LAS VEGAS',sx,sy-ph*0.52);
     ctx.font=`${W*0.016}px sans-serif`;
     ctx.fillText('246 miles',sx,sy-ph*0.18);
    }

    function frame(){
     if(stop.v)return;

     /* ── Ciel golden hour Nevada — cinématographique ── */
     const sky=ctx.createLinearGradient(0,0,0,horizY);
     sky.addColorStop(0.00,`hsl(220,${42+Math.sin(t*0.08)*3|0}%,${18+Math.sin(t*0.06)*2|0}%)`);
     sky.addColorStop(0.18,`hsl(210,38%,22%)`);
     sky.addColorStop(0.38,`hsl(${28+Math.sin(t*0.10)*4|0},60%,28%)`);
     sky.addColorStop(0.60,`hsl(${20+Math.sin(t*0.09)*4|0},78%,38%)`);
     sky.addColorStop(0.80,`hsl(${16+Math.sin(t*0.08)*3|0},85%,48%)`);
     sky.addColorStop(1.00,'hsl(14,80%,52%)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,horizY);

     /* Bandes lumineuses style affiche vintage */
     for(let b=0;b<4;b++){
      const by=horizY*(0.25+b*0.18);
      const bop=0.03+Math.sin(t*0.05+b)*0.015;
      const bg=ctx.createLinearGradient(0,by-H*0.04,0,by+H*0.04);
      bg.addColorStop(0,'rgba(0,0,0,0)');
      bg.addColorStop(0.5,`rgba(255,200,80,${bop})`);
      bg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg;ctx.fillRect(0,by-H*0.04,W,H*0.08);
     }

     /* Nuages — style affiche peinte, formes douces ── */
     for(const cl of clouds){
      /* Extraire r,g,b de la couleur du nuage */
      const m=cl.col.match(/rgba\((\d+),(\d+),(\d+),/);
      const [cr,cg,cb]=m?[+m[1],+m[2],+m[3]]:[180,60,20];
      /* Corps principal — version plus claire au centre */
      const cgrad=ctx.createRadialGradient(cl.x,cl.y,0,cl.x,cl.y,cl.rx*0.9);
      cgrad.addColorStop(0,`rgba(${Math.min(255,cr+30)},${Math.min(255,cg+18)},${Math.min(255,cb+10)},0.88)`);
      cgrad.addColorStop(0.55,cl.col);
      cgrad.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cgrad;
      ctx.beginPath();ctx.ellipse(cl.x,cl.y,cl.rx,cl.ry,0,0,Math.PI*2);ctx.fill();
      /* Sous-masses */
      ctx.fillStyle=`rgba(${cr},${cg},${cb},0.55)`;
      ctx.beginPath();ctx.ellipse(cl.x-cl.rx*0.32,cl.y+cl.ry*0.22,cl.rx*0.52,cl.ry*0.68,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(cl.x+cl.rx*0.35,cl.y+cl.ry*0.18,cl.rx*0.48,cl.ry*0.65,0,0,Math.PI*2);ctx.fill();
      /* Bord lumineux (contre-jour) */
      ctx.strokeStyle='rgba(255,200,100,0.12)';ctx.lineWidth=cl.ry*0.15;
      ctx.beginPath();ctx.ellipse(cl.x,cl.y-cl.ry*0.10,cl.rx*0.85,cl.ry*0.70,0,Math.PI,Math.PI*2);ctx.stroke();
     }

     /* ── Soleil ── */
     drawSun();

     /* ── Désert ── */
     drawDesert();

     /* ── Route ── */
     drawRoad();
     drawSign();

     /* ── Cartes qui voltigent ── */
     for(const cd of cards){
      cd.x+=cd.vx;cd.y+=cd.vy;cd.rot+=cd.rotSpd;
      /* Reboucler */
      if(cd.x>W*1.1){cd.x=W*0.50;cd.y=H*(0.38+Math.random()*0.15);}
      if(cd.y<H*0.10){cd.vy=Math.abs(cd.vy)*0.5;}
      ctx.save();ctx.translate(cd.x,cd.y);ctx.rotate(cd.rot);
      /* Fond blanc */
      ctx.fillStyle='rgba(252,248,240,0.92)';
      ctx.beginPath();ctx.roundRect(-cd.w*0.5,-cd.h*0.5,cd.w,cd.h,cd.w*0.08);ctx.fill();
      ctx.strokeStyle='rgba(180,160,130,0.50)';ctx.lineWidth=cd.w*0.04;
      ctx.beginPath();ctx.roundRect(-cd.w*0.5,-cd.h*0.5,cd.w,cd.h,cd.w*0.08);ctx.stroke();
      /* Valeur + symbole */
      ctx.fillStyle=cd.red?'rgba(180,30,30,0.90)':'rgba(20,20,20,0.90)';
      ctx.font=`bold ${cd.w*0.38}px serif`;
      ctx.textAlign='left';ctx.textBaseline='top';
      ctx.fillText(cd.val,-cd.w*0.40,-cd.h*0.44);
      ctx.font=`${cd.w*0.42}px serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(cd.suit,0,0);
      ctx.restore();
     }

     /* ── Voiture Buick ── */
     carScale=Math.min(carScale+carSpd, 0.72);
     drawCar(carScale);

     /* ── Grain halftone style affiche ── */
     for(let i=0;i<40;i++){
      ctx.fillStyle=`rgba(${80+Math.random()*50|0},${30+Math.random()*25|0},${5+Math.random()*10|0},${0.018+Math.random()*0.020})`;
      ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*2.5+0.5,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette ── */
     const vg=ctx.createRadialGradient(cx,H*0.52,H*0.12,cx,H*0.52,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.52,'rgba(0,0,0,0.06)');
     vg.addColorStop(0.80,'rgba(0,0,0,0.28)');
     vg.addColorStop(1,'rgba(0,0,0,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
