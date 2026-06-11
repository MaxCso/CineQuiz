// CinéQuiz splash chunk — Alice au Pays des Merveilles
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Alice au Pays des Merveilles"]={
   name:'Alice au Pays des Merveilles',
   color:'180,60,180',
   ref:"Alice au Pays des Merveilles \u2014 Tim Burton, 2010",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.82';
    let t=0;
    const cx=W/2;

    /* Cartes volantes */
    const cards=Array.from({length:14},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*1.4, vy:(Math.random()-0.5)*1.2,
     rot:Math.random()*Math.PI*2, rotSpd:Math.random()*0.04-0.02,
     suit:['♠','♥','♦','♣'][Math.floor(Math.random()*4)]
    }));

    /* Champignons */
    const mushrooms=[
     {x:W*0.08,y:H*0.78,r:W*0.06},{x:W*0.20,y:H*0.82,r:W*0.04},{x:W*0.82,y:H*0.76,r:W*0.07},{x:W*0.93,y:H*0.80,r:W*0.045}
    ];

    /* Papillons / particules magiques */
    const butterflies=Array.from({length:18},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.8, vy:(Math.random()-0.5)*0.6,
     phase:Math.random()*Math.PI*2, hue:Math.random()*360
    }));

    /* ── Lapin blanc — traverse l'herbe de gauche à droite ── */
    const rabbit = {
      x: -W*0.12,
      spd: W*0.0030,
      jumpT: 0,
      jumpSpd: 0.14,
    };

    function frame(){
     if(stop.v)return;
     /* Fond monde fantastique — violet/bleu */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'rgba(18,6,28,0.22)'); bg.addColorStop(0.4,'rgba(10,5,22,0.18)'); bg.addColorStop(1,'rgba(8,14,8,0.20)');
     ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

     /* Lune souriante — style Carroll */
     const moonX=W*0.78, moonY=H*0.12;
     const moonG=ctx.createRadialGradient(moonX,moonY,4,moonX,moonY,W*0.10);
     moonG.addColorStop(0,'rgba(255,240,180,0.92)'); moonG.addColorStop(0.6,'rgba(200,175,90,0.30)'); moonG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonG; ctx.beginPath(); ctx.arc(moonX,moonY,W*0.075,0,Math.PI*2); ctx.fill();
     /* Sourire lune */
     ctx.strokeStyle='rgba(150,110,40,0.55)'; ctx.lineWidth=2; ctx.lineCap='round';
     ctx.beginPath(); ctx.arc(moonX+W*0.005,moonY+W*0.012,W*0.025,0.2,Math.PI-0.2); ctx.stroke();
     for(const ex3 of [-W*0.022,W*0.022]){
      ctx.fillStyle='rgba(100,75,20,0.60)'; ctx.beginPath(); ctx.arc(moonX+ex3,moonY-W*0.010,W*0.008,0,Math.PI*2); ctx.fill();
     }

     /* Sol gazon bizarre — vert vif */
     const ground=ctx.createLinearGradient(0,H*0.74,0,H);
     ground.addColorStop(0,'rgba(35,90,30,0.94)'); ground.addColorStop(0.5,'rgba(22,65,18,0.96)'); ground.addColorStop(1,'rgba(12,40,8,0.98)');
     ctx.fillStyle=ground; ctx.fillRect(0,H*0.74,W,H*0.26);
     /* Herbe ondulée */
     ctx.fillStyle='rgba(45,110,35,0.90)';
     ctx.beginPath(); ctx.moveTo(0,H*0.74);
     for(let x=0;x<=W;x+=4) ctx.lineTo(x,H*0.74-Math.sin(x*0.030+t*0.5)*5-Math.sin(x*0.055)*3);
     ctx.lineTo(W,H*0.74); ctx.lineTo(0,H*0.74); ctx.closePath(); ctx.fill();

     /* Champignons */
     for(const m of mushrooms){
      /* Pied */
      ctx.fillStyle='rgba(220,200,170,0.88)';
      ctx.beginPath(); ctx.roundRect(m.x-m.r*0.22,H*0.74-m.r*0.8,m.r*0.44,m.r*0.85,3); ctx.fill();
      /* Chapeau rouge à pois */
      const capG=ctx.createRadialGradient(m.x-m.r*0.15,H*0.74-m.r*0.92,2,m.x,H*0.74-m.r*0.88,m.r);
      capG.addColorStop(0,'rgba(220,60,40,0.95)'); capG.addColorStop(0.6,'rgba(180,30,15,0.92)'); capG.addColorStop(1,'rgba(140,20,8,0.88)');
      ctx.fillStyle=capG; ctx.beginPath(); ctx.arc(m.x,H*0.74-m.r*0.85,m.r,Math.PI,0); ctx.closePath(); ctx.fill();
      /* Pois blancs */
      ctx.fillStyle='rgba(255,255,255,0.80)';
      for(const [px,py] of [[0,-0.55],[0.42,-0.30],[-0.42,-0.30],[0.22,-0.72],[-0.22,-0.72]]){
       ctx.beginPath(); ctx.arc(m.x+px*m.r,H*0.74-m.r*0.85+py*m.r,m.r*0.12,0,Math.PI*2); ctx.fill();
      }
     }

     /* Papillons */
     for(const b of butterflies){
      b.x+=b.vx; b.y+=b.vy; b.phase+=0.08;
      if(b.x<0)b.x=W; if(b.x>W)b.x=0; if(b.y<0)b.y=H*0.05; if(b.y>H*0.72)b.y=H*0.05;
      const wingFlap=Math.abs(Math.cos(b.phase))*0.85+0.15;
      ctx.save(); ctx.translate(b.x,b.y);
      ctx.fillStyle=`hsla(${b.hue+t*20},75%,62%,0.55)`;
      ctx.beginPath(); ctx.ellipse(-5*wingFlap,0,5*wingFlap,4,0.4,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(5*wingFlap,0,5*wingFlap,4,-0.4,0,Math.PI*2); ctx.fill();
      ctx.restore();
     }

     /* Cartes volantes */
     for(const c of cards){
      c.x+=c.vx; c.y+=c.vy; c.rot+=c.rotSpd;
      if(c.x<-30)c.x=W+30; if(c.x>W+30)c.x=-30;
      if(c.y<-30)c.y=H+30; if(c.y>H+30)c.y=-30;
      ctx.save(); ctx.translate(c.x,c.y); ctx.rotate(c.rot);
      ctx.fillStyle='rgba(245,240,230,0.80)'; ctx.strokeStyle='rgba(180,160,130,0.55)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.roundRect(-12,-17,24,34,3); ctx.fill(); ctx.stroke();
      ctx.fillStyle=c.suit==='♥'||c.suit==='♦'?'rgba(180,30,30,0.85)':'rgba(20,20,30,0.85)';
      ctx.font=`bold ${14}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(c.suit,0,0);
      ctx.restore();
     }

     /* Chapelier fou — silhouette avec grand chapeau */
     const hx=cx, hy=H*0.70;
     ctx.fillStyle='rgba(12,6,18,0.96)';
     ctx.beginPath(); ctx.roundRect(hx-W*0.040,hy-H*0.24,W*0.080,H*0.24,4); ctx.fill();
     ctx.beginPath(); ctx.arc(hx,hy-H*0.245,W*0.036,0,Math.PI*2); ctx.fill();
     /* Grand chapeau haut-de-forme */
     ctx.beginPath(); ctx.ellipse(hx,hy-H*0.278,W*0.060,W*0.014,0,0,Math.PI*2); ctx.fill();
     ctx.beginPath(); ctx.roundRect(hx-W*0.035,hy-H*0.42,W*0.070,H*0.145,3); ctx.fill();
     /* Bande du chapeau */
     ctx.fillStyle='rgba(220,30,30,0.80)';
     ctx.beginPath(); ctx.roundRect(hx-W*0.035,hy-H*0.310,W*0.070,H*0.020,0); ctx.fill();


     /* ── Lapin blanc ── */
     rabbit.x += rabbit.spd;
     rabbit.jumpT += rabbit.jumpSpd;
     if(rabbit.x > W + W*0.12) rabbit.x = -W*0.12;

     const rGroundY = H*0.742;
     const rSz = W*0.048;
     const jumpAmp = rSz*1.1;
     const jump = Math.max(0, -Math.sin(rabbit.jumpT)) * jumpAmp;

     ctx.save();
     ctx.translate(rabbit.x, rGroundY - jump);

     /* Corps */
     const bodyGr = ctx.createRadialGradient(-rSz*0.05,-rSz*0.10,rSz*0.05,0,0,rSz*0.72);
     bodyGr.addColorStop(0,'rgba(255,255,252,0.97)');bodyGr.addColorStop(0.6,'rgba(235,232,225,0.95)');bodyGr.addColorStop(1,'rgba(210,208,200,0.90)');
     ctx.fillStyle=bodyGr;ctx.beginPath();ctx.ellipse(0,0,rSz*0.60,rSz*0.48,0,0,Math.PI*2);ctx.fill();

     /* Tête */
     const headGr = ctx.createRadialGradient(-rSz*0.05,-rSz*0.05,rSz*0.04,0,0,rSz*0.36);
     headGr.addColorStop(0,'rgba(255,255,253,0.97)');headGr.addColorStop(1,'rgba(225,222,215,0.92)');
     ctx.fillStyle=headGr;ctx.beginPath();ctx.arc(rSz*0.52,-rSz*0.22,rSz*0.30,0,Math.PI*2);ctx.fill();

     /* Oreille arrière */
     ctx.fillStyle='rgba(240,235,228,0.92)';
     ctx.beginPath();ctx.ellipse(rSz*0.40,-rSz*0.72,rSz*0.10,rSz*0.38,0.15,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(240,160,160,0.65)';
     ctx.beginPath();ctx.ellipse(rSz*0.40,-rSz*0.72,rSz*0.055,rSz*0.22,0.15,0,Math.PI*2);ctx.fill();
     /* Oreille avant */
     ctx.fillStyle='rgba(248,245,240,0.95)';
     ctx.beginPath();ctx.ellipse(rSz*0.56,-rSz*0.70,rSz*0.09,rSz*0.36,-0.10,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(240,150,150,0.65)';
     ctx.beginPath();ctx.ellipse(rSz*0.56,-rSz*0.70,rSz*0.050,rSz*0.21,-0.10,0,Math.PI*2);ctx.fill();

     /* Œil rouge */
     ctx.fillStyle='rgba(200,30,30,0.90)';ctx.beginPath();ctx.arc(rSz*0.76,-rSz*0.28,rSz*0.065,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(5,2,2,0.85)';ctx.beginPath();ctx.arc(rSz*0.77,-rSz*0.29,rSz*0.030,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.80)';ctx.beginPath();ctx.arc(rSz*0.765,-rSz*0.305,rSz*0.012,0,Math.PI*2);ctx.fill();

     /* Nez */
     ctx.fillStyle='rgba(240,140,140,0.85)';ctx.beginPath();ctx.ellipse(rSz*0.84,-rSz*0.19,rSz*0.042,rSz*0.030,0,0,Math.PI*2);ctx.fill();

     /* Pattes */
     const legPh = Math.sin(rabbit.jumpT*2);
     ctx.strokeStyle='rgba(235,232,225,0.90)';ctx.lineWidth=rSz*0.14;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(rSz*0.35,rSz*0.38);ctx.lineTo(rSz*0.20+legPh*rSz*0.08,rSz*0.55+Math.max(0,-legPh)*rSz*0.10);ctx.stroke();
     ctx.beginPath();ctx.moveTo(rSz*0.55,rSz*0.38);ctx.lineTo(rSz*0.72-legPh*rSz*0.06,rSz*0.55+Math.max(0,legPh)*rSz*0.08);ctx.stroke();

     /* Queue */
     ctx.fillStyle='rgba(252,252,250,0.92)';ctx.beginPath();ctx.arc(-rSz*0.58,rSz*0.05,rSz*0.18,0,Math.PI*2);ctx.fill();

     /* Ombre */
     ctx.fillStyle='rgba(5,30,5,0.20)';
     ctx.beginPath();ctx.ellipse(0,rSz*0.50+jump*0.4,rSz*(0.85-jump/jumpAmp*0.35),rSz*0.08,0,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(0.5,'rgba(5,2,10,0.15)'); vg.addColorStop(1,'rgba(5,2,10,0.93)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
