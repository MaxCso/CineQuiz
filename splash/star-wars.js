// CinéQuiz splash chunk — Star Wars
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Star Wars"]={
   name:'Star Wars',
   color:'255,200,50',
   ref:'Star Wars \u2014 George Lucas, 1977',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.7';
    const cx=W/2,cy=H/2;
    const stars=Array.from({length:200},()=>({
     angle:Math.random()*Math.PI*2,dist:Math.random()*Math.hypot(W,H)*0.5,
     spd:Math.random()*2+1,size:Math.random()*1.5+0.5
    }));
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,0,0,0.15)';
     ctx.fillRect(0,0,W,H);
     for(const s of stars){
      s.dist+=s.spd*(1+s.dist/200*0.06);
      const x=cx+Math.cos(s.angle)*s.dist, y=cy+Math.sin(s.angle)*s.dist;
      const stretch=Math.min(s.spd*s.dist*0.012,18);
      const x0=cx+Math.cos(s.angle)*(s.dist-stretch), y0=cy+Math.sin(s.angle)*(s.dist-stretch);
      const op=Math.min(s.dist/100,1);
      ctx.strokeStyle=`rgba(255,255,255,${op*0.85})`;
      ctx.lineWidth=s.size*(1+s.dist/300);
      ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x,y);ctx.stroke();
      if(x<-10||x>W+10||y<-10||y>H+10){s.dist=Math.random()*30;s.angle=Math.random()*Math.PI*2;s.spd=Math.random()*2+1;}
     }
     const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,80);
     cg.addColorStop(0,'rgba(220,220,255,0.12)');cg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cg;ctx.fillRect(0,0,W,H);
     requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
