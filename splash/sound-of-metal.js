// CinéQuiz splash chunk — Sound of Metal
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Sound of Metal"]={
   name:'Sound of Metal',
   color:'80,60,40',
   ref:'Sound of Metal \u2014 Darius Marder, 2019',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : noir quasi-total du poster ── */
    let _smStyle=document.getElementById('_sm_splash_style');
    if(!_smStyle){_smStyle=document.createElement('style');_smStyle.id='_sm_splash_style';document.head.appendChild(_smStyle);}
    _smStyle.textContent=`
      

      #splash-content-wrap{top:68%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _smWatch=setInterval(()=>{if(stop.v){_smStyle.textContent='';clearInterval(_smWatch);}},200);

    /* ══ CONCEPT : la forme d'onde du poster ══
       - Phase 1 (0→8s) : waveform dense et chaotique, pleine énergie
       - Phase 2 (8→16s) : la partie gauche commence à s'atténuer
       - Phase 3 (16→24s) : tout s'efface sauf une ligne plate — le silence
       - Phase 4 : la ligne plate persiste, loop
       Durée totale du cycle : ~24s
    */
    const CYCLE = 24.0; /* secondes */
    let elapsed = 0;

    /* ── Nombre de colonnes de la forme d'onde ── */
    const N_BARS = 110;
    const BAR_W = W / N_BARS;

    /* Amplitudes de base — profile inspiré du poster :
       dense à gauche (sons riches), s'efface vers la droite (silence/ligne) */
    const BASE_AMP = Array.from({length:N_BARS},(_,i)=>{
     /* Profil : forte activité sur 60% gauche, décroît vers la droite */
     const pos=i/N_BARS; /* 0=gauche, 1=droite */
     /* Envelope du poster : abrupt cutoff vers 55% */
     const envelope = pos < 0.55
      ? 1.0 - pos * 0.25
      : Math.max(0, (0.65 - pos) * 5.0);
     /* Variation aléatoire fixe par barre */
     const rand = 0.4 + Math.sin(i * 2.718 + i * i * 0.031) * 0.35 + Math.cos(i * 1.414) * 0.25;
     return Math.max(0.01, envelope * rand);
    });

    /* Valeurs actuelles animées */
    const ampCur = new Float32Array(N_BARS).fill(0);
    const ampTarget = new Float32Array(N_BARS);

    /* Phase de pulsation par barre */
    const phase = Float32Array.from({length:N_BARS},(_,i)=>Math.random()*Math.PI*2);

    /* ── Ligne centrale de référence Y ── */
    const waveY = H * 0.42;
    const MAX_H = H * 0.28; /* hauteur max des barres */

    /* ── Particules montantes depuis le bas ── */
    const risingMotes=Array.from({length:70},()=>({
     x: Math.random()*W,
     y: H*(0.70+Math.random()*0.30),
     vy: -(0.20+Math.random()*0.55),
     vx: (Math.random()-0.5)*0.18,
     r: Math.random()*1.6+0.3,
     op: 0.08+Math.random()*0.28,
     ph: Math.random()*Math.PI*2,
     spd: 0.010+Math.random()*0.022,
     /* Certaines pulsent au rythme de la waveform */
     beatSync: Math.random()<0.35,
    }));

    /* ── Timer pour update des targets ── */
    let updateTimer = 0;

    function frame(){
     if(stop.v)return;
     elapsed += 0.016;
     const cyclePos = (elapsed % CYCLE) / CYCLE; /* 0→1 */

     /* Fond noir */
     ctx.fillStyle='#131313';ctx.fillRect(0,0,W,H);

     /* ── Calcul du "silence progressif" : de gauche (garde le son)
        vers droite (silence immédiat), puis le silence gagne vers la gauche ── */
     /* silenceFront : position 0→1 indiquant jusqu'où le silence a gagné
        - Phase 0→0.33 : son vivant, silenceFront=0 (tout actif)
        - Phase 0.33→0.85 : silence gagne de droite vers gauche (0→1)
        - Phase 0.85→1.0 : tout silencieux, ligne plate */
     let silenceFront;
     if(cyclePos < 0.33){
      silenceFront = 0;
     } else if(cyclePos < 0.85){
      silenceFront = (cyclePos - 0.33) / 0.52;
     } else {
      silenceFront = 1.0;
     }

     /* ── Update targets des barres ── */
     updateTimer++;
     if(updateTimer >= 3){
      updateTimer = 0;
      for(let i=0;i<N_BARS;i++){
       phase[i] += 0.04 + Math.random()*0.04;
       /* La barre est-elle dans la zone silencieuse ?
          Le silence part de la droite → left = silence gagne vers la gauche
          silenceFront=0 : rien de silencieux ; silenceFront=1 : tout silencieux */
       const barPos = i / N_BARS; /* 0=gauche, 1=droite */
       /* La zone silencieuse est à droite et progresse vers la gauche */
       const inSilence = barPos > (1 - silenceFront);
       if(inSilence){
        /* Silence : amplitude quasi nulle */
        ampTarget[i] = 0.008 + Math.random()*0.006;
       } else {
        /* Son vivant : amplitude normale avec pulsation */
        const beat = 0.7 + Math.sin(t * 3.2 + i * 0.18) * 0.30;
        ampTarget[i] = BASE_AMP[i] * beat * MAX_H;
       }
      }
     }

     /* Lissage des amplitudes */
     for(let i=0;i<N_BARS;i++){
      const spd = ampCur[i] > ampTarget[i] ? 0.18 : 0.25;
      ampCur[i] += (ampTarget[i] - ampCur[i]) * spd;
     }

     /* ── Dessin de la forme d'onde ── */
     for(let i=0;i<N_BARS;i++){
      const bx = i * BAR_W;
      const bh = Math.max(1, ampCur[i]);
      const barPos = i / N_BARS;
      const inSilence = barPos > (1 - silenceFront);

      /* Couleur : gris clair pour les barres actives,
         très sombre pour les barres silencieuses (comme le poster) */
      let alpha;
      if(inSilence){
       alpha = 0.08 + (1 - silenceFront) * 0.10;
      } else {
       /* Légère variation d'intensité selon position — plus clair au centre */
       alpha = 0.55 + Math.sin(barPos * Math.PI) * 0.30;
      }

      /* Barre symétrique : dessus et dessous de la ligne */
      const barGrad = ctx.createLinearGradient(bx, waveY - bh, bx, waveY + bh);
      const colBase = inSilence ? 80 : 195 + Math.sin(i * 0.12 + t) * 15 | 0;
      barGrad.addColorStop(0, `rgba(${colBase},${colBase},${colBase},0)`);
      barGrad.addColorStop(0.20, `rgba(${colBase},${colBase},${colBase},${alpha * 0.7})`);
      barGrad.addColorStop(0.50, `rgba(${colBase},${colBase},${colBase},${alpha})`);
      barGrad.addColorStop(0.80, `rgba(${colBase},${colBase},${colBase},${alpha * 0.7})`);
      barGrad.addColorStop(1, `rgba(${colBase},${colBase},${colBase},0)`);
      ctx.fillStyle = barGrad;
      const bw2 = Math.max(1, BAR_W - 1.2);
      ctx.fillRect(bx, waveY - bh, bw2, bh * 2);
     }

     /* ── Ligne plate dans la zone silencieuse ── */
     if(silenceFront > 0){
      const silenceStartX = W * (1 - silenceFront);
      /* Ligne centrale fine */
      ctx.strokeStyle = `rgba(200,200,200,${0.35 + silenceFront * 0.25})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(silenceStartX, waveY);
      ctx.lineTo(W, waveY);
      ctx.stroke();
     }

     /* ── Particules montantes depuis le bas ── */
     /* Énergie globale de la waveform — pilote l'intensité des particules */
     const waveEnergy = Math.max(0, 1 - silenceFront);
     for(const m of risingMotes){
      m.ph += m.spd;
      m.y += m.vy;
      m.x += m.vx + Math.sin(m.ph*0.6)*0.12;
      if(m.y < -m.r*2){
       m.y = H*(0.88+Math.random()*0.12);
       m.x = Math.random()*W;
       m.vy = -(0.20+Math.random()*0.55);
       m.op = 0.08+Math.random()*0.28;
      }
      const beatPulse = m.beatSync
       ? (0.45+0.55*Math.abs(Math.sin(t*3.2)))*waveEnergy
       : 0.35+0.65*Math.abs(Math.sin(m.ph));
      const heightFade = m.y < waveY ? Math.max(0,(m.y-(waveY-MAX_H))/(MAX_H)) : 1.0;
      const alpha = m.op * beatPulse * heightFade;
      if(alpha < 0.005) continue;
      const c = Math.round(160+waveEnergy*80);
      ctx.fillStyle=`rgba(${c},${c},${c},${alpha})`;
      ctx.beginPath(); ctx.arc(m.x,m.y,m.r,0,Math.PI*2); ctx.fill();
      if(m.r > 1.0 && alpha > 0.06){
       ctx.strokeStyle=`rgba(${c},${c},${c},${alpha*0.35})`;
       ctx.lineWidth=m.r*0.7; ctx.lineCap='round';
       ctx.beginPath(); ctx.moveTo(m.x,m.y); ctx.lineTo(m.x-m.vx*4, m.y-m.vy*5); ctx.stroke();
      }
     }

     /* ── Grain pellicule ── */
     for(let i=0;i<30;i++){
      const g=10+Math.random()*20|0;
      ctx.fillStyle=`rgba(${g},${g},${g},${Math.random()*0.016})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
