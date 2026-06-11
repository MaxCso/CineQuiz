// CinéQuiz splash chunk — The Place Beyond the Pines
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["The Place Beyond the Pines"]={
   name:'The Place Beyond the Pines',
   color:'80,140,180',
   ref:'The Place Beyond the Pines \u2014 Derek Cianfrance, 2012',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _pbS=document.getElementById('_pb_s');
    if(!_pbS){_pbS=document.createElement('style');_pbS.id='_pb_s';document.head.appendChild(_pbS);}
    _pbS.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(240,248,255,0.90)!important;font-size:14px!important;text-shadow:0 1px 10px rgba(10,30,20,0.80)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _pbW=setInterval(()=>{if(stop.v){_pbS.textContent='';clearInterval(_pbW);}},200);

    /* ── Moto SVG (sprite_05.svg, ratio 330/804) ── */
    const _motoImg=new Image();
    _motoImg.src='images/sprite_05.svg';
    let _motoReady=false;
    let _motoOC=null; /* offscreen canvas recolorisé */
    _motoImg.onload=()=>{
      _motoReady=true;
      /* Recolorise le SVG en gris-blanc clair via compositing */
      const oc=document.createElement('canvas');
      oc.width=330;oc.height=804;
      const ot=oc.getContext('2d');
      ot.drawImage(_motoImg,0,0,330,804);
      ot.globalCompositeOperation='source-in';
      ot.fillStyle='rgba(200,195,185,1)'; /* gris chaud clair */
      ot.fillRect(0,0,330,804);
      _motoOC=oc;
    };

    /* ── Particules de poussière/gravillons ── */
    const dustP=Array.from({length:28},()=>({
      x:0,y:0,vx:0,vy:0,life:0,maxLife:0,r:0,active:false,
    }));
    let dustTimer=0;

    function spawnDust(mx,my,tilt){
      dustTimer++;
      if(dustTimer%3!==0)return;
      const p=dustP.find(p=>!p.active)||dustP[0];
      const mh=H*0.13,mw=mh*(330/804);
      const wheelX=mx - Math.cos(tilt)*mw*0.32;
      const wheelY=my - Math.sin(tilt)*mw*0.32 + H*0.005;
      p.x=wheelX+(Math.random()-0.5)*mw*0.18;
      p.y=wheelY;
      p.vx=(Math.random()-0.5)*1.8 - 0.5;
      p.vy=-(Math.random()*1.4+0.3);
      p.life=1.0;
      p.maxLife=18+Math.random()*18;
      p.r=W*(0.004+Math.random()*0.005);
      p.active=true;
    }

    function getMotoPos(){
      const phase=t*0.25;
      const amp=W*0.10;
      const mx=cx - amp*Math.sin(phase+0.45)*0.55;
      const my=H*0.74;
      return {mx,my};
    }

    /* ── SVG Pins ── */
    const pin1Img=new Image();let pin1Ready=false;
    pin1Img.onload=()=>{pin1Ready=true;};
    pin1Img.src='images/pin1.svg';
    const PIN1_RATIO=699/1687; /* largeur/hauteur */

    const pin2Img=new Image();let pin2Ready=false;
    pin2Img.onload=()=>{pin2Ready=true;};
    pin2Img.src='images/pin2.svg';
    const PIN2_RATIO=993/1706;

    /* ── Génération des rangées de pins le long de la route ── */
    function srng(n){let s=(n*1664525+1013904223)&0xffffffff;return((s>>>0)/4294967296);}

    /* Chaque pin : z (profondeur 0.05→1), côté ('L'/'R'), variante (0=pin1, 1=pin2) */
    /* On génère des z régulièrement espacés pour avoir une belle rangée */
    const ROAD_PINS=[];
    const N_ROWS=16; /* pins par côté */
    for(let i=0;i<N_ROWS;i++){
      const z=0.06+(i/(N_ROWS-1))*0.94; /* du plus lointain au plus proche */
      const variant=i%2; /* alterner pin1/pin2 */
      /* Décalage latéral léger pour moins de rigidité */
      const jitterL=srng(i*5)*0.028;
      const jitterR=srng(i*5+1)*0.028;
      ROAD_PINS.push({z,side:'L',variant,jitter:jitterL});
      ROAD_PINS.push({z,side:'R',variant,jitter:jitterR});
    }
    ROAD_PINS.sort((a,b)=>a.z-b.z); /* du plus lointain au plus proche */

    /* ── Étoiles ── */
    const VP={x:cx, y:H*0.44};
    const roadBaseY=H;

    const stars=Array.from({length:90},()=>({
      x:Math.random()*W,
      y:Math.random()*(VP.y*0.88),
      r:Math.random()*1.1+0.2,
      op:0.3+Math.random()*0.65,
      ph:Math.random()*Math.PI*2,
      twinkleSpd:0.020+Math.random()*0.045,
    }));

    /* ── Éclairs ── */
    const lightning={
      active:false,
      timer:Math.floor(180+Math.random()*320),
      alpha:0,
      x:0,
      branches:[],
    };
    function buildLightning(lx){
      const segs=[];
      let sy=VP.y*0.05, sx=lx;
      const endY=VP.y*0.85;
      while(sy<endY){
        const segH=H*(0.035+Math.random()*0.055);
        const nx=sx+(Math.random()-0.5)*W*0.12;
        segs.push({x1:sx,y1:sy,x2:nx,y2:sy+segH});
        /* Branche secondaire occasionnelle */
        if(Math.random()<0.35){
          const bx2=nx+(Math.random()-0.5)*W*0.10;
          const by2=sy+segH*(0.6+Math.random()*0.6);
          segs.push({x1:nx,y1:sy+segH,x2:bx2,y2:by2,branch:true});
        }
        sy+=segH;sx=nx;
      }
      return segs;
    }

    /* ── Brume légère qui dérive ── */
    const mists=Array.from({length:5},(_,i)=>({
      x:Math.random()*W*1.2-W*0.1,
      y:H*(0.38+i*0.05+Math.random()*0.04),
      w:W*(0.45+Math.random()*0.50),
      op:0.04+Math.random()*0.06,
      ph:Math.random()*Math.PI*2,
      spd:0.003+Math.random()*0.004,
      dx:0.06+Math.random()*0.14,
    }));

    /* ── Pluie fine ── */
    const rain=Array.from({length:55},()=>({
      x:Math.random()*W,
      y:Math.random()*H,
      len:H*(0.014+Math.random()*0.018),
      spd:H*0.009+Math.random()*H*0.006,
      op:0.05+Math.random()*0.09,
      w:0.3+Math.random()*0.4,
    }));

    /* ── Calcul de la position X du bord de la route à une profondeur z ── */
    function roadEdgeX(z,side){
      /* La route fait un triangle de VP.x vers 0 (gauche) et W (droite) */
      const baseHalfW=W*0.50; /* demi-largeur en bas */
      const edgeX=VP.x+(side==='L'?-1:1)*baseHalfW*z;
      return edgeX;
    }

    function drawSky(){
      /* Ciel nuit — bleu-nuit profond avec nuance forêt et légère lueur d'horizon */
      const sky=ctx.createLinearGradient(0,0,0,VP.y+H*0.08);
      sky.addColorStop(0.00,'#0a0f1a');  /* bleu nuit quasi noir */
      sky.addColorStop(0.25,'#0f1c2a');  /* bleu marine profond */
      sky.addColorStop(0.55,'#152535');  /* bleu-vert forêt */
      sky.addColorStop(0.82,'#1a3030');  /* vert-bleu horizon boisé */
      sky.addColorStop(1.00,'#1e3428');  /* vert forêt sombre à l'horizon */
      ctx.fillStyle=sky;ctx.fillRect(0,0,W,VP.y+H*0.10);

      /* Étoiles scintillantes */
      for(const s of stars){
        s.ph+=s.twinkleSpd;
        const a=s.op*(0.55+0.45*Math.sin(s.ph));
        ctx.fillStyle=`rgba(220,235,255,${a})`;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
      }

      /* Légère lueur froide à l'horizon — lune cachée derrière les arbres */
      const horizG=ctx.createLinearGradient(0,VP.y-H*0.06,0,VP.y+H*0.04);
      horizG.addColorStop(0,'rgba(0,0,0,0)');
      horizG.addColorStop(0.6,`rgba(80,140,120,${0.08+Math.sin(t*0.15)*0.02})`);
      horizG.addColorStop(1,`rgba(60,110,90,${0.14+Math.sin(t*0.12)*0.03})`);
      ctx.fillStyle=horizG;ctx.fillRect(0,VP.y-H*0.06,W,H*0.12);

      /* Nuages lourds — ton bleu-nuit */
      for(let ci=0;ci<7;ci++){
        const cx2=W*(0.05+ci*0.15)+Math.sin(t*0.012+ci*1.3)*W*0.015;
        const cy2=H*(0.03+ci*0.04);
        const cg=ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,W*0.18);
        cg.addColorStop(0,`rgba(18,28,42,${0.40+Math.sin(t*0.02+ci)*0.05})`);
        cg.addColorStop(0.5,'rgba(12,20,32,0.18)');
        cg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=cg;ctx.beginPath();ctx.ellipse(cx2,cy2,W*0.18,H*0.032,0,0,Math.PI*2);ctx.fill();
      }

      /* Lisière de cimes à l'horizon — placée AU NIVEAU du VP, pas au-dessus
         pour ne pas couper les pins SVG qui sont plus bas */
      const treeLineY=VP.y+H*0.01;
      /* Couleur vert sapin sombre */
      ctx.fillStyle='rgba(8,22,14,0.96)';
      ctx.beginPath();ctx.moveTo(0,treeLineY+H*0.03);
      for(let xi=0;xi<=W;xi+=W*0.016){
        const tip=treeLineY-H*(0.025+Math.abs(Math.sin(xi*0.022+12.3))*0.045+Math.abs(Math.sin(xi*0.042+7.1))*0.030);
        ctx.lineTo(xi,tip);
      }
      ctx.lineTo(W,treeLineY+H*0.03);ctx.closePath();ctx.fill();
    }

    function drawRoad(){
      /* Asphalte mouillé */
      const rg=ctx.createLinearGradient(0,VP.y,0,roadBaseY);
      rg.addColorStop(0,'rgba(28,36,32,0.94)');
      rg.addColorStop(0.25,'rgba(22,30,26,0.97)');
      rg.addColorStop(0.70,'rgba(16,22,20,1.0)');
      rg.addColorStop(1,'rgba(12,18,15,1.0)');
      ctx.fillStyle=rg;
      ctx.beginPath();
      ctx.moveTo(VP.x,VP.y);
      ctx.lineTo(0,roadBaseY);
      ctx.lineTo(W,roadBaseY);
      ctx.closePath();ctx.fill();

      /* Reflet central froid */
      const wetG=ctx.createLinearGradient(0,VP.y,0,roadBaseY);
      wetG.addColorStop(0,`rgba(60,90,80,${0.14+Math.sin(t*0.35)*0.03})`);
      wetG.addColorStop(0.4,'rgba(45,70,62,0.08)');
      wetG.addColorStop(1,'rgba(30,50,45,0.04)');
      ctx.fillStyle=wetG;
      ctx.beginPath();
      ctx.moveTo(VP.x,VP.y);
      ctx.lineTo(cx-W*0.10,roadBaseY);
      ctx.lineTo(cx+W*0.10,roadBaseY);
      ctx.closePath();ctx.fill();

      /* Flaque */
      const puddleY=H*0.82;
      const puddleG=ctx.createRadialGradient(cx,puddleY,0,cx,puddleY,W*0.06);
      puddleG.addColorStop(0,`rgba(80,120,110,${0.12+Math.sin(t*0.6)*0.04})`);
      puddleG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=puddleG;ctx.beginPath();ctx.ellipse(cx,puddleY,W*0.06,H*0.012,0,0,Math.PI*2);ctx.fill();

      /* Lignes jaunes */
      for(let i=0;i<10;i++){
        const f0=i/10, f1=(i+0.45)/10;
        const y0=VP.y+(roadBaseY-VP.y)*f0;
        const y1=VP.y+(roadBaseY-VP.y)*f1;
        const x0l=VP.x-(roadBaseY-VP.y)*f0*0.042;
        const x0r=VP.x+(roadBaseY-VP.y)*f0*0.042;
        const x1l=VP.x-(roadBaseY-VP.y)*f1*0.042;
        const x1r=VP.x+(roadBaseY-VP.y)*f1*0.042;
        const lw=Math.max(0.8,(f0+f1)*0.5*W*0.009);
        ctx.strokeStyle=`rgba(185,165,42,${0.45+f0*0.28})`;
        ctx.lineWidth=lw;
        ctx.beginPath();ctx.moveTo(x0l,y0);ctx.lineTo(x1l,y1);ctx.stroke();
        ctx.beginPath();ctx.moveTo(x0r,y0);ctx.lineTo(x1r,y1);ctx.stroke();
      }

      /* Bords blancs */
      ctx.strokeStyle='rgba(160,180,170,0.22)';ctx.lineWidth=W*0.005;
      ctx.beginPath();ctx.moveTo(VP.x,VP.y);ctx.lineTo(0,roadBaseY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(VP.x,VP.y);ctx.lineTo(W,roadBaseY);ctx.stroke();
    }

    function drawPines(){
      if(!pin1Ready&&!pin2Ready)return;
      for(const pin of ROAD_PINS){
        const img=pin.variant===0?pin1Img:pin2Img;
        const ratio=pin.variant===0?PIN1_RATIO:PIN2_RATIO;
        if(!(pin.variant===0?pin1Ready:pin2Ready))continue;

        const baseY=VP.y+(roadBaseY-VP.y)*pin.z;

        /* Plus hauts — 15% à 60% de H selon la profondeur */
        const pinH=H*(0.15+pin.z*0.45);
        const pinW=pinH*ratio;

        const edgeX=roadEdgeX(pin.z,pin.side);
        const margin=pinW*0.06+pin.jitter*W*0.4;
        const pinX=(pin.side==='L')
          ? edgeX - pinW - margin
          : edgeX + margin;

        /* Opacité : pins lointains visibles, proches pleine opacité */
        const alpha=0.72+pin.z*0.28;

        ctx.save();
        ctx.globalAlpha=alpha;
        ctx.drawImage(img, pinX, baseY-pinH, pinW, pinH);
        ctx.restore();
      }
    }

    function drawMist(){
      for(const m of mists){
        m.ph+=m.spd;m.x+=m.dx;
        if(m.x>W*1.1)m.x=-m.w;
        const pulse=0.70+0.30*Math.sin(m.ph);
        const mg=ctx.createLinearGradient(m.x,0,m.x+m.w,0);
        mg.addColorStop(0,'rgba(155,185,175,0)');
        mg.addColorStop(0.3,`rgba(155,185,175,${m.op*pulse})`);
        mg.addColorStop(0.7,`rgba(155,185,175,${m.op*pulse})`);
        mg.addColorStop(1,'rgba(155,185,175,0)');
        ctx.fillStyle=mg;
        ctx.beginPath();ctx.ellipse(m.x+m.w*0.5,m.y,m.w*0.5,H*0.025,0,0,Math.PI*2);ctx.fill();
      }
    }

    function drawRain(){
      ctx.save();
      for(const r of rain){
        r.y+=r.spd;r.x-=r.spd*0.08;
        if(r.y>H){r.y=-r.len;r.x=Math.random()*W;}
        ctx.strokeStyle=`rgba(150,180,170,${r.op})`;
        ctx.lineWidth=r.w;
        ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x-r.len*0.08,r.y+r.len);ctx.stroke();
      }
      ctx.restore();
    }

    function drawMoto(){
      if(!_motoReady)return;
      const {mx,my}=getMotoPos();
      const mh=H*0.13;
      const mw=mh*(330/804);
      const phase=t*0.25;
      const amp=W*0.10;
      const tilt=amp*Math.cos(phase+0.45)*0.55/H*0.15;
      const motoSrc=_motoOC||_motoImg; /* recolorisé si dispo, sinon original */

      /* Phare — cône vers l'horizon */
      const headX=mx + Math.cos(tilt)*mw*0.28;
      const headY=my - mh*0.82;
      const beamLen=H*0.18;
      const beamW=W*0.055;
      const beamG=ctx.createLinearGradient(headX,headY,headX,headY-beamLen);
      beamG.addColorStop(0,`rgba(255,240,200,${0.28+Math.sin(t*3.5)*0.06})`);
      beamG.addColorStop(0.35,`rgba(255,230,160,${0.14+Math.sin(t*3.5)*0.04})`);
      beamG.addColorStop(1,'rgba(255,220,120,0)');
      ctx.save();ctx.globalAlpha=0.85;
      ctx.fillStyle=beamG;
      ctx.beginPath();
      ctx.moveTo(headX-W*0.008,headY);
      ctx.lineTo(headX-beamW,headY-beamLen);
      ctx.lineTo(headX+beamW,headY-beamLen);
      ctx.lineTo(headX+W*0.008,headY);
      ctx.closePath();ctx.fill();
      ctx.restore();

      /* Traîne motion blur */
      const trailCount=5;
      for(let gi=trailCount;gi>=1;gi--){
        const trailPhase=phase - gi*0.022;
        const trailX=cx - amp*Math.sin(trailPhase+0.45)*0.55;
        const trailTilt=amp*Math.cos(trailPhase+0.45)*0.55/H*0.15;
        const trailAlpha=(trailCount-gi+1)/trailCount * 0.18;
        ctx.save();ctx.globalAlpha=trailAlpha;
        ctx.translate(trailX,my);ctx.rotate(trailTilt);
        ctx.drawImage(motoSrc,-mw/2,-mh,mw,mh);
        ctx.restore();
      }
      /* Moto principale */
      ctx.save();ctx.globalAlpha=0.93;
      ctx.translate(mx,my);ctx.rotate(tilt);
      ctx.drawImage(motoSrc,-mw/2,-mh,mw,mh);
      ctx.restore();

      /* Ombre */
      const sg=ctx.createRadialGradient(mx,my+2,0,mx,my+6,mw*0.85);
      sg.addColorStop(0,'rgba(8,18,8,0.38)');sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.ellipse(mx+mw*0.10,my+4,mw*0.85,mw*0.20,0,0,Math.PI*2);ctx.fill();

      /* Poussière */
      spawnDust(mx,my,tilt);
      for(const p of dustP){
        if(!p.active)continue;
        p.x+=p.vx;p.y+=p.vy;p.vy+=0.04;p.life-=1/p.maxLife;
        if(p.life<=0){p.active=false;continue;}
        ctx.fillStyle=`rgba(160,155,140,${p.life*0.50})`;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);ctx.fill();
      }
    }

    function frame(){
      if(stop.v) return;

      ctx.fillStyle='#0a0f1a'; ctx.fillRect(0,0,W,H);

      drawSky();
      drawRoad();
      drawPines();
      drawMist();

      /* ── Éclairs ── */
      lightning.timer--;
      if(lightning.timer<=0&&!lightning.active){
        lightning.active=true;
        lightning.alpha=0.92+Math.random()*0.08;
        lightning.x=W*(0.15+Math.random()*0.70);
        lightning.branches=buildLightning(lightning.x);
        lightning.timer=Math.floor(200+Math.random()*400);
      }
      if(lightning.active){
        /* Flash de ciel */
        const flashLum=lightning.alpha*0.18;
        ctx.fillStyle=`rgba(180,210,255,${flashLum})`;
        ctx.fillRect(0,0,W,VP.y+H*0.08);
        /* Branches */
        ctx.save();
        for(const seg of lightning.branches){
          ctx.strokeStyle=seg.branch
            ?`rgba(160,200,255,${lightning.alpha*0.55})`
            :`rgba(220,235,255,${lightning.alpha})`;
          ctx.lineWidth=seg.branch?0.8:1.4;
          ctx.shadowColor='rgba(150,200,255,0.9)';
          ctx.shadowBlur=seg.branch?6:12;
          ctx.beginPath();ctx.moveTo(seg.x1,seg.y1);ctx.lineTo(seg.x2,seg.y2);ctx.stroke();
        }
        ctx.restore();
        lightning.alpha-=0.06;
        if(lightning.alpha<=0){lightning.active=false;lightning.alpha=0;}
      }

      drawRain();
      drawMoto();

      /* Vignette douce */
      const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.90);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.52,'rgba(12,25,18,0.06)');
      vg.addColorStop(0.78,'rgba(12,25,18,0.42)');
      vg.addColorStop(1,'rgba(8,18,12,0.90)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain humide léger */
      for(let i=0;i<22;i++){
        const gv=110+Math.random()*55|0;
        ctx.fillStyle=`rgba(${gv},${gv+18},${gv+25},${Math.random()*0.015})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
