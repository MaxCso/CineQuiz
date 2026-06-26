// CinéQuiz splash chunk — Forrest Gump
// Fond : images/forrest-gump.png  +  effets superposés (plumes, nuages doux,
// particules de lumière, oiseaux lointains).
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Forrest Gump"]={
   name:'Forrest Gump',
   color:'100,180,230',
   ref:'Forrest Gump \u2014 Robert Zemeckis, 1994',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;

    /* ── Override : couleur de la citation lisible sur ciel clair ── */
    let _fgStyle=document.getElementById('_fg_splash_style');
    if(!_fgStyle){_fgStyle=document.createElement('style');_fgStyle.id='_fg_splash_style';document.head.appendChild(_fgStyle);}
    _fgStyle.textContent='#splash-quote-text{color:rgba(15,45,90,0.90)!important;text-shadow:0 1px 3px rgba(255,255,255,0.40)!important;}'
      +'#splash-canvas{width:100%!important;height:100%!important;left:0!important;right:0!important;}';
    const _fgWatch=setInterval(()=>{if(stop.v){_fgStyle.textContent='';clearInterval(_fgWatch);}},200);

    /* ── Chargement du fond PNG ── */
    const bg=new Image();
    let bgReady=false;
    bg.onload=function(){bgReady=true;};
    bg.onerror=function(){bgReady=false;};
    bg.src='images/forrest-gump.png';

    /* ── Géométrie « cover » ── */
    function coverRect(){
     if(!bgReady||!bg.width){return {dx:0,dy:0,dw:W,dh:H};}
     const ir=bg.width/bg.height, cr=W/H;
     let dw,dh,dx,dy;
     if(cr>ir){dw=W;dh=W/ir;dx=0;dy=(H-dh)/2;}
     else      {dh=H;dw=H*ir;dy=0;dx=(W-dw)/2;}
     return {dx,dy,dw,dh};
    }
    function iscale(){return coverRect().dw/1206;}

    /* ── Plumes (effet emblématique du film) ── */
    const feathers=Array.from({length:4},(_,i)=>({
     x:W*(0.2+i*0.22),y:-30-i*120,
     vx:(Math.random()-0.5)*0.4+0.2,vy:0.45+Math.random()*0.35,
     rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-0.5)*0.012,
     size:(14+Math.random()*8)*Math.max(0.7,iscale()),phase:Math.random()*Math.PI*2
    }));

    /* ── Nuages doux qui dérivent ── */
    const cloudDefs=[
     {bx:W*0.12,by:H*0.10,blobs:[{dx:0,dy:0,r:38},{dx:32,dy:-12,r:28},{dx:60,dy:4,r:32},{dx:88,dy:-6,r:25},{dx:48,dy:14,r:22},{dx:-18,dy:8,r:20}],sp:6},
     {bx:W*0.55,by:H*0.07,blobs:[{dx:0,dy:0,r:30},{dx:28,dy:-10,r:22},{dx:52,dy:2,r:26},{dx:76,dy:-4,r:20},{dx:38,dy:12,r:18}],sp:-4},
     {bx:W*0.30,by:H*0.18,blobs:[{dx:0,dy:0,r:24},{dx:22,dy:-8,r:18},{dx:42,dy:2,r:20},{dx:60,dy:-3,r:15}],sp:8},
     {bx:W*0.74,by:H*0.14,blobs:[{dx:0,dy:0,r:20},{dx:18,dy:-7,r:15},{dx:34,dy:2,r:17},{dx:50,dy:-2,r:13}],sp:-6},
     {bx:-W*0.1,by:H*0.26,blobs:[{dx:0,dy:0,r:28},{dx:24,dy:-9,r:21},{dx:46,dy:3,r:24},{dx:68,dy:-4,r:18}],sp:5},
    ];

    /* ── Particules de lumière en suspension ── */
    const motes=Array.from({length:34},()=>({
     x:Math.random()*W,
     y:Math.random()*H*0.75,
     r:0.6+Math.random()*1.6,
     vx:-0.12+Math.random()*0.24,
     vy:-0.08-Math.random()*0.18,
     a:0.08+Math.random()*0.22,
     tw:Math.random()*Math.PI*2,
     tws:0.012+Math.random()*0.028,
    }));

    /* ── Oiseaux lointains ── */
    const birds=Array.from({length:6},()=>({
     x:Math.random()*W*1.4-W*0.2,
     y:H*(0.08+Math.random()*0.22),
     vx:0.16+Math.random()*0.34,
     phase:Math.random()*Math.PI*2,
     size:Math.random()*1.6+0.9,
     flapSpd:0.05+Math.random()*0.04,
     layer:Math.random(),
    }));

    function drawFeather(f){
     const s=f.size;
     ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.rot);
     const sg=ctx.createLinearGradient(0,-s,0,s);
     sg.addColorStop(0,'rgba(255,255,255,0.92)');sg.addColorStop(0.5,'rgba(245,250,255,0.78)');sg.addColorStop(1,'rgba(225,240,255,0.6)');
     ctx.strokeStyle=sg;ctx.lineWidth=1.1;
     ctx.beginPath();ctx.moveTo(0,-s);ctx.lineTo(0,s);ctx.stroke();
     for(let i=-9;i<=9;i++){
      const fy=(i/9)*s,fw=Math.sqrt(Math.max(0,1-(i/9)**2))*s*0.58;
      const a=0.46-Math.abs(i/9)*0.24;
      ctx.strokeStyle=`rgba(255,255,255,${a})`;ctx.lineWidth=0.65;
      ctx.beginPath();ctx.moveTo(0,fy);ctx.quadraticCurveTo(fw*0.45,fy-fw*0.18,fw,fy-fw*0.32);ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,fy);ctx.quadraticCurveTo(-fw*0.45,fy-fw*0.18,-fw,fy-fw*0.32);ctx.stroke();
     }
     ctx.restore();
    }

    function drawCloud(bx,by,blobs){
     const sc=Math.max(0.7,iscale());
     for(const b of blobs){
      const cg=ctx.createRadialGradient(bx+b.dx*sc,by+b.dy*sc-b.r*sc*0.18,b.r*sc*0.1,bx+b.dx*sc,by+b.dy*sc,b.r*sc);
      cg.addColorStop(0,'rgba(248,252,255,0.55)');
      cg.addColorStop(0.55,'rgba(238,248,255,0.32)');
      cg.addColorStop(1,'rgba(220,240,255,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(bx+b.dx*sc,by+b.dy*sc,b.r*sc,0,Math.PI*2);ctx.fill();
     }
    }

    function drawBird(b){
     const flap=Math.sin(b.phase);
     const bw=b.size*2.8*Math.max(0.18,Math.abs(flap));
     const by2=b.y-Math.abs(flap)*b.size*0.5;
     const op=0.14+b.layer*0.26;
     ctx.save();
     ctx.translate(b.x,by2);
     ctx.strokeStyle=`rgba(70,95,120,${op})`;
     ctx.lineWidth=b.size*0.5;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-bw,flap>0?-b.size*0.3:b.size*0.1);ctx.lineTo(0,0);ctx.stroke();
     ctx.beginPath();ctx.moveTo(bw,flap>0?-b.size*0.3:b.size*0.1);ctx.lineTo(0,0);ctx.stroke();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     ctx.clearRect(0,0,W,H);

     /* ── Fond PNG (cover) ── */
     if(bgReady){
      const r=coverRect();
      ctx.drawImage(bg,r.dx,r.dy,r.dw,r.dh);
     } else {
      /* fallback : ciel bleu dégradé proche du poster */
      const bgG=ctx.createRadialGradient(W/2,H*0.38,0,W/2,H*0.50,H*0.82);
      bgG.addColorStop(0,'#d8ecf8');
      bgG.addColorStop(0.35,'#a8d4ed');
      bgG.addColorStop(0.70,'#7bb8de');
      bgG.addColorStop(1,'#5a9fd4');
      ctx.fillStyle=bgG;ctx.fillRect(0,0,W,H);
     }

     /* ── Nuages doux (ciel, partie haute) ── */
     for(const c of cloudDefs){
      const ox=((c.sp*t*0.8)%(W+260));
      drawCloud(c.bx+ox,c.by,c.blobs);
     }

     /* ── Oiseaux lointains ── */
     for(const b of birds){
      b.x+=b.vx*(0.5+b.layer*0.7);
      b.phase+=b.flapSpd;
      if(b.x>W+40) b.x=-40;
      drawBird(b);
     }

     /* ── Particules de lumière ── */
     for(const m of motes){
      m.x+=m.vx; m.y+=m.vy; m.tw+=m.tws;
      const tw=0.5+0.5*Math.sin(m.tw);
      ctx.fillStyle=`rgba(255,255,255,${(m.a*tw).toFixed(3)})`;
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fill();
      if(m.y<-5){m.y=H*0.75;m.x=Math.random()*W;}
      if(m.x<-5)m.x=W+5; if(m.x>W+5)m.x=-5;
     }

     /* ── Plumes (par-dessus la scène) ── */
     for(const f of feathers){
      f.x+=f.vx+Math.sin(t*0.55+f.phase)*0.45;
      f.y+=f.vy+Math.sin(t*0.38+f.phase)*0.28;
      f.rot+=f.rotSpd;
      if(f.y>H+40){f.y=-40;f.x=Math.random()*W;}
      drawFeather(f);
     }

     /* ── Vignette douce ── */
     const vg=ctx.createRadialGradient(W/2,H*0.42,H*0.08,W/2,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.60,'rgba(30,80,140,0.04)');
     vg.addColorStop(1,'rgba(20,60,120,0.22)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
