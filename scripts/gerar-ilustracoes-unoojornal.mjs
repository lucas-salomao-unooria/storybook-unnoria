/**
 * Gera as ilustrações de demonstração do Unoojornal em `public/unoojornal/`:
 * doze fotografias (`foto-01.svg` … `foto-12.svg`, 960 × 640, proporção 3:2) e
 * seis retratos (`retrato-01.svg` … `retrato-06.svg`, 400 × 400).
 *
 * Uso: `node scripts/gerar-ilustracoes-unoojornal.mjs`
 *
 * São ilustrações geométricas planas, em camadas, escritas à mão neste script:
 * nenhuma imagem de terceiros, nenhum texto embutido, nenhuma pessoa real e
 * nenhum logotipo. O arquivo é determinístico (gerador pseudoaleatório com
 * semente), então rodar de novo reproduz os mesmos bytes.
 *
 * PALETA. Toda cor sai de `src/unooria/tokens/colors.css`, lida pelo nome do
 * degrau (`c('brandpurple-600')`); um degrau inexistente interrompe a geração.
 * Escalas usadas:
 *   brandpurple  50 100 200 300 400 500 600 700 800 900 950
 *   brandnavy    50 100 200 300 400 500 600 700 800 900
 *   neutral      50 100 150 200 300 400 500 600 700 800 900 950
 *   info         50 100 300 500 700   (azul de céu, vidro e luz de palco)
 *   success      50 100 300 400 500 600 700   (folhagem, líquidos)
 *   warning      50 100 200 300 500 600 800 900   (luz quente e tons de pele)
 *   danger       100 300 400 500 700   (cortinas, camisas, líquidos)
 * Os tons de pele dos retratos são degraus de `warning`, a única escala quente
 * da paleta; a variedade vem de 100 (claro) a 900 (escuro).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const saida = path.join(raiz, 'public', 'unoojornal');
const css = fs.readFileSync(path.join(raiz, 'src', 'unooria', 'tokens', 'colors.css'), 'utf8');

/** Cor da Plataforma Unooria pelo nome do degrau (`brandpurple-600`). */
const c = (nome) => {
  const achou = new RegExp(`--unooria-color-${nome}:\\s*(#[0-9A-Fa-f]{6})\\s*;`).exec(css);
  if (!achou) throw new Error(`Degrau de cor inexistente na Unooria: ${nome}`);
  return achou[1].toUpperCase();
};

/* ==========================================================================
   Instrumentos de desenho
   ========================================================================== */

