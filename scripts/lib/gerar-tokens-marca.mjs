/**
 * Gerador de tokens de cor e de tipografia das marcas derivadas da Plataforma
 * Unooria (Unoojornal, Unooblog).
 *
 * Cada marca descreve uma tabela (`TEMA`, `INVARIANTES`, `PARES`, `ESCALA`) e
 * este módulo grava `colors.css`, `colors.ts`, `typography.css` e
 * `typography.ts` a partir dela. Cada token nomeia o token de origem na
 * Plataforma Unooria; o literal é LIDO de `src/unooria/tokens/`, então a cópia
 * não tem como nascer divergente. O módulo de marca nunca lê `--unooria-*` em
 * tempo de execução (AGENTS.md, 1.3): o que vai para o CSS é o literal, e
 * `scripts/verificar-paridade-<marca>.mjs` o guarda.
 *
 * O gerador mede o contraste dos pares de uso real nos dois temas e RECUSA
 * gravar se algum ficar abaixo do mínimo (texto 4,5:1; gráfico 3:1).
 */
import fs from 'node:fs';
import path from 'node:path';

const PESOS = { regular: 400, medium: 500, semibold: 600, bold: 700 };

const kebab = (k) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
const q = (s) => JSON.stringify(s);

/** Lê os tokens da plataforma e devolve `resolver(nome)` e `achar(nome)`. */
function origemUnooria(raiz, arquivos) {
  const texto = arquivos.map((r) => fs.readFileSync(path.join(raiz, r), 'utf8')).join('\n');
  const achar = (nome) => {
    const m = texto.match(new RegExp(`${nome.replace(/-/g, '\\-')}:\\s*([^;]+);`));
    if (!m) throw new Error('token de origem inexistente: ' + nome);
    return m[1].trim();
  };
  const resolver = (nome, vistos = new Set()) => {
    if (vistos.has(nome)) throw new Error('ciclo de aliases em ' + nome);
    vistos.add(nome);
    const v = achar(nome);
    const alias = v.match(/^var\((--[\w-]+)/);
    return alias ? resolver(alias[1], vistos) : v;
  };
  return { resolver, achar };
}

/* ---------------------------------------------------------------- contraste */
function rgba(v) {
  if (v.startsWith('#')) {
    const h = v.slice(1);
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
  }
  const m = v.match(/rgba?\(([^)]+)\)/);
  const p = m[1].split(',').map((x) => parseFloat(x));
  return [p[0], p[1], p[2], p[3] ?? 1];
}
const sobre = (fg, bg) => {
  const [r, g, b, a] = fg;
  return [r * a + bg[0] * (1 - a), g * a + bg[1] * (1 - a), b * a + bg[2] * (1 - a), 1];
};
const lum = ([r, g, b]) => {
  const f = (x) => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const razao = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, s) => s - p);
  return (x + 0.05) / (y + 0.05);
};

/* -------------------------------------------------------------------- cores */
/**
 * @param {object} cfg
 * @param {string} cfg.raiz       raiz do repositório
 * @param {string} cfg.modulo     pasta em src/ (ex.: 'unoojornal')
 * @param {string} cfg.nome       nome da marca (ex.: 'Unoojornal')
 * @param {string} cfg.p          prefixo CSS (ex.: 'ujn')
 * @param {string} cfg.P          prefixo TS (ex.: 'Ujn')
 * @param {Array}  cfg.TEMA       [chave, grupo, uso, origem clara, origem escura]
 * @param {Array}  cfg.INVARIANTES [chave, grupo, uso, origem]
 * @param {Array}  cfg.PARES      [frente, fundo, 'text'|'graphic', uso]; fundo aceita 'a@b@c'
 * @param {Array}  cfg.GRADIENTES [chave, uso, valor com var()]
 * @param {string} cfg.invariantesTexto trecho do cabeçalho sobre as superfícies invariantes
 */
