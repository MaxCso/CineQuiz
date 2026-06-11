// CinéQuiz splash chunk — Matrix
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Matrix"]={
   name:'Matrix',
   color:'0,200,50',
   ref:'The Matrix \u2014 Wachowski, 1999',
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    /* Fond noir pur + suppression des orbes colorées */
    const _s=document.createElement('style');
    _s.id='matrix-bg-override';
    _s.textContent='';
    document.head.appendChild(_s);
    const origStop=stop;
    const _cleanup=stop.cleanup;
    stop.cleanup=function(){if(_cleanup)_cleanup();const el=document.getElementById('matrix-bg-override');if(el)el.remove();};
    const cols=Math.floor(W/14);
    const drops=Array.from({length:cols},()=>Math.random()*-40|0);
    const chars='\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F30123456789';
    function frame(){
     if(stop.v){return;}
     ctx.fillStyle='rgba(0,0,0,0.1)';
     ctx.fillRect(0,0,W,H);
     ctx.font='13px monospace';
     for(let i=0;i<cols;i++){
      const c=chars[Math.random()*chars.length|0];
      const x=i*14, y=drops[i]*14;
      const bright=drops[i]<1;
      ctx.fillStyle=bright?'#b0ffb0':'rgba(0,'+(140+Math.random()*80|0)+',0,0.85)';
      ctx.fillText(c,x,y);
      if(y>H && Math.random()>0.975) drops[i]=0;
      else drops[i]++;
     }
     requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
