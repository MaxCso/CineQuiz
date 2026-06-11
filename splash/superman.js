// CinéQuiz splash chunk — Superman
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Superman"]={
   name:'Superman',
   color:'40,80,200',
   ref:'Superman \u2014 Richard Donner, 1978',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_sup_s');
    if(!_s){_s=document.createElement('style');_s.id='_sup_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Citation personnalisée ── */
    const _qt=document.getElementById('splash-quote-text');
    const _qtOrig=_qt?_qt.textContent:'';
    if(_qt) _qt.textContent='\u00ab\u00a0Vous croirez qu\u2019un homme peut voler.\u00a0\u00bb';
    const _qtRestore=setInterval(()=>{if(stop.v){if(_qt)_qt.textContent=_qtOrig;clearInterval(_qtRestore);}},200);

    /* SVG Superman 628x1200 fill=white silhouette */
    const supImg=new Image();
    supImg.src='images/sprite_43.svg';
    let supReady=false;
    supImg.onload=()=>{supReady=true;};

    const SUP_W=W*0.18, SUP_H=SUP_W*(1200/628);
    let supY=H*1.05;
    const supTargetY=H*0.22;

    /* Traîne */
    const trail=[];
    const TRAIL_LEN=90;

    /* Étoiles — densifiées avec scintillements marqués */
    const stars=Array.from({length:320},()=>({
     x:Math.random()*W, y:Math.random()*H*0.88,
     r:Math.random()*1.6+0.15,
     op:0.18+Math.random()*0.72,
     ph:Math.random()*Math.PI*2,
     spd:0.010+Math.random()*0.038,
     spark:Math.random()<0.22, /* 22% sont des étoiles à pic de lumière */
    }));

    /* Étoiles filantes occasionnelles */
    const shooters=Array.from({length:6},()=>({
     active:false, x:0, y:0, vx:0, vy:0, life:0, maxLife:0,
    }));
    let shooterTimer=0;

    /* ── Skyline de Metropolis (procédurale, stable) ── */
    function buildSkyline(){
      const bldgs=[];
      const seed=(i,s)=>{let x=Math.sin(i*127.1+s*311.7)*43758.5453;return x-Math.floor(x);};
      /* Bâtiments de fond (plus larges, moins hauts) */
      let bx=0;
      for(let i=0;bx<W+20;i++){
        const bw=W*(0.045+seed(i,1)*0.055);
        const bh=H*(0.055+seed(i,2)*0.085);
        bldgs.push({x:bx,w:bw,h:bh,layer:0,
          windows:Array.from({length:Math.floor(seed(i,5)*8)+2},(_,wi)=>({
            rx:0.15+seed(i*7+wi,3)*0.70, ry:0.15+seed(i*7+wi,4)*0.65,
            on:seed(i*11+wi,6)>0.40,
          }))
        });
        bx+=bw*0.88+W*0.004;
      }
      /* Bâtiments de premier plan (plus hauts, plus étroits) */
      bx=-W*0.02;
      for(let i=0;bx<W+20;i++){
        const bw=W*(0.030+seed(i+50,1)*0.040);
        const bh=H*(0.080+seed(i+50,2)*0.120);
        bldgs.push({x:bx,w:bw,h:bh,layer:1,
          windows:Array.from({length:Math.floor(seed(i+50,5)*6)+1},(_,wi)=>({
            rx:0.12+seed((i+50)*7+wi,3)*0.74, ry:0.10+seed((i+50)*7+wi,4)*0.70,
            on:seed((i+50)*11+wi,6)>0.45,
          }))
        });
        bx+=bw*0.95+W*0.006;
      }
      return bldgs;
    }
    const skylineBldgs=buildSkyline();

    function drawSkyline(){
      const groundY=H*0.93;
      /* Sol */
      const groundG=ctx.createLinearGradient(0,groundY,0,H);
      groundG.addColorStop(0,'rgba(8,18,45,1)');
      groundG.addColorStop(1,'rgba(5,12,32,1)');
      ctx.fillStyle=groundG;ctx.fillRect(0,groundY,W,H-groundY);

      /* Reflet de ciel sur l'horizon */
      const horizG=ctx.createLinearGradient(0,groundY-H*0.04,0,groundY);
      horizG.addColorStop(0,'rgba(18,45,110,0)');
      horizG.addColorStop(1,'rgba(18,45,110,0.22)');
      ctx.fillStyle=horizG;ctx.fillRect(0,groundY-H*0.04,W,H*0.04);

      /* Couche de fond */
      for(const b of skylineBldgs.filter(b=>b.layer===0)){
        const by=groundY-b.h;
        ctx.fillStyle='rgba(8,16,40,0.82)';
        ctx.fillRect(b.x,by,b.w,b.h);
        for(const w of b.windows){
          if(!w.on)continue;
          const wx=b.x+w.rx*b.w;
          const wy=by+w.ry*b.h;
          ctx.fillStyle='rgba(200,220,255,0.18)';
          ctx.fillRect(wx,wy,b.w*0.09,b.h*0.06);
        }
      }
      /* Couche avant */
      for(const b of skylineBldgs.filter(b=>b.layer===1)){
        const by=groundY-b.h;
        ctx.fillStyle='rgba(6,13,34,0.95)';
        ctx.fillRect(b.x,by,b.w,b.h);
        /* Petite antenne sur certains bâtiments */
        if(b.h>H*0.13){
          ctx.strokeStyle='rgba(8,16,40,0.95)';ctx.lineWidth=1.5;
          ctx.beginPath();ctx.moveTo(b.x+b.w/2,by);ctx.lineTo(b.x+b.w/2,by-b.h*0.12);ctx.stroke();
        }
        for(const w of b.windows){
          if(!w.on)continue;
          const wx=b.x+w.rx*b.w;
          const wy=by+w.ry*b.h;
          ctx.fillStyle='rgba(220,235,255,0.22)';
          ctx.fillRect(wx,wy,b.w*0.10,b.h*0.05);
        }
      }
    }

    function frame(){
     if(stop.v)return;

     /* Superman monte */
     if(supY>supTargetY) supY-=Math.max(0.2, (supY-supTargetY)*0.008+H*0.0005);
     const supCX=cx+W*0.02;
     trail.unshift({x:supCX, y:supY+SUP_H*0.90});
     if(trail.length>TRAIL_LEN) trail.pop();

     /* Ciel bleu profond */
     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0,'#0a1833');
     sky.addColorStop(0.40,'#0e2040');
     sky.addColorStop(0.75,'#122648');
     sky.addColorStop(1,'#162c52');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

     /* Étoiles scintillantes */
     for(const s of stars){
      s.ph+=s.spd;
      let sa;
      if(s.spark){
       /* Pic de lumière rapide — étoile qui pulse fort */
       const pk=Math.pow(Math.max(0,Math.sin(s.ph)),6);
       sa=s.op*(0.15+0.85*pk);
       if(pk>0.85){
        /* Rayons en croix au pic */
        ctx.save();ctx.globalAlpha=pk*0.25;ctx.strokeStyle='rgba(255,255,255,0.9)';ctx.lineWidth=0.5;
        ctx.beginPath();ctx.moveTo(s.x-s.r*3,s.y);ctx.lineTo(s.x+s.r*3,s.y);ctx.stroke();
        ctx.beginPath();ctx.moveTo(s.x,s.y-s.r*3);ctx.lineTo(s.x,s.y+s.r*3);ctx.stroke();
        ctx.restore();
       }
      } else {
       sa=s.op*(0.35+0.65*Math.abs(Math.sin(s.ph)));
      }
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${sa})`;ctx.fill();
     }

     /* Étoiles filantes */
     shooterTimer++;
     if(shooterTimer>120){
      shooterTimer=0;
      const sh=shooters.find(s=>!s.active);
      if(sh){
       sh.active=true;sh.x=Math.random()*W*0.75;sh.y=Math.random()*H*0.40;
       sh.vx=W*0.014+Math.random()*W*0.010;sh.vy=H*0.005+Math.random()*H*0.004;
       sh.life=0;sh.maxLife=48+Math.random()*20|0;
      }
     }
     for(const sh of shooters){
      if(!sh.active)continue;
      sh.life++;
      if(sh.life>sh.maxLife){sh.active=false;continue;}
      const pct=1-(sh.life/sh.maxLife);
      /* Queue dégradée */
      const tailLen=sh.vx*1.2;
      const grad=ctx.createLinearGradient(sh.x,sh.y,sh.x-tailLen,sh.y-sh.vy*1.2);
      grad.addColorStop(0,`rgba(255,255,255,${pct*0.90})`);
      grad.addColorStop(0.4,`rgba(200,220,255,${pct*0.35})`);
      grad.addColorStop(1,'rgba(200,220,255,0)');
      ctx.save();ctx.strokeStyle=grad;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(sh.x,sh.y);ctx.lineTo(sh.x-tailLen,sh.y-sh.vy*1.2);ctx.stroke();
      ctx.restore();
      sh.x+=sh.vx;sh.y+=sh.vy;
     }

     /* Traîne de condensation */
     if(trail.length>2){
      for(let i=0;i<trail.length-1;i++){
       const pct=1-(i/TRAIL_LEN);
       ctx.beginPath();
       ctx.moveTo(trail[i].x,trail[i].y);
       ctx.lineTo(trail[i+1].x,trail[i+1].y);
       ctx.strokeStyle=`rgba(255,255,255,${pct*pct*0.60})`;
       ctx.lineWidth=Math.max(W*(0.003+pct*0.007)*pct, 0.4);
       ctx.lineCap='round';ctx.stroke();
      }
      /* Halo doux */
      for(let i=0;i<Math.min(trail.length-1,18);i++){
       const pct=1-(i/18);
       ctx.beginPath();
       ctx.moveTo(trail[i].x,trail[i].y);
       ctx.lineTo(trail[i+1].x,trail[i+1].y);
       ctx.strokeStyle=`rgba(180,210,255,${pct*0.10})`;
       ctx.lineWidth=W*0.022*pct;ctx.stroke();
      }
     }

     /* Silhouette Superman */
     if(supReady){
      ctx.drawImage(supImg, supCX-SUP_W*0.5, supY, SUP_W, SUP_H);
      /* Légère lueur */
      const gl=ctx.createRadialGradient(supCX,supY+SUP_H*0.38,0,supCX,supY+SUP_H*0.38,SUP_W*1.1);
      gl.addColorStop(0,`rgba(210,225,255,${0.07+Math.sin(t*0.5)*0.02})`);
      gl.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=gl;ctx.fillRect(supCX-SUP_W*1.2,supY,SUP_W*2.4,SUP_H*0.75);
     }

     drawSkyline();

     /* Vignette Superman */
     const vg=ctx.createRadialGradient(cx,H*0.5,H*0.18,cx,H*0.5,H*0.80);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.55,'rgba(8,20,55,0.08)');
     vg.addColorStop(0.82,'rgba(6,16,45,0.30)');
     vg.addColorStop(1,'rgba(5,12,35,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
