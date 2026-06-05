// JUKEBOX — mini-player + écran dédié
// ══════════════════════════════════════
let _jkIdx=0; // Accueil par défaut
let _jkProgInt=null;
let _jkShuffle=false;
let _jkShuffleQueue=[];
const JK_KEYS=MUSIC_MANAGER_KEYS;

function _jkCurrentKey(){return JK_KEYS[_jkIdx]||JK_KEYS[0];}
function _fmtTime(sec){if(!isFinite(sec)||sec<0)return'0:00';const m=Math.floor(sec/60),s=Math.floor(sec%60);return`${m}:${s<10?'0':''}${s}`;}
function _isPlaying(){const a=window._jkAudio;return a&&!a.paused;}

function _jkPlayKey(key,idx){
  if(!isTrackUnlocked(key)){buildJkPlaylist();return;}
  stopMus();
  _jkCrossfade(key,idx);
  const bm=document.getElementById('btn-music');if(bm)bm.style.opacity='1';
}

function _stopJkAudio(){if(window._jkAudio){window._jkAudio.pause();window._jkAudio=null;}_stopProgInterval();}
function _startProgInterval(){
  _stopProgInterval();
  _jkProgInt=setInterval(()=>{
    updateProgressBars();
    // Fallback pour iOS écran éteint : l'event 'ended' n'est pas déclenché
    const a=window._jkAudio;
    if(a&&!a.paused&&a.duration&&isFinite(a.duration)&&a.duration>0){
      if(a.currentTime>=a.duration-0.8&&!a._nextPending){
        a._nextPending=true;
        playerNext();
      }
    }
    // Reset le flag si la piste a changé
    if(window._jkAudio&&window._jkAudio._nextPending&&window._jkAudio.currentTime<a.duration-1){
      window._jkAudio._nextPending=false;
    }
  },800);
}
function _stopProgInterval(){if(_jkProgInt){clearInterval(_jkProgInt);_jkProgInt=null;}}

function playerPlayPause(){
  const a=window._jkAudio;
  if(!a){_jkPlayKey(_jkCurrentKey(),_jkIdx);return;}
  if(a.paused){stopMus();a.play().catch(()=>{});musOn=true;const bm=document.getElementById('btn-music');if(bm)bm.style.opacity='1';_startProgInterval();}
  else{a.pause();_stopProgInterval();}
  updateMiniPlayer();updateJukeboxDisplay();
}

function _buildShuffleQueue(){
  // Fisher-Yates sans répéter la piste courante en premier
  let arr=[...Array(JK_KEYS.length).keys()].filter(i=>i!==_jkIdx);
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  _jkShuffleQueue=arr;
}
function toggleJkShuffle(){
  _jkShuffle=!_jkShuffle;
  if(_jkShuffle)_buildShuffleQueue();
  const btn=document.getElementById('jk-shuffle-btn');
  if(btn){btn.style.color=_jkShuffle?'var(--gold)':'rgba(255,255,255,.6)';btn.style.borderColor=_jkShuffle?'rgba(245,200,66,.4)':'rgba(255,255,255,.11)';}
}

function jkToggleMute(){
  musOn=!musOn;
  if(musOn){
    // Si une piste Jukebox est en cours, la reprendre — sinon lancer la musique de fond
    if(window._jkAudio && window._jkAudio.src){
      window._jkAudio.play().catch(()=>{});
      _startProgInterval();
    } else {
      playMus();
    }
  } else {
    // Mettre en pause la piste Jukebox si active, sinon stopper la musique de fond
    if(window._jkAudio && !window._jkAudio.paused){
      window._jkAudio.pause();
      _stopProgInterval();
    } else {
      stopMus();
    }
  }
  _jkUpdateMuteBtn();
  // Sync le bouton musique dans la home
  const bm=document.getElementById('btn-music');
  if(bm)bm.style.opacity=musOn?'1':'.38';
}

function _jkUpdateMuteBtn(){
  const btn=document.getElementById('jk-mute-btn');
  const icon=document.getElementById('jk-mute-icon');
  if(!btn||!icon)return;
  if(musOn){
    // Volume actif
    btn.style.color='rgba(255,255,255,.6)';
    btn.style.borderColor='rgba(255,255,255,.11)';
    icon.innerHTML=`
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`;
  } else {
    // Muet — icône avec barre et couleur atténuée
    btn.style.color='rgba(232,52,74,.7)';
    btn.style.borderColor='rgba(232,52,74,.3)';
    icon.innerHTML=`
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>`;
  }
}
function playerNext(){
  const startIdx=_jkIdx;
  do {
    if(_jkShuffle){
      if(!_jkShuffleQueue.length)_buildShuffleQueue();
      _jkIdx=_jkShuffleQueue.shift();
    } else {
      _jkIdx=(_jkIdx+1)%JK_KEYS.length;
    }
    // Avoid infinite loop if all locked
    if(_jkIdx===startIdx)break;
  } while(!isTrackUnlocked(_jkCurrentKey()));
  _jkPlayKey(_jkCurrentKey(),_jkIdx);
}
function playerPrev(){
  const a=window._jkAudio;
  if(a&&a.currentTime>3){stopMus();a.currentTime=0;if(a.paused){a.play().catch(()=>{});}updateProgressBars();return;}
  _jkIdx=(_jkIdx-1+JK_KEYS.length)%JK_KEYS.length;_jkPlayKey(_jkCurrentKey(),_jkIdx);
}

function jkSeek(clientX){
  const a=window._jkAudio;if(!a||!a.duration)return;
  const wrap=document.getElementById('jk-prog-wrap');if(!wrap)return;
  const rect=wrap.getBoundingClientRect();
  const pct=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width));
  a.currentTime=pct*a.duration;
}

setTimeout(function(){(function(){
  const wrap=document.getElementById('jk-prog-wrap');
  if(!wrap||wrap._dragAttached)return;
  wrap._dragAttached=true;

  const fill=document.getElementById('jk-prog-fill');
  let dragging=false;

  function applyPct(clientX){
    const rect=wrap.getBoundingClientRect();
    const pct=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width));
    if(fill){fill.style.transition='none';fill.style.width=(pct*100)+'%';}
    return pct;
  }

  function startDrag(){
    dragging=true;
    wrap.classList.add('dragging');
    const a=window._jkAudio;
    if(a) a._wasPaused=a.paused;
    // stopper la progression auto pendant le drag
    if(fill) fill.style.transition='none';
  }

  function endDrag(clientX){
    if(!dragging)return;
    dragging=false;
    wrap.classList.remove('dragging');
    const pct=applyPct(clientX);
    jkSeek(clientX);
    updateProgressBars();
    if(fill) fill.style.transition='width .8s linear';
  }

  // Touch
  wrap.addEventListener('touchstart',e=>{
    e.preventDefault();
    startDrag();
    applyPct(e.touches[0].clientX);
  },{passive:false});

  wrap.addEventListener('touchmove',e=>{
    if(!dragging)return;
    e.preventDefault();
    applyPct(e.touches[0].clientX);
  },{passive:false});

  wrap.addEventListener('touchend',e=>{
    endDrag(e.changedTouches[0].clientX);
  },{passive:true});

  wrap.addEventListener('touchcancel',e=>{
    endDrag(e.changedTouches[0].clientX);
  },{passive:true});

  // Mouse (desktop)
  wrap.addEventListener('mousedown',e=>{
    startDrag();
    applyPct(e.clientX);
    const onMove=ev=>{if(dragging)applyPct(ev.clientX);};
    const onUp=ev=>{endDrag(ev.clientX);document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);};
    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',onUp);
  });
})();},0);

function updateProgressBars(){
  const a=window._jkAudio;
  const dur=a&&a.duration&&isFinite(a.duration)?a.duration:0;
  const cur=a?a.currentTime:0;
  const pct=dur>0?Math.round((cur/dur)*100):0;
  const mpBar=document.getElementById('mp-bar');if(mpBar)mpBar.style.width=pct+'%';
  const jkFill=document.getElementById('jk-prog-fill');
  if(jkFill){jkFill.style.transition='none';jkFill.style.width=pct+'%';}
  const tc=document.getElementById('jk-time-cur');const td=document.getElementById('jk-time-dur');
  if(tc)tc.textContent=_fmtTime(cur);if(td)td.textContent=_fmtTime(dur);
  _syncPlayIcons(!a||a.paused);
}

function _syncPlayIcons(isPaused){
  const pauseSvg='<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
  const playSvg='<polygon points="6,3 20,12 6,21"/>';
  ['mp-play-icon','jk-play-icon'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=isPaused?playSvg:pauseSvg;});
}

function updateMiniPlayer(){
  const key=_jkCurrentKey();
  const info=MUSIC_LABELS[key]||{icon:'🎵',label:key};
  const track=MUSIC_TRACK_NAMES[key]||info.label;
  const mpIcon=document.getElementById('mp-icon');const mpTrack=document.getElementById('mp-track');const mpMode=document.getElementById('mp-mode');
  if(mpIcon)mpIcon.textContent=info.icon;if(mpTrack)mpTrack.textContent=track;if(mpMode)mpMode.textContent=info.label;
  const a=window._jkAudio;_syncPlayIcons(!a||a.paused);
}

function updateJukeboxDisplay(){
  const key=_jkCurrentKey();
  const info=MUSIC_LABELS[key]||{icon:'🎵',label:key};
  const track=MUSIC_TRACK_NAMES[key]||info.label;
  const jkIcon=document.getElementById('jk-icon');const jkTrack=document.getElementById('jk-track');const jkMode=document.getElementById('jk-mode');
  if(jkIcon)jkIcon.textContent=info.icon;if(jkTrack)jkTrack.textContent=track;if(jkMode)jkMode.textContent='';
  _jkUpdateReactiveBg(key);
  updateProgressBars();
}

function _jkUpdateReactiveBg(key){
  const [c1,c2]=_jkTrackColor(key);
  const gbg=document.getElementById('game-bg');
  if(!gbg||!gbg.classList.contains('mode-jukebox'))return;
  gbg.style.background=`radial-gradient(ellipse 70% 55% at 50% 38%,rgba(${c1},.75) 0%,#07050a 65%)`;
  // Mettre à jour la couleur de la barre et du bouton play
  const fill=document.getElementById('jk-prog-fill');
  if(fill)fill.style.background=`linear-gradient(90deg,rgba(${c1},.8),rgb(${c2}))`;
  const playBtn=document.getElementById('jk-play-btn');
  if(playBtn){playBtn.style.background=`rgba(${c2},.18)`;playBtn.style.borderColor=`rgba(${c2},.45)`;playBtn.style.color=`rgb(${c2})`;}
  // Couleur du track name
  if(document.getElementById('jk-track'))document.getElementById('jk-track').style.color=`rgb(${c2})`;
}

