// CinéQuiz splash chunk — Drive
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Drive"]={
   name:'Drive',
   color:'200,20,60',
   ref:'Drive \u2014 Nicolas Winding Refn, 2011',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.72';
    let t=0;
    /* ── CSS position ── */
    let _dvS=document.getElementById('_dv_pos_s');
    if(!_dvS){_dvS=document.createElement('style');_dvS.id='_dv_pos_s';document.head.appendChild(_dvS);}
    _dvS.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _dvW=setInterval(()=>{if(stop.v){_dvS.textContent='';clearInterval(_dvW);}},200);
    const roadC=document.createElement('canvas');
    roadC.width=W;roadC.height=H;
    const rx=roadC.getContext('2d');
    const horizY=H*0.52;
    const vp={x:W/2,y:horizY};
    const skyG=rx.createLinearGradient(0,0,0,horizY);
    skyG.addColorStop(0,'rgba(4,2,8,1)');skyG.addColorStop(0.6,'rgba(18,5,25,1)');skyG.addColorStop(1,'rgba(35,8,30,1)');
    rx.fillStyle=skyG;rx.fillRect(0,0,W,horizY);
    const roadG=rx.createLinearGradient(0,horizY,0,H);
    roadG.addColorStop(0,'rgba(14,10,20,1)');roadG.addColorStop(1,'rgba(8,5,12,1)');
    rx.fillStyle=roadG;rx.fillRect(0,horizY,W,H-horizY);
    for(let p=0;p<1;p+=0.09){
     const y1=horizY+p*(H-horizY),y2=horizY+(p+0.045)*(H-horizY);
     const spread=p*0.12;
     rx.fillStyle='rgba(220,200,80,0.10)';
     rx.beginPath();rx.moveTo(vp.x-W*spread*0.18,y1);rx.lineTo(vp.x+W*spread*0.18,y1);rx.lineTo(vp.x+W*spread*0.22,y2);rx.lineTo(vp.x-W*spread*0.22,y2);rx.closePath();rx.fill();
    }
    rx.strokeStyle='rgba(255,255,255,0.06)';rx.lineWidth=1.5;
    rx.beginPath();rx.moveTo(vp.x-W*0.02,horizY);rx.lineTo(W*0.02,H);rx.stroke();
    rx.beginPath();rx.moveTo(vp.x+W*0.02,horizY);rx.lineTo(W*0.98,H);rx.stroke();
    const bldgs=[{x:0,w:W*0.14,h:H*0.22},{x:W*0.12,w:W*0.08,h:H*0.30},{x:W*0.19,w:W*0.10,h:H*0.18},{x:W*0.28,w:W*0.06,h:H*0.24},{x:W*0.62,w:W*0.08,h:H*0.26},{x:W*0.70,w:W*0.12,h:H*0.20},{x:W*0.81,w:W*0.09,h:H*0.32},{x:W*0.89,w:W*0.12,h:H*0.22}];
    for(const b of bldgs){
     rx.fillStyle='rgba(6,3,10,0.97)';rx.fillRect(b.x,horizY-b.h,b.w,b.h);
     const fw=5,fh=4,fc=Math.floor(b.w/10),fr=Math.floor(b.h/10);
     for(let r=0;r<fr;r++)for(let c=0;c<fc;c++){
      if(Math.random()<0.35){const wc=Math.random()<0.55?'rgba(255,180,60,':'rgba(255,60,150,';rx.fillStyle=wc+'0.45)';rx.fillRect(b.x+c*10+2,horizY-b.h+r*10+3,fw,fh);}
     }
    }
    const rain=Array.from({length:180},()=>({x:Math.random()*W*1.2-W*0.1,y:Math.random()*H,len:Math.random()*20+8,spd:Math.random()*7+6,op:Math.random()*0.18+0.04,w:Math.random()*0.5+0.2}));
    const puddles=[
     {cx:W*0.22,cy:H*0.88,rx:65,ry:10,color:[220,20,110]},
     {cx:W*0.58,cy:H*0.92,rx:80,ry:12,color:[140,0,200]},
     {cx:W*0.82,cy:H*0.86,rx:50,ry:8, color:[220,20,110]},
    ];

    // ── Voiture vue de derrière (Chevrolet Malibu) ──
    const carW=W*0.62, carH=H*0.18;
    const carX=W/2, carY=H*0.80;

    // Fumée d'échappement
    const exhaustPuffs=Array.from({length:28},()=>({
     x:0,y:0,vx:-(Math.random()*1.2+0.4),vy:-(Math.random()*0.6+0.1),
     r:Math.random()*8+4,life:Math.random(),decay:Math.random()*0.008+0.004,
     op:Math.random()*0.18+0.05
    }));
    // Particules d'eau projetées (éclaboussures roues)
    const waterSprays=Array.from({length:40},()=>({
     x:0,y:0,vx:(Math.random()-0.5)*3,vy:-(Math.random()*2+0.5),
     life:Math.random(),decay:Math.random()*0.025+0.015,
     r:Math.random()*2+0.5,side:Math.random()<0.5?-1:1
    }));
    // Lignes de vitesse
    const speedLines=Array.from({length:22},(_,i)=>({
     y:H*0.55+Math.random()*H*0.40,
     len:Math.random()*W*0.18+W*0.06,
     x:Math.random()*W,
     spd:Math.random()*8+6,
     op:Math.random()*0.12+0.03,
     w:Math.random()*1.2+0.3
    }));

    // Positions des pots d'échappement (sous la voiture, côté gauche)
    const exhaustX=()=> carX - carW*0.30;
    const exhaustY=()=> carY + carH*0.32;

    function drawCar(x,y){
     // Vibration à la vitesse
     const vib=Math.sin(t*42)*0.8+Math.sin(t*67)*0.4;
     ctx.save();ctx.translate(x,y+vib);

     // Motion blur : ghost semi-transparent légèrement décalé à gauche
     ctx.save();ctx.globalAlpha=0.08;ctx.translate(-W*0.012,0);
     _drawCarBody();
     ctx.restore();
     ctx.save();ctx.globalAlpha=0.05;ctx.translate(-W*0.022,0);
     _drawCarBody();
     ctx.restore();

     // Voiture principale
     _drawCarBody();
     ctx.restore();
    }

    function _drawCarBody(){
     const cw=carW, ch=carH;
     const hw=cw/2;
     const pulse=0.82+Math.sin(t*1.6)*0.18;

     // ── Reflet asphalte mouillé sous la voiture ──
     ctx.save();
     ctx.translate(0,ch*0.30);ctx.scale(1,-0.22);ctx.globalAlpha=0.18;
     ctx.filter='blur(3px)';
     ctx.fillStyle='rgba(16,10,26,1)';
     ctx.beginPath();ctx.rect(-hw*0.94,0,cw*0.94,ch*0.80);ctx.fill();
     ctx.filter='none';ctx.restore();

     // ── CARROSSERIE — silhouette Malibu 1978 vue arrière ──
     // Proportions : voiture large et basse, toit quasi-plat, ailes prononcées
     const bodyTop=-ch*0.80;  // sommet du toit
     const bodyBot=0;          // bas de caisse

     // Carrosserie principale — forme très caractéristique
     ctx.beginPath();
     ctx.moveTo(-hw*0.98, bodyBot);           // bas gauche
     ctx.lineTo(-hw*0.98, -ch*0.18);          // aile gauche haute
     ctx.lineTo(-hw*0.90, -ch*0.22);          // épaulement gauche
     ctx.lineTo(-hw*0.78, -ch*0.20);          // renfoncement aile
     ctx.lineTo(-hw*0.72, -ch*0.30);          // début montant C gauche
     ctx.lineTo(-hw*0.58, -ch*0.78);          // montant C gauche
     ctx.lineTo(-hw*0.46, -ch*0.84);          // bord toit gauche
     ctx.lineTo( hw*0.46, -ch*0.84);          // toit plat
     ctx.lineTo( hw*0.58, -ch*0.78);          // bord toit droit
     ctx.lineTo( hw*0.72, -ch*0.30);          // montant C droit
     ctx.lineTo( hw*0.78, -ch*0.20);          // renfoncement aile
     ctx.lineTo( hw*0.90, -ch*0.22);          // épaulement droit
     ctx.lineTo( hw*0.98, -ch*0.18);          // aile droite haute
     ctx.lineTo( hw*0.98, bodyBot);           // bas droit
     ctx.closePath();
     const bodyG=ctx.createLinearGradient(0,bodyTop,0,bodyBot);
     bodyG.addColorStop(0,  'rgba(42,30,58,0.98)');
     bodyG.addColorStop(0.3,'rgba(30,20,44,0.99)');
     bodyG.addColorStop(0.7,'rgba(18,12,28,0.99)');
     bodyG.addColorStop(1,  'rgba(10,6,18,0.99)');
     ctx.fillStyle=bodyG; ctx.fill();

     // Reflets néon sur la carrosserie (caractère Drive)
     ctx.save();
     ctx.beginPath();
     ctx.moveTo(-hw*0.98,bodyBot); ctx.lineTo(-hw*0.98,-ch*0.18); ctx.lineTo(-hw*0.90,-ch*0.22);
     ctx.lineTo(-hw*0.72,-ch*0.30); ctx.lineTo(-hw*0.58,-ch*0.78); ctx.lineTo(-hw*0.46,-ch*0.84);
     ctx.lineTo(hw*0.46,-ch*0.84); ctx.lineTo(hw*0.58,-ch*0.78); ctx.lineTo(hw*0.72,-ch*0.30);
     ctx.lineTo(hw*0.90,-ch*0.22); ctx.lineTo(hw*0.98,-ch*0.18); ctx.lineTo(hw*0.98,bodyBot);
     ctx.closePath(); ctx.clip();
     // Reflet rose-mauve sur l'aile gauche
     const refL=ctx.createLinearGradient(-hw*0.98,-ch*0.20,-hw*0.55,-ch*0.20);
     refL.addColorStop(0,'rgba(220,20,120,0.18)'); refL.addColorStop(1,'rgba(220,20,120,0)');
     ctx.fillStyle=refL; ctx.fillRect(-hw,-ch*0.30,hw,ch*0.30);
     // Reflet bleu-violet sur l'aile droite
     const refR=ctx.createLinearGradient(hw*0.55,-ch*0.20,hw*0.98,-ch*0.20);
     refR.addColorStop(0,'rgba(80,20,220,0)'); refR.addColorStop(1,'rgba(80,20,220,0.15)');
     ctx.fillStyle=refR; ctx.fillRect(0,-ch*0.30,hw,ch*0.30);
     // Reflet néon sur le toit
     const neonT=ctx.createLinearGradient(-hw*0.46,-ch*0.84,hw*0.46,-ch*0.84);
     neonT.addColorStop(0,'rgba(180,20,180,0)'); neonT.addColorStop(0.3,'rgba(220,20,110,0.12)');
     neonT.addColorStop(0.5,'rgba(200,20,200,0.16)'); neonT.addColorStop(0.7,'rgba(20,80,220,0.12)');
     neonT.addColorStop(1,'rgba(80,20,200,0)');
     ctx.fillStyle=neonT; ctx.fillRect(-hw*0.46,-ch*0.84,cw*0.92,ch*0.08);
     ctx.restore();

     // Liseré chrome toit
     ctx.save(); ctx.globalAlpha=0.50;
     const chrL=ctx.createLinearGradient(-hw*0.46,-ch*0.84,hw*0.46,-ch*0.84);
     chrL.addColorStop(0,'rgba(200,185,220,0)'); chrL.addColorStop(0.25,'rgba(240,228,252,0.95)');
     chrL.addColorStop(0.5,'rgba(255,248,255,1)'); chrL.addColorStop(0.75,'rgba(240,228,252,0.95)');
     chrL.addColorStop(1,'rgba(200,185,220,0)');
     ctx.strokeStyle=chrL; ctx.lineWidth=1.8;
     ctx.beginPath(); ctx.moveTo(-hw*0.46,-ch*0.84); ctx.lineTo(hw*0.46,-ch*0.84); ctx.stroke();
     ctx.restore();

     // ── Vitre arrière ──
     ctx.fillStyle='rgba(8,12,28,0.90)';
     ctx.beginPath();
     ctx.moveTo(-hw*0.54,-ch*0.24); ctx.lineTo(-hw*0.45,-ch*0.76);
     ctx.lineTo( hw*0.45,-ch*0.76); ctx.lineTo( hw*0.54,-ch*0.24);
     ctx.closePath(); ctx.fill();
     // Reflet diagonal sur la vitre
     ctx.save();
     ctx.beginPath();
     ctx.moveTo(-hw*0.54,-ch*0.24); ctx.lineTo(-hw*0.45,-ch*0.76);
     ctx.lineTo(hw*0.45,-ch*0.76); ctx.lineTo(hw*0.54,-ch*0.24);
     ctx.closePath(); ctx.clip();
     const wRef=ctx.createLinearGradient(-hw*0.35,-ch*0.72,hw*0.08,-ch*0.26);
     wRef.addColorStop(0,'rgba(180,200,255,0)'); wRef.addColorStop(0.35,'rgba(200,220,255,0.15)');
     wRef.addColorStop(0.55,'rgba(220,235,255,0.22)'); wRef.addColorStop(1,'rgba(180,200,255,0)');
     ctx.fillStyle=wRef; ctx.fillRect(-hw,-ch*0.80,cw,ch*0.60);
     ctx.restore();
     ctx.strokeStyle='rgba(80,100,160,0.22)'; ctx.lineWidth=0.8;
     ctx.beginPath();
     ctx.moveTo(-hw*0.54,-ch*0.24); ctx.lineTo(-hw*0.45,-ch*0.76);
     ctx.lineTo(hw*0.45,-ch*0.76); ctx.lineTo(hw*0.54,-ch*0.24);
     ctx.closePath(); ctx.stroke();

     // ── Panneau arrière avec ligne de style ──
     ctx.fillStyle='rgba(14,10,22,0.98)';
     ctx.beginPath();
     ctx.moveTo(-hw*0.78,-ch*0.20); ctx.lineTo(-hw*0.72,-ch*0.30);
     ctx.lineTo(-hw*0.54,-ch*0.24); ctx.lineTo( hw*0.54,-ch*0.24);
     ctx.lineTo( hw*0.72,-ch*0.30); ctx.lineTo( hw*0.78,-ch*0.20);
     ctx.lineTo( hw*0.78, 0); ctx.lineTo(-hw*0.78, 0);
     ctx.closePath(); ctx.fill();
     // Ligne de style horizontale
     const slG=ctx.createLinearGradient(-hw*0.76,-ch*0.05,hw*0.76,-ch*0.05);
     slG.addColorStop(0,'rgba(160,140,190,0)'); slG.addColorStop(0.15,'rgba(190,170,215,0.70)');
     slG.addColorStop(0.5,'rgba(215,200,235,0.90)'); slG.addColorStop(0.85,'rgba(190,170,215,0.70)');
     slG.addColorStop(1,'rgba(160,140,190,0)');
     ctx.save(); ctx.globalAlpha=0.35;
     ctx.strokeStyle=slG; ctx.lineWidth=1;
     ctx.beginPath(); ctx.moveTo(-hw*0.76,-ch*0.05); ctx.lineTo(hw*0.76,-ch*0.05); ctx.stroke();
     ctx.restore();

     // ── Feux arrière Malibu 1978 — 2 rectangles par côté, plus fins et réalistes ──
     const fH=ch*0.16;   // hauteur boîtier feu
     const fW=cw*0.14;   // largeur boîtier feu
     const fY=-ch*0.20;  // position Y centre feux
     const fTop=fY-fH/2, fBot=fY+fH/2;

     // Boîtiers gauche et droit
     [[-hw*0.88, -hw*0.74], [hw*0.74, hw*0.88]].forEach(([x1,x2],side)=>{
      const bxL=Math.min(x1,x2)-cw*0.005, bxW=Math.abs(x2-x1)+cw*0.010;
      ctx.fillStyle='rgba(8,4,10,0.96)';
      ctx.beginPath(); ctx.rect(bxL, fTop-ch*0.015, bxW, fH+ch*0.030); ctx.fill();
      ctx.strokeStyle='rgba(50,40,65,0.55)'; ctx.lineWidth=0.7;
      ctx.beginPath(); ctx.rect(bxL, fTop-ch*0.015, bxW, fH+ch*0.030); ctx.stroke();

      // Feu externe (plus grand — feu de stop)
      const fx1=side===0 ? x1 : x1+cw*0.005;
      const fw1=cw*0.072;
      const fg1=ctx.createLinearGradient(fx1,fTop,fx1,fBot);
      fg1.addColorStop(0,`rgba(255,${20+pulse*10|0},8,${pulse})`);
      fg1.addColorStop(0.4,'rgba(220,8,0,0.88)');
      fg1.addColorStop(0.8,'rgba(140,0,0,0.65)');
      fg1.addColorStop(1,'rgba(40,0,0,0.18)');
      ctx.fillStyle=fg1; ctx.beginPath(); ctx.rect(fx1,fTop,fw1,fH); ctx.fill();
      // Filament interne
      ctx.save(); ctx.globalAlpha=0.55;
      ctx.strokeStyle=`rgba(255,${180+pulse*40|0},160,0.80)`; ctx.lineWidth=1.2;
      ctx.beginPath();
      for(let r=0;r<3;r++){
       const ry=fTop+fH*(0.25+r*0.24);
       ctx.moveTo(fx1+fw1*0.12,ry); ctx.lineTo(fx1+fw1*0.88,ry);
      }
      ctx.stroke(); ctx.restore();
      // Chrome contour
      ctx.strokeStyle=`rgba(175,158,198,0.50)`; ctx.lineWidth=1;
      ctx.beginPath(); ctx.rect(fx1,fTop,fw1,fH); ctx.stroke();

      // Feu interne (clignotant / position — plus étroit)
      const fx2=side===0 ? x1+cw*0.076 : x1+cw*0.005+cw*0.076;
      const fw2=cw*0.058;
      const fg2=ctx.createLinearGradient(fx2,fTop,fx2,fBot);
      fg2.addColorStop(0,`rgba(255,${45+pulse*15|0},10,${pulse*0.88})`);
      fg2.addColorStop(0.5,'rgba(195,15,0,0.75)');
      fg2.addColorStop(1,'rgba(60,0,0,0.12)');
      ctx.fillStyle=fg2; ctx.beginPath(); ctx.rect(fx2,fTop,fw2,fH); ctx.fill();
      ctx.strokeStyle=`rgba(155,138,178,0.42)`; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.rect(fx2,fTop,fw2,fH); ctx.stroke();
     });

     // Halos feux sur la route (plus petits, plus réalistes)
     [[-hw*0.84,-ch*0.12],[-hw*0.74,-ch*0.12],[hw*0.74,-ch*0.12],[hw*0.84,-ch*0.12]].forEach(([fx,fy])=>{
      const hg=ctx.createRadialGradient(fx,ch*0.12,0,fx,ch*0.12,cw*0.13);
      hg.addColorStop(0,`rgba(255,8,0,${0.18*pulse})`); hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg; ctx.fillRect(fx-cw*0.14,0,cw*0.28,ch*0.40);
     });

     // ── Roues (arc partiel visible au bas des ailes) ──
     const wheelR=ch*0.40;
     const wheelY=bodyBot+wheelR*0.52;
     [-hw*0.74, hw*0.74].forEach(wx=>{
      // Pneu sombre
      ctx.fillStyle='rgba(8,5,12,0.95)';
      ctx.beginPath(); ctx.arc(wx,wheelY,wheelR,Math.PI*1.15,Math.PI*1.85); ctx.fill();
      // Flanc caoutchouc
      ctx.strokeStyle='rgba(25,18,35,0.90)'; ctx.lineWidth=wheelR*0.22;
      ctx.beginPath(); ctx.arc(wx,wheelY,wheelR*0.82,Math.PI*1.15,Math.PI*1.85); ctx.stroke();
      // Jante chromée
      ctx.strokeStyle='rgba(175,162,195,0.65)'; ctx.lineWidth=wheelR*0.10;
      ctx.beginPath(); ctx.arc(wx,wheelY,wheelR*0.60,Math.PI*1.15,Math.PI*1.85); ctx.stroke();
      // Rayon jante (5 rayons)
      ctx.save(); ctx.translate(wx,wheelY);
      ctx.strokeStyle='rgba(148,135,168,0.45)'; ctx.lineWidth=1.8;
      for(let r=0;r<5;r++){
       const ra=Math.PI*(1.15+r*0.14)+t*0.8;
       if(ra>Math.PI*1.85)continue;
       ctx.beginPath(); ctx.moveTo(Math.cos(ra)*wheelR*0.20,Math.sin(ra)*wheelR*0.20);
       ctx.lineTo(Math.cos(ra)*wheelR*0.58,Math.sin(ra)*wheelR*0.58); ctx.stroke();
      }
      ctx.restore();
     });

     // ── Pare-chocs chromé — plus réaliste, moins épais ──
     const pcY=ch*0.08;
     const pcH=ch*0.14;
     // Corps sombre
     ctx.fillStyle='rgba(16,11,24,0.98)';
     ctx.beginPath(); ctx.rect(-hw*0.96,pcY,cw*0.96,pcH); ctx.fill();
     // Bande chrome principale
     const pcChr=ctx.createLinearGradient(0,pcY,0,pcY+pcH);
     pcChr.addColorStop(0,  'rgba(195,182,212,0.88)');
     pcChr.addColorStop(0.12,'rgba(240,232,252,0.98)');
     pcChr.addColorStop(0.32,'rgba(175,162,192,0.72)');
     pcChr.addColorStop(0.55,'rgba(228,220,242,0.85)');
     pcChr.addColorStop(0.80,'rgba(155,144,172,0.60)');
     pcChr.addColorStop(1,  'rgba(128,118,142,0.40)');
     ctx.save(); ctx.globalAlpha=0.72;
     ctx.fillStyle=pcChr; ctx.beginPath(); ctx.rect(-hw*0.95,pcY,cw*0.94,pcH); ctx.fill();
     ctx.restore();
     // Bouts chromés coins
     ctx.save(); ctx.globalAlpha=0.78;
     ctx.fillStyle='rgba(220,210,235,0.92)';
     ctx.beginPath(); ctx.rect(-hw*0.97,pcY-ch*0.014,cw*0.100,pcH+ch*0.028); ctx.fill();
     ctx.beginPath(); ctx.rect( hw*0.87,pcY-ch*0.014,cw*0.100,pcH+ch*0.028); ctx.fill();
     ctx.restore();
     // Rainure centrale
     ctx.strokeStyle='rgba(80,68,95,0.55)'; ctx.lineWidth=0.8;
     ctx.beginPath(); ctx.moveTo(-hw*0.80,pcY+pcH*0.52); ctx.lineTo(-hw*0.20,pcY+pcH*0.52); ctx.stroke();
     ctx.beginPath(); ctx.moveTo( hw*0.20,pcY+pcH*0.52); ctx.lineTo( hw*0.80,pcY+pcH*0.52); ctx.stroke();

     // ── Plaque d'immatriculation ──
     ctx.fillStyle='rgba(225,222,212,0.92)';
     ctx.beginPath(); ctx.rect(-hw*0.155,pcY+pcH*0.10,cw*0.155,pcH*0.72); ctx.fill();
     // Bord plaque
     ctx.strokeStyle='rgba(140,128,155,0.55)'; ctx.lineWidth=0.8;
     ctx.beginPath(); ctx.rect(-hw*0.155,pcY+pcH*0.10,cw*0.155,pcH*0.72); ctx.stroke();
     ctx.fillStyle='rgba(6,4,14,0.88)';
     ctx.font=`bold ${ch*0.052}px monospace`; ctx.textAlign='center'; ctx.textBaseline='middle';
     ctx.fillText('MALIBU',0,pcY+pcH*0.50);

     // ── Bas de caisse ──
     ctx.fillStyle='rgba(10,7,16,0.98)';
     ctx.beginPath(); ctx.rect(-hw*0.96,pcY+pcH,cw*0.96,ch*0.08); ctx.fill();

    } // fin _drawCarBody

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(4,2,8,0.20)';ctx.fillRect(0,0,W,H);
     ctx.drawImage(roadC,0,0);
     const p1=ctx.createRadialGradient(W*0.22,H*0.58,10,W*0.22,H*0.58,W*0.52);
     p1.addColorStop(0,`rgba(220,20,110,${0.10+Math.sin(t*0.5)*0.04})`);p1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=p1;ctx.fillRect(0,0,W,H);
     const p2=ctx.createRadialGradient(W*0.78,H*0.50,10,W*0.78,H*0.50,W*0.48);
     p2.addColorStop(0,`rgba(140,0,200,${0.08+Math.sin(t*0.7)*0.03})`);p2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=p2;ctx.fillRect(0,0,W,H);
     const rg=ctx.createLinearGradient(0,horizY,0,H);
     rg.addColorStop(0,`rgba(180,10,90,${0.06+Math.sin(t*0.4)*0.02})`);rg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg;ctx.fillRect(0,horizY,W,H-horizY);
     for(const p of puddles){
      const fl=0.35+Math.sin(t*1.2+p.cx*0.01)*0.35;
      const pg=ctx.createRadialGradient(p.cx,p.cy,2,p.cx,p.cy,p.rx);
      pg.addColorStop(0,`rgba(${p.color},${0.32*fl})`);pg.addColorStop(1,`rgba(${p.color},0)`);
      ctx.fillStyle=pg;ctx.beginPath();ctx.ellipse(p.cx,p.cy,p.rx,p.ry,0,0,Math.PI*2);ctx.fill();
      for(let r=0;r<3;r++){const rr=((r/3+t*0.35)%1);ctx.strokeStyle=`rgba(${p.color},${0.07*(1-rr)})`;ctx.lineWidth=0.5;ctx.beginPath();ctx.ellipse(p.cx,p.cy,p.rx*rr,p.ry*rr,0,0,Math.PI*2);ctx.stroke();}
     }

     // ── Lignes de vitesse horizontales (motion blur de la route) ──
     ctx.save();
     for(const sl of speedLines){
      sl.x-=sl.spd;
      if(sl.x+sl.len<0) sl.x=W+sl.len*0.5;
      const slg=ctx.createLinearGradient(sl.x,sl.y,sl.x+sl.len,sl.y);
      slg.addColorStop(0,'rgba(180,160,210,0)');
      slg.addColorStop(0.3,`rgba(180,160,210,${sl.op})`);
      slg.addColorStop(0.7,`rgba(180,160,210,${sl.op})`);
      slg.addColorStop(1,'rgba(180,160,210,0)');
      ctx.strokeStyle=slg;ctx.lineWidth=sl.w;
      ctx.beginPath();ctx.moveTo(sl.x,sl.y);ctx.lineTo(sl.x+sl.len,sl.y);ctx.stroke();
     }
     ctx.restore();

     // ── Fumée d'échappement ──
     const ex=exhaustX(), ey=exhaustY();
     for(const p of exhaustPuffs){
      if(p.x===0&&p.y===0){p.x=ex+(Math.random()-0.5)*8;p.y=ey;}
      p.x+=p.vx;p.y+=p.vy+Math.sin(t*2+p.r)*0.15;p.life-=p.decay;
      if(p.life<=0){
       p.x=ex+(Math.random()-0.5)*10;p.y=ey;
       p.vx=-(Math.random()*1.2+0.4);p.vy=-(Math.random()*0.5+0.1);
       p.r=Math.random()*8+4;p.life=0.7+Math.random()*0.3;
       p.op=Math.random()*0.18+0.05;
      }
      const grow=1+( 1-p.life)*2.5;
      const sg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*grow);
      sg.addColorStop(0,`rgba(200,185,210,${p.op*p.life*1.4})`);
      sg.addColorStop(1,'rgba(180,165,195,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(p.x,p.y,p.r*grow,0,Math.PI*2);ctx.fill();
     }

     // ── Éclaboussures eau sous les roues ──
     const lwx=carX-carW*0.42, rwx=carX+carW*0.42, wy=carY+carH*0.28;
     for(const p of waterSprays){
      const bx=p.side<0?lwx:rwx;
      if(p.x===0&&p.y===0){p.x=bx+(Math.random()-0.5)*12;p.y=wy;}
      p.x+=p.vx;p.y+=p.vy;p.vy+=0.12;p.life-=p.decay;
      if(p.life<=0){
       p.x=bx+(Math.random()-0.5)*14;p.y=wy;
       p.vx=(Math.random()-0.5)*3;p.vy=-(Math.random()*2+0.5);
       p.life=0.5+Math.random()*0.5;p.r=Math.random()*2+0.5;
      }
      ctx.globalAlpha=p.life*0.45;
      ctx.fillStyle='rgba(160,175,210,0.7)';
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }
     ctx.globalAlpha=1;

     // Voiture
     drawCar(carX, carY);

     for(const d of rain){
      d.y+=d.spd;d.x-=d.spd*0.12;
      if(d.y>H+d.len){d.y=-d.len;d.x=Math.random()*W*1.2-W*0.1;}
      ctx.strokeStyle=`rgba(160,180,220,${d.op})`;ctx.lineWidth=d.w;
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x-d.len*0.12,d.y+d.len);ctx.stroke();
     }
     const vg=ctx.createRadialGradient(W/2,H*0.44,H*0.06,W/2,H*0.44,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.5,'rgba(4,2,8,0.28)');vg.addColorStop(1,'rgba(4,2,8,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
