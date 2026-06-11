// CinéQuiz splash chunk — Juste la fin du Monde
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Juste la fin du Monde"]={
   name:'Juste la fin du Monde',
   color:'180,80,80',
   ref:'Juste la fin du Monde \u2014 Xavier Dolan, 2016',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Fond sombre — ambiance Dolan nocturne ── */
    let _s=document.getElementById('_jf_s');
    if(!_s){_s=document.createElement('style');_s.id='_jf_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Positionnement citation + logo sous l'horloge ── */
    let _jfPos=document.getElementById('_jf_pos');
    if(!_jfPos){_jfPos=document.createElement('style');_jfPos.id='_jf_pos';document.head.appendChild(_jfPos);}
    _jfPos.textContent='#splash-content-wrap{top:60%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _jfPosW=setInterval(()=>{if(stop.v){_jfPos.textContent='';clearInterval(_jfPosW);}},200);

    /* ── État de l'oiseau coucou ── */
    let birdOut=false, birdTimer=0, birdPhase=0;
    const BIRD_INTERVAL=160; /* frames entre sorties */
    const BIRD_DURATION=90;  /* frames visible */
    let birdExtend=0;        /* 0→1 extension du bras */

    /* ── Pendule ── */
    let pendAngle=0, pendVel=0.028;

    /* ── Poussière lumineuse — plus visible sur fond sombre ── */
    const dust=Array.from({length:35},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.10,
     vy:-(0.025+Math.random()*0.045),
     r:Math.random()*1.2+0.3,
     op:Math.random()*0.22+0.06,
     ph:Math.random()*Math.PI*2
    }));

    /* ── Dessine l'horloge à coucou ── */
    function drawClock(bExt){
     const clkW=W*0.62;
     const clkH=clkW*1.05; /* proportions affiche */
     const clkX=cx-clkW/2;
     const clkY=H*0.20;

     ctx.save();

     /* ── Boîtier principal — bois chaud ── */
     const woodG=ctx.createLinearGradient(clkX,clkY,clkX+clkW,clkY+clkH*0.72);
     woodG.addColorStop(0,'#8B5E3C');
     woodG.addColorStop(0.35,'#9E6B42');
     woodG.addColorStop(0.65,'#7A5030');
     woodG.addColorStop(1,'#6B4228');
     ctx.fillStyle=woodG;
     ctx.beginPath();
     ctx.roundRect(clkX+clkW*0.06,clkY+clkH*0.30,clkW*0.88,clkH*0.52,W*0.025);
     ctx.fill();
     /* Ombre bois */
     ctx.strokeStyle='rgba(50,28,10,0.40)';ctx.lineWidth=W*0.006;
     ctx.beginPath();ctx.roundRect(clkX+clkW*0.06,clkY+clkH*0.30,clkW*0.88,clkH*0.52,W*0.025);ctx.stroke();

     /* ── Toit triangulaire sculpté ── */
     ctx.fillStyle='#7A5030';
     ctx.beginPath();
     ctx.moveTo(clkX,          clkY+clkH*0.33);
     ctx.lineTo(cx,            clkY);
     ctx.lineTo(clkX+clkW,     clkY+clkH*0.33);
     ctx.closePath();ctx.fill();
     /* Bordure toit */
     ctx.strokeStyle='rgba(50,28,10,0.50)';ctx.lineWidth=W*0.007;
     ctx.beginPath();
     ctx.moveTo(clkX,          clkY+clkH*0.33);
     ctx.lineTo(cx,            clkY);
     ctx.lineTo(clkX+clkW,     clkY+clkH*0.33);
     ctx.stroke();
     /* Décoration faîtière */
     const peakG=ctx.createRadialGradient(cx,clkY-W*0.01,0,cx,clkY-W*0.01,W*0.04);
     peakG.addColorStop(0,'#BF8850');peakG.addColorStop(1,'#8B5E3C');
     ctx.fillStyle=peakG;
     ctx.beginPath();ctx.arc(cx,clkY-W*0.005,W*0.025,0,Math.PI*2);ctx.fill();
     /* Feuilles de chêne simplifiées sur le toit */
     ctx.fillStyle='#6B4228';
     for(let li=0;li<5;li++){
      const lx=cx+(-2+li)*clkW*0.14, ly=clkY+clkH*0.04+Math.abs(li-2)*clkH*0.04;
      ctx.beginPath();ctx.ellipse(lx,ly,W*0.028,W*0.018,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Cadran ── */
     const dialX=cx, dialY=clkY+clkH*0.50;
     const dialR=clkW*0.28;
     /* Fond cadran ivoire */
     const dialG=ctx.createRadialGradient(dialX-dialR*0.15,dialY-dialR*0.15,dialR*0.05,dialX,dialY,dialR);
     dialG.addColorStop(0,'#F5EDDA');dialG.addColorStop(0.7,'#EDE0C4');dialG.addColorStop(1,'#D4C4A0');
     ctx.fillStyle=dialG;ctx.beginPath();ctx.arc(dialX,dialY,dialR,0,Math.PI*2);ctx.fill();
     /* Bordure cadran */
     ctx.strokeStyle='#8B5E3C';ctx.lineWidth=W*0.018;
     ctx.beginPath();ctx.arc(dialX,dialY,dialR,0,Math.PI*2);ctx.stroke();
     ctx.strokeStyle='rgba(180,148,100,0.60)';ctx.lineWidth=W*0.008;
     ctx.beginPath();ctx.arc(dialX,dialY,dialR*0.90,0,Math.PI*2);ctx.stroke();
     /* Chiffres romains — 12, 3, 6, 9 */
     ctx.fillStyle='rgba(50,30,10,0.90)';
     ctx.font=`bold ${W*0.038}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
     const romanPos=[
      ['XII',dialX,dialY-dialR*0.70],
      ['III', dialX+dialR*0.70,dialY],
      ['VI',  dialX,dialY+dialR*0.70],
      ['IX',  dialX-dialR*0.70,dialY],
     ];
     for(const [txt,rx,ry] of romanPos) ctx.fillText(txt,rx,ry);
     /* Points des heures */
     ctx.fillStyle='rgba(80,50,20,0.55)';
     for(let hi=0;hi<12;hi++){
      const ha=hi/12*Math.PI*2-Math.PI/2;
      const hx=dialX+Math.cos(ha)*dialR*0.82,hy=dialY+Math.sin(ha)*dialR*0.82;
      ctx.beginPath();ctx.arc(hx,hy,W*0.007,0,Math.PI*2);ctx.fill();
     }
     /* Aiguilles */
     const nowSec=t;
     const hAngle=-Math.PI/2+nowSec*0.008;
     const mAngle=-Math.PI/2+nowSec*0.065;
     /* Grande aiguille */
     ctx.strokeStyle='rgba(35,18,5,0.95)';ctx.lineWidth=W*0.013;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(dialX,dialY);ctx.lineTo(dialX+Math.cos(mAngle)*dialR*0.68,dialY+Math.sin(mAngle)*dialR*0.68);ctx.stroke();
     /* Petite aiguille */
     ctx.lineWidth=W*0.018;
     ctx.beginPath();ctx.moveTo(dialX,dialY);ctx.lineTo(dialX+Math.cos(hAngle)*dialR*0.46,dialY+Math.sin(hAngle)*dialR*0.46);ctx.stroke();
     /* Centre */
     ctx.fillStyle='#8B5E3C';ctx.beginPath();ctx.arc(dialX,dialY,W*0.016,0,Math.PI*2);ctx.fill();

     /* ── Trappe coucou — au-dessus du cadran ── */
     const trapX=cx, trapY=clkY+clkH*0.285;
     const trapW=clkW*0.22, trapH=clkW*0.13;
     /* Boîte de la trappe */
     ctx.fillStyle='#6B4228';
     ctx.beginPath();ctx.roundRect(trapX-trapW/2,trapY-trapH/2,trapW,trapH,W*0.008);ctx.fill();
     ctx.strokeStyle='rgba(50,28,10,0.55)';ctx.lineWidth=W*0.005;
     ctx.beginPath();ctx.roundRect(trapX-trapW/2,trapY-trapH/2,trapW,trapH,W*0.008);ctx.stroke();
     /* Ouverture sombre */
     ctx.fillStyle='rgba(20,10,4,0.92)';
     ctx.beginPath();ctx.roundRect(trapX-trapW*0.40,trapY-trapH*0.38,trapW*0.80,trapH*0.76,W*0.005);ctx.fill();

     /* ── Oiseau coucou ── */
     if(bExt>0){
      const branchLen=clkW*0.28*bExt;
      const bx=trapX, by=trapY;
      /* Branche / bras sortant */
      ctx.strokeStyle='#7A5030';ctx.lineWidth=W*0.018;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx,by-branchLen);ctx.stroke();
      /* Corps oiseau */
      const ox=bx, oy=by-branchLen;
      ctx.save();ctx.translate(ox,oy);
      /* Corps */
      const birdG=ctx.createRadialGradient(-W*0.01,-W*0.01,0,0,0,W*0.06);
      birdG.addColorStop(0,'#8B6B45');birdG.addColorStop(1,'#5C3D1E');
      ctx.fillStyle=birdG;
      ctx.beginPath();ctx.ellipse(0,0,W*0.055,W*0.038,0,0,Math.PI*2);ctx.fill();
      /* Aile */
      ctx.fillStyle='#6B4A28';
      ctx.beginPath();ctx.ellipse(W*0.012,W*0.008,W*0.038,W*0.020,-0.3,0,Math.PI*2);ctx.fill();
      /* Tête */
      ctx.fillStyle='#7A5530';
      ctx.beginPath();ctx.arc(-W*0.038,-W*0.018,W*0.026,0,Math.PI*2);ctx.fill();
      /* Oeil */
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-W*0.045,-W*0.022,W*0.009,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#1a0a00';ctx.beginPath();ctx.arc(-W*0.046,-W*0.022,W*0.005,0,Math.PI*2);ctx.fill();
      /* Bec ouvert */
      ctx.fillStyle='#D4902A';
      ctx.beginPath();
      ctx.moveTo(-W*0.062,-W*0.020);
      ctx.lineTo(-W*0.082,-W*0.014+Math.sin(t*8)*W*0.006);
      ctx.lineTo(-W*0.062,-W*0.012);
      ctx.closePath();ctx.fill();
      /* Queue */
      ctx.strokeStyle='#5C3D1E';ctx.lineWidth=W*0.008;
      ctx.beginPath();ctx.moveTo(W*0.048,W*0.005);ctx.lineTo(W*0.070,W*0.018);ctx.stroke();
      ctx.beginPath();ctx.moveTo(W*0.048,W*0.005);ctx.lineTo(W*0.072,-W*0.002);ctx.stroke();
      ctx.restore();
     }

     /* ── Pendule ── */
     const pendLen=clkH*0.30;
     const pendX=cx+Math.sin(pendAngle)*clkW*0.22;
     const pendTopY=clkY+clkH*0.82;
     const pendBotY=pendTopY+pendLen;
     /* Tige */
     ctx.strokeStyle='#8B6030';ctx.lineWidth=W*0.008;
     ctx.beginPath();ctx.moveTo(cx,pendTopY);ctx.lineTo(pendX,pendBotY);ctx.stroke();
     /* Lentille pendule */
     const lentG=ctx.createRadialGradient(pendX-W*0.01,pendBotY-W*0.01,W*0.005,pendX,pendBotY,W*0.04);
     lentG.addColorStop(0,'#D4A855');lentG.addColorStop(0.5,'#B8882A');lentG.addColorStop(1,'#8B6028');
     ctx.fillStyle=lentG;
     ctx.beginPath();ctx.ellipse(pendX,pendBotY,W*0.040,W*0.025,0,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(80,50,15,0.45)';ctx.lineWidth=W*0.005;
     ctx.beginPath();ctx.ellipse(pendX,pendBotY,W*0.040,W*0.025,0,0,Math.PI*2);ctx.stroke();

     /* ── Supports latéraux ── */
     ctx.fillStyle='#7A5030';
     ctx.beginPath();ctx.roundRect(clkX+clkW*0.02,clkY+clkH*0.40,clkW*0.06,clkH*0.22,W*0.008);ctx.fill();
     ctx.beginPath();ctx.roundRect(clkX+clkW*0.92,clkY+clkH*0.40,clkW*0.06,clkH*0.22,W*0.008);ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Pendule physique ── */
     pendVel-=pendAngle*0.0045; /* rappel */
     pendVel*=0.9988;           /* amortissement léger */
     pendAngle+=pendVel;

     /* ── État oiseau ── */
     birdTimer++;
     if(!birdOut && birdTimer>BIRD_INTERVAL){
      birdOut=true; birdTimer=0; birdPhase=0;
     }
     if(birdOut){
      birdPhase++;
      /* Sortie douce puis rentrée */
      if(birdPhase<BIRD_DURATION*0.35)      birdExtend=birdPhase/(BIRD_DURATION*0.35);
      else if(birdPhase<BIRD_DURATION*0.65) birdExtend=1.0;
      else                                   birdExtend=1-(birdPhase-BIRD_DURATION*0.65)/(BIRD_DURATION*0.35);
      if(birdPhase>=BIRD_DURATION){birdOut=false;birdExtend=0;}
     }

     /* ── Papier peint floral — comme dans le film ── */
     /* Fond crème vieilli */
     ctx.fillStyle='#c8b89a';
     ctx.fillRect(0,0,W,H);
     /* Léger dégradé vertical — plus sombre en bas */
     const bgG=ctx.createLinearGradient(0,0,0,H);
     bgG.addColorStop(0,'rgba(210,195,165,0.55)');
     bgG.addColorStop(0.50,'rgba(180,160,130,0.15)');
     bgG.addColorStop(1,'rgba(80,55,35,0.55)');
     ctx.fillStyle=bgG;ctx.fillRect(0,0,W,H);

     /* ── Motif de papier peint dessiné une seule fois sur offscreen ── */
     if(!frame._wp){
      const tileS=W*0.22; /* taille d'une tuile */
      const wpC=document.createElement('canvas');
      wpC.width=tileS*2;wpC.height=tileS*2;
      const wt=wpC.getContext('2d');
      /* Fond tuile transparent */
      wt.clearRect(0,0,tileS*2,tileS*2);
      /* Dessine motif dans les 4 coins + centre (rose avec feuilles) */
      const drawFlower=(fx,fy,sc)=>{
       wt.save();wt.translate(fx,fy);wt.scale(sc,sc);
       /* Pétales */
       for(let p=0;p<5;p++){
        wt.save();wt.rotate(p/5*Math.PI*2);
        wt.fillStyle='rgba(140,80,80,0.38)';
        wt.beginPath();wt.ellipse(0,-tileS*0.13,tileS*0.055,tileS*0.10,0,0,Math.PI*2);wt.fill();
        wt.restore();
       }
       /* Centre fleur */
       wt.fillStyle='rgba(160,95,55,0.45)';
       wt.beginPath();wt.arc(0,0,tileS*0.055,0,Math.PI*2);wt.fill();
       /* Feuilles */
       for(let l=0;l<3;l++){
        const la=(l/3)*Math.PI*2+Math.PI*0.2;
        wt.save();wt.rotate(la);
        wt.fillStyle='rgba(80,105,60,0.32)';
        wt.beginPath();wt.ellipse(tileS*0.18,0,tileS*0.12,tileS*0.042,-0.3,0,Math.PI*2);wt.fill();
        wt.restore();
       }
       wt.restore();
      };
      const drawBud=(fx,fy,sc)=>{
       wt.save();wt.translate(fx,fy);wt.scale(sc,sc);
       /* Petite fleur secondaire */
       for(let p=0;p<4;p++){
        wt.save();wt.rotate(p/4*Math.PI*2+Math.PI/8);
        wt.fillStyle='rgba(160,100,90,0.28)';
        wt.beginPath();wt.ellipse(0,-tileS*0.07,tileS*0.030,tileS*0.058,0,0,Math.PI*2);wt.fill();
        wt.restore();
       }
       wt.fillStyle='rgba(140,80,50,0.32)';
       wt.beginPath();wt.arc(0,0,tileS*0.032,0,Math.PI*2);wt.fill();
       wt.restore();
      };
      /* Tiges reliant les motifs */
      wt.strokeStyle='rgba(80,100,55,0.22)';wt.lineWidth=tileS*0.018;wt.lineCap='round';
      /* Courbes de liaison */
      for(let i=0;i<4;i++){
       const ax=tileS*(i%2)*2, ay=tileS*(i>1?2:0);
       const bx=tileS, by=tileS;
       wt.beginPath();
       wt.moveTo(ax,ay);
       wt.bezierCurveTo(ax+tileS*0.3,ay+tileS*0.3,bx-tileS*0.3,by-tileS*0.3,bx,by);
       wt.stroke();
      }
      /* Fleurs grandes aux coins */
      drawFlower(0,0,1.0);
      drawFlower(tileS*2,0,1.0);
      drawFlower(0,tileS*2,1.0);
      drawFlower(tileS*2,tileS*2,1.0);
      /* Fleur centrale */
      drawFlower(tileS,tileS,1.15);
      /* Petits bourgeons intermédiaires */
      drawBud(tileS,0,0.85);
      drawBud(0,tileS,0.85);
      drawBud(tileS*2,tileS,0.85);
      drawBud(tileS,tileS*2,0.85);
      frame._wp=wpC;
      frame._wpS=tileS*2;
     }
     /* Répétition du motif sur tout l'écran */
     const ts=frame._wpS;
     ctx.save();ctx.globalAlpha=0.85;
     for(let tx=0;tx<W+ts;tx+=ts){
      for(let ty=0;ty<H+ts;ty+=ts){
       ctx.drawImage(frame._wp,tx,ty);
      }
     }
     ctx.restore();

     /* ── Halo chaud centré — lumière de la lampe ── */
     const halo=ctx.createRadialGradient(cx,H*0.48,0,cx,H*0.48,W*0.72);
     halo.addColorStop(0,`rgba(210,175,110,${0.45+Math.sin(t*0.18)*0.02})`);
     halo.addColorStop(0.35,'rgba(170,130,75,0.22)');
     halo.addColorStop(0.65,'rgba(100,70,35,0.10)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

     /* ── Horloge ── */
     drawClock(birdExtend);

     /* ── Particules de poussière lumineuse ── */
     for(const d of dust){
      d.x+=d.vx+Math.sin(t*0.4+d.ph)*0.05;
      d.y+=d.vy; d.ph+=0.015;
      if(d.y<-5){d.y=H+5;d.x=Math.random()*W;}
      const pulse=0.5+0.5*Math.sin(d.ph);
      ctx.fillStyle=`rgba(120,80,40,${d.op*pulse})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Lueur tick-tock — flash chaud synchronisé au pendule ── */
     const tickPhase=Math.abs(Math.sin(pendAngle*3.2));
     if(tickPhase>0.92){
      const tickX=cx+Math.sin(pendAngle)*W*0.22*0.22;
      const tickG=ctx.createRadialGradient(tickX,H*0.78,0,tickX,H*0.78,W*0.12);
      tickG.addColorStop(0,`rgba(220,160,60,${(tickPhase-0.92)*0.55})`);
      tickG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=tickG;ctx.fillRect(0,0,W,H);
     }

     /* ── Étincelles dorées tombant de l'horloge ── */
     for(const d of dust){
      if(d.r>0.9&&Math.random()<0.004){
       /* Flash aléatoire sur les particules proches de l'horloge */
       ctx.fillStyle=`rgba(255,210,100,${Math.random()*0.55})`;
       ctx.beginPath();ctx.arc(d.x,d.y,d.r*2.2,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Ondes sonores concentriques — tick ── */
     const wavePhase=((t*0.016*60)%BIRD_INTERVAL)/BIRD_INTERVAL;
     if(wavePhase<0.18){
      const wAlpha=(0.18-wavePhase)/0.18*0.12;
      const wR=W*(0.06+wavePhase*0.55);
      const wX=cx, wY=H*0.20+W*0.62*1.05*0.82; /* centre pendule top */
      ctx.strokeStyle=`rgba(200,150,60,${wAlpha})`;
      ctx.lineWidth=W*0.006;
      ctx.beginPath();ctx.arc(wX,wY,wR,0,Math.PI*2);ctx.stroke();
      if(wavePhase<0.10){
       ctx.strokeStyle=`rgba(200,150,60,${wAlpha*0.5})`;
       ctx.beginPath();ctx.arc(wX,wY,wR*0.5,0,Math.PI*2);ctx.stroke();
      }
     }

     /* ── Vignette centrale douce — assombrit les bords ── */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.15,cx,H*0.45,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(30,18,8,0.18)');
     vg.addColorStop(0.80,'rgba(20,12,5,0.55)');
     vg.addColorStop(1,'rgba(10,6,2,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* ── Grain pellicule ── */
     for(let i=0;i<35;i++){
      const gv=6+Math.random()*14|0;
      ctx.fillStyle=`rgba(${gv+8},${gv+4},${gv},${Math.random()*0.022})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.2+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
