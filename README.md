# Unooria Design System (`@unooria/design-system`)

> Biblioteca oficial de componentes de interface, tokens de design e documentação interativa da Plataforma Unooria.

[![CI](https://github.com/lucas-salomao-unooria/storybook-unnoria/actions/workflows/ci.yml/badge.svg)](https://github.com/lucas-salomao-unooria/storybook-unnoria/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@unooria/design-system.svg)](https://www.npmjs.com/package/@unooria/design-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Storybook](https://img.shields.io/badge/Storybook-10+-ff4785.svg)](https://storybook.js.org/)

---

## 📌 Sumário

1. [Visão Geral](#-visão-geral)
2. [Stack Tecnológica](#-stack-tecnológica)
3. [Instalação](#-instalação)
4. [Configuração de Estilos](#-configuração-de-estilos)
5. [Guia de Uso e Exemplos](#-guia-de-uso-e-exemplos)
   - [Exemplo com React (Vite / SPA)](#exemplo-com-react-vite--spa)
   - [Exemplo com Next.js (App Router)](#exemplo-com-nextjs-app-router)
   - [Uso de Tokens e Variáveis CSS](#uso-de-tokens-e-variáveis-css)
6. [Componentes Disponíveis](#-componentes-disponíveis)
7. [Scripts de Desenvolvimento](#-scripts-de-desenvolvimento)
   - [Inventário de Componentes para o Gerador de Missões](#inventário-de-componentes-para-o-gerador-de-missões)
8. [Estrutura do Pacote](#-estrutura-do-pacote)
9. [Guia de Versionamento e Publicação no NPM](#-guia-de-versionamento-e-publicação-no-npm)
   - [1. Configuração do Secret no GitHub](#1-configuração-do-secret-no-github)
   - [2. Publicação Automatizada via GitHub Actions](#2-publicação-automatizada-via-github-actions)
   - [3. Publicação Manual via Terminal](#3-publicação-manual-via-terminal)

---

## 📖 Visão Geral

O **Unooria Design System** foi concebido sob os mais rigorosos padrões de engenharia de software e fidelidade de design (Figma). Ele fornece uma base consistente, acessível e performática para criação de aplicações web modernas.

### Principais Características:
- **Suporte Nativo a Temas (Light & Dark)**: Todos os componentes e tokens respondem fluidamente ao tema selecionado (`theme="light" | "dark"` ou classes `.unooria-theme-light` / `.unooria-theme-dark`).
- **Arquitetura Dual ESM + CommonJS**: Compatibilidade total com empacotadores modernos (Vite, Webpack, Turbopack, Rollup) e Node.js.
- **Tipagem Estrita em TypeScript**: Autocomplete inteligente e definições completas (`.d.ts`).
- **Zero Dependências Pesadas em Runtime**: Focado em CSS modularizado e React puro.

---

## 🛠️ Stack Tecnológica

- **Core**: React 18+ / React 19+
- **Linguagem**: TypeScript 5+
- **Bundler de Produção**: [tsup](https://tsup.egoist.dev/) (esbuild + rollup-dts)
- **Documentação & Playground**: Storybook 10
- **Estilização**: CSS Vanilla com CSS Variables e Design Tokens padronizados

---

## 📦 Instalação

Instale o pacote no seu projeto utilizando o gerenciador de pacotes de sua preferência:

```bash
# npm
npm install @unooria/design-system

# yarn
yarn add @unooria/design-system

# pnpm
pnpm add @unooria/design-system

# bun
bun add @unooria/design-system
```

> **Nota:** Certifique-se de que `react` e `react-dom` (versão 18 ou 19) estejam instalados no seu projeto.

---

## 🎨 Configuração de Estilos

Para garantir que todos os tokens de cor, tipografia, elevação, espaçamento e componentes sejam renderizados corretamente, importe a folha de estilos compilada no ponto de entrada global da sua aplicação.

### No Next.js (`app/layout.tsx` ou `pages/_app.tsx`):
```tsx
import '@unooria/design-system/styles.css';
```

### No React com Vite (`src/main.tsx` ou `src/index.tsx`):
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@unooria/design-system/styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🚀 Guia de Uso e Exemplos

### Exemplo com React (Vite / SPA)

```tsx
import React, { useState } from 'react';
import { Button, AlertBox, Badge, Breadcrumb } from '@unooria/design-system';

export function Dashboard() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Configurações', href: '/settings' },
    { label: 'Perfil' },
  ];

  return (
    <div
      className={theme === 'dark' ? 'unooria-theme-dark' : 'unooria-theme-light'}
      style={{
        minHeight: '100vh',
        padding: '32px',
        background: theme === 'dark' ? '#0f172a' : '#f8fafc',
        color: theme === 'dark' ? '#f8fafc' : '#0f172a',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Breadcrumb items={breadcrumbItems} theme={theme} />
        
        <Button
          variant="secondary"
          size="sm"
          theme={theme}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Alternar Tema ({theme === 'light' ? '🌙 Dark' : '☀️ Light'})
        </Button>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <h1>Painel Unooria</h1>
          <Badge variant="brand" theme={theme}>v0.1.0</Badge>
          <Badge variant="success" theme={theme}>Ativo</Badge>
        </div>

        <AlertBox
          severity="info"
          theme={theme}
          title="Novidade no Design System"
          description="Todos os componentes agora possuem empacotamento otimizado para produção."
          isDismissible
        />

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <Button variant="primary" theme={theme} onClick={() => alert('Salvo com sucesso!')}>
            Salvar Alterações
          </Button>
          <Button variant="outline" theme={theme}>
            Cancelar
          </Button>
        </div>
      </main>
    </div>
  );
}
```

---

### Exemplo com Next.js (App Router)

`app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import '@unooria/design-system/styles.css';

export const metadata: Metadata = {
  title: 'Minha Aplicação Unooria',
  description: 'Criada com @unooria/design-system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="unooria-theme-light">{children}</body>
    </html>
  );
}
```

`app/page.tsx`:
```tsx
'use client';

import { Button, AlertBox, Badge, Breadcrumb } from '@unooria/design-system';

export default function HomePage() {
  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Documentação' },
        ]}
      />

      <h1 style={{ marginTop: '24px', fontSize: '32px' }}>Plataforma Unooria</h1>
      
      <div style={{ margin: '16px 0' }}>
        <Badge variant="success">Em Produção</Badge>
      </div>

      <AlertBox
        severity="success"
        title="Pacote Pronto!"
        description="O Design System Unooria foi integrado com sucesso na sua aplicação Next.js."
      />

      <div style={{ marginTop: '24px' }}>
        <Button variant="primary" onClick={() => console.log('Clicado')}>
          Começar Agora
        </Button>
      </div>
    </main>
  );
}
```

---

### Uso de Tokens e Variáveis CSS

Você pode importar os tokens diretamente em TypeScript ou utilizar as variáveis CSS no seu próprio CSS / Styled Components / Tailwind:

```tsx
import { tokens } from '@unooria/design-system';

// Acesso a tokens em TypeScript
console.log(tokens.unooriaColorsLight.brandPrimary[500]);
console.log(tokens.unooriaSpacing.scale[16]);
```

No seu arquivo CSS:
```css
.meu-card-customizado {
  background-color: var(--unooria-color-surface-card);
  border-radius: var(--unooria-radius-md, 8px);
  padding: var(--unooria-space-16, 16px);
  box-shadow: var(--unooria-elevation-2);
  color: var(--unooria-color-text-primary);
}
```

---

## 🧩 Componentes Disponíveis

| Componente | Descrição | Principais Props |
| :--- | :--- | :--- |
| **`Button`** | Botão interativo com variantes (primary, secondary, outline, text, destructive), tamanhos (sm, md, lg) e estados. | `variant`, `size`, `theme`, `disabled`, `loading`, `leftIcon`, `rightIcon` |
| **`AlertBox`** | Caixa de alerta e notificações de status com severidades (info, success, warning, error, neutral). | `severity`, `title`, `description`, `theme`, `isDismissible`, `onDismiss`, `action` |
| **`Badge`** | Etiqueta compacta para tags, status, categorias e contadores. | `variant`, `size`, `theme`, `icon`, `isDot` |
| **`Breadcrumb`** | Navegação hierárquica em trilha de migalhas com suporte a truncamento e colapso de itens. | `items`, `maxItems`, `separator`, `theme`, `onItemClick` |

---

## 💻 Scripts de Desenvolvimento

No repositório do Design System:

| Comando | Descrição |
| :--- | :--- |
| `npm run storybook` | Inicia o servidor de desenvolvimento do Storybook na porta 6007 |
| `npm run build-storybook` | Compila a documentação estática do Storybook |
| `npm run build:package` | Compila o pacote NPM gerando a pasta `dist/` via `tsup` |
| `npm run typecheck` | Executa a verificação estrita de tipos TypeScript (`tsc --noEmit`) |
| `npm run lint` | Executa a análise estática de código com ESLint |
| `npm run inventario:gerador -- --saida <dir>` | Gera localmente o inventário de componentes que o gerador de missões lê (ver abaixo) |
| `npm run test:inventario` | Testa o inventário (`node --test`, sem dependência) |

### Inventário de Componentes para o Gerador de Missões

**O que é.** A lista dos componentes públicos de cada marca do pacote, por versão. Marca é **toda** pasta `src/<marca>/` que tenha `index.ts` ou `index.tsx` — não existe lista fixa, então uma marca nova entra sozinha. Os nomes saem dos `export const|function|class` em PascalCase e dos `export { … } from`, seguindo os `export * from` a partir do `index`; tipos (`type`) e nomes terminados em `Props` ou `Context` ficam de fora. A leitura mora em `scripts/lib/inventario-componentes.mjs` e é a mesma do `/ds-componentes.json` servido pelo Storybook.

**Quem lê.** O gerador de missões (repositório `gerador-missoes`). No início de cada execução ele lê `design-system/atual.json`, fixa a versão para a execução inteira e confere contra `ds-componentes.json` todo nome de componente que os agentes dele chamam de "do DS". A seção `unitube` do gerador corresponde à marca `unootube` (campo `secao_para_marca`).

**Onde fica.** No bucket próprio `gs://entre-redes-dev-base-plataforma/`, que o gerador monta só para leitura. Até 07/10/2026 era o prefixo `base-plataforma/` do bucket das sessões do gerador, que o listava como uma missão e o apagou duas vezes pelo botão de excluir:

```
design-system/
├── atual.json                  # ponteiro para a versão vigente, gravado POR ÚLTIMO (Cache-Control: no-store)
└── <versao>/
    └── ds-componentes.json     # { commit, data_commit, pacote, versao, sincronizado_em, secao_para_marca, marcas }
```

**Quando é gravado.** Pelo job `inventario` do `publish-npm.yml`, depois de cada `npm publish` bem-sucedido. O job é separado do de publicação: se o inventário falhar, a versão continua no npm e o erro aparece num job vermelho só dele. Para regravar à mão, rode o workflow em **Actions > Publicar Pacote no NPM > Run workflow** marcando `somente_inventario`. A autenticação usa as variáveis do repositório `WIF_PROVIDER` e `DEPLOY_SA`.

**Comando local** (não envia nada):

```bash
node scripts/inventario-para-o-gerador.mjs --saida /tmp/ds
# grava /tmp/ds/design-system/<versao>/ds-componentes.json e /tmp/ds/design-system/atual.json
```

`--enviar gs://entre-redes-dev-base-plataforma` gera num temporário e sobe com o `gcloud`: primeiro a pasta da versão, depois o `atual.json`. Marca sem componente nenhum é aviso (entra com lista vazia); nenhuma marca é erro.

---

## 📂 Estrutura do Pacote

```
@unooria/design-system/
├── dist/
│   ├── index.mjs          # Saída ESM (para bundlers modernos)
│   ├── index.cjs          # Saída CommonJS (para Node.js / legados)
│   ├── index.d.ts         # Definições TypeScript consolidadas
│   └── styles.css         # CSS consolidado com todos os tokens e componentes
├── src/                   # Código-fonte TypeScript e CSS
├── package.json
└── README.md
```

---

## 🚢 Guia de Versionamento e Publicação no NPM

### 1. Configuração do Secret no GitHub

Para que as publicações automatizadas funcionem:
1. Acesse o [NPMjs.com](https://www.npmjs.com/) e gere um **Access Token** do tipo `Automation`.
2. No repositório GitHub, navegue até **Settings > Secrets and variables > Actions**.
3. Crie um novo Secret com o nome: `NPM_TOKEN` e cole o token gerado.

---

### 2. Publicação Automatizada via GitHub Actions

O repositório possui o workflow `.github/workflows/publish-npm.yml` pronto para publicação.

**Fluxo recomendado:**
1. Atualize a versão semântica:
   ```bash
   # Para correções de bugs (0.1.0 -> 0.1.1)
   npm version patch

   # Para novas funcionalidades compatíveis (0.1.0 -> 0.2.0)
   npm version minor

   # Para mudanças com quebra de compatibilidade (0.1.0 -> 1.0.0)
   npm version major
   ```
2. Envie a tag e os commits para o GitHub:
   ```bash
   git push origin main --tags
   ```
3. O GitHub Actions detectará a tag `v*` e executará o build, validação de tipos e o `npm publish --access public` automaticamente!
4. *(Opcional)* Você também pode criar uma **Release** no GitHub a partir da tag ou disparar manualmente pela aba **Actions > Publicar Pacote no NPM > Run workflow**.

---

### 3. Publicação Manual via Terminal

Caso precise publicar diretamente do terminal:

```bash
# 1. Realizar login no NPM (caso ainda não esteja logado)
npm login

# 2. Executar verificação de tipos e compilação do pacote
npx tsc --noEmit
npm run build:package

# 3. Atualizar versão (opcional caso já tenha alterado no package.json)
npm version patch

# 4. Publicar pacote com acesso público
npm publish --access public
```

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo de licença para obter mais informações.
