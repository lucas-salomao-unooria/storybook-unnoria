/**
 * Gera as ilustrações de demonstração do Unooblog em `public/unooblog/`:
 * doze capas (`capa-01.svg` … `capa-12.svg`, 1280 × 720, proporção 16:9) e seis
 * retratos (`retrato-01.svg` … `retrato-06.svg`, 400 × 400).
 *
 * Uso: `node scripts/gerar-ilustracoes-unooblog.mjs`
 *
 * São ilustrações geométricas planas, em camadas, escritas à mão neste script:
 * nenhuma imagem de terceiros, nenhum texto embutido (`<text>`), nenhuma pessoa
 * real e nenhum logotipo. O arquivo é determinístico (gerador pseudoaleatório
 * com semente), então rodar de novo reproduz os mesmos bytes.
 *
 * CENAS (uma por assunto de post):
 *   01 wireframes de interface com componentes   07 paleta de cores e tipografia
 *   02 contraste de cores, amostras lado a lado   08 teclado com foco visível
 *   03 editor de código com linhas coloridas      09 formulário com campo em erro
 *   04 sala de aula com lousa e fluxograma        10 celular e tablet lado a lado
 *   05 escada de carreira                         11 estante de cadernos
 *   06 mesa de escrita com cadernos e caneta      12 gráfico de barras e linhas
 *
 * RETRATOS, na ordem em que as fixtures os citam: 01 cabelo longo e liso,
 * 02 cabelo curto, 03 coque alto e brincos, 04 cabelo raspado e barba curta,
 * 05 cabelo cacheado e óculos redondos, 06 duas silhuetas (imagem neutra).
 *
 * PALETA. Toda cor sai de `src/unooria/tokens/colors.css`, lida pelo nome do
 * degrau (`c('brandpurple-600')`); um degrau inexistente interrompe a geração.
 * Escalas usadas:
 *   brandpurple  50 100 200 300 400 500 600 700 800 900 950
 *   brandnavy    50 100 200 300 400 500 600 700 800 900
 *   neutral      50 100 150 200 300 400 500 600 700 800 900 950
 *   info         50 100 200 300 500 700        (azul de linha, vidro e código)
 *   success      50 100 200 300 400 500 600 700 800 900   (folhagem, lousa, aprovado)
 *   warning      50 100 200 300 400 500 600 700 800 900   (madeira, avisos, tons de pele)
 *   danger       50 100 200 300 400 500 600     (erro, reprovado, camisas)
 * Os tons de pele dos retratos são degraus de `warning`, a única escala quente
 * da paleta; a variedade vem de 100 (claro) a 900 (escuro).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const saida = path.join(raiz, 'public', 'unooblog');
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
const rotate = (graus, cx, cy) => `rotate(${n(graus)} ${n(cx)} ${n(cy)})`;

/** Retângulo arredondado. */
const rr = (x, y, w, h, raio, fill, o = {}) => rect(x, y, w, h, fill, { rx: n(raio), ...o });

/** Barra de texto abstrata (linha de texto sem letras). */
const barra = (x, y, w, cor, h = 10, o = {}) => rr(x, y, w, h, h / 2, cor, o);

/** Gradiente linear vertical (de cima para baixo) ou horizontal. */
const linear = (id, paradas, horizontal = false) =>
  el(
    'linearGradient',
    { id, x1: 0, y1: 0, x2: horizontal ? 1 : 0, y2: horizontal ? 0 : 1 },
    paradas.map(([deslocamento, cor]) => el('stop', { offset: deslocamento, 'stop-color': cor })).join('')
  );

const svg = (largura, altura, defs, corpo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}" viewBox="0 0 ${largura} ${altura}">` +
  (defs ? `<defs>${defs}</defs>` : '') +
  `${corpo}</svg>\n`;

const W = 1280;
const H = 720;
const pick = (r, lista) => lista[Math.floor(r() * lista.length)];

/** Fundo da capa: degradê suave com dois discos de luz. */
const fundo = (disco = 'brandpurple-300') =>
  rect(0, 0, W, H, 'url(#fundo)') +
  circle(1160, 70, 220, c(disco), { opacity: 0.22 }) +
  circle(90, 680, 190, c(disco), { opacity: 0.18 });
const defsFundo = (de, ate) => linear('fundo', [[0, c(de)], [1, c(ate)]]);

/** Sombra suave sob um objeto (retângulo deslocado, em cor da paleta). */
const sombra = (x, y, w, h, raio, cor = c('brandpurple-300'), desloc = 16, opacidade = 0.5) =>
  rr(x + 4, y + desloc, w, h, raio, cor, { opacity: opacidade });

/** Ícone de confirmação: círculo com marca de verificação. */
const confirmar = (cx, cy, r, cor) =>
  circle(cx, cy, r, cor) +
  path_(`M${n(cx - r * 0.45)} ${n(cy + r * 0.02)} L${n(cx - r * 0.1)} ${n(cy + r * 0.38)} L${n(cx + r * 0.5)} ${n(cy - r * 0.34)}`, 'none', {
    stroke: c('neutral-50'),
    'stroke-width': n(r * 0.28),
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  });

/** Ícone de recusa: círculo com um X. */
const recusar = (cx, cy, r, cor) =>
  circle(cx, cy, r, cor) +
  line(cx - r * 0.38, cy - r * 0.38, cx + r * 0.38, cy + r * 0.38, c('neutral-50'), n(r * 0.28)) +
  line(cx + r * 0.38, cy - r * 0.38, cx - r * 0.38, cy + r * 0.38, c('neutral-50'), n(r * 0.28));

/** Ícone de alerta: círculo com ponto de exclamação. */
const alertar = (cx, cy, r, cor) =>
  circle(cx, cy, r, cor) +
  line(cx, cy - r * 0.5, cx, cy + r * 0.08, c('neutral-50'), n(r * 0.26)) +
  circle(cx, cy + r * 0.45, r * 0.15, c('neutral-50'));

/* ==========================================================================
   Peças de interface reutilizadas
   ========================================================================== */

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
  c('warning-400'),
  c('info-500'),
  c('brandpurple-300'),
  c('brandnavy-800'),
];

/* ==========================================================================
   Capas
   ========================================================================== */

