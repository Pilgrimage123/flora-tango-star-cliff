// @ts-nocheck

function makePaletteArray(light, mid, dark, stain, stainRim, highlight, glow) {
  const arr = [...light, ...mid, ...dark];
  arr.light = light;
  arr.mid = mid;
  arr.dark = dark;
  arr.stain = stain;
  arr.stainRim = stainRim;
  arr.highlight = highlight;
  arr.glow = glow;
  return arr;
}

export const PALETTE = {
  red: makePaletteArray(
    ['#fff1f2', '#fecaca', '#fca5a5'],
    ['#f87171', '#ef4444', '#dc2626', '#b91c1c'],
    ['#991b1b', '#7f1d1d', '#450a0a', '#260404'],
    '#880808',
    '#3b0606',
    'rgba(255, 230, 230, 0.75)',
    'rgba(239, 68, 68, 0.35)'
  ),
  blue: makePaletteArray(
    ['#f0f9ff', '#bae6fd', '#7dd3fc'],
    ['#38bdf8', '#2563eb', '#1d4ed8', '#4f46e5'],
    ['#4338ca', '#312e81', '#1e1b4b', '#0f172a'],
    '#1e3a8a',
    '#0f172a',
    'rgba(224, 242, 254, 0.85)',
    'rgba(56, 189, 248, 0.45)'
  ),
  green: makePaletteArray(
    ['#f7fee7', '#d9f99d', '#bef264'],
    ['#a3e635', '#84cc16', '#65a30d', '#4d7c0f'],
    ['#3f6212', '#166534', '#14532d', '#052e16'],
    '#365314',
    '#052e16',
    'rgba(247, 254, 231, 0.8)',
    'rgba(163, 230, 53, 0.4)'
  )
};

const MAX_ALIVE = 320;
let canvas = null;
let ctx = null;
let particles = [];
let raf = 0;
let lastTs = 0;
let stageRect = null;

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
  if (kind === 'mist') return _pick(pal.light.concat(pal.mid));
  if (kind === 'bubble') return _pick(pal.mid);
  if (kind === 'glob') return _pick(pal.dark);
  if (kind === 'spurt') return _pick(pal.mid.concat(pal.dark));
  return _pick(pal.mid);
}

function rollKind(ichor, style, fatal = false) {
  const r = Math.random();
  if (style === 'drip') return r < 0.65 ? 'drop' : r < 0.85 ? 'spurt' : 'glob';
  if (fatal && r < 0.22) return 'spurt';
  if (ichor === 'blue') {
    if (r < 0.20) return 'mist';
    if (r < 0.36) return 'spark';
    if (r < 0.62) return 'spurt';
    if (r < 0.84) return 'drop';
    return 'glob';
  }
  if (ichor === 'green') {
    if (r < 0.28) return 'glob';
    if (r < 0.46) return 'bubble';
    if (r < 0.68) return 'drop';
    if (r < 0.86) return 'spurt';
    return 'mist';
  }
  // red
  if (r < 0.36) return 'spurt';
  if (r < 0.68) return 'drop';
  if (r < 0.86) return 'glob';
  return 'mist';
}

