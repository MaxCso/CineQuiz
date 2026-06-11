// CinéQuiz splash chunk — Psycho
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Psycho"]={
   name:'Psycho',
   color:'60,60,60',
   ref:'Psycho \u2014 Alfred Hitchcock, 1960',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.5';
    let t=0;
    const lines=Array.from({length:60},(_,i)=>({
     y:i*(H/60),phase:Math.random()*Math.PI*2,amp:Math.random()*8+2,spd:Math.random()*2+0.5,thick:Math.random()>0.85?2:0.8
    }));
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(0,0,W,H);
     for(const l of lines){
      const shake=Math.sin(t*l.spd+l.phase)*l.amp;
      const bw=120+Math.random()*100|0;
      ctx.strokeStyle=`rgba(${bw},${bw},${bw},0.55)`;
      ctx.lineWidth=l.thick;ctx.beginPath();ctx.moveTo(0,l.y+shake);
      for(let s=1;s<=12;s++){ctx.lineTo((s/12)*W,l.y+shake+(Math.random()-0.5)*l.amp*0.6);}
      ctx.stroke();l.y+=0.15;if(l.y>H+2)l.y=-2;
     }
     if(Math.random()>0.85){
      const sx=Math.random()*W;
      ctx.strokeStyle=`rgba(200,200,200,${Math.random()*0.4+0.1})`;
      ctx.lineWidth=Math.random()*1.5+0.5;ctx.beginPath();ctx.moveTo(sx,0);ctx.lineTo(sx+Math.random()*4-2,H);ctx.stroke();
     }
     t+=0.04;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
