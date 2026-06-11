// CinéQuiz splash chunk — Là-Haut
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Là-Haut"]={
   name:'Là-Haut',
   color:'200,120,40',
   ref:'L\u00e0-Haut \u2014 Pete Docter, 2009',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Fond override ── */
    let _upStyle=document.getElementById('_up_s');
    if(!_upStyle){_upStyle=document.createElement('style');_upStyle.id='_up_s';document.head.appendChild(_upStyle);}
    _upStyle.textContent='#splash-quote-text{color:#000000!important;-webkit-text-fill-color:#000000!important;text-shadow:none!important;}';
    const _upW=setInterval(()=>{if(stop.v){_upStyle.textContent='';clearInterval(_upW);}},200);

    /* ── Ballons — naissent en bas, remontent ── */
    const HUES=[0,15,30,200,260,120,300,180,45,330];
    const balloons=Array.from({length:160},(_,i)=>({
     x:Math.random()*W,
     y:H+Math.random()*H*1.2,
     vx:(Math.random()-0.5)*0.35,
     vy:-(0.45+Math.random()*0.75),
     r:Math.random()*14+6,
     hue:HUES[i%HUES.length]+(Math.random()*22-11),
     phase:Math.random()*Math.PI*2,
     wobble:Math.random()*0.018+0.008,
     stringLen:Math.random()*18+12
    }));

    /* ── Nuages — 3 couches de profondeur ── */
    const clouds=[];
    const cloudDefs=[
     {n:4, yMin:0.06, yMax:0.22, wMin:0.28, wMax:0.48, alpha:0.92, spd:0.28},
     {n:5, yMin:0.18, yMax:0.42, wMin:0.18, wMax:0.34, alpha:0.75, spd:0.18},
     {n:6, yMin:0.35, yMax:0.60, wMin:0.10, wMax:0.20, alpha:0.50, spd:0.10},
    ];
    for(const def of cloudDefs){
     for(let i=0;i<def.n;i++){
      clouds.push({
       x:Math.random()*W*1.4-W*0.2,
       y:H*(def.yMin+(Math.random()*(def.yMax-def.yMin))),
       w:W*(def.wMin+Math.random()*(def.wMax-def.wMin)),
       h:H*(0.04+Math.random()*0.04),
       alpha:def.alpha*(0.80+Math.random()*0.20),
       spd:def.spd*(0.75+Math.random()*0.50),
       puffs:Math.floor(3+Math.random()*3)
      });
     }
    }

    function drawCloud(c){
     const step=c.w/c.puffs;
     for(let p=0;p<c.puffs;p++){
      const px=c.x-c.w*0.5+step*(p+0.5);
      const py=c.y+(p===0||p===c.puffs-1?c.h*0.15:0);
      const pr=step*0.55+c.h*(p===Math.floor(c.puffs/2)?1.2:0.8);
      const cg=ctx.createRadialGradient(px,py-pr*0.15,pr*0.05,px,py,pr*0.90);
      cg.addColorStop(0,`rgba(255,255,255,${c.alpha})`);
      cg.addColorStop(0.55,`rgba(240,248,255,${c.alpha*0.75})`);
      cg.addColorStop(1,'rgba(200,228,255,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.ellipse(px,py,pr*0.80,pr*0.55,0,0,Math.PI*2);ctx.fill();
     }
    }

    function drawBalloon(b){
     const bg=ctx.createRadialGradient(b.x-b.r*0.30,b.y-b.r*0.32,b.r*0.05,b.x,b.y,b.r);
     bg.addColorStop(0,`hsla(${b.hue},88%,78%,0.95)`);
     bg.addColorStop(0.55,`hsla(${b.hue},82%,56%,0.90)`);
     bg.addColorStop(1,`hsla(${b.hue},70%,38%,0.82)`);
     ctx.fillStyle=bg;
     ctx.beginPath();ctx.ellipse(b.x,b.y,b.r,b.r*1.18,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle=`hsla(${b.hue},95%,92%,0.52)`;
     ctx.beginPath();ctx.ellipse(b.x-b.r*0.28,b.y-b.r*0.30,b.r*0.20,b.r*0.16,-0.45,0,Math.PI*2);ctx.fill();
     ctx.fillStyle=`hsla(${b.hue},72%,38%,0.85)`;
     ctx.beginPath();ctx.ellipse(b.x,b.y+b.r*1.22,b.r*0.10,b.r*0.08,0,0,Math.PI*2);ctx.fill();
     const sw=Math.sin(b.phase)*b.r*0.55;
     ctx.strokeStyle=`hsla(${b.hue},50%,30%,0.40)`;ctx.lineWidth=0.85;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(b.x,b.y+b.r*1.28);
     ctx.quadraticCurveTo(b.x+sw,b.y+b.r*1.28+b.stringLen*0.55,b.x+sw*0.4,b.y+b.r*1.28+b.stringLen);
     ctx.stroke();
    }

    function frame(){
     if(stop.v)return;
     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0.00,'#3a8fd4');
     sky.addColorStop(0.30,'#5bb8f5');
     sky.addColorStop(0.65,'#7ecef7');
     sky.addColorStop(1.00,'#aee3fb');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
     const sunX=W*0.82,sunY=H*0.09;
     const sunG=ctx.createRadialGradient(sunX,sunY,W*0.012,sunX,sunY,W*0.18);
     sunG.addColorStop(0,`rgba(255,245,200,${0.88+Math.sin(t*0.5)*0.06})`);
     sunG.addColorStop(0.20,'rgba(255,230,120,0.30)');
     sunG.addColorStop(0.55,'rgba(255,210,80,0.10)');
     sunG.addColorStop(1,'rgba(255,200,60,0)');
     ctx.fillStyle=sunG;ctx.beginPath();ctx.arc(sunX,sunY,W*0.18,0,Math.PI*2);ctx.fill();
     ctx.fillStyle=`rgba(255,252,220,${0.90+Math.sin(t*0.5)*0.05})`;
     ctx.beginPath();ctx.arc(sunX,sunY,W*0.048,0,Math.PI*2);ctx.fill();
     for(const c of clouds){
      c.x+=c.spd;if(c.x>W+c.w)c.x=-c.w;
      drawCloud(c);
     }
     for(const b of balloons){
      b.phase+=b.wobble;
      b.x+=b.vx+Math.sin(b.phase)*0.45;
      b.y+=b.vy;
      if(b.y<-b.r*3){b.y=H+b.r*2+Math.random()*H*0.4;b.x=Math.random()*W;}
      drawBalloon(b);
     }
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.12,cx,H*0.48,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,20,50,0.04)');
     vg.addColorStop(1,'rgba(0,15,40,0.55)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
