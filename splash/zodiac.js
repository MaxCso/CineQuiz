// CinéQuiz splash chunk — Zodiac
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Zodiac"]={
   name:'Zodiac',
   color:'60,80,120',
   ref:'Zodiac \u2014 David Fincher, 2007',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_zod_s');
    if(!_s){_s=document.createElement('style');_s.id='_zod_s';document.head.appendChild(_s);}
    _s.textContent='#splash-logo-wrap .splash-logo,#splash-logo-wrap .splash-tagline{color:#e8e0cc!important;-webkit-text-fill-color:#e8e0cc!important;background:none!important;}#splash-content-wrap{top:60%!important;transform:translateY(-50%)!important;}#splash-content-wrap.reveal{transform:translateY(-50%)!important;}';
    const _zodWatch=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_zodWatch);}},200);

    /* Pluie fine SF */
    const rain=Array.from({length:90},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vy:H*(0.010+Math.random()*0.012),
     len:H*(0.018+Math.random()*0.016),
     op:0.06+Math.random()*0.10,
    }));

    /* Skyline SF en silhouette — horizon haut */
    const sfBldgs=[
     {x:0.00,h:0.12,w:0.055},{x:0.04,h:0.17,w:0.045},{x:0.08,h:0.11,w:0.04},
     {x:0.11,h:0.19,w:0.05},{x:0.15,h:0.14,w:0.04},{x:0.18,h:0.22,w:0.055},
     {x:0.23,h:0.16,w:0.04},{x:0.26,h:0.13,w:0.04},{x:0.29,h:0.20,w:0.06},
     {x:0.34,h:0.25,w:0.05,tower:true},{x:0.38,h:0.17,w:0.045},
     {x:0.41,h:0.14,w:0.04},{x:0.44,h:0.21,w:0.055},{x:0.49,h:0.16,w:0.04},
     {x:0.52,h:0.12,w:0.04},{x:0.55,h:0.18,w:0.05},{x:0.59,h:0.23,w:0.045},
     {x:0.63,h:0.15,w:0.04},{x:0.66,h:0.19,w:0.055},{x:0.71,h:0.13,w:0.04},
     {x:0.74,h:0.16,w:0.045},{x:0.78,h:0.11,w:0.04},{x:0.81,h:0.20,w:0.05},
     {x:0.85,h:0.15,w:0.045},{x:0.89,h:0.12,w:0.04},{x:0.92,h:0.17,w:0.05},
     {x:0.96,h:0.13,w:0.04},
    ];
    /* Fenêtres pré-calculées */
    const wins=sfBldgs.map(b=>Array.from({length:60},()=>({
     rx:Math.random(),ry:Math.random(),on:Math.random()<0.28,
     col:`rgba(255,${185+Math.random()*40|0},60,${0.18+Math.random()*0.12})`,
    })));

    /* Lumières rouges du pont — pylônes */
    const pylonLights=[
     {x:cx,yRatio:0.30},{x:cx,yRatio:0.38},
     {x:cx-W*0.02,yRatio:0.305},{x:cx+W*0.02,yRatio:0.305},
    ];
    let lightPh=0;

    function drawSkyline(){
     const horizY=H*0.32;
     const skyG=ctx.createLinearGradient(0,H*0.10,0,horizY);
     skyG.addColorStop(0,'rgba(8,18,32,0)');
     skyG.addColorStop(1,'rgba(20,50,70,0.55)');
     ctx.fillStyle=skyG;ctx.fillRect(0,H*0.10,W,horizY-H*0.10);
     for(let i=0;i<sfBldgs.length;i++){
      const b=sfBldgs[i];
      const bh=b.h*H*0.65,bx=b.x*W,bw=b.w*W,by=horizY-bh;
      ctx.fillStyle='rgba(4,8,14,0.97)';ctx.fillRect(bx,by,bw,bh);
      if(b.tower){ctx.fillStyle='rgba(4,8,14,0.97)';ctx.fillRect(bx+bw*0.45,by-bh*0.18,bw*0.08,bh*0.18);}
      const wlist=wins[i];let wi=0;
      const cols=Math.floor(bw/7),rows=Math.floor(bh/10);
      for(let r=0;r<rows;r++){for(let c=0;c<cols;c++){
       if(wi<wlist.length&&wlist[wi].on){ctx.fillStyle=wlist[wi].col;ctx.fillRect(bx+c*7+1,by+r*10+1,4,6);}
       wi++;
      }}
     }
     ctx.fillStyle='rgba(10,22,36,0.95)';ctx.fillRect(0,horizY,W,H*0.06);
    }

    function drawBridge(){
     const cableY=H*0.28;
     const deckY=H*0.44;
     const botL=W*0.01,botR=W*0.99;
     /* Pylône central */
     ctx.strokeStyle='rgba(90,35,20,0.90)';ctx.lineWidth=W*0.025;
     ctx.beginPath();ctx.moveTo(cx,H*0.43);ctx.lineTo(cx,H*0.22);ctx.stroke();
     ctx.lineWidth=W*0.018;
     ctx.beginPath();ctx.moveTo(cx-W*0.04,H*0.24);ctx.lineTo(cx+W*0.04,H*0.24);ctx.stroke();
     ctx.beginPath();ctx.moveTo(cx-W*0.035,H*0.28);ctx.lineTo(cx+W*0.035,H*0.28);ctx.stroke();
     /* Câble principal gauche */
     ctx.strokeStyle='rgba(100,40,22,0.85)';ctx.lineWidth=W*0.008;
     ctx.beginPath();ctx.moveTo(botL,H);ctx.quadraticCurveTo(cx*0.30,deckY+H*0.08,cx,cableY);ctx.stroke();
     /* Câble principal droit */
     ctx.beginPath();ctx.moveTo(botR,H);ctx.quadraticCurveTo(cx+(W-cx)*0.70,deckY+H*0.08,cx,cableY);ctx.stroke();
     /* Suspentes gauches */
     ctx.strokeStyle='rgba(90,35,18,0.55)';ctx.lineWidth=1.2;
     const nSusp=22;
     for(let i=0;i<=nSusp;i++){
      const p=i/nSusp;
      const cabX=(1-p)*(1-p)*botL+2*(1-p)*p*(cx*0.30)+p*p*cx;
      const cabY=(1-p)*(1-p)*H+2*(1-p)*p*(deckY+H*0.08)+p*p*cableY;
      ctx.beginPath();ctx.moveTo(cabX,cabY);ctx.lineTo(botL+(cx-botL)*p,deckY);ctx.stroke();
     }
     /* Suspentes droites */
     for(let i=0;i<=nSusp;i++){
      const p=i/nSusp;
      const cabX=(1-p)*(1-p)*botR+2*(1-p)*p*(cx+(W-cx)*0.70)+p*p*cx;
      const cabY=(1-p)*(1-p)*H+2*(1-p)*p*(deckY+H*0.08)+p*p*cableY;
      ctx.beginPath();ctx.moveTo(cabX,cabY);ctx.lineTo(botR-(botR-cx)*p,deckY);ctx.stroke();
     }
     /* Tablier */
     ctx.fillStyle='rgba(15,12,10,0.92)';
     ctx.beginPath();ctx.moveTo(cx-W*0.12,deckY);ctx.lineTo(cx+W*0.12,deckY);ctx.lineTo(W*1.05,H*1.05);ctx.lineTo(-W*0.05,H*1.05);ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(60,50,35,0.40)';ctx.lineWidth=1.0;
     ctx.beginPath();ctx.moveTo(cx,deckY);ctx.lineTo(cx,H);ctx.stroke();
     /* Lumières rouges */
     const lop=0.55+Math.sin(lightPh)*0.45;
     for(const pl of pylonLights){
      const lg=ctx.createRadialGradient(pl.x,pl.yRatio*H,0,pl.x,pl.yRatio*H,W*0.025);
      lg.addColorStop(0,`rgba(255,30,10,${lop*0.9})`);
      lg.addColorStop(0.4,`rgba(220,20,5,${lop*0.35})`);
      lg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lg;ctx.beginPath();ctx.arc(pl.x,pl.yRatio*H,W*0.025,0,Math.PI*2);ctx.fill();
     }
    }

    function drawFog(){
     const fogY=H*0.44,fogH=H*0.22;
     const fogG=ctx.createRadialGradient(cx,fogY+fogH*0.4,0,cx,fogY+fogH*0.4,W*0.58);
     fogG.addColorStop(0,`rgba(30,70,90,${0.58+Math.sin(t*0.4)*0.06})`);
     fogG.addColorStop(0.45,`rgba(15,45,65,${0.38+Math.sin(t*0.3)*0.04})`);
     fogG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=fogG;ctx.fillRect(0,fogY,W,fogH*1.8);
     const fogC=ctx.createRadialGradient(cx,fogY+fogH*0.3,0,cx,fogY+fogH*0.3,W*0.32);
     fogC.addColorStop(0,`rgba(50,110,130,${0.35+Math.sin(t*0.5)*0.05})`);
     fogC.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=fogC;ctx.fillRect(0,fogY,W,fogH*1.4);
    }

    function frame(){
     if(stop.v)return;
     lightPh+=0.04;
     ctx.fillStyle='rgba(4,8,16,0.94)';ctx.fillRect(0,0,W,H);
     const skyTop=ctx.createLinearGradient(0,0,0,H*0.32);
     skyTop.addColorStop(0,'rgba(8,16,28,1)');
     skyTop.addColorStop(1,'rgba(12,28,44,0.8)');
     ctx.fillStyle=skyTop;ctx.fillRect(0,0,W,H*0.32);
     drawSkyline();
     drawBridge();
     drawFog();
     ctx.strokeStyle='rgba(140,160,190,1)';
     for(const r of rain){
      r.y+=r.vy;if(r.y>H){r.y=-r.len;r.x=Math.random()*W;}
      ctx.globalAlpha=r.op;ctx.lineWidth=0.55;
      ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+0.4,r.y+r.len);ctx.stroke();
     }
     ctx.globalAlpha=1;
     const vig=ctx.createRadialGradient(cx,H*0.5,H*0.15,cx,H*0.5,H*0.75);
     vig.addColorStop(0,'rgba(0,0,0,0)');vig.addColorStop(1,'rgba(0,0,0,0.72)');
     ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);
     for(let i=0;i<35;i++){ctx.fillStyle=`rgba(80,100,140,${Math.random()*0.018})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.3,1);}
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
