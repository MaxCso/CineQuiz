// CinéQuiz splash chunk — Little Miss Sunshine
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Little Miss Sunshine"]={
   name:'Little Miss Sunshine',
   color:'220,160,40',
   ref:'Little Miss Sunshine \u2014 Dayton & Faris, 2006',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_lms_s');
    if(!_s){_s=document.createElement('style');_s.id='_lms_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:rgba(255,255,255,0.95)!important;text-shadow:0 2px 12px rgba(0,0,0,0.35)!important;}#splash-film-logo img,#splash-film-logo svg{filter:drop-shadow(0 2px 10px rgba(0,0,0,0.40))!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Charger l'image SVG du van */
    const vanImg=new Image();
    let vanReady=false;
    vanImg.onload=()=>{vanReady=true;};
    vanImg.src='images/sprite_46.svg';

    /* VW Combi qui roule */
    let vanX=-W*0.55;
    const vanSpd=W*0.0030;
    /* Route du désert */
    let dashOffset=0;
    /* Poussière derrière le van */
    const dust=Array.from({length:22},()=>({x:0,y:0,r:0,op:0,vx:0,vy:0,life:0}));
    let dustTimer=0;
    /* Soleil couchant Arizona */
    const sunY=H*0.30;
    /* Nuages légers */
    const clouds=Array.from({length:4},(_,i)=>({
     x:W*(0.10+i*0.25),y:H*(0.10+Math.random()*0.12),
     w:W*(0.12+Math.random()*0.10),h:H*0.04,spd:W*0.00018+Math.random()*W*0.00010
    }));
    /* Particules de chaleur/lumière */
    const sparkles=Array.from({length:12},()=>({
     x:Math.random()*W,y:H*(0.05+Math.random()*0.45),
     r:Math.random()*1.8+0.4,op:Math.random()*0.5+0.2,ph:Math.random()*Math.PI*2
    }));

    function spawnDust(){
     for(const d of dust){
      if(d.life<=0){
       d.x=vanX+W*0.01;d.y=H*0.748;
       d.vx=-(Math.random()*0.5+0.15);d.vy=-(Math.random()*0.35);
       d.r=W*(0.008+Math.random()*0.016);d.op=0.30+Math.random()*0.22;d.life=1.0;
       return;
      }
     }
    }

    function frame(){
     if(stop.v)return;
     vanX+=vanSpd;
     if(vanX>W*1.35)vanX=-W*0.55;
     dashOffset=(dashOffset+1.5)%40;
     dustTimer++;if(dustTimer%3===0)spawnDust();

     /* === FOND LUMINEUX — Coucher de soleil Arizona chaud === */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#1e90c8');  /* Bleu ciel vif en haut */
     bg.addColorStop(0.30,'#4bbae8');  /* Bleu clair */
     bg.addColorStop(0.52,'#f97c2b');  /* Orange coucher de soleil */
     bg.addColorStop(0.68,'#fbbf24');  /* Jaune chaud horizon */
     bg.addColorStop(0.75,'#e8a900');  /* Ocre désert */
     bg.addColorStop(1.00,'#c47a15');  /* Terre brûlée */
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo soleil large */
     const sunG=ctx.createRadialGradient(W*0.72,sunY,0,W*0.72,sunY,W*0.52);
     sunG.addColorStop(0,'rgba(255,240,80,0.55)');
     sunG.addColorStop(0.25,'rgba(255,180,30,0.25)');
     sunG.addColorStop(0.6,'rgba(255,120,20,0.10)');
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H);

     /* Disque solaire */
     ctx.fillStyle='rgba(255,230,60,1.0)';
     ctx.beginPath();ctx.arc(W*0.72,sunY,W*0.062,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,200,0.60)';
     ctx.beginPath();ctx.arc(W*0.72,sunY,W*0.040,0,Math.PI*2);ctx.fill();

     /* Nuages dorés */
     for(const c of clouds){
      c.x+=c.spd;if(c.x>W+c.w*0.5)c.x=-c.w*0.5;
      const cg=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.w*0.6);
      cg.addColorStop(0,'rgba(255,245,200,0.72)');
      cg.addColorStop(0.5,'rgba(255,220,140,0.45)');
      cg.addColorStop(1,'rgba(255,200,80,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.ellipse(c.x,c.y,c.w*0.5,c.h*1.2,0,0,Math.PI*2);ctx.fill();
     }

     /* Étincelles de chaleur */
     for(const s of sparkles){
      s.ph+=0.020+Math.random()*0.010;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,240,80,${s.op*(0.4+0.6*Math.sin(s.ph))})`;ctx.fill();
     }

     /* === DÉSERT ET ROUTE === */
     /* Sol désert plat — ocre chaud */
     const ground=ctx.createLinearGradient(0,H*0.72,0,H);
     ground.addColorStop(0,'#c47a15');
     ground.addColorStop(0.4,'#a96012');
     ground.addColorStop(1,'#8a4a0a');
     ctx.fillStyle=ground;ctx.fillRect(0,H*0.72,W,H*0.28);

     /* Légère ombre portée au sol */
     const shadowG=ctx.createLinearGradient(0,H*0.72,0,H*0.78);
     shadowG.addColorStop(0,'rgba(0,0,0,0.18)');shadowG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shadowG;ctx.fillRect(0,H*0.72,W,H*0.06);

     /* Route bitumée */
     ctx.fillStyle='#4a3c2a';
     ctx.fillRect(0,H*0.678,W,H*0.076);
     /* Reflet chaud sur la route */
     const roadShine=ctx.createLinearGradient(0,H*0.678,0,H*0.754);
     roadShine.addColorStop(0,'rgba(180,130,40,0.20)');roadShine.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=roadShine;ctx.fillRect(0,H*0.678,W,H*0.076);

     /* Ligne centrale pointillée */
     ctx.strokeStyle='rgba(255,230,80,0.60)';ctx.lineWidth=2;
     for(let i=-1;i<8;i++){
      const lx=(i*40+dashOffset)%(W+40)-20;
      ctx.beginPath();ctx.moveTo(lx,H*0.716);ctx.lineTo(lx+24,H*0.716);ctx.stroke();
     }

     /* Cactus silhouettes — bien visibles */
     ctx.fillStyle='rgba(60,100,30,0.90)';
     for(const [cx2,cy2,sc] of [[W*0.08,H*0.695,1.0],[W*0.88,H*0.685,1.1],[W*0.52,H*0.700,0.8],[W*0.35,H*0.690,0.9]]){
      const h2=H*0.065*sc,w2=W*0.013*sc;
      ctx.fillRect(cx2-w2*0.5,cy2-h2,w2,h2);
      ctx.fillRect(cx2-w2*1.8,cy2-h2*0.50,w2*1.6,H*0.011*sc);
      ctx.fillRect(cx2+w2*0.5, cy2-h2*0.38,w2*1.6,H*0.011*sc);
      ctx.beginPath();ctx.arc(cx2,cy2-h2,w2*0.6,0,Math.PI*2);ctx.fill();
     }

     /* Montagne lointaine — silhouette douce */
     ctx.fillStyle='rgba(180,100,20,0.40)';
     ctx.beginPath();
     ctx.moveTo(0,H*0.73);
     ctx.lineTo(W*0.12,H*0.60);ctx.lineTo(W*0.22,H*0.65);
     ctx.lineTo(W*0.38,H*0.56);ctx.lineTo(W*0.50,H*0.62);
     ctx.lineTo(W*0.65,H*0.54);ctx.lineTo(W*0.80,H*0.63);
     ctx.lineTo(W*0.92,H*0.58);ctx.lineTo(W,H*0.64);
     ctx.lineTo(W,H*0.73);ctx.closePath();ctx.fill();

     /* === POUSSIÈRE DERRIÈRE LE VAN === */
     for(const d of dust){
      if(d.life<=0)continue;
      d.x+=d.vx;d.y+=d.vy*0.5;d.r+=0.4;d.op-=0.010;d.life-=0.013;
      if(d.life<=0)continue;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,160,70,${d.op*d.life})`;ctx.fill();
     }

     /* === VAN SVG === */
     if(vanReady){
      /* Le SVG fait 489×207 — on le place sur la route */
      const vanW=W*0.62;   /* largeur souhaitée */
      const vanH=vanW*(207/489);  /* ratio original */
      const vanDrawY=H*0.752-vanH;   /* aligné sur la route */
      ctx.drawImage(vanImg,vanX-vanW*0.5,vanDrawY,vanW,vanH);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
