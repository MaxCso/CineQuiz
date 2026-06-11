// CinéQuiz splash chunk — Avengers
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Avengers"]={
   name:'Avengers',
   color:'200,30,30',
   ref:'Avengers: Endgame \u2014 Russo Brothers, 2019',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2,cy=H*0.65;

    /* ── Positionnement citation + logo sous le logo Cinéquiz ── */
    let _avPos=document.getElementById('_av_pos');
    if(!_avPos){_avPos=document.createElement('style');_avPos.id='_av_pos';document.head.appendChild(_avPos);}
    _avPos.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _avPosW=setInterval(()=>{if(stop.v){_avPos.textContent='';clearInterval(_avPosW);}},200);

    /* ── 6 Pierres de l'Infini ── */
    const stoneColors=[
     {h:270,name:'soul'},    /* violet — Soul */
     {h:195,name:'space'},   /* bleu  — Space */
     {h:120,name:'time'},    /* vert  — Time */
     {h:15, name:'reality'}, /* rouge — Reality */
     {h:45, name:'mind'},    /* jaune — Mind */
     {h:295,name:'power'},   /* violet foncé — Power */
    ];
    const stoneRadius=W*0.28;

    /* ── Débris orbitaux ── */
    const debris=Array.from({length:55},()=>({
     angle:Math.random()*Math.PI*2,
     dist:W*(0.14+Math.random()*0.38),
     angSpd:(Math.random()-0.5)*0.006+0.003*(Math.random()<0.5?1:-1),
     r:Math.random()*3.5+0.8,
     hue:Math.random()<0.5?42:210,
     op:Math.random()*0.55+0.12,
     wobble:Math.random()*Math.PI*2,
     wobSpd:Math.random()*0.03+0.01
    }));

    /* ── Particules de désintégration ── */
    const dusts=Array.from({length:160},()=>({
     x:cx+(Math.random()-0.5)*W*0.9,
     y:cy+(Math.random()-0.5)*H*0.9,
     vx:(Math.random()-0.5)*0.9,
     vy:-(Math.random()*1.2+0.1),
     r:Math.random()*2+0.3,
     hue:Math.random()<0.6?42:220,
     life:Math.random(),decay:Math.random()*0.004+0.0015,
     drift:Math.random()*Math.PI*2
    }));

    /* ── Éclairs d'énergie ── */
    const bolts=Array.from({length:6},()=>({
     angle:Math.random()*Math.PI*2,
     life:0,cooldown:Math.random()*80+40,
     timer:Math.floor(Math.random()*80)
    }));

    function drawPortal(){
     const pulse=Math.sin(t*1.1)*0.5+0.5;

     /* Halo extérieur lointain */
     const outerHalo=ctx.createRadialGradient(cx,cy,W*0.22,cx,cy,W*0.68);
     outerHalo.addColorStop(0,`rgba(80,140,255,${0.06+pulse*0.03})`);
     outerHalo.addColorStop(0.4,`rgba(255,160,20,${0.04+pulse*0.02})`);
     outerHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=outerHalo;ctx.fillRect(0,0,W,H);

     /* Anneau principal du Gauntlet */
     const ringR=W*0.30;
     ctx.save();
     ctx.strokeStyle=`rgba(255,200,60,${0.22+pulse*0.10})`;
     ctx.lineWidth=2.5;
     ctx.setLineDash([12,8]);
     ctx.lineDashOffset=-t*18;
     ctx.beginPath();ctx.arc(cx,cy,ringR,0,Math.PI*2);ctx.stroke();
     ctx.setLineDash([]);

     /* Anneau intérieur tournant inverse */
     ctx.strokeStyle=`rgba(120,180,255,${0.16+pulse*0.08})`;
     ctx.lineWidth=1.5;
     ctx.setLineDash([6,14]);
     ctx.lineDashOffset=t*12;
     ctx.beginPath();ctx.arc(cx,cy,ringR*0.68,0,Math.PI*2);ctx.stroke();
     ctx.setLineDash([]);
     ctx.restore();

     /* Cœur du portail — glow central */
     const core=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.22);
     core.addColorStop(0,`rgba(255,220,100,${0.18+pulse*0.10})`);
     core.addColorStop(0.3,`rgba(100,160,255,${0.08+pulse*0.05})`);
     core.addColorStop(0.7,'rgba(20,10,40,0.05)');
     core.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=core;ctx.fillRect(0,0,W,H);
    }

    function drawStones(){
     for(let i=0;i<6;i++){
      const angle=-Math.PI/2+i*(Math.PI*2/6)+t*0.04;
      const sx=cx+Math.cos(angle)*stoneRadius;
      const sy=cy+Math.sin(angle)*stoneRadius;
      const sc=stoneColors[i];
      const pulse=0.6+Math.sin(t*1.4+i*1.1)*0.4;

      /* Halo de pierre */
      const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,16);
      sg.addColorStop(0,`hsla(${sc.h},90%,65%,${0.35*pulse})`);
      sg.addColorStop(0.5,`hsla(${sc.h},80%,50%,${0.12*pulse})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.fillRect(sx-18,sy-18,36,36);

      /* Gemme hexagonale */
      ctx.save();ctx.translate(sx,sy);ctx.rotate(angle+t*0.1);
      ctx.fillStyle=`hsla(${sc.h},85%,58%,${0.75*pulse})`;
      ctx.strokeStyle=`hsla(${sc.h},95%,80%,${0.5*pulse})`;
      ctx.lineWidth=1;
      ctx.beginPath();
      for(let j=0;j<6;j++){
       const a=j*Math.PI/3;
       j===0?ctx.moveTo(Math.cos(a)*5.5,Math.sin(a)*5.5):ctx.lineTo(Math.cos(a)*5.5,Math.sin(a)*5.5);
      }
      ctx.closePath();ctx.fill();ctx.stroke();
      ctx.restore();
     }
    }

    function drawBolts(){
     for(const b of bolts){
      b.timer--;
      if(b.timer<=0&&b.life<=0){b.life=12+Math.random()*8;b.angle=Math.random()*Math.PI*2;b.timer=Math.floor(Math.random()*60+30);}
      if(b.life>0){
       b.life--;
       const ex=cx+Math.cos(b.angle)*W*0.32;
       const ey=cy+Math.sin(b.angle)*W*0.32;
       ctx.save();ctx.globalAlpha=b.life/14*0.7;
       ctx.strokeStyle=`rgba(180,220,255,0.9)`;ctx.lineWidth=1.2;
       ctx.beginPath();
       let lx=cx,ly=cy;
       const steps=6;
       for(let s=1;s<=steps;s++){
        const prog=s/steps;
        const jx=(ex-cx)*prog+cx+(Math.random()-0.5)*18;
        const jy=(ey-cy)*prog+cy+(Math.random()-0.5)*18;
        ctx.moveTo(lx,ly);ctx.lineTo(jx,jy);lx=jx;ly=jy;
       }
       ctx.stroke();ctx.restore();
      }
     }
    }

    function frame(){
     if(stop.v)return;

     /* Trail — lent pour trainer */
     ctx.fillStyle='rgba(2,1,8,0.20)';ctx.fillRect(0,0,W,H);

     /* Bloom de fond violet/bleu */
     const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.8);
     bg.addColorStop(0,'rgba(30,15,70,0.12)');
     bg.addColorStop(0.5,'rgba(10,5,30,0.08)');
     bg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     drawPortal();

     /* Débris orbitaux */
     for(const d of debris){
      d.angle+=d.angSpd;
      d.wobble+=d.wobSpd;
      const dx=cx+Math.cos(d.angle)*d.dist;
      const dy=cy+Math.sin(d.angle)*d.dist+Math.sin(d.wobble)*3;
      ctx.beginPath();ctx.arc(dx,dy,d.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${d.hue},80%,65%,${d.op})`;ctx.fill();
     }

     drawStones();
     drawBolts();

     /* Particules de désintégration */
     for(const d of dusts){
      d.x+=d.vx+Math.sin(t*0.5+d.drift)*0.3;
      d.y+=d.vy;d.life-=d.decay;
      if(d.life<=0){
       d.x=cx+(Math.random()-0.5)*W*0.8;d.y=cy+(Math.random()-0.5)*H*0.7;
       d.vx=(Math.random()-0.5)*0.9;d.vy=-(Math.random()*1.2+0.1);
       d.life=0.6+Math.random()*0.4;d.hue=Math.random()<0.6?42:220;
      }
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${d.hue},80%,65%,${d.op||0.4*d.life})`;ctx.fill();
     }

     /* Vignette finale */
     const vg=ctx.createRadialGradient(cx,cy,H*0.1,cx,cy,H*0.9);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,'rgba(0,0,5,0.15)');
     vg.addColorStop(1,'rgba(0,0,8,0.90)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
