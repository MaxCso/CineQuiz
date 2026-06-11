// CinéQuiz splash chunk — Les Gremlins
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Les Gremlins"]={
   name:'Les Gremlins',
   color:'40,160,40',
   ref:'Gremlins \u2014 Joe Dante, 1984',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.88';
    let t=0;
    const cx=W/2;

    /* ── Positionnement citation+logo : remonté sous le logo CinéQuiz ── */
    let _gremS=document.getElementById('_grem_pos_s');
    if(!_gremS){_gremS=document.createElement('style');_gremS.id='_grem_pos_s';document.head.appendChild(_gremS);}
    _gremS.textContent='#splash-content-wrap{top:30%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _gremW=setInterval(()=>{if(stop.v){_gremS.textContent='';clearInterval(_gremW);}},200);

    /* ── Neige persistante — beaucoup plus de flocons, variés ── */
    const snowflakes=Array.from({length:160},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:0.3+Math.random()*2.0,
     spd:0.2+Math.random()*0.9,
     drift:Math.random()*0.6-0.3,
     op:0.10+Math.random()*0.55,
     phase:Math.random()*Math.PI*2,
     spin:Math.random()*Math.PI*2,
     spinSpd:(Math.random()-0.5)*0.04
    }));

    /* ── Guirlande haute (en haut de l'écran) ── */
    const lights1=Array.from({length:28},(_,i)=>({
     x:i*(W/27), y:H*0.070+Math.sin(i*0.70)*H*0.028,
     hue:[0,35,55,120,195,265,300,15][i%8],
     phase:i*0.42+Math.random()*0.6,
     r:2.8+Math.random()*1.2
    }));

    /* ── Deuxième guirlande un peu plus bas ── */
    const lights2=Array.from({length:24},(_,i)=>({
     x:i*(W/23)+W*0.02, y:H*0.135+Math.sin(i*0.85+1.2)*H*0.026,
     hue:[60,0,300,120,220,350,90,180][i%8],
     phase:i*0.55+Math.random()*0.7+1.0,
     r:2.2+Math.random()*0.9
    }));

    /* ── Guirlande côté gauche (verticale) ── */
    const lightsL=Array.from({length:14},(_,i)=>({
     x:W*0.022+Math.sin(i*0.90)*W*0.018, y:H*0.12+i*(H*0.68/13),
     hue:[0,120,55,300,200,35,270,60][i%8],
     phase:i*0.38+Math.random()*0.5+0.5,
     r:2.0+Math.random()*0.8
    }));

    /* ── Guirlande côté droit (verticale) ── */
    const lightsR=Array.from({length:14},(_,i)=>({
     x:W*0.978+Math.sin(i*0.90)*W*0.018, y:H*0.12+i*(H*0.68/13),
     hue:[120,0,300,55,220,350,90,15][i%8],
     phase:i*0.38+Math.random()*0.5+2.0,
     r:2.0+Math.random()*0.8
    }));

    /* ── Paires d'yeux verts dans l'ombre ── */
    const eyePairs=Array.from({length:8},(_,i)=>{
     const zones=[[W*0.04,W*0.20],[W*0.06,W*0.16],[W*0.60,W*0.20],[W*0.65,W*0.16],[W*0.10,W*0.14],[W*0.68,W*0.14],[W*0.28,W*0.16],[W*0.48,W*0.10]];
     const [zx,zw]=zones[i];
     return{
      x:zx+Math.random()*zw,
      y:H*(0.62+Math.random()*0.26),
      phase:Math.random()*Math.PI*2,
      spd:0.022+Math.random()*0.018,
      size:3.5+Math.random()*4.5,
      state:0, stateTimer:Math.floor(Math.random()*180)+40, alpha:0
     };
    });

    /* ── Mogwai — dessin simplifié, épuré ── */
    function drawMogwai(mx,my,scale,alpha){
     const s=W*0.115*scale;
     ctx.save(); ctx.globalAlpha=alpha; ctx.translate(mx,my);
     for(const [sign,rot] of [[-1,-0.35],[1,0.35]]){
      ctx.fillStyle='rgba(75,45,15,0.95)';
      ctx.save(); ctx.translate(sign*s*1.05,-s*0.10); ctx.rotate(rot);
      ctx.beginPath(); ctx.ellipse(0,-s*0.45,s*0.48,s*0.80,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(195,110,55,0.82)';
      ctx.beginPath(); ctx.ellipse(0,-s*0.45,s*0.26,s*0.52,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
     }
     const hG=ctx.createRadialGradient(-s*0.10,-s*0.15,s*0.05,0,0,s);
     hG.addColorStop(0,'rgba(125,80,28,0.97)'); hG.addColorStop(0.55,'rgba(92,56,14,0.95)'); hG.addColorStop(1,'rgba(52,30,6,0.93)');
     ctx.fillStyle=hG; ctx.beginPath(); ctx.arc(0,0,s,0,Math.PI*2); ctx.fill();
     ctx.fillStyle='rgba(210,148,60,0.42)';
     ctx.beginPath(); ctx.ellipse(-s*0.38,s*0.18,s*0.16,s*0.21,0.4,0,Math.PI*2); ctx.fill();
     ctx.beginPath(); ctx.ellipse(s*0.36,s*0.22,s*0.13,s*0.17,-0.3,0,Math.PI*2); ctx.fill();
     for(const [ex,ey] of [[-s*0.32,-s*0.10],[s*0.32,-s*0.10]]){
      const eG=ctx.createRadialGradient(ex-s*0.04,ey-s*0.06,s*0.02,ex,ey,s*0.30);
      eG.addColorStop(0,'rgba(215,160,35,0.98)'); eG.addColorStop(0.45,'rgba(148,95,12,0.88)'); eG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eG; ctx.beginPath(); ctx.ellipse(ex,ey,s*0.27,s*0.30,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(4,4,4,0.98)'; ctx.beginPath(); ctx.arc(ex+s*0.04,ey,s*0.14,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.88)'; ctx.beginPath(); ctx.arc(ex-s*0.02,ey-s*0.13,s*0.058,0,Math.PI*2); ctx.fill();
     }
     ctx.fillStyle='rgba(40,22,5,0.92)'; ctx.beginPath(); ctx.ellipse(0,s*0.12,s*0.13,s*0.09,0,0,Math.PI*2); ctx.fill();
     ctx.strokeStyle='rgba(35,18,4,0.65)'; ctx.lineWidth=H*0.0022; ctx.lineCap='round';
     ctx.beginPath(); ctx.moveTo(-s*0.20,s*0.28); ctx.quadraticCurveTo(0,s*0.44,s*0.20,s*0.28); ctx.stroke();
     ctx.restore();
    }

    /* ── Sol enneigé ── */
    function drawSnowGround(){
     const gy=H*0.82;
     const sg=ctx.createLinearGradient(0,gy,0,H);
     sg.addColorStop(0,'rgba(220,230,238,0.18)'); sg.addColorStop(0.25,'rgba(185,200,210,0.10)'); sg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sg; ctx.fillRect(0,gy,W,H-gy);
     ctx.fillStyle='rgba(215,228,238,0.14)';
     ctx.beginPath(); ctx.moveTo(0,gy);
     for(let x=0;x<=W;x+=4) ctx.lineTo(x,gy-Math.sin(x*0.028+t*0.15)*H*0.010-Math.sin(x*0.052)*H*0.006);
     ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
    }

    /* ── Sapin de Noël coin droit — plus grand et plus coloré ── */
    function drawChristmasTree(){
     const tx=W*0.84, ty=H*0.84;
     /* Lueur verte + halo rouge */
     const tg=ctx.createRadialGradient(tx,ty-H*0.14,5,tx,ty-H*0.14,W*0.24);
     tg.addColorStop(0,`rgba(15,70,12,${0.24+Math.sin(t*0.55)*0.06})`); tg.addColorStop(0.6,`rgba(40,10,5,${0.08+Math.sin(t*0.38)*0.04})`); tg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tg; ctx.fillRect(W*0.58,H*0.48,W*0.44,H*0.44);
     ctx.fillStyle='rgba(5,16,5,0.96)';
     ctx.beginPath(); ctx.moveTo(tx,H*0.48); ctx.lineTo(tx-W*0.11,H*0.62); ctx.lineTo(tx+W*0.11,H*0.62); ctx.closePath(); ctx.fill();
     ctx.beginPath(); ctx.moveTo(tx,H*0.53); ctx.lineTo(tx-W*0.14,H*0.71); ctx.lineTo(tx+W*0.14,H*0.71); ctx.closePath(); ctx.fill();
     ctx.beginPath(); ctx.moveTo(tx,H*0.59); ctx.lineTo(tx-W*0.18,H*0.82); ctx.lineTo(tx+W*0.18,H*0.82); ctx.closePath(); ctx.fill();
     ctx.fillStyle='rgba(50,28,8,0.88)';
     ctx.fillRect(tx-W*0.020,H*0.82,W*0.040,H*0.04);
     /* Étoile au sommet */
     const starX=tx, starY=H*0.465;
     const starPulse=0.75+Math.sin(t*2.2)*0.25;
     const starGlow=ctx.createRadialGradient(starX,starY,0,starX,starY,W*0.06);
     starGlow.addColorStop(0,`rgba(255,240,80,${0.9*starPulse})`); starGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=starGlow; ctx.beginPath(); ctx.arc(starX,starY,W*0.06,0,Math.PI*2); ctx.fill();
     ctx.fillStyle=`rgba(255,248,100,${starPulse})`; ctx.beginPath(); ctx.arc(starX,starY,W*0.016,0,Math.PI*2); ctx.fill();
     /* Boules plus nombreuses et plus lumineuses */
     const baubles=[[0,-0.22,0,1.0],[-.09,-0.10,120,1.0],[.09,-0.10,200,1.0],[-.14,0.04,30,0.9],[.13,0.04,280,0.9],[0,0.16,60,0.9],[-.07,0.26,160,0.85],[.08,0.26,330,0.85],[-.16,0.16,240,0.8],[.15,0.16,10,0.8]];
     for(const [bx,by,bh,ba] of baubles){
      const bX=tx+bx*W*0.18, bY=H*0.64+by*H*0.25;
      const bPulse=0.6+Math.sin(t*1.8+bh*0.05)*0.35;
      /* Halo lumineux */
      const bGlow=ctx.createRadialGradient(bX,bY,0,bX,bY,W*0.040);
      bGlow.addColorStop(0,`hsla(${bh},95%,55%,${bPulse*ba*0.5})`); bGlow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bGlow; ctx.beginPath(); ctx.arc(bX,bY,W*0.040,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=`hsla(${bh},88%,52%,${ba*0.88})`;
      ctx.beginPath(); ctx.arc(bX,bY,W*0.020,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=`hsla(${bh},90%,80%,${ba*0.65})`;
      ctx.beginPath(); ctx.arc(bX-W*0.006,bY-W*0.006,W*0.008,0,Math.PI*2); ctx.fill();
     }
     /* Mini-guirlande sur le sapin */
     const sapinLights=[[tx-W*0.08,H*0.62,0],[tx+W*0.06,H*0.65,120],[tx-W*0.11,H*0.70,240],[tx+W*0.10,H*0.73,60],[tx-W*0.05,H*0.76,300],[tx+W*0.13,H*0.78,180]];
     for(const [lx,ly,lh] of sapinLights){
      const lp=0.5+Math.sin(t*2.5+lh*0.05)*0.45;
      const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,W*0.025);
      lg.addColorStop(0,`hsla(${lh},100%,65%,${lp*0.85})`); lg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lg; ctx.beginPath(); ctx.arc(lx,ly,W*0.025,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=`hsla(${lh},90%,60%,${lp})`;
      ctx.beginPath(); ctx.arc(lx,ly,W*0.009,0,Math.PI*2); ctx.fill();
     }
    }

    /* ── Dessiner une guirlande (fil + ampoules) ── */
    function drawGarland(lightArr, wireY, waveAmp, waveFreq, wireColor){
     ctx.strokeStyle=wireColor||'rgba(25,20,12,0.50)'; ctx.lineWidth=1.2;
     ctx.beginPath(); ctx.moveTo(0,wireY);
     for(let x=0;x<=W;x+=4) ctx.lineTo(x, wireY+Math.sin(x*waveFreq)*waveAmp);
     ctx.stroke();
     for(const l of lightArr){
      l.phase+=0.048;
      const bk=0.52+Math.sin(l.phase)*0.44;
      /* Halo lumineux */
      const rg=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*4);
      rg.addColorStop(0,`hsla(${l.hue},95%,65%,${bk*0.80})`); rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(l.x,l.y,l.r*4,0,Math.PI*2); ctx.fill();
      /* Ampoule */
      ctx.fillStyle=`hsla(${l.hue},88%,58%,${bk})`;
      ctx.beginPath(); ctx.arc(l.x,l.y,l.r,0,Math.PI*2); ctx.fill();
      /* Reflet */
      ctx.fillStyle=`hsla(${l.hue},80%,90%,${bk*0.6})`;
      ctx.beginPath(); ctx.arc(l.x-l.r*0.3,l.y-l.r*0.3,l.r*0.35,0,Math.PI*2); ctx.fill();
     }
    }

    /* ── Dessiner une guirlande verticale ── */
    function drawVerticalGarland(lightArr, wireX, waveAmp){
     ctx.strokeStyle='rgba(22,18,10,0.45)'; ctx.lineWidth=1.1;
     ctx.beginPath(); ctx.moveTo(wireX,lightArr[0].y);
     for(const l of lightArr) ctx.lineTo(wireX+Math.sin(l.y*0.04)*waveAmp, l.y);
     ctx.stroke();
     for(const l of lightArr){
      l.phase+=0.040;
      const bk=0.48+Math.sin(l.phase)*0.46;
      const rg=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*4.5);
      rg.addColorStop(0,`hsla(${l.hue},95%,65%,${bk*0.72})`); rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(l.x,l.y,l.r*4.5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=`hsla(${l.hue},88%,58%,${bk})`;
      ctx.beginPath(); ctx.arc(l.x,l.y,l.r,0,Math.PI*2); ctx.fill();
     }
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond avec teinte noël — légère dominante vert/rouge ── */
     ctx.fillStyle='rgba(1,5,2,0.18)'; ctx.fillRect(0,0,W,H);

     /* Halos de couleur Noël en arrière-plan */
     if(Math.floor(t*60)%240===0||t<0.05){
      /* Mis à jour rarement pour perf */
     }
     const xmasGlow1=ctx.createRadialGradient(W*0.15,H*0.30,0,W*0.15,H*0.30,W*0.45);
     xmasGlow1.addColorStop(0,`rgba(180,20,10,${0.06+Math.sin(t*0.35)*0.03})`); xmasGlow1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=xmasGlow1; ctx.fillRect(0,0,W,H);
     const xmasGlow2=ctx.createRadialGradient(W*0.80,H*0.40,0,W*0.80,H*0.40,W*0.40);
     xmasGlow2.addColorStop(0,`rgba(10,140,20,${0.06+Math.sin(t*0.42+1)*0.03})`); xmasGlow2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=xmasGlow2; ctx.fillRect(0,0,W,H);
     const xmasGlow3=ctx.createRadialGradient(W*0.50,H*0.85,0,W*0.50,H*0.85,W*0.35);
     xmasGlow3.addColorStop(0,`rgba(200,160,5,${0.05+Math.sin(t*0.28)*0.03})`); xmasGlow3.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=xmasGlow3; ctx.fillRect(0,0,W,H);

     /* ── Sol enneigé ── */
     drawSnowGround();

     /* ── Guirlandes horizontales en haut ── */
     drawGarland(lights1, H*0.068, H*0.030, 0.022, 'rgba(30,22,10,0.55)');
     drawGarland(lights2, H*0.128, H*0.025, 0.028, 'rgba(25,20,8,0.45)');

     /* ── Guirlandes verticales sur les côtés ── */
     drawVerticalGarland(lightsL, W*0.022, W*0.018);
     drawVerticalGarland(lightsR, W*0.978, W*0.018);

     /* ── Sapin ── */
     drawChristmasTree();

     /* ── Yeux verts — machine à états ── */
     for(const ep of eyePairs){
      ep.stateTimer--;
      if(ep.stateTimer<=0){
       if(ep.state===0){ep.state=1;ep.stateTimer=18+Math.floor(Math.random()*12);}
       else if(ep.state===1){ep.state=2;ep.stateTimer=80+Math.floor(Math.random()*140);}
       else if(ep.state===2){ep.state=3;ep.stateTimer=16+Math.floor(Math.random()*12);}
       else{ep.state=0;ep.stateTimer=60+Math.floor(Math.random()*180);ep.x=W*(0.04+Math.random()*0.88);ep.y=H*(0.62+Math.random()*0.26);}
      }
      if(ep.state===1) ep.alpha=Math.min(1,ep.alpha+0.08);
      else if(ep.state===3) ep.alpha=Math.max(0,ep.alpha-0.07);
      else if(ep.state===0) ep.alpha=0;
      if(ep.alpha<0.01) continue;
      ep.phase+=ep.spd;
      for(const sign of [-1,1]){
       const ex=ep.x+sign*ep.size*1.28;
       const pulse=0.72+Math.sin(ep.phase)*0.22;
       const eg=ctx.createRadialGradient(ex,ep.y,0,ex,ep.y,ep.size);
       eg.addColorStop(0,`rgba(60,230,50,${pulse*ep.alpha})`);
       eg.addColorStop(0.45,`rgba(20,150,18,${0.35*ep.alpha})`);
       eg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=eg; ctx.beginPath(); ctx.arc(ex,ep.y,ep.size,0,Math.PI*2); ctx.fill();
       ctx.fillStyle=`rgba(3,3,3,${0.96*ep.alpha})`;
       ctx.beginPath(); ctx.arc(ex+ep.size*0.14,ep.y,ep.size*0.36,0,Math.PI*2); ctx.fill();
      }
     }

     /* ── Mogwai — remonté plus bas pour laisser de la place à la citation ── */
     drawMogwai(cx, H*0.75, 1, 1);

     /* ── Neige tombante — flocons variés ── */
     for(const sf of snowflakes){
      sf.y+=sf.spd; sf.x+=sf.drift+Math.sin(t*0.8+sf.phase)*0.30;
      sf.spin+=sf.spinSpd;
      if(sf.y>H+6){sf.y=-6;sf.x=Math.random()*W;}
      if(sf.x<-6)sf.x=W+6; if(sf.x>W+6)sf.x=-6;
      if(sf.r>1.2){
       /* Flocon stylisé pour les grands */
       ctx.save(); ctx.globalAlpha=sf.op*0.9; ctx.translate(sf.x,sf.y); ctx.rotate(sf.spin);
       ctx.strokeStyle='rgba(225,238,248,0.95)'; ctx.lineWidth=sf.r*0.5; ctx.lineCap='round';
       for(let a=0;a<6;a++){
        ctx.save(); ctx.rotate(a*Math.PI/3);
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-sf.r*1.6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,-sf.r*0.8); ctx.lineTo(-sf.r*0.4,-sf.r*1.1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,-sf.r*0.8); ctx.lineTo(sf.r*0.4,-sf.r*1.1); ctx.stroke();
        ctx.restore();
       }
       ctx.restore();
      } else {
       /* Simple point pour les petits flocons */
       ctx.fillStyle=`rgba(235,244,252,${sf.op})`;
       ctx.beginPath(); ctx.arc(sf.x,sf.y,sf.r,0,Math.PI*2); ctx.fill();
      }
     }

     /* ── Vignette forte ── */
     const vg=ctx.createRadialGradient(cx,H*0.52,H*0.04,cx,H*0.52,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(0.38,'rgba(0,0,0,0.20)'); vg.addColorStop(0.70,'rgba(0,0,0,0.68)'); vg.addColorStop(1,'rgba(0,0,0,0.97)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
