// ─── SPEED QUIZ ───
let _sqTimer=null,_sqQ=0,_sqScore=0,_sqTimeLeft=0,_sqAnswered=false,_sqQuestions=[];
const SQ_TIME=8000,SQ_COUNT=5;

const SQ_BANK=[
  {q:"Qui réalise Parasite (2019) ?",a:"Bong Joon-ho",w:["Park Chan-wook","Kim Jee-woon","Lee Chang-dong"]},
  {q:"Dans quel film Hannibal Lecter apparaît-il pour la première fois ?",a:"Le Silence des agneaux",w:["Hannibal","Dragon Rouge","Manhunter"]},
  {q:"Qui joue le Joker dans The Dark Knight ?",a:"Heath Ledger",w:["Joaquin Phoenix","Jack Nicholson","Jared Leto"]},
  {q:"Quel film remporte l'Oscar du meilleur film en 2020 ?",a:"Parasite",w:["1917","Once Upon a Time in Hollywood","Joker"]},
  {q:"Dans Inception, combien y a-t-il de niveaux de rêve ?",a:"4",w:["3","5","2"]},
  {q:"Qui compose la bande-originale de Dune (2021) ?",a:"Hans Zimmer",w:["John Williams","Ennio Morricone","Jonny Greenwood"]},
  {q:"Quel acteur joue Tony Stark dans le MCU ?",a:"Robert Downey Jr.",w:["Chris Evans","Mark Ruffalo","Jeremy Renner"]},
  {q:"La La Land se déroule dans qu'elle ville ?",a:"Los Angeles",w:["New York","Chicago","San Francisco"]},
  {q:"Qui réalise la trilogie Le Seigneur des Anneaux ?",a:"Peter Jackson",w:["James Cameron","Ridley Scott","Steven Spielberg"]},
  {q:"Dans quel film Meryl Streep joue Miranda Priestly ?",a:"Le Diable s'habille en Prada",w:["Kramer contre Kramer","Sophies Choice, The Hours"]},
  {q:"Quel film de Tarantino se passe pendant la WW2 ?",a:"Inglourious Basterds",w:["Django Unchained","The Hateful Eight","Kill Bill"]},
  {q:"Qui joue Forrest Gump ?",a:"Tom Hanks",w:["Tom Cruise","Robin Williams","Kevin Costner"]},
  {q:"Drive (2011) est réalisé par ?",a:"Nicolas Winding Refn",w:["David Fincher","Christopher Nolan","Denis Villeneuve"]},
  {q:"Quel acteur joue James Bond dans Casino Royale (2006) ?",a:"Daniel Craig",w:["Pierce Brosnan","Roger Moore","Timothy Dalton"]},
  {q:"Amélie Poulain est réalisé par ?",a:"Jean-Pierre Jeunet",w:["Luc Besson","François Ozon","Gaspar Noé"]},
  {q:"Qui joue le rôle principal dans Her (2013) ?",a:"Joaquin Phoenix",w:["Ryan Gosling","Jake Gyllenhaal","Adam Driver"]},
  {q:"Dans Titanic, qui compose la musique ?",a:"James Horner",w:["Hans Zimmer","John Williams","Danny Elfman"]},
  {q:"Moonlight remporte l'Oscar du meilleur film qu'elle année ?",a:"2017",w:["2016","2018","2019"]},
  {q:"Quel film de Denis Villeneuve est sorti en 2016 ?",a:"Arrival",w:["Sicario","Blade Runner 2049","Enemy"]},
  {q:"Qui joue Amy Dunne dans Gone Girl ?",a:"Rosamund Pike",w:["Carey Mulligan","Emily Blunt","Keira Knightley"]},
  {q:"Midsommar est réalisé par ?",a:"Ari Aster",w:["Jordan Peele","Mike Flanagan","James Wan"]},
  {q:"Quel est le premier film de la saga John Wick ?",a:"2014",w:["2012","2016","2015"]},
  {q:"Qui joue la sorcière dans The Witch (2015) ?",a:"Anya Taylor-Joy",w:["Florence Pugh","Thomasin McKenzie","Mia Wasikowska"]},
  {q:"Oldboy est un film de qu'elle nationalité ?",a:"Coréenne",w:["Japonaise","Française","Chinoise"]},
  {q:"Qui réalise Black Swan ?",a:"Darren Aronofsky",w:["David Lynch","Lars von Trier","Gaspar Noé"]},
  {q:"Dans quel film Brad Pitt joue Tyler Durden ?",a:"Fight Club",w:["Seven","Snatch","12 Monkeys"]},
  {q:"Caché est réalisé par ?",a:"Michael Haneke",w:["Jean-Luc Godard","François Truffaut","Agnes Varda"]},
  {q:"Qui joue dans Marriage Story de Noah Baumbach ?",a:"Adam Driver",w:["Jake Gyllenhaal","Oscar Isaac","Timothée Chalamet"]},
  {q:"Everything Everywhere All at Once gagne combien d'Oscars ?",a:"7",w:["4","5","6"]},
  {q:"Qui réalise Portrait de la Jeune Fille en Feu ?",a:"Céline Sciamma",w:["Mia Hansen-Løve","Rebecca Zlotowski","Katell Quillévéré"]},
,
  {q:'Qui a réalisé Pulp Fiction ?',a:'Quentin Tarantino',w:['Martin Scorsese','David Fincher','Joel Coen'],cat:'Réalisateur'},
  {q:'Qui a réalisé Goodfellas ?',a:'Martin Scorsese',w:['Francis Ford Coppola','Brian De Palma','Sidney Lumet'],cat:'Réalisateur'},
  {q:'Qui a réalisé The Dark Knight ?',a:'Christopher Nolan',w:['Zack Snyder','Tim Burton','Bryan Singer'],cat:'Réalisateur'},
  {q:'Qui a réalisé Alien ?',a:'Ridley Scott',w:['James Cameron','John Carpenter','David Cronenberg'],cat:'Réalisateur'},
  {q:'Qui a réalisé Fargo ?',a:'Joel et Ethan Coen',w:['David Lynch','Paul Thomas Anderson','Wes Anderson'],cat:'Réalisateur'},
  {q:'Qui a réalisé Moonlight ?',a:'Barry Jenkins',w:['Ava DuVernay','Ryan Coogler','Jordan Peele'],cat:'Réalisateur'},
  {q:'Qui a réalisé Parasite ?',a:'Bong Joon-ho',w:['Park Chan-wook','Lee Chang-dong','Kim Jee-woon'],cat:'Réalisateur'},
  {q:'Qui a réalisé Drive ?',a:'Nicolas Winding Refn',w:['Michael Mann','David Fincher','William Friedkin'],cat:'Réalisateur'},
  {q:'Qui a réalisé Roma ?',a:'Alfonso Cuarón',w:['Alejandro González Iñárritu','Carlos Reygadas','Michel Franco'],cat:'Réalisateur'},
  {q:'Qui a réalisé Arrival ?',a:'Denis Villeneuve',w:['Christopher Nolan','Alex Garland','Ridley Scott'],cat:'Réalisateur'},
  {q:'Qui a réalisé The Revenant ?',a:'Alejandro González Iñárritu',w:['Werner Herzog','Ridley Scott','James Gray'],cat:'Réalisateur'},
  {q:'Qui a réalisé Django Unchained ?',a:'Quentin Tarantino',w:['Spike Lee','Robert Rodriguez','Antoine Fuqua'],cat:'Réalisateur'},
  {q:'Qui a réalisé Shining ?',a:'Stanley Kubrick',w:['Roman Polanski','Brian De Palma','William Friedkin'],cat:'Réalisateur'},
  {q:'Qui a réalisé Titane ?',a:'Julia Ducournau',w:['Gaspar Noé','Claire Denis','Céline Sciamma'],cat:'Réalisateur'},
  {q:'Qui a réalisé Argo ?',a:'Ben Affleck',w:['Kathryn Bigelow','Tony Gilroy','Ridley Scott'],cat:'Réalisateur'},
  {q:'Qui joue dans Fight Club et Seven ?',a:'Brad Pitt',w:['Tom Hanks','Matt Damon','Edward Norton'],cat:'Acteur'},
  {q:'Qui joue dans Gladiator et L.A. Confidential ?',a:'Russell Crowe',w:['Kevin Costner','Mel Gibson','Harrison Ford'],cat:'Acteur'},
  {q:'Qui joue dans Moonlight et If Beale Street Could Talk ?',a:'Barry Jenkins... non — Mahershala Ali',w:['Idris Elba','Daniel Kaluuya','John Boyega'],cat:'Acteur'},
  {q:'Dans quel film Joaquin Phoenix joue-t-il un musicien de country ?',a:'Walk the Line',w:['I m Still Here','The Master','Her'],cat:'Film'},
  {q:'Dans quel film Leonardo DiCaprio joue-t-il un coureur de Formule 1 ?',a:'Aucun — c est James Mangold et Le Mans 66',w:['The Aviator','The Revenant','Once Upon a Time in Hollywood'],cat:'Culture ciné'},
  {q:'Quelle est la Palme d Or 2019 ?',a:'Parasite',w:['Once Upon a Time in Hollywood','Portrait de la jeune fille en feu','Atlantique'],cat:'Récompenses'},
  {q:'Quelle est la Palme d Or 2024 ?',a:'Anora',w:['The Substance','Emilia Perez','Grand Tour'],cat:'Récompenses'},
  {q:'Dans quelle ville se déroule Taxi Driver ?',a:'New York',w:['Los Angeles','Chicago','Detroit'],cat:'Film'},
  {q:'Qui compose la musique d Interstellar ?',a:'Hans Zimmer',w:['John Williams','Johann Johannsson','Jonny Greenwood'],cat:'Compositeur'},
  {q:'Qui compose la musique de Whiplash ?',a:'Justin Hurwitz',w:['Hans Zimmer','Trent Reznor','Jonny Greenwood'],cat:'Compositeur'},
  {q:'En quelle année sort Pulp Fiction ?',a:'1994',w:['1992','1996','1993'],cat:'Année'},
  {q:'En quelle année sort Le Parrain ?',a:'1972',w:['1970','1974','1975'],cat:'Année'},
  {q:'Quel acteur joue dans Magnolia ET There Will Be Blood ?',a:'Paul Thomas Anderson (réalisateur)',w:['Tom Cruise','Philip Seymour Hoffman','Daniel Day-Lewis'],cat:'Lien'},
  {q:'Qui a réalisé No Country for Old Men ?',a:'Joel et Ethan Coen',w:['David Fincher','Denis Villeneuve','Michael Mann'],cat:'Réalisateur'},
  {q:'Quel film a remporté l Oscar du meilleur film en 2020 ?',a:'Parasite',w:['1917','The Irishman','Once Upon a Time in Hollywood'],cat:'Récompenses'}
];

function startSpeedQuiz(){
  go('arc-speedquiz');
  if(musOn)switchMusic('speedquiz',0.22);
  document.getElementById('sq-over').style.display='none';
  _sqScore=0;_sqQ=0;_sqAnswered=false;
  _sqQuestions=[...SQ_BANK].sort(()=>Math.random()-.5).slice(0,SQ_COUNT);
  document.getElementById('sq-score-badge').textContent='0';
  document.getElementById('sq-feedback').textContent='';
  document.getElementById('sq-question-num').textContent='';
  document.getElementById('sq-question').textContent='';
  document.getElementById('sq-answers').innerHTML='';
  document.getElementById('sq-timer-bar').style.transition='none';
  document.getElementById('sq-timer-bar').style.width='100%';
  // Compte à rebours
  const screen=document.getElementById('arc-speedquiz');
  const overlay=document.createElement('div');
  overlay.id='sq-countdown-overlay';
  overlay.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg);z-index:20;gap:12px;';
  overlay.innerHTML=`
    <div style="font-size:11px;letter-spacing:4px;color:rgba(251,146,60,.6);font-family:'Bebas Neue',sans-serif;">PRÉPARE-TOI !</div>
    <div id="sq-cnum" style="font-family:'Bebas Neue',sans-serif;font-size:110px;color:#fb923c;line-height:1;animation:vsCountPop .5s cubic-bezier(.34,1.56,.64,1) both;">3</div>
    <div style="font-size:13px;color:rgba(255,255,255,.3);">⚡ Speed Quiz</div>`;
  screen.appendChild(overlay);
  let count=3;
  const tick=setInterval(()=>{
    count--;
    if(count>0){
      const el=document.getElementById('sq-cnum');
      if(el){el.textContent=count;el.style.animation='none';void el.offsetWidth;el.style.animation='vsCountPop .5s cubic-bezier(.34,1.56,.64,1) both';}
      haptic('countdown');
    } else if(count===0){
      const el=document.getElementById('sq-cnum');
      if(el){el.textContent='GO !';el.style.fontSize='72px';el.style.color='#2ecc71';el.style.animation='none';void el.offsetWidth;el.style.animation='vsCountPop .4s cubic-bezier(.34,1.56,.64,1) both';}
      haptic('countdown');
    } else {
      clearInterval(tick);
      const ov=document.getElementById('sq-countdown-overlay');
      if(ov)ov.remove();
      _sqNextQuestion();
    }
  },750);
}
function stopSpeedQuiz(){clearInterval(_sqTimer);const ov=document.getElementById('sq-countdown-overlay');if(ov)ov.remove();}
function _sqNextQuestion(){
  clearInterval(_sqTimer);
  if(_sqQ>=SQ_COUNT){_sqEnd();return;}
  _sqAnswered=false;
  const item=_sqQuestions[_sqQ];
  document.getElementById('sq-question-num').textContent=`Question ${_sqQ+1} / ${SQ_COUNT}`;
  document.getElementById('sq-question').textContent=item.q;
  document.getElementById('sq-feedback').textContent='';
  // Mélanger les réponses
  const answers=[item.a,...item.w].sort(()=>Math.random()-.5);
  const grid=document.getElementById('sq-answers');
  grid.innerHTML=answers.map(a=>`
    <div class="arc-btn-lg" style="padding:14px 10px;font-size:14px;text-align:center;cursor:pointer;" onclick="sqAnswer('${a.replace(/'/g,"\\'")}')">
      ${a}
    </div>`).join('');
  // Timer
  _sqTimeLeft=SQ_TIME;
  const bar=document.getElementById('sq-timer-bar');
  bar.style.transition='none';bar.style.width='100%';
  bar.style.background='linear-gradient(90deg,#fb923c,#f59e0b)';
  requestAnimationFrame(()=>{
    bar.style.transition=`width ${SQ_TIME}ms linear`;
    bar.style.width='0%';
  });
  const start=Date.now();
  _sqTimer=setInterval(()=>{
    _sqTimeLeft=SQ_TIME-(Date.now()-start);
    if(_sqTimeLeft<=0){clearInterval(_sqTimer);if(!_sqAnswered)sqAnswer(null);}
  },100);
}
function sqAnswer(chosen){
  if(_sqAnswered)return;
  _sqAnswered=true;
  clearInterval(_sqTimer);
  document.getElementById('sq-timer-bar').style.transition='none';
  const item=_sqQuestions[_sqQ];
  const correct=chosen===item.a;
  // Highlight buttons
  document.querySelectorAll('#sq-answers .arc-btn-lg').forEach(btn=>{
    if(btn.textContent.trim()===item.a){btn.style.background='rgba(46,204,113,.25)';btn.style.borderColor='rgba(46,204,113,.6)';}
    else if(btn.textContent.trim()===chosen&&!correct){btn.style.background='rgba(231,76,60,.2)';btn.style.borderColor='rgba(231,76,60,.5)';}
    btn.onclick=null;
  });
  const pts=correct?Math.round((_sqTimeLeft/SQ_TIME)*100):0;
  _sqScore+=pts;
  document.getElementById('sq-score-badge').textContent=_sqScore;
  const fb=document.getElementById('sq-feedback');
  if(correct){
    fb.style.color='#2ecc71';
    fb.textContent=pts>=80?`⚡ +${pts} pts — Ultra rapide !`:pts>=50?`✓ +${pts} pts — Bien joué !`:`✓ +${pts} pts`;
  } else if(chosen===null){
    fb.style.color='rgba(255,255,255,.4)';
    fb.textContent=`⏱ Temps écoulé ! C'était : ${item.a}`;
  } else {
    fb.style.color='#e74c3c';
    fb.textContent=`✗ C'était : ${item.a}`;
  }
  _sqQ++;
  setTimeout(_sqNextQuestion,1600);
}
function _sqEnd(){
  document.getElementById('sq-final').textContent=_sqScore;
  const pct=Math.round((_sqScore/500)*100);
  document.getElementById('sq-summary').textContent=
    pct>=80?'🏆 Cinéphile élite !':pct>=50?'🎬 Bon cinéphile !':'📽 Continue à regarder des films !';
  document.getElementById('sq-over').style.display='flex';
  _saveArcadeHS('speedquiz',_sqScore);
  const prev=_getArcadeHS('speedquiz');
  if(_sqScore>=(prev||0)){document.getElementById('arc-hs-speedquiz').textContent=`🏆 Record : ${_sqScore}`;}
}

// ─── SNAKE ───
let _snTimer=null,_snSnake,_snDir,_snNextDir,_snFood,_snScore,_snRunning;
let SN_SIZE=20,SN_COLS=16,SN_ROWS=16;

