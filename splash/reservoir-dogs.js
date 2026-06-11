// CinéQuiz splash chunk — Reservoir Dogs
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Reservoir Dogs"]={
   name:'Reservoir Dogs',
   color:'180,20,20',
   ref:'Reservoir Dogs \u2014 Quentin Tarantino, 1992',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── CSS overrides ── */
    let _rdS=document.getElementById('_rd_s');
    if(!_rdS){_rdS=document.createElement('style');_rdS.id='_rd_s';document.head.appendChild(_rdS);}
    _rdS.textContent=`
     

     
     
     #splash-quote-text{
       color:rgba(238,225,205,0.93)!important;font-size:15px!important;
       line-height:1.65!important;text-align:center!important;
       text-shadow:0 2px 18px rgba(0,0,0,1),0 0 50px rgba(0,0,0,0.95)!important;
     }
     #splash-film-logo{
       max-width:56%!important;
       filter:drop-shadow(0 4px 28px rgba(0,0,0,0.98)) drop-shadow(0 0 10px rgba(180,8,8,0.25))!important;
     }
    `;
    const _rdW=setInterval(()=>{if(stop.v){_rdS.textContent='';clearInterval(_rdW);}},200);

    /* ── 5 personnages — couleurs de cravate différentes ── */
    /* Mr White, Mr Orange, Mr Blonde, Mr Pink, Mr Blue */
    const figures=[
      {xf:-0.34, lean:-0.03, scale:0.94, glasses:false, arm:'down',  tie:'#c80a0a', name:'White'},
      {xf:-0.17, lean: 0.03, scale:0.91, glasses:true,  arm:'up',    tie:'#c86010', name:'Orange'},
      {xf: 0.00, lean:-0.02, scale:1.00, glasses:false, arm:'down',  tie:'#c8c000', name:'Blonde'},
      {xf: 0.17, lean: 0.02, scale:0.93, glasses:false, arm:'side',  tie:'#d060d0', name:'Pink'},
      {xf: 0.34, lean:-0.03, scale:0.89, glasses:true,  arm:'down',  tie:'#1050c8', name:'Blue'},
    ];

    /* ── Entrepôt visible ── */
    function drawWarehouse(){

      /* ── MUR DU FOND — béton gris industriel éclairé ── */
      const wallG=ctx.createLinearGradient(0,0,0,H*0.74);
      wallG.addColorStop(0,'rgba(18,15,13,1)');
      wallG.addColorStop(0.30,'rgba(38,30,22,1)');
      wallG.addColorStop(0.65,'rgba(52,40,28,1)');
      wallG.addColorStop(1,'rgba(44,34,22,1)');
      ctx.fillStyle=wallG;
      ctx.fillRect(0,0,W,H*0.74);

      /* Halo central sur le mur — éclairage projecteur */
      const wallSpot=ctx.createRadialGradient(cx,H*0.40,0,cx,H*0.40,W*0.55);
      wallSpot.addColorStop(0,`rgba(90,68,42,${0.55+Math.sin(t*0.10)*0.05})`);
      wallSpot.addColorStop(0.40,`rgba(60,44,26,${0.30+Math.sin(t*0.10)*0.03})`);
      wallSpot.addColorStop(0.75,'rgba(28,20,12,0.12)');
      wallSpot.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wallSpot;ctx.fillRect(0,0,W,H*0.74);

      /* Lignes horizontales de béton — visibles */
      ctx.strokeStyle='rgba(28,22,15,0.55)';
      ctx.lineWidth=0.8;
      const bH=H*0.032;
      for(let i=0;i<Math.ceil(H*0.74/bH);i++){
        ctx.beginPath();ctx.moveTo(0,i*bH);ctx.lineTo(W,i*bH);ctx.stroke();
      }
      /* Quelques lézardes verticales — texture */
      ctx.strokeStyle='rgba(20,15,10,0.30)';
      ctx.lineWidth=0.5;
      for(let i=0;i<6;i++){
        const cx2=W*0.12+W*0.15*i;
        ctx.beginPath();
        ctx.moveTo(cx2,H*0.05);
        ctx.lineTo(cx2+W*0.008,H*0.22);
        ctx.lineTo(cx2-W*0.005,H*0.35);
        ctx.stroke();
      }

      /* Lambris sombre en bas du mur */
      const dadoG=ctx.createLinearGradient(0,H*0.62,0,H*0.74);
      dadoG.addColorStop(0,'rgba(20,15,10,0)');
      dadoG.addColorStop(1,'rgba(12,9,6,0.70)');
      ctx.fillStyle=dadoG;ctx.fillRect(0,H*0.62,W,H*0.12);

      /* Ligne d'horizon nette */
      ctx.strokeStyle='rgba(55,40,25,0.80)';
      ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(0,H*0.74);ctx.lineTo(W,H*0.74);ctx.stroke();

      /* ── SOL BÉTON — perspective marquée ── */
      const floorG=ctx.createLinearGradient(0,H*0.74,0,H);
      floorG.addColorStop(0,'rgba(42,32,20,1)');
      floorG.addColorStop(0.25,'rgba(32,24,15,1)');
      floorG.addColorStop(0.65,'rgba(20,14,8,1)');
      floorG.addColorStop(1,'rgba(10,7,4,1)');
      ctx.fillStyle=floorG;ctx.fillRect(0,H*0.74,W,H*0.26);

      /* Lignes de fuite — bien visibles */
      const vp={x:cx, y:H*0.74};
      ctx.strokeStyle='rgba(55,42,28,0.45)';
      ctx.lineWidth=1.0;
      const nL=9;
      for(let i=0;i<=nL;i++){
        const bx=(W/nL)*i;
        ctx.beginPath();ctx.moveTo(vp.x,vp.y);ctx.lineTo(bx,H+2);ctx.stroke();
      }
      /* Lignes horizontales sol */
      for(let i=1;i<=5;i++){
        const ly=H*0.74+(H*0.26)*(i/5);
        const alpha=0.35*(1-i/6);
        ctx.strokeStyle=`rgba(50,38,22,${alpha})`;
        ctx.lineWidth=0.8;
        ctx.beginPath();ctx.moveTo(0,ly);ctx.lineTo(W,ly);ctx.stroke();
      }

      /* Reflet sol sous spotlight */
      const shineG=ctx.createRadialGradient(cx,H*0.77,0,cx,H*0.80,W*0.35);
      shineG.addColorStop(0,`rgba(65,48,28,${0.45+Math.sin(t*0.14)*0.06})`);
      shineG.addColorStop(0.5,'rgba(35,25,14,0.18)');
      shineG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shineG;ctx.fillRect(0,H*0.74,W,H*0.26);
    }

    /* ── Éclairage projecteur ── */
    function drawSpotlight(){
      /* Cône depuis le plafond */
      const coneG=ctx.createRadialGradient(cx,-H*0.05,0,cx,H*0.45,W*0.60);
      coneG.addColorStop(0,`rgba(95,72,45,${0.28+Math.sin(t*0.10)*0.04})`);
      coneG.addColorStop(0.20,`rgba(65,48,28,${0.18+Math.sin(t*0.10)*0.03})`);
      coneG.addColorStop(0.50,'rgba(25,18,10,0.08)');
      coneG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=coneG;ctx.fillRect(0,0,W,H);
    }

    /* ── Gouttes de sang ── */
    const drops=Array.from({length:20},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vy:0.4+Math.random()*0.7,
      r:W*(0.004+Math.random()*0.008),
      op:0.50+Math.random()*0.35,
      ph:Math.random()*Math.PI*2,
    }));

    /* ── Taches de sang au sol ── */
    const stains=[
      {x:cx*0.60, y:H*0.80, r:W*0.12, op:0.42},
      {x:cx*1.35, y:H*0.83, r:W*0.09, op:0.28},
      {x:cx*0.92, y:H*0.87, r:W*0.06, op:0.20},
    ];

    /* ── Dessin d'un personnage ── */
    function drawFigure(fig){
      const fx=cx+fig.xf*W;
      const baseY=H*0.77;
      const sc=fig.scale;
      const sh=H*0.215*sc;
      const tieRgb=fig.tie;

      ctx.save();
      ctx.translate(fx, baseY);
      ctx.rotate(fig.lean + Math.sin(t*0.4+fig.xf*3)*0.005);

      /* Ombre au sol */
      const shadowG=ctx.createRadialGradient(0,sh*0.02,0,0,sh*0.02,W*0.055*sc);
      shadowG.addColorStop(0,'rgba(0,0,0,0.60)');
      shadowG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shadowG;
      ctx.beginPath();ctx.ellipse(0,sh*0.02,W*0.055*sc,W*0.014*sc,0,0,Math.PI*2);ctx.fill();

      /* Jambes */
      const legW=W*0.022*sc, legH=sh*0.40, legGap=W*0.018*sc;
      ctx.fillStyle='rgba(7,7,7,1)';
      ctx.beginPath();
      ctx.moveTo(-legGap-legW*0.5,0);ctx.lineTo(-legGap-legW*0.5,legH);
      ctx.lineTo(-legGap+legW*0.5,legH);ctx.lineTo(-legGap+legW*0.5-legW*0.1,0);
      ctx.closePath();ctx.fill();
      ctx.beginPath();
      ctx.moveTo(legGap-legW*0.5+legW*0.1,0);ctx.lineTo(legGap-legW*0.5,legH);
      ctx.lineTo(legGap+legW*0.5,legH);ctx.lineTo(legGap+legW*0.5,0);
      ctx.closePath();ctx.fill();
      /* Chaussures */
      ctx.fillStyle='rgba(4,4,4,1)';
      ctx.beginPath();ctx.ellipse(-legGap,legH+sh*0.017,legW*0.85,sh*0.017,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(legGap,legH+sh*0.017,legW*0.85,sh*0.017,0,0,Math.PI*2);ctx.fill();

      /* Veste noire */
      const bodyW=W*0.060*sc, bodyTop=-sh*0.40;
      ctx.fillStyle='rgba(9,9,9,1)';
      ctx.beginPath();
      ctx.moveTo(-bodyW*0.5,0);
      ctx.lineTo(-bodyW*0.58,bodyTop*0.5);
      ctx.bezierCurveTo(-bodyW*0.60,bodyTop*0.85,-bodyW*0.45,bodyTop,-bodyW*0.20,bodyTop);
      ctx.lineTo(bodyW*0.20,bodyTop);
      ctx.bezierCurveTo(bodyW*0.45,bodyTop,bodyW*0.60,bodyTop*0.85,bodyW*0.58,bodyTop*0.5);
      ctx.lineTo(bodyW*0.5,0);
      ctx.closePath();ctx.fill();
      /* Reflet épaule */
      const sg=ctx.createLinearGradient(-bodyW*0.45,bodyTop,-bodyW*0.1,bodyTop*0.6);
      sg.addColorStop(0,'rgba(48,42,35,0.22)');sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;
      ctx.beginPath();
      ctx.moveTo(-bodyW*0.5,0);ctx.lineTo(-bodyW*0.58,bodyTop*0.5);
      ctx.bezierCurveTo(-bodyW*0.60,bodyTop*0.85,-bodyW*0.45,bodyTop,-bodyW*0.20,bodyTop);
      ctx.lineTo(-bodyW*0.05,bodyTop);ctx.lineTo(-bodyW*0.05,0);
      ctx.closePath();ctx.fill();
      /* Col blanc */
      ctx.fillStyle='rgba(238,230,215,0.92)';
      ctx.beginPath();
      ctx.moveTo(-bodyW*0.08,bodyTop+sh*0.024);ctx.lineTo(-bodyW*0.24,bodyTop+sh*0.092);
      ctx.lineTo(-bodyW*0.04,bodyTop+sh*0.050);ctx.closePath();ctx.fill();
      ctx.beginPath();
      ctx.moveTo(bodyW*0.08,bodyTop+sh*0.024);ctx.lineTo(bodyW*0.24,bodyTop+sh*0.092);
      ctx.lineTo(bodyW*0.04,bodyTop+sh*0.050);ctx.closePath();ctx.fill();

      /* Cravate — couleur propre au personnage */
      const tieTop=bodyTop+sh*0.034, tieBot=bodyTop*0.17;
      /* Ombre */
      ctx.fillStyle='rgba(0,0,0,0.55)';
      ctx.beginPath();
      ctx.moveTo(-W*0.010*sc+1,tieTop+2);ctx.lineTo(-W*0.016*sc+1,tieBot-sh*0.016+2);
      ctx.lineTo(1,tieBot+2);ctx.lineTo(W*0.016*sc+1,tieBot-sh*0.016+2);
      ctx.lineTo(W*0.010*sc+1,tieTop+2);ctx.closePath();ctx.fill();
      /* Cravate */
      ctx.fillStyle=tieRgb;
      ctx.beginPath();
      ctx.moveTo(-W*0.010*sc,tieTop);ctx.lineTo(-W*0.016*sc,tieBot-sh*0.016);
      ctx.lineTo(0,tieBot);ctx.lineTo(W*0.016*sc,tieBot-sh*0.016);
      ctx.lineTo(W*0.010*sc,tieTop);ctx.closePath();ctx.fill();
      /* Reflet */
      ctx.fillStyle='rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.moveTo(-W*0.003*sc,tieTop);ctx.lineTo(-W*0.005*sc,tieBot*0.5);
      ctx.lineTo(0,tieBot*0.5);ctx.lineTo(W*0.003*sc,tieTop);
      ctx.closePath();ctx.fill();
      /* Nœud */
      ctx.fillStyle='rgba(0,0,0,0.40)';
      ctx.beginPath();ctx.ellipse(0,tieTop+sh*0.011,W*0.011*sc,sh*0.019,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=tieRgb;
      ctx.globalAlpha=0.7;
      ctx.beginPath();ctx.ellipse(0,tieTop+sh*0.011,W*0.010*sc,sh*0.017,0,0,Math.PI*2);ctx.fill();
      ctx.globalAlpha=1.0;

      /* Boutons */
      ctx.fillStyle='rgba(22,20,18,0.95)';
      for(let bi=0;bi<3;bi++){
        const by=bodyTop*0.5+bi*sh*0.064;
        ctx.beginPath();ctx.arc(0,by,W*0.004*sc,0,Math.PI*2);ctx.fill();
      }

      /* Bras */
      ctx.strokeStyle='rgba(8,8,8,1)';
      ctx.lineWidth=W*0.021*sc;ctx.lineCap='round';
      if(fig.arm==='down'){
        ctx.beginPath();ctx.moveTo(-bodyW*0.50,bodyTop*0.5);ctx.lineTo(-bodyW*0.54,bodyTop*0.06);ctx.stroke();
        ctx.beginPath();ctx.moveTo(bodyW*0.50,bodyTop*0.5);ctx.lineTo(bodyW*0.54,bodyTop*0.06);ctx.stroke();
        ctx.fillStyle='rgba(150,115,85,0.88)';
        ctx.beginPath();ctx.arc(-bodyW*0.54,bodyTop*0.02,W*0.013*sc,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.arc(bodyW*0.54,bodyTop*0.02,W*0.013*sc,0,Math.PI*2);ctx.fill();
      } else if(fig.arm==='up'){
        ctx.beginPath();ctx.moveTo(-bodyW*0.50,bodyTop*0.6);ctx.lineTo(-bodyW*0.82,bodyTop*0.88);ctx.stroke();
        ctx.beginPath();ctx.moveTo(bodyW*0.50,bodyTop*0.6);ctx.lineTo(bodyW*0.54,bodyTop*0.06);ctx.stroke();
        ctx.fillStyle='rgba(150,115,85,0.88)';
        ctx.beginPath();ctx.arc(-bodyW*0.82,bodyTop*0.91,W*0.013*sc,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.arc(bodyW*0.54,bodyTop*0.02,W*0.013*sc,0,Math.PI*2);ctx.fill();
      } else {
        ctx.beginPath();ctx.moveTo(-bodyW*0.50,bodyTop*0.5);ctx.lineTo(-bodyW*0.83,bodyTop*0.35);ctx.stroke();
        ctx.beginPath();ctx.moveTo(bodyW*0.50,bodyTop*0.5);ctx.lineTo(bodyW*0.83,bodyTop*0.35);ctx.stroke();
        ctx.fillStyle='rgba(150,115,85,0.88)';
        ctx.beginPath();ctx.arc(-bodyW*0.85,bodyTop*0.33,W*0.013*sc,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.arc(bodyW*0.85,bodyTop*0.33,W*0.013*sc,0,Math.PI*2);ctx.fill();
      }

      /* Tête */
      const headY=bodyTop-sh*0.118, headR=W*0.029*sc;
      ctx.fillStyle='rgba(135,105,78,0.82)';
      ctx.fillRect(-W*0.012*sc,bodyTop-sh*0.006,W*0.024*sc,sh*0.043);
      ctx.fillStyle='rgba(155,122,92,0.93)';
      ctx.beginPath();ctx.arc(0,headY,headR,0,Math.PI*2);ctx.fill();
      /* Lumière front */
      ctx.fillStyle='rgba(195,162,125,0.28)';
      ctx.beginPath();ctx.ellipse(0,headY-headR*0.22,headR*0.52,headR*0.32,-0.15,0,Math.PI*2);ctx.fill();
      /* Cheveux */
      ctx.fillStyle='rgba(14,10,7,0.93)';
      ctx.beginPath();ctx.ellipse(0,headY-headR*0.55,headR*0.92,headR*0.56,0,0,Math.PI*1.0);ctx.fill();
      /* Lunettes */
      if(fig.glasses){
        ctx.strokeStyle='rgba(12,12,12,0.92)';ctx.lineWidth=W*0.0028*sc;
        ctx.beginPath();ctx.ellipse(-headR*0.38,headY-headR*0.06,headR*0.29,headR*0.20,0,0,Math.PI*2);ctx.stroke();
        ctx.beginPath();ctx.ellipse(headR*0.38,headY-headR*0.06,headR*0.29,headR*0.20,0,0,Math.PI*2);ctx.stroke();
        ctx.beginPath();ctx.moveTo(-headR*0.09,headY-headR*0.06);ctx.lineTo(headR*0.09,headY-headR*0.06);ctx.stroke();
        ctx.fillStyle='rgba(180,200,230,0.07)';
        ctx.beginPath();ctx.ellipse(-headR*0.38,headY-headR*0.10,headR*0.17,headR*0.09,0,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.ellipse(headR*0.38,headY-headR*0.10,headR*0.17,headR*0.09,0,0,Math.PI*2);ctx.fill();
      }
      ctx.restore();
    }

    function frame(){
      if(stop.v)return;

      /* Fond */
      ctx.fillStyle='#050505';ctx.fillRect(0,0,W,H);

      /* Entrepôt */
      drawWarehouse();

      /* Éclairage */
      drawSpotlight();

      /* Taches de sang */
      for(const s of stains){
        const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
        sg.addColorStop(0,`rgba(170,8,8,${s.op})`);
        sg.addColorStop(0.45,`rgba(115,4,4,${s.op*0.50})`);
        sg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=sg;ctx.fillRect(s.x-s.r,s.y-s.r*0.30,s.r*2,s.r*0.60);
      }

      /* Gouttes */
      for(const d of drops){
        d.y+=d.vy;d.ph+=0.018;
        if(d.y>H+d.r*2){d.y=-d.r;d.x=Math.random()*W;}
        ctx.fillStyle=`rgba(205,${8+Math.random()*10|0},8,${d.op*(0.65+0.35*Math.sin(d.ph))})`;
        ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
        ctx.beginPath();
        ctx.moveTo(d.x-d.r*0.38,d.y+d.r*0.32);
        ctx.quadraticCurveTo(d.x,d.y+d.r*2.3,d.x+d.r*0.38,d.y+d.r*0.32);
        ctx.fillStyle=`rgba(180,5,5,${d.op*0.72})`;ctx.fill();
      }

      /* Personnages */
      for(const fig of figures)drawFigure(fig);

      /* Vignette — plus légère pour laisser voir l'entrepôt */
      const vg=ctx.createRadialGradient(cx,H*0.50,H*0.10,cx,H*0.50,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.45,'rgba(3,2,1,0.04)');
      vg.addColorStop(0.70,'rgba(3,2,1,0.38)');
      vg.addColorStop(0.88,'rgba(2,1,1,0.65)');
      vg.addColorStop(1,'rgba(1,0,0,0.90)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

      /* Bande top pour respiration header */
      const tb=ctx.createLinearGradient(0,0,0,H*0.16);
      tb.addColorStop(0,'rgba(5,4,3,0.90)');
      tb.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=tb;ctx.fillRect(0,0,W,H*0.16);

      /* Grain cinéma */
      for(let i=0;i<32;i++){
        const gv=5+Math.random()*16|0;
        ctx.fillStyle=`rgba(${gv+12},${gv+4},${gv+4},${Math.random()*0.016})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.7+0.3,1);
      }

      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