/** 01 — Wireframes de interface com componentes. */
const capa01 = () => {
  const r = semente(1101);
  let s = fundo();
  const defs = defsFundo('brandpurple-100', 'brandpurple-200');

  // Navegador em baixa fidelidade
  const x = 100;
  const y = 92;
  const w = 720;
  const h = 530;
  s += sombra(x, y, w, h, 22);
  s += rr(x, y, w, h, 20, c('neutral-50'));
  s += rr(x, y, w, 46, 20, c('neutral-100'));
  s += rect(x, y + 26, w, 20, c('neutral-100'));
  [0, 1, 2].forEach((i) => (s += circle(x + 28 + i * 22, y + 23, 6, c('neutral-300'))));
  s += rr(x + 120, y + 12, w - 240, 22, 11, c('neutral-200'));
  // cabeçalho
  s += rr(x + 30, y + 68, 34, 34, 9, c('brandpurple-600'));
  [0, 1, 2].forEach((i) => (s += barra(x + 92 + i * 86, y + 80, 62, c('neutral-300'), 11)));
  s += circle(x + w - 52, y + 85, 17, c('neutral-300'));
  s += rr(x + w - 168, y + 70, 82, 30, 15, c('neutral-150'));
  // herói: marcador de imagem com X
  const hx = x + 30;
  const hy = y + 126;
  const hw = w - 60;
  s += rr(hx, hy, hw, 170, 14, c('neutral-100'));
  s += rr(hx + 18, hy + 18, 290, 134, 10, c('neutral-200'));
  s += line(hx + 18, hy + 18, hx + 308, hy + 152, c('neutral-300'), 3);
  s += line(hx + 308, hy + 18, hx + 18, hy + 152, c('neutral-300'), 3);
  s += barra(hx + 344, hy + 30, 280, c('neutral-800'), 22);
  s += barra(hx + 344, hy + 66, 230, c('neutral-800'), 22);
  s += barra(hx + 344, hy + 102, 300, c('neutral-300'), 10);
  s += rr(hx + 344, hy + 124, 118, 32, 10, c('brandpurple-600'));
  s += rr(hx + 474, hy + 124, 104, 32, 10, 'none', { stroke: c('brandpurple-600'), 'stroke-width': 3 });
  // trilho de cartões
  const cw = (hw - 40) / 3;
  const cores = [c('brandpurple-300'), c('info-300'), c('success-300')];
  for (let i = 0; i < 3; i += 1) {
    const cx = hx + i * (cw + 20);
    const cy = y + 318;
    s += rr(cx, cy, cw, 190, 12, c('neutral-100'));
    s += rr(cx + 12, cy + 12, cw - 24, 82, 8, c('neutral-200'));
    s += poly([[cx + 30, cy + 84], [cx + 78, cy + 38], [cx + 114, cy + 70], [cx + 140, cy + 52], [cx + cw - 36, cy + 84]], cores[i], {
      opacity: 0.8,
    });
    s += barra(cx + 12, cy + 112, cw - 70, c('neutral-800'), 10);
    s += barra(cx + 12, cy + 132, cw - 24, c('neutral-300'), 8);
    s += barra(cx + 12, cy + 148, cw - 90, c('neutral-300'), 8);
    s += rr(cx + 12, cy + 164, 56, 16, 8, c('neutral-300'));
  }
  // anotações numeradas
  const nota = (ax, ay) =>
    circle(ax, ay, 17, c('brandpurple-600')) + circle(ax, ay, 6, c('neutral-50'));
  s += rr(hx - 6, y + 312, cw + 12, 202, 16, 'none', { stroke: c('brandpurple-600'), 'stroke-width': 3, 'stroke-dasharray': '10 8' });
  s += nota(hx - 6, y + 312) + nota(hx + hw, hy) + nota(hx + 344 + 118, hy + 140);

  // aparelho em baixa fidelidade
  const px = 862;
  const py = 150;
  s += sombra(px, py, 170, 380, 30);
  s += rr(px, py, 170, 380, 30, c('neutral-50'), { stroke: c('neutral-300'), 'stroke-width': 6 });
  s += rr(px + 58, py + 14, 54, 10, 5, c('neutral-300'));
  s += rr(px + 16, py + 44, 138, 92, 10, c('neutral-200'));
  s += line(px + 16, py + 44, px + 154, py + 136, c('neutral-300'), 3);
  s += line(px + 154, py + 44, px + 16, py + 136, c('neutral-300'), 3);
  s += barra(px + 16, py + 156, 110, c('neutral-800'), 10);
  s += barra(px + 16, py + 176, 138, c('neutral-300'), 8);
  s += barra(px + 16, py + 192, 90, c('neutral-300'), 8);
  s += rr(px + 16, py + 222, 138, 34, 10, c('brandpurple-600'));
  s += rr(px + 16, py + 268, 138, 46, 10, c('neutral-100'));
  s += rr(px + 16, py + 322, 138, 28, 10, c('neutral-100'));

  // folha de componentes
  const fx = 1060;
  const fy = 118;
  s += sombra(fx, fy, 140, 484, 20);
  s += rr(fx, fy, 140, 484, 20, c('neutral-50'));
  const linhaComp = (i, conteudo) => rr(fx + 14, fy + 16 + i * 66, 112, 52, 10, c('neutral-100')) + conteudo(fx + 14, fy + 16 + i * 66);
  s += linhaComp(0, (a, b) => rr(a + 14, b + 12, 84, 28, 10, c('brandpurple-600')));
  s += linhaComp(1, (a, b) => rr(a + 14, b + 12, 84, 28, 10, 'none', { stroke: c('brandpurple-600'), 'stroke-width': 3 }));
  s += linhaComp(2, (a, b) => rr(a + 12, b + 14, 88, 24, 6, c('neutral-50'), { stroke: c('neutral-400'), 'stroke-width': 2 }));
  s += linhaComp(3, (a, b) => rr(a + 28, b + 14, 56, 24, 12, c('brandpurple-600')) + circle(a + 72, b + 26, 9, c('neutral-50')));
  s += linhaComp(4, (a, b) => rr(a + 16, b + 14, 24, 24, 6, c('brandpurple-600')) + barra(a + 50, b + 21, 44, c('neutral-300'), 9));
  s += linhaComp(5, (a, b) => rr(a + 12, b + 15, 40, 22, 11, c('brandpurple-200')) + rr(a + 58, b + 15, 40, 22, 11, c('neutral-200')));
  s += linhaComp(6, (a, b) => circle(a + 34, b + 26, 14, c('brandpurple-600')) + barra(a + 58, b + 21, 40, c('neutral-300'), 9));

  // detalhe: marcas de grade
  for (let i = 0; i < 8; i += 1) s += circle(60 + r() * 1160, 40 + r() * 640, 2.5, c('brandpurple-400'), { opacity: 0.35 });
  return svg(W, H, defs, s);
};

/** 02 — Contraste de cores: amostras lado a lado, uma aprovada e outra reprovada. */
const capa02 = () => {
  const defs = defsFundo('brandpurple-50', 'brandpurple-200');
  let s = fundo();
  const cx0 = 90;
  const cy0 = 70;
  const cw = 1100;
  const ch = 580;
  s += sombra(cx0, cy0, cw, ch, 28);
  s += rr(cx0, cy0, cw, ch, 28, c('neutral-50'));

  const tw = 240;
  const th = 170;
  const gap = 24;
  const x0 = cx0 + (cw - (4 * tw + 3 * gap)) / 2;
  const pares = [
    // linha de cima: aprovadas
    [
      { fundo: c('brandpurple-950'), texto: c('brandpurple-50'), ok: true, razao: 0.92 },
      { fundo: c('brandpurple-600'), texto: c('neutral-50'), ok: true, razao: 0.5 },
      { fundo: c('brandpurple-100'), texto: c('brandpurple-900'), ok: true, razao: 0.8 },
      { fundo: c('neutral-50'), texto: c('brandpurple-700'), ok: true, razao: 0.58, borda: true },
    ],
    // linha de baixo: reprovadas
    [
      { fundo: c('brandpurple-300'), texto: c('brandpurple-50'), ok: false, razao: 0.12 },
      { fundo: c('warning-300'), texto: c('neutral-50'), ok: false, razao: 0.08 },
      { fundo: c('brandpurple-100'), texto: c('brandpurple-300'), ok: false, razao: 0.14 },
      { fundo: c('info-200'), texto: c('info-50'), ok: false, razao: 0.06 },
    ],
  ];
  pares.forEach((linhaPares, linha) => {
    const y = cy0 + 34 + linha * 268;
    linhaPares.forEach((par, i) => {
      const x = x0 + i * (tw + gap);
      s += rr(x, y, tw, th, 18, par.fundo, par.borda ? { stroke: c('neutral-200'), 'stroke-width': 3 } : {});
      // "Aa" abstrato: barra grossa e linhas
      s += barra(x + 24, y + 28, 130, par.texto, 28);
      s += barra(x + 24, y + 78, 180, par.texto, 12);
      s += barra(x + 24, y + 100, 150, par.texto, 12);
      s += circle(x + tw - 40, y + th - 38, 16, par.texto);
      // medidor e selo
      const my = y + th + 24;
      s += rr(x, my, tw - 52, 14, 7, c('neutral-150'));
      s += rr(x, my, (tw - 52) * par.razao, 14, 7, par.ok ? c('success-600') : c('danger-500'));
      s += line(x + (tw - 52) * 0.2, my - 6, x + (tw - 52) * 0.2, my + 20, c('brandpurple-950'), 3);
      s += par.ok ? confirmar(x + tw - 18, my + 7, 18, c('success-600')) : recusar(x + tw - 18, my + 7, 18, c('danger-500'));
    });
  });
  return svg(W, H, defs, s);
};