function startSnake(){
  go('arc-snake');
  if(musOn)switchMusic('snake',0.22);
  document.getElementById('snake-over').style.display='none';
  // Double rAF pour laisser le layout se calculer après go()
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
  const wrap=document.querySelector('.sn-canvas-wrap');
  const cv=document.getElementById('snake-canvas');
  const availW=wrap.clientWidth||320;
  const availH=wrap.clientHeight||320;
  const maxSize=Math.min(availW-8,availH-8,612);
  SN_SIZE=Math.max(14,Math.floor(maxSize/SN_COLS));
  cv.width=SN_COLS*SN_SIZE;cv.height=SN_ROWS*SN_SIZE;
  _snSnake=[{x:8,y:8},{x:7,y:8},{x:6,y:8}];
  _snDir={x:1,y:0};_snNextDir={x:1,y:0};
  _snScore=0;_snRunning=true;
  document.getElementById('snake-score').textContent=0;
  _snPlaceFood();
  clearInterval(_snTimer);
  _snTimer=setInterval(_snTick,140);
  _snDraw();
  })); // end double rAF
}
function stopSnake(){clearInterval(_snTimer);_snRunning=false;}
function snDir(dx,dy){
  if(_snDir.x===-dx&&_snDir.y===-dy)return;
  _snNextDir={x:dx,y:dy};
}
function snPause(){
  if(_snRunning){clearInterval(_snTimer);_snRunning=false;}
  else{_snRunning=true;_snTimer=setInterval(_snTick,140);}
  // Mettre à jour l'icône pause/play
  const pbtn=document.querySelector('.pause-btn svg');
  if(pbtn)pbtn.innerHTML=_snRunning
    ?'<rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/>'
    :'<polygon points="5,3 19,12 5,21"/>';
}
function _snPlaceFood(){
  do{_snFood={x:Math.floor(Math.random()*SN_COLS),y:Math.floor(Math.random()*SN_ROWS)};}
  while(_snSnake.some(s=>s.x===_snFood.x&&s.y===_snFood.y));
}
function _snTick(){
  _snDir={..._snNextDir};
  const head={x:(_snSnake[0].x+_snDir.x+SN_COLS)%SN_COLS,y:(_snSnake[0].y+_snDir.y+SN_ROWS)%SN_ROWS};
  if(_snSnake.some(s=>s.x===head.x&&s.y===head.y)){_snGameOver();return;}
  _snSnake.unshift(head);
  if(head.x===_snFood.x&&head.y===_snFood.y){
    _snScore+=10;document.getElementById('snake-score').textContent=_snScore;_snPlaceFood();
  } else _snSnake.pop();
  _snDraw();
}
function _snDraw(){
  const c=document.getElementById('snake-canvas');if(!c)return;
  const ctx=c.getContext('2d');
  const S=SN_SIZE;

  // Fond
  ctx.fillStyle='#0a0d12';ctx.fillRect(0,0,c.width,c.height);
  // Grille dots
  ctx.fillStyle='rgba(255,255,255,.05)';
  for(let x=0;x<SN_COLS;x++)for(let y=0;y<SN_ROWS;y++)ctx.fillRect(x*S+S/2-1,y*S+S/2-1,2,2);

  // Serpent
  _snSnake.forEach((seg,i)=>{
    const isHead=i===0;
    ctx.fillStyle=isHead?'#f5c842':i%2===0?'#2ecc71':'#27ae60';
    ctx.beginPath();
    ctx.roundRect(seg.x*S+2,seg.y*S+2,S-4,S-4,isHead?6:4);
    ctx.fill();
    if(isHead){
      // Yeux
      const d=_snDir;
      ctx.fillStyle='#0a0d12';
      [{x:seg.x*S+S/2+d.y*S*.2+d.x*S*.22,y:seg.y*S+S/2-d.x*S*.2+d.y*S*.22},
       {x:seg.x*S+S/2-d.y*S*.2+d.x*S*.22,y:seg.y*S+S/2+d.x*S*.2+d.y*S*.22}]
      .forEach(e=>{ctx.beginPath();ctx.arc(e.x,e.y,S*.13,0,Math.PI*2);ctx.fill();});
    }
  });

  // Nourriture : étoile 🎬 simple
  const fx=_snFood.x*S+S/2,fy=_snFood.y*S+S/2,fr=S*.3;
  ctx.fillStyle='rgba(245,200,66,.2)';
  ctx.beginPath();ctx.arc(fx,fy,fr+3,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#f5c842';
  ctx.beginPath();ctx.arc(fx,fy,fr,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#0a0d12';
  ctx.font=`bold ${Math.round(S*.3)}px sans-serif`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText('★',fx,fy+.5);
}
function _snGameOver(){
  clearInterval(_snTimer);_snRunning=false;
  document.getElementById('snake-final').textContent=_snScore;
  document.getElementById('snake-over').style.display='flex';
  _saveArcadeHS('snake',_snScore);
}
// Swipe sur le canvas
(function(){
  let _tx,_ty;
  document.addEventListener('touchstart',e=>{
    if(!document.getElementById('arc-snake').classList.contains('on'))return;
    const t=e.touches[0];_tx=t.clientX;_ty=t.clientY;
  },{passive:true});
  document.addEventListener('touchend',e=>{
    if(!document.getElementById('arc-snake').classList.contains('on'))return;
    if(_tx==null)return;
    const t=e.changedTouches[0];
    const dx=t.clientX-_tx,dy=t.clientY-_ty;
    if(Math.abs(dx)<20&&Math.abs(dy)<20)return;
    if(Math.abs(dx)>Math.abs(dy))snDir(dx>0?1:-1,0);
    else snDir(0,dy>0?1:-1);
    _tx=null;
  },{passive:true});
})();
document.addEventListener('keydown',e=>{
  if(!document.getElementById('arc-snake').classList.contains('on'))return;
  const map={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
  if(map[e.key]){e.preventDefault();snDir(...map[e.key]);}
});


// ─── SPACE CINÉ — Space Invaders ───
let _invAnim = null, _invState = null;

const INV_EMOJIS = ['🎬','🎭','🎞','🍿','🎥','📽','🏆','🎦','⭐','🎪'];

// ── Boucliers ──
function _invMakeShields(W, H) {
  const shields = [];
  const count = 3, bW = 36, bH = 10, cols = 4, rows = 3;
  const spacing = W / (count + 1);
  for (let s = 0; s < count; s++) {
    const sx = spacing * (s + 1) - (cols * (bW / cols + 2)) / 2;
    const sy = H - 90;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // forme arrondie en haut, ouverture en bas centre
        if (r === rows - 1 && (c === 1 || c === 2)) continue;
        shields.push({ x: sx + c * (bW / cols + 2), y: sy + r * (bH + 2), w: bW / cols, h: bH, hp: 3 });
      }
    }
  }
  return shields;
}

function _invMakeGrid(W, H, wave) {
  const COLS = 7, ROWS = 4;
  const cellW = Math.floor(W / (COLS + 1));
  const cellH = 32;
  const startY = 52;
  const invaders = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      invaders.push({
        x: cellW * (c + 1), y: startY + r * (cellH + 8),
        alive: true,
        emoji: INV_EMOJIS[(r * COLS + c + wave * 2) % INV_EMOJIS.length],
        hp: r < 2 ? 1 : 2, row: r, col: c, flash: 0,
      });
    }
  }
  return invaders;
}

function startInvaders() {
  go('arc-invaders');
  if(musOn)switchMusic('invaders',0.22);
  document.getElementById('inv-over').style.display = 'none';
  document.getElementById('inv-score').textContent = '0';
  cancelAnimationFrame(_invAnim); _invAnim = null;
  if (_invState) { _invState.dead = true; _invState = null; }
  document.removeEventListener('keydown', _invKey);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const area = document.getElementById('inv-game-area');
    const cv   = document.getElementById('inv-canvas');
    if (!area || !cv) return;
    const W = area.clientWidth || 612;
    const H = area.clientHeight || 500;
    cv.width = W; cv.height = H;
    _invInit(cv, W, H);
  }));
}

function _invInit(cv, W, H) {
  const state = {
    W, H, dead: false, started: false, running: false,
    wave: 1, score: 0, lives: 3, frame: 0,
    invaders: _invMakeGrid(W, H, 1),
    shields: _invMakeShields(W, H),
    ship: { x: W / 2 },
    bullets: [], eBullets: [], particles: [],
    fleetDir: 1, fleetTimer: 0, lastShot: 0,
    // Tir chargé
    chargeStart: null, charging: false,
    // Bonus tir triple
    tripleShot: 0, // frames restantes
    // Combo
    combo: 0, lastKillTime: 0,
    // Ovni mystère
    ufo: null, ufoTimer: 0,
    // Powerup drops
    drops: [],
  };
  _invState = state;

  let _tx0 = null;
  let _touchDown = false;
  let _touchDownTime = 0;

  cv.ontouchstart = e => {
    e.preventDefault();
    _tx0 = e.touches[0].clientX;
    _touchDown = true;
    _touchDownTime = Date.now();
    if (!state.started) { state.started = true; state.running = true; return; }
    state.chargeStart = Date.now();
  };
  cv.ontouchmove = e => {
    e.preventDefault();
    if (!state.running || _tx0 === null) return;
    const dx = (e.touches[0].clientX - _tx0) * 1.8;
    _tx0 = e.touches[0].clientX;
    state.ship.x = Math.max(16, Math.min(W - 16, state.ship.x + dx));
  };
  cv.ontouchend = e => {
    e.preventDefault();
    _touchDown = false;
    if (state.running) {
      const held = Date.now() - (_touchDownTime || Date.now());
      _invFire(state, held > 400);
    }
    state.chargeStart = null;
  };
  cv.onclick = () => {
    if (!state.started) { state.started = true; state.running = true; return; }
    if (state.running) _invFire(state, false);
  };
  document.addEventListener('keydown', _invKey);
  _invLoop();
}

function _invKey(e) {
  if (!_invState || !_invState.running) return;
  const s = _invState;
  const spd = s.W * 0.06;
  if (e.key === 'ArrowLeft'  || e.key === 'a') s.ship.x = Math.max(16, s.ship.x - spd);
  if (e.key === 'ArrowRight' || e.key === 'd') s.ship.x = Math.min(s.W - 16, s.ship.x + spd);
  if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); _invFire(s, false); }
}

function _invFire(s, charged) {
  const now = Date.now();
  const cd = charged ? 100 : (s.tripleShot > 0 ? 250 : 300);
  if (now - s.lastShot < cd) return;
  s.lastShot = now;
  const by = s.H - 52;
  const spd = s.H * 0.018;
  if (charged) {
    // Tir chargé : large + perce
    s.bullets.push({ x: s.ship.x, y: by, vy: -spd * 1.3, wide: true, pierce: 2 });
    // Flash de charge
    s.particles.push({ x: s.ship.x, y: by - 10, vx: 0, vy: -0.4, life: 0.8, text: '⚡CHARGÉ', color: '#ffe060' });
  } else if (s.tripleShot > 0) {
    // Triple tir
    [-0.35, 0, 0.35].forEach(ang => {
      s.bullets.push({ x: s.ship.x, y: by, vy: -spd, vx: ang * spd * 1.2, triple: true });
    });
    s.tripleShot -= 60;
    if (s.tripleShot < 0) s.tripleShot = 0;
  } else {
    s.bullets.push({ x: s.ship.x, y: by, vy: -spd });
  }
}

function stopInvaders() {
  cancelAnimationFrame(_invAnim); _invAnim = null;
  if (_invState) { _invState.dead = true; _invState = null; }
  document.removeEventListener('keydown', _invKey);
  const cv = document.getElementById('inv-canvas');
  if (cv) { try { cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); } catch(e){} }
}

