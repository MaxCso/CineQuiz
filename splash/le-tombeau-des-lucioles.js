// CinéQuiz splash chunk — Le Tombeau des lucioles
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Tombeau des lucioles"]={
   name:'Le Tombeau des lucioles',
   color:'255,160,20',
   ref:'Le Tombeau des lucioles \u2014 Isao Takahata, 1988',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── CSS ── */
    let _s=document.getElementById('_ff_s');
    if(!_s){_s=document.createElement('style');_s.id='_ff_s';document.head.appendChild(_s);}
    _s.textContent=[
     '#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}',
     '',
     '#splash-quote-text{color:rgba(255,248,220,0.94)!important;text-shadow:0 1px 8px rgba(0,0,0,0.80),0 0 20px rgba(180,230,80,0.18)!important;}',
    ].join('');
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Lucioles — trajectoires organiques ── */
    const fireflies=Array.from({length:48},()=>({
     x:Math.random()*W,
     y:H*0.30+Math.random()*H*0.55,
     /* Chaque luciole a deux oscillations sinusoïdales superposées */
     cx0:Math.random()*W, cy0:H*0.38+Math.random()*H*0.45,
     ax:W*(0.04+Math.random()*0.12), ay:H*(0.02+Math.random()*0.08),
     fx:0.008+Math.random()*0.012,  fy:0.006+Math.random()*0.010,
     fx2:0.018+Math.random()*0.025, fy2:0.014+Math.random()*0.020,
     phx:Math.random()*Math.PI*2,   phy:Math.random()*Math.PI*2,
     phx2:Math.random()*Math.PI*2,  phy2:Math.random()*Math.PI*2,
     /* Clignotement */
     glowPh:Math.random()*Math.PI*2,
     glowSpd:0.022+Math.random()*0.030,
     glowMin:0.10+Math.random()*0.15,
     /* Taille et teinte */
     r:W*(0.003+Math.random()*0.006),
     warm:Math.random(), /* 0=vert-citron, 1=jaune chaud */
    }));

    /* ── Herbe haute — deux rangées ── */
    const grassBack=Array.from({length:55},(_,i)=>({
     x:i*(W/54)+Math.random()*6-3,
     h:H*(0.030+Math.random()*0.055),
     ph:Math.random()*Math.PI*2,
     spd:0.012+Math.random()*0.010,
     w:0.8+Math.random()*0.5,
    }));
    const grassFront=Array.from({length:38},(_,i)=>({
     x:i*(W/37)+Math.random()*8-4,
     h:H*(0.048+Math.random()*0.075),
     ph:Math.random()*Math.PI*2,
     spd:0.015+Math.random()*0.012,
     w:1.0+Math.random()*0.8,
    }));

    /* ── Étoiles fixes ── */
    const stars=Array.from({length:130},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.58,
     r:Math.random()*0.85+0.15,
     op:0.10+Math.random()*0.50,
     ph:Math.random()*Math.PI*2,
     spd:0.004+Math.random()*0.012,
    }));

    /* ── Silhouettes des arbres — collines boisées ── */
    /* Pins japonais — 3 côté gauche, 3 côté droit */
    function drawPine(px,py,ph,dark){
     const layers=4;
     ctx.fillStyle=dark?'rgba(4,6,3,0.97)':'rgba(6,9,4,0.93)';
     /* Tronc */
     ctx.fillRect(px-ph*0.04,py,ph*0.08,ph*0.28);
     /* Étages du pin — triangles superposés */
     for(let l=0;l<layers;l++){
      const lf=l/layers;
      const ly=py-ph*(0.12+lf*0.55);
      const lw=ph*(0.38-lf*0.18);
      ctx.beginPath();
      ctx.moveTo(px,ly-ph*(0.18+lf*0.06));
      ctx.lineTo(px-lw,ly+ph*0.10);
      ctx.lineTo(px+lw,ly+ph*0.10);
      ctx.closePath();ctx.fill();
     }
    }

    /* Bambous — rangée arrière */
    const bamboos=Array.from({length:12},(_,i)=>({
     x: i<6 ? W*(0.02+i*0.06) : W*(0.64+(i-6)*0.06),
     h: H*(0.22+Math.random()*0.14),
     sway:Math.random()*Math.PI*2,
     swaySpd:0.006+Math.random()*0.006,
    }));

    /* ── Dessiner les silhouettes de Seita et Setsuko ── */
    function drawSeita(sx,sy){
     const s=W*0.068;
     ctx.save();ctx.translate(sx,sy);
     ctx.fillStyle='rgba(55,38,22,0.97)';
     /* Corps */
     ctx.beginPath();ctx.roundRect(-s*0.30,-s*1.45,s*0.60,s*0.88,s*0.08);ctx.fill();
     /* Tête */
     ctx.beginPath();ctx.arc(0,-s*1.58,s*0.32,0,Math.PI*2);ctx.fill();
     /* Bras gauche — tendu/détendu */
     ctx.lineWidth=s*0.14;ctx.strokeStyle='rgba(55,38,22,0.97)';ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-s*0.30,-s*1.20);ctx.lineTo(-s*0.55,-s*0.78);ctx.stroke();
     /* Bras droit — vers Setsuko */
     ctx.beginPath();ctx.moveTo(s*0.30,-s*1.20);ctx.lineTo(s*0.52,-s*0.85);ctx.stroke();
     /* Jambes */
     ctx.lineWidth=s*0.16;
     ctx.beginPath();ctx.moveTo(-s*0.14,-s*0.58);ctx.lineTo(-s*0.18,0);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.14,-s*0.58);ctx.lineTo(s*0.18,0);ctx.stroke();
     ctx.restore();
    }

    function drawSetsuko(sx,sy){
     const s=W*0.050;
     ctx.save();ctx.translate(sx,sy);
     ctx.fillStyle='rgba(62,44,26,0.96)';
     /* Corps — assise, légèrement penchée */
     ctx.beginPath();ctx.roundRect(-s*0.30,-s*0.95,s*0.60,s*0.65,s*0.10);ctx.fill();
     /* Tête */
     ctx.beginPath();ctx.arc(-s*0.05,-s*1.10,s*0.28,0,Math.PI*2);ctx.fill();
     /* Petites tresses */
     ctx.beginPath();ctx.arc(-s*0.28,-s*1.0,s*0.10,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc( s*0.18,-s*1.0,s*0.10,0,Math.PI*2);ctx.fill();
     /* Bras — tient la boîte de bonbons */
     ctx.lineWidth=s*0.12;ctx.strokeStyle='rgba(62,44,26,0.96)';ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-s*0.30,-s*0.75);ctx.lineTo(-s*0.50,-s*0.38);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.30,-s*0.75);ctx.lineTo(s*0.42,-s*0.42);ctx.stroke();
     /* Jambes croisées — assise */
     ctx.lineWidth=s*0.14;
     ctx.beginPath();ctx.moveTo(-s*0.18,-s*0.30);ctx.quadraticCurveTo(-s*0.28,s*0.05,-s*0.10,s*0.08);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.18,-s*0.30);ctx.quadraticCurveTo(s*0.22,s*0.05,s*0.05,s*0.08);ctx.stroke();
     /* Boîte de bonbons Sakuma — petit rectangle rouge arrondi */
     ctx.fillStyle='rgba(200,55,55,0.88)';
     ctx.beginPath();ctx.roundRect(s*0.10,-s*0.45,s*0.38,s*0.26,s*0.06);ctx.fill();
     /* Motif boîte */
     ctx.strokeStyle='rgba(240,200,60,0.70)';ctx.lineWidth=0.7;
     ctx.strokeRect(s*0.13,-s*0.42,s*0.32,s*0.20);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── CIEL — nuit d'été Japon ── */
     const sky=ctx.createLinearGradient(0,0,0,H*0.62);
     sky.addColorStop(0.00,'#020308');
     sky.addColorStop(0.18,'#03050f');
     sky.addColorStop(0.42,'#040812');
     sky.addColorStop(0.70,'#050a10');
     sky.addColorStop(1.00,'#06100e');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.62);

     /* Voie lactée diffuse */
     const mwG=ctx.createLinearGradient(W*0.15,H*0.02,W*0.85,H*0.50);
     mwG.addColorStop(0,'rgba(0,0,0,0)');
     mwG.addColorStop(0.30,`rgba(80,70,100,${0.06+Math.sin(t*0.05)*0.01})`);
     mwG.addColorStop(0.55,`rgba(100,90,130,${0.09+Math.sin(t*0.04)*0.01})`);
     mwG.addColorStop(0.75,'rgba(60,55,80,0.05)');
     mwG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mwG;ctx.fillRect(0,0,W,H*0.60);

     /* ── Étoiles ── */
     for(const s of stars){
      s.ph+=s.spd;
      const br=0.35+0.65*Math.abs(Math.sin(s.ph));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(225,218,200,${s.op*br})`;ctx.fill();
     }

     /* ── Lune japonaise — tamisée, chaleur d'été ── */
     const moonX=W*0.78,moonY=H*0.10,moonR=W*0.052;
     const moonGlow=ctx.createRadialGradient(moonX,moonY,0,moonX,moonY,W*0.28);
     moonGlow.addColorStop(0,`rgba(255,248,200,${0.18+Math.sin(t*0.12)*0.03})`);
     moonGlow.addColorStop(0.22,'rgba(240,220,140,0.08)');
     moonGlow.addColorStop(0.55,'rgba(200,180,80,0.03)');
     moonGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonGlow;ctx.fillRect(0,0,W,H*0.40);
     const moonDisc=ctx.createRadialGradient(moonX-moonR*0.22,moonY-moonR*0.22,0,moonX,moonY,moonR);
     moonDisc.addColorStop(0,'rgba(255,252,230,0.96)');
     moonDisc.addColorStop(0.50,'rgba(248,240,200,0.90)');
     moonDisc.addColorStop(0.82,'rgba(235,220,170,0.78)');
     moonDisc.addColorStop(1,'rgba(220,200,140,0)');
     ctx.fillStyle=moonDisc;ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.fill();

     /* ── Colline — silhouette arrondie ── */
     ctx.fillStyle='rgba(5,7,3,0.98)';
     ctx.beginPath();
     ctx.moveTo(-10,H*0.62);
     ctx.bezierCurveTo(W*0.05,H*0.56, W*0.18,H*0.50, W*0.32,H*0.54);
     ctx.bezierCurveTo(W*0.44,H*0.57, W*0.52,H*0.48, W*0.65,H*0.52);
     ctx.bezierCurveTo(W*0.76,H*0.55, W*0.88,H*0.50, W+10,H*0.54);
     ctx.lineTo(W+10,H*0.62);ctx.closePath();ctx.fill();

     /* ── Bambous arrière ── */
     for(const b of bamboos){
      b.sway+=b.swaySpd;
      const sw=Math.sin(b.sway)*W*0.004;
      ctx.strokeStyle='rgba(4,8,3,0.90)';ctx.lineWidth=W*0.008;ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(b.x,H*0.62);
      ctx.quadraticCurveTo(b.x+sw*0.5,H*0.62-b.h*0.5,b.x+sw,H*0.62-b.h);
      ctx.stroke();
      /* Feuilles */
      ctx.lineWidth=W*0.005;
      for(let li=0;li<3;li++){
       const ly=H*0.62-b.h*(0.4+li*0.18);
       const lx=b.x+sw*(0.4+li*0.2);
       const side=li%2===0?1:-1;
       ctx.beginPath();
       ctx.moveTo(lx,ly);
       ctx.quadraticCurveTo(lx+side*W*0.025,ly-H*0.018,lx+side*W*0.038,ly-H*0.008);
       ctx.stroke();
      }
     }

     /* Pins sur les côtés */
     drawPine(W*0.05,H*0.62,H*0.18,true);
     drawPine(W*0.14,H*0.62,H*0.14,false);
     drawPine(W*0.88,H*0.62,H*0.16,true);
     drawPine(W*0.96,H*0.62,H*0.12,false);

     /* ── SOL — prairie nuit ── */
     const ground=ctx.createLinearGradient(0,H*0.62,0,H);
     ground.addColorStop(0,'rgba(6,10,4,0.97)');
     ground.addColorStop(0.25,'rgba(5,8,3,0.98)');
     ground.addColorStop(1,'rgba(2,4,1,1.0)');
     ctx.fillStyle=ground;ctx.fillRect(0,H*0.62,W,H*0.38);

     /* ── Herbe arrière ── */
     for(const g of grassBack){
      g.ph+=g.spd;
      const sway=Math.sin(g.ph)*W*0.004;
      ctx.strokeStyle=`rgba(10,18,7,0.70)`;ctx.lineWidth=g.w;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(g.x,H*0.62);
      ctx.quadraticCurveTo(g.x+sway*0.6,H*0.62-g.h*0.55,g.x+sway,H*0.62-g.h);
      ctx.stroke();
     }

     /* ── Lucioles ── */
     for(const f of fireflies){
      /* Position sinusoïdale composée */
      f.phx+=f.fx; f.phy+=f.fy; f.phx2+=f.fx2; f.phy2+=f.fy2;
      f.x=f.cx0+Math.sin(f.phx)*f.ax+Math.sin(f.phx2)*f.ax*0.35;
      f.y=f.cy0+Math.sin(f.phy)*f.ay+Math.sin(f.phy2)*f.ay*0.40;
      /* Rebond sur les bords */
      if(f.x<0||f.x>W){f.cx0=cx+(Math.random()-0.5)*W*0.7;f.phx+=Math.PI;}
      if(f.y<H*0.28||f.y>H*0.86){f.cy0=H*0.50+Math.random()*H*0.25;f.phy+=Math.PI;}
      /* Clignotement */
      f.glowPh+=f.glowSpd;
      const glow=Math.pow(Math.max(0,Math.sin(f.glowPh)),2.2);
      if(glow<0.04)continue;
      /* Teinte : vert-citron → jaune chaud */
      const r=180+f.warm*55|0, g2=230+f.warm*10|0, b=40+f.warm*20|0;
      /* Halo externe large */
      const haloR=f.r*6+glow*f.r*8;
      const hG=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,haloR);
      hG.addColorStop(0,`rgba(${r},${g2},${b},${glow*0.55})`);
      hG.addColorStop(0.35,`rgba(${r},${g2},${b},${glow*0.22})`);
      hG.addColorStop(0.70,`rgba(${r-20},${g2-30},10,${glow*0.06})`);
      hG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hG;ctx.beginPath();ctx.arc(f.x,f.y,haloR,0,Math.PI*2);ctx.fill();
      /* Point central brillant */
      ctx.fillStyle=`rgba(${r+50},${g2+15},${b+100},${glow*0.95})`;
      ctx.beginPath();ctx.arc(f.x,f.y,f.r*(0.5+glow*0.8),0,Math.PI*2);ctx.fill();
      /* Cœur blanc */
      if(glow>0.6){
       ctx.fillStyle=`rgba(255,255,240,${(glow-0.6)*1.8*0.85})`;
       ctx.beginPath();ctx.arc(f.x,f.y,f.r*0.4,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Reflet des lucioles sur le sol ── */
     const reflG=ctx.createLinearGradient(0,H*0.62,0,H*0.70);
     reflG.addColorStop(0,`rgba(120,200,40,${0.06+Math.sin(t*0.22)*0.02})`);
     reflG.addColorStop(0.4,`rgba(100,180,30,${0.03+Math.sin(t*0.18)*0.01})`);
     reflG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=reflG;ctx.fillRect(0,H*0.62,W,H*0.08);

     /* ── Herbe avant — par-dessus les lucioles basses ── */
     for(const g of grassFront){
      g.ph+=g.spd;
      const sway=Math.sin(g.ph)*W*0.006;
      ctx.strokeStyle=`rgba(8,14,5,0.85)`;ctx.lineWidth=g.w;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(g.x,H*0.62);
      ctx.quadraticCurveTo(g.x+sway*0.6,H*0.62-g.h*0.55,g.x+sway*1.2,H*0.62-g.h);
      ctx.stroke();
     }

     /* ── Seita et Setsuko ── */
     /* Halo de lucioles autour d'eux — large et chaud */
     const charAmbient=ctx.createRadialGradient(cx,H*0.74,0,cx,H*0.74,W*0.55);
     charAmbient.addColorStop(0,`rgba(160,230,60,${0.28+Math.sin(t*0.28)*0.06})`);
     charAmbient.addColorStop(0.18,`rgba(130,210,40,${0.18+Math.sin(t*0.22)*0.04})`);
     charAmbient.addColorStop(0.42,`rgba(80,160,20,${0.10+Math.sin(t*0.18)*0.03})`);
     charAmbient.addColorStop(0.72,`rgba(40,100,10,0.04)`);
     charAmbient.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=charAmbient;ctx.fillRect(cx-W*0.60,H*0.58,W*1.20,H*0.35);
     /* Éclat secondaire chaud (reflet boîte de bonbons / feu lointain) */
     const charWarm=ctx.createRadialGradient(cx+W*0.06,H*0.77,0,cx+W*0.06,H*0.77,W*0.22);
     charWarm.addColorStop(0,`rgba(255,180,60,${0.14+Math.sin(t*0.35)*0.04})`);
     charWarm.addColorStop(0.4,`rgba(220,140,30,0.06)`);
     charWarm.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=charWarm;ctx.fillRect(cx-W*0.20,H*0.66,W*0.52,H*0.22);
     drawSeita(cx-W*0.11,H*0.785);
     drawSetsuko(cx+W*0.08,H*0.790);

     /* ── Vignette douce — épargnant la zone des personnages ── */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.10,cx,H*0.45,H*0.95);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(0,0,0,0.04)');
     vg.addColorStop(0.62,'rgba(0,0,0,0.22)');
     vg.addColorStop(1,'rgba(0,0,0,0.78)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
