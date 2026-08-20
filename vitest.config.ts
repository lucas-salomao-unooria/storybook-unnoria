import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  optimizeDeps: {
    /**
     * O setup do `@storybook/addon-vitest` puxa `@testing-library/dom`, cujas
     * dependências `aria-query` e `lz-string` são CommonJS puro (sem campo
     * `module` nem `exports`). O scanner do Vite não as descobre, porque só são
     * importadas de dentro do bundle já compilado do addon em `node_modules`.
     * Sem o pré-bundle, o arquivo CJS cru é servido ao browser e o import
     * nomeado quebra o setup — derrubando as 132 estórias antes de qualquer
     * teste rodar. Pré-bundlar o pacote raiz converte a cadeia inteira.
     */
    include: ['@testing-library/dom'],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
