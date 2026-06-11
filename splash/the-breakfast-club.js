// CinéQuiz splash chunk — The Breakfast Club
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["The Breakfast Club"]={
   name:'The Breakfast Club',
   color:'200,60,40',
   ref:'The Breakfast Club \u2014 John Hughes, 1985',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_tbc_s');
    if(!_s){_s=document.createElement('style');_s.id='_tbc_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* SVG groupe — viewBox 0 0 739 623, ratio 1.185 */
    const bcImg=new Image();let bcReady=false;
    bcImg.onload=()=>{bcReady=true;};bcImg.src='images/BC.svg';
    const BC_W=W*0.88, BC_H=BC_W*(623/739);

    /* Poussière dans les rayons de lumière */
    const motes=Array.from({length:55},()=>({
     x:Math.random()*W, y:H*0.25+Math.random()*H*0.55,
     vx:(Math.random()-0.5)*0.12,
     vy:-(0.04+Math.random()*0.10),
     r:Math.random()*1.6+0.3,
     op:0.04+Math.random()*0.14,
     ph:Math.random()*Math.PI*2,
    }));

    /* Confettis très discrets */
    const confetti=Array.from({length:28},()=>({
     x:Math.random()*W, y:Math.random()*H*0.60-H*0.10,
     vy:0.3+Math.random()*0.55, vx:(Math.random()-0.5)*0.30,
     rot:Math.random()*Math.PI*2, rotSpd:(Math.random()-0.5)*0.04,
     w:W*0.007+Math.random()*W*0.009, h:H*0.003+Math.random()*H*0.005,
     col:['255,40,120','255,200,0','0,180,255','180,0,255','0,220,100'][Math.floor(Math.random()*5)],
     op:0.25+Math.random()*0.25,
    }));

    function drawLibrary(){
     const shelfY=H*0.62; /* étagères du bas */

     /* Sol parquet */
     const floorG=ctx.createLinearGradient(0,shelfY,0,H);
     floorG.addColorStop(0,'rgba(55,30,10,0.98)');
     floorG.addColorStop(0.5,'rgba(40,22,6,0.98)');
     floorG.addColorStop(1,'rgba(25,14,3,1.0)');
     ctx.fillStyle=floorG;ctx.fillRect(0,shelfY,W,H-shelfY);
     /* Lames de parquet */
     ctx.strokeStyle='rgba(70,38,12,0.40)';ctx.lineWidth=0.8;
     for(let li=0;li<7;li++){
      const ly=shelfY+li*(H-shelfY)/6;
      ctx.beginPath();ctx.moveTo(0,ly);ctx.lineTo(W,ly);ctx.stroke();
     }
     for(let lc=0;lc<9;lc++){
      ctx.beginPath();ctx.moveTo(W*lc/8,shelfY);ctx.lineTo(W*lc/8,H);ctx.stroke();
     }

     /* Mur du fond — brique/plâtre beige */
     const wallG=ctx.createLinearGradient(0,0,0,shelfY);
     wallG.addColorStop(0,'rgba(38,28,16,0.96)');
     wallG.addColorStop(0.4,'rgba(48,34,18,0.94)');
     wallG.addColorStop(1,'rgba(55,38,20,0.92)');
     ctx.fillStyle=wallG;ctx.fillRect(0,0,W,shelfY);

     /* Fenêtres hautes — lumière samedi matin */
     const winW=W*0.18, winH=H*0.20, winY=H*0.06;
     for(const wx of [W*0.10,W*0.48,W*0.82]){
      /* Lumière extérieure */
      const winGlow=ctx.createRadialGradient(wx,winY+winH*0.5,0,wx,winY+winH*0.5,W*0.30);
      winGlow.addColorStop(0,`rgba(255,230,160,${0.20+Math.sin(t*0.3)*0.04})`);
      winGlow.addColorStop(0.4,'rgba(220,180,80,0.07)');
      winGlow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=winGlow;ctx.fillRect(0,0,W,shelfY*0.80);
      /* Cadre fenêtre */
      ctx.fillStyle='rgba(55,38,18,0.90)';
      ctx.beginPath();ctx.roundRect(wx-winW/2-3,winY-3,winW+6,winH+6,4);ctx.fill();
      /* Vitre */
      const glassG=ctx.createLinearGradient(wx-winW/2,winY,wx+winW/2,winY+winH);
      glassG.addColorStop(0,`rgba(200,220,255,${0.22+Math.sin(t*0.25)*0.04})`);
      glassG.addColorStop(0.4,`rgba(180,210,250,0.16)`);
      glassG.addColorStop(1,'rgba(140,180,220,0.12)');
      ctx.fillStyle=glassG;ctx.fillRect(wx-winW/2,winY,winW,winH);
      /* Croisillon */
      ctx.strokeStyle='rgba(55,38,18,0.80)';ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(wx,winY);ctx.lineTo(wx,winY+winH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(wx-winW/2,winY+winH*0.50);ctx.lineTo(wx+winW/2,winY+winH*0.50);ctx.stroke();
      /* Rayon de lumière diagonal */
      const rayG=ctx.createLinearGradient(wx,winY+winH,wx+W*0.12,shelfY);
      rayG.addColorStop(0,`rgba(255,230,140,${0.10+Math.sin(t*0.3)*0.03})`);
      rayG.addColorStop(1,'rgba(255,220,120,0)');
      ctx.fillStyle=rayG;
      ctx.beginPath();
      ctx.moveTo(wx-winW*0.4,winY+winH);
      ctx.lineTo(wx+winW*0.4,winY+winH);
      ctx.lineTo(wx+winW*0.4+W*0.14,shelfY);
      ctx.lineTo(wx-winW*0.4-W*0.04,shelfY);
      ctx.closePath();ctx.fill();
     }

     /* Étagères de livres */
     const bookCols=['#8B2020','#1a5a8a','#1a6b2a','#7a6a10','#6a1a6a','#4a3010','#a04020'];
     const shelfH=H*0.065;
     /* Étagère gauche */
     ctx.fillStyle='rgba(40,25,8,0.90)';ctx.fillRect(0,shelfY-shelfH,W*0.18,shelfH);
     ctx.strokeStyle='rgba(60,38,12,0.60)';ctx.lineWidth=2;ctx.strokeRect(0,shelfY-shelfH,W*0.18,shelfH);
     for(let bi=0;bi<7;bi++){
      const bw=W*0.018,bh=shelfH*(0.72+Math.random()*0.22),bx=bi*W*0.024+W*0.005;
      ctx.fillStyle=bookCols[bi%bookCols.length];ctx.fillRect(bx,shelfY-shelfH+(shelfH-bh),bw,bh);
      ctx.strokeStyle='rgba(0,0,0,0.20)';ctx.lineWidth=0.5;ctx.strokeRect(bx,shelfY-shelfH+(shelfH-bh),bw,bh);
     }
     /* Étagère droite */
     ctx.fillStyle='rgba(40,25,8,0.90)';ctx.fillRect(W*0.82,shelfY-shelfH,W*0.18,shelfH);
     ctx.strokeStyle='rgba(60,38,12,0.60)';ctx.lineWidth=2;ctx.strokeRect(W*0.82,shelfY-shelfH,W*0.18,shelfH);
     for(let bi=0;bi<7;bi++){
      const bw=W*0.018,bh=shelfH*(0.70+Math.random()*0.24),bx=W*0.824+bi*W*0.024;
      ctx.fillStyle=bookCols[(bi+3)%bookCols.length];ctx.fillRect(bx,shelfY-shelfH+(shelfH-bh),bw,bh);
      ctx.strokeStyle='rgba(0,0,0,0.20)';ctx.lineWidth=0.5;ctx.strokeRect(bx,shelfY-shelfH+(shelfH-bh),bw,bh);
     }
    }

    function frame(){
     if(stop.v)return;

     /* Fond général chaud */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0,'#100a04');
     bg.addColorStop(0.40,'#1a1008');
     bg.addColorStop(0.75,'#22140a');
     bg.addColorStop(1.00,'#120a04');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Bibliothèque / salle de détention */
     drawLibrary();

     /* Poussière dans les rayons */
     for(const m of motes){
      m.x+=m.vx;m.y+=m.vy;m.ph+=0.018;
      if(m.y<H*0.15){m.y=H*0.75;m.x=Math.random()*W;}
      const ma=m.op*(0.45+0.55*Math.abs(Math.sin(m.ph)));
      ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,220,140,${ma})`;ctx.fill();
     }

     /* Confettis discrets */
     for(const c of confetti){
      c.y+=c.vy;c.x+=c.vx;c.rot+=c.rotSpd;
      if(c.y>H+20){c.y=-20;c.x=Math.random()*W;}
      ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);
      ctx.fillStyle=`rgba(${c.col},${c.op})`;
      ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);
      ctx.restore();
     }

     /* Groupe BC — centré en bas */
     if(bcReady){
      const bcy=H*0.87-BC_H; /* ancré légèrement plus haut */
      /* Légère ombre portée */
      ctx.save();ctx.shadowColor='rgba(0,0,0,0.45)';ctx.shadowBlur=18;ctx.shadowOffsetY=8;
      ctx.globalAlpha=0.96;
      ctx.drawImage(bcImg,cx-BC_W/2,bcy+Math.sin(t*0.35)*H*0.003,BC_W,BC_H);
      ctx.restore();
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.52,H*0.10,cx,H*0.52,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.40,'rgba(0,0,0,0.08)');
     vg.addColorStop(0.72,'rgba(0,0,0,0.50)');
     vg.addColorStop(1,'rgba(0,0,0,0.94)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain pellicule chaud */
     for(let i=0;i<25;i++){
      ctx.fillStyle=`rgba(${180+Math.random()*40|0},${120+Math.random()*40|0},${40+Math.random()*30|0},${Math.random()*0.014})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
