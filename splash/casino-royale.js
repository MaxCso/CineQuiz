// CinéQuiz splash chunk — Casino Royale
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Casino Royale"]={
   name:'Casino Royale',
   color:'40,80,160',
   ref:'Casino Royale \u2014 Martin Campbell, 2006',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : vert casino du poster ── */
    let _crStyle=document.getElementById('_cr_splash_style');
    if(!_crStyle){_crStyle=document.createElement('style');_crStyle.id='_cr_splash_style';document.head.appendChild(_crStyle);}
    _crStyle.textContent=`
      
      
      

    `;
    const _crWatch=setInterval(()=>{if(stop.v){_crStyle.textContent='';clearInterval(_crWatch);}},200);

    /* ── SVG silhouette Bond ── */
    const BOND_SVG='images/sprite_31.svg';
    const bondImg=new Image();let bondReady=false;
    bondImg.onload=()=>{bondReady=true;};bondImg.src=BOND_SVG;

    /* SVG 736×1424 — Bond debout, légèrement à gauche comme sur le poster */
    const SVG_W=736,SVG_H=1424;
    const dstH=H*0.88;
    const dstW=dstH*(SVG_W/SVG_H);
    /* Décalé à gauche comme sur le poster — tête sous le logo CinéQuiz */
    const dstX=cx-dstW*0.72;
    const dstY=H*0.18;

    /* ── Roulette animée — cercle en arrière-plan haut-droit, sous le logo ── */
    const ROULETTE_R=W*0.42;
    const ROULETTE_CX=cx+W*0.32;
    const ROULETTE_CY=H*0.42;
    let roulAngle=0;

    /* ── Symboles de cartes tombants ── */
    const SUITS=['♠','♥','♦','♣'];
    const SUIT_COLORS=['rgba(15,15,15,0.85)','rgba(160,20,20,0.85)','rgba(200,170,40,0.85)','rgba(15,15,15,0.85)'];
    const symbols=Array.from({length:48},()=>{ const si=Math.floor(Math.random()*4);
     return {
      x:Math.random()*W,
      y:-40-Math.random()*H*0.8,
      vy:0.35+Math.random()*0.60,
      vx:(Math.random()-0.5)*0.18,
      size:W*(0.038+Math.random()*0.065),
      rot:Math.random()*Math.PI*2,
      vrot:(Math.random()-0.5)*0.013,
      op:0.38+Math.random()*0.52,
      suit:SUITS[si],
      color:SUIT_COLORS[si],
     };
    });
    /* Distribuer verticalement dès le début */
    symbols.forEach((s,i)=>{s.y=-30+(i/48)*H*1.3;});

    /* ── Halo derrière Bond ── */
    function drawHalo(){
     const hx=dstX+dstW*0.55, hy=dstY+dstH*0.22;
     const hR=W*0.30;
     const hg=ctx.createRadialGradient(hx,hy,W*0.03,hx,hy,hR);
     hg.addColorStop(0,`rgba(240,225,150,${0.82+Math.sin(t*0.8)*0.05})`);
     hg.addColorStop(0.35,`rgba(220,195,100,${0.38+Math.sin(t*0.6)*0.04})`);
     hg.addColorStop(0.70,'rgba(180,140,40,0.08)');
     hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.beginPath();ctx.arc(hx,hy,hR,0,Math.PI*2);ctx.fill();
    }

    /* ── Roulette de casino ── */
    function drawRoulette(rx,ry,r,angle){
     ctx.save();
     ctx.translate(rx,ry);
     ctx.rotate(angle);

     /* Bordure or */
     ctx.strokeStyle='rgba(210,180,60,0.75)';ctx.lineWidth=W*0.025;
     ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();

     /* Segments alternés rouge/noir */
     const N=18;
     for(let i=0;i<N;i++){
      const a1=(i/N)*Math.PI*2, a2=((i+1)/N)*Math.PI*2;
      ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,r*0.90,a1,a2);ctx.closePath();
      ctx.fillStyle=i%2===0?'rgba(150,20,20,0.72)':'rgba(8,8,8,0.72)';
      ctx.fill();
     }

     /* Rayons intérieurs */
     ctx.strokeStyle='rgba(210,180,60,0.35)';ctx.lineWidth=1.5;
     for(let i=0;i<N;i++){
      const a=(i/N)*Math.PI*2;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*r*0.90,Math.sin(a)*r*0.90);ctx.stroke();
     }

     /* Centre cercle or */
     const cg=ctx.createRadialGradient(0,0,0,0,0,r*0.18);
     cg.addColorStop(0,'rgba(240,220,120,0.95)');cg.addColorStop(1,'rgba(180,140,40,0.70)');
     ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,0,r*0.18,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(140,100,20,0.60)';ctx.lineWidth=2;
     ctx.beginPath();ctx.arc(0,0,r*0.18,0,Math.PI*2);ctx.stroke();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Fond vert casino */
     const bg=ctx.createLinearGradient(0,0,W,H);
     bg.addColorStop(0.00,'#1e6830');
     bg.addColorStop(0.45,'#1a5c2a');
     bg.addColorStop(0.80,'#143d1e');
     bg.addColorStop(1.00,'#0c2812');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Roulette en arrière-plan */
     roulAngle+=0.004;
     drawRoulette(ROULETTE_CX,ROULETTE_CY,ROULETTE_R,roulAngle);

     /* Halo doré derrière Bond */
     drawHalo();

     /* Symboles de cartes tombants */
     ctx.textBaseline='middle';ctx.textAlign='center';
     for(const s of symbols){
      s.y+=s.vy;s.x+=s.vx;s.rot+=s.vrot;
      if(s.y>H+40){
       s.y=-40;s.x=Math.random()*W;
       const si=Math.floor(Math.random()*4);
       s.suit=SUITS[si];s.color=SUIT_COLORS[si];
      }
      ctx.save();
      ctx.globalAlpha=s.op;
      ctx.translate(s.x,s.y);ctx.rotate(s.rot);
      ctx.font=`bold ${s.size}px serif`;
      ctx.fillStyle=s.color;
      ctx.fillText(s.suit,0,0);
      ctx.restore();
     }

     /* Silhouette Bond */
     if(bondReady){
      ctx.save();
      ctx.globalAlpha=0.97;
      ctx.drawImage(bondImg,dstX,dstY,dstW,dstH);
      ctx.restore();
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.08,cx,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.12)');
     vg.addColorStop(1,'rgba(0,0,0,0.78)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain */
     for(let i=0;i<28;i++){const g=8+Math.random()*18|0;ctx.fillStyle=`rgba(${g+5},${g+10},${g+5},${Math.random()*0.016})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