/** 03 — Editor de código: janela escura com linhas coloridas e duas linhas destacadas. */
const capa03 = () => {
  const defs = defsFundo('brandpurple-200', 'brandpurple-100');
  let s = fundo();
  const x = 120;
  const y = 84;
  const w = 1040;
  const h = 552;
  // janela atrás, levemente deslocada
  s += rr(x + 36, y - 22, w - 24, h, 18, c('brandpurple-300'), { opacity: 0.55 });
  s += sombra(x, y, w, h, 18, c('brandpurple-800'), 18, 0.35);
  s += rr(x, y, w, h, 18, c('brandpurple-950'));
  // barra de título e abas
  s += rr(x, y, w, 46, 18, c('brandpurple-900'));
  s += rect(x, y + 28, w, 18, c('brandpurple-900'));
  s += circle(x + 28, y + 23, 7, c('danger-400')) + circle(x + 52, y + 23, 7, c('warning-400')) + circle(x + 76, y + 23, 7, c('success-400'));
  s += rr(x + 120, y + 10, 150, 36, 8, c('brandpurple-950'));
  s += barra(x + 140, y + 24, 90, c('neutral-300'), 9);
  s += barra(x + 300, y + 24, 80, c('brandpurple-600'), 9, { opacity: 0.8 });
  // barra lateral de arquivos
  s += rect(x, y + 46, 200, h - 46 - 30, c('brandpurple-900'), { opacity: 0.7 });
  const arquivos = [
    [0, 90, c('brandpurple-300')],
    [1, 120, c('info-300')],
    [1, 100, c('info-300')],
    [1, 130, c('success-300')],
    [0, 80, c('brandpurple-300')],
    [1, 110, c('warning-300')],
    [1, 70, c('warning-300')],
    [0, 96, c('brandpurple-300')],
  ];
  arquivos.forEach(([nivel, largura, cor], i) => {
    const ry = y + 70 + i * 34;
    if (i === 2) s += rr(x + 8, ry - 10, 184, 30, 8, c('brandpurple-800'));
    s += rr(x + 24 + nivel * 18, ry - 2, 14, 14, 4, cor);
    s += barra(x + 48 + nivel * 18, ry, largura - nivel * 20, c('neutral-300'), 9, { opacity: 0.85 });
  });
  // linhas de código
  const T = {
    k: c('brandpurple-300'),
    s: c('success-300'),
    f: c('info-300'),
    n: c('warning-300'),
    t: c('neutral-400'),
    c: c('neutral-600'),
    p: c('danger-300'),
  };
  const linhas = [
    [0, ['k', 58], ['t', 20], ['f', 110], ['t', 34]],
    [1, ['k', 44], ['t', 18], ['p', 90], ['t', 18], ['f', 70]],
    [1, ['c', 220]],
    [1, ['k', 70], ['f', 130], ['t', 24], ['s', 96]],
    [2, ['p', 80], ['t', 16], ['n', 44], ['t', 18]],
    [2, ['p', 100], ['t', 16], ['s', 150], ['t', 18]],
    [1, ['t', 20], ['t', 14]],
    [0, ['k', 66], ['t', 18], ['f', 150], ['t', 26], ['p', 60]],
    [1, ['k', 40], ['t', 16], ['f', 120], ['t', 22], ['n', 36]],
    [2, ['f', 96], ['t', 18], ['s', 180]],
    [2, ['f', 84], ['t', 18], ['p', 70], ['t', 18], ['n', 32]],
    [1, ['t', 16]],
    [0, ['c', 160]],
    [0, ['k', 58], ['t', 20], ['f', 140], ['t', 30]],
    [1, ['k', 52], ['t', 18], ['s', 110]],
    [0, ['t', 14]],
  ];
  const gx = x + 230;
  const ly = (i) => y + 76 + i * 29;
  [3, 4].forEach((i) => {
    s += rect(gx - 8, ly(i) - 12, w - 230 - 130, 26, c('brandpurple-800'), { opacity: 0.85 });
    s += rect(gx - 8, ly(i) - 12, 5, 26, c('brandpurple-400'));
  });
  linhas.forEach(([nivel, ...tokens], i) => {
    s += rr(gx, ly(i) - 4, 22, 9, 4.5, c('brandpurple-600'), { opacity: 0.55 });
    let px = gx + 52 + nivel * 28;
    tokens.forEach(([tipo, largura]) => {
      s += barra(px, ly(i) - 4, largura, T[tipo], 10);
      px += largura + 10;
    });
  });
  // cursor
  s += rect(gx + 52 + 28 * 2 + 80 + 16 + 44 + 28, ly(4) - 8, 3, 18, c('neutral-50'));
  // minimapa
  const mx = x + w - 112;
  const rm = semente(303);
  for (let i = 0; i < 26; i += 1) {
    s += barra(mx, y + 70 + i * 14, 20 + rm() * 70, pick(rm, Object.values(T)), 5, { opacity: 0.45 });
  }
  s += rr(mx - 8, y + 62 + 3 * 14, 94, 14 * 8, 6, c('brandpurple-300'), { opacity: 0.14 });
  // barra de estado
  s += rect(x, y + h - 30, w, 30, c('brandpurple-700'));
  s += rr(x, y + h - 30, w, 30, 18, c('brandpurple-700'));
  s += rect(x, y + h - 30, w, 12, c('brandpurple-700'));
  s += barra(x + 22, y + h - 20, 90, c('brandpurple-100'), 9, { opacity: 0.8 });
  s += barra(x + 130, y + h - 20, 60, c('brandpurple-100'), 9, { opacity: 0.5 });
  s += barra(x + w - 150, y + h - 20, 120, c('brandpurple-100'), 9, { opacity: 0.5 });
  return svg(W, H, defs, s);
};

/** 04 — Sala de aula: lousa com fluxograma, janela, relógio e carteiras. */
const capa04 = () => {
  const r = semente(1104);
  const defs =
    linear('parede', [[0, c('brandpurple-100')], [1, c('brandpurple-200')]]) +
    linear('piso', [[0, c('neutral-200')], [1, c('neutral-300')]]) +
    linear('lousa', [[0, c('success-800')], [1, c('success-900')]]);
  let s = rect(0, 0, W, 520, 'url(#parede)') + rect(0, 520, W, 200, 'url(#piso)');
  for (let i = 1; i < 6; i += 1) s += line(0, 520 + i * 34, W, 520 + i * 34, c('neutral-400'), 1.5, { opacity: 0.4 });
  s += rect(0, 508, W, 14, c('brandpurple-300'));
  // janela
  s += rr(60, 100, 190, 270, 8, c('neutral-50'));
  s += rr(76, 116, 158, 238, 4, c('info-100'));
  s += circle(150, 190, 34, c('warning-200'));
  s += path_('M76 354 L76 300 Q116 262 150 290 Q196 252 234 300 L234 354 Z', c('success-400'), { opacity: 0.8 });
  s += line(155, 116, 155, 354, c('neutral-50'), 8) + line(76, 235, 234, 235, c('neutral-50'), 8);
  // lousa
  s += sombra(300, 84, 700, 330, 12, c('brandpurple-300'), 12, 0.5);
  s += rr(300, 84, 700, 330, 12, c('warning-700'));
  s += rr(318, 102, 664, 294, 6, 'url(#lousa)');
  s += rr(318, 102, 664, 294, 6, c('neutral-50'), { opacity: 0.05 });
  s += rr(480, 396, 340, 18, 6, c('warning-800'));
  s += rr(520, 388, 56, 10, 4, c('neutral-50')) + rr(590, 388, 42, 10, 4, c('warning-300'));
  // fluxograma de giz
  const giz = { stroke: c('neutral-50'), 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.92 };
  s += rr(372, 140, 136, 56, 28, 'none', giz);
  s += path_('M440 196 V228', 'none', giz) + poly([[440, 240], [432, 224], [448, 224]], c('neutral-50'), { opacity: 0.92 });
  s += poly([[440, 240], [520, 290], [440, 340], [360, 290]], 'none', giz);
  s += path_('M520 290 H600', 'none', giz) + poly([[612, 290], [596, 282], [596, 298]], c('neutral-50'), { opacity: 0.92 });
  s += rr(614, 262, 150, 56, 10, 'none', giz);
  s += path_('M764 290 H830 Q860 290 860 260 V200 Q860 168 828 168 H540', 'none', { ...giz, 'stroke-dasharray': '2 12', stroke: c('warning-300') });
  s += poly([[524, 168], [540, 160], [540, 176]], c('warning-300'));
  s += rr(560, 140, 150, 56, 10, 'none', giz);
  s += barra(392, 160, 96, c('neutral-50'), 8, { opacity: 0.5 });
  s += barra(634, 282, 110, c('neutral-50'), 8, { opacity: 0.5 });
  s += barra(582, 160, 106, c('neutral-50'), 8, { opacity: 0.5 });
  s += barra(406, 284, 68, c('neutral-50'), 8, { opacity: 0.5 });
  s += circle(790, 360, 14, c('warning-300'), { opacity: 0.9 });
  // relógio
  s += circle(1110, 170, 52, c('neutral-50'), { stroke: c('brandpurple-700'), 'stroke-width': 8 });
  s += line(1110, 170, 1110, 136, c('brandpurple-950'), 5) + line(1110, 170, 1134, 182, c('brandpurple-950'), 5) + circle(1110, 170, 5, c('brandpurple-950'));
  // plantas e estante lateral
  s += rr(1110, 380, 96, 128, 10, c('warning-700'));
  [0, 1, 2].forEach((i) => (s += rr(1118, 388 + i * 40, 80, 32, 4, pick(r, [c('brandpurple-500'), c('info-500'), c('danger-400'), c('success-500')]))));
  // carteiras e alunos
  const fileira = (y, escala, quantidade, x0, passo) => {
    let f = '';
    for (let i = 0; i < quantidade; i += 1) {
      const x = x0 + i * passo;
      f += pessoa(x, y - 62 * escala, escala, pick(r, peles()), pick(r, cabelos()), pick(r, roupas()));
      const larg = 168 * escala;
      f += rr(x - larg / 2, y, larg, 18 * escala, 4, c('warning-300'));
      f += rr(x - larg / 2 + 10 * escala, y + 18 * escala, larg - 20 * escala, 42 * escala, 4, c('brandpurple-400'));
      f += rect(x - larg / 2 + 14 * escala, y + 60 * escala, 6 * escala, 60 * escala, c('neutral-600'));
      f += rect(x + larg / 2 - 20 * escala, y + 60 * escala, 6 * escala, 60 * escala, c('neutral-600'));
    }
    return f;
  };
  s += fileira(500, 0.8, 4, 330, 200);
  s += fileira(620, 1, 3, 280, 360);
  return svg(W, H, defs, s);
};

