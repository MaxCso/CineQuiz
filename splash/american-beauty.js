// CinéQuiz splash chunk — American Beauty
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["American Beauty"]={
   name:'American Beauty',
   color:'200,20,20',
   ref:'American Beauty \u2014 Sam Mendes, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;

    const petals=Array.from({length:90},(_,i)=>({
     x:Math.random()*W*1.1-W*0.05,
     y:Math.random()*H*1.3-H*0.3,
     vx:(Math.random()-0.5)*0.5,
     vy:Math.random()*0.7+0.2,
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.028,
     w:Math.random()*20+7,
     h:Math.random()*11+5,
     op:Math.random()*0.60+0.28,
     r:190+Math.floor(Math.random()*55),
     g:Math.floor(Math.random()*18),
     b:Math.floor(Math.random()*18),
     phase:Math.random()*Math.PI*2,
     driftSpd:0.28+Math.random()*0.22
    }));

    function drawPetal(p){
     ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
     const w2=p.w/2, h2=p.h/2;
     ctx.beginPath();
     ctx.moveTo(0,-h2);
     ctx.bezierCurveTo( w2*0.95,-h2*0.4, w2,    h2*0.5, 0,     h2);
     ctx.bezierCurveTo(-w2,     h2*0.5, -w2*0.95,-h2*0.4, 0,  -h2);
     ctx.closePath();
     const pg=ctx.createLinearGradient(0,-h2,0,h2);
     pg.addColorStop(0,  `rgba(${p.r},${p.g+8},${p.b+8},${p.op})`);
     pg.addColorStop(0.4,`rgba(${p.r-20},${p.g},${p.b},${p.op*0.92})`);
     pg.addColorStop(1,  `rgba(${p.r-55},${p.g},${p.b},${p.op*0.65})`);
     ctx.fillStyle=pg;ctx.fill();
     ctx.strokeStyle=`rgba(${p.r-70},${p.g},${p.b},${p.op*0.45})`;
     ctx.lineWidth=0.5;
     ctx.beginPath();ctx.moveTo(0,-h2*0.85);ctx.lineTo(0,h2*0.80);ctx.stroke();
     ctx.fillStyle=`rgba(255,180,180,${p.op*0.18})`;
     ctx.beginPath();ctx.ellipse(-w2*0.18,-h2*0.45,w2*0.28,h2*0.22,0.3,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(3,0,0,0.18)';ctx.fillRect(0,0,W,H);
     const pulse=0.5+Math.sin(t*0.5)*0.5;
     const rg=ctx.createRadialGradient(W*0.5,H*0.42,0,W*0.5,H*0.42,W*0.72);
     rg.addColorStop(0,`rgba(180,8,8,${0.09+pulse*0.04})`);
     rg.addColorStop(0.5,`rgba(100,0,0,${0.05+pulse*0.02})`);
     rg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);
     for(const p of petals){
      p.x+=p.vx+Math.sin(t*p.driftSpd+p.phase)*0.42;
      p.y+=p.vy+Math.cos(t*p.driftSpd*0.7+p.phase)*0.12;
      p.rot+=p.rotSpd;
      if(p.y>H+25){p.y=-25;p.x=Math.random()*W;}
      if(p.x<-20)p.x=W+10; if(p.x>W+20)p.x=-10;
      drawPetal(p);
     }
     const vg=ctx.createRadialGradient(W/2,H/2,H*0.15,W/2,H/2,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.65,'rgba(8,0,0,0.22)');
     vg.addColorStop(1,'rgba(20,0,0,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
