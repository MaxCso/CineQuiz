// CinéQuiz splash chunk — Taxi Driver
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Taxi Driver"]={
   name:'Taxi Driver',
   color:'80,20,120',
   ref:'Taxi Driver \u2014 Martin Scorsese, 1976',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';

    /* ── Orbes complètement supprimées ── */
    let _tdStyle=document.getElementById('_td_splash_style');
    if(!_tdStyle){_tdStyle=document.createElement('style');_tdStyle.id='_td_splash_style';document.head.appendChild(_tdStyle);}
    _tdStyle.textContent=`

      
      
    `;
    const _tdWatch=setInterval(()=>{if(stop.v){_tdStyle.textContent='';clearInterval(_tdWatch);}},200);

    let t=0;
    const cx=W/2;

    /* ── Zones de la scène ── */
    const horizonY = H*0.38;  /* bas des bâtiments */
    const sidewalkY= H*0.60;  /* haut du trottoir */
    const roadY    = H*0.72;  /* haut de la route */
    const taxiBaseY= roadY + H*0.010;

    /* ── Bâtiments ── */
    const buildings=[
     {x:0,       w:W*0.22, h:H*0.48, floors:9,  cols:3},
     {x:W*0.20,  w:W*0.14, h:H*0.36, floors:7,  cols:2},
     {x:W*0.33,  w:W*0.10, h:H*0.52, floors:10, cols:2},
     {x:W*0.42,  w:W*0.20, h:H*0.42, floors:8,  cols:3},
     {x:W*0.61,  w:W*0.12, h:H*0.58, floors:11, cols:2},
     {x:W*0.72,  w:W*0.16, h:H*0.38, floors:7,  cols:2},
     {x:W*0.87,  w:W*0.15, h:H*0.46, floors:9,  cols:2},
    ];
    const winStates=buildings.map(b=>Array.from({length:b.floors*b.cols},()=>Math.random()<0.55));
    const _winInt=setInterval(()=>{
     buildings.forEach((b,bi)=>{
      const n=b.floors*b.cols;
      for(let i=0;i<n;i++){if(Math.random()<0.03)winStates[bi][i]=!winStates[bi][i];}
     });
    },1100);
    /* Nettoyer l'interval quand l'effet s'arrête */
    const _tdWinWatch=setInterval(()=>{if(stop.v){clearInterval(_winInt);clearInterval(_tdWinWatch);}},200);

    /* ── Enseignes néon ── */
    const signs=[
     {x:W*0.13, y:horizonY-H*0.09, color:[220,30,30],  flicker:2.1, label:'HOTEL'},
     {x:W*0.75, y:horizonY-H*0.07, color:[220,170,0],  flicker:3.4, label:'BAR'},
     {x:W*0.46, y:horizonY-H*0.05, color:[200,40,20],  flicker:1.7, label:'OPEN 24H'},
    ];

    /* ── Passants sur le trottoir ── */
    const pedestrians=Array.from({length:5},(_,i)=>({
     x: i%2===0 ? W*(0.15+i*0.18) : W*(0.70-i*0.10),
     vx: i%2===0 ? 0.28+Math.random()*0.20 : -(0.28+Math.random()*0.20),
     h: H*(0.062+Math.random()*0.022), /* hauteur silhouette */
     phase: Math.random()*Math.PI*2,   /* phase marche */
    }));

    /* ── Vapeur bouches d'égout — sur la route ── */
    const steams=Array.from({length:5},(_,i)=>({
     x:W*(0.12+i*0.19),
     y:roadY,
     particles:Array.from({length:8},()=>({
      ox:(Math.random()-0.5)*14, oy:0,
      vx:(Math.random()-0.5)*0.30, vy:-(Math.random()*0.8+0.3),
      life:Math.random(), r:Math.random()*9+4,
     })),
    }));

    /* ── Taxi ── */
    let taxiX=-160;
    const taxiSpeed=1.4;

    /* ── Dessine le taxi ── */
    function drawTaxi(x,y){
     ctx.save();ctx.translate(x,y);
     const s=0.82;ctx.scale(s,s);
     /* Carrosserie */
     ctx.fillStyle='#f5c518';
     ctx.beginPath();ctx.roundRect(0,0,140,32,4);ctx.fill();
     /* Toit */
     ctx.fillStyle='#e8b500';
     ctx.beginPath();ctx.roundRect(18,-20,80,22,3);ctx.fill();
     /* Vitres */
     ctx.fillStyle='rgba(150,220,255,0.35)';
     ctx.beginPath();ctx.roundRect(22,-18,32,18,2);ctx.fill();
     ctx.beginPath();ctx.roundRect(60,-18,30,18,2);ctx.fill();
     /* Hayon */
     ctx.fillStyle='rgba(100,160,220,0.30)';
     ctx.beginPath();ctx.roundRect(100,4,32,16,2);ctx.fill();
     /* Halo phares */
     const headGlow=ctx.createRadialGradient(144,14,0,144,14,42);
     headGlow.addColorStop(0,'rgba(255,255,180,0.55)');headGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=headGlow;ctx.fillRect(110,-14,90,55);
     /* Feux */
     ctx.fillStyle='rgba(255,255,220,0.95)';
     ctx.beginPath();ctx.roundRect(136,8,8,8,2);ctx.fill();
     ctx.fillStyle='rgba(200,0,0,0.80)';
     ctx.beginPath();ctx.roundRect(-4,8,6,8,1);ctx.fill();
     /* Roues */
     ctx.fillStyle='#222';
     ctx.beginPath();ctx.arc(22,34,10,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(110,34,10,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='#888';
     ctx.beginPath();ctx.arc(22,34,4,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(110,34,4,0,Math.PI*2);ctx.fill();
     /* Reflet sous le taxi */
     const rg=ctx.createLinearGradient(0,44,0,80);
     rg.addColorStop(0,'rgba(245,197,24,0.18)');rg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg;ctx.beginPath();ctx.ellipse(70,54,72,18,0,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    /* ── Dessine un passant silhouette ── */
    function drawPedestrian(px,py,ph,walkPhase,facingRight){
     ctx.save();ctx.translate(px,py);
     if(!facingRight)ctx.scale(-1,1);
     const s=ph;
     /* Oscillation marche */
     const swing=Math.sin(walkPhase)*0.18;
     ctx.fillStyle='rgba(8,5,12,0.95)';
     /* Jambe gauche */
     ctx.save();ctx.translate(-s*0.12,0);ctx.rotate(swing);
     ctx.beginPath();ctx.roundRect(-s*0.08,0,s*0.16,s*0.48,2);ctx.fill();
     ctx.restore();
     /* Jambe droite */
     ctx.save();ctx.translate(s*0.12,0);ctx.rotate(-swing);
     ctx.beginPath();ctx.roundRect(-s*0.08,0,s*0.16,s*0.48,2);ctx.fill();
     ctx.restore();
     /* Corps */
     ctx.beginPath();ctx.roundRect(-s*0.22,-s*0.72,s*0.44,s*0.74,3);ctx.fill();
     /* Bras gauche */
     ctx.save();ctx.translate(-s*0.24,-s*0.55);ctx.rotate(-swing*0.8);
     ctx.beginPath();ctx.roundRect(-s*0.07,0,s*0.14,s*0.38,2);ctx.fill();
     ctx.restore();
     /* Bras droit */
     ctx.save();ctx.translate(s*0.24,-s*0.55);ctx.rotate(swing*0.8);
     ctx.beginPath();ctx.roundRect(-s*0.07,0,s*0.14,s*0.38,2);ctx.fill();
     ctx.restore();
     /* Tête */
     ctx.beginPath();ctx.arc(0,-s*0.88,s*0.22,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    /* ── Dessine les bâtiments ── */
    function drawBuildings(){
     buildings.forEach((b,bi)=>{
      const bx=b.x,by=horizonY-b.h,bw=b.w,bh=b.h;
      const bg=ctx.createLinearGradient(bx,by,bx,horizonY);
      bg.addColorStop(0,'#0c0910');bg.addColorStop(1,'#070509');
      ctx.fillStyle=bg;ctx.fillRect(bx,by,bw,bh);
      ctx.strokeStyle='rgba(60,50,80,0.4)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx+bw,by);ctx.stroke();
      /* Fenêtres */
      const pw=bw/(b.cols+1)*0.52,ph2=bh/(b.floors+1)*0.42;
      const gx2=(bw-b.cols*pw)/(b.cols+1);
      const gy2=(bh-b.floors*ph2)/(b.floors+1);
      Array.from({length:b.floors}).forEach((_,fi)=>{
       Array.from({length:b.cols}).forEach((_,ci)=>{
        const idx=fi*b.cols+ci;
        const wx=bx+gx2+(pw+gx2)*ci;
        const wy=by+gy2+(ph2+gy2)*fi;
        if(winStates[bi][idx]){
         const wc=['rgba(255,220,140,','rgba(200,230,255,','rgba(255,200,100,'][Math.abs(bi*7+fi*3+ci)%3];
         ctx.fillStyle=wc+'0.80)';ctx.fillRect(wx,wy,pw,ph2);
         const hg=ctx.createRadialGradient(wx+pw/2,wy+ph2/2,0,wx+pw/2,wy+ph2/2,pw*2.5);
         hg.addColorStop(0,wc+'0.10)');hg.addColorStop(1,wc+'0)');
         ctx.fillStyle=hg;ctx.fillRect(wx-pw,wy-ph2,pw*3,ph2*3);
        } else {
         ctx.fillStyle='rgba(8,6,12,0.92)';ctx.fillRect(wx,wy,pw,ph2);
        }
       });
      });
     });
    }

    function frame(){
     if(stop.v)return;

     /* Fond noir */
     ctx.fillStyle='rgba(4,2,10,0.22)';ctx.fillRect(0,0,W,H);

     /* ── CIEL nocturne ── */
     const sky=ctx.createLinearGradient(0,0,0,horizonY);
     sky.addColorStop(0,'rgba(2,1,6,0.96)');sky.addColorStop(1,'rgba(10,4,18,0.90)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,horizonY);

     /* Halo ambiant orange bas (lumière de la ville) */
     const ag=ctx.createRadialGradient(cx,horizonY,10,cx,horizonY,W*0.75);
     ag.addColorStop(0,`rgba(180,${65+Math.sin(t*0.3)*10|0},8,0.09)`);ag.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=ag;ctx.fillRect(0,0,W,H*0.65);

     /* ── BÂTIMENTS ── */
     drawBuildings();

     /* Ligne base bâtiments */
     ctx.strokeStyle='rgba(40,28,55,0.7)';ctx.lineWidth=1;
     ctx.beginPath();ctx.moveTo(0,horizonY);ctx.lineTo(W,horizonY);ctx.stroke();

     /* ── ENSEIGNES NÉON ── */
     for(const s of signs){
      const fl=0.45+Math.sin(t*s.flicker)*0.55;
      const sg=ctx.createRadialGradient(s.x,s.y,3,s.x,s.y,58);
      sg.addColorStop(0,`rgba(${s.color},${0.55*fl})`);
      sg.addColorStop(0.5,`rgba(${s.color},${0.16*fl})`);
      sg.addColorStop(1,`rgba(${s.color},0)`);
      ctx.fillStyle=sg;ctx.fillRect(s.x-65,s.y-65,130,130);
      ctx.fillStyle=`rgba(${s.color},${0.92*fl})`;
      ctx.beginPath();ctx.arc(s.x,s.y,3,0,Math.PI*2);ctx.fill();
      ctx.save();ctx.globalAlpha=0.82*fl;
      ctx.fillStyle=`rgb(${s.color})`;
      ctx.font=`bold 11px 'Courier New',monospace`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.shadowColor=`rgb(${s.color})`;ctx.shadowBlur=10*fl;
      ctx.fillText(s.label,s.x,s.y+18);ctx.restore();
     }

     /* ── ZONE ENTRE BÂTIMENTS ET TROTTOIR (mur bas / devantures) ── */
     const facadeG=ctx.createLinearGradient(0,horizonY,0,sidewalkY);
     facadeG.addColorStop(0,'rgba(10,7,16,0.97)');
     facadeG.addColorStop(1,'rgba(16,11,24,0.99)');
     ctx.fillStyle=facadeG;ctx.fillRect(0,horizonY,W,sidewalkY-horizonY);

     /* Reflets néons sur façades basses */
     for(const s of signs){
      const fl=0.3+Math.sin(t*s.flicker)*0.3;
      const fg2=ctx.createRadialGradient(s.x,sidewalkY-H*0.04,2,s.x,sidewalkY-H*0.04,W*0.16);
      fg2.addColorStop(0,`rgba(${s.color},${0.12*fl})`);fg2.addColorStop(1,`rgba(${s.color},0)`);
      ctx.fillStyle=fg2;ctx.fillRect(0,horizonY,W,sidewalkY-horizonY);
     }

     /* ── TROTTOIR ── */
     const sidewalkG=ctx.createLinearGradient(0,sidewalkY,0,roadY);
     sidewalkG.addColorStop(0,'rgba(26,20,36,0.98)');
     sidewalkG.addColorStop(1,'rgba(18,14,26,0.99)');
     ctx.fillStyle=sidewalkG;ctx.fillRect(0,sidewalkY,W,roadY-sidewalkY);
     /* Bordure trottoir/route */
     ctx.strokeStyle='rgba(55,42,72,0.70)';ctx.lineWidth=1.5;
     ctx.beginPath();ctx.moveTo(0,sidewalkY);ctx.lineTo(W,sidewalkY);ctx.stroke();
     ctx.beginPath();ctx.moveTo(0,roadY);ctx.lineTo(W,roadY);ctx.stroke();
     /* Dalles trottoir */
     ctx.strokeStyle='rgba(32,24,44,0.45)';ctx.lineWidth=0.8;
     const dalleW=W/12;
     for(let dx=0;dx<W;dx+=dalleW){
      ctx.beginPath();ctx.moveTo(dx,sidewalkY);ctx.lineTo(dx,roadY);ctx.stroke();
     }

     /* ── PASSANTS sur le trottoir ── */
     for(const p of pedestrians){
      p.x+=p.vx;p.phase+=0.08;
      if(p.x>W+20)p.x=-20;
      if(p.x<-20)p.x=W+20;
      const facingRight=p.vx>0;
      /* Pied sur le trottoir : base = roadY (bord bas du trottoir) */
      const baseY=roadY-2;
      drawPedestrian(p.x,baseY,p.h,p.phase,facingRight);
      /* Reflet sous le passant */
      const pr=ctx.createRadialGradient(p.x,baseY,0,p.x,baseY,p.h*0.35);
      pr.addColorStop(0,'rgba(255,200,120,0.06)');pr.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pr;ctx.beginPath();ctx.ellipse(p.x,baseY+2,p.h*0.28,p.h*0.07,0,0,Math.PI*2);ctx.fill();
     }

     /* ── ROUTE (asphalte) ── */
     const streetG=ctx.createLinearGradient(0,roadY,0,H);
     streetG.addColorStop(0,'rgba(12,8,18,0.97)');streetG.addColorStop(1,'rgba(6,4,10,0.99)');
     ctx.fillStyle=streetG;ctx.fillRect(0,roadY,W,H-roadY);

     /* Tirets ligne centrale */
     ctx.setLineDash([W*0.06,W*0.04]);
     ctx.strokeStyle=`rgba(200,185,140,${0.14+Math.sin(t*0.5)*0.02})`;
     ctx.lineWidth=2;
     ctx.lineDashOffset=-(t*80)%(W*0.1);
     ctx.beginPath();ctx.moveTo(0,roadY+(H-roadY)*0.45);ctx.lineTo(W,roadY+(H-roadY)*0.45);ctx.stroke();
     ctx.setLineDash([]);ctx.lineDashOffset=0;

     /* Reflets néons sur asphalte mouillé */
     for(const s of signs){
      const fl=0.3+Math.sin(t*s.flicker)*0.3;
      const ry=roadY+H*0.04;
      const rg2=ctx.createRadialGradient(s.x,ry,2,s.x,ry,62);
      rg2.addColorStop(0,`rgba(${s.color},${0.20*fl})`);rg2.addColorStop(1,`rgba(${s.color},0)`);
      ctx.fillStyle=rg2;ctx.beginPath();ctx.ellipse(s.x,ry,55,10,0,0,Math.PI*2);ctx.fill();
     }

     /* ── VAPEUR bouches d'égout (sur la route) ── */
     for(const st of steams){
      for(const p of st.particles){
       p.ox+=p.vx;p.oy+=p.vy;p.life-=0.005;
       if(p.life<=0){
        p.ox=(Math.random()-0.5)*14;p.oy=0;
        p.vx=(Math.random()-0.5)*0.30;p.vy=-(Math.random()*0.8+0.3);
        p.life=0.6+Math.random()*0.4;p.r=Math.random()*9+4;
       }
       const op=p.life*0.09;
       const sg=ctx.createRadialGradient(st.x+p.ox,st.y+p.oy,0,st.x+p.ox,st.y+p.oy,p.r*(1.2-p.life*0.3));
       sg.addColorStop(0,`rgba(200,185,160,${op})`);sg.addColorStop(1,'rgba(200,185,160,0)');
       ctx.fillStyle=sg;ctx.beginPath();ctx.arc(st.x+p.ox,st.y+p.oy,p.r,0,Math.PI*2);ctx.fill();
      }
     }

     /* ── HALO PHARES taxi sur route ── */
     const hx=taxiX+115*0.82,hy=taxiBaseY+14*0.82;
     const hg=ctx.createRadialGradient(hx,hy,0,hx+30,hy+10,95);
     hg.addColorStop(0,'rgba(255,255,180,0.14)');hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.fillRect(hx-10,hy-20,145,55);

     /* ── TAXI ── */
     taxiX+=taxiSpeed;
     if(taxiX>W+180)taxiX=-180;
     ctx.globalAlpha=0.94;
     drawTaxi(taxiX,taxiBaseY);
     ctx.globalAlpha=1;

     /* ── VIGNETTE ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.10,cx,H*0.50,H*0.84);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.50,'rgba(0,0,0,0.12)');
     vg.addColorStop(1,'rgba(4,1,8,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     const vgL=ctx.createLinearGradient(0,0,W*0.12,0);
     vgL.addColorStop(0,'rgba(4,1,8,0.70)');vgL.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgL;ctx.fillRect(0,0,W*0.12,H);
     const vgR=ctx.createLinearGradient(W,0,W*0.88,0);
     vgR.addColorStop(0,'rgba(4,1,8,0.70)');vgR.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgR;ctx.fillRect(W*0.88,0,W*0.12,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
