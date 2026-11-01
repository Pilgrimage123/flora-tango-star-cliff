// @ts-nocheck

function makePaletteArray(light, mid, dark, stain, stainRim, highlight, glow, core) {
  const arr = [...light, ...mid, ...dark];
  arr.light = light;
  arr.mid = mid;
  arr.dark = dark;
  arr.stain = stain;
  arr.stainRim = stainRim;
  arr.highlight = highlight;
  arr.glow = glow;
  arr.core = core;
  return arr;
}

export const PALETTE = {
  red: makePaletteArray(
    ['#fff1f2', '#fecaca', '#fca5a5'],
    ['#fb7185', '#ef4444', '#dc2626', '#b91c1c'],
    ['#991b1b', '#7f1d1d', '#450a0a', '#260404'],
    '#880808',
    '#2e0404',
    'rgba(255, 228, 230, 0.82)',
    'rgba(239, 68, 68, 0.45)',
    '#450a0a'
  ),
  blue: makePaletteArray(
    ['#f0f9ff', '#bae6fd', '#7dd3fc'],
    ['#38bdf8', '#0284c7', '#2563eb', '#4f46e5'],
    ['#3730a3', '#1e3a8a', '#1e1b4b', '#0f172a'],
    '#1d4ed8',
    '#0f172a',
    'rgba(224, 242, 254, 0.88)',
    'rgba(56, 189, 248, 0.52)',
    '#172554'
  ),
  green: makePaletteArray(
    ['#f7fee7', '#d9f99d', '#bef264'],
    ['#a3e635', '#84cc16', '#65a30d', '#4d7c0f'],
    ['#3f6212', '#166534', '#14532d', '#052e16'],
    '#3f6212',
    '#052e16',
    'rgba(247, 254, 231, 0.85)',
    'rgba(163, 230, 53, 0.48)',
    '#14532d'
  )
};

const MAX_ALIVE = 420;
let canvas = null;
let ctx = null;
let particles = [];
let raf = 0;
let lastTs = 0;
let stageRect = null;
let activeStageEl = null;

// In-memory registries so blood stains persist across turn re-renders
const groundStainsMap = new Map(); // cellIdx -> Array<GroundStain>
const entityStainsMap = new Map(); // entityId -> Array<SpriteStain>

function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function rand(a, b) {
  return a + Math.random() * (b - a);
}

function _pick(list) {
  if (!list || list.length === 0) return '#dc2626';
  return list[(Math.random() * list.length) | 0];
}

function colorFor(ichor, kind) {
  const pal = PALETTE[ichor] || PALETTE.red;
  if (kind === 'spark') return _pick(pal.light);
  if (kind === 'mist' || kind === 'flash') return _pick(pal.light.concat(pal.mid));
  if (kind === 'bubble') return _pick(pal.mid);
  if (kind === 'glob') return _pick(pal.dark);
  if (kind === 'jet' || kind === 'spurt' || kind === 'slash_wave') return _pick(pal.mid.concat(pal.dark.slice(0, 2)));
  return _pick(pal.mid);
}

function rollKind(ichor, style, fatal = false) {
  const r = Math.random();
  if (style === 'drip') return r < 0.62 ? 'drop' : r < 0.84 ? 'spurt' : 'glob';
  if (fatal && r < 0.24) return 'jet';
  if (ichor === 'blue') {
    if (r < 0.16) return 'mist';
    if (r < 0.32) return 'spark';
    if (r < 0.52) return 'jet';
    if (r < 0.74) return 'spurt';
    if (r < 0.88) return 'drop';
    return 'glob';
  }
  if (ichor === 'green') {
    if (r < 0.24) return 'glob';
    if (r < 0.42) return 'bubble';
    if (r < 0.60) return 'jet';
    if (r < 0.78) return 'spurt';
    if (r < 0.90) return 'drop';
    return 'mist';
  }
  // red
  if (r < 0.24) return 'jet';
  if (r < 0.52) return 'spurt';
  if (r < 0.76) return 'drop';
  if (r < 0.90) return 'glob';
  return 'mist';
}

function spraySpec(reason, attackerCell, cell, fatal) {
  if (reason === 'death') {
    return { angle: -Math.PI / 2, spread: Math.PI * 0.96, speed: [3.0, 9.2], style: 'gush', countMul: 1.85 };
  }
  if (reason === 'bleed') {
    return { angle: Math.PI / 2, spread: 0.52, speed: [0.9, 3.2], style: 'drip', countMul: 0.75 };
  }
  if (reason === 'spikes') {
    return { angle: -Math.PI / 2, spread: 0.88, speed: [3.2, 8.2], style: 'fountain', countMul: 1.4 };
  }
  if (reason === 'wall_collision') {
    const away = cell <= 0 ? 0 : cell >= 6 ? Math.PI : -Math.PI / 2;
    return { angle: away, spread: 0.9, speed: [2.8, 6.8], style: 'burst', countMul: 1.25 };
  }
  if (typeof attackerCell === 'number' && attackerCell !== cell) {
    const away = Math.sign(cell - attackerCell) || 1;
    const angle = Math.atan2(-0.48, away);
    return { angle, spread: 0.88, speed: [3.0, 8.4], style: 'burst', countMul: fatal ? 1.65 : 1.25 };
  }
  return { angle: -Math.PI / 2, spread: 1.35, speed: [2.4, 7.2], style: 'burst', countMul: fatal ? 1.55 : 1.15 };
}

/**
 * Generates an organic multi-lobed closed SVG Bezier path around (0,0)
 * so puddles and splatters look like real liquid pools rather than geometric ovals.
 */
function buildOrganicPuddlePath(rx, ry, lobes = 8, seed = 1) {
  const pts = [];
  for (let i = 0; i < lobes; i++) {
    const ang = (i / lobes) * Math.PI * 2;
    const wave = 0.82 + 0.34 * Math.sin(seed * 7.3 + i * 2.7) * Math.cos(seed * 3.1 - i * 1.9);
    pts.push({
      x: Math.cos(ang) * rx * wave,
      y: Math.sin(ang) * ry * wave
    });
  }
  let d = '';
  for (let i = 0; i < lobes; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % lobes];
    const midX = (p0.x + p1.x) * 0.5;
    const midY = (p0.y + p1.y) * 0.5;
    if (i === 0) {
      const prev = pts[lobes - 1];
      d += `M ${(( prev.x + p0.x) * 0.5).toFixed(1)} ${((prev.y + p0.y) * 0.5).toFixed(1)} `;
    }
    d += `Q ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)} `;
  }
  return `${d}Z`;
}

