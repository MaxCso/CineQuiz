// CinéQuiz splash chunk — Top Gun
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Top Gun"]={
   name:'Top Gun',
   color:'60,140,200',
   ref:'Top Gun \u2014 Tony Scott, 1986',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0'; let t=0; const cx=W/2, cy=H/2;

    /* ── Fond ciel de Californie — pas d'orbes ── */
    let _s=document.getElementById('_tg_s');
    if(!_s){_s=document.createElement('style');_s.id='_tg_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:51%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Horizon : mer en bas ── */
    const HORIZ=H*0.72;

    /* ── Soleil aveuglant (haut-droit) ── */
    const SUN_X=W*0.78, SUN_Y=H*0.12;

    /* ── Nuages effilés à haute altitude ── */
    const clouds=Array.from({length:7},(_,i)=>({
     x:Math.random()*W*1.4-W*0.2,
     y:H*(0.08+i*0.072+Math.random()*0.04),
     w:W*(0.25+Math.random()*0.30),
     h:H*(0.010+Math.random()*0.010),
     spd:0.12+Math.random()*0.10,
     op:0.28+Math.random()*0.20
    }));

    /* ── F-14 Tomcat — un seul avion, grande taille, vrai passage ── */
    /* Il entre depuis la gauche, passe en diagonale légère, sort à droite */
    /* Puis refait un passage en sens inverse, légèrement plus bas */
    const jet={
     x:-W*0.12, y:H*0.36,
     vx:2.4, vy:0.08,
     dir:1, /* 1=gauche→droite, -1=droite→gauche */
     trail:[]
    };

    /* ── Trainée de condensation persistante ── */
    const contrail=[];
    const MAX_CONTRAIL=220;

    /* ── Particules de reflet soleil sur l'eau ── */
    const sparkles=Array.from({length:28},()=>({
     x:Math.random()*W,
     y:HORIZ+Math.random()*(H-HORIZ)*0.7,
     op:Math.random()*0.55+0.10,
     ph:Math.random()*Math.PI*2,
     spd:0.06+Math.random()*0.06,
     size:Math.random()*3+1
    }));

    /* ── Dessin du F-14 Tomcat ── */
    function drawF14(jx, jy, dir, scale){
     const s=W*scale;
     ctx.save();
     ctx.translate(jx, jy);
     if(dir<0) ctx.scale(-1,1); /* retournement pour vol inverse */

     /* Fuselage principal */
     const bodyG=ctx.createLinearGradient(-s*2.2,0,s*2.2,0);
     bodyG.addColorStop(0,'rgba(165,175,185,0.95)');
     bodyG.addColorStop(0.45,'rgba(210,215,220,0.98)');
     bodyG.addColorStop(1,'rgba(155,165,175,0.92)');
     ctx.fillStyle=bodyG;
     ctx.beginPath();
     ctx.moveTo(s*2.2, 0);                          /* nez */
     ctx.bezierCurveTo(s*1.2,-s*0.10, -s*0.5,-s*0.22, -s*2.0,-s*0.22);
     ctx.lineTo(-s*2.4, -s*0.12);
     ctx.lineTo(-s*2.4,  s*0.12);
     ctx.lineTo(-s*2.0,  s*0.22);
     ctx.bezierCurveTo(-s*0.5, s*0.22,  s*1.2, s*0.10,  s*2.2, 0);
     ctx.closePath(); ctx.fill();

     /* Aile delta gauche (variable sweep — position balayée arrière) */
     ctx.fillStyle='rgba(175,182,192,0.94)';
     ctx.beginPath();
     ctx.moveTo(s*0.40, s*0.18);
     ctx.lineTo(-s*1.60, s*1.35);
     ctx.lineTo(-s*1.85, s*1.10);
     ctx.lineTo(-s*1.10, s*0.20);
     ctx.closePath(); ctx.fill();
     /* Aile droite (symétrique) */
     ctx.beginPath();
     ctx.moveTo(s*0.40, -s*0.18);
     ctx.lineTo(-s*1.60, -s*1.35);
     ctx.lineTo(-s*1.85, -s*1.10);
     ctx.lineTo(-s*1.10, -s*0.20);
     ctx.closePath(); ctx.fill();

     /* Dérive verticale (queue) */
     ctx.fillStyle='rgba(160,168,178,0.92)';
     ctx.beginPath();
     ctx.moveTo(-s*1.20,  s*0.10);
     ctx.lineTo(-s*1.90,  s*0.10);
     ctx.lineTo(-s*2.10, -s*0.55);
     ctx.lineTo(-s*1.40, -s*0.55);
     ctx.closePath(); ctx.fill();
     /* Deuxième dérive */
     ctx.beginPath();
     ctx.moveTo(-s*1.20, -s*0.10);
     ctx.lineTo(-s*1.90, -s*0.10);
     ctx.lineTo(-s*2.10,  s*0.55);
     ctx.lineTo(-s*1.40,  s*0.55);
     ctx.closePath(); ctx.fill();

     /* Verrière cockpit */
     const cg=ctx.createLinearGradient(s*1.0,-s*0.28,s*0.4,s*0.05);
     cg.addColorStop(0,'rgba(140,200,240,0.82)');
     cg.addColorStop(1,'rgba(80,150,200,0.55)');
     ctx.fillStyle=cg;
     ctx.beginPath();
     ctx.moveTo(s*1.55,  0);
     ctx.bezierCurveTo(s*1.20,-s*0.28, s*0.55,-s*0.28, s*0.35, 0);
     ctx.bezierCurveTo(s*0.55, s*0.10, s*1.20, s*0.10, s*1.55, 0);
     ctx.closePath(); ctx.fill();
     /* Reflet verrière */
     ctx.fillStyle='rgba(220,240,255,0.35)';
     ctx.beginPath();
     ctx.moveTo(s*1.45,-s*0.04);
     ctx.bezierCurveTo(s*1.20,-s*0.22,s*0.75,-s*0.22,s*0.55,-s*0.04);
     ctx.lineTo(s*0.72,-s*0.16);
     ctx.bezierCurveTo(s*0.95,-s*0.20,s*1.25,-s*0.16,s*1.42,-s*0.04);
     ctx.closePath(); ctx.fill();

     /* Post-combustion — flamme orange */
     const flameG=ctx.createRadialGradient(-s*2.35,0,0,-s*2.35,0,s*0.45);
     flameG.addColorStop(0,`rgba(255,200,60,${0.88+Math.sin(t*12)*0.10})`);
     flameG.addColorStop(0.4,`rgba(255,100,20,${0.55+Math.sin(t*15)*0.10})`);
     flameG.addColorStop(1,'rgba(255,60,0,0)');
     ctx.fillStyle=flameG;
     ctx.beginPath();
     ctx.ellipse(-s*2.42,0,s*0.55,s*0.14,0,0,Math.PI*2);
     ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Ciel dégradé — bleu californien ── */
     const sky=ctx.createLinearGradient(0,0,0,HORIZ);
     sky.addColorStop(0,'#1a5fa0');
     sky.addColorStop(0.35,'#3b82c8');
     sky.addColorStop(0.75,'#6fb0e0');
     sky.addColorStop(1,'#a8d4f0');
     ctx.fillStyle=sky; ctx.fillRect(0,0,W,HORIZ);

     /* ── Soleil ── */
     const sunG=ctx.createRadialGradient(SUN_X,SUN_Y,0,SUN_X,SUN_Y,W*0.28);
     sunG.addColorStop(0,`rgba(255,255,200,${0.85+Math.sin(t*0.4)*0.08})`);
     sunG.addColorStop(0.08,'rgba(255,240,160,0.60)');
     sunG.addColorStop(0.22,'rgba(255,220,100,0.22)');
     sunG.addColorStop(0.50,'rgba(255,200,80,0.06)');
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG; ctx.fillRect(0,0,W,HORIZ);
     /* Disque solaire */
     ctx.fillStyle=`rgba(255,255,220,${0.92+Math.sin(t*0.4)*0.06})`;
     ctx.beginPath(); ctx.arc(SUN_X,SUN_Y,W*0.048,0,Math.PI*2); ctx.fill();

     /* ── Nuages cirrus ── */
     for(const cl of clouds){
      cl.x-=cl.spd;
      if(cl.x+cl.w<0) cl.x=W+cl.w*0.5;
      const cg=ctx.createLinearGradient(cl.x,cl.y,cl.x,cl.y+cl.h);
      cg.addColorStop(0,`rgba(255,255,255,${cl.op})`);
      cg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();
      ctx.ellipse(cl.x+cl.w*0.5,cl.y+cl.h*0.5,cl.w*0.5,cl.h*0.5,0,0,Math.PI*2);
      ctx.fill();
     }

     /* ── Mer — reflets ── */
     const sea=ctx.createLinearGradient(0,HORIZ,0,H);
     sea.addColorStop(0,'#1a6892');
     sea.addColorStop(0.3,'#155a80');
     sea.addColorStop(0.7,'#0e3d5c');
     sea.addColorStop(1,'#081e30');
     ctx.fillStyle=sea; ctx.fillRect(0,HORIZ,W,H-HORIZ);

     /* Ligne d'horizon — lueur */
     const horizG=ctx.createLinearGradient(0,HORIZ-H*0.015,0,HORIZ+H*0.025);
     horizG.addColorStop(0,'rgba(200,230,255,0.30)');
     horizG.addColorStop(0.5,'rgba(180,220,255,0.55)');
     horizG.addColorStop(1,'rgba(100,180,220,0.12)');
     ctx.fillStyle=horizG; ctx.fillRect(0,HORIZ-H*0.015,W,H*0.040);

     /* Reflets soleil sur la mer — scintillements */
     for(const sp of sparkles){
      sp.ph+=sp.spd;
      const pulse=Math.pow(Math.max(0,Math.sin(sp.ph)),3);
      if(pulse<0.05) continue;
      ctx.fillStyle=`rgba(255,240,160,${pulse*sp.op})`;
      ctx.beginPath();
      ctx.ellipse(sp.x,sp.y,sp.size*pulse,sp.size*0.35*pulse,0,0,Math.PI*2);
      ctx.fill();
     }

     /* ── Trainée de condensation ── */
     contrail.push({x:jet.x, y:jet.y, age:0});
     if(contrail.length>MAX_CONTRAIL) contrail.shift();
     for(let ci=0;ci<contrail.length;ci++){
      contrail[ci].age++;
      const prog=ci/contrail.length;
      const age=contrail[ci].age;
      /* La trainée grossit et s'estompe */
      const radius=H*(0.004+prog*0.022);
      const alpha=Math.max(0,prog*0.42*(1-age/380));
      if(alpha<0.004) continue;
      ctx.fillStyle=`rgba(245,250,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(contrail[ci].x,contrail[ci].y,radius,0,Math.PI*2);
      ctx.fill();
     }

     /* ── F-14 — déplacement ── */
     jet.x+=jet.vx*jet.dir;
     jet.y+=jet.vy;
     /* Léger virage sinusoïdal */
     jet.vy=Math.sin(t*0.35)*0.22;
     /* Repart en sens inverse quand il sort */
     if(jet.dir===1 && jet.x>W*1.18){
      jet.dir=-1; jet.x=W*1.18;
      jet.y=H*(0.30+Math.random()*0.14);
     } else if(jet.dir===-1 && jet.x<-W*0.18){
      jet.dir=1; jet.x=-W*0.18;
      jet.y=H*(0.30+Math.random()*0.14);
     }

     /* Ombre de l'avion au sol (mer) */
     const shadowY=HORIZ+(jet.y-HORIZ)*0.15+H*0.04;
     const shadowAlpha=Math.max(0,0.12-(jet.y/H)*0.10);
     ctx.fillStyle=`rgba(0,30,60,${shadowAlpha})`;
     ctx.beginPath();
     ctx.ellipse(jet.x,shadowY,W*0.065,H*0.008,0,0,Math.PI*2);
     ctx.fill();

     /* Avion */
     drawF14(jet.x, jet.y, jet.dir, 0.055);

     /* ── Vignette douce ── */
     const vg=ctx.createRadialGradient(cx,cy,H*0.12,cx,cy,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.60,'rgba(0,0,0,0.08)');
     vg.addColorStop(1,'rgba(0,0,0,0.72)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
