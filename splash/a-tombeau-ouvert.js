// CinéQuiz splash chunk — À tombeau ouvert
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["À tombeau ouvert"]={
   name:'\u00c0 tombeau ouvert',
   color:'180,20,20',
   ref:'Bringing Out the Dead \u2014 Martin Scorsese, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_atbo_s');
    if(!_s){_s=document.createElement('style');_s.id='_atbo_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Ambulance ── */
    let amboX=W*1.2;const amboSpd=W*0.0022;
    let strobeRed=0,strobeBlue=0,strobeTimer=0;

    /* ── Bâtiments Hell's Kitchen — pré-calculés ── */
    const bldgs=Array.from({length:10},(_,i)=>{
     const bx=i*(W/9.2)-W*0.02;
     const bh=H*(0.24+Math.sin(i*1.7+0.5)*0.10+((i*73+31)%100)/100*0.14);
     const bw=W*(0.090+((i*41)%30)/100*0.040);
     /* Fenêtres pré-calculées */
     const wins=[];
     const cols=Math.max(2,Math.floor(bw/(W*0.025)));
     const rows=Math.max(3,Math.floor(bh/(H*0.070)));
     for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
      if((i*17+r*7+c*13)%10 < 4) wins.push({
       rx:0.10+c*(0.80/Math.max(cols-1,1)),
       ry:0.10+r*(0.75/Math.max(rows-1,1)),
       warm:((i+r+c)%3)!==0,
       on:((i*3+r*5+c*7)%10) < 5,
      });
     }
     return{bx,bh,bw,wins};
    });

    /* ── Néons clignotants ── */
    const neons=[
     {x:W*0.12,y:H*0.56,w:W*0.088,h:H*0.012,col:'255,20,80',ph:0.0,spd:0.038},
     {x:W*0.52,y:H*0.52,w:W*0.072,h:H*0.010,col:'0,180,255',ph:1.2,spd:0.052},
     {x:W*0.76,y:H*0.58,w:W*0.060,h:H*0.010,col:'255,160,0',ph:2.4,spd:0.028},
     {x:W*0.34,y:H*0.60,w:W*0.050,h:H*0.008,col:'180,0,255',ph:0.8,spd:0.045},
    ];

    /* ── Vapeur égout ── */
    const steams=Array.from({length:8},(_,i)=>({
     x:W*(0.08+i*0.12),y:H*(0.60+Math.random()*0.06),
     r:W*(0.018+Math.random()*0.018),
     vy:-(0.10+Math.random()*0.12),vx:(Math.random()-0.5)*0.06,
     op:0.06+Math.random()*0.07,
    }));

    /* ── Particules nuit ── */
    const dust=Array.from({length:35},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vx:(Math.random()-0.5)*0.22,vy:(Math.random()-0.5)*0.18,
     r:Math.random()*1.4+0.3,
     col:Math.random()<0.4?'255,40,120':Math.random()<0.6?'40,120,255':'255,120,0',
     op:0.06+Math.random()*0.14,ph:Math.random()*Math.PI*2,
    }));

    /* ── Sol mouillé — reflets pré-calculés ── */
    const groundRefl=[
     {x:W*0.18,op:0.22,col:'255,20,80'},
     {x:W*0.45,op:0.18,col:'0,160,255'},
     {x:W*0.72,op:0.20,col:'255,140,0'},
     {x:W*0.85,op:0.16,col:'200,0,255'},
    ];

    function drawAmbo(ax){
     const ay=H*0.625,aw=W*0.38,ah=H*0.090;
     const amboY=ay-ah;

     /* Reflet sol sous l'ambulance */
     const reflG=ctx.createLinearGradient(ax-aw*0.5,ay,ax+aw*0.5,ay);
     reflG.addColorStop(0,'rgba(200,200,195,0)');
     reflG.addColorStop(0.3,'rgba(200,200,195,0.08)');
     reflG.addColorStop(0.7,'rgba(200,200,195,0.08)');
     reflG.addColorStop(1,'rgba(200,200,195,0)');
     ctx.fillStyle=reflG;ctx.fillRect(ax-aw*0.5,ay,aw,H*0.022);

     /* Carrosserie blanche */
     ctx.fillStyle='rgba(228,226,222,0.96)';
     ctx.beginPath();ctx.roundRect(ax-aw/2,amboY,aw,ah,W*0.008);ctx.fill();
     /* Cabine avant */
     ctx.fillStyle='rgba(210,208,205,0.94)';
     ctx.beginPath();ctx.roundRect(ax+aw*0.05,amboY-ah*0.52,aw*0.42,ah*0.55,W*0.006);ctx.fill();
     /* Pare-brise */
     ctx.fillStyle='rgba(40,55,80,0.70)';
     ctx.beginPath();ctx.roundRect(ax+aw*0.08,amboY-ah*0.46,aw*0.36,ah*0.36,W*0.004);ctx.fill();
     /* Reflet pare-brise */
     ctx.fillStyle='rgba(180,200,230,0.18)';
     ctx.beginPath();ctx.roundRect(ax+aw*0.09,amboY-ah*0.44,aw*0.16,ah*0.14,W*0.003);ctx.fill();

     /* Bande orange latérale */
     ctx.fillStyle='rgba(255,120,0,0.92)';
     ctx.fillRect(ax-aw*0.50,amboY+ah*0.28,aw,ah*0.14);

     /* Croix rouge — sous la bande orange, centrée verticalement dans la partie basse */
     const crX=ax+aw*0.08,crY=amboY+ah*0.50;
     ctx.fillStyle=`rgba(220,15,15,${0.85+strobeRed*0.12})`;
     ctx.fillRect(crX-W*0.018,crY,W*0.036,H*0.040);
     ctx.fillRect(crX-W*0.036,crY+H*0.010,W*0.072,H*0.020);

     /* AMBULANCE texte — counter-flip pour rester lisible */
     ctx.save();
     ctx.translate(ax, 0);
     ctx.scale(-1, 1);
     ctx.translate(-ax, 0);
     ctx.fillStyle='rgba(220,15,15,0.80)';
     ctx.font=`bold ${W*0.028}px sans-serif`;
     ctx.textAlign='center';
     ctx.fillText('AMBULANCE',ax,amboY+ah*0.22);
     ctx.restore();

     /* Gyrophares — centrés sur le toit de la cabine */
     const roofCx=ax+aw*0.26; /* centre du toit cabine */
     ctx.fillStyle='rgba(30,30,30,0.95)';
     ctx.beginPath();ctx.roundRect(roofCx-W*0.052,amboY-ah*0.58,W*0.045,H*0.022,W*0.003);ctx.fill();
     ctx.beginPath();ctx.roundRect(roofCx+W*0.008,amboY-ah*0.58,W*0.045,H*0.022,W*0.003);ctx.fill();
     if(strobeRed>0.15){
      ctx.fillStyle=`rgba(255,30,0,${strobeRed*0.95})`;
      ctx.beginPath();ctx.roundRect(roofCx-W*0.052,amboY-ah*0.58,W*0.045,H*0.022,W*0.003);ctx.fill();
      const rg=ctx.createRadialGradient(roofCx-W*0.030,amboY-ah*0.56,0,roofCx-W*0.030,amboY-ah*0.56,W*0.22);
      rg.addColorStop(0,`rgba(255,15,0,${strobeRed*0.38})`);rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);
     }
     if(strobeBlue>0.15){
      ctx.fillStyle=`rgba(30,80,255,${strobeBlue*0.95})`;
      ctx.beginPath();ctx.roundRect(roofCx+W*0.008,amboY-ah*0.58,W*0.045,H*0.022,W*0.003);ctx.fill();
      const bg2=ctx.createRadialGradient(roofCx+W*0.030,amboY-ah*0.56,0,roofCx+W*0.030,amboY-ah*0.56,W*0.22);
      bg2.addColorStop(0,`rgba(0,60,255,${strobeBlue*0.38})`);bg2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg2;ctx.fillRect(0,0,W,H);
     }

     /* Phares avant */
     const phareX=ax+aw*0.44;
     const phG=ctx.createRadialGradient(phareX,ay-ah*0.30,0,phareX,ay-ah*0.30,W*0.30);
     phG.addColorStop(0,'rgba(240,240,200,0.22)');phG.addColorStop(0.3,'rgba(200,200,160,0.08)');phG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=phG;ctx.fillRect(0,0,W,H);
     ctx.fillStyle='rgba(240,240,180,0.95)';
     ctx.beginPath();ctx.arc(phareX,ay-ah*0.30,W*0.014,0,Math.PI*2);ctx.fill();

     /* Roues */
     ctx.fillStyle='rgba(12,10,14,0.98)';
     ctx.beginPath();ctx.arc(ax-aw*0.30,ay+H*0.014,W*0.038,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(ax+aw*0.28,ay+H*0.014,W*0.038,0,Math.PI*2);ctx.fill();
     /* Jantes */
     ctx.strokeStyle='rgba(120,120,120,0.55)';ctx.lineWidth=W*0.006;
     ctx.beginPath();ctx.arc(ax-aw*0.30,ay+H*0.014,W*0.020,0,Math.PI*2);ctx.stroke();
     ctx.beginPath();ctx.arc(ax+aw*0.28,ay+H*0.014,W*0.020,0,Math.PI*2);ctx.stroke();
    }

    function frame(){
     if(stop.v)return;
     amboX-=amboSpd;if(amboX<-W*0.6)amboX=W*1.3;
     strobeTimer++;
     if(strobeTimer%10===0)strobeRed=0.95;
     if(strobeTimer%10===5)strobeBlue=0.95;
     strobeRed*=0.80;strobeBlue*=0.80;

     /* ── FOND — nuit urbaine violet/indigo, plus clair ── */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#06020e');
     bg.addColorStop(0.30,'#0a0418');
     bg.addColorStop(0.60,'#0e0622');
     bg.addColorStop(0.85,'#0a0418');
     bg.addColorStop(1,'#06020e');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo rouge stroboscopique — sur tout l'écran */
     if(strobeRed>0.08){
      const srg=ctx.createRadialGradient(cx,H*0.40,0,cx,H*0.40,W*0.80);
      srg.addColorStop(0,`rgba(255,10,0,${strobeRed*0.18})`);
      srg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=srg;ctx.fillRect(0,0,W,H);
     }
     if(strobeBlue>0.08){
      const sbg=ctx.createRadialGradient(cx,H*0.40,0,cx,H*0.40,W*0.80);
      sbg.addColorStop(0,`rgba(0,50,255,${strobeBlue*0.18})`);
      sbg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sbg;ctx.fillRect(0,0,W,H);
     }

     /* ── Bâtiments ── */
     const groundY=H*0.64;
     for(const b of bldgs){
      ctx.fillStyle='rgba(14,8,22,0.98)';
      ctx.fillRect(b.bx,groundY-b.bh,b.bw,b.bh);
      /* Fenêtres */
      for(const w of b.wins){
       const wx=b.bx+w.rx*b.bw-W*0.010;
       const wy=groundY-b.bh+w.ry*b.bh-H*0.018;
       if(w.on){
        const wcol=w.warm?`rgba(255,${150+Math.random()*40|0},30,0.45)`:`rgba(150,200,255,0.30)`;
        ctx.fillStyle=wcol;ctx.fillRect(wx,wy,W*0.020,H*0.034);
        /* Petit halo fenêtre */
        const wg=ctx.createRadialGradient(wx+W*0.010,wy+H*0.017,0,wx+W*0.010,wy+H*0.017,W*0.028);
        wg.addColorStop(0,w.warm?'rgba(255,140,20,0.10)':'rgba(100,180,255,0.08)');
        wg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=wg;ctx.fillRect(wx-W*0.020,wy-H*0.020,W*0.060,H*0.060);
       } else {
        ctx.fillStyle='rgba(6,3,12,0.60)';ctx.fillRect(wx,wy,W*0.020,H*0.034);
       }
      }
     }

     /* ── Sol — asphalte mouillé ── */
     const groundG=ctx.createLinearGradient(0,groundY,0,H);
     groundG.addColorStop(0,'rgba(18,10,30,0.98)');
     groundG.addColorStop(0.35,'rgba(14,8,24,1)');
     groundG.addColorStop(1,'rgba(8,4,16,1)');
     ctx.fillStyle=groundG;ctx.fillRect(0,groundY,W,H-groundY);

     /* Reflets néons sur sol mouillé */
     for(const r of groundRefl){
      const pulse=0.5+0.5*Math.sin(t*2.0+r.x);
      const rg=ctx.createRadialGradient(r.x,groundY+H*0.025,0,r.x,groundY+H*0.025,W*0.12);
      rg.addColorStop(0,`rgba(${r.col},${r.op*pulse})`);rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;ctx.beginPath();ctx.ellipse(r.x,groundY+H*0.025,W*0.12,H*0.018,0,0,Math.PI*2);ctx.fill();
     }
     /* Stroboscope sur sol */
     if(strobeRed>0.1){
      ctx.fillStyle=`rgba(255,10,0,${strobeRed*0.12})`;ctx.fillRect(0,groundY,W,H-groundY);
     }
     if(strobeBlue>0.1){
      ctx.fillStyle=`rgba(0,40,255,${strobeBlue*0.12})`;ctx.fillRect(0,groundY,W,H-groundY);
     }

     /* ── Néons ── */
     for(const n of neons){
      n.ph+=n.spd;
      const nop=0.55+0.45*Math.abs(Math.sin(n.ph));
      ctx.fillStyle=`rgba(${n.col},${nop*0.88})`;
      ctx.fillRect(n.x,n.y,n.w,n.h);
      const ng=ctx.createRadialGradient(n.x+n.w/2,n.y+n.h/2,0,n.x+n.w/2,n.y+n.h/2,n.w*0.75);
      ng.addColorStop(0,`rgba(${n.col},${nop*0.22})`);ng.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ng;ctx.fillRect(n.x-n.w*0.5,n.y-n.h*3,n.w*2,n.h*8);
     }

     /* ── Vapeur ── */
     for(const s of steams){
      s.y+=s.vy;s.x+=s.vx;s.r+=0.16;s.op-=0.0012;
      if(s.y<H*0.25||s.op<=0){s.y=H*(0.58+Math.random()*0.06);s.r=W*(0.015+Math.random()*0.015);s.op=0.05+Math.random()*0.06;s.x=W*(0.06+Math.floor(Math.random()*8)*0.115);}
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(180,155,220,${s.op})`);sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Particules de nuit ── */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.ph+=0.020;
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;if(d.y<0)d.y=H;if(d.y>H)d.y=0;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${d.col},${d.op*(0.35+0.65*Math.abs(Math.sin(d.ph)))})`;ctx.fill();
     }

     /* ── Ambulance ── */
     ctx.save();
     ctx.translate(amboX, 0);
     ctx.scale(-1, 1);
     ctx.translate(-amboX, 0);
     drawAmbo(amboX);
     ctx.restore();

     /* ── Vignette ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(0,0,0,0.10)');
     vg.addColorStop(0.72,'rgba(0,0,0,0.48)');
     vg.addColorStop(1,'rgba(0,0,0,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
