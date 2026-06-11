// CinéQuiz splash chunk — Scarface
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Scarface"]={
   name:'Scarface',
   color:'20,160,220',
   ref:'Scarface \u2014 Brian De Palma, 1983',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Fond : coucher de soleil Miami — pas d'orbes ── */
    let _s=document.getElementById('_sf_s');
    if(!_s){_s=document.createElement('style');_s.id='_sf_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:72%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Horizon ── */
    const HORIZ=H*0.56;

    /* ── Palmiers — silhouettes réalistes ── */
    const palms=[
     {x:W*0.06, baseY:HORIZ, h:H*0.52, lean:-0.22, side:-1},
     {x:W*0.94, baseY:HORIZ, h:H*0.48, lean: 0.20, side: 1},
     {x:W*0.16, baseY:HORIZ, h:H*0.38, lean:-0.14, side:-1},
     {x:W*0.84, baseY:HORIZ, h:H*0.42, lean: 0.16, side: 1},
    ];

    function drawPalm(px,baseY,h,lean,side){
     ctx.save();
     ctx.fillStyle='rgba(3,1,5,0.97)';
     ctx.strokeStyle='rgba(3,1,5,0.97)';

     /* Tronc — courbe en S naturelle */
     const tipX=px+lean*h;
     const tipY=baseY-h;
     const cp1x=px+lean*h*0.15, cp1y=baseY-h*0.30;
     const cp2x=px+lean*h*0.75, cp2y=baseY-h*0.68;

     /* Épaisseur variable — large en bas, fin en haut */
     const segments=18;
     for(let si=0;si<segments;si++){
      const t0=si/segments, t1=(si+1)/segments;
      const bt0=bezierPoint(px,cp1x,cp2x,tipX,t0);
      const bt1=bezierPoint(px,cp1x,cp2x,tipX,t1);
      const by0=bezierPoint(baseY,cp1y,cp2y,tipY,t0);
      const by1=bezierPoint(baseY,cp1y,cp2y,tipY,t1);
      const w0=W*(0.022-t0*0.016);
      const w1=W*(0.022-t1*0.016);
      /* Angle du segment pour l'épaisseur perpendiculaire */
      const ang=Math.atan2(by1-by0,bt1-bt0)+Math.PI/2;
      ctx.beginPath();
      ctx.moveTo(bt0-Math.cos(ang)*w0, by0-Math.sin(ang)*w0);
      ctx.lineTo(bt1-Math.cos(ang)*w1, by1-Math.sin(ang)*w1);
      ctx.lineTo(bt1+Math.cos(ang)*w1, by1+Math.sin(ang)*w1);
      ctx.lineTo(bt0+Math.cos(ang)*w0, by0+Math.sin(ang)*w0);
      ctx.closePath();ctx.fill();
     }

     /* Cicatrices de feuilles sur le tronc */
     ctx.strokeStyle='rgba(0,0,0,0.60)';ctx.lineWidth=W*0.004;
     for(let ci=0;ci<8;ci++){
      const tc=0.20+ci*0.09;
      const cx2=bezierPoint(px,cp1x,cp2x,tipX,tc);
      const cy2=bezierPoint(baseY,cp1y,cp2y,tipY,tc);
      ctx.beginPath();
      ctx.moveTo(cx2-W*0.012,cy2);ctx.lineTo(cx2+W*0.012,cy2+H*0.004);
      ctx.stroke();
     }

     /* Couronne de feuilles */
     const nLeaves=11;
     for(let li=0;li<nLeaves;li++){
      const sway=Math.sin(t*0.55+li*0.72)*0.035;
      /* Angle de base — éventail complet autour du sommet */
      const angleBase=-Math.PI*0.5+lean*0.8;
      const spread=Math.PI*1.35;
      const leafAngle=angleBase+(li/(nLeaves-1)-0.5)*spread+sway;
      const lLen=h*(0.28+((li+2)%3)*0.06);

      /* Rachis (nervure centrale) */
      const rachisEndX=tipX+Math.cos(leafAngle)*lLen;
      const rachisEndY=tipY+Math.sin(leafAngle)*lLen;
      /* Affaissement naturel — les feuilles pendent */
      const sagX=tipX+Math.cos(leafAngle)*lLen*0.55+Math.cos(leafAngle+0.35)*lLen*0.18;
      const sagY=tipY+Math.sin(leafAngle)*lLen*0.55+Math.sin(leafAngle+0.55)*lLen*0.22;

      /* Folioles — paires de petites feuilles le long du rachis */
      const nFolioles=8;
      for(let fi=1;fi<=nFolioles;fi++){
       const ft=fi/(nFolioles+1);
       /* Position sur le rachis */
       const fx=cubicBezier(tipX,sagX,sagX,rachisEndX,ft);
       const fy=cubicBezier(tipY,sagY,sagY,rachisEndY,ft);
       const fLen=lLen*(0.055+ft*(1-ft)*0.14);
       const fAngle=leafAngle+Math.PI/2;
       const fSway=Math.sin(t*0.55+li*0.72+fi*0.5)*0.02;

       /* Foliole gauche */
       ctx.beginPath();
       ctx.moveTo(fx,fy);
       ctx.quadraticCurveTo(
        fx+Math.cos(fAngle+0.4+fSway)*fLen*0.55,
        fy+Math.sin(fAngle+0.4+fSway)*fLen*0.55,
        fx+Math.cos(fAngle+0.25+fSway)*fLen,
        fy+Math.sin(fAngle+0.25+fSway)*fLen
       );
       ctx.strokeStyle='rgba(3,1,5,0.97)';ctx.lineWidth=W*0.004+ft*W*0.002;
       ctx.stroke();
       /* Foliole droite */
       ctx.beginPath();
       ctx.moveTo(fx,fy);
       ctx.quadraticCurveTo(
        fx+Math.cos(-fAngle-0.4+fSway)*fLen*0.55,
        fy+Math.sin(-fAngle-0.4+fSway)*fLen*0.55,
        fx+Math.cos(-fAngle-0.25+fSway)*fLen,
        fy+Math.sin(-fAngle-0.25+fSway)*fLen
       );
       ctx.stroke();
      }

      /* Rachis lui-même */
      ctx.strokeStyle='rgba(3,1,5,0.97)';ctx.lineWidth=W*0.005;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(tipX,tipY);
      ctx.quadraticCurveTo(sagX,sagY,rachisEndX,rachisEndY);
      ctx.stroke();
     }
     ctx.restore();
    }

    /* ── Helpers Bézier ── */
    function bezierPoint(p0,p1,p2,p3,t2){
     const mt=1-t2;
     return mt*mt*mt*p0+3*mt*mt*t2*p1+3*mt*t2*t2*p2+t2*t2*t2*p3;
    }
    function cubicBezier(p0,p1,p2,p3,t2){return bezierPoint(p0,p1,p2,p3,t2);}

    /* ── Reflets sur l'eau ── */
    /* ── Étoiles fixes ── */
    const stars=Array.from({length:90},()=>({
     x:Math.random()*W,
     y:Math.random()*HORIZ*0.72,
     r:Math.random()*1.1+0.2,
     op:Math.random()*0.55+0.15,
     tw:Math.random()*Math.PI*2,
     tf:Math.random()*0.018+0.004,
    }));

    /* ── Étoiles filantes ── */
    const shootingStars=Array.from({length:4},(_,i)=>({
     active:false,
     timer:i*90+Math.random()*60,   /* décalage initial pour qu'elles n'arrivent pas toutes en même temps */
     x:0, y:0, vx:0, vy:0,
     len:0, alpha:0,
    }));
    function resetShootingStar(s){
     s.active=true;
     s.x=Math.random()*W*0.9;
     s.y=Math.random()*HORIZ*0.35;
     const angle=Math.PI*0.18+Math.random()*Math.PI*0.12;
     const speed=W*(0.012+Math.random()*0.010);
     s.vx=Math.cos(angle)*speed;
     s.vy=Math.sin(angle)*speed;
     s.len=W*(0.06+Math.random()*0.08);
     s.alpha=0.85+Math.random()*0.15;
     s.life=0;
     s.maxLife=38+Math.random()*20|0;
    }

    const seaSparkles=Array.from({length:18},()=>({
     x:Math.random()*W,
     y:HORIZ+Math.random()*(H-HORIZ)*0.45,
     ph:Math.random()*Math.PI*2,
     spd:0.04+Math.random()*0.04,
     op:0.20+Math.random()*0.30,
     w:W*(0.018+Math.random()*0.030)
    }));

    /* ── Villa Art Déco Miami — refaite ── */
    const VILLA_Y=HORIZ;

    function drawVilla(){
     const vW=W*0.62, vH=H*0.26;
     const vX=cx-vW/2, vY=VILLA_Y-vH;

     /* ── Étage supérieur — plus étroit ── */
     const upW=vW*0.52, upH=vH*0.38;
     const upX=cx-upW/2, upY=vY;
     const upG=ctx.createLinearGradient(0,upY,0,upY+upH);
     upG.addColorStop(0,'rgba(252,245,228,0.97)');
     upG.addColorStop(1,'rgba(235,225,205,0.95)');
     ctx.fillStyle=upG;
     ctx.beginPath();ctx.roundRect(upX,upY,upW,upH,W*0.005);ctx.fill();

     /* Acrotère — crénelage plat Art Déco */
     ctx.fillStyle='rgba(255,250,238,0.98)';
     const crenW=upW/7, crenH=H*0.014;
     for(let ci=0;ci<4;ci++){
      ctx.beginPath();ctx.roundRect(upX+ci*(crenW*1.75),upY-crenH,crenW,crenH,W*0.002);ctx.fill();
     }

     /* Fenêtres étage */
     const upWins=[upX+upW*0.18,upX+upW*0.50,upX+upW*0.78];
     for(const wx of upWins){
      const wW=upW*0.12,wH=upH*0.40;
      const wY=upY+upH*0.22;
      ctx.fillStyle='rgba(5,2,10,0.92)';
      /* Fenêtre arrondie en haut */
      ctx.beginPath();
      ctx.moveTo(wx,wY+wH);ctx.lineTo(wx,wY+wW/2);
      ctx.arc(wx+wW/2,wY+wW/2,wW/2,Math.PI,0);
      ctx.lineTo(wx+wW,wY+wH);ctx.closePath();ctx.fill();
      /* Halo warm */
      const wg=ctx.createRadialGradient(wx+wW/2,wY+wH*0.5,0,wx+wW/2,wY+wH*0.5,wW*1.8);
      wg.addColorStop(0,`rgba(255,190,70,${0.28+Math.sin(t*0.6+wx)*0.07})`);
      wg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wg;ctx.fillRect(wx-wW,wY-wH*0.5,wW*3,wH*2);
     }

     /* ── Corps principal ── */
     const mainG=ctx.createLinearGradient(0,upY+upH,0,VILLA_Y);
     mainG.addColorStop(0,'rgba(245,237,218,0.97)');
     mainG.addColorStop(0.5,'rgba(232,222,200,0.95)');
     mainG.addColorStop(1,'rgba(210,198,175,0.92)');
     ctx.fillStyle=mainG;
     ctx.beginPath();ctx.roundRect(vX,upY+upH,vW,vH-upH,W*0.004);ctx.fill();

     /* Corniche entre étages */
     ctx.fillStyle='rgba(255,252,242,0.98)';
     ctx.beginPath();ctx.roundRect(vX-W*0.008,upY+upH-H*0.006,vW+W*0.016,H*0.014,W*0.003);ctx.fill();

     /* Corniche du toit */
     ctx.fillStyle='rgba(255,252,242,0.99)';
     ctx.beginPath();ctx.roundRect(vX-W*0.012,upY-H*0.010,vW+W*0.024,H*0.016,W*0.004);ctx.fill();

     /* ── Grande arcade centrale + porte ── */
     const archCX=cx, archBotY=VILLA_Y;
     const archW=vW*0.22, archH=(vH-upH)*0.85;
     ctx.fillStyle='rgba(6,2,12,0.95)';
     ctx.beginPath();
     ctx.moveTo(archCX-archW/2,archBotY);
     ctx.lineTo(archCX-archW/2,archBotY-archH+archW/2);
     ctx.arc(archCX,archBotY-archH+archW/2,archW/2,Math.PI,0);
     ctx.lineTo(archCX+archW/2,archBotY);
     ctx.closePath();ctx.fill();
     /* Halo intérieur */
     const aGlow=ctx.createRadialGradient(archCX,archBotY-archH*0.5,0,archCX,archBotY-archH*0.5,archW*1.4);
     aGlow.addColorStop(0,`rgba(255,195,75,${0.25+Math.sin(t*0.7)*0.07})`);
     aGlow.addColorStop(0.6,'rgba(200,120,30,0.06)');
     aGlow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=aGlow;ctx.fillRect(archCX-archW,archBotY-archH,archW*2,archH+H*0.04);

     /* ── 6 colonnes ioniques ── */
     const colXs=[vX+vW*0.08,vX+vW*0.20,vX+vW*0.34,vX+vW*0.66,vX+vW*0.80,vX+vW*0.92];
     for(const colX of colXs){
      const cW=W*0.022,cH=vH-upH;
      const cG=ctx.createLinearGradient(colX-cW/2,0,colX+cW/2,0);
      cG.addColorStop(0,'rgba(200,190,168,0.94)');
      cG.addColorStop(0.30,'rgba(248,242,228,0.99)');
      cG.addColorStop(0.70,'rgba(235,228,210,0.96)');
      cG.addColorStop(1,'rgba(190,180,160,0.92)');
      ctx.fillStyle=cG;
      /* Fût légèrement effilé */
      ctx.beginPath();
      ctx.moveTo(colX-cW/2,upY+upH+cH);
      ctx.lineTo(colX-cW*0.42,upY+upH);
      ctx.lineTo(colX+cW*0.42,upY+upH);
      ctx.lineTo(colX+cW/2,upY+upH+cH);
      ctx.closePath();ctx.fill();
      /* Chapiteau */
      ctx.fillStyle='rgba(255,252,240,0.99)';
      ctx.beginPath();ctx.roundRect(colX-cW*0.62,upY+upH-H*0.016,cW*1.24,H*0.016,W*0.002);ctx.fill();
      /* Base */
      ctx.fillStyle='rgba(240,232,215,0.96)';
      ctx.beginPath();ctx.roundRect(colX-cW*0.62,upY+upH+cH-H*0.008,cW*1.24,H*0.010,W*0.002);ctx.fill();
     }

     /* ── Fenêtres rez-de-chaussée ── */
     const groundWins=[[vX+vW*0.08,upY+upH],[vX+vW*0.20,upY+upH],[vX+vW*0.76,upY+upH],[vX+vW*0.88,upY+upH]];
     for(const [wx,wy] of groundWins){
      const wW=vW*0.07,wH=(vH-upH)*0.38,wY=wy+H*0.028;
      ctx.fillStyle='rgba(5,2,10,0.90)';
      ctx.beginPath();
      ctx.moveTo(wx,wY+wH);ctx.lineTo(wx,wY+wW/2);
      ctx.arc(wx+wW/2,wY+wW/2,wW/2,Math.PI,0);
      ctx.lineTo(wx+wW,wY+wH);ctx.closePath();ctx.fill();
      const wg2=ctx.createRadialGradient(wx+wW/2,wY+wH*0.5,0,wx+wW/2,wY+wH*0.5,wW*1.6);
      wg2.addColorStop(0,`rgba(255,185,60,${0.22+Math.sin(t*0.5+wx*0.01)*0.07})`);
      wg2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wg2;ctx.fillRect(wx-wW,wY-wH*0.5,wW*3,wH*2);
     }

     /* ── Escalier devant la villa ── */
     const stW=vW*0.38, stX=cx-stW/2;
     for(let si=0;si<4;si++){
      const sw=stW+si*W*0.024, sh=H*0.012;
      const sx=cx-sw/2, sy=VILLA_Y+si*sh;
      const stG=ctx.createLinearGradient(0,sy,0,sy+sh);
      stG.addColorStop(0,'rgba(225,215,195,0.95)');
      stG.addColorStop(1,'rgba(195,185,165,0.90)');
      ctx.fillStyle=stG;
      ctx.beginPath();ctx.roundRect(sx,sy,sw,sh,W*0.002);ctx.fill();
      ctx.fillStyle='rgba(160,150,130,0.40)';
      ctx.fillRect(sx,sy+sh-1,sw,1);
     }

     /* ── Ombre portée villa ── */
     const shG=ctx.createLinearGradient(0,VILLA_Y+H*0.048,0,VILLA_Y+H*0.010);
     shG.addColorStop(0,'rgba(0,0,0,0)');
     shG.addColorStop(1,'rgba(0,0,0,0.28)');
     ctx.fillStyle=shG;
     ctx.beginPath();ctx.ellipse(cx,VILLA_Y+H*0.022,vW*0.50,H*0.018,0,0,Math.PI*2);ctx.fill();
    }

    /* ── Silhouette Tony Montana ── */
    function drawTony(){
     const tx=cx, ty=HORIZ;
     /* Corps — costume blanc */
     const bodyG=ctx.createLinearGradient(tx-W*0.06,ty-H*0.22,tx+W*0.06,ty);
     bodyG.addColorStop(0,'rgba(240,235,220,0.95)');
     bodyG.addColorStop(0.5,'rgba(215,208,192,0.92)');
     bodyG.addColorStop(1,'rgba(180,170,155,0.88)');
     ctx.fillStyle=bodyG;
     /* Buste */
     ctx.beginPath();
     ctx.moveTo(tx-W*0.055, ty);
     ctx.lineTo(tx-W*0.048, ty-H*0.145);
     ctx.bezierCurveTo(tx-W*0.042,ty-H*0.185, tx-W*0.018,ty-H*0.200, tx,ty-H*0.200);
     ctx.bezierCurveTo(tx+W*0.018,ty-H*0.200, tx+W*0.042,ty-H*0.185, tx+W*0.048,ty-H*0.145);
     ctx.lineTo(tx+W*0.055, ty);
     ctx.closePath(); ctx.fill();
     /* Tête */
     const headG=ctx.createRadialGradient(tx-W*0.006,ty-H*0.228,W*0.006,tx,ty-H*0.222,W*0.032);
     headG.addColorStop(0,'rgba(165,110,65,0.97)');
     headG.addColorStop(1,'rgba(120,75,35,0.92)');
     ctx.fillStyle=headG;
     ctx.beginPath(); ctx.ellipse(tx,ty-H*0.228,W*0.030,H*0.038,0,0,Math.PI*2); ctx.fill();
     /* Cheveux */
     ctx.fillStyle='rgba(18,8,4,0.95)';
     ctx.beginPath(); ctx.ellipse(tx,ty-H*0.252,W*0.026,H*0.016,0,0,Math.PI,true); ctx.fill();
     /* Bras gauche levé — pose iconic */
     const armAngle=-0.45+Math.sin(t*0.3)*0.02;
     ctx.strokeStyle='rgba(230,222,205,0.92)'; ctx.lineWidth=W*0.020; ctx.lineCap='round';
     ctx.beginPath();
     ctx.moveTo(tx-W*0.042,ty-H*0.130);
     ctx.lineTo(tx-W*0.042-Math.cos(armAngle)*W*0.065, ty-H*0.130-Math.sin(armAngle)*H*0.080);
     ctx.stroke();
     /* Ombre portée de Tony sur le sol */
     const shadowLen=H*0.04;
     const shG=ctx.createLinearGradient(tx,ty,tx+W*0.04,ty+shadowLen);
     shG.addColorStop(0,'rgba(0,0,0,0.35)'); shG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=shG;
     ctx.beginPath();
     ctx.ellipse(tx+W*0.03,ty+shadowLen*0.4,W*0.06,H*0.012,0.2,0,Math.PI*2);
     ctx.fill();
    }

    function frame(){
     if(stop.v)return;

     /* ── Ciel coucher de soleil Miami ── */
     const sky=ctx.createLinearGradient(0,0,0,HORIZ);
     sky.addColorStop(0,'#0a0218');
     sky.addColorStop(0.25,`rgba(${60+Math.sin(t*0.2)*8|0},8,${45+Math.sin(t*0.2)*5|0},1)`);
     sky.addColorStop(0.55,'#a0184a');
     sky.addColorStop(0.78,'#d4582a');
     sky.addColorStop(0.90,'#e8842c');
     sky.addColorStop(1,'#f0b050');
     ctx.fillStyle=sky; ctx.fillRect(0,0,W,HORIZ);

     /* ── Étoiles fixes (haut du ciel sombre) ── */
     for(const s of stars){
      s.tw+=s.tf;
      const op=s.op*(0.45+Math.sin(s.tw)*0.55);
      /* fondu vers 0 au niveau de l'horizon */
      const fade=Math.max(0,1-s.y/(HORIZ*0.75));
      ctx.fillStyle=`rgba(255,245,220,${op*fade})`;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
     }

     /* ── Étoiles filantes ── */
     for(const s of shootingStars){
      if(!s.active){
       s.timer--;
       if(s.timer<=0) resetShootingStar(s);
       continue;
      }
      s.life++;
      s.x+=s.vx; s.y+=s.vy;
      const progress=s.life/s.maxLife;
      const a=s.alpha*(1-progress);
      if(a<0.01||s.y>HORIZ*0.85||s.life>=s.maxLife){
       s.active=false;
       s.timer=120+Math.random()*180|0;
       continue;
      }
      const tailX=s.x-s.vx*(s.len/Math.hypot(s.vx,s.vy));
      const tailY=s.y-s.vy*(s.len/Math.hypot(s.vx,s.vy));
      const fade=Math.max(0,1-s.y/(HORIZ*0.80));
      const grad=ctx.createLinearGradient(tailX,tailY,s.x,s.y);
      grad.addColorStop(0,'rgba(255,255,240,0)');
      grad.addColorStop(0.6,`rgba(255,248,210,${a*0.4*fade})`);
      grad.addColorStop(1,`rgba(255,255,255,${a*fade})`);
      ctx.strokeStyle=grad;
      ctx.lineWidth=1.2;
      ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(tailX,tailY); ctx.lineTo(s.x,s.y); ctx.stroke();
      /* petit point lumineux en tête */
      ctx.fillStyle=`rgba(255,255,255,${a*fade})`;
      ctx.beginPath(); ctx.arc(s.x,s.y,1.2,0,Math.PI*2); ctx.fill();
     }

     /* Soleil bas sur l'horizon */
     const sunY=HORIZ-H*0.045;
     const sunG=ctx.createRadialGradient(cx,sunY,0,cx,sunY,W*0.38);
     sunG.addColorStop(0,`rgba(255,240,180,${0.88+Math.sin(t*0.3)*0.05})`);
     sunG.addColorStop(0.06,'rgba(255,210,100,0.70)');
     sunG.addColorStop(0.18,'rgba(240,140,40,0.32)');
     sunG.addColorStop(0.40,'rgba(200,80,20,0.10)');
     sunG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sunG; ctx.fillRect(0,0,W,HORIZ);
     /* Disque */
     ctx.fillStyle=`rgba(255,248,200,${0.92+Math.sin(t*0.3)*0.05})`;
     ctx.beginPath(); ctx.arc(cx,sunY,W*0.040,0,Math.PI*2); ctx.fill();

     /* Reflet soleil sur l'eau */
     const reflectG=ctx.createLinearGradient(cx-W*0.08,HORIZ,cx+W*0.08,HORIZ+H*0.18);
     reflectG.addColorStop(0,`rgba(255,200,80,${0.30+Math.sin(t*0.5)*0.08})`);
     reflectG.addColorStop(0.5,'rgba(220,120,30,0.10)');
     reflectG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=reflectG;
     ctx.beginPath();
     ctx.moveTo(cx-W*0.08,HORIZ);
     ctx.lineTo(cx-W*0.28,HORIZ+H*0.20);
     ctx.lineTo(cx+W*0.28,HORIZ+H*0.20);
     ctx.lineTo(cx+W*0.08,HORIZ);
     ctx.closePath(); ctx.fill();

     /* ── Océan ── */
     const sea=ctx.createLinearGradient(0,HORIZ,0,H);
     sea.addColorStop(0,'#8a3010');
     sea.addColorStop(0.12,'#5a1e18');
     sea.addColorStop(0.35,'#1a1230');
     sea.addColorStop(0.70,'#0c0820');
     sea.addColorStop(1,'#060412');
     ctx.fillStyle=sea; ctx.fillRect(0,HORIZ,W,H-HORIZ);

     /* Rides légères sur l'eau */
     for(let ri=0;ri<5;ri++){
      const ry=HORIZ+H*(0.04+ri*0.055);
      const rAlpha=0.06-ri*0.010;
      ctx.strokeStyle=`rgba(255,180,80,${rAlpha+Math.sin(t*0.6+ri)*0.015})`;
      ctx.lineWidth=0.8;
      ctx.beginPath();
      for(let rx=0;rx<=W;rx+=4){
       const wy=ry+Math.sin(rx*0.022+t*0.5+ri)*H*0.003;
       rx===0?ctx.moveTo(rx,wy):ctx.lineTo(rx,wy);
      }
      ctx.stroke();
     }

     /* Scintillements soleil sur l'eau */
     for(const sp of seaSparkles){
      sp.ph+=sp.spd;
      const pulse=Math.pow(Math.max(0,Math.sin(sp.ph)),4);
      if(pulse<0.04) continue;
      ctx.fillStyle=`rgba(255,200,80,${pulse*sp.op})`;
      ctx.beginPath();
      ctx.ellipse(sp.x,sp.y,sp.w*pulse,sp.w*0.18*pulse,0,0,Math.PI*2);
      ctx.fill();
     }

     /* ── Villa ── */
     drawVilla();

     /* ── Palmiers ── */
     for(const p of palms) drawPalm(p.x,p.baseY,p.h,p.lean,p.side);


     /* ── Vignette intense — bords dans le noir ── */
     const vg=ctx.createRadialGradient(cx,H*0.48,H*0.05,cx,H*0.48,H*0.82);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(0,0,0,0.12)');
     vg.addColorStop(0.70,'rgba(0,0,0,0.55)');
     vg.addColorStop(1,'rgba(0,0,0,0.97)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
     /* Bords latéraux */
     const vgL=ctx.createLinearGradient(0,0,W*0.14,0);
     vgL.addColorStop(0,'rgba(0,0,0,0.80)'); vgL.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgL; ctx.fillRect(0,0,W*0.14,H);
     const vgR=ctx.createLinearGradient(W,0,W*0.86,0);
     vgR.addColorStop(0,'rgba(0,0,0,0.80)'); vgR.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=vgR; ctx.fillRect(W*0.86,0,W*0.14,H);

     /* Grain pellicule */
     for(let i=0;i<45;i++){
      const gv=6+Math.random()*16|0;
      ctx.fillStyle=`rgba(${gv+4},${gv*0.7|0},${gv*0.5|0},${Math.random()*0.025})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2+0.4,1);
     }

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
