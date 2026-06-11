// CinéQuiz splash chunk — Indiana Jones
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Indiana Jones"]={
   name:'Indiana Jones',
   color:'180,120,40',
   ref:'Indiana Jones \u2014 Steven Spielberg, 1981',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.70';
    let t=0;
    const cx=W/2;

    /* ── Position citation dans le bas ── */
    let _ijS=document.getElementById('_ij_s');
    if(!_ijS){_ijS=document.createElement('style');_ijS.id='_ij_s';document.head.appendChild(_ijS);}
    _ijS.textContent='#splash-content-wrap{top:70%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _ijW=setInterval(()=>{if(stop.v){_ijS.textContent='';clearInterval(_ijW);}},200);

    // ── Poussière / particules sable ──
    const dust=Array.from({length:80},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.9, vy:-(Math.random()*0.5+0.1),
     r:Math.random()*2.5+0.4,
     op:Math.random()*0.22+0.04,
     hue:28+Math.random()*18, life:Math.random()
    }));

    // ── Rocher : démarre petit (loin) et grossit vers l'écran ──
    let boulder={progress:0, spd:0.0018, active:true, pauseTimer:0};
    // progress 0=loin (petit) → 1=proche (grand)

    // ── Fouet : cycle claquement ──
    let whip={phase:0, crackling:false, crackTimer:0};

    // ── Torches ──
    const torches=[
     {x:cx-W*0.28, y:0},
     {x:cx+W*0.28, y:0},
    ];

    // ── Étincelles de torche ──
    const flameParticles=Array.from({length:35},(_,i)=>({
     torch:i%2,
     x:0,y:0,vx:0,vy:0,life:0,hue:25+Math.random()*25
    }));

    function resetFlame(p){
     const tx=torches[p.torch].x;
     const ty=torches[p.torch].y;
     p.x=tx+(Math.random()-0.5)*6;
     p.y=ty;
     p.vx=(Math.random()-0.5)*1.2;
     p.vy=-(Math.random()*2.5+1.0);
     p.life=0.7+Math.random()*0.3;
    }
    flameParticles.forEach(resetFlame);

    // ── Temple Maya ──
    function drawTemple(){
     const base=H*0.88;
     const tw=W*0.72, th=H*0.50;
     const tx=cx-tw/2;
     const steps=6;
     const stepH=th/steps;

     for(let s=0;s<steps;s++){
      const prog=s/steps;
      const sw=tw*(1-prog*0.55);
      const sx=cx-sw/2;
      const sy=base-th+(s*stepH);
      const shade=12+s*6;
      ctx.fillStyle=`rgb(${shade+8},${shade+4},${shade-2})`;
      ctx.fillRect(sx,sy,sw,stepH+1);

      // Ligne de gradin (reflet)
      ctx.strokeStyle=`rgba(${shade*3},${shade*2},${shade},0.25)`;
      ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+sw,sy);ctx.stroke();

      // Motifs gravés sur chaque marche
      if(s>0 && s<steps-1){
       const glyphCount=Math.floor(sw/28);
       for(let g=0;g<glyphCount;g++){
        const gx=sx+g*(sw/glyphCount)+10;
        const gy=sy+stepH*0.5;
        ctx.strokeStyle=`rgba(${shade*2+20},${shade*1.5+10},${shade},0.18)`;
        ctx.lineWidth=0.7;
        ctx.beginPath();ctx.rect(gx-3,gy-4,6,8);ctx.stroke();
        ctx.beginPath();ctx.moveTo(gx-3,gy);ctx.lineTo(gx+3,gy);ctx.stroke();
       }
      }
     }

     // Porte du temple (centre, dernière marche)
     const topSW=tw*0.45;
     const topSX=cx-topSW/2;
     const topSY=base-th;
     // Porte voûtée
     const doorW=topSW*0.28, doorH=stepH*2.4;
     const doorX=cx-doorW/2, doorY=topSY-doorH+stepH;
     ctx.fillStyle='rgba(2,1,4,0.95)';
     ctx.beginPath();
     ctx.moveTo(doorX,doorY+doorH);
     ctx.lineTo(doorX,doorY+doorH*0.4);
     ctx.bezierCurveTo(doorX,doorY,doorX+doorW,doorY,doorX+doorW,doorY+doorH*0.4);
     ctx.lineTo(doorX+doorW,doorY+doorH);
     ctx.closePath();ctx.fill();
     // Encadrement porte
     ctx.strokeStyle='rgba(80,65,30,0.45)';ctx.lineWidth=1.5;ctx.stroke();

     // Lueur intérieure de la porte (idole)
     const doorGlow=ctx.createRadialGradient(cx,doorY+doorH*0.7,2,cx,doorY+doorH*0.7,doorW*1.2);
     doorGlow.addColorStop(0,`rgba(255,185,20,${0.18+Math.sin(t*1.2)*0.06})`);
     doorGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=doorGlow;ctx.fillRect(cx-30,doorY,60,doorH);

     // Idole dorée sur piédestal
     const idX=cx, idY=doorY+doorH*0.55;
     drawIdol(idX,idY);

     // Torches positions
     torches[0].y=topSY+stepH*0.5;
     torches[1].y=topSY+stepH*0.5;

     // Torche gauche
     drawTorch(torches[0].x, torches[0].y);
     drawTorch(torches[1].x, torches[1].y);

     // Sol / jungle
     const groundG=ctx.createLinearGradient(0,base,0,H);
     groundG.addColorStop(0,'rgba(15,22,8,0.95)');
     groundG.addColorStop(1,'rgba(5,10,3,1)');
     ctx.fillStyle=groundG;ctx.fillRect(0,base,W,H-base);

     // Végétation jungle
     drawJungle(base);
    }

    function drawIdol(x,y){
     ctx.save();ctx.translate(x,y);
     const glow=ctx.createRadialGradient(0,0,2,0,0,18);
     glow.addColorStop(0,`rgba(255,200,30,${0.30+Math.sin(t*1.5)*0.08})`);
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow;ctx.fillRect(-20,-22,40,40);
     // Piédestal
     ctx.fillStyle=`rgba(${40+Math.sin(t)*3|0},32,12,0.92)`;
     ctx.fillRect(-7,4,14,8);
     // Corps idole
     ctx.fillStyle=`rgba(${220+Math.sin(t*1.2)*12|0},${160+Math.sin(t)*8|0},25,0.92)`;
     ctx.beginPath();ctx.ellipse(0,-2,5,8,0,0,Math.PI*2);ctx.fill();
     // Tête
     ctx.beginPath();ctx.ellipse(0,-11,4,4.5,0,0,Math.PI*2);ctx.fill();
     // Coiffe
     ctx.beginPath();ctx.moveTo(-4,-14);ctx.lineTo(4,-14);ctx.lineTo(2,-19);ctx.lineTo(-2,-19);ctx.closePath();ctx.fill();
     // Yeux
     ctx.fillStyle='rgba(10,5,0,0.9)';
     ctx.beginPath();ctx.arc(-1.5,-11,1,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(1.5,-11,1,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    function drawTorch(x,y){
     ctx.save();ctx.translate(x,y);
     // Manche
     ctx.strokeStyle='rgba(80,55,20,0.8)';ctx.lineWidth=3;
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,20);ctx.stroke();
     // Coupe
     ctx.fillStyle='rgba(60,40,15,0.9)';
     ctx.beginPath();ctx.moveTo(-5,-2);ctx.lineTo(5,-2);ctx.lineTo(4,4);ctx.lineTo(-4,4);ctx.closePath();ctx.fill();
     // Flamme
     const ff=Math.sin(t*8)*0.3;
     const fg=ctx.createRadialGradient(0,-8,0,0,-4,10);
     fg.addColorStop(0,`rgba(255,230,80,${0.90+ff*0.1})`);
     fg.addColorStop(0.4,`rgba(255,120,10,0.75)`);
     fg.addColorStop(1,'rgba(200,40,0,0)');
     ctx.fillStyle=fg;
     ctx.beginPath();
     ctx.moveTo(-4,0);
     ctx.bezierCurveTo(-5+ff*3,-6,-3,-12,0,-16);
     ctx.bezierCurveTo(3,-12,5-ff*3,-6,4,0);
     ctx.closePath();ctx.fill();
     // Halo torche
     const halo=ctx.createRadialGradient(0,-6,2,0,-6,28);
     halo.addColorStop(0,`rgba(255,160,20,${0.10+ff*0.04})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(-28,-28,56,40);
     ctx.restore();
    }

    function drawJungle(base){
     // Rangée de feuillages
     for(let i=0;i<14;i++){
      const lx=W*(i/13);
      const lh=H*(0.04+Math.sin(i*1.7+t*0.2)*0.015);
      const lg=ctx.createLinearGradient(lx,base-lh,lx,base);
      lg.addColorStop(0,'rgba(15,38,10,0)');
      lg.addColorStop(1,`rgba(${12+i%3*4},${30+i%4*5},${8+i%3*3},0.88)`);
      ctx.fillStyle=lg;
      ctx.beginPath();
      ctx.moveTo(lx-18,base);
      ctx.bezierCurveTo(lx-12,base-lh*0.6,lx,base-lh,lx+2,base-lh*0.9);
      ctx.bezierCurveTo(lx+10,base-lh*0.5,lx+18,base-lh*0.2,lx+20,base);
      ctx.closePath();ctx.fill();
     }
    }

    // ── Fouet claquement ──
    function drawWhip(){
     whip.phase+=0.022;
     const prog=((Math.sin(whip.phase)+1)/2);
     const originX=cx*0.52, originY=H*0.56;

     // Fouet courbe de bezier
     const endX=originX+W*0.40*prog;
     const endY=originY+H*0.06*prog-H*0.08*(1-prog);
     const cpX=originX+W*0.18;
     const cpY=originY-H*0.12;

     ctx.save();
     // Ombre du fouet
     ctx.strokeStyle='rgba(40,20,5,0.3)';ctx.lineWidth=3;
     ctx.beginPath();ctx.moveTo(originX+2,originY+3);
     ctx.quadraticCurveTo(cpX+2,cpY+3,endX+2,endY+3);ctx.stroke();
     // Fouet principal
     const wg=ctx.createLinearGradient(originX,0,endX,0);
     wg.addColorStop(0,'rgba(80,50,15,0.85)');
     wg.addColorStop(1,'rgba(50,30,8,0.55)');
     ctx.strokeStyle=wg;ctx.lineWidth=2.2;
     ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(originX,originY);
     ctx.quadraticCurveTo(cpX,cpY,endX,endY);ctx.stroke();
     // Pointe fine
     ctx.strokeStyle='rgba(60,38,10,0.5)';ctx.lineWidth=0.8;
     ctx.beginPath();ctx.moveTo(endX,endY);
     ctx.lineTo(endX+12*prog,endY+8*prog);ctx.stroke();

     // Éclair du claquement au bout
     if(prog>0.88){
      ctx.globalAlpha=(prog-0.88)/0.12*0.9;
      ctx.fillStyle='rgba(255,230,120,1)';
      ctx.beginPath();ctx.arc(endX,endY,4*(prog-0.88)*8,0,Math.PI*2);ctx.fill();
      // Petits traits rayonnants
      for(let i=0;i<6;i++){
       const a=i*Math.PI/3+t*3;
       const len=8*(prog-0.88)*8;
       ctx.strokeStyle='rgba(255,210,80,0.8)';ctx.lineWidth=1;
       ctx.beginPath();ctx.moveTo(endX,endY);
       ctx.lineTo(endX+Math.cos(a)*len,endY+Math.sin(a)*len);ctx.stroke();
      }
     }
     ctx.restore();
    }

    // ── Rocher qui arrive ──
    // Particules de poussière persistantes
    const boulderDust=Array.from({length:55},()=>({active:false,x:0,y:0,vx:0,vy:0,r:0,op:0,life:0}));
    function spawnDust(bx,by,radius,prog){
     for(let i=0;i<3;i++){
      const p=boulderDust.find(d=>!d.active);if(!p)break;
      p.active=true;
      const side=Math.random()<0.5?-1:1;
      p.x=bx+side*(radius*0.7+Math.random()*radius*0.5);
      p.y=by+radius*(0.6+Math.random()*0.4);
      p.vx=side*(Math.random()*1.8+0.5)*(0.5+prog);
      p.vy=-(Math.random()*1.2+0.3);
      p.r=radius*(0.08+Math.random()*0.14);
      p.op=0.45+Math.random()*0.3;
      p.life=1.0;
     }
    }

    function drawBoulder(){
     if(!boulder.active) return;
     boulder.progress+=boulder.spd;
     if(boulder.progress>=1.0) boulder.progress=0;
     const prog=boulder.progress;
     if(prog<0.06) return;

     // Ease-in quadratique pour accélération réaliste
     const eased=prog*prog*(3-2*prog);
     const radius=W*(0.045+eased*0.50);
     const bx=cx+Math.sin(prog*0.8)*W*0.03;
     const by=H*(0.38+eased*0.44);
     const rot=prog*Math.PI*22;

     // Spawner poussière quand assez grand
     if(prog>0.2 && Math.random()<0.6) spawnDust(bx,by,radius,prog);

     // ── Poussière persistante ──
     for(const p of boulderDust){
      if(!p.active)continue;
      p.x+=p.vx;p.y+=p.vy;p.vy+=0.04;p.r*=1.02;
      p.op*=0.93;p.life-=0.028;
      if(p.life<=0||p.op<0.01){p.active=false;continue;}
      const dg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      dg.addColorStop(0,`rgba(165,138,88,${p.op*p.life})`);
      dg.addColorStop(0.5,`rgba(120,95,55,${p.op*p.life*0.5})`);
      dg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=dg;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     ctx.save();ctx.translate(bx,by);

     // ── Ombre au sol (ellipse aplatie) ──
     ctx.save();
     ctx.globalAlpha=Math.min(0.7,eased*0.85);
     const shadowStretch=2.6-eased*0.8;
     const sg=ctx.createRadialGradient(0,radius*0.82,0,0,radius*0.82,radius*shadowStretch*0.55);
     sg.addColorStop(0,'rgba(0,0,0,0.80)');
     sg.addColorStop(0.4,'rgba(0,0,0,0.30)');
     sg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sg;
     ctx.scale(shadowStretch,0.35);
     ctx.beginPath();ctx.arc(0,radius*0.82,radius,0,Math.PI*2);ctx.fill();
     ctx.restore();

     const alpha=Math.min(1,prog*5);
     ctx.globalAlpha=alpha;

     // ── Corps principal — couleurs pierre réaliste ──
     // Couche base — grès gris-brun
     const rg1=ctx.createRadialGradient(radius*0.08,radius*0.08,radius*0.02,0,0,radius*1.02);
     rg1.addColorStop(0,'rgba(138,122,98,1)');
     rg1.addColorStop(0.25,'rgba(108,95,75,1)');
     rg1.addColorStop(0.55,'rgba(78,68,52,1)');
     rg1.addColorStop(0.80,'rgba(52,45,34,1)');
     rg1.addColorStop(1,'rgba(25,20,14,1)');
     ctx.fillStyle=rg1;
     ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.fill();

     // Couche lumière directionnelle (torche haut-gauche)
     const rg2=ctx.createRadialGradient(-radius*0.38,-radius*0.42,radius*0.02,-radius*0.18,-radius*0.20,radius*0.82);
     rg2.addColorStop(0,'rgba(210,188,145,0.68)');
     rg2.addColorStop(0.30,'rgba(168,148,110,0.32)');
     rg2.addColorStop(0.65,'rgba(100,85,60,0.10)');
     rg2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg2;
     ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.fill();

     // Couche lueur torche orange (côté droit)
     const rg3=ctx.createRadialGradient(radius*0.5,radius*0.1,radius*0.05,radius*0.35,0,radius*0.85);
     rg3.addColorStop(0,`rgba(210,118,22,${0.20+Math.sin(t*4)*0.05})`);
     rg3.addColorStop(0.5,'rgba(165,72,12,0.07)');
     rg3.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg3;
     ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.fill();

     // ── Texture pierre granuleuse — points aléatoires fixes, pas de traits ──
     ctx.save();ctx.rotate(rot);ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.clip();

     // Variations de teinte par grandes zones (grès naturel)
     const patches=[
      {x:-0.28,y:-0.18,r:0.55,dark:true},
      {x: 0.30,y: 0.32,r:0.44,dark:false},
      {x:-0.15,y: 0.50,r:0.40,dark:true},
      {x: 0.48,y:-0.25,r:0.38,dark:false},
     ];
     for(const p of patches){
      const pg=ctx.createRadialGradient(p.x*radius,p.y*radius,0,p.x*radius,p.y*radius,p.r*radius);
      pg.addColorStop(0,p.dark?'rgba(20,13,6,0.20)':'rgba(158,138,102,0.16)');
      pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pg;ctx.fillRect(-radius,-radius,radius*2,radius*2);
     }

     // Grain : petits points ronds dispersés — aucun trait
     const gPts=[
      [-0.52,-0.20,0.055],[ 0.30,-0.46,0.045],[-0.10, 0.54,0.050],
      [ 0.56, 0.16,0.060],[-0.36, 0.32,0.045],[ 0.14,-0.24,0.038],
      [-0.60, 0.06,0.048],[ 0.40,-0.28,0.042],[-0.22,-0.56,0.040],
      [ 0.06, 0.40,0.055],[ 0.62,-0.10,0.038],[-0.44,-0.42,0.044],
      [ 0.26, 0.58,0.048],[-0.16, 0.12,0.032],[ 0.50, 0.42,0.040],
      [-0.08,-0.36,0.036],[ 0.18, 0.28,0.042],[-0.32,-0.06,0.038],
      [ 0.36, 0.08,0.044],[-0.58, 0.38,0.050],
     ];
     for(const [gx,gy,gr] of gPts){
      const light=Math.abs(gx-gy)>0.4;
      ctx.fillStyle=light?'rgba(170,150,112,0.22)':'rgba(18,12,5,0.26)';
      ctx.beginPath();ctx.arc(gx*radius,gy*radius,gr*radius,0,Math.PI*2);ctx.fill();
     }

     ctx.restore(); // fin clip rotation

     // ── Spéculaire net (reflet torche) ──
     const spec=ctx.createRadialGradient(-radius*0.30,-radius*0.34,0,-radius*0.28,-radius*0.32,radius*0.22);
     spec.addColorStop(0,'rgba(230,210,170,0.55)');
     spec.addColorStop(0.5,'rgba(200,175,130,0.18)');
     spec.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=spec;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.fill();

     // ── Contour sombre pour ancrer la boule ──
     ctx.strokeStyle='rgba(8,5,2,0.55)';ctx.lineWidth=radius*0.025;
     ctx.beginPath();ctx.arc(0,0,radius*0.99,0,Math.PI*2);ctx.stroke();

     // ── Onde de choc sol (impact vibration) si rocher grand ──
     if(prog>0.55){
      const shockAlpha=(eased-0.55)*1.8*0.35;
      const shockR=radius*(1.15+Math.sin(t*18)*0.05);
      ctx.globalAlpha=shockAlpha*alpha;
      const shk=ctx.createRadialGradient(0,radius*0.5,radius*0.8,0,radius*0.5,shockR*1.3);
      shk.addColorStop(0,'rgba(160,120,60,0.0)');
      shk.addColorStop(0.6,'rgba(160,120,60,0.35)');
      shk.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shk;ctx.beginPath();ctx.ellipse(0,radius*0.55,shockR,shockR*0.22,0,0,Math.PI*2);ctx.fill();
     }

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(5,3,1,0.15)';ctx.fillRect(0,0,W,H);

     // Ciel jungle (chaud, coucher de soleil voilé)
     const sky=ctx.createLinearGradient(0,0,0,H*0.6);
     sky.addColorStop(0,`rgba(${60+Math.sin(t*0.15)*8|0},35,8,0.12)`);
     sky.addColorStop(0.5,`rgba(${45+Math.sin(t*0.1)*5|0},22,5,0.08)`);
     sky.addColorStop(1,'rgba(20,10,2,0.05)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.6);

     // Brume de chaleur au loin
     const hazeg=ctx.createLinearGradient(0,H*0.55,0,H*0.75);
     hazeg.addColorStop(0,'rgba(0,0,0,0)');
     hazeg.addColorStop(0.5,`rgba(${40+Math.sin(t*0.2)*5|0},25,5,0.06)`);
     hazeg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hazeg;ctx.fillRect(0,H*0.55,W,H*0.2);

     // Poussière ambiante
     for(const s of dust){
      s.x+=s.vx;s.y+=s.vy+Math.sin(t*0.3+s.op*10)*0.2;
      s.life-=0.003;
      if(s.y<0||s.life<=0){
       s.x=Math.random()*W;s.y=H*0.6+Math.random()*H*0.4;
       s.vx=(Math.random()-0.5)*0.9;s.vy=-(Math.random()*0.5+0.1);
       s.life=0.7+Math.random()*0.3;
      }
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${s.hue},55%,62%,${s.op*s.life})`;ctx.fill();
     }

     // Temple
     drawTemple();

     // Particules flammes torches
     for(const p of flameParticles){
      const tx=torches[p.torch].x;
      const ty=torches[p.torch].y;
      if(p.x===0&&p.y===0) resetFlame(p);
      p.x+=p.vx;p.y+=p.vy;p.vy*=0.97;p.life-=0.025;
      if(p.life<=0) resetFlame(p);
      ctx.save();ctx.globalAlpha=p.life*0.85;
      ctx.fillStyle=`hsla(${p.hue},100%,65%,1)`;
      ctx.beginPath();ctx.arc(p.x,p.y,1.5*(p.life+0.1),0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     // Fouet
     drawWhip();

     // Rocher
     drawBoulder();

     // Vignette
     const vg=ctx.createRadialGradient(cx,H*0.55,H*0.08,cx,H*0.5,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(8,4,0,0.75)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