// ── JUKEBOX — conditions de déblocage par piste ──
const TRACK_UNLOCK={
  home:        {cond:s=>isModeUnlocked('replique')&&(s.games||0)>=5, hint:'Débloquer La Réplique'},
  quiz:        {cond:()=>true},
  photo:       {cond:s=>(s.games||0)>=1,          hint:'1 partie jouée'},
  year:        {cond:s=>isModeUnlocked('year')&&(s.games||0)>=3,   hint:'Débloquer Quelle Année ?'},
  replique:    {cond:()=>true},
  acteur:      {cond:s=>isModeUnlocked('acteur')&&(s.games||0)>=8,  hint:'Débloquer Acteur Mystère'},
  bo:          {cond:s=>isModeUnlocked('bo')&&(s.games||0)>=3,     hint:'Débloquer Indices Mystère'},
  boxoffice:   {cond:s=>isModeUnlocked('boxoffice')&&(s.games||0)>=5, hint:'Débloquer Box-office'},
  compositeur: {cond:s=>isModeUnlocked('compositeur')&&(s.games||0)>=10, hint:'Débloquer Compositeur'},
  realisateur: {cond:s=>isModeUnlocked('realisateur')&&(s.games||0)>=8,  hint:'Débloquer Réalisateur'},
  location:    {cond:s=>isModeUnlocked('location')&&(s.xp||0)>=200,  hint:'Débloquer Lieu de tournage'},
  generique:   {cond:s=>isModeUnlocked('generique')&&(s.games||0)>=10, hint:'Débloquer Le Générique'},
  casting:     {cond:s=>isModeUnlocked('casting')&&(s.xp||0)>=200,   hint:'Débloquer Le Casting'},
  filmographie:{cond:s=>isModeUnlocked('filmographie')&&(s.xp||0)>=400, hint:'Débloquer Filmographie'},
  vraifaux:    {cond:s=>isModeUnlocked('vraifaux')&&(s.xp||0)>=400,  hint:'Débloquer Vrai ou Faux'},
  decennie:    {cond:s=>isModeUnlocked('decennie')&&(s.best||0)>=500, hint:'Débloquer Décennie'},
  blindtest:   {cond:s=>isModeUnlocked('blindtest')&&(s.best||0)>=500, hint:'Débloquer Blind Test'},
  versus:      {cond:()=>true},
  training:    {cond:s=>isModeUnlocked('training')&&(s.games||0)>=15, hint:'Débloquer Entraînement'},
  bonus:       {cond:s=>(s.xp||0)>=500,  hint:'500 XP requis'},
  arcade:      {cond:()=>{try{return!!localStorage.getItem('cq_arc_hs');}catch{return false;}}, hint:'???'},
  snake:       {cond:()=>{try{const hs=JSON.parse(localStorage.getItem('cq_arc_hs')||'{}');return(hs.snake||0)>=50;}catch{return false;}}, hint:'???'},
  bricks:      {cond:()=>{try{const hs=JSON.parse(localStorage.getItem('cq_arc_hs')||'{}');return(hs.bricks||0)>=100;}catch{return false;}}, hint:'???'},
  morpion:     {cond:()=>{try{const hs=JSON.parse(localStorage.getItem('cq_arc_hs')||'{}');return(hs.morpion||0)>=1;}catch{return false;}}, hint:'???'},
  slots:       {cond:()=>{try{const hs=JSON.parse(localStorage.getItem('cq_arc_hs')||'{}');return hs.memory&&hs.memory>0;}catch{return false;}}, hint:'???'},
  jk1:         {cond:s=>isModeUnlocked('pitch'),       hint:'Débloquer Le Pitch'},
  jk2:         {cond:s=>isModeUnlocked('versusfilms'),  hint:'Débloquer Versus Films'},
  jk3:         {cond:s=>isModeUnlocked('survie'),       hint:'Débloquer Survie'},
  jk4:         {cond:s=>isModeUnlocked('versusfilms')&&(s.xp||0)>=500, hint:'500 XP + Versus Films — Arcade Secrète'},
  jk5:         {cond:s=>(s.xp||0)>=1000,               hint:'1 000 XP requis — Arcade Secrète'},
  jk7:         {cond:s=>(s.xp||0)>=800,                   hint:'800 XP requis — Salle Secrète Hidden Movies'},
  jk8:         {cond:s=>(s.xp||0)>=1200,                  hint:'1 200 XP requis — Arcade Secrète'},
  jk9:         {cond:s=>(s.xp||0)>=1600,                  hint:'1 600 XP requis — Salle Secrète Hidden Movies'},
  jk10:        {cond:s=>(s.games||0)>=20,                  hint:'20 parties jouées — Arcade Secrète'},
  jk11:        {cond:s=>(s.games||0)>=30,                  hint:'30 parties jouées — Arcade Secrète'},
  jk12:        {cond:s=>(s.games||0)>=40,                  hint:'40 parties jouées — Arcade Secrète'},
  jk13:        {cond:s=>(s.best||0)>=1500,                 hint:'1 500 pts en une partie — Arcade Secrète'},
  jk14:        {cond:s=>(s.best||0)>=2000,                 hint:'2 000 pts en une partie'},
  jk15:        {cond:s=>(s.perfects||0)>=1,                hint:'1 partie parfaite (10/10)'},
  jk16:        {cond:s=>isModeUnlocked('versus'),           hint:'Débloquer Multijoueur'},
  jk17:        {cond:s=>(s.games||0)>=10,  hint:'10 parties jouées'},
  jk18:        {cond:s=>(s.xp||0)>=300,  hint:'300 XP requis'},
  jk19:        {cond:s=>(s.games||0)>=20,  hint:'20 parties jouées'},
  jk20:        {cond:s=>(s.xp||0)>=600,  hint:'600 XP requis'},
  jk21:        {cond:s=>(s.games||0)>=30,  hint:'30 parties jouées'},
  jk22:        {cond:s=>(s.xp||0)>=900,  hint:'900 XP requis'},
  jk23:        {cond:s=>(s.best||0)>=800,  hint:'800 pts en une partie'},
  jk24:        {cond:s=>(s.games||0)>=50,  hint:'50 parties jouées'},
  jk25:        {cond:s=>(s.xp||0)>=1200,  hint:'1 200 XP requis'},
  jk26:        {cond:s=>(s.best||0)>=1000,  hint:'1 000 pts en une partie'},
  jk27:        {cond:s=>(s.games||0)>=60,  hint:'60 parties jouées'},
  jk28:        {cond:s=>(s.xp||0)>=1600,  hint:'1 600 XP requis'},
  jk29:        {cond:s=>(s.best||0)>=1200,  hint:'1 200 pts en une partie'},
  jk30:        {cond:s=>(s.games||0)>=80,  hint:'80 parties jouées'},
  jk31:        {cond:s=>(s.xp||0)>=2000,  hint:'2 000 XP requis'},
  jk32:        {cond:s=>(s.best||0)>=1500,  hint:'1 500 pts en une partie'},
  jk33:        {cond:s=>(s.games||0)>=100,  hint:'100 parties jouées'},
  jk34:        {cond:s=>(s.xp||0)>=2500,  hint:'2 500 XP requis'},
  jk35:        {cond:s=>(s.best||0)>=1800,  hint:'1 800 pts en une partie'},
  jk36:        {cond:s=>(s.games||0)>=125,  hint:'1 parties jouées'},
  jk37:        {cond:s=>(s.xp||0)>=3000,  hint:'3 000 XP requis'},
  jk38:        {cond:s=>(s.best||0)>=2000,  hint:'2 000 pts en une partie'},
  jk39:        {cond:s=>(s.games||0)>=120,  hint:'120 parties jouées'},
  jk40:        {cond:s=>(s.xp||0)>=4000,  hint:'4 000 XP requis'},
  jk41:        {cond:s=>(s.games||0)>=140,  hint:'140 parties jouées'},
  jk42:        {cond:s=>(s.xp||0)>=5000,  hint:'5 000 XP requis'},
  jk43:        {cond:s=>(s.best||0)>=2200,  hint:'2 200 pts en une partie'},
  jk44:        {cond:s=>(s.games||0)>=160,  hint:'160 parties jouées'},
  jk45:        {cond:s=>(s.xp||0)>=6000,  hint:'6 000 XP requis'},
  jk46:        {cond:s=>(s.best||0)>=2500,  hint:'2 500 pts en une partie'},
  jk47:        {cond:s=>(s.games||0)>=180,  hint:'180 parties jouées'},
  jk48:        {cond:s=>(s.xp||0)>=7000,  hint:'7 000 XP requis'},
  jk49:        {cond:s=>(s.best||0)>=2800,  hint:'2 800 pts en une partie'},
  jk50:        {cond:s=>(s.games||0)>=200,  hint:'200 parties jouées'},
  jk52:        {cond:s=>(s.best||0)>=3000,  hint:'3 000 pts en une partie'},
  jk53:        {cond:s=>(s.games||0)>=220,  hint:'220 parties jouées'},
  jk54:        {cond:s=>(s.xp||0)>=10000,  hint:'10 000 XP requis'},
  jk55:        {cond:s=>(s.best||0)>=3500,  hint:'3 500 pts en une partie'},
  jk56:        {cond:s=>(s.games||0)>=240,  hint:'240 parties jouées'},
  jk57:        {cond:s=>(s.xp||0)>=11000,  hint:'11 000 XP requis'},
  jk58:        {cond:s=>(s.best||0)>=4000,  hint:'4 000 pts en une partie'},
  jk59:        {cond:s=>(s.games||0)>=260,  hint:'260 parties jouées'},
  jk60:        {cond:s=>(s.xp||0)>=12000,  hint:'12 000 XP requis'},
  jk61:        {cond:s=>(s.best||0)>=4500,  hint:'4 500 pts en une partie'},
  jk62:        {cond:s=>(s.games||0)>=280,  hint:'280 parties jouées'},
  jk63:        {cond:s=>(s.xp||0)>=13000,  hint:'13 000 XP requis'},
  jk64:        {cond:s=>(s.best||0)>=5000,  hint:'5 000 pts en une partie'},
  jk65:        {cond:s=>(s.games||0)>=300,  hint:'300 parties jouées'},
  jk66:        {cond:s=>(s.xp||0)>=14000,  hint:'14 000 XP requis'},
};
function isTrackUnlocked(k){const s=ls();const u=TRACK_UNLOCK[k];return!u||u.cond(s);}

function updateJkDot(){
  const seen=JSON.parse(localStorage.getItem('cq_jk_seen')||'[]');
  const hasNew=JK_KEYS.some(k=>{
    const u=TRACK_UNLOCK[k];
    return u&&u.hint&&isTrackUnlocked(k)&&!seen.includes(k);
  });
  const dot=document.getElementById('jk-new-dot');
  if(dot)dot.style.display=hasNew?'block':'none';
}

