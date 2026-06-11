// CinéQuiz splash chunk — Edward aux mains d'argent
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Edward aux mains d'argent"]={
   name:"Edward aux mains d'argent",
   color:'120,160,200',
   ref:"Edward Scissorhands \u2014 Tim Burton, 1990",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ed_s');
    if(!_s){_s=document.createElement('style');_s.id='_ed_s';document.head.appendChild(_s);}
    _s.textContent=`#splash-content-wrap{top:25%!important;bottom:auto!important;transform:none!important;}#splash-content-wrap.reveal{transform:none!important;}#splash-quote-text{color:rgba(255,240,235,.92)!important;text-shadow:0 2px 16px rgba(0,0,0,.45)!important;}#splash-film-logo{display:block!important;filter:drop-shadow(0 2px 12px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(180,150,220,0.35))!important;}"`;
    function _edCleanup(){
     _s.textContent='';
     ['_ed_fig','_ed_vig','_ed_fig_s'].forEach(id=>{const el=document.getElementById(id);if(el&&el.parentNode)el.parentNode.removeChild(el);});
    }
    const _w=setInterval(()=>{if(stop.v){_edCleanup();clearInterval(_w);}},200);

    /* ── Image de fond Edward.png ── */
    const bgImg=new Image();
    bgImg.src='images/Edward.png';
    let bgLoaded=false;
    bgImg.onload=()=>{bgLoaded=true;};

    /* Flocons légers */
    const flakes=Array.from({length:40},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vy:0.12+Math.random()*0.20,vx:(Math.random()-0.5)*0.10,
     r:Math.random()*1.6+0.3,op:0.18+Math.random()*0.32,
     wb:Math.random()*Math.PI*2,wSpd:0.006+Math.random()*0.008,
    }));

    /* ── Feuilles qui tombent ── */
    const leaves=Array.from({length:18},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vy:0.28+Math.random()*0.38,vx:(Math.random()-0.5)*0.55,
     rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-0.5)*0.040,
     size:W*(0.008+Math.random()*0.010),
     op:0.55+Math.random()*0.30,
     swing:Math.random()*Math.PI*2,swingSpd:0.018+Math.random()*0.012,
     hue:Math.floor(100+Math.random()*50), /* vert sombre */
    }));

    /* ── Particules dorées scintillantes ── */
    const sparks=Array.from({length:30},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18,vy:-(0.05+Math.random()*0.12),
     r:Math.random()*1.4+0.3,
     op:Math.random()*0.50+0.10,
     ph:Math.random()*Math.PI*2,phSpd:0.025+Math.random()*0.030,
    }));

    /* ── Oiseaux silhouettes ── */
    const birds=Array.from({length:6},()=>({
     x:Math.random()<0.5?-W*0.05:W*1.05,
     y:H*(0.10+Math.random()*0.35),
     vx:(Math.random()<0.5?0.45:-0.45)*(0.8+Math.random()*0.6),
     flapPh:Math.random()*Math.PI*2,
     flapSpd:0.10+Math.random()*0.08,
     size:W*(0.016+Math.random()*0.010),
     op:0.50+Math.random()*0.35,
    }));

    /* ── Brume légère montant du bas ── */
    const mists=Array.from({length:8},()=>({
     x:Math.random()*W,y:H*(0.78+Math.random()*0.22),
     r:W*(0.12+Math.random()*0.16),
     vy:-(0.06+Math.random()*0.08),
     op:0.04+Math.random()*0.06,
     ph:Math.random()*Math.PI*2,
    }));

    function drawLeaf(lx,ly,rot,size,op,hue){
     ctx.save();ctx.translate(lx,ly);ctx.rotate(rot);
     ctx.globalAlpha=op;
     ctx.fillStyle=`hsl(${hue},60%,28%)`;
     ctx.beginPath();
     ctx.moveTo(0,-size*1.2);
     ctx.bezierCurveTo(size*0.8,-size*0.6,size*0.8,size*0.6,0,size*0.8);
     ctx.bezierCurveTo(-size*0.8,size*0.6,-size*0.8,-size*0.6,0,-size*1.2);
     ctx.fill();
     /* nervure centrale */
     ctx.strokeStyle=`rgba(0,0,0,0.25)`;ctx.lineWidth=size*0.12;
     ctx.beginPath();ctx.moveTo(0,-size*1.0);ctx.lineTo(0,size*0.65);ctx.stroke();
     ctx.globalAlpha=1;ctx.restore();
    }

    function drawBird(bx,by,flapPh,size,op,dir){
     ctx.save();ctx.translate(bx,by);if(dir<0)ctx.scale(-1,1);
     ctx.globalAlpha=op;
     const flap=Math.sin(flapPh)*size*0.55;
     ctx.fillStyle='rgba(20,10,30,0.85)';
     ctx.beginPath();
     /* aile gauche */
     ctx.moveTo(0,0);ctx.quadraticCurveTo(-size*1.1,-flap,-size*2.0,flap*0.3);
     ctx.quadraticCurveTo(-size*1.0,size*0.2,0,0);
     /* aile droite */
     ctx.moveTo(0,0);ctx.quadraticCurveTo(size*1.1,-flap,size*2.0,flap*0.3);
     ctx.quadraticCurveTo(size*1.0,size*0.2,0,0);
     ctx.fill();
     ctx.globalAlpha=1;ctx.restore();
    }

    /* Nuages cotonneux — inspirés affiche (gardés pour overlay subtil) */
    const clouds=[
     {x:cx*0.30,y:H*0.28,rx:W*0.22,ry:H*0.060,op:0.45},
     {x:cx*0.55,y:H*0.22,rx:W*0.16,ry:H*0.044,op:0.38},
     {x:W*0.82,y:H*0.32,rx:W*0.18,ry:H*0.052,op:0.42},
     {x:W*0.88,y:H*0.26,rx:W*0.12,ry:H*0.036,op:0.32},
    ];

    function drawCloud(cx2,cy,rx,ry,op){
     const cg=ctx.createRadialGradient(cx2,cy,0,cx2,cy,rx);
     cg.addColorStop(0,`rgba(255,240,250,${op})`);
     cg.addColorStop(0.5,`rgba(220,200,230,${op*0.70})`);
     cg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cg;
     ctx.beginPath();ctx.ellipse(cx2,cy,rx,ry,0,0,Math.PI*2);ctx.fill();
     const cg2=ctx.createRadialGradient(cx2-rx*0.38,cy-ry*0.35,0,cx2-rx*0.38,cy-ry*0.35,rx*0.52);
     cg2.addColorStop(0,`rgba(255,235,245,${op*0.75})`);
     cg2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cg2;
     ctx.beginPath();ctx.ellipse(cx2-rx*0.38,cy-ry*0.35,rx*0.52,ry*0.90,0,0,Math.PI*2);ctx.fill();
    }

    function frame(){
     if(stop.v)return;
     /* ── Fond : image Edward.png couvrant tout le canvas ── */
     if(bgLoaded){
      const iW=bgImg.naturalWidth, iH=bgImg.naturalHeight;
      const scale=Math.max(W/iW,H/iH);
      const dw=iW*scale, dh=iH*scale;
      const dx=(W-dw)/2, dy=(H-dh)/2;
      ctx.drawImage(bgImg,dx,dy,dw,dh);
     } else {
      /* Fallback couleur pendant le chargement */
      const bg=ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,'#4a88b0');bg.addColorStop(1,'#2a5060');
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
     }

     /* ── Nuages semi-transparents subtils (ajoutent profondeur) ── */
     for(const c of clouds) drawCloud(c.x,c.y,c.rx,c.ry,c.op);

     /* ── Brume montant du bas ── */
     for(const m of mists){
      m.y+=m.vy;m.ph+=0.008;
      if(m.y+m.r<0){m.y=H*(0.85+Math.random()*0.15);m.x=Math.random()*W;m.r=W*(0.12+Math.random()*0.16);m.op=0.04+Math.random()*0.06;}
      const mg=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r*(1+Math.sin(m.ph)*0.10));
      const mo=m.op*(0.7+0.3*Math.abs(Math.sin(m.ph)));
      mg.addColorStop(0,`rgba(180,210,180,${mo})`);
      mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Feuilles qui tombent (sculpture topiary) ── */
     for(const l of leaves){
      l.y+=l.vy;l.x+=l.vx;l.rot+=l.rotSpd;l.swing+=l.swingSpd;
      l.x+=Math.sin(l.swing)*0.30;
      if(l.y>H+20){l.y=-20;l.x=Math.random()*W;}
      if(l.x<-20||l.x>W+20){l.x=Math.random()*W;l.y=Math.random()*H*0.5;}
      drawLeaf(l.x,l.y,l.rot,l.size,l.op,l.hue);
     }

     /* ── Flocons de neige subtils ── */
     for(const f of flakes){
      f.y+=f.vy;f.x+=f.vx;f.wb+=f.wSpd;
      if(f.y>H){f.y=-5;f.x=Math.random()*W;}
      f.x+=Math.sin(f.wb)*0.14;
      ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(230,245,255,${f.op})`;ctx.fill();
     }

     /* ── Particules dorées scintillantes ── */
     for(const s of sparks){
      s.x+=s.vx;s.y+=s.vy;s.ph+=s.phSpd;
      if(s.y<-5){s.y=H+5;s.x=Math.random()*W;}
      if(s.x<0)s.x=W;if(s.x>W)s.x=0;
      const sop=s.op*(0.4+0.6*Math.abs(Math.sin(s.ph)));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(230,200,100,${sop})`;ctx.fill();
      /* halo lumineux */
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3.5);
      sg.addColorStop(0,`rgba(255,220,80,${sop*0.25})`);sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r*3.5,0,Math.PI*2);ctx.fill();
     }

     /* ── Oiseaux silhouettes ── */
     for(const b of birds){
      b.x+=b.vx;b.flapPh+=b.flapSpd;
      /* oscillation verticale légère */
      b.y+=Math.sin(b.flapPh*0.35)*0.18;
      if(b.vx>0&&b.x>W*1.10){b.x=-W*0.05;b.y=H*(0.08+Math.random()*0.30);}
      if(b.vx<0&&b.x<-W*0.10){b.x=W*1.05;b.y=H*(0.08+Math.random()*0.30);}
      drawBird(b.x,b.y,b.flapPh,b.size,b.op,b.vx);
     }

     /* ── Vignette douce sur les bords ── */
     const vg=ctx.createRadialGradient(cx,H*0.52,H*0.08,cx,H*0.52,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.06)');
     vg.addColorStop(0.80,'rgba(0,0,0,0.28)');
     vg.addColorStop(1,'rgba(0,0,0,0.60)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
