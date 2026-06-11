// CinéQuiz splash chunk — Kill Bill
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Kill Bill"]={
   name:'Kill Bill',
   color:'240,200,10',
   ref:'Kill Bill \u2014 Quentin Tarantino, 2003',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1.0';
    let t=0;
    const cx=W/2;

    /* ── Override fond jaune Tarantino + position citation ── */
    let _kbStyle=document.getElementById('_kb_splash_style');
    if(!_kbStyle){_kbStyle=document.createElement('style');_kbStyle.id='_kb_splash_style';document.head.appendChild(_kbStyle);}
    _kbStyle.textContent=`
      

      #splash-content-wrap{top:50%!important;transform:translateY(-50%)!important;}
      #splash-content-wrap.reveal{transform:translateY(-50%)!important;}
      #splash-logo-wrap,#splash-logo-wrap *{color:#000000!important;-webkit-text-fill-color:#000000!important;}

      #splash-film-ref-bottom,#splash-film-ref{color:rgba(180,10,10,0.90)!important;-webkit-text-fill-color:rgba(180,10,10,0.90)!important;}
      #splash-skip{color:rgba(255,255,255,0.90)!important;-webkit-text-fill-color:rgba(255,255,255,0.90)!important;letter-spacing:3px!important;}
    `;
    const _kbWatch=setInterval(()=>{if(stop.v){_kbStyle.textContent='';clearInterval(_kbWatch);}},200);

    /* Forcer le centrage via style inline */
    const _kbWrap=document.getElementById('splash-content-wrap');
    if(_kbWrap){_kbWrap.style.setProperty('top','50%','important');_kbWrap.style.setProperty('transform','translateY(-50%)','important');}
    const _kbWrapWatch=setInterval(()=>{if(stop.v){if(_kbWrap){_kbWrap.style.top='';_kbWrap.style.transform='';}clearInterval(_kbWrapWatch);}},200);

    /* ── Katana — pleine hauteur ── */
    const KATANA_SVG='images/sprite_14.svg';
    const katanaImg=new Image();let katanaReady=false;
    katanaImg.onload=()=>{katanaReady=true;};katanaImg.src=KATANA_SVG;
    /* Katana pleine hauteur */
    const KH=H*1.0;
    const KW=KH*(98/1040);
    const KX=cx-KW/2;
    const KY=0;

    /* ── Pétales de sakura ── */
    function makePetal(){
     return {
      x:Math.random()*W*1.2-W*0.1,
      y:-20-Math.random()*H*0.6,
      vy:0.50+Math.random()*0.85,
      vx:(Math.random()-0.5)*0.45,
      rot:Math.random()*Math.PI*2,
      vrot:(Math.random()-0.5)*0.030,
      wobble:Math.random()*Math.PI*2,
      wobbleSpd:0.018+Math.random()*0.020,
      sz:W*(0.014+Math.random()*0.020),
      op:0.60+Math.random()*0.38,
      hue:340+Math.random()*20
     };
    }
    const petals=Array.from({length:42},makePetal);
    petals.forEach((p,i)=>{p.y=-10+(i/42)*H*1.15;});

    function drawPetal(p){
     ctx.save();
     ctx.translate(p.x,p.y);ctx.rotate(p.rot);
     ctx.globalAlpha=p.op;
     const s=p.sz;
     ctx.fillStyle=`hsl(${p.hue},75%,82%)`;
     ctx.beginPath();
     ctx.moveTo(0,-s);
     ctx.bezierCurveTo( s*0.60,-s*0.85,  s*0.85,-s*0.15, s*0.05, s*0.30);
     ctx.bezierCurveTo( s*0.02, s*0.45, -s*0.02, s*0.45, -s*0.05, s*0.30);
     ctx.bezierCurveTo(-s*0.85,-s*0.15, -s*0.60,-s*0.85, 0,-s);
     ctx.closePath();ctx.fill();
     ctx.fillStyle='rgba(245,200,255,0.40)';
     ctx.beginPath();
     ctx.moveTo(-s*0.08, s*0.28);
     ctx.bezierCurveTo(-s*0.04, s*0.12, s*0.04, s*0.12, s*0.08, s*0.28);
     ctx.closePath();ctx.fill();
     ctx.strokeStyle=`hsla(${p.hue},60%,62%,0.40)`;ctx.lineWidth=s*0.09;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(0,-s*0.75);ctx.quadraticCurveTo(s*0.04,0, 0,s*0.22);ctx.stroke();
     ctx.restore();
    }

    /* ── Éclaboussures de sang style anime — améliorées ── */
    /* Plus nombreuses, mieux réparties, formes plus expressives */
    const splashes=[
     {x:W*0.065,y:H*0.121,sz:W*0.066,rot:-1.74,spd:0.8,type:'main'},
     {x:W*0.805,y:H*0.451,sz:W*0.052,rot:2.35,spd:1.3,type:'main'},
     {x:W*0.174,y:H*0.5,sz:W*0.069,rot:2.27,spd:0.98,type:'main'},
     {x:W*0.816,y:H*0.169,sz:W*0.078,rot:2.67,spd:1.21,type:'main'},
     {x:W*0.119,y:H*0.206,sz:W*0.066,rot:-1.51,spd:1.25,type:'main'},
     {x:W*0.948,y:H*0.183,sz:W*0.075,rot:-0.21,spd:0.55,type:'main'},
     {x:W*0.024,y:H*0.534,sz:W*0.075,rot:2.17,spd:1.04,type:'main'},
     {x:W*0.869,y:H*0.579,sz:W*0.07,rot:1.33,spd:1.07,type:'main'},
     {x:W*0.198,y:H*0.454,sz:W*0.051,rot:-1.94,spd:0.86,type:'main'},
     {x:W*0.823,y:H*0.747,sz:W*0.067,rot:1.91,spd:0.81,type:'main'},
     {x:W*0.059,y:H*0.29,sz:W*0.049,rot:-1.39,spd:0.77,type:'main'},
     {x:W*0.959,y:H*0.919,sz:W*0.054,rot:2.33,spd:0.97,type:'main'},
     {x:W*0.081,y:H*0.329,sz:W*0.052,rot:3.01,spd:0.58,type:'main'},
     {x:W*0.966,y:H*0.781,sz:W*0.062,rot:1.32,spd:0.75,type:'main'},
     {x:W*0.041,y:H*0.508,sz:W*0.052,rot:-1.61,spd:0.98,type:'main'},
     {x:W*0.926,y:H*0.491,sz:W*0.055,rot:-1.71,spd:1.06,type:'main'},
     {x:W*0.179,y:H*0.792,sz:W*0.07,rot:2.13,spd:0.82,type:'main'},
     {x:W*0.828,y:H*0.156,sz:W*0.065,rot:0.95,spd:1.29,type:'main'},
     {x:W*0.097,y:H*0.727,sz:W*0.062,rot:-2.85,spd:0.56,type:'main'},
     {x:W*0.949,y:H*0.94,sz:W*0.074,rot:-2.08,spd:0.81,type:'main'},
     {x:W*0.776,y:H*0.827,sz:W*0.024,rot:-1.9,spd:1.44,type:'drop'},
     {x:W*0.121,y:H*0.408,sz:W*0.008,rot:0.93,spd:1.51,type:'drop'},
     {x:W*0.677,y:H*0.59,sz:W*0.021,rot:0.33,spd:1.84,type:'drop'},
     {x:W*0.73,y:H*0.422,sz:W*0.025,rot:-1.66,spd:2.29,type:'drop'},
     {x:W*0.25,y:H*0.908,sz:W*0.008,rot:-1.54,spd:1.76,type:'drop'},
     {x:W*0.41,y:H*0.961,sz:W*0.021,rot:1.99,spd:1.43,type:'drop'},
     {x:W*0.298,y:H*0.068,sz:W*0.014,rot:-0.25,spd:2.07,type:'drop'},
     {x:W*0.026,y:H*0.573,sz:W*0.013,rot:0.91,spd:1.94,type:'drop'},
     {x:W*0.677,y:H*0.712,sz:W*0.017,rot:-2.92,spd:2.18,type:'drop'},
     {x:W*0.39,y:H*0.729,sz:W*0.018,rot:3.12,spd:2.38,type:'drop'},
     {x:W*0.34,y:H*0.072,sz:W*0.018,rot:0.73,spd:1.35,type:'drop'},
     {x:W*0.02,y:H*0.923,sz:W*0.016,rot:-0.93,spd:1.81,type:'drop'},
     {x:W*0.023,y:H*0.411,sz:W*0.019,rot:-2.7,spd:1.2,type:'drop'},
     {x:W*0.678,y:H*0.291,sz:W*0.018,rot:-0.44,spd:2.36,type:'drop'},
     {x:W*0.261,y:H*0.367,sz:W*0.021,rot:-1.38,spd:2.28,type:'drop'},
     {x:W*0.243,y:H*0.649,sz:W*0.021,rot:0.56,spd:1.39,type:'drop'},
     {x:W*0.668,y:H*0.119,sz:W*0.014,rot:-0.37,spd:2.09,type:'drop'},
     {x:W*0.357,y:H*0.3,sz:W*0.02,rot:-0.46,spd:1.5,type:'drop'},
     {x:W*0.23,y:H*0.743,sz:W*0.02,rot:-1.42,spd:2.12,type:'drop'},
     {x:W*0.344,y:H*0.866,sz:W*0.011,rot:0.55,spd:1.72,type:'drop'},
     {x:W*0.014,y:H*0.44,sz:W*0.009,rot:2.06,spd:1.32,type:'drop'},
     {x:W*0.979,y:H*0.664,sz:W*0.019,rot:-2.39,spd:1.7,type:'drop'},
     {x:W*0.4,y:H*0.159,sz:W*0.011,rot:1.99,spd:2.35,type:'drop'},
     {x:W*0.06,y:H*0.235,sz:W*0.022,rot:2.32,spd:2.22,type:'drop'},
     {x:W*0.048,y:H*0.673,sz:W*0.025,rot:0.76,spd:1.81,type:'drop'},
     {x:W*0.33,y:H*0.747,sz:W*0.016,rot:1.78,spd:1.33,type:'drop'},
     {x:W*0.82,y:H*0.251,sz:W*0.011,rot:-0.48,spd:1.19,type:'drop'},
     {x:W*0.298,y:H*0.238,sz:W*0.012,rot:-2.57,spd:2.14,type:'drop'},
     {x:W*0.178,y:H*0.437,sz:W*0.01,rot:-2.48,spd:2.18,type:'drop'},
     {x:W*0.758,y:H*0.589,sz:W*0.015,rot:1.38,spd:1.41,type:'drop'},
     {x:W*0.974,y:H*0.753,sz:W*0.009,rot:2.28,spd:1.26,type:'drop'},
     {x:W*0.708,y:H*0.904,sz:W*0.022,rot:-0.24,spd:1.07,type:'drop'},
     {x:W*0.193,y:H*0.878,sz:W*0.009,rot:1.21,spd:1.13,type:'drop'},
     {x:W*0.126,y:H*0.269,sz:W*0.023,rot:1.23,spd:1.09,type:'drop'},
     {x:W*0.086,y:H*0.249,sz:W*0.021,rot:-2.03,spd:1.54,type:'drop'},
     {x:W*0.329,y:H*0.445,sz:W*0.017,rot:1.35,spd:1.27,type:'drop'},
     {x:W*0.784,y:H*0.655,sz:W*0.026,rot:-1.67,spd:1.54,type:'drop'},
     {x:W*0.255,y:H*0.281,sz:W*0.025,rot:2.83,spd:1.93,type:'drop'},
     {x:W*0.43,y:H*0.352,sz:W*0.012,rot:1.69,spd:1.77,type:'drop'},
     {x:W*0.603,y:H*0.7,sz:W*0.024,rot:0.9,spd:2.08,type:'drop'},
     {x:W*0.888,y:H*0.142,sz:W*0.011,rot:-0.77,spd:1.72,type:'drop'},
     {x:W*0.662,y:H*0.059,sz:W*0.009,rot:1.65,spd:1.5,type:'drop'},
     {x:W*0.756,y:H*0.817,sz:W*0.015,rot:0.28,spd:2.22,type:'drop'},
     {x:W*0.821,y:H*0.172,sz:W*0.017,rot:-1.86,spd:1.66,type:'drop'},
     {x:W*0.987,y:H*0.419,sz:W*0.022,rot:3.11,spd:1.79,type:'drop'},
     {x:W*0.128,y:H*0.396,sz:W*0.024,rot:0.54,spd:1.31,type:'drop'},
     {x:W*0.139,y:H*0.957,sz:W*0.014,rot:-2.35,spd:1.99,type:'drop'},
     {x:W*0.426,y:H*0.554,sz:W*0.02,rot:-2.04,spd:2.13,type:'drop'},
     {x:W*0.721,y:H*0.872,sz:W*0.023,rot:1.15,spd:1.41,type:'drop'},
     {x:W*0.075,y:H*0.164,sz:W*0.009,rot:1.5,spd:1.28,type:'drop'},
     {x:W*0.211,y:H*0.641,sz:W*0.021,rot:-2.38,spd:1.07,type:'drop'},
     {x:W*0.316,y:H*0.842,sz:W*0.014,rot:-0.73,spd:2.39,type:'drop'},
     {x:W*0.902,y:H*0.224,sz:W*0.025,rot:-1.25,spd:1.45,type:'drop'},
     {x:W*0.937,y:H*0.775,sz:W*0.013,rot:1.0,spd:1.52,type:'drop'},
     {x:W*0.589,y:H*0.865,sz:W*0.017,rot:-0.27,spd:2.27,type:'drop'},
     {x:W*0.931,y:H*0.145,sz:W*0.016,rot:-0.06,spd:1.27,type:'drop'},
     {x:W*0.136,y:H*0.976,sz:W*0.014,rot:0.62,spd:1.14,type:'drop'},
     {x:W*0.904,y:H*0.143,sz:W*0.024,rot:1.41,spd:1.91,type:'drop'},
     {x:W*0.672,y:H*0.073,sz:W*0.014,rot:1.75,spd:1.61,type:'drop'},
     {x:W*0.6,y:H*0.555,sz:W*0.018,rot:-0.99,spd:1.09,type:'drop'},
     {x:W*0.038,y:H*0.957,sz:W*0.021,rot:2.43,spd:2.08,type:'drop'},
     {x:W*0.81,y:H*0.143,sz:W*0.018,rot:0.84,spd:1.96,type:'drop'},
     {x:W*0.654,y:H*0.607,sz:W*0.019,rot:2.54,spd:2.29,type:'drop'},
     {x:W*0.606,y:H*0.481,sz:W*0.023,rot:2.4,spd:1.87,type:'drop'},
     {x:W*0.151,y:H*0.764,sz:W*0.023,rot:1.75,spd:2.05,type:'drop'},
     {x:W*0.76,y:H*0.691,sz:W*0.015,rot:-0.94,spd:1.25,type:'drop'},
     {x:W*0.219,y:H*0.35,sz:W*0.015,rot:-0.94,spd:1.77,type:'drop'},
     {x:W*0.163,y:H*0.513,sz:W*0.013,rot:0.78,spd:1.55,type:'drop'},
     {x:W*0.071,y:H*0.235,sz:W*0.019,rot:3.11,spd:1.23,type:'drop'},
     {x:W*0.384,y:H*0.606,sz:W*0.015,rot:0.66,spd:1.56,type:'drop'},
     {x:W*0.236,y:H*0.252,sz:W*0.018,rot:2.59,spd:1.01,type:'drop'},
     {x:W*0.057,y:H*0.719,sz:W*0.01,rot:1.21,spd:2.29,type:'drop'},
     {x:W*0.926,y:H*0.246,sz:W*0.024,rot:-1.71,spd:1.18,type:'drop'},
     {x:W*0.203,y:H*0.453,sz:W*0.011,rot:2.95,spd:1.18,type:'drop'},
     {x:W*0.881,y:H*0.896,sz:W*0.026,rot:-1.15,spd:2.22,type:'drop'},
     {x:W*0.268,y:H*0.873,sz:W*0.025,rot:-0.51,spd:1.76,type:'drop'},
     {x:W*0.76,y:H*0.266,sz:W*0.023,rot:-2.73,spd:2.09,type:'drop'},
     {x:W*0.049,y:H*0.637,sz:W*0.023,rot:-0.11,spd:2.14,type:'drop'},
     {x:W*0.792,y:H*0.544,sz:W*0.012,rot:2.67,spd:2.17,type:'drop'},
     {x:W*0.934,y:H*0.744,sz:W*0.021,rot:0.01,spd:1.69,type:'drop'},
     {x:W*0.899,y:H*0.273,sz:W*0.011,rot:3.08,spd:1.22,type:'drop'},
     {x:W*0.831,y:H*0.53,sz:W*0.018,rot:2.15,spd:1.17,type:'drop'},
     {x:W*0.632,y:H*0.46,sz:W*0.018,rot:0.01,spd:2.03,type:'drop'},
     {x:W*0.792,y:H*0.451,sz:W*0.015,rot:1.5,spd:1.47,type:'drop'},
     {x:W*0.197,y:H*0.349,sz:W*0.019,rot:-0.48,spd:2.25,type:'drop'},
     {x:W*0.274,y:H*0.529,sz:W*0.009,rot:-2.07,spd:2.03,type:'drop'},
     {x:W*0.69,y:H*0.202,sz:W*0.014,rot:-2.77,spd:1.58,type:'drop'},
     {x:W*0.65,y:H*0.869,sz:W*0.017,rot:-1.21,spd:1.99,type:'drop'},
     {x:W*0.262,y:H*0.798,sz:W*0.016,rot:2.15,spd:1.98,type:'drop'},
     {x:W*0.278,y:H*0.336,sz:W*0.018,rot:-1.12,spd:1.72,type:'drop'},
     {x:W*0.784,y:H*0.178,sz:W*0.015,rot:1.54,spd:1.45,type:'drop'},
     {x:W*0.967,y:H*0.263,sz:W*0.019,rot:0.73,spd:1.46,type:'drop'},
     {x:W*0.805,y:H*0.895,sz:W*0.021,rot:2.9,spd:1.98,type:'drop'},
     {x:W*0.809,y:H*0.18,sz:W*0.013,rot:1.68,spd:2.31,type:'drop'},
     {x:W*0.224,y:H*0.903,sz:W*0.011,rot:1.92,spd:1.06,type:'drop'},
     {x:W*0.129,y:H*0.577,sz:W*0.017,rot:1.38,spd:1.55,type:'drop'},
     {x:W*0.651,y:H*0.092,sz:W*0.015,rot:2.96,spd:1.75,type:'drop'},
     {x:W*0.244,y:H*0.177,sz:W*0.022,rot:-2.87,spd:2.18,type:'drop'},
     {x:W*0.08,y:H*0.872,sz:W*0.025,rot:0.65,spd:1.75,type:'drop'},
     {x:W*0.69,y:H*0.343,sz:W*0.025,rot:-1.33,spd:1.3,type:'drop'},
     {x:W*0.064,y:H*0.724,sz:W*0.012,rot:2.11,spd:0.63,type:'streak'},
     {x:W*0.026,y:H*0.711,sz:W*0.012,rot:1.54,spd:0.85,type:'streak'},
     {x:W*0.169,y:H*0.739,sz:W*0.014,rot:1.31,spd:0.59,type:'streak'},
     {x:W*0.665,y:H*0.137,sz:W*0.026,rot:-2.21,spd:0.59,type:'streak'},
     {x:W*0.33,y:H*0.691,sz:W*0.024,rot:1.04,spd:0.6,type:'streak'},
     {x:W*0.087,y:H*0.955,sz:W*0.018,rot:-2.44,spd:0.59,type:'streak'},
     {x:W*0.372,y:H*0.349,sz:W*0.018,rot:-2.93,spd:1.19,type:'streak'},
     {x:W*0.383,y:H*0.402,sz:W*0.025,rot:-0.75,spd:0.63,type:'streak'},
     {x:W*0.755,y:H*0.128,sz:W*0.023,rot:-2.24,spd:0.8,type:'streak'},
     {x:W*0.267,y:H*0.328,sz:W*0.021,rot:-2.25,spd:0.87,type:'streak'},
     {x:W*0.273,y:H*0.157,sz:W*0.025,rot:-2.8,spd:0.97,type:'streak'},
     {x:W*0.988,y:H*0.308,sz:W*0.014,rot:3.05,spd:0.59,type:'streak'},
     {x:W*0.663,y:H*0.928,sz:W*0.013,rot:-3.08,spd:0.59,type:'streak'},
     {x:W*0.844,y:H*0.022,sz:W*0.028,rot:-1.3,spd:1.1,type:'streak'},
     {x:W*0.056,y:H*0.301,sz:W*0.014,rot:-2.67,spd:1.15,type:'streak'},
     {x:W*0.956,y:H*0.492,sz:W*0.022,rot:-2.5,spd:1.1,type:'streak'},
     {x:W*0.109,y:H*0.09,sz:W*0.024,rot:0.75,spd:1.17,type:'streak'},
     {x:W*0.623,y:H*0.738,sz:W*0.017,rot:1.52,spd:0.6,type:'streak'},
     {x:W*0.761,y:H*0.221,sz:W*0.025,rot:0.4,spd:0.57,type:'streak'},
     {x:W*0.289,y:H*0.117,sz:W*0.02,rot:1.88,spd:0.52,type:'streak'},
     {x:W*0.365,y:H*0.881,sz:W*0.026,rot:0.37,spd:0.84,type:'streak'},
     {x:W*0.795,y:H*0.487,sz:W*0.022,rot:-1.92,spd:0.73,type:'streak'},
     {x:W*0.722,y:H*0.729,sz:W*0.027,rot:0.29,spd:0.55,type:'streak'},
     {x:W*0.93,y:H*0.7,sz:W*0.012,rot:-0.47,spd:1.0,type:'streak'},
     {x:W*0.793,y:H*0.545,sz:W*0.022,rot:-1.13,spd:1.17,type:'streak'},
     {x:W*0.628,y:H*0.133,sz:W*0.019,rot:-1.43,spd:0.8,type:'streak'},
     {x:W*0.969,y:H*0.871,sz:W*0.027,rot:-2.7,spd:0.87,type:'streak'},
     {x:W*0.147,y:H*0.4,sz:W*0.019,rot:0.1,spd:1.13,type:'streak'},
     {x:W*0.112,y:H*0.626,sz:W*0.014,rot:-2.89,spd:1.15,type:'streak'},
     {x:W*0.239,y:H*0.351,sz:W*0.021,rot:-0.28,spd:0.74,type:'streak'},
     {x:W*0.162,y:H*0.117,sz:W*0.025,rot:1.41,spd:0.43,type:'streak'},
     {x:W*0.34,y:H*0.854,sz:W*0.019,rot:-1.4,spd:0.89,type:'streak'},
     {x:W*0.766,y:H*0.556,sz:W*0.019,rot:-1.21,spd:0.71,type:'streak'},
     {x:W*0.185,y:H*0.568,sz:W*0.026,rot:0.53,spd:0.73,type:'streak'},
     {x:W*0.013,y:H*0.142,sz:W*0.023,rot:-1.76,spd:0.89,type:'streak'},
     {x:W*0.169,y:H*0.621,sz:W*0.017,rot:0.7,spd:0.45,type:'streak'},
     {x:W*0.729,y:H*0.42,sz:W*0.027,rot:-2.98,spd:0.95,type:'streak'},
     {x:W*0.714,y:H*0.846,sz:W*0.022,rot:2.73,spd:1.09,type:'streak'},
     {x:W*0.837,y:H*0.417,sz:W*0.026,rot:-2.9,spd:0.6,type:'streak'},
     {x:W*0.933,y:H*0.22,sz:W*0.016,rot:1.42,spd:0.79,type:'streak'},
     {x:W*0.613,y:H*0.42,sz:W*0.018,rot:-1.0,spd:0.95,type:'streak'},
     {x:W*0.71,y:H*0.941,sz:W*0.021,rot:2.15,spd:0.9,type:'streak'},
     {x:W*0.79,y:H*0.106,sz:W*0.024,rot:-2.24,spd:1.19,type:'streak'},
     {x:W*0.177,y:H*0.493,sz:W*0.015,rot:-1.29,spd:0.58,type:'streak'},
     {x:W*0.127,y:H*0.883,sz:W*0.022,rot:0.83,spd:0.91,type:'streak'},
     {x:W*0.306,y:H*0.383,sz:W*0.021,rot:2.52,spd:0.76,type:'streak'},
     {x:W*0.097,y:H*0.505,sz:W*0.02,rot:1.58,spd:1.18,type:'streak'},
     {x:W*0.93,y:H*0.081,sz:W*0.022,rot:-2.06,spd:0.55,type:'streak'},
     {x:W*0.904,y:H*0.883,sz:W*0.017,rot:0.41,spd:1.05,type:'streak'},
     {x:W*0.061,y:H*0.535,sz:W*0.026,rot:1.34,spd:1.06,type:'streak'},
     {x:W*0.15,y:H*0.331,sz:W*0.02,rot:-2.13,spd:0.63,type:'streak'},
     {x:W*0.748,y:H*0.635,sz:W*0.014,rot:1.24,spd:0.81,type:'streak'},
     {x:W*0.798,y:H*0.293,sz:W*0.018,rot:-1.85,spd:0.46,type:'streak'},
     {x:W*0.313,y:H*0.96,sz:W*0.019,rot:-1.79,spd:0.51,type:'streak'},
     {x:W*0.293,y:H*0.204,sz:W*0.012,rot:0.96,spd:0.92,type:'streak'},
     {x:W*0.214,y:H*0.562,sz:W*0.022,rot:0.18,spd:0.98,type:'streak'},
     {x:W*0.269,y:H*0.443,sz:W*0.015,rot:-1.9,spd:0.51,type:'streak'},
     {x:W*0.939,y:H*0.635,sz:W*0.027,rot:0.32,spd:0.49,type:'streak'},
     {x:W*0.316,y:H*0.94,sz:W*0.014,rot:-0.3,spd:1.07,type:'streak'},
     {x:W*0.389,y:H*0.358,sz:W*0.025,rot:-2.73,spd:1.18,type:'streak'},
     {x:W*0.034,y:H*0.532,sz:W*0.024,rot:-3.12,spd:0.95,type:'streak'},
     {x:W*0.935,y:H*0.194,sz:W*0.019,rot:0.13,spd:0.85,type:'streak'},
     {x:W*0.859,y:H*0.464,sz:W*0.024,rot:1.54,spd:1.19,type:'streak'},
     {x:W*0.878,y:H*0.322,sz:W*0.026,rot:-0.53,spd:1.03,type:'streak'},
     {x:W*0.654,y:H*0.328,sz:W*0.019,rot:-1.83,spd:0.69,type:'streak'},
     {x:W*0.32,y:H*0.389,sz:W*0.019,rot:0.54,spd:0.79,type:'streak'},
     {x:W*0.96,y:H*0.872,sz:W*0.019,rot:1.64,spd:0.96,type:'streak'},
     {x:W*0.776,y:H*0.24,sz:W*0.022,rot:2.75,spd:0.42,type:'streak'},
     {x:W*0.04,y:H*0.54,sz:W*0.026,rot:2.42,spd:0.78,type:'streak'},
     {x:W*0.295,y:H*0.611,sz:W*0.024,rot:-0.42,spd:0.77,type:'streak'},
     {x:W*0.181,y:H*0.66,sz:W*0.013,rot:2.69,spd:1.12,type:'streak'},
     {x:W*0.249,y:H*0.101,sz:W*0.024,rot:-0.99,spd:0.52,type:'streak'},
     {x:W*0.316,y:H*0.838,sz:W*0.017,rot:-3.01,spd:0.84,type:'streak'},
     {x:W*0.739,y:H*0.35,sz:W*0.02,rot:-2.44,spd:0.63,type:'streak'},
     {x:W*0.915,y:H*0.943,sz:W*0.013,rot:-2.7,spd:0.88,type:'streak'},
     {x:W*0.203,y:H*0.866,sz:W*0.022,rot:-0.98,spd:1.1,type:'streak'},
     {x:W*0.77,y:H*0.341,sz:W*0.013,rot:-3.12,spd:0.99,type:'streak'},
     {x:W*0.989,y:H*0.714,sz:W*0.02,rot:1.39,spd:0.48,type:'streak'},
     {x:W*0.822,y:H*0.691,sz:W*0.012,rot:1.18,spd:0.73,type:'streak'},
     {x:W*0.216,y:H*0.498,sz:W*0.015,rot:2.5,spd:0.47,type:'streak'},
    ];

    function drawSplash(sp){
     const pulse=0.92+Math.sin(t*sp.spd+sp.rot)*0.08;
     ctx.save();ctx.translate(sp.x,sp.y);ctx.rotate(sp.rot);
     ctx.globalAlpha=0.90*pulse;

     if(sp.type==='main'){
      /* Forme irrégulière principale */
      ctx.fillStyle='rgba(190,10,10,0.95)';
      ctx.beginPath();
      ctx.arc(0,0,sp.sz,0,Math.PI*2);ctx.fill();
      /* Halo plus sombre au centre */
      const cg=ctx.createRadialGradient(0,0,0,0,0,sp.sz);
      cg.addColorStop(0,'rgba(120,0,0,0.35)');cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,0,sp.sz,0,Math.PI*2);ctx.fill();
      /* Gouttelettes projetées — plus nombreuses */
      const drops=[
       {dx:1.6, dy:-0.6, r:0.32},{dx:-1.4, dy:-0.9, r:0.24},
       {dx:0.8, dy:1.8,  r:0.30},{dx:-1.0, dy:1.6,  r:0.22},
       {dx:1.9, dy:0.9,  r:0.20},{dx:-1.8, dy:0.5,  r:0.18},
       {dx:0.4, dy:-1.7, r:0.16},{dx:2.2,  dy:-0.2, r:0.14},
       {dx:-2.0,dy:1.1,  r:0.15},{dx:1.1,  dy:2.3,  r:0.18},
      ];
      ctx.fillStyle='rgba(185,8,8,0.88)';
      for(const d of drops){
       ctx.beginPath();ctx.arc(d.dx*sp.sz,d.dy*sp.sz,d.r*sp.sz,0,Math.PI*2);ctx.fill();
      }
      /* Traînée principale vers le bas */
      ctx.fillStyle='rgba(160,5,5,0.82)';
      ctx.beginPath();
      ctx.moveTo(-sp.sz*0.22, sp.sz*0.15);
      ctx.lineTo( sp.sz*0.22, sp.sz*0.15);
      ctx.lineTo( sp.sz*0.10, sp.sz*2.20);
      ctx.lineTo(-sp.sz*0.10, sp.sz*2.20);
      ctx.closePath();ctx.fill();
      /* Petite goutte au bout de la traînée */
      ctx.fillStyle='rgba(180,8,8,0.85)';
      ctx.beginPath();ctx.arc(0,sp.sz*2.30,sp.sz*0.14,0,Math.PI*2);ctx.fill();

     } else if(sp.type==='drop'){
      /* Simple goutte ronde */
      ctx.fillStyle='rgba(185,10,10,0.90)';
      ctx.beginPath();ctx.arc(0,0,sp.sz,0,Math.PI*2);ctx.fill();
      /* Micro-traînée */
      ctx.beginPath();
      ctx.moveTo(-sp.sz*0.4,sp.sz*0.3);
      ctx.lineTo(sp.sz*0.4,sp.sz*0.3);
      ctx.lineTo(sp.sz*0.2,sp.sz*1.8);
      ctx.lineTo(-sp.sz*0.2,sp.sz*1.8);
      ctx.closePath();ctx.fill();

     } else { /* streak */
      /* Traînée allongée façon giclée */
      ctx.fillStyle='rgba(175,8,8,0.88)';
      ctx.beginPath();
      ctx.ellipse(0,0,sp.sz*0.5,sp.sz*3.5,0,0,Math.PI*2);ctx.fill();
      /* Tête de la traînée */
      ctx.beginPath();ctx.arc(0,-sp.sz*3.2,sp.sz*0.55,0,Math.PI*2);ctx.fill();
      /* Gouttes latérales */
      ctx.fillStyle='rgba(180,8,8,0.75)';
      for(const side of [-1,1]){
       ctx.beginPath();ctx.arc(side*sp.sz*0.9,-sp.sz*1.5,sp.sz*0.28,0,Math.PI*2);ctx.fill();
      }
     }
     ctx.restore();
    }

    function frame(){
     if(stop.v)return;

     /* Fond jaune */
     ctx.fillStyle='#f5c800';ctx.fillRect(0,0,W,H);

     /* Katana en premier — pleine opacité, pas d'alpha */
     if(katanaReady){
      ctx.drawImage(katanaImg,KX,KY,KW,KH);
     }

     /* Légère variation de lumière */
     const centG=ctx.createRadialGradient(cx,H*0.48,20,cx,H*0.48,W*0.68);
     centG.addColorStop(0,`rgba(255,215,0,${0.12+Math.sin(t*0.20)*0.04})`);
     centG.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=centG;ctx.fillRect(0,0,W,H);

     /* Pétales */
     for(const p of petals){
      p.y+=p.vy;p.x+=p.vx;p.rot+=p.vrot;
      p.wobble+=p.wobbleSpd;p.x+=Math.sin(p.wobble)*0.38;
      if(p.y>H+22){Object.assign(p,makePetal());p.y=-22;}
      drawPetal(p);
     }

     /* Éclaboussures de sang */
     for(const sp of splashes) drawSplash(sp);

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
