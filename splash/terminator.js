// CinéQuiz splash chunk — Terminator
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Terminator"]={
   name:'Terminator',
   color:'200,60,10',
   ref:'Terminator \u2014 James Cameron, 1984',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2,cy=H/2;

    // Marges sûres pour ne pas déborder sur header/footer
    const SAFE_TOP=H*0.12;    // sous le header
    const SAFE_BOT=H*0.88;    // au-dessus du footer

    // Données HUD — textes courts pour tenir dans les marges
    const hudL=[
     'CYBERDYNE SYS T-800',
     'CPU: NEURAL NET v2.1',
     'TARGET: SARAH CONNOR',
     'STATUS: TRACKING',
     'WEAPONS: LOADED',
     'MOTOR: ONLINE',
    ];
    const hudR=[
     'DATE: 05/12/1984',
     'TEMP: 22.4\u00b0C',
     'RANGE: 847m',
     'THREAT: HIGH',
     'UNIT: 101',
     'FRAME: T-800',
    ];

    // Particules ambiantes
    const dust=Array.from({length:28},()=>({
     x:Math.random()*W, y:SAFE_TOP+Math.random()*(SAFE_BOT-SAFE_TOP),
     vx:(Math.random()-0.5)*0.3, vy:-(Math.random()*0.4+0.1),
     r:Math.random()*1.2+0.3, op:Math.random()*0.2+0.05
    }));


    function drawReticle(x,y,size,alpha,rot){
     ctx.save();
     ctx.translate(x,y);ctx.rotate(rot);
     ctx.shadowColor='rgba(255,20,5,0.8)';ctx.shadowBlur=6;
     // Cercle externe
     ctx.strokeStyle=`rgba(220,20,8,${alpha*0.5})`;ctx.lineWidth=1;
     ctx.beginPath();ctx.arc(0,0,size*1.6,0,Math.PI*2);ctx.stroke();
     // Cercle principal
     ctx.strokeStyle=`rgba(220,20,8,${alpha})`;ctx.lineWidth=1.8;
     ctx.beginPath();ctx.arc(0,0,size,0,Math.PI*2);ctx.stroke();
     // Cercle interne
     ctx.strokeStyle=`rgba(255,40,10,${alpha*0.7})`;ctx.lineWidth=1;
     ctx.beginPath();ctx.arc(0,0,size*0.35,0,Math.PI*2);ctx.stroke();
     // Croix
     [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dx,dy])=>{
      ctx.strokeStyle=`rgba(220,20,8,${alpha})`;ctx.lineWidth=1.8;
      ctx.beginPath();
      ctx.moveTo(dx*(size*1.05),dy*(size*1.05));
      ctx.lineTo(dx*(size*1.65),dy*(size*1.65));
      ctx.stroke();
      // Gap au centre
      ctx.strokeStyle=`rgba(220,20,8,${alpha*0.3})`;ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(dx*(size*0.4),dy*(size*0.4));
      ctx.lineTo(dx*(size*0.9),dy*(size*0.9));
      ctx.stroke();
     });
     // Coins carrés
     [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy])=>{
      const d=size*1.6,s2=size*0.45;
      ctx.strokeStyle=`rgba(220,20,8,${alpha*0.8})`;ctx.lineWidth=1.5;
      ctx.beginPath();
      ctx.moveTo(sx*d,sy*(d-s2));ctx.lineTo(sx*d,sy*d);ctx.lineTo(sx*(d-s2),sy*d);
      ctx.stroke();
     });
     // Point central
     const pg=ctx.createRadialGradient(0,0,0,0,0,size*0.3);
     pg.addColorStop(0,`rgba(255,50,10,${0.95})`);
     pg.addColorStop(1,'rgba(200,10,0,0)');
     ctx.fillStyle=pg;ctx.beginPath();ctx.arc(0,0,size*0.3,0,Math.PI*2);ctx.fill();
     ctx.shadowBlur=0;
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     // Fond persistant — vision infrarouge
     ctx.fillStyle='rgba(4,0,0,0.22)';ctx.fillRect(0,0,W,H);

     // Ambiance rouge pulsante
     const pulse=0.7+Math.sin(t*0.35)*0.3;
     const amb=ctx.createRadialGradient(cx,cy,H*0.05,cx,cy,H*0.72);
     amb.addColorStop(0,`rgba(${110+Math.sin(t*0.25)*15|0},5,2,${0.18*pulse})`);
     amb.addColorStop(0.5,'rgba(55,2,1,0.08)');
     amb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=amb;ctx.fillRect(0,0,W,H);

     // Grille HUD subtile — entre les marges
     ctx.save();ctx.globalAlpha=0.055;
     ctx.strokeStyle='rgba(220,20,8,1)';ctx.lineWidth=0.5;
     for(let gx=0;gx<W;gx+=W/10){
      ctx.beginPath();ctx.moveTo(gx,SAFE_TOP);ctx.lineTo(gx,SAFE_BOT);ctx.stroke();
     }
     for(let gy=SAFE_TOP;gy<SAFE_BOT;gy+=H/18){
      ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();
     }
     ctx.restore();

     // Scanlines
     ctx.save();ctx.globalAlpha=0.05;
     for(let y=SAFE_TOP;y<SAFE_BOT;y+=3){
      ctx.fillStyle=y%6===0?'rgba(0,0,0,1)':'rgba(12,0,0,1)';
      ctx.fillRect(0,y,W,1.5);
     }
     ctx.restore();

     // Ligne de scan animée (dans les marges)
     const scanY=SAFE_TOP+(t*50)%(SAFE_BOT-SAFE_TOP);
     const scanG=ctx.createLinearGradient(0,scanY-35,0,scanY+10);
     scanG.addColorStop(0,'rgba(220,20,8,0)');
     scanG.addColorStop(0.7,`rgba(220,20,8,${0.09+Math.sin(t*2)*0.03})`);
     scanG.addColorStop(1,'rgba(220,20,8,0)');
     ctx.fillStyle=scanG;ctx.fillRect(0,scanY-35,W,45);

     // Réticule principal — se déplace lentement vers la cible
     const lockProg=Math.min(1,(t%12)/8); // 0→1 en 8s puis lock
     const rx=cx+Math.sin(t*0.18)*W*0.20*(1-lockProg*0.85);
     const ry=H*0.5+Math.cos(t*0.14)*H*0.12*(1-lockProg*0.85);
     const reticleSize=38-lockProg*12; // rétrécit en s'approchant
     const rAlpha=0.7+Math.sin(t*3)*0.15;
     drawReticle(rx,ry,reticleSize,rAlpha,t*0.3*(1-lockProg*0.9));

     // Lignes de visée depuis les bords
     ctx.save();
     ctx.strokeStyle=`rgba(220,20,8,${0.18+Math.sin(t*1.5)*0.06})`;
     ctx.lineWidth=0.8;ctx.setLineDash([4,8]);
     ctx.beginPath();ctx.moveTo(0,ry);ctx.lineTo(rx-reticleSize*1.7,ry);ctx.stroke();
     ctx.beginPath();ctx.moveTo(W,ry);ctx.lineTo(rx+reticleSize*1.7,ry);ctx.stroke();
     ctx.beginPath();ctx.moveTo(rx,SAFE_TOP);ctx.lineTo(rx,ry-reticleSize*1.7);ctx.stroke();
     ctx.beginPath();ctx.moveTo(rx,SAFE_BOT);ctx.lineTo(rx,ry+reticleSize*1.7);ctx.stroke();
     ctx.setLineDash([]);ctx.restore();

     // Tag "ACQUIRING TARGET" qui pulse près du réticule
     if(lockProg<1){
      ctx.save();
      ctx.font=`bold ${W*0.022}px "Courier New",monospace`;
      ctx.fillStyle=`rgba(255,30,8,${0.5+Math.sin(t*4)*0.3})`;
      ctx.shadowColor='rgba(255,20,5,0.7)';ctx.shadowBlur=5;
      ctx.fillText('ACQUIRING TARGET',rx+reticleSize*1.8,ry+4);
      ctx.restore();
     } else {
      ctx.save();
      ctx.font=`bold ${W*0.026}px "Courier New",monospace`;
      ctx.fillStyle=`rgba(255,30,8,${0.8+Math.sin(t*8)*0.2})`;
      ctx.shadowColor='rgba(255,20,5,1)';ctx.shadowBlur=10;
      ctx.textAlign='center';
      ctx.fillText('TARGET LOCKED',cx,ry-reticleSize*2.2);
      ctx.textAlign='left';ctx.restore();
     }

     // HUD gauche — dans les marges SAFE_TOP + padding
     ctx.save();
     ctx.font=`bold ${W*0.024}px "Courier New",monospace`;
     ctx.textBaseline='top';
     ctx.shadowColor='rgba(255,20,5,0.7)';ctx.shadowBlur=4;
     const lineH=H*0.038;
     hudL.forEach((line,i)=>{
      const blink=i>3?Math.sin(t*2.2+i)>-0.2:true;
      if(!blink)return;
      ctx.globalAlpha=0.55+Math.sin(t*1.4+i)*0.15;
      ctx.fillStyle='rgba(230,30,10,1)';
      ctx.fillText(line,W*0.03,SAFE_TOP+H*0.015+i*lineH);
     });
     // HUD droit
     ctx.textAlign='right';
     hudR.forEach((line,i)=>{
      const blink=i>3?Math.sin(t*1.8+i+2)>-0.2:true;
      if(!blink)return;
      ctx.globalAlpha=0.50+Math.sin(t*1.2+i)*0.15;
      ctx.fillStyle='rgba(230,30,10,1)';
      ctx.fillText(line,W*(1-0.03),SAFE_TOP+H*0.015+i*lineH);
     });
     ctx.textAlign='left';ctx.shadowBlur=0;ctx.globalAlpha=1;
     ctx.restore();

     // Barre de progression en bas — au-dessus du footer
     ctx.save();
     ctx.font=`bold ${W*0.020}px "Courier New",monospace`;
     ctx.textBaseline='bottom';
     ctx.shadowColor='rgba(255,20,5,0.6)';ctx.shadowBlur=4;
     ctx.globalAlpha=0.50+Math.sin(t*2.5)*0.15;
     ctx.fillStyle='rgba(220,25,8,1)';
     const statusTxt=lockProg>=1?'► TERMINATE PROTOCOL INITIATED...':'► SCANNING ENVIRONMENT...';
     ctx.fillText(statusTxt,W*0.03,SAFE_BOT-H*0.025);
     const barY=SAFE_BOT-H*0.016;
     const barW=W*0.94, barX=W*0.03;
     ctx.strokeStyle='rgba(180,20,8,0.35)';ctx.lineWidth=1;
     ctx.strokeRect(barX,barY,barW,6);
     ctx.fillStyle=`rgba(220,20,8,${0.6+Math.sin(t*2)*0.15})`;
     ctx.fillRect(barX,barY,(barW)*lockProg,6);
     ctx.shadowBlur=0;ctx.globalAlpha=1;
     ctx.restore();

     // Particules
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;
      if(d.y<SAFE_TOP){d.y=SAFE_BOT;d.x=Math.random()*W;}
      ctx.fillStyle=`rgba(220,30,8,${d.op})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     // Vignette
     const vg=ctx.createRadialGradient(cx,cy,H*0.06,cx,cy,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,'rgba(6,0,0,0.18)');
     vg.addColorStop(1,'rgba(8,0,0,0.90)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
