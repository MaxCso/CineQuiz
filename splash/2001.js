// CinéQuiz splash chunk — 2001
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["2001"]={
   name:'2001',
   color:'80,120,255',
   ref:'2001: A Space Odyssey \u2014 Kubrick, 1968',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.74';
    let t=0;
    const cx=W/2, cy=H/2;

    /* ── Étoiles fixes (pré-calculées) ── */
    const stars=Array.from({length:280},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:Math.random()*1.4+0.2,
     op:Math.random()*0.7+0.2,
     twinkle:Math.random()*Math.PI*2,
     tfreq:Math.random()*0.04+0.01
    }));

    /* ── Jupiter (planète rayée) — pré-dessinée ── */
    const jupR=W*0.13;
    const jupX=W*0.76, jupY=H*0.17;
    const jupC=document.createElement('canvas');
    jupC.width=jupR*2+40; jupC.height=jupR*2+40;
    const jx=jupC.getContext('2d');
    const jcx=jupR+20, jcy=jupR+20;
    /* halo atmosphérique */
    const jAtm=jx.createRadialGradient(jcx,jcy,jupR*0.85,jcx,jcy,jupR*1.35);
    jAtm.addColorStop(0,'rgba(180,120,60,0.22)');
    jAtm.addColorStop(1,'rgba(0,0,0,0)');
    jx.fillStyle=jAtm; jx.fillRect(0,0,jupC.width,jupC.height);
    /* disque */
    jx.save(); jx.beginPath(); jx.arc(jcx,jcy,jupR,0,Math.PI*2); jx.clip();
    /* fond beige-orangé */
    const jBase=jx.createRadialGradient(jcx-jupR*0.25,jcy-jupR*0.25,0,jcx,jcy,jupR);
    jBase.addColorStop(0,'rgba(220,185,130,1)');
    jBase.addColorStop(0.5,'rgba(195,150,95,1)');
    jBase.addColorStop(1,'rgba(140,90,50,1)');
    jx.fillStyle=jBase; jx.fillRect(0,0,jupC.width,jupC.height);
    /* bandes nuageuses */
    const bands=[
     {y:-0.55,h:0.10,c:'rgba(160,90,45,0.75)'},
     {y:-0.38,h:0.07,c:'rgba(230,200,155,0.6)'},
     {y:-0.22,h:0.12,c:'rgba(145,80,40,0.8)'},
     {y:-0.05,h:0.08,c:'rgba(210,175,120,0.55)'},
     {y: 0.08,h:0.14,c:'rgba(130,70,35,0.85)'},
     {y: 0.28,h:0.09,c:'rgba(225,190,140,0.5)'},
     {y: 0.42,h:0.11,c:'rgba(155,95,50,0.75)'},
    ];
    for(const b of bands){
      jx.fillStyle=b.c;
      jx.fillRect(0,jcy+b.y*jupR,jupC.width,b.h*jupR*2);
    }
    /* grande tache rouge */
    jx.save();
    jx.translate(jcx-jupR*0.1, jcy+jupR*0.12);
    jx.scale(1,0.55);
    const grs=jx.createRadialGradient(0,0,0,0,0,jupR*0.22);
    grs.addColorStop(0,'rgba(180,60,30,0.85)');
    grs.addColorStop(0.5,'rgba(200,80,40,0.6)');
    grs.addColorStop(1,'rgba(160,60,25,0)');
    jx.fillStyle=grs; jx.beginPath(); jx.arc(0,0,jupR*0.22,0,Math.PI*2); jx.fill();
    jx.restore();
    /* reflet spéculaire */
    const jSpec=jx.createRadialGradient(jcx-jupR*0.35,jcy-jupR*0.35,0,jcx-jupR*0.2,jcy-jupR*0.2,jupR*0.6);
    jSpec.addColorStop(0,'rgba(255,245,225,0.22)');
    jSpec.addColorStop(1,'rgba(255,245,225,0)');
    jx.fillStyle=jSpec; jx.fillRect(0,0,jupC.width,jupC.height);
    jx.restore();
    /* bord sombre */
    const jEdge=jx.createRadialGradient(jcx,jcy,jupR*0.78,jcx,jcy,jupR);
    jEdge.addColorStop(0,'rgba(0,0,0,0)');
    jEdge.addColorStop(1,'rgba(0,0,0,0.55)');
    jx.fillStyle=jEdge; jx.beginPath(); jx.arc(jcx,jcy,jupR,0,Math.PI*2); jx.fill();

    /* ── Monolithe (pré-dessiné) ── */
    const monoW=W*0.16, monoH=H*0.18;
    const monoX=W*0.5-monoW/2, monoY=H*0.65;
    const monoC=document.createElement('canvas');
    monoC.width=monoW+40; monoC.height=monoH+40;
    const mx=monoC.getContext('2d');
    /* reflet sur les faces */
    const moFace=mx.createLinearGradient(10,0,monoW+10,0);
    moFace.addColorStop(0,'rgba(2,2,3,1)');
    moFace.addColorStop(0.35,'rgba(18,18,22,1)');
    moFace.addColorStop(0.55,'rgba(28,28,35,1)');
    moFace.addColorStop(0.75,'rgba(12,12,16,1)');
    moFace.addColorStop(1,'rgba(3,3,4,1)');
    mx.fillStyle=moFace;
    mx.fillRect(10,10,monoW,monoH);
    /* liseré lumineux sur les arêtes */
    mx.strokeStyle='rgba(140,165,220,0.35)'; mx.lineWidth=1;
    mx.strokeRect(10,10,monoW,monoH);
    mx.strokeStyle='rgba(180,200,255,0.15)'; mx.lineWidth=0.5;
    mx.strokeRect(11,11,monoW-2,monoH-2);
    /* ombre portée sous le monolithe */
    const moShadow=mx.createLinearGradient(0,monoH+10,0,monoH+40);
    moShadow.addColorStop(0,'rgba(0,0,0,0.4)');
    moShadow.addColorStop(1,'rgba(0,0,0,0)');
    mx.fillStyle=moShadow;
    mx.beginPath();
    mx.ellipse(monoW/2+10,monoH+14,monoW*0.6,8,0,0,Math.PI*2);
    mx.fill();

    /* ── Rayons du stargate (couleur) — dynamiques ── */
    const RAYS=80;

    /* ── HAL 9000 — pré-calcul position ── */
    const halR=W*0.085;
    const halX=W/2, halY=H*0.29;
    let halPulse=0;

    function frame(){
     if(stop.v)return;
     /* fond espace */
     ctx.fillStyle='rgba(0,0,2,0.22)'; ctx.fillRect(0,0,W,H);

     /* étoiles scintillantes */
     for(const s of stars){
      s.twinkle+=s.tfreq;
      const op=s.op*(0.6+Math.sin(s.twinkle)*0.4);
      ctx.fillStyle=`rgba(255,255,255,${op})`;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
     }

     /* Jupiter */
     ctx.drawImage(jupC, jupX-jupR-20, jupY-jupR-20);

     /* rayons stargate — depuis Jupiter */
     const starGX=jupX, starGY=jupY;
     for(let i=0;i<RAYS;i++){
      const a=(i/RAYS)*Math.PI*2+t*0.18;
      const spd=1+((i*13)%5)*0.35;
      const len=((t*spd*55+i*200)%(Math.hypot(W,H)*0.9));
      const hue=(i/RAYS*360+t*45)%360;
      ctx.strokeStyle=`hsla(${hue},75%,65%,0.13)`;
      ctx.lineWidth=0.9;
      ctx.beginPath();
      ctx.moveTo(starGX,starGY);
      ctx.lineTo(starGX+Math.cos(a)*len, starGY+Math.sin(a)*len);
      ctx.stroke();
     }

     /* halo de Jupiter */
     const jHalo=ctx.createRadialGradient(jupX,jupY,jupR*0.5,jupX,jupY,jupR*2.2);
     jHalo.addColorStop(0,`rgba(180,${120+Math.sin(t*0.4)*15|0},50,${0.08+Math.sin(t*0.6)*0.03})`);
     jHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=jHalo; ctx.fillRect(0,0,W,H);

     /* monolithe */
     const moFloat=Math.sin(t*0.5)*3; /* légère lévitation */
     ctx.drawImage(monoC, monoX-10, monoY+moFloat-10);
     /* halo du monolithe (lueur bleue froide) */
     const moHalo=ctx.createRadialGradient(W*0.5,monoY+monoH/2,10,W*0.5,monoY+monoH/2,monoW*5);
     moHalo.addColorStop(0,`rgba(80,120,200,${0.14+Math.sin(t*1.2)*0.06})`);
     moHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moHalo; ctx.fillRect(0,0,W,H);

     /* ── HAL 9000 ── */
     halPulse+=0.028;
     const hp=halPulse;
     const hx=halX, hy=halY;

     /* lueur rouge ambiante */
     const halAmb=ctx.createRadialGradient(hx,hy,halR,hx,hy,halR*4.5);
     halAmb.addColorStop(0,`rgba(180,15,5,${0.18+Math.sin(hp)*0.07})`);
     halAmb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halAmb; ctx.fillRect(0,0,W,H);

     /* anneau externe argenté — bord sombre */
     ctx.beginPath(); ctx.arc(hx,hy,halR*1.48,0,Math.PI*2);
     const ringOuter=ctx.createLinearGradient(hx-halR*1.48,hy-halR*1.48,hx+halR*1.48,hy+halR*1.48);
     ringOuter.addColorStop(0,'rgba(60,60,65,1)');
     ringOuter.addColorStop(0.5,'rgba(30,30,33,1)');
     ringOuter.addColorStop(1,'rgba(50,50,55,1)');
     ctx.fillStyle=ringOuter; ctx.fill();

     /* anneau argenté brillant */
     ctx.beginPath(); ctx.arc(hx,hy,halR*1.38,0,Math.PI*2);
     const ringMetal=ctx.createLinearGradient(hx-halR*1.38,hy-halR*1.5,hx+halR*1.38,hy+halR*1.5);
     ringMetal.addColorStop(0,'rgba(195,195,200,1)');
     ringMetal.addColorStop(0.25,'rgba(235,235,240,1)');
     ringMetal.addColorStop(0.45,'rgba(160,160,165,1)');
     ringMetal.addColorStop(0.65,'rgba(210,210,215,1)');
     ringMetal.addColorStop(0.85,'rgba(120,120,125,1)');
     ringMetal.addColorStop(1,'rgba(180,180,185,1)');
     ctx.fillStyle=ringMetal; ctx.fill();

     /* verre sombre intérieur (entre anneau et lentille) */
     ctx.beginPath(); ctx.arc(hx,hy,halR*1.12,0,Math.PI*2);
     const glassRing=ctx.createRadialGradient(hx,hy,halR*0.7,hx,hy,halR*1.12);
     glassRing.addColorStop(0,'rgba(18,14,14,1)');
     glassRing.addColorStop(0.5,'rgba(12,9,9,1)');
     glassRing.addColorStop(1,'rgba(8,5,5,1)');
     ctx.fillStyle=glassRing; ctx.fill();

     /* lentille rouge principale */
     ctx.beginPath(); ctx.arc(hx,hy,halR,0,Math.PI*2);
     const lens=ctx.createRadialGradient(hx,hy,0,hx,hy,halR);
     const rPulse=180+Math.sin(hp*1.3)*20|0;
     lens.addColorStop(0,`rgba(255,${100+Math.sin(hp)*30|0},20,1)`);
     lens.addColorStop(0.15,`rgba(${rPulse},15,5,1)`);
     lens.addColorStop(0.45,'rgba(120,8,3,1)');
     lens.addColorStop(0.75,'rgba(55,3,2,1)');
     lens.addColorStop(1,'rgba(20,1,1,1)');
     ctx.fillStyle=lens; ctx.fill();

     /* anneaux concentriques internes (profondeur de la lentille) */
     for(let ri=1;ri<=3;ri++){
       ctx.beginPath(); ctx.arc(hx,hy,halR*(0.35+ri*0.18),0,Math.PI*2);
       ctx.strokeStyle=`rgba(80,5,3,${0.35-ri*0.08})`;
       ctx.lineWidth=1;
       ctx.stroke();
     }

     /* point chaud central jaune-orange */
     const hotR=halR*0.12;
     const hot=ctx.createRadialGradient(hx,hy,0,hx,hy,hotR*2.5);
     hot.addColorStop(0,'rgba(255,240,80,1)');
     hot.addColorStop(0.3,'rgba(255,180,30,0.9)');
     hot.addColorStop(0.7,`rgba(255,80,10,${0.5+Math.sin(hp*2)*0.2})`);
     hot.addColorStop(1,'rgba(200,20,5,0)');
     ctx.fillStyle=hot;
     ctx.beginPath(); ctx.arc(hx,hy,hotR*2.5,0,Math.PI*2); ctx.fill();

     /* reflets blancs sur le verre (caractéristiques de HAL) */
     /* reflet principal — arc en haut */
     ctx.save();
     ctx.beginPath(); ctx.arc(hx,hy,halR,0,Math.PI*2); ctx.clip();
     const ref1=ctx.createLinearGradient(hx-halR*0.6,hy-halR*0.85,hx-halR*0.1,hy-halR*0.45);
     ref1.addColorStop(0,'rgba(255,255,255,0.0)');
     ref1.addColorStop(0.3,'rgba(255,255,255,0.55)');
     ref1.addColorStop(0.6,'rgba(255,255,255,0.25)');
     ref1.addColorStop(1,'rgba(255,255,255,0.0)');
     ctx.fillStyle=ref1;
     ctx.fillRect(hx-halR,hy-halR,halR*2,halR*0.7);
     /* petit reflet secondaire à gauche */
     ctx.beginPath();
     ctx.ellipse(hx-halR*0.52, hy-halR*0.55, halR*0.08, halR*0.18, -0.4, 0, Math.PI*2);
     ctx.fillStyle='rgba(255,255,255,0.45)';
     ctx.fill();
     ctx.restore();

     /* vignette */
     const vg=ctx.createRadialGradient(cx,cy,H*0.08,cx,cy,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.6,'rgba(0,0,2,0.25)');
     vg.addColorStop(1,'rgba(0,0,2,0.92)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=0.014; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
