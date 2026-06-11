// CinéQuiz splash chunk — Ghostbusters
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Ghostbusters"]={
   name:'Ghostbusters',
   color:'20,200,40',
   ref:'Ghostbusters \u2014 Ivan Reitman, 1984',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.92';
    let t=0;
    const cx=W/2,cy=H/2;

    /* ══ BIBLIOTHÈQUE NY — colonnes néo-classiques ══ */
    /* Colonnes en perspective de la NY Public Library */
    const columns=[
     {x:W*0.04,w:W*0.055,h:H*0.60},{x:W*0.18,w:W*0.055,h:H*0.65},{x:W*0.34,w:W*0.055,h:H*0.62},
     {x:W*0.61,w:W*0.055,h:H*0.62},{x:W*0.76,w:W*0.055,h:H*0.65},{x:W*0.89,w:W*0.055,h:H*0.60},
    ];
    /* Étagères de livres en fond */
    const shelves=Array.from({length:10},(_,i)=>({y:H*(0.14+i*0.048),books:Array.from({length:24},()=>({hue:Math.random()*60+10,h:H*(0.028+Math.random()*0.014),w:W*(0.016+Math.random()*0.010)}))}));
    /* Flammes paranormales sur les étagères */
    const libFlames=Array.from({length:18},(_,i)=>({
     x:W*(0.05+i*0.052),shelfY:H*(0.16+Math.floor(i/6)*0.16),
     particles:Array.from({length:5},()=>({x:0,y:0,vx:(Math.random()-0.5)*0.9,vy:-(Math.random()*1.2+0.4),r:Math.random()*6+2,life:Math.random(),maxLife:0.5+Math.random()*0.3,hue:30+Math.random()*50}))
    }));
    /* Brume ectoplasmatique au sol */
    const mistPuffs=Array.from({length:12},(_,i)=>({
     x:W*(i/11),y:H*0.76,r:W*(0.06+Math.random()*0.08),
     vx:(Math.random()-0.5)*0.18,op:Math.random()*0.22+0.06,phase:Math.random()*Math.PI*2
    }));
    /* Ectoplasme qui dégouline des colonnes */
    const slimeStreaks=Array.from({length:10},()=>({
     colIdx:Math.floor(Math.random()*6),yFrac:Math.random()*0.4+0.1,
     len:H*(0.04+Math.random()*0.08),width:Math.random()*3+1,op:Math.random()*0.55+0.20,drip:0,dripSpd:Math.random()*0.006+0.002
    }));
    /* Fantôme bibliothécaire — blanc, fin, distingué */
    const libGhost={x:cx+W*0.15,y:H*0.35,vx:-0.4,vy:0.12,alpha:0,alphaTarget:0.75};
    /* Particules de pages volantes */
    const pages=Array.from({length:16},()=>({
     x:Math.random()*W,y:Math.random()*H*0.65,
     vx:(Math.random()-0.5)*1.1,vy:(Math.random()-0.5)*0.7,
     rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-0.5)*0.04,
     w:W*0.025+Math.random()*W*0.018,h:H*0.018+Math.random()*H*0.012,
     op:Math.random()*0.35+0.08
    }));

    /* ══ SLIMER — plus réactif, fuite panique ══ */
    let ghostX=W*0.65,ghostY=H*0.30;
    let ghostVx=0.80,ghostVy=0.28;
    let ghostWobble=0,ghostPanic=0;
    const slimeTrail=[];

    function drawSlimer(gx,gy,panic){
     ghostWobble+=0.05+panic*0.08;
     const squish=1+Math.sin(ghostWobble)*(0.06+panic*0.12);
     ctx.save();ctx.translate(gx,gy);

     /* Traînée de slime derrière */
     for(let ti=slimeTrail.length-1;ti>=0;ti--){
      const tr=slimeTrail[ti];const ta=(1-ti/slimeTrail.length)*0.18;
      ctx.fillStyle=`rgba(60,220,20,${ta})`;ctx.beginPath();ctx.arc(tr.x-gx,tr.y-gy,W*0.025*(1-ti/slimeTrail.length),0,Math.PI*2);ctx.fill();
     }

     /* Halo */
     const halo=ctx.createRadialGradient(0,0,8,0,0,W*0.24);
     halo.addColorStop(0,`rgba(80,240,40,${0.18+panic*0.12+Math.sin(t*1.5)*0.05})`);
     halo.addColorStop(0.5,'rgba(40,180,10,0.06)');halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.beginPath();ctx.arc(0,0,W*0.24,0,Math.PI*2);ctx.fill();

     const R=W*0.12;
     ctx.save();ctx.scale(squish,2-squish);

     /* Corps */
     const bodyG=ctx.createRadialGradient(-R*0.22,-R*0.28,R*0.04,0,0,R*1.15);
     bodyG.addColorStop(0,'rgba(170,255,90,0.94)');bodyG.addColorStop(0.35,'rgba(85,220,35,0.90)');
     bodyG.addColorStop(0.70,'rgba(45,165,12,0.84)');bodyG.addColorStop(1,'rgba(22,105,5,0.72)');
     ctx.fillStyle=bodyG;
     ctx.beginPath();
     ctx.moveTo(0,-R*1.08);
     ctx.bezierCurveTo(R*0.82,-R*1.02,R*1.08,-R*0.36,R*0.97,R*0.26);
     ctx.bezierCurveTo(R*0.86,R*0.76,R*0.42,R*0.97,0,R*1.02);
     ctx.bezierCurveTo(-R*0.42,R*0.97,-R*0.86,R*0.76,-R*0.97,R*0.26);
     ctx.bezierCurveTo(-R*1.08,-R*0.36,-R*0.82,-R*1.02,0,-R*1.08);
     ctx.closePath();ctx.fill();

     /* Tentacules — agitées si panique */
     ctx.fillStyle='rgba(55,185,15,0.77)';
     for(let ti=0;ti<3;ti++){
      const tx=(ti-1)*R*0.56;
      const twave=Math.sin(t*(2.5+panic*3)+ti*1.1)*R*(0.14+panic*0.18);
      ctx.beginPath();ctx.moveTo(tx-R*0.17,R*0.86);
      ctx.quadraticCurveTo(tx+twave,R*1.28,tx+twave*0.5,R*(1.58+ti*0.12));
      ctx.quadraticCurveTo(tx-twave*0.3,R*(1.58+ti*0.12),tx+R*0.17,R*0.86);
      ctx.closePath();ctx.fill();
     }

     /* Yeux — grand écartement, expression de panique */
     ctx.restore();// reset squish for eyes
     const eyeY=-R*0.18;
     const blink=Math.sin(t*0.7)>0.93?0.08:1;
     const eyeOffset=panic*R*0.08; // yeux plus écartés en panique
     for(const ex of [-(R*0.32+eyeOffset),(R*0.32+eyeOffset)]){
      ctx.fillStyle='rgba(240,255,222,0.97)';ctx.beginPath();ctx.ellipse(ex,eyeY,R*0.25,R*0.27*blink,0,0,Math.PI*2);ctx.fill();
      // Pupille — regarde derrière en cas de panique
      const pupilDx=panic*R*0.06*(ex<0?0.5:-0.5);
      ctx.fillStyle='rgba(8,35,4,0.97)';ctx.beginPath();ctx.ellipse(ex+R*0.04+pupilDx,eyeY+R*0.04,R*0.12,R*0.145*blink,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.88)';ctx.beginPath();ctx.arc(ex-R*0.05+pupilDx,eyeY-R*0.08,R*0.056,0,Math.PI*2);ctx.fill();
     }
     /* Bouche — ouverte en cri si panique */
     const mouthOpen=panic*R*0.22;
     ctx.strokeStyle='rgba(15,80,5,0.82)';ctx.lineWidth=2.5;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(-R*0.30,R*0.22);
     ctx.quadraticCurveTo(0,R*(0.40+mouthOpen)+Math.sin(t*1.8)*R*0.06,R*0.30,R*0.22);ctx.stroke();
     /* Dents */
     ctx.fillStyle='rgba(222,255,182,0.84)';
     for(let d=0;d<4;d++){
      const dx=-R*0.22+d*R*0.14;
      ctx.beginPath();ctx.moveTo(dx,R*(0.24+mouthOpen*0.3));ctx.lineTo(dx+R*0.07,R*(0.28+mouthOpen*0.3)+R*(0.10+mouthOpen*0.5));ctx.lineTo(dx+R*0.14,R*(0.24+mouthOpen*0.3));ctx.closePath();ctx.fill();
     }
     /* Langue verte */
     if(Math.sin(t*0.6)>0.25||panic>0.5){
      ctx.fillStyle='rgba(30,155,8,0.87)';
      ctx.beginPath();ctx.ellipse(R*0.06,R*(0.50+mouthOpen*0.4)+Math.sin(t*2)*R*0.05,R*0.10,R*(0.16+mouthOpen*0.3),0.22,0,Math.PI*2);ctx.fill();
     }
     /* Gouttes de slime */
     ctx.fillStyle='rgba(80,215,22,0.67)';
     for(const [sdx,sdy,sr] of [[-R*0.56,R*0.56,R*0.057],[R*0.46,R*0.69,R*0.046],[R*0.11,R*0.93,R*0.062]]){
      ctx.beginPath();ctx.arc(sdx,sdy+Math.sin(t*1.6+sdx)*R*0.04,sr*(1+panic*0.3),0,Math.PI*2);ctx.fill();
     }
     ctx.restore();
    }

    /* ══ GHOSTBUSTER — silhouette avec proton pack ══ */
    const gbX=W*0.20,gbY=H*0.90;
    let beamActive=false,beamTimer=0,beamCooldown=200;
    let beamTargetX=0,beamTargetY=0;
    let trapActive=false,trapTimer=0,trapX=0,trapY=0;
    let captureFlash=0;

    function drawGhostbuster(bx,by){
     ctx.save();ctx.translate(bx,by);
     /* Ombre */
     const shG=ctx.createRadialGradient(0,0,2,0,0,W*0.08);
     shG.addColorStop(0,'rgba(0,0,0,0.40)');shG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shG;ctx.beginPath();ctx.ellipse(0,0,W*0.07,H*0.016,0,0,Math.PI*2);ctx.fill();
     const fh=H*0.20,fw=W*0.048;
     ctx.fillStyle='rgba(5,5,4,0.98)';
     /* Jambes */
     ctx.beginPath();ctx.roundRect(-fw*0.28,-fh*0.04,fw*0.25,fh*0.22,2);ctx.fill();
     ctx.beginPath();ctx.roundRect(fw*0.04,-fh*0.04,fw*0.25,fh*0.22,2);ctx.fill();
     /* Corps — combinaison */
     ctx.beginPath();ctx.roundRect(-fw*0.46,-fh*0.68,fw*0.92,fh*0.64,3);ctx.fill();
     /* Proton pack dans le dos — sac rectangulaire */
     ctx.fillStyle='rgba(10,8,5,0.95)';
     ctx.beginPath();ctx.roundRect(fw*0.36,-fh*0.62,fw*0.38,fh*0.42,3);ctx.fill();
     /* Détails pack — lumières */
     ctx.fillStyle=`rgba(255,${beamActive?100:200},${beamActive?20:80},${beamActive?0.90:0.55})`;
     ctx.beginPath();ctx.arc(fw*0.48,-fh*0.38,fw*0.04,0,Math.PI*2);ctx.fill();
     ctx.fillStyle=`rgba(80,220,40,0.65)`;
     ctx.beginPath();ctx.arc(fw*0.48,-fh*0.50,fw*0.03,0,Math.PI*2);ctx.fill();
     /* Tête */
     ctx.fillStyle='rgba(5,5,4,0.98)';
     ctx.beginPath();ctx.arc(0,-fh*0.76,fw*0.44,0,Math.PI*2);ctx.fill();
     /* Casque */
     ctx.beginPath();ctx.ellipse(0,-fh*0.86,fw*0.52,fw*0.25,0,Math.PI,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.roundRect(-fw*0.52,-fh*0.84,fw*1.04,fw*0.24,2);ctx.fill();
     /* Bras avec pistolet proton */
     ctx.strokeStyle='rgba(5,5,4,0.98)';ctx.lineWidth=fw*0.28;ctx.lineCap='round';
     const armAngle=beamActive?-0.55:-0.30;
     ctx.save();ctx.translate(-fw*0.46,-fh*0.52);ctx.rotate(armAngle);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-fw*0.15,-fh*0.16);ctx.stroke();ctx.restore();
     ctx.save();ctx.translate(fw*0.46,-fh*0.52);ctx.rotate(-armAngle-0.2);
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(fw*0.18,-fh*0.20);ctx.stroke();
     /* Canon du pistolet */
     ctx.strokeStyle='rgba(14,10,6,0.95)';ctx.lineWidth=fw*0.14;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(fw*0.18,-fh*0.20);ctx.lineTo(fw*0.28+Math.cos(-armAngle-0.2)*fw*0.25,-fh*0.28+Math.sin(-armAngle-0.2)*fh*0.12);ctx.stroke();
     ctx.restore();
     ctx.restore();
    }

    function drawProtonBeam(){
     if(!beamActive)return;
     ctx.save();
     const srcX=gbX+W*0.065,srcY=gbY-H*0.12;
     /* Nœud source */
     const srcG=ctx.createRadialGradient(srcX,srcY,1,srcX,srcY,W*0.055);
     srcG.addColorStop(0,'rgba(255,255,255,0.95)');srcG.addColorStop(0.2,'rgba(200,100,255,0.82)');srcG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=srcG;ctx.beginPath();ctx.arc(srcX,srcY,W*0.055,0,Math.PI*2);ctx.fill();
     /* 5 fils entrelacés */
     for(let strand=0;strand<5;strand++){
      ctx.beginPath();ctx.moveTo(srcX,srcY);
      const steps=40;
      for(let i=1;i<=steps;i++){
       const prog=i/steps;
       const lx=srcX+(beamTargetX-srcX)*prog;
       const ly=srcY+(beamTargetY-srcY)*prog;
       const dx=beamTargetX-srcX,dy=beamTargetY-srcY;
       const len=Math.sqrt(dx*dx+dy*dy)||1;
       const perp=Math.sin(t*14+strand*1.26+prog*Math.PI*4)*W*0.020*(1-prog*0.4);
       const perpY=Math.cos(t*14+strand*1.26+prog*Math.PI*4)*W*0.013*(1-prog*0.4);
       ctx.lineTo(lx+(-dy/len)*perp,ly+(dx/len)*perp+perpY);
      }
      const cols=['rgba(255,255,255,','rgba(180,70,255,','rgba(225,130,255,','rgba(140,35,225,','rgba(255,195,255,'];
      ctx.strokeStyle=cols[strand]+(0.55+strand*0.06)+')';
      ctx.lineWidth=strand===0?3.8:2.0;ctx.stroke();
     }
     /* Impact */
     const impG=ctx.createRadialGradient(beamTargetX,beamTargetY,2,beamTargetX,beamTargetY,W*0.095);
     impG.addColorStop(0,`rgba(255,255,255,${0.85+Math.sin(t*28)*0.15})`);
     impG.addColorStop(0.15,'rgba(200,90,255,0.72)');impG.addColorStop(0.45,'rgba(120,35,205,0.36)');impG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=impG;ctx.beginPath();ctx.arc(beamTargetX,beamTargetY,W*0.095,0,Math.PI*2);ctx.fill();
     /* Étincelles */
     for(let sp=0;sp<10;sp++){
      const sa=Math.random()*Math.PI*2,sr=Math.random()*W*0.07;
      ctx.strokeStyle=`rgba(255,${175+Math.random()*80|0},255,${Math.random()*0.85+0.15})`;
      ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(beamTargetX,beamTargetY);ctx.lineTo(beamTargetX+Math.cos(sa)*sr,beamTargetY+Math.sin(sa)*sr);ctx.stroke();
     }
     ctx.restore();
    }

    /* ══ TRAPPE DE CONFINEMENT ══ */
    function drawTrap(tx,ty,active,timer){
     if(!active)return;
     const prog=Math.min(1,1-(timer/40));
     ctx.save();ctx.translate(tx,ty);
     /* Boîtier */
     ctx.fillStyle='rgba(22,18,10,0.92)';ctx.beginPath();ctx.roundRect(-W*0.045,-H*0.020,W*0.090,H*0.040,4);ctx.fill();
     /* Ouverture — portes qui s'écartent */
     const openW=W*0.036*prog;
     ctx.fillStyle=`rgba(255,${180+timer*2|0},20,${0.80+Math.sin(t*20)*0.15})`;
     ctx.beginPath();ctx.roundRect(-openW/2-W*0.005,-H*0.015,openW/2,H*0.030,2);ctx.fill();
     ctx.beginPath();ctx.roundRect(W*0.005,-H*0.015,openW/2,H*0.030,2);ctx.fill();
     /* Faisceau lumineux de capture */
     if(prog>0.3){
      const cg=ctx.createLinearGradient(0,-H*0.015,0,-H*0.015-H*0.15*prog);
      cg.addColorStop(0,`rgba(255,200,20,${0.55*prog})`);cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.moveTo(-openW*0.6,-H*0.015);ctx.lineTo(openW*0.6,-H*0.015);ctx.lineTo(openW*1.8,-H*0.015-H*0.14*prog);ctx.lineTo(-openW*1.8,-H*0.015-H*0.14*prog);ctx.closePath();ctx.fill();
     }
     ctx.restore();
    }

    /* ══ PKE METER — repositionné, plus grand ══ */
    const pkeX=W*0.80,pkeY=H*0.82;
    const pkeW=W*0.22,pkeH=H*0.16;
    let pkeLevel=0,pkeTarget=0.3,pkeTimer=0;
    const pkeBars=Array.from({length:10},(_,i)=>({i,phase:Math.random()*Math.PI*2}));
    let pkeAlarm=false;

    function drawPKEMeter(){
     /* Distance Slimer → PKE */
     const dist=Math.sqrt((ghostX-pkeX)**2+(ghostY-pkeY)**2);
     const proximity=Math.max(0,1-dist/(W*0.80));
     pkeTarget=0.15+proximity*0.85;
     pkeAlarm=proximity>0.55;
     pkeLevel+=(pkeTarget-pkeLevel)*0.05;
     pkeTimer--;if(pkeTimer<=0){pkeTimer=Math.floor(Math.random()*60)+30;}

     ctx.save();ctx.translate(pkeX,pkeY);
     /* Boîtier */
     const cg=ctx.createLinearGradient(-pkeW/2,-pkeH/2,pkeW/2,pkeH/2);
     cg.addColorStop(0,'rgba(28,32,24,0.94)');cg.addColorStop(1,'rgba(16,20,13,0.97)');
     ctx.fillStyle=cg;ctx.beginPath();ctx.roundRect(-pkeW/2,-pkeH/2,pkeW,pkeH,7);ctx.fill();
     /* Bordure verte */
     const borderOp=pkeAlarm?(0.55+Math.sin(t*8)*0.35):0.30;
     ctx.strokeStyle=`rgba(60,200,30,${borderOp})`;ctx.lineWidth=1.5;
     ctx.beginPath();ctx.roundRect(-pkeW/2,-pkeH/2,pkeW,pkeH,7);ctx.stroke();
     /* Écran */
     ctx.fillStyle='rgba(4,16,3,0.90)';ctx.beginPath();ctx.roundRect(-pkeW*0.44,-pkeH*0.40,pkeW*0.88,pkeH*0.52,4);ctx.fill();
     /* Barres */
     const barW=(pkeW*0.82)/pkeBars.length-2;
     for(const b of pkeBars){
      const bx=-pkeW*0.40+b.i*(barW+2);
      const bh=pkeH*0.40*Math.max(0.06,pkeLevel*(0.45+Math.sin(b.phase+t*4+b.i*0.45)*0.55));
      const red=pkeAlarm?(100+Math.sin(t*8)*40|0):40;
      ctx.fillStyle=`rgba(${red},${pkeAlarm?180:210},20,${pkeAlarm?0.92:0.65})`;
      ctx.fillRect(bx,-pkeH*0.10-bh,barW,bh);
     }
     /* Valeur numérique */
     ctx.fillStyle=`rgba(${pkeAlarm?'200,255,50':'60,210,30'},${pkeAlarm?0.95:0.60})`;
     ctx.font=`bold ${pkeW*0.16}px 'Courier New',monospace`;ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText(pkeAlarm?'PKE!!!':'PKE',0,pkeH*0.32);
     /* Antennes — s'élèvent proportionnellement au niveau */
     const antH=pkeH*0.80*pkeLevel;
     const antAlpha=0.45+pkeLevel*0.45;
     ctx.strokeStyle=`rgba(55,190,25,${antAlpha})`;ctx.lineWidth=2.2;ctx.lineCap='round';
     /* Gauche */
     ctx.beginPath();ctx.moveTo(-pkeW*0.5,-pkeH*0.10);
     ctx.lineTo(-pkeW*0.5-pkeW*0.14,-pkeH*0.10-antH*0.55);ctx.stroke();
     ctx.beginPath();ctx.moveTo(-pkeW*0.5-pkeW*0.05,-pkeH*0.10-antH*0.30);
     ctx.lineTo(-pkeW*0.5-pkeW*0.22,-pkeH*0.10-antH);ctx.stroke();
     /* Droite */
     ctx.beginPath();ctx.moveTo(pkeW*0.5,-pkeH*0.10);
     ctx.lineTo(pkeW*0.5+pkeW*0.14,-pkeH*0.10-antH*0.55);ctx.stroke();
     ctx.beginPath();ctx.moveTo(pkeW*0.5+pkeW*0.05,-pkeH*0.10-antH*0.30);
     ctx.lineTo(pkeW*0.5+pkeW*0.22,-pkeH*0.10-antH);ctx.stroke();
     /* Bouton rouge */
     ctx.fillStyle=`rgba(220,${pkeAlarm?30:40},20,${pkeAlarm?0.90:0.60})`;
     ctx.beginPath();ctx.arc(-pkeW*0.30,pkeH*0.38,pkeW*0.055,0,Math.PI*2);ctx.fill();
     ctx.fillStyle=`rgba(255,${pkeAlarm?80:100},50,0.55)`;
     ctx.beginPath();ctx.arc(-pkeW*0.32,pkeH*0.35,pkeW*0.025,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    /* ══ LOGO NO GHOST ══ */
    function drawNoGhostLogo(lx,ly,lr,alpha){
     ctx.save();ctx.translate(lx,ly);ctx.globalAlpha=alpha;
     ctx.strokeStyle='rgba(220,28,28,0.92)';ctx.lineWidth=lr*0.10;
     ctx.beginPath();ctx.arc(0,0,lr,0,Math.PI*2);ctx.stroke();
     ctx.beginPath();ctx.moveTo(-lr*Math.cos(Math.PI*0.75),-lr*Math.sin(Math.PI*0.75));ctx.lineTo(lr*Math.cos(Math.PI*0.75),lr*Math.sin(Math.PI*0.75));ctx.stroke();
     const gr=lr*0.52;
     ctx.fillStyle='rgba(220,28,28,0.84)';
     ctx.beginPath();ctx.arc(0,-gr*0.05,gr*0.62,Math.PI,0);
     ctx.bezierCurveTo(gr*0.62,gr*0.40,gr*0.42,gr*0.65,gr*0.20,gr*0.48);
     ctx.bezierCurveTo(0,gr*0.32,-0,gr*0.32,-gr*0.20,gr*0.48);
     ctx.bezierCurveTo(-gr*0.42,gr*0.65,-gr*0.62,gr*0.40,-gr*0.62,gr*0.10);
     ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(255,255,255,0.92)';
     ctx.beginPath();ctx.arc(-gr*0.22,-gr*0.05,gr*0.14,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(gr*0.22,-gr*0.05,gr*0.14,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    function drawBackground(){
     /* Ciel très sombre — intérieur bibliothèque */
     ctx.fillStyle='rgba(6,5,8,0.98)';ctx.fillRect(0,0,W,H);
     /* Plafond ornemental */
     const ceil=ctx.createLinearGradient(0,0,0,H*0.12);
     ceil.addColorStop(0,'rgba(28,22,14,0.98)');ceil.addColorStop(1,'rgba(20,15,10,0.96)');
     ctx.fillStyle=ceil;ctx.fillRect(0,0,W,H*0.12);
     /* Moulures plafond */
     ctx.strokeStyle='rgba(55,42,20,0.45)';ctx.lineWidth=1;
     for(let mi=0;mi<5;mi++){
      const my=H*(0.05+mi*0.016);
      ctx.beginPath();ctx.moveTo(0,my);ctx.lineTo(W,my);ctx.stroke();
     }
     /* Étagères de livres en fond — effet de bibliothèque */
     for(const sh of shelves){
      let bx=0;
      for(const bk of sh.books){
       ctx.fillStyle=`hsla(${bk.hue},55%,${22+Math.random()*8}%,0.65)`;
       ctx.fillRect(bx,sh.y,bk.w,bk.h);bx+=bk.w+1;
       if(bx>W)break;
      }
      ctx.strokeStyle='rgba(35,25,12,0.55)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(0,sh.y+sh.books[0].h);ctx.lineTo(W,sh.y+sh.books[0].h);ctx.stroke();
     }
     /* Flammes paranormales sur les étagères */
     for(const lf of libFlames){
      for(const fp of lf.particles){
       fp.life+=0.028;fp.x+=fp.vx;fp.y+=fp.vy;fp.vy*=0.988;
       if(fp.life>fp.maxLife){fp.life=0;fp.x=0;fp.y=0;fp.vx=(Math.random()-0.5)*0.9;fp.vy=-(Math.random()*1.2+0.4);fp.r=Math.random()*6+2;}
       const fa=Math.max(0,Math.sin((fp.life/fp.maxLife)*Math.PI))*0.65;
       const fg=ctx.createRadialGradient(lf.x+fp.x,lf.shelfY+fp.y,0,lf.x+fp.x,lf.shelfY+fp.y,fp.r);
       fg.addColorStop(0,`hsla(${fp.hue},90%,70%,${fa})`);fg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=fg;ctx.beginPath();ctx.arc(lf.x+fp.x,lf.shelfY+fp.y,fp.r,0,Math.PI*2);ctx.fill();
      }
     }
     /* Colonnes néo-classiques */
     for(const col of columns){
      const colY=H*0.12;
      const cg=ctx.createLinearGradient(col.x,colY,col.x+col.w,colY);
      cg.addColorStop(0,'rgba(28,22,14,0.96)');cg.addColorStop(0.3,'rgba(42,34,20,0.92)');
      cg.addColorStop(0.7,'rgba(35,28,16,0.94)');cg.addColorStop(1,'rgba(22,16,10,0.97)');
      ctx.fillStyle=cg;ctx.fillRect(col.x,colY,col.w,col.h);
      /* Rainures */
      ctx.strokeStyle='rgba(16,12,6,0.55)';ctx.lineWidth=0.8;
      for(let ri=1;ri<4;ri++){const rx=col.x+col.w*(ri/4);ctx.beginPath();ctx.moveTo(rx,colY);ctx.lineTo(rx,colY+col.h);ctx.stroke();}
      /* Chapiteau */
      ctx.fillStyle='rgba(38,30,18,0.95)';ctx.beginPath();ctx.roundRect(col.x-col.w*0.12,colY,col.w*1.24,H*0.030,2);ctx.fill();
      /* Base */
      ctx.fillStyle='rgba(35,26,14,0.96)';ctx.fillRect(col.x-col.w*0.08,colY+col.h-H*0.02,col.w*1.16,H*0.022);
      /* Ectoplasme dégoulinant */
      const ss=slimeStreaks.find(s=>s.colIdx===columns.indexOf(col));
      if(ss){
       ss.drip=(ss.drip+ss.dripSpd)%1.2;
       const dripY=colY+col.h*ss.yFrac+ss.drip*col.h*0.35;
       const sg=ctx.createLinearGradient(col.x+col.w/2,dripY,col.x+col.w/2,dripY+ss.len);
       sg.addColorStop(0,'rgba(0,0,0,0)');sg.addColorStop(0.3,`rgba(50,210,15,${ss.op})`);sg.addColorStop(0.8,`rgba(25,160,8,${ss.op*0.55})`);sg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.strokeStyle=sg;ctx.lineWidth=ss.width;ctx.lineCap='round';
       ctx.beginPath();ctx.moveTo(col.x+col.w/2,dripY);ctx.lineTo(col.x+col.w/2+Math.sin(dripY*0.05)*3,dripY+ss.len);ctx.stroke();
      }
     }
     /* Sol en marbre */
     const floor=ctx.createLinearGradient(0,H*0.75,0,H);
     floor.addColorStop(0,'rgba(22,18,12,0.96)');floor.addColorStop(0.4,'rgba(16,12,8,0.98)');floor.addColorStop(1,'rgba(8,6,4,0.99)');
     ctx.fillStyle=floor;ctx.fillRect(0,H*0.75,W,H*0.25);
     /* Veines du marbre */
     ctx.strokeStyle='rgba(35,28,16,0.30)';ctx.lineWidth=0.7;
     for(let vi=0;vi<8;vi++){
      const vy=H*(0.76+vi*0.033);ctx.beginPath();ctx.moveTo(0,vy);
      for(let xi=0;xi<=W;xi+=W/12)ctx.lineTo(xi,vy+Math.sin(xi*0.015+vi)*3);ctx.stroke();
     }
     /* Brume ectoplasmatique au sol */
     for(const mp of mistPuffs){
      mp.x+=mp.vx;mp.phase+=0.018;
      if(mp.x>W+mp.r)mp.x=-mp.r;if(mp.x<-mp.r)mp.x=W+mp.r;
      const mop=mp.op*(0.55+0.45*Math.sin(mp.phase));
      const mg=ctx.createRadialGradient(mp.x,mp.y,2,mp.x,mp.y,mp.r);
      mg.addColorStop(0,`rgba(40,200,12,${mop})`);mg.addColorStop(0.5,'rgba(20,140,6,0.04)');mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;ctx.beginPath();ctx.ellipse(mp.x,mp.y,mp.r,mp.r*0.30,0,0,Math.PI*2);ctx.fill();
     }
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(4,3,5,0.22)';ctx.fillRect(0,0,W,H);
     drawBackground();

     /* Pages volantes */
     for(const pg of pages){
      pg.x+=pg.vx;pg.y+=pg.vy;pg.rot+=pg.rotSpd;
      if(pg.x<-pg.w)pg.x=W+pg.w;if(pg.x>W+pg.w)pg.x=-pg.w;
      if(pg.y<-pg.h)pg.y=H*0.65;if(pg.y>H*0.65)pg.y=-pg.h;
      ctx.save();ctx.translate(pg.x,pg.y);ctx.rotate(pg.rot);
      ctx.fillStyle=`rgba(220,210,185,${pg.op})`;ctx.beginPath();ctx.roundRect(-pg.w/2,-pg.h/2,pg.w,pg.h,1);ctx.fill();
      /* Lignes de texte */
      ctx.strokeStyle=`rgba(140,125,90,${pg.op*0.45})`;ctx.lineWidth=0.6;
      for(let li=0;li<3;li++){ctx.beginPath();ctx.moveTo(-pg.w*0.38,-pg.h*0.20+li*pg.h*0.25);ctx.lineTo(pg.w*0.38,-pg.h*0.20+li*pg.h*0.25);ctx.stroke();}
      ctx.restore();
     }

     /* Logo No Ghost — coin haut gauche */
     drawNoGhostLogo(W*0.11,H*0.13,W*0.070,0.40+Math.sin(t*0.5)*0.06);

     /* Mouvement de Slimer — fuit le rayon */
     const dist=Math.sqrt((ghostX-gbX)**2+(ghostY-gbY)**2);
     ghostPanic=beamActive?Math.max(0,Math.min(1,1-dist/(W*0.65))):Math.max(0,ghostPanic-0.02);
     ghostVx+=ghostPanic*(ghostX>gbX?0.08:-0.08);
     ghostX+=ghostVx+Math.sin(t*0.55)*0.40+ghostPanic*Math.sign(ghostX-gbX)*0.8;
     ghostY+=ghostVy+Math.cos(t*0.42)*0.28;
     if(ghostX<W*0.12||ghostX>W*0.88)ghostVx*=-1;
     if(ghostY<H*0.15||ghostY>H*0.58)ghostVy*=-1;
     /* Traînée de slime */
     slimeTrail.push({x:ghostX,y:ghostY});if(slimeTrail.length>14)slimeTrail.shift();

     drawSlimer(ghostX,ghostY,ghostPanic);

     /* Rayon de proton */
     beamCooldown--;
     if(beamCooldown<=0&&!beamActive){
      beamActive=true;beamTimer=60+Math.floor(Math.random()*40);
      beamTargetX=ghostX;beamTargetY=ghostY;
      beamCooldown=220+Math.floor(Math.random()*160);
     }
     if(beamActive){
      beamTargetX+=(ghostX-beamTargetX)*0.10;beamTargetY+=(ghostY-beamTargetY)*0.10;
      drawProtonBeam();beamTimer--;
      if(beamTimer<=0){
       beamActive=false;
       /* Lance la trappe */
       trapActive=true;trapTimer=55;trapX=ghostX;trapY=H*0.86;captureFlash=12;
      }
     }
     /* Trappe de confinement */
     if(trapActive){drawTrap(trapX,trapY,trapActive,trapTimer);trapTimer--;if(trapTimer<=0)trapActive=false;}
     /* Flash de capture */
     if(captureFlash>0){ctx.fillStyle=`rgba(255,200,20,${captureFlash*0.025})`;ctx.fillRect(0,0,W,H);captureFlash--;}

     /* Ghostbuster */
     drawGhostbuster(gbX,gbY);

     /* PKE meter */
     drawPKEMeter();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.46,H*0.07,cx,H*0.46,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.45,'rgba(0,2,0,0.10)');vg.addColorStop(1,'rgba(0,0,0,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     /* Grain */
     for(let i=0;i<45;i++){const gv=50+Math.random()*45|0;ctx.fillStyle=`rgba(${gv+8},${gv+12},${gv},${Math.random()*0.020})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
