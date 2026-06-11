// CinéQuiz splash chunk — There Will Be Blood
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["There Will Be Blood"]={
   name:'There Will Be Blood',
   color:'200,70,10',
   ref:'There Will Be Blood \u2014 Paul Thomas Anderson, 2007',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style UI ── */
    let _twbS=document.getElementById('_twb_s');
    if(!_twbS){_twbS=document.createElement('style');_twbS.id='_twb_s';document.head.appendChild(_twbS);}
    _twbS.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;transition:opacity 0.65s ease 0.20s!important;}#splash-content-wrap.reveal{opacity:1!important;transform:translateY(0)!important;}#splash-film-logo{max-width:260px!important;}#splash-quote-text{color:rgba(255,255,255,0.96)!important;text-shadow:0 1px 10px rgba(0,0,0,0.98)!important;}';
    const _twbW=setInterval(()=>{if(stop.v){_twbS.textContent='';clearInterval(_twbW);}},200);

    /* ── Chargement SVG TWBB (derrick + sol noir) ── */
    let _svgImg=null, _svgReady=false;
    (function(){
      const img=new Image();
      img.onload=()=>{_svgImg=img;_svgReady=true;};
      img.onerror=()=>{_svgReady=false;};
      img.src='images/TWBB.svg';
    })();

    /* ── Cendres et braises — remontent depuis le sol ── */
    const embers=Array.from({length:70},(_,i)=>({
      x:W*(0.20+Math.random()*0.60),
      y:H*(0.58+Math.random()*0.35),
      vx:(Math.random()-0.5)*0.30,
      vy:-(0.10+Math.random()*0.35),
      /* Deux types : braises lumineuses (i<20) et cendres fines (i>=20) */
      r:i<20?(1.5+Math.random()*2.5):(0.4+Math.random()*1.0),
      op:i<20?(0.55+Math.random()*0.35):(0.20+Math.random()*0.25),
      phase:Math.random()*Math.PI*2,
      spd:0.016+Math.random()*0.024,
      isBraise:i<20,
    }));

    /* ── Fumée noire montante — colonne organique ── */
    const smoke=Array.from({length:32},(_,i)=>({
      x:W*(0.38+Math.random()*0.24),
      y:H*(0.15+Math.random()*0.45),
      vx:(Math.random()-0.5)*0.12,
      vy:-(0.06+Math.random()*0.12),
      r:W*(0.028+Math.random()*0.042),
      life:Math.random(),
      maxLife:2.2+Math.random()*2.8,
      phase:Math.random()*Math.PI*2,
      layer:i%3,  /* 3 couches de profondeur */
    }));

    /* ── Derricks secondaires fantômes ── */
    const ghostDerricks=[
      {x:W*0.12, opacity:0.045, h:0.18},
      {x:W*0.22, opacity:0.060, h:0.14},
      {x:W*0.80, opacity:0.050, h:0.16},
      {x:W*0.90, opacity:0.035, h:0.12},
    ];

    function drawGhostDerrick(dx, baseY, h, op){
      ctx.save();
      ctx.globalAlpha=op;
      ctx.fillStyle='rgba(60,20,5,1)';
      const tw=W*0.022;
      ctx.beginPath();
      ctx.moveTo(dx-tw,baseY);ctx.lineTo(dx-tw*0.15,baseY-h);
      ctx.lineTo(dx+tw*0.15,baseY-h);ctx.lineTo(dx+tw,baseY);
      ctx.closePath();ctx.fill();
      /* Bras de pompe — angle fixe */
      ctx.strokeStyle='rgba(50,18,4,1)';ctx.lineWidth=tw*0.55;ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(dx-tw*1.2,baseY-h*0.75);
      ctx.lineTo(dx+tw*1.2,baseY-h*0.88);
      ctx.stroke();
      ctx.restore();
    }

    function drawBg(){
      /* Ciel orange brûlant — palette exacte de l'affiche */
      const skyG=ctx.createLinearGradient(0,0,0,H*0.68);
      skyG.addColorStop(0.00,`rgb(${200+Math.sin(t*0.22)*8|0},${55+Math.sin(t*0.18)*6|0},0)`);
      skyG.addColorStop(0.25,`rgb(${220+Math.sin(t*0.28)*6|0},${70+Math.sin(t*0.22)*5|0},0)`);
      skyG.addColorStop(0.55,`rgb(${235+Math.sin(t*0.20)*5|0},${85+Math.sin(t*0.25)*6|0},5)`);
      skyG.addColorStop(0.82,`rgb(${215+Math.sin(t*0.30)*6|0},${65+Math.sin(t*0.19)*5|0},0)`);
      skyG.addColorStop(1.00,`rgb(${180+Math.sin(t*0.24)*8|0},${45+Math.sin(t*0.21)*4|0},0)`);
      ctx.fillStyle=skyG;
      ctx.fillRect(0,0,W,H*0.68);

      /* Lueur chaude centrale — halo diffus bas */
      const haloG=ctx.createRadialGradient(cx,H*0.62,0,cx,H*0.62,W*0.75);
      haloG.addColorStop(0,`rgba(255,${100+Math.sin(t*0.35)*12|0},10,${0.22+Math.sin(t*0.28)*0.04})`);
      haloG.addColorStop(0.45,`rgba(240,${70+Math.sin(t*0.22)*8|0},0,${0.08+Math.sin(t*0.40)*0.02})`);
      haloG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=haloG;
      ctx.fillRect(0,0,W,H*0.72);
    }

    function drawSmoke(){
      for(const s of smoke){
        s.life+=0.003+s.layer*0.001;
        /* Dérive avec turbulence — chaque couche a une fréquence différente */
        s.x+=s.vx+Math.sin(t*(0.3+s.layer*0.1)+s.phase)*0.18;
        s.y+=s.vy;
        if(s.life>=s.maxLife){
          s.life=0;
          /* Naissance au pied du derrick — zone resserrée */
          s.x=W*(0.40+Math.random()*0.20);
          s.y=H*(0.48+Math.random()*0.08);
          s.vx=(Math.random()-0.5)*0.10;
          s.vy=-(0.05+Math.random()*0.10);
        }
        const prog=s.life/s.maxLife;
        /* Fondu entrée/sortie doux — fade in rapide, fade out lent */
        const fadeIn=prog<0.12?prog/0.12:1;
        const fadeOut=prog>0.72?(1-prog)/0.28:1;
        const alpha=fadeIn*fadeOut*(s.layer===0?0.22:s.layer===1?0.16:0.11);
        /* Grandit en montant et se dilate latéralement */
        const sz=s.r*(0.3+prog*2.2);
        /* Couleur : noir profond avec légère teinte chaude à la base */
        const warm=Math.round(12*(1-prog*0.8));
        const lum=Math.round(8*(1-prog));
        ctx.fillStyle=`rgba(${lum+warm},${lum},${lum},${alpha})`;
        ctx.beginPath();ctx.arc(s.x,s.y,sz,0,Math.PI*2);ctx.fill();
      }
    }

    function drawEmbers(){
      for(const e of embers){
        e.x+=e.vx+Math.sin(t*0.4+e.phase)*0.08;
        e.y+=e.vy;
        e.phase+=e.spd;
        /* Regen au sol près du derrick */
        if(e.y<H*0.10||e.x<-8||e.x>W+8){
          e.x=W*(0.22+Math.random()*0.56);
          e.y=H*(0.62+Math.random()*0.28);
          e.vy=-(0.10+Math.random()*0.35);
          e.vx=(Math.random()-0.5)*0.30;
        }
        const pulse=0.55+0.45*Math.abs(Math.sin(e.phase));
        const op=e.op*pulse;
        if(e.isBraise){
          /* Braises : orange vif avec halo */
          const br=240+Math.random()*15|0;
          const bg=80+Math.random()*60|0;
          ctx.fillStyle=`rgba(${br},${bg},5,${op})`;
          ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);ctx.fill();
          /* Petit halo lumineux */
          const hg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r*2.5);
          hg.addColorStop(0,`rgba(255,${bg+20|0},0,${op*0.25})`);
          hg.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=hg;ctx.beginPath();ctx.arc(e.x,e.y,e.r*2.5,0,Math.PI*2);ctx.fill();
        } else {
          /* Cendres fines : gris-brun translucide */
          const cv=35+Math.random()*20|0;
          ctx.fillStyle=`rgba(${cv+8},${cv+3},${cv},${op*0.6})`;
          ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);ctx.fill();
        }
      }
    }

    function drawSVG(){
      if(!_svgReady||!_svgImg) return;
      /* Le SVG couvre tout le bas — on le place en pleine largeur, ancré au bas */
      const svgW=W;
      const svgH=svgW*(1.15); /* ratio approx portrait */
      const svgX=0;
      const svgY=H-svgH*0.80; /* ancré en bas, laisse dépasser vers le bas */
      ctx.save();
      ctx.globalAlpha=0.97;
      ctx.drawImage(_svgImg, svgX, svgY, svgW, svgH);
      ctx.restore();
    }

    function drawVignette(){
      const vg=ctx.createRadialGradient(cx,H*0.42,H*0.05,cx,H*0.42,H*0.92);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.40,`rgba(0,0,0,${0.05+Math.sin(t*0.20)*0.015})`);
      vg.addColorStop(0.72,'rgba(0,0,0,0.35)');
      vg.addColorStop(1,'rgba(0,0,0,0.92)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
      /* Grain film */
      for(let i=0;i<28;i++){
        const gv=6+Math.random()*10|0;
        ctx.fillStyle=`rgba(${gv+4},${gv+2},${gv},${Math.random()*0.016})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }
    }

    function frame(){
      if(stop.v){
        ctx.clearRect(0,0,W,H);
        cv.style.opacity='0';
        return;
      }
      drawBg();
      /* Derricks fantômes dans la brume */
      const horizY=H*0.62;
      ctx.save();ctx.globalAlpha=0.55;
      for(const d of ghostDerricks){
        drawGhostDerrick(d.x, horizY, H*d.h, d.opacity/0.55);
      }
      ctx.restore();
      drawSmoke();
      drawEmbers();
      drawSVG();
      drawVignette();
      t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
