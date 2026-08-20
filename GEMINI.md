# Guia de Desenvolvimento do Gemini / Agentes - Design System Unooria (Padrão Ouro)

Este documento estabelece as regras e padrões arquiteturais obrigatórios para desenvolvimento, criação de componentes, consumo de tokens e documentação no Storybook para a Plataforma Unooria.

> **Paridade obrigatória**: `GEMINI.md` e `AGENTS.md` compartilham o mesmo corpo normativo (seções 1 a 10) e diferem apenas neste cabeçalho. Ao alterar uma regra, **altere os dois arquivos na mesma edição**.

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
- **REGRA CRÍTICA / PROIBIDO**: nenhum arquivo `.stories.tsx` vive em `src/`, e nenhum componente de produção vive em `stories/`.
- **Plataforma Unooria**: `stories/unooria/components/[NomeComponente].stories.tsx` e `stories/unooria/fundamentos/` (`Colors`, `Typography`, `Spacing`, `Elevation`, `Blur`, `Grids`, `GridsWidgets`, `Icons`, `Logo`).
- **Marcas**: cada uma usa o mesmo trio de subpastas — `stories/[marca]/fundamentos/`, `stories/[marca]/componentes/` e `stories/[marca]/telas/` — mais um `stories/[marca]/fixtures.ts` com o conteúdo de demonstração compartilhado. Vale para `instanooria`, `chatgpt`, `whatsappmobile` e `tiktooria`.
- **Inconsistência conhecida**: a Plataforma Unooria usa `components/` (em inglês) e as marcas usam `componentes/`. É assim no repositório; ao criar uma estória, siga a convenção da pasta que já existe.
- **Recursos rasterizados** exportados do Figma ficam em `public/[marca]/` e são sempre informados por prop (`src`, `avatarSrc`, `coverSrc`, `portraitSrc`), **nunca embutidos no pacote**.
- **Componentes Utilitários de Documentação**: `.storybook/components/` reúne a moldura compartilhada (`UnooriaDocShell`, `UnooriaDocHeader`, `UnooriaDocSectionHeader`) e um kit de seções por marca (`InstaDocKit`, `GptDocKit`, `WaDocKit`, `TikDocKit`).

### 1.3. Módulos Multimarca (`src/whatsappmobile/`, `src/instanooria/`, `src/chatgpt/`, `src/tiktooria/`)
O pacote publica **cinco design systems** em um único artefato NPM:

| Marca | Módulo | Namespace | Prefixo CSS / classes | Tema ou contexto | Componentes | Arquivo Figma de origem |
|---|---|---|---|---|---|---|
| Plataforma Unooria | `src/unooria/` | `UnooriaUI` + exportação na raiz | `--unooria-*` / `.unooria-*` | Light e Dark | 38 | — (design próprio) |
| Instanooria | `src/instanooria/` | `InstanooriaUI` | `--insta-*` / `.insta-*` | `data-insta-theme="light \| dark"` | 21 | Instagram UI Screens (Community) |
| ChatGPT | `src/chatgpt/` | `ChatGPTUI` | `--gpt-*` / `.gpt-*` | `data-gpt-theme="light \| dark"` | 17 | ChatGPT UI Kit (AI Chat) (Community) |
| WhatsApp Mobile | `src/whatsappmobile/` | `WhatsAppMobileUI` | `--wa-*` / `.wa-*` | `data-wa-theme="dark"` — só escuro | 29 | WhatsApp Clone - Dark mode (Community) |
| Tik Tooria | `src/tiktooria/` | `TikTooriaUI` | `--tik-*` / `.tik-*` | `data-tik-surface="chrome \| immersive"` — dois contextos, não dois temas | 35 | TikTok UI Screens (Community) |

- Cada marca vive em seu próprio módulo sob `src/`, com **namespace de tokens e prefixo de classes CSS exclusivos**, e é exportada do `src/index.ts` **apenas como namespace** (`WhatsAppMobileUI`, `InstanooriaUI`, `ChatGPTUI`, `TikTooriaUI`, `UnitubeUI`). Só a Plataforma Unooria também é exportada na raiz — as marcas nunca, para evitar colisão de nomes (`Avatar`, `Badge`, `Button`, `TabBar` e `PhoneFrame` existem em mais de uma).
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
- **Tik Tooria** (rede de vídeo curto da Unooria, derivada do arquivo Figma "TikTok UI Screens (Community) - cópia"):
  - Código de produção: `src/tiktooria/tokens/` e `src/tiktooria/components/[NomeComponente]/`.
  - Estórias: `stories/tiktooria/fundamentos/`, `stories/tiktooria/componentes/` e `stories/tiktooria/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/tiktooria/fixtures.ts`.
  - Recursos rasterizados exportados do Figma (quadros de vídeo, retratos, miniaturas, capa de álbum e pré-visualização de câmera): `public/tiktooria/`.
  - Prefixo de variáveis CSS: `--tik-*`. Prefixo de classes: `.tik-*`. Atributo de contexto: `data-tik-surface="chrome | immersive"`.
- **Unitube** (plataforma de vídeo da Unooria, derivada do arquivo Figma "YouTube UI Clone Design (Community)"):
  - Código de produção: `src/unitube/tokens/` e `src/unitube/components/[NomeComponente]/`.
  - Estórias: `stories/unitube/fundamentos/`, `stories/unitube/componentes/` e `stories/unitube/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/unitube/fixtures.ts`.
  - Prefixo de variáveis CSS: `--uni-*`. Prefixo de classes: `.uni-*`. Atributo de tema: `data-uni-theme="dark"` (o arquivo publica **apenas** o tema escuro).
  - **Nenhum bitmap integra o pacote**: as miniaturas do arquivo são logotipos de terceiros e não foram redistribuídas. Todas as imagens entram por prop.