/** 05 — Escada de carreira: degraus ascendentes, figura no meio e bandeira no topo. */
const capa05 = () => {
  const defs =
    linear('fundo', [[0, c('brandpurple-50')], [1, c('brandpurple-200')]]) +
    linear('colina', [[0, c('brandpurple-200')], [1, c('brandpurple-300')]]);
  let s = rect(0, 0, W, H, 'url(#fundo)');
  s += circle(1030, 170, 110, c('warning-200'), { opacity: 0.5 }) + circle(1030, 170, 70, c('warning-300'), { opacity: 0.9 });
  const nuvem = (x, y, e) =>
    group(ellipse(x, y, 70, 22, c('neutral-50')) + ellipse(x - 34, y - 14, 36, 22, c('neutral-50')) + ellipse(x + 26, y - 20, 42, 28, c('neutral-50')), {
      opacity: 0.85,
      transform: `translate(${n(x - x * e)} ${n(y - y * e)}) scale(${e})`,
    });
  s += nuvem(300, 150, 1) + nuvem(760, 100, 0.8) + nuvem(120, 330, 0.7);
  s += ellipse(260, 760, 520, 190, 'url(#colina)') + ellipse(1040, 790, 520, 210, c('brandpurple-300'), { opacity: 0.7 });
  // degraus
  const base = 660;
  const x0 = 150;
  const larg = 160;
  const subida = 72;
  const cores = ['brandpurple-300', 'brandpurple-400', 'brandpurple-500', 'brandpurple-600', 'brandpurple-700', 'brandpurple-800'];
  for (let i = 0; i < cores.length; i += 1) {
    const topo = base - (i + 1) * subida;
    s += rect(x0 + i * larg, topo, larg + 1, base - topo + 60, c(cores[i]));
    s += rect(x0 + i * larg, topo, larg + 1, 10, c('neutral-50'), { opacity: 0.32 });
    s += rect(x0 + i * larg, topo + 10, 6, base - topo + 50, c('brandpurple-950'), { opacity: 0.12 });
  }
  // trajetória
  const px = x0 + 2 * larg + 80;
  const py = base - 3 * subida; // topo do 3º degrau
  s += path_(`M${px + 14} ${py - 120} Q${x0 + 3.5 * larg} ${py - 300} ${x0 + 5.3 * larg} ${base - 6 * subida - 190}`, 'none', {
    stroke: c('brandpurple-600'),
    'stroke-width': 5,
    'stroke-dasharray': '2 14',
    'stroke-linecap': 'round',
  });
  // bandeira
  const fx = x0 + 5 * larg + 108;
  const fy = base - 6 * subida;
  s += line(fx, fy, fx, fy - 150, c('neutral-800'), 7);
  s += poly([[fx + 3, fy - 150], [fx + 88, fy - 124], [fx + 3, fy - 98]], c('danger-400'));
  s += circle(fx, fy - 154, 8, c('warning-300'));
  // figura
  const cor = c('brandnavy-700');
  s += ellipse(px, py - 2, 34, 8, c('brandpurple-950'), { opacity: 0.2 });
  s += rr(px - 22, py - 62, 16, 60, 8, c('brandpurple-950'));
  s += rr(px + 4, py - 62, 16, 60, 8, c('brandpurple-950'));
  s += rr(px - 28, py - 70, 28, 14, 7, c('neutral-50')) + rr(px + 2, py - 70, 28, 14, 7, c('neutral-50'));
  s += rr(px - 26, py - 132, 52, 76, 22, cor);
  s += rr(px + 18, py - 126, 22, 52, 10, c('warning-300'));
  s += path_(`M${px + 22} ${py - 114} L${px + 52} ${py - 150}`, 'none', { stroke: cor, 'stroke-width': 14, 'stroke-linecap': 'round' });
  s += circle(px + 54, py - 154, 8, c('warning-800'));
  s += path_(`M${px - 22} ${py - 112} L${px - 44} ${py - 80}`, 'none', { stroke: cor, 'stroke-width': 14, 'stroke-linecap': 'round' });
  s += circle(px, py - 158, 21, c('warning-800'));
  s += path_(`M${px - 22} ${py - 162} A22 20 0 0 1 ${px + 22} ${py - 162} Q${px} ${py - 176} ${px - 22} ${py - 162} Z`, c('brandpurple-950'));
  // brilhos
  const brilho = (x, y, t) => poly([[x, y - t], [x + t * 0.3, y - t * 0.3], [x + t, y], [x + t * 0.3, y + t * 0.3], [x, y + t], [x - t * 0.3, y + t * 0.3], [x - t, y], [x - t * 0.3, y - t * 0.3]], c('warning-300'));
  s += brilho(fx + 130, fy - 220, 16) + brilho(fx - 60, fy - 260, 10) + brilho(px + 160, py - 250, 12);
  return svg(W, H, defs, s);
};

