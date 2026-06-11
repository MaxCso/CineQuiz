// CinéQuiz splash chunk — Transformers
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Transformers"]={
   name:'Transformers',
   color:'80,140,200',
   ref:'Transformers \u2014 Michael Bay, 2007',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond ── */
    let _tfStyle=document.getElementById('_tf_s');
    if(!_tfStyle){_tfStyle=document.createElement('style');_tfStyle.id='_tf_s';document.head.appendChild(_tfStyle);}
    _tfStyle.textContent='#splash-content-wrap{top:76%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _tfW=setInterval(()=>{if(stop.v){_tfStyle.textContent='';clearInterval(_tfW);}},200);

    /* ── Robot SVG ── */
    const ROBOT_SVG='images/sprite_09.svg';
    const robotImg=new Image();let robotReady=false,robotSil=null;
    robotImg.onload=()=>{robotReady=true;};robotImg.src=ROBOT_SVG;
    /* Ratio SVG : 383 × 373 */
    const SVG_RW=383,SVG_RH=373;
    /* Robot grand, centré, tête juste sous le logo */
    const robotW=W*0.62;
    const robotH=robotW*(SVG_RH/SVG_RW);
    const robotX=cx-robotW/2;
    const robotY=H*0.20; /* sommet sous le logo CinéQuiz */

    /* ── Étoiles ── */
    const stars=Array.from({length:120},()=>({
     x:Math.random()*W, y:Math.random()*H*0.62,
     r:Math.random()*1.3+0.2,
     op:0.15+Math.random()*0.65,
     phase:Math.random()*Math.PI*2
    }));

    /* ── Débris / fragments métalliques ── */
    const debris=Array.from({length:35},()=>({
     x:Math.random()*W, y:Math.random()*H*0.65-H*0.05,
     vx:(Math.random()-0.5)*0.55, vy:0.35+Math.random()*0.90,
     size:Math.random()*8+2,
     angle:Math.random()*Math.PI*2, rot:(Math.random()-0.5)*0.04,
     gold:Math.random()>0.45
    }));

    /* ── Skyline buildings ── */
    const HORIZON=H*0.73;
    const buildings=[];
    let bx=0;
    while(bx<W){
     const bw=W*(0.038+Math.random()*0.055);
     const bh=H*(0.055+Math.random()*0.155);
     buildings.push({x:bx,w:bw,h:bh});
     bx+=bw+W*0.003;
    }
    /* Fenêtres — générées une fois */
    const wins=[];
    for(const b of buildings){
     const cols=Math.max(1,Math.floor(b.w/(W*0.013)));
     const rows=Math.max(1,Math.floor(b.h/(H*0.024)));
     for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
       if(Math.random()>0.50)continue;
       const warm=Math.random()>0.35;
       wins.push({
        x:b.x+b.w*(0.15+c*(0.70/Math.max(cols-1,1))),
        y:HORIZON-b.h*0.88+r*(b.h*0.78/Math.max(rows-1,1)),
        warm,
        r:Math.random()*50+180,
        g:warm?(Math.random()*70+155|0):(Math.random()*60+175|0),
        b2:warm?(Math.random()*40+20|0):255,
        a:0.50+Math.random()*0.42,
        flicker:Math.random()<0.06, ph:Math.random()*Math.PI*2
       });
      }
     }
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond : espace → coucher de soleil ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#000005');
     bg.addColorStop(0.08,'#01030f');
     bg.addColorStop(0.30,'#030818');
     bg.addColorStop(0.52,'#08102a');
     bg.addColorStop(0.68,'#1a0e06');
     bg.addColorStop(0.80,'#2e1a06');
     bg.addColorStop(1.00,'#0c0802');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── Arc planète Cybertron en haut ── */
     const planetR=W*0.72;
     const planetCY=-planetR*0.52; /* centre hors écran */
     const pg=ctx.createRadialGradient(cx,planetCY,planetR*0.75,cx,planetCY,planetR);
     pg.addColorStop(0,'rgba(0,0,0,0)');
     pg.addColorStop(0.60,'rgba(15,30,80,0.08)');
     pg.addColorStop(0.82,'rgba(30,60,140,0.22)');
     pg.addColorStop(0.92,'rgba(60,100,200,0.30)');
     pg.addColorStop(0.97,'rgba(100,160,255,0.20)');
     pg.addColorStop(1.00,'rgba(0,0,0,0)');
     ctx.fillStyle=pg;ctx.beginPath();ctx.arc(cx,planetCY,planetR,0,Math.PI*2);ctx.fill();
     /* Trait atmosphérique */
     ctx.strokeStyle='rgba(80,140,240,0.18)';ctx.lineWidth=W*0.008;
     ctx.beginPath();ctx.arc(cx,planetCY,planetR*0.98,0,Math.PI*2);ctx.stroke();

     /* ── Étoiles ── */
     for(const s of stars){
      s.phase+=0.006;
      const op=s.op*(0.70+0.30*Math.sin(s.phase));
      ctx.fillStyle=`rgba(210,220,255,${op})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Débris tombants ── */
     for(const d of debris){
      d.y+=d.vy;d.x+=d.vx;d.angle+=d.rot;
      if(d.y>HORIZON){d.y=-20;d.x=Math.random()*W;}
      ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.angle);
      const dg=ctx.createLinearGradient(-d.size/2,-d.size/2,d.size/2,d.size/2);
      if(d.gold){dg.addColorStop(0,'rgba(255,195,50,0.90)');dg.addColorStop(1,'rgba(180,90,5,0.55)');}
      else       {dg.addColorStop(0,'rgba(90,155,255,0.80)');dg.addColorStop(1,'rgba(20,70,200,0.45)');}
      ctx.fillStyle=dg;
      ctx.beginPath();
      ctx.moveTo(0,-d.size*0.55);ctx.lineTo(d.size*0.28,d.size*0.55);
      ctx.lineTo(0,d.size*0.20);ctx.lineTo(-d.size*0.28,d.size*0.55);
      ctx.closePath();ctx.fill();
      ctx.restore();
     }

     /* ── Halo autour du robot ── */
     const halo=ctx.createRadialGradient(cx,robotY+robotH*0.38,robotW*0.05,cx,robotY+robotH*0.38,robotW*0.62);
     halo.addColorStop(0,`rgba(30,70,180,${0.22+Math.sin(t*1.2)*0.05})`);
     halo.addColorStop(0.50,`rgba(15,40,120,${0.10+Math.sin(t*0.9)*0.03})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,HORIZON);

     /* ── Robot SVG en silhouette bleue-acier ── */
     if(robotReady){
      if(!robotSil){
       const oc=document.createElement('canvas');
       oc.width=Math.ceil(robotW);oc.height=Math.ceil(robotH);
       const ot=oc.getContext('2d');
       ot.drawImage(robotImg,0,0,robotW,robotH);
       /* Teinter en bleu-acier sombre */
       ot.globalCompositeOperation='source-in';
       ot.fillStyle='rgba(35,60,130,0.97)';
       ot.fillRect(0,0,robotW,robotH);
       robotSil=oc;
      }
      ctx.save();
      ctx.globalAlpha=0.97;
      ctx.drawImage(robotSil,robotX,robotY,robotW,robotH);
      ctx.restore();

      /* Yeux lumineux cyan par-dessus */
      const pulse=0.85+0.15*Math.sin(t*2.8);
      /* Yeux alignés sur le SVG Autobot */
      const eyeY=robotY+robotH*0.52;
      for(const side of [-1,1]){
       const ex=cx+side*robotW*0.155;
       const eHalo=ctx.createRadialGradient(ex,eyeY,1,ex,eyeY,robotW*0.075);
       eHalo.addColorStop(0,`rgba(100,210,255,${0.80*pulse})`);
       eHalo.addColorStop(0.45,`rgba(40,140,255,${0.35*pulse})`);
       eHalo.addColorStop(1,'rgba(0,80,200,0)');
       ctx.fillStyle=eHalo;ctx.beginPath();ctx.arc(ex,eyeY,robotW*0.075,0,Math.PI*2);ctx.fill();
       ctx.fillStyle=`rgba(200,240,255,${pulse})`;
       ctx.beginPath();ctx.arc(ex,eyeY,robotW*0.022,0,Math.PI*2);ctx.fill();
      }

      /* Reflet lumineux diagonal sur le robot */
      ctx.save();ctx.globalAlpha=0.12;
      const rl=ctx.createLinearGradient(robotX,robotY,robotX+robotW*0.5,robotY+robotH*0.6);
      rl.addColorStop(0,'rgba(160,200,255,0)');
      rl.addColorStop(0.4,'rgba(160,200,255,0.65)');
      rl.addColorStop(1,'rgba(160,200,255,0)');
      ctx.fillStyle=rl;ctx.fillRect(robotX,robotY,robotW,robotH);
      ctx.restore();
     }

     /* ── Lueur soleil bas horizon — orangé-or Michael Bay ── */
     const sunGlow=ctx.createRadialGradient(cx,HORIZON,0,cx,HORIZON,W*0.95);
     sunGlow.addColorStop(0,`rgba(255,200,50,${0.55+Math.sin(t*0.4)*0.06})`);
     sunGlow.addColorStop(0.15,'rgba(255,120,15,0.40)');
     sunGlow.addColorStop(0.38,'rgba(200,60,5,0.18)');
     sunGlow.addColorStop(0.65,'rgba(100,25,2,0.08)');
     sunGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.save();
     ctx.beginPath();ctx.arc(cx,HORIZON,W*0.95,Math.PI,Math.PI*2);ctx.closePath();
     ctx.clip();
     ctx.fillStyle=sunGlow;ctx.fillRect(0,HORIZON-H*0.25,W,H*0.45);
     ctx.restore();

     /* ── Skyline ── */
     ctx.fillStyle='rgba(6,8,16,0.98)';
     ctx.beginPath();ctx.moveTo(0,HORIZON);ctx.lineTo(0,H);
     for(const b of buildings){
      ctx.lineTo(b.x,HORIZON);
      ctx.lineTo(b.x,HORIZON-b.h);
      ctx.lineTo(b.x+b.w*0.12,HORIZON-b.h);
      ctx.lineTo(b.x+b.w*0.12,HORIZON-b.h*1.15);
      ctx.lineTo(b.x+b.w*0.88,HORIZON-b.h*1.15);
      ctx.lineTo(b.x+b.w*0.88,HORIZON-b.h);
      ctx.lineTo(b.x+b.w,HORIZON-b.h);
     }
     ctx.lineTo(W,HORIZON);ctx.lineTo(W,H);ctx.closePath();ctx.fill();

     /* ── Fenêtres fixes ── */
     for(const w of wins){
      if(w.y>HORIZON-H*0.012)continue;
      let alpha=w.a;
      if(w.flicker){w.ph+=0.07;alpha*=(0.55+0.45*Math.sin(w.ph));}
      ctx.fillStyle=`rgba(${w.r},${w.g},${w.b2},${alpha})`;
      ctx.fillRect(w.x,w.y,W*0.008,H*0.009);
     }

     /* ── Nuages de fumée dramatiques ── */
     for(let si=0;si<5;si++){
      const sx=W*(0.08+si*0.21)+Math.sin(t*0.28+si)*W*0.018;
      const sr=W*(0.095+Math.sin(t*0.45+si*1.3)*0.018);
      const sg=ctx.createRadialGradient(sx,HORIZON-H*0.06,0,sx,HORIZON-H*0.06,sr);
      sg.addColorStop(0,'rgba(45,28,10,0.52)');
      sg.addColorStop(0.5,'rgba(28,16,4,0.24)');
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sx,HORIZON-H*0.06,sr,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette haut/bas douce ── */
     const vigTop=ctx.createLinearGradient(0,0,0,H*0.10);
     vigTop.addColorStop(0,'rgba(0,0,5,0.55)');vigTop.addColorStop(1,'rgba(0,0,5,0)');
     ctx.fillStyle=vigTop;ctx.fillRect(0,0,W,H*0.10);
     const vigBot=ctx.createLinearGradient(0,H*0.87,0,H);
     vigBot.addColorStop(0,'rgba(0,0,0,0)');vigBot.addColorStop(1,'rgba(0,0,0,0.55)');
     ctx.fillStyle=vigBot;ctx.fillRect(0,H*0.87,W,H*0.13);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
