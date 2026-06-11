// CinéQuiz splash chunk — Interstellar
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Interstellar"]={
   name:'Interstellar',
   color:'180,140,80',
   ref:'Interstellar \u2014 Christopher Nolan, 2014',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.72';
    let t=0;

    /* ── Remonter citation + logo ── */
    let _interPos=document.getElementById('_inter_pos');
    if(!_interPos){_interPos=document.createElement('style');_interPos.id='_inter_pos';document.head.appendChild(_interPos);}
    _interPos.textContent='#splash-content-wrap{top:38%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _interPosW=setInterval(()=>{if(stop.v){_interPos.textContent='';clearInterval(_interPosW);}},200);

    /* Trou noir descendu + agrandi pour mieux l'espacer du contenu */
    const cx=W/2, cy=H*0.52, R=Math.min(W,H)*0.32;

    /* ── Étoiles statiques — champ dense sur tout l'écran ── */
    const rng=(seed=>()=>{seed=(seed*1664525+1013904223)&0xffffffff;return(seed>>>0)/0xffffffff;})(42);
    const STARS=Array.from({length:320},()=>({
     x:rng()*W, y:rng()*H,
     r:rng()*rng()*1.8+0.2,          // majorité petites, quelques grandes
     base:rng()*0.55+0.15,            // opacité de base
     twinkleSpeed:rng()*3+0.8,
     twinklePhase:rng()*Math.PI*2,
     blue:rng()>0.85                  // quelques étoiles bleutées
    }));

    /* ── Étoiles filantes — plus nombreuses et visibles ── */
    const SHOOTS=Array.from({length:6},()=>({active:false,x:0,y:0,vx:0,vy:0,life:0,maxLife:0,tailLen:0}));
    let shootTimer=40;

    function maybeShoot(){
     shootTimer--;
     if(shootTimer>0)return;
     shootTimer=Math.floor(rng()*90+50);   /* intervalle réduit : 50-140 frames */
     const s=SHOOTS.find(s=>!s.active);
     if(!s)return;
     s.active=true;
     s.x=rng()*W*0.85;
     s.y=rng()*H*0.45;
     const angle=Math.PI/5+rng()*Math.PI/5;
     s.spd=rng()*5+6;
     s.vx=Math.cos(angle)*s.spd;
     s.vy=Math.sin(angle)*s.spd;
     s.maxLife=s.life=Math.floor(rng()*30+25);
     s.tailLen=rng()*14+10;   /* longueur traîne variable */
    }

    function drawStars(){
     for(const s of STARS){
      const twinkle=s.base+Math.sin(t*s.twinkleSpeed+s.twinklePhase)*0.18;
      ctx.globalAlpha=Math.max(0,twinkle);
      ctx.fillStyle=s.blue?'rgba(180,210,255,1)':'rgba(255,255,255,1)';
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }
     ctx.globalAlpha=1;
     /* Étoiles filantes */
     for(const s of SHOOTS){
      if(!s.active)continue;
      const prog=s.life/s.maxLife;
      const tailX=s.x-s.vx*s.tailLen, tailY=s.y-s.vy*s.tailLen;
      ctx.save();
      /* Lueur autour de la tête */
      const glow=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,5);
      glow.addColorStop(0,`rgba(220,240,255,${prog*0.9})`);
      glow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=glow;ctx.fillRect(s.x-8,s.y-8,16,16);
      /* Traîne en dégradé */
      ctx.globalAlpha=prog*0.90;
      const sg=ctx.createLinearGradient(tailX,tailY,s.x,s.y);
      sg.addColorStop(0,'rgba(180,210,255,0)');
      sg.addColorStop(0.5,`rgba(220,235,255,${prog*0.5})`);
      sg.addColorStop(1,'rgba(255,255,255,1)');
      ctx.strokeStyle=sg;ctx.lineWidth=1.6;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(tailX,tailY);ctx.lineTo(s.x,s.y);ctx.stroke();
      /* Point lumineux tête */
      ctx.globalAlpha=prog;
      ctx.fillStyle='rgba(255,255,255,0.95)';
      ctx.beginPath();ctx.arc(s.x,s.y,1.4,0,Math.PI*2);ctx.fill();
      ctx.restore();
      s.x+=s.vx;s.y+=s.vy;s.life--;
      if(s.life<=0)s.active=false;
     }
    }

    function frame(){
     if(stop.v)return;
     /* Trail sombre pour persistance */
     ctx.fillStyle='rgba(0,0,0,0.13)';
     ctx.fillRect(0,0,W,H);

     maybeShoot();
     drawStars();

     /* ── Anneaux d'accrétion — plus espacés et plus nombreux ── */
     for(let r=0;r<12;r++){
      const rr=R*(0.65+r*0.16),op=Math.max(0,0.22-r*0.016),hue=28+r*7;
      const pulse=1+Math.sin(t*0.8+r*0.3)*0.03;
      ctx.strokeStyle=`hsla(${hue},85%,72%,${op})`;
      ctx.lineWidth=Math.max(0.4,2.8-r*0.20);
      ctx.beginPath();
      ctx.ellipse(cx,cy,rr*pulse,rr*0.28,t*0.04+r*0.08,0,Math.PI*2);
      ctx.stroke();
     }

     /* ── Trou noir central ── */
     const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,R*0.65);
     bg.addColorStop(0,'rgba(0,0,0,1)');bg.addColorStop(0.7,'rgba(0,0,0,0.95)');bg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bg;ctx.beginPath();ctx.arc(cx,cy,R*0.65,0,Math.PI*2);ctx.fill();

     /* ── Points chauds orbitaux ── */
     for(let i=0;i<3;i++){
      const a=t*0.5+i*2.1,px=cx+Math.cos(a)*R*0.72,py=cy+Math.sin(a)*R*0.22;
      const pg=ctx.createRadialGradient(px,py,0,px,py,16);
      pg.addColorStop(0,'rgba(255,200,100,0.3)');pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pg;ctx.fillRect(px-20,py-20,40,40);
     }

     /* ── Étoiles orbite proche (comme avant) ── */
     ctx.fillStyle='rgba(255,255,255,0.55)';
     for(let i=0;i<40;i++){
      const sa=(i/40)*Math.PI*2+t*0.008,sd=R*1.5+Math.sin(i*4.7)*R*0.45;
      ctx.beginPath();ctx.arc(cx+Math.cos(sa)*sd,cy+Math.sin(sa)*sd*0.48,0.7,0,Math.PI*2);ctx.fill();
     }

     t+=0.015;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