/** 06 — Mesa de escrita: caderno aberto, caneta, cadernos fechados, xícara e lembretes. */
const capa06 = () => {
  const r = semente(1106);
  const defs = linear('mesa', [[0, c('warning-100')], [1, c('warning-200')]]);
  let s = rect(0, 0, W, H, 'url(#mesa)');
  for (let i = 1; i < 5; i += 1) s += line(0, i * 144, W, i * 144, c('warning-300'), 2, { opacity: 0.55 });
  for (let i = 0; i < 9; i += 1) {
    const y = pick(r, [0, 144, 288, 432, 576]);
    s += line(120 + i * 140, y, 120 + i * 140, y + 144, c('warning-300'), 2, { opacity: 0.4 });
  }
  // folha de planta
  const folha = (x, y, g, e) =>
    group(
      path_('M0 0 C40 -60 120 -70 170 -10 C120 40 40 40 0 0 Z', c('success-500')) +
        path_('M0 0 L150 -12', 'none', { stroke: c('success-700'), 'stroke-width': 4, 'stroke-linecap': 'round' }),
      { transform: `translate(${x} ${y}) rotate(${g}) scale(${e})`, opacity: 0.95 }
    );
  s += folha(40, 60, 20, 1.1) + folha(30, 90, 60, 0.9) + folha(60, 40, -10, 0.8);
  // cadernos fechados, ao fundo à direita
  s += group(
    rr(0, 0, 250, 330, 12, c('brandnavy-700')) + rect(18, 0, 14, 330, c('brandnavy-900'), { opacity: 0.5 }) + rr(60, 60, 150, 36, 8, c('brandnavy-200'), { opacity: 0.9 }),
    { transform: `translate(950 80) ${rotate(12, 125, 165)}` }
  );
  s += group(
    rr(0, 0, 250, 330, 12, c('brandpurple-600')) + rect(18, 0, 14, 330, c('brandpurple-800'), { opacity: 0.5 }) + rr(214, 0, 12, 330, 0, c('warning-300')) + rr(60, 60, 150, 36, 8, c('brandpurple-200'), { opacity: 0.9 }),
    { transform: `translate(900 60) ${rotate(-6, 125, 165)}` }
  );
  // caderno aberto, com a escrita
  const pagina = (x) => {
    let p = rr(x, 0, 330, 440, 10, c('neutral-50'));
    for (let i = 0; i < 12; i += 1) p += line(x + 26, 70 + i * 28, x + 304, 70 + i * 28, c('brandpurple-200'), 2);
    return p;
  };
  let caderno = rr(-14, -14, 698, 468, 18, c('brandpurple-700')) + pagina(0) + pagina(344);
  caderno += rect(326, 0, 18, 440, c('neutral-300'), { opacity: 0.6 });
  // escrita à mão (rabiscos)
  const rabisco = (x, y, largura) => {
    let d = `M${x} ${y}`;
    for (let i = 0; i < largura / 18; i += 1) d += ` q4 ${i % 2 ? -10 : 10} 9 0 t9 0`;
    return path_(d, 'none', { stroke: c('brandpurple-700'), 'stroke-width': 3, 'stroke-linecap': 'round' });
  };
  [0, 1, 2, 3, 4, 5].forEach((i) => (caderno += rabisco(28, 66 + i * 28, 220 + (i % 3) * 30)));
  [0, 1, 2, 3].forEach((i) => (caderno += rabisco(372, 66 + i * 28, 200 + (i % 2) * 70)));
  caderno += barra(372, 262, 120, c('brandpurple-300'), 14) + barra(372, 290, 180, c('brandpurple-300'), 10);
  s += sombra(180, 150, 670, 440, 18, c('warning-800'), 20, 0.3);
  s += group(caderno, { transform: `translate(180 170) ${rotate(-5, 340, 220)}` });
  // caneta
  const caneta =
    rr(0, 0, 250, 20, 10, c('brandpurple-800')) +
    rr(0, 4, 250, 6, 3, c('brandpurple-500'), { opacity: 0.8 }) +
    poly([[250, 0], [290, 10], [250, 20]], c('neutral-200')) +
    poly([[280, 7], [296, 10], [280, 13]], c('brandpurple-950')) +
    rr(40, -5, 90, 8, 4, c('neutral-300'));
  s += ellipse(560, 580, 150, 8, c('warning-800'), { opacity: 0.22, transform: rotate(-24, 560, 580) });
  s += group(caneta, { transform: `translate(520 460) ${rotate(-24, 125, 10)}` });
  // xícara vista de cima, com pires
  s += circle(1010, 560, 96, c('neutral-100'), { stroke: c('neutral-200'), 'stroke-width': 4 });
  s += circle(1010, 560, 68, c('neutral-50'), { stroke: c('brandpurple-300'), 'stroke-width': 6 });
  s += circle(1010, 560, 54, c('warning-900'));
  s += circle(1010, 560, 54, 'none', { stroke: c('warning-800'), 'stroke-width': 4 });
  s += path_('M990 546 Q1010 530 1032 548', 'none', { stroke: c('warning-300'), 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.8 });
  s += rr(1066, 548, 54, 24, 12, c('neutral-50'), { stroke: c('brandpurple-300'), 'stroke-width': 6 });
  // lembretes
  const nota = (x, y, g, cor) =>
    group(rr(0, 0, 130, 130, 4, cor) + barra(18, 32, 92, c('neutral-800'), 8, { opacity: 0.5 }) + barra(18, 54, 70, c('neutral-800'), 8, { opacity: 0.35 }) + barra(18, 76, 82, c('neutral-800'), 8, { opacity: 0.35 }), {
      transform: `translate(${x} ${y}) ${rotate(g, 65, 65)}`,
    });
  s += nota(60, 450, -10, c('info-200')) + nota(50, 300, 8, c('danger-100')) + nota(210, 560, 6, c('success-200'));
  return svg(W, H, defs, s);
};