- **REGRA CRÍTICA**: um módulo de marca **NUNCA** consome tokens de outro. É proibido usar `var(--unooria-*)` dentro do Instanooria, do ChatGPT ou do WhatsApp Mobile, `var(--insta-*)` fora do Instanooria, `var(--gpt-*)` fora do ChatGPT `var(--wa-*)` fora do WhatsApp Mobile, `var(--tik-*)` fora do Tik Tooria e `var(--uni-*)` fora do Unitube — são marcas com hierarquias cromáticas distintas.

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

### 2.6. Tokens do Tik Tooria (`src/tiktooria/tokens/`)
Todo componente, estilo ou documentação do Tik Tooria **DEVE** consumir exclusivamente as variáveis `--tik-*`. O arquivo comunitário publica **quatro variáveis de cor**, **dois estilos de efeito** e **um estilo de texto**; todo o restante foi lido do preenchimento literal do nó via Plugin API e registra o `figmaNode` correspondente em `colors.ts`.

- **Marca (as quatro variáveis publicadas)**: `--tik-color-brand-button` (`#EA4359`, variável "Tik Tok Button"), `-brand-pink` (`#E6436D`), `-brand-cyan` (`#65D2E9`) e `-brand-dark` (`#161722`).
- **Dois contextos de superfície, não dois temas**: o arquivo publica o **cromo claro** das telas de lista, perfil e configuração e o **imersivo preto** do feed, da câmera e do leitor de QR. Não existe versão escura da folha de comentários nem versão clara do feed, portanto **é PROIBIDO derivar um tema por cálculo**. Os componentes que aparecem nos dois contextos (`StatusBar`, `HomeIndicator`, `TabBar`, `PhoneFrame`) recebem a prop `surface`, e ambos os valores são literais.
- **Superfícies**: `--tik-color-surface-primary` (`#FFFFFF`), `-sheet` (`#F5F5F4`), `-field` (`#F1F1F2`), `-action` (`#E8E8E7`), `-immersive` (`#000000`), `-media` (`#C4C4C4`), `--tik-color-scrim` (`rgba(0,0,0,0.4)`) e `-scrim-strong` (`rgba(0,0,0,0.6)`).
- **Texto (nove tokens)**: `--tik-color-text-primary` (`#161722`), `-secondary` (`#86878B`), `-tertiary` (`#8A8B8F`), `-muted` (`#7C7D83`, exclusivo da descrição de estado vazio), `-action` (`#4E4F57`, exclusivo do rótulo da folha), `-callout` (`#000000`), `-statusbar` (`#171717`), `-on-immersive` e `-on-immersive-muted`. **É proibido consolidar** `#86878B`, `#8A8B8F` e `#7C7D83`: o arquivo os usa em contextos distintos.
- **Ícones**: `--tik-color-icon-default` (`#86878B`), `-primary` (`#161722`), `-tab-inactive` (`#8A8B8F`), `-tab-disabled` (`#D7D7D9`), `-empty` (`#B0B0B3`), `-empty-alt` (`#AFB0B3`) e `-on-immersive` (`#FBFBFB`).
- **Bordas e fios**: `--tik-color-border-outline` (`#E3E3E4`), `-hairline` (`#D0D1D3`), `-separator` (`#DADBDB`), `-immersive` (`#262626`), `-grid` (`#FFFFFF`), `-tab-active` (`#161722`), `-statusbar` (`#979797`), `--tik-color-indicator-light` (`#060606`) e `-indicator-immersive` (`#E9E9E9`).
- **Marcas de terceiros (única paleta multicolorida do arquivo)**: `--tik-color-social-whatsapp` (`#65D072`), `-messenger` (`#2D67F6`), `-sms` (`#5FC87D`), `-facebook` (`#3173F1`), `-instagram-start|mid|end`, mais `--tik-color-avatar-invite` (`#ED7360`) e `-avatar-contacts` (`#67DDA0`). **Não reaproveitar** fora da folha de compartilhamento e da tela "Find friends".
- **Gradientes literais**: `--tik-gradient-disc` (GRADIENT_ANGULAR de quatro paradas, traduzido para `conic-gradient`), `--tik-gradient-marquee` (esmaecimento das pontas do letreiro de música) e `--tik-gradient-instagram` (GRADIENT_RADIAL do logotipo).
- **Tipografia**: Proxima Nova via `--tik-font-sans` e SF Pro Text via `--tik-font-system`; escala de **29 degraus**. O arquivo **não declara `line-height`** — todos são `normal`, exceto a legenda do vídeo, que fixa `19.5px`. O tracking existe em apenas seis degraus (`+0.15px`, `+0.1px`, `+0.5px`, `-0.25px`, `-0.3px`, `-0.6px`). **É proibido** inventar altura de linha ou tracking.
- **Medidas**: escala `--tik-spacing-4xs` (2px) a `--tik-spacing-4xl` (48px), calha `--tik-gutter` (16px), recuo de rótulo `--tik-row-inset` (48px), raios `--tik-radius-xs` (1px) a `--tik-radius-full`, dimensões estruturais (`--tik-device-width` 414px, `--tik-device-height` 896px, `--tik-navbar-height` 88px, `--tik-tabbar-height` 83px, `--tik-row-height` 52px, `--tik-social-row-height` 76px) e os **seis diâmetros de avatar** (32/47/49/56/90/96px), todos preservados. Os degraus fracionários `--tik-hairline` (0,33px) e `--tik-grid-hairline` (0,83px) **não podem ser arredondados**.
- **Elevação**: a biblioteca é **plana por padrão**. Os dois estilos publicados são `--tik-elevation-action-button` ("Action Button Shadow") e `--tik-text-drop` ("Text Drop"). Barras e cartões se separam por fios de 0,33px em quatro tons distintos, e desfoque existe apenas em cinco alvos flutuantes. **É proibido introduzir `box-shadow`** em linhas, campos, chips ou folhas inferiores.

