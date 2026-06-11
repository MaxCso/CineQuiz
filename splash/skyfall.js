// CinéQuiz splash chunk — Skyfall
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Skyfall"]={
   name:'Skyfall',
   color:'40,80,160',
   ref:'Skyfall \u2014 Sam Mendes, 2012',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : bleu-vert sombre du poster ── */
    let _sfStyle=document.getElementById('_sf_splash_style');
    if(!_sfStyle){_sfStyle=document.createElement('style');_sfStyle.id='_sf_splash_style';document.head.appendChild(_sfStyle);}
    _sfStyle.textContent=`
      
      
      

    `;
    const _sfWatch=setInterval(()=>{if(stop.v){_sfStyle.textContent='';clearInterval(_sfWatch);}},200);

    /* ── SVG : la silhouette Bond+main ── */
    const SF_SVG='images/sprite_30.svg';
    const sfImg=new Image();let sfReady=false;
    sfImg.onload=()=>{sfReady=true;};sfImg.src=SF_SVG;

    /* SVG original : 399 × 630
       Bond est à ~50% de la largeur et ~28% de la hauteur du SVG.
       On scale pour que la main atteigne exactement le bas (dstY+dstH=H),
       et on centre horizontalement sur Bond (≈cx du SVG). */
    const SVG_W=399,SVG_H=630;
    /* Bond (personnage) est à x≈52.6%, y≈28% du SVG
       Main en bas à y≈100% du SVG
       Objectif : personnage centré milieu écran, main vers 82% de l'écran */
    const dstH=H*0.82;
    const dstW=dstH*(SVG_W/SVG_H);
    /* Centrer Bond (à 52.6% du SVG) sur cx */
    const dstX=cx-dstW*0.526;
    /* Bond à 28% du SVG → on veut Bond à 42% de l'écran (milieu visuel)
       dstY + dstH*0.28 = H*0.42  →  dstY = H*0.42 - dstH*0.28 */
    const dstY0=H*0.42-dstH*0.28;  /* position de départ */
    let dstY=dstY0;
    /* Descente lente : Bond glisse vers le bas sur ~18s, puis reset doux */
    const driftMax=H*0.10;   /* amplitude max de la descente (~10% de H) */
    const driftSpd=0.055;    /* px/frame — légèrement plus rapide */

    /* ── Léger balancement de la silhouette ── */
    let swingT=0;

    /* ── Bulles aquatiques ── */
    const bubbles=Array.from({length:90},()=>{
     return {
      x:cx+(Math.random()-0.5)*W*0.90,
      y:H*0.10+Math.random()*H*0.90,
      vy:-(0.10+Math.random()*0.45),
      r:Math.random()*3.0+0.5,
      op:Math.random()*0.22+0.04,
      wobble:Math.random()*Math.PI*2,
      wobbleSpd:0.015+Math.random()*0.018,
     };
    });
    /* Micro-bulles fines — traîne de bulles rapides */
    const microbubbles=Array.from({length:60},()=>({
     x:cx+(Math.random()-0.5)*W*0.80,
     y:H*0.20+Math.random()*H*0.80,
     vy:-(0.35+Math.random()*0.70),
     r:Math.random()*1.2+0.15,
     op:Math.random()*0.16+0.05,
     wobble:Math.random()*Math.PI*2,
     wobbleSpd:0.022+Math.random()*0.030,
    }));

    /* ── Rayons lumineux depuis le haut ── */
    const rays=Array.from({length:7},(_,i)=>({
     angle:-Math.PI*0.5+(-0.45+i*0.15),
     op:0.018+Math.random()*0.022,
     width:W*(0.035+Math.random()*0.055),
     phase:Math.random()*Math.PI*2,
    }));

    /* ── Anneaux de profondeur — effet eau ── */
    const rings=Array.from({length:5},(_,i)=>({
     r:W*(0.06+i*0.16),
     life:i/5,
     spd:0.0020+Math.random()*0.0010,
    }));

    /* ── Particules lumineuses flottantes — poussière sous-marine ── */
    const motes=Array.from({length:45},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vx:(Math.random()-0.5)*0.12,
     vy:-(Math.random()*0.08+0.02),
     r:Math.random()*1.5+0.2,
     op:Math.random()*0.20+0.04,
     phase:Math.random()*Math.PI*2,
     phSpd:0.015+Math.random()*0.025,
    }));

    /* ── Éclats de lumière à la surface ── */
    const glints=Array.from({length:12},()=>({
     x:Math.random()*W,
     phase:Math.random()*Math.PI*2,
     spd:0.025+Math.random()*0.040,
     size:W*(0.004+Math.random()*0.008),
     op:Math.random()*0.35+0.10,
    }));

    function frame(){
     if(stop.v)return;

     /* Fond dégradé bleu-vert du poster */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#2a5560');
     bg.addColorStop(0.30,'#1e4550');
     bg.addColorStop(0.60,'#183840');
     bg.addColorStop(0.85,'#0e2530');
     bg.addColorStop(1.00,'#071520');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo lumineux derrière la silhouette */
     const halo=ctx.createRadialGradient(cx,H*0.42,W*0.02,cx,H*0.42,W*0.52);
     halo.addColorStop(0,`rgba(100,180,190,${0.14+Math.sin(t*0.5)*0.04})`);
     halo.addColorStop(0.40,'rgba(60,120,140,0.06)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

     /* ── Rayons lumineux depuis surface ── */
     for(const ray of rays){
      ray.phase+=0.008;
      const rayOp=ray.op*(0.7+0.3*Math.sin(ray.phase));
      const len=H*1.2;
      ctx.save();
      ctx.translate(cx,0);ctx.rotate(ray.angle+Math.PI/2);
      const rg=ctx.createLinearGradient(0,0,0,len);
      rg.addColorStop(0,`rgba(100,180,200,${rayOp*1.8})`);
      rg.addColorStop(0.4,`rgba(80,160,180,${rayOp*0.8})`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;
      ctx.beginPath();ctx.moveTo(-ray.width/2,0);ctx.lineTo(ray.width/2,0);
      ctx.lineTo(ray.width*0.8,len);ctx.lineTo(-ray.width*0.8,len);ctx.closePath();
      ctx.fill();
      ctx.restore();
     }

     /* ── Anneaux de profondeur ── */
     for(const ring of rings){
      ring.life+=ring.spd;
      if(ring.life>1){ring.life=0;}
      const rOp=Math.sin(ring.life*Math.PI)*0.08;
      const rR=ring.r+ring.life*W*0.25;
      ctx.strokeStyle=`rgba(100,180,200,${rOp})`;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.ellipse(cx,H*0.38,rR,rR*0.22,0,0,Math.PI*2);ctx.stroke();
     }

     /* ── Particules lumineuses flottantes ── */
     for(const m of motes){
      m.x+=m.vx;m.y+=m.vy;m.phase+=m.phSpd;
      if(m.y<-5){m.y=H;m.x=Math.random()*W;}
      if(m.x<-2)m.x=W+2;if(m.x>W+2)m.x=-2;
      const mo=m.op*(0.5+0.5*Math.abs(Math.sin(m.phase)));
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(150,215,225,${mo})`;ctx.fill();
     }

     /* ── Éclats de lumière surface ── */
     for(const g of glints){
      g.phase+=g.spd;
      const go=g.op*Math.abs(Math.sin(g.phase));
      if(go>0.05){
       ctx.save();ctx.translate(g.x,H*0.04);
       const gl=ctx.createRadialGradient(0,0,0,0,0,g.size*8);
       gl.addColorStop(0,`rgba(200,240,245,${go})`);gl.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=gl;ctx.beginPath();ctx.arc(0,0,g.size*8,0,Math.PI*2);ctx.fill();

       ctx.restore();
      }
     }

     /* ── Bulles aquatiques ── */
     for(const b of bubbles){
      b.y+=b.vy;b.wobble+=b.wobbleSpd;
      b.x+=Math.sin(b.wobble)*0.25;
      if(b.y<-10){b.y=H*0.5+Math.random()*H*0.5;b.x=cx+(Math.random()-0.5)*W*0.70;}
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(140,200,210,${b.op*(0.5+0.5*Math.sin(b.wobble))})`;
      ctx.lineWidth=0.7;ctx.stroke();
     }
     /* ── Micro-bulles rapides ── */
     for(const mb of microbubbles){
      mb.y+=mb.vy;mb.wobble+=mb.wobbleSpd;
      mb.x+=Math.sin(mb.wobble)*0.18;
      if(mb.y<-10){mb.y=H+mb.r;mb.x=cx+(Math.random()-0.5)*W*0.80;}
      ctx.beginPath();ctx.arc(mb.x,mb.y,mb.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(160,215,225,${mb.op*(0.4+0.6*Math.abs(Math.sin(mb.wobble)))})`;
      ctx.lineWidth=0.5;ctx.stroke();
     }

     /* ── Silhouette SVG — descente lente + léger balancement ── */
     swingT+=0.016;
     /* Descente continue et douce — reset progressif quand limite atteinte */
     dstY+=driftSpd;
     if(dstY>dstY0+driftMax){ dstY=dstY0; }
     const swingX=Math.sin(swingT*0.35)*W*0.006;
     const swingY=Math.sin(swingT*0.25)*H*0.003;
     /* ── Animation coulée : rotation lente sous-marine + étirement courant ── */
     /* Rotation très douce — corps qui tournoie au gré du courant (±2.2°) */
     const sinkRot=Math.sin(swingT*0.18)*0.038+Math.sin(swingT*0.09)*0.014;
     /* Légère compression/étirement vertical — effet flottabilité nulle */
     const sinkScaleY=1+Math.sin(swingT*0.22)*0.012;
     /* Dérive latérale subtile — courant sous-marin lent */
     const driftX=Math.sin(swingT*0.11)*W*0.008;
     if(sfReady){
      ctx.save();
      ctx.globalAlpha=0.95;
      /* Pivot au centre de Bond dans le SVG (~52.6% x, ~28% y) */
      const pivX=dstX+swingX+driftX+dstW*0.526;
      const pivY=dstY+swingY+dstH*0.28;
      ctx.translate(pivX,pivY);
      ctx.rotate(sinkRot);
      ctx.scale(1,sinkScaleY);
      ctx.drawImage(sfImg,-dstW*0.526,-dstH*0.28,dstW,dstH);
      ctx.restore();
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.10,cx,H*0.48,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.15)');
     vg.addColorStop(1,'rgba(0,0,0,0.80)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain */
     for(let i=0;i<28;i++){const g=10+Math.random()*20|0;ctx.fillStyle=`rgba(${g},${g+2},${g+3},${Math.random()*0.016})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
