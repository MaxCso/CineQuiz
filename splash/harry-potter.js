// CinéQuiz splash chunk — Harry Potter
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Harry Potter"]={
   name:'Harry Potter',
   color:'120,60,200',
   ref:'Harry Potter \u2014 Chris Columbus, 2001',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.70';
    let t=0;
    const cx=W/2,cy=H/2;

    let _hpS=document.getElementById('_hp_s');
    if(!_hpS){_hpS=document.createElement('style');_hpS.id='_hp_s';document.head.appendChild(_hpS);}
    _hpS.textContent='#splash-content-wrap{top:24%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _hpW=setInterval(()=>{if(stop.v){_hpS.textContent='';clearInterval(_hpW);}},200);

    // ── Étoiles fixes ──
    const stars=Array.from({length:120},()=>({
     x:Math.random()*W, y:Math.random()*H*0.75,
     r:Math.random()*1.2+0.2,
     twinkle:Math.random()*Math.PI*2,
     spd:Math.random()*2+0.5
    }));

    // ── Particules magiques (étincelles dorées/violettes) ──
    const sparks=Array.from({length:55},()=>({
     x:Math.random()*W, y:H*0.4+Math.random()*H*0.6,
     vx:(Math.random()-0.5)*0.8, vy:-(Math.random()*1.2+0.3),
     r:Math.random()*1.8+0.4,
     hue:Math.random()<0.6?45+Math.random()*20:270+Math.random()*40,
     life:Math.random(), decay:Math.random()*0.008+0.004,
    }));

    // ── Lettre volante ──
    let letter={x:W*1.1, y:H*0.38, vx:-0.9, phase:0};

    // ── Chouette (Hedwig) ──
    let owl={x:-50, y:H*0.20, vx:1.1, phase:0, dir:1};
    let owlPause=false, owlPauseTimer=0;

    // ── Balai volant ──
    let broom={
     x:W*1.15, y:H*0.50,
     vx:-1.55,              /* va de droite à gauche */
     phase:0,               /* oscillation verticale */
     trail:Array.from({length:18},()=>({x:0,y:0,op:0}))
    };

    function drawBroom(x,y,phase){
     ctx.save();
     ctx.translate(x,y);
     /* légère inclinaison selon le mouvement — nez légèrement vers le bas */
     const tilt=-0.18+Math.sin(phase*0.4)*0.04;
     ctx.rotate(tilt);
     ctx.globalAlpha=0.82;

     /* ── Manche ── */
     const broomG=ctx.createLinearGradient(-W*0.055,0,W*0.055,0);
     broomG.addColorStop(0,'rgba(100,70,30,0.95)');
     broomG.addColorStop(0.5,'rgba(155,110,50,0.95)');
     broomG.addColorStop(1,'rgba(90,60,22,0.95)');
     ctx.fillStyle=broomG;
     ctx.beginPath();ctx.roundRect(-W*0.058,-W*0.007,W*0.116,W*0.014,W*0.007);ctx.fill();
     /* grain du bois */
     ctx.strokeStyle='rgba(60,38,10,0.20)';ctx.lineWidth=0.6;
     for(let i=-2;i<=2;i++){
      ctx.beginPath();ctx.moveTo(-W*0.055,i*W*0.003);ctx.lineTo(W*0.042,i*W*0.003+W*0.001);ctx.stroke();
     }

     /* ── Soies du balai (queue) ── */
     const bristleX=W*0.042;
     const bristleCount=14;
     for(let i=0;i<bristleCount;i++){
      const spread=(i/(bristleCount-1)-0.5)*W*0.036;
      const len=W*(0.022+Math.abs(i/(bristleCount-1)-0.5)*0.010);
      const wiggle=Math.sin(phase*3.5+i*0.7)*W*0.003;
      ctx.strokeStyle=`rgba(${120+i*4},${80+i*3},${28+i*2},0.88)`;
      ctx.lineWidth=1.0;ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(bristleX,spread);
      ctx.quadraticCurveTo(bristleX+len*0.5,spread+wiggle,bristleX+len,spread+wiggle*1.4);
      ctx.stroke();
     }
     /* ligature des soies */
     ctx.fillStyle='rgba(80,50,15,0.90)';
     ctx.beginPath();ctx.roundRect(bristleX-W*0.004,-W*0.010,W*0.010,W*0.020,1);ctx.fill();

     /* ── Silhouette du sorcier ── */
     const riderX=-W*0.018;
     /* cape */
     ctx.fillStyle='rgba(8,5,20,0.90)';
     ctx.beginPath();
     ctx.moveTo(riderX,W*0.008);
     ctx.bezierCurveTo(riderX-W*0.012,W*0.030+Math.sin(phase*2)*W*0.004,
                       riderX+W*0.010,W*0.032+Math.sin(phase*2+1)*W*0.004,
                       riderX+W*0.014,W*0.010);
     ctx.closePath();ctx.fill();
     /* corps */
     ctx.beginPath();ctx.ellipse(riderX,0,W*0.010,W*0.014,0,0,Math.PI*2);ctx.fill();
     /* tête */
     ctx.beginPath();ctx.arc(riderX,-W*0.018,W*0.009,0,Math.PI*2);ctx.fill();
     /* chapeau pointu */
     ctx.beginPath();
     ctx.moveTo(riderX-W*0.009,-W*0.026);
     ctx.lineTo(riderX,   -W*0.048);
     ctx.lineTo(riderX+W*0.009,-W*0.026);
     ctx.closePath();ctx.fill();

     ctx.restore();
    }

    // ── Silhouette Poudlard (tours) ──
    function drawCastle(){
     const base=H*0.82;
     const parts=[
      // [x, largeur, hauteur, créneaux, flèche]
      {x:cx-130,w:50, h:H*0.22, merlons:4, spire:false},
      {x:cx-85, w:28, h:H*0.18, merlons:3, spire:false},
      {x:cx-60, w:70, h:H*0.32, merlons:5, spire:true, sh:H*0.09},
      {x:cx+2,  w:55, h:H*0.26, merlons:4, spire:true, sh:H*0.07},
      {x:cx+60, w:30, h:H*0.19, merlons:3, spire:false},
      {x:cx+92, w:60, h:H*0.28, merlons:4, spire:true, sh:H*0.08},
      {x:cx+155,w:40, h:H*0.16, merlons:3, spire:false},
     ];
     for(const p of parts){
      // Corps de la tour
      ctx.fillStyle='rgba(10,8,22,0.96)';
      ctx.fillRect(p.x, base-p.h, p.w, p.h);
      // Créneaux
      const mw=p.w/p.merlons;
      for(let i=0;i<p.merlons;i++){
       if(i%2===0){
        ctx.fillRect(p.x+i*mw, base-p.h-7, mw*0.7, 8);
       }
      }
      // Flèche pointue
      if(p.spire){
       ctx.fillStyle='rgba(8,6,18,0.97)';
       ctx.beginPath();
       ctx.moveTo(p.x+p.w/2-2, base-p.h-p.sh);
       ctx.lineTo(p.x-2, base-p.h);
       ctx.lineTo(p.x+p.w+2, base-p.h);
       ctx.closePath();ctx.fill();
      }
      // Fenêtres lumineuses
      const cols=Math.max(1,Math.floor(p.w/18));
      const rows=Math.floor(p.h/20);
      for(let r=1;r<rows;r++) for(let c=0;c<cols;c++){
       if(Math.sin(p.x*0.4+r*c*1.3+t*0.08)>0.1){
        const wx=p.x+c*(p.w/cols)+6;
        const wy=base-p.h+r*20;
        // Lueur autour de la fenêtre
        const wg=ctx.createRadialGradient(wx+2,wy+3,0,wx+2,wy+3,9);
        wg.addColorStop(0,`rgba(240,190,60,${0.20+Math.sin(t*0.3+r+c)*0.06})`);
        wg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=wg;ctx.fillRect(wx-5,wy-4,18,18);
        // Fenêtre
        ctx.fillStyle=`rgba(250,200,70,${0.55+Math.sin(t*0.4+r*c)*0.12})`;
        ctx.fillRect(wx,wy,5,7);
       }
      }
     }
     // Montagne / falaise sous le château
     ctx.fillStyle='rgba(7,5,16,0.98)';
     ctx.beginPath();
     ctx.moveTo(0,H);
     ctx.lineTo(0,base+10);
     ctx.bezierCurveTo(W*0.15,base-20,W*0.30,base+5,W*0.45,base-8);
     ctx.bezierCurveTo(W*0.60,base-18,W*0.78,base+5,W,base+2);
     ctx.lineTo(W,H);ctx.closePath();ctx.fill();
    }

    // ── Reflet sur le lac ──
    function drawLake(){
     const lakeY=H*0.82;
     const lg=ctx.createLinearGradient(0,lakeY,0,H);
     lg.addColorStop(0,'rgba(20,15,50,0.55)');
     lg.addColorStop(1,'rgba(5,3,18,0.85)');
     ctx.fillStyle=lg;
     ctx.beginPath();
     ctx.moveTo(0,lakeY);
     for(let x=0;x<=W;x+=6){
      const y=lakeY+Math.sin(x*0.04+t*0.8)*2.5+Math.sin(x*0.09-t*0.5)*1.5;
      ctx.lineTo(x,y);
     }
     ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
     // Reflet lune sur le lac
     ctx.save();ctx.globalAlpha=0.12;
     const moonRefG=ctx.createLinearGradient(cx,lakeY,cx,H);
     moonRefG.addColorStop(0,'rgba(220,210,180,0.6)');
     moonRefG.addColorStop(1,'rgba(220,210,180,0)');
     ctx.fillStyle=moonRefG;
     ctx.fillRect(cx-18,lakeY,36,H-lakeY);
     ctx.restore();
    }

    // ── Lune ──
    function drawMoon(){
     const mx=W*0.78, my=H*0.10;
     const mg=ctx.createRadialGradient(mx,my,2,mx,my,26);
     mg.addColorStop(0,'rgba(240,230,195,0.92)');
     mg.addColorStop(0.5,'rgba(220,210,170,0.75)');
     mg.addColorStop(1,'rgba(180,165,120,0)');
     ctx.fillStyle=mg;ctx.beginPath();ctx.arc(mx,my,26,0,Math.PI*2);ctx.fill();
     // Halo lune
     const hg=ctx.createRadialGradient(mx,my,10,mx,my,70);
     hg.addColorStop(0,'rgba(220,205,155,0.08)');
     hg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hg;ctx.fillRect(mx-70,my-70,140,140);
    }

    // ── Chouette Hedwig ──
    function drawOwl(x,y,phase,dir,op){
     ctx.save();ctx.translate(x,y);
     if(dir<0) ctx.scale(-1,1);
     ctx.globalAlpha=op;
     const flap=Math.sin(phase*4)*0.65;
     // Aile gauche
     ctx.fillStyle='rgba(245,240,232,0.82)';
     ctx.save();ctx.rotate(-0.25+flap*0.8);
     ctx.beginPath();
     ctx.moveTo(-3,0);
     ctx.bezierCurveTo(-18,-8,-26,-4,-24,5);
     ctx.bezierCurveTo(-20,10,-10,8,-3,4);
     ctx.closePath();ctx.fill();
     // Plumes aile gauche
     ctx.strokeStyle='rgba(200,196,188,0.45)';ctx.lineWidth=0.6;
     for(let i=0;i<3;i++){
      ctx.beginPath();ctx.moveTo(-3+i*2,2);ctx.lineTo(-20+i*3,5+i);ctx.stroke();
     }
     ctx.restore();
     // Aile droite
     ctx.save();ctx.rotate(0.25-flap*0.8);
     ctx.beginPath();
     ctx.moveTo(3,0);
     ctx.bezierCurveTo(18,-8,26,-4,24,5);
     ctx.bezierCurveTo(20,10,10,8,3,4);
     ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(200,196,188,0.45)';ctx.lineWidth=0.6;
     for(let i=0;i<3;i++){
      ctx.beginPath();ctx.moveTo(3-i*2,2);ctx.lineTo(20-i*3,5+i);ctx.stroke();
     }
     ctx.restore();
     // Corps
     ctx.fillStyle='rgba(245,242,236,0.92)';
     ctx.beginPath();ctx.ellipse(0,3,5,8,0,0,Math.PI*2);ctx.fill();
     // Taches grises
     ctx.fillStyle='rgba(180,175,165,0.35)';
     ctx.beginPath();ctx.ellipse(-2,4,2,3,0.3,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.ellipse(2,6,1.5,2.5,-0.3,0,Math.PI*2);ctx.fill();
     // Tête
     ctx.fillStyle='rgba(245,242,236,0.95)';
     ctx.beginPath();ctx.ellipse(0,-5,6,6.5,0,0,Math.PI*2);ctx.fill();
     // Oreilles (touffes)
     ctx.fillStyle='rgba(220,215,205,0.90)';
     ctx.beginPath();ctx.moveTo(-4,-9);ctx.lineTo(-6,-14);ctx.lineTo(-2,-10);ctx.closePath();ctx.fill();
     ctx.beginPath();ctx.moveTo(4,-9);ctx.lineTo(6,-14);ctx.lineTo(2,-10);ctx.closePath();ctx.fill();
     // Disque facial (masque)
     ctx.strokeStyle='rgba(180,170,155,0.45)';ctx.lineWidth=1;
     ctx.beginPath();ctx.ellipse(0,-5,4.5,5,0,0,Math.PI*2);ctx.stroke();
     // Yeux
     ctx.fillStyle='rgba(255,215,0,0.95)';
     ctx.beginPath();ctx.arc(-2.2,-5,2.2,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(2.2,-5,2.2,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='rgba(10,5,0,0.95)';
     ctx.beginPath();ctx.arc(-2.2,-5,1.1,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(2.2,-5,1.1,0,Math.PI*2);ctx.fill();
     // Reflet pupille
     ctx.fillStyle='rgba(255,255,255,0.7)';
     ctx.beginPath();ctx.arc(-1.6,-5.5,0.55,0,Math.PI*2);ctx.fill();
     ctx.beginPath();ctx.arc(2.8,-5.5,0.55,0,Math.PI*2);ctx.fill();
     // Bec
     ctx.fillStyle='rgba(200,170,80,0.90)';
     ctx.beginPath();ctx.moveTo(-1,-3);ctx.lineTo(1,-3);ctx.lineTo(0,-1.2);ctx.closePath();ctx.fill();
     // Serre
     ctx.strokeStyle='rgba(180,155,60,0.6)';ctx.lineWidth=0.8;
     ctx.beginPath();ctx.moveTo(-2,10);ctx.lineTo(-4,14);ctx.stroke();
     ctx.beginPath();ctx.moveTo(0,10);ctx.lineTo(0,14);ctx.stroke();
     ctx.beginPath();ctx.moveTo(2,10);ctx.lineTo(4,14);ctx.stroke();
     ctx.restore();
    }

    // ── Lettre de Poudlard ──
    function drawLetter(x,y,phase){
     ctx.save();ctx.translate(x,y);
     ctx.rotate(Math.sin(phase*0.5)*0.18);
     ctx.globalAlpha=0.75;
     // Enveloppe
     ctx.fillStyle='rgba(245,238,215,0.92)';
     ctx.beginPath();ctx.roundRect(-11,-8,22,16,2);ctx.fill();
     ctx.strokeStyle='rgba(180,165,120,0.5)';ctx.lineWidth=0.6;ctx.stroke();
     // Triangle rabat
     ctx.fillStyle='rgba(232,225,198,0.90)';
     ctx.beginPath();ctx.moveTo(-11,-8);ctx.lineTo(11,-8);ctx.lineTo(0,2);ctx.closePath();ctx.fill();
     ctx.strokeStyle='rgba(180,165,120,0.4)';ctx.lineWidth=0.5;ctx.stroke();
     // Cachet de cire rouge
     ctx.fillStyle='rgba(180,30,30,0.88)';
     ctx.beginPath();ctx.arc(0,4,3.5,0,Math.PI*2);ctx.fill();
     // H dans le cachet
     ctx.fillStyle='rgba(255,220,180,0.9)';
     ctx.font='bold 4px serif';ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText('H',0,4);
     // Ailes (lettre ailée !)
     ctx.globalAlpha=0.50;
     const wflap=Math.sin(phase*5)*0.5;
     ctx.fillStyle='rgba(240,230,200,0.7)';
     ctx.save();ctx.rotate(-0.4+wflap);
     ctx.beginPath();ctx.ellipse(-14,0,10,4,-0.2,0,Math.PI*2);ctx.fill();ctx.restore();
     ctx.save();ctx.rotate(0.4-wflap);
     ctx.beginPath();ctx.ellipse(14,0,10,4,0.2,0,Math.PI*2);ctx.fill();ctx.restore();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;
     ctx.fillStyle='rgba(1,0,6,0.14)';ctx.fillRect(0,0,W,H);

     // Ciel dégradé nuit
     const sky=ctx.createLinearGradient(0,0,0,H*0.82);
     sky.addColorStop(0,'rgba(2,0,12,0.10)');
     sky.addColorStop(0.5,'rgba(8,3,30,0.07)');
     sky.addColorStop(1,'rgba(15,8,45,0.05)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.82);

     drawMoon();

     // Étoiles scintillantes
     for(const s of stars){
      s.twinkle+=0.016*s.spd;
      const op=0.3+Math.sin(s.twinkle)*0.35;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,248,230,${op})`;ctx.fill();
     }

     // Quelques étoiles colorées (magie)
     for(let i=0;i<8;i++){
      const sx=W*(0.05+i*0.13),sy=H*(0.05+Math.sin(t*0.3+i)*0.08);
      const op=0.15+Math.sin(t*0.6+i*0.8)*0.12;
      ctx.beginPath();ctx.arc(sx,sy,1,0,Math.PI*2);
      ctx.fillStyle=`hsla(${260+i*15},80%,80%,${op})`;ctx.fill();
     }

     // Particules magiques
     for(const s of sparks){
      s.x+=s.vx;s.y+=s.vy;s.life-=s.decay;
      if(s.life<=0||s.y<H*0.1){
       s.x=Math.random()*W;s.y=H*0.55+Math.random()*H*0.4;
       s.vx=(Math.random()-0.5)*0.8;s.vy=-(Math.random()*1.2+0.3);
       s.hue=Math.random()<0.6?45+Math.random()*20:270+Math.random()*40;
       s.life=0.6+Math.random()*0.4;
      }
      ctx.save();ctx.translate(s.x,s.y);ctx.globalAlpha=s.life*0.7;
      ctx.fillStyle=`hsla(${s.hue},95%,72%,1)`;
      // Étoile à 4 branches
      for(let a=0;a<4;a++){
       ctx.save();ctx.rotate(a*Math.PI/2+t*1.5);
       ctx.fillRect(-0.4,-s.r*2.2,0.8,s.r*2.2);ctx.restore();
      }
      ctx.beginPath();ctx.arc(0,0,s.r*0.5,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     // Lettre volante
     letter.x+=letter.vx;letter.phase+=0.04;
     letter.y=H*0.38+Math.sin(letter.phase*0.8)*18;
     if(letter.x<-40) letter.x=W*1.1;
     if(letter.x<W+30) drawLetter(letter.x,letter.y,letter.phase);

     // Balai volant — passe devant le ciel, derrière le château
     broom.phase+=0.032;
     broom.x+=broom.vx;
     broom.y=H*0.50+Math.sin(broom.phase*0.65)*H*0.042;
     if(broom.x<-W*0.15){
      broom.x=W*1.15;
      broom.y=H*(0.46+Math.random()*0.08);
     }
     /* traînée magique */
     broom.trail.unshift({x:broom.x,y:broom.y,op:0.22});
     broom.trail.pop();
     for(let i=0;i<broom.trail.length;i++){
      const tr=broom.trail[i];
      tr.op*=0.84;
      if(tr.op>0.008){
       ctx.beginPath();ctx.arc(tr.x,tr.y,W*0.003*(1-i/broom.trail.length),0,Math.PI*2);
       ctx.fillStyle=`rgba(180,140,255,${tr.op})`;ctx.fill();
      }
     }
     drawBroom(broom.x,broom.y,broom.phase);

     // Château Poudlard
     drawCastle();
     drawLake();

     // Chouette Hedwig
     owl.phase+=0.04;
     if(!owlPause){
      owl.x+=owl.vx*owl.dir;
      if(owl.x>W+60){owl.x=W+60;owl.dir=-1;}
      if(owl.x<-60){owl.x=-60;owl.dir=1;}
      // Pause aléatoire
      if(Math.random()<0.003){owlPause=true;owlPauseTimer=Math.random()*80+40;}
     } else {
      owlPauseTimer--;
      if(owlPauseTimer<=0) owlPause=false;
     }
     const owlY=H*0.18+Math.sin(owl.phase*0.7)*14;
     const owlOp=0.82+Math.sin(owl.phase*0.5)*0.08;
     drawOwl(owl.x,owlY,owl.phase,owl.dir,owlOp);

     // Vignette
     const vg=ctx.createRadialGradient(cx,cy,H*0.08,cx,cy,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(2,0,10,0.72)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