### 2.7. Tokens do Unitube (`src/unitube/tokens/`)
Todo componente, estilo ou documentação do Unitube **DEVE** consumir exclusivamente as variáveis `--uni-*`. É o único arquivo da plataforma que **documenta os próprios tokens**: a página `🎨 Design System` (`104:3087`) publica as primitivas, nove tokens semânticos com nome e descrição de uso, a escala tipográfica, o espaçamento, os raios e as elevações. Os demais valores foram lidos do preenchimento literal do nó e registram o `figmaNode` em `colors.ts`.

- **Modo único — escuro**: o quadro semântico se intitula "SEMANTIC TOKENS (DARK MODE)" e o cabeçalho da página declara "Dark theme first". **É PROIBIDO derivar um tema claro por cálculo** — as primitivas neutras claras (`--uni-color-neutral-50` a `-400`) existem como origem de texto e contorno sobre fundo escuro, não como superfície.
- **Primitivas neutras (12 degraus)**: `--uni-color-white`, `-black` e `--uni-color-neutral-50|100|200|300|400|500|600|700|800|900`. **Nunca aplicadas diretamente em componente** — servem de origem para os aliases semânticos.
- **Quatro vermelhos distintos, preservados**: `--uni-color-red-500` (`#EE1A26`, semântico), `-600` (`#FC0D1C`, progresso da linha do tempo), `-700` (`#CC0000`, botão de inscrição) e `-800` (`#FF0000`, emblema do logotipo). Convivem na mesma tela — no reprodutor, o selo HD usa o semântico enquanto a linha do tempo usa o de progresso. **É proibido consolidá-los.** Acento: `--uni-color-blue-400` (`#9EBFD0`, cor de espera do quadro de vídeo).
- **Semânticos publicados (9)**: `--uni-color-background-primary` (`#181818`), `-secondary` (`#212121`), `-surface` (`#303030`), `--uni-color-text-primary` (`#FFFFFF`), `-secondary` (`#AAAAAA`), `-tertiary` (`#C4C4C4`), `--uni-color-brand-primary` (`#EE1A26`), `--uni-color-border-default` (`#EAEAEA`) e `-subtle` (`#303030`).
- **Semânticos derivados de nó**: `--uni-color-background-field` (`#121212`), `-inverse-deep` (`#000000`), `--uni-color-surface-inverse` (`#FFFFFF`), `--uni-color-text-inverse` (`#030303`), `--uni-color-brand-subscribe`, `-progress`, `-logo`, `--uni-color-player-chrome`, `-player-track`, `-player-buffer`, `-player-glyph-outline`, `--uni-color-overlay-duration`, `-poster-placeholder` e `--uni-color-border-active`.
- **Gradientes do reprodutor**: `--uni-gradient-player-top` e `-bottom`, os dois retângulos de 96px com `GRADIENT_LINEAR` no topo e na base do quadro.
- **Tipografia**: família Roboto via `--uni-font-sans`; escala de **onze degraus** (`--uni-font-heading-h1|h2|h3|h4-*`, `--uni-font-body-lg|md|sm-*`, `--uni-font-caption-*`, `--uni-font-caption-sm-*`, `--uni-font-label-lg|md-*`), com apenas dois pesos (400 e 700), alturas de linha absolutas em pixels e **`letter-spacing` zero em todos os degraus** — é proibido inventar tracking.
- **Medidas**: escala `--uni-spacing-0` a `--uni-spacing-64` em base de 4px, com os degraus finos de 1px, 2px, 6px e 10px **preservados**; raios `--uni-radius-none` (0) a `--uni-radius-full` (**80px literal**, não um valor arbitrariamente grande); dimensões estruturais (`--uni-desktop-width` 1440px, `--uni-topbar-height` 56px, `--uni-sidebar-width` 240px, `--uni-content-gutter` **65px**, `--uni-primary-column-width` 664px, `--uni-secondary-column-width` 426px) e os **seis diâmetros de avatar** (24/32/36/40/48/80px), todos literais.
- **Elevação**: `--uni-elevation-low|medium|high`, os três degraus publicados pelo quadro `Elevation`. A biblioteca é **plana por padrão** — nenhuma das três telas aplica `box-shadow`: a separação é feita por luminância de superfície e por fios de 1px em `--uni-color-border-subtle`. **É proibido introduzir `box-shadow`** em barras, cartões, listas ou pílulas.
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

