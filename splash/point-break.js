// CinéQuiz splash chunk — Point Break
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Point Break"]={
   name:'Point Break',
   color:'40,120,200',
   ref:'Point Break \u2014 Kathryn Bigelow, 1991',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _ptbkS=document.getElementById('_ptbk_s');
    if(!_ptbkS){_ptbkS=document.createElement('style');_ptbkS.id='_ptbk_s';document.head.appendChild(_ptbkS);}
    _ptbkS.textContent=`
     
     #splash-bg::before,#splash-bg::after,
     #splash-bg-anim::before,#splash-bg-anim::after{background:none!important;}
     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(220,245,255,0.92)!important;font-size:14px!important;text-shadow:0 1px 12px rgba(0,30,60,0.95)!important;}
     #splash-film-logo{max-width:62%!important;filter:drop-shadow(0 0 10px rgba(0,180,220,0.5))!important;}
    `;
    const _ptbkW=setInterval(()=>{if(stop.v){_ptbkS.textContent='';clearInterval(_ptbkW);}},200);

    /* ══ EMBRUNS — particules d'écume ══ */
    const spray=Array.from({length:80},(_,i)=>({
      x: Math.random()*W,
      y: Math.random()*H,
      r: 0.5+Math.random()*2.5,
      op: 0.08+Math.random()*0.35,
      vx: (Math.random()-0.5)*0.5,
      vy: -(0.2+Math.random()*0.8),
      ph: Math.random()*Math.PI*2,
      spd: 0.012+Math.random()*0.025,
      layer: i<40?'back':'front', /* avant/arrière plan */
    }));

    /* ══ GOUTTES SUR L'OBJECTIF ══ */
    const drops=Array.from({length:12},()=>({
      x: Math.random()*W,
      y: Math.random()*H,
      r: W*(0.005+Math.random()*0.018),
      op: 0.15+Math.random()*0.35,
      life: Math.random(),
      spd: 0.004+Math.random()*0.006,
      streak: Math.random()*H*0.08,
    }));

    /* ══ SURFEUR — silhouette dans le tube ══ */
    /* Petit point sombre dans la lumière au fond du tube */

    /* ══ FILAMENTS D'ÉCUME — lèvre de vague ══ */
    const lipFilaments=Array.from({length:22},(_,i)=>({
     startX: W*(0.58+i*0.020),
     startY: H*(0.14+i*0.012),
     len: H*(0.04+Math.random()*0.08),
     angle: Math.PI*0.55+Math.random()*0.35,
     ph: Math.random()*Math.PI*2,
     spd: 0.025+Math.random()*0.020,
     w: W*(0.003+Math.random()*0.004),
    }));

    /* ══ ONDULATIONS DE SURFACE — texture eau ══ */
    const waterRipples=Array.from({length:18},(_,i)=>({
     angle: i/18*Math.PI*2,
     ph: Math.random()*Math.PI*2,
     spd: 0.018+Math.random()*0.014,
     len: W*(0.06+Math.random()*0.12),
     offset: 0.52+Math.random()*0.18, /* distance du centre en fraction de tubeR */
    }));

    /* ══ RAYONS DU LENS FLARE ══ */
    const flareRays=Array.from({length:8},(_,i)=>({
     angle: i/8*Math.PI*2+0.3,
     len: W*(0.08+Math.random()*0.14),
     w: W*(0.002+Math.random()*0.003),
    }));

    function drawTube(){
      const tubeR = W*0.62;
      const tubeCX = cx*1.05;
      const tubeCY = H*0.50;
      const exitPulse = 0.88+Math.sin(t*0.28)*0.08;
      const exitR = tubeR*0.38*exitPulse;

      /* ── FOND — eau profonde ── */
      ctx.fillStyle='#010810';ctx.fillRect(0,0,W,H);

      /* ── COUCHE 1 : masse d'eau — vert-bleu profond ── */
      const deepG=ctx.createRadialGradient(tubeCX,tubeCY,0,tubeCX,tubeCY,W*0.95);
      deepG.addColorStop(0,'rgba(0,0,0,0)');
      deepG.addColorStop(0.38,'rgba(0,45,60,0.0)');
      deepG.addColorStop(0.52,'rgba(0,65,75,0.50)');
      deepG.addColorStop(0.65,'rgba(0,90,82,0.74)');
      deepG.addColorStop(0.78,'rgba(5,108,88,0.86)');
      deepG.addColorStop(0.88,'rgba(15,128,92,0.93)');
      deepG.addColorStop(1,'rgba(28,140,98,0.97)');
      ctx.fillStyle=deepG;ctx.fillRect(0,0,W,H);

      /* ── COUCHE 2 : lumière solaire qui traverse la paroi ── */
      const lightG=ctx.createRadialGradient(tubeCX,tubeCY,tubeR*0.40,tubeCX,tubeCY,tubeR*0.92);
      lightG.addColorStop(0,'rgba(0,0,0,0)');
      lightG.addColorStop(0.28,`rgba(0,210,185,${0.10+Math.sin(t*0.22)*0.04})`);
      lightG.addColorStop(0.55,`rgba(0,190,165,${0.18+Math.sin(t*0.18)*0.05})`);
      lightG.addColorStop(0.78,`rgba(0,230,195,${0.24+Math.sin(t*0.15)*0.05})`);
      lightG.addColorStop(1,'rgba(40,250,205,0.08)');
      ctx.fillStyle=lightG;ctx.fillRect(0,0,W,H);

      /* ── COUCHE 3 : texture d'eau — bandes de refraction qui tournent ── */
      /* Toutes dans le même sens (sens de rotation de la vague) */
      ctx.save();
      for(let si=0;si<20;si++){
        const sAngle=si/20*Math.PI*2 - t*0.08; /* rotation sens unique */
        const sLen=tubeR*(0.10+Math.sin(si*2.9+t*0.4)*0.07);
        const radFrac=0.50+Math.sin(si*1.8+t*0.12)*0.06;
        const sX1=tubeCX+Math.cos(sAngle)*(tubeR*radFrac);
        const sY1=tubeCY+Math.sin(sAngle)*(tubeR*radFrac);
        const sX2=tubeCX+Math.cos(sAngle)*(tubeR*radFrac+sLen);
        const sY2=tubeCY+Math.sin(sAngle)*(tubeR*radFrac+sLen);
        const sAlpha=(0.06+0.07*Math.abs(Math.sin(si*1.7+t*0.28)))
                     * (sAngle%(Math.PI*2)>Math.PI*0.2 ? 1 : 0.4); /* moins visible côté ombre */
        const sg=ctx.createLinearGradient(sX1,sY1,sX2,sY2);
        sg.addColorStop(0,'rgba(0,0,0,0)');
        sg.addColorStop(0.35,`rgba(90,240,210,${sAlpha})`);
        sg.addColorStop(0.65,`rgba(60,210,185,${sAlpha*0.7})`);
        sg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.strokeStyle=sg;
        ctx.lineWidth=W*(0.005+Math.abs(Math.sin(si*1.1))*0.008);
        ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(sX1,sY1);ctx.lineTo(sX2,sY2);ctx.stroke();
      }
      ctx.restore();

      /* ── COUCHE 4 : ondulations de surface intérieure ── */
      /* Lignes courbes qui ondulent sur la paroi — texture eau réelle */
      ctx.save();
      for(const rip of waterRipples){
        rip.ph+=rip.spd;
        const ang=rip.angle - t*0.06; /* rotation lente */
        const radPos=tubeR*rip.offset;
        const rx=tubeCX+Math.cos(ang)*radPos;
        const ry=tubeCY+Math.sin(ang)*radPos;
        /* Tangente à la paroi */
        const tangX=-Math.sin(ang);
        const tangY= Math.cos(ang);
        const wave=Math.sin(rip.ph)*W*0.008;
        const alpha=0.12+0.08*Math.abs(Math.sin(rip.ph));
        ctx.strokeStyle=`rgba(120,250,220,${alpha})`;
        ctx.lineWidth=W*0.002;ctx.lineCap='round';
        ctx.beginPath();
        ctx.moveTo(rx-tangX*rip.len*0.5+wave, ry-tangY*rip.len*0.5);
        ctx.quadraticCurveTo(
          rx+wave*2, ry+wave,
          rx+tangX*rip.len*0.5+wave, ry+tangY*rip.len*0.5
        );
        ctx.stroke();
      }
      ctx.restore();

      /* ── COUCHE 5 : grande lèvre de vague ── */
      /* La vague domine depuis la droite — plus massive */
      const lipG=ctx.createLinearGradient(W*0.42,0,W,H*0.35);
      lipG.addColorStop(0,`rgba(90,235,210,${0.28+Math.sin(t*0.4)*0.04})`);
      lipG.addColorStop(0.30,`rgba(50,195,170,${0.20+Math.sin(t*0.35)*0.03})`);
      lipG.addColorStop(0.65,'rgba(20,120,110,0.10)');
      lipG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lipG;
      ctx.beginPath();
      ctx.moveTo(W,0);
      ctx.bezierCurveTo(W*0.88,H*0.04, W*0.74,H*0.10, W*0.60,H*0.20);
      ctx.bezierCurveTo(W*0.54,H*0.27, W*0.50,H*0.36, W*0.48,H*0.48);
      ctx.lineTo(W,H*0.48);ctx.lineTo(W,0);
      ctx.closePath();ctx.fill();

      /* Écume principale sur la lèvre — ligne épaisse */
      const foamAlpha=0.55+Math.sin(t*1.6)*0.14;
      ctx.save();
      ctx.strokeStyle=`rgba(230,252,255,${foamAlpha})`;
      ctx.lineWidth=W*0.014;ctx.lineCap='round';
      ctx.shadowColor=`rgba(180,240,255,0.55)`;ctx.shadowBlur=8;
      ctx.beginPath();
      ctx.moveTo(W*0.60,H*0.19);
      ctx.bezierCurveTo(W*0.70,H*0.12, W*0.82,H*0.06, W,H*0.025);
      ctx.stroke();
      /* Ligne secondaire */
      ctx.strokeStyle=`rgba(200,245,255,${foamAlpha*0.50})`;
      ctx.lineWidth=W*0.007;
      ctx.beginPath();
      ctx.moveTo(W*0.62,H*0.23);
      ctx.bezierCurveTo(W*0.72,H*0.16, W*0.85,H*0.10, W,H*0.07);
      ctx.stroke();
      ctx.restore();

      /* ── Filaments d'écume tombant de la lèvre vers l'intérieur du tube ── */
      ctx.save();
      for(const fil of lipFilaments){
        fil.ph+=fil.spd;
        const life=0.5+0.5*Math.sin(fil.ph);
        if(life<0.1)continue;
        const curveX=fil.startX+Math.sin(fil.ph*0.7)*W*0.015;
        const endX=curveX+Math.cos(fil.angle)*fil.len*life;
        const endY=fil.startY+Math.sin(fil.angle)*fil.len*life;
        const fg=ctx.createLinearGradient(fil.startX,fil.startY,endX,endY);
        fg.addColorStop(0,`rgba(220,252,255,${0.55*life})`);
        fg.addColorStop(0.5,`rgba(160,230,245,${0.30*life})`);
        fg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.strokeStyle=fg;
        ctx.lineWidth=fil.w*(0.5+life*0.5);ctx.lineCap='round';
        ctx.beginPath();
        ctx.moveTo(fil.startX,fil.startY);
        ctx.quadraticCurveTo(curveX,fil.startY+fil.len*life*0.55,endX,endY);
        ctx.stroke();
      }
      ctx.restore();

      /* ── COUCHE 6 : paroi intérieure — arcs animés sens de rotation ── */
      ctx.save();
      for(let ri=0;ri<6;ri++){
        const rPhase=t*0.10+ri*0.48; /* même sens de rotation */
        const rAngle=-Math.PI*0.40+t*0.06+ri*0.15; /* décalage progressif */
        const rSpan=Math.PI*(0.48+ri*0.05);
        const rR=tubeR*(0.44+ri*0.018);
        const rAlpha=(0.06+ri*0.018)*(0.65+0.35*Math.sin(rPhase*1.3));
        ctx.strokeStyle=`rgba(${70+ri*20},${195+ri*10},${180+ri*6},${rAlpha})`;
        ctx.lineWidth=W*(0.016-ri*0.002);ctx.lineCap='round';
        ctx.beginPath();
        ctx.arc(tubeCX,tubeCY,rR,rAngle,rAngle+rSpan);
        ctx.stroke();
      }
      ctx.restore();

      /* ── LUMIÈRE AU BOUT DU TUBE — exit lumineux ── */
      /* Halo principal */
      const exitG=ctx.createRadialGradient(tubeCX,tubeCY,0,tubeCX,tubeCY,exitR);
      exitG.addColorStop(0,`rgba(240,255,255,${0.88*exitPulse})`);
      exitG.addColorStop(0.08,`rgba(200,248,255,${0.78*exitPulse})`);
      exitG.addColorStop(0.22,`rgba(120,220,245,${0.52*exitPulse})`);
      exitG.addColorStop(0.45,`rgba(50,170,215,${0.28*exitPulse})`);
      exitG.addColorStop(0.70,`rgba(15,100,170,${0.12*exitPulse})`);
      exitG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=exitG;ctx.fillRect(0,0,W,H);

      /* Halo extérieur élargi — bloom */
      const bloomG=ctx.createRadialGradient(tubeCX,tubeCY,exitR*0.5,tubeCX,tubeCY,exitR*2.2);
      bloomG.addColorStop(0,`rgba(80,200,240,${0.12*exitPulse})`);
      bloomG.addColorStop(0.45,`rgba(30,130,190,${0.06*exitPulse})`);
      bloomG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bloomG;ctx.fillRect(0,0,W,H);

      /* Lens flare — rayons depuis le centre de l'exit ── */
      ctx.save();
      for(const ray of flareRays){
        const rAlpha=(0.18+Math.sin(t*0.35+ray.angle)*0.08)*exitPulse;
        const rg=ctx.createLinearGradient(
          tubeCX,tubeCY,
          tubeCX+Math.cos(ray.angle+t*0.04)*ray.len,
          tubeCY+Math.sin(ray.angle+t*0.04)*ray.len
        );
        rg.addColorStop(0,`rgba(200,248,255,${rAlpha})`);
        rg.addColorStop(0.5,`rgba(140,220,240,${rAlpha*0.5})`);
        rg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.strokeStyle=rg;ctx.lineWidth=ray.w;ctx.lineCap='round';
        ctx.beginPath();
        ctx.moveTo(tubeCX,tubeCY);
        ctx.lineTo(
          tubeCX+Math.cos(ray.angle+t*0.04)*ray.len,
          tubeCY+Math.sin(ray.angle+t*0.04)*ray.len
        );
        ctx.stroke();
      }
      ctx.restore();

      /* ── SURFEUR — plus grand, mieux contrasté ── */
      const sfX=tubeCX-exitR*0.12;
      const sfY=tubeCY+exitR*0.28;
      const sfH=exitR*0.72; /* plus grand */
      /* Halo de contre-jour autour du surfeur */
      const sfRimG=ctx.createRadialGradient(sfX,sfY-sfH*0.5,0,sfX,sfY-sfH*0.5,sfH*0.8);
      sfRimG.addColorStop(0,`rgba(180,240,255,${0.20*exitPulse})`);
      sfRimG.addColorStop(0.5,`rgba(80,180,220,${0.10*exitPulse})`);
      sfRimG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sfRimG;ctx.fillRect(sfX-sfH,sfY-sfH*1.2,sfH*2,sfH*1.4);
      /* Corps */
      ctx.fillStyle=`rgba(5,22,38,0.88)`;
      ctx.beginPath();
      ctx.moveTo(sfX-sfH*0.10,sfY);
      ctx.bezierCurveTo(sfX-sfH*0.14,sfY-sfH*0.38,sfX-sfH*0.07,sfY-sfH*0.68,sfX,sfY-sfH);
      ctx.bezierCurveTo(sfX+sfH*0.07,sfY-sfH*0.68,sfX+sfH*0.14,sfY-sfH*0.38,sfX+sfH*0.10,sfY);
      ctx.closePath();ctx.fill();
      /* Planche */
      ctx.fillStyle=`rgba(4,18,30,0.82)`;
      ctx.beginPath();ctx.ellipse(sfX,sfY+sfH*0.06,sfH*0.42,sfH*0.07,0.08,0,Math.PI*2);ctx.fill();
      /* Bras étendus — posture barrel classique */
      ctx.strokeStyle=`rgba(5,22,38,0.80)`;ctx.lineWidth=sfH*0.07;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(sfX,sfY-sfH*0.58);ctx.lineTo(sfX-sfH*0.48,sfY-sfH*0.42);ctx.stroke();
      ctx.beginPath();ctx.moveTo(sfX,sfY-sfH*0.58);ctx.lineTo(sfX+sfH*0.38,sfY-sfH*0.32);ctx.stroke();
      /* Tête */
      ctx.fillStyle=`rgba(5,22,38,0.90)`;
      ctx.beginPath();ctx.arc(sfX,sfY-sfH*1.06,sfH*0.14,0,Math.PI*2);ctx.fill();
    }

    function drawSpray(){
      for(const s of spray){
        s.ph+=s.spd;
        s.x+=s.vx+Math.sin(s.ph*0.6)*0.15;
        s.y+=s.vy;
        if(s.y<-s.r*2){s.y=H+s.r;s.x=Math.random()*W;}
        const pulse=0.4+0.6*Math.abs(Math.sin(s.ph));
        const alpha=s.op*pulse*(s.layer==='front'?1.0:0.45);
        ctx.fillStyle=`rgba(200,240,255,${alpha})`;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r*(s.layer==='front'?1.0:0.6),0,Math.PI*2);ctx.fill();
      }
    }

    function drawDrops(){
      /* Gouttes sur l'objectif — effet caméra waterproof */
      for(const d of drops){
        d.life+=d.spd;
        if(d.life>1){d.life=0;d.x=Math.random()*W;d.y=Math.random()*H*0.6;}
        const alpha=d.op*Math.sin(d.life*Math.PI);
        /* Goutte */
        const dg=ctx.createRadialGradient(d.x-d.r*0.2,d.y-d.r*0.2,0,d.x,d.y,d.r);
        dg.addColorStop(0,`rgba(220,248,255,${alpha*0.55})`);
        dg.addColorStop(0.5,`rgba(140,210,235,${alpha*0.25})`);
        dg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=dg;
        ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
        /* Traînée */
        if(d.streak>0){
          const sg=ctx.createLinearGradient(d.x,d.y,d.x,d.y+d.streak*d.life);
          sg.addColorStop(0,`rgba(160,220,240,${alpha*0.25})`);
          sg.addColorStop(1,'rgba(0,0,0,0)');
          ctx.strokeStyle=sg;ctx.lineWidth=d.r*0.35;
          ctx.beginPath();ctx.moveTo(d.x,d.y+d.r);ctx.lineTo(d.x,d.y+d.streak*d.life);ctx.stroke();
        }
      }
    }

    function frame(){
      if(stop.v)return;

      drawTube();
      drawSpray();
      drawDrops();

      /* Vignette circulaire — épouse le tube */
      const vg=ctx.createRadialGradient(cx*1.05,H*0.50,W*0.20,cx*1.05,H*0.50,W*0.82);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.55,'rgba(0,8,15,0.08)');
      vg.addColorStop(0.80,'rgba(0,8,15,0.55)');
      vg.addColorStop(1,'rgba(0,5,10,0.97)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

      /* Grain aquatique */
      for(let i=0;i<20;i++){
        const gv=15+Math.random()*25|0;
        ctx.fillStyle=`rgba(${gv},${gv+30},${gv+45},${Math.random()*0.016})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }

      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
