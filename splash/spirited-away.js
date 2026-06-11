// CinéQuiz splash chunk — Spirited Away
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Spirited Away"]={
   name:'Spirited Away',
   color:'20,100,200',
   ref:'Spirited Away \u2014 Hayao Miyazaki, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* Position citation + logo haut de l'écran, juste sous le logo Cinéquiz */
    let _saPos=document.getElementById('_sa_splash_pos');
    if(!_saPos){_saPos=document.createElement('style');_saPos.id='_sa_splash_pos';document.head.appendChild(_saPos);}
    _saPos.textContent='#splash-content-wrap{top:26%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _saWatch=setInterval(()=>{if(stop.v){_saPos.textContent='';clearInterval(_saWatch);}},200);

    /* ── Étoiles fixes ── */
    const stars=Array.from({length:80},()=>({
     x:Math.random()*W, y:Math.random()*H*0.48,
     r:Math.random()*1.2+0.2,
     phase:Math.random()*Math.PI*2, spd:Math.random()*0.02+0.005
    }));

    /* ── Lanternes qui montent ── */
    const lanterns=Array.from({length:22},()=>({
     x:Math.random()*W, y:H*0.5+Math.random()*H*0.5,
     vy:-(Math.random()*0.55+0.18),
     vx:(Math.random()-0.5)*0.15,
     size:Math.random()*9+5,
     hue:25+Math.random()*25,
     op:Math.random()*0.55+0.25,
     phase:Math.random()*Math.PI*2,
     sway:Math.random()*Math.PI*2,
     swaySpd:Math.random()*0.015+0.005
    }));

    /* ── Kodamas (esprits blancs sphériques) ── */
    const kodamas=Array.from({length:8},()=>({
     x:Math.random()*W, y:H*0.30+Math.random()*H*0.45,
     vx:(Math.random()-0.5)*0.22,
     vy:(Math.random()-0.5)*0.14,
     r:Math.random()*10+6,
     phase:Math.random()*Math.PI*2,
     phaseSpd:Math.random()*0.012+0.005,
     op:Math.random()*0.25+0.10
    }));

    /* ── Suikotons — petits esprits noirs ronds ── */
    const susuwatari=Array.from({length:14},()=>({
     x:Math.random()*W, y:H*0.65+Math.random()*H*0.30,
     vx:(Math.random()-0.5)*0.5,
     vy:-(Math.random()*0.3+0.05),
     r:Math.random()*4+2,
     phase:Math.random()*Math.PI*2,
     op:Math.random()*0.35+0.12
    }));

    /* ── No-Face — silhouette qui glisse sur l'eau ── */
    let nfX=-60, nfSpd=0.32;

    function drawSky(){
     /* Nuit bleu nuit — dégradé profond */
     const sky=ctx.createLinearGradient(0,0,0,H*0.56);
     sky.addColorStop(0,'rgba(2,5,20,0.95)');
     sky.addColorStop(0.4,'rgba(4,12,38,0.88)');
     sky.addColorStop(0.75,'rgba(6,20,55,0.70)');
     sky.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.56);

     /* Lueur lointaine des bains — ambre chaud en bas */
     const bathGlow=ctx.createRadialGradient(cx,H*0.60,0,cx,H*0.60,W*0.7);
     bathGlow.addColorStop(0,`rgba(200,130,40,${0.08+Math.sin(t*0.4)*0.02})`);
     bathGlow.addColorStop(0.4,`rgba(160,90,20,${0.04+Math.sin(t*0.3)*0.01})`);
     bathGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bathGlow;ctx.fillRect(0,H*0.30,W,H*0.50);
    }

    function drawWater(){
     /* Eau — fond bleu nuit */
     const water=ctx.createLinearGradient(0,H*0.56,0,H);
     water.addColorStop(0,'rgba(4,15,45,0.92)');
     water.addColorStop(0.4,'rgba(2,10,32,0.95)');
     water.addColorStop(1,'rgba(1,5,18,0.98)');
     ctx.fillStyle=water;ctx.fillRect(0,H*0.56,W,H*0.44);

     /* Reflets de lanternes dans l'eau */
     for(const l of lanterns){
      const ry=H*0.56+(H*0.56-l.y)*0.25+H*0.08;
      if(ry>H*0.56&&ry<H){
       const rg=ctx.createRadialGradient(l.x,ry,0,l.x,ry,l.size*2.5);
       rg.addColorStop(0,`hsla(${l.hue},75%,55%,${l.op*0.20})`);
       rg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=rg;ctx.fillRect(l.x-l.size*2.5,ry-l.size,l.size*5,l.size*2.5);
      }
     }

     /* Ondulations de surface */
     for(let i=0;i<5;i++){
      const wy=H*0.56+i*H*0.06;
      const alpha=0.06+Math.sin(t*0.6+i)*0.02;
      ctx.strokeStyle=`rgba(60,120,220,${alpha})`;ctx.lineWidth=0.8;
      ctx.beginPath();
      for(let x=0;x<=W;x+=5){
       const y=wy+Math.sin(x*0.025+t*0.7+i*0.8)*2.5+Math.sin(x*0.05-t*0.4+i)*1;
       x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }ctx.stroke();
     }
    }

    function drawBathhouse(){
     /* Silhouette du bâtiment des bains en bas de l'écran */
     const baseY=H*0.82;

     /* Pilotis */
     ctx.fillStyle='rgba(4,3,8,0.95)';
     const pilotis=[W*0.28,W*0.38,W*0.50,W*0.62,W*0.72];
     for(const px of pilotis){
      ctx.fillRect(px-3,baseY,6,H-baseY);
     }

     /* Corps principal */
     ctx.fillStyle='rgba(6,4,10,0.97)';
     ctx.beginPath();ctx.roundRect(W*0.22,baseY-H*0.11,W*0.56,H*0.11,[4,4,0,0]);ctx.fill();

     /* Toit courbe style japonais */
     ctx.fillStyle='rgba(5,3,9,0.97)';
     ctx.beginPath();
     ctx.moveTo(W*0.18,baseY-H*0.11);
     ctx.bezierCurveTo(W*0.25,baseY-H*0.175,W*0.40,baseY-H*0.185,cx,baseY-H*0.19);
     ctx.bezierCurveTo(W*0.60,baseY-H*0.185,W*0.75,baseY-H*0.175,W*0.82,baseY-H*0.11);
     ctx.closePath();ctx.fill();

     /* Toit supérieur (étage) */
     ctx.beginPath();
     ctx.moveTo(W*0.30,baseY-H*0.19);
     ctx.bezierCurveTo(W*0.36,baseY-H*0.245,W*0.45,baseY-H*0.255,cx,baseY-H*0.26);
     ctx.bezierCurveTo(W*0.55,baseY-H*0.255,W*0.64,baseY-H*0.245,W*0.70,baseY-H*0.19);
     ctx.closePath();ctx.fill();

     /* Fenêtres lumineuses */
     const wins=[[W*0.30,baseY-H*0.07],[W*0.40,baseY-H*0.07],[W*0.50,baseY-H*0.07],
                 [W*0.60,baseY-H*0.07],[W*0.70,baseY-H*0.07],[W*0.40,baseY-H*0.155],[W*0.60,baseY-H*0.155]];
     for(const [wx,wy] of wins){
      const wp=0.5+Math.sin(t*0.4+wx)*0.15;
      const wg=ctx.createRadialGradient(wx,wy,0,wx,wy,12);
      wg.addColorStop(0,`rgba(255,195,80,${0.22*wp})`);
      wg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wg;ctx.fillRect(wx-14,wy-12,28,24);
      ctx.fillStyle=`rgba(255,200,90,${0.55*wp})`;
      ctx.beginPath();ctx.roundRect(wx-5,wy-8,10,14,1);ctx.fill();
     }

     /* Reflet du bâtiment dans l'eau */
     ctx.save();ctx.globalAlpha=0.12;
     ctx.scale(1,-1);ctx.translate(0,-H*1.12);
     ctx.fillStyle='rgba(6,4,10,0.95)';
     ctx.beginPath();ctx.roundRect(W*0.22,baseY-H*0.11,W*0.56,H*0.11,[4,4,0,0]);ctx.fill();
     ctx.restore();
    }

    function drawNoFace(x){
     const y=H*0.60;
     const sc=0.80;
     ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);

     /* Corps robe noire — forme fantomatique */
     ctx.fillStyle='rgba(4,2,8,0.92)';
     ctx.beginPath();
     ctx.moveTo(0,-55);
     ctx.bezierCurveTo(-22,-50,-28,-20,-25,20);
     ctx.bezierCurveTo(-20,45,-10,55,0,58);
     ctx.bezierCurveTo(10,55,20,45,25,20);
     ctx.bezierCurveTo(28,-20,22,-50,0,-55);
     ctx.closePath();ctx.fill();

     /* Ondulation bas de la robe */
     ctx.fillStyle='rgba(3,1,6,0.85)';
     ctx.beginPath();
     ctx.moveTo(-25,20);
     ctx.bezierCurveTo(-28,35,-22,50,-15,58);
     ctx.bezierCurveTo(-8,48,-4,38,0,42);
     ctx.bezierCurveTo(4,38,8,48,15,58);
     ctx.bezierCurveTo(22,50,28,35,25,20);
     ctx.closePath();ctx.fill();

     /* Masque blanc */
     ctx.fillStyle='rgba(235,232,225,0.88)';
     ctx.beginPath();ctx.ellipse(0,-38,14,18,0,0,Math.PI*2);ctx.fill();

     /* Yeux (petits points noirs) */
     ctx.fillStyle='rgba(10,8,15,0.92)';
     ctx.beginPath();ctx.ellipse(-5,-40,3,4,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(5,-40,3,4,0,0,Math.PI*2);ctx.fill();

     /* Reflet masque */
     ctx.fillStyle='rgba(255,255,255,0.15)';
     ctx.beginPath();ctx.ellipse(-4,-44,4,3,-0.4,0,Math.PI*2);ctx.fill();

     /* Halo sombre autour */
     const ng=ctx.createRadialGradient(0,-30,10,0,-30,55);
     ng.addColorStop(0,'rgba(8,4,18,0.14)');
     ng.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ng;ctx.fillRect(-60,-90,120,130);

     ctx.restore();
    }

    function drawKodama(x,y,r,op,phase){
     ctx.save();ctx.translate(x,y);ctx.globalAlpha=op;
     const nod=Math.sin(phase)*0.12;

     /* Corps */
     ctx.fillStyle='rgba(235,238,230,0.82)';
     ctx.beginPath();ctx.ellipse(0,0,r*0.75,r,0,0,Math.PI*2);ctx.fill();

     /* Tête inclinée */
     ctx.save();ctx.rotate(nod);
     ctx.beginPath();ctx.ellipse(0,-r*1.1,r*0.65,r*0.72,0,0,Math.PI*2);ctx.fill();
     /* Yeux */
     ctx.fillStyle='rgba(15,15,25,0.85)';
     ctx.beginPath();ctx.arc(-r*0.20,-r*1.08,r*0.10,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(r*0.20,-r*1.08,r*0.10,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* Lueur douce */
     const kg=ctx.createRadialGradient(0,-r*0.5,0,0,-r*0.5,r*2.2);
     kg.addColorStop(0,'rgba(220,240,200,0.10)');
     kg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.globalAlpha=op*0.6;ctx.fillStyle=kg;
     ctx.beginPath();ctx.arc(0,-r*0.5,r*2.2,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(1,3,12,0.18)';ctx.fillRect(0,0,W,H);

     drawSky();

     /* Étoiles */
     for(const s of stars){
      s.phase+=s.spd;
      const p=0.6+Math.sin(s.phase)*0.4;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*p,0,Math.PI*2);
      ctx.fillStyle=`rgba(220,225,240,${0.45*p})`;ctx.fill();
     }

     drawWater();
     drawBathhouse();

     /* Lanternes */
     for(const l of lanterns){
      l.y+=l.vy; l.x+=l.vx+Math.sin(t*0.25+l.sway)*0.25;
      l.sway+=l.swaySpd;
      if(l.y<H*0.05){l.y=H*0.55+Math.random()*H*0.35;l.x=Math.random()*W;}
      const pulse=1+Math.sin(t*1.1+l.phase)*0.08;
      /* Halo */
      const hg=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.size*4);
      hg.addColorStop(0,`hsla(${l.hue},88%,65%,${l.op*0.45*pulse})`);
      hg.addColorStop(0.4,`hsla(${l.hue},80%,55%,${l.op*0.12*pulse})`);
      hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.fillRect(l.x-l.size*4,l.y-l.size*4,l.size*8,l.size*8);
      /* Corps lanterne */
      ctx.save();ctx.translate(l.x,l.y);ctx.scale(1,pulse);
      ctx.fillStyle=`hsla(${l.hue},82%,62%,${l.op})`;
      ctx.beginPath();ctx.ellipse(0,0,l.size*0.5,l.size,0,0,Math.PI*2);ctx.fill();
      /* Fil */
      ctx.strokeStyle=`rgba(180,140,60,${l.op*0.5})`;ctx.lineWidth=0.8;
      ctx.beginPath();ctx.moveTo(0,-l.size);ctx.lineTo(0,-l.size*1.8);ctx.stroke();
      ctx.restore();
     }

     /* Kodamas */
     for(const k of kodamas){
      k.x+=k.vx+Math.sin(t*0.2+k.phase)*0.25;
      k.y+=k.vy+Math.cos(t*0.15+k.phase*1.2)*0.18;
      k.phase+=k.phaseSpd;
      if(k.x<-30)k.x=W+30; if(k.x>W+30)k.x=-30;
      if(k.y<H*0.12)k.vy=Math.abs(k.vy); if(k.y>H*0.58)k.vy=-Math.abs(k.vy);
      drawKodama(k.x,k.y,k.r,k.op*(0.6+Math.sin(k.phase*2)*0.4),k.phase);
     }

     /* Suikotons */
     for(const s of susuwatari){
      s.x+=s.vx; s.y+=s.vy+Math.sin(t*0.8+s.phase)*0.3;
      if(s.y<H*0.55)s.vy=Math.abs(s.vy)*0.5;
      if(s.x<-10)s.x=W+10; if(s.x>W+10)s.x=-10;
      /* Corps noir */
      ctx.fillStyle=`rgba(8,5,14,${s.op*0.9})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
      /* Deux yeux blancs minuscules */
      ctx.fillStyle=`rgba(240,238,230,${s.op*0.85})`;
      ctx.beginPath();ctx.arc(s.x-s.r*0.28,s.y-s.r*0.15,s.r*0.20,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(s.x+s.r*0.28,s.y-s.r*0.15,s.r*0.20,0,Math.PI*2);ctx.fill();
     }

     /* No-Face */
     nfX+=nfSpd;
     if(nfX>W+80)nfX=-80;
     drawNoFace(nfX);

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.08,cx,H*0.48,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,'rgba(0,3,12,0.22)');
     vg.addColorStop(1,'rgba(0,2,8,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
