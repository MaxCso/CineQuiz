// CinéQuiz splash chunk — Le Cinquième Élément
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Le Cinquième Élément"]={
   name:'Le Cinqui\u00e8me \u00c9l\u00e9ment',
   color:'200,80,200',
   ref:'Le Cinqui\u00e8me \u00c9l\u00e9ment \u2014 Luc Besson, 1997',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2,cy=H/2;

    /* ── Override fond + position citation en bas ── */
    let _5eStyle=document.getElementById('_5e_splash_style');
    if(!_5eStyle){_5eStyle=document.createElement('style');_5eStyle.id='_5e_splash_style';document.head.appendChild(_5eStyle);}
    _5eStyle.textContent=`
      

      #splash-content-wrap{top:62%!important;transform:translateY(0)!important;}
      #splash-content-wrap.reveal{transform:translateY(0)!important;}
    `;
    /* Supprimer le positionnement inline résiduel */
    const _5eWrap=document.getElementById('splash-content-wrap');
    if(_5eWrap){_5eWrap.style.position='';_5eWrap.style.top='';_5eWrap.style.bottom='';}
    const _5eWatch=setInterval(()=>{
      if(stop.v){
        if(_5eWrap){_5eWrap.style.position='';_5eWrap.style.top='';_5eWrap.style.bottom='';}
        _5eStyle.textContent='';clearInterval(_5eWatch);
      }
    },200);

    /* Skyline NYC 2263 — tours serrées, couleurs chaudes affiche */
    /* Palette affiche : orange (15-35°), rouge (0-10°), or (40-50°), violet chaud (280-310°) */
    const WARM_HUES=[18,28,8,45,295,22,35,5,42,300,15,30,12,48,285,20,38,10,50,305];
    const towers=Array.from({length:32},(_,i)=>{
     const hue=WARM_HUES[i%WARM_HUES.length]+(Math.random()-0.5)*8;
     /* Fenêtres générées une fois, état fixe (allumée/éteinte) */
     const tw=W*0.028+Math.random()*W*0.028;
     const th=H*(0.28+Math.random()*0.50);
     const rows=Math.floor(th/(H*0.028));
     const wins=[];
     for(let r=1;r<rows;r++){
      for(let c=0;c<2;c++){
       if(Math.random()<0.72){ /* 72% des fenêtres allumées */
        wins.push({r,c,on:true,flicker:Math.random()<0.08,ph:Math.random()*Math.PI*2,sat:60+Math.random()*35,lit:50+Math.random()*35});
       }
      }
     }
     return {x:i*(W/31),w:tw,h:th,hue,wins};
    });

    /* Voitures volantes */
    const flyCars=Array.from({length:12},(_,i)=>({
     x:Math.random()*W*1.6-W*0.3,
     y:H*(0.08+i*0.07),
     spd:(Math.random()<0.5?1:-1)*(Math.random()*2.2+0.9),
     trail:[],
     color:`hsl(${180+Math.random()*80},85%,68%)`
    }));

    /* Particules d'énergie orange/dorée */
    const sparks=Array.from({length:70},()=>({
     x:cx+(Math.random()-0.5)*W*0.7,
     y:H*0.50+Math.random()*H*0.35,
     vx:(Math.random()-0.5)*1.4,
     vy:-(Math.random()*1.8+0.3),
     r:Math.random()*3.0+0.4,
     life:Math.random(),
     hue:10+Math.random()*50
    }));

    let mpPulse=0;
    const skylineY=H*0.58; /* horizon des buildings */

    function frame(){
     if(stop.v)return;

     /* Fond — trail léger pour motion blur */
     ctx.fillStyle='rgba(2,1,14,0.30)';ctx.fillRect(0,0,W,H);

     /* Ciel nuit futuriste — noir profond avec lueur orange/rouge en bas */
     const sky=ctx.createLinearGradient(0,0,0,skylineY);
     sky.addColorStop(0,'#02010a');
     sky.addColorStop(0.40,'#0a0308');
     sky.addColorStop(0.75,'#1a0808');
     sky.addColorStop(1,'#2d0f04');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,skylineY);

     /* Étoiles — fixes, pas de random par frame */
     for(let si=0;si<28;si++){
      const sx=W*(si*0.038+0.01),sy=H*(0.01+Math.sin(si*2.3)*0.07);
      const sop=0.18+Math.sin(t*0.4+si*0.9)*0.10;
      ctx.fillStyle=`rgba(255,230,200,${sop})`;
      ctx.beginPath();ctx.arc(sx,sy,0.8,0,Math.PI*2);ctx.fill();
     }

     /* Halo néon en hauteur — orange/rouge chaud */
     const cityGlow=ctx.createRadialGradient(cx,skylineY,20,cx,skylineY,W*0.85);
     cityGlow.addColorStop(0,`rgba(200,60,10,${0.30+Math.sin(t*0.3)*0.05})`);
     cityGlow.addColorStop(0.35,'rgba(120,30,5,0.12)');
     cityGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cityGlow;ctx.fillRect(0,0,W,skylineY);

     /* Tours futuristes */
     for(const twr of towers){
      const by=skylineY-twr.h;
      /* Corps du building */
      const tg=ctx.createLinearGradient(twr.x,by,twr.x+twr.w,skylineY);
      tg.addColorStop(0,`hsla(${twr.hue},28%,14%,1)`);
      tg.addColorStop(1,`hsla(${twr.hue},18%,7%,1)`);
      ctx.fillStyle=tg;ctx.fillRect(twr.x,by,twr.w,twr.h);
      /* Contour lumineux néon sur les bords */
      ctx.strokeStyle=`hsla(${twr.hue},80%,55%,0.18)`;
      ctx.lineWidth=1;
      ctx.strokeRect(twr.x,by,twr.w,twr.h);
      /* Fenêtres — état fixe, flickering optionnel */
      const fh=H*0.011,fw=twr.w*0.38;
      for(const w of twr.wins){
       const wy=by+w.r*H*0.027;if(wy>skylineY-fh)continue;
       const wx=twr.x+twr.w*(0.16+w.c*0.50)-fw/2;
       let alpha=0.75;
       if(w.flicker){w.ph+=0.08;alpha*=(0.55+0.45*Math.sin(w.ph));}
       ctx.fillStyle=`hsla(${twr.hue},${w.sat}%,${w.lit}%,${alpha})`;
       ctx.fillRect(wx,wy,fw,fh);
       /* Halo de fenêtre */
       const wg=ctx.createRadialGradient(wx+fw/2,wy+fh/2,0,wx+fw/2,wy+fh/2,fw*1.5);
       wg.addColorStop(0,`hsla(${twr.hue},80%,70%,${alpha*0.25})`);
       wg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=wg;ctx.fillRect(wx-fw,wy-fh,fw*3,fh*3);
      }
      /* Antenne / balisage en haut */
      if(Math.random()<0.3){
       ctx.fillStyle=`hsla(${twr.hue},90%,70%,${0.6+Math.sin(t*2+twr.x)*0.4})`;
       ctx.beginPath();ctx.arc(twr.x+twr.w/2,by+2,2.5,0,Math.PI*2);ctx.fill();
      }
     }

     /* Sol urbain */
     const street=ctx.createLinearGradient(0,skylineY,0,H);
     street.addColorStop(0,'rgba(12,8,28,1)');
     street.addColorStop(0.3,'rgba(7,4,18,1)');
     street.addColorStop(1,'rgba(2,1,8,1)');
     ctx.fillStyle=street;ctx.fillRect(0,skylineY,W,H);

     /* Reflets néon sur sol — plus intenses */
     for(const twr of towers){
      const rx=twr.x+twr.w/2;
      const rg=ctx.createRadialGradient(rx,skylineY,1,rx,skylineY+H*0.06,W*0.10);
      rg.addColorStop(0,`hsla(${twr.hue},85%,55%,0.18)`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;ctx.beginPath();ctx.ellipse(rx,skylineY+H*0.04,W*0.07,H*0.03,0,0,Math.PI*2);ctx.fill();
     }

     /* Voitures volantes */
     for(const fc of flyCars){
      fc.x+=fc.spd;fc.trail.push({x:fc.x,y:fc.y});
      if(fc.trail.length>28)fc.trail.shift();
      if(fc.x>W*1.35)fc.x=-W*0.35;if(fc.x<-W*0.35)fc.x=W*1.35;
      for(let ti=1;ti<fc.trail.length;ti++){
       const ag=ti/fc.trail.length;
       ctx.strokeStyle=fc.color.replace('hsl(','hsla(').replace(')',`,${ag*0.40})`);
       ctx.lineWidth=ag*2.0;
       ctx.beginPath();ctx.moveTo(fc.trail[ti-1].x,fc.trail[ti-1].y);ctx.lineTo(fc.trail[ti].x,fc.trail[ti].y);ctx.stroke();
      }
      ctx.fillStyle=fc.color;
      ctx.beginPath();ctx.roundRect(fc.x-15,fc.y-3,30,6,3);ctx.fill();
      const hg=ctx.createRadialGradient(fc.spd>0?fc.x+15:fc.x-15,fc.y,0,fc.spd>0?fc.x+15:fc.x-15,fc.y,22);
      hg.addColorStop(0,'rgba(255,245,190,0.65)');hg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(fc.spd>0?fc.x+15:fc.x-15,fc.y,22,0,Math.PI*2);ctx.fill();
     }

     /* Colonne d'énergie 5ème élément — orange/doré, pulsante */
     mpPulse+=0.025;
     /* Faisceau vertical */
     const mpBeam=ctx.createLinearGradient(cx,H*0.10,cx,skylineY);
     mpBeam.addColorStop(0,'rgba(0,0,0,0)');
     mpBeam.addColorStop(0.3,`rgba(255,120,20,${0.10+Math.sin(mpPulse*1.3)*0.04})`);
     mpBeam.addColorStop(0.7,`rgba(255,160,30,${0.22+Math.sin(mpPulse)*0.08})`);
     mpBeam.addColorStop(1,`rgba(255,100,10,${0.38+Math.sin(mpPulse*0.7)*0.10})`);
     ctx.fillStyle=mpBeam;
     ctx.beginPath();
     ctx.moveTo(cx-W*0.018,H*0.10);ctx.lineTo(cx+W*0.018,H*0.10);
     ctx.lineTo(cx+W*0.055,skylineY);ctx.lineTo(cx-W*0.055,skylineY);ctx.closePath();
     ctx.fill();
     /* Halo central */
     const mpG=ctx.createRadialGradient(cx,skylineY*0.85,5,cx,skylineY*0.85,W*0.18);
     mpG.addColorStop(0,`rgba(255,140,20,${0.55+Math.sin(mpPulse)*0.15})`);
     mpG.addColorStop(0.35,`rgba(255,80,10,${0.22+Math.sin(mpPulse*0.8)*0.06})`);
     mpG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mpG;ctx.beginPath();ctx.ellipse(cx,skylineY*0.85,W*0.08,H*0.22,0,0,Math.PI*2);ctx.fill();

     /* Particules d'énergie */
     for(const sp of sparks){
      sp.x+=sp.vx;sp.y+=sp.vy;sp.life+=0.020;
      if(sp.life>1){sp.life=0;sp.x=cx+(Math.random()-0.5)*W*0.55;sp.y=H*0.72+Math.random()*H*0.18;sp.vy=-(Math.random()*1.8+0.3);}
      const sa=Math.sin(sp.life*Math.PI)*0.85;
      ctx.fillStyle=`hsla(${sp.hue},95%,68%,${sa})`;
      ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r,0,Math.PI*2);ctx.fill();
     }

     /* Vignette latérale douce */
     const vg=ctx.createRadialGradient(cx,H*0.45,H*0.18,cx,H*0.45,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(0,0,0,0.10)');
     vg.addColorStop(1,'rgba(0,0,0,0.88)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