/** 07 — Paleta de cores em leque e escala tipográfica. */
const capa07 = () => {
  const defs = defsFundo('brandpurple-50', 'brandpurple-100');
  let s = fundo();
  // cartão da paleta (leque)
  s += sombra(70, 60, 560, 600, 28);
  s += rr(70, 60, 560, 600, 28, c('neutral-50'));
  const degraus = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  const px = 350;
  const py = 560;
  degraus.forEach((d, i) => {
    const angulo = -38 + i * 7.6;
    s += group(rr(-31, -400, 62, 400, 31, c(`brandpurple-${d}`), i < 2 ? { stroke: c('neutral-200'), 'stroke-width': 2 } : {}), {
      transform: `translate(${px} ${py}) rotate(${angulo})`,
    });
  });
  s += circle(px, py, 48, c('neutral-50')) + circle(px, py, 18, c('brandpurple-600'));
  s += barra(110, 98, 130, c('neutral-800'), 12) + barra(110, 120, 90, c('neutral-300'), 9);
  // medidor de contraste na base do leque
  degraus.forEach((d, i) => (s += circle(130 + i * 38.5, 626, 9, c(`brandpurple-${d}`), i < 2 ? { stroke: c('neutral-300'), 'stroke-width': 2 } : {})));

  // cartão da tipografia
  s += sombra(680, 60, 530, 600, 28);
  s += rr(680, 60, 530, 600, 28, c('neutral-50'));
  const tx = 724;
  // "A" e "a" grandes, desenhados com traços
  const traco = { stroke: c('brandpurple-950'), 'stroke-width': 22, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  s += path_(`M${tx} 270 L${tx + 70} 110 L${tx + 140} 270`, 'none', traco) + line(tx + 28, 212, tx + 112, 212, c('brandpurple-950'), 22);
  s += circle(tx + 238, 218, 44, 'none', { ...traco, stroke: c('brandpurple-600') }) + line(tx + 282, 168, tx + 282, 272, c('brandpurple-600'), 22);
  // guias tipográficas
  [[110, 'linha de topo'], [212, 'linha média'], [270, 'linha de base']].forEach(([y]) => {
    s += line(tx - 20, y, 1166, y, c('info-500'), 2, { 'stroke-dasharray': '8 8', opacity: 0.7 });
  });
  s += circle(tx - 20, 110, 6, c('info-500')) + circle(tx - 20, 212, 6, c('info-500')) + circle(tx - 20, 270, 6, c('info-500'));
  // escada tipográfica
  const escada = [
    [38, 380, c('brandpurple-950')],
    [30, 320, c('brandpurple-900')],
    [24, 270, c('neutral-800')],
    [18, 360, c('neutral-600')],
    [14, 410, c('neutral-500')],
    [14, 330, c('neutral-500')],
  ];
  let y = 330;
  escada.forEach(([altura, largura, cor], i) => {
    s += barra(tx, y, largura, cor, altura * 0.52);
    s += rr(1112, y - 2, 54, altura * 0.52 + 4, 6, c('brandpurple-100'));
    y += altura + (i < 3 ? 22 : 12);
  });
  s += rr(tx, 600, 150, 14, 7, c('brandpurple-600')) + rr(tx + 164, 600, 60, 14, 7, c('brandpurple-300'));
  return svg(W, H, defs, s);
};

/** 08 — Teclado com foco visível: cartão com botão em foco e a tecla Tab destacada. */
const capa08 = () => {
  const defs = defsFundo('brandpurple-100', 'brandpurple-200');
  let s = fundo();
  // cartão de interface
  s += sombra(330, 54, 620, 250, 22);
  s += rr(330, 54, 620, 250, 22, c('neutral-50'));
  s += barra(364, 88, 200, c('neutral-800'), 18) + barra(364, 120, 340, c('neutral-300'), 10);
  const botoes = [
    [364, c('neutral-50'), c('neutral-300'), false],
    [546, c('brandpurple-600'), c('brandpurple-600'), true],
    [728, c('neutral-50'), c('neutral-300'), false],
  ];
  botoes.forEach(([bx, fundoBotao, borda, foco]) => {
    s += rr(bx, 184, 160, 62, 16, fundoBotao, { stroke: borda, 'stroke-width': 3 });
    s += barra(bx + 34, 209, 92, foco ? c('neutral-50') : c('neutral-500'), 12);
    if (foco) {
      s += rr(bx - 10, 174, 180, 82, 24, 'none', { stroke: c('brandpurple-950'), 'stroke-width': 5 });
      s += rr(bx - 5, 179, 170, 72, 21, 'none', { stroke: c('neutral-50'), 'stroke-width': 3 });
    }
  });

  // teclado
  const kx = 120;
  const ky = 346;
  const kw = 1040;
  const kh = 330;
  s += sombra(kx, ky, kw, kh, 34, c('brandpurple-400'), 20, 0.45);
  s += rr(kx, ky, kw, kh, 34, c('brandpurple-300'));
  s += rr(kx + 10, ky + 10, kw - 20, kh - 20, 26, c('brandpurple-200'));
  const u = 58;
  const gap = 8;
  const tecla = (x, y, w, o = {}) =>
    rr(x, y + 7, w, u, 12, c('neutral-300')) + rr(x, y, w, u, 12, o.fundo ?? c('neutral-50')) + (o.extra ?? '');
  const linhas = [
    { y: ky + 30, teclas: [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1.6]] },
    { y: ky + 30 + (u + gap + 8), teclas: [[1.6, 'tab'], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]] },
    { y: ky + 30 + 2 * (u + gap + 8), teclas: [[1.9], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [2]] },
    { y: ky + 30 + 3 * (u + gap + 8), teclas: [[1], [1], [1], [5.4], [1], [1], [1], [1]] },
  ];
  linhas.forEach(({ y, teclas }) => {
    let x = kx + 30;
    teclas.forEach(([mult, tipo]) => {
      const w = mult * u + (mult - 1) * gap;
      if (tipo === 'tab') {
        // tecla Tab em foco: anel duplo e setas
        s += tecla(x, y, w, { fundo: c('brandpurple-100') });
        s += rr(x - 8, y - 8, w + 16, u + 16 + 7, 18, 'none', { stroke: c('brandpurple-950'), 'stroke-width': 5 });
        s += rr(x - 3, y - 3, w + 6, u + 6 + 7, 15, 'none', { stroke: c('brandpurple-600'), 'stroke-width': 3 });
        const mx = x + w / 2;
        const my = y + u / 2;
        s += line(mx - 24, my, mx + 24, my, c('brandpurple-800'), 6) + poly([[mx + 32, my], [mx + 14, my - 12], [mx + 14, my + 12]], c('brandpurple-800'));
        s += line(mx + 34, my - 20, mx + 34, my + 20, c('brandpurple-800'), 6);
      } else {
        s += tecla(x, y, w);
      }
      x += w + gap;
    });
  });
  return svg(W, H, defs, s);
};

/** 09 — Formulário: três campos, um deles em erro com a mensagem logo abaixo. */
const capa09 = () => {
  const defs = defsFundo('brandpurple-100', 'brandpurple-200');
  let s = fundo();
  const x = 340;
  const y = 56;
  const w = 600;
  const h = 610;
  s += sombra(x, y, w, h, 28);
  s += rr(x, y, w, h, 28, c('neutral-50'));
  s += barra(x + 44, y + 44, 230, c('neutral-800'), 22) + barra(x + 44, y + 80, 400, c('neutral-300'), 11);
  const fx = x + 44;
  const fw = w - 88;
  // campo 1: preenchido e válido
  s += barra(fx, y + 130, 90, c('neutral-700'), 11);
  s += rr(fx, y + 152, fw, 58, 14, c('neutral-50'), { stroke: c('neutral-500'), 'stroke-width': 3 });
  s += barra(fx + 20, y + 175, 190, c('neutral-800'), 12);
  s += confirmar(fx + fw - 32, y + 181, 15, c('success-600'));
  // campo 2: com erro
  s += barra(fx, y + 238, 70, c('neutral-700'), 11);
  s += rr(fx, y + 260, fw, 58, 14, c('danger-50'), { stroke: c('danger-600'), 'stroke-width': 4 });
  s += barra(fx + 20, y + 283, 150, c('neutral-800'), 12);
  s += alertar(fx + fw - 32, y + 289, 15, c('danger-600'));
  s += alertar(fx + 10, y + 346, 9, c('danger-600'));
  s += barra(fx + 30, y + 341, 300, c('danger-600'), 10);
  // campo 3: vazio com dica
  s += barra(fx, y + 384, 110, c('neutral-700'), 11);
  s += rr(fx, y + 406, fw, 58, 14, c('neutral-50'), { stroke: c('neutral-500'), 'stroke-width': 3 });
  s += barra(fx + 20, y + 429, 90, c('neutral-300'), 12);
  s += barra(fx, y + 480, 260, c('neutral-400'), 9);
  // botões
  s += rr(fx, y + 520, 190, 58, 16, c('brandpurple-600'));
  s += barra(fx + 46, y + 544, 98, c('neutral-50'), 12);
  s += rr(fx + 206, y + 520, 150, 58, 16, 'none', { stroke: c('brandpurple-600'), 'stroke-width': 3 });
  s += barra(fx + 240, y + 544, 82, c('brandpurple-600'), 12);
  // balão de dica à esquerda
  s += sombra(70, 250, 220, 190, 24);
  s += rr(70, 250, 220, 190, 24, c('neutral-50'));
  s += poly([[290, 340], [318, 356], [290, 372]], c('neutral-50'));
  s += alertar(120, 312, 24, c('danger-600'));
  s += barra(160, 304, 90, c('neutral-800'), 12) + barra(94, 358, 170, c('neutral-300'), 10) + barra(94, 380, 140, c('neutral-300'), 10) + barra(94, 402, 110, c('neutral-300'), 10);
  // lista de verificação à direita
  s += sombra(990, 200, 200, 280, 24);
  s += rr(990, 200, 200, 280, 24, c('neutral-50'));
  const itens = [[true, 110], [false, 90], [true, 120], [true, 80]];
  itens.forEach(([ok, largura], i) => {
    const iy = 244 + i * 56;
    s += ok ? confirmar(1030, iy, 16, c('success-600')) : recusar(1030, iy, 16, c('danger-500'));
    s += barra(1060, iy - 6, largura, c('neutral-300'), 12);
  });
  return svg(W, H, defs, s);
};

