// CinéQuiz splash chunk — Men in Black
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Men in Black"]={
   name:'Men in Black',
   color:'40,40,180',
   ref:'Men in Black \u2014 Barry Sonnenfeld, 1997',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='0.82';
    let t=0;
    const cx=W/2, cy=H/2;

    /* Cleanup DOM éléments injectés */
    let _mibStyle=document.getElementById('_mib_pos_s');
    if(!_mibStyle){_mibStyle=document.createElement('style');_mibStyle.id='_mib_pos_s';document.head.appendChild(_mibStyle);}
    _mibStyle.textContent='#splash-content-wrap{top:20%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _mibW=setInterval(()=>{
     if(stop.v){
      _mibStyle.textContent='';
      ['_mib_fig','_mib_vig','_mib_fig_s','_mib_pos_s'].forEach(id=>{const el=document.getElementById(id);if(el&&el.parentNode)el.parentNode.removeChild(el);});
      clearInterval(_mibW);
     }
    },200);

    /* Étoiles / galaxies lointaines */
    const stars=Array.from({length:220},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+0.2,op:Math.random()*0.8+0.15,tw:Math.random()*Math.PI*2,tf:Math.random()*0.02+0.005}));

    /* OVNI volant */
    let ufoX=W*0.15, ufoY=H*0.22, ufoVx=0.8, ufoVy=0.3;
    let ufoBeam=0;

    /* ── Neuralyseur — flash blanc après 10s ── */
    let neuralT=0;          /* temps écoulé en frames */
    let neuralPhase=0;      /* 0=attente 1=clignotement 2=flash 3=fondu */
    let neuralBlink=0;      /* compteur de clignos */
    let neuralFlash=0;      /* opacité du flash (0→1→0) */

    function drawUFO(ux,uy){
     ctx.save(); ctx.translate(ux,uy);
     /* Halo bas */
     const halo=ctx.createRadialGradient(0,W*0.04,2,0,W*0.04,W*0.15);
     halo.addColorStop(0,`rgba(100,255,100,${0.25+Math.sin(t*3)*0.10})`);
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo; ctx.fillRect(-W*0.15,-W*0.05,W*0.30,W*0.22);
     /* Disque bas */
     ctx.fillStyle='rgba(40,40,40,0.96)';
     ctx.beginPath(); ctx.ellipse(0,W*0.03,W*0.12,W*0.035,0,0,Math.PI*2); ctx.fill();
     ctx.strokeStyle='rgba(80,255,80,0.55)'; ctx.lineWidth=1;
     ctx.beginPath(); ctx.ellipse(0,W*0.03,W*0.12,W*0.035,0,0,Math.PI*2); ctx.stroke();
     /* Dôme */
     const domeG=ctx.createRadialGradient(-W*0.03,-W*0.04,2,0,-W*0.01,W*0.065);
     domeG.addColorStop(0,'rgba(130,200,130,0.92)'); domeG.addColorStop(0.6,'rgba(50,100,50,0.85)'); domeG.addColorStop(1,'rgba(20,60,20,0.80)');
     ctx.fillStyle=domeG;
     ctx.beginPath(); ctx.ellipse(0,-W*0.01,W*0.065,W*0.06,0,0,-Math.PI); ctx.closePath(); ctx.fill();
     /* Lumières rotatives */
     for(let i=0;i<6;i++){
      const la=i/6*Math.PI*2+t*2.5;
      const lx=Math.cos(la)*W*0.095, ly=W*0.03+Math.sin(la)*W*0.020;
      const hue=(i/6*360+t*120)%360;
      ctx.fillStyle=`hsla(${hue},100%,65%,0.85)`;
      ctx.beginPath(); ctx.arc(lx,ly,2.5,0,Math.PI*2); ctx.fill();
     }
     ctx.restore();
    }

    /* ── SVG MiB injecté après curtain-open ── */
    function _mibInject(){
     if(document.getElementById('_mib_fig')) return;
     let _fs=document.getElementById('_mib_fig_s');
     if(!_fs){_fs=document.createElement('style');_fs.id='_mib_fig_s';document.head.appendChild(_fs);}
     _fs.textContent='@keyframes _mibBob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-6px)}}';
     const fig=document.createElement('div');fig.id='_mib_fig';
     Object.assign(fig.style,{
      position:'absolute',bottom:'8%',left:'50%',
      transform:'translateX(-50%)',
      zIndex:'6',width:'48%',maxWidth:'188px',
      opacity:'0',transition:'opacity 1.1s ease 0.3s',
      pointerEvents:'none',
      animation:'_mibBob 7s ease-in-out infinite',
     });
     fig.innerHTML=`<svg viewBox="0 0 124 216" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;"><path d="M36.3845 0.688857C39.1303 2.15756 41.1818 3.48614 43.3845 5.68886C44.0609 12.6225 44.4099 21.2338 41.3845 27.6889C39.6863 29.5112 37.9715 30.9575 35.9431 32.3998C34.0849 33.705 34.0849 33.705 33.3845 36.6889C32.7245 36.6889 32.0645 36.6889 31.3845 36.6889C31.3845 38.9989 31.3845 41.3089 31.3845 43.6889C32.4891 42.2725 33.5931 40.8558 34.697 39.4389C35.3119 38.65 35.9267 37.861 36.5603 37.0482C38.1883 34.9426 39.7938 32.8228 41.3845 30.6889C45.2794 32.1078 48.5898 33.9466 52.072 36.1889C53.0246 36.7973 53.9772 37.4057 54.9587 38.0326C57.3845 39.6889 57.3845 39.6889 59.3845 41.6889C60.375 51.0001 56.6856 59.7246 52.3728 67.7904C49.2866 76.8415 52.3294 87.5877 53.6755 96.807C54.9084 105.324 55.5223 113.597 55.3967 122.225C55.3797 127.047 55.8008 131.774 56.322 136.564C56.4525 137.852 56.4525 137.852 56.5857 139.165C56.9173 142.409 57.2505 145.65 57.6674 148.883C58.4783 155.321 58.5681 161.705 58.572 168.189C58.5842 169.265 58.5965 170.342 58.6091 171.451C58.6195 177.123 58.3054 182.296 56.8398 187.787C55.2841 194.285 56.815 200.653 58.1423 207.052C58.3845 209.689 58.3845 209.689 56.3845 212.689C54.0584 213.069 51.7239 213.402 49.3845 213.689C48.3945 214.349 47.4045 215.009 46.3845 215.689C43.6423 215.954 43.6423 215.954 40.5095 215.939C38.9665 215.947 38.9665 215.947 37.3923 215.954C34.3482 215.686 32.141 214.97 29.3845 213.689C29.6384 211.787 29.6384 211.787 30.3845 209.689C32.1618 208.747 32.1618 208.747 34.322 208.126C37.8274 207.102 38.2145 206.944 40.3845 203.689C40.5855 200.406 40.5855 200.406 40.3962 196.626C40.3739 195.927 40.3515 195.228 40.3285 194.507C40.2532 192.234 40.1628 189.962 40.072 187.689C40.0173 186.128 39.9633 184.567 39.9101 183.006C39.6035 174.271 39.2108 165.542 38.6921 156.817C38.2884 149.771 38.2896 142.744 38.3845 135.689C37.3945 135.689 36.4045 135.689 35.3845 135.689C35.3896 136.983 35.3946 138.278 35.3999 139.611C35.4356 153.012 35.2901 166.403 35.0122 179.801C34.9455 183.072 34.8867 186.342 34.8278 189.613C34.786 191.697 34.7437 193.781 34.7009 195.865C34.6842 196.84 34.6675 197.816 34.6502 198.822C34.6303 199.711 34.6104 200.601 34.5898 201.518C34.5743 202.302 34.5587 203.086 34.5427 203.894C34.3845 205.689 34.3845 205.689 33.3845 206.689C31.0515 206.73 28.7174 206.731 26.3845 206.689C26.3845 206.029 26.3845 205.369 26.3845 204.689C25.1676 205.184 23.9507 205.679 22.697 206.189C16.0238 208.438 8.10886 208.93 1.38448 206.689C1.87948 204.709 1.87948 204.709 2.38448 202.689C6.67448 201.699 10.9645 200.709 15.3845 199.689C19.225 177.606 19.0587 153.431 14.1032 131.552C12.3988 122.391 12.2258 113.235 12.2595 103.939C12.2556 102.855 12.2517 101.771 12.2478 100.654C12.2544 95.2251 12.4222 90.035 13.3845 84.6889C10.8262 83.2562 8.63422 82.4948 5.75948 81.7514C2.38448 80.6889 2.38448 80.6889 0.38448 77.6889C-0.84108 70.7741 0.988973 65.735 4.09151 59.6342C5.94885 55.4032 6.6652 51.0783 7.41573 46.5365C9.015 41.8354 12.2851 40.2903 16.4978 37.9857C18.0814 37.22 18.0814 37.22 19.697 36.4389C21.2999 35.6577 21.2999 35.6577 22.9353 34.8607C23.7435 34.474 24.5517 34.0873 25.3845 33.6889C25.7145 35.6689 26.0445 37.6489 26.3845 39.6889C27.3745 37.3789 28.3645 35.0689 29.3845 32.6889C28.7245 32.6889 28.0645 32.6889 27.3845 32.6889C27.2633 32.0482 27.1421 31.4075 27.0173 30.7475C26.2547 26.8112 25.4881 23.0113 24.2595 19.1889C23.1188 14.6263 22.4546 10.346 23.3845 5.68886C26.8761 0.986929 30.8337 -0.860193 36.3845 0.688857Z" fill="#050302"/><path d="M97.1347 2.12753C99.3847 3.69003 99.3847 3.69003 100.385 5.69003C101.011 11.9561 100.107 17.1066 98.123 23.0221C96.8037 27.7897 96.4173 32.7508 96.3847 37.69C96.7147 38.02 97.0447 38.35 97.3847 38.69C97.7147 37.37 98.0447 36.05 98.3847 34.69C101.944 35.3799 104.777 36.8312 107.947 38.565C108.897 39.0781 109.847 39.5911 110.826 40.1197C113.097 41.5132 114.774 42.5829 116.385 44.69C116.554 46.761 116.721 48.8323 116.869 50.9049C117.524 54.4415 118.919 57.3127 120.447 60.565C123.155 66.5739 124.888 72.105 123.385 78.69C121.37 81.4192 119.528 82.1517 116.26 82.815C112.623 83.2738 112.623 83.2738 111.385 84.69C111.321 86.9287 111.326 89.1694 111.357 91.4088C111.372 92.8221 111.386 94.2354 111.399 95.6488C111.407 96.3909 111.416 97.1329 111.424 97.8975C111.55 110.335 111.259 122.373 109.385 134.69C109.003 137.791 108.66 140.896 108.322 144.003C108.197 145.148 108.197 145.148 108.069 146.317C107.91 147.782 107.753 149.247 107.596 150.712C107.414 152.416 107.226 154.12 107.037 155.823C106.423 162.03 106.285 168.207 106.26 174.44C106.255 175.233 106.25 176.025 106.246 176.842C106.259 181.879 106.67 186.704 107.385 191.69C107.508 192.618 107.632 193.546 107.76 194.503C108.69 197.759 110.302 199.033 113.135 200.753C116.148 202.008 119.235 202.842 122.385 203.69C122.385 204.68 122.385 205.67 122.385 206.69C114.564 209.297 106.181 207.607 98.3847 205.69C98.0547 206.02 97.7247 206.35 97.3847 206.69C95.0518 206.731 92.7177 206.732 90.3847 206.69C89.131 202.845 89.2756 199.024 89.3222 195.03C89.326 194.285 89.3298 193.54 89.3337 192.772C89.35 189.599 89.3778 186.426 89.4053 183.254C89.4689 175.185 89.4823 167.247 88.6118 159.213C88.201 154.648 88.2801 150.082 88.3222 145.503C88.3268 144.551 88.3313 143.599 88.3359 142.618C88.3475 140.308 88.3638 137.999 88.3847 135.69C87.3947 135.69 86.4047 135.69 85.3847 135.69C85.3985 136.457 85.4123 137.225 85.4265 138.015C85.5064 146.563 85.2347 155.069 84.8418 163.608C84.7904 164.761 84.739 165.914 84.686 167.102C84.4705 171.925 84.2537 176.747 84.0129 181.568C83.8374 185.123 83.6816 188.678 83.5293 192.233C83.47 193.325 83.4108 194.416 83.3498 195.541C83.3095 196.553 83.2692 197.566 83.2278 198.609C83.1856 199.496 83.1434 200.384 83.0999 201.298C83.4503 204.24 84.3907 205.536 86.3847 207.69C88.3989 208.789 88.3989 208.789 90.5722 209.44C91.2877 209.682 92.0031 209.925 92.7402 210.174C93.2829 210.345 93.8256 210.515 94.3847 210.69C94.3847 211.68 94.3847 212.67 94.3847 213.69C90.5603 215.465 87.5281 215.961 83.3222 215.94C82.3 215.945 81.2778 215.95 80.2246 215.956C77.366 215.688 75.8463 215.083 73.3847 213.69C71.0604 212.993 68.728 212.321 66.3847 211.69C66.4569 210.879 66.5291 210.068 66.6035 209.233C67.4127 199.579 67.8917 190.475 66.3847 180.878C63.6314 162.686 66.3217 143.867 69.0176 125.784C69.3824 122.709 69.5212 119.782 69.3847 116.69C69.0547 116.36 68.7247 116.03 68.3847 115.69C68.4398 109.469 69.5895 103.252 70.5322 97.1165C73.4841 78.4731 73.4841 78.4731 68.6972 60.5103C67.4392 57.807 66.4556 55.1605 65.5722 52.315C65.3389 51.5648 65.1056 50.8146 64.8652 50.0416C64.2601 47.0801 64.012 44.7041 64.3847 41.69C66.3613 39.7135 66.3613 39.7135 69.0097 38.065C69.9172 37.4837 70.8247 36.9023 71.7597 36.3033C72.626 35.7709 73.4922 35.2385 74.3847 34.69C75.5967 33.8829 76.8058 33.0715 78.0097 32.2525C78.7935 31.7369 79.5772 31.2213 80.3847 30.69C84.4707 32.2177 86.183 34.8009 88.6347 38.315C89.3411 39.3179 90.0476 40.3208 90.7754 41.3541C91.3065 42.125 91.8376 42.8958 92.3847 43.69C92.4955 38.953 92.3955 36.4778 89.3847 32.69C88.2043 31.9905 87.016 31.304 85.8222 30.6275C83.2586 28.913 82.4851 27.9881 81.4863 25.0221C80.9408 21.9033 80.6054 18.8478 80.3847 15.69C80.2629 14.4003 80.2629 14.4003 80.1386 13.0846C79.9234 9.18993 80.0943 7.19565 82.0722 3.75253C87.2191 -0.837944 91.1203 -1.01637 97.1347 2.12753Z" fill="#050302"/></svg>`;
     const svgEl=fig.querySelector('svg');
     if(svgEl){
      /* Teinte légèrement les paths pour les rendre visibles sur fond noir */
      svgEl.querySelectorAll('path').forEach(p=>{
       if(p.getAttribute('fill')==='#050302') p.setAttribute('fill','#1c1e26');
      });
      svgEl.style.filter='drop-shadow(0 6px 18px rgba(0,0,0,.80))';
     }
     cv.parentElement.appendChild(fig);
     requestAnimationFrame(()=>requestAnimationFrame(()=>{fig.style.opacity='1';}));

     /* Halo au sol supprimé */
    }

    (function(){
     const _splash=document.getElementById('splash');
     if(!_splash) return;
     if(_splash.classList.contains('curtain-open')){
      _mibInject();
     } else {
      const _obs=new MutationObserver(function(mutations){
       for(const m of mutations){
        if(m.type==='attributes'&&m.attributeName==='class'){
         if(_splash.classList.contains('curtain-open')){_obs.disconnect();_mibInject();}
        }
       }
      });
      _obs.observe(_splash,{attributes:true,attributeFilter:['class']});
      const _chk=setInterval(()=>{if(stop.v){_obs.disconnect();clearInterval(_chk);}},200);
     }
    })();

    function drawMenInBlack(){}  /* remplacé par injection SVG */

    function frame(){
     if(stop.v)return;
     /* Fond espace noir */
     ctx.fillStyle='rgba(2,2,4,0.20)'; ctx.fillRect(0,0,W,H);

     /* Étoiles */
     for(const s of stars){ s.tw+=s.tf; const op=s.op*(0.6+Math.sin(s.tw)*0.4); ctx.fillStyle=`rgba(255,255,255,${op})`; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); }

     /* Galaxie spirale lointaine */
     const galG=ctx.createRadialGradient(W*0.22,H*0.18,2,W*0.22,H*0.18,W*0.12);
     galG.addColorStop(0,`rgba(200,180,255,${0.20+Math.sin(t*0.3)*0.05})`);
     galG.addColorStop(0.4,'rgba(140,100,200,0.08)'); galG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=galG; ctx.beginPath(); ctx.ellipse(W*0.22,H*0.18,W*0.12,W*0.05,-0.3,0,Math.PI*2); ctx.fill();

     /* OVNI */
     ufoX+=ufoVx; ufoY+=ufoVy+Math.sin(t*1.4)*0.5;
     if(ufoX>W*0.85||ufoX<W*0.15)ufoVx*=-1;
     if(ufoY>H*0.38||ufoY<H*0.08)ufoVy*=-1;
     drawUFO(ufoX,ufoY);

     /* Rayon tracteur */
     ufoBeam+=0.02;
     const beamAlpha=Math.max(0,Math.sin(ufoBeam)*0.25);
     if(beamAlpha>0.02){
      const bg=ctx.createLinearGradient(ufoX,ufoY+W*0.04,ufoX,H*0.72);
      bg.addColorStop(0,`rgba(80,255,80,${beamAlpha})`); bg.addColorStop(1,'rgba(80,255,80,0)');
      ctx.fillStyle=bg;
      const beamW=W*0.06+Math.sin(ufoBeam*3)*W*0.02;
      ctx.beginPath();
      ctx.moveTo(ufoX-W*0.04,ufoY+W*0.04);
      ctx.lineTo(ufoX+W*0.04,ufoY+W*0.04);
      ctx.lineTo(ufoX+beamW,H*0.72);
      ctx.lineTo(ufoX-beamW,H*0.72);
      ctx.closePath(); ctx.fill();
     }

     /* Silhouettes MiB */
     drawMenInBlack();

     /* Sol réfléchissant — plus contrasté */
     const floor=ctx.createLinearGradient(0,H*0.88,0,H);
     floor.addColorStop(0,'rgba(16,18,22,0.97)'); floor.addColorStop(1,'rgba(6,7,9,1.0)');
     ctx.fillStyle=floor; ctx.fillRect(0,H*0.88,W,H*0.12);
     /* Ligne de sol lumineuse — halo vert au pied des agents */
     const lineG=ctx.createLinearGradient(cx-W*0.35,H*0.88,cx+W*0.35,H*0.88);
     lineG.addColorStop(0,'rgba(40,160,60,0)');
     lineG.addColorStop(0.5,'rgba(40,160,60,0.22)');
     lineG.addColorStop(1,'rgba(40,160,60,0)');
     ctx.fillStyle=lineG; ctx.fillRect(cx-W*0.35,H*0.875,W*0.70,H*0.006);
     /* Reflets silhouettes sur le sol */
     const rg=ctx.createLinearGradient(0,H*0.88,0,H*0.97);
     rg.addColorStop(0,`rgba(35,38,45,${0.30+Math.sin(t*0.5)*0.05})`); rg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=rg; ctx.fillRect(cx-W*0.32,H*0.88,W*0.64,H*0.09);

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,cy,H*0.04,cx,cy,H*0.90);
     vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(0.45,'rgba(0,0,0,0.10)'); vg.addColorStop(1,'rgba(0,0,0,0.95)');
     ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

     /* ── Neuralyseur — séquence flash ── */
     neuralT++;
     /* Phase 0 → attente 10s (600 frames @60fps) */
     if(neuralPhase===0 && neuralT>600){
      neuralPhase=1; neuralBlink=0;
     }
     /* Phase 1 → petit cercle rouge clignote 3×  */
     if(neuralPhase===1){
      const blinkCycle=Math.floor((neuralT-600)/18);
      const blinkOn=((neuralT-600)%18)<9;
      if(blinkOn){
       ctx.save();
       ctx.fillStyle=`rgba(255,30,30,${0.85+Math.sin(neuralT*0.8)*0.15})`;
       ctx.shadowColor='rgba(255,60,60,0.9)';ctx.shadowBlur=12;
       ctx.beginPath();ctx.arc(ufoX+W*0.095,ufoY+W*0.03,4,0,Math.PI*2);ctx.fill();
       ctx.restore();
      }
      if(blinkCycle>=3){ neuralPhase=2; }
     }
     /* Phase 2 → flash blanc total */
     if(neuralPhase===2){
      neuralFlash=Math.min(1,neuralFlash+0.12);
      ctx.save();
      const flashG=ctx.createRadialGradient(cx,H*0.35,0,cx,H*0.35,H*0.8);
      flashG.addColorStop(0,`rgba(255,255,255,${neuralFlash})`);
      flashG.addColorStop(0.4,`rgba(220,240,255,${neuralFlash*0.9})`);
      flashG.addColorStop(1,`rgba(180,220,255,${neuralFlash*0.5})`);
      ctx.fillStyle=flashG;ctx.fillRect(0,0,W,H);
      ctx.restore();
      if(neuralFlash>=1){ neuralPhase=3; }
     }
     /* Phase 3 → fondu retour */
     if(neuralPhase===3){
      neuralFlash=Math.max(0,neuralFlash-0.018);
      ctx.save();
      const fadeG=ctx.createRadialGradient(cx,H*0.35,0,cx,H*0.35,H*0.8);
      fadeG.addColorStop(0,`rgba(255,255,255,${neuralFlash})`);
      fadeG.addColorStop(0.4,`rgba(220,240,255,${neuralFlash*0.9})`);
      fadeG.addColorStop(1,`rgba(180,220,255,${neuralFlash*0.5})`);
      ctx.fillStyle=fadeG;ctx.fillRect(0,0,W,H);
      ctx.restore();
      if(neuralFlash<=0){ neuralPhase=0; neuralT=0; } /* relance le cycle */
     }

     t+=0.016; requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
