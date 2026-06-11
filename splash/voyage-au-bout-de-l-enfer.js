// CinéQuiz splash chunk — Voyage au bout de l'enfer
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Voyage au bout de l'enfer"]={
   name:"Voyage au bout de l'enfer",
   color:'220,80,20',
   ref:"Voyage au bout de l\u2019enfer \u2014 Michael Cimino, 1978",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : coucher de soleil poster ── */
    let _dhStyle=document.getElementById('_dh_splash_style');
    if(!_dhStyle){_dhStyle=document.createElement('style');_dhStyle.id='_dh_splash_style';document.head.appendChild(_dhStyle);}
    _dhStyle.textContent=`
      

      #splash-content-wrap{top:25%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _dhWatch=setInterval(()=>{if(stop.v){_dhStyle.textContent='';clearInterval(_dhWatch);}},200);

    /* ── Cerf SVG ── */
    const CERF_SVG='images/sprite_17.svg';
    const cerfImg=new Image();let cerfReady=false,cerfSilhouette=null;
    cerfImg.onload=()=>{cerfReady=true;};cerfImg.src=CERF_SVG;

    /* Ratio SVG cerf : 1178 × 1280 */
    const SVG_W=1178,SVG_H=1280;
    /* Hauteur cible : réduite à 30% de l'écran */
    const cerfH=H*0.30;
    const cerfW=cerfH*(SVG_W/SVG_H);
    /* Légèrement décalé à droite, base sur les collines */
    const cerfX=W*0.55-cerfW/2;
    const cerfY=H*0.78-cerfH;

    /* ── Flocons de neige — montagne pennsylvanienne ── */
    const snow=Array.from({length:220},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.30, vy:0.14+Math.random()*0.36,
     r:Math.random()*2.0+0.2,
     op:0.12+Math.random()*0.42,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Vol d'oiseaux en V — horizon coucher de soleil ── */
    const flock=Array.from({length:12},(_,i)=>({
     /* Formation en V depuis la gauche */
     offX: (i%2===0? Math.floor(i/2) : -Math.ceil(i/2)) * W*0.032,
     offY: Math.abs(i%2===0? Math.floor(i/2) : Math.ceil(i/2)) * H*0.014,
     ph: Math.random()*Math.PI*2,
    }));
    let flockX=-W*0.10, flockY=H*0.32, flockSpd=W*0.0015;

    /* ── Collines de Pennsylvanie ── */
    function drawHills(){
     /* Colline arrière gauche */
     ctx.fillStyle='rgba(18,10,8,1)';
     ctx.beginPath();
     ctx.moveTo(-10,H);
     ctx.lineTo(-10,H*0.72);
     ctx.bezierCurveTo(W*0.05,H*0.58, W*0.20,H*0.55, W*0.38,H*0.60);
     ctx.bezierCurveTo(W*0.52,H*0.64, W*0.62,H*0.68, W*0.75,H*0.72);
     ctx.lineTo(W+10,H*0.72);ctx.lineTo(W+10,H);ctx.closePath();ctx.fill();
     /* Colline arrière droite */
     ctx.fillStyle='rgba(22,12,9,1)';
     ctx.beginPath();
     ctx.moveTo(W*0.55,H);
     ctx.lineTo(W*0.55,H*0.70);
     ctx.bezierCurveTo(W*0.65,H*0.62, W*0.78,H*0.58, W*0.90,H*0.62);
     ctx.bezierCurveTo(W*0.96,H*0.65, W+10,H*0.68, W+10,H*0.70);
     ctx.lineTo(W+10,H);ctx.closePath();ctx.fill();
     /* Sol sombre au premier plan */
     ctx.fillStyle='rgba(12,6,4,1)';
     ctx.beginPath();
     ctx.moveTo(-10,H);
     ctx.lineTo(-10,H*0.78);
     ctx.bezierCurveTo(W*0.15,H*0.74, W*0.40,H*0.72, W*0.65,H*0.74);
     ctx.bezierCurveTo(W*0.80,H*0.76, W*0.92,H*0.78, W+10,H*0.78);
     ctx.lineTo(W+10,H);ctx.closePath();ctx.fill();
    }

    /* ── Particules — braises et poussière automne ── */
    const embers=Array.from({length:65},()=>({
     x:Math.random()*W, y:H*(0.40+Math.random()*0.45),
     vx:(Math.random()-0.5)*0.28, vy:-(0.08+Math.random()*0.18),
     r:Math.random()*1.8+0.3,
     col:Math.random()<0.55?'240,80,20':Math.random()<0.7?'200,50,10':'255,140,30',
     op:0.08+Math.random()*0.22, ph:Math.random()*Math.PI*2,
    }));
    /* Brume légère bas */
    const mist=Array.from({length:6},(_,i)=>({
     x:W*(i*0.18-0.05), y:H*(0.68+Math.random()*0.06),
     r:W*(0.12+Math.random()*0.10),
     op:0.04+Math.random()*0.05,
     ph:Math.random()*Math.PI*2, spd:0.004+Math.random()*0.004,
    }));

    function frame(){
     if(stop.v)return;

     /* Fond dégradé coucher de soleil — rose chaud → violet bleu */
     const sky=ctx.createLinearGradient(0,0,0,H*0.75);
     sky.addColorStop(0.00,'#f4a0a0');   /* rose clair haut */
     sky.addColorStop(0.22,'#f08080');   /* rose saumon */
     sky.addColorStop(0.42,'#e86060');   /* rose-rouge */
     sky.addColorStop(0.62,'#c05888');   /* rose-violet */
     sky.addColorStop(0.80,'#8855a8');   /* violet */
     sky.addColorStop(1.00,'#4a3878');   /* bleu-violet horizon */
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.75);

     /* Prolongement vers le bas */
     const skyLow=ctx.createLinearGradient(0,H*0.75,0,H);
     skyLow.addColorStop(0,'#3a2858');
     skyLow.addColorStop(1,'#1a0e28');
     ctx.fillStyle=skyLow;ctx.fillRect(0,H*0.75,W,H*0.25);

     /* Halo soleil */
     const sunX=W*0.72, sunY=H*0.50;
     const sunHalo=ctx.createRadialGradient(sunX,sunY,W*0.04,sunX,sunY,W*0.30);
     sunHalo.addColorStop(0,`rgba(255,120,50,${0.55+Math.sin(t*0.4)*0.06})`);
     sunHalo.addColorStop(0.3,`rgba(220,80,30,${0.22+Math.sin(t*0.3)*0.04})`);
     sunHalo.addColorStop(0.7,'rgba(180,50,10,0.08)');
     sunHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunHalo;ctx.fillRect(0,0,W,H*0.75);
     /* Disque solaire rouge-orangé */
     ctx.fillStyle=`rgba(230,60,20,${0.92+Math.sin(t*0.5)*0.04})`;
     ctx.beginPath();ctx.arc(sunX,sunY,W*0.072,0,Math.PI*2);ctx.fill();
     /* Bord lumineux */
     const sunEdge=ctx.createRadialGradient(sunX,sunY,W*0.055,sunX,sunY,W*0.090);
     sunEdge.addColorStop(0,'rgba(255,140,60,0.0)');
     sunEdge.addColorStop(1,'rgba(255,140,60,0.0)');
     ctx.fillStyle=sunEdge;ctx.beginPath();ctx.arc(sunX,sunY,W*0.090,0,Math.PI*2);ctx.fill();

     /* ── Vol d'oiseaux en V ── */
     flockX+=flockSpd;
     if(flockX>W*1.15){ flockX=-W*0.10; flockY=H*(0.22+Math.random()*0.18); }
     for(const b of flock){
      b.ph+=0.08;
      const bx=flockX+b.offX, by=flockY+b.offY;
      if(bx<-W*0.05||bx>W*1.05) continue;
      const wingFlap=Math.sin(b.ph)*H*0.006;
      ctx.strokeStyle=`rgba(15,8,5,0.55)`;ctx.lineWidth=W*0.006;ctx.lineCap='round';
      /* Aile gauche */
      ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx-W*0.018,by-wingFlap);ctx.stroke();
      /* Aile droite */
      ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx+W*0.018,by-wingFlap);ctx.stroke();
     }

     /* Collines sombres */
     drawHills();

     /* Cerf — silhouette noire via offscreen canvas */
     if(cerfReady){
      /* Créer la silhouette une seule fois */
      if(!cerfSilhouette){
       const oc=document.createElement('canvas');
       oc.width=Math.ceil(cerfW);oc.height=Math.ceil(cerfH);
       const ot=oc.getContext('2d');
       ot.drawImage(cerfImg,0,0,cerfW,cerfH);
       ot.globalCompositeOperation='source-in';
       ot.fillStyle='rgba(8,4,3,1)';
       ot.fillRect(0,0,cerfW,cerfH);
       cerfSilhouette=oc;
      }
      ctx.save();
      ctx.globalAlpha=0.97;
      ctx.drawImage(cerfSilhouette,cerfX,cerfY,cerfW,cerfH);
      ctx.restore();
     }

     /* Pas de vignette */

     /* ── Braises ── */
     for(const e of embers){
      e.x+=e.vx;e.y+=e.vy;e.ph+=0.022;e.vy-=0.002;
      if(e.y<H*0.30||e.op<=0.005){e.y=H*(0.55+Math.random()*0.20);e.x=Math.random()*W;e.op=0.08+Math.random()*0.18;e.vy=-(0.08+Math.random()*0.18);}
      ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${e.col},${e.op*(0.4+0.6*Math.abs(Math.sin(e.ph)))})`;ctx.fill();
     }
     /* ── Brume basse ── */
     for(const m of mist){
      m.ph+=m.spd;m.x+=0.08;if(m.x>W+m.r)m.x=-m.r;
      const mg=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r);
      mg.addColorStop(0,`rgba(200,160,140,${m.op*(0.5+0.5*Math.sin(m.ph))})`);
      mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;ctx.beginPath();ctx.ellipse(m.x,m.y,m.r,m.r*0.28,0,0,Math.PI*2);ctx.fill();
     }

     /* Grain film léger */
     for(let i=0;i<20;i++){
      const g=6+Math.random()*14|0;
      ctx.fillStyle=`rgba(${g+2},${g},${g},${Math.random()*0.016})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
     }

     /* ── Flocons de neige — montagne en hiver ── */
     for(const s of snow){
      s.x+=s.vx+Math.sin(s.ph*0.5)*0.15;
      s.y+=s.vy;s.ph+=0.018;
      if(s.y>H+4){s.y=-4;s.x=Math.random()*W;}
      if(s.x<0)s.x=W;if(s.x>W)s.x=0;
      /* Seulement dans la zone ciel (au-dessus des collines) */
      if(s.y>H*0.74) continue;
      const sa=s.op*(0.5+0.5*Math.abs(Math.sin(s.ph)));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(240,240,255,${sa})`;ctx.fill();
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
