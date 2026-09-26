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
O pacote publica **seis design systems** em um único artefato NPM:

| Marca | Módulo | Namespace | Prefixo CSS / classes | Tema ou contexto | Componentes | Arquivo Figma de origem |
|---|---|---|---|---|---|---|
| Plataforma Unooria | `src/unooria/` | `UnooriaUI` + exportação na raiz | `--unooria-*` / `.unooria-*` | Light e Dark | 41 | — (design próprio) |
| Instanooria | `src/instanooria/` | `InstanooriaUI` | `--insta-*` / `.insta-*` | `data-insta-theme="light \| dark"` | 31 | Instagram UI Screens (Community) |
| ChatGPT | `src/chatgpt/` | `ChatGPTUI` | `--gpt-*` / `.gpt-*` | `data-gpt-theme="light \| dark"` | 25 | ChatGPT UI Kit (AI Chat) (Community) |
| WhatsApp Mobile | `src/whatsappmobile/` | `WhatsAppMobileUI` | `--wa-*` / `.wa-*` | `data-wa-theme="dark"` — só escuro | 39 | WhatsApp Clone - Dark mode (Community) |
| Tik Tooria | `src/tiktooria/` | `TikTooriaUI` | `--tik-*` / `.tik-*` | `data-tik-surface="chrome \| immersive"` — dois contextos, não dois temas | 35 | TikTok UI Screens (Community) |
| Unootube | `src/unootube/` | `UnootubeUI` | `--uni-*` / `.uni-*` | `data-uni-theme="light \| dark"` | 44 | YouTube UI Clone Design (Community) + Free YouTube Shorts Mockups (Community) |

- Cada marca vive em seu próprio módulo sob `src/`, com **namespace de tokens e prefixo de classes CSS exclusivos**, e é exportada do `src/index.ts` **apenas como namespace** (`WhatsAppMobileUI`, `InstanooriaUI`, `ChatGPTUI`, `TikTooriaUI`, `UnootubeUI`). Só a Plataforma Unooria também é exportada na raiz — as marcas nunca, para evitar colisão de nomes (`Avatar`, `Badge`, `Button`, `TabBar` e `PhoneFrame` existem em mais de uma).
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
- **Unootube** (plataforma de vídeo da Unooria, derivada do arquivo Figma "YouTube UI Clone Design (Community)"):
  - Código de produção: `src/unootube/tokens/` e `src/unootube/components/[NomeComponente]/`.
  - Estórias: `stories/unootube/fundamentos/`, `stories/unootube/componentes/` e `stories/unootube/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/unootube/fixtures.ts`.
  - **Dois arquivos de origem**: além do arquivo original, o módulo consome "Free YouTube Shorts Mockups (Community)" (`fileKey FlqnnoY0Mqdjic53twLAC1`), origem do Shorts, do cromo móvel e do **tema claro**.
  - Prefixo de variáveis CSS: `--uni-*`. Prefixo de classes: `.uni-*`. Atributo de tema: `data-uni-theme="light | dark"`. O tema claro **não é derivado** do arquivo original — vem medido do segundo arquivo, que publica as mesmas telas nas duas versões.
  - **Nenhum bitmap integra o pacote**: as miniaturas do primeiro arquivo são logotipos de terceiros e as do segundo são fotografias de banco de imagens. Nenhuma foi redistribuída; todas as imagens entram por prop.
- **REGRA CRÍTICA**: um módulo de marca **NUNCA** consome tokens de outro. É proibido usar `var(--unooria-*)` dentro do Instanooria, do ChatGPT ou do WhatsApp Mobile, `var(--insta-*)` fora do Instanooria, `var(--gpt-*)` fora do ChatGPT `var(--wa-*)` fora do WhatsApp Mobile, `var(--tik-*)` fora do Tik Tooria e `var(--uni-*)` fora do Unootube — são marcas com hierarquias cromáticas distintas.

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
- **Superfícies do cliente web** (`--gpt-web-*`, origem `🟪 ChatGPT UI Kit`): `--gpt-web-canvas`, `-suggestion`, `-composer-fill`, `-composer-border`, `-composer-placeholder`, `-veil`, `-hairline` e `-accent`. Cada lado do par foi **medido** no quadro correspondente — `681:2796` no claro e `681:3246` no escuro —, e três deles não são espelho um do outro (ver 7.6). Some-se a primitiva `--gpt-color-gray-700` (`#333333`), a superfície da tela escura, que `Primitives/Colors` não publica.

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

### 2.7. Tokens do Unootube (`src/unootube/tokens/`)
Todo componente, estilo ou documentação do Unootube **DEVE** consumir exclusivamente as variáveis `--uni-*`. É o único arquivo da plataforma que **documenta os próprios tokens**: a página `🎨 Design System` (`104:3087`) publica as primitivas, nove tokens semânticos com nome e descrição de uso, a escala tipográfica, o espaçamento, os raios e as elevações. Os demais valores foram lidos do preenchimento literal do nó e registram o `figmaNode` em `colors.ts`.

