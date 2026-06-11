// CinéQuiz splash chunk — Ocean's Eleven
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Ocean's Eleven"]={
   name:"Ocean's Eleven",
   color:'40,120,180',
   ref:"Ocean's Eleven \u2014 Steven Soderbergh, 2001",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;

    /* ── Style ── */
    let _ocS=document.getElementById('_oc_s');
    if(!_ocS){_ocS=document.createElement('style');_ocS.id='_oc_s';document.head.appendChild(_ocS);}
    _ocS.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{color:rgba(255,235,170,0.92)!important;font-size:14px!important;text-shadow:0 1px 10px rgba(0,0,0,0.95)!important;}
     #splash-film-logo{max-width:62%!important;}
    `;
    const _ocW=setInterval(()=>{if(stop.v){_ocS.textContent='';clearInterval(_ocW);}},200);

    /* ── Seed déterministe ── */
    function sr(n){let x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}

    const horizY=H*0.68;
    const waterY=H*0.78;

    /* ══ CARTES — rectangles vrais avec symboles ══ */
    const SUITS=[{s:'♠',r:false},{s:'♥',r:true},{s:'♦',r:true},{s:'♣',r:false}];
    const RANKS=['A','K','Q','J','10'];
    function mkCard(){
      const suit=SUITS[Math.floor(Math.random()*4)];
      const cw=W*(0.068+Math.random()*0.018);
      const ch=cw*1.42;
      return {
        x:cx+(Math.random()-0.5)*W*0.70,
        y:-ch-Math.random()*H*0.15,
        vx:(Math.random()-0.5)*W*0.0018,
        vy:H*(0.0022+Math.random()*0.0028),
        rot:(Math.random()-0.5)*0.60,
        rotSpd:(Math.random()-0.5)*0.022,
        cw,ch,
        suit:suit.s, red:suit.r,
        rank:RANKS[Math.floor(Math.random()*5)],
        op:0.82+Math.random()*0.15,
      };
    }
    const cards=Array.from({length:9},mkCard);

    /* ══ IMMEUBLES LAS VEGAS ══ */
    const BLDGS=Array.from({length:20},(_,i)=>{
      const x=(i/19)*W*1.05-W*0.025;
      const w=W*(0.042+sr(i*3)*0.055);
      const h=H*(0.08+sr(i*3+1)*0.28);
      const neonCol=[
        [255,50,120],[255,140,0],[0,200,255],[180,0,255],
        [255,220,0],[0,255,150],[255,60,0],[120,0,255],
      ][i%8];
      return {x,w,h,neonCol,
        neonPh:sr(i*7)*Math.PI*2, neonSpd:0.8+sr(i*11)*1.5,
        wins:Array.from({length:25},(_,wi)=>({
          xf:sr(wi*i+1), yf:sr(wi*i+2),
          lit:sr(wi*i+3)>0.30,
          ph:sr(wi*i+4)*Math.PI*2,
          spd:0.006+sr(wi*i+5)*0.014,
          warm:sr(wi*i+6)>0.55,
        })),
      };
    });

    /* ══ FONTAINES — jets simples mais beaux ══ */
    /* On garde 10 buses bien espacées, jets pas trop hauts */
    const NOZZLES=Array.from({length:10},(_,i)=>({
      x:W*(0.06+i/9*0.88),
      baseY:waterY,
      ph:i*0.62, /* phase décalée pour l'effet vague */
      spd:0.055+Math.random()*0.025,
    }));

    /* ══ BOKEH REFLETS EAU ══ */
    const bokeh=Array.from({length:35},(_,i)=>({
      x:Math.random()*W, y:waterY+Math.random()*(H-waterY),
      rx:W*(0.018+Math.random()*0.045), ry:H*(0.004+Math.random()*0.010),
      col:[[255,180,40],[255,60,150],[60,180,255],[200,60,255],[255,220,60],[0,255,180]][i%6],
      op:0.10+Math.random()*0.22,
      ph:Math.random()*Math.PI*2, spd:0.007+Math.random()*0.015,
    }));

    function drawSky(){
      /* Ciel Las Vegas — dégradé orange/violet spectaculaire */
      const sky=ctx.createLinearGradient(0,0,0,horizY);
      sky.addColorStop(0.00,'#0a0220'); /* violet profond en haut */
      sky.addColorStop(0.20,'#180430');
      sky.addColorStop(0.45,'#3a0838'); /* violet-magenta */
      sky.addColorStop(0.65,'#6a1820'); /* rouge-bordeaux */
      sky.addColorStop(0.80,'#c04010'); /* orange brûlant */
      sky.addColorStop(0.92,'#e06820'); /* orange vif horizon */
      sky.addColorStop(1.00,'#f09030'); /* jaune-orangé */
      ctx.fillStyle=sky; ctx.fillRect(0,0,W,horizY);

      /* Halo violet central — lumières du Strip qui montent dans le ciel */
      const vegG=ctx.createRadialGradient(cx,horizY*0.85,0,cx,horizY*0.85,W*0.75);
      vegG.addColorStop(0,`rgba(180,60,255,${0.22+Math.sin(t*0.15)*0.04})`);
      vegG.addColorStop(0.35,'rgba(120,20,200,0.10)');
      vegG.addColorStop(0.65,'rgba(60,0,120,0.04)');
      vegG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=vegG; ctx.fillRect(0,0,W,horizY);

      /* Lueur orange en bas du ciel — glow de la ville */
      const orangeG=ctx.createLinearGradient(0,horizY*0.70,0,horizY);
      orangeG.addColorStop(0,'rgba(0,0,0,0)');
      orangeG.addColorStop(1,`rgba(255,120,20,${0.25+Math.sin(t*0.12)*0.05})`);
      ctx.fillStyle=orangeG; ctx.fillRect(0,horizY*0.70,W,horizY*0.30);

      /* Quelques étoiles */
      if(!drawSky._st) drawSky._st=Array.from({length:25},()=>({x:Math.random()*W,y:Math.random()*horizY*0.45,r:0.6+Math.random()*1.0,op:0.20+Math.random()*0.35,ph:Math.random()*Math.PI*2,spd:0.008+Math.random()*0.015}));
      for(const s of drawSky._st){s.ph+=s.spd; ctx.fillStyle=`rgba(255,240,200,${s.op*(0.5+0.5*Math.sin(s.ph))})`; ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();}
    }

    function drawSkyline(){
      for(const b of BLDGS){
        const bTop=horizY-b.h;
        /* Façade — teintée par la lumière du ciel */
        const fg=ctx.createLinearGradient(b.x,bTop,b.x,horizY);
        fg.addColorStop(0,`rgba(${15+Math.round(sr(b.x)*20)},${8+Math.round(sr(b.x+1)*12)},${25+Math.round(sr(b.x+2)*30)},0.95)`);
        fg.addColorStop(1,'rgba(8,4,16,0.98)');
        ctx.fillStyle=fg; ctx.fillRect(b.x,bTop,b.w,b.h);

        /* Fenêtres */
        const fw=Math.max(2,b.w*0.12), fh=Math.max(2,b.h*0.040);
        for(const w of b.wins){
          if(!w.lit)continue;
          w.ph+=w.spd;
          if(Math.sin(w.ph)<-0.20)continue;
          const wx=b.x+w.xf*(b.w-fw);
          const wy=bTop+w.yf*(b.h-fh*1.5)+fh;
          const col=w.warm?[255,200,80]:[180,220,255];
          ctx.fillStyle=`rgba(${col[0]},${col[1]},${col[2]},${0.22+Math.sin(w.ph)*0.07})`;
          ctx.fillRect(wx,wy,fw,fh);
        }

        /* Enseigne néon — clignotant rapide style Vegas */
        b.neonPh+=b.neonSpd*0.016;
        const np=Math.abs(Math.sin(b.neonPh));
        const nc=b.neonCol;
        if(np>0.15){
          /* Ligne néon sur le toit */
          ctx.strokeStyle=`rgba(${nc[0]},${nc[1]},${nc[2]},${np*0.90})`;
          ctx.lineWidth=W*0.007; ctx.lineCap='round';
          ctx.beginPath();
          ctx.moveTo(b.x+b.w*0.10,bTop-W*0.008);
          ctx.lineTo(b.x+b.w*0.90,bTop-W*0.008);
          ctx.stroke();
          /* Halo néon */
          const ng=ctx.createRadialGradient(b.x+b.w*0.5,bTop,0,b.x+b.w*0.5,bTop,b.w*1.1);
          ng.addColorStop(0,`rgba(${nc[0]},${nc[1]},${nc[2]},${np*0.30})`);
          ng.addColorStop(0.5,`rgba(${nc[0]},${nc[1]},${nc[2]},${np*0.10})`);
          ng.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=ng; ctx.fillRect(b.x-b.w*0.5,bTop-W*0.06,b.w*2,W*0.12);
        }
      }
    }

    function drawWater(){
      /* Plan d'eau sombre */
      const wg=ctx.createLinearGradient(0,waterY,0,H);
      wg.addColorStop(0,'rgba(10,5,20,0.97)');
      wg.addColorStop(1,'rgba(5,2,12,1.0)');
      ctx.fillStyle=wg; ctx.fillRect(0,waterY,W,H-waterY);

      /* Reflets bokeh dans l'eau */
      for(const b of bokeh){
        b.ph+=b.spd;
        const pulse=0.5+0.5*Math.sin(b.ph);
        const bg=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.rx*2);
        bg.addColorStop(0,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${b.op*pulse})`);
        bg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=bg;
        ctx.beginPath();ctx.ellipse(b.x,b.y,b.rx*2,b.ry*2,0,0,Math.PI*2);ctx.fill();
      }
      /* Reflet du ciel orange dans l'eau */
      const skyRef=ctx.createLinearGradient(0,waterY,0,waterY+H*0.04);
      skyRef.addColorStop(0,`rgba(200,80,20,${0.12+Math.sin(t*0.20)*0.03})`);
      skyRef.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=skyRef; ctx.fillRect(0,waterY,W,H*0.04);
      /* Ondulations */
      ctx.strokeStyle='rgba(80,40,120,0.08)'; ctx.lineWidth=0.5;
      for(let ri=0;ri<6;ri++){
        const ry=waterY+ri*(H-waterY)/6+Math.sin(t*0.5+ri*1.1)*H*0.003;
        ctx.beginPath();ctx.moveTo(0,ry);ctx.lineTo(W,ry);ctx.stroke();
      }
    }

    function drawFountains(){
      for(const nz of NOZZLES){
        nz.ph+=nz.spd;
        const power=Math.max(0,Math.sin(nz.ph)*0.5+0.5); /* 0→1 */
        if(power<0.08)continue;

        const maxH=H*(0.048+power*0.085); /* hauteur max du jet — modérée */
        const steps=14;

        /* Jet principal */
        ctx.beginPath();
        const jAlpha=(0.55+power*0.30)*0.85;
        const jwBase=W*(0.006+power*0.006);
        for(let si=0;si<=steps;si++){
          const pf=si/steps;
          const jx=nz.x;
          const jy=nz.baseY - maxH*Math.sin(pf*Math.PI); /* arc parabolique */
          const jw=jwBase*(1-pf*0.5);
          if(si===0){ctx.moveTo(jx-jw,jy);}
          else{
            ctx.lineTo(jx-jw,jy);
          }
        }
        for(let si=steps;si>=0;si--){
          const pf=si/steps;
          const jx=nz.x;
          const jy=nz.baseY - maxH*Math.sin(pf*Math.PI);
          const jw=jwBase*(1-pf*0.5);
          ctx.lineTo(jx+jw,jy);
        }
        ctx.closePath();
        /* Dégradé bleu-blanc sur le jet */
        const jg=ctx.createLinearGradient(nz.x,nz.baseY,nz.x,nz.baseY-maxH);
        jg.addColorStop(0,`rgba(100,160,255,${jAlpha*0.6})`);
        jg.addColorStop(0.4,`rgba(180,220,255,${jAlpha})`);
        jg.addColorStop(0.75,`rgba(220,240,255,${jAlpha*0.90})`);
        jg.addColorStop(1,`rgba(255,255,255,${jAlpha*0.70})`);
        ctx.fillStyle=jg; ctx.fill();

        /* Halo lumineux au sommet */
        const peakY=nz.baseY-maxH;
        const pg=ctx.createRadialGradient(nz.x,peakY,0,nz.x,peakY,W*0.038*power);
        pg.addColorStop(0,`rgba(200,230,255,${power*0.45})`);
        pg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=pg; ctx.fillRect(nz.x-W*0.04,peakY-W*0.04,W*0.08,W*0.08);

        /* Éclaboussures à la base */
        for(let si=0;si<4;si++){
          const sx=nz.x+(Math.sin(nz.ph*2+si*1.5))*W*0.025*power;
          const sy=nz.baseY-H*0.008;
          ctx.fillStyle=`rgba(160,200,255,${power*0.28})`;
          ctx.beginPath();ctx.ellipse(sx,sy,W*0.006*power,H*0.004*power,0,0,Math.PI*2);ctx.fill();
        }
      }
    }

    function drawCard(c){
      ctx.save();
      ctx.translate(c.x,c.y); ctx.rotate(c.rot);
      ctx.globalAlpha=c.op;

      const hw=c.cw/2, hh=c.ch/2;
      const r=c.cw*0.08; /* coins arrondis */

      /* Ombre portée */
      ctx.shadowColor='rgba(0,0,0,0.45)';
      ctx.shadowBlur=W*0.018;
      ctx.shadowOffsetX=W*0.005;
      ctx.shadowOffsetY=W*0.005;

      /* Fond blanc ivoire */
      ctx.fillStyle='rgba(252,248,238,0.97)';
      ctx.beginPath();
      ctx.moveTo(-hw+r,-hh);ctx.lineTo(hw-r,-hh);
      ctx.quadraticCurveTo(hw,-hh,hw,-hh+r);
      ctx.lineTo(hw,hh-r);ctx.quadraticCurveTo(hw,hh,hw-r,hh);
      ctx.lineTo(-hw+r,hh);ctx.quadraticCurveTo(-hw,hh,-hw,hh-r);
      ctx.lineTo(-hw,-hh+r);ctx.quadraticCurveTo(-hw,-hh,-hw+r,-hh);
      ctx.closePath(); ctx.fill();

      ctx.shadowColor='transparent'; /* reset shadow */

      /* Bordure */
      ctx.strokeStyle='rgba(180,165,145,0.50)'; ctx.lineWidth=W*0.002;
      ctx.beginPath();
      ctx.moveTo(-hw+r,-hh);ctx.lineTo(hw-r,-hh);
      ctx.quadraticCurveTo(hw,-hh,hw,-hh+r);
      ctx.lineTo(hw,hh-r);ctx.quadraticCurveTo(hw,hh,hw-r,hh);
      ctx.lineTo(-hw+r,hh);ctx.quadraticCurveTo(-hw,hh,-hw,hh-r);
      ctx.lineTo(-hw,-hh+r);ctx.quadraticCurveTo(-hw,-hh,-hw+r,-hh);
      ctx.closePath(); ctx.stroke();

      /* Couleur */
      const col=c.red?'#c01818':'#0a0a14';

      /* Symbole central — grand */
      ctx.fillStyle=col;
      ctx.font=`bold ${c.cw*0.52}px serif`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(c.suit,0,0);

      /* Rang + symbole — coin haut gauche */
      ctx.font=`bold ${c.cw*0.22}px sans-serif`;
      ctx.fillText(c.rank,-hw*0.60,-hh*0.62);
      ctx.font=`${c.cw*0.18}px serif`;
      ctx.fillText(c.suit,-hw*0.60,-hh*0.35);

      /* Rang + symbole — coin bas droit (inversé) */
      ctx.save();ctx.rotate(Math.PI);
      ctx.font=`bold ${c.cw*0.22}px sans-serif`;
      ctx.fillText(c.rank,-hw*0.60,-hh*0.62);
      ctx.font=`${c.cw*0.18}px serif`;
      ctx.fillText(c.suit,-hw*0.60,-hh*0.35);
      ctx.restore();

      /* Reflet glossy */
      const rg=ctx.createLinearGradient(-hw,-hh,-hw*0.1,hh*0.2);
      rg.addColorStop(0,'rgba(255,255,255,0.18)');
      rg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=rg;
      ctx.beginPath();
      ctx.moveTo(-hw+r,-hh);ctx.lineTo(hw-r,-hh);
      ctx.quadraticCurveTo(hw,-hh,hw,-hh+r);
      ctx.lineTo(hw,hh-r);ctx.quadraticCurveTo(hw,hh,hw-r,hh);
      ctx.lineTo(-hw+r,hh);ctx.quadraticCurveTo(-hw,hh,-hw,hh-r);
      ctx.lineTo(-hw,-hh+r);ctx.quadraticCurveTo(-hw,-hh,-hw+r,-hh);
      ctx.closePath(); ctx.fill();

      ctx.restore();
    }

    function frame(){
      if(stop.v)return;
      ctx.fillStyle='#0a0418'; ctx.fillRect(0,0,W,H);

      drawSky();
      drawSkyline();
      drawWater();
      drawFountains();

      /* Cartes */
      for(let ci=0;ci<cards.length;ci++){
        const c=cards[ci];
        c.x+=c.vx; c.y+=c.vy; c.rot+=c.rotSpd;
        if(c.y>H+c.ch) cards[ci]=mkCard();
        drawCard(c);
      }

      /* Vignette */
      const vg=ctx.createRadialGradient(cx,H*0.50,H*0.05,cx,H*0.50,H*0.88);
      vg.addColorStop(0,'rgba(0,0,0,0)');
      vg.addColorStop(0.50,'rgba(5,2,10,0.06)');
      vg.addColorStop(0.78,'rgba(5,2,10,0.52)');
      vg.addColorStop(1,'rgba(4,1,8,0.96)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      /* Grain */
      for(let i=0;i<18;i++){
        const gv=12+Math.random()*20|0;
        ctx.fillStyle=`rgba(${gv+15},${gv+8},${gv+22},${Math.random()*0.015})`;
        ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,1);
      }
      t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
