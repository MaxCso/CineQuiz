// CinéQuiz splash chunk — Hook
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Hook"]={
   name:'Hook',
   color:'60,120,200',
   ref:'Hook \u2014 Steven Spielberg, 1991',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_hook_s');
    if(!_s){_s=document.createElement('style');_s.id='_hook_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Étoiles de Never Land — 3 couches */
    const stars=Array.from({length:120},()=>({
     x:Math.random()*W, y:Math.random()*H*0.75,
     r:Math.random()*1.5+0.25,
     op:0.35+Math.random()*0.60,
     ph:Math.random()*Math.PI*2,
     spd:0.008+Math.random()*0.022,
     col:Math.random()<0.6?'220,215,255':'255,240,180',
    }));

    /* Nuages — lumineux, bleutés */
    const clouds=Array.from({length:6},(_,i)=>({
     x:W*(0.02+i*0.18)+Math.random()*W*0.10,
     y:H*(0.12+Math.random()*0.28),
     rx:W*(0.07+Math.random()*0.09),
     ry:H*(0.028+Math.random()*0.022),
     op:0.18+Math.random()*0.18,
     vx:0.04+Math.random()*0.05,
    }));

    /* Poussière de fée Tinker Bell — beaucoup plus dense et lumineuse */
    const pixie=Array.from({length:90},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vx:(Math.random()-0.5)*0.40,
     vy:-(0.12+Math.random()*0.28),
     r:Math.random()*2.2+0.5,
     op:0.45+Math.random()*0.50,
     ph:Math.random()*Math.PI*2,
     trail:[], /* traîne */
    }));

    /* Lune — position fixe haut-droite */
    const moonX=W*0.78, moonY=H*0.16, moonR=W*0.048;

    function frame(){
     if(stop.v)return;

     /* Ciel Never Land — bleu nuit magique, plus lumineux */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,`hsl(${228+Math.sin(t*0.08)*4},${58+Math.sin(t*0.06)*4}%,${22+Math.sin(t*0.07)*2}%)`);
     bg.addColorStop(0.35,`hsl(232,55%,${18+Math.sin(t*0.05)*2}%)`);
     bg.addColorStop(0.65,`hsl(238,48%,${14+Math.sin(t*0.06)*1}%)`);
     bg.addColorStop(1,`hsl(242,42%,11%)`);
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Lueur ambiante de la lune sur tout le ciel */
     const moonAmbient=ctx.createRadialGradient(moonX,moonY*0.5,0,moonX,0,W*1.2);
     moonAmbient.addColorStop(0,`rgba(210,220,255,${0.10+Math.sin(t*0.12)*0.02})`);
     moonAmbient.addColorStop(0.5,'rgba(160,180,240,0.04)');
     moonAmbient.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonAmbient;ctx.fillRect(0,0,W,H);

     /* ── Lune — grande et brillante ── */
     /* Halo externe large et lumineux */
     const h1=ctx.createRadialGradient(moonX,moonY,moonR*0.5,moonX,moonY,moonR*7);
     h1.addColorStop(0,`rgba(255,250,200,${0.30+Math.sin(t*0.22)*0.05})`);
     h1.addColorStop(0.20,`rgba(230,230,170,${0.18+Math.sin(t*0.18)*0.04})`);
     h1.addColorStop(0.50,`rgba(200,210,240,${0.07+Math.sin(t*0.14)*0.02})`);
     h1.addColorStop(0.80,'rgba(160,180,230,0.02)');
     h1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=h1;ctx.fillRect(moonX-moonR*8,moonY-moonR*8,moonR*16,moonR*16);
     /* Corps de la lune */
     const moonG=ctx.createRadialGradient(moonX-moonR*0.25,moonY-moonR*0.25,0,moonX,moonY,moonR);
     moonG.addColorStop(0,'rgba(255,255,235,1.0)');
     moonG.addColorStop(0.55,'rgba(248,245,210,0.98)');
     moonG.addColorStop(0.85,'rgba(235,230,185,0.92)');
     moonG.addColorStop(1,'rgba(210,205,160,0.80)');
     ctx.fillStyle=moonG;ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.fill();

     /* ── Étoiles scintillantes ── */
     for(const s of stars){
      s.ph+=s.spd;
      const sa=s.op*(0.45+0.55*Math.abs(Math.sin(s.ph)));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${s.col},${sa})`;ctx.fill();
      if(s.r>1.0){
       const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*4);
       sg.addColorStop(0,`rgba(${s.col},${sa*0.4})`);
       sg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r*4,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Nuages — bleu-blanc lumineux ── */
     for(const c2 of clouds){
      c2.x+=c2.vx;if(c2.x>W*1.20)c2.x=-W*0.20;
      const cg=ctx.createRadialGradient(c2.x,c2.y,0,c2.x,c2.y,c2.rx);
      cg.addColorStop(0,`rgba(200,215,255,${c2.op*1.8})`);
      cg.addColorStop(0.5,`rgba(180,200,245,${c2.op*1.1})`);
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.save();ctx.scale(1,c2.ry/c2.rx);
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(c2.x,c2.y*c2.rx/c2.ry,c2.rx,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* ── Poussière de fée — traînées lumineuses ── */
     for(const p of pixie){
      /* Mettre à jour la traîne */
      p.trail.push({x:p.x,y:p.y});
      if(p.trail.length>8)p.trail.shift();
      p.x+=p.vx+Math.sin(t*1.2+p.ph)*0.18;
      p.y+=p.vy;p.ph+=0.035;
      if(p.y<-12){p.y=H+12;p.x=Math.random()*W;p.trail=[];}
      if(p.x<0||p.x>W){p.vx*=-1;p.trail=[];}
      /* Traîne */
      for(let ti=0;ti<p.trail.length;ti++){
       const tp=ti/p.trail.length;
       const ta=p.op*tp*0.35*(0.5+0.5*Math.abs(Math.sin(p.ph)));
       ctx.beginPath();ctx.arc(p.trail[ti].x,p.trail[ti].y,p.r*tp*0.7,0,Math.PI*2);
       ctx.fillStyle=`rgba(255,235,60,${ta})`;ctx.fill();
      }
      /* Point brillant */
      const pa=p.op*(0.6+0.4*Math.abs(Math.sin(p.ph)));
      const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3.5);
      pg.addColorStop(0,`rgba(255,250,140,${pa})`);
      pg.addColorStop(0.4,`rgba(255,220,50,${pa*0.5})`);
      pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pg;ctx.fillRect(p.x-p.r*3.5,p.y-p.r*3.5,p.r*7,p.r*7);
      ctx.fillStyle=`rgba(255,255,200,${pa})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Peter Pan — silhouette en vol avec lueur dorée ── */
     const ppX=cx-W*0.10, ppY=H*0.34+Math.sin(t*0.65)*H*0.022;
     /* Lueur autour de Peter */
     const ppG=ctx.createRadialGradient(ppX,ppY,0,ppX,ppY,W*0.09);
     ppG.addColorStop(0,`rgba(255,215,80,${0.12+Math.sin(t*0.9)*0.04})`);
     ppG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ppG;ctx.fillRect(ppX-W*0.09,ppY-W*0.09,W*0.18,W*0.18);
     /* Corps */
     ctx.fillStyle='rgba(8,10,25,0.97)';
     ctx.beginPath();ctx.arc(ppX,ppY-H*0.068,W*0.022,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(ppX,ppY,W*0.022,H*0.044,Math.PI*-0.12,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(8,10,25,0.97)';ctx.lineWidth=W*0.013;ctx.lineCap='round';
     /* Bras gauche tendu vers l'avant */
     ctx.beginPath();ctx.moveTo(ppX,ppY-H*0.022);ctx.lineTo(ppX+W*0.055,ppY-H*0.042);ctx.stroke();
     /* Bras droit */
     ctx.beginPath();ctx.moveTo(ppX,ppY-H*0.022);ctx.lineTo(ppX-W*0.055,ppY-H*0.006);ctx.stroke();
     /* Cape ondulante */
     ctx.beginPath();
     ctx.moveTo(ppX-W*0.010,ppY-H*0.032);
     ctx.bezierCurveTo(ppX-W*0.045,ppY+H*0.008+Math.sin(t*1.8)*H*0.008,ppX-W*0.055,ppY+H*0.042,ppX-W*0.018,ppY+H*0.050);
     ctx.lineTo(ppX+W*0.010,ppY+H*0.022);ctx.closePath();ctx.fill();

     /* ── Capitaine Crochet — silhouette menaçante ── */
     const hhX=cx+W*0.20, hhY=H*0.70;
     /* Légère lueur rouge menaçante */
     const hhG=ctx.createRadialGradient(hhX,hhY-H*0.12,0,hhX,hhY-H*0.12,W*0.12);
     hhG.addColorStop(0,`rgba(180,30,30,${0.08+Math.sin(t*0.5)*0.03})`);
     hhG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hhG;ctx.fillRect(hhX-W*0.12,hhY-W*0.12,W*0.24,W*0.24);
     ctx.fillStyle='rgba(5,6,18,0.98)';
     ctx.beginPath();ctx.arc(hhX,hhY-H*0.185,W*0.028,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(hhX,hhY-H*0.080,W*0.034,H*0.082,0,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(5,6,18,0.98)';ctx.lineWidth=W*0.014;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(hhX,hhY-H*0.100);ctx.lineTo(hhX-W*0.065,hhY-H*0.038);ctx.stroke();
     /* Crochet doré */
     ctx.strokeStyle=`rgba(${200+Math.sin(t*1.2)*30|0},${160+Math.sin(t*1.0)*20|0},60,0.85)`;
     ctx.lineWidth=W*0.010;
     ctx.beginPath();ctx.arc(hhX+W*0.060,hhY-H*0.065,W*0.022,-Math.PI*0.3,Math.PI*0.8);ctx.stroke();
     /* Grand chapeau à plume */
     ctx.fillStyle='rgba(5,6,18,0.98)';
     ctx.beginPath();ctx.ellipse(hhX,hhY-H*0.222,W*0.050,H*0.014,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();
     ctx.moveTo(hhX-W*0.038,hhY-H*0.222);
     ctx.bezierCurveTo(hhX-W*0.040,hhY-H*0.320,hhX+W*0.040,hhY-H*0.315,hhX+W*0.038,hhY-H*0.222);
     ctx.closePath();ctx.fill();
     /* Plume rouge */
     ctx.strokeStyle=`rgba(200,50,50,${0.65+Math.sin(t*1.5)*0.15})`;ctx.lineWidth=W*0.006;
     ctx.beginPath();ctx.moveTo(hhX+W*0.036,hhY-H*0.220);
     ctx.bezierCurveTo(hhX+W*0.060,hhY-H*0.290,hhX+W*0.075,hhY-H*0.340,hhX+W*0.042,hhY-H*0.355);
     ctx.stroke();

     /* ── Bateau pirate — plus détaillé et lumineux ── */
     const shipY=H*0.86;
     /* Coque */
     ctx.fillStyle='rgba(8,5,16,0.97)';
     ctx.beginPath();
     ctx.moveTo(cx-W*0.38,shipY);
     ctx.bezierCurveTo(cx-W*0.35,shipY-H*0.045,cx-W*0.28,shipY-H*0.078,cx-W*0.22,shipY-H*0.082);
     ctx.lineTo(cx+W*0.22,shipY-H*0.082);
     ctx.bezierCurveTo(cx+W*0.28,shipY-H*0.078,cx+W*0.35,shipY-H*0.045,cx+W*0.38,shipY);
     ctx.closePath();ctx.fill();
     /* Ponts */
     ctx.fillRect(cx-W*0.22,shipY-H*0.082,W*0.44,H*0.010);
     ctx.fillRect(cx-W*0.18,shipY-H*0.092,W*0.36,H*0.010);
     /* Mâts */
     ctx.strokeStyle='rgba(8,5,16,0.97)';ctx.lineWidth=W*0.010;
     ctx.beginPath();ctx.moveTo(cx-W*0.10,shipY-H*0.082);ctx.lineTo(cx-W*0.10,shipY-H*0.340);ctx.stroke();
     ctx.beginPath();ctx.moveTo(cx+W*0.08,shipY-H*0.082);ctx.lineTo(cx+W*0.08,shipY-H*0.285);ctx.stroke();
     /* Voiles légèrement éclairées par la lune */
     const sailG1=ctx.createLinearGradient(cx-W*0.10,shipY-H*0.340,cx+W*0.04,shipY-H*0.200);
     sailG1.addColorStop(0,'rgba(55,65,110,0.92)');
     sailG1.addColorStop(0.5,'rgba(38,46,88,0.92)');
     sailG1.addColorStop(1,'rgba(22,28,60,0.95)');
     ctx.fillStyle=sailG1;
     ctx.beginPath();ctx.moveTo(cx-W*0.10,shipY-H*0.340);ctx.lineTo(cx-W*0.10,shipY-H*0.100);ctx.lineTo(cx+W*0.06,shipY-H*0.200);ctx.closePath();ctx.fill();
     const sailG2=ctx.createLinearGradient(cx+W*0.08,shipY-H*0.285,cx+W*0.22,shipY-H*0.160);
     sailG2.addColorStop(0,'rgba(50,60,105,0.90)');
     sailG2.addColorStop(0.5,'rgba(34,42,80,0.90)');
     sailG2.addColorStop(1,'rgba(18,24,55,0.95)');
     ctx.fillStyle=sailG2;
     ctx.beginPath();ctx.moveTo(cx+W*0.08,shipY-H*0.285);ctx.lineTo(cx+W*0.08,shipY-H*0.095);ctx.lineTo(cx+W*0.22,shipY-H*0.160);ctx.closePath();ctx.fill();
     /* Liseret lumineux sur les voiles — reflet de lune */
     ctx.strokeStyle=`rgba(180,200,255,${0.18+Math.sin(t*0.4)*0.05})`;ctx.lineWidth=0.8;
     ctx.beginPath();ctx.moveTo(cx-W*0.10,shipY-H*0.340);ctx.lineTo(cx+W*0.06,shipY-H*0.200);ctx.stroke();
     ctx.beginPath();ctx.moveTo(cx+W*0.08,shipY-H*0.285);ctx.lineTo(cx+W*0.22,shipY-H*0.160);ctx.stroke();
     /* Reflets de lune sur l'eau — plus visibles */
     const reflX=moonX*0.6+cx*0.4;
     for(let ri=0;ri<5;ri++){
      const ry=H*(0.90+ri*0.022);
      const rw=W*(0.09-ri*0.014)*(0.7+Math.sin(t*1.2+ri)*0.3);
      ctx.fillStyle=`rgba(240,245,200,${(0.18-ri*0.030)*(0.6+Math.sin(t*0.9+ri*0.5)*0.4)})`;
      ctx.beginPath();ctx.ellipse(reflX,ry,rw,H*0.006,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette douce — coins seulement, centre libre ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.22,cx,H*0.50,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.60,'rgba(4,5,12,0.06)');
     vg.addColorStop(0.82,'rgba(4,5,12,0.22)');
     vg.addColorStop(1,'rgba(4,5,12,0.52)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
