// CinéQuiz splash chunk — Il était une fois en Amérique
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Il était une fois en Amérique"]={
   name:'Il \u00e9tait une fois en Am\u00e9rique',
   color:'120,80,20',
   ref:'Il \u00e9tait une fois en Am\u00e9rique \u2014 Sergio Leone, 1984',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ia3_s');if(!_s){_s=document.createElement('style');_s.id='_ia3_s';document.head.appendChild(_s);}
    _s.textContent='#splash-bg::before{background:none!important;}#splash-bg::after{background:none!important;}#splash-bg-anim::before{background:none!important;}#splash-bg-anim::after{background:none!important;}#splash-content-wrap{top:64%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    const horizY=H*0.52;

    /* ── Pluie fine ── */
    const rain=Array.from({length:160},()=>({
     x:Math.random()*W*1.3-W*0.15, y:Math.random()*H,
     len:H*(0.018+Math.random()*0.016), spd:H*(0.014+Math.random()*0.008),
     op:0.06+Math.random()*0.10,
    }));

    /* ── Ondulations East River ── */
    const ripples=Array.from({length:22},(_,i)=>({
     x:W*(0.04+i*0.047), phase:Math.random()*Math.PI*2,
     amp:H*(0.003+Math.random()*0.004), freq:0.8+Math.random()*0.5,
    }));

    /* ── Lumières ville ── */
    const cityLights=Array.from({length:28},()=>({
     x:Math.random()*W, y:horizY-H*(0.05+Math.random()*0.22),
     r:Math.random()*2.5+0.8, warm:Math.random()<0.65,
     ph:Math.random()*Math.PI*2, op:0.25+Math.random()*0.45,
    }));

    /* ── Fumée urbaine ── */
    const smoke=Array.from({length:10},()=>({
     x:Math.random()*W, y:horizY-H*(0.12+Math.random()*0.28),
     r:W*(0.03+Math.random()*0.05), op:0.04+Math.random()*0.06,
     vx:(Math.random()-0.5)*0.08, vy:-(0.06+Math.random()*0.08),
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Étoiles ── */
    const stars=Array.from({length:55},()=>({
     x:Math.random()*W, y:Math.random()*horizY*0.7,
     r:Math.random()*1.1+0.3, op:0.20+Math.random()*0.40,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Brouillard sur l'East River — nappes horizontales ── */
    const fogBands=Array.from({length:8},(_,i)=>({
     y:horizY+H*(0.012+i*0.018),
     w:W*(0.55+Math.random()*0.70),
     x:Math.random()*W,
     vx:(Math.random()-0.5)*0.055,
     op:0.04+Math.random()*0.08,
     ph:Math.random()*Math.PI*2,
     spd:0.004+Math.random()*0.006,
    }));

    /* ── Fumée de cigarette — Noodles & Max ── */
    const cigSmoke=Array.from({length:18},(_,i)=>({
     /* 0-8 : Noodles (gauche), 9-17 : Max (droite) */
     side: i<9 ? 'L' : 'R',
     x:0, y:0,
     r:W*(0.008+Math.random()*0.012),
     vx:(Math.random()-0.5)*0.06+(i<9?-0.02:0.02),
     vy:-(0.08+Math.random()*0.12),
     op:0.35+Math.random()*0.30,
     ph:Math.random()*Math.PI*2,
     spd:0.010+Math.random()*0.012,
     life:Math.random(),
     maxLife:0.6+Math.random()*1.0,
    }));
    /* Braises de cigarette — petits points orangés */
    const cigEmbers=Array.from({length:4},(_,i)=>({
     side: i<2?'L':'R',
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Particules de poussière urbaine ── */
    const urbanDust=Array.from({length:35},()=>({
     x:Math.random()*W,
     y:H*(0.55+Math.random()*0.40),
     vx:(Math.random()-0.5)*0.12,
     vy:-(0.02+Math.random()*0.05),
     r:0.4+Math.random()*0.9,
     op:0.04+Math.random()*0.08,
     ph:Math.random()*Math.PI*2,
     spd:0.006+Math.random()*0.010,
    }));

    /* ── Étoiles filantes ── */
    const shootingStars=Array.from({length:3},()=>({
     x:-W*0.2, y:0, active:false,
     timer:Math.floor(80+Math.random()*250),
     vx:0, vy:0, alpha:0,
    }));

    /* ── Fumée pot d’échappement ── */
    const exhaust=Array.from({length:12},()=>({
     x:0, y:0,
     vx:-(0.15+Math.random()*0.22),
     vy:-(0.03+Math.random()*0.05),
     r:W*(0.006+Math.random()*0.010),
     op:0.08+Math.random()*0.10,
     ph:Math.random()*Math.PI*2,
     life:Math.random(),
     maxLife:0.8+Math.random()*1.2,
    }));

    /* ── Animation voiture — arrive par la gauche et se gare ── */
    const CAR_TARGET_X=cx+W*0.18;
    const CAR_Y=H*0.870;
    let carAnimX=-W*0.22;
    let carVx=W*0.004;
    let carParked=false;

    function drawFog(){
     for(const f of fogBands){
      f.ph+=f.spd; f.x+=f.vx;
      if(f.x>W+f.w*0.5)f.x=-f.w*0.5;
      if(f.x<-f.w*0.5)f.x=W+f.w*0.5;
      const pulse=0.60+0.40*Math.abs(Math.sin(f.ph));
      const fg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.w*0.5);
      fg.addColorStop(0,`rgba(160,110,55,${f.op*pulse})`);
      fg.addColorStop(0.5,`rgba(120,80,35,${f.op*pulse*0.45})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;
      ctx.beginPath();ctx.ellipse(f.x,f.y,f.w*0.5,H*0.018,0,0,Math.PI*2);ctx.fill();
     }
    }

    function drawCigSmoke(){
     const fy=horizY+H*0.040;
     /* Positions des mains/bouches des silhouettes */
     const srcL={x:cx-W*0.08-W*0.016, y:fy-H*0.110}; /* Noodles */
     const srcR={x:cx+W*0.06+W*0.024, y:fy-H*0.082}; /* Max */

     for(const s of cigSmoke){
      s.life+=0.012;
      if(s.life>=s.maxLife){
       s.life=0; s.maxLife=0.5+Math.random()*1.0;
       const src=s.side==='L'?srcL:srcR;
       s.x=src.x+(Math.random()-0.5)*W*0.008;
       s.y=src.y;
       s.r=W*(0.006+Math.random()*0.008);
       s.vx=(Math.random()-0.5)*0.05+(s.side==='L'?-0.015:0.015);
       s.vy=-(0.06+Math.random()*0.10);
      }
      s.ph+=s.spd;
      s.x+=s.vx+Math.sin(s.ph*0.7)*0.04;
      s.y+=s.vy;
      s.r+=0.08;
      const ratio=s.life/s.maxLife;
      const fade=(1-ratio)*(1-ratio);
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(110,75,35,${s.op*fade})`);
      sg.addColorStop(0.6,`rgba(80,50,20,${s.op*fade*0.55})`);
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* Braises */
     for(const e of cigEmbers){
      e.ph+=0.08;
      const src=e.side==='L'?srcL:srcR;
      const glow=0.55+0.45*Math.abs(Math.sin(e.ph));
      const eg=ctx.createRadialGradient(src.x,src.y,0,src.x,src.y,W*0.012);
      eg.addColorStop(0,`rgba(255,120,20,${glow*0.75})`);
      eg.addColorStop(0.5,`rgba(200,70,5,${glow*0.20})`);
      eg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eg;ctx.fillRect(src.x-W*0.012,src.y-W*0.012,W*0.024,W*0.024);
      ctx.fillStyle=`rgba(255,180,60,${glow})`;
      ctx.beginPath();ctx.arc(src.x,src.y,W*0.004,0,Math.PI*2);ctx.fill();
     }
    }

    function drawUrbanDust(){
     for(const d of urbanDust){
      d.ph+=d.spd;
      d.x+=d.vx+Math.sin(d.ph*0.6)*0.06;
      d.y+=d.vy;
      if(d.y<H*0.50){d.y=H*(0.78+Math.random()*0.18);d.x=Math.random()*W;}
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      const flicker=0.4+0.6*Math.abs(Math.sin(d.ph));
      ctx.fillStyle=`rgba(160,110,45,${d.op*flicker})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }
    }

    function drawBrooklynBridge(){
     const baseY=horizY+H*0.005;
     const pyl1X=cx-W*0.18, pyl2X=cx+W*0.18;
     const pylH=H*0.30, pylW=W*0.040;

     /* Tablier */
     ctx.fillStyle='rgba(14,9,2,0.98)';
     ctx.fillRect(0,baseY+H*0.032,W,H*0.022);
     ctx.fillStyle='rgba(10,6,1,0.98)';
     ctx.fillRect(0,baseY+H*0.050,W,H*0.014);

     /* Câbles porteurs principaux */
     ctx.strokeStyle='rgba(12,8,1,0.97)';ctx.lineWidth=W*0.008;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(-W*0.02,baseY+H*0.036);
     ctx.quadraticCurveTo(pyl1X,baseY-pylH*0.92,pyl2X,baseY-pylH*0.96);
     ctx.quadraticCurveTo(W*1.02,baseY+H*0.036,W*1.02,baseY+H*0.036);
     ctx.stroke();
     ctx.lineWidth=W*0.007;
     ctx.beginPath();
     ctx.moveTo(-W*0.02,baseY+H*0.042);
     ctx.quadraticCurveTo(pyl1X,baseY-pylH*0.88,pyl2X,baseY-pylH*0.92);
     ctx.quadraticCurveTo(W*1.02,baseY+H*0.042,W*1.02,baseY+H*0.042);
     ctx.stroke();

     /* Suspentes */
     ctx.strokeStyle='rgba(10,7,1,0.88)';ctx.lineWidth=W*0.003;
     for(let i=0;i<=20;i++){
      const px=i/20;
      const sx=px*W;
      const cableY=baseY-pylH*(1-4*Math.pow(px-0.5,2))*0.94;
      ctx.beginPath();ctx.moveTo(sx,cableY);ctx.lineTo(sx,baseY+H*0.036);ctx.stroke();
     }

     /* Diagonales en V */
     ctx.strokeStyle='rgba(12,8,1,0.85)';ctx.lineWidth=W*0.0025;
     for(let i=-3;i<=3;i++){
      ctx.beginPath();ctx.moveTo(pyl1X,baseY-pylH*0.60);ctx.lineTo(pyl1X+i*W*0.10,baseY+H*0.038);ctx.stroke();
      ctx.beginPath();ctx.moveTo(pyl2X,baseY-pylH*0.60);ctx.lineTo(pyl2X+i*W*0.10,baseY+H*0.038);ctx.stroke();
     }

     /* Pylônes */
     for(const px of [pyl1X,pyl2X]){
      const pg=ctx.createLinearGradient(px-pylW/2,0,px+pylW/2,0);
      pg.addColorStop(0,'rgba(10,6,1,0.99)');pg.addColorStop(0.35,'rgba(18,12,3,0.99)');
      pg.addColorStop(0.65,'rgba(14,9,2,0.99)');pg.addColorStop(1,'rgba(8,5,1,0.99)');
      ctx.fillStyle=pg;
      ctx.beginPath();
      ctx.moveTo(px-pylW*0.55,baseY+H*0.055);ctx.lineTo(px-pylW*0.45,baseY-pylH);
      ctx.lineTo(px+pylW*0.45,baseY-pylH);ctx.lineTo(px+pylW*0.55,baseY+H*0.055);
      ctx.closePath();ctx.fill();
      /* Arche basse */
      ctx.fillStyle='rgba(20,14,4,0.98)';
      ctx.beginPath();
      ctx.moveTo(px-pylW*0.55,baseY+H*0.055);ctx.lineTo(px-pylW*0.55,baseY-pylH*0.28);
      ctx.quadraticCurveTo(px,baseY-pylH*0.40,px+pylW*0.55,baseY-pylH*0.28);
      ctx.lineTo(px+pylW*0.55,baseY+H*0.055);
      ctx.moveTo(px-pylW*0.30,baseY+H*0.055);ctx.lineTo(px-pylW*0.30,baseY-pylH*0.22);
      ctx.quadraticCurveTo(px,baseY-pylH*0.32,px+pylW*0.30,baseY-pylH*0.22);
      ctx.lineTo(px+pylW*0.30,baseY+H*0.055);
      ctx.fill('evenodd');
      /* Arche haute */
      ctx.beginPath();
      ctx.moveTo(px-pylW*0.42,baseY-pylH*0.52);ctx.lineTo(px-pylW*0.42,baseY-pylH*0.72);
      ctx.quadraticCurveTo(px,baseY-pylH*0.82,px+pylW*0.42,baseY-pylH*0.72);
      ctx.lineTo(px+pylW*0.42,baseY-pylH*0.52);
      ctx.moveTo(px-pylW*0.25,baseY-pylH*0.52);ctx.lineTo(px-pylW*0.25,baseY-pylH*0.68);
      ctx.quadraticCurveTo(px,baseY-pylH*0.76,px+pylW*0.25,baseY-pylH*0.68);
      ctx.lineTo(px+pylW*0.25,baseY-pylH*0.52);
      ctx.fill('evenodd');
      /* Couronne */
      ctx.fillStyle='rgba(8,5,1,0.99)';
      ctx.beginPath();
      ctx.moveTo(px-pylW*0.50,baseY-pylH*0.96);ctx.lineTo(px-pylW*0.28,baseY-pylH);
      ctx.lineTo(px,baseY-pylH*1.04);ctx.lineTo(px+pylW*0.28,baseY-pylH);
      ctx.lineTo(px+pylW*0.50,baseY-pylH*0.96);ctx.lineTo(px+pylW*0.45,baseY-pylH*0.93);
      ctx.lineTo(px-pylW*0.45,baseY-pylH*0.93);ctx.closePath();ctx.fill();
     }
    }

    function drawManhattan(){
     ctx.fillStyle='rgba(10,6,1,0.70)';
     const blds=[[0.00,0.08,0.04],[0.03,0.14,0.03],[0.05,0.10,0.05],[0.09,0.18,0.04],[0.12,0.12,0.03],[0.14,0.22,0.05],[0.18,0.38,0.06],[0.22,0.15,0.04],[0.25,0.20,0.05],[0.29,0.12,0.04],[0.32,0.28,0.07],[0.38,0.16,0.04],[0.41,0.32,0.05],[0.45,0.14,0.04],[0.48,0.24,0.06],[0.53,0.18,0.04],[0.56,0.12,0.05],[0.60,0.20,0.04],[0.63,0.15,0.06],[0.68,0.10,0.04],[0.70,0.16,0.05],[0.74,0.22,0.04],[0.77,0.13,0.06],[0.82,0.09,0.04],[0.85,0.15,0.05],[0.89,0.11,0.04],[0.92,0.08,0.06],[0.97,0.10,0.03]];
     for(const [xr,hr,wr] of blds){ctx.fillRect(xr*W,horizY-hr*horizY*0.65,wr*W,hr*horizY*0.65);}
     /* Flèche Empire State */
     const esH=0.38*horizY*0.65;
     ctx.beginPath();ctx.moveTo(W*0.210,horizY-esH);ctx.lineTo(W*0.213,horizY-esH-H*0.040);ctx.lineTo(W*0.216,horizY-esH);ctx.fill();
     /* Flèche Chrysler */
     const chH=0.32*horizY*0.65;
     ctx.beginPath();ctx.moveTo(W*0.430,horizY-chH);ctx.lineTo(W*0.433,horizY-chH-H*0.030);ctx.lineTo(W*0.436,horizY-chH);ctx.fill();
     /* 2e couche plus sombre */
     ctx.fillStyle='rgba(6,4,0,0.88)';
     const bld2=[[0.00,0.06,0.05],[0.04,0.10,0.04],[0.08,0.14,0.06],[0.13,0.08,0.04],[0.16,0.18,0.05],[0.20,0.10,0.04],[0.24,0.08,0.06],[0.30,0.14,0.04],[0.34,0.10,0.05],[0.38,0.06,0.04],[0.58,0.08,0.06],[0.63,0.12,0.04],[0.68,0.06,0.05],[0.72,0.10,0.04],[0.76,0.08,0.06],[0.82,0.06,0.04],[0.86,0.10,0.05],[0.90,0.07,0.04],[0.94,0.05,0.05],[0.98,0.08,0.02]];
     for(const [xr,hr,wr] of bld2){ctx.fillRect(xr*W,horizY-hr*horizY*0.55,wr*W,hr*horizY*0.55);}
    }

    function drawCar(carX,carY){
     const cw=W*0.28,ch=H*0.055;
     ctx.fillStyle='rgba(8,5,1,0.98)';
     ctx.beginPath();ctx.roundRect(carX-cw/2,carY-ch*0.4,cw,ch*0.4,H*0.008);ctx.fill();
     ctx.beginPath();ctx.moveTo(carX-cw*0.25,carY-ch*0.4);ctx.lineTo(carX-cw*0.18,carY-ch*0.85);ctx.lineTo(carX+cw*0.18,carY-ch*0.85);ctx.lineTo(carX+cw*0.30,carY-ch*0.4);ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.ellipse(carX-cw*0.32,carY-ch*0.08,cw*0.08,ch*0.22,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(carX+cw*0.32,carY-ch*0.08,cw*0.08,ch*0.22,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(4,2,0,0.99)';
     ctx.beginPath();ctx.arc(carX-cw*0.30,carY,ch*0.30,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(carX+cw*0.30,carY,ch*0.30,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(16,11,3,0.90)';
     ctx.beginPath();ctx.arc(carX-cw*0.30,carY,ch*0.16,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(carX+cw*0.30,carY,ch*0.16,0,Math.PI*2);ctx.fill();
     const hl=ctx.createRadialGradient(carX+cw*0.46,carY-ch*0.18,0,carX+cw*0.46,carY-ch*0.18,W*0.12);
     hl.addColorStop(0,'rgba(255,230,160,0.45)');hl.addColorStop(0.3,'rgba(220,180,80,0.12)');hl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hl;ctx.fillRect(carX+cw*0.30,carY-ch*0.50,W*0.20,H*0.12);
     ctx.fillStyle='rgba(255,235,170,0.80)';
     ctx.beginPath();ctx.ellipse(carX+cw*0.44,carY-ch*0.18,W*0.014,H*0.010,0,0,Math.PI*2);ctx.fill();
    }

    function drawFigures(){
     const fy=horizY+H*0.040;
     ctx.fillStyle='rgba(6,4,0,0.98)';
     /* Noodles */
     const nx=cx-W*0.08;
     ctx.beginPath();ctx.arc(nx,fy-H*0.115,W*0.018,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.roundRect(nx-W*0.014,fy-H*0.095,W*0.028,H*0.095,2);ctx.fill();
     ctx.beginPath();ctx.ellipse(nx,fy-H*0.120,W*0.024,H*0.009,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.moveTo(nx-W*0.015,fy-H*0.122);ctx.lineTo(nx+W*0.015,fy-H*0.122);ctx.lineTo(nx+W*0.012,fy-H*0.136);ctx.lineTo(nx-W*0.012,fy-H*0.136);ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(6,4,0,0.98)';ctx.lineWidth=W*0.010;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(nx-W*0.012,fy-H*0.072);ctx.lineTo(nx-W*0.016,fy-H*0.040);ctx.stroke();
     ctx.beginPath();ctx.moveTo(nx+W*0.012,fy-H*0.072);ctx.lineTo(nx+W*0.016,fy-H*0.040);ctx.stroke();
     /* Max */
     const mx2=cx+W*0.06;
     ctx.fillStyle='rgba(6,4,0,0.98)';
     ctx.beginPath();ctx.arc(mx2,fy-H*0.122,W*0.016,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.roundRect(mx2-W*0.008,fy-H*0.104,W*0.026,H*0.104,2);ctx.fill();
     ctx.beginPath();ctx.ellipse(mx2,fy-H*0.127,W*0.022,H*0.008,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.moveTo(mx2-W*0.014,fy-H*0.129);ctx.lineTo(mx2+W*0.014,fy-H*0.129);ctx.lineTo(mx2+W*0.011,fy-H*0.142);ctx.lineTo(mx2-W*0.011,fy-H*0.142);ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(6,4,0,0.98)';ctx.lineWidth=W*0.009;
     ctx.beginPath();ctx.moveTo(mx2-W*0.011,fy-H*0.078);ctx.lineTo(mx2-W*0.024,fy-H*0.050);ctx.stroke();
     ctx.beginPath();ctx.moveTo(mx2+W*0.011,fy-H*0.078);ctx.lineTo(mx2+W*0.024,fy-H*0.050);ctx.stroke();
    }

    function frame(){
     if(stop.v)return;

     /* Ciel crépusculaire sépia */
     const sky=ctx.createLinearGradient(0,0,0,horizY);
     sky.addColorStop(0.00,'#0e0600');sky.addColorStop(0.18,'#1e0e02');sky.addColorStop(0.38,'#3a1804');
     sky.addColorStop(0.58,'#6a2e06');sky.addColorStop(0.76,'#8c4210');sky.addColorStop(0.90,'#a05018');sky.addColorStop(1.00,'#b86020');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,horizY);

     /* Halo soleil couchant */
     const sunG=ctx.createRadialGradient(W*0.68,horizY,0,W*0.68,horizY,W*0.55);
     sunG.addColorStop(0,`rgba(255,200,80,${0.38+Math.sin(t*0.2)*0.03})`);
     sunG.addColorStop(0.18,'rgba(240,140,30,0.20)');sunG.addColorStop(0.45,'rgba(200,80,10,0.08)');sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,horizY);

     /* Étoiles */
     for(const s of stars){s.ph+=0.015;const sa=s.op*(0.8+0.2*Math.sin(s.ph));ctx.fillStyle=`rgba(230,218,195,${sa})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r+0.3,0,Math.PI*2);ctx.fill();if(s.r>0.9){const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3.5);sg.addColorStop(0,`rgba(230,215,180,${sa*0.35})`);sg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r*3.5,0,Math.PI*2);ctx.fill();}}

     /* Nuages sépia */
     ctx.fillStyle='rgba(80,30,5,0.18)';
     for(let ci=0;ci<4;ci++){ctx.beginPath();ctx.ellipse(W*(0.10+ci*0.22),horizY*(0.12+ci*0.18),W*(0.25+ci*0.08),H*0.012,0,0,Math.PI*2);ctx.fill();}

     /* Skyline */
     drawManhattan();

     /* Lumières ville */
     for(const l of cityLights){l.ph+=0.012;const la=l.op*(0.7+0.3*Math.sin(l.ph));const r=l.warm?255:200,g=l.warm?Math.round(170+Math.sin(l.ph)*15):210,b=l.warm?60:255;ctx.fillStyle=`rgba(${r},${g},${b},${la})`;ctx.beginPath();ctx.arc(l.x,l.y,l.r,0,Math.PI*2);ctx.fill();}

     /* East River */
     const river=ctx.createLinearGradient(0,horizY,0,H*0.75);
     river.addColorStop(0,'#1a0e04');river.addColorStop(0.4,'#120a02');river.addColorStop(1,'#0a0601');
     ctx.fillStyle=river;ctx.fillRect(0,horizY,W,H*0.75-horizY);

     /* Reflet soleil sur l'eau */
     const rG=ctx.createRadialGradient(W*0.68,horizY+H*0.04,0,W*0.68,horizY+H*0.04,W*0.45);
     rG.addColorStop(0,`rgba(255,160,40,${0.22+Math.sin(t*0.3)*0.04})`);rG.addColorStop(0.3,'rgba(200,100,20,0.08)');rG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rG;ctx.fillRect(0,horizY,W,H*0.18);

     /* Ondulations */
     ctx.strokeStyle='rgba(255,160,40,0.07)';ctx.lineWidth=0.8;
     for(const r of ripples){r.phase+=0.018;const ry=horizY+H*0.04+Math.sin(r.phase*r.freq)*r.amp;ctx.beginPath();ctx.moveTo(r.x-W*0.03,ry);ctx.lineTo(r.x+W*0.03,ry);ctx.stroke();}

     /* Reflets verticaux */
     for(const l of cityLights){
      if(l.y>horizY-H*0.08)continue;
      ctx.fillStyle=`rgba(${l.warm?255:200},${l.warm?170:210},${l.warm?60:255},${l.op*0.18*(0.5+0.5*Math.sin(l.ph+t*2))})`;
      ctx.fillRect(l.x-0.8,horizY+(horizY-l.y)*0.28,1.6,H*0.018);
     }

     /* Sol route */
     const roadG=ctx.createLinearGradient(0,H*0.75,0,H);
     roadG.addColorStop(0,'rgba(14,9,2,0.98)');roadG.addColorStop(1,'rgba(6,4,0,0.99)');
     ctx.fillStyle=roadG;ctx.fillRect(0,H*0.75,W,H*0.25);
     const pavG=ctx.createRadialGradient(cx,H*0.80,0,cx,H*0.80,W*0.35);
     pavG.addColorStop(0,'rgba(200,130,40,0.10)');pavG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=pavG;ctx.fillRect(0,H*0.75,W,H*0.25);

     /* Fumée */
     for(const s of smoke){
      s.x+=s.vx;s.y+=s.vy;s.ph+=0.012;s.r+=0.08;s.op-=0.0005;
      if(s.op<0.008||s.y<horizY-H*0.40){s.x=Math.random()*W;s.y=horizY-H*(0.05+Math.random()*0.15);s.r=W*(0.03+Math.random()*0.04);s.op=0.04+Math.random()*0.05;}
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(55,35,10,${s.op})`);sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* Brooklyn Bridge */
     drawBrooklynBridge();

     /* Pluie */
     ctx.save();
     for(const r of rain){
      r.y+=r.spd;r.x+=r.spd*0.10;
      if(r.y>H){r.y=-r.len;r.x=Math.random()*W*1.3-W*0.15;}
      ctx.globalAlpha=r.op;ctx.strokeStyle='rgba(150,120,70,1)';ctx.lineWidth=0.6;
      ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+r.len*0.10,r.y+r.len);ctx.stroke();
     }
     ctx.globalAlpha=1;ctx.restore();

      /* Voiture années 30 — animation de parking */
      if(!carParked){
        const dist=CAR_TARGET_X-carAnimX;
        if(dist<=W*0.002){
          carAnimX=CAR_TARGET_X;
          carParked=true;
        } else {
          const ease=Math.min(1,dist/(W*0.35));
          carVx=W*0.001+ease*W*0.008;
          carAnimX+=carVx;
        }
      }
      drawCar(carAnimX,CAR_Y);

     /* Silhouettes */
     drawFigures();

     /* ── Fumée de cigarette ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.40,'rgba(0,0,0,0.15)');vg.addColorStop(1,'rgba(0,0,0,0.94)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Teinte sépia */
     ctx.fillStyle=`rgba(40,18,2,${0.08+Math.sin(t*0.15)*0.01})`;ctx.fillRect(0,0,W,H);
     drawCigSmoke();

     /* ── Étoiles filantes ── */
     for(const ss of shootingStars){
      if(!ss.active){
       ss.timer--;
       if(ss.timer<=0){
        ss.active=true;
        ss.x=W*(0.05+Math.random()*0.75);
        ss.y=H*(0.02+Math.random()*0.22);
        const angle=Math.PI/6+Math.random()*Math.PI/8;
        const spd=W*(0.012+Math.random()*0.018);
        ss.vx=Math.cos(angle)*spd;
        ss.vy=Math.sin(angle)*spd;
        ss.alpha=0.85+Math.random()*0.15;
        ss.timer=Math.floor(80+Math.random()*280);
       }
       continue;
      }
      ss.x+=ss.vx;ss.y+=ss.vy;ss.alpha-=0.028;
      if(ss.alpha<=0||ss.y>H*0.50){ss.active=false;continue;}
      const tailLen=W*0.055;
      const grad=ctx.createLinearGradient(ss.x,ss.y,ss.x-ss.vx*5,ss.y-ss.vy*5);
      grad.addColorStop(0,`rgba(230,215,180,${ss.alpha})`);
      grad.addColorStop(0.4,`rgba(200,180,120,${ss.alpha*0.4})`);
      grad.addColorStop(1,'rgba(0,0,0,0)');
      ctx.save();ctx.strokeStyle=grad;ctx.lineWidth=1.4;
      ctx.beginPath();ctx.moveTo(ss.x,ss.y);ctx.lineTo(ss.x-ss.vx*5,ss.y-ss.vy*5);ctx.stroke();
      ctx.fillStyle=`rgba(240,225,190,${ss.alpha})`;
      ctx.beginPath();ctx.arc(ss.x,ss.y,1.2,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* ── Fumée pot d'échappement ── */
     const exSrc={x:cx+W*0.18-W*0.28*0.48, y:H*0.870+H*0.012};
     for(const e of exhaust){
      e.life+=0.014;
      if(e.life>=e.maxLife){
       e.life=0;e.maxLife=0.6+Math.random()*1.0;
       e.x=exSrc.x+(Math.random()-0.5)*W*0.012;
       e.y=exSrc.y;
       e.vx=-(0.12+Math.random()*0.18);
       e.vy=-(0.02+Math.random()*0.04);
       e.r=W*(0.016+Math.random()*0.020);
       e.op=0.07+Math.random()*0.08;
      }
      e.ph+=0.018;
      e.x+=e.vx+Math.sin(e.ph*0.5)*0.04;
      e.y+=e.vy;
      e.r+=0.08;
      const ratio=e.life/e.maxLife;
      const fade=(1-ratio)*(1-ratio);
      const eg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r);
      eg.addColorStop(0,`rgba(90,60,25,${e.op*fade})`);
      eg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=eg;ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);ctx.fill();
     }

     /* Vignette */

     /* Grain pellicule */
     for(let i=0;i<55;i++){const g=10+Math.random()*22|0;ctx.fillStyle=`rgba(${g+6},${g+3},${g},${Math.random()*0.022})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.6+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