export function clearBattleBlood() {
  groundStainsMap.clear();
  entityStainsMap.clear();
  particles = [];
  if (raf) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
  lastTs = 0;
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function getGroundStains(cellIdx, state = null) {
  const c = Number(cellIdx);
  if (state?.cellBlood && Array.isArray(state.cellBlood[c])) {
    return state.cellBlood[c];
  }
  return groundStainsMap.get(c) || [];
}

export function getEntityStains(entityId, state = null) {
  if (!entityId) return [];
  if (state) {
    if (state.hero && (state.hero.id === entityId || entityId === 'hero_venca') && Array.isArray(state.hero.bloodStains)) {
      return state.hero.bloodStains;
    }
    const enemy = (state.enemies || []).find((e) => e.id === entityId);
    if (enemy && Array.isArray(enemy.bloodStains)) {
      return enemy.bloodStains;
    }
  }
  return entityStainsMap.get(entityId) || [];
}

function createGroundStainObject(ichor, opts = {}) {
  const pal = PALETTE[ichor] || PALETTE.red;
  const fatal = Boolean(opts.fatal);
  const rx = Number((opts.rx ?? rand(fatal ? 11 : 6.5, fatal ? 21 : 14)).toFixed(1));
  const ry = Number((opts.ry ?? rx * rand(0.42, 0.65)).toFixed(1));
  const splatCount = Math.floor(rand(fatal ? 5 : 3, fatal ? 9 : 7));
  const splats = [];

  for (let s = 0; s < splatCount; s++) {
    const ang = rand(0, Math.PI * 2);
    const dist = rand(rx * 0.95, rx * 2.15);
    splats.push({
      dx: Number((Math.cos(ang) * dist).toFixed(1)),
      dy: Number((Math.sin(ang) * dist * 0.55).toFixed(1)),
      r: Number(rand(1.3, 3.2).toFixed(1)),
      streak: Math.random() < 0.55,
      ang: Math.round((ang * 180) / Math.PI)
    });
  }

  // Front-of-slab drips that trickle over the stone ledge
  const drips = [];
  const dripCount = fatal ? Math.floor(rand(2, 4)) : Math.random() < 0.7 ? Math.floor(rand(1, 3)) : 0;
  for (let d = 0; d < dripCount; d++) {
    drips.push({
      dx: Number(rand(-rx * 0.65, rx * 0.65).toFixed(1)),
      len: Number(rand(fatal ? 12 : 7, fatal ? 24 : 16).toFixed(1)),
      w: Number(rand(1.4, 2.8).toFixed(1))
    });
  }

  return {
    id: `gstain_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    x: Math.round(opts.x ?? rand(18, 82)),
    // y=34..74 maps squarely onto the top and front edge of .cell-floor-stone!
    y: Math.round(opts.y ?? rand(fatal ? 34 : 38, 72)),
    rx,
    ry,
    seed: Number(rand(1, 99).toFixed(2)),
    rot: Math.round(rand(-22, 22)),
    color: _pick(pal.mid),
    coreColor: pal.core || _pick(pal.dark),
    rimColor: pal.stainRim,
    highlight: pal.highlight,
    ichor,
    splats,
    drips,
    opacity: Number(rand(0.88, 0.98).toFixed(2))
  };
}

function storeGroundStainOnCell(cellIdx, stain, state = null) {
  if (typeof cellIdx !== 'number' || cellIdx < 0 || cellIdx > 8) return;
  if (state) {
    state.cellBlood = state.cellBlood || {};
    state.cellBlood[cellIdx] = state.cellBlood[cellIdx] || [];
    state.cellBlood[cellIdx].push(stain);
    if (state.cellBlood[cellIdx].length > 18) state.cellBlood[cellIdx].shift();
  }
  const list = groundStainsMap.get(cellIdx) || [];
  list.push(stain);
  if (list.length > 18) list.shift();
  groundStainsMap.set(cellIdx, list);

  if (typeof document !== 'undefined') {
    const cellEl = document.querySelector(`.board-cell[data-cell-index="${cellIdx}"]`);
    const groundZone = cellEl?.querySelector('.cell-ground-blood-zone');
    if (groundZone) {
      const gstains = getGroundStains(cellIdx, state);
      groundZone.innerHTML = renderCellGroundBloodHtml(gstains);
    }
  }
}

export function recordEntityHitBlood(state, opts = {}) {
  const {
    targetId,
    attackerId,
    cell,
    attackerCell,
    amount = 1,
    ichor = 'red',
    reason = 'attack',
    fatal = false
  } = opts;

  if (!ichor || !PALETTE[ichor]) return;

  const pal = PALETTE[ichor];
  const targetCell = typeof cell === 'number' ? cell : Number(cell);

  // 1. Add sprite stains to target entity
  if (targetId) {
    const stainCount = fatal ? Math.floor(rand(3, 5)) : Math.min(4, 1 + Math.ceil((amount || 1) / 2));
    for (let i = 0; i < stainCount; i++) {
      const type = reason === 'bleed'
        ? 'drip'
        : fatal
        ? _pick(['slash', 'splat', 'arterial', 'drip'])
        : _pick(['slash', 'splat', 'drip', 'cluster']);

      const newStain = {
        id: `stain_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        type,
        // Keep tightly centered on the character torso/body silhouette (x: 32..68, y: 28..78)
        x: Math.round(rand(32, 68)),
        y: Math.round(rand(type === 'drip' ? 42 : 28, 76)),
        scale: Number(rand(0.88, fatal ? 1.55 : 1.28).toFixed(2)),
        rot: Math.round(rand(-38, 38)),
        seed: Number(rand(1, 50).toFixed(1)),
        color: _pick(pal.mid),
        darkColor: _pick(pal.dark),
        rimColor: pal.stainRim,
        highlight: pal.highlight,
        ichor,
        opacity: Number(rand(0.88, 0.98).toFixed(2))
      };

      if (state) {
        if (state.hero && (state.hero.id === targetId || targetId === 'hero_venca')) {
          state.hero.bloodStains = state.hero.bloodStains || [];
          state.hero.bloodStains.push(newStain);
          if (state.hero.bloodStains.length > 12) state.hero.bloodStains.shift();
        } else {
          const enemy = (state.enemies || []).find((e) => e.id === targetId);
          if (enemy) {
            enemy.bloodStains = enemy.bloodStains || [];
            enemy.bloodStains.push(newStain);
            if (enemy.bloodStains.length > 12) enemy.bloodStains.shift();
          }
        }
      }

      const list = entityStainsMap.get(targetId) || [];
      list.push(newStain);
      if (list.length > 12) list.shift();
      entityStainsMap.set(targetId, list);
    }
  }

  // 2. If attacker is adjacent (melee range), splatter attacker with target's ichor!
  if (attackerId && typeof attackerCell === 'number' && typeof targetCell === 'number') {
    if (Math.abs(attackerCell - targetCell) <= 1 && attackerId !== targetId) {
      const sprayCount = fatal ? 2 : 1;
      for (let s = 0; s < sprayCount; s++) {
        const sprayStain = {
          id: `stain_spray_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          type: s === 0 ? 'cluster' : 'splat',
          x: Math.round(rand(34, 66)),
          y: Math.round(rand(32, 72)),
          scale: Number(rand(0.78, 1.12).toFixed(2)),
          rot: Math.round(rand(-35, 35)),
          seed: Number(rand(1, 50).toFixed(1)),
          color: _pick(pal.mid),
          darkColor: _pick(pal.dark),
          rimColor: pal.stainRim,
          highlight: pal.highlight,
          ichor,
          opacity: Number(rand(0.82, 0.94).toFixed(2))
        };

        if (state) {
          if (state.hero && (state.hero.id === attackerId || attackerId === 'hero_venca')) {
            state.hero.bloodStains = state.hero.bloodStains || [];
            state.hero.bloodStains.push(sprayStain);
            if (state.hero.bloodStains.length > 12) state.hero.bloodStains.shift();
          } else {
            const enemy = (state.enemies || []).find((e) => e.id === attackerId);
            if (enemy) {
              enemy.bloodStains = enemy.bloodStains || [];
              enemy.bloodStains.push(sprayStain);
              if (enemy.bloodStains.length > 12) enemy.bloodStains.shift();
            }
          }
        }

        const list = entityStainsMap.get(attackerId) || [];
        list.push(sprayStain);
        if (list.length > 12) list.shift();
        entityStainsMap.set(attackerId, list);
      }
    }
  }

  // 3. Add ground stains to target cell stone slab (and adjacent cell on heavy/directional hits)
  if (typeof targetCell === 'number' && targetCell >= 0) {
    const groundCount = fatal ? Math.floor(rand(3, 5)) : Math.min(4, 1 + Math.ceil((amount || 1) / 2));
    for (let i = 0; i < groundCount; i++) {
      const gstain = createGroundStainObject(ichor, { fatal });
      storeGroundStainOnCell(targetCell, gstain, state);
    }

    // Directional splatter onto neighboring cell behind the target on strong or fatal hits
    if ((fatal || amount >= 3) && typeof attackerCell === 'number' && attackerCell !== targetCell) {
      const pushDir = Math.sign(targetCell - attackerCell);
      const spillCell = targetCell + pushDir;
      if (spillCell >= 0 && spillCell <= 6) {
        const spillStain = createGroundStainObject(ichor, {
          fatal: false,
          x: pushDir > 0 ? rand(12, 46) : rand(54, 88),
          rx: rand(5.5, 10.5)
        });
        storeGroundStainOnCell(spillCell, spillStain, state);
      }
    }
  }

  // 4. Real-time DOM injection + visceral hit gleam if battlefield elements exist in document
  if (typeof document !== 'undefined') {
    if (targetId) {
      const entityEl = document.getElementById(`entity-dom-${targetId}`);
      const flipWrapper = entityEl?.querySelector('.sprite-flip-wrapper');
      if (flipWrapper) {
        let overlay = flipWrapper.querySelector('.sprite-blood-overlay');
        const stains = getEntityStains(targetId, state);
        const html = renderSpriteBloodHtml(stains);
        if (overlay) {
          overlay.outerHTML = html;
        } else if (html) {
          flipWrapper.insertAdjacentHTML('beforeend', html);
        }
        flipWrapper.classList.remove('blood-hit-gleam');
        void flipWrapper.offsetWidth;
        flipWrapper.classList.add('blood-hit-gleam');
      }
    }
    if (attackerId && attackerId !== targetId) {
      const attackerEl = document.getElementById(`entity-dom-${attackerId}`);
      const aFlip = attackerEl?.querySelector('.sprite-flip-wrapper');
      if (aFlip) {
        let aOverlay = aFlip.querySelector('.sprite-blood-overlay');
        const astains = getEntityStains(attackerId, state);
        const ahtml = renderSpriteBloodHtml(astains);
        if (aOverlay) {
          aOverlay.outerHTML = ahtml;
        } else if (ahtml) {
          aFlip.insertAdjacentHTML('beforeend', ahtml);
        }
      }
    }
  }
}

export function renderCellGroundBloodHtml(stainsOrCellIdx, state = null) {
  let stains = [];
  if (Array.isArray(stainsOrCellIdx)) {
    stains = stainsOrCellIdx;
  } else if (typeof stainsOrCellIdx === 'number') {
    stains = getGroundStains(stainsOrCellIdx, state);
  }
  if (!stains || stains.length === 0) return '';

  const shapes = stains.map((stain, idx) => {
    const rx = stain.rx || 9;
    const ry = stain.ry || 4.5;
    const seed = stain.seed || (idx + 1) * 3.7;
    const rimColor = stain.rimColor || '#1a0505';
    const color = stain.color || '#dc2626';
    const coreColor = stain.coreColor || rimColor;
    const highlight = stain.highlight || 'rgba(255,255,255,0.75)';
    const opacity = stain.opacity || 0.92;
    const splats = stain.splats || [];
    const drips = stain.drips || [];

    const outerPath = buildOrganicPuddlePath(rx * 1.18, ry * 1.18, 8, seed);
    const midPath = buildOrganicPuddlePath(rx, ry, 8, seed + 1.4);

    const splatSvg = splats.map((s) => {
      if (s.streak) {
        const len = (s.r * 2.4).toFixed(1);
        return `
          <g transform="translate(${s.dx}, ${s.dy}) rotate(${s.ang || 0})">
            <path d="M ${-len} 0 Q 0 ${(-s.r * 0.9).toFixed(1)} ${s.r.toFixed(1)} 0 Q 0 ${(s.r * 0.9).toFixed(1)} ${-len} 0 Z" fill="${rimColor}" opacity="0.92" />
            <circle cx="${(s.r * 0.2).toFixed(1)}" cy="0" r="${s.r}" fill="${color}" opacity="0.95" />
            <circle cx="${(s.r * 0.1).toFixed(1)}" cy="${(-s.r * 0.25).toFixed(1)}" r="${Math.max(0.45, s.r * 0.38).toFixed(1)}" fill="${highlight}" opacity="0.7" />
          </g>
        `;
      }
      return `
        <circle cx="${s.dx}" cy="${s.dy}" r="${(s.r * 1.2).toFixed(1)}" fill="${rimColor}" opacity="0.9" />
        <circle cx="${s.dx}" cy="${s.dy}" r="${s.r}" fill="${color}" opacity="0.95" />
        <circle cx="${(s.dx - s.r * 0.25).toFixed(1)}" cy="${(s.dy - s.r * 0.25).toFixed(1)}" r="${Math.max(0.45, s.r * 0.38).toFixed(1)}" fill="${highlight}" opacity="0.68" />
      `;
    }).join('');

    // Vertical drips trickling down the front edge of the stone slab (unrotated so gravity pulls straight down)
    const dripSvg = drips.map((d) => `
      <g transform="translate(${(stain.x + d.dx).toFixed(1)}, ${(stain.y + ry * 0.55).toFixed(1)})" opacity="${opacity}">
        <path d="M ${(-d.w * 0.7).toFixed(1)} 0 Q 0 ${(d.len * 0.6).toFixed(1)} ${(-d.w * 0.25).toFixed(1)} ${d.len.toFixed(1)} L ${(d.w * 0.25).toFixed(1)} ${d.len.toFixed(1)} Q 0 ${(d.len * 0.6).toFixed(1)} ${(d.w * 0.7).toFixed(1)} 0 Z" fill="${rimColor}" opacity="0.95" />
        <path d="M ${(-d.w * 0.45).toFixed(1)} 0 L 0 ${(d.len * 0.95).toFixed(1)} L ${(d.w * 0.45).toFixed(1)} 0 Z" fill="${color}" opacity="0.94" />
        <circle cx="0" cy="${(d.len + d.w * 0.35).toFixed(1)}" r="${(d.w * 0.72).toFixed(1)}" fill="${rimColor}" />
        <circle cx="0" cy="${(d.len + d.w * 0.35).toFixed(1)}" r="${(d.w * 0.55).toFixed(1)}" fill="${color}" />
        <circle cx="${(-d.w * 0.18).toFixed(1)}" cy="${(d.len + d.w * 0.15).toFixed(1)}" r="${Math.max(0.4, d.w * 0.22).toFixed(1)}" fill="${highlight}" opacity="0.8" />
      </g>
    `).join('');

    return `
      <g transform="translate(${stain.x}, ${stain.y}) rotate(${stain.rot || 0})" opacity="${opacity}">
        <!-- Coagulated organic dark rim -->
        <path d="${outerPath}" fill="${rimColor}" opacity="0.96" />
        <!-- Rich liquid multi-lobed puddle -->
        <path d="${midPath}" fill="${color}" opacity="0.94" />
        <!-- Deep coagulated center pool -->
        <ellipse cx="0" cy="0" rx="${(rx * 0.58).toFixed(1)}" ry="${(ry * 0.55).toFixed(1)}" fill="${coreColor}" opacity="0.55" />
        <!-- Wet specular shine -->
        <ellipse cx="${(-rx * 0.26).toFixed(1)}" cy="${(-ry * 0.24).toFixed(1)}" rx="${Math.max(1.2, rx * 0.42).toFixed(1)}" ry="${Math.max(0.7, ry * 0.3).toFixed(1)}" fill="${highlight}" opacity="0.72" />
        <!-- Satellite splatter droplets and directional rays -->
        ${splatSvg}
      </g>
      ${dripSvg}
    `;
  }).join('');

  return `
    <svg class="ground-blood-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      ${shapes}
    </svg>
  `;
}

export function renderSpriteBloodHtml(entityOrStains, state = null) {
  let stains = [];
  if (Array.isArray(entityOrStains)) {
    stains = entityOrStains;
  } else if (typeof entityOrStains === 'string') {
    stains = getEntityStains(entityOrStains, state);
  } else if (entityOrStains && typeof entityOrStains === 'object') {
    stains = entityOrStains.bloodStains || getEntityStains(entityOrStains.id, state);
  }
  if (!stains || stains.length === 0) return '';

  const decals = stains.map((stain, idx) => {
    const x = stain.x || 50;
    const y = stain.y || 50;
    const scale = stain.scale || 1;
    const rot = stain.rot || 0;
    const seed = stain.seed || (idx + 1) * 5.1;
    const color = stain.color || '#dc2626';
    const darkColor = stain.darkColor || '#7f1d1d';
    const rimColor = stain.rimColor || '#260404';
    const highlight = stain.highlight || 'rgba(255,255,255,0.8)';
    const opacity = stain.opacity || 0.92;

    let body = '';
    if (stain.type === 'slash') {
      body = `
        <!-- Jagged wound shadow & soaked cloth halo -->
        <path d="M -15 -7 Q -2 -1 16 7 Q 2 4 -15 -7 Z" fill="${rimColor}" opacity="0.85" />
        <path d="M -14 -6 Q -1 0 15 6" stroke="${rimColor}" stroke-width="5.4" stroke-linecap="round" fill="none" opacity="0.96" />
        <path d="M -13 -6 Q -1 0 14 6" stroke="${darkColor}" stroke-width="3.8" stroke-linecap="round" fill="none" opacity="0.96" />
        <path d="M -11 -5 Q 0 0 12 5" stroke="${color}" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.98" />
        <path d="M -8 -4 Q 0 -1 7 2" stroke="${highlight}" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.75" />
        <!-- Trickling blood stream from wound edge -->
        <path d="M 3 2 Q 4 10 3 16" stroke="${darkColor}" stroke-width="2.1" stroke-linecap="round" fill="none" />
        <path d="M 3 2 Q 4 10 3 15" stroke="${color}" stroke-width="1.3" stroke-linecap="round" fill="none" />
        <circle cx="3" cy="17.2" r="1.7" fill="${color}" />
        <!-- Arterial spray droplets around slash -->
        <circle cx="-8" cy="-8" r="1.9" fill="${darkColor}" />
        <circle cx="-8" cy="-8" r="1.4" fill="${color}" />
        <circle cx="10" cy="9" r="1.8" fill="${color}" />
        <circle cx="17" cy="11" r="1.2" fill="${color}" />
        <circle cx="-14" cy="-2" r="1.3" fill="${color}" />
      `;
    } else if (stain.type === 'drip') {
      body = `
        <ellipse cx="0" cy="-7" rx="4.5" ry="2.6" fill="${rimColor}" opacity="0.92" />
        <ellipse cx="0" cy="-7" rx="3.4" ry="1.9" fill="${color}" opacity="0.95" />
        <!-- Main heavy rivulet -->
        <path d="M -1.8 -7 C -2.4 -1 -1.6 8 0 15 C 1.6 8 2.4 -1 1.8 -7 Z" fill="${rimColor}" opacity="0.96" />
        <path d="M -1.1 -7 C -1.5 -1 -1.0 7 0 13.5 C 1.0 7 1.5 -1 1.1 -7 Z" fill="${color}" opacity="0.95" />
        <circle cx="0" cy="16.5" r="2.2" fill="${rimColor}" />
        <circle cx="0" cy="16.5" r="1.7" fill="${color}" />
        <circle cx="-0.5" cy="15.9" r="0.65" fill="${highlight}" opacity="0.82" />
        <!-- Secondary side trickle -->
        <path d="M 3.2 -6 Q 3.8 1 3.2 7" stroke="${darkColor}" stroke-width="1.8" stroke-linecap="round" fill="none" />
        <path d="M 3.2 -6 Q 3.8 1 3.2 6.5" stroke="${color}" stroke-width="1.1" stroke-linecap="round" fill="none" />
        <circle cx="3.2" cy="8.5" r="1.2" fill="${color}" />
      `;
    } else if (stain.type === 'arterial') {
      const splatPath = buildOrganicPuddlePath(7.5, 6.2, 9, seed);
      body = `
        <path d="${splatPath}" fill="${rimColor}" opacity="0.95" />
        <path d="${buildOrganicPuddlePath(6.0, 4.8, 9, seed + 1.2)}" fill="${darkColor}" opacity="0.96" />
        <ellipse cx="0" cy="0" rx="3.8" ry="3.0" fill="${color}" opacity="0.98" />
        <ellipse cx="-1.2" cy="-1.0" rx="1.6" ry="1.0" fill="${highlight}" opacity="0.8" />
        <!-- Long arterial drips -->
        <path d="M -2 3 Q -2.5 12 -2 20" stroke="${rimColor}" stroke-width="2.6" stroke-linecap="round" fill="none" />
        <path d="M -2 3 Q -2.5 12 -2 19" stroke="${color}" stroke-width="1.6" stroke-linecap="round" fill="none" />
        <circle cx="-2" cy="21.5" r="1.9" fill="${color}" />
        <path d="M 2.5 2 Q 3 9 2.5 14" stroke="${darkColor}" stroke-width="2.0" stroke-linecap="round" fill="none" />
        <circle cx="2.5" cy="15.5" r="1.4" fill="${color}" />
        <!-- Radial droplets -->
        <circle cx="-8" cy="-5" r="1.8" fill="${color}" />
        <circle cx="8" cy="-4" r="2.1" fill="${color}" />
        <circle cx="9" cy="4" r="1.5" fill="${color}" />
        <circle cx="-7" cy="5" r="1.6" fill="${color}" />
      `;
    } else if (stain.type === 'cluster') {
      body = `
        <circle cx="0" cy="0" r="3.8" fill="${rimColor}" />
        <circle cx="0" cy="0" r="2.9" fill="${color}" />
        <circle cx="-0.9" cy="-0.9" r="1.0" fill="${highlight}" opacity="0.78" />
        <circle cx="-5.5" cy="-3.5" r="2.2" fill="${darkColor}" />
        <circle cx="-5.5" cy="-3.5" r="1.7" fill="${color}" />
        <circle cx="6.2" cy="-2.4" r="2.4" fill="${darkColor}" />
        <circle cx="6.2" cy="-2.4" r="1.8" fill="${color}" />
        <circle cx="2.8" cy="5.2" r="1.9" fill="${darkColor}" />
        <circle cx="2.8" cy="5.2" r="1.4" fill="${color}" />
        <circle cx="-4.2" cy="4.4" r="1.6" fill="${color}" />
        <circle cx="0.5" cy="-6.2" r="1.3" fill="${color}" />
        <circle cx="8.5" cy="2.5" r="1.1" fill="${color}" />
      `;
    } else {
      // Organic multi-lobed splat
      const outerSplat = buildOrganicPuddlePath(6.4, 4.9, 8, seed);
      const innerSplat = buildOrganicPuddlePath(5.1, 3.8, 8, seed + 2.1);
      body = `
        <path d="${outerSplat}" fill="${rimColor}" opacity="0.96" />
        <path d="${innerSplat}" fill="${color}" opacity="0.95" />
        <ellipse cx="0" cy="0" rx="2.8" ry="2.1" fill="${darkColor}" opacity="0.65" />
        <circle cx="-1.5" cy="-1.2" r="1.3" fill="${highlight}" opacity="0.78" />
        <circle cx="-6.5" cy="-4.5" r="1.9" fill="${color}" />
        <circle cx="7.2" cy="3.4" r="2.2" fill="${color}" />
        <circle cx="-4.8" cy="5.6" r="1.6" fill="${color}" />
        <circle cx="5.2" cy="-5.4" r="1.7" fill="${color}" />
      `;
    }

    return `
      <g transform="translate(${x}, ${y}) rotate(${rot}) scale(${scale})" opacity="${opacity}">
        ${body}
      </g>
    `;
  }).join('');

  return `
    <div class="sprite-blood-overlay" aria-hidden="true">
      <svg class="sprite-blood-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        ${decals}
      </svg>
    </div>
  `;
}

function ensureCanvas(container) {
  if (typeof document === 'undefined') return false;
  const stage = container?.querySelector?.('#battlefield-stage') || document.getElementById('battlefield-stage');
  activeStageEl = stage || null;

  if (canvas && canvas.isConnected && ctx) {
    if (stage && canvas.parentElement !== stage) {
      stage.appendChild(canvas);
      syncCanvas();
    }
    return true;
  }

  const existing = stage?.querySelector?.('#blood-fx-canvas');
  if (existing) {
    canvas = existing;
    ctx = canvas.getContext('2d');
    return Boolean(ctx);
  }

  canvas = document.createElement('canvas');
  canvas.id = 'blood-fx-canvas';
  canvas.className = 'blood-fx-layer';
  canvas.setAttribute('aria-hidden', 'true');
  if (stage) {
    stage.appendChild(canvas);
  } else {
    document.body.appendChild(canvas);
  }
  ctx = canvas.getContext('2d');
  return Boolean(ctx);
}

function syncCanvas() {
  if (!canvas || !ctx) return;
  const stage = canvas.parentElement?.id === 'battlefield-stage'
    ? canvas.parentElement
    : document.getElementById('battlefield-stage');
  activeStageEl = stage || activeStageEl;
  if (stage) stageRect = stage.getBoundingClientRect();
  if (!stageRect || stageRect.width < 2) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(stageRect.width));
  const h = Math.max(1, Math.round(stageRect.height));
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  if (canvas.parentElement === stage) {
    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  } else {
    canvas.style.position = 'fixed';
    canvas.style.left = `${stageRect.left}px`;
    canvas.style.top = `${stageRect.top}px`;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function hitPoint(container, cellIdx) {
  const stage = container?.querySelector?.('#battlefield-stage') || document.getElementById('battlefield-stage');
  const cell = container?.querySelector?.(`.board-cell[data-cell-index="${cellIdx}"]`);
  if (!stage || !cell) return null;
  const sprite = cell.querySelector('.entity-sprite-img');
  const stone = cell.querySelector('.cell-floor-stone');
  const sr = stage.getBoundingClientRect();
  const cr = cell.getBoundingClientRect();
  const r = sprite ? sprite.getBoundingClientRect() : cr;
  const stoneRect = stone ? stone.getBoundingClientRect() : null;
  stageRect = sr;
  activeStageEl = stage;

  // Map ground level right onto the .cell-floor-stone surface
  const stoneTop = stoneRect ? stoneRect.top - sr.top + 6 : cr.bottom - sr.top - 32;
  const stoneBottom = stoneRect ? stoneRect.bottom - sr.top - 4 : cr.bottom - sr.top - 10;

  return {
    x: r.left - sr.left + r.width * 0.5,
    y: r.top - sr.top + r.height * (sprite ? 0.44 : 0.55),
    groundMin: Math.max(20, stoneTop),
    groundMax: Math.min(sr.height - 6, Math.max(stoneTop + 8, stoneBottom)),
    ground: Math.min(sr.height - 8, (stoneTop + stoneBottom) * 0.5),
    cellIdx: Number(cellIdx),
    cellLeft: cr.left - sr.left,
    cellWidth: cr.width
  };
}

/**
 * When a heavy droplet/jet lands on the floor at stage-relative coordinate (px, py),
 * resolve which .board-cell it hit and dynamically add a persistent ground stain there!
 */
function depositDynamicLandingStain(px, py, ichor, r) {
  if (typeof document === 'undefined' || !stageRect) return;
  const stage = activeStageEl || document.getElementById('battlefield-stage');
  if (!stage) return;
  const cells = stage.querySelectorAll('.board-cell[data-cell-index]');
  if (!cells || cells.length === 0) return;

  const clientX = stageRect.left + px;
  for (const cellEl of cells) {
    const cr = cellEl.getBoundingClientRect();
    if (clientX >= cr.left && clientX <= cr.right) {
      const cIdx = Number(cellEl.getAttribute('data-cell-index'));
      const relX = Math.max(12, Math.min(88, ((clientX - cr.left) / Math.max(1, cr.width)) * 100));
      const gstain = createGroundStainObject(ichor, {
        x: relX,
        y: rand(38, 72),
        rx: Math.max(4.5, Math.min(12, r * 1.9))
      });
      storeGroundStainOnCell(cIdx, gstain, null);
      break;
    }
  }
}

function pushParticle(p) {
  particles.push(p);
  if (particles.length > MAX_ALIVE) {
    particles.splice(0, particles.length - MAX_ALIVE);
  }
}

function emitWave(origin, ichor, amount, spec, lifeScale, fatal = false) {
  const quiet = reducedMotion();
  const pal = PALETTE[ichor] || PALETTE.red;
  let count = Math.round((36 + Math.min(64, (amount || 1) * 12)) * spec.countMul);
  if (quiet) count = Math.min(16, count);
  count = Math.max(spec.style === 'drip' ? 14 : 28, Math.min(count, quiet ? 16 : 120));

  // 1. Visceral wound flash mist at origin
  if (!quiet) {
    pushParticle({
      x: origin.x,
      y: origin.y,
      vx: 0,
      vy: 0,
      grav: 0,
      drag: 1,
      r: fatal ? 28 : 18,
      maxR: fatal ? 68 : 44,
      life: 240 * lifeScale,
      maxLife: 240 * lifeScale,
      color: pal.mid[1] || '#dc2626',
      glowColor: pal.glow,
      kind: 'flash',
      ichor,
      ground: origin.ground
    });
  }

  // 2. Directional blade slash blood arc on attack/gush/burst
  if (!quiet && (spec.style === 'burst' || spec.style === 'gush' || spec.style === 'fountain')) {
    pushParticle({
      x: origin.x,
      y: origin.y,
      vx: Math.cos(spec.angle) * 2.4,
      vy: Math.sin(spec.angle) * 2.4,
      grav: 0,
      drag: 0.94,
      r: fatal ? 24 : 16,
      maxR: fatal ? 64 : 44,
      angle: spec.angle,
      life: 290 * lifeScale,
      maxLife: 290 * lifeScale,
      color: pal.mid[0] || '#ef4444',
      rimColor: pal.stainRim,
      kind: 'slash_wave',
      ichor,
      ground: origin.ground
    });
  }

  // 3. Expanding shockwave ring on fatal kills
  if (fatal && spec.style === 'gush') {
    pushParticle({
      x: origin.x,
      y: origin.y,
      vx: 0,
      vy: 0,
      grav: 0,
      drag: 1,
      r: 8,
      maxR: 62,
      lineWidth: 4.5,
      life: 420 * lifeScale,
      maxLife: 420 * lifeScale,
      color: pal.mid[1] || '#dc2626',
      kind: 'shockwave',
      ichor,
      ground: origin.ground
    });
  }

  // 4. Main particle burst
  let dynamicLandingBudget = fatal ? 4 : 2;
  for (let i = 0; i < count; i++) {
    const kind = rollKind(ichor, spec.style, fatal);
    const ang = spec.angle + rand(-spec.spread, spec.spread);
    const speedMul =
      kind === 'mist'
        ? 0.52
        : kind === 'glob'
        ? 0.78
        : kind === 'jet'
        ? 1.42
        : kind === 'spurt'
        ? 1.25
        : 1;
    const speed = rand(spec.speed[0], spec.speed[1]) * speedMul;
    const maxLife =
      (kind === 'mist'
        ? rand(480, 960)
        : kind === 'glob'
        ? rand(560, 1020)
        : kind === 'jet'
        ? rand(420, 820)
        : kind === 'spurt'
        ? rand(360, 740)
        : rand(400, 840)) * lifeScale;
    const grav =
      kind === 'bubble'
        ? -0.04
        : kind === 'mist'
        ? ichor === 'blue'
          ? -0.014
          : 0.018
        : kind === 'spark'
        ? 0.02
        : ichor === 'green'
        ? 0.165
        : 0.14;

    const r =
      kind === 'glob'
        ? rand(3.8, 6.8)
        : kind === 'mist'
        ? rand(5.0, 11.5)
        : kind === 'spark'
        ? rand(1.2, 2.4)
        : kind === 'jet'
        ? rand(2.4, 4.4)
        : kind === 'spurt'
        ? rand(2.0, 3.9)
        : rand(1.6, 3.4);

    const startX = origin.x + rand(-10, 10);
    const startY = origin.y + rand(-16, 12);
    const pGround = rand(origin.groundMin || origin.ground - 10, origin.groundMax || origin.ground + 6);
    const canDepositSvg =
      dynamicLandingBudget > 0 && (kind === 'glob' || kind === 'jet') && Math.abs(Math.cos(ang)) > 0.45;
    if (canDepositSvg) dynamicLandingBudget--;

    pushParticle({
      x: startX,
      y: startY,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      grav,
      drag: kind === 'mist' ? 0.982 : 0.992,
      r,
      life: maxLife,
      maxLife,
      color: colorFor(ichor, kind),
      rimColor: pal.stainRim,
      highlight: pal.highlight,
      ichor,
      kind,
      ground: pGround,
      rot: rand(0, Math.PI),
      split: kind === 'glob',
      depositSvg: canDepositSvg,
      trail: kind === 'jet' || kind === 'spurt' || kind === 'glob' ? [{ x: startX, y: startY }] : null
    });
  }
}

function stepParticles(dt) {
  const next = [];
  const spawned = [];
  const dtNorm = dt / 16.67;

  for (const p of particles) {
    p.life -= dt;
    if (p.life <= 0) continue;

    if (p.kind === 'shockwave' || p.kind === 'flash') {
      p.r += (p.maxR - p.r) * 0.2 * dtNorm;
      if (p.lineWidth) p.lineWidth = Math.max(0.4, p.lineWidth * 0.93);
      next.push(p);
      continue;
    }

    if (p.kind === 'slash_wave') {
      p.x += p.vx * dtNorm;
      p.y += p.vy * dtNorm;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.r += (p.maxR - p.r) * 0.18 * dtNorm;
      next.push(p);
      continue;
    }

    if (p.kind === 'ledge_drip') {
      p.len = Math.min(p.maxLen, p.len + p.speed * dtNorm);
      next.push(p);
      continue;
    }

    if (p.kind !== 'stain') {
      if (p.trail) {
        p.trail.push({ x: p.x, y: p.y });
        const maxTrail = p.kind === 'jet' ? 6 : 4;
        if (p.trail.length > maxTrail) p.trail.shift();
      }

      p.vy += p.grav * dtNorm;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.x += p.vx * dtNorm;
      p.y += p.vy * dtNorm;

      if (p.split && p.life < p.maxLife * 0.56) {
        p.split = false;
        for (let k = 0; k < 3; k++) {
          spawned.push({
            x: p.x,
            y: p.y,
            vx: p.vx * 0.45 + rand(-1.6, 1.6),
            vy: p.vy * 0.35 + rand(-1.8, 0.4),
            grav: 0.145,
            drag: 0.99,
            r: Math.max(1.1, p.r * 0.48),
            life: p.life * 0.75,
            maxLife: p.life * 0.75,
            color: p.color,
            rimColor: p.rimColor,
            highlight: p.highlight,
            ichor: p.ichor,
            kind: 'spurt',
            ground: p.ground,
            rot: 0,
            split: false,
            trail: [{ x: p.x, y: p.y }]
          });
        }
      }

      if (
        p.kind !== 'mist' &&
        p.kind !== 'bubble' &&
        p.kind !== 'spark' &&
        p.y >= p.ground &&
        p.vy > 0.18
      ) {
        // Upward splash crown on stone impact
        if (p.vy > 0.38) {
          const splashDrops = p.kind === 'glob' || p.kind === 'jet' ? 3 : 2;
          for (let b = 0; b < splashDrops; b++) {
            spawned.push({
              x: p.x,
              y: p.ground - 1,
              vx: p.vx * 0.3 + rand(-1.8, 1.8),
              vy: rand(-1.6, -0.45),
              grav: 0.16,
              drag: 0.96,
              r: Math.max(0.8, p.r * 0.42),
              life: 260,
              maxLife: 260,
              color: p.color,
              rimColor: p.rimColor,
              highlight: p.highlight,
              ichor: p.ichor,
              kind: 'drop',
              ground: p.ground,
              rot: 0,
              split: false
            });
          }
        }

        // Deposit persistent SVG ground stain at the exact cell where heavy flying blood lands
        if (p.depositSvg) {
          p.depositSvg = false;
          depositDynamicLandingStain(p.x, p.ground, p.ichor || 'red', p.r);
        }

        // Spawn a slow vertical drip down the stone slab front edge for heavy drops
        if ((p.kind === 'glob' || p.kind === 'jet') && Math.random() < 0.45) {
          spawned.push({
            x: p.x + rand(-3, 3),
            y: p.ground + 1,
            len: 2,
            maxLen: rand(10, 22),
            speed: rand(0.35, 0.75),
            w: Math.max(1.4, p.r * 0.48),
            life: 620,
            maxLife: 620,
            color: p.color,
            rimColor: p.rimColor || '#260404',
            highlight: p.highlight || 'rgba(255,255,255,0.75)',
            kind: 'ledge_drip'
          });
        }

        p.kind = 'stain';
        p.trail = null;
        p.y = p.ground;
        p.vx *= 0.08;
        p.vy = 0;
        p.grav = 0;
        p.targetR = p.r * rand(1.75, 2.35);
        p.r = p.r * 1.15;
        p.life = Math.min(p.life, 540);
        p.maxLife = Math.max(p.maxLife, p.life);
      }
    } else {
      // Smoothly pool/spread outward on the stone slab
      if (p.targetR && p.r < p.targetR) {
        p.r += (p.targetR - p.r) * 0.16 * dtNorm;
      }
    }
    next.push(p);
  }
  particles = next.concat(spawned);
  if (particles.length > MAX_ALIVE) {
    particles.splice(0, particles.length - MAX_ALIVE);
  }
}

function drawParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    const fade = Math.max(0, Math.min(1, p.life / p.maxLife));
    const alpha =
      p.kind === 'mist'
        ? fade * 0.46
        : p.kind === 'flash'
        ? fade * 0.55
        : p.kind === 'stain' || p.kind === 'ledge_drip'
        ? fade * 0.85
        : fade;
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = p.color;

    if (p.kind === 'flash') {
      const grad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.r);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.55, p.glowColor || p.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === 'slash_wave') {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle || 0);
      ctx.beginPath();
      ctx.arc(0, 0, p.r, -0.85, 0.85, false);
      ctx.arc(-p.r * 0.22, 0, p.r * 0.86, 0.85, -0.85, true);
      ctx.closePath();
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = p.rimColor || '#260404';
      ctx.stroke();
      ctx.restore();
    } else if (p.kind === 'shockwave') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
    } else if (p.kind === 'ledge_drip') {
      // Trickling blood stream down the stone slab front
      ctx.fillStyle = p.rimColor || '#260404';
      ctx.beginPath();
      ctx.roundRect(p.x - p.w * 0.65, p.y, p.w * 1.3, p.len, p.w * 0.6);
      ctx.fill();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(p.x - p.w * 0.45, p.y, p.w * 0.9, p.len, p.w * 0.45);
      ctx.fill();
      // Hanging droplet bulb at tip
      ctx.beginPath();
      ctx.arc(p.x, p.y + p.len, p.w * 0.72, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === 'jet' || p.kind === 'spurt' || (p.kind === 'drop' && Math.hypot(p.vx, p.vy) > 1.1)) {
      // Draw tapered arterial ribbon trail if available
      if (p.trail && p.trail.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (let t = 0; t < p.trail.length - 1; t++) {
          const pt0 = p.trail[t];
          const pt1 = p.trail[t + 1];
          const ratio = (t + 1) / p.trail.length;
          ctx.globalAlpha = alpha * ratio * 0.78;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(0.8, p.r * 1.35 * ratio);
          ctx.beginPath();
          ctx.moveTo(pt0.x, pt0.y);
          ctx.lineTo(pt1.x, pt1.y);
          ctx.stroke();
        }
        // Connect last trail point to current head
        const lastPt = p.trail[p.trail.length - 1];
        ctx.globalAlpha = alpha * 0.9;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = Math.max(1.1, p.r * 1.45);
        ctx.beginPath();
        ctx.moveTo(lastPt.x, lastPt.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.restore();
      }

      const spd = Math.hypot(p.vx, p.vy);
      const angle = Math.atan2(p.vy, p.vx);
      const len = p.r * (1.4 + Math.min(3.8, spd * 0.5));
      const thick = Math.max(1.0, p.r * 0.92);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);
      // Dark coagulated outline for high contrast
      ctx.fillStyle = p.rimColor || '#260404';
      ctx.beginPath();
      ctx.ellipse(0, 0, len * 0.56, thick * 0.62, 0, 0, Math.PI * 2);
      ctx.fill();
      // Main bright droplet body
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, len * 0.5, thick * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Wet specular highlight
      ctx.globalAlpha = alpha * 0.82;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(len * 0.16, -thick * 0.15, Math.max(0.5, len * 0.24), Math.max(0.45, thick * 0.24), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (p.kind === 'spark') {
      const len = p.r * 3.2;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillRect(-len * 0.5, -0.85, len, 1.7);
      ctx.fillRect(-0.85, -len * 0.5, 1.7, len);
      ctx.restore();
    } else if (p.kind === 'bubble') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = alpha * 0.32;
      ctx.fill();
      ctx.globalAlpha = alpha * 0.85;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, Math.max(0.5, p.r * 0.28), 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === 'stain') {
      // Spreading floor puddle with dark rim + wet highlight
      ctx.fillStyle = p.rimColor || '#260404';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r * 2.05, p.r * 0.78, p.rot, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r * 1.8, p.r * 0.65, p.rot, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha * 0.65;
      ctx.fillStyle = p.highlight || '#ffffff';
      ctx.beginPath();
      ctx.ellipse(p.x - p.r * 0.45, p.y - p.r * 0.15, p.r * 0.65, p.r * 0.22, p.rot, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === 'mist') {
      const rad = p.r * 1.9;
      const grad = ctx.createRadialGradient(p.x, p.y, rad * 0.1, p.x, p.y, rad);
      grad.addColorStop(0, p.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Heavy glob or slow drop with dark rim + specular shine
      ctx.fillStyle = p.rimColor || '#260404';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 1.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha * 0.78;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x - p.r * 0.28, p.y - p.r * 0.28, Math.max(0.5, p.r * 0.3), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function frame(ts) {
  const dt = Math.min(34, lastTs ? ts - lastTs : 16.67);
  lastTs = ts;
  syncCanvas();
  stepParticles(dt);
  drawParticles();
  if (particles.length > 0) {
    raf = requestAnimationFrame(frame);
  } else {
    raf = 0;
    lastTs = 0;
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function kick() {
  if (!raf) raf = requestAnimationFrame(frame);
}

export function spawnBloodBurst(container, opts = {}) {
  const ichor = opts.ichor;
  if (!ichor || !PALETTE[ichor]) return;
  if (!ensureCanvas(container)) return;
  const origin = hitPoint(container, opts.cell);
  if (!origin) return;
  syncCanvas();
  const spec = spraySpec(opts.reason, opts.attackerCell, opts.cell, opts.fatal);
  const speed = opts.animSpeed > 0 ? opts.animSpeed : 1;
  const lifeScale = reducedMotion() ? 0.45 : 1 / Math.min(speed, 2.4);

  emitWave(origin, ichor, opts.amount || 1, spec, lifeScale, opts.fatal);
  if (!reducedMotion() && (spec.style !== 'drip' || opts.fatal)) {
    window.setTimeout(() => {
      if (!document.getElementById('battlefield-stage')) return;
      emitWave(origin, ichor, Math.max(1, (opts.amount || 1) * 0.78), spec, lifeScale, false);
      kick();
    }, 65);
    if (opts.fatal) {
      window.setTimeout(() => {
        if (!document.getElementById('battlefield-stage')) return;
        emitWave(origin, ichor, Math.max(2, (opts.amount || 1) * 0.6), spec, lifeScale, false);
        kick();
      }, 140);
    }
  }
  kick();
}
