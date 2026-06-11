// CinéQuiz splash chunk — Les Gardiens de la Galaxie
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Les Gardiens de la Galaxie"]={
   name:'Les Gardiens de la Galaxie',
   color:'60,20,140',
   ref:'Guardians of the Galaxy \u2014 James Gunn, 2014',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_gotg_s');
    if(!_s){_s=document.createElement('style');_s.id='_gotg_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:45%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Étoiles */
    const stars=Array.from({length:200},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:Math.random()*1.5+0.2,
     op:0.25+Math.random()*0.65,
     ph:Math.random()*Math.PI*2,
     spd:0.006+Math.random()*0.018,
    }));

    /* Milano — traverse lentement */
    let milanoX=-W*0.18, milanoY=H*0.32, milanoSpd=W*0.0010;

    /* Planètes */
    const planets=[
     {x:W*0.82,y:H*0.16,r:W*0.055,ring:true,  col1:'#a05020',col2:'#c87840'},
     {x:W*0.14,y:H*0.22,r:W*0.030,ring:false, col1:'#284898',col2:'#3060c0'},
    ];

    /* Étoiles filantes */
    const shootingStars=Array.from({length:4},(_,i)=>({
     x:Math.random()*W, y:Math.random()*H*0.50,
     len:W*(0.08+Math.random()*0.10),
     angle:Math.PI/5+Math.random()*0.25,
     spd:W*(0.010+Math.random()*0.007),
     op:0, life:0,
     timer:i*140+Math.random()*100,
     col:['255,200,255','180,220,255','255,255,180','180,255,220'][i],
    }));

    /* Deuxième vaisseau — plus petit, direction opposée, plus bas */
    let milano2X=W+W*0.12, milano2Y=H*0.58, milano2Spd=W*0.0007;

    /* Walkman cassette */
    let tapeT=0;
    /* ── Walkman SVG ── */
    const wmSvgImg=new Image();let wmSvgReady=false;
    wmSvgImg.onload=()=>{wmSvgReady=true;};
    wmSvgImg.src='images/Walkman.svg';

    /* Particules colorées */
    const particles=Array.from({length:40},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.18, vy:-(0.04+Math.random()*0.12),
     r:Math.random()*2.2+0.5,
     ph:Math.random()*Math.PI*2,
     col:['255,80,200','80,180,255','120,255,180','255,160,40'][Math.floor(Math.random()*4)],
     op:0.08+Math.random()*0.20,
    }));

    function drawNebula(){
     /* Grande nébuleuse rose-violette */
     const nb1=ctx.createRadialGradient(cx*0.60,H*0.35,0,cx*0.60,H*0.35,W*0.65);
     nb1.addColorStop(0,`rgba(180,20,160,${0.18+Math.sin(t*0.2)*0.03})`);
     nb1.addColorStop(0.40,`rgba(140,15,120,${0.10+Math.sin(t*0.18)*0.02})`);
     nb1.addColorStop(0.75,'rgba(80,10,80,0.05)');
     nb1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nb1;ctx.fillRect(0,0,W,H);
     /* Nébuleuse bleue-cyan à droite */
     const nb2=ctx.createRadialGradient(W*0.80,H*0.55,0,W*0.80,H*0.55,W*0.50);
     nb2.addColorStop(0,`rgba(20,120,220,${0.16+Math.sin(t*0.25+1)*0.03})`);
     nb2.addColorStop(0.45,`rgba(15,80,180,0.08)`);
     nb2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nb2;ctx.fillRect(0,0,W,H);
     /* Traînée verte-turquoise au bas */
     const nb3=ctx.createRadialGradient(cx*0.30,H*0.72,0,cx*0.30,H*0.72,W*0.40);
     nb3.addColorStop(0,`rgba(20,200,140,${0.10+Math.sin(t*0.3+2)*0.02})`);
     nb3.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nb3;ctx.fillRect(0,0,W,H);
    }

    function drawPlanet(pl){
     /* Corps */
     const pg=ctx.createRadialGradient(pl.x-pl.r*0.25,pl.y-pl.r*0.25,pl.r*0.05,pl.x,pl.y,pl.r);
     pg.addColorStop(0,pl.col2);pg.addColorStop(0.55,pl.col1);pg.addColorStop(1,'rgba(0,0,0,0.55)');
     ctx.fillStyle=pg;ctx.beginPath();ctx.arc(pl.x,pl.y,pl.r,0,Math.PI*2);ctx.fill();
     /* Bandes atmosphériques */
     if(pl.ring){
      for(let bi=0;bi<3;bi++){
       const by=pl.y-pl.r*0.4+bi*pl.r*0.32;
       ctx.save();ctx.beginPath();ctx.arc(pl.x,pl.y,pl.r,0,Math.PI*2);ctx.clip();
       ctx.fillStyle=`rgba(0,0,0,${0.08+bi*0.04})`;
       ctx.fillRect(pl.x-pl.r,by,pl.r*2,pl.r*0.12);
       ctx.restore();
      }
      /* Anneau */
      ctx.save();ctx.translate(pl.x,pl.y);ctx.scale(1,0.28);
      const rg=ctx.createRadialGradient(0,0,pl.r*1.10,0,0,pl.r*1.90);
      rg.addColorStop(0,'rgba(200,160,80,0.50)');
      rg.addColorStop(0.5,'rgba(180,140,60,0.35)');
      rg.addColorStop(1,'rgba(160,120,40,0)');
      ctx.fillStyle=rg;
      ctx.beginPath();ctx.arc(0,0,pl.r*1.90,0,Math.PI*2);
      ctx.arc(0,0,pl.r*1.08,0,Math.PI*2,true);
      ctx.fill();
      ctx.restore();
     }
     /* Halo lumineux */
     const hg=ctx.createRadialGradient(pl.x,pl.y,pl.r*0.9,pl.x,pl.y,pl.r*1.5);
     hg.addColorStop(0,`rgba(${pl.col2.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.18)`);
     hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.beginPath();ctx.arc(pl.x,pl.y,pl.r*1.5,0,Math.PI*2);ctx.fill();
    }

    function drawMilano(){
     /* Vaisseau Milano stylisé vu de côté */
     const mX=milanoX, mY=milanoY+Math.sin(t*0.6)*H*0.006;
     const mW=W*0.20, mH=mW*0.38;
     ctx.save();ctx.translate(mX,mY);
     /* Corps central */
     ctx.fillStyle='rgba(80,90,110,0.92)';
     ctx.beginPath();
     ctx.moveTo(-mW*0.50,mH*0.08);
     ctx.lineTo(-mW*0.20,-mH*0.40);
     ctx.lineTo(mW*0.40,-mH*0.10);
     ctx.lineTo(mW*0.50,mH*0.12);
     ctx.lineTo(mW*0.20,mH*0.38);
     ctx.lineTo(-mW*0.35,mH*0.35);
     ctx.closePath();ctx.fill();
     /* Aile gauche */
     ctx.fillStyle='rgba(60,70,90,0.88)';
     ctx.beginPath();
     ctx.moveTo(-mW*0.20,-mH*0.40);
     ctx.lineTo(-mW*0.55,-mH*0.80);
     ctx.lineTo(-mW*0.05,-mH*0.15);
     ctx.closePath();ctx.fill();
     /* Aile droite */
     ctx.beginPath();
     ctx.moveTo(mW*0.20,mH*0.38);
     ctx.lineTo(mW*0.55,mH*0.70);
     ctx.lineTo(mW*0.05,mH*0.15);
     ctx.closePath();ctx.fill();
     /* Cockpit */
     ctx.fillStyle='rgba(40,160,220,0.55)';
     ctx.beginPath();ctx.ellipse(mW*0.08,-mH*0.08,mW*0.12,mH*0.12,0.3,0,Math.PI*2);ctx.fill();
     /* Réacteur — lueur orange */
     const eg=ctx.createRadialGradient(-mW*0.48,mH*0.12,0,-mW*0.48,mH*0.12,mW*0.12);
     eg.addColorStop(0,`rgba(255,140,30,${0.80+Math.sin(t*3)*0.15})`);
     eg.addColorStop(0.4,'rgba(255,80,10,0.30)');
     eg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=eg;ctx.fillRect(-mW*0.60,mH*0.00,mW*0.24,mH*0.24);
     ctx.restore();
     /* Traînée moteur */
     const trailG=ctx.createLinearGradient(milanoX-mW*0.55,milanoY,milanoX-mW*1.40,milanoY);
     trailG.addColorStop(0,`rgba(255,120,20,${0.35+Math.sin(t*2)*0.08})`);
     trailG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.strokeStyle=trailG;ctx.lineWidth=mH*0.08;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(milanoX-mW*0.50,milanoY+mH*0.12);ctx.lineTo(milanoX-mW*1.35,milanoY+mH*0.12);ctx.stroke();
    }

    function drawWalkman(){
     /* Walkman SVG — centré, sous le logo Cinéquiz */
     if(!wmSvgReady) return;
     /* viewBox 499×326 → ratio 499/326 ≈ 1.530 */
     const wkW=W*0.58;
     const wkH=wkW*(326/499);
     const wkX=cx-wkW/2;
     const wkY=H*0.30-wkH/2;
     ctx.drawImage(wmSvgImg,wkX,wkY,wkW,wkH);
    }
    function drawGuardians(){
     const gY=H*0.88;
     /* Lueur de bas en haut pour éclairer les silhouettes */
     const groundGlow=ctx.createLinearGradient(0,gY,0,gY-H*0.35);
     groundGlow.addColorStop(0,`rgba(80,40,160,${0.30+Math.sin(t*0.5)*0.06})`);
     groundGlow.addColorStop(0.4,'rgba(60,20,120,0.12)');
     groundGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=groundGlow;ctx.fillRect(0,gY-H*0.35,W,H*0.35);

     const configs=[
      {x:cx-W*0.36,h:0.92,coat:true},
      {x:cx-W*0.18,h:0.78,small:true},
      {x:cx,       h:1.18,groot:true},
      {x:cx+W*0.17,h:1.05,muscular:true},
      {x:cx+W*0.35,h:0.96,slim:true},
     ];
     for(const g of configs){
      const headR=W*0.020*g.h;
      const bodyW=W*(g.groot?0.052:g.muscular?0.042:g.small?0.028:0.032)*g.h;
      const bodyH=H*(g.groot?0.095:0.070)*g.h;
      const legH=H*(g.small?0.040:0.055)*g.h;
      /* Halo individuel par personnage */
      const haloG=ctx.createRadialGradient(g.x,gY-bodyH*0.5-legH,0,g.x,gY-bodyH*0.5-legH,bodyW*3.5);
      haloG.addColorStop(0,`rgba(120,80,220,${0.18+Math.sin(t*0.6+g.x)*0.05})`);
      haloG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=haloG;ctx.fillRect(g.x-bodyW*3.5,gY-bodyH-legH-headR*3,bodyW*7,bodyH+legH+headR*4);
      /* Silhouette — bleu-violet sombre mais visible */
      ctx.fillStyle='rgba(38,28,72,0.98)';
      ctx.strokeStyle='rgba(90,60,160,0.55)';ctx.lineWidth=1.0;
      /* Tête */
      ctx.beginPath();ctx.arc(g.x,gY-bodyH-legH-headR*1.5,headR,0,Math.PI*2);ctx.fill();ctx.stroke();
      if(g.groot){
       ctx.strokeStyle='rgba(38,28,72,0.98)';ctx.lineWidth=bodyW*0.30;ctx.lineCap='round';
       ctx.beginPath();ctx.moveTo(g.x-bodyW*0.5,gY-bodyH-legH-headR*0.5);ctx.lineTo(g.x-bodyW*1.2,gY-bodyH-legH-headR*2.5);ctx.stroke();
       ctx.beginPath();ctx.moveTo(g.x+bodyW*0.5,gY-bodyH-legH-headR*0.5);ctx.lineTo(g.x+bodyW*1.2,gY-bodyH-legH-headR*2.8);ctx.stroke();
      }
      ctx.fillStyle='rgba(38,28,72,0.98)';
      ctx.beginPath();ctx.roundRect(g.x-bodyW*0.5,gY-bodyH-legH,bodyW,bodyH,bodyW*0.12);ctx.fill();
      if(g.coat){
       ctx.beginPath();
       ctx.moveTo(g.x-bodyW*0.5,gY-bodyH-legH+bodyH*0.20);
       ctx.lineTo(g.x-bodyW*0.85,gY-legH);
       ctx.lineTo(g.x+bodyW*0.85,gY-legH);
       ctx.lineTo(g.x+bodyW*0.5,gY-bodyH-legH+bodyH*0.20);
       ctx.closePath();ctx.fill();
      }
      ctx.strokeStyle='rgba(38,28,72,0.98)';ctx.lineWidth=bodyW*0.38;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(g.x-bodyW*0.5,gY-bodyH-legH+bodyH*0.15);ctx.lineTo(g.x-bodyW*0.90,gY-legH-H*0.010);ctx.stroke();
      ctx.beginPath();ctx.moveTo(g.x+bodyW*0.5,gY-bodyH-legH+bodyH*0.15);ctx.lineTo(g.x+bodyW*0.90,gY-legH-H*0.010);ctx.stroke();
      ctx.lineWidth=bodyW*0.40;
      ctx.beginPath();ctx.moveTo(g.x-bodyW*0.22,gY-legH);ctx.lineTo(g.x-bodyW*0.28,gY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(g.x+bodyW*0.22,gY-legH);ctx.lineTo(g.x+bodyW*0.28,gY);ctx.stroke();
      /* Contour lumineux */
      ctx.strokeStyle=`rgba(140,100,255,${0.25+Math.sin(t*0.8+g.x)*0.08})`;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.arc(g.x,gY-bodyH-legH-headR*1.5,headR,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.roundRect(g.x-bodyW*0.5,gY-bodyH-legH,bodyW,bodyH,bodyW*0.12);ctx.stroke();
     }
    }

    function frame(){
     if(stop.v)return;
     tapeT+=0.055;

     /* Fond espace profond */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#010008');bg.addColorStop(0.35,'#040118');bg.addColorStop(0.70,'#080228');bg.addColorStop(1,'#030115');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Nébuleuses colorées */
     drawNebula();

     /* Étoiles scintillantes */
     for(const s of stars){
      s.ph+=s.spd;
      const op=s.op*(0.45+0.55*Math.abs(Math.sin(s.ph)));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(225,215,255,${op})`;ctx.fill();
     }

     /* Planètes */
     for(const pl of planets) drawPlanet(pl);

     /* Particules colorées */
     for(const p of particles){
      p.x+=p.vx;p.y+=p.vy;p.ph+=0.022;
      if(p.y<0){p.y=H;p.x=Math.random()*W;}
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      const pa=p.op*(0.35+0.65*Math.abs(Math.sin(p.ph)));
      const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3.5);
      pg.addColorStop(0,`rgba(${p.col},${pa})`);pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(p.x,p.y,p.r*3.5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(${p.col},${Math.min(1,pa*2)})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* Étoiles filantes */
     for(const ss of shootingStars){
      ss.timer--;
      if(ss.timer<=0){
       ss.x=Math.random()*W*0.65;ss.y=Math.random()*H*0.45;
       ss.life=1.0;ss.timer=180+Math.random()*200;
      }
      if(ss.life>0){
       ss.x+=Math.cos(ss.angle)*ss.spd;
       ss.y+=Math.sin(ss.angle)*ss.spd;
       ss.life-=0.018;
       const tx=ss.x-Math.cos(ss.angle)*ss.len;
       const ty=ss.y-Math.sin(ss.angle)*ss.len;
       const sg=ctx.createLinearGradient(tx,ty,ss.x,ss.y);
       sg.addColorStop(0,'rgba(0,0,0,0)');
       sg.addColorStop(1,`rgba(${ss.col},${ss.life*0.85})`);
       ctx.strokeStyle=sg;ctx.lineWidth=1.8;
       ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(ss.x,ss.y);ctx.stroke();
      }
     }

     /* Milano */
     milanoX+=milanoSpd;
     if(milanoX>W+W*0.20){milanoX=-W*0.18;milanoY=H*(0.25+Math.random()*0.15);}
     drawMilano();

     /* Milano 2 — plus petit, droite→gauche, plus bas */
     milano2X-=milano2Spd;
     if(milano2X<-W*0.15){milano2X=W+W*0.12;milano2Y=H*(0.50+Math.random()*0.15);}
     ctx.save();
     ctx.translate(milano2X+W*0.08, milano2Y+Math.sin(t*0.75+2)*H*0.004);
     ctx.scale(-0.55,0.55); /* miroir + plus petit */
     const mW2=W*0.20,mH2=mW2*0.38;
     ctx.fillStyle='rgba(70,80,100,0.88)';
     ctx.beginPath();
     ctx.moveTo(-mW2*0.50,mH2*0.08);ctx.lineTo(-mW2*0.20,-mH2*0.40);
     ctx.lineTo(mW2*0.40,-mH2*0.10);ctx.lineTo(mW2*0.50,mH2*0.12);
     ctx.lineTo(mW2*0.20,mH2*0.38);ctx.lineTo(-mW2*0.35,mH2*0.35);
     ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(50,60,80,0.84)';
     ctx.beginPath();ctx.moveTo(-mW2*0.20,-mH2*0.40);ctx.lineTo(-mW2*0.55,-mH2*0.80);ctx.lineTo(-mW2*0.05,-mH2*0.15);ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.moveTo(mW2*0.20,mH2*0.38);ctx.lineTo(mW2*0.55,mH2*0.70);ctx.lineTo(mW2*0.05,mH2*0.15);ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(60,140,200,0.50)';
     ctx.beginPath();ctx.ellipse(mW2*0.08,-mH2*0.08,mW2*0.12,mH2*0.12,0.3,0,Math.PI*2);ctx.fill();
     const eg2=ctx.createRadialGradient(-mW2*0.48,mH2*0.12,0,-mW2*0.48,mH2*0.12,mW2*0.10);
     eg2.addColorStop(0,`rgba(100,200,255,${0.75+Math.sin(t*2.8)*0.18})`);
     eg2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=eg2;ctx.fillRect(-mW2*0.58,mH2*0.02,mW2*0.20,mH2*0.20);
     ctx.restore();
     /* Traînée bleue */
     const trail2G=ctx.createLinearGradient(milano2X+W*0.08,milano2Y,milano2X+W*0.08+mW2*0.9,milano2Y);
     trail2G.addColorStop(0,`rgba(80,180,255,${0.30+Math.sin(t*2.2)*0.08})`);
     trail2G.addColorStop(1,'rgba(0,0,0,0)');
     ctx.strokeStyle=trail2G;ctx.lineWidth=mH2*0.06*0.55;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(milano2X+W*0.08,milano2Y+mH2*0.12*0.55);ctx.lineTo(milano2X+W*0.08+mW2*0.85,milano2Y+mH2*0.12*0.55);ctx.stroke();

     /* Walkman */
     drawWalkman();

     /* Silhouettes Gardiens */
     drawGuardians();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.12,cx,H*0.48,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.10)');
     vg.addColorStop(1,'rgba(0,0,0,0.80)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain cosmique */
     for(let i=0;i<25;i++){
      ctx.fillStyle=`rgba(${120+Math.random()*80|0},${60+Math.random()*60|0},${180+Math.random()*60|0},${Math.random()*0.015})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
