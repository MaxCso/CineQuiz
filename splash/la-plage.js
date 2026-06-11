// CinéQuiz splash chunk — La plage
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["La plage"]={
   name:'La plage',
   color:'40,200,220',
   ref:'The Beach \u2014 Danny Boyle, 2000',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;

    /* ── CSS overrides ── */
    let _s=document.getElementById('_bp_s');
    if(!_s){_s=document.createElement('style');_s.id='_bp_s';document.head.appendChild(_s);}
    _s.textContent=[
     '',
     '',
     '#splash-film-quote{color:rgba(255,255,255,0.96)!important;text-shadow:0 1px 6px rgba(0,80,120,0.55)!important;}',
    ].join('');
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Zones ── */
    const horizonY = H*0.52;   /* horizon plus haut = plus d'eau visible */
    const shoreY   = H*0.72;
    const sunX     = W*0.78;
    const sunY     = H*0.10;

    /* ── Méduses translucides ── */
    const jellyfish = Array.from({length: 7}, (_, i) => ({
      x: (0.10 + i * 0.14) * W + (Math.random() - 0.5) * W * 0.08,
      y: (0.55 + Math.random() * 0.30) * H, // dans la zone eau
      r: W * (0.022 + Math.random() * 0.018),
      ph: Math.random() * Math.PI * 2,
      spd: 0.008 + Math.random() * 0.010,
      drift: (Math.random() - 0.5) * 0.18, // dérive horizontale lente
      bob: 0.012 + Math.random() * 0.008,  // oscillation verticale
      hue: 170 + Math.random() * 40,        // cyan à turquoise
      tentacles: Array.from({length: 5}, (_, j) => ({
        angle: (j / 5) * Math.PI * 0.9 - Math.PI * 0.45 + (Math.random() - 0.5) * 0.2,
        len: W * (0.018 + Math.random() * 0.014),
        wag: Math.random() * Math.PI * 2,
      })),
    }));

    /* ── Empreintes de pas dans le sable ── */
    const footprints = Array.from({length: 12}, (_, i) => {
      const progress = i / 11; // 0 = loin de l'eau, 1 = bord de mer
      const side = i % 2 === 0 ? -1 : 1; // alternance gauche/droite
      return {
        x: (0.38 + progress * 0.20 + side * 0.045) * W,
        y: (0.80 + (1 - progress) * 0.16) * H, // vers le bas = plus loin de l'eau
        rx: W * 0.014,
        ry: H * 0.007,
        rot: side * 0.18 + progress * 0.05,
        op: 0.18 + progress * 0.22, // plus visibles près de l'eau (sable humide)
        progress,
      };
    });

    /* ── Poissons tropicaux sous la surface ── */
    const fishSchool = Array.from({length: 5}, (_, i) => ({
      x: Math.random() * W,
      y: (0.57 + Math.random() * 0.08) * H,
      vx: (0.4 + Math.random() * 0.3) * (Math.random() < 0.5 ? 1 : -1),
      size: W * (0.012 + Math.random() * 0.008),
      ph: Math.random() * Math.PI * 2,
      col: Math.random() < 0.5 ? '255,140,0' : '255,80,50', // orange ou rouge-orangé
    }));

        const clouds=Array.from({length:6},(_,i)=>({
     x:Math.random()*W,
     y:H*(0.06+i*0.055+Math.random()*0.04),
     w:W*(0.18+Math.random()*0.22),
     h:H*(0.022+Math.random()*0.018),
     spd:0.10+Math.random()*0.12,
     op:0.55+Math.random()*0.30,
    }));

    /* ── Reflets scintillants sur la mer ── */
    const sparkles=Array.from({length:38},()=>({
     x:Math.random()*W,
     y:horizonY+Math.random()*(shoreY-horizonY)*0.88,
     ph:Math.random()*Math.PI*2,
     spd:0.06+Math.random()*0.10,
     r:W*(0.005+Math.random()*0.008),
    }));

    /* ── Vagues — couleurs tropicales de jour ── */
    const WAVE_LAYERS=[
     {y0:horizonY+H*0.000,amp:H*0.005,freq:0.020,spd:0.008,col:[20,160,190],op:0.60,foam:false},
     {y0:horizonY+H*0.018,amp:H*0.007,freq:0.017,spd:0.010,col:[15,175,205],op:0.62,foam:false},
     {y0:horizonY+H*0.040,amp:H*0.009,freq:0.015,spd:0.012,col:[10,188,215],op:0.65,foam:false},
     {y0:horizonY+H*0.066,amp:H*0.011,freq:0.013,spd:0.014,col:[ 5,200,220],op:0.68,foam:false},
     {y0:horizonY+H*0.095,amp:H*0.013,freq:0.011,spd:0.016,col:[ 0,215,225],op:0.72,foam:true},
     {y0:horizonY+H*0.128,amp:H*0.016,freq:0.009,spd:0.018,col:[30,228,230],op:0.76,foam:true},
     {y0:horizonY+H*0.164,amp:H*0.018,freq:0.008,spd:0.020,col:[80,238,238],op:0.80,foam:true},
    ];
    const wavePhases=WAVE_LAYERS.map(()=>Math.random()*Math.PI*2);

    /* ── Grains de sable dorés ── */
    const sandGrains=Array.from({length:300},()=>({
     x:Math.random(),y:Math.random(),
     r:Math.random()*1.8+0.3,
     op:0.12+Math.random()*0.28,
     col:Math.random()<0.5?`${200+Math.random()*30|0},${168+Math.random()*20|0},${90+Math.random()*20|0}`
                          :`${215+Math.random()*20|0},${185+Math.random()*15|0},${110+Math.random()*20|0}`,
    }));

    /* ── Petites coquillages/galets clairs ── */
    const shells=Array.from({length:18},()=>({
     x:Math.random(),y:0.10+Math.random()*0.80,
     rx:W*0.010+Math.random()*W*0.012,
     ry:H*0.004+Math.random()*H*0.004,
     rot:Math.random()*Math.PI,
     op:0.35+Math.random()*0.30,
     col:Math.random()<0.5?'235,220,185':'245,232,210',
    }));

    function drawSky(){
     /* Ciel azur tropical */
     const sky=ctx.createLinearGradient(0,0,0,horizonY);
     sky.addColorStop(0.00,'#0a5fa8');
     sky.addColorStop(0.30,'#1478c0');
     sky.addColorStop(0.65,'#3598d4');
     sky.addColorStop(0.88,'#62bde0');
     sky.addColorStop(1.00,'#8dd8ee');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,horizonY);

     /* Soleil */
     const sunR=W*0.062;
     const sunGlow=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,W*0.42);
     sunGlow.addColorStop(0,`rgba(255,248,200,${0.45+Math.sin(t*0.3)*0.04})`);
     sunGlow.addColorStop(0.15,`rgba(255,230,120,${0.22+Math.sin(t*0.25)*0.03})`);
     sunGlow.addColorStop(0.40,`rgba(255,200,60,${0.08+Math.sin(t*0.2)*0.02})`);
     sunGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunGlow;ctx.fillRect(0,0,W,horizonY);
     /* Disque solaire */
     const sunDisc=ctx.createRadialGradient(sunX-sunR*0.2,sunY-sunR*0.2,0,sunX,sunY,sunR);
     sunDisc.addColorStop(0,'rgba(255,255,220,1.0)');
     sunDisc.addColorStop(0.45,'rgba(255,240,160,0.97)');
     sunDisc.addColorStop(0.80,'rgba(255,220,80,0.88)');
     sunDisc.addColorStop(1,'rgba(255,200,40,0.0)');
     ctx.fillStyle=sunDisc;ctx.beginPath();ctx.arc(sunX,sunY,sunR,0,Math.PI*2);ctx.fill();

     /* Nuages blancs légers */
     for(const c of clouds){
      c.x+=c.spd;if(c.x>W+c.w*0.5)c.x=-c.w*0.5;
      ctx.save();
      ctx.globalAlpha=c.op;
      /* Corps principal */
      const cg=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.w*0.5);
      cg.addColorStop(0,'rgba(255,255,255,0.95)');
      cg.addColorStop(0.6,'rgba(240,248,255,0.65)');
      cg.addColorStop(1,'rgba(200,230,255,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.ellipse(c.x,c.y,c.w*0.5,c.h,0,0,Math.PI*2);ctx.fill();
      /* Bosse de nuage */
      ctx.beginPath();ctx.ellipse(c.x-c.w*0.12,c.y-c.h*0.7,c.w*0.22,c.h*0.8,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(c.x+c.w*0.10,c.y-c.h*0.5,c.w*0.18,c.h*0.65,-0.1,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* Brume douce à l'horizon */
     const hazeG=ctx.createLinearGradient(0,horizonY-H*0.04,0,horizonY+H*0.01);
     hazeG.addColorStop(0,'rgba(255,255,255,0)');
     hazeG.addColorStop(0.6,`rgba(200,238,248,${0.20+Math.sin(t*0.18)*0.03})`);
     hazeG.addColorStop(1,'rgba(160,220,240,0.38)');
     ctx.fillStyle=hazeG;ctx.fillRect(0,horizonY-H*0.04,W,H*0.05);
    }

    function drawSea(){
     /* Mer turquoise transparente — fond dégradé */
     const seaBg=ctx.createLinearGradient(0,horizonY,0,shoreY);
     seaBg.addColorStop(0,'#0a7aaa');
     seaBg.addColorStop(0.25,'#0d96c0');
     seaBg.addColorStop(0.55,'#10b8d4');
     seaBg.addColorStop(0.80,'#18d0e0');
     seaBg.addColorStop(1,'#40dce8');
     ctx.fillStyle=seaBg;ctx.fillRect(0,horizonY,W,shoreY-horizonY);

     /* Reflet solaire scintillant sur l'eau */
     const reflW=W*0.16;
     const reflG=ctx.createLinearGradient(sunX,horizonY,sunX,shoreY);
     reflG.addColorStop(0,`rgba(255,248,200,${0.28+Math.sin(t*1.4)*0.08})`);
     reflG.addColorStop(0.35,`rgba(255,235,150,${0.16+Math.sin(t*1.1)*0.05})`);
     reflG.addColorStop(1,'rgba(255,220,100,0.04)');
     ctx.fillStyle=reflG;
     ctx.beginPath();
     ctx.moveTo(sunX-reflW*0.08,horizonY);ctx.lineTo(sunX+reflW*0.08,horizonY);
     ctx.lineTo(sunX+reflW*0.65,shoreY);ctx.lineTo(sunX-reflW*0.65,shoreY);
     ctx.closePath();ctx.fill();

     /* Scintillements sur l'eau */
     for(const sp of sparkles){
      sp.ph+=sp.spd;
      const bri=Math.max(0,Math.sin(sp.ph));
      if(bri<0.1)continue;
      const sg=ctx.createRadialGradient(sp.x,sp.y,0,sp.x,sp.y,sp.r*4);
      sg.addColorStop(0,`rgba(255,252,210,${0.75*bri})`);
      sg.addColorStop(0.5,`rgba(200,240,255,${0.30*bri})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.fillRect(sp.x-sp.r*4,sp.y-sp.r*4,sp.r*8,sp.r*8);
      /* Point central brillant */
      ctx.fillStyle=`rgba(255,255,240,${0.90*bri})`;
      ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r*bri,0,Math.PI*2);ctx.fill();
     }

     /* Vagues claires */
     for(let wi=0;wi<WAVE_LAYERS.length;wi++){
      const wl=WAVE_LAYERS[wi];
      wavePhases[wi]+=wl.spd;
      const [r,g,b]=wl.col;
      ctx.fillStyle=`rgba(${r},${g},${b},${wl.op})`;
      ctx.beginPath();ctx.moveTo(0,wl.y0);
      for(let x=0;x<=W;x+=6){
       const y=wl.y0+Math.sin(wavePhases[wi]+x*wl.freq)*wl.amp+Math.sin(wavePhases[wi]*0.62+x*wl.freq*1.55)*wl.amp*0.38;
       ctx.lineTo(x,y);
      }
      ctx.lineTo(W,shoreY+H*0.05);ctx.lineTo(0,shoreY+H*0.05);
      ctx.closePath();ctx.fill();
      if(wl.foam){
       /* Écume blanche */
       ctx.strokeStyle='rgba(255,255,255,0.38)';ctx.lineWidth=1.8;
       ctx.beginPath();ctx.moveTo(0,wl.y0);
       for(let x=0;x<=W;x+=6){
        const y=wl.y0+Math.sin(wavePhases[wi]+x*wl.freq)*wl.amp+Math.sin(wavePhases[wi]*0.62+x*wl.freq*1.55)*wl.amp*0.38;
        ctx.lineTo(x,y);
       }
       ctx.stroke();
      }
     }

     /* Zone translucide peu profonde (bord de plage) */
     const shallowG=ctx.createLinearGradient(0,shoreY-H*0.04,0,shoreY);
     shallowG.addColorStop(0,'rgba(100,230,240,0)');
     shallowG.addColorStop(0.5,`rgba(120,240,245,${0.22+Math.sin(t*0.8)*0.05})`);
     shallowG.addColorStop(1,'rgba(160,248,248,0.35)');
     ctx.fillStyle=shallowG;ctx.fillRect(0,shoreY-H*0.04,W,H*0.04);
    }

    function drawShore(){
     const sandH=H-shoreY;

     /* Sable doré chaud */
     const sandG=ctx.createLinearGradient(0,shoreY,0,H);
     sandG.addColorStop(0,'rgba(218,185,105,0.97)');
     sandG.addColorStop(0.15,'rgba(210,175,95,0.98)');
     sandG.addColorStop(0.40,'rgba(198,162,82,0.99)');
     sandG.addColorStop(0.70,'rgba(185,148,68,1.0)');
     sandG.addColorStop(1,'rgba(168,132,55,1.0)');
     ctx.fillStyle=sandG;ctx.fillRect(0,shoreY,W,sandH);

     /* Zone humide au bord de l'eau — sable plus foncé/luisant */
     const wetG=ctx.createLinearGradient(0,shoreY-H*0.008,0,shoreY+H*0.035);
     wetG.addColorStop(0,'rgba(100,210,220,0)');
     wetG.addColorStop(0.35,`rgba(80,195,210,${0.28+Math.sin(t*0.7)*0.06})`);
     wetG.addColorStop(0.70,'rgba(60,170,185,0.12)');
     wetG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=wetG;ctx.fillRect(0,shoreY-H*0.008,W,H*0.043);

     /* Reflet solaire sur le sable mouillé */
     const sandRefl=ctx.createRadialGradient(sunX,shoreY,0,sunX,shoreY,W*0.40);
     sandRefl.addColorStop(0,`rgba(255,248,180,${0.12+Math.sin(t*0.5)*0.04})`);
     sandRefl.addColorStop(0.5,`rgba(255,235,140,${0.06+Math.sin(t*0.4)*0.02})`);
     sandRefl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sandRefl;ctx.fillRect(0,shoreY,W,sandH*0.35);

     /* Grains de sable */
     for(const g of sandGrains){
      ctx.fillStyle=`rgba(${g.col},${g.op})`;
      ctx.beginPath();ctx.arc(g.x*W,shoreY+g.y*sandH,g.r,0,Math.PI*2);ctx.fill();
     }

     /* Coquillages et galets clairs */
     for(const p of shells){
      ctx.save();
      ctx.translate(p.x*W,shoreY+p.y*sandH);
      ctx.rotate(p.rot);
      ctx.fillStyle=`rgba(${p.col},${p.op})`;
      ctx.beginPath();ctx.ellipse(0,0,p.rx,p.ry,0,0,Math.PI*2);ctx.fill();
      /* Petit reflet lustré */
      ctx.fillStyle=`rgba(255,252,235,${p.op*0.55})`;
      ctx.beginPath();ctx.ellipse(-p.rx*0.25,-p.ry*0.30,p.rx*0.30,p.ry*0.28,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* Lignes de vague séchée — traces plus claires sur sable chaud */
     for(let i=0;i<4;i++){
      const ty=shoreY+sandH*(0.10+i*0.18);
      ctx.strokeStyle=`rgba(235,200,120,${0.10+i*0.018})`;
      ctx.lineWidth=0.7;
      ctx.beginPath();
      for(let x=0;x<=W;x+=14){
       const dy=Math.sin(x*0.035+i*1.3)*H*0.003;
       if(x===0)ctx.moveTo(x,ty+dy);else ctx.lineTo(x,ty+dy);
      }
      ctx.stroke();
     }

     /* Traces de feuillage — ombres légères projetées sur le sable */
     for(let i = 0; i < 3; i++){
       const ox = W * (0.05 + i * 0.38);
       const ow = W * (0.18 + i * 0.06);
       const shadowG = ctx.createRadialGradient(ox, shoreY + sandH * 0.1, 0, ox, shoreY + sandH * 0.25, ow);
       shadowG.addColorStop(0, `rgba(100,80,20,${0.07 + Math.sin(t*0.3+i)*0.02})`);
       shadowG.addColorStop(1, 'rgba(0,0,0,0)');
       ctx.fillStyle = shadowG;
       ctx.beginPath(); ctx.ellipse(ox, shoreY + sandH * 0.15, ow, sandH * 0.12, 0, 0, Math.PI*2); ctx.fill();
     }
    }

    function drawJellyfish(){
      for(const jf of jellyfish){
        jf.ph += jf.spd;
        jf.x += jf.drift * 0.35;
        if(jf.x < -jf.r * 3) jf.x = W + jf.r;
        if(jf.x > W + jf.r * 3) jf.x = -jf.r;
        const bobY = jf.y + Math.sin(jf.ph * 1.2) * H * 0.008;
        // Clamp méduse dans la zone eau
        if(bobY < horizonY + jf.r || bobY > shoreY - jf.r * 0.5) continue;

        // Opacité variable — pulsation douce
        const pulse = 0.5 + 0.5 * Math.sin(jf.ph);
        const alpha = 0.18 + pulse * 0.14;
        const r = jf.r;

        // Cloche principale — dôme translucide
        const jg = ctx.createRadialGradient(jf.x, bobY - r*0.2, 0, jf.x, bobY, r);
        jg.addColorStop(0, `hsla(${jf.hue}, 75%, 80%, ${alpha + 0.08})`);
        jg.addColorStop(0.5, `hsla(${jf.hue}, 65%, 70%, ${alpha})`);
        jg.addColorStop(0.85, `hsla(${jf.hue}, 55%, 60%, ${alpha * 0.5})`);
        jg.addColorStop(1, `hsla(${jf.hue}, 50%, 55%, 0)`);
        ctx.fillStyle = jg;
        ctx.beginPath();
        ctx.arc(jf.x, bobY, r, Math.PI, 0); // demi-cercle supérieur
        ctx.quadraticCurveTo(jf.x + r * 0.5, bobY + r * 0.3, jf.x, bobY + r * 0.1);
        ctx.quadraticCurveTo(jf.x - r * 0.5, bobY + r * 0.3, jf.x - r, bobY);
        ctx.closePath(); ctx.fill();

        // Reflet interne — lueur bioluminescente
        const glow = ctx.createRadialGradient(jf.x - r*0.15, bobY - r*0.35, 0, jf.x, bobY - r*0.2, r*0.55);
        glow.addColorStop(0, `hsla(${jf.hue+20}, 90%, 95%, ${0.12 + pulse*0.08})`);
        glow.addColorStop(1, 'hsla(180, 80%, 90%, 0)');
        ctx.fillStyle = glow; ctx.fill();

        // Tentacules ondulantes
        for(const ten of jf.tentacles){
          ten.wag += 0.025;
          const tx0 = jf.x + Math.cos(ten.angle) * r * 0.65;
          const ty0 = bobY + r * 0.08;
          const wagX = Math.sin(ten.wag + ten.angle) * ten.len * 0.35;
          const tx1 = tx0 + wagX * 0.5;
          const ty1 = ty0 + ten.len * 0.5;
          const tx2 = tx0 + wagX;
          const ty2 = ty0 + ten.len;
          ctx.strokeStyle = `hsla(${jf.hue}, 70%, 75%, ${alpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(tx0, ty0);
          ctx.quadraticCurveTo(tx1, ty1, tx2, ty2);
          ctx.stroke();
        }
      }
    }

    function drawFootprints(){
      const sandH = H - shoreY;
      for(const fp of footprints){
        // Opacité pulsée très doucement
        const opPulse = fp.op * (0.85 + 0.15 * Math.sin(t * 0.4 + fp.progress * 2));
        ctx.save();
        ctx.translate(fp.x, fp.y);
        ctx.rotate(fp.rot);
        // Forme ovale de semelle — légèrement creusée dans le sable
        ctx.fillStyle = `rgba(155,122,50,${opPulse})`;
        ctx.beginPath(); ctx.ellipse(0, 0, fp.rx, fp.ry, 0, 0, Math.PI*2); ctx.fill();
        // Ombre portée légère (creux dans le sable)
        ctx.fillStyle = `rgba(110,85,30,${opPulse * 0.55})`;
        ctx.beginPath(); ctx.ellipse(fp.rx*0.1, fp.ry*0.2, fp.rx*0.88, fp.ry*0.75, 0, 0, Math.PI*2); ctx.fill();
        // 5 petits orteils (seulement pour la moitié avant)
        for(let toe = 0; toe < 5; toe++){
          const toeX = -fp.rx*0.55 + toe * fp.rx*0.28;
          const toeY = -fp.ry * 1.2;
          ctx.fillStyle = `rgba(145,115,45,${opPulse * 0.8})`;
          ctx.beginPath(); ctx.arc(toeX, toeY, fp.rx * 0.11, 0, Math.PI*2); ctx.fill();
        }
        ctx.restore();
      }
    }

    function drawFish(){
      for(const fish of fishSchool){
        fish.x += fish.vx;
        fish.ph += 0.04;
        if(fish.x < -fish.size * 4) fish.x = W + fish.size;
        if(fish.x > W + fish.size * 4) fish.x = -fish.size;
        const fy = fish.y + Math.sin(fish.ph) * H * 0.004;
        // Seulement dans la zone eau, sous la surface
        if(fy < horizonY + fish.size || fy > shoreY - fish.size) continue;

        const dir = fish.vx > 0 ? 1 : -1;
        const alpha = 0.28 + 0.12 * Math.sin(fish.ph * 0.5);
        ctx.save();
        ctx.translate(fish.x, fy);
        ctx.scale(dir, 1);

        // Corps elliptique
        ctx.fillStyle = `rgba(${fish.col},${alpha})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, fish.size, fish.size * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();

        // Queue triangulaire
        ctx.beginPath();
        ctx.moveTo(-fish.size * 0.85, 0);
        ctx.lineTo(-fish.size * 1.35, -fish.size * 0.38);
        ctx.lineTo(-fish.size * 1.35, fish.size * 0.38);
        ctx.closePath(); ctx.fill();

        // Ventre clair
        ctx.fillStyle = `rgba(255,220,180,${alpha * 0.55})`;
        ctx.beginPath(); ctx.ellipse(fish.size * 0.05, fish.size * 0.12, fish.size * 0.55, fish.size * 0.22, 0, 0, Math.PI*2); ctx.fill();

        // Œil
        ctx.fillStyle = `rgba(20,15,10,${alpha * 1.2})`;
        ctx.beginPath(); ctx.arc(fish.size * 0.55, -fish.size * 0.08, fish.size * 0.08, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      }
    }

        function frame(){
     if(stop.v)return;

     drawSky();
     drawSea();
     drawJellyfish();
     drawShore();
     drawFootprints();
     drawFish();

     /* Vignette très légère — ambiance lumineuse */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.15,cx,H*0.50,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.02)');
     vg.addColorStop(1,'rgba(0,0,0,0.58)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }

  };
})();
