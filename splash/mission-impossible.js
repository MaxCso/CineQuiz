// CinéQuiz splash chunk — Mission Impossible
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Mission Impossible"]={
   name:'Mission Impossible',
   color:'200,30,30',
   ref:'Mission: Impossible \u2014 Brian De Palma, 1996',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.85';
    let t=0;
    const cx=W/2;

    /* lasers diagonaux */
    const lasers=Array.from({length:7},(_,i)=>({
     y0:H*(0.18+i*0.09), y1:H*(0.26+i*0.09),
     phase:i*1.1, spd:0.12+i*0.02
    }));

    /* mèche sinusoïdale du haut */
    const FX0=W*0.04, FY0=H*0.84, FX1=W*0.96, FY1=H*0.84;
    const fusePoints=[];
    for(let i=0;i<80;i++){
     const p=i/79;
     fusePoints.push({
      x:FX0+(FX1-FX0)*p,
      y:FY0
     });
    }
    const sparks=Array.from({length:24},()=>({x:0,y:0,vx:0,vy:0,life:0,size:0}));

    /* ── Particules d'explosion ── */
    const explParts=Array.from({length:120},()=>({x:0,y:0,vx:0,vy:0,life:0,size:0,hue:0,active:false}));
    let exploded=false;
    let explFlash=0; /* flash blanc au moment de l'explosion */

    function triggerExplosion(){
      if(exploded)return;
      exploded=true;
      explFlash=1.0;
      const ex=cx, ey=H*0.84; /* position de la mèche */
      for(const p of explParts){
        const angle=Math.random()*Math.PI*2;
        const spd=2+Math.random()*8;
        p.x=ex+(Math.random()-0.5)*20;
        p.y=ey+(Math.random()-0.5)*20;
        p.vx=Math.cos(angle)*spd;
        p.vy=Math.sin(angle)*spd-(Math.random()*4+2);
        p.life=0.7+Math.random()*0.8;
        p.size=1.5+Math.random()*4.5;
        p.hue=Math.random()<0.6 ? 20+Math.random()*30 : 50+Math.random()*20;
        p.active=true;
      }
    }

    /* particules de poussière */
    const dust=Array.from({length:30},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.3, vy:Math.random()*0.35+0.08,
     r:Math.random()*1.8+0.4, op:Math.random()*0.18+0.06
    }));

    function frame(){
     if(stop.v)return;

     /* fond avec légère persistance */
     ctx.fillStyle='rgba(2,1,4,0.22)';ctx.fillRect(0,0,W,H);

     const totalDur=42;
     /* Temps réel — indépendant du framerate */
     if(!frame._start) frame._start=performance.now();
     const elapsed=Math.min((performance.now()-frame._start)/1000, totalDur);
     const prog=elapsed/totalDur;
     const countdown=Math.max(0,Math.ceil(totalDur-elapsed));

     /* ── LASERS ── */
     for(let li=0;li<lasers.length;li++){
      const l=lasers[li];
      const offset=Math.sin(t*l.spd+l.phase)*H*0.03;
      const ly0=l.y0+offset, ly1=l.y1+offset;
      const pulse=0.55+Math.sin(t*2.5+l.phase)*0.25;
      ctx.save();
      ctx.shadowColor='rgba(255,30,10,0.8)'; ctx.shadowBlur=8;
      ctx.strokeStyle='rgba(255,25,8,'+pulse+')'; ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(0,ly0);ctx.lineTo(W,ly1);ctx.stroke();
      ctx.strokeStyle='rgba(255,100,80,'+(pulse*0.35)+')'; ctx.lineWidth=5;
      ctx.shadowBlur=0;
      ctx.beginPath();ctx.moveTo(0,ly0);ctx.lineTo(W,ly1);ctx.stroke();
      ctx.restore();
     }

     /* ── MÈCHE ── */
     const fuseP=Math.min(0.995,prog);
     const fi=Math.min(fusePoints.length-2, Math.floor(fuseP*(fusePoints.length-1)));
     const bp=fusePoints[fi];

     /* partie consumée */
     if(fi>0){
      ctx.save();
      ctx.strokeStyle='rgba(80,65,50,0.75)'; ctx.lineWidth=2.5; ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(fusePoints[0].x,fusePoints[0].y);
      for(let pi=1;pi<=fi;pi++) ctx.lineTo(fusePoints[pi].x,fusePoints[pi].y);
      ctx.stroke(); ctx.restore();
     }
     /* partie encore intacte */
     if(fi<fusePoints.length-1){
      ctx.save();
      ctx.strokeStyle='rgba(190,155,80,0.90)'; ctx.lineWidth=2.8; ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(bp.x,bp.y);
      for(let pi=fi+1;pi<fusePoints.length;pi++) ctx.lineTo(fusePoints[pi].x,fusePoints[pi].y);
      ctx.stroke(); ctx.restore();
     }

     /* braise vive */
     if(bp && fuseP<1){
      const halo=ctx.createRadialGradient(bp.x,bp.y,0,bp.x,bp.y,22);
      halo.addColorStop(0,'rgba(255,200,60,0.9)');
      halo.addColorStop(0.35,'rgba(255,90,0,0.5)');
      halo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo; ctx.fillRect(bp.x-24,bp.y-24,48,48);
      ctx.fillStyle='rgba(255,255,200,1)';
      ctx.beginPath();ctx.arc(bp.x,bp.y,3,0,Math.PI*2);ctx.fill();
      if(Math.random()<0.5){
       const s=sparks.find(sp=>sp.life<=0)||sparks[0];
       s.x=bp.x; s.y=bp.y;
       s.vx=(Math.random()-0.5)*4; s.vy=-(Math.random()*3.5+1);
       s.life=0.7+Math.random()*0.5; s.size=Math.random()*2.2+0.5;
      }
     }
     /* étincelles */
     for(const sk of sparks){
      if(sk.life<=0) continue;
      sk.x+=sk.vx; sk.y+=sk.vy; sk.vy+=0.12; sk.life-=0.03;
      if(sk.size*sk.life<=0) continue;
      ctx.fillStyle='rgba(255,'+(80+Math.random()*120|0)+',10,'+sk.life+')';
      ctx.beginPath();ctx.arc(sk.x,sk.y,Math.max(0.01,sk.size*sk.life),0,Math.PI*2);ctx.fill();
     }

     /* ── CORDE + AGENT (silhouette claire) ── */
     /* Agent calé sur prog : descend de hors-écran haut jusqu'à mi-écran en 42s */
     const rp=prog;
     const ry=H*(-0.05)+rp*H*0.68;
     const rx=cx+Math.sin(t*0.5)*8;
     /* corde */
     ctx.strokeStyle='rgba(210,200,170,0.65)'; ctx.lineWidth=1.8;
     ctx.beginPath();ctx.moveTo(cx,0);ctx.lineTo(rx,ry+60);ctx.stroke();
     /* agent — silhouette visible gris clair */
     if(ry>-20){
      ctx.save();ctx.translate(rx,ry);
      /* tête */
      ctx.fillStyle='rgba(200,190,175,0.92)';
      ctx.beginPath();ctx.arc(0,-16,7,0,Math.PI*2);ctx.fill();
      /* corps en combinaison sombre */
      ctx.fillStyle='rgba(40,38,35,0.90)';
      ctx.save();ctx.rotate(0.12);ctx.fillRect(-5,-8,11,22);ctx.restore();
      /* bras gauche */
      ctx.strokeStyle='rgba(40,38,35,0.90)';ctx.lineWidth=4;
      ctx.beginPath();ctx.moveTo(-5,4);ctx.lineTo(-18,14);ctx.stroke();
      /* bras droit */
      ctx.beginPath();ctx.moveTo(5,4);ctx.lineTo(18,14);ctx.stroke();
      ctx.restore();
     }

     /* ── COMPTEUR ── */
     const cdY=H*0.25;

     /* Déclencher l'explosion quand le compte atteint 0 */
     if(countdown===0 && !exploded) triggerExplosion();

     /* ── EXPLOSION ── */
     if(explFlash>0){
       ctx.fillStyle=`rgba(255,220,120,${explFlash*0.55})`;
       ctx.fillRect(0,0,W,H);
       explFlash=Math.max(0,explFlash-0.06);
     }
     for(const p of explParts){
       if(!p.active||p.life<=0)continue;
       p.x+=p.vx;p.y+=p.vy;
       p.vy+=0.15; /* gravité */
       p.vx*=0.97;
       p.life-=0.018;
       if(p.life<=0){p.active=false;continue;}
       /* Traînée lumineuse */
       const grd=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*2.5);
       grd.addColorStop(0,`hsla(${p.hue},100%,80%,${p.life*0.9})`);
       grd.addColorStop(0.5,`hsla(${p.hue},95%,55%,${p.life*0.5})`);
       grd.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=grd;
       ctx.beginPath();ctx.arc(p.x,p.y,p.size*2.5,0,Math.PI*2);ctx.fill();
       /* Point central */
       ctx.fillStyle=`hsla(${p.hue+30},100%,92%,${p.life})`;
       ctx.beginPath();ctx.arc(p.x,p.y,Math.max(0.5,p.size*p.life*0.5),0,Math.PI*2);ctx.fill();
     }

     ctx.save();
     ctx.shadowColor='rgba(255,20,8,0.9)'; ctx.shadowBlur=14;
     ctx.strokeStyle='rgba(255,20,8,0.70)'; ctx.lineWidth=2;
     ctx.strokeRect(cx-42,cdY-26,84,52);
     ctx.fillStyle='rgba(8,2,2,0.75)';
     ctx.fillRect(cx-42,cdY-26,84,52);
     ctx.font='bold '+Math.floor(H*0.058)+'px "Courier New",monospace';
     ctx.textAlign='center';ctx.textBaseline='middle';
     /* Clignotement rouge vif dans les 5 dernières secondes */
     const urgency=elapsed>37;
     const blink=urgency&&Math.floor(t*8)%2===0;
     ctx.fillStyle=blink?'rgba(255,255,80,1)':'rgba(255,30,10,0.97)';
     ctx.shadowColor=blink?'rgba(255,255,0,1)':'rgba(255,30,10,0.8)';
     ctx.shadowBlur=blink?20:10;
     ctx.fillText(String(countdown).padStart(2,'0'),cx,cdY);
     ctx.restore();

     /* ── POUSSIÈRE ── */
     for(const d of dust){
      d.x+=d.vx; d.y+=d.vy;
      if(d.y>H+2){d.y=-2;d.x=Math.random()*W;}
      ctx.fillStyle='rgba(200,185,150,'+d.op+')';
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* vignette */
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.08,cx,H*0.5,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,5,0.78)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
