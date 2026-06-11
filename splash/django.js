// CinéQuiz splash chunk — Django
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Django"]={
   name:'Django',
   color:'200,40,20',
   ref:'Django Unchained \u2014 Quentin Tarantino, 2012',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style UI — citation + logo centrés à 50% ── */
    let _djS=document.getElementById('_dj_s');
    if(!_djS){_djS=document.createElement('style');_djS.id='_dj_s';document.head.appendChild(_djS);}
    _djS.textContent='#splash-content-wrap{top:50%!important;transform:translateY(-50%)!important;transition:opacity 0.65s ease 0.20s!important;}#splash-content-wrap.reveal{opacity:1!important;transform:translateY(-50%)!important;}#splash-film-logo{max-width:160px!important;}#splash-quote-text{color:rgba(255,210,180,0.88)!important;text-shadow:0 1px 8px rgba(0,0,0,0.9)!important;}';
    const _djW=setInterval(()=>{if(stop.v){_djS.textContent='';clearInterval(_djW);}},200);

    /* ── Chargement SVG Chaîne (214×1192) ── */
    let _chainImg=null, _chainReady=false;
    (function(){
      const img=new Image();
      img.onload=()=>{_chainImg=img;_chainReady=true;};
      img.onerror=()=>{_chainReady=false;};
      img.src='images/Chaine.svg';
    })();

    /* ── Chargement SVG Personnages+Sol (874×515) ── */
    let _charImg=null, _charReady=false;
    (function(){
      const img=new Image();
      img.onload=()=>{_charImg=img;_charReady=true;};
      img.onerror=()=>{_charReady=false;};
      img.src='images/Django.svg';
    })();

    /* ════════════════════════════════════════════
       CHAÎNE — descente avec easing + balancement
    ════════════════════════════════════════════ */
    const CHAIN_W_RATIO = 0.24;
    const CHAIN_SVG_RATIO = 1192/214;

    /* Descente : part de -1.10 (bien au-dessus), cible 0.0 */
    let chainY     = -1.10;
    const CHAIN_TARGET = 0.0;
    let chainVY    = 0;           /* vitesse verticale pour easing physique */
    const CHAIN_GRAVITY  = 0.0028; /* accélération vers la cible */
    const CHAIN_DAMPING  = 0.88;   /* amortissement doux */

    /* Balancement : amplitude + rebond post-impact */
    let swingAngle   = 0;
    let swingVel     = 0;
    let chainLanded  = false;      /* flag : la chaîne a-t-elle atterri ? */
    const SWING_GRAVITY  = 0.0018; /* rappel vers 0 */
    const SWING_DAMPING  = 0.972;  /* amortissement très lent = balancement long */
    const SWING_KICK     = 0.18;   /* impulsion au moment de l'impact */

    /* ════════════════════════════════════════════
       PARTICULES — beaucoup plus riches
    ════════════════════════════════════════════ */

    /* 1 — Grosses braises incandescentes */
    const embers = Array.from({length:90},(_,k)=>({
      x: Math.random()*W,
      y: H*(0.55+Math.random()*0.40),
      vx:(Math.random()-0.5)*0.35,
      vy:-(0.08+Math.random()*0.40),
      r: k<30?(2.2+Math.random()*3.5):(0.5+Math.random()*1.4),
      op:k<30?(0.12+Math.random()*0.18):(0.05+Math.random()*0.12),
      ph:Math.random()*Math.PI*2,
      spd:0.012+Math.random()*0.025,
      warm:Math.random(),  /* 0=rouge, 1=jaune */
    }));

    /* 2 — Étincelles vives — petites, rapides */
    const sparks = Array.from({length:65},()=>({
      x: Math.random()*W,
      y: H*(0.60+Math.random()*0.35),
      vx:(Math.random()-0.5)*1.20,
      vy:-(0.40+Math.random()*1.10),
      r: 0.4+Math.random()*1.0,
      op:0.55+Math.random()*0.45,
      life:Math.random(),
      maxLife:0.25+Math.random()*0.55,
    }));

    /* 3 — Fumée volumétrique — grosses taches sombres */
    const smoke = Array.from({length:28},()=>({
      x: Math.random()*W,
      y: H*(0.50+Math.random()*0.40),
      vx:(Math.random()-0.5)*0.18,
      vy:-(0.04+Math.random()*0.10),
      r: W*(0.04+Math.random()*0.09),
      op:0.04+Math.random()*0.07,
      ph:Math.random()*Math.PI*2,
      spd:0.005+Math.random()*0.010,
    }));

    /* 4 — Poussière sol — dérive horizontale */
    const dust = Array.from({length:55},()=>({
      x: Math.random()*W,
      y: H*(0.76+Math.random()*0.20),
      vx:(Math.random()-0.5)*0.38+0.14,
      vy:-(0.015+Math.random()*0.055),
      r: 1.2+Math.random()*3.0,
      op:0.05+Math.random()*0.10,
      ph:Math.random()*Math.PI*2,
      spd:0.008+Math.random()*0.014,
    }));

    /* 5 — Traînées de braise : longues lignes lumineuses */
    const streaks = Array.from({length:22},()=>({
      x: Math.random()*W,
      y: H*(0.55+Math.random()*0.38),
      vx:(Math.random()-0.5)*0.60,
      vy:-(0.22+Math.random()*0.58),
      len:H*(0.015+Math.random()*0.04),
      op:0.20+Math.random()*0.35,
      life:Math.random(),
      maxLife:0.35+Math.random()*0.65,
    }));

    function drawBg(){
      const g=ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0.00,`rgb(${148+Math.sin(t*0.22)*5|0},12,8)`);
      g.addColorStop(0.28,`rgb(${182+Math.sin(t*0.18)*6|0},20,10)`);
      g.addColorStop(0.55,`rgb(${200+Math.sin(t*0.20)*5|0},26,12)`);
      g.addColorStop(0.78,`rgb(${188+Math.sin(t*0.25)*6|0},18,10)`);
      g.addColorStop(1.00,`rgb(${155+Math.sin(t*0.23)*5|0},10,6)`);
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      /* Halo chaud central — plus intense */
      const hg=ctx.createRadialGradient(cx,H*0.42,0,cx,H*0.42,W*0.72);
      hg.addColorStop(0,`rgba(255,80,20,${0.12+Math.sin(t*0.32)*0.04})`);
      hg.addColorStop(0.4,`rgba(200,40,10,${0.06+Math.sin(t*0.28)*0.02})`);
      hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.fillRect(0,0,W,H);
    }

    function drawChain(){
      /* ── Descente avec physique ── */
      if(!chainLanded){
        /* Force vers la cible */
        const dist = CHAIN_TARGET - chainY;
        chainVY += dist * CHAIN_GRAVITY;
        chainVY *= CHAIN_DAMPING;
        chainY  += chainVY;

        /* Impact : déclenchement du balancement */
        if(chainY >= CHAIN_TARGET - 0.005 && !chainLanded){
          chainLanded = true;
          chainY = CHAIN_TARGET;
          chainVY = 0;
          /* Impulsion initiale de balancement */
          swingVel = SWING_KICK * (Math.random()<0.5?1:-1);
        }
      }

      /* ── Balancement pendulaire ── */
      swingVel -= swingAngle * SWING_GRAVITY;  /* rappel vers centre */
      swingVel *= SWING_DAMPING;
      swingAngle += swingVel;
      /* Perturbation subtile continue même après stabilisation */
      swingAngle += Math.sin(t*0.52)*0.0015 + Math.sin(t*0.21)*0.0008;

      const cW = W * CHAIN_W_RATIO;
      const cH = cW * CHAIN_SVG_RATIO;
      const cX = cx - cW/2;
      const cY = H * chainY - cH * 0.08;

      ctx.save();
      /* Pivot haut-centre */
      ctx.translate(cx, H*chainY);
      ctx.rotate(swingAngle);
      ctx.translate(-cx, -H*chainY);

      if(_chainReady && _chainImg){
        ctx.shadowColor='rgba(60,0,0,0.55)';
        ctx.shadowBlur=W*0.022;
        ctx.shadowOffsetX=W*0.005+swingAngle*W*0.08;
        ctx.shadowOffsetY=H*0.005;
        ctx.globalAlpha=0.96;
        ctx.drawImage(_chainImg, cX, cY, cW, cH);
        ctx.shadowColor='transparent';ctx.shadowBlur=0;
      }
      ctx.restore();
    }

    function drawCharacters(){
      if(!_charReady || !_charImg) return;
      const charH = H * 0.35;
      const charW = charH * (874/515);
      const charX = (W - charW) / 2;
      const charY = H - charH * 0.96;
      ctx.save();
      ctx.globalAlpha=0.97;
      ctx.drawImage(_charImg, charX, charY, charW, charH);
      ctx.restore();
    }

    function drawParticles(){
      /* ── 1 : Grosses braises ── */
      for(const e of embers){
        e.x+=e.vx+Math.sin(t*0.45+e.ph)*0.10;
        e.y+=e.vy; e.ph+=e.spd;
        if(e.y<H*0.08||e.x<-6||e.x>W+6){
          e.x=Math.random()*W; e.y=H*(0.60+Math.random()*0.32);
          e.vy=-(0.08+Math.random()*0.40);
          e.vx=(Math.random()-0.5)*0.35;
        }
        const flicker=0.5+0.5*Math.abs(Math.sin(e.ph));
        const r=Math.floor(220+e.warm*30);
        const g2=Math.floor(30+e.warm*80);
        ctx.fillStyle=`rgba(${r},${g2},0,${e.op*flicker})`;
        /* Halo autour des grosses braises */
        if(e.r>2){
          const eg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r*2.8);
          eg.addColorStop(0,`rgba(${r},${g2},0,${e.op*flicker*0.55})`);
          eg.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=eg;ctx.beginPath();ctx.arc(e.x,e.y,e.r*2.8,0,Math.PI*2);ctx.fill();
        }
        ctx.fillStyle=`rgba(${r},${g2+20},${Math.floor(e.warm*40)},${e.op*flicker})`;
        ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);ctx.fill();
      }

      /* ── 2 : Étincelles vives ── */
      for(const s of sparks){
        s.life+=0.018;
        if(s.life>=s.maxLife){
          s.x=cx+(Math.random()-0.5)*W*0.90;
          s.y=H*(0.62+Math.random()*0.30);
          s.vx=(Math.random()-0.5)*1.20;
          s.vy=-(0.40+Math.random()*1.10);
          s.life=0; s.maxLife=0.25+Math.random()*0.55;
        }
        s.x+=s.vx; s.y+=s.vy; s.vy+=0.015;/* gravité légère */
        const ratio=1-s.life/s.maxLife;
        const sc=255-Math.floor(ratio*80);
        ctx.fillStyle=`rgba(${sc},${Math.floor(sc*0.35)},0,${s.op*ratio})`;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r*ratio,0,Math.PI*2);ctx.fill();
      }

      /* ── 3 : Fumée volumétrique ── */
      for(const sm of smoke){
        sm.x+=sm.vx+Math.sin(t*0.28+sm.ph)*0.12;
        sm.y+=sm.vy; sm.ph+=sm.spd; sm.r+=0.12;
        if(sm.r>W*0.16||sm.y<H*0.18){
          sm.x=Math.random()*W; sm.y=H*(0.55+Math.random()*0.35);
          sm.r=W*(0.04+Math.random()*0.07); sm.vy=-(0.04+Math.random()*0.08);
        }
        const fade=0.5+0.5*Math.sin(sm.ph);
        const sg=ctx.createRadialGradient(sm.x,sm.y,0,sm.x,sm.y,sm.r);
        sg.addColorStop(0,`rgba(40,8,4,${sm.op*fade*0.80})`);
        sg.addColorStop(0.5,`rgba(25,5,2,${sm.op*fade*0.40})`);
        sg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sm.x,sm.y,sm.r,0,Math.PI*2);ctx.fill();
      }

      /* ── 4 : Poussière sol ── */
      for(const d of dust){
        d.x+=d.vx; d.y+=d.vy+Math.sin(t*0.4+d.ph)*0.03; d.ph+=d.spd;
        if(d.x>W+6)d.x=-6;
        if(d.y<H*0.68){d.y=H*(0.78+Math.random()*0.18);d.x=Math.random()*W;}
        const op=d.op*(0.5+0.5*Math.abs(Math.sin(d.ph)));
        ctx.fillStyle=`rgba(200,50,20,${op})`;
        ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
      }

      /* ── 5 : Traînées de braise ── */
      for(const sk of streaks){
        sk.life+=0.022;
        if(sk.life>=sk.maxLife){
          sk.x=cx+(Math.random()-0.5)*W*0.80;
          sk.y=H*(0.58+Math.random()*0.34);
          sk.vx=(Math.random()-0.5)*0.60;
          sk.vy=-(0.22+Math.random()*0.58);
          sk.life=0;
        }
        sk.x+=sk.vx; sk.y+=sk.vy;
        const ratio=1-sk.life/sk.maxLife;
        const ex=sk.x-sk.vx*sk.len;
        const ey=sk.y-sk.vy*sk.len;
        const lg=ctx.createLinearGradient(sk.x,sk.y,ex,ey);
        lg.addColorStop(0,`rgba(255,160,10,${sk.op*ratio})`);
        lg.addColorStop(1,'rgba(255,80,0,0)');
        ctx.strokeStyle=lg; ctx.lineWidth=1.2; ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(sk.x,sk.y);ctx.lineTo(ex,ey);ctx.stroke();
      }
    }

    function drawVignette(){
      const vg=ctx.createRadialGradient(cx,H*0.44,H*0.06,cx,H*0.44,H*0.90);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.42,`rgba(0,0,0,${0.06+Math.sin(t*0.26)*0.015})`);
      vg.addColorStop(0.72,'rgba(0,0,0,0.38)');
      vg.addColorStop(1,'rgba(0,0,0,0.90)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
      for(let i=0;i<28;i++){
        const gv=7+Math.random()*11|0;
        ctx.fillStyle=`rgba(${gv+4},${gv},${gv},${Math.random()*0.015})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }
    }

    function frame(){
      if(stop.v){ctx.clearRect(0,0,W,H);cv.style.opacity='0';return;}
      drawBg();
      drawParticles();
      drawChain();
      drawCharacters();
      drawVignette();
      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
