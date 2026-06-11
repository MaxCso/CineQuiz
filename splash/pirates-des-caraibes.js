// CinéQuiz splash chunk — Pirates des Caraïbes
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Pirates des Caraïbes"]={
   name:'Pirates des Caraïbes',
   color:'40,100,160',
   ref:'Pirates des Cara\u00efbes \u2014 Gore Verbinski, 2003',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.82';
    let t=0;
    const cx=W/2;

    /* ── Citation + logo sous le bateau ── */
    let _pirStyle=document.getElementById('_pir_s');
    if(!_pirStyle){_pirStyle=document.createElement('style');_pirStyle.id='_pir_s';document.head.appendChild(_pirStyle);}
    _pirStyle.textContent='#splash-content-wrap{top:70%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _pirW=setInterval(()=>{if(stop.v){_pirStyle.textContent='';clearInterval(_pirW);}},200);

    /* Vagues */
    const waveCount=5;
    /* Étoiles */
    const stars=Array.from({length:90},()=>({x:Math.random()*W,y:Math.random()*H*0.42,r:Math.random()*1.2+0.2,op:Math.random()*0.75+0.2,tw:Math.random()*Math.PI*2,tf:Math.random()*0.03+0.01}));
    /* Mouettes */
    const gulls=Array.from({length:4},()=>({x:Math.random()*W,y:H*0.08+Math.random()*H*0.18,vx:0.6+Math.random()*0.8,phase:Math.random()*Math.PI*2}));

    /* ── Squelette SVG — chargé une seule fois ── */
    let skelImg=null;
    const skelSvg=new Image();
    skelSvg.onload=()=>{skelImg=skelSvg;};
    skelSvg.src='images/sprite_10.svg';

    /* ── Bateau SVG — chargé une seule fois ── */
    let shipImg=null;
    const shipSvg=new Image();
    shipSvg.onload=()=>{shipImg=shipSvg;};
    shipSvg.src='images/sprite_11.svg';

    function drawShip(){
     if(!shipImg)return;
     /* Le SVG est en 1280×866 — on le centre et on l'anime en tangage */
     const shipW=W*0.82;
     const shipH=shipW*(866/1280);
     const shipX=(W-shipW)/2;
     /* Le bas du bateau se pose sur la ligne d'eau */
     const waterLine=H*0.60;
     const shipY=waterLine-shipH+shipH*0.18+Math.sin(t*0.7)*3;
     const rock=Math.sin(t*0.9)*3*Math.PI/180;
     ctx.save();
     ctx.translate(W/2, waterLine+Math.sin(t*0.7)*3);
     ctx.rotate(rock);

     /* ── Squelette juste au-dessus de la coque ── */
     if(skelImg){
      const skelW=W*0.30;
      const skelH=skelW*(220/248);
      /* Positionné sur le pont, centré légèrement à gauche */
      const skelOffX=W*0.02;
      /* Le bas du squelette ≈ haut de la coque = -shipH+shipH*0.18 */
      const coqueCY=-shipH+shipH*0.18;
      const skelY=coqueCY-skelH+skelH*0.12+Math.sin(t*0.7)*2; /* suit le tangage */
      ctx.save();
      ctx.globalAlpha=0.82;
      ctx.filter='brightness(0.50) sepia(0.20)';
      ctx.drawImage(skelImg,-skelW/2+skelOffX,skelY,skelW,skelH);
      ctx.filter='none';
      ctx.globalAlpha=1;
      ctx.restore();
     }

     /* Teinte sombre + légère transparence pour s'intégrer à la nuit */
     ctx.globalAlpha=0.88;
     ctx.filter='brightness(0.55) sepia(0.25)';
     ctx.drawImage(shipImg,-shipW/2,-shipH+shipH*0.18,shipW,shipH);
     ctx.filter='none';
     ctx.globalAlpha=1;
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     /* Ciel nuit tropicale */
     const sky=ctx.createLinearGradient(0,0,0,H*0.48);
     sky.addColorStop(0,'rgba(2,3,10,0.20)'); sky.addColorStop(0.6,'rgba(8,12,25,0.18)'); sky.addColorStop(1,'rgba(12,18,15,0.18)');
     ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*0.48);

     /* Étoiles */
     for(const s of stars){ s.tw+=s.tf; const op=s.op*(0.5+Math.sin(s.tw)*0.5); ctx.fillStyle=`rgba(255,250,220,${op})`; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); }

     /* ── Pleine lune lumineuse ── */
     const moonX=W*0.72, moonY=H*0.13, moonR=W*0.088;
     /* Halo atmosphérique large — éclaire tout le ciel */
     const atmoG=ctx.createRadialGradient(moonX,moonY,moonR*0.5,moonX,moonY,W*0.65);
     atmoG.addColorStop(0,`rgba(255,240,180,${0.22+Math.sin(t*0.15)*0.03})`);
     atmoG.addColorStop(0.18,'rgba(220,200,130,0.10)');
     atmoG.addColorStop(0.45,'rgba(160,140,80,0.04)');
     atmoG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=atmoG;ctx.fillRect(0,0,W,H);
     /* Halo proche — couronne lumineuse */
     const haloG=ctx.createRadialGradient(moonX,moonY,moonR*0.8,moonX,moonY,moonR*3.2);
     haloG.addColorStop(0,`rgba(255,245,200,${0.38+Math.sin(t*0.2)*0.05})`);
     haloG.addColorStop(0.25,'rgba(240,220,150,0.14)');
     haloG.addColorStop(0.60,'rgba(200,180,100,0.05)');
     haloG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=haloG;ctx.beginPath();ctx.arc(moonX,moonY,moonR*3.2,0,Math.PI*2);ctx.fill();
     /* Disque lunaire — blanc-crème avec légère texture */
     const diskG=ctx.createRadialGradient(moonX-moonR*0.22,moonY-moonR*0.20,0,moonX,moonY,moonR);
     diskG.addColorStop(0,'rgba(255,255,245,1)');
     diskG.addColorStop(0.40,'rgba(248,240,210,0.98)');
     diskG.addColorStop(0.78,'rgba(235,220,175,0.96)');
     diskG.addColorStop(1,'rgba(210,195,140,0.90)');
     ctx.fillStyle=diskG;ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.fill();
     /* Cratères lunaires discrets */
     const craters=[
      {ox:-0.30,oy:-0.15,r:0.18,op:0.08},{ox:0.22,oy:0.28,r:0.12,op:0.07},
      {ox:-0.10,oy:0.35,r:0.09,op:0.06},{ox:0.35,oy:-0.30,r:0.14,op:0.07},
      {ox:-0.42,oy:0.22,r:0.10,op:0.05},
     ];
     for(const c of craters){
      ctx.fillStyle=`rgba(180,165,120,${c.op})`;
      ctx.beginPath();ctx.arc(moonX+c.ox*moonR,moonY+c.oy*moonR,c.r*moonR,0,Math.PI*2);ctx.fill();
     }
     /* Bord lumineux */
     ctx.strokeStyle='rgba(255,250,220,0.55)';ctx.lineWidth=W*0.004;
     ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.stroke();

     /* ── Colonne de lumière lune → eau — reflet vertical ── */
     const beamG=ctx.createLinearGradient(moonX,moonY+moonR,moonX,H*0.60);
     beamG.addColorStop(0,`rgba(255,240,180,${0.06+Math.sin(t*0.3)*0.02})`);
     beamG.addColorStop(0.5,'rgba(220,200,130,0.03)');
     beamG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=beamG;
     ctx.beginPath();
     ctx.moveTo(moonX-moonR*0.5,moonY+moonR);
     ctx.lineTo(moonX+moonR*0.5,moonY+moonR);
     ctx.lineTo(moonX+W*0.10,H*0.60);
     ctx.lineTo(moonX-W*0.10,H*0.60);
     ctx.closePath();ctx.fill();

     /* Mouettes */
     for(const g of gulls){
      g.x+=g.vx; if(g.x>W+30)g.x=-30;
      g.phase+=0.04;
      const gy=g.y+Math.sin(g.phase)*4;
      ctx.strokeStyle='rgba(180,170,160,0.55)'; ctx.lineWidth=1.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(g.x-8,gy); ctx.quadraticCurveTo(g.x,gy-4+Math.sin(g.phase*2)*2,g.x+8,gy); ctx.stroke();
     }

     /* Mer */
     for(let wi=waveCount-1;wi>=0;wi--){
      const wy=H*0.48+wi*H*0.05;
      const depth=wi/waveCount;
      const wg=ctx.createLinearGradient(0,wy,0,wy+H*0.06);
      wg.addColorStop(0,`rgba(${5+depth*15},${25+depth*30},${40+depth*25},0.18)`);
      wg.addColorStop(1,`rgba(3,15,25,0.18)`);
      ctx.fillStyle=wg;
      ctx.beginPath(); ctx.moveTo(0,wy);
      for(let x=0;x<=W;x+=4){
       const wave1=Math.sin(x*0.022+t*(1.2-wi*0.15)+wi*1.3)*8*(1-depth*0.4);
       const wave2=Math.sin(x*0.035+t*(0.8+wi*0.1)+wi*2.1)*4*(1-depth*0.3);
       ctx.lineTo(x,wy+wave1+wave2);
      }
      ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
     }

     /* Reflets lune sur eau — colonne dorée animée depuis la lune */
     const reflX=W*0.72; /* aligne avec moonX */
     const refl=ctx.createLinearGradient(reflX-W*0.12,H*0.50,reflX+W*0.12,H*0.50);
     refl.addColorStop(0,'rgba(0,0,0,0)');
     refl.addColorStop(0.35,`rgba(255,235,130,${0.16+Math.sin(t*1.5)*0.05})`);
     refl.addColorStop(0.50,`rgba(255,245,180,${0.22+Math.sin(t*1.2)*0.06})`);
     refl.addColorStop(0.65,`rgba(255,235,130,${0.16+Math.sin(t*1.5)*0.05})`);
     refl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=refl;ctx.fillRect(reflX-W*0.12,H*0.50,W*0.24,H*0.20);
     /* Miroitement horizontal ondulant */
     for(let ri=0;ri<5;ri++){
      const ry=H*(0.52+ri*0.04)+Math.sin(t*1.8+ri*1.2)*2;
      const rw=W*(0.08-ri*0.01)*(0.7+Math.sin(t*2+ri)*0.3);
      ctx.fillStyle=`rgba(255,240,160,${(0.10-ri*0.015)*(0.6+Math.sin(t*2.2+ri)*0.4)})`;
      ctx.fillRect(reflX-rw/2,ry,rw,H*0.006);
     }

     /* Bateau */
     drawShip();

     /* Lumière lunaire sur le bateau — halo doré côté lune (droite) */
     const shipGlowX=W*0.60, shipGlowY=H*0.48;
     const shipMoonG=ctx.createRadialGradient(shipGlowX,shipGlowY,0,shipGlowX,shipGlowY,W*0.32);
     shipMoonG.addColorStop(0,`rgba(255,240,170,${0.10+Math.sin(t*0.2)*0.02})`);
     shipMoonG.addColorStop(0.45,'rgba(220,195,120,0.04)');
     shipMoonG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shipMoonG;ctx.fillRect(0,H*0.28,W,H*0.40);

     /* Brume */
     const mist=ctx.createLinearGradient(0,H*0.44,0,H*0.58);
     mist.addColorStop(0,'rgba(0,0,0,0)'); mist.addColorStop(0.5,`rgba(18,28,38,${0.22+Math.sin(t*0.5)*0.05})`); mist.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mist; ctx.fillRect(0,H*0.44,W,H*0.14);

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.06,cx,H*0.5,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(0.5,'rgba(0,0,0,0.15)'); vg.addColorStop(1,'rgba(0,0,0,0.93)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
