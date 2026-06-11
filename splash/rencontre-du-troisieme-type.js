// CinéQuiz splash chunk — Rencontre du Troisième Type
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Rencontre du Troisième Type"]={
   name:'Rencontre du Troisième Type',
   color:'200,180,60',
   ref:'Rencontres du Troisi\u00e8me Type \u2014 Steven Spielberg, 1977',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;
    /* CSS — position du contenu */
    let _rdtS=document.getElementById('_rdt_s');
    if(!_rdtS){_rdtS=document.createElement('style');_rdtS.id='_rdt_s';document.head.appendChild(_rdtS);}
    _rdtS.textContent='#splash-content-wrap{top:65%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _rdtW=setInterval(()=>{if(stop.v){_rdtS.textContent='';clearInterval(_rdtW);}},200);
    /* Point de fuite horizon — légèrement en dessous du centre */
    const vpX=cx, vpY=H*0.52;
    /* Étoiles — uniquement dans la moitié supérieure */
    const stars=Array.from({length:220},()=>({
     x:Math.random()*W, y:Math.random()*vpY*0.92,
     r:Math.random()*1.4+0.2,
     op:Math.random()*0.75+0.15,
     tw:Math.random()*Math.PI*2,
     tf:Math.random()*0.018+0.004
    }));
    /* Lumières tournantes de la soucoupe */
    const ufoLights=Array.from({length:16},(_,i)=>({angle:i/16*Math.PI*2,ph:i*0.40}));

    /* ── Dessine la soucoupe ── */
    function drawUFO(ux,uy){
     const ur=W*0.30;
     /* Halo externe */
     const halo=ctx.createRadialGradient(ux,uy,ur*0.05,ux,uy,ur*2.2);
     halo.addColorStop(0,`rgba(120,200,255,${0.28+Math.sin(t*1.2)*0.10})`);
     halo.addColorStop(0.4,`rgba(60,120,220,${0.12+Math.sin(t*0.9)*0.04})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.beginPath();ctx.arc(ux,uy,ur*2.2,0,Math.PI*2);ctx.fill();
     /* Corps principal — disque aplati */
     const bg2=ctx.createRadialGradient(ux-ur*0.10,uy-ur*0.06,4,ux,uy,ur);
     bg2.addColorStop(0,'rgba(210,230,255,0.96)');
     bg2.addColorStop(0.55,'rgba(130,170,230,0.82)');
     bg2.addColorStop(0.85,'rgba(70,110,200,0.68)');
     bg2.addColorStop(1,'rgba(40,70,170,0.50)');
     ctx.fillStyle=bg2;
     ctx.beginPath();ctx.ellipse(ux,uy,ur,ur*0.22,0,0,Math.PI*2);ctx.fill();
     /* Dôme supérieur */
     const dg=ctx.createRadialGradient(ux-ur*0.07,uy-ur*0.22,2,ux,uy-ur*0.08,ur*0.38);
     dg.addColorStop(0,'rgba(220,240,255,0.94)');
     dg.addColorStop(0.6,'rgba(150,190,245,0.72)');
     dg.addColorStop(1,'rgba(80,130,220,0.45)');
     ctx.fillStyle=dg;
     ctx.beginPath();ctx.ellipse(ux,uy-ur*0.09,ur*0.30,ur*0.25,0,0,-Math.PI);ctx.closePath();ctx.fill();
     /* Reflet brillant sur le dôme */
     const shine=ctx.createRadialGradient(ux-ur*0.12,uy-ur*0.26,1,ux-ur*0.10,uy-ur*0.20,ur*0.14);
     shine.addColorStop(0,'rgba(255,255,255,0.70)');
     shine.addColorStop(1,'rgba(255,255,255,0)');
     ctx.fillStyle=shine;ctx.beginPath();ctx.ellipse(ux-ur*0.10,uy-ur*0.22,ur*0.14,ur*0.09,0,0,Math.PI*2);ctx.fill();
     /* Lumières clignotantes sur le pourtour */
     for(const l of ufoLights){
      l.ph+=0.055;
      const lx=ux+Math.cos(l.angle+t*1.2)*ur*0.85;
      const ly=uy+Math.sin(l.angle+t*1.2)*ur*0.19;
      const la=0.45+Math.sin(l.ph)*0.55;
      const lh=(l.angle*180/Math.PI+t*45)%360;
      const lg=ctx.createRadialGradient(lx,ly,0.5,lx,ly,ur*0.11);
      lg.addColorStop(0,`hsla(${lh},95%,72%,${la*0.95})`);
      lg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lg;ctx.beginPath();ctx.arc(lx,ly,ur*0.11,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`hsla(${lh},88%,75%,${la})`;
      ctx.beginPath();ctx.arc(lx,ly,2.5,0,Math.PI*2);ctx.fill();
     }
     /* Faisceau lumineux — descend vers la route */
     const beamPulse=0.28+Math.sin(t*2.2)*0.10;
     const beamG=ctx.createLinearGradient(ux,uy+ur*0.20,ux,vpY+H*0.04);
     beamG.addColorStop(0,`rgba(160,220,255,${beamPulse})`);
     beamG.addColorStop(0.35,`rgba(100,180,255,${beamPulse*0.55})`);
     beamG.addColorStop(1,'rgba(80,160,255,0)');
     ctx.fillStyle=beamG;
     const bwTop=ur*0.10;
     const bwBot=ur*0.60+Math.sin(t*2.8)*ur*0.04;
     ctx.beginPath();
     ctx.moveTo(ux-bwTop,uy+ur*0.20);
     ctx.lineTo(ux+bwTop,uy+ur*0.20);
     ctx.lineTo(ux+bwBot,vpY+H*0.04);
     ctx.lineTo(ux-bwBot,vpY+H*0.04);
     ctx.closePath();ctx.fill();
     /* Lueur au sol du faisceau */
     const flare=ctx.createRadialGradient(ux,vpY+H*0.02,0,ux,vpY+H*0.02,bwBot*1.1);
     flare.addColorStop(0,`rgba(100,190,255,${0.22+Math.sin(t*2)*0.08})`);
     flare.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=flare;ctx.beginPath();ctx.ellipse(ux,vpY+H*0.02,bwBot*1.1,H*0.025,0,0,Math.PI*2);ctx.fill();
    }

    /* ── Route en perspective (affiche originale) ── */
    function drawRoad(){
     const roadY=vpY;
     const rW=W*0.24; /* largeur de la route au premier plan */
     /* Sol noir de chaque côté */
     const groundG=ctx.createLinearGradient(0,roadY,0,H);
     groundG.addColorStop(0,'rgba(2,3,5,0.98)');
     groundG.addColorStop(1,'rgba(1,1,2,1)');
     ctx.fillStyle=groundG;ctx.fillRect(0,roadY,W,H-roadY);
     /* Collines sombres sur les bords (silhouette) */
     ctx.fillStyle='rgba(3,5,8,1)';
     ctx.beginPath();
     ctx.moveTo(0,H);ctx.lineTo(0,roadY+H*0.05);
     ctx.bezierCurveTo(W*0.08,roadY-H*0.05, W*0.20,roadY-H*0.08, vpX-W*0.02,roadY);
     ctx.lineTo(vpX,roadY);ctx.lineTo(0,roadY);ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(3,5,8,1)';
     ctx.beginPath();
     ctx.moveTo(W,H);ctx.lineTo(W,roadY+H*0.05);
     ctx.bezierCurveTo(W*0.92,roadY-H*0.05, W*0.80,roadY-H*0.08, vpX+W*0.02,roadY);
     ctx.lineTo(vpX,roadY);ctx.lineTo(W,roadY);ctx.closePath();ctx.fill();
     /* Asphalte de la route — dégradé sombre bleuté */
     const roadG=ctx.createLinearGradient(0,roadY,0,H);
     roadG.addColorStop(0,'rgba(12,18,28,0.96)');
     roadG.addColorStop(0.5,'rgba(8,12,20,0.98)');
     roadG.addColorStop(1,'rgba(4,6,10,1)');
     ctx.fillStyle=roadG;
     ctx.beginPath();
     ctx.moveTo(vpX,roadY);
     ctx.lineTo(vpX+rW,H);
     ctx.lineTo(vpX-rW,H);
     ctx.closePath();ctx.fill();
     /* Bandes blanches sur la route */
     const nDashes=7;
     for(let i=0;i<nDashes;i++){
      const prog=(i+1)/(nDashes+1);
      const dashY=roadY+prog*(H-roadY);
      const dashHW=rW*prog*0.06;
      const dashH=(H-roadY)*0.04*prog;
      const dashAlpha=0.55*prog;
      ctx.fillStyle=`rgba(200,215,235,${dashAlpha})`;
      ctx.beginPath();
      ctx.moveTo(vpX-dashHW,dashY-dashH/2);
      ctx.lineTo(vpX+dashHW,dashY-dashH/2);
      ctx.lineTo(vpX+dashHW,dashY+dashH/2);
      ctx.lineTo(vpX-dashHW,dashY+dashH/2);
      ctx.closePath();ctx.fill();
     }
     /* Lignes de bas-côté (marquage blanc) */
     ctx.strokeStyle=`rgba(180,200,230,0.30)`;
     ctx.lineWidth=1.2;
     ctx.beginPath();ctx.moveTo(vpX,roadY);ctx.lineTo(vpX+rW,H);ctx.stroke();
     ctx.beginPath();ctx.moveTo(vpX,roadY);ctx.lineTo(vpX-rW,H);ctx.stroke();
     /* Reflet lumineux de la lumière de l'horizon sur la route */
     const roadRefl=ctx.createRadialGradient(vpX,roadY,0,vpX,roadY,rW*1.6);
     roadRefl.addColorStop(0,`rgba(120,200,255,${0.18+Math.sin(t*1.4)*0.06})`);
     roadRefl.addColorStop(0.5,'rgba(60,120,200,0.06)');
     roadRefl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=roadRefl;
     ctx.beginPath();
     ctx.moveTo(vpX,roadY);ctx.lineTo(vpX+rW*1.6,H);ctx.lineTo(vpX-rW*1.6,H);ctx.closePath();ctx.fill();
    }

    /* ── Lumière éblouissante à l'horizon (poster) ── */
    function drawHorizonLight(){
     /* Nébuleuse / lueur bleue-verte en arrière-plan */
     const nebula=ctx.createRadialGradient(vpX,vpY*0.88,H*0.02,vpX,vpY*0.85,H*0.38);
     nebula.addColorStop(0,`rgba(40,80,160,${0.18+Math.sin(t*0.7)*0.06})`);
     nebula.addColorStop(0.4,`rgba(20,50,110,${0.10})`);
     nebula.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nebula;ctx.fillRect(0,0,W,vpY);
     /* Halo de la source lumineuse à l'horizon */
     const glow=ctx.createRadialGradient(vpX,vpY,0,vpX,vpY,W*0.55);
     glow.addColorStop(0,`rgba(255,255,255,${0.90+Math.sin(t*1.8)*0.06})`);
     glow.addColorStop(0.04,`rgba(220,240,255,${0.82+Math.sin(t*1.5)*0.06})`);
     glow.addColorStop(0.12,`rgba(140,200,255,${0.45+Math.sin(t*1.1)*0.06})`);
     glow.addColorStop(0.28,`rgba(60,130,230,${0.22})`);
     glow.addColorStop(0.55,`rgba(20,60,150,${0.08})`);
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow;ctx.beginPath();ctx.arc(vpX,vpY,W*0.55,0,Math.PI*2);ctx.fill();
     /* Point de lumière intense — cœur blanc-bleu éblouissant */
     const core=ctx.createRadialGradient(vpX,vpY,0,vpX,vpY,W*0.07);
     core.addColorStop(0,'rgba(255,255,255,1.0)');
     core.addColorStop(0.3,'rgba(200,230,255,0.92)');
     core.addColorStop(0.7,'rgba(100,180,255,0.55)');
     core.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=core;ctx.beginPath();ctx.arc(vpX,vpY,W*0.07,0,Math.PI*2);ctx.fill();
    }

    function frame(){
     if(stop.v)return;
     /* Fond noir profond — léger trail pour les étoiles */
     ctx.fillStyle='rgba(1,2,6,0.25)';ctx.fillRect(0,0,W,H);
     /* Ciel étoilé */
     for(const s of stars){
      s.tw+=s.tf;
      const op=s.op*(0.45+Math.sin(s.tw)*0.55);
      ctx.fillStyle=`rgba(255,255,255,${op})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }
     /* Lumière horizon AVANT la route (fond) */
     drawHorizonLight();
     /* Route en perspective */
     drawRoad();
     /* Soucoupe volante en haut, centrée */
     drawUFO(cx, H*0.28);
     /* Vignette générale */
     const vg=ctx.createRadialGradient(cx,H*0.42,H*0.04,cx,H*0.42,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(0,0,0,0.10)');
     vg.addColorStop(1,'rgba(0,0,0,0.95)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
