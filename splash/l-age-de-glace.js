// CinéQuiz splash chunk — L'Âge de Glace
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["L'Âge de Glace"]={
   name:"L'Âge de Glace",
   color:'120,180,220',
   ref:"L'Âge de Glace \u2014 Chris Wedge, 2002",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ia2_s');
    if(!_s){_s=document.createElement('style');_s.id='_ia2_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Étoiles / ciel nocturne ── */
    const stars=Array.from({length:90},()=>({
     x:Math.random()*W, y:Math.random()*H*0.55,
     r:Math.random()*1.4+0.3,
     op:0.35+Math.random()*0.55,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Flocons ── */
    const flakes=Array.from({length:80},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:Math.random()*2.8+0.6,
     vy:0.20+Math.random()*0.40,
     vx:(Math.random()-0.5)*0.18,
     op:0.25+Math.random()*0.50,
     wb:Math.random()*Math.PI*2,
     wSpd:0.008+Math.random()*0.014,
    }));

    /* ── Aurores boréales — rubans larges et lumineux ── */
    const auroras=[
     {x:-W*0.05,amp:H*0.055,freq:0.7,phase:0.0,col:'rgba(40,210,120,',spd:0.010,w:W*0.65,baseOp:0.22},
     {x:W*0.20, amp:H*0.045,freq:1.0,phase:1.1,col:'rgba(60,150,255,',spd:0.008,w:W*0.55,baseOp:0.18},
     {x:W*0.45, amp:H*0.060,freq:0.6,phase:2.3,col:'rgba(130,60,240,',spd:0.009,w:W*0.50,baseOp:0.16},
     {x:W*0.55, amp:H*0.035,freq:1.2,phase:3.5,col:'rgba(30,200,160,',spd:0.013,w:W*0.40,baseOp:0.14},
    ];

    /* ── Scrat ── */
    let scrat={swing:0,jx:0,jy:0,jTimer:0,run:0};

    /* ── Dessin Scrat complet ── */
    function drawScrat(ax,ay,runPhase){
     ctx.save();
     ctx.translate(ax,ay);
     const lean=Math.sin(runPhase)*0.20;
     ctx.rotate(lean);
     const s=W*0.080;
     const legSwing=Math.sin(runPhase)*0.40;

     /* Ombre */
     ctx.fillStyle='rgba(20,60,100,0.22)';
     ctx.beginPath();ctx.ellipse(0,s*0.78,s*0.50,s*0.10,0,0,Math.PI*2);ctx.fill();

     /* Queue */
     ctx.strokeStyle='rgba(80,40,8,0.90)';ctx.lineWidth=s*0.16;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(-s*0.28,s*0.10);
     ctx.bezierCurveTo(-s*0.55,s*0.05,-s*0.60,-s*0.18,-s*0.42,-s*0.25);
     ctx.stroke();

     /* Corps */
     ctx.fillStyle='rgba(105,58,18,1)';
     ctx.beginPath();ctx.ellipse(0,s*0.06,s*0.36,s*0.46,lean*-0.3,0,Math.PI*2);ctx.fill();

     /* Ventre clair */
     ctx.fillStyle='rgba(195,155,85,0.90)';
     ctx.beginPath();ctx.ellipse(s*0.04,s*0.08,s*0.20,s*0.28,0,0,Math.PI*2);ctx.fill();

     /* Tête */
     ctx.fillStyle='rgba(105,58,18,1)';
     ctx.beginPath();ctx.ellipse(s*0.04,-s*0.34,s*0.32,s*0.30,lean*-0.2,0,Math.PI*2);ctx.fill();

     /* Oreilles */
     ctx.beginPath();ctx.moveTo(-s*0.18,-s*0.56);ctx.lineTo(-s*0.28,-s*0.80);ctx.lineTo(-s*0.08,-s*0.58);ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.moveTo(s*0.22,-s*0.52);ctx.lineTo(s*0.34,-s*0.76);ctx.lineTo(s*0.14,-s*0.54);ctx.closePath();ctx.fill();

     /* Museau */
     ctx.fillStyle='rgba(82,42,10,1)';
     ctx.beginPath();ctx.moveTo(-s*0.08,-s*0.32);ctx.lineTo(s*0.16,-s*0.32);ctx.lineTo(s*0.08,-s*0.14);ctx.closePath();ctx.fill();

     /* Yeux grands — expression paniquée */
     ctx.fillStyle='rgba(255,255,255,0.96)';
     ctx.beginPath();ctx.ellipse(-s*0.10,-s*0.42,s*0.09,s*0.11,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(s*0.14,-s*0.42,s*0.09,s*0.11,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(20,10,2,1)';
     ctx.beginPath();ctx.arc(-s*0.10,-s*0.44,s*0.055,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(s*0.14,-s*0.44,s*0.055,0,Math.PI*2);ctx.fill();
     /* Reflet yeux */
     ctx.fillStyle='rgba(255,255,255,0.70)';
     ctx.beginPath();ctx.arc(-s*0.08,-s*0.47,s*0.022,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(s*0.16,-s*0.47,s*0.022,0,Math.PI*2);ctx.fill();

     /* Gland tenu dans les pattes */
     /* Tige */
     ctx.fillStyle='rgba(70,34,6,1)';
     ctx.beginPath();ctx.roundRect(s*0.28,-s*0.62,s*0.06,s*0.22,2);ctx.fill();
     /* Chapeau */
     ctx.beginPath();ctx.ellipse(s*0.31,-s*0.62,s*0.14,s*0.055,0,0,Math.PI*2);ctx.fill();
     /* Corps gland */
     ctx.fillStyle='rgba(145,85,22,1)';
     ctx.beginPath();ctx.ellipse(s*0.31,-s*0.44,s*0.14,s*0.18,0,0,Math.PI*2);ctx.fill();
     /* Reflet gland */
     ctx.fillStyle='rgba(200,150,70,0.45)';
     ctx.beginPath();ctx.ellipse(s*0.24,-s*0.50,s*0.05,s*0.07,0,0,Math.PI*2);ctx.fill();

     /* Pattes avant */
     ctx.fillStyle='rgba(90,48,12,1)';
     ctx.beginPath();ctx.ellipse(s*0.22,-s*0.10,s*0.08,s*0.12,legSwing*0.5,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(-s*0.22,-s*0.08,s*0.08,s*0.12,-legSwing*0.5,0,Math.PI*2);ctx.fill();

     /* Jambes courant */
     ctx.strokeStyle='rgba(90,48,12,1)';ctx.lineWidth=s*0.18;ctx.lineCap='round';
     ctx.save();ctx.translate(-s*0.14,s*0.42);ctx.rotate(legSwing);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-s*0.08,s*0.30);ctx.stroke();
     ctx.restore();
     ctx.save();ctx.translate(s*0.14,s*0.42);ctx.rotate(-legSwing);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(s*0.08,s*0.30);ctx.stroke();
     ctx.restore();

     ctx.restore();
    }

    /* ── Mammouth coloré — Manny, au premier plan ── */
    function drawMammoth(mx,my,s){
     ctx.save();
     ctx.translate(mx,my);

     /* Ombre au sol */
     ctx.fillStyle='rgba(10,30,70,0.28)';
     ctx.beginPath();ctx.ellipse(0,s*0.40,s*0.70,s*0.10,0,0,Math.PI*2);ctx.fill();

     /* Fourrure longue — couche arrière (franges) */
     ctx.strokeStyle='rgba(72,36,8,0.55)';ctx.lineWidth=s*0.045;ctx.lineCap='round';
     const furPts=[[-0.58,-0.28],[-0.62,-0.10],[-0.60,0.08],[-0.55,0.22],
                   [-0.40,-0.70],[-0.28,-0.78],[-0.10,-0.82],[0.05,-0.80],
                   [0.50,-0.60],[0.58,-0.42]];
     for(const [fx,fy] of furPts){
      ctx.beginPath();ctx.moveTo(fx*s,fy*s);ctx.lineTo((fx-0.04)*s,(fy+0.14)*s);ctx.stroke();
     }

     /* Bosse dorsale */
     const bossG=ctx.createRadialGradient(-s*0.18,-s*0.72,0,-s*0.12,-s*0.62,s*0.32);
     bossG.addColorStop(0,'rgba(140,75,25,1)');bossG.addColorStop(1,'rgba(95,48,10,1)');
     ctx.fillStyle=bossG;
     ctx.beginPath();ctx.ellipse(-s*0.12,-s*0.62,s*0.30,s*0.20,0.3,0,Math.PI*2);ctx.fill();

     /* Corps massif */
     const bodyG=ctx.createRadialGradient(-s*0.15,-s*0.40,0,s*0.05,-s*0.30,s*0.65);
     bodyG.addColorStop(0,'rgba(155,85,28,1)');
     bodyG.addColorStop(0.5,'rgba(120,60,15,1)');
     bodyG.addColorStop(1,'rgba(85,40,8,1)');
     ctx.fillStyle=bodyG;
     ctx.beginPath();ctx.ellipse(0,-s*0.32,s*0.60,s*0.44,0,0,Math.PI*2);ctx.fill();

     /* Cou */
     ctx.fillStyle='rgba(125,62,16,1)';
     ctx.beginPath();
     ctx.moveTo(s*0.28,-s*0.55);ctx.lineTo(s*0.52,-s*0.64);
     ctx.lineTo(s*0.62,-s*0.38);ctx.lineTo(s*0.36,-s*0.28);
     ctx.closePath();ctx.fill();

     /* Pattes arrière (fond) */
     ctx.fillStyle='rgba(85,40,8,1)';
     ctx.beginPath();ctx.roundRect(-s*0.46,-s*0.06,s*0.17,s*0.46,s*0.05);ctx.fill();
     ctx.beginPath();ctx.ellipse(-s*0.37,s*0.40,s*0.12,s*0.06,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.roundRect(-s*0.22,-s*0.06,s*0.17,s*0.46,s*0.05);ctx.fill();
     ctx.beginPath();ctx.ellipse(-s*0.13,s*0.40,s*0.12,s*0.06,0,0,Math.PI*2);ctx.fill();

     /* Pattes avant */
     ctx.fillStyle='rgba(105,52,12,1)';
     ctx.beginPath();ctx.roundRect(s*0.04,-s*0.06,s*0.16,s*0.46,s*0.05);ctx.fill();
     ctx.beginPath();ctx.ellipse(s*0.12,s*0.40,s*0.12,s*0.06,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.24,-s*0.06,s*0.16,s*0.46,s*0.05);ctx.fill();
     ctx.beginPath();ctx.ellipse(s*0.32,s*0.40,s*0.12,s*0.06,0,0,Math.PI*2);ctx.fill();

     /* Tête */
     const headG=ctx.createRadialGradient(s*0.50,-s*0.68,0,s*0.56,-s*0.60,s*0.30);
     headG.addColorStop(0,'rgba(165,90,30,1)');headG.addColorStop(1,'rgba(105,52,12,1)');
     ctx.fillStyle=headG;
     ctx.beginPath();ctx.ellipse(s*0.56,-s*0.62,s*0.28,s*0.26,0.15,0,Math.PI*2);ctx.fill();

     /* Oreilles */
     ctx.fillStyle='rgba(95,46,10,1)';
     ctx.beginPath();ctx.ellipse(s*0.36,-s*0.82,s*0.12,s*0.08,-0.3,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(140,68,18,0.60)';
     ctx.beginPath();ctx.ellipse(s*0.36,-s*0.82,s*0.07,s*0.04,-0.3,0,Math.PI*2);ctx.fill();

     /* Trompe détaillée */
     ctx.fillStyle='rgba(120,60,14,1)';
     ctx.beginPath();
     ctx.moveTo(s*0.74,-s*0.50);
     ctx.bezierCurveTo(s*0.96,-s*0.38,s*1.04,-s*0.12,s*0.90,s*0.04);
     ctx.bezierCurveTo(s*0.86,s*0.08,s*0.82,s*0.06,s*0.80,s*0.03);
     ctx.bezierCurveTo(s*0.92,-s*0.12,s*0.86,-s*0.36,s*0.68,-s*0.48);
     ctx.closePath();ctx.fill();
     /* Rides trompe */
     ctx.strokeStyle='rgba(85,40,8,0.40)';ctx.lineWidth=s*0.018;
     for(let ri=0;ri<4;ri++){
      const ry=-s*0.36+ri*s*0.10;
      const rx=s*(0.84+ri*0.02);
      ctx.beginPath();ctx.moveTo(rx-s*0.05,ry);ctx.lineTo(rx+s*0.05,ry+s*0.02);ctx.stroke();
     }

     /* Défenses ivoire longues et courbées */
     ctx.fillStyle='rgba(235,225,185,1)';
     /* Défense gauche (dessous) */
     ctx.beginPath();
     ctx.moveTo(s*0.68,-s*0.46);
     ctx.bezierCurveTo(s*0.96,-s*0.28,s*1.06,-s*0.02,s*0.90,s*0.18);
     ctx.bezierCurveTo(s*0.86,s*0.22,s*0.80,s*0.20,s*0.76,s*0.16);
     ctx.bezierCurveTo(s*0.90,-s*0.02,s*0.84,-s*0.26,s*0.62,-s*0.42);
     ctx.closePath();ctx.fill();
     /* Ombre légère sur défense */
     ctx.fillStyle='rgba(180,165,120,0.40)';
     ctx.beginPath();
     ctx.moveTo(s*0.70,-s*0.44);
     ctx.bezierCurveTo(s*0.90,-s*0.28,s*0.98,-s*0.06,s*0.88,s*0.10);
     ctx.bezierCurveTo(s*0.86,s*0.12,s*0.84,s*0.10,s*0.83,s*0.08);
     ctx.bezierCurveTo(s*0.92,-s*0.06,s*0.86,-s*0.26,s*0.66,-s*0.42);
     ctx.closePath();ctx.fill();

     /* Yeux expressifs */
     /* Blanc de l'œil */
     ctx.fillStyle='rgba(245,240,220,1)';
     ctx.beginPath();ctx.ellipse(s*0.52,-s*0.65,s*0.085,s*0.075,0,0,Math.PI*2);ctx.fill();
     /* Iris brun */
     ctx.fillStyle='rgba(100,55,10,1)';
     ctx.beginPath();ctx.arc(s*0.54,-s*0.655,s*0.052,0,Math.PI*2);ctx.fill();
     /* Pupille */
     ctx.fillStyle='rgba(15,8,2,1)';
     ctx.beginPath();ctx.arc(s*0.545,-s*0.658,s*0.030,0,Math.PI*2);ctx.fill();
     /* Reflet */
     ctx.fillStyle='rgba(255,255,255,0.80)';
     ctx.beginPath();ctx.arc(s*0.528,-s*0.675,s*0.016,0,Math.PI*2);ctx.fill();
     /* Sourcil expressif */
     ctx.strokeStyle='rgba(70,32,4,0.90)';ctx.lineWidth=s*0.030;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(s*0.44,-s*0.735);ctx.quadraticCurveTo(s*0.52,-s*0.755,s*0.60,-s*0.730);ctx.stroke();

     ctx.restore();
    }

    /* ── Sid le paresseux ── */
    function drawSid(sx,sy,s){
     ctx.save();
     ctx.translate(sx,sy);

     /* Ombre */
     ctx.fillStyle='rgba(10,30,70,0.20)';
     ctx.beginPath();ctx.ellipse(0,s*0.50,s*0.32,s*0.07,0,0,Math.PI*2);ctx.fill();

     /* Corps principal vert-beige */
     const bodyG=ctx.createRadialGradient(-s*0.04,-s*0.10,0,0,0,s*0.40);
     bodyG.addColorStop(0,'rgba(195,185,95,1)');
     bodyG.addColorStop(0.5,'rgba(165,155,70,1)');
     bodyG.addColorStop(1,'rgba(130,118,45,1)');
     ctx.fillStyle=bodyG;
     ctx.beginPath();ctx.ellipse(0,-s*0.05,s*0.30,s*0.36,0,0,Math.PI*2);ctx.fill();

     /* Ventre clair */
     ctx.fillStyle='rgba(220,215,165,0.85)';
     ctx.beginPath();ctx.ellipse(s*0.02,-s*0.04,s*0.16,s*0.22,0,0,Math.PI*2);ctx.fill();

     /* Pattes arrière courtes */
     ctx.fillStyle='rgba(140,128,50,1)';
     ctx.beginPath();ctx.roundRect(-s*0.18,s*0.22,s*0.14,s*0.26,s*0.04);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.06,s*0.22,s*0.14,s*0.26,s*0.04);ctx.fill();
     /* Pieds */
     ctx.fillStyle='rgba(110,100,35,1)';
     ctx.beginPath();ctx.ellipse(-s*0.11,s*0.48,s*0.10,s*0.055,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(s*0.13,s*0.48,s*0.10,s*0.055,0,0,Math.PI*2);ctx.fill();

     /* Bras relevés — geste naïf */
     ctx.fillStyle='rgba(150,140,55,1)';
     ctx.beginPath();ctx.roundRect(-s*0.36,-s*0.22,s*0.12,s*0.28,s*0.04);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.26,-s*0.22,s*0.12,s*0.28,s*0.04);ctx.fill();
     /* Griffes */
     ctx.fillStyle='rgba(80,70,20,1)';
     for(const [gx,gy] of [[-s*0.30,-s*0.25],[s*0.32,-s*0.25]]){
      ctx.beginPath();ctx.arc(gx,gy,s*0.03,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(gx,gy-s*0.04,s*0.03,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(gx+s*0.04,gy-s*0.02,s*0.03,0,Math.PI*2);ctx.fill();
     }

     /* Queue courte */
     ctx.fillStyle='rgba(145,132,52,1)';
     ctx.beginPath();ctx.ellipse(-s*0.22,s*0.08,s*0.08,s*0.12,0.4,0,Math.PI*2);ctx.fill();

     /* Tête */
     const headG2=ctx.createRadialGradient(-s*0.05,-s*0.50,0,0,-s*0.42,s*0.24);
     headG2.addColorStop(0,'rgba(200,190,100,1)');headG2.addColorStop(1,'rgba(155,142,58,1)');
     ctx.fillStyle=headG2;
     ctx.beginPath();ctx.ellipse(0,-s*0.42,s*0.22,s*0.21,0,0,Math.PI*2);ctx.fill();

     /* Crête de poils sur la tête */
     ctx.strokeStyle='rgba(110,100,35,0.80)';ctx.lineWidth=s*0.04;ctx.lineCap='round';
     for(const [hx,hy,dx,dy] of [[-s*0.08,-s*0.60,-s*0.10,-s*0.76],[0,-s*0.62,0,-s*0.78],[s*0.08,-s*0.60,s*0.10,-s*0.76]]){
      ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(dx,dy);ctx.stroke();
     }

     /* Museaux proéminents */
     ctx.fillStyle='rgba(175,162,75,1)';
     ctx.beginPath();ctx.ellipse(s*0.07,-s*0.40,s*0.14,s*0.10,0.2,0,Math.PI*2);ctx.fill();
     /* Narines */
     ctx.fillStyle='rgba(80,70,22,1)';
     ctx.beginPath();ctx.ellipse(s*0.02,-s*0.40,s*0.025,s*0.020,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(s*0.12,-s*0.39,s*0.025,s*0.020,0,0,Math.PI*2);ctx.fill();

     /* Grands yeux ronds expressifs */
     ctx.fillStyle='rgba(255,252,235,1)';
     ctx.beginPath();ctx.ellipse(-s*0.09,-s*0.49,s*0.075,s*0.080,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(s*0.10,-s*0.49,s*0.075,s*0.080,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(55,40,10,1)';
     ctx.beginPath();ctx.arc(-s*0.09,-s*0.49,s*0.048,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(s*0.10,-s*0.49,s*0.048,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.85)';
     ctx.beginPath();ctx.arc(-s*0.076,-s*0.505,s*0.018,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(s*0.113,-s*0.505,s*0.018,0,Math.PI*2);ctx.fill();

     /* Sourire */
     ctx.strokeStyle='rgba(80,65,18,0.80)';ctx.lineWidth=s*0.022;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-s*0.05,-s*0.33);ctx.quadraticCurveTo(s*0.07,-s*0.27,s*0.15,-s*0.33);ctx.stroke();

     ctx.restore();
    }

    /* ── Diego le tigre à dents de sabre ── */
    function drawDiego(dx2,dy2,s){
     ctx.save();
     ctx.translate(dx2,dy2);

     /* Ombre */
     ctx.fillStyle='rgba(10,30,70,0.22)';
     ctx.beginPath();ctx.ellipse(0,s*0.45,s*0.40,s*0.08,0,0,Math.PI*2);ctx.fill();

     /* Queue en courbe derrière */
     ctx.strokeStyle='rgba(160,90,18,1)';ctx.lineWidth=s*0.09;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(-s*0.32,s*0.08);
     ctx.bezierCurveTo(-s*0.55,s*0.05,-s*0.62,-s*0.14,-s*0.52,-s*0.28);
     ctx.stroke();
     /* Bout de queue sombre */
     ctx.fillStyle='rgba(55,28,4,1)';
     ctx.beginPath();ctx.arc(-s*0.52,-s*0.30,s*0.055,0,Math.PI*2);ctx.fill();

     /* Corps — orange fauve */
     const bodyG3=ctx.createRadialGradient(-s*0.08,-s*0.18,0,0,-s*0.10,s*0.45);
     bodyG3.addColorStop(0,'rgba(215,135,42,1)');
     bodyG3.addColorStop(0.5,'rgba(185,105,22,1)');
     bodyG3.addColorStop(1,'rgba(145,78,10,1)');
     ctx.fillStyle=bodyG3;
     ctx.beginPath();ctx.ellipse(0,-s*0.10,s*0.36,s*0.38,0,0,Math.PI*2);ctx.fill();

     /* Ventre crème */
     ctx.fillStyle='rgba(235,215,168,0.88)';
     ctx.beginPath();ctx.ellipse(s*0.04,-s*0.08,s*0.18,s*0.24,0,0,Math.PI*2);ctx.fill();

     /* Rayures noires */
     ctx.strokeStyle='rgba(30,14,2,0.55)';ctx.lineWidth=s*0.038;ctx.lineCap='round';
     const stripes=[[-0.28,-0.42,0.06,-0.12],[-0.20,-0.14,0.14,0.08],[-0.14,0.10,0.20,0.30],[0.28,-0.38,0.38,-0.10]];
     for(const [x1s,y1s,x2s,y2s] of stripes){
      ctx.beginPath();ctx.moveTo(x1s*s,y1s*s);ctx.lineTo(x2s*s,y2s*s);ctx.stroke();
     }

     /* Pattes arrière */
     ctx.fillStyle='rgba(160,92,18,1)';
     ctx.beginPath();ctx.roundRect(-s*0.32,s*0.18,s*0.16,s*0.28,s*0.04);ctx.fill();
     ctx.beginPath();ctx.roundRect(-s*0.10,s*0.18,s*0.16,s*0.28,s*0.04);ctx.fill();
     /* Pattes avant */
     ctx.beginPath();ctx.roundRect(s*0.06,s*0.16,s*0.15,s*0.28,s*0.04);ctx.fill();
     ctx.beginPath();ctx.roundRect(s*0.24,s*0.16,s*0.15,s*0.28,s*0.04);ctx.fill();
     /* Pattes griffues */
     ctx.fillStyle='rgba(80,48,8,1)';
     for(const px of [-s*0.24,-s*0.02,s*0.13,s*0.31]){
      ctx.beginPath();ctx.ellipse(px,s*0.46,s*0.10,s*0.05,0,0,Math.PI*2);ctx.fill();
     }

     /* Cou */
     ctx.fillStyle='rgba(185,108,22,1)';
     ctx.beginPath();
     ctx.moveTo(s*0.12,-s*0.42);ctx.lineTo(s*0.30,-s*0.46);
     ctx.lineTo(s*0.38,-s*0.22);ctx.lineTo(s*0.18,-s*0.20);
     ctx.closePath();ctx.fill();

     /* Tête féline */
     const headG3=ctx.createRadialGradient(s*0.20,-s*0.64,0,s*0.24,-s*0.56,s*0.25);
     headG3.addColorStop(0,'rgba(225,142,45,1)');headG3.addColorStop(1,'rgba(170,95,18,1)');
     ctx.fillStyle=headG3;
     ctx.beginPath();ctx.ellipse(s*0.24,-s*0.56,s*0.23,s*0.22,0,0,Math.PI*2);ctx.fill();

     /* Oreilles pointues */
     ctx.fillStyle='rgba(160,85,15,1)';
     ctx.beginPath();ctx.moveTo(s*0.08,-s*0.70);ctx.lineTo(s*0.02,-s*0.90);ctx.lineTo(s*0.18,-s*0.72);ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.moveTo(s*0.36,-s*0.70);ctx.lineTo(s*0.44,-s*0.90);ctx.lineTo(s*0.28,-s*0.72);ctx.closePath();ctx.fill();
     /* Intérieur oreilles */
     ctx.fillStyle='rgba(200,130,80,0.65)';
     ctx.beginPath();ctx.moveTo(s*0.09,-s*0.72);ctx.lineTo(s*0.04,-s*0.86);ctx.lineTo(s*0.16,-s*0.73);ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.moveTo(s*0.35,-s*0.72);ctx.lineTo(s*0.42,-s*0.86);ctx.lineTo(s*0.29,-s*0.73);ctx.closePath();ctx.fill();

     /* Masque crème du visage */
     ctx.fillStyle='rgba(235,218,165,0.80)';
     ctx.beginPath();ctx.ellipse(s*0.26,-s*0.52,s*0.14,s*0.12,0,0,Math.PI*2);ctx.fill();

     /* Rayures sur le museau */
     ctx.strokeStyle='rgba(25,12,2,0.45)';ctx.lineWidth=s*0.020;
     ctx.beginPath();ctx.moveTo(s*0.14,-s*0.58);ctx.lineTo(s*0.06,-s*0.54);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.14,-s*0.54);ctx.lineTo(s*0.06,-s*0.50);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.36,-s*0.58);ctx.lineTo(s*0.44,-s*0.54);ctx.stroke();
     ctx.beginPath();ctx.moveTo(s*0.36,-s*0.54);ctx.lineTo(s*0.44,-s*0.50);ctx.stroke();

     /* Yeux plissés / féroces */
     ctx.fillStyle='rgba(255,255,220,1)';
     ctx.beginPath();ctx.ellipse(s*0.16,-s*0.62,s*0.065,s*0.055,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(s*0.34,-s*0.62,s*0.065,s*0.055,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(95,60,8,1)';
     ctx.beginPath();ctx.arc(s*0.16,-s*0.62,s*0.038,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(s*0.34,-s*0.62,s*0.038,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(15,8,2,1)';
     ctx.beginPath();ctx.arc(s*0.16,-s*0.62,s*0.022,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(s*0.34,-s*0.62,s*0.022,0,Math.PI*2);ctx.fill();
     /* Reflet */
     ctx.fillStyle='rgba(255,255,255,0.75)';
     ctx.beginPath();ctx.arc(s*0.150,-s*0.633,s*0.014,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(s*0.330,-s*0.633,s*0.014,0,Math.PI*2);ctx.fill();

     /* Dents de sabre — longues et courbées */
     ctx.fillStyle='rgba(245,240,220,1)';
     /* Dent gauche */
     ctx.beginPath();
     ctx.moveTo(s*0.14,-s*0.46);
     ctx.bezierCurveTo(s*0.10,-s*0.36,s*0.09,-s*0.24,s*0.12,-s*0.18);
     ctx.bezierCurveTo(s*0.14,-s*0.14,s*0.16,-s*0.14,s*0.18,-s*0.18);
     ctx.bezierCurveTo(s*0.17,-s*0.24,s*0.17,-s*0.36,s*0.18,-s*0.46);
     ctx.closePath();ctx.fill();
     /* Dent droite */
     ctx.beginPath();
     ctx.moveTo(s*0.30,-s*0.46);
     ctx.bezierCurveTo(s*0.28,-s*0.36,s*0.28,-s*0.24,s*0.30,-s*0.18);
     ctx.bezierCurveTo(s*0.32,-s*0.14,s*0.34,-s*0.14,s*0.36,-s*0.18);
     ctx.bezierCurveTo(s*0.38,-s*0.24,s*0.36,-s*0.36,s*0.34,-s*0.46);
     ctx.closePath();ctx.fill();

     ctx.restore();
    }

    /* ── Sapin enneigé ── */
    function drawTree(tx,ty,h){
     const w=h*0.50;
     ctx.fillStyle='rgba(18,48,28,0.90)';
     /* 3 niveaux */
     for(let li=0;li<3;li++){
      const ly=ty-h*(0.28+li*0.30);
      const lw=w*(0.90-li*0.22);
      const lh=h*(0.35+li*0.05);
      ctx.beginPath();ctx.moveTo(tx,ly-lh);ctx.lineTo(tx+lw,ly);ctx.lineTo(tx-lw,ly);ctx.closePath();ctx.fill();
     }
     /* Tronc */
     ctx.fillStyle='rgba(45,28,12,0.88)';
     ctx.fillRect(tx-w*0.08,ty-h*0.22,w*0.16,h*0.22);
     /* Neige sur les branches */
     ctx.fillStyle='rgba(220,238,252,0.80)';
     for(let li=0;li<3;li++){
      const ly=ty-h*(0.28+li*0.30);
      const lw=w*(0.88-li*0.22);
      ctx.beginPath();ctx.ellipse(tx,ly-h*0.04,lw*0.70,h*0.055,0,0,Math.PI*2);ctx.fill();
     }
    }

    /* ── Stalactites de glace ── */
    function drawStalactites(baseY,count,col){
     ctx.fillStyle=col;
     for(let i=0;i<count;i++){
      const sx=W*(0.04+i*(0.92/count))+(i%2)*W*0.03;
      const sh=H*(0.04+((i*137+31)%100)/100*0.10);
      const sw=W*(0.008+((i*79+53)%100)/100*0.012);
      ctx.beginPath();
      ctx.moveTo(sx-sw,baseY);ctx.lineTo(sx+sw,baseY);ctx.lineTo(sx,baseY+sh);
      ctx.closePath();ctx.fill();
     }
    }

    /* ── Montagnes glaciaires en fond ── */
    function drawMountains(col,peaks,baseY,scaleH){
     ctx.fillStyle=col;
     ctx.beginPath();ctx.moveTo(-W*0.02,baseY);
     for(const [px,ph] of peaks){ctx.lineTo(px*W,baseY-scaleH*ph);}
     ctx.lineTo(W*1.02,baseY);ctx.closePath();ctx.fill();
    }

    function frame(){
     if(stop.v)return;

     /* ── CIEL nocturne glaciaire ── */
     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0.00,'#080c1e');
     sky.addColorStop(0.25,'#0e1830');
     sky.addColorStop(0.55,'#142448');
     sky.addColorStop(0.80,'#1a3060');
     sky.addColorStop(1.00,'#223870');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

     /* ── ÉTOILES ── */
     for(const s of stars){
      s.ph+=0.012;
      const op=s.op*(0.65+0.35*Math.sin(s.ph));
      ctx.fillStyle=`rgba(220,235,255,${op})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── AURORES BORÉALES ── */
     for(const a of auroras){
      a.phase+=a.spd;
      /* Pulsation globale lente */
      const pulse=0.55+0.45*Math.abs(Math.sin(a.phase*0.35));
      const aY=H*0.10+Math.sin(a.phase*0.6)*H*0.05;
      const nStrips=12;
      for(let strip=0;strip<nStrips;strip++){
       const sy=aY+strip*H*0.028;
       if(sy>H*0.60)continue; /* reste dans le ciel */
       /* Opacité : forte au centre du ruban, fondue aux extrêmes */
       const stripFade=1-strip/(nStrips-1);
       const op=a.baseOp*stripFade*pulse*Math.abs(Math.sin(a.phase+strip*0.25));
       if(op<0.005)continue;
       /* Dégradé horizontal (fondu sur les bords) */
       const ag=ctx.createLinearGradient(a.x,0,a.x+a.w,0);
       ag.addColorStop(0,   `${a.col}0)`);
       ag.addColorStop(0.15,`${a.col}${op})`);
       ag.addColorStop(0.50,`${a.col}${op*1.2})`);
       ag.addColorStop(0.85,`${a.col}${op*0.8})`);
       ag.addColorStop(1,   `${a.col}0)`);
       ctx.fillStyle=ag;
       /* Ruban ondulé avec épaisseur variable */
       const thickness=H*(0.030-strip*0.0018);
       ctx.beginPath();
       ctx.moveTo(a.x, sy+Math.sin(a.phase+0)*H*0.020);
       for(let xi=1;xi<=24;xi++){
        const rx=a.x+xi*(a.w/24);
        const wave=Math.sin(a.phase+xi*0.35)*H*0.020+Math.sin(a.phase*1.7+xi*0.55)*H*0.009;
        ctx.lineTo(rx, sy+wave);
       }
       for(let xi=24;xi>=0;xi--){
        const rx=a.x+xi*(a.w/24);
        const wave=Math.sin(a.phase+xi*0.35)*H*0.020+Math.sin(a.phase*1.7+xi*0.55)*H*0.009;
        ctx.lineTo(rx, sy+wave+thickness);
       }
       ctx.closePath();ctx.fill();
      }
     }

     /* ── MONTAGNES fond — très lointaines ── */
     drawMountains('rgba(18,38,72,0.60)',
      [[0.00,0.20],[0.08,0.42],[0.18,0.28],[0.28,0.55],[0.38,0.35],[0.48,0.62],[0.58,0.40],[0.68,0.50],[0.78,0.32],[0.88,0.48],[0.96,0.25],[1.02,0.18]],
      H*0.58,H*0.52);

     /* ── MONTAGNES milieu — glacier bleu ── */
     drawMountains('rgba(28,65,115,0.82)',
      [[0.00,0.18],[0.10,0.38],[0.20,0.24],[0.30,0.52],[0.42,0.30],[0.52,0.60],[0.62,0.35],[0.74,0.48],[0.84,0.28],[0.94,0.42],[1.02,0.15]],
      H*0.65,H*0.45);

     /* Reflets bleutés sur les montagnes */
     const mRefG=ctx.createLinearGradient(0,H*0.30,0,H*0.65);
     mRefG.addColorStop(0,'rgba(100,180,255,0.06)');
     mRefG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mRefG;ctx.fillRect(0,H*0.30,W,H*0.35);

     /* ── MONTAGNES avant ── */
     drawMountains('rgba(18,48,88,0.92)',
      [[0.00,0.10],[0.12,0.28],[0.24,0.15],[0.36,0.40],[0.48,0.20],[0.60,0.35],[0.72,0.18],[0.84,0.32],[0.96,0.14],[1.02,0.08]],
      H*0.72,H*0.35);

     /* ── STALACTITES en haut ── */
     drawStalactites(0,16,'rgba(140,195,235,0.35)');

     /* ── PLAINE DE GLACE ── */
     const iceG=ctx.createLinearGradient(0,H*0.72,0,H);
     iceG.addColorStop(0,'rgba(120,185,235,0.95)');
     iceG.addColorStop(0.3,'rgba(160,210,245,0.98)');
     iceG.addColorStop(0.7,'rgba(200,230,252,0.99)');
     iceG.addColorStop(1,'rgba(220,240,255,1.0)');
     ctx.fillStyle=iceG;ctx.fillRect(0,H*0.72,W,H*0.28);

     /* Fissures dans la glace */
     ctx.strokeStyle='rgba(80,150,210,0.25)';ctx.lineWidth=0.8;
     const cracks=[[0.15,0.78,0.32,0.82],[0.45,0.76,0.58,0.80],[0.65,0.78,0.80,0.84],[0.20,0.86,0.35,0.90],[0.55,0.84,0.68,0.88]];
     for(const [x1,y1,x2,y2] of cracks){
      ctx.beginPath();ctx.moveTo(x1*W,y1*H);
      ctx.bezierCurveTo((x1+x2)/2*W+W*0.02,y1*H,(x1+x2)/2*W-W*0.02,y2*H,x2*W,y2*H);
      ctx.stroke();
     }

     /* Reflet des aurores sur la glace */
     for(const a of auroras){
      const rfG=ctx.createLinearGradient(a.x,H*0.72,a.x+a.w,H);
      rfG.addColorStop(0,`${a.col}0)`);
      rfG.addColorStop(0.3,`${a.col}${0.06*Math.abs(Math.sin(a.phase))})`);
      rfG.addColorStop(1,`${a.col}0)`);
      ctx.fillStyle=rfG;ctx.fillRect(a.x,H*0.72,a.w,H*0.28);
     }

     /* ── SAPINS enneigés ── */
     drawTree(W*0.08,H*0.76,H*0.16);
     drawTree(W*0.14,H*0.76,H*0.11);
     drawTree(W*0.78,H*0.76,H*0.14);
     drawTree(W*0.85,H*0.76,H*0.18);
     drawTree(W*0.91,H*0.76,H*0.10);

     /* ── PERSONNAGES au premier plan — côte à côte dans le tiers bas ── */
     /* Sid — paresseux, gauche, plus petit */
     drawSid(W*0.22,H*0.815,H*0.10);
     /* Diego — tigre, droite, taille moyenne */
     drawDiego(W*0.78,H*0.810,H*0.115);
     /* Manny — mammouth, centre, légèrement plus grand */
     drawMammoth(W*0.50,H*0.820,H*0.155);

     /* ── Buttes de neige en bas ── */
     ctx.fillStyle='rgba(215,235,252,0.85)';
     for(const [bx,by,br] of [[0.08,0.88,0.10],[0.88,0.90,0.09],[0.50,0.94,0.14],[0.25,0.92,0.08],[0.72,0.91,0.09]]){
      ctx.beginPath();ctx.ellipse(bx*W,by*H,br*W,H*0.038,0,0,Math.PI*2);ctx.fill();
     }

     /* ── FLOCONS ── */
     for(const f of flakes){
      f.y+=f.vy;f.x+=f.vx;f.wb+=f.wSpd;f.x+=Math.sin(f.wb)*0.20;
      if(f.y>H+8){f.y=-8;f.x=Math.random()*W;}
      if(f.x<-8)f.x=W+8;if(f.x>W+8)f.x=-8;
      ctx.fillStyle=`rgba(255,255,255,${f.op})`;
      ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();
     }

     /* ── SCRAT — petit, extrême gauche, ne gêne pas les personnages principaux ── */
     scrat.run+=0.06;
     scrat.jTimer++;
     if(scrat.jTimer>20){scrat.jTimer=0;scrat.jx=(Math.random()-0.5)*1;scrat.jy=(Math.random()-0.5)*0.5;}
     const scX=W*0.06+Math.sin(t*0.3)*W*0.015+scrat.jx;
     const scY=H*0.870+scrat.jy;
     ctx.save();ctx.scale(0.55,0.55);
     drawScrat(scX/0.55,scY/0.55,scrat.run);
     ctx.restore();

     /* ── Vignette douce ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.08,cx,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.45,'rgba(0,0,0,0.08)');
     vg.addColorStop(1,'rgba(0,0,0,0.75)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* ── Fondu bas ── */
     const fd=ctx.createLinearGradient(0,H*0.80,0,H);
     fd.addColorStop(0,'rgba(0,0,0,0)');fd.addColorStop(1,'rgba(0,0,0,0.82)');
     ctx.fillStyle=fd;ctx.fillRect(0,H*0.80,W,H*0.20);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