export function gerarCores(cfg) {
  const { raiz, modulo, nome, p, P, TEMA, INVARIANTES, PARES, GRADIENTES = [] } = cfg;
  const { resolver } = origemUnooria(raiz, ['src/unooria/tokens/colors.css', 'src/unooria/tokens/elevation.css']);
  const cssVar = (k) => `--${p}-` + (k.startsWith('elevation') ? '' : 'color-') + kebab(k);

  const chaves = new Set();
  for (const r of [...TEMA, ...INVARIANTES]) {
    if (chaves.has(r[0])) throw new Error('token duplicado: ' + r[0]);
    chaves.add(r[0]);
  }

  const valores = { light: {}, dark: {} };
  for (const [k, , , l, d] of TEMA) {
    valores.light[k] = resolver(l);
    valores.dark[k] = resolver(d);
  }
  for (const [k, , , o] of INVARIANTES) valores.light[k] = valores.dark[k] = resolver(o);
  valores.light.__white = valores.dark.__white = '#FFFFFF';

  const camada = (expr, tema) => {
    const partes = expr.split('@').reverse();
    if (!(partes[0] in valores[tema])) throw new Error('par cita token inexistente: ' + partes[0]);
    let cor = rgba(valores[tema][partes[0]]);
    for (const x of partes.slice(1)) {
      if (!(x in valores[tema])) throw new Error('par cita token inexistente: ' + x);
      cor = sobre(rgba(valores[tema][x]), cor);
    }
    return cor;
  };

  const pares = [];
  const falhas = [];
  for (const [fg, bg, kind, usage] of PARES) {
    const min = kind === 'text' ? 4.5 : 3;
    const r = {};
    for (const t of ['light', 'dark']) {
      const fundo = camada(bg, t);
      let frente = camada(fg, t);
      if (frente[3] < 1) frente = sobre(frente, fundo);
      r[t] = Math.round(razao(frente, fundo) * 100) / 100;
      if (r[t] < min) falhas.push(`${t}: ${fg} sobre ${bg} = ${r[t]} (< ${min})`);
    }
    pares.push({ foreground: fg, background: bg.replace('@__white', '@branco'), kind, minimum: min, light: r.light, dark: r.dark, usage });
  }
  if (falhas.length) {
    console.error('Contraste insuficiente:\n' + falhas.join('\n'));
    process.exit(1);
  }

  const orig = (k, t) => {
    const row = TEMA.find((r) => r[0] === k);
    return row ? (t === 'light' ? row[3] : row[4]) : INVARIANTES.find((r) => r[0] === k)[3];
  };
  const linha = (k, usage, t) => `  /** ${usage} */\n  ${cssVar(k)}: ${valores[t][k]}; /* ${orig(k, t)} */`;

  const css = `/* ==========================================================================
   Tokens de Cores — Design System ${nome}
   Todo valor é um literal copiado da paleta da Plataforma Unooria
   (\`src/unooria/tokens/colors.css\` e \`elevation.css\`); o comentário ao lado de
   cada linha nomeia o token de origem. O módulo NÃO consome \`--unooria-*\` em
   tempo de execução — um módulo de marca nunca lê tokens de outro (AGENTS.md,
   1.3) —, e \`scripts/verificar-paridade-${modulo}.mjs\` falha o build se um
   literal se afastar da origem. \`colors.css\` e \`colors.ts\` saem da mesma tabela
   (\`scripts/gerar-tokens-${modulo}.mjs\`).

   Dois temas, ambos sobre a escala roxa (\`brandpurple\`):
   - claro: telas em branco e lavanda (50–300), acento em 600;
   - escuro: telas em roxo profundo (700–950), acento em 400.
   O tema escuro NÃO é derivado do claro por cálculo: cada valor de cada tema é
   um degrau nomeado da Unooria.

${cfg.invariantesTexto ?? ''}   ========================================================================== */

:root,
[data-${p}-theme='light'] {
${TEMA.map(([k, , u]) => linha(k, u, 'light')).join('\n')}
}

[data-${p}-theme='dark'] {
${TEMA.map(([k, , u]) => linha(k, u, 'dark')).join('\n')}
}

/* ==========================================================================
   Invariantes entre temas${GRADIENTES.length ? ' e gradientes compostos' : ''}

   Uma propriedade personalizada com \`var()\` é resolvida NO elemento em que é
   declarada; declarada só em \`:root\`, ela congelaria os valores do tema claro
   dentro de um contêiner escuro (a lição da seção 2.9). Por isso este bloco se
   repete em todo \`[data-${p}-theme]\`.
   ========================================================================== */

:root,
[data-${p}-theme] {
${INVARIANTES.map(([k, , u]) => linha(k, u, 'light')).join('\n')}
${GRADIENTES.map(([k, u, v]) => `\n  /** ${u} */\n  --${p}-gradient-${k}: ${v};`).join('\n')}
}
`;

  const tsTema = TEMA.map(
    ([k, g, u, l, d]) => `  ${k}: {
    cssVar: '${cssVar(k)}',
    group: ${q(g)},
    usage: ${q(u)},
    light: { value: '${valores.light[k]}', unooria: '${l}' },
    dark: { value: '${valores.dark[k]}', unooria: '${d}' },
  },`
  ).join('\n');
  const tsInv = INVARIANTES.map(
    ([k, g, u, o]) => `  ${k}: {
    cssVar: '${cssVar(k)}',
    group: ${q(g)},
    usage: ${q(u)},
    value: '${valores.light[k]}',
    unooria: '${o}',
  },`
  ).join('\n');
  const grupos = [...new Set([...TEMA.map((r) => r[1]), ...INVARIANTES.map((r) => r[1])])];

  const ts = `/**
 * Tokens de Cores do Design System ${nome}.
 *
 * Espelho TypeScript de \`colors.css\` (gerado da mesma tabela). Cada token traz o
 * valor nos dois temas e o nome do token da Plataforma Unooria de que o literal
 * foi copiado.
 */

/**
 * Temas suportados pelo módulo.
 */
export type ${P}Theme = 'light' | 'dark';

/**
 * Valor de um token em um tema, com rastreabilidade até a Plataforma Unooria.
 */
export interface ${P}ColorValue {
  /** Literal copiado da Unooria */
  value: string;
  /** Token de origem em \`src/unooria/tokens/\` */
  unooria: string;
}

/**
 * Descrição de um token que muda entre os temas.
 */
export interface ${P}ColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Agrupamento usado na documentação */
  group: string;
  /** Onde o token é aplicado no produto */
  usage: string;
  light: ${P}ColorValue;
  dark: ${P}ColorValue;
}

/**
 * Descrição de um token invariante entre temas.
 */
export interface ${P}InvariantColorToken extends ${P}ColorValue {
  cssVar: string;
  group: string;
  usage: string;
}

/**
 * Grupos de tokens, na ordem de exibição da documentação.
 */
export const ${p}ColorGroups = ${JSON.stringify(grupos)} as const;

/**
 * Tokens que variam entre os temas claro e escuro.
 */
export const ${p}ColorTokens = {
${tsTema}
} as const satisfies Record<string, ${P}ColorToken>;

export type ${P}ColorKey = keyof typeof ${p}ColorTokens;

/**
 * Tokens invariantes entre os temas.
 */
export const ${p}InvariantColors = {
${tsInv}
} as const satisfies Record<string, ${P}InvariantColorToken>;

export type ${P}InvariantColorKey = keyof typeof ${p}InvariantColors;

/**
 * Valores resolvidos de cada tema, por chave.
 */
export const ${p}ColorThemes: Record<${P}Theme, Record<${P}ColorKey, string>> = {
  light: Object.fromEntries(
    Object.entries(${p}ColorTokens).map(([key, token]) => [key, token.light.value])
  ) as Record<${P}ColorKey, string>,
  dark: Object.fromEntries(
    Object.entries(${p}ColorTokens).map(([key, token]) => [key, token.dark.value])
  ) as Record<${P}ColorKey, string>,
};

/**
 * Referências \`var(--${p}-…)\` prontas para uso em estilos inline.
 */
export const ${p}ColorCssVars = Object.fromEntries(
  [...Object.entries(${p}ColorTokens), ...Object.entries(${p}InvariantColors)].map(([key, token]) => [
    key,
    \`var(\${token.cssVar})\`,
  ])
) as Record<${P}ColorKey | ${P}InvariantColorKey, string>;

/**
 * Gradientes compostos do módulo.
 */
export const ${p}Gradients = {
${GRADIENTES.map(([k, u]) => `  ${k.replace(/-(\w)/g, (_, c) => c.toUpperCase())}: { cssVar: '--${p}-gradient-${k}', usage: ${q(u)} },`).join('\n')}
} as const;

/**
 * Par de contraste medido nos dois temas.
 */
export interface ${P}ContrastPair {
  /** Chave do token de frente */
  foreground: string;
  /** Chave do fundo; \`a@b\` é a camada a composta sobre b */
  background: string;
  /** 'text' exige 4,5:1; 'graphic', 3:1 (WCAG 1.4.3 e 1.4.11) */
  kind: 'text' | 'graphic';
  minimum: number;
  light: number;
  dark: number;
  usage: string;
}

/**
 * Pares de uso real e a razão de contraste medida em cada tema. O script que
 * gera este arquivo recusa gravar se algum par ficar abaixo do mínimo.
 */
export const ${p}ContrastPairs: readonly ${P}ContrastPair[] = [
${pares.map((x) => `  ${JSON.stringify(x).replace(/"(\w+)":/g, '$1: ')},`).join('\n')}
];
`;

  const dir = path.join(raiz, 'src', modulo, 'tokens');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'colors.css'), css);
  fs.writeFileSync(path.join(dir, 'colors.ts'), ts);

  const menor = (t, k) => Math.min(...pares.filter((x) => x.kind === k).map((x) => x[t]));
  console.log(`cores: ${TEMA.length} tokens por tema, ${INVARIANTES.length} invariantes, ${pares.length} pares.`);
  console.log(
    `  menor texto: claro ${menor('light', 'text')} · escuro ${menor('dark', 'text')}; menor gráfico: claro ${menor('light', 'graphic')} · escuro ${menor('dark', 'graphic')}`
  );
}

