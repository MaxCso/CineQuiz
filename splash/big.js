// CinéQuiz splash chunk — Big
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Big"]={
   name:'Big',
   color:'40,120,200',
   ref:'Big \u2014 Penny Marshall, 1988',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_big_s');
    if(!_s){_s=document.createElement('style');_s.id='_big_s';document.head.appendChild(_s);}
    _s.textContent='';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Position citation + logo — haut de l'ecran */
    let _bpos=document.getElementById('_big_pos');
    if(!_bpos){_bpos=document.createElement('style');_bpos.id='_big_pos';document.head.appendChild(_bpos);}
    _bpos.textContent='#splash-content-wrap{top:24%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _bposW=setInterval(()=>{if(stop.v){_bpos.textContent='';clearInterval(_bposW);}},200);

    /* Piano au sol */
    const pianoKeys=Array.from({length:14},(_,i)=>({i,pressed:false,pressT:0}));
    let pressTimer=0;

    /* Confettis — grands, colorés, nombreux */
    const CONF_COLS=['255,60,100','255,200,0','30,200,255','100,255,120','220,60,255','255,140,0','0,230,180'];
    const confetti=Array.from({length:55},()=>({
     x:Math.random()*W,
     y:Math.random()*H,
     vy:0.55+Math.random()*0.70,
     vx:(Math.random()-0.5)*0.55,
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.055,
     w:W*(0.014+Math.random()*0.010),
     h:H*(0.007+Math.random()*0.005),
     col:CONF_COLS[Math.floor(Math.random()*CONF_COLS.length)],
     shape:Math.random()<0.35?'circle':'rect', /* mix formes */
    }));

    /* Notes de musique qui montent */
    const notes=Array.from({length:12},(_,i)=>({
     x:W*(0.08+i*0.08),
     y:H*(0.55+Math.random()*0.20),
     vy:-(0.45+Math.random()*0.55),
     op:0.70+Math.random()*0.30,
     ph:Math.random()*Math.PI*2,
     size:W*(0.018+Math.random()*0.014),
     col:CONF_COLS[i%CONF_COLS.length],
    }));

    /* Lumieres de fete foraine — rangee en haut */
    const fairLights=Array.from({length:16},(_,i)=>({
     x:W*(0.03+i*(0.94/15)),
     y:H*0.03,
     ph:i*0.4,
     col:CONF_COLS[i%CONF_COLS.length],
    }));

    function drawBackground(){
     /* Fond violet chaud — ambiance salle de jeux / FAO Schwarz */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,`hsl(${268+Math.sin(t*0.12)*6},${58+Math.sin(t*0.09)*5}%,${22+Math.sin(t*0.10)*3}%)`);
     bg.addColorStop(0.35,`hsl(272,54%,${18+Math.sin(t*0.08)*2}%)`);
     bg.addColorStop(0.65,`hsl(260,48%,${14+Math.sin(t*0.07)*2}%)`);
     bg.addColorStop(1,'hsl(255,42%,10%)');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Halo central lumineux — jaune/orange chaud */
     const centG=ctx.createRadialGradient(cx,H*0.50,0,cx,H*0.50,W*0.70);
     centG.addColorStop(0,`rgba(255,220,80,${0.18+Math.sin(t*0.6)*0.06})`);
     centG.addColorStop(0.30,`rgba(255,140,40,${0.10+Math.sin(t*0.5)*0.04})`);
     centG.addColorStop(0.60,'rgba(200,80,255,0.06)');
     centG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=centG;ctx.fillRect(0,0,W,H);

     /* Halo rose a gauche */
     const pinkG=ctx.createRadialGradient(W*0.10,H*0.45,0,W*0.10,H*0.45,W*0.45);
     pinkG.addColorStop(0,`rgba(255,60,120,${0.12+Math.sin(t*0.7)*0.04})`);
     pinkG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=pinkG;ctx.fillRect(0,0,W,H);

     /* Halo cyan a droite */
     const cyanG=ctx.createRadialGradient(W*0.90,H*0.42,0,W*0.90,H*0.42,W*0.40);
     cyanG.addColorStop(0,`rgba(30,200,255,${0.10+Math.sin(t*0.8)*0.04})`);
     cyanG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=cyanG;ctx.fillRect(0,0,W,H);
    }

    function drawFairLights(){
     /* Guirlande d'ampoules en haut */
     /* Fil */
     ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=1.2;
     ctx.beginPath();ctx.moveTo(0,H*0.03);ctx.lineTo(W,H*0.03);ctx.stroke();
     for(const fl of fairLights){
      fl.ph+=0.04;
      const pulse=0.65+0.35*Math.sin(fl.ph);
      const r=W*0.018;
      /* Halo */
      const fg=ctx.createRadialGradient(fl.x,fl.y,0,fl.x,fl.y,r*3.5);
      fg.addColorStop(0,`rgba(${fl.col},${0.55*pulse})`);
      fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg;ctx.fillRect(fl.x-r*4,fl.y-r*4,r*8,r*8);
      /* Ampoule */
      ctx.fillStyle=`rgba(${fl.col},${0.80*pulse})`;
      ctx.beginPath();ctx.arc(fl.x,fl.y,r,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,255,255,${0.55*pulse})`;
      ctx.beginPath();ctx.arc(fl.x-r*0.28,fl.y-r*0.28,r*0.35,0,Math.PI*2);ctx.fill();
     }
    }

    function drawNotes(){
     for(const n of notes){
      n.y+=n.vy;n.ph+=0.06;
      if(n.y<-H*0.08){
       n.y=H*(0.68+Math.random()*0.08);
       n.x=W*(0.05+Math.random()*0.90);
       n.op=0.65+Math.random()*0.35;
      }
      const pulse=0.75+0.25*Math.sin(n.ph);
      const alpha=n.op*pulse*Math.min(1,(H*0.72-n.y)/(H*0.15));
      /* Dessin d'une note musicale simplifiee */
      ctx.fillStyle=`rgba(${n.col},${alpha})`;
      ctx.beginPath();ctx.ellipse(n.x,n.y,n.size*0.90,n.size*0.65,Math.PI*0.25,0,Math.PI*2);ctx.fill();
      ctx.fillRect(n.x+n.size*0.55,n.y-n.size*2.2,n.size*0.22,n.size*2.2);
      /* Crochet */
      ctx.strokeStyle=`rgba(${n.col},${alpha})`;ctx.lineWidth=n.size*0.22;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(n.x+n.size*0.77,n.y-n.size*2.2);
      ctx.bezierCurveTo(n.x+n.size*1.4,n.y-n.size*1.8,n.x+n.size*1.2,n.y-n.size*1.1,n.x+n.size*0.77,n.y-n.size*1.0);
      ctx.stroke();
     }
    }

    function drawConfetti(){
     for(const c of confetti){
      c.y+=c.vy;c.x+=c.vx;c.rot+=c.rotSpd;
      if(c.y>H+20){c.y=-20;c.x=Math.random()*W;}
      ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);
      ctx.fillStyle=`rgba(${c.col},0.88)`;
      if(c.shape==='circle'){
       ctx.beginPath();ctx.arc(0,0,c.w*0.55,0,Math.PI*2);ctx.fill();
      } else {
       ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);
      }
      ctx.restore();
     }
    }

    function drawPiano(){
     const pianoY=H*0.72,keyW=W*0.062,keyH=H*0.13;
     pressTimer++;
     if(pressTimer%16===0){
      const ki=Math.floor(Math.random()*pianoKeys.length);
      pianoKeys[ki].pressed=true;pianoKeys[ki].pressT=1.0;
     }

     /* Brillance sur le piano */
     const pianoShine=ctx.createLinearGradient(0,pianoY-H*0.02,0,pianoY+keyH);
     pianoShine.addColorStop(0,`rgba(255,220,100,${0.18+Math.sin(t*1.2)*0.06})`);
     pianoShine.addColorStop(0.3,'rgba(255,180,60,0.08)');
     pianoShine.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=pianoShine;ctx.fillRect(0,pianoY-H*0.02,W,keyH+H*0.04);

     for(let ki=0;ki<pianoKeys.length;ki++){
      const pk=pianoKeys[ki];
      if(pk.pressed){pk.pressT-=0.028;if(pk.pressT<=0){pk.pressed=false;pk.pressT=0;}}
      const kx=W*0.04+ki*keyW;
      const isBlack=([1,3,6,8,10].includes(ki%12));

      if(!isBlack){
       /* Touche blanche — ivoire chaud */
       const keyCol=pk.pressed
        ?`rgba(255,${200+pk.pressT*40|0},${80+pk.pressT*120|0},0.95)`
        :'rgba(252,248,235,0.96)';
       ctx.fillStyle=keyCol;
       ctx.beginPath();ctx.roundRect(kx,pianoY,keyW-1.5,keyH,W*0.005);ctx.fill();
       /* Bord bas */
       ctx.fillStyle='rgba(180,165,130,0.50)';
       ctx.fillRect(kx,pianoY+keyH-H*0.008,keyW-1.5,H*0.008);
       /* Separation */
       ctx.strokeStyle='rgba(120,105,80,0.35)';ctx.lineWidth=0.8;
       ctx.beginPath();ctx.moveTo(kx,pianoY);ctx.lineTo(kx,pianoY+keyH);ctx.stroke();
       /* Note jouee — halo lumineux */
       if(pk.pressed){
        const noteG=ctx.createRadialGradient(kx+keyW/2,pianoY,0,kx+keyW/2,pianoY-H*0.07,W*0.07);
        noteG.addColorStop(0,`rgba(255,200,60,${0.65*pk.pressT})`);
        noteG.addColorStop(0.5,`rgba(255,120,20,${0.30*pk.pressT})`);
        noteG.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=noteG;ctx.fillRect(kx-W*0.02,pianoY-H*0.14,keyW+W*0.04,H*0.16);
       }
      } else {
       /* Touche noire — brillance subtile */
       ctx.fillStyle=pk.pressed
        ?`rgba(60,40,80,0.97)`
        :'rgba(18,12,8,0.97)';
       ctx.beginPath();ctx.roundRect(kx+keyW*0.30,pianoY,keyW*0.42,keyH*0.60,W*0.004);ctx.fill();
       /* Reflet haut de la touche noire */
       ctx.fillStyle='rgba(255,255,255,0.08)';
       ctx.beginPath();ctx.roundRect(kx+keyW*0.32,pianoY+H*0.004,keyW*0.18,keyH*0.22,W*0.002);ctx.fill();
      }
     }

     /* Silhouettes Josh et adulte sautant */
     const b1X=W*0.28,b2X=W*0.62;
     ctx.fillStyle='rgba(8,4,18,0.95)';
     for(const [bx,sc] of [[b1X,0.82],[b2X,1.05]]){
      const bob=Math.abs(Math.sin(t*1.8+(bx/W)*2))*H*0.022;
      /* Tete */
      ctx.beginPath();ctx.arc(bx,pianoY-H*0.120*sc-bob,W*0.020*sc,0,Math.PI*2);ctx.fill();
      /* Corps */
      ctx.beginPath();ctx.ellipse(bx,pianoY-H*0.055*sc-bob,W*0.022*sc,H*0.048*sc,0,0,Math.PI*2);ctx.fill();
      /* Bras leves */
      ctx.strokeStyle='rgba(8,4,18,0.95)';ctx.lineWidth=W*0.011*sc;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(bx-W*0.022*sc,pianoY-H*0.075*sc-bob);
      ctx.lineTo(bx-W*0.045*sc,pianoY-H*0.130*sc-bob);ctx.stroke();
      ctx.beginPath();ctx.moveTo(bx+W*0.022*sc,pianoY-H*0.075*sc-bob);
      ctx.lineTo(bx+W*0.045*sc,pianoY-H*0.128*sc-bob);ctx.stroke();
      /* Jambes */
      ctx.beginPath();ctx.moveTo(bx-W*0.012*sc,pianoY-H*0.018*sc-bob);
      ctx.lineTo(bx-W*0.028*sc,pianoY-bob+H*0.014);ctx.stroke();
      ctx.beginPath();ctx.moveTo(bx+W*0.012*sc,pianoY-H*0.018*sc-bob);
      ctx.lineTo(bx+W*0.028*sc,pianoY-bob+H*0.014);ctx.stroke();
     }
    }

    function frame(){
     if(stop.v)return;

     drawBackground();
     drawFairLights();
     drawNotes();
     drawConfetti();
     drawPiano();

     /* Vignette tres legere — juste les angles */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.20,cx,H*0.50,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.70,'rgba(0,0,0,0.04)');
     vg.addColorStop(1,'rgba(0,0,0,0.45)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }

  };
})();
