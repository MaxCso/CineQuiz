// CinéQuiz splash chunk — Le Bon, la Brute et le Truand
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Bon, la Brute et le Truand"]={
   name:'Le Bon, la Brute et le Truand',
   color:'200,140,40',
   ref:'Le Bon, la Brute et le Truand \u2014 Sergio Leone, 1966',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';

    /* ── Palette sépia — orbes supprimées ── */
    let _gbuStyle=document.getElementById('_gbu_splash_style');
    if(!_gbuStyle){_gbuStyle=document.createElement('style');_gbuStyle.id='_gbu_splash_style';document.head.appendChild(_gbuStyle);}
    _gbuStyle.textContent=`

      #splash-content-wrap{top:20%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _gbuWatch=setInterval(()=>{if(stop.v){_gbuStyle.textContent='';clearInterval(_gbuWatch);}},200);

    let t=0;
    const cx=W/2;

    /* ── Poussière qui flotte ── */
    const dust=Array.from({length:35},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     r:Math.random()*1.5+0.4,
     vx:(Math.random()-0.5)*0.18,
     vy:-(Math.random()*0.08+0.02),
     op:Math.random()*0.22+0.06,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Vautours / oiseaux qui tournent dans le ciel ── */
    const birds=Array.from({length:5},(_,i)=>({
     /* Chaque oiseau tourne en cercle elliptique */
     cx:W*(0.18+Math.random()*0.55),
     cy:H*(0.12+Math.random()*0.22),
     rx:W*(0.08+Math.random()*0.12),
     ry:H*(0.03+Math.random()*0.04),
     speed:(0.004+Math.random()*0.006)*(Math.random()<0.5?1:-1),
     phase:Math.random()*Math.PI*2,
     size:W*(0.012+Math.random()*0.010),
    }));

    /* ── Tourbillons de sable au sol ── */
    const sandParts=Array.from({length:45},()=>({
     x:Math.random()*W,
     y:H*(0.76+Math.random()*0.18),
     vx:(Math.random()-0.5)*0.8,
     vy:-(Math.random()*0.25+0.05),
     r:Math.random()*2.2+0.5,
     op:Math.random()*0.28+0.06,
     life:Math.random()*80+20,
     maxLife:100,
    }));

    /* ── Herbes sèches au sol ── */
    const groundY=H*0.78;
    const grasses=Array.from({length:28},(_,i)=>({
     x:W*(0.02+i*0.036),
     blades:Array.from({length:3},()=>({
      angle:-0.8+Math.random()*1.6,
      len:H*(0.02+Math.random()*0.04),
      w:1.2+Math.random()*1.0,
     })),
    }));

    /* ── Pré-calcul unique de la structure de l'arbre ── */
    /* Construit une seule fois avec les vraies valeurs de W et H */
    const treeSegs=(function buildTree(){
     const segs=[];
     function addBranch(x1,y1,x2,y2,depth,w){
      if(depth<=0||w<0.8)return;
      segs.push({x1,y1,x2,y2,w,depth});
      if(depth<=1)return;
      const dx=x2-x1, dy=y2-y1;
      const len=Math.sqrt(dx*dx+dy*dy);
      const spread=0.48+depth*0.04;
      const a0=Math.atan2(dy,dx);
      const a1=a0-spread;
      const l1=len*(0.60+Math.random()*0.08);
      addBranch(x2,y2, x2+Math.cos(a1)*l1, y2+Math.sin(a1)*l1, depth-1, w*0.66);
      const a2=a0+spread*0.78;
      const l2=len*(0.54+Math.random()*0.10);
      addBranch(x2,y2, x2+Math.cos(a2)*l2, y2+Math.sin(a2)*l2, depth-1, w*0.60);
      if(depth>=4){
       const l3=len*0.70;
       addBranch(x2,y2, x2+Math.cos(a0-0.10)*l3, y2+Math.sin(a0-0.10)*l3, depth-2, w*0.50);
      }
     }
     addBranch(-W*0.01,-H*0.30, -W*0.22,-H*0.26, 5, W*0.016);
     addBranch( W*0.01,-H*0.38,  W*0.18,-H*0.32, 5, W*0.013);
     addBranch( W*0.01,-H*0.44, -W*0.14,-H*0.50, 4, W*0.010);
     addBranch( W*0.015,-H*0.50, W*0.12,-H*0.56, 4, W*0.009);
     addBranch( W*0.015,-H*0.50,-W*0.02,-H*0.60, 3, W*0.007);
     addBranch( W*0.015,-H*0.50, W*0.03,-H*0.58, 3, W*0.006);
     return segs;
    })();

    /* ── Dessin de l'arbre — utilise les segments pré-calculés ── */
    function drawDeadTree(tx,ty,windSway){
     ctx.save();
     ctx.strokeStyle='rgba(35,15,3,0.98)';
     ctx.lineCap='round'; ctx.lineJoin='round';

     /* Tronc principal — S-curve fixe */
     ctx.lineWidth=W*0.032;
     ctx.beginPath(); ctx.moveTo(tx,ty);
     ctx.bezierCurveTo(
      tx-W*0.02, ty-H*0.18,
      tx+W*0.03, ty-H*0.34,
      tx+W*0.015, ty-H*0.50
     );
     ctx.stroke();
     /* Second segment tronc */
     ctx.lineWidth=W*0.020;
     ctx.beginPath(); ctx.moveTo(tx-W*0.005,ty-H*0.20);
     ctx.bezierCurveTo(
      tx-W*0.015,ty-H*0.28,
      tx+W*0.010,ty-H*0.38,
      tx+W*0.010, ty-H*0.46
     );
     ctx.stroke();

     /* Branches pré-calculées — le vent déplace x proportionnellement à la profondeur */
     for(const s of treeSegs){
      /* Les segments en haut (depth faible) se balancent plus */
      const swFactor=(6-s.depth)/5; /* 0 pour profondeur 5, 1 pour profondeur 1 */
      const sw=windSway*swFactor*0.8;
      ctx.lineWidth=s.w;
      ctx.beginPath();
      ctx.moveTo(tx+s.x1+sw*0.5, ty+s.y1);
      /* Courbe légère pour l'effet vent */
      const mx=(s.x1+s.x2)/2;
      const my=(s.y1+s.y2)/2;
      ctx.quadraticCurveTo(tx+mx+sw*0.8, ty+my, tx+s.x2+sw, ty+s.y2);
      ctx.stroke();
     }

     /* ── CORDE DE PENDU depuis branche gauche ── */
     const ropeX=tx-W*0.16+windSway*0.8;
     const ropeAttachY=ty-H*0.265;
     const ropeSwing=windSway*2.2;
     const ropeLen=H*0.14;
     ctx.strokeStyle='rgba(45,22,5,0.94)';
     ctx.lineWidth=W*0.0055;
     ctx.beginPath(); ctx.moveTo(ropeX,ropeAttachY);
     ctx.bezierCurveTo(
      ropeX+ropeSwing*0.25,ropeAttachY+ropeLen*0.35,
      ropeX+ropeSwing*0.70,ropeAttachY+ropeLen*0.75,
      ropeX+ropeSwing,ropeAttachY+ropeLen
     );
     ctx.stroke();
     /* Nœud coulant */
     const nooseX=ropeX+ropeSwing;
     const nooseY=ropeAttachY+ropeLen;
     const nooseR=W*0.022;
     ctx.beginPath(); ctx.arc(nooseX,nooseY+nooseR,nooseR,0,Math.PI*2); ctx.stroke();
     ctx.beginPath(); ctx.moveTo(nooseX,nooseY); ctx.lineTo(nooseX,nooseY+nooseR*0.5); ctx.stroke();
     ctx.fillStyle='rgba(45,22,5,0.94)';
     ctx.beginPath(); ctx.arc(ropeX,ropeAttachY,W*0.007,0,Math.PI*2); ctx.fill();

     ctx.restore();
    }

    /* ── Dessin de la tombe avec monticule et croix réaliste ── */
    function drawGrave(gx,gy){
     ctx.save();

     /* Monticule de terre */
     const moundW=W*0.14,moundH=H*0.032;
     const moundG=ctx.createRadialGradient(gx,gy,0,gx,gy,moundW*0.7);
     moundG.addColorStop(0,'rgba(52,26,6,0.95)');
     moundG.addColorStop(0.6,'rgba(42,20,4,0.88)');
     moundG.addColorStop(1,'rgba(32,14,2,0)');
     ctx.fillStyle=moundG;
     ctx.beginPath();
     ctx.ellipse(gx,gy,moundW*0.6,moundH,0,0,Math.PI*2);
     ctx.fill();
     /* Relief plus net */
     ctx.fillStyle='rgba(58,30,8,0.60)';
     ctx.beginPath();
     ctx.ellipse(gx,gy-moundH*0.2,moundW*0.38,moundH*0.5,-0.1,0,Math.PI*2);
     ctx.fill();

     /* Petites pierres autour */
     ctx.fillStyle='rgba(45,24,6,0.70)';
     for(let s=0;s<6;s++){
      const sx=gx-moundW*0.5+s*moundW*0.18+Math.sin(s)*W*0.010;
      const sr=W*(0.005+Math.random()*0.007);
      ctx.beginPath();ctx.ellipse(sx,gy+moundH*0.4,sr,sr*0.55,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Croix en bois — proportions western réalistes ── */
     const crossH=H*0.13;           /* montant plus haut */
     const crossW=W*0.018;          /* montant plus fin */
     const crossX=gx, crossY=gy-moundH*0.5;
     /* Traverse à 1/3 du haut — proportion de croix latine */
     const armW=W*0.072, armH=H*0.016;
     const armY=crossY-crossH*0.78;

     /* Ombre portée légèrement décalée */
     ctx.fillStyle='rgba(20,8,0,0.18)';
     ctx.fillRect(crossX-crossW/2+W*0.006,crossY-crossH+H*0.006,crossW,crossH);
     ctx.fillRect(crossX-armW/2+W*0.006,armY+H*0.006,armW,armH);

     /* Montant vertical */
     const woodV=ctx.createLinearGradient(crossX-crossW/2,0,crossX+crossW/2,0);
     woodV.addColorStop(0,'rgba(32,14,2,0.98)');
     woodV.addColorStop(0.28,'rgba(50,24,6,0.98)');
     woodV.addColorStop(0.58,'rgba(43,20,4,0.98)');
     woodV.addColorStop(0.80,'rgba(56,27,7,0.98)');
     woodV.addColorStop(1,'rgba(30,13,2,0.98)');
     ctx.fillStyle=woodV;
     ctx.beginPath(); ctx.roundRect(crossX-crossW/2,crossY-crossH,crossW,crossH,1); ctx.fill();

     /* Traverse horizontale */
     const woodH=ctx.createLinearGradient(0,armY,0,armY+armH);
     woodH.addColorStop(0,'rgba(52,24,6,0.98)');
     woodH.addColorStop(0.5,'rgba(40,18,4,0.98)');
     woodH.addColorStop(1,'rgba(32,14,2,0.98)');
     ctx.fillStyle=woodH;
     ctx.beginPath(); ctx.roundRect(crossX-armW/2,armY,armW,armH,1); ctx.fill();

     /* Clou central visible */
     ctx.fillStyle='rgba(70,42,14,0.95)';
     ctx.beginPath(); ctx.arc(crossX,armY+armH/2,W*0.006,0,Math.PI*2); ctx.fill();
     ctx.fillStyle='rgba(95,62,22,0.65)';
     ctx.beginPath(); ctx.arc(crossX-W*0.002,armY+armH/2-H*0.002,W*0.0025,0,Math.PI*2); ctx.fill();

     /* Veinures bois sur montant */
     ctx.strokeStyle='rgba(22,9,1,0.22)'; ctx.lineWidth=0.6;
     for(let v=0;v<3;v++){
      const vx=crossX-crossW/2+(v+1)*crossW/4;
      ctx.beginPath(); ctx.moveTo(vx,crossY-crossH); ctx.lineTo(vx+W*0.001,crossY); ctx.stroke();
     }
     /* Veinures traverse */
     ctx.strokeStyle='rgba(22,9,1,0.18)';
     for(let v=0;v<2;v++){
      const vy=armY+(v+1)*armH/3;
      ctx.beginPath(); ctx.moveTo(crossX-armW/2,vy); ctx.lineTo(crossX+armW/2,vy+H*0.001); ctx.stroke();
     }

     ctx.restore();
    }

    /* ── Dessin des montagnes en silhouette ── */
    function drawMountains(col,offsetX,scaleH,baseY){
     ctx.fillStyle=col;
     ctx.beginPath();
     ctx.moveTo(-W*0.05,baseY);
     const peaks=[
      [0.05,0.72],[0.14,0.48],[0.22,0.62],[0.32,0.38],[0.40,0.55],
      [0.50,0.32],[0.58,0.52],[0.66,0.40],[0.74,0.58],[0.82,0.35],
      [0.90,0.50],[0.98,0.44],[1.05,0.62],
     ];
     for(const [px,ph] of peaks){
      ctx.lineTo((px+offsetX)*W, baseY-scaleH*ph);
     }
     ctx.lineTo(W*1.05,baseY);
     ctx.closePath();
     ctx.fill();
    }

    /* drawGrave défini ci-dessus — inclut monticule + croix */

    function frame(){
     if(stop.v)return;

     /* ── FOND SÉPIA/PARCHEMIN ── */
     /* Gradient vertical : parchemin clair en haut → brun sombre en bas */
     const breathe=Math.sin(t*0.25)*0.02;
     const bgG=ctx.createLinearGradient(0,0,0,H);
     bgG.addColorStop(0,`rgba(${220+breathe*8|0},${188+breathe*6|0},${130+breathe*4|0},1.0)`);
     bgG.addColorStop(0.35,`rgba(200,162,98,1.0)`);
     bgG.addColorStop(0.65,`rgba(172,128,68,1.0)`);
     bgG.addColorStop(1,`rgba(115,72,28,1.0)`);
     ctx.fillStyle=bgG;ctx.fillRect(0,0,W,H);

     /* Légère texture parchemin — gradient radial central plus clair */
     const paperG=ctx.createRadialGradient(cx,H*0.38,H*0.05,cx,H*0.38,H*0.75);
     paperG.addColorStop(0,`rgba(240,210,155,${0.22+breathe*0.5})`);
     paperG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=paperG;ctx.fillRect(0,0,W,H);

     /* ── MONTAGNES — 3 couches de profondeur ── */
     /* Lointain — plus clair */
     drawMountains('rgba(155,105,48,0.55)',0.05,H*0.22,H*0.62);
     /* Milieu */
     drawMountains('rgba(105,62,22,0.75)',0,H*0.28,H*0.68);
     /* Avant — plus sombre */
     drawMountains('rgba(68,35,8,0.88)',-0.04,H*0.20,H*0.74);

     /* ── SOL désertique ── */
     const groundG=ctx.createLinearGradient(0,groundY,0,H);
     groundG.addColorStop(0,'rgba(58,32,6,0.95)');
     groundG.addColorStop(1,'rgba(38,18,2,0.99)');
     ctx.fillStyle=groundG;ctx.fillRect(0,groundY,W,H-groundY);

     /* ── HERBES SÈCHES ── */
     ctx.strokeStyle='rgba(48,26,4,0.70)';
     for(const g of grasses){
      const windSway=Math.sin(t*0.8+g.x*0.02)*H*0.005;
      for(const b of g.blades){
       ctx.lineWidth=b.w;
       ctx.beginPath();
       ctx.moveTo(g.x,groundY);
       ctx.quadraticCurveTo(
        g.x+Math.sin(b.angle)*b.len*0.5+windSway,
        groundY-b.len*0.55,
        g.x+Math.sin(b.angle)*b.len+windSway,
        groundY-b.len
       );
       ctx.stroke();
      }
     }

     /* ── CACTUS — silhouettes à gauche ── */
     ctx.fillStyle='rgba(42,24,5,0.90)';
     for(const [cax,cay,ch2,hasArm] of [
      [W*0.08, groundY, H*0.18, true],
      [W*0.12, groundY, H*0.12, false],
      [W*0.04, groundY, H*0.09, false],
     ]){
      ctx.beginPath();ctx.roundRect(cax-W*0.016,cay-ch2,W*0.032,ch2,3);ctx.fill();
      if(hasArm){
       ctx.beginPath();ctx.roundRect(cax-W*0.04,cay-ch2*0.60,W*0.022,ch2*0.24,3);ctx.fill();
       ctx.beginPath();ctx.roundRect(cax-W*0.04,cay-ch2*0.60,ch2*0.24,W*0.022,3);ctx.fill();
       ctx.beginPath();ctx.roundRect(cax+W*0.010,cay-ch2*0.42,W*0.022,ch2*0.20,3);ctx.fill();
       ctx.beginPath();ctx.roundRect(cax+W*0.010,cay-ch2*0.42,ch2*0.20,W*0.020,3);ctx.fill();
      }
     }

     /* ── TOMBE — monticule + croix en bois ── */
     drawGrave(cx-W*0.05, groundY+H*0.012);

     /* ── ARBRE MORT — côté droit ── */
     const windSway=Math.sin(t*0.5)*W*0.006;
     drawDeadTree(W*0.75,groundY,windSway);

     /* ── OISEAUX / VAUTOURS ── */
     ctx.fillStyle='rgba(32,14,2,0.90)';
     for(const b of birds){
      b.phase+=b.speed;
      const bx=b.cx+Math.cos(b.phase)*b.rx;
      const by=b.cy+Math.sin(b.phase)*b.ry;
      const bank=Math.sin(b.phase)*0.5; /* inclinaison en virage */
      const sz=b.size;
      ctx.save();
      ctx.translate(bx,by);
      ctx.rotate(bank);
      /* Silhouette oiseau planant : corps + deux ailes courbées */
      ctx.beginPath();
      /* Corps ovale */
      ctx.ellipse(0,0,sz*0.22,sz*0.10,0,0,Math.PI*2);
      ctx.fill();
      /* Aile gauche — bezier courbé vers le bas (oiseau qui plane) */
      ctx.beginPath();
      ctx.moveTo(-sz*0.05,0);
      ctx.bezierCurveTo(-sz*0.30,sz*0.06,-sz*0.60,sz*0.14,-sz*0.80,sz*0.04);
      ctx.bezierCurveTo(-sz*0.55,sz*0.02,-sz*0.28,-sz*0.04,-sz*0.05,0);
      ctx.fill();
      /* Aile droite */
      ctx.beginPath();
      ctx.moveTo(sz*0.05,0);
      ctx.bezierCurveTo(sz*0.30,sz*0.06,sz*0.60,sz*0.14,sz*0.80,sz*0.04);
      ctx.bezierCurveTo(sz*0.55,sz*0.02,sz*0.28,-sz*0.04,sz*0.05,0);
      ctx.fill();
      /* Queue */
      ctx.beginPath();
      ctx.moveTo(-sz*0.12,sz*0.04);
      ctx.lineTo(-sz*0.22,sz*0.12);
      ctx.lineTo(sz*0.22,sz*0.12);
      ctx.lineTo(sz*0.12,sz*0.04);
      ctx.fill();
      ctx.restore();
     }

     /* ── POUSSIÈRE flottante ── */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.ph+=0.025;
      if(d.y<-5){d.y=H+5;d.x=Math.random()*W;}
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      const da=d.op*(0.4+0.6*Math.abs(Math.sin(d.ph)));
      ctx.fillStyle=`rgba(140,90,30,${da})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── SABLE au sol — tourbillons ── */
     for(const p of sandParts){
      p.x+=p.vx; p.y+=p.vy; p.life--;
      if(p.life<=0){
       p.x=Math.random()*W; p.y=H*(0.77+Math.random()*0.16);
       p.vx=(Math.random()-0.5)*0.8; p.vy=-(Math.random()*0.25+0.05);
       p.life=p.maxLife=60+Math.random()*80; p.op=Math.random()*0.28+0.06;
      }
      const fade=p.life/p.maxLife;
      ctx.fillStyle=`rgba(160,105,40,${p.op*fade})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
     }

     /* ── VIGNETTE sépia — douce, sans bandes latérales ── */
     const vg=ctx.createRadialGradient(cx,H*0.44,H*0.08,cx,H*0.44,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(30,12,0,0.10)');
     vg.addColorStop(1,'rgba(20,6,0,0.42)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     /* ── TEINTE SÉPIA globale ── */
     ctx.fillStyle=`rgba(45,22,4,${0.06+breathe*0.5})`;ctx.fillRect(0,0,W,H);

     /* ── GRAIN PELLICULE vieux western ── */
     for(let i=0;i<70;i++){
      const gv=15+Math.random()*28|0;
      ctx.fillStyle=`rgba(${gv+10},${gv+3},${gv-4},${Math.random()*0.028})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.8+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
