// CinéQuiz splash chunk — Forrest Gump
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Forrest Gump"]={
   name:'Forrest Gump',
   color:'100,180,230',
   ref:'Forrest Gump \u2014 Robert Zemeckis, 1994',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;

    /* ── Override fond : bleu ciel du poster ── */
    let _fgStyle=document.getElementById('_fg_splash_style');
    if(!_fgStyle){_fgStyle=document.createElement('style');_fgStyle.id='_fg_splash_style';document.head.appendChild(_fgStyle);}
    _fgStyle.textContent='#splash-quote-text{color:rgba(15,45,90,0.90)!important;text-shadow:0 1px 3px rgba(255,255,255,0.40)!important;}';
    const _fgWatch=setInterval(()=>{if(stop.v){_fgStyle.textContent='';clearInterval(_fgWatch);}},200)

    /* ── Plumes multiples ── */
    const feathers=Array.from({length:4},(_,i)=>({
     x:W*(0.2+i*0.22),y:-30-i*80,
     vx:(Math.random()-0.5)*0.4+0.2,vy:0.55+Math.random()*0.4,
     rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-0.5)*0.012,
     size:14+Math.random()*8,phase:Math.random()*Math.PI*2
    }));

    /* ── Nuages volumétriques pré-calculés ── */
    const cloudDefs=[
     {bx:W*0.12,by:H*0.10,blobs:[{dx:0,dy:0,r:38},{dx:32,dy:-12,r:28},{dx:60,dy:4,r:32},{dx:88,dy:-6,r:25},{dx:48,dy:14,r:22},{dx:-18,dy:8,r:20}],sp:7},
     {bx:W*0.55,by:H*0.06,blobs:[{dx:0,dy:0,r:30},{dx:28,dy:-10,r:22},{dx:52,dy:2,r:26},{dx:76,dy:-4,r:20},{dx:38,dy:12,r:18}],sp:-5},
     {bx:W*0.30,by:H*0.20,blobs:[{dx:0,dy:0,r:24},{dx:22,dy:-8,r:18},{dx:42,dy:2,r:20},{dx:60,dy:-3,r:15}],sp:9},
     {bx:W*0.72,by:H*0.16,blobs:[{dx:0,dy:0,r:20},{dx:18,dy:-7,r:15},{dx:34,dy:2,r:17},{dx:50,dy:-2,r:13}],sp:-7},
     {bx:-W*0.1,by:H*0.28,blobs:[{dx:0,dy:0,r:28},{dx:24,dy:-9,r:21},{dx:46,dy:3,r:24},{dx:68,dy:-4,r:18}],sp:6},
    ];

    /* ── Lucioles ── */
    const fireflies=Array.from({length:18},()=>({
     x:Math.random()*W,
     y:H*0.55+Math.random()*H*0.38,
     vx:(Math.random()-0.5)*0.3,
     vy:(Math.random()-0.5)*0.18,
     phase:Math.random()*Math.PI*2,
     blinkSpd:0.018+Math.random()*0.022,
     blinkPhase:Math.random()*Math.PI*2,
     size:1.4+Math.random()*1.2
    }));

    function drawCloud(bx,by,blobs){
     ctx.save();ctx.translate(3,6);
     for(const b of blobs){
      const sg=ctx.createRadialGradient(bx+b.dx,by+b.dy,0,bx+b.dx,by+b.dy,b.r*1.1);
      sg.addColorStop(0,'rgba(130,140,160,0.10)');sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(bx+b.dx,by+b.dy,b.r*1.1,0,Math.PI*2);ctx.fill();
     }
     ctx.restore();
     for(const b of blobs){
      const cg=ctx.createRadialGradient(bx+b.dx,by+b.dy-b.r*0.18,b.r*0.1,bx+b.dx,by+b.dy,b.r);
      cg.addColorStop(0,'rgba(240,250,255,0.65)');
      cg.addColorStop(0.55,'rgba(230,245,255,0.40)');
      cg.addColorStop(1,'rgba(210,235,255,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(bx+b.dx,by+b.dy,b.r,0,Math.PI*2);ctx.fill();
     }
     const topBlob=blobs.reduce((a,b)=>b.dy<a.dy?b:a,blobs[0]);
     const hg=ctx.createRadialGradient(bx+topBlob.dx,by+topBlob.dy-topBlob.r*0.3,0,bx+topBlob.dx,by+topBlob.dy,topBlob.r*0.7);
     hg.addColorStop(0,'rgba(240,248,255,0.35)');hg.addColorStop(1,'rgba(255,255,255,0)');
     ctx.fillStyle=hg;ctx.beginPath();ctx.arc(bx+topBlob.dx,by+topBlob.dy,topBlob.r*0.7,0,Math.PI*2);ctx.fill();
    }

    function drawFeather(f){
     const s=f.size;
     ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.rot);
     const sg=ctx.createLinearGradient(0,-s,0,s);
     sg.addColorStop(0,'rgba(255,255,255,0.88)');sg.addColorStop(0.5,'rgba(240,248,255,0.72)');sg.addColorStop(1,'rgba(220,238,255,0.55)');
     ctx.strokeStyle=sg;ctx.lineWidth=1.1;
     ctx.beginPath();ctx.moveTo(0,-s);ctx.lineTo(0,s);ctx.stroke();
     for(let i=-9;i<=9;i++){
      const fy=(i/9)*s,fw=Math.sqrt(Math.max(0,1-(i/9)**2))*s*0.58;
      const a=0.42-Math.abs(i/9)*0.22;
      ctx.strokeStyle=`rgba(255,255,255,${a})`;ctx.lineWidth=0.65;
      ctx.beginPath();ctx.moveTo(0,fy);ctx.quadraticCurveTo(fw*0.45,fy-fw*0.18,fw,fy-fw*0.32);ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,fy);ctx.quadraticCurveTo(-fw*0.45,fy-fw*0.18,-fw,fy-fw*0.32);ctx.stroke();
     }
     ctx.restore();
    }

    /* ── Banc de parc — SVG ── */
    const benchImg=new Image();let benchReady=false;
    benchImg.onload=()=>{benchReady=true;};
    benchImg.src='images/sprite_03.svg';

    function drawBench(){
     /* SVG banc : 520×201 */
     const svgW=520, svgH=201;
     const scale=W*0.88/svgW;
     const offX=(W-svgW*scale)/2;
     const offY=H*0.76 - svgH*scale*0.82;

     /* Ombre sol */
     ctx.save();
     const sg=ctx.createRadialGradient(W/2,H*0.845,5,W/2,H*0.845,W*0.42);
     sg.addColorStop(0,'rgba(0,0,0,0.28)');sg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sg;ctx.beginPath();ctx.ellipse(W/2,H*0.848,W*0.40,H*0.018,0,0,Math.PI*2);ctx.fill();
     ctx.restore();

     if(benchReady){
      ctx.save();
      ctx.drawImage(benchImg,offX,offY,svgW*scale,svgH*scale);
      ctx.restore();
     }
    }

    /* ── Herbes au sol ── */
    function drawGrass(){
     const baseY=H*0.845;
     ctx.save();ctx.globalAlpha=0.13;
     const blades=[
      {x:W*0.04,h:18,sw:0.9},{x:W*0.09,h:13,sw:0.7},{x:W*0.14,h:20,sw:1.0},
      {x:W*0.19,h:11,sw:0.8},{x:W*0.78,h:16,sw:0.9},{x:W*0.83,h:22,sw:1.0},
      {x:W*0.88,h:14,sw:0.8},{x:W*0.93,h:19,sw:1.0},{x:W*0.97,h:12,sw:0.7},
     ];
     for(const b of blades){
      const sway=Math.sin(t*0.6+b.x)*3.5;
      ctx.strokeStyle='rgba(120,145,80,1)';ctx.lineWidth=b.sw;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(b.x,baseY);
      ctx.quadraticCurveTo(b.x+sway*0.5,baseY-b.h*0.55,b.x+sway,baseY-b.h);
      ctx.stroke();
     }
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* ── Fond bleu ciel dégradé — poster Forrest Gump ── */
     const bgG=ctx.createRadialGradient(W/2,H*0.38,0,W/2,H*0.50,H*0.82);
     bgG.addColorStop(0,'#d8ecf8');   /* centre : blanc-bleu très clair */
     bgG.addColorStop(0.35,'#a8d4ed');/* bleu ciel moyen */
     bgG.addColorStop(0.70,'#7bb8de');/* bleu plus soutenu */
     bgG.addColorStop(1,'#5a9fd4');   /* bleu foncé en périphérie */
     ctx.fillStyle=bgG;ctx.fillRect(0,0,W,H);

     /* Nuages */
     for(const c of cloudDefs){
      const ox=((c.sp*t*0.8)%(W+220));
      drawCloud(c.bx+ox,c.by,c.blobs);
     }

     /* Plumes */
     for(const f of feathers){
      f.x+=f.vx+Math.sin(t*0.55+f.phase)*0.45;
      f.y+=f.vy+Math.sin(t*0.38+f.phase)*0.28;
      f.rot+=f.rotSpd;
      if(f.y>H+40){f.y=-40;f.x=Math.random()*W;}
      drawFeather(f);
     }

     /* Herbes */
     drawGrass();

     /* Banc */
     drawBench();

     /* Lucioles */
     for(const ff of fireflies){
      ff.blinkPhase+=ff.blinkSpd;
      ff.phase+=0.008;
      ff.x+=ff.vx+Math.sin(ff.phase*1.3)*0.22;
      ff.y+=ff.vy+Math.cos(ff.phase)*0.12;
      if(ff.x<0)ff.x=W;if(ff.x>W)ff.x=0;
      if(ff.y<H*0.50)ff.y=H*0.92;if(ff.y>H*0.95)ff.y=H*0.52;
      const blink=Math.max(0,Math.sin(ff.blinkPhase));
      if(blink<0.05)continue;
      const alpha=blink*0.22; /* réduit pour fond clair */
      /* Halo doux */
      const fg=ctx.createRadialGradient(ff.x,ff.y,0,ff.x,ff.y,ff.size*5);
      fg.addColorStop(0,`rgba(200,240,100,${alpha*0.55})`);
      fg.addColorStop(0.4,`rgba(170,220,60,${alpha*0.18})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.beginPath();ctx.arc(ff.x,ff.y,ff.size*5,0,Math.PI*2);ctx.fill();
      /* Point lumineux central */
      ctx.fillStyle=`rgba(230,255,150,${alpha*0.9})`;
      ctx.beginPath();ctx.arc(ff.x,ff.y,ff.size*0.7,0,Math.PI*2);ctx.fill();
     }

     /* Vignette douce — bords légèrement plus sombres comme sur le poster */
     const vg=ctx.createRadialGradient(W/2,H*0.42,H*0.08,W/2,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.60,'rgba(30,80,140,0.05)');
     vg.addColorStop(1,'rgba(20,60,120,0.25)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
