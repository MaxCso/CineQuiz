// CinéQuiz splash chunk — Jumanji
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Jumanji"]={
   name:'Jumanji',
   color:'60,140,60',
   ref:'Jumanji \u2014 Joe Johnston, 1995',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2,cy=H*0.52;
    let _s=document.getElementById('_jum_s');
    if(!_s){_s=document.createElement('style');_s.id='_jum_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:18%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote{display:none!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Plateau Jumanji — grille carrée avec chemin en escargot ── */
    const COLS=7,ROWS=7;
    const boardW=W*0.88, boardH=boardW;
    const boardX=(W-boardW)/2, boardY=cy-boardH*0.48;
    const cellW=boardW/COLS, cellH=boardH/ROWS;

    /* Chemin en escargot (snake) depuis l'extérieur vers le centre */
    function buildPath(){
     const path=[];
     let r0=0,r1=ROWS-1,c0=0,c1=COLS-1;
     while(r0<=r1&&c0<=c1){
      for(let c=c0;c<=c1;c++) path.push([r0,c]);
      for(let r=r0+1;r<=r1;r++) path.push([r,c1]);
      if(r0<r1){for(let c=c1-1;c>=c0;c--) path.push([r1,c]);}
      if(c0<c1){for(let r=r1-1;r>r0;r--) path.push([r,c0]);}
      r0++;r1--;c0++;c1--;
     }
     return path;
    }
    const path=buildPath(); /* 28 cases extérieures + chemin vers centre */

    /* Couleurs des cases — jungle chaude */
    const TILE_COLS=[
     'rgba(155,115,45,1)',  /* bois clair doré */
     'rgba(110,75,22,1)',   /* bois foncé */
     'rgba(55,115,28,1)',   /* vert jungle vif */
     'rgba(35,80,16,1)',    /* vert foncé profond */
    ];
    const SPECIAL=['rgba(185,38,18,1)','rgba(160,30,12,1)'];

    /* Icônes sur certaines cases — symboles jungle */
    const ICONS=['🦁','🌿','💎','⚡','🐍','🌺','🦟'];

    /* Lucioles — plus nombreuses */
    const fireflies=Array.from({length:40},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18,vy:(Math.random()-0.5)*0.14,
     r:W*(0.003+Math.random()*0.004),
     op:0.25+Math.random()*0.50,ph:Math.random()*Math.PI*2,
     spd:0.018+Math.random()*0.025,
    }));

    /* Pluie de jungle fine */
    const rain=Array.from({length:80},()=>({
     x:Math.random()*W*1.2-W*0.1,
     y:Math.random()*H,
     len:H*(0.012+Math.random()*0.018),
     spd:H*(0.010+Math.random()*0.008),
     op:0.06+Math.random()*0.10,
    }));

    /* Dés qui tournent */
    const dice=[
     {x:cx-W*0.30,y:cy+boardH*0.46,angle:0.4,spinSpd:0.04,val:3,size:W*0.072},
     {x:cx+W*0.22,y:cy+boardH*0.46,angle:1.2,spinSpd:0.032,val:6,size:W*0.060},
    ];

    /* Animaux qui traversent le bas — devant le plateau, plus grands */
    const animalY=cy+boardH*0.42;
    const animals=[
     {x:-W*0.30, y:animalY+H*0.04, spd:W*0.0022, dir:1,  type:'elephant', size:W*0.26, ph:0},
     {x:W*1.30,  y:animalY+H*0.02, spd:W*0.0018, dir:-1, type:'rhino',    size:W*0.19, ph:1.5},
     {x:-W*0.12, y:animalY-H*0.01, spd:W*0.0032, dir:1,  type:'monkey',   size:W*0.10, ph:3.0},
    ];

    /* Lianes */
    const vines=Array.from({length:8},(_,i)=>{
     const side=i<4?'left':'right';
     return{
      x:side==='left'?W*(0.01+i*0.06):W*(0.74+(i-4)*0.07),
      side,ph:Math.random()*Math.PI*2,
      segs:Array.from({length:7},()=>({dx:(Math.random()-0.5)*W*0.035,dy:H*(0.06+Math.random()*0.04)})),
      len:H*(0.20+Math.random()*0.22),
     };
    });

    /* Éclairs */
    let ltTimer=0,ltFlash=0,ltBolts=[];

    /* Case active */
    let activeTile=0,lastAdv=0;

    function drawVine(v){
     const sw=Math.sin(t*0.55+v.ph)*W*0.010;
     ctx.strokeStyle='rgba(28,75,12,0.72)';ctx.lineWidth=W*0.007;ctx.lineCap='round';
     ctx.beginPath();let vx=v.x,vy=0;ctx.moveTo(vx,vy);
     for(const sg of v.segs){
      vx+=sg.dx+sw*0.3;vy+=sg.dy;if(vy>v.len)break;ctx.lineTo(vx,vy);
     }
     ctx.stroke();
     let lx=v.x,ly=0;
     for(let i=0;i<v.segs.length;i++){
      lx+=v.segs[i].dx+sw*0.3;ly+=v.segs[i].dy;if(ly>v.len)break;
      if(i%2===1){
       ctx.save();ctx.translate(lx,ly);ctx.rotate((i%2===0?1:-1)*0.55+sw*0.04);
       ctx.fillStyle='rgba(22,85,10,0.68)';
       ctx.beginPath();ctx.ellipse(W*0.020,0,W*0.020,W*0.009,0,0,Math.PI*2);ctx.fill();
       ctx.restore();
      }
     }
    }

    function drawElephant(ax,ay,sz,dir){
     /* dir=1 → va vers la droite, échelle normale ; dir=-1 → va vers la gauche */
     ctx.save();ctx.translate(ax,ay);
     /* PAS de scale(-1,1) sur le dir car on gère manuellement */
     const flip=dir>0?-1:1;
     /* Halo */
     const eh=ctx.createRadialGradient(0,-sz*0.1,0,0,-sz*0.1,sz*0.75);
     eh.addColorStop(0,'rgba(120,200,60,0.28)');eh.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=eh;ctx.beginPath();ctx.arc(0,-sz*0.1,sz*0.75,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(20,36,12,0.98)';
     /* Corps */
     ctx.beginPath();ctx.ellipse(0,0,sz*0.48,sz*0.30,0,0,Math.PI*2);ctx.fill();
     /* Tête */
     ctx.beginPath();ctx.ellipse(-flip*sz*0.40,-sz*0.10,sz*0.22,sz*0.18,0,0,Math.PI*2);ctx.fill();
     /* Trompe (vers la direction de marche) */
     ctx.strokeStyle='rgba(20,36,12,0.98)';ctx.lineWidth=sz*0.10;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(-flip*sz*0.58,-sz*0.08);
     ctx.quadraticCurveTo(-flip*sz*0.74,sz*0.12,-flip*sz*0.64,sz*0.24);
     ctx.stroke();
     /* Oreille */
     ctx.fillStyle='rgba(16,28,8,0.88)';
     ctx.beginPath();ctx.ellipse(-flip*sz*0.30,-sz*0.12,sz*0.13,sz*0.17,-0.3,0,Math.PI*2);ctx.fill();
     /* Défense */
     ctx.strokeStyle='rgba(22,35,14,0.75)';ctx.lineWidth=sz*0.04;
     ctx.beginPath();ctx.moveTo(-flip*sz*0.52,-sz*0.16);ctx.lineTo(-flip*sz*0.70,-sz*0.05);ctx.stroke();
     /* Pattes */
     ctx.fillStyle='rgba(20,36,12,0.98)';
     for(const lx of [-sz*0.26,-sz*0.09,sz*0.09,sz*0.26]){
      ctx.beginPath();ctx.roundRect(lx-sz*0.06,sz*0.26,sz*0.12,sz*0.22,sz*0.04);ctx.fill();
     }
     /* Queue (côté opposé à la tête) */
     ctx.strokeStyle='rgba(20,36,12,0.90)';ctx.lineWidth=sz*0.04;
     ctx.beginPath();ctx.moveTo(flip*sz*0.46,sz*0.00);
     ctx.quadraticCurveTo(flip*sz*0.58,sz*0.14,flip*sz*0.52,sz*0.26);ctx.stroke();
     ctx.restore();
    }

    function drawRhino(ax,ay,sz,dir){
     ctx.save();ctx.translate(ax,ay);
     const flip=dir>0?-1:1;
     const rh=ctx.createRadialGradient(0,0,0,0,0,sz*0.65);
     rh.addColorStop(0,'rgba(100,190,50,0.24)');rh.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rh;ctx.beginPath();ctx.arc(0,0,sz*0.65,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(20,36,12,0.98)';
     ctx.beginPath();ctx.ellipse(0,0,sz*0.46,sz*0.26,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(-flip*sz*0.44,-sz*0.05,sz*0.18,sz*0.16,0.1,0,Math.PI*2);ctx.fill();
     /* Corne vers la direction de marche */
     ctx.beginPath();
     ctx.moveTo(-flip*sz*0.57,-sz*0.17);ctx.lineTo(-flip*sz*0.70,-sz*0.33);ctx.lineTo(-flip*sz*0.52,-sz*0.18);
     ctx.closePath();ctx.fill();
     for(const lx of [-sz*0.23,-sz*0.06,sz*0.12,sz*0.28]){
      ctx.beginPath();ctx.roundRect(lx-sz*0.07,sz*0.21,sz*0.14,sz*0.19,sz*0.04);ctx.fill();
     }
     ctx.restore();
    }

    function drawMonkey(ax,ay,sz,dir,legPh){
     ctx.save();ctx.translate(ax,ay);
     const flip=dir>0?-1:1;
     const mh=ctx.createRadialGradient(-flip*sz*0.1,-sz*0.2,0,-flip*sz*0.1,-sz*0.2,sz*0.55);
     mh.addColorStop(0,'rgba(120,200,60,0.28)');mh.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mh;ctx.beginPath();ctx.arc(-flip*sz*0.1,-sz*0.2,sz*0.55,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(20,36,12,0.98)';
     ctx.beginPath();ctx.ellipse(0,-sz*0.10,sz*0.20,sz*0.26,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(-flip*sz*0.16,-sz*0.50,sz*0.18,0,Math.PI*2);ctx.fill();
     /* Queue vers l'arrière */
     ctx.strokeStyle='rgba(20,36,12,0.92)';ctx.lineWidth=sz*0.08;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(flip*sz*0.18,-sz*0.05);
     ctx.quadraticCurveTo(flip*sz*0.42,sz*0.18,flip*sz*0.38,sz*0.40);ctx.stroke();
     /* Bras et jambes */
     ctx.lineWidth=sz*0.10;
     ctx.beginPath();ctx.moveTo(-flip*sz*0.14,-sz*0.24);ctx.lineTo(-flip*sz*0.36,-sz*0.40+Math.sin(legPh)*sz*0.12);ctx.stroke();
     ctx.beginPath();ctx.moveTo(-flip*sz*0.06,-sz*0.20);ctx.lineTo(flip*sz*0.08,-sz*0.42+Math.sin(legPh+1)*sz*0.10);ctx.stroke();
     ctx.lineWidth=sz*0.10;
     ctx.beginPath();ctx.moveTo(-sz*0.08,sz*0.14);ctx.lineTo(-sz*0.14,sz*0.38+Math.sin(legPh)*sz*0.08);ctx.stroke();
     ctx.beginPath();ctx.moveTo(sz*0.06,sz*0.14);ctx.lineTo(sz*0.12,sz*0.38+Math.sin(legPh+Math.PI)*sz*0.08);ctx.stroke();
     ctx.restore();
    }

    function drawDie(dx,dy,ang,val,sz){
     ctx.save();ctx.translate(dx,dy);ctx.rotate(ang);
     const dg=ctx.createLinearGradient(-sz/2,-sz/2,sz/2,sz/2);
     dg.addColorStop(0,'rgba(200,158,72,0.97)');dg.addColorStop(0.5,'rgba(175,130,52,0.98)');dg.addColorStop(1,'rgba(145,105,36,0.97)');
     ctx.fillStyle=dg;ctx.beginPath();ctx.roundRect(-sz/2,-sz/2,sz,sz,sz*0.15);ctx.fill();
     ctx.strokeStyle='rgba(100,70,20,0.65)';ctx.lineWidth=sz*0.05;
     ctx.beginPath();ctx.roundRect(-sz/2,-sz/2,sz,sz,sz*0.15);ctx.stroke();
     ctx.fillStyle='rgba(25,10,0,0.90)';
     const pr=sz*0.088;
     const dots={1:[[0,0]],2:[[-0.28,0.28],[0.28,-0.28]],3:[[-0.28,0.28],[0,0],[0.28,-0.28]],
      4:[[-0.28,-0.28],[0.28,-0.28],[-0.28,0.28],[0.28,0.28]],
      5:[[-0.28,-0.28],[0.28,-0.28],[0,0],[-0.28,0.28],[0.28,0.28]],
      6:[[-0.28,-0.28],[0.28,-0.28],[-0.28,0],[0.28,0],[-0.28,0.28],[0.28,0.28]]};
     for(const [px,py] of (dots[val]||dots[1])){
      ctx.beginPath();ctx.arc(px*sz,py*sz,pr,0,Math.PI*2);ctx.fill();
     }
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     if(t-lastAdv>0.45){activeTile=(activeTile+1)%path.length;lastAdv=t;}

     /* Fond jungle */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#0a1408');bg.addColorStop(0.45,'#0e1a0a');bg.addColorStop(1,'#080f06');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo central */
     const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.52);
     cg.addColorStop(0,`rgba(22,90,16,${0.28+Math.sin(t*0.5)*0.07})`);
     cg.addColorStop(0.5,`rgba(10,48,8,${0.12+Math.sin(t*0.4)*0.03})`);
     cg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cg;ctx.fillRect(0,0,W,H);

     /* Éclairs */
     ltTimer+=0.016;
     if(ltTimer>2.8+Math.random()*3){ltTimer=0;ltFlash=0.7;ltBolts=[];let lx=W*(0.2+Math.random()*0.6),ly=0;ltBolts.push({x:lx,y:ly});while(ly<H*0.55){ly+=H*(0.06+Math.random()*0.08);lx+=(Math.random()-0.5)*W*0.12;ltBolts.push({x:lx,y:ly});}}
     if(ltFlash>0){ctx.fillStyle=`rgba(200,255,180,${ltFlash*0.10})`;ctx.fillRect(0,0,W,H);if(ltBolts.length>1){ctx.strokeStyle=`rgba(180,255,140,${ltFlash*0.75})`;ctx.lineWidth=W*0.004;ctx.beginPath();ctx.moveTo(ltBolts[0].x,ltBolts[0].y);for(const pt of ltBolts)ctx.lineTo(pt.x,pt.y);ctx.stroke();}ltFlash*=0.80;}

     /* Lianes */
     for(const v of vines) drawVine(v);

     /* ══ PLATEAU JUMANJI — fidèle à l'original ══ */
     const BW=W*0.86, BH=BW*1.28;
     const BX=cx-BW/2, BY=cy-BH*0.42;
     const SZ=BW/10; /* taille d'une case */

     /* Cadre bois sombre — double bord */
     ctx.fillStyle='rgba(38,22,6,0.98)';
     ctx.beginPath();ctx.roundRect(BX-SZ*0.55,BY-SZ*0.55,BW+SZ*1.10,BH+SZ*1.10,SZ*0.30);ctx.fill();
     ctx.fillStyle='rgba(55,32,8,0.98)';
     ctx.beginPath();ctx.roundRect(BX-SZ*0.32,BY-SZ*0.32,BW+SZ*0.64,BH+SZ*0.64,SZ*0.22);ctx.fill();

     /* Fond ocre feuilles */
     const bgG=ctx.createLinearGradient(BX,BY,BX+BW,BY+BH);
     bgG.addColorStop(0,'rgba(185,130,40,0.98)');
     bgG.addColorStop(0.5,'rgba(165,112,28,0.98)');
     bgG.addColorStop(1,'rgba(150,100,22,0.98)');
     ctx.fillStyle=bgG;
     ctx.beginPath();ctx.roundRect(BX,BY,BW,BH,SZ*0.14);ctx.fill();

     /* Motif feuilles — répétées sur fond */
     ctx.save();ctx.globalAlpha=0.18;ctx.font=`${SZ*0.75}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
     for(let fy=0;fy<7;fy++) for(let fx=0;fx<6;fx++){
      ctx.save();ctx.translate(BX+fx*BW/5.2+SZ*0.4,BY+fy*BH/6.5+SZ*0.4);ctx.rotate(((fx*3+fy*2)%7)*0.55);
      ctx.fillStyle='rgba(80,50,8,0.85)';ctx.fillText('🍃',0,0);ctx.restore();
     }
     ctx.restore();

     /* ── Chemin serpentin — tiles crème ── */
     /* On définit le chemin à la main pour coller à l'original :
        2 entrées aux coins, serpentin vers le centre */
     const TW=SZ*0.88, TH=SZ*0.88;
     function drawTile(tx,ty,glow){
      /* Ombre */
      ctx.fillStyle='rgba(30,15,0,0.35)';
      ctx.beginPath();ctx.roundRect(tx+2,ty+3,TW,TH,SZ*0.14);ctx.fill();
      /* Case crème ivoire */
      const tg=ctx.createLinearGradient(tx,ty,tx,ty+TH);
      tg.addColorStop(0,'rgba(235,220,180,0.97)');
      tg.addColorStop(1,'rgba(210,190,145,0.97)');
      ctx.fillStyle=tg;
      ctx.beginPath();ctx.roundRect(tx,ty,TW,TH,SZ*0.14);ctx.fill();
      /* Joint gris-beige */
      ctx.strokeStyle='rgba(160,130,70,0.45)';ctx.lineWidth=1.2;
      ctx.beginPath();ctx.roundRect(tx,ty,TW,TH,SZ*0.14);ctx.stroke();
      /* Reflet */
      ctx.fillStyle='rgba(255,255,240,0.20)';
      ctx.beginPath();ctx.roundRect(tx+2,ty+2,TW-4,TH*0.38,SZ*0.10);ctx.fill();
      /* Pulsation active */
      if(glow){
       const ga=0.45+Math.sin(t*4)*0.30;
       ctx.strokeStyle=`rgba(180,255,100,${ga})`;ctx.lineWidth=SZ*0.12;
       ctx.beginPath();ctx.roundRect(tx-1,ty-1,TW+2,TH+2,SZ*0.16);ctx.stroke();
      }
     }

     /* Génération du chemin serpentin sur grille 9×11 */
     /* Coordonnées des cases [col, row] depuis coin haut-gauche */
     const PATH=[
      /* Coin haut-gauche → droite */
      [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],
      /* Descend */
      [8,1],[8,2],
      /* Gauche */
      [7,2],[6,2],[5,2],[4,2],[3,2],[2,2],[1,2],
      /* Descend */
      [1,3],[1,4],
      /* Droite */
      [2,4],[3,4],[4,4],[5,4],[6,4],[7,4],
      /* Descend */
      [7,5],[7,6],
      /* Gauche vers centre */
      [6,6],[5,6],[4,6],
      /* Descend vers centre */
      [4,7],[4,8],
      /* Droite vers centre */
      [5,8],[6,8],[7,8],[8,8],
      /* Descend */
      [8,9],[8,10],
      /* Gauche */
      [7,10],[6,10],[5,10],[4,10],[3,10],[2,10],[1,10],[0,10],
      /* Remonte */
      [0,9],[0,8],[0,7],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],
     ];
     const OX=BX+SZ*0.30, OY=BY+SZ*0.28; /* offset cases */
     const GSZ=BW/9.6;                     /* espacement grille */

     for(let i=0;i<PATH.length;i++){
      const [col,row]=PATH[i];
      const tx=OX+col*GSZ, ty=OY+row*(BH-SZ*0.56)/10.8;
      drawTile(tx,ty, i===activeTile%PATH.length);
     }

     /* ── Centre — disque vert Jumanji ── */
     const DCX=BX+BW*0.495, DCY=BY+BH*0.492;
     const DR=SZ*1.55;
     /* Bord bois sculpté */
     ctx.fillStyle='rgba(50,28,5,0.98)';ctx.beginPath();ctx.arc(DCX,DCY,DR*1.12,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(72,42,8,0.98)';ctx.beginPath();ctx.arc(DCX,DCY,DR*1.05,0,Math.PI*2);ctx.fill();
     /* Fond vert marbre */
     const dg=ctx.createRadialGradient(DCX-DR*0.25,DCY-DR*0.25,0,DCX,DCY,DR);
     dg.addColorStop(0,`rgba(60,160,42,${0.95+Math.sin(t*0.4)*0.04})`);
     dg.addColorStop(0.55,'rgba(28,100,18,0.98)');
     dg.addColorStop(1,'rgba(12,50,8,1)');
     ctx.fillStyle=dg;ctx.beginPath();ctx.arc(DCX,DCY,DR,0,Math.PI*2);ctx.fill();
     /* Veinures marbre */
     for(let vi=0;vi<4;vi++){
      ctx.strokeStyle=`rgba(80,200,55,${0.12+vi*0.03})`;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.arc(DCX,DCY,DR*(0.30+vi*0.18),0,Math.PI*2);ctx.stroke();
     }
     /* Texte JUMANJI supprimé — remplacé par animations */
     /* Ondes concentriques — effet sonar/magie */
     for(let wi=0;wi<3;wi++){
      const wPhase=(t*1.4+wi*Math.PI*0.65)%(Math.PI*2);
      const wProg=Math.abs(Math.sin(wPhase*0.5));
      const wR=DR*(0.15+wProg*0.78);
      const wOp=(1-wProg)*0.45;
      ctx.strokeStyle=`rgba(120,255,80,${wOp})`;
      ctx.lineWidth=2.0;
      ctx.beginPath();ctx.arc(DCX,DCY,wR,0,Math.PI*2);ctx.stroke();
     }
     /* Symbole central — œil de jungle rotatif */
     ctx.save();
     ctx.translate(DCX,DCY);
     ctx.rotate(t*0.22);
     /* Branches de rune à 6 pointes */
     ctx.strokeStyle=`rgba(160,255,100,${0.38+Math.sin(t*1.8)*0.12})`;
     ctx.lineWidth=W*0.006;ctx.lineCap='round';
     for(let si=0;si<6;si++){
      const sa=si/6*Math.PI*2;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(sa)*DR*0.42,Math.sin(sa)*DR*0.42);ctx.stroke();
     }
     ctx.restore();
     /* Halo pulsant interne */
     const ph2=DR*0.62*(0.88+Math.sin(t*2.2)*0.12);
     const phg=ctx.createRadialGradient(DCX,DCY,0,DCX,DCY,ph2);
     phg.addColorStop(0,`rgba(120,255,80,${0.28+Math.sin(t*2.2)*0.10})`);
     phg.addColorStop(0.5,`rgba(60,200,40,${0.12+Math.sin(t*1.8)*0.06})`);
     phg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=phg;ctx.beginPath();ctx.arc(DCX,DCY,ph2,0,Math.PI*2);ctx.fill();
     /* Flash d'énergie éclairs — apparaît par intermittence */
     if(Math.sin(t*3.1)>0.75){
      const flashOp=(Math.sin(t*3.1)-0.75)/0.25*0.35;
      ctx.strokeStyle=`rgba(200,255,150,${flashOp})`;ctx.lineWidth=1.2;
      for(let li=0;li<4;li++){
       const la=t*0.8+li*Math.PI*0.5;
       ctx.beginPath();ctx.moveTo(DCX+Math.cos(la)*DR*0.15,DCY+Math.sin(la)*DR*0.15);
       ctx.lineTo(DCX+Math.cos(la+0.3)*DR*0.55,DCY+Math.sin(la+0.3)*DR*0.55);ctx.stroke();
      }
     }

     /* ── 2 Pions aux coins du plateau ── */
     function drawPawn(px2,py2,col,sz2){
      /* Base */
      ctx.fillStyle='rgba(20,12,4,0.55)';
      ctx.beginPath();ctx.ellipse(px2,py2+sz2*0.55,sz2*0.38,sz2*0.12,0,0,Math.PI*2);ctx.fill();
      /* Corps */
      const pg4=ctx.createLinearGradient(px2-sz2*0.22,py2-sz2*0.50,px2+sz2*0.22,py2+sz2*0.35);
      pg4.addColorStop(0,col[0]);pg4.addColorStop(1,col[1]);
      ctx.fillStyle=pg4;
      ctx.beginPath();ctx.arc(px2,py2-sz2*0.05,sz2*0.22,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.roundRect(px2-sz2*0.14,py2+sz2*0.14,sz2*0.28,sz2*0.32,sz2*0.06);ctx.fill();
      /* Reflet */
      ctx.fillStyle='rgba(255,255,255,0.25)';
      ctx.beginPath();ctx.ellipse(px2-sz2*0.08,py2-sz2*0.12,sz2*0.09,sz2*0.07,-0.5,0,Math.PI*2);ctx.fill();
     }
     const PS=SZ*0.72;
     drawPawn(BX+SZ*0.02, BY+SZ*0.02, ['rgba(60,220,60,0.97)','rgba(20,130,20,0.97)'], PS);  /* pion vert coin haut-gauche */
     drawPawn(BX+BW-SZ*0.02, BY+BH-SZ*0.02, ['rgba(220,210,190,0.97)','rgba(160,145,115,0.97)'], PS); /* pion blanc coin bas-droite */

     /* Lucioles */
     for(const ff of fireflies){ff.x+=ff.vx;ff.y+=ff.vy;ff.ph+=ff.spd;if(ff.x<0)ff.x=W;if(ff.x>W)ff.x=0;if(ff.y<0)ff.y=H;if(ff.y>H)ff.y=0;const fa=ff.op*(0.4+0.6*Math.abs(Math.sin(ff.ph)));const fg=ctx.createRadialGradient(ff.x,ff.y,0,ff.x,ff.y,ff.r*3.5);fg.addColorStop(0,`rgba(120,220,80,${fa})`);fg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=fg;ctx.beginPath();ctx.arc(ff.x,ff.y,ff.r*3.5,0,Math.PI*2);ctx.fill();ctx.fillStyle=`rgba(180,255,120,${fa})`;ctx.beginPath();ctx.arc(ff.x,ff.y,ff.r,0,Math.PI*2);ctx.fill();}

     /* Dés */
     for(const d of dice){d.angle+=d.spinSpd*(0.5+0.5*Math.sin(t*0.4));drawDie(d.x,d.y,d.angle,d.val,d.size);}

     /* Animaux qui traversent — devant tout */
     for(const a of animals){
      a.x+=a.spd*a.dir;a.ph+=0.08;
      if(a.dir>0&&a.x>W*1.3) a.x=-a.size;
      if(a.dir<0&&a.x<-a.size) a.x=W*1.3;
      if(a.type==='elephant') drawElephant(a.x,a.y,a.size,a.dir);
      else if(a.type==='rhino') drawRhino(a.x,a.y,a.size,a.dir);
      else drawMonkey(a.x,a.y,a.size,a.dir,a.ph);
     }

     /* Vignette légère */
     const vg=ctx.createRadialGradient(cx,cy,H*0.18,cx,cy,H*0.78);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.60,'rgba(3,8,1,0.15)');
     vg.addColorStop(0.85,'rgba(2,6,1,0.40)');vg.addColorStop(1,'rgba(1,4,0,0.75)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Pluie fine de jungle — couche finale */
     ctx.strokeStyle='rgba(140,210,160,0.12)';ctx.lineWidth=0.6;ctx.lineCap='round';
     for(const dr of rain){
      dr.y+=dr.spd;dr.x+=dr.spd*0.15;
      if(dr.y>H+dr.len){dr.y=-dr.len;dr.x=Math.random()*W*1.2-W*0.1;}
      ctx.globalAlpha=dr.op;
      ctx.beginPath();ctx.moveTo(dr.x,dr.y);ctx.lineTo(dr.x+dr.spd*0.15*3,dr.y+dr.len);ctx.stroke();
     }
     ctx.globalAlpha=1;

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
