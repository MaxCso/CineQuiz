// CinéQuiz splash chunk — Platoon
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Platoon"]={
   name:'Platoon',
   color:'255,100,20',
   ref:'Platoon \u2014 Oliver Stone, 1986',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.95';
    let t=0;
    const cx=W/2;

    /* ── Override fond vers tons chauds affiche ── */
    let _platS=document.getElementById('_plat_s');
    if(!_platS){_platS=document.createElement('style');_platS.id='_plat_s';document.head.appendChild(_platS);}
    _platS.textContent=`
      
      
      
      
      
    `;
    const _platW=setInterval(()=>{if(stop.v){_platS.textContent='';clearInterval(_platW);}},200);

    /* ── Citation remontée sous logo CinéQuiz ── */
    let _platPos=document.getElementById('_plat_pos_s');
    if(!_platPos){_platPos=document.createElement('style');_platPos.id='_plat_pos_s';document.head.appendChild(_platPos);}
    _platPos.textContent='#splash-content-wrap{top:23%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _platPosW=setInterval(()=>{if(stop.v){_platPos.textContent='';clearInterval(_platPosW);}},200);

    const groundY=H*0.72;
    const sunX=cx, sunY=H*0.30;

    /* ── Chargement des images SVG ── */
    const imgs={};
    const svgData={
      palms:    'images/sprite_21.svg',
      solArms:  'images/sprite_22.svg',
      solRun:   'images/sprite_23.svg',
      solCrouch:'images/sprite_24.svg',
      heli1:    'images/sprite_25.svg',
      heli2:    'images/sprite_26.svg',
    };
    let imgsLoaded=0;
    const totalImgs=Object.keys(svgData).length;
    function onImgLoad(){ imgsLoaded++; }
    for(const [k,src] of Object.entries(svgData)){
      const img=new Image();
      img.onload=onImgLoad;
      img.src=src;
      imgs[k]=img;
    }

    /* ── Herbe : précalculer les brins pour éviter le recalcul par frame ── */
    const grassBlades=Array.from({length:28},(_,gi)=>({
     x:gi*(W/27),
     offsetX:(Math.random()-0.5)*W*0.014,
     h:H*(0.018+Math.sin(gi*1.8)*0.006+0.006),
     w:W*0.009,
    }));

    /* ── Particules de poussière ── */
    const dust=Array.from({length:30},()=>({
     x:Math.random()*W, y:groundY-Math.random()*H*0.35,
     vx:(Math.random()-0.5)*0.18, vy:-(Math.random()*0.10+0.02),
     r:Math.random()*2.0+0.5, op:Math.random()*0.15+0.04,
     life:Math.random(), hue:22+Math.random()*18
    }));

    /* ── Braises / étincelles montantes ── */
    const embers=Array.from({length:25},()=>({
     x:Math.random()*W, y:groundY-Math.random()*H*0.15,
     vx:(Math.random()-0.5)*0.25,
     vy:-(Math.random()*0.35+0.10),
     r:Math.random()*1.8+0.6,
     op:0.65+Math.random()*0.30,
     life:Math.random(),
     hue:12+Math.random()*20,
    }));


    /* ── Hélicos — positions et mouvements ── */
    const helis=[
     {x:cx-W*0.28, y:H*0.30, vx:0.20, vy:-0.025, key:'heli1', sc:0.18, flip:false},
     {x:cx+W*0.20, y:H*0.26, vx:-0.10, vy:0.030, key:'heli2', sc:0.13, flip:false},
    ];

    /* ── Grain d'affiche ── */
    function drawGrain(){
     for(let i=0;i<60;i++){
      const gx=Math.random()*W,gy=Math.random()*H;
      const ga=Math.random()*0.028;
      ctx.fillStyle=Math.random()<0.5?`rgba(255,160,60,${ga})`:`rgba(80,10,0,${ga})`;
      ctx.fillRect(gx,gy,Math.random()*2+0.3,Math.random()*2+0.3);
     }
    }

    function frame(){
     if(stop.v)return;

     /* Fond trail orange chaud */
     ctx.fillStyle='rgba(28,8,1,0.20)';ctx.fillRect(0,0,W,H);

     /* Ciel coucher de soleil — dégradé poster */
     const pulse=Math.sin(t*0.18)*0.03;
     const sky=ctx.createLinearGradient(0,0,0,groundY);
     sky.addColorStop(0,`rgba(${180+Math.sin(t*0.10)*8|0},${48+Math.sin(t*0.12)*4|0},8,0.98)`);
     sky.addColorStop(0.28,`rgba(${215+pulse*70|0},${82+pulse*50|0},${12+pulse*12|0},0.96)`);
     sky.addColorStop(0.58,`rgba(${232+pulse*35|0},${112+pulse*25|0},${14+pulse*8|0},0.94)`);
     sky.addColorStop(0.82,`rgba(${208+pulse*25|0},${80+pulse*18|0},8,0.96)`);
     sky.addColorStop(1,`rgba(${138+pulse*18|0},32,4,0.97)`);
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,groundY+H*0.04);

     /* Soleil — grand disque rayonnant */
     const sunOuter=ctx.createRadialGradient(sunX,sunY,W*0.07,sunX,sunY,W*0.46);
     sunOuter.addColorStop(0,`rgba(255,195,55,${0.30+Math.sin(t*0.22)*0.04})`);
     sunOuter.addColorStop(0.38,`rgba(240,130,15,${0.15+Math.sin(t*0.18)*0.03})`);
     sunOuter.addColorStop(0.72,`rgba(200,75,5,${0.07+Math.sin(t*0.15)*0.02})`);
     sunOuter.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunOuter;ctx.beginPath();ctx.arc(sunX,sunY,W*0.46,0,Math.PI*2);ctx.fill();
     const sunInner=ctx.createRadialGradient(sunX-W*0.02,sunY-H*0.015,2,sunX,sunY,W*0.120);
     sunInner.addColorStop(0,`rgba(255,252,205,${0.97+Math.sin(t*0.30)*0.02})`);
     sunInner.addColorStop(0.32,`rgba(255,222,82,0.94)`);
     sunInner.addColorStop(0.66,`rgba(255,170,22,0.90)`);
     sunInner.addColorStop(1,`rgba(240,120,10,0.85)`);
     ctx.fillStyle=sunInner;ctx.beginPath();ctx.arc(sunX,sunY,W*0.120,0,Math.PI*2);ctx.fill();

     /* Brume horizon */
     const haze=ctx.createLinearGradient(0,groundY-H*0.08,0,groundY+H*0.04);
     haze.addColorStop(0,'rgba(160,55,5,0)');
     haze.addColorStop(0.40,`rgba(110,28,4,${0.28+Math.sin(t*0.12)*0.04})`);
     haze.addColorStop(1,'rgba(60,12,2,0)');
     ctx.fillStyle=haze;ctx.fillRect(0,groundY-H*0.08,W,H*0.12);

     /* Sol sombre — propre */
     const floor=ctx.createLinearGradient(0,groundY,0,H);
     floor.addColorStop(0,'rgba(18,5,1,0.97)');
     floor.addColorStop(0.20,'rgba(10,3,0,0.98)');
     floor.addColorStop(1,'rgba(4,1,0,0.99)');
     ctx.fillStyle=floor;ctx.fillRect(0,groundY,W,H-groundY);

     /* Lueur de sol depuis le coucher */
     const glow=ctx.createLinearGradient(0,groundY-H*0.015,0,groundY+H*0.030);
     glow.addColorStop(0,'rgba(160,50,6,0)');
     glow.addColorStop(0.4,`rgba(90,22,3,${0.22+Math.sin(t*0.12)*0.04})`);
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow;ctx.fillRect(0,groundY-H*0.015,W,H*0.045);

     /* Herbe — brins simples, courbes naturelles */
     for(const gb of grassBlades){
      const sway=Math.sin(t*0.58+gb.x*0.042)*W*0.004;
      ctx.strokeStyle=`rgba(8,2,0,${0.80+Math.random()*0.10})`;
      ctx.lineWidth=gb.w*0.8;
      ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(gb.x+gb.offsetX,groundY);
      ctx.quadraticCurveTo(
        gb.x+gb.offsetX+sway*0.5, groundY-gb.h*0.55,
        gb.x+gb.offsetX+sway, groundY-gb.h
      );
      ctx.stroke();
     }
     /* Quelques herbes plus hautes */
     for(let gi=0;gi<14;gi++){
      const gx=W*(0.03+gi*(0.94/13));
      const sway=Math.sin(t*0.65+gx*0.05)*W*0.006;
      const bh=H*(0.028+Math.sin(gi*1.7)*0.008);
      ctx.strokeStyle='rgba(6,1,0,0.70)';
      ctx.lineWidth=W*0.007;
      ctx.beginPath();
      ctx.moveTo(gx,groundY);
      ctx.quadraticCurveTo(gx+sway*0.4,groundY-bh*0.6,gx+sway,groundY-bh);
      ctx.stroke();
     }

     /* ── PALMIERS SVG — ancrés au sol, bien droits comme sur l'affiche ── */
     /* SVG bottom = racines, SVG top = feuilles → drawImage(x, groundY-size, size, size) */
     if(imgs.palms.complete){
      ctx.save();
      ctx.globalCompositeOperation='multiply';

      /* Offset pour enfoncer les troncs dans le sol (le bas du SVG a du padding) */
      const sink=0.14; /* 14% de la taille = enfoncé dans le sol */

      /* Palmier gauche extrême — déborde hors écran */
      ctx.globalAlpha=0.90;
      const ps=W*0.62;
      ctx.drawImage(imgs.palms, -ps*0.22, groundY-ps+ps*sink, ps, ps);

      /* Palmier gauche */
      ctx.globalAlpha=0.88;
      ctx.drawImage(imgs.palms, W*0.08, groundY-ps*0.90+(ps*0.90)*sink, ps*0.90, ps*0.90);

      /* Palmier central légèrement à gauche */
      ctx.globalAlpha=0.85;
      ctx.drawImage(imgs.palms, W*0.28, groundY-ps*0.95+(ps*0.95)*sink, ps*0.95, ps*0.95);

      /* Palmier droit */
      ctx.globalAlpha=0.88;
      ctx.drawImage(imgs.palms, W*0.52, groundY-ps*0.90+(ps*0.90)*sink, ps*0.90, ps*0.90);

      /* Palmier droit extrême — déborde */
      ctx.globalAlpha=0.90;
      ctx.drawImage(imgs.palms, W*0.74, groundY-ps+ps*sink, ps, ps);

      /* Arrière-plan : 2 petits palmiers */
      ctx.globalAlpha=0.45;
      const ps2=W*0.40;
      ctx.drawImage(imgs.palms, W*0.18, groundY-ps2*0.72+(ps2*0.72)*sink, ps2*0.72, ps2*0.72);
      ctx.drawImage(imgs.palms, W*0.55, groundY-ps2*0.70+(ps2*0.70)*sink, ps2*0.70, ps2*0.70);

      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1.0;
      ctx.restore();
     }

     /* ── SOLDATS LATÉRAUX — comme sur l'affiche ── */
     /* Soldat_1 ratio: 866/1477 ≈ 0.587  */
     /* Soldat_2 ratio: 650/1707 ≈ 0.381  */

     /* Gauche : soldat 1 */
     if(imgs.solRun.complete){
      const sh=H*0.195, sw=sh*0.587;
      ctx.save();
      ctx.globalAlpha=0.88;
      ctx.globalCompositeOperation='multiply';
      ctx.drawImage(imgs.solRun, W*0.04, groundY-sh, sw, sh);
      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1.0;
      ctx.restore();
     }

     /* Gauche proche : soldat 2 (accroupi) */
     if(imgs.solCrouch.complete){
      const sh=H*0.155, sw=sh*0.381;
      ctx.save();
      ctx.globalAlpha=0.85;
      ctx.globalCompositeOperation='multiply';
      ctx.drawImage(imgs.solCrouch, W*0.22, groundY-sh, sw, sh);
      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1.0;
      ctx.restore();
     }

     /* Droite proche : soldat 2 */
     if(imgs.solCrouch.complete){
      const sh=H*0.155, sw=sh*0.381;
      ctx.save();
      ctx.globalAlpha=0.85;
      ctx.globalCompositeOperation='multiply';
      /* Miroir horizontal */
      ctx.translate(W*0.78+sw, 0);
      ctx.scale(-1,1);
      ctx.drawImage(imgs.solCrouch, 0, groundY-sh, sw, sh);
      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1.0;
      ctx.restore();
     }

     /* Droite : soldat 1 miroir */
     if(imgs.solRun.complete){
      const sh=H*0.195, sw=sh*0.587;
      ctx.save();
      ctx.globalAlpha=0.88;
      ctx.globalCompositeOperation='multiply';
      ctx.translate(W*0.96+sw, 0);
      ctx.scale(-1,1);
      ctx.drawImage(imgs.solRun, 0, groundY-sh, sw, sh);
      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1.0;
      ctx.restore();
     }
     for(const h of helis){
      h.x+=h.vx; h.y+=h.vy;
      if(h.x<-W*0.22)h.x=W*1.12;
      if(h.x>W*1.22)h.x=-W*0.12;
      if(h.y<H*0.18)h.vy=Math.abs(h.vy);
      if(h.y>H*0.42)h.vy=-Math.abs(h.vy);
      const img=imgs[h.key];
      if(!img||!img.complete)continue;
      /* Ratio original hélico : 1280/640 = 2:1 */
      const hw=W*h.sc*2, hh=W*h.sc;
      ctx.save();
      ctx.globalAlpha=0.88;
      ctx.globalCompositeOperation='multiply';
      if(h.flip){
       ctx.scale(-1,1);
       ctx.drawImage(img,-h.x-hw,h.y-hh*0.5,hw,hh);
      }else{
       ctx.drawImage(img,h.x-hw*0.5,h.y-hh*0.5,hw,hh);
      }
      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1.0;
      ctx.restore();
     }

     /* ── SOLDAT BRAS LEVÉS — scène iconique, centré en bas ── */
     if(imgs.solArms.complete){
      /* Ratio SVG original : 196/383 = 0.512 */
      const sh=H*0.28;
      const sw=sh*0.512;
      ctx.save();
      ctx.globalAlpha=0.96;
      ctx.globalCompositeOperation='multiply';
      ctx.drawImage(imgs.solArms,cx-sw*0.5,groundY-sh*0.82,sw,sh);
      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1.0;
      ctx.restore();
     }

     /* Poussière */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.life+=0.008;
      if(d.life>1){d.life=0;d.x=Math.random()*W;d.y=groundY-Math.random()*H*0.10;}
      const da=Math.sin(d.life*Math.PI)*d.op;
      ctx.fillStyle=`hsla(${d.hue},70%,55%,${da})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Braises — bien visibles ── */
     for(const em of embers){
      em.x+=em.vx+Math.sin(t*1.4+em.x*0.03)*0.15;
      em.y+=em.vy;
      em.life+=0.009;
      if(em.life>1){
       em.life=0;
       em.x=W*0.05+Math.random()*W*0.90;
       em.y=groundY-Math.random()*H*0.08;
       em.vy=-(Math.random()*0.32+0.10);
      }
      const ea=Math.sin(em.life*Math.PI)*em.op;
      /* Halo lumineux */
      const eg=ctx.createRadialGradient(em.x,em.y,0,em.x,em.y,em.r*4);
      eg.addColorStop(0,`hsla(${em.hue},100%,75%,${ea*0.8})`);
      eg.addColorStop(0.4,`hsla(${em.hue},90%,55%,${ea*0.35})`);
      eg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eg;
      ctx.beginPath();ctx.arc(em.x,em.y,em.r*4,0,Math.PI*2);ctx.fill();
      /* Point central vif */
      ctx.beginPath();ctx.arc(em.x,em.y,em.r*(1-em.life*0.5),0,Math.PI*2);
      ctx.fillStyle=`hsla(${em.hue},100%,82%,${ea})`;
      ctx.fill();
     }

     /* Grain d'affiche */
     drawGrain();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.40,'rgba(10,2,0,0.16)');vg.addColorStop(0.68,'rgba(10,2,0,0.52)');vg.addColorStop(1,'rgba(5,1,0,0.95)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
