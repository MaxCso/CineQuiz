// CinéQuiz splash chunk — Narnia
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Narnia"]={
   name:'Narnia',
   color:'120,180,220',
   ref:'Narnia \u2014 Andrew Adamson, 2005',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : beige chaud du poster ── */
    let _nStyle=document.getElementById('_narnia_splash_style');
    if(!_nStyle){_nStyle=document.createElement('style');_nStyle.id='_narnia_splash_style';document.head.appendChild(_nStyle);}
    _nStyle.textContent=`
      
      
      

    `;
    const _nWatch=setInterval(()=>{if(stop.v){_nStyle.textContent='';clearInterval(_nWatch);}},200);

    /* ── Dimensions armoire — centrée, haute ── */
    const AW=W*0.62;   /* largeur totale */
    const AH=H*0.62;   /* hauteur totale */
    const AX=cx-AW/2;  /* bord gauche */
    const AY=H*0.18;   /* bord haut */
    const ACX=cx;      /* centre X */

    /* ── Flocons qui s'échappent de l'entrebâillement ── */
    const flakes=Array.from({length:38},()=>({
     x:cx+(Math.random()-0.5)*AW*0.12,
     y:AY+AH*0.3+Math.random()*AH*0.5,
     vx:(Math.random()-0.5)*0.55,
     vy:-(0.30+Math.random()*0.55),
     r:Math.random()*2.2+0.5,
     op:0,
     phase:Math.random()*Math.PI*2,
    }));

    /* ── Particules dorées flottant dans la pièce ── */
    const dust=Array.from({length:22},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18,
     vy:-(Math.random()*0.20+0.06),
     r:Math.random()*1.8+0.4,
     op:Math.random()*0.40+0.08,
     phase:Math.random()*Math.PI*2,
    }));

    /* ── Oscillation de la porte ── */
    /* ouverture : 0 = fermée, 1 = ouverte */
    let doorOpen=0, doorDir=1, doorPause=0;

    /* ── Dessine l'armoire ── */
    function drawWardrobe(openAmt){
     const ax=AX,ay=AY,aw=AW,ah=AH;
     const colW=aw*0.130; /* largeur colonne */

     /* --- Corps principal (bois brun-rouge) --- */
     const woodG=ctx.createLinearGradient(ax,ay,ax+aw,ay);
     woodG.addColorStop(0,'rgba(130,62,38,0.97)');
     woodG.addColorStop(0.18,'rgba(162,78,48,0.97)');
     woodG.addColorStop(0.50,'rgba(148,70,44,0.97)');
     woodG.addColorStop(0.82,'rgba(162,78,48,0.97)');
     woodG.addColorStop(1,'rgba(130,62,38,0.97)');
     ctx.fillStyle=woodG;
     ctx.beginPath();ctx.roundRect(ax,ay,aw,ah,4);ctx.fill();

     /* --- Corniche supérieure --- */
     ctx.fillStyle='rgba(100,46,28,0.97)';
     ctx.beginPath();ctx.roundRect(ax-aw*0.02,ay,aw*1.04,ah*0.07,3);ctx.fill();
     ctx.fillStyle='rgba(80,36,20,0.97)';
     ctx.beginPath();ctx.roundRect(ax-aw*0.015,ay+ah*0.005,aw*1.03,ah*0.022,2);ctx.fill();

     /* --- Socle bas --- */
     ctx.fillStyle='rgba(100,46,28,0.97)';
     ctx.beginPath();ctx.roundRect(ax-aw*0.02,ay+ah*0.93,aw*1.04,ah*0.07,3);ctx.fill();

     /* --- Colonne gauche --- */
     function drawColumn(cx2,top,h,w){
      /* Fût strié */
      const cg=ctx.createLinearGradient(cx2-w/2,0,cx2+w/2,0);
      cg.addColorStop(0,'rgba(100,46,28,0.95)');
      cg.addColorStop(0.35,'rgba(170,85,55,0.95)');
      cg.addColorStop(0.65,'rgba(155,75,48,0.95)');
      cg.addColorStop(1,'rgba(100,46,28,0.95)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.roundRect(cx2-w/2,top,w,h,2);ctx.fill();
      /* Stries verticales */
      ctx.strokeStyle='rgba(80,36,20,0.25)';ctx.lineWidth=0.8;
      for(let si=0;si<7;si++){
       const sx=cx2-w/2+si*(w/6.5);
       ctx.beginPath();ctx.moveTo(sx,top+h*0.08);ctx.lineTo(sx,top+h*0.92);ctx.stroke();
      }
      /* Chapiteau haut */
      ctx.fillStyle='rgba(88,40,22,0.97)';
      ctx.beginPath();ctx.roundRect(cx2-w*0.65,top,w*1.30,h*0.08,2);ctx.fill();
      /* Base bas */
      ctx.beginPath();ctx.roundRect(cx2-w*0.65,top+h*0.92,w*1.30,h*0.08,2);ctx.fill();
     }
     const colH=ah*0.80;
     const colTop=ay+ah*0.07;
     drawColumn(ax+colW*0.5,colTop,colH,colW);  /* gauche */
     drawColumn(ax+aw-colW*0.5,colTop,colH,colW);/* droite */

     /* --- Zone centrale : lumière de Narnia entrebâillée --- */
     const doorW=aw*0.48;
     const doorH=ah*0.78;
     const doorY=ay+ah*0.09;
     const doorXL=cx-doorW/2; /* bord gauche de la porte */

     /* Fond lumineux de Narnia — forêt enneigée bleue */
     const narniaG=ctx.createLinearGradient(cx-doorW/2,doorY,cx-doorW/2,doorY+doorH);
     narniaG.addColorStop(0,'rgba(80,120,200,0.95)');
     narniaG.addColorStop(0.25,'rgba(100,160,220,0.95)');
     narniaG.addColorStop(0.55,'rgba(140,195,230,0.90)');
     narniaG.addColorStop(0.78,'rgba(190,215,235,0.92)');
     narniaG.addColorStop(1,'rgba(210,228,240,0.95)');
     ctx.fillStyle=narniaG;
     ctx.beginPath();ctx.rect(cx-doorW/2,doorY,doorW,doorH);ctx.fill();

     /* Arbres de Narnia stylisés en silhouette dans l'ouverture */
     ctx.fillStyle='rgba(30,55,100,0.55)';
     for(let ti=0;ti<8;ti++){
      const tx=cx-doorW/2+ti*doorW/7+(ti%2?doorW*0.04:0);
      const th=doorH*(0.28+Math.sin(ti*1.3)*0.10);
      const tw=doorW*0.038;
      ctx.beginPath();
      ctx.moveTo(tx,doorY+doorH*0.80);
      ctx.lineTo(tx-tw*1.2,doorY+doorH*0.80-th*0.45);
      ctx.lineTo(tx-tw*0.6,doorY+doorH*0.80-th*0.45);
      ctx.lineTo(tx-tw*0.9,doorY+doorH*0.80-th);
      ctx.lineTo(tx+tw*0.9,doorY+doorH*0.80-th);
      ctx.lineTo(tx+tw*0.6,doorY+doorH*0.80-th*0.45);
      ctx.lineTo(tx+tw*1.2,doorY+doorH*0.80-th*0.45);
      ctx.closePath();ctx.fill();
     }
     /* Sol enneigé dans Narnia */
     ctx.fillStyle='rgba(220,232,245,0.75)';
     ctx.beginPath();
     ctx.moveTo(cx-doorW/2,doorY+doorH*0.82);
     for(let xi=0;xi<=doorW;xi+=4){
      ctx.lineTo(cx-doorW/2+xi,doorY+doorH*0.82-Math.sin(xi*0.08)*3);
     }
     ctx.lineTo(cx+doorW/2,doorY+doorH);
     ctx.lineTo(cx-doorW/2,doorY+doorH);
     ctx.closePath();ctx.fill();

     /* --- Porte gauche (fixe) — panneau gauche --- */
     /* Porte droite fixe */
     const pW=doorW*0.49;
     ctx.fillStyle='rgba(148,68,42,0.97)';
     ctx.beginPath();ctx.rect(cx-doorW/2,doorY,pW*0.95,doorH);ctx.fill();
     /* Panneau sculpté gauche */
     function drawPanel(px,py,pw,ph){
      ctx.strokeStyle='rgba(88,38,20,0.55)';ctx.lineWidth=1.5;
      ctx.strokeRect(px+pw*0.08,py+ph*0.06,pw*0.84,ph*0.88);
      ctx.strokeRect(px+pw*0.14,py+ph*0.10,pw*0.72,ph*0.80);
     }
     /* 2 panneaux sur porte gauche */
     drawPanel(cx-doorW/2+pW*0.04,doorY+doorH*0.04,pW*0.88,doorH*0.42);
     drawPanel(cx-doorW/2+pW*0.04,doorY+doorH*0.52,pW*0.88,doorH*0.42);

     /* --- Porte droite — s'entrouvre vers la gauche --- */
     const gapMax=doorW*0.38; /* ouverture max */
     const gap=openAmt*gapMax;
     /* On dessine la porte droite en perspective (s'amincit en s'ouvrant) */
     const rDoorW=pW*(1-openAmt*0.75);
     if(rDoorW>2){
      const rdG=ctx.createLinearGradient(cx,0,cx+rDoorW,0);
      rdG.addColorStop(0,'rgba(120,55,32,0.97)');
      rdG.addColorStop(0.5,'rgba(155,72,45,0.97)');
      rdG.addColorStop(1,'rgba(145,68,42,0.97)');
      ctx.fillStyle=rdG;
      ctx.beginPath();ctx.rect(cx,doorY,rDoorW,doorH);ctx.fill();
      /* Panneau porte droite */
      if(rDoorW>pW*0.3){
       ctx.globalAlpha=Math.max(0,1-openAmt*2.5);
       drawPanel(cx+rDoorW*0.04,doorY+doorH*0.04,rDoorW*0.88,doorH*0.42);
       drawPanel(cx+rDoorW*0.04,doorY+doorH*0.52,rDoorW*0.88,doorH*0.42);
       ctx.globalAlpha=1;
      }
      /* Poignée */
      ctx.fillStyle='rgba(200,160,80,0.90)';
      ctx.beginPath();ctx.arc(cx+rDoorW*0.12,doorY+doorH*0.50,W*0.012,0,Math.PI*2);ctx.fill();
     }

     /* Fente de lumière sur les bords de la porte fermée */
     if(openAmt<0.05){
      const lightOp=0.55*(1-openAmt*20);
      const lg=ctx.createLinearGradient(cx-2,0,cx+3,0);
      lg.addColorStop(0,'rgba(140,195,255,0)');
      lg.addColorStop(0.5,`rgba(140,195,255,${lightOp})`);
      lg.addColorStop(1,'rgba(140,195,255,0)');
      ctx.fillStyle=lg;ctx.fillRect(cx-2,doorY,5,doorH);
     }

     /* Halo de lumière de Narnia qui filtre */
     if(openAmt>0.02){
      const haloW=gap+W*0.04;
      const haloG=ctx.createRadialGradient(cx+gap*0.3,doorY+doorH*0.45,2,cx+gap*0.3,doorY+doorH*0.45,haloW*1.8);
      haloG.addColorStop(0,`rgba(160,210,255,${openAmt*0.45})`);
      haloG.addColorStop(0.40,`rgba(120,180,240,${openAmt*0.12})`);
      haloG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=haloG;ctx.fillRect(0,0,W,H);
     }

     /* Bord intérieur de l'armoire — souligne la profondeur */
     ctx.strokeStyle='rgba(70,30,15,0.45)';ctx.lineWidth=2;
     ctx.strokeRect(ax+colW,ay+ah*0.07,aw-colW*2,ah*0.80);

     /* Ombres portées colonnes sur la porte */
     const shL=ctx.createLinearGradient(ax+colW,0,ax+colW+aw*0.07,0);
     shL.addColorStop(0,'rgba(60,25,12,0.22)');shL.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shL;ctx.fillRect(ax+colW,ay+ah*0.07,aw*0.07,ah*0.80);
     const shR=ctx.createLinearGradient(ax+aw-colW,0,ax+aw-colW-aw*0.07,0);
     shR.addColorStop(0,'rgba(60,25,12,0.22)');shR.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shR;ctx.fillRect(ax+aw-colW-aw*0.07,ay+ah*0.07,aw*0.07,ah*0.80);
    }

    /* ── Dessine le parquet de la pièce ── */
    function drawFloor(){
     const floorY=AY+AH*0.92;
     /* Sol en perspective */
     const fg=ctx.createLinearGradient(0,floorY,0,H);
     fg.addColorStop(0,'rgba(155,130,90,0.95)');
     fg.addColorStop(0.5,'rgba(130,105,70,0.97)');
     fg.addColorStop(1,'rgba(100,80,50,0.98)');
     ctx.fillStyle=fg;ctx.fillRect(0,floorY,W,H-floorY);
     /* Lames de parquet */
     ctx.strokeStyle='rgba(80,60,35,0.22)';ctx.lineWidth=0.8;
     const rows=8;
     for(let ri=0;ri<rows;ri++){
      const fy=floorY+(ri/rows)*(H-floorY);
      ctx.beginPath();ctx.moveTo(0,fy);ctx.lineTo(W,fy);ctx.stroke();
     }
     /* Lignes verticales en perspective (convergentes) */
     for(let vi=0;vi<=8;vi++){
      const vx=W*(vi/8);
      ctx.beginPath();ctx.moveTo(cx+(vx-cx)*0.2,floorY);ctx.lineTo(vx,H);ctx.stroke();
     }
    }

    /* ── Poutres sombres du plafond/murs ── */
    function drawRoom(){
     /* Murs beige */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#c8b878');
     bg.addColorStop(0.45,'#cfc08a');
     bg.addColorStop(1,'#b8a060');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
     /* Poutres diagonales coin haut-gauche */
     ctx.strokeStyle='rgba(70,45,22,0.55)';ctx.lineWidth=W*0.028;ctx.lineCap='square';
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W*0.30,H*0.22);ctx.stroke();
     ctx.beginPath();ctx.moveTo(0,H*0.10);ctx.lineTo(W*0.25,H*0.28);ctx.stroke();
     /* Poutres coin haut-droit */
     ctx.beginPath();ctx.moveTo(W,0);ctx.lineTo(W*0.70,H*0.22);ctx.stroke();
     ctx.beginPath();ctx.moveTo(W,H*0.10);ctx.lineTo(W*0.75,H*0.28);ctx.stroke();
     /* Corniche haute */
     ctx.fillStyle='rgba(80,55,25,0.35)';
     ctx.fillRect(0,0,W,H*0.030);
    }

    function frame(){
     if(stop.v)return;

     /* Pièce */
     drawRoom();
     drawFloor();

     /* Animation porte : oscille doucement ouverte/fermée */
     if(doorPause>0){
      doorPause--;
     } else {
      doorOpen+=doorDir*0.004;
      if(doorOpen>=0.42){doorOpen=0.42;doorDir=-1;doorPause=80;}
      if(doorOpen<=0.0){doorOpen=0;doorDir=1;doorPause=120;}
     }

     /* Armoire */
     drawWardrobe(doorOpen);

     /* Flocons sortant de Narnia */
     for(const f of flakes){
      /* N'apparaissent que quand la porte est ouverte */
      const targetOp=doorOpen>0.05?0.60+Math.random()*0.30:0;
      f.op+=(targetOp-f.op)*0.04;
      f.x+=f.vx+Math.sin(t*0.4+f.phase)*0.18;
      f.y+=f.vy;f.phase+=0.025;
      /* Recyclage */
      if(f.y<-10||f.op<0.02){
       f.x=cx+(Math.random()-0.5)*AW*(0.08+doorOpen*0.25);
       f.y=AY+AH*0.3+Math.random()*AH*0.5;
       f.vx=(Math.random()-0.5)*0.45;
       f.vy=-(0.25+Math.random()*0.45);
      }
      if(f.op<0.01)continue;
      ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(210,230,250,${f.op*(0.55+0.45*Math.sin(f.phase))})`;
      ctx.fill();
     }

     /* Poussière d'or flottant dans la pièce */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.phase+=0.025;
      if(d.y<-10){d.y=H+5;d.x=Math.random()*W;}
      if(d.x<-5)d.x=W+5;if(d.x>W+5)d.x=-5;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(210,175,80,${d.op*(0.4+0.6*Math.abs(Math.sin(d.phase)))})`;
      ctx.fill();
     }

     /* Grain cinématique léger */
     for(let i=0;i<25;i++){
      const g=120+Math.random()*60|0;
      ctx.fillStyle=`rgba(${g+20},${g+15},${g},${Math.random()*0.016})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
