// CinéQuiz splash chunk — After Hours
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["After Hours"]={
   name:'After Hours',
   color:'60,40,100',
   ref:'After Hours \u2014 Martin Scorsese, 1985',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ah_s');
    if(!_s){_s=document.createElement('style');_s.id='_ah_s';document.head.appendChild(_s);}
    _s.textContent='#splash{background:#04080e!important;padding-bottom:0!important;}#splash-canvas{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-height:100%!important;}#splash::after{content:"";display:block;position:absolute;bottom:0;left:0;right:0;height:env(safe-area-inset-bottom,40px);background:#04080e;z-index:0;}#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Horloge ── */
    const clockR=W*0.36;
    const clockCX=cx;
    const clockCY=H*0.62;
    const rimW=clockR*0.10;

    /* Aiguilles animées — démarrent à 3h07, avancent en temps réel accéléré */
    const BASE_SEC = 3*3600 + 7*60; /* 3h07 en secondes */

    /* Pluie fine */
    const rain=Array.from({length:55},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vy:H*(0.009+Math.random()*0.011),
     len:H*(0.014+Math.random()*0.013),
     op:0.06+Math.random()*0.10,
    }));

    /* Particules lumineuses flottantes */
    const particles=Array.from({length:38},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.22,
     vy:-(0.08+Math.random()*0.18),
     r:Math.random()*1.8+0.4,
     op:0.12+Math.random()*0.30,
     ph:Math.random()*Math.PI*2,
     col:Math.random()<0.5?'180,140,255':'100,160,255',
    }));

    /* Étoiles fixes dans le ciel */
    const stars=Array.from({length:45},()=>({
     x:Math.random()*W, y:Math.random()*H*0.50,
     r:Math.random()*1.1+0.2,
     ph:Math.random()*Math.PI*2,
     spd:0.012+Math.random()*0.022,
    }));

    /* ── Tête de Paul Hackett ── */
    function drawHead(tt){
     const bob=Math.sin(tt*0.55)*H*0.008;
     const hx=clockCX;
     const hy=clockCY-clockR-rimW;
     const hr=W*0.080;

     /* Col */
     const neckW=hr*0.62, neckH=hr*0.55;
     const neckGrad=ctx.createLinearGradient(hx-neckW,hy,hx+neckW,hy+neckH);
     neckGrad.addColorStop(0,'#c8906a');neckGrad.addColorStop(1,'#a06848');
     ctx.fillStyle=neckGrad;
     ctx.beginPath();
     ctx.moveTo(hx-neckW*0.5,hy+bob);
     ctx.bezierCurveTo(hx-neckW*0.7,hy+neckH+bob,hx+neckW*0.7,hy+neckH+bob,hx+neckW*0.5,hy+bob);
     ctx.closePath();ctx.fill();

     /* Visage */
     const faceGrad=ctx.createRadialGradient(hx-hr*0.15,hy-hr*0.1+bob,hr*0.1,hx,hy+bob,hr*1.1);
     faceGrad.addColorStop(0,'#e8b888');faceGrad.addColorStop(0.5,'#d09868');faceGrad.addColorStop(1,'#b07848');
     ctx.fillStyle=faceGrad;
     ctx.beginPath();ctx.ellipse(hx,hy-hr*0.15+bob,hr*0.88,hr,0,0,Math.PI*2);ctx.fill();

     /* Oreilles */
     ctx.fillStyle='#c8906a';
     ctx.beginPath();ctx.ellipse(hx-hr*0.84,hy-hr*0.08+bob,hr*0.22,hr*0.30,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(hx+hr*0.84,hy-hr*0.08+bob,hr*0.22,hr*0.30,0,0,Math.PI*2);ctx.fill();

     /* Cheveux */
     ctx.fillStyle='#1a1210';
     ctx.beginPath();ctx.ellipse(hx,hy-hr*0.72+bob,hr*0.92,hr*0.52,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();
     ctx.moveTo(hx-hr*0.3,hy-hr*1.10+bob);
     ctx.bezierCurveTo(hx-hr*0.45,hy-hr*1.32+bob,hx+hr*0.1,hy-hr*1.28+bob,hx+hr*0.2,hy-hr*1.05+bob);
     ctx.bezierCurveTo(hx+hr*0.08,hy-hr*0.88+bob,hx-hr*0.2,hy-hr*0.90+bob,hx-hr*0.3,hy-hr*1.10+bob);
     ctx.fillStyle='#221814';ctx.fill();

     /* Sourcils */
     const browY=hy-hr*0.35+bob;
     ctx.strokeStyle='#2a1a10';ctx.lineWidth=hr*0.12;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(hx-hr*0.60,browY+hr*0.04);ctx.quadraticCurveTo(hx-hr*0.38,browY-hr*0.12,hx-hr*0.12,browY+hr*0.02);ctx.stroke();
     ctx.beginPath();ctx.moveTo(hx+hr*0.12,browY+hr*0.02);ctx.quadraticCurveTo(hx+hr*0.38,browY-hr*0.12,hx+hr*0.60,browY+hr*0.04);ctx.stroke();

     /* Yeux */
     const eyeY=hy-hr*0.08+bob;
     ctx.fillStyle='#f8f4ee';
     ctx.beginPath();ctx.ellipse(hx-hr*0.33,eyeY,hr*0.22,hr*0.17,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(hx+hr*0.33,eyeY,hr*0.22,hr*0.17,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='#4a3820';
     ctx.beginPath();ctx.arc(hx-hr*0.33,eyeY,hr*0.13,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(hx+hr*0.33,eyeY,hr*0.13,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='#0a0806';
     ctx.beginPath();ctx.arc(hx-hr*0.33,eyeY,hr*0.07,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(hx+hr*0.33,eyeY,hr*0.07,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.65)';
     ctx.beginPath();ctx.arc(hx-hr*0.28,eyeY-hr*0.05,hr*0.030,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(hx+hr*0.38,eyeY-hr*0.05,hr*0.030,0,Math.PI*2);ctx.fill();

     /* Nez */
     ctx.strokeStyle='rgba(120,70,40,0.50)';ctx.lineWidth=hr*0.07;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(hx,eyeY+hr*0.04);ctx.lineTo(hx-hr*0.10,eyeY+hr*0.30);ctx.quadraticCurveTo(hx-hr*0.14,eyeY+hr*0.38,hx-hr*0.05,eyeY+hr*0.40);ctx.stroke();

     /* Bouche */
     const mouthY=hy+hr*0.46+bob;
     ctx.fillStyle='#3a1510';
     ctx.beginPath();ctx.ellipse(hx,mouthY,hr*0.22,hr*0.14,0,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='#8a4030';ctx.lineWidth=hr*0.065;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(hx-hr*0.22,mouthY-hr*0.02);ctx.quadraticCurveTo(hx,mouthY-hr*0.16,hx+hr*0.22,mouthY-hr*0.02);ctx.stroke();
     ctx.beginPath();ctx.moveTo(hx-hr*0.22,mouthY-hr*0.02);ctx.quadraticCurveTo(hx,mouthY+hr*0.12,hx+hr*0.22,mouthY-hr*0.02);ctx.stroke();

     /* Ombre sous visage */
     const shd=ctx.createRadialGradient(hx,hy+hr*0.6+bob,0,hx,hy+hr*0.6+bob,hr*1.0);
     shd.addColorStop(0,'rgba(0,0,0,0.28)');shd.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shd;ctx.fillRect(hx-hr*1.0,hy+bob,hr*2.0,hr*1.2);
    }

    function drawClock(tt){
     /* Temps animé — 1 seconde réelle = 60 secondes simulées (×60) */
     const totalSec = BASE_SEC + tt * 60;
     const secAngle  = -Math.PI/2 + (totalSec % 60) / 60 * Math.PI * 2;
     const minAngle  = -Math.PI/2 + ((totalSec / 60) % 60) / 60 * Math.PI * 2;
     const hourAngle = -Math.PI/2 + ((totalSec / 3600) % 12) / 12 * Math.PI * 2;

     /* Halo pulsant autour de l'horloge */
     const haloR=clockR+rimW+W*0.06;
     const haloG=ctx.createRadialGradient(clockCX,clockCY,clockR,clockCX,clockCY,haloR);
     haloG.addColorStop(0,`rgba(60,120,220,${0.18+Math.sin(tt*0.8)*0.06})`);
     haloG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=haloG;ctx.beginPath();ctx.arc(clockCX,clockCY,haloR,0,Math.PI*2);ctx.fill();

     /* Anneau bronze */
     const rimGrad=ctx.createLinearGradient(clockCX-clockR,clockCY-clockR,clockCX+clockR,clockCY+clockR);
     rimGrad.addColorStop(0,'#d4a060');rimGrad.addColorStop(0.35,'#c08840');
     rimGrad.addColorStop(0.65,'#e8c080');rimGrad.addColorStop(1,'#b07030');
     ctx.beginPath();ctx.arc(clockCX,clockCY,clockR+rimW,0,Math.PI*2);
     ctx.fillStyle=rimGrad;ctx.fill();
     ctx.beginPath();ctx.arc(clockCX,clockCY,clockR+2,0,Math.PI*2);
     ctx.strokeStyle='rgba(80,50,20,0.6)';ctx.lineWidth=3;ctx.stroke();

     /* Cadran bleu acier */
     const faceGrad=ctx.createRadialGradient(clockCX-clockR*0.2,clockCY-clockR*0.2,clockR*0.05,clockCX,clockCY,clockR);
     faceGrad.addColorStop(0,'#d8e8f2');faceGrad.addColorStop(0.55,'#b0c8da');faceGrad.addColorStop(1,'#8aa8bc');
     ctx.beginPath();ctx.arc(clockCX,clockCY,clockR,0,Math.PI*2);
     ctx.fillStyle=faceGrad;ctx.fill();

     /* Chiffres romains */
     const romans=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
     ctx.textAlign='center';ctx.textBaseline='middle';
     for(let i=0;i<12;i++){
      const angle=-Math.PI/2+(i/12)*Math.PI*2;
      const tx=clockCX+Math.cos(angle)*clockR*0.78;
      const ty=clockCY+Math.sin(angle)*clockR*0.78;
      const tk1x=clockCX+Math.cos(angle)*clockR*0.90;
      const tk1y=clockCY+Math.sin(angle)*clockR*0.90;
      const tk2x=clockCX+Math.cos(angle)*(clockR-3);
      const tk2y=clockCY+Math.sin(angle)*(clockR-3);
      ctx.strokeStyle='rgba(45,65,95,0.55)';ctx.lineWidth=i%3===0?2.8:1.4;
      ctx.beginPath();ctx.moveTo(tk1x,tk1y);ctx.lineTo(tk2x,tk2y);ctx.stroke();
      const fs=i%3===0?clockR*0.135:clockR*0.092;
      ctx.font=`${i%3===0?'bold':'normal'} ${fs}px Georgia,serif`;
      ctx.fillStyle='rgba(38,58,88,0.85)';
      ctx.fillText(romans[i],tx,ty);
     }
     /* Petits ticks minutes */
     for(let i=0;i<60;i++){
      if(i%5===0)continue;
      const angle=-Math.PI/2+(i/60)*Math.PI*2;
      ctx.strokeStyle='rgba(45,65,95,0.30)';ctx.lineWidth=0.7;
      ctx.beginPath();
      ctx.moveTo(clockCX+Math.cos(angle)*clockR*0.93,clockCY+Math.sin(angle)*clockR*0.93);
      ctx.lineTo(clockCX+Math.cos(angle)*(clockR-3),clockCY+Math.sin(angle)*(clockR-3));
      ctx.stroke();
     }

     /* Aiguille heures */
     ctx.save();ctx.translate(clockCX,clockCY);ctx.rotate(hourAngle);
     ctx.lineCap='round';ctx.strokeStyle='#08090f';ctx.lineWidth=clockR*0.058;
     ctx.beginPath();ctx.moveTo(-clockR*0.14,0);ctx.lineTo(clockR*0.54,0);ctx.stroke();
     ctx.restore();

     /* Aiguille minutes */
     ctx.save();ctx.translate(clockCX,clockCY);ctx.rotate(minAngle);
     ctx.strokeStyle='#08090f';ctx.lineWidth=clockR*0.040;
     ctx.beginPath();ctx.moveTo(-clockR*0.16,0);ctx.lineTo(clockR*0.74,0);ctx.stroke();
     ctx.restore();

     /* Aiguille secondes — fine, rouge */
     ctx.save();ctx.translate(clockCX,clockCY);ctx.rotate(secAngle);
     ctx.strokeStyle='rgba(200,40,40,0.90)';ctx.lineWidth=clockR*0.018;
     ctx.beginPath();ctx.moveTo(-clockR*0.20,0);ctx.lineTo(clockR*0.85,0);ctx.stroke();
     ctx.restore();

     /* Pivot */
     ctx.beginPath();ctx.arc(clockCX,clockCY,clockR*0.042,0,Math.PI*2);
     ctx.fillStyle='#12141e';ctx.fill();
     ctx.beginPath();ctx.arc(clockCX,clockCY,clockR*0.022,0,Math.PI*2);
     ctx.fillStyle='#d0a050';ctx.fill();
    }

    function frame(){
     if(stop.v)return;

     /* Fond solide d'abord — garantit que tout le canvas est couvert */
     ctx.fillStyle='#04080e';
     ctx.fillRect(0,0,W,H);

     /* Dégradé bleu cobalt par-dessus */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#0a1428');bg.addColorStop(0.4,'#122050');bg.addColorStop(0.75,'#0e1a40');bg.addColorStop(1,'#04080e');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo central */
     const glow=ctx.createRadialGradient(cx,H*0.50,0,cx,H*0.50,W*0.95);
     glow.addColorStop(0,'rgba(40,80,160,0.22)');glow.addColorStop(0.6,'rgba(20,40,100,0.08)');glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);

     /* Étoiles scintillantes */
     for(const s of stars){
      s.ph+=s.spd;
      const op=0.25+0.55*Math.abs(Math.sin(s.ph));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,215,255,${op})`;ctx.fill();
     }

     /* Pluie fine */
     ctx.strokeStyle='rgba(80,100,160,1)';
     for(const r of rain){
      r.y+=r.vy;if(r.y>H){r.y=-r.len;r.x=Math.random()*W;}
      ctx.globalAlpha=r.op;ctx.lineWidth=0.5;
      ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+0.4,r.y+r.len);ctx.stroke();
     }
     ctx.globalAlpha=1;

     /* Particules lumineuses flottantes */
     for(const p of particles){
      p.x+=p.vx;p.y+=p.vy;p.ph+=0.025;
      if(p.y<0){p.y=H*0.95;p.x=Math.random()*W;}
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      const pa=p.op*(0.4+0.6*Math.abs(Math.sin(p.ph)));
      const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3);
      pg.addColorStop(0,`rgba(${p.col},${pa})`);
      pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(p.x,p.y,p.r*3,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(${p.col},${pa*1.8})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* Sol / rue sombre — remplit tout le bas jusqu'au bord */
     const streetY=H*0.92;
     ctx.fillStyle='#04080e';ctx.fillRect(0,streetY,W,H);
     ctx.strokeStyle='rgba(30,40,70,0.85)';ctx.lineWidth=1.5;
     ctx.beginPath();ctx.moveTo(0,streetY);ctx.lineTo(W,streetY);ctx.stroke();

     /* Horloge */
     drawClock(t);

     /* Tête */
     drawHead(t);

     /* Vignette haut/bas uniquement — pas de noircissement latéral */
     const vg=ctx.createLinearGradient(0,0,0,H);
     vg.addColorStop(0,'rgba(0,0,0,0.20)');
     vg.addColorStop(0.12,'rgba(0,0,0,0)');
     vg.addColorStop(0.88,'rgba(0,0,0,0)');
     vg.addColorStop(1,'rgba(0,0,0,0.25)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
