// CinéQuiz splash chunk — Le Grand Bleu
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Grand Bleu"]={
   name:'Le Grand Bleu',
   color:'20,100,220',
   ref:'Le Grand Bleu \u2014 Luc Besson, 1988',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;

    /* ── Surface de l'eau (pré-dessinée) ── */
    const surfC=document.createElement('canvas');
    surfC.width=W; surfC.height=60;
    const sx=surfC.getContext('2d');
    const sg=sx.createLinearGradient(0,0,0,60);
    sg.addColorStop(0,'rgba(80,160,220,0.35)');
    sg.addColorStop(1,'rgba(0,0,0,0)');
    sx.fillStyle=sg; sx.fillRect(0,0,W,60);

    /* ── Bulles ── */
    const bubbles=Array.from({length:65},()=>({
     x:Math.random()*W, y:Math.random()*H+H*0.3,
     r:Math.random()*4+0.8,
     spd:Math.random()*0.5+0.15,
     wobble:Math.random()*Math.PI*2,
     wfreq:Math.random()*0.03+0.008,
     op:Math.random()*0.3+0.08,
     trail:[]
    }));

    /* ── Dauphins (4) — plus grands, plus proches, plus visibles ── */
    const dolphins=[
     {x:-160, y:H*0.32, spd:1.6, amp:18, phase:0,    scale:2.2},
     {x:-380, y:H*0.44, spd:1.1, amp:14, phase:1.8,  scale:1.65},
     {x:W+80,  y:H*0.40, spd:-1.5, amp:16, phase:0.9, scale:1.90},
     {x:W+280, y:H*0.55, spd:-0.9, amp:12, phase:2.5, scale:1.40},
    ];

    function drawDolphin(ctx,x,y,sc,flip){
     ctx.save();ctx.translate(x,y);
     ctx.scale(flip?-sc:sc,sc);

     /* Halo lumineux */
     const dg=ctx.createRadialGradient(40,0,5,40,0,75);
     dg.addColorStop(0,'rgba(60,150,255,0.22)');
     dg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=dg;ctx.beginPath();ctx.arc(40,0,75,0,Math.PI*2);ctx.fill();

     /* corps — bleu-gris lumineux */
     ctx.fillStyle='rgba(80,150,220,0.95)';
     ctx.beginPath();
     ctx.moveTo(0,0);
     ctx.bezierCurveTo(18,-9, 52,-11, 78,0);
     ctx.bezierCurveTo(52,11, 18,9, 0,0);
     ctx.closePath();ctx.fill();

     /* reflet dorsal */
     ctx.fillStyle='rgba(130,195,255,0.55)';
     ctx.beginPath();
     ctx.moveTo(8,-2);
     ctx.bezierCurveTo(22,-8, 52,-9, 68,-2);
     ctx.bezierCurveTo(52,-6, 22,-6, 8,-2);
     ctx.closePath();ctx.fill();

     /* nageoire dorsale */
     ctx.fillStyle='rgba(60,130,205,0.97)';
     ctx.beginPath();
     ctx.moveTo(32,-8);
     ctx.quadraticCurveTo(40,-24,50,-9);
     ctx.lineTo(32,-8);ctx.closePath();ctx.fill();

     /* queue */
     ctx.beginPath();
     ctx.moveTo(74,-3);
     ctx.quadraticCurveTo(88,-16,95,-9);
     ctx.quadraticCurveTo(88,0,95,9);
     ctx.quadraticCurveTo(88,16,74,3);
     ctx.closePath();ctx.fill();

     /* nageoire pectorale */
     ctx.beginPath();
     ctx.moveTo(22,4);
     ctx.quadraticCurveTo(28,16,18,13);
     ctx.closePath();ctx.fill();

     /* ventre blanc-bleu */
     ctx.fillStyle='rgba(180,225,255,0.55)';
     ctx.beginPath();
     ctx.moveTo(8,0);
     ctx.bezierCurveTo(22,8, 52,8, 68,2);
     ctx.bezierCurveTo(52,6, 22,5, 8,0);
     ctx.closePath();ctx.fill();

     /* œil */
     ctx.fillStyle='rgba(220,245,255,0.95)';
     ctx.beginPath();ctx.arc(13,-2,3.2,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(5,15,40,1)';
     ctx.beginPath();ctx.arc(13.5,-2,1.8,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.9)';
     ctx.beginPath();ctx.arc(12.8,-2.6,0.7,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    /* ── Plongeur (silhouette contrastée) ── */
    function drawDiver(x,y){
     ctx.save();ctx.translate(x,y);
     /* Halo lumineux autour du plongeur pour le démarquer du fond */
     const halo=ctx.createRadialGradient(0,0,5,0,0,55);
     halo.addColorStop(0,'rgba(60,160,255,0.18)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.beginPath();ctx.arc(0,0,55,0,Math.PI*2);ctx.fill();

     const C='rgba(180,225,255,0.92)'; /* couleur claire — contraste sur fond sombre */
     ctx.fillStyle=C;
     ctx.strokeStyle=C;
     /* corps */
     ctx.beginPath();ctx.ellipse(0,0,8,16,0.2,0,Math.PI*2);ctx.fill();
     /* tête + masque */
     ctx.beginPath();ctx.ellipse(0,-20,7,8,0,0,Math.PI*2);ctx.fill();
     /* masque (verre bleu clair) */
     ctx.fillStyle='rgba(80,160,255,0.65)';
     ctx.beginPath();ctx.ellipse(0,-20,6,5.5,0,0,Math.PI*2);ctx.fill();
     /* contour masque */
     ctx.strokeStyle='rgba(200,235,255,0.80)';ctx.lineWidth=1.5;
     ctx.beginPath();ctx.ellipse(0,-20,6,5.5,0,0,Math.PI*2);ctx.stroke();

     ctx.strokeStyle=C;ctx.lineWidth=4.5;ctx.lineCap='round';
     /* bras */
     ctx.beginPath();ctx.moveTo(-8,-6);ctx.quadraticCurveTo(-22,4,-20,16);ctx.stroke();
     ctx.beginPath();ctx.moveTo(8,-6);ctx.quadraticCurveTo(22,4,20,16);ctx.stroke();
     /* jambes */
     ctx.lineWidth=4;
     ctx.beginPath();ctx.moveTo(-4,14);ctx.quadraticCurveTo(-6,30,-11,38);ctx.stroke();
     ctx.beginPath();ctx.moveTo(4,14);ctx.quadraticCurveTo(6,30,11,38);ctx.stroke();
     /* palmes */
     ctx.fillStyle=C;
     ctx.beginPath();ctx.ellipse(-13,41,9,3.5,-0.3,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(13,41,9,3.5,0.3,0,Math.PI*2);ctx.fill();
     /* bulles qui montent */
     for(let i=0;i<4;i++){
      const bx=-6+i*4, by=-28-i*7;
      ctx.fillStyle=`rgba(150,220,255,${0.55-i*0.10})`;
      ctx.beginPath();ctx.arc(bx+Math.sin(t*2+i)*2,by,2.5-i*0.4,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=`rgba(200,240,255,${0.4-i*0.08})`;ctx.lineWidth=0.8;ctx.stroke();
     }
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* fond océan profond */
     ctx.fillStyle='rgba(0,8,28,0.20)';ctx.fillRect(0,0,W,H);

     /* gradient de profondeur */
     const depth=ctx.createLinearGradient(0,0,0,H);
     depth.addColorStop(0,'rgba(0,40,100,0.25)');
     depth.addColorStop(0.35,'rgba(0,20,70,0.20)');
     depth.addColorStop(0.7,'rgba(0,8,35,0.18)');
     depth.addColorStop(1,'rgba(0,2,12,0.22)');
     ctx.fillStyle=depth;ctx.fillRect(0,0,W,H);

     /* rayons lumineux depuis la surface */
     const nRays=7;
     for(let i=0;i<nRays;i++){
      const rx=W*(0.1+i*0.14)+Math.sin(t*0.25+i*0.7)*W*0.04;
      const rw=W*0.06+Math.sin(t*0.4+i)*W*0.02;
      const rAlpha=0.04+Math.sin(t*0.5+i*0.8)*0.025;
      const rg=ctx.createLinearGradient(rx,0,rx,H*0.85);
      rg.addColorStop(0,`rgba(80,170,240,${rAlpha*2})`);
      rg.addColorStop(0.3,`rgba(40,120,200,${rAlpha})`);
      rg.addColorStop(1,'rgba(0,20,80,0)');
      ctx.fillStyle=rg;
      ctx.beginPath();
      ctx.moveTo(rx-rw*0.3,0);ctx.lineTo(rx+rw*0.3,0);
      ctx.lineTo(rx+rw*1.8,H*0.85);ctx.lineTo(rx-rw*1.5,H*0.85);
      ctx.closePath();ctx.fill();
     }

     /* surface de l'eau ondulante */
     const surfY=H*0.05;
     ctx.save();
     ctx.beginPath();
     ctx.moveTo(0,surfY);
     for(let x=0;x<=W;x+=8){
      const y=surfY+Math.sin(x*0.03+t*1.2)*3+Math.sin(x*0.07+t*0.8)*1.5;
      ctx.lineTo(x,y);
     }
     ctx.lineTo(W,0);ctx.lineTo(0,0);ctx.closePath();
     const wg=ctx.createLinearGradient(0,surfY-5,0,surfY+15);
     wg.addColorStop(0,'rgba(100,190,255,0.40)');
     wg.addColorStop(1,'rgba(50,130,220,0)');
     ctx.fillStyle=wg;ctx.fill();
     ctx.restore();

     /* dauphins */
     for(const d of dolphins){
      d.x+=d.spd;
      if(d.spd>0 && d.x>W+120)d.x=-120;
      if(d.spd<0 && d.x<-120)d.x=W+120;
      const dy=d.y+Math.sin(t*0.9+d.phase)*d.amp;
      drawDolphin(ctx,d.x,dy,d.scale,d.spd>0);
     }

     /* plongeur central qui descend lentement */
     const diverY=H*0.62+Math.sin(t*0.3)*H*0.03;
     const diverX=W*0.5+Math.sin(t*0.18)*W*0.06;
     drawDiver(diverX,diverY);

     /* bulles */
     for(const b of bubbles){
      b.y-=b.spd;b.x+=Math.sin(t*b.wfreq*60+b.wobble)*0.3;
      if(b.y<-b.r*2){b.y=H+b.r;b.x=Math.random()*W;}
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(130,210,255,${b.op})`;
      ctx.lineWidth=0.7;ctx.stroke();
      ctx.fillStyle=`rgba(200,240,255,${b.op*0.35})`;ctx.fill();
     }

     /* vignette */
     const vg=ctx.createRadialGradient(W/2,H*0.42,H*0.06,W/2,H*0.48,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,'rgba(0,5,22,0.22)');
     vg.addColorStop(1,'rgba(0,3,15,0.90)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
