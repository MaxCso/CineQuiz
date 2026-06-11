// CinéQuiz splash chunk — Baby Driver
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Baby Driver"]={
   name:'Baby Driver',
   color:'200,40,40',
   ref:'Baby Driver \u2014 Edgar Wright, 2017',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_bd_s');
    if(!_s){_s=document.createElement('style');_s.id='_bd_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Traces de pneus — 3 colonnes verticales ── */
    /* Chaque trace = série de segments en forme de chevron */
    const TREAD_H=H*0.018; /* hauteur d'un motif */
    const TREAD_W=W*0.055;
    const tireCols=[W*0.08, W*0.92]; /* gauche et droite seulement */

    /* ── Câble écouteurs — serpente vers le bas ── */
    /* Le câble part du bas des lunettes et ondule jusqu'aux écouteurs */
    const GLASS_Y=H*0.28; /* bas des lunettes */
    const EAR_Y=H*0.68;  /* position des écouteurs */

    /* ── Lunettes — position ── */
    const glassY=H*0.20;
    const glassW=W*0.82;
    const glassH=H*0.130;

    /* ── Texture aquarelle — taches roses ── */
    const waterSpots=Array.from({length:12},(_,i)=>({
     x:Math.random()*W, y:Math.random()*H,
     r:W*(0.06+Math.random()*0.12),
     op:0.06+Math.random()*0.10,
     col:Math.random()<0.5?'255,100,120':'200,30,80',
    }));

    /* ── Offset de défilement des traces ── */
    let tireScroll=0;

    function drawTireTrack(x){
     ctx.fillStyle='rgba(10,5,8,0.82)';
     const blockW=TREAD_W, blockH=TREAD_H;
     const count=Math.ceil(H/blockH/2)+3;
     /* Décalage vertical pour l'animation */
     const offset=tireScroll%( blockH*2);
     for(let i=-1;i<count;i++){
      const y=i*blockH*2 + offset;
      ctx.beginPath();
      ctx.moveTo(x-blockW*0.40, y);
      ctx.lineTo(x-blockW*0.12, y);
      ctx.lineTo(x-blockW*0.18, y+blockH*0.85);
      ctx.lineTo(x-blockW*0.46, y+blockH*0.85);
      ctx.closePath();ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+blockW*0.12, y);
      ctx.lineTo(x+blockW*0.40, y);
      ctx.lineTo(x+blockW*0.46, y+blockH*0.85);
      ctx.lineTo(x+blockW*0.18, y+blockH*0.85);
      ctx.closePath();ctx.fill();
      ctx.fillRect(x-blockW*0.06, y+blockH*0.30, blockW*0.12, blockH*0.25);
     }
    }

    function drawGlasses(){
     const gy=glassY;
     const gw=glassW, gh=glassH;
     const lw=gw*0.46; /* largeur d'un verre */
     const lh=gh;
     const gap=gw*0.06; /* espace entre les verres */
     const lx1=cx-gw*0.50; /* coin gauche verre gauche */
     const lx2=cx+gap*0.5; /* coin gauche verre droit */

     /* Monture */
     ctx.fillStyle='rgba(8,5,8,0.97)';
     /* Verre gauche */
     ctx.beginPath();ctx.roundRect(lx1,gy,lw,lh,lh*0.22);ctx.fill();
     /* Verre droit */
     ctx.beginPath();ctx.roundRect(lx2,gy,lw,lh,lh*0.22);ctx.fill();
     /* Pont nasal */
     ctx.fillRect(lx1+lw,gy+lh*0.28,gap,lh*0.18);
     /* Branches gauche et droite */
     ctx.fillStyle='rgba(8,5,8,0.95)';
     ctx.beginPath();ctx.roundRect(lx1-gw*0.06,gy+lh*0.18,gw*0.065,lh*0.12,lh*0.06);ctx.fill();
     ctx.beginPath();ctx.roundRect(lx2+lw,gy+lh*0.18,gw*0.065,lh*0.12,lh*0.06);ctx.fill();
     /* Reflet sur les verres */
     ctx.fillStyle='rgba(232,68,106,0.18)';
     ctx.beginPath();ctx.roundRect(lx1+lw*0.06,gy+lh*0.10,lw*0.28,lh*0.32,lh*0.10);ctx.fill();
     ctx.beginPath();ctx.roundRect(lx2+lw*0.06,gy+lh*0.10,lw*0.28,lh*0.32,lh*0.10);ctx.fill();
    }

    function drawCable(){
     const gBottom=glassY+glassH;
     const lStartX=cx-W*0.025, rStartX=cx+W*0.025;
     /* Balancement pendulaire subtil */
     const swing=Math.sin(t*1.2)*W*0.018;
     const lEndX=cx-W*0.072+swing*0.6, rEndX=cx+W*0.072+swing*0.6;

     ctx.strokeStyle='rgba(255,255,255,0.92)';
     ctx.lineWidth=W*0.009;
     ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(lStartX, gBottom);
     ctx.bezierCurveTo(
       lStartX-W*0.015+swing*0.3, gBottom+H*0.08,
       lEndX+W*0.020, EAR_Y-H*0.08,
       lEndX, EAR_Y-H*0.022
     );
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(rStartX, gBottom);
     ctx.bezierCurveTo(
       rStartX+W*0.015+swing*0.3, gBottom+H*0.08,
       rEndX-W*0.020, EAR_Y-H*0.08,
       rEndX, EAR_Y-H*0.022
     );
     ctx.stroke();
     /* Retourner le swing pour les écouteurs */
     return {lEndX, rEndX};
    }

    function drawEarbuds(lEndX, rEndX){
     const ey=EAR_Y;
     const ebW=W*0.095, ebH=H*0.048;
     /* Gauche */
     const lx=lEndX-ebW*0.5;
     ctx.fillStyle='rgba(255,255,255,0.95)';
     ctx.beginPath();ctx.roundRect(lx,ey-ebH*0.5,ebW,ebH,ebW*0.30);ctx.fill();
     ctx.fillStyle='rgba(200,195,195,0.60)';
     ctx.beginPath();ctx.arc(lx+ebW*0.38,ey,ebW*0.16,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,1)';
     ctx.beginPath();ctx.arc(lx+ebW*0.38,ey,ebW*0.09,0,Math.PI*2);ctx.fill();
     /* Droit */
     const rx=rEndX-ebW*0.5;
     ctx.fillStyle='rgba(255,255,255,0.95)';
     ctx.beginPath();ctx.roundRect(rx,ey-ebH*0.5,ebW,ebH,ebW*0.30);ctx.fill();
     ctx.fillStyle='rgba(200,195,195,0.60)';
     ctx.beginPath();ctx.arc(rx+ebW*0.62,ey,ebW*0.16,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,1)';
     ctx.beginPath();ctx.arc(rx+ebW*0.62,ey,ebW*0.09,0,Math.PI*2);ctx.fill();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond rose vif ── */
     const bg=ctx.createLinearGradient(0,0,W,H);
     bg.addColorStop(0,`hsl(${344+Math.sin(t*0.08)*3|0},75%,${56+Math.sin(t*0.06)*2|0}%)`);
     bg.addColorStop(0.45,'hsl(342,72%,58%)');
     bg.addColorStop(1,`hsl(${348+Math.sin(t*0.10)*2|0},68%,54%)`);
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── Taches aquarelle ── */
     for(const sp of waterSpots){
      const sg=ctx.createRadialGradient(sp.x,sp.y,0,sp.x,sp.y,sp.r);
      sg.addColorStop(0,`rgba(${sp.col},${sp.op})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.fillRect(sp.x-sp.r,sp.y-sp.r,sp.r*2,sp.r*2);
     }

     /* ── Traces de pneus animées ── */
     tireScroll+=0.55;
     for(const tx of tireCols) drawTireTrack(tx);

     /* ── Lunettes ── */
     drawGlasses();

     /* ── Câble + écouteurs animés ── */
     const {lEndX, rEndX}=drawCable();
     drawEarbuds(lEndX, rEndX);

     /* ── Grain léger ── */
     for(let i=0;i<35;i++){
      ctx.fillStyle=`rgba(180,30,60,${0.025+Math.random()*0.022})`;
      ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*2+0.3,0,Math.PI*2);ctx.fill();
     }

     /* ── Vignette très légère — juste les coins ── */
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.25,cx,H*0.5,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.75,'rgba(0,0,0,0.04)');
     vg.addColorStop(1,'rgba(180,20,50,0.28)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
