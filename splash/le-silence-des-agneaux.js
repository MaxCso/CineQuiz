// CinéQuiz splash chunk — Le Silence des agneaux
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Silence des agneaux"]={
   name:'Le Silence des agneaux',
   color:'40,80,40',
   ref:'The Silence of the Lambs \u2014 Jonathan Demme, 1991',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;

    /* ── CSS ── */
    let _s=document.getElementById('_sil_s');
    if(!_s){_s=document.createElement('style');_s.id='_sil_s';document.head.appendChild(_s);}
    _s.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{
       color:rgba(210,225,210,0.90)!important;
       text-shadow:0 2px 18px rgba(0,0,0,1),0 0 30px rgba(80,180,80,0.18)!important;
     }
     #splash-film-logo{
       filter:drop-shadow(0 4px 24px rgba(0,0,0,0.98)) drop-shadow(0 0 10px rgba(80,160,80,0.22))!important;
     }
    `;
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Papillons Acherontia atropos ── */
    const moths=Array.from({length:9},(_,i)=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.55,
     vy:(Math.random()-0.5)*0.40,
     scale:0.55+Math.random()*0.65,
     rot:(Math.random()-0.5)*0.3,
     flapSpd:2.5+Math.random()*2.0,
     flapPh:Math.random()*Math.PI*2,
     op:0.55+Math.random()*0.38,
     turnTimer:Math.random()*180,
    }));

    /* ── Poussière d'ailes ── */
    const dust=Array.from({length:80},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18,
     vy:(Math.random()-0.5)*0.12,
     r:Math.random()*1.4+0.2,
     op:0.08+Math.random()*0.22,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Dessin couloir/cellule institutionnel ── */
    function drawCorridor(){
     // Fond vert-gris institutionnel
     const wallG=ctx.createLinearGradient(0,0,0,H);
     wallG.addColorStop(0,'rgba(8,12,8,1)');
     wallG.addColorStop(0.30,'rgba(12,18,11,1)');
     wallG.addColorStop(0.55,'rgba(16,24,14,1)');
     wallG.addColorStop(0.80,'rgba(12,18,10,1)');
     wallG.addColorStop(1,'rgba(6,10,5,1)');
     ctx.fillStyle=wallG;ctx.fillRect(0,0,W,H);

     // Perspective du couloir — point de fuite au centre
     const vp={x:cx, y:H*0.42};
     const horizonY=H*0.42;

     // Plafond
     ctx.fillStyle='rgba(10,16,9,1)';
     ctx.beginPath();
     ctx.moveTo(0,0);ctx.lineTo(W,0);
     ctx.lineTo(vp.x+W*0.22,horizonY);ctx.lineTo(vp.x-W*0.22,horizonY);
     ctx.closePath();ctx.fill();

     // Sol
     const floorG=ctx.createLinearGradient(0,horizonY,0,H);
     floorG.addColorStop(0,'rgba(14,20,12,1)');
     floorG.addColorStop(0.5,'rgba(10,15,8,1)');
     floorG.addColorStop(1,'rgba(5,8,4,1)');
     ctx.fillStyle=floorG;
     ctx.beginPath();
     ctx.moveTo(vp.x-W*0.22,horizonY);ctx.lineTo(vp.x+W*0.22,horizonY);
     ctx.lineTo(W,H);ctx.lineTo(0,H);
     ctx.closePath();ctx.fill();

     // Lignes de fuite sol
     ctx.strokeStyle='rgba(20,30,18,0.50)';ctx.lineWidth=0.8;
     for(let i=0;i<=6;i++){
      const bx=(W/6)*i;
      ctx.beginPath();ctx.moveTo(vp.x,horizonY);ctx.lineTo(bx,H);ctx.stroke();
     }
     // Carreaux sol
     for(let row=1;row<=5;row++){
      const progress=row/5;
      const ly=horizonY+(H-horizonY)*progress;
      const lx0=vp.x-(vp.x*progress+(W-vp.x)*0)*0.85;
      const lx1=vp.x+(W-vp.x)*progress*0.85+vp.x*(1-progress)*0.15;
      ctx.strokeStyle=`rgba(18,28,16,${0.35*(1-progress*0.5)})`;
      ctx.beginPath();ctx.moveTo(Math.max(0,lx0),ly);ctx.lineTo(Math.min(W,lx1),ly);ctx.stroke();
     }

     // Murs latéraux
     ctx.fillStyle='rgba(14,20,12,0.98)';
     // Mur gauche
     ctx.beginPath();
     ctx.moveTo(0,0);ctx.lineTo(vp.x-W*0.22,horizonY);
     ctx.lineTo(0,H);ctx.closePath();ctx.fill();
     // Mur droit
     ctx.beginPath();
     ctx.moveTo(W,0);ctx.lineTo(vp.x+W*0.22,horizonY);
     ctx.lineTo(W,H);ctx.closePath();ctx.fill();

     // Lignes de fuite plafond
     ctx.strokeStyle='rgba(22,32,20,0.45)';ctx.lineWidth=0.8;
     for(let i=0;i<=4;i++){
      const bx=(W/4)*i;
      ctx.beginPath();ctx.moveTo(vp.x,horizonY);ctx.lineTo(bx,0);ctx.stroke();
     }

     // Néons — bandes lumineuses au plafond
     const neonPositions=[vp.x-W*0.10, vp.x, vp.x+W*0.10];
     for(let ni=0;ni<4;ni++){
      const neonProgress=(ni+1)/5;
      const nx0=vp.x-W*0.06*neonProgress;
      const nx1=vp.x+W*0.06*neonProgress;
      const ny=H*0.02+ni*H*0.08;
      const flicker=0.75+Math.sin(t*12+ni*2.3)*0.04+Math.sin(t*7.1+ni)*0.03;
      // Tube néon
      ctx.strokeStyle=`rgba(160,210,155,${0.55*flicker})`;
      ctx.lineWidth=W*0.012*(1-neonProgress*0.5);
      ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(nx0,ny);ctx.lineTo(nx1,ny);ctx.stroke();
      // Halo du néon
      const neonG=ctx.createRadialGradient(vp.x,ny,0,vp.x,ny,W*0.18*neonProgress);
      neonG.addColorStop(0,`rgba(140,200,130,${0.18*flicker})`);
      neonG.addColorStop(0.5,`rgba(100,155,90,${0.06*flicker})`);
      neonG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=neonG;ctx.fillRect(nx0-W*0.18,ny-W*0.18,W*0.36+nx1-nx0,W*0.36);
     }

     /* ── BARREAUX ── */
     // Grille de cellule — barreaux verticaux en perspective
     const barCount=7;
     const barLeft=vp.x-W*0.22;
     const barRight=vp.x+W*0.22;
     ctx.strokeStyle=`rgba(22,32,20,0.92)`;
     for(let i=0;i<=barCount;i++){
      const bx=barLeft+(barRight-barLeft)*(i/barCount);
      // Converge vers le bas
      const btx=bx+(bx-vp.x)*2.5;
      const flicker=0.85+Math.sin(t*0.8+i)*0.06;
      ctx.strokeStyle=`rgba(${28+i*2},${40+i*2},${26+i*2},${0.88*flicker})`;
      ctx.lineWidth=W*0.014*(1-Math.abs(i-barCount*0.5)/(barCount*0.6)*0.5);
      ctx.beginPath();ctx.moveTo(bx,horizonY);ctx.lineTo(btx,H+50);ctx.stroke();
      // Reflet sur barreau
      ctx.strokeStyle=`rgba(40,60,36,${0.18*flicker})`;
      ctx.lineWidth=W*0.003;
      ctx.beginPath();ctx.moveTo(bx-W*0.004,horizonY);ctx.lineTo(btx-W*0.004,H+50);ctx.stroke();
     }
     // Barreaux horizontaux
     for(let hi=0;hi<4;hi++){
      const hy=horizonY+(H-horizonY)*((hi+1)/5);
      const hx0=barLeft+(barLeft-vp.x)*((hy-horizonY)/(H-horizonY))*2.0;
      const hx1=barRight+(barRight-vp.x)*((hy-horizonY)/(H-horizonY))*2.0;
      const flicker=0.75+Math.sin(t*0.6+hi*1.4)*0.08;
      ctx.strokeStyle=`rgba(28,42,26,${0.70*flicker})`;
      ctx.lineWidth=W*0.012;
      ctx.beginPath();ctx.moveTo(Math.max(0,hx0),hy);ctx.lineTo(Math.min(W,hx1),hy);ctx.stroke();
     }
    }

    /* ── Silhouette d'Hannibal Lecter ── */
    function drawLecter(){
     const fx=cx, fy=H*0.72;
     const h=H*0.26;
     ctx.save();ctx.translate(fx,fy);

     // Halo inquiétant derrière lui
     const haloG=ctx.createRadialGradient(0,-h*0.35,0,0,-h*0.35,W*0.18);
     haloG.addColorStop(0,`rgba(80,130,70,${0.22+Math.sin(t*0.12)*0.04})`);
     haloG.addColorStop(0.5,'rgba(40,80,35,0.08)');
     haloG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=haloG;
     ctx.beginPath();ctx.ellipse(0,-h*0.35,W*0.18,h*0.65,0,0,Math.PI*2);ctx.fill();

     ctx.fillStyle='rgba(4,7,4,0.98)';
     // Jambes
     ctx.beginPath();
     ctx.moveTo(-W*0.028,0);ctx.lineTo(-W*0.032,-h*0.45);
     ctx.lineTo(-W*0.010,-h*0.45);ctx.lineTo(-W*0.006,0);
     ctx.closePath();ctx.fill();
     ctx.beginPath();
     ctx.moveTo(W*0.006,0);ctx.lineTo(W*0.010,-h*0.45);
     ctx.lineTo(W*0.032,-h*0.45);ctx.lineTo(W*0.028,0);
     ctx.closePath();ctx.fill();
     // Corps + combinaison
     ctx.beginPath();
     ctx.moveTo(-W*0.038,-h*0.45);
     ctx.bezierCurveTo(-W*0.042,-h*0.62,-W*0.040,-h*0.78,-W*0.025,-h*0.85);
     ctx.lineTo(W*0.025,-h*0.85);
     ctx.bezierCurveTo(W*0.040,-h*0.78,W*0.042,-h*0.62,W*0.038,-h*0.45);
     ctx.closePath();ctx.fill();
     // Bras — le long du corps
     ctx.beginPath();
     ctx.moveTo(-W*0.038,-h*0.78);
     ctx.bezierCurveTo(-W*0.055,-h*0.72,-W*0.058,-h*0.55,-W*0.050,-h*0.42);
     ctx.lineTo(-W*0.036,-h*0.44);
     ctx.bezierCurveTo(-W*0.042,-h*0.56,-W*0.038,-h*0.70,-W*0.022,-h*0.76);
     ctx.closePath();ctx.fill();
     ctx.beginPath();
     ctx.moveTo(W*0.038,-h*0.78);
     ctx.bezierCurveTo(W*0.055,-h*0.72,W*0.058,-h*0.55,W*0.050,-h*0.42);
     ctx.lineTo(W*0.036,-h*0.44);
     ctx.bezierCurveTo(W*0.042,-h*0.56,W*0.038,-h*0.70,W*0.022,-h*0.76);
     ctx.closePath();ctx.fill();
     // Tête
     ctx.beginPath();ctx.arc(0,-h*0.94,W*0.026,0,Math.PI*2);ctx.fill();
     // Masque — rectangle horizontal clair sur le visage
     ctx.fillStyle='rgba(22,35,20,0.95)';
     ctx.beginPath();ctx.roundRect(-W*0.020,-h*0.99,W*0.040,W*0.020,W*0.003);ctx.fill();
     // Yeux — deux points légèrement lumineux
     ctx.fillStyle=`rgba(120,185,110,${0.55+Math.sin(t*0.25)*0.15})`;
     ctx.beginPath();ctx.arc(-W*0.008,-h*0.95,W*0.003,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(W*0.008,-h*0.95,W*0.003,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    /* ── Dessin d'un papillon Acherontia atropos ── */
    function drawMoth(m){
     ctx.save();ctx.translate(m.x,m.y);ctx.rotate(m.rot);

     const sc=m.scale;
     const flap=Math.sin(t*m.flapSpd+m.flapPh);
     const flapAmt=Math.abs(flap); // 0=ailes ouvertes, 1=ailes fermées
     const wW=W*0.055*sc; // demi-largeur aile
     const wH=H*0.048*sc; // hauteur aile sup
     const wH2=H*0.030*sc; // hauteur aile inf

     // Aile gauche supérieure
     ctx.fillStyle=`rgba(18,14,8,${m.op*(0.92-flapAmt*0.08)})`;
     ctx.beginPath();
     ctx.moveTo(0,-wH*0.12);
     ctx.bezierCurveTo(-wW*(1-flapAmt*0.72),-wH*0.08,-wW*(1-flapAmt*0.72),-wH*0.85,-wW*0.35*(1-flapAmt*0.80),-wH*0.92);
     ctx.bezierCurveTo(-wW*0.08*(1-flapAmt*0.80),wH*0.18,0,wH*0.08,0,-wH*0.12);
     ctx.closePath();ctx.fill();
     // Aile droite supérieure
     ctx.beginPath();
     ctx.moveTo(0,-wH*0.12);
     ctx.bezierCurveTo(wW*(1-flapAmt*0.72),-wH*0.08,wW*(1-flapAmt*0.72),-wH*0.85,wW*0.35*(1-flapAmt*0.80),-wH*0.92);
     ctx.bezierCurveTo(wW*0.08*(1-flapAmt*0.80),wH*0.18,0,wH*0.08,0,-wH*0.12);
     ctx.closePath();ctx.fill();
     // Aile gauche inférieure
     ctx.fillStyle=`rgba(24,18,10,${m.op*0.85})`;
     ctx.beginPath();
     ctx.moveTo(0,wH*0.10);
     ctx.bezierCurveTo(-wW*0.75*(1-flapAmt*0.70),wH*0.15,-wW*0.65*(1-flapAmt*0.70),wH*0.55+wH2,-wW*0.20*(1-flapAmt*0.65),wH*0.60+wH2);
     ctx.bezierCurveTo(-wW*0.05*(1-flapAmt*0.65),wH*0.45,0,wH*0.28,0,wH*0.10);
     ctx.closePath();ctx.fill();
     // Aile droite inférieure
     ctx.beginPath();
     ctx.moveTo(0,wH*0.10);
     ctx.bezierCurveTo(wW*0.75*(1-flapAmt*0.70),wH*0.15,wW*0.65*(1-flapAmt*0.70),wH*0.55+wH2,wW*0.20*(1-flapAmt*0.65),wH*0.60+wH2);
     ctx.bezierCurveTo(wW*0.05*(1-flapAmt*0.65),wH*0.45,0,wH*0.28,0,wH*0.10);
     ctx.closePath();ctx.fill();

     // Tête de mort sur l'aile supérieure (si assez grande)
     if(sc>0.70&&flapAmt<0.55){
      const skullX=0, skullY=-wH*0.45;
      const sr=wW*0.14;
      ctx.fillStyle=`rgba(195,175,130,${m.op*0.65*(1-flapAmt*1.2)})`;
      ctx.beginPath();ctx.arc(skullX,skullY,sr,0,Math.PI*2);ctx.fill();
      // Yeux
      ctx.fillStyle=`rgba(14,10,6,${m.op*0.80})`;
      ctx.beginPath();ctx.arc(skullX-sr*0.34,skullY-sr*0.08,sr*0.22,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(skullX+sr*0.34,skullY-sr*0.08,sr*0.22,0,Math.PI*2);ctx.fill();
      // Sourire
      ctx.beginPath();
      ctx.arc(skullX,skullY+sr*0.25,sr*0.35,0.15,Math.PI-0.15);
      ctx.strokeStyle=`rgba(14,10,6,${m.op*0.75})`;ctx.lineWidth=sr*0.14;ctx.stroke();
     }

     // Corps
     ctx.fillStyle=`rgba(10,8,4,${m.op})`;
     ctx.beginPath();ctx.ellipse(0,-wH*0.08,wW*0.06,wH*0.55,0,0,Math.PI*2);ctx.fill();

     // Antennes
     ctx.strokeStyle=`rgba(12,9,5,${m.op*0.70})`;ctx.lineWidth=0.8;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-wW*0.04,-wH*0.55);ctx.lineTo(-wW*0.22*(1-flapAmt*0.5),-wH*0.95);ctx.stroke();
     ctx.beginPath();ctx.moveTo(wW*0.04,-wH*0.55);ctx.lineTo(wW*0.22*(1-flapAmt*0.5),-wH*0.95);ctx.stroke();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── COULOIR INSTITUTIONNEL ── */
     drawCorridor();

     /* ── POUSSIÈRE ── */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.ph+=0.012;
      if(d.x<0||d.x>W)d.vx*=-1;if(d.y<0||d.y>H)d.vy*=-1;
      ctx.fillStyle=`rgba(120,175,110,${d.op*(0.5+0.5*Math.sin(d.ph))})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── HANNIBAL ── */
     drawLecter();

     /* ── PAPILLONS ── */
     for(const m of moths){
      m.x+=m.vx;m.y+=m.vy;
      m.turnTimer--;
      if(m.turnTimer<=0){
       m.vx=(Math.random()-0.5)*0.55;
       m.vy=(Math.random()-0.5)*0.40;
       m.turnTimer=120+Math.random()*200;
      }
      if(m.x<-W*0.10)m.x=W*1.10;if(m.x>W*1.10)m.x=-W*0.10;
      if(m.y<-H*0.10)m.y=H*1.10;if(m.y>H*1.10)m.y=-H*0.10;
      drawMoth(m);
     }

     /* ── VIGNETTE ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(3,5,3,0.05)');
     vg.addColorStop(0.62,'rgba(3,5,3,0.40)');
     vg.addColorStop(0.82,'rgba(2,4,2,0.74)');
     vg.addColorStop(1,'rgba(1,3,1,0.95)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Bande top */
     const tb=ctx.createLinearGradient(0,0,0,H*0.15);
     tb.addColorStop(0,'rgba(6,10,5,0.92)');
     tb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tb;ctx.fillRect(0,0,W,H*0.15);

     /* Grain film */
     for(let i=0;i<25;i++){
      const gv=3+Math.random()*10|0;
      ctx.fillStyle=`rgba(${gv+8},${gv+14},${gv+7},${Math.random()*0.013})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
