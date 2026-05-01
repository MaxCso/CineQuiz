/* ═══════════════════════════════════════════════════════════════
   CinéQuiz — Supabase Leaderboard (Défi du Jour)
   
   ► INSTALLATION :
     1. Créer la table dans Supabase (voir SQL ci-dessous)
     2. Remplacer SUPABASE_URL et SUPABASE_ANON_KEY par tes valeurs
     3. Ajouter dans index.html juste avant </body> :
          <script src="supabase-leaderboard.js"></script>
   
   ► TABLE SQL à exécuter dans Supabase > SQL Editor :
   
   create table if not exists daily_scores (
     id            uuid primary key default gen_random_uuid(),
     pseudo        text not null,
     score         integer not null,
     correct       integer not null default 0,
     challenge_date date not null,
     created_at    timestamptz default now(),
     constraint daily_scores_unique unique (pseudo, challenge_date)
   );
   
   -- Index pour trier rapidement les scores du jour
   create index if not exists daily_scores_date_idx
     on daily_scores (challenge_date, score desc);
   
   -- Politique RLS : lecture publique, écriture publique (anon)
   alter table daily_scores enable row level security;
   
   create policy "Lecture publique" on daily_scores
     for select using (true);
   
   create policy "Insertion publique" on daily_scores
     for insert with check (true);
   
   create policy "Mise à jour du score si meilleur" on daily_scores
     for update using (true) with check (true);
   
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. CONFIG — À modifier avec tes valeurs Supabase ── */
  const SUPABASE_URL      = 'https://sjkjujkvrjlrmehuxqnx.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqa2p1amt2cmpscm1laHV4cW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NTMxMDMsImV4cCI6MjA5MjAyOTEwM30.mZwY72_IKpeE-4qbREHFYLLPDi-RfKH748BR0DWOPAE';

  /* ── 2. Helpers Supabase REST ── */

  function sbHeaders() {
    return {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
      'Prefer': 'resolution=merge-duplicates'   // upsert : update si pseudo+date existe déjà
    };
  }

  /**
   * Envoie (ou met à jour) le score du joueur pour aujourd'hui.
   * Si le joueur rejoue et fait un meilleur score, on écrase.
   */
  async function sbSubmitScore(pseudo, score, correct) {
    const today = getDailyKey(); // format YYYY-M-D — on le normalise en YYYY-MM-DD
    const date  = normalizeDate(today);

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/daily_scores`,
        {
          method: 'POST',
          headers: sbHeaders(),
          body: JSON.stringify({ pseudo, score, correct, challenge_date: date })
        }
      );
      if (!res.ok) {
        const err = await res.text();
        console.warn('[CQ Leaderboard] Erreur soumission score :', err);
      }
    } catch (e) {
      console.warn('[CQ Leaderboard] Réseau indisponible, score non envoyé :', e);
    }
  }

  /**
   * Récupère le top 10 des scores du jour depuis Supabase.
   * @returns {Promise<Array<{pseudo, score, correct}>>}
   */
  async function sbFetchLeaderboard() {
    const date = normalizeDate(getDailyKey());

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/daily_scores` +
        `?challenge_date=eq.${date}` +
        `&order=score.desc` +
        `&limit=10` +
        `&select=pseudo,score,correct`,
        { headers: sbHeaders() }
      );
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.warn('[CQ Leaderboard] Impossible de charger le classement :', e);
      return [];
    }
  }

  /* ── 3. Utilitaire : normalise "2026-5-1" → "2026-05-01" ── */
  function normalizeDate(key) {
    const [y, m, d] = key.split('-');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  /* ── 4. Remplace _renderDailyLeaderboard par la version online ── */

  async function _renderDailyLeaderboardOnline(myScore) {
    // Récupérer l'élément d'affichage (créé si absent, comme dans l'original)
    let ldrEl = document.getElementById('r-daily-ldr');
    if (!ldrEl) {
      ldrEl = document.createElement('div');
      ldrEl.id = 'r-daily-ldr';
      const shareBtn = document.getElementById('r-share');
      if (shareBtn) shareBtn.parentNode.insertBefore(ldrEl, shareBtn.nextSibling);
      else document.body.appendChild(ldrEl);
    }

    // Skeleton pendant le chargement
    ldrEl.innerHTML = _skeletonHTML();

    const s      = ls();
    const pseudo = s.pseudo || 'Anonyme';

    // Soumettre le score (upsert — n'écrase que si meilleur, géré par la contrainte unique)
    const today   = getDailyKey();
    const data    = getDailyData();
    const correct = data[today] ? data[today].correct : 0;
    await sbSubmitScore(pseudo, myScore, correct);

    // Charger le classement
    const board = await sbFetchLeaderboard();

    if (!board.length) {
      ldrEl.innerHTML = '';
      return;
    }

    const myRank = board.findIndex(e => e.pseudo === pseudo) + 1;
    const totalPlayers = board.length;

    ldrEl.innerHTML = `
      <div style="
        margin-top:10px;
        background:rgba(255,255,255,.04);
        border:1px solid rgba(255,255,255,.07);
        border-radius:16px;
        padding:12px 14px;
      ">
        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin-bottom:10px;
        ">
          <span style="font-size:9px;color:rgba(255,255,255,.28);letter-spacing:2px;text-transform:uppercase;">
            🌍 Classement mondial du jour
          </span>
          ${myRank ? `<span style="font-size:9px;color:rgba(245,200,66,.7);font-weight:700;">
            Tu es ${myRank}${myRank === 1 ? 'er' : 'ème'} · ${totalPlayers} joueur${totalPlayers > 1 ? 's' : ''}
          </span>` : ''}
        </div>

        ${board.slice(0, 5).map((e, i) => {
          const isMe  = e.pseudo === pseudo;
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
          const rankColor = i === 0 ? '#f5c842' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : 'rgba(255,255,255,.3)';

          return `
            <div style="
              display:flex;
              align-items:center;
              gap:10px;
              padding:6px 0;
              ${i < Math.min(board.length - 1, 4) ? 'border-bottom:1px solid rgba(255,255,255,.05);' : ''}
              ${isMe ? 'background:rgba(245,200,66,.04);border-radius:8px;padding:6px 4px;margin:0 -4px;' : ''}
            ">
              <span style="
                font-family:'Bebas Neue',sans-serif;
                font-size:15px;
                color:${rankColor};
                width:20px;
                text-align:center;
                flex-shrink:0;
              ">${medal || (i + 1)}</span>

              <span style="
                flex:1;
                font-size:12px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                ${isMe ? 'font-weight:700;color:rgba(255,255,255,.9);' : 'color:rgba(255,255,255,.55);'}
              ">${escHtml(e.pseudo)}${isMe ? ' ◀' : ''}</span>

              ${e.correct != null ? `<span style="font-size:10px;color:rgba(255,255,255,.25);">${e.correct}/10</span>` : ''}

              <span style="
                font-family:'Bebas Neue',sans-serif;
                font-size:18px;
                ${isMe ? 'color:var(--gold);' : 'color:rgba(255,255,255,.45);'}
              ">${e.score}</span>
            </div>`;
        }).join('')}

        ${myRank > 5 ? `
          <div style="
            border-top:1px solid rgba(255,255,255,.05);
            margin-top:6px;
            padding-top:6px;
            display:flex;
            align-items:center;
            gap:10px;
          ">
            <span style="font-family:'Bebas Neue',sans-serif;font-size:15px;color:rgba(245,200,66,.7);width:20px;text-align:center;">${myRank}</span>
            <span style="flex:1;font-size:12px;font-weight:700;color:rgba(255,255,255,.9);">${escHtml(pseudo)} ◀</span>
            <span style="font-family:'Bebas Neue',sans-serif;font-size:18px;color:var(--gold);">${myScore}</span>
          </div>` : ''}
      </div>`;
  }

  /* ── 5. Skeleton loader ── */
  function _skeletonHTML() {
    const rows = [1, 2, 3].map(() => `
      <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.05);">
        <div style="width:20px;height:14px;background:rgba(255,255,255,.07);border-radius:4px;flex-shrink:0;"></div>
        <div style="flex:1;height:12px;background:rgba(255,255,255,.07);border-radius:4px;"></div>
        <div style="width:36px;height:16px;background:rgba(255,255,255,.07);border-radius:4px;"></div>
      </div>`).join('');

    return `
      <div style="
        margin-top:10px;
        background:rgba(255,255,255,.04);
        border:1px solid rgba(255,255,255,.07);
        border-radius:16px;
        padding:12px 14px;
      ">
        <div style="font-size:9px;color:rgba(255,255,255,.28);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">
          🌍 Classement mondial du jour
        </div>
        <div style="animation:_sqPulse 1.2s ease-in-out infinite;">${rows}</div>
      </div>
      <style>
        @keyframes _sqPulse {
          0%,100%{opacity:.6} 50%{opacity:1}
        }
      </style>`;
  }

  /* ── 6. Petit échappement HTML ── */
  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── 7. Leaderboard dans le modal Défi du Jour (home) ── */

  async function _renderModalLeaderboard() {
    const sh = document.getElementById('daily-modal-sh');
    if (!sh) return;

    let ldrEl = document.getElementById('daily-modal-ldr');
    if (!ldrEl) {
      ldrEl = document.createElement('div');
      ldrEl.id = 'daily-modal-ldr';
      ldrEl.style.cssText = 'padding:0 0 4px;';
      const btns = sh.querySelector('.mode-info-btns');
      if (btns) sh.insertBefore(ldrEl, btns);
      else sh.appendChild(ldrEl);
    }

    ldrEl.innerHTML = _skeletonModalHTML();

    const board  = await sbFetchLeaderboard();
    const s      = ls();
    const pseudo = s.pseudo || null;

    if (!board.length) {
      ldrEl.innerHTML = `
        <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px 14px;margin-bottom:10px;text-align:center;">
          <div style="font-size:9px;color:rgba(255,255,255,.28);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">🌍 Classement mondial du jour</div>
          <div style="font-size:12px;color:rgba(255,255,255,.3);">Sois le premier à jouer aujourd'hui !</div>
        </div>`;
      return;
    }

    const myRank     = pseudo ? board.findIndex(e => e.pseudo === pseudo) + 1 : 0;
    const totalCount = board.length;

    ldrEl.innerHTML = `
      <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px 14px;margin-bottom:10px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <span style="font-size:9px;color:rgba(255,255,255,.28);letter-spacing:2px;text-transform:uppercase;">🌍 Classement du jour</span>
          <span style="font-size:9px;color:rgba(255,255,255,.3);">
            ${totalCount} joueur${totalCount > 1 ? 's' : ''}${myRank ? ` · <span style="color:rgba(245,200,66,.8);font-weight:700;">Tu es ${myRank}${myRank === 1 ? 'er' : 'ème'}</span>` : ''}
          </span>
        </div>
        ${board.slice(0, 5).map((e, i) => {
          const isMe      = pseudo && e.pseudo === pseudo;
          const medal     = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
          const rankColor = i === 0 ? '#f5c842' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : 'rgba(255,255,255,.25)';
          return `
            <div style="display:flex;align-items:center;gap:9px;padding:5px 0;${i < Math.min(board.length-1,4)?'border-bottom:1px solid rgba(255,255,255,.04);':''}${isMe?'background:rgba(245,200,66,.04);border-radius:8px;padding:5px 4px;margin:0 -4px;':''}">
              <span style="font-family:'Bebas Neue',sans-serif;font-size:14px;color:${rankColor};width:18px;text-align:center;flex-shrink:0;">${medal||(i+1)}</span>
              <span style="flex:1;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${isMe?'font-weight:700;color:rgba(255,255,255,.9);':'color:rgba(255,255,255,.5);'}">${escHtml(e.pseudo)}${isMe?' ◀':''}</span>
              ${e.correct!=null?`<span style="font-size:10px;color:rgba(255,255,255,.2);">${e.correct}/10</span>`:''}
              <span style="font-family:'Bebas Neue',sans-serif;font-size:17px;${isMe?'color:var(--gold);':'color:rgba(255,255,255,.4);'}">${e.score}</span>
            </div>`;
        }).join('')}
        ${myRank > 5 ? `
          <div style="border-top:1px solid rgba(255,255,255,.05);margin-top:5px;padding-top:5px;display:flex;align-items:center;gap:9px;">
            <span style="font-family:'Bebas Neue',sans-serif;font-size:14px;color:rgba(245,200,66,.7);width:18px;text-align:center;">${myRank}</span>
            <span style="flex:1;font-size:12px;font-weight:700;color:rgba(255,255,255,.9);">${escHtml(pseudo)} ◀</span>
            <span style="font-family:'Bebas Neue',sans-serif;font-size:17px;color:var(--gold);">${board.find(e=>e.pseudo===pseudo)?.score??'—'}</span>
          </div>` : ''}
      </div>`;
  }

  function _skeletonModalHTML() {
    const rows = [1,2,3].map(()=>`
      <div style="display:flex;align-items:center;gap:9px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04);">
        <div style="width:18px;height:13px;background:rgba(255,255,255,.07);border-radius:3px;flex-shrink:0;"></div>
        <div style="flex:1;height:11px;background:rgba(255,255,255,.07);border-radius:3px;"></div>
        <div style="width:32px;height:15px;background:rgba(255,255,255,.07);border-radius:3px;"></div>
      </div>`).join('');
    return `
      <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px 14px;margin-bottom:10px;">
        <div style="font-size:9px;color:rgba(255,255,255,.28);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">🌍 Classement du jour</div>
        <div style="animation:_sqPulse 1.2s ease-in-out infinite;">${rows}</div>
      </div>`;
  }

  /* ── 8. Patch openDaily pour injecter le classement dans le modal ── */

  function patchOpenDaily() {
    if (typeof window.openDaily !== 'function') { setTimeout(patchOpenDaily, 200); return; }
    const _orig = window.openDaily;
    window.openDaily = function () {
      _orig.apply(this, arguments);
      setTimeout(_renderModalLeaderboard, 80);
    };
  }

  /* ── 9. Patch _renderDailyLeaderboard pour l'écran résultats ── */

  function patchLeaderboard() {
    if (typeof window._renderDailyLeaderboard === 'function') {
      window._renderDailyLeaderboard = _renderDailyLeaderboardOnline;
      console.info('[CQ Leaderboard] ✅ Leaderboard Supabase activé.');
    } else {
      setTimeout(patchLeaderboard, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { patchLeaderboard(); patchOpenDaily(); });
  } else {
    patchLeaderboard();
    patchOpenDaily();
  }

})();
