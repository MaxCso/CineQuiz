// CinéQuiz splash chunk — Inglourious Basterds
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Inglourious Basterds"]={
   name:'Inglourious Basterds',
   color:'200,140,40',
   ref:'Inglourious Basterds \u2014 Quentin Tarantino, 2009',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';let t=0;const cx=W/2;
    let _s=document.getElementById('_ib_s');
    if(!_s){_s=document.createElement('style');_s.id='_ib_s';document.head.appendChild(_s);}
    _s.textContent='#splash-content-wrap{top:24%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _w=setInterval(()=>{if(stop.v){_s.textContent='';clearInterval(_w);}},200);

    /* Particules de cendres */
    const ashes=Array.from({length:35},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vx:(Math.random()-0.5)*0.20,vy:-(0.06+Math.random()*0.10),
     r:Math.random()*1.6+0.3,op:0.08+Math.random()*0.18,
     ph:Math.random()*Math.PI*2,
    }));

    /* Silhouette soldat — chargée en canvas via Path2D */
    const _soldierPath=new Path2D('M15.771 1L11.771 0C11.5835 2.125 11.5835 2.125 11.771 5C13.5043 8.39426 14.745 10.5304 14.9585 14.375L14.771 17C17.1669 16.8755 17.1669 16.8755 19.771 18C21.6949 21.1883 21.6949 21.1883 22.6497 23.6272L23.521 25.9375C26.0532 32.3435 27.6607 38.0491 27.771 45H25.771V55C22.5325 55.8096 19.3687 56.4386 16.0835 57C14.307 57.3012 12.534 57.627 10.771 58C9.74766 59.1925 9.74766 59.1925 7.70464 59.5352L5.20855 60.0625L2.70464 60.5977L0.771046 61L0.146046 62.75C-0.315567 65.5197 0.341596 66.6456 1.77105 69C6.26099 68.8013 10.4893 68.4063 14.7906 67.043C17.771 65.9602 20.7336 64.9117 23.771 64C28.1975 63.3205 31.4222 63.2104 35.3335 65.5C37.0831 68.0888 37.0831 68.0888 36.896 71.9375C36.6991 75.4496 37.1706 77.7992 38.771 81H40.771C40.771 83 40.771 83 41.7242 85.1719L43.021 87.75C44.2522 90.1983 45.4476 92.5419 47.0289 94.7812C49.0784 97.4757 49.8179 98.5499 49.4585 102C48.771 105 48.771 105 49.271 108C49.8185 111.285 49.4644 113.764 48.771 117H46.771L45.771 119C44.8416 125.271 43.9845 131.099 46.771 137H48.771V139H50.771C52.9606 144.748 53.3625 148.782 51.771 154.75C51.392 156.155 51.0618 157.574 50.771 159C50.3833 164.018 49.9215 167.726 52.771 172C55.7322 172.729 55.7322 172.729 57.2007 174.488C58.6867 176.364 60.1899 178.204 61.771 180L64.4585 182C69.0438 185.966 70.0792 191.518 70.7457 197.303L70.9585 199.438C71.2405 201.958 71.5136 204.477 71.771 207H69.771L68.3335 208.977L66.771 211.625C61.2854 220.759 57.5592 233.295 58.771 244C61.771 246 61.771 246 63.9585 246.625L65.771 247C65.9877 253.57 66.208 260.141 66.4332 266.711L66.4682 267.728C66.5719 270.741 66.6756 273.753 66.7753 276.766C66.883 280.047 66.9924 283.329 67.1056 286.61L67.2359 290.359L67.3528 294.009L67.4739 297.405C67.5651 300.104 67.6757 302.58 68.273 305.212C68.8328 307.048 68.8328 307.048 69.0364 309.195L69.2359 311.555C69.3962 313.328 69.5537 315.101 69.7085 316.875L69.7449 317.31C70.1109 321.694 70.4637 325.92 71.6734 330.172L72.771 333L74.0601 336.648L75.396 340.375C76.187 342.584 76.9786 344.792 77.771 347H79.771C79.7286 349.333 79.7301 351.667 79.771 354C81.7881 356.745 81.7881 356.745 83.146 359.938C84.4195 362.652 84.4195 362.652 85.771 365L88.771 367C89.5111 369.599 90.1205 372.108 90.646 374.75L182.771 374C183.386 370.436 183.776 367.148 183.65 363.527C183.203 358.459 182.771 353.426 182.771 348.336C182.906 340.738 182.7 333.396 180.771 326C178.526 323.074 178.526 323.074 178.146 319.312L177.771 316H175.771C176.021 313.938 176.021 313.938 175.771 311C172.542 305.951 171.256 302.311 170.757 296.324C170.64 294.501 170.512 292.678 170.375 290.855L170.166 288.227C170.07 286.815 169.949 285.404 169.771 284C168.437 281.735 168.437 281.735 168.521 278.875C168.443 276.617 168.443 276.617 167.771 274C162.997 268.357 162.258 265.051 162.433 257.648C162.829 248.211 162.926 238.838 162.117 229.424L161.834 226.438C161.652 224.488 161.469 222.539 161.287 220.59C160.856 216.053 160.498 211.518 160.224 206.969L160.084 204.5C159.808 200.236 159.672 196.164 160.224 191.918C160.743 188.204 161.005 184.555 161.209 180.812C161.326 178.537 161.509 176.263 161.771 174C163.167 169.542 164.956 167.711 168.771 165C168.672 167.372 168.617 169.635 168.771 172C171.08 183.384 171.08 183.384 171.209 195.062C171.268 201.489 170.661 208.266 173.248 214.273C174.792 217.038 175.69 218.834 175.771 222C172.392 226.432 171.326 229.139 171.419 234.57L171.521 236.875C171.583 239.586 171.662 242.291 171.771 245H173.771L174.771 252L177.334 252.141C184.04 252.354 190.584 252.854 195.771 248C199.272 242.796 199.272 242.796 198.877 226.184L198.771 223H200.771L201.771 221L204.771 220L204.777 218.974C204.864 202.788 204.952 186.598 204.511 170.417L204.396 166.688C204.198 159.191 204.59 150.993 200.785 144.254C198.348 140.336 197.287 137.418 196.912 132.797L196.91 132.77C196.553 127.258 196.219 122.093 193.771 117.062C192.588 114.817 191.775 113.017 191.244 110.523C190.697 107.076 190.145 103.889 188.787 100.66C186.596 96.7275 185.473 95.2661 181.146 93.625L177.771 93C173.667 90.2642 170.944 89.0385 165.959 88.875L162.771 89V85L153.771 83V81H151.771V79C148.771 77 148.771 77 146.084 76.375L143.771 76V72L140.771 71L141.771 61H143.771C146.059 57.2536 146.059 57.2536 145.738 47.6016L145.584 44L145.488 40.3984L145.353 36.9375C145.229 33.5994 145.087 31.5558 143.434 28.6445C141.771 27 141.771 27 138.584 26.75L135.771 27C135.771 23 135.771 23 133.771 20L130.771 19C125.018 16.6196 119.982 15.4169 113.771 15V17C109.223 17 106.758 17.8588 102.771 20C100.62 23.6554 100.648 26.8072 100.95 30.9766C101.429 36.5247 101.859 42.0388 101.669 47.6094C101.442 54.1196 101.081 59.6929 104.271 65.625C106.786 69.7626 107.293 72.1957 106.771 77H104.771V79H102.771C102.09 81.3347 102.09 81.3347 100.771 84C98.0835 86.1875 98.0835 86.1875 95.771 89C95.6606 91.7607 95.9505 94.261 96.3765 96.9883L96.771 99L93.771 101V103C90.896 103.25 90.896 103.25 87.771 104L86.646 105.938C85.9324 108.189 85.9324 108.189 83.646 109.25L81.771 110L82.5835 112.438C81.6708 119.173 81.6708 119.173 77.771 125C76.2738 122.125 76.2738 122.125 76.3335 118.625C76.0943 114.767 75.9643 113.29 73.771 110C72.4297 109.35 71.0957 108.684 69.771 108C69.1571 106.158 68.5072 104.327 67.7984 102.52L66.7085 99.8125C66.0635 98.208 65.418 96.6037 64.771 95H62.771C62.771 92 62.771 92 62.3335 89.7383L61.771 87.3125C61.4407 85.8743 61.1084 84.4366 60.771 83L56.771 82C56.2603 78.7312 55.3703 75.7727 54.2085 72.6875L52.771 69H54.771L53.771 65H49.771L45.771 57H43.771C43.0842 54.9394 42.3509 52.8938 41.5796 50.8633L40.2085 47.3125C39.3967 45.2081 38.5844 43.1038 37.771 41H35.771V39H33.771C33.771 37 33.771 37 32.7046 34.6719L31.2085 31.75C29.7618 28.8807 28.3122 26.0146 26.7999 23.1792L25.814 21.3398C25.1748 20.1223 24.5355 18.9049 23.896 17.6875C21.8307 13.8385 20.7945 11.4708 20.5757 7.08203L20.771 4L15.771 3V1Z');

    function drawSoldier(){
     /* SVG viewBox: 0 0 205 375 — on scale pour une hauteur cible */
     const tgtH=H*0.38;
     const tgtW=tgtH*(205/375);
     const sx=cx-tgtW/2;
     const sy=H*0.88-tgtH; /* pieds à 88% de l'écran */
     const scaleX=tgtW/205, scaleY=tgtH/375;
     ctx.save();
     ctx.translate(sx,sy);
     ctx.scale(scaleX,scaleY);
     /* Légère lueur rouge derrière */
     ctx.shadowColor='rgba(160,10,10,0.45)';
     ctx.shadowBlur=22;
     ctx.fillStyle='#0e0505';
     ctx.fill(_soldierPath);
     ctx.shadowBlur=0;
     ctx.restore();
    }

    function drawPine(px,baseY,h,w,col){
     ctx.fillStyle=col;
     /* Tronc */
     ctx.fillRect(px-w*0.05,baseY-h*0.14,w*0.10,h*0.15);
     /* 5 étages de branches — plus naturels */
     const nLevels=5;
     for(let li=0;li<nLevels;li++){
      const ratio=li/nLevels;
      const ly=baseY-h*(0.12+ratio*0.86);
      const lw=w*(0.90-ratio*0.68);
      const lh=h*(0.20+ratio*0.06);
      /* Triangle principal */
      ctx.beginPath();
      ctx.moveTo(px,ly-lh*0.5);
      ctx.lineTo(px+lw/2,ly+lh*0.5);
      ctx.lineTo(px-lw/2,ly+lh*0.5);
      ctx.closePath();ctx.fill();
      /* Petites branches latérales sur les niveaux inférieurs */
      if(li<3){
       const bw=lw*0.28,bh=lh*0.45;
       ctx.beginPath();
       ctx.moveTo(px-lw*0.30,ly+lh*0.10);
       ctx.lineTo(px-lw*0.30-bw,ly+lh*0.10+bh);
       ctx.lineTo(px-lw*0.10,ly+lh*0.10+bh*0.5);
       ctx.closePath();ctx.fill();
       ctx.beginPath();
       ctx.moveTo(px+lw*0.30,ly+lh*0.10);
       ctx.lineTo(px+lw*0.30+bw,ly+lh*0.10+bh);
       ctx.lineTo(px+lw*0.10,ly+lh*0.10+bh*0.5);
       ctx.closePath();ctx.fill();
      }
     }
    }

    /* Forêt — 3 rangées avec profondeur */
    const pines=[];
    /* Rangée lointaine */
    for(let i=0;i<22;i++)
     pines.push({x:W*(i/21)*1.06-W*0.03,h:H*(0.09+Math.random()*0.04),w:W*(0.026+Math.random()*0.014),layer:0});
    /* Rangée intermédiaire */
    for(let i=0;i<17;i++)
     pines.push({x:W*(i/16)*1.08-W*0.04,h:H*(0.13+Math.random()*0.05),w:W*(0.032+Math.random()*0.016),layer:1});
    /* Rangée avant */
    for(let i=0;i<13;i++)
     pines.push({x:W*(i/12)*1.10-W*0.05,h:H*(0.18+Math.random()*0.07),w:W*(0.042+Math.random()*0.020),layer:2});

    function frame(){
     if(stop.v)return;

     /* Fond rouge sang */
     const bg=ctx.createLinearGradient(0,0,0,H);
     bg.addColorStop(0.00,'#6b0000');
     bg.addColorStop(0.30,'#8b0000');
     bg.addColorStop(0.60,'#9a0400');
     bg.addColorStop(0.85,'#4a0000');
     bg.addColorStop(1.00,'#1a0000');
     ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

     /* Texture rouge subtile */
     const tex=ctx.createRadialGradient(cx*0.6,H*0.25,0,cx*0.6,H*0.25,W*0.85);
     tex.addColorStop(0,'rgba(180,30,10,0.12)');
     tex.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=tex;ctx.fillRect(0,0,W,H);

     /* Colline */
     const hillY=H*0.88;
     const hillG=ctx.createLinearGradient(0,hillY,0,H);
     hillG.addColorStop(0,'#180404');hillG.addColorStop(1,'#0a0202');
     ctx.fillStyle=hillG;
     ctx.beginPath();
     ctx.moveTo(-5,H);ctx.lineTo(-5,hillY+H*0.04);
     ctx.quadraticCurveTo(cx*0.4,hillY-H*0.03,cx,hillY);
     ctx.quadraticCurveTo(cx*1.6,hillY+H*0.03,W+5,hillY+H*0.02);
     ctx.lineTo(W+5,H);ctx.closePath();ctx.fill();

     /* Rangée lointaine */
     for(const p of pines)
      if(p.layer===0) drawPine(p.x,hillY,p.h,p.w,'rgba(55,5,5,0.68)');

     /* Brume entre rangées 0 et 1 */
     const mist1=ctx.createLinearGradient(0,hillY-H*0.14,0,hillY-H*0.04);
     mist1.addColorStop(0,'rgba(0,0,0,0)');
     mist1.addColorStop(0.5,'rgba(100,8,8,0.18)');
     mist1.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mist1;ctx.fillRect(0,hillY-H*0.14,W,H*0.10);

     /* Rangée intermédiaire */
     for(const p of pines)
      if(p.layer===1) drawPine(p.x,hillY,p.h,p.w,'rgba(28,4,4,0.85)');

     /* Brume entre rangées 1 et 2 */
     const mist2=ctx.createLinearGradient(0,hillY-H*0.22,0,hillY-H*0.10);
     mist2.addColorStop(0,'rgba(0,0,0,0)');
     mist2.addColorStop(0.5,'rgba(80,5,5,0.14)');
     mist2.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mist2;ctx.fillRect(0,hillY-H*0.22,W,H*0.12);

     /* Rangée avant */
     for(const p of pines)
      if(p.layer===2) drawPine(p.x,hillY,p.h,p.w,'rgba(14,2,2,0.97)');

     /* Soldat — dessiné en même temps que le décor */
     drawSoldier();

     /* Cendres */
     for(const a of ashes){
      a.x+=a.vx;a.y+=a.vy;a.ph+=0.018;
      if(a.y<0){a.y=H;a.x=Math.random()*W;}
      if(a.x<0)a.x=W;if(a.x>W)a.x=0;
      ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(220,80,40,${a.op*(0.4+0.6*Math.abs(Math.sin(a.ph)))})`;ctx.fill();
     }

     /* Vignette */
     const vig=ctx.createRadialGradient(cx,H*0.50,H*0.10,cx,H*0.50,H*0.82);
     vig.addColorStop(0,'rgba(0,0,0,0)');
     vig.addColorStop(0.7,'rgba(40,0,0,0.15)');
     vig.addColorStop(1,'rgba(20,0,0,0.60)');
     ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);

     /* Grain pellicule */
     for(let i=0;i<22;i++){
      ctx.fillStyle=`rgba(180,20,0,${Math.random()*0.028})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2.4+0.3,0.8);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
