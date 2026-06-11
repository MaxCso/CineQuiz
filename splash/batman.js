// CinéQuiz splash chunk — Batman
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Batman"]={
   name:'Batman',
   color:'240,200,30',
   ref:'Batman \u2014 Tim Burton, 1989',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.68';
    let t=0;
    const cx=W/2,cy=H/2;

    // Vrais petits chauves-souris volants (pour l'ambiance)
    const bats=Array.from({length:10},()=>({
     x:Math.random()*W, y:H*0.55+Math.random()*H*0.35,
     vx:(Math.random()-0.5)*1.2, vy:(Math.random()-0.5)*0.9,
     size:Math.random()*6+4,
     phase:Math.random()*Math.PI*2,
     op:Math.random()*0.35+0.12
    }));

    const bldgs=[
     {x:0,   w:45, h:H*0.52, spires:[{ox:22,h:28}]},
     {x:50,  w:30, h:H*0.38, spires:[]},
     {x:85,  w:60, h:H*0.65, spires:[{ox:30,h:40},{ox:10,h:20}]},
     {x:150, w:35, h:H*0.44, spires:[{ox:17,h:22}]},
     {x:190, w:75, h:H*0.72, spires:[{ox:37,h:50},{ox:15,h:25},{ox:58,h:18}]},
     {x:270, w:40, h:H*0.55, spires:[{ox:20,h:30}]},
     {x:315, w:55, h:H*0.48, spires:[{ox:27,h:22}]},
     {x:375, w:40, h:H*0.60, spires:[{ox:20,h:35}]}
    ];

    // Logo Batman exact depuis le SVG officiel (viewBox 122.13 x 69.89)
    const SVG_W=122.13,SVG_H=69.89;
    const svgEllipse=new Path2D('M121.06,35c0,18.71-26.86,33.88-60,33.88S1.06,53.66,1.06,35s26.87-33.89,60-33.89,60,15.17,60,33.89Z');
    const svgBat=new Path2D('M51.72,24.46c-14.49,5.37-21.86-8-14.49-15.74-11.75,3-30.86,11.49-30.86,25.63,0,12.83,12.49,20.09,21.49,23.22-8.68-10.74,3.25-19.16,13.7-7.41C49.69,35.73,59.28,56.44,61,59.58h0c1.71-3.14,11.31-23.85,19.44-9.42,10.45-11.75,22.38-3.33,13.7,7.41,9-3.13,21.49-10.39,21.49-23.22,0-14.14-19.11-22.63-30.86-25.63,7.37,7.74,0,21.11-14.49,15.74-1.67-2-2.75-6.11-2.75-18.24-1.94,1.26-3.33,5.71-3.45,6a12,12,0,0,0-6.15,0c-.12-.32-1.51-4.77-3.45-6,0,12.13-1.08,16.25-2.75,18.24ZM122.13,35c0,9.76-6.93,18.56-18.12,24.88-11,6.22-26.2,10.06-42.95,10.06S29.13,66.05,18.12,59.83C6.92,53.51,0,44.71,0,35S6.92,16.39,18.12,10.07C29.13,3.85,44.32,0,61.06,0S93,3.85,104,10.07C115.2,16.39,122.13,25.18,122.13,35ZM103,58c10.52-5.94,17-14.09,17-23s-6.51-17.1-17-23c-10.7-6-25.52-9.78-41.91-9.78s-31.2,3.74-41.9,9.78C8.64,17.85,2.13,26,2.13,35S8.64,52,19.16,58c10.7,6.05,25.52,9.79,41.9,9.79S92.27,64,103,58Z');
    function drawBatLogo(x,y,targetW,op){
     const sc=targetW/SVG_W;
     ctx.save();
     ctx.translate(x-SVG_W*sc/2, y-SVG_H*sc/2);
     ctx.scale(sc,sc);
     ctx.globalAlpha=op;
     ctx.fillStyle='#f7dd30';
     ctx.fill(svgEllipse);
     ctx.fillStyle='#000';
     ctx.fill(svgBat);
     ctx.restore();
    }

    function drawSmallBat(x,y,s,phase,op){
     ctx.save();ctx.translate(x,y);ctx.globalAlpha=op;
     const flap=Math.sin(phase)*0.55;
     ctx.beginPath();
     ctx.moveTo(0,0);
     ctx.bezierCurveTo(-s,-s*flap,-s*2.0,-s*0.25,-s*2.3,s*0.18);
     ctx.bezierCurveTo(-s*1.8,-s*0.08,-s*1.1,s*0.42,-s*0.28,s*0.36);
     ctx.bezierCurveTo(s*0.28,s*0.36,s*1.1,s*0.42,s*2.3,s*0.18);
     ctx.bezierCurveTo(s*2.0,-s*0.25,s,-s*flap,0,0);
     ctx.fillStyle='rgba(8,5,16,0.88)';ctx.fill();
     ctx.beginPath();ctx.ellipse(0,s*0.08,s*0.28,s*0.42,0,0,Math.PI*2);
     ctx.fillStyle='rgba(12,8,22,0.92)';ctx.fill();
     ctx.restore();
    }

    let sigAngle=0;
    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(2,1,8,0.15)';ctx.fillRect(0,0,W,H);

     sigAngle+=0.007;
     const sx=cx+Math.sin(sigAngle)*W*0.12;
     const sy=H*0.13;

     // Faisceau du bat-signal (cône de lumière depuis le bas)
     const beam=ctx.createLinearGradient(sx,H,sx,sy-W*0.18);
     beam.addColorStop(0,'rgba(245,195,20,0.00)');
     beam.addColorStop(0.3,'rgba(245,195,20,0.04)');
     beam.addColorStop(1,'rgba(245,195,20,0.10)');
     ctx.save();
     ctx.beginPath();
     ctx.moveTo(sx-8,H);
     ctx.lineTo(sx-W*0.22,sy-W*0.18);
     ctx.lineTo(sx+W*0.22,sy-W*0.18);
     ctx.lineTo(sx+8,H);
     ctx.closePath();
     ctx.fillStyle=beam;ctx.fill();
     ctx.restore();

     // Halo lumineux derrière le logo
     const glow=ctx.createRadialGradient(sx,sy,5,sx,sy,W*0.32);
     glow.addColorStop(0,`rgba(245,195,20,${0.15+Math.sin(t*0.5)*0.04})`);
     glow.addColorStop(0.35,'rgba(200,155,10,0.05)');
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);

     // Logo Batman SVG exact dans le ciel
     const logoW=W*0.55;
     drawBatLogo(sx,sy,logoW,0.88+Math.sin(t*0.5)*0.05);

     // Bâtiments Gotham
     for(const b of bldgs){
      ctx.fillStyle='rgba(8,6,16,0.93)';
      ctx.fillRect(b.x,H-b.h,b.w,b.h);
      const cols=Math.floor(b.w/9),rows=Math.floor(b.h/12);
      for(let r=1;r<rows-1;r++) for(let c=0;c<cols;c++){
       if(Math.sin(b.x*0.3+r*c+t*0.2)>0.3){
        ctx.fillStyle=`rgba(200,160,50,${0.28+Math.random()*0.10})`;
        ctx.fillRect(b.x+c*9+2,H-b.h+r*12,5,6);
       }
      }
      for(const sp of b.spires){
       ctx.fillStyle='rgba(8,6,16,0.96)';
       ctx.beginPath();
       ctx.moveTo(b.x+sp.ox-4,H-b.h);
       ctx.lineTo(b.x+sp.ox,H-b.h-sp.h);
       ctx.lineTo(b.x+sp.ox+4,H-b.h);
       ctx.fill();
      }
     }

     // Petites chauves-souris volantes
     for(const bat of bats){
      bat.x+=bat.vx;bat.y+=bat.vy;bat.phase+=0.08;
      if(bat.x<-40)bat.x=W+40; if(bat.x>W+40)bat.x=-40;
      if(bat.y<H*0.48)bat.y=H*0.48+5; if(bat.y>H+20)bat.y=-20;
      drawSmallBat(bat.x,bat.y,bat.size,bat.phase,bat.op);
     }

     const vg=ctx.createRadialGradient(cx,cy,H*0.15,cx,cy,H*0.85);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(4,0,12,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