function spraySpec(reason, attackerCell, cell, fatal) {
  if (reason === 'death') {
    return { angle: -Math.PI / 2, spread: Math.PI * 0.95, speed: [2.6, 7.8], style: 'gush', countMul: 1.6 };
  }
  if (reason === 'bleed') {
    return { angle: Math.PI / 2, spread: 0.45, speed: [0.8, 2.8], style: 'drip', countMul: 0.6 };
  }
  if (reason === 'spikes') {
    return { angle: -Math.PI / 2, spread: 0.85, speed: [2.8, 6.8], style: 'fountain', countMul: 1.2 };
  }
  if (reason === 'wall_collision') {
    const away = cell <= 0 ? 0 : cell >= 6 ? Math.PI : -Math.PI / 2;
    return { angle: away, spread: 0.85, speed: [2.4, 5.8], style: 'burst', countMul: 1.1 };
  }
  if (typeof attackerCell === 'number' && attackerCell !== cell) {
    const away = Math.sign(cell - attackerCell) || 1;
    const angle = Math.atan2(-0.45, away);
    return { angle, spread: 0.85, speed: [2.6, 7.0], style: 'burst', countMul: fatal ? 1.4 : 1.1 };
  }
  return { angle: -Math.PI / 2, spread: 1.3, speed: [2.0, 6.0], style: 'burst', countMul: fatal ? 1.3 : 1 };
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
    const stainCount = fatal ? Math.floor(rand(2, 4)) : Math.min(3, 1 + Math.floor((amount || 1) / 2));
    for (let i = 0; i < stainCount; i++) {
      const type = reason === 'bleed'
        ? 'drip'
        : fatal
        ? _pick(['slash', 'splat'])
        : _pick(['slash', 'splat', 'drip', 'cluster']);

      const newStain = {
        id: `stain_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        type,
        x: Math.round(rand(22, 78)),
        y: Math.round(rand(type === 'drip' ? 45 : 25, 75)),
        scale: Number(rand(0.75, fatal ? 1.4 : 1.15).toFixed(2)),
        rot: Math.round(rand(-45, 45)),
        color: _pick(pal.mid),
        darkColor: _pick(pal.dark),
        highlight: pal.highlight,
        ichor,
        opacity: Number(rand(0.82, 0.96).toFixed(2))
      };

      if (state) {
        if (state.hero && (state.hero.id === targetId || targetId === 'hero_venca')) {
          state.hero.bloodStains = state.hero.bloodStains || [];
          state.hero.bloodStains.push(newStain);
          if (state.hero.bloodStains.length > 10) state.hero.bloodStains.shift();
        } else {
          const enemy = (state.enemies || []).find((e) => e.id === targetId);
          if (enemy) {
            enemy.bloodStains = enemy.bloodStains || [];
            enemy.bloodStains.push(newStain);
            if (enemy.bloodStains.length > 10) enemy.bloodStains.shift();
          }
        }
      }

      const list = entityStainsMap.get(targetId) || [];
      list.push(newStain);
      if (list.length > 10) list.shift();
      entityStainsMap.set(targetId, list);
    }
  }

  // 2. If attacker is adjacent (melee range), splatter attacker with target's ichor!
  if (attackerId && typeof attackerCell === 'number' && typeof targetCell === 'number') {
    if (Math.abs(attackerCell - targetCell) <= 1 && attackerId !== targetId) {
      const sprayStain = {
        id: `stain_spray_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        type: 'cluster',
        x: Math.round(rand(30, 70)),
        y: Math.round(rand(30, 70)),
        scale: Number(rand(0.65, 0.95).toFixed(2)),
        rot: Math.round(rand(-35, 35)),
        color: _pick(pal.mid),
        darkColor: _pick(pal.dark),
        highlight: pal.highlight,
        ichor,
        opacity: Number(rand(0.75, 0.9).toFixed(2))
      };

      if (state) {
        if (state.hero && (state.hero.id === attackerId || attackerId === 'hero_venca')) {
          state.hero.bloodStains = state.hero.bloodStains || [];
          state.hero.bloodStains.push(sprayStain);
          if (state.hero.bloodStains.length > 10) state.hero.bloodStains.shift();
        } else {
          const enemy = (state.enemies || []).find((e) => e.id === attackerId);
          if (enemy) {
            enemy.bloodStains = enemy.bloodStains || [];
            enemy.bloodStains.push(sprayStain);
            if (enemy.bloodStains.length > 10) enemy.bloodStains.shift();
          }
        }
      }

      const list = entityStainsMap.get(attackerId) || [];
      list.push(sprayStain);
      if (list.length > 10) list.shift();
      entityStainsMap.set(attackerId, list);
    }
  }

  // 3. Add ground stains to cell floor
  if (typeof targetCell === 'number' && targetCell >= 0) {
    const groundCount = fatal ? Math.floor(rand(2, 4)) : Math.min(3, 1 + Math.floor((amount || 1) / 3));
    for (let i = 0; i < groundCount; i++) {
      const splatCount = Math.floor(rand(3, 6));
      const splats = [];
      const rx = Number(rand(fatal ? 9 : 5, fatal ? 18 : 12).toFixed(1));
      const ry = Number((rx * rand(0.35, 0.55)).toFixed(1));

      for (let s = 0; s < splatCount; s++) {
        const ang = rand(0, Math.PI * 2);
        const dist = rand(rx * 1.1, rx * 2.2);
        splats.push({
          dx: Number((Math.cos(ang) * dist).toFixed(1)),
          dy: Number((Math.sin(ang) * dist * 0.5).toFixed(1)),
          r: Number(rand(1.2, 2.8).toFixed(1))
        });
      }

      const newGroundStain = {
        id: `gstain_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        x: Math.round(rand(18, 82)),
        y: Math.round(rand(fatal ? 48 : 56, 84)),
        rx,
        ry,
        rot: Math.round(rand(-28, 28)),
        color: _pick(pal.mid),
        rimColor: pal.stainRim,
        highlight: pal.highlight,
        ichor,
        splats,
        opacity: Number(rand(0.85, 0.98).toFixed(2))
      };

      if (state) {
        state.cellBlood = state.cellBlood || {};
        state.cellBlood[targetCell] = state.cellBlood[targetCell] || [];
        state.cellBlood[targetCell].push(newGroundStain);
        if (state.cellBlood[targetCell].length > 16) state.cellBlood[targetCell].shift();
      }

      const list = groundStainsMap.get(targetCell) || [];
      list.push(newGroundStain);
      if (list.length > 16) list.shift();
      groundStainsMap.set(targetCell, list);
    }
  }

  // 4. Real-time DOM injection if battlefield elements exist in document
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
      }
    }
    if (typeof targetCell === 'number') {
      const cellEl = document.querySelector(`.board-cell[data-cell-index="${targetCell}"]`);
      const groundZone = cellEl?.querySelector('.cell-ground-blood-zone');
      if (groundZone) {
        const gstains = getGroundStains(targetCell, state);
        groundZone.innerHTML = renderCellGroundBloodHtml(gstains);
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

  const shapes = stains.map((stain) => {
    const rx = stain.rx || 8;
    const ry = stain.ry || 4;
    const rimColor = stain.rimColor || '#1a0505';
    const color = stain.color || '#dc2626';
    const highlight = stain.highlight || 'rgba(255,255,255,0.6)';
    const opacity = stain.opacity || 0.9;
    const splats = stain.splats || [];

    const splatSvg = splats.map((s) => `
      <circle cx="${s.dx}" cy="${s.dy}" r="${s.r}" fill="${color}" opacity="0.9" />
      <circle cx="${s.dx - s.r * 0.25}" cy="${s.dy - s.r * 0.25}" r="${Math.max(0.4, s.r * 0.35)}" fill="${highlight}" opacity="0.6" />
    `).join('');

    return `
      <g transform="translate(${stain.x}, ${stain.y}) rotate(${stain.rot || 0})" opacity="${opacity}">
        <!-- Coagulated dark perimeter -->
        <ellipse cx="0" cy="0" rx="${(rx * 1.18).toFixed(1)}" ry="${(ry * 1.18).toFixed(1)}" fill="${rimColor}" opacity="0.95" />
        <!-- Rich liquid puddle -->
        <ellipse cx="0" cy="0" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${color}" opacity="0.92" />
        <!-- Specular shine -->
        <ellipse cx="${(-rx * 0.28).toFixed(1)}" cy="${(-ry * 0.25).toFixed(1)}" rx="${Math.max(1, rx * 0.38).toFixed(1)}" ry="${Math.max(0.6, ry * 0.28).toFixed(1)}" fill="${highlight}" opacity="0.65" />
        <!-- Satellite splatter droplets -->
        ${splatSvg}
      </g>
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

  const decals = stains.map((stain) => {
    const x = stain.x || 50;
    const y = stain.y || 50;
    const scale = stain.scale || 1;
    const rot = stain.rot || 0;
    const color = stain.color || '#dc2626';
    const darkColor = stain.darkColor || '#7f1d1d';
    const highlight = stain.highlight || 'rgba(255,255,255,0.7)';
    const opacity = stain.opacity || 0.9;

    let body = '';
    if (stain.type === 'slash') {
      body = `
        <path d="M -12 -5 Q -2 0 14 6" stroke="${darkColor}" stroke-width="4.2" stroke-linecap="round" fill="none" opacity="0.95" />
        <path d="M -11 -5 Q -2 0 13 6" stroke="${color}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.95" />
        <circle cx="-5" cy="-7" r="1.5" fill="${color}" />
        <circle cx="8" cy="8" r="1.3" fill="${color}" />
        <circle cx="16" cy="11" r="0.9" fill="${color}" />
      `;
    } else if (stain.type === 'drip') {
      body = `
        <path d="M 0 -8 C -2 -4 -2 6 0 10 C 2 6 2 -4 0 -8 Z" fill="${darkColor}" opacity="0.95" />
        <path d="M 0 -7 C -1.2 -3 -1.2 5 0 8.5 C 1.2 5 1.2 -3 0 -7 Z" fill="${color}" opacity="0.92" />
        <circle cx="0" cy="13" r="1.6" fill="${color}" />
        <circle cx="-0.4" cy="12.5" r="0.6" fill="${highlight}" opacity="0.75" />
      `;
    } else if (stain.type === 'cluster') {
      body = `
        <circle cx="0" cy="0" r="2.8" fill="${darkColor}" />
        <circle cx="0" cy="0" r="2.2" fill="${color}" />
        <circle cx="-0.6" cy="-0.6" r="0.8" fill="${highlight}" opacity="0.7" />
        <circle cx="-4" cy="-3" r="1.4" fill="${color}" />
        <circle cx="5" cy="-2" r="1.6" fill="${color}" />
        <circle cx="2" cy="4" r="1.2" fill="${color}" />
        <circle cx="-3" cy="3" r="1.0" fill="${color}" />
      `;
    } else {
      body = `
        <ellipse cx="0" cy="0" rx="4.8" ry="3.6" fill="${darkColor}" opacity="0.95" />
        <ellipse cx="0" cy="0" rx="3.8" ry="2.8" fill="${color}" opacity="0.92" />
        <circle cx="-1.2" cy="-1" r="1.1" fill="${highlight}" opacity="0.7" />
        <circle cx="-5" cy="-4" r="1.5" fill="${color}" />
        <circle cx="6" cy="3" r="1.8" fill="${color}" />
        <circle cx="-4" cy="5" r="1.2" fill="${color}" />
        <circle cx="4" cy="-5" r="1.3" fill="${color}" />
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
  const sr = stage.getBoundingClientRect();
  const cr = cell.getBoundingClientRect();
  const r = sprite ? sprite.getBoundingClientRect() : cr;
  stageRect = sr;
  return {
    x: r.left - sr.left + r.width * 0.5,
    y: r.top - sr.top + r.height * (sprite ? 0.44 : 0.55),
    ground: Math.min(sr.height - 8, cr.bottom - sr.top - 20),
    cellIdx: Number(cellIdx),
    cellLeft: cr.left - sr.left,
    cellWidth: cr.width
  };
}

function pushParticle(p) {
  particles.push(p);
  if (particles.length > MAX_ALIVE) {
    particles.splice(0, particles.length - MAX_ALIVE);
  }
}

function emitWave(origin, ichor, amount, spec, lifeScale, fatal = false) {
  const quiet = reducedMotion();
  let count = Math.round((28 + Math.min(50, (amount || 1) * 9)) * spec.countMul);
  if (quiet) count = Math.min(14, count);
  count = Math.max(spec.style === 'drip' ? 12 : 22, Math.min(count, quiet ? 14 : 96));

  if (fatal && spec.style === 'gush') {
    pushParticle({
      x: origin.x,
      y: origin.y,
      vx: 0,
      vy: 0,
      grav: 0,
      drag: 1,
      r: 6,
      maxR: 48,
      lineWidth: 3.5,
      life: 380 * lifeScale,
      maxLife: 380 * lifeScale,
      color: PALETTE[ichor]?.mid?.[1] || '#dc2626',
      kind: 'shockwave',
      ground: origin.ground
    });
  }

  for (let i = 0; i < count; i++) {
    const kind = rollKind(ichor, spec.style, fatal);
    const ang = spec.angle + rand(-spec.spread, spec.spread);
    const speed = rand(spec.speed[0], spec.speed[1]) * (kind === 'mist' ? 0.55 : kind === 'glob' ? 0.72 : kind === 'spurt' ? 1.25 : 1);
    const maxLife = (kind === 'mist' ? rand(420, 850) : kind === 'glob' ? rand(520, 920) : kind === 'spurt' ? rand(320, 680) : rand(380, 780)) * lifeScale;
    const grav =
      kind === 'bubble' ? -0.035 : kind === 'mist' ? ichor === 'blue' ? -0.012 : 0.02 : kind === 'spark' ? 0.02 : ichor === 'green' ? 0.16 : 0.13;
    
    pushParticle({
      x: origin.x + rand(-8, 8),
      y: origin.y + rand(-14, 10),
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      grav,
      drag: kind === 'mist' ? 0.985 : 0.992,
      r: kind === 'glob' ? rand(3.4, 6.2) : kind === 'mist' ? rand(2.2, 5.5) : kind === 'spark' ? rand(0.9, 1.8) : kind === 'spurt' ? rand(1.8, 3.6) : rand(1.4, 3.1),
      life: maxLife,
      maxLife,
      color: colorFor(ichor, kind),
      kind,
      ground: origin.ground,
      rot: rand(0, Math.PI),
      split: kind === 'glob'
    });
  }
}

function stepParticles(dt) {
  const next = [];
  const spawned = [];
  for (const p of particles) {
    p.life -= dt;
    if (p.life <= 0) continue;

    if (p.kind === 'shockwave') {
      p.r += (p.maxR - p.r) * 0.18;
      p.lineWidth = Math.max(0.4, p.lineWidth * 0.94);
      next.push(p);
      continue;
    }

    if (p.kind !== 'stain') {
      p.vy += p.grav * (dt / 16.67);
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.x += p.vx * (dt / 16.67);
      p.y += p.vy * (dt / 16.67);

      if (p.split && p.life < p.maxLife * 0.55) {
        p.split = false;
        for (let k = 0; k < 3; k++) {
          spawned.push({
            x: p.x,
            y: p.y,
            vx: p.vx * 0.4 + rand(-1.4, 1.4),
            vy: p.vy * 0.3 + rand(-1.6, 0.4),
            grav: 0.14,
            drag: 0.99,
            r: p.r * 0.45,
            life: p.life * 0.7,
            maxLife: p.life * 0.7,
            color: p.color,
            kind: 'drop',
            ground: p.ground,
            rot: 0,
            split: false
          });
        }
      }

      if (
        p.kind !== 'mist' &&
        p.kind !== 'bubble' &&
        p.kind !== 'spark' &&
        p.y >= p.ground &&
        p.vy > 0.2
      ) {
        // Small splash bounce upon impact
        if (p.vy > 0.4) {
          for (let b = 0; b < 2; b++) {
            spawned.push({
              x: p.x,
              y: p.ground - 1,
              vx: p.vx * 0.35 + rand(-1.4, 1.4),
              vy: rand(-1.1, -0.3),
              grav: 0.16,
              drag: 0.96,
              r: Math.max(0.7, p.r * 0.38),
              life: 240,
              maxLife: 240,
              color: p.color,
              kind: 'drop',
              ground: p.ground,
              rot: 0,
              split: false
            });
          }
        }
        p.kind = 'stain';
        p.y = p.ground;
        p.vx *= 0.1;
        p.vy = 0;
        p.grav = 0;
        p.r *= 1.6;
        p.life = Math.min(p.life, 420);
        p.maxLife = Math.max(p.maxLife, p.life);
      }
    } else {
      p.r *= 0.998;
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
    const alpha = p.kind === 'mist' ? fade * 0.38 : p.kind === 'stain' ? fade * 0.75 : fade;
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = p.color;

    if (p.kind === 'shockwave') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
    } else if (p.kind === 'spurt' || (p.kind === 'drop' && Math.hypot(p.vx, p.vy) > 1.2)) {
      const spd = Math.hypot(p.vx, p.vy);
      const angle = Math.atan2(p.vy, p.vx);
      const len = p.r * (1.2 + Math.min(3.2, spd * 0.45));
      const thick = Math.max(0.8, p.r * 0.85);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, len * 0.5, thick * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha * 0.75;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(len * 0.15, -thick * 0.15, Math.max(0.4, len * 0.22), Math.max(0.4, thick * 0.22), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (p.kind === 'spark') {
      const len = p.r * 2.8;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillRect(-len * 0.5, -0.75, len, 1.5);
      ctx.fillRect(-0.75, -len * 0.5, 1.5, len);
      ctx.restore();
    } else if (p.kind === 'bubble') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = alpha * 0.25;
      ctx.fill();
    } else if (p.kind === 'stain') {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r * 1.8, p.r * 0.65, p.rot, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === 'mist') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 1.8, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha * 0.7;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x - p.r * 0.28, p.y - p.r * 0.28, Math.max(0.4, p.r * 0.28), 0, Math.PI * 2);
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
      emitWave(origin, ichor, Math.max(1, (opts.amount || 1) * 0.7), spec, lifeScale, false);
      kick();
    }, 70);
  }
  kick();
}
