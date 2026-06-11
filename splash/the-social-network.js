// CinéQuiz splash chunk — The Social Network
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["The Social Network"]={
   name:'The Social Network',
   color:'40,80,160',
   ref:'The Social Network \u2014 David Fincher, 2010',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';

    /* ── Override fond : bleu Facebook vif ── */
    let _snStyle=document.getElementById('_sn_splash_style');
    if(!_snStyle){_snStyle=document.createElement('style');_snStyle.id='_sn_splash_style';document.head.appendChild(_snStyle);}
    _snStyle.textContent=`
      
      
      
      
    `;
    const _snWatch=setInterval(()=>{if(stop.v){_snStyle.textContent='';clearInterval(_snWatch);}},200);

    let t=0;
    const cx=W/2;

    /* ── Logo Facebook SVG → Image ── */
    const FB_SVG='images/sprite_32.svg';
    const LIKE_SVG='images/sprite_33.svg';
    const CMT_SVG='images/sprite_34.svg';

    /* ── Préchargement des images ── */
    const fbImg=new Image(),likeImg=new Image(),cmtImg=new Image();
    let fbReady=false,likeReady=false,cmtReady=false;
    fbImg.onload=()=>{fbReady=true;};   fbImg.src=FB_SVG;
    likeImg.onload=()=>{likeReady=true;};likeImg.src=LIKE_SVG;
    cmtImg.onload=()=>{cmtReady=true;}; cmtImg.src=CMT_SVG;

    /* ── Particules tombantes : logo, likes & commentaires ── */
    const ICON_SIZE=W*0.072;
    function makeParticle(){
     const r=Math.random();
     /* 20% logo Facebook, 45% like, 35% commentaire */
     const type=r<0.20?'logo':r<0.65?'like':'comment';
     /* Le logo tombe plus grand et plus lentement */
     const sizeBase=type==='logo'?ICON_SIZE*(1.1+Math.random()*0.6):ICON_SIZE*(0.50+Math.random()*0.65);
     return {
      x:W*0.05+Math.random()*W*0.90,
      y:-sizeBase*2-Math.random()*H*0.6,
      vy:(type==='logo'?0.40:0.55)+Math.random()*0.80,
      vx:(Math.random()-0.5)*0.18,
      rot:Math.random()*Math.PI*2,
      vrot:(Math.random()-0.5)*(type==='logo'?0.010:0.018),
      size:sizeBase,
      op:type==='logo'?0.70+Math.random()*0.25:0.55+Math.random()*0.38,
      type,
      wobble:Math.random()*Math.PI*2,
      wobbleSpd:0.022+Math.random()*0.022,
     };
    }
    const particles=Array.from({length:36},makeParticle);
    /* Répartir les particules dès le départ sur toute la hauteur */
    particles.forEach((p,i)=>{p.y=-ICON_SIZE+(i/36)*H*1.35;});

    /* ── Nombres de likes/commentaires flottants ── */
    const COUNTS=[
     '+1','👍','❤️','+12','🔥','👍🏼','+247','😂','💯','+1k','🎯','👌',
     '+3.2k','🤩','💪','+892','😍','✨','+42','🏆','💬 14','💬 3.2k',
     '💬 891','💬 28','💬 4k',
    ];
    const floaters=Array.from({length:18},()=>({
     x:W*0.04+Math.random()*W*0.92,
     y:-40-Math.random()*H*0.5,
     vy:0.38+Math.random()*0.55,
     op:0.28+Math.random()*0.32,
     txt:COUNTS[Math.floor(Math.random()*COUNTS.length)],
     size:W*0.028+Math.random()*W*0.018,
    }));
    floaters.forEach((f,i)=>{f.y=-20+(i/18)*H*1.1;});

    function frame(){
     if(stop.v)return;

     /* Fond bleu plein */
     ctx.fillStyle='#0866FF';ctx.fillRect(0,0,W,H);

     /* Léger dégradé vertical pour la profondeur */
     const grad=ctx.createLinearGradient(0,0,0,H);
     grad.addColorStop(0,'rgba(20,80,220,0.35)');
     grad.addColorStop(0.5,'rgba(0,0,0,0)');
     grad.addColorStop(1,'rgba(4,30,120,0.50)');
     ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);

     /* ── Toutes les icônes tombantes (logo + like + commentaire) ── */
     for(const p of particles){
      p.y+=p.vy;p.x+=p.vx;
      p.rot+=p.vrot;
      p.wobble+=p.wobbleSpd;
      p.x+=Math.sin(p.wobble)*0.18;
      if(p.y>H+p.size*2){Object.assign(p,makeParticle());p.y=-p.size;}
      const img=p.type==='logo'?fbImg:p.type==='like'?likeImg:cmtImg;
      const ready=p.type==='logo'?fbReady:p.type==='like'?likeReady:cmtReady;
      if(!ready)continue;
      /* Ratio correct pour le logo Facebook (205×380) */
      const drawW=p.type==='logo'?p.size*(205/380):p.size;
      const drawH=p.size;
      ctx.save();
      ctx.globalAlpha=p.op;
      ctx.translate(p.x+drawW/2,p.y+drawH/2);
      ctx.rotate(p.rot);
      /* Halo lumineux */
      const haloR=Math.max(drawW,drawH)*0.75;
      const halo=ctx.createRadialGradient(0,0,0,0,0,haloR);
      halo.addColorStop(0,'rgba(255,255,255,0.12)');
      halo.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=halo;ctx.beginPath();ctx.arc(0,0,haloR,0,Math.PI*2);ctx.fill();
      ctx.drawImage(img,-drawW/2,-drawH/2,drawW,drawH);
      ctx.restore();
     }

     /* ── Nombres/emojis flottants ── */
     ctx.textBaseline='middle';ctx.textAlign='center';
     for(const f of floaters){
      f.y+=f.vy;
      if(f.y>H+30){f.y=-30;f.x=W*0.04+Math.random()*W*0.92;f.txt=COUNTS[Math.floor(Math.random()*COUNTS.length)];}
      ctx.font=`600 ${f.size}px 'DM Sans',sans-serif`;
      ctx.globalAlpha=f.op;
      ctx.fillStyle='rgba(255,255,255,1)';
      ctx.fillText(f.txt,f.x,f.y);
     }
     ctx.globalAlpha=1.0;

     /* ── Vignette bords ── */
     const vg=ctx.createRadialGradient(cx,H/2,H*0.15,cx,H/2,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(1,'rgba(0,20,80,0.38)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
