// CinéQuiz splash chunk — Projet Hail Mary
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Projet Hail Mary"]={
   name:'Projet Hail Mary',
   color:'40,120,200',
   ref:'Project Hail Mary \u2014 Andy Weir, 2021',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2,cy=H/2;
    let _s=document.getElementById('_phm_s');
    if(!_s){_s=document.createElement('style');_s.id='_phm_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Fond de base — rouge cramoisi dense, peint en canvas off-screen ── */
    /* On pré-peint un fond nébuleux une seule fois */
    const bg=document.createElement('canvas');
    bg.width=Math.ceil(W/2); bg.height=Math.ceil(H/2);
    const bgCtx=bg.getContext('2d');
    (function paintBg(){
     bgCtx.fillStyle='#1a0010';
     bgCtx.fillRect(0,0,bg.width,bg.height);
     /* Grandes masses rouges/roses diffuses — Voie Lactée cramoisie */
     const blobs=[
      {x:0.50,y:0.28,rx:0.55,ry:0.30,col:'200,20,60',op:0.55},
      {x:0.30,y:0.55,rx:0.40,ry:0.28,col:'160,10,45',op:0.40},
      {x:0.72,y:0.42,rx:0.38,ry:0.25,col:'220,30,70',op:0.38},
      {x:0.50,y:0.70,rx:0.60,ry:0.22,col:'180,15,50',op:0.32},
      {x:0.20,y:0.20,rx:0.32,ry:0.20,col:'240,40,80',op:0.28},
      {x:0.80,y:0.75,rx:0.30,ry:0.18,col:'200,25,65',op:0.25},
      /* Accent rose vif au centre */
      {x:0.50,y:0.38,rx:0.22,ry:0.16,col:'255,60,120',op:0.20},
     ];
     for(const b of blobs){
      const gx=b.x*bg.width, gy=b.y*bg.height;
      const gr=bg.width*b.rx;
      const g=bgCtx.createRadialGradient(gx,gy,0,gx,gy,gr);
      g.addColorStop(0,`rgba(${b.col},${b.op})`);
      g.addColorStop(0.45,`rgba(${b.col},${b.op*0.45})`);
      g.addColorStop(1,'rgba(0,0,0,0)');
      bgCtx.save();
      bgCtx.scale(1,b.ry/b.rx);
      bgCtx.fillStyle=g;
      bgCtx.beginPath();bgCtx.arc(gx,gy*(b.rx/b.ry),gr,0,Math.PI*2);bgCtx.fill();
      bgCtx.restore();
     }
    })();

    /* ── 700 étoiles cramoisies — très denses comme sur l'image ── */
    const stars=Array.from({length:700},()=>{
     const rnd=Math.random();
     /* Distribution : beaucoup de petites, peu de grandes */
     const r=rnd<0.65 ? 0.20+Math.random()*0.45
              : rnd<0.88 ? 0.55+Math.random()*0.65
              : 1.0+Math.random()*0.80;
     /* Teinte : blanc rosé dominant, rouge, rose vif */
     const c=Math.random();
     const col=c<0.50?`255,${190+Math.random()*65|0},${180+Math.random()*65|0}`
               :c<0.75?`255,${120+Math.random()*80|0},${100+Math.random()*80|0}`
               :c<0.90?`255,${60+Math.random()*60|0},${80+Math.random()*60|0}`
               :`${220+Math.random()*35|0},${180+Math.random()*60|0},255`;
     return{
      x:Math.random()*W, y:Math.random()*H,
      r, col,
      op:0.35+Math.random()*0.65,
      ph:Math.random()*Math.PI*2,
      spd:0.008+Math.random()*0.025,
     };
    });

    /* ── Météorites — Rocky + 3 autres sur des trajectoires variées ── */
    /* Chaque météorite a sa propre courbe de Bézier quadratique et sa vitesse */
    function makeMeteor(p0x,p0y, p1x,p1y, p2x,p2y, period, offset, trailLen, size){
      return {
        p0x,p0y,p1x,p1y,p2x,p2y,
        period,         /* frames pour traverser la courbe */
        t: offset,      /* frame courante (décalage initial) */
        trail:[],
        trailLen,
        size,           /* multiplicateur de taille du halo */
      };
    }

    const meteors=[
      /* Rocky — trajectoire originale haut-droite → centre */
      makeMeteor(W*1.08,H*0.18, W*0.75,H*0.25, W*-0.15,H*0.60, 300, 0,   70, 1.0),
      /* Météorite 2 — vient du haut, traverse en diagonale douce */
      makeMeteor(W*0.90,H*-0.05, W*0.55,H*0.22, W*0.10,H*0.70, 380, 95,  55, 0.65),
      /* Météorite 3 — entrée par la droite, sort par le bas-gauche */
      makeMeteor(W*1.10,H*0.45, W*0.70,H*0.50, W*0.05,H*0.90, 340, 180, 50, 0.55),
      /* Météorite 4 — petite, rapide, haut-gauche → bas-droite */
      makeMeteor(W*0.05,H*-0.05, W*0.45,H*0.30, W*0.95,H*0.80, 260, 50,  40, 0.45),
    ];

    function meteorPos(m){
      const prog=(m.t%m.period)/m.period;
      const inv=1-prog;
      return{
        x:inv*inv*m.p0x+2*inv*prog*m.p1x+prog*prog*m.p2x,
        y:inv*inv*m.p0y+2*inv*prog*m.p1y+prog*prog*m.p2y,
      };
    }

    function drawMeteor(m){
      m.t++;
      const rp=meteorPos(m);
      m.trail.unshift({x:rp.x,y:rp.y});
      if(m.trail.length>m.trailLen)m.trail.pop();

      /* Traîne */
      for(let i=0;i<m.trail.length-1;i++){
        const pct=1-(i/m.trailLen);
        const pct2=pct*pct;
        const rr=255, gg=Math.max(210-i*2,60)|0, bb=Math.max(170-i*2.5,40)|0;
        ctx.beginPath();
        ctx.moveTo(m.trail[i].x,m.trail[i].y);
        ctx.lineTo(m.trail[i+1].x,m.trail[i+1].y);
        ctx.strokeStyle=`rgba(${rr},${gg},${bb},${pct2*0.92*m.size})`;
        ctx.lineWidth=Math.max(W*0.004*pct2*m.size,0.4);
        ctx.lineCap='round';ctx.stroke();
      }
      /* Halo doux (25 premiers points) */
      const haloLen=Math.min(m.trail.length-1,25);
      for(let i=0;i<haloLen;i++){
        const pct=1-(i/haloLen);
        ctx.beginPath();
        ctx.moveTo(m.trail[i].x,m.trail[i].y);
        ctx.lineTo(m.trail[i+1].x,m.trail[i+1].y);
        ctx.strokeStyle=`rgba(255,160,100,${pct*0.14*m.size})`;
        ctx.lineWidth=W*0.030*pct*m.size;
        ctx.stroke();
      }

      /* Cœur lumineux */
      const sz=W*0.016*m.size;
      const h1=ctx.createRadialGradient(rp.x,rp.y,0,rp.x,rp.y,sz*4.5);
      h1.addColorStop(0,`rgba(255,230,160,${(0.38+Math.sin(t*2.5)*0.08)*m.size})`);
      h1.addColorStop(0.35,`rgba(255,140,80,${(0.16+Math.sin(t*2)*0.04)*m.size})`);
      h1.addColorStop(0.70,`rgba(220,60,80,${0.06*m.size})`);
      h1.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=h1;ctx.fillRect(rp.x-sz*5,rp.y-sz*5,sz*10,sz*10);
      const h2=ctx.createRadialGradient(rp.x,rp.y,0,rp.x,rp.y,sz);
      h2.addColorStop(0,'rgba(255,255,230,1.0)');
      h2.addColorStop(0.5,'rgba(255,220,130,0.95)');
      h2.addColorStop(1,'rgba(255,160,60,0)');
      ctx.fillStyle=h2;ctx.beginPath();ctx.arc(rp.x,rp.y,sz,0,Math.PI*2);ctx.fill();
    }

    function frame(){
     if(stop.v)return;

     /* Fond nébuleux pré-rendu — très léger trail pour shimmer */
     ctx.globalAlpha=t===0?1.0:0.08;
     ctx.fillStyle='#1a0010';
     ctx.fillRect(0,0,W,H);
     ctx.globalAlpha=1.0;

     /* Nébuleuse cramoisie de fond */
     ctx.drawImage(bg,0,0,W,H);

     /* ── Étoiles ── */
     for(const s of stars){
      s.ph+=s.spd;
      const sa=s.op*(0.5+0.5*Math.sin(s.ph));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${s.col},${sa})`;
      ctx.fill();
      /* Halo pour les étoiles de taille moyenne/grande */
      if(s.r>0.7){
       const hg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*4);
       hg.addColorStop(0,`rgba(${s.col},${sa*0.30})`);
       hg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=hg;
       ctx.beginPath();ctx.arc(s.x,s.y,s.r*4,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Météorites ── */
     for(const m of meteors) drawMeteor(m);

     /* ── Vignette douce — pas trop sombre ── */
     const vg=ctx.createRadialGradient(cx,cy,H*0.15,cx,cy,H*0.78);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(10,0,5,0.12)');
     vg.addColorStop(0.82,'rgba(12,0,6,0.38)');
     vg.addColorStop(1,'rgba(10,0,5,0.70)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
