// CinéQuiz splash chunk — 28 jours plus tard
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["28 jours plus tard"]={
   name:'28 jours plus tard',
   color:'40,160,40',
   ref:'28 Days Later \u2014 Danny Boyle, 2002',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_28_s');
    if(!_s){_s=document.createElement('style');_s.id='_28_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:65%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);
    const horizY=H*0.62;
    const spores=Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.20,vy:(Math.random()-0.5)*0.15,r:Math.random()*2.0+0.5,op:0.06+Math.random()*0.22,ph:Math.random()*Math.PI*2,spd:0.018+Math.random()*0.022}));
    const ash=Array.from({length:28},()=>({x:Math.random()*W,y:Math.random()*H,vy:0.30+Math.random()*0.50,vx:(Math.random()-0.5)*0.18,r:Math.random()*1.2+0.3,op:0.12+Math.random()*0.28,ph:Math.random()*Math.PI*2}));
    const fires=Array.from({length:7},(_,i)=>({x:W*(0.06+i*0.135),baseY:horizY,h:H*(0.10+Math.random()*0.09),w:W*(0.030+Math.random()*0.022),ph:Math.random()*Math.PI*2,spd:0.07+Math.random()*0.06}));
    const crows=Array.from({length:6},()=>({x:Math.random()*W,y:H*(0.10+Math.random()*0.30),vx:(Math.random()<0.5?-1:1)*(0.30+Math.random()*0.30),vy:(Math.random()-0.5)*0.10,wing:Math.random()*Math.PI*2,wSpd:0.10+Math.random()*0.08}));
    const runner={x:W*1.1,spd:-(W*0.0022),size:H*0.044,runPh:0};
    const grainCv=document.createElement('canvas');grainCv.width=W;grainCv.height=H;const gCtx=grainCv.getContext('2d');for(let i=0;i<W*H*0.06;i++){const gx=Math.random()*W|0,gy=Math.random()*H|0;gCtx.fillStyle=`rgba(${160+Math.random()*60|0},${Math.random()*6|0},0,${Math.random()*0.030})`;gCtx.fillRect(gx,gy,1,1);}
    function drawCrow(bx,by,wing){ctx.save();ctx.translate(bx,by);ctx.globalAlpha=0.85;ctx.fillStyle='rgba(4,1,1,0.97)';ctx.beginPath();ctx.ellipse(0,0,W*0.014,H*0.008,0,0,Math.PI*2);ctx.fill();const wf=Math.sin(wing)*0.35;ctx.beginPath();ctx.moveTo(-W*0.004,-H*0.003);ctx.bezierCurveTo(-W*0.024,-H*0.015-wf*H*0.008,-W*0.038,-H*0.005,-W*0.030,H*0.004);ctx.bezierCurveTo(-W*0.016,H*0.009,-W*0.005,H*0.004,0,H*0.002);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(W*0.004,-H*0.003);ctx.bezierCurveTo(W*0.024,-H*0.015-wf*H*0.008,W*0.038,-H*0.005,W*0.030,H*0.004);ctx.bezierCurveTo(W*0.016,H*0.009,W*0.005,H*0.004,0,H*0.002);ctx.closePath();ctx.fill();ctx.restore();}
    function drawRunner(rx,ry,sz,ph){const run=Math.sin(ph);ctx.fillStyle='rgba(6,1,1,0.97)';ctx.beginPath();ctx.arc(rx,ry-sz*2.5,sz*0.40,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(rx,ry-sz*1.42,sz*0.30,sz*0.70,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(6,1,1,0.97)';ctx.lineWidth=sz*0.42;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(rx,ry-sz*0.72);ctx.lineTo(rx-sz*0.40+run*sz*0.36,ry);ctx.stroke();ctx.beginPath();ctx.moveTo(rx,ry-sz*0.72);ctx.lineTo(rx+sz*0.40-run*sz*0.36,ry);ctx.stroke();ctx.lineWidth=sz*0.30;ctx.beginPath();ctx.moveTo(rx,ry-sz*1.68);ctx.lineTo(rx-sz*0.48-run*sz*0.26,ry-sz*1.14);ctx.stroke();ctx.beginPath();ctx.moveTo(rx,ry-sz*1.68);ctx.lineTo(rx+sz*0.48+run*sz*0.26,ry-sz*1.14);ctx.stroke();}
    function drawSkyline(){ctx.fillStyle='rgba(3,0,0,0.99)';const bldgs=[[0,H*0.44,W*0.055],[W*0.055,H*0.50,W*0.040],[W*0.095,H*0.38,W*0.048],[W*0.145,H*0.48,W*0.038],[W*0.185,H*0.42,W*0.055],[W*0.242,H*0.52,W*0.036],[W*0.280,H*0.36,W*0.045],[W*0.327,H*0.46,W*0.050],[W*0.380,H*0.44,W*0.040],[W*0.422,H*0.50,W*0.042],[W*0.466,H*0.40,W*0.048],[W*0.516,H*0.46,W*0.038],[W*0.555,H*0.42,W*0.052],[W*0.609,H*0.50,W*0.036],[W*0.647,H*0.44,W*0.044],[W*0.693,H*0.48,W*0.040],[W*0.735,H*0.38,W*0.050],[W*0.787,H*0.46,W*0.038],[W*0.827,H*0.42,W*0.055],[W*0.884,H*0.50,W*0.040],[W*0.926,H*0.36,W*0.074]];for(const [bx,by,bw] of bldgs){ctx.fillRect(bx,by,bw,horizY-by);}const bbX=W*0.76,bbW=W*0.044,bbTop=H*0.28;ctx.fillRect(bbX,bbTop,bbW,horizY-bbTop);ctx.beginPath();ctx.moveTo(bbX+bbW/2,bbTop-H*0.040);ctx.lineTo(bbX+bbW*0.15,bbTop);ctx.lineTo(bbX+bbW*0.85,bbTop);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(160,20,5,0.45)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(bbX+bbW/2,bbTop+H*0.028,bbW*0.48,0,Math.PI*2);ctx.stroke();for(let ci=0;ci<4;ci++){ctx.fillRect(bbX+ci*(bbW/4),bbTop-H*0.010,bbW/5,H*0.011);}}
    function frame(){
     if(stop.v)return;
     const bg=ctx.createLinearGradient(0,0,0,horizY);bg.addColorStop(0.00,'#2a0300');bg.addColorStop(0.20,'#4a0700');bg.addColorStop(0.45,'#620a00');bg.addColorStop(0.72,'#4a0600');bg.addColorStop(1.00,'#2e0400');ctx.fillStyle=bg;ctx.fillRect(0,0,W,horizY);
     const glow1=ctx.createRadialGradient(cx,horizY*0.65,0,cx,horizY*0.65,W*0.72);glow1.addColorStop(0,`rgba(255,45,5,${0.48+Math.sin(t*0.30)*0.10})`);glow1.addColorStop(0.25,'rgba(200,20,3,0.18)');glow1.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow1;ctx.fillRect(0,0,W,horizY);
     const glow2=ctx.createRadialGradient(W*0.20,horizY*0.80,0,W*0.20,horizY*0.80,W*0.38);glow2.addColorStop(0,`rgba(255,60,8,${0.38+Math.sin(t*0.38+1.4)*0.09})`);glow2.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow2;ctx.fillRect(0,0,W,horizY);
     for(const f of fires){f.ph+=f.spd;const flicker=0.70+0.30*Math.abs(Math.sin(f.ph));const fh=f.h*(flicker+0.15);const fg=ctx.createLinearGradient(f.x,f.baseY,f.x,f.baseY-fh);fg.addColorStop(0,`rgba(255,80,5,${0.96*flicker})`);fg.addColorStop(0.35,`rgba(230,35,3,${0.65*flicker})`);fg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=fg;ctx.beginPath();ctx.moveTo(f.x-f.w*0.5,f.baseY);ctx.bezierCurveTo(f.x-f.w*0.3,f.baseY-fh*0.45,f.x+f.w*0.15,f.baseY-fh*0.55,f.x,f.baseY-fh);ctx.bezierCurveTo(f.x-f.w*0.15,f.baseY-fh*0.55,f.x+f.w*0.3,f.baseY-fh*0.45,f.x+f.w*0.5,f.baseY);ctx.closePath();ctx.fill();}
     drawSkyline();
     const groundG=ctx.createLinearGradient(0,horizY,0,H);groundG.addColorStop(0,'#200200');groundG.addColorStop(0.65,'#120100');groundG.addColorStop(1,'#060000');ctx.fillStyle=groundG;ctx.fillRect(0,horizY,W,H-horizY);
     ctx.fillStyle='rgba(10,1,1,0.82)';ctx.beginPath();ctx.moveTo(cx-W*0.03,horizY);ctx.lineTo(cx+W*0.03,horizY);ctx.lineTo(cx+W*0.34,H);ctx.lineTo(cx-W*0.34,H);ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(120,15,5,0.35)';ctx.lineWidth=1.5;ctx.setLineDash([H*0.018,H*0.030]);ctx.beginPath();ctx.moveTo(cx,horizY);ctx.lineTo(cx,H);ctx.stroke();ctx.setLineDash([]);
     for(const cr of crows){cr.x+=cr.vx;cr.y+=cr.vy;cr.wing+=cr.wSpd;if(cr.x<-W*0.06)cr.x=W*1.06;if(cr.x>W*1.06)cr.x=-W*0.06;if(cr.y<H*0.04)cr.vy=Math.abs(cr.vy);if(cr.y>H*0.38)cr.vy=-Math.abs(cr.vy);drawCrow(cr.x,cr.y,cr.wing);}
     runner.x+=runner.spd;runner.runPh+=0.19;if(runner.x<-W*0.06)runner.x=W*1.08;drawRunner(runner.x,horizY,runner.size,runner.runPh);
     for(const sp of spores){sp.x+=sp.vx+Math.sin(t*sp.spd+sp.ph)*0.16;sp.y+=sp.vy+Math.cos(t*sp.spd*0.7+sp.ph)*0.10;sp.ph+=sp.spd;if(sp.x<-4)sp.x=W+4;if(sp.x>W+4)sp.x=-4;if(sp.y<-4)sp.y=H+4;if(sp.y>H+4)sp.y=-4;ctx.fillStyle=`rgba(230,18,5,${sp.op*(0.45+0.55*Math.abs(Math.sin(sp.ph*1.4)))})`;ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r,0,Math.PI*2);ctx.fill();}
     for(const a of ash){a.x+=a.vx+Math.sin(t*0.3+a.ph)*0.20;a.y+=a.vy;a.ph+=0.018;if(a.y>H+4){a.y=-4;a.x=Math.random()*W;}ctx.fillStyle=`rgba(180,14,4,${a.op*(0.3+0.7*Math.abs(Math.sin(a.ph)))})`;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fill();}
     ctx.globalAlpha=0.38;ctx.drawImage(grainCv,0,0);ctx.globalAlpha=1;
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.06,cx,H*0.50,H*0.88);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.68,'rgba(0,0,0,0.48)');vg.addColorStop(1,'rgba(0,0,0,0.95)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
