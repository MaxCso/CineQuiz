// CinéQuiz splash chunk — The Shining
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["The Shining"]={
   name:'The Shining',
   color:'180,10,10',
   ref:'The Shining \u2014 Stanley Kubrick, 1980',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;
    let phase=0, phaseT=0;
    let doorOpen=0;   /* 0 = fermé, 1 = ouvert */
    let bloodY=H;

    let _shPos=document.getElementById('_sh_pos_s');
    if(!_shPos){_shPos=document.createElement('style');_shPos.id='_sh_pos_s';document.head.appendChild(_shPos);}
    _shPos.textContent='';
    const _shW=setInterval(()=>{if(stop.v){_shPos.textContent='';clearInterval(_shW);}},200);

    /* ── SVG source : 763 × 582
       On met à l'échelle pour occuper ~72% de la largeur, centré
       Portes : porte gauche x=118→338, porte droite x=425→645
       Jointure (ligne noire) : entre x=338 et x=425
       Les portes glissent vers l'extérieur (G vers la gauche, D vers la droite)
    ── */
    const SVG_W=763, SVG_H=582;
    /* Scaler sur la hauteur pour remplir tout l'écran, centrer horizontalement */
    const drawScale=H/SVG_H;
    const offX=(W-SVG_W*drawScale)/2;
    const offY=0;

    /* Convertit coordonnées SVG → canvas */
    function sx(x){ return offX + x*drawScale; }
    function sy(y){ return offY + y*drawScale; }
    function sw(w){ return w*drawScale; }

    function drawElevator(){
     ctx.save();

     /* Décalage d'ouverture en px canvas pour chaque porte */
     const shift=doorOpen * sw(220) * 0.92; /* 220 = largeur d'une porte en SVG */

     /* ── Fronton rouge sombre (y=0..108) — fixe ── */
     ctx.fillStyle='#3F2626';
     ctx.fillRect(sx(0), sy(0), sw(763), sw(108));

     /* Motifs du fronton : hexagones et flèches (fixes) */
     /* Hexagones */
     ctx.fillStyle='#BD3234';
     function hex(cx2,cy2,r){
      ctx.beginPath();
      for(let i=0;i<6;i++){
       const a=Math.PI/180*(60*i-30);
       i===0?ctx.moveTo(cx2+r*Math.cos(a),cy2+r*Math.sin(a)):ctx.lineTo(cx2+r*Math.cos(a),cy2+r*Math.sin(a));
      }
      ctx.closePath();ctx.fill();
     }
     hex(sx(236),sy(54),sw(33));
     hex(sx(528),sy(54),sw(33));

     /* Flèches */
     function arrow(x1,x2,y1,y2){
      ctx.beginPath();
      ctx.moveTo(sx(x1),sy(y1));ctx.lineTo(sx(x2),sy(y1));
      ctx.lineTo(sx((x1+x2)/2+sw(13)/drawScale),sy((y1+y2)/2));
      ctx.lineTo(sx(x2),sy(y2));ctx.lineTo(sx(x1),sy(y2));
      ctx.lineTo(sx((x1+x2)/2-sw(13)/drawScale),sy((y1+y2)/2));
      ctx.closePath();ctx.fill();
     }
     arrow(71,141,36,71);
     arrow(347,417,36,71);
     arrow(639,709,36,71);

     /* Contour fronton */
     ctx.strokeStyle='#BD3234';ctx.lineWidth=sw(2);
     ctx.strokeRect(sx(6),sy(6),sw(751),sw(96));

     /* ── Bandes latérales sombres (fixes) ── */
     /* Gauche : x=0..118 */
     ctx.fillStyle='#3F2626';
     ctx.fillRect(sx(0),sy(108),sw(118),sw(474));
     /* Droite : x=645..763 */
     ctx.fillRect(sx(645),sy(108),sw(118),sw(474));

     /* ── Porte GAUCHE — glisse vers la gauche ── */
     /* x SVG: 118..338, largeur 220 */
     ctx.save();
     ctx.beginPath();
     ctx.rect(sx(0), sy(108), sx(338)-sx(0)+1, sw(474));
     ctx.clip();
     /* Corps rouge */
     ctx.fillStyle='#BD3234';
     ctx.fillRect(sx(118)-shift, sy(108), sw(220), sw(474));
     /* Ligne noire bord gauche (x=118, 2px) */
     ctx.fillStyle='#000';
     ctx.fillRect(sx(118)-shift-sw(1), sy(108), sw(2), sw(474));
     /* Poignée gauche */
     ctx.fillStyle='#9B8456';
     ctx.beginPath();ctx.roundRect(sx(280)-shift,sy(311),sw(15),sw(49),sw(2));ctx.fill();
     ctx.fillStyle='#D9CC9C';
     ctx.beginPath();ctx.arc(sx(287.5)-shift,sy(335.5),sw(4.5),0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* ── Porte DROITE — glisse vers la droite ── */
     /* x SVG: 425..645, largeur 220 */
     ctx.save();
     ctx.beginPath();
     ctx.rect(sx(425)-1, sy(108), sx(763)-sx(425)+1, sw(474));
     ctx.clip();
     /* Corps rouge */
     ctx.fillStyle='#BD3234';
     ctx.fillRect(sx(425)+shift, sy(108), sw(220), sw(474));
     /* Ligne noire bord droit (x=645, 2px) */
     ctx.fillStyle='#000';
     ctx.fillRect(sx(645)+shift+sw(1), sy(108), sw(2), sw(474));
     /* Poignée droite */
     ctx.fillStyle='#9B8456';
     ctx.beginPath();ctx.roundRect(sx(467)+shift,sy(311),sw(15),sw(49),sw(2));ctx.fill();
     ctx.fillStyle='#D9CC9C';
     ctx.beginPath();ctx.arc(sx(474.5)+shift,sy(335.5),sw(4.5),0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* ── Jointure centrale (ligne noire entre les deux portes) ── */
     /* Visible uniquement quand fermé */
     if(doorOpen<0.02){
      ctx.fillStyle='#000';
      ctx.fillRect(sx(338),sy(108),sw(425-338),sw(474));
      /* Ligne noire fine au centre */
      ctx.fillStyle='#111';
      ctx.fillRect(sx(379),sy(108),sw(5),sw(474));
     }

     /* ── Lueur rouge depuis l'intérieur quand ça s'ouvre ── */
     if(doorOpen>0.05){
      const openPx=shift*2;
      const halo=ctx.createRadialGradient(cx,sy(300),0,cx,sy(300),openPx*3);
      halo.addColorStop(0,`rgba(200,5,5,${doorOpen*0.25})`);
      halo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);
      /* Intérieur rouge sombre — toujours fixe entre x=338 et x=425 */
      ctx.fillStyle=`rgb(${50+doorOpen*30|0},2,2)`;
      ctx.fillRect(sx(338), sy(108), sw(425-338), sw(474));
     }

     /* ── Base/seuil (path trapèze bas, y=441..582) ── */
     ctx.fillStyle='#978864';
     ctx.beginPath();
     ctx.moveTo(sx(338),sy(441));ctx.lineTo(sx(425),sy(441));
     ctx.lineTo(sx(429.26),sy(581));ctx.lineTo(sx(333.74),sy(581));
     ctx.closePath();ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     phaseT+=0.016;
     if(phase===0 && phaseT>3.0){phase=1;phaseT=0;}
     if(phase===1){doorOpen=Math.min(1,phaseT/2.5);if(phaseT>2.5){phase=2;phaseT=0;}}
     if(phase===2){bloodY=Math.max(0,bloodY-(0.35+phaseT*0.12));}

     /* Fond noir */
     ctx.fillStyle='rgb(5,3,3)';
     ctx.fillRect(0,0,W,H);

     /* Murs latéraux sombres */
     const wallL=ctx.createLinearGradient(0,0,W*0.20,0);
     wallL.addColorStop(0,'rgba(6,3,3,1)');wallL.addColorStop(1,'rgba(6,3,3,0)');
     ctx.fillStyle=wallL;ctx.fillRect(0,0,W*0.22,H);
     const wallR=ctx.createLinearGradient(W,0,W*0.80,0);
     wallR.addColorStop(0,'rgba(6,3,3,1)');wallR.addColorStop(1,'rgba(6,3,3,0)');
     ctx.fillStyle=wallR;ctx.fillRect(W*0.78,0,W*0.22,H);

     drawElevator();

     /* Sang */
     if(bloodY<H){
      const bg=ctx.createLinearGradient(0,bloodY,0,H);
      bg.addColorStop(0,`rgba(${155+Math.sin(t*0.4)*10|0},3,3,0.97)`);
      bg.addColorStop(0.3,'rgba(105,1,1,0.99)');
      bg.addColorStop(1,'rgba(55,0,0,1)');
      ctx.fillStyle=bg;
      ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(W,H);ctx.lineTo(W,bloodY);
      for(let x=W;x>=0;x-=4){
       const w=Math.sin(x*0.025+t*0.7)*3+Math.sin(x*0.055+t*0.4)*1.5+Math.sin(x*0.012+t*0.2)*4;
       ctx.lineTo(x,bloodY+w);
      }
      ctx.closePath();ctx.fill();
      const sh=ctx.createLinearGradient(0,bloodY-2,0,bloodY+8);
      sh.addColorStop(0,'rgba(255,40,40,0)');
      sh.addColorStop(0.5,`rgba(255,35,35,${0.15+Math.sin(t*0.9)*0.04})`);
      sh.addColorStop(1,'rgba(180,5,5,0)');
      ctx.fillStyle=sh;
      ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(W,H);ctx.lineTo(W,bloodY-3);
      for(let x=W;x>=0;x-=4){
       const w=Math.sin(x*0.025+t*0.7)*3+Math.sin(x*0.055+t*0.4)*1.5+Math.sin(x*0.012+t*0.2)*4;
       ctx.lineTo(x,bloodY+w);
      }
      ctx.closePath();ctx.fill();
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.18,cx,H*0.50,H*0.72);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.6,'rgba(0,0,0,0.05)');
     vg.addColorStop(1,'rgba(0,0,0,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
