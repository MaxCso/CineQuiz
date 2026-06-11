// CinéQuiz splash chunk — Les Goonies
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Les Goonies"]={
   name:'Les Goonies',
   color:'40,120,200',
   ref:'Les Goonies \u2014 Richard Donner, 1985',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.80';
    let t=0;
    const cx=W/2;

    let _goS=document.getElementById('_go_s');
    if(!_goS){_goS=document.createElement('style');_goS.id='_go_s';document.head.appendChild(_goS);}
    _goS.textContent='#splash-content-wrap{top:68%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _goW=setInterval(()=>{if(stop.v){_goS.textContent='';clearInterval(_goW);}},200);

    /* Pieces d or */
    const coins=Array.from({length:26},()=>({
     x:Math.random()*W, y:H*0.4+Math.random()*H*0.4,
     vx:(Math.random()-0.5)*1.4, vy:-(Math.random()*1.6+0.5),
     r:Math.random()*6+3, rot:Math.random()*Math.PI*2, vrot:(Math.random()-0.5)*0.08
    }));

    /* Etoiles visibles dans l ouverture */
    const stars=Array.from({length:60},()=>({
     x:W*0.22+Math.random()*W*0.56, y:Math.random()*H*0.28,
     r:Math.random()*1.0+0.2, op:Math.random()*0.7+0.2,
     tw:Math.random()*Math.PI*2, tf:0.02+Math.random()*0.035
    }));

    /* Gouttelettes d eau */
    const drops=Array.from({length:14},()=>({
     x:W*(0.22+Math.random()*0.56), y:Math.random()*H*0.5,
     vy:1.2+Math.random()*2.0, trail:[], splashOp:0, splashR:0
    }));

    /* Particules de poussiere */
    const dust=Array.from({length:30},()=>({
     x:Math.random()*W*0.6+W*0.2, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18, vy:-(Math.random()*0.12+0.04),
     r:Math.random()*1.4+0.4, op:Math.random()*0.25+0.05
    }));

    function drawTreasureChest(tx,ty){
     const cs=W*0.15;
     ctx.save(); ctx.translate(tx,ty);
     const shadow=ctx.createRadialGradient(0,cs*0.52,2,0,cs*0.52,cs*0.7);
     shadow.addColorStop(0,'rgba(0,0,0,0.45)'); shadow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shadow; ctx.beginPath(); ctx.ellipse(0,cs*0.54,cs*0.7,cs*0.14,0,0,Math.PI*2); ctx.fill();
     const cg=ctx.createLinearGradient(-cs*0.5,0,cs*0.5,cs*0.5);
     cg.addColorStop(0,'rgba(110,65,18,0.97)'); cg.addColorStop(1,'rgba(60,32,8,0.99)');
     ctx.fillStyle=cg; ctx.beginPath(); ctx.roundRect(-cs*0.5,0,cs,cs*0.50,4); ctx.fill();
     ctx.strokeStyle='rgba(180,115,25,0.65)'; ctx.lineWidth=1.5;
     ctx.beginPath(); ctx.roundRect(-cs*0.5,0,cs,cs*0.50,4); ctx.stroke();
     ctx.strokeStyle='rgba(160,110,20,0.45)'; ctx.lineWidth=1.2;
     ctx.beginPath(); ctx.moveTo(-cs*0.5,cs*0.18); ctx.lineTo(cs*0.5,cs*0.18); ctx.stroke();
     ctx.beginPath(); ctx.moveTo(-cs*0.5,cs*0.36); ctx.lineTo(cs*0.5,cs*0.36); ctx.stroke();
     const lid=ctx.createLinearGradient(-cs*0.5,-cs*0.30,cs*0.5,0);
     lid.addColorStop(0,'rgba(120,75,20,0.96)'); lid.addColorStop(0.6,'rgba(85,48,12,0.98)'); lid.addColorStop(1,'rgba(65,36,8,0.99)');
     ctx.fillStyle=lid;
     ctx.beginPath();
     ctx.moveTo(-cs*0.5,0); ctx.bezierCurveTo(-cs*0.5,-cs*0.32,cs*0.5,-cs*0.32,cs*0.5,0); ctx.closePath();
     ctx.fill();
     ctx.strokeStyle='rgba(180,115,25,0.55)'; ctx.lineWidth=1.5;
     ctx.beginPath();
     ctx.moveTo(-cs*0.5,0); ctx.bezierCurveTo(-cs*0.5,-cs*0.32,cs*0.5,-cs*0.32,cs*0.5,0);
     ctx.stroke();
     ctx.strokeStyle=`rgba(230,180,35,${0.88+Math.sin(t*2.2)*0.10})`; ctx.lineWidth=2.5;
     ctx.beginPath(); ctx.arc(0,-cs*0.11,cs*0.115,0,Math.PI*2); ctx.stroke();
     const lockG=ctx.createRadialGradient(-cs*0.03,-cs*0.14,1,0,-cs*0.11,cs*0.07);
     lockG.addColorStop(0,'rgba(255,220,60,0.98)'); lockG.addColorStop(1,'rgba(190,138,18,0.82)');
     ctx.fillStyle=lockG; ctx.beginPath(); ctx.arc(0,-cs*0.11,cs*0.055,0,Math.PI*2); ctx.fill();
     const glowG=ctx.createRadialGradient(0,cs*0.15,1,0,cs*0.15,cs*0.38);
     glowG.addColorStop(0,`rgba(255,195,35,${0.42+Math.sin(t*1.9)*0.14})`);
     glowG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glowG; ctx.fillRect(-cs*0.5,0,cs,cs*0.50);
     ctx.restore();
    }

    function drawWalls(){
     ctx.fillStyle='rgba(14,9,4,0.97)';
     ctx.beginPath();
     ctx.moveTo(0,0); ctx.lineTo(W*0.24,0);
     ctx.lineTo(W*0.20,H*0.12); ctx.lineTo(W*0.25,H*0.22);
     ctx.lineTo(W*0.16,H*0.32); ctx.lineTo(W*0.20,H*0.42);
     ctx.lineTo(W*0.12,H*0.52); ctx.lineTo(W*0.17,H*0.63);
     ctx.lineTo(W*0.13,H*0.75); ctx.lineTo(W*0.18,H*0.88);
     ctx.lineTo(W*0.14,H); ctx.lineTo(0,H);
     ctx.closePath(); ctx.fill();
     ctx.fillStyle='rgba(30,18,7,0.35)';
     ctx.beginPath();
     ctx.moveTo(0,0); ctx.lineTo(W*0.10,0);
     ctx.lineTo(W*0.08,H*0.3); ctx.lineTo(W*0.04,H*0.6); ctx.lineTo(0,H);
     ctx.closePath(); ctx.fill();
     ctx.fillStyle='rgba(14,9,4,0.97)';
     ctx.beginPath();
     ctx.moveTo(W,0); ctx.lineTo(W*0.76,0);
     ctx.lineTo(W*0.80,H*0.12); ctx.lineTo(W*0.75,H*0.22);
     ctx.lineTo(W*0.84,H*0.32); ctx.lineTo(W*0.80,H*0.42);
     ctx.lineTo(W*0.88,H*0.52); ctx.lineTo(W*0.83,H*0.63);
     ctx.lineTo(W*0.87,H*0.75); ctx.lineTo(W*0.82,H*0.88);
     ctx.lineTo(W*0.86,H); ctx.lineTo(W,H);
     ctx.closePath(); ctx.fill();
     ctx.fillStyle='rgba(30,18,7,0.35)';
     ctx.beginPath();
     ctx.moveTo(W,0); ctx.lineTo(W*0.90,0);
     ctx.lineTo(W*0.92,H*0.3); ctx.lineTo(W*0.96,H*0.6); ctx.lineTo(W,H);
     ctx.closePath(); ctx.fill();
     ctx.fillStyle='rgba(10,6,2,0.92)';
     ctx.beginPath();
     ctx.moveTo(0,H); ctx.lineTo(W,H); ctx.lineTo(W,H*0.88);
     ctx.lineTo(W*0.85,H*0.86); ctx.lineTo(W*0.70,H*0.88);
     ctx.lineTo(W*0.55,H*0.85); ctx.lineTo(cx,H*0.87);
     ctx.lineTo(W*0.40,H*0.85); ctx.lineTo(W*0.25,H*0.88);
     ctx.lineTo(W*0.12,H*0.86); ctx.lineTo(0,H*0.88);
     ctx.closePath(); ctx.fill();
    }

    function drawTorches(){
     for(const [tx2,ty2,side] of [[W*0.195,H*0.30,-1],[W*0.805,H*0.30,1]]){
      const fl=0.55+Math.sin(t*11.3+tx2*0.01)*0.28+Math.sin(t*17.7+tx2*0.02)*0.12;
      const tg=ctx.createRadialGradient(tx2,ty2,2,tx2,ty2,W*0.18);
      tg.addColorStop(0,`rgba(255,155,35,${fl*0.55})`);
      tg.addColorStop(0.35,`rgba(210,90,15,${fl*0.18})`);
      tg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=tg; ctx.fillRect(tx2-W*0.18,ty2-W*0.18,W*0.36,W*0.36);
      ctx.fillStyle='rgba(80,50,20,0.95)';
      ctx.fillRect(tx2-2,ty2,4,H*0.042);
      ctx.save(); ctx.translate(tx2,ty2);
      const fh=H*0.030*fl;
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.bezierCurveTo(-4,-fh*0.4,-3,-fh*0.9+side*2,0,-fh);
      ctx.bezierCurveTo(3,-fh*0.9-side*2,4,-fh*0.4,0,0);
      ctx.fillStyle=`rgba(255,${170+Math.sin(t*8)*20|0},40,${fl})`;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0,-2);
      ctx.bezierCurveTo(-2,-fh*0.35,2,-fh*0.35,0,-fh*0.6);
      ctx.fillStyle=`rgba(255,240,180,${fl*0.7})`;
      ctx.fill();
      ctx.restore();
     }
    }

    function frame(){
     if(stop.v)return;

     ctx.fillStyle='rgba(5,3,1,0.22)'; ctx.fillRect(0,0,W,H);

     const skyG=ctx.createRadialGradient(cx,0,0,cx,0,H*0.35);
     skyG.addColorStop(0,'rgba(8,12,28,0.55)');
     skyG.addColorStop(0.5,'rgba(5,8,18,0.35)');
     skyG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=skyG; ctx.fillRect(W*0.22,0,W*0.56,H*0.35);

     for(const s of stars){
      s.tw+=s.tf;
      const op=s.op*(0.4+Math.sin(s.tw)*0.6);
      ctx.fillStyle=`rgba(255,250,220,${op})`;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
     }

     drawWalls();
     drawTorches();
     drawTreasureChest(cx, H*0.46);

     const tg=ctx.createRadialGradient(cx,H*0.50,8,cx,H*0.50,W*0.42);
     tg.addColorStop(0,`rgba(230,165,22,${0.22+Math.sin(t*1.6)*0.08})`);
     tg.addColorStop(0.4,'rgba(160,105,12,0.09)');
     tg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tg; ctx.fillRect(0,H*0.25,W,H*0.5);

     for(const c of coins){
      c.y+=c.vy; c.x+=c.vx; c.rot+=c.vrot;
      if(c.y<-c.r*4){c.y=H*0.82;c.x=cx+(Math.random()-0.5)*W*0.38;c.vy=-(Math.random()*1.6+0.5);}
      const scaleX=Math.abs(Math.cos(c.rot))*0.88+0.12;
      ctx.save(); ctx.translate(c.x,c.y); ctx.scale(scaleX,1);
      const cg=ctx.createRadialGradient(-c.r*0.2,-c.r*0.2,0.5,0,0,c.r);
      cg.addColorStop(0,'rgba(255,215,55,0.96)');
      cg.addColorStop(0.5,'rgba(205,152,18,0.82)');
      cg.addColorStop(1,'rgba(145,92,5,0.68)');
      ctx.fillStyle=cg;
      ctx.beginPath(); ctx.arc(0,0,c.r,0,Math.PI*2); ctx.fill();
      ctx.restore();
     }

     for(const d of drops){
      d.y+=d.vy;
      d.trail.unshift({x:d.x,y:d.y});
      if(d.trail.length>5) d.trail.pop();
      if(d.y>H*0.85){
       d.splashOp=0.7; d.splashR=0;
       d.y=Math.random()*H*0.35+H*0.04;
       d.x=W*(0.22+Math.random()*0.56);
       d.trail=[];
      }
      for(let i=0;i<d.trail.length;i++){
       ctx.fillStyle=`rgba(160,200,230,${0.18-i*0.035})`;
       ctx.beginPath(); ctx.arc(d.trail[i].x,d.trail[i].y,0.8,0,Math.PI*2); ctx.fill();
      }
      ctx.fillStyle='rgba(180,215,240,0.65)';
      ctx.beginPath(); ctx.ellipse(d.x,d.y,1.2,2.4,0,0,Math.PI*2); ctx.fill();
      if(d.splashOp>0){
       d.splashR+=1.5; d.splashOp-=0.06;
       ctx.strokeStyle=`rgba(160,200,225,${d.splashOp*0.5})`;
       ctx.lineWidth=0.7;
       ctx.beginPath(); ctx.ellipse(d.x,H*0.85,d.splashR,d.splashR*0.22,0,0,Math.PI*2); ctx.stroke();
      }
     }

     for(const p of dust){
      p.x+=p.vx+Math.sin(t*0.6+p.y*0.01)*0.08;
      p.y+=p.vy;
      if(p.y<-4) p.y=H*0.9;
      ctx.fillStyle=`rgba(220,180,60,${p.op})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
     }

     const vg=ctx.createRadialGradient(cx,H*0.46,H*0.06,cx,H*0.46,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(2,1,0,0.22)');
     vg.addColorStop(1,'rgba(0,0,0,0.97)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
