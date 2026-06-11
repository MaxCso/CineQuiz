// CinéQuiz splash chunk — Toy Story
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Toy Story"]={
   name:'Toy Story',
   color:'100,160,230',
   ref:'Toy Story \u2014 John Lasseter, 1995',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';

    /* ── Palette chambre d'Andy ── */
    let _tsStyle=document.getElementById('_ts_splash_style');
    if(!_tsStyle){_tsStyle=document.createElement('style');_tsStyle.id='_ts_splash_style';document.head.appendChild(_tsStyle);}
    _tsStyle.textContent=`

      #splash-content-wrap{top:30%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
      #splash-film-quote{color:rgba(60,30,10,0.92)!important;text-shadow:0 1px 3px rgba(255,220,120,0.45)!important;}
    `;
    const _tsWatch=setInterval(()=>{if(stop.v){_tsStyle.textContent='';clearInterval(_tsWatch);}},200);

    let t=0;
    const cx=W/2;
    const floorY=H*0.72;

    /* ── SVG nuage — path pré-compilé pour drawImage via OffscreenCanvas ── */
    const CLOUD_PATH='M835.294 0.768838C686.227 16.5022 565.961 128.236 535.827 278.636C533.694 289.702 531.694 298.769 531.561 299.036C531.294 299.169 526.361 298.502 520.627 297.436C504.227 294.236 477.827 292.902 459.694 294.102C367.294 300.769 290.627 356.369 264.094 436.102C246.227 489.836 254.494 549.302 286.494 596.769L293.161 606.769L192.894 607.569C83.1607 608.369 86.7607 608.102 64.6274 616.636C36.894 627.302 14.2274 649.836 4.22735 676.502C0.227353 687.436 -1.23931 709.436 1.16069 722.502C3.29402 733.436 12.894 752.902 20.894 762.369C34.2274 778.369 53.294 790.369 76.894 797.702L88.6274 801.436H658.627C1215.29 801.436 1228.89 801.436 1238.63 798.902C1278.89 788.636 1308.89 761.169 1317.96 726.369C1321.03 714.369 1320.63 692.636 1317.16 681.302C1308.36 652.369 1285.03 628.102 1255.29 616.636C1234.49 608.636 1232.89 608.369 1163.56 607.569L1099.69 606.769L1111.96 593.436C1161.16 539.969 1192.23 472.636 1202.89 396.769C1205.56 377.302 1205.16 320.102 1202.09 300.769C1193.69 246.502 1177.03 200.902 1149.96 158.236C1097.56 75.5688 1015.69 20.2355 921.294 3.96884C905.961 1.30217 896.227 0.502172 873.961 0.102172C858.627 -0.164495 841.161 0.102172 835.294 0.768838Z';

    /* Pré-render du nuage dans un OffscreenCanvas pour perf */
    const CLOUD_W=130,CLOUD_H=79; /* dimensions à l'échelle mobile */
    let cloudImg=null;
    (function(){
     try{
      const oc=new OffscreenCanvas(CLOUD_W,CLOUD_H);
      const oc2=oc.getContext('2d');
      const scaleX=CLOUD_W/1321,scaleY=CLOUD_H/802;
      oc2.scale(scaleX,scaleY);
      const p=new Path2D(CLOUD_PATH);
      oc2.fillStyle='rgba(229,234,237,0.82)';
      oc2.fill(p);
      cloudImg=oc.transferToImageBitmap();
     }catch(e){cloudImg=null;}
    })();

    /* Nuages du papier peint — grille décalée, défilement lent vers la droite */
    const COLS=3,ROWS=5;
    const cw=CLOUD_W*0.75,ch=CLOUD_H*0.75;
    const gapX=W/(COLS-0.2),gapY=(floorY*0.90)/(ROWS);
    const wallClouds=[];
    for(let r=0;r<ROWS;r++){
     for(let c=0;c<COLS+1;c++){
      wallClouds.push({
       x:c*gapX+(r%2?gapX*0.5:0)-cw*0.3,
       y:gapY*r+gapY*0.15,
       spd:0.12+r*0.02,
      });
     }
    }

    /* Balle rouge de Toy Story */
    const ball={
     x:cx,y:floorY-W*0.055,
     vx:0.6,vy:0,
     r:W*0.055,
     bounce:false,
    };

    /* Étoiles scintillantes (combinaison de Buzz) */
    const stars=Array.from({length:28},()=>({
     x:Math.random()*W,
     y:Math.random()*floorY*0.88,
     r:Math.random()*1.8+0.6,
     ph:Math.random()*Math.PI*2,
     spd:0.04+Math.random()*0.06,
     col:Math.random()>0.4?'255,230,80':'200,230,255',
    }));

    /* Confettis */
    const confetti=Array.from({length:22},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vx:(Math.random()-0.5)*0.4,
     vy:Math.random()*0.5+0.2,
     w:Math.random()*6+3,
     h:Math.random()*3+2,
     rot:Math.random()*Math.PI*2,
     vrot:( Math.random()-0.5)*0.04,
     col:['220,50,50','240,180,30','50,140,210','80,190,80','200,100,200'][Math.floor(Math.random()*5)],
    }));

    /* ── Dessiner Woody ── */
    function drawWoody(wx,wy,swing){
     const s=W*0.095;
     ctx.save();ctx.translate(wx,wy);
     ctx.rotate(Math.sin(swing)*0.025);

     /* ── Jambes (jean bleu) ── */
     ctx.fillStyle='rgba(65,95,165,0.95)';
     ctx.beginPath();ctx.roundRect(-s*0.30,0,s*0.25,s*0.58,3);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.05,0,s*0.25,s*0.58,3);ctx.fill();
     /* Bottes marron */
     ctx.fillStyle='rgba(90,55,20,0.97)';
     ctx.beginPath();ctx.roundRect(-s*0.36,s*0.48,s*0.32,s*0.15,4);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.04,s*0.48,s*0.32,s*0.15,4);ctx.fill();

     /* ── Corps : chemise jaune à carreaux ── */
     ctx.fillStyle='rgba(218,175,65,0.97)';
     ctx.beginPath();ctx.roundRect(-s*0.40,-s*0.92,s*0.80,s*0.96,4);ctx.fill();
     /* Grille carreaux */
     ctx.strokeStyle='rgba(160,110,20,0.40)';ctx.lineWidth=1.5;
     for(let ri=0;ri<5;ri++){ctx.beginPath();ctx.moveTo(-s*0.40,-s*0.92+ri*s*0.22);ctx.lineTo(s*0.40,-s*0.92+ri*s*0.22);ctx.stroke();}
     for(let ci=0;ci<4;ci++){ctx.beginPath();ctx.moveTo(-s*0.40+ci*s*0.26,-s*0.92);ctx.lineTo(-s*0.40+ci*s*0.26,s*0.04);ctx.stroke();}

     /* ── Veste sans manches peau de vache ── */
     /* Panneau gauche */
     ctx.fillStyle='rgba(238,232,218,0.96)';
     ctx.beginPath();ctx.moveTo(-s*0.40,-s*0.92);ctx.lineTo(-s*0.40,s*0.02);ctx.lineTo(-s*0.16,s*0.02);ctx.lineTo(-s*0.16,-s*0.92);ctx.closePath();ctx.fill();
     /* Taches noires peau de vache gauche */
     ctx.fillStyle='rgba(30,28,28,0.85)';
     ctx.beginPath();ctx.ellipse(-s*0.30,-s*0.65,s*0.07,s*0.10,0.4,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(-s*0.22,-s*0.42,s*0.06,s*0.08,-0.3,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(-s*0.32,-s*0.22,s*0.05,s*0.07,0.2,0,Math.PI*2);ctx.fill();
     /* Panneau droit */
     ctx.fillStyle='rgba(238,232,218,0.96)';
     ctx.beginPath();ctx.moveTo(s*0.40,-s*0.92);ctx.lineTo(s*0.40,s*0.02);ctx.lineTo(s*0.16,s*0.02);ctx.lineTo(s*0.16,-s*0.92);ctx.closePath();ctx.fill();
     /* Taches noires droite */
     ctx.fillStyle='rgba(30,28,28,0.85)';
     ctx.beginPath();ctx.ellipse(s*0.28,-s*0.70,s*0.06,s*0.09,0.5,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(s*0.30,-s*0.30,s*0.07,s*0.08,-0.2,0,Math.PI*2);ctx.fill();
     /* Boutons */
     ctx.fillStyle='rgba(200,180,130,0.95)';
     for(const by2 of [-s*0.70,-s*0.48,-s*0.26]){ctx.beginPath();ctx.arc(0,by2,s*0.045,0,Math.PI*2);ctx.fill();}

     /* ── Foulard rouge ── */
     ctx.fillStyle='rgba(205,45,38,0.95)';
     ctx.beginPath();ctx.moveTo(-s*0.18,-s*0.92);ctx.lineTo(s*0.18,-s*0.92);ctx.lineTo(s*0.10,-s*1.05);ctx.lineTo(0,-s*0.80);ctx.lineTo(-s*0.10,-s*1.05);ctx.closePath();ctx.fill();
     /* Nœud */
     ctx.beginPath();ctx.ellipse(0,-s*1.00,s*0.08,s*0.06,0,0,Math.PI*2);ctx.fill();

     /* ── Cou ── */
     ctx.fillStyle='rgba(225,178,115,0.97)';
     ctx.beginPath();ctx.roundRect(-s*0.11,-s*1.12,s*0.22,s*0.22,2);ctx.fill();

     /* ── Tête ── */
     const hg=ctx.createRadialGradient(s*0.05,-s*1.42,3,0,-s*1.40,s*0.50);
     hg.addColorStop(0,'rgba(240,198,140,0.98)');hg.addColorStop(1,'rgba(195,148,88,0.94)');
     ctx.fillStyle=hg;ctx.beginPath();ctx.ellipse(0,-s*1.40,s*0.40,s*0.50,0,0,Math.PI*2);ctx.fill();
     /* Menton légèrement marqué */
     ctx.fillStyle='rgba(185,138,80,0.50)';
     ctx.beginPath();ctx.ellipse(0,-s*1.02,s*0.18,s*0.08,0,0,Math.PI*2);ctx.fill();

     /* ── Yeux (marron rougeâtre comme Woody) ── */
     for(const ex of [-s*0.15,s*0.15]){
      ctx.fillStyle='rgba(255,255,255,0.97)';ctx.beginPath();ctx.ellipse(ex,-s*1.42,s*0.115,s*0.105,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(130,45,35,0.96)';ctx.beginPath();ctx.arc(ex,-s*1.42,s*0.072,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(8,5,5,0.97)';ctx.beginPath();ctx.arc(ex+s*0.02,-s*1.44,s*0.040,0,Math.PI*2);ctx.fill();
      /* Reflet */
      ctx.fillStyle='rgba(255,255,255,0.70)';ctx.beginPath();ctx.arc(ex-s*0.03,-s*1.46,s*0.022,0,Math.PI*2);ctx.fill();
     }
     /* Sourcils marron */
     ctx.strokeStyle='rgba(100,60,20,0.85)';ctx.lineWidth=2.2;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-s*0.23,-s*1.56);ctx.quadraticCurveTo(-s*0.15,-s*1.60,-s*0.06,-s*1.56);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.06,-s*1.56);ctx.quadraticCurveTo(s*0.15,-s*1.60,s*0.23,-s*1.56);ctx.stroke();
     /* Sourire */
     ctx.strokeStyle='rgba(140,85,40,0.82)';ctx.lineWidth=2.0;
     ctx.beginPath();ctx.moveTo(-s*0.18,-s*1.24);ctx.quadraticCurveTo(0,-s*1.12,s*0.18,-s*1.24);ctx.stroke();

     /* ── Chapeau brun foncé ── */
     /* Bord large */
     ctx.fillStyle='rgba(88,52,18,0.97)';
     ctx.beginPath();ctx.ellipse(0,-s*1.80,s*0.66,s*0.12,0,0,Math.PI*2);ctx.fill();
     /* Calotte */
     ctx.beginPath();ctx.roundRect(-s*0.34,-s*2.12,s*0.68,s*0.34,6);ctx.fill();
     /* Haut arrondi */
     ctx.beginPath();ctx.ellipse(0,-s*2.12,s*0.34,s*0.10,0,0,Math.PI*2);ctx.fill();
     /* Ruban plus sombre */
     ctx.fillStyle='rgba(55,30,8,0.90)';
     ctx.beginPath();ctx.roundRect(-s*0.34,-s*1.84,s*0.68,s*0.10,2);ctx.fill();
     /* Reflet chapeau */
     ctx.fillStyle='rgba(120,75,30,0.25)';
     ctx.beginPath();ctx.ellipse(-s*0.10,-s*2.02,s*0.20,s*0.08,-0.3,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    /* ── Dessiner Buzz ── */
    function drawBuzz(bx,by,swing){
     const s=W*0.095;
     ctx.save();ctx.translate(bx,by);
     ctx.rotate(Math.sin(swing+1.5)*0.022);

     /* Jambes blanches/grises */
     ctx.fillStyle='rgba(225,222,215,0.97)';
     ctx.beginPath();ctx.roundRect(-s*0.30,0,s*0.25,s*0.52,3);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.05,0,s*0.25,s*0.52,3);ctx.fill();
     /* Genouillères violettes */
     ctx.fillStyle='rgba(110,60,165,0.90)';
     ctx.beginPath();ctx.roundRect(-s*0.30,s*0.14,s*0.25,s*0.11,2);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.05,s*0.14,s*0.25,s*0.11,2);ctx.fill();
     /* Bottes blanches */
     ctx.fillStyle='rgba(210,208,202,0.97)';
     ctx.beginPath();ctx.roundRect(-s*0.34,s*0.44,s*0.30,s*0.15,4);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.04,s*0.44,s*0.30,s*0.15,4);ctx.fill();

     /* Corps principal blanc/gris */
     ctx.fillStyle='rgba(228,225,218,0.98)';
     ctx.beginPath();ctx.roundRect(-s*0.46,-s*0.95,s*0.92,s*1.0,6);ctx.fill();
     /* Panneau central vert */
     ctx.fillStyle='rgba(55,155,60,0.95)';
     ctx.beginPath();ctx.roundRect(-s*0.28,-s*0.88,s*0.56,s*0.65,4);ctx.fill();
     /* Détails verts latéraux */
     ctx.fillStyle='rgba(45,135,50,0.90)';
     ctx.beginPath();ctx.roundRect(-s*0.46,-s*0.85,s*0.15,s*0.55,3);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.31,-s*0.85,s*0.15,s*0.55,3);ctx.fill();

     /* Étoile dorée sur poitrine */
     ctx.fillStyle='rgba(235,185,30,0.97)';
     ctx.save();ctx.translate(s*0.12,-s*0.68);
     ctx.beginPath();
     for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2;const r2=i%2===0?s*0.16:s*0.075;i===0?ctx.moveTo(Math.cos(a)*r2,Math.sin(a)*r2):ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);}
     ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(180,130,10,0.60)';ctx.lineWidth=1;ctx.stroke();
     ctx.restore();

     /* Boutons colorés */
     ctx.fillStyle='rgba(215,35,28,0.95)';ctx.beginPath();ctx.arc(-s*0.14,-s*0.55,s*0.072,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(150,20,15,0.60)';ctx.lineWidth=1.2;ctx.stroke();
     ctx.fillStyle='rgba(35,95,210,0.95)';ctx.beginPath();ctx.arc(-s*0.14,-s*0.38,s*0.058,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(20,60,160,0.60)';ctx.stroke();
     ctx.fillStyle='rgba(40,175,55,0.95)';ctx.beginPath();ctx.arc(-s*0.14,-s*0.24,s*0.050,0,Math.PI*2);ctx.fill();

     /* Ailes translucides */
     ctx.fillStyle='rgba(180,225,250,0.35)';
     ctx.save();ctx.translate(-s*0.52,-s*0.55);ctx.rotate(-0.25);
     ctx.beginPath();ctx.ellipse(0,0,s*0.52,s*0.16,0,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(140,200,240,0.45)';ctx.lineWidth=1;ctx.stroke();ctx.restore();
     ctx.save();ctx.translate(s*0.52,-s*0.55);ctx.rotate(0.25);
     ctx.beginPath();ctx.ellipse(0,0,s*0.52,s*0.16,0,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(140,200,240,0.45)';ctx.lineWidth=1;ctx.stroke();ctx.restore();

     /* Casque anneau gris */
     ctx.fillStyle='rgba(175,172,165,0.97)';
     ctx.beginPath();ctx.arc(0,-s*1.22,s*0.52,0,Math.PI*2);ctx.fill();
     /* Visière violette/mauve */
     const vg2=ctx.createRadialGradient(-s*0.10,-s*1.28,3,0,-s*1.22,s*0.36);
     vg2.addColorStop(0,'rgba(125,100,210,0.90)');vg2.addColorStop(0.6,'rgba(80,55,165,0.85)');vg2.addColorStop(1,'rgba(50,30,120,0.80)');
     ctx.fillStyle=vg2;ctx.beginPath();ctx.arc(0,-s*1.22,s*0.36,0,Math.PI*2);ctx.fill();
     /* Reflet visière */
     ctx.fillStyle='rgba(200,190,255,0.18)';ctx.beginPath();ctx.ellipse(-s*0.10,-s*1.34,s*0.18,s*0.10,-0.3,0,Math.PI*2);ctx.fill();

     /* Yeux bleus vifs */
     for(const ex of [-s*0.13,s*0.13]){
      ctx.fillStyle='rgba(255,255,255,0.95)';ctx.beginPath();ctx.ellipse(ex,-s*1.22,s*0.092,s*0.085,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(30,110,210,0.97)';ctx.beginPath();ctx.arc(ex,-s*1.22,s*0.058,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(8,5,5,0.97)';ctx.beginPath();ctx.arc(ex+s*0.02,-s*1.24,s*0.032,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.72)';ctx.beginPath();ctx.arc(ex-s*0.025,-s*1.26,s*0.018,0,Math.PI*2);ctx.fill();
     }
     /* Sourcils expressifs */
     ctx.strokeStyle='rgba(25,20,20,0.88)';ctx.lineWidth=2.5;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-s*0.22,-s*1.34);ctx.quadraticCurveTo(-s*0.13,-s*1.38,-s*0.04,-s*1.34);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.04,-s*1.34);ctx.quadraticCurveTo(s*0.13,-s*1.38,s*0.22,-s*1.34);ctx.stroke();
     /* Sourire */
     ctx.strokeStyle='rgba(25,20,20,0.75)';ctx.lineWidth=2.0;
     ctx.beginPath();ctx.moveTo(-s*0.16,-s*1.10);ctx.quadraticCurveTo(0,-s*0.98,s*0.16,-s*1.10);ctx.stroke();

     ctx.restore();
    }

    /* ── Dessiner la balle (rouge à rayures blanches) ── */
    /* ── Dessiner la balle Pixar (jaune + bande bleue + étoile rouge) ── */
    function drawBall(bx,by,r){
     ctx.save();ctx.translate(bx,by);
     /* Clip circulaire */
     ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();

     /* Corps jaune vif */
     const yg=ctx.createRadialGradient(-r*0.15,-r*0.20,r*0.05,-r*0.05,-r*0.05,r*1.2);
     yg.addColorStop(0,'rgba(255,235,30,1.0)');yg.addColorStop(0.5,'rgba(240,210,10,1.0)');yg.addColorStop(1,'rgba(200,165,0,1.0)');
     ctx.fillStyle=yg;ctx.fillRect(-r,-r,r*2,r*2);

     /* Bande bleue turquoise — bande verticale gauche ~25% */
     ctx.fillStyle='rgba(38,175,195,1.0)';
     ctx.fillRect(-r,-r,r*0.52,r*2);
     /* Transition douce bande/jaune */
     const bandGrad=ctx.createLinearGradient(-r*0.52+r*0.40,0,-r*0.52+r*0.52,0);
     bandGrad.addColorStop(0,'rgba(38,175,195,0)');bandGrad.addColorStop(1,'rgba(38,175,195,0)');
     ctx.fillStyle=bandGrad;ctx.fillRect(-r*0.12,-r,r*0.12,r*2);

     /* Grande étoile rouge à 5 branches centrée légèrement à droite */
     ctx.fillStyle='rgba(218,40,35,1.0)';
     ctx.save();ctx.translate(r*0.15,0);
     ctx.beginPath();
     for(let i=0;i<10;i++){
      const a=i*Math.PI/5-Math.PI/2;
      const rad=i%2===0?r*0.62:r*0.28;
      i===0?ctx.moveTo(Math.cos(a)*rad,Math.sin(a)*rad):ctx.lineTo(Math.cos(a)*rad,Math.sin(a)*rad);
     }
     ctx.closePath();ctx.fill();
     /* Reflet sur l'étoile */
     ctx.fillStyle='rgba(255,120,110,0.30)';
     ctx.beginPath();
     for(let i=0;i<10;i++){
      const a=i*Math.PI/5-Math.PI/2;
      const rad=i%2===0?r*0.62:r*0.28;
      i===0?ctx.moveTo(Math.cos(a)*rad,Math.sin(a)*rad):ctx.lineTo(Math.cos(a)*rad,Math.sin(a)*rad);
     }
     ctx.closePath();ctx.fill();
     ctx.restore();

     /* Reflet global brillant */
     const rfl=ctx.createRadialGradient(-r*0.25,-r*0.30,r*0.02,-r*0.18,-r*0.22,r*0.58);
     rfl.addColorStop(0,'rgba(255,255,255,0.52)');rfl.addColorStop(0.4,'rgba(255,255,255,0.18)');rfl.addColorStop(1,'rgba(255,255,255,0)');
     ctx.fillStyle=rfl;ctx.fillRect(-r,-r,r*2,r*2);

     ctx.restore();
    }

    /* ── Dessiner le parquet ── */
    function drawFloor(){
     /* Base bois */
     const fg=ctx.createLinearGradient(0,floorY,0,H);
     fg.addColorStop(0,'rgba(192,148,85,1.0)');
     fg.addColorStop(0.3,'rgba(172,128,68,1.0)');
     fg.addColorStop(1,'rgba(140,100,48,1.0)');
     ctx.fillStyle=fg;ctx.fillRect(0,floorY,W,H-floorY);
     /* Lames de parquet */
     const lameH=H*0.038;
     ctx.strokeStyle='rgba(120,85,35,0.30)';ctx.lineWidth=1;
     for(let ly=floorY;ly<H;ly+=lameH){
      ctx.beginPath();ctx.moveTo(0,ly);ctx.lineTo(W,ly);ctx.stroke();
     }
     /* Joints verticaux décalés */
     const lameW=W*0.28;
     for(let row=0,ly=floorY;ly<H;ly+=lameH,row++){
      const offset=row%2?lameW*0.5:0;
      for(let lx=offset-lameW;lx<W;lx+=lameW){
       ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(lx,ly+lameH);ctx.stroke();
      }
     }
     /* Ombre au pied du mur */
     const shadow=ctx.createLinearGradient(0,floorY,0,floorY+H*0.04);
     shadow.addColorStop(0,'rgba(0,0,0,0.22)');shadow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shadow;ctx.fillRect(0,floorY,W,H*0.04);
    }

    function frame(){
     if(stop.v)return;

     /* ── FOND — ciel bleu chambre d'Andy ── */
     const skyG=ctx.createLinearGradient(0,0,0,floorY);
     skyG.addColorStop(0,'rgba(90,155,220,1.0)');
     skyG.addColorStop(0.5,'rgba(110,172,232,1.0)');
     skyG.addColorStop(1,'rgba(130,188,238,1.0)');
     ctx.fillStyle=skyG;ctx.fillRect(0,0,W,floorY);

     /* ── PAPIER PEINT NUAGES — défilement lent ── */
     for(const wc of wallClouds){
      wc.x+=wc.spd;
      if(wc.x>W+cw)wc.x=-cw;
      if(cloudImg){
       ctx.globalAlpha=0.72;
       ctx.drawImage(cloudImg,wc.x,wc.y,cw,ch);
       ctx.globalAlpha=1;
      } else {
       /* Fallback ellipse si OffscreenCanvas non dispo */
       ctx.fillStyle='rgba(229,234,237,0.55)';
       ctx.beginPath();ctx.ellipse(wc.x+cw*0.5,wc.y+ch*0.5,cw*0.5,ch*0.4,0,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── PARQUET ── */
     drawFloor();

     /* ── ÉTOILES scintillantes ── */
     for(const st of stars){
      st.ph+=st.spd;
      const alpha=0.15+Math.abs(Math.sin(st.ph))*0.70;
      const size=st.r*(0.6+Math.abs(Math.sin(st.ph))*0.8);
      ctx.save();ctx.translate(st.x,st.y);
      /* Petite étoile à 4 branches */
      ctx.fillStyle=`rgba(${st.col},${alpha})`;
      ctx.beginPath();
      for(let i=0;i<8;i++){
       const a=i*Math.PI/4;
       const r2=i%2===0?size:size*0.38;
       i===0?ctx.moveTo(Math.cos(a)*r2,Math.sin(a)*r2):ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);
      }
      ctx.closePath();ctx.fill();
      ctx.restore();
     }

     /* ── CONFETTIS ── */
     for(const cf of confetti){
      cf.x+=cf.vx;cf.y+=cf.vy;cf.rot+=cf.vrot;
      if(cf.y>H){cf.y=-10;cf.x=Math.random()*W;}
      ctx.save();ctx.translate(cf.x,cf.y);ctx.rotate(cf.rot);
      ctx.fillStyle=`rgba(${cf.col},0.75)`;
      ctx.fillRect(-cf.w*0.5,-cf.h*0.5,cf.w,cf.h);
      ctx.restore();
     }

     /* ── BALLE rebondissante ── */
     ball.x+=ball.vx;
     if(ball.x>W-ball.r){ball.x=W-ball.r;ball.vx*=-1;}
     if(ball.x<ball.r){ball.x=ball.r;ball.vx*=-1;}
     /* Légère oscillation verticale (rebond doux) */
     ball.y=floorY-ball.r-Math.abs(Math.sin(t*1.8))*H*0.04;
     drawBall(ball.x,ball.y,ball.r);

     /* ── WOODY & BUZZ avec idle oscillation ── */
     const swing=t*1.2;
     drawWoody(cx-W*0.24,floorY,swing);
     drawBuzz(cx+W*0.24,floorY,swing);

     /* ── VIGNETTE ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.08,cx,H*0.48,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(0,0,0,0.08)');
     vg.addColorStop(1,'rgba(0,0,0,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