function markJkSeen(){
  try{
    const seen=JSON.parse(localStorage.getItem('cq_jk_seen')||'[]');
    JK_KEYS.forEach(k=>{if(isTrackUnlocked(k)&&!seen.includes(k))seen.push(k);});
    localStorage.setItem('cq_jk_seen',JSON.stringify(seen));
  }catch(e){}
  updateJkDot();
}

function buildJkPlaylist(){
  const wrap=document.getElementById('jk-playlist');if(!wrap)return;
  const a=window._jkAudio;const curKey=_jkCurrentKey();const isPlaying=a&&!a.paused;
  const ambKey=getAmbientKey();
  const svgStar=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`;
  const svgStarFill=`<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`;
  const svgLock=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
  wrap.innerHTML=JK_KEYS.map((k,i)=>{
    const info=MUSIC_LABELS[k]||{icon:'🎵',label:k};
    const track=MUSIC_TRACK_NAMES[k]||MUSIC_FILES[k]||k;
    const active=k===curKey;
    const isAmb=k===ambKey;
    const unlocked=isTrackUnlocked(k);
    const u=TRACK_UNLOCK[k];
    const hint=u&&u.hint?u.hint:'';
    const eq=active&&isPlaying&&unlocked?`<div class="jk-eq"><div class="jk-eq-bar"></div><div class="jk-eq-bar"></div><div class="jk-eq-bar"></div></div>`:'';
    if(!unlocked){
      return`<div class="jk-row locked" onclick="openJkLockModal('${k}')" style="cursor:pointer;">
        <div class="jk-row-icon">${info.icon}</div>
        <div class="jk-row-info">
          <div class="jk-row-name">${track}</div>
          <div class="jk-unlock-hint">🔒 ${hint}</div>
        </div>
        <div class="jk-row-lock">${svgLock}</div>
      </div>`;
    }
    return`<div class="jk-row${active?' active':''}" onclick="_jkPlayKey('${k}',${i})">
      <div class="jk-row-icon">${info.icon}</div>
      <div class="jk-row-info"><div class="jk-row-name">${track}</div><div class="jk-row-label">${info.label}</div></div>
      ${eq}
      <button class="jk-amb-btn${isAmb?' is-amb':''}" title="Définir comme ambiance" onclick="event.stopPropagation();jkSetAmbient('${k}')">${isAmb?svgStarFill:svgStar}</button>
    </div>`;
  }).join('');
}

function jkSetAmbient(key){
  setAmbientKey(key);
  const info=MUSIC_LABELS[key]||{icon:'🎵',label:key};
  const trackName=MUSIC_TRACK_NAMES[key]||info.label;
  showBadgeToast({icon:'🎵',name:trackName,sub:'Définie comme ambiance'});
  buildJkPlaylist();
}

// ═══════════════════════════════════════
// JUKEBOX — AMÉLIORATIONS
// ═══════════════════════════════════════



// ── Crossfade entre pistes ──
function _jkCrossfade(newKey,newIdx){
  const oldAudio=window._jkAudio;
  const FADE=500;
  _jkIdx=newIdx;
  const src=MUSIC_FILES[newKey];
  if(!src){stopMus();updateMiniPlayer();updateJukeboxDisplay();return;}
  const newAudio=new Audio(src);
  newAudio.loop=false;newAudio.volume=0;newAudio._jkKey=newKey;
  newAudio.play().catch(()=>{});
  window._jkAudio=newAudio;
  _curMode=newKey;musOn=true;
  // Fade in nouveau + fade out ancien
  if(typeof fadeTrack==='function'){
    if(oldAudio&&!oldAudio.paused)fadeTrack(oldAudio,0,FADE,()=>{oldAudio.pause();});
    fadeTrack(newAudio,0.55,FADE);
  }else{
    if(oldAudio)oldAudio.pause();
    newAudio.volume=0.55;
  }
  newAudio._nextPending=false;
  newAudio.addEventListener('ended',()=>{if(window._jkAudio===newAudio)playerNext();});
  updateMiniPlayer();updateJukeboxDisplay();buildJkPlaylist();_startProgInterval();
}



function openJukebox(){
  const gbg=document.getElementById('game-bg');if(gbg)gbg.className='on mode-jukebox';
  go('jukebox');
  markJkSeen();
  // Ne pas couper la musique en cours — le jukebox prend la main en douceur
  // Toujours démarrer sur la section musique
  const musicSec=document.getElementById('jk-music-section');
  const videoSec=document.getElementById('jk-video-section');
  const hero=document.querySelector('#jukebox .jk-hero');
  if(musicSec)musicSec.style.display='flex';
  if(videoSec)videoSec.style.display='none';
  if(hero)hero.style.display='';
  // Reset des points Konami visuellement
  const dotsWrap=document.getElementById('jk-konami-dots');
  if(dotsWrap&&_jkKonamiStep===0)dotsWrap.style.opacity='0';
  // Init Konami (safe à appeler plusieurs fois)
  _jkKonamiInit();
  // Sync shuffle
  const sb=document.getElementById('jk-shuffle-btn');
  if(sb){sb.style.color=_jkShuffle?'var(--gold)':'rgba(255,255,255,.6)';sb.style.borderColor=_jkShuffle?'rgba(245,200,66,.4)':'rgba(255,255,255,.11)';}
  // Sync mute
  _jkUpdateMuteBtn();  // Mettre à jour l'affichage sans lancer de musique — l'utilisateur choisit
  updateMiniPlayer();
  updateJukeboxDisplay();
  buildJkPlaylist();
  if(window._jkAudio&&!window._jkAudio.paused){_startProgInterval();}
  // ── Condensed hero on playlist scroll ──
  _jkInitCondensed();
  // ── Easter egg Chef d'orchestre : 2h dans le Jukebox ──
  if(!eeIsFound('ee_maestro')){
    window._jkMaestroTimer = setTimeout(function(){
      eeTrigger('ee_maestro');
    }, 2 * 60 * 60 * 1000); // 2 heures
  }
  // ── Tracker temps Jukebox ──
  window._jkOpenTime = Date.now();
}

function _jkInitCondensed(){
  const playlist = document.getElementById('jk-playlist') || document.getElementById('jk-music-section');
  const hero = document.querySelector('#jukebox .jk-hero');
  if(!playlist || !hero) return;
  // Éviter double init
  if(playlist._condensedInit) return;
  playlist._condensedInit = true;

  let _lastScrollY = 0;
  let _condensed = false;

  const setCondensed = (on) => {
    if(_condensed === on) return;
    _condensed = on;
    if(on){
      hero.classList.add('condensed');
    } else {
      hero.classList.remove('condensed');
    }
    if(navigator.vibrate) navigator.vibrate(4);
  };

  // Scroll de la playlist
  playlist.addEventListener('scroll', () => {
    const sy = playlist.scrollTop;
    if(sy > 30 && !_condensed) setCondensed(true);
    if(sy < 8 && _condensed) setCondensed(false);
    _lastScrollY = sy;
  }, { passive: true });

  // Swipe vertical sur le hero lui-même → condense/expand
  let _heroTY = 0;
  hero.addEventListener('touchstart', e => { _heroTY = e.touches[0].clientY; }, { passive: true });
  hero.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - _heroTY;
    if(dy < -40) setCondensed(true);
    if(dy > 40)  setCondensed(false);
  }, { passive: true });
}

function closeJukebox(){
  _stopProgInterval();
  // Reset condensed state
  const hero = document.querySelector('#jukebox .jk-hero');
  if(hero) hero.classList.remove('condensed');
  const playlist = document.getElementById('jk-playlist');
  if(playlist) { playlist._condensedInit = false; }
  // Annuler le timer Chef d'orchestre si on quitte avant 2h
  if(window._jkMaestroTimer){ clearTimeout(window._jkMaestroTimer); window._jkMaestroTimer=null; }
  // ── Sauvegarder le temps passé dans le Jukebox ──
  if(window._jkOpenTime){
    const sec = Math.round((Date.now() - window._jkOpenTime) / 1000);
    if(sec > 0){ const _sj=ls(); _sj.jkplaytime=(_sj.jkplaytime||0)+sec; ss(_sj); }
    window._jkOpenTime = null;
  }
  // Pause vidéo si active (FLINGO FREESTYLE ou autre)
  const vid=document.getElementById('jk-video-player');
  if(vid&&!vid.paused){vid.pause();vid.src='';}
  go('home');
  const gbg=document.getElementById('game-bg');if(gbg)gbg.classList.remove('on');
  updateMiniPlayer();
  // Si jukebox actif, il continue — switchMusic('home') ajustera juste son volume
  // Sinon, reprendre la musique prédéfinie normalement
  if(musOn) setTimeout(()=>switchMusic('home',0.3),300);
}

// ══ ZONE VIDÉO SECRÈTE ══
const JK_VIDEOS=[
  {name:"Spidey",                          src:"Spidey.mp4",                                  icon:'🕷️'},
  {name:"Hero",                            src:"Hero.mp4",                                    icon:'🦸'},
  {name:"Heath",                           src:"Heath.mp4",                                   icon:'🃏'},
  {name:"Space Odyssey",                   src:"Space Odyssey.mp4",                           icon:'🚀'},
  {name:"𝘼 𝙇𝙤𝙫𝙚 𝙇𝙚𝙩𝙩𝙚𝙧 𝙩𝙤 𝘾𝙞𝙣𝙚𝙢𝙖",         src:"A Love Letter to Cinema.mp4",                icon:'💌'},
  {name:"After Hours",                     src:"AH.mp4",                                      icon:'🌃'},
  {name:"Apocalypse Now",                  src:"Apocalypse Now.mp4",                          icon:'🔥'},
  {name:"Blade Runner 2049",               src:"Blade Runner 2049.mp4",                       icon:'🤖'},
  {name:"Boogie Nights",                   src:"BN.mp4",                                      icon:'🕺'},
  {name:"Boxing in Cinema",               src:"BOXING IN CINEMA.mp4",                        icon:'🥊'},
  {name:"Casino",                          src:"Casino.mp4",                                  icon:'🎰'},
  {name:"Chamber Of Reflection",          src:"Chamber Of Reflection.mp4",                   icon:'🪞'},
  {name:"Christmas",                       src:"CHRISTMAS.mp4",                               icon:'🎄'},
  {name:"Cinema Matters",                 src:"CINEMA MATTERS.mp4",                          icon:'📽️'},
  {name:"Collateral",                      src:"Collateral.mp4",                              icon:'🌆'},
  {name:"Corleone",                        src:"Corleone.mp4",                                icon:'🌹'},
  {name:"Dance in Cinema",                src:"DANCE in Cinema.mp4",                         icon:'💃'},
  {name:"Deadpool",                        src:"Deadpool.mp4",                                icon:'⚔️'},
  {name:"Every Living Breathing Moment",  src:"Every Living Breathing Moment.mp4",           icon:'🫁'},
  {name:"Fight Club",                      src:"Fight Club.mp4",                              icon:'👊'},
  {name:"Goodfellas",                      src:"Goodfellas.mp4",                              icon:'🤵'},
  {name:"Hold onto hope",                  src:"Hold onto hope.mp4",                          icon:'🕊️'},
  {name:"I wanna make movies one day",     src:"I wanna make movies one day.mp4",             icon:'🎥'},
  {name:"La Haine",                        src:"La Haine.mp4",                                icon:'🏙️'},
  {name:"Let Down",                        src:"Let Down.mp4",                                icon:'🌧️'},
  {name:"Life with Passion",              src:"LIFE WITH PASSION.mp4",                       icon:'❤️‍🔥'},
  {name:"Love in Cinema",                 src:"LOVE in Cinema.mp4",                          icon:'💕'},
  {name:"Love Letter to Cinema",          src:"Love Letter to Cinema.mp4",                   icon:'💝'},
  {name:"Mid90s",                          src:"90s.mp4",                                     icon:'🛹'},
  {name:"Music in Movies",                src:"Music in Movies.mp4",                         icon:'🎵'},
  {name:"Nightcrawler",                    src:"Nightcrawler.mp4",                            icon:'📷'},
  {name:"Prisoners",                       src:"Prisoners.mp4",                               icon:'🔒'},
  {name:"Psycho Killer",                  src:"PSYCHO KILLER.mp4",                           icon:'🔪'},
  {name:"Pulp Fiction",                    src:"Pulp Fiction.mp4",                            icon:'💼'},
  {name:"Tarantino",                       src:"Tarantino.mp4",                               icon:'🎬'},
  {name:"Rise and Fall",                   src:"Rise and Fall.mp4",                           icon:'📈'},
  {name:"Smile",                           src:"Smile.mp4",                                   icon:'😁'},
  {name:"Spring",                          src:"Spring.mp4",                                  icon:'🌸'},
  {name:"Superbad",                        src:"Superbad.mp4",                                icon:'🍺'},
  {name:"The Dark Knight",                 src:"The Dark Knight.mp4",                         icon:'🦇'},
  {name:"The Matrix",                      src:"The Matrix.mp4",                              icon:'💊'},
  {name:"The Usual Suspects",              src:"The Usual Suspects.mp4",                      icon:'🕵️'},
  {name:"The Wolf of Wall Street",         src:"The Wolf of Wall Street.mp4",                 icon:'💰'},
  {name:"Where did the magic go",          src:"Where did the magic go.mp4",                  icon:'✨'},
  {name:"Winter",                          src:"WINTER.mp4",                                  icon:'❄️'},
  {name:"2 Fast 2 Furious",                       src:"2 Fast 2 Furious.mp4",           icon:'🚗'},
  {name:"Avengers",                       src:"Avengers.mp4",           icon:'🦸'},
  {name:"Marty",                       src:"Marty.mp4",           icon:'⏰'},
  {name:"Speed",                       src:"Speed.mp4",           icon:'💨'},
  {name:"Who\'s your hero",                       src:"Who is your hero.mp4",           icon:'🏆'},
  {name:"La Séance de Marty",          src:"La Seance de Marty.mp4",         icon:'🎬'},
  {name:"2026",                        src:"2026.mp4",                        icon:'📅'},
  {name:"Tron",                        src:"Tron.mp4",                        icon:'💾'},
  {name:"Brand New Day",               src:"Brand New Day.mp4",               icon:'🌅'},
  {name:"Django",                      src:"Django.mp4",                      icon:'🤠'},
  {name:"Peter",                       src:"Peter.mp4",                       icon:'🧒'},
  {name:"Batman",                      src:"Batman.mp4",                      icon:'🦇'},
  {name:"Jack",                        src:"Jack.mp4",                        icon:'🃏'},
  {name:"Avatar",                      src:"Avatar.mp4",                      icon:'🌿'},
  {name:"Rottweiler",                  src:"Rottweiler.mp4",                  icon:'🐕'},
  {name:"Jacob Ladder",                   src:"Jacob Ladder.mp4",                          icon:'🪜'},
  {name:"Pineapple Express",               src:"Pineapple Express.mp4",                      icon:'🍍'},
  {name:"The Winter Soldier",              src:"The Winter Soldier.mp4",                     icon:'🛡️'},
  {name:"Spider",                          src:"Spider.mp4",                                  icon:'🕷️'},
  {name:"Dream Big",                       src:"Dream Big.mp4",                               icon:'💫'},
  {name:"Peter Jackson",                   src:"Peter Jackson.mp4",                           icon:'🎬'},
  {name:"Quentin Tarantino",               src:"Quentin Tarantino.mp4",                       icon:'🎥'},
  {name:"Lonely Man",                      src:"Lonely Man.mp4",                              icon:'🚶'},
  {name:"Train Dream",                     src:"Train Dream.mp4",                             icon:'🚂'},
  {name:"Travis",                          src:"Travis.mp4",                                  icon:'🌃'},
  {name:"Oldboy X Memories of Murder",     src:"Oldboy X Memories of Murder.mp4",             icon:'🔍'},
  {name:"Carlitos Way",                    src:"Carlitos Way.mp4",                            icon:'🌆'},
  {name:"Little Miss Sunshine",            src:"Little Miss Sunshine.mp4",                    icon:'☀️'},
  {name:"Back to the Future",              src:"Back to the Future.mp4",                      icon:'⏱️'},
  {name:"Hacksaw Ridge",                   src:"Hacksaw Ridge.mp4",                           icon:'⚔️'},
  {name:"Goonies",                         src:"Goonies.mp4",                                 icon:'🗺️'},
  {name:"Harry Osborn",                    src:"Harry Osborn.mp4",                            icon:'🧪'},
  {name:"Cycles",                          src:"Cycles.mp4",                                  icon:'🔄'},
  {name:"Star Wars",                       src:"Star Wars.mp4",                               icon:'⭐'},
  {name:"1996",                            src:"1996.mp4",                                    icon:'📼'},
  {name:"A Bronx Tale",                    src:"A Bronx Tale.mp4",                            icon:'🗽'},
  {name:"Actors",                          src:"Actors.mp4",                                  icon:'🎭'},
  {name:"Adventureland",                   src:"Adventureland.mp4",                           icon:'🎡'},
  {name:"Aftersun",                        src:"AfterSun.mp4",                                icon:'🌅'},
  {name:"Apocalypse",                      src:"ApocalypseNow.mp4",                           icon:'🔥'},
  {name:"Beetlejuice",                     src:"Beetlejuice.mp4",                             icon:'👻'},
  {name:"Boogie",                          src:"Boogie Nights.mp4",                           icon:'🕺'},
  {name:"Casino",                          src:"Casin0.mp4",                                  icon:'🎲'},
  {name:"Cast Away",                       src:"Cast Away.mp4",                               icon:'🏝️'},
  {name:"City of God",                     src:"City of God.mp4",                             icon:'🌆'},
  {name:"Dance",                           src:"Dance.mp4",                                   icon:'💃'},
  {name:"Dazed",                           src:"Dazed.mp4",                                   icon:'☮️'},
  {name:"Ex Machina",                      src:"Ex Machina.mp4",                              icon:'🤖'},
  {name:"Eyes Wide Shut",                  src:"Eyes Wide Shut.mp4",                          icon:'👁️'},
  {name:"Forrest Gump",                    src:"Forrest Gump.mp4",                            icon:'🏃'},
  {name:"Full Metal Jacket",               src:"Full Metal Jacket.mp4",                       icon:'🪖'},
  {name:"Gone Girl",                       src:"Gone Girl.mp4",                               icon:'🔎'},
  {name:"In the Mood for Love",            src:"In the Mood for Love.mp4",                    icon:'🌺'},
  {name:"James Bond",                      src:"James Bond.mp4",                              icon:'🔫'},
  {name:"La La Land",                      src:"La La Land.mp4",                              icon:'🌟'},
  {name:"Maman",                           src:"Maman.mp4",                                   icon:'❤️'},
  {name:"M4trix",                          src:"Matrix.mp4",                                  icon:'💊'},
  {name:"90s",                             src:"Mid90s.mp4",                                  icon:'🛹'},
  {name:"Moonlight",                       src:"Moonlight.mp4",                               icon:'🌙'},
  {name:"Projet Hail Mary",               src:"Projet Hail Mary.mp4",                        icon:'🚀'},
  {name:"Scooby Doo",                      src:"ScoobyDoo.mp4",                               icon:'🐾'},
  {name:"Se7en",                           src:"Se7en.mp4",                                   icon:'🔍'},
  {name:"Spider-Man 2099",                 src:"SpiderMan 2099.mp4",                          icon:'🕷️'},
  {name:"The Florida Project",             src:"The Florida Project.mp4",                     icon:'🌴'},
  {name:"The Game",                        src:"The Game.mp4",                                icon:'♟️'},
  {name:"The Hateful Eight",               src:"The Hateful Eight.mp4",                       icon:'❄️'},
  {name:"Wild Tales",                      src:"Wild Tales.mp4",                              icon:'🌪️'},
];
let _jkVidIdx=-1;

// ══ KONAMI SECRET — séquence complexe 3 zones, 11 steps, timeout 2s ══
// Zones : 'icon' (🎵 grand), 'title' (JUKEBOX topbar), 'mode' (label piste courante)
// ══ KONAMI SWIPE — ↑↓←→↑↓←→ sur l'emoji 🎵 ══
// Séquence : up down left right up down left right (8 swipes)
const JK_SWIPE_SEQ=['up','up','down','down','left','right','left','right'];
const JK_KONAMI_LEN=JK_SWIPE_SEQ.length; // 8
let _jkKonamiStep=0;
let _jkKonamiTimer=null;
let _jkVidUnlocked=false;
let _jkLastSwipeTime=0;
try{if(localStorage.getItem('cq_jk_secret_found'))_jkVidUnlocked=true;}catch{}

function _jkSwipe(dir){
  const now=Date.now();
  // Reset si > 3s d'inactivité
  if(_jkKonamiStep>0&&now-_jkLastSwipeTime>3000){
    _jkKonamiStep=0;
  }
  _jkLastSwipeTime=now;

  if(dir!==JK_SWIPE_SEQ[_jkKonamiStep]){
    // Mauvaise direction — reset silencieux
    _jkKonamiStep=0;
    clearTimeout(_jkKonamiTimer);
    return;
  }

  _jkKonamiStep++;

  // Reset auto après 3s d'inactivité
  clearTimeout(_jkKonamiTimer);
  _jkKonamiTimer=setTimeout(()=>{
    _jkKonamiStep=0;_jkLastSwipeTime=0;
  },3000);

  // Séquence complète !
  if(_jkKonamiStep>=JK_KONAMI_LEN){
    clearTimeout(_jkKonamiTimer);
    _jkKonamiStep=0;_jkLastSwipeTime=0;
    _jkVidUnlocked=true;
    try{localStorage.setItem('cq_jk_secret_found','1');}catch{}
    _jkSecretEntry();
  }
}

function _jkKonamiUpdateDots(){
  // Feedback visuel désactivé — dots toujours éteints
}

function _jkKonamiInit(){
  if(window._jkKonamiInited)return;
  window._jkKonamiInited=true;
  const icon=document.getElementById('jk-icon');
  if(!icon)return;

  // Rendre l'icône interactive pour les swipes
  icon.style.pointerEvents='all';
  icon.style.touchAction='none'; // empêcher le scroll natif sur cet élément

  // ── Effet joystick ──
  const JK_MAX_TILT=14;   // px de déplacement max
  const JK_MAX_ROT=12;    // degrés de rotation max
  const JK_MAX_DIST=60;   // distance doigt max prise en compte

  function _jkTilt(dx,dy){
    // Contraindre aux 4 axes cardinaux — axe dominant gagne, l'autre = 0
    if(Math.abs(dx)>=Math.abs(dy)){ dy=0; } else { dx=0; }
    const dist=Math.sqrt(dx*dx+dy*dy);
    const ratio=Math.min(dist,JK_MAX_DIST)/JK_MAX_DIST;
    const nx=dx/Math.max(dist,1);
    const ny=dy/Math.max(dist,1);
    const tx=nx*ratio*JK_MAX_TILT;
    const ty=ny*ratio*JK_MAX_TILT;
    const rx=-ny*ratio*JK_MAX_ROT; // inclinaison avant/arrière
    const ry= nx*ratio*JK_MAX_ROT; // inclinaison gauche/droite
    icon.style.animation='none';
    icon.style.transition='transform 0.05s linear';
    icon.style.transform=`translate(${tx}px,${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.08)`;
  }

  function _jkRelease(){
    icon.style.transition='transform 0.45s cubic-bezier(.34,1.56,.64,1)';
    icon.style.transform='translate(0,0) rotateX(0deg) rotateY(0deg) scale(1)';
    // Réactiver l'animation flottante après le rebond
    setTimeout(()=>{
      icon.style.transition='';
      icon.style.transform='';
      icon.style.animation='';
    },480);
  }

  let _tx=0,_ty=0,_active=false;
  const MIN_DIST=30; // pixels minimum pour valider un swipe

  icon.addEventListener('touchstart',e=>{
    e.preventDefault();e.stopPropagation();
    _tx=e.touches[0].clientX;
    _ty=e.touches[0].clientY;
    _active=true;
  },{passive:false});

  icon.addEventListener('touchmove',e=>{
    if(!_active)return;
    e.preventDefault();e.stopPropagation();
    const dx=e.touches[0].clientX-_tx;
    const dy=e.touches[0].clientY-_ty;
    _jkTilt(dx,dy);
  },{passive:false});

  icon.addEventListener('touchend',e=>{
    if(!_active)return;
    e.preventDefault();e.stopPropagation();
    _active=false;
    const dx=e.changedTouches[0].clientX-_tx;
    const dy=e.changedTouches[0].clientY-_ty;
    const adx=Math.abs(dx), ady=Math.abs(dy);
    _jkRelease();
    if(adx<MIN_DIST&&ady<MIN_DIST)return; // trop court — ignorer
    // Déterminer direction dominante
    if(adx>ady){_jkSwipe(dx>0?'right':'left');}
    else{_jkSwipe(dy>0?'down':'up');}
  },{passive:false});

  icon.addEventListener('touchcancel',e=>{
    _active=false;
    _jkRelease();
  },{passive:false});

  // Support souris (desktop)
  let _mx=0,_my=0,_mdown=false;
  icon.addEventListener('mousedown',e=>{_mx=e.clientX;_my=e.clientY;_mdown=true;});
  icon.addEventListener('mousemove',e=>{
    if(!_mdown)return;
    _jkTilt(e.clientX-_mx,e.clientY-_my);
  });
  icon.addEventListener('mouseup',e=>{
    if(!_mdown)return;_mdown=false;
    const dx=e.clientX-_mx,dy=e.clientY-_my;
    const adx=Math.abs(dx),ady=Math.abs(dy);
    _jkRelease();
    if(adx<MIN_DIST&&ady<MIN_DIST)return;
    if(adx>ady){_jkSwipe(dx>0?'right':'left');}
    else{_jkSwipe(dy>0?'down':'up');}
  });
  icon.addEventListener('mouseleave',e=>{
    if(!_mdown)return;_mdown=false;
    _jkRelease();
  });
}

// ══════════════════════════════════════════════════════
// ANIMATION ENTRÉE ZONE SECRÈTE — Neural Noise + cadenas
// config: { label, emoji, color:[r,g,b], accentHex, callback }
// ══════════════════════════════════════════════════════
function _secretZoneEntry(cfg){
  const {label='ZONE SECRÈTE', emoji='🔐', color=[155,95,0], accentHex='#f5c842', onReady} = cfg;
  const [r,g,b]=color;

  function tick(freq,vol=0.07){
    try{
      const ac=window._hmSecretAudioCtx||(window._hmSecretAudioCtx=new(window.AudioContext||window.webkitAudioContext)());
      const o=ac.createOscillator(),gn=ac.createGain();
      o.connect(gn);gn.connect(ac.destination);
      o.type='sine';o.frequency.value=freq;
      gn.gain.setValueAtTime(vol,ac.currentTime);
      gn.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.15);
      o.start();o.stop(ac.currentTime+0.15);
    }catch(e){}
  }

  // ── Overlay plein écran ──
  const overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;z-index:9998;background:#000;pointer-events:all;opacity:0;transition:opacity .35s ease;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;overflow:hidden;';

  // Canvas WebGL Neural Noise
  const canvas=document.createElement('canvas');
  canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.2s ease;';
  overlay.appendChild(canvas);

  // Cadenas + label
  const lock=document.createElement('div');
  lock.style.cssText=`position:relative;z-index:2;font-size:64px;line-height:1;text-align:center;opacity:0;transform:scale(.5) translateY(20px);transition:all .55s cubic-bezier(.34,1.56,.64,1);`;
  lock.textContent='🔒';
  const lbl=document.createElement('div');
  lbl.style.cssText=`position:relative;z-index:2;font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:5px;color:rgba(${r},${g},${b},0);transition:color .5s ease .3s;text-align:center;`;
  lbl.textContent=label;
  const congrats=document.createElement('div');
  congrats.style.cssText=`position:relative;z-index:2;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:1.5px;color:rgba(255,255,255,0);transition:color .6s ease;text-align:center;margin-top:-6px;`;
  congrats.textContent='✦ Zone secrète découverte ✦';
  overlay.appendChild(lock);overlay.appendChild(lbl);overlay.appendChild(congrats);
  document.body.appendChild(overlay);

  // Init WebGL Neural Noise
  let animId2=null,gl2=null;
  try{
    const dpr2=Math.min(window.devicePixelRatio||1,2);
    gl2=canvas.getContext('webgl')||canvas.getContext('experimental-webgl');
    if(gl2){
      const vs=`precision mediump float;varying vec2 vUv;attribute vec2 a_position;void main(){vUv=.5*(a_position+1.);gl_Position=vec4(a_position,0.,1.);}`;
      // Fragment shader avec palette personnalisée injectée
      const [r1,g1,b1]=[r/255,g/255,b/255];
      // Couleur de base, couleur mid, couleur vive — variations sur la teinte principale
      const fs=`precision mediump float;varying vec2 vUv;uniform float u_time;uniform float u_ratio;
      vec2 rot(vec2 uv,float th){return mat2(cos(th),-sin(th),sin(th),cos(th))*uv;}
      float ns(vec2 uv,float t){vec2 sa=vec2(0.),res=vec2(0.);float sc=8.;
        for(int j=0;j<15;j++){uv=rot(uv,1.);sa=rot(sa,1.);vec2 l=uv*sc+float(j)+sa-t;sa+=sin(l);res+=(.5+.5*cos(l))/sc;sc*=1.2;}
        return res.x+res.y;}
      void main(){
        vec2 uv=.5*vUv;uv.x*=u_ratio;
        float t=.001*u_time;
        float n=ns(uv,t);
        n=1.2*pow(n,3.);n+=pow(n,10.);n=max(.0,n-.5);n*=(1.-length(vUv-.5));
        vec3 base=vec3(${(r1*.15).toFixed(3)},${(g1*.1).toFixed(3)},${(b1*.18).toFixed(3)});
        vec3 mid=vec3(${(r1*.6).toFixed(3)},${(g1*.38).toFixed(3)},${(b1*.12).toFixed(3)});
        vec3 peak=vec3(${Math.min(r1*1.1,.98).toFixed(3)},${Math.min(g1*1.0,.98).toFixed(3)},${Math.min(b1*1.15,.98).toFixed(3)});
        vec3 col=base;
        col=mix(col,mid,pow(n,.8));
        col=mix(col,peak,pow(n,2.2));
        gl_FragColor=vec4(col,n*.9+.05);
      }`;
      function mkShader(src,type){const sh=gl2.createShader(type);gl2.shaderSource(sh,src);gl2.compileShader(sh);return sh;}
      const prog2=gl2.createProgram();
      gl2.attachShader(prog2,mkShader(vs,gl2.VERTEX_SHADER));
      gl2.attachShader(prog2,mkShader(fs,gl2.FRAGMENT_SHADER));
      gl2.linkProgram(prog2);gl2.useProgram(prog2);
      const buf2=gl2.createBuffer();
      gl2.bindBuffer(gl2.ARRAY_BUFFER,buf2);
      gl2.bufferData(gl2.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl2.STATIC_DRAW);
      const loc2=gl2.getAttribLocation(prog2,'a_position');
      gl2.enableVertexAttribArray(loc2);gl2.vertexAttribPointer(loc2,2,gl2.FLOAT,false,0,0);
      const uTime=gl2.getUniformLocation(prog2,'u_time');
      const uRatio=gl2.getUniformLocation(prog2,'u_ratio');
      function resz(){canvas.width=canvas.offsetWidth*dpr2;canvas.height=canvas.offsetHeight*dpr2;gl2.viewport(0,0,canvas.width,canvas.height);gl2.uniform1f(uRatio,canvas.width/canvas.height);}
      resz();
      function renderGL(){animId2=requestAnimationFrame(renderGL);gl2.uniform1f(uTime,performance.now());gl2.drawArrays(gl2.TRIANGLE_STRIP,0,4);}
      renderGL();
    }
  }catch(e){}

  // Séquence
  tick(280,0.04);
  requestAnimationFrame(()=>{ overlay.style.opacity='1'; });

  setTimeout(()=>{
    canvas.style.opacity='0.85';
    lock.style.opacity='1';lock.style.transform='scale(1) translateY(0)';
    lbl.style.color=`rgba(${r},${g},${b},.7)`;
    tick(440,0.07);
  },400);

  setTimeout(()=>{
    lock.textContent=emoji==='🔐'?'🔓':emoji;
    lock.style.transform='scale(1.2) translateY(0)';
    congrats.style.color='rgba(255,255,255,.45)';
    tick(660,0.09);
  },1400);

  setTimeout(()=>{
    lock.style.transition='all .4s ease';
    lock.style.opacity='0';lock.style.transform='scale(1.5)';
    lbl.style.opacity='0';
    // Flash couleur
    const fl=document.createElement('div');
    fl.style.cssText=`position:fixed;inset:0;z-index:10000;background:linear-gradient(135deg,${accentHex},#fff);pointer-events:none;opacity:0;transition:opacity .06s;`;
    document.body.appendChild(fl);
    requestAnimationFrame(()=>{fl.style.opacity='1';});
    setTimeout(()=>{fl.style.transition='opacity .45s ease-out';fl.style.opacity='0';},60);
    setTimeout(()=>fl.remove(),550);
    tick(880,0.13);setTimeout(()=>tick(1050,0.09),80);
  },2300);

  setTimeout(()=>{
    if(animId2)cancelAnimationFrame(animId2);
    overlay.style.transition='opacity .55s ease';
    overlay.style.opacity='0';
    if(onReady)onReady();
    setTimeout(()=>overlay.remove(),600);
  },3000);
}

