// CinéQuiz splash chunk — Blow
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Blow"]={
   name:'Blow',
   color:'40,160,80',
   ref:'Blow \u2014 Ted Demme, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;

    /* ── CSS ── */
    let _s=document.getElementById('_bl_s');
    if(!_s){_s=document.createElement('style');_s.id='_bl_s';document.head.appendChild(_s);}
    _s.textContent=`
     

     #splash-content-wrap{top:50%!important;bottom:auto!important;transform:translateY(-50%)!important;}
     #splash-content-wrap.reveal{transform:translateY(-50%)!important;}
     #splash-quote-text{
       color:rgba(245,238,215,0.92)!important;
       text-shadow:0 2px 20px rgba(0,0,0,1),0 0 40px rgba(0,0,0,0.9)!important;
     }
     #splash-film-logo{
       filter:drop-shadow(0 4px 24px rgba(0,0,0,0.95)) drop-shadow(0 0 12px rgba(255,200,60,0.20))!important;
     }
    `;
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Billets de dollars — nombreux, grands, bien visibles ── */
    const bills=Array.from({length:22},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.55, vy:0.35+Math.random()*0.55,
     rot:Math.random()*Math.PI*2, rotSpd:(Math.random()-0.5)*0.022,
     w:W*(0.10+Math.random()*0.07), h:0,
     op:0.55+Math.random()*0.35,
     shimmer:Math.random()*Math.PI*2,
    }));
    bills.forEach(b=>b.h=b.w*0.44);

    /* ── Particules de poudre blanche ── */
    const powder=Array.from({length:120},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.30, vy:-(0.08+Math.random()*0.18),
     r:Math.random()*1.8+0.3,
     op:0.20+Math.random()*0.45,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Lignes de coke sur surface miroir ── */
    const lines=[
     {x:cx-W*0.18, y:H*0.84, len:W*0.14, angle:-0.06},
     {x:cx+W*0.04, y:H*0.86, len:W*0.10, angle: 0.04},
     {x:cx-W*0.32, y:H*0.88, len:W*0.08, angle:-0.03},
    ];

    /* ── Palmiers : 3 silhouettes ── */
    function drawPalm(px, py, lean, sc){
     ctx.save();ctx.translate(px,py);
     const th=py*0.90; // hauteur du tronc

     /* ── TRONC — courbé, épais, avec texture ── */
     // Calcul des points du tronc (courbe de Bézier)
     const tx0=0, ty0=0;
     const tx1=lean*W*0.06, ty1=-th*0.40;
     const tx2=lean*W*0.10, ty2=-th*0.72;
     const tx3=lean*W*0.05, ty3=-th*0.96;

     // Largeur tronc : large en bas, effilé en haut
     const twBot=W*0.022*sc, twTop=W*0.010*sc;

     // Dessiner le tronc comme une forme remplie (pas juste un trait)
     const steps=18;
     const leftPts=[], rightPts=[];
     for(let i=0;i<=steps;i++){
      const s=i/steps;
      // Point sur la courbe de Bézier cubique
      const bx=Math.pow(1-s,3)*tx0+3*Math.pow(1-s,2)*s*tx1+3*(1-s)*s*s*tx2+Math.pow(s,3)*tx3;
      const by=Math.pow(1-s,3)*ty0+3*Math.pow(1-s,2)*s*ty1+3*(1-s)*s*s*ty2+Math.pow(s,3)*ty3;
      // Tangente approximée
      const ds=0.01;
      const ss=Math.min(s+ds,1);
      const bx2=Math.pow(1-ss,3)*tx0+3*Math.pow(1-ss,2)*ss*tx1+3*(1-ss)*ss*ss*tx2+Math.pow(ss,3)*tx3;
      const by2=Math.pow(1-ss,3)*ty0+3*Math.pow(1-ss,2)*ss*ty1+3*(1-ss)*ss*ss*ty2+Math.pow(ss,3)*ty3;
      const dx=bx2-bx, dy=by2-by;
      const len2=Math.sqrt(dx*dx+dy*dy)||1;
      const nx=-dy/len2, ny=dx/len2; // normale
      const tw=(twBot*(1-s)+twTop*s)*0.5;
      leftPts.push([bx-nx*tw, by-ny*tw]);
      rightPts.push([bx+nx*tw, by+ny*tw]);
     }
     // Forme du tronc
     const trunkG=ctx.createLinearGradient(0,0,twBot*2,0);
     trunkG.addColorStop(0,'rgba(22,14,6,0.98)');
     trunkG.addColorStop(0.35,'rgba(48,30,12,0.97)');
     trunkG.addColorStop(0.65,'rgba(36,22,8,0.98)');
     trunkG.addColorStop(1,'rgba(18,11,4,0.98)');
     ctx.fillStyle=trunkG;
     ctx.beginPath();
     ctx.moveTo(leftPts[0][0],leftPts[0][1]);
     for(const p of leftPts)ctx.lineTo(p[0],p[1]);
     for(let i=rightPts.length-1;i>=0;i--)ctx.lineTo(rightPts[i][0],rightPts[i][1]);
     ctx.closePath();ctx.fill();

     // Anneaux de bague sur le tronc — texture
     ctx.strokeStyle='rgba(14,8,3,0.70)';
     ctx.lineWidth=0.8;
     for(let i=2;i<steps-1;i+=2){
      ctx.beginPath();
      ctx.moveTo(leftPts[i][0],leftPts[i][1]);
      ctx.lineTo(rightPts[i][0],rightPts[i][1]);
      ctx.stroke();
     }

     /* ── COURONNE — feuilles de palmier réalistes ── */
     const tipX=tx3, tipY=ty3;
     // [angle, longueur relative, épaisseur, phase de balancement]
     const leaves=[
      [-1.55, 1.00, 1.0, 0.0],
      [-1.15, 1.05, 1.0, 0.6],
      [-0.70, 1.00, 0.9, 1.2],
      [-0.25, 0.95, 0.9, 1.8],
      [ 0.20, 0.90, 0.9, 2.4],
      [ 0.65, 0.95, 0.9, 3.0],
      [ 1.10, 1.00, 1.0, 3.6],
      [ 1.55, 1.00, 1.0, 4.2],
      [-1.90, 0.85, 0.8, 4.8],
      [ 1.90, 0.85, 0.8, 5.4],
     ];

     for(const [baseAng, lenFactor, thickFactor, phase] of leaves){
      const wind=Math.sin(t*0.55+phase)*0.045+Math.sin(t*0.25+phase*0.7)*0.020;
      const ang=baseAng+wind;
      const leafLen=W*0.28*sc*lenFactor;
      const leafH=W*0.032*sc*thickFactor;

      // Extrémité de la feuille
      const ex=tipX+Math.cos(ang)*leafLen;
      const ey=tipY+Math.sin(ang)*leafLen;
      // Point de contrôle — courbe naturelle tombante
      const droop=0.35+Math.abs(Math.cos(baseAng))*0.25;
      const mx=tipX+Math.cos(ang)*leafLen*0.45+Math.sin(ang)*leafLen*droop*0.15;
      const my=tipY+Math.sin(ang)*leafLen*0.45+Math.cos(ang)*leafLen*droop*0.30;

      // Calcul de la normale à la feuille pour l'épaisseur
      const fdx=ex-tipX, fdy=ey-tipY;
      const fl=Math.sqrt(fdx*fdx+fdy*fdy)||1;
      const fnx=-fdy/fl, fny=fdx/fl;

      // Forme de feuille : triangle courbe (large à la base, pointue au bout)
      ctx.fillStyle=`rgba(18,52,14,${0.92+Math.sin(phase)*0.04})`;
      ctx.beginPath();
      ctx.moveTo(tipX+fnx*leafH*0.5, tipY+fny*leafH*0.5);
      ctx.quadraticCurveTo(mx+fnx*leafH*0.3, my+fny*leafH*0.3, ex, ey);
      ctx.quadraticCurveTo(mx-fnx*leafH*0.3, my-fny*leafH*0.3, tipX-fnx*leafH*0.5, tipY-fny*leafH*0.5);
      ctx.closePath();ctx.fill();

      // Nervure centrale
      ctx.strokeStyle=`rgba(10,35,8,0.80)`;
      ctx.lineWidth=0.8;
      ctx.beginPath();ctx.moveTo(tipX,tipY);ctx.quadraticCurveTo(mx,my,ex,ey);ctx.stroke();

      // Reflet lumière (côté haut de la feuille)
      ctx.strokeStyle=`rgba(35,80,20,0.30)`;
      ctx.lineWidth=1.2;
      ctx.beginPath();
      ctx.moveTo(tipX+fnx*leafH*0.18, tipY+fny*leafH*0.18);
      ctx.quadraticCurveTo(mx+fnx*leafH*0.15, my+fny*leafH*0.15, ex+fnx*leafH*0.05, ey+fny*leafH*0.05);
      ctx.stroke();
     }
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── FOND — nuit tropicale ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#06080a');
     bg.addColorStop(0.28,'#0a0d08');
     bg.addColorStop(0.55,'#0d1005');
     bg.addColorStop(0.80,'#121500');
     bg.addColorStop(1,'#0a0d00');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo lune/étoile haut gauche */
     const moonG=ctx.createRadialGradient(W*0.22,H*0.14,0,W*0.22,H*0.14,W*0.38);
     moonG.addColorStop(0,`rgba(200,185,120,${0.16+Math.sin(t*0.08)*0.02})`);
     moonG.addColorStop(0.4,`rgba(140,120,60,${0.07})`);
     moonG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonG;ctx.fillRect(0,0,W,H);

     /* Halo or chaud centre-bas */
     const goldG=ctx.createRadialGradient(cx,H*0.72,0,cx,H*0.72,W*0.60);
     goldG.addColorStop(0,`rgba(200,155,20,${0.22+Math.sin(t*0.12)*0.04})`);
     goldG.addColorStop(0.40,`rgba(140,100,10,${0.10})`);
     goldG.addColorStop(0.75,'rgba(60,40,0,0.04)');
     goldG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=goldG;ctx.fillRect(0,0,W,H);

     /* ── ÉTOILES ── */
     ctx.fillStyle='rgba(220,210,180,0.45)';
     for(let i=0;i<55;i++){
      const sx=((i*137.5)%W);
      const sy=((i*83.7)%H)*0.50;
      const sr=0.3+((i*23)%10)*0.12;
      const sp=0.5+0.5*Math.sin(t*0.8+i);
      ctx.globalAlpha=sp*0.35;
      ctx.beginPath();ctx.arc(sx,sy,sr,0,Math.PI*2);ctx.fill();
     }
     ctx.globalAlpha=1.0;

     /* ── LUNE ── */
     ctx.fillStyle=`rgba(230,215,160,${0.72+Math.sin(t*0.06)*0.04})`;
     ctx.beginPath();ctx.arc(W*0.22,H*0.12,W*0.040,0,Math.PI*2);ctx.fill();
     /* Ombre sur lune */
     const moonSh=ctx.createRadialGradient(W*0.24,H*0.11,0,W*0.22,H*0.12,W*0.040);
     moonSh.addColorStop(0,'rgba(0,0,0,0)');
     moonSh.addColorStop(0.55,'rgba(6,8,10,0.30)');
     moonSh.addColorStop(1,'rgba(6,8,10,0.72)');
     ctx.fillStyle=moonSh;
     ctx.beginPath();ctx.arc(W*0.22,H*0.12,W*0.040,0,Math.PI*2);ctx.fill();

     /* ── BILLETS ── */
     for(const b of bills){
      b.x+=b.vx;b.y+=b.vy;b.rot+=b.rotSpd;b.shimmer+=0.04;
      if(b.y>H+b.h){b.y=-b.h;b.x=Math.random()*W;}
      if(b.x<-b.w)b.x=W+b.w;
      if(b.x>W+b.w)b.x=-b.w;
      ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.rot);
      /* Fond billet — vert dollar */
      ctx.fillStyle=`rgba(28,80,35,${b.op})`;
      ctx.beginPath();ctx.roundRect(-b.w/2,-b.h/2,b.w,b.h,W*0.005);ctx.fill();
      /* Bordure */
      ctx.strokeStyle=`rgba(40,110,48,${b.op*0.70})`;
      ctx.lineWidth=W*0.0025;
      ctx.strokeRect(-b.w/2+W*0.004,-b.h/2+W*0.003,b.w-W*0.008,b.h-W*0.006);
      /* Portrait ovale */
      ctx.fillStyle=`rgba(50,130,55,${b.op*0.55})`;
      ctx.beginPath();ctx.ellipse(0,0,b.w*0.20,b.h*0.42,0,0,Math.PI*2);ctx.fill();
      /* Shimmer reflet */
      const shG=ctx.createLinearGradient(-b.w/2,0,b.w/2,0);
      const sp=0.3+0.7*Math.abs(Math.sin(b.shimmer));
      shG.addColorStop(0,'rgba(255,255,255,0)');
      shG.addColorStop(sp,`rgba(200,240,180,${0.14*b.op})`);
      shG.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=shG;
      ctx.beginPath();ctx.roundRect(-b.w/2,-b.h/2,b.w,b.h,W*0.005);ctx.fill();
      ctx.restore();
     }

     /* ── POUDRE BLANCHE ── */
     for(const p of powder){
      p.x+=p.vx+Math.sin(p.ph+t)*0.10;
      p.y+=p.vy;p.ph+=0.020;
      if(p.y<-10){p.y=H+10;p.x=Math.random()*W;}
      const pw=0.55+0.45*Math.abs(Math.sin(p.ph));
      ctx.fillStyle=`rgba(248,244,236,${p.op*pw})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* ── TABLE / SOL ── */
     const tableG=ctx.createLinearGradient(0,H*0.80,0,H);
     tableG.addColorStop(0,'rgba(18,16,8,0.98)');
     tableG.addColorStop(0.30,'rgba(22,18,6,0.99)');
     tableG.addColorStop(1,'rgba(10,8,2,1)');
     ctx.fillStyle=tableG;ctx.fillRect(0,H*0.80,W,H*0.20);

     /* Reflet miroir sur la table */
     const mirG=ctx.createLinearGradient(0,H*0.80,0,H*0.88);
     mirG.addColorStop(0,`rgba(60,50,20,${0.30+Math.sin(t*0.18)*0.04})`);
     mirG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mirG;ctx.fillRect(cx-W*0.38,H*0.80,W*0.76,H*0.08);

     /* ── LIGNES DE COKE ── */
     for(const l of lines){
      ctx.save();ctx.translate(l.x,l.y);ctx.rotate(l.angle);
      /* Ombre */
      ctx.fillStyle='rgba(0,0,0,0.40)';
      ctx.beginPath();ctx.roundRect(1,2,l.len,H*0.006,H*0.003);ctx.fill();
      /* Ligne blanche */
      const lineG=ctx.createLinearGradient(0,0,l.len,0);
      lineG.addColorStop(0,'rgba(255,252,248,0.0)');
      lineG.addColorStop(0.15,'rgba(255,252,248,0.90)');
      lineG.addColorStop(0.50,'rgba(255,252,248,0.95)');
      lineG.addColorStop(0.85,'rgba(255,252,248,0.88)');
      lineG.addColorStop(1,'rgba(255,252,248,0.0)');
      ctx.fillStyle=lineG;
      ctx.beginPath();ctx.roundRect(0,0,l.len,H*0.0055,H*0.0028);ctx.fill();
      /* Halo brillant */
      const glowG=ctx.createLinearGradient(0,-H*0.005,0,H*0.010);
      glowG.addColorStop(0,'rgba(240,240,255,0)');
      glowG.addColorStop(0.5,`rgba(240,240,255,${0.12+Math.sin(t*1.2)*0.04})`);
      glowG.addColorStop(1,'rgba(240,240,255,0)');
      ctx.fillStyle=glowG;
      ctx.beginPath();ctx.roundRect(l.len*0.10,-H*0.004,l.len*0.80,H*0.013,H*0.006);ctx.fill();
      ctx.restore();
     }

     /* ── PALMIERS — 3 silhouettes ── */
     drawPalm(W*0.08, H*0.80, -0.5, 1.00);
     drawPalm(W*0.88, H*0.78, 0.6,  0.88);
     drawPalm(W*0.72, H*0.82, 0.3,  0.72);

     /* ── VIGNETTE ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.08,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.40,'rgba(4,5,2,0.06)');
     vg.addColorStop(0.65,'rgba(4,5,2,0.42)');
     vg.addColorStop(0.85,'rgba(3,4,1,0.75)');
     vg.addColorStop(1,'rgba(2,3,0,0.94)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Bande top */
     const tb=ctx.createLinearGradient(0,0,0,H*0.15);
     tb.addColorStop(0,'rgba(6,8,10,0.88)');
     tb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tb;ctx.fillRect(0,0,W,H*0.15);

     /* Grain */
     for(let i=0;i<28;i++){
      const gv=4+Math.random()*12|0;
      ctx.fillStyle=`rgba(${gv+10},${gv+12},${gv+4},${Math.random()*0.014})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.6+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
