// CinéQuiz splash chunk — Snatch
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Snatch"]={
   name:'Snatch',
   color:'80,60,40',
   ref:'Snatch \u2014 Guy Ritchie, 2000',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── CSS ── */
    let _sn=document.getElementById('_sn_s');
    if(!_sn){_sn=document.createElement('style');_sn.id='_sn_s';document.head.appendChild(_sn);}
    _sn.textContent=`

     #splash-content-wrap{top:25%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{
       color:rgba(235,225,210,0.92)!important;
       text-shadow:0 2px 18px rgba(0,0,0,1),0 0 30px rgba(180,140,255,0.25)!important;
     }
     #splash-film-logo{
       filter:drop-shadow(0 4px 24px rgba(0,0,0,0.98)) drop-shadow(0 0 12px rgba(160,120,255,0.30))!important;
     }
    `;
    const _snW=setInterval(()=>{if(stop.v){_sn.textContent='';clearInterval(_snW);}},200);

    /* ── Diamant — position plus basse et plus grand ── */
    const diamond={
     x:cx, y:H*0.68,
     size:W*0.115,
     rot:0, rotSpd:0.007, pulse:0,
    };

    /* ── Éclats prismatiques ── */
    const sparkles=Array.from({length:22},(_,i)=>({
     angle:(i/22)*Math.PI*2,
     dist:0,
     maxDist:W*(0.12+Math.random()*0.22),
     speed:0.010+Math.random()*0.015,
     size:W*(0.004+Math.random()*0.006),
     color:[
      'rgba(200,180,255,A)','rgba(255,240,180,A)',
      'rgba(180,220,255,A)','rgba(255,200,220,A)',
      'rgba(180,255,210,A)','rgba(255,180,100,A)',
     ][Math.floor(Math.random()*6)],
     ph:Math.random()*Math.PI*2,
     active:Math.random()<0.55,
    }));

    /* ── Cartes à jouer — vitesses et trajectoires variées ── */
    const suits=['♠','♥','♦','♣'];
    const cards=Array.from({length:16},(_,i)=>({
     x:Math.random()*W, y:-W*0.10-Math.random()*H*1.2,
     vx:(Math.random()-0.5)*0.85,
     vy:0.45+Math.random()*1.40,
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.040,
     w:W*0.068, h:W*0.095,
     suit:suits[Math.floor(Math.random()*4)],
     value:['A','K','Q','J','10','9','7'][Math.floor(Math.random()*7)],
     op:0.70+Math.random()*0.25,
     wobble:Math.random()*Math.PI*2,
     wobbleSpd:0.018+Math.random()*0.015,
    }));

    /* ── Billets £ ── */
    const bills=Array.from({length:10},()=>({
     x:Math.random()*W, y:-W*0.06-Math.random()*H*0.8,
     vx:(Math.random()-0.5)*0.55,
     vy:0.40+Math.random()*0.65,
     rot:Math.random()*Math.PI*2,
     rotSpd:(Math.random()-0.5)*0.025,
     w:W*0.092, h:W*0.042,
     shimmer:Math.random()*Math.PI*2,
     op:0.48+Math.random()*0.32,
    }));

    /* ── Poussière ── */
    const dust=Array.from({length:45},()=>({
     x:Math.random()*W,
     y:H*0.55+Math.random()*H*0.45,
     vx:(Math.random()-0.5)*0.18,
     vy:-(0.04+Math.random()*0.10),
     r:Math.random()*2.8+0.8,
     op:0.03+Math.random()*0.08,
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Silhouettes — gangsters londoniens ── */
    const figures=[
     {x:W*0.08, sc:0.88, lean:-0.04, gun:false, sway:0, swayPh:Math.random()*Math.PI*2},
     {x:W*0.24, sc:1.02, lean: 0.03, gun:true,  sway:0, swayPh:Math.random()*Math.PI*2},
     {x:W*0.76, sc:0.98, lean:-0.03, gun:true,  sway:0, swayPh:Math.random()*Math.PI*2},
     {x:W*0.92, sc:0.84, lean: 0.05, gun:false, sway:0, swayPh:Math.random()*Math.PI*2},
    ];

    /* ── Mur de briques ── */
    function drawBrickWall(){
     /* Fond béton brique — plus contrasté */
     const wallG=ctx.createLinearGradient(0,0,0,H*0.82);
     wallG.addColorStop(0,'rgba(14,9,16,1)');
     wallG.addColorStop(0.40,'rgba(20,12,18,1)');
     wallG.addColorStop(0.75,'rgba(24,14,20,1)');
     wallG.addColorStop(1,'rgba(28,16,22,1)');
     ctx.fillStyle=wallG;ctx.fillRect(0,0,W,H*0.82);

     /* Briques — plus visibles */
     const bH=H*0.036, bW=W*0.145, mortar=1.5;
     const nRows=Math.ceil(H*0.82/bH);
     for(let row=0;row<nRows;row++){
      const y=row*bH;
      const off=(row%2)*bW*0.5;
      const nCols=Math.ceil(W/bW)+2;
      for(let col=0;col<nCols;col++){
       const x=col*bW+off-bW;
       /* Variation couleur brique — visible mais subtile */
       const v=Math.sin(col*3.7+row*5.1)*6+Math.cos(col*1.3+row*2.9)*4;
       const r=26+v, g=14+v*0.4, b=20+v*0.6;
       ctx.fillStyle=`rgba(${r|0},${g|0},${b|0},0.95)`;
       ctx.fillRect(x+mortar,y+mortar,bW-mortar*2,bH-mortar*2);
      }
      /* Joints horizontaux */
      ctx.strokeStyle='rgba(4,2,5,0.85)';ctx.lineWidth=mortar;
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();
      /* Joints verticaux */
      for(let col=0;col<Math.ceil(W/bW)+2;col++){
       const x=col*bW+off-bW;
       ctx.strokeStyle='rgba(4,2,5,0.80)';ctx.lineWidth=mortar;
       ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+bH);ctx.stroke();
      }
     }

     /* Traces d'humidité */
     for(let i=0;i<10;i++){
      const sx=Math.random()*W, sy=Math.random()*H*0.75;
      const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,W*0.07);
      sg.addColorStop(0,'rgba(0,0,0,0.28)');
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;ctx.fillRect(sx-W*0.07,sy-W*0.07,W*0.14,W*0.14);
     }

     /* Tags graffiti très discrets */
     ctx.save();
     const tags=[{x:W*0.08,y:H*0.28,txt:'PIKEY',a:0.06,sz:W*0.042,angle:-0.12},
                 {x:W*0.72,y:H*0.52,txt:'BRICK TOP',a:0.04,sz:W*0.030,angle:0.08},
                 {x:W*0.18,y:H*0.65,txt:'LONDON',a:0.05,sz:W*0.035,angle:-0.06}];
     for(const tg of tags){
      ctx.globalAlpha=tg.a;ctx.save();ctx.translate(tg.x,tg.y);ctx.rotate(tg.angle);
      ctx.font=`bold ${tg.sz}px sans-serif`;ctx.fillStyle='rgba(140,80,160,1)';
      ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(tg.txt,0,0);
      ctx.restore();
     }
     ctx.restore();

     /* Sol béton */
     const floorG=ctx.createLinearGradient(0,H*0.82,0,H);
     floorG.addColorStop(0,'rgba(20,12,18,1)');
     floorG.addColorStop(0.5,'rgba(12,7,12,1)');
     floorG.addColorStop(1,'rgba(5,3,6,1)');
     ctx.fillStyle=floorG;ctx.fillRect(0,H*0.82,W,H*0.18);
     ctx.strokeStyle='rgba(3,1,4,0.90)';ctx.lineWidth=2;
     ctx.beginPath();ctx.moveTo(0,H*0.82);ctx.lineTo(W,H*0.82);ctx.stroke();
    }

    /* ── Faisceau spot sur le diamant ── */
    function drawSpot(){
     const spotX=cx+Math.sin(t*0.06)*W*0.015;
     /* Cône depuis le haut */
     const coneG=ctx.createLinearGradient(spotX,0,spotX,H*0.82);
     coneG.addColorStop(0,`rgba(160,120,255,${0.10+Math.sin(t*0.12)*0.02})`);
     coneG.addColorStop(0.45,`rgba(110,80,200,${0.06})`);
     coneG.addColorStop(0.75,'rgba(70,40,140,0.03)');
     coneG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=coneG;
     ctx.beginPath();
     ctx.moveTo(spotX-W*0.04,0);ctx.lineTo(spotX+W*0.04,0);
     ctx.lineTo(spotX+W*0.32,H*0.82);ctx.lineTo(spotX-W*0.32,H*0.82);
     ctx.closePath();ctx.fill();
     /* Halo sur le diamant */
     const hG=ctx.createRadialGradient(cx,H*0.68,0,cx,H*0.68,W*0.55);
     hG.addColorStop(0,`rgba(100,75,200,${0.32+Math.sin(t*0.10)*0.06})`);
     hG.addColorStop(0.30,`rgba(65,45,150,0.14)`);
     hG.addColorStop(0.65,'rgba(35,20,80,0.04)');
     hG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=hG;ctx.fillRect(0,0,W,H);
     /* Reflet au sol sous le diamant */
     const floorRef=ctx.createRadialGradient(cx,H*0.83,0,cx,H*0.83,W*0.28);
     floorRef.addColorStop(0,`rgba(130,100,230,${0.18+Math.sin(t*0.14)*0.04})`);
     floorRef.addColorStop(0.45,'rgba(80,55,160,0.06)');
     floorRef.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=floorRef;ctx.fillRect(0,H*0.78,W,H*0.22);
    }

    /* ── Diamant — taille brillant rond (57 facettes) ── */
    function drawDiamond(){
     const {x,y,size,rot}=diamond;
     diamond.rot+=diamond.rotSpd;
     diamond.pulse+=0.030;
     const p=diamond.pulse;
     /* Rayon de la table (la face plate du haut) */
     const R=size*1.80; /* rayon total (cinture) */
     const nFacets=16;  /* nombre de facettes couronne + culasse */

     ctx.save();ctx.translate(x,y);ctx.rotate(rot);

     /* ── Halo lumineux autour du diamant ── */
     const haloG=ctx.createRadialGradient(0,0,R*0.5,0,0,R*3.0);
     haloG.addColorStop(0,`rgba(220,240,255,${0.22+Math.sin(p*0.8)*0.05})`);
     haloG.addColorStop(0.3,`rgba(180,210,255,${0.10+Math.sin(p*0.6)*0.03})`);
     haloG.addColorStop(0.6,'rgba(140,180,255,0.04)');
     haloG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=haloG;ctx.beginPath();ctx.arc(0,0,R*3.0,0,Math.PI*2);ctx.fill();

     /* ── Fonctions utilitaires ── */
     function polyPath(pts){ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.closePath();}
     function fillFacet(pts,c1,c2,ang){
      let mnx=pts[0][0],mxx=pts[0][0],mny=pts[0][1],mxy=pts[0][1];
      for(const[px,py]of pts){mnx=Math.min(mnx,px);mxx=Math.max(mxx,px);mny=Math.min(mny,py);mxy=Math.max(mxy,py);}
      const g=ctx.createLinearGradient(mnx,mny,mnx+(mxx-mnx)*Math.cos(ang),mny+(mxy-mny)*Math.sin(ang));
      g.addColorStop(0,c1);g.addColorStop(1,c2);
      ctx.fillStyle=g;polyPath(pts);ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=0.5;ctx.stroke();
     }

     /* Cinture (girdle) — cercle de 32 points */
     const GN=32;
     const gPts=Array.from({length:GN},(_,i)=>{
      const a=i/GN*Math.PI*2;
      return[Math.cos(a)*R,Math.sin(a)*R*0.18]; /* aplati horizontalement */
     });
     /* Table — 8 sommets */
     const TN=8,TR=R*0.55;
     const tPts=Array.from({length:TN},(_,i)=>{
      const a=i/TN*Math.PI*2-Math.PI/8;
      return[Math.cos(a)*TR,Math.sin(a)*TR*0.25-R*0.32]; /* au-dessus de la cinture */
     });
     /* Culasse (culet) */
     const culetY=R*0.60;

     /* ── CULASSE — facettes du dessous ── */
     /* Dégradé bleu profond → blanc → irisé comme une vraie taille brillant */
     const PAVE_COLS=[
      [`rgba(220,235,255,0.94)`,`rgba(80,120,220,0.88)`],  /* blanc → bleu */
      [`rgba(200,230,255,0.90)`,`rgba(50,90,200,0.92)`],
      [`rgba(255,255,255,0.96)`,`rgba(100,150,230,0.85)`],
      [`rgba(230,245,255,0.92)`,`rgba(60,100,210,0.90)`],
      /* reflets arc-en-ciel */
      [`rgba(${200+30*Math.sin(p)|0},${220+20*Math.sin(p+1)|0},255,0.88)`,`rgba(${80+40*Math.sin(p+2)|0},${100+30*Math.cos(p)|0},${200+30*Math.sin(p)|0},0.92)`],
      [`rgba(255,${230+20*Math.sin(p+2)|0},${200+30*Math.cos(p)|0},0.85)`,`rgba(${80+40*Math.cos(p+1)|0},80,${180+40*Math.sin(p+3)|0},0.90)`],
      [`rgba(${210+30*Math.cos(p)|0},255,${220+20*Math.sin(p)|0},0.82)`,`rgba(40,${100+30*Math.sin(p+4)|0},${190+30*Math.cos(p+2)|0},0.88)`],
      [`rgba(255,255,${230+20*Math.sin(p+3)|0},0.90)`,`rgba(${90+30*Math.sin(p+5)|0},${80+20*Math.cos(p)|0},${210+30*Math.sin(p+1)|0},0.86)`],
     ];
     for(let i=0;i<GN;i++){
      const g0=gPts[i],g1=gPts[(i+1)%GN];
      const ci=i%PAVE_COLS.length;
      const mid=[(g0[0]+g1[0])*0.5,(g0[1]+g1[1])*0.5];
      fillFacet([g0,g1,[culetY*0.12,culetY]],PAVE_COLS[ci][0],PAVE_COLS[ci][1],Math.PI*0.5+i/GN*Math.PI*2);
     }

     /* ── COURONNE — facettes du dessus ── */
     const CROWN_COLS=[
      [`rgba(255,255,255,0.97)`,`rgba(180,210,250,0.75)`],  /* blanc brillant */
      [`rgba(240,248,255,0.94)`,`rgba(140,185,240,0.80)`],
      [`rgba(255,252,240,0.90)`,`rgba(200,220,255,0.78)`],  /* légèrement doré */
      [`rgba(255,255,255,0.96)`,`rgba(160,200,245,0.72)`],
      [`rgba(${245+10*Math.sin(p)|0},255,255,0.92)`,`rgba(${130+30*Math.cos(p)|0},${170+20*Math.sin(p)|0},240,0.76)`],
      [`rgba(255,${248+7*Math.cos(p)|0},${230+20*Math.sin(p+2)|0},0.88)`,`rgba(170,${195+15*Math.sin(p+1)|0},245,0.70)`],
      [`rgba(255,255,255,0.95)`,`rgba(${150+20*Math.sin(p+3)|0},${190+15*Math.cos(p)|0},248,0.74)`],
      [`rgba(${250+5*Math.cos(p)|0},255,255,0.93)`,`rgba(155,${192+12*Math.sin(p+4)|0},${242+8*Math.cos(p)|0},0.73)`],
     ];
     for(let i=0;i<TN;i++){
      const t0=tPts[i],t1=tPts[(i+1)%TN];
      /* Facettes principales (table → cinture) */
      const g0=gPts[Math.round(i/TN*GN)%GN];
      const g1=gPts[Math.round((i+1)/TN*GN)%GN];
      const ci=i%CROWN_COLS.length;
      fillFacet([t0,t1,g1,g0],CROWN_COLS[ci][0],CROWN_COLS[ci][1],-Math.PI*0.3+i/TN*Math.PI);
      /* Sous-facettes (étoile) */
      const midG=[(g0[0]+g1[0])*0.5,(g0[1]+g1[1])*0.5];
      const midT=[(t0[0]+t1[0])*0.5,(t0[1]+t1[1])*0.5];
      const bri=0.82+Math.sin(p*1.5+i*0.8)*0.12;
      ctx.fillStyle=`rgba(255,255,255,${bri*0.35})`;
      polyPath([midT,g0,midG]);ctx.fill();
     }

     /* ── TABLE (face supérieure plate) ── */
     const tableG=ctx.createRadialGradient(-TR*0.15,-R*0.38,TR*0.05,0,-R*0.32,TR);
     tableG.addColorStop(0,`rgba(255,255,255,${0.88+Math.sin(p*1.4)*0.08})`);
     tableG.addColorStop(0.25,`rgba(235,245,255,${0.72+Math.sin(p*1.2)*0.06})`);
     tableG.addColorStop(0.55,`rgba(200,225,255,${0.45+Math.sin(p)*0.05})`);
     tableG.addColorStop(1,`rgba(170,205,245,${0.22+Math.sin(p*0.8)*0.04})`);
     ctx.fillStyle=tableG;
     polyPath(tPts);ctx.fill();
     ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=0.7;ctx.stroke();

     /* ── Rayons de la table (étoile interne) ── */
     ctx.strokeStyle=`rgba(255,255,255,${0.22+Math.sin(p*1.8)*0.08})`;ctx.lineWidth=0.5;
     for(let i=0;i<TN;i++){
      ctx.beginPath();ctx.moveTo(0,-R*0.32);ctx.lineTo(tPts[i][0],tPts[i][1]);ctx.stroke();
     }

     /* ── Reflet spéculaire principal (zone brillante à gauche-haut) ── */
     const specG=ctx.createRadialGradient(-TR*0.35,-R*0.42,0,-TR*0.20,-R*0.35,TR*0.55);
     specG.addColorStop(0,`rgba(255,255,255,${0.85+Math.sin(p*1.6)*0.10})`);
     specG.addColorStop(0.25,`rgba(240,248,255,${0.45+Math.sin(p*1.3)*0.06})`);
     specG.addColorStop(0.55,'rgba(220,235,255,0.15)');
     specG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=specG;ctx.beginPath();ctx.arc(-TR*0.20,-R*0.35,TR*0.55,0,Math.PI*2);ctx.fill();

     /* ── Reflet secondaire droite ── */
     const spec2G=ctx.createRadialGradient(TR*0.40,-R*0.28,0,TR*0.35,-R*0.22,TR*0.35);
     spec2G.addColorStop(0,`rgba(255,255,255,${0.65+Math.sin(p*2.1)*0.12})`);
     spec2G.addColorStop(0.4,'rgba(220,240,255,0.18)');
     spec2G.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=spec2G;ctx.beginPath();ctx.arc(TR*0.35,-R*0.22,TR*0.35,0,Math.PI*2);ctx.fill();

     /* ── Étoile scintillante (lens flare) ── */
     const flareX=-TR*0.12,flareY=-R*0.50;
     const flareBri=0.75+Math.sin(p*2.5)*0.22;
     const flareG=ctx.createRadialGradient(flareX,flareY,0,flareX,flareY,R*0.18);
     flareG.addColorStop(0,`rgba(255,255,255,${flareBri})`);
     flareG.addColorStop(0.3,'rgba(220,240,255,0.20)');
     flareG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=flareG;ctx.beginPath();ctx.arc(flareX,flareY,R*0.18,0,Math.PI*2);ctx.fill();
     /* Rayons de l'étoile */
     ctx.strokeStyle=`rgba(255,255,255,${flareBri*0.65})`;ctx.lineWidth=0.8;
     for(let i=0;i<8;i++){
      const a=i*Math.PI/4;
      const rLen=R*(0.28+0.08*Math.sin(p*2+i));
      ctx.beginPath();ctx.moveTo(flareX,flareY);ctx.lineTo(flareX+Math.cos(a)*rLen,flareY+Math.sin(a)*rLen);ctx.stroke();
     }
     /* Diagonales courtes */
     ctx.strokeStyle=`rgba(255,255,255,${flareBri*0.35})`;ctx.lineWidth=0.5;
     for(let i=0;i<4;i++){
      const a=i*Math.PI/2+Math.PI/4;
      const rLen=R*0.15;
      ctx.beginPath();ctx.moveTo(flareX,flareY);ctx.lineTo(flareX+Math.cos(a)*rLen,flareY+Math.sin(a)*rLen);ctx.stroke();
     }

     ctx.restore();

     /* Éclats prismatiques autour */
     for(const sp of sparkles){
      if(!sp.active)continue;
      sp.dist+=sp.speed*W*0.75;sp.ph+=0.05;
      if(sp.dist>sp.maxDist){sp.dist=0;sp.active=Math.random()<0.60;}
      const fade=Math.pow(1-sp.dist/sp.maxDist,1.6);
      const sx2=x+Math.cos(sp.angle+diamond.rot*1.8)*sp.dist;
      const sy2=y+Math.sin(sp.angle+diamond.rot*1.8)*sp.dist;
      const col=sp.color.replace('A',(fade*0.88).toFixed(2));
      ctx.fillStyle=col;ctx.beginPath();ctx.arc(sx2,sy2,sp.size*(0.5+0.5*fade),0,Math.PI*2);ctx.fill();
      if(fade>0.35){
       ctx.strokeStyle=col;ctx.lineWidth=0.6;
       const cLen=sp.size*(2.0+fade*1.4);
       for(let ai=0;ai<4;ai++){const ang=ai*Math.PI/2;ctx.beginPath();ctx.moveTo(sx2,sy2);ctx.lineTo(sx2+Math.cos(ang)*cLen,sy2+Math.sin(ang)*cLen);ctx.stroke();}
      }
     }
    }

    /* ── Carte ── */
    function drawCard(c){
     const isRed=c.suit==='♥'||c.suit==='♦';
     ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);
     ctx.fillStyle=`rgba(248,244,238,${c.op})`;
     ctx.beginPath();ctx.roundRect(-c.w/2,-c.h/2,c.w,c.h,W*0.006);ctx.fill();
     ctx.strokeStyle=`rgba(180,170,160,${c.op*0.45})`;ctx.lineWidth=0.6;ctx.stroke();
     ctx.fillStyle=isRed?`rgba(185,18,18,${c.op})`:`rgba(12,10,16,${c.op})`;
     ctx.font=`bold ${W*0.022}px serif`;ctx.textAlign='left';ctx.textBaseline='top';
     ctx.fillText(c.value,-c.w*0.40,-c.h*0.42);
     ctx.font=`${W*0.018}px serif`;ctx.fillText(c.suit,-c.w*0.38,-c.h*0.22);
     ctx.font=`bold ${W*0.038}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText(c.suit,0,0);
     ctx.restore();
    }

    /* ── Billet ── */
    function drawBill(b){
     b.shimmer+=0.038;
     ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.rot);
     ctx.fillStyle=`rgba(48,82,50,${b.op})`;
     ctx.beginPath();ctx.roundRect(-b.w/2,-b.h/2,b.w,b.h,W*0.004);ctx.fill();
     ctx.strokeStyle=`rgba(65,98,67,${b.op*0.55})`;ctx.lineWidth=0.7;
     ctx.strokeRect(-b.w/2+W*0.003,-b.h/2+W*0.002,b.w-W*0.006,b.h-W*0.004);
     ctx.fillStyle=`rgba(182,208,182,${b.op*0.78})`;
     ctx.font=`bold ${W*0.028}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText('£',0,0);
     ctx.strokeStyle=`rgba(88,118,90,${b.op*0.38})`;ctx.lineWidth=0.5;
     ctx.beginPath();ctx.arc(-b.w*0.30,0,b.h*0.30,0,Math.PI*2);ctx.stroke();
     ctx.beginPath();ctx.arc(b.w*0.30,0,b.h*0.30,0,Math.PI*2);ctx.stroke();
     const sp2=0.3+0.7*Math.abs(Math.sin(b.shimmer));
     const shG=ctx.createLinearGradient(-b.w/2,0,b.w/2,0);
     shG.addColorStop(0,'rgba(255,255,255,0)');
     shG.addColorStop(sp2,`rgba(200,230,200,${0.14*b.op})`);
     shG.addColorStop(1,'rgba(255,255,255,0)');
     ctx.fillStyle=shG;ctx.beginPath();ctx.roundRect(-b.w/2,-b.h/2,b.w,b.h,W*0.004);ctx.fill();
     ctx.restore();
    }

    /* ── Silhouettes animées ── */
    function drawSilhouettes(){
     const baseY=H*0.84;
     const rimBandG=ctx.createLinearGradient(0,baseY-H*0.24,0,baseY+H*0.02);
     rimBandG.addColorStop(0,'rgba(0,0,0,0)');
     rimBandG.addColorStop(0.50,`rgba(110,85,180,${0.20+Math.sin(t*0.10)*0.04})`);
     rimBandG.addColorStop(0.82,`rgba(140,110,210,0.12)`);
     rimBandG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rimBandG;ctx.fillRect(0,baseY-H*0.24,W,H*0.26);

     for(const fig of figures){
      fig.swayPh+=0.008;
      fig.sway=Math.sin(fig.swayPh)*0.025; /* balancement subtil */
      const h=H*0.19*fig.sc;
      ctx.save();ctx.translate(fig.x,baseY);ctx.rotate(fig.lean+fig.sway);

      /* Rim light */
      const rimG=ctx.createRadialGradient(0,-h*0.32,0,0,-h*0.32,W*0.058*fig.sc);
      rimG.addColorStop(0,`rgba(130,100,220,${0.48+Math.sin(t*0.08+fig.x)*0.07})`);
      rimG.addColorStop(0.45,'rgba(90,65,170,0.18)');
      rimG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rimG;
      ctx.beginPath();ctx.ellipse(0,-h*0.32,W*0.058*fig.sc,h*0.62,0,0,Math.PI*2);ctx.fill();

      ctx.fillStyle='rgba(5,3,7,0.98)';
      /* Jambes */
      ctx.beginPath();ctx.moveTo(-W*0.020*fig.sc,h*0.42);ctx.lineTo(-W*0.022*fig.sc,h*1.00);ctx.lineTo(-W*0.004*fig.sc,h*1.00);ctx.lineTo(-W*0.002*fig.sc,h*0.42);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.moveTo(W*0.002*fig.sc,h*0.42);ctx.lineTo(W*0.004*fig.sc,h*1.00);ctx.lineTo(W*0.022*fig.sc,h*1.00);ctx.lineTo(W*0.020*fig.sc,h*0.42);ctx.closePath();ctx.fill();
      /* Corps */
      ctx.beginPath();ctx.moveTo(-W*0.026*fig.sc,h*0.42);ctx.lineTo(-W*0.029*fig.sc,h*0.10);
      ctx.bezierCurveTo(-W*0.031*fig.sc,-h*0.05,W*0.031*fig.sc,-h*0.05,W*0.029*fig.sc,h*0.10);
      ctx.lineTo(W*0.026*fig.sc,h*0.42);ctx.closePath();ctx.fill();
      /* Tête */
      ctx.beginPath();ctx.arc(0,-h*0.10,W*0.021*fig.sc,0,Math.PI*2);ctx.fill();

      if(fig.gun){
       /* Bras avec pistolet tendu */
       const gunSide=fig.x<cx?1:-1;
       const armX=gunSide*W*0.028*fig.sc;
       const armY=h*0.14;
       /* Bras */
       ctx.fillRect(armX,armY,gunSide*W*0.042*fig.sc,W*0.011*fig.sc);
       /* Canon du pistolet */
       ctx.fillStyle='rgba(8,5,10,0.98)';
       ctx.beginPath();ctx.roundRect(armX+gunSide*W*0.040*fig.sc,armY-W*0.006*fig.sc,gunSide*W*0.022*fig.sc,W*0.018*fig.sc,W*0.002);ctx.fill();
      } else {
       /* Bras normal */
       const armSide=fig.x<cx?1:-1;
       ctx.fillRect(armSide*W*0.022*fig.sc,h*0.12,armSide*W*0.016*fig.sc,W*0.011*fig.sc);
      }
      ctx.restore();
     }
    }

    function frame(){
     if(stop.v)return;

     drawBrickWall();
     drawSpot();

     /* Poussière */
     for(const d of dust){
      d.x+=d.vx;d.y+=d.vy;d.ph+=0.014;
      if(d.y<H*0.45){d.y=H+d.r;d.x=Math.random()*W;}
      ctx.fillStyle=`rgba(135,115,155,${d.op*(0.5+0.5*Math.sin(d.ph))})`;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
     }

     /* Billets */
     for(const b of bills){
      b.x+=b.vx;b.y+=b.vy;b.rot+=b.rotSpd;
      if(b.y>H+b.h){b.y=-b.h;b.x=Math.random()*W;}
      if(b.x<-b.w)b.x=W+b.w;if(b.x>W+b.w)b.x=-b.w;
      drawBill(b);
     }

     /* Cartes — wobble sinusoïdal sur vx */
     for(const c of cards){
      c.wobble+=c.wobbleSpd;
      c.x+=c.vx+Math.sin(c.wobble)*0.30;c.y+=c.vy;c.rot+=c.rotSpd;
      if(c.y>H+c.h){c.y=-c.h;c.x=Math.random()*W;}
      if(c.x<-c.w)c.x=W+c.w;if(c.x>W+c.w)c.x=-c.w;
      drawCard(c);
     }

     drawDiamond();
     drawSilhouettes();

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.05,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.35,'rgba(5,3,7,0.05)');
     vg.addColorStop(0.62,'rgba(5,3,7,0.40)');
     vg.addColorStop(0.82,'rgba(4,2,6,0.74)');
     vg.addColorStop(1,'rgba(3,1,4,0.96)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
     const tb=ctx.createLinearGradient(0,0,0,H*0.14);
     tb.addColorStop(0,'rgba(8,5,10,0.92)');tb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tb;ctx.fillRect(0,0,W,H*0.14);

     /* Grain film */
     for(let i=0;i<30;i++){
      const gv=4+Math.random()*14|0;
      ctx.fillStyle=`rgba(${gv+10},${gv+8},${gv+16},${Math.random()*0.016})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
