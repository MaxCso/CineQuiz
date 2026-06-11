// CinéQuiz splash chunk — Monstres & Cie
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Monstres & Cie"]={
   name:'Monstres & Cie',
   color:'60,80,200',
   ref:'Monstres & Cie \u2014 Pete Docter, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.82';
    let t=0;
    const cx=W/2;
    let _mcs=document.getElementById('_mc_s');if(!_mcs){_mcs=document.createElement('style');_mcs.id='_mc_s';document.head.appendChild(_mcs);}
    _mcs.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _mcw=setInterval(()=>{if(stop.v){_mcs.textContent='';clearInterval(_mcw);}},200);
    const doors=Array.from({length:14},(_,i)=>({x:Math.random()*W,y:H*0.15+Math.random()*H*0.60,vx:(Math.random()-0.5)*0.7,vy:(Math.random()-0.5)*0.4,w:W*(0.055+Math.random()*0.055),hd:H*(0.09+Math.random()*0.08),hue:Math.random()*360,open:Math.random()>0.45,ph:Math.random()*Math.PI*2,style:i%3}));
    const laughP=Array.from({length:26},()=>({x:Math.random()*W,y:H*0.30+Math.random()*H*0.45,vx:(Math.random()-0.5)*0.9,vy:-(Math.random()*0.7+0.2),r:Math.random()*4+1.5,ph:Math.random()*Math.PI*2,hue:Math.random()*60+30}));
    function drawSulley(sx,sy){
     /* Sully : grand monstre bleu-sarcelle poilu, taches violettes, deux yeux, cornes */
     const s=W*0.13; ctx.save(); ctx.translate(sx,sy);

     /* ── Danse : rebond, hanche, bras levés en rythme ── */
     const beat=t*2.8; /* tempo de danse */
     const bounce=Math.abs(Math.sin(beat))*s*0.18; /* rebond vers le haut */
     const hipSway=Math.sin(beat)*0.10; /* rotation de hanche */
     const breathX=1+Math.sin(t*1.1)*0.018;
     const breathY=1+Math.sin(t*1.1)*0.012;
     ctx.translate(0,-bounce);
     ctx.rotate(hipSway);

     /* ── Jambes — alternance gauche/droite ── */
     const legL=Math.sin(beat)*0.18;
     const legR=-Math.sin(beat)*0.18;
     ctx.fillStyle='rgba(38,110,95,0.95)';
     ctx.save(); ctx.translate(-s*0.28,s*0.90); ctx.rotate(legL);
     ctx.beginPath(); ctx.ellipse(0,0,s*0.16,s*0.32,0,0,Math.PI*2); ctx.fill();
     ctx.fillStyle='rgba(22,75,62,0.97)';
     ctx.beginPath(); ctx.ellipse(0,s*0.28,s*0.20,s*0.10,legL*0.5,0,Math.PI*2); ctx.fill();
     ctx.restore();
     ctx.fillStyle='rgba(38,110,95,0.95)';
     ctx.save(); ctx.translate(s*0.28,s*0.90); ctx.rotate(legR);
     ctx.beginPath(); ctx.ellipse(0,0,s*0.16,s*0.32,0,0,Math.PI*2); ctx.fill();
     ctx.fillStyle='rgba(22,75,62,0.97)';
     ctx.beginPath(); ctx.ellipse(0,s*0.28,s*0.20,s*0.10,legR*0.5,0,Math.PI*2); ctx.fill();
     ctx.restore();

     /* ── Corps principal — teal poilu, forme large ── */
     const bodyG=ctx.createRadialGradient(-s*0.15,-s*0.05,s*0.1,0,s*0.3,s*1.2);
     bodyG.addColorStop(0,'rgba(72,185,155,0.97)');
     bodyG.addColorStop(0.45,'rgba(45,148,125,0.96)');
     bodyG.addColorStop(1,'rgba(28,95,80,0.95)');
     ctx.fillStyle=bodyG;
     ctx.beginPath();
     ctx.ellipse(0,s*0.30,s*0.78*breathX,s*0.75*breathY,0,0,Math.PI*2);
     ctx.fill();

     /* ── Taches violettes sur le corps ── */
     ctx.fillStyle='rgba(100,50,180,0.38)';
     ctx.beginPath(); ctx.ellipse(-s*0.38,s*0.10,s*0.18,s*0.12,-0.5,0,Math.PI*2); ctx.fill();
     ctx.beginPath(); ctx.ellipse(s*0.30,s*0.00,s*0.15,s*0.10,0.4,0,Math.PI*2); ctx.fill();
     ctx.beginPath(); ctx.ellipse(s*0.10,s*0.55,s*0.13,s*0.09,-0.2,0,Math.PI*2); ctx.fill();
     ctx.beginPath(); ctx.ellipse(-s*0.22,s*0.50,s*0.10,s*0.07,0.3,0,Math.PI*2); ctx.fill();

     /* ── Bras gauche — levé en rythme ── */
     const armL=-0.55+Math.sin(beat+Math.PI)*0.70; /* angle bras gauche */
     const armR=-0.55+Math.sin(beat)*0.70;          /* angle bras droit, déphasé */
     ctx.strokeStyle='rgba(45,148,125,0.95)'; ctx.lineWidth=s*0.28; ctx.lineCap='round';
     const lArmEndX=-s*0.65+Math.cos(armL-Math.PI*0.5)*s*0.85;
     const lArmEndY= s*0.20+Math.sin(armL-Math.PI*0.5)*s*0.85;
     ctx.beginPath();
     ctx.moveTo(-s*0.65,s*0.20);
     ctx.quadraticCurveTo(-s*0.65+Math.cos(armL-Math.PI*0.5)*s*0.42, s*0.20+Math.sin(armL-Math.PI*0.5)*s*0.42, lArmEndX, lArmEndY);
     ctx.stroke();
     /* Griffes gauche */
     ctx.strokeStyle='rgba(22,75,62,0.90)'; ctx.lineWidth=s*0.07;
     for(let g=0;g<3;g++){
      const ga=(-0.4+g*0.4)+armL;
      ctx.beginPath(); ctx.moveTo(lArmEndX,lArmEndY); ctx.lineTo(lArmEndX+Math.cos(ga-Math.PI*0.5)*s*0.22, lArmEndY+Math.sin(ga-Math.PI*0.5)*s*0.22); ctx.stroke();
     }

     /* ── Bras droit ── */
     ctx.strokeStyle='rgba(45,148,125,0.95)'; ctx.lineWidth=s*0.28; ctx.lineCap='round';
     const rArmEndX=s*0.65+Math.cos(armR+Math.PI*1.5)*s*0.85;
     const rArmEndY=s*0.20+Math.sin(armR+Math.PI*1.5)*s*0.85;
     ctx.beginPath();
     ctx.moveTo(s*0.65,s*0.20);
     ctx.quadraticCurveTo(s*0.65+Math.cos(armR+Math.PI*1.5)*s*0.42, s*0.20+Math.sin(armR+Math.PI*1.5)*s*0.42, rArmEndX, rArmEndY);
     ctx.stroke();
     ctx.strokeStyle='rgba(22,75,62,0.90)'; ctx.lineWidth=s*0.07;
     for(let g=0;g<3;g++){
      const ga=(-0.4+g*0.4)+armR;
      ctx.beginPath(); ctx.moveTo(rArmEndX,rArmEndY); ctx.lineTo(rArmEndX+Math.cos(ga+Math.PI*0.5)*s*0.22, rArmEndY+Math.sin(ga+Math.PI*0.5)*s*0.22); ctx.stroke();
     }

     /* ── Tête ── */
     const headG=ctx.createRadialGradient(-s*0.12,-s*0.85,s*0.05,0,-s*0.72,s*0.65);
     headG.addColorStop(0,'rgba(80,200,165,0.97)');
     headG.addColorStop(0.5,'rgba(50,160,135,0.96)');
     headG.addColorStop(1,'rgba(32,105,88,0.95)');
     ctx.fillStyle=headG;
     ctx.beginPath(); ctx.ellipse(0,-s*0.72,s*0.60,s*0.55,0,0,Math.PI*2); ctx.fill();

     /* Tache violette sur la tête */
     ctx.fillStyle='rgba(100,50,180,0.30)';
     ctx.beginPath(); ctx.ellipse(-s*0.20,-s*0.68,s*0.22,s*0.14,-0.3,0,Math.PI*2); ctx.fill();

     /* ── Cornes ── */
     ctx.fillStyle='rgba(240,225,190,0.95)';
     ctx.beginPath(); ctx.moveTo(-s*0.25,-s*1.18); ctx.lineTo(-s*0.12,-s*1.48); ctx.lineTo(-s*0.05,-s*1.20); ctx.closePath(); ctx.fill();
     ctx.beginPath(); ctx.moveTo(s*0.25,-s*1.18); ctx.lineTo(s*0.12,-s*1.48); ctx.lineTo(s*0.05,-s*1.20); ctx.closePath(); ctx.fill();
     /* Rayures sombres sur les cornes */
     ctx.strokeStyle='rgba(180,155,110,0.55)'; ctx.lineWidth=s*0.025;
     ctx.beginPath(); ctx.moveTo(-s*0.195,-s*1.22); ctx.lineTo(-s*0.155,-s*1.38); ctx.stroke();
     ctx.beginPath(); ctx.moveTo(s*0.195,-s*1.22); ctx.lineTo(s*0.155,-s*1.38); ctx.stroke();

     /* ── Sourcils expressifs ── */
     ctx.strokeStyle='rgba(22,75,62,0.85)'; ctx.lineWidth=s*0.06; ctx.lineCap='round';
     ctx.beginPath(); ctx.moveTo(-s*0.38,-s*0.82); ctx.quadraticCurveTo(-s*0.22,-s*0.98,-s*0.08,-s*0.88); ctx.stroke();
     ctx.beginPath(); ctx.moveTo(s*0.08,-s*0.88); ctx.quadraticCurveTo(s*0.22,-s*0.98,s*0.38,-s*0.82); ctx.stroke();

     /* ── Yeux (deux yeux bleu-violet) ── */
     for(const [ex,ey] of [[-s*0.22,-s*0.75],[s*0.22,-s*0.75]]){
      /* Blanc */
      ctx.fillStyle='rgba(245,238,255,0.97)';
      ctx.beginPath(); ctx.ellipse(ex,ey,s*0.18,s*0.20,0,0,Math.PI*2); ctx.fill();
      /* Iris violet-bleu */
      ctx.fillStyle='rgba(90,70,190,0.95)';
      ctx.beginPath(); ctx.arc(ex+s*0.03,ey+s*0.02,s*0.11,0,Math.PI*2); ctx.fill();
      /* Pupille */
      ctx.fillStyle='rgba(5,5,5,0.97)';
      ctx.beginPath(); ctx.arc(ex+s*0.04,ey+s*0.03,s*0.065,0,Math.PI*2); ctx.fill();
      /* Reflet */
      ctx.fillStyle='rgba(255,255,255,0.90)';
      ctx.beginPath(); ctx.arc(ex-s*0.02,ey-s*0.05,s*0.038,0,Math.PI*2); ctx.fill();
     }

     /* ── Bouche souriante ── */
     ctx.strokeStyle='rgba(20,72,58,0.80)'; ctx.lineWidth=s*0.045;
     ctx.beginPath(); ctx.moveTo(-s*0.25,-s*0.52); ctx.quadraticCurveTo(0,-s*0.40,s*0.25,-s*0.52); ctx.stroke();
     /* Dents */
     ctx.fillStyle='rgba(240,235,225,0.88)';
     ctx.beginPath(); ctx.roundRect(-s*0.18,-s*0.50,s*0.36,s*0.09,s*0.02); ctx.fill();

     /* ── Fourrure — poils sur les bords (traits rapides) ── */
     ctx.strokeStyle='rgba(38,120,100,0.45)'; ctx.lineWidth=s*0.020;
     const furPts=[[-s*0.80,s*0.25],[-s*0.72,s*0.00],[s*0.72,s*0.10],[s*0.80,s*0.35],[-s*0.62,-s*0.30],[s*0.62,-s*0.25],[-s*0.52,s*0.60],[s*0.55,s*0.65]];
     for(const [fx,fy] of furPts){
      const fa=Math.atan2(fy,fx);
      ctx.beginPath(); ctx.moveTo(fx,fy); ctx.lineTo(fx+Math.cos(fa)*s*0.10,fy+Math.sin(fa)*s*0.10); ctx.stroke();
     }

     ctx.restore();
    }

    function drawMike(mx,my){
     /* Mike : petite boule verte, un seul œil énorme, deux petites cornes, bras fins, sourire large */
     const s=W*0.065; ctx.save(); ctx.translate(mx,my);

     /* ── Danse : rebond énergique, bras en l'air en opposition à Sully ── */
     const beat=t*2.8;
     const bobDance=-Math.abs(Math.sin(beat))*s*0.30; /* rebond vif vers le haut */
     const hipDance=Math.sin(beat+Math.PI)*0.12; /* hanche déphasée vs Sully */
     ctx.translate(0,bobDance);
     ctx.rotate(hipDance);

     /* ── Jambes — alternance opposée à Sully ── */
     const legKickL=Math.sin(beat+Math.PI)*0.30;
     const legKickR=-Math.sin(beat+Math.PI)*0.30;
     ctx.strokeStyle='rgba(55,140,30,0.92)'; ctx.lineWidth=s*0.20; ctx.lineCap='round';
     const lLegEndX=-s*0.22+Math.sin(legKickL)*s*0.50;
     const lLegEndY= s*0.82+Math.cos(legKickL)*s*0.50;
     const rLegEndX= s*0.22+Math.sin(legKickR)*s*0.50;
     const rLegEndY= s*0.82+Math.cos(legKickR)*s*0.50;
     ctx.beginPath(); ctx.moveTo(-s*0.22,s*0.82); ctx.lineTo(lLegEndX,lLegEndY); ctx.stroke();
     ctx.beginPath(); ctx.moveTo(s*0.22,s*0.82); ctx.lineTo(rLegEndX,rLegEndY); ctx.stroke();
     /* Pieds */
     ctx.fillStyle='rgba(38,105,18,0.92)';
     ctx.beginPath(); ctx.ellipse(lLegEndX,lLegEndY,s*0.18,s*0.09,legKickL,0,Math.PI*2); ctx.fill();
     ctx.beginPath(); ctx.ellipse(rLegEndX,rLegEndY,s*0.18,s*0.09,legKickR,0,Math.PI*2); ctx.fill();

     /* ── Corps — boule verte ── */
     const bg3=ctx.createRadialGradient(-s*0.15,-s*0.10,s*0.05,0,0,s*1.05);
     bg3.addColorStop(0,'rgba(115,205,65,0.97)');
     bg3.addColorStop(0.5,'rgba(72,165,30,0.96)');
     bg3.addColorStop(1,'rgba(40,110,15,0.95)');
     ctx.fillStyle=bg3;
     ctx.beginPath(); ctx.ellipse(0,s*0.08,s*0.82,s*0.78,0,0,Math.PI*2); ctx.fill();

     /* ── Petites cornes ── */
     ctx.fillStyle='rgba(38,105,18,0.90)';
     ctx.beginPath(); ctx.moveTo(-s*0.25,-s*0.72); ctx.lineTo(-s*0.20,-s*0.95); ctx.lineTo(-s*0.12,-s*0.72); ctx.closePath(); ctx.fill();
     ctx.beginPath(); ctx.moveTo(s*0.12,-s*0.72); ctx.lineTo(s*0.20,-s*0.95); ctx.lineTo(s*0.25,-s*0.72); ctx.closePath(); ctx.fill();

     /* ── Bras — agités en l'air, déphasés de Sully ── */
     const armL2=-0.55+Math.sin(beat+Math.PI)*0.85; /* bras levés en opposition */
     const armR2=-0.55+Math.sin(beat)*0.85;
     ctx.strokeStyle='rgba(72,165,30,0.92)'; ctx.lineWidth=s*0.18; ctx.lineCap='round';
     const lArmEndX2=-s*0.72+Math.cos(armL2-Math.PI*0.5)*s*0.75;
     const lArmEndY2= s*0.08+Math.sin(armL2-Math.PI*0.5)*s*0.75;
     const rArmEndX2= s*0.72+Math.cos(armR2+Math.PI*1.5)*s*0.75;
     const rArmEndY2= s*0.08+Math.sin(armR2+Math.PI*1.5)*s*0.75;
     ctx.beginPath();
     ctx.moveTo(-s*0.72,s*0.08);
     ctx.quadraticCurveTo((-s*0.72+lArmEndX2)/2+Math.cos(armL2)*s*0.25, (s*0.08+lArmEndY2)/2, lArmEndX2, lArmEndY2);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(s*0.72,s*0.08);
     ctx.quadraticCurveTo((s*0.72+rArmEndX2)/2+Math.cos(armR2)*s*0.25, (s*0.08+rArmEndY2)/2, rArmEndX2, rArmEndY2);
     ctx.stroke();
     /* Mains — petites boules */
     ctx.fillStyle='rgba(55,140,25,0.92)';
     ctx.beginPath(); ctx.arc(lArmEndX2,lArmEndY2,s*0.14,0,Math.PI*2); ctx.fill();
     ctx.beginPath(); ctx.arc(rArmEndX2,rArmEndY2,s*0.14,0,Math.PI*2); ctx.fill();

     /* ── Grand œil unique — blanc d'œil ── */
     const eyePulse=1+Math.sin(t*2.2)*0.012;
     ctx.fillStyle='rgba(248,242,255,0.97)';
     ctx.beginPath(); ctx.ellipse(0,-s*0.10,s*0.72*eyePulse,s*0.68*eyePulse,0,0,Math.PI*2); ctx.fill();
     /* Iris vert-bleu */
     ctx.fillStyle='rgba(45,160,210,0.96)';
     ctx.beginPath(); ctx.ellipse(s*0.04,-s*0.12,s*0.48,s*0.46,0,0,Math.PI*2); ctx.fill();
     /* Pupille noire */
     ctx.fillStyle='rgba(4,4,4,0.98)';
     ctx.beginPath(); ctx.arc(s*0.06,-s*0.14,s*0.28,0,Math.PI*2); ctx.fill();
     /* Reflets dans l'œil */
     ctx.fillStyle='rgba(255,255,255,0.92)';
     ctx.beginPath(); ctx.arc(-s*0.08,-s*0.28,s*0.115,0,Math.PI*2); ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.55)';
     ctx.beginPath(); ctx.arc(s*0.16,-s*0.05,s*0.055,0,Math.PI*2); ctx.fill();
     /* Paupière / sourcil vert foncé */
     ctx.strokeStyle='rgba(30,95,10,0.80)'; ctx.lineWidth=s*0.07; ctx.lineCap='round';
     ctx.beginPath(); ctx.moveTo(-s*0.62,-s*0.52); ctx.quadraticCurveTo(0,-s*0.72,s*0.62,-s*0.52); ctx.stroke();

     /* ── Sourire large — dents nombreuses ── */
     ctx.strokeStyle='rgba(28,90,10,0.75)'; ctx.lineWidth=s*0.06;
     ctx.beginPath(); ctx.moveTo(-s*0.52,s*0.38); ctx.quadraticCurveTo(0,s*0.62,s*0.52,s*0.38); ctx.stroke();
     /* Dents */
     ctx.fillStyle='rgba(242,238,228,0.92)';
     ctx.save();
     ctx.beginPath(); ctx.moveTo(-s*0.50,s*0.40); ctx.quadraticCurveTo(0,s*0.60,s*0.50,s*0.40);
     ctx.lineTo(s*0.50,s*0.50); ctx.quadraticCurveTo(0,s*0.70,-s*0.50,s*0.50); ctx.closePath(); ctx.clip();
     ctx.fillRect(-s*0.55,s*0.36,s*1.10,s*0.22);
     /* Séparations des dents */
     ctx.strokeStyle='rgba(28,90,10,0.40)'; ctx.lineWidth=s*0.03;
     for(let d=-2;d<=2;d++){ ctx.beginPath(); ctx.moveTo(d*s*0.22,s*0.37); ctx.lineTo(d*s*0.22,s*0.56); ctx.stroke(); }
     ctx.restore();

     ctx.restore();
    }
    function drawBed(bx,by){
     const bw=W*0.52, bh=H*0.065, legH=H*0.028;
     /* Pieds de lit */
     ctx.fillStyle='rgba(60,40,20,0.90)';
     for(const lx of [bx-bw*0.42,bx+bw*0.42]){ctx.beginPath();ctx.roundRect(lx-W*0.012,by,W*0.024,legH,2);ctx.fill();}
     /* Châssis du lit */
     const fg=ctx.createLinearGradient(bx-bw/2,by-bh,bx+bw/2,by);
     fg.addColorStop(0,'rgba(80,55,28,0.96)');fg.addColorStop(1,'rgba(50,32,12,0.98)');
     ctx.fillStyle=fg;ctx.beginPath();ctx.roundRect(bx-bw/2,by-bh,bw,bh,4);ctx.fill();
     /* Matelas */
     const mg=ctx.createLinearGradient(bx-bw/2,by-bh-H*0.022,bx+bw/2,by-bh);
     mg.addColorStop(0,'rgba(210,195,170,0.95)');mg.addColorStop(1,'rgba(175,158,130,0.92)');
     ctx.fillStyle=mg;ctx.beginPath();ctx.roundRect(bx-bw*0.48,by-bh-H*0.022,bw*0.96,H*0.026,4);ctx.fill();
     /* Couverture */
     const cg=ctx.createLinearGradient(bx-bw/2,by-bh-H*0.048,bx+bw/2,by-bh);
     cg.addColorStop(0,'rgba(80,100,200,0.92)');cg.addColorStop(0.5,'rgba(55,75,170,0.94)');cg.addColorStop(1,'rgba(40,55,140,0.88)');
     ctx.fillStyle=cg;ctx.beginPath();ctx.roundRect(bx-bw*0.46,by-bh-H*0.048,bw*0.92,H*0.038,5);ctx.fill();
     /* Rayures Monsters Inc sur la couverture */
     ctx.save();ctx.beginPath();ctx.roundRect(bx-bw*0.46,by-bh-H*0.048,bw*0.92,H*0.038,5);ctx.clip();
     for(let si=0;si<7;si++){
      const sx=bx-bw*0.46+si*(bw*0.92/6);
      ctx.fillStyle=`rgba(100,130,220,${si%2===0?0.35:0})`;
      ctx.fillRect(sx,by-bh-H*0.048,bw*0.92/6,H*0.038);
     }
     ctx.restore();
     /* Tête de lit */
     const hg3=ctx.createLinearGradient(bx-bw*0.5,by-bh-H*0.10,bx+bw*0.5,by-bh);
     hg3.addColorStop(0,'rgba(90,60,25,0.97)');hg3.addColorStop(1,'rgba(55,35,10,0.98)');
     ctx.fillStyle=hg3;ctx.beginPath();ctx.roundRect(bx-bw*0.50,by-bh-H*0.08,bw*0.26,H*0.08,4);ctx.fill();
     /* Oreiller */
     ctx.fillStyle='rgba(240,230,210,0.90)';ctx.beginPath();ctx.roundRect(bx-bw*0.44,by-bh-H*0.068,bw*0.40,H*0.040,6);ctx.fill();
     ctx.strokeStyle='rgba(200,185,160,0.55)';ctx.lineWidth=0.8;ctx.beginPath();ctx.roundRect(bx-bw*0.44,by-bh-H*0.068,bw*0.40,H*0.040,6);ctx.stroke();
    }

    function frame(){
     if(stop.v)return;
     const bg4=ctx.createLinearGradient(0,0,0,H);bg4.addColorStop(0,'rgba(10,5,22,0.22)');bg4.addColorStop(1,'rgba(8,4,16,0.22)');ctx.fillStyle=bg4;ctx.fillRect(0,0,W,H);
     for(let si=0;si<58;si++){const sx2=Math.sin(si*17.3)*W*0.5+W*0.5,sy2=Math.sin(si*11.7)*H*0.35+H*0.12;ctx.fillStyle=`rgba(200,180,255,${0.10+Math.sin(t*0.5+si)*0.08})`;ctx.beginPath();ctx.arc(sx2,sy2,0.8+Math.sin(si)*0.5,0,Math.PI*2);ctx.fill();}
     for(const d of doors){
      d.x+=d.vx;d.y+=d.vy;d.ph+=0.04;
      if(d.x<-d.w)d.x=W+d.w;if(d.x>W+d.w)d.x=-d.w;
      if(d.y<H*0.12)d.vy=Math.abs(d.vy);if(d.y>H*0.82)d.vy=-Math.abs(d.vy);
      ctx.fillStyle='rgba(0,0,0,0.22)';ctx.beginPath();ctx.ellipse(d.x+4,d.y+d.hd*0.5+4,d.w*0.45,d.hd*0.08,0,0,Math.PI*2);ctx.fill();
      const dg=ctx.createLinearGradient(d.x-d.w*0.5,d.y-d.hd*0.5,d.x+d.w*0.5,d.y+d.hd*0.5);dg.addColorStop(0,`hsla(${d.hue},65%,30%,0.94)`);dg.addColorStop(1,`hsla(${d.hue},55%,18%,0.96)`);ctx.fillStyle=dg;
      /* Style 0 : arche en haut / Style 1 : rectangulaire / Style 2 : double panneau */
      ctx.beginPath();
      if(d.style===0){
       /* Arche */
       ctx.moveTo(d.x-d.w*0.5,d.y+d.hd*0.5);ctx.lineTo(d.x-d.w*0.5,d.y-d.hd*0.15);
       ctx.arc(d.x,d.y-d.hd*0.15,d.w*0.5,Math.PI,0);
       ctx.lineTo(d.x+d.w*0.5,d.y+d.hd*0.5);ctx.closePath();
      } else {ctx.roundRect(d.x-d.w*0.5,d.y-d.hd*0.5,d.w,d.hd,3);}
      ctx.fill();
      /* Panneau central */
      if(d.style===2){
       ctx.strokeStyle=`hsla(${d.hue},50%,45%,0.50)`;ctx.lineWidth=1;
       ctx.beginPath();ctx.roundRect(d.x-d.w*0.44,d.y-d.hd*0.42,d.w*0.88,d.hd*0.40,2);ctx.stroke();
       ctx.beginPath();ctx.roundRect(d.x-d.w*0.44,d.y-d.hd*0.42+d.hd*0.46,d.w*0.88,d.hd*0.40,2);ctx.stroke();
      }
      if(d.open){const gw=ctx.createRadialGradient(d.x,d.y,2,d.x,d.y,d.w*0.8);gw.addColorStop(0,`hsla(${d.hue+40},90%,65%,${0.35+Math.sin(d.ph)*0.12})`);gw.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gw;ctx.fillRect(d.x-d.w,d.y-d.hd,d.w*2,d.hd*2);}
      ctx.fillStyle='rgba(180,170,140,0.72)';ctx.beginPath();ctx.arc(d.x+d.w*0.28,d.y,d.w*0.08,0,Math.PI*2);ctx.fill();
     }
     const fl2=ctx.createLinearGradient(0,H*0.70,0,H);fl2.addColorStop(0,'rgba(22,18,35,0.95)');fl2.addColorStop(1,'rgba(12,8,22,0.99)');ctx.fillStyle=fl2;ctx.fillRect(0,H*0.70,W,H*0.30);
     for(const p of laughP){p.x+=p.vx;p.y+=p.vy;p.ph+=0.06;if(p.y<H*0.10){p.y=H*0.72;p.x=cx+(Math.random()-0.5)*W*0.35;}ctx.fillStyle=`hsla(${p.hue},80%,65%,${0.20+Math.abs(Math.sin(p.ph))*0.45})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}
     drawBed(cx-W*0.02,H*0.70);
     drawSulley(cx-W*0.18,H*0.68);drawMike(cx+W*0.22,H*0.70);
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.90);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.50,'rgba(5,2,12,0.15)');vg.addColorStop(1,'rgba(5,2,12,0.94)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
