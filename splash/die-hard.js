// CinéQuiz splash chunk — Die Hard
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Die Hard"]={
   name:'Die Hard',
   color:'220,60,20',
   ref:'Die Hard \u2014 John McTiernan, 1988',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.80';
    let t=0;
    const cx=W/2;

    /* ── Neutralise les orbes de couleur du fond global ── */
    let _dhS=document.getElementById('_dh_s');
    if(!_dhS){_dhS=document.createElement('style');_dhS.id='_dh_s';document.head.appendChild(_dhS);}
    _dhS.textContent='';
    const _dhSW=setInterval(()=>{if(stop.v){_dhS.textContent='';clearInterval(_dhSW);}},200);

    /* ── Géométrie de la tour (référence partagée) ── */
    const BW=W*0.44, BH=H*0.78, BX=cx-BW/2, BY=H-BH;

    /* ── Éclats de verre tombants ── */
    const glass=Array.from({length:26},()=>({
     x:cx+(Math.random()-0.5)*W*0.50,y:H*0.28+Math.random()*H*0.22,
     vx:(Math.random()-0.5)*3.2,vy:Math.random()*2.2+0.5,
     rot:Math.random()*Math.PI*2,rotSpd:Math.random()*0.10-0.05,
     size:Math.random()*13+4,flash:0
    }));

    /* ── Étincelles ── */
    const sparks=Array.from({length:32},()=>({
     x:Math.random()*W,y:Math.random()*H*0.45+H*0.18,
     vx:(Math.random()-0.5)*4.2,vy:-(Math.random()*2.8+0.8),
     life:Math.random(),decay:0.024+Math.random()*0.028
    }));

    /* ── Cendres flottantes ── */
    const ashes=Array.from({length:40},()=>({
     x:cx+(Math.random()-0.5)*W*0.55,y:H*(0.15+Math.random()*0.55),
     vx:(Math.random()-0.5)*0.6,vy:-(Math.random()*0.55+0.15),
     r:Math.random()*2.2+0.5,op:Math.random()*0.32+0.06,
     ph:Math.random()*Math.PI*2,phSpd:Math.random()*0.022+0.008
    }));

    /* ── Volutes de fumée ── */
    const smoke=Array.from({length:10},()=>({
     x:cx+(Math.random()-0.5)*W*0.38,y:H*(0.17+Math.random()*0.06),
     r:W*(0.025+Math.random()*0.020),vx:(Math.random()-0.5)*0.4,
     vy:-(Math.random()*0.7+0.4),op:0.04+Math.random()*0.06,ph:Math.random()*Math.PI*2
    }));

    /* ── Skyline Los Angeles — immeubles de fond ── */
    const GROUND_Y = H*0.72;
    const cityBldg = (function(){
      const arr = [];
      const zones = [
        {x0:0,             x1:BX-W*0.01,    hMin:0.06, hMax:0.30, wMin:0.020, wMax:0.052},
        {x0:BX+BW+W*0.01,  x1:W,            hMin:0.06, hMax:0.30, wMin:0.020, wMax:0.052},
      ];
      for(const z of zones){
        let x=z.x0;
        while(x<z.x1){
          const bw=W*(z.wMin+Math.random()*(z.wMax-z.wMin));
          const bh=H*(z.hMin+Math.random()*(z.hMax-z.hMin));
          const nt=Math.random();
          arr.push({x,w:bw,h:bh,
            hasNeon:nt<0.28,
            neonCol:nt<0.10?[40,130,255]:nt<0.19?[255,115,25]:[190,215,255],
            neonPh:Math.random()*Math.PI*2,
            wins:Array.from({length:22},()=>({
              xf:Math.random(),yf:Math.random(),
              on:Math.random()<0.52,
              warm:Math.random()<0.58,
              fire:Math.random()<0.07,
              ph:Math.random()*Math.PI*2,
              flicker:Math.random()<0.05,
            })),
          });
          x+=bw+W*0.003;
        }
      }
      return arr;
    })();

    function drawCityBg(){
      /* Smog orangé horizon — Los Angeles by night */
      const smog=ctx.createLinearGradient(0,GROUND_Y*0.60,0,GROUND_Y);
      smog.addColorStop(0,'rgba(0,0,0,0)');
      smog.addColorStop(0.55,'rgba(60,22,5,0.10)');
      smog.addColorStop(1,'rgba(90,32,6,0.18)');
      ctx.fillStyle=smog;ctx.fillRect(0,GROUND_Y*0.60,W,GROUND_Y*0.40);

      for(const b of cityBldg){
        const by=GROUND_Y-b.h;
        /* Corps building — quasi noir bleuté */
        const bg=ctx.createLinearGradient(b.x,by,b.x+b.w,GROUND_Y);
        bg.addColorStop(0,'rgba(7,9,18,0.97)');
        bg.addColorStop(1,'rgba(4,6,12,0.98)');
        ctx.fillStyle=bg;ctx.fillRect(b.x,by,b.w,b.h);
        ctx.strokeStyle='rgba(18,28,52,0.22)';ctx.lineWidth=0.5;
        ctx.strokeRect(b.x,by,b.w,b.h);

        /* Fenêtres */
        const fw=Math.max(1.6,b.w*0.16),fh=Math.max(1.8,b.h*0.058);
        for(const w of b.wins){
          if(!w.on)continue;
          if(w.flicker&&Math.sin(t*4.2+w.ph)<-0.15)continue;
          const wx=b.x+w.xf*(b.w-fw);
          const wy=by+w.yf*(b.h-fh*1.8)+fh;
          if(wy>GROUND_Y-fh)continue;
          let col;
          if(w.fire) col='rgba(255,'+(55+Math.random()*45|0)+',8,'+(0.50+Math.sin(t*3+w.ph)*0.22)+')';
          else if(w.warm) col='rgba(215,162,55,'+(0.20+Math.sin(t*0.4+w.ph)*0.07)+')';
          else col='rgba(140,190,255,'+(0.16+Math.sin(t*0.5+w.ph)*0.06)+')';
          ctx.fillStyle=col;ctx.fillRect(wx,wy,fw,fh);
        }

        /* Néon en toiture */
        if(b.hasNeon){
          const nc=b.neonCol;
          const np=0.40+0.60*Math.abs(Math.sin(t*1.6+b.neonPh));
          ctx.strokeStyle='rgba('+nc[0]+','+nc[1]+','+nc[2]+','+(np*0.60)+')';
          ctx.lineWidth=b.w*0.20;ctx.lineCap='round';
          ctx.beginPath();
          ctx.moveTo(b.x+b.w*0.22,by-0.5);ctx.lineTo(b.x+b.w*0.78,by-0.5);ctx.stroke();
          const nhg=ctx.createRadialGradient(b.x+b.w/2,by,0,b.x+b.w/2,by,b.w*1.1);
          nhg.addColorStop(0,'rgba('+nc[0]+','+nc[1]+','+nc[2]+','+(np*0.09)+')');
          nhg.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=nhg;ctx.fillRect(b.x-b.w*0.1,by-b.w*1.1,b.w*1.2,b.w*1.1);
        }

        /* Reflet sol mouillé */
        const ra=0.04+Math.sin(t*0.3+b.x*0.005)*0.012;
        const rg=ctx.createLinearGradient(b.x,GROUND_Y,b.x,GROUND_Y+b.h*0.28);
        rg.addColorStop(0,'rgba(160,125,50,'+ra+')');
        rg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=rg;ctx.fillRect(b.x,GROUND_Y,b.w,b.h*0.28);
      }
    }

    /* ── Tremblement de la tour ── */
    let shakeX=0,shakeDecay=0,shakeTimer=0;

    /* ══ McCLANE — machine à états ══
       0  rappel_descente  : descend en rappel, pieds sur le mur
       1  blast_eject      : explosion → arc vers l'extérieur
       2  blast_swing      : pendule retour vers le mur
       3  pause_mur        : pause contre le mur
       4  chute_libre      : lâche la corde, rotation + chute
       5  reset            : fondu out, retour en haut
    ══ */
    const FACADE_X=BX+BW+W*0.015;
    const ROPE_TOP_X=BX+BW*0.82;
    const ROPE_TOP_Y=BY+H*0.02;

    const mcl={
     x:FACADE_X,y:BY+H*0.04,ropLen:H*0.04,
     phase:0,phaseT:0,
     bodyAng:0,legAng:0,
     vx:0,vy:0,spin:0,alpha:1,blastOff:0
    };

    /* ── Particules du blast ── */
    const blastParts=Array.from({length:18},()=>({x:0,y:0,vx:0,vy:0,life:0,r:0}));
    let blastActive=false;

    function triggerBlast(x,y){
     blastActive=true;
     for(const p of blastParts){
      const a=Math.random()*Math.PI*2,spd=2+Math.random()*4;
      p.x=x;p.y=y;p.vx=Math.cos(a)*spd;p.vy=Math.sin(a)*spd-2;
      p.life=1;p.r=2+Math.random()*3;
     }
     mcl.blastOff=1;
    }

    function drawMcClane(x,y,bodyAng,legAng,alpha,facingLeft){
     ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);
     const sc=W*0.052;
     ctx.scale(facingLeft?-1:1,1);
     ctx.fillStyle='rgba(14,11,8,0.97)';
     ctx.strokeStyle='rgba(14,11,8,0.97)';
     ctx.lineCap='round';ctx.lineJoin='round';
     ctx.save();ctx.rotate(bodyAng);
     ctx.beginPath();ctx.roundRect(-sc*0.16,-sc*0.52,sc*0.32,sc*0.50,sc*0.06);ctx.fill();
     ctx.beginPath();ctx.arc(0,-sc*0.64,sc*0.16,0,Math.PI*2);ctx.fill();
     ctx.lineWidth=sc*0.10;
     ctx.beginPath();ctx.moveTo(-sc*0.14,-sc*0.42);ctx.lineTo(-sc*0.22,-sc*0.72+Math.sin(t*3)*sc*0.04);ctx.stroke();
     ctx.beginPath();ctx.moveTo(sc*0.14,-sc*0.32);ctx.lineTo(sc*0.30,-sc*0.20+Math.sin(t*2.5+1)*sc*0.03);ctx.stroke();
     ctx.restore();
     ctx.save();ctx.rotate(legAng);ctx.lineWidth=sc*0.12;
     ctx.beginPath();ctx.moveTo(-sc*0.08,0);ctx.lineTo(-sc*0.12,sc*0.48);ctx.lineTo(-sc*0.08,sc*0.82);ctx.stroke();
     ctx.beginPath();ctx.moveTo(sc*0.08,0);ctx.lineTo(sc*0.14,sc*0.44+Math.sin(t*4)*sc*0.06);ctx.lineTo(sc*0.10,sc*0.80);ctx.stroke();
     ctx.restore();
     ctx.restore();
    }

    function drawRope(mx,my,slack,alpha){
     const handX=mx+(mcl.phase===1||mcl.phase===2?-W*0.04:-W*0.03);
     const handY=my-W*0.052*0.72;
     const midX=(ROPE_TOP_X+handX)/2+slack*0.4;
     const midY=(ROPE_TOP_Y+handY)/2+Math.abs(slack)*0.55;
     ctx.save();ctx.globalAlpha=alpha*0.82;
     ctx.strokeStyle='rgba(200,175,130,0.90)';ctx.lineWidth=1.6;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(ROPE_TOP_X,ROPE_TOP_Y);
     ctx.quadraticCurveTo(midX,midY,handX,handY);ctx.stroke();
     ctx.fillStyle='rgba(180,155,110,0.85)';
     ctx.beginPath();ctx.arc(ROPE_TOP_X,ROPE_TOP_Y,2.5,0,Math.PI*2);ctx.fill();
     ctx.restore();
    }

    function drawNakatomi(offX){
     const bw=BW,bh=BH,bx=BX+offX,by=BY;
     const bg=ctx.createLinearGradient(bx,by,bx+bw,by+bh);
     bg.addColorStop(0,'rgba(20,18,14,0.95)');bg.addColorStop(1,'rgba(15,12,8,0.97)');
     ctx.fillStyle=bg;ctx.fillRect(bx,by,bw,bh);
     ctx.strokeStyle='rgba(50,42,30,0.35)';ctx.lineWidth=1;ctx.strokeRect(bx,by,bw,bh);
     const fl=18;
     for(let fi=0;fi<fl;fi++){
      ctx.strokeStyle='rgba(35,30,22,0.38)';ctx.lineWidth=0.7;ctx.beginPath();ctx.moveTo(bx,by+fi*(bh/fl));ctx.lineTo(bx+bw,by+fi*(bh/fl));ctx.stroke();
     }
     for(let fi=0;fi<fl;fi++) for(let wi=0;wi<6;wi++){
      const wx=bx+wi*(bw/6)+W*0.018,wy=by+fi*(bh/fl)+H*0.008;
      const lit=Math.sin(fi*7.3+wi*3.1+t*0.08)>0.2,fire=lit&&Math.sin(fi*5.1+wi*2.7+t*0.5)>0.7;
      ctx.fillStyle=fire?`rgba(255,${80+Math.random()*60|0},10,0.75)`:lit?`rgba(220,185,80,${0.30+Math.sin(fi+wi+t*0.1)*0.12})`:'rgba(15,12,8,0.85)';
      ctx.fillRect(wx,wy,W*0.042,H*0.022);
     }
     const ff=by+H*0.18;
     for(let fi=0;fi<6;fi++){
      const fa=Math.sin(t*8+fi)*0.4,fh=W*0.036+Math.sin(t*6+fi)*W*0.011,fx=bx+fi*(bw/5)+W*0.04;
      const fg=ctx.createRadialGradient(fx+fa*3,ff-fh*0.5,2,fx,ff,fh);
      fg.addColorStop(0,`rgba(255,140,20,${0.75+Math.sin(t*7+fi)*0.20})`);fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.beginPath();ctx.arc(fx+fa*3,ff-fh*0.5,fh,0,Math.PI*2);ctx.fill();
     }
    }

    function updateMcClane(){
     const dt=0.016;
     mcl.phaseT+=dt;
     if(mcl.blastOff>0)mcl.blastOff*=0.85;
     switch(mcl.phase){
      case 0:{
       mcl.y+=H*0.045*dt;mcl.ropLen=mcl.y-ROPE_TOP_Y;
       mcl.bodyAng=-0.35+Math.sin(t*1.8)*0.04;mcl.legAng=1.45+Math.sin(t*2.2)*0.05;
       mcl.vx=0;mcl.vy=0;mcl.spin=0;
       if(mcl.y>BY+BH*0.38&&mcl.phaseT>1.2){triggerBlast(mcl.x,mcl.y);mcl.phase=1;mcl.phaseT=0;}
       break;
      }
      case 1:{
       if(mcl.phaseT<0.05){mcl.vx=W*0.55;mcl.vy=-H*0.18;}
       mcl.x+=mcl.vx*dt;mcl.y+=mcl.vy*dt;mcl.vy+=H*0.9*dt;mcl.vx*=0.96;
       mcl.bodyAng+=(0.8-mcl.bodyAng)*0.12;mcl.legAng+=(0.6-mcl.legAng)*0.10;
       if(mcl.phaseT>0.55){mcl.phase=2;mcl.phaseT=0;}
       break;
      }
      case 2:{
       mcl.x+=(FACADE_X-mcl.x)*0.07;mcl.vy+=H*0.9*dt;mcl.y+=mcl.vy*dt;mcl.vy*=0.88;
       mcl.bodyAng+=((-0.35)-mcl.bodyAng)*0.08;mcl.legAng+=((1.45)-mcl.legAng)*0.08;
       if(mcl.phaseT>0.9&&Math.abs(mcl.x-FACADE_X)<W*0.04){
        mcl.phase=3;mcl.phaseT=0;mcl.vx=0;mcl.vy=0;mcl.x=FACADE_X;
       }
       break;
      }
      case 3:{
       mcl.bodyAng=-0.35+Math.sin(t*2)*0.03;mcl.legAng=1.45+Math.sin(t*2.5)*0.04;
       mcl.y+=H*0.025*dt;mcl.ropLen=mcl.y-ROPE_TOP_Y;
       if(mcl.phaseT>1.1){mcl.phase=4;mcl.phaseT=0;mcl.vx=-W*0.05;mcl.vy=-H*0.04;}
       break;
      }
      case 4:{
       mcl.vy+=H*1.1*dt;mcl.vx*=0.99;mcl.x+=mcl.vx*dt;mcl.y+=mcl.vy*dt;
       mcl.bodyAng+=0.09;mcl.legAng+=0.063;
       if(mcl.y>H*0.68)mcl.alpha=Math.max(0,mcl.alpha-0.035);
       if(mcl.alpha<=0||mcl.y>H+50){mcl.phase=5;mcl.phaseT=0;}
       break;
      }
      case 5:{
       if(mcl.phaseT>0.6){
        mcl.x=FACADE_X;mcl.y=BY+H*0.04;mcl.ropLen=H*0.04;mcl.alpha=0;
        mcl.bodyAng=-0.35;mcl.legAng=1.45;mcl.vx=0;mcl.vy=0;mcl.blastOff=0;
        mcl.phase=0;mcl.phaseT=0;
       }
       if(mcl.phaseT>0.65)mcl.alpha=Math.min(1,mcl.alpha+0.05);
       break;
      }
     }
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(3,4,10,0.22)';ctx.fillRect(0,0,W,H);

     /* ── Étoiles ── */
     for(let i=0;i<38;i++){ctx.fillStyle=`rgba(255,255,255,${0.08+Math.random()*0.11})`;ctx.fillRect(Math.random()*W,Math.random()*H*0.28,1,1);}

     /* ── Tremblement ── */
     shakeTimer+=0.016;
     if(shakeTimer>4.2+Math.random()*2){shakeTimer=0;shakeDecay=1;}
     shakeDecay*=0.88;
     shakeX=shakeDecay>0.02?Math.sin(t*42)*1.8*shakeDecay:0;

     /* ── Skyline Los Angeles ── */
     drawCityBg();

     /* ── Tour Nakatomi ── */
     drawNakatomi(shakeX);

     /* ── Halo feu ── */
     const fg=ctx.createRadialGradient(cx,H*0.22,10,cx,H*0.22,W*0.48);
     fg.addColorStop(0,`rgba(255,100,15,${0.22+Math.sin(t*1.5)*0.08})`);fg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=fg;ctx.fillRect(0,0,W,H*0.48);

     /* ── Reflet flammes sur le sol ── */
     const groundY=H*0.72;
     const gr=ctx.createRadialGradient(cx,groundY,0,cx,groundY,W*0.42);
     gr.addColorStop(0,`rgba(255,90,10,${0.10+Math.sin(t*2.1)*0.04})`);
     gr.addColorStop(0.5,`rgba(200,55,5,${0.05+Math.sin(t*1.7+1)*0.02})`);
     gr.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=gr;ctx.fillRect(0,groundY-H*0.04,W,H*0.10);

     /* ── Cendres ── */
     for(const a of ashes){
      a.x+=a.vx;a.y+=a.vy;a.ph+=a.phSpd;a.x+=Math.sin(a.ph)*0.35;
      if(a.y<-10){a.y=H*(0.18+Math.random()*0.50);a.x=cx+(Math.random()-0.5)*W*0.55;}
      if(a.x<0)a.x=W;if(a.x>W)a.x=0;
      ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${30+Math.random()*20|0},${20+Math.random()*15|0},${10+Math.random()*10|0},${a.op*(0.5+Math.sin(a.ph)*0.5)})`;
      ctx.fill();
     }

     /* ── Fumée ── */
     for(const s of smoke){
      s.x+=s.vx;s.y+=s.vy;s.r+=0.22;s.op-=0.0014;
      if(s.op<=0||s.y<H*0.02){
       s.y=H*(0.17+Math.random()*0.06);s.x=cx+(Math.random()-0.5)*W*0.38;
       s.r=W*(0.025+Math.random()*0.020);s.op=0.04+Math.random()*0.06;s.vx=(Math.random()-0.5)*0.4;
      }
      const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
      sg.addColorStop(0,`rgba(60,45,32,${s.op})`);sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
     }

     /* ── Verre ── */
     for(const g of glass){
      g.x+=g.vx;g.y+=g.vy;g.rot+=g.rotSpd;g.vy+=0.08;
      if(g.flash>0)g.flash-=0.08;
      if(g.y>H+20){
       g.x=cx+(Math.random()-0.5)*W*0.28;g.y=H*0.26+Math.random()*H*0.08;
       g.vy=-(Math.random()*2+0.4);g.vx=(Math.random()-0.5)*3.2;g.flash=Math.random()>0.6?1:0;
      }
      ctx.save();ctx.translate(g.x,g.y);ctx.rotate(g.rot);
      const gg=ctx.createLinearGradient(-g.size/2,-g.size/2,g.size/2,g.size/2);
      const glassHigh=g.flash>0?`rgba(230,245,255,${g.flash*0.85})`:'rgba(180,210,240,0.60)';
      gg.addColorStop(0,glassHigh);gg.addColorStop(1,'rgba(100,150,200,0.15)');
      ctx.fillStyle=gg;ctx.beginPath();ctx.moveTo(0,-g.size*0.6);ctx.lineTo(g.size*0.4,g.size*0.4);ctx.lineTo(-g.size*0.4,g.size*0.4);ctx.closePath();ctx.fill();
      if(g.flash>0.1){ctx.strokeStyle=`rgba(255,255,255,${g.flash*0.65})`;ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(-g.size*0.3,-g.size*0.4);ctx.lineTo(g.size*0.2,g.size*0.2);ctx.stroke();}
      ctx.restore();
     }

     /* ── Étincelles ── */
     for(const sp of sparks){
      sp.x+=sp.vx;sp.y+=sp.vy;sp.vy+=0.08;sp.life-=sp.decay;
      if(sp.life<=0){sp.x=cx+(Math.random()-0.5)*W*0.38;sp.y=H*0.22;sp.life=1;sp.vx=(Math.random()-0.5)*4.2;sp.vy=-(Math.random()*2.8+0.8);}
      ctx.fillStyle=`rgba(255,${160+Math.random()*80|0},10,${sp.life*0.85})`;ctx.beginPath();ctx.arc(sp.x,sp.y,1.5,0,Math.PI*2);ctx.fill();
     }

     /* ── Particules blast ── */
     if(blastActive){
      let anyAlive=false;
      for(const p of blastParts){
       if(p.life<=0)continue;anyAlive=true;
       p.x+=p.vx;p.y+=p.vy;p.vy+=0.12;p.vx*=0.94;p.life-=0.032;
       const bc=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*2);
       bc.addColorStop(0,`rgba(255,180,40,${p.life*0.90})`);bc.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=bc;ctx.beginPath();ctx.arc(p.x,p.y,p.r*2,0,Math.PI*2);ctx.fill();
      }
      if(!anyAlive)blastActive=false;
     }

     /* ── Flash blast ambiant ── */
     if(mcl.blastOff>0.05){ctx.fillStyle=`rgba(255,140,20,${mcl.blastOff*0.12})`;ctx.fillRect(0,0,W,H);}

     /* ── McClane : mise à jour + dessin ── */
     updateMcClane();
     if(mcl.phase<=3&&mcl.alpha>0.05){
      const slack=(mcl.phase===1||mcl.phase===2)?W*0.08:W*0.018;
      drawRope(mcl.x,mcl.y,slack,mcl.alpha);
     }
     if(mcl.alpha>0.01)drawMcClane(mcl.x,mcl.y,mcl.bodyAng,mcl.legAng,mcl.alpha,mcl.phase<=3);

     /* ── Sol sombre ── */
     ctx.fillStyle='rgba(10,8,5,0.96)';ctx.fillRect(0,H*0.72,W,H*0.28);

     /* ── Vignette ── */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.05,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.45,'rgba(0,0,0,0.20)');vg.addColorStop(1,'rgba(0,0,0,0.96)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
