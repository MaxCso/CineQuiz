// CinéQuiz splash chunk — Dans la peau de John Malkovich
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Dans la peau de John Malkovich"]={
   name:'Dans la peau de John Malkovich',
   color:'80,40,120',
   ref:'Dans la peau de John Malkovich \u2014 Spike Jonze, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0'; let t=0; const cx=W/2, cy=H/2;
    let _s=document.getElementById('_jm_s');
    if(!_s){_s=document.createElement('style');_s.id='_jm_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Orbes violettes ── */
    const orbs=[
      {phase:0,          spd:0.007, rx:W*0.32, ry:H*0.22, r:W*0.28, op:0.13, col:'120,70,200'},
      {phase:Math.PI/2,  spd:0.009, rx:W*0.26, ry:H*0.18, r:W*0.22, op:0.10, col:'90,40,170'},
      {phase:Math.PI,    spd:0.006, rx:W*0.38, ry:H*0.28, r:W*0.20, op:0.09, col:'150,80,220'},
      {phase:Math.PI*1.5,spd:0.011, rx:W*0.20, ry:H*0.14, r:W*0.16, op:0.08, col:'80,30,160'},
      {phase:0.8,        spd:0.008, rx:W*0.44, ry:H*0.32, r:W*0.18, op:0.07, col:'180,100,240'},
      {phase:2.4,        spd:0.005, rx:W*0.15, ry:H*0.38, r:W*0.24, op:0.11, col:'100,50,180'},
    ];

    /* ── Particules de poussière flottantes ── */
    const dust=Array.from({length:45},()=>{
      return {
        x:Math.random()*W, y:Math.random()*H,
        vx:(Math.random()-0.5)*0.18, vy:-(Math.random()*0.12+0.04),
        r:Math.random()*1.4+0.4, op:Math.random()*0.22+0.05,
        ph:Math.random()*Math.PI*2
      };
    });

    /* ── Chargement de l'image SVG porte ── */
    const _doorImg = new Image();
    _doorImg.src = 'images/sprite_06.svg';
    let _doorReady = false;
    _doorImg.onload = ()=>{ _doorReady = true; };

    /* Dimensions et position de la porte — centrée, proportion 58x58 → ratio 1:1 ajusté */
    /* SVG viewBox 0 0 58 58 — la porte occupe x:10→48, y:0→57.5 soit 38×57.5 */
    /* On affiche le SVG complet à la bonne taille */
    const DOOR_H = H * 0.42;
    const DOOR_W = DOOR_H * (58/58); /* SVG est carré mais la porte est dedans */
    const DOOR_X = cx - DOOR_W/2;
    const DOOR_Y = H*0.43; /* légèrement en dessous du centre */

    let revealed = 0;

    function drawDoorEffects(alpha){
      /* Halo de lumière dorée qui pulse derrière la porte */
      const pulse = 0.7 + Math.sin(t * 1.3) * 0.3;
      const hx = DOOR_X + DOOR_W*0.5;
      const hy = DOOR_Y + DOOR_H*0.5;

      /* Lueur large derrière */
      const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, DOOR_W*1.0);
      halo.addColorStop(0, `rgba(200,155,50,${0.22*alpha*pulse})`);
      halo.addColorStop(0.5,`rgba(140,90,20,${0.10*alpha*pulse})`);
      halo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo; ctx.fillRect(0,0,W,H);

      /* Fente lumineuse sous la porte */
      const gapY = DOOR_Y + DOOR_H * 0.975;
      const gw   = DOOR_W * 0.55;
      const gg   = ctx.createLinearGradient(hx-gw, gapY, hx+gw, gapY);
      gg.addColorStop(0,'rgba(0,0,0,0)');
      gg.addColorStop(0.2,`rgba(230,185,80,${0.65*alpha*pulse})`);
      gg.addColorStop(0.5,`rgba(255,210,100,${0.90*alpha*pulse})`);
      gg.addColorStop(0.8,`rgba(230,185,80,${0.65*alpha*pulse})`);
      gg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=gg;
      ctx.fillRect(hx-gw, gapY, gw*2, DOOR_H*0.02);

      /* Reflet au sol */
      const floor = ctx.createRadialGradient(hx, gapY+DOOR_H*0.05, 0, hx, gapY+DOOR_H*0.05, DOOR_W*0.7);
      floor.addColorStop(0, `rgba(190,140,45,${0.20*alpha*pulse})`);
      floor.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=floor; ctx.fillRect(0,0,W,H);

      /* Lumières filtrées côtés (fentes latérales) */
      [DOOR_X + DOOR_W*0.175, DOOR_X + DOOR_W*0.825].forEach(lx=>{
        const lg = ctx.createLinearGradient(lx, DOOR_Y+DOOR_H*0.12, lx, DOOR_Y+DOOR_H*0.88);
        lg.addColorStop(0,'rgba(0,0,0,0)');
        lg.addColorStop(0.3,`rgba(210,165,55,${0.28*alpha*pulse})`);
        lg.addColorStop(0.7,`rgba(210,165,55,${0.28*alpha*pulse})`);
        lg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=lg;
        ctx.fillRect(lx-1, DOOR_Y+DOOR_H*0.12, 2, DOOR_H*0.76);
      });
    }

    let fadeIn=0;
    function frame(){
      if(stop.v) return;
      if(fadeIn < 1) fadeIn = Math.min(1, fadeIn+0.006);
      if(revealed < 1) revealed = Math.min(1, revealed+0.007);

      /* Fond très sombre */
      ctx.fillStyle='#06040e'; ctx.fillRect(0,0,W,H);

      /* ── Orbes violettes ── */
      for(const o of orbs){
        o.phase += o.spd;
        const ox = cx + Math.sin(o.phase)*o.rx;
        const oy = cy + Math.cos(o.phase*0.7)*o.ry;
        const og = ctx.createRadialGradient(ox,oy,o.r*0.08,ox,oy,o.r);
        og.addColorStop(0,`rgba(${o.col},${o.op*1.6})`);
        og.addColorStop(0.45,`rgba(${o.col},${o.op})`);
        og.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=og;
        ctx.beginPath(); ctx.arc(ox,oy,o.r,0,Math.PI*2); ctx.fill();
      }

      /* Halo central violet subtil */
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.40);
      cg.addColorStop(0,'rgba(110,60,180,0.10)');
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg; ctx.fillRect(0,0,W,H);

      /* ── Poussière ── */
      for(const d of dust){
        d.x+=d.vx; d.y+=d.vy; d.ph+=0.022;
        d.x+=Math.sin(d.ph)*0.15;
        if(d.y<-5){d.y=H+5; d.x=Math.random()*W;}
        ctx.fillStyle=`rgba(200,170,255,${d.op*fadeIn})`;
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill();
      }

      /* ── Effets lumineux derrière la porte ── */
      drawDoorEffects(revealed * fadeIn);

      /* ── Porte SVG ── */
      if(_doorReady){
        ctx.save();
        ctx.globalAlpha = revealed * fadeIn;
        ctx.drawImage(_doorImg, DOOR_X, DOOR_Y, DOOR_W, DOOR_H);
        ctx.restore();
      }

      /* ── Vignette forte ── */
      const vg=ctx.createRadialGradient(cx,cy,H*0.06,cx,cy,H*0.92);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.45,'rgba(0,0,0,0.22)');
      vg.addColorStop(0.72,'rgba(0,0,0,0.65)');
      vg.addColorStop(1,'rgba(0,0,0,0.97)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
