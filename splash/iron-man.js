// CinéQuiz splash chunk — Iron Man
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Iron Man"]={
   name:'Iron Man',
   color:'30,180,220',
   ref:'Iron Man \u2014 Jon Favreau, 2008',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2,cy=H/2;

    /* ── CSS ── */
    let _imS=document.getElementById('_im_s');
    if(!_imS){_imS=document.createElement('style');_imS.id='_im_s';document.head.appendChild(_imS);}
    _imS.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-quote-text{color:rgba(100,220,255,0.92)!important;text-shadow:0 0 12px rgba(0,180,255,0.8)!important;}#splash-film-logo{filter:drop-shadow(0 0 10px rgba(0,200,255,0.7))!important;}';
    const _imW=setInterval(()=>{if(stop.v){_imS.textContent='';clearInterval(_imW);}},200);

    /* ── Hexagones de fond ── */
    const HEX_SIZE=W*0.055;
    const hexGrid=[];
    const hxStep=HEX_SIZE*1.732, hyStep=HEX_SIZE*1.5;
    for(let row=-1;row<Math.ceil(H/hyStep)+1;row++){
      for(let col=-1;col<Math.ceil(W/hxStep)+1;col++){
        const ox=row%2===0?0:hxStep*0.5;
        hexGrid.push({
          x:col*hxStep+ox, y:row*hyStep,
          ph:Math.random()*Math.PI*2,
          spd:0.008+Math.random()*0.012,
          bright:0.04+Math.random()*0.08,
        });
      }
    }

    function drawHex(x,y,size,alpha){
      ctx.beginPath();
      for(let i=0;i<6;i++){
        const a=Math.PI/3*i-Math.PI/6;
        const px=x+size*Math.cos(a), py=y+size*Math.sin(a);
        i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
      }
      ctx.closePath();
      ctx.strokeStyle=`rgba(0,180,255,${alpha})`;
      ctx.lineWidth=0.8;
      ctx.stroke();
    }

    /* ── Réacteur arc (cercles concentriques) ── */
    const REACTOR_Y=H*0.64;
    const rings=[
      {r:W*0.220, spd: 0.008, dash:[12,8],  alpha:0.55, w:1.5},
      {r:W*0.175, spd:-0.012, dash:[6,10],  alpha:0.65, w:1.2},
      {r:W*0.130, spd: 0.018, dash:[20,6],  alpha:0.70, w:1.8},
      {r:W*0.090, spd:-0.025, dash:[4,4],   alpha:0.75, w:1.5},
      {r:W*0.055, spd: 0.035, dash:[8,3],   alpha:0.85, w:2.0},
    ];

    /* ── Données HUD qui défilent ── */
    const hudLines=[
      'STARK INDUSTRIES v4.1','POWER: ARC REACTOR',
      'ALTITUDE: 3842 m','SPEED: 1840 km/h',
      'TARGET LOCK: ON','THREAT LEVEL: LOW',
      'SYSTEM INTEGRITY: 98%','WEAPONS: ONLINE',
      'JARVIS: READY','SUIT UP SEQUENCE: OK',
    ];
    let hudScroll=0;
    /* Colonne gauche : sous la citation, avant le réacteur */
    /* Colonne droite : bas de l'écran, après le réacteur */

    /* ── Particules orbitales ── */
    const orbitParts=Array.from({length:28},(_,i)=>({
      angle:i/28*Math.PI*2,
      radius:W*(0.14+Math.random()*0.10),
      spd:(Math.random()-0.5)*0.025+0.018,
      size:Math.random()*2+0.8,
      op:0.4+Math.random()*0.5,
    }));

    /* ── Scan lines ── */
    const scanLines=Array.from({length:6},(_,i)=>({
      y:H*i/6, spd:H*0.003+Math.random()*H*0.002, op:0.04+Math.random()*0.04
    }));

    function frame(){
      if(stop.v)return;

      /* ── Fond noir bleu nuit ── */
      ctx.fillStyle='rgba(2,8,18,0.22)';ctx.fillRect(0,0,W,H);

      /* ── Grille hexagonale ── */
      for(const h of hexGrid){
        h.ph+=h.spd;
        const a=h.bright*(0.5+0.5*Math.sin(h.ph));
        drawHex(h.x,h.y,HEX_SIZE,a);
      }

      /* ── Scan lines horizontales ── */
      for(const sl of scanLines){
        sl.y+=sl.spd;
        if(sl.y>H)sl.y=-4;
        ctx.fillStyle=`rgba(0,200,255,${sl.op})`;
        ctx.fillRect(0,sl.y,W,1.5);
      }

      /* ── Données HUD gauche et droite ── */
      hudScroll+=0.025;
      ctx.font=`${Math.floor(H*0.013)}px "Courier New",monospace`;
      ctx.textBaseline='top';

      /* Colonne gauche — entre la citation et le réacteur */
      ctx.textAlign='left';
      for(let li=0;li<4;li++){
        const idx=(Math.floor(hudScroll)+li)%hudLines.length;
        const fadeAlpha=0.18+0.22*Math.abs(Math.sin(t*0.5+li*0.7));
        ctx.fillStyle=`rgba(0,200,255,${fadeAlpha})`;
        ctx.fillText(hudLines[idx], W*0.05, H*0.40+li*H*0.030);
      }

      /* Colonne droite — entre la citation et le réacteur, alignée à droite */
      ctx.textAlign='right';
      for(let li=0;li<4;li++){
        const idx=(Math.floor(hudScroll)+li+5)%hudLines.length;
        const fadeAlpha=0.18+0.22*Math.abs(Math.sin(t*0.5+li*0.6+1.2));
        ctx.fillStyle=`rgba(0,200,255,${fadeAlpha})`;
        ctx.fillText(hudLines[idx], W*0.95, H*0.40+li*H*0.030);
      }

      /* ── Réacteur arc ── */
      /* Lueur centrale */
      const coreG=ctx.createRadialGradient(cx,REACTOR_Y,0,cx,REACTOR_Y,W*0.25);
      const corePulse=0.5+0.5*Math.sin(t*2.2);
      coreG.addColorStop(0,`rgba(180,240,255,${0.22+corePulse*0.12})`);
      coreG.addColorStop(0.25,`rgba(0,180,255,${0.14+corePulse*0.08})`);
      coreG.addColorStop(0.6,`rgba(0,80,180,${0.06+corePulse*0.04})`);
      coreG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=coreG;ctx.fillRect(0,REACTOR_Y-W*0.25,W,W*0.50);

      /* Anneaux rotatifs */
      for(const ring of rings){
        ctx.save();
        ctx.translate(cx,REACTOR_Y);
        ctx.rotate(t*ring.spd*30);
        ctx.setLineDash(ring.dash);
        ctx.strokeStyle=`rgba(0,200,255,${ring.alpha*(0.7+0.3*Math.sin(t*1.8))})`;
        ctx.lineWidth=ring.w;
        ctx.shadowColor='rgba(0,180,255,0.6)';
        ctx.shadowBlur=8;
        ctx.beginPath();ctx.arc(0,0,ring.r,0,Math.PI*2);ctx.stroke();
        ctx.restore();
      }
      ctx.setLineDash([]);

      /* Cœur du réacteur */
      const innerG=ctx.createRadialGradient(cx,REACTOR_Y,0,cx,REACTOR_Y,W*0.038);
      innerG.addColorStop(0,`rgba(255,255,255,${0.85+corePulse*0.15})`);
      innerG.addColorStop(0.4,`rgba(140,220,255,${0.70+corePulse*0.20})`);
      innerG.addColorStop(1,'rgba(0,120,220,0)');
      ctx.fillStyle=innerG;
      ctx.beginPath();ctx.arc(cx,REACTOR_Y,W*0.038,0,Math.PI*2);ctx.fill();

      /* Triangle intérieur tournant */
      ctx.save();
      ctx.translate(cx,REACTOR_Y);ctx.rotate(t*0.8);
      ctx.strokeStyle=`rgba(200,240,255,${0.55+corePulse*0.25})`;
      ctx.lineWidth=1.5;ctx.shadowColor='rgba(0,200,255,0.8)';ctx.shadowBlur=10;
      ctx.beginPath();
      for(let i=0;i<3;i++){
        const a=i/3*Math.PI*2;
        const r=W*0.028;
        i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
      }
      ctx.closePath();ctx.stroke();
      ctx.restore();

      /* ── Particules orbitales ── */
      for(const p of orbitParts){
        p.angle+=p.spd;
        const px=cx+Math.cos(p.angle)*p.radius;
        const py=REACTOR_Y+Math.sin(p.angle)*p.radius*0.35;
        const pg=ctx.createRadialGradient(px,py,0,px,py,p.size*2);
        pg.addColorStop(0,`rgba(100,220,255,${p.op})`);
        pg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=pg;
        ctx.beginPath();ctx.arc(px,py,p.size*2,0,Math.PI*2);ctx.fill();
      }

      /* ── Cadres HUD coins ── */
      const cw=W*0.12, ch=H*0.06, cs=W*0.022;
      const corners=[[0,0],[W-cw,0],[0,H-ch],[W-cw,H-ch]];
      ctx.strokeStyle='rgba(0,180,255,0.45)';ctx.lineWidth=1.2;
      for(const [bx,by] of corners){
        ctx.beginPath();
        ctx.moveTo(bx,by+ch);ctx.lineTo(bx,by);ctx.lineTo(bx+cw,by);ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bx+cw-cs,by);ctx.lineTo(bx+cw,by);ctx.lineTo(bx+cw,by+cs);ctx.stroke();
      }

      /* ── Vignette ── */
      const vg=ctx.createRadialGradient(cx,cy,H*0.20,cx,cy,H*0.75);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(1,'rgba(0,5,20,0.80)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