/** Gerador pseudoaleatório determinístico (mulberry32). */
const semente = (valor) => {
  let a = valor >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const n = (valor) => String(Math.round(valor * 10) / 10);

const attrs = (objeto) =>
  Object.entries(objeto)
    .filter(([, valor]) => valor !== undefined && valor !== null)
    .map(([chave, valor]) => ` ${chave}="${valor}"`)
    .join('');

const el = (tag, atributos, filhos = '') =>
  filhos ? `<${tag}${attrs(atributos)}>${filhos}</${tag}>` : `<${tag}${attrs(atributos)}/>`;

const rect = (x, y, w, h, fill, o = {}) => el('rect', { x: n(x), y: n(y), width: n(w), height: n(h), fill, ...o });
const circle = (cx, cy, r, fill, o = {}) => el('circle', { cx: n(cx), cy: n(cy), r: n(r), fill, ...o });
const ellipse = (cx, cy, rx, ry, fill, o = {}) =>
  el('ellipse', { cx: n(cx), cy: n(cy), rx: n(rx), ry: n(ry), fill, ...o });
const poly = (pontos, fill, o = {}) =>
  el('polygon', { points: pontos.map(([x, y]) => `${n(x)},${n(y)}`).join(' '), fill, ...o });
const path_ = (d, fill, o = {}) => el('path', { d, fill, ...o });
const line = (x1, y1, x2, y2, stroke, largura, o = {}) =>
  el('line', { x1: n(x1), y1: n(y1), x2: n(x2), y2: n(y2), stroke, 'stroke-width': largura, 'stroke-linecap': 'round', ...o });
const group = (filhos, o = {}) => el('g', o, filhos);

/** Gradiente linear vertical (de cima para baixo) ou horizontal. */
const linear = (id, paradas, horizontal = false) =>
  el(
    'linearGradient',
    { id, x1: 0, y1: 0, x2: horizontal ? 1 : 0, y2: horizontal ? 0 : 1 },
    paradas.map(([deslocamento, cor]) => el('stop', { offset: deslocamento, 'stop-color': cor })).join('')
  );

const radial = (id, cor, opacidadeCentro = 1) =>
  el(
    'radialGradient',
    { id },
    el('stop', { offset: 0, 'stop-color': cor, 'stop-opacity': opacidadeCentro }) +
      el('stop', { offset: 1, 'stop-color': cor, 'stop-opacity': 0 })
  );

const svg = (largura, altura, defs, corpo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}" viewBox="0 0 ${largura} ${altura}">` +
  (defs ? `<defs>${defs}</defs>` : '') +
  `${corpo}</svg>\n`;

const W = 960;
const H = 640;
const pick = (r, lista) => lista[Math.floor(r() * lista.length)];

/* ==========================================================================
   Objetos reutilizáveis
   ========================================================================== */

const vidro = () => c('info-50');
const contorno = () => c('neutral-300');

/** Béquer: copo trapezoidal com líquido, bolhas e borda. */
const bequer = (x, y, w, h, liquido, nivel = 0.6, r = semente(3)) => {
  const topo = w;
  const base = w * 0.86;
  const corpo = [
    [x - topo / 2, y],
    [x + topo / 2, y],
    [x + base / 2, y + h],
    [x - base / 2, y + h],
  ];
  const yLiquido = y + h * (1 - nivel);
  const t = (yLiquido - y) / h;
  const larguraLiquido = topo + (base - topo) * t;
  let s = poly(corpo, vidro(), { opacity: 0.55 });
  s += poly(
    [
      [x - larguraLiquido / 2, yLiquido],
      [x + larguraLiquido / 2, yLiquido],
      [x + base / 2, y + h],
      [x - base / 2, y + h],
    ],
    liquido,
    { opacity: 0.9 }
  );
  s += line(x - larguraLiquido / 2, yLiquido, x + larguraLiquido / 2, yLiquido, c('neutral-50'), 2, { opacity: 0.6 });
  for (let i = 0; i < 4; i += 1) {
    s += circle(x + (r() - 0.5) * base * 0.6, yLiquido + 8 + r() * (y + h - yLiquido - 16), 2 + r() * 3, c('neutral-50'), {
      opacity: 0.55,
    });
  }
  s += poly(corpo, 'none', { stroke: contorno(), 'stroke-width': 3, 'stroke-linejoin': 'round' });
  s += line(x - topo / 2 - 5, y, x + topo / 2 + 5, y, contorno(), 3);
  s += line(x - topo / 2 + 10, y + 8, x - base / 2 + 12, y + h - 12, c('neutral-50'), 3, { opacity: 0.7 });
  return s;
};

/** Frasco de Erlenmeyer com líquido. */
const frasco = (x, y, s, liquido) => {
  const corpo = `M${n(x - 0.12 * s)} ${n(y)} H${n(x + 0.12 * s)} V${n(y + 0.35 * s)} L${n(x + 0.5 * s)} ${n(y + s)} H${n(x - 0.5 * s)} L${n(x - 0.12 * s)} ${n(y + 0.35 * s)} Z`;
  const meia = 0.12 + (0.5 - 0.12) * ((0.62 - 0.35) / 0.65);
  return (
    path_(corpo, vidro(), { opacity: 0.55 }) +
    poly(
      [
        [x - meia * s, y + 0.62 * s],
        [x + meia * s, y + 0.62 * s],
        [x + 0.5 * s, y + s],
        [x - 0.5 * s, y + s],
      ],
      liquido,
      { opacity: 0.9 }
    ) +
    path_(corpo, 'none', { stroke: contorno(), 'stroke-width': 3, 'stroke-linejoin': 'round' }) +
    line(x - 0.18 * s, y - 4, x + 0.18 * s, y - 4, contorno(), 4)
  );
};

/** Tubo de ensaio em pé. */
const tubo = (x, y, h, liquido) =>
  path_(`M${n(x - 8)} ${n(y)} V${n(y + h - 8)} A8 8 0 0 0 ${n(x + 8)} ${n(y + h - 8)} V${n(y)} Z`, vidro(), { opacity: 0.55 }) +
  path_(`M${n(x - 8)} ${n(y + h * 0.45)} V${n(y + h - 8)} A8 8 0 0 0 ${n(x + 8)} ${n(y + h - 8)} V${n(y + h * 0.45)} Z`, liquido, {
    opacity: 0.9,
  }) +
  path_(`M${n(x - 8)} ${n(y)} V${n(y + h - 8)} A8 8 0 0 0 ${n(x + 8)} ${n(y + h - 8)} V${n(y)}`, 'none', {
    stroke: contorno(),
    'stroke-width': 2.5,
  });

/** Cartaz: prancha com faixa de título, gráfico de barras e diagrama, sem texto. */
const cartaz = (x, y, w, h, cor, r) => {
  let s = rect(x, y, w, h, c('neutral-50'), { rx: 3 });
  s += rect(x, y, w, h * 0.16, cor, { rx: 3 });
  for (let i = 0; i < 4; i += 1) {
    const altura = (0.12 + r() * 0.32) * h;
    s += rect(x + w * 0.1 + i * w * 0.14, y + h * 0.74 - altura, w * 0.1, altura, pick(r, [c('info-500'), c('success-500'), c('warning-300'), c('danger-400')]));
  }
  s += circle(x + w * 0.72, y + h * 0.42, w * 0.14, 'none', { stroke: cor, 'stroke-width': 4 });
  s += circle(x + w * 0.72, y + h * 0.42, w * 0.05, cor);
  s += rect(x + w * 0.1, y + h * 0.8, w * 0.8, h * 0.035, c('neutral-200'), { rx: 2 });
  s += rect(x + w * 0.1, y + h * 0.88, w * 0.55, h * 0.035, c('neutral-200'), { rx: 2 });
  return s;
};

/** Cabeça e ombros de uma pessoa de plateia. */
const pessoa = (x, y, escala, pele, cabelo, roupa) =>
  ellipse(x, y + 52 * escala, 34 * escala, 26 * escala, roupa) +
  circle(x, y, 20 * escala, pele) +
  path_(
    `M${n(x - 21 * escala)} ${n(y - 2 * escala)} A${n(21 * escala)} ${n(22 * escala)} 0 0 1 ${n(x + 21 * escala)} ${n(y - 2 * escala)} Q${n(x)} ${n(y - 14 * escala)} ${n(x - 21 * escala)} ${n(y - 2 * escala)} Z`,
    cabelo
  );

const peles = () => [c('warning-100'), c('warning-200'), c('warning-300'), c('warning-600'), c('warning-800'), c('warning-900')];
const cabelos = () => [c('brandpurple-950'), c('warning-900'), c('neutral-800'), c('warning-800'), c('brandpurple-800'), c('neutral-500')];
const roupas = () => [
  c('brandpurple-600'),
  c('brandnavy-600'),
  c('danger-500'),
  c('success-600'),
  c('warning-300'),
  c('info-500'),
  c('brandpurple-300'),
  c('neutral-50'),
  c('brandnavy-800'),
];

/* ==========================================================================
   Fotografias
   ========================================================================== */

/** 01 — Feira de ciências: bancadas, cartazes e bandeirolas no ginásio. */
const foto01 = () => {
  const r = semente(101);
  const defs =
    linear('parede', [[0, c('brandpurple-100')], [1, c('brandpurple-200')]]) +
    linear('piso', [[0, c('neutral-150')], [1, c('neutral-200')]]);
  let s = rect(0, 0, W, 470, 'url(#parede)');
  for (let i = 0; i < 6; i += 1) {
    s += rect(54 + i * 150, 36, 112, 92, c('brandnavy-200'), { rx: 4 });
    s += rect(54 + i * 150, 36, 112, 92, 'none', { rx: 4, stroke: c('brandpurple-300'), 'stroke-width': 5 });
    s += line(110 + i * 150, 36, 110 + i * 150, 128, c('brandpurple-300'), 4);
    s += line(54 + i * 150, 82, 166 + i * 150, 82, c('brandpurple-300'), 4);
  }
  // bandeirolas
  s += path_(`M0 150 Q480 230 960 150`, 'none', { stroke: c('neutral-400'), 'stroke-width': 3 });
  const cores = [c('danger-400'), c('warning-300'), c('info-500'), c('success-400'), c('brandpurple-500')];
  for (let i = 0; i < 17; i += 1) {
    const t = (i + 0.5) / 17;
    const x = t * 960;
    const y = 150 + 2 * t * (1 - t) * 80;
    s += poly([[x - 16, y], [x + 16, y + 2], [x, y + 42]], cores[i % cores.length]);
  }
  // cartazes na parede
  for (let i = 0; i < 5; i += 1) s += cartaz(40 + i * 184, 250, 140, 150, pick(r, [c('brandpurple-600'), c('brandnavy-700'), c('info-700'), c('success-700')]), r);
  s += rect(0, 470, W, 170, 'url(#piso)');
  for (let i = 1; i < 6; i += 1) s += line(0, 470 + i * 34, W, 470 + i * 34, c('neutral-300'), 1.5, { opacity: 0.5 });
  // bancadas
  const bancadas = [
    { x: 40, cor: c('brandpurple-600') },
    { x: 350, cor: c('brandnavy-700') },
    { x: 660, cor: c('brandpurple-700') },
  ];
  bancadas.forEach(({ x, cor }, indice) => {
    s += ellipse(x + 130, 590, 150, 18, c('neutral-300'), { opacity: 0.5 });
    s += rect(x + 8, 440, 244, 150, cor, { rx: 3 });
    s += rect(x + 8, 440, 244, 150, c('brandpurple-950'), { opacity: 0.12, rx: 3 });
    s += poly([[x - 6, 424], [x + 266, 424], [x + 252, 442], [x + 8, 442]], c('neutral-50'));
    s += rect(x - 6, 418, 272, 10, c('neutral-100'), { rx: 3 });
    if (indice === 0) {
      s += cartaz(x + 120, 290, 110, 132, c('brandpurple-600'), r);
      s += bequer(x + 56, 360, 52, 58, c('info-500'), 0.62, r);
      s += frasco(x + 28, 380, 40, c('success-500'));
    } else if (indice === 1) {
      s += poly([[x + 40, 418], [x + 130, 418], [x + 112, 340], [x + 58, 340]], c('warning-600'));
      s += ellipse(x + 85, 340, 27, 8, c('warning-800'));
      s += circle(x + 85, 330, 8, c('danger-500'));
      s += cartaz(x + 160, 300, 84, 118, c('info-700'), r);
      s += rect(x + 20, 396, 40, 22, c('success-700'), { rx: 3 });
      for (let i = 0; i < 4; i += 1) s += circle(x + 28 + i * 9, 404, 2.2, c('warning-200'));
    } else {
      for (let i = 0; i < 5; i += 1) s += tubo(x + 40 + i * 28, 360, 58, [c('danger-400'), c('info-500'), c('success-400'), c('warning-300'), c('brandpurple-400')][i]);
      s += rect(x + 24, 396, 148, 12, c('neutral-400'), { rx: 3 });
      s += rect(x + 184, 340, 58, 78, c('neutral-100'), { rx: 6 });
      s += circle(x + 213, 372, 14, c('info-500'));
      s += circle(x + 213, 372, 6, c('info-100'));
    }
  });
  return svg(W, H, defs, s);
};

/** 02 — Telescópio e lua crescente no terraço, à noite. */
const foto02 = () => {
  const r = semente(202);
  const defs =
    linear('ceu', [[0, c('brandpurple-950')], [0.6, c('brandpurple-900')], [1, c('brandpurple-800')]]) +
    linear('terraco', [[0, c('neutral-800')], [1, c('neutral-950')]]) +
    el(
      'clipPath',
      { id: 'lua' },
      el('path', { 'clip-rule': 'evenodd', d: `M0 0H${W}V${H}H0Z M${695 - 82} 150a82 82 0 1 0 164 0a82 82 0 1 0 -164 0Z` })
    );
  let s = rect(0, 0, W, H, 'url(#ceu)');
  for (let i = 0; i < 110; i += 1) {
    s += circle(r() * W, r() * 400, 0.8 + r() * 1.6, c('brandpurple-100'), { opacity: (0.35 + r() * 0.65).toFixed(2) });
  }
  s += circle(745, 170, 175, c('brandnavy-200'), { opacity: 0.05 });
  s += circle(745, 170, 130, c('brandnavy-200'), { opacity: 0.08 });
  s += circle(745, 170, 90, c('brandnavy-100'), { 'clip-path': 'url(#lua)' });
  // linha do horizonte
  let x = -10;
  while (x < W) {
    const largura = 50 + r() * 70;
    const altura = 50 + r() * 130;
    s += rect(x, 520 - altura, largura, altura + 20, c('brandpurple-900'));
    for (let j = 0; j < 7; j += 1) {
      if (r() > 0.55) s += rect(x + 8 + (j % 3) * ((largura - 16) / 3), 520 - altura + 12 + Math.floor(j / 3) * 26, 8, 12, c('warning-200'), { opacity: 0.85 });
    }
    x += largura + 4;
  }
  s += rect(0, 514, W, 126, 'url(#terraco)');
  s += rect(0, 500, W, 14, c('neutral-700'));
  for (let i = 0; i < 30; i += 1) s += rect(10 + i * 32, 514, 8, 40, c('neutral-700'));
  s += rect(0, 550, W, 6, c('neutral-700'), { opacity: 0.6 });
  // tripé
  s += line(330, 438, 262, 620, c('neutral-300'), 9);
  s += line(330, 438, 402, 620, c('neutral-300'), 9);
  s += line(330, 438, 332, 626, c('neutral-400'), 9);
  s += line(296, 535, 366, 535, c('neutral-400'), 5);
  s += ellipse(330, 626, 100, 10, c('brandpurple-950'), { opacity: 0.35 });
  // tubo
  s += group(
    rect(186, 398, 306, 46, c('brandpurple-300'), { rx: 8 }) +
      rect(186, 398, 306, 14, c('brandpurple-100'), { rx: 8, opacity: 0.5 }) +
      rect(446, 394, 22, 54, c('brandpurple-500'), { rx: 4 }) +
      rect(204, 394, 14, 54, c('brandpurple-500'), { rx: 4 }) +
      rect(492, 402, 14, 38, c('brandpurple-700'), { rx: 3 }) +
      rect(250, 374, 110, 18, c('brandpurple-400'), { rx: 5 }) +
      rect(258, 388, 6, 12, c('neutral-300')) +
      rect(342, 388, 6, 12, c('neutral-300')) +
      rect(160, 414, 30, 18, c('neutral-200'), { rx: 4 }),
    { transform: 'rotate(-40 330 424)' }
  );
  s += circle(330, 436, 25, c('neutral-400'));
  s += circle(330, 436, 10, c('neutral-700'));
  return svg(W, H, defs, s);
};

/** Máscara de teatro (comédia ou tragédia). */
const mascara = (x, y, cor, alegre) => {
  let s = ellipse(x, y, 42, 54, cor);
  s += ellipse(x, y, 42, 54, 'none', { stroke: c('brandpurple-950'), 'stroke-width': 3, opacity: 0.4 });
  const lado = alegre ? -1 : 1;
  s += path_(`M${n(x - 28)} ${n(y - 12)} Q${n(x - 17)} ${n(y - 24)} ${n(x - 6)} ${n(y - 12)} Q${n(x - 17)} ${n(y - 16)} ${n(x - 28)} ${n(y - 12)} Z`, c('brandpurple-950'));
  s += path_(`M${n(x + 28)} ${n(y - 12)} Q${n(x + 17)} ${n(y - 24)} ${n(x + 6)} ${n(y - 12)} Q${n(x + 17)} ${n(y - 16)} ${n(x + 28)} ${n(y - 12)} Z`, c('brandpurple-950'));
  s += path_(`M${n(x - 22)} ${n(y + 22 + lado * 0)} Q${n(x)} ${n(y + 22 - lado * 24)} ${n(x + 22)} ${n(y + 22)}`, 'none', {
    stroke: c('brandpurple-950'),
    'stroke-width': 5,
    'stroke-linecap': 'round',
  });
  s += line(x - 30, y - 30, x - 8, y - 33 - lado * 5, c('brandpurple-950'), 3);
  s += line(x + 30, y - 30, x + 8, y - 33 - lado * 5, c('brandpurple-950'), 3);
  return s;
};

/** 03 — Palco de teatro com cortinas, cenário e máscaras. */
const foto03 = () => {
  const defs =
    linear('fundo', [[0, c('brandpurple-800')], [1, c('brandpurple-900')]]) +
    linear('tablado', [[0, c('brandpurple-500')], [1, c('brandpurple-700')]]) +
    radial('foco', c('warning-100'), 0.55);
  let s = rect(0, 0, W, 440, 'url(#fundo)');
  // painel de cenário
  s += rect(250, 160, 460, 280, c('brandnavy-200'));
  s += circle(480, 300, 74, c('warning-300'));
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    s += line(480 + Math.cos(a) * 86, 300 + Math.sin(a) * 86, 480 + Math.cos(a) * 112, 300 + Math.sin(a) * 112, c('warning-300'), 6);
  }
  s += rect(250, 380, 460, 60, c('brandnavy-400'));
  [[330, 360, 1], [610, 372, 0.8], [520, 392, 0.6]].forEach(([x, y, e]) => {
    s += rect(x - 14 * e, y - 70 * e, 28 * e, 100 * e, c('success-700'), { rx: 14 * e });
    s += rect(x - 36 * e, y - 40 * e, 14 * e, 40 * e, c('success-700'), { rx: 7 * e });
    s += rect(x - 36 * e, y - 6 * e, 30 * e, 12 * e, c('success-700'), { rx: 6 * e });
    s += rect(x + 22 * e, y - 54 * e, 14 * e, 40 * e, c('success-700'), { rx: 7 * e });
    s += rect(x + 6 * e, y - 22 * e, 30 * e, 12 * e, c('success-700'), { rx: 6 * e });
  });
  // tablado
  s += poly([[0, 440], [W, 440], [W, H], [0, H]], 'url(#tablado)');
  for (let i = -8; i <= 8; i += 1) s += line(480 + i * 40, 440, 480 + i * 130, H, c('brandpurple-800'), 2, { opacity: 0.55 });
  s += line(0, 500, W, 500, c('brandpurple-800'), 2, { opacity: 0.45 });
  s += line(0, 580, W, 580, c('brandpurple-800'), 2, { opacity: 0.45 });
  // foco de luz
  s += poly([[455, 40], [505, 40], [660, 540], [300, 540]], c('warning-100'), { opacity: 0.16 });
  s += ellipse(480, 540, 190, 36, c('warning-100'), { opacity: 0.28 });
  s += ellipse(480, 540, 260, 70, 'url(#foco)');
  // máscaras penduradas
  s += line(350, 70, 350, 120, c('neutral-300'), 3) + mascara(350, 175, c('warning-200'), true);
  s += line(610, 70, 610, 120, c('neutral-300'), 3) + mascara(610, 175, c('brandnavy-300'), false);
  // cortinas
  const cortina = (espelho) => {
    const f = (x) => (espelho ? W - x : x);
    let k = path_(`M${f(0)} 0 H${f(268)} C${f(244)} 150 ${f(128)} 320 ${f(64)} 640 H${f(0)} Z`, c('danger-700'));
    k += path_(`M${f(0)} 0 H${f(268)} C${f(244)} 150 ${f(128)} 320 ${f(64)} 640 H${f(0)} Z`, c('brandpurple-950'), { opacity: 0.35 });
    [[44, 20], [96, 38], [150, 60], [204, 82]].forEach(([topo, base], i) => {
      k += path_(`M${f(topo)} 0 C${f(topo + 6)} 220 ${f(base)} 420 ${f(base - 10)} 640`, 'none', {
        stroke: i % 2 ? c('danger-300') : c('brandpurple-950'),
        'stroke-width': 7,
        opacity: i % 2 ? 0.22 : 0.3,
      });
    });
    return k;
  };
  s += cortina(false) + cortina(true);
  // sanefa
  s += rect(0, 0, W, 66, c('danger-700'));
  s += rect(0, 0, W, 66, c('brandpurple-950'), { opacity: 0.25 });
  for (let i = 0; i < 13; i += 1) s += circle(37 + i * 74, 66, 37, c('danger-700'));
  for (let i = 0; i < 13; i += 1) s += circle(37 + i * 74, 66, 37, c('brandpurple-950'), { opacity: 0.25 });
  s += rect(0, 58, W, 6, c('warning-300'));
  return svg(W, H, defs, s);
};

