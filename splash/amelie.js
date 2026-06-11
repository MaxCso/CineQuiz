// CinéQuiz splash chunk — Amélie
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Amélie"]={
   name:'Amélie',
   color:'220,60,30',
   ref:'Le Fabuleux Destin d\u2019Am\u00e9lie Poulain \u2014 Jeunet, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.70';
    let t=0;

    const particles=Array.from({length:70},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.55, vy:-(Math.random()*0.6+0.2),
     r:Math.random()*4+1.5,
     hue:[28,45,355,120,200][Math.random()*5|0]+(Math.random()*20-10),
     op:Math.random()*0.55+0.2, phase:Math.random()*Math.PI*2
    }));

    const hearts=Array.from({length:12},()=>({
     x:Math.random()*W, y:Math.random()*H+H*0.3,
     size:Math.random()*8+4, spd:Math.random()*0.4+0.15,
     op:Math.random()*0.3+0.1, phase:Math.random()*Math.PI*2
    }));
    function drawHeart(x,y,s,op){
     ctx.save();ctx.translate(x,y);ctx.scale(s/10,s/10);
     ctx.beginPath();
     ctx.moveTo(0,-2);
     ctx.bezierCurveTo(5,-7,10,-2,0,6);
     ctx.bezierCurveTo(-10,-2,-5,-7,0,-2);
     ctx.fillStyle=`rgba(230,80,80,${op})`;ctx.fill();ctx.restore();
    }
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(8,5,2,0.15)';ctx.fillRect(0,0,W,H);

     const lg=ctx.createRadialGradient(W*0.5,H*0.45,20,W*0.5,H*0.45,W*0.6);
     lg.addColorStop(0,`rgba(${200+Math.sin(t*0.5)*20|0},140,40,0.07)`);
     lg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lg;ctx.fillRect(0,0,W,H);

     for(const p of particles){
      p.x+=p.vx+Math.sin(t*0.5+p.phase)*0.2;
      p.y+=p.vy;
      if(p.y<-10){p.y=H+10;p.x=Math.random()*W;}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${p.hue},75%,62%,${p.op})`;ctx.fill();
     }

     for(const h of hearts){
      h.y-=h.spd;h.x+=Math.sin(t*0.4+h.phase)*0.4;
      if(h.y<-20){h.y=H+20;h.x=Math.random()*W;}
      drawHeart(h.x,h.y,h.size,h.op);
     }

     const vg=ctx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.75);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(10,5,0,0.50)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
