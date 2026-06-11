// CinéQuiz splash chunk — American Psycho
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["American Psycho"]={
   name:'American Psycho',
   color:'60,60,60',
   ref:'American Psycho \u2014 Mary Harron, 2000',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _apS=document.getElementById('_ap_s');
    if(!_apS){_apS=document.createElement('style');_apS.id='_ap_s';document.head.appendChild(_apS);}
    _apS.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(220,210,210,0.88)!important;font-size:14px!important;text-shadow:0 1px 10px rgba(0,0,0,0.95)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _apW=setInterval(()=>{if(stop.v){_apS.textContent='';clearInterval(_apW);}},200);

    /* ── SVG silhouette (336×1000, ratio ~0.336) ── */
    const psychoImg=new Image(); let psychoReady=false;
    psychoImg.onload=()=>{ psychoReady=true; };
    psychoImg.src='images/Psycho.svg';
    const PSYCHO_RATIO=336/1000;

    /* ── Gouttes de sang qui tombent ── */
    function mkDrop(){
      return {
        x: cx + (Math.random()-0.5)*W*0.30,
        y: -(Math.random()*H*0.15),
        vy: 0.6+Math.random()*2.2,
        r: W*(0.004+Math.random()*0.010),
        trail: [],
        splat: false,
        splatT: 0,
        op: 0.55+Math.random()*0.40,
      };
    }
    /* Gouttes supplémentaires qui tombent depuis le haut absolu */
    function mkTopDrop(){
      return {
        x: Math.random()*W*0.80 + W*0.10,
        y: -(Math.random()*H*0.08),
        vy: 1.0+Math.random()*3.0,
        r: W*(0.003+Math.random()*0.007),
        trail: [],
        splat: false,
        splatT: 0,
        op: 0.35+Math.random()*0.45,
      };
    }
    const drops=Array.from({length:22}, mkDrop);
    const topDrops=Array.from({length:18}, mkTopDrop);

    /* ── Taches de sang sur le sol — persistent ── */
    const stains=[];

    /* ── Particules rouges flottantes — tension ── */
    const motes=Array.from({length:80},(_,i)=>({
      x: cx+(Math.random()-0.5)*W*0.80,
      y: H*(0.10+Math.random()*0.80),
      r: W*(0.001+Math.random()*0.004),
      op: 0.05+Math.random()*0.18,
      ph: Math.random()*Math.PI*2,
      spd: 0.004+Math.random()*0.014,
      vx: (Math.random()-0.5)*0.08,
      vy: -(0.03+Math.random()*0.10),
    }));

    function drawBackground(){
      /* Noir absolu */
      ctx.fillStyle='#000000'; ctx.fillRect(0,0,W,H);

      /* Halo rouge sang derrière la silhouette — pulse lent */
      const pulse=0.72+Math.sin(t*0.28)*0.18;
      const halo=ctx.createRadialGradient(cx,H*0.38,0,cx,H*0.38,W*0.42);
      halo.addColorStop(0,`rgba(140,8,8,${0.32*pulse})`);
      halo.addColorStop(0.35,`rgba(100,4,4,${0.16*pulse})`);
      halo.addColorStop(0.65,'rgba(50,2,2,0.05)');
      halo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo; ctx.fillRect(0,0,W,H);

      /* Second halo plus bas — couteau / sang */
      const halo2=ctx.createRadialGradient(cx,H*0.62,0,cx,H*0.62,W*0.28);
      halo2.addColorStop(0,`rgba(120,5,5,${0.20*pulse})`);
      halo2.addColorStop(0.5,'rgba(60,2,2,0.06)');
      halo2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo2; ctx.fillRect(0,0,W,H);
    }

    function drawSVG(){
      if(!psychoReady)return;
      /* Centré, occupe ~52% de la largeur — ratio 336/1000 très allongé */
      const imgW=W*0.494;
      const imgH=imgW/PSYCHO_RATIO;
      const imgX=cx-imgW/2;
      /* Cadré : le haut de la silhouette à ~18% du canvas */
      const imgY=H*0.18;
      /* Si imgH dépasse le bas, on réduit */
      const scale=Math.min(1,(H*0.88-imgY)/imgH);
      const fw=imgW*scale, fh=imgH*scale;
      const fx=cx-fw/2;
      ctx.drawImage(psychoImg, fx, imgY, fw, fh);
    }

    function drawDrops(){
      /* ── Fonction commune pour dessiner un tableau de gouttes ── */
      function processDrops(arr, respawnFn){
        for(let i=0;i<arr.length;i++){
          const d=arr[i];
          if(d.splat){
            d.splatT+=0.016;
            if(d.splatT<0.8){
              const sr=d.r*(1+d.splatT*4);
              ctx.fillStyle=`rgba(150,5,5,${d.op*(1-d.splatT*0.8)})`;
              ctx.beginPath();ctx.ellipse(d.x,d.y,sr,sr*0.35,0,0,Math.PI*2);ctx.fill();
            } else {
              stains.push({x:d.x,y:d.y,rx:d.r*3.5,ry:d.r*1.2,op:d.op*0.45});
              arr[i]=respawnFn();
            }
            continue;
          }
          /* Traînée */
          d.trail.push({x:d.x,y:d.y});
          if(d.trail.length>8) d.trail.shift();
          for(let ti=0;ti<d.trail.length-1;ti++){
            const tf=ti/(d.trail.length-1);
            ctx.strokeStyle=`rgba(160,8,8,${d.op*tf*0.6})`;
            ctx.lineWidth=d.r*2*(0.3+tf*0.7);
            ctx.lineCap='round';
            ctx.beginPath();
            ctx.moveTo(d.trail[ti].x,d.trail[ti].y);
            ctx.lineTo(d.trail[ti+1].x,d.trail[ti+1].y);
            ctx.stroke();
          }
          /* Goutte */
          ctx.fillStyle=`rgba(168,8,8,${d.op})`;
          ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
          ctx.beginPath();
          ctx.moveTo(d.x-d.r*0.5,d.y+d.r*0.3);
          ctx.quadraticCurveTo(d.x,d.y+d.r*2.2,d.x+d.r*0.5,d.y+d.r*0.3);
          ctx.fillStyle=`rgba(168,8,8,${d.op*0.8})`;ctx.fill();
          d.y+=d.vy;
          if(d.y>H*0.88){ d.splat=true; d.splatT=0; }
        }
      }

      processDrops(drops, mkDrop);
      processDrops(topDrops, mkTopDrop);

      /* Taches persistantes */
      for(const s of stains){
        ctx.fillStyle=`rgba(120,5,5,${s.op})`;
        ctx.beginPath();ctx.ellipse(s.x,s.y,s.rx,s.ry,0,0,Math.PI*2);ctx.fill();
      }
    }

    function drawMotes(){
      for(const m of motes){
        m.ph+=m.spd;
        m.x+=m.vx+Math.sin(m.ph*0.4)*0.04;
        m.y+=m.vy;
        if(m.y<H*0.10){m.y=H*0.85;m.x=cx+(Math.random()-0.5)*W*0.55;}
        const pulse=0.4+0.6*Math.abs(Math.sin(m.ph));
        ctx.fillStyle=`rgba(180,15,15,${m.op*pulse})`;
        ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
      }
    }

    function frame(){
      if(stop.v)return;

      drawBackground();
      drawDrops();
      drawMotes();
      drawSVG();

      /* Vignette très profonde — noir serré */
      const vg=ctx.createRadialGradient(cx,H*0.46,H*0.06,cx,H*0.46,H*0.82);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.45,'rgba(0,0,0,0.04)');
      vg.addColorStop(0.72,'rgba(0,0,0,0.52)');
      vg.addColorStop(1,'rgba(0,0,0,0.97)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain rouge très discret */
      for(let i=0;i<22;i++){
        const gv=Math.random()*18|0;
        ctx.fillStyle=`rgba(${gv+30},${gv},${gv},${Math.random()*0.016})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
