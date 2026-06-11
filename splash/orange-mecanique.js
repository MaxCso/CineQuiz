// CinéQuiz splash chunk — Orange Mécanique
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Orange Mécanique"]={
   name:'Orange M\u00e9canique',
   color:'180,40,40',
   ref:'A Clockwork Orange \u2014 Stanley Kubrick, 1971',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_om_s');
    if(!_s){_s=document.createElement('style');_s.id='_om_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    const NB_STRIPES=14;

    /* Gouttes de lait — plus nombreuses */
    const milkDrops=Array.from({length:22},()=>({
     x:Math.random()*W, y:Math.random()*H*0.6-H*0.05,
     vy:0.35+Math.random()*0.80, len:H*(0.04+Math.random()*0.10),
     op:0.10+Math.random()*0.28, w:W*(0.003+Math.random()*0.007),
    }));

    /* Notes de musique — 9ème de Beethoven */
    const noteSymbols=['\u266a','\u266b','\u266a','\u266c'];
    const notes=Array.from({length:8},(_,i)=>({
     x:W*(0.06+i*0.125), y:H*(0.58+Math.random()*0.18),
     vy:-(0.28+Math.random()*0.45), op:0.0,
     size:W*(0.030+Math.random()*0.018),
     sym:noteSymbols[i%4], ph:Math.random()*Math.PI*2,
     vx:(Math.random()-0.5)*0.18,
    }));

    /* Particules orangées — violence latente */
    const sparks=Array.from({length:28},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.25, vy:-(0.08+Math.random()*0.20),
     r:Math.random()*1.8+0.3, op:Math.random()*0.18+0.04,
     ph:Math.random()*Math.PI*2, spd:0.012+Math.random()*0.018,
    }));

    /* Regard animé */
    let gazeAngle=0, gazeTarget=0, gazeTimer=0;

    function drawEye(ex,ey,er){
     const pupilR=er*0.38;
     const gx=ex+Math.cos(gazeAngle)*er*0.22;
     const gy=ey+Math.sin(gazeAngle)*er*0.14;

     /* Blanc — légèrement injecté de sang */
     ctx.fillStyle='rgba(238,230,215,0.96)';
     ctx.beginPath();ctx.arc(ex,ey,er,0,Math.PI*2);ctx.fill();
     /* Vaisseaux sanguins */
     ctx.save();ctx.beginPath();ctx.arc(ex,ey,er,0,Math.PI*2);ctx.clip();
     ctx.strokeStyle='rgba(200,30,30,0.18)';ctx.lineWidth=W*0.0025;ctx.lineCap='round';
     for(let v=0;v<8;v++){
      const va=v/8*Math.PI*2+Math.sin(t*0.3+v)*0.1;
      const vr0=er*0.38, vr1=er*(0.72+Math.random()*0.22);
      ctx.beginPath();
      ctx.moveTo(gx+Math.cos(va)*vr0,gy+Math.sin(va)*vr0*0.65);
      ctx.quadraticCurveTo(
       gx+Math.cos(va+0.3)*vr1*0.6,gy+Math.sin(va+0.3)*vr1*0.5,
       ex+Math.cos(va+0.5)*vr1,ey+Math.sin(va+0.5)*vr1*0.65
      );
      ctx.stroke();
     }
     ctx.restore();

     /* Iris — doré intense */
     const irisG=ctx.createRadialGradient(gx-er*0.10,gy-er*0.10,0,gx,gy,er*0.70);
     irisG.addColorStop(0,'rgba(255,200,30,1)');
     irisG.addColorStop(0.30,'rgba(235,110,5,1)');
     irisG.addColorStop(0.65,'rgba(175,55,0,1)');
     irisG.addColorStop(1,'rgba(110,25,0,1)');
     ctx.fillStyle=irisG;
     ctx.beginPath();ctx.arc(gx,gy,er*0.70,0,Math.PI*2);ctx.fill();
     /* Stries iris */
     ctx.save();ctx.beginPath();ctx.arc(gx,gy,er*0.70,0,Math.PI*2);ctx.clip();
     ctx.strokeStyle='rgba(100,40,0,0.22)';ctx.lineWidth=W*0.003;
     for(let i=0;i<16;i++){
      const a=i/16*Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(gx+Math.cos(a)*pupilR,gy+Math.sin(a)*pupilR);
      ctx.lineTo(gx+Math.cos(a)*er*0.68,gy+Math.sin(a)*er*0.68);ctx.stroke();
     }
     ctx.restore();
     /* Pupille — légèrement dilatée */
     ctx.fillStyle='rgba(1,0,0,1)';
     ctx.beginPath();ctx.arc(gx,gy,pupilR*1.08,0,Math.PI*2);ctx.fill();
     /* Reflets */
     ctx.fillStyle='rgba(255,255,255,0.68)';
     ctx.beginPath();ctx.arc(gx-pupilR*0.42,gy-pupilR*0.42,pupilR*0.28,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.25)';
     ctx.beginPath();ctx.arc(gx+pupilR*0.30,gy+pupilR*0.35,pupilR*0.15,0,Math.PI*2);ctx.fill();
     /* Cils dramatiques — plus longs et nombreux */
     ctx.strokeStyle='rgba(5,2,0,0.98)';ctx.lineWidth=W*0.010;ctx.lineCap='round';
     for(let i=0;i<14;i++){
      const a=-Math.PI*0.90+i*(Math.PI*0.90/13);
      const len=1.32+Math.sin(i*0.9)*0.12;
      ctx.beginPath();
      ctx.moveTo(ex+Math.cos(a)*er*0.96,ey+Math.sin(a)*er*0.65);
      ctx.lineTo(ex+Math.cos(a)*er*len,ey+Math.sin(a)*er*len*0.65);
      ctx.stroke();
     }
     /* Paupière basse */
     ctx.strokeStyle='rgba(5,2,0,0.40)';ctx.lineWidth=W*0.006;
     ctx.beginPath();ctx.arc(ex,ey,er,Math.PI*0.05,Math.PI*0.95);ctx.stroke();
     /* Halo iris — lueur orange */
     const irisHalo=ctx.createRadialGradient(gx,gy,er*0.60,gx,gy,er*0.85);
     irisHalo.addColorStop(0,'rgba(0,0,0,0)');
     irisHalo.addColorStop(1,`rgba(255,120,0,${0.08+Math.sin(t*1.2)*0.04})`);
     ctx.fillStyle=irisHalo;ctx.beginPath();ctx.arc(gx,gy,er*0.85,0,Math.PI*2);ctx.fill();
    }

    /* Silhouette Alex DeLarge — plus détaillée */
    function drawAlex(){
     const sc=H*0.28;
     const swayX=Math.sin(t*0.8)*sc*0.012;
     ctx.save();ctx.translate(cx+swayX,H*0.85);
     /* Chaussures noires */
     ctx.fillStyle='rgba(5,3,0,0.98)';
     ctx.beginPath();ctx.ellipse(-sc*0.14,sc*0.008,sc*0.08,sc*0.030,0.15,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(sc*0.14,sc*0.008,sc*0.08,sc*0.030,-0.15,0,Math.PI*2);ctx.fill();
     /* Jambes */
     ctx.fillStyle='rgba(245,240,225,0.92)';
     ctx.beginPath();
     ctx.moveTo(-sc*0.12,0);ctx.lineTo(-sc*0.18,-sc*0.45);
     ctx.lineTo(-sc*0.06,-sc*0.45);ctx.lineTo(0,-sc*0.05);
     ctx.lineTo(sc*0.06,-sc*0.45);ctx.lineTo(sc*0.18,-sc*0.45);
     ctx.lineTo(sc*0.12,0);ctx.closePath();ctx.fill();
     /* Veste */
     ctx.beginPath();
     ctx.moveTo(-sc*0.20,-sc*0.45);
     ctx.bezierCurveTo(-sc*0.23,-sc*0.70,-sc*0.22,-sc*0.80,-sc*0.14,-sc*0.84);
     ctx.lineTo(sc*0.14,-sc*0.84);
     ctx.bezierCurveTo(sc*0.22,-sc*0.80,sc*0.23,-sc*0.70,sc*0.20,-sc*0.45);
     ctx.closePath();ctx.fill();
     /* Ceinture */
     ctx.fillStyle='rgba(180,165,140,0.60)';
     ctx.fillRect(-sc*0.20,-sc*0.455,sc*0.40,sc*0.025);
     /* Bretelles */
     ctx.strokeStyle='rgba(200,195,180,0.70)';ctx.lineWidth=sc*0.020;
     ctx.beginPath();ctx.moveTo(-sc*0.08,-sc*0.45);ctx.lineTo(-sc*0.06,-sc*0.84);ctx.stroke();
     ctx.beginPath();ctx.moveTo(sc*0.08,-sc*0.45);ctx.lineTo(sc*0.06,-sc*0.84);ctx.stroke();
     /* Bouteille de lait dans la main gauche */
     ctx.fillStyle='rgba(240,238,230,0.70)';
     ctx.beginPath();ctx.roundRect(-sc*0.32,-sc*0.55,sc*0.055,sc*0.16,sc*0.012);ctx.fill();
     ctx.fillStyle='rgba(210,205,195,0.55)';
     ctx.beginPath();ctx.ellipse(-sc*0.292,-sc*0.55,sc*0.028,sc*0.018,0,0,Math.PI*2);ctx.fill();
     /* Tête */
     ctx.fillStyle='rgba(8,5,0,0.98)';
     ctx.beginPath();ctx.ellipse(0,-sc*0.92,sc*0.098,sc*0.110,0,0,Math.PI*2);ctx.fill();
     /* Chapeau melon */
     ctx.beginPath();ctx.ellipse(0,-sc*1.025,sc*0.158,sc*0.024,0,0,Math.PI*2);ctx.fill();
     ctx.beginPath();
     ctx.moveTo(-sc*0.110,-sc*1.025);
     ctx.bezierCurveTo(-sc*0.110,-sc*1.140,sc*0.110,-sc*1.140,sc*0.110,-sc*1.025);
     ctx.closePath();ctx.fill();
     /* Canne — se balance */
     const caneAngle=0.12+Math.sin(t*1.1)*0.06;
     ctx.strokeStyle='rgba(245,240,220,0.90)';ctx.lineWidth=sc*0.030;ctx.lineCap='round';
     ctx.save();ctx.translate(sc*0.24,-sc*0.60);ctx.rotate(caneAngle);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,sc*0.55);ctx.stroke();
     ctx.beginPath();ctx.arc(-sc*0.04,0,sc*0.04,0,Math.PI,true);ctx.stroke();
     ctx.restore();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     t+=0.016;
     ctx.fillStyle='#030100';ctx.fillRect(0,0,W,H);

     /* Rayures Kubrick — perspective de couloir, plus contrastées */
     for(let i=0;i<NB_STRIPES;i++){
      const pct=i/NB_STRIPES;
      if(i%2===0){
       /* Rayures qui se rétrécissent vers le centre (effet couloir) */
       const stripeH=H/NB_STRIPES;
       const distCenter=Math.abs(pct+0.5/NB_STRIPES-0.5)*2;
       const alpha=0.42+distCenter*0.22+Math.sin(t*0.12+i*0.35)*0.04;
       ctx.fillStyle=`rgba(55,28,2,${alpha})`;
       ctx.fillRect(0,i*stripeH,W,stripeH);
      }
     }
     /* Lignes de fuite — perspective Kubrick */
     ctx.strokeStyle=`rgba(80,35,5,${0.10+Math.sin(t*0.08)*0.03})`;ctx.lineWidth=0.8;
     for(let li=0;li<=6;li++){
      const lx=W*li/6;
      ctx.beginPath();ctx.moveTo(lx,0);ctx.lineTo(cx,H*0.50);ctx.stroke();
     }

     /* Halo orange — plus intense */
     const eyeY=H*0.43+Math.sin(t*0.45)*H*0.006;
     const halo=ctx.createRadialGradient(cx,eyeY,0,cx,eyeY,W*0.62);
     halo.addColorStop(0,`rgba(220,90,5,${0.22+Math.sin(t*0.2)*0.05})`);
     halo.addColorStop(0.35,`rgba(150,45,0,${0.10+Math.sin(t*0.15)*0.03})`);
     halo.addColorStop(0.70,'rgba(80,20,0,0.04)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

     /* Regard */
     gazeTimer-=0.016;
     if(gazeTimer<=0){gazeTarget=(Math.random()-0.5)*Math.PI*0.30;gazeTimer=2.0+Math.random()*3.0;}
     gazeAngle+=(gazeTarget-gazeAngle)*0.015;
     drawEye(cx,eyeY,W*0.22);

     /* Silhouette */
     drawAlex();

     /* Ombre sol + flaque de lait */
     const sg=ctx.createRadialGradient(cx,H*0.82,0,cx,H*0.82,W*0.26);
     sg.addColorStop(0,'rgba(0,0,0,0.55)');sg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sg;ctx.beginPath();ctx.ellipse(cx,H*0.82,W*0.26,H*0.020,0,0,Math.PI*2);ctx.fill();
     /* Flaque de lait au sol */
     ctx.fillStyle=`rgba(240,238,230,${0.08+Math.sin(t*0.5)*0.02})`;
     ctx.beginPath();ctx.ellipse(cx-W*0.18,H*0.825,W*0.065,H*0.009,0.1,0,Math.PI*2);ctx.fill();

     /* Gouttes de lait */
     for(const d of milkDrops){
      d.y+=d.vy;
      if(d.y>H+d.len){d.y=-d.len;d.x=Math.random()*W;}
      ctx.strokeStyle=`rgba(245,242,235,${d.op})`;ctx.lineWidth=d.w;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x,d.y+d.len);ctx.stroke();
      ctx.fillStyle=`rgba(245,242,235,${d.op*0.85})`;
      ctx.beginPath();ctx.arc(d.x,d.y+d.len,d.w*2.0,0,Math.PI*2);ctx.fill();
     }

     /* Particules orangées flottantes */
     for(const s of sparks){
      s.ph+=s.spd; s.y+=s.vy; s.x+=s.vx;
      if(s.y<-5){s.y=H*0.95;s.x=Math.random()*W;}
      const pa=s.op*(0.4+0.6*Math.abs(Math.sin(s.ph)));
      ctx.fillStyle=`rgba(220,${80+Math.random()*40|0},5,${pa})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* Notes de musique */
     for(const n of notes){
      n.y+=n.vy;n.x+=n.vx;n.ph+=0.025;
      n.op=Math.min(0.55,n.op+0.008);
      if(n.y<-n.size*2){n.y=H*0.60+Math.random()*H*0.15;n.op=0;n.x=Math.random()*W;}
      ctx.save();ctx.globalAlpha=n.op*(0.6+0.4*Math.abs(Math.sin(n.ph)));
      ctx.fillStyle='rgba(220,160,20,1)';
      ctx.font=`${n.size}px serif`;ctx.textAlign='center';
      ctx.fillText(n.sym,n.x,n.y);ctx.restore();
     }

     /* Grain filmique 35mm — dense */
     for(let i=0;i<60;i++){
      ctx.fillStyle=`rgba(${170+Math.random()*40|0},${80+Math.random()*30|0},0,${Math.random()*0.022})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2.2+0.3,1);
     }
     requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
