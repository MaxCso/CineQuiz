// CinéQuiz splash chunk — The Player
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["The Player"]={
   name:'The Player',
   color:'60,120,180',
   ref:'The Player \u2014 Robert Altman, 1992',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond : coucher de soleil LA ── */
    let _tpStyle=document.getElementById('_tp_splash_style');
    if(!_tpStyle){_tpStyle=document.createElement('style');_tpStyle.id='_tp_splash_style';document.head.appendChild(_tpStyle);}
    _tpStyle.textContent=`
      

      #splash-content-wrap{top:28%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    const _tpW=setInterval(()=>{if(stop.v){_tpStyle.textContent='';clearInterval(_tpW);}},200);

    /* ── Spots lumineux — projecteurs Hollywood ── */
    const spots=Array.from({length:7},(_,i)=>({
     angle:-Math.PI*0.55+i*(Math.PI*1.10/6),
     phase:i*0.5,
     spd:0.006+i*0.002,
     width:W*(0.025+i*0.008),
     op:0.12+Math.sin(i*0.9)*0.06,
    }));

    /* ── Skyline LA — 3 couches, relief et détails architecturaux ── */

    /* Données précalculées des bâtiments — [x%, topY%, w%, type] */
    /* type: 0=box, 1=stepped, 2=tapered, 3=slab */
    const LAYER1=[ /* fond lointain — bleuté, courts */
     [0.00,0.810,0.055,0],[0.04,0.760,0.040,2],[0.07,0.790,0.035,0],
     [0.10,0.730,0.060,1],[0.15,0.770,0.040,0],[0.18,0.745,0.050,2],
     [0.22,0.700,0.070,1],[0.28,0.755,0.045,0],[0.31,0.780,0.040,3],
     [0.34,0.715,0.060,2],[0.39,0.760,0.045,0],[0.42,0.740,0.050,1],
     [0.46,0.695,0.075,0],[0.52,0.750,0.045,2],[0.55,0.770,0.040,3],
     [0.58,0.720,0.060,1],[0.63,0.755,0.045,0],[0.66,0.735,0.055,2],
     [0.70,0.700,0.070,0],[0.76,0.760,0.045,1],[0.79,0.785,0.040,3],
     [0.82,0.730,0.055,2],[0.86,0.765,0.045,0],[0.89,0.750,0.050,1],
     [0.93,0.710,0.065,0],[0.97,0.775,0.040,2],
    ];
    const LAYER2=[ /* milieu — couleur intermédiaire */
     [0.00,0.860,0.050,0],[0.03,0.790,0.055,1],[0.07,0.820,0.045,0],
     [0.10,0.755,0.065,2],[0.15,0.800,0.048,0],[0.18,0.770,0.055,3],
     [0.22,0.730,0.072,1],[0.27,0.810,0.045,0],[0.30,0.840,0.042,2],
     [0.33,0.775,0.060,0],[0.37,0.825,0.042,3],[0.40,0.795,0.050,1],
     [0.43,0.748,0.078,0],[0.49,0.815,0.048,2],[0.52,0.845,0.040,0],
     [0.55,0.770,0.068,1],[0.60,0.820,0.046,0],[0.63,0.790,0.055,3],
     [0.66,0.742,0.075,2],[0.72,0.810,0.047,0],[0.75,0.850,0.042,1],
     [0.78,0.778,0.060,0],[0.82,0.822,0.046,2],[0.85,0.800,0.052,0],
     [0.88,0.758,0.070,1],[0.93,0.828,0.044,3],[0.96,0.858,0.042,0],
    ];
    const LAYER3=[ /* premier plan — noirs, très hauts */
     [0.00,0.895,0.048,0],[0.04,0.825,0.052,1],[0.08,0.858,0.042,2],
     [0.11,0.778,0.068,0],[0.16,0.835,0.045,3],[0.19,0.805,0.055,1],
     [0.23,0.748,0.078,0],[0.29,0.840,0.044,2],[0.32,0.872,0.040,0],
     [0.35,0.790,0.062,1],[0.40,0.850,0.043,3],[0.43,0.815,0.052,0],
     [0.46,0.738,0.085,2],[0.53,0.832,0.050,0],[0.57,0.868,0.042,1],
     [0.60,0.780,0.068,0],[0.66,0.840,0.048,2],[0.69,0.800,0.058,3],
     [0.72,0.752,0.080,1],[0.78,0.838,0.048,0],[0.82,0.878,0.040,2],
     [0.85,0.798,0.062,0],[0.89,0.848,0.044,1],[0.92,0.822,0.050,3],
     [0.95,0.765,0.058,0],[0.98,0.882,0.040,2],
    ];

    function drawBuilding(bx,by,bw,bh,col,type,seed){
     ctx.fillStyle=col;
     if(type===0){
      /* Box simple avec corniche */
      ctx.fillRect(bx,by,bw,bh);
      /* Corniche */
      ctx.fillRect(bx-bw*0.05,by-bh*0.01,bw*1.10,bh*0.025);
     } else if(type===1){
      /* Stepped — 2 paliers */
      ctx.fillRect(bx,by+bh*0.35,bw,bh*0.65);
      ctx.fillRect(bx+bw*0.12,by,bw*0.76,bh*0.38);
      /* Corniche de séparation */
      ctx.fillRect(bx-bw*0.03,by+bh*0.33,bw*1.06,bh*0.025);
     } else if(type===2){
      /* Tapered — plus étroit en haut */
      ctx.beginPath();
      ctx.moveTo(bx,by+bh);
      ctx.lineTo(bx+bw,by+bh);
      ctx.lineTo(bx+bw*0.88,by+bh*0.3);
      ctx.lineTo(bx+bw*0.5+bw*0.14,by);
      ctx.lineTo(bx+bw*0.5-bw*0.14,by);
      ctx.lineTo(bx+bw*0.12,by+bh*0.3);
      ctx.closePath();ctx.fill();
     } else {
      /* Slab — large et plat avec penthouse */
      ctx.fillRect(bx,by+bh*0.22,bw,bh*0.78);
      ctx.fillRect(bx+bw*0.25,by,bw*0.50,bh*0.26);
      ctx.fillRect(bx-bw*0.04,by+bh*0.20,bw*1.08,bh*0.028);
     }
     /* Antenne ou réservoir d'eau sur certains buildings */
     const det=(seed*731)%1;
     if(det<0.35){
      /* Antenne fine */
      ctx.fillRect(bx+bw*0.5-W*0.003,by-bh*0.08,W*0.006,bh*0.08);
      ctx.beginPath();ctx.arc(bx+bw*0.5,by-bh*0.08,W*0.004,0,Math.PI*2);ctx.fill();
     } else if(det<0.55){
      /* Réservoir d'eau */
      ctx.beginPath();
      ctx.ellipse(bx+bw*0.5,by-bh*0.06,bw*0.12,bh*0.04,0,0,Math.PI*2);ctx.fill();
      ctx.fillRect(bx+bw*0.5-W*0.004,by-bh*0.02,W*0.008,bh*0.03);
     } else if(det<0.70){
      /* Deux antennes */
      ctx.fillRect(bx+bw*0.30-W*0.002,by-bh*0.06,W*0.004,bh*0.06);
      ctx.fillRect(bx+bw*0.70-W*0.002,by-bh*0.05,W*0.004,bh*0.05);
     }
    }

    function drawWindows(bx,by,bw,bh,seed){
     /* Grille de fenêtres déterministe */
     const rowH=Math.max(H*0.012,6), colW=Math.max(bw*0.18,4);
     const rows=Math.max(2,Math.floor(bh/rowH/1.6)|0);
     const cols=Math.max(1,Math.floor(bw/colW)|0);
     for(let r=1;r<rows;r++){
      for(let c=0;c<cols;c++){
       const hash=((seed*1000+r*197+c*43)*1664525+1013904223)&0xfff;
       const norm=(hash&0xff)/255;
       if(norm>0.28)continue;
       const wx=bx+c*(bw/cols)+bw*0.08;
       const wy=by+r*(bh/rows);
       const warm=norm>0.14;
       /* Fenêtre */
       ctx.fillStyle=warm?`rgba(255,215,110,${0.55+norm*1.5})`:`rgba(190,225,255,${0.40+norm})`;
       ctx.fillRect(wx,wy,colW*0.55,rowH*0.55);
       /* Halo très léger autour */
       if(norm<0.08){
        ctx.fillStyle=warm?`rgba(255,180,60,0.06)`:`rgba(140,200,255,0.05)`;
        ctx.fillRect(wx-1,wy-1,colW*0.55+2,rowH*0.55+2);
       }
      }
     }
    }

    function drawSkyline(){
     const baseY=H*0.848;
     const sc=8.5; /* facteur de hauteur global */

     /* ── Couche 1 : fond lointain bleuté ── */
     for(const [xr,yr,wr,type] of LAYER1){
      const bh=(1-yr)*(H-baseY)*sc*0.55;
      const bx=xr*W, bw=wr*W;
      drawBuilding(bx,baseY-bh,bw,bh,'rgba(22,34,68,0.68)',type,xr);
      drawWindows(bx,baseY-bh,bw,bh,xr);
     }

     /* ── Couche 2 : milieu ── */
     for(const [xr,yr,wr,type] of LAYER2){
      const bh=(1-yr)*(H-baseY)*sc*0.78;
      const bx=xr*W, bw=wr*W;
      drawBuilding(bx,baseY-bh,bw,bh,'rgba(10,14,28,0.90)',type,xr+0.5);
      drawWindows(bx,baseY-bh,bw,bh,xr+0.5);
     }

     /* ── Couche 3 : premier plan très sombre ── */
     for(const [xr,yr,wr,type] of LAYER3){
      const bh=(1-yr)*(H-baseY)*sc;
      const bx=xr*W, bw=wr*W;
      drawBuilding(bx,baseY-bh,bw,bh,'rgba(5,6,14,1.0)',type,xr+1.0);
      /* Pas de fenêtres sur les buildings très sombres au premier plan */
      drawWindows(bx,baseY-bh,bw,bh,xr+1.0);
     }

     /* ── Sol ── */
     ctx.fillStyle='rgba(4,5,12,1.0)';
     ctx.fillRect(0,baseY,W,H-baseY);

     /* ── Palmiers — au premier plan ── */
     ctx.fillStyle='rgba(4,5,12,1.0)';
     ctx.strokeStyle='rgba(4,5,12,1.0)';
     for(const px of [0.18,0.38,0.60,0.80]){
      const py=baseY;
      /* Tronc légèrement courbé */
      ctx.lineWidth=W*0.010;ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(px*W,py);
      ctx.quadraticCurveTo(px*W+W*0.012,py-H*0.055,px*W+W*0.018,py-H*0.10);
      ctx.stroke();
      /* Feuilles */
      ctx.lineWidth=W*0.008;
      for(let fi=-2;fi<=2;fi++){
       const fa=fi*0.38-Math.PI*0.5;
       const tipX=px*W+W*0.018+Math.cos(fa)*W*0.095;
       const tipY=py-H*0.10+Math.sin(fa)*H*0.068;
       ctx.beginPath();
       ctx.moveTo(px*W+W*0.018,py-H*0.10);
       ctx.quadraticCurveTo(
        px*W+W*0.018+Math.cos(fa)*W*0.048, py-H*0.10+Math.sin(fa)*H*0.034,
        tipX, tipY
       );
       ctx.stroke();
      }
     }
    }

    /* ── Particules flottantes — poussière lumineuse ── */
    const particles=Array.from({length:55},()=>({
     x:Math.random()*W,
     y:H*0.20+Math.random()*H*0.65,
     r:Math.random()*1.8+0.3,
     vx:(Math.random()-0.5)*0.18,
     vy:-(Math.random()*0.25+0.04),
     op:Math.random()*0.35+0.08,
     warm:Math.random()>0.45,
     ph:Math.random()*Math.PI*2,
     phSpd:Math.random()*0.02+0.005,
    }));

    /* ── Flares de projecteurs — halos lumineux en tête de faisceau ── */
    const flares=Array.from({length:7},(_,i)=>({idx:i,ph:i*0.5}));

    function frame(){
     if(stop.v)return;

     /* ── Ciel coucher de soleil LA ── */
     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0.00,'#1a3a6a'); /* bleu profond en haut */
     sky.addColorStop(0.25,'#2a5590');
     sky.addColorStop(0.48,'#4a7aaa');
     sky.addColorStop(0.62,'#c08040'); /* orange horizon */
     sky.addColorStop(0.74,'#e09830');
     sky.addColorStop(0.84,'#c8701a'); /* orange-rouge bas */
     sky.addColorStop(1.00,'#1a1008');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

     /* Halo blanc-chaud au centre horizon */
     const sunG=ctx.createRadialGradient(cx,H*0.72,0,cx,H*0.72,W*0.55);
     sunG.addColorStop(0,'rgba(255,240,200,0.35)');
     sunG.addColorStop(0.35,'rgba(230,180,80,0.15)');
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H);

     /* ── Spots projecteurs ── */
     for(const sp of spots){
      sp.phase+=sp.spd;
      const a=sp.angle+Math.sin(sp.phase)*0.08;
      const len=H*1.1;
      ctx.save();
      ctx.translate(cx,H*0.845);
      ctx.rotate(a);
      const spG=ctx.createLinearGradient(0,0,0,-len);
      spG.addColorStop(0,`rgba(255,245,220,${sp.op*0.8})`);
      spG.addColorStop(0.45,`rgba(240,225,180,${sp.op*0.35})`);
      spG.addColorStop(1,'rgba(255,240,200,0)');
      ctx.fillStyle=spG;
      ctx.beginPath();
      ctx.moveTo(-sp.width/2,0);
      ctx.lineTo(sp.width/2,0);
      ctx.lineTo(sp.width*1.8,-len);
      ctx.lineTo(-sp.width*1.8,-len);
      ctx.closePath();ctx.fill();
      ctx.restore();
     }

     /* ── Skyline ── */
     drawSkyline();

     /* ── Particules flottantes ── */
     for(const p of particles){
      p.ph+=p.phSpd;
      p.x+=p.vx+Math.sin(p.ph*0.7)*0.12;
      p.y+=p.vy;
      if(p.y<H*0.15){p.y=H*0.88;p.x=Math.random()*W;}
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      const pulse=p.op*(0.6+0.4*Math.sin(p.ph));
      ctx.fillStyle=p.warm?`rgba(255,200,100,${pulse})`:`rgba(200,220,255,${pulse*0.7})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      /* Halo doux autour des plus grosses particules */
      if(p.r>1.2){
       const hg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4);
       hg.addColorStop(0,p.warm?`rgba(255,190,80,${pulse*0.18})`:`rgba(180,210,255,${pulse*0.12})`);
       hg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=hg;ctx.fillRect(p.x-p.r*4,p.y-p.r*4,p.r*8,p.r*8);
      }
     }

     /* ── Flares en tête de faisceau ── */
     for(const fl of flares){
      fl.ph+=spots[fl.idx].spd;
      const a=spots[fl.idx].angle+Math.sin(fl.ph)*0.08;
      const flen=H*0.55;
      const fx=cx+Math.sin(a)*flen;
      const fy=H*0.845-Math.cos(a)*flen;
      /* Halo au bout du spot */
      const fg=ctx.createRadialGradient(fx,fy,0,fx,fy,W*0.055);
      const fop=0.12+Math.sin(fl.ph*1.3)*0.07;
      fg.addColorStop(0,`rgba(255,245,200,${fop})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.fillRect(fx-W*0.06,fy-W*0.06,W*0.12,W*0.12);
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.08,cx,H*0.45,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.10)');
     vg.addColorStop(1,'rgba(0,0,0,0.75)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain */
     for(let i=0;i<28;i++){const g=8+Math.random()*20|0;ctx.fillStyle=`rgba(${g+4},${g+2},${g},${Math.random()*0.018})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
