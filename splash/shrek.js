// CinéQuiz splash chunk — Shrek
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Shrek"]={
   name:'Shrek',
   color:'60,160,40',
   ref:'Shrek \u2014 Andrew Adamson & Vicky Jenson, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond + citation sous le logo ── */
    let _skStyle=document.getElementById('_sk_s');
    if(!_skStyle){_skStyle=document.createElement('style');_skStyle.id='_sk_s';document.head.appendChild(_skStyle);}
    _skStyle.textContent=`
      
      
      #splash-content-wrap{top:20%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _skW=setInterval(()=>{if(stop.v){_skStyle.textContent='';clearInterval(_skW);}},200);

    /* ── SVG Shrek (silhouette paysage 736×538) ── */
    const SHREK_SVG='images/sprite_07.svg';
    const shrekImg=new Image();let shrekReady=false,shrekSil=null;
    shrekImg.onload=()=>{shrekReady=true;};shrekImg.src=SHREK_SVG;
    /* Le SVG couvre toute la largeur, ratio 736/538 */
    const SVG_W=736,SVG_H=538;
    const shrekW=W;
    const shrekH=shrekW*(SVG_H/SVG_W);
    const shrekX=0;
    const shrekY=H-shrekH; /* collé en bas d'écran */

    /* ── Âne SVG (119×302, portrait) ── */
    const DONKEY_SVG='images/sprite_08.svg';
    const donkeyImg=new Image();let donkeyReady=false,donkeySil=null;
    donkeyImg.onload=()=>{donkeyReady=true;};donkeyImg.src=DONKEY_SVG;
    /* Hauteur âne = 42% de l'écran, centré */
    const donkeyH=H*0.28;
    const donkeyW=donkeyH*(119/302);
    const donkeyX=cx-donkeyW/2;
    const donkeyY=shrekY-donkeyH*0.82; /* pied de l'âne dans la silhouette Shrek */

    /* ── Étoiles nuit ── */
    const stars=Array.from({length:130},()=>({
     x:Math.random()*W, y:Math.random()*H*0.55,
     r:Math.random()*1.2+0.2,
     op:Math.random()*0.65+0.18,
     tw:Math.random()*Math.PI*2,
     tf:Math.random()*0.025+0.008
    }));

    /* ── Lucioles ── */
    const fireflies=Array.from({length:32},()=>({
     x:Math.random()*W,
     y:H*0.42+Math.random()*H*0.50,
     vx:(Math.random()-0.5)*0.50,
     vy:(Math.random()-0.5)*0.32,
     phase:Math.random()*Math.PI*2,
     freq:0.055+Math.random()*0.075,
     r:Math.random()*1.6+0.7
    }));

    /* ── Bulles de marécage ── */
    const bubbles=Array.from({length:16},()=>({
     x:Math.random()*W,
     y:H*0.82+Math.random()*H*0.14,
     r:Math.random()*4+1.5,
     vy:-(Math.random()*0.45+0.18),
     op:Math.random()*0.45+0.18,
     life:Math.random()
    }));

    function frame(){
     if(stop.v)return;

     /* Fond trail */
     ctx.fillStyle='rgba(3,13,4,0.28)';ctx.fillRect(0,0,W,H);

     /* Ciel nuit forêt — dégradé vert profond */
     const sky=ctx.createLinearGradient(0,0,0,H*0.60);
     sky.addColorStop(0,'#020a03');
     sky.addColorStop(0.40,'#040e05');
     sky.addColorStop(0.75,'#071408');
     sky.addColorStop(1,'#0a1c0b');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.60);

     /* Lune verte caractéristique de Shrek */
     const moonX=W*0.78, moonY=H*0.14;
     const moonG=ctx.createRadialGradient(moonX-W*0.02,moonY-H*0.02,3,moonX,moonY,W*0.068);
     moonG.addColorStop(0,`rgba(195,240,110,${0.90+Math.sin(t*0.4)*0.05})`);
     moonG.addColorStop(0.55,`rgba(140,200,60,${0.60+Math.sin(t*0.3)*0.06})`);
     moonG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonG;ctx.beginPath();ctx.arc(moonX,moonY,W*0.068,0,Math.PI*2);ctx.fill();
     /* Disque solide */
     ctx.fillStyle=`rgba(185,235,95,${0.88+Math.sin(t*0.4)*0.06})`;
     ctx.beginPath();ctx.arc(moonX,moonY,W*0.042,0,Math.PI*2);ctx.fill();

     /* Halo marécage au sol */
     const swampGlow=ctx.createRadialGradient(cx,H*0.80,20,cx,H*0.80,W*0.65);
     swampGlow.addColorStop(0,`rgba(50,110,20,${0.18+Math.sin(t*0.5)*0.04})`);
     swampGlow.addColorStop(0.5,'rgba(25,60,10,0.08)');
     swampGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=swampGlow;ctx.fillRect(0,H*0.50,W,H*0.50);

     /* Étoiles */
     for(const s of stars){
      s.tw+=s.tf;
      const op=s.op*(0.55+0.45*Math.sin(s.tw));
      ctx.fillStyle=`rgba(240,255,200,${op})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* Zone eau/marécage */
     const water=ctx.createLinearGradient(0,H*0.74,0,H);
     water.addColorStop(0,'rgba(18,50,12,0.55)');
     water.addColorStop(1,'rgba(8,25,5,0.80)');
     ctx.fillStyle=water;ctx.fillRect(0,H*0.74,W,H*0.26);

     /* Reflets ondulants dans l'eau */
     ctx.strokeStyle=`rgba(55,120,22,${0.10+Math.sin(t*1.1)*0.04})`;ctx.lineWidth=1.5;
     for(let i=0;i<5;i++){
      const wy=H*0.76+i*H*0.038;
      ctx.beginPath();
      for(let x=0;x<=W;x+=5) ctx.lineTo(x,wy+Math.sin(x*0.038+t*1.4+i)*2.2);
      ctx.stroke();
     }

     /* Brume basse entre le SVG et le ciel */
     const mist=ctx.createLinearGradient(0,shrekY-H*0.06,0,shrekY+H*0.04);
     mist.addColorStop(0,'rgba(0,0,0,0)');
     mist.addColorStop(0.5,`rgba(35,75,15,${0.22+Math.sin(t*0.35)*0.06})`);
     mist.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mist;ctx.fillRect(0,shrekY-H*0.06,W,H*0.10);

     /* Bulles */
     for(const b of bubbles){
      b.y+=b.vy;b.life-=0.003;
      if(b.y<H*0.72||b.life<=0){b.y=H*0.90+Math.random()*H*0.07;b.x=Math.random()*W;b.life=1;}
      ctx.strokeStyle=`rgba(65,125,28,${b.op*b.life})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.stroke();
     }

     /* Lucioles */
     for(const f of fireflies){
      f.x+=f.vx+Math.sin(t*0.65+f.phase)*0.42;
      f.y+=f.vy+Math.cos(t*0.55+f.phase)*0.28;
      if(f.x<0)f.x=W;if(f.x>W)f.x=0;
      if(f.y<H*0.38)f.y=H*0.38;if(f.y>H*0.95)f.y=H*0.95;
      f.phase+=f.freq;
      const glow=0.35+Math.sin(f.phase)*0.65;
      if(glow<0.04)continue;
      const fg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*6);
      fg.addColorStop(0,`rgba(190,255,90,${glow*0.92})`);
      fg.addColorStop(0.4,`rgba(110,210,35,${glow*0.40})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.beginPath();ctx.arc(f.x,f.y,f.r*6,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(230,255,170,${glow})`;
      ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();
     }

     /* SVG Âne — juste au-dessus de Shrek */
     if(donkeyReady){
      if(!donkeySil){
       const oc=document.createElement('canvas');
       oc.width=Math.ceil(donkeyW);oc.height=Math.ceil(donkeyH);
       const ot=oc.getContext('2d');
       ot.drawImage(donkeyImg,0,0,donkeyW,donkeyH);
       /* Teinte vert-jaune marécage, légèrement plus claire que Shrek */
       ot.globalCompositeOperation='source-in';
       ot.fillStyle='rgba(42,88,18,0.97)';
       ot.fillRect(0,0,donkeyW,donkeyH);
       donkeySil=oc;
      }
      ctx.save();
      ctx.globalAlpha=0.95;
      ctx.drawImage(donkeySil,donkeyX,donkeyY,donkeyW,donkeyH);
      ctx.restore();
     }

     /* SVG Shrek — silhouette verte en bas */
     if(shrekReady){
      if(!shrekSil){
       const oc=document.createElement('canvas');
       oc.width=Math.ceil(shrekW);oc.height=Math.ceil(shrekH);
       const ot=oc.getContext('2d');
       ot.drawImage(shrekImg,0,0,shrekW,shrekH);
       /* Teinter vert marécage foncé */
       ot.globalCompositeOperation='source-in';
       ot.fillStyle='rgba(28,68,14,0.97)';
       ot.fillRect(0,0,shrekW,shrekH);
       shrekSil=oc;
      }
      ctx.save();
      ctx.globalAlpha=0.96;
      ctx.drawImage(shrekSil,shrekX,shrekY,shrekW,shrekH);
      ctx.restore();
     }

     /* Vignette latérale douce */
     const vgL=ctx.createLinearGradient(0,0,W*0.12,0);
     vgL.addColorStop(0,'rgba(0,0,0,0.45)');vgL.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgL;ctx.fillRect(0,0,W*0.12,H);
     const vgR=ctx.createLinearGradient(W,0,W*0.88,0);
     vgR.addColorStop(0,'rgba(0,0,0,0.45)');vgR.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgR;ctx.fillRect(W*0.88,0,W*0.12,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
