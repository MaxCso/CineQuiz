// CinéQuiz splash chunk — Night Call
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Night Call"]={
   name:'Night Call',
   color:'60,40,120',
   ref:'Nightcrawler \u2014 Dan Gilroy, 2014',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_nc_s');
    if(!_s){_s=document.createElement('style');_s.id='_nc_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:23%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* SVGs — viewBox: Night 115×269, Palmier1 467×820, Palmier2 676×875 */
    const nightImg=new Image();let nightReady=false;
    nightImg.onload=()=>{nightReady=true;};nightImg.src='images/Night.svg';
    const palm1Img=new Image();let palm1Ready=false;
    palm1Img.onload=()=>{palm1Ready=true;};palm1Img.src='images/Palmier1.svg';
    const palm2Img=new Image();let palm2Ready=false;
    palm2Img.onload=()=>{palm2Ready=true;};palm2Img.src='images/Palmier2.svg';

    /* Étoiles */
    const stars=Array.from({length:120},()=>({
     x:Math.random()*W, y:Math.random()*H*0.52,
     r:Math.random()*1.2+0.2,
     ph:Math.random()*Math.PI*2, spd:0.010+Math.random()*0.022,
     op:0.18+Math.random()*0.65,
    }));

    /* Étoiles filantes */
    const shooters=Array.from({length:5},()=>({
     active:false,x:0,y:0,vx:0,vy:0,life:0,maxLife:0,
    }));
    let shooterTimer=Math.random()*80|0;

    /* Skyline LA — bâtiments en silhouette */
    const skyBldgs=[
     [0.00,0.92,0.040],[0.03,0.88,0.030],[0.06,0.84,0.045],[0.10,0.90,0.030],
     [0.13,0.82,0.055],[0.18,0.86,0.035],[0.22,0.78,0.060],[0.27,0.84,0.040],
     [0.31,0.80,0.050],[0.36,0.88,0.035],[0.39,0.76,0.065],[0.44,0.82,0.040],
     [0.48,0.86,0.030],[0.51,0.78,0.055],[0.56,0.84,0.040],[0.59,0.80,0.050],
     [0.63,0.88,0.035],[0.66,0.82,0.045],[0.70,0.76,0.060],[0.75,0.84,0.040],
     [0.78,0.86,0.035],[0.81,0.80,0.050],[0.85,0.88,0.040],[0.88,0.82,0.045],
     [0.92,0.84,0.040],[0.95,0.90,0.030],[0.97,0.86,0.030],
    ];

    const horizY=H*0.81; /* horizon */

    function drawSkyline(){
     ctx.fillStyle='rgba(8,6,20,0.97)';
     ctx.beginPath();ctx.moveTo(-2,H+2);ctx.lineTo(-2,horizY);
     /* Contour irrégulier des buildings */
     let px=-2;
     for(const [xr,yr,wr] of skyBldgs){
      const bx=xr*W, bw=wr*W;
      const by=yr*horizY;
      if(bx>px) ctx.lineTo(bx,horizY); /* niveau sol entre batiments */
      ctx.lineTo(bx,by);
      ctx.lineTo(bx+bw,by);
      px=bx+bw;
     }
     ctx.lineTo(W+2,horizY);ctx.lineTo(W+2,H+2);ctx.closePath();ctx.fill();
    }

    function drawSVGs(){
     /* Night — silhouette centrale, pieds sur l'horizon */
     if(nightReady){
      const nH=H*0.28, nW=nH*(115/269);
      const nX=cx-nW/2, nY=horizY-nH;
      /* Offscreen pour teinte sombre */
      const oc=document.createElement('canvas');oc.width=Math.ceil(nW);oc.height=Math.ceil(nH);
      const ot=oc.getContext('2d');
      ot.drawImage(nightImg,0,0,nW,nH);
      ot.globalCompositeOperation='source-in';
      ot.fillStyle='rgba(5,4,18,0.98)';ot.fillRect(0,0,nW,nH);
      ctx.drawImage(oc,nX,nY+Math.sin(t*0.3)*H*0.002);
     }
     /* Palmier1 — gauche */
     if(palm1Ready){
      const p1H=H*0.42, p1W=p1H*(467/820);
      const p1X=-p1W*0.30, p1Y=horizY-p1H*0.80;
      const oc=document.createElement('canvas');oc.width=Math.ceil(p1W);oc.height=Math.ceil(p1H);
      const ot=oc.getContext('2d');
      ot.drawImage(palm1Img,0,0,p1W,p1H);
      ot.globalCompositeOperation='source-in';
      ot.fillStyle='rgba(4,3,14,0.98)';ot.fillRect(0,0,p1W,p1H);
      ctx.drawImage(oc,p1X,p1Y);
     }
     /* Palmier2 — droite */
     if(palm2Ready){
      const p2H=H*0.48, p2W=p2H*(676/875);
      const p2X=W-p2W*0.70, p2Y=horizY-p2H*0.82;
      const oc=document.createElement('canvas');oc.width=Math.ceil(p2W);oc.height=Math.ceil(p2H);
      const ot=oc.getContext('2d');
      ot.drawImage(palm2Img,0,0,p2W,p2H);
      ot.globalCompositeOperation='source-in';
      ot.fillStyle='rgba(4,3,14,0.98)';ot.fillRect(0,0,p2W,p2H);
      ctx.drawImage(oc,p2X,p2Y);
     }
    }

    function frame(){
     if(stop.v)return;

     /* Ciel bleu-violet nuit LA — comme l'affiche */
     const bg=ctx.createLinearGradient(0,0,0,horizY);
     bg.addColorStop(0.00,'#0a0818');
     bg.addColorStop(0.25,'#10123a');
     bg.addColorStop(0.55,'#18205a');
     bg.addColorStop(0.80,'#241848');
     bg.addColorStop(1.00,'#2e1450');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,horizY+2);

     /* Lueur horizon rose-violet — bas du ciel */
     const horizG=ctx.createLinearGradient(0,horizY*0.65,0,horizY);
     horizG.addColorStop(0,'rgba(0,0,0,0)');
     horizG.addColorStop(1,`rgba(120,40,140,${0.22+Math.sin(t*0.25)*0.04})`);
     ctx.fillStyle=horizG;ctx.fillRect(0,horizY*0.65,W,horizY*0.35);

     /* Étoiles scintillantes */
     for(const s of stars){
      s.ph+=s.spd;
      const op=s.op*(0.45+0.55*Math.abs(Math.sin(s.ph)));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(210,220,255,${op})`;ctx.fill();
     }

     /* Étoiles filantes */
     shooterTimer++;
     if(shooterTimer>100){
      shooterTimer=0;
      const sh=shooters.find(s=>!s.active);
      if(sh){
       sh.active=true;
       sh.x=Math.random()*W*0.80;sh.y=Math.random()*H*0.38;
       sh.vx=W*(0.010+Math.random()*0.010);sh.vy=H*(0.004+Math.random()*0.004);
       sh.life=0;sh.maxLife=44+Math.random()*24|0;
      }
     }
     for(const sh of shooters){
      if(!sh.active)continue;
      sh.life++;
      if(sh.life>sh.maxLife){sh.active=false;continue;}
      const pct=1-(sh.life/sh.maxLife);
      const tailX=sh.vx*1.4, tailY=sh.vy*1.4;
      const grad=ctx.createLinearGradient(sh.x,sh.y,sh.x-tailX,sh.y-tailY);
      grad.addColorStop(0,`rgba(255,255,255,${pct*0.88})`);
      grad.addColorStop(0.3,`rgba(180,200,255,${pct*0.40})`);
      grad.addColorStop(1,'rgba(120,140,255,0)');
      ctx.save();ctx.strokeStyle=grad;ctx.lineWidth=1.4;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(sh.x,sh.y);ctx.lineTo(sh.x-tailX,sh.y-tailY);ctx.stroke();
      /* Petit éclat au front */
      ctx.fillStyle=`rgba(255,255,255,${pct*0.60})`;
      ctx.beginPath();ctx.arc(sh.x,sh.y,1.2*pct,0,Math.PI*2);ctx.fill();
      ctx.restore();
      sh.x+=sh.vx;sh.y+=sh.vy;
     }
     const groundG=ctx.createLinearGradient(0,horizY,0,H);
     groundG.addColorStop(0,'rgba(8,6,18,0.98)');
     groundG.addColorStop(1,'rgba(4,3,10,1.0)');
     ctx.fillStyle=groundG;ctx.fillRect(0,horizY,W,H-horizY);

     /* Skyline */
     drawSkyline();

     /* SVGs: personnage + palmiers */
     drawSVGs();

     /* Grain subtil */
     for(let i=0;i<20;i++){
      ctx.fillStyle=`rgba(${60+Math.random()*40|0},${40+Math.random()*40|0},${120+Math.random()*40|0},${Math.random()*0.012})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
