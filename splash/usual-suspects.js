// CinéQuiz splash chunk — Usual Suspects
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Usual Suspects"]={
   name:'Usual Suspects',
   color:'80,60,40',
   ref:'Usual Suspects \u2014 Bryan Singer, 1995',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── CSS ── */
    let _s=document.getElementById('_us_s');
    if(!_s){_s=document.createElement('style');_s.id='_us_s';document.head.appendChild(_s);}
    _s.textContent=[
     '#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}',
     '#splash-content-wrap.reveal{transform:translateY(0)!important;}',
     '#splash-quote-text{color:#000000!important;text-shadow:none!important;}',
    ].join('');
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Géométrie de la salle ── */
    const WALL_TOP=H*0.26;   /* haut du mur de fond */
    const FLOOR_Y =H*0.82;   /* ligne de sol */
    const LINE_H  =H*0.040;  /* espacement des lignes de taille */
    const N_LINES =8;
    const HEIGHTS =['6\'0"','5\'11"','5\'10"','5\'9"','5\'8"','5\'7"','5\'6"','5\'5"'];

    /* ── Faisceau projecteur — balayage lent ── */
    let beamAngle=0; /* -1 à +1, relatif au centre */
    let beamDir=1;
    const BEAM_SPD=0.003;

    /* ── 5 suspects — poses distinctes ── */
    /* Chaque suspect a : x, hauteur, numéro actif/clignote, pose */
    const SUSPECTS=[
     {x:W*0.10, h:H*0.235, pose:'verbose',  numBlink:0, numPh:Math.random()*Math.PI*2},/* Verbal Kint — claudication */
     {x:W*0.27, h:H*0.265, pose:'arms',     numBlink:0, numPh:Math.random()*Math.PI*2},/* McManus — bras croisés */
     {x:W*0.50, h:H*0.250, pose:'straight', numBlink:0, numPh:Math.random()*Math.PI*2},/* Keaton */
     {x:W*0.72, h:H*0.232, pose:'lean',     numBlink:0, numPh:Math.random()*Math.PI*2},/* Hockney */
     {x:W*0.90, h:H*0.258, pose:'hands',    numBlink:0, numPh:Math.random()*Math.PI*2},/* Fenster */
    ];

    /* ── Fumée de cigarette ── */
    const smoke=Array.from({length:28},(_,i)=>({
     x:W*(0.08+Math.random()*0.85),
     y:FLOOR_Y-H*0.04-Math.random()*H*0.08,
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.12+Math.random()*0.22),
     r:W*(0.012+Math.random()*0.020),
     alpha:0.06+Math.random()*0.08,
     life:Math.random(),
     decay:0.003+Math.random()*0.004,
    }));

    /* ── Grain pellicule ── */
    /* Pré-calculé par frame pour perf */

    /* ── Dessiner un suspect selon sa pose ── */
    function drawSuspect(sx,baseY,sh,pose,lit){
     const u=sh;
     /* Sur fond blanc : silhouettes noires nettes */
     const alpha=lit?1.0:0.88;
     const col=`rgba(6,4,2,${alpha})`;
     ctx.save();ctx.translate(sx,baseY);
     ctx.fillStyle=col;ctx.strokeStyle=col;
     ctx.lineCap='round';ctx.lineJoin='round';

     /* ── Fonction utilitaire : silhouette corpo ── */
     /* Dessine torse+hanches en une forme fermée */
     function torso(tw,th,hw,hh,dy){
      /* tw=demi-largeur épaules, th=hauteur torse, hw=demi-largeur hanches, hh=hauteur hanches */
      ctx.beginPath();
      ctx.moveTo(-tw,dy);
      ctx.bezierCurveTo(-tw,dy+th*0.3,-hw,dy+th*0.7,-hw,dy+th);
      ctx.lineTo(-hw,dy+th+hh);ctx.lineTo(hw,dy+th+hh);
      ctx.lineTo(hw,dy+th);
      ctx.bezierCurveTo(hw,dy+th*0.7,tw,dy+th*0.3,tw,dy);
      ctx.closePath();ctx.fill();
     }
     function head(hx,hy,r){
      ctx.beginPath();ctx.arc(hx,hy,r,0,Math.PI*2);ctx.fill();
      /* Cou */
      ctx.fillRect(hx-r*0.28,hy+r*0.85,r*0.56,r*0.55);
     }
     function arm(x1,y1,x2,y2,x3,y3,lw){
      ctx.lineWidth=lw;
      ctx.beginPath();ctx.moveTo(x1,y1);
      ctx.quadraticCurveTo(x2,y2,x3,y3);ctx.stroke();
     }
     function leg(x1,y1,kx,ky,fx,fy,lw){
      ctx.lineWidth=lw;
      ctx.beginPath();ctx.moveTo(x1,y1);
      ctx.quadraticCurveTo(kx,ky,fx,fy);ctx.stroke();
     }

     if(pose==='verbose'){
      /* ── Verbal Kint — claudication, épaule droite basse, légèrement penché ── */
      const headR=u*0.080;
      const shoulderY=-u*0.78;
      /* Tête inclinée côté droit */
      ctx.save();ctx.translate(u*0.04,0);
      head(u*0.04,-u*0.90,headR);
      /* Torse : épaule gauche plus haute */
      ctx.restore();
      ctx.save();ctx.rotate(0.07);
      torso(u*0.155,u*0.28,u*0.105,u*0.12,-u*0.76);
      ctx.restore();
      /* Bras gauche pendant, raide (côté sain) */
      arm(-u*0.155,shoulderY,-u*0.19,-u*0.55,-u*0.17,-u*0.38,u*0.055);
      /* Bras droit légèrement écarté (claudication, cherche équilibre) */
      arm(u*0.155,shoulderY+u*0.04,u*0.26,-u*0.56,u*0.22,-u*0.40,u*0.052);
      /* Jambe gauche normale */
      leg(-u*0.07,-u*0.48,-u*0.09,-u*0.24,-u*0.10,0,u*0.070);
      /* Jambe droite — genou fléchi, pied traîne */
      leg(u*0.07,-u*0.48,u*0.14,-u*0.20,u*0.22,-u*0.02,u*0.065);

     } else if(pose==='arms'){
      /* ── McManus — bras croisés, tête haute, désinvolte ── */
      const headR=u*0.082;
      head(0,-u*0.90,headR);
      torso(u*0.148,u*0.27,u*0.100,u*0.11,-u*0.78);
      /* Bras croisés : bras droit par-dessus le gauche */
      ctx.lineWidth=u*0.055;
      /* Avant-bras gauche vers droite */
      ctx.beginPath();ctx.moveTo(-u*0.148,-u*0.62);ctx.quadraticCurveTo(-u*0.08,-u*0.58,u*0.18,-u*0.54);ctx.stroke();
      /* Avant-bras droit vers gauche, légèrement au-dessus */
      ctx.beginPath();ctx.moveTo(u*0.148,-u*0.65);ctx.quadraticCurveTo(u*0.07,-u*0.61,-u*0.18,-u*0.57);ctx.stroke();
      /* Jambes légèrement écartées, position décontractée */
      leg(-u*0.08,-u*0.48,-u*0.10,-u*0.24,-u*0.09,0,u*0.068);
      leg(u*0.08,-u*0.48,u*0.11,-u*0.24,u*0.10,0,u*0.068);

     } else if(pose==='straight'){
      /* ── Keaton — droit, imposant, bras légèrement écartés ── */
      const headR=u*0.088;
      head(0,-u*0.92,headR);
      torso(u*0.165,u*0.30,u*0.110,u*0.12,-u*0.80);
      /* Bras tombants, légèrement décollés du corps — attitude froide */
      arm(-u*0.165,-u*0.72,-u*0.20,-u*0.54,-u*0.195,-u*0.38,u*0.058);
      arm(u*0.165,-u*0.72,u*0.20,-u*0.54,u*0.195,-u*0.38,u*0.058);
      /* Jambes droites, légèrement écartées */
      leg(-u*0.07,-u*0.48,-u*0.085,-u*0.24,-u*0.09,0,u*0.075);
      leg(u*0.07,-u*0.48,u*0.085,-u*0.24,u*0.09,0,u*0.075);

     } else if(pose==='lean'){
      /* ── Hockney — penché en arrière, une jambe en avant ── */
      const headR=u*0.078;
      ctx.save();ctx.rotate(-0.10);
      head(0,-u*0.89,headR);
      torso(u*0.145,u*0.27,u*0.098,u*0.11,-u*0.77);
      ctx.restore();
      /* Bras droit en appui vers l'arrière */
      arm(-u*0.145,-u*0.68,-u*0.22,-u*0.50,-u*0.28,-u*0.36,u*0.054);
      /* Bras gauche pendant */
      arm(u*0.145,-u*0.68,u*0.18,-u*0.52,u*0.17,-u*0.38,u*0.054);
      /* Jambe gauche avancée */
      leg(-u*0.08,-u*0.48,-u*0.14,-u*0.24,-u*0.22,-u*0.01,u*0.066);
      /* Jambe droite en retrait, légèrement pliée */
      leg(u*0.08,-u*0.48,u*0.08,-u*0.22,u*0.06,0,u*0.066);

     } else {
      /* ── Fenster — mains dans les poches, légèrement voûté ── */
      const headR=u*0.079;
      ctx.save();ctx.rotate(0.04);
      head(0,-u*0.88,headR);
      torso(u*0.140,u*0.26,u*0.100,u*0.11,-u*0.75);
      ctx.restore();
      /* Avant-bras rentrés dans les poches — coudes écartés */
      ctx.lineWidth=u*0.052;
      ctx.beginPath();ctx.moveTo(-u*0.140,-u*0.64);ctx.quadraticCurveTo(-u*0.24,-u*0.50,-u*0.17,-u*0.40);ctx.stroke();
      ctx.beginPath();ctx.moveTo(u*0.140,-u*0.64);ctx.quadraticCurveTo(u*0.24,-u*0.50,u*0.17,-u*0.40);ctx.stroke();
      /* Mains dans les poches — petits renforts ovales sur hanches */
      ctx.beginPath();ctx.ellipse(-u*0.14,-u*0.40,u*0.038,u*0.028,0.3,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(u*0.14,-u*0.40,u*0.038,u*0.028,-0.3,0,Math.PI*2);ctx.fill();
      /* Jambes proches, légèrement fléchies */
      leg(-u*0.06,-u*0.48,-u*0.08,-u*0.24,-u*0.07,0,u*0.066);
      leg(u*0.06,-u*0.48,u*0.08,-u*0.24,u*0.07,0,u*0.066);
     }

     /* Ombre portée au sol */
     if(lit){
      ctx.globalAlpha=0.22;
      ctx.fillStyle='rgba(0,0,0,1)';
      ctx.beginPath();ctx.ellipse(0,0,u*0.15,u*0.025,0,0,Math.PI*2);ctx.fill();
      ctx.globalAlpha=1;
     }

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ══════════════════════════════════════════════
        FOND — salle d'identification policière
        Mur blanc cassé éclatant, sol béton gris,
        plafond sombre, lignes de taille noires nettes
     ══════════════════════════════════════════════ */

     /* Plafond sombre au-dessus du mur */
     const ceiling=ctx.createLinearGradient(0,0,0,WALL_TOP);
     ceiling.addColorStop(0,'#090807');
     ceiling.addColorStop(0.70,'#0e0c0a');
     ceiling.addColorStop(1,'#161310');
     ctx.fillStyle=ceiling;ctx.fillRect(0,0,W,WALL_TOP);

     /* ── Mur blanc cassé — la vraie couleur du film ── */
     /* Léger dégradé vertical pour donner du volume */
     const wall=ctx.createLinearGradient(0,WALL_TOP,0,FLOOR_Y);
     wall.addColorStop(0.00,'#dbd5c8');   /* haut : blanc légèrement grisé */
     wall.addColorStop(0.30,'#e8e2d5');   /* centre : blanc chaud */
     wall.addColorStop(0.65,'#e2dcd0');   /* milieu-bas */
     wall.addColorStop(1.00,'#d4cec3');   /* bas : légèrement plus sombre */
     ctx.fillStyle=wall;ctx.fillRect(0,WALL_TOP,W,FLOOR_Y-WALL_TOP);

     /* Texture peinture mate — micro-stries horizontales très subtiles */
     ctx.save();ctx.globalAlpha=0.025;
     for(let i=0;i<22;i++){
      const ty=WALL_TOP+i*(FLOOR_Y-WALL_TOP)/22;
      const v=215+Math.sin(i*2.3)*8|0;
      ctx.strokeStyle=`rgb(${v},${v-4},${v-10})`;ctx.lineWidth=0.6;
      ctx.beginPath();ctx.moveTo(0,ty);ctx.lineTo(W,ty);ctx.stroke();
     }
     ctx.restore();

     /* Ombres latérales du mur (bords) */
     const wallShadowL=ctx.createLinearGradient(0,WALL_TOP,W*0.10,WALL_TOP);
     wallShadowL.addColorStop(0,'rgba(0,0,0,0.28)');wallShadowL.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=wallShadowL;ctx.fillRect(0,WALL_TOP,W*0.10,FLOOR_Y-WALL_TOP);
     const wallShadowR=ctx.createLinearGradient(W,WALL_TOP,W*0.90,WALL_TOP);
     wallShadowR.addColorStop(0,'rgba(0,0,0,0.28)');wallShadowR.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=wallShadowR;ctx.fillRect(W*0.90,WALL_TOP,W*0.10,FLOOR_Y-WALL_TOP);

     /* ── Sol béton gris-brun — net et réaliste ── */
     const floor=ctx.createLinearGradient(0,FLOOR_Y,0,H);
     floor.addColorStop(0,'#4a4440');
     floor.addColorStop(0.25,'#3e3a36');
     floor.addColorStop(0.60,'#302c28');
     floor.addColorStop(1,'#1a1714');
     ctx.fillStyle=floor;ctx.fillRect(0,FLOOR_Y,W,H-FLOOR_Y);

     /* Jonction mur/sol — plinthe sombre */
     const plinth=ctx.createLinearGradient(0,FLOOR_Y-H*0.008,0,FLOOR_Y+H*0.012);
     plinth.addColorStop(0,'rgba(20,16,12,0)');
     plinth.addColorStop(0.45,'rgba(12,10,8,0.85)');
     plinth.addColorStop(1,'rgba(8,6,4,0)');
     ctx.fillStyle=plinth;ctx.fillRect(0,FLOOR_Y-H*0.008,W,H*0.020);

     /* ── Lignes de taille — noires, nettes, bien lisibles ── */
     /* Bande verticale de graduation à gauche et à droite */
     const MARK_X_L=W*0.040;
     const MARK_X_R=W*0.960;
     const LINE_W_FULL=W*0.920; /* largeur utile de la ligne */

     for(let i=0;i<N_LINES;i++){
      const ly=FLOOR_Y-H*0.18-i*LINE_H;
      if(ly<WALL_TOP+H*0.01)break;

      /* Ligne horizontale principale — noire pleine */
      ctx.strokeStyle='rgba(28,24,20,0.82)';ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(MARK_X_L,ly);ctx.lineTo(MARK_X_R,ly);ctx.stroke();

      /* Petits tirets intermédiaires (demi-pouces) */
      const nTicks=12;
      for(let ti=1;ti<nTicks;ti++){
       const tx=MARK_X_L+ti*(LINE_W_FULL/nTicks);
       const tickH=ti%3===0?LINE_H*0.40:LINE_H*0.22;
       ctx.strokeStyle='rgba(28,24,20,0.55)';ctx.lineWidth=0.7;
       ctx.beginPath();ctx.moveTo(tx,ly);ctx.lineTo(tx,ly+tickH);ctx.stroke();
      }

      /* Étiquettes de taille — police nette, noire */
      ctx.fillStyle='rgba(22,18,14,0.90)';
      ctx.font=`bold ${W*0.022}px 'Arial Narrow',Arial,sans-serif`;
      ctx.textAlign='left';ctx.textBaseline='middle';
      ctx.fillText(HEIGHTS[i],W*0.005,ly);
      ctx.textAlign='right';
      ctx.fillText(HEIGHTS[i],W*0.995,ly);
     }

     /* ── Éclairage fluorescent plafond — 3 tubes ── */
     /* Lumière froide et dure, caractéristique des salles d'interrogatoire */
     const tubePositions=[W*0.25, W*0.50, W*0.75];
     for(const tx2 of tubePositions){
      /* Tube lui-même */
      const tubeG=ctx.createLinearGradient(tx2-W*0.08,WALL_TOP,tx2+W*0.08,WALL_TOP);
      tubeG.addColorStop(0,'rgba(200,200,195,0)');
      tubeG.addColorStop(0.20,'rgba(245,242,230,0.55)');
      tubeG.addColorStop(0.50,'rgba(255,252,240,0.90)');
      tubeG.addColorStop(0.80,'rgba(245,242,230,0.55)');
      tubeG.addColorStop(1,'rgba(200,200,195,0)');
      ctx.fillStyle=tubeG;ctx.fillRect(tx2-W*0.08,WALL_TOP-H*0.012,W*0.16,H*0.008);
      /* Reflet sur le mur sous le tube */
      const tubeWallG=ctx.createRadialGradient(tx2,WALL_TOP,0,tx2,WALL_TOP,W*0.22);
      tubeWallG.addColorStop(0,'rgba(255,252,240,0.14)');
      tubeWallG.addColorStop(0.4,'rgba(240,236,218,0.06)');
      tubeWallG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=tubeWallG;ctx.fillRect(tx2-W*0.25,WALL_TOP,W*0.50,FLOOR_Y-WALL_TOP);
      /* Reflet sur le sol */
      const tubeFG=ctx.createRadialGradient(tx2,FLOOR_Y+H*0.02,0,tx2,FLOOR_Y+H*0.02,W*0.18);
      tubeFG.addColorStop(0,'rgba(180,175,155,0.28)');
      tubeFG.addColorStop(0.5,'rgba(140,135,118,0.10)');
      tubeFG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=tubeFG;ctx.beginPath();ctx.ellipse(tx2,FLOOR_Y+H*0.025,W*0.18,H*0.04,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Faisceau projecteur mobile — plus discret sur fond blanc ── */
     beamAngle+=BEAM_SPD*beamDir;
     if(beamAngle>1.1){beamDir=-1;}
     if(beamAngle<-1.1){beamDir=1;}
     const beamCX=cx+beamAngle*W*0.42;
     const beamW=W*0.28;
     /* Sur fond blanc le cone est très subtil — juste une légère zone plus chaude */
     const coneG=ctx.createLinearGradient(0,WALL_TOP,0,FLOOR_Y);
     coneG.addColorStop(0,`rgba(255,248,220,${0.06+Math.sin(t*0.15)*0.01})`);
     coneG.addColorStop(0.50,'rgba(255,245,210,0.03)');
     coneG.addColorStop(1,'rgba(255,240,200,0.01)');
     ctx.fillStyle=coneG;
     ctx.beginPath();
     ctx.moveTo(beamCX,WALL_TOP);
     ctx.lineTo(beamCX-beamW*0.5,FLOOR_Y);
     ctx.lineTo(beamCX+beamW*0.5,FLOOR_Y);
     ctx.closePath();ctx.fill();

     /* ── Suspects ── */
     for(const sp of SUSPECTS){
      const distBeam=Math.abs(sp.x-beamCX);
      const lit=distBeam<beamW*0.55;
      sp.numPh+=0.025;
      if(lit&&Math.random()<0.003)sp.numBlink=1;
      if(sp.numBlink>0)sp.numBlink=Math.max(0,sp.numBlink-0.015);
      /* Ombre portée au sol — plus visible sur béton clair */
      const shadowG=ctx.createRadialGradient(sp.x,FLOOR_Y+H*0.004,2,sp.x,FLOOR_Y+H*0.004,W*0.065);
      shadowG.addColorStop(0,'rgba(0,0,0,0.40)');shadowG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shadowG;ctx.beginPath();ctx.ellipse(sp.x,FLOOR_Y+H*0.005,W*0.062,W*0.014,0,0,Math.PI*2);ctx.fill();
      drawSuspect(sp.x,FLOOR_Y,sp.h,sp.pose,lit);
     }

     /* ── Numéros peints au sol sous chaque suspect ── */
     /* Style plaque de sol de salle d'identification — chiffres noirs sur fond blanc */
     ctx.textAlign='center';ctx.textBaseline='middle';
     for(let i=0;i<SUSPECTS.length;i++){
      const sp=SUSPECTS[i];
      const distBeam=Math.abs(sp.x-beamCX);
      const lit=distBeam<beamW*0.55;
      const numAlpha=lit
       ? 0.90+Math.sin(t*4+i)*0.08
       : 0.38+sp.numBlink*0.52*(0.5+Math.sin(sp.numPh*6)*0.5);
      const numY=FLOOR_Y+H*0.022;
      /* Plaquette rectangulaire blanche */
      ctx.fillStyle=`rgba(230,224,214,${numAlpha*0.90})`;
      ctx.beginPath();ctx.roundRect(sp.x-W*0.024,numY-H*0.016,W*0.048,H*0.030,2);ctx.fill();
      ctx.strokeStyle=`rgba(80,65,50,${numAlpha*0.55})`;ctx.lineWidth=0.8;
      ctx.beginPath();ctx.roundRect(sp.x-W*0.024,numY-H*0.016,W*0.048,H*0.030,2);ctx.stroke();
      /* Chiffre noir */
      ctx.fillStyle=`rgba(18,14,10,${numAlpha})`;
      ctx.font=`bold ${W*0.030}px 'Arial Narrow',Arial,sans-serif`;
      ctx.fillText(String(i+1),sp.x,numY);
     }

     /* ── Fumée de cigarette — plus visible sur fond clair ── */
     for(const sm of smoke){
      sm.x+=sm.vx;sm.y+=sm.vy;sm.life+=sm.decay;sm.r+=0.18;
      if(sm.life>=1||sm.y<WALL_TOP+H*0.05){
       sm.x=W*(0.06+Math.random()*0.88);
       sm.y=FLOOR_Y-H*0.02-Math.random()*H*0.06;
       sm.life=0;sm.r=W*(0.008+Math.random()*0.012);
      }
      const fade=(1-sm.life);
      const sg=ctx.createRadialGradient(sm.x,sm.y,0,sm.x,sm.y,sm.r);
      sg.addColorStop(0,`rgba(100,90,78,${sm.alpha*fade*0.90})`);
      sg.addColorStop(0.55,`rgba(80,72,62,${sm.alpha*fade*0.40})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sm.x,sm.y,sm.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette — seulement haut/bas, respecte le mur blanc ── */
     /* Haut : fondu plafond sombre vers zone éclairée */
     const vgTop=ctx.createLinearGradient(0,0,0,WALL_TOP+H*0.04);
     vgTop.addColorStop(0,'rgba(0,0,0,0.92)');
     vgTop.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgTop;ctx.fillRect(0,0,W,WALL_TOP+H*0.04);
     /* Bas : sol vers noir */
     const vgBot=ctx.createLinearGradient(0,FLOOR_Y+H*0.08,0,H);
     vgBot.addColorStop(0,'rgba(0,0,0,0)');
     vgBot.addColorStop(1,'rgba(0,0,0,0.95)');
     ctx.fillStyle=vgBot;ctx.fillRect(0,FLOOR_Y+H*0.08,W,H-(FLOOR_Y+H*0.08));
     /* Côtés : très légère ombre pour cadrer sans manger le mur */
     const vgL=ctx.createLinearGradient(0,0,W*0.06,0);
     vgL.addColorStop(0,'rgba(0,0,0,0.55)');vgL.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgL;ctx.fillRect(0,0,W*0.06,H);
     const vgR=ctx.createLinearGradient(W,0,W*0.94,0);
     vgR.addColorStop(0,'rgba(0,0,0,0.55)');vgR.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgR;ctx.fillRect(W*0.94,0,W*0.06,H);

     /* ── Grain pellicule — légèrement plus visible sur blanc ── */
     for(let i=0;i<55;i++){
      const gv=8+Math.random()*20|0;
      ctx.fillStyle=`rgba(${gv},${gv},${gv},${Math.random()*0.022})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.6+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