function _jkSecretEntry(){
  eeTrigger('ee_cinetek');
  _secretZoneEntry({
    label: 'CINÉTEK',
    emoji: '📺',
    color: [245, 180, 50],      // doré Jukebox
    accentHex: '#f5c842',
    onReady: ()=>jkSwitchTab('video'),
  });
}

function jkSwitchTab(tab){
  const musicSec=document.getElementById('jk-music-section');
  const videoSec=document.getElementById('jk-video-section');
  const hero=document.querySelector('#jukebox .jk-hero');
  const gbg=document.getElementById('game-bg');

  if(tab==='video'){
    musicSec.style.display='none';
    videoSec.style.display='flex';
    videoSec.style.flexDirection='column';
    // Masquer le hero audio pour maximiser l'espace vidéo
    if(hero)hero.style.display='none';
    if(gbg)gbg.className='on mode-jukebox-vid';
    // Pause audio jukebox normal
    if(window._jkAudio&&!window._jkAudio.paused){
      window._jkAudio.pause();_stopProgInterval();updateJukeboxDisplay();
    }
    // Lancer une vidéo aléatoire à l'entrée dans la zone secrète
    if(_jkVidIdx<0){
      let r=Math.floor(Math.random()*JK_VIDEOS.length);
      _jkVidIdx=r;
    }
    jkPlayVid(_jkVidIdx,true);
    if(window._jkSwipeAttach)window._jkSwipeAttach();
    buildJkVidList();
    // Bandeau de lancement CINÉTEK
    jkShowLaunchBanner(_jkVidIdx);
  } else {
    videoSec.style.display='none';
    musicSec.style.display='flex';
    if(hero)hero.style.display='';
    if(gbg)gbg.className='on mode-jukebox';
    // Pause vidéo (FLINGO FREESTYLE ou autre)
    const vid=document.getElementById('jk-video-player');
    if(vid&&!vid.paused){vid.pause();vid.src='';}
    if(!window._jkAudio||window._jkAudio.paused){_jkPlayKey(_jkCurrentKey(),_jkIdx);}
  }
}

