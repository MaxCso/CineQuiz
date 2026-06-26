// CinéQuiz splash chunk — Aftersun
// Fond : images/aftersun.png  +  effets superposés (oiseaux, nuages diffus,
// particules de lumière, scintillement solaire sur l'eau, grain argentique).
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Aftersun"]={
   name:'Aftersun',
   color:'60,160,200',
   ref:'Aftersun \u2014 Charlotte Wells, 2022',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;

    /* ── Override fond plein écran — plus de bandes noires ── */
    let _asStyle=document.getElementById('_as_splash_style');
    if(!_asStyle){_asStyle=document.createElement('style');_asStyle.id='_as_splash_style';document.head.appendChild(_asStyle);}
    _asStyle.textContent=`
      #splash-canvas{width:100%!important;height:100%!important;left:0!important;right:0!important;}
    `;
    const _asWatch=setInterval(()=>{if(stop.v){_asStyle.textContent='';clearInterval(_asWatch);}},200);

    /* ── Chargement du fond PNG ── */
    const bg=new Image();
    let bgReady=false;
    bg.onload=function(){bgReady=true;};
    bg.onerror=function(){bgReady=false;};
    bg.src='images/aftersun.png';

    /* ── Géométrie « cover » ── */
    function coverRect(){
     if(!bgReady||!bg.width){return {dx:0,dy:0,dw:W,dh:H};}
     const ir=bg.width/bg.height, cr=W/H;
     let dw,dh,dx,dy;
     if(cr>ir){dw=W;dh=W/ir;dx=0;dy=(H-dh)/2;}
     else      {dh=H;dw=H*ir;dy=0;dx=(W-dw)/2;}
     return {dx,dy,dw,dh};
    }
    function ix(nx){const r=coverRect();return r.dx+nx*r.dw;}
    function iy(ny){const r=coverRect();return r.dy+ny*r.dh;}
    function iscale(){return coverRect().dw/1206;}

    const HORIZON=0.785;  /* ligne d'horizon (normalisée) */

    /* ── Oiseaux lointains ── */
    const birds=Array.from({length:11},()=>({
     x:Math.random()*W*1.4-W*0.2,
     y:H*(0.10+Math.random()*0.34),
     vx:0.18+Math.random()*0.40,
     phase:Math.random()*Math.PI*2,
     size:Math.random()*2.0+1.0,
     flapSpd:0.05+Math.random()*0.04,
     layer:Math.random(),      /* profondeur → opacité/vitesse */
    }));

    /* ── Nuages diffus très légers ── */
    const clouds=Array.from({length:5},(_,i)=>({
     x:Math.random()*W,
     y:H*(0.10+Math.random()*0.40),
     w:W*(0.35+Math.random()*0.45),
     h:H*(0.05+Math.random()*0.06),
     spd:0.06+Math.random()*0.10,
     a:0.04+Math.random()*0.05,
    }));

    /* ── Particules de lumière en suspension (poussière dorée) ── */
    const motes=Array.from({length:42},()=>({
     x:Math.random()*W,
     y:Math.random()*H*HORIZON,
     r:0.6+Math.random()*1.8,
     vx:-0.15+Math.random()*0.30,
     vy:-0.10-Math.random()*0.22,
     a:0.10+Math.random()*0.30,
     tw:Math.random()*Math.PI*2,
     tws:0.012+Math.random()*0.03,
     warm:Math.random(),     /* teinte dorée ↔ blanche */
    }));

    /* ── Scintillements (sparkles) sur la mer ── */
    const sparkles=Array.from({length:30},()=>({
     nx:Math.random(),           /* position normalisée dans la mer */
     ny:HORIZON+Math.random()*(1-HORIZON),
     ph:Math.random()*Math.PI*2,
     sp:0.04+Math.random()*0.06,
     mx:0.7+Math.random()*1.4,   /* taille px à l'échelle */
    }));

    function drawBird(b){
     const flap=Math.sin(b.phase);
     const bw=b.size*3.0*Math.max(0.18,Math.abs(flap));
     const by2=b.y-Math.abs(flap)*b.size*0.5;
     const op=0.18+b.layer*0.34;
     ctx.save();
     ctx.translate(b.x,by2);
     ctx.strokeStyle=`rgba(60,80,95,${op})`;
     ctx.lineWidth=b.size*0.5;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-bw,flap>0?-b.size*0.3:b.size*0.1);ctx.lineTo(0,0);ctx.stroke();
     ctx.beginPath();ctx.moveTo(bw,flap>0?-b.size*0.3:b.size*0.1);ctx.lineTo(0,0);ctx.stroke();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     ctx.clearRect(0,0,W,H);

     /* ── Fond PNG (cover) ── */
     if(bgReady){
      const r=coverRect();
      ctx.drawImage(bg,r.dx,r.dy,r.dw,r.dh);
     } else {
      /* fallback : dégradé proche de l'affiche */
      const sky=ctx.createLinearGradient(0,0,0,H);
      sky.addColorStop(0.00,'#5b8fb0');
      sky.addColorStop(0.45,'#9cc0cf');
      sky.addColorStop(0.70,'#e8dcc4');
      sky.addColorStop(0.785,'#dce4e0');
      sky.addColorStop(0.80,'#3f7e90');
      sky.addColorStop(1.00,'#1c5c6a');
      ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
     }

     /* ── Chaleur dorée diffuse à l'horizon (respiration douce) ── */
     const hazeTop=iy(0.60), hazeBot=iy(HORIZON);
     const haze=ctx.createLinearGradient(0,hazeTop,0,hazeBot);
     haze.addColorStop(0,'rgba(255,220,160,0)');
     haze.addColorStop(0.5,`rgba(255,212,150,${0.05+Math.sin(t*0.2)*0.012})`);
     haze.addColorStop(1,'rgba(255,220,160,0)');
     ctx.fillStyle=haze;ctx.fillRect(0,hazeTop,W,hazeBot-hazeTop);

     /* ── Nuages diffus ── */
     for(const c of clouds){
      c.x+=c.spd;
      if(c.x-c.w/2>W) c.x=-c.w/2;
      const cg=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.w/2);
      cg.addColorStop(0,`rgba(255,255,255,${c.a})`);
      cg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=cg;
      ctx.save();
      ctx.translate(c.x,c.y);
      ctx.scale(1,c.h/(c.w/2));
      ctx.beginPath();ctx.arc(0,0,c.w/2,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* ── Oiseaux ── */
     for(const b of birds){
      b.x+=b.vx*(0.5+b.layer*0.7);
      b.phase+=b.flapSpd;
      if(b.x>W+40) b.x=-40;
      drawBird(b);
     }

     /* ── Scintillement solaire sur l'eau ── */
     const sunRefl=ctx.createRadialGradient(ix(0.42),iy(0.86),0,ix(0.42),iy(0.86),W*0.30);
     sunRefl.addColorStop(0,`rgba(220,235,235,${0.05+Math.sin(t*0.25)*0.02})`);
     sunRefl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunRefl;
     ctx.fillRect(0,iy(HORIZON),W,H-iy(HORIZON));

     /* ── Sparkles sur la mer ── */
     for(const s of sparkles){
      s.ph+=s.sp;
      const tw=Math.max(0,Math.sin(s.ph));
      if(tw<=0.01) continue;
      const px=ix(s.nx), py=iy(s.ny);
      const sz=s.mx*iscale()*(0.6+tw*0.8);
      ctx.fillStyle=`rgba(235,245,245,${(0.12+tw*0.35).toFixed(3)})`;
      ctx.fillRect(px-sz/2,py-sz*0.12,sz,sz*0.24);  /* trait horizontal scintillant */
      ctx.fillRect(px-sz*0.12,py-sz/2,sz*0.24,sz);
     }

     /* ── Particules de lumière en suspension ── */
     for(const m of motes){
      m.x+=m.vx; m.y+=m.vy; m.tw+=m.tws;
      const tw=0.5+0.5*Math.sin(m.tw);
      const cr=Math.round(255), cg2=Math.round(235-m.warm*20), cb=Math.round(200-m.warm*60);
      ctx.fillStyle=`rgba(${cr},${cg2},${cb},${(m.a*tw).toFixed(3)})`;
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
      if(m.y<-5){m.y=H*HORIZON;m.x=Math.random()*W;}
      if(m.x<-5)m.x=W+5; if(m.x>W+5)m.x=-5;
     }

     /* ── Grain argentique (signature visuelle d'Aftersun) ── */
     for(let i=0;i<460;i++){
      const gx=Math.random()*W, gy=Math.random()*H;
      const gs=Math.random()>0.5?1:0.5;
      ctx.fillStyle=`rgba(180,190,195,${Math.random()*0.05})`;
      ctx.fillRect(gx,gy,gs,gs);
     }

     /* ── Vignette douce ── */
     const vg=ctx.createRadialGradient(W/2,H*0.42,H*0.22,W/2,H*0.42,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.65,'rgba(0,0,0,0.03)');
     vg.addColorStop(1,'rgba(0,0,0,0.24)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
