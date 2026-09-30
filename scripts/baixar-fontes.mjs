/**
 * Baixa as famílias do Google Fonts e gera os `tokens/fonts.css` de cada marca.
 *
 * Por que existe: até a versão 0.1.15 cada `fonts.css` continha um
 * `@import url('https://fonts.googleapis.com/...')`. Funcionava, mas obrigava
 * todo app que consome o pacote a fazer uma requisição a um terceiro em tempo
 * de renderização — com o custo de latência, a dependência de rede e a questão
 * de privacidade que isso carrega. As fontes passaram a ser **embutidas no
 * pacote**: arquivos `.woff2` em `src/fonts/`, referenciados por `url()`
 * relativa a partir do `fonts.css` de cada marca.
 *
 * Rode com `npm run fontes` sempre que precisar acrescentar um peso, uma
 * família ou atualizar os arquivos. O resultado é determinístico: o script
 * regrava `src/fonts/` e os `fonts.css` inteiros.
 *
 * SUBSETS: só `latin` e `latin-ext` são baixados para as famílias de texto —
 * juntos cobrem português, inglês, espanhol, francês, alemão e italiano. Um
 * produto que precise de cirílico, grego ou vietnamita deve acrescentar o
 * subset aqui e rodar de novo. O Material Symbols não tem subset: o Google o
 * serve como arquivo único.
 */

import fs from 'node:fs';
import path from 'node:path';

/*
 * O Google só devolve `woff2` quando reconhece um navegador moderno no
 * User-Agent. Com o UA padrão do Node ele responde com `ttf`, que é entre três
 * e cinco vezes maior.
 */
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const RAIZ = path.resolve(import.meta.dirname, '..');
const DIR_FONTES = path.join(RAIZ, 'src', 'fonts');

/**
 * Os subsets mantidos para as famílias de texto, identificados pelo início do
 * `unicode-range` que o Google declara em cada bloco `@font-face`.
 */
const SUBSETS_MANTIDOS = [
  'U+0000-00FF', // latin
  'U+0100-02AF', // latin-ext
  'U+0100-02BA', // latin-ext (variação recente da faixa)
];

/**
 * As famílias de cada marca.
 *
 * `query` é o parâmetro `family` da API CSS2 do Google, literal. `slug` nomeia
 * a pasta em `src/fonts/`. `todosOsSubsets` marca as fontes que não devem ser
 * filtradas — o caso do Material Symbols, que vem em arquivo único.
 */
const MARCAS = {
  unooria: {
    prefixo: '--unooria',
    familias: [
      { nome: 'Open Sans', slug: 'open-sans', query: 'Open+Sans:ital,wght@0,300..800;1,300..800' },
      {
        nome: 'Material Symbols Rounded',
        slug: 'material-symbols-rounded',
        query:
          'Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        todosOsSubsets: true,
      },
    ],
  },
  chatgpt: {
    prefixo: '--gpt',
    familias: [{ nome: 'Inter', slug: 'inter', query: 'Inter:wght@400;500;600;700' }],
  },
  whatsappmobile: {
    prefixo: '--wa',
    familias: [
      { nome: 'PT Sans', slug: 'pt-sans', query: 'PT+Sans:wght@400;700' },
      { nome: 'Poppins', slug: 'poppins', query: 'Poppins:wght@600' },
    ],
  },
  tiktooria: {
    prefixo: '--tik',
    familias: [{ nome: 'Montserrat', slug: 'montserrat', query: 'Montserrat:wght@400;600;700' }],
  },
  unoochat: {
    prefixo: '--unc',
    familias: [
      { nome: 'Open Sans', slug: 'open-sans', query: 'Open+Sans:ital,wght@0,300..800;1,300..800' },
      {
        nome: 'Material Symbols Rounded',
        slug: 'material-symbols-rounded',
        query:
          'Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        todosOsSubsets: true,
      },
    ],
  },
  unoovista: {
    prefixo: '--unv',
    familias: [
      { nome: 'Open Sans', slug: 'open-sans', query: 'Open+Sans:ital,wght@0,300..800;1,300..800' },
      {
        nome: 'Material Symbols Rounded',
        slug: 'material-symbols-rounded',
        query:
          'Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        todosOsSubsets: true,
      },
    ],
  },
  unoogaleria: {
    prefixo: '--ugl',
    familias: [
      { nome: 'Open Sans', slug: 'open-sans', query: 'Open+Sans:ital,wght@0,300..800;1,300..800' },
      {
        nome: 'Material Symbols Rounded',
        slug: 'material-symbols-rounded',
        query:
          'Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        todosOsSubsets: true,
      },
    ],
  },
  unooriaai: {
    prefixo: '--uai',
    familias: [
      { nome: 'Open Sans', slug: 'open-sans', query: 'Open+Sans:ital,wght@0,300..800;1,300..800' },
      {
        nome: 'Material Symbols Rounded',
        slug: 'material-symbols-rounded',
        query:
          'Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        todosOsSubsets: true,
      },
    ],
  },
  unootube: {
    prefixo: '--uni',
    familias: [{ nome: 'Roboto', slug: 'roboto', query: 'Roboto:wght@400;500;700' }],
  },
};