/* --------------------------------------------------------------- tipografia */
/**
 * @param {object} cfg
 * @param {Array} cfg.ESCALA [chave TS, slug CSS, nome, degrau Unooria, peso, uso, (italico)]
 * @param {string} [cfg.mono] pilha monoespaçada (opcional; fonte de sistema, sem origem na Unooria)
 */
export function gerarTipografia(cfg) {
  const { raiz, modulo, nome, p, P, ESCALA, mono } = cfg;
  const { achar } = origemUnooria(raiz, ['src/unooria/tokens/typography.css']);
  const val = achar;

  const css = [];
  css.push(`/* ==========================================================================
   Tokens de Tipografia — Design System ${nome}
   Família e escala da Plataforma Unooria (\`src/unooria/tokens/typography.css\`):
   Open Sans, com tamanhos e alturas de linha nos degraus da escala Unooria
   (valores de área de trabalho, a primeira declaração da origem). O comentário
   de cada linha nomeia o token de origem. Sem letter-spacing, como na escala da
   plataforma: as variáveis \`-tracking\` existem apenas para que o componente
   nunca invente um valor. Nenhum corpo abaixo de 12px.

   ARQUIVO GERADO da mesma tabela que \`typography.ts\`
   (\`scripts/gerar-tokens-${modulo}.mjs\`).
   ========================================================================== */

:root {
  /* Famílias */
  --${p}-font-sans: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
${mono ? `\n  /* Pilha monoespaçada do sistema: a Unooria não publica fonte monoespaçada */\n  --${p}-font-mono: ${mono};\n` : ''}
  /* Biblioteca de ícones da Plataforma Unooria (--unooria-icon-font-family) */
  --${p}-icon-font-family: 'Material Symbols Rounded', sans-serif;

  /* Pesos */
${Object.entries(PESOS)
  .map(([n, v]) => `  --${p}-font-weight-${n}: ${v}; /* --unooria-weight-${n} */`)
  .join('\n')}
`);
  for (const [, slug, nomeEstilo, degrau, peso, uso] of ESCALA) {
    css.push(`  /* ${nomeEstilo} — ${uso} */
  --${p}-font-${slug}-size: ${val(`--unooria-size-${degrau}`)}; /* --unooria-size-${degrau} */
  --${p}-font-${slug}-weight: ${PESOS[peso]}; /* --unooria-weight-${peso} */
  --${p}-font-${slug}-line: ${val(`--unooria-line-height-${degrau}`)}; /* --unooria-line-height-${degrau} */
  --${p}-font-${slug}-tracking: 0px;
`);
  }
  css.push(`}

/* ==========================================================================
   Classes utilitárias
   ========================================================================== */

.${p}-text {
  font-family: var(--${p}-font-sans);
  color: var(--${p}-color-text-primary);
  margin: 0;
}
`);
  for (const [, slug, , , , , italico, caixaAlta] of ESCALA) {
    css.push(`.${p}-text--${slug} {
  font-size: var(--${p}-font-${slug}-size);
  font-weight: var(--${p}-font-${slug}-weight);
  line-height: var(--${p}-font-${slug}-line);
  letter-spacing: var(--${p}-font-${slug}-tracking);${italico ? '\n  font-style: italic;' : ''}${caixaAlta ? '\n  text-transform: uppercase;' : ''}
}
`);
  }
  css.push(`.${p}-text--secondary {
  color: var(--${p}-color-text-secondary);
}

.${p}-text--accent {
  color: var(--${p}-color-text-accent);
}
`);

  const ts = `/**
 * Tokens de Tipografia do Design System ${nome}.
 * Família e degraus da Plataforma Unooria (Open Sans). Espelho TypeScript de
 * \`typography.css\`, gerado da mesma tabela.
 */

/**
 * Chaves da escala tipográfica do módulo.
 */
export type ${P}TypographyToken =
${ESCALA.map(([k]) => `  | '${k}'`).join('\n')};

/**
 * Definição completa de um estilo tipográfico.
 */
export interface ${P}TypographyStyle {
  /** Nome do estilo na escala (ex.: "Title/Large") */
  styleName: string;
  /** Token da Unooria de que o tamanho foi copiado (ex.: "--unooria-size-body-s") */
  unooria: string;
  /** Tamanho da fonte em pixels */
  fontSize: number;
  /** Peso da fonte (400, 500, 600 ou 700) */
  fontWeight: number;
  /** Altura de linha em pixels */
  lineHeight: number;
  /** Espaçamento entre letras em pixels (sempre 0) */
  letterSpacing: number;
  /** Variável CSS de tamanho (as demais trocam o sufixo) */
  cssVar: string;
  /** Classe utilitária CSS correspondente */
  className: string;
  /** Uso recomendado dentro do produto */
  usage: string;
}

/**
 * Família tipográfica com cadeia de fallback multiplataforma.
 */
export const ${p}FontFamily =
  "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
${mono ? `\n/**\n * Pilha monoespaçada do sistema (a Unooria não publica fonte monoespaçada).\n */\nexport const ${p}FontMono =\n  ${q(mono)};\n` : ''}
/**
 * Família da biblioteca de ícones (fonte de ligadura).
 */
export const ${p}IconFontFamily = "'Material Symbols Rounded', sans-serif";

/**
 * Pesos disponíveis.
 */
export const ${p}FontWeights = ${JSON.stringify(PESOS, null, 2).replace(/"(\w+)"/g, '$1')} as const;

/**
 * Escala tipográfica completa.
 */
export const ${p}Typography: Record<${P}TypographyToken, ${P}TypographyStyle> = {
${ESCALA.map(
  ([k, slug, nomeEstilo, degrau, peso, uso]) => `  ${k}: {
    styleName: '${nomeEstilo}',
    unooria: '--unooria-size-${degrau}',
    fontSize: ${parseInt(val(`--unooria-size-${degrau}`))},
    fontWeight: ${PESOS[peso]},
    lineHeight: ${parseInt(val(`--unooria-line-height-${degrau}`))},
    letterSpacing: 0,
    cssVar: '--${p}-font-${slug}-size',
    className: '${p}-text--${slug}',
    usage: ${q(uso)},
  },`
).join('\n')}
};

/**
 * Ordem canônica de exibição da escala em documentação.
 */
export const ${p}TypographyOrder: ${P}TypographyToken[] = [
${ESCALA.map(([k]) => `  '${k}',`).join('\n')}
];
`;

  const dir = path.join(raiz, 'src', modulo, 'tokens');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'typography.css'), css.join('\n'));
  fs.writeFileSync(path.join(dir, 'typography.ts'), ts);
  console.log(`tipografia: ${ESCALA.length} estilos.`);
}
