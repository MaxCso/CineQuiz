// CinéQuiz splash chunk — E.T.
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["E.T."]={
   name:'E.T.',
   color:'80,40,120',
   ref:'E.T. l\u2019extra-terrestre \u2014 Steven Spielberg, 1982',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;

    let _s=document.getElementById('_et_s');
    if(!_s){_s=document.createElement('style');_s.id='_et_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:68%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* SVG vélo+ET — viewBox 0 0 570 459 */
    const etImg=new Image();let etReady=false;
    etImg.onload=()=>{etReady=true;};etImg.src='images/E_T.svg';
    const ET_W=W*0.52, ET_H=W*0.52*(459/570);

    /* Vélo traverse de gauche à droite devant la lune */
    let bikeX=-ET_W, bikeSpd=W*0.0014;
    const bikeY=H*0.38-ET_H*0.55;

    /* SVG Sapin — viewBox 0 0 744 1280, ratio 0.581 */
    const sapinImg=new Image();let sapinReady=false;
    sapinImg.onload=()=>{sapinReady=true;};sapinImg.src='images/Sapin.svg';

    /* Disposition des sapins — comme l'affiche : groupe dense à droite, quelques-uns à gauche */
    /* Chaque sapin: {x, h (hauteur cible)} — x en fraction de W, h en fraction de H */
    const sapinDefs=[
     /* Gauche — 3 sapins isolés, tailles variées */
     {xr:0.02, hr:0.42},{xr:0.08, hr:0.52},{xr:0.15, hr:0.38},
     /* Centre gauche — transition */
     {xr:0.28, hr:0.30},{xr:0.34, hr:0.36},
     /* Droite — groupe dense comme l'affiche */
     {xr:0.55, hr:0.35},{xr:0.61, hr:0.48},{xr:0.67, hr:0.55},
     {xr:0.73, hr:0.62},{xr:0.79, hr:0.50},{xr:0.85, hr:0.44},
     {xr:0.91, hr:0.38},{xr:0.97, hr:0.32},
    ];

    /* Étoiles */
    const stars=Array.from({length:160},()=>({
     x:Math.random()*W, y:Math.random()*H*0.58,
     r:Math.random()*1.4+0.2,
     op:0.20+Math.random()*0.70,
     ph:Math.random()*Math.PI*2,
     spd:0.010+Math.random()*0.025,
    }));

    /* Étoiles filantes */
    const shootingStars=Array.from({length:3},(_,i)=>({
     x:Math.random()*W, y:Math.random()*H*0.35,
     len:W*(0.08+Math.random()*0.10),
     angle:Math.PI/6+Math.random()*0.3,
     spd:W*(0.008+Math.random()*0.006),
     op:0, life:0, delay:i*180+Math.random()*120,
     timer:i*180+Math.random()*120,
    }));



    function drawSapin(px,baseY,targetH){
     if(!sapinReady)return;
     const targetW=targetH*(744/1280);
     ctx.drawImage(sapinImg, px-targetW/2, baseY-targetH, targetW, targetH);
    }

    function frame(){
     if(stop.v)return;

     /* Ciel violet/indigo — fidèle à l'affiche */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#0d0818');
     bg.addColorStop(0.20,'#150d2e');
     bg.addColorStop(0.45,'#1e1040');
     bg.addColorStop(0.68,'#2a1548');
     bg.addColorStop(0.82,'#1a0e30');
     bg.addColorStop(1.00,'#080510');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo violet doux en haut à droite — nuance affiche */
     const purpleG=ctx.createRadialGradient(W*0.72,H*0.12,0,W*0.72,H*0.12,W*0.55);
     purpleG.addColorStop(0,'rgba(120,60,180,0.18)');
     purpleG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=purpleG;ctx.fillRect(0,0,W,H*0.50);

     /* ── Immeubles de Compton — silhouettes sombres ── */
     const horizY=H*0.68;
     /* Rangée arrière — plus petits, plus lointains */
     ctx.fillStyle='rgba(10,12,20,0.92)';
     const bldgsBack=[
      {x:0,      w:W*0.08, h:H*0.12},
      {x:W*0.07, w:W*0.05, h:H*0.08},
      {x:W*0.11, w:W*0.10, h:H*0.15},
      {x:W*0.20, w:W*0.06, h:H*0.09},
      {x:W*0.25, w:W*0.09, h:H*0.13},
      {x:W*0.33, w:W*0.07, h:H*0.07},
      {x:W*0.39, w:W*0.11, h:H*0.11},
      {x:W*0.49, w:W*0.08, h:H*0.14},
      {x:W*0.56, w:W*0.06, h:H*0.08},
      {x:W*0.61, w:W*0.10, h:H*0.12},
      {x:W*0.70, w:W*0.07, h:H*0.10},
      {x:W*0.76, w:W*0.09, h:H*0.15},
      {x:W*0.84, w:W*0.06, h:H*0.09},
      {x:W*0.89, w:W*0.12, h:H*0.13},
     ];
     for(const b of bldgsBack){
      ctx.fillRect(b.x, horizY-b.h, b.w, b.h);
      /* Quelques fenêtres allumées */
      for(let wy=horizY-b.h+H*0.010;wy<horizY-H*0.008;wy+=H*0.022){
       for(let wx=b.x+W*0.008;wx<b.x+b.w-W*0.008;wx+=W*0.020){
        if(Math.sin(wx*9+wy*5+t*0.05)>0.35){
         ctx.fillStyle=`rgba(200,160,60,${0.12+Math.random()*0.06})`;
         ctx.fillRect(wx,wy,W*0.008,H*0.010);
         ctx.fillStyle='rgba(10,12,20,0.92)';
        }
       }
      }
     }

     /* Rangée avant — maisons basses de Compton */
     ctx.fillStyle='rgba(12,14,22,0.96)';
     const bldgsFront=[
      {x:0,      w:W*0.12, h:H*0.065},
      {x:W*0.11, w:W*0.10, h:H*0.055},
      {x:W*0.20, w:W*0.14, h:H*0.070},
      {x:W*0.33, w:W*0.10, h:H*0.050},
      {x:W*0.42, w:W*0.12, h:H*0.062},
      {x:W*0.53, w:W*0.11, h:H*0.058},
      {x:W*0.63, w:W*0.13, h:H*0.068},
      {x:W*0.75, w:W*0.10, h:H*0.055},
      {x:W*0.84, w:W*0.17, h:H*0.060},
     ];
     for(const b of bldgsFront){
      ctx.fillRect(b.x, horizY-b.h, b.w, b.h);
      /* Toit plat avec petit parapet */
      ctx.fillStyle='rgba(16,18,28,0.98)';
      ctx.fillRect(b.x-W*0.003, horizY-b.h-H*0.006, b.w+W*0.006, H*0.006);
      ctx.fillStyle='rgba(12,14,22,0.96)';
      /* Fenêtre ou porte allumée */
      if(Math.sin(b.x*3.7+t*0.04)>0.20){
       ctx.fillStyle=`rgba(220,170,60,${0.16+Math.sin(t*0.5+b.x)*0.04})`;
       ctx.fillRect(b.x+b.w*0.35, horizY-b.h*0.55, b.w*0.22, b.h*0.32);
       ctx.fillStyle='rgba(12,14,22,0.96)';
      }
     }

     /* Lueur orange du smog entre les bâtiments — effet profondeur */
     const cityGlowG=ctx.createLinearGradient(0,horizY-H*0.15,0,horizY);
     cityGlowG.addColorStop(0,'rgba(180,85,8,0.0)');
     cityGlowG.addColorStop(0.5,`rgba(180,85,8,${0.06+Math.sin(t*0.12)*0.015})`);
     cityGlowG.addColorStop(1,'rgba(180,85,8,0.0)');
     ctx.fillStyle=cityGlowG;ctx.fillRect(0,horizY-H*0.15,W,H*0.15);

     /* Étoiles scintillantes */
     for(const s of stars){
      s.ph+=s.spd;
      const op=s.op*(0.45+0.55*Math.abs(Math.sin(s.ph)));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(225,220,255,${op})`;ctx.fill();
     }

     /* Étoiles filantes */
     for(const ss of shootingStars){
      ss.timer--;
      if(ss.timer<=0){
       ss.x=Math.random()*W*0.7;ss.y=Math.random()*H*0.30;
       ss.op=0.90;ss.life=1.0;ss.timer=220+Math.random()*180;
      }
      if(ss.life>0){
       ss.x+=Math.cos(ss.angle)*ss.spd;
       ss.y+=Math.sin(ss.angle)*ss.spd;
       ss.life-=0.022;ss.op=ss.life*0.90;
       const tx=ss.x-Math.cos(ss.angle)*ss.len;
       const ty=ss.y-Math.sin(ss.angle)*ss.len;
       const sg=ctx.createLinearGradient(tx,ty,ss.x,ss.y);
       sg.addColorStop(0,'rgba(200,210,255,0)');
       sg.addColorStop(1,`rgba(220,230,255,${ss.op})`);
       ctx.strokeStyle=sg;ctx.lineWidth=1.5;
       ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(ss.x,ss.y);ctx.stroke();
      }
     }

     /* Grande lune bleue — élément iconique */
     const moonR=W*0.40;
     const moonX=cx, moonY=H*0.38;
     /* Halo extérieur lune */
     const moonHalo=ctx.createRadialGradient(moonX,moonY,moonR*0.85,moonX,moonY,moonR*1.35);
     moonHalo.addColorStop(0,`rgba(80,140,220,${0.22+Math.sin(t*0.4)*0.04})`);
     moonHalo.addColorStop(0.5,'rgba(50,100,180,0.08)');
     moonHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=moonHalo;ctx.beginPath();ctx.arc(moonX,moonY,moonR*1.35,0,Math.PI*2);ctx.fill();
     /* Corps de la lune — base bleue */
     ctx.save();
     ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.clip();
     const moonG=ctx.createRadialGradient(moonX-moonR*0.12,moonY-moonR*0.10,moonR*0.02,moonX+moonR*0.08,moonY+moonR*0.05,moonR*1.05);
     moonG.addColorStop(0.00,'rgba(210,238,255,1.0)');
     moonG.addColorStop(0.18,'rgba(170,215,250,1.0)');
     moonG.addColorStop(0.45,'rgba(110,175,230,1.0)');
     moonG.addColorStop(0.72,'rgba(70,135,210,1.0)');
     moonG.addColorStop(1.00,'rgba(40,90,175,1.0)');
     ctx.fillStyle=moonG;ctx.fillRect(moonX-moonR,moonY-moonR,moonR*2,moonR*2);
     /* Taches nuageuses — comme l'affiche */
     const clouds=[
      {ox:-0.05,oy:-0.28,rx:0.38,ry:0.22,op:0.14},
      {ox: 0.20,oy:-0.10,rx:0.28,ry:0.18,op:0.10},
      {ox:-0.25,oy: 0.15,rx:0.32,ry:0.20,op:0.12},
      {ox: 0.10,oy: 0.32,rx:0.40,ry:0.16,op:0.09},
      {ox:-0.10,oy: 0.05,rx:0.20,ry:0.28,op:0.08},
      {ox: 0.30,oy:-0.35,rx:0.22,ry:0.14,op:0.11},
     ];
     for(const c of clouds){
      const cg=ctx.createRadialGradient(moonX+c.ox*moonR,moonY+c.oy*moonR,0,moonX+c.ox*moonR,moonY+c.oy*moonR,c.rx*moonR);
      cg.addColorStop(0,`rgba(200,228,250,${c.op+Math.sin(t*0.18)*0.02})`);
      cg.addColorStop(0.5,`rgba(180,215,245,${c.op*0.5})`);
      cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;
      ctx.beginPath();ctx.ellipse(moonX+c.ox*moonR,moonY+c.oy*moonR,c.rx*moonR,c.ry*moonR,0,0,Math.PI*2);ctx.fill();
     }
     /* Reflet lumineux en haut à gauche */
     const shine=ctx.createRadialGradient(moonX-moonR*0.22,moonY-moonR*0.28,0,moonX-moonR*0.15,moonY-moonR*0.20,moonR*0.55);
     shine.addColorStop(0,`rgba(230,245,255,${0.28+Math.sin(t*0.3)*0.04})`);
     shine.addColorStop(0.4,'rgba(210,235,255,0.08)');
     shine.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shine;ctx.fillRect(moonX-moonR,moonY-moonR,moonR*2,moonR*2);
     /* Bord légèrement plus sombre */
     const rim=ctx.createRadialGradient(moonX,moonY,moonR*0.82,moonX,moonY,moonR);
     rim.addColorStop(0,'rgba(0,0,0,0)');
     rim.addColorStop(1,'rgba(20,50,120,0.35)');
     ctx.fillStyle=rim;ctx.fillRect(moonX-moonR,moonY-moonR,moonR*2,moonR*2);
     ctx.restore();
     /* Halo extérieur post-clip */
     ctx.strokeStyle='rgba(120,180,240,0.22)';ctx.lineWidth=3;
     ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.stroke();

     /* SVG vélo+ET qui traverse devant la lune */
     bikeX+=bikeSpd;
     if(bikeX>W+ET_W*0.5) bikeX=-ET_W;
     if(etReady){
      /* Clip sur la lune pour que le vélo reste en silhouette quand il sort */
      ctx.save();
      ctx.globalAlpha=0.97;
      /* Légère oscillation verticale */
      const bikeFloat=Math.sin(t*0.9)*H*0.006;
      ctx.drawImage(etImg,bikeX,bikeY+bikeFloat,ET_W,ET_H);
      ctx.restore();
     }

     /* Sol collines */
     const hillY=H*0.88;
     const hillG=ctx.createLinearGradient(0,hillY,0,H);
     hillG.addColorStop(0,'rgba(5,4,12,0.97)');
     hillG.addColorStop(1,'rgba(3,2,8,0.99)');
     ctx.fillStyle=hillG;
     ctx.beginPath();
     ctx.moveTo(-5,H);ctx.lineTo(-5,hillY+H*0.04);
     ctx.quadraticCurveTo(cx*0.5,hillY-H*0.03,cx,hillY);
     ctx.quadraticCurveTo(cx*1.5,hillY+H*0.03,W+5,hillY+H*0.02);
     ctx.lineTo(W+5,H);ctx.closePath();ctx.fill();

     /* Sapins SVG — comme l'affiche */
     if(sapinReady){
      ctx.save();
      /* Teinter en silhouette noire/bleu très sombre */
      for(const sd of sapinDefs){
       const sx=sd.xr*W;
       const sh=sd.hr*H;
       const sw=sh*(744/1280);
       /* Dessiner sur canvas offscreen pour teinter */
       const oc=document.createElement('canvas');
       oc.width=Math.ceil(sw);oc.height=Math.ceil(sh);
       const ot=oc.getContext('2d');
       ot.drawImage(sapinImg,0,0,sw,sh);
       ot.globalCompositeOperation='source-in';
       ot.fillStyle='rgba(4,3,14,0.97)';
       ot.fillRect(0,0,sw,sh);
       ctx.drawImage(oc,sx-sw/2,hillY-sh);
      }
      ctx.restore();
     }

     /* Lueur douce au bas de la lune — horizon chaud */
     const horizG=ctx.createLinearGradient(0,H*0.55,0,hillY);
     horizG.addColorStop(0,'rgba(0,0,0,0)');
     horizG.addColorStop(1,'rgba(60,40,100,0.18)');
     ctx.fillStyle=horizG;ctx.fillRect(0,H*0.55,W,hillY-H*0.55);

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.12,cx,H*0.45,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(5,2,12,0.18)');
     vg.addColorStop(1,'rgba(3,1,8,0.82)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
