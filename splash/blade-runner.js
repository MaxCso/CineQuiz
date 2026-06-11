// CinéQuiz splash chunk — Blade Runner
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Blade Runner"]={
   name:'Blade Runner',
   color:'255,120,30',
   ref:'Blade Runner \u2014 Ridley Scott, 1982',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;

    /* ── Masque les orbes du splash ── */
    const _brS=document.createElement('style');
    _brS.id='_br_bg_override';
    _brS.textContent='#splash-bg,#splash-bg-anim{opacity:0!important;}';
    document.head.appendChild(_brS);
    const _brCleanup=setInterval(()=>{if(stop.v){clearInterval(_brCleanup);const el=document.getElementById('_br_bg_override');if(el)el.remove();}},200);

    /* ══ IMAGE DE FOND ══ */
    const bg=new Image();
    bg.src='images/BR.png';
    let bgReady=false;
    bg.onload=()=>{bgReady=true;};

    /* ══ PLUIE ══ */
    const drops=Array.from({length:180},()=>({
     x:Math.random()*W*1.2-W*0.1,
     y:Math.random()*H,
     len:Math.random()*55+20,
     spd:Math.random()*7+5,
     op:Math.random()*0.20+0.05,
     w:Math.random()*0.6+0.2
    }));

    /* ══ VAPEUR ══ */
    function mkSteam(){
     return {
      x:W*(0.05+Math.random()*0.9),
      y:H*(0.7+Math.random()*0.25),
      r:W*(0.02+Math.random()*0.025),
      vx:(Math.random()-0.5)*0.35,
      vy:-(0.3+Math.random()*0.55),
      op:0.04+Math.random()*0.07,
      col:Math.random()<0.55?'160,100,220':'220,120,40'
     };
    }
    const steams=Array.from({length:18},mkSteam);

    /* ══ PARTICULES LUMINEUSES ══ */
    const parts=Array.from({length:55},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:0.6+Math.random()*1.4,
     vx:(Math.random()-0.5)*0.4,
     vy:(Math.random()-0.5)*0.3-0.15,
     op:0.15+Math.random()*0.45,
     ph:Math.random()*Math.PI*2,
     col:['255,140,40','0,200,220','180,80,255','255,200,60'][Math.random()*4|0]
    }));

    /* ══ SCAN LINE CRT ══ */
    let scanY=0;

    /* ══ HALO NÉON SUR LES BORDS ══ */
    const GLOW_COLS=[[255,110,30],[0,180,210],[200,60,255]];
    let glowIdx=0, glowNext=0;

    /* ══ SPINNERS ══ */
    /* Spinner 1 — gauche→droite, niveau haut */
    let sp1X=-120, sp1Y=H*0.18, sp1Spd=0.75;
    /* Spinner 2 — droite→gauche, niveau moyen, plus lent */
    let sp2X=W+120, sp2Y=H*0.32, sp2Spd=0.45;

    function drawSpinner(x,y,flip){
     ctx.save();
     ctx.translate(x,y);
     if(flip){ctx.scale(-1,1);}
     /* halo lumineux sous la carlingue */
     const halo=ctx.createRadialGradient(0,6,0,0,6,48);
     halo.addColorStop(0,`rgba(255,180,80,${0.12+0.06*Math.sin(t*3)})`);
     halo.addColorStop(0.5,`rgba(40,100,200,${0.06+0.03*Math.sin(t*2.5)})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(-50,-10,100,40);
     /* corps principal — fuselage */
     ctx.fillStyle='rgba(18,14,26,0.92)';
     ctx.beginPath();ctx.ellipse(0,0,36,9,0,0,Math.PI*2);ctx.fill();
     /* reflet métallique sur le dessus */
     const shine=ctx.createLinearGradient(-36,-9,0,-4);
     shine.addColorStop(0,'rgba(80,70,110,0)');
     shine.addColorStop(0.5,'rgba(120,110,160,0.35)');
     shine.addColorStop(1,'rgba(80,70,110,0)');
     ctx.fillStyle=shine;ctx.beginPath();ctx.ellipse(0,-2,30,5,0,0,Math.PI*2);ctx.fill();
     /* pare-brise — teinte bleutée */
     ctx.fillStyle='rgba(30,70,130,0.60)';
     ctx.beginPath();ctx.ellipse(-3,-5,14,5,0,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(80,140,220,0.35)';ctx.lineWidth=0.5;
     ctx.beginPath();ctx.ellipse(-3,-5,14,5,0,0,Math.PI*2);ctx.stroke();
     /* ailes */
     ctx.fillStyle='rgba(12,9,18,0.90)';
     ctx.beginPath();ctx.moveTo(-28,2);ctx.lineTo(-50,8);ctx.lineTo(-46,13);ctx.lineTo(-26,6);ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.moveTo(28,2);ctx.lineTo(50,8);ctx.lineTo(46,13);ctx.lineTo(26,6);ctx.closePath();ctx.fill();
     /* feux de position clignotants */
     const f1=0.65+0.35*Math.sin(t*4.2);
     const f2=0.65+0.35*Math.sin(t*4.2+Math.PI);
     const rg1=ctx.createRadialGradient(-47,10,0,-47,10,9);
     rg1.addColorStop(0,`rgba(255,45,20,${f1})`);rg1.addColorStop(1,'rgba(255,45,20,0)');
     ctx.fillStyle=rg1;ctx.fillRect(-56,4,18,13);
     const rg2=ctx.createRadialGradient(47,10,0,47,10,9);
     rg2.addColorStop(0,`rgba(50,110,255,${f2})`);rg2.addColorStop(1,'rgba(50,110,255,0)');
     ctx.fillStyle=rg2;ctx.fillRect(38,4,18,13);
     /* phare avant — cone de lumière */
     const ph=ctx.createRadialGradient(38,0,0,55,2,28);
     ph.addColorStop(0,`rgba(255,240,200,${0.45+0.1*Math.sin(t*1.5)})`);
     ph.addColorStop(0.4,'rgba(255,240,200,0.12)');
     ph.addColorStop(1,'rgba(255,240,200,0)');
     ctx.fillStyle=ph;ctx.beginPath();ctx.moveTo(36,-3);ctx.lineTo(82,-16);ctx.lineTo(82,18);ctx.lineTo(36,5);ctx.closePath();ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond image BR.png — cover ── */
     if(bgReady){
      const iw=bg.naturalWidth,ih=bg.naturalHeight;
      const scale=Math.max(W/iw,H/ih);
      const dw=iw*scale,dh=ih*scale;
      ctx.drawImage(bg,(W-dw)/2,(H-dh)/2,dw,dh);
     } else {
      ctx.fillStyle='#05060a';
      ctx.fillRect(0,0,W,H);
     }

     /* ── Voile sombre global ── */
     ctx.fillStyle='rgba(2,3,8,0.28)';
     ctx.fillRect(0,0,W,H);

     /* ── Halo néon sur les bords (transition orange → cyan → violet) ── */
     const gc=GLOW_COLS[glowIdx];
     const gcN=GLOW_COLS[(glowIdx+1)%GLOW_COLS.length];
     const gb=Math.max(0,Math.min(1,(t-glowNext+0.8)/0.8));
     const gr=gc[0]+(gcN[0]-gc[0])*gb|0;
     const gg=gc[1]+(gcN[1]-gc[1])*gb|0;
     const gbl=gc[2]+(gcN[2]-gc[2])*gb|0;
     if(t>glowNext+0.8){glowNext=t+4.5;glowIdx=(glowIdx+1)%GLOW_COLS.length;}
     const gop=0.07+0.05*Math.sin(t*0.7);
     const glL=ctx.createLinearGradient(0,0,W*0.28,0);
     glL.addColorStop(0,`rgba(${gr},${gg},${gbl},${gop})`);glL.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glL;ctx.fillRect(0,0,W*0.28,H);
     const glR=ctx.createLinearGradient(W,0,W*0.72,0);
     glR.addColorStop(0,`rgba(${gr},${gg},${gbl},${gop})`);glR.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glR;ctx.fillRect(W*0.72,0,W*0.28,H);
     const glB=ctx.createLinearGradient(0,H,0,H*0.72);
     glB.addColorStop(0,`rgba(${gr},${gg},${gbl},${gop*1.4})`);glB.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glB;ctx.fillRect(0,H*0.72,W,H*0.28);

     /* ── Reflet horizon (béton mouillé) ── */
     const horizY=H*0.62;
     const hOp=0.04+0.03*Math.sin(t*1.1);
     const hg=ctx.createLinearGradient(0,horizY-4,0,horizY+10);
     hg.addColorStop(0,'rgba(0,0,0,0)');
     hg.addColorStop(0.4,`rgba(255,150,50,${hOp})`);
     hg.addColorStop(0.6,`rgba(0,180,200,${hOp*0.6})`);
     hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.fillRect(0,horizY-4,W,14);

     /* ── Vapeur ── */
     for(const s of steams){
      s.x+=s.vx;s.y+=s.vy;s.r+=0.12;s.op-=0.0008;
      if(s.y<H*0.3||s.op<=0){Object.assign(s,mkSteam());}
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(${s.col},${s.op})`);sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Particules lumineuses ── */
     for(const p of parts){
      p.x+=p.vx;p.y+=p.vy;p.ph+=0.025;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.col},${p.op*(0.3+0.7*Math.abs(Math.sin(p.ph)))})`;ctx.fill();
     }

     /* ── Spinners ── */
     /* Spinner 1 : gauche → droite */
     sp1X+=sp1Spd;
     if(sp1X>W+130)sp1X=-120;
     drawSpinner(sp1X, sp1Y+Math.sin(t*0.7)*5, false);
     /* Spinner 2 : droite → gauche (miroir) */
     sp2X-=sp2Spd;
     if(sp2X<-130)sp2X=W+120;
     drawSpinner(sp2X, sp2Y+Math.sin(t*0.55+1.8)*4, true);

     /* ── Pluie ── */
     ctx.save();
     for(const d of drops){
      d.y+=d.spd;d.x-=d.spd*0.15;
      if(d.y>H+d.len){d.y=-d.len;d.x=Math.random()*W*1.2-W*0.1;}
      ctx.strokeStyle=`rgba(140,170,220,${d.op})`;
      ctx.lineWidth=d.w;
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x-d.len*0.15,d.y+d.len);ctx.stroke();
     }
     ctx.restore();

     /* ── Scan line CRT ── */
     scanY=(scanY+0.6)%H;
     const slg=ctx.createLinearGradient(0,scanY-6,0,scanY+6);
     slg.addColorStop(0,'rgba(255,255,255,0)');slg.addColorStop(0.5,'rgba(255,255,255,0.035)');slg.addColorStop(1,'rgba(255,255,255,0)');
     ctx.fillStyle=slg;ctx.fillRect(0,scanY-6,W,12);
     ctx.fillStyle='rgba(0,0,0,0.08)';
     for(let y=0;y<H;y+=2)ctx.fillRect(0,y,W,1);

     /* ── Vignette finale ── */
     const vg=ctx.createRadialGradient(W/2,H*0.48,H*0.08,W/2,H*0.48,H*0.78);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.5,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.78,'rgba(0,0,0,0.42)');vg.addColorStop(1,'rgba(0,0,0,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }

    frame();
   }
  };
})();
