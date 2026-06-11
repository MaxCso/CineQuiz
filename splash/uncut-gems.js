// CinéQuiz splash chunk — Uncut Gems
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Uncut Gems"]={
   name:'Uncut Gems',
   color:'60,200,180',
   ref:'Uncut Gems \u2014 Benny & Josh Safdie, 2019',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2,cy=H/2;
    let _s=document.getElementById('_ug_s');
    if(!_s){_s=document.createElement('style');_s.id='_ug_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Particules étoilées — 3 couches ── */
    const dust=Array.from({length:120},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.14, vy:(Math.random()-0.5)*0.10,
     r:Math.random()*1.8+0.3,
     ph:Math.random()*Math.PI*2, spd:0.015+Math.random()*0.030,
     hue:220+Math.random()*80, /* bleu→violet */
     op:0.10+Math.random()*0.35,
    }));

    /* Grandes particules lumineuses qui orbitent */
    const orbs=Array.from({length:22},(_,i)=>({
     angle:(i/22)*Math.PI*2,
     dist:W*(0.20+Math.random()*0.28),
     spd:(Math.random()-0.5)*0.006,
     r:W*(0.008+Math.random()*0.016),
     ph:Math.random()*Math.PI*2,
     hue:200+Math.random()*100,
    }));

    /* Éclats de lumière depuis le sommet */
    const flares=Array.from({length:18},(_,i)=>({
     angle:(i/18)*Math.PI*2,
     ph:Math.random()*Math.PI*2,
     spd:0.020+Math.random()*0.025,
    }));

    /* Base du cristal en bas de l'écran */
    const gemBaseY=H*0.96;
    const gemCX=cx;

    function drawCrystalCluster(){
     /* Groupe de cristaux inspiré de l'affiche — pointus, anguleux, bleu-violet */
     const base=gemBaseY;

     /* Définition des cristaux : {cx offset, largeur, hauteur, angle penché, type} */
     const crystals=[
      /* Petits arrière-plan gauche */
      {ox:-W*0.32,w:W*0.048,h:H*0.14,lean:-0.25,z:0,hue:230},
      {ox:-W*0.22,w:W*0.038,h:H*0.10,lean:-0.15,z:0,hue:245},
      /* Petit avant gauche */
      {ox:-W*0.18,w:W*0.055,h:H*0.18,lean:-0.10,z:1,hue:240},
      /* Grand central gauche */
      {ox:-W*0.08,w:W*0.090,h:H*0.38,lean:-0.08,z:2,hue:250},
      /* Cristal central PRINCIPAL — le plus grand */
      {ox: 0,     w:W*0.115,h:H*0.48,lean: 0.00,z:3,hue:255,main:true},
      /* Grand central droit */
      {ox: W*0.09,w:W*0.082,h:H*0.34,lean: 0.10,z:2,hue:245},
      /* Petits avant droit */
      {ox: W*0.18,w:W*0.060,h:H*0.20,lean: 0.12,z:1,hue:235},
      {ox: W*0.25,w:W*0.042,h:H*0.12,lean: 0.18,z:0,hue:225},
      /* Très petit bord droit */
      {ox: W*0.31,w:W*0.030,h:H*0.08,lean: 0.22,z:0,hue:220},
     ];

     /* Trier par z pour le rendu */
     crystals.sort((a,b)=>a.z-b.z);

     for(const cr of crystals){
      const bx=gemCX+cr.ox;
      const tipX=bx+cr.h*Math.sin(cr.lean);
      const tipY=base-cr.h;
      const hw=cr.w/2;
      /* Demi-largeur qui diminue au sommet */
      const lx=bx-hw, rx=bx+hw; /* base */

      /* ── Face principale (avant) ── */
      const facePulse=0.72+Math.sin(t*1.4+cr.ox)*0.12;
      const faceG=ctx.createLinearGradient(tipX,tipY,bx,base);
      faceG.addColorStop(0.00,`hsla(${cr.hue+20},95%,${cr.main?88:78}%,${0.22*facePulse})`);
      faceG.addColorStop(0.25,`hsla(${cr.hue},88%,65%,${0.75*facePulse})`);
      faceG.addColorStop(0.55,`hsla(${cr.hue-10},80%,45%,${0.85*facePulse})`);
      faceG.addColorStop(1.00,`hsla(${cr.hue-20},75%,30%,0.95)`);
      ctx.fillStyle=faceG;
      ctx.beginPath();
      ctx.moveTo(tipX,tipY);
      ctx.lineTo(rx,base);
      ctx.lineTo(lx,base);
      ctx.closePath();ctx.fill();

      /* ── Face gauche (ombre) ── */
      const sideG=ctx.createLinearGradient(tipX,tipY,lx,base);
      sideG.addColorStop(0,`hsla(${cr.hue+30},90%,70%,0.15)`);
      sideG.addColorStop(1,`hsla(${cr.hue},70%,25%,0.95)`);
      ctx.fillStyle=sideG;
      ctx.beginPath();
      ctx.moveTo(tipX,tipY);
      ctx.lineTo(lx,base);
      ctx.lineTo(lx-hw*0.30,base);
      ctx.lineTo(tipX-cr.w*0.22,tipY+cr.h*0.12);
      ctx.closePath();ctx.fill();

      /* ── Face droite (reflet) ── */
      const reflG=ctx.createLinearGradient(tipX,tipY,rx,base);
      reflG.addColorStop(0,`hsla(${cr.hue+40},100%,85%,${0.35*facePulse})`);
      reflG.addColorStop(0.4,`hsla(${cr.hue+20},90%,60%,0.40)`);
      reflG.addColorStop(1,`hsla(${cr.hue},75%,30%,0.80)`);
      ctx.fillStyle=reflG;
      ctx.beginPath();
      ctx.moveTo(tipX,tipY);
      ctx.lineTo(rx+hw*0.25,base);
      ctx.lineTo(rx,base);
      ctx.closePath();ctx.fill();

      /* ── Contour néon ── */
      ctx.strokeStyle=`hsla(${cr.hue+30},100%,82%,${0.30+Math.sin(t*1.8+cr.ox)*0.12})`;
      ctx.lineWidth=cr.main?2.0:1.2;ctx.lineJoin='round';
      ctx.beginPath();ctx.moveTo(tipX,tipY);ctx.lineTo(rx,base);ctx.lineTo(lx,base);ctx.closePath();ctx.stroke();

      /* ── Ligne centrale de reflet ── */
      const lc=lx+(rx-lx)*0.38;
      const lcG=ctx.createLinearGradient(tipX,tipY,lc,base);
      lcG.addColorStop(0,`rgba(220,210,255,${0.55*facePulse})`);
      lcG.addColorStop(0.5,`rgba(180,160,255,0.20)`);
      lcG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.strokeStyle=lcG;ctx.lineWidth=cr.main?2.5:1.5;
      ctx.beginPath();ctx.moveTo(tipX,tipY);ctx.lineTo(lc,base);ctx.stroke();

      /* ── Bulles internes (comme l'affiche) ── */
      if(cr.z>=1){
       const nb=cr.main?5:2;
       for(let bi=0;bi<nb;bi++){
        const bpx=bx+(Math.sin(bi*2.3+cr.ox)*hw*0.55);
        const bpy=base-cr.h*(0.25+bi*0.14);
        const br=cr.w*(0.06+Math.random()*0.06);
        const bg2=ctx.createRadialGradient(bpx,bpy,0,bpx,bpy,br);
        bg2.addColorStop(0,`hsla(${cr.hue+60},90%,75%,${0.30+Math.sin(t+bi)*0.10})`);
        bg2.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=bg2;ctx.beginPath();ctx.arc(bpx,bpy,br,0,Math.PI*2);ctx.fill();
       }
      }

      /* ── Flash de pointe sur le cristal principal ── */
      if(cr.main){
       const flashPulse=0.55+Math.sin(t*2.2)*0.45;
       const fg=ctx.createRadialGradient(tipX,tipY,0,tipX,tipY,W*0.12);
       fg.addColorStop(0,`rgba(255,255,255,${0.75*flashPulse})`);
       fg.addColorStop(0.15,`rgba(200,190,255,${0.45*flashPulse})`);
       fg.addColorStop(0.40,`rgba(120,100,255,${0.18*flashPulse})`);
       fg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=fg;ctx.fillRect(tipX-W*0.12,tipY-W*0.12,W*0.24,W*0.24);
       /* Rayon vertical */
       const rayG=ctx.createLinearGradient(tipX,tipY-H*0.20,tipX,tipY);
       rayG.addColorStop(0,'rgba(255,255,255,0)');
       rayG.addColorStop(0.6,`rgba(230,220,255,${0.25*flashPulse})`);
       rayG.addColorStop(1,`rgba(255,255,255,${0.60*flashPulse})`);
       ctx.strokeStyle=rayG;ctx.lineWidth=W*0.004;
       ctx.beginPath();ctx.moveTo(tipX,tipY-H*0.20);ctx.lineTo(tipX,tipY);ctx.stroke();
       /* Croix de lumière */
       ctx.strokeStyle=`rgba(255,255,255,${0.35*flashPulse})`;ctx.lineWidth=W*0.002;
       ctx.beginPath();ctx.moveTo(tipX-W*0.06,tipY);ctx.lineTo(tipX+W*0.06,tipY);ctx.stroke();
      }
     }

     /* ── Halo de base — lueur sous les cristaux ── */
     const baseGlow=ctx.createRadialGradient(gemCX,base,0,gemCX,base,W*0.52);
     baseGlow.addColorStop(0,`rgba(80,50,200,${0.30+Math.sin(t*0.5)*0.06})`);
     baseGlow.addColorStop(0.4,'rgba(50,20,150,0.14)');
     baseGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=baseGlow;ctx.fillRect(0,base-H*0.18,W,H*0.22);
    }

    function frame(){
     if(stop.v)return;

     /* Fond noir profond */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#03010e');bg.addColorStop(0.4,'#05021a');bg.addColorStop(1,'#020108');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halos colorés de fond */
     for(const [hx,hy,hr,col] of [
      [cx*0.50,H*0.70,W*0.55,`rgba(60,20,160,${0.16+Math.sin(t*0.18)*0.04})`],
      [cx*1.50,H*0.60,W*0.48,`rgba(20,10,120,${0.12+Math.sin(t*0.22)*0.03})`],
      [cx,     H*0.55,W*0.38,`rgba(100,40,200,${0.10+Math.sin(t*0.15)*0.03})`],
     ]){
      const hg=ctx.createRadialGradient(hx,hy,0,hx,hy,hr);
      hg.addColorStop(0,col);hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.fillRect(0,0,W,H);
     }

     /* Poussière d'étoiles */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.ph+=d.spd;
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;if(d.y<0)d.y=H;if(d.y>H)d.y=0;
      const da=d.op*(0.4+0.6*Math.abs(Math.sin(d.ph)));
      const dg=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*2.8);
      dg.addColorStop(0,`hsla(${d.hue+t*20},90%,75%,${da*0.7})`);
      dg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=dg;ctx.beginPath();ctx.arc(d.x,d.y,d.r*2.8,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`hsla(${d.hue+t*20},95%,88%,${da})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* Orbes orbitaux */
     for(const orb of orbs){
      orb.angle+=orb.spd;orb.ph+=0.025;
      const ox=gemCX+Math.cos(orb.angle)*orb.dist;
      const oy=gemBaseY-H*0.24+Math.sin(orb.angle)*orb.dist*0.35;
      const oa=0.20+Math.abs(Math.sin(orb.ph))*0.55;
      const og=ctx.createRadialGradient(ox,oy,0,ox,oy,orb.r*4);
      og.addColorStop(0,`hsla(${orb.hue+t*25},90%,78%,${oa*0.8})`);
      og.addColorStop(0.4,`hsla(${orb.hue+30},85%,60%,${oa*0.3})`);
      og.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=og;ctx.beginPath();ctx.arc(ox,oy,orb.r*4,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`hsla(${orb.hue+t*25},95%,92%,${oa})`;
      ctx.beginPath();ctx.arc(ox,oy,orb.r,0,Math.PI*2);ctx.fill();
     }

     /* Éclats de lumière depuis le cristal principal */
     const tipX=gemCX, tipY=gemBaseY-H*0.48;
     for(const fl of flares){
      fl.ph+=fl.spd;
      const flen=W*(0.06+0.18*Math.abs(Math.sin(fl.ph)));
      const fop=0.10+0.45*Math.abs(Math.sin(fl.ph));
      const fx=tipX+Math.cos(fl.angle)*flen;
      const fy=tipY+Math.sin(fl.angle)*flen;
      const flG=ctx.createLinearGradient(tipX,tipY,fx,fy);
      flG.addColorStop(0,`rgba(255,255,255,${fop})`);
      flG.addColorStop(0.5,`rgba(200,180,255,${fop*0.4})`);
      flG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.strokeStyle=flG;ctx.lineWidth=W*(0.002+0.003*Math.abs(Math.sin(fl.ph)));
      ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(tipX,tipY);ctx.lineTo(fx,fy);ctx.stroke();
     }

     /* Cluster de cristaux */
     drawCrystalCluster();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.08,cx,H*0.45,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.35,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.70,'rgba(0,0,0,0.45)');
     vg.addColorStop(1,'rgba(0,0,0,0.96)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain pellicule */
     for(let i=0;i<30;i++){
      ctx.fillStyle=`rgba(${160+Math.random()*60|0},${80+Math.random()*80|0},${220+Math.random()*35|0},${Math.random()*0.014})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