/** 10 — Celular e tablet lado a lado, com a mesma tela em duas proporções. */
const capa10 = () => {
  const defs = defsFundo('brandpurple-100', 'brandpurple-200');
  let s = fundo();
  const tela = (x, y, w, h, colunas, raio) => {
    let t = rr(x, y, w, h, raio, c('neutral-50'));
    t += rect(x, y + 36, w, 56, c('brandpurple-100'));
    t += rr(x, y, w, 92, raio, c('brandpurple-100'));
    t += rect(x, y + 56, w, 36, c('brandpurple-100'));
    t += circle(x + 30, y + 54, 14, c('brandpurple-600')) + barra(x + 56, y + 48, 90, c('brandpurple-900'), 12);
    t += circle(x + w - 30, y + 54, 12, c('brandpurple-300'));
    const cw = (w - 28 - (colunas - 1) * 14) / colunas;
    const cores = [c('brandpurple-300'), c('info-300'), c('success-300'), c('warning-300'), c('danger-200'), c('brandpurple-400')];
    for (let i = 0; i < colunas * 2; i += 1) {
      const cx = x + 14 + (i % colunas) * (cw + 14);
      const cy = y + 112 + Math.floor(i / colunas) * 178;
      if (cy + 160 > y + h) break;
      t += rr(cx, cy, cw, 160, 12, c('neutral-100'));
      t += rr(cx + 8, cy + 8, cw - 16, 84, 8, cores[i % cores.length]);
      t += barra(cx + 8, cy + 106, cw * 0.7, c('neutral-800'), 10) + barra(cx + 8, cy + 126, cw * 0.5, c('neutral-300'), 8);
    }
    return t;
  };
  // tablet
  const tx = 130;
  const ty = 100;
  const tw = 640;
  const th = 520;
  s += ellipse(tx + tw / 2, ty + th + 36, tw / 2 + 20, 18, c('brandpurple-800'), { opacity: 0.18 });
  s += sombra(tx, ty, tw, th, 40, c('brandpurple-400'), 18, 0.4);
  s += rr(tx, ty, tw, th, 40, c('brandpurple-950'));
  s += circle(tx + tw / 2, ty + 14, 4, c('neutral-600'));
  s += tela(tx + 20, ty + 28, tw - 40, th - 56, 3, 22);
  // celular, à frente
  const px = 770;
  const py = 180;
  const pw = 230;
  const ph = 460;
  s += ellipse(px + pw / 2, py + ph + 28, pw / 2 + 24, 14, c('brandpurple-800'), { opacity: 0.22 });
  s += sombra(px, py, pw, ph, 38, c('brandpurple-400'), 16, 0.5);
  s += rr(px, py, pw, ph, 38, c('brandpurple-950'));
  s += tela(px + 12, py + 14, pw - 24, ph - 28, 1, 28);
  s += rr(px + pw / 2 - 32, py + 24, 64, 16, 8, c('brandpurple-950'));
  // pequenos acessórios
  s += circle(1100, 190, 30, c('brandpurple-300'), { opacity: 0.5 }) + circle(1150, 560, 46, c('brandpurple-300'), { opacity: 0.4 });
  return svg(W, H, defs, s);
};

/** 11 — Estante de cadernos: três prateleiras, lombadas coloridas, planta e vaso. */
const capa11 = () => {
  const r = semente(1111);
  const defs = defsFundo('brandpurple-100', 'brandpurple-200');
  let s = fundo();
  const x = 190;
  const y = 50;
  const w = 900;
  const h = 640;
  const m = 26;
  s += sombra(x, y, w, h, 14, c('brandpurple-400'), 18, 0.4);
  s += rr(x, y, w, h, 14, c('warning-800'));
  s += rect(x + m, y + m, w - 2 * m, h - 2 * m, c('warning-100'));
  s += rect(x + m, y + m, w - 2 * m, 14, c('warning-800'), { opacity: 0.12 });
  const tabuas = [y + 236, y + 436];
  const fundos = [y + 236, y + 436, y + h - m];
  const cores = ['brandpurple-600', 'brandnavy-600', 'brandpurple-300', 'brandnavy-500', 'danger-400', 'success-600', 'brandpurple-800', 'warning-400', 'brandnavy-300', 'brandpurple-500'];
  const prateleira = (chao, indice) => {
    let p = '';
    let cx = x + m + 20;
    const limite = x + w - m - (indice === 0 ? 230 : 40);
    while (cx < limite) {
      const largura = 26 + Math.floor(r() * 24);
      const altura = 120 + Math.floor(r() * 54);
      const cor = c(pick(r, cores));
      if (r() < 0.14 && cx + 180 < limite) {
        // pilha de cadernos deitados
        for (let k = 0; k < 3; k += 1) {
          const lw = 150 + Math.floor(r() * 24);
          p += rr(cx, chao - 28 * (k + 1), lw, 28, 4, c(pick(r, cores)));
          p += rect(cx + 8, chao - 28 * (k + 1) + 8, lw - 16, 4, c('neutral-50'), { opacity: 0.5 });
        }
        cx += 190;
        continue;
      }
      if (r() < 0.1) {
        p += group(rr(0, 0, largura, altura, 4, cor), { transform: `translate(${n(cx + 20)} ${n(chao - altura + 4)}) rotate(14 ${n(largura / 2)} ${n(altura)})` });
        cx += largura + 44;
        continue;
      }
      p += rr(cx, chao - altura, largura, altura, 4, cor);
      p += rect(cx, chao - altura + 18, largura, 7, c('neutral-50'), { opacity: 0.55 });
      p += rect(cx, chao - 30, largura, 7, c('neutral-50'), { opacity: 0.35 });
      p += rr(cx + largura / 2 - 7, chao - altura / 2 - 18, 14, 36, 4, c('neutral-50'), { opacity: 0.7 });
      p += rect(cx + largura - 5, chao - altura + 2, 5, altura - 2, c('brandpurple-950'), { opacity: 0.16 });
      cx += largura + 3;
    }
    return p;
  };
  fundos.forEach((chao, i) => (s += prateleira(chao, i)));
  // tábuas
  tabuas.forEach((ty) => {
    s += rect(x + m, ty, w - 2 * m, 20, c('warning-800'));
    s += rect(x + m, ty, w - 2 * m, 6, c('warning-700'));
  });
  // vaso com planta, na tábua de cima
  const vx = x + w - m - 100;
  const vy = y + 236;
  s += rr(vx - 46, vy - 78, 92, 78, 12, c('warning-500'));
  s += rect(vx - 52, vy - 86, 104, 16, c('warning-600'));
  const folha = (g, e) => path_('M0 0 C-20 -50 -10 -110 0 -140 C10 -110 20 -50 0 0 Z', c('success-500'), { transform: `translate(${vx} ${vy - 84}) rotate(${g}) scale(${e})` });
  [-52, -28, 0, 26, 50].forEach((g, i) => (s += folha(g, 0.7 + (i % 3) * 0.18)));
  // quadrinho na parede de cima e relógio
  const qx = x + 70;
  s += rect(qx, y + 56, 120, 90, c('neutral-50')) + rect(qx + 10, y + 66, 100, 70, c('brandpurple-200'));
  s += poly([[qx + 10, y + 136], [qx + 44, y + 98], [qx + 70, y + 122], [qx + 90, y + 104], [qx + 110, y + 136]], c('brandpurple-500'));
  s += circle(qx + 84, y + 86, 9, c('warning-300'));
  s += circle(x + w - 200, y + 100, 36, c('neutral-50'), { stroke: c('warning-700'), 'stroke-width': 6 });
  s += line(x + w - 200, y + 100, x + w - 200, y + 76, c('brandpurple-950'), 4) + line(x + w - 200, y + 100, x + w - 182, y + 108, c('brandpurple-950'), 4);
  // rodapé
  s += rect(x - 20, y + h, w + 40, 20, c('warning-900'));
  return svg(W, H, defs, s);
};

