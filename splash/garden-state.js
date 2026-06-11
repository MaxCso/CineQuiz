// CinéQuiz splash chunk — Garden State
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Garden State"]={
   name:'Garden State',
   color:'80,120,80',
   ref:'Garden State \u2014 Zach Braff, 2004',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── CSS ── */
    let _gs=document.getElementById('_gs_s');
    if(!_gs){_gs=document.createElement('style');_gs.id='_gs_s';document.head.appendChild(_gs);}
    _gs.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{
       color:rgba(230,218,168,0.92)!important;
       text-shadow:0 2px 16px rgba(0,0,0,0.95),0 0 28px rgba(20,60,30,0.6)!important;
     }
     #splash-film-logo{
       filter:drop-shadow(0 4px 20px rgba(0,0,0,0.95)) drop-shadow(0 0 10px rgba(80,140,60,0.25))!important;
     }
    `;
    const _gsW=setInterval(()=>{if(stop.v){_gs.textContent='';clearInterval(_gsW);}},200);

    /* ── Charger le SVG de la silhouette ── */
    let silhouetteImg=null;
    let silLoaded=false;
    const img=new Image();
    img.onload=()=>{silhouetteImg=img;silLoaded=true;};
    img.onerror=()=>{silLoaded=true;}; // continue sans SVG si erreur
    img.src='images/Garden.svg';

    /* ── Pétales / fleurs dorées qui tombent ── */
    const petals=Array.from({length:38},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vy:0.18+Math.random()*0.32,
     vx:(Math.random()-0.5)*0.12,
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.018,
     size:W*(0.006+Math.random()*0.010),
     op:0.35+Math.random()*0.45,
     ph:Math.random()*Math.PI*2,
     type:Math.floor(Math.random()*3), // 0=trèfle, 1=fleur, 2=feuille
    }));

    /* ── Ondulation du fond ── */
    let waveOffset=0;

    /* ── Dessin d'une volute florale — version dense ── */
    function drawScroll(ox,oy,sc,baseAngle,depth){
     if(depth>4)return;
     ctx.save();
     ctx.translate(ox,oy);
     ctx.rotate(baseAngle);

     const len=W*0.062*sc;
     const curlR=len*0.20;

     /* Tige principale — courbe plus ample */
     const stemAlpha=0.88-depth*0.10;
     const stemR=22+depth*5, stemG=52+depth*12, stemB=18+depth*4;
     ctx.strokeStyle=`rgba(${stemR},${stemG},${stemB},${stemAlpha})`;
     ctx.lineWidth=Math.max(0.5, W*(0.0048-depth*0.0008)*sc);
     ctx.lineCap='round';ctx.lineJoin='round';
     ctx.beginPath();
     ctx.moveTo(0,0);
     ctx.bezierCurveTo(len*0.22,-len*0.18, len*0.52,-len*0.26, len*0.72,-len*0.12);
     ctx.bezierCurveTo(len*0.88,-len*0.02, len*0.96, len*0.10, len*0.88, len*0.22);
     ctx.stroke();

     /* Vrille en spirale au bout */
     ctx.beginPath();
     for(let ai=0;ai<Math.PI*1.6;ai+=0.08){
      const rr=curlR*(1-ai/(Math.PI*1.6));
      const xx=len*0.88+curlR*0.3+Math.cos(Math.PI*0.9-ai)*rr;
      const yy=len*0.22+Math.sin(Math.PI*0.9-ai)*rr;
      ai===0?ctx.moveTo(xx,yy):ctx.lineTo(xx,yy);
     }
     ctx.stroke();

     /* Feuilles — 3 paires plus organiques */
     const leafPositions=[0.28,0.50,0.72];
     for(let fi=0;fi<leafPositions.length;fi++){
      const fp=leafPositions[fi];
      /* Position sur la tige (interpolation cubique manuelle) */
      const bx=3*(1-fp)*(1-fp)*fp*(len*0.22)+(3*(1-fp)*fp*fp*(len*0.52))+(fp*fp*fp*(len*0.72));
      const by=3*(1-fp)*(1-fp)*fp*(-len*0.18)+(3*(1-fp)*fp*fp*(-len*0.26))+(fp*fp*fp*(-len*0.12));
      for(const side of[-1,1]){
       const fAngle=(side>0?-0.65:0.55)+(fi*0.25);
       const fLen=len*(0.28+fi*0.04);
       const lr=20+depth*4, lg=48+depth*10, lb=16+depth*3;
       ctx.fillStyle=`rgba(${lr},${lg},${lb},${0.80-depth*0.08})`;
       ctx.beginPath();
       ctx.moveTo(bx,by);
       ctx.bezierCurveTo(
        bx+Math.cos(fAngle)*fLen*0.45,by+Math.sin(fAngle)*fLen*0.35,
        bx+Math.cos(fAngle+0.2*side)*fLen*0.82,by+Math.sin(fAngle+0.2*side)*fLen*0.72,
        bx+Math.cos(fAngle)*fLen,by+Math.sin(fAngle)*fLen
       );
       ctx.bezierCurveTo(
        bx+Math.cos(fAngle+0.55*side)*fLen*0.55,by+Math.sin(fAngle+0.55*side)*fLen*0.45,
        bx+Math.cos(fAngle+0.35*side)*fLen*0.22,by+Math.sin(fAngle+0.35*side)*fLen*0.15,
        bx,by
       );
       ctx.closePath();ctx.fill();
       /* Nervure centrale */
       ctx.strokeStyle=`rgba(${lr+8},${lg+10},${lb+6},${0.45-depth*0.06})`;
       ctx.lineWidth=Math.max(0.3,W*0.0014*sc);
       ctx.beginPath();ctx.moveTo(bx,by);
       ctx.lineTo(bx+Math.cos(fAngle)*fLen*0.88,by+Math.sin(fAngle)*fLen*0.88);
       ctx.stroke();
      }
     }

     /* Fleur dorée au bout — plus détaillée */
     if(depth<3){
      const fx2=len*0.88+curlR*0.3, fy2=len*0.22;
      const fr=W*(0.007-depth*0.001)*sc;
      const nPetals=depth===0?5:4;
      for(let pi=0;pi<nPetals;pi++){
       const pa=(pi/nPetals)*Math.PI*2;
       const pr1=165+depth*18, pg1=132+depth*14, pb1=42+depth*8;
       ctx.fillStyle=`rgba(${pr1},${pg1},${pb1},${0.72-depth*0.08})`;
       ctx.beginPath();
       ctx.ellipse(
        fx2+Math.cos(pa)*fr*1.5,fy2+Math.sin(pa)*fr*1.5,
        fr*0.90,fr*0.42,pa+Math.PI*0.1,0,Math.PI*2
       );ctx.fill();
      }
      /* Cœur */
      ctx.fillStyle=`rgba(215,182,65,${0.88-depth*0.08})`;
      ctx.beginPath();ctx.arc(fx2,fy2,fr*0.55,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(235,210,90,${0.65-depth*0.06})`;
      ctx.beginPath();ctx.arc(fx2-fr*0.12,fy2-fr*0.12,fr*0.22,0,Math.PI*2);ctx.fill();
     }

     /* Branches récursives — plus nombreuses */
     if(depth<3){
      drawScroll(len*0.30,-len*0.14,sc*0.58,baseAngle-1.05,depth+1);
      drawScroll(len*0.55,-len*0.20,sc*0.48,baseAngle+0.95,depth+1);
      if(depth<2)drawScroll(len*0.75,-len*0.08,sc*0.38,baseAngle-0.55,depth+2);
     }
     ctx.restore();
    }

    /* ── Motif mural complet — plus dense ── */
    function drawWallpaper(){
     /* Fond vert sombre profond */
     const bgG=ctx.createLinearGradient(0,0,0,H);
     bgG.addColorStop(0,'rgba(10,22,13,1)');
     bgG.addColorStop(0.35,'rgba(14,30,17,1)');
     bgG.addColorStop(0.68,'rgba(12,26,15,1)');
     bgG.addColorStop(1,'rgba(8,18,10,1)');
     ctx.fillStyle=bgG;ctx.fillRect(0,0,W,H);

     /* Légère pulsation centrale */
     const paperG=ctx.createRadialGradient(cx,H*0.50,0,cx,H*0.50,W*0.80);
     paperG.addColorStop(0,`rgba(26,50,28,${0.28+Math.sin(t*0.06)*0.03})`);
     paperG.addColorStop(0.55,'rgba(18,36,20,0.10)');
     paperG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=paperG;ctx.fillRect(0,0,W,H);

     /* Grille de volutes — 5 cols × 8 rows, très serrée */
     const cols=5, rows=8;
     const cellW=W/cols, cellH=H/rows;
     for(let row=0;row<rows;row++){
      for(let col=0;col<cols;col++){
       /* Léger mouvement de "respiration" du papier peint */
       const breathX=Math.sin(t*0.07+row*0.62+col*0.44)*W*0.003;
       const breathY=Math.sin(t*0.065+col*0.55+row*0.38)*H*0.002;
       const ox=cellW*(col+0.5)+breathX;
       const oy=cellH*(row+0.5)+breathY;
       const sc=0.72+Math.sin(t*0.045+col*1.1+row*0.9)*0.04;
       const angle=(col+row)%2===0 ? 0.12 : Math.PI+0.12;
       /* Volute principale */
       drawScroll(ox,oy,sc,angle,0);
       /* Miroir horizontal — remplit l'espace entre les volutes */
       ctx.save();ctx.translate(ox,oy);ctx.scale(-1,1);
       drawScroll(0,0,sc,angle+0.06,0);
       ctx.restore();
       /* Petite volute de remplissage entre les cases */
       if(row<rows-1&&col<cols-1){
        const mx=ox+cellW*0.50, my=oy+cellH*0.50;
        drawScroll(mx,my,sc*0.42,angle+Math.PI*0.5,2);
       }
      }
     }
    }

    /* ── Appliques murales (gauche et droite) ── */
    function drawSconces(){
     const scY=H*0.34;
     for(const side of[-1,1]){
      const sx=cx+side*W*0.38;
      ctx.save();ctx.translate(sx,scY);

      // Bras horizontal
      ctx.strokeStyle='rgba(160,125,55,0.80)';
      ctx.lineWidth=W*0.008;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-side*W*0.06,0);ctx.stroke();
      // Tête de l'applique (support)
      ctx.fillStyle='rgba(150,115,48,0.80)';
      ctx.beginPath();ctx.arc(-side*W*0.06,0,W*0.012,0,Math.PI*2);ctx.fill();
      // Abat-jour
      ctx.fillStyle='rgba(190,155,68,0.65)';
      ctx.beginPath();
      ctx.moveTo(-side*W*0.06-W*0.010,-W*0.020);
      ctx.lineTo(-side*W*0.06+W*0.010,-W*0.020);
      ctx.lineTo(-side*W*0.06+W*0.014,W*0.012);
      ctx.lineTo(-side*W*0.06-W*0.014,W*0.012);
      ctx.closePath();ctx.fill();
      // Lueur de l'ampoule
      const lampG=ctx.createRadialGradient(-side*W*0.06,W*0.004,0,-side*W*0.06,W*0.004,W*0.055);
      lampG.addColorStop(0,`rgba(240,210,140,${0.35+Math.sin(t*0.15)*0.04})`);
      lampG.addColorStop(0.4,`rgba(190,155,80,${0.12})`);
      lampG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lampG;ctx.fillRect(-side*W*0.06-W*0.055,-W*0.055,W*0.110,W*0.110);

      ctx.restore();
     }
    }

    /* ── Pétale ── */
    function drawPetal(p){
     ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
     const s=p.size;
     const pulse=0.85+Math.sin(p.ph)*0.15;

     if(p.type===0){
      // Trèfle à 4 feuilles
      ctx.fillStyle=`rgba(175,145,48,${p.op*pulse})`;
      for(let i=0;i<4;i++){
       const a=(i/4)*Math.PI*2;
       ctx.beginPath();ctx.ellipse(Math.cos(a)*s*0.7,Math.sin(a)*s*0.7,s*0.65,s*0.45,a,0,Math.PI*2);ctx.fill();
      }
      ctx.fillStyle=`rgba(145,115,35,${p.op*pulse*0.6})`;
      ctx.beginPath();ctx.arc(0,0,s*0.22,0,Math.PI*2);ctx.fill();
     } else if(p.type===1){
      // Petite fleur 5 pétales
      ctx.fillStyle=`rgba(195,162,58,${p.op*pulse})`;
      for(let i=0;i<5;i++){
       const a=(i/5)*Math.PI*2;
       ctx.beginPath();ctx.ellipse(Math.cos(a)*s*0.75,Math.sin(a)*s*0.75,s*0.55,s*0.32,a,0,Math.PI*2);ctx.fill();
      }
      ctx.fillStyle=`rgba(220,195,90,${p.op})`;
      ctx.beginPath();ctx.arc(0,0,s*0.28,0,Math.PI*2);ctx.fill();
     } else {
      // Feuille simple
      ctx.fillStyle=`rgba(55,95,42,${p.op*pulse})`;
      ctx.beginPath();
      ctx.moveTo(0,-s);
      ctx.bezierCurveTo(s*0.6,-s*0.5,s*0.7,s*0.2,0,s);
      ctx.bezierCurveTo(-s*0.7,s*0.2,-s*0.6,-s*0.5,0,-s);
      ctx.closePath();ctx.fill();
     }
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── PAPIER PEINT FLORAL ── */
     drawWallpaper();

     /* ── APPLIQUES ── */
     drawSconces();

     /* ── SILHOUETTE SVG ── */
     if(silLoaded&&silhouetteImg){
      const iW=W*0.60, iH=iW*(silhouetteImg.naturalHeight/silhouetteImg.naturalWidth||1.6);
      const ix=cx-iW/2, iy=H*0.37;
      const sway=Math.sin(t*0.20)*W*0.003;
      ctx.save();
      ctx.globalAlpha=0.96;
      ctx.translate(sway,0);
      ctx.drawImage(silhouetteImg,ix,iy,iW,iH);
      ctx.restore();
     }

     /* ── PÉTALES QUI TOMBENT ── */
     for(const p of petals){
      p.y+=p.vy;
      p.x+=p.vx+Math.sin(p.ph+t*0.3)*0.08;
      p.rot+=p.rotSpd;
      p.ph+=0.015;
      if(p.y>H+p.size*2){p.y=-p.size*2;p.x=Math.random()*W;}
      drawPetal(p);
     }

     /* ── VIGNETTE ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.05,cx,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.40,'rgba(8,16,8,0.04)');
     vg.addColorStop(0.65,'rgba(8,16,8,0.35)');
     vg.addColorStop(0.85,'rgba(6,12,6,0.68)');
     vg.addColorStop(1,'rgba(4,8,4,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Bande top */
     const tb=ctx.createLinearGradient(0,0,0,H*0.15);
     tb.addColorStop(0,'rgba(12,22,14,0.92)');
     tb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tb;ctx.fillRect(0,0,W,H*0.15);

     /* Grain subtil */
     for(let i=0;i<22;i++){
      const gv=3+Math.random()*10|0;
      ctx.fillStyle=`rgba(${gv+5},${gv+10},${gv+4},${Math.random()*0.013})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
