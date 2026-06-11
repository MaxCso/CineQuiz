// CinéQuiz splash chunk — Vol au-dessus d’un nid de coucou
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Vol au-dessus d’un nid de coucou"]={
   name:'Vol au-dessus d\u2019un nid de coucou',
   color:'80,120,80',
   ref:'Vol au-dessus d\u2019un nid de coucou \u2014 Milos Forman, 1975',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    let _s=document.getElementById('_cuckoo_s');
    if(!_s){_s=document.createElement('style');_s.id='_cuckoo_s';document.head.appendChild(_s);}
    _s.textContent=`
      #splash-content-wrap{top:25%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Vacillement néon global ── */
    let neonFlicker=1.0, neonTimer=0, neonTarget=1.0;

    /* ── Néon central — panne dramatique indépendante ── */
    let neon2=1.0, neon2Timer=0, neon2Target=1.0, neon2Broken=false, neon2BreakTimer=0;

    /* ── Nuages devant la lune — atténuation douce ── */
    let cloudAlpha=0.0, cloudDir=1, cloudTimer=Math.random()*200+150;

    /* ── Patient qui tourne la tête — lit index 2 ── */
    let headAngle=0, headDir=1, headTimer=Math.random()*180+120, headMoving=false, headPause=0;

    /* ── Respiration McMurphy — balancement imperceptible ── */
    let mcSwayPhase=0;

    /* ── Poussière / particules ── */
    const dust=Array.from({length:40},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.20, vy:(Math.random()-0.5)*0.12,
     r:Math.random()*1.4+0.3,
     op:Math.random()*0.10+0.03,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Lits / patients en rangée ── */
    const beds=Array.from({length:5},(_,i)=>({
     x:W*(0.06+i*0.20),
     hasPatient:Math.random()<0.75,
     sitting:Math.random()<0.35,
    }));

    /* ── Étoiles derrière la fenêtre ── */
    const stars=Array.from({length:55},()=>({
     x:Math.random(), y:Math.random(),
     r:Math.random()*1.2+0.3,
     op:0.30+Math.random()*0.55,
     ph:Math.random()*Math.PI*2,
    }));

    function drawBed(bx,by,hasPatient,sitting,watchAngle){
     const bw=W*0.14, bh=H*0.055;
     /* Cadre lit métal */
     ctx.strokeStyle='rgba(55,65,52,0.90)';ctx.lineWidth=W*0.006;ctx.lineCap='round';
     /* Tête de lit */
     ctx.beginPath();ctx.moveTo(bx-bw/2,by-bh);ctx.lineTo(bx-bw/2,by);ctx.stroke();
     /* Pied de lit */
     ctx.beginPath();ctx.moveTo(bx+bw/2,by-bh*0.6);ctx.lineTo(bx+bw/2,by);ctx.stroke();
     /* Barres horizontales */
     ctx.lineWidth=W*0.004;
     ctx.beginPath();ctx.moveTo(bx-bw/2,by);ctx.lineTo(bx+bw/2,by);ctx.stroke();
     ctx.beginPath();ctx.moveTo(bx-bw/2,by-bh);ctx.lineTo(bx+bw/2,by-bh*0.6);ctx.stroke();
     /* Matelas */
     ctx.fillStyle='rgba(42,50,40,0.80)';
     ctx.beginPath();ctx.roundRect(bx-bw/2+W*0.004,by-bh+H*0.006,bw-W*0.008,bh*0.55,2);ctx.fill();
     /* Patient allongé ou assis */
     if(hasPatient){
      if(sitting){
       /* Assis au bord */
       ctx.fillStyle='rgba(18,22,16,0.95)';
       ctx.beginPath();ctx.ellipse(bx+bw*0.25,by-bh*0.55,W*0.018,H*0.022,0,0,Math.PI*2);ctx.fill();
       ctx.beginPath();ctx.roundRect(bx+bw*0.10,by-bh*0.40,W*0.030,H*0.038,2);ctx.fill();
      } else {
       /* Allongé — tête animée si watchAngle défini */
       ctx.fillStyle='rgba(22,28,20,0.88)';
       const hx=bx-bw*0.25, hy=by-bh*0.68;
       if(watchAngle!==undefined){
        /* Tête qui tourne — décalage en x selon angle */
        const offX=Math.sin(watchAngle)*W*0.014;
        ctx.beginPath();ctx.ellipse(hx+offX,hy,W*0.018,W*0.018,0,0,Math.PI*2);ctx.fill();
        /* Yeux ouverts — deux petits points lumineux */
        const eyeOp=Math.max(0,(Math.abs(watchAngle)/0.55))*0.45;
        ctx.fillStyle=`rgba(140,170,130,${eyeOp})`;
        ctx.beginPath();ctx.arc(hx+offX-W*0.006,hy-W*0.005,W*0.003,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.arc(hx+offX+W*0.006,hy-W*0.005,W*0.003,0,Math.PI*2);ctx.fill();
       } else {
        ctx.beginPath();ctx.ellipse(hx,hy,W*0.018,W*0.018,0,0,Math.PI*2);ctx.fill();
       }
       ctx.fillStyle='rgba(28,36,26,0.72)';
       ctx.beginPath();ctx.roundRect(bx-bw*0.10,by-bh*0.58,bw*0.50,H*0.028,2);ctx.fill();
      }
     }
    }

    function drawMcMurphy(mx,my,sway){
     /* Légère inclinaison animée */
     ctx.save();
     ctx.translate(mx,my);
     ctx.rotate(sway||0);
     ctx.translate(-mx,-my);
     /* Corps — posture de défi, légèrement penché en avant */
     ctx.fillStyle='rgba(8,10,8,0.98)';
     /* Jambes */
     ctx.beginPath();ctx.roundRect(mx-W*0.025,my-H*0.11,W*0.020,H*0.11,2);ctx.fill();
     ctx.beginPath();ctx.roundRect(mx+W*0.005,my-H*0.11,W*0.020,H*0.11,2);ctx.fill();
     /* Corps / torse */
     ctx.beginPath();ctx.roundRect(mx-W*0.032,my-H*0.235,W*0.064,H*0.130,4);ctx.fill();
     /* Tête */
     ctx.beginPath();ctx.arc(mx-W*0.004,my-H*0.262,W*0.034,0,Math.PI*2);ctx.fill();
     /* Casquette */
     ctx.beginPath();
     ctx.moveTo(mx-W*0.040,my-H*0.276);
     ctx.lineTo(mx+W*0.028,my-H*0.276);
     ctx.lineTo(mx+W*0.044,my-H*0.272);
     ctx.lineTo(mx+W*0.028,my-H*0.288);
     ctx.lineTo(mx-W*0.034,my-H*0.288);
     ctx.closePath();ctx.fill();
     /* Bras tendu vers l'avant — geste rebelle */
     ctx.strokeStyle='rgba(8,10,8,0.98)';ctx.lineWidth=W*0.020;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(mx-W*0.020,my-H*0.185);
     ctx.lineTo(mx-W*0.052,my-H*0.136);
     ctx.lineTo(mx-W*0.064,my-H*0.098);
     ctx.stroke();
     ctx.lineWidth=W*0.018;
     ctx.beginPath();
     ctx.moveTo(mx+W*0.020,my-H*0.185);
     ctx.lineTo(mx+W*0.048,my-H*0.210);
     ctx.stroke();
     ctx.restore();
    }

    function drawRatched(rx,ry){
     /* Silhouette rigide, droite comme un piquet */
     ctx.fillStyle='rgba(15,18,14,0.97)';
     /* Jupe longue */
     ctx.beginPath();
     ctx.moveTo(rx-W*0.026,ry);ctx.lineTo(rx+W*0.026,ry);
     ctx.lineTo(rx+W*0.020,ry-H*0.135);ctx.lineTo(rx-W*0.020,ry-H*0.135);
     ctx.closePath();ctx.fill();
     /* Veste blanche infirmière */
     ctx.fillStyle='rgba(55,60,52,0.96)';
     ctx.beginPath();ctx.roundRect(rx-W*0.028,ry-H*0.215,W*0.056,H*0.085,3);ctx.fill();
     /* Tête — froide, sans expression */
     ctx.fillStyle='rgba(15,18,14,0.97)';
     ctx.beginPath();ctx.arc(rx,ry-H*0.236,W*0.028,0,Math.PI*2);ctx.fill();
     /* Coiffe d'infirmière */
     ctx.fillStyle='rgba(62,68,58,0.95)';
     ctx.beginPath();
     ctx.moveTo(rx-W*0.030,ry-H*0.246);
     ctx.lineTo(rx+W*0.030,ry-H*0.246);
     ctx.lineTo(rx+W*0.020,ry-H*0.262);
     ctx.lineTo(rx,ry-H*0.270);
     ctx.lineTo(rx-W*0.020,ry-H*0.262);
     ctx.closePath();ctx.fill();
     /* Bras le long du corps — rigides */
     ctx.strokeStyle='rgba(15,18,14,0.97)';ctx.lineWidth=W*0.016;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(rx-W*0.022,ry-H*0.196);ctx.lineTo(rx-W*0.030,ry-H*0.123);ctx.stroke();
     ctx.beginPath();ctx.moveTo(rx+W*0.022,ry-H*0.196);ctx.lineTo(rx+W*0.030,ry-H*0.123);ctx.stroke();
    }

    function frame(){
     if(stop.v)return;

     /* ── Vacillement néon GLOBAL ── */
     neonTimer--;
     if(neonTimer<=0){
      neonTimer=Math.round(8+Math.random()*120);
      neonTarget=Math.random()<0.12?0.0+Math.random()*0.3:0.82+Math.random()*0.18;
     }
     neonFlicker+=(neonTarget-neonFlicker)*0.18;
     const nl=neonFlicker;

     /* ── Néon CENTRAL — panne dramatique indépendante ── */
     neon2Timer--;
     if(neon2Timer<=0){
      if(neon2Broken){
       /* Sortie de panne : scintillements rapides avant de revenir */
       neon2BreakTimer--;
       if(neon2BreakTimer<=0){
        neon2Broken=false;
        neon2=1.0; neon2Target=0.90+Math.random()*0.10;
        neon2Timer=Math.round(60+Math.random()*180);
       } else {
        /* Flash erratique */
        neon2=Math.random()<0.5?0.0:0.7+Math.random()*0.3;
        neon2Timer=Math.round(2+Math.random()*5);
       }
      } else {
       const roll=Math.random();
       if(roll<0.07){
        /* Déclencher une panne : éteint pendant 1-3s */
        neon2Broken=true;
        neon2=0.0; neon2Target=0.0;
        neon2BreakTimer=Math.round(40+Math.random()*120);
        neon2Timer=3;
       } else {
        neon2Target=Math.random()<0.15?0.2+Math.random()*0.3:0.82+Math.random()*0.18;
        neon2Timer=Math.round(6+Math.random()*80);
       }
      }
     }
     if(!neon2Broken) neon2+=(neon2Target-neon2)*0.22;

     /* ── Nuages devant la lune ── */
     cloudTimer--;
     if(cloudTimer<=0){
      cloudDir*=-1;
      cloudTimer=Math.random()*300+200;
     }
     cloudAlpha+=cloudDir*0.0008;
     cloudAlpha=Math.max(0,Math.min(0.55,cloudAlpha));

     /* ── Patient qui tourne la tête — lit 2 ── */
     if(headPause>0){
      headPause--;
     } else if(headMoving){
      headAngle+=headDir*0.008;
      if(Math.abs(headAngle)>0.55){headDir*=-1; headMoving=false; headPause=Math.round(60+Math.random()*180);}
     } else {
      headTimer--;
      if(headTimer<=0){headMoving=true; headDir=(Math.random()<0.5?1:-1); headTimer=Math.round(120+Math.random()*200);}
     }

     /* ── Respiration McMurphy ── */
     mcSwayPhase+=0.006;
     const mcSway=Math.sin(mcSwayPhase)*0.012+Math.sin(mcSwayPhase*2.3)*0.004;

     /* ── FOND couloir asile — vert institutionnel fané ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#080c08');
     bg.addColorStop(0.25,'#0c120a');
     bg.addColorStop(0.55,'#0e140b');
     bg.addColorStop(1,'#060908');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── Mur du fond — perspective couloir ── */
     const wallG=ctx.createLinearGradient(0,0,0,H*0.65);
     wallG.addColorStop(0,`rgba(${28+nl*8|0},${34+nl*10|0},${26+nl*8|0},0.96)`);
     wallG.addColorStop(0.5,`rgba(${22+nl*6|0},${28+nl*8|0},${20+nl*6|0},0.96)`);
     wallG.addColorStop(1,`rgba(${18+nl*4|0},${22+nl*6|0},${16+nl*4|0},0.96)`);
     ctx.fillStyle=wallG;ctx.fillRect(0,0,W,H*0.65);

     /* Ligne de lambris à mi-hauteur */
     ctx.fillStyle=`rgba(${20+nl*5|0},${26+nl*6|0},${18+nl*5|0},0.95)`;
     ctx.fillRect(0,H*0.42,W,H*0.06);
     ctx.fillStyle='rgba(12,16,10,0.90)';
     ctx.fillRect(0,H*0.42,W,H*0.006);
     ctx.fillRect(0,H*0.476,W,H*0.004);

     /* ── SOL carrelage ── */
     const floorG=ctx.createLinearGradient(0,H*0.65,0,H);
     floorG.addColorStop(0,`rgba(${24+nl*6|0},${30+nl*8|0},${22+nl*6|0},0.97)`);
     floorG.addColorStop(1,'rgba(8,10,8,0.99)');
     ctx.fillStyle=floorG;ctx.fillRect(0,H*0.65,W,H*0.35);

     /* Joints carrelage sol — perspective */
     ctx.strokeStyle=`rgba(12,16,10,${0.45+nl*0.10})`;ctx.lineWidth=0.8;
     const tileCount=6;
     for(let ti=0;ti<=tileCount;ti++){
      const tx2=ti*W/tileCount;
      ctx.beginPath();ctx.moveTo(tx2,H*0.65);ctx.lineTo(cx,H*1.8);ctx.stroke();
     }
     for(let ti=0;ti<4;ti++){
      const ty2=H*(0.65+ti*0.12);
      ctx.beginPath();ctx.moveTo(0,ty2);ctx.lineTo(W,ty2);ctx.stroke();
     }

     /* ── NÉONS AU PLAFOND — néon central avec sa propre intensité ── */
     const neonY=H*0.04;
     const neonDefs=[[W*0.08,W*0.18,nl],[W*0.34,W*0.24,neon2],[W*0.66,W*0.20,nl]];
     for(const [nx2,nw,ni] of neonDefs){
      ctx.fillStyle=`rgba(${180+ni*45|0},${190+ni*42|0},${168+ni*38|0},${0.55+ni*0.35})`;
      ctx.fillRect(nx2,neonY,nw,H*0.018);
      const ng=ctx.createRadialGradient(nx2+nw/2,neonY,0,nx2+nw/2,neonY,H*0.35);
      ng.addColorStop(0,`rgba(160,175,145,${ni*0.22})`);
      ng.addColorStop(0.4,`rgba(120,140,105,${ni*0.08})`);
      ng.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ng;ctx.fillRect(0,0,W,H*0.60);
      /* Étincelle au moment du retour de panne */
      if(neon2Broken&&ni===neon2&&neon2>0.5&&Math.random()<0.4){
       ctx.fillStyle=`rgba(220,230,180,${Math.random()*0.6})`;
       ctx.beginPath();ctx.arc(nx2+nw/2+( Math.random()-0.5)*nw*0.6,neonY+H*0.009,Math.random()*2+0.5,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── FENÊTRE grillagée ── */
     const winX=W*0.58,winY=H*0.06,winW=W*0.36,winH=H*0.32;

     /* Ciel + lune + étoiles (avec voile nuage) */
     const moonX=winX+winW*0.62, moonY=winY+winH*0.28, moonR=winW*0.10;
     const skyG=ctx.createLinearGradient(winX,winY,winX,winY+winH);
     skyG.addColorStop(0,'#030608');skyG.addColorStop(0.5,'#060c10');skyG.addColorStop(1,'#0a1418');
     ctx.fillStyle=skyG;ctx.fillRect(winX,winY,winW,winH);
     for(const s of stars){
      const sx=winX+s.x*winW, sy=winY+s.y*winH;
      if(sx<winX||sx>winX+winW||sy<winY||sy>winY+winH)continue;
      s.ph+=0.015;
      ctx.fillStyle=`rgba(220,230,255,${s.op*(0.7+0.3*Math.sin(s.ph))*(1-cloudAlpha*0.6)})`;
      ctx.beginPath();ctx.arc(sx,sy,s.r,0,Math.PI*2);ctx.fill();
     }
     /* Halo lune */
     const moonG=ctx.createRadialGradient(moonX,moonY,0,moonX,moonY,moonR*2.5);
     moonG.addColorStop(0,`rgba(230,235,210,${0.95*(1-cloudAlpha*0.7)})`);
     moonG.addColorStop(0.35,`rgba(210,218,190,${0.80*(1-cloudAlpha*0.7)})`);
     moonG.addColorStop(0.65,`rgba(180,195,160,${0.20*(1-cloudAlpha*0.5)})`);
     moonG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonG;ctx.beginPath();ctx.arc(moonX,moonY,moonR*2.5,0,Math.PI*2);ctx.fill();
     ctx.fillStyle=`rgba(228,232,208,${0.97*(1-cloudAlpha*0.8)})`;
     ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(4,7,10,0.45)';
     ctx.beginPath();ctx.arc(moonX+moonR*0.28,moonY-moonR*0.08,moonR*0.88,0,Math.PI*2);ctx.fill();
     /* Nuage semi-transparent devant la lune */
     if(cloudAlpha>0.01){
      const cg=ctx.createRadialGradient(moonX,moonY,0,moonX,moonY,moonR*2.2);
      cg.addColorStop(0,`rgba(8,12,18,${cloudAlpha*0.7})`);
      cg.addColorStop(0.5,`rgba(6,10,15,${cloudAlpha*0.45})`);
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(moonX,moonY,moonR*2.2,0,Math.PI*2);ctx.fill();
     }
     /* Barreaux */
     const barCount=5;
     ctx.strokeStyle='rgba(28,32,26,0.97)';ctx.lineWidth=W*0.010;ctx.lineCap='butt';
     for(let b=0;b<barCount;b++){
      const bx2=winX+winW*(b+1)/(barCount+1);
      ctx.beginPath();ctx.moveTo(bx2,winY);ctx.lineTo(bx2,winY+winH);ctx.stroke();
     }
     ctx.lineWidth=W*0.006;
     for(let b=0;b<3;b++){
      const by2=winY+winH*(b+1)/4;
      ctx.beginPath();ctx.moveTo(winX,by2);ctx.lineTo(winX+winW,by2);ctx.stroke();
     }
     ctx.strokeStyle='rgba(40,48,36,0.98)';ctx.lineWidth=W*0.016;
     ctx.strokeRect(winX,winY,winW,winH);
     /* Reflet lune */
     const rfG=ctx.createLinearGradient(winX,winY+winH,winX+winW,winY+winH+H*0.06);
     rfG.addColorStop(0,`rgba(180,190,160,${(0.06+Math.sin(t*0.4)*0.01)*(1-cloudAlpha*0.8)})`);
     rfG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rfG;ctx.fillRect(winX,winY+winH,winW,H*0.06);

     /* ── Ombres des barreaux sur le mur gauche — moonbeam animé ── */
     const beamOp=(1-cloudAlpha)*0.06*(0.7+0.3*Math.sin(t*0.22));
     if(beamOp>0.005){
      ctx.save();ctx.globalAlpha=beamOp;
      const barShadowCount=5;
      const shadowSpread=W*0.55;
      for(let b=0;b<barShadowCount;b++){
       const srcX=winX+winW*(b+1)/(barShadowCount+1);
       const dstX=(srcX-winX)/(winW)*shadowSpread;
       ctx.strokeStyle='rgba(8,16,10,1)';ctx.lineWidth=W*0.014;
       ctx.beginPath();ctx.moveTo(srcX,winY+winH);ctx.lineTo(dstX,H*0.65);ctx.stroke();
      }
      ctx.restore();
     }

     /* Rayon de lune sur le sol */
     const moonBeam=ctx.createLinearGradient(winX+winW*0.5,winY+winH,winX+winW*0.5,H);
     moonBeam.addColorStop(0,`rgba(180,195,160,${(0.08+Math.sin(t*0.3)*0.01)*(1-cloudAlpha*0.85)})`);
     moonBeam.addColorStop(0.4,'rgba(140,160,120,0.03)');
     moonBeam.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonBeam;
     ctx.beginPath();
     ctx.moveTo(winX,winY+winH);ctx.lineTo(winX+winW,winY+winH);
     ctx.lineTo(winX+winW*0.75,H);ctx.lineTo(winX+winW*0.25,H);
     ctx.closePath();ctx.fill();

     /* ── LITS patients en fond — lit 2 avec tête animée ── */
     const bedY=H*0.648;
     for(let bi=0;bi<beds.length;bi++){
      const bed=beds[bi];
      const wa=(bi===2&&!bed.sitting&&bed.hasPatient)?headAngle:undefined;
      drawBed(bed.x,bedY,bed.hasPatient,bed.sitting,wa);
     }

     /* ── MCMURPHY — balancement subtil, taille réduite ── */
     ctx.save();
     ctx.translate(W*0.25, H*0.82);
     ctx.scale(0.82, 0.58);
     ctx.translate(-W*0.25, -H*0.82);
     drawMcMurphy(W*0.25, H*0.82, mcSway);
     ctx.restore();

     /* ── RATCHED — immobile, glaciale, taille réduite ── */
     ctx.save();
     ctx.translate(W*0.72, H*0.82);
     ctx.scale(0.82, 0.58);
     ctx.translate(-W*0.72, -H*0.82);
     drawRatched(W*0.72, H*0.82);
     ctx.restore();

     /* ── Ombre de McMurphy sur le sol ── */
     ctx.save();
     ctx.globalAlpha=0.18;
     ctx.fillStyle='rgba(0,0,0,1)';
     ctx.beginPath();
     ctx.ellipse(W*0.25,H*0.825,W*0.034,H*0.011,0,0,Math.PI*2);
     ctx.fill();
     ctx.restore();

     /* ── Ombre de Ratched sur le sol ── */
     ctx.save();
     ctx.globalAlpha=0.15;
     ctx.fillStyle='rgba(0,0,0,1)';
     ctx.beginPath();
     ctx.ellipse(W*0.72,H*0.825,W*0.025,H*0.009,0,0,Math.PI*2);
     ctx.fill();
     ctx.restore();

     /* ── Poussière flottante ── */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.ph+=0.018;
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      if(d.y<0)d.y=H;if(d.y>H)d.y=0;
      const da=d.op*(0.5+0.5*Math.sin(d.ph))*nl;
      ctx.fillStyle=`rgba(160,170,148,${da})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette sombre — oppressante ── */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.05,cx,H*0.45,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(0,0,0,0.18)');
     vg.addColorStop(1,'rgba(0,0,0,0.96)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* ── Grain pellicule années 70 ── */
     for(let i=0;i<65;i++){
      const g=8+Math.random()*20|0;
      ctx.fillStyle=`rgba(${g+3},${g+4},${g+2},${Math.random()*0.025})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.6+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
