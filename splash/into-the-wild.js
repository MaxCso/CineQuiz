// CinéQuiz splash chunk — Into the Wild
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Into the Wild"]={
   name:'Into the Wild',
   color:'60,160,60',
   ref:'Into the Wild \u2014 Sean Penn, 2007',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.78';
    let t=0;
    const cx=W/2;

    /* ── CSS override : remonter citation + logo (~25%), descendre bus géré via BY ── */
    let _itwStyle=document.getElementById('_itw_splash_style');
    if(!_itwStyle){_itwStyle=document.createElement('style');_itwStyle.id='_itw_splash_style';document.head.appendChild(_itwStyle);}
    _itwStyle.textContent='#splash-content-wrap{top:25%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _itwWatch=setInterval(()=>{if(stop.v){_itwStyle.textContent='';clearInterval(_itwWatch);}},200);

    /* Étoiles — nuit Alaska */
    const stars=Array.from({length:200},()=>({x:Math.random()*W,y:Math.random()*H*0.60,r:Math.random()*1.6+0.2,op:Math.random()*0.85+0.10,tw:Math.random()*Math.PI*2,tf:Math.random()*0.025+0.005}));

    /* Aurore boréale subtile */
    const auroraLayers=Array.from({length:4},(_,i)=>({hue:120+i*20,y:H*(0.15+i*0.06),phase:i*Math.PI/3,amp:H*0.06}));

    /* ── Bus SVG ── */
    let busReady=false;
    const imgBus=new Image();
    imgBus.onload=()=>{busReady=true;};
    imgBus.src='images/sprite_13.svg';

    /* Arbres silhouettes */
    function drawTree(tx,ty,th,tw2){
     ctx.fillStyle='rgba(5,8,4,0.97)';
     ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(tx-tw2,ty+th); ctx.lineTo(tx+tw2,ty+th); ctx.closePath(); ctx.fill();
     ctx.beginPath(); ctx.moveTo(tx,ty+th*0.30); ctx.lineTo(tx-tw2*1.4,ty+th*0.75); ctx.lineTo(tx+tw2*1.4,ty+th*0.75); ctx.closePath(); ctx.fill();
     ctx.beginPath(); ctx.moveTo(tx,ty+th*0.55); ctx.lineTo(tx-tw2*1.8,ty+th); ctx.lineTo(tx+tw2*1.8,ty+th); ctx.closePath(); ctx.fill();
    }

    function frame(){
     if(stop.v)return;

     /* Ciel nuit Alaska */
     const sky=ctx.createLinearGradient(0,0,0,H*0.62);
     sky.addColorStop(0,'rgba(1,2,8,0.22)'); sky.addColorStop(0.5,'rgba(3,6,16,0.18)'); sky.addColorStop(1,'rgba(4,10,8,0.18)');
     ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*0.62);

     /* Étoiles */
     for(const s of stars){ s.tw+=s.tf; const op=s.op*(0.5+Math.sin(s.tw)*0.5); ctx.fillStyle=`rgba(255,250,230,${op})`; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); }

     /* Aurore boréale */
     for(const a of auroraLayers){
      const ag=ctx.createLinearGradient(0,a.y,0,a.y+a.amp*2.5);
      const alpha=0.10+Math.sin(t*0.4+a.phase)*0.06;
      ag.addColorStop(0,'rgba(0,0,0,0)');
      ag.addColorStop(0.3,`hsla(${a.hue},70%,55%,${alpha})`);
      ag.addColorStop(0.7,`hsla(${a.hue+20},60%,45%,${alpha*0.6})`);
      ag.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ag;
      ctx.beginPath(); ctx.moveTo(0,a.y);
      for(let x=0;x<=W;x+=6) ctx.lineTo(x,a.y+Math.sin(x*0.018+t*0.35+a.phase)*a.amp+Math.sin(x*0.030+t*0.2)*a.amp*0.4);
      ctx.lineTo(W,a.y+a.amp*2.5); ctx.lineTo(0,a.y+a.amp*2.5); ctx.closePath(); ctx.fill();
     }

     /* Sol neige */
     const ground=ctx.createLinearGradient(0,H*0.60,0,H);
     ground.addColorStop(0,'rgba(30,40,50,0.94)'); ground.addColorStop(0.4,'rgba(20,28,36,0.96)'); ground.addColorStop(1,'rgba(8,12,18,0.99)');
     ctx.fillStyle=ground; ctx.fillRect(0,H*0.60,W,H*0.40);

     /* Neige sur sol ondulée */
     const snowG=ctx.createLinearGradient(0,H*0.60,0,H*0.68);
     snowG.addColorStop(0,'rgba(60,75,90,0.90)'); snowG.addColorStop(1,'rgba(30,40,50,0.95)');
     ctx.fillStyle=snowG;
     ctx.beginPath(); ctx.moveTo(0,H*0.60);
     for(let x=0;x<=W;x+=4) ctx.lineTo(x,H*0.60+Math.sin(x*0.022+1.5)*7+Math.sin(x*0.04)*4);
     ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();

     /* Bus Magic (212) — SVG */
     const BW=W*0.72;
     const BH=BW*(117/391);
     const BX=cx-BW*0.5;
     const BY=H*0.665;
     if(busReady){
      /* Bus 391×117 → ratio 3.342, affiché à ~70% de la largeur */
      ctx.save();
      ctx.globalAlpha=0.94;
      ctx.drawImage(imgBus,BX,BY,BW,BH);
      ctx.restore();
     }

     /* Forêt de sapins — dessinée APRÈS le bus pour passer devant */
     const treeData=[[W*0.04,H*0.60,H*0.32,W*0.038],[W*0.14,H*0.58,H*0.38,W*0.042],[W*0.24,H*0.61,H*0.28,W*0.030],[W*0.76,H*0.60,H*0.36,W*0.040],[W*0.86,H*0.58,H*0.40,W*0.044],[W*0.94,H*0.61,H*0.30,W*0.032]];
     for(const [tx2,ty2,th,tw3] of treeData) drawTree(tx2,ty2,th,tw3);

     /* ── Feu de camp sous le bus ── */
     (function drawCampfire(){
      const FX=cx;
      const FY=BY+BH+H*0.040; /* juste sous le bas du bus */
      const fs=W*0.038; /* taille de référence */

      /* Braises / sol */
      const emberGlow=ctx.createRadialGradient(FX,FY+fs*0.55,0,FX,FY+fs*0.55,fs*1.6);
      emberGlow.addColorStop(0,`rgba(220,80,10,${0.22+Math.sin(t*2.0)*0.06})`);
      emberGlow.addColorStop(0.4,`rgba(180,50,5,${0.10+Math.sin(t*1.8)*0.04})`);
      emberGlow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=emberGlow;
      ctx.beginPath();ctx.ellipse(FX,FY+fs*0.55,fs*1.6,fs*0.45,0,0,Math.PI*2);ctx.fill();

      /* Bûches */
      ctx.save();
      ctx.strokeStyle='rgba(35,18,8,0.96)';ctx.lineWidth=fs*0.22;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(FX-fs*0.9,FY+fs*0.55);ctx.lineTo(FX+fs*0.5,FY+fs*0.30);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX+fs*0.9,FY+fs*0.55);ctx.lineTo(FX-fs*0.5,FY+fs*0.30);ctx.stroke();
      ctx.restore();

      /* Flammes — plusieurs couches oscillantes */
      const flicker1=Math.sin(t*4.2)*0.18+Math.sin(t*7.3)*0.10;
      const flicker2=Math.sin(t*5.1+1.2)*0.15+Math.sin(t*8.4)*0.08;
      const flicker3=Math.sin(t*3.4+2.4)*0.20+Math.sin(t*6.3)*0.12;

      function drawFlame(ox,oy,fw,fh,flk,alphaBase,hueShift){
       ctx.save();
       ctx.translate(FX+ox,FY+oy);
       const lean=flk*fw*0.55;
       const fg=ctx.createLinearGradient(0,0,lean,-(fh*(0.9+flk*0.18)));
       fg.addColorStop(0,`hsla(${20+hueShift},100%,62%,${alphaBase})`);
       fg.addColorStop(0.35,`hsla(${32+hueShift},100%,55%,${alphaBase*0.85})`);
       fg.addColorStop(0.70,`hsla(${48+hueShift},95%,48%,${alphaBase*0.60})`);
       fg.addColorStop(1,`hsla(${58+hueShift},80%,50%,0)`);
       ctx.fillStyle=fg;
       ctx.beginPath();
       ctx.moveTo(0,0);
       ctx.bezierCurveTo(-fw*0.5,-fh*0.35+lean*0.3, lean*0.6-fw*0.2,-fh*0.75, lean,-fh*(0.9+flk*0.18));
       ctx.bezierCurveTo(lean+fw*0.2,-fh*0.75, fw*0.5,-fh*0.35+lean*0.3, 0,0);
       ctx.closePath();ctx.fill();
       ctx.restore();
      }

      /* Couche orange extérieure */
      drawFlame(0,fs*0.28, fs*0.88, fs*1.55, flicker1, 0.82, 0);
      /* Couche jaune centrale */
      drawFlame(0,fs*0.28, fs*0.54, fs*1.30, flicker2, 0.78, 18);
      /* Cœur blanc/jaune vif */
      drawFlame(0,fs*0.28, fs*0.28, fs*0.90, flicker3, 0.72, 32);

      /* Halo lumineux sur le sol et le bus */
      const halo=ctx.createRadialGradient(FX,FY,0,FX,FY,fs*3.5);
      halo.addColorStop(0,`rgba(255,130,20,${0.11+Math.sin(t*2.7)*0.04})`);
      halo.addColorStop(0.5,`rgba(200,80,10,${0.05+Math.sin(t*2.5)*0.02})`);
      halo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo;ctx.fillRect(FX-fs*3.5,FY-fs*3.5,fs*7,fs*7);

      /* Étincelles */
      if(!drawCampfire._sparks){
       drawCampfire._sparks=Array.from({length:14},()=>({
        x:(Math.random()-0.5)*fs*0.6, y:-fs*(0.5+Math.random()*0.8),
        vx:(Math.random()-0.5)*0.012*W, vy:-(0.004+Math.random()*0.006)*W,
        life:Math.random(), maxLife:0.6+Math.random()*0.8, sz:W*0.003+Math.random()*W*0.003
       }));
      }
      for(const sp of drawCampfire._sparks){
       sp.life+=0.016;
       if(sp.life>sp.maxLife){
        sp.x=(Math.random()-0.5)*fs*0.5; sp.y=-fs*0.5;
        sp.vx=(Math.random()-0.5)*0.010*W; sp.vy=-(0.003+Math.random()*0.006)*W;
        sp.life=0; sp.maxLife=0.5+Math.random()*0.9;
       }
       sp.x+=sp.vx*0.016; sp.y+=sp.vy*0.016;
       const ratio=sp.life/sp.maxLife;
       const sop=(1-ratio)*0.90;
       ctx.fillStyle=ratio<0.5?`rgba(255,${180+Math.random()*60|0},30,${sop})`:`rgba(255,80,10,${sop*0.6})`;
       ctx.beginPath();ctx.arc(FX+sp.x,FY+sp.y,sp.sz*(1-ratio*0.5),0,Math.PI*2);ctx.fill();
      }
     })();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(0.45,'rgba(0,0,0,0.15)'); vg.addColorStop(1,'rgba(0,0,0,0.94)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
