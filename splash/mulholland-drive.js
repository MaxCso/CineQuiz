// CinéQuiz splash chunk — Mulholland Drive
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Mulholland Drive"]={
   name:'Mulholland Drive',
   color:'160,40,120',
   ref:'Mulholland Drive \u2014 David Lynch, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style : citation + logo sous CinéQuiz ── */
    let _mdS=document.getElementById('_md_s');
    if(!_mdS){_mdS=document.createElement('style');_mdS.id='_md_s';document.head.appendChild(_mdS);}
    _mdS.textContent=`
     

     #splash-content-wrap{top:25%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(255,255,255,0.92)!important;font-size:14px!important;text-shadow:0 1px 12px rgba(0,0,0,0.95)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _mdW=setInterval(()=>{if(stop.v){_mdS.textContent='';clearInterval(_mdW);}},200);

    /* ══ LUMIÈRES DE LA ══ */
    /* Bande de lumières scintillantes au bas — vue depuis Mulholland */
    const cityLights=Array.from({length:110},(_,i)=>({
      x:Math.random()*W,
      y:H*(0.68+Math.random()*0.28),
      r:0.5+Math.random()*2.2,
      op:0.10+Math.random()*0.50,
      ph:Math.random()*Math.PI*2,
      spd:0.008+Math.random()*0.025,
      col:[[255,210,80],[255,160,60],[180,140,255],[100,180,255],[255,80,120]][i%5],
    }));

    /* ══ HALOS LYNCHIENS ══ */
    /* Lueurs colorées mystérieuses — rouge, violet, bleu — qui pulsent lentement */
    const halos=[
      {x:W*0.20,y:H*0.55,r:W*0.35,col:[180,0,30],  op:0.13,ph:0.0,  spd:0.006},
      {x:W*0.80,y:H*0.48,r:W*0.30,col:[100,0,200],  op:0.10,ph:1.80, spd:0.008},
      {x:W*0.50,y:H*0.62,r:W*0.40,col:[0,40,160],   op:0.08,ph:3.20, spd:0.005},
      {x:W*0.35,y:H*0.72,r:W*0.22,col:[220,20,80],  op:0.06,ph:2.10, spd:0.010},
    ];

    /* ══ ROUTE ══ */
    /* La route de Mulholland sinue sur les collines de Santa Monica */
    /* Point de fuite oscillant — donne une impression de virage */
    let roadOffset=0;

    /* ══ PHARES EN APPROCHE ══ */
    /* Deux paires de phares qui arrivent en face — hypnotique Lynch */
    const headlightSets=[
      {phase:0.0,  spd:0.28, xBias:-0.08}, /* voiture 1 */
      {phase:0.55, spd:0.22, xBias: 0.03}, /* voiture 2 — légèrement décalée */
    ];

    /* ══ PARTICULES VIOLETTES ══ */
    /* Quelques poussières lumineuses flottant dans la nuit */
    const motes=Array.from({length:28},()=>({
      x:Math.random()*W,
      y:H*(0.20+Math.random()*0.65),
      r:0.6+Math.random()*1.4,
      op:0.04+Math.random()*0.14,
      ph:Math.random()*Math.PI*2,
      spd:0.008+Math.random()*0.016,
      vx:(Math.random()-0.5)*0.08,
      vy:-(0.05+Math.random()*0.12),
      col:[[200,100,255],[255,80,120],[100,160,255],[255,200,80]][Math.floor(Math.random()*4)],
    }));

    /* ══ ÉTOILES DE LA ══ */
    const stars=Array.from({length:220},()=>({
      x:Math.random()*W, y:Math.random()*H*0.50,
      r:Math.random()*1.2+0.15,
      op:0.15+Math.random()*0.70,
      ph:Math.random()*Math.PI*2,
      spd:0.004+Math.random()*0.012,
      col:[[255,255,255],[220,200,255],[200,220,255],[255,240,200]][Math.floor(Math.random()*4)],
    }));
    /* Quelques étoiles plus brillantes */
    const brightStars=Array.from({length:18},()=>({
      x:Math.random()*W, y:Math.random()*H*0.48,
      r:Math.random()*1.8+0.8,
      op:0.55+Math.random()*0.45,
      ph:Math.random()*Math.PI*2,
      spd:0.006+Math.random()*0.018,
    }));
    /* ══ ÉTOILES FILANTES ══ */
    const shootingStars=Array.from({length:4},(_,i)=>({
      x:Math.random()*W, y:Math.random()*H*0.35,
      vx:W*(0.008+Math.random()*0.010),
      vy:H*(0.003+Math.random()*0.005),
      len:W*(0.08+Math.random()*0.10),
      op:0,
      life:0,
      delay:i*120+Math.random()*200,
      active:false,
    }));

    function drawSky(){
      /* Ciel nuit LA — violet-profond sur toute la hauteur */
      const sky=ctx.createLinearGradient(0,0,0,H);
      sky.addColorStop(0.00,'#06030f'); /* violet très sombre en haut */
      sky.addColorStop(0.18,'#08040e');
      sky.addColorStop(0.38,'#0a0514');
      sky.addColorStop(0.55,'#0d0618');
      sky.addColorStop(0.68,'#120820');
      sky.addColorStop(0.82,'#190b28');
      sky.addColorStop(1.00,'#1e0c30');
      ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

      /* Étoiles principales */
      for(const s of stars){
        s.ph+=s.spd;
        const pulse=0.55+0.45*Math.sin(s.ph);
        ctx.fillStyle=`rgba(${s.col[0]},${s.col[1]},${s.col[2]},${s.op*pulse})`;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
      }

      /* Étoiles brillantes avec halo */
      for(const s of brightStars){
        s.ph+=s.spd;
        const pulse=0.5+0.5*Math.sin(s.ph);
        const hg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3.5);
        hg.addColorStop(0,`rgba(220,200,255,${s.op*pulse*0.7})`);
        hg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=hg;ctx.beginPath();ctx.arc(s.x,s.y,s.r*3.5,0,Math.PI*2);ctx.fill();
        ctx.fillStyle=`rgba(255,255,255,${s.op*pulse})`;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
      }

      /* Étoiles filantes */
      for(const ss of shootingStars){
        if(!ss.active){
          ss.delay--;
          if(ss.delay<=0){
            ss.active=true;ss.life=0;ss.op=0;
            ss.x=Math.random()*W*0.7;ss.y=Math.random()*H*0.30;
          }
          continue;
        }
        ss.life+=0.025;
        ss.op=ss.life<0.15?ss.life/0.15:ss.life>0.75?(1-ss.life)/0.25:1;
        const ex=ss.x+ss.vx*ss.life*40;
        const ey=ss.y+ss.vy*ss.life*40;
        const tx=ex-Math.cos(Math.atan2(ss.vy,ss.vx))*ss.len*ss.life;
        const ty=ey-Math.sin(Math.atan2(ss.vy,ss.vx))*ss.len*ss.life;
        const sg=ctx.createLinearGradient(tx,ty,ex,ey);
        sg.addColorStop(0,'rgba(0,0,0,0)');
        sg.addColorStop(0.6,`rgba(200,180,255,${ss.op*0.5})`);
        sg.addColorStop(1,`rgba(255,255,255,${ss.op})`);
        ctx.strokeStyle=sg;ctx.lineWidth=1.2;
        ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(ex,ey);ctx.stroke();
        /* Petit éclat à la tête */
        ctx.fillStyle=`rgba(255,255,255,${ss.op*0.9})`;
        ctx.beginPath();ctx.arc(ex,ey,1.2,0,Math.PI*2);ctx.fill();
        if(ss.life>=1){
          ss.active=false;ss.delay=Math.random()*300+150;
        }
      }
    }

    function drawHalos(){
      /* Halos remontant plus haut — couvrent tout l'écran */
      const extHalos=[
        {x:W*0.15,y:H*0.18,r:W*0.55,col:[160,0,80],  op:0.10,ph:0.0,  spd:0.005},
        {x:W*0.85,y:H*0.12,r:W*0.50,col:[80,0,180],   op:0.09,ph:1.20, spd:0.007},
        {x:W*0.50,y:H*0.08,r:W*0.60,col:[40,0,140],   op:0.07,ph:2.40, spd:0.004},
        ...halos,
      ];
      for(const h of extHalos){
        h.ph+=h.spd;
        const pulse=0.65+0.35*Math.sin(h.ph);
        const hg=ctx.createRadialGradient(h.x,h.y,0,h.x,h.y,h.r);
        hg.addColorStop(0,`rgba(${h.col[0]},${h.col[1]},${h.col[2]},${h.op*pulse})`);
        hg.addColorStop(0.45,`rgba(${h.col[0]},${h.col[1]},${h.col[2]},${h.op*pulse*0.20})`);
        hg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=hg; ctx.fillRect(0,0,W,H);
      }
    }

    function drawHills(){
      /* Collines de Santa Monica en silhouette — crête sombre entre ciel et ville */
      const hillY=H*0.68;
      ctx.fillStyle='rgba(4,2,10,0.96)';
      ctx.beginPath();ctx.moveTo(-10,H);
      ctx.lineTo(-10,hillY+H*0.02);
      for(let xi=0;xi<=W+10;xi+=W*0.022){
        const hy=hillY - H*(
          0.028*Math.abs(Math.sin(xi*0.018+2.1))
         +0.040*Math.abs(Math.sin(xi*0.010+0.5))
         +0.020*Math.abs(Math.sin(xi*0.032+4.3))
        );
        ctx.lineTo(xi,hy);
      }
      ctx.lineTo(W+10,H);ctx.closePath();ctx.fill();
      /* Liseré doux sur la crête — reflet de la ville */
      const ridgeG=ctx.createLinearGradient(0,hillY-H*0.04,0,hillY+H*0.01);
      ridgeG.addColorStop(0,'rgba(0,0,0,0)');
      ridgeG.addColorStop(0.6,`rgba(60,20,90,${0.12+Math.sin(t*0.06)*0.03})`);
      ridgeG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ridgeG;ctx.fillRect(0,hillY-H*0.04,W,H*0.05);
    }

    function drawCity(){
      /* Glow diffus de la ville juste au-dessus de la bande de lumières */
      const glowG=ctx.createLinearGradient(0,H*0.62,0,H*0.78);
      glowG.addColorStop(0,'rgba(0,0,0,0)');
      glowG.addColorStop(0.5,`rgba(40,20,65,${0.18+Math.sin(t*0.08)*0.04})`);
      glowG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=glowG; ctx.fillRect(0,H*0.62,W,H*0.16);

      /* Points de lumière */
      for(const l of cityLights){
        l.ph+=l.spd;
        const pulse=0.4+0.6*Math.abs(Math.sin(l.ph));
        /* Halo bokeh flou pour les grandes lumières */
        if(l.r>1.5){
          const lg=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*4);
          lg.addColorStop(0,`rgba(${l.col[0]},${l.col[1]},${l.col[2]},${l.op*pulse})`);
          lg.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=lg;
          ctx.beginPath();ctx.arc(l.x,l.y,l.r*4,0,Math.PI*2);ctx.fill();
        }
        ctx.fillStyle=`rgba(${l.col[0]},${l.col[1]},${l.col[2]},${l.op*pulse})`;
        ctx.beginPath();ctx.arc(l.x,l.y,l.r,0,Math.PI*2);ctx.fill();
      }
    }

    function drawRoad(){
      roadOffset=(roadOffset+0.6)%60;
      /* Point de fuite oscillant — sensation de virage en épingle */
      const vpX=cx + Math.sin(t*0.12)*W*0.08;
      const vpY=H*0.48;
      const roadBotL=0;
      const roadBotR=W;

      /* Asphalte */
      const rg=ctx.createLinearGradient(0,vpY,0,H);
      rg.addColorStop(0,'rgba(8,5,15,0.97)');
      rg.addColorStop(0.3,'rgba(12,8,20,0.98)');
      rg.addColorStop(1,'rgba(6,4,12,1.0)');
      ctx.fillStyle=rg;
      ctx.beginPath();
      ctx.moveTo(vpX,vpY);
      ctx.lineTo(roadBotL,H);
      ctx.lineTo(roadBotR,H);
      ctx.closePath(); ctx.fill();

      /* Reflet humide — bande centrale luisante violette */
      const wetG=ctx.createLinearGradient(0,vpY,0,H);
      wetG.addColorStop(0,`rgba(60,20,100,${0.12+Math.sin(t*0.3)*0.04})`);
      wetG.addColorStop(0.5,'rgba(40,15,75,0.06)');
      wetG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wetG;
      ctx.beginPath();
      ctx.moveTo(vpX,vpY);
      ctx.lineTo(vpX-W*0.10,H);
      ctx.lineTo(vpX+W*0.10,H);
      ctx.closePath(); ctx.fill();

      /* Ligne de marquage centrale qui défile */
      const dashCount=10;
      for(let i=0;i<dashCount;i++){
        const f0=((i*10+roadOffset)/60/dashCount*dashCount)%1;
        const f1=Math.min(f0+0.038,1);
        const y0=vpY+(H-vpY)*f0;
        const y1=vpY+(H-vpY)*f1;
        const x0=vpX+(roadBotL-vpX)*f0*0.5+( roadBotR-vpX)*f0*0.0;
        const lw=Math.max(0.8, f0*W*0.009);
        ctx.strokeStyle=`rgba(255,230,150,${0.38+f0*0.35})`;
        ctx.lineWidth=lw;
        ctx.beginPath();ctx.moveTo(vpX+(vpX-cx)*f0*0.1,y0);ctx.lineTo(vpX+(vpX-cx)*f1*0.1,y1);ctx.stroke();
      }

      /* Bords blancs de la route */
      ctx.strokeStyle=`rgba(200,200,220,${0.22+Math.sin(t*0.2)*0.04})`;
      ctx.lineWidth=W*0.005;
      ctx.beginPath();ctx.moveTo(vpX,vpY);ctx.lineTo(roadBotL+W*0.02,H);ctx.stroke();
      ctx.beginPath();ctx.moveTo(vpX,vpY);ctx.lineTo(roadBotR-W*0.02,H);ctx.stroke();
    }

    function drawHeadlights(){
      for(const hs of headlightSets){
        hs.phase=(hs.phase+hs.spd*0.016)%1;
        const prog=hs.phase; /* 0=loin, 1=proche */

        /* Interpolation : la voiture arrive depuis le haut de la route */
        const vpX=cx + Math.sin(t*0.12)*W*0.08;
        const carX=vpX + hs.xBias*W*prog;
        const carY=H*0.48 + (H*0.52)*prog*0.85;
        const hSize=W*(0.006+prog*0.030);
        const hAlpha=Math.min(1,prog*1.5)*(1-Math.max(0,(prog-0.85)*6));

        if(hAlpha<0.02) continue;

        /* Cône de lumière projeté vers nous */
        for(const dx of [-W*0.038*prog, W*0.038*prog]){
          const hx=carX+dx;
          /* Halo extérieur */
          const haloG=ctx.createRadialGradient(hx,carY,0,hx,carY,W*0.28*prog);
          haloG.addColorStop(0,`rgba(255,245,200,${0.35*hAlpha})`);
          haloG.addColorStop(0.25,`rgba(220,200,140,${0.12*hAlpha})`);
          haloG.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=haloG; ctx.fillRect(0,0,W,H);

          /* Faisceau triangulaire vers le bas */
          const beamG=ctx.createLinearGradient(hx,carY,hx,H);
          beamG.addColorStop(0,`rgba(255,240,180,${0.08*hAlpha})`);
          beamG.addColorStop(0.5,`rgba(200,180,120,${0.04*hAlpha})`);
          beamG.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=beamG;
          const bw=W*0.18*prog;
          ctx.beginPath();
          ctx.moveTo(hx-W*0.008*prog,carY);
          ctx.lineTo(hx-bw,H);
          ctx.lineTo(hx+bw,H);
          ctx.lineTo(hx+W*0.008*prog,carY);
          ctx.closePath(); ctx.fill();

          /* Disque lumineux */
          ctx.fillStyle=`rgba(255,252,230,${0.92*hAlpha})`;
          ctx.beginPath();ctx.arc(hx,carY,hSize,0,Math.PI*2);ctx.fill();
        }
      }
    }

    function drawMotes(){
      for(const m of motes){
        m.ph+=m.spd;
        m.x+=m.vx+Math.sin(m.ph*0.5)*0.06;
        m.y+=m.vy;
        if(m.y<H*0.15){m.y=H*0.85;m.x=Math.random()*W;}
        if(m.x<0)m.x=W; if(m.x>W)m.x=0;
        const pulse=0.5+0.5*Math.abs(Math.sin(m.ph));
        ctx.fillStyle=`rgba(${m.col[0]},${m.col[1]},${m.col[2]},${m.op*pulse})`;
        ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
      }
    }

    function frame(){
      if(stop.v)return;

      drawSky();
      drawHalos();
      drawCity();
      drawHills();
      drawRoad();
      drawHeadlights();
      drawMotes();

      /* Vignette profonde — ambiance Lynchienne oppressante */
      const vg=ctx.createRadialGradient(cx,H*0.50,H*0.05,cx,H*0.50,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.42,'rgba(3,1,8,0.08)');
      vg.addColorStop(0.72,'rgba(3,1,8,0.55)');
      vg.addColorStop(1,'rgba(2,0,6,0.97)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain violet Lynch */
      for(let i=0;i<35;i++){
        const gv=15+Math.random()*20|0;
        ctx.fillStyle=`rgba(${gv+20},${gv},${gv+45},${Math.random()*0.020})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
      }

      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
