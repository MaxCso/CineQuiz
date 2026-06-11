// CinéQuiz splash chunk — Retour vers le Futur
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Retour vers le Futur"]={
   name:'Retour vers le Futur',
   color:'255,140,20',
   ref:'Retour vers le Futur \u2014 Robert Zemeckis, 1985',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── CSS ── */
    let _bttfS=document.getElementById('_bttf_pos_s');
    if(!_bttfS){_bttfS=document.createElement('style');_bttfS.id='_bttf_pos_s';document.head.appendChild(_bttfS);}
    _bttfS.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _bttfW=setInterval(()=>{if(stop.v){_bttfS.textContent='';clearInterval(_bttfW);}},200);

    /* ── Image de fond ── */
    const bgImg=new Image();
    let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/Back.png';

    /* ── Étoiles scintillantes — plus nombreuses et variées ── */
    const stars=Array.from({length:140},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.58,
     r:Math.random()*1.1+0.15,
     op:Math.random()*0.55+0.12,
     tw:Math.random()*Math.PI*2,
     twSpd:0.012+Math.random()*0.032,
     col:Math.random()<0.12 ? 'warm' : Math.random()<0.08 ? 'blue' : 'white', /* quelques étoiles colorées */
    }));

    /* ── Étoiles filantes ── */
    const shootingStars=Array.from({length:4},()=>({
     x:0, y:0, vx:0, vy:0,
     len:0, op:0,
     waitTimer:Math.random()*280+60,
     active:false,
    }));
    function resetShootingStar(s){
     s.x=Math.random()*W*0.8;
     s.y=Math.random()*H*0.35;
     s.vx=W*(0.008+Math.random()*0.012);
     s.vy=H*(0.003+Math.random()*0.005);
     s.len=W*(0.06+Math.random()*0.08);
     s.op=0;
     s.active=true;
     s.life=0;
     s.maxLife=0.35+Math.random()*0.25;
    }

    /* ── Particules d'énergie bleue (condensateur de flux) ── */
    const energyPts=Array.from({length:35},(_,i)=>({
     side: i%2===0 ? -1 : 1,
     x:0, y:0, vx:0, vy:0,
     r:Math.random()*1.4+0.4,
     op:0,
     life:Math.random(),
     decay:0.018+Math.random()*0.022,
    }));
    function resetEnergy(e){
     const ex=cx+e.side*(W*0.14+Math.random()*W*0.08);
     const ey=H*(0.58+Math.random()*0.08);
     e.x=ex; e.y=ey;
     e.vx=e.side*(0.15+Math.random()*0.35)+(Math.random()-0.5)*0.20;
     e.vy=-(0.20+Math.random()*0.45);
     e.op=0.5+Math.random()*0.45;
     e.life=0;
    }
    energyPts.forEach(resetEnergy);

    /* ── Éclairs bleus — condensateur de flux ── */
    /* Chaque éclair est un segment brisé généré aléatoirement */
    const lightnings=Array.from({length:6},(_,i)=>({
     side: i%2===0 ? -1 : 1,   /* gauche ou droite de la voiture */
     life:0, maxLife:0.18+Math.random()*0.14,
     waitTimer:Math.random()*55+15,
     segs:[]
    }));

    function buildLightning(side){
     /* Part depuis le flanc de la voiture (~cx ± 18%) vers l'extérieur */
     const ox=cx+side*W*0.18, oy=H*0.625;
     const dx=side*W*(0.08+Math.random()*0.10);
     const dy=(Math.random()-0.5)*H*0.08;
     const n=4+Math.floor(Math.random()*3);
     const pts=[{x:ox,y:oy}];
     for(let i=1;i<n;i++){
      const prog=i/n;
      pts.push({
       x:ox+dx*prog+(Math.random()-0.5)*W*0.035,
       y:oy+dy*prog+(Math.random()-0.5)*H*0.030
      });
     }
     pts.push({x:ox+dx,y:oy+dy});
     return pts;
    }

    /* ── Fumée blanche depuis la voiture ── */
    const smokeParticles=Array.from({length:20},(_,i)=>({
     side: i%2===0 ? -1 : 1,
     x:cx, y:H*0.62,
     vx:0, vy:0,
     r:W*(0.022+Math.random()*0.028),
     op:0.04+Math.random()*0.06,
     ph:Math.random()*Math.PI*2,
     phSpd:0.005+Math.random()*0.008,
     life:Math.random()
    }));

    /* ── Braises des traces de feu (bas-gauche et bas-droite) ── */
    const fireEmbers=Array.from({length:30},(_,i)=>({
     side: i<15 ? -1 : 1,
     x:0, y:0,
     vx:0, vy:0,
     r:Math.random()*1.6+0.5,
     op:0.5+Math.random()*0.4,
     life:Math.random(),
     decay:0.016+Math.random()*0.014
    }));

    function resetEmber(e){
     /* Les flammes sont dans les coins bas — calées sur les traînées de feu */
     const bx = cx + e.side*(W*0.28+Math.random()*W*0.20);
     const by = H*(0.80+Math.random()*0.18);
     e.x=bx; e.y=by;
     e.vx=e.side*(0.25+Math.random()*0.35);
     e.vy=-(0.55+Math.random()*0.80);
     e.life=0;
     e.op=0.5+Math.random()*0.4;
    }
    fireEmbers.forEach(resetEmber);

    function frame(){
     if(stop.v)return;

     /* ── Fond ── */
     if(bgReady){
      ctx.drawImage(bgImg,0,0,W,H);
     } else {
      ctx.fillStyle='#000005';
      ctx.fillRect(0,0,W,H);
     }

     /* ── Étoiles scintillantes ── */
     for(const s of stars){
      s.tw+=s.twSpd;
      const pulse=0.45+0.55*Math.abs(Math.sin(s.tw));
      const op=s.op*pulse;
      /* halo doux sur les plus grosses étoiles */
      if(s.r>0.8&&op>0.25){
       const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3.5);
       const c=s.col==='warm'?`255,240,180`:s.col==='blue'?`160,200,255`:`255,252,240`;
       sg.addColorStop(0,`rgba(${c},${op*0.35})`);
       sg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r*3.5,0,Math.PI*2);ctx.fill();
      }
      const c=s.col==='warm'?`255,238,170`:s.col==='blue'?`180,215,255`:`255,252,240`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*(0.6+0.4*pulse),0,Math.PI*2);
      ctx.fillStyle=`rgba(${c},${op})`;ctx.fill();
     }

     /* ── Étoiles filantes ── */
     for(const s of shootingStars){
      if(!s.active){
       s.waitTimer--;
       if(s.waitTimer<=0){resetShootingStar(s);s.waitTimer=200+Math.random()*300;}
      } else {
       s.life+=0.022;
       s.op=s.life<0.15 ? s.life/0.15 : Math.max(0,1-(s.life-0.15)/0.85);
       s.x+=s.vx; s.y+=s.vy;
       if(s.op>0.01){
        const tx=s.x-Math.cos(Math.atan2(s.vy,s.vx))*s.len;
        const ty=s.y-Math.sin(Math.atan2(s.vy,s.vx))*s.len;
        const sg=ctx.createLinearGradient(tx,ty,s.x,s.y);
        sg.addColorStop(0,'rgba(200,220,255,0)');
        sg.addColorStop(0.6,`rgba(210,228,255,${s.op*0.50})`);
        sg.addColorStop(1,`rgba(240,248,255,${s.op*0.90})`);
        ctx.strokeStyle=sg; ctx.lineWidth=1.2; ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(s.x,s.y);ctx.stroke();
        /* point lumineux en tête */
        ctx.fillStyle=`rgba(240,248,255,${s.op*0.80})`;
        ctx.beginPath();ctx.arc(s.x,s.y,1.2,0,Math.PI*2);ctx.fill();
       }
       if(s.life>=s.maxLife){s.active=false;}
      }
     }

     /* ── Fumée blanche ── */
     for(const s of smokeParticles){
      s.life+=0.008;s.ph+=s.phSpd;
      s.r+=0.06;s.op-=0.0005;
      if(s.life>=1||s.op<0.004){
       const side=s.side;
       s.x=cx+side*W*0.16+(Math.random()-0.5)*W*0.04;
       s.y=H*0.620+(Math.random()-0.5)*H*0.025;
       s.vx=side*(0.18+Math.random()*0.22);
       s.vy=-(0.04+Math.random()*0.08);
       s.r=W*(0.018+Math.random()*0.020);
       s.op=0.05+Math.random()*0.055;
       s.life=0;
      }
      s.x+=s.vx+Math.sin(s.ph*0.6)*0.12;
      s.y+=s.vy;
      const pulse=0.6+0.4*Math.abs(Math.sin(s.ph));
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(220,230,255,${s.op*pulse})`);
      sg.addColorStop(0.5,`rgba(180,195,240,${s.op*pulse*0.45})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Braises de feu ── */
     for(const e of fireEmbers){
      e.life+=e.decay;
      e.x+=e.vx;e.y+=e.vy;
      if(e.life>=1) resetEmber(e);
      const fade=1-e.life;
      const col=e.life<0.4
       ?`rgba(255,${180+Math.random()*60|0},20,${e.op*fade})`
       :`rgba(255,${60+Math.random()*40|0},5,${e.op*fade*0.7})`;
      ctx.beginPath();ctx.arc(e.x,e.y,e.r*fade,0,Math.PI*2);
      ctx.fillStyle=col;ctx.fill();
      if(e.r>1.1&&fade>0.4){
       const eg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r*4);
       eg.addColorStop(0,`rgba(255,120,10,${e.op*fade*0.14})`);
       eg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=eg;ctx.beginPath();ctx.arc(e.x,e.y,e.r*4,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Éclairs bleus ── */
     for(const l of lightnings){
      if(l.segs.length===0){
       l.waitTimer--;
       if(l.waitTimer<=0){
        l.segs=buildLightning(l.side);
        l.life=0;
        l.maxLife=0.16+Math.random()*0.12;
        l.waitTimer=30+Math.random()*60;
       }
      } else {
       l.life+=0.028;
       const fade=l.life<0.25 ? l.life/0.25 : Math.max(0,1-(l.life-0.25)/0.75);
       if(fade>0.02){
        /* halo diffus */
        for(let i=0;i<l.segs.length-1;i++){
         const a=l.segs[i], b=l.segs[i+1];
         const hg=ctx.createLinearGradient(a.x,a.y,b.x,b.y);
         hg.addColorStop(0,`rgba(80,140,255,${fade*0.18})`);
         hg.addColorStop(1,`rgba(60,120,255,${fade*0.14})`);
         ctx.strokeStyle=hg;ctx.lineWidth=6;ctx.lineCap='round';
         ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
        /* trait principal */
        ctx.strokeStyle=`rgba(160,210,255,${fade*0.90})`;
        ctx.lineWidth=1.2;ctx.lineCap='round';
        ctx.beginPath();
        for(let i=0;i<l.segs.length;i++){
         i===0 ? ctx.moveTo(l.segs[i].x,l.segs[i].y) : ctx.lineTo(l.segs[i].x,l.segs[i].y);
        }
        ctx.stroke();
        /* trait blanc central */
        ctx.strokeStyle=`rgba(230,240,255,${fade*0.65})`;
        ctx.lineWidth=0.5;
        ctx.beginPath();
        for(let i=0;i<l.segs.length;i++){
         i===0 ? ctx.moveTo(l.segs[i].x,l.segs[i].y) : ctx.lineTo(l.segs[i].x,l.segs[i].y);
        }
        ctx.stroke();
       }
       if(l.life>=l.maxLife) l.segs=[];
      }
     }

     /* ── Particules d'énergie bleue (condensateur de flux) ── */
     for(const e of energyPts){
      e.life+=e.decay;
      e.x+=e.vx; e.y+=e.vy;
      e.vy-=0.008;
      if(e.life>=1) resetEnergy(e);
      const fade=Math.max(0,1-e.life);
      const rb=Math.random()<0.15?255:Math.random()<0.5?120:80;
      const gb=Math.random()<0.15?220:Math.random()<0.5?170:140;
      ctx.fillStyle=`rgba(${rb},${gb},255,${e.op*fade})`;
      ctx.beginPath();ctx.arc(e.x,e.y,e.r*fade,0,Math.PI*2);ctx.fill();
      if(e.r>0.9&&fade>0.45){
       const eg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r*5);
       eg.addColorStop(0,`rgba(80,140,255,${e.op*fade*0.18})`);
       eg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=eg;ctx.beginPath();ctx.arc(e.x,e.y,e.r*5,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Vignette pulsante ── */
     ctx.globalAlpha=1;
     const vigPulse=0.84+Math.sin(t*0.38)*0.04;
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.10,cx,H*0.50,H*0.96);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.72,`rgba(0,0,0,${0.40*vigPulse})`);
     vg.addColorStop(1,`rgba(0,0,0,${0.88*vigPulse})`);
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
