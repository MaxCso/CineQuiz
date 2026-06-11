// CinéQuiz splash chunk — Titanic
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Titanic"]={
   name:'Titanic',
   color:'20,80,180',
   ref:'Titanic \u2014 James Cameron, 1997',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.68';
    let t=0;
    const cx=W/2,cy=H/2;

    let _titS=document.getElementById('_tit_s');
    if(!_titS){_titS=document.createElement('style');_titS.id='_tit_s';document.head.appendChild(_titS);}
    _titS.textContent='#splash-content-wrap{top:24%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _titW=setInterval(()=>{if(stop.v){_titS.textContent='';clearInterval(_titW);}},200);

    const stars=Array.from({length:100},()=>({
     x:Math.random()*W,y:Math.random()*H*0.55,
     r:Math.random()*1.5+0.3,op:Math.random()*0.7+0.2,
     phase:Math.random()*Math.PI*2
    }));

    const ice=Array.from({length:18},()=>({
     x:Math.random()*W,y:H*0.55+Math.random()*H*0.3,
     w:Math.random()*20+8,h:Math.random()*10+4,
     vx:(Math.random()-0.5)*0.3,op:Math.random()*0.4+0.15
    }));
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,4,12,0.14)';ctx.fillRect(0,0,W,H);

     const sky=ctx.createLinearGradient(0,0,0,H*0.55);
     sky.addColorStop(0,'rgba(0,5,20,0.08)');sky.addColorStop(1,'rgba(0,10,30,0.06)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.55);

     for(const s of stars){
      s.phase+=0.008;
      const p=1+Math.sin(s.phase)*0.2;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*p,0,Math.PI*2);
      ctx.fillStyle=`rgba(220,215,200,${s.op*p})`;ctx.fill();
     }

     const og=ctx.createLinearGradient(0,H*0.52,0,H);
     og.addColorStop(0,'rgba(0,15,40,0.12)');og.addColorStop(1,'rgba(0,5,20,0.18)');
     ctx.fillStyle=og;ctx.fillRect(0,H*0.52,W,H*0.48);

     ctx.strokeStyle='rgba(20,60,120,0.25)';ctx.lineWidth=1.5;
     ctx.beginPath();
     for(let x=0;x<=W;x+=4){
      const y=H*0.54+Math.sin(x*0.025+t*0.7)*5+Math.sin(x*0.05-t*0.4)*2;
      x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
     }ctx.stroke();

     for(const s of stars){
      const ry=H-(s.y/H*0.55*H*0.3+H*0.55);
      if(ry>H*0.55&&ry<H){
       ctx.beginPath();ctx.arc(s.x,ry,s.r*0.6,0,Math.PI*2);
       ctx.fillStyle=`rgba(180,175,160,${s.op*0.3})`;ctx.fill();
      }
     }

     ctx.fillStyle='rgba(200,220,240,0.35)';
     ctx.beginPath();
     ctx.moveTo(cx-W*0.22,H*0.60);
     ctx.lineTo(cx-W*0.14,H*0.42);
     ctx.lineTo(cx-W*0.06,H*0.60);
     ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(160,190,220,0.20)';
     ctx.beginPath();
     ctx.moveTo(cx-W*0.22,H*0.60);
     ctx.lineTo(cx-W*0.28,H*0.68);
     ctx.lineTo(cx-W*0.04,H*0.70);
     ctx.lineTo(cx-W*0.06,H*0.60);
     ctx.closePath();ctx.fill();

     for(const ic of ice){
      ic.x+=ic.vx;if(ic.x<-ic.w)ic.x=W+ic.w;if(ic.x>W+ic.w)ic.x=-ic.w;
      ctx.fillStyle=`rgba(190,215,235,${ic.op})`;
      ctx.beginPath();ctx.ellipse(ic.x,ic.y,ic.w*0.5,ic.h*0.5,0,0,Math.PI*2);ctx.fill();
     }
     const vg=ctx.createRadialGradient(cx,cy,H*0.1,cx,cy,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,5,15,0.65)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