/** 04 — Quadra de futsal vista de cima, com jogadoras e bola. */
const foto04 = () => {
  const defs = linear('quadra', [[0, c('brandnavy-700')], [1, c('brandnavy-800')]]);
  const branco = c('neutral-50');
  const x0 = 100;
  const y0 = 80;
  const cw = 760;
  const ch = 480;
  let s = rect(0, 0, W, H, c('brandpurple-800'));
  for (let i = 0; i < 12; i += 1) s += rect(0, i * 56, W, 28, c('brandpurple-900'), { opacity: 0.25 });
  s += rect(x0 - 30, y0 - 30, cw + 60, ch + 60, c('brandpurple-700'), { rx: 6 });
  s += rect(x0, y0, cw, ch, 'url(#quadra)');
  for (let i = 0; i < 8; i += 1) s += rect(x0 + i * (cw / 8), y0, cw / 16, ch, c('brandnavy-600'), { opacity: 0.22 });
  s += rect(x0, y0, cw, ch, 'none', { stroke: branco, 'stroke-width': 6 });
  s += line(x0 + cw / 2, y0, x0 + cw / 2, y0 + ch, branco, 6);
  s += circle(x0 + cw / 2, y0 + ch / 2, 70, 'none', { stroke: branco, 'stroke-width': 6 });
  s += circle(x0 + cw / 2, y0 + ch / 2, 7, branco);
  s += path_(`M${x0} ${y0 + 110} A130 130 0 0 1 ${x0} ${y0 + ch - 110} Z`, c('brandnavy-900'), { opacity: 0.4 });
  s += path_(`M${x0 + cw} ${y0 + 110} A130 130 0 0 0 ${x0 + cw} ${y0 + ch - 110} Z`, c('brandnavy-900'), { opacity: 0.4 });
  s += path_(`M${x0} ${y0 + 110} A130 130 0 0 1 ${x0} ${y0 + ch - 110}`, 'none', { stroke: branco, 'stroke-width': 6 });
  s += path_(`M${x0 + cw} ${y0 + 110} A130 130 0 0 0 ${x0 + cw} ${y0 + ch - 110}`, 'none', { stroke: branco, 'stroke-width': 6 });
  s += circle(x0 + 150, y0 + ch / 2, 6, branco) + circle(x0 + cw - 150, y0 + ch / 2, 6, branco);
  [-1, 1].forEach((lado) => {
    const gx = lado < 0 ? x0 - 34 : x0 + cw;
    s += rect(gx, y0 + ch / 2 - 40, 34, 80, c('neutral-100'), { opacity: 0.35 });
    for (let i = 1; i < 6; i += 1) s += line(gx, y0 + ch / 2 - 40 + i * 13.3, gx + 34, y0 + ch / 2 - 40 + i * 13.3, c('neutral-300'), 1.5);
    for (let i = 1; i < 3; i += 1) s += line(gx + i * 11.3, y0 + ch / 2 - 40, gx + i * 11.3, y0 + ch / 2 + 40, c('neutral-300'), 1.5);
    s += rect(gx, y0 + ch / 2 - 40, 34, 80, 'none', { stroke: branco, 'stroke-width': 5 });
  });
  const jogadora = (x, y, camisa, giro) =>
    group(
      ellipse(x + 4, y + 6, 26, 15, c('brandpurple-950'), { opacity: 0.22 }) +
        ellipse(x, y, 22, 13, camisa) +
        circle(x, y, 10.5, c('brandpurple-900')) +
        line(x - 22, y - 2, x - 36, y + 12, camisa, 8) +
        line(x + 22, y - 2, x + 36, y + 12, camisa, 8),
      { transform: `rotate(${giro} ${x} ${y})` }
    );
  [
    [330, 190, c('danger-500'), 20],
    [420, 330, c('danger-500'), -30],
    [250, 380, c('danger-500'), 70],
    [590, 220, c('neutral-50'), 200],
    [560, 340, c('neutral-50'), 160],
    [700, 420, c('neutral-50'), -120],
  ].forEach(([x, y, camisa, giro]) => {
    s += jogadora(x, y, camisa, giro);
  });
  s += circle(486, 326, 15, c('neutral-50'), { stroke: c('brandpurple-950'), 'stroke-width': 2 });
  s += poly([[486, 318], [493, 323], [491, 331], [481, 331], [479, 323]], c('brandpurple-950'));
  s += ellipse(496, 340, 16, 6, c('brandpurple-950'), { opacity: 0.25 });
  return svg(W, H, defs, s);
};

