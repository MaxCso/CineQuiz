// CinéQuiz splash chunk — Metropolis
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Metropolis"]={
   name:'Metropolis',
   color:'200,160,50',
   ref:'Metropolis — Fritz Lang, 1927',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    function drawBackground(){
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'rgba(12,9,3,1)');
     bg.addColorStop(0.18,'rgba(28,18,4,1)');
     bg.addColorStop(0.55,'rgba(62,40,6,1)');
     bg.addColorStop(1,'rgba(18,12,2,1)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    }

    function drawRays(){
     const ry=H*0.52,rx=cx;
     const nRays=14;
     for(let i=0;i<nRays;i++){
      const angle=-Math.PI/2+(i/(nRays-1)-0.5)*Math.PI*1.10;
      const pulse=0.5+Math.sin(t*0.4+i*0.4)*0.5;
      const op=0.08+pulse*0.06;
      const len=H*1.4;
      const rg=ctx.createLinearGradient(rx,ry,rx+Math.cos(angle)*len,ry+Math.sin(angle)*len);
      rg.addColorStop(0,`rgba(200,155,30,${op+0.04})`);
      rg.addColorStop(0.4,`rgba(180,135,20,${op})`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;
      const w=0.09;
      ctx.beginPath();
      ctx.moveTo(rx,ry);
      ctx.lineTo(rx+Math.cos(angle-w)*len,ry+Math.sin(angle-w)*len);
      ctx.lineTo(rx+Math.cos(angle+w)*len,ry+Math.sin(angle+w)*len);
      ctx.closePath();ctx.fill();
     }
    }

    function drawTowers(){
     const towers=[
      {x:cx-W*0.40,w:W*0.10,top:H*0.12,stepped:[0.85,0.70,0.55],dark:true},
      {x:cx+W*0.30,w:W*0.10,top:H*0.12,stepped:[0.85,0.70,0.55],dark:true},
      {x:cx-W*0.28,w:W*0.13,top:H*0.08,stepped:[0.80,0.62],dark:false},
      {x:cx+W*0.15,w:W*0.13,top:H*0.08,stepped:[0.80,0.62],dark:false},
      {x:cx-W*0.10,w:W*0.20,top:H*0.02,stepped:[0.72,0.52,0.38],dark:false,central:true},
     ];
     for(const tw of towers){
      const baseY=H*0.92;
      const col=tw.dark?'rgba(8,5,2,0.96)':'rgba(14,9,3,0.97)';
      ctx.fillStyle=col;
      ctx.fillRect(tw.x,tw.top,tw.w,baseY-tw.top);
      if(tw.stepped){
       let prevW=tw.w,prevX=tw.x;
       for(let s=0;s<tw.stepped.length;s++){
        const sw=tw.w*(0.75-s*0.15);
        const sx=tw.x+(tw.w-sw)/2;
        const sy=tw.top+tw.w*(s*0.12);
        ctx.fillStyle='rgba(6,4,1,0.98)';
        ctx.fillRect(prevX,sy-4,prevW,6);
        ctx.fillStyle=col;
        ctx.fillRect(sx,tw.top,sw,sy-tw.top);
        prevW=sw;prevX=sx;
       }
      }
      const sheen=ctx.createLinearGradient(tw.x,0,tw.x+tw.w*0.12,0);
      sheen.addColorStop(0,'rgba(180,130,20,0.12)');sheen.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sheen;
      ctx.fillRect(tw.x,tw.top,tw.w*0.12,baseY-tw.top);
      if(!tw.dark){
       const wW=Math.max(3,tw.w*0.06),wH=wW*1.8;
       const cols=Math.floor(tw.w/(wW*3.2));
       const rows=Math.floor((baseY-tw.top-20)/(wH*2.4));
       for(let r=0;r<rows;r++){
        for(let c2=0;c2<cols;c2++){
         const wx=tw.x+tw.w/(cols+1)*(c2+1)-wW/2;
         const wy=tw.top+20+r*(wH*2.4);
         const flicker=0.45+Math.sin(t*0.3+r*2.1+c2*3.7+tw.x)*0.10;
         const lit=Math.sin(t*0.15+r*c2*0.8+tw.x*0.01)>0.1;
         if(lit){ctx.fillStyle=`rgba(215,170,55,${flicker})`;ctx.fillRect(wx,wy,wW,wH);}
        }
       }
      }
     }
     const cols3=[cx-W*0.22,cx-W*0.05,cx+W*0.12];
     for(const colX of cols3){
      const colW=W*0.055,colTop=H*0.28,colBot=H*0.92;
      const cg=ctx.createLinearGradient(colX,0,colX+colW,0);
      cg.addColorStop(0,'rgba(8,5,2,0.98)');cg.addColorStop(0.30,'rgba(22,14,3,0.97)');cg.addColorStop(0.55,'rgba(15,10,2,0.98)');cg.addColorStop(1,'rgba(6,4,1,0.98)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.roundRect(colX,colTop,colW,colBot-colTop,colW/2);ctx.fill();
      const cr=ctx.createLinearGradient(colX,0,colX+colW*0.35,0);
      cr.addColorStop(0,'rgba(170,120,18,0.14)');cr.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cr;
      ctx.beginPath();ctx.roundRect(colX,colTop,colW*0.35,colBot-colTop,[colW/2,0,0,colW/2]);ctx.fill();
     }
     for(const [py,x1,x2,h] of [[H*0.45,cx-W*0.38,cx+W*0.38,5],[H*0.55,cx-W*0.30,cx+W*0.30,4],[H*0.62,cx-W*0.26,cx+W*0.26,3]]){
      ctx.fillStyle='rgba(10,6,1,0.96)';ctx.fillRect(x1,py,x2-x1,h);
      ctx.fillStyle='rgba(155,110,15,0.20)';ctx.fillRect(x1,py,x2-x1,1.2);
     }
    }

    function drawGround(){
     const gy=H*0.91;
     const gg=ctx.createLinearGradient(0,gy,0,H);
     gg.addColorStop(0,'rgba(8,5,1,0.96)');gg.addColorStop(1,'rgba(4,2,0,1)');
     ctx.fillStyle=gg;ctx.fillRect(0,gy,W,H-gy);
     ctx.strokeStyle='rgba(140,100,12,0.35)';ctx.lineWidth=1;
     ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();
    }

    const dust=Array.from({length:35},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18,vy:-(Math.random()*0.15+0.04),
     r:Math.random()*1.2+0.2,op:Math.random()*0.22+0.05,
     phase:Math.random()*Math.PI*2
    }));

    function frame(){
     if(stop.v)return;
     drawBackground();
     drawRays();
     drawTowers();
     drawGround();
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;
      if(d.y<0)d.y=H;if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      const op=d.op*(0.7+Math.sin(t*0.5+d.phase)*0.3);
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,155,40,${op})`;ctx.fill();
     }
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.18,cx,H*0.5,H*0.78);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.6,'rgba(0,0,0,0.08)');vg.addColorStop(1,'rgba(0,0,0,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     for(let i=0;i<2;i++){
      const gy=Math.random()*H;
      ctx.strokeStyle=`rgba(200,170,100,${Math.random()*0.04})`;
      ctx.lineWidth=Math.random()*1.5+0.5;
      ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();
     }
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
