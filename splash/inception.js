// CinéQuiz splash chunk — Inception
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Inception"]={
   name:'Inception',
   color:'60,100,200',
   ref:'Inception \u2014 Christopher Nolan, 2010',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2, cy=H/2;

    /* ── Style ── */
    let _incS=document.getElementById('_inc_s');
    if(!_incS){_incS=document.createElement('style');_incS.id='_inc_s';document.head.appendChild(_incS);}
    _incS.textContent=`
     
     #splash-content-wrap{top:50%!important;bottom:auto!important;transform:translateY(-50%)!important;}
     #splash-content-wrap.reveal{transform:translateY(-50%)!important;}
     #splash-quote-text{font-size:13px;color:rgba(255,255,255,0.85)!important;text-shadow:0 1px 10px rgba(0,0,0,0.90)!important;}
     #splash-film-logo{max-width:55%!important;filter:drop-shadow(0 2px 12px rgba(60,100,200,0.45))!important;}
    `;
    const _incW=setInterval(()=>{if(stop.v){_incS.textContent='';clearInterval(_incW);}},200);

    /* ══ GÉOMÉTRIE ══ */
    const VPX=cx, VPY=H*0.50;

    function seededRand(seed){
     let s=seed;
     return function(){s=(s*16807+0)%2147483647;return(s-1)/2147483646;};
    }

    /* ── Deux grilles de blocs : ville normale + ville miroir ── */
    function makeBlocks(rng,rowDefs){
     const blocks=[];
     for(const row of rowDefs){
      for(let i=0;i<row.count;i++){
       const x=-1.0+(i/(row.count-1))*2.0+(rng()-0.5)*0.08;
       const w=0.04+rng()*0.10;
       const d=0.015+rng()*0.04;
       const h=row.hMin+rng()*(row.hMax-row.hMin);
       const facL=rng()*0.3+0.18;
       const facR=rng()*0.2+0.08;
       blocks.push({x,z:row.z,w,d,h,facL,facR,
        wins:Array.from({length:28},()=>({
         xf:rng(),yf:rng(),lit:rng()<0.48,blink:rng()<0.10,ph:rng()*Math.PI*2
        }))
       });
      }
     }
     return blocks;
    }

    const ROWS=[
     {z:0.82,count:8, hMin:0.06,hMax:0.20,side:'both'},
     {z:0.68,count:9, hMin:0.08,hMax:0.26,side:'both'},
     {z:0.55,count:10,hMin:0.10,hMax:0.30,side:'both'},
     {z:0.42,count:11,hMin:0.12,hMax:0.34,side:'both'},
     {z:0.30,count:12,hMin:0.14,hMax:0.38,side:'both'},
     {z:0.20,count:13,hMin:0.15,hMax:0.40,side:'both'},
     {z:0.12,count:14,hMin:0.16,hMax:0.42,side:'both'},
     {z:0.06,count:15,hMin:0.18,hMax:0.44,side:'both'},
    ];

    const BLOCKS_A=makeBlocks(seededRand(42),ROWS);  /* ville principale */
    const BLOCKS_B=makeBlocks(seededRand(137),ROWS); /* ville miroir */

    /* ── Particules de débris ── */
    const debris=Array.from({length:55},()=>({
     x:Math.random()*W,y:H*0.30+Math.random()*H*0.40,
     vx:(Math.random()-0.5)*1.2,vy:(Math.random()-0.5)*0.8,
     r:Math.random()*2.0+0.4,
     op:0,targetOp:0,
     ph:Math.random()*Math.PI*2,
     col:Math.random()<0.5?'180,200,255':'220,230,180',
    }));

    /* ── Lignes de force entre les deux villes ── */
    const forceLines=Array.from({length:12},(_,i)=>({
     x:W*(0.06+i*0.08),
     ph:i*0.52,
     spd:0.018+Math.random()*0.014,
    }));

    /* ── Projection perspective ── */
    function project(wx,wz,vpY){
     const fov=1.4, zCam=1.20;
     const dz=zCam-wz;
     const scale=fov/dz;
     const sx=cx+wx*scale*W*0.46;
     const sy=vpY;
     return{sx,sy,scale};
    }
    function projectGround(wx,wz,vpY){
     const{sx,sy,scale}=project(wx,wz,vpY);
     return{x:sx,y:sy};
    }

    /* ── Dessin d'une couche de ville ── */
    function drawCityLayer(blocks,foldAngle,pivY,mirrorY,camRotZ,alpha){
     ctx.save();
     /* Rotation caméra subtile sur Z */
     ctx.translate(cx,cy);ctx.rotate(camRotZ);ctx.translate(-cx,-cy);
     ctx.globalAlpha=alpha;

     for(let bi=blocks.length-1;bi>=0;bi--){
      const b=blocks[bi];
      const p0=projectGround(b.x,b.z,pivY);
      const p1=projectGround(b.x+b.w,b.z,pivY);
      const p2=projectGround(b.x+b.w,b.z+b.d,pivY);
      const p3=projectGround(b.x,b.z+b.d,pivY);
      const{scale}=project(b.x+b.w*0.5,b.z+b.d*0.5,pivY);
      const pxH=b.h*scale*H*1.1;

      /* Fold différentiel : immeubles lointains pivotent plus vite */
      const depthFactor=1.0-b.z*0.50;
      const localAngle=foldAngle*depthFactor;

      ctx.save();
      if(Math.abs(localAngle)>0.005){
       const pivX=(p0.x+p1.x+p2.x+p3.x)/4;
       ctx.translate(pivX,mirrorY);
       ctx.rotate(localAngle);
       ctx.translate(-pivX,-mirrorY);
      }

      /* Face avant */
      const fl=0.28+b.facL*0.42;
      const fg=ctx.createLinearGradient(p3.x,p3.y-pxH,p2.x,p2.y);
      fg.addColorStop(0,`rgb(${Math.round(fl*92)},${Math.round(fl*98)},${Math.round(fl*118)})`);
      fg.addColorStop(1,`rgb(${Math.round(fl*52)},${Math.round(fl*56)},${Math.round(fl*72)})`);
      ctx.fillStyle=fg;
      ctx.beginPath();
      ctx.moveTo(p3.x,p3.y);ctx.lineTo(p2.x,p2.y);
      ctx.lineTo(p2.x,p2.y-pxH);ctx.lineTo(p3.x,p3.y-pxH);
      ctx.closePath();ctx.fill();

      /* Face côté */
      const sl=0.18+b.facR*0.36;
      const sg=ctx.createLinearGradient(p0.x,p0.y-pxH,p3.x,p3.y);
      sg.addColorStop(0,`rgb(${Math.round(sl*82)},${Math.round(sl*87)},${Math.round(sl*108)})`);
      sg.addColorStop(1,`rgb(${Math.round(sl*46)},${Math.round(sl*50)},${Math.round(sl*64)})`);
      ctx.fillStyle=sg;
      ctx.beginPath();
      ctx.moveTo(p0.x,p0.y);ctx.lineTo(p3.x,p3.y);
      ctx.lineTo(p3.x,p3.y-pxH);ctx.lineTo(p0.x,p0.y-pxH);
      ctx.closePath();ctx.fill();

      /* Toit */
      const tg=ctx.createLinearGradient(p0.x,p0.y-pxH,p2.x,p2.y-pxH);
      tg.addColorStop(0,'rgba(90,98,122,0.92)');
      tg.addColorStop(1,'rgba(62,68,85,0.92)');
      ctx.fillStyle=tg;
      ctx.beginPath();
      ctx.moveTo(p0.x,p0.y-pxH);ctx.lineTo(p1.x,p1.y-pxH);
      ctx.lineTo(p2.x,p2.y-pxH);ctx.lineTo(p3.x,p3.y-pxH);
      ctx.closePath();ctx.fill();

      /* Arête lumineuse sur le toit pendant le fold */
      if(Math.abs(localAngle)>0.3){
       const edgeAlpha=Math.min(1,Math.abs(localAngle)/Math.PI)*0.55;
       ctx.strokeStyle=`rgba(180,210,255,${edgeAlpha})`;
       ctx.lineWidth=0.8;
       ctx.beginPath();
       ctx.moveTo(p0.x,p0.y-pxH);ctx.lineTo(p1.x,p1.y-pxH);
       ctx.moveTo(p2.x,p2.y-pxH);ctx.lineTo(p3.x,p3.y-pxH);
       ctx.stroke();
      }

      /* Fenêtres */
      const faceW=Math.abs(p2.x-p3.x);
      const faceH=pxH;
      if(faceW>7&&faceH>10){
       for(const w of b.wins){
        const wlit=w.lit||(w.blink&&Math.sin(t*1.1+w.ph)>0.6);
        if(!wlit)continue;
        const wx=p3.x+w.xf*faceW*0.80+faceW*0.10;
        const wy=(p3.y-pxH)+w.yf*pxH*0.84+pxH*0.08;
        const wsz=Math.max(1.4,faceW*0.058);
        ctx.fillStyle=`rgba(220,232,180,${0.50+Math.sin(t*0.7+w.ph)*0.18})`;
        ctx.fillRect(wx,wy,wsz,wsz*1.4);
       }
      }
      ctx.restore();
     }
     ctx.restore();
    }

    /* ── Miroir central ── */
    function drawMirrorLine(foldT){
     const lineAlpha=0.18+foldT*0.28;
     const lg=ctx.createLinearGradient(0,cy,W,cy);
     lg.addColorStop(0,'rgba(0,0,0,0)');
     lg.addColorStop(0.20,`rgba(140,170,240,${lineAlpha})`);
     lg.addColorStop(0.50,`rgba(180,210,255,${lineAlpha*1.4})`);
     lg.addColorStop(0.80,`rgba(140,170,240,${lineAlpha})`);
     lg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lg;ctx.fillRect(0,cy-1.5,W,3);
    }

    /* ── Lignes de force pendant le fold ── */
    function drawForceLines(foldT){
     if(foldT<0.15)return;
     const intensity=Math.min(1,(foldT-0.15)/0.5);
     ctx.save();
     for(const fl of forceLines){
      fl.ph+=fl.spd;
      const pulse=Math.abs(Math.sin(fl.ph));
      const alpha=intensity*0.28*pulse;
      if(alpha<0.02)continue;
      const yTop=cy-H*0.28*foldT*(0.6+pulse*0.4);
      const yBot=cy+H*0.28*foldT*(0.6+pulse*0.4);
      const flg=ctx.createLinearGradient(fl.x,yTop,fl.x,yBot);
      flg.addColorStop(0,'rgba(0,0,0,0)');
      flg.addColorStop(0.30,`rgba(100,160,255,${alpha})`);
      flg.addColorStop(0.50,`rgba(180,210,255,${alpha*1.6})`);
      flg.addColorStop(0.70,`rgba(100,160,255,${alpha})`);
      flg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.strokeStyle=flg;ctx.lineWidth=0.8+pulse*0.6;
      ctx.beginPath();ctx.moveTo(fl.x,yTop);ctx.lineTo(fl.x,yBot);ctx.stroke();
      /* Point de connexion au centre */
      ctx.fillStyle=`rgba(200,225,255,${alpha*2.5})`;
      ctx.beginPath();ctx.arc(fl.x,cy,1.5+pulse*1.5,0,Math.PI*2);ctx.fill();
     }
     ctx.restore();
    }

    /* ── Débris qui se détachent au fold max ── */
    function updateDebris(foldT){
     const intensity=Math.max(0,Math.sin(foldT*Math.PI));
     for(const d of debris){
      d.targetOp=intensity*0.65;
      d.op+=(d.targetOp-d.op)*0.04;
      d.x+=d.vx*intensity*0.5;
      d.y+=d.vy*intensity*0.5;
      d.ph+=0.02;
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      if(d.y<H*0.15||d.y>H*0.85){d.vy*=-1;}
      if(d.op<0.02)continue;
      ctx.fillStyle=`rgba(${d.col},${d.op*(0.5+Math.abs(Math.sin(d.ph))*0.5)})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }
    }

    /* ── Sol de toit ── */
    function drawRooftop(yPos,flip){
     const rg=ctx.createLinearGradient(0,yPos,0,yPos+(flip?-H*0.14:H*0.14));
     rg.addColorStop(0,'rgba(75,82,105,0.96)');
     rg.addColorStop(0.4,'rgba(55,62,82,0.98)');
     rg.addColorStop(1,'rgba(28,32,48,1.0)');
     ctx.fillStyle=rg;
     ctx.fillRect(0,flip?yPos-H*0.14:yPos,W,H*0.14);
     /* Liseré */
     const edgeG=ctx.createLinearGradient(0,yPos-2,0,yPos+3);
     edgeG.addColorStop(0,'rgba(130,140,170,0)');
     edgeG.addColorStop(0.5,'rgba(160,170,200,0.55)');
     edgeG.addColorStop(1,'rgba(100,110,140,0)');
     ctx.fillStyle=edgeG;ctx.fillRect(0,yPos-2,W,5);
     /* Grille perspective */
     ctx.strokeStyle='rgba(100,110,140,0.12)';ctx.lineWidth=1;
     for(let i=1;i<8;i++){
      ctx.beginPath();ctx.moveTo(cx,yPos);
      ctx.lineTo(i*(W/8),flip?yPos-H*0.14:yPos+H*0.14);
      ctx.stroke();
     }
    }

    /* ── Ciel / fond ── */
    function drawSky(){
     ctx.fillStyle='rgb(4,6,18)';ctx.fillRect(0,0,W,H);
     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0.00,'rgb(4,6,18)');
     sky.addColorStop(0.50,'rgb(7,10,26)');
     sky.addColorStop(1.00,'rgb(5,8,20)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
     /* Halo central — point de fuite */
     const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.70);
     halo.addColorStop(0,`rgba(40,60,130,${0.18+Math.sin(t*0.20)*0.04})`);
     halo.addColorStop(0.45,'rgba(20,32,80,0.06)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);
    }

    /* ── Frame loop ── */
    function frame(){
     if(stop.v)return;

     drawSky();

     /* Cycle de fold : phase lente avec pic marqué
        On utilise une sinusoïde redressée pour avoir des moments "à plat"
        et des moments de fold intense */
     const rawFold=Math.sin(t*0.10)*0.5+0.5; /* 0→1→0 */
     /* Courbe en S pour accentuer les extrêmes */
     const foldT=rawFold<0.5
      ? 2*rawFold*rawFold
      : 1-2*(1-rawFold)*(1-rawFold);

     /* Angle de fold : 0 = ville à plat, PI = retournée */
     const foldAngle=foldT*Math.PI;

     /* Rotation caméra sur Z — légère oscillation pendant le fold */
     const camRotZ=Math.sin(t*0.10)*foldT*0.035;

     /* ── Ville du bas (normale) ── */
     /* Point de fuite légèrement sous le centre */
     drawCityLayer(BLOCKS_A,foldAngle,VPY+H*0.04,cy,-camRotZ,1.0);

     /* ── Brume autour de la ligne d'horizon ── */
     const hz=ctx.createLinearGradient(0,cy-H*0.08,0,cy+H*0.08);
     hz.addColorStop(0,'rgba(4,6,18,0)');
     hz.addColorStop(0.45,`rgba(8,12,28,${0.20+Math.sin(t*0.12)*0.04})`);
     hz.addColorStop(0.55,`rgba(8,12,28,${0.20+Math.sin(t*0.12)*0.04})`);
     hz.addColorStop(1,'rgba(4,6,18,0)');
     ctx.fillStyle=hz;ctx.fillRect(0,cy-H*0.08,W,H*0.16);

     /* ── Ville du haut (miroir retournée) ── */
     ctx.save();
     /* Flip vertical autour de cy */
     ctx.translate(0,cy);ctx.scale(1,-1);ctx.translate(0,-cy);
     drawCityLayer(BLOCKS_B,-foldAngle,H-VPY-H*0.04,cy,camRotZ,0.82);
     ctx.restore();

     /* ── Sol des deux villes ── */
     drawRooftop(H*0.86,false);  /* sol normal en bas */
     /* Sol miroir en haut — retourné */
     ctx.save();
     ctx.translate(0,cy);ctx.scale(1,-1);ctx.translate(0,-cy);
     drawRooftop(H*0.86,false);
     ctx.restore();

     /* ── Éléments de jonction ── */
     drawMirrorLine(foldT);
     drawForceLines(foldT);
     updateDebris(foldT);

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,cy,H*0.08,cx,cy,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(4,6,18,0.08)');
     vg.addColorStop(0.75,'rgba(4,6,20,0.42)');
     vg.addColorStop(1,'rgba(4,6,20,0.94)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain pellicule */
     for(let i=0;i<42;i++){
      const gv=28+Math.random()*32|0;
      ctx.fillStyle=`rgba(${gv},${gv+5},${gv+20},${Math.random()*0.018})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