- **Dois temas, e só um deles vem do arquivo original**. O quadro semântico do primeiro arquivo se intitula "SEMANTIC TOKENS (DARK MODE)" e o cabeçalho da página declara "Dark theme first": dele **continua PROIBIDO derivar um tema claro por cálculo**, e as primitivas neutras claras (`--uni-color-neutral-50` a `-400`) seguem existindo como origem de texto e contorno sobre fundo escuro, não como superfície. O tema claro da biblioteca vem **medido** do segundo arquivo, "Free YouTube Shorts Mockups (Community)" (`FlqnnoY0Mqdjic53twLAC1`), que publica as mesmas telas nos dois temas; cada valor claro registra em `colors.ts` o nó em que foi lido. O bloco `[data-uni-theme='light']` de `colors.css` redeclara apenas os semânticos, nunca as primitivas.
- **Primitivas neutras (12 degraus)**: `--uni-color-white`, `-black` e `--uni-color-neutral-50|100|200|300|400|500|600|700|800|900`. **Nunca aplicadas diretamente em componente** — servem de origem para os aliases semânticos.
- **Quatro vermelhos distintos, preservados**: `--uni-color-red-500` (`#EE1A26`, semântico), `-600` (`#FC0D1C`, progresso da linha do tempo), `-700` (`#CC0000`, botão de inscrição) e `-800` (`#FF0000`, emblema do logotipo **no arquivo**). Convivem na mesma tela — no reprodutor, o selo HD usa o semântico enquanto a linha do tempo usa o de progresso. **É proibido consolidá-los**, inclusive o `-800`, que deixou de ter consumidor quando o emblema passou ao azul da marca: a régua não encolhe porque um componente parou de citá-la. Acento: `--uni-color-blue-400` (`#9EBFD0`, cor de espera do quadro de vídeo).
- **Azul da marca Unooria — a única primitiva sem `figmaNode`**: `--uni-color-blue-600` (`#005CE6`). Não vem de nenhum dos dois arquivos de origem: entrou quando o logotipo do YouTube foi substituído pelo da Unooria, e é consumido por um único semântico, `--uni-color-brand-logo`. **Não substitui `--uni-color-brand-primary`** — chamadas para ação continuam em `#EE1A26`.
- **Semânticos publicados (9)**: `--uni-color-background-primary` (`#181818`), `-secondary` (`#212121`), `-surface` (`#303030`), `--uni-color-text-primary` (`#FFFFFF`), `-secondary` (`#AAAAAA`), `-tertiary` (`#C4C4C4`), `--uni-color-brand-primary` (`#EE1A26`), `--uni-color-border-default` (`#EAEAEA`) e `-subtle` (`#303030`).
- **Semânticos derivados de nó**: `--uni-color-background-field` (`#121212`), `-inverse-deep` (`#000000`), `--uni-color-surface-inverse` (`#FFFFFF`), `--uni-color-text-inverse` (`#030303`), `--uni-color-brand-subscribe`, `-progress`, `-logo`, `--uni-color-player-chrome`, `-player-track`, `-player-buffer`, `-player-glyph-outline`, `--uni-color-overlay-duration`, `-poster-placeholder` e `--uni-color-border-active`.
- **Gradientes do reprodutor**: `--uni-gradient-player-top` e `-bottom`, os dois retângulos de 96px com `GRADIENT_LINEAR` no topo e na base do quadro.
- **Tipografia**: família Roboto via `--uni-font-sans`; escala de **onze degraus** (`--uni-font-heading-h1|h2|h3|h4-*`, `--uni-font-body-lg|md|sm-*`, `--uni-font-caption-*`, `--uni-font-caption-sm-*`, `--uni-font-label-lg|md-*`), com apenas dois pesos (400 e 700), alturas de linha absolutas em pixels e **`letter-spacing` zero em todos os degraus** — é proibido inventar tracking.
- **Medidas**: escala `--uni-spacing-0` a `--uni-spacing-64` em base de 4px, com os degraus finos de 1px, 2px, 6px e 10px **preservados**; raios `--uni-radius-none` (0) a `--uni-radius-full` (**80px literal**, não um valor arbitrariamente grande); dimensões estruturais (`--uni-desktop-width` 1440px, `--uni-topbar-height` 56px, `--uni-sidebar-width` 240px, `--uni-content-gutter` **65px**, `--uni-primary-column-width` 664px, `--uni-secondary-column-width` 426px) e os **seis diâmetros de avatar** (24/32/36/40/48/80px), todos literais.
- **Elevação**: `--uni-elevation-low|medium|high`, os três degraus publicados pelo quadro `Elevation`. A biblioteca é **plana por padrão** — nenhuma das três telas aplica `box-shadow`: a separação é feita por luminância de superfície e por fios de 1px em `--uni-color-border-subtle`. **É proibido introduzir `box-shadow`** em barras, cartões, listas ou pílulas.
- **Tokens do Shorts e do cromo móvel** (segundo arquivo, todos lidos do preenchimento literal do nó): `--uni-color-shorts-ink` (`#161722`, a tinta do arquivo), `--uni-color-brand-shorts` (`#FF0000`, o corpo do raio), `-shorts-chrome`, `-shorts-cell`, `-shorts-veil` (preto a 32%), `-shorts-sound-fill` (preto a 20%) e `--uni-gradient-shorts-bottom` (véu de 194px com as paradas literais 37,188% e 48,296%). Dois tokens nasceram de divergências que só aparecem no tema claro: `--uni-color-surface-selected`, porque a linha selecionada (`#E4E4E4`) e a pílula de filtro (`#ECECEC`) divergem ali ainda que coincidam no escuro; e `--uni-color-surface-chrome`, porque o arquivo pinta o cromo **móvel** de branco puro e o de 1440px de `#F6F6F6`. Nos dois casos a divergência é do próprio arquivo e foi preservada em token próprio, em vez de consolidada no degrau mais próximo.
- **Degraus que o primeiro arquivo não publica**: o peso `--uni-font-weight-medium` (Roboto Medium 500, usado em quase todo o Shorts e o cromo móvel) e o raio `--uni-radius-control` (4px, do botão de inscrição, do botão de som e da pílula de filtro móvel). Ambos são literais do segundo arquivo — a coleção `Radius` do primeiro salta de 2px para 8px, e a escala tipográfica declara apenas 400 e 700.
- **Medidas móveis**: quadros `--uni-phone-width|height` (390×844) e `--uni-phone-android-width|height` (360×800), alturas `--uni-mobile-topbar-height` (50px), `-tabbar-height` (58px) e `-header-height` (47px), e a família `--uni-shorts-*` (razão 9:16, quadro de 488px, faixa de 44px, cartão de 150×266, célula de 119×200, trilha de 36px, botão de 54px). Os diâmetros de avatar de **38px** e **77px** que o segundo arquivo acrescenta entram por `size` numérico, e não como degraus nomeados: a escala nomeada continua refletindo apenas o primeiro arquivo.
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
- **Registro de desvios**: toda divergência intencional em relação ao arquivo de design é declarada na seção 2, com o utilitário de desvios da marca (`InstaDocDeviations`, `WaDocDeviations`, `TikDocDeviations`) ou o slot `deviations` do `GptDocFigmaSpecs`.

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
- **Diálogo composto se nomeia sozinho.** Todo componente com `role="dialog"` que oferece subcomponente de título (`Modal.Title` na Plataforma Unooria, `Modal.Header` no ChatGPT e no Unootube) liga `aria-labelledby` a ele automaticamente — na composição manual E pelo atalho `title` —, e `Modal.Description` a `aria-describedby`. O título se anuncia ao diálogo pelo contexto, com o id que de fato renderizou (o `id` passado, ou o de `useId`). Precedência: `aria-labelledby` explícito manda; com `aria-label` explícito o diálogo **não** recebe `aria-labelledby`, que venceria o `aria-label` no cálculo do nome e o calaria sem aviso. Medido em 25/09/2026, na 0.2.2: o composto saía sem nome, o leitor de tela anunciava só "diálogo" e `getByRole('dialog', { name })` não achava nada — eram 34 diálogos assim no monorepo consumidor. As estórias com `play` de cada `Modal` guardam a regra.

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

- **`'use client'` vale por arquivo.** O esbuild descarta silenciosamente a diretiva de qualquer módulo que não seja entry point; com bundle único, só a do topo de `src/index.ts` sobrevivia e marcava o pacote inteiro como client. **É PROIBIDO declarar `'use client'` em `src/index.ts`** ou nos barris de marca — isso anularia todos os componentes que hoje rodam como Server Components (**112 dos 211** na última medição, em 25/09/2026, sobre a 0.2.4 com as extensões do Instanooria: 2/40 na Plataforma Unooria, 12/28 no Instanooria, 21/25 no ChatGPT, 20/39 no WhatsApp Mobile, 32/35 no Tik Tooria e 25/44 no Unootube). Para recontar depois de um `npm run build:package`:
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

## 4.6. Fontes: Opt-in, Embutidas, Fora das Folhas de Componente

As famílias **não vêm do Google Fonts em tempo de execução** e **não vêm junto
com o CSS de componente**. São duas decisões distintas:

**1. Embutidas.** Os `.woff2` vivem em `src/fonts/` e os `@font-face` em
`src/[marca]/tokens/fonts.css`. Ambos são **gerados** por `npm run fontes`
(`scripts/baixar-fontes.mjs`), que baixa do Google e regrava tudo. **É PROIBIDO
editar um `fonts.css` à mão** — a próxima execução sobrescreve. Para
acrescentar peso, família ou subset, altere a configuração `MARCAS` do script.

**2. Opt-in.** `styles.css` e `styles-[marca].css` **NÃO declaram
`@font-face`** — os componentes só citam `var(--[prefixo]-font-sans)`, com
pilha de fallback. Quem quiser a família importa uma folha à parte:

```ts
import '@unooria/design-system/fonts/unootube.css';
```

O motivo é o `next/font`: ele faz self-host, preload e gera um fallback com
`size-adjust` que elimina layout shift. Um `@font-face` embutido na folha de
componente não oferece nada disso e ainda concorre com o que o `next/font`
declara. Sendo opt-in, um app que resolva a tipografia por lá simplesmente não
escreve a linha.

- **`--uni-*`, `--gpt-*`, `--wa-*`, `--tik-*` e `--unooria-*` têm folha de
  fonte.** O Instanooria não: usa SF Pro, fonte de sistema da Apple.
- **A Plataforma Unooria é o caso crítico.** Os ícones dela são uma **fonte de
  ligadura** (Material Symbols Rounded): sem a família carregada, `.unooria-icon`
  renderiza o **nome do ícone como texto**. Um app que consuma
  `styles-unooria.css` sem importar `fonts/unooria.css` — e sem carregar
  Material Symbols por conta própria — mostra a palavra "search" no lugar da
  lupa. É o único módulo em que a folha de fonte é, na prática, obrigatória.
- **Nada é copiado cru para o `dist`.** Os `tokens/fonts.css` e os `.woff2` são
  resolvidos pelas entradas `fonts/*` do passo 2 do `tsup.config.ts`, que
  embute os `@font-face` e emite os arquivos com hash de conteúdo em
  `dist/fonts/`. Copiá-los também colocaria cada fonte duas vezes no pacote —
  foram 14 MB dos 33,8 MB na 0.1.16.
- **Subsets**: apenas `latin` e `latin-ext` nas famílias de texto. O Material
  Symbols vai inteiro (5,1 MB) e **não pode ser reduzido**: é fonte de
  ligadura, e o ícone usado é escolhido pelo consumidor em tempo de execução.
- **`@import url(...)` é proibido em folha de token.** Só é válido no topo de
  uma folha; no meio da agregada o navegador o descarta.
---

