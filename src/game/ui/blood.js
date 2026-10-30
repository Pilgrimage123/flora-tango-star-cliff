// @ts-nocheck
const PALETTE = {
  red: ['#fff1f2', '#fecaca', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#7f1d1d', '#450a0a'],
  blue: ['#f0f9ff', '#bae6fd', '#38bdf8', '#2563eb', '#1d4ed8', '#6d28d9', '#312e81', '#1e1b4b'],
  green: ['#f7fee7', '#d9f99d', '#a3e635', '#65a30d', '#4d7c0f', '#166534', '#14532d', '#052e16']
};

const MAX_ALIVE = 260;
let canvas = null;
let ctx = null;
let particles = [];
let raf = 0;
let lastTs = 0;
let stageRect = null;

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

function pick(list) {
  return list[(Math.random() * list.length) | 0];
}

function colorFor(ichor, kind) {
  const colors = PALETTE[ichor] || PALETTE.red;
  if (kind === 'spark' || kind === 'mist') return colors[(Math.random() * 3) | 0];
  if (kind === 'glob' || kind === 'bubble') return colors[3 + ((Math.random() * (colors.length - 3)) | 0)];
  return colors[1 + ((Math.random() * (colors.length - 2)) | 0)];
}

function rollKind(ichor, style) {
  const r = Math.random();
  if (style === 'drip') return r < 0.62 ? 'drop' : r < 0.84 ? 'streak' : 'glob';
  if (ichor === 'blue') {
    if (r < 0.2) return 'mist';
    if (r < 0.36) return 'spark';
    if (r < 0.62) return 'streak';
    if (r < 0.84) return 'drop';
    return 'glob';
  }
  if (ichor === 'green') {
    if (r < 0.32) return 'glob';
    if (r < 0.48) return 'bubble';
    if (r < 0.68) return 'drop';
    if (r < 0.86) return 'streak';
    return 'mist';
  }
  if (r < 0.38) return 'streak';
  if (r < 0.7) return 'drop';
  if (r < 0.86) return 'glob';
  return 'mist';
}

function spraySpec(reason, attackerCell, cell, fatal) {
  if (reason === 'death') {
    return { angle: -Math.PI / 2, spread: Math.PI, speed: [2.2, 6.4], style: 'gush', countMul: 1.35 };
  }
  if (reason === 'bleed') {
    return { angle: Math.PI / 2, spread: 0.55, speed: [0.6, 2.2], style: 'drip', countMul: 0.45 };
  }
  if (reason === 'spikes') {
    return { angle: -Math.PI / 2, spread: 0.95, speed: [2.4, 5.8], style: 'fountain', countMul: 1 };
  }
  if (reason === 'wall_collision') {
    const away = cell <= 0 ? 0 : cell >= 6 ? Math.PI : -Math.PI / 2;
    return { angle: away, spread: 0.9, speed: [1.8, 4.6], style: 'burst', countMul: 0.85 };
  }
  if (typeof attackerCell === 'number' && attackerCell !== cell) {
    const away = Math.sign(cell - attackerCell) || 1;
    const angle = Math.atan2(-0.55, away);
    return { angle, spread: 0.95, speed: [2.2, 6.2], style: 'burst', countMul: fatal ? 1.25 : 1 };
  }
  return { angle: -Math.PI / 2, spread: 1.35, speed: [1.6, 5.2], style: 'burst', countMul: 1 };
}

function ensureCanvas() {
  if (typeof document === 'undefined') return false;
  if (canvas && canvas.isConnected && ctx) return true;
  canvas = document.createElement('canvas');
  canvas.className = 'blood-fx-layer';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  return Boolean(ctx);
}

function syncCanvas() {
  if (!canvas || !ctx) return;
  const stage = document.getElementById('battlefield-stage');
  if (stage) stageRect = stage.getBoundingClientRect();
  if (!stageRect || stageRect.width < 2) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(stageRect.width));
  const h = Math.max(1, Math.round(stageRect.height));
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  canvas.style.left = `${stageRect.left}px`;
  canvas.style.top = `${stageRect.top}px`;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function hitPoint(container, cellIdx) {
  const stage = container?.querySelector?.('#battlefield-stage') || document.getElementById('battlefield-stage');
  const cell = container?.querySelector?.(`.board-cell[data-cell-index="${cellIdx}"]`);
  if (!stage || !cell) return null;
  const sprite = cell.querySelector('.entity-sprite-img');
  const sr = stage.getBoundingClientRect();
  const r = (sprite || cell).getBoundingClientRect();
  stageRect = sr;
  return {
    x: r.left - sr.left + r.width * 0.5,
    y: r.top - sr.top + r.height * (sprite ? 0.46 : 0.58),
    ground: Math.min(sr.height - 6, r.bottom - sr.top - 2)
  };
}

function pushParticle(p) {
  particles.push(p);
  if (particles.length > MAX_ALIVE) {
    particles.splice(0, particles.length - MAX_ALIVE);
  }
}

function emitWave(origin, ichor, amount, spec, lifeScale) {
  const quiet = reducedMotion();
  let count = Math.round((26 + Math.min(40, (amount || 1) * 8)) * spec.countMul);
  if (quiet) count = Math.min(14, count);
  count = Math.max(spec.style === 'drip' ? 10 : 18, Math.min(count, quiet ? 14 : 72));

  for (let i = 0; i < count; i++) {
    const kind = rollKind(ichor, spec.style);
    const ang = spec.angle + rand(-spec.spread, spec.spread);
    const speed = rand(spec.speed[0], spec.speed[1]) * (kind === 'mist' ? 0.55 : kind === 'glob' ? 0.72 : 1);
    const maxLife = (kind === 'mist' ? rand(420, 780) : kind === 'glob' ? rand(520, 900) : rand(380, 760)) * lifeScale;
    const grav =
      kind === 'bubble' ? -0.035 : kind === 'mist' ? ichor === 'blue' ? -0.012 : 0.02 : kind === 'spark' ? 0.02 : ichor === 'green' ? 0.16 : 0.12;
    pushParticle({
      x: origin.x + rand(-10, 10),
      y: origin.y + rand(-16, 12),
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      grav,
      drag: kind === 'mist' ? 0.985 : 0.992,
      r: kind === 'glob' ? rand(3.4, 6.2) : kind === 'mist' ? rand(2.2, 5.5) : kind === 'spark' ? rand(0.8, 1.6) : rand(1.4, 3.1),
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
        p.kind = 'stain';
        p.y = p.ground;
        p.vx *= 0.12;
        p.vy = 0;
        p.grav = 0;
        p.r *= 1.85;
        p.life = Math.min(p.life, 640);
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
    const alpha = p.kind === 'mist' ? fade * 0.38 : p.kind === 'stain' ? fade * 0.8 : fade;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    if (p.kind === 'streak' || p.kind === 'spark') {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.atan2(p.vy, p.vx));
      const len = p.kind === 'spark' ? p.r * 3.2 : p.r * 4.6;
      ctx.fillRect(-len * 0.5, -p.r * 0.38, len, Math.max(1, p.r * 0.76));
      ctx.restore();
    } else if (p.kind === 'bubble') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = alpha * 0.22;
      ctx.fill();
    } else if (p.kind === 'stain') {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r * 1.7, p.r * 0.62, p.rot, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha * 0.65;
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath();
      ctx.arc(p.x - p.r * 0.28, p.y - p.r * 0.32, Math.max(0.4, p.r * 0.28), 0, Math.PI * 2);
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
  if (!ensureCanvas()) return;
  const origin = hitPoint(container, opts.cell);
  if (!origin) return;
  syncCanvas();
  const spec = spraySpec(opts.reason, opts.attackerCell, opts.cell, opts.fatal);
  const speed = opts.animSpeed > 0 ? opts.animSpeed : 1;
  const lifeScale = reducedMotion() ? 0.45 : 1 / Math.min(speed, 2.4);
  emitWave(origin, ichor, opts.amount || 1, spec, lifeScale);
  if (!reducedMotion() && spec.style !== 'drip') {
    window.setTimeout(() => {
      if (!document.getElementById('battlefield-stage')) return;
      emitWave(origin, ichor, Math.max(1, (opts.amount || 1) * 0.65), spec, lifeScale);
      kick();
    }, 70);
  }
  kick();
}
