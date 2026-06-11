// CinéQuiz splash chunk — Virgin Suicides
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Virgin Suicides"]={
   name:'Virgin Suicides',
   color:'200,160,120',
   ref:'The Virgin Suicides \u2014 Sofia Coppola, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_vs_s');
    if(!_s){_s=document.createElement('style');_s.id='_vs_s';document.head.appendChild(_s);}
    _s.textContent=`#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-tagline{color:rgba(255,105,165,0.90)!important;-webkit-text-fill-color:rgba(255,105,165,0.90)!important;text-shadow:none!important;}#splash-film-ref-bottom,#splash-film-ref,#splash-film-ref *{color:#ffffff!important;-webkit-text-fill-color:#ffffff!important;text-shadow:none!important;}`;
    const _w=setInterval(()=>{
     if(stop.v){
      _s.textContent='';
      ['_vs_vig'].forEach(id=>{const el=document.getElementById(id);if(el&&el.parentNode)el.parentNode.removeChild(el);});
      clearInterval(_w);
     }
    },200);

    /* Pétales roses qui tombent */
    const petals=Array.from({length:40},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vy:0.22+Math.random()*0.38, vx:(Math.random()-0.5)*0.18,
     rot:Math.random()*Math.PI*2, rotSpd:(Math.random()-0.5)*0.020,
     w:W*(0.018+Math.random()*0.016), h:H*(0.010+Math.random()*0.008),
     op:0.35+Math.random()*0.40,
     col:Math.random()<0.5?'210,30,60':'220,80,110',
    }));

    /* Petits cœurs flottants */
    const hearts=Array.from({length:12},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vy:-(0.15+Math.random()*0.20), vx:(Math.random()-0.5)*0.12,
     size:W*(0.010+Math.random()*0.014),
     op:0.20+Math.random()*0.30, ph:Math.random()*Math.PI*2,
    }));

    function drawHeart(hx,hy,s,op){
     ctx.save();ctx.translate(hx,hy);ctx.globalAlpha=op;
     ctx.fillStyle='rgba(200,20,50,1)';
     ctx.beginPath();
     ctx.moveTo(0,s*0.35);
     ctx.bezierCurveTo(-s*0.5,s*0.10,-s*0.5,-s*0.30,0,-s*0.15);
     ctx.bezierCurveTo(s*0.5,-s*0.30,s*0.5,s*0.10,0,s*0.35);
     ctx.closePath();ctx.fill();
     ctx.restore();
    }

    /* Flocons de neige printaniers */
    const flakes=Array.from({length:18},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vy:0.12+Math.random()*0.22, vx:(Math.random()-0.5)*0.10,
     r:Math.random()*1.4+0.4, op:0.18+Math.random()*0.22,
     wb:Math.random()*Math.PI*2, wSpd:0.006+Math.random()*0.010,
    }));

    /* ── Arbre canvas ── */
    function drawTree(){
     /* Arbre fidèle à l'image : tronc droit épais gris, longues branches horizontales,
        petites touffes pendantes le long des branches */
     const TX=W/2, BY=H*1.00;   /* base du tronc — centré-droit de l'écran */
     const TH=H*0.52;              /* hauteur du tronc avant premières branches */
     const TW=W*0.034;             /* tronc épais */
     ctx.save();

     /* Ombre elliptique au sol */
     const sg=ctx.createRadialGradient(TX+W*0.04,BY,0,TX+W*0.05,BY,W*0.28);
     sg.addColorStop(0,'rgba(100,55,30,0.10)');sg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sg;ctx.beginPath();ctx.ellipse(TX+W*0.04,BY,W*0.28,H*0.018,0,0,Math.PI*2);ctx.fill();

     /* ── Dessine un segment cylindrique ── */
     function seg(x0,y0,x1,y1,w0,w1){
      const dx=x1-x0,dy=y1-y0,len=Math.sqrt(dx*dx+dy*dy)||1;
      const nx=-dy/len,ny=dx/len;
      ctx.beginPath();
      ctx.moveTo(x0+nx*w0,y0+ny*w0);
      ctx.bezierCurveTo(x0+nx*w0+(x1-x0)*0.35,y0+ny*w0+(y1-y0)*0.35,
                        x1+nx*w1-(x1-x0)*0.35,y1+ny*w1-(y1-y0)*0.35,x1+nx*w1,y1+ny*w1);
      ctx.lineTo(x1-nx*w1,y1-ny*w1);
      ctx.bezierCurveTo(x1-nx*w1-(x1-x0)*0.35,y1-ny*w1-(y1-y0)*0.35,
                        x0-nx*w0+(x1-x0)*0.35,y0-ny*w0+(y1-y0)*0.35,x0-nx*w0,y0-ny*w0);
      ctx.closePath();
      /* Bark gris-brun clair comme l'image */
      const lg=ctx.createLinearGradient(x0-nx*w0,0,x0+nx*w0,0);
      lg.addColorStop(0,'rgba(62,50,38,0.97)');
      lg.addColorStop(0.20,'rgba(95,78,58,0.96)');
      lg.addColorStop(0.50,'rgba(110,90,65,0.95)');
      lg.addColorStop(0.80,'rgba(88,72,52,0.96)');
      lg.addColorStop(1,'rgba(58,46,34,0.97)');
      ctx.fillStyle=lg;ctx.fill();
      /* Stries d'écorce verticales */
      ctx.strokeStyle='rgba(40,30,20,0.12)';ctx.lineWidth=0.8;
      for(let s=0;s<3;s++){
       const ox=nx*(w0*(s/2-0.5)*0.6);const oy=ny*(w0*(s/2-0.5)*0.6);
       ctx.beginPath();ctx.moveTo(x0+ox,y0+oy);ctx.lineTo(x1+ox*(w1/w0),y1+oy*(w1/w0));ctx.stroke();
      }
     }

     /* ── Tronc — droit, légère courbure naturelle ── */
     const tipX=TX+W*0.005, tipY=BY-TH;
     seg(TX,BY, tipX,tipY, TW,TW*0.50);

     /* ── Branches — longues, presque horizontales, légèrement courbées vers le bas ── */
     /* Les branches partent haut sur le tronc (2/3 de la hauteur) */
     const bY0=tipY+TH*0.10; /* niveau des premières branches */
     const bY1=tipY+TH*0.22;
     const bY2=tipY+TH*0.35;

     /* Branche principale gauche — longue, part haut, descend légèrement */
     const bL1=[{x:tipX,y:bY0},{x:tipX-W*0.14,y:bY0-H*0.04},{x:tipX-W*0.28,y:bY0+H*0.01},{x:tipX-W*0.40,y:bY0+H*0.03}];
     for(let i=0;i<bL1.length-1;i++){
      const ww=TW*(0.40-i*0.07);
      seg(bL1[i].x,bL1[i].y,bL1[i+1].x,bL1[i+1].y,ww,ww*0.75);
     }
     /* Sous-branche gauche-haut */
     seg(bL1[2].x,bL1[2].y, bL1[2].x-W*0.08,bL1[2].y-H*0.08, TW*0.16,TW*0.07);
     seg(bL1[2].x,bL1[2].y, bL1[2].x-W*0.04,bL1[2].y+H*0.05, TW*0.14,TW*0.06);

     /* Branche principale droite — symétrique, un peu plus courte */
     const bR1=[{x:tipX,y:bY1},{x:tipX+W*0.12,y:bY1-H*0.03},{x:tipX+W*0.24,y:bY1+H*0.01},{x:tipX+W*0.34,y:bY1+H*0.04}];
     for(let i=0;i<bR1.length-1;i++){
      const ww=TW*(0.36-i*0.06);
      seg(bR1[i].x,bR1[i].y,bR1[i+1].x,bR1[i+1].y,ww,ww*0.75);
     }
     seg(bR1[2].x,bR1[2].y, bR1[2].x+W*0.06,bR1[2].y-H*0.07, TW*0.14,TW*0.06);
     seg(bR1[2].x,bR1[2].y, bR1[2].x+W*0.03,bR1[2].y+H*0.05, TW*0.12,TW*0.05);

     /* Branche gauche-basse — c'est là que sera la balançoire */
     const bL2=[{x:tipX,y:bY2},{x:tipX-W*0.10,y:bY2-H*0.02},{x:tipX-W*0.22,y:bY2+H*0.02},{x:tipX-W*0.30,y:bY2+H*0.05}];
     for(let i=0;i<bL2.length-1;i++){
      const ww=TW*(0.30-i*0.06);
      seg(bL2[i].x,bL2[i].y,bL2[i+1].x,bL2[i+1].y,ww,ww*0.75);
     }

     /* Petites branches au sommet du tronc */
     for(let i=0;i<4;i++){
      const ang=-Math.PI*0.5+(i-1.5)*0.28;
      seg(tipX,tipY, tipX+Math.cos(ang)*W*0.08,tipY+Math.sin(ang)*H*0.09, TW*0.22,TW*0.08);
     }

     /* ── Feuillage : petites touffes pendantes dispersées ── */
     function leafTuft(cx2,cy2,sz){
      /* Touffe dense = 3 couches concentriques de feuilles ovales */
      const cols=['rgba(52,72,35,','rgba(65,88,42,','rgba(45,62,28,','rgba(78,102,50,','rgba(58,80,38,'];
      /* Couche externe — grandes feuilles étalées */
      for(let i=0;i<12;i++){
       const a=i/12*Math.PI*2;
       const r=sz*(0.55+Math.sin(i*1.9)*0.18);
       const lx=cx2+Math.cos(a)*r, ly=cy2+Math.sin(a)*r*0.70;
       const rw=sz*(0.32+Math.cos(i*2.3)*0.08);
       const rh=sz*(0.18+Math.sin(i*1.7)*0.05);
       ctx.fillStyle=`${cols[i%5]}${0.78+Math.sin(i*0.8)*0.12})`;
       ctx.beginPath();ctx.ellipse(lx,ly,rw,rh,a*0.5,0,Math.PI*2);ctx.fill();
      }
      /* Couche intermédiaire */
      for(let i=0;i<9;i++){
       const a=i/9*Math.PI*2+0.35;
       const r=sz*(0.30+Math.sin(i*2.2)*0.12);
       const lx=cx2+Math.cos(a)*r, ly=cy2+Math.sin(a)*r*0.65;
       const rw=sz*(0.25+Math.cos(i*1.8)*0.06);
       const rh=sz*(0.15+Math.sin(i*2.1)*0.04);
       ctx.fillStyle=`${cols[(i+2)%5]}${0.82+Math.sin(i)*0.10})`;
       ctx.beginPath();ctx.ellipse(lx,ly,rw,rh,a*0.4,0,Math.PI*2);ctx.fill();
      }
      /* Centre dense */
      for(let i=0;i<6;i++){
       const a=i/6*Math.PI*2+0.7;
       const r=sz*0.14;
       const lx=cx2+Math.cos(a)*r, ly=cy2+Math.sin(a)*r*0.6;
       ctx.fillStyle=`${cols[(i+1)%5]}0.88)`;
       ctx.beginPath();ctx.ellipse(lx,ly,sz*0.18,sz*0.12,a*0.3,0,Math.PI*2);ctx.fill();
      }
      /* Feuilles pendantes vers le bas */
      for(let i=0;i<6;i++){
       const px=cx2+(i-2.5)*sz*0.20;
       const py=cy2+sz*(0.42+i%2*0.14);
       ctx.fillStyle=`${cols[i%5]}0.70)`;
       ctx.beginPath();ctx.ellipse(px,py,sz*0.13,sz*0.20,0.1+(i%3)*0.2,0,Math.PI*2);ctx.fill();
      }
     }

     /* Touffes sur branche gauche principale — dense, couvre toute la branche */
     for(let i=0;i<bL1.length;i++){
      const p=bL1[i];
      leafTuft(p.x,      p.y-H*0.07, W*0.090);
      leafTuft(p.x-W*0.03,p.y-H*0.04, W*0.075);
      if(i>0){
       leafTuft(p.x+W*0.04,p.y+H*0.03, W*0.068);
       leafTuft(p.x-W*0.05,p.y-H*0.10, W*0.072);
      }
     }
     /* Touffes intermédiaires entre les points */
     for(let i=0;i<bL1.length-1;i++){
      const mx=(bL1[i].x+bL1[i+1].x)/2, my=(bL1[i].y+bL1[i+1].y)/2;
      leafTuft(mx, my-H*0.06, W*0.080);
      leafTuft(mx+W*0.02,my+H*0.02, W*0.065);
     }

     /* Touffes branche droite */
     for(let i=0;i<bR1.length;i++){
      const p=bR1[i];
      leafTuft(p.x,       p.y-H*0.07, W*0.085);
      leafTuft(p.x+W*0.03,p.y-H*0.04, W*0.070);
      if(i>0){
       leafTuft(p.x-W*0.03,p.y+H*0.03, W*0.065);
       leafTuft(p.x+W*0.05,p.y-H*0.10, W*0.068);
      }
     }
     for(let i=0;i<bR1.length-1;i++){
      const mx=(bR1[i].x+bR1[i+1].x)/2, my=(bR1[i].y+bR1[i+1].y)/2;
      leafTuft(mx, my-H*0.06, W*0.075);
      leafTuft(mx-W*0.02,my+H*0.02, W*0.060);
     }

     /* Touffes branche gauche-basse */
     for(let i=0;i<bL2.length;i++){
      const p=bL2[i];
      leafTuft(p.x,       p.y-H*0.05, W*0.078);
      leafTuft(p.x-W*0.02,p.y+H*0.02, W*0.062);
      if(i>0) leafTuft(p.x+W*0.03,p.y-H*0.08, W*0.065);
     }
     for(let i=0;i<bL2.length-1;i++){
      const mx=(bL2[i].x+bL2[i+1].x)/2, my=(bL2[i].y+bL2[i+1].y)/2;
      leafTuft(mx, my-H*0.05, W*0.070);
     }

     /* Touffes sommet — couronne dense */
     leafTuft(tipX,       tipY-H*0.10, W*0.095);
     leafTuft(tipX-W*0.06,tipY-H*0.08, W*0.082);
     leafTuft(tipX+W*0.06,tipY-H*0.08, W*0.078);
     leafTuft(tipX-W*0.03,tipY-H*0.15, W*0.072);
     leafTuft(tipX+W*0.03,tipY-H*0.14, W*0.068);

     ctx.restore();
    }


    /* ── Balançoire ── */
    let swingAngle=0.18, swingVel=0, swingDir=1;
    function drawSwing(){
     swingAngle+=0.008*swingDir;
     if(swingAngle>0.22)swingDir=-1;
     if(swingAngle<-0.22)swingDir=1;
     swingVel=swingAngle;

     /* Point d'accroche sur la branche gauche */
     /* bL2[2] = tipX-W*0.22, bY2+H*0.02 soit W*0.56+0.005-0.22=W*0.345, H*(1-0.52+0.52*0.35+0.02) */
     const attachX=W*0.345, attachY=H*(1.00-0.52+0.52*0.35+0.02);
     const ropeLen=H*0.12;
     const ropeGap=W*0.042; /* écart entre les deux cordes */

     /* Cordes */
     const lx=attachX-ropeGap*0.5,rx=attachX+ropeGap*0.5;
     const endLX=lx+Math.sin(swingAngle)*ropeLen;
     const endRX=rx+Math.sin(swingAngle)*ropeLen;
     const endY=attachY+Math.cos(swingAngle)*ropeLen;

     ctx.strokeStyle='rgba(45,28,18,0.72)';ctx.lineWidth=1.8;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(lx,attachY);ctx.lineTo(endLX,endY);ctx.stroke();
     ctx.beginPath();ctx.moveTo(rx,attachY);ctx.lineTo(endRX,endY);ctx.stroke();

     /* Planche */
     ctx.save();ctx.translate((endLX+endRX)/2,endY);ctx.rotate(swingAngle);
     const pw=ropeGap*1.4,ph=H*0.012;
     const pg=ctx.createLinearGradient(-pw/2,-ph/2,pw/2,ph/2);
     pg.addColorStop(0,'rgba(48,28,16,0.90)');
     pg.addColorStop(0.5,'rgba(62,38,22,0.88)');
     pg.addColorStop(1,'rgba(38,20,10,0.90)');
     ctx.fillStyle=pg;
     ctx.beginPath();ctx.roundRect(-pw/2,-ph/2,pw,ph,2);ctx.fill();
     ctx.restore();
    }

    /* Vignette rose */
    function _vsVig(){
     if(document.getElementById('_vs_vig')) return;
     const v=document.createElement('div');v.id='_vs_vig';
     Object.assign(v.style,{position:'absolute',inset:'0',zIndex:'2',pointerEvents:'none',
      background:'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(200,80,110,.18) 100%)'});
     cv.parentElement.appendChild(v);
    }
    (function(){
     const _splash=document.getElementById('splash');
     if(!_splash) return;
     if(_splash.classList.contains('curtain-open')){ _vsVig(); }
     else {
      const _vsObs=new MutationObserver(function(mutations){
       for(const m of mutations){
        if(m.type==='attributes'&&m.attributeName==='class'){
         if(_splash.classList.contains('curtain-open')){ _vsObs.disconnect(); _vsVig(); }
        }
       }
      });
      _vsObs.observe(_splash,{attributes:true,attributeFilter:['class']});
      const _vsStopCheck=setInterval(()=>{if(stop.v){_vsObs.disconnect();clearInterval(_vsStopCheck);}},200);
     }
    })();
    function frame(){
     if(stop.v)return;

     /* ── Fond coucher de soleil années 70 — rose/pêche/mauve ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#c8a0be');  /* mauve doux en haut */
     bg.addColorStop(0.28,'#ddb8c8');  /* rose poudré */
     bg.addColorStop(0.55,'#ecc8c0');  /* pêche chaud */
     bg.addColorStop(0.78,'#f0cec0');  /* pêche clair */
     bg.addColorStop(1.00,'#e0b8ac');  /* terra cotta doux */
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo soleil couchant bas-gauche — chaud et doux */
     const sunG=ctx.createRadialGradient(W*0.25,H*0.72,0,W*0.25,H*0.72,W*0.65);
     sunG.addColorStop(0,`rgba(255,210,160,${0.22+Math.sin(t*0.3)*0.04})`);
     sunG.addColorStop(0.35,`rgba(240,170,120,${0.10+Math.sin(t*0.2)*0.02})`);
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H);

     /* Texture grain vintage — comme l'affiche imprimée */
     for(let i=0;i<24;i++){
      const gop=Math.random()*0.022;
      ctx.fillStyle=`rgba(${Math.random()<0.5?180:220},${Math.random()<0.5?80:120},${Math.random()<0.5?100:140},${gop})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*3+0.4,Math.random()*3+0.4);
     }

     /* Halo central rosé-chaud */
     const glow=ctx.createRadialGradient(cx,H*0.44,0,cx,H*0.44,W*0.60);
     glow.addColorStop(0,'rgba(255,255,255,0.10)');
     glow.addColorStop(0.4,'rgba(240,180,200,0.05)');
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);

     /* Arbre canvas + balançoire */
     drawTree();
     drawSwing();

     /* Pétales */
     for(const p of petals){
      p.y+=p.vy;p.x+=p.vx;p.rot+=p.rotSpd;
      if(p.y>H+20){p.y=-20;p.x=Math.random()*W;}
      if(p.x<-20||p.x>W+20)p.vx*=-1;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.fillStyle=`rgba(${p.col},${p.op})`;
      ctx.beginPath();ctx.ellipse(0,0,p.w/2,p.h/2,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* Flocons de neige printaniers */
     for(const f of flakes){
      f.y+=f.vy;f.x+=f.vx;f.wb+=f.wSpd;
      if(f.y>H){f.y=-5;f.x=Math.random()*W;}
      f.x+=Math.sin(f.wb)*0.12;
      ctx.fillStyle=`rgba(255,240,245,${f.op*(0.4+Math.abs(Math.sin(f.wb))*0.6)})`;
      ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();
     }

     /* Petits cœurs flottants */
     for(const h of hearts){
      h.x+=h.vx;h.y+=h.vy;h.ph+=0.022;
      if(h.y<-20){h.y=H+20;h.x=Math.random()*W;}
      if(h.x<0||h.x>W)h.vx*=-1;
      drawHeart(h.x,h.y,h.size,h.op*(0.5+0.5*Math.abs(Math.sin(h.ph))));
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