function _invLoop() {
  const s = _invState;
  if (!s || s.dead) return;
  const cv = document.getElementById('inv-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = s.W, H = s.H;

  if (s.running) {
    s.frame++;
    const alive = s.invaders.filter(i => i.alive);

    // ── UFO mystère ──
    s.ufoTimer++;
    const ufoInterval = Math.max(400, 700 - s.wave * 40);
    if (!s.ufo && s.ufoTimer > ufoInterval && alive.length > 3) {
      s.ufo = { x: -30, y: 28, dir: 1, spd: W * 0.006 };
      s.ufoTimer = 0;
    }
    if (s.ufo) {
      s.ufo.x += s.ufo.spd * s.ufo.dir;
      if (s.ufo.x > W + 40) s.ufo = null;
    }

    // ── Mouvement flotte ──
    const speed = 0.8 + (1 - alive.length / 28) * 2.4 + (s.wave - 1) * 0.35;
    const interval = Math.max(6, 28 - alive.length);
    s.fleetTimer++;
    if (s.fleetTimer >= interval) {
      s.fleetTimer = 0;
      alive.forEach(i => i.x += s.fleetDir * speed);
      const minX = Math.min(...alive.map(i => i.x));
      const maxX = Math.max(...alive.map(i => i.x));
      if (maxX > W - 14 || minX < 14) {
        s.fleetDir *= -1;
        alive.forEach(i => { i.y += 16; });
      }
    }

    // ── Tir ennemi ──
    const fireRate = Math.max(18, 55 - s.wave * 5);
    if (s.frame % fireRate === 0 && alive.length > 0) {
      const colMap = {};
      alive.forEach(i => { if (!colMap[i.col] || i.y > colMap[i.col].y) colMap[i.col] = i; });
      const shooters = Object.values(colMap);
      const sh = shooters[Math.floor(Math.random() * shooters.length)];
      if (sh) s.eBullets.push({ x: sh.x, y: sh.y + 14, vy: H * 0.009 + s.wave * 0.6 });
    }

    // ── Mouvement bullets ──
    s.bullets = s.bullets.filter(b => {
      b.x = (b.x || b.x) + (b.vx || 0);
      b.y += b.vy;
      return b.y > -10 && b.x > -10 && b.x < W + 10;
    });
    s.eBullets = s.eBullets.filter(b => { b.y += b.vy; return b.y < H + 10; });

    // ── Drops (powerups tombants) ──
    s.drops = s.drops.filter(d => {
      d.y += 1.8;
      const shipY = H - 36;
      if (Math.abs(d.x - s.ship.x) < 22 && Math.abs(d.y - shipY) < 18) {
        // Ramassé !
        if (d.type === 'triple') {
          s.tripleShot = 300;
          s.particles.push({ x: d.x, y: d.y, vx:0, vy:-0.5, life:1.5, text:'🔫 TRIPLE !', color:'#60ffb0' });
        }
        return false;
      }
      return d.y < H + 20;
    });

    // ── Collisions bullet ↔ UFO ──
    if (s.ufo) {
      for (let bi = s.bullets.length - 1; bi >= 0; bi--) {
        const b = s.bullets[bi];
        if (Math.abs(b.x - s.ufo.x) < 22 && Math.abs(b.y - s.ufo.y) < 14) {
          const pts = (50 + s.wave * 25) * Math.max(1, Math.floor(s.combo / 3));
          s.score += pts;
          document.getElementById('inv-score').textContent = s.score;
          for (let p = 0; p < 14; p++) {
            const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 3.5;
            s.particles.push({ x: s.ufo.x, y: s.ufo.y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, life: 1.4, r: 3, color: `hsl(${Math.random()*612},90%,65%)` });
          }
          s.particles.push({ x: s.ufo.x, y: s.ufo.y - 10, vx:0, vy:-0.7, life:2, text:'🎰 +'+pts+'!', color:'#ffe060' });
          s.ufo = null;
          s.bullets.splice(bi, 1);
          break;
        }
      }
    }

    // ── Collisions bullet ↔ shield ──
    for (let bi = s.bullets.length - 1; bi >= 0; bi--) {
      const b = s.bullets[bi];
      let shieldHit = false;
      for (const sh of s.shields) {
        if (sh.hp <= 0) continue;
        if (b.x > sh.x && b.x < sh.x + sh.w && b.y > sh.y && b.y < sh.y + sh.h) {
          if (!b.wide) { sh.hp--; s.bullets.splice(bi, 1); shieldHit = true; break; }
        }
      }
      if (shieldHit) break;
    }

    // ── Collisions eBullet ↔ shield ──
    for (let bi = s.eBullets.length - 1; bi >= 0; bi--) {
      const b = s.eBullets[bi];
      let hit = false;
      for (const sh of s.shields) {
        if (sh.hp <= 0) continue;
        if (b.x > sh.x && b.x < sh.x + sh.w && b.y > sh.y && b.y < sh.y + sh.h) {
          sh.hp--; s.eBullets.splice(bi, 1); hit = true; break;
        }
      }
    }

    // ── Collisions bullet ↔ invader ──
    for (let bi = s.bullets.length - 1; bi >= 0; bi--) {
      const b = s.bullets[bi];
      let hit = false;
      for (const inv of s.invaders) {
        if (!inv.alive) continue;
        if (Math.abs(b.x - inv.x) < 16 && Math.abs(b.y - inv.y) < 14) {
          inv.hp--; inv.flash = 6; hit = true;
          if (inv.hp <= 0) {
            inv.alive = false;
            const now = Date.now();
            s.combo = (now - s.lastKillTime < 1200) ? s.combo + 1 : 1;
            s.lastKillTime = now;
            const mult = Math.min(s.combo, 8);
            const pts = ((4 - inv.row) * 10 + 10) * mult;
            s.score += pts;
            document.getElementById('inv-score').textContent = s.score;
            if (mult > 1) s.particles.push({ x: inv.x, y: inv.y - 8, vx:0, vy:-0.5, life:1.6, text:'x'+mult+' COMBO!', color:'#ffe060' });
            for (let p = 0; p < 7; p++) {
              const a = Math.random() * Math.PI * 2, sp = 1.5 + Math.random() * 2.5;
              s.particles.push({ x: inv.x, y: inv.y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, life: 1, r: 3, color: `hsl(${260+Math.random()*80},80%,65%)` });
            }
            s.particles.push({ x: inv.x, y: inv.y - 8, vx:0, vy:-0.6, life:1.5, text:'+'+pts, color:'#c0a0ff' });
            // Drop powerup
            if (Math.random() < 0.12) s.drops.push({ x: inv.x, y: inv.y, type: 'triple' });
          }
          if (!b.wide) { s.bullets.splice(bi, 1); break; }
          else { b.pierce = (b.pierce || 1) - 1; if (b.pierce <= 0) { s.bullets.splice(bi, 1); } break; }
        }
      }
    }

    // ── Collisions eBullet ↔ ship ──
    const shipY = H - 36;
    for (let bi = s.eBullets.length - 1; bi >= 0; bi--) {
      const b = s.eBullets[bi];
      if (Math.abs(b.x - s.ship.x) < 20 && Math.abs(b.y - shipY) < 16) {
        s.eBullets.splice(bi, 1);
        s.lives--;
        s.combo = 0;
        for (let p = 0; p < 10; p++) {
          const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 3;
          s.particles.push({ x: s.ship.x, y: shipY, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, life: 1.2, r: 3, color: `hsl(${200+Math.random()*60},90%,65%)` });
        }
        if (s.lives <= 0) { _invGameOver(); return; }
      }
    }

    if (s.invaders.some(i => i.alive && i.y > H - 75)) { _invGameOver(); return; }

    // ── Vague suivante ──
    if (s.invaders.filter(i => i.alive).length === 0) {
      s.wave++;
      s.invaders = _invMakeGrid(W, H, s.wave);
      s.shields = _invMakeShields(W, H); // boucliers régénérés partiellement
      s.bullets = []; s.eBullets = []; s.drops = [];
      const bonus = s.wave * 50;
      s.score += bonus;
      document.getElementById('inv-score').textContent = s.score;
      s.particles.push({ x: W/2, y: H/2, vx:0, vy:-0.5, life:2.5, text:'VAGUE '+s.wave+' ! +'+bonus, color:'#a07aff' });
    }

    s.particles = s.particles.filter(p => { p.x += p.vx; p.y += p.vy; p.life -= 0.035; return p.life > 0; });
    s.invaders.forEach(i => { if (i.flash > 0) i.flash--; });
  }

  // ── DRAW ──
  ctx.fillStyle = '#04030e'; ctx.fillRect(0, 0, W, H);

  // Étoiles
  for (let i = 0; i < 55; i++) {
    const sx = (i * 137 + 17) % W, sy = (i * 73 + 11) % H, sz = i % 4 === 0 ? 1.5 : 0.8;
    ctx.globalAlpha = 0.4 + (i % 3) * 0.2;
    ctx.fillStyle = '#fff'; ctx.fillRect(sx, sy, sz, sz);
  }
  ctx.globalAlpha = 1;

  // ── Boucliers ──
  s.shields.forEach(sh => {
    if (sh.hp <= 0) return;
    const a = sh.hp / 3;
    ctx.fillStyle = `rgba(80,200,120,${0.15 + a * 0.25})`;
    ctx.strokeStyle = `rgba(80,220,120,${0.3 + a * 0.4})`;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(sh.x, sh.y, sh.w, sh.h, 2); ctx.fill(); ctx.stroke();
  });

  // ── UFO ──
  if (s.ufo) {
    ctx.save();
    ctx.translate(s.ufo.x, s.ufo.y);
    ctx.shadowColor = 'rgba(255,220,0,.8)'; ctx.shadowBlur = 16;
    ctx.font = '22px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('🛸', 0, 0);
    ctx.shadowBlur = 0;
    // label points
    ctx.font = 'bold 9px Bebas Neue,sans-serif';
    ctx.fillStyle = 'rgba(255,220,0,.7)';
    ctx.fillText('?' , 0, -18);
    ctx.restore();
  }

  // ── Invaders ──
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '20px serif';
  s.invaders.forEach(inv => {
    if (!inv.alive) return;
    if (inv.flash > 0) ctx.globalAlpha = 0.5 + Math.sin(inv.flash * 1.2) * 0.5;
    ctx.shadowColor = `hsla(${260 + inv.row * 25},80%,65%,.7)`; ctx.shadowBlur = 8;
    ctx.fillText(inv.emoji, inv.x, inv.y);
    if (inv.hp > 1) {
      ctx.shadowBlur = 0; ctx.globalAlpha = 0.5;
      ctx.fillStyle = 'rgba(80,40,180,.6)'; ctx.fillRect(inv.x - 10, inv.y + 14, 20, 3);
      ctx.fillStyle = '#c0a0ff'; ctx.fillRect(inv.x - 10, inv.y + 14, 10, 3);
    }
    ctx.globalAlpha = 1;
  });
  ctx.shadowBlur = 0;

  // ── Drops powerup ──
  ctx.font = '16px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  s.drops.forEach(d => {
    ctx.save();
    ctx.shadowColor = 'rgba(100,255,160,.7)'; ctx.shadowBlur = 10;
    ctx.fillText('🔫', d.x, d.y);
    ctx.restore();
  });

  // ── Tirs joueur ──
  s.bullets.forEach(b => {
    if (b.wide) {
      const g = ctx.createLinearGradient(b.x, b.y + 18, b.x, b.y - 4);
      g.addColorStop(0, 'rgba(255,220,0,0)'); g.addColorStop(1, 'rgba(255,200,50,1)');
      ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,200,0,.9)'; ctx.shadowBlur = 14;
      ctx.fillRect(b.x - 5, b.y - 18, 10, 22);
    } else {
      const g = ctx.createLinearGradient(b.x, b.y + 14, b.x, b.y - 2);
      g.addColorStop(0, 'rgba(180,120,255,0)'); g.addColorStop(1, 'rgba(220,180,255,1)');
      ctx.fillStyle = g; ctx.shadowColor = 'rgba(160,100,255,.9)'; ctx.shadowBlur = 10;
      ctx.fillRect(b.x - 2, b.y - 14, 4, 16);
    }
  });

  // ── Tirs ennemis ──
  s.eBullets.forEach(b => {
    const g = ctx.createLinearGradient(b.x, b.y - 12, b.x, b.y + 2);
    g.addColorStop(0, 'rgba(255,100,50,1)'); g.addColorStop(1, 'rgba(255,50,50,0)');
    ctx.fillStyle = g; ctx.shadowColor = 'rgba(255,80,30,.8)'; ctx.shadowBlur = 8;
    ctx.fillRect(b.x - 2.5, b.y - 12, 5, 14);
  });
  ctx.shadowBlur = 0;

  // ── Vaisseau ──
  const shipX = s.ship.x, shipY2 = H - 36;
  ctx.save(); ctx.translate(shipX, shipY2);
  // Jauge de charge
  if (s.chargeStart) {
    const pct = Math.min(1, (Date.now() - s.chargeStart) / 400);
    ctx.fillStyle = `rgba(255,200,0,${pct * 0.3})`;
    ctx.beginPath(); ctx.arc(0, 0, 22 * pct, 0, Math.PI * 2); ctx.fill();
  }
  // Triple shot indicator
  if (s.tripleShot > 0) {
    ctx.strokeStyle = 'rgba(100,255,160,.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.shadowColor = 'rgba(120,80,255,.9)'; ctx.shadowBlur = 18;
  ctx.fillStyle = '#8060ff';
  ctx.beginPath(); ctx.moveTo(0,-18); ctx.lineTo(18,12); ctx.lineTo(8,6); ctx.lineTo(0,10); ctx.lineTo(-8,6); ctx.lineTo(-18,12); ctx.closePath(); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#1a0a3a'; ctx.beginPath(); ctx.arc(0,-2,7,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(120,200,255,.9)'; ctx.beginPath(); ctx.arc(0,-2,4.5,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(1.5,-3.5,1.5,0,Math.PI*2); ctx.fill();
  ctx.restore();

  // ── Ligne de base ──
  ctx.strokeStyle = 'rgba(120,80,255,.2)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, H-18); ctx.lineTo(W, H-18); ctx.stroke();

  // ── Vies ──
  for (let l = 0; l < s.lives; l++) {
    ctx.save(); ctx.translate(12 + l * 24, H - 9);
    ctx.fillStyle = 'rgba(130,90,255,.75)'; ctx.shadowColor = 'rgba(120,80,255,.5)'; ctx.shadowBlur = 6;
    ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(9,5); ctx.lineTo(-9,5); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  ctx.shadowBlur = 0;

  // ── Wave + triple badge ──
  ctx.textAlign = 'right'; ctx.font = '11px Bebas Neue,sans-serif';
  ctx.fillStyle = 'rgba(160,120,255,.45)';
  ctx.fillText('VAGUE ' + s.wave, W - 10, H - 6);
  if (s.tripleShot > 0) {
    ctx.fillStyle = 'rgba(100,255,160,.7)';
    ctx.fillText('🔫 x3', W - 10, H - 18);
  }

  // ── Particules ──
  s.particles.forEach(p => {
    ctx.globalAlpha = Math.min(1, p.life * 1.2);
    if (p.text) {
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `bold ${p.text.length > 6 ? 12 : 15}px 'Bebas Neue',sans-serif`;
      ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 10;
      ctx.fillText(p.text, p.x, p.y);
    } else {
      ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r || 2.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.shadowBlur = 0;
  });
  ctx.globalAlpha = 1;

  // ── Écran de démarrage ──
  if (!s.started) {
    ctx.fillStyle = 'rgba(4,3,14,.80)'; ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(H * 0.052)}px 'Bebas Neue',sans-serif`;
    ctx.fillStyle = 'rgba(180,140,255,.95)'; ctx.shadowColor = 'rgba(120,80,255,.7)'; ctx.shadowBlur = 24;
    ctx.fillText('SPACE CINÉ', W / 2, H / 2 - 36);
    ctx.shadowBlur = 0;
    ctx.font = `${Math.round(H * 0.028)}px sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,.55)';
    ctx.fillText('TAP pour démarrer', W / 2, H / 2 + 4);
    ctx.font = `${Math.round(H * 0.022)}px sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,.28)';
    ctx.fillText('Glisse pour viser · Tap court = tir · Tap long = chargé', W / 2, H / 2 + 28);
    ctx.fillStyle = 'rgba(100,255,160,.5)';
    ctx.fillText('🛸 UFO surprise  ·  🔫 Triple tir  ·  🛡️ Boucliers', W / 2, H / 2 + 52);
    const t = Date.now() / 700;
    INV_EMOJIS.slice(0, 5).forEach((em, i) => {
      ctx.globalAlpha = 0.55 + Math.sin(t + i * 0.9) * 0.25;
      ctx.font = '22px serif';
      ctx.fillText(em, W / 2 - 88 + i * 44, H / 2 - 75);
    });
    ctx.globalAlpha = 1;
  }

  _invAnim = requestAnimationFrame(_invLoop);
}

function _invGameOver() {
  const s = _invState; if (!s) return;
  cancelAnimationFrame(_invAnim); _invAnim = null;
  s.running = false;
  document.getElementById('inv-final').textContent = s.score;
  const prev = _getArcadeHS('invaders') || 0;
  const msg  = document.getElementById('inv-best-msg');
  if (s.score > prev) {
    _saveArcadeHS('invaders', s.score);
    const el = document.getElementById('arc-hs-invaders');
    if (el) el.textContent = '🏆 Record : ' + s.score;
    if (msg) msg.textContent = '★ Nouveau record !';
  } else {
    if (msg) msg.textContent = 'Record : ' + prev;
  }
  document.getElementById('inv-over').style.display = 'flex';
}


// ─── PONG ───
let _pgAnim=null,_pgState=null,_pgSets={player:0,ai:0},_pgRound=1;
const PG_ROUNDS=3,PG_WIN_SCORE=5;

function _pgUpdateSetsBadge(){
  const p=_pgSets.player,a=_pgSets.ai;
  const dots=(n,col)=>Array.from({length:PG_ROUNDS},(_,i)=>i<n?'<span style="color:'+col+'">●</span>':'<span style="color:rgba(255,255,255,.2)">●</span>').join(' ');
  document.getElementById('pong-sets-badge').innerHTML=dots(p,'rgba(0,200,255,.8)')+' <span style="color:rgba(255,255,255,.2)">·</span> '+dots(a,'rgba(255,80,80,.8)');
  document.getElementById('pong-round-badge').textContent='MANCHE '+_pgRound+' / '+PG_ROUNDS;
}

function startPong(){
  const alreadyOn=document.getElementById('arc-pong').classList.contains('on');
  if(!alreadyOn)go('arc-pong');
  if(musOn)switchMusic('pong',0.22);
  cancelAnimationFrame(_pgAnim);_pgAnim=null;
  if(_pgState){_pgState.running=false;}_pgState=null;
  _pgSets={player:0,ai:0};_pgRound=1;
  document.getElementById('pong-over').style.display='none';
  document.getElementById('pong-round-over').style.display='none';
  document.getElementById('pong-score-badge').textContent='0 - 0';
  _pgUpdateSetsBadge();
  _pgInitRound();
}

function _pgInitRound(){
  document.getElementById('pong-round-over').style.display='none';
  document.getElementById('pong-over').style.display='none';
  document.getElementById('pong-score-badge').textContent='0 - 0';
  _pgUpdateSetsBadge();
  const doInit=()=>{
    const cv=document.getElementById('pong-canvas');
    const wrap=cv.parentElement;
    const aw=Math.round((wrap.clientWidth-4)*0.70);
    const ah=Math.round((wrap.clientHeight-4)*0.58);
    if(aw<=0||ah<=0){requestAnimationFrame(doInit);return;}
    cv.width=aw;cv.height=ah;
    cv.style.width=aw+'px';cv.style.height=ah+'px';
    const W=cv.width,H=cv.height;
    const PW=10,PH=Math.round(H*0.18);
    // Difficulté croissante selon la manche
    const baseDiff=0.035+(_pgRound-1)*0.018;
    const maxDiff=0.07+(_pgRound-1)*0.015;
    _pgState={W,H,PW,PH,PR:6,player:{y:H/2-PH/2,score:0},ai:{y:H/2-PH/2,score:0},ball:{x:W/2,y:H/2,vx:3,vy:1.5},WIN:PG_WIN_SCORE,running:true,trail:[],particles:[],aiDiff:baseDiff,aiMax:maxDiff,lastTY:null};
    // Touch
    cv.ontouchstart=e=>{e.preventDefault();_pgState&&(_pgState.lastTY=e.touches[0].clientY);};
    cv.ontouchmove=e=>{
      e.preventDefault();
      if(!_pgState)return;
      const ty=e.touches[0].clientY;
      const dy=ty-(_pgState.lastTY||ty);
      _pgState.player.y=Math.max(0,Math.min(H-PH,_pgState.player.y+dy));
      _pgState.lastTY=ty;
    };
    cv.ontouchend=()=>{if(_pgState)_pgState.lastTY=null;};
    // Souris desktop
    let md=false;
    cv.onmousedown=()=>{md=true;};
    cv.onmousemove=e=>{
      if(!md||!_pgState)return;
      const r=cv.getBoundingClientRect();
      const my=(e.clientY-r.top)*(H/r.height);
      _pgState.player.y=Math.max(0,Math.min(H-PH,my-PH/2));
    };
    cv.onmouseup=()=>{md=false;};
    _pgLoop();
  };
  const alreadyOn=document.getElementById('arc-pong').classList.contains('on');
  if(alreadyOn){doInit();}else{requestAnimationFrame(()=>requestAnimationFrame(doInit));}
}

function _pgNextRound(){
  _pgRound++;
  _pgInitRound();
}

function stopPong(){
  cancelAnimationFrame(_pgAnim);_pgAnim=null;
  if(_pgState)_pgState.running=false;
  _pgState=null;
  const cv=document.getElementById('pong-canvas');
  if(cv){try{cv.getContext('2d').clearRect(0,0,cv.width,cv.height);}catch(e){}}
}

function _pgLoop(){
  const s=_pgState;if(!s||!s.running)return;
  const cv=document.getElementById('pong-canvas');if(!cv)return;
  const ctx=cv.getContext('2d');
  const W=s.W,H=s.H,PW=s.PW,PH=s.PH,PR=s.PR;

  // IA
  const aiC=s.ai.y+PH/2;
  s.ai.y+=( s.ball.y-aiC)*s.aiDiff;
  s.ai.y=Math.max(0,Math.min(H-PH,s.ai.y));

  // Balle
  s.trail.push({x:s.ball.x,y:s.ball.y});
  if(s.trail.length>8)s.trail.shift();
  s.ball.x+=s.ball.vx;s.ball.y+=s.ball.vy;
  if(s.ball.y-PR<0){s.ball.y=PR;s.ball.vy=Math.abs(s.ball.vy);}
  if(s.ball.y+PR>H){s.ball.y=H-PR;s.ball.vy=-Math.abs(s.ball.vy);}

  // Paddle joueur (gauche)
  const px=PW+4;
  if(s.ball.x-PR<px+PW&&s.ball.x>px&&s.ball.y>=s.player.y&&s.ball.y<=s.player.y+PH){
    s.ball.vx=Math.abs(s.ball.vx)*1.05;
    s.ball.vy=((s.ball.y-(s.player.y+PH/2))/(PH/2))*4;
    s.ball.x=px+PW+PR;
    s.aiDiff=Math.min(s.aiMax,s.aiDiff+0.002);
  }
  // Paddle IA (droite)
  const ax=W-PW-4;
  if(s.ball.x+PR>ax&&s.ball.x<ax+PW+4&&s.ball.y>=s.ai.y&&s.ball.y<=s.ai.y+PH){
    s.ball.vx=-Math.abs(s.ball.vx)*1.03;
    s.ball.vy=((s.ball.y-(s.ai.y+PH/2))/(PH/2))*3.5;
    s.ball.x=ax-PR;
  }

  // Score
  if(s.ball.x-PR<0){
    s.ai.score++;
    document.getElementById('pong-score-badge').textContent=s.player.score+' - '+s.ai.score;
    s.ball.x=W/2;s.ball.y=H/2;s.ball.vx=3;s.ball.vy=(Math.random()*2-1)*2;s.trail=[];
  } else if(s.ball.x+PR>W){
    s.player.score++;
    document.getElementById('pong-score-badge').textContent=s.player.score+' - '+s.ai.score;
    s.ball.x=W/2;s.ball.y=H/2;s.ball.vx=-3;s.ball.vy=(Math.random()*2-1)*2;s.trail=[];
  }

  // Fin de manche
  if(s.player.score>=s.WIN||s.ai.score>=s.WIN){
    const roundWon=s.player.score>=s.WIN;
    s.running=false;
    if(roundWon)_pgSets.player++;else _pgSets.ai++;
    _pgUpdateSetsBadge();
    // Fin du match ?
    const matchOver=_pgRound>=PG_ROUNDS;
    if(matchOver){
      const matchWon=_pgSets.player>_pgSets.ai;
      const tie=_pgSets.player===_pgSets.ai;
      const t=document.getElementById('pong-over-title');
      if(t){t.textContent=tie?'ÉGALITÉ':matchWon?'VICTOIRE !':'DÉFAITE';t.style.color=tie?'var(--gold)':matchWon?'var(--gold)':'var(--red)';}
      document.getElementById('pong-over-score').textContent='Manches : '+_pgSets.player+' - '+_pgSets.ai;
      document.getElementById('pong-over').style.display='flex';
      if(matchWon){_saveArcadeHS('pong',_pgSets.player);document.getElementById('arc-hs-pong').textContent='Record : '+_pgSets.player;}
    } else {
      const rt=document.getElementById('pong-round-title');
      if(rt){rt.textContent=roundWon?'MANCHE GAGNÉE !':'MANCHE PERDUE';rt.style.color=roundWon?'var(--gold)':'var(--red)';}
      document.getElementById('pong-round-score').textContent='Score : '+s.player.score+' - '+s.ai.score;
      const dots=n=>Array.from({length:PG_ROUNDS},(_,i)=>{
        if(i<_pgSets.player)return'🔵';
        if(i<(_pgRound-_pgSets.player)+_pgSets.player&&i>=_pgSets.player)return'🔴';
        return'⚪';
      });
      // Simple display
      const p=_pgSets.player,a=_pgSets.ai;
      document.getElementById('pong-sets-display').textContent=
        Array(PG_ROUNDS).fill(0).map((_,i)=>i<p?'🔵':i<p+a?'🔴':'⚪').join('');
      document.getElementById('pong-round-over').style.display='flex';
    }
    return;
  }

  // Dessin
  ctx.fillStyle='#07060c';ctx.fillRect(0,0,W,H);
  ctx.setLineDash([6,8]);ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();ctx.setLineDash([]);

  // Trail
  s.trail.forEach((t,i)=>{
    ctx.fillStyle='rgba(100,200,255,'+(i/s.trail.length*0.3)+')';
    ctx.beginPath();ctx.arc(t.x,t.y,PR*(i/s.trail.length)*0.6,0,Math.PI*2);ctx.fill();
  });

  // Balle
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s.ball.x,s.ball.y,PR,0,Math.PI*2);ctx.fill();

  // Paddles
  ctx.fillStyle='rgba(0,200,255,.9)';
  ctx.beginPath();ctx.roundRect(px,s.player.y,PW,PH,4);ctx.fill();
  ctx.fillStyle='rgba(255,80,80,.9)';
  ctx.beginPath();ctx.roundRect(ax,s.ai.y,PW,PH,4);ctx.fill();

  // Scores
  ctx.textAlign='center';ctx.textBaseline='top';
  ctx.font='bold '+Math.round(H*0.07)+'px Bebas Neue,sans-serif';
  ctx.fillStyle='rgba(0,200,255,.4)';ctx.fillText(s.player.score,W*0.28,10);
  ctx.fillStyle='rgba(255,80,80,.4)';ctx.fillText(s.ai.score,W*0.72,10);

  _pgAnim=requestAnimationFrame(_pgLoop);
}

// ─── CASSE-BRIQUES ───
let _brAnim=null,_brState=null;
const BR_W=320,BR_H=320;
const BR_EMOJIS=['🌟','⭐','✨','💫','🎬','🎭','🏆','🎞️'];
const BR_COLORS={
  '🌟':'255,210,60','⭐':'255,180,30','✨':'120,200,255',
  '💫':'180,120,255','🎬':'220,60,80','🎭':'240,100,180',
  '🏆':'255,160,40','🎞️':'60,190,180',
};
const BR_POWERUPS=['🔥','🔱','📏','⚡','❤️'];
const BR_PU_LABELS={'🔥':'BOULE DE FEU','🔱':'MULTI-BALLE','📏':'LARGE PADDLE','⚡':'SLOW-MO','❤️':'VIE BONUS'};

function _brMakeBricks(level){
  const rows=4+Math.min(level-1,3), cols=8, bW=34, bH=18, padX=4, padY=32;
  const bricks=[];
  for(let r=0;r<rows;r++) for(let cc=0;cc<cols;cc++){
    const hp = (level>=3 && r<2 && Math.random()<0.35) ? 2 : 1;
    bricks.push({x:padX+cc*(bW+3),y:padY+r*(bH+4),w:bW,h:bH,alive:true,hp,maxHp:hp,emoji:BR_EMOJIS[Math.floor(Math.random()*BR_EMOJIS.length)]});
  }
  return bricks;
}

function startBricks(){
  go('arc-bricks');
  if(musOn)switchMusic('bricks',0.22);
  document.getElementById('bricks-over').style.display='none';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const c=document.getElementById('bricks-canvas');
    const wrap=c.parentElement;
    const availW=Math.min(wrap.clientWidth||320,612);
    const scale=availW/BR_W;
    c.width=BR_W;c.height=BR_H;
    c.style.width=availW+'px';c.style.height=Math.round(BR_H*scale)+'px';
    _brInitState(1,0,3);
    _brBindControls(c);
    cancelAnimationFrame(_brAnim);_brLoop();
  }));
}

function _brInitState(level,score,lives){
  const bricks=_brMakeBricks(level);
  const spd=3+level*0.25;
  _brState={
    bricks, level, score, lives,
    balls:[{x:BR_W/2,y:BR_H-55,vx:spd*(Math.random()>0.5?1:-1)*0.6,vy:-spd}],
    paddle:{x:BR_W/2-44,w:88},
    running:true,
    powerups:[],      // falling powerups
    particles:[],     // visual particles
    combo:0,          // consecutive hits
    activeEffects:{}, // fireball, slow, wide
    labelFlash:null,  // {text,alpha,y}
    baseSpeed:spd,
  };
  document.getElementById('bricks-score').textContent=score;
  _brSetSliderPct(0.5);
}

function _brBindControls(c){
  c.onmousemove=e=>{
    if(!_brState)return;
    const r=c.getBoundingClientRect();
    const pct=(e.clientX-r.left)/r.width;
    _brState.paddle.x=Math.max(0,Math.min(BR_W-_brState.paddle.w,pct*BR_W-_brState.paddle.w/2));
    _brSetSliderPct(pct);
  };
  c.ontouchmove=e=>{e.preventDefault();};
  const sliderOld=document.getElementById('br-slider');
  sliderOld.replaceWith(sliderOld.cloneNode(true));
  const sl=document.getElementById('br-slider');
  let _brSliding=false;
  function _brMoveFromEvent(e){
    if(!_brState)return;
    const t=e.touches?e.touches[0]:e;
    const r=sl.getBoundingClientRect();
    const pct=Math.max(0,Math.min(1,(t.clientX-r.left)/r.width));
    _brState.paddle.x=Math.max(0,Math.min(BR_W-_brState.paddle.w,pct*BR_W-_brState.paddle.w/2));
    _brSetSliderPct(pct);
  }
  const _brOnStart=e=>{_brSliding=true;_brMoveFromEvent(e);};
  const _brOnMove=e=>{if(!_brSliding)return;e.preventDefault();_brMoveFromEvent(e);};
  const _brOnEnd=()=>{_brSliding=false;};
  sl.addEventListener('touchstart',_brOnStart,{passive:true});
  sl.addEventListener('touchmove',_brOnMove,{passive:false});
  sl.addEventListener('touchend',_brOnEnd,{passive:true});
  sl.addEventListener('mousedown',_brOnStart);
  window.addEventListener('mousemove',_brOnMove);
  window.addEventListener('mouseup',_brOnEnd);
}

function _brSetSliderPct(pct){
  const thumb=document.getElementById('br-slider-thumb');
  const fill=document.getElementById('br-slider-fill');
  if(thumb)thumb.style.left=(pct*100)+'%';
  if(fill)fill.style.width=(pct*100)+'%';
}

function stopBricks(){cancelAnimationFrame(_brAnim);if(_brState)_brState.running=false;_brState=null;}

function _brSpawnParticles(x,y,rgb,n=6){
  const st=_brState;if(!st)return;
  for(let i=0;i<n;i++){
    const a=Math.random()*Math.PI*2,spd=1.5+Math.random()*2.5;
    st.particles.push({x,y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,life:1,rgb});
  }
}

function _brLoop(){
  if(!_brState||!_brState.running)return;
  const st=_brState;
  const py=BR_H-22;
  const now=Date.now();

  // Active effect timers
  if(st.activeEffects.wide && now>st.activeEffects.wide){
    st.paddle.w=88;delete st.activeEffects.wide;
  }
  if(st.activeEffects.slow && now>st.activeEffects.slow){
    st.balls.forEach(b=>{const s=Math.hypot(b.vx,b.vy),t=st.baseSpeed;b.vx=b.vx/s*t;b.vy=b.vy/s*t;});
    delete st.activeEffects.slow;
  }

  // Particles
  st.particles=st.particles.filter(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=0.1;p.life-=0.045;return p.life>0;
  });

  // Falling powerups
  st.powerups=st.powerups.filter(pu=>{
    pu.y+=2.2;
    // catch
    if(pu.y+12>py&&pu.y<py+14&&pu.x>st.paddle.x-10&&pu.x<st.paddle.x+st.paddle.w+10){
      _brActivatePowerup(pu.type);
      return false;
    }
    return pu.y<BR_H+20;
  });

  // Balls
  const deadBalls=[];
  st.balls.forEach((ball,bi)=>{
    ball.x+=ball.vx;ball.y+=ball.vy;
    if(ball.x<8){ball.x=8;ball.vx=Math.abs(ball.vx);}
    if(ball.x>BR_W-8){ball.x=BR_W-8;ball.vx=-Math.abs(ball.vx);}
    if(ball.y<8){ball.y=8;ball.vy=Math.abs(ball.vy);}
    if(ball.y>BR_H+20){deadBalls.push(bi);return;}
    // paddle
    if(ball.y>py-9&&ball.y<py+12&&ball.x>st.paddle.x&&ball.x<st.paddle.x+st.paddle.w&&ball.vy>0){
      ball.vy=-Math.abs(ball.vy);
      ball.vx=(ball.x-(st.paddle.x+st.paddle.w/2))/8;
      const spd=Math.hypot(ball.vx,ball.vy);
      const cap=st.baseSpeed*1.6;
      if(spd>cap){ball.vx=ball.vx/spd*cap;ball.vy=ball.vy/spd*cap;}
      st.combo=0;
      _brSpawnParticles(ball.x,py,'245,200,66',4);
    }
    // bricks
    let hit=false;
    for(let b of st.bricks){
      if(!b.alive)continue;
      if(ball.x>b.x-1&&ball.x<b.x+b.w+1&&ball.y>b.y-1&&ball.y<b.y+b.h+1){
        if(!st.activeEffects.fireball) ball.vy*=-1;
        hit=true;
        b.hp--;
        const rgb=BR_COLORS[b.emoji]||'245,200,66';
        _brSpawnParticles(b.x+b.w/2,b.y+b.h/2,rgb,b.hp<=0?8:4);
        if(b.hp<=0){
          b.alive=false;
          st.combo++;
          const mult=Math.min(st.combo,5);
          const pts=10*mult;
          st.score+=pts;
          document.getElementById('bricks-score').textContent=st.score;
          if(mult>1)st.labelFlash={text:'x'+mult+' COMBO !',alpha:1,y:b.y+b.h/2,rgb};
          // Powerup drop chance
          if(Math.random()<0.18){
            const type=BR_POWERUPS[Math.floor(Math.random()*BR_POWERUPS.length)];
            st.powerups.push({x:b.x+b.w/2,y:b.y+b.h/2,type});
          }
        }
        break;
      }
    }
  });

  // Remove dead balls
  deadBalls.sort((a,b)=>b-a).forEach(i=>st.balls.splice(i,1));
  if(st.balls.length===0){
    st.lives--;
    st.combo=0;
    if(st.lives<=0){_brGameOver(false);return;}
    const spd=st.baseSpeed;
    st.balls=[{x:BR_W/2,y:BR_H-55,vx:spd*(Math.random()>.5?1:-1)*0.5,vy:-spd}];
  }

  // Next level?
  if(st.bricks.every(b=>!b.alive)){
    const nextLevel=st.level+1;
    const score=st.score+50*st.level; // level bonus
    const lives=Math.min(st.lives+1,5); // gain 1 life
    st.labelFlash={text:'NIVEAU '+nextLevel+' !',alpha:1,y:BR_H/2,rgb:'245,200,66'};
    setTimeout(()=>{
      if(!_brState)return;
      _brInitState(nextLevel,score,lives);
      _brBindControls(document.getElementById('bricks-canvas'));
      _brLoop();
    },3131);
    st.running=false;
    _brDraw();
    return;
  }

  // Label flash
  if(st.labelFlash){st.labelFlash.alpha-=0.025;st.labelFlash.y-=0.5;if(st.labelFlash.alpha<=0)st.labelFlash=null;}

  _brDraw();
  _brAnim=requestAnimationFrame(_brLoop);
}

function _brActivatePowerup(type){
  const st=_brState;if(!st)return;
  const now=Date.now();
  st.labelFlash={text:BR_PU_LABELS[type],alpha:1.2,y:BR_H*0.55,rgb:'245,200,66'};
  if(type==='🔥'){st.activeEffects.fireball=now+4000;}
  else if(type==='🔱'){
    const b=st.balls[0]||{x:BR_W/2,y:BR_H/2,vx:3,vy:-3};
    st.balls.push({x:b.x,y:b.y,vx:-b.vx*0.9,vy:b.vy});
  }
  else if(type==='📏'){st.paddle.w=130;st.activeEffects.wide=now+7000;}
  else if(type==='⚡'){
    st.balls.forEach(b=>{const s=Math.hypot(b.vx,b.vy);b.vx=b.vx/s*(s*0.55);b.vy=b.vy/s*(s*0.55);});
    st.activeEffects.slow=now+5000;
  }
  else if(type==='❤️'){st.lives=Math.min(st.lives+1,5);}
}

function _brDraw(){
  const c=document.getElementById('bricks-canvas');if(!c)return;
  const ctx=c.getContext('2d'),st=_brState;
  const py=BR_H-22;
  ctx.fillStyle='#0a0a0f';ctx.fillRect(0,0,BR_W,BR_H);

  // Level indicator
  ctx.font='bold 9px sans-serif';ctx.textAlign='right';ctx.textBaseline='top';
  ctx.fillStyle='rgba(245,200,66,.4)';ctx.fillText('LVL '+st.level,BR_W-6,6);

  // Lives
  ctx.font='12px serif';ctx.textAlign='left';ctx.textBaseline='top';
  ctx.fillText('❤️'.repeat(st.lives),6,4);

  // Active effects indicators
  let ex=6;
  if(st.activeEffects.fireball){ctx.font='11px serif';ctx.fillText('🔥',ex,20);ex+=18;}
  if(st.activeEffects.wide)    {ctx.font='11px serif';ctx.fillText('📏',ex,20);ex+=18;}
  if(st.activeEffects.slow)    {ctx.font='11px serif';ctx.fillText('⚡',ex,20);ex+=18;}
  if(st.balls.length>1)        {ctx.font='11px serif';ctx.fillText('🔱',ex,20);}

  // Bricks
  st.bricks.forEach(b=>{
    if(!b.alive)return;
    const rgb=BR_COLORS[b.emoji]||'245,200,66';
    const dmg=b.maxHp>1&&b.hp<b.maxHp;
    const alpha=dmg?0.22:0.35;
    const grad=ctx.createLinearGradient(b.x,b.y,b.x,b.y+b.h);
    grad.addColorStop(0,`rgba(${rgb},${alpha+0.08})`);
    grad.addColorStop(1,`rgba(${rgb},${alpha-0.05})`);
    ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(b.x,b.y,b.w,b.h,4);ctx.fill();
    ctx.strokeStyle=`rgba(${rgb},${dmg?0.3:0.55})`;ctx.lineWidth=1;ctx.stroke();
    if(dmg){// crack overlay
      ctx.strokeStyle=`rgba(${rgb},.18)`;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(b.x+b.w*0.3,b.y+2);ctx.lineTo(b.x+b.w*0.5,b.y+b.h-2);ctx.stroke();
    }
    ctx.font='11px serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.globalAlpha=dmg?0.45:0.85;
    ctx.fillText(b.emoji,b.x+b.w/2,b.y+b.h/2);
    ctx.globalAlpha=1;
  });

  // Particles
  st.particles.forEach(p=>{
    ctx.globalAlpha=p.life*0.7;
    ctx.fillStyle=`rgba(${p.rgb},1)`;
    ctx.beginPath();ctx.arc(p.x,p.y,2.5,0,Math.PI*2);ctx.fill();
  });
  ctx.globalAlpha=1;

  // Falling powerups
  st.powerups.forEach(pu=>{
    ctx.save();
    ctx.font='16px serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(pu.type,pu.x,pu.y);
    ctx.restore();
  });

  // Paddle
  const isWide=st.activeEffects.wide;
  const isSlow=st.activeEffects.slow;
  const isFire=st.activeEffects.fireball;
  const pg=ctx.createLinearGradient(st.paddle.x,py,st.paddle.x+st.paddle.w,py);
  const c1=isFire?'rgba(255,100,20,.7)':isSlow?'rgba(100,180,255,.7)':'rgba(200,155,30,.6)';
  const c2=isFire?'rgba(255,60,0,.95)':isSlow?'rgba(60,140,255,.95)':'rgba(245,200,66,.95)';
  pg.addColorStop(0,c1);pg.addColorStop(.5,c2);pg.addColorStop(1,c1);
  ctx.fillStyle=pg;ctx.beginPath();ctx.roundRect(st.paddle.x,py,st.paddle.w,10,5);ctx.fill();
  if(isFire){ctx.strokeStyle='rgba(255,120,0,.8)';ctx.lineWidth=1.5;ctx.stroke();}

  // Balls
  st.balls.forEach((ball,i)=>{
    ctx.save();
    const ballColor=isFire?'rgba(255,120,0,.7)':'rgba(245,200,66,.6)';
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ball.x,ball.y,7,0,Math.PI*2);ctx.fill();
    ctx.restore();
    ctx.fillStyle=isFire?'rgba(255,140,0,.9)':'rgba(245,200,66,.8)';
    ctx.beginPath();ctx.arc(ball.x,ball.y,4,0,Math.PI*2);ctx.fill();
  });

  // Label flash (combo, powerup, level)
  if(st.labelFlash&&st.labelFlash.alpha>0){
    const lf=st.labelFlash;
    const a=Math.min(lf.alpha,1);
    ctx.save();
    ctx.font='bold 14px Bebas Neue,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle=`rgba(${lf.rgb||'245,200,66'},${a})`;
    ctx.fillText(lf.text,BR_W/2,lf.y);
    ctx.restore();
  }
}

function _brGameOver(win){
  cancelAnimationFrame(_brAnim);if(_brState)_brState.running=false;
  const score=_brState?_brState.score:0;
  document.getElementById('bricks-result').textContent=win?'🏆 VICTOIRE !':'GAME OVER';
  document.getElementById('bricks-final').textContent=score;
  document.getElementById('bricks-over').style.display='flex';
  _saveArcadeHS('bricks',score);
  const el=document.getElementById('arc-hs-bricks');
  if(el)el.textContent='🏆 Record : '+score;
}


// ─── MORPION ───
let _mpBoard,_mpWins=0,_mpDraws=0,_mpLosses=0,_mpLocked=false,_mpAITimer=null;
const _mpWinLines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];




// PUISSANCE 4
(function(){
  var ROWS=6,COLS=7,EMPTY=0,P1=1,P2=2;
  var board,currentPlayer,gameOver,scoreW,scoreD,scoreL,p4Hovered,p4Difficulty;
  // difficulty: 0=easy, 1=normal, 2=hard

  function getRow(col){
    for(var r=ROWS-1;r>=0;r--){ if(board[r][col]===EMPTY) return r; }
    return -1;
  }
  function getRowOnBoard(b,col){
    for(var r=ROWS-1;r>=0;r--){ if(b[r][col]===EMPTY) return r; }
    return -1;
  }
  function checkWinOnBoard(b,row,col,player){
    var dirs=[[0,1],[1,0],[1,1],[1,-1]];
    for(var di=0;di<dirs.length;di++){
      var dr=dirs[di][0],dc=dirs[di][1];
      var cells=[[row,col]];
      for(var d=1;d<4;d++){
        var nr=row+dr*d,nc=col+dc*d;
        if(nr<0||nr>=ROWS||nc<0||nc>=COLS||b[nr][nc]!==player) break;
        cells.push([nr,nc]);
      }
      for(var d=1;d<4;d++){
        var nr=row-dr*d,nc=col-dc*d;
        if(nr<0||nr>=ROWS||nc<0||nc>=COLS||b[nr][nc]!==player) break;
        cells.push([nr,nc]);
      }
      if(cells.length>=4) return cells;
    }
    return null;
  }
  function checkBoardForWin(b){
    for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){
      if(b[r][c]!==EMPTY){
        var w=checkWinOnBoard(b,r,c,b[r][c]);
        if(w) return {player:b[r][c],cells:w};
      }
    }
    return null;
  }
  function isDraw(b){ return b[0].every(function(v){return v!==EMPTY;}); }
  function scoreWindow(b,r,c,dr,dc,player){
    var cnt=0,empty=0;
    for(var i=0;i<4;i++){
      var nr=r+dr*i,nc=c+dc*i;
      if(nr<0||nr>=ROWS||nc<0||nc>=COLS) return 0;
      if(b[nr][nc]===player) cnt++;
      else if(b[nr][nc]===EMPTY) empty++;
      else return 0;
    }
    if(cnt===4) return 100;
    if(cnt===3&&empty===1) return 5;
    if(cnt===2&&empty===2) return 2;
    return 0;
  }
  function scoreBoard(b){
    var s=0,dirs=[[0,1],[1,0],[1,1],[1,-1]];
    for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++)
      for(var di=0;di<dirs.length;di++){
        s+=scoreWindow(b,r,c,dirs[di][0],dirs[di][1],P2);
        s-=scoreWindow(b,r,c,dirs[di][0],dirs[di][1],P1);
      }
    return s;
  }
  function getOrderedMoves(b){
    return [3,2,4,1,5,0,6].filter(function(c){return getRowOnBoard(b,c)>=0;});
  }
  function minimax(b,depth,isMax,alpha,beta){
    var result=checkBoardForWin(b);
    if(result) return result.player===P2 ? 100+depth : -(100+depth);
    var moves=getOrderedMoves(b);
    if(depth===0||moves.length===0) return scoreBoard(b);
    if(isMax){
      var best=-Infinity;
      for(var i=0;i<moves.length;i++){
        var c=moves[i],r=getRowOnBoard(b,c);if(r<0)continue;
        b[r][c]=P2;
        best=Math.max(best,minimax(b,depth-1,false,alpha,beta));
        b[r][c]=EMPTY;alpha=Math.max(alpha,best);if(beta<=alpha)break;
      }
      return best;
    } else {
      var best=Infinity;
      for(var i=0;i<moves.length;i++){
        var c=moves[i],r=getRowOnBoard(b,c);if(r<0)continue;
        b[r][c]=P1;
        best=Math.min(best,minimax(b,depth-1,true,alpha,beta));
        b[r][c]=EMPTY;beta=Math.min(beta,best);if(beta<=alpha)break;
      }
      return best;
    }
  }

  function getBestCol(){
    var depth = p4Difficulty===0 ? 1 : p4Difficulty===1 ? 3 : 5;
    var errRate = p4Difficulty===0 ? 0.45 : p4Difficulty===1 ? 0.15 : 0;
    // Easy/normal: sometimes play randomly
    if(Math.random() < errRate){
      var moves=getOrderedMoves(board);
      return moves[Math.floor(Math.random()*moves.length)];
    }
    var bestScore=-Infinity,bestCol=3;
    var moves=getOrderedMoves(board);
    for(var i=0;i<moves.length;i++){
      var c=moves[i],r=getRow(c);if(r<0)continue;
      board[r][c]=P2;
      var s=minimax(board,depth,false,-Infinity,Infinity);
      board[r][c]=EMPTY;
      if(s>bestScore){bestScore=s;bestCol=c;}
    }
    return bestCol;
  }

  function setStatus(txt){ var el=document.getElementById('p4-status');if(el)el.textContent=txt; }

  function updateScores(){
    var $=function(id){return document.getElementById(id);};
    if($('p4-sw'))$('p4-sw').textContent=scoreW;
    if($('p4-sd'))$('p4-sd').textContent=scoreD;
    if($('p4-sl'))$('p4-sl').textContent=scoreL;
    if($('p4-score-badge'))$('p4-score-badge').textContent=scoreW+' - '+scoreL;
    var hs=$('arc-hs-p4');if(hs)hs.textContent='Victoires : '+scoreW;
  }

  function setResult(title,sub,color){
    gameOver=true;
    var over=document.getElementById('p4-over');
    var ot=document.getElementById('p4-over-title');
    var os=document.getElementById('p4-over-sub');
    if(ot){ot.textContent=title;ot.style.color=color;}
    if(os)os.textContent=sub;
    if(over)over.style.display='flex';
  }

  function renderCells(boardEl){
    boardEl.innerHTML='';
    var previewRow=-1;
    if(p4Hovered>=0&&!gameOver&&currentPlayer===P1){
      for(var r=ROWS-1;r>=0;r--){if(board[r][p4Hovered]===EMPTY){previewRow=r;break;}}
    }
    for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){
      var cell=document.createElement('div');
      var v=board[r][c];
      cell.className='p4-cell'+(v===P1?' p1':v===P2?' p2':'');
      if(r===previewRow&&c===p4Hovered&&v===EMPTY)cell.classList.add('p4-preview');
      (function(col){cell.addEventListener('click',function(){if(!gameOver&&currentPlayer===P1)drop(col);});})(c);
      boardEl.appendChild(cell);
    }
  }

  function render(){
    var boardEl=document.getElementById('p4-board');
    var arrowEl=document.getElementById('p4-arrows');
    if(!boardEl||!arrowEl)return;
    arrowEl.innerHTML='';
    for(var c=0;c<COLS;c++){
      var a=document.createElement('div');
      a.className='p4-arrow'+(gameOver?' disabled':'');
      a.textContent='\u25BC';
      (function(col){
        a.addEventListener('click',function(){if(!gameOver&&currentPlayer===P1)drop(col);});
        a.addEventListener('mouseenter',function(){if(!gameOver&&currentPlayer===P1){p4Hovered=col;renderCells(boardEl);}});
        a.addEventListener('mouseleave',function(){p4Hovered=-1;renderCells(boardEl);});
        a.addEventListener('touchstart',function(){if(!gameOver&&currentPlayer===P1){p4Hovered=col;renderCells(boardEl);}},{passive:true});
        a.addEventListener('touchend',function(){p4Hovered=-1;},{passive:true});
      })(c);
      arrowEl.appendChild(a);
    }
    renderCells(boardEl);
    // Update difficulty buttons highlight
    [0,1,2].forEach(function(d){
      var btn=document.getElementById('p4-diff-'+d);
      if(btn)btn.className='p4-diff-btn'+(p4Difficulty===d?' active':'');
    });
  }

  function drop(col){
    var row=getRow(col);if(row<0)return;
    board[row][col]=currentPlayer;
    render();
    var cells=document.getElementById('p4-board').children;
    var idx=row*COLS+col;
    if(cells[idx]){cells[idx].classList.remove('drop');void cells[idx].offsetWidth;cells[idx].classList.add('drop');}
    var win=checkWinOnBoard(board,row,col,currentPlayer);
    if(win){
      gameOver=true;render();
      var allCells=document.getElementById('p4-board').children;
      win.forEach(function(rc){var el=allCells[rc[0]*COLS+rc[1]];if(el)el.classList.add('win');});
      setTimeout(function(){
        if(currentPlayer===P1){scoreW++;setResult('\uD83C\uDFC6 VICTOIRE !','Tu as aligne 4 !','#fbbf24');}
        else{scoreL++;setResult('DEFAITE','L\'IA a aligne 4...','var(--red)');}
        updateScores();
      },400);
      return;
    }
    if(isDraw(board)){
      setTimeout(function(){scoreD++;setResult('EGALITE','Aucun alignement possible.','rgba(255,255,255,.6)');updateScores();},400);
      return;
    }
    currentPlayer=currentPlayer===P1?P2:P1;
    setStatus(currentPlayer===P1?'A toi de jouer !':'L\'IA reflechit...');
    render();
    if(currentPlayer===P2)setTimeout(aiMove,p4Difficulty===0?300:500);
  }

  function aiMove(){if(gameOver)return;drop(getBestCol());}

  function init(){
    board=[];
    for(var r=0;r<ROWS;r++){board.push([]);for(var c=0;c<COLS;c++)board[r].push(EMPTY);}
    currentPlayer=P1;gameOver=false;p4Hovered=-1;
    var over=document.getElementById('p4-over');if(over)over.style.display='none';
    render();setStatus('A toi de jouer !');
  }

  window.p4SetDiff=function(d){
    p4Difficulty=d;
    render();
  };

  window.startP4=function(){
    if(scoreW===undefined){scoreW=0;scoreD=0;scoreL=0;}
    if(p4Difficulty===undefined)p4Difficulty=1;
    go('arc-p4');
    if(musOn)switchMusic('puissance4',0.22);
    setTimeout(function(){init();updateScores();},50);
  };
  window.resetP4=function(){init();};
  window.stopP4=function(){gameOver=true;};
})();


function startMorpion(){go('arc-morpion');if(musOn)switchMusic('morpion',0.22);resetMorpion();}
function resetMorpion(){
  clearTimeout(_mpAITimer);_mpAITimer=null;
  _mpBoard=Array(9).fill(null);_mpLocked=false;
  const grid=document.getElementById('morp-grid');
  grid.querySelectorAll('.morp-cell').forEach(c=>{c.textContent='';c.className='morp-cell';});
  document.getElementById('morp-status').textContent='À toi de jouer !';
  document.getElementById('morp-over').style.display='none';
}
function morphPlay(i){
  if(_mpLocked||_mpBoard[i])return;
  _mpBoard[i]='P';
  const cells=document.getElementById('morp-grid').querySelectorAll('.morp-cell');
  cells[i].textContent='🎭';cells[i].classList.add('p1-cell');
  const pw=_mpCheck('P');
  if(pw){_mpEnd('P',pw);return;}
  if(_mpBoard.every(c=>c)){_mpDraws++;document.getElementById('mp-sd').textContent=_mpDraws;document.getElementById('morp-status').textContent='Match nul !';_mpLocked=true;_mpShowOver('MATCH NUL');return;}
  _mpLocked=true;
  _mpAITimer=setTimeout(()=>{
    _mpAITimer=null;
    if(!_mpLocked)return;
    const cells2=document.getElementById('morp-grid').querySelectorAll('.morp-cell');
    const move=_mpAI();_mpBoard[move]='A';cells2[move].textContent='🎬';cells2[move].classList.add('p2-cell');
    const aw=_mpCheck('A');
    if(aw){_mpEnd('A',aw);return;}
    if(_mpBoard.every(c=>c)){_mpDraws++;document.getElementById('mp-sd').textContent=_mpDraws;document.getElementById('morp-status').textContent='Match nul !';_mpLocked=true;_mpShowOver('MATCH NUL');return;}
    _mpLocked=false;document.getElementById('morp-status').textContent='À toi de jouer !';
  },500);
}
function _mpCheck(p){
  for(const l of _mpWinLines)if(l.every(i=>_mpBoard[i]===p))return l;
  return null;
}
function _mpAI(){
  // Gagner si possible
  for(const l of _mpWinLines){const e=l.filter(i=>!_mpBoard[i]);if(e.length===1&&l.filter(i=>_mpBoard[i]==='A').length===2)return e[0];}
  // Bloquer le joueur
  for(const l of _mpWinLines){const e=l.filter(i=>!_mpBoard[i]);if(e.length===1&&l.filter(i=>_mpBoard[i]==='P').length===2)return e[0];}
  // Centre
  if(!_mpBoard[4])return 4;
  // Aléatoire
  const free=_mpBoard.map((v,i)=>v?null:i).filter(i=>i!==null);
  return free[Math.floor(Math.random()*free.length)];
}
function _mpShowOver(title){
  const el=document.getElementById('morp-over');
  const t=document.getElementById('morp-over-title');
  if(t)t.textContent=title;
  if(el)el.style.display='flex';
}
function _mpEnd(winner,line){
  _mpLocked=true;
  const cells=document.getElementById('morp-grid').querySelectorAll('.morp-cell');
  line.forEach(i=>cells[i].classList.add('win'));
  if(winner==='P'){
    _mpWins++;document.getElementById('mp-sw').textContent=_mpWins;
    document.getElementById('morp-status').textContent='🎉 Tu as gagné !';
    _saveArcadeHS('morpion',_mpWins);
    setTimeout(()=>_mpShowOver('🎉 GAGNÉ !'),600);
  } else {
    _mpLosses++;document.getElementById('mp-sl').textContent=_mpLosses;
    document.getElementById('morp-status').textContent='🎬 L\'IA gagne !';
    setTimeout(()=>_mpShowOver('🎬 IA GAGNE'),600);
  }
}

// ─── MEMORY ───
const MEM_EMOJIS=['🎬','🎭','🏆','⭐','🎥','🎞️','🎟️','🍿','📽️','🎪','🎨','🎤'];
let _memFlipped=[],_memMatched=[],_memMoves=0,_memTimer=null,_memSeconds=0,_memLocked=false;

function startMemory(){
  go('arc-memory');
  if(musOn)switchMusic('memory',0.22);
  document.getElementById('mem-over').style.display='none';
  _memFlipped=[];_memMatched=[];_memMoves=0;_memSeconds=0;_memLocked=false;
  clearInterval(_memTimer);
  document.getElementById('mem-moves').textContent='0';
  document.getElementById('mem-pairs').textContent='0/8';
  document.getElementById('mem-time').textContent='0:00';
  // 8 paires parmi 12 emojis
  const chosen=MEM_EMOJIS.slice().sort(()=>Math.random()-.5).slice(0,8);
  const cards=[...chosen,...chosen].sort(()=>Math.random()-.5);
  const grid=document.getElementById('mem-grid');
  grid.innerHTML=cards.map((e,i)=>`
    <div class="mem-card" id="mc-${i}" onclick="memFlip(${i})">
      <div class="mem-card-inner" style="width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .35s cubic-bezier(.4,0,.2,1);">
        <div class="mem-card-front" style="position:absolute;inset:0;border-radius:12px;display:flex;align-items:center;justify-content:center;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.25);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:18px;height:18px;color:rgba(96,165,250,.5);"><rect x="2" y="3" width="9" height="9" rx="2"/><rect x="13" y="3" width="9" height="9" rx="2"/><rect x="2" y="14" width="9" height="9" rx="2"/><rect x="13" y="14" width="9" height="9" rx="2"/></svg></div>
        <div class="mem-card-back" data-emoji="${e}" style="position:absolute;inset:0;border-radius:12px;display:flex;align-items:center;justify-content:center;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);transform:rotateY(180deg);font-size:22px;">${e}</div>
      </div>
    </div>`).join('');
  _memTimer=setInterval(()=>{
    _memSeconds++;
    const m=Math.floor(_memSeconds/60),s=_memSeconds%60;
    const el=document.getElementById('mem-time');
    if(el)el.textContent=m+':'+(s<10?'0':'')+s;
  },1000);
}
function stopMemory(){clearInterval(_memTimer);_memTimer=null;}

// ─── BOBINE INFINIE ───
let _bobAnim=null,_bobState=null;

function startBobine(){
  go('arc-bobine');
  document.getElementById('bob-over').style.display='none';
  document.getElementById('bob-hint').style.display='block';
  if(musOn)switchMusic('bobine',0.22);
  if(_bobAnim)cancelAnimationFrame(_bobAnim);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const area=document.getElementById('bob-game-area');
    const cv=document.getElementById('bob-canvas');
    const W=area.clientWidth||612,H=area.clientHeight||560;
    cv.width=W;cv.height=H;
    // Perf mobile : désactiver l'antialiasing et forcer le rendu CPU optimisé
    const _ctx=cv.getContext('2d',{alpha:false,desynchronized:true});
    if(_ctx){_ctx.imageSmoothingEnabled=false;}
    const LANES=3,laneW=W/LANES;
    const playerW=38,playerH=48;
    // Décor : étoiles de fond fixes + rails de perspective animés
    const stars=[];
    for(let i=0;i<60;i++) stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+0.3,a:Math.random()*0.6+0.2});
    const s={
      W,H,running:true,
      score:0,dist:0,speed:5.5,frame:0,  // vitesse de départ plus haute
      lane:1,
      targetLaneX:laneW*1+laneW/2,
      playerX:laneW*1+laneW/2,
      playerY:H-playerH-20,
      playerW,playerH,laneW,
      obstacles:[],collectibles:[],particles:[],
      bonusScore:0,
      stars,
      filmStrip:0,  // offset défilement bande pellicule
      combo:0,comboTimer:0,flash:0,
      sideFlash:0,sideFlashLane:0,
    };
    document.getElementById('bob-score-badge').textContent=0;
    _bobState=s;
    _bobAnim=requestAnimationFrame(_bobLoop);
  }));
}

function stopBobine(){
  if(_bobState)_bobState.running=false;
  cancelAnimationFrame(_bobAnim);_bobAnim=null;_bobState=null;
}

function _bobLoop(){
  const s=_bobState;
  if(!s||!s.running)return;
  _bobTick(s);_bobDraw(s);
  _bobAnim=requestAnimationFrame(_bobLoop);
}

function _bobTick(s){
  s.frame++;s.dist++;
  s.score=Math.floor(s.dist/3)+(s.bonusScore||0);
  // Accélération plus agressive
  if(s.frame%280===0) s.speed=Math.min(14,s.speed+0.5);
  s.filmStrip=(s.filmStrip+s.speed*0.8)%(s.H);

  // Smooth lane switch
  s.playerX+=(s.targetLaneX-s.playerX)*0.22;

  // Spawn obstacles — taux adapté à la vitesse, plus fréquent dès le départ
  const spawnRate=Math.max(28,90-Math.floor(s.speed*6));
  if(s.frame%spawnRate===0){
    const lane=Math.floor(Math.random()*3);
    // Parfois double obstacle dans des voies différentes
    const lanes=[lane];
    if(s.speed>7&&Math.random()<0.3){
      const l2=(lane+1+Math.floor(Math.random()*2))%3;
      if(l2!==lane) lanes.push(l2);
    }
    const obsH=26+Math.floor(Math.random()*16);
    lanes.forEach(l=>{
      s.obstacles.push({x:s.laneW*l+s.laneW/2,y:-50,w:30,h:obsH,speed:s.speed+Math.random()*2});
    });
  }
  // Spawn collectibles
  if(s.frame%(spawnRate+20)===0){
    const lane=Math.floor(Math.random()*3);
    s.collectibles.push({x:s.laneW*lane+s.laneW/2,y:-30,r:13,alive:true});
  }

  // Move
  s.obstacles.forEach(o=>o.y+=o.speed);
  s.collectibles.forEach(c=>{if(c.alive)c.y+=s.speed;});

  // Collisions
  const px=s.playerX,py=s.playerY,hw=s.playerW/2-6,hh=s.playerH/2-4;
  for(let i=s.obstacles.length-1;i>=0;i--){
    const o=s.obstacles[i];
    if(Math.abs(o.x-px)<hw+o.w/2-4 && Math.abs((o.y+o.h/2)-py)<hh+o.h/2-4){
      s.running=false;_bobGameOver(s);return;
    }
    if(o.y>s.H+50) s.obstacles.splice(i,1);
  }
  for(let i=s.collectibles.length-1;i>=0;i--){
    const c=s.collectibles[i];
    if(!c.alive)continue;
    if(Math.abs(c.x-px)<hw+c.r && Math.abs(c.y-py)<hh+c.r){
      c.alive=false;s.bonusScore=(s.bonusScore||0)+10;s.combo++;s.comboTimer=70;s.flash=10;
      s.sideFlash=12;s.sideFlashLane=s.lane;
      if(s.combo>=3)sndBobineCombo();else sndBobineCollect();
      for(let p=0;p<9;p++) s.particles.push({x:c.x,y:c.y,vx:(Math.random()-.5)*5,vy:-Math.random()*5-1,life:28,maxLife:28,r:Math.random()*3+1});
      s.collectibles.splice(i,1);
    } else if(c.y>s.H+40) s.collectibles.splice(i,1);
  }
  if(s.comboTimer>0) s.comboTimer--;else s.combo=0;
  for(let i=s.particles.length-1;i>=0;i--){
    const p=s.particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=0.25;p.life--;
    if(p.life<=0) s.particles.splice(i,1);
  }
  if(s.flash>0) s.flash--;
  if(s.sideFlash>0) s.sideFlash--;
  document.getElementById('bob-score-badge').textContent=s.score;
}

function _bobRR(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();
}

function _bobDraw(s){
  const cv=document.getElementById('bob-canvas');if(!cv)return;
  const ctx=cv.getContext('2d');
  const W=s.W,H=s.H;
  // Fast glow helper (no shadowBlur — too slow on mobile)
  function _glow(x,y,r,color,alpha){
    ctx.globalAlpha=alpha*0.4;ctx.fillStyle=color;
    ctx.beginPath();ctx.arc(x,y,r*1.8,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=alpha*0.25;
    ctx.beginPath();ctx.arc(x,y,r*2.6,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
  }

  // ── Fond : dégradé sombre violet/noir ──
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#0a0612');bg.addColorStop(1,'#13081e');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

  // Étoiles fixes (grain cinéma)
  s.stars.forEach(st=>{
    ctx.fillStyle=`rgba(255,255,255,${st.a*0.5})`;
    ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fill();
  });

  // ── Bande pellicule gauche et droite (défilante) ──
  const fo=s.filmStrip;
  const stripW=20,perfH=14,perfW=10,perfGap=18;
  [0,W-stripW].forEach(sx=>{
    ctx.fillStyle='rgba(10,6,18,0.95)';
    ctx.fillRect(sx,0,stripW,H);
    ctx.strokeStyle='rgba(240,90,160,0.25)';ctx.lineWidth=1;
    ctx.strokeRect(sx,0,stripW,H);
    for(let py2=-fo%(perfH+perfGap);py2<H;py2+=perfH+perfGap){
      ctx.fillStyle='rgba(240,90,160,0.12)';
      ctx.beginPath();_bobRR(ctx,sx+stripW/2-perfW/2,py2,perfW,perfH,2);ctx.fill();
      ctx.strokeStyle='rgba(240,90,160,0.3)';ctx.lineWidth=0.5;
      ctx.beginPath();_bobRR(ctx,sx+stripW/2-perfW/2,py2,perfW,perfH,2);ctx.stroke();
    }
  });

  // ── Décor : tapis rouge en perspective ──
  const horizon=H*0.20;
  const vanX=W/2;
  const trackL=stripW+2, trackR=W-stripW-2;

  const carpetGrad=ctx.createLinearGradient(0,horizon,0,H);
  carpetGrad.addColorStop(0,'rgba(80,10,30,0.0)');
  carpetGrad.addColorStop(0.4,'rgba(100,15,40,0.35)');
  carpetGrad.addColorStop(1,'rgba(130,20,55,0.55)');
  ctx.fillStyle=carpetGrad;
  ctx.beginPath();
  ctx.moveTo(trackL,H);ctx.lineTo(vanX-4,horizon);
  ctx.lineTo(vanX+4,horizon);ctx.lineTo(trackR,H);
  ctx.closePath();ctx.fill();

  const projGrad=ctx.createRadialGradient(vanX,horizon,0,vanX,horizon,H*0.7);
  projGrad.addColorStop(0,'rgba(240,90,160,0.10)');
  projGrad.addColorStop(0.5,'rgba(240,90,160,0.03)');
  projGrad.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=projGrad;ctx.fillRect(0,0,W,H);

  ctx.setLineDash([]);
  for(let i=1;i<3;i++){
    const bx=trackL+(trackR-trackL)*(i/3);
    const lg=ctx.createLinearGradient(bx,H,vanX,horizon);
    lg.addColorStop(0,'rgba(240,90,160,0.45)');
    lg.addColorStop(1,'rgba(240,90,160,0.05)');
    ctx.strokeStyle=lg;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(bx,H);ctx.lineTo(vanX,horizon);ctx.stroke();
  }
  const eg=ctx.createLinearGradient(trackL,H,vanX,horizon);
  eg.addColorStop(0,'rgba(240,90,160,0.6)');eg.addColorStop(1,'rgba(240,90,160,0.05)');
  ctx.strokeStyle=eg;ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(trackL,H);ctx.lineTo(vanX,horizon);ctx.stroke();
  ctx.beginPath();ctx.moveTo(trackR,H);ctx.lineTo(vanX,horizon);ctx.stroke();

  const nLines=18;
  for(let i=0;i<nLines;i++){
    const t=((i/nLines)+fo/H)%1;
    const fy=horizon+t*(H-horizon);
    const fw=(trackR-trackL)*t;
    const fx=vanX-fw/2;
    if(i%3===0){
      ctx.fillStyle=`rgba(160,30,70,${t*0.15})`;
      const pt=((( i-1)/nLines)+fo/H)%1;
      const pfy=horizon+pt*(H-horizon);
      const pfw=(trackR-trackL)*pt;
      ctx.beginPath();
      ctx.moveTo(vanX-fw/2,fy);ctx.lineTo(vanX+fw/2,fy);
      ctx.lineTo(vanX+pfw/2,pfy);ctx.lineTo(vanX-pfw/2,pfy);
      ctx.closePath();ctx.fill();
    }
    ctx.strokeStyle=`rgba(240,90,160,${t*0.28})`;ctx.lineWidth=t>0.7?1.5:0.8;
    ctx.beginPath();ctx.moveTo(fx,fy);ctx.lineTo(fx+fw,fy);ctx.stroke();
  }

  // ── Collectibles (pellicules dorées) ──
  s.collectibles.forEach(c=>{
    if(!c.alive)return;
    const scale=0.4+0.6*(c.y/H);  // perspective : plus grand en bas
    const r=c.r*scale;
    ctx.save();
    // Halo
    ctx.fillStyle='rgba(245,200,66,0.15)';
    // Bobine néon — anneau extérieur
    ctx.beginPath();ctx.arc(c.x,c.y,r+6,0,Math.PI*2);ctx.fill();
    // Corps bobine (cercle central sombre)
    ctx.fillStyle='#0a0618';
    ctx.beginPath();ctx.arc(c.x,c.y,r,0,Math.PI*2);ctx.fill();
    // Anneau néon cyan
    ctx.strokeStyle=`rgba(0,255,220,${0.7+0.3*Math.sin(s.frame*0.08+c.x)})`;
    ctx.lineWidth=2.5;
    ctx.beginPath();ctx.arc(c.x,c.y,r,0,Math.PI*2);ctx.stroke();
    // 6 trous de bobine
    for(let h=0;h<6;h++){
      const a=(h/6)*Math.PI*2+(s.frame*0.04);
      const hx=c.x+Math.cos(a)*(r*0.52), hy=c.y+Math.sin(a)*(r*0.52);
      ctx.fillStyle='rgba(0,255,220,0.55)';
      ctx.beginPath();ctx.arc(hx,hy,r*0.18,0,Math.PI*2);ctx.fill();
    }
    // Moyeu central
    ctx.fillStyle='rgba(0,255,220,0.9)';
    ctx.beginPath();ctx.arc(c.x,c.y,r*0.22,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#0a0618';
    ctx.beginPath();ctx.arc(c.x,c.y,r*0.1,0,Math.PI*2);ctx.fill();
    ctx.restore();
  });

  // ── Obstacles : claps néon glitch ──
  s.obstacles.forEach(o=>{
    const scale=0.45+0.55*(o.y/H);
    const w=Math.max(28,o.w*scale*1.4),h=Math.max(20,o.h*scale*1.2);
    const x=o.x-w/2,y=o.y-h/2;
    const glitch=Math.sin(s.frame*0.02+o.x)*2;
    ctx.save();
    // Ombre portée néon
    // Corps principal sombre
    ctx.fillStyle='#08040f';
    ctx.beginPath();_bobRR(ctx,x,y+h*0.38,w,h*0.62,4);ctx.fill();
    // Bord néon magenta
    ctx.strokeStyle='rgba(240,50,180,0.9)';ctx.lineWidth=1.5;
    ctx.beginPath();_bobRR(ctx,x,y+h*0.38,w,h*0.62,4);ctx.stroke();
    // Scanlines glitch
    for(let i=0;i<4;i++){
      const ly=y+h*0.38+i*(h*0.62/4);
      ctx.fillStyle=`rgba(240,50,180,${0.06+0.04*(i%2)})`;
      ctx.fillRect(x+1,ly,w-2,h*0.62/4-1);
    }
    // Bandes diagonales néon (style clap)
    ctx.save();ctx.beginPath();_bobRR(ctx,x,y+h*0.38,w,h*0.62,4);ctx.clip();
    for(let i=0;i<6;i++){
      const bx=x+i*(w/5)-4;
      ctx.fillStyle=i%2===0?'rgba(240,50,180,0.25)':'transparent';
      ctx.fillRect(bx,y+h*0.38,w/5,h*0.62);
    }
    ctx.restore();
    // Texte CINÉQUIZ avec effet glitch
    ctx.fillStyle='rgba(0,255,200,0.8)';
    ctx.font=`bold ${Math.max(6,Math.round(h*0.16))}px 'Bebas Neue',sans-serif`;
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('CINÉQUIZ',o.x+glitch,y+h*0.72);
    // Décalage glitch rouge
    ctx.fillStyle='rgba(255,50,100,0.35)';
    ctx.fillText('CINÉQUIZ',o.x-glitch+1,y+h*0.72);
    // Planche supérieure
    ctx.fillStyle='#0f0820';
    ctx.beginPath();
    ctx.moveTo(x,y+h*0.38);ctx.lineTo(x+w,y);ctx.lineTo(x+w,y+h*0.18);ctx.lineTo(x,y+h*0.56);
    ctx.closePath();ctx.fill();
    // Bord planche néon
    ctx.strokeStyle='rgba(240,50,180,0.85)';ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(x,y+h*0.38);ctx.lineTo(x+w,y);ctx.lineTo(x+w,y+h*0.18);ctx.lineTo(x,y+h*0.56);
    ctx.closePath();ctx.stroke();
    ctx.restore();
  });

  // ── Particules ──
  s.particles.forEach(p=>{
    const a=p.life/p.maxLife;
    ctx.fillStyle=`rgba(245,200,66,${a*0.9})`;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r*a,0,Math.PI*2);ctx.fill();
  });

  // Flash collecte (lueur sur la voie active)
  if(s.sideFlash>0){
    const a=s.sideFlash/12*0.18;
    const lx=s.laneW*s.sideFlashLane;
    ctx.fillStyle=`rgba(245,200,66,${a})`;
    ctx.fillRect(lx,0,s.laneW,H);
  }

  // ── Joueur : Runner cyberpunk néon ──
  const px=s.playerX,py=s.playerY,pw=s.playerW,ph=s.playerH;
  ctx.save();
  ctx.translate(px,py);
  const pulse=0.5+0.5*Math.sin(s.frame*0.12);
  const runBob=Math.sin(s.frame*0.18)*2;

  // Traînée néon au sol
  ctx.save();
  var trailGrad=ctx.createRadialGradient(0,ph*0.5,0,0,ph*0.5,pw*0.7);
  trailGrad.addColorStop(0,'rgba(0,220,255,0.25)');
  trailGrad.addColorStop(1,'rgba(0,220,255,0)');
  ctx.fillStyle=trailGrad;
  ctx.beginPath();ctx.ellipse(0,ph*0.5+2,pw*0.7,5,0,0,Math.PI*2);ctx.fill();
  ctx.restore();

  // Jambes (pantalon sombre)
  const legAnim=Math.sin(s.frame*0.18)*3;
  ctx.fillStyle='#0d0820';
  _bobRR(ctx,-13,ph*0.2+legAnim,10,ph*0.28,3);ctx.fill();
  _bobRR(ctx,3,ph*0.2-legAnim,10,ph*0.28,3);ctx.fill();
  // Liseret néon cyan sur jambes
  ctx.strokeStyle='rgba(0,220,255,0.6)';ctx.lineWidth=1;
  ctx.beginPath();_bobRR(ctx,-13,ph*0.2+legAnim,10,ph*0.28,3);ctx.stroke();
  ctx.beginPath();_bobRR(ctx,3,ph*0.2-legAnim,10,ph*0.28,3);ctx.stroke();
  // Bottes
  ctx.fillStyle='#06101e';
  _bobRR(ctx,-15,ph*0.42+legAnim,14,ph*0.12,3);ctx.fill();
  _bobRR(ctx,1,ph*0.42-legAnim,14,ph*0.12,3);ctx.fill();
  ctx.strokeStyle='rgba(0,220,255,0.8)';ctx.lineWidth=1.2;
  ctx.beginPath();_bobRR(ctx,-15,ph*0.42+legAnim,14,ph*0.12,3);ctx.stroke();
  ctx.beginPath();_bobRR(ctx,1,ph*0.42-legAnim,14,ph*0.12,3);ctx.stroke();

  // Corps — combinaison sombre avec armure
  ctx.fillStyle='#0d0820';
  _bobRR(ctx,-17,-ph*0.14+runBob,34,ph*0.36,6);ctx.fill();
  // Bord néon corps
  ctx.strokeStyle='rgba(0,220,255,0.7)';ctx.lineWidth=1.5;
  ctx.beginPath();_bobRR(ctx,-17,-ph*0.14+runBob,34,ph*0.36,6);ctx.stroke();
  // Bande centrale magenta
  ctx.fillStyle='rgba(240,50,180,0.4)';
  _bobRR(ctx,-17,-ph*0.04+runBob,34,ph*0.14,2);ctx.fill();
  ctx.strokeStyle='rgba(240,50,180,0.7)';ctx.lineWidth=1;
  ctx.beginPath();_bobRR(ctx,-17,-ph*0.04+runBob,34,ph*0.14,2);ctx.stroke();
  // Réacteur central pulsant
  ctx.fillStyle=`rgba(0,255,220,${0.7+pulse*0.3})`;
  ctx.beginPath();ctx.arc(0,-ph*0.02+runBob,4+pulse,0,Math.PI*2);ctx.fill();

  // Bras gauche
  ctx.fillStyle='#0d0820';
  ctx.save();ctx.translate(-20,-ph*0.08+runBob);ctx.rotate(0.25+legAnim*0.04);
  _bobRR(ctx,-13,-4,13,7,3);ctx.fill();
  ctx.strokeStyle='rgba(0,220,255,0.5)';ctx.lineWidth=1;
  ctx.beginPath();_bobRR(ctx,-13,-4,13,7,3);ctx.stroke();
  ctx.restore();
  // Bras droit — tenant une bobine
  ctx.fillStyle='#0d0820';
  ctx.save();ctx.translate(18,-ph*0.1+runBob);ctx.rotate(-0.2-legAnim*0.04);
  _bobRR(ctx,0,-4,13,7,3);ctx.fill();
  ctx.strokeStyle='rgba(0,220,255,0.5)';ctx.lineWidth=1;
  ctx.beginPath();_bobRR(ctx,0,-4,13,7,3);ctx.stroke();
  ctx.restore();
  // Gant droit + lueur laser
  ctx.fillStyle='#06101e';
  _bobRR(ctx,27,-ph*0.17+runBob,9,7,2);ctx.fill();
  ctx.fillStyle=`rgba(240,50,180,${0.8+pulse*0.2})`;
  ctx.beginPath();ctx.arc(34,-ph*0.135+runBob,3+pulse*1.5,0,Math.PI*2);ctx.fill();

  // Cou
  ctx.fillStyle='#0d0820';
  _bobRR(ctx,-5,-ph*0.36+runBob,10,ph*0.22,3);ctx.fill();

  // Casque cyberpunk
  ctx.fillStyle='#06040f';
  ctx.beginPath();ctx.arc(0,-ph*0.52+runBob,18,0,Math.PI*2);ctx.fill();
  // Bord casque néon
  ctx.strokeStyle='rgba(0,220,255,0.8)';ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(0,-ph*0.52+runBob,18,0,Math.PI*2);ctx.stroke();
  // Visière holographique
  ctx.fillStyle='rgba(0,30,60,0.85)';
  ctx.beginPath();ctx.ellipse(0,-ph*0.52+runBob,13,11,0,0,Math.PI*2);ctx.fill();
  // Reflet scan sur visière
  ctx.strokeStyle=`rgba(0,255,200,${0.5+pulse*0.3})`;ctx.lineWidth=1;
  ctx.beginPath();ctx.ellipse(0,-ph*0.52+runBob,13,11,0,0,Math.PI*2);ctx.stroke();
  // Yeux LED magenta
  ctx.fillStyle=`rgba(240,50,180,${0.9+pulse*0.1})`;
  ctx.beginPath();ctx.ellipse(-5,-ph*0.54+runBob,4,2.5,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(5,-ph*0.54+runBob,4,2.5,0,0,Math.PI*2);ctx.fill();
  // Ligne scan horizontale visière
  ctx.fillStyle=`rgba(0,255,200,${0.15+pulse*0.1})`;
  var scanY=-ph*0.52+runBob+Math.sin(s.frame*0.08)*10;
  ctx.fillRect(-12,scanY-0.5,24,1.5);
  // Antenne
  ctx.strokeStyle='rgba(0,220,255,0.7)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(8,-ph*0.52+runBob-18);ctx.lineTo(14,-ph*0.52+runBob-28);ctx.stroke();
  ctx.fillStyle='rgba(0,220,255,0.9)';
  ctx.beginPath();ctx.arc(14,-ph*0.52+runBob-28,2.5,0,Math.PI*2);ctx.fill();

  ctx.restore();

  // ── Combo spectaculaire ──
  if(s.combo>=2){
    const a=Math.min(1,s.comboTimer/40);
    // Pop scale : grossit au moment de l'incrément, puis oscille
    const popT=1-(s.comboTimer/70);
    const popScale=popT<0.15?1+popT*4:1+Math.sin(s.frame*0.22)*0.05*a;
    const comboY=py-ph/2-18;
    const comboSize=s.combo>=10?24:s.combo>=5?20:s.combo>=3?17:14;
    const comboColor=s.combo>=10?'#ff2299':s.combo>=5?'#ff6600':'#f5c842';
    ctx.save();
    ctx.translate(px,comboY);
    ctx.scale(popScale,popScale);

    // Halo pulsant (plus grand avec le combo)
    const haloR=comboSize*(2.2+s.combo*0.15);
    ctx.globalAlpha=a*0.12;
    ctx.fillStyle=comboColor;
    ctx.beginPath();ctx.ellipse(0,0,haloR,haloR*0.45,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=a*0.06;
    ctx.beginPath();ctx.ellipse(0,0,haloR*1.5,haloR*0.65,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;

    // Ombre portée
    ctx.font=`bold ${comboSize}px 'Bebas Neue',sans-serif`;
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle=`rgba(0,0,0,${a*0.5})`;
    ctx.fillText(`×${s.combo} COMBO`,2,2);

    // Texte avec outline néon pour les hauts combos
    if(s.combo>=5){
      ctx.strokeStyle=comboColor;
      ctx.lineWidth=3;ctx.globalAlpha=a*0.3;
      ctx.strokeText(`×${s.combo} COMBO`,0,0);
      ctx.globalAlpha=1;
    }
    ctx.fillStyle=comboColor;ctx.globalAlpha=a;
    ctx.fillText(`×${s.combo} COMBO`,0,0);
    ctx.globalAlpha=1;

    // Petites étoiles autour pour combo >=5
    if(s.combo>=5){
      for(let i=0;i<4;i++){
        const starA=(i/4)*Math.PI*2+(s.frame*0.04);
        const sr=comboSize*1.8;
        const sx=Math.cos(starA)*sr,sy=Math.sin(starA)*sr*0.4;
        ctx.globalAlpha=a*0.7;
        ctx.fillStyle=comboColor;
        ctx.font=`bold ${Math.round(comboSize*0.45)}px sans-serif`;
        ctx.fillText('★',sx,sy);
      }
      ctx.globalAlpha=1;
    }
    ctx.restore();
  }

  // ── HUD vitesse ──
  const spd=s.speed.toFixed(1);
  ctx.fillStyle='rgba(240,90,160,0.35)';
  ctx.font=`bold 11px 'Bebas Neue',sans-serif`;ctx.textAlign='right';
  ctx.fillText(spd+'×',W-stripW-10,H-10);
}

function _bobGameOver(s){
  cancelAnimationFrame(_bobAnim);_bobAnim=null;
  sndBobineGameOver();
  const score=s.score;
  document.getElementById('bob-final').textContent=score;
  const prev=_getArcadeHS('bobine');
  if(score>prev){
    document.getElementById('bob-best-msg').textContent='🏆 Nouveau record !';
    _saveArcadeHS('bobine',score);
    const hs=document.getElementById('arc-hs-bobine');
    if(hs)hs.textContent='🏆 Record : '+score;
  } else {
    document.getElementById('bob-best-msg').textContent=prev?'Record actuel : '+prev:'';
  }
  document.getElementById('bob-over').style.display='flex';
}

// Swipe gauche/droite + clavier
(function(){
  let _bsx=null;
  document.addEventListener('touchstart',e=>{
    if(!document.getElementById('arc-bobine').classList.contains('on'))return;
    _bsx=e.touches[0].clientX;
  },{passive:true});
  document.addEventListener('touchend',e=>{
    if(!document.getElementById('arc-bobine').classList.contains('on'))return;
    if(_bsx===null)return;
    const dx=e.changedTouches[0].clientX-_bsx;_bsx=null;
    if(!_bobState||!_bobState.running||Math.abs(dx)<20)return;
    const s=_bobState;
    if(dx<0&&s.lane>0){s.lane--;s.targetLaneX=s.laneW*s.lane+s.laneW/2;}
    else if(dx>0&&s.lane<2){s.lane++;s.targetLaneX=s.laneW*s.lane+s.laneW/2;}
  },{passive:true});
  document.addEventListener('keydown',e=>{
    if(!document.getElementById('arc-bobine').classList.contains('on'))return;
    if(!_bobState||!_bobState.running)return;
    const s=_bobState;
    if((e.key==='ArrowLeft'||e.key==='a')&&s.lane>0){s.lane--;s.targetLaneX=s.laneW*s.lane+s.laneW/2;}
    if((e.key==='ArrowRight'||e.key==='d')&&s.lane<2){s.lane++;s.targetLaneX=s.laneW*s.lane+s.laneW/2;}
  });
})();


// ─── DOODLE CINÉ ───
(function(){
  let _ddAnim=null,_ddS=null;
  const GRAV=0.32, PLAT_H=11, JUMP_V=-18.0;  // gravité augmentée + saut ajusté en conséquence

  const BONUS_TYPES=[
    {kind:'popcorn', col:'#f5c842', pts:20,  label:'+20', effect:'pts'},
    {kind:'ticket',  col:'#82dc64', pts:50,  label:'+50', effect:'pts'},
    {kind:'oscar',   col:'#fbbf24', dur:300, label:'×2',  effect:'x2'},
    {kind:'spring',  col:'#63d2ff', dur:1,   label:'SUPER',effect:'superjump'},
  ];
  const HAZARD_TYPES=[
    {kind:'camera', col:'#ff6b6b', w:32,h:26},
    {kind:'clap',   col:'#ff9f43', w:30,h:24},
    {kind:'reel',   col:'#ee5a9c', w:28,h:28},
  ];

  window.startDoodle=function(){
    go('arc-doodle');
    document.getElementById('doodle-over').style.display='none';
    if(musOn)switchMusic('doodle',0.22);
    if(_ddAnim){cancelAnimationFrame(_ddAnim);_ddAnim=null;}
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const area=document.getElementById('doodle-game-area');
      const cv=document.getElementById('doodle-canvas');
      const W=area.clientWidth||612, H=area.clientHeight||580;
      cv.width=W; cv.height=H;
      const _dctx=cv.getContext('2d',{alpha:false,desynchronized:true});
      if(_dctx){_dctx.imageSmoothingEnabled=false;}
      const PLAT_W=68;
      const plats=[];
      plats.push({x:W/2-PLAT_W/2, y:H-40, w:PLAT_W, type:'normal', broken:false, vx:0});
      // Espacement réduit dès le départ = plus difficile
      for(let i=1;i<14;i++)
        plats.push(_ddNewPlat(W, plats[i-1].y-52-Math.random()*28, PLAT_W, i));
      // Étoiles de fond
      const bgStars=[];
      for(let i=0;i<50;i++) bgStars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+0.3,a:Math.random()*0.5+0.1});
      _ddS={
        W,H,running:true,
        score:0,camY:0,
        px:W/2, py:H-80, pvx:0, pvy:0,
        plats, PLAT_W,
        bonuses:[], hazards:[], particles:[], popups:[],
        bgStars,
          // décor bâtiments en arrière-plan
        frame:0, dead:false, wobble:0,
        x2active:0,
        swipeStartX:null,
      };
      document.getElementById('doodle-score-badge').textContent=0;
      _ddAnim=requestAnimationFrame(_ddLoop);
    }));
  };

  window.stopDoodle=function(){
    if(_ddS)_ddS.running=false;
    cancelAnimationFrame(_ddAnim);_ddAnim=null;_ddS=null;
  };

  function _ddNewPlat(W,y,pw,idx){
    // Dès idx>2, plus de plateformes fragiles et mobiles
    const breakChance = idx<3?0:Math.min(0.22,0.08+idx*0.008);
    const moveChance  = idx<3?0:Math.min(0.18,0.05+idx*0.006);
    const type=idx<3?'normal':Math.random()<breakChance?'break':Math.random()<moveChance?'move':'normal';
    return {x:Math.random()*(W-pw), y, w:pw, type, broken:false,
            vx:type==='move'?(Math.random()<0.5?1:-1)*1.8:0,
            hasBonus: idx>2 && Math.random()<0.28,
    };
  }

  function _ddLoop(){
    if(!_ddS||!_ddS.running)return;
    _ddTick();_ddDraw();
    _ddAnim=requestAnimationFrame(_ddLoop);
  }

  function _ddTick(){
    const s=_ddS;
    const W=s.W, H=s.H;
    s.frame++;
    if(s.x2active>0) s.x2active--;

    s.pvy+=GRAV;
    s.px+=s.pvx;
    s.py+=s.pvy;
    if(s.px<-16) s.px=W+16;
    if(s.px>W+16) s.px=-16;
    s.pvx*=0.90;

    

    // Collision plateformes
    if(s.pvy>0){
      for(let i=s.plats.length-1;i>=0;i--){
        const p=s.plats[i];
        const pSY=p.y-s.camY;
        const feet=s.py-s.camY, feetPrev=feet-s.pvy;
        if(s.px>p.x-10 && s.px<p.x+p.w+10 &&
           feet>=pSY-4 && feet<=pSY+PLAT_H+6 && feetPrev<=pSY+2){
          if(p.type==='break'&&!p.broken){
            p.broken=true;
            _ddBurst(p.x+p.w/2,p.y,'255,120,60',8);
            s.pvy=JUMP_V*0.5;
          } else if(!p.broken){
            s.pvy=JUMP_V;
            s.wobble=10;
            _ddBurst(s.px,p.y,'130,220,100',5);
            sndDoodleJump();
            if(p.hasBonus){
              p.hasBonus=false;
              const bt=BONUS_TYPES[Math.floor(Math.random()*BONUS_TYPES.length)];
              s.bonuses.push({x:p.x+p.w/2, y:p.y-32, r:14, kind:bt.kind,
                col:bt.col, pts:bt.pts||0, dur:bt.dur||0,
                label:bt.label, effect:bt.effect,
                floatOff:Math.random()*Math.PI*2, collected:false});
            }
          }
          break;
        }
      }
    }

    // Caméra & score
    const targetCam=s.py-H*0.42;
    if(targetCam<s.camY) s.camY=targetCam;
    const raw=Math.max(0,Math.round(-s.camY/7));
    const sc=s.x2active>0?raw*2:raw;
    if(sc>s.score) s.score=sc;
    document.getElementById('doodle-score-badge').textContent=s.score+(s.x2active>0?' ×2':'');

    // Plateformes mobiles (vitesse croissante)
    const moveSpd=1.8+Math.min(3,s.score/600);
    s.plats.forEach(p=>{
      if(p.type==='move'){
        p.x+=p.vx*(moveSpd/1.8);
        if(p.x<0||p.x+p.w>W){p.vx*=-1;p.x=Math.max(0,Math.min(W-p.w,p.x));}
      }
    });

    // Suppression plateformes hors écran (avant spawn pour éviter accumulation)
    const cutoff=s.camY+H+120;
    for(let i=s.plats.length-1;i>=0;i--)
      if(s.plats[i].y>cutoff) s.plats.splice(i,1);

    // Spawn plateformes — sécurisé contre boucle infinie
    let spawnGuard=0;
    let highest2=s.plats.length>0?s.plats.reduce((m,p)=>p.y<m?p.y:m,s.camY):s.camY;
    while((highest2-s.camY>-H*0.8||s.plats.length<14)&&spawnGuard<30){
      spawnGuard++;
      const gap=48+Math.random()*30;
      const idx=Math.min(200,Math.max(3,Math.round(-highest2/52)));
      s.plats.push(_ddNewPlat(W, highest2-gap, s.PLAT_W, idx));
      highest2-=gap;
    }

    // Spawn obstacles (dès score 60, plus tôt qu'avant)
    const minScore=60;
    if(s.score>minScore){
      const spawnChance=Math.min(0.012, 0.003+(s.score-minScore)*0.00005);
      if(Math.random()<spawnChance){
        const ht=HAZARD_TYPES[Math.floor(Math.random()*HAZARD_TYPES.length)];
        const fromLeft=Math.random()<0.5;
        const screenY=(0.15+Math.random()*0.6)*H;
        s.hazards.push({
          x:fromLeft?-45:W+45, y:s.camY+screenY,
          vx:fromLeft?(1.8+Math.random()*2):-(1.8+Math.random()*2),
          vy:(Math.random()-.5)*1.0,
          w:ht.w, h:ht.h, kind:ht.kind, col:ht.col,
          angle:0, vangle:(Math.random()-.5)*0.08,
        });
      }
    }

    // Obstacles
    for(let i=s.hazards.length-1;i>=0;i--){
      const h=s.hazards[i];
      h.x+=h.vx; h.y+=h.vy; h.angle+=h.vangle;
      const hSY=h.y-s.camY;
      if(h.x<-70||h.x>W+70||hSY<-120||hSY>H+120){s.hazards.splice(i,1);continue;}
      const dx=Math.abs(s.px-h.x-h.w/2), dy=Math.abs((s.py-s.camY)-(hSY+h.h/2));
      if(dx<h.w/2+6 && dy<h.h/2+8){
        _ddBurst(s.px,s.py-s.camY+s.camY,'255,80,80',16);
        sndDoodleGameOver();
        s.dead=true; s.running=false; _ddGameOver(); return;
      }
    }

    // Bonus
    for(let i=s.bonuses.length-1;i>=0;i--){
      const b=s.bonuses[i];
      if(b.collected){s.bonuses.splice(i,1);continue;}
      b.floatOff+=0.07;
      const bSY=b.y-s.camY+Math.sin(b.floatOff)*5;
      if(b.y>s.camY+H+80){s.bonuses.splice(i,1);continue;}
      const dx=Math.abs(s.px-b.x), dy=Math.abs((s.py-s.camY)-bSY);
      if(dx<b.r+12 && dy<b.r+16){
        b.collected=true;
        _ddBurst(b.x,b.y-s.camY,'255,200,60',12);
        s.popups.push({x:b.x, y:b.y, label:b.label, col:b.col, life:45, maxLife:45});
        if(b.effect==='pts'){s.score+=b.pts;}
        else if(b.effect==='x2'){s.x2active=b.dur;}
        else if(b.effect==='superjump'){s.pvy=JUMP_V*1.8;s.wobble=16;sndDoodleSuperJump();}
        sndDoodleBonus();
      }
    }

    // Popups & particules
    for(let i=s.popups.length-1;i>=0;i--){s.popups[i].life--;s.popups[i].y-=0.9;if(s.popups[i].life<=0)s.popups.splice(i,1);}
    for(let i=s.particles.length-1;i>=0;i--){
      const p=s.particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=0.18;p.life--;
      if(p.life<=0)s.particles.splice(i,1);
    }
    if(s.wobble>0)s.wobble--;
    if(s.py-s.camY>H+60&&!s.dead){s.dead=true;s.running=false;sndDoodleGameOver();_ddGameOver();}
  }

  function _ddBurst(x,y,c,n){
    const s=_ddS;if(!s)return;
    for(let i=0;i<n;i++) s.particles.push({
      x,y,vx:(Math.random()-.5)*5,vy:-Math.random()*4-0.5,
      life:22+Math.floor(Math.random()*14),maxLife:36,c
    });
  }

  function _ddRoundRect(ctx,x,y,w,h,r){
    ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();
  }

  function _ddDraw(){
    const s=_ddS;
    const cv=document.getElementById('doodle-canvas');if(!cv)return;
    const ctx=cv.getContext('2d');
    const W=s.W,H=s.H;

    // ── Fond : dégradé nuit cinéma ──
    const bg=ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#050d1a');bg.addColorStop(0.6,'#080f1e');bg.addColorStop(1,'#0c1528');
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

    // Étoiles
    s.bgStars.forEach(st=>{
      ctx.fillStyle=`rgba(255,255,255,${st.a})`;
      ctx.beginPath();ctx.arc(st.x,st.y+((-s.camY*0.04)%H),st.r,0,Math.PI*2);ctx.fill();
    });

    // Particules
    s.particles.forEach(p=>{
      const a=p.life/p.maxLife;
      ctx.fillStyle='rgba('+p.c+','+a+')';
      ctx.beginPath();ctx.arc(p.x,p.y-s.camY,3*a,0,Math.PI*2);ctx.fill();
    });

    // ── Plateformes ──
    s.plats.forEach(p=>{
      const sy=p.y-s.camY;
      if(sy>H+20||sy<-20)return;
      if(p.broken){
        ctx.fillStyle='rgba(255,100,50,0.45)';
        ctx.fillRect(p.x,sy,p.w*0.44,PLAT_H);
        ctx.fillRect(p.x+p.w*0.56,sy,p.w*0.44,PLAT_H);
        return;
      }
      let col,glow;
      if(p.type==='move'){col='#63d2ff';glow='rgba(99,210,255,0.5)';}
      else if(p.type==='break'){col='#ff7a3d';glow='rgba(255,122,61,0.5)';}
      else{col='#82dc64';glow='rgba(130,220,100,0.4)';}
      ctx.fillStyle=col;
      ctx.beginPath();ctx.roundRect(p.x,sy,p.w,PLAT_H,4);ctx.fill();
      // Reflet
      ctx.fillStyle='rgba(255,255,255,0.25)';
      ctx.beginPath();ctx.roundRect(p.x+3,sy+1,p.w-6,3,2);ctx.fill();
      // Indicateur bonus
      if(p.hasBonus){
        ctx.fillStyle='rgba(245,200,66,0.5)';
        ctx.beginPath();ctx.arc(p.x+p.w/2,sy-6,3,0,Math.PI*2);ctx.fill();
      }
    });

    // ── Bonus (taille augmentée, bien visible) ──
    s.bonuses.forEach(b=>{
      if(b.collected)return;
      const bSY=b.y-s.camY+Math.sin(b.floatOff)*5;
      if(bSY<-40||bSY>H+40)return;
      ctx.save();
      _ddDrawBonus(ctx,b.x,bSY,b.r*1.4,b.kind,b.col);  // +40% taille
      // Label sous le bonus
      ctx.fillStyle=b.col;ctx.font="bold 10px 'Bebas Neue',sans-serif";ctx.textAlign='center';
      ctx.fillText(b.label,b.x,bSY+b.r*1.4+14);
      ctx.restore();
    });

    // ── Obstacles volants ──
    s.hazards.forEach(h=>{
      const hSY=h.y-s.camY;
      if(hSY<-50||hSY>H+50)return;
      ctx.save();
      ctx.translate(h.x+h.w/2,hSY+h.h/2);
      ctx.rotate(h.angle);
      _ddDrawHazard(ctx,-h.w/2,-h.h/2,h.w,h.h,h.kind,h.col);
      ctx.restore();
    });

    // Popups
    s.popups.forEach(p=>{
      const a=p.life/p.maxLife;
      ctx.save();ctx.globalAlpha=a;
      ctx.fillStyle=p.col;
      ctx.font="bold 16px 'Bebas Neue',sans-serif";
      ctx.textAlign='center';
      ctx.fillText(p.label,p.x,p.y-s.camY);
      ctx.restore();
    });

    // ── Joueur : Wall-E ──
    const sx=s.px, sy=s.py-s.camY;
    const scaleY=s.wobble>0?1+s.wobble*0.025:1;
    ctx.save();
    ctx.translate(sx,sy);ctx.scale(1,scaleY);

    // Effet x2 : aura dorée pulsante
    if(s.x2active>0){
      const pulse=0.5+0.5*Math.sin(s.frame*0.2);
      ctx.strokeStyle=`rgba(245,200,66,${0.4+pulse*0.4})`;ctx.lineWidth=2.5;
      ctx.beginPath();ctx.arc(0,-28,26,0,Math.PI*2);ctx.stroke();
    }

    // Chenilles
    ctx.fillStyle='#8a6a2a';
    _ddRoundRect(ctx,-18,2,14,10,3);ctx.fill();
    _ddRoundRect(ctx,4,2,14,10,3);ctx.fill();
    ctx.fillStyle='#a07a30';
    ctx.fillRect(-16,-1,10,5);ctx.fillRect(6,-1,10,5);
    ctx.fillStyle='#6b4c1a';
    for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(-13+i*5,7,2,0,Math.PI*2);ctx.fill();}
    for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(5+i*5,7,2,0,Math.PI*2);ctx.fill();}

    // Corps cube
    ctx.fillStyle='#c8943a';
    _ddRoundRect(ctx,-16,-16,32,20,3);ctx.fill();
    ctx.fillStyle='#a07028';
    ctx.fillRect(-16,-16,32,2);ctx.fillRect(-16,2,32,2);ctx.fillRect(-1,-16,2,20);
    ctx.fillStyle='#6b4400';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
    ctx.fillText('W',0,-4);

    // Cou
    ctx.fillStyle='#a07028';
    _ddRoundRect(ctx,-4,-26,8,12,2);ctx.fill();
    ctx.fillStyle='#8a5e20';ctx.fillRect(-6,-19,12,3);

    // Tête cube
    ctx.fillStyle='#c8943a';
    _ddRoundRect(ctx,-14,-48,28,24,3);ctx.fill();
    ctx.fillStyle='#a07028';ctx.fillRect(-14,-48,28,2);

    // Yeux binoculaires avec clignotement
    const blink=(s.frame%90>85);
    ctx.fillStyle='#1a1a2e';
    _ddRoundRect(ctx,-13,-44,11,16,4);ctx.fill();
    _ddRoundRect(ctx,2,-44,11,16,4);ctx.fill();
    if(!blink){
      ctx.fillStyle='#4a9eff';
      ctx.beginPath();ctx.arc(-7,-36,4,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(7,-36,4,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';
      ctx.beginPath();ctx.arc(-9,-38,1.5,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(5,-38,1.5,0,Math.PI*2);ctx.fill();
    } else {
      ctx.fillStyle='#4a9eff';
      ctx.fillRect(-12,-37,10,3);ctx.fillRect(3,-37,10,3);
    }

    ctx.restore();

    // ── HUD ──
    ctx.fillStyle=s.x2active>0?'#f5c842':'rgba(130,220,100,0.28)';
    ctx.font="bold 12px 'Bebas Neue',sans-serif";ctx.textAlign='right';
    ctx.fillText((s.x2active>0?'×2 ':'')+'↑ '+s.score,W-12,H-12);
    if(s.x2active>0){
      const pct=s.x2active/300;
      ctx.fillStyle='rgba(245,200,66,0.15)';ctx.fillRect(10,H-20,W-20,6);
      ctx.fillStyle='rgba(245,200,66,0.75)';ctx.fillRect(10,H-20,(W-20)*pct,6);
    }
    // Avertissement obstacles
    if(s.score>60&&s.score<120){
      ctx.fillStyle='rgba(255,44214,44214,0.7)';
      ctx.font="bold 10px 'Bebas Neue',sans-serif";ctx.textAlign='left';
      ctx.fillText('⚠ ÉVITE LES OBSTACLES !',12,22);
    }
  }

  function _ddDrawBonus(ctx,x,y,r,kind,col){
    ctx.fillStyle=col;
    if(kind==='popcorn'){
      // Boîte rayée
      ctx.fillRect(x-r*0.75,y-r*0.2,r*1.5,r);
      ctx.fillStyle='rgba(255,255,255,0.3)';
      ctx.fillRect(x-r*0.4,y-r*0.2,r*0.25,r);
      ctx.fillRect(x+r*0.15,y-r*0.2,r*0.25,r);
      // Popcorns
      ctx.fillStyle='#fff8e1';
      ctx.beginPath();ctx.arc(x-r*0.35,y-r*0.5,r*0.38,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(x+r*0.3,y-r*0.62,r*0.32,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(x,y-r*0.42,r*0.3,0,Math.PI*2);ctx.fill();
    } else if(kind==='ticket'){
      ctx.beginPath();ctx.roundRect(x-r,y-r*0.55,r*2,r*1.1,4);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.3)';
      // Tirets du ticket
      for(let i=0;i<3;i++) ctx.fillRect(x-r*0.6+i*r*0.55,y-r*0.3,r*0.25,r*0.5);
      // Découpe latérale
      ctx.fillStyle='rgba(0,0,0,0.3)';
      ctx.beginPath();ctx.arc(x-r,y,r*0.18,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(x+r,y,r*0.18,0,Math.PI*2);ctx.fill();
    } else if(kind==='oscar'){
      // Corps statuette
      ctx.fillRect(x-r*0.28,y-r*0.9,r*0.56,r*1.3);
      // Tête
      ctx.beginPath();ctx.arc(x,y-r*0.85,r*0.42,0,Math.PI*2);ctx.fill();
      // Socle
      ctx.fillRect(x-r*0.6,y+r*0.35,r*1.2,r*0.28);
      ctx.fillRect(x-r*0.45,y+r*0.22,r*0.9,r*0.18);
    } else if(kind==='spring'){
      // Ressort visible
      ctx.strokeStyle=col;ctx.lineWidth=3;ctx.lineCap='round';
      const steps=7;
      ctx.beginPath();
      for(let i=0;i<=steps;i++){
        const px2=x+(i%2===0?-r*0.55:r*0.55);
        const py2=y-r+i*(r*2/steps);
        i===0?ctx.moveTo(px2,py2):ctx.lineTo(px2,py2);
      }
      ctx.stroke();
      // Extrémités
      ctx.fillStyle=col;
      ctx.beginPath();ctx.arc(x,y-r,r*0.18,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(x,y+r,r*0.18,0,Math.PI*2);ctx.fill();
    }
  }

  function _ddDrawHazard(ctx,x,y,w,h,kind,col){
    if(kind==='camera'){
      ctx.fillStyle='#1a1020';
      ctx.beginPath();ctx.roundRect(x+2,y+3,w-4,h-6,4);ctx.fill();
      ctx.strokeStyle=col;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.roundRect(x+2,y+3,w-4,h-6,4);ctx.stroke();
      // Objectif
      ctx.fillStyle='#0a0818';
      ctx.beginPath();ctx.arc(x+w*0.32,y+h/2,h*0.32,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=col;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.arc(x+w*0.32,y+h/2,h*0.32,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='rgba(255,44214,44214,0.5)';
      ctx.beginPath();ctx.arc(x+w*0.32,y+h/2,h*0.15,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.4)';
      ctx.beginPath();ctx.arc(x+w*0.28,y+h/2-h*0.1,h*0.07,0,Math.PI*2);ctx.fill();
      // Poignée
      ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(x+w-8,y+3,6,h-6,2);ctx.fill();
      // LED rouge
      ctx.fillStyle='#ff3040';ctx.beginPath();ctx.arc(x+w*0.72,y+h*0.28,3,0,Math.PI*2);ctx.fill();
    } else if(kind==='clap'){
      ctx.fillStyle='#111';ctx.strokeStyle=col;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.roundRect(x,y+h*0.4,w,h*0.6,3);ctx.fill();ctx.stroke();
      // Rayures alternées
      for(let i=0;i<5;i++){
        ctx.fillStyle=i%2===0?col:'rgba(0,0,0,0.5)';
        ctx.fillRect(x+i*(w/5),y+h*0.4,w/5,h*0.22);
      }
      // Texte
      ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font=`bold ${Math.round(h*0.18)}px sans-serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText('CINÉQUIZ',x+w/2,y+h*0.73);
      // Planche supérieure
      ctx.fillStyle='#1a1a1a';ctx.strokeStyle=col;
      ctx.beginPath();ctx.moveTo(x,y+h*0.4);ctx.lineTo(x+w,y);ctx.lineTo(x+w,y+h*0.15);ctx.lineTo(x,y+h*0.55);ctx.closePath();
      ctx.fill();ctx.stroke();
    } else if(kind==='reel'){
      // Bobine extérieure
      ctx.fillStyle='#0d0818';
      ctx.beginPath();ctx.arc(x+w/2,y+h/2,w/2,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=col;ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(x+w/2,y+h/2,w/2,0,Math.PI*2);ctx.stroke();
      // Rayons
      ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.globalAlpha=0.6;
      for(let i=0;i<6;i++){
        const a=Math.PI/3*i;
        ctx.beginPath();ctx.moveTo(x+w/2+Math.cos(a)*w*0.22,y+h/2+Math.sin(a)*w*0.22);
        ctx.lineTo(x+w/2+Math.cos(a)*w*0.44,y+h/2+Math.sin(a)*w*0.44);ctx.stroke();
      }
      ctx.globalAlpha=1;
      // Centre
      ctx.fillStyle='#1a0828';
      ctx.beginPath();ctx.arc(x+w/2,y+h/2,w*0.22,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=col;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.arc(x+w/2,y+h/2,w*0.22,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle=col;ctx.globalAlpha=0.8;
      ctx.beginPath();ctx.arc(x+w/2,y+h/2,w*0.08,0,Math.PI*2);ctx.fill();
      ctx.globalAlpha=1;
    }
  }

  function _ddGameOver(){
    const s=_ddS;
    const score=s.score;
    document.getElementById('doodle-final').textContent=score;
    const prev=_getArcadeHS('doodle');
    if(score>prev){
      document.getElementById('doodle-best-msg').textContent='🏆 Nouveau record !';
      _saveArcadeHS('doodle',score);
      const el=document.getElementById('arc-hs-doodle');
      if(el)el.textContent='🏆 Record : '+score;
    } else {
      document.getElementById('doodle-best-msg').textContent=prev?'Record actuel : '+prev:'';
    }
    document.getElementById('doodle-over').style.display='flex';
  }

  // Swipe gauche/droite
  const _ddCanvas = document.getElementById('doodle-canvas');
  if(_ddCanvas){
    _ddCanvas.addEventListener('contextmenu', e=>e.preventDefault(), false);
    _ddCanvas.addEventListener('touchstart', function(e){
      e.preventDefault();
      if(!document.getElementById('arc-doodle').classList.contains('on'))return;
      _ddS&&(_ddS.swipeStartX=e.touches[0].clientX);
    },{passive:false});
    _ddCanvas.addEventListener('touchmove', function(e){
      e.preventDefault();
      if(!document.getElementById('arc-doodle').classList.contains('on'))return;
      if(!_ddS||_ddS.swipeStartX===null)return;
      _ddS.pvx=(e.touches[0].clientX-_ddS.swipeStartX)*0.10;
    },{passive:false});
    _ddCanvas.addEventListener('touchend', function(e){
      e.preventDefault();
      if(!document.getElementById('arc-doodle').classList.contains('on'))return;
      if(_ddS)_ddS.swipeStartX=null;
    },{passive:false});
  }
  document.addEventListener('touchstart',function(e){
    if(!document.getElementById('arc-doodle').classList.contains('on'))return;
    _ddS&&(_ddS.swipeStartX=e.touches[0].clientX);
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!document.getElementById('arc-doodle').classList.contains('on'))return;
    if(!_ddS||_ddS.swipeStartX===null)return;
    _ddS.pvx=(e.touches[0].clientX-_ddS.swipeStartX)*0.10;
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!document.getElementById('arc-doodle').classList.contains('on'))return;
    if(_ddS)_ddS.swipeStartX=null;
  },{passive:true});

  // Clavier
  const _ddKeys={};
  document.addEventListener('keydown',function(e){
    if(!document.getElementById('arc-doodle').classList.contains('on'))return;
    _ddKeys[e.key]=true;
  });
  document.addEventListener('keyup',function(e){_ddKeys[e.key]=false;});
  setInterval(function(){
    if(!_ddS||!_ddS.running)return;
    if(!document.getElementById('arc-doodle').classList.contains('on'))return;
    if(_ddKeys['ArrowLeft']||_ddKeys['a']) _ddS.pvx=Math.max(_ddS.pvx-0.7,-6);
    if(_ddKeys['ArrowRight']||_ddKeys['d']) _ddS.pvx=Math.min(_ddS.pvx+0.7,6);
  },16);
})();


