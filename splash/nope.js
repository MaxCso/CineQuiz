// CinéQuiz splash chunk — Nope
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Nope"]={
   name:'Nope',
   color:'60,40,120',
   ref:'Nope \u2014 Jordan Peele, 2022',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : bleu nuit profond du poster 1 ── */
    let _noStyle=document.getElementById('_nope_splash_style');
    if(!_noStyle){_noStyle=document.createElement('style');_noStyle.id='_nope_splash_style';document.head.appendChild(_noStyle);}
    _noStyle.textContent=`
      

    `;
    const _noWatch=setInterval(()=>{if(stop.v){_noStyle.textContent='';clearInterval(_noWatch);}},200);

    /* ── Étoiles fixes ── */
    const stars=Array.from({length:120},()=>({
     x:Math.random()*W, y:Math.random()*H*0.75,
     r:Math.random()*1.2+0.2,
     op:Math.random()*0.55+0.15,
     phase:Math.random()*Math.PI*2,
    }));

    /* ── Chapeau-OVNI ── */
    /* Position verticale : lévite lentement */
    let hatFloat=0;
    const HAT_CX=cx, HAT_BASE_Y=H*0.30;

    /* ── Cavalier au bas de l'écran ── */
    let riderX=-W*0.15; /* part de gauche */

    /* ── Particules aspirées vers le chapeau ── */
    const particles=Array.from({length:22},()=>({
     angle:Math.random()*Math.PI*2,
     dist:W*(0.18+Math.random()*0.28),
     phase:Math.random()*Math.PI*2,
     spd:0.008+Math.random()*0.012,
     r:Math.random()*1.8+0.4,
     op:Math.random()*0.35+0.08,
    }));

    /* ── Halo lumineux sous le chapeau ── */
    function drawHatGlow(hatY){
     const hg=ctx.createRadialGradient(HAT_CX,hatY+W*0.06,0,HAT_CX,hatY+W*0.06,W*0.32);
     hg.addColorStop(0,`rgba(200,220,255,${0.12+Math.sin(t*0.5)*0.04})`);
     hg.addColorStop(0.45,'rgba(150,180,255,0.04)');
     hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.fillRect(0,0,W,H);
    }

    /* ── Dessine le chapeau de cowboy / forme OVNI ── */
    function drawHat(hcx,hcy){
     const brimW=W*0.52; /* largeur du bord */
     const brimH=W*0.065;/* épaisseur du bord */
     const crownW=W*0.28;
     const crownH=W*0.20;
     const crownY=hcy-crownH;

     ctx.save();
     ctx.shadowColor='rgba(180,210,255,0.35)';
     ctx.shadowBlur=30;

     /* ── Bord du chapeau (calotte aplatie) ── */
     /* Dégradé beige-gris du poster 2 */
     const brimGrad=ctx.createLinearGradient(hcx-brimW/2,hcy-brimH,hcx+brimW/2,hcy+brimH);
     brimGrad.addColorStop(0,'rgba(140,130,120,0.97)');
     brimGrad.addColorStop(0.3,'rgba(185,175,160,0.97)');
     brimGrad.addColorStop(0.55,'rgba(210,200,185,0.97)');
     brimGrad.addColorStop(0.75,'rgba(175,165,150,0.97)');
     brimGrad.addColorStop(1,'rgba(130,120,110,0.97)');
     ctx.fillStyle=brimGrad;

     /* Forme du bord — ellipse aplatie avec courbe */
     ctx.beginPath();
     ctx.moveTo(hcx-brimW/2, hcy);
     ctx.bezierCurveTo(
      hcx-brimW/2, hcy-brimH*1.2,
      hcx-crownW/2, hcy-brimH*0.6,
      hcx-crownW/2, hcy-brimH*0.2
     );
     ctx.lineTo(hcx+crownW/2, hcy-brimH*0.2);
     ctx.bezierCurveTo(
      hcx+crownW/2, hcy-brimH*0.6,
      hcx+brimW/2, hcy-brimH*1.2,
      hcx+brimW/2, hcy
     );
     ctx.ellipse(hcx, hcy, brimW/2, brimH*0.45, 0, 0, Math.PI);
     ctx.closePath();
     ctx.fill();

     /* ── Ombre dessous du bord ── */
     const shadowG=ctx.createLinearGradient(hcx,hcy,hcx,hcy+brimH*1.5);
     shadowG.addColorStop(0,'rgba(30,30,50,0.45)');
     shadowG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shadowG;
     ctx.beginPath();
     ctx.ellipse(hcx,hcy+brimH*0.3,brimW*0.48,brimH*0.35,0,0,Math.PI*2);
     ctx.fill();

     /* ── Calotte du chapeau — dôme ── */
     const crownGrad=ctx.createRadialGradient(
      hcx-crownW*0.15, crownY+crownH*0.20, crownW*0.05,
      hcx, crownY+crownH*0.5, crownW*0.65
     );
     crownGrad.addColorStop(0,'rgba(230,220,205,0.97)');
     crownGrad.addColorStop(0.40,'rgba(185,175,160,0.97)');
     crownGrad.addColorStop(0.75,'rgba(145,135,125,0.97)');
     crownGrad.addColorStop(1,'rgba(100,92,85,0.97)');
     ctx.fillStyle=crownGrad;
     ctx.beginPath();
     ctx.moveTo(hcx-crownW/2, hcy-brimH*0.2);
     ctx.bezierCurveTo(
      hcx-crownW/2, crownY+crownH*0.15,
      hcx-crownW*0.40, crownY,
      hcx, crownY
     );
     ctx.bezierCurveTo(
      hcx+crownW*0.40, crownY,
      hcx+crownW/2, crownY+crownH*0.15,
      hcx+crownW/2, hcy-brimH*0.2
     );
     ctx.closePath();
     ctx.fill();

     /* Reflet lumineux sur la calotte */
     const refG=ctx.createRadialGradient(
      hcx-crownW*0.18,crownY+crownH*0.18,0,
      hcx-crownW*0.18,crownY+crownH*0.18,crownW*0.35
     );
     refG.addColorStop(0,'rgba(255,252,240,0.32)');
     refG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=refG;
     ctx.beginPath();
     ctx.ellipse(hcx-crownW*0.18,crownY+crownH*0.25,crownW*0.28,crownH*0.32,Math.PI*0.1,0,Math.PI*2);
     ctx.fill();

     /* Renfoncement central sous le dôme */
     const dimpG=ctx.createRadialGradient(hcx,hcy-brimH*0.4,0,hcx,hcy-brimH*0.4,crownW*0.32);
     dimpG.addColorStop(0,'rgba(60,55,50,0.55)');
     dimpG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=dimpG;
     ctx.beginPath();
     ctx.ellipse(hcx,hcy-brimH*0.4,crownW*0.30,brimH*0.45,0,0,Math.PI*2);
     ctx.fill();

     ctx.restore();
    }

    /* ── Cavalier + cheval stylisé ── */
    function drawRider(rx,ry,scale){
     ctx.save();
     ctx.translate(rx,ry);ctx.scale(scale,scale);
     ctx.fillStyle='rgba(8,12,28,0.92)';

     /* Corps du cheval */
     ctx.beginPath();
     ctx.ellipse(0,-8,22,9,Math.PI*0.08,0,Math.PI*2);
     ctx.fill();
     /* Tête */
     ctx.beginPath();
     ctx.ellipse(22,-11,8,6,Math.PI*0.3,0,Math.PI*2);
     ctx.fill();
     /* Museau */
     ctx.beginPath();
     ctx.ellipse(29,-10,5,4,Math.PI*0.2,0,Math.PI*2);
     ctx.fill();
     /* Jambes animées */
     const legPhase=t*3.5;
     ctx.strokeStyle='rgba(8,12,28,0.92)';ctx.lineWidth=4;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-10,-2);ctx.lineTo(-16+Math.sin(legPhase)*5,14);ctx.stroke();
     ctx.beginPath();ctx.moveTo(-4,-2);ctx.lineTo(-8+Math.sin(legPhase+Math.PI)*6,14);ctx.stroke();
     ctx.beginPath();ctx.moveTo(8,-2);ctx.lineTo(12+Math.sin(legPhase+0.8)*5,14);ctx.stroke();
     ctx.beginPath();ctx.moveTo(14,-2);ctx.lineTo(20+Math.sin(legPhase+Math.PI+0.8)*6,14);ctx.stroke();
     /* Queue */
     ctx.beginPath();ctx.moveTo(-22,-6);
     ctx.quadraticCurveTo(-34,-2,-30+Math.sin(legPhase)*4,8);ctx.stroke();
     /* Cavalier */
     ctx.fillStyle='rgba(8,12,28,0.92)';
     ctx.beginPath();ctx.ellipse(2,-22,7,10,Math.PI*0.05,0,Math.PI*2);ctx.fill();/* corps */
     ctx.beginPath();ctx.arc(2,-34,5,0,Math.PI*2);ctx.fill();/* tête */
     /* Chapeau cowboy du cavalier */
     ctx.beginPath();ctx.ellipse(2,-40,8,2.5,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(2,-43,4,4,0,Math.PI,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond bleu nuit ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#060e22');
     bg.addColorStop(0.30,'#0a1835');
     bg.addColorStop(0.65,'#0d2048');
     bg.addColorStop(0.85,'#102550');
     bg.addColorStop(1.00,'#0a1830');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Nuages atmosphériques sombres */
     const cgx=ctx.createRadialGradient(cx,H*0.38,0,cx,H*0.38,W*0.55);
     cgx.addColorStop(0,'rgba(18,40,90,0.45)');
     cgx.addColorStop(0.45,'rgba(12,28,70,0.22)');
     cgx.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cgx;ctx.fillRect(0,0,W,H);

     /* ── Étoiles ── */
     for(const s of stars){
      s.phase+=0.012;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,215,255,${s.op*(0.6+0.4*Math.sin(s.phase))})`;
      ctx.fill();
     }

     /* ── Particules aspirées vers le chapeau ── */
     hatFloat+=0.018;
     const hatY=HAT_BASE_Y+Math.sin(hatFloat)*H*0.012;
     for(const p of particles){
      p.angle+=p.spd;p.phase+=0.025;
      const px=HAT_CX+Math.cos(p.angle)*p.dist;
      const py=hatY+Math.sin(p.angle)*p.dist*0.38;
      ctx.beginPath();ctx.arc(px,py,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(180,205,255,${p.op*(0.4+0.6*Math.abs(Math.sin(p.phase)))})`;
      ctx.fill();
     }

     /* ── Halo sous le chapeau ── */
     drawHatGlow(hatY);

     /* ── Chapeau-OVNI ── */
     drawHat(HAT_CX,hatY);

     /* ── Sol désertique ── */
     const groundY=H*0.86;
     const groundG=ctx.createLinearGradient(0,groundY,0,H);
     groundG.addColorStop(0,'rgba(22,32,55,0.95)');
     groundG.addColorStop(0.4,'rgba(16,24,42,0.97)');
     groundG.addColorStop(1,'rgba(8,12,22,0.99)');
     ctx.fillStyle=groundG;ctx.fillRect(0,groundY,W,H-groundY);

     /* Ligne d'horizon brumeuse */
     const fogG=ctx.createLinearGradient(0,groundY-H*0.04,0,groundY+H*0.03);
     fogG.addColorStop(0,'rgba(80,110,160,0)');
     fogG.addColorStop(0.5,'rgba(80,110,160,0.12)');
     fogG.addColorStop(1,'rgba(80,110,160,0)');
     ctx.fillStyle=fogG;ctx.fillRect(0,groundY-H*0.04,W,H*0.07);

     /* ── Cavalier au galop — traverse l'écran de gauche à droite ── */
     riderX+=0.55;
     if(riderX>W+W*0.15) riderX=-W*0.15;
     drawRider(riderX, groundY-8, 0.55);

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.06,cx,H*0.45,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.18)');
     vg.addColorStop(1,'rgba(0,0,0,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain */
     for(let i=0;i<35;i++){const g=4+Math.random()*14|0;ctx.fillStyle=`rgba(${g+4},${g+8},${g+18},${Math.random()*0.018})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
