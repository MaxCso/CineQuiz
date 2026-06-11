// CinéQuiz splash chunk — Dune
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Dune"]={
   name:'Dune',
   color:'200,160,60',
   ref:'Dune \u2014 Denis Villeneuve, 2021',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── CSS ── */
    let _ds=document.getElementById('_dn_s');
    if(!_ds){_ds=document.createElement('style');_ds.id='_dn_s';document.head.appendChild(_ds);}
    _ds.textContent=`
     

     #splash-content-wrap{top:26%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{
       color:rgba(240,218,168,0.92)!important;
       text-shadow:0 2px 20px rgba(0,0,0,1),0 0 40px rgba(160,80,10,0.6)!important;
     }
     #splash-film-logo{
       filter:drop-shadow(0 4px 28px rgba(0,0,0,0.98)) drop-shadow(0 0 16px rgba(200,130,20,0.35))!important;
     }
    `;
    const _dw=setInterval(()=>{if(stop.v){_ds.textContent='';clearInterval(_dw);}},200);

    /* ── Particules de sable / épice ── */
    const sand=Array.from({length:180},()=>({
     x:Math.random()*W*1.4-W*0.2,
     y:Math.random()*H,
     vx:0.65+Math.random()*1.20,
     vy:(Math.random()-0.5)*0.28,
     r:Math.random()*1.8+0.2,
     op:0.12+Math.random()*0.38,
     ph:Math.random()*Math.PI*2,
     spice:Math.random()<0.18,
    }));

    /* ── Étoiles ── */
    const stars=Array.from({length:80},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.55,
     r:Math.random()*0.9+0.15,
     op:Math.random()*0.55+0.10,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Ver des sables — courbe massive ── */
    // Segments du ver qui émergent progressivement
    let wormProgress=0; // 0→1 sur 8 secondes

    /* ── Silhouette Fremen sur crête de dune ── */
    function drawFremen(fx, fy, sc){
     ctx.save();ctx.translate(fx,fy);
     // Cape
     ctx.fillStyle='rgba(18,12,4,0.95)';
     ctx.beginPath();
     ctx.moveTo(0,0);
     ctx.bezierCurveTo(-W*0.028*sc,-H*0.028,-W*0.032*sc,-H*0.055,W*0.004*sc,-H*0.070);
     ctx.bezierCurveTo(W*0.028*sc,-H*0.055,W*0.025*sc,-H*0.028,0,0);
     ctx.closePath();ctx.fill();
     // Tête + capuche
     ctx.beginPath();ctx.arc(W*0.004*sc,-H*0.072,W*0.013*sc,0,Math.PI*2);ctx.fill();
     // Bâton
     ctx.strokeStyle='rgba(14,10,4,0.90)';ctx.lineWidth=W*0.005*sc;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(W*0.016*sc,-H*0.002);ctx.lineTo(W*0.022*sc,-H*0.068);ctx.stroke();
     ctx.restore();
    }

    /* ── Dunes ── */
    function drawDunes(){
     // Dune lointaine — horizon
     ctx.fillStyle='rgba(30,18,4,0.92)';
     ctx.beginPath();
     ctx.moveTo(0,H*0.72);
     const cp1x=W*0.20, cp1y=H*0.60, cp2x=W*0.50, cp2y=H*0.56;
     const cp3x=W*0.75, cp3y=H*0.64, cp4x=W, cp4y=H*0.70;
     ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,W*0.38,H*0.58);
     ctx.bezierCurveTo(W*0.55,H*0.55,cp3x,cp3y,cp4x,cp4y);
     ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();

     // Reflet de crête — lumière rasante
     const crestG=ctx.createLinearGradient(0,H*0.575,0,H*0.60);
     crestG.addColorStop(0,`rgba(200,140,40,${0.18+Math.sin(t*0.08)*0.03})`);
     crestG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=crestG;
     ctx.beginPath();
     ctx.moveTo(W*0.25,H*0.595);
     ctx.bezierCurveTo(W*0.35,H*0.560,W*0.52,H*0.555,W*0.62,H*0.568);
     ctx.lineTo(W*0.62,H*0.585);
     ctx.bezierCurveTo(W*0.52,H*0.572,W*0.35,H*0.577,W*0.25,H*0.612);
     ctx.closePath();ctx.fill();

     // Dune avant — plus grande
     const duneG=ctx.createLinearGradient(0,H*0.72,0,H);
     duneG.addColorStop(0,'rgba(55,32,8,0.99)');
     duneG.addColorStop(0.30,'rgba(38,22,5,0.99)');
     duneG.addColorStop(1,'rgba(18,10,2,1)');
     ctx.fillStyle=duneG;
     ctx.beginPath();
     ctx.moveTo(0,H*0.80);
     ctx.bezierCurveTo(W*0.15,H*0.74,W*0.38,H*0.72,W*0.52,H*0.73);
     ctx.bezierCurveTo(W*0.68,H*0.74,W*0.85,H*0.76,W,H*0.80);
     ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();

     // Crête lumineuse dune avant
     const crest2G=ctx.createLinearGradient(0,H*0.718,0,H*0.745);
     crest2G.addColorStop(0,`rgba(220,160,50,${0.22+Math.sin(t*0.10)*0.04})`);
     crest2G.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=crest2G;
     ctx.beginPath();
     ctx.moveTo(W*0.20,H*0.742);
     ctx.bezierCurveTo(W*0.38,H*0.724,W*0.55,H*0.728,W*0.80,H*0.742);
     ctx.lineTo(W*0.80,H*0.752);
     ctx.bezierCurveTo(W*0.55,H*0.738,W*0.38,H*0.734,W*0.20,H*0.752);
     ctx.closePath();ctx.fill();

     // Texture ondulations de sable
     ctx.strokeStyle=`rgba(70,42,10,${0.12+Math.sin(t*0.06)*0.02})`;
     ctx.lineWidth=0.6;
     for(let i=0;i<8;i++){
      const ly=H*0.75+i*H*0.018;
      const amp=W*0.012*(1-i*0.08);
      ctx.beginPath();
      ctx.moveTo(0,ly);
      for(let x=0;x<W;x+=W*0.04){
       const wy=ly+Math.sin(x*0.025+t*0.3+i*0.8)*amp;
       ctx.lineTo(x,wy);
      }
      ctx.stroke();
     }
    }

    /* ── Ver des sables ── */
    function drawWorm(){
     if(wormProgress<=0)return;
     const p=Math.min(wormProgress,1);
     const wormCx=cx*0.85;
     const wormBase=H*0.76;
     const wormH=H*0.22*p;
     const wormW=W*0.18;

     ctx.save();
     // Corps principal — anneau géant
     const bodyG=ctx.createRadialGradient(wormCx,wormBase-wormH*0.5,0,wormCx,wormBase-wormH*0.5,wormW*0.9);
     bodyG.addColorStop(0,'rgba(55,35,12,0.95)');
     bodyG.addColorStop(0.45,'rgba(40,25,8,0.98)');
     bodyG.addColorStop(0.75,'rgba(22,14,4,0.90)');
     bodyG.addColorStop(1,'rgba(0,0,0,0)');

     // Silhouette du ver
     ctx.fillStyle='rgba(28,16,4,0.97)';
     ctx.beginPath();
     ctx.moveTo(wormCx-wormW*0.5,wormBase);
     ctx.bezierCurveTo(
      wormCx-wormW*0.55,wormBase-wormH*0.4,
      wormCx-wormW*0.48,wormBase-wormH*0.85,
      wormCx,wormBase-wormH
     );
     ctx.bezierCurveTo(
      wormCx+wormW*0.48,wormBase-wormH*0.85,
      wormCx+wormW*0.55,wormBase-wormH*0.4,
      wormCx+wormW*0.5,wormBase
     );
     ctx.closePath();ctx.fill();

     // Annulations — segments du ver
     for(let i=1;i<=5;i++){
      const sy=wormBase-wormH*(i/6);
      const sw=wormW*(0.5-i*0.05)*Math.min(i/3,1);
      ctx.strokeStyle=`rgba(18,10,2,${0.55-i*0.06})`;
      ctx.lineWidth=W*0.004;
      ctx.beginPath();ctx.ellipse(wormCx,sy,sw,sw*0.15,0,0,Math.PI*2);ctx.stroke();
     }

     // Gueule ouverte — dents
     const mouthY=wormBase-wormH;
     const mouthR=wormW*0.32;
     ctx.fillStyle='rgba(8,4,2,0.98)';
     ctx.beginPath();ctx.ellipse(wormCx,mouthY,mouthR,mouthR*0.60,0,0,Math.PI*2);ctx.fill();
     // Rangées de dents
     ctx.fillStyle='rgba(188,150,80,0.70)';
     for(let i=0;i<7;i++){
      const ta=(i/6)*Math.PI*2;
      const tx=wormCx+Math.cos(ta)*mouthR*0.72;
      const ty=mouthY+Math.sin(ta)*mouthR*0.44;
      ctx.beginPath();ctx.arc(tx,ty,W*0.006,0,Math.PI*2);ctx.fill();
     }

     // Reflet brillant sur la surface du ver
     const shineG=ctx.createLinearGradient(wormCx-wormW*0.3,wormBase-wormH,wormCx,wormBase-wormH*0.5);
     shineG.addColorStop(0,'rgba(100,65,20,0.22)');
     shineG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shineG;
     ctx.beginPath();
     ctx.moveTo(wormCx-wormW*0.28,wormBase);
     ctx.bezierCurveTo(wormCx-wormW*0.30,wormBase-wormH*0.4,wormCx-wormW*0.22,wormBase-wormH*0.7,wormCx-wormW*0.05,wormBase-wormH);
     ctx.lineTo(wormCx+wormW*0.05,wormBase-wormH);
     ctx.bezierCurveTo(wormCx-wormW*0.10,wormBase-wormH*0.7,wormCx-wormW*0.18,wormBase-wormH*0.4,wormCx-wormW*0.16,wormBase);
     ctx.closePath();ctx.fill();

     ctx.restore();
     wormProgress+=0.0008;
    }

    function frame(){
     if(stop.v)return;

     /* ── CIEL crépusculaire ── */
     const sky=ctx.createLinearGradient(0,0,0,H*0.75);
     sky.addColorStop(0,'#0d0804');
     sky.addColorStop(0.18,'#180e04');
     sky.addColorStop(0.40,`rgba(38,18,4,1)`);
     sky.addColorStop(0.65,`rgba(70,32,6,1)`);
     sky.addColorStop(0.82,`rgba(110,55,10,1)`);
     sky.addColorStop(1,`rgba(140,72,14,1)`);
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.75);

     /* Soleil bas à l'horizon — halo épice */
     const sunG=ctx.createRadialGradient(cx,H*0.76,0,cx,H*0.76,W*0.65);
     sunG.addColorStop(0,`rgba(255,180,40,${0.55+Math.sin(t*0.08)*0.05})`);
     sunG.addColorStop(0.18,`rgba(220,120,20,${0.32+Math.sin(t*0.10)*0.04})`);
     sunG.addColorStop(0.42,`rgba(160,70,8,${0.18})`);
     sunG.addColorStop(0.70,'rgba(80,30,4,0.08)');
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H);

     /* Halo épice — pulse mystique orange-rouge */
     const spiceG=ctx.createRadialGradient(cx*0.85,H*0.74,0,cx*0.85,H*0.74,W*0.45);
     spiceG.addColorStop(0,`rgba(200,80,10,${0.20+Math.sin(t*0.18)*0.06})`);
     spiceG.addColorStop(0.40,'rgba(140,45,5,0.08)');
     spiceG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=spiceG;ctx.fillRect(0,H*0.50,W,H*0.50);

     /* ── DEUX LUNES — juste au-dessus de la dune ── */
     // Lune principale
     ctx.fillStyle=`rgba(220,190,120,${0.82+Math.sin(t*0.06)*0.04})`;
     ctx.beginPath();ctx.arc(W*0.72,H*0.52,W*0.045,0,Math.PI*2);ctx.fill();
     // Ombre lune
     const moon1Sh=ctx.createRadialGradient(W*0.74,H*0.51,0,W*0.72,H*0.52,W*0.045);
     moon1Sh.addColorStop(0,'rgba(0,0,0,0)');
     moon1Sh.addColorStop(0.55,'rgba(13,8,2,0.22)');
     moon1Sh.addColorStop(1,'rgba(13,8,2,0.78)');
     ctx.fillStyle=moon1Sh;
     ctx.beginPath();ctx.arc(W*0.72,H*0.52,W*0.045,0,Math.PI*2);ctx.fill();
     // Lune secondaire — plus petite, plus loin
     ctx.fillStyle=`rgba(200,175,110,${0.55+Math.sin(t*0.09)*0.04})`;
     ctx.beginPath();ctx.arc(W*0.58,H*0.48,W*0.022,0,Math.PI*2);ctx.fill();
     const moon2Sh=ctx.createRadialGradient(W*0.59,H*0.475,0,W*0.58,H*0.48,W*0.022);
     moon2Sh.addColorStop(0,'rgba(0,0,0,0)');
     moon2Sh.addColorStop(0.6,'rgba(13,8,2,0.20)');
     moon2Sh.addColorStop(1,'rgba(13,8,2,0.65)');
     ctx.fillStyle=moon2Sh;
     ctx.beginPath();ctx.arc(W*0.58,H*0.48,W*0.022,0,Math.PI*2);ctx.fill();

     /* ── ÉTOILES ── */
     for(const s of stars){
      s.ph+=0.008;
      const op=s.op*(0.65+0.35*Math.sin(s.ph));
      ctx.fillStyle=`rgba(230,210,165,${op})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── DUNES ── */
     drawDunes();

     /* ── VER DES SABLES ── */
     if(t>3.0) wormProgress+=0.0;
     if(t>3.0&&wormProgress===0) wormProgress=0.001;
     drawWorm();

     /* ── FREMEN sur crête ── */
     drawFremen(W*0.55,H*0.724,1.0);
     drawFremen(W*0.62,H*0.738,0.78);

     /* ── PARTICULES SABLE ── */
     for(const p of sand){
      p.x+=p.vx;p.y+=p.vy+Math.sin(p.ph+t*0.4)*0.12;p.ph+=0.015;
      if(p.x>W+10){p.x=-10;p.y=Math.random()*H;}
      const col=p.spice
       ? `rgba(220,100,20,${p.op*(0.55+0.45*Math.abs(Math.sin(p.ph)))})`
       : `rgba(200,148,68,${p.op*(0.45+0.55*Math.abs(Math.sin(p.ph)))})`;
      ctx.fillStyle=col;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* ── VIGNETTE ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.06,cx,H*0.48,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.38,'rgba(5,3,1,0.04)');
     vg.addColorStop(0.62,'rgba(5,3,1,0.38)');
     vg.addColorStop(0.82,'rgba(4,2,1,0.72)');
     vg.addColorStop(1,'rgba(3,1,0,0.95)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Bande top */
     const tb=ctx.createLinearGradient(0,0,0,H*0.15);
     tb.addColorStop(0,'rgba(13,8,4,0.92)');
     tb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tb;ctx.fillRect(0,0,W,H*0.15);

     /* Grain de film */
     for(let i=0;i<28;i++){
      const gv=4+Math.random()*14|0;
      ctx.fillStyle=`rgba(${gv+18},${gv+8},${gv+2},${Math.random()*0.014})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.6+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
