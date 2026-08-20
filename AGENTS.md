<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Diretrizes de Arquitetura e Storybook - Design System Unooria (Padrão Ouro)

Este documento é a referência arquitetural e técnica obrigatória para o desenvolvimento de componentes, tokens e documentação interativa no Storybook da **Plataforma Unooria**.

---

## 1. Separação Estrita de Responsabilidade de Pastas

### 1.1. `src/` (Código-Fonte de Produção - Pacote NPM)
- Reservado **exclusivamente** para os arquivos distribuídos no pacote NPM.
- **REGRA CRÍTICA / PROIBIDO**: **NUNCA** crie arquivos `.stories.tsx` dentro da pasta `src/`.
- Cada componente deve residir em sua própria pasta sob `src/unooria/components/[NomeComponente]/`:
  - `[NomeComponente].tsx`: Implementação oficial do componente React (com forwardRef, acessibilidade e composição modular).
  - `[NomeComponente].types.ts`: Definições tipadas de interfaces e types TypeScript (Props, variantes, temas e handlers).
  - `[NomeComponente].css` (opcional): Estilos CSS nativos do componente baseados exclusivamente nos tokens de `src/unooria/tokens/`.
  - `index.ts`: Re-exportação do componente principal, subcomponentes e tipos.
- **Re-exportações Globais**: Todos os componentes e tipos devem ser registrados em `src/unooria/components/index.ts` e no ponto de entrada raiz do pacote em `src/index.ts`.
- **Tokens do Design System**: Armazenados em `src/unooria/tokens/` (`colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `blur.css`, `grids.css`, `icons.css`, `scrollbar.css`, etc.).

### 1.2. `stories/` (Ambiente de Testes, Exibição e Documentação Storybook)
- Reservado para todas as estórias, documentações interativas e playgrounds do Storybook.
- **Componentes da Plataforma Unooria**: `stories/unooria/components/[NomeComponente].stories.tsx`.
- **Fundação & Tokens Unooria**: `stories/unooria/foundation/` (`Colors.stories.tsx`, `Typography.stories.tsx`, `Spacing.stories.tsx`, `Elevation.stories.tsx`, `Blur.stories.tsx`, `Grids.stories.tsx`, `Icons.stories.tsx`, etc.).
- **Clone WhatsApp**: `stories/whatsapp/` (para tokens, telas e componentes do clone WhatsApp).
- **WhatsApp Mobile**: `stories/whatsappmobile/` (fundamentos, componentes e telas do clone em tema escuro).
- **Componentes Utilitários de Documentação**: Localizados em `.storybook/components/` (`UnooriaDocShell`, `UnooriaDocHeader`, `UnooriaDocSectionHeader`).

### 1.3. Módulos Multimarca (`src/whatsapp/`, `src/whatsappmobile/`, `src/instanooria/`, `src/chatgpt/`)
- O pacote hospeda **mais de um design system**. Cada marca vive em seu próprio módulo sob `src/`, com **namespace de tokens e prefixo de classes CSS exclusivos**, e é exportada do `src/index.ts` **apenas como namespace** (`WhatsAppUI`, `InstanooriaUI`) para evitar colisão de nomes com os componentes da Plataforma Unooria.
- **ChatGPT** (cliente de conversa com IA da Unooria, derivado do arquivo Figma "ChatGPT UI Kit (AI Chat) (Community)"):
  - Código de produção: `src/chatgpt/tokens/` e `src/chatgpt/components/[NomeComponente]/`.
  - Estórias: `stories/chatgpt/fundamentos/`, `stories/chatgpt/componentes/` e `stories/chatgpt/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/chatgpt/fixtures.ts`.
  - Prefixo de variáveis CSS: `--gpt-*`. Prefixo de classes: `.gpt-*`. Atributo de tema: `data-gpt-theme="light | dark"`.
- **WhatsApp Mobile** (cliente de mensagens móvel da Unooria, derivado do arquivo Figma "WhatsApp Clone - Dark mode (Community) - cópia"):
  - Código de produção: `src/whatsappmobile/tokens/` e `src/whatsappmobile/components/[NomeComponente]/`.
  - Estórias: `stories/whatsappmobile/fundamentos/`, `stories/whatsappmobile/componentes/` e `stories/whatsappmobile/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/whatsappmobile/fixtures.ts`.
  - Recursos rasterizados exportados do Figma (retratos, textura de conversa, fotografia e retrato de chamada): `public/whatsappmobile/`.
  - Prefixo de variáveis CSS: `--wa-*`. Prefixo de classes: `.wa-*`. Atributo de tema: `data-wa-theme="dark"` (o arquivo publica **apenas** o tema escuro).
- **Instanooria** (rede social visual da Unooria, derivada do arquivo Figma "Instagram UI Screens (Community)"):
  - Código de produção: `src/instanooria/tokens/` e `src/instanooria/components/[NomeComponente]/`.
  - Estórias: `stories/instanooria/fundamentos/`, `stories/instanooria/componentes/` e `stories/instanooria/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/instanooria/fixtures.ts`.
  - Prefixo de variáveis CSS: `--insta-*`. Prefixo de classes: `.insta-*`. Atributo de tema: `data-insta-theme="light | dark"`.
- **REGRA CRÍTICA**: um módulo de marca **NUNCA** consome tokens de outro. É proibido usar `var(--unooria-*)` dentro do Instanooria, do ChatGPT ou do WhatsApp Mobile, `var(--insta-*)` fora do Instanooria, `var(--gpt-*)` fora do ChatGPT e `var(--wa-*)` fora do WhatsApp Mobile — são marcas com hierarquias cromáticas distintas.

---

## 2. Uso Obrigatório e Estrito de Design Tokens (Zero Cores Hardcoded)

Todo e qualquer componente, estilo ou documentação **DEVE** utilizar exclusivamente as variáveis CSS oficiais criadas em `src/unooria/tokens/`. É **terminantemente proibido** utilizar valores hexadecimais avulsos ou cores arbitrárias de outros frameworks (ex: Tailwind `#e2e8f0`, `#64748b`, etc.).

### 2.1. Tokens de Cores e Overlays (`src/unooria/tokens/colors.css`)
- **Escala Primária (Brand Navy)**: `var(--unooria-color-brandnavy-50)` a `var(--unooria-color-brandnavy-950)`.
  - Cor de Destaque / Botões: `var(--unooria-color-brandnavy-600, #7FA5E2)`.
  - Cor Ativa / Selecionada: `var(--unooria-color-brandnavy-700, #6487C2)`.
- **Escala Neutra Light (Modo Claro)**:
  - Fundo Branco: `var(--unooria-color-neutral-50, #FFFFFF)`.
  - Fundo Secundário / Cards: `var(--unooria-color-neutral-100, #F5F5F5)`.
  - Bordas e Divisores: `var(--unooria-color-neutral-150, #E4E8E9)` ou `var(--unooria-color-neutral-200, #CBD4D6)`.
  - Texto Secundário / Muted: `var(--unooria-color-neutral-700, #475157)` ou `var(--unooria-color-neutral-500, #617379)`.
  - Texto Principal: `var(--unooria-color-neutral-950, #22272A)`.
- **Escala Neutra Dark (Modo Escuro)**:
  - Fundo Container Escuro: `var(--unooria-color-neutraldark-50, #22272A)`.
  - Bordas e Divisores Dark: `var(--unooria-color-neutraldark-200, #3D4448)`.
  - Texto Secundário Dark: `var(--unooria-color-neutraldark-900, #CBD4D6)`.
  - Texto Principal Dark: `var(--unooria-color-neutraldark-950, #F5F5F5)`.
- **Overlays e Transparências (RGBA Semântico)**:
  - `var(--unooria-color-opacity-brandnavy-50)` (5%), `100` (10%), `200` (20%), `300` (30%).
  - `var(--unooria-color-opacity-neutraldark-50)` (5%), `100` (10%), `300` (30%).
  - `var(--unooria-color-opacity-neutrallight-50)` (5%), `100` (10%), `300` (30%).
- **Severidades e Estados de Feedback**:
  - Danger (Perigo/Erro): `var(--unooria-color-danger-600, #E31A1A)`.
  - Success (Sucesso): `var(--unooria-color-success-500, #01B574)`.
  - Warning (Atenção): `var(--unooria-color-warning-500, #F97607)`.
  - Info / Ação: `var(--unooria-color-info-500, #0086FF)`.

### 2.2. Tipografia, Espaçamento, Bordas e Scrollbar
- **Tipografia**: `var(--unooria-font-sans, 'Open Sans', sans-serif)`.
- **Espaçamento**: `var(--unooria-spacing-4xs)` (2px) a `var(--unooria-spacing-xxxl)` (64px).
- **Raios de Borda**: `var(--unooria-radius-s)` (4px), `var(--unooria-radius-m)` (8px/12px), `var(--unooria-radius-full, 1000px)`.
- **Barra de Rolagem**: `var(--unooria-scrollbar-*)` e utilitários `.unooria-scrollbar`.

### 2.3. Tokens do Instanooria (`src/instanooria/tokens/`)
Todo componente, estilo ou documentação do Instanooria **DEVE** consumir exclusivamente as variáveis `--insta-*`. Os valores foram extraídos das **variáveis oficiais do arquivo Figma**, e não estimados a partir de capturas de tela.

- **Superfícies**: `--insta-color-background-primary` (`#FFFFFF` / `#000000`), `-secondary` (`#FAFAFA` / `#060606`), `-tertiary` (`#F8F8F8` / `#121212`), `-elevated` (`#FFFFFF` / `#262626`).
- **Texto**: `--insta-color-text-primary` (`#262626` / `#F9F9F9`), `-secondary` (`#8E8E93` / `#979797`), `-link` (`#3897F0` / `#3797EF`), `-placeholder`.
- **Ícones**: `--insta-color-icon-primary`, `--insta-color-icon-secondary`.
- **Bordas**: `--insta-color-border-default` (`#C7C7CC` / `#3C3C43`), `-subtle` (`rgba(60,60,67,0.29)` / `#48484A`), `-bar` (`#A6A6AA`).
- **Ações**: `--insta-color-action-primary` (`#3897F0`), `-disabled` (`#9FC4F2`), `--insta-color-fill-field` (`rgba(118,118,128,0.12)`).
- **Marca (invariantes entre temas)**: `--insta-color-brand-like` (`#ED4956`), `-verified` (`#3897F0`), `-notification`, `--insta-color-highlight-ring` (`#C7C7CC`).
- **Gradientes**: `--insta-gradient-story` (`#FBAA47 → #D91A46 → #A60F93`), `--insta-gradient-live` (`#E20337 → #C60188 → #7700C3`), `--insta-gradient-livebadge` (`#C90083 → #D22463 → #E10038`).
- **Tipografia**: família SF Pro via `--insta-font-sans`; escala de 14 estilos (`--insta-font-title-lg-*`, `--insta-font-label-md-*`, `--insta-font-nav-badge-*`, etc.) com pesos 400/510/590 e tracking negativo obrigatório.
- **Medidas**: escala `--insta-spacing-4xs` (2px) a `--insta-spacing-4xl` (48px), calha `--insta-gutter` (15px), raios `--insta-radius-xs` (3px) a `--insta-radius-full`, e dimensões estruturais (`--insta-topbar-height` 88px, `--insta-tabbar-height` 79px, `--insta-statusbar-height` 44px).
- **Elevação**: apenas hairlines de 0.33px (`--insta-elevation-hairline-bottom`, `-top`, `--insta-elevation-bar-bottom`, `-top`, `--insta-elevation-drawer`). **É proibido introduzir sombras com desfoque** — elas não existem no arquivo de design.

### 2.4. Tokens do ChatGPT (`src/chatgpt/tokens/`)
Todo componente, estilo ou documentação do ChatGPT **DEVE** consumir exclusivamente as variáveis `--gpt-*`. Os valores foram lidos via Plugin API das **coleções de variáveis e dos estilos publicados** da página `🟡 Design system`, e não estimados a partir de captura de tela.

- **Primitivas** (`Primitives/Colors`, modo único): `--gpt-color-black`, `-white`, `-gray-50|100|200|400|600|800|900`, `-purple-400|500|600|700`, `-blue-400|500|600`, `-green-500|600`, `-red-500|600`, `-orange-400|500`, `-yellow-500`, `-pink-400|500`. **Nunca aplicadas diretamente em componente** — servem de origem para os aliases semânticos.
- **Semânticas** (`Semantic/Colors`, modos `Light` e `Dark`): `--gpt-bg-primary|secondary|tertiary|inverse|brand`, `--gpt-text-primary|secondary|tertiary|inverse|brand|link`, `--gpt-border-default|strong|brand`, `--gpt-interactive-primary|hover|secondary` e `--gpt-status-success|error|warning|info`. Marca: `--gpt-interactive-primary` (`#5856D6` no Light, `#9F9FF8` no Dark).
- **Escada translúcida**: `--gpt-fill-2|4|8|10` para superfícies e `--gpt-text-soft-30|40|50|60|70|80` para hierarquia de texto por opacidade. Fiéis ao Light e espelhados em branco no Dark.
- **Overlays** (estilos de pintura `Overlay/*`, invariantes de tema): `--gpt-overlay-black-4|10|20|40|80` e `--gpt-overlay-white-20|40|80`.
- **Tipografia**: família Inter via `--gpt-font-sans`; escala de 13 estilos (`--gpt-font-display-xl-*`, `--gpt-font-heading-h1-*`, `--gpt-font-body-sm-*`, `--gpt-font-label-md-*`, `--gpt-font-caption-*`, etc.) com pesos 400/500/600 e **letter-spacing 0 em todos os degraus**.
- **Medidas**: escala `--gpt-spacing-0` (0) a `--gpt-spacing-18` (160px) em grade de 4px com os degraus finos de 2px e 6px preservados; raios `--gpt-radius-none` a `--gpt-radius-full`; dimensões `--gpt-size-icon-xs..xl`, `--gpt-size-avatar-sm..xl`, `--gpt-size-button-sm|md|lg`, `--gpt-size-sidebar` (260px) e `--gpt-size-input-height` (44px).
- **Elevação**: `--gpt-elevation-sm|md|lg|xl` dos estilos `Shadow/*`, mais `--gpt-elevation-knob` e `--gpt-elevation-modal` dos dois efeitos locais. A biblioteca é **plana por padrão** — cartões e campos se separam por contorno translúcido, e sombra existe apenas em diálogo e knob.

### 2.5. Tokens do WhatsApp Mobile (`src/whatsappmobile/tokens/`)
Todo componente, estilo ou documentação do WhatsApp Mobile **DEVE** consumir exclusivamente as variáveis `--wa-*`. O arquivo comunitário **não publica variáveis de cor** (`get_variable_defs` retorna vazio), portanto cada token foi lido do preenchimento literal do nó de origem e registra o `figmaNode` correspondente em `colors.ts`.

- **Superfícies (escada de luminância, sem sombra)**: `--wa-color-surface-base` (`#090E12`), `-canvas` (`#101D25`), `-appbar` (`#232D36`), `-sheet` (`#2D383E`), `-elevated` (`#313C42`), `-dialog` (`#364147`), `-datechip` (`#202B31`), `-notice` (`#1E2A31`), `-bubble-out` (`#054640`), `-bubble-out-strip` (`#043D36`), `-bubble-in` (`#232D36`, desvio), `--wa-color-scrim` (`rgba(0,0,0,0.6)`).
- **Família de verdes-água (onze tons distintos do arquivo, preservados)**: `--wa-color-accent` (`#0CA996`), `-accent-status` (`#189C87`), `-accent-fab` (`#00B09C`), `-accent-fab-chat` (`#04AD9C`), `-accent-fab-mic` (`#02AF9C`), `-accent-icon-call` (`#02AD9B`), `-accent-icon-video` (`#00B29C`), `-accent-control` (`#05AD9C`), `-accent-action` (`#25AC9D`), `-accent-badge` (`#01A590`), `-accent-underline` (`#20A497`), `-accent-call-out` (`#17B49F`). **É proibido consolidá-los** em um único token.
- **Severidades e chamada**: `--wa-color-danger-call-in` (`#DF788B`), `-danger-endcall` (`#E91C43`), `-warning-battery` (`#FDD015`), `--wa-color-call-statusbar` (`#04453D`), `-call-surface` (`#054C44`), `-call-text-encrypted` (`#8DB5B4`), `-call-icon` (`#B8C8C7`), `-call-icon-muted` (`#4B7F7B`).
- **Texto (25 tokens)**: `--wa-color-text-primary` (`#D3DAE0`), `-title` (`#CFD6DC`), `-appbar` (`#9DA5AC`), `-secondary` (`#868F94`), `-meta` (`#98A3A9`), `-meta-alt` (`#889397`), `-settings` (`#C5CED3`), `-settings-sub` (`#8A9295`), `-notice` (`#C7BE8A`, exclusivo do aviso de criptografia), `-bubble` (`#C3DDDC`), `-bubble-meta` (`#80B3AE`), `-on-accent` (`#232D36`), entre outros.
- **Ícones e bordas**: `--wa-color-icon-appbar` (`#FAFFFF`), `-icon-back` (`#9FA8B1`), `-icon-tick` (`#82B4B3`), `--wa-color-border-divider` (`#18252D`), `-border-dialog` (`#4D585E`), `-border-control` (`#A5B0B6`), `-border-status-ring` (`#C4C4C4`).
- **Ações da folha de anexos (única paleta multicolorida do arquivo)**: `--wa-color-attach-document` (`#5F66CE`), `-camera` (`#EC407A`), `-gallery` (`#BF57CF`), `-audio` (`#F78D0D`), `-location` (`#019D54`), `-contact` (`#0EAAF4`). **Não reaproveitar** em nenhum outro componente.
- **Tipografia**: PT Sans via `--wa-font-sans`, SF Compact Display via `--wa-font-statusbar` e Poppins via `--wa-font-brand`; escala de 18 estilos com os degraus **fracionários preservados** (`18.54px`, `15.54px`, `14.54px`, `16.544px`, `14.238px`, `13.54px`). O arquivo não usa `letter-spacing` e todos os `line-height` são `normal` — **é proibido** inventar tracking ou altura de linha.
- **Medidas**: escala `--wa-spacing-4xs` (2px) a `--wa-spacing-4xl` (48px), calhas `--wa-gutter` (19px, listas) e `--wa-gutter-appbar` (24px, barras), raios `--wa-radius-xs` (2px) a `--wa-radius-full`, dimensões estruturais (`--wa-device-width` 411px, `--wa-device-height` 823px, `--wa-appbar-height` 100px, `--wa-appbar-title-height` 52px, `--wa-subappbar-height` 57px, `--wa-callheader-height` 133px, `--wa-callbar-height` 87px) e diâmetros fixos de avatar (23/32/45/50px + anel de 56px) e de FAB (41/43/52/54/58px).
- **Elevação**: o arquivo é **plano**. O único efeito é `--wa-elevation-fab` (`0 4px 2px rgba(0,0,0,0.25)`), aplicado ao **glifo interno** do FAB — nunca ao círculo. **É proibido introduzir `box-shadow`** em barras, cartões, menus ou diálogos.

---

## 3. Convenção Oficial de Documentação em Componentes (Padrão Ouro)

Para garantir máxima fidelidade visual do Figma, interatividade total (cópia de tokens, simuladores, matrizes) e uma sidebar limpa sem duplicações ou telas em branco do `addon-docs`:

### 3.1. Uso Obrigatório do Componente Real da Pasta `src/`
- **REGRA MANDATÓRIA**: O Storybook deve **sempre importar e renderizar o componente real de produção da pasta `src/`**.
- É terminantemente **proibido** criar mockups paralelos ou réplicas artificiais dentro de `stories/`. Toda funcionalidade, estado, estilo, acessibilidade e temas devem ser consumidos diretamente do componente oficial.

### 3.2. Estrutura da Página de Documentação Rica
Todo componente **DEVE** declarar sua página de documentação rica usando os componentes utilitários de `.storybook/components`:
```tsx
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

const [NomeComponente]DocumentationPage = () => (
  <UnooriaDocShell>
    {/* 1. Cabeçalho Oficial com Badge, Categoria, Título e Descrição */}
    <UnooriaDocHeader
      badgeBrand="Plataforma Unooria"
      category="Componentes • [Categoria]"
      title="[NomeComponente]"
      description="[Descrição conceitual e técnica extraída das especificações do Figma]"
    />

    {/* Seções Obrigatórias:
        1. Visão Geral & Casos de Uso (Cards explicativos com ícones e propósito funcional)
        2. Figma & Especificações Técnicas (Link Dev Mode, Node ID Master e Component Sets)
        3. Anatomia do Componente (Zonas de customização, subcomponentes e propriedades visuais)
        4. Matriz de Variantes, Tamanhos e Estados (Exemplos renderizando o componente real)
        5. Boas Práticas (Cards comparativos de DO e DON'T com cores verde/vermelho)
        6. Suporte a Temas (Demonstração interativa com alternador em tempo real Light e Dark)
        7. Referência Completa de Props da API (Tabelas individuais detalhadas por componente) */}
  </UnooriaDocShell>
);
```

### 3.3. Configuração do Objeto `meta`
O objeto `meta` **NÃO DEVE** usar `tags: ['autodocs']` (para evitar abas vazias ou redundâncias na sidebar):
```tsx
const meta: Meta<typeof [NomeComponente]> = {
  title: 'Plataforma Unooria/Componentes/[NomeComponente]',
  component: [NomeComponente],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    // Especificação completa de tipos, controls e descrições das props
  },
  args: {
    // Valores padrão para o Playground
  },
};

export default meta;
```

### 3.4. Ordem Obrigatória de Exportação das Estórias
1. **Primeira História (Mandatória - Bullet de Documentação Dedicado)**:
   ```tsx
   type Story = StoryObj<typeof [NomeComponente]>;

   /**
    * Documentação rica e completa do componente baseada nas especificações do Figma.
    */
   export const Documentacao: Story = {
     name: '📄 Documentação Completa',
     render: () => <[NomeComponente]DocumentationPage />,
   };
   ```

2. **Playgrounds Individuais com 100% das Props Mapeadas**:
   - Cada componente (ou subcomponente individual no caso de suítes como `DataViz`) deve possuir seu próprio **Playground Dedicado** (`🕹️ 1. ...`, `🕹️ 2. ...`) com **todas as propriedades da API expostas em `args` e `argTypes`** (controles de texto, números, sliders de escala, radios de temas, booleans e JSON de dados).

3. **Histórias Interativas e Canônicas Subsequentes**:
   - `🎨 Exemplo Oficial do Figma`: Réplica visual de 1:1 dos frames oficiais do Figma (ex: formulário de 5 campos no `Modal`, itens de slot no `Collapse`).
   - `TodasVariantes` / `AllSeverities`: Matrizes visuais completas de variantes.
   - `Tamanhos` / `Sizes`: Comparação de tamanhos suportados (`sm`, `md`, `lg`, `full`).
   - `Estados` / `States`: Estados interativos (hover, active, focus, disabled, loading).
   - `ComposicaoModular`: Uso flexível com Compound Components (`[Componente].Header`, `[Componente].Body`, etc.).

---

## 4. Diretrizes de Qualidade Visual, UX e Acessibilidade

### 4.1. Visualização de Dados (DataViz)
- **SVG Puro (Zero Dependências)**: Gráficos vetoriais renderizados nativamente em SVG com React, sem bibliotecas pesadas de terceiros (D3, Chart.js, Recharts).
- **Balões Flutuantes Inteligentes (`DataVizTooltip`)**: Todos os gráficos pertinentes devem exibir balões estilizados no hover com categoria, indicador cromático e valores formatados.
- **Gráfico Radar**: 100% customizável em quantidade de eixos ($\ge 3$), níveis de profundidade da grade (`gridLevels`), escala máxima (`maxValue`), rótulos de escala e múltiplas séries sobrepostas.
- **Scrollbars Sutis**: Toda rolagem interna (legendas de gráficos, listas de ranking, corpo de modais) deve usar `scrollbar-width: thin` e trilhos transparentes, eliminando scrollbars cinzas do Windows com setas.

### 4.2. Contraste e Suporte Nativo a Temas (Light & Dark)
- No **Light Mode**: Fundo branco `var(--unooria-color-neutral-50, #FFFFFF)`, texto primário `var(--unooria-color-neutral-950, #22272A)`, texto secundário `var(--unooria-color-neutral-700, #475157)`, bordas `var(--unooria-color-neutral-150, #E4E8E9)`.
- No **Dark Mode**: Fundo escuro `var(--unooria-color-neutraldark-50, #22272A)`, texto primário `var(--unooria-color-neutraldark-950, #F5F5F5)`, texto secundário `var(--unooria-color-neutraldark-900, #CBD4D6)`, bordas `var(--unooria-color-neutraldark-200, #3D4448)`.
- **Prevenção de Camuflagem**: Garantir que títulos e valores numéricos em cards sobrescrevam cores para texto claro no Dark Mode.

### 4.3. Acessibilidade (a11y)
- Semântica ARIA completa (`role="dialog"`, `role="progressbar"`, `role="button"`, `role="region"`, `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-describedby`).
- Navegação completa por teclado (ESC para fechar modais/menus, Tab/Shift+Tab com focus trapping, Enter/Espaço para acionamento).

### 4.4. Iconografia Derivada do Figma
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou substituído por outra biblioteca. Todo ícone do Instanooria vive em `src/instanooria/components/Icon/IconPaths.tsx` com o atributo `d` **literal do export SVG do Figma** e o `viewBox` original preservado (não normalizado para 24×24).
- O mesmo vale para o logotipo (`src/instanooria/components/Logo/LogoVector.ts`) e para os glifos de sistema do iPhone X (`src/instanooria/components/PhoneFrame/DeviceGlyphs.tsx`).
- Ao adicionar um glifo novo, exporte o SVG do Figma, extraia o caminho e registre-o em `instaIcons` com `figmaName`, `viewBox` e `usage` preenchidos.

---

## 5. Validação Obrigatória e Critérios de Aceite
Antes de considerar qualquer tarefa de componente ou documentação concluída:
1. Validar que **todos os estilos e cores consomem as variáveis CSS do módulo correspondente** (`src/unooria/tokens/` para a Plataforma Unooria, `src/instanooria/tokens/` para o Instanooria, `src/chatgpt/tokens/` para o ChatGPT, `src/whatsappmobile/tokens/` para o WhatsApp Mobile, `src/whatsapp/tokens/` para o WhatsApp UI), sem hexadecimais avulsos e sem mistura entre marcas.
2. Executar `npx tsc --noEmit` e garantir **0 erros de compilação TypeScript**.
3. Executar `node scripts/verificar-css-agregado.mjs` e garantir que **todo CSS de token e de componente está nas folhas agregadas** publicadas (`src/styles.css`, `src/styles-unooria.css`, `src/styles-instanooria.css`, `src/styles-chatgpt.css`).
4. Executar `npm run build-storybook` e validar o **build sem falhas do Storybook**.

---

## 6. Design System Instanooria (Seção `Instanooria` do Storybook)

O **Instanooria** é a rede social visual da Plataforma Unooria, implementada a partir do arquivo Figma [Instagram UI Screens (Community)](https://www.figma.com/design/RA6xg5xo3Ty2iXpjlqVnXq/Instagram-UI-Screens--Community---c%C3%B3pia-) (`fileKey RA6xg5xo3Ty2iXpjlqVnXq`, página `0:2`, 19 telas × 2 temas).

### 6.1. Títulos das Estórias
- **Fundamentos**: `Instanooria/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação & Gradientes | Ícones]`.
- **Componentes**: `Instanooria/Componentes/[NomeComponente]`.
- **Telas compostas**: `Instanooria/Telas/Telas Compostas`.

### 6.2. Componentes Oficiais
`Icon`, `Logo`, `Avatar`, `Badge`, `Button`, `Divider`, `StoryBubble`, `StoriesTray`, `TopBar`, `TabBar`, `PostCard` (composto), `TextField`, `SearchField`, `Chip`, `SegmentedTabs`, `ListItem`, `NotificationItem`, `ProfileHeader`, `MediaGrid`, `PhoneFrame` e `StoryViewer`.

- Os destaques do perfil **não têm componente próprio**: são `StoriesTray` com `bordered={false}` e itens em estado `seen` / `add`. Não duplicar.
- `PhoneFrame` é um contêiner **de documentação**, não de produção.

### 6.3. Kit de Documentação
As estórias do Instanooria usam o `UnooriaDocShell` como moldura e os utilitários de `.storybook/components/InstaDocKit.tsx`: `InstaDocGrid`, `InstaDocCard`, `InstaDocFigmaSpecs`, `InstaDocStage`, `InstaDocPractices`, `InstaDocThemeSwitcher`, `InstaDocPropsTable` e `InstaDocTokenSwatch`. Toda estória mantém as seções obrigatórias do Padrão Ouro definidas na seção 3.

### 6.4. Registro de Desvios em Relação ao Figma
Qualquer divergência intencional em relação ao arquivo de design **DEVE** ser documentada na seção "Figma & Especificações Técnicas" da estória do componente. Desvios registrados até o momento:
- **PostCard.Timestamp**: o Figma vincula a data a `color/text/primary`; o Instanooria usa `--insta-color-text-secondary` para preservar a hierarquia de leitura entre legenda e metadado exigida pela seção 4.2.

---

## 7. Design System ChatGPT (Seção `ChatGPT` do Storybook)

O **ChatGPT** é o cliente de conversa com IA da Plataforma Unooria, implementado a partir do arquivo Figma [ChatGPT UI Kit (AI Chat) (Community)](https://www.figma.com/design/FlQnC8T6Sg5HdVodu0f7bL/ChatGPT-UI-Kit--AI-Chat--Community-) (`fileKey FlQnC8T6Sg5HdVodu0f7bL`).

### 7.1. Fonte Canônica: a Página `🟡 Design system`
O arquivo tem cinco páginas. A **única fonte de implementação** é a página `🟡 Design system` (`609:5682`), onde vivem as coleções de variáveis, os estilos publicados e os 17 componentes.

- A página `🟪 ChatGPT Web Client` (`665:2049`, 19 telas × 2 temas) está **inteiramente achatada em 4.516 nós vetoriais**, sem camadas de texto, componentes ou variáveis vinculadas. Ela serve apenas como referência de layout e fluxo — **não** é fonte de token nem de ícone.
- As coleções foram lidas via Plugin API: `Primitives/Colors` (25 variáveis, modo `Default`), `Semantic/Colors` (21 variáveis, modos `Light` e `Dark`), `Primitives/Spacing` (19), `Primitives/Radius` (10) e `Primitives/Sizing` (14). Somam-se 13 estilos de texto, 4 de efeito e 21 de pintura.

### 7.2. Títulos das Estórias
- **Fundamentos**: `ChatGPT/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação & Overlays | Glifos]`.
- **Componentes**: `ChatGPT/Componentes/[NomeComponente]`.
- **Telas compostas**: `ChatGPT/Telas/Telas Compostas`.

### 7.3. Componentes Oficiais (17)
`Button`, `IconButton`, `Avatar`, `Badge`, `Tag`, `Toggle`, `Divider`, `Input`, `ChatInput`, `SearchInput`, `NavItem`, `ChatBubble`, `GPTCard`, `SettingsRow`, `Sidebar` (composto), `FeatureCard` e `Modal` (composto).

- `Sidebar` expõe `Sidebar.NewChatButton`, `Sidebar.SectionLabel`, `Sidebar.Spacer` e `Sidebar.FooterItem`.
- `Modal` expõe `Modal.Header`, `Modal.Body` e `Modal.Footer`.
- A prop `theme` é **opcional e sem valor padrão** em todos os componentes: quando omitida, o componente herda o tema do contêiner ancestral via `data-gpt-theme`. Isso permite trocar o tema uma única vez, no nó mais externo.
- A moldura de janela e o cabeçalho de área usados em `ChatGPT/Telas` são **andaimes de documentação**, restritos a `stories/`, e não integram o pacote.

### 7.4. Iconografia: Glifos, Não Vetores
O arquivo de design **não publica biblioteca de ícones**: os componentes usam caracteres tipográficos em camadas de texto Inter Regular. Os sete caracteres literais estão em `src/chatgpt/tokens/glyphs.ts` (`gptGlyphs`): `✕` `→` `↑` `✦` `⌕` `+` `💬`.

- **PROIBIDO** desenhar um `<svg>`/`<path>` aproximado para substituir um glifo, ou adicionar símbolo que não exista em nenhuma camada do arquivo.
- Toda prop de glifo aceita `ReactNode`, de modo que um produto com família vetorial própria possa injetá-la sem alterar o componente.

### 7.5. Kit de Documentação
As estórias do ChatGPT usam o `UnooriaDocShell` como moldura e os utilitários de `.storybook/components/GptDocKit.tsx`: `GptDocGrid`, `GptDocCard`, `GptDocFigmaSpecs` (com o slot `deviations`), `GptDocStage`, `GptDocPractices`, `GptDocThemeSwitcher`, `GptDocPropsTable` e `GptDocTokenSwatch`. Toda estória mantém as seções obrigatórias do Padrão Ouro definidas na seção 3.

### 7.6. Registro de Desvios em Relação ao Figma
Qualquer divergência intencional **DEVE** ser documentada no slot `deviations` do `GptDocFigmaSpecs` da estória correspondente. Desvios registrados até o momento:

- **Alvos quadrados**: os frames de `IconButton`, `Avatar`, `GPTCard/Icon`, `ChatBubble/Avatar` e `ChatInput/SendButton` abraçam a largura do glifo (`layoutSizingHorizontal = HUG`), produzindo larguras de 8–20px contra alturas fixas. Os componentes renderizam o alvo **quadrado**, intenção confirmada pelo raio igual nos quatro cantos e pelos tokens `size/icon-*` e `size/avatar-*`.
- **Escada translúcida**: os componentes do arquivo aplicam preenchimentos literais de preto com opacidade (2/4/8/10%) e textos de preto com opacidade (30/40/50/60/70/80%), sem vínculo com variável. Foram tokenizados como `--gpt-fill-*` e `--gpt-text-soft-*`, fiéis no Light e espelhados em branco no Dark, seguindo a inversão declarada em `Semantic/Colors`.
- **Medidas literais**: valores sem degrau equivalente nas coleções estão anotados no CSS do componente — padding vertical de 10px (`Input`, `Sidebar.NewChatButton`), alturas 28/36/44 do `IconButton`, 36px do `SearchInput`, raio de 6px do `IconButton SM`, corpo de 13px do `FeatureCard` e alturas de linha 18/20px do `Button`.
- **Pesos e corpos tipográficos**: o peso 500 (Medium) e os corpos 10/11/13/19px usados por `Badge`, `Avatar`, `FeatureCard` e `Sidebar.SectionLabel` não têm estilo de texto publicado. O peso foi tokenizado como `--gpt-font-weight-medium`; os corpos permanecem literais e anotados.
- **Estados não publicados**: o arquivo não descreve hover, foco, desabilitado, scrim, `ESC` nem confinamento de foco. Foram acrescentados usando exclusivamente tokens da própria marca — hover pela escada translúcida ou `interactive/hover`, foco com anel de 2px em `border/brand`, desabilitado a 40% de opacidade e scrim em `Overlay/Black 40%`.
- **Sombras locais**: a sombra do knob do `Toggle` (`0 1 3 · preto 15%`) e a do `Modal` (`0 8 32 -4 · preto 15%`) não têm estilo de efeito publicado — a do `Modal` fica entre `Shadow/LG` e `Shadow/XL`. Foram tokenizadas como `--gpt-elevation-knob` e `--gpt-elevation-modal`.
- **`text/tertiary` e `color/gray/400`**: `text/tertiary` aponta para `color/gray/800` no Light e `color/purple/400` no Dark, e `color/gray/400` (`#9F9FFB`) é um lilás, não um cinza. Ambos foram preservados como declarados no arquivo, sem correção, para manter o vínculo com a variável de origem.
- **`size/button-*`**: a régua de 32/40/48 existe em `Primitives/Sizing` mas **não é usada por nenhum componente publicado** — `Button` e `IconButton` derivam a altura de padding mais altura de linha. Mantida nos tokens por fidelidade à coleção.
- **`Divider` vertical**: não existe como variante no arquivo; foi adicionado para separar controles em barras horizontais, com o mesmo preenchimento de 10%.
- **`SettingsRow.value` com controle**: o arquivo mostra apenas valor textual. Aceitar `Toggle`, `Button` e `Badge` no slot é extensão necessária, pois as telas de configuração do produto colocam controles nessa coluna.

---

## 8. Design System WhatsApp Mobile (Seção `Whatsapp Mobile` do Storybook)

O **WhatsApp Mobile** é o cliente de mensagens móvel da Plataforma Unooria, implementado a partir do arquivo Figma [WhatsApp Clone - Dark mode (Community) - cópia](https://www.figma.com/design/MSEV2CgXr84WwOyMauIBy2/WhatsApp-Clone---Dark-mode---Community---c%C3%B3pia-) (`fileKey MSEV2CgXr84WwOyMauIBy2`, página `0:1`, 75 frames de 411×823 — Google Pixel 2 XL).

### 8.1. Fonte Canônica e Limitações do Arquivo
- O arquivo é **posicionado em coordenadas absolutas**, sem auto layout, sem variáveis publicadas e sem estilos de efeito reutilizáveis. Todo token foi lido do preenchimento literal do nó e carrega o `figmaNode` de origem.
- O arquivo publica **exclusivamente o tema escuro**. **É proibido derivar um tema claro por cálculo**: a demonstração de tema usa o `WaDocSurfaceSwitcher`, que alterna entre as seis superfícies escuras oficiais.
- Os retratos, a textura de conversa e as fotografias são **bitmaps colados** nos frames. Foram exportados para `public/whatsappmobile/` e são informados por prop (`src`, `avatarSrc`, `portraitSrc`), nunca embutidos no pacote.

### 8.2. Títulos das Estórias
- **Fundamentos**: `Whatsapp Mobile/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação | Ícones]`.
- **Componentes**: `Whatsapp Mobile/Componentes/[NomeComponente]`.
- **Telas compostas**: `Whatsapp Mobile/Telas/Telas Compostas`.

### 8.3. Componentes Oficiais (29)
`Icon`, `StatusBar`, `Avatar`, `Badge`, `TopBar`, `TabBar`, `ListItem`, `ChatListItem`, `StatusListItem`, `CallListItem`, `SectionLabel`, `Fab`, `ChatHeader`, `DateChip`, `EncryptionNotice`, `MessageBubble` (composto: `.Media`, `.Document`), `MessageComposer`, `ChatWallpaper`, `Radio`, `Checkbox`, `TextButton`, `Dialog` (composto: `.Footer`), `Menu`, `SettingsItem`, `SearchField`, `FilterChip`, `AttachmentSheet`, `CallScreen` e `PhoneFrame`.

- `ChatListItem`, `StatusListItem` e `CallListItem` são **composições sobre o `ListItem`** — não duplicar a estrutura de linha.
- `PhoneFrame` é um contêiner **de documentação**, não de produção.
- O `Icon` é documentado apenas em `Fundamentos/Ícones`; não há estória duplicada em `Componentes`.

### 8.4. Iconografia Derivada do Figma
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou substituído por outra biblioteca. Todo ícone vive em `src/whatsappmobile/components/Icon/IconPaths.tsx` com o atributo `d` **literal do export SVG do Figma** e o `viewBox` original preservado (não normalizado para 24×24).
- Quando um glifo combina dois nós posicionados em coordenadas diferentes (`settingsHelp`, `composerCamera`), o deslocamento é aplicado via `transform="translate(…)"` — **jamais** reescrevendo as coordenadas do caminho.
- Quando o arquivo reaproveita o mesmo vetor girado (`overflow` a 90°, `phone` a -127,81°, `callOut`/`callIn` a -132,75°, `phoneFilled` a -45°, `settingsChats` a 180°), use a prop `rotate` em vez de duplicar vetor.
- Glifos exportados vazios pelo Figma (`icomoon-free:magic-wand`, chevrons de busca, ícones da folha de anexos e dos chips de filtro) **não foram registrados nem desenhados**; o desvio está registrado na estória correspondente.

### 8.5. Kit de Documentação
As estórias do WhatsApp Mobile usam o `UnooriaDocShell` como moldura e os utilitários de `.storybook/components/WaDocKit.tsx`: `WaDocGrid`, `WaDocCard`, `WaDocFigmaSpecs`, `WaDocDeviations`, `WaDocAnatomy`, `WaDocStage`, `WaDocPractices`, `WaDocSurfaceSwitcher`, `WaDocPropsTable` e `WaDocTokenSwatch`. Toda estória mantém as seções obrigatórias do Padrão Ouro definidas na seção 3; a seção "Suporte a Temas" é atendida pelo `WaDocSurfaceSwitcher`, já que o arquivo tem tema único.

### 8.6. Registro de Desvios em Relação ao Figma
Qualquer divergência intencional **DEVE** ser documentada com o `WaDocDeviations` na seção "Figma & Especificações Técnicas" da estória. Desvios registrados até o momento:
- **Tema claro**: ausente no arquivo; nenhum valor claro foi inventado.
- **`--wa-color-surface-bubble-in`**: nenhum frame publica balão de mensagem recebida; o token adota `#232D36` para preservar a hierarquia de luminância contra `#054640`.
- **`--wa-color-accent` vs. `--wa-color-accent-status`**: divergência do próprio arquivo (`#0CA996` em CHATS, `#189C87` em STATUS), preservada em dois tokens.
- **Elipses de 1px**: os FABs de conversa (52×51) e de status (41×40) são elipses no arquivo; a biblioteca usa círculos perfeitos.
- **Alinhamento do rótulo CALLS**: deslocado 9px à direita no arquivo; a biblioteca centraliza os três rótulos.
- **Cores dos glifos de configuração**: o arquivo usa três cinzas quase idênticos; a biblioteca aplica `--wa-color-icon-settings` a todos.
- **Geometria da bateria**: reconstruída como cápsula vertical, preservando cores e proporções dos três retângulos girados do arquivo.
- **Frames não reconstruídos**: teclado, captura de câmera e editor de imagem dependem de superfícies claras de sistema e fotografias em tela cheia, sem componentes de design system associados.
