// CinéQuiz splash chunk — Full Metal Jacket
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Full Metal Jacket"]={
   name:'Full Metal Jacket',
   color:'60,100,60',
   ref:'Full Metal Jacket \u2014 Stanley Kubrick, 1987',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_fmj_s');
    if(!_s){_s=document.createElement('style');_s.id='_fmj_s';document.head.appendChild(_s);}
    _s.textContent='#splash-logo-wrap .splash-logo,#splash-logo-wrap .splash-tagline{color:#1a1a1a!important;-webkit-text-fill-color:#1a1a1a!important;background:none!important;}#splash-content-wrap{top:52%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:#1a1a1a!important;text-shadow:none!important;}.splash-tagline{background:none!important;-webkit-background-clip:unset!important;background-clip:unset!important;-webkit-text-fill-color:#1a1a1a!important;color:#1a1a1a!important;filter:none!important;opacity:0.55!important;animation:none!important;}.splash-tagline::before,.splash-tagline::after{background:rgba(0,0,0,0.25)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);
    const _helmetImg=new Image();
    let _helmetReady=false;
    _helmetImg.onload=()=>{_helmetReady=true;};
    _helmetImg.src='images/sprite_44.svg';
    /* FMJ.svg — soldat en bas */
    const _fmjImg=new Image();
    let _fmjReady=false;
    _fmjImg.onload=()=>{_fmjReady=true;};
    _fmjImg.src='images/FMJ.svg';
    const SVG_W=432,SVG_H=309;
    function drawFMJ(){
      if(!_fmjReady) return;
      /* FMJ.svg — ratio réel 982×492 ≈ 2:1, pleine largeur, ancré en bas */
      const svgW = W * 1.02;
      const svgH = svgW * (492 / 982);
      const svgX = cx - svgW / 2;
      const svgY = H - svgH * 0.95; /* légère découpe en bas */
      ctx.drawImage(_fmjImg, svgX, svgY, svgW, svgH);
    }
    const dust=Array.from({length:28},()=>({
      x:Math.random()*W,y:H*0.35+Math.random()*H*0.50,
      vx:(Math.random()-0.5)*0.10,vy:-(0.04+Math.random()*0.08),
      r:Math.random()*1.4+0.3,op:0.04+Math.random()*0.08,
    }));
    function frame(){
      if(stop.v)return;
      ctx.fillStyle='rgba(248,244,235,1.0)';ctx.fillRect(0,0,W,H);
      const topG=ctx.createLinearGradient(0,0,0,H*0.55);
      topG.addColorStop(0,'rgba(215,210,200,0.55)');topG.addColorStop(1,'rgba(248,244,235,0)');
      ctx.fillStyle=topG;ctx.fillRect(0,0,W,H*0.55);
      if(_helmetReady){
        const tgtW=W*0.779;
        const tgtH=tgtW*(SVG_H/SVG_W);
        ctx.drawImage(_helmetImg,cx-tgtW/2,H*0.20,tgtW,tgtH);
      }
      drawFMJ();
      for(const d of dust){
        d.x+=d.vx;d.y+=d.vy;
        if(d.y<H*0.20){d.y=H*0.88;d.x=Math.random()*W;}
        if(d.x<0)d.x=W;if(d.x>W)d.x=0;
        ctx.fillStyle='rgba(80,70,50,'+d.op+')';
        ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
      }
      const vg=ctx.createRadialGradient(cx,H*0.5,H*0.20,cx,H*0.5,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,0.18)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
