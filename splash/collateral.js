// CinéQuiz splash chunk — Collatéral
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Collatéral"]={
   name:'Collat\u00e9ral',
   color:'40,80,160',
   ref:'Collateral \u2014 Michael Mann, 2004',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_col_s');
    if(!_s){_s=document.createElement('style');_s.id='_col_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Skyline de LA — immeubles précalculés ── */
    const skyY=H*0.52; /* ligne d'horizon */
    const roadY=H*0.72; /* route */
    const buildings=[
     /* {x, w, h, floors_x, floors_y, dark} */
     {x:W*0.00, w:W*0.18, h:H*0.30, col:'#07111e'},
     {x:W*0.02, w:W*0.14, h:H*0.38, col:'#08131f'},
     {x:W*0.14, w:W*0.10, h:H*0.24, col:'#060f1a'},
     {x:W*0.22, w:W*0.08, h:H*0.28, col:'#071218'},
     {x:W*0.28, w:W*0.16, h:H*0.42, col:'#081420'},
     {x:W*0.42, w:W*0.06, h:H*0.20, col:'#060e18'},
     {x:W*0.46, w:W*0.10, h:H*0.32, col:'#07111c'},
     {x:W*0.54, w:W*0.14, h:H*0.26, col:'#080f1a'},
     {x:W*0.66, w:W*0.18, h:H*0.44, col:'#081318'},
     {x:W*0.80, w:W*0.12, h:H*0.30, col:'#07101c'},
     {x:W*0.88, w:W*0.08, h:H*0.22, col:'#060d18'},
     {x:W*0.92, w:W*0.14, h:H*0.36, col:'#071220'},
    ];

    /* Fenêtres par immeuble — pré-générées */
    const windowData=buildings.map(b=>{
     const cols=Math.max(2,Math.floor(b.w/(W*0.025)));
     const rows=Math.max(3,Math.floor(b.h/(H*0.038)));
     const wins=[];
     for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
       if(Math.random()<0.55){
        wins.push({
         c,r,
         on:Math.random()<0.75,
         flicker:Math.random()<0.04,
         phase:Math.random()*Math.PI*2,
        });
       }
      }
     }
     return {cols,rows,wins};
    });

    /* ── Taxi jaune — traverse de droite à gauche ── */
    let taxiX=W*0.80;
    const taxiSpd=W*0.0012;
    const taxiY=roadY-H*0.048;

    /* ── Reflets sur la route ── */
    const reflections=Array.from({length:8},(_,i)=>({
     x:W*(0.05+i*0.12)+Math.random()*W*0.06,
     op:0.04+Math.random()*0.06,
     w:W*(0.02+Math.random()*0.03),
     col:Math.random()<0.5?'255,200,80':'160,180,220',
    }));

    /* ── Pluie fine digitale (style DV Mann) ── */
    const rain=Array.from({length:80},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vy:H*(0.009+Math.random()*0.011),
     len:H*(0.012+Math.random()*0.014),
     op:0.04+Math.random()*0.07,
    }));

    /* ── Particules lumineuses — reflets de ville ── */
    const bokeh=Array.from({length:18},()=>({
     x:Math.random()*W,
     y:H*(0.55+Math.random()*0.35),
     r:W*(0.008+Math.random()*0.020),
     op:0.08+Math.random()*0.18,
     col:Math.random()<0.6?'255,190,50':'180,210,255',
     ph:Math.random()*Math.PI*2,
     spd:0.008+Math.random()*0.012,
    }));

    function frame(){
     if(stop.v)return;

     /* ── Ciel nuit LA — bleu nuit profond ── */
     const sky=ctx.createLinearGradient(0,0,0,skyY);
     sky.addColorStop(0,`hsl(215,${55+Math.sin(t*0.08)*3|0}%,${7+Math.sin(t*0.06)*1|0}%)`);
     sky.addColorStop(0.55,'hsl(218,52%,9%)');
     sky.addColorStop(0.85,'hsl(220,48%,11%)');
     sky.addColorStop(1,'hsl(222,42%,13%)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,skyY);

     /* Lueur de ville à l'horizon */
     const glow=ctx.createLinearGradient(0,skyY-H*0.08,0,skyY);
     glow.addColorStop(0,'rgba(0,0,0,0)');
     glow.addColorStop(0.6,`rgba(20,35,65,${0.18+Math.sin(t*0.12)*0.04})`);
     glow.addColorStop(1,`rgba(30,50,90,${0.28+Math.sin(t*0.10)*0.05})`);
     ctx.fillStyle=glow;ctx.fillRect(0,skyY-H*0.08,W,H*0.08);

     /* ── Immeubles ── */
     for(let bi=0;bi<buildings.length;bi++){
      const b=buildings[bi];
      const wd=windowData[bi];
      const bTop=skyY-b.h;
      /* Corps de l'immeuble */
      ctx.fillStyle=b.col;
      ctx.fillRect(b.x,bTop,b.w,b.h);
      /* Fenêtres */
      const wx=b.w/(wd.cols+1);
      const wy=b.h/(wd.rows+1);
      const winW=wx*0.55, winH=wy*0.42;
      for(const win of wd.wins){
       let alpha=win.on?1.0:0.0;
       if(win.flicker) alpha=0.5+0.5*Math.abs(Math.sin(t*2.2+win.phase));
       if(alpha<0.05)continue;
       const wx2=b.x+(win.c+1)*wx-winW*0.5;
       const wy2=bTop+(win.r+1)*wy-winH*0.5;
       /* Couleur fenêtre : warm yellow ou blanc bleuté */
       const wc=win.c%3===0?`rgba(255,230,160,${alpha*0.72})`:`rgba(230,235,255,${alpha*0.58})`;
       ctx.fillStyle=wc;
       ctx.fillRect(wx2,wy2,winW,winH);
      }
      /* Bord supérieur légèrement plus clair */
      ctx.fillStyle=`rgba(40,65,100,0.20)`;
      ctx.fillRect(b.x,bTop,b.w,H*0.004);
     }

     /* ── Route ── */
     const road=ctx.createLinearGradient(0,skyY,0,H);
     road.addColorStop(0,'#070e18');
     road.addColorStop(0.25,'#080f1a');
     road.addColorStop(1,'#050c14');
     ctx.fillStyle=road;ctx.fillRect(0,skyY,W,H-skyY);

     /* Ligne de trottoir */
     ctx.fillStyle='rgba(25,40,70,0.80)';
     ctx.fillRect(0,skyY,W,H*0.008);

     /* Ligne centrale route — pointillés */
     ctx.strokeStyle='rgba(255,210,80,0.22)';
     ctx.lineWidth=H*0.003;
     ctx.setLineDash([W*0.06,W*0.04]);
     ctx.beginPath();ctx.moveTo(0,roadY);ctx.lineTo(W,roadY);ctx.stroke();
     ctx.setLineDash([]);

     /* ── Reflets sur la route ── */
     for(const rf of reflections){
      ctx.fillStyle=`rgba(${rf.col},${rf.op})`;
      ctx.beginPath();ctx.ellipse(rf.x,H*0.85,rf.w,H*0.006,0,0,Math.PI*2);ctx.fill();
     }

     /* ── Bokeh — reflets de lumières floues ── */
     for(const bk of bokeh){
      bk.ph+=bk.spd;
      const ba=bk.op*(0.5+0.5*Math.sin(bk.ph));
      const bg=ctx.createRadialGradient(bk.x,bk.y,0,bk.x,bk.y,bk.r);
      bg.addColorStop(0,`rgba(${bk.col},${ba})`);
      bg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg;ctx.beginPath();ctx.arc(bk.x,bk.y,bk.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Pluie fine ── */
     for(const r of rain){
      r.y+=r.vy;if(r.y>H){r.y=-r.len;r.x=Math.random()*W;}
      ctx.globalAlpha=r.op;
      ctx.strokeStyle='rgba(140,165,210,1)';
      ctx.lineWidth=0.5;
      ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+1,r.y+r.len);ctx.stroke();
     }
     ctx.globalAlpha=1;

     /* ── Taxi jaune — comme sur l'affiche ── */
     taxiX-=taxiSpd;
     if(taxiX<-W*0.32)taxiX=W*1.05;

     const tTop=taxiY-H*0.062;
     /* Carrosserie principale */
     const taxiGrad=ctx.createLinearGradient(taxiX-W*0.14,tTop,taxiX-W*0.14,taxiY);
     taxiGrad.addColorStop(0,'rgba(210,155,8,0.95)');
     taxiGrad.addColorStop(0.5,'rgba(195,140,5,0.97)');
     taxiGrad.addColorStop(1,'rgba(160,115,4,0.95)');
     ctx.fillStyle=taxiGrad;
     ctx.beginPath();ctx.roundRect(taxiX-W*0.145,taxiY-H*0.038,W*0.29,H*0.042,W*0.005);ctx.fill();

     /* Habitacle */
     const cabGrad=ctx.createLinearGradient(taxiX-W*0.09,tTop,taxiX-W*0.09,taxiY-H*0.038);
     cabGrad.addColorStop(0,'rgba(200,145,8,0.92)');
     cabGrad.addColorStop(1,'rgba(185,130,6,0.95)');
     ctx.fillStyle=cabGrad;
     ctx.beginPath();ctx.roundRect(taxiX-W*0.095,tTop,W*0.19,H*0.042,W*0.006);ctx.fill();

     /* Pare-brise + vitres */
     ctx.fillStyle='rgba(30,55,90,0.60)';
     ctx.beginPath();ctx.roundRect(taxiX-W*0.075,tTop+H*0.004,W*0.15,H*0.030,W*0.004);ctx.fill();
     /* Reflet vitre */
     ctx.fillStyle='rgba(100,150,200,0.12)';
     ctx.beginPath();ctx.roundRect(taxiX-W*0.072,tTop+H*0.006,W*0.06,H*0.014,W*0.003);ctx.fill();

     /* Signe TAXI sur le toit */
     ctx.fillStyle='rgba(240,240,255,0.88)';
     ctx.beginPath();ctx.roundRect(taxiX-W*0.025,tTop-H*0.018,W*0.05,H*0.016,W*0.004);ctx.fill();
     ctx.fillStyle='rgba(20,30,50,0.95)';
     ctx.font=`bold ${W*0.018}px sans-serif`;
     ctx.textAlign='center';
     ctx.fillText('TAXI',taxiX,tTop-H*0.007);

     /* Phares */
     const headX=taxiX-W*0.138;
     const lightG=ctx.createRadialGradient(headX,taxiY-H*0.014,0,headX,taxiY-H*0.014,W*0.06);
     lightG.addColorStop(0,'rgba(255,240,200,0.55)');
     lightG.addColorStop(0.4,'rgba(255,220,150,0.18)');
     lightG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lightG;ctx.fillRect(headX-W*0.06,taxiY-H*0.06,W*0.12,H*0.08);
     ctx.fillStyle='rgba(255,240,180,0.95)';
     ctx.beginPath();ctx.arc(headX,taxiY-H*0.014,W*0.007,0,Math.PI*2);ctx.fill();
     /* Feux arrière */
     const tailX=taxiX+W*0.138;
     ctx.fillStyle='rgba(200,40,20,0.85)';
     ctx.beginPath();ctx.arc(tailX,taxiY-H*0.014,W*0.006,0,Math.PI*2);ctx.fill();

     /* Roues */
     ctx.fillStyle='rgba(10,12,20,0.95)';
     ctx.beginPath();ctx.arc(taxiX-W*0.095,taxiY+H*0.004,W*0.022,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(taxiX+W*0.095,taxiY+H*0.004,W*0.022,0,Math.PI*2);ctx.fill();
     ctx.strokeStyle='rgba(60,60,80,0.60)';ctx.lineWidth=W*0.006;
     ctx.beginPath();ctx.arc(taxiX-W*0.095,taxiY+H*0.004,W*0.012,0,Math.PI*2);ctx.stroke();
     ctx.beginPath();ctx.arc(taxiX+W*0.095,taxiY+H*0.004,W*0.012,0,Math.PI*2);ctx.stroke();

     /* ── Grain DV digital — style Michael Mann ── */
     for(let i=0;i<120;i++){
      ctx.fillStyle=`rgba(60,90,140,${Math.random()*0.012})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.4,0.8);
     }

     /* ── Vignette douce ── */
     const vg=ctx.createRadialGradient(cx,H*0.60,H*0.12,cx,H*0.60,H*0.72);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(2,6,16,0.08)');
     vg.addColorStop(0.82,'rgba(2,6,16,0.32)');
     vg.addColorStop(1,'rgba(2,5,14,0.75)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
