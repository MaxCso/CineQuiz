// CinéQuiz splash chunk — Parasite
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Parasite"]={
   name:'Parasite',
   color:'20,80,20',
   ref:'Parasite \u2014 Bong Joon-ho, 2019',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── CSS position ── */
    let _parS=document.getElementById('_par_pos_s');
    if(!_parS){_parS=document.createElement('style');_parS.id='_par_pos_s';document.head.appendChild(_parS);}
    _parS.textContent='#splash-content-wrap{top:30%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _parW=setInterval(()=>{if(stop.v){_parS.textContent='';clearInterval(_parW);}},200);

    /* ── Pluie ── */
    const rain=Array.from({length:160},()=>({
     x:Math.random()*W, y:Math.random()*H,
     len:Math.random()*28+14, spd:Math.random()*10+11,
     op:Math.random()*0.28+0.08, vx:-1.8,
    }));

    /* ── Skyline de Séoul ── */
    // Bâtiments [x, largeur, hauteur depuis le bas]
    const bldgs=[
     [0,       W*0.055, H*0.175],
     [W*0.045, W*0.040, H*0.140],
     [W*0.080, W*0.070, H*0.220],
     [W*0.140, W*0.038, H*0.155],
     [W*0.170, W*0.055, H*0.265],
     [W*0.218, W*0.032, H*0.135],
     [W*0.244, W*0.060, H*0.300], // tour haute centre-gauche
     [W*0.296, W*0.038, H*0.170],
     [W*0.328, W*0.045, H*0.190],
     [W*0.368, W*0.030, H*0.145],
     [W*0.394, W*0.028, H*0.130],
     [W*0.418, W*0.050, H*0.175],
     [W*0.462, W*0.035, H*0.160],
     [W*0.492, W*0.055, H*0.240], // tour centrale
     [W*0.541, W*0.030, H*0.150],
     [W*0.566, W*0.048, H*0.200],
     [W*0.608, W*0.060, H*0.280], // grande tour droite
     [W*0.662, W*0.035, H*0.160],
     [W*0.692, W*0.050, H*0.185],
     [W*0.736, W*0.040, H*0.145],
     [W*0.770, W*0.065, H*0.230],
     [W*0.828, W*0.038, H*0.155],
     [W*0.860, W*0.055, H*0.195],
     [W*0.910, W*0.042, H*0.165],
     [W*0.948, W*0.055, H*0.140],
    ];

    /* Lueurs de fenêtres sur les buildings */
    const wins=bldgs.map(([bx,bw,bh])=>
     Array.from({length:Math.floor(bw/W*80)},()=>({
      x:bx+bw*0.15+Math.random()*bw*0.70,
      y:H-bh+bh*0.15+Math.random()*bh*0.70,
      ph:Math.random()*Math.PI*2,
      freq:0.008+Math.random()*0.025,
      op:Math.random()*0.35+0.08,
      warm:Math.random()>0.40,
     }))
    ).flat();

    /* ── Niveau d'eau ── */
    let waterLevel=H;
    const waterY=H*0.62; // niveau final

    /* ── Planche flottante ── */
    const plank={x:cx-W*0.18, w:W*0.36, h:H*0.022, angle:0, vx:0.18, bobPh:Math.random()*Math.PI*2};

    function drawPlank(wl){
     const py=wl-plank.h*0.5+Math.sin(plank.bobPh)*H*0.008;
     ctx.save();ctx.translate(plank.x+plank.w*0.5,py);ctx.rotate(plank.angle);
     ctx.fillStyle='rgba(0,0,0,0.20)';ctx.fillRect(-plank.w*0.5+2,plank.h*0.3,plank.w,plank.h*0.6);
     const pg=ctx.createLinearGradient(0,-plank.h*0.5,0,plank.h*0.5);
     pg.addColorStop(0,'rgba(95,62,30,0.92)');pg.addColorStop(0.4,'rgba(74,46,18,0.95)');pg.addColorStop(1,'rgba(52,30,10,0.88)');
     ctx.fillStyle=pg;ctx.beginPath();ctx.roundRect(-plank.w*0.5,-plank.h*0.5,plank.w,plank.h,2);ctx.fill();
     const rg=ctx.createLinearGradient(-plank.w*0.5,-plank.h*0.5,plank.w*0.5,-plank.h*0.5);
     rg.addColorStop(0,'rgba(0,0,0,0)');rg.addColorStop(0.4,'rgba(160,140,90,0.22)');rg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg;ctx.fillRect(-plank.w*0.5,-plank.h*0.5,plank.w,plank.h*0.45);
     ctx.strokeStyle='rgba(38,20,6,0.30)';ctx.lineWidth=0.6;
     for(let i=0;i<3;i++){const gy=-plank.h*0.3+i*plank.h*0.28;ctx.beginPath();ctx.moveTo(-plank.w*0.5+4,gy);ctx.lineTo(plank.w*0.5-4,gy+Math.sin(i*1.4)*plank.h*0.08);ctx.stroke();}
     ctx.fillStyle='rgba(55,50,45,0.8)';
     [-0.42,0.40].forEach(nx=>{ctx.beginPath();ctx.arc(plank.w*nx,0,1.5,0,Math.PI*2);ctx.fill();});
     ctx.restore();
    }

    /* ── Éclairs ── */
    let lightning={active:false,timer:80,pts:[]};
    function makePts(){
     const pts=[];let x=cx+(Math.random()-0.5)*W*0.3,y=0;
     while(y<H*0.5){pts.push({x,y});y+=Math.random()*25+10;x+=(Math.random()-0.5)*30;}
     return pts;
    }

    function frame(){
     if(stop.v)return;

     /* ── Ciel nuit pluvieux ── */
     const sky=ctx.createLinearGradient(0,0,0,H*0.62);
     sky.addColorStop(0,'#010408');
     sky.addColorStop(0.45,'#020810');
     sky.addColorStop(0.80,'#030d1c');
     sky.addColorStop(1,'#040f20');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

     /* Halo orangé ville en haut (pollution lumineuse Séoul) */
     const cityAmbient=ctx.createRadialGradient(cx,0,0,cx,0,W*0.80);
     cityAmbient.addColorStop(0,'rgba(80,45,10,0.28)');
     cityAmbient.addColorStop(0.5,'rgba(50,28,6,0.12)');
     cityAmbient.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cityAmbient;ctx.fillRect(0,0,W,H*0.50);

     waterLevel=Math.max(waterY, waterLevel-0.35);

     /* ── Skyline ── */
     const skylineY=waterLevel; // la skyline pose ses pieds sur l'eau
     for(const [bx,bw,bh] of bldgs){
      const by=skylineY-bh;
      /* Corps */
      const bg2=ctx.createLinearGradient(bx,by,bx,skylineY);
      bg2.addColorStop(0,'rgba(18,22,32,0.95)');
      bg2.addColorStop(0.5,'rgba(12,16,24,0.97)');
      bg2.addColorStop(1,'rgba(8,10,18,0.99)');
      ctx.fillStyle=bg2;ctx.fillRect(bx,by,bw,bh);
      /* Antenne sur les grandes tours */
      if(bh>H*0.22){
       ctx.strokeStyle='rgba(30,35,50,0.90)';ctx.lineWidth=1.5;
       ctx.beginPath();ctx.moveTo(bx+bw*0.50,by);ctx.lineTo(bx+bw*0.50,by-H*0.025);ctx.stroke();
       /* Voyant rouge clignotant */
       const blinkOp=0.5+0.5*Math.sin(t*2.2);
       ctx.fillStyle=`rgba(255,50,50,${blinkOp*0.85})`;
       ctx.beginPath();ctx.arc(bx+bw*0.50,by-H*0.027,1.8,0,Math.PI*2);ctx.fill();
      }
     }
     /* Lueurs de fenêtres */
     for(const w of wins){
      w.ph+=w.freq;
      const wop=w.op*(0.4+0.6*Math.sin(w.ph));
      if(wop<0.01)continue;
      ctx.fillStyle=w.warm?`rgba(255,210,120,${wop})`:`rgba(160,200,255,${wop})`;
      ctx.fillRect(w.x,w.y,2.5,2.0);
     }
     /* Reflet skyline dans l'eau — lignes verticales floues */
     ctx.save();ctx.globalAlpha=0.25;
     for(const [bx,bw,bh] of bldgs){
      const rf=ctx.createLinearGradient(bx,waterLevel,bx,waterLevel+bh*0.45);
      rf.addColorStop(0,'rgba(18,22,32,0.70)');rf.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rf;ctx.fillRect(bx,waterLevel,bw,bh*0.45);
     }
     ctx.restore();

     /* ── Eau ── */
     const wg=ctx.createLinearGradient(0,waterLevel,0,H);
     wg.addColorStop(0,'rgba(14,42,72,0.80)');
     wg.addColorStop(0.35,'rgba(10,30,55,0.88)');
     wg.addColorStop(1,'rgba(5,15,30,0.95)');
     ctx.fillStyle=wg;ctx.fillRect(0,waterLevel,W,H-waterLevel);

     /* Surface ondulée */
     ctx.strokeStyle='rgba(50,110,200,0.40)';ctx.lineWidth=1.6;
     ctx.beginPath();
     for(let x=0;x<=W;x+=4){
      const y=waterLevel+Math.sin(x*0.038+t*1.4)*3.5+Math.sin(x*0.078-t*0.9)*2;
      x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
     }
     ctx.stroke();

     /* ── Planche ── */
     plank.bobPh+=0.022;
     plank.angle=Math.sin(plank.bobPh*0.7)*0.045+Math.sin(plank.bobPh*1.3)*0.018;
     plank.x+=plank.vx;if(plank.x>W+plank.w)plank.x=-plank.w;
     drawPlank(waterLevel);

     /* ── Pluie ── */
     for(const d of rain){
      d.y+=d.spd;d.x+=d.vx;
      if(d.y>waterLevel||d.x<-10){d.y=-d.len;d.x=Math.random()*W+20;}
      ctx.strokeStyle=`rgba(130,170,220,${d.op})`;ctx.lineWidth=0.7;
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+d.vx*d.len/d.spd,d.y+d.len);ctx.stroke();
     }

     /* ── Éclairs ── */
     lightning.timer--;
     if(lightning.timer<=0&&!lightning.active){lightning.active=true;lightning.pts=makePts();lightning.timer=Math.random()*6+3;}
     if(lightning.active){
      lightning.timer--;
      ctx.fillStyle='rgba(190,215,255,0.09)';ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(220,235,255,0.92)';ctx.lineWidth=2.0;
      ctx.beginPath();lightning.pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));ctx.stroke();
      ctx.strokeStyle='rgba(150,190,255,0.28)';ctx.lineWidth=7;
      ctx.beginPath();lightning.pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));ctx.stroke();
      if(lightning.timer<=0){lightning.active=false;lightning.timer=Math.random()*150+80;}
     }

     /* ── Vignette ── */
     const vg=ctx.createRadialGradient(cx,H*0.46,H*0.06,cx,H*0.46,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.72,'rgba(0,0,0,0.38)');
     vg.addColorStop(1,'rgba(0,2,6,0.80)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