- **Kit por marca**: a moldura (`UnooriaDocShell`, `UnooriaDocHeader`, `UnooriaDocSectionHeader`) é compartilhada, mas cada marca tem o próprio kit de seções — `InstaDocKit`, `GptDocKit`, `WaDocKit` e `TikDocKit` — com `…DocGrid`, `…DocCard`, `…DocFigmaSpecs`, `…DocAnatomy`, `…DocStage`, `…DocPractices`, `…DocPropsTable` e `…DocTokenSwatch`. Use o kit da marca do componente, **nunca o de outra**.
- **Seção 6 quando o arquivo não publica par claro/escuro**: se a origem tem um único tema (WhatsApp Mobile) ou dois contextos de superfície em vez de dois temas (Tik Tooria), a seção "Suporte a Temas" é atendida pelo alternador de superfícies da marca (`WaDocSurfaceSwitcher`, `TikDocSurfaceSwitcher`). **É PROIBIDO simular um tema que o arquivo de design não publica.**
- **Registro de desvios**: toda divergência intencional em relação ao arquivo de design é declarada na seção 2, com o utilitário de desvios da marca (`WaDocDeviations`, `TikDocDeviations`) ou o slot `deviations` do `GptDocFigmaSpecs`.

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
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou substituído por outra biblioteca de ícones. Todo dado vetorial é o **export SVG literal do nó do Figma**, com o `viewBox` original preservado — **não normalizado para 24×24**.
- Cada marca com biblioteca vetorial mantém o próprio registro, e é nele que o dado literal vive:
  - **Instanooria**: `src/instanooria/components/Icon/IconPaths.tsx` (`instaIcons`), mais o logotipo em `Logo/LogoVector.ts` e os glifos de sistema do iPhone X em `PhoneFrame/DeviceGlyphs.tsx`.
  - **WhatsApp Mobile**: `src/whatsappmobile/components/Icon/IconPaths.tsx` (`waIcons`).
  - **Tik Tooria**: `src/tiktooria/components/Icon/IconPaths.tsx` (`tikIcons`), mais os logotipos de terceiros em `SocialLogo/LogoVectors.ts`.
  - **ChatGPT**: **não tem biblioteca vetorial** — o arquivo de origem usa caracteres tipográficos, registrados em `src/chatgpt/tokens/glyphs.ts` (ver seção 7.4).
- Ao adicionar um glifo novo, exporte o SVG do Figma, copie os atributos (`d`, `cx/cy/r`, `x/y/width/height`) **sem edição** e preencha `figmaName`, `viewBox` e `usage` — mais `figmaNode` nos registros que o preveem.
- Quando o arquivo reaproveita o mesmo vetor girado ou espelhado, use as props `rotate` / `flipX` / `flipY` em vez de duplicar o caminho com coordenadas reescritas.
- Quando um glifo combina dois nós posicionados em coordenadas diferentes, aplique o deslocamento via `transform="translate(…)"` — **jamais** reescrevendo as coordenadas do caminho.
- Glifos que o Figma exporta vazios **não devem ser registrados nem desenhados**; o desvio é declarado na estória correspondente.

---

## 4.5. Emissão do Pacote e Fronteira Cliente/Servidor

O pacote é emitido **sem bundling**: um arquivo de saída por arquivo de origem (`bundle: false` em `tsup.config.ts`), preservando o grafo de módulos.

- **`'use client'` vale por arquivo.** O esbuild descarta silenciosamente a diretiva de qualquer módulo que não seja entry point; com bundle único, só a do topo de `src/index.ts` sobrevivia e marcava o pacote inteiro como client. **É PROIBIDO declarar `'use client'` em `src/index.ts`** ou nos barris de marca — isso anularia todos os componentes que hoje rodam como Server Components (**71 dos 140** na última medição: 2/38 na Plataforma Unooria, 10/21 no Instanooria, 14/17 no ChatGPT, 13/29 no WhatsApp Mobile e 32/35 no Tik Tooria). Para recontar depois de um `npm run build:package`:
  ```bash
  for d in dist/*/components/*/; do n=$(basename "$d"); f="$d$n.mjs"; \
    [ -f "$f" ] && { head -3 "$f" | grep -q 'use client' && echo client || echo server; }; \
  done | sort | uniq -c
  ```
- **Quando marcar um arquivo.** Declare `'use client'` como primeira instrução se o arquivo usar hooks, `createContext`, API de browser (`window`, `document`, `navigator`, `FileReader`…) ou repassar função a um filho via prop `onAlgo={…}` — Server Component não pode entregar função a Client Component.
- **Quando NÃO marcar.** Componentes que só recebem props e renderizam markup permanecem Server Components, mesmo que estendam `ButtonHTMLAttributes` e o consumidor venha a passar `onClick`. Marcar por precaução remove capacidade sem ganho.
- **Tipos são emitidos pelo `tsc`**, não pelo tsup: o gerador de tipos do tsup aborta com esta quantidade de entradas. Ver `scripts.build:package`.
- **CSS de componente é copiado para o `dist`** ao lado do módulo, porque o `import './X.css'` permanece no JS emitido.
- **Subpath exports por marca** (`@unooria/design-system/whatsappmobile`) existem para que um app que use uma marca não arraste as outras três.

---

