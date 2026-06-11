// CinéQuiz splash chunk — La Ligne Verte
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["La Ligne Verte"]={
   name:'La Ligne Verte',
   color:'40,160,80',
   ref:'La Ligne Verte \u2014 Frank Darabont, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.82';
    let t=0;
    const cx=W/2,cy=H/2;

    /* Point de fuite du couloir */
    const vpX=cx,vpY=H*0.42;

    /* Ampoules au plafond en perspective */
    const bulbs=[
     {px:0.50,py:0.14,r:W*0.14,flicker:0,flickerTimer:0,on:true},
     {px:0.50,py:0.24,r:W*0.10,flicker:0,flickerTimer:45,on:true},
     {px:0.50,py:0.32,r:W*0.07,flicker:0,flickerTimer:80,on:true},
     {px:0.50,py:0.38,r:W*0.05,flicker:0,flickerTimer:110,on:true},
    ];

    /* Barreaux de cellules — gauche et droite en perspective */
    const cellCount=6;
    const cells=Array.from({length:cellCount},(_,i)=>{
     const frac=(i+1)/(cellCount+1);
     const wallLX=cx-(W*0.50)*(1-frac*0.72);
     const wallRX=cx+(W*0.50)*(1-frac*0.72);
     const wallY0=vpY+(H-vpY)*frac*0.88-H*0.02;
     const wallH=(H-vpY)*(1-frac*0.88)*0.65;
     return {frac,wallLX,wallRX,wallY0,wallH};
    });

    /* John Coffey — silhouette massive qui marche lentement */
    const coffey={z:0,spd:0.0025};/* z: 0=fond, 1=devant */

    /* Magie verte — particules depuis les mains de Coffey */
    const magicParts=Array.from({length:55},()=>({
     x:0,y:0,vx:(Math.random()-0.5)*1.80,vy:-(Math.random()*1.20+0.35),
     r:Math.random()*4+1.2,life:Math.random(),maxLife:0.7+Math.random()*0.5,
     phase:Math.random()*Math.PI*2
    }));

    /* Traînée de magie sur la ligne verte au sol */
    const lineParts=Array.from({length:30},(_,i)=>({
     x:cx+(i-15)*(W*0.022),phase:Math.random()*Math.PI*2,spd:0.030+Math.random()*0.020,r:Math.random()*3+1
    }));

    /* Mouches lumineuses — plus nombreuses */
    const fireflies=Array.from({length:50},()=>({
     x:Math.random()*W,y:H*0.30+Math.random()*H*0.55,
     vx:(Math.random()-0.5)*0.50,vy:(Math.random()-0.5)*0.35,
     phase:Math.random()*Math.PI*2,freq:0.030+Math.random()*0.055,
     orbitX:cx+(Math.random()-0.5)*W*0.55,orbitY:H*0.50+Math.random()*H*0.25,
     orbitR:Math.random()*W*0.12+W*0.03,orbitSpd:(Math.random()-0.5)*0.020,
     size:3.5+Math.random()*5.5,
    }));

    /* Ombres portées des barreaux */
    function drawCorridor(){
     /* Plafond */
     ctx.fillStyle='rgba(14,11,7,0.98)';ctx.fillRect(0,0,W,vpY);
     /* Sol en perspective */
     const floor=ctx.createLinearGradient(0,vpY,0,H);
     floor.addColorStop(0,'rgba(24,20,13,0.97)');floor.addColorStop(0.5,'rgba(18,14,9,0.98)');floor.addColorStop(1,'rgba(10,8,5,0.99)');
     ctx.fillStyle=floor;ctx.fillRect(0,vpY,W,H-vpY);
     /* Murs latéraux gauche et droit */
     ctx.fillStyle='rgba(20,16,10,0.97)';
     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(vpX,vpY);ctx.lineTo(vpX,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.moveTo(W,0);ctx.lineTo(vpX,vpY);ctx.lineTo(vpX,H);ctx.lineTo(W,H);ctx.closePath();ctx.fill();
     /* Lignes de fuite — carrelage sol */
     ctx.strokeStyle='rgba(30,24,14,0.50)';ctx.lineWidth=0.8;
     for(let li=1;li<7;li++){
      const frac=li/7;
      const lx0=W*frac,ly0=0;
      ctx.beginPath();ctx.moveTo(lx0,ly0);ctx.lineTo(vpX,vpY);ctx.stroke();
     }
     /* Lignes horizontales au sol — profondeur */
     for(let hi=1;hi<8;hi++){
      const frac=hi/8;
      const hy=vpY+(H-vpY)*frac;
      const hw=W*(0.5*(1-frac)+frac);
      ctx.strokeStyle=`rgba(35,28,16,${0.45-frac*0.20})`;ctx.lineWidth=0.7;
      ctx.beginPath();ctx.moveTo(cx-hw*0.5,hy);ctx.lineTo(cx+hw*0.5,hy);ctx.stroke();
     }
     /* Barreaux cellules en perspective */
     for(const c of cells){
      const barW=3*(1-c.frac*0.55),barOp=0.62*(1-c.frac*0.40);
      const nBars=5;
      /* Gauche */
      for(let bi=0;bi<nBars;bi++){
       const bx=c.wallLX-(c.wallLX-vpX)*0.15+bi*(W*0.028*(1-c.frac*0.65));
       if(bx>cx-W*0.02)continue;
       ctx.fillStyle=`rgba(28,22,12,${barOp})`;ctx.fillRect(bx-barW/2,c.wallY0,barW,c.wallH);
       /* Ombre portée */
       const shG=ctx.createLinearGradient(bx,c.wallY0,bx+barW*3,c.wallY0);
       shG.addColorStop(0,`rgba(0,0,0,${barOp*0.30})`);shG.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=shG;ctx.fillRect(bx,c.wallY0,barW*4,c.wallH);
      }
      /* Droite */
      for(let bi=0;bi<nBars;bi++){
       const bx=c.wallRX+(W-c.wallRX)*0.15-bi*(W*0.028*(1-c.frac*0.65));
       if(bx<cx+W*0.02)continue;
       ctx.fillStyle=`rgba(28,22,12,${barOp})`;ctx.fillRect(bx-barW/2,c.wallY0,barW,c.wallH);
      }
      /* Traverse horizontale */
      ctx.fillStyle=`rgba(32,25,14,${barOp*0.75})`;
      ctx.fillRect(vpX,c.wallY0+c.wallH*0.30,c.wallLX-vpX,3*(1-c.frac*0.5));
      ctx.fillRect(vpX,c.wallY0+c.wallH*0.30,c.wallRX-vpX,3*(1-c.frac*0.5));
     }
    }

    function drawGreenLine(){
     /* Ligne verte au sol — en perspective */
     const lineY=H*0.88;
     const lineW=W*0.72;
     const pulse=0.72+Math.sin(t*1.2)*0.22;
     /* Lueur large sous la ligne — plus forte */
     const glowG=ctx.createLinearGradient(0,lineY-H*0.07,0,lineY+H*0.07);
     glowG.addColorStop(0,'rgba(0,0,0,0)');glowG.addColorStop(0.5,`rgba(20,220,65,${pulse*0.55})`);glowG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glowG;ctx.fillRect(cx-lineW/2,lineY-H*0.06,lineW,H*0.12);
     /* Reflet vert sur le sol */
     const floorRefl=ctx.createRadialGradient(cx,lineY,0,cx,lineY,W*0.42);
     floorRefl.addColorStop(0,`rgba(10,180,50,${pulse*0.12})`);floorRefl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=floorRefl;ctx.fillRect(0,lineY-H*0.02,W,H*0.15);
     /* Ligne elle-même */
     ctx.strokeStyle=`rgba(50,235,85,${pulse*0.95})`;ctx.lineWidth=3;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(cx-lineW/2,lineY);ctx.lineTo(cx+lineW/2,lineY);ctx.stroke();
     /* Ligne en perspective vers le fond */
     for(let li=1;li<5;li++){
      const frac=li/5;const ly=vpY+(lineY-vpY)*frac;const lw=lineW*frac*0.38;
      ctx.strokeStyle=`rgba(30,200,60,${(0.55-frac*0.10)*pulse})`;ctx.lineWidth=2.8*(1-frac*0.65);
      ctx.beginPath();ctx.moveTo(cx-lw/2,ly);ctx.lineTo(cx+lw/2,ly);ctx.stroke();
     }
     /* Particules sur la ligne */
     for(const lp of lineParts){
      lp.phase+=lp.spd;
      const la=Math.max(0,Math.sin(lp.phase))*0.65;
      const lg=ctx.createRadialGradient(lp.x,lineY,0,lp.x,lineY,lp.r*3);
      lg.addColorStop(0,`rgba(100,255,130,${la})`);lg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lg;ctx.beginPath();ctx.arc(lp.x,lineY,lp.r*3,0,Math.PI*2);ctx.fill();
     }
     /* Reflet vert sur les barreaux proches */
     for(const c of cells.slice(0,3)){
      const barGlow=ctx.createLinearGradient(c.wallLX,c.wallY0+c.wallH,c.wallLX,c.wallY0);
      barGlow.addColorStop(0,`rgba(20,200,55,${pulse*0.18*(1-c.frac)})`);barGlow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=barGlow;ctx.fillRect(c.wallLX-W*0.02,c.wallY0,W*0.04,c.wallH);
      ctx.fillRect(c.wallRX-W*0.02,c.wallY0,W*0.04,c.wallH);
     }
    }

    function drawBulbs(){
     for(const b of bulbs){
      b.flickerTimer--;
      if(b.flickerTimer<=0){
       b.flickerTimer=40+Math.floor(Math.random()*180);
       if(Math.random()<0.15){b.on=false;setTimeout(()=>{b.on=true;},80+Math.random()*120);}
      }
      const by=H*b.py,bx=W*b.px;
      /* Fil */
      ctx.strokeStyle='rgba(40,30,16,0.70)';ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(bx,0);ctx.lineTo(bx,by-b.r*0.18);ctx.stroke();
      if(!b.on)continue;
      const op=0.65+Math.sin(t*0.8)*0.10;
      /* Cône de lumière vers le bas */
      const cg=ctx.createRadialGradient(bx,by,2,bx,by+H*0.10,b.r*1.8);
      cg.addColorStop(0,`rgba(220,195,120,${op*0.22})`);cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.ellipse(bx,by+H*0.06,b.r*0.90,b.r*0.55,0,0,Math.PI*2);ctx.fill();
      /* Ampoule */
      const ag=ctx.createRadialGradient(bx,by,0,bx,by,b.r);
      ag.addColorStop(0,`rgba(255,235,160,${op})`);ag.addColorStop(0.25,'rgba(200,175,90,0.20)');ag.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ag;ctx.beginPath();ctx.arc(bx,by,b.r,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,245,190,${op*0.90})`;ctx.beginPath();ctx.arc(bx,by,Math.max(2,b.r*0.08),0,Math.PI*2);ctx.fill();
     }
    }

    function drawCoffey(){
     /* Position de Coffey dans le couloir — avance depuis le fond */
     coffey.z+=coffey.spd;if(coffey.z>1.0)coffey.z=0;
     const frac=coffey.z;
     /* Taille proportionnelle à la perspective */
     const baseScale=0.25+frac*0.72;
     const figH=H*0.50*baseScale;
     const figW=W*0.22*baseScale;
     const figX=vpX;
     const figY=vpY+(H*0.90-vpY)*frac;
     /* Lueur verte autour de Coffey — magie */
     const breathe=Math.sin(t*0.55)*0.018; /* respiration */
     const aura=ctx.createRadialGradient(figX,figY-figH*0.30,4,figX,figY-figH*0.30,figW*2.5);
     aura.addColorStop(0,`rgba(30,200,70,${0.18+Math.sin(t*0.5)*0.07})`);aura.addColorStop(0.5,'rgba(10,140,40,0.07)');aura.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=aura;ctx.beginPath();ctx.ellipse(figX,figY-figH*0.30,figW*2.5,figH*0.55,0,0,Math.PI*2);ctx.fill();
     /* Silhouette massive avec légère respiration */
     ctx.fillStyle='rgba(4,4,3,0.98)';
     /* Corps — légère oscillation verticale */
     ctx.beginPath();ctx.roundRect(figX-figW*(0.5+breathe*0.5),figY-figH*(0.68+breathe),figW*(1+breathe),figH*0.60,4);ctx.fill();
     /* Tête (grande) */
     ctx.beginPath();ctx.arc(figX,figY-figH*0.76,figW*0.44,0,Math.PI*2);ctx.fill();
     /* Épaules larges */
     ctx.beginPath();ctx.ellipse(figX,figY-figH*0.60,figW*0.60,figH*0.10,0,0,Math.PI*2);ctx.fill();
     /* Bras */
     const walkPhase=t*1.5;
     ctx.strokeStyle='rgba(4,4,3,0.98)';ctx.lineWidth=figW*0.22;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(figX-figW*0.50,figY-figH*0.55);ctx.lineTo(figX-figW*0.55+Math.sin(walkPhase)*figW*0.08,figY-figH*0.25);ctx.stroke();
     ctx.beginPath();ctx.moveTo(figX+figW*0.50,figY-figH*0.55);ctx.lineTo(figX+figW*0.55+Math.sin(walkPhase+Math.PI)*figW*0.08,figY-figH*0.25);ctx.stroke();
     /* Jambes */
     ctx.lineWidth=figW*0.18;
     ctx.beginPath();ctx.moveTo(figX-figW*0.22,figY-figH*0.08);ctx.lineTo(figX-figW*0.26+Math.sin(walkPhase)*figW*0.14,figY+figH*0.06);ctx.stroke();
     ctx.beginPath();ctx.moveTo(figX+figW*0.22,figY-figH*0.08);ctx.lineTo(figX+figW*0.26+Math.sin(walkPhase+Math.PI)*figW*0.14,figY+figH*0.06);ctx.stroke();
     /* Mains — source de la magie */
     const handLX=figX-figW*0.55+Math.sin(walkPhase)*figW*0.08;
     const handLY=figY-figH*0.25;
     const handRX=figX+figW*0.55+Math.sin(walkPhase+Math.PI)*figW*0.08;
     const handRY=figY-figH*0.25;
     /* Émission de particules depuis les mains */
     for(const mp of magicParts){
      if(mp.life<=0||mp.life>=mp.maxLife){
       mp.life=0;
       const fromLeft=Math.random()<0.5;
       mp.x=(fromLeft?handLX:handRX)+(Math.random()-0.5)*figW*0.22;
       mp.y=(fromLeft?handLY:handRY)+(Math.random()-0.5)*figH*0.08;
       mp.vx=(Math.random()-0.5)*1.80*(baseScale*0.8+0.4);
       mp.vy=-(Math.random()*1.20+0.35)*(baseScale*0.8+0.4);
      }
      mp.life+=0.018;mp.x+=mp.vx;mp.y+=mp.vy;mp.phase+=0.05;mp.vy*=0.990;
      const ma=Math.max(0,Math.sin((mp.life/mp.maxLife)*Math.PI))*(0.50+Math.sin(mp.phase)*0.30);
      const mg=ctx.createRadialGradient(mp.x,mp.y,0,mp.x,mp.y,mp.r*2);
      mg.addColorStop(0,`rgba(100,255,140,${ma})`);mg.addColorStop(0.5,`rgba(30,210,70,${ma*0.45})`);mg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mg;ctx.beginPath();ctx.arc(mp.x,mp.y,mp.r*2,0,Math.PI*2);ctx.fill();
     }
     /* Ombre de Coffey sur le sol */
     const shScale=0.40+frac*0.45;
     const shG=ctx.createRadialGradient(figX,figY+figH*0.10,2,figX,figY+figH*0.10,figW*1.8*shScale);
     shG.addColorStop(0,`rgba(0,0,0,${0.50*frac})`);shG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shG;ctx.beginPath();ctx.ellipse(figX,figY+figH*0.08,figW*1.6*shScale,figH*0.12*shScale,0,0,Math.PI*2);ctx.fill();
    }

    /* ── Mr. Jingles ── */
    const mouse={
     x:-W*0.10, y:H*0.893,
     dir:1, phase:0,
     state:'run', stateTimer:0,
     visible:false, nextAppear:150,
    };

    function drawMouse(){
     /* Gestion état */
     if(!mouse.visible){
      mouse.nextAppear--;
      if(mouse.nextAppear<=0){
       mouse.visible=true;
       mouse.dir=(Math.random()<0.5)?1:-1;
       mouse.x=mouse.dir>0?-W*0.08:W*1.08;
       mouse.state='run';mouse.stateTimer=0;
      }
      return;
     }
     /* Déplacement */
     const spd=mouse.state==='run'?W*0.0038:0;
     mouse.x+=spd*mouse.dir;
     mouse.phase+=mouse.state==='run'?0.32:0.06;
     /* Changement d'état aléatoire */
     mouse.stateTimer++;
     if(mouse.state==='run'&&mouse.stateTimer>60+Math.random()*80&&Math.random()<0.008){
      mouse.state='sniff';mouse.stateTimer=0;
     }
     if(mouse.state==='sniff'&&mouse.stateTimer>40+Math.random()*50){
      mouse.state='run';mouse.stateTimer=0;
     }
     /* Sortie de l'écran → reset */
     if(mouse.x>W*1.12||mouse.x<-W*0.12){
      mouse.visible=false;
      mouse.nextAppear=300+Math.floor(Math.random()*240);
      return;
     }

     /* Dessin de la souris — perspective : taille selon position Y */
     const sc=0.55+((mouse.y-H*0.42)/(H*0.55))*0.45;
     const mw=W*0.038*sc, mh=mw*0.55;
     const mx=mouse.x, my=mouse.y;

     ctx.save();
     ctx.scale(mouse.dir,1);
     const rx=mx*mouse.dir; /* coordonnées flippées */

     /* Ombre */
     ctx.fillStyle=`rgba(0,0,0,${0.28*sc})`;
     ctx.beginPath();ctx.ellipse(rx,my+mh*0.4,mw*0.7,mh*0.18,0,0,Math.PI*2);ctx.fill();

     /* Corps */
     ctx.fillStyle=`rgba(28,22,15,0.95)`;
     ctx.beginPath();ctx.ellipse(rx,my,mw,mh,Math.PI*0.08,0,Math.PI*2);ctx.fill();

     /* Tête */
     const headX=rx+mw*0.68, headY=my-mh*0.15;
     const headR=mw*0.42;
     ctx.beginPath();ctx.arc(headX,headY,headR,0,Math.PI*2);ctx.fill();

     /* Museau */
     const sniffOsc=mouse.state==='sniff'?Math.sin(mouse.phase*2)*mw*0.04:0;
     ctx.fillStyle='rgba(50,32,20,0.90)';
     ctx.beginPath();ctx.arc(headX+headR*0.82+sniffOsc,headY+headR*0.08,headR*0.25,0,Math.PI*2);ctx.fill();
     /* Oeil */
     ctx.fillStyle='rgba(160,220,160,0.80)';
     ctx.beginPath();ctx.arc(headX+headR*0.42,headY-headR*0.22,headR*0.18,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(8,8,6,0.95)';
     ctx.beginPath();ctx.arc(headX+headR*0.46,headY-headR*0.22,headR*0.09,0,Math.PI*2);ctx.fill();
     /* Oreilles */
     ctx.fillStyle='rgba(38,26,16,0.90)';
     ctx.beginPath();ctx.ellipse(headX+headR*0.10,headY-headR*0.72,headR*0.30,headR*0.36,Math.PI*0.12,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(headX-headR*0.28,headY-headR*0.68,headR*0.24,headR*0.30,Math.PI*0.08,0,Math.PI*2);ctx.fill();

     /* Queue — courbe sinusoïdale */
     ctx.strokeStyle='rgba(30,22,12,0.88)';ctx.lineWidth=mw*0.10;ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(rx-mw*0.90,my-mh*0.05);
     ctx.bezierCurveTo(
      rx-mw*1.35,my-mh*(0.30+Math.sin(mouse.phase*0.5)*0.18),
      rx-mw*1.60,my+mh*(0.10+Math.sin(mouse.phase*0.5+1)*0.12),
      rx-mw*1.80,my-mh*(0.05+Math.sin(mouse.phase*0.5+2)*0.22)
     );
     ctx.stroke();

     /* Pattes — animation de course */
     ctx.strokeStyle='rgba(24,18,10,0.92)';ctx.lineWidth=mw*0.13;
     if(mouse.state==='run'){
      const legAnim=Math.sin(mouse.phase);
      /* 4 pattes alternées */
      [[rx-mw*0.35,legAnim],[rx+mw*0.08,legAnim],[rx-mw*0.10,-legAnim],[rx+mw*0.35,-legAnim]].forEach(([lx,la])=>{
       ctx.beginPath();ctx.moveTo(lx,my+mh*0.25);ctx.lineTo(lx+la*mw*0.18,my+mh*0.55);ctx.stroke();
      });
     }

     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(3,2,1,0.26)';ctx.fillRect(0,0,W,H);
     drawCorridor();
     drawGreenLine();
     drawMouse(); /* Mr. Jingles avant Coffey pour être derrière lui */
     drawCoffey();
     drawBulbs();
     /* Mouches lumineuses — orbitent autour de Coffey */
     const coffeyScreenX=vpX;
     const coffeyScreenY=vpY+(H*0.90-vpY)*coffey.z-H*0.50*coffey.z*0.55;
     for(const f of fireflies){
      f.phase+=f.freq;
      f.x+=Math.cos(f.phase*0.3)*0.40+(Math.random()-0.5)*0.08;
      f.y+=Math.sin(f.phase*0.4)*0.30+(Math.random()-0.5)*0.06;
      /* Légère attraction vers Coffey */
      const fdx=coffeyScreenX-f.x,fdy=coffeyScreenY-f.y;const fdist=Math.sqrt(fdx*fdx+fdy*fdy);
      if(fdist>W*0.12&&fdist<W*0.50){f.x+=fdx/fdist*0.18;f.y+=fdy/fdist*0.14;}
      if(f.x<0)f.x=W;if(f.x>W)f.x=0;if(f.y<0)f.y=H*0.40;if(f.y>H*0.92)f.y=H*0.40;
      const glow=Math.max(0,Math.sin(f.phase));
      if(glow>0.06){
       const fr=f.size+glow*6;
       const fg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,fr);
       fg.addColorStop(0,`rgba(140,255,160,${glow*0.95})`);fg.addColorStop(0.35,`rgba(40,220,80,${glow*0.45})`);fg.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=fg;ctx.beginPath();ctx.arc(f.x,f.y,fr,0,Math.PI*2);ctx.fill();
       /* Point central brillant */
       ctx.fillStyle=`rgba(200,255,210,${glow*0.85})`;ctx.beginPath();ctx.arc(f.x,f.y,1.2,0,Math.PI*2);ctx.fill();
      }
     }
     /* Vignette — très marquée sur les bords */
     const vg=ctx.createRadialGradient(cx,cy,H*0.06,cx,cy,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.40,'rgba(0,0,0,0.32)');vg.addColorStop(1,'rgba(0,0,0,0.98)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     /* Grain film */
     for(let i=0;i<55;i++){const gv=10+Math.random()*22|0;ctx.fillStyle=`rgba(${gv+2},${gv+4},${gv},${Math.random()*0.026})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
