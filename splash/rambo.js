// CinéQuiz splash chunk — Rambo
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Rambo"]={
   name:'Rambo',
   color:'80,60,20',
   ref:'First Blood \u2014 Ted Kotcheff, 1982',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _rbS=document.getElementById('_rmb_s');
    if(!_rbS){_rbS=document.createElement('style');_rbS.id='_rmb_s';document.head.appendChild(_rbS);}
    _rbS.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(40,35,30,0.88)!important;font-size:14px!important;text-shadow:0 1px 6px rgba(180,170,155,0.6)!important;}
     #splash-film-logo{max-width:60%!important;}
     #splash-film-ref-bottom,#splash-film-ref{color:rgba(0,0,0,0.85)!important;-webkit-text-fill-color:rgba(0,0,0,0.85)!important;}
    `;
    const _rbW=setInterval(()=>{if(stop.v){_rbS.textContent='';clearInterval(_rbW);}},200);

    /* ── SVG Rambo (865×1028, ratio ~0.841) ── */
    const ramboImg=new Image(); let ramboReady=false;
    ramboImg.onload=()=>{ ramboReady=true; };
    ramboImg.src='images/Rambo.svg';
    const RAMBO_RATIO=865/1028;

    /* ── Montagnes procédurales en silhouette — style brume atmosphérique ── */
    /* 8 couches de montagnes — progression du plus lointain (clair/bleuté) au plus proche (sombre/défini) */
    /* Inspiré d'une vue aérienne avec effet de profondeur atmosphérique bleu-gris */
    function mkMountains(seed, count, yBase, hMin, hMax, grad){
      function sr(n){ let x=Math.sin(n*seed+1.7)*43758.5453; return x-Math.floor(x); }
      function sr2(n){ let x=Math.sin(n*seed*0.37+seed*2.1)*12345.6789; return x-Math.floor(x); }
      const pts=[{x:-W*0.05, y:yBase}];
      const stepW=(W*1.10)/(count-1);
      for(let i=0;i<count;i++){
        const x=-W*0.05+i*stepW;
        /* Ajouter un sous-détail (micro-dents) pour plus de réalisme */
        const baseH=hMin + sr(i)*(hMax-hMin);
        const detail=sr2(i)*(hMax-hMin)*0.18;
        const y=yBase - (baseH + detail);
        pts.push({x,y});
      }
      pts.push({x:W*1.05, y:yBase});
      return {pts, grad};
    }

    const mtnLayers=[
      /* Couche 1 — extrêmement lointaine, quasi-fondue dans le ciel brumeux */
      mkMountains(3.14, 22, H*0.820, H*0.020, H*0.065, {r:168,g:166,b:158,a0:0.22,a1:0.05}),
      /* Couche 2 — très lointaine */
      mkMountains(1.73, 20, H*0.838, H*0.028, H*0.082, {r:158,g:155,b:146,a0:0.35,a1:0.08}),
      /* Couche 3 — lointaine */
      mkMountains(5.55, 18, H*0.852, H*0.038, H*0.100, {r:148,g:144,b:134,a0:0.48,a1:0.12}),
      /* Couche 4 — intermédiaire lointaine */
      mkMountains(2.71, 15, H*0.866, H*0.048, H*0.120, {r:134,g:130,b:119,a0:0.60,a1:0.16}),
      /* Couche 5 — intermédiaire */
      mkMountains(7.19, 13, H*0.880, H*0.058, H*0.142, {r:118,g:114,b:103,a0:0.72,a1:0.20}),
      /* Couche 6 — intermédiaire proche */
      mkMountains(4.20, 11, H*0.896, H*0.070, H*0.165, {r:100,g:96, b:86, a0:0.82,a1:0.26}),
      /* Couche 7 — proche, bien définie */
      mkMountains(0.83, 9,  H*0.916, H*0.055, H*0.135, {r:80, g:76, b:67, a0:0.90,a1:0.36}),
      /* Couche 8 — premier plan, sombre et contrasté */
      mkMountains(1.41, 7,  H*0.942, H*0.040, H*0.095, {r:58, g:55, b:48, a0:0.97,a1:0.55}),
    ];

    /* Brume inter-couches : bandes horizontales animées entre chaque couche */
    const fogBands=[
      {y:0.824, h:0.018, r:210,g:207,b:198, opBase:0.18, spd:0.07, ph:0.0},
      {y:0.840, h:0.016, r:205,g:202,b:193, opBase:0.22, spd:0.09, ph:1.1},
      {y:0.856, h:0.015, r:200,g:197,b:188, opBase:0.20, spd:0.06, ph:2.3},
      {y:0.872, h:0.014, r:195,g:192,b:183, opBase:0.25, spd:0.08, ph:0.7},
      {y:0.890, h:0.014, r:190,g:186,b:176, opBase:0.28, spd:0.10, ph:1.8},
      {y:0.908, h:0.013, r:184,g:180,b:170, opBase:0.32, spd:0.07, ph:3.1},
    ];

    function drawMtnLayer(layer){
      const {pts, grad}=layer;
      const yBase=pts[0].y;
      /* Gradient vertical : sommet légèrement teinté → base qui se fond dans la brume */
      const g=ctx.createLinearGradient(0, yBase-H*0.22, 0, yBase+H*0.01);
      g.addColorStop(0.00,`rgba(${grad.r},${grad.g},${grad.b},${grad.a0})`);
      g.addColorStop(0.40,`rgba(${grad.r},${grad.g},${grad.b},${grad.a0*0.88})`);
      g.addColorStop(0.75,`rgba(${grad.r},${grad.g},${grad.b},${(grad.a0+grad.a1)*0.55})`);
      g.addColorStop(1.00,`rgba(${grad.r},${grad.g},${grad.b},${grad.a1})`);
      ctx.fillStyle=g;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for(let i=1;i<pts.length-1;i++){
        const mx=(pts[i].x+pts[i+1].x)*0.5;
        const my=(pts[i].y+pts[i+1].y)*0.5;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
      ctx.lineTo(W*1.05, H); ctx.lineTo(-W*0.05, H);
      ctx.closePath(); ctx.fill();
    }

    function drawFogBands(){
      for(const fb of fogBands){
        fb.ph+=fb.spd*0.016;
        const pulse=0.5+0.5*Math.sin(fb.ph);
        /* Bande de brume avec dégradé gaussien vertical */
        const fg=ctx.createLinearGradient(0, H*fb.y, 0, H*(fb.y+fb.h));
        const op=fb.opBase*(0.7+0.3*pulse);
        fg.addColorStop(0.00,`rgba(${fb.r},${fb.g},${fb.b},0)`);
        fg.addColorStop(0.30,`rgba(${fb.r},${fb.g},${fb.b},${op})`);
        fg.addColorStop(0.70,`rgba(${fb.r},${fb.g},${fb.b},${op*0.85})`);
        fg.addColorStop(1.00,`rgba(${fb.r},${fb.g},${fb.b},0)`);
        ctx.fillStyle=fg;
        ctx.fillRect(0, H*fb.y, W, H*fb.h);
      }
    }

    /* ── Particules de brume flottante ── */
    const motes=Array.from({length:22},()=>({
      x:Math.random()*W,
      y:H*(0.55+Math.random()*0.40),
      r:W*(0.008+Math.random()*0.018),
      op:0.04+Math.random()*0.09,
      ph:Math.random()*Math.PI*2,
      spd:0.004+Math.random()*0.008,
      vx:(Math.random()-0.5)*0.10,
    }));

    /* ── Particules de poussière — tombent lentement ── */
    const dust=Array.from({length:18},()=>({
      x:Math.random()*W,
      y:Math.random()*H*0.75,
      r:0.5+Math.random()*1.2,
      op:0.05+Math.random()*0.12,
      ph:Math.random()*Math.PI*2,
      spd:0.012+Math.random()*0.018,
      vy:0.08+Math.random()*0.18,
    }));

    function drawBg(){
      /* Fond gris-beige brumeux — dégradé radial centré haut */
      const bg=ctx.createRadialGradient(cx,H*0.22,0,cx,H*0.22,H*0.90);
      bg.addColorStop(0.00,'#dddad2'); /* centre clair */
      bg.addColorStop(0.35,'#cbc7bc');
      bg.addColorStop(0.65,'#b8b4aa');
      bg.addColorStop(1.00,'#a8a49a'); /* bords plus sombres */
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      /* Légère brume de bas — sol plus blanc */
      const groundFog=ctx.createLinearGradient(0,H*0.70,0,H);
      groundFog.addColorStop(0,'rgba(210,208,200,0)');
      groundFog.addColorStop(0.6,`rgba(215,212,205,${0.30+Math.sin(t*0.12)*0.05})`);
      groundFog.addColorStop(1,'rgba(220,218,210,0.55)');
      ctx.fillStyle=groundFog; ctx.fillRect(0,H*0.70,W,H*0.30);
    }

    function drawSVG(){
      if(!ramboReady)return;
      /* SVG centré, occupe ~85% de la largeur */
      const imgW=W*0.88;
      const imgH=imgW/RAMBO_RATIO;
      const imgX=cx-imgW/2;
      /* Centré verticalement, légèrement vers le haut */
      const imgY=H*0.50-imgH*0.52;
      ctx.drawImage(ramboImg, imgX, imgY, imgW, imgH);
    }

    function frame(){
      if(stop.v)return;

      drawBg();

      /* ── Dessin interleaved : montagne + brume entre chaque couche ── */
      /* Couches lointaines (0-2) */
      drawMtnLayer(mtnLayers[0]);
      drawMtnLayer(mtnLayers[1]);
      drawFogBands(); /* brumes animées entre toutes les couches */
      drawMtnLayer(mtnLayers[2]);
      drawMtnLayer(mtnLayers[3]);
      drawMtnLayer(mtnLayers[4]);
      drawMtnLayer(mtnLayers[5]);
      drawMtnLayer(mtnLayers[6]);
      drawMtnLayer(mtnLayers[7]);

      /* Nappe basse — brume dense au sol */
      const fog0=ctx.createLinearGradient(0,H*0.930,0,H);
      fog0.addColorStop(0,'rgba(215,212,206,0)');
      fog0.addColorStop(0.4,`rgba(218,215,208,${0.50+Math.sin(t*0.10)*0.06})`);
      fog0.addColorStop(1,`rgba(222,220,213,${0.72+Math.sin(t*0.08)*0.05})`);
      ctx.fillStyle=fog0;ctx.fillRect(0,H*0.930,W,H*0.070);

      drawSVG();

      /* Particules brume */
      for(const m of motes){
        m.ph+=m.spd;
        m.x+=m.vx+Math.sin(m.ph*0.6)*0.06;
        if(m.x<-m.r)m.x=W+m.r; if(m.x>W+m.r)m.x=-m.r;
        const pulse=0.5+0.5*Math.sin(m.ph);
        ctx.fillStyle=`rgba(190,186,178,${m.op*pulse})`;
        ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
      }

      /* Poussière qui tombe doucement */
      for(const d of dust){
        d.ph+=d.spd;
        d.y+=d.vy;
        d.x+=Math.sin(d.ph*0.4)*0.12;
        if(d.y>H){d.y=0;d.x=Math.random()*W;}
        const fade=Math.min(1,Math.min(d.y/(H*0.05),(H-d.y)/(H*0.10)));
        ctx.fillStyle=`rgba(100,95,85,${d.op*Math.max(0,fade)*(0.5+0.5*Math.abs(Math.sin(d.ph)))})`;
        ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
      }

      /* Vignette douce sur les bords */
      const vg=ctx.createRadialGradient(cx,H*0.48,H*0.08,cx,H*0.48,H*0.82);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.55,'rgba(60,55,48,0.04)');
      vg.addColorStop(0.78,'rgba(60,55,48,0.28)');
      vg.addColorStop(1,'rgba(50,45,38,0.75)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain papier — texture affiche sérigraphiée */
      for(let i=0;i<20;i++){
        const gv=120+Math.random()*60|0;
        ctx.fillStyle=`rgba(${gv},${gv-5},${gv-12},${Math.random()*0.016})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.8+0.4,Math.random()*1.8+0.4);
      }

      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
