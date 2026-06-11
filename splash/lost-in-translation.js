// CinéQuiz splash chunk — Lost in Translation
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Lost in Translation"]={
   name:'Lost in Translation',
   color:'60,120,200',
   ref:'Lost in Translation \u2014 Sofia Coppola, 2003',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style : citation + logo sous CinéQuiz ── */
    let _litS=document.getElementById('_lit_s');
    if(!_litS){_litS=document.createElement('style');_litS.id='_lit_s';document.head.appendChild(_litS);}
    _litS.textContent=`
     

     #splash-content-wrap{top:25%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(255,255,255,0.92)!important;font-size:15px!important;text-shadow:0 1px 12px rgba(0,0,0,0.95)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _litW=setInterval(()=>{if(stop.v){_litS.textContent='';clearInterval(_litW);}},200);

    /* ── SVG personnages LIT.svg (476×324 ratio ~1.469) ── */
    const litImg=new Image(); let litReady=false;
    litImg.onload=()=>{ litReady=true; };
    litImg.src='images/LIT.svg';
    const LIT_RATIO=476/324;

    /* ── Bokeh Tokyo : grosses taches floues colorées ── */
    const PALETTE=[
      [0,200,215],   /* cyan teal */
      [0,180,200],   /* teal pur */
      [255,150,45],  /* orange sodium */
      [255,90,35],   /* orange chaud */
      [185,100,255], /* violet néon */
      [255,240,180], /* blanc chaud */
      [30,200,160],  /* vert-teal */
      [255,60,120],  /* rose néon */
    ];
    const bokeh=Array.from({length:58},(_,i)=>{
      const col=PALETTE[i%PALETTE.length];
      return {
        x:Math.random()*W, y:Math.random()*H*0.68,
        r:W*(0.045+Math.random()*0.11),
        col, op:0.07+Math.random()*0.18,
        ph:Math.random()*Math.PI*2,
        spd:0.007+Math.random()*0.016,
        drift:(Math.random()-0.5)*0.22,
      };
    });

    /* ── Points de lumière nets (reflets ponctuels) ── */
    const sparks=Array.from({length:28},()=>({
      x:Math.random()*W, y:Math.random()*H*0.65,
      r:0.8+Math.random()*2.0,
      col:PALETTE[Math.floor(Math.random()*PALETTE.length)],
      op:0.35+Math.random()*0.55,
      ph:Math.random()*Math.PI*2,
      spd:0.012+Math.random()*0.025,
    }));

    /* ── Immeubles silhouette ── */
    const buildings=(function(){
      const arr=[]; let x=0;
      while(x<W){
        const w=W*(0.04+Math.random()*0.09);
        const h=H*(0.10+Math.random()*0.26);
        arr.push({
          x,w,h,
          neon:Math.random()<0.38,
          neonCol:PALETTE[Math.floor(Math.random()*PALETTE.length)],
          neonPh:Math.random()*Math.PI*2,
          wins:Array.from({length:18},()=>({
            xf:Math.random(), yf:Math.random(),
            lit:Math.random()<0.42,
            warm:Math.random()<0.55,
            ph:Math.random()*Math.PI*2,
          })),
        });
        x+=w+W*0.003;
      }
      return arr;
    })();
    const horizY=H*0.50;

    /* ── Kanji : ロスト・イン・トランスレーション + 2 colonnes supplémentaires ── */
    const KANJI='ロスト・イン・トランスレーション'.split('');
    let kanjiY=-KANJI.length*W*0.062;

    /* Colonne 2 — caractères japonais variés, décalée en phase */
    const KANJI2='東京孤独迷子言葉夜光都市'.split('');
    let kanjiY2=-KANJI2.length*W*0.062*0.55;

    /* Colonne 3 — mix hiragana/kanji, décalage de phase différent */
    const KANJI3='翻訳曖昧感情距離記憶夢'.split('');
    let kanjiY3=-KANJI3.length*W*0.062*0.30;

    function drawBg(){
      const sky=ctx.createLinearGradient(0,0,0,horizY);
      sky.addColorStop(0,'rgb(2,4,16)');
      sky.addColorStop(0.5,'rgb(3,8,22)');
      sky.addColorStop(1,'rgb(5,14,28)');
      ctx.fillStyle=sky; ctx.fillRect(0,0,W,horizY+4);
    }

    function drawBokeh(){
      for(const b of bokeh){
        b.ph+=b.spd; b.x+=b.drift;
        if(b.x<-b.r*2)b.x=W+b.r; if(b.x>W+b.r*2)b.x=-b.r;
        const pulse=0.72+0.28*Math.sin(b.ph);
        /* 3 couches concentriques pour effet bokeh flou */
        for(let ri=4;ri>=1;ri--){
          const rr=b.r*(ri/4);
          const a=b.op*pulse*(1-ri*0.18)*0.60;
          ctx.fillStyle=`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${a})`;
          ctx.beginPath(); ctx.arc(b.x,b.y,rr,0,Math.PI*2); ctx.fill();
        }
      }
      /* Points de lumière nets */
      for(const s of sparks){
        s.ph+=s.spd;
        const pulse=0.5+0.5*Math.abs(Math.sin(s.ph));
        ctx.fillStyle=`rgba(${s.col[0]},${s.col[1]},${s.col[2]},${s.op*pulse})`;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
      }
    }

    function drawBuildings(){
      for(const b of buildings){
        /* Silhouette */
        const bg=ctx.createLinearGradient(b.x,horizY-b.h,b.x,horizY);
        bg.addColorStop(0,'rgba(6,12,24,0.97)');
        bg.addColorStop(1,'rgba(4,8,18,0.99)');
        ctx.fillStyle=bg;
        ctx.fillRect(b.x,horizY-b.h,b.w,b.h);

        /* Fenêtres */
        const fw=Math.max(2,b.w*0.15), fh=Math.max(2,b.h*0.055);
        for(const w of b.wins){
          if(!w.lit) continue;
          if(Math.sin(t*0.35+w.ph)<-0.25) continue;
          const wx=b.x+w.xf*(b.w-fw);
          const wy=(horizY-b.h)+w.yf*(b.h-fh*2)+fh;
          const col=w.warm?[255,190,80]:[180,215,255];
          ctx.fillStyle=`rgba(${col[0]},${col[1]},${col[2]},${0.22+Math.sin(t*0.4+w.ph)*0.07})`;
          ctx.fillRect(wx,wy,fw,fh);
        }

        /* Enseigne néon */
        if(b.neon){
          const nc=b.neonCol;
          const np=0.45+Math.sin(t*1.5+b.neonPh)*0.45; /* clignotement */
          ctx.strokeStyle=`rgba(${nc[0]},${nc[1]},${nc[2]},${np*0.80})`;
          ctx.lineWidth=W*0.007; ctx.lineCap='round';
          ctx.beginPath();
          ctx.moveTo(b.x+b.w*0.15, horizY-b.h-W*0.010);
          ctx.lineTo(b.x+b.w*0.85, horizY-b.h-W*0.010);
          ctx.stroke();
          /* Halo enseigne */
          const eg=ctx.createRadialGradient(b.x+b.w*0.5,horizY-b.h,0,b.x+b.w*0.5,horizY-b.h,b.w*0.9);
          eg.addColorStop(0,`rgba(${nc[0]},${nc[1]},${nc[2]},${np*0.14})`);
          eg.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=eg; ctx.fillRect(b.x-b.w*0.4,horizY-b.h-W*0.04,b.w*1.8,W*0.08);
        }
      }
    }

    function drawKanji(){
      const fsize=W*0.050;
      ctx.save();
      ctx.textAlign='center';

      /* ── Colonne 1 — droite, rouge sombre (originale) ── */
      kanjiY+=0.40;
      if(kanjiY>H*0.78) kanjiY=-KANJI.length*fsize*1.18;
      ctx.font=`${fsize}px serif`;
      for(let i=0;i<KANJI.length;i++){
        const ky=kanjiY+i*fsize*1.18;
        if(ky<-fsize||ky>H*0.82) continue;
        const fade=Math.min(1, Math.min(ky/(fsize*3),(H*0.72-ky)/(fsize*4)));
        ctx.fillStyle=`rgba(190,60,60,${0.58*Math.max(0,fade)})`;
        ctx.fillText(KANJI[i], W*0.80, ky);
      }

      /* ── Colonne 2 — centre-gauche, teal, vitesse légèrement différente ── */
      kanjiY2+=0.28;
      if(kanjiY2>H*0.80) kanjiY2=-KANJI2.length*fsize*1.05;
      ctx.font=`${fsize*0.88}px serif`;
      for(let i=0;i<KANJI2.length;i++){
        const ky=kanjiY2+i*fsize*1.05;
        if(ky<-fsize||ky>H*0.82) continue;
        const fade=Math.min(1, Math.min(ky/(fsize*3),(H*0.72-ky)/(fsize*4)));
        ctx.fillStyle=`rgba(0,185,195,${0.48*Math.max(0,fade)})`;
        ctx.fillText(KANJI2[i], W*0.14, ky);
      }

      /* ── Colonne 3 — milieu gauche, violet, encore plus lente ── */
      kanjiY3+=0.18;
      if(kanjiY3>H*0.80) kanjiY3=-KANJI3.length*fsize*0.95;
      ctx.font=`${fsize*0.76}px serif`;
      for(let i=0;i<KANJI3.length;i++){
        const ky=kanjiY3+i*fsize*0.95;
        if(ky<-fsize||ky>H*0.82) continue;
        const fade=Math.min(1, Math.min(ky/(fsize*3),(H*0.72-ky)/(fsize*4)));
        ctx.fillStyle=`rgba(155,80,220,${0.42*Math.max(0,fade)})`;
        ctx.fillText(KANJI3[i], W*0.88, ky);
      }

      ctx.restore();
    }

    function drawGround(){
      const gG=ctx.createLinearGradient(0,horizY,0,H);
      gG.addColorStop(0,'rgba(4,10,22,0.98)');
      gG.addColorStop(0.5,'rgba(3,8,18,0.99)');
      gG.addColorStop(1,'rgba(2,5,12,1.0)');
      ctx.fillStyle=gG; ctx.fillRect(0,horizY,W,H-horizY);

      /* Reflets bokeh dans le sol — ellipses aplaties */
      for(let i=0;i<10;i++){
        const b=bokeh[i*5%bokeh.length];
        const rx=b.x+(Math.sin(t*0.12+i)*W*0.04);
        const ry=horizY+H*(0.03+i*0.042);
        const rw=W*(0.05+Math.abs(Math.sin(t*0.18+i))*0.07);
        const rh=rw*0.18;
        const decay=1-((ry-horizY)/(H-horizY))*1.3;
        if(decay<=0) continue;
        const a=(0.06+Math.sin(t*0.25+i)*0.02)*Math.max(0,decay)*b.op*1.4;
        ctx.fillStyle=`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${a})`;
        ctx.beginPath(); ctx.ellipse(rx,ry,rw,rh,0,0,Math.PI*2); ctx.fill();
      }
    }

    function drawCharacters(){
      if(!litReady) return;
      const imgW=W*0.94;
      const imgH=imgW/LIT_RATIO;
      const imgX=cx-imgW*0.48; /* légèrement décentré gauche comme l'affiche */
      const imgY=H-imgH+imgH*0.04;
      ctx.drawImage(litImg, imgX, imgY, imgW, imgH);

      /* Halo ambré chaud sous les personnages */
      const hG=ctx.createRadialGradient(cx,H,0,cx,H,W*0.68);
      hG.addColorStop(0,`rgba(165,100,30,${0.22+Math.sin(t*0.15)*0.04})`);
      hG.addColorStop(0.45,'rgba(100,60,15,0.08)');
      hG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hG; ctx.fillRect(0,H*0.58,W,H*0.42);
    }

    function frame(){
      if(stop.v) return;

      ctx.fillStyle='rgb(2,4,16)'; ctx.fillRect(0,0,W,H);

      drawBg();
      drawBokeh();
      drawBuildings();
      drawGround();
      drawKanji();
      drawCharacters();

      /* Halo teal atmosphérique — ambiance Coppola */
      const atG=ctx.createRadialGradient(cx,H*0.46,0,cx,H*0.46,W*0.80);
      atG.addColorStop(0,`rgba(0,110,135,${0.09+Math.sin(t*0.20)*0.02})`);
      atG.addColorStop(0.55,'rgba(0,55,75,0.04)');
      atG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=atG; ctx.fillRect(0,0,W,H);

      /* Vignette profonde */
      const vg=ctx.createRadialGradient(cx,H*0.48,H*0.04,cx,H*0.48,H*0.85);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.42,'rgba(2,5,16,0.08)');
      vg.addColorStop(0.70,'rgba(2,5,14,0.52)');
      vg.addColorStop(1,'rgba(2,4,12,0.96)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain pellicule */
      for(let i=0;i<22;i++){
        const gv=8+Math.random()*22|0;
        ctx.fillStyle=`rgba(${gv},${gv+10},${gv+24},${Math.random()*0.015})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }

      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