## 5. Validação Obrigatória e Critérios de Aceite
Antes de considerar qualquer tarefa de componente ou documentação concluída:
0. Ao tocar no Unootube, conferir **antes de registrar um glifo novo** se ele já existe: os dois arquivos de origem redesenham vários dos mesmos vetores, apenas transladados ou escalados. A análise de repetição vive no bloco `shorts` de `IconPaths.ts`.
1. Validar que **todos os estilos e cores consomem as variáveis CSS do módulo correspondente** (`src/unooria/tokens/` para a Plataforma Unooria, `src/instanooria/tokens/` para o Instanooria, `src/chatgpt/tokens/` para o ChatGPT, `src/whatsappmobile/tokens/` para o WhatsApp Mobile, `src/tiktooria/tokens/` para o Tik Tooria, `src/unootube/tokens/` para o Unootube), sem hexadecimais avulsos e sem mistura entre marcas.
2. Executar `npx tsc --noEmit` e garantir **0 erros de compilação TypeScript**.
3. Executar `node scripts/verificar-css-agregado.mjs` e garantir que **todo CSS de token e de componente está nas folhas agregadas** publicadas (`src/styles.css`, `src/styles-unooria.css`, `src/styles-instanooria.css`, `src/styles-chatgpt.css`, `src/styles-whatsappmobile.css`, `src/styles-tiktooria.css`, `src/styles-unootube.css`).
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

### 6.2. Componentes Oficiais (21) e Extensões (10)
`Icon`, `Logo`, `Avatar`, `Badge`, `Button`, `Divider`, `StoryBubble`, `StoriesTray`, `TopBar`, `TabBar`, `PostCard` (composto), `TextField`, `SearchField`, `Chip`, `SegmentedTabs`, `ListItem`, `NotificationItem`, `ProfileHeader`, `MediaGrid`, `PhoneFrame` e `StoryViewer`.

**Extensões** (não publicadas pelo arquivo de origem): `DirectThread`, `MessageBubble`, `DmPoll`, `ConfirmDialog`, `BottomSheet`, `FloatingButton`, `StoryComposer`, `InlineHint`, `GestureHint` e `Snackbar` — mais, no `MediaGrid`, o modo de seleção (`selectable`, `selectedIds`, `onToggle`); no `StoryViewer`, as zonas de toque (`onNext`, `onPrev`), a camada `children` sobre a mídia e o `footer`; no `PostCard.Media`, o slide sem fotografia (`children` sem `src`) e o estado de erro (`onRetry`, `onMediaError`, `errorLabel`, `errorDescription`, `retryLabel`); e no `Badge`, a quebra de linha (`wrap`).

**A segunda leva (26/09/2026, 0.2.6)** fechou as quatro compensações e os três pedidos que a "A Seleção" deixou abertos: a faixa de dica (`InlineHint`, tons `neutral` e `friction`), a demonstração de gesto (`GestureHint`, decorativa e desligada com movimento reduzido), o aviso passageiro (`Snackbar`, em cores invertidas), o `Badge` com `wrap`, o `StoryComposer` contando em **code points** (contador, `minLength` e `maxLength`; sem os atributos nativos, que medem UTF-16) e o `PostCard.Media` que mantém o `alt` visível no erro (`errorDescription`, que por padrão é o `alt`).

- **As 19 telas × 2 temas não publicam conversa de DM aberta (só a lista), enquete, diálogo de confirmação, folha inferior (só a gaveta LATERAL do menu do perfil, `0:1161` / `0:2938`), botão flutuante nem compositor de Story.** As extensões entraram em 25/09/2026, para a missão "A Seleção" do monorepo consumidor (7º ano: o estudante salva posts, escolhe exatamente três, publica nos Stories do grêmio, compara os seus com os de um colega no Mural, com a gaveta da ficha técnica, e responde a duas enquetes numa DM com a personagem Amara). O dono do produto decidiu implementá-las "igual ao app real do Instagram", no precedente do WhatsApp Mobile (seção 8.3), em vez de cada missão compor a sua cópia.
- **Cada uma deriva a forma de degraus que o arquivo DE FATO publica** e ancora a estória no nó de onde vem o que empresta: a barra da lista de conversas (`0:2629`) e a barra "Camera" (`0:2614`) no `DirectThread`; o campo de busca da lista (`0:2622`) e o campo "Send Message" do Story (`0:2266`, raio de 21,5px) no `MessageBubble` e na `DmPoll`; o par "Cancel" / "Next" da barra da tela de adicionar imagem (`0:3194`) nas ações do `ConfirmDialog`; a gaveta lateral (`0:2938`) na `BottomSheet`; a pílula "Select multiple" (`0:3218`, 32px) no `FloatingButton`; a `Chat Bar` de 94px (`0:2254`) e a pílula de 43px do Story no `StoryComposer`; e a tela de adicionar imagem (`0:1366` / `0:3163`) no modo de seleção do `MediaGrid`. **Nenhum token novo foi criado** (só `--insta-*` existentes) e **nenhum glifo foi desenhado**: `back`, `chevronDown` (girado 180° na alça da folha), `video` e os demais vêm de `IconPaths.tsx`. Claro e escuro, como o resto da seção.
- **A `DmPoll` não mostra contagem nem porcentagem de votos** (o app real mostra) e não sabe se uma opção é "certa" — devolve só o `id`, a mesma decisão do `Poll` do WhatsApp Mobile. Um toque vota e trava; `value` ausente é não controlado, uma string é o voto já enviado e `null` é "ainda não votou" sob controle do produto.
- **O balão enviado do `MessageBubble` não é azul, e a opção votada da `DmPoll` também não**: branco sobre `--insta-color-action-primary` mede 3,06:1, abaixo dos 4,5:1 de texto normal. O enviado usa o preenchimento do campo de busca (`--insta-color-fill-field`) e o recebido, a superfície com o contorno do `Button` secundário — o Direct da geração de app que o arquivo desenha. O `ConfirmDialog` e a variante `primary` do `FloatingButton` seguem no azul porque o pedido os fixa; a ressalva de contraste está na estória de cada um (ver 6.4).
- **O `StoryComposer` só é controlado quando o consumidor passa `value`** (seção 4.5.1). O `PostCard.Actions` NÃO ganhou props de carrossel: os pontos entre as ações já saíam de `currentIndex` / `totalCount`, e um segundo par de nomes seria duas formas de dizer a mesma coisa.
- `BottomSheet` (modo modal) e `ConfirmDialog` compartilham `BottomSheet/useModalFocus.ts` — uma CÓPIA do hook do WhatsApp Mobile, porque um módulo de marca nunca consome outro (seção 1.3), com `initialFocusRef` a mais: o alerta destrutivo abre com o foco em "Cancelar".
- **É PROIBIDO ampliar esse grupo sem registrar o desvio na estória correspondente**, com o `InstaDocDeviations`.

- Os destaques do perfil **não têm componente próprio**: são `StoriesTray` com `bordered={false}` e itens em estado `seen` / `add`. Não duplicar.
- `PhoneFrame` é um contêiner **de documentação**, não de produção.

### 6.3. Kit de Documentação
As estórias do Instanooria usam o `UnooriaDocShell` como moldura e os utilitários de `.storybook/components/InstaDocKit.tsx`: `InstaDocGrid`, `InstaDocCard`, `InstaDocFigmaSpecs`, `InstaDocDeviations`, `InstaDocStage`, `InstaDocPractices`, `InstaDocThemeSwitcher`, `InstaDocPropsTable` e `InstaDocTokenSwatch`. Toda estória mantém as seções obrigatórias do Padrão Ouro definidas na seção 3; o `InstaDocDeviations` (no molde do `WaDocDeviations`) é obrigatório em toda extensão.

