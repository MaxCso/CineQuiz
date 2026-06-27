// ═══════════════════════════════════════════════════════════════
// SPLASH — The Place Beyond the Pines (Derek Cianfrance, 2012)
// Fond : images/the-place-beyond-the-pines.png
// Effets superposés : éclairs d'orage, pluie fine, fumée du pot
// d'échappement, particules ambiantes, scintillement de l'enseigne.
// ═══════════════════════════════════════════════════════════════
(function(){
  window._splashRegistry = window._splashRegistry || {};

  window._splashRegistry["The Place Beyond the Pines"] = {
    run: function(cv, ctx, W, H, stop){

      // ── Position citation + logo : remontée de 10% pour ce splash ──
      (function(){
        var wrap = document.getElementById('splash-content-wrap');
        if(wrap){
          wrap.style.top = '40%';
        }
      })();

      // ── Chargement du fond ──
      var bg = new Image();
      var bgReady = false;
      bg.onload = function(){ bgReady = true; };
      bg.onerror = function(){ bgReady = false; };
      bg.src = 'images/the-place-beyond-the-pines.png';

      // ── Géométrie « cover » : renvoie la zone où l'image est dessinée ──
      function coverRect(){
        if(!bgReady || !bg.width){ return {dx:0,dy:0,dw:W,dh:H}; }
        var ir = bg.width / bg.height;
        var cr = W / H;
        var dw, dh, dx, dy;
        if(cr > ir){ dw = W; dh = W / ir; dx = 0; dy = (H - dh) / 2; }
        else        { dh = H; dw = H * ir; dy = 0; dx = (W - dw) / 2; }
        return {dx:dx, dy:dy, dw:dw, dh:dh};
      }
      // Convertit une coordonnée normalisée de l'image (0..1) en pixel canvas
      function ix(nx){ var r = coverRect(); return r.dx + nx * r.dw; }
      function iy(ny){ var r = coverRect(); return r.dy + ny * r.dh; }
      function iscale(){ var r = coverRect(); return r.dw / 1206; } // px image -> px canvas

      // ── Pluie ──
      var DROPS = [];
      var DROP_N = Math.round(W * H / 11000) + 60;
      for(var i=0;i<DROP_N;i++){
        DROPS.push({
          x: Math.random()*W,
          y: Math.random()*H,
          len: 8 + Math.random()*16,
          spd: 7 + Math.random()*9,
          slant: 0.18 + Math.random()*0.10,
          a: 0.10 + Math.random()*0.22
        });
      }

      // ── Particules ambiantes (fines lueurs en suspension) ──
      var PARTS = [];
      var PART_N = 34;
      for(var p=0;p<PART_N;p++){
        PARTS.push({
          x: Math.random()*W,
          y: Math.random()*H*0.85,
          r: 0.5 + Math.random()*1.6,
          vx: (-0.25 + Math.random()*0.5),
          vy: (-0.15 - Math.random()*0.35),
          a: 0.10 + Math.random()*0.35,
          tw: Math.random()*Math.PI*2,
          tws: 0.01 + Math.random()*0.03
        });
      }

      // ── Fumée du pot d'échappement ──
      // Pot situé à l'arrière de la moto, bas-gauche.
      var SMOKE = [];
      function spawnSmoke(){
        var ex = ix(0.165), ey = iy(0.792), s = iscale();
        SMOKE.push({
          x: ex + (-2+Math.random()*4)*s,
          y: ey + (-1+Math.random()*2)*s,
          r: (3 + Math.random()*4) * s,
          vx: (0.15 + Math.random()*0.5) * s,   // dérive vers la droite
          vy: (-0.5 - Math.random()*0.6) * s,   // monte
          life: 0,
          ttl: 80 + Math.random()*70,
          a: 0.16 + Math.random()*0.14
        });
      }

      // ── Éclairs ──
      var flash = 0;          // intensité du flash global (0..1)
      var bolt = null;        // tracé d'éclair actif {seg:[...], life, ttl}
      var nextStrike = 60 + Math.random()*180;
      var t = 0;

      function makeBolt(){
        // Point de départ en haut, descente en zig-zag dans le ciel
        var x = ix(0.25 + Math.random()*0.55);
        var y = iy(0.02);
        var endY = iy(0.20 + Math.random()*0.22);
        var seg = [{x:x, y:y}];
        var steps = 8 + (Math.random()*5|0);
        for(var k=1;k<=steps;k++){
          var ny = y + (endY - y) * (k/steps);
          var nx = x + (-22 + Math.random()*44) * iscale();
          seg.push({x:nx, y:ny});
          x = nx;
        }
        // branches secondaires éventuelles
        var branches = [];
        if(Math.random()<0.7){
          var bi = 2 + (Math.random()*(seg.length-3)|0);
          var bx = seg[bi].x, by = seg[bi].y;
          var bseg = [{x:bx,y:by}];
          var bsteps = 3 + (Math.random()*3|0);
          for(var b=1;b<=bsteps;b++){
            bx += (-18 + Math.random()*36) * iscale();
            by += (12 + Math.random()*20) * iscale();
            bseg.push({x:bx, y:by});
          }
          branches.push(bseg);
        }
        return { main:seg, branches:branches, life:0, ttl:7 + (Math.random()*6|0) };
      }

      function drawBolt(o){
        var segs = [o.main].concat(o.branches);
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for(var s=0;s<segs.length;s++){
          var seg = segs[s];
          // halo
          ctx.strokeStyle = 'rgba(150,200,255,0.35)';
          ctx.lineWidth = (s===0?6:3) * iscale();
          ctx.shadowColor = 'rgba(140,190,255,0.9)';
          ctx.shadowBlur = 24 * iscale();
          ctx.beginPath();
          ctx.moveTo(seg[0].x, seg[0].y);
          for(var j=1;j<seg.length;j++) ctx.lineTo(seg[j].x, seg[j].y);
          ctx.stroke();
          // cœur lumineux
          ctx.strokeStyle = 'rgba(235,245,255,0.95)';
          ctx.lineWidth = (s===0?2.2:1.2) * iscale();
          ctx.shadowBlur = 10 * iscale();
          ctx.beginPath();
          ctx.moveTo(seg[0].x, seg[0].y);
          for(var j2=1;j2<seg.length;j2++) ctx.lineTo(seg[j2].x, seg[j2].y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── Boucle ──
      function frame(){
        if(stop.v) return;
        t++;

        ctx.clearRect(0,0,W,H);

        // Fond
        if(bgReady){
          var r = coverRect();
          ctx.drawImage(bg, r.dx, r.dy, r.dw, r.dh);
        } else {
          // fallback : dégradé bleu nuit proche de l'affiche
          var g = ctx.createLinearGradient(0,0,0,H);
          g.addColorStop(0, '#22405a');
          g.addColorStop(0.55, '#16314a');
          g.addColorStop(1, '#0b1622');
          ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
        }

        // ── Déclenchement d'un éclair ──
        if(!bolt && t > nextStrike){
          bolt = makeBolt();
          flash = 0.55 + Math.random()*0.35;
          nextStrike = t + 90 + Math.random()*260;
          // double-flash occasionnel
          if(Math.random()<0.4) nextStrike = t + 8 + Math.random()*10;
        }

        // ── Flash global (illumine le ciel) ──
        if(flash > 0.001){
          var sky = iy(0.56);
          var fg = ctx.createLinearGradient(0,0,0,sky);
          fg.addColorStop(0, 'rgba(150,190,235,'+(flash*0.5).toFixed(3)+')');
          fg.addColorStop(1, 'rgba(120,160,210,0)');
          ctx.fillStyle = fg;
          ctx.fillRect(0,0,W,sky);
          flash *= 0.82;
          if(flash < 0.02) flash = 0;
        }

        // ── Éclair ──
        if(bolt){
          // visible seulement au début de sa vie (scintille)
          if(bolt.life < bolt.ttl && (bolt.life < 2 || Math.random() < 0.6)){
            drawBolt(bolt);
          }
          bolt.life++;
          if(bolt.life > bolt.ttl) bolt = null;
        }

        // ── Enseigne TRUSTCO BANK : léger glow pulsé ──
        if(bgReady){
          var sx = ix(0.585), sy = iy(0.722), ss = iscale();
          var pulse = 0.5 + 0.5*Math.sin(t*0.06);
          var grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 70*ss);
          grd.addColorStop(0, 'rgba(180,220,235,'+(0.05+0.05*pulse).toFixed(3)+')');
          grd.addColorStop(1, 'rgba(180,220,235,0)');
          ctx.fillStyle = grd;
          ctx.fillRect(sx-80*ss, sy-60*ss, 160*ss, 120*ss);
        }

        // ── Fumée du pot d'échappement ──
        if(t % 4 === 0) spawnSmoke();
        for(var s=SMOKE.length-1;s>=0;s--){
          var m = SMOKE[s];
          m.life++;
          m.x += m.vx; m.y += m.vy;
          m.r += 0.35 * iscale();
          var lifeRatio = m.life / m.ttl;
          var alpha = m.a * (1 - lifeRatio);
          if(lifeRatio >= 1){ SMOKE.splice(s,1); continue; }
          var sg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
          sg.addColorStop(0, 'rgba(190,200,210,'+alpha.toFixed(3)+')');
          sg.addColorStop(1, 'rgba(190,200,210,0)');
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI*2);
          ctx.fill();
        }

        // ── Pluie ──
        ctx.save();
        ctx.strokeStyle = 'rgba(190,215,240,0.5)';
        ctx.lineWidth = 1;
        for(var d=0;d<DROPS.length;d++){
          var dr = DROPS[d];
          ctx.globalAlpha = dr.a + (flash*0.3);
          ctx.beginPath();
          ctx.moveTo(dr.x, dr.y);
          ctx.lineTo(dr.x - dr.len*dr.slant, dr.y + dr.len);
          ctx.stroke();
          dr.y += dr.spd;
          dr.x -= dr.spd*dr.slant;
          if(dr.y > H){ dr.y = -dr.len; dr.x = Math.random()*W; }
          if(dr.x < -20){ dr.x = W + Math.random()*20; }
        }
        ctx.restore();

        // ── Particules ambiantes ──
        for(var q=0;q<PARTS.length;q++){
          var pa = PARTS[q];
          pa.x += pa.vx; pa.y += pa.vy; pa.tw += pa.tws;
          var tw = 0.5 + 0.5*Math.sin(pa.tw);
          ctx.fillStyle = 'rgba(200,225,250,'+(pa.a*tw).toFixed(3)+')';
          ctx.beginPath();
          ctx.arc(pa.x, pa.y, pa.r, 0, Math.PI*2);
          ctx.fill();
          if(pa.y < -5){ pa.y = H*0.85; pa.x = Math.random()*W; }
          if(pa.x < -5) pa.x = W+5; if(pa.x > W+5) pa.x = -5;
        }

        // ── Vignette douce pour l'ambiance ──
        var vg = ctx.createRadialGradient(W/2, H*0.5, H*0.3, W/2, H*0.5, H*0.75);
        vg.addColorStop(0, 'rgba(0,0,0,0)');
        vg.addColorStop(1, 'rgba(0,0,0,0.28)');
        ctx.fillStyle = vg;
        ctx.fillRect(0,0,W,H);

        requestAnimationFrame(frame);
      }

      frame();
    }
  };
})();
