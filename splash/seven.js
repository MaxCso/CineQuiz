// CinéQuiz splash chunk — Seven
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Seven"]={
   name:'Seven',
   color:'60,90,70',
   ref:'Seven \u2014 David Fincher, 1995',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── CSS centrage ── */
    let _svS=document.getElementById('_sv_splash_style');
    if(!_svS){_svS=document.createElement('style');_svS.id='_sv_splash_style';document.head.appendChild(_svS);}
    _svS.textContent=`
      #splash-content-wrap{top:30%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _svW=setInterval(()=>{if(stop.v){_svS.textContent='';clearInterval(_svW);}},200);

    /* ── Image de fond Seven.png ── */
    const bgImg=new Image();
    let bgReady=false;
    bgImg.onload=()=>{bgReady=true;};
    bgImg.src='images/Seven.png';

    /* ── Pluie fine et lente ── */
    const rain=Array.from({length:80},()=>({
     x:Math.random()*W*1.1-W*0.05,
     y:Math.random()*H,
     len:H*(0.012+Math.random()*0.014),
     spd:H*(0.003+Math.random()*0.003),
     op:0.04+Math.random()*0.07,
     drift:-Math.random()*0.25-0.05,
    }));

    /* ── Gouttes sur vitre ── */
    const drops=Array.from({length:22},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.85,
     r:Math.random()*2.2+0.8,
     spd:0.08+Math.random()*0.18,
     op:0.10+Math.random()*0.18,
     trail:[],
     pause:Math.random()*180,
     wobble:0,
     wobbleSpd:(Math.random()-0.5)*0.04,
    }));

    /* ── Brume rampante (bas du canvas) ── */
    const mists=Array.from({length:5},(_,i)=>({
     x:Math.random()*W,
     y:H*(0.80+i*0.04+Math.random()*0.04),
     w:W*(0.45+Math.random()*0.50),
     op:0.05+Math.random()*0.07,
     ph:Math.random()*Math.PI*2,
     spd:0.003+Math.random()*0.004,
     dx:0.05+Math.random()*0.12,
    }));

    /* ── Flash stroboscopique (scène de crime) ── */
    let flashOp=0;
    let flashTimer=Math.random()*1800+1200; // ~20-50 secondes entre flashs

    /* ── Grain filmique ── */
    // Pré-générer un tableau de positions pour le grain
    const grainCount=2200;
    const grainX=new Float32Array(grainCount);
    const grainY=new Float32Array(grainCount);
    for(let i=0;i<grainCount;i++){grainX[i]=Math.random()*W;grainY[i]=Math.random()*H;}

    /* ── Particules de poussière flottantes ── */
    const dust=Array.from({length:120},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     r:Math.random()*1.6+0.3,
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.04+Math.random()*0.12),
     op:Math.random()*0.20+0.04,
     ph:Math.random()*Math.PI*2,
     freq:0.006+Math.random()*0.018,
     col:Math.random()>0.5?'120,145,130':'160,175,155',
    }));

    /* ── Vignette : amplitude pulsante ── */
    let vigPulse=0;

    function frame(){
     if(stop.v)return;

     /* ── Image de fond plein-canvas (cover) ── */
     if(bgReady){
      ctx.save();
      ctx.globalAlpha=1.0;
      const ir=bgImg.naturalWidth/bgImg.naturalHeight;
      const cr=W/H;
      let dw,dh,dx,dy;
      if(ir>cr){dh=H;dw=dh*ir;dx=(W-dw)/2;dy=0;}
      else{dw=W;dh=dw/ir;dx=0;dy=(H-dh)/2;}
      ctx.drawImage(bgImg,dx,dy,dw,dh);
      ctx.restore();
     } else {
      ctx.fillStyle='#0d1410';ctx.fillRect(0,0,W,H);
     }

     /* ── Overlay froid vert-gris très léger ── */
     ctx.fillStyle='rgba(8,18,12,0.14)';ctx.fillRect(0,0,W,H);

     /* ── Brume rampante en bas ── */
     for(const m of mists){
      m.x+=m.dx;m.ph+=m.spd;
      if(m.x>W+m.w*0.5)m.x=-m.w*0.5;
      const mg=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.w*0.5);
      mg.addColorStop(0,`rgba(40,55,45,${m.op*(0.7+0.3*Math.sin(m.ph))})`);
      mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;ctx.beginPath();ctx.ellipse(m.x,m.y,m.w*0.5,H*0.06,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Pluie fine ── */
     for(const d of rain){
      d.y+=d.spd;d.x+=d.drift;
      if(d.y>H+d.len){d.y=-d.len;d.x=Math.random()*W*1.1-W*0.05;}
      ctx.strokeStyle=`rgba(80,105,90,${d.op})`;ctx.lineWidth=0.5;
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+d.drift*3,d.y+d.len);ctx.stroke();
     }

     /* ── Gouttes sur vitre ── */
     for(const dr of drops){
      if(dr.pause>0){dr.pause--;continue;}
      dr.wobble+=dr.wobbleSpd;
      const wx=Math.sin(dr.wobble)*1.8;
      dr.x+=wx*0.1;
      dr.y+=dr.spd;
      // traîne
      dr.trail.push({x:dr.x,y:dr.y});
      if(dr.trail.length>12)dr.trail.shift();
      if(dr.trail.length>1){
       ctx.beginPath();ctx.moveTo(dr.trail[0].x,dr.trail[0].y);
       for(let i=1;i<dr.trail.length;i++)ctx.lineTo(dr.trail[i].x,dr.trail[i].y);
       ctx.strokeStyle=`rgba(120,160,140,${dr.op*0.35})`;
       ctx.lineWidth=dr.r*0.6;ctx.stroke();
      }
      // goutte
      ctx.beginPath();ctx.arc(dr.x,dr.y,dr.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(130,170,150,${dr.op})`;ctx.fill();
      // reset
      if(dr.y>H+dr.r){
       dr.y=-(Math.random()*H*0.3);dr.x=Math.random()*W;
       dr.trail=[];dr.pause=Math.random()*240+60;
       dr.spd=0.08+Math.random()*0.18;
      }
     }

     /* ── Particules de poussière flottantes ── */
     for(const d of dust){
      d.x+=d.vx+Math.sin(t*0.7+d.ph)*0.08;
      d.y+=d.vy;
      d.ph+=d.freq;
      if(d.y<-d.r){d.y=H+d.r;d.x=Math.random()*W;}
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      const dop=d.op*(0.5+0.5*Math.sin(d.ph));
      if(dop<0.01)continue;
      const dg=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*2.2);
      dg.addColorStop(0,`rgba(${d.col},${dop})`);
      dg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=dg;ctx.beginPath();ctx.arc(d.x,d.y,d.r*2.2,0,Math.PI*2);ctx.fill();
     }

     /* ── Grain filmique ── */
     // Chaque frame on bouge aléatoirement les points
     for(let i=0;i<grainCount;i++){
      grainX[i]=Math.random()*W;
      grainY[i]=Math.random()*H;
      const gop=Math.random()*0.055;
      if(gop<0.005)continue;
      ctx.fillStyle=`rgba(255,255,255,${gop})`;
      ctx.fillRect(grainX[i],grainY[i],1,1);
     }

     /* ── Flash stroboscopique ── */
     flashTimer--;
     if(flashTimer<=0){
      flashOp=0.38+Math.random()*0.25;
      flashTimer=Math.random()*2400+1400;
     }
     if(flashOp>0.005){
      ctx.fillStyle=`rgba(210,230,215,${flashOp*0.22})`;ctx.fillRect(0,0,W,H);
      flashOp*=0.72;
     }

     /* ── Vignette pulsante ── */
     vigPulse=0.88+Math.sin(t*0.18)*0.06;
     const vg=ctx.createRadialGradient(cx,H*0.52,H*0.05,cx,H*0.52,H*0.84);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(0,0,0,0.10)');
     vg.addColorStop(0.72,'rgba(0,0,0,0.48)');
     vg.addColorStop(1,`rgba(0,0,0,${vigPulse})`);
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     /* Bande noire en haut */
     const vgT=ctx.createLinearGradient(0,0,0,H*0.10);
     vgT.addColorStop(0,'rgba(0,0,0,0.55)');vgT.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgT;ctx.fillRect(0,0,W,H*0.10);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
