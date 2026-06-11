// CinéQuiz splash chunk — Tree of Life
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Tree of Life"]={
   name:'Tree of Life',
   color:'255,180,60',
   ref:'The Tree of Life \u2014 Terrence Malick, 2011',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.72';
    let t=0;

    const clouds=Array.from({length:180},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.12, vy:(Math.random()-0.5)*0.12,
     r:Math.random()*3+0.5,
     hue:180+Math.random()*120,
     op:Math.random()*0.4+0.08,
     phase:Math.random()*Math.PI*2
    }));

    const cells=Array.from({length:18},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:Math.random()*18+6,
     vx:(Math.random()-0.5)*0.2, vy:(Math.random()-0.5)*0.18,
     hue:30+Math.random()*60,
     op:Math.random()*0.12+0.04,
     phase:Math.random()*Math.PI*2
    }));
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,0,4,0.12)';ctx.fillRect(0,0,W,H);

     const ng=ctx.createRadialGradient(W*0.5,H*0.42,20,W*0.5,H*0.42,W*0.7);
     ng.addColorStop(0,`hsla(${220+Math.sin(t*0.15)*30},60%,30%,0.06)`);
     ng.addColorStop(0.5,`hsla(${280+Math.sin(t*0.1)*20},50%,20%,0.04)`);
     ng.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ng;ctx.fillRect(0,0,W,H);

     for(const c of cells){
      c.x+=c.vx+Math.sin(t*0.2+c.phase)*0.08;
      c.y+=c.vy+Math.cos(t*0.15+c.phase)*0.08;
      if(c.x<-c.r*2)c.x=W+c.r; if(c.x>W+c.r*2)c.x=-c.r;
      if(c.y<-c.r*2)c.y=H+c.r; if(c.y>H+c.r*2)c.y=-c.r;
      ctx.beginPath();ctx.arc(c.x,c.y,c.r*(1+Math.sin(t*0.3+c.phase)*0.08),0,Math.PI*2);
      ctx.strokeStyle=`hsla(${c.hue},60%,65%,${c.op})`;
      ctx.lineWidth=0.8;ctx.stroke();

      ctx.beginPath();ctx.arc(c.x,c.y,c.r*0.28,0,Math.PI*2);
      ctx.fillStyle=`hsla(${c.hue},70%,80%,${c.op*0.6})`;ctx.fill();
     }

     for(const p of clouds){
      p.x+=p.vx+Math.sin(t*0.08+p.phase)*0.05;
      p.y+=p.vy+Math.cos(t*0.06+p.phase)*0.05;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      const pulse=1+Math.sin(t*0.5+p.phase)*0.2;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r*pulse,0,Math.PI*2);
      ctx.fillStyle=`hsla(${p.hue+t*2},55%,72%,${p.op})`;ctx.fill();
     }

     const vg=ctx.createRadialGradient(W/2,H/2,H*0.15,W/2,H/2,H*0.8);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,8,0.65)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