function buildJkVidList(){
  const list=document.getElementById('jk-vid-list');if(!list)return;
  const playIcon=`<svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><polygon points="6,3 20,12 6,21"/></svg>`;
  // Séparer specials et normales, trier les normales alphabétiquement
  const specials=JK_VIDEOS.map((v,i)=>({v,i})).filter(x=>x.v.special);
  const normals=JK_VIDEOS.map((v,i)=>({v,i})).filter(x=>!x.v.special)
    .sort((a,b)=>a.v.name.localeCompare(b.v.name,'fr',{sensitivity:'base'}));
  const sorted=[...specials,...normals];

  list.innerHTML=sorted.map(({v,i})=>{
    const active=i===_jkVidIdx;
    const eq=active?`<div class="jk-vid-eq"><span></span><span></span><span></span></div>`
      :`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity=".3"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    const specialStyle=v.special?` style="border-bottom:1px solid rgba(245,200,66,.2);margin-bottom:4px;"`:'' ;
    const nameStyle=v.special?` style="color:rgba(245,200,66,.9);font-weight:600;"`:'' ;
    const icon=v.icon||(v.special?'🔫':'🎬');
    const totalNormal=JK_VIDEOS.filter(x=>!x.special).length;
    const normalIdx=normals.findIndex(x=>x.i===i)+1;
    return `<div class="jk-vid-row${active?' active':''}${v.special?' jk-vid-special':''}"${specialStyle} onclick="jkPlayVid(${i})">
      <div class="jk-vid-thumb">
        <span class="jk-vid-thumb-icon">${icon}</span>
        <div class="jk-vid-play-overlay">${playIcon}</div>
      </div>
      <div class="jk-vid-row-info">
        <div class="jk-vid-row-name"${nameStyle}>${v.name}</div>
        <div class="jk-vid-row-num">${v.special?'Zone Secrète':normalIdx+' / '+totalNormal}</div>
      </div>
      ${eq}
    </div>`;
  }).join('');
  // Scroll vers la vidéo active
  if(_jkVidIdx>=0){
    setTimeout(()=>{
      const active=list.querySelector('.jk-vid-row.active');
      if(active)active.scrollIntoView({block:'nearest',behavior:'smooth'});
    },100);
  }
}

// ── Glitch canvas + Web Audio ──
let _jkGlitchTimer=null;
let _jkAudioCtx=null;
function _jkGetAudioCtx(){
  if(!_jkAudioCtx)try{_jkAudioCtx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}
  return _jkAudioCtx;
}

function jkPlayZapSound(){
  const ctx=_jkGetAudioCtx();if(!ctx)return;
  try{
    const dur=0.18;
    const buf=ctx.createBuffer(1,Math.floor(ctx.sampleRate*dur),ctx.sampleRate);
    const data=buf.getChannelData(0);
    for(let i=0;i<data.length;i++){
      const t=i/ctx.sampleRate;
      // Bruit blanc décroissant + sweep fréquentiel
      data[i]=(Math.random()*2-1)*Math.exp(-t*22)
               +Math.sin(2*Math.PI*(800+t*-3000)*t)*0.18*Math.exp(-t*18);
    }
    const src=ctx.createBufferSource();
    src.buffer=buf;
    const gain=ctx.createGain();
    gain.gain.setValueAtTime(0.55,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    src.connect(gain);gain.connect(ctx.destination);
    src.start();
  }catch(e){}
}

function jkTriggerGlitch(cb){
  const ov=document.getElementById('jk-glitch-overlay');
  if(!ov){cb&&cb();return;}

  jkPlayZapSound();

  // Canvas noise
  const canvas=document.createElement('canvas');
  const pw=ov.parentElement?ov.parentElement.offsetWidth:612;
  const ph=ov.parentElement?ov.parentElement.offsetHeight:200;
  canvas.width=pw||612;canvas.height=ph||200;
  canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;';
  const ctx2=canvas.getContext('2d');

  // Frame 1 : bruit dense + lignes RGB
  const id=ctx2.createImageData(canvas.width,canvas.height);
  const d=id.data;
  for(let i=0;i<d.length;i+=4){
    const v=Math.random()*255|0;
    d[i]=v;d[i+1]=Math.random()*255|0;d[i+2]=Math.random()*255|0;d[i+3]=Math.random()>0.55?180:0;
  }
  ctx2.putImageData(id,0,0);

  // Lignes horizontales décalées (aberration chromatique)
  ctx2.save();
  for(let i=0;i<12;i++){
    const y=Math.random()*canvas.height;
    const h=2+Math.random()*14;
    const dx=(Math.random()-.5)*30;
    ctx2.drawImage(canvas,0,y,canvas.width,h,dx,y,canvas.width,h);
  }
  // Bandes colorées semi-transparentes
  [[255,30,30],[30,255,200],[255,220,30],[180,30,255]].forEach(([r,g,b])=>{
    if(Math.random()>.5)return;
    ctx2.fillStyle=`rgba(${r},${g},${b},${0.12+Math.random()*.2})`;
    ctx2.fillRect(0,Math.random()*canvas.height,canvas.width,2+Math.random()*10);
  });
  ctx2.restore();

  ov.innerHTML='';
  ov.appendChild(canvas);
  ov.classList.add('active');

  // Frame 2 après 80ms : bruit allégé
  const t1=setTimeout(()=>{
    const id2=ctx2.createImageData(canvas.width,canvas.height);
    const d2=id2.data;
    for(let i=0;i<d2.length;i+=4){
      const v=Math.random()*255|0;
      d2[i]=v;d2[i+1]=v;d2[i+2]=v;d2[i+3]=Math.random()>0.7?120:0;
    }
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    ctx2.putImageData(id2,0,0);
  },80);

  clearTimeout(_jkGlitchTimer);
  _jkGlitchTimer=setTimeout(()=>{
    clearTimeout(t1);
    ov.classList.remove('active');
    ov.innerHTML='';
    cb&&cb();
  },220);
}

let _jkOsdTimer=null;
function jkShowLaunchBanner(idx){
  const banner=document.getElementById('jk-launch-banner');
  const titleEl=document.getElementById('jk-launch-title');
  const chEl=document.getElementById('jk-launch-ch');
  const bar=document.getElementById('jk-launch-bar');
  if(!banner)return;
  const v=JK_VIDEOS[idx];
  const ch='CH '+String(idx+1).padStart(2,'0');
  if(titleEl)titleEl.textContent=v?v.name:'CINÉTEK';
  if(chEl)chEl.textContent=ch+' — '+String(idx+1)+' / '+JK_VIDEOS.length+' vidéos';
  // Reset bar
  if(bar){bar.style.transition='none';bar.style.transform='scaleX(0)';void bar.offsetWidth;bar.style.transition='transform 1.7s linear';}
  banner.classList.add('show');
  // Démarrer la barre
  if(bar)setTimeout(()=>bar.style.transform='scaleX(1)',50);
  // Masquer après 2s
  setTimeout(()=>banner.classList.remove('show'),2000);
}

function jkShowOSD(idx){
  const osd=document.getElementById('jk-ch-osd');
  if(!osd)return;
  const ch=String(idx+1).padStart(2,'0');
  osd.textContent='CH '+ch;
  osd.classList.add('show');
  clearTimeout(_jkOsdTimer);
  _jkOsdTimer=setTimeout(()=>osd.classList.remove('show'),1800);
}

let _jkBannerTimer=null;
function jkShowBanner(name,idx){
  const banner=document.getElementById('jk-tv-banner');
  const title=document.getElementById('jk-tv-banner-title');
  const ch=document.getElementById('jk-tv-banner-ch');
  const counter=document.getElementById('jk-vid-counter');
  if(!banner||!title)return;
  title.textContent=name;
  if(ch)ch.textContent='CH '+String(idx+1).padStart(2,'0')+' — CINÉTEK';
  if(counter)counter.textContent='CH '+String(idx+1).padStart(2,'0')+' — '+(idx+1)+' / '+JK_VIDEOS.length+' vidéos';
  banner.classList.add('show');
  clearTimeout(_jkBannerTimer);
  _jkBannerTimer=setTimeout(()=>banner.classList.remove('show'),3000);
}

function jkPlayVid(idx,skipGlitch){
  const v=JK_VIDEOS[idx];
  const vid=document.getElementById('jk-video-player');
  if(!vid||!v)return;
  const doLoad=()=>{
    _jkVidIdx=idx;
    vid.src=v.src;
    vid.load();
    const tryPlay=()=>{
      const p=vid.play();
      if(p&&p.catch)p.catch(()=>{
        setTimeout(()=>vid.play().catch(()=>{}),300);
      });
    };
    vid.addEventListener('canplay',tryPlay,{once:true});
    jkShowOSD(idx);
    jkShowBanner(v.name,idx);
    const svgPlay=document.getElementById('jk-pp-svg-play');
    const svgPause=document.getElementById('jk-pp-svg-pause');
    if(svgPlay)svgPlay.style.display='none';
    if(svgPause)svgPause.style.display='none';
    buildJkVidList();
  };
  if(skipGlitch){doLoad();return;}
  vid.pause();
  jkTriggerGlitch(doLoad);
}

function jkZapNext(){
  const next=(_jkVidIdx+1)%JK_VIDEOS.length;
  const hint=document.getElementById('jk-hint-right');
  if(hint){hint.style.opacity='1';setTimeout(()=>hint.style.opacity='',300);}
  jkPlayVid(next);
}

function jkZapPrev(){
  const prev=(_jkVidIdx-1+JK_VIDEOS.length)%JK_VIDEOS.length;
  const hint=document.getElementById('jk-hint-left');
  if(hint){hint.style.opacity='1';setTimeout(()=>hint.style.opacity='',300);}
  jkPlayVid(prev);
}

function jkZapRandom(){
  let r;
  do{r=Math.floor(Math.random()*JK_VIDEOS.length);}while(r===_jkVidIdx&&JK_VIDEOS.length>1);
  jkPlayVid(r);
}

function jkVidEnded(){
  jkZapRandom();
}

(function initJkSwipe(){
  let _sx=null,_sy=null;
  function onStart(e){const t=e.touches?e.touches[0]:e;_sx=t.clientX;_sy=t.clientY;}
  function onEnd(e){
    if(_sx===null)return;
    const t=e.changedTouches?e.changedTouches[0]:e;
    const dx=t.clientX-_sx,dy=t.clientY-_sy;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>40){if(dx<0)jkZapNext();else jkZapPrev();}
    _sx=null;_sy=null;
  }
  function attach(){
    const wrap=document.getElementById('jk-player-wrap');
    if(!wrap)return;
    wrap.removeEventListener('touchstart',onStart);
    wrap.removeEventListener('touchend',onEnd);
    wrap.addEventListener('touchstart',onStart,{passive:true});
    wrap.addEventListener('touchend',onEnd,{passive:true});
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',attach);}
  else{attach();}
  window._jkSwipeAttach=attach;
})();

let _jkPpTimer=null;
function jkTogglePlayPause(){
  const vid=document.getElementById('jk-video-player');
  const icon=document.getElementById('jk-pp-icon');
  const svgPlay=document.getElementById('jk-pp-svg-play');
  const svgPause=document.getElementById('jk-pp-svg-pause');
  if(!vid||!vid.src)return;
  if(vid.paused){
    vid.play().catch(()=>{});
    svgPlay.style.display='none'; svgPause.style.display='block';
  } else {
    vid.pause();
    svgPlay.style.display='block'; svgPause.style.display='none';
  }
  icon.classList.add('show');
  clearTimeout(_jkPpTimer);
  _jkPpTimer=setTimeout(()=>icon.classList.remove('show'),700);
}

function jkToggleFullscreen(){
  const wrap=document.querySelector('.jk-vid-player-wrap');
  const vid=document.getElementById('jk-video-player');
  const iconEnter=document.getElementById('jk-fs-icon-enter');
  const iconExit=document.getElementById('jk-fs-icon-exit');
  // iOS : plein écran natif sur la vidéo
  if(vid.webkitEnterFullscreen&&!document.fullscreenElement&&!document.webkitFullscreenElement){
    vid.webkitEnterFullscreen();return;
  }
  if(!document.fullscreenElement&&!document.webkitFullscreenElement){
    const req=wrap.requestFullscreen||wrap.webkitRequestFullscreen;
    if(req) req.call(wrap).then(()=>{
      iconEnter.style.display='none'; iconExit.style.display='block';
    }).catch(()=>{});
  } else {
    const ex=document.exitFullscreen||document.webkitExitFullscreen;
    if(ex) ex.call(document).then(()=>{
      iconEnter.style.display='block'; iconExit.style.display='none';
    }).catch(()=>{});
  }
}
document.addEventListener('fullscreenchange',()=>{
  const iconEnter=document.getElementById('jk-fs-icon-enter');
  const iconExit=document.getElementById('jk-fs-icon-exit');
  if(!iconEnter||!iconExit)return;
  if(!document.fullscreenElement&&!document.webkitFullscreenElement){
    iconEnter.style.display='block'; iconExit.style.display='none';
  }
});
document.addEventListener('webkitfullscreenchange',()=>{
  const iconEnter=document.getElementById('jk-fs-icon-enter');
  const iconExit=document.getElementById('jk-fs-icon-exit');
  if(!iconEnter||!iconExit)return;
  if(!document.fullscreenElement&&!document.webkitFullscreenElement){
    iconEnter.style.display='block'; iconExit.style.display='none';
  }
});

function initMiniPlayer(){
  if(_curMode){const idx=JK_KEYS.indexOf(_curMode);if(idx>=0)_jkIdx=idx;}
  updateMiniPlayer();
}

const _origToggleMusic=toggleMusic;
toggleMusic=function(){
  _origToggleMusic();
  if(!musOn&&window._jkAudio){window._jkAudio.pause();_stopProgInterval();}
  updateMiniPlayer();
};



// ══════════════════════════════════════════
// ARCADE SECRÈTE — Konami code + 4 mini-jeux
// ══════════════════════════════════════════
(function(){
  // Tap secret sur le logo (7 taps rapides en <4s) pour mobile
  const _logo=document.querySelector('.logo');
  let _taps=0,_tapT=0;
  if(_logo)_logo.addEventListener('click',()=>{
    const now=Date.now();if(now-_tapT>4000)_taps=0;_tapT=now;_taps++;
    // Micro-shake progressif
    const intensity = _taps / 7;
    const tx = (Math.random()-0.5) * (2 + intensity * 3);
    const ty = (Math.random()-0.5) * (1 + intensity * 1.5);
    _logo.style.transition = 'transform 0.04s ease';
    _logo.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px)`;
    clearTimeout(_logo._shakeTimer);
    _logo._shakeTimer = setTimeout(()=>{
      _logo.style.transition = 'transform 0.15s ease';
      _logo.style.transform = '';
    }, 60);
    if(_taps>=7){_taps=0;eeTrigger('ee_arcade');openArcade();}
  });
})();