/** Quebra a folha do Google em blocos `@font-face` já parseados. */
const lerBlocos = (css) => {
  const blocos = [];
  const regex = /@font-face\s*\{([^}]+)\}/g;
  let achado;

  while ((achado = regex.exec(css)) !== null) {
    const corpo = achado[1];
    const campo = (nome) => {
      const m = corpo.match(new RegExp(`${nome}:\\s*([^;]+);`));
      return m ? m[1].trim() : undefined;
    };
    const url = corpo.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1];
    if (!url) continue;

    blocos.push({
      familia: campo('font-family'),
      estilo: campo('font-style') ?? 'normal',
      peso: campo('font-weight') ?? '400',
      stretch: campo('font-stretch'),
      display: campo('font-display') ?? 'swap',
      unicodeRange: campo('unicode-range'),
      url,
    });
  }

  return blocos;
};

/** Mantém apenas os subsets latinos, salvo quando a família pede todos. */
const filtrarSubsets = (blocos, todosOsSubsets) => {
  if (todosOsSubsets) return blocos;
  return blocos.filter(
    (b) => !b.unicodeRange || SUBSETS_MANTIDOS.some((s) => b.unicodeRange.startsWith(s))
  );
};

const baixar = async (url) => {
  const resposta = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!resposta.ok) throw new Error(`${resposta.status} ao baixar ${url}`);
  return Buffer.from(await resposta.arrayBuffer());
};

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const main = async () => {
  fs.rmSync(DIR_FONTES, { recursive: true, force: true });
  fs.mkdirSync(DIR_FONTES, { recursive: true });

  let totalGeral = 0;

  for (const [marca, { familias }] of Object.entries(MARCAS)) {
    const regras = [];
    let totalMarca = 0;

    for (const familia of familias) {
      const css = await (
        await fetch(`https://fonts.googleapis.com/css2?family=${familia.query}&display=swap`, {
          headers: { 'User-Agent': UA },
        })
      ).text();

      const blocos = filtrarSubsets(lerBlocos(css), familia.todosOsSubsets);
      if (blocos.length === 0) {
        throw new Error(`Nenhum @font-face casou para ${familia.nome} — a API do Google mudou?`);
      }

      const pasta = path.join(DIR_FONTES, familia.slug);
      fs.mkdirSync(pasta, { recursive: true });

      /* Contador por assinatura, para nomear arquivos de forma estável. */
      const usados = new Map();

      for (const bloco of blocos) {
        const base = `${familia.slug}-${bloco.estilo}-${bloco.peso.replace(/\s+/g, '_')}`;
        const n = (usados.get(base) ?? 0) + 1;
        usados.set(base, n);
        const arquivo = `${base}${n > 1 ? `-${n}` : ''}.woff2`;

        const bytes = await baixar(bloco.url);
        fs.writeFileSync(path.join(pasta, arquivo), bytes);
        totalMarca += bytes.length;

        regras.push(
          [
            '@font-face {',
            `  font-family: ${bloco.familia};`,
            `  font-style: ${bloco.estilo};`,
            `  font-weight: ${bloco.peso};`,
            bloco.stretch ? `  font-stretch: ${bloco.stretch};` : null,
            `  font-display: ${bloco.display};`,
            `  src: url('../../fonts/${familia.slug}/${arquivo}') format('woff2');`,
            bloco.unicodeRange ? `  unicode-range: ${bloco.unicodeRange};` : null,
            '}',
          ]
            .filter(Boolean)
            .join('\n')
        );
      }

      console.log(`  ${familia.nome.padEnd(26)} ${String(blocos.length).padStart(2)} arquivos`);
    }

    const cabecalho = `/**
 * Fontes do Design System ${marca}.
 *
 * As famílias são **embutidas no pacote**: os arquivos \`.woff2\` vivem em
 * \`src/fonts/\` e são referenciados por \`url()\` relativa. Nenhuma requisição
 * ao Google Fonts acontece em tempo de execução — quem instala o pacote já
 * recebe a fonte junto.
 *
 * ESTE ARQUIVO É GERADO. Não edite à mão: rode \`npm run fontes\`, que refaz
 * \`src/fonts/\` e todos os \`tokens/fonts.css\` a partir de
 * \`scripts/baixar-fontes.mjs\`. Para acrescentar um peso ou uma família,
 * altere a configuração naquele script.
 *
 * Subsets: apenas \`latin\` e \`latin-ext\`, que juntos cobrem português,
 * inglês, espanhol, francês, alemão e italiano.
 */

`;

    fs.writeFileSync(
      path.join(RAIZ, 'src', marca, 'tokens', 'fonts.css'),
      cabecalho + regras.join('\n\n') + '\n'
    );

    console.log(`${marca.padEnd(16)} ${kb(totalMarca).padStart(8)}\n`);
    totalGeral += totalMarca;
  }

  console.log(`Total embutido: ${kb(totalGeral)}`);
};

await main();
