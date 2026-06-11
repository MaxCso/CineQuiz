// CinéQuiz splash chunk — Joker
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Joker"]={
   name:'Joker',
   color:'180,60,20',
   ref:'Joker \u2014 Todd Phillips, 2019',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    let _s=document.getElementById('_joker_s');
    if(!_s){_s=document.createElement('style');_s.id='_joker_s';document.head.appendChild(_s);}
    _s.textContent=`
      

    `;
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── SVG silhouette Joker ── */
    const jokerImg=new Image();let jokerReady=false;
    jokerImg.onload=()=>{jokerReady=true;};
    jokerImg.src='images/sprite_41.svg';

    /* ── Pré-calculer les points du faisceau rouge ── */
    /* Le faisceau part du haut (légèrement à droite du centre) et s'évase vers le bas */
    const beamTopX=cx+W*0.02;
    const beamTopW=W*0.55;   /* largeur en haut — élargie */
    const beamBotW=W*0.52;   /* largeur en bas */
    const beamBotY=H*0.86;   /* le faisceau descend jusqu'ici */

    /* ── Silhouette positionnée en bas du faisceau ── */
    /* SVG ratio 381×661 */
    const SH=H*0.38;
    const SW=SH*(381/661);

    /* ── Particules de poussière légères ── */
    const dust=Array.from({length:160},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.10, vy:-(Math.random()*0.05+0.01),
     r:Math.random()*1.2+0.2, op:Math.random()*0.08+0.02,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Confettis bordeaux — plus nombreux et variés ── */
    const confetti=Array.from({length:180},()=>({
     x:Math.random()*W,
     y:Math.random()*H-H*0.3,
     vx:(Math.random()-0.5)*0.70,
     vy:Math.random()*0.85+0.15,
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.08,
     r:Math.random()*3.0+0.8,
     hue:335+Math.random()*25,   /* rouge bordeaux à cramoisi */
     sat:55+Math.random()*25,
     lit:22+Math.random()*18,
     shape:Math.random()<0.35?'circle':'rect', /* mix formes */
    }));

    /* Particules dans le faisceau — montent lentement vers le haut */
    const beamDust=Array.from({length:120},()=>({
     prog:Math.random(),  /* 0=haut du faisceau, 1=bas */
     xOff:(Math.random()-0.5)*0.8,  /* offset horizontal normalisé */
     vy:-(Math.random()*0.35+0.10),
     r:Math.random()*1.4+0.5,
     op:Math.random()*0.18+0.06,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Danse légère (phase) ── */
    let danceT=0;

    function frame(){
     if(stop.v)return;
     danceT+=0.018;

     /* ── FOND gris clair — comme l'affiche ── */
     ctx.fillStyle='#ccc5bc';
     ctx.fillRect(0,0,W,H);

     /* Légère texture gradient du fond : plus clair en haut, plus sombre en bas */
     const bgG=ctx.createLinearGradient(0,0,0,H);
     bgG.addColorStop(0,'rgba(240,232,222,0.60)');
     bgG.addColorStop(0.5,'rgba(200,192,182,0)');
     bgG.addColorStop(1,'rgba(140,130,120,0.40)');
     ctx.fillStyle=bgG; ctx.fillRect(0,0,W,H);

     /* ── FAISCEAU ROUGE — pièce maîtresse ── */
     /* Oscillation très légère du faisceau */
     const bSwing=Math.sin(danceT*0.4)*W*0.008;

     /* Halo doux derrière le faisceau (bords dégradés) */
     const haloG=ctx.createLinearGradient(beamTopX-beamBotW*0.6+bSwing,0,beamTopX+beamBotW*0.6+bSwing,0);
     haloG.addColorStop(0,'rgba(145,29,29,0)');
     haloG.addColorStop(0.18,'rgba(145,29,29,0.12)');
     haloG.addColorStop(0.5,'rgba(145,29,29,0.18)');
     haloG.addColorStop(0.82,'rgba(145,29,29,0.12)');
     haloG.addColorStop(1,'rgba(145,29,29,0)');
     ctx.fillStyle=haloG;
     ctx.beginPath();
     ctx.moveTo(beamTopX-beamTopW*0.55+bSwing, 0);
     ctx.lineTo(beamTopX+beamTopW*0.55+bSwing, 0);
     ctx.lineTo(beamTopX+beamBotW*0.65+bSwing, beamBotY);
     ctx.lineTo(beamTopX-beamBotW*0.65+bSwing, beamBotY);
     ctx.closePath(); ctx.fill();

     /* Corps principal du faisceau — rouge profond */
     const beamG=ctx.createLinearGradient(0,0,0,beamBotY);
     beamG.addColorStop(0,'rgba(145,29,29,1.0)');
     beamG.addColorStop(0.35,'rgba(138,27,27,1.0)');
     beamG.addColorStop(0.75,'rgba(125,24,24,0.98)');
     beamG.addColorStop(1,'rgba(110,20,20,0.92)');
     ctx.fillStyle=beamG;
     ctx.beginPath();
     ctx.moveTo(beamTopX-beamTopW*0.50+bSwing, 0);
     ctx.lineTo(beamTopX+beamTopW*0.50+bSwing, 0);
     ctx.lineTo(beamTopX+beamBotW*0.50+bSwing, beamBotY);
     ctx.lineTo(beamTopX-beamBotW*0.50+bSwing, beamBotY);
     ctx.closePath(); ctx.fill();

     /* Reflet lumineux vertical au centre du faisceau */
     const shimmerX=beamTopX+bSwing;
     const shimW=beamTopW*0.18+Math.sin(danceT*0.9)*beamTopW*0.04;
     const shimG=ctx.createLinearGradient(shimmerX-shimW,0,shimmerX+shimW,0);
     shimG.addColorStop(0,'rgba(200,60,60,0)');
     shimG.addColorStop(0.5,'rgba(200,55,55,0.22)');
     shimG.addColorStop(1,'rgba(200,60,60,0)');
     ctx.fillStyle=shimG;
     ctx.beginPath();
     ctx.moveTo(beamTopX-beamTopW*0.50+bSwing, 0);
     ctx.lineTo(beamTopX+beamTopW*0.50+bSwing, 0);
     ctx.lineTo(beamTopX+beamBotW*0.50+bSwing, beamBotY);
     ctx.lineTo(beamTopX-beamBotW*0.50+bSwing, beamBotY);
     ctx.closePath(); ctx.fill();

     /* ── SILHOUETTE JOKER SVG ── */
     if(jokerReady){
      /* Légère danse : oscillation latérale et rotation */
      const jLean=Math.sin(danceT)*0.045;
      const jBob=Math.sin(danceT*1.1)*H*0.005;
      const jX=cx+bSwing*1.8;
      const jY=beamBotY-SH+jBob;

      ctx.save();
      ctx.translate(jX, jY+SH*0.5);
      ctx.rotate(jLean);
      ctx.translate(-jX, -(jY+SH*0.5));

      /* Ombre portée au sol */
      ctx.save();
      ctx.globalAlpha=0.18;
      ctx.fillStyle='rgba(80,10,10,1)';
      ctx.beginPath();
      ctx.ellipse(jX, beamBotY+H*0.005, SW*0.52, H*0.012, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();

      ctx.globalAlpha=0.96;
      ctx.drawImage(jokerImg, jX-SW*0.5, jY, SW, SH);
      ctx.restore();
     }

     /* ── Sol (ligne subtile) ── */
     const floorG=ctx.createLinearGradient(0,beamBotY,0,H);
     floorG.addColorStop(0,'rgba(155,145,135,0.0)');
     floorG.addColorStop(0.2,'rgba(145,135,125,0.30)');
     floorG.addColorStop(1,'rgba(120,112,104,0.55)');
     ctx.fillStyle=floorG;
     ctx.fillRect(0,beamBotY,W,H-beamBotY);

     /* ── Poussière flottante subtile ── */
     for(const d of dust){
      d.x+=d.vx; d.y+=d.vy; d.ph+=0.015;
      if(d.y<0)d.y=H; if(d.x<0)d.x=W; if(d.x>W)d.x=0;
      ctx.fillStyle=`rgba(80,20,20,${d.op*(0.3+0.7*Math.abs(Math.sin(d.ph)))})`;
      ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill();
     }

     /* ── Particules montantes dans le faisceau ── */
     for(const p of beamDust){
      p.prog+=p.vy/H;  /* remonte vers 0 */
      p.ph+=0.02;
      if(p.prog<0){p.prog=1;p.op=Math.random()*0.18+0.06;}
      /* Position réelle dans le faisceau */
      const progY=p.prog;
      const bxCenter=beamTopX+bSwing;
      const bHalfW=beamTopW*0.5+(beamBotW*0.5-beamTopW*0.5)*progY;
      const px=bxCenter+p.xOff*bHalfW;
      const py=progY*beamBotY;
      const flicker=0.5+0.5*Math.sin(p.ph);
      ctx.fillStyle=`rgba(220,160,140,${p.op*flicker})`;
      ctx.beginPath(); ctx.arc(px,py,p.r,0,Math.PI*2); ctx.fill();
     }

     /* ── CONFETTIS bordeaux ── */
     for(const c of confetti){
      c.x+=c.vx; c.y+=c.vy; c.rot+=c.rotSpd;
      if(c.y>H+10){c.y=-10; c.x=Math.random()*W; c.vx=(Math.random()-0.5)*0.70;}
      ctx.save();
      ctx.translate(c.x,c.y); ctx.rotate(c.rot);
      ctx.fillStyle=`hsla(${c.hue},${c.sat}%,${c.lit}%,0.70)`;
      if(c.shape==='circle'){
       ctx.beginPath();ctx.arc(0,0,c.r*0.65,0,Math.PI*2);ctx.fill();
      } else {
       ctx.fillRect(-c.r,-c.r*0.40,c.r*2,c.r*0.80);
      }
      ctx.restore();
     }

     /* ── Vignette subtile en bas seulement ── */
     const vgB=ctx.createLinearGradient(0,H,0,H*0.80);
     vgB.addColorStop(0,'rgba(90,80,70,0.45)'); vgB.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgB; ctx.fillRect(0,H*0.80,W,H*0.20);

     /* ── Grain pellicule très léger ── */
     for(let i=0;i<30;i++){
      const g=10+Math.random()*20|0;
      ctx.fillStyle=`rgba(${g+4},${g+2},${g},${Math.random()*0.018})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
     }

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