/** 05 — Biblioteca: estantes, mesa de estudo e luminária. */
const foto05 = () => {
  const r = semente(505);
  const defs =
    linear('parede', [[0, c('brandpurple-200')], [1, c('brandpurple-100')]]) +
    linear('piso', [[0, c('brandpurple-300')], [1, c('brandpurple-400')]]) +
    radial('luz', c('warning-200'), 0.7);
  let s = rect(0, 0, W, 400, 'url(#parede)');
  const livros = [c('brandpurple-600'), c('brandnavy-600'), c('danger-500'), c('success-600'), c('warning-300'), c('info-500'), c('brandpurple-300'), c('brandnavy-300'), c('neutral-50'), c('brandpurple-800'), c('warning-600')];
  [[40, 380], [350, 280], [680, 250]].forEach(([x, largura]) => {
    s += rect(x, 40, largura, 352, c('brandpurple-700'), { rx: 4 });
    for (let prateleira = 0; prateleira < 5; prateleira += 1) {
      const y = 50 + prateleira * 68;
      s += rect(x + 10, y, largura - 20, 62, c('brandpurple-900'), { opacity: 0.5 });
      let cx = x + 14;
      while (cx < x + largura - 24) {
        const lw = 12 + r() * 20;
        const lh = 38 + r() * 22;
        if (cx + lw > x + largura - 14) break;
        const cor = pick(r, livros);
        s += rect(cx, y + 62 - lh, lw, lh, cor, { rx: 1.5 });
        s += rect(cx + 2, y + 62 - lh + 8, lw - 4, 3, c('neutral-50'), { opacity: 0.55 });
        cx += lw + 1.5;
        if (r() > 0.93) cx += 18;
      }
      s += rect(x + 6, y + 62, largura - 12, 6, c('brandpurple-600'));
    }
  });
  s += rect(0, 400, W, 240, 'url(#piso)');
  s += rect(0, 400, W, 8, c('brandpurple-800'), { opacity: 0.4 });
  // mesa
  s += ellipse(480, 612, 320, 16, c('brandpurple-950'), { opacity: 0.25 });
  s += rect(260, 520, 18, 100, c('brandpurple-800'));
  s += rect(682, 520, 18, 100, c('brandpurple-800'));
  s += poly([[220, 520], [740, 520], [780, 466], [180, 466]], c('brandpurple-500'));
  s += rect(220, 520, 520, 22, c('brandpurple-700'));
  // livro aberto e pilha
  s += poly([[400, 494], [480, 480], [480, 512], [400, 520]], c('neutral-50'));
  s += poly([[480, 480], [560, 494], [560, 520], [480, 512]], c('neutral-100'));
  s += line(480, 480, 480, 512, c('neutral-300'), 2);
  for (let i = 0; i < 4; i += 1) {
    s += line(410, 497 + i * 5, 470, 487 + i * 5, c('neutral-300'), 1.5);
    s += line(490, 487 + i * 5, 550, 497 + i * 5, c('neutral-300'), 1.5);
  }
  s += rect(610, 488, 90, 14, c('danger-500'), { rx: 2 }) + rect(616, 474, 80, 14, c('info-500'), { rx: 2 }) + rect(604, 460, 94, 14, c('success-600'), { rx: 2 });
  // luminária
  s += ellipse(300, 497, 36, 8, c('neutral-800'));
  s += line(300, 495, 336, 410, c('neutral-700'), 7);
  s += line(336, 410, 392, 380, c('neutral-700'), 7);
  s += poly([[372, 372], [418, 366], [440, 404], [364, 410]], c('warning-300'));
  s += poly([[364, 410], [440, 404], [520, 520], [330, 520]], c('warning-100'), { opacity: 0.2 });
  s += circle(404, 420, 70, 'url(#luz)');
  // cadeira
  s += rect(430, 540, 100, 16, c('brandnavy-700'), { rx: 6 });
  s += rect(445, 556, 8, 56, c('neutral-700')) + rect(507, 556, 8, 56, c('neutral-700'));
  return svg(W, H, defs, s);
};

/** 06 — Palco de festival de música, com luzes e plateia. */
const foto06 = () => {
  const r = semente(606);
  const defs =
    linear('noite', [[0, c('brandpurple-950')], [1, c('brandpurple-800')]]) +
    radial('nevoa', c('brandpurple-300'), 0.35);
  let s = rect(0, 0, W, H, 'url(#noite)');
  // cenário de fundo
  s += rect(180, 150, 600, 290, c('brandpurple-800'), { rx: 6 });
  [200, 140, 80].forEach((raio, i) => s += circle(480, 300, raio, 'none', { stroke: c('brandpurple-700'), 'stroke-width': 14, opacity: 0.55 + i * 0.1 }));
  // treliça
  s += rect(60, 40, 840, 12, c('neutral-600')) + rect(60, 100, 840, 12, c('neutral-600'));
  for (let i = 0; i < 28; i += 1) s += line(60 + i * 30, 52, 90 + i * 30, 100, c('neutral-500'), 3);
  // refletores e feixes
  const feixes = [c('info-300'), c('brandpurple-300'), c('danger-300'), c('warning-200'), c('success-300'), c('brandnavy-300')];
  [140, 270, 400, 560, 690, 820].forEach((x, i) => {
    const alvo = 120 + i * 140 + (r() - 0.5) * 60;
    s += poly([[x - 12, 118], [x + 12, 118], [alvo + 90, 470], [alvo - 90, 470]], feixes[i], { opacity: 0.2 });
    s += ellipse(alvo, 470, 90, 12, feixes[i], { opacity: 0.35 });
    s += rect(x - 18, 108, 36, 24, c('neutral-800'), { rx: 5 });
    s += circle(x, 134, 11, feixes[i]);
  });
  // palco
  s += rect(0, 440, W, 90, c('neutral-800'));
  s += rect(0, 440, W, 8, c('neutral-600'));
  s += rect(0, 500, W, 30, c('neutral-950'));
  // bateria
  s += ellipse(480, 470, 100, 8, c('brandpurple-950'), { opacity: 0.4 });
  s += circle(480, 410, 58, c('neutral-50')) + circle(480, 410, 58, 'none', { stroke: c('brandpurple-600'), 'stroke-width': 12 }) + circle(480, 410, 14, c('neutral-200'));
  s += circle(412, 340, 34, c('neutral-50'), { stroke: c('brandpurple-600'), 'stroke-width': 8 });
  s += circle(548, 340, 34, c('neutral-50'), { stroke: c('brandpurple-600'), 'stroke-width': 8 });
  s += line(380, 440, 400, 280, c('neutral-400'), 4) + ellipse(385, 280, 52, 8, c('warning-300'), { transform: 'rotate(-10 385 280)' });
  s += line(590, 440, 572, 270, c('neutral-400'), 4) + ellipse(575, 270, 52, 8, c('warning-300'), { transform: 'rotate(10 575 270)' });
  // amplificadores
  [[70, 300], [78, 366]].forEach(([x, y]) => {
    s += rect(x, y, 140, 74, c('neutral-900'), { rx: 5 }) + circle(x + 38, y + 37, 24, c('neutral-700')) + circle(x + 38, y + 37, 8, c('neutral-900')) + circle(x + 102, y + 37, 24, c('neutral-700')) + circle(x + 102, y + 37, 8, c('neutral-900'));
  });
  // teclado e microfone
  s += rect(700, 396, 200, 18, c('neutral-950'), { rx: 3 });
  for (let i = 0; i < 14; i += 1) s += rect(703 + i * 14, 400, 11, 12, c('neutral-50'));
  s += line(740, 414, 724, 480, c('neutral-400'), 5) + line(860, 414, 876, 480, c('neutral-400'), 5);
  s += line(300, 480, 300, 330, c('neutral-300'), 5) + line(300, 332, 322, 316, c('neutral-300'), 5) + circle(326, 313, 10, c('neutral-100'));
  // névoa
  s += ellipse(480, 470, 420, 60, 'url(#nevoa)');
  // plateia
  s += rect(0, 590, W, 50, c('brandpurple-950'));
  for (let linha = 0; linha < 2; linha += 1) {
    const base = 566 + linha * 40;
    for (let x = -10; x < W + 30; x += 46 + r() * 10) {
      const cabeca = 24 + linha * 4;
      const topo = base - (r() > 0.85 ? 22 : 0);
      s += circle(x, topo, cabeca, c('brandpurple-950'));
      s += ellipse(x, topo + 48, 40, 36, c('brandpurple-950'));
      if (r() > 0.9) s += line(x + 22, topo + 36, x + 32, topo - 30, c('brandpurple-950'), 10);
    }
  }
  return svg(W, H, defs, s);
};

