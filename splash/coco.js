// CinéQuiz splash chunk — Coco
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Coco"]={
   name:'Coco',
   color:'255,100,20',
   ref:'Coco \u2014 Lee Unkrich, 2017',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.70';
    let t=0;
    const cx=W/2,cy=H/2;

    const petals=Array.from({length:50},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vy:Math.random()*0.8+0.3,vx:(Math.random()-0.5)*0.5,
     rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-0.5)*0.025,
     size:Math.random()*8+4,op:Math.random()*0.6+0.2
    }));

    const lanterns=Array.from({length:15},()=>({
     x:Math.random()*W,y:H+Math.random()*H,
     vy:-(Math.random()*0.5+0.2),vx:(Math.random()-0.5)*0.2,
     size:Math.random()*12+6,
     hue:20+Math.random()*40,op:Math.random()*0.45+0.2,
     phase:Math.random()*Math.PI*2
    }));
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(5,0,8,0.14)';ctx.fillRect(0,0,W,H);

     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,`rgba(${30+Math.sin(t*0.15)*5|0},5,${50+Math.sin(t*0.1)*8|0},0.10)`);
     bg.addColorStop(0.5,`rgba(${60+Math.sin(t*0.12)*8|0},15,${40+Math.sin(t*0.08)*6|0},0.07)`);
     bg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     for(const l of lanterns){
      l.y+=l.vy;l.x+=l.vx+Math.sin(t*0.3+l.phase)*0.2;
      if(l.y<-l.size*3){l.y=H+l.size;l.x=Math.random()*W;}
      const pulse=1+Math.sin(t*1.5+l.phase)*0.12;

      const hg=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.size*3);
      hg.addColorStop(0,`hsla(${l.hue},90%,65%,${l.op*0.4})`);
      hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.fillRect(l.x-l.size*3,l.y-l.size*3,l.size*6,l.size*6);

      ctx.save();ctx.translate(l.x,l.y);ctx.scale(1,pulse);
      ctx.fillStyle=`hsla(${l.hue},85%,58%,${l.op})`;
      ctx.beginPath();ctx.ellipse(0,0,l.size*0.6,l.size,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`hsla(${l.hue+30},90%,75%,${l.op*0.6})`;
      ctx.beginPath();ctx.ellipse(0,-l.size*0.3,l.size*0.3,l.size*0.3,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     for(const p of petals){
      p.x+=p.vx+Math.sin(t*0.4+p.rot)*0.3;
      p.y+=p.vy;p.rot+=p.rotSpd;
      if(p.y>H+p.size){p.y=-p.size;p.x=Math.random()*W;}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      const pg=ctx.createRadialGradient(0,0,0,0,0,p.size);
      pg.addColorStop(0,`rgba(255,160,20,${p.op})`);
      pg.addColorStop(1,`rgba(220,80,10,${p.op*0.5})`);
      ctx.fillStyle=pg;
      ctx.beginPath();ctx.ellipse(0,0,p.size*0.4,p.size,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }
     const vg=ctx.createRadialGradient(cx,cy,H*0.1,cx,cy,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(5,0,10,0.65)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
