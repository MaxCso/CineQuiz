// CinéQuiz splash chunk — Old Boy
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Old Boy"]={
   name:'Old Boy',
   color:'80,20,80',
   ref:'Old Boy \u2014 Park Chan-wook, 2003',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2,cy=H/2;
    let _s=document.getElementById('_ob_s');if(!_s){_s=document.createElement('style');_s.id='_ob_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);
    const ants=Array.from({length:60},()=>({x:Math.random()*W,y:Math.random()*H,angle:Math.random()*Math.PI*2,spd:0.35+Math.random()*0.45,size:W*(0.006+Math.random()*0.008),op:0.25+Math.random()*0.40,turn:(Math.random()-0.5)*0.12}));
    function frame(){if(stop.v)return;
     ctx.fillStyle='rgba(8,6,8,0.20)';ctx.fillRect(0,0,W,H);
     ctx.fillStyle='#080608';if(t<1)ctx.fillRect(0,0,W,H);
     const hg=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.45);hg.addColorStop(0,'rgba(60,20,60,0.12)');hg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=hg;ctx.fillRect(0,0,W,H);
     for(const a of ants){a.angle+=a.turn;a.x+=Math.cos(a.angle)*a.spd;a.y+=Math.sin(a.angle)*a.spd;if(a.x<0)a.x=W;if(a.x>W)a.x=0;if(a.y<0)a.y=H;if(a.y>H)a.y=0;
      ctx.save();ctx.translate(a.x,a.y);ctx.rotate(a.angle);ctx.globalAlpha=a.op;ctx.fillStyle='rgba(80,60,80,0.88)';ctx.fillRect(-a.size*2,-a.size*0.5,a.size*4,a.size);ctx.restore();}
     const vg=ctx.createRadialGradient(cx,cy,H*0.05,cx,cy,H*0.88);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.5,'rgba(0,0,0,0.28)');vg.addColorStop(1,'rgba(0,0,0,0.97)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);}frame();
   }
  };
})();