### 6.4. Registro de Desvios em Relação ao Figma
Qualquer divergência intencional em relação ao arquivo de design **DEVE** ser documentada na seção "Figma & Especificações Técnicas" da estória do componente. Desvios registrados até o momento:
- **PostCard.Timestamp**: o Figma vincula a data a `color/text/primary`; o Instanooria usa `--insta-color-text-secondary` para preservar a hierarquia de leitura entre legenda e metadado exigida pela seção 4.2.
- **Dez extensões e quatro variantes** sem quadro no arquivo — ver 6.2. Cada estória registra o próprio desvio com o `InstaDocDeviations`.
- **`MessageBubble` enviado em cinza**: o app atual pinta o enviado de azul-arroxeado; aqui ele é o `--insta-color-fill-field`, porque branco sobre o azul de ação mede 3,06:1. Texto primário sobre os dois preenchimentos passa de 12:1 nos dois temas.
- **Contraste das cores de ação, ressalva aberta**: no tema claro, o azul de ação sobre a superfície mede 3,06:1 e o vermelho da marca 3,70:1 (ações do `ConfirmDialog`); branco sobre o azul de ação mede 3,06:1 (variante `primary` do `FloatingButton` e número do círculo de seleção do `MediaGrid`). São as cores que o pedido fixa e o par do `Button` primário. No `MediaGrid`, a ordem também chega ao leitor de tela pelo nome do botão ("…, 1ª na seleção").
- **`MediaGrid` no modo de seleção**: o bloco mantém o papel de botão (`aria-pressed` não vale em `listitem`) e o item de lista passa a um invólucro; o indicador de vídeo desce para o canto inferior, onde o quadro de adicionar imagem põe a duração (`0:3182`). Fora do modo de seleção, a estrutura é a de antes.
- **`ConfirmDialog` de 270px e sem desfoque**: a largura é a do alerta do iOS, não do arquivo; o fundo translúcido com blur do sistema virou só o véu (seção 2.3). O toque no véu não cancela, como no iOS.
- **`BottomSheet` sem arraste**: a alça é um botão (`aria-expanded`), o que dá acesso por teclado e leitor de tela; a superfície é `background-elevated`, e não o `background-primary` da gaveta.
- **`FloatingButton` em `Title/Small`, com contorno na neutra**: no quadro, "SELECT MULTIPLE" é `Overline/Default` em caixa alta sobre a fotografia; a pílula usa o degrau dos rótulos de botão e ganha o contorno do `Button` secundário para não sumir sobre a tela branca.
- **Glifos que as extensões não têm**: a seta de "Novas publicações", o ícone de "Select multiple" e a seta de envio do compositor de Story não estão no registro. Não foram desenhados — o `FloatingButton` aceita só `InstaIconName`, e o `StoryComposer` tem uma ação só ("Seu story").

---

## 7. Design System ChatGPT (Seção `ChatGPT` do Storybook)

