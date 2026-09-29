import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';

/**
 * O pacote é emitido **sem bundling**: um arquivo de saída por arquivo de
 * origem, preservando o grafo de módulos.
 *
 * Por que não um bundle único (o formato anterior):
 *
 * 1. `'use client'` — o esbuild descarta silenciosamente a diretiva de qualquer
 *    módulo que não seja o entry point. Com bundle único, a única diretiva que
 *    sobrevivia era a do topo de `src/index.ts`, marcando **todo** o pacote como
 *    client. Sem bundling, cada arquivo é o próprio entry e mantém a sua — os
 *    componentes puramente apresentacionais voltam a poder rodar como Server
 *    Components.
 * 2. Tree-shaking — com um só módulo de 1,3 MB, `sideEffects` e o tree-shaking
 *    do consumidor não tinham granularidade. Um app que usa apenas o
 *    Instanooria arrastava as quatro marcas.
 *
 * Duas consequências que exigiram solução explícita, ambas verificadas:
 *
 * - O tsup **não reescreve os specifiers relativos** (`from './Badge'` fica sem
 *   extensão). Isso é ESM inválido e também quebra o esbuild (usado pelo Vite
 *   dev no optimizeDeps). O script `scripts/corrigir-specifiers.mjs`, que roda
 *   no `build:package` logo após o tsup, normaliza todos os specifiers
 *   adicionando `.mjs`/`.cjs` conforme o formato. O guard
 *   `scripts/verificar-esm.mjs` falha o build se restar algum sem extensão.
 * - O gerador de tipos do tsup **quebra** com esta quantidade de entradas (o
 *   worker aborta e não emite nada). As declarações passaram a ser emitidas
 *   pelo `tsc --emitDeclarationOnly`, no script `build:package`.
 */

const OUT = 'dist';

/**
 * Em modo bundleless o `import './X.css'` permanece no JS emitido, então cada
 * CSS precisa existir ao lado do seu módulo dentro de `dist/`.
 *
 * Os `.woff2` e os `tokens/fonts.css` NÃO entram por aqui. Eles são resolvidos
 * pelas entradas `fonts/*` do passo 2, que empacotam os `@font-face` e emitem
 * os arquivos com hash de conteúdo. Copiá-los também colocaria cada fonte duas
 * vezes no pacote — foram 14 MB dos 33,8 MB na 0.1.16.
 */
const EXTENSOES_COPIADAS = ['.css'];

/** Arquivos que o passo 2 já resolve e que não devem ser copiados crus. */
const NAO_COPIAR = (origem: string) =>
  origem.endsWith(`${path.sep}fonts.css`) ||
  origem.includes(`${path.sep}src${path.sep}fonts${path.sep}`);

const copiarCssColocalizado = () => {
  const origemRaiz = path.resolve('src');
  const destinoRaiz = path.resolve(OUT);

  const andar = (dir: string) => {
    for (const nome of fs.readdirSync(dir)) {
      const origem = path.join(dir, nome);
      if (fs.statSync(origem).isDirectory()) {
        andar(origem);
        continue;
      }
      if (!EXTENSOES_COPIADAS.some((ext) => nome.endsWith(ext))) continue;
      if (NAO_COPIAR(origem)) continue;
      const destino = path.join(destinoRaiz, path.relative(origemRaiz, origem));
      fs.mkdirSync(path.dirname(destino), { recursive: true });
      fs.copyFileSync(origem, destino);
    }
  };

  andar(origemRaiz);
};

export default defineConfig([
  {
    // Passo 1 — JavaScript, sem bundling.
    entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.stories.*'],
    outDir: OUT,
    format: ['esm', 'cjs'],
    bundle: false,
    dts: false,
    splitting: false,
    clean: true,
    sourcemap: true,
    minify: false,
    tsconfig: 'tsconfig.build.json',
    outExtension({ format }) {
      return { js: format === 'esm' ? '.mjs' : '.cjs' };
    },
    onSuccess: async () => {
      copiarCssColocalizado();
    },
  },
  {
    /**
     * Passo 2 — folhas de estilo agregadas.
     *
     * Estas continuam com bundling: o objetivo delas é justamente resolver os
     * `@import` e entregar um arquivo único por marca. `clean: false` para não
     * apagar o que o passo 1 emitiu.
     *
     * O prefixo `styles-` não é enfeite: uma entrada chamada `unooria` colide
     * com o diretório `dist/unooria/` do passo 1.
     */
    entry: {
      styles: 'src/styles.css',
      'styles-unooria': 'src/styles-unooria.css',
      'styles-instanooria': 'src/styles-instanooria.css',
      'styles-chatgpt': 'src/styles-chatgpt.css',
      'styles-whatsappmobile': 'src/styles-whatsappmobile.css',
      'styles-tiktooria': 'src/styles-tiktooria.css',
      'styles-unootube': 'src/styles-unootube.css',
      'styles-unoochat': 'src/styles-unoochat.css',
      'styles-unoovista': 'src/styles-unoovista.css',

      /*
       * Folhas de fonte, opt-in. Ficam separadas das folhas de componente para
       * que um app que resolva a tipografia por `next/font` não receba um
       * `@font-face` concorrente. O esbuild embute os `@font-face`, emite os
       * `.woff2` com hash de conteúdo e reescreve a `url()`.
       */
      'fonts/unooria': 'src/fonts-unooria.css',
      'fonts/chatgpt': 'src/fonts-chatgpt.css',
      'fonts/whatsappmobile': 'src/fonts-whatsappmobile.css',
      'fonts/tiktooria': 'src/fonts-tiktooria.css',
      'fonts/unootube': 'src/fonts-unootube.css',
      'fonts/unoochat': 'src/fonts-unoochat.css',
      'fonts/unoovista': 'src/fonts-unoovista.css',
    },
    esbuildOptions(options) {
      /* Os arquivos de fonte ao lado das folhas que os declaram. */
      options.assetNames = 'fonts/[name]-[hash]';
    },
    outDir: OUT,
    clean: false,
    sourcemap: true,
    minify: false,
  },
]);