function memFlip(i){
  if(_memLocked)return;
  const card=document.getElementById('mc-'+i);
  if(!card||card.classList.contains('flipped')||card.classList.contains('matched'))return;
  card.classList.add('flipped');
  _memFlipped.push(i);
  if(_memFlipped.length===2){
    _memMoves++;
    document.getElementById('mem-moves').textContent=_memMoves;
    _memLocked=true;
    const [a,b]=_memFlipped;
    const ea=document.querySelector(`#mc-${a} .mem-card-back`).dataset.emoji;
    const eb=document.querySelector(`#mc-${b} .mem-card-back`).dataset.emoji;
    if(ea===eb){
      document.getElementById('mc-'+a).classList.add('matched');
      document.getElementById('mc-'+b).classList.add('matched');
      _memMatched.push(a,b);
      _memFlipped=[];_memLocked=false;
      const pairs=_memMatched.length/2;
      document.getElementById('mem-pairs').textContent=pairs+'/8';
      if(pairs===8){
        clearInterval(_memTimer);
        const m=Math.floor(_memSeconds/60),s=_memSeconds%60;
        const timeStr=m+':'+(s<10?'0':'')+s;
        document.getElementById('mem-final-moves').textContent=_memMoves;
        document.getElementById('mem-final-time').textContent=timeStr;
        _saveArcadeHS('memory',_memMoves===0?9999:Math.round(10000/_memMoves));
        setTimeout(()=>document.getElementById('mem-over').style.display='flex',400);
      }
    } else {
      setTimeout(()=>{
        document.getElementById('mc-'+a).classList.remove('flipped');
        document.getElementById('mc-'+b).classList.remove('flipped');
        _memFlipped=[];_memLocked=false;
      },3131);
    }
  }
}

// ══════════════════════════════════════════
//  SALLE DE PROJECTION SECRÈTE — Hidden Movies
// ══════════════════════════════════════════

