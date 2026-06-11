// CinéQuiz splash chunk — Avatar
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Avatar"]={
   name:'Avatar',
   color:'0,200,180',
   ref:'Avatar \u2014 James Cameron, 2009',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.82';
    let t=0;
    const cx=W/2;

    // ── Woodspirits (méduses sacrées des Na'vi) ──
    const woodspirits=Array.from({length:6},(_,i)=>({
     x:W*(0.12+i*0.16+Math.random()*0.08),
     y:H*(0.25+Math.random()*0.55),
     vx:(Math.random()-0.5)*0.18,
     vy:(Math.random()-0.5)*0.12,
     phase:Math.random()*Math.PI*2,
     phaseSpd:Math.random()*0.008+0.004,
     r:Math.random()*14+10,
     nRings:Math.floor(Math.random()*2)+3,
     nTentacles:Math.floor(Math.random()*4)+6,
     tentLengths:Array.from({length:12},()=>Math.random()*28+12),
     tentPhases:Array.from({length:12},()=>Math.random()*Math.PI*2),
     hue:175+Math.random()*30,
     brightness:Math.random()*0.3+0.55
    }));

    // ── Spores flottantes ──
    const spores=Array.from({length:28},()=>({
     x:Math.random()*W,
     y:H*0.1+Math.random()*H*0.85,
     vx:(Math.random()-0.5)*0.12,
     vy:-(Math.random()*0.18+0.04),
     r:Math.random()*1.8+0.3,
     hue:160+Math.random()*50,
     op:Math.random()*0.35+0.10,
     phase:Math.random()*Math.PI*2
    }));

    // ── Lianes tombantes ──
    const vines=Array.from({length:18},()=>({
     x:Math.random()*W,
     topY:-Math.random()*H*0.3,
     segs:Math.floor(Math.random()*5)+4,
     hue:140+Math.random()*40,
     op:Math.random()*0.28+0.08,
     sway:Math.random()*Math.PI*2,
     swaySpd:Math.random()*0.012+0.005,
     dots:Array.from({length:Math.floor(Math.random()*4)+2},()=>({pos:Math.random(),phase:Math.random()*Math.PI*2}))
    }));

    // ── Troncs bioluminescents ──
    const trunks=[
     {x:0,      w:W*0.10, h:H*0.75, hue:140, side:'l'},
     {x:W*0.06, w:W*0.07, h:H*0.55, hue:160, side:'l'},
     {x:W*0.14, w:W*0.05, h:H*0.40, hue:150, side:'l'},
     {x:W*0.88, w:W*0.12, h:H*0.70, hue:145, side:'r'},
     {x:W*0.93, w:W*0.07, h:H*0.50, hue:165, side:'r'},
     {x:W*0.78, w:W*0.05, h:H*0.35, hue:155, side:'r'},
    ];

    // ── Fougères / végétation basse ──
    const ferns=Array.from({length:22},()=>({
     x:Math.random()*W,
     baseY:H*0.72+Math.random()*H*0.28,
     arms:Math.floor(Math.random()*4)+3,
     len:Math.random()*38+18,
     hue:140+Math.random()*40,
     op:Math.random()*0.40+0.12,
     phase:Math.random()*Math.PI*2,
     spd:Math.random()*0.008+0.003
    }));

    // ── Racines au sol ──
    const roots=Array.from({length:12},()=>({
     x:Math.random()<0.5?Math.random()*W*0.25:W*0.75+Math.random()*W*0.25,
     y:H*0.80+Math.random()*H*0.20,
     len:Math.random()*80+40,
     angle:Math.random()*0.8+0.1,
     hue:150+Math.random()*30,
     op:Math.random()*0.22+0.06
    }));

    // ── Lueurs de fond (profondeur) ──
    const glows=[
     {x:W*0.15,y:H*0.60,r:W*0.18,hue:155,op:0.06},
     {x:W*0.85,y:H*0.55,r:W*0.16,hue:165,op:0.05},
     {x:W*0.50,y:H*0.80,r:W*0.22,hue:145,op:0.04},
     {x:W*0.30,y:H*0.40,r:W*0.12,hue:170,op:0.04},
     {x:W*0.70,y:H*0.35,r:W*0.10,hue:160,op:0.035},
    ];

    function drawForestBg(){
     // Lueurs profondes
     for(const g of glows){
      const pulse=0.7+Math.sin(t*0.4+g.hue)*0.3;
      const gg=ctx.createRadialGradient(g.x,g.y,0,g.x,g.y,g.r);
      gg.addColorStop(0,`hsla(${g.hue},85%,55%,${g.op*pulse})`);
      gg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=gg;ctx.fillRect(0,0,W,H);
     }
    }

    function drawTrunks(){
     for(const tr of trunks){
      const pulse=0.7+Math.sin(t*0.3+tr.hue*0.05)*0.3;
      // Corps sombre du tronc
      ctx.fillStyle='rgba(0,8,4,0.92)';
      ctx.fillRect(tr.x,H-tr.h,tr.w,tr.h);
      // Arrondi haut
      ctx.beginPath();ctx.arc(tr.x+tr.w/2,H-tr.h,tr.w*0.5,Math.PI,0);ctx.fill();

      // Veinures bioluminescentes sur le bord intérieur
      const edge=tr.side==='l'?tr.x+tr.w:tr.x;
      const edgeGrad=ctx.createLinearGradient(edge-(tr.side==='l'?tr.w:0),0,edge+(tr.side==='l'?0:tr.w),0);
      edgeGrad.addColorStop(0,'rgba(0,0,0,0)');
      edgeGrad.addColorStop(tr.side==='l'?0.7:0.3,`hsla(${tr.hue},90%,55%,${0.18*pulse})`);
      edgeGrad.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=edgeGrad;
      ctx.fillRect(tr.x,H-tr.h,tr.w,tr.h);

      // Points lumineux sur l'écorce
      const nDots=Math.floor(tr.h/30);
      for(let i=0;i<nDots;i++){
       const dy=H-tr.h+i*(tr.h/nDots)+Math.sin(t*0.5+i)*4;
       const dx=tr.x+(tr.side==='l'?tr.w*0.7:tr.w*0.3);
       const dp=0.5+Math.sin(t*1.2+i*0.8)*0.5;
       ctx.beginPath();ctx.arc(dx,dy,1.2,0,Math.PI*2);
       ctx.fillStyle=`hsla(${tr.hue+10},95%,75%,${dp*0.5*pulse})`;ctx.fill();
      }
     }
    }

    function drawVines(){
     for(const v of vines){
      v.sway+=v.swaySpd;
      const segH=(H-v.topY)/v.segs;
      ctx.beginPath();
      ctx.moveTo(v.x,v.topY);
      let px=v.x,py=v.topY;
      for(let s=0;s<v.segs;s++){
       const sw=Math.sin(v.sway+s*0.7)*8;
       const nx=v.x+sw,ny=v.topY+(s+1)*segH;
       ctx.bezierCurveTo(px+sw*0.5,py+segH*0.3,nx-sw*0.5,ny-segH*0.3,nx,ny);
       px=nx;py=ny;
      }
      ctx.strokeStyle=`hsla(${v.hue},70%,40%,${v.op})`;
      ctx.lineWidth=1.2;ctx.lineCap='round';ctx.stroke();

      // Points lumineux sur la liane
      for(const d of v.dots){
       d.phase+=0.02;
       const dotY=v.topY+d.pos*(H-v.topY);
       const dotX=v.x+Math.sin(v.sway+d.pos*3)*8;
       const dp=0.5+Math.sin(d.phase)*0.5;
       ctx.beginPath();ctx.arc(dotX,dotY,1.5,0,Math.PI*2);
       ctx.fillStyle=`hsla(${v.hue+20},90%,72%,${dp*v.op*2.5})`;ctx.fill();
      }
     }
    }

    function drawFerns(){
     for(const f of ferns){
      f.phase+=f.spd;
      const sway=Math.sin(f.phase)*3;
      for(let i=0;i<f.arms;i++){
       const baseAngle=-Math.PI/2+(i-(f.arms-1)/2)*0.35;
       const angle=baseAngle+sway*0.04;
       ctx.beginPath();
       ctx.moveTo(f.x,f.baseY);
       const ex=f.x+Math.cos(angle)*f.len+sway;
       const ey=f.baseY+Math.sin(angle)*f.len;
       const cpx=f.x+Math.cos(angle-0.3)*f.len*0.5;
       const cpy=f.baseY+Math.sin(angle-0.3)*f.len*0.5;
       ctx.bezierCurveTo(cpx,cpy,ex-5,ey+5,ex,ey);
       ctx.strokeStyle=`hsla(${f.hue},75%,40%,${f.op})`;
       ctx.lineWidth=1.0;ctx.stroke();
       // Bout lumineux
       const bp=0.5+Math.sin(f.phase+i)*0.5;
       ctx.beginPath();ctx.arc(ex,ey,1.0,0,Math.PI*2);
       ctx.fillStyle=`hsla(${f.hue+15},90%,70%,${bp*f.op*1.8})`;ctx.fill();
      }
     }
    }

    function drawRoots(){
     for(const r of roots){
      ctx.beginPath();
      ctx.moveTo(r.x,r.y);
      const dir=r.x<W/2?1:-1;
      ctx.bezierCurveTo(
       r.x+dir*r.len*0.3,r.y-r.len*0.1,
       r.x+dir*r.len*0.7,r.y+r.len*0.05,
       r.x+dir*r.len,r.y+r.len*0.08
      );
      ctx.strokeStyle=`hsla(${r.hue},65%,35%,${r.op})`;
      ctx.lineWidth=1.5;ctx.stroke();
     }
    }

    // ── Dessin d'un Woodspirit ──
    function drawWoodspirit(ws){
     const {x,y,r,hue,brightness,nRings,nTentacles,tentLengths,tentPhases,phase} = ws;
     const pulse=0.85+Math.sin(phase*1.8)*0.15;
     const rp=r*pulse;
     const alpha=brightness*(0.75+Math.sin(phase*1.4)*0.20);

     ctx.save();ctx.translate(x,y);

     const halo=ctx.createRadialGradient(0,0,rp*0.5,0,0,rp*4.5);
     halo.addColorStop(0,`hsla(${hue},90%,70%,${alpha*0.18})`);
     halo.addColorStop(0.4,`hsla(${hue},85%,60%,${alpha*0.06})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.beginPath();ctx.arc(0,0,rp*4.5,0,Math.PI*2);ctx.fill();

     for(let i=0;i<nTentacles;i++){
      const a=(i/nTentacles)*Math.PI*2+phase*0.15;
      if(Math.cos(a)>0.6 || Math.cos(a)<-0.6) continue;
      const tLen=tentLengths[i%tentLengths.length];
      const tPhase=tentPhases[i%tentPhases.length];
      const sway=Math.sin(t*0.8+tPhase)*6;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a)*rp*0.85, Math.sin(a)*rp*0.85);
      const cx1=Math.cos(a)*rp*0.5+sway*0.3;
      const cy1=Math.sin(a)*rp*0.5+tLen*0.4;
      const ex=Math.cos(a)*2+sway;
      const ey=Math.sin(a)*rp*0.8+tLen;
      ctx.bezierCurveTo(cx1,cy1,cx1+sway*0.5,cy1+tLen*0.3,ex,ey);
      ctx.strokeStyle=`hsla(${hue+5},92%,72%,${alpha*0.55})`;
      ctx.lineWidth=0.9;ctx.lineCap='round';ctx.stroke();
      ctx.beginPath();ctx.arc(ex,ey,1.2,0,Math.PI*2);
      ctx.fillStyle=`hsla(${hue},95%,85%,${alpha*0.7})`;ctx.fill();
     }

     for(let ri=nRings;ri>=1;ri--){
      const rr=rp*(ri/nRings);
      const a=alpha*(0.3+ri/nRings*0.55);
      ctx.beginPath();ctx.arc(0,0,rr,Math.PI,0);
      ctx.strokeStyle=`hsla(${hue},88%,68%,${a})`;
      ctx.lineWidth=ri===nRings?1.8:0.9;ctx.stroke();
      if(ri===nRings){
       ctx.beginPath();ctx.ellipse(0,0,rr,rr*0.25,0,0,Math.PI*2);
       ctx.strokeStyle=`hsla(${hue},85%,65%,${a*0.7})`;
       ctx.lineWidth=0.7;ctx.stroke();
      }
     }

     const cg=ctx.createRadialGradient(0,-rp*0.2,0,0,-rp*0.1,rp*0.55);
     cg.addColorStop(0,`hsla(${hue+10},100%,90%,${alpha*0.55})`);
     cg.addColorStop(0.5,`hsla(${hue},90%,70%,${alpha*0.20})`);
     cg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,-rp*0.1,rp*0.55,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,3,6,0.15)';ctx.fillRect(0,0,W,H);

     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'rgba(0,4,12,0.12)');
     bg.addColorStop(0.6,'rgba(0,8,18,0.08)');
     bg.addColorStop(1,'rgba(0,12,8,0.06)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     drawForestBg();
     drawVines();
     drawRoots();
     drawTrunks();
     drawFerns();

     // Spores
     for(const s of spores){
      s.x+=s.vx;s.y+=s.vy;s.phase+=0.02;
      if(s.y<-8)s.y=H*0.9;
      const glow=0.55+Math.sin(s.phase*2.8)*0.45;
      if(glow<0.15)continue;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${s.hue},88%,75%,${s.op*glow})`;ctx.fill();
     }

     // Woodspirits
     for(const ws of woodspirits){
      ws.x+=ws.vx+Math.sin(t*0.18+ws.phase)*0.22;
      ws.y+=ws.vy+Math.sin(t*0.12+ws.phase*1.3)*0.14;
      ws.phase+=ws.phaseSpd;
      if(ws.x<ws.r*2)ws.vx=Math.abs(ws.vx);
      if(ws.x>W-ws.r*2)ws.vx=-Math.abs(ws.vx);
      if(ws.y<ws.r*2)ws.vy=Math.abs(ws.vy);
      if(ws.y>H-ws.r*4)ws.vy=-Math.abs(ws.vy);
      drawWoodspirit(ws);
     }

     // Vignette profonde
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.05,cx,H*0.5,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,'rgba(0,3,8,0.20)');
     vg.addColorStop(1,'rgba(0,2,5,0.85)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
