// CinéQuiz splash chunk — Incassable
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Incassable"]={
   name:'Incassable',
   color:'60,20,80',
   ref:'Unbreakable \u2014 M. Night Shyamalan, 2000',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _icS=document.getElementById('_ic_s');
    if(!_icS){_icS=document.createElement('style');_icS.id='_ic_s';document.head.appendChild(_icS);}
    _icS.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(200,235,255,0.90)!important;font-size:14px!important;text-shadow:0 1px 12px rgba(0,40,80,0.90)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _icW=setInterval(()=>{if(stop.v){_icS.textContent='';clearInterval(_icW);}},200);

    /* ── SVG personnage (160×324, ratio ~0.494) ── */
    const incImg=new Image(); let incReady=false;
    incImg.onload=()=>{ incReady=true; };
    incImg.src='images/Incassable.svg';
    const INC_RATIO=160/324;

    /* ══ VERRE BRISÉ PROCÉDURAL ══ */
    /* Seed fixe — tessons stables */
    function sr(n){ let x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x); }

    /* Générer des éclats à partir d'un centre d'impact */
    const IMPACT={x:cx, y:H*0.42};
    const SHARD_COUNT=28;

    /* Créer les tessons : triangles procéduraux rayonnant depuis l'impact */
    const shards=(function(){
      const arr=[];
      /* Points de base sur plusieurs anneaux autour de l'impact */
      const rings=[
        {n:6,  r:W*0.06, off:0},
        {n:10, r:W*0.16, off:0.3},
        {n:14, r:W*0.30, off:0.1},
        {n:10, r:W*0.46, off:0.5},
      ];
      /* Collecter tous les points */
      const pts=[{x:IMPACT.x, y:IMPACT.y}]; /* centre */
      for(const ring of rings){
        for(let i=0;i<ring.n;i++){
          const angle=(i/ring.n)*Math.PI*2 + ring.off;
          const jitter=sr(i*ring.n+ring.r)*(ring.r*0.35);
          const r=ring.r+jitter;
          pts.push({
            x:IMPACT.x+Math.cos(angle)*r,
            y:IMPACT.y+Math.sin(angle)*r,
          });
        }
      }
      /* Triangulation simplifiée : relier centre à paires de points adjacents par anneau */
      let pidx=1;
      for(let ri=0;ri<rings.length;ri++){
        const ring=rings[ri];
        for(let i=0;i<ring.n;i++){
          const a=pts[pidx+i];
          const b=pts[pidx+(i+1)%ring.n];
          /* Apex : point de l'anneau précédent ou centre */
          const apex = ri===0 ? pts[0] : pts[pidx-rings[ri-1].n + i%rings[ri-1].n];
          const seed=ri*100+i;
          /* Luminosité et teinte du tesson */
          const lum=0.18+sr(seed*3)*0.55;
          const cyan=sr(seed*7)>0.4;
          arr.push({
            pts:[apex,a,b],
            baseLum:lum,
            cyan,
            ph:sr(seed*11)*Math.PI*2,
            spd:0.005+sr(seed*13)*0.012,
            /* Fissures : lignes à l'intérieur du tesson */
            cracks: Array.from({length:Math.floor(sr(seed*5)*3+1)},(_,ci)=>({
              x0:sr(seed*17+ci)*1, y0:sr(seed*19+ci)*1,
              x1:sr(seed*23+ci)*1, y1:sr(seed*29+ci)*1,
            })),
          });
        }
        pidx+=ring.n;
      }
      return arr;
    })();

    /* ── Éclats de verre volants — petits débris lumineux ── */
    const debris=Array.from({length:35},(_,i)=>({
      x:IMPACT.x+(sr(i*3)-0.5)*W*0.55,
      y:IMPACT.y+(sr(i*7)-0.5)*H*0.40,
      r:W*(0.002+sr(i*11)*0.005),
      op:0.15+sr(i*13)*0.55,
      ph:sr(i*17)*Math.PI*2,
      spd:0.010+sr(i*19)*0.025,
      vx:(sr(i*23)-0.5)*0.15,
      vy:(sr(i*29)-0.5)*0.15,
    }));

    /* ── Pluie fine — comme dans le splash original ── */
    const rain=Array.from({length:55},()=>({
      x:Math.random()*W,
      y:Math.random()*H,
      len:H*(0.025+Math.random()*0.030),
      spd:H*(0.010+Math.random()*0.008),
      op:0.06+Math.random()*0.10,
      ang:0.10+Math.random()*0.08,
    }));

    function barycentre(tri){
      return {
        x:(tri[0].x+tri[1].x+tri[2].x)/3,
        y:(tri[0].y+tri[1].y+tri[2].y)/3,
      };
    }

    function drawShards(){
      for(const s of shards){
        s.ph+=s.spd;
        const pulse=0.6+0.4*Math.abs(Math.sin(s.ph));
        const lum=s.baseLum*pulse;

        /* Remplissage du tesson */
        const bc=barycentre(s.pts);
        const dist=Math.hypot(bc.x-IMPACT.x, bc.y-IMPACT.y);
        const distFrac=Math.min(1,dist/(W*0.50));

        /* Couleur : cyan-bleu électrique proche de l'impact, plus sombre au loin */
        const r=Math.round(s.cyan? lum*20  : lum*10);
        const g=Math.round(s.cyan? lum*130 : lum*80);
        const b=Math.round(s.cyan? lum*220 : lum*160);
        const a=(0.55-distFrac*0.35)*pulse;

        ctx.beginPath();
        ctx.moveTo(s.pts[0].x,s.pts[0].y);
        ctx.lineTo(s.pts[1].x,s.pts[1].y);
        ctx.lineTo(s.pts[2].x,s.pts[2].y);
        ctx.closePath();
        ctx.fillStyle=`rgba(${r},${g},${b},${a})`;
        ctx.fill();

        /* Arête des tessons — trait lumineux blanc-cyan */
        const edgeLum=lum*(0.70+distFrac*0.10);
        ctx.strokeStyle=`rgba(${Math.min(255,r*3+120)},${Math.min(255,g+80)},255,${edgeLum*(0.60-distFrac*0.30)})`;
        ctx.lineWidth=W*0.004*(1-distFrac*0.6);
        ctx.stroke();

        /* Fissures internes */
        for(const c of s.cracks){
          const x0=s.pts[0].x+(s.pts[1].x-s.pts[0].x)*c.x0+(s.pts[2].x-s.pts[0].x)*c.y0*0.5;
          const y0=s.pts[0].y+(s.pts[1].y-s.pts[0].y)*c.x0+(s.pts[2].y-s.pts[0].y)*c.y0*0.5;
          const x1=s.pts[0].x+(s.pts[1].x-s.pts[0].x)*c.x1+(s.pts[2].x-s.pts[0].x)*c.y1*0.5;
          const y1=s.pts[0].y+(s.pts[1].y-s.pts[0].y)*c.x1+(s.pts[2].y-s.pts[0].y)*c.y1*0.5;
          ctx.strokeStyle=`rgba(160,230,255,${edgeLum*0.35})`;
          ctx.lineWidth=W*0.0015;
          ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();
        }
      }

      /* Halo central — point d'impact lumineux */
      const coreG=ctx.createRadialGradient(IMPACT.x,IMPACT.y,0,IMPACT.x,IMPACT.y,W*0.10);
      coreG.addColorStop(0,`rgba(200,245,255,${0.65+Math.sin(t*0.8)*0.12})`);
      coreG.addColorStop(0.3,`rgba(80,200,255,${0.30+Math.sin(t*0.6)*0.08})`);
      coreG.addColorStop(0.7,'rgba(20,80,180,0.10)');
      coreG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=coreG; ctx.fillRect(0,0,W,H);

      /* Halo large bleu électrique */
      const outerG=ctx.createRadialGradient(IMPACT.x,IMPACT.y,W*0.05,IMPACT.x,IMPACT.y,W*0.55);
      outerG.addColorStop(0,`rgba(0,120,255,${0.18+Math.sin(t*0.4)*0.04})`);
      outerG.addColorStop(0.5,`rgba(0,60,180,${0.08+Math.sin(t*0.3)*0.02})`);
      outerG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=outerG; ctx.fillRect(0,0,W,H);
    }

    function drawDebris(){
      for(const d of debris){
        d.ph+=d.spd;
        d.x+=d.vx; d.y+=d.vy;
        /* Rester dans le canvas avec rebond doux */
        if(d.x<0||d.x>W) d.vx*=-1;
        if(d.y<0||d.y>H) d.vy*=-1;
        const pulse=0.4+0.6*Math.abs(Math.sin(d.ph));
        ctx.fillStyle=`rgba(140,220,255,${d.op*pulse})`;
        ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
        /* Petit trait de lumière sur les plus gros */
        if(d.r>W*0.004){
          ctx.strokeStyle=`rgba(200,240,255,${d.op*pulse*0.6})`;
          ctx.lineWidth=d.r*0.5;
          ctx.beginPath();ctx.moveTo(d.x-d.r*1.5,d.y);ctx.lineTo(d.x+d.r*1.5,d.y);ctx.stroke();
        }
      }
    }

    function drawRain(){
      ctx.save();
      for(const r of rain){
        r.y+=r.spd; r.x-=r.spd*r.ang;
        if(r.y>H){r.y=-r.len;r.x=Math.random()*W;}
        ctx.strokeStyle=`rgba(100,160,220,${r.op})`;
        ctx.lineWidth=0.5;
        ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x-r.len*r.ang,r.y+r.len);ctx.stroke();
      }
      ctx.restore();
    }

    function drawCharacter(){
      if(!incReady)return;
      /* SVG 160×324 — silhouette centrée, ~40% de la largeur, bas du canvas */
      const imgH=H*0.42;
      const imgW=imgH*INC_RATIO;
      const imgX=cx-imgW/2;
      const imgY=H*0.88-imgH;
      ctx.drawImage(incImg,imgX,imgY,imgW,imgH);

      /* Halo bleu sous le personnage */
      const shG=ctx.createRadialGradient(cx,H*0.88,0,cx,H*0.88,imgW*1.5);
      shG.addColorStop(0,'rgba(0,60,140,0.28)');
      shG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=shG;
      ctx.beginPath();ctx.ellipse(cx,H*0.89,imgW*1.2,imgW*0.18,0,0,Math.PI*2);ctx.fill();
    }

    function frame(){
      if(stop.v)return;

      /* Fond noir profond légèrement bleuté */
      ctx.fillStyle='#000508'; ctx.fillRect(0,0,W,H);

      drawRain();
      drawShards();
      drawDebris();
      drawCharacter();

      /* Vignette bleue */
      const vg=ctx.createRadialGradient(cx,H*0.44,H*0.06,cx,H*0.44,H*0.90);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.48,'rgba(0,5,15,0.06)');
      vg.addColorStop(0.75,'rgba(0,5,15,0.48)');
      vg.addColorStop(1,'rgba(0,3,10,0.94)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain bleu */
      for(let i=0;i<20;i++){
        const gv=10+Math.random()*20|0;
        ctx.fillStyle=`rgba(${gv},${gv+15},${gv+40},${Math.random()*0.016})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
