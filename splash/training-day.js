// CinéQuiz splash chunk — Training Day
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Training Day"]={
   name:'Training Day',
   color:'120,100,40',
   ref:'Training Day \u2014 Antoine Fuqua, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_td_s');
    if(!_s){_s=document.createElement('style');_s.id='_td_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:rgba(30,22,8,0.88)!important;text-shadow:none!important;}#splash:not(.curtain-open) .splash-tagline,#splash:not(.curtain-open) #splash-tagline{color:#000000!important;-webkit-text-fill-color:#000000!important;background:none!important;-webkit-background-clip:unset!important;background-clip:unset!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Silhouette Alonzo — Path2D depuis SVG (viewBox 0 0 546 584) */
    const _alonzoPath=new Path2D('M134.6 275.1C134.3 284.4 133.5 293.7 132.9 302.9C133 304.3 133 305.7 133 307.5L133 307.9C133 310.2 133 312.1 132.8 314.4C132 324.2 131.5 333.6 130.7 343C129.9 352.7 128.9 362.4 127.8 372.5C126.9 377.5 126.1 382.3 125.3 387L125.2 387.8L125.1 388.4C124.7 390.3 124.4 392.3 124.1 394.5C122.9 404 120.9 413 121 422C121.1 428.8 123.8 435.5 125.5 442.2C125.5 442.3 126.6 442.1 127.5 442C129.6 438.2 131.3 434.6 133.1 430.7L133.2 430.4C134.4 427 135.5 423.8 136.9 420.8C138.5 417.1 140.1 413.4 142 409.8C143.4 407.4 145.3 405.1 147.2 402.3C148.4 404 149.5 404.7 149.5 405.5C149.4 413.6 149.2 421.7 148.8 429.7C148.5 435.3 199.2 410.8 199 416.4C199.1 412.4 199.1 408.7 199.1 405.1C199.1 404.7 199.5 404.3 201 403.5C201.7 406 202.3 408.4 203 411.2C203.7 412.1 204.2 412.7 205 413.5C205.2 413.7 205.5 413.8 205.7 413.8C212.4 414 219 414.1 225.5 414.5C230 413.4 245.8 536.2 246 540.7C246.5 553.5 247.3 566.3 248 579.5L248 579.6C248 580.7 248 581.5 248.4 582.6C272.9 583 291.9 582.6 316 582.6C314.2 579.6 314.3 578.7 316 573.4C316 571.9 316 570.8 316 569.4C316.7 566.5 318.6 549.9 319.7 547.2C322.1 541.2 325.1 535.7 326.2 529.8C327.6 521.9 327.5 513.7 328 505.6C328.1 503.8 328 502 328 500.2L328 500.1C327.3 489.9 325.1 465.9 325.4 456.2C325.7 443.5 327.3 430.8 328.7 418.2C329.4 411.5 331.5 410.2 338.3 410C340.2 409.9 342.2 409.4 344.5 409.1C347.4 406.8 349.8 404.4 352.6 402C353 402 353.4 401.9 353.6 401.8C354.2 400.9 354.7 400 355.4 398.9C356.5 398.1 357.4 397.5 358.6 396.9C360.1 396.3 361.2 395.7 362.7 395C363.5 394.9 364 394.8 364.8 394.8C366.6 395.2 368 395.5 369.8 395.9C370.8 396.5 371.4 396.9 372.3 397.6C374.6 398.4 377.9 396.7 378.4 401C378.3 401.4 378.6 401.7 378.8 401.8C381.2 402.4 383.5 402.9 385.8 403.7C390 404.7 390 408.3 390.9 411.7C390.9 413.1 390.9 414.1 390.9 415.5C394.2 425.5 397.6 435.1 401 445C402 447.3 403.1 449.2 404.2 451L404.2 451C407 448.2 409.3 445.9 412 443.7C414.6 442.7 420.4 443.7 423.1 442.5C423.6 439.1 425.9 437.8 429.5 437.9C430.4 437.1 430.8 436.4 431.3 435.6L432.8 436.4C432.1 437.6 431.4 438.8 430.3 440C429.2 440.2 428.5 440.4 427.8 440.7C428.3 441.1 428.8 441.5 429.7 441.9C432 442 434 441.9 436.5 441.9C436.8 433.7 436.6 425.4 436.3 416.9C433 418.9 431.1 418.2 431 414.2C430.9 411.1 431 407.9 431 404.3C430.6 399.7 430 395.6 429.7 391.2C428.8 388.8 427.7 386.6 426.8 384.2C429.5 381.3 431.6 379.1 426.2 376.8C424.8 376.2 424.9 372.1 424.4 369.1C424.3 367.7 424.1 366.7 424 365.3C423.6 359.3 423.3 353.6 423 347.4C422.7 343.9 422.3 340.8 422 336.9C420 322.1 418 308.2 416 294.3C415.8 293.2 415 292.2 414.7 291C414.1 288.8 413 286.5 413.2 284.3C413.9 271 410.7 258.3 407.3 245.6C406.3 241.5 405.8 236.7 407 232.9C410.6 221.3 407.4 211 403.9 200.1C399.8 187.1 396.8 173.8 394.2 160.5C392 149.9 391.4 138.9 389.7 128.1C388.5 120.8 395.3 112.3 402.7 111.7C405.4 111.5 408.4 110.3 410.6 108.7C414.9 105.6 418.8 102 422.8 98.5C431.2 91.5 438.9 83.5 448.1 77.7C456.1 72.5 461.2 65.2 467.4 58.6C472 53.7 477.1 49 482.8 45.5C491.2 40.2 492.3 39 491 29C490.8 27.3 491.1 24.8 492.2 24C496.3 20.7 500.5 17.4 505.2 15C515.2 9.9 526.2 10.8 536.9 10.7C545 10.7 545.6 9.9 544.3 1.1C542.6 1.1 540.8 1.1 539 1.1C520.2 1.1 501.4 1.3 482.6 1C478.2 0.9 475.9 2.4 474.2 6.1C473.4 7.7 471.7 9 470.3 10.2C463.7 15.5 457.1 20.7 450.6 25.9C450.4 26 450.4 26.2 450.3 26.3C448.4 27.5 446.6 29 444.6 29.8C439.2 31.8 432.5 32.1 428.5 35.6C423.5 39.9 418.4 40.7 412.6 41.2C408.7 41.5 405.2 42.2 403.9 47C403.6 48.2 399.3 49.7 398.6 49.1C393.5 44.9 390.5 48.6 386.9 51.2C381.3 55.2 374.7 57.6 368.3 54.9C364.8 53.4 362.6 53.6 359.7 55.1C357.6 56.3 354.6 58.5 353.1 57.8C349 55.8 345.3 57.5 341.5 57.9L341.3 57.9C339.8 58.1 337.9 58.3 336.7 57.6C332.5 55 328.5 56.1 324.2 57.2L324.2 57.2C317.6 58.9 311.7 63 304.5 62.8C301.4 62.7 298.2 63.5 295.1 64.2C292.8 64.7 289.5 66.7 288.9 63.2C288.5 60 289.4 54.9 291.5 53.6C294.3 51.9 295.1 50.1 295.2 47.5C295.5 43.7 295.5 39.9 295.4 36C295.1 22.9 281.3 7.7 268.4 6.8C261.5 6.3 253.8 6.7 249.1 12.6C240.9 23 235 34.6 237.9 48.8C238.6 51.9 238.2 54.9 242.7 54.8C243.3 54.8 244.4 56.4 244.5 57.3C244.9 59.8 245 62.3 245.2 64.8C245.4 68.9 242.7 70 239.7 69C233.2 66.8 226.7 64.5 220.7 61.2C211.3 56 202.2 50.5 191.2 56.8C190.5 57.2 189.5 57.2 188.7 57C178.4 54.2 167.2 57.3 157.1 52.7C156.3 52.3 155.5 52.3 154.7 52C150.4 50.5 145.9 49.3 141.8 47.3C136 44.4 130.6 40.9 123.7 44.5C120 46.4 118.3 43.5 116.9 40.6C116.3 39.2 115.6 36.9 114.5 36.6C108.5 34.9 102.4 32.8 96.3 32.6C92.5 32.5 90.1 31.8 87.9 29C84.6 24.9 81.6 20.3 77.5 17.2C73.9 14.4 69.6 12.8 66.8 8.7C65.7 7.1 62.5 6.3 60.2 6.3C42.1 6.1 23.9 6.2 5.7 6.2C4.3 6.2 2.8 6.3 1.4 6.4C0.4 14.5 0.9 14.5 8.5 15.2C18.2 16 28 17.1 37.4 19.5C42.3 20.8 46.7 24.9 50.9 28.3C53.7 30.5 54.2 38.7 52.7 42.2C52.2 43.3 52.7 46.1 53.3 46.3C56.8 47.3 59.1 49 59.7 52.8C59.8 53.3 61.4 53.8 62.3 53.9C68.4 54.1 72.2 57.8 75.7 62.2C82.5 70.9 89.1 79.7 99.8 84.1C101.8 85 103.4 86.9 105.1 88.5C114.4 97.5 124.9 104.8 136.8 109.7C142.4 111.9 147 116.2 146.6 122.2C145.9 137.3 144.8 152.3 143.6 167.4C143.1 173.9 142.3 180.5 141.1 187C139.8 194 137 200.8 136.6 207.8C135.5 230.2 135.3 252.7 134.6 275.1Z');

    /* Oiseaux — vol en V */
    const birds=Array.from({length:7},(_,i)=>({
     px: 0.12+i*0.11, py: 0.12+Math.abs(i-3)*0.03,
     spd: 0.0004+Math.random()*0.0002,
     ph: Math.random()*Math.PI*2,
     size: 0.018+Math.random()*0.008,
    }));

    /* Particules de poussière dorée — plus nombreuses et variées */
    const dust=Array.from({length:65},()=>({
     x:Math.random(), y:0.10+Math.random()*0.75,
     vy:-(0.00015+Math.random()*0.00035),
     vx:(Math.random()-0.5)*0.00015,
     op:0.06+Math.random()*0.22,
     r:Math.random()*2.2+0.3,
     ph:Math.random()*Math.PI*2,
     phSpd:0.008+Math.random()*0.018,
     col:Math.random()<0.6?'140,95,15':'180,130,40',
    }));

    /* Particules de chaleur — tremblotement thermique */
    const heatPts=Array.from({length:20},()=>({
     x:Math.random(), y:0.55+Math.random()*0.20,
     vy:-(0.0004+Math.random()*0.0006),
     vx:(Math.random()-0.5)*0.0003,
     op:0.04+Math.random()*0.08,
     r:Math.random()*3+1.5,
     ph:Math.random()*Math.PI*2,
    }));

    /* Rayons de soleil — angles fixes */
    const sunRays=Array.from({length:8},(_,i)=>({
     angle:(i/8)*Math.PI*2,
     len:0.28+Math.random()*0.18,
     op:0.04+Math.random()*0.06,
     width:0.015+Math.random()*0.025,
    }));

    function drawBird(bx,by,size,wingPh){
     /* Oiseau stylisé — deux courbes en M */
     const flap=Math.sin(wingPh)*0.3;
     ctx.beginPath();
     ctx.moveTo(bx,by);
     ctx.quadraticCurveTo(bx-size*W*0.5,by-flap*size*H,bx-size*W,by+size*H*0.1);
     ctx.moveTo(bx,by);
     ctx.quadraticCurveTo(bx+size*W*0.5,by-flap*size*H,bx+size*W,by+size*H*0.1);
     ctx.strokeStyle='rgba(25,18,5,0.75)';ctx.lineWidth=1.5;ctx.stroke();
    }

    function drawSkyline(baseY){
     const blds=[
      [0.00,0.55,0.055],[0.04,0.48,0.04],[0.07,0.60,0.05],[0.11,0.42,0.04],
      [0.14,0.52,0.06],[0.19,0.45,0.04],[0.22,0.58,0.055],[0.27,0.40,0.05],
      [0.31,0.50,0.07],[0.37,0.62,0.05],[0.41,0.44,0.04],[0.44,0.54,0.06],
      [0.49,0.38,0.04],[0.52,0.56,0.08],[0.59,0.46,0.04],[0.62,0.60,0.055],
      [0.67,0.42,0.04],[0.70,0.52,0.06],[0.75,0.58,0.055],[0.80,0.44,0.04],
      [0.83,0.50,0.07],[0.89,0.46,0.04],[0.92,0.55,0.055],[0.97,0.48,0.03],
     ];
     for(const [xr,hr,wr] of blds){
      const bx=xr*W, bw=wr*W, bh=hr*(H-baseY);
      const by=baseY-bh;
      /* Corps du bâtiment — sépia sombre */
      ctx.fillStyle='rgba(35,26,8,0.92)';
      ctx.fillRect(bx,by,bw,bh);
      /* Antenne sur les grands buildings */
      if(hr>0.55){
       ctx.fillStyle='rgba(28,20,6,0.92)';
       ctx.fillRect(bx+bw*0.45,by-bh*0.12,bw*0.10,bh*0.13);
      }
      /* Fenêtres — jaune sépia chaud */
      const cols=Math.max(1,Math.floor(bw/7));
      const rows=Math.floor(bh/10);
      for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
       if(Math.sin(xr*100+r*c*3.1+0.5)>0.30){
        ctx.fillStyle=`rgba(200,${150+Math.sin(r+c)*20|0},60,${0.28+Math.random()*0.18})`;
        ctx.fillRect(bx+c*(bw/cols)+1,by+r*10+1,Math.max(2,bw/cols-3),5);
       }
      }
     }
     /* Ligne de sol */
     ctx.fillStyle='rgba(28,20,6,0.95)';
     ctx.fillRect(0,baseY,W,H-baseY);
    }

    function drawAlonzo(){
     /* Ratio SVG: 546x584, on cible ~50% de H pour la hauteur */
     const tgtH=H*0.50;
     const tgtW=tgtH*(546/584);
     const sx=cx-tgtW/2;
     const sy=H-tgtH; /* pieds collés exactement en bas */
     const scaleX=tgtW/546, scaleY=tgtH/584;
     ctx.save();
     ctx.translate(sx,sy);
     ctx.scale(scaleX,scaleY);
     ctx.fillStyle='rgba(22,14,4,0.97)';
     ctx.fill(_alonzoPath);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── FOND SÉPIA — dégradé riche LA ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#c8b878');  /* ciel haut chaud */
     bg.addColorStop(0.18,'#d4c080');
     bg.addColorStop(0.38,'#dcc878');  /* ventre lumineux */
     bg.addColorStop(0.60,'#c8b060');
     bg.addColorStop(0.80,'#b89848');
     bg.addColorStop(1.00,'#a08030');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── SOLEIL — halo central ── */
     const sunX=cx*0.62, sunY=H*0.18;
     const sunG=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,W*0.38);
     sunG.addColorStop(0,`rgba(255,248,200,${0.55+Math.sin(t*0.25)*0.05})`);
     sunG.addColorStop(0.18,`rgba(255,230,140,${0.28+Math.sin(t*0.20)*0.04})`);
     sunG.addColorStop(0.45,'rgba(220,185,80,0.12)');
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H*0.55);

     /* ── RAYONS DE SOLEIL ── */
     ctx.save();ctx.translate(sunX,sunY);
     for(const ray of sunRays){
      const rx=Math.cos(ray.angle+t*0.08)*ray.len*W;
      const ry=Math.sin(ray.angle+t*0.08)*ray.len*H;
      const rg=ctx.createLinearGradient(0,0,rx,ry);
      rg.addColorStop(0,`rgba(255,240,160,${ray.op*(0.7+0.3*Math.sin(t*0.4+ray.angle))})`);
      rg.addColorStop(1,'rgba(255,220,100,0)');
      ctx.strokeStyle=rg;
      ctx.lineWidth=ray.width*W;
      ctx.globalAlpha=0.55;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(rx,ry);ctx.stroke();
     }
     ctx.globalAlpha=1;ctx.restore();

     /* ── NUAGES VOLUMÉTRIQUES ── */
     const clouds=[
      {x:0.15,y:0.14,rx:0.22,ry:0.065,op:0.16},
      {x:0.55,y:0.10,rx:0.18,ry:0.050,op:0.12},
      {x:0.80,y:0.18,rx:0.15,ry:0.045,op:0.14},
      {x:0.35,y:0.22,rx:0.14,ry:0.040,op:0.10},
     ];
     for(const cl of clouds){
      const cg=ctx.createRadialGradient(cl.x*W,cl.y*H,0,cl.x*W,cl.y*H,cl.rx*W);
      cg.addColorStop(0,`rgba(255,252,225,${cl.op*(0.8+Math.sin(t*0.12+cl.x*5)*0.2)})`);
      cg.addColorStop(0.5,`rgba(245,235,185,${cl.op*0.5})`);
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.ellipse(cl.x*W,cl.y*H,cl.rx*W,cl.ry*H,0,0,Math.PI*2);ctx.fill();
     }

     /* ── VOILE DE CHALEUR — couche basse ── */
     const hazeG=ctx.createLinearGradient(0,H*0.58,0,H*0.74);
     hazeG.addColorStop(0,'rgba(0,0,0,0)');
     hazeG.addColorStop(0.5,`rgba(200,160,40,${0.08+Math.sin(t*0.3)*0.02})`);
     hazeG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hazeG;ctx.fillRect(0,H*0.58,W,H*0.16);

     /* ── OISEAUX ── */
     for(const b of birds){
      b.ph+=0.08;b.px+=b.spd;
      if(b.px>1.15) b.px=-0.15;
      drawBird(b.px*W,b.py*H,b.size,b.ph);
     }

     /* ── SKYLINE ── */
     drawSkyline(H*0.74);

     /* ── SILHOUETTE ALONZO ── */
     drawAlonzo();

     /* ── POUSSIÈRE DORÉE ── */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.ph+=d.phSpd;
      if(d.y<-0.02){d.y=0.95+Math.random()*0.05;d.x=Math.random();}
      if(d.x<0)d.x=1;if(d.x>1)d.x=0;
      const dop=d.op*(0.4+0.6*Math.abs(Math.sin(d.ph)));
      /* Halo doux */
      const dg=ctx.createRadialGradient(d.x*W,d.y*H,0,d.x*W,d.y*H,d.r*2.5);
      dg.addColorStop(0,`rgba(${d.col},${dop*0.45})`);
      dg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=dg;ctx.beginPath();ctx.arc(d.x*W,d.y*H,d.r*2.5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(${d.col},${dop})`;
      ctx.beginPath();ctx.arc(d.x*W,d.y*H,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── PARTICULES DE CHALEUR ── */
     for(const h of heatPts){
      h.x+=h.vx;h.y+=h.vy;h.ph+=0.025;
      if(h.y<0.50){h.y=0.72+Math.random()*0.05;h.x=Math.random();}
      ctx.fillStyle=`rgba(220,180,60,${h.op*(0.3+0.7*Math.abs(Math.sin(h.ph)))})`;
      ctx.beginPath();ctx.arc(h.x*W,h.y*H,h.r,0,Math.PI*2);ctx.fill();
     }

     /* ── VIGNETTE ── */
     const vig=ctx.createRadialGradient(cx,H*0.50,H*0.15,cx,H*0.50,H*0.80);
     vig.addColorStop(0,'rgba(0,0,0,0)');
     vig.addColorStop(0.7,'rgba(80,55,10,0.08)');
     vig.addColorStop(1,'rgba(60,40,5,0.40)');
     ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);

     /* ── GRAIN PELLICULE SÉPIA ── */
     for(let i=0;i<30;i++){
      ctx.fillStyle=`rgba(100,70,10,${Math.random()*0.020})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