O **ChatGPT** é o cliente de conversa com IA da Plataforma Unooria, implementado a partir do arquivo Figma [ChatGPT UI Kit (AI Chat) (Community)](https://www.figma.com/design/FlQnC8T6Sg5HdVodu0f7bL/ChatGPT-UI-Kit--AI-Chat--Community-) (`fileKey FlQnC8T6Sg5HdVodu0f7bL`).

### 7.1. Duas Fontes Canônicas
O arquivo tem cinco páginas, e **duas** delas são fonte de implementação.

**A. `🟡 Design system` (`609:5682`)** — origem dos 17 primeiros componentes, de todas as coleções de variáveis e de todos os estilos publicados.

- As coleções foram lidas via Plugin API: `Primitives/Colors` (25 variáveis, modo `Default`), `Semantic/Colors` (21 variáveis, modos `Light` e `Dark`), `Primitives/Spacing` (19), `Primitives/Radius` (10) e `Primitives/Sizing` (14). Somam-se 13 estilos de texto, 4 de efeito e 21 de pintura.
- Os 17 componentes são conjuntos de variantes locais, com propriedades declaradas (`Variant`, `Size`, `State`, `Role`) e slots de texto.

**B. `🟪 ChatGPT UI Kit` (`0:1`)** — origem dos 8 componentes do cliente web, da biblioteca vetorial e do logotipo.

- A página tem três nós de topo, e dois deles são o **mesmo quadro em dois temas**: `New chat - V1 - A` em `681:2796` (claro) e `681:3246` (escuro), ambos de 1440 × 1024.
- São **instâncias de uma biblioteca remota** (`mainComponent.remote === true`, a versão paga do kit). Os componentes-mestre não existem no arquivo, mas as instâncias carregam a geometria resolvida: 121 nós, com **23 camadas de texto reais** e **17 nós VECTOR reais**. Tudo foi medido nó a nó.
- O par claro/escuro é **medido, não derivado**: cada valor do tema escuro foi lido de `681:3246`. Três deles não são o espelho do claro — ver 7.6.

**C. `🟪 ChatGPT Web Client` (`665:2049`) — NÃO é fonte.** O quadro `ChatGPT` (`676:342`, 10000 × 16992) tem **6.124 nós, exclusivamente `GROUP` e `VECTOR`, com zero camadas de texto**: está inteiramente contornado. Serve apenas como referência de fluxo — **não** é fonte de token, de componente nem de ícone. A conferência é reproduzível:

```js
// use_figma, página 665:2049
const frame = await figma.getNodeByIdAsync('676:342');
const all = frame.findAll(() => true);
const byType = {}; for (const n of all) byType[n.type] = (byType[n.type] || 0) + 1;
return { total: all.length, byType }; // → { total: 6124, GROUP: 895, VECTOR: 5229 }
```

### 7.2. Títulos das Estórias
- **Fundamentos**: `ChatGPT/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação & Overlays | Glifos | Ícones]`. `Glifos` documenta os caracteres tipográficos da página `🟡 Design system`; `Ícones`, os vetores literais da página `🟪 ChatGPT UI Kit`. O `Icon` é documentado apenas em `Fundamentos/Ícones`; não há estória duplicada em `Componentes`.
- **Componentes**: `ChatGPT/Componentes/[NomeComponente]`.
- **Telas compostas**: `ChatGPT/Telas/Telas Compostas`.

### 7.3. Componentes Oficiais (25)

**Página `🟡 Design system` (17)**: `Button`, `IconButton`, `Avatar`, `Badge`, `Tag`, `Toggle`, `Divider`, `Input`, `ChatInput`, `SearchInput`, `NavItem`, `ChatBubble`, `GPTCard`, `SettingsRow`, `Sidebar` (composto), `FeatureCard` e `Modal` (composto).

**Página `🟪 ChatGPT UI Kit` (8)**: `Icon`, `Logo`, `PlanTag`, `PromptSuggestion`, `TopicColumn`, `SidebarRow`, `Composer` (composto) e `WebSidebar` (composto).

- `Sidebar` expõe `Sidebar.NewChatButton`, `Sidebar.SectionLabel`, `Sidebar.Spacer` e `Sidebar.FooterItem`.
- `Modal` expõe `Modal.Header`, `Modal.Body` e `Modal.Footer`.
- `Composer` expõe `Composer.Dock`; `WebSidebar` expõe `WebSidebar.Section` e `WebSidebar.NewChat`.
- **REGRA CRÍTICA — as duas páginas publicam réguas distintas, e um componente NUNCA substitui o seu equivalente da outra.** `SidebarRow` (48px, raio 12, ícone vetorial de 24) não é `NavItem` (36px, raio 8, glifo tipográfico de 14). `WebSidebar` (282px, transparente) não é `Sidebar` (260px, `bg/secondary`). `Composer` (760 × 56, quatro alvos, contorno de 0,5px) não é `ChatInput` (600 × 48, um alvo redondo). `PlanTag` (sólido, invariante) não é `Badge` (cinco variantes semânticas a 10%). Consolidar qualquer um desses pares apaga uma medida real do arquivo.
- A prop `theme` é **opcional e sem valor padrão** em todos os componentes: quando omitida, o componente herda o tema do contêiner ancestral via `data-gpt-theme`. Isso permite trocar o tema uma única vez, no nó mais externo.
- A moldura de janela e o cabeçalho de área usados em `ChatGPT/Telas` são **andaimes de documentação**, restritos a `stories/`, e não integram o pacote.

### 7.4. Iconografia: Duas Bibliotecas, Uma por Página
O ChatGPT é a única marca com **duas iconografias**, porque suas duas páginas de origem resolvem ícone de formas diferentes. **Nenhuma substitui a outra.**

**A. Glifos tipográficos — página `🟡 Design system`.** Aquela página **não publica biblioteca de ícones**: seus componentes usam caracteres tipográficos em camadas de texto Inter Regular. Os sete caracteres literais estão em `src/chatgpt/tokens/glyphs.ts` (`gptGlyphs`): `✕` `→` `↑` `✦` `⌕` `+` `💬`.

- **PROIBIDO** desenhar um `<svg>`/`<path>` aproximado para substituir um glifo, ou adicionar símbolo que não exista em nenhuma camada do arquivo.
- Toda prop de glifo aceita `ReactNode`, de modo que um produto com família vetorial própria possa injetá-la sem alterar o componente.

**B. Vetores literais — página `🟪 ChatGPT UI Kit`.** Os **13** ícones vivem em `src/chatgpt/components/Icon/IconPaths.ts` com o atributo `d` **literal do export SVG do nó** e o `viewBox` original preservado — **não** normalizado para 24 × 24.

- Três grades distintas, todas quadradas: **16** (`microphone`, `image`, `paperPlaneRight`, `add`), **24** (`chatText`, `trash`, `sun`, `user`, `arrowSquareOut`, `signOut`) e **32** (`chats`, `stars`, `shieldWarning`). A prop `size` governa a aresta do alvo.
- Só o `stars` tem duas formas; os outros doze são de caminho único. As duas do `stars` declaram `fill-rule="evenodd"`, preservado no registro.
- O arquivo pinta cada glifo com a cor do contexto — preto nas linhas, branco sobre o botão de nova conversa, preto a 40% no envio. O preenchimento literal foi trocado por `currentColor`; a opacidade fica a cargo do CSS do componente.
- O logotipo vive em `src/chatgpt/components/Logo/LogoVector.ts`: a marca (`0 0 65 64`, um caminho) e o wordmark (`0 0 140 24`, sete caminhos), também com os caminhos literais do export.
- **PROIBIDO** desenhar à mão, aproximar ou substituir por outra biblioteca. Ao acrescentar um glifo, exporte o SVG do nó e copie `d` sem edição, preenchendo `figmaName`, `viewBox` e `usage`.

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

- **Duas páginas, duas réguas** (🟪 ChatGPT UI Kit): `SidebarRow`, `WebSidebar`, `Composer` e `PlanTag` convivem com `NavItem`, `Sidebar`, `ChatInput` e `Badge` porque vêm de páginas diferentes do mesmo arquivo, com medidas diferentes. Nenhum par foi consolidado — ver a regra crítica em 7.3.
- **Tema escuro medido, não derivado** (🟪 ChatGPT UI Kit): o par claro/escuro do cliente web veio inteiramente lido dos quadros `681:2796` e `681:3246`. Três valores **não** são o espelho um do outro e foram preservados como medidos: o fio da barra lateral (preto a 10% no claro contra branco a **15%** no escuro), o véu da doca do compositor (que inverte de branco a 10% para preto a 10%) e o botão de nova conversa (preto no claro, lilás `color/purple/400` no escuro — o arquivo **não** o inverte para branco).
- **`--gpt-color-gray-700` (`#333333`)**: a superfície da tela escura do cliente web não corresponde a nenhum degrau de `Primitives/Colors` — `gray/800` é `#1C1C1C`. Foi registrada como primitiva nova, com o nó de origem anotado.
- **`PlanTag` consome primitiva, não alias**: a cápsula usa `--gpt-color-purple-400` diretamente, contrariando a regra geral da seção 2. É deliberado: o arquivo mede `#ADADFB` nos dois temas, e qualquer alias semântico faria a cápsula inverter junto com o tema.
- **Alvos de 24px do `Composer`**: são o `Button` (`Size=Small, Variant=Borderless`) da biblioteca remota — 24 × 24, padding 4, raio 12 —, e **não** o `IconButton` da página de design system, cujo menor degrau é 28px com raio 6.
- **Contorno de 0,5px**: o compositor declara meio pixel. O valor é literal e **não** foi arredondado para 1px.
- **`paperPlaneRight` a 40%**: o vetor é exportado com `fill-opacity="0.4"` porque a instância de origem está a 40% — o alvo de envio em repouso. O vetor foi registrado sem opacidade, e o valor virou responsabilidade do CSS, que devolve 100% no hover e no foco.
- **Altura dos cartões de sugestão**: os 48px do arquivo viraram `min-height`. As telas são estáticas e cabem sempre em duas linhas; fixar a altura cortaria texto real em produção.
- **Coordenadas absolutas nas colunas**: no arquivo os cartões das três colunas são posicionados em `y = 100, 164 e 228`. O `TopicColumn` reconstrói a coluna como fluxo vertical único, preservando os intervalos medidos de 16px e sobrevivendo a títulos de outro comprimento.
- **Estados não publicados** (🟪 ChatGPT UI Kit): as duas telas são estáticas e publicam apenas `State=Default`. Hover, foco, pressionado, desabilitado e selecionado foram acrescentados usando exclusivamente tokens da própria marca — realce em `--gpt-fill-4` e `--gpt-fill-8`, anel de foco de 2px em `border/brand`, 40% de opacidade no desabilitado e `aria-current="page"` na linha ativa.
- **Elementos promovidos a semântica correta** (🟪 ChatGPT UI Kit): a barra lateral virou `<nav>`, as linhas viraram `<button>`/`<a>`, o título de coluna virou `<h2>` dentro de `<section>` e o compositor virou `<form>` — de modo que `Enter` envie sem escuta de tecla.
- **Rolagem e pontos de quebra** (🟪 ChatGPT UI Kit): o arquivo publica um único quadro de 1440 × 1024 com o conteúdo cortado na aresta. A barra lateral rola de fato, e abaixo de 800px o compositor passa a ocupar toda a largura — sem isso os 760px fixos não caberiam.
- **Quebras coladas no texto de origem**: os quadros escrevem "computing insimple terms" e "10year old's birthday" porque o texto está em caixa de largura fixa. As fixtures restauram o espaço; o erro do arquivo **não** foi reproduzido.
- **Marca registrada**: o logotipo do ChatGPT é marca da OpenAI OpCo, LLC, e está presente por fidelidade ao arquivo comunitário. Um produto que publique a biblioteca deve substituir `Logo/LogoVector.ts` pela própria marca.

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

### 8.3. Componentes Oficiais (29) e Extensões (10)
`Icon`, `StatusBar`, `Avatar`, `Badge`, `TopBar`, `TabBar`, `ListItem`, `ChatListItem`, `StatusListItem`, `CallListItem`, `SectionLabel`, `Fab`, `ChatHeader`, `DateChip`, `EncryptionNotice`, `MessageBubble` (composto: `.Media`, `.Document`, `.LinkPreview`, `.Invite`), `MessageComposer`, `ChatWallpaper`, `Radio`, `Checkbox`, `TextButton`, `Dialog` (composto: `.Footer`), `Menu`, `SettingsItem`, `SearchField`, `FilterChip`, `AttachmentSheet`, `CallScreen` e `PhoneFrame`.

**Extensões** (não publicadas pelo arquivo de origem): `Button`, `ForwardButton` (com o estado `exhausted`: esmaecido e acionável, desde a 0.2.6), `BottomSheet`, `MediaViewer`, `ChatBanner`, `AdminOnlyNotice`, `SystemMessage`, `Poll`, `MessageTag` e `Toast` — mais, no `MessageBubble`, as props `sender` e `forwardedLabel`, os subcomponentes `.LinkPreview` e `.Invite`, a mídia desenhada (`.Media` sem `src`) e a mídia acionável (`.Media` com `onClick`, desde a 0.2.6).

- **Os 73 quadros não publicam conversa de grupo, mensagem encaminhada, enquete, convite, folha genérica, visualizador de mídia, aviso de sistema nem botão preenchido.** As extensões entraram em 25/09/2026, para a missão "Quem Mandou Isso?" do monorepo consumidor, porque a alternativa — compor localmente — deixava cada produto com a sua versão do mesmo balão. Precedente: as extensões do Unootube (seção 10.3).
- **Cada uma deriva a forma de degraus que o arquivo DE FATO publica** e ancora a estória no nó de onde vem o token emprestado: a ação de texto do diálogo (`1:3516`) no `Button`, na ação do `Invite` e no votar do `Poll`; a folha de anexos (`1:3021`) na `BottomSheet`; a etiqueta de data (`1:3011`) na `SystemMessage`; o avatar do cabeçalho (`1:3001`) no `ForwardButton`. **Nenhum token novo foi criado** e nenhum glifo foi desenhado: `forward`, `tick`, `lock` e `back` são do registro.
- **O `MessageTag` não tem variante de cor, de propósito**: a marca publica um vermelho de chamada e nenhum verde de sucesso, e a etiqueta que se distingue só pela cor esconde a informação de quem não enxerga cor. Quem diferencia é o rótulo e a forma do pictograma.
- **O `Poll` não mostra contagem de votos** (o app real mostra): o caso de uso exige que quem vota não veja a escolha dos outros. E não sabe se uma opção é "certa" — devolve só o `id`.
- `BottomSheet` e `MediaViewer` compartilham `BottomSheet/useModalFocus.ts`, o mesmo comportamento de foco do `Dialog` (foco preso, ESC, fundo `aria-hidden`, foco devolvido).
- **É PROIBIDO ampliar esse grupo sem registrar o desvio na estória correspondente**, como no Unootube.

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
- **Dez extensões e quatro partes novas do `MessageBubble`** sem frame no arquivo — ver 8.3. Cada estória registra o próprio desvio com o `WaDocDeviations`.

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

## 10. Design System Unootube (Seção `Unootube` do Storybook)

O **Unootube** é a plataforma de vídeo da Plataforma Unooria. É o **único módulo com dois arquivos de origem**:

1. [YouTube UI Clone Design (Community)](https://www.figma.com/design/HcbrbLtDZ1rMEvSjoXpA5c/YouTube-UI-Clone-Design--Community-) (`fileKey HcbrbLtDZ1rMEvSjoXpA5c`), composto por três páginas: a documentação de tokens em `🎨 Design System` (`104:3087`), os componentes em `Component` (`7:182`) e as três telas de referência em `Screen` (`0:1`), todas de 1440×1024. É a origem dos 30 primeiros componentes, de toda a escala de tokens e do tema escuro.
2. [Free YouTube Shorts Mockups (Community)](https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-) (`fileKey FlqnnoY0Mqdjic53twLAC1`, página `YouTube ` — `1:2`), com **18 quadros**: três telas × três dispositivos (iPhone 390×844, Android 360×800 e área de trabalho 1440×1024) × **dois temas**. É a origem do Shorts, do cromo móvel, do **tema claro** e de sete glifos novos.

### 10.1. Fonte Canônica e Particularidades do Arquivo
- O primeiro arquivo é o **único da plataforma que documenta os próprios tokens**. A página `🎨 Design System` publica primitivas, nove tokens semânticos com nome e descrição de uso, a escala tipográfica de onze degraus, o espaçamento, os raios, as elevações e um inventário de componentes com a assinatura JSX pretendida de cada um. Quando o arquivo declara um token, ele é a fonte; o restante foi lido do nó e registra o `figmaNode`.
- O primeiro arquivo publica **um único modo semântico — escuro**, e dele **continua proibido derivar um tema claro por cálculo**. O par claro/escuro da biblioteca vem do **segundo** arquivo, que desenha as mesmas três telas nas duas versões: cada valor claro foi **medido** no quadro correspondente (`1:593`, `1:115`, `1:801`) e registra o nó em `colors.ts`. É essa medição — e só ela — que torna o `data-uni-theme="light"` legítimo. A seção "Suporte a Temas" do Padrão Ouro passa a ser atendida pelo `UniDocThemeSwitcher`; o `UniDocSurfaceSwitcher` continua existindo para percorrer a escada de luminância **dentro** de um tema.
- O segundo arquivo é **posicionado em coordenadas absolutas**, sem variáveis publicadas: todos os seus valores foram lidos do preenchimento literal do nó e carregam o `figmaNode` de origem.
- O segundo arquivo **redesenha vários glifos que o primeiro já publicava**, apenas transladados ou escalados. **Antes de registrar qualquer glifo novo, é obrigatório conferir se ele já existe** — a análise caminho a caminho que descartou sete deles está anotada no bloco `shorts` de `IconPaths.ts`.
- As telas são posicionadas em **coordenadas absolutas**, sem auto layout na maioria dos quadros. Os componentes reconstroem a geometria com flex e grid, preservando as medidas lidas nó a nó.
- As miniaturas de vídeo do arquivo são renderizações tridimensionais de **logotipos de terceiros** (YouTube, Instagram, TikTok, Netflix, Twitter, Spotify, Discord e Tesla). **Não foram exportadas nem redistribuídas**: as estórias usam pôsteres sintéticos gerados em SVG a partir da própria paleta, e todas as imagens entram por prop (`src`, `avatarSrc`, `coverSrc`). Nenhum bitmap integra o pacote — não há diretório `public/unootube/`.
- **O logotipo é o da Unooria, não o do arquivo.** Os sete caminhos do logotipo tipográfico do YouTube — marca registrada do Google LLC — foram **removidos do pacote** e substituídos por “Unootube”, contornado da própria Roboto Bold embutida em `src/fonts/roboto/` (eixo `wght` instanciado em 700). O emblema conserva a geometria literal do nó `2:88`, mas é pintado com `--uni-color-brand-logo` (`#005CE6`). O `viewBox` do lockup passou de 90×20 para **109,83×20**. O raio do Shorts (`ShortsLogoVector.ts`) **continua sendo marca do Google LLC** e ainda aguarda a mesma substituição.

### 10.2. Títulos das Estórias
- **Fundamentos**: `Unootube/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação | Ícones]`.
- **Componentes**: `Unootube/Componentes/[NomeComponente]`.
- **Telas compostas**: `Unootube/Telas/Telas Compostas` — nove telas: as três do primeiro arquivo e as seis do segundo (três móveis e três de área de trabalho).

### 10.3. Componentes Oficiais (40) e Extensões (4)
**Fundação**: `Icon`, `Logo`, `Avatar`, `ShortsLogo`.
**Navegação**: `TopBar`, `SearchBox`, `ProfileCompact`, `ProfileExpanded`, `Sidebar` (composto: `.Section`, `.Footer`, `.FooterRow`), `SidebarMenuItem`, `SidebarMenuTitle`, `FooterItem`, `TopMenuBar`, `TopMenuItem`, `TopMenuIcon`, `MobileTopBar`, `MobileTabBar` (composto: `.Item`, `.CreateButton`), `MobileHeader`.
**Mídia**: `ThumbnailImage`, `VideoCard`, `VideoCardHorizontal`, `VideoCardSmall`, `VideoCardSidebar`, `VideoPlayer`, `VideoPlayerFull`, `Playlist`.
**Shorts**: `ShortsCard`, `ShortsShelf`, `ShortsActionRail` (composto: `.Item`), `ShortsPlayer`.
**Conteúdo**: `ChannelHeader`, `MobileChannelHeader`, `VideoDescription`, `Comment`.
**Ação**: `Button`, `SubscribeButton`.
**Layout**: `PrimaryColumn`, `SecondaryColumn`.
**Extensões** (não publicadas por nenhum dos dois arquivos): `Modal` (composto: `.Header`, `.Body`, `.Footer`), `Snackbar`, `Table` (composto: `.Head`, `.Body`, `.Row`, `.Cell`) e `EmptyState`.
**Documentação**: `DesktopFrame`, `PhoneFrame`.

- `VideoCard`, `VideoCardSmall`, `VideoCardSidebar` e `VideoCardHorizontal` são **quatro formatos distintos** publicados pelo primeiro arquivo, com tipografia e composição próprias. Não duplicar nem consolidar. O `ShortsCard` é um quinto, vertical, com três variantes próprias (`overlay`, `below`, `views`) que também não podem ser consolidadas — o que muda entre elas é **onde o texto mora**, não a medida.
- **Três alvos de inscrição distintos convivem no produto** e nenhum pode ser consolidado: o `SubscribeButton` sólido em `#CC0000` (tela de vídeo, primeiro arquivo), o botão do `ShortsPlayer` sólido em `#FF0000` com raio de 4px (`3:208`) e a chamada em **texto** vermelho do `MobileChannelHeader` (`16:1087`).
- `SubscribeButton` é o **único botão sólido do primeiro arquivo**. `Button` é transparente.
- **As quatro extensões não vêm dos arquivos de origem.** As seis telas publicadas não abrem camada modal, não confirmam ação, não organizam dados em grade e nunca estão vazias. `Modal`, `Snackbar`, `Table` e `EmptyState` foram acrescentados porque produto precisa deles, e a alternativa — compor com os equivalentes da Plataforma Unooria — traria Open Sans e a paleta navy para dentro do Roboto e do vermelho. **Cada um deriva a forma de degraus que os arquivos DE FATO publicam**: a superfície elevada e os três degraus de `Elevation` no `Modal` e no `Snackbar` (o quadro `Elevation` chega a descrever o degrau alto como "modal: diálogos e folhas"), a régua da linha de lista de 40px na `Table`, a escala tipográfica de onze degraus no `EmptyState`. O único valor novo em todo o grupo é `--uni-color-scrim`. **É PROIBIDO ampliar esse grupo sem registrar o desvio na estória correspondente**, e continua proibido inventar cor: o `Snackbar` não tem escada de severidade porque a marca publica um único vermelho semântico e nenhum verde, âmbar ou azul de estado.
- `DesktopFrame` e `PhoneFrame` são contêineres **de documentação**, não de produção.
- O `Icon` é documentado apenas em `Fundamentos/Ícones`; não há estória duplicada em `Componentes`.

#### 10.3.1. Reprodução de vídeo real

`VideoPlayer` e `ShortsPlayer` **não são mais camadas de apresentação**. Os arquivos de design são estáticos — bitmaps com controles desenhados —, e a máquina de estados que faltava vive em `src/unootube/components/VideoPlayer/useVideoPlayback.ts`, deliberadamente separada da apresentação para que o quadro de 16:9 e o de 9:16 compartilhem exatamente o mesmo motor.

- **Dois modos, decididos pela presença de fonte.** Com `src` ou `sources`, o componente monta um `<video>` real e os controles operam: reproduzir, pausar, buscar na linha do tempo, volume, mudo, legendas e tela cheia; relógio, progresso e trecho carregado passam a vir do elemento. **Sem fonte, permanece a réplica estática** governada por `poster`, `progress`, `buffered`, `currentTime` e `duration` — é assim que a documentação continua reproduzindo o arquivo quadro a quadro, e é por isso que os dois modos precisam continuar existindo.
- **MIGRAÇÃO**: `src` designava o quadro estático até a versão anterior. Agora `src` é o **vídeo** e o quadro estático é `poster`. `VideoPlayerFull` e `VideoCardHorizontal` foram migrados junto.
- O estado é sempre **lido dos eventos do elemento**, nunca escrito de forma otimista: é o que mantém o botão refletindo a verdade quando o navegador recusa o autoplay ou quando o vídeo é comandado por fora.
- O `ShortsPlayer` começa **silenciado e em laço** por padrão — a única combinação que os navegadores aceitam para autoplay, e o comportamento do formato.
- As estórias **não embarcam mídia**: o vídeo de demonstração é desenhado em um `<canvas>` e gravado pelo navegador com `MediaRecorder` (`stories/unootube/demoVideo.ts`). Falhando a gravação, as estórias caem no modo estático.

### 10.4. Iconografia Derivada do Figma
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou substituído por outra biblioteca. Os **52** ícones vivem em `src/unootube/components/Icon/IconPaths.ts` com o atributo `d` **literal do export SVG do Figma** e o `viewBox` original preservado: **45** do primeiro arquivo, todos 24×24, e **sete** do segundo, exportados no contorno justo do nó e portanto **não quadrados**.
- **A prop `size` governa a altura**; a largura é derivada da razão do `viewBox`. Para os 45 glifos quadrados o alvo continua quadrado; para os sete do arquivo de Shorts é essa derivação que preserva a forma — normalizar o `moreVertical` (3,26 × 16,28) para um quadrado o esticaria.
- **Sete glifos foram descartados por já existirem.** O segundo arquivo redesenha a lupa (`1:215` = `search` transladado -3,-3), o sino (`1:212` = `notifications` transladado), a casa da barra de abas (`1:238` = `homeFill` transladado -4,-3), a biblioteca (`1:248` = `library` × 1,1667), as inscrições (`1:245` = `subscriptions` × 1,1667), o polegar da trilha (`3:217` = `likedFill` × 1,5) e as reticências da trilha (`3:212` = `more` × 1,5). **Nenhum foi duplicado**; a conferência está anotada no bloco `shorts` do registro.
- **Os sete que entraram**: `shortsComment`, `shortsShare`, `moreVertical`, `arrowLeft`, `camera`, `cast` e `createCircle`.
- **`arrowLeft` e `camera` são traçados, não preenchidos** — os nós declaram `stroke-width: 2` com pontas arredondadas. São o único par assim na biblioteca, e o motivo de o registro passar a aceitar um campo `shapes` com traço além do campo `d` de caminho único.
- Quando o arquivo reaproveita o mesmo vetor girado — o polegar de "não curtir" (`3:221`) —, use a prop `rotate` em vez de duplicar o caminho com coordenadas reescritas.
- **As duas formas do raio do Shorts vivem em `src/unootube/components/ShortsLogo/ShortsLogoVector.ts`**, e não no registro de ícones: o maciço vermelho da marca (`1:737`) e o de contorno monocromático da navegação (`I1:241;13:110`). **Não são a mesma forma em cores diferentes** — são dois vetores distintos, com papéis distintos, e por isso a prop se chama `variant` e não `tone`.
- **O glifo de som do reprodutor de Shorts não tem caminho no arquivo**: são cinco retângulos (`3:240` a `3:244`). Vive em `ShortsPlayer/SoundGlyph.tsx`, pelo mesmo motivo que os retângulos do selo HD vivem em `PlayerGlyphs`.
- O arquivo pinta os 45 glifos de branco puro. O preenchimento literal foi trocado por `currentColor` para que o mesmo vetor sirva ao texto primário, ao secundário e ao cromo do reprodutor — as três cores em que as telas os aplicam.
- **Treze glifos existem em par contorno/preenchido** (`home`/`homeFill`, `explore`/`exploreFill`, …). É essa dupla que marca o item ativo da barra lateral: a cor **não muda** entre ativo e inativo, apenas o peso do vetor e o fundo da linha.
- Os **nove controles do reprodutor** (`play`, `next`, `sound`, `titles`, `quality`, `theater`, `tv`, `fullscreen`, `info`) **não são componentes** no arquivo: são nós `VECTOR`, `GROUP` e `BOOLEAN_OPERATION` soltos dentro do quadro `Media/VideoPlayer` (`18:1295`). Vivem em `src/unootube/components/VideoPlayer/PlayerGlyphs.ts`, com a **geometria de preenchimento resolvida** (`node.fillGeometry`) — o resultado literal das operações booleanas — e o traço de 1px em preto a 10% reproduzido via `--uni-color-player-glyph-outline`.
- O logotipo vive em `src/unootube/components/Logo/LogoVector.ts`. Só o emblema é literal do export; o logotipo tipográfico “Unootube” são **oito contornos de Roboto Bold**, um por letra, gerados por transformação única da curva da fonte (escala, inversão do eixo Y e translação até a linha de base) — nenhuma coordenada foi redesenhada à mão. **É proibido reescrevê-lo como `<text>`**: fallback de fonte deformaria a marca.

### 10.5. Kit de Documentação
As estórias do Unootube usam o `UnooriaDocShell` como moldura e os utilitários de `.storybook/components/UniDocKit.tsx`: `UniDocGrid`, `UniDocCard`, `UniDocFigmaSpecs`, `UniDocDeviations`, `UniDocAnatomy`, `UniDocStage`, `UniDocPractices`, `UniDocThemeSwitcher`, `UniDocSurfaceSwitcher`, `UniDocPropsTable` e `UniDocTokenSwatch`. Toda estória mantém as seções obrigatórias do Padrão Ouro definidas na seção 3.

- A seção 6 ("Suporte a Temas") usa o **`UniDocThemeSwitcher`**, que alterna `data-uni-theme` entre `dark` e `light` — exatamente como um produto faz. Ele só é legítimo porque o segundo arquivo publica o par medido.
- O **`UniDocSurfaceSwitcher`** continua sendo a ferramenta para percorrer a escada de luminância **dentro** de um tema, e é o que se usa quando o componente só existe no primeiro arquivo.
- O `UniDocStage` aceita a prop `theme`, que continua padrão `dark`.

### 10.6. Registro de Desvios em Relação ao Figma
Qualquer divergência intencional **DEVE** ser documentada com o `UniDocDeviations` na seção "Figma & Especificações Técnicas" da estória. Desvios registrados até o momento:
- **Tema claro medido, não derivado**: o primeiro arquivo publica apenas o modo escuro, e nenhum valor claro foi inventado a partir dele. O tema claro veio integralmente medido do segundo arquivo, que desenha as mesmas telas nas duas versões (`1:593`, `1:115`, `1:801`).
- **Superfície de seleção separada da interativa**: no escuro a linha selecionada da barra lateral e a pílula de filtro compartilham `#303030`. No claro o segundo arquivo mede valores distintos — `#E4E4E4` na linha (`1:602`) contra `#ECECEC` na pílula (`1:228`) —, e por isso surgiu `--uni-color-surface-selected`. O `SidebarMenuItem` passou a citá-lo; no escuro nada mudou.
- **Cromo móvel branco, cromo de trabalho cinza**: no tema claro o arquivo pinta as barras móveis (`1:201`, `1:235`) de branco puro e o cromo de 1440px (`1:596`) de `#F6F6F6`. A divergência é do próprio arquivo e foi preservada em `--uni-color-surface-chrome`, que no escuro coincide com `--uni-color-background-secondary`.
- **Prateleira sem preenchimento próprio**: o arquivo desenha a prateleira de Shorts sobre a superfície da página nos dois temas e nas duas disposições. O componente não pinta fundo — a separação vem dos recuos e, na área de trabalho, dos fios de `bordered`.
- **Um quinto vermelho**: o botão de inscrição do reprodutor de Shorts usa `#FF0000`, o mesmo valor que o emblema do logotipo tinha no arquivo. Foi tokenizado como `--uni-color-brand-shorts` em vez de reaproveitar `--uni-color-brand-logo` — são papéis diferentes, e a troca da marca provou o ponto: o emblema virou `#005CE6` e o botão de inscrição do Shorts continuou vermelho, sem nenhuma alteração.
- **Marca substituída no `Logo`**: os sete caminhos do logotipo tipográfico do YouTube foram removidos e substituídos por “Unootube” em Roboto Bold, com altura de maiúscula de 13px, linha de base em `y = 16,77` e tinta começando em `x = 31,3945` — o mesmo ponto em que começava o “Y”, o que preserva a folga óptica de 2,82px em relação ao emblema. O `viewBox` cresceu para 109,83×20 (22% mais largo); como o componente deriva a largura do `viewBox`, quem informa só `height` acompanha sem alteração. O emblema passou de `#FF0000` a `#005CE6`, e o logotipo tipográfico continua herdando `--uni-color-text-primary`, de modo que acompanha o tema enquanto o emblema é invariante.
- **Geometria remanescente do arquivo no emblema**: o retângulo arredondado e o triângulo continuam sendo os caminhos literais do nó `2:88` — silhueta ainda reconhecível do arquivo comunitário. Um produto que queira independência total da referência deve redesenhar também o emblema.
- **Terceiro peso e raio de 4px**: o primeiro arquivo publica apenas Regular 400 e Bold 700, e uma coleção `Radius` que salta de 2px para 8px. O segundo usa Roboto Medium 500 em quase todo o Shorts e raio de 4px em três alvos. Ambos entraram como tokens (`--uni-font-weight-medium`, `--uni-radius-control`) sem alterar nenhum degrau publicado.
- **Corpo de 26px fora da escala**: o nome do canal móvel (`16:1085`) não tem degrau equivalente — a escala salta de 24 para nada. Preservado como literal e anotado no CSS do `MobileChannelHeader`.
- **Dois diâmetros de avatar fora da escala nomeada**: 38px na linha de canal do Shorts (`3:487`) e 77px no cabeçalho de canal móvel (`16:1082`). Entram por `size` numérico no `Avatar`, para que a escala nomeada continue refletindo só o primeiro arquivo.
- **Reprodução de vídeo acrescentada**: os arquivos são estáticos e não descrevem reprodução, tempo, volume, tela cheia, botão central, recolhimento de controles, punho da linha do tempo, régua de volume nem indicador de carregamento. Todos foram acrescentados usando exclusivamente tokens da própria marca — ver 10.3.1.
- **Linha do tempo do Shorts**: o arquivo não desenha progresso no reprodutor vertical. A faixa de 2px na base é extensão, e pode ser desligada com `showProgress={false}` para obter a réplica exata do quadro.
- **Rótulo "Storts"**: o arquivo escreve "Storts" na prateleira móvel (`1:134`) e "Shorts" na da área de trabalho (`1:740`). É um erro de digitação do arquivo comunitário, **não reproduzido**.
- **Véu do cartão de Shorts declarado como gradiente**: o arquivo declara um `GRADIENT_LINEAR` de 90° com as duas paradas idênticas — ou seja, uma cor sólida translúcida. Reproduzido como cor, porque é isso que o valor significa.
- **Hierarquia de texto no cartão `below`**: no quadro claro o arquivo pinta título e visualizações com a mesma tinta (`1:745`). O componente usa `text-primary` e `text-secondary`, para preservar a hierarquia exigida pela seção 4.2.
- **Espaçamento irregular da barra de abas móvel**: o arquivo agrupa os três primeiros destinos com 34px e afasta os dois últimos com 24px. O `MobileTabBar` distribui os cinco uniformemente — a régua do arquivo não sobrevive a uma janela diferente da do quadro.
- **Passo irregular da trilha de ações**: as ações da variante `standalone` são posicionadas em coordenadas absolutas, com passo de 108,9px que inclui o rótulo. O componente usa um espaçamento único equivalente, para sobreviver a rótulos de comprimento diferente.
- **Superfície `transparent` do `MobileHeader`**: não existe no arquivo, que sempre desenha a barra opaca acima do vídeo. Foi acrescentada porque o reprodutor de Shorts em tela cheia não deixa faixa para uma barra opaca.
- **Ausência de barra de status nas telas móveis**: ao contrário do Instanooria, do WhatsApp Mobile e do Tik Tooria, o segundo arquivo não desenha a barra de status do sistema em nenhuma das seis telas móveis. Nenhuma foi inventada.
- **Raio do `PhoneFrame`**: o arquivo desenha os quadros de dispositivo com cantos retos. O raio de 24px existe só para que a moldura leia como um dispositivo no painel de documentação, e nenhum componente de produção depende dele.
- **Raio maciço do Shorts colado como PNG no móvel**: na prateleira móvel o arquivo cola o raio como bitmap (`1:132`). O vetor foi tomado da versão da área de trabalho (`1:737`), idêntica em forma. Nenhum bitmap foi redistribuído.
- **Ponto de quebra em 560px do `ShortsPlayer`**: o arquivo publica a variante de cartão só no quadro de 1440px. Abaixo de 560px o quadro de 488px não cabe ao lado da trilha.
- **Marca registrada do Shorts**: o raio é marca do Google LLC e está presente por fidelidade ao arquivo comunitário. **É o último vetor de terceiro do módulo** — o `Logo` já foi substituído pela marca da Unooria —, e um produto que publique a biblioteca deve substituir `ShortsLogoVector.ts` pela própria marca.
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
- **Quatro componentes que o arquivo não publica**: `Modal`, `Snackbar`, `Table` e `EmptyState` são extensões declaradas — ver 10.3. Cada um registra o desvio na própria estória, e o único token novo do grupo é `--uni-color-scrim` (preto a 60%), construído sobre a primitiva preta da escada.
- **Glifo de fechar tipográfico**: nenhum dos 52 glifos é um "fechar" — as telas publicadas não abrem camada nenhuma. O `Modal` usa o caractere `✕` na própria família Roboto e expõe a prop `closeIcon` para que um produto com família vetorial própria injete a sua, em vez de a biblioteca desenhar um vetor à mão.
- **`showSubscribe`**: o arquivo sempre desenha o botão de inscrição, porque toda tela de canal que ele publica é a de um canal de terceiro. `ChannelHeader` e `MobileChannelHeader` ganharam a prop para suprimi-lo no canal do próprio usuário. Vem ligada, preservando o desenho do arquivo por padrão.
- **Capa de canal sem bitmap**: o arquivo mede `#F8F8F8` atrás da capa (`17:2796`), mas ali o bitmap sempre a cobre — a laje nunca aparece. Em produto sem capa, aparecia: eram 192px de branco no meio de uma tela escura. O literal virou o valor do **tema claro** e o escuro recebeu a superfície interativa, no token `--uni-color-cover-placeholder`.
- **`--uni-color-text-on-media`**: texto e glifo desenhados sobre vídeo ou miniatura não entram no par claro/escuro — o arquivo os pinta de branco nos dois temas, porque o fundo é a mídia e não a superfície da página. O token existe para deixar essa invariância explícita e para que nenhum componente precise citar a primitiva `--uni-color-white`.
- **Frames não reconstruídos**: nenhum. As três telas da página `Screen` do primeiro arquivo e as seis composições do segundo (três telas × móvel e área de trabalho) foram todas reconstruídas. Os quadros do segundo arquivo se repetem em iPhone e Android com as mesmas composições e recuos ligeiramente diferentes; o `PhoneFrame` publica as duas medidas.
