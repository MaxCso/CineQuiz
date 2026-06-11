// CinéQuiz splash chunk — Gran Torino
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Gran Torino"]={
   name:'Gran Torino',
   color:'120,100,60',
   ref:'Gran Torino \u2014 Clint Eastwood, 2008',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    let _gtS=document.getElementById('_gt_s');
    if(!_gtS){_gtS=document.createElement('style');_gtS.id='_gt_s';document.head.appendChild(_gtS);}
    _gtS.textContent=`
     

     #splash-content-wrap{top:25%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(245,230,195,0.92)!important;font-size:14px!important;text-shadow:0 1px 10px rgba(0,0,0,0.9)!important;}
    `;
    const _gtW=setInterval(()=>{if(stop.v){_gtS.textContent='';clearInterval(_gtW);}},200);

    const carImg=new Image(); let carReady=false;
    carImg.onload=()=>{ carReady=true; };
    carImg.src='images/GranTorino.png';
    const CAR_RATIO=319/218;

    const RAIN_ANGLE=0.12;
    const rain=Array.from({length:70},()=>({
      x:Math.random()*W*1.3-W*0.15,
      y:Math.random()*H,
      len:H*(0.016+Math.random()*0.020),
      spd:H*(0.009+Math.random()*0.007),
      op:0.025+Math.random()*0.055,
      w:0.25+Math.random()*0.35
    }));

    const embers=Array.from({length:22},()=>({x:0,y:0,vx:0,vy:0,life:0,maxLife:0,hue:0,reset:true}));
    function resetEmber(e,carBaseY){
      const side=Math.random()<0.5?'front':'rear';
      const carW=W*0.72;
      const carL=cx-carW/2;
      e.x=side==='front'?carL+carW*0.068:carL+carW*0.895;
      e.hue=side==='front'?210:5;
      e.y=carBaseY-H*0.105*0.13;
      e.vx=(Math.random()-0.5)*0.8;
      e.vy=-(Math.random()*0.6+0.2);
      e.maxLife=40+Math.random()*50;
      e.life=e.maxLife;
      e.reset=false;
    }

    function drawPuddle(baseY,alpha){
      const pW=W*0.72;
      const pY=baseY+H*0.008;
      const pg=ctx.createRadialGradient(cx,pY,0,cx,pY,pW*0.5);
      pg.addColorStop(0,`rgba(40,55,80,${0.45*alpha})`);
      pg.addColorStop(0.5,`rgba(25,35,55,${0.28*alpha})`);
      pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.save();
      ctx.scale(1,(H*0.038)/(pW*0.5));
      ctx.fillStyle=pg;
      ctx.beginPath();ctx.arc(cx,pY*(pW*0.5)/(H*0.038),pW*0.5,0,Math.PI*2);ctx.fill();
      ctx.restore();
      const rg=ctx.createLinearGradient(cx-pW*0.30,pY,cx-pW*0.06,pY);
      rg.addColorStop(0,'rgba(0,0,0,0)');
      rg.addColorStop(0.5,`rgba(180,210,255,${(0.18+Math.sin(t*1.1)*0.06)*alpha})`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;ctx.fillRect(cx-pW*0.32,pY-H*0.019,pW*0.28,H*0.038);
    }

    function drawCar(baseY,alpha){
      if(!carReady)return;
      const carW=W*0.72;
      const carH=carW/CAR_RATIO;
      const carX=cx-carW/2;
      const carY=baseY-carH;
      const shG=ctx.createRadialGradient(cx,baseY+2,0,cx,baseY+2,carW*0.48);
      shG.addColorStop(0,`rgba(0,0,0,${0.75*alpha})`);
      shG.addColorStop(0.5,`rgba(0,0,0,${0.30*alpha})`);
      shG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shG;ctx.fillRect(carX-W*0.05,baseY-H*0.01,carW+W*0.10,H*0.06);
      ctx.save();ctx.globalAlpha=alpha;
      ctx.drawImage(carImg,carX,carY,carW,carH);
      ctx.restore();
      const tailG=ctx.createRadialGradient(carX+carW,carY+carH*0.55,0,carX+carW,carY+carH*0.55,W*0.14);
      tailG.addColorStop(0,`rgba(255,35,10,${(0.22+Math.sin(t*2.0)*0.05)*alpha})`);
      tailG.addColorStop(0.4,`rgba(200,15,5,${0.08*alpha})`);
      tailG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=tailG;ctx.fillRect(carX+carW-W*0.14,carY+carH*0.49,W*0.18,H*0.12);
      return {carX,carY,carW,carH};
    }

    function drawBackground(){
      const sky=ctx.createLinearGradient(0,0,0,H*0.62);
      sky.addColorStop(0,'rgb(8,5,3)');sky.addColorStop(0.30,'rgb(14,9,5)');
      sky.addColorStop(0.60,'rgb(22,14,7)');sky.addColorStop(1,'rgb(28,17,8)');
      ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.62);
      const sodiumG=ctx.createRadialGradient(cx*0.85,H*0.38,0,cx*0.85,H*0.38,W*0.70);
      sodiumG.addColorStop(0,`rgba(180,110,30,${0.16+Math.sin(t*0.18)*0.03})`);
      sodiumG.addColorStop(0.40,'rgba(120,70,15,0.07)');sodiumG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sodiumG;ctx.fillRect(0,0,W,H);
      const coldG=ctx.createRadialGradient(cx*0.22,H*0.45,0,cx*0.22,H*0.45,W*0.45);
      coldG.addColorStop(0,`rgba(60,90,140,${0.12+Math.sin(t*0.22+1.2)*0.025})`);
      coldG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=coldG;ctx.fillRect(0,0,W,H);
      const horizY=H*0.60;
      ctx.fillStyle='rgba(6,4,2,0.92)';
      const houses=[
        {x:0,w:W*0.12,h:H*0.055},{x:W*0.11,w:W*0.09,h:H*0.045},
        {x:W*0.19,w:W*0.13,h:H*0.065},{x:W*0.31,w:W*0.08,h:H*0.040},
        {x:W*0.38,w:W*0.10,h:H*0.060},{x:W*0.47,w:W*0.14,h:H*0.050},
        {x:W*0.60,w:W*0.09,h:H*0.055},{x:W*0.68,w:W*0.12,h:H*0.048},
        {x:W*0.79,w:W*0.10,h:H*0.062},{x:W*0.88,w:W*0.14,h:H*0.044},
      ];
      for(const h of houses){
        ctx.fillRect(h.x,horizY-h.h,h.w,h.h+2);
        if(Math.sin(t*0.08+h.x)*0.5+0.5>0.3){
          ctx.fillStyle=`rgba(200,160,60,${0.15+Math.random()*0.05})`;
          ctx.fillRect(h.x+h.w*0.35,horizY-h.h*0.55,h.w*0.18,h.h*0.22);
        }
        ctx.fillStyle='rgba(6,4,2,0.92)';
      }
      const roadG=ctx.createLinearGradient(0,horizY,0,H);
      roadG.addColorStop(0,'rgba(16,12,8,0.98)');roadG.addColorStop(0.25,'rgba(20,15,10,0.98)');
      roadG.addColorStop(1,'rgba(10,8,5,1.0)');
      ctx.fillStyle=roadG;ctx.fillRect(0,horizY,W,H-horizY);
      const vp={x:cx,y:horizY};
      ctx.strokeStyle='rgba(200,195,180,0.12)';ctx.lineWidth=1.5;
      for(let i=-3;i<=3;i++){
        if(i===0)continue;
        ctx.beginPath();ctx.moveTo(vp.x+i*W*0.05,vp.y);ctx.lineTo(vp.x+i*W*0.45,H);ctx.stroke();
      }
      ctx.setLineDash([H*0.025,H*0.025]);
      ctx.strokeStyle='rgba(220,210,180,0.18)';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(cx,horizY+H*0.02);ctx.lineTo(cx,H);ctx.stroke();
      ctx.setLineDash([]);
    }

    let fadeIn=0;

    function frame(){
      if(stop.v)return;
      ctx.fillStyle='rgb(8,5,3)';ctx.fillRect(0,0,W,H);
      drawBackground();
      const cA=Math.min(1,Math.max(0,(fadeIn-0.05)*1.1));
      const carBaseY=H*0.780;
      if(cA>0.02){
        ctx.save();
        for(const r of rain){
          r.y+=r.spd;r.x-=r.spd*RAIN_ANGLE;
          if(r.y>H){r.y=-r.len;r.x=Math.random()*W*1.3-W*0.15;}
          ctx.strokeStyle=`rgba(160,185,210,${r.op*Math.min(1,fadeIn)})`;
          ctx.lineWidth=r.w;
          ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x-r.len*RAIN_ANGLE,r.y+r.len);ctx.stroke();
        }
        ctx.restore();
      }
      drawPuddle(carBaseY,cA);
      drawCar(carBaseY,cA);
      if(cA>0.5){
        for(const e of embers){
          if(e.reset)resetEmber(e,carBaseY);
          e.life--;
          if(e.life<=0){e.reset=true;continue;}
          e.x+=e.vx;e.y+=e.vy;e.vy+=0.04;
          const ef=e.life/e.maxLife;
          ctx.fillStyle=`hsla(${e.hue},90%,75%,${ef*0.5*cA})`;
          ctx.beginPath();ctx.arc(e.x,e.y,1.2*ef,0,Math.PI*2);ctx.fill();
        }
      }
      const lampX=cx*0.28,lampBaseY=H*0.600,lampH=H*0.220;
      ctx.strokeStyle='rgba(80,70,55,0.70)';ctx.lineWidth=W*0.008;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(lampX,lampBaseY);ctx.lineTo(lampX,lampBaseY-lampH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(lampX,lampBaseY-lampH);ctx.lineTo(lampX+W*0.04,lampBaseY-lampH-H*0.03);ctx.stroke();
      const lampPulse=0.82+Math.sin(t*0.35)*0.10;
      const lampG=ctx.createRadialGradient(lampX+W*0.04,lampBaseY-lampH-H*0.02,0,lampX+W*0.04,lampBaseY-lampH-H*0.02,W*0.22);
      lampG.addColorStop(0,`rgba(255,190,60,${0.55*lampPulse})`);
      lampG.addColorStop(0.15,`rgba(220,150,35,${0.22*lampPulse})`);
      lampG.addColorStop(0.40,'rgba(160,100,20,0.06)');lampG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lampG;ctx.fillRect(0,0,W,H*0.75);
      ctx.fillStyle=`rgba(255,220,120,${0.90*lampPulse})`;
      ctx.beginPath();ctx.arc(lampX+W*0.04,lampBaseY-lampH-H*0.025,W*0.012,0,Math.PI*2);ctx.fill();
      const vg=ctx.createRadialGradient(cx,H*0.55,H*0.04,cx,H*0.55,H*0.82);
      vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.42,'rgba(4,3,2,0.14)');
      vg.addColorStop(0.70,'rgba(6,4,2,0.55)');vg.addColorStop(1,'rgba(8,5,3,0.97)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
      for(let i=0;i<30;i++){
        const gv=20+Math.random()*30|0;
        ctx.fillStyle=`rgba(${gv+10},${gv+5},${gv},${Math.random()*0.018})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }
      fadeIn=Math.min(1,fadeIn+0.005);
      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
