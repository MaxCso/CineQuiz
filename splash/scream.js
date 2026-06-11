// CinéQuiz splash chunk — Scream
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Scream"]={
   name:'Scream',
   color:'200,10,10',
   ref:'Scream \u2014 Wes Craven, 1996',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : noir total du poster ── */
    let _scStyle=document.getElementById('_sc_splash_style');
    if(!_scStyle){_scStyle=document.createElement('style');_scStyle.id='_sc_splash_style';document.head.appendChild(_scStyle);}
    _scStyle.textContent=`
      

    `;
    const _scWatch=setInterval(()=>{if(stop.v){_scStyle.textContent='';clearInterval(_scWatch);}},200);

    /* ── SVG masque Ghostface ── */
    const MASK_SVG='images/sprite_16.svg';
    const maskImg=new Image();let maskReady=false;
    maskImg.onload=()=>{maskReady=true;};maskImg.src=MASK_SVG;

    /* Masque descendu sous le logo CinéQuiz, 54% de hauteur */
    const MASK_H=H*0.54;
    const MASK_W=MASK_H*0.72; /* ratio approximatif du SVG */
    const MASK_X=cx-MASK_W/2;
    const MASK_Y=H*0.185; /* commence à ~18.5% — sous le logo CinéQuiz */

    /* Citation + logo film juste sous le masque */
    let _scPos=document.getElementById('_sc_pos_s');
    if(!_scPos){_scPos=document.createElement('style');_scPos.id='_sc_pos_s';document.head.appendChild(_scPos);}
    _scPos.textContent=`
      #splash-content-wrap{top:${Math.round((MASK_Y+MASK_H)/H*100)+2}%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _scPosWatch=setInterval(()=>{if(stop.v){_scPos.textContent='';clearInterval(_scPosWatch);}},200);

    /* ── Légère respiration du masque ── */
    let breathT=0;

    /* ── Éclairs de lumière rouge périodiques ── */
    let flashTimer=0, flashOp=0;

    /* ── Couteaux tombants ── */
    function makeKnife(){
     return {
      x:Math.random()*W,
      y:-H*0.15-Math.random()*H*0.4,
      vy:1.2+Math.random()*1.8,
      vx:(Math.random()-0.5)*0.3,
      rot:-Math.PI/2+( Math.random()-0.5)*0.25, /* pointe vers le bas */
      op:0.55+Math.random()*0.40,
      len:H*(0.055+Math.random()*0.040),
     };
    }
    const knives=Array.from({length:18},makeKnife);
    knives.forEach((k,i)=>{k.y=-H*0.05+(i/18)*H*1.15;});

    /* ── Dessine un couteau ── */
    function drawKnife(k){
     ctx.save();
     ctx.translate(k.x, k.y);
     ctx.rotate(k.rot);
     ctx.globalAlpha=k.op;

     const len=k.len;
     const bw=len*0.095; /* largeur lame */

     /* ── Lame ── */
     /* Corps de la lame — dégradé acier */
     const bladeG=ctx.createLinearGradient(-bw,0,bw,0);
     bladeG.addColorStop(0,'rgba(80,80,90,0.95)');
     bladeG.addColorStop(0.35,'rgba(200,200,210,0.97)');
     bladeG.addColorStop(0.65,'rgba(220,220,230,0.97)');
     bladeG.addColorStop(1,'rgba(90,90,100,0.95)');
     ctx.fillStyle=bladeG;
     ctx.beginPath();
     ctx.moveTo(0, len*0.50);     /* pointe */
     ctx.lineTo(-bw, -len*0.10);  /* gauche lame */
     ctx.lineTo(-bw*0.7,-len*0.35);/* épaulement gauche */
     ctx.lineTo(bw*0.7, -len*0.35);/* épaulement droit */
     ctx.lineTo(bw, -len*0.10);   /* droite lame */
     ctx.closePath();
     ctx.fill();

     /* Reflet central de la lame */
     ctx.strokeStyle='rgba(255,255,255,0.45)';ctx.lineWidth=bw*0.18;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(0,-len*0.28);ctx.lineTo(0,len*0.35);ctx.stroke();

     /* Sang sur la pointe */
     const bloodG=ctx.createRadialGradient(0,len*0.42,0,0,len*0.42,bw*0.9);
     bloodG.addColorStop(0,`rgba(180,10,10,${0.85+flashOp*0.12})`);
     bloodG.addColorStop(1,'rgba(100,0,0,0)');
     ctx.fillStyle=bloodG;
     ctx.beginPath();ctx.arc(0,len*0.46,bw*0.7,0,Math.PI*2);ctx.fill();

     /* ── Garde ── */
     ctx.fillStyle='rgba(40,40,45,0.97)';
     ctx.beginPath();ctx.roundRect(-bw*1.35,-len*0.38,bw*2.7,len*0.09,bw*0.3);ctx.fill();

     /* ── Manche ── */
     const handleG=ctx.createLinearGradient(-bw,0,bw,0);
     handleG.addColorStop(0,'rgba(25,20,18,0.97)');
     handleG.addColorStop(0.5,'rgba(60,50,42,0.97)');
     handleG.addColorStop(1,'rgba(25,20,18,0.97)');
     ctx.fillStyle=handleG;
     ctx.beginPath();ctx.roundRect(-bw*0.85,-len*0.78,bw*1.7,len*0.40,bw*0.4);ctx.fill();
     /* Rivets du manche */
     ctx.fillStyle='rgba(120,110,100,0.75)';
     for(let ri=0;ri<3;ri++){
      ctx.beginPath();ctx.arc(0,-len*0.66+ri*len*0.14,bw*0.22,0,Math.PI*2);ctx.fill();
     }

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Fond noir absolu */
     ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);

     /* Flash rouge périodique */
     flashTimer++;
     if(flashTimer>180){flashTimer=0;flashOp=0.65;}
     flashOp*=0.88;
     if(flashOp>0.01){
      const fg=ctx.createRadialGradient(cx,H*0.35,0,cx,H*0.35,W*0.65);
      fg.addColorStop(0,`rgba(140,0,0,${flashOp*0.40})`);
      fg.addColorStop(0.45,`rgba(100,0,0,${flashOp*0.14})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.fillRect(0,0,W,H);
     }

     /* ── Couteaux tombants ── */
     for(const k of knives){
      k.y+=k.vy;k.x+=k.vx;
      if(k.y>H+k.len*2){Object.assign(k,makeKnife());k.y=-k.len;}
      drawKnife(k);
     }

     /* ── Masque Ghostface — blanc/gris sur fond noir ── */
     breathT+=0.018;
     const breathS=1+Math.sin(breathT)*0.008;
     const breathY=Math.sin(breathT*0.7)*H*0.004;
     if(maskReady){
      ctx.save();
      ctx.translate(cx,MASK_Y+MASK_H/2+breathY);
      ctx.scale(breathS,breathS);

      /* Halo rouge derrière le masque */
      const halo=ctx.createRadialGradient(0,0,MASK_W*0.10,0,0,MASK_W*0.72);
      halo.addColorStop(0,`rgba(80,0,0,${0.22+flashOp*0.28})`);
      halo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo;ctx.beginPath();ctx.arc(0,0,MASK_W*0.72,0,Math.PI*2);ctx.fill();

      /* Dessiner le masque SVG (noir) sur canvas off-screen puis l'inverser en blanc */
      const oc=document.createElement('canvas');
      oc.width=MASK_W;oc.height=MASK_H;
      const ot=oc.getContext('2d');
      /* Fond blanc sur offscreen */
      ot.fillStyle='rgba(220,220,220,1)';ot.fillRect(0,0,MASK_W,MASK_H);
      /* Dessiner le masque SVG en noir par-dessus */
      ot.globalCompositeOperation='destination-out';
      ot.drawImage(maskImg,0,0,MASK_W,MASK_H);
      /* Résultat : les zones du masque (noires) sont effacées → transparentes
         les zones extérieures (blanches) restent → gris clair */
      /* On veut l'inverse : le masque visible en blanc, fond transparent */
      /* Utiliser "source-in" pour garder seulement les pixels du masque */
      const oc2=document.createElement('canvas');
      oc2.width=MASK_W;oc2.height=MASK_H;
      const ot2=oc2.getContext('2d');
      ot2.drawImage(maskImg,0,0,MASK_W,MASK_H); /* masque noir */
      ot2.globalCompositeOperation='source-in';
      ot2.fillStyle='rgba(210,210,215,0.96)'; /* gris clair = couleur du masque */
      ot2.fillRect(0,0,MASK_W,MASK_H);

      ctx.globalAlpha=0.97;
      ctx.drawImage(oc2,-MASK_W/2,-MASK_H/2,MASK_W,MASK_H);

      ctx.restore();
     }

     /* Vignette très marquée — centrée sur le masque */
     const vg=ctx.createRadialGradient(cx,H*0.42,H*0.08,cx,H*0.42,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.35)');
     vg.addColorStop(1,'rgba(0,0,0,0.97)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain pellicule */
     for(let i=0;i<35;i++){const g=3+Math.random()*10|0;ctx.fillStyle=`rgba(${g},${g},${g},${Math.random()*0.018})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