/** Peças de xadrez, com a base em `(cx, baseY)` e altura de referência 90 × escala. */
const pecas = {
  peao: (cx, y, e, cor, borda) =>
    ellipse(cx, y - 4 * e, 24 * e, 8 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    poly([[cx - 20 * e, y - 6 * e], [cx + 20 * e, y - 6 * e], [cx + 9 * e, y - 44 * e], [cx - 9 * e, y - 44 * e]], cor, { stroke: borda, 'stroke-width': 2 }) +
    circle(cx, y - 54 * e, 13 * e, cor, { stroke: borda, 'stroke-width': 2 }),
  torre: (cx, y, e, cor, borda) =>
    rect(cx - 26 * e, y - 10 * e, 52 * e, 10 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    poly([[cx - 20 * e, y - 10 * e], [cx + 20 * e, y - 10 * e], [cx + 15 * e, y - 62 * e], [cx - 15 * e, y - 62 * e]], cor, { stroke: borda, 'stroke-width': 2 }) +
    rect(cx - 22 * e, y - 80 * e, 44 * e, 20 * e, cor, { stroke: borda, 'stroke-width': 2 }),
  cavalo: (cx, y, e, cor, borda) =>
    rect(cx - 26 * e, y - 10 * e, 52 * e, 10 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    poly([[cx - 20 * e, y - 10 * e], [cx + 22 * e, y - 10 * e], [cx + 18 * e, y - 46 * e], [cx + 26 * e, y - 62 * e], [cx + 10 * e, y - 86 * e], [cx - 14 * e, y - 74 * e], [cx - 28 * e, y - 54 * e], [cx - 12 * e, y - 52 * e], [cx - 4 * e, y - 40 * e]], cor, { stroke: borda, 'stroke-width': 2, 'stroke-linejoin': 'round' }) +
    circle(cx + 4 * e, y - 68 * e, 3 * e, borda),
  bispo: (cx, y, e, cor, borda) =>
    rect(cx - 26 * e, y - 10 * e, 52 * e, 10 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    poly([[cx - 18 * e, y - 10 * e], [cx + 18 * e, y - 10 * e], [cx + 8 * e, y - 50 * e], [cx - 8 * e, y - 50 * e]], cor, { stroke: borda, 'stroke-width': 2 }) +
    ellipse(cx, y - 66 * e, 14 * e, 20 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    circle(cx, y - 90 * e, 5 * e, cor, { stroke: borda, 'stroke-width': 2 }),
  rainha: (cx, y, e, cor, borda) =>
    rect(cx - 28 * e, y - 10 * e, 56 * e, 10 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    poly([[cx - 22 * e, y - 10 * e], [cx + 22 * e, y - 10 * e], [cx + 10 * e, y - 70 * e], [cx - 10 * e, y - 70 * e]], cor, { stroke: borda, 'stroke-width': 2 }) +
    poly([[cx - 22 * e, y - 70 * e], [cx - 14 * e, y - 92 * e], [cx - 5 * e, y - 76 * e], [cx, y - 96 * e], [cx + 5 * e, y - 76 * e], [cx + 14 * e, y - 92 * e], [cx + 22 * e, y - 70 * e]], cor, { stroke: borda, 'stroke-width': 2, 'stroke-linejoin': 'round' }),
  rei: (cx, y, e, cor, borda) =>
    rect(cx - 28 * e, y - 10 * e, 56 * e, 10 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    poly([[cx - 22 * e, y - 10 * e], [cx + 22 * e, y - 10 * e], [cx + 11 * e, y - 72 * e], [cx - 11 * e, y - 72 * e]], cor, { stroke: borda, 'stroke-width': 2 }) +
    rect(cx - 18 * e, y - 84 * e, 36 * e, 14 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    rect(cx - 3 * e, y - 108 * e, 6 * e, 24 * e, cor, { stroke: borda, 'stroke-width': 2 }) +
    rect(cx - 11 * e, y - 100 * e, 22 * e, 6 * e, cor, { stroke: borda, 'stroke-width': 2 }),
};

/** 07 — Tabuleiro de xadrez em perspectiva, com as peças na posição inicial. */
const foto07 = () => {
  const defs =
    linear('mesa', [[0, c('brandpurple-800')], [1, c('brandpurple-950')]]) + radial('brilho', c('brandpurple-300'), 0.25);
  let s = rect(0, 0, W, H, 'url(#mesa)') + ellipse(480, 300, 460, 280, 'url(#brilho)');
  const yTopo = 140;
  const yBase = 520;
  const larguraTopo = 440;
  const larguraBase = 780;
  const larguraEm = (y) => larguraTopo + ((larguraBase - larguraTopo) * (y - yTopo)) / (yBase - yTopo);
  const yLinha = (i) => yTopo + (yBase - yTopo) * (1 - Math.pow(1 - i / 8, 1.35));
  const xEm = (y, coluna) => 480 - larguraEm(y) / 2 + (larguraEm(y) * coluna) / 8;
  // moldura e espessura
  s += poly([[480 - larguraTopo / 2 - 14, yTopo - 10], [480 + larguraTopo / 2 + 14, yTopo - 10], [480 + larguraBase / 2 + 26, yBase + 6], [480 - larguraBase / 2 - 26, yBase + 6]], c('brandpurple-700'));
  s += poly([[480 - larguraBase / 2 - 26, yBase + 6], [480 + larguraBase / 2 + 26, yBase + 6], [480 + larguraBase / 2 + 26, yBase + 40], [480 - larguraBase / 2 - 26, yBase + 40]], c('brandpurple-950'), { opacity: 0.85 });
  s += ellipse(480, yBase + 60, 430, 18, c('brandpurple-950'), { opacity: 0.4 });
  for (let linha = 0; linha < 8; linha += 1) {
    const y1 = yLinha(linha);
    const y2 = yLinha(linha + 1);
    for (let coluna = 0; coluna < 8; coluna += 1) {
      s += poly([[xEm(y1, coluna), y1], [xEm(y1, coluna + 1), y1], [xEm(y2, coluna + 1), y2], [xEm(y2, coluna), y2]], (linha + coluna) % 2 === 0 ? c('brandpurple-100') : c('brandpurple-600'));
    }
  }
  const ordem = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre'];
  const colocar = (linha, tipo, coluna, claro) => {
    const y1 = yLinha(linha);
    const y2 = yLinha(linha + 1);
    const y = y2 - (y2 - y1) * 0.18;
    const cx = (xEm(y, coluna) + xEm(y, coluna + 1)) / 2;
    const escala = larguraEm(y) / 720;
    return pecas[tipo](cx, y, escala, claro ? c('neutral-50') : c('brandpurple-900'), claro ? c('brandpurple-300') : c('brandpurple-950'));
  };
  for (let coluna = 0; coluna < 8; coluna += 1) {
    s += colocar(0, ordem[coluna], coluna, false);
    s += colocar(1, 'peao', coluna, false);
  }
  // sombras suaves das peças da frente ficam por conta da própria ordem de desenho
  for (let coluna = 0; coluna < 8; coluna += 1) {
    s += colocar(6, 'peao', coluna, true);
    s += colocar(7, ordem[coluna], coluna, true);
  }
  return svg(W, H, defs, s);
};

/** 08 — Auditório: palestrante diante de um telão e plateia de costas. */
const foto08 = () => {
  const r = semente(808);
  const defs =
    linear('parede', [[0, c('brandpurple-900')], [1, c('brandpurple-800')]]) +
    linear('palco', [[0, c('brandpurple-600')], [1, c('brandpurple-700')]]) +
    radial('foco', c('warning-100'), 0.4);
  let s = rect(0, 0, W, 360, 'url(#parede)');
  for (let i = 0; i < 9; i += 1) s += rect(i * 110 + 10, 0, 6, 360, c('brandpurple-700'), { opacity: 0.4 });
  // telão
  s += rect(238, 52, 484, 270, c('neutral-950'), { rx: 8 });
  s += rect(250, 64, 460, 246, c('neutral-50'), { rx: 4 });
  s += rect(250, 64, 460, 40, c('brandpurple-600'), { rx: 4 });
  [[290, 90, c('info-500')], [350, 130, c('success-500')], [410, 70, c('warning-300')], [470, 110, c('danger-400')]].forEach(([x, altura, cor]) => {
    s += rect(x, 290 - altura, 40, altura, cor, { rx: 3 });
  });
  s += circle(620, 200, 62, 'none', { stroke: c('brandpurple-200'), 'stroke-width': 24 });
  s += path_('M620 138 A62 62 0 0 1 682 200', 'none', { stroke: c('info-500'), 'stroke-width': 24 });
  s += path_('M682 200 A62 62 0 0 1 640 258', 'none', { stroke: c('warning-300'), 'stroke-width': 24 });
  s += rect(270, 122, 150, 10, c('neutral-200'), { rx: 5 });
  s += poly([[0, 346], [W, 346], [W, 420], [0, 420]], 'url(#palco)');
  s += rect(0, 346, W, 8, c('brandpurple-800'));
  // púlpito
  s += rect(110, 270, 112, 76, c('brandpurple-300'), { rx: 6 });
  s += rect(110, 270, 112, 14, c('brandpurple-100'), { rx: 6 });
  s += line(166, 270, 166, 232, c('neutral-300'), 5) + circle(166, 226, 8, c('neutral-100'));
  // palestrante
  s += ellipse(790, 410, 70, 12, c('brandpurple-950'), { opacity: 0.35 });
  s += rect(762, 304, 20, 100, c('neutral-800'), { rx: 6 }) + rect(792, 304, 20, 100, c('neutral-800'), { rx: 6 });
  s += rect(742, 206, 88, 112, c('brandnavy-800'), { rx: 18 });
  s += rect(780, 206, 12, 112, c('neutral-50'), { opacity: 0.8 });
  s += line(826, 232, 880, 200, c('brandnavy-800'), 22);
  s += line(748, 232, 702, 268, c('brandnavy-800'), 22) + line(702, 268, 624, 172, c('neutral-300'), 4);
  s += circle(786, 168, 30, c('warning-300'));
  s += path_('M756 166 A30 32 0 0 1 816 166 Q786 150 756 166 Z', c('brandpurple-950'));
  s += circle(776, 172, 3, c('brandpurple-950')) + circle(796, 172, 3, c('brandpurple-950'));
  s += ellipse(790, 330, 90, 160, 'url(#foco)');
  // plateia
  s += rect(0, 400, W, 240, c('brandpurple-950'));
  for (let linha = 0; linha < 5; linha += 1) {
    const e = 0.7 + linha * 0.32;
    const y = 400 + linha * 52 * (0.8 + linha * 0.1);
    const passo = 92 * e;
    const total = Math.ceil(W / passo) + 2;
    for (let i = 0; i < total; i += 1) {
      const x = -passo / 2 + i * passo + (r() - 0.5) * 8;
      s += rect(x - 34 * e, y + 28 * e, 68 * e, 80 * e, linha % 2 ? c('brandpurple-600') : c('brandpurple-500'), { rx: 10 * e });
      s += rect(x - 34 * e, y + 28 * e, 68 * e, 80 * e, c('brandpurple-950'), { rx: 10 * e, opacity: 0.2 + linha * 0.1 });
      if (r() > 0.12) s += pessoa(x, y, e, pick(r, peles()), pick(r, cabelos()), pick(r, roupas()));
    }
  }
  return svg(W, H, defs, s);
};

/** 09 — Laboratório: bancada com béqueres, frascos e tubos de ensaio. */
const foto09 = () => {
  const r = semente(909);
  const defs =
    linear('parede', [[0, c('brandnavy-100')], [1, c('brandnavy-200')]]) +
    linear('bancada', [[0, c('neutral-100')], [1, c('neutral-200')]]);
  let s = rect(0, 0, W, 470, 'url(#parede)');
  for (let i = 0; i < 16; i += 1) s += line(i * 64, 0, i * 64, 470, c('brandnavy-300'), 1.5, { opacity: 0.6 });
  for (let j = 0; j < 8; j += 1) s += line(0, j * 64, W, j * 64, c('brandnavy-300'), 1.5, { opacity: 0.6 });
  // janela
  s += rect(690, 40, 220, 180, c('info-100'), { rx: 6 }) + rect(690, 40, 220, 180, 'none', { rx: 6, stroke: c('neutral-50'), 'stroke-width': 10 });
  s += line(800, 40, 800, 220, c('neutral-50'), 8) + line(690, 130, 910, 130, c('neutral-50'), 8);
  s += poly([[700, 50], [760, 50], [700, 130]], c('neutral-50'), { opacity: 0.45 });
  // prateleira com potes
  s += rect(60, 160, 560, 12, c('neutral-400'), { rx: 3 });
  [[100, c('warning-300')], [170, c('danger-400')], [240, c('success-500')], [310, c('brandpurple-400')], [380, c('info-500')], [450, c('warning-200')], [520, c('brandnavy-600')]].forEach(([x, cor], i) => {
    const altura = 46 + (i % 3) * 14;
    s += rect(x - 20, 160 - altura, 40, altura, vidro(), { rx: 6, opacity: 0.8 });
    s += rect(x - 20, 160 - altura * 0.62, 40, altura * 0.62, cor, { rx: 6, opacity: 0.85 });
    s += rect(x - 14, 160 - altura - 8, 28, 10, c('neutral-700'), { rx: 3 });
    s += rect(x - 20, 160 - altura, 40, altura, 'none', { rx: 6, stroke: contorno(), 'stroke-width': 2.5 });
  });
  // bancada
  s += rect(0, 470, W, 28, 'url(#bancada)');
  s += rect(0, 470, W, 5, c('neutral-50'));
  s += rect(0, 498, W, 142, c('brandpurple-700'));
  for (let i = 0; i < 6; i += 1) {
    s += rect(20 + i * 158, 512, 140, 112, c('brandpurple-600'), { rx: 6 });
    s += rect(80 + i * 158, 556, 20, 8, c('brandpurple-200'), { rx: 4 });
  }
  // utensílios
  s += bequer(150, 330, 130, 136, c('info-500'), 0.62, r);
  s += bequer(290, 366, 84, 100, c('success-500'), 0.5, r);
  s += frasco(430, 348, 120, c('warning-300'));
  s += frasco(540, 380, 84, c('danger-400'));
  s += rect(630, 440, 190, 20, c('neutral-400'), { rx: 5 });
  [c('danger-400'), c('info-500'), c('success-400'), c('warning-300'), c('brandpurple-400'), c('brandnavy-500')].forEach((cor, i) => {
    s += tubo(656 + i * 30, 340, 108, cor);
  });
  // bico de Bunsen
  s += rect(838, 436, 54, 30, c('neutral-700'), { rx: 6 });
  s += rect(858, 372, 14, 66, c('neutral-500'));
  s += path_('M865 316 C846 342 848 366 865 378 C882 366 884 342 865 316 Z', c('warning-500'));
  s += path_('M865 340 C856 354 858 366 865 372 C872 366 874 354 865 340 Z', c('warning-200'));
  return svg(W, H, defs, s);
};

/** Árvore de copa arredondada. */
const arvore = (x, baseY, e, r) => {
  let s = ellipse(x, baseY + 6 * e, 70 * e, 12 * e, c('brandpurple-950'), { opacity: 0.18 });
  s += rect(x - 10 * e, baseY - 120 * e, 20 * e, 124 * e, c('neutral-700'), { rx: 5 * e });
  s += circle(x, baseY - 190 * e, 78 * e, c('success-600'));
  s += circle(x - 56 * e, baseY - 150 * e, 54 * e, c('success-700'));
  s += circle(x + 58 * e, baseY - 156 * e, 56 * e, c('success-600'));
  for (let i = 0; i < 6; i += 1) s += circle(x + (r() - 0.5) * 130 * e, baseY - (150 + r() * 80) * e, (10 + r() * 14) * e, c('success-500'), { opacity: 0.7 });
  return s;
};

/** 10 — Pátio da escola: prédio, mural, árvores e bancos. */
const foto10 = () => {
  const r = semente(1010);
  const defs =
    linear('ceu', [[0, c('brandnavy-300')], [1, c('brandnavy-50')]]) +
    linear('piso', [[0, c('neutral-150')], [1, c('neutral-200')]]);
  let s = rect(0, 0, W, 330, 'url(#ceu)');
  s += circle(150, 90, 40, c('warning-100'), { opacity: 0.9 }) + circle(150, 90, 62, c('warning-100'), { opacity: 0.25 });
  [[300, 70, 1], [700, 120, 0.8]].forEach(([x, y, e]) => {
    s += ellipse(x, y, 90 * e, 24 * e, c('neutral-50'), { opacity: 0.9 }) + ellipse(x + 50 * e, y - 14 * e, 54 * e, 22 * e, c('neutral-50'), { opacity: 0.9 });
  });
  // prédio
  s += rect(0, 170, W, 250, c('brandpurple-300'));
  s += rect(0, 150, W, 26, c('brandpurple-600'));
  for (let j = 0; j < 2; j += 1) {
    for (let i = 0; i < 9; i += 1) {
      const x = 380 + (i % 4) * 140 - 0;
      if (x + 90 > W) continue;
      s += rect(x, 196 + j * 100, 90, 70, c('brandnavy-200'), { rx: 3, stroke: c('brandpurple-500'), 'stroke-width': 5 });
      s += line(x + 45, 196 + j * 100, x + 45, 266 + j * 100, c('brandpurple-500'), 4);
      if (i >= 3) break;
    }
  }
  // mural
  s += rect(50, 200, 290, 190, c('neutral-50'), { rx: 8 });
  s += circle(120, 300, 54, c('danger-400')) + circle(190, 270, 40, c('warning-300')) + circle(260, 320, 50, c('info-500'));
  s += path_('M60 380 Q120 310 180 360 T330 340 V388 H60 Z', c('success-500'));
  s += poly([[220, 220], [262, 220], [241, 262]], c('brandpurple-600'));
  s += rect(50, 200, 290, 190, 'none', { rx: 8, stroke: c('brandpurple-600'), 'stroke-width': 6 });
  // porta
  s += rect(380, 330, 70, 90, c('brandpurple-700'), { rx: 4 }) + rect(386, 336, 26, 80, c('brandnavy-200'), { opacity: 0.8 }) + rect(418, 336, 26, 80, c('brandnavy-200'), { opacity: 0.8 });
  // piso
  s += rect(0, 420, W, 220, 'url(#piso)');
  for (let i = -10; i <= 10; i += 1) s += line(480 + i * 70, 420, 480 + i * 150, H, c('neutral-300'), 1.5, { opacity: 0.6 });
  for (let j = 1; j < 6; j += 1) s += line(0, 420 + j * j * 8, W, 420 + j * j * 8, c('neutral-300'), 1.5, { opacity: 0.6 });
  // árvores
  s += arvore(130, 470, 1, r) + arvore(860, 480, 1.1, r);
  s += arvore(600, 450, 0.7, r);
  // bancos
  const banco = (x, y, e) =>
    ellipse(x + 80 * e, y + 52 * e, 90 * e, 10 * e, c('brandpurple-950'), { opacity: 0.2 }) +
    rect(x, y, 160 * e, 14 * e, c('brandpurple-500'), { rx: 3 }) +
    rect(x, y - 38 * e, 160 * e, 12 * e, c('brandpurple-500'), { rx: 3 }) +
    rect(x + 10 * e, y - 38 * e, 8 * e, 40 * e, c('brandpurple-700')) +
    rect(x + 142 * e, y - 38 * e, 8 * e, 40 * e, c('brandpurple-700')) +
    rect(x + 14 * e, y + 14 * e, 10 * e, 38 * e, c('neutral-700')) +
    rect(x + 136 * e, y + 14 * e, 10 * e, 38 * e, c('neutral-700'));
  s += banco(260, 520, 1.1) + banco(560, 560, 1.3);
  // estudantes
  [[330, 508, c('brandnavy-600')], [400, 512, c('danger-500')], [650, 540, c('success-600')]].forEach(([x, y, roupa], i) => {
    s += pessoa(x, y, 0.8, peles()[i + 1], cabelos()[i], roupa);
  });
  return svg(W, H, defs, s);
};

/** 11 — Ginásio lotado: arquibancada, placar e torcida. */
const foto11 = () => {
  const r = semente(1111);
  const defs =
    linear('parede', [[0, c('brandpurple-200')], [1, c('brandpurple-100')]]) +
    linear('quadra', [[0, c('neutral-150')], [1, c('neutral-200')]]);
  let s = rect(0, 0, W, 300, 'url(#parede)');
  // cobertura e tesouras
  s += rect(0, 0, W, 38, c('brandpurple-700'));
  for (let i = 0; i < 16; i += 1) s += line(i * 64, 38, i * 64 + 64, 110, c('brandpurple-400'), 5) + line(i * 64 + 64, 38, i * 64 + 128, 110, c('brandpurple-400'), 5);
  s += rect(0, 104, W, 10, c('brandpurple-600'));
  // faixas
  [[110, c('brandpurple-600')], [220, c('brandnavy-600')], [740, c('danger-500')], [850, c('brandpurple-700')]].forEach(([x, cor]) => {
    s += rect(x, 120, 54, 100, cor);
    s += poly([[x, 220], [x + 54, 220], [x + 27, 244]], cor);
    s += circle(x + 27, 156, 14, c('neutral-50'), { opacity: 0.85 });
  });
  // placar
  s += rect(370, 124, 220, 92, c('neutral-950'), { rx: 8 });
  s += rect(380, 134, 200, 72, c('brandpurple-950'), { rx: 5 });
  [[408, 170], [468, 170], [528, 170]].forEach(([x, y]) => {
    for (let dy = 0; dy < 5; dy += 1) for (let dx = 0; dx < 3; dx += 1) {
      if (r() > 0.35) s += circle(x - 10 + dx * 10, y - 20 + dy * 10, 3, c('warning-300'));
    }
  });
  s += line(480, 124, 480, 114, c('neutral-600'), 4);
  // quadra ao fundo
  s += rect(0, 250, W, 90, 'url(#quadra)');
  s += rect(0, 250, W, 8, c('brandpurple-500'));
  s += line(0, 296, W, 296, c('brandpurple-300'), 3) + ellipse(480, 296, 90, 16, 'none', { stroke: c('brandpurple-300'), 'stroke-width': 3 });
  // arquibancadas laterais em degraus
  for (let k = 0; k < 4; k += 1) {
    s += rect(0, 256 + k * 18, 210 - k * 8, 18, k % 2 ? c('brandpurple-500') : c('brandpurple-400'));
    s += rect(W - 210 + k * 8, 256 + k * 18, 210 - k * 8, 18, k % 2 ? c('brandpurple-500') : c('brandpurple-400'));
  }
  // torcida
  const camisas = [c('brandpurple-600'), c('brandpurple-700'), c('brandnavy-600'), c('neutral-50'), c('danger-500'), c('brandpurple-300'), c('warning-300')];
  for (let linha = 0; linha < 8; linha += 1) {
    const e = 0.5 + linha * 0.22;
    const y = 330 + linha * linha * 3 + linha * 24;
    const passo = 40 * e + 8;
    for (let x = -20 + (linha % 2) * passo * 0.5; x < W + 30; x += passo) {
      const jx = x + (r() - 0.5) * passo * 0.35;
      const levantada = r() > 0.8;
      if (levantada) s += line(jx + 12 * e, y + 30 * e, jx + 26 * e, y - 36 * e, pick(r, peles()), 9 * e);
      s += pessoa(jx, y + (r() - 0.5) * 6, e, pick(r, peles()), pick(r, cabelos()), pick(r, camisas));
    }
  }
  return svg(W, H, defs, s);
};

/** 12 — Sala de coral: degraus, cadeiras com partituras e piano. */
const foto12 = () => {
  const r = semente(1212);
  const defs =
    linear('parede', [[0, c('brandpurple-200')], [1, c('brandpurple-100')]]) +
    linear('piso', [[0, c('brandpurple-300')], [1, c('brandpurple-400')]]) +
    radial('luz', c('warning-100'), 0.55);
  let s = rect(0, 0, W, 430, 'url(#parede)');
  // janela em arco
  s += path_('M380 330 V150 A100 100 0 0 1 580 150 V330 Z', c('brandnavy-200'));
  s += path_('M380 330 V150 A100 100 0 0 1 580 150 V330 Z', 'none', { stroke: c('brandpurple-500'), 'stroke-width': 10 });
  s += line(480, 50, 480, 330, c('brandpurple-500'), 7) + line(380, 200, 580, 200, c('brandpurple-500'), 7);
  s += circle(480, 200, 130, 'url(#luz)');
  // cortinas laterais
  s += path_('M0 0 H190 C150 120 140 240 110 430 H0 Z', c('brandpurple-600'));
  s += path_('M960 0 H770 C810 120 820 240 850 430 H960 Z', c('brandpurple-600'));
  [[40, 30], [90, 60], [870, 900], [820, 850]].forEach(([topo, base]) => {
    s += line(topo, 0, base, 420, c('brandpurple-800'), 5, { opacity: 0.3 });
  });
  s += rect(0, 430, W, 210, 'url(#piso)');
  // degraus
  const degraus = [
    { y: 420, x: 100, w: 760, cor: c('brandpurple-500'), cadeiras: 9 },
    { y: 352, x: 160, w: 640, cor: c('brandpurple-600'), cadeiras: 7 },
    { y: 284, x: 220, w: 520, cor: c('brandpurple-700'), cadeiras: 5 },
  ];
  degraus.slice().reverse().forEach(({ y, x, w, cor, cadeiras }) => {
    s += rect(x, y, w, 68, cor);
    s += rect(x, y, w, 12, c('brandpurple-300'), { opacity: 0.45 });
    s += rect(x, y + 56, w, 12, c('brandpurple-950'), { opacity: 0.25 });
    const passo = w / cadeiras;
    for (let i = 0; i < cadeiras; i += 1) {
      const cx = x + passo * (i + 0.5);
      s += rect(cx - 17, y - 56, 34, 50, c('neutral-700'), { rx: 5 });
      s += rect(cx - 21, y - 14, 42, 12, c('neutral-800'), { rx: 4 });
      s += rect(cx - 15, y - 40, 30, 34, c('neutral-50'), { rx: 2, transform: `rotate(${(r() - 0.5) * 8} ${cx} ${y - 24})` });
      for (let l = 0; l < 3; l += 1) s += line(cx - 11, y - 33 + l * 8, cx + 11, y - 33 + l * 8, c('neutral-200'), 1.5);
    }
  });
  // estante de partitura em primeiro plano
  s += line(150, 640, 150, 520, c('neutral-800'), 8);
  s += line(150, 610, 100, 640, c('neutral-800'), 6) + line(150, 610, 200, 640, c('neutral-800'), 6);
  s += poly([[100, 440], [200, 440], [210, 520], [90, 520]], c('neutral-800'));
  s += rect(104, 446, 92, 66, c('neutral-50'), { rx: 2 });
  for (let l = 0; l < 5; l += 1) s += line(112, 460 + l * 10, 188, 460 + l * 10, c('neutral-300'), 1.5);
  [124, 146, 168].forEach((x) => s += ellipse(x, 470 + ((x * 7) % 3) * 10, 5, 3.6, c('neutral-950')));
  // piano
  s += ellipse(790, 618, 150, 14, c('brandpurple-950'), { opacity: 0.3 });
  s += poly([[640, 470], [900, 470], [940, 410], [690, 410]], c('neutral-950'));
  s += rect(640, 470, 260, 104, c('neutral-950'), { rx: 6 });
  s += rect(656, 484, 228, 22, c('neutral-100'), { rx: 3 });
  for (let i = 0; i < 16; i += 1) s += line(656 + i * 14.25, 484, 656 + i * 14.25, 506, c('neutral-300'), 1.5);
  [0, 1, 3, 4, 5, 7, 8, 10, 11, 12].forEach((i) => s += rect(656 + i * 14.25 + 9, 484, 9, 14, c('neutral-950'), { rx: 1 }));
  s += rect(650, 574, 12, 46, c('neutral-950')) + rect(878, 574, 12, 46, c('neutral-950'));
  s += rect(730, 548, 90, 14, c('neutral-800'), { rx: 6 });
  return svg(W, H, defs, s);
};

/* ==========================================================================
   Retratos
   ========================================================================== */

const R = 400;

/** Cabeça, pescoço, ombros e rosto simples; devolve o desenho em camadas. */
const retrato = ({ fundo, pele, roupa, gola, cabeloTras = '', cabeloFrente = '', extras = '', brinco = '', sorriso = 'aberto' }) => {
  const traco = c('brandpurple-950');
  let s = rect(0, 0, R, R, fundo);
  s += circle(300, 80, 120, c('neutral-50'), { opacity: 0.16 }) + circle(60, 360, 100, c('neutral-50'), { opacity: 0.12 });
  s += cabeloTras;
  s += path_('M30 400 C30 322 112 288 200 288 C288 288 370 322 370 400 Z', roupa);
  s += path_('M168 288 L200 336 L232 288 Z', gola, { opacity: 0.95 });
  s += rect(170, 226, 60, 76, pele);
  s += rect(170, 262, 60, 36, traco, { opacity: 0.12 });
  s += ellipse(140, 196, 11, 17, pele) + ellipse(260, 196, 11, 17, pele);
  s += ellipse(200, 186, 62, 74, pele);
  s += circle(172, 196, 6.5, traco) + circle(228, 196, 6.5, traco);
  s += circle(174, 194, 2, c('neutral-50')) + circle(230, 194, 2, c('neutral-50'));
  s += path_('M158 176 Q172 168 186 175', 'none', { stroke: traco, 'stroke-width': 5, 'stroke-linecap': 'round' });
  s += path_('M214 175 Q228 168 242 176', 'none', { stroke: traco, 'stroke-width': 5, 'stroke-linecap': 'round' });
  s += path_('M200 200 Q194 218 202 222', 'none', { stroke: traco, 'stroke-width': 3.5, 'stroke-linecap': 'round', opacity: 0.4 });
  s += circle(158, 222, 10, c('danger-300'), { opacity: 0.4 }) + circle(242, 222, 10, c('danger-300'), { opacity: 0.4 });
  s +=
    sorriso === 'aberto'
      ? path_('M176 234 Q200 258 224 234 Q200 242 176 234 Z', c('neutral-50'), { stroke: traco, 'stroke-width': 4, 'stroke-linejoin': 'round' })
      : path_('M178 236 Q200 252 222 236', 'none', { stroke: traco, 'stroke-width': 5, 'stroke-linecap': 'round' });
  s += brinco + cabeloFrente + extras;
  return svg(R, R, '', s);
};

const retratos = () => {
  const traco = c('brandpurple-950');
  // 01 — cabelo longo e liso
  const r1 = retrato({
    fundo: c('brandpurple-200'),
    pele: c('warning-200'),
    roupa: c('brandnavy-600'),
    gola: c('neutral-50'),
    cabeloTras: path_('M122 190 C112 110 160 96 200 96 C240 96 288 110 278 190 C290 270 298 330 300 372 L100 372 C102 330 110 270 122 190 Z', c('warning-900')),
    cabeloFrente: path_('M134 188 C128 134 160 112 200 112 C240 112 272 134 266 188 C256 160 228 140 196 138 C166 140 144 160 134 188 Z', c('warning-900')),
    brinco: circle(138, 222, 5, c('warning-300')) + circle(262, 222, 5, c('warning-300')),
  });
  // 02 — cabelo cacheado e óculos redondos
  let cachos = '';
  for (let i = 0; i < 16; i += 1) {
    const a = Math.PI + (i / 15) * Math.PI;
    cachos += circle(200 + Math.cos(a) * 74, 176 + Math.sin(a) * 86, 26, traco);
  }
  cachos += circle(130, 214, 24, traco) + circle(270, 214, 24, traco);
  const r2 = retrato({
    fundo: c('brandnavy-200'),
    pele: c('warning-800'),
    roupa: c('warning-300'),
    gola: c('neutral-50'),
    cabeloTras: cachos,
    cabeloFrente: path_('M142 168 C150 128 250 128 258 168 C238 146 162 146 142 168 Z', traco),
    extras:
      circle(172, 196, 22, 'none', { stroke: c('neutral-950'), 'stroke-width': 5 }) +
      circle(228, 196, 22, 'none', { stroke: c('neutral-950'), 'stroke-width': 5 }) +
      line(194, 196, 206, 196, c('neutral-950'), 5),
  });
  // 03 — cabelo curto e camiseta lisa
  const r3 = retrato({
    fundo: c('success-100'),
    pele: c('warning-100'),
    roupa: c('brandpurple-700'),
    gola: c('brandpurple-300'),
    cabeloFrente: path_('M138 188 C130 118 170 104 210 106 C250 108 272 130 262 188 C256 156 244 144 226 142 C206 150 176 146 160 138 C150 150 142 166 138 188 Z', c('warning-800')),
    sorriso: 'fechado',
  });
  // 04 — coque alto e brincos grandes
  const r4 = retrato({
    fundo: c('warning-100'),
    pele: c('warning-900'),
    roupa: c('danger-400'),
    gola: c('neutral-50'),
    cabeloTras: circle(200, 92, 38, traco) + circle(200, 92, 38, c('brandpurple-800'), { opacity: 0.3 }),
    cabeloFrente: path_('M138 186 C130 120 166 108 200 108 C236 108 270 120 262 186 C252 150 232 138 200 138 C168 138 148 150 138 186 Z', traco),
    brinco: circle(138, 236, 9, c('warning-300')) + circle(262, 236, 9, c('warning-300')),
  });
  // 05 — cabelo raspado e barba curta
  const r5 = retrato({
    fundo: c('info-100'),
    pele: c('warning-300'),
    roupa: c('success-600'),
    gola: c('neutral-100'),
    cabeloFrente:
      path_('M140 176 C138 120 170 112 200 112 C230 112 262 120 260 176 C250 150 230 140 200 140 C170 140 150 150 140 176 Z', c('neutral-800')) +
      path_('M144 214 C146 258 170 282 200 282 C230 282 254 258 256 214 C246 238 226 250 200 250 C174 250 154 238 144 214 Z', c('neutral-800'), { opacity: 0.85 }),
  });
  // 06 — Redação: duas silhuetas sobrepostas, sem rosto
  const silhueta = (cx, cor, escala) =>
    group(
      circle(cx, 150, 52, cor) + path_(`M${cx - 96} 400 C${cx - 96} 300 ${cx - 50} 244 ${cx} 244 C${cx + 50} 244 ${cx + 96} 300 ${cx + 96} 400 Z`, cor),
      { transform: `translate(${n(cx - cx * escala)} ${n(400 - 400 * escala)}) scale(${escala})` }
    );
  const r6 = svg(
    R,
    R,
    '',
    rect(0, 0, R, R, c('brandpurple-300')) +
      circle(300, 80, 120, c('neutral-50'), { opacity: 0.16 }) +
      circle(60, 360, 100, c('neutral-50'), { opacity: 0.12 }) +
      silhueta(250, c('brandpurple-500'), 0.95) +
      silhueta(150, c('brandpurple-800'), 1) +
      rect(112, 346, 76, 54, c('neutral-50'), { rx: 6 }) +
      rect(124, 358, 52, 5, c('brandpurple-300'), { rx: 2.5 }) +
      rect(124, 372, 36, 5, c('brandpurple-300'), { rx: 2.5 })
  );
  return [r1, r2, r3, r4, r5, r6];
};

/* ==========================================================================
   Execução
   ========================================================================== */

fs.mkdirSync(saida, { recursive: true });

const fotos = [foto01, foto02, foto03, foto04, foto05, foto06, foto07, foto08, foto09, foto10, foto11, foto12];
fotos.forEach((fn, i) => fs.writeFileSync(path.join(saida, `foto-${String(i + 1).padStart(2, '0')}.svg`), fn()));
retratos().forEach((conteudo, i) => fs.writeFileSync(path.join(saida, `retrato-${String(i + 1).padStart(2, '0')}.svg`), conteudo));

console.log(`Ilustrações geradas em ${path.relative(raiz, saida)}: ${fotos.length} fotos e 6 retratos.`);
