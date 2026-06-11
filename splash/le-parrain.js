// CinéQuiz splash chunk — Le Parrain
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Parrain"]={
   name:'Le Parrain',
   color:'120,90,30',
   ref:'Le Parrain \u2014 Francis Ford Coppola, 1972',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2,cy=H/2;
    let _s=document.getElementById('_pg2_s');if(!_s){_s=document.createElement('style');_s.id='_pg2_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:50%!important;bottom:auto!important;transform:translateY(-50%)!important;}#splash-content-wrap.reveal{transform:translateY(-50%)!important;}#splash-film-logo{max-width:62%!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Pétales de rose ── */
    const petals=Array.from({length:22},(_,i)=>({
     x:Math.random()*W, y:i/22*H,
     vx:(Math.random()-0.5)*0.3, vy:0.25+Math.random()*0.4,
     rot:Math.random()*Math.PI*2, vrot:(Math.random()-0.5)*0.018,
     op:0.55+Math.random()*0.35,
     size:W*(0.022+Math.random()*0.018)
    }));

    /* ── Oranges qui tombent ── */
    const oranges=Array.from({length:7},(_,i)=>({
     x:Math.random()*W, y:-40-i*(H/7),
     vy:0.55+Math.random()*0.5,
     vx:(Math.random()-0.5)*0.25,
     r:W*(0.030+Math.random()*0.016),
     rot:Math.random()*Math.PI*2, vrot:(Math.random()-0.5)*0.012
    }));

    /* ── Fumée de cigare — monte doucement ── */
    const smoke=Array.from({length:14},()=>({
     x:cx+W*0.22+(Math.random()-0.5)*W*0.06,
     y:H*0.82+Math.random()*H*0.08,
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.20+Math.random()*0.25),
     r:W*(0.018+Math.random()*0.022),
     op:0.06+Math.random()*0.08,
     ph:Math.random()*Math.PI*2,
     phSpd:0.008+Math.random()*0.010,
    }));

    /* ── Poussière dorée — flotte lentement ── */
    const dust=Array.from({length:30},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vx:(Math.random()-0.5)*0.12,
     vy:-(0.04+Math.random()*0.08),
     r:Math.random()*1.2+0.3,
     op:0.04+Math.random()*0.10,
     ph:Math.random()*Math.PI*2,
     phSpd:0.012+Math.random()*0.018,
    }));

    function drawPetal(p){
     ctx.save();
     ctx.translate(p.x,p.y);ctx.rotate(p.rot);
     ctx.globalAlpha=p.op;
     const s=p.size;
     ctx.beginPath();ctx.ellipse(0,0,s*0.45,s*0.75,0,0,Math.PI*2);
     ctx.fillStyle=`rgba(${145+Math.random()*20|0},${18+Math.random()*10|0},${18+Math.random()*8|0},0.88)`;
     ctx.fill();
     ctx.beginPath();ctx.moveTo(0,s*0.55);ctx.lineTo(0,-s*0.55);
     ctx.strokeStyle='rgba(190,70,50,0.15)';ctx.lineWidth=0.7;ctx.stroke();
     ctx.restore();
    }

    function drawOrange(o){
     ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.rot);
     const r=o.r;
     const og=ctx.createRadialGradient(-r*0.28,-r*0.28,0,0,0,r);
     og.addColorStop(0,'rgba(255,185,30,1)');
     og.addColorStop(0.45,'rgba(240,130,20,1)');
     og.addColorStop(0.80,'rgba(210,90,10,1)');
     og.addColorStop(1,'rgba(170,60,5,1)');
     ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);
     ctx.fillStyle=og;ctx.fill();
     ctx.strokeStyle='rgba(180,70,0,0.18)';ctx.lineWidth=r*0.06;
     for(let a=0;a<6;a++){
      const aa=a/6*Math.PI*2;
      ctx.beginPath();ctx.arc(Math.cos(aa)*r*0.35,Math.sin(aa)*r*0.35,r*0.28,0,Math.PI*2);ctx.stroke();
     }
     ctx.beginPath();ctx.ellipse(-r*0.26,-r*0.28,r*0.20,r*0.12,-0.6,0,Math.PI*2);
     ctx.fillStyle='rgba(255,240,180,0.35)';ctx.fill();
     ctx.beginPath();ctx.moveTo(0,-r);ctx.lineTo(0,-r*1.22);
     ctx.strokeStyle='rgba(60,110,20,0.85)';ctx.lineWidth=r*0.12;ctx.stroke();
     ctx.beginPath();ctx.ellipse(r*0.08,-r*1.14,r*0.18,r*0.08,0.7,0,Math.PI*2);
     ctx.fillStyle='rgba(60,120,20,0.80)';ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond noir profond ── */
     ctx.fillStyle='rgba(4,3,2,0.18)';ctx.fillRect(0,0,W,H);

     /* ── Lueur ambiante dorée très subtile — bureau dans l'ombre ── */
     const ambientPulse=0.055+Math.sin(t*0.28)*0.018+Math.sin(t*0.45)*0.008;
     const ambient=ctx.createRadialGradient(cx,H*0.55,0,cx,H*0.55,W*0.85);
     ambient.addColorStop(0,`rgba(180,120,30,${ambientPulse})`);
     ambient.addColorStop(0.4,`rgba(120,70,15,${ambientPulse*0.45})`);
     ambient.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ambient;ctx.fillRect(0,0,W,H);

     /* ── Reflet chaud sur le bas — table en bois ── */
     const tableG=ctx.createLinearGradient(0,H*0.80,0,H);
     tableG.addColorStop(0,`rgba(60,35,10,${0.12+Math.sin(t*0.3)*0.02})`);
     tableG.addColorStop(1,'rgba(20,10,3,0.20)');
     ctx.fillStyle=tableG;ctx.fillRect(0,H*0.80,W,H*0.20);

     /* ── Poussière dorée ── */
     for(const d of dust){
      d.ph+=d.phSpd;d.x+=d.vx+Math.sin(d.ph)*0.08;d.y+=d.vy;
      if(d.y<-4){d.y=H+4;d.x=Math.random()*W;}
      const da=d.op*(0.5+0.5*Math.abs(Math.sin(d.ph)));
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,155,55,${da})`;ctx.fill();
     }

     /* ── Oranges ── */
     for(const o of oranges){
      o.x+=o.vx;o.y+=o.vy;o.rot+=o.vrot;
      if(o.y>H+o.r*2){o.y=-o.r*2;o.x=Math.random()*W;}
      drawOrange(o);
     }

     /* ── Pétales ── */
     for(const p of petals){
      p.x+=p.vx;p.y+=p.vy;p.rot+=p.vrot;
      if(p.y>H+p.size*2){p.y=-p.size*2;p.x=Math.random()*W;}
      drawPetal(p);
     }

     /* ── Fumée de cigare ── */
     for(const s of smoke){
      s.ph+=s.phSpd;s.x+=s.vx+Math.sin(s.ph*0.6)*0.22;s.y+=s.vy;
      s.r+=0.06;s.op-=0.0008;
      if(s.y<H*0.50||s.op<0.005||s.r>W*0.060){
       s.y=H*0.82+Math.random()*H*0.08;
       s.x=cx+W*0.22+(Math.random()-0.5)*W*0.06;
       s.r=W*(0.016+Math.random()*0.018);
       s.op=0.05+Math.random()*0.07;
      }
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(180,165,145,${s.op})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette ── */
     ctx.globalAlpha=1;
     const vg=ctx.createRadialGradient(cx,cy,H*0.10,cx,cy,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.10)');
     vg.addColorStop(0.75,'rgba(0,0,0,0.50)');
     vg.addColorStop(1,'rgba(0,0,0,0.90)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
