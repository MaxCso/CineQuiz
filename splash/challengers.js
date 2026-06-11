// CinéQuiz splash chunk — Challengers
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Challengers"]={
   name:'Challengers',
   color:'200,100,40',
   ref:'Challengers \u2014 Luca Guadagnino, 2024',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_chal_s');
    if(!_s){_s=document.createElement('style');_s.id='_chal_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:26%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Balle de tennis — point de vue balle (POV) */
    let ballX=cx,ballY=H*0.30,ballVX=W*0.0065,ballVY=H*0.0045;
    const ballR=W*0.022;
    /* Traînées */
    const tenniTrail=Array.from({length:12},()=>({x:ballX,y:ballY,op:0}));
    let tIdx=0;
    /* Court de tennis */
    const courtY=H*0.72;
    /* Particules terre battue */
    const clay=Array.from({length:25},()=>({x:Math.random()*W,y:H*(0.70+Math.random()*0.22),vx:(Math.random()-0.5)*0.20,vy:-(0.08+Math.random()*0.15),r:Math.random()*2.0+0.4,op:0.15+Math.random()*0.22,life:1.0}));
    /* Soleil d'été */

    function frame(){
     if(stop.v)return;
     /* Rebond balle de tennis */
     ballX+=ballVX;ballY+=ballVY;
     if(ballX<ballR||ballX>W-ballR)ballVX*=-1;
     if(ballY<ballR||ballY>courtY)ballVY*=-1;
     if(ballY>=courtY-ballR){ballVY=-(Math.abs(ballVY)*0.90+H*0.002);ballY=courtY-ballR;/* Projette terre battue */for(const c2 of clay){if(c2.life<=0){c2.x=ballX+(Math.random()-0.5)*W*0.06;c2.y=courtY;c2.vx=(Math.random()-0.5)*0.50;c2.vy=-(0.20+Math.random()*0.40);c2.life=0.8+Math.random()*0.4;break;}}}
     tenniTrail[tIdx]={x:ballX,y:ballY,op:0.65};tIdx=(tIdx+1)%tenniTrail.length;

     /* Coucher de soleil été — terra cotta */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#0e0500');bg.addColorStop(0.30,'#1c0a00');bg.addColorStop(0.58,'#2e1200');bg.addColorStop(1,'#381800');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Soleil de fin de tournoi */
     const sunG=ctx.createRadialGradient(cx*1.3,H*0.28,0,cx*1.3,H*0.28,W*0.40);
     sunG.addColorStop(0,'rgba(255,170,30,0.50)');sunG.addColorStop(0.3,'rgba(220,90,0,0.10)');sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H);
     ctx.fillStyle='rgba(255,155,15,0.95)';ctx.beginPath();ctx.arc(cx*1.3,H*0.28,W*0.055,0,Math.PI*2);ctx.fill();

     /* Court terre battue */
     const courtG=ctx.createLinearGradient(0,courtY,0,H);
     courtG.addColorStop(0,'rgba(180,80,20,0.88)');courtG.addColorStop(0.5,'rgba(160,65,15,0.92)');courtG.addColorStop(1,'rgba(130,50,10,0.95)');
     ctx.fillStyle=courtG;ctx.fillRect(0,courtY,W,H-courtY);
     /* Lignes blanches du court */
     ctx.strokeStyle='rgba(240,235,225,0.55)';ctx.lineWidth=1.5;
     ctx.beginPath();ctx.moveTo(W*0.08,courtY);ctx.lineTo(W*0.08,H);ctx.stroke();
     ctx.beginPath();ctx.moveTo(W*0.92,courtY);ctx.lineTo(W*0.92,H);ctx.stroke();
     ctx.beginPath();ctx.moveTo(W*0.08,courtY+H*0.06);ctx.lineTo(W*0.92,courtY+H*0.06);ctx.stroke();
     /* Filet */
     ctx.strokeStyle='rgba(220,210,195,0.50)';ctx.lineWidth=2;
     ctx.beginPath();ctx.moveTo(W*0.05,courtY);ctx.lineTo(W*0.95,courtY);ctx.stroke();

     /* Terre battue projetée */
     for(const c2 of clay){
      if(c2.life<=0)continue;
      c2.x+=c2.vx;c2.y+=c2.vy;c2.vy+=0.025;c2.life-=0.018;
      ctx.beginPath();ctx.arc(c2.x,c2.y,c2.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,90,25,${c2.op*c2.life})`;ctx.fill();
     }

     /* Traînée balle */
     for(let i=0;i<tenniTrail.length;i++){
      const ti=(tIdx-i-1+tenniTrail.length)%tenniTrail.length;
      const tr=tenniTrail[ti];
      if(tr.op<=0)continue;
      ctx.beginPath();ctx.arc(tr.x,tr.y,ballR*(0.35+i*0.06),0,Math.PI*2);
      ctx.fillStyle=`rgba(220,220,60,${tr.op*(1-i/tenniTrail.length)*0.40})`;ctx.fill();
      tr.op*=0.80;
     }

     /* Balle de tennis */
     const tg=ctx.createRadialGradient(ballX-ballR*0.3,ballY-ballR*0.3,0,ballX,ballY,ballR);
     tg.addColorStop(0,'rgba(220,230,60,0.98)');tg.addColorStop(0.65,'rgba(200,210,40,0.88)');tg.addColorStop(1,'rgba(160,170,20,0.60)');
     ctx.fillStyle=tg;ctx.beginPath();ctx.arc(ballX,ballY,ballR,0,Math.PI*2);ctx.fill();
     /* Coutures */
     ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=0.8;
     ctx.beginPath();ctx.arc(ballX,ballY,ballR*0.55,0.2,Math.PI-0.2);ctx.stroke();
     ctx.beginPath();ctx.arc(ballX,ballY,ballR*0.55,Math.PI+0.2,Math.PI*2-0.2);ctx.stroke();

     /* Deux joueurs de chaque côté */
     for(let i=0;i<2;i++){
      const baseX=W*(i===0?0.22:0.78);
      const py=courtY;

      /* ── Animation : déplacement latéral + rebond + swing ── */
      const phase=t*1.6+(i===0?0:Math.PI); /* déphasés */
      const sideStep=Math.sin(phase)*W*0.045; /* mouvement latéral */
      const bounce=-Math.abs(Math.sin(phase*2))*H*0.025; /* rebond vertical */
      const swing=Math.sin(t*2.2+(i===0?0:Math.PI+0.8))*0.55; /* swing raquette */
      const legL=Math.sin(phase*2)*0.30; /* jambe gauche */
      const legR=-Math.sin(phase*2)*0.30; /* jambe droite */

      const px=baseX+sideStep;
      const footY=py+bounce;

      /* Dimensions — basées sur H pour des proportions correctes */
      const headR=H*0.038;
      const bodyH=H*0.110;
      const bodyW=H*0.038;
      const legLen=H*0.095;
      const armLen=H*0.075;
      const racketR=H*0.048;
      const limbW=H*0.022;

      /* Halo chaud derrière le joueur — contre-jour soleil */
      const plHalo=ctx.createRadialGradient(px,footY-bodyH-headR,0,px,footY-bodyH-headR,H*0.18);
      plHalo.addColorStop(0,`rgba(255,140,20,${0.18+Math.sin(t*0.4+i)*0.04})`);
      plHalo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=plHalo;ctx.fillRect(px-H*0.20,footY-H*0.40,H*0.40,H*0.42);

      ctx.fillStyle='rgba(22,10,2,0.98)';
      ctx.strokeStyle='rgba(22,10,2,0.98)';
      ctx.lineCap='round';

      /* Jambes */
      ctx.lineWidth=limbW;
      /* Jambe gauche */
      const lLegEndX=px-bodyW*0.5+Math.sin(legL)*legLen*0.55;
      const lLegEndY=footY+Math.cos(legL)*legLen*0.55;
      ctx.beginPath();ctx.moveTo(px-bodyW*0.4,footY-legLen*0.12);ctx.lineTo(lLegEndX,lLegEndY);ctx.stroke();
      /* Pied gauche */
      ctx.beginPath();ctx.ellipse(lLegEndX+(i===0?H*0.010:-H*0.010),lLegEndY,H*0.022,H*0.010,legL*0.3,0,Math.PI*2);ctx.fill();
      /* Jambe droite */
      const rLegEndX=px+bodyW*0.5+Math.sin(legR)*legLen*0.55;
      const rLegEndY=footY+Math.cos(legR)*legLen*0.55;
      ctx.beginPath();ctx.moveTo(px+bodyW*0.4,footY-legLen*0.12);ctx.lineTo(rLegEndX,rLegEndY);ctx.stroke();
      /* Pied droit */
      ctx.beginPath();ctx.ellipse(rLegEndX+(i===0?H*0.010:-H*0.010),rLegEndY,H*0.022,H*0.010,legR*0.3,0,Math.PI*2);ctx.fill();

      /* Corps */
      ctx.beginPath();ctx.ellipse(px,footY-legLen*0.12-bodyH*0.5,bodyW,bodyH*0.5,0,0,Math.PI*2);ctx.fill();

      /* Bras libre (côté opposé à la raquette) */
      const freeArmDir=i===0?-1:1;
      const freeArmAng=-0.4+Math.sin(t*2.2+(i===0?Math.PI:0))*0.35;
      ctx.lineWidth=limbW*0.85;
      const freeArmEndX=px+freeArmDir*Math.sin(freeArmAng+0.5)*armLen;
      const freeArmEndY=footY-legLen*0.12-bodyH*0.85+Math.cos(freeArmAng)*armLen*0.5;
      ctx.beginPath();ctx.moveTo(px,footY-legLen*0.12-bodyH*0.75);ctx.lineTo(freeArmEndX,freeArmEndY);ctx.stroke();

      /* Bras raquette */
      const racketDir=i===0?1:-1;
      const racketAng=swing*0.65;
      const armEndX=px+racketDir*(armLen*0.70+Math.sin(racketAng)*armLen*0.40);
      const armEndY=footY-legLen*0.12-bodyH*0.85+Math.abs(Math.cos(racketAng))*armLen*0.35-armLen*0.10;
      ctx.lineWidth=limbW*0.85;
      ctx.beginPath();ctx.moveTo(px,footY-legLen*0.12-bodyH*0.75);ctx.lineTo(armEndX,armEndY);ctx.stroke();

      /* Raquette */
      ctx.save();
      ctx.translate(armEndX+racketDir*racketR*0.55,armEndY-racketR*0.10);
      ctx.rotate(racketAng*0.8+(i===0?0.3:-0.3));
      ctx.strokeStyle='rgba(60,35,8,0.90)';ctx.lineWidth=H*0.016;
      ctx.beginPath();ctx.ellipse(0,0,racketR,racketR*0.80,0,0,Math.PI*2);ctx.stroke();
      /* Cordage */
      ctx.strokeStyle='rgba(220,210,170,0.40)';ctx.lineWidth=0.8;
      ctx.beginPath();ctx.moveTo(-racketR,0);ctx.lineTo(racketR,0);ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,-racketR*0.80);ctx.lineTo(0,racketR*0.80);ctx.stroke();
      /* Manche */
      ctx.strokeStyle='rgba(22,10,2,0.92)';ctx.lineWidth=limbW*0.75;
      ctx.beginPath();ctx.moveTo(0,racketR*0.80);ctx.lineTo(0,racketR*1.45);ctx.stroke();
      ctx.restore();

      /* Tête */
      ctx.fillStyle='rgba(22,10,2,0.98)';
      ctx.beginPath();ctx.arc(px,footY-legLen*0.12-bodyH-headR*0.55,headR,0,Math.PI*2);ctx.fill();
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
