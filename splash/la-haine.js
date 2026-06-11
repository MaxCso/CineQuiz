// CinéQuiz splash chunk — La Haine
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["La Haine"]={
   name:'La Haine',
   color:'60,60,60',
   ref:'La Haine \u2014 Mathieu Kassovitz, 1995',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';

    /* ── Tout en niveaux de gris — orbes supprimées ── */
    let _lhStyle=document.getElementById('_lh_splash_style');
    if(!_lhStyle){_lhStyle=document.createElement('style');_lhStyle.id='_lh_splash_style';document.head.appendChild(_lhStyle);}
    _lhStyle.textContent=`

      
      
    `;
    const _lhWatch=setInterval(()=>{if(stop.v){_lhStyle.textContent='';clearInterval(_lhWatch);}},200);

    let t=0;
    const cx=W/2;

    /* ── Vue en plongée — immeubles HLM en haut de l'image ── */
    /* Deux barres d'immeubles vues du dessus, légèrement en perspective */

    /* Immeuble gauche */
    const BLD_L={
     x:W*0.00, y:0,
     w:W*0.46, h:H*0.20,
     floors:8, cols:12,
    };
    /* Immeuble droit */
    const BLD_R={
     x:W*0.54, y:0,
     w:W*0.50, h:H*0.18,
     floors:7, cols:10,
    };

    /* ── SVG personnage qui chute — viewBox 512×512 ── */
    const fallerImg=new Image();let fallerReady=false;
    fallerImg.onload=()=>{fallerReady=true;};
    fallerImg.src='images/sprite_20.svg';

    /* ── 3 silhouettes en chute libre ── */
    const fallers=[
     {x:cx-W*0.22, y:H*0.28, vy:0.28, rot:0.18,  rotSpd: 0.008, size:W*0.130},
     {x:cx+W*0.02, y:H*0.22, vy:0.35, rot:-0.25, rotSpd:-0.006, size:W*0.155},
     {x:cx+W*0.26, y:H*0.32, vy:0.22, rot:0.40,  rotSpd: 0.007, size:W*0.125},
    ];

    /* ── Dessin d'un faller via SVG ── */
    function drawFaller(fx,fy,rot,size){
     if(!fallerReady)return;
     ctx.save();
     ctx.translate(fx,fy);
     ctx.rotate(rot);
     ctx.globalAlpha=0.92;
     /* SVG 512×512 — on le centre sur le point (fx,fy) */
     ctx.drawImage(fallerImg,-size/2,-size/2,size,size);
     ctx.restore();
    }

    /* ── Dessin d'un immeuble HLM vu du dessus ── */
    function drawBuilding(bld,parallaxY){
     const {x,y,w,h,floors,cols}=bld;
     const by=y+parallaxY;

     /* Toit — surface grise */
     const roofG=ctx.createLinearGradient(x,by,x,by+h);
     roofG.addColorStop(0,'rgba(72,72,72,0.97)');
     roofG.addColorStop(1,'rgba(55,55,55,0.97)');
     ctx.fillStyle=roofG;ctx.fillRect(x,by,w,h);

     /* Rangées de fenêtres — vues de dessus, légèrement inclinées */
     const winW=w/(cols+0.5)*0.52;
     const winH=h/(floors+0.5)*0.38;
     const gapX=w/(cols+0.5);
     const gapY=h/(floors+0.5);
     for(let r=0;r<floors;r++){
      for(let c=0;c<cols;c++){
       const wx=x+gapX*0.5+c*gapX;
       const wy=by+gapY*0.5+r*gapY;
       /* Certaines fenêtres allumées = gris plus clair */
       const lit=(r+c*3)%7!==0;
       ctx.fillStyle=lit?'rgba(95,92,85,0.90)':'rgba(38,36,32,0.92)';
       ctx.fillRect(wx,wy,winW,winH);
      }
     }

     /* Ligne de bord avant de l'immeuble (face visible vue en légère plongée) */
     const faceH=h*0.12;
     const faceG2=ctx.createLinearGradient(0,by+h,0,by+h+faceH);
     faceG2.addColorStop(0,'rgba(38,38,38,0.98)');
     faceG2.addColorStop(1,'rgba(22,22,22,0.98)');
     ctx.fillStyle=faceG2;ctx.fillRect(x,by+h,w,faceH);

     /* Contour */
     ctx.strokeStyle='rgba(28,28,28,0.85)';ctx.lineWidth=1.2;
     ctx.strokeRect(x,by,w,h+faceH);
    }

    function frame(){
     if(stop.v)return;

     /* ── FOND gris granuleux ── */
     /* Variation très légère pour simuler la photo argentique */
     const base=128+Math.sin(t*0.15)*4;
     ctx.fillStyle=`rgb(${base|0},${base|0},${base|0})`;
     ctx.fillRect(0,0,W,H);

     /* Dégradé central — légèrement plus sombre au centre (vertige) */
     const cenDark=ctx.createRadialGradient(cx,H*0.50,H*0.10,cx,H*0.50,H*0.85);
     cenDark.addColorStop(0,'rgba(0,0,0,0)');
     cenDark.addColorStop(0.55,'rgba(0,0,0,0.08)');
     cenDark.addColorStop(1,'rgba(0,0,0,0.55)');
     ctx.fillStyle=cenDark;ctx.fillRect(0,0,W,H);

     /* ── BÂTIMENTS — très léger mouvement parallaxe ── */
     const parallax=Math.sin(t*0.08)*H*0.004; /* presque imperceptible */
     drawBuilding(BLD_L,parallax);
     drawBuilding(BLD_R,parallax*0.7);

     /* ── GRAIN PHOTO ARGENTIQUE dense ── */
     /* Premier passage — gros grains */
     for(let i=0;i<200;i++){
      const gv=Math.random()*80-40;
      const alpha=Math.random()*0.055;
      const gx=Math.random()*W,gy=Math.random()*H;
      const gs=Math.random()*2.2+0.3;
      ctx.fillStyle=gv>0?`rgba(255,255,255,${alpha})`:`rgba(0,0,0,${alpha})`;
      ctx.fillRect(gx,gy,gs,gs);
     }

     /* ── SILHOUETTES EN CHUTE ── */
     for(const f of fallers){
      f.y+=f.vy;
      f.rot+=f.rotSpd;
      /* Légère oscillation horizontale en chute */
      f.x+=Math.sin(t*0.6+f.rot)*0.12;
      if(f.y>H+f.size*2){
       f.y=-f.size*2;
       f.x=W*(0.15+Math.random()*0.70);
      }
      drawFaller(f.x,f.y,f.rot,f.size);
     }

     /* ── GRAIN PHOTO — second passage plus fin ── */
     for(let i=0;i<350;i++){
      const gv=Math.random()*50-25;
      const alpha=Math.random()*0.038;
      ctx.fillStyle=gv>0?`rgba(255,255,255,${alpha})`:`rgba(0,0,0,${alpha})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.2+0.2,Math.random()*1.2+0.2);
     }

     /* ── VIGNETTE forte — bords noirs ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.08,cx,H*0.48,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.15)');
     vg.addColorStop(1,'rgba(0,0,0,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     /* Vignette coins renforcée */
     const vg2=ctx.createRadialGradient(cx,H*0.48,H*0.22,cx,H*0.48,H*0.95);
     vg2.addColorStop(0,'rgba(0,0,0,0)');
     vg2.addColorStop(1,'rgba(0,0,0,0.50)');
     ctx.fillStyle=vg2;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
