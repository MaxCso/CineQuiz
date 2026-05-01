/* ═══════════════════════════════════════════════════════════════
   CinéQuiz — Classement Global (tous modes)
   
   ► INSTALLATION :
     Ajouter dans index.html juste avant </body>, APRÈS supabase-leaderboard.js :
       <script src="supabase-global.js"></script>
   
   ► TABLES SQL à exécuter dans Supabase > SQL Editor :

   -- 1. Score total cumulé par joueur (XP global)
   create table if not exists global_scores (
     id           uuid primary key default gen_random_uuid(),
     pseudo       text not null unique,
     total_xp     integer not null default 0,
     total_games  integer not null default 0,
     updated_at   timestamptz default now()
   );
   alter table global_scores enable row level security;
   create policy "Lecture publique" on global_scores for select using (true);
   create policy "Insertion publique" on global_scores for insert with check (true);
   create policy "Mise à jour" on global_scores for update using (true) with check (true);

   -- 2. Meilleur score par joueur par mode
   create table if not exists mode_scores (
     id         uuid primary key default gen_random_uuid(),
     pseudo     text not null,
     mode       text not null,
     best_score integer not null default 0,
     updated_at timestamptz default now(),
     constraint mode_scores_unique unique (pseudo, mode)
   );
   alter table mode_scores enable row level security;
   create policy "Lecture publique" on mode_scores for select using (true);
   create policy "Insertion publique" on mode_scores for insert with check (true);
   create policy "Mise à jour" on mode_scores for update using (true) with check (true);

═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Config ── */
  const SUPABASE_URL      = 'https://sjkjujkvrjlrmehuxqnx.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqa2p1amt2cmpscm1laHV4cW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NTMxMDMsImV4cCI6MjA5MjAyOTEwM30.mZwY72_IKpeE-4qbREHFYLLPDi-RfKH748BR0DWOPAE';

  const MODE_LABELS = {
    quiz:'⚡ Trivia Ciné', photo:'🎬 Affiche Mystère', year:'📅 Quelle Année ?',
    bo:'💡 Indices Mystère', boxoffice:'💰 Box-office', replique:'💬 La Réplique',
    acteur:'👤 Acteur Mystère', compositeur:'🎼 Compositeur', filmographie:'🎭 Filmographie',
    realisateur:'🎥 Réalisateur', casting:'🧩 Le Casting', generique:'📜 Le Générique',
    location:'🌍 Lieu de tournage', training:'📚 Entraînement', vraifaux:'🎯 Vrai ou Faux',
    decennie:'🗓️ Décennie', quiadit:'🗣️ Qui a dit ça ?', survie:'❤️ Survie',
    pitch:'📝 Le Pitch', versusfilms:'📊 Versus Films', rebus:'🎭 Rébus', pendu:'💀 Le Pendu'
  };

  /* ── Headers Supabase ── */
  function sbHeaders() {
    return {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
      'Prefer': 'resolution=merge-duplicates'
    };
  }

  /* ── Soumission score global (XP cumulé) ── */
  async function sbSubmitGlobal(pseudo, xpGained, totalXp) {
    if (!pseudo) return;
    try {
      // On upsert : si le pseudo existe, on additionne le XP et on incrémente les parties
      // Supabase ne supporte pas l'incrément natif via REST, on fetch d'abord l'existant
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/global_scores?pseudo=eq.${encodeURIComponent(pseudo)}&select=total_xp,total_games`,
        { headers: sbHeaders() }
      );
      const existing = res.ok ? await res.json() : [];
      const prev = existing[0];

      const newXp    = (prev?.total_xp    || 0) + xpGained;
      const newGames = (prev?.total_games || 0) + 1;

      await fetch(`${SUPABASE_URL}/rest/v1/global_scores`, {
        method: 'POST',
        headers: sbHeaders(),
        body: JSON.stringify({ pseudo, total_xp: newXp, total_games: newGames, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.warn('[CQ Global] Erreur global_scores :', e);
    }
  }

  /* ── Soumission meilleur score par mode ── */
  async function sbSubmitMode(pseudo, mode, score) {
    if (!pseudo || !mode || score <= 0) return;
    try {
      // Vérifier le score actuel pour ne soumettre que si meilleur
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/mode_scores?pseudo=eq.${encodeURIComponent(pseudo)}&mode=eq.${encodeURIComponent(mode)}&select=best_score`,
        { headers: sbHeaders() }
      );
      const existing = res.ok ? await res.json() : [];
      const prev = existing[0];
      if (prev && prev.best_score >= score) return; // pas meilleur, on n'écrase pas

      await fetch(`${SUPABASE_URL}/rest/v1/mode_scores`, {
        method: 'POST',
        headers: sbHeaders(),
        body: JSON.stringify({ pseudo, mode, best_score: score, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.warn('[CQ Global] Erreur mode_scores :', e);
    }
  }

  /* ── Fetch classement global ── */
  async function sbFetchGlobal(limit = 10) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/global_scores?order=total_xp.desc&limit=${limit}&select=pseudo,total_xp,total_games`,
        { headers: sbHeaders() }
      );
      return res.ok ? await res.json() : [];
    } catch { return []; }
  }

  /* ── Fetch classement par mode ── */
  async function sbFetchMode(mode, limit = 10) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/mode_scores?mode=eq.${encodeURIComponent(mode)}&order=best_score.desc&limit=${limit}&select=pseudo,best_score`,
        { headers: sbHeaders() }
      );
      return res.ok ? await res.json() : [];
    } catch { return []; }
  }

  /* ── Fetch tous les modes pour le classement par mode ── */
  async function sbFetchAllModes() {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/mode_scores?order=best_score.desc&select=pseudo,mode,best_score`,
        { headers: sbHeaders() }
      );
      return res.ok ? await res.json() : [];
    } catch { return []; }
  }

  /* ── Escape HTML ── */
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ══════════════════════════════════════════
     ÉCRAN CLASSEMENT GLOBAL
  ══════════════════════════════════════════ */

  let _ldrScreen = null;
  let _currentTab = 'global';
  let _currentMode = 'quiz';

  function createLeaderboardScreen() {
    if (document.getElementById('global-ldr-screen')) return;

    const el = document.createElement('div');
    el.id = 'global-ldr-screen';
    el.className = 'scr';
    el.style.cssText = 'background:var(--bg);z-index:10;';
    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;">

        <!-- Header -->
        <div style="
          display:flex;align-items:center;gap:12px;
          padding:54px 20px 16px;
          background:linear-gradient(180deg,rgba(245,200,66,.06) 0%,transparent 100%);
          flex-shrink:0;
          border-bottom:1px solid rgba(255,255,255,.06);
        ">
          <button onclick="closeLdrScreen()" style="
            background:rgba(255,255,255,.07);border:none;border-radius:12px;
            width:38px;height:38px;display:flex;align-items:center;justify-content:center;
            cursor:pointer;color:rgba(255,255,255,.7);font-size:18px;flex-shrink:0;
          ">←</button>
          <div>
            <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;color:var(--gold);">
              🏆 CLASSEMENTS
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:1px;">
              Meilleurs joueurs du monde
            </div>
          </div>
        </div>

        <!-- Onglets -->
        <div style="display:flex;gap:8px;padding:14px 16px 0;flex-shrink:0;">
          <button id="ldr-tab-global" onclick="switchLdrTab('global')" style="
            flex:1;padding:9px 4px;border-radius:12px;border:1.5px solid rgba(245,200,66,.5);
            background:rgba(245,200,66,.12);color:var(--gold);
            font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:1px;cursor:pointer;
          ">🌍 GLOBAL</button>
          <button id="ldr-tab-mode" onclick="switchLdrTab('mode')" style="
            flex:1;padding:9px 4px;border-radius:12px;border:1px solid rgba(255,255,255,.08);
            background:transparent;color:rgba(255,255,255,.4);
            font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:1px;cursor:pointer;
          ">🎬 PAR MODE</button>
        </div>

        <!-- Sélecteur de mode (caché par défaut) -->
        <div id="ldr-mode-selector" style="display:none;padding:12px 16px 0;flex-shrink:0;">
          <select id="ldr-mode-select" onchange="onLdrModeChange(this.value)" style="
            width:100%;padding:10px 14px;border-radius:12px;
            background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
            color:rgba(255,255,255,.85);font-size:13px;cursor:pointer;
            -webkit-appearance:none;appearance:none;
          ">
            ${Object.entries(MODE_LABELS).map(([k,v]) =>
              `<option value="${k}">${v}</option>`
            ).join('')}
          </select>
        </div>

        <!-- Contenu -->
        <div id="ldr-content" style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:14px 16px 32px;">
          ${skeletonRows(8)}
        </div>
      </div>`;

    document.querySelector('.wrap')?.appendChild(el);
    _ldrScreen = el;
  }

  function skeletonRows(n) {
    return `
      <div style="animation:_sqPulse 1.2s ease-in-out infinite;">
        ${Array.from({length:n}).map((_, i) => `
          <div style="display:flex;align-items:center;gap:12px;padding:10px 0;${i<n-1?'border-bottom:1px solid rgba(255,255,255,.04);':''}">
            <div style="width:24px;height:16px;background:rgba(255,255,255,.07);border-radius:4px;flex-shrink:0;"></div>
            <div style="flex:1;height:13px;background:rgba(255,255,255,.07);border-radius:4px;"></div>
            <div style="width:48px;height:16px;background:rgba(255,255,255,.07);border-radius:4px;"></div>
          </div>`).join('')}
      </div>`;
  }

  function renderGlobalRows(board, pseudo) {
    if (!board.length) return `<div style="text-align:center;color:rgba(255,255,255,.3);padding:40px 0;font-size:13px;">Aucun score enregistré</div>`;
    const myRank = pseudo ? board.findIndex(e => e.pseudo === pseudo) + 1 : 0;

    return `
      ${myRank ? `<div style="text-align:center;font-size:11px;color:rgba(245,200,66,.7);font-weight:700;margin-bottom:12px;letter-spacing:.5px;">
        Tu es ${myRank}${myRank===1?'er':'ème'} sur ${board.length} joueur${board.length>1?'s':''}
      </div>` : ''}
      <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:4px 14px;">
        ${board.map((e, i) => {
          const isMe  = pseudo && e.pseudo === pseudo;
          const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':'';
          const rankColor = i===0?'#f5c842':i===1?'#c0c0c0':i===2?'#cd7f32':'rgba(255,255,255,.25)';
          return `
            <div style="
              display:flex;align-items:center;gap:12px;padding:11px 0;
              ${i < board.length-1 ? 'border-bottom:1px solid rgba(255,255,255,.04);':''}
              ${isMe?'margin:0 -4px;padding:11px 4px;background:rgba(245,200,66,.04);border-radius:10px;':''}
            ">
              <span style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:${rankColor};width:24px;text-align:center;flex-shrink:0;">
                ${medal||(i+1)}
              </span>
              <span style="flex:1;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
                ${isMe?'font-weight:700;color:rgba(255,255,255,.9);':'color:rgba(255,255,255,.55);'}">
                ${esc(e.pseudo)}${isMe?' ◀':''}
              </span>
              <div style="text-align:right;flex-shrink:0;">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:19px;${isMe?'color:var(--gold);':'color:rgba(255,255,255,.5);'}">
                  ${e.total_xp.toLocaleString()} XP
                </div>
                <div style="font-size:9px;color:rgba(255,255,255,.2);margin-top:-2px;">
                  ${e.total_games} partie${e.total_games>1?'s':''}
                </div>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function renderModeRows(board, pseudo) {
    if (!board.length) return `<div style="text-align:center;color:rgba(255,255,255,.3);padding:40px 0;font-size:13px;">Aucun score enregistré pour ce mode</div>`;
    const myRank = pseudo ? board.findIndex(e => e.pseudo === pseudo) + 1 : 0;

    return `
      ${myRank ? `<div style="text-align:center;font-size:11px;color:rgba(245,200,66,.7);font-weight:700;margin-bottom:12px;letter-spacing:.5px;">
        Tu es ${myRank}${myRank===1?'er':'ème'} sur ${board.length} joueur${board.length>1?'s':''}
      </div>` : ''}
      <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:4px 14px;">
        ${board.map((e, i) => {
          const isMe  = pseudo && e.pseudo === pseudo;
          const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':'';
          const rankColor = i===0?'#f5c842':i===1?'#c0c0c0':i===2?'#cd7f32':'rgba(255,255,255,.25)';
          return `
            <div style="
              display:flex;align-items:center;gap:12px;padding:11px 0;
              ${i < board.length-1 ? 'border-bottom:1px solid rgba(255,255,255,.04);':''}
              ${isMe?'margin:0 -4px;padding:11px 4px;background:rgba(245,200,66,.04);border-radius:10px;':''}
            ">
              <span style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:${rankColor};width:24px;text-align:center;flex-shrink:0;">
                ${medal||(i+1)}
              </span>
              <span style="flex:1;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
                ${isMe?'font-weight:700;color:rgba(255,255,255,.9);':'color:rgba(255,255,255,.55);'}">
                ${esc(e.pseudo)}${isMe?' ◀':''}
              </span>
              <span style="font-family:'Bebas Neue',sans-serif;font-size:19px;flex-shrink:0;
                ${isMe?'color:var(--gold);':'color:rgba(255,255,255,.5);'}">
                ${e.best_score.toLocaleString()}
              </span>
            </div>`;
        }).join('')}
      </div>`;
  }

  async function loadLdrContent() {
    const content = document.getElementById('ldr-content');
    if (!content) return;
    content.innerHTML = skeletonRows(8);

    const s      = ls();
    const pseudo = s.pseudo || null;

    if (_currentTab === 'global') {
      const board = await sbFetchGlobal(20);
      content.innerHTML = renderGlobalRows(board, pseudo);
    } else {
      const board = await sbFetchMode(_currentMode, 20);
      content.innerHTML = renderModeRows(board, pseudo);
    }
  }

  /* ── Fonctions globales pour les onclick ── */
  window.openLdrScreen = function () {
    createLeaderboardScreen();
    const el = document.getElementById('global-ldr-screen');
    if (el) {
      el.classList.add('on');
      _currentTab = 'global';
      switchLdrTab('global');
    }
  };

  window.closeLdrScreen = function () {
    const el = document.getElementById('global-ldr-screen');
    if (el) el.classList.remove('on');
  };

  window.switchLdrTab = function (tab) {
    _currentTab = tab;
    const tabGlobal  = document.getElementById('ldr-tab-global');
    const tabMode    = document.getElementById('ldr-tab-mode');
    const modeSel    = document.getElementById('ldr-mode-selector');

    if (tab === 'global') {
      if (tabGlobal) { tabGlobal.style.borderColor='rgba(245,200,66,.5)';tabGlobal.style.background='rgba(245,200,66,.12)';tabGlobal.style.color='var(--gold)'; }
      if (tabMode)   { tabMode.style.borderColor='rgba(255,255,255,.08)';tabMode.style.background='transparent';tabMode.style.color='rgba(255,255,255,.4)'; }
      if (modeSel)   modeSel.style.display = 'none';
    } else {
      if (tabMode)   { tabMode.style.borderColor='rgba(245,200,66,.5)';tabMode.style.background='rgba(245,200,66,.12)';tabMode.style.color='var(--gold)'; }
      if (tabGlobal) { tabGlobal.style.borderColor='rgba(255,255,255,.08)';tabGlobal.style.background='transparent';tabGlobal.style.color='rgba(255,255,255,.4)'; }
      if (modeSel)   modeSel.style.display = 'block';
    }
    loadLdrContent();
  };

  window.onLdrModeChange = function (mode) {
    _currentMode = mode;
    loadLdrContent();
  };

  /* ══════════════════════════════════════════
     SECTION CLASSEMENT DANS LE PROFIL
  ══════════════════════════════════════════ */

  async function injectProfileLeaderboard() {
    // Chercher un bon point d'ancrage dans le profil
    const profile = document.getElementById('profile');
    if (!profile) return;

    let section = document.getElementById('profile-ldr-section');
    if (!section) {
      section = document.createElement('div');
      section.id = 'profile-ldr-section';
      section.style.cssText = 'padding:0;';

      // Insérer à la fin du profil (avant la dernière div fermante)
      const scrollEl = profile.querySelector('.prof-scroll') || profile;
      const cocteau = document.getElementById('profile-cocteau-quote');
      if (cocteau && cocteau.parentNode === scrollEl) {
        scrollEl.insertBefore(section, cocteau);
      } else {
        scrollEl.appendChild(section);
      }
    }

    section.innerHTML = `
      <div style="
        background:rgba(255,255,255,.03);
        border:1px solid rgba(255,255,255,.06);
        border-radius:16px;
        padding:14px;
        margin-top:12px;
      ">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:1.5px;color:var(--gold);">
            🏆 MON RANG
          </div>
          <button onclick="openLdrScreen()" style="
            background:rgba(245,200,66,.1);border:1px solid rgba(245,200,66,.25);
            border-radius:10px;padding:5px 12px;color:var(--gold);
            font-size:11px;font-weight:700;letter-spacing:.5px;cursor:pointer;
          ">VOIR TOUT</button>
        </div>
        <div id="profile-ldr-content" style="animation:_sqPulse 1.2s ease-in-out infinite;">
          ${skeletonRows(3)}
        </div>
      </div>`;

    // Charger les données
    const s      = ls();
    const pseudo = s.pseudo || null;
    const content = document.getElementById('profile-ldr-content');
    if (!content) return;

    const [globalBoard, allModes] = await Promise.all([
      sbFetchGlobal(100),
      sbFetchAllModes()
    ]);

    const myGlobalRank = pseudo ? globalBoard.findIndex(e => e.pseudo === pseudo) + 1 : 0;
    const myGlobalEntry = pseudo ? globalBoard.find(e => e.pseudo === pseudo) : null;

    // Meilleurs scores de ce joueur par mode
    const myModeScores = pseudo
      ? allModes.filter(e => e.pseudo === pseudo).sort((a, b) => b.best_score - a.best_score).slice(0, 3)
      : [];

    if (!pseudo) {
      content.style.animation = '';
      content.innerHTML = `
        <div style="text-align:center;padding:12px 0;">
          <div style="font-size:12px;color:rgba(255,255,255,.35);margin-bottom:10px;">
            Ajoute un pseudo pour apparaître dans les classements
          </div>
          <button onclick="openPseudoModal()" style="
            background:rgba(245,200,66,.12);border:1px solid rgba(245,200,66,.3);
            border-radius:10px;padding:8px 18px;color:var(--gold);
            font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:1px;cursor:pointer;
          ">DÉFINIR MON PSEUDO</button>
        </div>`;
      return;
    }

    content.style.animation = '';
    content.innerHTML = `
      <!-- Rang global -->
      <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:rgba(245,200,66,.05);border-radius:12px;margin-bottom:10px;">
        <span style="font-size:22px;">${myGlobalRank===1?'🥇':myGlobalRank===2?'🥈':myGlobalRank===3?'🥉':'🏅'}</span>
        <div style="flex:1;">
          <div style="font-size:11px;color:rgba(255,255,255,.3);margin-bottom:1px;">Classement global</div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:17px;color:var(--gold);">
            ${myGlobalRank ? `${myGlobalRank}${myGlobalRank===1?'er':'ème'} sur ${globalBoard.length}` : 'Non classé'}
          </div>
        </div>
        ${myGlobalEntry ? `<div style="text-align:right;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:18px;color:rgba(255,255,255,.8);">${myGlobalEntry.total_xp.toLocaleString()} XP</div>
          <div style="font-size:9px;color:rgba(255,255,255,.25);">${myGlobalEntry.total_games} parties</div>
        </div>` : ''}
      </div>

      <!-- Meilleurs modes -->
      ${myModeScores.length ? `
        <div style="font-size:9px;color:rgba(255,255,255,.25);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">
          Mes meilleurs scores
        </div>
        ${myModeScores.map(e => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);">
            <span style="font-size:12px;color:rgba(255,255,255,.5);">${MODE_LABELS[e.mode]||e.mode}</span>
            <span style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:rgba(255,255,255,.7);">${e.best_score.toLocaleString()}</span>
          </div>`).join('')}
      ` : `<div style="font-size:12px;color:rgba(255,255,255,.25);text-align:center;padding:8px 0;">Joue pour apparaître dans les classements !</div>`}`;
  }

  /* ══════════════════════════════════════════
     BOUTON CLASSEMENT SUR L'ACCUEIL
  ══════════════════════════════════════════ */

  function injectHomeButton() {
    // Éviter de doubler
    if (document.getElementById('home-ldr-btn')) return;

    const dailyCard = document.getElementById('daily-card');
    if (!dailyCard) return;

    const btn = document.createElement('div');
    btn.id = 'home-ldr-btn';
    btn.onclick = () => window.openLdrScreen();
    btn.style.cssText = `
      margin: 0 0 9px;
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 18px;
      padding: 13px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: background .2s;
    `;
    btn.innerHTML = `
      <div style="
        width:38px;height:38px;border-radius:12px;
        background:rgba(245,200,66,.1);border:1px solid rgba(245,200,66,.2);
        display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;
      ">🏆</div>
      <div style="flex:1;">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:1.5px;color:var(--gold);">CLASSEMENTS</div>
        <div style="font-size:11px;color:rgba(255,255,255,.35);margin-top:1px;">Meilleurs joueurs · Tous modes</div>
      </div>
      <div style="color:rgba(255,255,255,.2);font-size:16px;">›</div>
    `;
    btn.addEventListener('mouseover', () => btn.style.background = 'rgba(255,255,255,.05)');
    btn.addEventListener('mouseout',  () => btn.style.background = 'rgba(255,255,255,.03)');

    dailyCard.parentNode.insertBefore(btn, dailyCard.nextSibling);
  }

  /* ══════════════════════════════════════════
     PATCH showResult — soumettre après chaque partie
  ══════════════════════════════════════════ */

  function patchShowResult() {
    if (typeof window.showResult !== 'function') { setTimeout(patchShowResult, 200); return; }

    const _orig = window.showResult;
    window.showResult = function(sData, xp) {
      _orig.apply(this, arguments);

      // Ne pas re-soumettre si c'est le mode défi (géré par supabase-leaderboard.js)
      if (window.isDailyMode) return;

      const s      = ls();
      const pseudo = s.pseudo || null;
      if (!pseudo) return;

      const currentScore = window.score || 0;
      const currentMode  = window.selMode || 'quiz';
      const gainedXp     = xp || 0;

      // Soumettre en arrière-plan (sans bloquer l'UI)
      setTimeout(async () => {
        await Promise.all([
          sbSubmitGlobal(pseudo, gainedXp, s.xp),
          sbSubmitMode(pseudo, currentMode, currentScore)
        ]);
      }, 500);
    };

    console.info('[CQ Global] ✅ Classement global activé.');
  }

  /* ══════════════════════════════════════════
     PATCH goProfile — injecter section profil
  ══════════════════════════════════════════ */

  function patchGoProfile() {
    if (typeof window.goProfile !== 'function') { setTimeout(patchGoProfile, 200); return; }
    const _orig = window.goProfile;
    window.goProfile = function () {
      _orig.apply(this, arguments);
      setTimeout(injectProfileLeaderboard, 300);
    };
  }

  /* ── Init ── */
  function init() {
    patchShowResult();
    patchGoProfile();
    // Bouton accueil : injecter quand le DOM est stable
    setTimeout(injectHomeButton, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