/** 12 — Gráfico de barras e linhas, com rosca e cartão de indicador. */
const capa12 = () => {
  const r = semente(1112);
  const defs =
    defsFundo('brandpurple-100', 'brandpurple-50') +
    linear('barra', [[0, c('brandpurple-400')], [1, c('brandpurple-700')]]) +
    linear('area', [[0, c('info-300')], [1, c('info-50')]]);
  let s = fundo();
  // cartão principal
  const x = 90;
  const y = 80;
  const w = 740;
  const h = 560;
  s += sombra(x, y, w, h, 28);
  s += rr(x, y, w, h, 28, c('neutral-50'));
  s += barra(x + 40, y + 40, 190, c('neutral-800'), 18) + barra(x + 40, y + 72, 130, c('neutral-300'), 10);
  s += circle(x + w - 190, y + 50, 7, c('brandpurple-600')) + barra(x + w - 174, y + 45, 56, c('neutral-300'), 10);
  s += circle(x + w - 98, y + 50, 7, c('info-500')) + barra(x + w - 82, y + 45, 44, c('neutral-300'), 10);
  const gx = x + 80;
  const gy = y + 130;
  const gw = w - 120;
  const gh = 360;
  for (let i = 0; i <= 4; i += 1) {
    const yy = gy + (gh / 4) * i;
    s += line(gx, yy, gx + gw, yy, c('neutral-150'), 2);
    s += barra(x + 30, yy - 4, 30, c('neutral-300'), 8);
  }
  const valores = [0.26, 0.38, 0.34, 0.5, 0.58, 0.54, 0.72, 0.86];
  const bw = 52;
  const passo = gw / valores.length;
  // linha de tendência
  const pts = valores.map((v, i) => [gx + passo * i + passo / 2, gy + gh - Math.min(0.96, v + 0.1 + r() * 0.05) * gh]);
  const ponto = (p) => `${n(p[0])} ${n(p[1])}`;
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${ponto(p)}`).join(' ');
  s += path_(`${d} L${n(pts[pts.length - 1][0])} ${gy + gh} L${n(pts[0][0])} ${gy + gh} Z`, 'url(#area)', { opacity: 0.4 });
  valores.forEach((v, i) => {
    const bx = gx + passo * i + (passo - bw) / 2;
    s += rr(bx, gy + gh - v * gh, bw, v * gh, 10, 'url(#barra)');
    s += barra(bx + 8, gy + gh + 18, bw - 16, c('neutral-300'), 8);
  });
  s += path_(d, 'none', { stroke: c('info-500'), 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  pts.forEach((p) => (s += circle(p[0], p[1], 9, c('neutral-50'), { stroke: c('info-500'), 'stroke-width': 5 })));
  // rosca
  const rx = 1010;
  const ry = 220;
  s += sombra(870, 80, 320, 280, 28);
  s += rr(870, 80, 320, 280, 28, c('neutral-50'));
  s += barra(900, 110, 110, c('neutral-800'), 14);
  const raio = 62;
  const circunf = 2 * Math.PI * raio;
  const fatias = [[0.5, 'brandpurple-600'], [0.3, 'info-500'], [0.2, 'warning-300']];
  let acumulado = 0;
  fatias.forEach(([parte, cor]) => {
    s += circle(rx - 30, ry + 24, raio, 'none', {
      stroke: c(cor),
      'stroke-width': 30,
      'stroke-dasharray': `${n(parte * circunf - 4)} ${n(circunf - parte * circunf + 4)}`,
      transform: `rotate(${n(-90 + acumulado * 360)} ${n(rx - 30)} ${n(ry + 24)})`,
    });
    acumulado += parte;
  });
  s += circle(rx + 100, ry - 10, 7, c('brandpurple-600')) + barra(rx + 112, ry - 15, 50, c('neutral-300'), 9);
  s += circle(rx + 100, ry + 22, 7, c('info-500')) + barra(rx + 112, ry + 17, 40, c('neutral-300'), 9);
  s += circle(rx + 100, ry + 54, 7, c('warning-300')) + barra(rx + 112, ry + 49, 32, c('neutral-300'), 9);
  // indicador
  s += sombra(870, 400, 320, 240, 28);
  s += rr(870, 400, 320, 240, 28, c('brandpurple-950'));
  s += barra(900, 436, 90, c('brandpurple-300'), 11);
  s += barra(900, 468, 170, c('neutral-50'), 38);
  s += rr(900, 524, 84, 28, 14, c('success-600')) + poly([[920, 546], [934, 530], [948, 546]], c('neutral-50'));
  s += barra(998, 534, 56, c('brandpurple-300'), 10);
  const pontos = [0.2, 0.34, 0.3, 0.5, 0.46, 0.7, 0.62, 0.9];
  const spark = pontos.map((v, i) => `${i === 0 ? 'M' : 'L'}${n(900 + i * 36)} ${n(610 - v * 40)}`).join(' ');
  s += path_(spark, 'none', { stroke: c('brandpurple-300'), 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  return svg(W, H, defs, s);
};

/* ==========================================================================
   Retratos
   ========================================================================== */

const R = 400;

/** Cabeça, pescoço, ombros e rosto simples; devolve o desenho em camadas. */
const retrato = ({ fundo: cor, pele, roupa, gola, cabeloTras = '', cabeloFrente = '', extras = '', brinco = '', sorriso = 'aberto' }) => {
  const traco = c('brandpurple-950');
  let s = rect(0, 0, R, R, cor);
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
  // 02 — cabelo curto e camiseta lisa
  const r2 = retrato({
    fundo: c('success-100'),
    pele: c('warning-100'),
    roupa: c('brandpurple-700'),
    gola: c('brandpurple-300'),
    cabeloFrente: path_('M138 188 C130 118 170 104 210 106 C250 108 272 130 262 188 C256 156 244 144 226 142 C206 150 176 146 160 138 C150 150 142 166 138 188 Z', c('warning-800')),
    sorriso: 'fechado',
  });
  // 03 — coque alto e brincos grandes
  const r3 = retrato({
    fundo: c('warning-100'),
    pele: c('warning-900'),
    roupa: c('danger-400'),
    gola: c('neutral-50'),
    cabeloTras: circle(200, 92, 38, traco) + circle(200, 92, 38, c('brandpurple-800'), { opacity: 0.3 }),
    cabeloFrente: path_('M138 186 C130 120 166 108 200 108 C236 108 270 120 262 186 C252 150 232 138 200 138 C168 138 148 150 138 186 Z', traco),
    brinco: circle(138, 236, 9, c('warning-300')) + circle(262, 236, 9, c('warning-300')),
  });
  // 04 — cabelo raspado e barba curta
  const r4 = retrato({
    fundo: c('info-100'),
    pele: c('warning-300'),
    roupa: c('success-600'),
    gola: c('neutral-100'),
    cabeloFrente:
      path_('M140 176 C138 120 170 112 200 112 C230 112 262 120 260 176 C250 150 230 140 200 140 C170 140 150 150 140 176 Z', c('neutral-800')) +
      path_('M144 214 C146 258 170 282 200 282 C230 282 254 258 256 214 C246 238 226 250 200 250 C174 250 154 238 144 214 Z', c('neutral-800'), { opacity: 0.85 }),
  });
  // 05 — cabelo cacheado e óculos redondos
  let cachos = '';
  for (let i = 0; i < 16; i += 1) {
    const a = Math.PI + (i / 15) * Math.PI;
    cachos += circle(200 + Math.cos(a) * 74, 176 + Math.sin(a) * 86, 26, traco);
  }
  cachos += circle(130, 214, 24, traco) + circle(270, 214, 24, traco);
  const r5 = retrato({
    fundo: c('brandnavy-200'),
    pele: c('warning-800'),
    roupa: c('warning-400'),
    gola: c('neutral-50'),
    cabeloTras: cachos,
    cabeloFrente: path_('M142 168 C150 128 250 128 258 168 C238 146 162 146 142 168 Z', traco),
    extras:
      circle(172, 196, 22, 'none', { stroke: c('neutral-950'), 'stroke-width': 5 }) +
      circle(228, 196, 22, 'none', { stroke: c('neutral-950'), 'stroke-width': 5 }) +
      line(194, 196, 206, 196, c('neutral-950'), 5),
  });
  // 06 — imagem neutra: duas silhuetas sobrepostas, sem rosto
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
      silhueta(150, c('brandpurple-800'), 1)
  );
  return [r1, r2, r3, r4, r5, r6];
};

/* ==========================================================================
   Execução
   ========================================================================== */

fs.mkdirSync(saida, { recursive: true });

const capas = [capa01, capa02, capa03, capa04, capa05, capa06, capa07, capa08, capa09, capa10, capa11, capa12];
capas.forEach((fn, i) => fs.writeFileSync(path.join(saida, `capa-${String(i + 1).padStart(2, '0')}.svg`), fn()));
retratos().forEach((conteudo, i) => fs.writeFileSync(path.join(saida, `retrato-${String(i + 1).padStart(2, '0')}.svg`), conteudo));

console.log(`Ilustrações geradas em ${path.relative(raiz, saida)}: ${capas.length} capas e 6 retratos.`);