## 5. Validação Obrigatória e Critérios de Aceite
Antes de considerar qualquer tarefa de componente ou documentação concluída:
1. Validar que **todos os estilos e cores consomem as variáveis CSS do módulo correspondente** (`src/unooria/tokens/` para a Plataforma Unooria, `src/instanooria/tokens/` para o Instanooria, `src/chatgpt/tokens/` para o ChatGPT, `src/whatsappmobile/tokens/` para o WhatsApp Mobile, `src/tiktooria/tokens/` para o Tik Tooria, `src/unitube/tokens/` para o Unitube), sem hexadecimais avulsos e sem mistura entre marcas.
2. Executar `npx tsc --noEmit` e garantir **0 erros de compilação TypeScript**.
3. Executar `node scripts/verificar-css-agregado.mjs` e garantir que **todo CSS de token e de componente está nas folhas agregadas** publicadas (`src/styles.css`, `src/styles-unooria.css`, `src/styles-instanooria.css`, `src/styles-chatgpt.css`, `src/styles-whatsappmobile.css`, `src/styles-tiktooria.css`, `src/styles-unitube.css`).
4. Executar `npm run build-storybook` e validar o **build sem falhas do Storybook**.
5. Executar `npm run lint` e garantir **0 erros e 0 warnings**.
6. Executar `npm test` e garantir que **todas as estórias renderizam** — a suíte Vitest monta cada estória em um Chromium real.
7. Executar `npm run build:package` e garantir que o pacote é emitido sem falhas, com os tipos gerados pelo `tsc` (ver seção 4.5).

---

## 6. Design System Instanooria (Seção `Instanooria` do Storybook)