function _refreshArcadeScores(){
  try{
    const hs=JSON.parse(localStorage.getItem('cq_arc_hs')||'{}');
    const el=id=>document.getElementById(id);
    if(el('arc-hs-snake'))el('arc-hs-snake').textContent='🏆 Record : '+(hs.snake||0);
    if(el('arc-hs-bricks'))el('arc-hs-bricks').textContent='🏆 Record : '+(hs.bricks||0);
    if(el('arc-hs-morpion'))el('arc-hs-morpion').textContent='Victoires : '+(hs.morpion||0);
    if(el('arc-hs-memory'))el('arc-hs-memory').textContent=hs.memory?'🏆 Meilleur score':'À battre !';
    if(el('arc-hs-speedquiz'))el('arc-hs-speedquiz').textContent='🏆 Record : '+(hs.speedquiz||0)+' pts';
    if(el('arc-hs-bobine'))el('arc-hs-bobine').textContent='🏆 Record : '+(hs.bobine||0);
    if(el('arc-hs-doodle'))el('arc-hs-doodle').textContent='🏆 Record : '+(hs.doodle||0);
  }catch(e){}
}
function _getArcadeHS(game){
  try{const hs=JSON.parse(localStorage.getItem('cq_arc_hs')||'{}');return hs[game]||0;}catch(e){return 0;}
}
function _saveArcadeHS(game,val){
  try{const hs=JSON.parse(localStorage.getItem('cq_arc_hs')||'{}');if(!hs[game]||val>hs[game]){hs[game]=val;localStorage.setItem('cq_arc_hs',JSON.stringify(hs));}}catch(e){}
  setTimeout(updateJkDot,300);
}
// ── Sons mini-jeux Doodle Ciné ──
function sndDoodleJump(){
  if(!sndOn)return;const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    const g=ctx.createGain();g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.0001,t+.18);
    const o=ctx.createOscillator();o.type='sine';
    o.frequency.setValueAtTime(320,t);o.frequency.exponentialRampToValueAtTime(640,t+.12);
    o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.18);
  }catch(e){}
}
function sndDoodleSuperJump(){
  if(!sndOn)return;const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    [[220,.14,0],[330,.11,.04],[440,.09,.09],[660,.08,.14]].forEach(([f,v,d])=>{
      const g=ctx.createGain();g.gain.setValueAtTime(v,t+d);g.gain.exponentialRampToValueAtTime(.0001,t+d+.22);
      const o=ctx.createOscillator();o.type='triangle';o.frequency.value=f;
      o.connect(g);g.connect(ctx.destination);o.start(t+d);o.stop(t+d+.22);
    });
  }catch(e){}
}
function sndDoodleBonus(){
  if(!sndOn)return;const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    [[523,.15,0],[659,.12,.06],[784,.1,.12],[1047,.08,.18]].forEach(([f,v,d])=>{
      const g=ctx.createGain();g.gain.setValueAtTime(v,t+d);g.gain.exponentialRampToValueAtTime(.0001,t+d+.18);
      const o=ctx.createOscillator();o.type='triangle';o.frequency.value=f;
      o.connect(g);g.connect(ctx.destination);o.start(t+d);o.stop(t+d+.18);
    });
  }catch(e){}
}
function sndDoodleGameOver(){
  if(!sndOn)return;const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    [[440,.2,0],[330,.18,.12],[220,.15,.26],[165,.12,.42]].forEach(([f,v,d])=>{
      const g=ctx.createGain();g.gain.setValueAtTime(v,t+d);g.gain.exponentialRampToValueAtTime(.0001,t+d+.28);
      const o=ctx.createOscillator();o.type='sawtooth';o.frequency.value=f;
      o.connect(g);g.connect(ctx.destination);o.start(t+d);o.stop(t+d+.28);
    });
  }catch(e){}
}
// ── Sons mini-jeux Bobine Infinie ──
function sndBobineCollect(){
  if(!sndOn)return;const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    const g=ctx.createGain();g.gain.setValueAtTime(.2,t);g.gain.exponentialRampToValueAtTime(.0001,t+.15);
    const o=ctx.createOscillator();o.type='sine';
    o.frequency.setValueAtTime(880,t);o.frequency.exponentialRampToValueAtTime(1320,t+.1);
    o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.15);
  }catch(e){}
}
function sndBobineCombo(){
  if(!sndOn)return;const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    [[660,.16,0],[880,.13,.05],[1100,.1,.1]].forEach(([f,v,d])=>{
      const g=ctx.createGain();g.gain.setValueAtTime(v,t+d);g.gain.exponentialRampToValueAtTime(.0001,t+d+.12);
      const o=ctx.createOscillator();o.type='sine';o.frequency.value=f;
      o.connect(g);g.connect(ctx.destination);o.start(t+d);o.stop(t+d+.12);
    });
  }catch(e){}
}
function sndBobineGameOver(){
  if(!sndOn)return;const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    const nLen=Math.ceil(ctx.sampleRate*.25);const nBuf=ctx.createBuffer(1,nLen,ctx.sampleRate);
    const nd=nBuf.getChannelData(0);
    for(let i=0;i<nLen;i++){nd[i]=(Math.random()*2-1)*Math.pow(1-i/nLen,2)*.6;}
    const ns=ctx.createBufferSource();ns.buffer=nBuf;
    const nf=ctx.createBiquadFilter();nf.type='bandpass';nf.frequency.value=400;nf.Q.value=1.5;
    const ng=ctx.createGain();ng.gain.setValueAtTime(.4,t);ng.gain.exponentialRampToValueAtTime(.0001,t+.25);
    ns.connect(nf);nf.connect(ng);ng.connect(ctx.destination);ns.start(t);
    [[220,.15,.05],[175,.12,.18]].forEach(([f,v,d])=>{
      const g=ctx.createGain();g.gain.setValueAtTime(v,t+d);g.gain.exponentialRampToValueAtTime(.0001,t+d+.35);
      const o=ctx.createOscillator();o.type='sawtooth';o.frequency.value=f;
      o.connect(g);g.connect(ctx.destination);o.start(t+d);o.stop(t+d+.35);
    });
  }catch(e){}
}

