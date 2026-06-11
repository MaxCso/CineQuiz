// CinéQuiz splash chunk — Bienvenue à Gattaca
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Bienvenue à Gattaca"]={
   name:'Bienvenue \u00e0 Gattaca',
   color:'40,80,160',
   ref:'Gattaca \u2014 Andrew Niccol, 1997',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_gat_s');
    if(!_s){_s=document.createElement('style');_s.id='_gat_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Double hélice d'ADN */
    const DNA_LEN=32;
    /* Étoiles */
    const stars=Array.from({length:65},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+0.2,op:0.20+Math.random()*0.40,ph:Math.random()*Math.PI*2}));
    /* Particules génétiques */
    const genParts=Array.from({length:30},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.18,vy:(Math.random()-0.5)*0.14,r:Math.random()*1.4+0.3,op:0.12+Math.random()*0.20,ph:Math.random()*Math.PI*2,col:Math.random()<0.5?'80,160,255':'255,180,60'}));

    function frame(){
     if(stop.v)return;

     /* ── Fond bleu électrique profond — inspiré affiche Gattaca ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#010a1a');
     bg.addColorStop(0.25,'#021428');
     bg.addColorStop(0.55,'#042a50');
     bg.addColorStop(0.80,'#062040');
     bg.addColorStop(1.00,'#010e1e');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo cyan central — sphère lumineuse de l'affiche */
     const glow1=ctx.createRadialGradient(cx,H*0.48,0,cx,H*0.48,W*0.72);
     glow1.addColorStop(0,'rgba(0,180,255,0.18)');
     glow1.addColorStop(0.35,'rgba(0,120,220,0.12)');
     glow1.addColorStop(0.65,'rgba(0,60,160,0.06)');
     glow1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow1;ctx.fillRect(0,0,W,H);

     /* Second halo plus vif au centre */
     const glow2=ctx.createRadialGradient(cx,H*0.42,0,cx,H*0.42,W*0.38);
     glow2.addColorStop(0,'rgba(40,200,255,0.12)');
     glow2.addColorStop(0.5,'rgba(10,100,200,0.06)');
     glow2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow2;ctx.fillRect(0,0,W,H);

     /* Arc lumineux en haut — planète / sphère bleue de l'affiche */
     const arcG=ctx.createRadialGradient(cx,-H*0.05,W*0.10,cx,-H*0.05,W*0.90);
     arcG.addColorStop(0,'rgba(0,160,255,0.30)');
     arcG.addColorStop(0.3,'rgba(0,100,200,0.14)');
     arcG.addColorStop(0.6,'rgba(0,50,140,0.06)');
     arcG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=arcG;ctx.fillRect(0,0,W,H*0.45);

     /* Étoiles — légèrement plus lumineuses sur fond bleu */
     for(const s of stars){s.ph+=0.014;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(180,230,255,${s.op*(0.5+0.5*Math.sin(s.ph))})`;ctx.fill();}

     /* Particules génétiques */
     for(const p of genParts){
      p.x+=p.vx;p.y+=p.vy;p.ph+=0.020;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.col},${p.op*(0.5+0.5*Math.abs(Math.sin(p.ph)))})`;ctx.fill();
     }

     /* Double hélice ADN */
     const helixCX=cx,helixY0=0,helixH=H,helixRX=W*0.090;
     ctx.lineWidth=1.8;ctx.lineCap='round';
     /* Brin 1 */
     ctx.strokeStyle='rgba(80,160,255,0.65)';
     ctx.beginPath();
     for(let i=0;i<=DNA_LEN;i++){
      const y=helixY0+i*(helixH/DNA_LEN);
      const x=helixCX+Math.cos(i*(Math.PI*2/8)+t*0.5)*helixRX;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
     }
     ctx.stroke();
     /* Brin 2 */
     ctx.strokeStyle='rgba(255,180,60,0.65)';
     ctx.beginPath();
     for(let i=0;i<=DNA_LEN;i++){
      const y=helixY0+i*(helixH/DNA_LEN);
      const x=helixCX+Math.cos(i*(Math.PI*2/8)+t*0.5+Math.PI)*helixRX;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
     }
     ctx.stroke();
     /* Barreaux — liaisons */
     for(let i=0;i<=DNA_LEN;i+=2){
      const y=helixY0+i*(helixH/DNA_LEN);
      const x1=helixCX+Math.cos(i*(Math.PI*2/8)+t*0.5)*helixRX;
      const x2=helixCX+Math.cos(i*(Math.PI*2/8)+t*0.5+Math.PI)*helixRX;
      const alpha=0.25+Math.abs(Math.cos(i*(Math.PI*2/8)+t*0.5))*0.25;
      ctx.strokeStyle=`rgba(180,220,255,${alpha})`;ctx.lineWidth=1.0;
      ctx.beginPath();ctx.moveTo(x1,y);ctx.lineTo(x2,y);ctx.stroke();
      /* Nœuds */
      ctx.fillStyle=`rgba(80,160,255,${alpha+0.20})`;ctx.beginPath();ctx.arc(x1,y,W*0.007,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,180,60,${alpha+0.20})`;ctx.beginPath();ctx.arc(x2,y,W*0.007,0,Math.PI*2);ctx.fill();
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
