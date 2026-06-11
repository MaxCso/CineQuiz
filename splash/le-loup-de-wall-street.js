// CinéQuiz splash chunk — Le Loup de Wall Street
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Loup de Wall Street"]={
   name:'Le Loup de Wall Street',
   color:'240,160,20',
   ref:'Le Loup de Wall Street \u2014 Martin Scorsese, 2013',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : jaune vif de l'affiche ── */
    let _lwStyle=document.getElementById('_lw_splash_style');
    if(!_lwStyle){_lwStyle=document.createElement('style');_lwStyle.id='_lw_splash_style';document.head.appendChild(_lwStyle);}
    _lwStyle.textContent=`
      

      #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
      #splash-content-wrap.reveal{transform:none!important;}
    `;
    const _lwWatch=setInterval(()=>{if(stop.v){_lwStyle.textContent='';clearInterval(_lwWatch);}},200);

    /* ── SVG stylo (120×668) ── */
    const PEN_SVG='images/sprite_15.svg';
    const penImg=new Image();let penReady=false;
    penImg.onload=()=>{penReady=true;};penImg.src=PEN_SVG;

    /* ── CSS override : citation + logo sous le stylo ── */
    let _lwPos=document.getElementById('_lw_pos_s');
    if(!_lwPos){_lwPos=document.createElement('style');_lwPos.id='_lw_pos_s';document.head.appendChild(_lwPos);}
    _lwPos.textContent=`#splash-content-wrap{top:72%!important;}`;
    const _lwPosW=setInterval(()=>{if(stop.v){_lwPos.textContent='';clearInterval(_lwPosW);}},200);

    /* Dimensions stylo : descendu à H*0.22, hauteur 46% */
    const PEN_H=H*0.46;
    const PEN_W=PEN_H*(120/668);
    const PEN_X=cx-PEN_W/2;
    const PEN_Y=H*0.18;

    /* ── Légère rotation du stylo ── */
    let penSwing=0;

    /* ── Billets qui tombent — format réaliste ── */
    function makeBill(){
     const bw=W*(0.16+Math.random()*0.10); /* largeur généreuse */
     const bh=bw*0.44;                      /* ratio billet réel ~2.3:1 */
     return {
      x:Math.random()*W,
      y:-bh-Math.random()*H*0.5,
      w:bw, h:bh,
      rot:(Math.random()-0.5)*Math.PI*0.5, /* rotation modérée, jamais vertical */
      vrot:(Math.random()-0.5)*0.018,
      vy:0.70+Math.random()*1.0,
      vx:(Math.random()-0.5)*0.30,
      wobble:Math.random()*Math.PI*2,
      wobbleSpd:0.018+Math.random()*0.020,
      op:0.75+Math.random()*0.22,
     };
    }
    const bills=Array.from({length:26},(_,i)=>{
     const b=makeBill();
     b.y=-b.h+(i/26)*H*1.25;
     return b;
    });

    /* ── Dessine un vrai billet ── */
    function drawBill(b){
     ctx.save();
     ctx.translate(b.x+b.w/2, b.y+b.h/2);
     ctx.rotate(b.rot);
     ctx.globalAlpha=b.op;

     /* Corps principal */
     const bg=ctx.createLinearGradient(-b.w/2,-b.h/2,b.w/2,b.h/2);
     bg.addColorStop(0,'rgba(38,92,45,0.97)');
     bg.addColorStop(0.5,'rgba(52,115,58,0.97)');
     bg.addColorStop(1,'rgba(34,82,40,0.97)');
     ctx.fillStyle=bg;
     ctx.beginPath();ctx.roundRect(-b.w/2,-b.h/2,b.w,b.h,b.h*0.07);ctx.fill();

     /* Bordure dorée */
     ctx.strokeStyle='rgba(180,155,50,0.55)';ctx.lineWidth=b.h*0.055;
     ctx.beginPath();ctx.roundRect(-b.w/2,-b.h/2,b.w,b.h,b.h*0.07);ctx.stroke();

     /* Filet intérieur */
     ctx.strokeStyle='rgba(160,200,140,0.20)';ctx.lineWidth=b.h*0.03;
     ctx.beginPath();ctx.roundRect(-b.w*0.44,-b.h*0.34,b.w*0.88,b.h*0.68,b.h*0.04);ctx.stroke();

     /* Oval central */
     ctx.fillStyle='rgba(55,130,62,0.55)';
     ctx.beginPath();ctx.ellipse(0,0,b.w*0.22,b.h*0.38,0,0,Math.PI*2);ctx.fill();

     /* Signe $ */
     ctx.fillStyle='rgba(225,245,218,0.92)';
     ctx.font=`bold ${Math.round(b.h*0.58)}px Georgia,serif`;
     ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText('$',0,b.h*0.02);

     /* "100" à gauche et droite */
     ctx.font=`bold ${Math.round(b.h*0.26)}px Arial,sans-serif`;
     ctx.fillStyle='rgba(195,230,190,0.70)';
     ctx.fillText('100',-b.w*0.30, 0);
     ctx.fillText('100', b.w*0.30, 0);

     /* Microtext décoratif — lignes */
     ctx.strokeStyle='rgba(140,185,130,0.25)';ctx.lineWidth=b.h*0.025;
     for(let li=0;li<3;li++){
      const ly=-b.h*0.12+li*b.h*0.12;
      ctx.beginPath();ctx.moveTo(-b.w*0.44,ly);ctx.lineTo(-b.w*0.24,ly);ctx.stroke();
      ctx.beginPath();ctx.moveTo( b.w*0.24,ly);ctx.lineTo( b.w*0.44,ly);ctx.stroke();
     }

     /* Reflet */
     const ref=ctx.createLinearGradient(-b.w/2,-b.h/2,b.w*0.2,-b.h*0.1);
     ref.addColorStop(0,'rgba(255,255,255,0.12)');
     ref.addColorStop(1,'rgba(255,255,255,0)');
     ctx.fillStyle=ref;
     ctx.beginPath();ctx.roundRect(-b.w/2,-b.h/2,b.w,b.h,b.h*0.07);ctx.fill();

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Fond jaune ambré — dégradé riche */
     const bgG=ctx.createLinearGradient(0,0,W,H);
     bgG.addColorStop(0,'#f8b830');
     bgG.addColorStop(0.40,'#f5a820');
     bgG.addColorStop(0.75,'#e89610');
     bgG.addColorStop(1,'#d88808');
     ctx.fillStyle=bgG;ctx.fillRect(0,0,W,H);

     /* Halo central chaud */
     const halo=ctx.createRadialGradient(cx,H*0.35,20,cx,H*0.35,W*0.72);
     halo.addColorStop(0,`rgba(255,210,80,${0.20+Math.sin(t*0.18)*0.04})`);
     halo.addColorStop(0.5,'rgba(245,170,30,0.08)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

     /* Texture légère — coins plus sombres */
     const vg2=ctx.createRadialGradient(cx,H*0.50,H*0.10,cx,H*0.50,H*0.88);
     vg2.addColorStop(0,'rgba(0,0,0,0)');
     vg2.addColorStop(1,'rgba(60,28,0,0.20)');
     ctx.fillStyle=vg2;ctx.fillRect(0,0,W,H);

     /* ── Billets tombants ── */
     for(const b of bills){
      b.y+=b.vy; b.x+=b.vx;
      b.rot+=b.vrot;
      b.wobble+=b.wobbleSpd;
      b.x+=Math.sin(b.wobble)*0.28;
      if(b.y>H+b.h*2){Object.assign(b,makeBill());b.y=-b.h;}
      drawBill(b);
     }

     /* ── Stylo SVG — légère oscillation ── */
     penSwing+=0.018;
     const swing=Math.sin(penSwing)*0.015;
     if(penReady){
      ctx.save();
      ctx.translate(PEN_X+PEN_W/2, PEN_Y+PEN_H/2);
      ctx.rotate(swing);
      /* Ombre portée */
      ctx.shadowColor='rgba(80,40,0,0.22)';ctx.shadowBlur=14;ctx.shadowOffsetX=5;
      ctx.globalAlpha=0.97;
      ctx.drawImage(penImg,-PEN_W/2,-PEN_H/2,PEN_W,PEN_H);
      ctx.restore();
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.12,cx,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.04)');
     vg.addColorStop(1,'rgba(0,0,0,0.24)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