function sndArcadeOpen(){
  if(!sndOn)return;
  const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    const gLen=Math.ceil(ctx.sampleRate*.4);
    const gBuf=ctx.createBuffer(1,gLen,ctx.sampleRate);
    const gd=gBuf.getChannelData(0);
    for(let i=0;i<gLen;i++){const env=Math.pow(1-i/gLen,1.2)*(i<gLen*.1?i/(gLen*.1):1);const creak=Math.sin(i*.08+Math.sin(i*.003)*8)*0.4;gd[i]=(Math.random()*.3+creak*.7)*env*.5;}
    const gsrc=ctx.createBufferSource();gsrc.buffer=gBuf;
    const gf=ctx.createBiquadFilter();gf.type='bandpass';gf.frequency.value=280;gf.Q.value=2;
    const gg=ctx.createGain();gg.gain.setValueAtTime(.0001,t);gg.gain.linearRampToValueAtTime(.5,t+.06);gg.gain.exponentialRampToValueAtTime(.0001,t+.4);
    gsrc.connect(gf);gf.connect(gg);gg.connect(ctx.destination);gsrc.start(t);
    [0,.18].forEach(delay=>{
      const cLen=Math.ceil(ctx.sampleRate*.04);const cBuf=ctx.createBuffer(1,cLen,ctx.sampleRate);const cd=cBuf.getChannelData(0);
      for(let i=0;i<cLen;i++){cd[i]=(Math.random()*2-1)*Math.pow(1-i/cLen,4)*.8;}
      const csrc=ctx.createBufferSource();csrc.buffer=cBuf;const cf=ctx.createBiquadFilter();cf.type='highpass';cf.frequency.value=1200;
      const cg=ctx.createGain();cg.gain.setValueAtTime(.4,t+delay);cg.gain.exponentialRampToValueAtTime(.0001,t+delay+.04);
      csrc.connect(cf);cf.connect(cg);cg.connect(ctx.destination);csrc.start(t+delay);
    });
    const rg=ctx.createGain();rg.gain.setValueAtTime(.0001,t+.05);rg.gain.linearRampToValueAtTime(.15,t+.12);rg.gain.exponentialRampToValueAtTime(.0001,t+.9);
    const ro=ctx.createOscillator();ro.type='sine';ro.frequency.setValueAtTime(55,t+.05);ro.frequency.exponentialRampToValueAtTime(35,t+.8);
    ro.connect(rg);rg.connect(ctx.destination);ro.start(t+.05);ro.stop(t+.9);
    [[220,.07,.45],[277,.05,.52],[330,.04,.6]].forEach(([freq,vol,delay])=>{
      const ng=ctx.createGain();ng.gain.setValueAtTime(0,t+delay);ng.gain.linearRampToValueAtTime(vol,t+delay+.12);ng.gain.exponentialRampToValueAtTime(.0001,t+delay+1.8);
      const no=ctx.createOscillator();no.type='triangle';no.frequency.value=freq;
      no.connect(ng);ng.connect(ctx.destination);no.start(t+delay);no.stop(t+delay+2);
    });
  }catch(e){}
}

