// CinéQuiz splash chunk — Prisoners
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Prisoners"]={
   name:'Prisoners',
   color:'60,80,40',
   ref:'Prisoners \u2014 Denis Villeneuve, 2013',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _prS=document.getElementById('_pr_s');
    if(!_prS){_prS=document.createElement('style');_prS.id='_pr_s';document.head.appendChild(_prS);}
    _prS.textContent=`
     

     #splash-content-wrap{top:24%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(210,220,235,0.85)!important;font-size:14px!important;text-shadow:0 1px 8px rgba(10,20,35,0.7)!important;}
     #splash-film-logo{max-width:60%!important;}
    `;
    const _prW=setInterval(()=>{if(stop.v){_prS.textContent='';clearInterval(_prW);}},200);

    /* ── Loki.svg silhouette (65×155, ratio ~0.419) ── */
    const lokiImg=new Image(); let lokiReady=false;
    lokiImg.onload=()=>{ lokiReady=true; };
    lokiImg.src='images/Loki.svg';
    const LOKI_RATIO=65/155;

    /* ── Labyrinthe circulaire procédural ── */
    /* Algorithme : murs concentriques avec passages aléatoires seedés */
    const MAZE_RINGS=9;      /* nombre d'anneaux */
    const MAZE_R=W*0.36;     /* rayon extérieur */
    const MAZE_CX=cx;
    const MAZE_CY=H*0.38;

    /* Seed déterministe pour que le labyrinthe soit stable */
    function srng(s){ let x=Math.sin(s+1)*43758.5453; return x-Math.floor(x); }

    /* Pour chaque anneau r (0=centre, MAZE_RINGS-1=extérieur) :
       on découpe en segments angulaires et on place des "murs" ou "passages" */
    function buildMaze(){
      const rings=[];
      for(let r=0;r<MAZE_RINGS;r++){
        /* Nombre de segments augmente avec le rayon */
        const segs=4+r*3;
        const walls=[];
        /* Chaque segment peut avoir un mur radial (séparateur entre segments) */
        for(let s=0;s<segs;s++){
          /* ~65% de murs — passages aléatoires */
          walls.push(srng(r*97+s*13+7)>0.35);
        }
        /* Mur circulaire : segments sans passage vers l'anneau suivant */
        const radOpen=[];
        for(let s=0;s<segs;s++){
          radOpen.push(srng(r*53+s*29+3)>0.55);
        }
        rings.push({segs, walls, radOpen});
      }
      return rings;
    }
    const mazeData=buildMaze();

    function drawMaze(alpha, rotOffset){
      ctx.save();
      ctx.translate(MAZE_CX, MAZE_CY);
      ctx.rotate(rotOffset);

      const lineW=W*0.0055;
      /* Couleur : légèrement plus foncée que le fond — exactement comme l'affiche */
      const mazeCol=`rgba(42,54,70,${alpha})`;

      for(let r=0;r<MAZE_RINGS;r++){
        const {segs, walls, radOpen}=mazeData[r];
        const innerR=(r/MAZE_RINGS)*MAZE_R;
        const outerR=((r+1)/MAZE_RINGS)*MAZE_R;
        const midR=(innerR+outerR)*0.5;

        /* Mur circulaire extérieur de cet anneau */
        ctx.strokeStyle=mazeCol;
        ctx.lineWidth=lineW;
        ctx.beginPath();
        ctx.arc(0,0,outerR,0,Math.PI*2);
        ctx.stroke();

        /* Murs radiaux (séparateurs entre segments) */
        const dA=(Math.PI*2)/segs;
        for(let s=0;s<segs;s++){
          if(!walls[s]) continue;
          const angle=s*dA;
          ctx.strokeStyle=mazeCol;
          ctx.lineWidth=lineW;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle)*innerR, Math.sin(angle)*innerR);
          ctx.lineTo(Math.cos(angle)*outerR, Math.sin(angle)*outerR);
          ctx.stroke();
        }

        /* Passages radiaux vers l'anneau suivant (trous dans le mur circulaire) */
        if(r<MAZE_RINGS-1){
          for(let s=0;s<segs;s++){
            if(!radOpen[s]) continue;
            const angle=(s+0.5)*dA;
            /* "Effacer" un petit arc pour simuler le passage */
            const gapA=dA*0.25;
            ctx.strokeStyle=`rgb(55,72,87)`; /* couleur du fond */
            ctx.lineWidth=lineW*2.2;
            ctx.beginPath();
            ctx.arc(0,0,outerR,angle-gapA,angle+gapA);
            ctx.stroke();
          }
        }
      }

      /* Cercle central plein */
      ctx.fillStyle=mazeCol;
      ctx.beginPath();
      ctx.arc(0,0,(1/MAZE_RINGS)*MAZE_R*0.6,0,Math.PI*2);
      ctx.fill();

      ctx.restore();
    }

    /* ── Particules de brume — flottent lentement ── */
    const motes=Array.from({length:80},()=>({
      x:Math.random()*W,
      y:Math.random()*H*0.85,
      r:W*(0.002+Math.random()*0.005),
      op:0.03+Math.random()*0.10,
      ph:Math.random()*Math.PI*2,
      spd:0.004+Math.random()*0.010,
      vx:(Math.random()-0.5)*0.12,
      vy:-(0.03+Math.random()*0.07),
    }));

    /* ── Pluie fine — très discrète ── */
    const rain=Array.from({length:120},()=>({
      x:Math.random()*W,
      y:Math.random()*H,
      len:H*(0.012+Math.random()*0.018),
      spd:H*0.007+Math.random()*H*0.005,
      op:0.04+Math.random()*0.07,
    }));

    /* ── Silhouette Loki ── */
    function drawLoki(){
      if(!lokiReady)return;
      const imgH=H*0.155;
      const imgW=imgH*LOKI_RATIO;
      /* Centré horizontalement, ancré au sol à 80% */
      const imgX=cx-imgW/2;
      const imgY=H*0.80-imgH;
      ctx.drawImage(lokiImg, imgX, imgY, imgW, imgH);

      /* Ombre portée sous les pieds */
      const shG=ctx.createRadialGradient(cx,H*0.80,0,cx,H*0.80,imgW*1.8);
      shG.addColorStop(0,'rgba(20,28,42,0.35)');
      shG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shG;
      ctx.beginPath();ctx.ellipse(cx,H*0.803,imgW*1.2,imgW*0.22,0,0,Math.PI*2);ctx.fill();
    }

    function frame(){
      if(stop.v)return;

      /* Fond uniforme bleu-gris ardoise */
      ctx.fillStyle='#374857';
      ctx.fillRect(0,0,W,H);

      /* Légère variation de luminosité verticale — plus sombre en bas */
      const gradV=ctx.createLinearGradient(0,0,0,H);
      gradV.addColorStop(0,'rgba(255,255,255,0.04)');
      gradV.addColorStop(0.5,'rgba(0,0,0,0)');
      gradV.addColorStop(1,'rgba(0,0,0,0.18)');
      ctx.fillStyle=gradV;ctx.fillRect(0,0,W,H);

      /* Labyrinthe — rotation très lente */
      const rotOffset=t*0.0008; /* quasi imperceptible mais vivant */
      drawMaze(0.78, rotOffset);

      /* Halo très doux autour du labyrinthe — profondeur */
      const halo=ctx.createRadialGradient(MAZE_CX,MAZE_CY,MAZE_R*0.3,MAZE_CX,MAZE_CY,MAZE_R*1.4);
      halo.addColorStop(0,'rgba(0,0,0,0)');
      halo.addColorStop(0.7,'rgba(0,0,0,0)');
      halo.addColorStop(1,`rgba(30,40,55,${0.20+Math.sin(t*0.15)*0.04})`);
      ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

      /* Pluie fine */
      ctx.save();
      for(const r of rain){
        r.y+=r.spd; if(r.y>H){r.y=-r.len;r.x=Math.random()*W;}
        ctx.strokeStyle=`rgba(180,200,220,${r.op})`;
        ctx.lineWidth=0.5;
        ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x-r.len*0.05,r.y+r.len);ctx.stroke();
      }
      ctx.restore();

      /* Particules de brume */
      for(const m of motes){
        m.ph+=m.spd;
        m.x+=m.vx+Math.sin(m.ph*0.7)*0.08;
        m.y+=m.vy;
        if(m.y<-m.r){m.y=H*0.85;m.x=Math.random()*W;}
        if(m.x<-m.r)m.x=W+m.r; if(m.x>W+m.r)m.x=-m.r;
        const pulse=0.5+0.5*Math.abs(Math.sin(m.ph));
        ctx.fillStyle=`rgba(180,200,225,${m.op*pulse})`;
        ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
      }

      drawLoki();

      /* Vignette */
      const vg=ctx.createRadialGradient(cx,H*0.46,H*0.06,cx,H*0.46,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.50,'rgba(20,30,45,0.06)');
      vg.addColorStop(0.78,'rgba(20,30,45,0.40)');
      vg.addColorStop(1,'rgba(15,22,35,0.92)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

      /* Grain très fin */
      for(let i=0;i<18;i++){
        const gv=80+Math.random()*50|0;
        ctx.fillStyle=`rgba(${gv},${gv+10},${gv+20},${Math.random()*0.014})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.3+0.3,1);
      }

      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
