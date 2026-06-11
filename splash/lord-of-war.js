// CinéQuiz splash chunk — Lord of War
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Lord of War"]={
   name:'Lord of War',
   color:'180,140,40',
   ref:'Lord of War \u2014 Andrew Niccol, 2005',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;
    const horizY=H*.50;

    /* ── Position citation/logo en haut + neutralise splash-bg ── */
    let _lowPos=document.getElementById('_low_pos_s');
    if(!_lowPos){_lowPos=document.createElement('style');_lowPos.id='_low_pos_s';document.head.appendChild(_lowPos);}
    _lowPos.textContent='#splash-content-wrap{top:35%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _lowW=setInterval(()=>{if(stop.v){_lowPos.textContent='';clearInterval(_lowW);}},200);

    /* ── Nuages ── */
    const clouds=Array.from({length:10},(_,i)=>({
     x:((i*137+61)%100)/100*W*1.4-W*.2,
     y:((i*73+17)%100)/100*horizY*.75+horizY*.05,
     rx:W*(.09+((i*41)%30)/100*.16),
     ry:H*(.028+((i*29)%20)/100*.022),
     op:.50+((i*53)%30)/100*.32,
     spd:.10+((i*19)%10)/100*.07
    }));

    /* ── SVG bullets (base64) ── */
    const SVG_A = "images/sprite_38.svg";
    const SVG_B = "images/sprite_39.svg";
    const SVG_C = "images/sprite_40.svg";

    const SVGS = [SVG_A, SVG_B, SVG_C];
    const bulletImgs = SVGS.map(src => { const i = new Image(); i.src = src; return i; });
    let bulletsReady = false;
    let loadCount = 0;
    bulletImgs.forEach(i => { i.onload = () => { loadCount++; if(loadCount===bulletImgs.length) bulletsReady=true; }; });

    /* ── Douilles en chute ── */
    const falling = Array.from({length:70},(_,i)=>{
     const z = Math.pow(Math.random(),1.4);
     return {
      x: Math.random()*W*1.2 - W*.1,
      y: Math.random()*H*2 - H,
      z,
      vy: 1.2 + z*3.5,
      vx: (Math.random()-.5)*(.10+z*.40),
      rot: Math.random()*Math.PI*2,
      rotSpd: (Math.random()-.5)*(.025+z*.055),
      vi: i % 3
     };
    }).sort((a,b)=>a.z-b.z);

    /* ── Tapis au sol — plus dense ── */
    const CARPET = 180;
    const carpet = Array.from({length:CARPET},(_,i)=>{
     const depth = Math.pow((i*97+31)%1000/1000, .65);
     return {
      sx: ((i*137+53)%1000)/1000,
      depth,
      rot: ((i*41)%1000)/1000 * Math.PI*2,
      vi: i%3
     };
    }).sort((a,b)=>a.depth-b.depth);

    function drawBullet(x,y,rot,scale,vi,alpha){
     if(!bulletsReady || alpha<.01) return;
     const img = bulletImgs[vi];
     if(!img.complete) return;
     /* ratio portrait 640×1280 → 1:2 */
     const bh = H * .065 * scale;
     const bw = bh * .5;
     ctx.save();
     ctx.globalAlpha = Math.min(1,alpha);
     ctx.translate(x,y);
     ctx.rotate(rot);
     ctx.drawImage(img, -bw/2, -bh/2, bw, bh);
     ctx.restore();
    }

    function frame(){
     if(stop.v) return;

     /* ── CIEL — bleu azur de l'affiche ── */
     const sky = ctx.createLinearGradient(0,0,0,horizY);
     sky.addColorStop(0,'#3a7ba8');
     sky.addColorStop(.40,'#6aa4c0');
     sky.addColorStop(.80,'#a8d0e8');
     sky.addColorStop(1,'#c8e4f2');
     ctx.fillStyle=sky; ctx.fillRect(0,0,W,horizY);

     /* ── Nuages ── */
     for(const c of clouds){
      c.x+=c.spd; if(c.x>W+c.rx*1.2) c.x=-c.rx*1.2;
      ctx.fillStyle='rgb(248,251,255)';
      ctx.beginPath(); ctx.ellipse(c.x,c.y,c.rx,c.ry,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(c.x-c.rx*.40,c.y-c.ry*.12,c.rx*.50,c.ry*.78,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(c.x+c.rx*.36,c.y+c.ry*.05,c.rx*.43,c.ry*.68,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(140,175,200,0.28)';
      ctx.beginPath(); ctx.ellipse(c.x,c.y+c.ry*.50,c.rx*.80,c.ry*.28,0,0,Math.PI*2); ctx.fill();
     }

     /* ── SOL ── */
     const ground = ctx.createLinearGradient(0,horizY,0,H);
     ground.addColorStop(0,'#585650');
     ground.addColorStop(.25,'#424040');
     ground.addColorStop(.60,'#2a2a28');
     ground.addColorStop(1,'#101010');
     ctx.fillStyle=ground; ctx.fillRect(0,horizY,W,H-horizY);

     /* ── Tapis de douilles au sol ── */
     for(const c of carpet){
      const spread = W*(.05+c.depth*.92);
      const px = cx+(c.sx-.5)*2*spread;
      const py = horizY + c.depth*(H-horizY)*.94;
      const sc = 0.12 + c.depth*1.10;
      const al = 0.18 + c.depth*.75;
      drawBullet(px,py,c.rot,sc,c.vi,al);
     }

     /* ── Douilles en chute ── */
     for(const b of falling){
      b.x += b.vx; b.y += b.vy; b.rot += b.rotSpd;
      if(b.y > H+80){ b.y=-60-Math.random()*H*.5; b.x=Math.random()*W*1.2-W*.1; }
      const fadeIn = Math.min(1,(b.y+100)/(H*.18));
      const sc = 0.20 + b.z*1.10;
      const al = fadeIn*(.40+b.z*.52);
      drawBullet(b.x,b.y,b.rot,sc,b.vi,al);
     }

     /* ── Fondu bas ── */
     const fd = ctx.createLinearGradient(0,H*.70,0,H);
     fd.addColorStop(0,'rgba(0,0,0,0)'); fd.addColorStop(1,'rgba(0,0,0,.90)');
     ctx.fillStyle=fd; ctx.fillRect(0,H*.70,W,H*.30);

     /* ── Vignette latérale légère ── */
     const vg = ctx.createRadialGradient(cx,H*.45,W*.15,cx,H*.45,W*.72);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(.65,'rgba(0,0,0,.03)');
     vg.addColorStop(1,'rgba(0,0,0,.38)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
