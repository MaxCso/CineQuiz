// CinéQuiz splash chunk — Arrête moi si tu peux
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Arrête moi si tu peux"]={
   name:"Arr\u00eate moi si tu peux",
   ref:"Catch Me If You Can \u2014 Steven Spielberg, 2002",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_cm_s');
    if(!_s){_s=document.createElement('style');_s.id='_cm_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:21%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Palette Saul Bass / années 60 ── */
    const COLS={
     red:'220,45,35',   /* rouge vif */
     yellow:'255,210,0', /* jaune soleil */
     white:'245,242,235', /* blanc cassé */
     navy:'15,28,65',   /* bleu marine */
     orange:'245,115,20', /* orange chaud */
    };

    /* ── Formes géométriques Saul Bass — tailles importantes, bien visibles ── */
    const shapes=[
     /* Flèches / chevrons dynamiques */
     {type:'arrow',x:W*0.78,y:H*0.12,size:W*0.072,rot:-0.4,vx:0.18,vy:0.10,rotSpd:0.006,col:COLS.red,op:0.90},
     {type:'arrow',x:W*0.15,y:H*0.35,size:W*0.058,rot:2.1,vx:-0.14,vy:0.12,rotSpd:-0.005,col:COLS.yellow,op:0.85},
     {type:'arrow',x:W*0.88,y:H*0.55,size:W*0.048,rot:0.8,vx:-0.20,vy:-0.08,rotSpd:0.007,col:COLS.white,op:0.75},
     /* Cercles */
     {type:'circle',x:W*0.12,y:H*0.14,size:W*0.055,rot:0,vx:0.12,vy:0.08,rotSpd:0,col:COLS.yellow,op:0.82},
     {type:'circle',x:W*0.82,y:H*0.80,size:W*0.040,rot:0,vx:-0.10,vy:-0.06,rotSpd:0,col:COLS.red,op:0.78},
     {type:'circle',x:W*0.55,y:H*0.88,size:W*0.028,rot:0,vx:0.08,vy:-0.12,rotSpd:0,col:COLS.white,op:0.60},
     /* Rectangles allongés — look titre de film */
     {type:'rect',x:W*0.08,y:H*0.65,size:W*0.042,rot:-0.3,vx:0.16,vy:-0.09,rotSpd:0.004,col:COLS.orange,op:0.80},
     {type:'rect',x:W*0.72,y:H*0.30,size:W*0.035,rot:1.1,vx:-0.12,vy:0.14,rotSpd:-0.006,col:COLS.white,op:0.65},
     /* Triangles */
     {type:'tri',x:W*0.22,y:H*0.75,size:W*0.048,rot:0.5,vx:0.10,vy:-0.10,rotSpd:0.008,col:COLS.red,op:0.72},
     {type:'tri',x:W*0.90,y:H*0.18,size:W*0.038,rot:-1.2,vx:-0.15,vy:0.08,rotSpd:-0.005,col:COLS.yellow,op:0.68},
     /* Petites formes d'appoint */
     {type:'circle',x:W*0.40,y:H*0.10,size:W*0.018,rot:0,vx:0.06,vy:0.14,rotSpd:0,col:COLS.orange,op:0.55},
     {type:'rect',x:W*0.60,y:H*0.92,size:W*0.022,rot:0.7,vx:-0.08,vy:-0.06,rotSpd:0.010,col:COLS.yellow,op:0.50},
    ];

    /* ── Lignes diagonales animées — style générique ── */
    const lines60=[
     {x:W*0.00,y:0,vx:0.55,col:COLS.white,op:0.06,w:W*0.002},
     {x:W*0.18,y:0,vx:0.40,col:COLS.red,op:0.05,w:W*0.0015},
     {x:W*0.42,y:0,vx:0.65,col:COLS.yellow,op:0.07,w:W*0.002},
     {x:W*0.68,y:0,vx:0.48,col:COLS.white,op:0.05,w:W*0.0015},
     {x:W*0.85,y:0,vx:0.38,col:COLS.orange,op:0.06,w:W*0.002},
    ];

    /* ── Silhouette Frank qui court — précalculée ── */
    let runT=0;

    function drawShape(s){
     ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.rot);
     ctx.fillStyle=`rgba(${s.col},${s.op})`;
     const sz=s.size;
     if(s.type==='circle'){
      ctx.beginPath();ctx.arc(0,0,sz,0,Math.PI*2);ctx.fill();
     } else if(s.type==='rect'){
      ctx.fillRect(-sz*1.1,-sz*0.40,sz*2.2,sz*0.80);
     } else if(s.type==='tri'){
      ctx.beginPath();ctx.moveTo(0,-sz);ctx.lineTo(sz*0.88,sz*0.50);ctx.lineTo(-sz*0.88,sz*0.50);ctx.closePath();ctx.fill();
     } else if(s.type==='arrow'){
      /* Flèche Saul Bass — pentagone pointu */
      ctx.beginPath();
      ctx.moveTo(sz,0);
      ctx.lineTo(sz*0.30,-sz*0.55);
      ctx.lineTo(sz*0.30,-sz*0.22);
      ctx.lineTo(-sz,  -sz*0.22);
      ctx.lineTo(-sz,   sz*0.22);
      ctx.lineTo(sz*0.30, sz*0.22);
      ctx.lineTo(sz*0.30, sz*0.55);
      ctx.closePath();ctx.fill();
     }
     ctx.restore();
    }

    function drawRunFig(rx,ry,phase,sc){
     ctx.save();ctx.translate(rx,ry);ctx.scale(sc,sc);
     ctx.fillStyle=`rgba(${COLS.navy},0.97)`;
     /* Tete */
     ctx.beginPath();ctx.arc(0,-H*0.142,W*0.022,0,Math.PI*2);ctx.fill();
     /* Chapeau — fedora style années 60 */
     ctx.beginPath();ctx.ellipse(0,-H*0.162,W*0.028,H*0.008,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.roundRect(-W*0.018,-H*0.178,W*0.036,H*0.020,W*0.004);ctx.fill();
     /* Corps — costume cintré */
     ctx.beginPath();
     ctx.moveTo(-W*0.014,-H*0.125);
     ctx.bezierCurveTo(-W*0.020,-H*0.075,-W*0.024,-H*0.040,-W*0.018,H*0.000);
     ctx.lineTo(W*0.018,H*0.000);
     ctx.bezierCurveTo(W*0.024,-H*0.040,W*0.020,-H*0.075,W*0.014,-H*0.125);
     ctx.closePath();ctx.fill();
     /* Jambes en mouvement */
     ctx.strokeStyle=`rgba(${COLS.navy},0.97)`;ctx.lineWidth=W*0.013;ctx.lineCap='round';
     const legFwd=Math.sin(phase);const legBwd=Math.sin(phase+Math.PI);
     ctx.beginPath();ctx.moveTo(-W*0.006,H*0.000);
     ctx.lineTo(-W*0.006+legFwd*W*0.032,H*0.042);
     ctx.lineTo(-W*0.006+legFwd*W*0.020+legBwd*W*0.010,H*0.082);ctx.stroke();
     ctx.beginPath();ctx.moveTo(W*0.006,H*0.000);
     ctx.lineTo(W*0.006+legBwd*W*0.032,H*0.042);
     ctx.lineTo(W*0.006+legBwd*W*0.020+legFwd*W*0.010,H*0.082);ctx.stroke();
     /* Bras ballants avec mallette */
     ctx.lineWidth=W*0.011;
     ctx.beginPath();ctx.moveTo(-W*0.014,-H*0.095);
     ctx.lineTo(-W*0.038+Math.cos(phase+Math.PI)*W*0.015,-H*0.038);ctx.stroke();
     ctx.beginPath();ctx.moveTo(W*0.014,-H*0.095);
     ctx.lineTo(W*0.038+Math.cos(phase)*W*0.015,-H*0.038);ctx.stroke();
     /* Mallette dans la main droite */
     ctx.fillStyle=`rgba(${COLS.navy},0.97)`;
     const bx=W*0.038+Math.cos(phase)*W*0.015;
     ctx.beginPath();ctx.roundRect(bx-W*0.016,-H*0.050,W*0.032,H*0.022,W*0.003);ctx.fill();
     ctx.restore();
    }

    function drawRunFigLight(rx,ry,phase,sc){
     /* Version claire — policier qui court derrière */
     ctx.save();ctx.translate(rx,ry);ctx.scale(sc,sc);
     ctx.fillStyle=`rgba(${COLS.red},0.72)`;
     ctx.beginPath();ctx.arc(0,-H*0.128,W*0.019,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(0,-H*0.100,W*0.018,H*0.048,Math.sin(phase)*0.06,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle=`rgba(${COLS.red},0.72)`;ctx.lineWidth=W*0.011;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(0,-H*0.058);ctx.lineTo(-W*0.025+Math.cos(phase)*W*0.022,H*0.048);ctx.stroke();
     ctx.beginPath();ctx.moveTo(0,-H*0.058);ctx.lineTo(W*0.025+Math.cos(phase+Math.PI)*W*0.022,H*0.048);ctx.stroke();
     ctx.beginPath();ctx.moveTo(-W*0.016,-H*0.082);ctx.lineTo(-W*0.040+Math.cos(phase+Math.PI)*W*0.014,-H*0.030);ctx.stroke();
     ctx.beginPath();ctx.moveTo(W*0.016,-H*0.082);ctx.lineTo(W*0.040+Math.cos(phase)*W*0.014,-H*0.030);ctx.stroke();
     ctx.restore();
    }

    function drawRunway(){
     /* Piste d'aeroport en perspective — sol blanc cassé */
     const runTop=H*0.76;
     const runG=ctx.createLinearGradient(0,runTop,0,H);
     runG.addColorStop(0,`rgba(${COLS.white},0.90)`);
     runG.addColorStop(0.35,`rgba(${COLS.white},0.82)`);
     runG.addColorStop(1,`rgba(200,195,182,0.72)`);
     ctx.fillStyle=runG;
     ctx.beginPath();
     ctx.moveTo(cx-W*0.06,runTop);ctx.lineTo(cx+W*0.06,runTop);
     ctx.lineTo(cx+W*0.52,H);ctx.lineTo(cx-W*0.52,H);
     ctx.closePath();ctx.fill();

     /* Bandes laterales de la piste — rouge */
     ctx.fillStyle=`rgba(${COLS.red},0.55)`;
     const edgeW=W*0.018;
     ctx.beginPath();
     ctx.moveTo(cx-W*0.06+edgeW,runTop);ctx.lineTo(cx-W*0.06,runTop);
     ctx.lineTo(cx-W*0.52,H);ctx.lineTo(cx-W*0.52+edgeW*4,H);
     ctx.closePath();ctx.fill();
     ctx.beginPath();
     ctx.moveTo(cx+W*0.06-edgeW,runTop);ctx.lineTo(cx+W*0.06,runTop);
     ctx.lineTo(cx+W*0.52,H);ctx.lineTo(cx+W*0.52-edgeW*4,H);
     ctx.closePath();ctx.fill();

     /* Lignes de centre pointillees — jaune */
     const dashCount=7;
     for(let i=0;i<dashCount;i++){
      const prog=((i/dashCount) + (t*0.35)%1.0) % 1.0;
      const dashY=runTop + prog*(H-runTop);
      const dashW=(prog*W*0.032+W*0.003);
      const dashH=H*0.028*(0.3+prog*0.7);
      const dashX=cx + (dashW*0.5*(Math.sin(t*0.4)*0.2)); /* légère oscillation */
      ctx.fillStyle=`rgba(${COLS.yellow},${0.75+prog*0.20})`;
      ctx.fillRect(dashX-dashW*0.12,dashY,dashW*0.24,dashH);
     }
    }

    function frame(){
     if(stop.v)return;
     runT+=0.055;

     /* ── Fond — bleu nuit américain années 60, lumineux ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,`hsl(${222+Math.sin(t*0.08)*3},${60+Math.sin(t*0.06)*4}%,${24+Math.sin(t*0.07)*2}%)`);
     bg.addColorStop(0.45,`hsl(225,56%,${20+Math.sin(t*0.05)*2}%)`);
     bg.addColorStop(0.80,`hsl(220,50%,${16+Math.sin(t*0.06)*1}%)`);
     bg.addColorStop(1,'hsl(218,44%,12%)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* ── Lignes diagonales de fond ── */
     for(const l of lines60){
      l.x+=l.vx;
      if(l.x>W*1.2) l.x=-W*0.2;
      ctx.strokeStyle=`rgba(${l.col},${l.op})`;
      ctx.lineWidth=l.w;
      ctx.beginPath();ctx.moveTo(l.x,0);ctx.lineTo(l.x+W*0.15,H);ctx.stroke();
     }

     /* ── Formes géométriques ── */
     for(const s of shapes){
      s.x+=s.vx;s.y+=s.vy;s.rot+=s.rotSpd;
      /* Rebond sur les bords */
      if(s.x<-s.size*2){s.x=-s.size*2;s.vx=Math.abs(s.vx);}
      if(s.x>W+s.size*2){s.x=W+s.size*2;s.vx=-Math.abs(s.vx);}
      if(s.y<-s.size*2){s.y=-s.size*2;s.vy=Math.abs(s.vy);}
      if(s.y>H+s.size*2){s.y=H+s.size*2;s.vy=-Math.abs(s.vy);}
      drawShape(s);
     }

     /* ── Piste d'aéroport ── */
     drawRunway();

     /* ── Silhouettes courant sur la piste ── */
     /* Frank (devant, marine) */
     drawRunFig(cx-W*0.06,H*0.745,runT,1.05);
     /* Policier (derrière, rouge) */
     drawRunFigLight(cx+W*0.10,H*0.760,runT+Math.PI*0.25,0.88);
     /* Troisième silhouette encore derrière */
     drawRunFigLight(cx-W*0.22,H*0.778,runT+Math.PI*0.55,0.75);

     /* ── Vignette douce ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.15,cx,H*0.48,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.65,'rgba(0,0,0,0.05)');
     vg.addColorStop(1,'rgba(0,0,0,0.50)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }

  };
})();
