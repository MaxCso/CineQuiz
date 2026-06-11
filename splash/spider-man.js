// CinéQuiz splash chunk — Spider-Man
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Spider-Man"]={
   name:'Spider-Man',
   color:'200,20,20',
   ref:'Spider-Man \u2014 Sam Raimi, 2002',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2, cy=H*0.36;
    const SPOKES=28, RINGS=11;
    const MAX_R=Math.min(W,H)*0.72;

    let _spStyle=document.getElementById('_sp_splash_style');
    if(!_spStyle){_spStyle=document.createElement('style');_spStyle.id='_sp_splash_style';document.head.appendChild(_spStyle);}
    _spStyle.textContent='#splash-content-wrap{top:72%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _spWatch=setInterval(()=>{if(stop.v){_spStyle.textContent='';clearInterval(_spWatch);}},200);

    /* ── Charger l'image SVG Spider-Man ── */
    const spiderImg=new Image();
    let spiderReady=false;
    spiderImg.onload=()=>{spiderReady=true;};
    spiderImg.src='images/sprite_01.svg';

    /* ── Pendulum / swing physics ── */
    /* Spider-Man se balance depuis un point d'ancrage en haut */
    const ANCHOR_X = W*0.72;   /* point d'attache de la toile en haut à droite */
    const ANCHOR_Y = H*0.04;
    const ROPE_LEN = H*0.38;   /* longueur du fil */
    let swingAngle = -Math.PI*0.28;  /* angle initial (gauche) */
    let swingVel   = 0.008;          /* vitesse angulaire initiale */
    const GRAVITY  = 0.00018;
    const DAMPING  = 0.9992;         /* légère résistance de l'air */

    /* ── Gouttelettes de rosée ── */
    const drops=[];
    for(let r=1;r<=RINGS;r+=1){
     for(let s=0;s<SPOKES;s+=2){
      drops.push({spoke:s,ring:r,phase:Math.random()*Math.PI*2,
       size:Math.random()*2.5+0.7,op:Math.random()*0.55+0.20});
     }
    }

    /* ── Particules rouge/bleu ── */
    const dots=Array.from({length:55},()=>({
     x:Math.random()*W, y:Math.random()*H,
     r:Math.random()*2.0+0.3,
     hue:Math.random()>0.55?350:215,
     op:Math.random()*0.30+0.06,
     vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25
    }));

    /* ── Skyline de New York ── */
    const buildings=[
     {x:0,      w:W*0.07, h:H*0.24},{x:W*0.05, w:W*0.05, h:H*0.16},
     {x:W*0.09, w:W*0.09, h:H*0.32},{x:W*0.17, w:W*0.06, h:H*0.20},
     {x:W*0.22, w:W*0.05, h:H*0.26},{x:W*0.26, w:W*0.08, h:H*0.38},
     {x:W*0.33, w:W*0.05, h:H*0.19},{x:W*0.37, w:W*0.06, h:H*0.28},
     {x:W*0.42, w:W*0.09, h:H*0.42},{x:W*0.50, w:W*0.06, h:H*0.24},
     {x:W*0.55, w:W*0.08, h:H*0.34},{x:W*0.62, w:W*0.05, h:H*0.18},
     {x:W*0.66, w:W*0.09, h:H*0.40},{x:W*0.74, w:W*0.06, h:H*0.25},
     {x:W*0.79, w:W*0.05, h:H*0.21},{x:W*0.83, w:W*0.08, h:H*0.30},
     {x:W*0.90, w:W*0.05, h:H*0.17},{x:W*0.94, w:W*0.06, h:H*0.26},
    ];

    /* ── Vibration de la toile ── */
    let vibPhase=0, vibAmp=0;

    /* ── Traîne de mouvement ── */
    const trailPts=[];

    function webPoint(spoke,ring,extraWobble){
     const a=(spoke/SPOKES)*Math.PI*2;
     const baseR=(ring/RINGS)*MAX_R;
     const vibOffset=vibAmp*Math.sin(t*8-ring*0.7)*Math.cos(a*2+spoke*0.3)*2.5;
     const wobble=Math.sin(t*0.9+spoke*0.6+ring*0.4)*2.2+
                  Math.sin(t*1.8+spoke*1.1)*1.4*(extraWobble||1)+vibOffset;
     return{x:cx+Math.cos(a)*(baseR+wobble),y:cy+Math.sin(a)*(baseR+wobble)*0.80};
    }

    function drawWeb(){
     for(let s=0;s<SPOKES;s++){
      const p1=webPoint(s,RINGS,1);
      const lg=ctx.createLinearGradient(cx,cy,p1.x,p1.y);
      lg.addColorStop(0,'rgba(230,225,250,0.38)');
      lg.addColorStop(0.35,'rgba(210,210,240,0.20)');
      lg.addColorStop(1,'rgba(185,195,225,0.07)');
      ctx.strokeStyle=lg;ctx.lineWidth=0.9;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(p1.x,p1.y);ctx.stroke();
     }
     for(let r=1;r<=RINGS;r++){
      const alpha=0.28-r*0.016;
      const shimmer=0.05+Math.sin(t*1.1+r*0.5+vibPhase)*0.035;
      ctx.beginPath();
      for(let s=0;s<=SPOKES;s++){
       const p=webPoint(s%SPOKES,r,1);
       s===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);
      }
      ctx.closePath();
      ctx.strokeStyle=`rgba(215,218,240,${alpha+shimmer})`;
      ctx.lineWidth=r===1?1.1:0.65;ctx.stroke();
      if(r%2===1){
       ctx.strokeStyle=`rgba(255,255,255,${0.06+Math.sin(t*0.7+r)*0.03})`;
       ctx.lineWidth=0.35;ctx.stroke();
      }
     }
     const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,10);
     cg.addColorStop(0,'rgba(230,225,255,0.65)');
     cg.addColorStop(1,'rgba(180,185,230,0)');
     ctx.fillStyle=cg;ctx.beginPath();ctx.arc(cx,cy,10,0,Math.PI*2);ctx.fill();
    }

    function drawDrops(){
     for(const d of drops){
      const p=webPoint(d.spoke,d.ring,1);
      const pulse=0.6+Math.sin(t*1.5+d.phase)*0.4;
      const dg=ctx.createRadialGradient(p.x-d.size*0.35,p.y-d.size*0.35,0,p.x,p.y,d.size*2.0);
      dg.addColorStop(0,`rgba(225,238,255,${d.op*pulse})`);
      dg.addColorStop(0.4,`rgba(185,205,245,${d.op*pulse*0.4})`);
      dg.addColorStop(1,'rgba(150,170,225,0)');
      ctx.fillStyle=dg;
      ctx.beginPath();ctx.arc(p.x,p.y,d.size*pulse,0,Math.PI*2);ctx.fill();
     }
    }

    function drawSkyline(){
     const cityG=ctx.createLinearGradient(0,H*0.72,0,H);
     cityG.addColorStop(0,'rgba(0,0,0,0)');
     cityG.addColorStop(0.4,`rgba(200,30,15,${0.08+Math.sin(t*0.3)*0.02})`);
     cityG.addColorStop(1,`rgba(240,50,15,${0.14+Math.sin(t*0.25)*0.02})`);
     ctx.fillStyle=cityG;ctx.fillRect(0,H*0.72,W,H*0.28);
     for(const b of buildings){
      ctx.fillStyle='rgba(4,2,8,0.97)';
      ctx.fillRect(b.x,H-b.h,b.w,b.h);
      if(b.h>H*0.28){
       ctx.beginPath();
       ctx.moveTo(b.x+b.w/2,H-b.h-b.h*0.10);
       ctx.lineTo(b.x+b.w*0.35,H-b.h);
       ctx.lineTo(b.x+b.w*0.65,H-b.h);
       ctx.closePath();ctx.fill();
      }
      const cols=Math.max(1,Math.floor(b.w/10));
      const rows=Math.floor(b.h/11);
      for(let r=1;r<rows;r++) for(let c=0;c<cols;c++){
       if(Math.sin(b.x*0.5+r*c*2.1+t*0.04)>0.18){
        const wx=b.x+c*(b.w/cols)+2, wy=H-b.h+r*11+2;
        const wp=0.5+Math.sin(t*0.35+r+c)*0.15;
        ctx.fillStyle=`rgba(255,${155+Math.sin(r*c)*20|0},45,${0.45*wp})`;
        ctx.fillRect(wx,wy,Math.max(2,b.w/cols-4),4);
       }
      }
     }
    }

    function drawSpiderMan(spBodyX, spBodyY){
     if(!spiderReady)return;
     /* SVG natif : 814 × 1059 (portrait) — corps du personnage */
     const spW = W*0.32;
     const spH = spW*(1059/814);
     /* ancrage = milieu du haut du corps (épaules ~15% du haut du SVG) */
     const drawX = spBodyX - spW*0.5;
     const drawY = spBodyY - spH*0.15; /* décale vers le bas pour que les mains soient en haut */

     /* Légère rotation selon le swing pour donner de la vie */
     const tilt = swingAngle * 0.25; /* corps incliné dans le sens du swing */
     ctx.save();
     ctx.translate(spBodyX, spBodyY);
     ctx.rotate(tilt);
     ctx.drawImage(spiderImg, -spW*0.5, -spH*0.15, spW, spH);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(0,0,0,0.13)';ctx.fillRect(0,0,W,H);

     vibPhase+=0.04;
     vibAmp=0.6+Math.sin(vibPhase*0.3)*0.4;

     /* Halos rouge/bleu */
     const rg=ctx.createRadialGradient(W*0.22,H*0.20,8,W*0.22,H*0.20,W*0.62);
     rg.addColorStop(0,`rgba(210,12,28,${0.14+Math.sin(t*0.5)*0.04})`);
     rg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);

     const bg=ctx.createRadialGradient(W*0.78,H*0.42,8,W*0.78,H*0.42,W*0.56);
     bg.addColorStop(0,`rgba(12,65,215,${0.12+Math.cos(t*0.4)*0.03})`);
     bg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     drawWeb();
     drawDrops();
     drawSkyline();

     /* ── Physique du pendule ── */
     swingVel += -GRAVITY * Math.sin(swingAngle);
     swingVel *= DAMPING;
     swingAngle += swingVel;
     /* Rebond si l'angle dépasse les limites */
     if(Math.abs(swingAngle)>Math.PI*0.32){swingVel*=-0.82;}

     /* Position de Spider-Man (extrémité du fil) */
     const spX = ANCHOR_X + Math.sin(swingAngle)*ROPE_LEN;
     const spY = ANCHOR_Y + Math.cos(swingAngle)*ROPE_LEN;

     /* Traîne */
     trailPts.push({x:spX,y:spY,op:0.18});
     if(trailPts.length>12)trailPts.shift();
     for(let i=0;i<trailPts.length-1;i++){
      const p=trailPts[i], pn=trailPts[i+1];
      const frac=i/trailPts.length;
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pn.x,pn.y);
      ctx.strokeStyle=`rgba(220,40,40,${frac*0.14})`;
      ctx.lineWidth=2+frac*4;ctx.stroke();
     }

     /* ── Dessin du fil de toile (depuis ancre → mains de Spider-Man) ── */
     /* Point main = haut du corps (environ 12% du SVG = ~30px sur H=844) */
     const handY = spY - (W*0.32)*(1059/814)*0.12;
     const handX = spX;

     /* Fil principal avec légère courbe de caténaire */
     const midX = (ANCHOR_X+handX)/2 + Math.sin(t*0.5)*4;
     const midY = (ANCHOR_Y+handY)/2 + Math.abs(swingAngle)*18 + 10;

     ctx.beginPath();
     ctx.moveTo(ANCHOR_X, ANCHOR_Y);
     ctx.quadraticCurveTo(midX, midY, handX, handY);
     const webGrad=ctx.createLinearGradient(ANCHOR_X,ANCHOR_Y,handX,handY);
     webGrad.addColorStop(0,'rgba(200,218,255,0.90)');
     webGrad.addColorStop(0.5,'rgba(220,230,255,0.75)');
     webGrad.addColorStop(1,'rgba(185,205,240,0.55)');
     ctx.strokeStyle=webGrad;
     ctx.lineWidth=1.8;ctx.stroke();

     /* Reflet brillant sur le fil */
     ctx.beginPath();
     ctx.moveTo(ANCHOR_X,ANCHOR_Y);
     ctx.quadraticCurveTo(midX-1,midY-1,handX,handY);
     ctx.strokeStyle='rgba(255,255,255,0.40)';
     ctx.lineWidth=0.7;ctx.stroke();

     /* Petit point d'ancrage lumineux */
     const ag=ctx.createRadialGradient(ANCHOR_X,ANCHOR_Y,0,ANCHOR_X,ANCHOR_Y,6);
     ag.addColorStop(0,'rgba(255,255,255,0.90)');
     ag.addColorStop(1,'rgba(180,200,255,0)');
     ctx.fillStyle=ag;
     ctx.beginPath();ctx.arc(ANCHOR_X,ANCHOR_Y,5,0,Math.PI*2);ctx.fill();

     /* ── Spider-Man ── */
     drawSpiderMan(spX, spY);

     /* Particules */
     for(const d of dots){
      d.x+=d.vx;d.y+=d.vy;
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      if(d.y<0)d.y=H;if(d.y>H)d.y=0;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${d.hue},80%,68%,${d.op})`;ctx.fill();
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(W/2,H/2,H*0.10,W/2,H/2,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,'rgba(0,0,8,0.20)');
     vg.addColorStop(1,'rgba(0,0,5,0.90)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
