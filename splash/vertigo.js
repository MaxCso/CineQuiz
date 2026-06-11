// CinéQuiz splash chunk — Vertigo
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Vertigo"]={
   name:'Vertigo',
   color:'180,40,180',
   ref:'Vertigo \u2014 Alfred Hitchcock, 1958',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.65';
    let t=0;
    const cx=W/2,cy=H/2;
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,0,0,0.10)';ctx.fillRect(0,0,W,H);
     const rings=40;
     for(let i=0;i<rings;i++){
      const phase=t*0.7+i*0.22;
      const r=((i/rings)*Math.min(W,H)*0.72+((t*55+i*8)%(Math.min(W,H)*0.72)));
      const op=0.28-i*0.005;
      const hue=320+i*4;
      ctx.strokeStyle=`hsla(${hue},65%,62%,${Math.max(op,0.04)})`;
      ctx.lineWidth=1.2;
      ctx.beginPath();
      const pts=120;
      for(let j=0;j<=pts;j++){
       const a=(j/pts)*Math.PI*2;
       const wobble=Math.sin(a*3+phase)*4;
       const rx=cx+Math.cos(a)*(r+wobble);
       const ry=cy+Math.sin(a)*(r+wobble)*0.92;
       j===0?ctx.moveTo(rx,ry):ctx.lineTo(rx,ry);
      }
      ctx.closePath();ctx.stroke();
     }

     const vg=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(W,H)*0.55);
     vg.addColorStop(0,'rgba(40,0,30,0.55)');vg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.018;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
