// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Ignores globais do ESLint 9 (flat config).
 *
 * Um objeto de configuração que contém APENAS a chave `ignores` funciona como
 * ignore global: os padrões valem para toda a execução do ESLint, inclusive
 * quando `npm run lint` é chamado sem nenhum caminho explícito. É por isso que
 * este bloco vem isolado, sem `rules`, `files` ou `languageOptions`.
 *
 * Sem estes padrões o ESLint varre os bundles minificados de build e reporta
 * milhares de problemas em código gerado, tornando o resultado inútil.
 */
const ignoresGlobais = {
  ignores: [
    // Dependências instaladas: código de terceiros, nunca é código-fonte nosso.
    "node_modules/**",
    // Saída do `tsup` (pacote NPM publicado): bundles gerados por build.
    "dist/**",
    // Saída do `storybook build`: site estático gerado, não é código-fonte.
    "storybook-static/**",
    // Cache e saída de build do Next.js: artefatos gerados a cada `next dev/build`.
    ".next/**",
    // Saída do `next export`: HTML/JS estático gerado, não é código-fonte.
    "out/**",
    // Saída genérica de build (Next.js e outras ferramentas): artefato gerado.
    "build/**",
    // Relatórios de cobertura do Vitest/v8: HTML e JS instrumentado gerados.
    "coverage/**",
    // Artefatos de build da Playwright/Vitest browser mode: gerados na execução dos testes.
    "playwright-report/**",
    "test-results/**",
    // Cache incremental do TypeScript: arquivo gerado pelo compilador.
    "*.tsbuildinfo",
    // Tipos ambiente gerados automaticamente pelo Next.js a cada `next dev`.
    "next-env.d.ts",
    // Logs gerados pelo Storybook em caso de falha de build.
    "*storybook.log",
  ],
};

/**
 * `@next/next/no-img-element` não se aplica ao design system.
 *
 * A regra manda trocar `<img>` por `next/image`. Faz sentido em `app/`, que é
 * uma aplicação Next.js — mas `src/` é uma biblioteca publicada no NPM cujas
 * únicas peer dependencies são `react` e `react-dom`. Usar `next/image` ali
 * criaria dependência dura de Next e quebraria quem consome o pacote em React
 * puro, Vite ou Remix. `stories/` renderiza esses mesmos componentes.
 *
 * A regra segue ativa em `app/`, onde é legítima.
 */
const semRegraDeImagemNoPacote = {
  files: ["src/**/*.{ts,tsx}", "stories/**/*.{ts,tsx}", ".storybook/**/*.{ts,tsx}"],
  rules: {
    "@next/next/no-img-element": "off",
  },
};

const eslintConfig = defineConfig([
  // Precisa vir primeiro para também substituir os ignores padrão do eslint-config-next.
  ignoresGlobais,
  ...nextVitals,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
  // Sobrescritas do repositório: precisam vir depois das configs importadas.
  semRegraDeImagemNoPacote,
]);

export default eslintConfig;