function sndPlayBtn(){
  if(!sndOn)return;
  const ctx=ac();if(!ctx)return;
  try{
    const t=ctx.currentTime;
    const cLen=Math.ceil(ctx.sampleRate*.05);
    const cBuf=ctx.createBuffer(1,cLen,ctx.sampleRate);
    const cd=cBuf.getChannelData(0);
    for(let i=0;i<cLen;i++){cd[i]=(Math.random()*2-1)*Math.pow(1-i/cLen,3)*.7;}
    const cs=ctx.createBufferSource();cs.buffer=cBuf;
    const cf=ctx.createBiquadFilter();cf.type='bandpass';cf.frequency.value=2800;cf.Q.value=1.5;
    const cg=ctx.createGain();cg.gain.setValueAtTime(.5,t);cg.gain.exponentialRampToValueAtTime(.0001,t+.05);
    cs.connect(cf);cf.connect(cg);cg.connect(ctx.destination);cs.start(t);
    [[392,.12,.04],[494,.09,.10],[588,.07,.17]].forEach(([freq,vol,delay])=>{
      const g=ctx.createGain();g.gain.setValueAtTime(0,t+delay);
      g.gain.linearRampToValueAtTime(vol,t+delay+.04);
      g.gain.exponentialRampToValueAtTime(.0001,t+delay+.7);
      const o=ctx.createOscillator();o.type='triangle';o.frequency.value=freq;
      o.connect(g);g.connect(ctx.destination);o.start(t+delay);o.stop(t+delay+.75);
    });
    const wLen=Math.ceil(ctx.sampleRate*.25);
    const wBuf=ctx.createBuffer(1,wLen,ctx.sampleRate);
    const wd=wBuf.getChannelData(0);
    for(let j=0;j<wLen;j++){const env=j<wLen*.3?j/(wLen*.3):Math.pow(1-(j-wLen*.3)/(wLen*.7),2);wd[j]=(Math.random()*2-1)*env*.08;}
    const ws=ctx.createBufferSource();ws.buffer=wBuf;
    const wf=ctx.createBiquadFilter();wf.type='highpass';wf.frequency.value=1200;
    const wg=ctx.createGain();wg.gain.setValueAtTime(.0001,t);wg.gain.linearRampToValueAtTime(.25,t+.08);wg.gain.exponentialRampToValueAtTime(.0001,t+.25);
    ws.connect(wf);wf.connect(wg);wg.connect(ctx.destination);ws.start(t);
  }catch(err){}
}

function onPlayBtn(e){
  const btn=document.getElementById('main-play-btn');

  // Ripple
  if(btn){
    const r=btn.getBoundingClientRect();
    const x=e.clientX-r.left, y=e.clientY-r.top;
    const rip=document.createElement('span');
    const size=Math.max(r.width,r.height)*1.2;
    rip.className='pbtn-ripple';
    rip.style.cssText=`width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px;`;
    btn.appendChild(rip);
    setTimeout(()=>rip.remove(),600);
  }

  // Particules dorées
  if(btn){
    const r=btn.getBoundingClientRect();
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    const N=18;
    for(let i=0;i<N;i++){
      const p=document.createElement('div');
      const size=3+Math.random()*5;
      const angle=(i/N)*Math.PI*2;
      const dist=50+Math.random()*80;
      const dur=0.5+Math.random()*0.35;
      const delay=Math.random()*0.08;
      const gold=['#f5c842','#fff3c0','#e8a800','#ffe066'][Math.floor(Math.random()*4)];
      p.style.cssText=`position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;border-radius:50%;background:${gold};pointer-events:none;z-index:9999;transform:translate(-50%,-50%);box-shadow:0 0 ${size*2}px ${gold};animation:hmParticle ${dur}s ease-out ${delay}s forwards;--tx:${Math.cos(angle)*dist}px;--ty:${Math.sin(angle)*dist}px;`;
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),(dur+delay)*1000+100);
    }
  }

  // Son
  sndPlayBtn();

  // Lancer le jeu
  setTimeout(startGame, 120);
}

function openArcade(){
  sndArcadeOpen();
  _secretZoneEntry({
    label: 'ARCADE SECRÈTE',
    emoji: '🕹️',
    color: [0, 200, 230],       // cyan électrique Arcade
    accentHex: '#00c8e6',
    onReady: ()=>{
      go('arcade-menu');
      _refreshArcadeScores();
      if(musOn)switchMusic('arcade',0.25);
    },
  });
}

