// CinéQuiz splash chunk — Marty Supreme
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Marty Supreme"]={
   name:'Marty Supreme',
   color:'40,120,200',
   ref:'Marty Supreme \u2014 Jonah Hill, 2025',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ms_s');
    if(!_s){_s=document.createElement('style');_s.id='_ms_s';document.head.appendChild(_s);}
    _s.textContent=''
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Balle de ping-pong — physique simple ── */
    const ball={
     x:cx, y:H*0.30,
     vx:W*0.0035, vy:H*0.0055,
     r:W*0.028,
    };
    const lineY=H*0.50; /* ligne blanche centrale — séparation des deux demi-terrains */

    /* ── Raquette rouge (haut-gauche) — statique ── */
    const padR={x:W*0.28, y:H*0.26};
    /* ── Raquette bois (bas-droite) — statique, inclinée ── */
    const padW={x:W*0.68, y:H*0.74};

    /* ── Texture grain ── */
    function drawGrain(){
     for(let i=0;i<120;i++){
      ctx.fillStyle=`rgba(${20+Math.random()*15|0},${80+Math.random()*20|0},${40+Math.random()*15|0},${0.018+Math.random()*0.022})`;
      ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*2.5+0.3,0,Math.PI*2);ctx.fill();
     }
    }

    /* ── Raquette rouge ── */
    function drawRedPaddle(px,py,angle){
     ctx.save();ctx.translate(px,py);ctx.rotate(angle);
     /* Tête ovale rouge */
     const pw=W*0.22, ph=W*0.24;
     const rg=ctx.createRadialGradient(0,-ph*0.05,0,0,0,Math.max(pw,ph)*0.6);
     rg.addColorStop(0,'rgba(210,38,28,1)');
     rg.addColorStop(0.6,'rgba(185,28,20,1)');
     rg.addColorStop(1,'rgba(155,18,12,1)');
     ctx.fillStyle=rg;
     ctx.beginPath();ctx.ellipse(0,-ph*0.08,pw*0.5,ph*0.5,0,0,Math.PI*2);ctx.fill();
     /* Bord légèrement plus sombre */
     ctx.strokeStyle='rgba(120,12,8,0.55)';ctx.lineWidth=W*0.008;
     ctx.beginPath();ctx.ellipse(0,-ph*0.08,pw*0.5,ph*0.5,0,0,Math.PI*2);ctx.stroke();
     /* Manche noir */
     const mh=ph*0.52;
     const mg=ctx.createLinearGradient(-W*0.032,ph*0.38,-W*0.032,ph*0.38+mh);
     mg.addColorStop(0,'#111');mg.addColorStop(0.5,'#222');mg.addColorStop(1,'#0a0a0a');
     ctx.fillStyle=mg;
     ctx.beginPath();ctx.roundRect(-W*0.032,ph*0.38,W*0.064,mh,W*0.012);ctx.fill();
     /* Balle orange sur la raquette */
     const bx2=pw*0.05, by2=-ph*0.14;
     const bg2=ctx.createRadialGradient(bx2-pw*0.04,by2-ph*0.06,0,bx2,by2,W*0.068);
     bg2.addColorStop(0,'rgba(255,200,60,1)');
     bg2.addColorStop(0.55,'rgba(240,165,30,0.98)');
     bg2.addColorStop(1,'rgba(210,130,10,0.92)');
     ctx.fillStyle=bg2;ctx.beginPath();ctx.arc(bx2,by2,W*0.068,0,Math.PI*2);ctx.fill();
     /* 3 étoiles sur la balle */
     ctx.fillStyle='rgba(20,10,0,0.75)';ctx.font=`bold ${W*0.028}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText('★★★',bx2,by2);
     ctx.restore();
    }

    /* ── Raquette bois ── */
    function drawWoodPaddle(px,py,angle){
     ctx.save();ctx.translate(px,py);ctx.rotate(angle);
     const pw=W*0.20, ph=W*0.22;
     /* Tête bois — couleur kraft */
     const wg=ctx.createRadialGradient(0,-ph*0.05,0,0,0,Math.max(pw,ph)*0.6);
     wg.addColorStop(0,'rgba(210,175,115,1)');
     wg.addColorStop(0.55,'rgba(185,148,88,1)');
     wg.addColorStop(1,'rgba(155,118,62,1)');
     ctx.fillStyle=wg;
     ctx.beginPath();ctx.ellipse(0,-ph*0.08,pw*0.5,ph*0.5,0,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(120,88,40,0.45)';ctx.lineWidth=W*0.007;
     ctx.beginPath();ctx.ellipse(0,-ph*0.08,pw*0.5,ph*0.5,0,0,Math.PI*2);ctx.stroke();
     /* Veines de bois */
     ctx.save();ctx.beginPath();ctx.ellipse(0,-ph*0.08,pw*0.5,ph*0.5,0,0,Math.PI*2);ctx.clip();
     ctx.strokeStyle='rgba(140,95,45,0.22)';ctx.lineWidth=W*0.005;
     for(let vi=-3;vi<=3;vi++){
      ctx.beginPath();ctx.moveTo(vi*pw*0.18,-ph*0.58);ctx.lineTo(vi*pw*0.18+pw*0.04,ph*0.42);ctx.stroke();
     }
     ctx.restore();
     /* Manche bois */
     const mmg=ctx.createLinearGradient(-W*0.028,ph*0.38,-W*0.028,ph*0.38+ph*0.48);
     mmg.addColorStop(0,'rgba(175,120,55,1)');mmg.addColorStop(0.5,'rgba(150,100,42,1)');mmg.addColorStop(1,'rgba(125,82,32,1)');
     ctx.fillStyle=mmg;
     ctx.beginPath();ctx.roundRect(-W*0.028,ph*0.38,W*0.056,ph*0.48,W*0.010);ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond vert table de ping-pong ── */
     ctx.fillStyle='#2e7a4e';ctx.fillRect(0,0,W,H);

     /* Dégradé subtil pour profondeur */
     const bg=ctx.createLinearGradient(0,0,W,H);
     bg.addColorStop(0,'rgba(30,100,55,0.40)');
     bg.addColorStop(0.5,'rgba(0,0,0,0)');
     bg.addColorStop(1,'rgba(15,55,30,0.40)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── Grain texture ── */
     drawGrain();

     /* ── Lignes de la table ── */
     /* Ligne centrale blanche horizontale */
     ctx.fillStyle='rgba(255,255,255,0.95)';
     ctx.fillRect(0,lineY-H*0.008,W,H*0.016);
     /* Ligne de bord top et bottom (moins visible) */
     ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=W*0.006;
     ctx.beginPath();ctx.moveTo(W*0.04,H*0.06);ctx.lineTo(W*0.96,H*0.06);ctx.stroke();
     ctx.beginPath();ctx.moveTo(W*0.04,H*0.94);ctx.lineTo(W*0.96,H*0.94);ctx.stroke();

     /* ── Raquette rouge en haut-gauche ── */
     drawRedPaddle(padR.x, padR.y, -0.08);

     /* ── Raquette bois en bas-droite, inclinée ── */
     drawWoodPaddle(padW.x, padW.y, 0.55);

     /* ── Balle blanche qui rebondit ── */
     ball.x+=ball.vx;ball.y+=ball.vy;
     /* Rebonds sur les bords */
     if(ball.x-ball.r<0){ball.x=ball.r;ball.vx=Math.abs(ball.vx);}
     if(ball.x+ball.r>W){ball.x=W-ball.r;ball.vx=-Math.abs(ball.vx);}
     if(ball.y-ball.r<H*0.06){ball.y=H*0.06+ball.r;ball.vy=Math.abs(ball.vy);}
     if(ball.y+ball.r>H*0.94){ball.y=H*0.94-ball.r;ball.vy=-Math.abs(ball.vy);}

     /* Ombre de la balle */
     ctx.fillStyle='rgba(0,0,0,0.20)';
     ctx.beginPath();ctx.ellipse(ball.x+ball.r*0.25,ball.y+ball.r*0.35,ball.r*0.80,ball.r*0.28,0,0,Math.PI*2);ctx.fill();
     /* Balle blanche */
     const ballG=ctx.createRadialGradient(ball.x-ball.r*0.28,ball.y-ball.r*0.28,0,ball.x,ball.y,ball.r);
     ballG.addColorStop(0,'rgba(255,255,255,1)');
     ballG.addColorStop(0.55,'rgba(240,240,240,0.97)');
     ballG.addColorStop(1,'rgba(210,210,210,0.92)');
     ctx.fillStyle=ballG;ctx.beginPath();ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);ctx.fill();
     /* Reflet */
     ctx.fillStyle='rgba(255,255,255,0.55)';
     ctx.beginPath();ctx.ellipse(ball.x-ball.r*0.28,ball.y-ball.r*0.28,ball.r*0.22,ball.r*0.15,-0.5,0,Math.PI*2);ctx.fill();

     /* ── Vignette coins ── */
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.22,cx,H*0.5,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.65,'rgba(0,0,0,0.06)');
     vg.addColorStop(1,'rgba(0,0,0,0.42)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
