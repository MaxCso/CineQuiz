// CinéQuiz splash chunk — Fight Club
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Fight Club"]={
   name:'Fight Club',
   color:'180,40,20',
   ref:'Fight Club \u2014 David Fincher, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Citation + logo remontés sous logo CinéQuiz ── */
    let _fcPos=document.getElementById('_fc_pos_s');
    if(!_fcPos){_fcPos=document.createElement('style');_fcPos.id='_fc_pos_s';document.head.appendChild(_fcPos);}
    _fcPos.textContent='#splash-content-wrap{top:26%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _fcPosW=setInterval(()=>{if(stop.v){_fcPos.textContent='';clearInterval(_fcPosW);}},200);

    /* ── Décalage vertical global — descend la scène pour centrer dans la zone visible ── */
    const yOff = H*0.10;

    /* ── Mots subliminaux flash ── */
    const subliminal=['CONSUME','OBEY','SLEEP','BUY','SUBMIT','CONFORM'];
    let subWord='', subAlpha=0, subTimer=120;

    /* ── Fumée qui monte des bâtiments ── */
    const smokeParticles=Array.from({length:30},()=>({
     x:Math.random()*W,
     y:H*(0.15+Math.random()*0.35)+yOff,
     vx:(Math.random()-0.5)*0.25,
     vy:-(Math.random()*0.4+0.15),
     r:Math.random()*18+8,
     life:Math.random(),
     decay:Math.random()*0.003+0.002
    }));

    /* ── Particules magenta (débris) ── */
    const debris=Array.from({length:22},()=>({
     x:Math.random()*W,
     y:H*(0.05+Math.random()*0.55),
     vx:(Math.random()-0.5)*0.6,
     vy:Math.random()*0.35+0.1,
     size:Math.random()*3+0.8,
     op:Math.random()*0.6+0.2,
     col:Math.random()>0.55?`rgba(210,40,120,`:`rgba(0,180,210,`
    }));

    /* ── Dessin de la ville en ruine (style illustration) ── */
    function drawCity(){
     ctx.save();

     /* Ciel — dégradé cyan profond */
     const sky=ctx.createLinearGradient(0,0,0,H*0.72+yOff);
     sky.addColorStop(0,'rgb(4,40,65)');
     sky.addColorStop(0.45,'rgb(8,68,100)');
     sky.addColorStop(0.72,'rgb(12,80,110)');
     ctx.fillStyle=sky;
     ctx.fillRect(0,0,W,H*0.72+yOff);

     /* Halos lumineux dans le ciel — bleu cyan */
     const halo1=ctx.createRadialGradient(W*0.28,H*0.12+yOff,5,W*0.28,H*0.12+yOff,W*0.55);
     halo1.addColorStop(0,'rgba(0,140,190,0.22)');
     halo1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo1;ctx.fillRect(0,0,W,H*0.72+yOff);

     const halo2=ctx.createRadialGradient(W*0.75,H*0.08+yOff,5,W*0.75,H*0.08+yOff,W*0.45);
     halo2.addColorStop(0,'rgba(0,120,170,0.18)');
     halo2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo2;ctx.fillRect(0,0,W,H*0.72+yOff);

     /* Immeubles arrière-plan — silhouettes foncées, tons bleu */
     const bgBuildings=[
      {x:W*0.01,w:W*0.14,h:H*0.38,c:'rgb(8,50,72)'},
      {x:W*0.12,w:W*0.10,h:H*0.30,c:'rgb(10,55,78)'},
      {x:W*0.20,w:W*0.18,h:H*0.44,c:'rgb(6,44,65)'},
      {x:W*0.37,w:W*0.13,h:H*0.35,c:'rgb(9,52,74)'},
      {x:W*0.50,w:W*0.16,h:H*0.40,c:'rgb(7,48,70)'},
      {x:W*0.64,w:W*0.12,h:H*0.32,c:'rgb(11,56,80)'},
      {x:W*0.74,w:W*0.14,h:H*0.42,c:'rgb(8,50,72)'},
      {x:W*0.87,w:W*0.15,h:H*0.36,c:'rgb(6,44,65)'},
     ];
     for(const b of bgBuildings){
      ctx.fillStyle=b.c;
      ctx.fillRect(b.x,H*0.72+yOff-b.h,b.w,b.h);
      /* Petites fenêtres brillantes */
      ctx.fillStyle='rgba(0,200,240,0.14)';
      for(let fy=H*0.72+yOff-b.h+6;fy<H*0.72+yOff-8;fy+=10){
       for(let fx=b.x+4;fx<b.x+b.w-4;fx+=8){
        if(Math.random()>0.45) ctx.fillRect(fx,fy,3,4);
       }
      }
     }

     /* Immeubles avant-plan — plus sombres, certains penchés / en ruine */
     /* immeuble gauche — incliné */
     ctx.save();
     ctx.translate(W*0.07,H*0.72+yOff);
     ctx.rotate(-0.045);
     const bldL=ctx.createLinearGradient(0,-H*0.52,W*0.20,0);
     bldL.addColorStop(0,'rgb(5,30,48)');
     bldL.addColorStop(1,'rgb(3,22,35)');
     ctx.fillStyle=bldL;
     ctx.fillRect(-W*0.01,-H*0.52,W*0.22,H*0.52);
     /* Lignes de structure arrachées */
     ctx.strokeStyle='rgba(0,160,200,0.12)';ctx.lineWidth=1;
     for(let ly=6;ly<H*0.52;ly+=14){
      ctx.beginPath();ctx.moveTo(0,-H*0.52+ly);ctx.lineTo(W*0.22,-H*0.52+ly);ctx.stroke();
     }
     ctx.restore();

     /* immeuble droit — effondré partiellement */
     ctx.save();
     ctx.translate(W*0.72,H*0.72+yOff);
     ctx.rotate(0.03);
     const bldR=ctx.createLinearGradient(0,-H*0.48,W*0.25,0);
     bldR.addColorStop(0,'rgb(4,28,45)');
     bldR.addColorStop(1,'rgb(2,18,30)');
     ctx.fillStyle=bldR;
     ctx.fillRect(0,-H*0.48,W*0.24,H*0.48);
     ctx.strokeStyle='rgba(0,160,200,0.10)';ctx.lineWidth=1;
     for(let ly=6;ly<H*0.48;ly+=14){
      ctx.beginPath();ctx.moveTo(0,-H*0.48+ly);ctx.lineTo(W*0.24,-H*0.48+ly);ctx.stroke();
     }
     ctx.restore();

     ctx.restore();
    }

    /* ── Dessin de la baie vitrée / châssis ── */
    function drawWindow(){
     ctx.save();
     /* Montants verticaux — 3 barres sombres */
     const barW=6;
     const bars=[W*0.245, W*0.495, W*0.745];
     ctx.fillStyle='rgb(2,14,22)';
     for(const bx of bars){
      ctx.fillRect(bx-barW/2, 0, barW, H);
     }
     /* Montant horizontal — décalé avec yOff */
     ctx.fillRect(0, H*0.485+yOff, W, barW-1);
     /* Reflets subtils sur les vitres */
     for(let i=0;i<4;i++){
      const gx=i*(W/4);
      const refG=ctx.createLinearGradient(gx,0,gx+W*0.05,H*0.4);
      refG.addColorStop(0,'rgba(0,180,220,0.04)');
      refG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=refG;
      ctx.fillRect(gx,0,W/4,H*0.5);
     }
     ctx.restore();
    }

    /* ── Sol / reflet ── */
    function drawFloor(){
     ctx.save();
     const floorY = H*0.72+yOff;
     const floor=ctx.createLinearGradient(0,floorY,0,H);
     floor.addColorStop(0,'rgb(3,20,32)');
     floor.addColorStop(1,'rgb(1,10,18)');
     ctx.fillStyle=floor;
     ctx.fillRect(0,floorY,W,H-floorY);

     /* Reflet des silhouettes — flou, très sombre */
     const refG=ctx.createLinearGradient(0,floorY,0,floorY+H*0.16);
     refG.addColorStop(0,'rgba(0,0,0,0.55)');
     refG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=refG;
     ctx.fillRect(0,floorY,W,H*0.16);

     /* Ligne de sol lumineuse (reflet baie vitrée) */
     const lineG=ctx.createLinearGradient(0,0,W,0);
     lineG.addColorStop(0,'rgba(0,180,220,0)');
     lineG.addColorStop(0.3,'rgba(0,180,220,0.12)');
     lineG.addColorStop(0.7,'rgba(0,180,220,0.12)');
     lineG.addColorStop(1,'rgba(0,180,220,0)');
     ctx.fillStyle=lineG;
     ctx.fillRect(0,floorY,W,1.5);
     ctx.restore();
    }

    /* ── Silhouettes : deux personnages de dos, tenant la main ── */
    function drawSilhouettes(){
     ctx.save();

     /* Personnage GAUCHE — homme (plus grand, manteau long) */
     const p1x=cx-W*0.095, p1base=H*0.725+yOff;
     const p1h=H*0.295, p1w=W*0.115;

     /* Rim light cyan — bord gauche */
     const rimL=ctx.createRadialGradient(p1x-p1w*0.55,p1base-p1h*0.5,2,p1x-p1w*0.55,p1base-p1h*0.5,p1w*1.1);
     rimL.addColorStop(0,'rgba(0,210,240,0.28)');
     rimL.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rimL;
     ctx.fillRect(p1x-p1w,p1base-p1h,p1w*2,p1h);

     /* Rim light magenta — bord droit */
     const rimR1=ctx.createRadialGradient(p1x+p1w*0.5,p1base-p1h*0.45,1,p1x+p1w*0.5,p1base-p1h*0.45,p1w*0.9);
     rimR1.addColorStop(0,'rgba(210,40,130,0.22)');
     rimR1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rimR1;
     ctx.fillRect(p1x,p1base-p1h,p1w*1.2,p1h);

     /* Corps silhouette gauche */
     ctx.fillStyle='rgb(4,8,12)';
     /* Tête */
     ctx.beginPath();ctx.ellipse(p1x,p1base-p1h+p1h*0.07,p1w*0.22,p1h*0.09,0,0,Math.PI*2);ctx.fill();
     /* Épaules/manteau */
     ctx.beginPath();
     ctx.moveTo(p1x-p1w*0.48,p1base-p1h*0.78);
     ctx.quadraticCurveTo(p1x-p1w*0.52,p1base-p1h*0.60,p1x-p1w*0.42,p1base);
     ctx.lineTo(p1x+p1w*0.35,p1base);
     ctx.quadraticCurveTo(p1x+p1w*0.40,p1base-p1h*0.60,p1x+p1w*0.44,p1base-p1h*0.78);
     ctx.quadraticCurveTo(p1x,p1base-p1h*0.98,p1x-p1w*0.48,p1base-p1h*0.78);
     ctx.fill();
     /* Jambes */
     ctx.fillRect(p1x-p1w*0.25,p1base-p1h*0.32,p1w*0.20,p1h*0.32);
     ctx.fillRect(p1x+p1w*0.04,p1base-p1h*0.32,p1w*0.20,p1h*0.32);
     /* Chaussures */
     ctx.beginPath();ctx.ellipse(p1x-p1w*0.16,p1base,p1w*0.16,p1h*0.035,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(p1x+p1w*0.14,p1base,p1w*0.16,p1h*0.035,0,0,Math.PI*2);ctx.fill();

     /* Personnage DROIT — femme (fourrure, cheveux bouclés) */
     const p2x=cx+W*0.085, p2base=H*0.725+yOff;
     const p2h=H*0.270, p2w=W*0.125;

     /* Rim light magenta — bord droit */
     const rimR2=ctx.createRadialGradient(p2x+p2w*0.55,p2base-p2h*0.5,2,p2x+p2w*0.55,p2base-p2h*0.5,p2w*1.1);
     rimR2.addColorStop(0,'rgba(210,40,130,0.30)');
     rimR2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rimR2;
     ctx.fillRect(p2x-p2w*0.2,p2base-p2h,p2w*1.5,p2h);

     /* Rim light cyan — bord gauche */
     const rimL2=ctx.createRadialGradient(p2x-p2w*0.5,p2base-p2h*0.4,1,p2x-p2w*0.5,p2base-p2h*0.4,p2w*0.85);
     rimL2.addColorStop(0,'rgba(0,210,240,0.18)');
     rimL2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rimL2;
     ctx.fillRect(p2x-p2w,p2base-p2h,p2w,p2h);

     /* Corps silhouette droite */
     ctx.fillStyle='rgb(4,8,12)';
     /* Tête + cheveux bouclés */
     ctx.beginPath();ctx.arc(p2x,p2base-p2h+p2h*0.085,p2w*0.20,0,Math.PI*2);ctx.fill();
     /* Boucles */
     for(let a=0;a<Math.PI*2;a+=0.7){
      ctx.beginPath();
      ctx.arc(p2x+Math.cos(a)*p2w*0.18,p2base-p2h+p2h*0.075+Math.sin(a)*p2w*0.14,p2w*0.09,0,Math.PI*2);
      ctx.fill();
     }
     /* Veste fourrure — silhouette plus large */
     ctx.beginPath();
     ctx.moveTo(p2x-p2w*0.52,p2base-p2h*0.75);
     ctx.quadraticCurveTo(p2x-p2w*0.58,p2base-p2h*0.58,p2x-p2w*0.44,p2base);
     ctx.lineTo(p2x+p2w*0.44,p2base);
     ctx.quadraticCurveTo(p2x+p2w*0.58,p2base-p2h*0.58,p2x+p2w*0.52,p2base-p2h*0.75);
     ctx.quadraticCurveTo(p2x,p2base-p2h*0.98,p2x-p2w*0.52,p2base-p2h*0.75);
     ctx.fill();
     /* Texture fourrure — petites irrégularités */
     ctx.strokeStyle='rgba(8,16,24,0.8)';ctx.lineWidth=1.5;
     for(let fy=0;fy<8;fy++){
      const ffy=p2base-p2h*0.7+fy*p2h*0.09;
      ctx.beginPath();
      ctx.moveTo(p2x-p2w*0.46,ffy);
      for(let fx=0;fx<12;fx++){
       ctx.lineTo(p2x-p2w*0.46+fx*p2w*0.08,ffy+(fx%2===0?2:-2));
      }
      ctx.stroke();
     }
     /* Jambes / bottes */
     ctx.fillStyle='rgb(4,8,12)';
     ctx.fillRect(p2x-p2w*0.22,p2base-p2h*0.30,p2w*0.19,p2h*0.30);
     ctx.fillRect(p2x+p2w*0.02,p2base-p2h*0.30,p2w*0.19,p2h*0.30);
     /* Bottes — légèrement plus larges */
     ctx.beginPath();ctx.ellipse(p2x-p2w*0.13,p2base,p2w*0.14,p2h*0.032,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(p2x+p2w*0.12,p2base,p2w*0.14,p2h*0.032,0,0,Math.PI*2);ctx.fill();

     /* ── Main tenue — entre les deux personnages ── */
     const handX=(p1x+p1w*0.32+p2x-p2w*0.30)*0.5;
     const handY=p1base-p1h*0.185;
     /* Bras droit de P1 vers P2 */
     ctx.beginPath();
     ctx.moveTo(p1x+p1w*0.32,p1base-p1h*0.22);
     ctx.quadraticCurveTo(handX-W*0.01,handY+H*0.012,handX,handY);
     ctx.lineWidth=p1w*0.16;ctx.strokeStyle='rgb(4,8,12)';
     ctx.lineCap='round';ctx.stroke();
     /* Bras gauche de P2 vers P1 */
     ctx.beginPath();
     ctx.moveTo(p2x-p2w*0.30,p2base-p2h*0.20);
     ctx.quadraticCurveTo(handX+W*0.01,handY+H*0.012,handX,handY);
     ctx.lineWidth=p2w*0.15;ctx.strokeStyle='rgb(4,8,12)';
     ctx.stroke();
     /* Point de jonction — petite lueur magenta sur la main */
     const handGlow=ctx.createRadialGradient(handX,handY,0,handX,handY,p1w*0.28);
     handGlow.addColorStop(0,'rgba(210,60,140,0.32)');
     handGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=handGlow;
     ctx.beginPath();ctx.arc(handX,handY,p1w*0.28,0,Math.PI*2);ctx.fill();

     ctx.restore();
    }

    /* état glitch */
    let glitchActive=false, glitchTimer=0, glitchIntensity=0;

    function frame(){
     if(stop.v)return;

     /* Effacement doux */
     ctx.fillStyle='rgba(2,8,14,0.28)';ctx.fillRect(0,0,W,H);

     /* ── Scène ── */
     drawCity();

     /* ── Fumée qui monte des bâtiments ── */
     for(const s of smokeParticles){
      s.x+=s.vx+Math.sin(t*0.4+s.r)*0.08;
      s.y+=s.vy;s.life-=s.decay;s.r+=0.06;
      if(s.life<=0){
       s.x=W*0.08+Math.random()*W*0.84;
       s.y=H*(0.15+Math.random()*0.30)+yOff;
       s.vy=-(Math.random()*0.35+0.12);s.life=0.55+Math.random()*0.35;s.r=Math.random()*12+5;
      }
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(30,70,100,${s.life*0.22})`);
      sg.addColorStop(0.5,`rgba(20,55,80,${s.life*0.10})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Mots subliminaux ── */
     subTimer--;
     if(subTimer<=0){
      subWord=subliminal[Math.floor(Math.random()*subliminal.length)];
      subAlpha=1.0;
      subTimer=200+Math.floor(Math.random()*240);
     }
     if(subAlpha>0){
      ctx.save();
      const fSize=W*0.13+Math.random()*W*0.03;
      ctx.font=`900 ${fSize}px 'Arial Black',sans-serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.shadowColor='rgba(0,180,220,0.7)';ctx.shadowBlur=25;
      ctx.fillStyle=`rgba(0,200,230,${subAlpha*0.70})`;
      ctx.fillText(subWord,cx,H*0.35+yOff);
      ctx.shadowBlur=0;ctx.restore();
      subAlpha*=0.58;
      if(subAlpha<0.008)subAlpha=0;
     }

     /* Baie vitrée */
     drawWindow();
     drawFloor();
     drawSilhouettes();

     /* Débris magenta flottants */
     for(const d of debris){
      d.x+=d.vx;d.y+=d.vy;
      if(d.y>H*0.75){d.y=H*(0.05+Math.random()*0.35);d.x=Math.random()*W;}
      ctx.fillStyle=d.col+d.op+')';
      ctx.fillRect(d.x,d.y,d.size,d.size*0.45);
     }

     /* Grain pellicule */
     for(let i=0;i<48;i++){
      const gv=80+Math.random()*60|0;
      ctx.fillStyle=`rgba(${gv},${gv+10},${gv+20},${Math.random()*0.030})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.4,1);
     }

     /* ── Glitch numérique ── */
     if(!glitchActive && Math.random()>0.972){
      glitchActive=true;glitchTimer=3+Math.floor(Math.random()*5);glitchIntensity=0.5+Math.random()*0.5;
     }
     if(glitchActive){
      glitchTimer--;if(glitchTimer<=0)glitchActive=false;
      const nBands=2+Math.floor(Math.random()*4);
      for(let b=0;b<nBands;b++){
       const gy=Math.random()*H;const gh=Math.random()*H*0.04+2;
       const shift=(Math.random()-0.5)*W*0.09*glitchIntensity;
       try{const sl=ctx.getImageData(0,gy,W,gh);ctx.putImageData(sl,shift,gy);}catch(e){}
      }
      /* Séparation chromatique cyan/magenta */
      ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.12*glitchIntensity;
      try{
       const snapH=Math.floor(H*0.35);const snapY=Math.floor(H*0.32);
       const snap=ctx.getImageData(0,snapY,W,snapH);ctx.putImageData(snap,W*0.008,snapY);
      }catch(e){}
      ctx.restore();
      if(Math.random()>0.6){
       ctx.fillStyle=`rgba(0,200,230,${0.04+Math.random()*0.06})`;
       ctx.fillRect(0,Math.random()*H,W,Math.random()*2+0.5);
      }
     }

     /* Vignette — coins noirs */
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.10,cx,H*0.5,H*0.78);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(0,0,0,0.06)');
     vg.addColorStop(1,'rgba(0,0,0,0.94)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
