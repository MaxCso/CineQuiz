// CinéQuiz splash chunk — La Mémoire dans la peau
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["La Mémoire dans la peau"]={
   name:'La M\u00e9moire dans la peau',
   color:'80,120,160',
   ref:'The Bourne Identity \u2014 Doug Liman, 2002',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _boS=document.getElementById('_bo_s');
    if(!_boS){_boS=document.createElement('style');_boS.id='_bo_s';document.head.appendChild(_boS);}
    _boS.textContent=`
     

     #splash-content-wrap{top:50%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(180,220,255,0.88)!important;font-size:14px!important;text-shadow:0 1px 10px rgba(0,20,60,0.90)!important;font-family:monospace!important;}
     #splash-film-logo{max-width:62%!important;filter:drop-shadow(0 0 8px rgba(60,140,255,0.4))!important;}
    `;
    const _boW=setInterval(()=>{if(stop.v){_boS.textContent='';clearInterval(_boW);}},200);

    /* ══ GRILLE TOPOGRAPHIQUE ══ */
    /* Vue satellite/carte — lignes de latitude/longitude */

    /* ══ CIBLE DE SURVEILLANCE ══ */
    let targetX=cx, targetY=H*0.48;
    let targetDestX=cx, targetDestY=H*0.48;
    let targetTimer=0;

    /* ══ NŒUDS DE DONNÉES — villes + codes ══ */
    const CITIES=[
      'ZURICH','PARIS','BERLIN','ROME','VIENNE','AMSTERDAM',
      'PRAGUE','BUDAPEST','MADRID','BRUXELLES',
    ];
    const OPS=[
      'TREADSTONE','BLACKBRIAR','OPERATION MEDUSA',
      'ASSET: DELTA','STATUS: ACTIVE','CLEARANCE: OMEGA',
      'PRIORITY: ELIMINATE','LOCATION: UNKNOWN',
    ];
    const dataNodes=Array.from({length:12},(_,i)=>({
      x:Math.random()*W*0.82+W*0.09,
      y:Math.random()*H*0.75+H*0.12,
      label:CITIES[i%CITIES.length],
      op:OPS[Math.floor(Math.random()*OPS.length)],
      alpha:0,
      targetAlpha:0.5+Math.random()*0.4,
      ph:Math.random()*Math.PI*2,
      spd:0.008+Math.random()*0.012,
      active:false,
      activeTimer:0,
      activeDur:80+Math.random()*120,
    }));
    /* Activer les nœuds progressivement */
    let nodeTimer=0;

    /* ══ LIGNES DE CONNEXION ENTRE NŒUDS ══ */
    const connections=[];
    for(let i=0;i<6;i++){
      connections.push({
        a:Math.floor(Math.random()*12),
        b:Math.floor(Math.random()*12),
        alpha:0,
        ph:Math.random()*Math.PI*2,
        spd:0.006+Math.random()*0.010,
      });
    }

    /* ══ TEXTE DE DONNÉES DÉFILANT ══ */
    const dataLines=Array.from({length:8},(_,i)=>({
      x: i%2===0 ? W*0.04 : W*0.56,
      y:H*(0.12+i*0.095),
      text: i%2===0
        ? ['LAT: 47.3769° N','LAT: 48.8566° N','LAT: 52.5200° N','LAT: 41.9028° N'][i%4]
        : ['LON: 8.5417° E','LON: 2.3522° E','LON: 13.4050° E','LON: 12.4964° E'][i%4],
      alpha:0.08+Math.random()*0.14,
      ph:Math.random()*Math.PI*2,
      spd:0.005+Math.random()*0.008,
    }));

    /* ══ FRAGMENTS DE CODE QUI APPARAISSENT/DISPARAISSENT ══ */
    const codeFrags=Array.from({length:18},(_,i)=>({
      x:Math.random()*W,
      y:Math.random()*H,
      chars: Math.random()<0.5
        ? (Math.random()*999999|0).toString(16).toUpperCase().padStart(6,'0')
        : ['A1B','C4F','38E','91D','2A7','F3C','08B','5E9'][i%8],
      alpha:0,
      life:0, maxLife:60+Math.random()*90,
      ph:Math.random()*Math.PI*2,
    }));
    let fragTimer=0;

    /* ══ PARTICULES DE SCAN ══ */
    const scanLine={y:0, spd:H*0.0018, alpha:0.12};

    function drawGrid(){
      /* Grille de base — style carte topographique */
      ctx.strokeStyle='rgba(30,70,140,0.18)';
      ctx.lineWidth=0.5;
      const gridSize=W*0.088;
      for(let gx=0;gx<W;gx+=gridSize){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();
      }
      for(let gy=0;gy<H;gy+=gridSize){
        ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();
      }

      /* Grille secondaire plus fine */
      ctx.strokeStyle='rgba(20,50,110,0.10)';
      ctx.lineWidth=0.3;
      const subGrid=gridSize/4;
      for(let gx=0;gx<W;gx+=subGrid){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();
      }
      for(let gy=0;gy<H;gy+=subGrid){
        ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();
      }

      /* Points d'intersection */
      ctx.fillStyle='rgba(40,90,180,0.20)';
      for(let gx=0;gx<W;gx+=gridSize){
        for(let gy=0;gy<H;gy+=gridSize){
          ctx.beginPath();ctx.arc(gx,gy,1.2,0,Math.PI*2);ctx.fill();
        }
      }
    }

    function drawConnections(){
      for(const c of connections){
        c.ph+=c.spd;
        const pulse=0.3+0.7*Math.abs(Math.sin(c.ph));
        const na=dataNodes[c.a], nb=dataNodes[c.b];
        if(!na.active||!nb.active) continue;
        /* Ligne animée — tirets qui courent */
        const dx=nb.x-na.x, dy=nb.y-na.y;
        const len=Math.hypot(dx,dy);
        const dashLen=20, gapLen=15;
        const offset=(t*60)%(dashLen+gapLen);
        ctx.setLineDash([dashLen,gapLen]);
        ctx.lineDashOffset=-offset;
        ctx.strokeStyle=`rgba(40,120,255,${pulse*0.35})`;
        ctx.lineWidth=W*0.0025;
        ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineDashOffset=0;
      }
    }

    function drawNodes(){
      nodeTimer++;
      if(nodeTimer%45===0){
        const inactive=dataNodes.filter(n=>!n.active);
        if(inactive.length>0){
          const pick=inactive[Math.floor(Math.random()*inactive.length)];
          pick.active=true; pick.activeTimer=0;
          pick.x=Math.random()*W*0.80+W*0.10;
          pick.y=Math.random()*H*0.72+H*0.14;
        }
      }

      ctx.font=`${W*0.024}px monospace`;
      ctx.textAlign='left';

      for(const n of dataNodes){
        if(!n.active) continue;
        n.activeTimer++;
        n.ph+=n.spd;

        /* Fade in/out */
        if(n.activeTimer<20) n.alpha=n.activeTimer/20*n.targetAlpha;
        else if(n.activeTimer>n.activeDur-20) n.alpha=(n.activeDur-n.activeTimer)/20*n.targetAlpha;
        else n.alpha=n.targetAlpha*(0.85+0.15*Math.sin(n.ph));
        if(n.activeTimer>=n.activeDur){ n.active=false; n.alpha=0; continue; }

        const a=n.alpha;

        /* Point central */
        ctx.fillStyle=`rgba(80,160,255,${a*0.95})`;
        ctx.beginPath();ctx.arc(n.x,n.y,W*0.010,0,Math.PI*2);ctx.fill();

        /* Anneau */
        ctx.strokeStyle=`rgba(60,140,255,${a*0.60})`;
        ctx.lineWidth=W*0.003;
        ctx.beginPath();ctx.arc(n.x,n.y,W*0.022,0,Math.PI*2);ctx.stroke();

        /* Anneau secondaire pulsant */
        const pR=W*(0.032+0.008*Math.sin(n.ph*2));
        ctx.strokeStyle=`rgba(40,100,220,${a*0.25})`;
        ctx.lineWidth=W*0.0015;
        ctx.beginPath();ctx.arc(n.x,n.y,pR,0,Math.PI*2);ctx.stroke();

        /* Étiquette ville */
        ctx.fillStyle=`rgba(140,200,255,${a*0.90})`;
        ctx.font=`bold ${W*0.026}px monospace`;
        ctx.fillText(n.label, n.x+W*0.030, n.y-W*0.008);

        /* Coordonnées sous le label */
        ctx.fillStyle=`rgba(80,150,220,${a*0.65})`;
        ctx.font=`${W*0.018}px monospace`;
        ctx.fillText(n.op.substring(0,16), n.x+W*0.030, n.y+W*0.016);

        /* Petites lignes de mesure */
        ctx.strokeStyle=`rgba(60,120,200,${a*0.40})`;
        ctx.lineWidth=W*0.0018;
        ctx.beginPath();ctx.moveTo(n.x+W*0.025,n.y);ctx.lineTo(n.x+W*0.025,n.y-W*0.010);ctx.stroke();
        ctx.beginPath();ctx.moveTo(n.x,n.y+W*0.025);ctx.lineTo(n.x+W*0.010,n.y+W*0.025);ctx.stroke();
      }
      ctx.textAlign='left';
    }

    function drawTarget(){
      /* Déplacer la cible vers une nouvelle dest toutes les N frames */
      targetTimer++;
      if(targetTimer>120+Math.random()*80){
        targetDestX=W*(0.20+Math.random()*0.60);
        targetDestY=H*(0.25+Math.random()*0.55);
        targetTimer=0;
      }
      targetX+=(targetDestX-targetX)*0.018;
      targetY+=(targetDestY-targetY)*0.018;

      const tr=W*0.055;
      const pulse=0.65+0.35*Math.sin(t*2.2);

      /* Croix de visée */
      ctx.strokeStyle=`rgba(255,80,60,${0.80*pulse})`;
      ctx.lineWidth=W*0.004;
      const gap=tr*0.45;
      /* Haut */
      ctx.beginPath();ctx.moveTo(targetX,targetY-tr);ctx.lineTo(targetX,targetY-gap);ctx.stroke();
      /* Bas */
      ctx.beginPath();ctx.moveTo(targetX,targetY+gap);ctx.lineTo(targetX,targetY+tr);ctx.stroke();
      /* Gauche */
      ctx.beginPath();ctx.moveTo(targetX-tr,targetY);ctx.lineTo(targetX-gap,targetY);ctx.stroke();
      /* Droite */
      ctx.beginPath();ctx.moveTo(targetX+gap,targetY);ctx.lineTo(targetX+tr,targetY);ctx.stroke();

      /* Cercle extérieur */
      ctx.strokeStyle=`rgba(255,60,40,${0.55*pulse})`;
      ctx.lineWidth=W*0.003;
      ctx.beginPath();ctx.arc(targetX,targetY,tr,0,Math.PI*2);ctx.stroke();

      /* Cercle intérieur */
      ctx.strokeStyle=`rgba(255,80,60,${0.40*pulse})`;
      ctx.lineWidth=W*0.002;
      ctx.beginPath();ctx.arc(targetX,targetY,tr*0.35,0,Math.PI*2);ctx.stroke();

      /* Point central rouge */
      ctx.fillStyle=`rgba(255,40,20,${0.90*pulse})`;
      ctx.beginPath();ctx.arc(targetX,targetY,W*0.008,0,Math.PI*2);ctx.fill();

      /* Coordonnées sous la cible */
      ctx.fillStyle=`rgba(255,100,80,${0.70*pulse})`;
      ctx.font=`${W*0.018}px monospace`;
      ctx.textAlign='center';
      const lat=(47.5+targetX/W*4).toFixed(4);
      const lon=(2.3+targetY/H*10).toFixed(4);
      ctx.fillText(`${lat}°N ${lon}°E`, targetX, targetY+tr+W*0.030);
      ctx.textAlign='left';
    }

    function drawDataLines(){
      ctx.font=`${W*0.018}px monospace`;
      for(const d of dataLines){
        d.ph+=d.spd;
        const pulse=0.5+0.5*Math.sin(d.ph);
        ctx.fillStyle=`rgba(50,110,200,${d.alpha*pulse})`;
        ctx.fillText(d.text, d.x, d.y);
      }
    }

    function drawCodeFrags(){
      fragTimer++;
      if(fragTimer%18===0){
        const dead=codeFrags.filter(f=>f.alpha<=0&&f.life<=0);
        if(dead.length>0){
          const pick=dead[Math.floor(Math.random()*dead.length)];
          pick.x=Math.random()*W;
          pick.y=Math.random()*H;
          pick.life=pick.maxLife;
          pick.chars=(Math.random()*999999|0).toString(16).toUpperCase().padStart(6,'0');
        }
      }
      ctx.font=`${W*0.020}px monospace`;
      for(const f of codeFrags){
        if(f.life<=0&&f.alpha<=0) continue;
        if(f.life>0){
          f.life--;
          const prog=f.life/f.maxLife;
          f.alpha=prog<0.1?prog*10*0.20:prog>0.85?(1-prog)*6.66*0.20:0.20;
        } else { f.alpha=0; }
        ctx.fillStyle=`rgba(30,90,180,${f.alpha})`;
        ctx.fillText(f.chars, f.x, f.y);
      }
    }

    function drawScanLine(){
      /* Ligne de scan qui descend lentement */
      scanLine.y=(scanLine.y+scanLine.spd)%H;
      const sg=ctx.createLinearGradient(0,scanLine.y-H*0.04,0,scanLine.y+H*0.012);
      sg.addColorStop(0,'rgba(40,100,220,0)');
      sg.addColorStop(0.7,`rgba(40,100,220,${scanLine.alpha})`);
      sg.addColorStop(1,'rgba(40,100,220,0)');
      ctx.fillStyle=sg; ctx.fillRect(0,scanLine.y-H*0.04,W,H*0.052);
    }

    function frame(){
      if(stop.v)return;

      /* Fond bleu-nuit très sombre */
      const bg=ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,'#010508');
      bg.addColorStop(0.5,'#020810');
      bg.addColorStop(1,'#010608');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      /* Halo central bleu — profondeur */
      const halo=ctx.createRadialGradient(cx,H*0.48,0,cx,H*0.48,W*0.65);
      halo.addColorStop(0,`rgba(15,50,130,${0.18+Math.sin(t*0.15)*0.04})`);
      halo.addColorStop(0.5,'rgba(8,30,80,0.08)');
      halo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo; ctx.fillRect(0,0,W,H);

      drawGrid();
      drawScanLine();
      drawConnections();
      drawNodes();
      drawTarget();
      drawDataLines();
      drawCodeFrags();

      /* Vignette */
      const vg=ctx.createRadialGradient(cx,H*0.48,H*0.05,cx,H*0.48,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.48,'rgba(1,4,12,0.08)');
      vg.addColorStop(0.75,'rgba(1,4,12,0.50)');
      vg.addColorStop(1,'rgba(1,3,10,0.96)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain bleu numérique */
      for(let i=0;i<18;i++){
        const gv=8+Math.random()*18|0;
        ctx.fillStyle=`rgba(${gv},${gv+15},${gv+40},${Math.random()*0.015})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
