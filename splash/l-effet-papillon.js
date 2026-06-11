// CinéQuiz splash chunk — L'effet papillon
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["L'effet papillon"]={
   name:"L'effet papillon",
   color:'60,40,120',
   ref:"The Butterfly Effect \u2014 Eric Bress, 2004",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2,cy=H*0.38;
    let _s=document.getElementById('_ep_s');
    if(!_s){_s=document.createElement('style');_s.id='_ep_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:70%!important;transform:translateY(-50%)!important;}#splash-content-wrap.reveal{transform:translateY(-50%)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* ── SVG papillon — recolorisé en blanc pour teinte via canvas ── */
    const BF_RATIO=1280/805;
    const bfB64='PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTI4MC4wMDAwMDBwdCIgaGVpZ2h0PSI4MDUuMDAwMDAwcHQiIHZpZXdCb3g9IjAgMCAxMjgwLjAwMDAwMCA4MDUuMDAwMDAwIgogcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+CjxtZXRhZGF0YT4KQ3JlYXRlZCBieSBwb3RyYWNlIDEuMTUsIHdyaXR0ZW4gYnkgUGV0ZXIgU2VsaW5nZXIgMjAwMS0yMDE3CjwvbWV0YWRhdGE+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDgwNS4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiCmZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSI+CjxwYXRoIGQ9Ik0xMTczMCA4MDM0IGMtMjUyIC0zNCAtNjA3IC0xMjEgLTg0MCAtMjA0IC0zODIgLTEzNyAtOTc0IC00MTgKLTEzMTAgLTYyMyAtNDkzIC0zMDAgLTk2OCAtNjY5IC0xNTY1IC0xMjEzIC00NDIgLTQwMyAtNzQyIC03NjEgLTk4MCAtMTE2OQotMzIgLTU1IC02OSAtMTE3IC04MiAtMTM3IC01MCAtODEgLTEwNCAtMjggLTExMSAxMTAgLTQgNjUgLTIgNzcgMjIgMTEyIDE4CjI3IDI2IDUzIDI2IDgyIDAgMzcgLTYgNDcgLTQ5IDg5IC0yNyAyNiAtNjMgNTAgLTgwIDU0IC0xNyA0IC0zMSAxMSAtMzEgMTcgMAoxOSAxMTAgMTk2IDE4NCAyOTYgODEgMTA4IDE0MSAxNzkgMzY1IDQyNyAxNjQgMTgyIDI4NyAzMzIgMzY4IDQ1MyAzNyA1NCA5NwoxMjIgMTc5IDE5OCAxMDQgOTggMTg0IDE5MiAxODQgMjE3IDAgMTUgLTU1IDYgLTg2IC0xNCAtMTkgLTExIC02OSAtNjYgLTExMgotMTIyIC00MyAtNTYgLTg4IC0xMTMgLTEwMCAtMTI3IC0xMSAtMTQgLTcyIC05MCAtMTMzIC0xNzAgLTE0NyAtMTkxIC0yOTEKLTM2MiAtNjA2IC03MjAgbC0yNTkgLTI5NSAtOTEgLTggYy04MyAtOCAtOTYgLTcgLTE2MSAxNiAtNjQgMjQgLTc4IDM0IC0xNjgKMTI5IC01NSA1NyAtMjQxIDI0NyAtNDE0IDQyMyAtMzU4IDM2MyAtNDc0IDQ4OCAtNjc2IDczMSAtMTMyIDE1OCAtMTgyIDIwNAotMjIzIDIwNCAtMzkgMCA3NiAtMTU3IDIxOCAtMjk2IDczIC03MSAxNjAgLTE2MyAxOTQgLTIwNCAxMjAgLTE0NyAyMDUgLTIzNgo0MzIgLTQ1MiAzMTMgLTI5OCA0OTkgLTUwMiA1NzcgLTYzNiBsMTggLTMwIC0zOCAtMTkgYy00NSAtMjMgLTgyIC04OSAtODIKLTE0NiAwIC0yMSAxMCAtNjEgMjEgLTg4IDE4IC00MSAyMSAtNjIgMTYgLTExMyAtNyAtNzQgLTMyIC0xMzMgLTYxIC0xNDIgLTI0Ci04IC00OSAxOCAtMTkyIDIwMiAtNTY2IDcyNCAtMTM5NyAxNDE1IC0yNDMzIDIwMjMgLTUwOSAyOTkgLTEzMTggNjIxIC0xOTI4Cjc2NyAtMzAxIDcyIC00NzUgOTYgLTcyOCAxMDEgLTM0MCA4IC01MTggLTIzIC03MzIgLTEyNyBsLTEwMiAtNTAgLTQ2IC03OApjLTU5IC0xMDIgLTEwNCAtMjE4IC0xMTIgLTI5MiAtNSAtNTQgLTMgLTY3IDIzIC0xMTggMjcgLTU0IDI5IC02NiAzNSAtMjIyIDUKLTE1MCA4IC0xNzAgMzIgLTIyMCAxNCAtMzAgNDAgLTExMyA1NyAtMTg1IDE3IC03MSA0MiAtMTQ5IDU2IC0xNzIgMTQgLTI0IDYxCi03MyAxMDUgLTExMCA5MyAtNzggMTIxIC0xMjEgMTQzIC0yMTYgOSAtMzggMzEgLTEwMSA0OSAtMTQwIDM1IC03NiAxNTAgLTI1MQoxOTcgLTMwMiA0NyAtNTEgNTMgLTczIDYxIC0yMzIgbDggLTE1MSA1NSAtMTI5IGM3NyAtMTg1IDExMyAtMjk0IDEzMCAtNDAzCjI3IC0xNjcgOTAgLTM1MSAxNjggLTQ5MCA3NSAtMTMyIDIwNCAtMzA2IDI3OSAtMzc2IDUyIC00OCAxNjIgLTc4IDM0NyAtOTQKMTQxIC0xMiAzMDYgLTMgNjE2IDM1IDExMyAxNCAyNDcgMjggMjk4IDMxIGw5MyA3IC05MCAtNjMgYy0yMTYgLTE1MSAtNDQ0Ci0zNDAgLTQ5OCAtNDEyIC0xNCAtMTggLTkwIC0xNjEgLTE2OSAtMzE4IC0xNzcgLTM1MSAtMjI4IC00OTggLTIyOCAtNjYyIDAKLTUxIDUgLTY4IDQwIC0xMjUgOTcgLTE2MSAxNjAgLTQyMiAxNjAgLTY2MCAwIC01MyAyIC01OCA0NCAtOTcgMjA0IC0xOTIgMjM4Ci0yMzcgMzU4IC00NzAgbDcyIC0xNDEgMTE3IC01OCBjNjQgLTMxIDE5NSAtMTA5IDI5MCAtMTcyIDE1MSAtMTAwIDE3NyAtMTIwCjE5NCAtMTU3IDI4IC01OCAxMDUgLTEzMyAxNzQgLTE2NyA4MCAtNDEgMTczIC02NyAzNDYgLTk2IDIwMyAtMzUgMjY2IC01MQozNTcgLTkyIGw3NyAtMzYgMTEzIDYgYzE4MSA5IDMzNyAyNiAzNjEgMzggMTMgNyA3NyAxMyAxNjIgMTQgMTMxIDEgMTQ2IDMKMjI3IDMzIDQ3IDE4IDE2NCA3MCAyNjAgMTE3IDk1IDQ3IDIxMSA5OCAyNTcgMTEyIGw4NCAyNiA2MiA5NiBjMjIwIDMzNiAzMjIKNTg5IDYxNCAxNTE0IDEwMyAzMjMgMTg1IDU1MyAyMDkgNTgwIDkgMTEgMjYgMTcgNDEgMTUgMjIgLTMgMjggLTExIDM5IC01MwozMiAtMTI3IDM3IC0yNzMgMTggLTYxMSAtMTkgLTMzNSAtMTcgLTQ0MSAxMSAtNTg5IDI1IC0xMzggMTEyIC0zMjcgMTU1IC0zNDEKNDkgLTE1IDgyIDI1IDEzNiAxNjMgMTAxIDI1OSAxMTIgNDczIDUzIDEwMjQgLTQwIDM3NiAtNDcgNDk5IC0yOCA0OTkgOCAwIDE5Ci02IDI1IC0xMyA2IC03IDYzIC0xNjQgMTI1IC0zNDggMzEzIC05MTcgNTc2IC0xNTc2IDcwNCAtMTc2NSAyMyAtMzMgNjAgLTc3CjgzIC05OCA0MSAtMzcgMTMxIC04NiAxNTkgLTg2IDggMCA1MCAtMjMgOTQgLTUxIDIwMyAtMTMwIDM1OSAtMTY0IDgyNyAtMTc5CjE2OCAtNSAzMjEgLTEyIDM0MSAtMTUgMjYgLTMgNTcgNCAxMTYgMjkgMTYyIDY5IDQxMSAxNDAgNjM1IDE4MSBsOTcgMTggMzgKNTYgYzExMCAxNTkgMzE5IDMyNiA1ODMgNDYzIDUyIDI3IDEwMSA1NSAxMDggNjIgNyA3IDMzIDY2IDU4IDEzMiA0NiAxMjMgOTAKMjAxIDEyOCAyMzIgMTIgOSAyOCAzMSAzNSA0OSAxNCAzNCA2NyA4OCAxNzAgMTc0IDk2IDgwIDExMSAxMTYgMTExIDI1OSAwCjE4MCAyNyAyNzIgMTU2IDUzMiBsNzMgMTQ3IC0yMCA3OCBjLTQ4IDE4MSAtMTI0IDM1NCAtMzAzIDY4MyAtOTkgMTgyIC0xMjUKMjIzIC0xNzQgMjY4IC03MyA2OSAtMjA5IDE1OSAtNDQzIDI5NiAtMTcwIDk5IC0yNjcgMTYzIC0yMjkgMTUxIDM1IC0xMSA0NTAKLTQ1IDYxNSAtNTEgMjgxIC0xMCA2NzIgMjggNzYzIDc1IDQ4IDI1IDU2IDM0IDE0MiAxNzYgMTc4IDI5NSAyNzAgNTQ2IDI3MAo3MzYgMCA2MiA5IDk4IDcwIDI3OCA4MSAyMzggMTA4IDM1NCAxMTcgNTAxIDYgMTAxIDcgMTA2IDQwIDE0NSA1MSA1OSAxMTQKMTk3IDE4MyAzOTggNzAgMjA1IDEwMCAyNjkgMTY5IDM2MSAyOCAzNyA1NCA3NCA1OSA4NCAxNiAzMSAzMSAxMDUgNDIgMjE3IDcKNjEgMjMgMTQzIDM2IDE4MyAyOSA4OSAzMCAxMjUgMyAyMzEgLTIyIDg5IC0yMCAxNTIgNiAxODcgMjIgMjkgMTkgMTMzIC02CjE5OCAtMTE3IDMxNCAtNTUxIDQ4NyAtMTA0OSA0MjB6Ii8+CjwvZz4KPC9zdmc+Cg==';

    /* Créer un canvas off-screen colorisé pour chaque teinte de papillon */
    const BF_COLORS=[
     [180,140,255], /* violet clair */
     [130,180,255], /* bleu ciel */
     [200,160,255], /* lavande */
     [160,220,255], /* cyan bleu */
     [220,180,255], /* mauve */
    ];
    /* Pré-rendre le papillon en blanc sur canvas off-screen */
    const bfOffCv=document.createElement('canvas');
    const bfW=Math.round(W*0.28*BF_RATIO), bfH=Math.round(W*0.28);
    bfOffCv.width=bfW; bfOffCv.height=bfH;
    const bfOff=bfOffCv.getContext('2d');
    /* Charger SVG et inverser fill noir→blanc */
    const svgStr=atob(bfB64).replace('fill="#000000"','fill="#ffffff"');
    const bfImg=new Image();
    bfImg.src='data:image/svg+xml;base64,'+btoa(svgStr);
    let bfReady=false;
    bfImg.onload=()=>{
     bfOff.drawImage(bfImg,0,0,bfW,bfH);
     bfReady=true;
    };

    /* ── Papillons en vol ── */
    const butterflies=Array.from({length:5},(_,i)=>{
     const angle=Math.random()*Math.PI*2;
     const spd=0.14+Math.random()*0.18;
     return {
      x:Math.random()*W, y:Math.random()*H,
      vx:Math.cos(angle)*spd, vy:Math.sin(angle)*spd*0.5,
      wingT:Math.random()*Math.PI*2,
      wingSpd:0.030+Math.random()*0.025,
      baseScale:0.08+Math.random()*0.14,
      op:0.30+Math.random()*0.45,
      col:BF_COLORS[i%BF_COLORS.length],
      glint:Math.random()*Math.PI*2,
     };
    });

    /* ── Particules mémoire — plus nombreuses et diversifiées ── */
    const sparks=Array.from({length:160},()=>({
     x:Math.random()*W, y:Math.random()*H,
     vx:(Math.random()-0.5)*0.30, vy:(Math.random()-0.5)*0.22,
     r:Math.random()*1.5+0.2,
     op:0.10+Math.random()*0.28,
     ph:Math.random()*Math.PI*2,
     col:Math.random()<0.5?`180,140,255`:Math.random()<0.5?`120,200,255`:`255,180,255`,
     trail:Math.random()<0.3, /* 30% ont une traînée */
     px:0,py:0,
    }));

    /* ── Orbes lumineux flottants ── */
    const orbs=Array.from({length:8},()=>({
     x:cx+(Math.random()-0.5)*W*0.80,
     y:cy+(Math.random()-0.5)*H*0.60,
     r:W*(0.025+Math.random()*0.040),
     op:0.10+Math.random()*0.18,
     ph:Math.random()*Math.PI*2,
     spd:0.008+Math.random()*0.010,
     col:Math.random()<0.5?`160,100,255`:`80,180,255`,
    }));

    /* ── Fractures temporelles ── */
    const fractures=Array.from({length:7},(_,i)=>({
     angle:(Math.PI*2/7)*i+Math.random()*0.3,
     len:W*(0.25+Math.random()*0.25),
     op:0.07+Math.random()*0.09,
     ph:Math.random()*Math.PI*2,
     spd:0.007+Math.random()*0.007,
    }));

    /* ── Anneaux vortex ── */
    const rings=Array.from({length:5},(_,i)=>({
     r:W*(0.055+i*0.070),
     ph:i*Math.PI*0.4,
     spd:0.012-i*0.0014,
    }));

    function drawBf(b){
     if(!bfReady)return;
     const bw=W*b.baseScale*BF_RATIO;
     const bh=W*b.baseScale;
     /* Canvas off-screen temporaire pour teinte */
     const tc=document.createElement('canvas');
     tc.width=Math.ceil(bw);tc.height=Math.ceil(bh);
     const tx=tc.getContext('2d');
     /* Dessiner la forme blanche */
     tx.drawImage(bfOffCv,0,0,Math.ceil(bw),Math.ceil(bh));
     /* Coloriser via source-atop */
     tx.globalCompositeOperation='source-atop';
     const [r,g,bl]=b.col;
     tx.fillStyle=`rgba(${r},${g},${bl},1)`;
     tx.fillRect(0,0,Math.ceil(bw),Math.ceil(bh));
     /* Battement d'ailes : scaleY animé */
     const flap=1+Math.sin(b.wingT)*0.22;
     const drift=Math.sin(b.wingT*0.55)*3;
     ctx.save();
     ctx.translate(b.x,b.y+drift);
     ctx.scale(1,flap);
     ctx.globalAlpha=b.op*(0.65+Math.abs(Math.sin(b.glint))*0.35);
     ctx.globalCompositeOperation='screen';
     ctx.drawImage(tc,-bw*0.5,-bh*0.5,bw,bh);
     ctx.restore();
     /* Halo doux */
     ctx.save();
     ctx.globalAlpha=b.op*0.15;
     const gl=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,bw*0.5);
     gl.addColorStop(0,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},0.6)`);
     gl.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=gl;
     ctx.fillRect(b.x-bw*0.5,b.y-bh*0.5,bw,bh);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Fond — bleu nuit profond avec trail */
     ctx.fillStyle='rgba(6,12,42,0.25)';
     ctx.fillRect(0,0,W,H);
     if(t===0){ctx.fillStyle='#060c2a';ctx.fillRect(0,0,W,H);}

     /* ── VORTEX TEMPOREL — spirale bien visible ── */

     /* Halo central fort */
     const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.55);
     halo.addColorStop(0,`rgba(130,90,255,${0.32+Math.sin(t*0.32)*0.08})`);
     halo.addColorStop(0.15,`rgba(100,60,220,0.22)`);
     halo.addColorStop(0.40,`rgba(60,40,180,0.12)`);
     halo.addColorStop(0.70,`rgba(30,20,100,0.05)`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);

     /* Éclat de lumière pulsant au centre */
     const burst=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.12);
     burst.addColorStop(0,`rgba(255,240,255,${0.18+Math.sin(t*1.8)*0.10})`);
     burst.addColorStop(0.3,`rgba(200,160,255,${0.10+Math.sin(t*1.8)*0.05})`);
     burst.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=burst;ctx.fillRect(cx-W*0.12,cy-W*0.12,W*0.24,W*0.24);

     /* Spirale double — effet vortex temporel */
     ctx.save();ctx.translate(cx,cy);
     for(let arm=0;arm<2;arm++){
      const armOffset=arm*Math.PI;
      ctx.beginPath();
      for(let i=0;i<=200;i++){
       const angle=i*0.08+t*0.55+armOffset;
       const r=i*W*0.0018*(1+Math.sin(t*0.25)*0.08);
       const x=Math.cos(angle)*r;
       const y=Math.sin(angle)*r*0.65;
       const alpha=0.55*(1-i/200)*(0.6+0.4*Math.sin(t*0.8+i*0.05));
       if(i===0){ctx.moveTo(x,y);}else{ctx.lineTo(x,y);}
      }
      const spiralGrad=ctx.createLinearGradient(-W*0.35,-W*0.20,W*0.35,W*0.20);
      spiralGrad.addColorStop(0,`rgba(220,180,255,0.80)`);
      spiralGrad.addColorStop(0.4,`rgba(140,100,255,0.65)`);
      spiralGrad.addColorStop(0.7,`rgba(80,60,200,0.40)`);
      spiralGrad.addColorStop(1,'rgba(40,20,120,0.10)');
      ctx.strokeStyle=spiralGrad;
      ctx.lineWidth=arm===0?1.8:1.2;
      ctx.stroke();
     }
     ctx.restore();

     /* Anneaux vortex — plus visibles */
     for(const rg of rings){
      rg.ph+=rg.spd;
      const ringR=rg.r*(1+Math.sin(rg.ph*0.7)*0.05);
      const ringAlpha=0.18+0.14*Math.abs(Math.sin(rg.ph));
      ctx.beginPath();ctx.arc(cx,cy,ringR,0,Math.PI*2);
      ctx.strokeStyle=`rgba(180,140,255,${ringAlpha})`;
      ctx.lineWidth=1.2;ctx.stroke();
      /* Reflet intérieur plus fin */
      ctx.beginPath();ctx.arc(cx,cy,ringR*0.94,0,Math.PI*2);
      ctx.strokeStyle=`rgba(220,190,255,${ringAlpha*0.35})`;
      ctx.lineWidth=0.5;ctx.stroke();
     }

     /* Rayons temporels — remplacent les fractures trop fines */
     for(const fr of fractures){
      fr.ph+=fr.spd;
      const fo=0.28+0.20*Math.abs(Math.sin(fr.ph));
      const r1=W*0.06, r2=fr.len;
      const grad=ctx.createLinearGradient(
       cx+Math.cos(fr.angle)*r1, cy+Math.sin(fr.angle)*r1,
       cx+Math.cos(fr.angle)*r2, cy+Math.sin(fr.angle)*r2);
      grad.addColorStop(0,`rgba(230,200,255,${fo})`);
      grad.addColorStop(0.4,`rgba(160,110,255,${fo*0.55})`);
      grad.addColorStop(1,'rgba(80,40,180,0)');
      ctx.beginPath();
      ctx.moveTo(cx+Math.cos(fr.angle)*r1, cy+Math.sin(fr.angle)*r1);
      ctx.lineTo(cx+Math.cos(fr.angle)*r2, cy+Math.sin(fr.angle)*r2);
      ctx.strokeStyle=grad;ctx.lineWidth=1.0;ctx.stroke();
     }

     /* Nucleus central brillant */
     const nuc=ctx.createRadialGradient(cx,cy,0,cx,cy,W*0.042);
     nuc.addColorStop(0,`rgba(255,240,255,${0.85+Math.sin(t*1.2)*0.12})`);
     nuc.addColorStop(0.3,`rgba(200,160,255,0.65)`);
     nuc.addColorStop(0.7,`rgba(120,80,255,0.25)`);
     nuc.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=nuc;ctx.beginPath();ctx.arc(cx,cy,W*0.042,0,Math.PI*2);ctx.fill();

     /* Particules — avec traînées pour certaines */
     for(const sp of sparks){
      sp.px=sp.x; sp.py=sp.y;
      sp.x+=sp.vx;sp.y+=sp.vy;sp.ph+=0.017;
      if(sp.x<0)sp.x=W;if(sp.x>W)sp.x=0;
      if(sp.y<0)sp.y=H;if(sp.y>H)sp.y=0;
      const alpha=sp.op*(0.3+0.7*Math.abs(Math.sin(sp.ph)));
      if(sp.trail && sp.px!==0){
       ctx.beginPath();ctx.moveTo(sp.px,sp.py);ctx.lineTo(sp.x,sp.y);
       ctx.strokeStyle=`rgba(${sp.col},${alpha*0.5})`;ctx.lineWidth=sp.r*0.7;ctx.stroke();
      }
      ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${sp.col},${alpha})`;
      ctx.fill();
     }

     /* Orbes lumineux flottants */
     for(const ob of orbs){
      ob.ph+=ob.spd;
      const pulse=0.7+0.3*Math.sin(ob.ph);
      const gr=ctx.createRadialGradient(ob.x,ob.y,0,ob.x,ob.y,ob.r*3);
      gr.addColorStop(0,`rgba(${ob.col},${ob.op*pulse*1.4})`);
      gr.addColorStop(0.4,`rgba(${ob.col},${ob.op*pulse*0.5})`);
      gr.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=gr;ctx.fillRect(ob.x-ob.r*3,ob.y-ob.r*3,ob.r*6,ob.r*6);
      /* Noyau brillant */
      ctx.beginPath();ctx.arc(ob.x,ob.y,ob.r*0.35*pulse,0,Math.PI*2);
      ctx.fillStyle=`rgba(240,220,255,${ob.op*pulse*1.2})`;ctx.fill();
     }

     /* Papillons */
     for(const b of butterflies){
      b.x+=b.vx;b.y+=b.vy;b.wingT+=b.wingSpd;b.glint+=0.022;
      if(b.x<-W*0.15)b.vx=Math.abs(b.vx);
      if(b.x>W*1.15)b.vx=-Math.abs(b.vx);
      if(b.y<-H*0.10)b.vy=Math.abs(b.vy);
      if(b.y>H*1.10)b.vy=-Math.abs(b.vy);
      drawBf(b);
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,cy,H*0.10,cx,cy,H*0.72);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.5,`rgba(4,8,28,${0.20+Math.sin(t*0.20)*0.04})`);
     vg.addColorStop(1,'rgba(3,6,22,0.92)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
