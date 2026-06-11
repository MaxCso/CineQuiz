// CinéQuiz splash chunk — Charlie et la Chocolaterie
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Charlie et la Chocolaterie"]={
   name:'Charlie et la Chocolaterie',
   color:'180,80,160',
   ref:'Charlie and the Chocolate Factory \u2014 Tim Burton, 2005',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_cc_s');
    if(!_s){_s=document.createElement('style');_s.id='_cc_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Confettis colorés */
    const confetti=Array.from({length:60},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vy:0.5+Math.random()*1.2,
     vx:(Math.random()-0.5)*0.6,
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.08,
     w:W*(0.012+Math.random()*0.018),
     h:H*(0.006+Math.random()*0.010),
     col:[`rgba(255,80,80,`,`rgba(80,200,80,`,`rgba(60,140,255,`,`rgba(255,220,40,`,`rgba(220,60,220,`,`rgba(255,150,30,`][Math.floor(Math.random()*6)],
    }));
    /* Gouttes de chocolat */
    const chocDrops=Array.from({length:18},()=>({
     x:Math.random()*W,y:-Math.random()*H*0.3,
     vy:1.2+Math.random()*1.5,r:W*(0.012+Math.random()*0.018),
     op:0.55+Math.random()*0.35,
    }));

    /* ── Oompa Loompas — 5 petites silhouettes qui dansent ── */
    const oompas=Array.from({length:5},(_,i)=>({
     x: W*(0.12+i*0.19),
     phase: i*Math.PI*0.4,   /* décalage de phase pour danser en canon */
     spd: 0.08+Math.random()*0.02,
    }));

    function drawOompaLoompa(ox,oy,sc,ph){
     ctx.save();ctx.translate(ox,oy);

     /* Rebond vertical */
     const bob=Math.abs(Math.sin(ph))*sc*0.18;
     ctx.translate(0,-bob);

     /* Légère rotation au rythme */
     const tilt=Math.sin(ph*2)*0.12;
     ctx.rotate(tilt);

     /* ── Jambes — alternance gauche/droite ── */
     const legSwing=Math.sin(ph)*0.45;
     ctx.strokeStyle='rgba(200,90,10,0.95)';ctx.lineWidth=sc*0.18;ctx.lineCap='round';
     /* Jambe gauche */
     ctx.beginPath();ctx.moveTo(-sc*0.08,0);
     ctx.lineTo(-sc*0.14+legSwing*sc*0.15,sc*0.38);ctx.stroke();
     /* Pied gauche */
     ctx.fillStyle='rgba(30,18,5,0.92)';
     ctx.beginPath();ctx.ellipse(-sc*0.14+legSwing*sc*0.15,sc*0.42,sc*0.10,sc*0.045,0.2,0,Math.PI*2);ctx.fill();
     /* Jambe droite */
     ctx.strokeStyle='rgba(200,90,10,0.95)';ctx.lineWidth=sc*0.18;
     ctx.beginPath();ctx.moveTo(sc*0.08,0);
     ctx.lineTo(sc*0.14-legSwing*sc*0.15,sc*0.38);ctx.stroke();
     /* Pied droit */
     ctx.fillStyle='rgba(30,18,5,0.92)';
     ctx.beginPath();ctx.ellipse(sc*0.14-legSwing*sc*0.15,sc*0.42,sc*0.10,sc*0.045,-0.2,0,Math.PI*2);ctx.fill();

     /* ── Corps — salopette blanche avec boutons ── */
     const bodyG=ctx.createRadialGradient(-sc*0.05,-sc*0.12,sc*0.04,0,-sc*0.05,sc*0.42);
     bodyG.addColorStop(0,'rgba(248,242,220,0.96)');
     bodyG.addColorStop(0.6,'rgba(225,218,195,0.94)');
     bodyG.addColorStop(1,'rgba(200,192,165,0.90)');
     ctx.fillStyle=bodyG;
     ctx.beginPath();ctx.ellipse(0,-sc*0.08,sc*0.26,sc*0.32,0,0,Math.PI*2);ctx.fill();
     /* Bretelles */
     ctx.strokeStyle='rgba(180,165,140,0.65)';ctx.lineWidth=sc*0.05;
     ctx.beginPath();ctx.moveTo(-sc*0.12,sc*0.10);ctx.lineTo(-sc*0.08,-sc*0.38);ctx.stroke();
     ctx.beginPath();ctx.moveTo(sc*0.12,sc*0.10);ctx.lineTo(sc*0.08,-sc*0.38);ctx.stroke();
     /* Petits boutons */
     ctx.fillStyle='rgba(180,70,8,0.80)';
     ctx.beginPath();ctx.arc(0,-sc*0.02,sc*0.038,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(0,-sc*0.16,sc*0.032,0,Math.PI*2);ctx.fill();

     /* ── Bras — bougent en sens inverse des jambes ── */
     const armSwing=Math.sin(ph)*0.55;
     ctx.strokeStyle='rgba(200,90,10,0.92)';ctx.lineWidth=sc*0.14;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-sc*0.22,-sc*0.05);
     ctx.lineTo(-sc*0.34,sc*0.10-armSwing*sc*0.16);ctx.stroke();
     ctx.beginPath();ctx.moveTo(sc*0.22,-sc*0.05);
     ctx.lineTo(sc*0.36,sc*0.10+armSwing*sc*0.16);ctx.stroke();
     /* Petites mains */
     ctx.fillStyle='rgba(210,100,15,0.88)';
     ctx.beginPath();ctx.arc(-sc*0.34,sc*0.10-armSwing*sc*0.16,sc*0.07,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(sc*0.36,sc*0.10+armSwing*sc*0.16,sc*0.07,0,Math.PI*2);ctx.fill();

     /* ── Tête — ronde, peau orange ── */
     const headG=ctx.createRadialGradient(-sc*0.06,-sc*0.52,sc*0.04,0,-sc*0.48,sc*0.22);
     headG.addColorStop(0,'rgba(240,120,20,0.97)');
     headG.addColorStop(0.6,'rgba(210,90,10,0.96)');
     headG.addColorStop(1,'rgba(180,68,5,0.94)');
     ctx.fillStyle=headG;
     ctx.beginPath();ctx.arc(0,-sc*0.48,sc*0.21,0,Math.PI*2);ctx.fill();

     /* Joues roses */
     ctx.fillStyle='rgba(255,140,100,0.35)';
     ctx.beginPath();ctx.arc(-sc*0.12,-sc*0.45,sc*0.08,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(sc*0.12,-sc*0.45,sc*0.08,0,Math.PI*2);ctx.fill();

     /* Yeux */
     ctx.fillStyle='rgba(15,8,2,0.95)';
     ctx.beginPath();ctx.arc(-sc*0.08,-sc*0.50,sc*0.048,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(sc*0.08,-sc*0.50,sc*0.048,0,Math.PI*2);ctx.fill();
     /* Reflets yeux */
     ctx.fillStyle='rgba(255,255,255,0.82)';
     ctx.beginPath();ctx.arc(-sc*0.06,-sc*0.52,sc*0.018,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(sc*0.10,-sc*0.52,sc*0.018,0,Math.PI*2);ctx.fill();

     /* Grand sourire */
     ctx.strokeStyle='rgba(15,8,2,0.70)';ctx.lineWidth=sc*0.04;
     ctx.beginPath();ctx.arc(0,-sc*0.44,sc*0.10,Math.PI*0.15,Math.PI*0.85);ctx.stroke();

     /* ── Cheveux verts dressés ── */
     ctx.fillStyle='rgba(30,160,40,0.96)';
     for(let hi=0;hi<5;hi++){
      const hx=(hi-2)*sc*0.072;
      const hh=sc*(0.12+Math.abs(hi-2)*0.025)+Math.sin(ph+hi)*sc*0.04;
      ctx.beginPath();
      ctx.moveTo(hx-sc*0.038,-sc*0.66);
      ctx.quadraticCurveTo(hx+Math.sin(hi+ph*0.5)*sc*0.06,-sc*0.66-hh,hx+sc*0.038,-sc*0.66);
      ctx.closePath();ctx.fill();
     }

     /* ── Chapeau haut-de-forme — petit ── */
     ctx.fillStyle='rgba(18,80,22,0.95)';
     ctx.beginPath();ctx.ellipse(0,-sc*0.70,sc*0.16,sc*0.032,0,0,Math.PI*2);ctx.fill();
     ctx.fillRect(-sc*0.12,-sc*0.88,sc*0.24,sc*0.18);
     ctx.beginPath();ctx.ellipse(0,-sc*0.88,sc*0.12,sc*0.024,0,0,Math.PI*2);ctx.fill();
     /* Bandeau rouge */
     ctx.fillStyle='rgba(200,20,20,0.85)';
     ctx.fillRect(-sc*0.12,-sc*0.76,sc*0.24,sc*0.04);

     /* Ombre au sol */
     ctx.fillStyle=`rgba(30,10,2,${0.18+bob/sc*0.06})`;
     ctx.beginPath();ctx.ellipse(0,sc*0.48,sc*(0.22-bob/sc*0.08),sc*0.045,0,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     /* Fond chocolat chaud */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#280f02');bg.addColorStop(0.5,'#3a1603');bg.addColorStop(1,'#1a0a01');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Rivière de chocolat en bas */
     const chocY=H*0.80;
     const chocG=ctx.createLinearGradient(0,chocY,0,H);
     chocG.addColorStop(0,'#5a2f08');chocG.addColorStop(0.3,'#7a3e0a');chocG.addColorStop(1,'#3a1e04');
     ctx.fillStyle=chocG;ctx.fillRect(0,chocY,W,H-chocY);
     /* Ondulations */
     for(let wi=0;wi<4;wi++){
      const wy=chocY+wi*H*0.045+Math.sin(t*0.8+wi*1.5)*H*0.008;
      ctx.strokeStyle=`rgba(100,55,12,${0.35+wi*0.08})`;ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(0,wy);
      for(let wx=0;wx<=W;wx+=20){
       ctx.lineTo(wx,wy+Math.sin(t*0.5+wx*0.04+wi)*H*0.006);
      }
      ctx.stroke();
     }

     /* Cheminées de l'usine */
     for(let i=0;i<3;i++){
      const chimX=W*(0.22+i*0.28);
      ctx.fillStyle='rgba(30,15,5,0.95)';
      ctx.fillRect(chimX-W*0.025,H*0.12,W*0.05,H*0.55);
      /* Fumée colorée */
      const smokeColors=['rgba(255,100,100,','rgba(100,200,100,','rgba(80,150,255,'];
      for(let si=0;si<5;si++){
       const sy2=H*0.12-si*H*0.06+Math.sin(t*0.5+si+i)*H*0.015;
       const sr=W*(0.025+si*0.012);
       const smokeG=ctx.createRadialGradient(chimX,sy2,0,chimX,sy2,sr);
       smokeG.addColorStop(0,`${smokeColors[i]}${0.22-si*0.03})`);
       smokeG.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=smokeG;
       ctx.beginPath();ctx.arc(chimX+(Math.sin(t*0.3+si)*W*0.02),sy2,sr,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── Oompa Loompas dansants ── */
     const chocY2=H*0.80;
     const olSc=H*0.072; /* taille : petits par rapport à l'écran */
     for(const o of oompas){
      o.phase+=o.spd;
      drawOompaLoompa(o.x, chocY2-olSc*0.48, olSc, o.phase);
     }

     /* Confettis */
     for(const c of confetti){
      c.y+=c.vy;c.x+=c.vx;c.rot+=c.rotSpd;
      if(c.y>H+20){c.y=-20;c.x=Math.random()*W;}
      ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);
      ctx.fillStyle=`${c.col}0.75)`;
      ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);
      ctx.restore();
     }

     /* Gouttes de chocolat */
     for(const d of chocDrops){
      d.y+=d.vy;
      if(d.y>H+20){d.y=-20;d.x=Math.random()*W;}
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(90,45,8,${d.op})`;ctx.fill();
      /* Queue de la goutte */
      ctx.fillStyle=`rgba(90,45,8,${d.op*0.5})`;
      ctx.beginPath();ctx.ellipse(d.x,d.y-d.r*1.4,d.r*0.45,d.r*0.8,0,0,Math.PI*2);ctx.fill();
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
