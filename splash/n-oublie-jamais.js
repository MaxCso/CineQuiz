// CinéQuiz splash chunk — N'oublie jamais
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["N'oublie jamais"]={
   name:"N'oublie jamais",
   color:'80,120,180',
   ref:"The Notebook \u2014 Nick Cassavetes, 2004",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_nb_s');
    if(!_s){_s=document.createElement('style');_s.id='_nb_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Géographie ── */
    const horizY=H*0.50;  /* ligne d'horizon */
    const lakeY=H*0.52;   /* surface du lac */

    /* ── Reflets animés sur le lac ── */
    const reflStrips=Array.from({length:18},(_,i)=>({
     x:cx+(i%2===0?-1:1)*(W*0.02+i*W*0.018),
     w:W*(0.008+Math.random()*0.012),
     ph:Math.random()*Math.PI*2,
     spd:0.012+Math.random()*0.010,
     op:0.18+Math.random()*0.25,
    }));

    /* ── Vagues douces du lac ── */
    const waves=Array.from({length:6},(_,i)=>({
     phase:Math.random()*Math.PI*2,
     spd:0.006+i*0.002,
     amp:H*(0.004+i*0.002),
     y:lakeY+i*H*0.038,
    }));

    /* ── Oiseaux sur le lac ── */
    /* Duck SVG 1280x690, potrace flipped (SVG bottom=feet, top=head) */
    /* Ratio 1280/690 ≈ 1.855 */
    const duckImg=new Image();
    duckImg.src='images/sprite_48.svg';
    let duckReady=false;
    duckImg.onload=()=>{duckReady=true;};
    const DUCK_RATIO=1280/690;
    const birds=Array.from({length:4},(_,i)=>{
     return {
      x:W*(0.10+i*0.24)+Math.random()*W*0.06,
      y:lakeY+H*0.035+Math.random()*H*0.018,
      vx:(Math.random()<0.5?1:-1)*(0.06+Math.random()*0.08),
      bob:Math.random()*Math.PI*2,
      sc:0.55+Math.random()*0.30,
     };
    });

    /* ── Lucioles / étincelles dorées sur le lac ── */
    const fireflies=Array.from({length:18},()=>({
     x:Math.random()*W,
     y:lakeY-H*(0.02+Math.random()*0.12),
     ph:Math.random()*Math.PI*2,
     spd:0.018+Math.random()*0.025,
     vx:(Math.random()-0.5)*0.12,
     vy:(Math.random()-0.5)*0.05,
     r:W*(0.004+Math.random()*0.005),
     op:0.0,
     maxOp:0.35+Math.random()*0.45,
    }));

    /* ── Particules soleil — poussière orange dans l'air ── */
    const sunDust=Array.from({length:30},()=>({
     x:Math.random()*W,
     y:H*(0.08+Math.random()*0.42),
     vx:(Math.random()-0.5)*0.06,
     vy:-(0.015+Math.random()*0.030),
     r:W*(0.001+Math.random()*0.002),
     op:0.04+Math.random()*0.10,
     ph:Math.random()*Math.PI*2,
     spd:0.008+Math.random()*0.012,
    }));

    /* ── Brume légère sur le lac ── */
    const mistBands=Array.from({length:4},(_,i)=>({
     y:lakeY+H*(0.005+i*0.012),
     ph:Math.random()*Math.PI*2,
     spd:0.004+Math.random()*0.005,
     op:0.04+Math.random()*0.05,
    }));

    function drawBird(bx,by,sc,flipX){
     if(!duckReady)return;
     const dw=W*0.09*sc*DUCK_RATIO, dh=W*0.09*sc;
     ctx.save();
     ctx.globalCompositeOperation='multiply';
     ctx.globalAlpha=0.88;
     if(flipX){
      ctx.translate(bx+dw*0.5,0);ctx.scale(-1,1);
      ctx.drawImage(duckImg,-dw*0.5,by-dh,dw,dh);
     }else{
      ctx.drawImage(duckImg,bx-dw*0.5,by-dh,dw,dh);
     }
     /* Reflet dans l'eau */
     ctx.globalAlpha=0.18;
     ctx.translate(flipX?-dw*0.5:bx,by);ctx.scale(1,-1);
     if(flipX){
      ctx.drawImage(duckImg,-dw*0.5,0,dw,dh*0.45);
     }else{
      ctx.drawImage(duckImg,-dw*0.5,0,dw,dh*0.45);
     }
     ctx.globalCompositeOperation='source-over';
     ctx.restore();
    }

    function drawBoat(){
     const bx=cx, by=lakeY+H*0.160;
     /* Reflet de la barque */
     ctx.save();ctx.globalAlpha=0.18;
     ctx.fillStyle='rgba(8,4,1,0.85)';
     ctx.beginPath();ctx.moveTo(bx-W*0.110,by+H*0.025);
     ctx.bezierCurveTo(bx-W*0.085,by+H*0.075,bx+W*0.085,by+H*0.075,bx+W*0.110,by+H*0.025);
     ctx.closePath();ctx.fill();
     ctx.restore();
     /* Coque */
     ctx.fillStyle='rgba(12,7,2,0.97)';
     ctx.beginPath();
     ctx.moveTo(bx-W*0.110,by);
     ctx.bezierCurveTo(bx-W*0.090,by+H*0.038,bx+W*0.090,by+H*0.038,bx+W*0.110,by);
     ctx.lineTo(bx+W*0.095,by-H*0.012);
     ctx.bezierCurveTo(bx+W*0.070,by-H*0.022,bx-W*0.070,by-H*0.022,bx-W*0.095,by-H*0.012);
     ctx.closePath();ctx.fill();
     /* Bordure intérieure légèrement plus claire */
     ctx.strokeStyle='rgba(35,20,8,0.70)';ctx.lineWidth=W*0.006;
     ctx.beginPath();
     ctx.moveTo(bx-W*0.088,by-H*0.008);
     ctx.bezierCurveTo(bx-W*0.068,by+H*0.025,bx+W*0.068,by+H*0.025,bx+W*0.088,by-H*0.008);
     ctx.stroke();
     /* Avirons */
     ctx.strokeStyle='rgba(18,10,3,0.92)';ctx.lineWidth=W*0.009;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(bx-W*0.060,by-H*0.005);ctx.lineTo(bx-W*0.200,by+H*0.015);ctx.stroke();
     ctx.beginPath();ctx.moveTo(bx+W*0.060,by-H*0.005);ctx.lineTo(bx+W*0.200,by+H*0.015);ctx.stroke();
     /* Pales */
     ctx.fillStyle='rgba(15,8,2,0.90)';
     ctx.beginPath();ctx.ellipse(bx-W*0.200,by+H*0.015,W*0.022,H*0.008,0.3,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(bx+W*0.200,by+H*0.015,W*0.022,H*0.008,-0.3,0,Math.PI*2);ctx.fill();
     /* Silhouette Noah — légèrement penché vers Allie */
     const n1x=bx-W*0.026, n1y=by-H*0.018;
     ctx.fillStyle='rgba(8,4,1,0.98)';
     ctx.beginPath();ctx.arc(n1x,n1y-H*0.072,W*0.020,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(n1x+W*0.005,n1y-H*0.022,W*0.018,H*0.042,0.12,0,Math.PI*2);ctx.fill();
     /* Silhouette Allie — les cheveux qui débordent */
     const n2x=bx+W*0.030, n2y=by-H*0.018;
     ctx.beginPath();ctx.arc(n2x,n2y-H*0.065,W*0.017,0,Math.PI*2);ctx.fill();
     /* Cheveux longs */
     ctx.beginPath();ctx.moveTo(n2x+W*0.008,n2y-H*0.065);
     ctx.bezierCurveTo(n2x+W*0.030,n2y-H*0.042,n2x+W*0.028,n2y-H*0.018,n2x+W*0.012,n2y-H*0.010);
     ctx.bezierCurveTo(n2x+W*0.022,n2y-H*0.032,n2x+W*0.018,n2y-H*0.055,n2x+W*0.005,n2y-H*0.065);
     ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.ellipse(n2x-W*0.004,n2y-H*0.022,W*0.016,H*0.038,-0.10,0,Math.PI*2);ctx.fill();
    }

    function frame(){
     if(stop.v)return;

     /* ── Ciel coucher de soleil — orange chaud sur le lac ── */
     const sky=ctx.createLinearGradient(0,0,0,horizY);
     sky.addColorStop(0,`hsl(${20+Math.sin(t*0.06)*3|0},${60+Math.sin(t*0.08)*4|0}%,${22+Math.sin(t*0.05)*2|0}%)`);
     sky.addColorStop(0.18,'hsl(22,62%,28%)');
     sky.addColorStop(0.40,`hsl(${28+Math.sin(t*0.10)*3|0},72%,38%)`);
     sky.addColorStop(0.65,`hsl(${32+Math.sin(t*0.08)*2|0},78%,48%)`);
     sky.addColorStop(0.85,'hsl(25,72%,44%)');
     sky.addColorStop(1,`hsl(${20+Math.sin(t*0.07)*2|0},65%,38%)`);
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,horizY);

     /* ── Silhouette forêt à l'horizon — lisière basse et discrète ── */
     ctx.fillStyle='rgba(10,5,2,0.97)';
     ctx.beginPath();
     ctx.moveTo(0,horizY+H*0.010);
     for(let xi=0;xi<=W;xi+=W*0.022){
      const tip=horizY-H*(0.012+Math.abs(Math.sin(xi*0.028+3.1))*0.022+Math.abs(Math.sin(xi*0.055+7.8))*0.014);
      ctx.lineTo(xi,tip);
     }
     ctx.lineTo(W,horizY+H*0.010);
     ctx.closePath();ctx.fill();

     /* ── Soleil — grand disque orange ── */
     const sunX=cx*0.88, sunY=horizY-H*0.06;
     const sunR=W*0.085;
     const sg=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunR*3.5);
     sg.addColorStop(0,'rgba(255,200,80,1.0)');
     sg.addColorStop(0.20,'rgba(255,160,40,0.95)');
     sg.addColorStop(0.45,'rgba(240,100,20,0.55)');
     sg.addColorStop(0.75,`rgba(220,70,10,${0.18+Math.sin(t*0.25)*0.04})`);
     sg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sg;ctx.fillRect(sunX-sunR*3.5,sunY-sunR*3.5,sunR*7,sunR*7);
     /* Disque dur */
     const sd=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunR);
     sd.addColorStop(0,'rgba(255,240,160,1)');
     sd.addColorStop(0.5,'rgba(255,200,60,0.98)');
     sd.addColorStop(1,'rgba(255,140,20,0.90)');
     ctx.fillStyle=sd;ctx.beginPath();ctx.arc(sunX,sunY,sunR,0,Math.PI*2);ctx.fill();
     /* Reflet tronqué par l'horizon */
     ctx.save();ctx.beginPath();ctx.rect(0,horizY,W,H-horizY);ctx.clip();
     ctx.fillStyle=sd;ctx.beginPath();ctx.arc(sunX,sunY,sunR,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* ── Lac — surface chaude réfléchissant le ciel ── */
     const lakeG=ctx.createLinearGradient(0,lakeY,0,H);
     lakeG.addColorStop(0,`hsl(${25+Math.sin(t*0.08)*3|0},68%,${38+Math.sin(t*0.06)*3|0}%)`);
     lakeG.addColorStop(0.18,`hsl(22,62%,32%)`);
     lakeG.addColorStop(0.40,'hsl(20,55%,26%)');
     lakeG.addColorStop(0.70,'hsl(18,48%,20%)');
     lakeG.addColorStop(1,'hsl(15,40%,14%)');
     ctx.fillStyle=lakeG;ctx.fillRect(0,lakeY,W,H-lakeY);

     /* ── Reflets du soleil sur le lac — bandes verticales ── */
     for(const rf of reflStrips){
      rf.ph+=rf.spd;
      const rop=rf.op*(0.5+0.5*Math.sin(rf.ph));
      const rg=ctx.createLinearGradient(rf.x,lakeY,rf.x,H*0.75);
      rg.addColorStop(0,`rgba(255,190,60,${rop*0.9})`);
      rg.addColorStop(0.4,`rgba(240,140,30,${rop*0.55})`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;
      ctx.beginPath();ctx.rect(rf.x-rf.w*0.5,lakeY,rf.w*(0.6+Math.sin(rf.ph)*0.4),H*0.30);ctx.fill();
     }

     /* ── Vagues subtiles ── */
     for(const wv of waves){
      wv.phase+=wv.spd;
      ctx.strokeStyle=`rgba(255,160,50,${0.08+Math.sin(wv.phase)*0.04})`;
      ctx.lineWidth=0.8;
      ctx.beginPath();ctx.moveTo(0,wv.y);
      for(let x=0;x<=W;x+=8){
       ctx.lineTo(x,wv.y+Math.sin(wv.phase+x*0.020)*wv.amp);
      }
      ctx.stroke();
     }

     /* ── Canards SVG ── */
     for(const b of birds){
      b.x+=b.vx;b.bob+=0.025;
      if(b.x<W*0.04||b.x>W*0.96)b.vx*=-1;
      drawBird(b.x,b.y+Math.sin(b.bob)*H*0.003,b.sc,b.vx<0);
     }

     /* ── Barque + silhouettes ── */
     drawBoat();

     /* ── Brume sur le lac ── */
     for(const m of mistBands){
      m.ph+=m.spd;
      const mg=ctx.createLinearGradient(0,m.y,0,m.y+H*0.018);
      mg.addColorStop(0,`rgba(230,160,60,${m.op*(0.4+0.6*Math.abs(Math.sin(m.ph)))})`);
      mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;ctx.fillRect(0,m.y,W,H*0.018);
     }

     /* ── Poussière soleil — particules ambrées flottant dans l'air ── */
     for(const d of sunDust){
      d.ph+=d.spd; d.x+=d.vx+Math.sin(d.ph*0.4)*0.04; d.y+=d.vy;
      if(d.y<-d.r){d.y=H*0.50;d.x=Math.random()*W;}
      ctx.fillStyle=`rgba(255,${170+Math.random()*40|0},40,${d.op*(0.5+0.5*Math.abs(Math.sin(d.ph)))})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Lucioles — brillent et s'estompent doucement ── */
     for(const f of fireflies){
      f.ph+=f.spd; f.x+=f.vx+Math.sin(f.ph*0.5)*0.08; f.y+=f.vy;
      if(f.x<0)f.x=W; if(f.x>W)f.x=0;
      if(f.y>lakeY)f.y=lakeY-H*0.02;
      if(f.y<H*0.30)f.vy=Math.abs(f.vy)*0.5;
      const glow=Math.pow(Math.max(0,Math.sin(f.ph)),2);
      const alpha=glow*f.maxOp;
      if(alpha<0.01)continue;
      /* Halo extérieur */
      const fg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*5);
      fg.addColorStop(0,`rgba(255,220,80,${alpha*0.55})`);
      fg.addColorStop(0.4,`rgba(255,160,40,${alpha*0.22})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.beginPath();ctx.arc(f.x,f.y,f.r*5,0,Math.PI*2);ctx.fill();
      /* Point lumineux */
      ctx.fillStyle=`rgba(255,240,160,${alpha*0.95})`;
      ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette douce ── */
     const vg=ctx.createRadialGradient(cx,H*0.52,H*0.12,cx,H*0.52,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(10,4,1,0.06)');
     vg.addColorStop(0.78,'rgba(8,3,1,0.28)');
     vg.addColorStop(1,'rgba(6,2,0,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
