// CinéQuiz splash chunk — Pulp Fiction
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Pulp Fiction"]={
   name:'Pulp Fiction',
   color:'200,160,30',
   ref:'Pulp Fiction \u2014 Quentin Tarantino, 1994',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── CSS position ── */
    let _pfS=document.getElementById('_pf_pos_s');
    if(!_pfS){_pfS=document.createElement('style');_pfS.id='_pf_pos_s';document.head.appendChild(_pfS);}
    _pfS.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _pfW=setInterval(()=>{if(stop.v){_pfS.textContent='';clearInterval(_pfW);}},200);

    /* ── Sol damier (diner) — pré-rendu ── */
    const floorC=document.createElement('canvas');
    floorC.width=W;floorC.height=H;
    const fx=floorC.getContext('2d');
    const floorY=H*0.68;
    const tileS=Math.min(W,H)*0.09;
    const cols=Math.ceil(W/tileS)+2;
    const rows=Math.ceil((H-floorY)/tileS)+2;
    for(let r=0;r<rows;r++){
     for(let c=0;c<cols;c++){
      const p=r/rows;
      const tw=tileS*(0.35+p*0.85);
      const tx=(c-(cols/2))*(tw)+W/2;
      const ty=floorY+r*tileS*0.52;
      const isBlack=(r+c)%2===0;
      fx.fillStyle=isBlack?'rgba(6,5,3,0.97)':'rgba(22,18,11,0.92)';
      fx.fillRect(tx-tw/2,ty,tw,tileS*0.52+1);
      fx.strokeStyle='rgba(3,2,1,0.9)';fx.lineWidth=0.7;
      fx.strokeRect(tx-tw/2,ty,tw,tileS*0.52);
     }
    }
    const floorFog=fx.createLinearGradient(0,floorY,0,H);
    floorFog.addColorStop(0,'rgba(0,0,0,0)');
    floorFog.addColorStop(0.35,'rgba(0,0,0,0.25)');
    floorFog.addColorStop(1,'rgba(0,0,0,0.85)');
    fx.fillStyle=floorFog;fx.fillRect(0,floorY,W,H-floorY);

    /* ── Valise — dimensions ── */
    const bcx=W*0.5, bcy=H*0.74;
    const bW=W*0.58, bH=bW*0.46;
    const dep=bW*0.055, depT=bH*0.045;

    /* ── Fumée de cigarette — particules ── */
    const smoke=Array.from({length:28},(_,i)=>({
     x: W*(0.18+Math.random()*0.64),
     y: H*(0.55+Math.random()*0.20),
     vy:-(0.22+Math.random()*0.35),
     vx:(Math.random()-0.5)*0.18,
     r: 4+Math.random()*14,
     op: 0.04+Math.random()*0.10,
     ph: Math.random()*Math.PI*2,
     wobble: Math.random()*Math.PI*2,
     wobbleSpd: 0.008+Math.random()*0.012
    }));

    /* ── Grain pellicule — offscreen ── */
    const grainC=document.createElement('canvas');
    grainC.width=W;grainC.height=H;
    const gx=grainC.getContext('2d');
    const grainData=gx.createImageData(W,H);
    for(let i=0;i<grainData.data.length;i+=4){
     const v=Math.random()*60|0;
     grainData.data[i]=grainData.data[i+1]=grainData.data[i+2]=v;
     grainData.data[i+3]=Math.random()>0.55?18:0;
    }
    gx.putImageData(grainData,0,0);

    function drawBriefcase(){
     ctx.save();ctx.translate(bcx,bcy);
     const flick=Math.sin(t*0.65)*0.5+Math.sin(t*1.25)*0.28;
     const openAmt=0.052+flick*0.018;
     const glowInt=0.88+flick*0.14;

     /* ── Faisceau de lumière élargi ── */
     const beamH=H*0.72;
     const beam=ctx.createLinearGradient(0,-bH*0.5,0,-bH*0.5-beamH);
     beam.addColorStop(0,`rgba(255,225,85,${0.60*glowInt})`);
     beam.addColorStop(0.08,`rgba(255,205,65,${0.32*glowInt})`);
     beam.addColorStop(0.30,`rgba(240,175,45,${0.12*glowInt})`);
     beam.addColorStop(0.65,`rgba(220,150,30,${0.04*glowInt})`);
     beam.addColorStop(1,'rgba(0,0,0,0)');
     ctx.beginPath();
     ctx.moveTo(-bW*0.32,-bH*0.5);
     ctx.lineTo(-W*0.82,-bH*0.5-beamH);
     ctx.lineTo( W*0.82,-bH*0.5-beamH);
     ctx.lineTo( bW*0.32,-bH*0.5);
     ctx.closePath();ctx.fillStyle=beam;ctx.fill();

     /* Halo radial autour de la valise */
     const halo=ctx.createRadialGradient(0,-bH*0.3,0,0,-bH*0.3,bW*2.2);
     halo.addColorStop(0,`rgba(255,215,75,${0.22*glowInt})`);
     halo.addColorStop(0.25,`rgba(210,160,30,${0.09*glowInt})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(-bW*2.8,-bH*3.8,bW*5.6,bH*6);

     /* Reflet de la lumière sur le sol */
     const floorGlow=ctx.createRadialGradient(0,bH*0.1,0,0,bH*0.1,bW*1.1);
     floorGlow.addColorStop(0,`rgba(255,200,60,${0.16*glowInt})`);
     floorGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=floorGlow;ctx.beginPath();ctx.ellipse(0,bH*0.1,bW*1.1,bH*0.18,0,0,Math.PI*2);ctx.fill();

     /* ── Tranche droite ── */
     ctx.fillStyle='rgb(10,10,10)';
     ctx.beginPath();
     ctx.moveTo(bW/2,-bH);ctx.lineTo(bW/2+dep,-bH-depT);
     ctx.lineTo(bW/2+dep,depT*0.1);ctx.lineTo(bW/2,0);
     ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(45,45,45,0.5)';ctx.lineWidth=0.7;
     ctx.beginPath();ctx.moveTo(bW/2+dep,-bH-depT);ctx.lineTo(bW/2+dep,depT*0.1);ctx.stroke();

     /* ── Dessus ── */
     ctx.fillStyle='rgb(15,15,15)';
     ctx.beginPath();
     ctx.moveTo(-bW/2,-bH);ctx.lineTo(bW/2,-bH);
     ctx.lineTo(bW/2+dep,-bH-depT);ctx.lineTo(-bW/2+dep,-bH-depT);
     ctx.closePath();ctx.fill();

     /* ── Corps bas ── */
     const bodyG=ctx.createLinearGradient(-bW/2,-bH/2,bW/2,-bH/2);
     bodyG.addColorStop(0,'rgb(10,10,10)');
     bodyG.addColorStop(0.45,'rgb(22,22,22)');
     bodyG.addColorStop(1,'rgb(10,10,10)');
     ctx.fillStyle=bodyG;
     ctx.beginPath();ctx.roundRect(-bW/2,-bH/2,bW,bH/2+4,[0,0,5,5]);ctx.fill();

     /* ── Couvercle entrouvert ── */
     ctx.save();
     ctx.translate(0,-bH/2);ctx.rotate(-openAmt);
     const lidG=ctx.createLinearGradient(-bW/2,-bH/2,bW/2,-bH/2);
     lidG.addColorStop(0,'rgb(10,10,10)');
     lidG.addColorStop(0.45,'rgb(20,20,20)');
     lidG.addColorStop(1,'rgb(10,10,10)');
     ctx.fillStyle=lidG;
     ctx.beginPath();ctx.roundRect(-bW/2,-bH/2,bW,bH/2,[5,5,0,0]);ctx.fill();
     /* Lueur bord ouverture */
     const innerGlow=ctx.createLinearGradient(0,-bH/2,0,0);
     innerGlow.addColorStop(0,'rgba(0,0,0,0)');
     innerGlow.addColorStop(0.70,`rgba(255,205,65,${0.06*glowInt})`);
     innerGlow.addColorStop(1,`rgba(255,228,90,${0.24*glowInt})`);
     ctx.fillStyle=innerGlow;
     ctx.beginPath();ctx.roundRect(-bW/2,-bH/2,bW,bH/2,[5,5,0,0]);ctx.fill();
     ctx.restore();

     /* ── Fissure lumineuse ouverture ── */
     const crackG=ctx.createLinearGradient(-bW*0.44,-bH/2,bW*0.44,-bH/2);
     crackG.addColorStop(0,'rgba(255,230,100,0)');
     crackG.addColorStop(0.12,`rgba(255,248,155,${0.90*glowInt})`);
     crackG.addColorStop(0.50,`rgba(255,255,200,${glowInt})`);
     crackG.addColorStop(0.88,`rgba(255,248,155,${0.90*glowInt})`);
     crackG.addColorStop(1,'rgba(255,230,100,0)');
     ctx.strokeStyle=crackG;ctx.lineWidth=1.8+openAmt*7;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-bW*0.44,-bH/2);ctx.lineTo(bW*0.44,-bH/2);ctx.stroke();

     /* ── Bandes ── */
     ctx.fillStyle='rgb(26,26,26)';
     ctx.fillRect(-bW/2+8,-bH+bH*0.11,bW-16,bH*0.075);
     ctx.fillRect(-bW/2+8,-bH/2-bH*0.19,bW-16,bH*0.075);

     /* ── Serrures ── */
     function drawLock(lx){
      const lw=bW*0.13,lh=bH*0.15,ly=-bH*0.035;
      const lg2=ctx.createLinearGradient(lx-lw/2,ly,lx+lw/2,ly);
      lg2.addColorStop(0,'rgb(145,118,35)');
      lg2.addColorStop(0.3,'rgb(200,168,58)');
      lg2.addColorStop(0.6,'rgb(185,152,48)');
      lg2.addColorStop(1,'rgb(135,108,28)');
      ctx.fillStyle=lg2;
      ctx.beginPath();ctx.roundRect(lx-lw/2,ly,lw,lh,3);ctx.fill();
      ctx.strokeStyle='rgb(90,72,16)';ctx.lineWidth=0.8;
      ctx.beginPath();ctx.roundRect(lx-lw/2,ly,lw,lh,3);ctx.stroke();
      /* Reflet sur la serrure venant de la valise ouverte */
      ctx.fillStyle=`rgba(255,220,80,${0.12*glowInt})`;
      ctx.beginPath();ctx.roundRect(lx-lw/2,ly,lw,lh*0.4,3);ctx.fill();
      const rollW=lw*0.22,rollH=lh*0.45;
      for(let d=0;d<3;d++){
       const rx=lx-lw*0.27+d*lw*0.27;
       const ry=ly+lh*0.12;
       ctx.fillStyle='rgb(28,22,6)';
       ctx.beginPath();ctx.roundRect(rx-rollW/2,ry,rollW,rollH,2);ctx.fill();
      }
      ctx.fillStyle='rgb(110,88,22)';
      ctx.beginPath();ctx.roundRect(lx-lw*0.07,ly+lh*0.66,lw*0.14,lh*0.24,2);ctx.fill();
      ctx.fillStyle='rgb(170,140,42)';
      ctx.beginPath();ctx.roundRect(lx-lw*0.055,ly+lh*0.68,lw*0.11,lh*0.18,1);ctx.fill();
     }
     drawLock(-bW*0.27);drawLock(bW*0.27);

     /* ── Poignée ── */
     const hpY=-bH+bH*0.06;
     for(const hpx of [-bW*0.10,bW*0.10]){
      ctx.fillStyle='rgb(168,140,40)';
      ctx.beginPath();ctx.roundRect(hpx-bW*0.017,hpY-bH*0.075,bW*0.034,bH*0.096,3);ctx.fill();
     }
     ctx.strokeStyle='rgb(20,16,6)';ctx.lineWidth=bW*0.030;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(-bW*0.10,hpY);
     ctx.bezierCurveTo(-bW*0.10,hpY-bH*0.28,bW*0.10,hpY-bH*0.28,bW*0.10,hpY);
     ctx.stroke();

     /* ── Ombre au sol ── */
     const sh=ctx.createRadialGradient(0,5,0,0,5,bW*0.58);
     sh.addColorStop(0,'rgba(0,0,0,0.55)');sh.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sh;ctx.beginPath();ctx.ellipse(0,8,bW*0.46,7,0,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Fond noir profond */
     ctx.fillStyle='#07050a';ctx.fillRect(0,0,W,H);

     /* Sol damier */
     ctx.drawImage(floorC,0,0);

     /* Fumée */
     for(const s of smoke){
      s.y+=s.vy;s.x+=s.vx;
      s.wobble+=s.wobbleSpd;s.x+=Math.sin(s.wobble)*0.3;
      s.r+=0.04;s.op*=0.998;
      if(s.y<-s.r*2||s.op<0.005){
       s.y=H*(0.60+Math.random()*0.12);
       s.x=W*(0.15+Math.random()*0.70);
       s.r=4+Math.random()*10;
       s.op=0.04+Math.random()*0.08;
      }
      ctx.save();
      ctx.globalAlpha=s.op;
      ctx.fillStyle='rgba(200,185,160,1)';
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* Valise */
     drawBriefcase();

     /* Grain pellicule */
     ctx.globalAlpha=0.32;
     ctx.drawImage(grainC,0,0);
     ctx.globalAlpha=1;

     /* Vignette forte */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.04,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(0,0,0,0.18)');
     vg.addColorStop(0.65,'rgba(0,0,0,0.60)');
     vg.addColorStop(1,'rgba(0,0,0,0.97)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
