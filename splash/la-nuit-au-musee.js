// CinéQuiz splash chunk — La nuit au musée
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["La nuit au musée"]={
   name:'La nuit au mus\u00e9e',
   color:'200,160,60',
   ref:'Night at the Museum \u2014 Shawn Levy, 2006',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _nmS=document.getElementById('_nm_s');
    if(!_nmS){_nmS=document.createElement('style');_nmS.id='_nm_s';document.head.appendChild(_nmS);}
    _nmS.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;transition:opacity 0.65s ease 0.20s!important;}#splash-content-wrap.reveal{opacity:1!important;transform:translateY(0)!important;}#splash-quote-text{color:rgba(255,255,255,0.96)!important;text-shadow:0 1px 12px rgba(0,0,0,0.98)!important;}#splash-film-logo{max-width:62%!important;}';
    const _nmW=setInterval(()=>{if(stop.v){_nmS.textContent='';clearInterval(_nmW);}},200);

    const floorY=H*0.82;
    const BONE=(a=0.90)=>`rgba(235,215,155,${a})`;
    const BONE_DIM=(a=0.55)=>`rgba(195,170,110,${a})`;

    /* ── Chauves-souris — traversées furtives ── */
    const bats=Array.from({length:3},(_,i)=>({
      x:-W*0.15-i*W*0.35,
      y:H*(0.08+i*0.09),
      spd:W*(0.0025+i*0.0008),
      size:W*(0.018+i*0.006),
      wingPh:Math.random()*Math.PI*2,
      active:i===0,
      timer:i*320+Math.random()*200,
    }));

    /* ── Yeux qui brillent dans l'obscurité (gauche/droite) ── */
    const eyes=[
      {x:W*0.04, y:H*0.60, ph:0.00, spd:0.008, col:'255,120,20'},
      {x:W*0.96, y:H*0.55, ph:Math.PI, spd:0.011, col:'255,80,10'},
    ];

    /* ── Poussière ── */
    const dust=Array.from({length:65},()=>({
      x:Math.random()*W, y:H*(0.10+Math.random()*0.75),
      r:0.5+Math.random()*1.5, op:0.04+Math.random()*0.14,
      vx:(Math.random()-0.5)*0.08, vy:-(0.02+Math.random()*0.07),
      ph:Math.random()*Math.PI*2, spd:0.006+Math.random()*0.012,
    }));

    /* ── Étincelles tombant du plafond ── */
    const sparkles=Array.from({length:22},()=>({
      x:Math.random()*W,
      y:Math.random()*H*0.15,
      vy:0.12+Math.random()*0.28,
      vx:(Math.random()-0.5)*0.10,
      r:0.8+Math.random()*1.6,
      op:0.0,
      maxOp:0.25+Math.random()*0.45,
      ph:Math.random()*Math.PI*2,
      spd:0.020+Math.random()*0.035,
      trail:[],
    }));

    /* ── Orbes de lumière flottants — magie du musée ── */
    const orbs=Array.from({length:5},(_,i)=>({
      x:W*(0.15+i*0.18),
      y:H*(0.35+Math.sin(i*1.2)*0.12),
      r:W*(0.008+Math.random()*0.010),
      ph:Math.random()*Math.PI*2,
      spd:0.008+Math.random()*0.010,
      vx:(Math.random()-0.5)*0.10,
      vy:(Math.random()-0.5)*0.06,
      col:i%2===0?'255,200,80':'200,160,60',
    }));

    /* ── Souffle d'air au sol — particules horizontales ── */
    const groundBreath=Array.from({length:18},()=>({
      x:Math.random()*W,
      y:floorY+H*(0.005+Math.random()*0.015),
      vx:0.15+Math.random()*0.30,
      r:W*(0.004+Math.random()*0.008),
      op:0.0,
      maxOp:0.06+Math.random()*0.10,
      ph:Math.random()*Math.PI*2,
      spd:0.015+Math.random()*0.020,
    }));

    /* ── Torches ── */
    const TORCHES=[{x:W*0.10,y:floorY-H*0.25},{x:W*0.90,y:floorY-H*0.25}];
    const torchParts=TORCHES.map(()=>Array.from({length:14},()=>({
      x:0,y:0,vx:(Math.random()-0.5)*0.7,vy:-(0.5+Math.random()*0.9),
      life:Math.random(),maxLife:0.5+Math.random()*0.5,
      r:W*(0.005+Math.random()*0.007),hot:Math.random()<0.6,
    })));

    /* ── Hiéroglyphes ── */
    const GLYPHS='𓂀𓃭𓅓𓆣𓇯𓈖𓉐𓊪𓋴𓌀𓍯𓎛𓏏𓐍'.split('');
    const glyphs=Array.from({length:10},(_,i)=>({
      x:i<5?W*(0.03+i*0.032):W*(0.74+(i-5)*0.050),
      y:H*(0.48+Math.random()*0.24),
      ch:GLYPHS[i%GLYPHS.length],
      alpha:0, maxAlpha:0.12+Math.random()*0.14,
      ph:Math.random()*Math.PI*2, spd:0.004+Math.random()*0.006,
      life:Math.floor(Math.random()*200), maxLife:150+Math.random()*150,
    }));

    function drawHall(){
      /* Fond pierre chaude */
      const bg=ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,'#050310');
      bg.addColorStop(0.40,'#080610');
      bg.addColorStop(0.70,'#0c0908');
      bg.addColorStop(1,'#090604');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      /* Ambiance chaude générale — comme l'affiche */
      const warmG=ctx.createRadialGradient(cx*0.5,H*0.55,0,cx*0.5,H*0.55,W*0.80);
      warmG.addColorStop(0,`rgba(180,120,40,${0.12+Math.sin(t*0.15)*0.02})`);
      warmG.addColorStop(0.5,'rgba(120,70,20,0.05)');
      warmG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=warmG; ctx.fillRect(0,0,W,H);

      /* Fenêtres en arche — lumière de lune bleutée, en hauteur */
      const arcWins=[{x:cx-W*0.20,w:W*0.14},{x:cx+W*0.06,w:W*0.14}];
      for(const win of arcWins){
        const wCx=win.x+win.w*0.5, wTop=H*0.04, wH=H*0.15;
        /* Lueur bleue fenêtre */
        ctx.fillStyle=`rgba(70,100,170,${0.07+Math.sin(t*0.18)*0.015})`;
        ctx.beginPath();
        ctx.moveTo(win.x,wTop+wH);ctx.lineTo(win.x,wTop+wH*0.4);
        ctx.quadraticCurveTo(wCx,wTop-win.w*0.08,win.x+win.w,wTop+wH*0.4);
        ctx.lineTo(win.x+win.w,wTop+wH);ctx.closePath();ctx.fill();
        /* Rayon de lune */
        const moonG=ctx.createLinearGradient(wCx,wTop,wCx,floorY);
        moonG.addColorStop(0,`rgba(130,160,220,${0.10+Math.sin(t*0.18)*0.025})`);
        moonG.addColorStop(0.5,'rgba(80,110,180,0.04)');
        moonG.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=moonG;
        ctx.beginPath();
        ctx.moveTo(wCx-win.w*0.12,wTop+wH*0.5);
        ctx.lineTo(wCx-win.w*0.60,floorY);
        ctx.lineTo(wCx+win.w*0.60,floorY);
        ctx.lineTo(wCx+win.w*0.12,wTop+wH*0.5);
        ctx.closePath();ctx.fill();
        /* Cadre */
        ctx.strokeStyle='rgba(80,58,28,0.45)';ctx.lineWidth=W*0.008;
        ctx.beginPath();ctx.moveTo(win.x,wTop+wH);ctx.lineTo(win.x,wTop+wH*0.4);
        ctx.quadraticCurveTo(wCx,wTop-win.w*0.08,win.x+win.w,wTop+wH*0.4);
        ctx.lineTo(win.x+win.w,wTop+wH);ctx.stroke();
      }

      /* Colonnes — 4, style néo-classique avec or comme l'affiche */
      const colPositions=[W*0.05,W*0.20,W*0.80,W*0.95];
      for(const colX of colPositions){
        const colW=W*0.048;
        /* Fût de la colonne */
        const cG=ctx.createLinearGradient(colX-colW,0,colX+colW,0);
        cG.addColorStop(0,'rgba(28,20,8,0)');
        cG.addColorStop(0.25,'rgba(70,52,22,0.55)');
        cG.addColorStop(0.5,'rgba(95,72,30,0.72)');
        cG.addColorStop(0.75,'rgba(70,52,22,0.55)');
        cG.addColorStop(1,'rgba(28,20,8,0)');
        ctx.fillStyle=cG;ctx.fillRect(colX-colW,0,colW*2,floorY);
        /* Reflet doré sur le fût */
        const shineG=ctx.createLinearGradient(colX-colW*0.4,0,colX+colW*0.1,0);
        shineG.addColorStop(0,'rgba(0,0,0,0)');
        shineG.addColorStop(0.5,`rgba(180,140,60,${0.08+Math.sin(t*0.2)*0.02})`);
        shineG.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=shineG;ctx.fillRect(colX-colW,H*0.12,colW*2,floorY-H*0.12);
        /* Chapiteau doré */
        ctx.fillStyle=`rgba(140,105,38,0.75)`;
        ctx.fillRect(colX-colW*1.25,floorY-H*0.015,colW*2.5,H*0.015);
        ctx.fillStyle=`rgba(165,128,48,0.65)`;
        ctx.fillRect(colX-colW*1.40,floorY-H*0.026,colW*2.8,H*0.012);
        /* Stries */
        ctx.strokeStyle='rgba(60,42,14,0.28)';ctx.lineWidth=0.8;
        for(let ci=0;ci<4;ci++){
          const lx=colX-colW*0.8+ci*colW*0.5;
          ctx.beginPath();ctx.moveTo(lx,H*0.12);ctx.lineTo(lx,floorY-H*0.026);ctx.stroke();
        }
      }

      /* Sol marbre — chaud/doré */
      const floorG=ctx.createLinearGradient(0,floorY,0,H);
      floorG.addColorStop(0,'rgba(62,46,22,0.92)');
      floorG.addColorStop(0.5,'rgba(48,34,14,0.96)');
      floorG.addColorStop(1,'rgba(30,20,6,1.0)');
      ctx.fillStyle=floorG;ctx.fillRect(0,floorY,W,H-floorY);
      /* Lignes de perspective sol */
      ctx.strokeStyle='rgba(75,55,20,0.20)';ctx.lineWidth=0.8;
      for(let li=-4;li<=4;li++){
        ctx.beginPath();ctx.moveTo(cx+li*W*0.12,floorY);ctx.lineTo(cx+li*W*0.65,H);ctx.stroke();
      }
      for(let li=0;li<4;li++){
        const ly=floorY+li*(H-floorY)/4;
        ctx.beginPath();ctx.moveTo(0,ly);ctx.lineTo(W,ly);ctx.stroke();
      }
      /* Reflet torche sur le sol */
      const flRefG=ctx.createRadialGradient(W*0.15,H,0,W*0.15,H,W*0.55);
      flRefG.addColorStop(0,`rgba(200,140,40,${0.10+Math.sin(t*0.25)*0.02})`);
      flRefG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=flRefG;ctx.fillRect(0,floorY,W,H-floorY);
    }

    function drawTorches(){
      for(let ti=0;ti<TORCHES.length;ti++){
        const tr=TORCHES[ti];const parts=torchParts[ti];
        const pulse=0.80+Math.sin(t*3.8+ti*1.5)*0.14+Math.sin(t*7.3+ti)*0.06;
        const hG=ctx.createRadialGradient(tr.x,tr.y,0,tr.x,tr.y,W*0.35);
        hG.addColorStop(0,`rgba(255,165,45,${0.35*pulse})`);
        hG.addColorStop(0.3,`rgba(200,100,20,${0.15*pulse})`);
        hG.addColorStop(0.6,'rgba(100,45,5,0.04)');
        hG.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=hG;ctx.fillRect(0,0,W,H);
        /* Support */
        ctx.fillStyle='rgba(70,50,22,0.92)';
        ctx.fillRect(tr.x-W*0.010,tr.y,W*0.020,H*0.055);
        ctx.fillRect(tr.x-W*0.022,tr.y+H*0.045,W*0.044,H*0.014);
        /* Feu */
        for(const p of parts){
          p.life-=0.022+Math.random()*0.018;p.x+=p.vx;p.y+=p.vy;p.vy-=0.018;
          if(p.life<=0){
            p.x=tr.x+(Math.random()-0.5)*W*0.016;p.y=tr.y;
            p.vx=(Math.random()-0.5)*0.7;p.vy=-(0.5+Math.random()*0.9);
            p.life=p.maxLife=0.5+Math.random()*0.5;p.hot=Math.random()<0.55;
          }
          const ef=Math.max(0,p.life/p.maxLife);
          ctx.fillStyle=p.hot?`rgba(255,${175+ef*55|0},25,${ef*0.88})`:`rgba(255,${75+ef*85|0},8,${ef*0.72})`;
          ctx.beginPath();ctx.arc(p.x,p.y,p.r*ef,0,Math.PI*2);ctx.fill();
        }
      }
    }

    /* ══ T-REX SVG — Dino.svg ══ */
    let _dinoImg=null, _dinoReady=false;
    (function(){
      const img=new Image();
      img.onload=()=>{_dinoImg=img;_dinoReady=true;};
      img.onerror=()=>{_dinoReady=false;};
      img.src='images/Dino.svg';
    })();

    function drawTRex(){
      /* Ombre au sol */
      ctx.fillStyle='rgba(30,15,4,0.40)';
      ctx.beginPath();ctx.ellipse(W*0.42,floorY,W*0.38,H*0.018,0,0,Math.PI*2);ctx.fill();

      if(_dinoReady&&_dinoImg){
        /* SVG 1480×960 — on l'affiche en respectant le ratio
           On le place côté gauche-centre, pied à floorY */
        const dinoW=W*0.92;
        const dinoH=dinoW*(960/1480);
        const dinoX=cx-dinoW*0.42;
        const dinoY=floorY-dinoH*0.92;
        /* Légère oscillation de tête */
        const sway=Math.sin(t*0.55)*H*0.004;
        ctx.save();
        ctx.globalAlpha=0.92;
        ctx.translate(dinoX+dinoW/2, dinoY+dinoH/2+sway);
        ctx.drawImage(_dinoImg,-dinoW/2,-dinoH/2,dinoW,dinoH);
        ctx.restore();
      }
    }

    function drawBats(){
      for(const b of bats){
        if(!b.active){b.timer--;if(b.timer<=0){b.active=true;b.x=-W*0.12;b.y=H*(0.05+Math.random()*0.20);}continue;}
        b.x+=b.spd;b.wingPh+=0.22;
        /* Ailes — deux arcs animés */
        const wx=b.x, wy=b.y;
        const flap=Math.sin(b.wingPh)*b.size*1.6;
        ctx.save();ctx.globalAlpha=0.55;ctx.fillStyle='rgba(12,6,2,0.80)';
        /* Corps */
        ctx.beginPath();ctx.ellipse(wx,wy,b.size*0.55,b.size*0.35,0,0,Math.PI*2);ctx.fill();
        /* Aile gauche */
        ctx.beginPath();ctx.moveTo(wx,wy);
        ctx.quadraticCurveTo(wx-b.size*1.8,wy+flap,wx-b.size*2.2,wy+b.size*0.5);
        ctx.quadraticCurveTo(wx-b.size*1.2,wy+b.size*0.2,wx,wy);ctx.fill();
        /* Aile droite */
        ctx.beginPath();ctx.moveTo(wx,wy);
        ctx.quadraticCurveTo(wx+b.size*1.8,wy+flap,wx+b.size*2.2,wy+b.size*0.5);
        ctx.quadraticCurveTo(wx+b.size*1.2,wy+b.size*0.2,wx,wy);ctx.fill();
        ctx.restore();
        if(b.x>W*1.12){b.active=false;b.timer=280+Math.random()*400;}
      }
    }

    function drawEyes(){
      for(const e of eyes){
        e.ph+=e.spd;
        /* Clignote lentement — visible seulement par intermittence */
        const blink=Math.pow(Math.max(0,Math.sin(e.ph)),8);
        if(blink<0.02) continue;
        const glow=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,W*0.025);
        glow.addColorStop(0,`rgba(${e.col},${blink*0.90})`);
        glow.addColorStop(0.4,`rgba(${e.col},${blink*0.25})`);
        glow.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=glow;ctx.beginPath();ctx.arc(e.x,e.y,W*0.025,0,Math.PI*2);ctx.fill();
        /* Pupille */
        ctx.fillStyle=`rgba(255,255,200,${blink*0.95})`;
        ctx.beginPath();ctx.arc(e.x,e.y,W*0.004,0,Math.PI*2);ctx.fill();
      }
    }

    function drawGlyphs(){
      ctx.font=`bold ${W*0.032|0}px serif`;
      ctx.textAlign='center';
      for(const g of glyphs){
        g.life--;
        if(g.life<=0){
          g.life=g.maxLife=150+Math.random()*150;
          g.ch=GLYPHS[Math.random()*GLYPHS.length|0];
          g.maxAlpha=0.12+Math.random()*0.14;
        }
        g.ph+=g.spd;
        const progress=g.life/g.maxLife;
        const fade=progress<0.15?progress/0.15:progress>0.85?((1-progress)/0.15):1;
        g.alpha=g.maxAlpha*fade*(0.7+Math.sin(g.ph)*0.3);
        ctx.fillStyle=`rgba(235,215,155,${g.alpha})`;
        ctx.fillText(g.ch,g.x,g.y);
      }
      ctx.textAlign='left';
    }

    function drawDust(){
      for(const d of dust){
        d.x+=d.vx;d.y+=d.vy;d.ph+=d.spd;
        if(d.y<H*0.05){d.y=H*(0.70+Math.random()*0.15);d.x=Math.random()*W;}
        if(d.x<0)d.x=W;if(d.x>W)d.x=0;
        const op=d.op*(0.5+0.5*Math.abs(Math.sin(d.ph)));
        const dg=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r);
        dg.addColorStop(0,`rgba(235,215,155,${op})`);
        dg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=dg;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
      }
    }

    function drawSparkles(){
      for(const s of sparkles){
        s.ph+=s.spd;
        s.y+=s.vy; s.x+=s.vx;
        s.op=s.maxOp*(0.4+0.6*Math.abs(Math.sin(s.ph)));
        s.trail.push({x:s.x,y:s.y});
        if(s.trail.length>5)s.trail.shift();
        /* Traîne dorée */
        for(let ti=0;ti<s.trail.length-1;ti++){
          const tf=ti/(s.trail.length-1);
          ctx.strokeStyle=`rgba(255,210,80,${s.op*tf*0.5})`;
          ctx.lineWidth=s.r*0.6;ctx.lineCap='round';
          ctx.beginPath();ctx.moveTo(s.trail[ti].x,s.trail[ti].y);ctx.lineTo(s.trail[ti+1].x,s.trail[ti+1].y);ctx.stroke();
        }
        /* Étincelle */
        ctx.fillStyle=`rgba(255,230,120,${s.op})`;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
        /* Respawn en haut quand trop bas */
        if(s.y>H*0.55){
          s.y=Math.random()*H*0.05;
          s.x=Math.random()*W;
          s.trail.length=0;
        }
      }
    }

    function drawOrbs(){
      for(const o of orbs){
        o.ph+=o.spd;
        o.x+=o.vx; o.y+=o.vy+Math.sin(o.ph)*0.06;
        if(o.x<W*0.05)o.vx=Math.abs(o.vx);
        if(o.x>W*0.95)o.vx=-Math.abs(o.vx);
        if(o.y<H*0.20)o.vy=Math.abs(o.vy);
        if(o.y>H*0.75)o.vy=-Math.abs(o.vy);
        const pulse=0.5+0.5*Math.abs(Math.sin(o.ph));
        const og=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r*4);
        og.addColorStop(0,`rgba(${o.col},${pulse*0.55})`);
        og.addColorStop(0.4,`rgba(${o.col},${pulse*0.18})`);
        og.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=og;ctx.beginPath();ctx.arc(o.x,o.y,o.r*4,0,Math.PI*2);ctx.fill();
        ctx.fillStyle=`rgba(255,245,200,${pulse*0.80})`;
        ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fill();
      }
    }

    function drawGroundBreath(){
      for(const g of groundBreath){
        g.ph+=g.spd;
        g.x+=g.vx;
        g.op=g.maxOp*(0.3+0.7*Math.abs(Math.sin(g.ph)));
        if(g.x>W+g.r*2){g.x=-g.r;g.y=floorY+H*(0.005+Math.random()*0.015);}
        ctx.fillStyle=`rgba(200,160,60,${g.op})`;
        ctx.beginPath();ctx.arc(g.x,g.y,g.r,0,Math.PI*2);ctx.fill();
      }
    }

    function frame(){
      if(stop.v)return;
      drawHall();
      drawTorches();
      drawTRex();
      drawBats();
      drawEyes();
      drawGlyphs();
      drawDust();
      drawSparkles();
      drawOrbs();
      drawGroundBreath();

      const vg=ctx.createRadialGradient(cx,H*0.48,H*0.08,cx,H*0.48,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.50,'rgba(4,2,0,0.05)');
      vg.addColorStop(0.75,'rgba(4,2,0,0.48)');
      vg.addColorStop(1,'rgba(3,1,0,0.96)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

      for(let i=0;i<20;i++){
        const gv=18+Math.random()*22|0;
        ctx.fillStyle=`rgba(${gv+22},${gv+8},${gv},${Math.random()*0.016})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }
      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
