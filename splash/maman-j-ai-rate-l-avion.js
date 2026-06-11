// CinéQuiz splash chunk — Maman j'ai raté l'avion
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Maman j'ai raté l'avion"]={
   name:"Maman j'ai rat\u00e9 l'avion",
   color:'200,80,40',
   ref:"Home Alone \u2014 Chris Columbus, 1990",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ha_s');
    if(!_s){_s=document.createElement('style');_s.id='_ha_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:31%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-film-ref-bottom,#splash-film-ref,#splash-film-ref *{color:#000000!important;-webkit-text-fill-color:#000000!important;text-shadow:none!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Neige */
    const snow=Array.from({length:90},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vy:0.20+Math.random()*0.35,vx:(Math.random()-0.5)*0.14,
     r:Math.random()*2.2+0.4,op:0.35+Math.random()*0.45,
     wb:Math.random()*Math.PI*2,wSpd:0.007+Math.random()*0.010,
    }));
    /* Lumières de Noël clignotantes */
    const xmasLights=Array.from({length:24},(_,i)=>({
     x:W*(0.05+i*0.04),y:H*(0.30+Math.sin(i*0.8)*0.04),
     r:W*0.009,ph:Math.random()*Math.PI*2,
     col:['255,30,30','0,200,50','255,200,0','0,150,255','255,80,180'][i%5],
    }));

    function frame(){
     if(stop.v)return;

     /* ── FOND — ciel d'hiver Chicago ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#06091a');   /* bleu nuit profond */
     bg.addColorStop(0.20,'#090d22');
     bg.addColorStop(0.45,'#0c1228');
     bg.addColorStop(0.68,'#0f1530');
     bg.addColorStop(0.85,'#121828');
     bg.addColorStop(1.00,'#0a0e1c');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Lueur de la ville à l'horizon — orange/ambre chaud */
     const cityGlow=ctx.createRadialGradient(cx,H*0.82,0,cx,H*0.82,W*0.90);
     cityGlow.addColorStop(0,`rgba(180,110,40,${0.18+Math.sin(t*0.08)*0.03})`);
     cityGlow.addColorStop(0.35,'rgba(140,80,25,0.08)');
     cityGlow.addColorStop(0.70,'rgba(80,40,10,0.04)');
     cityGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cityGlow;ctx.fillRect(0,H*0.55,W,H*0.45);

     /* Nuages légers nocturnes */
     for(let ci=0;ci<5;ci++){
      const cx2=W*(0.10+ci*0.20)+Math.sin(t*0.015+ci)*W*0.008;
      const cy2=H*(0.08+ci*0.04);
      const cg=ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,W*0.12);
      cg.addColorStop(0,`rgba(30,35,55,${0.22+Math.sin(t*0.04+ci)*0.03})`);
      cg.addColorStop(0.5,'rgba(20,24,40,0.10)');
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.ellipse(cx2,cy2,W*0.12,H*0.028,0,0,Math.PI*2);ctx.fill();
     }

     /* Étoiles */
     for(let si=0;si<55;si++){
      const sx=Math.sin(si*12.7)*W*0.5+W*0.5;
      const sy=Math.sin(si*8.3)*H*0.28+H*0.12;
      const sAlpha=(0.15+Math.abs(Math.sin(t*0.4+si*0.8))*0.35);
      ctx.fillStyle=`rgba(200,210,240,${sAlpha})`;
      ctx.beginPath();ctx.arc(sx,sy,0.6+Math.sin(si)*0.3,0,Math.PI*2);ctx.fill();
     }

     /* ── MAISON ── */
     const houseY=H*0.40;
     /* Corps */
     ctx.fillStyle='rgba(18,14,26,0.97)';
     ctx.fillRect(cx-W*0.28,houseY,W*0.56,H*0.42);
     /* Toit */
     ctx.beginPath();ctx.moveTo(cx-W*0.33,houseY);ctx.lineTo(cx,houseY-H*0.16);ctx.lineTo(cx+W*0.33,houseY);ctx.closePath();ctx.fill();
     /* Cheminée */
     ctx.fillRect(cx+W*0.10,houseY-H*0.20,W*0.06,H*0.10);
     /* Fumée de cheminée */
     for(let smi=0;smi<4;smi++){
      const smY=houseY-H*0.22-smi*H*0.038;
      const smX=cx+W*0.13+Math.sin(t*0.4+smi)*W*0.014;
      const smAlpha=0.12-smi*0.025;
      const smG=ctx.createRadialGradient(smX,smY,0,smX,smY,W*0.022);
      smG.addColorStop(0,`rgba(150,140,170,${smAlpha})`);
      smG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=smG;ctx.beginPath();ctx.arc(smX,smY,W*0.022,0,Math.PI*2);ctx.fill();
     }
     /* Neige sur le toit */
     ctx.fillStyle='rgba(218,228,245,0.90)';
     ctx.beginPath();ctx.moveTo(cx-W*0.33,houseY);ctx.lineTo(cx,houseY-H*0.16);ctx.lineTo(cx+W*0.33,houseY);
     ctx.lineTo(cx+W*0.33,houseY+H*0.020);
     ctx.bezierCurveTo(cx,houseY-H*0.130,cx,houseY-H*0.130,cx-W*0.33,houseY+H*0.020);
     ctx.closePath();ctx.fill();

     /* Fenêtres — lumière chaude avec halo extérieur */
     for(let r=0;r<2;r++){
      for(let c=0;c<3;c++){
       const wx=cx-W*0.20+c*W*0.14,wy=houseY+H*(0.06+r*0.16);
       const warm=0.55+Math.sin(t*0.35+r*1.8+c*2.2)*0.10;
       /* Halo de lumière qui filtre */
       const wg=ctx.createRadialGradient(wx+W*0.045,wy+H*0.04,0,wx+W*0.045,wy+H*0.04,W*0.08);
       wg.addColorStop(0,`rgba(255,200,80,${warm*0.18})`);
       wg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=wg;ctx.fillRect(wx-W*0.04,wy-H*0.02,W*0.17,H*0.12);
       /* Vitre */
       ctx.fillStyle=`rgba(255,${190+Math.random()*25|0},70,${warm*0.75})`;
       ctx.fillRect(wx,wy,W*0.09,H*0.08);
       /* Croisillon */
       ctx.strokeStyle=`rgba(12,10,20,0.60)`;ctx.lineWidth=1.0;
       ctx.beginPath();ctx.moveTo(wx+W*0.045,wy);ctx.lineTo(wx+W*0.045,wy+H*0.08);ctx.stroke();
       ctx.beginPath();ctx.moveTo(wx,wy+H*0.04);ctx.lineTo(wx+W*0.09,wy+H*0.04);ctx.stroke();
      }
     }
     /* Porte */
     ctx.fillStyle='rgba(90,45,8,0.88)';ctx.fillRect(cx-W*0.06,houseY+H*0.28,W*0.12,H*0.14);
     ctx.fillStyle='rgba(180,140,60,0.55)';
     ctx.beginPath();ctx.arc(cx+W*0.034,houseY+H*0.355,W*0.008,0,Math.PI*2);ctx.fill();
     /* Lueur de la porte */
     const doorG=ctx.createRadialGradient(cx,houseY+H*0.35,0,cx,houseY+H*0.40,W*0.18);
     doorG.addColorStop(0,`rgba(255,180,60,${0.08+Math.sin(t*0.25)*0.02})`);
     doorG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=doorG;ctx.fillRect(cx-W*0.18,houseY+H*0.26,W*0.36,H*0.20);

     /* ── LUMIÈRES DE NOËL ── */
     for(const l of xmasLights){
      l.ph+=0.040;
      const la=0.65+0.35*Math.abs(Math.sin(l.ph));
      ctx.fillStyle=`rgba(${l.col},${la})`;
      ctx.beginPath();ctx.arc(l.x,l.y,l.r,0,Math.PI*2);ctx.fill();
      const lg=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*4);
      lg.addColorStop(0,`rgba(${l.col},${la*0.35})`);lg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lg;ctx.fillRect(l.x-l.r*4,l.y-l.r*4,l.r*8,l.r*8);
      if(xmasLights.indexOf(l)<xmasLights.length-1){
       const nl=xmasLights[xmasLights.indexOf(l)+1];
       ctx.strokeStyle='rgba(80,70,60,0.40)';ctx.lineWidth=0.8;
       ctx.beginPath();ctx.moveTo(l.x,l.y);ctx.quadraticCurveTo((l.x+nl.x)/2,l.y+H*0.018,nl.x,nl.y);ctx.stroke();
      }
     }

     /* ── NEIGE AU SOL ── */
     /* Reflet chaud de la maison sur la neige */
     const snowRefl=ctx.createRadialGradient(cx,H*0.84,0,cx,H*0.84,W*0.55);
     snowRefl.addColorStop(0,`rgba(255,200,80,${0.08+Math.sin(t*0.2)*0.02})`);
     snowRefl.addColorStop(0.5,'rgba(200,160,60,0.03)');
     snowRefl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=snowRefl;ctx.fillRect(0,H*0.78,W,H*0.12);
     ctx.fillStyle='rgba(212,224,244,0.94)';
     ctx.beginPath();ctx.ellipse(cx,H*0.84,W*0.62,H*0.055,0,0,Math.PI*2);ctx.fill();
     ctx.fillRect(0,H*0.84,W,H*0.16);
     /* Petites bosses de neige */
     for(let bi=0;bi<6;bi++){
      const bx=W*(0.08+bi*0.16),br=W*(0.04+Math.sin(bi*2.3)*0.02);
      ctx.fillStyle='rgba(218,228,248,0.70)';
      ctx.beginPath();ctx.ellipse(bx,H*0.84,br,H*0.018,0,0,Math.PI*2);ctx.fill();
     }

     /* ── NEIGE QUI TOMBE ── */
     for(const s of snow){
      s.y+=s.vy;s.x+=s.vx;s.wb+=s.wSpd;s.x+=Math.sin(s.wb)*0.16;
      if(s.y>H){s.y=-5;s.x=Math.random()*W;}
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(220,230,248,${s.op})`;ctx.fill();
     }

     /* ── KEVIN ANIMÉ — pose iconique mains sur les joues ── */
     /* Cycle de sursaut : Kevin fait régulièrement son geste */
     const SURSAUT_PERIOD=180; /* frames entre sursauts */
     const sursautPhase=t/0.016 % SURSAUT_PERIOD; /* frame courante dans le cycle */
     /* Amplitude du sursaut : 0 au repos, pic à 1 puis redescente */
     let sursaut=0;
     if(sursautPhase<30){
      sursaut=Math.sin((sursautPhase/30)*Math.PI); /* montée/descente rapide */
     }

     const kvX=cx, kvY=H*0.53;
     const sc=W*0.032; /* unité de taille */

     ctx.save();
     /* Légère inclinaison de tête pendant le sursaut */
     const headTilt=sursaut*0.08;
     ctx.translate(kvX,kvY);

     /* Corps — légèrement élargi pendant le sursaut (souffle coupé) */
     const bodyW=sc*1.05+sursaut*sc*0.08;
     ctx.fillStyle='rgba(12,10,22,0.97)';
     ctx.beginPath();ctx.ellipse(0,sc*0.55,bodyW,sc*1.55,0,0,Math.PI*2);ctx.fill();
     /* Torse rectangulaire */
     ctx.beginPath();ctx.roundRect(-bodyW,0,bodyW*2,sc*1.4,sc*0.15);ctx.fill();

     /* Tête — légèrement agrandie (surprise) */
     const headScale=1+sursaut*0.06;
     ctx.save();
     ctx.translate(0,-sc*1.35);
     ctx.rotate(headTilt);
     ctx.scale(headScale,headScale);
     ctx.beginPath();ctx.arc(0,0,sc*1.0,0,Math.PI*2);ctx.fill();
     /* Cheveux */
     ctx.fillStyle='rgba(8,6,15,0.98)';
     ctx.beginPath();ctx.ellipse(0,-sc*0.6,sc*0.90,sc*0.55,0,0,Math.PI*2);ctx.fill();
     /* Bouche ouverte — s'ouvre pendant le sursaut */
     const mouthOpen=0.18+sursaut*0.22;
     ctx.fillStyle='rgba(60,25,30,0.85)';
     ctx.beginPath();ctx.ellipse(0,sc*0.28,sc*0.28,sc*mouthOpen,0,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* Bras — se soulèvent en sursaut */
     const armLift=sursaut*0.55; /* 0=bas, 1=haut */
     const armAngleL=-Math.PI*0.30 - armLift*Math.PI*0.28;
     const armAngleR= Math.PI*1.30 + armLift*Math.PI*0.28;
     ctx.lineWidth=sc*0.55;ctx.lineCap='round';
     ctx.strokeStyle='rgba(12,10,22,0.97)';

     /* Bras gauche */
     ctx.beginPath();
     ctx.moveTo(-sc*0.85,-sc*0.15);
     ctx.lineTo(
      -sc*0.85+Math.cos(armAngleL)*sc*1.4,
      -sc*0.15+Math.sin(armAngleL)*sc*1.4
     );
     ctx.stroke();

     /* Bras droit */
     ctx.beginPath();
     ctx.moveTo(sc*0.85,-sc*0.15);
     ctx.lineTo(
      sc*0.85+Math.cos(armAngleR)*sc*1.4,
      -sc*0.15+Math.sin(armAngleR)*sc*1.4
     );
     ctx.stroke();

     /* Mains sur les joues — se placent contre la tête en sursaut */
     const handDist=(1-armLift)*sc*0.5; /* s'écartent au repos, se collent en sursaut */
     ctx.fillStyle='rgba(12,10,22,0.97)';
     /* Main gauche */
     ctx.beginPath();ctx.arc(
      -sc*1.08+handDist,
      -sc*1.35+Math.sin(armAngleL)*sc*0.3,
      sc*0.38,0,Math.PI*2
     );ctx.fill();
     /* Main droite */
     ctx.beginPath();ctx.arc(
      sc*1.08-handDist,
      -sc*1.35+Math.sin(armAngleR-Math.PI)*sc*0.3,
      sc*0.38,0,Math.PI*2
     );ctx.fill();

     /* Jambes */
     ctx.lineWidth=sc*0.52;
     ctx.beginPath();ctx.moveTo(-sc*0.40,sc*1.40);ctx.lineTo(-sc*0.44,sc*2.55);ctx.stroke();
     ctx.beginPath();ctx.moveTo(sc*0.40,sc*1.40);ctx.lineTo(sc*0.44,sc*2.55);ctx.stroke();

     ctx.restore();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.08,cx,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(6,8,18,0.06)');
     vg.addColorStop(0.70,'rgba(6,8,18,0.40)');
     vg.addColorStop(1,'rgba(4,5,14,0.94)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
