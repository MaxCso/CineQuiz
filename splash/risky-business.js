// CinéQuiz splash chunk — Risky Business
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Risky Business"]={
   name:'Risky Business',
   color:'80,40,120',
   ref:'Risky Business \u2014 Paul Brickman, 1983',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;const cx=W/2;

    let _s=document.getElementById('_rb_s');
    if(!_s){_s=document.createElement('style');_s.id='_rb_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Géographie ── */
    const horizY=H*0.52; /* limite ciel/ville */
    const floorY=H*0.68; /* début parquet */

    /* ── Lumières de fenêtres — Chicago skyline ── */
    const wins=Array.from({length:180},(_,i)=>({
     x:Math.random()*W,
     y:H*0.06+Math.random()*(horizY-H*0.10),
     w:W*(0.008+Math.random()*0.014),
     h:H*(0.006+Math.random()*0.012),
     on:Math.random()<0.62,
     warm:Math.random()<0.55,
     ph:Math.random()*Math.PI*2,
     timer:Math.floor(Math.random()*200)+40,
    }));

    /* ── Particules néon — poussière électrique ── */
    const neonDust=Array.from({length:35},()=>({
     x:Math.random()*W,
     y:floorY-H*0.05+Math.random()*H*0.25,
     vx:(Math.random()-0.5)*0.30,
     vy:-(Math.random()*0.15+0.04),
     r:Math.random()*1.8+0.4,
     hue:Math.random()<0.5?350+Math.random()*15:190+Math.random()*30,
     ph:Math.random()*Math.PI*2,
     op:Math.random()*0.25+0.08,
    }));

    /* ── Vinyle tournant ── */
    let vinylAngle=0;
    function drawVinyl(vx,vy,vr){
     ctx.save();ctx.translate(vx,vy);ctx.rotate(vinylAngle);
     /* Disque */
     const dg=ctx.createRadialGradient(0,0,vr*0.06,0,0,vr);
     dg.addColorStop(0,'rgba(22,16,28,0.97)');
     dg.addColorStop(0.18,'rgba(10,7,14,0.98)');
     dg.addColorStop(1,'rgba(5,3,8,0.99)');
     ctx.fillStyle=dg;ctx.beginPath();ctx.arc(0,0,vr,0,Math.PI*2);ctx.fill();
     /* Rainures irisées */
     for(let ri=2;ri<=11;ri++){
      const ro=vr*(ri/12);
      ctx.strokeStyle=`rgba(${60+ri*8},${40+ri*5},${80+ri*8},${0.08+ri*0.015})`;
      ctx.lineWidth=0.6;ctx.beginPath();ctx.arc(0,0,ro,0,Math.PI*2);ctx.stroke();
     }
     /* Reflet irisé tournant */
     const ir=ctx.createLinearGradient(-vr,0,vr,0);
     ir.addColorStop(0,'rgba(0,0,0,0)');
     ir.addColorStop(0.38,`rgba(120,80,160,${0.14+Math.sin(vinylAngle*2)*0.06})`);
     ir.addColorStop(0.62,`rgba(80,120,180,${0.10+Math.sin(vinylAngle*2+1)*0.05})`);
     ir.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ir;
     ctx.beginPath();ctx.arc(0,0,vr,0,Math.PI*2);ctx.fill();
     /* Label rouge */
     const lg=ctx.createRadialGradient(-vr*0.05,-vr*0.05,1,0,0,vr*0.30);
     lg.addColorStop(0,'rgba(240,70,40,0.97)');
     lg.addColorStop(0.55,'rgba(190,30,15,0.93)');
     lg.addColorStop(1,'rgba(130,12,6,0.88)');
     ctx.fillStyle=lg;ctx.beginPath();ctx.arc(0,0,vr*0.30,0,Math.PI*2);ctx.fill();
     /* Trou */
     ctx.fillStyle='rgba(6,4,10,0.99)';
     ctx.beginPath();ctx.arc(0,0,vr*0.055,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    /* ── Tom Cruise — danse icônique ── */
    function drawTomCruise(x,y){
     const s=H*0.26;
     const dp=t*2.2; /* dance phase */
     const lean=Math.sin(dp)*0.18;
     const slide=Math.sin(dp*0.7)*W*0.022; /* glissement sur chaussettes */
     const armL=Math.sin(dp*0.9+0.4)*0.75;
     const armR=Math.sin(dp*0.9-0.4+Math.PI*0.6)*0.80;
     const legL=Math.sin(dp*1.0)*0.32;
     const legR=Math.sin(dp*1.0+Math.PI)*0.32;
     const headBob=Math.sin(dp*1.8)*s*0.018;

     ctx.save();
     ctx.translate(x+slide,y);
     ctx.rotate(lean);

     /* Ombre sur le parquet */
     ctx.save();ctx.globalAlpha=0.28;
     ctx.fillStyle='rgba(0,0,0,1)';
     ctx.beginPath();ctx.ellipse(0,s*0.02,s*0.28+Math.abs(slide)*0.5,s*0.04,0,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* ── CHAUSSETTES BLANCHES — détail iconique ── */
     /* Pied gauche */
     ctx.save();ctx.translate(-s*0.10,0);ctx.rotate(legL);
     ctx.fillStyle='rgba(235,232,228,0.96)';
     ctx.beginPath();ctx.ellipse(Math.sin(legL)*s*0.08,s*0.02,s*0.12,s*0.038,-0.2,0,Math.PI*2);ctx.fill();
     ctx.restore();
     /* Pied droit */
     ctx.save();ctx.translate(s*0.10,0);ctx.rotate(legR);
     ctx.fillStyle='rgba(235,232,228,0.96)';
     ctx.beginPath();ctx.ellipse(Math.sin(legR)*s*0.08,s*0.02,s*0.12,s*0.038,0.2,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* ── JAMBES ── */
     ctx.strokeStyle='rgba(18,12,8,0.98)';ctx.lineCap='round';
     /* Jambe gauche */
     ctx.lineWidth=s*0.10;
     ctx.save();ctx.translate(-s*0.10,-s*0.02);ctx.rotate(legL);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-s*0.04,s*0.28);ctx.stroke();
     ctx.restore();
     /* Jambe droite */
     ctx.save();ctx.translate(s*0.10,-s*0.02);ctx.rotate(legR);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(s*0.04,s*0.28);ctx.stroke();
     ctx.restore();

     /* ── SLIP / Short ── */
     ctx.fillStyle='rgba(18,12,8,0.98)';
     ctx.beginPath();
     ctx.moveTo(-s*0.18,-s*0.04);ctx.lineTo(s*0.18,-s*0.04);
     ctx.lineTo(s*0.14,-s*0.25);ctx.lineTo(-s*0.14,-s*0.25);
     ctx.closePath();ctx.fill();

     /* ── CHEMISE BLANCHE ouverte ── */
     /* Corps de la chemise */
     ctx.fillStyle='rgba(228,224,218,0.94)';
     ctx.beginPath();ctx.roundRect(-s*0.20,-s*0.56,s*0.40,s*0.34,3);ctx.fill();
     /* Ouverture chemise (pan ouvert = rock) */
     ctx.fillStyle='rgba(18,12,8,0.96)';
     ctx.beginPath();
     ctx.moveTo(-s*0.04,-s*0.56);ctx.lineTo(-s*0.04,-s*0.24);
     ctx.lineTo(s*0.06,-s*0.24);ctx.lineTo(s*0.06,-s*0.56);
     ctx.closePath();ctx.fill();
     /* Ombre sur la chemise */
     const shG=ctx.createLinearGradient(-s*0.20,-s*0.56,s*0.20,-s*0.56);
     shG.addColorStop(0,'rgba(0,0,0,0.10)');shG.addColorStop(0.5,'rgba(0,0,0,0)');shG.addColorStop(1,'rgba(0,0,0,0.08)');
     ctx.fillStyle=shG;ctx.fillRect(-s*0.20,-s*0.56,s*0.40,s*0.34);

     /* ── BRAS ── */
     ctx.lineWidth=s*0.09;ctx.strokeStyle='rgba(200,170,130,0.92)';
     /* Bras gauche — levé, microphone imaginaire */
     ctx.save();ctx.translate(-s*0.20,-s*0.44);ctx.rotate(armL-0.6);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-s*0.14,-s*0.25);ctx.stroke();
     /* Main */
     ctx.fillStyle='rgba(200,165,120,0.90)';
     ctx.beginPath();ctx.arc(-s*0.14,-s*0.25,s*0.055,0,Math.PI*2);ctx.fill();
     ctx.restore();
     /* Bras droit — en arrière */
     ctx.save();ctx.translate(s*0.20,-s*0.44);ctx.rotate(armR+0.5);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(s*0.16,s*0.12);ctx.stroke();
     ctx.fillStyle='rgba(200,165,120,0.90)';
     ctx.beginPath();ctx.arc(s*0.16,s*0.12,s*0.055,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* ── TÊTE ── */
     ctx.fillStyle='rgba(200,165,120,0.95)';
     ctx.beginPath();ctx.arc(0,-s*0.65+headBob,s*0.14,0,Math.PI*2);ctx.fill();
     /* Cheveux bruns */
     ctx.fillStyle='rgba(55,32,12,0.92)';
     ctx.beginPath();
     ctx.arc(0,-s*0.72+headBob,s*0.12,Math.PI,0);ctx.fill();
     ctx.beginPath();
     ctx.arc(-s*0.08,-s*0.66+headBob,s*0.06,Math.PI*1.2,Math.PI*0.2);ctx.fill();
     /* Lunettes soleil Ray-Ban — 1983 ── */
     ctx.fillStyle='rgba(8,6,4,0.95)';
     ctx.beginPath();ctx.roundRect(-s*0.13,-s*0.67+headBob,s*0.10,s*0.055,s*0.02);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.03,-s*0.67+headBob,s*0.10,s*0.055,s*0.02);ctx.fill();
     /* Pont des lunettes */
     ctx.strokeStyle='rgba(8,6,4,0.95)';ctx.lineWidth=s*0.012;
     ctx.beginPath();ctx.moveTo(-s*0.03,-s*0.648+headBob);ctx.lineTo(s*0.03,-s*0.648+headBob);ctx.stroke();
     /* Branches */
     ctx.beginPath();ctx.moveTo(-s*0.13,-s*0.648+headBob);ctx.lineTo(-s*0.16,-s*0.648+headBob);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.13,-s*0.648+headBob);ctx.lineTo(s*0.16,-s*0.648+headBob);ctx.stroke();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     vinylAngle+=0.025;

     /* ── CIEL — nuit Chicago, bleu-noir profond ── */
     const sky=ctx.createLinearGradient(0,0,0,horizY);
     sky.addColorStop(0,'#04030c');
     sky.addColorStop(0.30,'#060510');
     sky.addColorStop(0.65,'#0a0818');
     sky.addColorStop(1,'#0e0c22');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,horizY);

     /* Halo rose néon en haut — ambiance 80s ── */
     const neonHalo=ctx.createRadialGradient(cx,0,0,cx,0,W*0.65);
     neonHalo.addColorStop(0,`rgba(200,40,100,${0.10+Math.sin(t*0.8)*0.03})`);
     neonHalo.addColorStop(0.4,'rgba(140,20,70,0.04)');
     neonHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=neonHalo;ctx.fillRect(0,0,W,horizY);

     /* ── SKYLINE Chicago — silhouette ── */
     ctx.fillStyle='rgba(6,5,14,0.98)';
     ctx.beginPath();ctx.moveTo(-W*0.01,horizY);
     const sky2=[[0,0.42],[0.04,0.28],[0.08,0.35],[0.12,0.20],[0.17,0.14],[0.20,0.22],[0.24,0.16],[0.28,0.26],
      [0.32,0.10],[0.36,0.18],[0.40,0.28],[0.44,0.08],[0.48,0.16],[0.52,0.22],[0.56,0.12],
      [0.60,0.20],[0.64,0.28],[0.68,0.14],[0.72,0.22],[0.76,0.10],[0.80,0.18],[0.84,0.28],
      [0.88,0.20],[0.92,0.14],[0.96,0.24],[1.00,0.35],[1.02,0.42]];
     for(const [sx,sy] of sky2)ctx.lineTo(sx*W,sy*H);
     ctx.lineTo(W*1.02,horizY);ctx.closePath();ctx.fill();

     /* ── FENÊTRES ville ── */
     for(const w of wins){
      w.ph+=0.010;w.timer--;
      if(w.timer<=0){w.timer=80+Math.floor(Math.random()*180);w.on=Math.random()<0.62;}
      if(!w.on)continue;
      const r=w.warm?255:180,g=w.warm?Math.round(185+Math.sin(w.ph)*12):210,b=w.warm?80:255;
      ctx.fillStyle=`rgba(${r},${g},${b},${0.18+Math.sin(w.ph)*0.07})`;
      ctx.fillRect(w.x,w.y,w.w,w.h);
     }

     /* ── ZONE SALON — entre skyline et parquet ── */
     /* Fond de la pièce — nuit bleue vue par la baie vitrée */
     const roomG=ctx.createLinearGradient(0,horizY,0,floorY);
     roomG.addColorStop(0,'rgba(8,6,18,0.96)');
     roomG.addColorStop(1,'rgba(12,8,20,0.98)');
     ctx.fillStyle=roomG;ctx.fillRect(0,horizY,W,floorY-horizY);

     /* Grande baie vitrée — reflet de nuit */
     const winFrame=W*0.016;
     ctx.strokeStyle='rgba(22,18,38,0.96)';ctx.lineWidth=winFrame;
     /* Montants verticaux */
     for(const fx of [W*0.22,W*0.50,W*0.78]){
      ctx.beginPath();ctx.moveTo(fx,horizY);ctx.lineTo(fx,floorY);ctx.stroke();
     }
     /* Traverse horizontale */
     ctx.beginPath();ctx.moveTo(0,(horizY+floorY)/2);ctx.lineTo(W,(horizY+floorY)/2);ctx.stroke();

     /* ── PARQUET — cœur de la scène ── */
     const floorG=ctx.createLinearGradient(0,floorY,0,H);
     floorG.addColorStop(0,'#2a1a0a');
     floorG.addColorStop(0.20,'#221408');
     floorG.addColorStop(0.55,'#1a0e05');
     floorG.addColorStop(1,'#100902');
     ctx.fillStyle=floorG;ctx.fillRect(0,floorY,W,H-floorY);

     /* Lames de parquet — perspective convergente */
     ctx.strokeStyle='rgba(48,30,10,0.45)';ctx.lineWidth=0.8;
     const vp2={x:cx,y:floorY};
     for(let li=0;li<=12;li++){
      const lx=(li/12)*W;
      ctx.beginPath();ctx.moveTo(vp2.x+(lx-vp2.x)*0.05,vp2.y);ctx.lineTo(lx,H);ctx.stroke();
     }
     for(let li=0;li<=8;li++){
      const ly=floorY+li*(H-floorY)/8;
      const spread=(ly-floorY)/(H-floorY);
      ctx.beginPath();ctx.moveTo(cx-W*0.52*spread,ly);ctx.lineTo(cx+W*0.52*spread,ly);ctx.stroke();
     }

     /* ── REFLETS NÉON SUR LE PARQUET ── */
     /* Rose chaud depuis gauche */
     const nR1=ctx.createRadialGradient(W*0.20,floorY+H*0.04,0,W*0.20,floorY+H*0.04,W*0.45);
     nR1.addColorStop(0,`rgba(255,50,120,${0.18+Math.sin(t*1.1)*0.04})`);
     nR1.addColorStop(0.4,'rgba(200,30,80,0.07)');nR1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nR1;ctx.fillRect(0,floorY,W,H-floorY);

     /* Bleu cyan depuis droite */
     const nR2=ctx.createRadialGradient(W*0.82,floorY+H*0.06,0,W*0.82,floorY+H*0.06,W*0.40);
     nR2.addColorStop(0,`rgba(40,180,255,${0.14+Math.sin(t*0.9+1)*0.04})`);
     nR2.addColorStop(0.4,'rgba(20,120,200,0.06)');nR2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nR2;ctx.fillRect(0,floorY,W,H-floorY);

     /* Reflet central — lumière d'ambiance */
     const nRc=ctx.createRadialGradient(cx,floorY,0,cx,floorY,W*0.50);
     nRc.addColorStop(0,`rgba(180,100,40,${0.12+Math.sin(t*0.6)*0.03})`);
     nRc.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nRc;ctx.fillRect(0,floorY,W,H-floorY);

     /* ── POUSSIÈRE NÉON flottante ── */
     for(const d of neonDust){
      d.x+=d.vx;d.y+=d.vy;d.ph+=0.022;
      if(d.y<floorY-H*0.15){d.y=floorY+H*0.05+Math.random()*H*0.10;d.x=Math.random()*W;}
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      const da=d.op*(0.4+0.6*Math.sin(d.ph));
      ctx.fillStyle=`hsla(${d.hue},90%,65%,${da})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── VINYLE qui tourne — haut droite ── */
     drawVinyl(W*0.80,floorY-H*0.06,W*0.085);

     /* ── TOM CRUISE qui danse ── */
     drawTomCruise(cx-W*0.04,floorY);

     /* ── REFLET de Tom sur le parquet ── */
     ctx.save();
     ctx.globalAlpha=0.15;
     ctx.scale(1,-1);
     ctx.translate(0,-floorY*2);
     ctx.filter='blur(2px)';
     drawTomCruise(cx-W*0.04,floorY);
     ctx.restore();

     /* ── LIGNES DE SCAN 80s — effet TV ── */
     for(let si=0;si<H;si+=4){
      ctx.fillStyle='rgba(0,0,0,0.028)';
      ctx.fillRect(0,si,W,1);
     }

     /* ── Vignette ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.04,cx,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.40,'rgba(0,0,0,0.18)');
     vg.addColorStop(1,'rgba(0,0,0,0.96)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain léger */
     for(let i=0;i<45;i++){
      const g=4+Math.random()*14|0;
      ctx.fillStyle=`rgba(${g+5},${g+3},${g+8},${Math.random()*0.020})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
