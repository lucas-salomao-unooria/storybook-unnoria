import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    styles: 'src/styles.css',
    /**
     * Entradas granulares: cada produto carrega só a seção que usa.
     *
     * O prefixo `styles-` não é enfeite: uma entrada chamada `unooria` colide
     * com o módulo `src/unooria/`, e o `export * from './unooria'` do index
     * passa a resolver para a entrada de CSS — o bundle ESM sai com os
     * namespaces vazios (7 KB em vez de 1,1 MB) e sem nenhum erro de build.
     */
    'styles-unooria': 'src/styles-unooria.css',
    'styles-instanooria': 'src/styles-instanooria.css',
    'styles-chatgpt': 'src/styles-chatgpt.css',
    'styles-whatsappmobile': 'src/styles-whatsappmobile.css',
  },
  format: ['esm', 'cjs'],
  dts: true,
  tsconfig: 'tsconfig.build.json',
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  onSuccess: async () => {
    const distDir = path.resolve(process.cwd(), 'dist');
    // Entradas de CSS não devem deixar artefatos JS/dts no pacote.
    const cssEntries = [
      'styles',
      'styles-unooria',
      'styles-instanooria',
      'styles-chatgpt',
      'styles-whatsappmobile',
    ];
    const extensions = ['.mjs', '.mjs.map', '.cjs', '.cjs.map', '.d.ts', '.d.mts', '.d.cts'];
    const filesToRemove = cssEntries.flatMap((entry) =>
      extensions.map((extension) => `${entry}${extension}`)
    );

    for (const file of filesToRemove) {
      const filePath = path.join(distDir, file);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch {
          // Ignorar se não existir
        }
      }
    }
  },
});
