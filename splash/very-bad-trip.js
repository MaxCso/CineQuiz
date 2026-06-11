// CinéQuiz splash chunk — Very Bad Trip
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Very Bad Trip"]={
   name:'Very Bad Trip',
   color:'200,140,40',
   ref:'The Hangover \u2014 Todd Phillips, 2009',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_vbt_s');
    if(!_s){_s=document.createElement('style');_s.id='_vbt_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:23%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:rgba(255,230,170,0.92)!important;text-shadow:0 1px 10px rgba(0,0,0,0.90)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Confettis + cartes à jouer + billets ── */
    const debris=Array.from({length:100},(_,i)=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.40, vy:Math.random()*0.20+0.05,
     rot:Math.random()*Math.PI*2, rotSpd:(Math.random()-0.5)*0.045,
     type: i<55?'confetti': i<75?'card':'bill',
     w:i<55?W*(0.009+Math.random()*0.014):W*(0.045+Math.random()*0.018),
     h:i<55?H*(0.003+Math.random()*0.005):H*(0.032+Math.random()*0.012),
     col:['255,50,50','255,200,0','60,160,255','255,80,180','0,220,120','255,140,0'][Math.floor(Math.random()*6)],
     suit:['♠','♥','♦','♣'][Math.floor(Math.random()*4)],
     val:['A','K','Q','J','10'][Math.floor(Math.random()*5)],
     op:0.50+Math.random()*0.38,
    }));

    /* ── Néons Vegas — depuis la fenêtre ── */
    const neons=[
     {col:'255,20,90',  ph:0.0, spd:0.022, blink:true},
     {col:'255,170,0',  ph:2.1, spd:0.016, blink:false},
     {col:'0,170,255',  ph:1.0, spd:0.028, blink:true},
     {col:'180,0,255',  ph:3.0, spd:0.018, blink:true},
    ];

    /* ── Chips de casino au sol ── */
    const chips=Array.from({length:12},(_,i)=>({
     x:W*(0.08+Math.random()*0.84),
     y:H*(0.80+Math.random()*0.12),
     r:W*(0.012+Math.random()*0.010),
     col:['200,30,30','40,140,40','40,40,200','180,130,20','80,0,120'][i%5],
     tilt:(Math.random()-0.5)*0.6,
    }));

    /* ── Bouteilles renversées au sol ── */
    const bottles=Array.from({length:6},(_,i)=>({
     x:W*(0.08+i*0.156),
     y:H*0.865,
     tilt:((i*37+13)%20-10)/10*1.2 + (i%2===0?Math.PI*0.5:0),
     broken:i===2||i===4,
     h:H*(0.058+((i*19)%8)/100*0.022),
    }));

    /* ── Bulles champagne ── */
    const bubbles=Array.from({length:22},(_,i)=>({
     x:W*(0.30+((i*41)%60)/100*0.40),
     y:H*(0.70+Math.random()*0.10),
     r:W*(0.003+Math.random()*0.005),
     vy:-(0.20+Math.random()*0.25),
     op:0.18+Math.random()*0.22,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Traces de pattes du tigre ── */
    const pawPrints=Array.from({length:8},(_,i)=>({
     x:W*(0.18+i*0.095+Math.sin(i*1.3)*0.04),
     y:H*(0.78+Math.sin(i*0.8)*0.04),
     rot:Math.sin(i*0.9)*0.4,
     op:0.12+Math.random()*0.14,
    }));

    /* ── Strobe Vegas depuis la fenêtre ── */
    let strobeCol='255,40,100', strobeAlpha=0, strobeTimer=0;

    /* ── Dessin d'une trace de patte ── */
    function drawPaw(px,py,rot,op){
     ctx.save();ctx.translate(px,py);ctx.rotate(rot);ctx.globalAlpha=op;
     const r=W*0.014;
     ctx.fillStyle='rgba(60,30,10,1)';
     ctx.beginPath();ctx.ellipse(0,0,r,r*0.85,0,0,Math.PI*2);ctx.fill();
     const pads=[[0,-r*1.5,r*0.52],[- r*1.2,-r*1.0,r*0.42],[r*1.2,-r*1.0,r*0.42],[r*0,-r*2.1,r*0.38],[-r*1.5,-r*1.6,r*0.35],[r*1.5,-r*1.6,r*0.35]];
     for(const[dx,dy,pr]of pads){ctx.beginPath();ctx.arc(dx,dy,pr,0,Math.PI*2);ctx.fill();}
     ctx.restore();
    }

    /* ── Dessin d'une carte à jouer ── */
    function drawCard(d){
     const isRed=d.suit==='♥'||d.suit==='♦';
     ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.rot);
     ctx.fillStyle=`rgba(248,244,238,${d.op})`;
     ctx.beginPath();ctx.roundRect(-d.w/2,-d.h/2,d.w,d.h,W*0.004);ctx.fill();
     ctx.strokeStyle=`rgba(160,150,140,${d.op*0.4})`;ctx.lineWidth=0.5;ctx.stroke();
     ctx.fillStyle=isRed?`rgba(190,15,15,${d.op})`:`rgba(10,10,18,${d.op})`;
     ctx.font=`bold ${d.w*0.32}px serif`;ctx.textAlign='left';ctx.textBaseline='top';
     ctx.fillText(d.val,-d.w*0.42,-d.h*0.44);
     ctx.font=`${d.w*0.28}px serif`;
     ctx.fillText(d.suit,-d.w*0.40,-d.h*0.20);
     ctx.font=`bold ${d.w*0.55}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText(d.suit,0,0);
     ctx.restore();
    }

    /* ── Dessin d'un billet ── */
    function drawBill(d){
     ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.rot);
     ctx.fillStyle=`rgba(48,88,48,${d.op})`;
     ctx.beginPath();ctx.roundRect(-d.w/2,-d.h/2,d.w,d.h,W*0.003);ctx.fill();
     ctx.strokeStyle=`rgba(60,100,60,${d.op*0.55})`;ctx.lineWidth=0.6;
     ctx.strokeRect(-d.w*0.45,-d.h*0.40,d.w*0.90,d.h*0.80);
     ctx.fillStyle=`rgba(170,210,160,${d.op*0.75})`;
     ctx.font=`bold ${d.h*0.48}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText('$',0,0);
     ctx.restore();
    }

    /* ── Tigre — plus grand, plus détaillé, animation respiration ── */
    function drawTiger(){
     const breathe=Math.sin(t*0.6)*0.008;
     const tx=cx-W*0.02, ty=H*0.78;
     const bw=W*(0.22+breathe), bh=H*(0.068+breathe*0.5);

     /* Ombre portée sous le tigre */
     const shadowG=ctx.createRadialGradient(tx,ty+H*0.010,0,tx,ty+H*0.010,bw*1.2);
     shadowG.addColorStop(0,'rgba(0,0,0,0.45)');shadowG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shadowG;ctx.beginPath();ctx.ellipse(tx,ty+H*0.012,bw*1.1,H*0.025,0,0,Math.PI*2);ctx.fill();

     /* Corps */
     const bodyG=ctx.createRadialGradient(tx-bw*0.10,ty-bh*0.20,bw*0.05,tx,ty,bw);
     bodyG.addColorStop(0,'rgba(190,105,18,0.92)');
     bodyG.addColorStop(0.55,'rgba(160,82,10,0.90)');
     bodyG.addColorStop(1,'rgba(120,55,6,0.85)');
     ctx.fillStyle=bodyG;
     ctx.beginPath();ctx.ellipse(tx,ty,bw,bh,0,0,Math.PI*2);ctx.fill();

     /* Queue qui se balance */
     const tailSwing=Math.sin(t*0.55)*0.35;
     ctx.strokeStyle='rgba(155,78,10,0.82)';ctx.lineWidth=W*0.016;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(tx-bw*0.85,ty);
     ctx.bezierCurveTo(
      tx-bw*1.2,ty-H*0.04,
      tx-bw*1.45+tailSwing*W*0.08,ty-H*0.10+tailSwing*H*0.04,
      tx-bw*1.55+tailSwing*W*0.12,ty-H*0.14+tailSwing*H*0.06
     );
     ctx.stroke();
     /* Bout de queue */
     ctx.fillStyle='rgba(80,38,4,0.80)';
     ctx.beginPath();ctx.arc(tx-bw*1.55+tailSwing*W*0.12,ty-H*0.14+tailSwing*H*0.06,W*0.018,0,Math.PI*2);ctx.fill();

     /* Rayures sur le corps */
     ctx.strokeStyle='rgba(90,40,4,0.45)';ctx.lineWidth=W*0.010;ctx.lineCap='round';
     for(let si=0;si<6;si++){
      const sx=tx-bw*0.65+si*bw*0.26;
      ctx.beginPath();
      ctx.moveTo(sx,ty-bh*0.90);
      ctx.bezierCurveTo(sx-W*0.008,ty,sx+W*0.006,ty+bh*0.30,sx,ty+bh*0.95);
      ctx.stroke();
     }

     /* Tête */
     const hx=tx+bw*0.78, hy=ty-bh*0.55;
     const headG=ctx.createRadialGradient(hx-W*0.02,hy-H*0.018,W*0.005,hx,hy,W*0.075);
     headG.addColorStop(0,'rgba(200,115,22,0.95)');
     headG.addColorStop(0.6,'rgba(168,88,12,0.92)');
     headG.addColorStop(1,'rgba(130,60,6,0.88)');
     ctx.fillStyle=headG;
     ctx.beginPath();ctx.ellipse(hx,hy,W*0.072,H*0.055,0.18,0,Math.PI*2);ctx.fill();

     /* Oreilles */
     for(const side of[-1,1]){
      ctx.fillStyle='rgba(175,90,15,0.90)';
      ctx.beginPath();ctx.ellipse(hx+side*W*0.038,hy-H*0.042,W*0.018,H*0.020,side*0.35,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(220,140,80,0.60)';
      ctx.beginPath();ctx.ellipse(hx+side*W*0.036,hy-H*0.040,W*0.010,H*0.012,side*0.35,0,Math.PI*2);ctx.fill();
     }

     /* Rayures tête */
     ctx.strokeStyle='rgba(85,38,4,0.38)';ctx.lineWidth=W*0.007;
     for(let si=0;si<3;si++){
      const sx=hx-W*0.040+si*W*0.040;
      ctx.beginPath();ctx.moveTo(sx,hy-H*0.048);ctx.lineTo(sx-W*0.004,hy+H*0.022);ctx.stroke();
     }

     /* Zone museau claire */
     ctx.fillStyle='rgba(225,165,95,0.75)';
     ctx.beginPath();ctx.ellipse(hx+W*0.028,hy+H*0.008,W*0.028,H*0.020,0,0,Math.PI*2);ctx.fill();

     /* Nez */
     ctx.fillStyle='rgba(60,20,8,0.85)';
     ctx.beginPath();ctx.ellipse(hx+W*0.038,hy-H*0.002,W*0.010,H*0.007,0,0,Math.PI*2);ctx.fill();

     /* Moustaches */
     ctx.strokeStyle='rgba(245,240,215,0.55)';ctx.lineWidth=0.8;ctx.lineCap='round';
     for(let mi=0;mi<3;mi++){
      const my=hy+H*0.004+mi*H*0.006;
      ctx.beginPath();ctx.moveTo(hx+W*0.040,my);ctx.lineTo(hx+W*0.090,my-H*0.002+mi*H*0.003);ctx.stroke();
      ctx.beginPath();ctx.moveTo(hx+W*0.040,my);ctx.lineTo(hx-W*0.010,my-H*0.002+mi*H*0.003);ctx.stroke();
     }

     /* Yeux brillants */
     const eyeBreath=Math.sin(t*1.2)*0.5+0.5;
     for(const side of[-1,1]){
      const ex=hx+side*W*0.028, ey=hy-H*0.015;
      /* Halo lueur œil */
      const eyeG=ctx.createRadialGradient(ex,ey,0,ex,ey,W*0.028);
      eyeG.addColorStop(0,`rgba(255,210,20,${0.22+eyeBreath*0.12})`);
      eyeG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eyeG;ctx.fillRect(ex-W*0.028,ey-W*0.028,W*0.056,W*0.056);
      /* Iris */
      ctx.fillStyle=`rgba(220,185,15,${0.92+eyeBreath*0.06})`;
      ctx.beginPath();ctx.ellipse(ex,ey,W*0.012,H*0.009,0,0,Math.PI*2);ctx.fill();
      /* Pupille */
      ctx.fillStyle='rgba(5,2,0,0.97)';
      ctx.beginPath();ctx.ellipse(ex,ey,W*0.004,H*0.008,0,0,Math.PI*2);ctx.fill();
      /* Reflet */
      ctx.fillStyle='rgba(255,255,255,0.80)';
      ctx.beginPath();ctx.arc(ex-W*0.003,ey-H*0.003,W*0.0025,0,Math.PI*2);ctx.fill();
     }
    }

    function frame(){
     if(stop.v)return;

     /* ── FOND — chambre Vegas saccagée — nuit ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#0a0500');
     bg.addColorStop(0.22,'#130800');
     bg.addColorStop(0.50,'#1c0c00');
     bg.addColorStop(0.78,'#120700');
     bg.addColorStop(1,'#080400');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── Fenêtre Vegas en arrière-plan ── */
     const winX=cx-W*0.28, winY=H*0.22, winW=W*0.56, winH=H*0.30;
     /* Lueur externe de la ville */
     const cityG=ctx.createRadialGradient(cx,winY+winH*0.5,0,cx,winY+winH*0.5,W*0.55);
     cityG.addColorStop(0,`rgba(255,140,10,${0.35+Math.sin(t*0.12)*0.06})`);
     cityG.addColorStop(0.35,'rgba(200,80,5,0.12)');
     cityG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cityG;ctx.fillRect(0,0,W,H*0.75);
     /* Fenêtre */
     const winG=ctx.createLinearGradient(0,winY,0,winY+winH);
     winG.addColorStop(0,'rgba(255,160,20,0.55)');
     winG.addColorStop(0.5,`rgba(255,120,10,${0.40+Math.sin(t*0.10)*0.08})`);
     winG.addColorStop(1,'rgba(180,60,5,0.45)');
     ctx.fillStyle=winG;
     ctx.beginPath();ctx.roundRect(winX,winY,winW,winH,W*0.012);ctx.fill();
     /* Cadre fenêtre */
     ctx.strokeStyle='rgba(40,25,10,0.85)';ctx.lineWidth=W*0.012;
     ctx.strokeRect(winX,winY,winW,winH);
     /* Croisillons */
     ctx.strokeStyle='rgba(30,18,6,0.70)';ctx.lineWidth=W*0.006;
     ctx.beginPath();ctx.moveTo(cx,winY);ctx.lineTo(cx,winY+winH);ctx.stroke();
     ctx.beginPath();ctx.moveTo(winX,winY+winH*0.5);ctx.lineTo(winX+winW,winY+winH*0.5);ctx.stroke();
     /* Skyline Vegas dans la fenêtre */
     ctx.fillStyle='rgba(10,5,0,0.65)';
     ctx.beginPath();ctx.moveTo(winX,winY+winH);
     for(let xi=0;xi<=winW;xi+=winW*0.05){
      const ht=winH*(0.15+Math.abs(Math.sin(xi*0.08+3.2))*0.28+Math.abs(Math.sin(xi*0.14+1.1))*0.18);
      ctx.lineTo(winX+xi,winY+winH-ht);
     }
     ctx.lineTo(winX+winW,winY+winH);ctx.closePath();ctx.fill();

     /* ── Strobe néons depuis la fenêtre ── */
     strobeTimer+=0.016;
     for(const n of neons){
      n.ph+=n.spd;
      const flk=n.blink?0.30+0.70*Math.pow(Math.abs(Math.sin(n.ph*3.5)),2.2):0.55+0.45*Math.abs(Math.sin(n.ph));
      if(flk<0.08)continue;
      const ng=ctx.createRadialGradient(cx,winY+winH*0.4,0,cx,winY+winH*0.4,W*0.55);
      ng.addColorStop(0,`rgba(${n.col},${0.08*flk})`);
      ng.addColorStop(0.4,`rgba(${n.col},${0.04*flk})`);
      ng.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ng;ctx.fillRect(0,0,W,H*0.80);
     }

     /* ── Rideaux ── */
     const curtW=W*0.15;
     for(const side of[-1,1]){
      const cx2=side>0?W-curtW*0.5:curtW*0.5;
      const curtG=ctx.createLinearGradient(cx2-curtW*0.5,0,cx2+curtW*0.5,0);
      curtG.addColorStop(0,'rgba(25,10,2,0.97)');
      curtG.addColorStop(0.4,'rgba(35,15,3,0.88)');
      curtG.addColorStop(0.7,'rgba(28,12,2,0.92)');
      curtG.addColorStop(1,'rgba(20,8,1,0.97)');
      ctx.fillStyle=curtG;ctx.fillRect(cx2-curtW*0.5,0,curtW,H);
      /* Plis */
      ctx.strokeStyle='rgba(15,6,1,0.55)';ctx.lineWidth=W*0.004;
      for(let pi=1;pi<4;pi++){
       const px=cx2-curtW*0.5+curtW*(pi/4);
       ctx.beginPath();ctx.moveTo(px,0);
       ctx.bezierCurveTo(px+W*0.010,H*0.25,px-W*0.008,H*0.50,px+W*0.006,H);
       ctx.stroke();
      }
     }

     /* ── Sol endommagé ── */
     const floorG=ctx.createLinearGradient(0,H*0.82,0,H);
     floorG.addColorStop(0,'rgba(18,8,2,0.98)');
     floorG.addColorStop(1,'rgba(8,3,0,1.0)');
     ctx.fillStyle=floorG;ctx.fillRect(0,H*0.82,W,H*0.18);

     /* ── Traces de pattes ── */
     for(const p of pawPrints)drawPaw(p.x,p.y,p.rot,p.op*(0.7+Math.sin(t*0.1)*0.3));

     /* ── Bouteilles renversées ── */
     for(const b of bottles){
      ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.tilt);
      if(b.broken){
       ctx.strokeStyle='rgba(40,110,30,0.55)';ctx.lineWidth=W*0.007;
       ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-W*0.015,-b.h*0.4);ctx.stroke();
       ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W*0.012,-b.h*0.3);ctx.stroke();
      } else {
       ctx.fillStyle='rgba(30,85,22,0.82)';
       ctx.beginPath();ctx.roundRect(-W*0.011,-b.h,W*0.022,b.h,W*0.006);ctx.fill();
       ctx.fillStyle='rgba(55,115,28,0.52)';
       ctx.beginPath();ctx.roundRect(-W*0.008,-b.h*0.85,W*0.016,b.h*0.65,W*0.004);ctx.fill();
       ctx.fillStyle='rgba(220,200,140,0.48)';
       ctx.fillRect(-W*0.008,-b.h*0.52,W*0.016,b.h*0.22);
      }
      ctx.restore();
     }

     /* ── Chips de casino ── */
     for(const c of chips){
      ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.tilt);
      ctx.fillStyle=`rgba(${c.col},0.82)`;
      ctx.beginPath();ctx.ellipse(0,0,c.r,c.r*0.28,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=c.r*0.18;
      ctx.beginPath();ctx.ellipse(0,0,c.r*0.75,c.r*0.21,0,0,Math.PI*2);ctx.stroke();
      ctx.restore();
     }

     /* ── Bulles champagne ── */
     for(const b of bubbles){
      b.y+=b.vy;b.ph+=0.028;
      if(b.y<H*0.45){b.y=H*(0.75+Math.random()*0.08);b.op=0.15+Math.random()*0.20;}
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(230,210,150,${b.op*(0.5+0.5*Math.sin(b.ph))})`;
      ctx.lineWidth=0.7;ctx.stroke();
     }

     /* ── Confettis / cartes / billets ── */
     for(const d of debris){
      d.x+=d.vx;d.y+=d.vy;d.rot+=d.rotSpd;
      if(d.y>H+20){d.y=-20;d.x=Math.random()*W;}
      if(d.type==='confetti'){
       ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.rot);
       ctx.fillStyle=`rgba(${d.col},${d.op})`;
       ctx.fillRect(-d.w/2,-d.h/2,d.w,d.h);
       ctx.restore();
      } else if(d.type==='card'){
       drawCard(d);
      } else {
       drawBill(d);
      }
     }

     /* Reflet lumière sur le sol */
     const floorRefl=ctx.createRadialGradient(cx,H*0.85,0,cx,H*0.85,W*0.55);
     floorRefl.addColorStop(0,`rgba(255,120,8,${0.06+Math.sin(t*0.22)*0.02})`);
     floorRefl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=floorRefl;ctx.fillRect(0,H*0.78,W,H*0.22);

     /* ── Tigre ── */
     drawTiger();

     /* ── Vignette ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.06,cx,H*0.48,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(0,0,0,0.06)');
     vg.addColorStop(0.68,'rgba(0,0,0,0.45)');
     vg.addColorStop(1,'rgba(0,0,0,0.94)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
