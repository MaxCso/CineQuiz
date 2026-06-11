// CinéQuiz splash chunk — Ex Machina
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Ex Machina"]={
   name:'Ex Machina',
   color:'20,180,200',
   ref:'Ex Machina \u2014 Alex Garland, 2015',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.82';
    let t=0;
    const cx=W/2;

    let _emPos=document.getElementById('_em_pos_s');
    if(!_emPos){_emPos=document.createElement('style');_emPos.id='_em_pos_s';document.head.appendChild(_emPos);}
    _emPos.textContent='#splash-content-wrap{top:35%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _emW=setInterval(()=>{if(stop.v){_emPos.textContent='';clearInterval(_emW);}},200);

    // Marges sûres
    const SAFE_TOP=H*0.12, SAFE_BOT=H*0.88;
    const MID=SAFE_TOP+(SAFE_BOT-SAFE_TOP)*0.5;

    // Silhouettes — sous la citation
    const CALEB_X=W*0.28;
    const AVA_X=W*0.72;
    const CHAIR_Y=H*0.84;          // bas des chaises
    const GLASS_Y=CHAIR_Y;         // vitre à la même hauteur

    // Particules de poussière ambiante
    const dust=Array.from({length:22},()=>({
     x:Math.random()*W, y:SAFE_TOP+Math.random()*(SAFE_BOT-SAFE_TOP),
     vx:(Math.random()-0.5)*0.15, vy:-(Math.random()*0.12+0.04),
     r:Math.random()*0.9+0.2, op:Math.random()*0.12+0.03
    }));


    function drawHuman(x, y, isCaleb){
     // Silhouette assise — minimaliste, juste des lignes
     const sc=H*0.065;
     ctx.save();
     ctx.strokeStyle= isCaleb
      ? `rgba(200,190,175,${0.55+Math.sin(t*0.4)*0.06})`   // Caleb — chaud, humain
      : `rgba(160,230,255,${0.52+Math.sin(t*0.5+1)*0.07})`; // Ava — bleu froid, synthétique
     ctx.lineWidth=isCaleb?1.4:1.1;
     ctx.lineCap='round';

     // Tête
     ctx.beginPath();
     ctx.arc(x, y-sc*1.82, sc*0.22, 0, Math.PI*2);
     ctx.stroke();

     if(!isCaleb){
      // Ava : intérieur de tête avec cercles concentriques (mécanique)
      ctx.strokeStyle=`rgba(100,210,255,${0.25+Math.sin(t*1.2)*0.08})`;
      ctx.lineWidth=0.6;
      ctx.beginPath();ctx.arc(x, y-sc*1.82, sc*0.12, 0, Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.arc(x, y-sc*1.82, sc*0.05, 0, Math.PI*2);ctx.stroke();
     }

     // Nuque → épaules
     ctx.strokeStyle= isCaleb
      ? `rgba(200,190,175,${0.55+Math.sin(t*0.4)*0.06})`
      : `rgba(160,230,255,${0.52+Math.sin(t*0.5+1)*0.07})`;
     ctx.lineWidth=isCaleb?1.4:1.1;
     ctx.beginPath();
     ctx.moveTo(x-sc*0.28, y-sc*1.55);
     ctx.lineTo(x-sc*0.32, y-sc*0.85);
     ctx.moveTo(x+sc*0.28, y-sc*1.55);
     ctx.lineTo(x+sc*0.32, y-sc*0.85);
     ctx.stroke();

     // Torse
     ctx.beginPath();
     ctx.moveTo(x-sc*0.28, y-sc*1.55);
     ctx.lineTo(x, y-sc*0.58);
     ctx.lineTo(x+sc*0.28, y-sc*1.55);
     ctx.stroke();

     if(!isCaleb){
      // Ava : ligne de circuit verticale sur torse
      ctx.strokeStyle=`rgba(80,190,255,${0.3+Math.sin(t*1.8+2)*0.1})`;
      ctx.lineWidth=0.7;
      ctx.setLineDash([3,4]);
      ctx.beginPath();ctx.moveTo(x, y-sc*1.5);ctx.lineTo(x, y-sc*0.6);ctx.stroke();
      ctx.setLineDash([]);
      // Points de jointure lumineux
      ctx.fillStyle=`rgba(100,220,255,${0.6+Math.sin(t*2.2)*0.2})`;
      ctx.beginPath();ctx.arc(x, y-sc*1.2, 2.2, 0, Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(x, y-sc*0.9, 2.2, 0, Math.PI*2);ctx.fill();
      ctx.strokeStyle=`rgba(160,230,255,${0.52+Math.sin(t*0.5+1)*0.07})`;
      ctx.lineWidth=1.1;
     }

     // Bras posés (sur les genoux, position assise)
     const flip=isCaleb?1:-1;
     ctx.beginPath();
     ctx.moveTo(x-sc*0.30, y-sc*1.1);
     ctx.quadraticCurveTo(x-sc*0.45, y-sc*0.55, x-sc*0.32, y-sc*0.18);
     ctx.moveTo(x+sc*0.30, y-sc*1.1);
     ctx.quadraticCurveTo(x+sc*0.45, y-sc*0.55, x+sc*0.32, y-sc*0.18);
     ctx.stroke();

     // Jambes / position assise
     ctx.beginPath();
     ctx.moveTo(x-sc*0.18, y-sc*0.6);
     ctx.lineTo(x-sc*0.20, y);
     ctx.moveTo(x+sc*0.18, y-sc*0.6);
     ctx.lineTo(x+sc*0.20, y);
     ctx.stroke();
    }

    function drawChair(x, y){
     const sc=H*0.065;
     ctx.strokeStyle='rgba(80,80,90,0.35)';
     ctx.lineWidth=1;
     // Siège
     ctx.strokeRect(x-sc*0.42, y-sc*0.62, sc*0.84, 6);
     // Dossier
     ctx.beginPath();
     ctx.moveTo(x-sc*0.38, y-sc*0.56);
     ctx.lineTo(x-sc*0.38, y-sc*1.5);
     ctx.moveTo(x+sc*0.38, y-sc*0.56);
     ctx.lineTo(x+sc*0.38, y-sc*1.5);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(x-sc*0.38, y-sc*1.5);
     ctx.lineTo(x+sc*0.38, y-sc*1.5);
     ctx.stroke();
     // Pieds
     ctx.beginPath();
     ctx.moveTo(x-sc*0.38, y-sc*0.56);
     ctx.lineTo(x-sc*0.38, y+4);
     ctx.moveTo(x+sc*0.38, y-sc*0.56);
     ctx.lineTo(x+sc*0.38, y+4);
     ctx.stroke();
    }

    function drawGlass(y){
     // Vitre centrale — ligne verticale avec reflets
     const glassX=cx;
     const glassTop=y-H*0.22;
     const glassBot=y+H*0.02;

     // Corps de la vitre — très subtil
     const gg=ctx.createLinearGradient(glassX-12,0,glassX+12,0);
     gg.addColorStop(0,'rgba(120,180,255,0)');
     gg.addColorStop(0.3,'rgba(120,180,255,0.06)');
     gg.addColorStop(0.5,'rgba(180,220,255,0.10)');
     gg.addColorStop(0.7,'rgba(120,180,255,0.06)');
     gg.addColorStop(1,'rgba(120,180,255,0)');
     ctx.fillStyle=gg;
     ctx.fillRect(glassX-12, glassTop, 24, glassBot-glassTop);

     // Bord lumineux gauche
     ctx.strokeStyle=`rgba(140,200,255,${0.30+Math.sin(t*0.6)*0.08})`;
     ctx.lineWidth=1;
     ctx.beginPath();ctx.moveTo(glassX-10,glassTop);ctx.lineTo(glassX-10,glassBot);ctx.stroke();

     // Bord lumineux droit
     ctx.strokeStyle=`rgba(140,200,255,${0.22+Math.sin(t*0.6+0.5)*0.06})`;
     ctx.beginPath();ctx.moveTo(glassX+10,glassTop);ctx.lineTo(glassX+10,glassBot);ctx.stroke();

     // Reflet animé qui descend
     const refY=glassTop+((t*30)%(glassBot-glassTop));
     const rg=ctx.createLinearGradient(0,refY-20,0,refY+20);
     rg.addColorStop(0,'rgba(200,230,255,0)');
     rg.addColorStop(0.5,`rgba(200,230,255,${0.18+Math.sin(t*1.2)*0.04})`);
     rg.addColorStop(1,'rgba(200,230,255,0)');
     ctx.fillStyle=rg;
     ctx.fillRect(glassX-11, refY-20, 22, 40);

     // Sol sous la vitre
     ctx.strokeStyle='rgba(80,100,120,0.25)';
     ctx.lineWidth=1;
     ctx.beginPath();ctx.moveTo(glassX-11, glassBot);ctx.lineTo(glassX+11, glassBot);ctx.stroke();
    }

    function drawRoom(){
     // Sol — perspective fuyante vers le centre
     const floorY=CHAIR_Y+H*0.01;
     ctx.strokeStyle='rgba(50,60,75,0.18)';
     ctx.lineWidth=0.7;
     for(let i=-3;i<=3;i++){
      const xOff=i*(W*0.12);
      ctx.beginPath();
      ctx.moveTo(cx+xOff*3, floorY+H*0.06);
      ctx.lineTo(cx, floorY);
      ctx.stroke();
     }
     // Ligne de sol
     ctx.strokeStyle='rgba(60,80,100,0.22)';
     ctx.lineWidth=0.8;
     ctx.beginPath();ctx.moveTo(W*0.05, floorY);ctx.lineTo(W*0.95, floorY);ctx.stroke();

     // Plafond — lumière froide descendante
     const lightY=SAFE_TOP+H*0.02;
     const lg=ctx.createLinearGradient(0,lightY,0,lightY+H*0.12);
     lg.addColorStop(0,`rgba(120,160,200,${0.04+Math.sin(t*0.2)*0.01})`);
     lg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lg;
     ctx.fillRect(0, lightY, W, H*0.12);
    }

    // Circuits animés (fond d'origine)
    const circuits=Array.from({length:20},()=>({
     x:Math.random()*W, y:Math.random()*H,
     dir:Math.floor(Math.random()*4), len:Math.random()*80+30,
     progress:Math.random(), spd:Math.random()*0.008+0.003,
     hue:180+Math.random()*40, op:Math.random()*0.3+0.08
    }));

    function frame(){
     if(stop.v)return;

     // Fond très sombre, persistance légère
     ctx.fillStyle='rgba(2,3,6,0.20)';ctx.fillRect(0,0,W,H);

     // Grille de fond (style original)
     const gridSize=35;
     ctx.strokeStyle='rgba(0,120,150,0.04)';ctx.lineWidth=0.5;
     for(let gx=0;gx<W;gx+=gridSize){
      ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();
     }
     for(let gy=0;gy<H;gy+=gridSize){
      ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();
     }

     // Circuits animés
     for(const c of circuits){
      c.progress+=c.spd;
      if(c.progress>1){c.progress=0;c.x=Math.random()*W;c.y=Math.random()*H;c.dir=Math.floor(Math.random()*4);}
      const dx=[1,0,-1,0][c.dir],dy=[0,1,0,-1][c.dir];
      const ex=c.x+dx*c.len*c.progress,ey=c.y+dy*c.len*c.progress;
      ctx.strokeStyle=`hsla(${c.hue},80%,60%,${c.op})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(c.x,c.y);ctx.lineTo(ex,ey);ctx.stroke();
      ctx.beginPath();ctx.arc(Math.max(0.01,ex),Math.max(0.01,ey),2,0,Math.PI*2);
      ctx.fillStyle=`hsla(${c.hue},90%,70%,${c.op*1.5})`;ctx.fill();
     }

     // Ambiance froide bleutée
     const amb=ctx.createRadialGradient(cx, MID, H*0.02, cx, MID, H*0.55);
     amb.addColorStop(0,`rgba(15,30,55,${0.10+Math.sin(t*0.15)*0.02})`);
     amb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=amb;ctx.fillRect(0,0,W,H);

     drawRoom();

     // Chaises
     drawChair(CALEB_X, CHAIR_Y);
     drawChair(AVA_X, CHAIR_Y);

     // Vitre
     drawGlass(GLASS_Y);

     // Silhouettes assises
     drawHuman(CALEB_X, CHAIR_Y, true);
     drawHuman(AVA_X, CHAIR_Y, false);

     // Lumière douce sur chaque personnage
     const lc=ctx.createRadialGradient(CALEB_X,GLASS_Y-H*0.05,5,CALEB_X,GLASS_Y-H*0.05,W*0.22);
     lc.addColorStop(0,`rgba(200,180,140,${0.06+Math.sin(t*0.3)*0.02})`);
     lc.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lc;ctx.fillRect(0,0,W,H);

     const la=ctx.createRadialGradient(AVA_X,GLASS_Y-H*0.05,5,AVA_X,GLASS_Y-H*0.05,W*0.22);
     la.addColorStop(0,`rgba(80,160,220,${0.07+Math.sin(t*0.4+1)*0.02})`);
     la.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=la;ctx.fillRect(0,0,W,H);

     // Poussière ambiante
     for(const d of dust){
      d.x+=d.vx; d.y+=d.vy;
      if(d.y<SAFE_TOP){d.y=CHAIR_Y;d.x=Math.random()*W;}
      ctx.fillStyle=`rgba(160,190,220,${d.op})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     // Vignette
     const vg=ctx.createRadialGradient(cx,MID,H*0.05,cx,MID,H*0.9);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.6,'rgba(0,2,5,0.15)');
     vg.addColorStop(1,'rgba(0,2,8,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
