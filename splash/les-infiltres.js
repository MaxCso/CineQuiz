// CinéQuiz splash chunk — Les infiltrés
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Les infiltrés"]={
   name:"Les infiltr\u00e9s",
   ref:"The Departed \u2014 Martin Scorsese, 2006",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;

    /* ── CSS ── */
    let _s=document.getElementById('_dep_s');
    if(!_s){_s=document.createElement('style');_s.id='_dep_s';document.head.appendChild(_s);}
    _s.textContent=`
     

     #splash-content-wrap{top:20%!important;bottom:auto!important;transform:none!important;}
     #splash-content-wrap.reveal{transform:none!important;}
     #splash-quote-text{
       color:rgba(230,215,200,0.90)!important;
       text-shadow:0 2px 18px rgba(0,0,0,1),0 0 28px rgba(160,20,20,0.35)!important;
     }
     #splash-film-logo{
       filter:drop-shadow(0 4px 24px rgba(0,0,0,0.98)) drop-shadow(0 0 12px rgba(180,30,30,0.30))!important;
     }
    `;
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── Pluie ── */
    const rain=Array.from({length:220},()=>({
     x:Math.random()*W*1.3-W*0.15,
     y:Math.random()*H,
     len:H*(0.025+Math.random()*0.045),
     spd:H*(0.022+Math.random()*0.018),
     op:0.12+Math.random()*0.28,
     angle:0.12,
    }));

    /* ── Éclaboussures ── */
    const splashes=Array.from({length:18},()=>({
     x:Math.random()*W, y:H*0.84+Math.random()*H*0.12,
     r:0, maxR:W*(0.008+Math.random()*0.012),
     spd:W*0.0035+Math.random()*W*0.002,
     op:0, active:false, timer:Math.random()*120,
    }));

    /* ── Skyline Boston ── */
    const buildings=[];
    (function genSkyline(){
     let bx=0;
     while(bx<W){
      const bw=W*(0.04+Math.random()*0.08);
      const bh=H*(0.08+Math.random()*0.22);
      const floors=Math.floor(bh/(H*0.022));
      const winCols=Math.floor(bw/(W*0.012));
      buildings.push({x:bx,w:bw,h:bh,floors,winCols,
       winLit:Array.from({length:floors*winCols},()=>Math.random()<0.35),
      });
      bx+=bw+W*0.004;
     }
    })();

    /* ── As de pique ── */
    const spadeCard={rot:0,rotSpd:0.006,x:cx*1.20,y:H*0.52,size:W*0.055,bob:0};

    /* ── Lampadaire ── */
    function drawLamppost(lx){
     const lbase=H*0.84;
     ctx.strokeStyle='rgba(35,28,22,0.95)';ctx.lineWidth=W*0.012;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(lx,lbase);ctx.lineTo(lx,lbase-H*0.28);ctx.stroke();
     ctx.beginPath();ctx.moveTo(lx,lbase-H*0.28);ctx.lineTo(lx+W*0.04,lbase-H*0.30);ctx.stroke();
     ctx.fillStyle='rgba(30,22,15,0.95)';
     ctx.beginPath();ctx.roundRect(lx+W*0.028,lbase-H*0.318,W*0.030,W*0.014,W*0.003);ctx.fill();
     const lampG=ctx.createRadialGradient(lx+W*0.043,lbase-H*0.311,0,lx+W*0.043,lbase-H*0.311,W*0.12);
     lampG.addColorStop(0,`rgba(255,190,80,${0.65+Math.sin(t*0.18)*0.06})`);
     lampG.addColorStop(0.30,'rgba(210,140,40,0.25)');
     lampG.addColorStop(0.60,'rgba(160,90,20,0.10)');
     lampG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=lampG;ctx.fillRect(lx-W*0.08,lbase-H*0.44,W*0.22,H*0.30);
    }

    /* ── Silhouettes ── */
    function drawSilhouettes(){
     const baseY=H*0.84;
     const gap=W*0.14;
     for(const [side,sx] of [[-1,cx-gap],[1,cx+gap]]){
      const refG=ctx.createLinearGradient(sx,baseY,sx,baseY+H*0.07);
      refG.addColorStop(0,`rgba(180,60,40,${0.20+Math.sin(t*0.12)*0.04})`);
      refG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=refG;
      ctx.beginPath();ctx.ellipse(sx,baseY+H*0.022,W*0.022,H*0.040,0,0,Math.PI*2);ctx.fill();
     }
     for(const [side,sx] of [[-1,cx-gap],[1,cx+gap]]){
      const h=H*0.195;
      ctx.save();ctx.translate(sx,baseY);ctx.scale(side,1);
      const hCol=side===-1?'160,25,25':'25,40,140';
      const haloG=ctx.createRadialGradient(0,-h*0.40,0,0,-h*0.40,W*0.14);
      haloG.addColorStop(0,`rgba(${hCol},${0.30+Math.sin(t*0.10)*0.05})`);
      haloG.addColorStop(0.5,`rgba(${hCol},0.10)`);
      haloG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=haloG;
      ctx.beginPath();ctx.ellipse(0,-h*0.40,W*0.14,h*0.75,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(4,2,3,0.98)';
      ctx.beginPath();ctx.moveTo(-W*0.025,0);ctx.lineTo(-W*0.028,-h*0.44);ctx.lineTo(-W*0.008,-h*0.44);ctx.lineTo(-W*0.005,0);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.moveTo(W*0.005,0);ctx.lineTo(W*0.008,-h*0.44);ctx.lineTo(W*0.028,-h*0.44);ctx.lineTo(W*0.025,0);ctx.closePath();ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-W*0.032,-h*0.44);
      ctx.bezierCurveTo(-W*0.040,-h*0.64,-W*0.038,-h*0.78,-W*0.020,-h*0.84);
      ctx.lineTo(W*0.020,-h*0.84);
      ctx.bezierCurveTo(W*0.038,-h*0.78,W*0.040,-h*0.64,W*0.032,-h*0.44);
      ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.moveTo(W*0.032,-h*0.72);ctx.bezierCurveTo(W*0.055,-h*0.68,W*0.075,-h*0.60,W*0.085,-h*0.52);ctx.lineTo(W*0.070,-h*0.50);ctx.bezierCurveTo(W*0.060,-h*0.58,W*0.042,-h*0.66,W*0.018,-h*0.70);ctx.closePath();ctx.fill();
      ctx.fillStyle='rgba(8,4,5,0.95)';
      ctx.beginPath();ctx.roundRect(W*0.078,-h*0.55,W*0.020,W*0.032,W*0.003);ctx.fill();
      ctx.fillStyle=`rgba(180,220,255,${0.40+Math.sin(t*0.30+side)*0.12})`;
      ctx.beginPath();ctx.roundRect(W*0.080,-h*0.548,W*0.016,W*0.026,W*0.002);ctx.fill();
      ctx.fillStyle='rgba(4,2,3,0.98)';
      ctx.beginPath();ctx.moveTo(-W*0.032,-h*0.72);ctx.bezierCurveTo(-W*0.050,-h*0.64,-W*0.052,-h*0.50,-W*0.044,-h*0.40);ctx.lineTo(-W*0.030,-h*0.42);ctx.bezierCurveTo(-W*0.036,-h*0.52,-W*0.034,-h*0.64,-W*0.018,-h*0.70);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.arc(0,-h*0.92,W*0.024,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(0,-h*0.98,W*0.030,W*0.008,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.roundRect(-W*0.024,-h*1.04,W*0.048,h*0.065,W*0.004);ctx.fill();
      ctx.restore();
     }
    }

    /* ── As de pique ── */
    function drawSpadeCard(){
     const {x,y,size,rot}=spadeCard;
     spadeCard.rot+=spadeCard.rotSpd;
     spadeCard.bob+=0.025;
     const by=y+Math.sin(spadeCard.bob)*H*0.008;
     ctx.save();ctx.translate(x,by);ctx.rotate(rot);
     const cw=size*1.4,ch=size*2.0;
     ctx.fillStyle='rgba(0,0,0,0.45)';
     ctx.beginPath();ctx.roundRect(-cw/2+3,-ch/2+4,cw,ch,W*0.010);ctx.fill();
     ctx.fillStyle='rgba(240,232,222,0.92)';
     ctx.beginPath();ctx.roundRect(-cw/2,-ch/2,cw,ch,W*0.010);ctx.fill();
     ctx.strokeStyle='rgba(160,145,130,0.45)';ctx.lineWidth=0.8;
     ctx.strokeRect(-cw/2+W*0.004,-ch/2+W*0.004,cw-W*0.008,ch-W*0.008);
     ctx.fillStyle='rgba(10,6,8,0.95)';
     const s=size*0.55;
     ctx.beginPath();
     ctx.moveTo(0,-s*0.78);
     ctx.bezierCurveTo(s*0.80,-s*0.78,s*0.80,s*0.10,0,s*0.10);
     ctx.bezierCurveTo(-s*0.80,s*0.10,-s*0.80,-s*0.78,0,-s*0.78);
     ctx.bezierCurveTo(-s*0.10,s*0.10,-s*0.28,s*0.55,0,s*0.55);
     ctx.bezierCurveTo(-s*0.28,s*0.55,-s*0.42,s*0.70,-s*0.42,s*0.78);
     ctx.lineTo(s*0.42,s*0.78);
     ctx.bezierCurveTo(s*0.42,s*0.70,s*0.28,s*0.55,0,s*0.55);
     ctx.bezierCurveTo(s*0.28,s*0.55,s*0.10,s*0.10,0,-s*0.78);
     ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(10,6,8,0.92)';
     ctx.font=`bold ${size*0.35}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
     ctx.fillText('A',-cw*0.32,-ch*0.40);
     ctx.font=`${size*0.28}px serif`;ctx.fillText('\u2660',-cw*0.32,-ch*0.28);
     ctx.save();ctx.rotate(Math.PI);
     ctx.font=`bold ${size*0.35}px serif`;ctx.fillText('A',-cw*0.32,-ch*0.40);
     ctx.font=`${size*0.28}px serif`;ctx.fillText('\u2660',-cw*0.32,-ch*0.28);
     ctx.restore();
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     const sky=ctx.createLinearGradient(0,0,0,H);
     sky.addColorStop(0,'rgba(6,2,4,1)');sky.addColorStop(0.30,'rgba(10,3,5,1)');
     sky.addColorStop(0.55,'rgba(14,4,6,1)');sky.addColorStop(0.75,'rgba(18,5,7,1)');
     sky.addColorStop(1,'rgba(10,3,4,1)');
     ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

     const bloodG=ctx.createRadialGradient(cx,H*0.74,0,cx,H*0.74,W*0.70);
     bloodG.addColorStop(0,`rgba(140,20,15,${0.28+Math.sin(t*0.09)*0.04})`);
     bloodG.addColorStop(0.35,'rgba(100,12,10,0.14)');
     bloodG.addColorStop(0.70,'rgba(60,6,6,0.05)');
     bloodG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=bloodG;ctx.fillRect(0,H*0.40,W,H*0.60);

     const skylineY=H*0.60;
     for(const b of buildings){
      const by=skylineY-b.h;
      ctx.fillStyle='rgba(6,3,4,0.97)';ctx.fillRect(b.x,by,b.w,b.h);
      const fw=b.w*0.18,fh=b.h/b.floors*0.30;
      for(let row=0;row<b.floors;row++){
       for(let col=0;col<b.winCols;col++){
        const wi=row*b.winCols+col;
        if(!b.winLit[wi])continue;
        if(Math.random()<0.0008)b.winLit[wi]=false;
        const wx=b.x+b.w*(col+0.5)/b.winCols-fw/2;
        const wy=by+b.h*(row+0.5)/b.floors-fh/2;
        ctx.fillStyle=Math.random()<0.15?'rgba(180,120,60,0.75)':'rgba(200,180,120,0.55)';
        ctx.fillRect(wx,wy,fw,fh);
       }
      }
      if(b.h>H*0.12){
       ctx.strokeStyle='rgba(20,10,12,0.85)';ctx.lineWidth=W*0.004;
       ctx.beginPath();ctx.moveTo(b.x+b.w/2,by);ctx.lineTo(b.x+b.w/2,by-H*0.035);ctx.stroke();
       if(Math.sin(t*1.8)>0){ctx.fillStyle='rgba(220,30,30,0.80)';ctx.beginPath();ctx.arc(b.x+b.w/2,by-H*0.038,W*0.004,0,Math.PI*2);ctx.fill();}
      }
     }

     const floorY=H*0.84;
     const floorG=ctx.createLinearGradient(0,floorY,0,H);
     floorG.addColorStop(0,'rgba(12,4,5,1)');floorG.addColorStop(1,'rgba(5,2,3,1)');
     ctx.fillStyle=floorG;ctx.fillRect(0,floorY,W,H-floorY);

     ctx.save();ctx.translate(0,floorY*2);ctx.scale(1,-1);ctx.globalAlpha=0.12;
     for(const b of buildings){ctx.fillStyle='rgba(6,3,4,0.80)';ctx.fillRect(b.x,H*0.60-b.h,b.w,b.h);}
     ctx.restore();

     const puddles=[{x:cx-W*0.20,y:floorY+H*0.035,rx:W*0.08,ry:H*0.012},{x:cx+W*0.15,y:floorY+H*0.055,rx:W*0.06,ry:H*0.010},{x:cx-W*0.40,y:floorY+H*0.065,rx:W*0.04,ry:H*0.008}];
     for(const p of puddles){
      const pG=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.rx);
      pG.addColorStop(0,`rgba(160,30,20,${0.22+Math.sin(t*0.12+p.x)*0.04})`);
      pG.addColorStop(0.5,'rgba(80,15,10,0.10)');pG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pG;ctx.beginPath();ctx.ellipse(p.x,p.y,p.rx,p.ry,0,0,Math.PI*2);ctx.fill();
     }

     drawLamppost(cx-W*0.22);drawLamppost(cx+W*0.22);
     drawSilhouettes();
     drawSpadeCard();

     ctx.strokeStyle='rgba(160,175,200,1)';
     for(const r of rain){
      r.y+=r.spd;r.x+=r.spd*r.angle;
      if(r.y>H+r.len){r.y=-r.len;r.x=(Math.random()*W*1.3-W*0.15);}
      ctx.globalAlpha=r.op;ctx.lineWidth=0.6;
      ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+r.len*r.angle,r.y+r.len);ctx.stroke();
     }
     ctx.globalAlpha=1;

     for(const sp of splashes){
      sp.timer--;
      if(sp.timer<=0&&!sp.active){sp.active=true;sp.r=0;sp.op=0.60;sp.x=Math.random()*W;sp.y=floorY+H*0.01+Math.random()*H*0.08;sp.timer=60+Math.random()*120;}
      if(sp.active){sp.r+=sp.spd;sp.op-=0.025;if(sp.op<=0)sp.active=false;ctx.strokeStyle=`rgba(160,175,200,${sp.op*0.60})`;ctx.lineWidth=0.7;ctx.beginPath();ctx.ellipse(sp.x,sp.y,sp.r,sp.r*0.28,0,0,Math.PI*2);ctx.stroke();}
     }

     const vg=ctx.createRadialGradient(cx,H*0.50,H*0.05,cx,H*0.50,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(0.40,'rgba(5,2,2,0.06)');
     vg.addColorStop(0.65,'rgba(5,2,2,0.42)');vg.addColorStop(0.85,'rgba(4,1,2,0.76)');
     vg.addColorStop(1,'rgba(3,0,1,0.96)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     const tb=ctx.createLinearGradient(0,0,0,H*0.15);
     tb.addColorStop(0,'rgba(6,2,4,0.92)');tb.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tb;ctx.fillRect(0,0,W,H*0.15);

     for(let i=0;i<28;i++){const gv=3+Math.random()*10|0;ctx.fillStyle=`rgba(${gv+12},${gv+4},${gv+5},${Math.random()*0.014})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.5+0.3,1);}

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
