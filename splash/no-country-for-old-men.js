// CinéQuiz splash chunk — No Country for Old Men
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["No Country for Old Men"]={
   name:'No Country for Old Men',
   color:'180,140,60',
   ref:'No Country for Old Men \u2014 Coen Brothers, 2007',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Position : citation + logo sous CinéQuiz ── */
    let _ncPos=document.getElementById('_nc_splash_pos');
    if(!_ncPos){_ncPos=document.createElement('style');_ncPos.id='_nc_splash_pos';document.head.appendChild(_ncPos);}
    _ncPos.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _ncWatch=setInterval(()=>{if(stop.v){_ncPos.textContent='';clearInterval(_ncWatch);}},200);

    /* ── Poussière / particules de sable ── */
    const dust=Array.from({length:90},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:Math.random()*1.8+0.4, vy:(Math.random()-0.5)*0.3,
     r:Math.random()*1.8+0.2,
     op:Math.random()*0.18+0.04,
     hue:22+Math.random()*12
    }));

    /* ── Herbes sèches du Texas ── */
    const grass=Array.from({length:30},()=>({
     x:Math.random()*W,
     y:H*0.72+Math.random()*H*0.20,
     h:Math.random()*22+8,
     phase:Math.random()*Math.PI*2,
     op:Math.random()*0.35+0.12
    }));

    /* ── Pièce — lancer pile ou face ── */
    /* ── Pièce qui tourne sur place ── */
    const COIN_X=cx, COIN_Y=H*0.62, COIN_R=20;

    function drawCoin(){
     const flipSpeed=1.8;
     const scaleY=Math.cos(t*flipSpeed);   /* flip vertical = bas en haut */
     const absX=Math.abs(scaleY);
     const side=scaleY>0;
     const pulse=0.8+Math.sin(t*flipSpeed)*0.2;

     /* Halo doré */
     const chg=ctx.createRadialGradient(COIN_X,COIN_Y,0,COIN_X,COIN_Y,48);
     chg.addColorStop(0,`rgba(210,175,60,${0.16*pulse})`);
     chg.addColorStop(0.45,`rgba(180,140,40,${0.07*pulse})`);
     chg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=chg;ctx.fillRect(COIN_X-52,COIN_Y-52,104,104);

     /* Corps de la pièce */
     ctx.save();
     ctx.translate(COIN_X,COIN_Y);
     ctx.scale(1,absX);   /* aplatissement vertical = effet 3D bas/haut */
     const cg=ctx.createLinearGradient(0,-COIN_R,0,COIN_R);
     if(side){
      cg.addColorStop(0,'rgba(140,108,35,0.88)');
      cg.addColorStop(0.35,'rgba(230,195,80,0.97)');
      cg.addColorStop(0.65,'rgba(245,210,90,1.00)');
      cg.addColorStop(1,'rgba(140,108,35,0.88)');
     } else {
      cg.addColorStop(0,'rgba(130,100,30,0.82)');
      cg.addColorStop(0.5,'rgba(200,165,58,0.93)');
      cg.addColorStop(1,'rgba(130,100,30,0.82)');
     }
     ctx.beginPath();ctx.ellipse(0,0,COIN_R,COIN_R,0,0,Math.PI*2);
     ctx.fillStyle=cg;ctx.fill();
     ctx.strokeStyle=`rgba(110,82,22,${0.60*pulse})`;ctx.lineWidth=1.2;ctx.stroke();
     /* Reflet */
     if(absX>0.25){
      ctx.fillStyle=`rgba(255,245,165,${0.24*absX})`;
      ctx.beginPath();ctx.ellipse(-COIN_R*0.15,-COIN_R*0.28,COIN_R*0.35,COIN_R*0.22,0,0,Math.PI*2);ctx.fill();
     }
     /* Motif face */
     if(absX>0.5&&side){
      ctx.strokeStyle=`rgba(160,120,40,${0.45*absX})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(-7,0);ctx.lineTo(7,0);ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(0,7);ctx.stroke();
     }
     ctx.restore();

     /* Ombre au sol */
     ctx.save();ctx.globalAlpha=0.20;
     ctx.fillStyle='rgba(0,0,0,0.6)';
     ctx.beginPath();ctx.ellipse(COIN_X+3,COIN_Y+COIN_R+10,COIN_R*absX*0.7,4,0,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }


    /* ── SVG Chigurh ── */
    const chigurhImg=new Image();
    let chigurhReady=false;
    chigurhImg.onload=()=>{chigurhReady=true;};
    chigurhImg.src='images/NCFOM.svg';
    const SVG_W=148, SVG_H=406;

    function drawChigurh(){
     const targetH=H*0.26;
     const targetW=targetH*(SVG_W/SVG_H);
     /* Calé à droite, pieds à H*0.78 — même position que l'original */
     const drawX=W*0.72-targetW*0.5;
     const drawY=H*0.78-targetH;
     const sway=Math.sin(t*0.25)*2;
     if(chigurhReady){
      ctx.save();
      ctx.globalAlpha=1.0;
      ctx.translate(sway,0);
      ctx.drawImage(chigurhImg,drawX,drawY,targetW,targetH);
      /* Halo menaçant */
      const hcx=drawX+targetW*0.5, hcy=drawY+targetH*0.40;
      const hg=ctx.createRadialGradient(hcx,hcy,targetW*0.10,hcx,hcy,targetW*1.20);
      hg.addColorStop(0,'rgba(30,15,2,0.10)');
      hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.globalAlpha=0.35;
      ctx.fillStyle=hg;ctx.fillRect(hcx-targetW*1.2,hcy-targetW*1.2,targetW*2.4,targetW*2.4);
      ctx.restore();
     }
    }

    /* ── Route déserte vers l'horizon ── */
    function drawRoad(){
     const horizY=H*0.60;
     /* Sol désert */
     const ground=ctx.createLinearGradient(0,horizY,0,H);
     ground.addColorStop(0,'rgba(55,35,12,0.55)');
     ground.addColorStop(0.4,'rgba(42,26,8,0.65)');
     ground.addColorStop(1,'rgba(25,14,4,0.80)');
     ctx.fillStyle=ground;ctx.fillRect(0,horizY,W,H-horizY);

     /* Route — perspective fuyante */
     const rw=W*0.18;
     ctx.fillStyle='rgba(18,14,8,0.82)';
     ctx.beginPath();
     ctx.moveTo(cx-rw,H);ctx.lineTo(cx+rw,H);
     ctx.lineTo(cx+6,horizY);ctx.lineTo(cx-6,horizY);
     ctx.closePath();ctx.fill();

     /* Ligne centrale pointillée */
     const nDashes=12;
     for(let i=0;i<nDashes;i++){
      const prog=i/nDashes;
      const y1=horizY+(H-horizY)*prog;
      const y2=horizY+(H-horizY)*(prog+0.04);
      const w1=(cx-6)*(prog)+(1-prog)*1;
      const dashAlpha=0.25*prog*(0.6+Math.sin(t*1.5+i)*0.3);
      ctx.fillStyle=`rgba(160,130,60,${dashAlpha})`;
      ctx.beginPath();ctx.roundRect(cx-w1*0.05,y1,w1*0.10,y2-y1,1);ctx.fill();
     }

     /* Horizon lumineux — coucher de soleil du Texas */
     const sunX=cx*0.85;
     const sunG=ctx.createRadialGradient(sunX,horizY,0,sunX,horizY,W*0.55);
     sunG.addColorStop(0,`rgba(200,120,20,${0.16+Math.sin(t*0.3)*0.04})`);
     sunG.addColorStop(0.35,`rgba(160,70,10,${0.08+Math.sin(t*0.25)*0.02})`);
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H*0.75);
    }

    /* ── Pièce ── */
    function frame(){
     if(stop.v)return;

     /* Trail sombre */
     ctx.fillStyle='rgba(3,2,1,0.16)';ctx.fillRect(0,0,W,H);

     /* Ciel crépusculaire Texas */
     const sky=ctx.createLinearGradient(0,0,0,H*0.60);
     sky.addColorStop(0,`rgba(${12+Math.sin(t*0.08)*3|0},8,4,0.92)`);
     sky.addColorStop(0.4,`rgba(${30+Math.sin(t*0.10)*5|0},18,6,0.80)`);
     sky.addColorStop(0.75,`rgba(${55+Math.sin(t*0.12)*6|0},28,8,0.55)`);
     sky.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.60);

     drawRoad();

     /* Herbes sèches */
     for(const g of grass){
      const sway=Math.sin(t*1.0+g.phase)*6;
      ctx.strokeStyle=`rgba(${100+Math.random()*20|0},${78+Math.random()*12|0},${38+Math.random()*10|0},${g.op})`;
      ctx.lineWidth=0.9;ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(g.x,g.y);
      ctx.bezierCurveTo(g.x+sway*0.5,g.y-g.h*0.4,g.x+sway,g.y-g.h*0.8,g.x+sway*1.2,g.y-g.h);
      ctx.stroke();
     }

     /* Poussière */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy+Math.sin(t*0.4+d.op*8)*0.2;
      if(d.x>W+d.r){d.x=-d.r;d.y=Math.random()*H;}
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${d.hue},45%,58%,${d.op})`;ctx.fill();
     }

     drawCoin();
     drawChigurh();

     /* Vignette oppressante */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.05,cx,H*0.48,H*0.92);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(3,2,1,0.22)');
     vg.addColorStop(1,'rgba(4,2,0,0.94)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
