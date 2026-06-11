// CinéQuiz splash chunk — Jarhead
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Jarhead"]={
   name:'Jarhead',
   color:'220,80,20',
   ref:'Jarhead \u2014 Sam Mendes, 2005',
   run(cv,ctx,W,H,stop){
    /* ── Soldat premier plan (Jarhead.svg — 206×389) ── */
    const soldierImg=new Image();let soldierReady=false;
    soldierImg.onload=()=>{soldierReady=true;};
    soldierImg.src='images/Jarhead.svg';

    cv.style.opacity='1.0';

    let _jhStyle=document.getElementById('_jh_splash_style');
    if(!_jhStyle){_jhStyle=document.createElement('style');_jhStyle.id='_jh_splash_style';document.head.appendChild(_jhStyle);}
    _jhStyle.textContent=`

      
      
    `;
    const _jhWatch=setInterval(()=>{if(stop.v){_jhStyle.textContent='';clearInterval(_jhWatch);}},200);

    let t=0;
    const cx=W/2;
    const groundY=H*0.78;

    /* ── GEYSER DE PETROLE — colonne unique à gauche comme dans le film ── */
    const FX=W*0.22;   /* geyser gauche — plus proche du bord */
    const F_BASE=groundY;
    const F_STEM_W=W*0.030;
    const F_CROWN_W=W*0.24;
    const F_HEIGHT=H*0.78;

    /* Particules geyser */
    const flameP=Array.from({length:130},()=>{
     const isStem=Math.random()<0.40;
     return {
      yOff:Math.random()*(isStem?F_HEIGHT*0.45:F_HEIGHT),
      xOff:(Math.random()-0.5)*(isStem?F_STEM_W*1.2:F_CROWN_W*0.9),
      vy:Math.random()*(isStem?4.5:2.8)+(isStem?2.5:1.4),
      r:Math.random()*(isStem?F_STEM_W*0.8:F_CROWN_W*0.55)+(isStem?F_STEM_W*0.3:F_CROWN_W*0.18),
      hot:Math.random(),
      ph:Math.random()*Math.PI*2,
      wobble:Math.random()*Math.PI*2,
      stem:isStem,
     };
    });

    /* Fumée noire de pétrole — lourde, dérive vers la droite et envahit le ciel */
    const smokePuffs=Array.from({length:80},(_,i)=>({
     x:FX+(Math.random()-0.3)*W*0.22,
     y:groundY-F_HEIGHT*0.38-Math.random()*F_HEIGHT*0.72,
     r:W*(0.14+Math.random()*0.36),
     vx:0.20+Math.random()*0.48,
     vy:-(0.02+Math.random()*0.04),
     op:0.32+Math.random()*0.46,
     tone:Math.random()*0.25,
     ph:Math.random()*Math.PI*2,
     phSpd:Math.random()*0.006+0.002,
    }));

    /* Braises / gouttelettes enflammées */
    const embers=Array.from({length:65},()=>({
     x:FX+(Math.random()-0.5)*F_STEM_W*4,
     y:groundY-Math.random()*F_HEIGHT*0.6,
     vx:(Math.random()-0.5)*1.10,
     vy:-(Math.random()*2.4+0.8),
     r:Math.random()*2.8+0.5,
     op:Math.random()*0.85+0.15,
     ph:Math.random()*Math.PI*2,
    }));

    /* Silhouettes lointaines — soldats au fond comme dans le film */
    const distFigures=Array.from({length:5},(_,i)=>({
     x:W*(0.32+i*0.10+Math.random()*0.04),
     h:H*(0.028+Math.random()*0.012),
    }));

    /* Override position citation/logo */
    let _jhPos=document.getElementById('_jh_pos_s');
    if(!_jhPos){_jhPos=document.createElement('style');_jhPos.id='_jh_pos_s';document.head.appendChild(_jhPos);}
    _jhPos.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;transition:opacity 0.65s ease 0.20s!important;}#splash-content-wrap.reveal{opacity:1!important;transform:translateY(0)!important;}#splash-film-logo{max-width:160px!important;}#splash-quote-text{color:rgba(255,255,255,0.95)!important;text-shadow:0 1px 10px rgba(0,0,0,0.98)!important;}';
    const _jhPosWatch=setInterval(()=>{if(stop.v){_jhPos.textContent='';clearInterval(_jhPosWatch);}},200);

    /* Cache silhouettes */
    let _silouCache={};
    function getSilhouette(key,img,dw,dh){
     if(_silouCache[key])return _silouCache[key];
     const oc=document.createElement('canvas');
     oc.width=Math.ceil(dw);oc.height=Math.ceil(dh);
     const ot=oc.getContext('2d');
     ot.drawImage(img,0,0,dw,dh);
     ot.globalCompositeOperation='source-in';
     ot.fillStyle='rgba(4,2,1,1)';
     ot.fillRect(0,0,dw,dh);
     _silouCache[key]=oc;
     return oc;
    }
    function drawSilhouette(key,img,dx,dy,dw,dh,alpha){
     if(!img)return;
     const sil=getSilhouette(key,img,dw,dh);
     ctx.save();ctx.globalAlpha=alpha;
     ctx.drawImage(sil,dx,dy,dw,dh);
     ctx.restore();
    }

    function drawFireColumn(fx, particles){
     /* Halo intense a la base */
     const baseGlow=ctx.createRadialGradient(fx,F_BASE,0,fx,F_BASE,W*0.52);
     baseGlow.addColorStop(0,`rgba(255,180,20,${0.72+Math.sin(t*2.3)*0.12})`);
     baseGlow.addColorStop(0.15,`rgba(255,110,5,${0.45+Math.sin(t*1.6)*0.08})`);
     baseGlow.addColorStop(0.40,'rgba(200,50,3,0.18)');
     baseGlow.addColorStop(0.70,'rgba(120,20,0,0.06)');
     baseGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=baseGlow;ctx.fillRect(0,0,W,H);

     /* Tige fine du geyser */
     const stemPulse=Math.sin(t*8)*0.15+1.0;
     const stemG=ctx.createLinearGradient(fx,F_BASE,fx,F_BASE-F_HEIGHT*0.55);
     stemG.addColorStop(0,'rgba(255,230,100,0.80)');
     stemG.addColorStop(0.08,'rgba(255,160,15,0.68)');
     stemG.addColorStop(0.28,'rgba(240,80,5,0.48)');
     stemG.addColorStop(0.55,'rgba(180,35,2,0.22)');
     stemG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=stemG;
     ctx.beginPath();
     const sw=F_STEM_W*stemPulse;
     ctx.moveTo(fx-sw*1.2,F_BASE);
     ctx.bezierCurveTo(fx-sw*0.9,F_BASE-F_HEIGHT*0.18,fx-sw*0.7,F_BASE-F_HEIGHT*0.38,fx-sw*0.5,F_BASE-F_HEIGHT*0.55);
     ctx.lineTo(fx+sw*0.5,F_BASE-F_HEIGHT*0.55);
     ctx.bezierCurveTo(fx+sw*0.7,F_BASE-F_HEIGHT*0.38,fx+sw*0.9,F_BASE-F_HEIGHT*0.18,fx+sw*1.2,F_BASE);
     ctx.closePath();ctx.fill();

     /* Panache superieur en champignon */
     const crownY=F_BASE-F_HEIGHT*0.48;
     const crownG=ctx.createRadialGradient(fx,crownY,F_STEM_W,fx,crownY,F_CROWN_W*0.85);
     crownG.addColorStop(0,`rgba(255,140,10,${0.52+Math.sin(t*1.9)*0.10})`);
     crownG.addColorStop(0.28,`rgba(220,55,4,${0.32+Math.sin(t*1.3)*0.07})`);
     crownG.addColorStop(0.55,'rgba(160,25,2,0.14)');
     crownG.addColorStop(0.80,'rgba(80,10,0,0.05)');
     crownG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=crownG;ctx.beginPath();ctx.arc(fx,crownY,F_CROWN_W*0.85,0,Math.PI*2);ctx.fill();

     /* Particules volumetriques */
     for(const fp of particles){
      fp.yOff+=fp.vy;
      fp.ph+=0.08;
      fp.wobble+=fp.stem?0.05:0.025;
      if(fp.yOff>F_HEIGHT){
       fp.yOff=Math.random()*(fp.stem?F_HEIGHT*0.05:F_HEIGHT*0.12);
       fp.xOff=(Math.random()-0.5)*(fp.stem?F_STEM_W*1.0:F_CROWN_W*0.80);
       fp.vy=Math.random()*(fp.stem?4.5:2.8)+(fp.stem?2.5:1.4);
       fp.r=Math.random()*(fp.stem?F_STEM_W*0.8:F_CROWN_W*0.50)+(fp.stem?F_STEM_W*0.3:F_CROWN_W*0.18);
       fp.hot=Math.random();
      }
      const prog=fp.yOff/F_HEIGHT;
      const maxX=fp.stem?F_STEM_W*(1.5-prog*0.5):F_CROWN_W*(0.25+prog*0.75);
      const wobble=Math.sin(fp.wobble)*maxX*0.30*(fp.stem?0.4:1.0);
      const px=fx+Math.max(-maxX,Math.min(maxX,fp.xOff*(1-prog*0.3)+wobble));
      const py=F_BASE-fp.yOff;
      const radius=fp.r*(0.55+Math.random()*0.12)*(fp.stem?1-prog*0.45:1-prog*0.55);
      const alpha=Math.max(0,0.90-prog*0.75)*(0.60+Math.sin(fp.ph)*0.40);
      let r,g,b;
      if(fp.hot>0.72&&prog<0.22){r=255;g=Math.round(240+fp.hot*15);b=Math.round(fp.hot*160);}
      else if(fp.hot>0.45&&prog<0.42){r=255;g=Math.round(168-prog*55);b=8;}
      else if(prog<0.58){r=255;g=Math.round(88-prog*48);b=4;}
      else{r=Math.round(185-prog*75);g=Math.round(25-prog*15);b=2;}
      const fg2=ctx.createRadialGradient(px,py,0,px,py,radius);
      fg2.addColorStop(0,`rgba(${r},${g},${b},${alpha})`);
      fg2.addColorStop(0.45,`rgba(${r},${Math.max(0,g-90)},0,${alpha*0.38})`);
      fg2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg2;ctx.beginPath();ctx.arc(px,py,radius,0,Math.PI*2);ctx.fill();
     }
    }

    function drawSmoke(puffs, fx){
     for(const s of puffs){
      s.x+=s.vx;s.y+=s.vy;s.ph+=s.phSpd;
      if(s.vx>0&&s.x>W+s.r*2){
       s.x=fx+(Math.random()-0.4)*W*0.10;
       s.y=groundY-F_HEIGHT*0.42-Math.random()*F_HEIGHT*0.42;
       s.op=0.28+Math.random()*0.34;
      }
      if(s.vx<0&&s.x<-s.r*2){
       s.x=fx+(Math.random()-0.6)*W*0.10;
       s.y=groundY-F_HEIGHT*0.42-Math.random()*F_HEIGHT*0.42;
       s.op=0.28+Math.random()*0.34;
      }
      const pulse=0.90+Math.sin(s.ph)*0.10;
      const tr=s.r*pulse;
      const fire=Math.max(0,1-Math.abs(s.x-fx)/(W*0.30));
      const R=Math.round(22+s.tone*55+fire*65);
      const G=Math.round(15+s.tone*38+fire*32);
      const B=Math.round(5+s.tone*14);
      const sg=ctx.createRadialGradient(s.x,s.y,tr*0.05,s.x,s.y,tr);
      sg.addColorStop(0,`rgba(${R},${G},${B},${s.op*pulse})`);
      sg.addColorStop(0.50,`rgba(${Math.round(R*0.6)},${Math.round(G*0.6)},${Math.round(B*0.6)},${s.op*0.45*pulse})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,tr,0,Math.PI*2);ctx.fill();
     }
    }

    function drawSoldiers(){
     if(!soldierReady) return;
     /* Jarhead SVG 206×389 — réduit à 36% de H, collé à droite */
     const SH = H * 0.36;
     const SW = SH * (206/389);
     const SX = W * 0.97 - SW;
     const SY = groundY - SH;
     drawSilhouette('jarhead_soldier', soldierImg, SX, SY, SW, SH, 0.97);

     /* Silhouettes lointaines au fond — supprimées */
    }

    function frame(){
     if(stop.v)return;

     /* Ciel dramatique — orange/ambre chaud en bas, quasi-noir en haut */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#080400');
     bg.addColorStop(0.18,'#110700');
     bg.addColorStop(0.38,'#2a1002');
     bg.addColorStop(0.55,'#5a2604');
     bg.addColorStop(0.68,'#8c3f06');
     bg.addColorStop(0.78,'#b05510');
     bg.addColorStop(0.88,'#7a3808');
     bg.addColorStop(1.00,'#2a1203');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Lueur ambiante geyser — très chaude, couvre tout le ciel */
     const ambG=ctx.createRadialGradient(FX,groundY*0.45,0,FX,groundY*0.45,W*1.20);
     ambG.addColorStop(0,`rgba(255,120,10,${0.38+Math.sin(t*0.9)*0.09})`);
     ambG.addColorStop(0.22,'rgba(200,60,4,0.22)');
     ambG.addColorStop(0.48,'rgba(130,25,2,0.10)');
     ambG.addColorStop(0.72,'rgba(60,8,0,0.04)');
     ambG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ambG;ctx.fillRect(0,0,W,H);

     /* Contre-jour chaud sur la droite — comme dans l'image */
     const rimG=ctx.createLinearGradient(W*0.55,0,W,H*0.90);
     rimG.addColorStop(0,'rgba(180,70,8,0.08)');
     rimG.addColorStop(0.40,'rgba(140,50,5,0.12)');
     rimG.addColorStop(0.70,'rgba(100,35,3,0.08)');
     rimG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rimG;ctx.fillRect(W*0.50,0,W*0.50,H);

     /* Sol désert pétrole — quasi-noir, iridescent sous les flammes */
     const dg=ctx.createLinearGradient(0,groundY,0,H);
     dg.addColorStop(0,'rgba(28,14,3,0.98)');
     dg.addColorStop(0.20,'rgba(16,8,1,0.99)');
     dg.addColorStop(0.55,'rgba(8,4,1,1.0)');
     dg.addColorStop(1,'rgba(4,2,0,1.0)');
     ctx.fillStyle=dg;ctx.fillRect(0,groundY,W,H-groundY);

     /* Reflet iridescent pétrole — nappe d'huile sur le sol */
     const iridW=W*0.70, iridX=FX-iridW*0.30;
     const iridG=ctx.createLinearGradient(iridX,groundY,iridX+iridW,groundY+H*0.08);
     iridG.addColorStop(0,`rgba(80,50,8,${0.18+Math.sin(t*0.7)*0.04})`);
     iridG.addColorStop(0.30,`rgba(50,80,40,${0.10+Math.sin(t*0.5+1)*0.03})`);
     iridG.addColorStop(0.55,`rgba(30,50,80,${0.08+Math.sin(t*0.6+2)*0.03})`);
     iridG.addColorStop(0.80,`rgba(60,30,60,${0.10+Math.sin(t*0.8)*0.03})`);
     iridG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=iridG;
     ctx.beginPath();ctx.ellipse(iridX+iridW*0.5,groundY+H*0.025,iridW*0.55,H*0.040,0,0,Math.PI*2);ctx.fill();

     /* Reflets des flammes sur le sol miroitant — très étendus */
     const reflG=ctx.createRadialGradient(FX,groundY+H*0.01,0,FX,groundY+H*0.01,W*0.75);
     reflG.addColorStop(0,`rgba(255,120,8,${0.45+Math.sin(t*2.1)*0.12})`);
     reflG.addColorStop(0.20,`rgba(200,65,4,${0.28+Math.sin(t*1.5)*0.07})`);
     reflG.addColorStop(0.45,`rgba(130,28,2,${0.14+Math.sin(t*1.8)*0.04})`);
     reflG.addColorStop(0.70,'rgba(60,10,0,0.05)');
     reflG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=reflG;ctx.beginPath();ctx.ellipse(FX,groundY+H*0.012,W*0.68,H*0.045,0,0,Math.PI*2);ctx.fill();

     /* Ligne de lumière horizontale à l'horizon — sol pétrolier */
     const horizG=ctx.createLinearGradient(0,groundY-2,0,groundY+H*0.06);
     horizG.addColorStop(0,`rgba(180,80,10,${0.35+Math.sin(t*1.2)*0.08})`);
     horizG.addColorStop(0.25,'rgba(120,40,4,0.15)');
     horizG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=horizG;ctx.fillRect(0,groundY-2,W,H*0.06);

     /* Mare de pétrole au pied du geyser */
     const poolG=ctx.createRadialGradient(FX,groundY,0,FX,groundY,W*0.18);
     poolG.addColorStop(0,`rgba(8,5,1,${0.72+Math.sin(t*1.5)*0.08})`);
     poolG.addColorStop(0.55,'rgba(15,8,2,0.40)');
     poolG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=poolG;ctx.beginPath();ctx.ellipse(FX,groundY+4,W*0.18,H*0.015,0,0,Math.PI*2);ctx.fill();

     /* ── Colonnes de feu secondaires en arrière-plan ── */
     /* Petite colonne centrale (comme dans l'image) */
     const bfx=W*0.54, bfBase=groundY, bfH=H*0.38;
     const bfG=ctx.createLinearGradient(bfx,bfBase,bfx,bfBase-bfH);
     bfG.addColorStop(0,`rgba(255,200,60,${0.55+Math.sin(t*2.8)*0.14})`);
     bfG.addColorStop(0.15,`rgba(255,130,10,${0.38+Math.sin(t*2.0)*0.09})`);
     bfG.addColorStop(0.40,'rgba(200,55,4,0.18)');
     bfG.addColorStop(0.70,'rgba(110,20,0,0.06)');
     bfG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bfG;
     const bsw=W*0.012*(1+Math.sin(t*7)*0.15);
     ctx.beginPath();
     ctx.moveTo(bfx-bsw*1.5,bfBase);
     ctx.bezierCurveTo(bfx-bsw,bfBase-bfH*0.3,bfx-bsw*0.6,bfBase-bfH*0.6,bfx,bfBase-bfH);
     ctx.bezierCurveTo(bfx+bsw*0.6,bfBase-bfH*0.6,bfx+bsw,bfBase-bfH*0.3,bfx+bsw*1.5,bfBase);
     ctx.closePath();ctx.fill();
     /* Halo de cette colonne */
     const bfHaloG=ctx.createRadialGradient(bfx,bfBase-bfH*0.3,0,bfx,bfBase-bfH*0.3,W*0.18);
     bfHaloG.addColorStop(0,`rgba(255,160,20,${0.18+Math.sin(t*2.5)*0.06})`);
     bfHaloG.addColorStop(0.5,'rgba(180,55,4,0.06)');
     bfHaloG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bfHaloG;ctx.fillRect(bfx-W*0.20,bfBase-bfH,W*0.40,bfH);

     /* Fumée (fond) */
     drawSmoke(smokePuffs,FX);

     /* Geyser unique */
     drawFireColumn(FX,flameP);

     /* Soldats */
     drawSoldiers();

     /* Braises */
     for(const e of embers){
      e.x+=e.vx+Math.sin(t*2.2+e.ph)*0.22;
      e.y+=e.vy;
      e.vy+=0.018;
      if(e.y<groundY-F_HEIGHT*1.05||e.y>groundY+2||e.x<-5||e.x>W+5){
       e.x=FX+(Math.random()-0.5)*F_STEM_W*4;
       e.y=groundY-F_HEIGHT*0.08-Math.random()*F_HEIGHT*0.28;
       e.vy=-(Math.random()*2.4+0.8);
       e.vx=(Math.random()-0.5)*1.10;
      }
      const ep=Math.max(0,1-(groundY-e.y)/(F_HEIGHT));
      ctx.fillStyle=`rgba(255,${Math.round(150+ep*90)},${Math.round(ep*30)},${e.op*(0.45+Math.sin(e.ph+t*5)*0.55)})`;
      ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);ctx.fill();
     }

     /* Vignette (haut/bas seulement, pas de bandes latérales) */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.10,cx,H*0.45,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(0,0,0,0.06)');
     vg.addColorStop(1,'rgba(0,0,0,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain pellicule */
     for(let i=0;i<24;i++){const g=6+Math.random()*16|0;ctx.fillStyle=`rgba(${g+6},${g+2},${g},${Math.random()*0.022})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