O **Instanooria** é a rede social visual da Plataforma Unooria, implementada a partir do arquivo Figma [Instagram UI Screens (Community)](https://www.figma.com/design/RA6xg5xo3Ty2iXpjlqVnXq/Instagram-UI-Screens--Community---c%C3%B3pia-) (`fileKey RA6xg5xo3Ty2iXpjlqVnXq`, página `0:2`, 19 telas × 2 temas).

### 6.1. Títulos das Estórias
- **Fundamentos**: `Instanooria/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação & Gradientes | Ícones]`.
- **Componentes**: `Instanooria/Componentes/[NomeComponente]`.
- **Telas compostas**: `Instanooria/Telas/Telas Compostas`.

### 6.2. Componentes Oficiais (21)
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

---

## 9. Design System Tik Tooria (Seção `Tik Tooria` do Storybook)

O **Tik Tooria** é a rede de vídeo curto da Plataforma Unooria, implementada a partir do arquivo Figma [TikTok UI Screens (Community) - cópia](https://www.figma.com/design/UIYCB87CQkpFwf1aWTBl1a/TikTok-UI-Screens--Community---c%C3%B3pia-) (`fileKey UIYCB87CQkpFwf1aWTBl1a`, página `4:171`, 15 telas de 414×896 — iPhone XR/11).

### 9.1. Fonte Canônica e Limitações do Arquivo
- O arquivo é **posicionado em coordenadas absolutas**, sem auto layout. Publica quatro variáveis de cor (`Tik Tok Button`, `Tik Tok Pink`, `Tik Tok Light Blue`, `Tik Tok Dark`), dois estilos de efeito (`Action Button Shadow`, `Text Drop`) e um estilo de texto (`Button 10`). Todos os outros valores foram lidos do nó de origem via Plugin API e carregam o `figmaNode`.
- O arquivo publica **dois contextos de superfície**, não dois temas: o cromo claro e o imersivo preto. **É proibido derivar um tema claro/escuro por cálculo** — ver seção 2.6.
- A família do produto é **Proxima Nova**, fonte comercial da Adobe que **não pode ser distribuída com o pacote**. A pilha de fallback usa Montserrat e depois as famílias de sistema; um produto licenciado que registre a Proxima Nova via `@font-face` passa a usá-la automaticamente.
- Os quadros de vídeo, retratos, miniaturas, capa de álbum e pré-visualização de câmera são **bitmaps colados** nos frames. Foram exportados para `public/tiktooria/` e são informados por prop (`src`, `avatarSrc`, `coverSrc`), nunca embutidos no pacote.
- O frame `Cover` (`7:257`, 1200×660) é a capa do arquivo comunitário, não uma tela do produto, e **não foi reconstruído**.

### 9.2. Títulos das Estórias
- **Fundamentos**: `Tik Tooria/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação | Ícones]`.
- **Componentes**: `Tik Tooria/Componentes/[NomeComponente]`.
- **Telas compostas**: `Tik Tooria/Telas/Telas Compostas`.

### 9.3. Componentes Oficiais (35)
`Icon`, `StatusBar`, `HomeIndicator`, `PhoneFrame`, `NavBar`, `FeedHeader`, `TabBar` (composto: `.Item`, `.CreateButton`), `Avatar`, `ActionRail` (composto: `.Item`), `VideoMeta`, `MusicDisc`, `SectionLabel`, `Separator`, `SettingsRow`, `ListRow`, `SearchField`, `Button`, `Chip`, `StatTile`, `ProfileHeader`, `ProfileTabs`, `MediaGrid`, `Tooltip`, `Sheet` (composto: `.Header`, `.Body`), `CommentItem`, `CommentComposer`, `ShareAction`, `SocialLogo`, `EmptyState`, `SoundHeader`, `CameraToolRail` (composto: `.Item`), `RecordButton`, `CameraModeStrip`, `Scanner` e `PhotoCard`.

- `ListRow` é a linha de 76px com avatar; `SettingsRow` é a linha de 52px com glifo. **Não duplicar** a estrutura de linha.
- `StatTile` é subcomponente do `ProfileHeader`, exportado à parte para composições próprias.
- `PhoneFrame` é um contêiner **de documentação**, não de produção.
- O `Icon` é documentado apenas em `Fundamentos/Ícones`; não há estória duplicada em `Componentes`.
- Os andaimes `VideoLayer`, `At` e `Body` usados em `Tik Tooria/Telas` são **restritos a `stories/`** e não integram o pacote.

### 9.4. Iconografia Derivada do Figma
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou substituído por outra biblioteca. Todo ícone vive em `src/tiktooria/components/Icon/IconPaths.tsx` com o atributo `d` **literal do export SVG do Figma** e o `viewBox` original preservado (não normalizado para 24×24).
- O arquivo **não publica biblioteca de ícones**: cada glifo é um nó `VECTOR` ou `BOOLEAN_OPERATION` solto dentro de um frame de tela. A biblioteca foi montada nó a nó, deduplicando por forma idêntica.
- A prop `size` governa a **altura**; a largura é derivada da razão do `viewBox`. Isso preserva glifos não quadrados como `menu` (18×4) e `chevron` (6×11).
- **Oito glifos são multicoloridos** (`heart`, `comment`, `shareArrow`, `followPlus`, `verified`, `battery`, `effectsIllustration`, `uploadIllustration`): mantêm as cores literais do arquivo e ignoram a prop `tone`.
- Os logotipos de terceiros vivem em `src/tiktooria/components/SocialLogo/LogoVectors.ts`, também com os caminhos literais do export.
- Quando o arquivo reaproveita o mesmo vetor girado, use a prop `rotate` em vez de duplicar vetor.

### 9.5. Kit de Documentação
As estórias do Tik Tooria usam o `UnooriaDocShell` como moldura e os utilitários de `.storybook/components/TikDocKit.tsx`: `TikDocGrid`, `TikDocCard`, `TikDocFigmaSpecs`, `TikDocDeviations`, `TikDocAnatomy`, `TikDocStage`, `TikDocPractices`, `TikDocSurfaceSwitcher`, `TikDocPropsTable` e `TikDocTokenSwatch`. Toda estória mantém as seções obrigatórias do Padrão Ouro definidas na seção 3; a seção "Suporte a Temas" é atendida pelo `TikDocSurfaceSwitcher`, que alterna entre os **contextos de superfície** publicados, já que o arquivo não tem par claro/escuro.

### 9.6. Registro de Desvios em Relação ao Figma
Qualquer divergência intencional **DEVE** ser documentada com o `TikDocDeviations` na seção "Figma & Especificações Técnicas" da estória. Desvios registrados até o momento:
- **Ausência de tema claro/escuro**: o arquivo não publica o mesmo componente em duas versões cromáticas; modelar um tema exigiria inventar valores. Os componentes que aparecem nos dois contextos recebem a prop `surface`, com ambos os valores literais.
- **Proxima Nova**: fonte comercial, substituída por Montserrat na pilha de fallback.
- **Ausência de auto layout**: nenhum frame usa auto layout; os componentes reconstroem a geometria com flex e grid, preservando as medidas lidas nó a nó.
- **Espaçamentos por coordenada**: barra de abas, trilha de ações, coluna da câmera, tira de modos, métricas do perfil e ações da folha têm intervalos irregulares no arquivo. Cada componente usa um espaçamento único equivalente à distância média medida, registrado na própria estória.
- **Gradientes traduzidos**: `GRADIENT_ANGULAR` do disco → `conic-gradient` com cada parada multiplicada por 360°; `GRADIENT_LINEAR` do letreiro → `background-clip: text`; `GRADIENT_RADIAL` do Instagram → `radial-gradient` com centro canônico da marca.
- **Véu do leitor de QR**: a operação booleana de subtração foi reproduzida por `box-shadow` de raio 0 e alcance de 9999px.
- **Estados de interação**: o arquivo é estático e não descreve hover, foco, desabilitado nem pressionado. Foram acrescentados usando exclusivamente tokens da própria marca — realce em `--tik-color-surface-sheet`, foco com anel de 2px em `--tik-color-brand-button`, desabilitado a 40% de opacidade e redução de escala no `:active`.
- **Elementos promovidos a semântica correta**: linhas de lista viraram `<button>`, rótulo de seção virou `<h2>`, separador virou `<hr>` e a folha declara `role="dialog"` com `aria-modal="false"` — o que o design mostra.
- **Estado curtido do comentário**: o arquivo publica apenas o coração de contorno; a prop `liked` troca o glifo pelo coração preenchido da trilha de ações.
- **Rotação do disco de música**: o arquivo é estático; `spinning` é opcional, desligado por padrão e suprimido em `prefers-reduced-motion`.
- **Slots de ilustração**: as ilustrações decorativas da chamada do perfil são expostas como `ReactNode` em vez de embutidas, para que um produto injete a própria arte.
- **`viewBox` arredondado pelo export**: o exportador do Figma arredonda o `viewBox` para inteiros (por exemplo 24×21 para um nó de 23,242×20,925). O caminho é literal; a diferença é sub-pixel.
- **Rótulos sem componente próprio**: o "Cancel" da folha de compartilhamento, o atalho "Sounds" da câmera, os rótulos "Effects"/"Upload" e o cabeçalho de sistema do leitor de QR aparecem uma única vez no arquivo e são montados localmente nas telas, com tokens da marca.
- **Marcas de terceiros**: os logotipos de WhatsApp, Messenger, SMS, Instagram e Facebook são marcas registradas de seus detentores e estão presentes por fidelidade ao arquivo comunitário. Um produto que publique a folha de compartilhamento deve verificar as próprias permissões de uso.

---

## 10. Design System Unitube (Seção `Unitube` do Storybook)

O **Unitube** é a plataforma de vídeo da Plataforma Unooria, implementada a partir do arquivo Figma [YouTube UI Clone Design (Community)](https://www.figma.com/design/HcbrbLtDZ1rMEvSjoXpA5c/YouTube-UI-Clone-Design--Community-) (`fileKey HcbrbLtDZ1rMEvSjoXpA5c`), composto por três páginas: a documentação de tokens em `🎨 Design System` (`104:3087`), os componentes em `Component` (`7:182`) e as três telas de referência em `Screen` (`0:1`), todas de 1440×1024.

### 10.1. Fonte Canônica e Particularidades do Arquivo
- É o **único arquivo da plataforma que documenta os próprios tokens**. A página `🎨 Design System` publica primitivas, nove tokens semânticos com nome e descrição de uso, a escala tipográfica de onze degraus, o espaçamento, os raios, as elevações e um inventário de componentes com a assinatura JSX pretendida de cada um. Quando o arquivo declara um token, ele é a fonte; o restante foi lido do nó e registra o `figmaNode`.
- O arquivo publica **um único modo semântico — escuro**. Não existe versão clara de nenhum componente, portanto **é proibido derivar um tema claro por cálculo**. A seção "Suporte a Temas" do Padrão Ouro é atendida pelo `UniDocSurfaceSwitcher`, que alterna entre as cinco superfícies escuras oficiais.
- As telas são posicionadas em **coordenadas absolutas**, sem auto layout na maioria dos quadros. Os componentes reconstroem a geometria com flex e grid, preservando as medidas lidas nó a nó.
- As miniaturas de vídeo do arquivo são renderizações tridimensionais de **logotipos de terceiros** (YouTube, Instagram, TikTok, Netflix, Twitter, Spotify, Discord e Tesla). **Não foram exportadas nem redistribuídas**: as estórias usam pôsteres sintéticos gerados em SVG a partir da própria paleta, e todas as imagens entram por prop (`src`, `avatarSrc`, `coverSrc`). Nenhum bitmap integra o pacote — não há diretório `public/unitube/`.
- O logotipo é marca registrada do Google LLC e está presente por fidelidade ao arquivo comunitário. Um produto que publique a biblioteca deve substituir `src/unitube/components/Logo/LogoVector.ts` pela própria marca.

### 10.2. Títulos das Estórias
- **Fundamentos**: `Unitube/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação | Ícones]`.
- **Componentes**: `Unitube/Componentes/[NomeComponente]`.
- **Telas compostas**: `Unitube/Telas/Telas Compostas`.

### 10.3. Componentes Oficiais (30)
**Fundação**: `Icon`, `Logo`, `Avatar`.
**Navegação**: `TopBar`, `SearchBox`, `ProfileCompact`, `ProfileExpanded`, `Sidebar` (composto: `.Section`, `.Footer`, `.FooterRow`), `SidebarMenuItem`, `SidebarMenuTitle`, `FooterItem`, `TopMenuBar`, `TopMenuItem`, `TopMenuIcon`.
**Mídia**: `ThumbnailImage`, `VideoCard`, `VideoCardHorizontal`, `VideoCardSmall`, `VideoCardSidebar`, `VideoPlayer`, `VideoPlayerFull`, `Playlist`.
**Conteúdo**: `ChannelHeader`, `VideoDescription`, `Comment`.
**Ação**: `Button`, `SubscribeButton`.
**Layout**: `PrimaryColumn`, `SecondaryColumn`.
**Documentação**: `DesktopFrame`.

- `VideoCard`, `VideoCardSmall`, `VideoCardSidebar` e `VideoCardHorizontal` são **quatro formatos distintos** publicados pelo arquivo, com tipografia e composição próprias. Não duplicar nem consolidar.
- `SubscribeButton` é o **único botão sólido** do arquivo. `Button` é transparente.
- `DesktopFrame` é um contêiner **de documentação**, não de produção — o mesmo papel que o `PhoneFrame` cumpre nos módulos móveis.
- O `Icon` é documentado apenas em `Fundamentos/Ícones`; não há estória duplicada em `Componentes`.

### 10.4. Iconografia Derivada do Figma
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou substituído por outra biblioteca. Os 45 ícones vivem em `src/unitube/components/Icon/IconPaths.ts` com o atributo `d` **literal do export SVG do Figma** e o `viewBox` original preservado — todos são 24×24.
- O arquivo pinta os 45 glifos de branco puro. O preenchimento literal foi trocado por `currentColor` para que o mesmo vetor sirva ao texto primário, ao secundário e ao cromo do reprodutor — as três cores em que as telas os aplicam.
- **Treze glifos existem em par contorno/preenchido** (`home`/`homeFill`, `explore`/`exploreFill`, …). É essa dupla que marca o item ativo da barra lateral: a cor **não muda** entre ativo e inativo, apenas o peso do vetor e o fundo da linha.
- Os **nove controles do reprodutor** (`play`, `next`, `sound`, `titles`, `quality`, `theater`, `tv`, `fullscreen`, `info`) **não são componentes** no arquivo: são nós `VECTOR`, `GROUP` e `BOOLEAN_OPERATION` soltos dentro do quadro `Media/VideoPlayer` (`18:1295`). Vivem em `src/unitube/components/VideoPlayer/PlayerGlyphs.ts`, com a **geometria de preenchimento resolvida** (`node.fillGeometry`) — o resultado literal das operações booleanas — e o traço de 1px em preto a 10% reproduzido via `--uni-color-player-glyph-outline`.
- O logotipo vive em `src/unitube/components/Logo/LogoVector.ts`, também com os caminhos literais do export.

### 10.5. Kit de Documentação
As estórias do Unitube usam o `UnooriaDocShell` como moldura e os utilitários de `.storybook/components/UniDocKit.tsx`: `UniDocGrid`, `UniDocCard`, `UniDocFigmaSpecs`, `UniDocDeviations`, `UniDocAnatomy`, `UniDocStage`, `UniDocPractices`, `UniDocSurfaceSwitcher`, `UniDocPropsTable` e `UniDocTokenSwatch`. Toda estória mantém as seções obrigatórias do Padrão Ouro definidas na seção 3.

### 10.6. Registro de Desvios em Relação ao Figma
Qualquer divergência intencional **DEVE** ser documentada com o `UniDocDeviations` na seção "Figma & Especificações Técnicas" da estória. Desvios registrados até o momento:
- **Ausência de tema claro**: o arquivo publica apenas o modo escuro; nenhum valor claro de superfície foi inventado.
- **`color/text/tertiary` mais claro que o secundário**: o arquivo aponta `text/tertiary` para `neutral/300` (`#C4C4C4`) e `text/secondary` para `neutral/400` (`#AAAAAA`) — o degrau "mais sutil" é o mais claro dos dois. A inversão foi preservada sem correção.
- **`color/border/default` é um neutro claro**: aponta para `neutral/200` (`#EAEAEA`), e nenhuma tela o usa como divisor — todas usam `border/subtle` (`#303030`). O token foi preservado como declarado, e os componentes consomem o sutil.
- **Peso invertido em relação à hierarquia**: no `VideoPlayerFull` o título usa Regular 18 e a linha de metadados, de hierarquia inferior, usa Bold 14. Preservado.
- **Combinações fora da escala**: `FooterItem` (13 Bold), `VideoCardHorizontal.metadata` (13 Bold), `VideoPlayerFull.title` (18 Regular), `ChannelHeader.name` (24 Regular) e `Comment.author` (13 Bold / 20px). Todas anotadas no CSS do componente.
- **Medidas fora da escala**: calha de conteúdo de 65px, contorno de 0,3px da pílula inativa, recuo de 3px da cápsula de duração, recuo lateral de 14px do perfil compacto e altura de linha fracionária de 146,48% do relógio do reprodutor. Nenhuma foi arredondada.
- **Estados de interação**: o arquivo é estático e não descreve hover, foco, pressionado nem desabilitado. Foram acrescentados usando exclusivamente tokens da própria marca — realce em branco translúcido a 10% e 20% (`--uni-color-state-hover` e `-active`), anel de foco de 2px em `--uni-color-state-focus` e 40% de opacidade no desabilitado.
- **Estados não publicados promovidos a prop**: `pressed` no `Button`, `subscribed` no `SubscribeButton` e no `ChannelHeader`, `liked` no `Comment`, expansão real da descrição no `VideoDescription` e selo de notificação no `ProfileExpanded`.
- **Elementos promovidos a semântica correta**: linhas de menu viraram `<a>`/`<button>` com `aria-current`, rótulos de seção viraram `<h2>`, cartões viraram `<article>` com título em `<h3>`, a barra de filtros declara `role="toolbar"`, as abas do canal declaram `role="tablist"`/`role="tab"` e o formulário de busca declara `role="search"`.
- **Abas do canal montadas localmente**: no arquivo são instâncias de `TopMenuItem` com a pílula removida e um retângulo de 1px sob a ativa. Como o resultado visual não tem nada da pílula, foram montadas no `ChannelHeader` como botões com sublinhado.
- **Rolagem real**: as telas do arquivo são quadros estáticos com conteúdo cortado na aresta. A barra lateral, a faixa de filtros e a linha da playlist rolam de fato, sem o que o conteúdo além da borda seria inalcançável.
- **Pontos de quebra**: o arquivo publica apenas o quadro de 1440px. Os pontos em 900px, 800px, 520px e 400px foram acrescentados para que barra superior, cartão horizontal, colunas, descrição e controles do reprodutor não quebrem em janelas menores.
- **Bitmaps e marcas de terceiros**: miniaturas, retratos e capa não foram redistribuídos — ver 10.1. O logotipo do YouTube é marca registrada do Google LLC.
- **Sombra local do selo HD**: as letras "HD" do reprodutor carregam um drop shadow de 1px em `#560A0F` que não corresponde a nenhum degrau publicado. Por ser efeito decorativo de um único nó, não foi tokenizado nem reproduzido.
- **Andaimes restritos a `stories/`**: o cabeçalho da lista de comentários ("286 Comments" mais o controle de ordenação) e o campo de novo comentário são camadas de texto soltas no arquivo, sem componente publicado. São montados localmente nas telas compostas e **não integram o pacote**.
- **Segundo botão da barra de abas do canal**: o arquivo desenha um quadro vazio de 48×48 à direita da lupa, sem glifo nem rótulo. Não foi reproduzido.
- **Frames não reconstruídos**: nenhum. As três telas da página `Screen` foram todas reconstruídas.
