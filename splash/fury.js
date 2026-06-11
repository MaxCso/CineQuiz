// CinéQuiz splash chunk — Fury
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Fury"]={
   name:'Fury',
   color:'60,80,40',
   ref:'Fury \u2014 David Ayer, 2014',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_fy_s');
    if(!_s){_s=document.createElement('style');_s.id='_fy_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Tank SVG — Path2D (viewBox 0 0 549 347) */
    const _tankPath=new Path2D('M105.4 77C115.8 79.7 125.8 82.4 135.8 84.8C137.4 85.2 139.3 84.8 140.9 84.3C145.1 82.9 148.6 83.8 151.7 87C153 88.3 154.6 89.7 156.3 90.2C163.1 91.9 170 93.2 177.2 94.7C177.7 90.9 180 90.3 183.5 91.3C188.7 92.7 194 93.8 199.3 94.7C200.5 94.9 202.3 94.2 203.2 93.3C211.1 85.1 220.7 83.8 231.4 84.9C238.7 85.6 246.1 85.2 253.4 85.2C253.7 85.2 254 85 254.4 84.8C255.3 80.8 255.9 76.7 257 72.8C259.7 63.1 265.8 57.1 275.9 55.2C277.7 54.8 279.3 52.9 280.9 51.5C281.9 50.7 282.3 49.2 283.4 48.5C287.7 45.4 293.5 44.1 295.5 38.3C293.4 36.9 290.8 35.4 288.5 33.5C287.3 32.4 285.7 30.5 286 29.3C287.1 22.8 288.5 16.3 290.5 10C292.5 3.4 297.5 -0.1 304.4 0C312 0.1 318.7 2.8 321.3 10.1C324 17.5 325 25.4 327 33.8C334.5 33.4 343.4 33 352.7 32.6C353.1 35.1 353.4 37.3 353.9 40.2C363.5 40.2 373.1 40.2 382.7 40.1C387.2 40.1 391.7 39.8 396.2 39.7C398.8 39.6 401.4 39.9 401.3 43.5C401.2 46.6 399.4 47.6 396.4 47.7C385.9 48.1 375.5 48.9 365 49.4C361 49.6 359 51.4 359.2 55.6C359.3 57.9 360.2 60.8 356.1 60.9C355.7 60.9 356 64.4 355.1 65C353.1 66.5 350.5 67.1 348.3 68.1C349.2 70.5 350.4 73.2 351.4 75.8C358.8 76.3 366.5 75.7 373.7 77.6C380.7 79.5 387.1 83.8 393.9 87.1C395.5 79.8 395.5 79.8 406.6 80.9C406.6 83.6 406.6 86.4 406.6 89.3C408.9 89.9 411 90.5 413.3 91.1C415.8 62.1 418.3 33.5 420.8 4.9C421 5 421.3 5 421.6 5C421.6 17.9 421.8 30.7 421.5 43.6C421.3 56.8 420.5 69.9 420 83.1C419.7 92.2 419.8 92.2 428.3 96C428.9 93.1 428.6 89.5 430.3 87.5C431.5 86.1 435.3 86.5 437.9 86.8C441.3 87.2 441.8 91.4 439.5 100.5C441.2 101.4 443 102.7 445 103.4C449.9 105.2 451.9 108.6 450.6 113.5C449.2 118.3 450.9 121.7 454.3 125C457.4 128 460.1 131.4 462.7 134.8C465.4 138.3 466.5 141.9 462.3 145.3C459.3 147.7 459 150.1 461.9 153.2C463.6 155 464.7 157.8 465.1 160.3C465.6 163.9 463.5 166.3 459.9 167C458.2 167.3 456.5 167.2 454.9 167.2C422.6 167.2 390.2 167.2 357.9 167.2C356.1 167.2 354.3 167.2 352.6 167.2C352.5 167.8 352.5 168.4 352.5 168.9C355.6 168.9 358.6 169 361.7 168.9C369.4 168.9 369.4 168.9 371.3 175.9C371.7 176 372.2 176.3 372.6 176.2C402.6 174.4 432.1 179.1 461.8 182.1C481.8 184.2 501.7 187 521.8 189.2C525.9 189.7 528.2 190.6 530.3 195.2C533.8 202.9 539.4 209.8 544.1 217C545.4 219.1 546.8 221.1 548.6 223.9C543.1 223.9 538.6 223.9 535 223.9C535.1 232.8 535.2 241 535.4 249.3C535.5 250.1 536.7 251.2 537.6 251.5C541.1 252.5 542.2 254.9 542.1 258.3C542 262.1 542.1 265.9 542.1 270.2C538.5 270.2 535.4 270.2 532.5 270.2C530.4 273.7 530.4 278.7 524.6 278.3C525.7 278.9 526.7 279.5 527.8 280.1C526.3 285.8 525.2 291.9 516.9 291.7C518.2 292 519.5 292.3 520.8 292.6C519.4 301 518.2 302.3 511 303.8C511.5 305 512.9 306.4 512.6 307.4C511.3 312.7 509 317.3 502.2 316.4C503.7 323.1 500.1 327.6 492.2 329.5C490.8 338.1 489.5 339.1 481.2 340.6C454.5 345.4 427.6 346.9 400.6 346.6C381.1 346.5 361.6 346.7 342.1 346.5C335.5 346.4 328.9 345.4 322.3 344.5C316.5 343.6 317.1 338.2 315.6 334.2C307.9 332.7 304.1 328.1 306 321.3C299 321.9 296.4 317.3 295.1 311.6C294.9 310.8 296.5 309.7 297.4 308.5C293.4 307.9 289.3 307.3 288 302.3C287.9 301.7 286 301.5 284.9 301.4C275.8 300.8 266.6 300.3 257.5 299.9C256.1 299.8 254.6 300.9 253.2 301.4C251 302.3 248.8 303.3 246.9 304.1C247.2 305 248.5 306.4 248.2 307.4C246.8 312.3 245.1 317.2 238.4 316.3C237.9 321.4 237.6 326.2 232.5 328.9C231.5 329.4 231.8 332.2 230.8 333C227.3 335.6 223.6 339.3 219.7 339.8C204.9 341.6 189.9 342.9 175 343.4C139.7 344.8 104.4 345.7 69.1 346.4C64 346.5 58.5 346 54 344C51.1 342.7 49.6 338.2 46.6 333.9C40.7 332.3 37 327.9 38.3 321.2C31.5 321.8 29.2 317.1 27.8 311.7C27.6 311 29.1 309.8 30.1 308.5C22.9 309.1 21 303.8 19.5 297.6C20.7 297.2 22.1 296.8 22.9 296.5C20.4 294.9 16.9 293.6 15.2 291.1C13.9 289.3 9.5 285.2 16.9 282.8C10 282.6 9 278 8.4 273.6C8.3 272.4 10.2 271 11.1 269.7C6.6 268.1 3.1 263.9 4 260C4.3 258.6 6.8 257.7 8.7 256.2C8.6 255.2 8.5 253.1 8.3 250.6C7.3 250.6 6.1 250.5 4.8 250.6C1.3 250.8 -8.6e-05 249 0 245.8C0 238.4 -0.1 231.1 0.1 223.8C0.1 222.6 0.7 221.2 1.6 220.4C11.4 211.3 22.6 205.3 36.5 205.8C42.8 206 49.1 205.8 55.9 205.8C55.6 203.3 55.3 200.9 55 198.5C54.6 194.5 56.2 192.5 60.3 192.5C79.3 192.6 98.3 192.4 117.3 192.8C119.8 192.8 122.3 195.7 125.3 197.6C131.2 192 137.9 185.3 145.1 179C147.1 177.2 150.3 175.9 152.9 175.8C161.6 175.5 170.3 175.9 178.9 175.7C180.5 175.6 182.1 174.2 183.7 173.5C186.1 172.5 188.4 170.9 190.8 170.8C199 170.4 207.2 170.7 215.3 170.6C216.9 170.6 218.4 170.5 220.2 169.5C219.6 169.2 218.9 168.5 218.4 168.6C212.1 169.7 207.9 165.7 203.2 162.6C200.9 161.1 198 160.4 195.3 159.7C193.5 159.2 191.6 159.6 189.8 159.3C182 158.3 179.1 155 178.6 147.2C178.5 146.4 178.6 145.6 178.5 144.7C177.9 134.1 177.3 123.5 176.4 112.9C176.4 112 175.1 110.7 174.1 110.4C167.1 108.1 159.9 105.8 152.8 103.7C151.7 103.4 150.3 104.1 149 104.4C145.3 105.1 141.8 105.2 138.9 102C137.8 100.8 135.9 100.1 134.2 99.7C101.6 91 68.9 82.4 35.6 73.7C32.2 79.5 26.8 80.3 20.3 78.9C14 77.5 10.2 74.6 9.9 68.1C9.7 64 10.6 59.6 12.1 55.6C13.6 51.6 17.2 48.6 21.7 48.9C27.2 49.3 33.2 49.3 36.7 55.2C37.7 57 39.7 58.8 41.6 59.3C62.7 65.3 83.9 71.1 105.4 77Z');

    /* Traçantes */
    const tracers=Array.from({length:14},()=>({
     x:Math.random()<0.5?-W*0.1:W*1.1,
     y:H*(0.10+Math.random()*0.60),
     angle:(Math.random()-0.5)*0.35+(Math.random()<0.5?0:Math.PI),
     spd:W*(0.020+Math.random()*0.016),
     len:W*(0.06+Math.random()*0.06),
     op:0.70+Math.random()*0.25,life:1.0,
    }));

    /* Braises */
    const embers=Array.from({length:55},()=>({
     x:W*0.2+Math.random()*W*0.6,
     y:H*(0.40+Math.random()*0.35),
     vx:(Math.random()-0.5)*0.55,
     vy:-(0.30+Math.random()*0.70),
     r:Math.random()*2.2+0.5,life:1.0,
     col:Math.random()<0.5?'255,150,20':'255,80,10',
    }));

    /* Fumée */
    const smoke=Array.from({length:14},()=>({
     x:W*(0.25+Math.random()*0.50),
     y:H*(0.30+Math.random()*0.35),
     r:W*(0.045+Math.random()*0.065),
     vy:-(0.14+Math.random()*0.18),
     vx:(Math.random()-0.5)*0.12,
     op:0.06+Math.random()*0.07,
    }));

    /* Explosions de fond — positions fixes, pulsantes */
    const explosions=[
     {x:W*0.15,y:H*0.52,r:W*0.14,ph:0.0},
     {x:W*0.80,y:H*0.58,r:W*0.10,ph:1.8},
     {x:W*0.50,y:H*0.62,r:W*0.08,ph:3.2},
    ];

    function drawTank(){
     /* SVG 549×347 → on scale pour W*0.88 de large */
     const tgtW=W*0.88;
     const tgtH=tgtW*(347/549);
     const sx=cx-tgtW/2;
     const sy=H*0.80-tgtH;
     ctx.save();
     ctx.translate(sx,sy);
     ctx.scale(tgtW/549,tgtH/347);
     ctx.fillStyle='rgba(12,9,2,0.97)';
     ctx.fill(_tankPath);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Ciel de guerre — brun-kaki sombre, bien visible */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#1a1205');
     bg.addColorStop(0.35,'#261a06');
     bg.addColorStop(0.65,'#341f08');
     bg.addColorStop(1,'#3e2208');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Explosions de fond — lueurs chaudes pulsantes */
     for(const ex of explosions){
      ex.ph+=0.022;
      const pulse=0.55+Math.sin(ex.ph)*0.45;
      const eg=ctx.createRadialGradient(ex.x,ex.y,0,ex.x,ex.y,ex.r);
      eg.addColorStop(0,`rgba(255,140,10,${0.30*pulse})`);
      eg.addColorStop(0.35,`rgba(200,70,5,${0.16*pulse})`);
      eg.addColorStop(0.70,`rgba(120,30,0,${0.08*pulse})`);
      eg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eg;ctx.fillRect(ex.x-ex.r,ex.y-ex.r,ex.r*2,ex.r*2);
     }

     /* Fumée montante */
     for(const s of smoke){
      s.y+=s.vy;s.x+=s.vx;s.r+=0.22;
      if(s.y<-s.r){
       s.y=H*(0.38+Math.random()*0.30);
       s.r=W*(0.04+Math.random()*0.05);
       s.x=W*(0.20+Math.random()*0.60);
      }
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(55,40,15,${s.op})`);
      sg.addColorStop(0.5,`rgba(35,25,8,${s.op*0.5})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* Sol — terre boueuse */
     const groundG=ctx.createLinearGradient(0,H*0.80,0,H);
     groundG.addColorStop(0,'rgba(30,18,4,0.96)');
     groundG.addColorStop(1,'rgba(20,12,2,0.98)');
     ctx.fillStyle=groundG;ctx.fillRect(0,H*0.80,W,H*0.20);

     /* Tank SVG */
     drawTank();

     /* Traçantes */
     for(const tr of tracers){
      tr.x+=Math.cos(tr.angle)*tr.spd;
      tr.y+=Math.sin(tr.angle)*tr.spd;
      tr.life-=0.013;
      if(tr.life<=0||tr.x<-W*0.2||tr.x>W*1.2){
       tr.x=Math.random()<0.5?-W*0.1:W*1.1;
       tr.y=H*(0.10+Math.random()*0.60);
       tr.angle=(Math.random()-0.5)*0.35+(tr.x<0?0:Math.PI);
       tr.life=0.85+Math.random()*0.5;
      }
      const tx=tr.x-Math.cos(tr.angle)*tr.len;
      const ty=tr.y-Math.sin(tr.angle)*tr.len;
      const tg=ctx.createLinearGradient(tx,ty,tr.x,tr.y);
      tg.addColorStop(0,'rgba(0,0,0,0)');
      tg.addColorStop(0.5,`rgba(255,180,50,${tr.op*tr.life*0.45})`);
      tg.addColorStop(1,`rgba(255,240,140,${tr.op*tr.life})`);
      ctx.strokeStyle=tg;ctx.lineWidth=2.0;
      ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(tr.x,tr.y);ctx.stroke();
     }

     /* Braises */
     for(const e of embers){
      e.x+=e.vx;e.y+=e.vy;e.vy+=0.022;e.life-=0.009;
      if(e.life<=0){
       e.x=W*0.15+Math.random()*W*0.70;
       e.y=H*(0.50+Math.random()*0.20);
       e.vx=(Math.random()-0.5)*0.55;
       e.vy=-(0.30+Math.random()*0.70);
       e.life=0.75+Math.random()*0.5;
      }
      ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${e.col},${0.70*e.life})`;ctx.fill();
     }

     /* Vignette chaude */
     const vig=ctx.createRadialGradient(cx,H*0.48,H*0.10,cx,H*0.48,H*0.82);
     vig.addColorStop(0,'rgba(0,0,0,0)');
     vig.addColorStop(0.55,'rgba(10,5,0,0.12)');
     vig.addColorStop(1,'rgba(5,2,0,0.55)');
     ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);

     /* Grain pellicule guerre */
     for(let i=0;i<30;i++){
      ctx.fillStyle=`rgba(180,120,20,${Math.random()*0.022})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
