// CinéQuiz splash chunk — James Bond
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["James Bond"]={
   name:'James Bond',
   color:'150,10,10',
   ref:'James Bond \u2014 Eon Productions, 1962\u2013',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;
    const cx=W/2;
    /* Centre légèrement en haut comme l'affiche */
    const spX=cx, spY=H*0.40;
    const cy=spY;

    /* Couleurs strictes — noir + beige, rien d'autre */
    const BG   ='rgb(6,5,3)';
    const BEIGE='rgb(185,165,122)';

    /* Rotation animée lente */
    let rot=0;

    /* Taille du cercle central — petit, discret */
    const innerR=W*0.13;

    /* Coup de feu */
    let shotTimer=380, shotCooldown=420, flashAlpha=0, bloodY=0, bloodActive=false;

    /* Watcher stop — indispensable pour terminer le splash */
    const _jbW=setInterval(()=>{if(stop.v)clearInterval(_jbW);},200);

    /* ── Position citation + logo à 60% ── */
    const _jbStyle=document.createElement('style');
    _jbStyle.id='_jb_pos';
    _jbStyle.textContent='#splash-content-wrap{top:70%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}#splash-film-logo{max-width:60%!important;}';
    document.head.appendChild(_jbStyle);
    const _jbPosW=setInterval(()=>{if(stop.v){_jbStyle.textContent='';clearInterval(_jbPosW);}},200);

    /* Particules orbitales dans la spirale */
    const _bondParticles=Array.from({length:40},()=>({
     angle:Math.random()*Math.PI*2,
     dist:W*(0.06+Math.random()*0.42),
     spd:(Math.random()-0.5)*0.006,
     r:Math.random()*1.4+0.3,
     op:0.06+Math.random()*0.16,
     ph:Math.random()*Math.PI*2,
     warm:Math.random()<0.6,
    }));

    /* ── SVG Bond ── */
    const _b1=new Path2D('M483.304 909.482C484.303 894.022 488.713 878.056 492.046 863.206C495.327 848.589 499.27 834.413 502.318 819.744C505.055 810.912 509.581 803.908 517.609 799.07C528.439 792.534 544.275 792.326 555.961 786.23C565.701 781.146 574.028 774.065 578.749 763.974C588.269 743.625 582.692 718.295 579.812 697.037C578.191 685.105 575.299 672.343 575.299 660.294C575.299 646.105 565.623 627.286 562.576 613.084C558.962 595.919 556.033 578.616 553.795 561.218C549.153 526.866 545.934 492.337 544.146 457.719C543.549 445.463 544.716 431.494 538.556 420.366C525.651 397.047 491.761 387.812 468.428 379.265C454.083 373.999 439.648 368.773 426.017 361.782C416.238 356.763 392.866 345.622 389.066 334.416C382.438 314.87 386.783 289.021 358.587 300.565C358.016 300.798 359.261 289.32 359.663 288.036C361.116 283.406 363.554 279.113 366.2 275.053C371.687 266.61 378.431 259.061 383.761 250.488C388.288 243.212 385.292 233.005 387.964 225.055L393.164 204.692C420.608 182.021 418.806 144.707 414.655 140.142C413.41 137.444 409.908 136.419 409.182 135.641C407.301 133.67 407.639 125.823 408.611 120.946C416.082 107.587 412.775 81.8295 411.05 73.1138C409.714 66.6419 406.186 59.6901 403.216 52.9717C395.642 35.7998 389.196 17.7459 367.925 11.0535C339.846 3.64773 268.888 5.96932 236.723 44.9175C208.812 73.5807 221.108 149.246 215.868 150.362C214.765 149.558 209.915 151.944 209.642 157.495C207.567 171.399 207.956 204.044 228.267 218.44C231.717 220.697 229.369 236.533 229.369 242.24C228.85 254.69 240.264 273.38 239.486 279.605C239.486 288.944 236.321 294.469 244.155 299.06C249.823 302.782 282.429 314.935 279.887 328.475C278.317 336.854 282.921 349.759 285.36 357.735C287.772 365.673 290.379 375.841 295.619 382.43C304.555 393.674 328.925 364.181 334.917 358.954C356.927 347.1 367.925 381.82 386.55 389.433C406.861 474.074 397.587 631.722 392.477 666.221C385.837 699.981 383.165 675.533 383.165 675.533C379.637 600.438 254.077 320.175 230.809 315.804C212.223 306.855 202.885 334.429 185.103 334.429C179.916 325.933 183.353 316.906 189.254 310.564C201.77 302.056 198.021 297.231 192.12 292.407C187.295 288.114 184.17 279.035 187.218 271.071C188.67 262.356 186.673 250.787 179.384 243.562C174.65 238.867 154.586 233.641 159.683 225.171C161.745 221.747 171.848 222.837 174.987 220.891C183.91 215.327 179.877 208.038 171.031 206.754C163.185 205.613 159.358 199.349 158.126 190.996C156.998 183.292 159.371 175.536 159.631 167.845C159.761 164.213 159.799 160.426 158.502 156.963C157.154 153.371 153.25 151.464 151.914 148.507C151.771 148.183 151.2 147.158 151.654 139.35C151.784 136.99 155.221 140.142 155.403 137.301C154.767 137.612 163.262 3.29755 163.275 3.01222C162.782 0.366385 142.42 -0.956537 141.175 0.794381C141.447 1.02784 133.717 135.913 133.86 136.069C133.821 138.598 138.036 136.419 137.984 138.637C138.244 140.959 137.53 147.664 137.245 150.232C117.803 164.213 130.903 204.394 102.992 212.578C84.3673 218.025 99.5938 244.341 93.2127 255.261C89.0494 262.369 81.2675 265.78 77.9213 274.21C74.7827 282.147 74.3676 291.045 74.7567 299.475C75.5349 316.803 84.3932 325.57 84.3673 349.694C84.3413 369.33 102.149 383.091 120.501 386.762C143.756 395.944 161.395 375.932 175.778 386.087C176.038 401.262 174.339 415.542 167.996 427.357C153.807 453.776 116.831 460.806 93.6796 437.72C61.761 425.308 79.2961 407.254 75.898 392.014C76.1445 393.104 39.1936 404.893 35.5491 407.332C25.2252 414.219 27.1317 423.466 27.1577 434.542C27.3782 513.969 16.73 592.605 7.23612 671.305C5.64084 684.534 4.16228 697.79 2.64482 711.019C1.49051 721.2 -1.99835 733.249 1.55537 742.976C13.2411 775.024 44.9781 801.677 72.513 818.616C91.0078 829.99 109.477 808.655 125.948 815.685C142.057 822.572 139.528 852.428 140.5 866.098C142.148 889.703 139.748 913.879 135.741 937.16C127.764 983.617 112.797 1028.61 105.78 1075.25C103.69 1088.68 102.322 1102.21 101.682 1115.78C101.423 1122.06 98.3228 1155.7 103.173 1159.57C106.221 1166.23 115.754 1165.97 114.82 1184.26C106.299 1287.51 102.097 1391.04 97.778 1494.52C93.4721 1597.93 89.1272 1701.4 80.3207 1804.55C75.7165 1858.48 65.7816 1911.85 63.6416 1966.01C61.8388 2011.41 44.7965 2059.46 57.2605 2104.35C62.6429 2123.75 53.8754 2149.21 66.5728 2165.29C65.4574 2184.11 53.9143 2192.06 51.3333 2199.16C43.7201 2227.07 64.2642 2252.93 78.4271 2262.64C107.233 2285.19 121.552 2280 139.372 2275.34C164.767 2267.71 174.922 2245.73 191.005 2226.25C198.748 2209.21 183.391 2191.54 185.078 2171.23C220.2 2164.48 216.996 1916.2 236.71 1839.41C240.705 1810.18 257.812 1706.37 265.944 1606.92C268.577 1587.14 267.513 1575.51 270.561 1555.84C286.696 1488.58 305.268 1395.04 316.267 1312.08H319.652C328.523 1377.86 329.405 1453.25 344.748 1509.76C364.748 1596.83 365.707 1616.94 350.014 1672.31C336.11 1747.95 336.214 1848.34 338.886 1924.82C341.558 2001.2 340.533 2084.36 356.058 2159.37C356.823 2163.04 358.38 2163.17 360.999 2162.96C364.501 2162.4 367.342 2182.94 367.432 2191.98C367.225 2193.48 367.731 2197.59 367.912 2199.16C370.869 2220.74 417.068 2227.2 424.02 2228.18C445.368 2231.15 469.479 2211.84 499.102 2238.92C499.076 2238.87 502.629 2239.8 503.797 2239.86C553.004 2247.83 612.872 2250.83 653.999 2223.7C661.47 2218.25 658.98 2205.33 644.934 2201.58C609.306 2193.4 581.459 2170.62 550.734 2153.43C539.632 2147.21 525.521 2131.36 528.335 2125.01C529.269 2121.82 533.744 2120.96 529.567 2107.73C494.017 1985.84 500.528 1823.54 515.755 1695.71C516.17 1681.3 527.557 1664.27 529.567 1647.25C543.951 1465.28 507.272 1291.68 507.272 1114.75C512.486 1110.85 515.028 1100.12 511.215 1091.36C504.678 1064.85 500.139 1037.84 494.666 1011.1C490.944 992.981 488.804 964.02 484.511 947.924C482.954 941.997 482.915 915.552 483.304 909.482Z');
    const _b2=new Path2D('M122.175 405.243C122.616 401.119 119.413 397.397 115.029 396.93C110.645 396.476 106.741 399.433 106.3 403.57C105.859 407.708 109.063 411.417 113.447 411.884C117.843 412.338 121.747 409.368 122.175 405.243ZM225.103 773.26C227.529 768.488 226.738 763.209 223.339 761.484C219.941 759.772 215.22 762.249 212.795 767.022C210.37 771.795 211.161 777.074 214.559 778.799C217.957 780.524 222.678 778.059 225.103 773.26Z');
    const _007=new Path2D('M398.252 68.7302L422.869 33.6599H495.318C490.247 50.6114 462.867 82.7894 413.595 130.025C367.514 175.666 338.812 213.2 327.217 243.057H381.703L389.251 229.14L389.835 228.712V228.271L390.548 226.676C409.523 195.224 435.034 164.797 467.07 135.667C529.234 75.8117 560.517 31.6236 560.673 2.49355H406.501L368.227 68.7042H398.252V68.7302ZM759.356 38.4458C773.844 26.5655 781.522 14.9705 782.261 3.81648H575.173C570.815 21.4943 564.615 36.8505 555.77 50.0407H664.599C666.622 45.8255 668.646 42.7777 670.526 40.469C671.992 38.4458 675.04 37.8621 679.67 38.4458H759.356ZM619.815 78.3018L644.742 73.6716L656.778 60.4814H549.7C526.367 85.4093 524.616 102.802 544.331 112.788C546.354 112.944 546.937 111.336 546.081 107.575C544.616 102.789 545.342 97.5749 548.105 92.0628C550.128 87.5752 552.592 84.3847 555.472 82.1928H596.793L555.472 129.597C550.4 132.632 544.33 133.942 537.366 133.073H489.844L476.499 144.811H535.926C548.662 145.537 558.519 142.645 564.9 136.549L605.613 89.3002C610.84 82.1928 615.457 78.4315 619.815 78.3018ZM360.419 68.0168C365.049 33.2319 356.515 12.0782 334.778 4.24447C309.267 -5.59958 280.448 4.54278 248.114 34.8142C236.506 45.8385 225.793 58.4451 215.365 72.647C207.104 83.5157 201.008 92.9317 197.376 100.61L188.687 118.443C182.144 132.172 176.903 146.484 173.032 161.192C161.152 204.368 167.533 231.76 192.033 243.057C216.805 254.496 245.637 245.806 278.411 216.689C297.447 199.46 313.979 179.654 327.528 157.845L336.373 142.632C348.383 119.429 356.36 95.383 359.978 70.0271L360.419 68.0168ZM239.554 115.395C248.27 98.5866 259.722 80.4808 273.327 61.6357C294.779 31.3643 310.875 18.4464 321.588 22.2206C337.826 28.3164 325.79 66.2659 285.791 136.406C275.662 153.215 263.354 171.049 248.983 189.881C226.818 217.701 211.591 229.737 203.187 225.379C194.497 220.749 196.961 202.786 210.735 171.477L239.554 115.395ZM193.044 67.2776C197.83 32.6483 189.115 11.4946 167.533 3.51817C141.892 -6.19618 113.047 4.24447 81.0246 34.3732C69.4166 45.2419 58.561 57.8615 48.1203 72.0504C39.8586 82.919 33.7887 92.3351 30.1572 100.169L21.3118 117.847C14.9222 131.59 9.68608 145.841 5.65731 160.452C-6.06736 203.784 0.443466 231.176 25.086 242.486C49.5859 253.925 78.4047 245.093 111.011 216.106C130.725 198 147.235 178.584 160.438 157.275L169.128 142.048C180.967 119.378 188.945 94.8926 192.733 69.5991L193.044 67.2776ZM72.3478 114.812C81.0375 98.0029 92.3343 80.1825 105.965 61.1947C127.547 31.053 143.63 17.8627 154.369 21.6369C170.581 27.7198 158.545 65.8379 118.572 135.68C108.715 152.632 96.2511 170.465 81.8936 189.297C59.7283 217.26 44.3461 229.14 35.9676 224.808C27.2519 220.165 29.7421 202.046 43.4901 170.893L72.3478 114.812Z');

    function drawSpiral(){
     /* ── Fond noir strict ── */
     ctx.fillStyle=BG;
     ctx.fillRect(0,0,W,H);

     const outerR=Math.hypot(Math.max(spX,W-spX),Math.max(spY,H-spY))*1.10;

     ctx.save();
     ctx.translate(spX,spY);
     ctx.rotate(rot);

     /* ── 4 bandes spiralées fines et tranchantes ──
        Technique : on dessine la région entre deux spirales.
        Spirale = r diminue linéairement avec l'angle.
        Bande = région entre spirale_outer et spirale_inner.
        4 bandes décalées de 90° chacune. */
     const nBands=4;
     const turns=1.65;         /* nombre de tours */
     const bandFrac=0.38;      /* fraction d'espace occupée par la bande (vs noir) */
     const steps=200;

     for(let b=0;b<nBands;b++){
      const aStart=(b/nBands)*Math.PI*2;
      /* Bord avant de la bande */
      ctx.beginPath();
      for(let i=0;i<=steps;i++){
       const prog=i/steps;
       const angle=aStart+prog*Math.PI*2*turns;
       /* r linéaire de outerR à innerR sur la durée totale */
       const rCenter=outerR*(1-prog)+innerR*prog;
       /* demi-largeur de la bande — plus fine au centre */
       const hw=rCenter*(bandFrac/2)*(0.5+0.5*(1-prog));
       const rOuter=rCenter+hw;
       if(i===0) ctx.moveTo(Math.cos(angle)*rOuter,Math.sin(angle)*rOuter);
       else ctx.lineTo(Math.cos(angle)*rOuter,Math.sin(angle)*rOuter);
      }
      /* Bord arrière — en sens inverse */
      for(let i=steps;i>=0;i--){
       const prog=i/steps;
       const angle=aStart+prog*Math.PI*2*turns;
       const rCenter=outerR*(1-prog)+innerR*prog;
       const hw=rCenter*(bandFrac/2)*(0.5+0.5*(1-prog));
       const rInner=Math.max(innerR*1.05,rCenter-hw);
       ctx.lineTo(Math.cos(angle)*rInner,Math.sin(angle)*rInner);
      }
      ctx.closePath();

      /* Dégradé radial simple — beige uniforme, légèrement plus sombre vers le centre */
      const rg=ctx.createRadialGradient(0,0,innerR,0,0,outerR*0.7);
      rg.addColorStop(0,'rgb(178,158,115)');
      rg.addColorStop(0.5,'rgb(186,166,124)');
      rg.addColorStop(1,'rgb(192,172,130)');
      ctx.fillStyle=rg;
      ctx.fill();

      /* Ligne de bord fine et nette — côté clair de la bande */
      ctx.beginPath();
      for(let i=0;i<=steps;i++){
       const prog=i/steps;
       const angle=aStart+prog*Math.PI*2*turns;
       const rCenter=outerR*(1-prog)+innerR*prog;
       const hw=rCenter*(bandFrac/2)*(0.5+0.5*(1-prog));
       const rOuter=rCenter+hw;
       if(i===0) ctx.moveTo(Math.cos(angle)*rOuter,Math.sin(angle)*rOuter);
       else ctx.lineTo(Math.cos(angle)*rOuter,Math.sin(angle)*rOuter);
      }
      ctx.strokeStyle='rgba(210,195,158,0.60)';
      ctx.lineWidth=W*0.003;
      ctx.stroke();

      /* Ligne de bord sombre — côté ombre */
      ctx.beginPath();
      for(let i=0;i<=steps;i++){
       const prog=i/steps;
       const angle=aStart+prog*Math.PI*2*turns;
       const rCenter=outerR*(1-prog)+innerR*prog;
       const hw=rCenter*(bandFrac/2)*(0.5+0.5*(1-prog));
       const rInner=Math.max(innerR*1.05,rCenter-hw);
       if(i===0) ctx.moveTo(Math.cos(angle)*rInner,Math.sin(angle)*rInner);
       else ctx.lineTo(Math.cos(angle)*rInner,Math.sin(angle)*rInner);
      }
      ctx.strokeStyle='rgba(0,0,0,0.55)';
      ctx.lineWidth=W*0.004;
      ctx.stroke();
     }

     ctx.restore();

     /* ── Cercle central beige — petit, net ── */
     const cg=ctx.createRadialGradient(spX,spY,0,spX,spY,innerR);
     cg.addColorStop(0,'rgb(200,182,142)');
     cg.addColorStop(0.6,'rgb(188,168,126)');
     cg.addColorStop(1,'rgb(165,145,102)');
     ctx.fillStyle=cg;
     ctx.beginPath();ctx.arc(spX,spY,innerR,0,Math.PI*2);ctx.fill();
     /* Bord net du cercle */
     ctx.beginPath();ctx.arc(spX,spY,innerR,0,Math.PI*2);
     ctx.strokeStyle='rgba(0,0,0,0.50)';ctx.lineWidth=W*0.005;ctx.stroke();
    }

    function drawBond(){
     /* Bond occupe ~85% du diamètre du cercle central */
     const SVG_H=2280, SVG_W=659;
     const targetH=innerR*1.72;
     const sc=targetH/SVG_H;
     const targetW=SVG_W*sc;
     ctx.save();
     ctx.translate(spX-targetW*0.50, spY-targetH*0.52);
     ctx.scale(sc,sc);
     ctx.fillStyle='rgb(4,3,2)';
     ctx.fill(_b1);
     ctx.fill(_b2);
     ctx.restore();
    }

    /* ── Sang — envahit tout l'écran depuis le haut ── */
    function drawBlood(){
     if(!bloodActive||bloodY<=0)return;
     /* Descend depuis le haut — comme le vrai gun barrel */
     const by=Math.min(H, bloodY);
     const bg=ctx.createLinearGradient(0,0,0,by);
     bg.addColorStop(0,'rgba(165,0,0,0.96)');
     bg.addColorStop(0.5,'rgba(140,0,0,0.92)');
     bg.addColorStop(0.85,'rgba(100,0,0,0.85)');
     bg.addColorStop(1,'rgba(70,0,0,0.75)');
     ctx.fillStyle=bg;
     ctx.fillRect(0,0,W,by);
     /* Bord inférieur — léger fondu */
     const edge=ctx.createLinearGradient(0,Math.max(0,by-H*0.04),0,by);
     edge.addColorStop(0,'rgba(100,0,0,0.85)');
     edge.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=edge;
     ctx.fillRect(0,Math.max(0,by-H*0.04),W,H*0.04);
    }

    /* ── Shimmer — reflet tournant sur les bandes ── */
    let shimmerAngle=0;
    function drawShimmer(){
     /* Ligne lumineuse qui tourne dans la spirale */
     ctx.save();
     ctx.translate(spX,spY);
     ctx.rotate(shimmerAngle);
     /* Arc brillant court qui parcourt la spirale */
     const outerR=Math.hypot(Math.max(spX,W-spX),Math.max(spY,H-spY))*1.10;
     for(let i=0;i<2;i++){
      const r=outerR*(0.85-i*0.25);
      const sg=ctx.createLinearGradient(-r,0,r,0);
      sg.addColorStop(0,'rgba(0,0,0,0)');
      sg.addColorStop(0.4,'rgba(0,0,0,0)');
      sg.addColorStop(0.5,`rgba(230,215,180,${0.22-i*0.06})`);
      sg.addColorStop(0.6,'rgba(0,0,0,0)');
      sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(0,0,r,-Math.PI*0.06,Math.PI*0.06);
      ctx.strokeStyle=sg;ctx.lineWidth=W*0.018;ctx.stroke();
     }
     ctx.restore();
    }

    function draw007(){
     const sc=W*0.26/783;
     ctx.save();
     ctx.translate(W*0.044, H*0.935-248*sc);
     ctx.scale(sc,sc);
     ctx.fillStyle=BEIGE;
     ctx.fill(_007);
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Rotation spirale + shimmer */
     rot+=0.0022;
     shimmerAngle+=0.008;

     drawSpiral();
     drawShimmer();
     drawBond();

     /* Flash blanc bref au moment du tir */
     if(flashAlpha>0){
      ctx.fillStyle=`rgba(255,245,220,${flashAlpha*0.28})`;ctx.fillRect(0,0,W,H);
      flashAlpha=Math.max(0,flashAlpha-0.10);
     }

     /* Sang plein écran */
     drawBlood();

     /* Particules subtiles — poussière qui flotte dans la spirale */
     for(const p of _bondParticles){
      p.angle+=p.spd;p.ph+=0.022;
      const px=cx+Math.cos(p.angle)*p.dist*(1+Math.sin(p.ph)*0.08);
      const py=cy+Math.sin(p.angle)*p.dist*(0.55+Math.cos(p.ph)*0.06);
      const pa=p.op*(0.35+0.65*Math.abs(Math.sin(p.ph)));
      ctx.beginPath();ctx.arc(px,py,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.warm?'220,190,140':'180,160,120'},${pa})`;ctx.fill();
     }

     shotTimer++;
     if(shotTimer>=shotCooldown){
      shotTimer=0;flashAlpha=1.0;bloodY=0;bloodActive=true;
     }
     if(bloodActive){
      /* Descend doucement et régulièrement sur toute la hauteur (frames 4→204) */
      if(shotTimer>4&&shotTimer<204) bloodY+=H*0.005;
      /* S'arrête un instant plein écran */
      else if(shotTimer>=204&&shotTimer<280){bloodY=H;}
      /* Remonte lentement */
      else if(shotTimer>=280) bloodY=Math.max(0,bloodY-H*0.018);
      if(bloodY<=0&&shotTimer>340) bloodActive=false;
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
