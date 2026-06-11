// CinéQuiz splash chunk — Les Évadés
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Les Évadés"]={
   name:'Les Évadés',
   color:'60,100,160',
   ref:'Les Évadés — Frank Darabont, 1994',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    let _leStyle=document.getElementById('_le_splash_style');
    if(!_leStyle){_leStyle=document.createElement('style');_leStyle.id='_le_splash_style';document.head.appendChild(_leStyle);}
    _leStyle.textContent=`
      

      #splash-content-wrap{top:62%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _leWatch=setInterval(()=>{if(stop.v){_leStyle.textContent='';clearInterval(_leWatch);}},200);

    const ANDY_SVG='images/sprite_02.svg';
    const andyImg=new Image();let andyReady=false;
    andyImg.onload=()=>{andyReady=true;};andyImg.src=ANDY_SVG;

    const ANDY_H=H*0.40, ANDY_W=H*0.40*(452/434);
    const ANDY_X=cx-ANDY_W/2, ANDY_Y=H*0.16;

    const RAIN_ANGLE=Math.PI*0.08;
    const drops=Array.from({length:120},()=>{
     return {
      x:Math.random()*W*1.3-W*0.15,
      y:Math.random()*H,
      len:H*(0.025+Math.random()*0.030),
      spd:H*(0.008+Math.random()*0.006),
      op:0.18+Math.random()*0.28,
     };
    });

    /* ── Anneaux d'ondulation depuis le corps d'Andy ── */
    /* Chaque anneau naît au centre du personnage et s'étend vers l'extérieur */
    const RIPPLE_CX=cx;
    const RIPPLE_CY=ANDY_Y+(H*0.40)*0.55; /* centre vertical d'Andy */
    const ripples=Array.from({length:5},(_,i)=>({
     life: i/5,          /* décalage de phase pour les avoir en permanence */
     spd: 0.0055,        /* vitesse d'expansion */
    }));

    /* ── Caustiques — taches lumineuses qui bougent sous l'eau ── */
    const caustics=Array.from({length:18},()=>({
     x: cx+(Math.random()-0.5)*W*0.80,
     y: ANDY_Y+(H*0.40)*0.30 + Math.random()*(H*0.40)*0.80,
     rx: W*(0.022+Math.random()*0.040),
     ry: H*(0.008+Math.random()*0.014),
     ph: Math.random()*Math.PI*2,
     phSpd: 0.018+Math.random()*0.025,
     op: 0.04+Math.random()*0.07,
    }));

    function frame(){
     if(stop.v)return;
     /* Fond aquatique — ciel orageux + eau en bas */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#2a3d5c');
     bg.addColorStop(0.30,'#3a5578');
     bg.addColorStop(0.55,'#4a6a90');
     bg.addColorStop(0.72,'#3d6080');
     bg.addColorStop(0.85,'#2e4d6a');
     bg.addColorStop(1.00,'#1e3350');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
     /* Reflets eau ondulants dans la moitié basse */
     ctx.save();
     for(let wi=0;wi<8;wi++){
      const wy=H*(0.62+wi*0.048);
      const wg=ctx.createLinearGradient(0,wy,0,wy+H*0.035);
      wg.addColorStop(0,'rgba(0,0,0,0)');
      wg.addColorStop(0.5,`rgba(100,155,210,${0.06+Math.sin(t*0.9+wi*0.7)*0.03})`);
      wg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wg;
      ctx.beginPath();
      for(let x=0;x<=W;x+=6) ctx.lineTo(x,wy+Math.sin(x*0.025+t*0.8+wi)*3.5+Math.cos(x*0.015-t*0.5+wi)*2);
      ctx.lineTo(W,wy+H*0.035);ctx.lineTo(0,wy+H*0.035);ctx.closePath();ctx.fill();
     }
     /* Lueur diffuse sous l'eau */
     const waterGlow=ctx.createRadialGradient(cx,H*0.85,20,cx,H*0.85,W*0.7);
     waterGlow.addColorStop(0,`rgba(80,130,190,${0.14+Math.sin(t*0.4)*0.04})`);
     waterGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=waterGlow;ctx.fillRect(0,H*0.55,W,H*0.45);
     ctx.restore();
     ctx.save();ctx.rotate(RAIN_ANGLE);
     for(const d of drops){
      d.y+=d.spd;
      if(d.y>H*1.1){d.y=-d.len;d.x=Math.random()*W*1.3-W*0.15;}
      ctx.strokeStyle=`rgba(200,218,240,${d.op})`;ctx.lineWidth=0.7;
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x,d.y+d.len);ctx.stroke();
     }
     ctx.restore();
     const hg=ctx.createRadialGradient(cx,ANDY_Y+ANDY_H*0.42,ANDY_W*0.05,cx,ANDY_Y+ANDY_H*0.42,ANDY_W*0.72);
     hg.addColorStop(0,`rgba(200,215,240,${0.18+Math.sin(t*0.5)*0.05})`);
     hg.addColorStop(0.45,'rgba(160,185,220,0.06)');hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.fillRect(0,0,W,H);

     /* ── Caustiques — lumière réfractée sous l'eau ── */
     for(const c of caustics){
      c.ph+=c.phSpd;
      const co=c.op*(0.4+0.6*Math.abs(Math.sin(c.ph)));
      ctx.save();
      ctx.globalAlpha=co;
      const cg=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.rx);
      cg.addColorStop(0,'rgba(140,190,240,0.85)');
      cg.addColorStop(0.5,'rgba(100,160,220,0.30)');
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.ellipse(c.x,c.y,c.rx,c.ry,Math.sin(c.ph*0.3)*0.4,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* ── Anneaux d'ondulation — surface de l'eau autour d'Andy ── */
     for(const rp of ripples){
      rp.life+=rp.spd;
      if(rp.life>1) rp.life=0;
      /* Rayon : de 0 jusqu'à ~80% de la largeur */
      const rR=rp.life*W*0.80;
      /* Opacité : pic au quart de vie, fondu vers 0 */
      const rOp=Math.sin(rp.life*Math.PI)*0.13;
      /* Ellipse aplatie pour donner l'effet perspective eau */
      ctx.save();
      ctx.strokeStyle=`rgba(160,210,240,${rOp})`;
      ctx.lineWidth=1.2;
      ctx.beginPath();
      ctx.ellipse(RIPPLE_CX,RIPPLE_CY,rR,rR*0.28,0,0,Math.PI*2);
      ctx.stroke();
      /* Second anneau très léger décalé */
      ctx.strokeStyle=`rgba(120,180,220,${rOp*0.4})`;
      ctx.lineWidth=0.6;
      ctx.beginPath();
      ctx.ellipse(RIPPLE_CX,RIPPLE_CY,rR*0.88,rR*0.88*0.28,0,0,Math.PI*2);
      ctx.stroke();
      ctx.restore();
     }

     if(andyReady){ctx.save();ctx.globalAlpha=0.97;ctx.drawImage(andyImg,ANDY_X,ANDY_Y,ANDY_W,ANDY_H);ctx.restore();}
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.12,cx,H*0.48,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.60,'rgba(0,0,0,0.06)');vg.addColorStop(1,'rgba(0,0,0,0.42)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
