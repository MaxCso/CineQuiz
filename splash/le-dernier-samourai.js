// CinéQuiz splash chunk — Le dernier samouraï
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le dernier samouraï"]={
   name:'Le dernier samoura\u00ef',
   color:'60,80,40',
   ref:'The Last Samurai \u2014 Edward Zwick, 2003',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _lsS=document.getElementById('_ls_s');
    if(!_lsS){_lsS=document.createElement('style');_lsS.id='_ls_s';document.head.appendChild(_lsS);}
    _lsS.textContent=`
     

     #splash-content-wrap{top:25%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(255,240,210,0.92)!important;font-size:14px!important;text-shadow:0 1px 10px rgba(0,0,0,0.8)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _lsW=setInterval(()=>{if(stop.v){_lsS.textContent='';clearInterval(_lsW);}},200);

    /* ── SVG personnage + herbes (721×546, ratio ~1.321) ── */
    const lastImg=new Image(); let lastReady=false;
    lastImg.onload=()=>{ lastReady=true; };
    lastImg.src='images/Last.svg';
    const LAST_RATIO=721/546;

    /* ── Particules : cendres / braises qui s'élèvent ── */
    const embers=Array.from({length:55},()=>({
      x:Math.random()*W,
      y:H*(0.5+Math.random()*0.5),
      vy:-(0.25+Math.random()*0.55),
      vx:(Math.random()-0.5)*0.30,
      r:0.6+Math.random()*1.8,
      op:0.15+Math.random()*0.50,
      ph:Math.random()*Math.PI*2,
      spd:0.018+Math.random()*0.030,
      warm:Math.random()<0.65, /* orange-rouge ou gris cendre */
    }));

    /* ── Feuilles qui tombent ── */
    const leaves=Array.from({length:14},()=>({
      x:Math.random()*W,
      y:Math.random()*H*0.75,
      vx:(Math.random()-0.5)*0.55,
      vy:0.30+Math.random()*0.45,
      rot:Math.random()*Math.PI*2,
      rotSpd:(Math.random()-0.5)*0.055,
      size:W*(0.008+Math.random()*0.012),
      op:0.25+Math.random()*0.45,
      ph:Math.random()*Math.PI*2,
    }));

    /* ── Soleil — disque qui pulse ── */
    const sunX=cx, sunY=H*0.38;

    function drawSky(){
      /* Ciel orange brûlant — exactement l'affiche */
      const sky=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,H*0.90);
      sky.addColorStop(0.00,`rgb(${255},${215+Math.sin(t*0.18)*8|0},${60+Math.sin(t*0.18)*15|0})`); /* centre jaune-orange */
      sky.addColorStop(0.18,'rgb(255,165,25)');
      sky.addColorStop(0.40,'rgb(250,115,8)');
      sky.addColorStop(0.65,'rgb(230,75,5)');
      sky.addColorStop(0.85,'rgb(180,42,2)');
      sky.addColorStop(1.00,'rgb(100,18,0)');
      ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

      /* Couche linéaire du bas — assombrit vers la terre */
      const ground=ctx.createLinearGradient(0,H*0.55,0,H);
      ground.addColorStop(0,'rgba(0,0,0,0)');
      ground.addColorStop(0.5,'rgba(8,3,0,0.55)');
      ground.addColorStop(1,'rgba(4,2,0,0.90)');
      ctx.fillStyle=ground; ctx.fillRect(0,H*0.55,W,H*0.45);
    }

    function drawSun(){
      /* Disque solaire — légèrement voilé, pulsant */
      const pulse=0.88+Math.sin(t*0.28)*0.08;
      const sunR=W*0.055*pulse;
      /* Halo externe très doux */
      const halo=ctx.createRadialGradient(sunX,sunY,sunR*0.4,sunX,sunY,sunR*4.5);
      halo.addColorStop(0,`rgba(255,240,180,${0.22*pulse})`);
      halo.addColorStop(0.4,`rgba(255,200,80,${0.10*pulse})`);
      halo.addColorStop(1,'rgba(255,140,20,0)');
      ctx.fillStyle=halo; ctx.fillRect(0,0,W,H*0.75);
      /* Disque */
      const disc=ctx.createRadialGradient(sunX-sunR*0.15,sunY-sunR*0.15,0,sunX,sunY,sunR);
      disc.addColorStop(0,`rgba(255,252,230,${0.72*pulse})`);
      disc.addColorStop(0.5,`rgba(255,230,150,${0.55*pulse})`);
      disc.addColorStop(1,'rgba(255,190,60,0)');
      ctx.fillStyle=disc;
      ctx.beginPath(); ctx.arc(sunX,sunY,sunR,0,Math.PI*2); ctx.fill();
    }

    function drawEmbers(){
      for(const e of embers){
        e.ph+=e.spd;
        e.x+=e.vx+Math.sin(e.ph*0.7)*0.35;
        e.y+=e.vy;
        /* Disparaît en montant, réapparaît en bas */
        if(e.y<H*0.10||(e.op<=0.02)){
          e.x=Math.random()*W;
          e.y=H*(0.65+Math.random()*0.35);
          e.op=0.15+Math.random()*0.50;
        }
        e.op*=0.9985;
        const flicker=0.6+0.4*Math.abs(Math.sin(e.ph*1.3));
        if(e.warm){
          ctx.fillStyle=`rgba(255,${120+Math.random()*80|0},20,${e.op*flicker})`;
        } else {
          ctx.fillStyle=`rgba(160,140,120,${e.op*flicker*0.5})`;
        }
        ctx.beginPath(); ctx.arc(e.x,e.y,e.r,0,Math.PI*2); ctx.fill();
      }
    }

    function drawLeaf(x,y,rot,size,op){
      ctx.save();
      ctx.translate(x,y); ctx.rotate(rot);
      ctx.globalAlpha=op;
      ctx.fillStyle='rgba(40,18,4,0.90)';
      /* Feuille simple — ellipse légèrement pointue */
      ctx.beginPath();
      ctx.ellipse(0,0,size,size*0.38,0,0,Math.PI*2);
      ctx.fill();
      /* Nervure */
      ctx.strokeStyle='rgba(20,8,2,0.60)';
      ctx.lineWidth=size*0.08;
      ctx.beginPath(); ctx.moveTo(-size*0.85,0); ctx.lineTo(size*0.85,0); ctx.stroke();
      ctx.restore();
    }

    function drawLeaves(){
      for(const l of leaves){
        l.ph+=0.012;
        l.x+=l.vx+Math.sin(l.ph)*0.40;
        l.y+=l.vy+Math.cos(l.ph*0.7)*0.18;
        l.rot+=l.rotSpd;
        if(l.y>H+l.size*2){
          l.x=Math.random()*W; l.y=-l.size;
          l.op=0.25+Math.random()*0.45;
        }
        /* Fondu en bas de l'écran */
        const fade=Math.min(1,(H-l.y)/(H*0.15));
        drawLeaf(l.x,l.y,l.rot,l.size,l.op*Math.max(0,fade));
      }
    }

    function drawCharacter(){
      if(!lastReady) return;
      /* SVG 721×546 — occupe toute la largeur, ancré en bas */
      const imgW=W*1.02; /* très légèrement débordant sur les côtés */
      const imgH=imgW/LAST_RATIO;
      const imgX=cx-imgW/2;
      const imgY=H-imgH+imgH*0.02; /* ancré bas, 2% de débordement */
      ctx.drawImage(lastImg, imgX, imgY, imgW, imgH);
    }

    function frame(){
      if(stop.v) return;

      drawSky();
      drawSun();
      drawEmbers();
      drawLeaves();
      drawCharacter();

      /* Vignette — coins sombres */
      const vg=ctx.createRadialGradient(cx,H*0.46,H*0.06,cx,H*0.46,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.50,'rgba(10,4,0,0.06)');
      vg.addColorStop(0.78,'rgba(10,4,0,0.42)');
      vg.addColorStop(1,'rgba(6,2,0,0.92)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain pellicule chaud */
      for(let i=0;i<28;i++){
        const gv=Math.random()*30|0;
        ctx.fillStyle=`rgba(${gv+30},${gv+10},${gv},${Math.random()*0.018})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
