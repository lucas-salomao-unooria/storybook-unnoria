# Guia de Desenvolvimento do Gemini / Agentes - Design System Unooria (Padrão Ouro)

Este documento estabelece as regras e padrões arquiteturais obrigatórios para desenvolvimento, criação de componentes, consumo de tokens e documentação no Storybook para a Plataforma Unooria.

> **Paridade obrigatória**: `GEMINI.md` e `AGENTS.md` compartilham o mesmo corpo normativo (seções 1 a 16) e diferem apenas neste cabeçalho. Ao alterar uma regra, **altere os dois arquivos na mesma edição**.

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
- **Marcas**: cada uma usa o mesmo trio de subpastas — `stories/[marca]/fundamentos/`, `stories/[marca]/componentes/` e `stories/[marca]/telas/` — mais um `stories/[marca]/fixtures.ts` com o conteúdo de demonstração compartilhado. Vale para `instanooria`, `chatgpt`, `whatsappmobile`, `tiktooria`, `unootube`, `unoochat`, `unoovista`, `unooriaai`, `unoogaleria`, `unoojornal` e `unooblog`.
- **Inconsistência conhecida**: a Plataforma Unooria usa `components/` (em inglês) e as marcas usam `componentes/`. É assim no repositório; ao criar uma estória, siga a convenção da pasta que já existe.
- **Recursos rasterizados** exportados do Figma ficam em `public/[marca]/` e são sempre informados por prop (`src`, `avatarSrc`, `coverSrc`, `portraitSrc`), **nunca embutidos no pacote**.
  - **Duas exceções, e só elas: o `Logo` e o mascote do agente de IA do professor.** O `Logo`/`LogoSymbol` embute a marca em `src/unooria/assets/brand/brandImages.ts`; o `AgentAvatar` embute o busto do mascote em `src/unooria/assets/agent/agentImages.ts` (desde a 0.2.10, por decisão do dono do produto). O porquê é o mesmo: os dois são **identidade da marca**, e o produto não pode trocá-los nem precisar hospedá-los — o avatar do agente tem de chegar PELO DS. O custo é peso no pacote (o base64 vai em cada formato do JS), e por isso o bitmap entra **otimizado**: WebP com alfa, em dois tamanhos (128 px = 4,9 KB e 256 px = 11,5 KB), gerado por `scripts/recortar-mascote-agente.py` e `scripts/embutir-mascote-agente.mjs`, e tipado como `string` para o literal não ir ao `.d.ts` (o `brandImages.d.ts`, com `as const`, tem 561 KB). Bitmap novo **não herda** a exceção: ilustração, foto e capa continuam entrando por prop.
- **Componentes Utilitários de Documentação**: `.storybook/components/` reúne a moldura compartilhada (`UnooriaDocShell`, `UnooriaDocHeader`, `UnooriaDocSectionHeader`) e um kit de seções por marca (`InstaDocKit`, `GptDocKit`, `WaDocKit`, `TikDocKit`, `UniDocKit`, `UncDocKit`, `UnvDocKit`, `UaiDocKit`, `UglDocKit`, `UjnDocKit`, `UblDocKit`).

### 1.3. Módulos Multimarca (`src/whatsappmobile/`, `src/instanooria/`, `src/chatgpt/`, `src/tiktooria/`)
O pacote publica **dez design systems** em um único artefato NPM:

| Marca | Módulo | Namespace | Prefixo CSS / classes | Tema ou contexto | Componentes | Arquivo Figma de origem |
|---|---|---|---|---|---|---|
| Plataforma Unooria | `src/unooria/` | `UnooriaUI` + exportação na raiz | `--unooria-*` / `.unooria-*` | Light e Dark | 57 | — (design próprio) |
| Instanooria | `src/instanooria/` | `InstanooriaUI` | `--insta-*` / `.insta-*` | `data-insta-theme="light \| dark"` | 31 | Instagram UI Screens (Community) |
| ChatGPT | `src/chatgpt/` | `ChatGPTUI` | `--gpt-*` / `.gpt-*` | `data-gpt-theme="light \| dark"` | 25 | ChatGPT UI Kit (AI Chat) (Community) |
| WhatsApp Mobile | `src/whatsappmobile/` | `WhatsAppMobileUI` | `--wa-*` / `.wa-*` | `data-wa-theme="dark"` — só escuro | 39 | WhatsApp Clone - Dark mode (Community) |
| Tik Tooria | `src/tiktooria/` | `TikTooriaUI` | `--tik-*` / `.tik-*` | `data-tik-surface="chrome \| immersive"` — dois contextos, não dois temas | 35 | TikTok UI Screens (Community) |
| Unootube | `src/unootube/` | `UnootubeUI` | `--uni-*` / `.uni-*` | `data-uni-theme="light \| dark"` | 44 | YouTube UI Clone Design (Community) + Free YouTube Shorts Mockups (Community) |
| Unoochat | `src/unoochat/` | `UnoochatUI` | `--unc-*` / `.unc-*` | `data-unc-theme="light \| dark"` | 39 | — (estrutura de `src/whatsappmobile/`; identidade da Plataforma Unooria) |
| Unoovista | `src/unoovista/` | `UnoovistaUI` | `--unv-*` / `.unv-*` | `data-unv-theme="light \| dark"` | 31 | — (estrutura de `src/instanooria/`; identidade da Plataforma Unooria) |
| UnooriaAI | `src/unooriaai/` | `UnooriaAIUI` | `--uai-*` / `.uai-*` | `data-uai-theme="light \| dark"` | 25 | — (estrutura de `src/chatgpt/`; identidade da Plataforma Unooria) |
| Unoogaleria | `src/unoogaleria/` | `UnoogaleriaUI` | `--ugl-*` / `.ugl-*` | `data-ugl-theme="light \| dark"` + superfície imersiva invariante | 32 | — (identidade da Plataforma Unooria; galeria de fotos e vídeos com o app completo — ver seção 14) |
| Unoojornal | `src/unoojornal/` | `UnoojornalUI` | `--ujn-*` / `.ujn-*` | `data-ujn-theme="light \| dark"` + rodapé escuro invariante | 43 | Jornal da Escola (estrutura editorial; identidade da Plataforma Unooria, com o app completo — ver seção 15) |
| Unooblog | `src/unooblog/` | `UnooblogUI` | `--ubl-*` / `.ubl-*` | `data-ubl-theme="light \| dark"` + código em superfície escura invariante | 45 | — (identidade da Plataforma Unooria; blog de leitura longa com o app completo — ver seção 16) |

- Cada marca vive em seu próprio módulo sob `src/`, com **namespace de tokens e prefixo de classes CSS exclusivos**, e é exportada do `src/index.ts` **apenas como namespace** (`WhatsAppMobileUI`, `InstanooriaUI`, `ChatGPTUI`, `TikTooriaUI`, `UnootubeUI`, `UnoochatUI`, `UnoovistaUI`, `UnooriaAIUI`, `UnoogaleriaUI`, `UnoojornalUI`, `UnooblogUI`). Só a Plataforma Unooria também é exportada na raiz — as marcas nunca, para evitar colisão de nomes (`Avatar`, `Badge`, `Button`, `TabBar` e `PhoneFrame` existem em mais de uma).
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
- **Unoochat** (mensageria móvel com identidade da Plataforma Unooria, criada como cópia estrutural de `src/whatsappmobile/` — ver seção 11):
  - Código de produção: `src/unoochat/tokens/` e `src/unoochat/components/[NomeComponente]/`.
  - Estórias: `stories/unoochat/fundamentos/`, `stories/unoochat/componentes/` e `stories/unoochat/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/unoochat/fixtures.ts`. Ilustrações SVG geradas a partir da paleta da Unooria: `public/unoochat/`.
  - **Sem arquivo Figma de origem.** Os tokens são literais copiados de `src/unooria/tokens/`, com o token de origem no comentário; `scripts/verificar-paridade-unoochat.mjs` guarda a paridade.
  - Prefixo de variáveis CSS: `--unc-*`. Prefixo de classes: `.unc-*`. Atributo de tema: `data-unc-theme="light | dark"`.
- **Unoovista** (rede social visual com identidade da Plataforma Unooria, criada como cópia estrutural de `src/instanooria/` — ver seção 12):
  - Código de produção: `src/unoovista/tokens/` e `src/unoovista/components/[NomeComponente]/`.
  - Estórias: `stories/unoovista/fundamentos/`, `stories/unoovista/componentes/` e `stories/unoovista/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/unoovista/fixtures.ts`. Ilustrações SVG geradas a partir da paleta da Unooria: `public/unoovista/`.
  - **Sem arquivo Figma de origem.** Os tokens de cor e de tipografia são literais copiados de `src/unooria/tokens/`, com o token de origem no comentário; `scripts/verificar-paridade-unoovista.mjs` guarda a paridade.
  - Prefixo de variáveis CSS: `--unv-*`. Prefixo de classes: `.unv-*`. Atributo de tema: `data-unv-theme="light | dark"`.
- **UnooriaAI** (cliente de conversa com IA com identidade da Plataforma Unooria, criado como cópia estrutural de `src/chatgpt/` — ver seção 13):
  - Código de produção: `src/unooriaai/tokens/` e `src/unooriaai/components/[NomeComponente]/`.
  - Estórias: `stories/unooriaai/fundamentos/`, `stories/unooriaai/componentes/` e `stories/unooriaai/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/unooriaai/fixtures.ts`. Ilustrações SVG geradas a partir da paleta da Unooria: `public/unooriaai/`.
  - **Sem arquivo Figma de origem.** Os tokens de cor, de tipografia e de elevação são literais copiados de `src/unooria/tokens/`, com o token de origem no comentário; `scripts/verificar-paridade-unooriaai.mjs` guarda a paridade.
  - Prefixo de variáveis CSS: `--uai-*`. Prefixo de classes: `.uai-*`. Atributo de tema: `data-uai-theme="light | dark"`.
- **Unoogaleria** (galeria de fotos e vídeos de celular com identidade da Plataforma Unooria, com o aplicativo completo pronto para o mockup — ver seção 14):
  - Código de produção: `src/unoogaleria/tokens/`, `src/unoogaleria/media/` (modelo de domínio), `src/unoogaleria/hooks/` e `src/unoogaleria/components/[NomeComponente]/`.
  - Estórias: `stories/unoogaleria/fundamentos/`, `stories/unoogaleria/componentes/` e `stories/unoogaleria/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/unoogaleria/fixtures.ts`. Ilustrações SVG e vídeos gerados a partir da paleta da Unooria: `public/unoogaleria/`.
  - **Sem arquivo Figma de origem.** Os tokens de cor, de tipografia, de tamanho de ícone e de desfoque são literais copiados de `src/unooria/tokens/`, com o token de origem no comentário; `scripts/verificar-paridade-unoogaleria.mjs` guarda a paridade.
  - Prefixo de variáveis CSS: `--ugl-*`. Prefixo de classes: `.ugl-*`. Atributo de tema: `data-ugl-theme="light | dark"`.
- **Unoojornal** (jornal escolar digital com a estrutura editorial do arquivo Figma "Jornal da Escola" e a identidade da Plataforma Unooria, com o aplicativo completo pronto para o mockup — ver seção 15):
  - Código de produção: `src/unoojornal/tokens/`, `src/unoojornal/edition/` (modelo editorial), `src/unoojornal/hooks/` e `src/unoojornal/components/[NomeComponente]/`.
  - Estórias: `stories/unoojornal/fundamentos/`, `stories/unoojornal/componentes/` e `stories/unoojornal/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/unoojornal/fixtures.ts`. Ilustrações SVG geradas da paleta da Unooria por `scripts/gerar-ilustracoes-unoojornal.mjs`: `public/unoojornal/`.
  - **Estrutura vem do Figma, cor e fonte vêm da Unooria.** Os tokens de cor, de tipografia, de tamanho de ícone e de elevação são literais copiados de `src/unooria/tokens/`, com o token de origem no comentário; `scripts/gerar-tokens-unoojornal.mjs` os gera e `scripts/verificar-paridade-unoojornal.mjs` guarda a paridade.
  - Prefixo de variáveis CSS: `--ujn-*`. Prefixo de classes: `.ujn-*`. Atributo de tema: `data-ujn-theme="light | dark"`.
- **Unooblog** (blog de leitura longa com identidade da Plataforma Unooria e composição própria, com o aplicativo completo pronto para o mockup — ver seção 16):
  - Código de produção: `src/unooblog/tokens/`, `src/unooblog/content/` (modelo editorial), `src/unooblog/hooks/` e `src/unooblog/components/[NomeComponente]/`.
  - Estórias: `stories/unooblog/fundamentos/`, `stories/unooblog/componentes/` e `stories/unooblog/telas/`.
  - Conteúdo de demonstração compartilhado: `stories/unooblog/fixtures.ts`. Ilustrações SVG geradas da paleta da Unooria por `scripts/gerar-ilustracoes-unooblog.mjs`: `public/unooblog/`.
  - **Sem arquivo Figma de origem.** Os tokens de cor, de tipografia, de tamanho de ícone, de desfoque e de elevação são literais copiados de `src/unooria/tokens/`, com o token de origem no comentário; `scripts/gerar-tokens-unooblog.mjs` os gera e `scripts/verificar-paridade-unooblog.mjs` guarda a paridade.
  - Prefixo de variáveis CSS: `--ubl-*`. Prefixo de classes: `.ubl-*`. Atributo de tema: `data-ubl-theme="light | dark"`.
- **REGRA CRÍTICA**: um módulo de marca **NUNCA** consome tokens de outro. **O Unoochat, o Unoovista, o UnooriaAI, a Unoogaleria, o Unoojornal e o Unooblog também não leem `--unooria-*` em tempo de execução**: eles copiam os literais (seções 2.8, 2.9, 2.10, 2.11, 2.12 e 2.13), e a paridade é guardada por script. É proibido usar `var(--unooria-*)` dentro do Instanooria, do ChatGPT ou do WhatsApp Mobile, `var(--insta-*)` fora do Instanooria, `var(--gpt-*)` fora do ChatGPT `var(--wa-*)` fora do WhatsApp Mobile, `var(--tik-*)` fora do Tik Tooria e `var(--uni-*)` fora do Unootube e `var(--unc-*)` fora do Unoochat e `var(--unv-*)` fora do Unoovista e `var(--uai-*)` fora do UnooriaAI e `var(--ugl-*)` fora da Unoogaleria e `var(--ujn-*)` fora do Unoojornal e `var(--ubl-*)` fora do Unooblog — são marcas com hierarquias cromáticas distintas.

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
### 2.8. Tokens do Unoochat (`src/unoochat/tokens/`)
Todo componente, estilo ou documentação do Unoochat **DEVE** consumir exclusivamente as variáveis `--unc-*`. Ao contrário das outras marcas, o Unoochat **não tem arquivo de design de origem**: a identidade é a da **Plataforma Unooria** — paleta roxa, Open Sans e Material Symbols — e cada token é uma **cópia literal** do valor da plataforma, com o nome do token de origem no comentário da linha. **O módulo nunca lê `--unooria-*` em tempo de execução** (seção 1.3): o que se copia é o literal, e `scripts/verificar-paridade-unoochat.mjs` (encadeado no `build:package`) reprova o build se um literal divergir da origem ou se o token citado deixar de existir.

- **Dois temas, ambos medidos sobre a escala `brandpurple`**: `:root, [data-unc-theme='light']` e `[data-unc-theme='dark']`. Claro: superfícies em branco e lavanda (`brandpurple-50` a `-300`), acento `brandpurple-600` (`#716C98`). Escuro: superfícies em roxo profundo (`brandpurple-700` a `-950`), acento `brandpurple-400` (`#AAA5C2`). **É PROIBIDO derivar um tema por cálculo** (inverter, clarear, aplicar opacidade): cada valor de cada tema é um degrau nomeado da Unooria.
- **Superfícies (escada de luminância)**: `--unc-color-surface-base`, `-canvas`, `-appbar`, `-elevated`, `-dialog`, `-sheet`, `-datechip`, `-notice`, `-bubble-out`, `-bubble-out-strip`, `-bubble-in`, mais `--unc-color-scrim` (`--unooria-color-opacity-brandpurple-600`, invariante).
- **Acento único**: `--unc-color-accent` cobre aba ativa, FABs, selo de não lidas, ações de texto do diálogo, sublinhado do campo e controle selecionado. Permanece só `--unc-color-accent-call-out` (chamada efetuada, `success`). **Não reintroduzir** variantes de acento por componente: a origem do módulo tinha onze tons e a decisão foi consolidar.
- **Texto (7)**: `--unc-color-text-primary`, `-secondary`, `-placeholder`, `-notice`, `-bubble`, `-bubble-meta`, `-on-accent`, mais `-inverse` (tela de chamada, invariante). **Ícones (5)**: `--unc-color-icon-appbar`, `-muted`, `-on-accent`, `-tick`, `-star`, mais `--unc-color-statusbar-fg`. **Bordas (4)**: `--unc-color-border-divider`, `-dialog`, `-control`, `-status-ring`.
- **Invariantes entre temas**: tela de chamada (`--unc-color-call-*`, `--unc-color-text-inverse`), botão de encerrar (`--unc-color-danger-endcall`), bateria (`--unc-color-warning-battery`) e as seis ações da folha de anexos (`--unc-color-attach-*`, família `brandpurple`, `danger`, `brandnavy`, `warning`, `success` e `info`, todas com glifo branco ≥ 3:1). **Não reaproveitar** `attach-*` fora da folha de anexos.
- **Contraste medido, nos dois temas**: texto ≥ 4,5:1 e gráfico ≥ 3:1 para todos os pares texto/superfície e acento/superfície de uso real (primário e secundário sobre canvas, appbar e sheet; `text-on-accent` sobre acento; texto do balão sobre os dois balões; acento sobre canvas, appbar e dialog). A tabela está em `Unoochat/Fundamentos/Cores`.
- **Tipografia**: família Open Sans via `--unc-font-sans` (e `--unc-font-statusbar`, que a repete); escala de **18 estilos** nos degraus da Unooria (10, 12, 14, 16, 18, 20 e 24px) com as alturas de linha da Unooria (14, 18, 20, 24, 28, 30 e 34px); pesos 400/600/700 (mais o 500, tokenizado). **Sem `letter-spacing`**, como na escala da plataforma. Cada estilo cita o token `--unooria-size-*` de origem.
- **Medidas**: escala `--unc-spacing-4xs` (2px) a `--unc-spacing-4xl` (48px), calhas `--unc-gutter` (19px) e `--unc-gutter-appbar` (24px), raios, dimensões estruturais (`--unc-device-width` 411px, `--unc-device-height` 823px, `--unc-appbar-height` 100px etc.), diâmetros de avatar e de FAB — **próprios do módulo**, herdados da estrutura de `src/whatsappmobile/`, e não da escala de espaçamento da Unooria (que é de 4/8px e deslocaria as linhas de altura fixa). Ícones: `--unc-icon-size-xs|sm|md|lg|xl` = 16/18/20/24/32px, degraus de `--unooria-icon-size-*`.
- **Elevação**: a superfície é plana; **`--unc-elevation-overlay`**, definido por tema (`--unooria-elevation-brand-secondary` no claro, `--unooria-elevation-neutral-2` no escuro), se aplica **apenas** a Menu, Dialog, BottomSheet, Toast e Fab. A origem do módulo era plana e sem sombra alguma; esta é uma decisão nova, registrada em 11.6.

### 2.9. Tokens do Unoovista (`src/unoovista/tokens/`)
Todo componente, estilo ou documentação do Unoovista **DEVE** consumir exclusivamente as variáveis `--unv-*`. Como o Unoochat, o Unoovista **não tem arquivo de design de origem**: a identidade é a da **Plataforma Unooria** — paleta roxa, Open Sans e Material Symbols — e cada token de cor e de tipografia é uma **cópia literal** do valor da plataforma, com o nome do token de origem no comentário da linha. **O módulo nunca lê `--unooria-*` em tempo de execução** (seção 1.3): `scripts/verificar-paridade-unoovista.mjs` (encadeado no `build:package`) reprova o build se um literal divergir da origem ou se o token citado deixar de existir. `colors.css` e `colors.ts` saem da mesma tabela, então não divergem entre si.

- **Dois temas, ambos medidos sobre a escala `brandpurple`**: `:root, [data-unv-theme='light']` e `[data-unv-theme='dark']`. Claro: superfícies em branco e lavanda (`brandpurple-50` a `-300`), acento `brandpurple-600` (`#716C98`). Escuro: superfícies em roxo profundo (`brandpurple-800` a `-950`), acento `brandpurple-400` (`#AAA5C2`). **É PROIBIDO derivar um tema por cálculo** (inverter, clarear, aplicar opacidade). Diferente do módulo de origem, **não há bloco `prefers-color-scheme`**: o tema é sempre escolhido pelo atributo (padrão claro).
- **Superfícies em camadas**: `--unv-color-background-primary` (cartões e conteúdo), `-secondary` (a tela, atrás dos cartões), `-tertiary` (cápsulas e blocos sutis), `-elevated` (menus, folhas, diálogos e a doca). No escuro, `-tertiary`, `-elevated` e `--unv-color-fill-field` coincidem em `brandpurple-800`: a distinção ali vem do halo de `--unv-elevation-overlay`. `-elevated` **não** pode ser `brandpurple-700` — nesse degrau o acento, o link e o coração caem abaixo de 3:1.
- **Texto** (`--unv-color-text-primary|secondary|link|placeholder|on-action|on-notification|on-media`), **ícones** (`-icon-primary|secondary`), **bordas** (`-border-default|subtle|bar|control`; o contorno de campo e de seleção usa `-control`, que passa de 3:1) e **ações** (`-action-primary|pressed|disabled|secondary-border`, `-fill-field`).
- **Marca**: `--unv-color-brand-like|verified|notification`, `-highlight-ring`, `-ring-inner` — variam com o tema para manter contraste. Só `--unv-color-livebadge-gradient-*` e `--unv-color-text-on-media` são invariantes.
- **Gradientes**: `--unv-gradient-story` e `--unv-gradient-live` (roxo → azul-marca, por tema; o de live parte do `danger`), `--unv-gradient-livebadge` (invariante, texto branco ≥ 4,5:1 nas duas pontas).
- **Contraste medido, nos dois temas**: texto ≥ 4,5:1 e gráfico ≥ 3:1 em todos os pares de uso real (36 pares; a tabela está em `Unoovista/Fundamentos/Cores`). Todo limite de componente (contorno de campo, de busca, de balão e anel "visto") usa `--unv-color-border-control` ou `--unv-color-highlight-ring`, ambos ≥ 3:1 sobre a tela. Não há ressalva de contraste aberta.
- **Tipografia**: Open Sans via `--unv-font-sans`; escala de **14 estilos** nos degraus da Unooria (10, 12, 14, 16, 18 e 20px) com as alturas de linha da Unooria (14, 18, 20, 24, 28 e 30px); pesos 400/500/600/700. **Sem `letter-spacing`**: as variáveis `-tracking` valem `0px` só para que nenhum componente invente um valor. Nenhum corpo abaixo de 12px, exceto o selo LIVE (10px).
- **Medidas**: escala `--unv-spacing-4xs` (2px) a `--unv-spacing-4xl` (48px), calha `--unv-gutter` (16px), raios `--unv-radius-xs|s|m|l|xl|full` (4/8/12/16/24/1000px), dimensões estruturais de tela (375×812), avatares (20/24/32/56/80px) e ícones `--unv-icon-size-sm|md|lg` (16/24/32px, degraus de `--unooria-icon-size-*`). Alvo mínimo de toque `--unv-touch-target` (44px).
- **Token composto com `var()` se declara em todo `[data-unv-theme]`, nunca só em `:root`.** Uma propriedade personalizada cujo valor usa `var(--unv-color-…)` é resolvida NO elemento em que é declarada. Os gradientes de anel e os fios de 1px (`--unv-elevation-hairline-*`, `-bar-*`, `-drawer`) declarados apenas em `:root` congelavam os valores do tema claro e os herdavam já calculados para dentro de um contêiner escuro: no primeiro build o fio entre conversas saiu lavanda forte no tema escuro, e o gradiente do anel de story usava as paradas do claro — nenhum teste acusou, só a inspeção visual (medido em 2026-09-29). Por isso `colors.css` e `spacing.css` repetem esses blocos em `:root, [data-unv-theme]`.
- **Elevação**: a superfície é plana e se organiza por camadas. A única sombra é **`--unv-elevation-overlay`**, definida por tema (`--unooria-elevation-brand-secondary` no claro, `--unooria-elevation-neutral-2` no escuro), aplicada **apenas** à doca de navegação, a menus, diálogos, folhas, avisos, ao botão flutuante e à pílula de ações da publicação. Os fios são de 1px (`--unv-elevation-hairline-*` e `-bar-*`).


### 2.10. Tokens do UnooriaAI (`src/unooriaai/tokens/`)
Todo componente, estilo ou documentação do UnooriaAI **DEVE** consumir exclusivamente as variáveis `--uai-*`. Como o Unoochat e o Unoovista, o UnooriaAI **não tem arquivo de design de origem**: a identidade é a da **Plataforma Unooria** — paleta roxa, Open Sans e Material Symbols — e cada token de cor, de tipografia e de elevação é uma **cópia literal** do valor da plataforma, com o nome do token de origem no comentário da linha. **O módulo nunca lê `--unooria-*` em tempo de execução** (seção 1.3): `scripts/verificar-paridade-unooriaai.mjs` (encadeado no `build:package`) reprova o build se um literal divergir da origem ou se o token citado deixar de existir. `colors.css` e `colors.ts` saem da mesma tabela, então não divergem entre si.

- **Dois temas, ambos medidos sobre a escala `brandpurple`**: `:root, [data-uai-theme='light']` e `[data-uai-theme='dark']`. Claro: superfícies em branco e lavanda, acento `brandpurple-600` (`#716C98`). Escuro: superfícies em `brandpurple-900`, `-950` e `-800`, acento `brandpurple-400` (`#AAA5C2`). **É PROIBIDO derivar um tema por cálculo** (inverter, clarear, `color-mix`, opacidade calculada): cada valor de cada tema é um degrau nomeado da Unooria. **Não há primitivas de cor no CSS** — os componentes só consomem semânticos.
- **Superfícies**: `--uai-bg-primary|secondary|tertiary|inverse|inverse-hover|brand`. **Texto**: `--uai-text-primary|secondary|tertiary|inverse|brand|link`. **Bordas**: `--uai-border-default|strong|brand|control`; o contorno de campo e de controle usa `-control`, que passa de 3:1. **Ações e estados**: `--uai-interactive-*`, `--uai-status-success|error|warning|info` (mais `-error-hover`) e `--uai-fill-brand|success|error|warning|info` (preenchimento do selo, em opacidade nomeada da Unooria, nunca `color-mix`).
- **Escadas translúcidas**: `--uai-fill-2|4|8|10` e `--uai-text-soft-30|40|50|60|70|80` usam os tokens `--unooria-color-opacity-*` (tinta `brandpurple` no claro, `neutrallight` no escuro). Onde dois degraus caem no mesmo token de origem (`text-soft-40` e `-50` no claro; `-40`, `-50` e `-60` no escuro), isso é decisão de contraste, documentada no cabeçalho de `colors.css`.
- **Superfícies do cliente web** (`--uai-web-*`): `canvas`, `suggestion`, `composer-fill`, `composer-border`, `composer-placeholder`, `veil`, `hairline` e `accent`, também literais da Unooria. A cápsula de plano (`--uai-color-plan-tag-fill|text`) **varia com o tema**: `brandpurple-600` com rótulo `neutral-50` no claro, `brandpurple-400` com rótulo `brandpurple-950` no escuro.
- **Contraste medido, nos dois temas**: texto ≥ 4,5:1 e gráfico ≥ 3:1 em **85 pares de uso real** (menor razão de texto 4,62:1 no claro e 4,84:1 no escuro; menor razão gráfica 4,02:1 e 4,80:1). A tabela é o export `uaiContrastPairs` de `colors.ts` e aparece em `UnooriaAI/Fundamentos/Cores`; o script que a gera recusa gravar se algum par ficar abaixo do mínimo. **Ressalva de uso**: o selo `info` do `Badge` sobre `--uai-bg-tertiary` mede 4,4:1 no claro e 4,2:1 no escuro e **não deve ser usado nessa camada**; sobre a superfície primária e a secundária todos os selos passam. `error`, `success` e `warning` passam também sobre a terciária. O texto desabilitado (`text-soft-30`) é isento pela WCAG e fica fora da tabela.
- **Tokens compostos com `var()` se declaram em todo `[data-uai-theme]`, nunca só em `:root`** (a lição da seção 2.9): vale para `--uai-elevation-hairline-*`.
- **Tipografia**: Open Sans via `--uai-font-sans` e Material Symbols via `--uai-icon-font-family`; escala de **13 estilos** (`--uai-font-display-xl|lg-*`, `heading-h1|h2|h3-*`, `body-lg|md|sm|xs-*`, `label-*`, `caption-*`) nos degraus e alturas de linha da Unooria (12, 14, 16, 18, 24, 34, 48 e 60px), pesos 400/500/600/700, cada estilo citando o `--unooria-size-*` de origem. **Sem `letter-spacing`**: as variáveis `-tracking` valem `0px` só para que nenhum componente invente um valor.
- **Medidas**: escala `--uai-spacing-*` em grade de 4px (com os degraus finos de 2px e 6px), raios `--uai-radius-*` e dimensões estruturais (`--uai-size-icon-*`, `-avatar-*`, `-button-*`, `-sidebar`, `-input-height`) são **próprias do módulo**, definidas pela estrutura de componentes do módulo para que os layouts não se desloquem; só `--uai-size-icon-*` cita origem na Unooria (`--unooria-icon-size-*`).
- **Elevação**: a superfície é plana. **`--uai-elevation-overlay`**, **`-modal`** e **`-knob`** são definidas por tema (`--unooria-elevation-brand-secondary` no claro; `--unooria-elevation-neutral-2` e `-1` no escuro) e se aplicam **apenas** a sobreposições (diálogo, botão deslizante do `Toggle`). Os degraus `sm|md|lg|xl` e os overlays pretos e brancos da origem estrutural **não existem** aqui. Véu de diálogo: `--uai-overlay-scrim`.

### 2.11. Tokens da Unoogaleria (`src/unoogaleria/tokens/`)
Todo componente, estilo ou documentação da Unoogaleria **DEVE** consumir exclusivamente as variáveis `--ugl-*`. Como o Unoochat, o Unoovista e o UnooriaAI, a Unoogaleria **não tem arquivo de design de origem**: a identidade é a da **Plataforma Unooria** — paleta roxa, Open Sans e Material Symbols — e cada token de cor, de tipografia, de tamanho de ícone e de desfoque é uma **cópia literal** do valor da plataforma, com o nome do token de origem no comentário da linha. **O módulo nunca lê `--unooria-*` em tempo de execução** (seção 1.3): `scripts/verificar-paridade-unoogaleria.mjs` (encadeado no `build:package`) reprova o build se um literal divergir da origem ou se o token citado deixar de existir. `colors.css` e `colors.ts` saem da mesma tabela, e `typography.css` e `typography.ts` também.

- **Dois temas, ambos sobre a escala `brandpurple`**: `:root, [data-ugl-theme='light']` e `[data-ugl-theme='dark']`. Claro: telas em branco e lavanda, acento `brandpurple-600` (`#716C98`). Escuro: telas em `brandpurple-900`/`-950`, acento `brandpurple-400` (`#AAA5C2`). **É PROIBIDO derivar um tema por cálculo**.
- **Superfície imersiva invariante**: o visualizador e o editor vivem em `--ugl-color-immersive-*` (`brandpurple-950` com barras em `opacity-brandpurple-700`, texto `neutral-50`, acento `brandpurple-400`, favorito e exclusão em `danger-400`) **nos dois temas**, porque fotografia se vê sobre fundo escuro. A mídia (`--ugl-color-media-*`: cápsula da duração, véu da seleção, texto sobre miniatura) e o aparelho do mockup (`--ugl-color-device-*`) também são invariantes.
- **Grupos**: superfícies (`--ugl-color-background-primary|secondary|tertiary|elevated`, `--ugl-color-surface-bar` translúcida), texto (`-text-primary|secondary|placeholder|accent|on-action|danger|on-danger`), ícones (`-icon-primary|secondary|accent`), bordas (`-border-subtle|default|control`), ações (`-action-primary|pressed|disabled|danger`, `-fill-field`, `-state-hover|pressed`, `-focus-ring`), marca (`-brand-favorite`, `-status-success|warning`), overlays (`-overlay-scrim`, `-toast-surface|text|action` em cores invertidas) e `--ugl-elevation-overlay` (por tema).
- **Contraste medido, nos dois temas**: 53 pares de uso real (texto ≥ 4,5:1, gráfico ≥ 3:1), inclusive a cápsula de duração sobre uma **foto branca** (pior caso) e a trilha vazia do deslizador sobre a superfície imersiva. Menor razão de texto: 4,74:1 no claro e 4,86:1 no escuro. A tabela é o export `uglContrastPairs` e aparece em `Unoogaleria/Fundamentos/Cores`; o gerador recusa gravar se algum par ficar abaixo do mínimo. O texto destrutivo do claro é `danger-700`: o `danger-600` media 4,41:1 sobre a lavanda.
- **Tokens compostos com `var()` se declaram em todo `[data-ugl-theme]`** (a lição da seção 2.9): vale para os gradientes de mídia e para os fios `--ugl-elevation-hairline-*`.
- **Tipografia**: Open Sans via `--ugl-font-sans`; escala de **10 estilos** (`display`, `heading`, `title-lg|md|sm`, `label`, `body-lg|md`, `caption-strong`, `caption`) nos degraus de área de trabalho da Unooria (34, 24, 20, 18, 16, 14 e 12px), cada um citando o `--unooria-size-*` de origem. **Sem `letter-spacing`** e nenhum corpo abaixo de 12px.
- **Medidas**: escala `--ugl-spacing-4xs` (2px) a `--ugl-spacing-4xl` (48px), calha `--ugl-gutter` (16px), `--ugl-grid-gap` (2px entre miniaturas), raios `--ugl-radius-xs` a `-full`, tela de 390×844, barras (`--ugl-statusbar-height` 47px, `--ugl-home-indicator-height` 34px, `--ugl-topbar-height` 44px, `--ugl-tabbar-height` 50px), `--ugl-touch-target` (44px), ícones `--ugl-icon-size-xs|sm|md|lg|xl` (16/20/24/32/48px, degraus de `--unooria-icon-size-*`), `--ugl-blur-bar` (16px, `--unooria-blur-400`), movimento e **camadas** `--ugl-z-bar|viewer|sheet|dialog|toast|statusbar`.
- **Áreas seguras**: `--ugl-safe-area-top` e `--ugl-safe-area-bottom` valem 0 fora do aparelho; o `PhoneFrame` as redefine na tela (47px e 34px) e toda barra, folha e visualizador as soma ao próprio recuo. É o que faz o conteúdo correr por baixo da barra de status e da barra de gesto.

### 2.12. Tokens do Unoojornal (`src/unoojornal/tokens/`)
Todo componente, estilo ou documentação do Unoojornal **DEVE** consumir exclusivamente as variáveis `--ujn-*`. Como o Unoochat, o Unoovista, o UnooriaAI e a Unoogaleria, o Unoojornal é derivado da **Plataforma Unooria** — paleta roxa, Open Sans e Material Symbols —, e cada token de cor, de tipografia, de tamanho de ícone e de elevação é uma **cópia literal** do valor da plataforma, com o nome do token de origem no comentário da linha. A **estrutura editorial** vem do arquivo Figma "Jornal da Escola" (seção 15.1), mas **nenhuma cor nem fonte do arquivo entra**: o dourado virou o acento roxo e a serifa virou Open Sans. **O módulo nunca lê `--unooria-*` em tempo de execução** (seção 1.3): `scripts/verificar-paridade-unoojornal.mjs` (encadeado no `build:package`) reprova o build se um literal divergir da origem. `colors.css` e `colors.ts`, `typography.css` e `typography.ts` saem de `scripts/gerar-tokens-unoojornal.mjs` (`npm run gerar:tokens-unoojornal`), sobre o motor compartilhado `scripts/lib/gerar-tokens-marca.mjs`, que lê os literais da Unooria e **recusa gravar** se algum par de contraste ficar abaixo do mínimo.

- **Dois temas, ambos sobre a escala `brandpurple`**: `:root, [data-ujn-theme='light']` e `[data-ujn-theme='dark']`. Claro: página em lavanda (`brandpurple-50`), cartões em branco, acento `brandpurple-600` (`#716C98`). Escuro: página em `brandpurple-950`, cartões em `-900`, acento `brandpurple-400` (`#AAA5C2`). **É PROIBIDO derivar um tema por cálculo**: o arquivo de design só publica o claro, e o escuro é legítimo porque cada valor é um degrau nomeado da Unooria.
- **Camadas «papel → cartão → sutil»**: `--ujn-color-background-page` (o papel, atrás das colunas), `-card` (cartões, caixas laterais e a coluna de leitura), `-subtle` (tarja de data, mídia ainda não carregada, blocos sutis) e `-elevated` (menus, folhas e diálogos), mais `--ujn-color-surface-bar` (barra translúcida do leitor). A separação é por camada e por fio de 1px, nunca por sombra.
- **Texto** (`--ujn-color-text-primary|secondary|muted|accent|on-action|danger|on-danger`), **ícones** (`-icon-primary|secondary|accent`), **bordas** (`-border-subtle|default|rule|control`) e **ações** (`-action-primary|pressed|disabled|danger`, `-fill-field`, `-state-hover|pressed`, `-focus-ring`). **O limite de um controle (contorno do botão secundário, da pílula de filtro, do `IconButton` outline e de campo) usa `--ujn-color-border-control`**, que passa de 3:1 sobre a página; `-border-default` só serve a superfícies e a controles desabilitados.
- **A tinta do jornal**: `--ujn-color-border-rule` (`brandpurple-900` no claro, `-200` no escuro) pinta o fio grosso e o **fio duplo** do cabeçalho; o fio duplo é o gradiente composto `--ujn-gradient-rule-double` (3px, vão de 2px, 1px). É a marca visual do módulo e **não pode ser trocada por sombra**.
- **Invariantes entre temas**: o **rodapé escuro** (`--ujn-color-footer-surface|text|text-secondary|accent|border`, `brandpurple-900`), a mídia (`--ujn-color-media-scrim|text`, texto sempre branco sobre fotografia) e o aparelho do mockup (`--ujn-color-device-*`, inclusive a barra do navegador do `DesktopFrame`).
- **Status** (`--ujn-color-status-live|warning`), **overlays** (`--ujn-color-overlay-scrim`, `-toast-surface|text|action`) e `--ujn-elevation-overlay`, por tema.
- **Contraste medido, nos dois temas**: 54 pares de uso real (texto ≥ 4,5:1, gráfico ≥ 3:1), inclusive a legenda sobre uma **foto branca** (pior caso). Menor razão de texto: 4,74:1 no claro e 4,86:1 no escuro; menor razão gráfica: 4,54:1 e 4,80:1. A tabela é o export `ujnContrastPairs` de `colors.ts` e aparece em `Unoojornal/Fundamentos/Cores`.
- **Tokens compostos com `var()` se declaram em todo `[data-ujn-theme]`**, nunca só em `:root` (a lição da seção 2.9): vale para `--ujn-gradient-*` e `--ujn-elevation-hairline-*`.
- **Tipografia**: Open Sans via `--ujn-font-sans` e Material Symbols via `--ujn-icon-font-family`; escala de **14 estilos** (`masthead` 60/78, `headline-xl`, `headline`, `title-lg|md`, `deck`, `body-lg|md|sm`, `quote` em itálico, `label-lg|label`, `kicker` em caixa alta, `caption`) nos degraus de área de trabalho da Unooria (12, 14, 16, 18, 20, 24, 34, 48 e 60px), cada um citando o `--unooria-size-*` de origem. **Sem `letter-spacing`** e nenhum corpo abaixo de 12px. Não entra serifa.
- **Medidas**: escala `--ujn-spacing-4xs` (2px) a `-5xl` (64px), calhas `--ujn-gutter` (16px) e `-gutter-wide` (80px), raios `--ujn-radius-xs|s|m|l|full` (2/4/8/12/1000px — o jornal é reto), página `--ujn-page-width` (1280px), coluna de leitura `--ujn-reading-width` (740px), barra lateral `--ujn-sidebar-width` (384px), `--ujn-touch-target` (44px), ícones `--ujn-icon-size-xs|sm|md|lg` (16/20/24/32px, degraus de `--unooria-icon-size-*`) e **camadas** `--ujn-z-*`. **Pontos de quebra são de contêiner** (`@container`: largo ≥ 960px, médio ≥ 640px, compacto abaixo), porque o jornal aparece em quadros de documentação mais estreitos que a janela.
- **Áreas seguras**: `--ujn-safe-area-top` e `--ujn-safe-area-bottom` valem 0 fora do aparelho; o `PhoneFrame` as redefine na tela e toda barra, folha e o leitor as somam ao próprio recuo.

### 2.13. Tokens do Unooblog (`src/unooblog/tokens/`)
Todo componente, estilo ou documentação do Unooblog **DEVE** consumir exclusivamente as variáveis `--ubl-*`. Como o Unoojornal, o Unooblog **não tem arquivo de design de origem**: a identidade é a da **Plataforma Unooria** — paleta roxa, Open Sans e Material Symbols — e a **composição é própria** (seção 16.1). Cada token de cor, de tipografia, de tamanho de ícone, de desfoque e de elevação é uma **cópia literal** do valor da plataforma, com o nome do token de origem no comentário da linha. **O módulo nunca lê `--unooria-*` em tempo de execução** (seção 1.3): `scripts/verificar-paridade-unooblog.mjs` (encadeado no `build:package`) reprova o build se um literal divergir da origem. `colors.css` e `colors.ts`, `typography.css` e `typography.ts` saem de `scripts/gerar-tokens-unooblog.mjs` (`npm run gerar:tokens-unooblog`), sobre o motor compartilhado `scripts/lib/gerar-tokens-marca.mjs`, que lê os literais da Unooria e **recusa gravar** se algum par de contraste ficar abaixo do mínimo.

- **Dois temas, ambos sobre a escala `brandpurple`**: `:root, [data-ubl-theme='light']` e `[data-ubl-theme='dark']`. Claro: página **branca** (`neutral-50`), cartões em lavanda (`brandpurple-50`), acento `brandpurple-600` (`#716C98`). Escuro: página em `brandpurple-950`, cartões em `-900`, acento `brandpurple-400` (`#AAA5C2`). **É PROIBIDO derivar um tema por cálculo.**
- **Camadas «página → cartão → sutil»**: `--ubl-color-background-page`, `-card`, `-subtle` e `-elevated`, mais `--ubl-color-surface-bar` (cabeçalho translúcido). É o **inverso do jornal** (papel lavanda, cartões brancos). No escuro, `-subtle`, `-elevated` e `--ubl-color-fill-field` coincidem em `brandpurple-800`: a distinção vem do halo de `--ubl-elevation-overlay`.
- **Texto** (`--ubl-color-text-primary|secondary|muted|accent|on-action|danger|on-danger`), **ícones** (`-icon-primary|secondary|accent`), **bordas** (`-border-subtle|default|control`) e **ações** (`-action-primary|pressed|disabled|danger`, `-fill-field`, `-state-hover|pressed`, `-focus-ring`). **O limite de um controle usa `--ubl-color-border-control`** (≥ 3:1); `-border-default` só serve a superfícies e a controles desabilitados.
- **Marca e status**: `--ubl-color-brand-like` (coração de curtida) e os tons dos avisos, `-status-info|success|warning` (barra e glifo) com fundos translúcidos **nomeados**, `-fill-info|success|warning` (`opacity-*-100` da Unooria, nunca `color-mix`).
- **Invariantes entre temas**: o **código** (`--ubl-color-code-surface|text|text-muted|accent|border|control`, `brandpurple-950`) — vive sobre fundo escuro nos dois temas —, a mídia (`--ubl-color-media-scrim|text`, texto sempre branco sobre a capa) e o aparelho do mockup (`--ubl-color-device-*`).
- **Contraste medido, nos dois temas**: 60 pares de uso real (texto ≥ 4,5:1, gráfico ≥ 3:1), inclusive o título sobre uma **capa branca** (pior caso). Menor razão de texto: 4,74:1 no claro e 4,86:1 no escuro; menor razão gráfica: 4,39:1 e 4,07:1. A tabela é o export `ublContrastPairs` e aparece em `Unooblog/Fundamentos/Cores`.
- **Tokens compostos com `var()` se declaram em todo `[data-ubl-theme]`**, nunca só em `:root` (a lição da seção 2.9): `--ubl-gradient-media-bottom` e `--ubl-elevation-hairline-*`.
- **Tipografia**: Open Sans via `--ubl-font-sans`, Material Symbols via `--ubl-icon-font-family` e **pilha monoespaçada do sistema** via `--ubl-font-mono` (a Unooria não publica fonte monoespaçada; é a única família sem origem na plataforma e não traz arquivo de fonte). Escala de **15 estilos** (`display` 60/78, `heading-1|2|3|4`, `lead`, `prose` 18/28, `body-lg|md`, `quote` em itálico, `label-lg|label`, `caption`, `caption-strong`, `code`) nos degraus de área de trabalho da Unooria, cada um citando o `--unooria-size-*` de origem. **Sem `letter-spacing`** e nenhum corpo abaixo de 12px. Não entra serifa.
- **Medidas**: escala `--ubl-spacing-4xs` (2px) a `-5xl` (64px), calhas `--ubl-gutter` (16px) e `-gutter-wide` (48px), **raios macios** `--ubl-radius-xs|s|m|l|xl|full` (4/8/12/16/24/1000px), página `--ubl-page-width` (1120px), **coluna de leitura** `--ubl-reading-width` (680px, ~68 caracteres), sumário `--ubl-toc-width` (240px), barra lateral `--ubl-sidebar-width` (320px), cabeçalho `--ubl-site-header-height` (64px), progresso `--ubl-progress-height` (3px), `--ubl-touch-target` (44px), ícones `--ubl-icon-size-xs|sm|md|lg` (16/20/24/32px), avatares `--ubl-avatar-sm|md|lg|xl` (24/32/48/72px), desfoque `--ubl-blur-bar` (16px, `--unooria-blur-400`) e **camadas** `--ubl-z-*`. **Pontos de quebra são de contêiner** (`@container`: largo ≥ 960px, médio ≥ 640px, compacto abaixo).
- **Elevação**: a superfície é plana; `--ubl-elevation-overlay`, por tema (`--unooria-elevation-brand-secondary` no claro, `-neutral-2` no escuro), se aplica **apenas** a menus, diálogos, folhas e avisos.
- **Áreas seguras**: `--ubl-safe-area-top` e `--ubl-safe-area-bottom` valem 0 fora do aparelho; o `PhoneFrame` as redefine na tela.

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
- **Diálogo composto se nomeia sozinho.** Todo componente com `role="dialog"` que oferece subcomponente de título (`Modal.Title` na Plataforma Unooria, `Modal.Header` no ChatGPT, no Unootube e no UnooriaAI) liga `aria-labelledby` a ele automaticamente — na composição manual E pelo atalho `title` —, e `Modal.Description` a `aria-describedby`. O título se anuncia ao diálogo pelo contexto, com o id que de fato renderizou (o `id` passado, ou o de `useId`). Precedência: `aria-labelledby` explícito manda; com `aria-label` explícito o diálogo **não** recebe `aria-labelledby`, que venceria o `aria-label` no cálculo do nome e o calaria sem aviso. Medido em 25/09/2026, na 0.2.2: o composto saía sem nome, o leitor de tela anunciava só "diálogo" e `getByRole('dialog', { name })` não achava nada — eram 34 diálogos assim no monorepo consumidor. As estórias com `play` de cada `Modal` guardam a regra.

### 4.4. Iconografia Derivada do Figma
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou substituído por outra biblioteca de ícones. Todo dado vetorial é o **export SVG literal do nó do Figma**, com o `viewBox` original preservado — **não normalizado para 24×24**.
- Cada marca com biblioteca vetorial mantém o próprio registro, e é nele que o dado literal vive:
  - **Instanooria**: `src/instanooria/components/Icon/IconPaths.tsx` (`instaIcons`), mais o logotipo em `Logo/LogoVector.ts` e os glifos de sistema do iPhone X em `PhoneFrame/DeviceGlyphs.tsx`.
  - **WhatsApp Mobile**: `src/whatsappmobile/components/Icon/IconPaths.tsx` (`waIcons`).
  - **Tik Tooria**: `src/tiktooria/components/Icon/IconPaths.tsx` (`tikIcons`), mais os logotipos de terceiros em `SocialLogo/LogoVectors.ts`.
  - **Unoovista**: **não tem dado vetorial próprio** — usa a biblioteca da Plataforma Unooria (Material Symbols Rounded, por ligadura), registrada em `src/unoovista/components/Icon/IconGlyphs.ts` (ver seção 12.4). O logotipo é marca original, em contornos de Open Sans Bold.
  - **Unoochat**: **não tem dado vetorial próprio** — usa a biblioteca da Plataforma Unooria (Material Symbols Rounded, por ligadura), registrada em `src/unoochat/components/Icon/IconGlyphs.ts` (ver seção 11.4).
  - **UnooriaAI**: **não tem dado vetorial próprio** — usa a biblioteca da Plataforma Unooria (Material Symbols Rounded, por ligadura), registrada em `src/unooriaai/components/Icon/IconGlyphs.ts` (ver seção 13.4). O logotipo é marca original, em contornos de Open Sans Bold.
  - **Unoogaleria**: **não tem dado vetorial próprio** — usa a biblioteca da Plataforma Unooria (Material Symbols Rounded, por ligadura), registrada em `src/unoogaleria/components/Icon/IconGlyphs.ts` (ver seção 14.4).
  - **Unoojornal**: **não tem dado vetorial próprio** — usa a biblioteca da Plataforma Unooria (Material Symbols Rounded, por ligadura), registrada em `src/unoojornal/components/Icon/IconGlyphs.ts` (ver seção 15.4). O logotipo é marca original, em contornos de Open Sans Bold.
  - **Unooblog**: **não tem dado vetorial próprio** — usa a biblioteca da Plataforma Unooria (Material Symbols Rounded, por ligadura), registrada em `src/unooblog/components/Icon/IconGlyphs.ts` (ver seção 16.4). O logotipo é marca original, em contornos de Open Sans Bold.
  - **ChatGPT**: **não tem biblioteca vetorial** — o arquivo de origem usa caracteres tipográficos, registrados em `src/chatgpt/tokens/glyphs.ts` (ver seção 7.4).
- Ao adicionar um glifo novo, exporte o SVG do Figma, copie os atributos (`d`, `cx/cy/r`, `x/y/width/height`) **sem edição** e preencha `figmaName`, `viewBox` e `usage` — mais `figmaNode` nos registros que o preveem.
- Quando o arquivo reaproveita o mesmo vetor girado ou espelhado, use as props `rotate` / `flipX` / `flipY` em vez de duplicar o caminho com coordenadas reescritas.
- Quando um glifo combina dois nós posicionados em coordenadas diferentes, aplique o deslocamento via `transform="translate(…)"` — **jamais** reescrevendo as coordenadas do caminho.
- Glifos que o Figma exporta vazios **não devem ser registrados nem desenhados**; o desvio é declarado na estória correspondente.

---

## 4.5. Emissão do Pacote e Fronteira Cliente/Servidor

O pacote é emitido **sem bundling**: um arquivo de saída por arquivo de origem (`bundle: false` em `tsup.config.ts`), preservando o grafo de módulos.

- **`'use client'` vale por arquivo.** O esbuild descarta silenciosamente a diretiva de qualquer módulo que não seja entry point; com bundle único, só a do topo de `src/index.ts` sobrevivia e marcava o pacote inteiro como client. **É PROIBIDO declarar `'use client'` em `src/index.ts`** ou nos barris de marca — isso anularia todos os componentes que hoje rodam como Server Components (**112 dos 211** na última medição, em 25/09/2026, sobre a 0.2.4 com as extensões do Instanooria: 2/40 na Plataforma Unooria, 12/28 no Instanooria, 21/25 no ChatGPT, 20/39 no WhatsApp Mobile, 32/35 no Tik Tooria e 25/44 no Unootube, 12/31 no Unoovista; a Unoogaleria, medida em 30/09/2026 sobre a 0.2.8, tem 8/32 — a galeria é interativa por natureza; o Unoojornal, medido na mesma data sobre a 0.2.9, tem 21/43; o Unooblog, 19/45). Para recontar depois de um `npm run build:package`:
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

### 4.5.1. Campo de entrada só é controlado quando o consumidor pede

**Nenhum componente de entrada passa `value` ao elemento nativo sem que o
consumidor tenha passado `value`.** Sem `value`, quem guarda o texto é o DOM, e
o que vai ao elemento é `defaultValue`. A forma é esta, e não outra:

```tsx
{...(isControlled ? { value: value as string } : { defaultValue })}
```

**O que custou descobrir (medido em 11/09/2026, na 0.2.1).** `TextField` e
`TextArea` faziam `value={currentValue}` sempre, com `currentValue` caindo num
estado interno que só o `onChange` do React alimenta. Toda escrita que não
passa por evento do React — o preenchimento automático do navegador e qualquer
gerenciador de senhas — ficava invisível para esse estado, e a **primeira
re-renderização reconciliava o campo de volta para `''`**.

Reproduzido na tela `/entrar` do LMS: senha injetada no DOM, um clique em
"Exibir senha", e o `FormData` do formulário já ia com `senha` vazia. O sintoma
que chega ao suporte não é um aviso no console — é "minha senha salva não
funciona", e a pessoa jura que digitou certo. O aviso intermitente de
descasamento de hidratação era a ponta visível do mesmo defeito.

**Vale para todo campo**: `TextField`, `TextArea`, e por herança
`PasswordInput` e `SearchInput`. Um campo que perde texto é pior que um campo
feio, e o modo de falhar é silencioso.

O estado interno continua existindo, para o botão "limpar" e para o contador de
caracteres. Ele pode ficar defasado quando o preenchimento vem sem evento — é
aceitável: o custo é um botão que demora a aparecer, não um texto que some. Em
modo não controlado, **limpar escreve no nó do DOM** (`ref` interna casada com
a que vem de fora), porque não há mais estado que comande o campo.

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

- **`--uni-*`, `--gpt-*`, `--wa-*`, `--tik-*`, `--unc-*`, `--unv-*`, `--uai-*`, `--ugl-*`, `--ujn-*`, `--ubl-*` e `--unooria-*` têm folha de
  fonte.** O Instanooria não: usa SF Pro, fonte de sistema da Apple.
- **A Plataforma Unooria e o Unoochat são os casos críticos.** O Unoochat usa a mesma fonte de ligadura (Material Symbols Rounded, 5,1 MB) — os `.woff2` não são duplicados (`src/fonts/material-symbols-rounded/` é compartilhado).
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
1. Validar que **todos os estilos e cores consomem as variáveis CSS do módulo correspondente** (`src/unooria/tokens/` para a Plataforma Unooria, `src/instanooria/tokens/` para o Instanooria, `src/chatgpt/tokens/` para o ChatGPT, `src/whatsappmobile/tokens/` para o WhatsApp Mobile, `src/tiktooria/tokens/` para o Tik Tooria, `src/unootube/tokens/` para o Unootube, `src/unoochat/tokens/` para o Unoochat, `src/unoovista/tokens/` para o Unoovista, `src/unooriaai/tokens/` para o UnooriaAI, `src/unoogaleria/tokens/` para a Unoogaleria, `src/unoojornal/tokens/` para o Unoojornal, `src/unooblog/tokens/` para o Unooblog), sem hexadecimais avulsos e sem mistura entre marcas.
2. Executar `npx tsc --noEmit` e garantir **0 erros de compilação TypeScript**.
3. Executar `node scripts/verificar-css-agregado.mjs` e garantir que **todo CSS de token e de componente está nas folhas agregadas** publicadas (`src/styles.css`, `src/styles-unooria.css`, `src/styles-instanooria.css`, `src/styles-chatgpt.css`, `src/styles-whatsappmobile.css`, `src/styles-tiktooria.css`, `src/styles-unootube.css`, `src/styles-unoochat.css`, `src/styles-unoovista.css`, `src/styles-unooriaai.css`, `src/styles-unoogaleria.css`, `src/styles-unoojornal.css`, `src/styles-unooblog.css`).
4. Executar `npm run build-storybook` e validar o **build sem falhas do Storybook**.
5. Executar `npm run lint` e garantir **0 erros e 0 warnings**.
6. Executar `npm test` e garantir que **todas as estórias renderizam** — a suíte Vitest monta cada estória em um Chromium real.
7. Ao tocar no Unoochat, executar `npm run verificar:paridade-unoochat`; ao tocar no Unoovista, `npm run verificar:paridade-unoovista`; ao tocar no UnooriaAI, `npm run verificar:paridade-unooriaai`; ao tocar na Unoogaleria, `npm run verificar:paridade-unoogaleria`; ao tocar no Unoojornal, `npm run verificar:paridade-unoojornal`; ao tocar no Unooblog, `npm run verificar:paridade-unooblog`. Garanta que todo literal com origem na Plataforma Unooria continua igual a ela.
8. Executar `npm run build:package` e garantir que o pacote é emitido sem falhas, com os tipos gerados pelo `tsc` (ver seção 4.5).

### 5.1. Registro de Desvios em Relação ao Figma (Plataforma Unooria)
Contraparte das seções 6.4, 7.6, 8.6, 9.6 e 10.6 para a seção `unooria`. Ela não existia: até 2026-09-11 as cinco marcas de clone tinham onde registrar desvio e a plataforma não, então divergência daqui não tinha lugar para morar. Qualquer divergência intencional em relação ao arquivo de design **DEVE** ser documentada na seção "Figma & Especificações Técnicas" da estória do componente, e a de consequência ampla, aqui. Desvios registrados até o momento, todos do quadro `buttons` (`Unooria_DS_v0.2`, node `5608-374`):

- **`Button` / nome da variante `ghost`**: o quadro a chama de **Subtle**. O código mantém `ghost`. `variant` é API pública e há 107 chamadas entre este repo e o monorepo consumidor — renomear quebraria todas sem mudar um pixel, e um alias criaria duas formas de dizer a mesma coisa num componente que aceita prop inventada em silêncio. O mapeamento vive no JSDoc de `ButtonVariant`.
- **`Button` / tema escuro**: o quadro só tem o tema claro. O escuro é **proposta por analogia**, marcada como tal em comentário no `Button.css`: unifica rótulo e borda num degrau, clareia um no hover e escurece um no pressed, com os lados trocados porque o fundo trocou. Pendente de validação.
- **`Button` / estado Focus**: não existe no quadro. Mantida a mecânica de hoje (contorno de 2px mais realce), adaptando apenas a cor-base das variantes que mudaram de degrau.
- **`Button` / rótulo um degrau mais escuro que o quadro, pela legibilidade** — **decidido, é o desvio central desta leva.** O quadro põe rótulo e borda no MESMO degrau (700 em repouso, 600 no hover); o rótulo ali mede 3,63:1 e 2,51:1, abaixo dos 4,5:1 que texto normal exige. Aqui os dois se separam: a **borda** clareia como o desenho pede e o **rótulo** fica em `brandnavy-800` (5,52:1), em `outline`, `ghost` e `light`. O gradiente da `ai` foi encurtado de seis paradas para três, terminando em `brandnavy-800` em vez de `brandnavy-300` — a ponta clara original media 1,56:1, e a última terça parte do rótulo ficava ilegível. A intenção visual do desenho se mantém; o que não acompanha é o texto.
- **`Button` / duas ressalvas que seguem abertas nas cores do próprio quadro**: a borda da `outline` em hover mede 2,51:1, abaixo dos 3:1 da WCAG 1.4.11 para contorno de componente; e o rótulo branco da `light` sobre o azul do hover mede 2,51:1 (no pressed sobe para 5,52:1). O desabilitado da `light` mede 1,28:1 — tecnicamente isento pela WCAG por ser componente inativo, na prática ilegível. Não corrigidas: mexem na cor de fundo que o quadro define, não só no rótulo. **Pendentes.**
- **`Button` / desabilitado sem o véu de opacidade**: as variantes que o quadro especificou com cor exata (`outline`, `ghost`, `light`, `ai`) anulam o `opacity: .7` da regra geral. As cores novas de desabilitado são mais escuras que as antigas, ou seja, o quadro pede mais contraste no estado — esmaecer por cima entregaria o contrário. As variantes ainda não decididas seguem com o `.7` herdado, e isto vira regra única quando o Filled for resolvido.
- **`Button` / raio de borda e altura**: o quadro usa raio de 12px e altura de 48px em todos os tamanhos; o componente mantém 8/10/12 e 36/44/52 por tamanho. São diferenças de **forma, não de cor**, e a frente que aplicou o quadro era de cor — mudá-las sem pedido seria alargar escopo. **Pendente, nomeada.**
- **`Button` / hover e pressed da variante `ai`**: no quadro, Default, Hover e Pressed são visualmente idênticos — só o Disabled muda, e um controle que não responde ao ponteiro nasce defeituoso. A variante ganhou o mesmo overlay discreto da `ghost`, no roxo dela (5% no hover, 10% no pressed). **Proposta, pendente de validação.**
- **`Button` / variante `primary` (Filled) — a linha LG É a intenção, e vale para todos os tamanhos**: o quadro traz, só na linha LG, Default `#080922` e Pressed `#0e1039` fixados à mão; as linhas MD/SM/XS seguem com as variáveis antigas porque o desenho **não foi propagado**, não porque discordem. Vale o cravado, em todos os tamanhos. Os dois hex batem com tokens que já existiam — `brandpurple-950` e `brandpurple-900` —, então o componente segue consumindo token, sem hex solto. Esta variante era o motivo do quadro existir: o azul anterior (`brandnavy-600`) é quase o mesmo tom do desabilitado novo (`rgba(127,165,226,.3)`), e o botão principal lia como desligado. O repouso é o extremo escuro da escala e o pressed clareia um degrau — não há para onde escurecer a partir do 950.
- **`Button` / o hover da `primary` no tema claro fica abaixo de WCAG AA**: o quadro mantém o hover em `brandnavy-600`, que com rótulo branco mede **2,51:1**. Como o repouso passou a medir 19,58:1, o botão despenca de 19,58 para 2,51 sob o ponteiro — o rótulo quase some no momento em que a pessoa mira nele. Implementado como o desenho manda; a correção de um degrau seria `brandpurple-800` (**11,37:1**), que preservaria o clareamento. **Pendente de decisão de design.** Repouso e pressed, por outro lado, passam folgado: 19,58:1 e 18,23:1.
- **`Button` / `primary` no tema escuro**: o quadro não traz o escuro, e aqui a cor do claro **não pode ser copiada** — `brandpurple-950` contra a superfície escura mede 1,30:1 e o botão desapareceria no fundo, uma versão pior do defeito que se conserta. Espelha-se a INTENÇÃO, não o valor: no claro o botão é o extremo escuro da escala roxa sobre fundo claro, no escuro é o extremo claro da mesma escala sobre fundo escuro, com o rótulo no tom da superfície. Repouso `brandpurple-300`, hover `200`, pressed `400` (9,32:1, 11,27:1 e 6,37:1). O desabilitado **não** recebe o `rgba(127,165,226,.3)` do quadro: composto sobre o fundo escuro daria 8,61:1 com rótulo branco, contraste de botão ativo — o defeito invertido. Fica a regra geral do tema.

- **`AudioPlayer` / o glifo de tocar**: o quadro de ícones (`6024:2923`) publica `pause` na categoria de áudio e vídeo, mas não `play_arrow`. O botão usa o `play_arrow` da MESMA biblioteca-base (Material Symbols Rounded, peso 300), pelo nome da ligadura — nada foi desenhado nem trazido de outra biblioteca. O componente é de design próprio (a seção não tem quadro de áudio): cartão do `Card`, trilha da `ProgressBar` `sm`, botão `primary` do pacote.
- **`TextField` e `TextArea` / o rótulo passou a nomear o campo** (0.2.6): o `<label>` não tinha `htmlFor`, então aparecia e não dava nome ao campo — o leitor de tela dizia "caixa de edição" sem nome, e clicar no rótulo não focava nada. Agora um `useId` liga os dois (o `id` do consumidor vence). É correção, não desvio; fica aqui porque muda o nome acessível de todo campo com `label`.
- **As peças da redação do Jornal da Escola (0.2.8) são design próprio**: `NewsCard`, `NewsArticle`, `RevealClue`, `BottomSheet`, `NewspaperPage`, `SpeechBubble`, `PuzzleBlock` e `PuzzleTrack`. A seção não tem quadro para jornal, gaveta nem quebra-cabeça; as medidas vêm do `Card` (fio 1px, raio 12/16px, recuo 16px), da `Tag` (faixas e marcadores), do `Button` (foco de 2px, raio de 12px) e do `Avatar` `sm`, e cada estória diz de qual. **Todo glifo está no quadro `6024:2923`**, conferido contra `scratch_figma_6024_2923.json`: o quadro não publica `radio`, `live_tv`, `push_pin`, `expand_more`, `draw` nem `undo`, e as peças usam os equivalentes que ele publica (`mic`, `connected_tv`, `keep`, `keyboard_arrow_down`, `history_edu`, `replay`). O vocabulário dos meios mora num lugar só, `NewsCard/NewsCard.medium.ts`.
- **Cada peça na seção da plataforma que ela imita.** A redação é da Unooria; a matéria original de um post de rede social é o `PostCard` do Instanooria e a de uma mensagem encaminhada é o `MessageBubble` do WhatsApp Mobile. Por isso `NewsArticle` aceita só seis meios (`NewsArticleMedium`), e não os oito do cartão.
- **Um só tom de cor para todos os meios**, no `NewsCard` e no `NewsArticle`: cor por meio seria lida pela criança como pista de confiabilidade (verde = verdadeira). O meio se reconhece pelo glifo e pelo rótulo.
- **`NewspaperPage` / tamanhos de texto literais e layout por contêiner**: os títulos usam `clamp()` com `cqi`, não os tokens `--unooria-size-*`, porque os tokens mudam de degrau pela largura da JANELA (768px) e a página se arranja pela largura do CONTÊINER — a miniatura do comparativo continua estreita numa tela larga. Pelo mesmo motivo a fala do `SpeechBubble` é 16px fixo: o token cairia para 14px justo no aparelho de 375px. **Desvio nomeado, pendente de token de tipografia por contêiner.** O `layout` é um conjunto fechado (`NEWSPAPER_LAYOUTS`) porque, na missão, uma IA escolhe entre eles e nunca mexe no texto.
- **`BottomSheet` / três diferenças do `Modal`**: o X tem 48px (o do `Modal`, 32px, é pensado para ponteiro, e a gaveta é para toque); o véu não tem o desfoque do `Modal` (`backdrop-filter` pesa no Chromebook de entrada); e no escuro o véu é `opacity-brandpurple-700`, porque o preto a 65% do `Modal` não existe como token. Não há gesto de arrastar: fechar é pelo X, pelo Esc ou pelo véu.
- **`RevealClue` e `PuzzleBlock` / alvo de 64px**, acima dos 52px do `Button` `lg`: são as peças que uma criança de 9 anos toca num tablet. O conteúdo da pista fechada leva `hidden` — nem focável nem lido —, a lição do `Collapse` que prendia 30 botões invisíveis no Tab do monorepo consumidor.
- **As peças do agente de IA do professor (0.2.10) são design próprio**: `AgentAvatar`, `ChatLauncher`, `ChatPanel` (com `ChatPanelAction`), `ChatMessage`, `ChatComposer`, `TypingIndicator`, `RichContent` (com `RichContentTable`) e `ChatHistory`. São da seção `unooria` por decisão do dono do produto — **não** do UnooriaAI nem do ChatGPT, que são clones e não se cruzam com a plataforma (seção 1.3). As medidas vêm do pacote (raio e sombra do `BottomSheet`, `Button` `ghost` `sm` quadrado nas ações, `TextArea` no compositor, `ScrollBar` no corpo e nas tabelas, `Badge` no selo, `EmptyState` no histórico vazio) e o nome visível e acessível é sempre "agente de IA do professor" — nunca "assistente", "guia" ou "chatbot". Nenhum token global novo: só custom properties locais `--unooria-chat-offset` (24px), `--unooria-chat-launcher-size` (64px) e `--unooria-chat-z-index` (1000, abaixo do véu do `Modal`), lidas com fallback para o produto poder trocá-las num ancestral.
- **`AgentAvatar` é componente, não variante do `Avatar`**: uma variante poria o base64 no módulo do `Avatar`, e toda tela com a foto de uma pessoa carregaria o mascote. Composto, o peso só vai para quem importa o agente. O bitmap embutido é a exceção da seção 1.2.
- **`ChatPanel` não é modal**: sem véu, sem prisão de foco, sem travar a rolagem; `role="complementary"` nomeado pelo título, Esc fecha só com o foco dentro (e respeita o `preventDefault` de um filho — a confirmação do `ChatHistory`). Fechado, fica montado com `hidden`, para o rascunho e a rolagem sobreviverem. O corpo desliga `overflow-anchor`: com a ancoragem do Chrome ligada, a fonte de ícones chegando corrigia o `scrollTop` e disparava `scroll` antes do ResizeObserver, e o painel concluía que a pessoa tinha saído do fim (medido em 30/09/2026: 60 px fora do fim logo ao abrir). E a âncora no fim roda também num efeito de layout a cada renderização, não só no ResizeObserver — que não dispara sem oportunidade de renderização (aba em segundo plano, iframe oculto do runner de testes).
- **`ChatMessage` não usa o `SpeechBubble` nem o `FeedbackAlert`**: o balão de fala põe a fala num `blockquote` com nome visível e humor (uma resposta com tabela dentro de citação é HTML errado), e o alerta tem 24px de recuo e `role="alert"`, que gritaria a cada resposta. O aviso da mensagem é uma faixa curta com `role="note"` e glifo `warning`. A resposta do agente é região viva educada com `aria-busy` enquanto transmite: o leitor lê a resposta uma vez, no fim.
- **`ChatComposer` / contador e glifo de parar**: o contador por frase do `TextArea` fica desligado (vira só a descrição do campo) e aparece "12/4.000"; numa conversa, a frase sempre visível pesaria mais que a mensagem. O quadro `6024:2923` não publica `stop`: o Parar usa `crop_square` preenchido. O resto dos glifos (`add_comment`, `history`, `open_in_full`, `close_fullscreen`, `close`, `send`, `arrow_downward`, `warning`, `menu_book`, `error`, `refresh`, `delete`) é do quadro.
- **`RichContent` não converte markdown nem usa `dangerouslySetInnerHTML`**: recebe os elementos prontos (no hub, a saída do react-markdown) e só dá a tipografia; quem sanitiza é quem converte. A tabela larga rola de lado pelo `RichContentTable` (que descarta o `node` do react-markdown); sem ele, a tabela fica na largura do texto — o `display` da `<table>` não é trocado, porque `display: block` apaga a semântica de tabela em alguns navegadores.
- **Nomes de prop em português onde o pedido os fixou** (`autor`, `estado`, `fontes`, `aviso`, `transmitindo`, `titulo`, `atualizadaEm`, os tamanhos `compacto`/`expandido`): são o vocabulário do contrato com o hub. As demais seguem o inglês da seção (`theme`, `size`, `open`, `onSend`, `onStop`, `onDelete`).
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

---

## 11. Design System Unoochat (Seção `Unoochat` do Storybook)

O **Unoochat** é o cliente de mensagens móvel da Plataforma Unooria com identidade própria: **paleta roxa, Open Sans e Material Symbols da Plataforma Unooria, em tema claro e escuro**. Foi criado em 2026-09-29 como **cópia estrutural** do módulo `src/whatsappmobile/` — mesmos 39 componentes, mesmas props, mesmas medidas de layout — com cores, tipografia e ícones trocados. **O módulo `src/whatsappmobile/` continua no repositório, intacto**, e as duas marcas coexistem: nenhuma edição de um deles se propaga ao outro (cada um tem tokens e classes exclusivos, seção 1.3).

### 11.1. Origem, Motivo e Regras
- **Origem**: não há arquivo Figma. A estrutura de componentes vem de `src/whatsappmobile/` (seção 8); a identidade vem da Plataforma Unooria (seção 2.8). Componentes que a origem já tinha continuam com o mesmo nome, as mesmas props e as mesmas medidas de layout.
- **Motivo**: o produto precisa de uma interface de mensageria que **não reproduza a identidade visual do aplicativo de terceiros** que serviu de referência ao módulo `whatsappmobile`. Por isso, **nas estórias, nos comentários e nos textos padrão do Unoochat é PROIBIDO citar** o aplicativo de origem, a empresa dele, o arquivo Figma comunitário ou seus nós, e usar o vocabulário de marca dele (o logotipo, o nome "WhatsApp", "Facebook", "Meta"). A referência à estrutura de `src/whatsappmobile/` vive **apenas** nesta seção e em 1.3.
- **Sem bitmap de terceiros**: as imagens de demonstração são ilustrações SVG geradas a partir da paleta da Unooria, em `public/unoochat/` (retratos, retrato de chamada, fotografia de exemplo e dois ladrilhos de 320px de textura de conversa, um por tema). Nenhuma foi exportada de arquivo de design alheio, e todas entram por prop (`src`, `avatarSrc`, `portraitSrc`). **Não copiar** `public/whatsappmobile/` para cá.
- **Idioma**: todo texto padrão de componente e de estória é pt-BR (o módulo de origem usava inglês). Nomes de demonstração são fictícios e vivem em `stories/unoochat/fixtures.ts`.

### 11.2. Títulos das Estórias
- **Fundamentos**: `Unoochat/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação | Ícones]`.
- **Componentes**: `Unoochat/Componentes/[NomeComponente]`.
- **Telas compostas**: `Unoochat/Telas/Telas Compostas`.

### 11.3. Componentes Oficiais (29) e Extensões (10)
Os mesmos da seção 8.3: `Icon`, `StatusBar`, `Avatar`, `Badge`, `TopBar`, `TabBar`, `ListItem`, `ChatListItem`, `StatusListItem`, `CallListItem`, `SectionLabel`, `Fab`, `ChatHeader`, `DateChip`, `EncryptionNotice`, `MessageBubble` (composto: `.Media`, `.Document`, `.LinkPreview`, `.Invite`), `MessageComposer`, `ChatWallpaper`, `Radio`, `Checkbox`, `TextButton`, `Dialog` (composto: `.Footer`), `Menu`, `SettingsItem`, `SearchField`, `FilterChip`, `AttachmentSheet`, `CallScreen` e `PhoneFrame`; extensões `Button`, `ForwardButton`, `BottomSheet`, `MediaViewer`, `ChatBanner`, `AdminOnlyNotice`, `SystemMessage`, `Poll`, `MessageTag` e `Toast`.
- **Diferenças de API em relação a `whatsappmobile`** (as únicas): `TabBar.tone` só aceita `'accent'` (o segundo tom era uma divergência de cor do arquivo de origem que aqui não existe); `Icon` renderiza um `<span>` de ligadura, não um `<svg>`, aceita `filled` e seus nomes mudaram (ver 11.4); `EncryptionNotice`, `MessageComposer` e demais textos padrão estão em pt-BR; `ChatWallpaper` repete um ladrilho de 320px em vez de cobrir com uma imagem. Nenhuma outra prop mudou.
- **É PROIBIDO ampliar esse conjunto sem registrar a decisão** na estória correspondente, com o `UncDocDecisions`.
- **Fronteira cliente/servidor** (seção 4.5): 20 dos 39 componentes rodam como Server Components (medido em 2026-09-29 sobre a 0.2.8 com o Unoochat, ao lado dos 20/39 do WhatsApp Mobile). O `Icon` do Unoochat é Server Component — renderiza um `<span>` sem hooks.

### 11.4. Iconografia: Biblioteca da Unooria
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou trazido de outra biblioteca. O registro `src/unoochat/components/Icon/IconGlyphs.ts` (`uncIcons`) aponta cada nome do módulo para uma **ligadura do Material Symbols Rounded, peso 300, sem preenchimento** — a biblioteca do quadro `6024:2923` da Plataforma Unooria (seção 5.1). Não há `d`, `viewBox` nem `figmaName`: o dado é o nome da ligadura, mais `filled` e `flipX` quando o glifo precisa deles.
- **A fonte é de ligadura**: sem `@unooria/design-system/fonts/unoochat.css` (ou o Material Symbols carregado pelo app), o **nome do ícone aparece como texto** — o mesmo modo de falha da Plataforma Unooria (seção 4.6). A folha de fonte do Unoochat é, na prática, obrigatória. O `Icon` corta o excedente à caixa quadrada para que a fonte ausente não vaze o nome inteiro.
- **`size` governa a aresta da caixa**; o glifo Material ocupa cerca de 83% dela, e o eixo óptico (`opsz`) acompanha o tamanho, entre 20 e 48. Por isso os tamanhos de uso são de caixa (24px para a barra superior, 16px para a barra de status), e não os do vetor de origem.
- **Substitutos, porque o quadro `6024:2923` não publica o glifo**: `star` → `star_rate` (preenchido), `videocam` → `video_call`, `forward` → `reply` espelhado (`flipX` no registro), `push_pin` → `keep`, e `radio_button_*` → **desenhado em CSS** pelo componente `Radio`. Ao acrescentar um glifo, confira primeiro o quadro; só use ligadura fora dele com registro da decisão.
- Nomes que **existem** no registro e não existiam em `whatsappmobile`: `callEnd`, `tickDouble`, `pin`, `document`, `gallery`, `audio`, `location`, `contact`, `poll`. Nomes que **deixaram de existir**: `micBody`, `micStand` (o microfone do `Fab` é o `mic`), `radioOn`, `radioOff`, `statusRing`. `overflow` é `more_horiz`; girado 90° (`rotate`) vira o menu vertical das barras. `phone`, `callIn` e `callOut` não precisam mais de rotação.

### 11.5. Kit de Documentação
As estórias do Unoochat usam o `UnooriaDocShell` como moldura e `.storybook/components/UncDocKit.tsx`: `UncDocGrid`, `UncDocCard`, `UncDocSpecs` (`component`, `layout`, `specs` — substitui o bloco de "especificações do Figma"), `UncDocDecisions` (substitui o registro de desvios), `UncDocAnatomy`, `UncDocStage` (prop `theme`), `UncDocPractices`, **`UncDocThemeSwitcher`**, `UncDocPropsTable` e `UncDocTokenSwatch` (metade clara, metade escura, com o token de origem na Unooria). Toda estória mantém as seções obrigatórias do Padrão Ouro (seção 3), com a seção 2 intitulada "Especificações técnicas".
- **Seção 6 ("Suporte a Temas")**: atendida pelo `UncDocThemeSwitcher`, que alterna `data-unc-theme` entre `light` e `dark` exatamente como um produto faz. Ao contrário do WhatsApp Mobile e do Tik Tooria, o Unoochat **tem** par claro/escuro, e ele é legítimo porque cada valor é um degrau nomeado da Unooria (seção 2.8).
- A cor das barras de seção nas estórias é `#716C98` (`brandpurple-600`).

### 11.6. Registro de Decisões de Design
Não há "desvios em relação ao Figma", porque não há arquivo. O que se registra, com o `UncDocDecisions`, é toda escolha que não seja mera aplicação de um token da Unooria a um componente herdado. Decisões registradas até o momento, todas de 2026-09-29:
- **Onze acentos viram um**: os tons de verde-água do módulo de origem foram consolidados em `--unc-color-accent`; do mesmo modo, os 25 tokens de texto viraram 8, e os de ícone, 5 (seção 2.8). A justificativa é que os tons distintos eram divergências do arquivo de origem, e não hierarquia.
- **Cor por contraste, não por analogia**: acento `brandpurple-600` no claro (5,0:1 com branco) e `brandpurple-400` no escuro (com `text-on-accent` em `brandpurple-950`); balão enviado em `brandpurple-200` (claro) e `-700` (escuro); texto secundário em `neutral-700` / `neutraldark-900`. `brandpurple-500` **não** serve de texto sobre branco (contraste abaixo de 4,5:1) e não é usado como tal.
- **Título da marca na barra superior em `--unc-color-accent`** (variante `home` do `TopBar`), e títulos de página em `--unc-color-text-primary`. É onde a identidade roxa aparece no cromo do aplicativo.
- **Tela de chamada roxa e invariante**: `--unc-color-call-surface` é `brandpurple-800` nos dois temas, como imersivo de marca; o mesmo vale para as ações da folha de anexos.
- **Elevação de sobreposição**: Menu, Dialog, BottomSheet, Toast e Fab recebem `--unc-elevation-overlay`. Em superfície roxa escura a sombra escura não se vê, por isso o escuro usa o halo claro `--unooria-elevation-neutral-2`; a separação continua principalmente pela escada de luminância.
- **Escala tipográfica encaixada na da Unooria**: os degraus fracionários da origem (18,54px, 15,54px, 14,54px, 16,544px…) viraram os degraus inteiros mais próximos da escala da plataforma, e o corpo do placeholder do compositor passou de 20 para 16px. Alturas de linha passaram de `normal` para as da Unooria.
- **`Radio` desenhado em CSS** (ver 11.4); **`ChatWallpaper` em ladrilho** de 320px, por tema; **`TabBar.tone`** reduzido a `'accent'`.
- **Medidas herdadas**: espaçamento, raios, alturas de barra, avatares e FABs seguem os do módulo de origem (seção 2.8) — é a razão de a estrutura ser "a mesma" e o motivo de os pares de tamanho de ícone (24px na barra, 16px na status) terem sido reajustados à caixa do glifo Material.
- **Largura padrão do `Menu` de 240px** (a origem usa 190px): os rótulos em pt-BR, em Open Sans de 18px, não cabem em 190px; `width` continua ajustável.
- **`FilterChip` desabilitado**: 50% de opacidade e `cursor: not-allowed`, sem token novo. A origem não tinha estado desabilitado.
- **Glifos e sombra que divergem da origem** (2026-09-30, no de-para com `src/whatsappmobile/`): o `Fab` desenha o glifo a 50% do diâmetro e aplica a sobreposição (`box-shadow`) ao círculo, e não um `drop-shadow` ao glifo; o `MessageBubble` usa `tickDouble` no lugar de dois `tick`; o `ChatListItem` usa `pin` no lugar de `pencil`; `CallListItem` e `ChatHeader` não giram o ícone. A `Telas` tem, além das 13 telas individuais e de `TodasAsTelas`, os grupos `AbasPrincipais`, `FluxoDeConversa` e `Chamadas`.

---

## 12. Design System Unoovista (Seção `Unoovista` do Storybook)

O **Unoovista** é a rede social visual da Plataforma Unooria com identidade própria: **paleta roxa, Open Sans e Material Symbols da Plataforma Unooria, em tema claro e escuro, e composição visual própria**. Foi criado em 2026-09-29 como **cópia estrutural** do módulo `src/instanooria/` — mesmos 31 componentes, mesmos nomes e props — com cores, tipografia, ícones e disposição trocados. **O módulo `src/instanooria/` continua no repositório, intacto**, e as duas marcas coexistem: nenhuma edição de um deles se propaga ao outro (cada um tem tokens e classes exclusivos, seção 1.3).

### 12.1. Origem, Motivo e Regras
- **Origem**: não há arquivo Figma. A estrutura de componentes vem de `src/instanooria/` (seção 6); a identidade vem da Plataforma Unooria (seção 2.9).
- **Motivo**: o produto precisa de uma rede social visual que **não reproduza a identidade nem a composição do aplicativo de terceiros** que serviu de referência ao módulo `instanooria`. Por isso, **no código, nos comentários, nas estórias e nos textos padrão do Unoovista é PROIBIDO citar** o aplicativo de origem, a empresa dele, o arquivo Figma comunitário ou seus nós, e usar o vocabulário de marca dele (o nome do aplicativo e da empresa, "Facebook", "IGTV", "Direct", "Nametag" e afins). A referência à estrutura de `src/instanooria/` vive **apenas** nesta seção e em 1.3.
- **Composição própria** (seção 12.6): a diferença não é só de cor. Doca de navegação flutuante, cartão de publicação com ações em pílula sobre a mídia, perfil centralizado com estatísticas em cartões e "squircle" para quem tem história são decisões de layout deste módulo.
- **Sem bitmap de terceiros nem de rede**: as imagens de demonstração são ilustrações SVG geradas a partir da paleta da Unooria, em `public/unoovista/` (12 avatares, 12 imagens de publicação e 3 quadros verticais de história). Todas entram por prop (`src`, `avatarSrc`, `coverSrc`). **Não copiar** `public/` de outra marca.
- **Idioma**: todo texto padrão de componente e de estória é pt-BR (o módulo de origem usava inglês). Nomes de demonstração são fictícios e vivem em `stories/unoovista/fixtures.ts`.

### 12.2. Títulos das Estórias
- **Fundamentos**: `Unoovista/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação & Gradientes | Ícones]`.
- **Componentes**: `Unoovista/Componentes/[NomeComponente]`.
- **Telas compostas**: `Unoovista/Telas/Telas Compostas`.

### 12.3. Componentes Oficiais (21) e Extensões (10)
Os mesmos da seção 6.2: `Icon`, `Logo`, `Avatar`, `Badge`, `Button`, `Divider`, `StoryBubble`, `StoriesTray`, `TopBar`, `TabBar`, `PostCard` (composto), `TextField`, `SearchField`, `Chip`, `SegmentedTabs`, `ListItem`, `NotificationItem`, `ProfileHeader`, `MediaGrid`, `PhoneFrame` e `StoryViewer`; extensões `DirectThread`, `MessageBubble`, `DmPoll`, `ConfirmDialog`, `BottomSheet`, `FloatingButton`, `StoryComposer`, `InlineHint`, `GestureHint` e `Snackbar`.
- **Diferenças de API em relação a `instanooria`** (as únicas): a prop `theme` **não tem valor padrão** em nenhum componente (herda `data-unv-theme` do contêiner; antes forçava `'light'`); `Icon` renderiza um `<span>` de ligadura, não um `<svg>`, aceita `rotate`, `flipX`, `flipY` e `filled`, e tem tamanhos `sm|md|lg` = 16/24/32px; ícones renomeados `igtv`→`longVideo`, `nametag`→`qrCode`, `facebook`→`external`; `Button` variante `facebook`→`social`; `Logo` ganhou `variant` (`lockup`|`mark`); `TopBar` ganhou o subcomponente `TopBar.Action`, tem `bordered` desligado por padrão e o título à esquerda; `TabBar` ganhou `shortLabel` por item e teclado (setas, Home, End); `SegmentedTabs` ganhou teclado; `SearchField` ganhou `clearable`, `clearLabel` e `onClear` (e é Client Component); `StoryBubble` ganhou `statusLabel` e o estado `add` aceita imagem; `ProfileHeader` ganhou `verified`; `NotificationItem` ganhou `unread` e `unreadLabel`; `InlineHint` ganhou `frictionLabel`; `MediaGrid` deixou de ter `gap` padrão de 1px (vale `--unv-spacing-3xs`). O rótulo padrão do selo de transmissão é "AO VIVO". Nenhuma prop foi removida.
- **Classes renomeadas pela composição própria** (verificado no de-para de 2026-09-30; a função da origem foi preservada em todas): `--facebook`→`--social` (`Button`), `__bar`→`__card` (`DirectThread`), `__home-indicator`→`__gesture-bar` (`PhoneFrame`), `--bordered`→`--card` (`StoriesTray`, a prop `bordered` foi mantida) e `__items`→`__dock` (`TabBar`). O `ConfirmDialog` foca "Cancelar" em qualquer tom (a origem só no destrutivo) e põe "Cancelar" antes de "Confirmar".
- **É PROIBIDO ampliar esse conjunto sem registrar a decisão** na estória correspondente, com o `UnvDocDecisions`.

### 12.4. Iconografia: Biblioteca da Unooria
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou trazido de outra biblioteca. O registro `src/unoovista/components/Icon/IconGlyphs.ts` (`unvIcons`) aponta cada nome do módulo para uma **ligadura do Material Symbols Rounded, peso 300, sem preenchimento** (com `filled` quando o estado exige) — a biblioteca do quadro `6024:2923` da Plataforma Unooria. **Todo nome do registro existe nesse quadro**; ao acrescentar um glifo, confira-o em `src/unooria/tokens/figma_icons_node_6024_2923.json` antes.
- **A fonte é de ligadura**: sem `@unooria/design-system/fonts/unoovista.css` (ou o Material Symbols carregado pelo app), o **nome do ícone aparece como texto** — o mesmo modo de falha da Plataforma Unooria (seção 4.6). O `Icon` corta o excedente à caixa quadrada.
- **Nomes de terceiros não entram** no vocabulário do registro: os glifos descrevem a função (`longVideo`, `qrCode`, `external`).
- O `Logo` é montado como o da Plataforma Unooria: **o símbolo é o "oo" da palavra** ("Un∞vista"). O símbolo é o **isótipo oficial da Unooria** — o anel espesso em forma de amendoim, com um único miolo —, cuja fonte da verdade é o PNG `public/brand/unooria_symbol_navy_fill.png` (o que o `LogoSymbol` da plataforma renderiza). O vetor foi **traçado desse PNG** (`potrace`; renderizado na resolução do PNG, coincide em IoU 0,9962). **Não usar o `SYMBOL_PATH_FILL` de `LogoVectors.tsx`**: é outro desenho, com dois miolos. As letras "Un" e "vista" são **contornos de Open Sans Bold** gerados por transformação única da curva da fonte (nunca `<text>`, cujo fallback deformaria a marca); o símbolo tem a altura de tinta do "o" e ocupa o vão dos dois "o". A técnica está no comentário de `Logo/LogoVector.ts`. Copiar o vetor não quebra a regra 1.3 (um módulo não lê tokens de outro): é um literal, como as cores.

### 12.5. Kit de Documentação
As estórias do Unoovista usam o `UnooriaDocShell` como moldura e `.storybook/components/UnvDocKit.tsx`: `UnvDocGrid`, `UnvDocCard`, `UnvDocSpecs` (substitui o bloco "especificações do Figma"), `UnvDocDecisions` (substitui o registro de desvios), `UnvDocAnatomy`, `UnvDocStage` (props `theme` e `surface`), `UnvDocPractices`, **`UnvDocThemeSwitcher`**, `UnvDocPropsTable` e `UnvDocTokenSwatch` (metade clara, metade escura, com o token de origem na Unooria). Toda estória mantém as seções obrigatórias do Padrão Ouro (seção 3), com a seção 2 intitulada "Especificações técnicas".
- **Seção 6 ("Suporte a Temas")**: atendida pelo `UnvDocThemeSwitcher`, que alterna `data-unv-theme` entre `light` e `dark` exatamente como um produto faz.
- A cor das barras de seção nas estórias é `#716C98` (`brandpurple-600`).

### 12.6. Registro de Decisões de Design
Não há "desvios em relação ao Figma", porque não há arquivo. O que se registra, com o `UnvDocDecisions` em cada estória, é toda escolha que não seja mera aplicação de um token da Unooria a um componente herdado. Decisões de 2026-09-29:
- **Camadas em vez de fios**: a tela é `background-secondary` e o conteúdo, `background-primary`; a separação vem da mudança de superfície e do espaço, e o fio, quando existe, é de 1px em `border-subtle`. Sem hairlines de 0,33px nem barras de largura total com fio.
- **Formas**: cartões e mídia em `radius-l`/`radius-m`; campos, chips, botões e a doca em cápsula. **Quem tem história ou transmissão é "squircle"** (`border-radius: 32%`): `StoryBubble` e `Avatar` com anel. É também uma pista **não cromática** — o estado é anunciado em texto (`statusLabel`).
- **Doca flutuante**: `TabBar` em cápsula, afastada das bordas, com `--unv-elevation-overlay`; o item ativo vira cápsula `action-primary` com glifo preenchido e rótulo, e os inativos mostram só o glifo (nome acessível sempre presente).
- **`TopBar`**: título grande à esquerda, ações circulares de 44px em `fill-field` (`TopBar.Action`), sem fio.
- **Publicação**: cartão único; `PostCard.Actions` logo após `PostCard.Media` sobe e vira **pílula sobre a base da mídia** (`background-elevated` + `--unv-elevation-overlay`); solta, é uma linha simples de botões circulares. Pontos do carrossel em cápsula dentro da mídia; o ponto ativo é mais comprido (pista não cromática).
- **Perfil**: composição centralizada, estatísticas em três cartões-pílula, ações em largura total. `MediaGrid` com 4px entre blocos e `radius-s`; o indicador de vídeo fica sempre no canto inferior.
- **Mensageria**: balão enviado em `background-tertiary` e recebido em `background-primary` com contorno de 1px; nenhum dos dois usa `action-primary`, para não parecer botão. A `DmPoll` não mostra contagem nem porcentagem e devolve só o `id`. `ConfirmDialog` de 300px sem desfoque, foco inicial em "Cancelar", toque no véu não cancela; `BottomSheet` sem arraste, com alça-botão (`aria-expanded`).
- **Contraste por decisão**: o `SegmentedTabs` usa traço deslizante de 3px (um segmento elevado sobre a trilha mediria 1,15:1); o `Snackbar` usa cores invertidas e ação em botão contornado (link sobre fundo invertido mediria 2,1:1); o `StoryComposer` fica em `background-primary` (é conteúdo da tela; `elevated` é reservado às camadas flutuantes); o anel "visto" do `Avatar` usa `border-control`, não `highlight-ring` (que reprova 3:1).
- **Ressalvas abertas**: nenhuma de contraste. O `SearchField` e o `MessageBubble` têm contorno de 1px em `border-control` (≥ 4,3:1) e o anel "visto" usa `highlight-ring`, hoje `neutral-500`/`neutraldark-800`; o símbolo do `Logo` é uma tinta só (`action-primary`, 4,88:1 no claro e 7,70:1 no escuro sobre a tela).
- **Tokens locais** (custom properties dentro do CSS do componente, sem token global): `--unv-post-card-*` (pílula de ações), `--unv-story-bubble-*`, `--unv-avatar-shape` e `-gap-color`, `--unv-badge-notification-size`, `--unv-phone-frame-gesture-*`, `--unv-dm-poll-mark-size`, `--unv-confirm-dialog-width`, `--unv-gesture-hint-travel`, `--unv-snackbar-inset-*`.

---

## 13. Design System UnooriaAI (Seção `UnooriaAI` do Storybook)

O **UnooriaAI** é o cliente de conversa com IA da Plataforma Unooria com identidade própria: **paleta roxa, Open Sans e Material Symbols da Plataforma Unooria, em tema claro e escuro**. Foi criado em 2026-09-29 como **cópia estrutural** do módulo `src/chatgpt/` — mesmos 25 componentes, mesmas props, mesmas medidas de layout — com cores, tipografia, ícones e logotipo trocados. **O módulo `src/chatgpt/` continua no repositório, intacto**, e as duas marcas coexistem: nenhuma edição de um deles se propaga ao outro (cada um tem tokens e classes exclusivos, seção 1.3).

### 13.1. Origem, Motivo e Regras
- **Origem**: não há arquivo Figma. A estrutura de componentes vem de `src/chatgpt/` (seção 7); a identidade vem da Plataforma Unooria (seção 2.10). Componentes que a origem já tinha continuam com o mesmo nome, as mesmas props e as mesmas medidas de layout, com as diferenças de 13.3.
- **Motivo**: o produto precisa de uma interface de conversa com IA que **não reproduza a identidade visual do aplicativo de terceiros** que serviu de referência ao módulo `chatgpt`. Por isso, **no código, nos comentários, nas estórias, nas fixtures e nos textos padrão do UnooriaAI é PROIBIDO citar** o aplicativo de origem, a empresa dele, o arquivo Figma comunitário ou seus nós, e usar o vocabulário de marca dele (o nome do aplicativo e da empresa, "GPT", "GPTs", nomes de modelos e de planos). A referência à estrutura de `src/chatgpt/` vive **apenas** nesta seção e em 1.3.
- **Sem bitmap de terceiros**: as imagens de demonstração são ilustrações SVG geradas a partir da paleta da Unooria, em `public/unooriaai/` (`avatar-lucas.svg`, `avatar-ana.svg` e `avatar-rafael.svg`); nenhuma fotografia. Todas entram por prop (`src`). **Não copiar** `public/` de outra marca.
- **Idioma**: todo texto padrão de componente e de estória é pt-BR (o módulo de origem usava inglês). Nomes de demonstração são fictícios e vivem em `stories/unooriaai/fixtures.ts`.

### 13.2. Títulos das Estórias
- **Fundamentos**: `UnooriaAI/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação | Ícones]`.
- **Componentes**: `UnooriaAI/Componentes/[NomeComponente]`.
- **Telas compostas**: `UnooriaAI/Telas/Telas Compostas`.

### 13.3. Componentes Oficiais (25) e Diferenças em Relação ao `chatgpt`
`Button`, `IconButton`, `Avatar`, `Badge`, `Tag`, `Toggle`, `Divider`, `Input`, `ChatInput`, `SearchInput`, `NavItem`, `ChatBubble`, `AssistantCard`, `SettingsRow`, `Sidebar` (composto: `.NewChatButton`, `.SectionLabel`, `.Spacer`, `.FooterItem`), `FeatureCard`, `Modal` (composto: `.Header`, `.Body`, `.Footer`), `Icon`, `Logo`, `PlanTag`, `PromptSuggestion`, `TopicColumn`, `SidebarRow`, `Composer` (composto: `.Dock`) e `WebSidebar` (composto: `.Section`, `.NewChat`).
- **REGRA CRÍTICA, herdada da seção 7.3**: um componente **NUNCA** substitui o seu equivalente do outro grupo — `SidebarRow` não é `NavItem`, `WebSidebar` não é `Sidebar`, `Composer` não é `ChatInput`, `PlanTag` não é `Badge`. As medidas são distintas.
- **Diferenças de API em relação a `chatgpt`** (as únicas): `GPTCard` virou **`AssistantCard`** (`GPT` é vocabulário de terceiro); `Icon` renderiza um `<span>` de ligadura, não um `<svg>`, e aceita `filled`, `rotate`, `flipX` e `flipY`; `Logo` tem `variant` (`horizontal`, `mark`, `wordmark`) e `tone` (`primary`, `inherit`) e o `height` padrão é 32; `NavItem` ganhou `icon?: UaiIconName` (o `glyph` continua `ReactNode` e tem precedência); `ChatInput` ganhou `defaultValue` (ver abaixo); `PlanTag` e o rótulo padrão dos componentes estão em pt-BR ("Pro" no lugar do nome de plano de terceiro; "Nova conversa", "Escreva uma mensagem", "Buscar conversas"). O tipo `UaiCardProps` chama-se `UaiAssistantCardProps`. Nenhuma prop foi removida.
- **Diferenças de medida** (todas por tokens da Unooria): as alturas do `Button` passaram de 28/34/44 para **30/36/48px** (linha de rótulo dos estilos `label-md` e `label-lg`); o corpo de 13px do `FeatureCard` e o de 11px dos rótulos e legendas passaram para o degrau de 12/18; o `caption` é 12px; as iniciais do `Avatar` são 10/12/16/18px. Nenhuma outra medida de layout mudou.
- **Correção herdada**: o `ChatInput` e o `Composer` do módulo de origem passavam `value` ao elemento nativo mesmo sem o consumidor pedir, contra a regra 4.5.1. No UnooriaAI eles só são controlados quando recebem `value`; sem ele usam `defaultValue` (prop aditiva no `Composer`), leem o texto do nó no envio e limpam o próprio nó. A estória `Estados` de cada um guarda a regra com `play`; `WebSidebar.ComposicaoModular` também tem `play` (`<nav>` e `aria-current`). Vale registrar que o módulo `chatgpt` **continua com o defeito nos dois componentes** (fora do escopo desta cópia).
- **É PROIBIDO ampliar esse conjunto sem registrar a decisão** na estória correspondente, com o `UaiDocDecisions`.
- **Fronteira cliente/servidor** (seção 4.5): 21 dos 25 componentes rodam como Server Components (medido em 2026-09-29 sobre a 0.2.8); são `'use client'` apenas `ChatInput`, `Composer`, `Modal` e `Toggle`. `Icon` e `Logo` são Server Components.

### 13.4. Iconografia: Biblioteca da Unooria
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou trazido de outra biblioteca. O registro `src/unooriaai/components/Icon/IconGlyphs.ts` (`uaiIcons`) aponta cada nome do módulo para uma **ligadura do Material Symbols Rounded, peso 300, sem preenchimento** (com `filled` quando o estado exige) — a biblioteca do quadro `6024:2923` da Plataforma Unooria. **Todo nome do registro existe nesse quadro**; ao acrescentar um glifo, confira-o em `src/unooria/tokens/figma_icons_node_6024_2923.json` antes.
- **A fonte é de ligadura**: sem `@unooria/design-system/fonts/unooriaai.css` (ou o Material Symbols carregado pelo app), o **nome do ícone aparece como texto** — o mesmo modo de falha da Plataforma Unooria (seção 4.6). O `Icon` corta o excedente à caixa quadrada. `size` governa a aresta da caixa; o glifo Material ocupa cerca de 83% dela.
- **Vocabulário**: os treze nomes do módulo de origem foram mantidos (`microphone`, `image`, `paperPlaneRight`, `add`, `chatText`, `trash`, `sun`, `user`, `arrowSquareOut`, `signOut`, `chats`, `stars`, `shieldWarning`) e acrescentaram-se seis, no lugar dos glifos tipográficos da origem: `close`, `arrowForward`, `arrowUpward`, `sparkle`, `search` e `chatBubble`. **Os caracteres tipográficos (✕ → ↑ ✦ ⌕ + e o emoji) deixaram de existir** — não há `glyphs.ts` nem estória de glifos; toda prop de glifo continua aceitando `ReactNode`, com `Icon` por padrão.
- **Substitutos, porque o quadro `6024:2923` não publica o glifo**: `image` → `photo`, `sun` → `wb_sunny`, `stars` → `stars` preenchido, `sparkle` → `flare` (a explosão de quatro pontas mais próxima). Cada um está registrado como decisão na estória `Ícones`.
- **Logotipo (`Logo/LogoVector.ts`)**: marca original, montada como a do Unoovista (seção 12.4). O **símbolo é o isótipo oficial da Unooria** — o anel em forma de amendoim, com um único miolo —, traçado do PNG `public/brand/unooria_symbol_navy_fill.png` (o mesmo vetor do `Logo` do Unoovista, copiado como literal, o que não viola a regra 1.3), e o texto "UnooriaAI" são **contornos de Open Sans Bold** gerados por transformação única da curva da fonte (nunca `<text>`, cujo fallback deformaria a marca). O símbolo ocupa o vão do "oo" ("Un∞riaAI"); o símbolo e o "AI" usam `--uai-text-brand` e "Unooria" usa `--uai-text-primary`. `viewBox` horizontal `0 0 121.61 24`. A técnica está no comentário de `Logo/LogoVector.ts`.

### 13.5. Kit de Documentação
As estórias do UnooriaAI usam o `UnooriaDocShell` como moldura e `.storybook/components/UaiDocKit.tsx`: `UaiDocGrid`, `UaiDocCard`, `UaiDocSpecs` (substitui o bloco "especificações do Figma"), `UaiDocDecisions` (substitui o registro de desvios), `UaiDocAnatomy`, `UaiDocStage` (props `theme` e `surface`), `UaiDocPractices`, **`UaiDocThemeSwitcher`**, `UaiDocPropsTable` e `UaiDocTokenSwatch` (metade clara, metade escura, com o token de origem na Unooria). Toda estória mantém as seções obrigatórias do Padrão Ouro (seção 3), com a seção 2 intitulada "Especificações técnicas".
- **Seção 6 ("Suporte a Temas")**: atendida pelo `UaiDocThemeSwitcher`, que alterna `data-uai-theme` entre `light` e `dark` exatamente como um produto faz.
- A cor das barras de seção nas estórias é `#716C98` (`brandpurple-600`).
- A moldura de janela e o cabeçalho de área usados em `UnooriaAI/Telas` são **andaimes de documentação**, restritos a `stories/`, e não integram o pacote.

### 13.6. Registro de Decisões de Design
Não há "desvios em relação ao Figma", porque não há arquivo. O que se registra, com o `UaiDocDecisions` em cada estória, é toda escolha que não seja mera aplicação de um token da Unooria a um componente herdado. Decisões de 2026-09-29:
- **Sem primitivas**: os componentes consomem só semânticos; a escada de primitivas e os overlays pretos e brancos da origem estrutural foram removidos, e o selo passou a `--uai-fill-*` em opacidade nomeada (nada de `color-mix`).
- **Contorno de 1px no `Composer`**: a origem estrutural usava 0,5px. O traço de 1px mede 4,96:1 no claro e 8,64:1 no escuro; a diferença foi descontada do padding vertical, e a caixa continua com 56 × 760.
- **Anel de foco do `SearchInput`**: o foco não escurece mais o fundo (o placeholder caía a ~3:1); passou a anel de 2px em `--uai-border-brand` sobre `--uai-fill-4`.
- **Alvo do fechar do `Modal`**: 24px (WCAG 2.5.8), com o ícone `close` em 20px.
- **Cápsula do `PlanTag` por tema**: o degrau claro da origem media 2,37:1 de limite sobre a tela; a cápsula passou a `brandpurple-600` (claro) e `brandpurple-400` (escuro), com limite ≥ 3:1 nos dois.
- **Vermelho de estado no tema escuro**: `danger-300` (e `-200` no hover); o `danger-400` fazia o selo de erro medir 4,0:1 sobre a camada terciária.
- **Botão de nova conversa e botão primário são de cores diferentes, de propósito**: `Sidebar.NewChatButton` e `WebSidebar.NewChat` usam `--uai-bg-inverse` (o extremo escuro da escala roxa no claro, lilás no escuro), como na estrutura de origem; `Button variant="primary"` usa `--uai-interactive-primary` (`brandpurple-600` no claro). Os dois convivem em `Telas/Explorar assistentes`.
- **Peso 300 dos ícones**: o traço é fino em tamanhos de 16px (a cor mede 6,4:1, só o traço é fino); onde o glifo aparece isolado, o `Icon` usa a caixa de 20px.
- **Renomeações de estória**: `ExemploOficialDoFigma` virou `ExemploOficial` ou `ExemploDeComposicao` (o id da estória muda); `ExplorarGPTs` virou `ExplorarAssistentes` e `ModoDark`, `ModoEscuro`.

---

## 14. Design System Unoogaleria (Seção `Unoogaleria` do Storybook)

A **Unoogaleria** é a galeria de fotos e vídeos de celular da Plataforma Unooria, com identidade própria (paleta roxa, Open Sans e Material Symbols da plataforma, em tema claro e escuro) e uma **superfície imersiva** invariante para o visualizador e o editor. Criada em 2026-09-30. Diferente das outras marcas, ela não é cópia estrutural de nenhum módulo: os componentes foram desenhados para a galeria, e o módulo publica também o **aplicativo completo** (`GalleryApp`) pronto para rodar dentro do mockup de celular (`PhoneFrame`).

### 14.1. Origem, Motivo e Regras
- **Origem**: não há arquivo Figma. A identidade vem da Plataforma Unooria (seção 2.11). Nenhum aplicativo de terceiros é citado no código, nas estórias ou nos textos padrão, e o vocabulário descreve a função (Biblioteca, Para você, Álbuns, Excluídos recentemente).
- **Sem bitmap nem vídeo de terceiros**: `public/unoogaleria/` guarda 24 ilustrações SVG de fotografia (quatro proporções, inclusive panorama 3:1 e capturas de tela), 6 retratos de pessoas e **três vídeos H.264 gerados por síntese** com `ffmpeg` (`geq` sobre a paleta da Unooria: mar com sol, lanternas subindo, nuvens sobre colinas), com a capa de cada um extraída do próprio vídeo. Todas as cores são hexadecimais da paleta de `src/unooria/tokens/colors.css`. Tudo entra por prop (`src`, `videoSrc`, `avatarSrc`, `coverSrc`), **nunca embutido no pacote**.
- **Data fixa nas estórias**: `stories/unoogaleria/fixtures.ts` gira em torno de `uglDemoNow` (30/09/2026 10:00, São Paulo). Todo componente que fala de datas aceita `now` e `timeZone`; toda data é lida num **fuso explícito** (padrão `America/Sao_Paulo`), e não no da máquina — agrupar por dia no fuso local faria a mesma foto cair em "Hoje" na máquina de quem desenvolve e em "Ontem" no CI.
- **Sobreposições ficam na tela, não na janela**: folhas, menus, diálogos, avisos, visualizador e editor são `position: absolute` dentro do contêiner posicionado mais próximo — a tela do `PhoneFrame`, que também é bloco de contenção de `position: fixed` (`transform`). **É PROIBIDO usar portal** neste módulo.
- **Idioma**: todo texto padrão é pt-BR.

### 14.2. Títulos das Estórias
- **Fundamentos**: `Unoogaleria/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação | Ícones]`.
- **Componentes**: `Unoogaleria/Componentes/[NomeComponente]`.
- **Telas compostas**: `Unoogaleria/Telas/Telas Compostas` — todas são o `GalleryApp` real; as que dependem de interação (visualizador, editor, informações, compartilhar, seleção, confirmação, novo álbum, álbum aberto, Ocultos, lixeira, resultados de busca) **chegam ao estado pelo `play`**, clicando como uma pessoa faria. Nenhuma tela é réplica desenhada à parte.

### 14.3. Componentes Oficiais (32)
**Fundação**: `Icon`, `PhoneFrame`, `Button`, `IconButton`, `Avatar`, `Chip`.
**Navegação**: `TopBar` (`large`, `compact`, `overlay`), `TabBar` (com `onReselect`), `SegmentedControl` (`floating` para "Anos | Meses | Todas"), `SearchField`, `SectionHeader`, `SelectionBar`.
**Biblioteca e álbuns**: `MediaThumbnail`, `MediaGrid`, `AlbumCard`, `HighlightCard`, `ListRow` (com `ListGroup`), `EmptyState`.
**Visualizador**: `MediaViewer`, `VideoControls` (com o hook `useVideoPlayback`), `Filmstrip`, `InfoPanel`.
**Editor**: `PhotoEditor`, `FilterPicker`, `Slider`.
**Sobreposições e avisos**: `BottomSheet`, `ActionMenu`, `ConfirmDialog`, `ShareSheet`, `Toast`.
**Formulário**: `TextField`.
**Aplicativo**: `GalleryApp`.

- **Modelo de domínio compartilhado** em `src/unoogaleria/media/`: `UglMediaItem`, `UglAlbum`, `UglPerson`, `UglMediaSection`, `UglEditState` e os utilitários de data, duração, rótulo acessível, agrupamento e edição (`uglGroupMedia`, `uglMediaLabel`, `uglDaysLeft`, `uglEditToFilter`, `uglEditToTransform`, `uglFilters`…). **Datas SEMPRE por esses utilitários.**
- **Hooks** em `src/unoogaleria/hooks/`: `useModalFocus` (com **pilha de camadas** — só a do topo responde a Esc e a Tab, e cada irmão volta ao `aria-hidden` que tinha) e `useControllableState`.
- **Edição não destrutiva**: o `PhotoEditor` só produz um `UglEditState`; grade, visualizador e editor aplicam a edição na exibição (filtro, transformação e vinheta). A mídia original nunca é reescrita.
- **Vídeo real**: o `MediaViewer` monta `<video>` só no item aberto, e `useVideoPlayback` lê o estado SEMPRE dos eventos do elemento — nunca de forma otimista.
- **`GalleryApp`**: quatro abas (Biblioteca, Para você, Álbuns, Busca); grade por dia com zoom de 3, 5 e 7 colunas (pinça, Ctrl/⌘ + roda ou menu), visões por mês e ano, filtros; seleção por toque, grupo, arraste e pressão longa; visualizador com deslizar, ampliar, vídeo, favoritar, informações com legenda editável, compartilhar, apresentação, editar e excluir; álbuns (criar, renomear, excluir, adicionar e remover itens), tipos de mídia, Ocultos protegido e Excluídos recentemente (30 dias, recuperar, apagar de vez); busca sem acento por início de palavra; e **"Desfazer"** em toda operação que tira algo do lugar. O estado é guardado por um redutor puro exportado (`galleryState.ts`: `uglGalleryReducer` e seletores) para que um produto monte a própria galeria com as mesmas regras; `onAction` recebe cada operação antes de ela acontecer e `onStateChange`, o estado depois.
- **É PROIBIDO ampliar esse conjunto sem registrar a decisão** na estória correspondente, com o `UglDocDecisions`.

### 14.4. Iconografia: Biblioteca da Unooria
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou trazido de outra biblioteca. O registro `src/unoogaleria/components/Icon/IconGlyphs.ts` (`uglIcons`) aponta cada nome para uma **ligadura do Material Symbols Rounded, peso 300** (com `filled` e `flipX` quando preciso), conferida no quadro `6024:2923` (`src/unooria/tokens/figma_icons_node_6024_2923.json`). Os glifos da barra de status do aparelho (sinal, rede sem fio e três níveis de bateria) também são do registro.
- **Uma exceção declarada**: `play` usa `play_arrow`, que o quadro não publica (publica `pause`). É o mesmo precedente do `AudioPlayer` da seção 5.1.
- **Substitutos**, porque o quadro não publica o glifo: desfazer → `replay` (o mesmo das peças do Jornal da Escola), espelhar → `swap_horiz`, captura de tela → `stay_current_portrait`. **Não há glifo de refazer**: o editor não tem "Refazer" (Reverter pode ser desfeito).
- **A fonte é de ligadura**: sem `@unooria/design-system/fonts/unoogaleria.css` (ou o Material Symbols do app), o nome do ícone aparece como texto (seção 4.6).

### 14.5. Kit de Documentação
As estórias usam o `UnooriaDocShell` e `.storybook/components/UglDocKit.tsx`: `UglDocGrid`, `UglDocCard`, `UglDocSpecs`, `UglDocDecisions`, `UglDocAnatomy`, `UglDocStage` (props `theme` e `surface`, inclusive `immersive`), `UglDocPractices`, **`UglDocThemeSwitcher`**, `UglDocPropsTable` e `UglDocTokenSwatch`. Seção 2 intitulada "Especificações técnicas"; seção 6 atendida pelo `UglDocThemeSwitcher`. Barras de seção em `#716C98` (`brandpurple-600`).

### 14.6. Registro de Decisões de Design
Não há "desvios em relação ao Figma". O que se registra, com o `UglDocDecisions` em cada estória, é toda escolha que não seja mera aplicação de um token. Decisões de 2026-09-30 com consequência ampla:
- **Mockup genérico**: o `PhoneFrame` tem corpo, aro, botões laterais, ilha da câmera, barra de status e barra de gesto, nas cores `--ugl-color-device-*`, sem imitar aparelho de mercado. A barra de status e a barra de gesto **clareiam sozinhas** quando qualquer descendente declara `data-ugl-immersive` (`:has()`), sem prop nem estado.
- **O cabeçalho colante mede a partir do conteúdo do contêiner de rolagem.** O `top` de um elemento `sticky` conta a partir da borda de conteúdo do contêiner de rolagem, já abaixo do `padding-top` que abre espaço para a barra sobreposta. A grade somava o recuo duas vezes, e o cabeçalho "Hoje" colava duas barras abaixo, por cima da primeira linha de fotos (medido: 182px em vez de 91px). Só a inspeção visual acusou — os testes de comportamento passavam.
- **Ordem da transformação da edição**: a lista de `transform` se aplica da direita para a esquerda; "Espelhar" numa foto girada 90° aparecia como espelho vertical enquanto o giro vinha antes do espelho na lista.
- **Um `play` que segura tecla usa uma sessão só do user-event** (`userEvent.setup()`): cada chamada direta começa com o teclado solto, e o `[/Space]` de uma sessão nova não solta a tecla da anterior.
- **Busca por início de palavra**: "ana" acha a Ana, e não a Serra da C**ana**stra.
- **Desfazer por fotografia do estado**: antes de cada operação destrutiva o app guarda o estado inteiro, e "Desfazer" o devolve de uma vez.
- **Ocultos com desbloqueio simulado**: é o fluxo, não uma autenticação.

## 15. Design System Unoojornal (Seção `Unoojornal` do Storybook)

O **Unoojornal** é o jornal escolar digital da Plataforma Unooria. A **estrutura editorial** vem do arquivo Figma [Jornal da Escola](https://www.figma.com/design/bWOdMM0yzC9WSrkl5x4YzZ/Jornal-da-Escola) (`fileKey bWOdMM0yzC9WSrkl5x4YzZ`, página `0:1`: quatro telas de 1440px e oito quadros de estado de componente); a **identidade** é a da Plataforma Unooria — paleta roxa, Open Sans e Material Symbols, em tema claro e escuro. Criado em 2026-09-30, o módulo publica também o **aplicativo completo** (`NewsApp`), pronto para rodar dentro do mockup de desktop (`DesktopFrame`) ou de celular (`PhoneFrame`).

### 15.1. Origem, Motivo e Regras
- **Origem estrutural**: telas `homepage-default` (`3:7`), `homepage-filter-active` (`3:196`), `article-detail` (`3:363`) e `related-articles` (`3:404`); quadros de estado de links (`5:9`), botões (`5:37`), pílulas de filtro (`5:96`), item de lista (`5:133`), cartão (`5:181`), imagem da galeria (`5:214`), etiquetas (`6:59`) e barra de progresso (`6:102`). O arquivo **não publica variáveis**, e **nenhuma cor nem fonte dele entra** (seção 15.6). Como o arquivo é do próprio produto, pode ser citado — diferente dos módulos derivados de aplicativos de terceiros.
- **Não é o `NewsCard`, o `NewsArticle` nem o `NewspaperPage`** da Plataforma Unooria (seção 5.1): aquelas peças são design próprio da missão do Jornal da Escola e continuam em `src/unooria/`. O Unoojornal não as consome e elas não o consomem (seção 1.3).
- **Sem fotografia do arquivo**: `public/unoojornal/` guarda 12 ilustrações SVG 3:2 e 6 retratos, geradas da paleta da Unooria por `scripts/gerar-ilustracoes-unoojornal.mjs` (com semente: rodar de novo reproduz os mesmos arquivos). Tudo entra por prop (`src`, `imageSrc`, `avatarSrc`), **nunca embutido no pacote**.
- **Nomes fictícios só nas fixtures**: «Gazeta do Pátio» e «Colégio Anísio Bastos» vivem em `stories/unoojornal/fixtures.ts`; os componentes recebem o título da publicação por prop.
- **Data fixa nas estórias**: `ujnDemoNow` é 20/03/2026 14:40, em São Paulo — uma **sexta-feira** (o arquivo de design escreve «quinta-feira»; o dia da semana é calculado, não copiado). Toda data é lida num **fuso explícito** (`UJN_DEFAULT_TIME_ZONE`, `America/Sao_Paulo`), com nomes de mês e de dia em tabelas fixas, sem `Intl`.
- **Sobreposições ficam na tela, não na janela**: modal, folha inferior, aviso, foto ampliada e carta são `position: absolute` dentro do contêiner posicionado mais próximo — a tela do `PhoneFrame` ou do `DesktopFrame`, ambas blocos de contenção. **É PROIBIDO usar portal** neste módulo.
- **Idioma**: todo texto padrão é pt-BR.

### 15.2. Títulos das Estórias
- **Fundamentos**: `Unoojornal/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação & Gradientes | Ícones]`.
- **Componentes**: `Unoojornal/Componentes/[NomeComponente]`.
- **Telas compostas**: `Unoojornal/Telas/Telas Compostas` — todas são o `NewsApp` real, em `DesktopFrame` ou `PhoneFrame`; as que dependem de interação (filtro ativo, matéria, texto grande, carta, salvas, busca, foto aberta) **chegam ao estado pelo `play`**, clicando como uma pessoa faria. Nenhuma tela é réplica desenhada à parte.

### 15.3. Componentes Oficiais (43)
**Fundação**: `Icon`, `Logo`, `Avatar`, `Rule` (fio fino, grosso e duplo), `Tag` (contorno, destaque, neutra), `Button` (primário, secundário, fantasma), `IconButton`.
**Cabeçalho e navegação**: `EditionBar`, `Masthead`, `NavLink`, `MainNav`, `FilterPill`, `FilterBar`, `SearchField`, `Pagination`.
**Capa**: `Byline`, `FeaturedStory`, `ArticleListItem`, `ArticleCard`, `RelatedArticles`, `SectionHeading`, `OpinionBox`, `AgendaList` (`.Item`), `GalleryImage`, `GalleryGrid`, `Footer` (`.Column`).
**Matéria**: `ReadingProgress`, `ArticleTopBar`, `ArticleHeader`, `ArticleBody`, `PullQuote`, `Figure`, `CorrectionNote`, `ShareBar`.
**Camadas, avisos e formulário**: `Toast`, `Modal`, `BottomSheet`, `EmptyState`, `TextField`, `TextArea`.
**Documentação**: `DesktopFrame`, `PhoneFrame`. **Aplicativo**: `NewsApp`.

- **`ArticleListItem` e `ArticleCard` são dois formatos distintos** do arquivo (linha de texto com barra lateral e cartão com imagem 3:2); **não duplicar nem consolidar**, como os quatro cartões de vídeo do Unootube. `FeaturedStory`, `OpinionBox` e `SectionHeading` também são medidas próprias.
- **Modelo editorial compartilhado** em `src/unoojornal/edition/`: `UjnArticle`, `UjnSection`, `UjnAuthor`, `UjnBlock` (o corpo da matéria é uma lista de blocos tipados — `paragraph`, `heading`, `quote`, `figure`, `list` —, e **não HTML**), `UjnAgendaEvent`, `UjnGalleryPhoto`, `UjnLetter` e os utilitários `ujnFormatDate`, `ujnDayMonth`, `ujnTimeAgo`, `ujnReadingTime`, `ujnNormalizeSearch`, `ujnMatchesQuery`, `ujnArticleLabel` e `ujnCodePoints`. **Datas SEMPRE por esses utilitários.**
- **Hooks** em `src/unoojornal/hooks/`: `useModalFocus` (com **pilha de camadas**: só a do topo responde a Esc e a Tab, e cada irmão volta ao `aria-hidden` que tinha) e `useControllableState`, cópias dos da Unoogaleria — um módulo de marca nunca consome outro.
- **`NewsApp`**: capa com filtros, matéria com progresso de leitura, seções, galeria, agenda, busca, salvas e carta à redação. O estado é guardado por um redutor puro exportado (`newsState.ts`: `ujnNewsReducer`, `ujnCreateNewsState` e os seletores `ujnSelectLatest`, `-Featured`, `-Opinion`, `-Saved`, `-BySection`, `-Related`, `-Unread` e `ujnSectionCounts`) para que um produto monte o próprio jornal com as mesmas regras; `onAction` recebe cada operação antes de ela acontecer e `onStateChange`, o estado depois. **«Desfazer»** vale para salvar e remover: antes de cada operação o app guarda o estado inteiro e a ação `replace` o devolve de uma vez. Busca sem acento e por **início de palavra** («ana» acha a Ana, não a Serra da C**ana**stra); a carta conta o texto em **code points** (20 a 600) e valida nome e texto com `ujnValidateLetter`.
- **Campos de entrada** (seção 4.5.1): `TextField`, `TextArea` e `SearchField` só são controlados quando o consumidor passa `value`; as estórias `play` guardam a regra, inclusive o texto escrito direto no nó do DOM que sobrevive a re-renderizações.
- **Diálogo composto se nomeia sozinho** (seção 4.3): `Modal` e `BottomSheet` ligam `aria-labelledby` ao título renderizado; as estórias `play` conferem `getByRole('dialog', { name })`.
- **Fronteira cliente/servidor** (seção 4.5): 21 dos 43 componentes rodam como Server Components (medido em 2026-09-30 sobre a 0.2.9); são `'use client'` os que têm estado, efeito ou repassam função a um filho (`SearchField`, `FilterBar`, `MainNav`, `Pagination`, `Modal`, `BottomSheet`, `Toast`, `TextField`, `TextArea`, `ReadingProgress`, `ArticleTopBar`, `ShareBar`, `CorrectionNote`, `Avatar`, `FeaturedStory`, `ArticleListItem`, `ArticleCard`, `RelatedArticles`, `SectionHeading`, `OpinionBox`, `GalleryImage` e `NewsApp`).
- **É PROIBIDO ampliar esse conjunto sem registrar a decisão** na estória correspondente, com o `UjnDocDecisions`.

### 15.4. Iconografia: Biblioteca da Unooria
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou trazido de outra biblioteca. O registro `src/unoojornal/components/Icon/IconGlyphs.ts` (`ujnIcons`) aponta cada nome para uma **ligadura do Material Symbols Rounded, peso 300** (com `filled` quando o estado exige), conferida no quadro `6024:2923` (`src/unooria/tokens/figma_icons_node_6024_2923.json`). **Todo nome do registro existe nesse quadro**; as barras de status do aparelho (sinal, rede sem fio e três níveis de bateria) também são do registro.
- **Substitutos**, porque o quadro não publica o glifo: tema claro → `wb_sunny` (não há `light_mode`), expandir → `keyboard_arrow_down` (não há `expand_more`), desfazer → `replay`, tamanho do texto → `format_size`, salvar em repouso → `bookmark` sem preenchimento (não há `bookmark_border`).
- **A fonte é de ligadura**: sem `@unooria/design-system/fonts/unoojornal.css` (ou o Material Symbols do app), o nome do ícone aparece como texto (seção 4.6).
- **Logotipo (`Logo/LogoVector.ts`)**: marca original **Un∞jornal**. O símbolo é o isótipo oficial da Unooria (o anel em forma de amendoim, copiado como literal do `Logo` do Unoovista, o que não viola a regra 1.3) ocupando o vão do «oo»; «Un» e «jornal» são **contornos de Open Sans Bold** gerados por transformação única da curva da fonte (nunca `<text>`, cujo fallback deformaria a marca). `viewBox` do lockup `0 0 135.91 25` — o «j» desce abaixo da linha de base. A técnica está no comentário do arquivo.

### 15.5. Kit de Documentação
As estórias do Unoojornal usam o `UnooriaDocShell` como moldura e `.storybook/components/UjnDocKit.tsx`: `UjnDocGrid`, `UjnDocCard`, `UjnDocSpecs`, `UjnDocDecisions`, `UjnDocAnatomy`, `UjnDocStage` (props `theme` e `surface`: `page`, `card`, `subtle`, `elevated` e `footer`), `UjnDocPractices`, **`UjnDocThemeSwitcher`**, `UjnDocPropsTable` e `UjnDocTokenSwatch`. Seção 2 intitulada «Especificações técnicas»; seção 6 atendida pelo `UjnDocThemeSwitcher`. Barras de seção em `#716C98` (`brandpurple-600`). O `UjnDocDecisions` (no molde do `UglDocDecisions`) é obrigatório em toda estória.

### 15.6. Registro de Decisões de Design
Não há «desvios em relação ao Figma» no sentido estrito, porque cor e fonte nunca vieram dele. O que se registra, com o `UjnDocDecisions` em cada estória, é toda escolha que não seja mera aplicação de um token. Decisões de 2026-09-30 com consequência ampla:
- **Dourado → roxo, serifa → Open Sans**: o acento editorial é `brandpurple`; peso e tamanho do Open Sans fazem a hierarquia que a serifa fazia.
- **Rodapé escuro invariante**: o arquivo desenha o rodapé escuro sobre uma página clara; ele virou uma superfície invariante (`--ujn-color-footer-*`), e no tema escuro continua um degrau acima da página.
- **A tinta do jornal**: o fio grosso e o fio duplo sob o título da publicação são tokens (`--ujn-color-border-rule`, `--ujn-gradient-rule-double`), e a separação do resto da página é por camada e fio de 1px, sem sombra.
- **Contorno de controle ≥ 3:1**: `border-default` mede cerca de 1,4:1 sobre a página clara e **não** serve de limite de controle (WCAG 1.4.11); o botão secundário, a pílula de filtro e o `IconButton` outline usam `border-control`.
- **Estado nunca só por cor**: a pílula selecionada leva um visto, a matéria lida leva o selo «Lida», o item atual leva a barra lateral e `aria-current`, o ponto «Atualizado» só aparece junto do texto.
- **Pontos de quebra por contêiner**: o `Masthead` é contêiner de consulta e tem largura intrínseca zero; o `ArticleTopBar` fixa a coluna central em `2fr` (uma coluna `auto` a espremeria a nada e o nome da publicação quebraria em três linhas). Medido no `NewsApp` em 30/09/2026: só a inspeção visual acusou — os testes passavam.
- **Alvos de foco programático sem contorno**: ao abrir uma matéria o foco vai ao `h1` (`tabIndex -1`) e, nas demais telas, ao `main`; ambos não desenham contorno, porque não são alvos do teclado.
- **Modal fecha pelo véu e a carta usa folha no compacto**: diferente da galeria, o `Modal` é um diálogo informativo e fecha pelo véu (só se o gesto inteiro começou e terminou nele); abaixo de 640px de contêiner a carta usa `BottomSheet`. A foto ampliada é sempre `Modal`.
- **`TextArea` conta code points**: sem `minLength` e `maxLength` nativos (medem UTF-16); o excesso é cortado por code points no `onChange`, escrevendo no nó.
- **Progresso de leitura**: `setProgress` só vai a `onAction` a cada 5 pontos e só para a frente; `markRead` sai uma vez, ao passar de 80% (matéria que cabe inteira na tela conta como lida após 400ms).
- **`readingMinutes` das fixtures é fixo**, e não bate com `ujnReadingTime(body)` (os corpos de demonstração são curtos); um produto deve derivar o valor dos blocos.
- **Um `play` que clica e depois usa Tab parte do foco do clique**: clicar num botão desabilitado ou numa etiqueta-botão move o foco; o teste devolve o foco antes do Tab.

## 16. Design System Unooblog (Seção `Unooblog` do Storybook)

O **Unooblog** é o blog da Plataforma Unooria: leitura longa em coluna única, sumário lateral, séries, tópicos, autoria, comentários em fio e newsletter. A identidade é a da plataforma — paleta roxa, Open Sans e Material Symbols, em tema claro e escuro — e a **composição é própria**. Criado em 2026-09-30, o módulo publica também o **aplicativo completo** (`BlogApp`), pronto para rodar dentro do mockup de desktop (`DesktopFrame`) ou de celular (`PhoneFrame`).

### 16.1. Origem, Motivo e Regras
- **Origem**: não há arquivo Figma. A identidade vem da Plataforma Unooria (seção 2.13); a estrutura de componentes e do aplicativo segue o **padrão do Unoojornal** (seção 15), com o desenho próprio do blog.
- **Distinto do Unoojornal por composição, não só por cor**: o jornal é institucional e periódico (faixa de edição, capa, seções, fio duplo, cartões retos, papel lavanda); o blog é de **autoria e de leitura longa** — página branca com cartões lavanda, cantos macios, coluna de ~68 caracteres com sumário que acompanha a rolagem, autor sempre presente, séries, tópicos, comentários em fio, código em superfície escura. Os dois módulos coexistem e **nenhum consome o outro**: os componentes genéricos (`Button`, `TextField`, `Modal`…) nasceram de cópias do jornal e foram redesenhados.
- **Sem bitmap de terceiros**: `public/unooblog/` guarda 12 capas SVG 16:9 e 6 retratos, geradas da paleta da Unooria por `scripts/gerar-ilustracoes-unooblog.mjs` (com semente). Tudo entra por prop (`coverSrc`, `avatarSrc`), **nunca embutido no pacote**.
- **Nome fictício só nas fixtures**: «Caderno Aberto» vive em `stories/unooblog/fixtures.ts`; os componentes recebem o nome do site por prop.
- **Data fixa nas estórias**: `ublDemoNow` é 30/09/2026 10:00, em São Paulo. Toda data é lida num **fuso explícito** (`UBL_DEFAULT_TIME_ZONE`), com nomes de mês e de dia em tabelas fixas, sem `Intl`.
- **Sobreposições ficam na tela, não na janela**: diálogo, folha, aviso e menu são `position: absolute` dentro do contêiner posicionado mais próximo (a tela do `PhoneFrame` ou do `DesktopFrame`). **É PROIBIDO usar portal.**
- **O texto do post é uma lista de blocos tipados, não HTML**: o `PostBody` renderiza `UblBlock`, e o sumário lê os mesmos blocos. Nenhum componente usa `dangerouslySetInnerHTML`.
- **O aplicativo não troca o tema por conta própria**: o botão do cabeçalho chama `onToggleTheme` e `themeMode` só escolhe o glifo; quem decide o `data-ubl-theme` é o contêiner.
- **Idioma**: todo texto padrão é pt-BR.

### 16.2. Títulos das Estórias
- **Fundamentos**: `Unooblog/Fundamentos/[Cores | Tipografia | Espaçamento & Layout | Elevação & Gradientes | Ícones]`.
- **Componentes**: `Unooblog/Componentes/[NomeComponente]`.
- **Telas compostas**: `Unooblog/Telas/Telas Compostas` — todas são o `BlogApp` real, em `DesktopFrame` ou `PhoneFrame`; as que dependem de interação chegam ao estado pelo `play`, clicando como uma pessoa faria. Nenhuma tela é réplica desenhada à parte.

### 16.3. Componentes Oficiais (45)
**Fundação**: `Icon`, `Logo`, `Avatar` (`AvatarGroup`), `Button`, `IconButton`, `Divider`, `Badge`, `TopicChip`, `SegmentedControl`.
**Navegação**: `SiteHeader`, `SiteFooter`, `Breadcrumb`, `Pagination`, `SearchField`, `TableOfContents`, `ReadingProgress`.
**Feed**: `PostMeta`, `PostCard` (`cover`, `horizontal`, `compact`, `featured`), `PostList`, `SeriesCard`, `TopicCloud`, `AuthorCard`, `NewsletterSignup`.
**Leitura**: `PostHeader`, `PostBody`, `CodeBlock`, `Callout`, `Blockquote`, `Figure`, `ShareBar`, `ReactionBar`, `PostNavigation`, `RelatedPosts`.
**Comentários**: `CommentItem`, `CommentThread`, `CommentComposer`.
**Camadas, avisos e formulário**: `Toast`, `Modal`, `BottomSheet`, `EmptyState`, `TextField`, `TextArea`.
**Documentação**: `DesktopFrame`, `PhoneFrame`. **Aplicativo**: `BlogApp`.

- **Modelo editorial compartilhado** em `src/unooblog/content/`: `UblPost`, `UblAuthor`, `UblTopic`, `UblSeries`, `UblComment`, `UblBlock` (`paragraph`, `heading`, `quote`, `code`, `callout`, `figure`, `list`) e os utilitários `ublFormatDate`, `ublTimeAgo`, `ublReadingTime`, `ublNormalizeSearch`, `ublMatchesQuery`, `ublHeadingId`, `ublTableOfContents` e `ublCodePoints`. **Datas SEMPRE por esses utilitários.**
- **Hooks** em `src/unooblog/hooks/`: `useModalFocus` (com pilha de camadas) e `useControllableState`, cópias dos do Unoojornal — um módulo de marca nunca consome outro.
- **`BlogApp`**: início com destaque, tópicos e séries; post com sumário, progresso, reações, autoria, navegação, relacionados e comentários; tópicos, séries, autores, busca e salvos. O estado é guardado por um redutor puro exportado (`blogState.ts`: `ublBlogReducer`, `ublCreateBlogState` e os seletores `ublSelectLatest`, `-Featured`, `-Saved`, `-ByTopic`, `-ByAuthor`, `-BySeries`, `-Related`, `-Comments`, `-Unread`, `ublCommentCount`, `ublLikeCount`, `ublFollowerCount`, `ublTopicCounts` e os validadores `ublValidateComment` e `ublValidateEmail`); `onAction` recebe cada operação antes de ela acontecer e `onStateChange`, o estado depois. **«Desfazer»** vale para excluir comentário e remover dos salvos (a ação `replace` devolve o estado inteiro). Busca sem acento e por início de palavra; o comentário conta em **code points** (1 a 1000).
- **Campos de entrada** (seção 4.5.1): `TextField`, `TextArea`, `SearchField`, `CommentComposer` e `NewsletterSignup` só são controlados quando o consumidor passa `value`; as estórias `play` guardam a regra.
- **Diálogo composto se nomeia sozinho** (seção 4.3): `Modal` e `BottomSheet` ligam `aria-labelledby` ao título renderizado.
- **Fronteira cliente/servidor** (seção 4.5): 19 dos 45 componentes rodam como Server Components (medido em 2026-09-30 sobre a 0.2.9); são `'use client'` os que têm estado, efeito ou repassam função a um filho.
- **É PROIBIDO ampliar esse conjunto sem registrar a decisão** na estória correspondente, com o `UblDocDecisions`.

### 16.4. Iconografia: Biblioteca da Unooria
- **REGRA CRÍTICA / PROIBIDO**: nenhum glifo pode ser desenhado à mão, aproximado ou trazido de outra biblioteca. O registro `src/unooblog/components/Icon/IconGlyphs.ts` (`ublIcons`) aponta cada nome para uma **ligadura do Material Symbols Rounded, peso 300** (com `filled` quando o estado exige), conferida no quadro `6024:2923` (`src/unooria/tokens/figma_icons_node_6024_2923.json`). **Todo nome do registro existe nesse quadro**; o sumário usa `toc`.
- **Substitutos**, porque o quadro não publica o glifo: tema claro → `wb_sunny` (não há `light_mode`), expandir → `keyboard_arrow_down` (não há `expand_more`), salvar em repouso → `bookmark` sem preenchimento (não há `bookmark_border`), desfazer → `replay`. O registro **não tem `print`**: o blog não imprime.
- **A fonte é de ligadura**: sem `@unooria/design-system/fonts/unooblog.css` (ou o Material Symbols do app), o nome do ícone aparece como texto (seção 4.6).
- **Logotipo (`Logo/LogoVector.ts`)**: marca original **Un∞blog**. O símbolo é o isótipo oficial da Unooria (copiado como literal do `Logo` do Unoojornal, o que não viola a regra 1.3) ocupando o vão do «oo»; «Un» e «blog» são **contornos de Open Sans Bold** gerados por transformação única da curva da fonte (nunca `<text>`). `viewBox` do lockup `0 0 117 25`. A técnica está no comentário do arquivo.

### 16.5. Kit de Documentação
As estórias do Unooblog usam o `UnooriaDocShell` como moldura e `.storybook/components/UblDocKit.tsx`: `UblDocGrid`, `UblDocCard`, `UblDocSpecs`, `UblDocDecisions`, `UblDocAnatomy`, `UblDocStage` (props `theme` e `surface`: `page`, `card`, `subtle`, `elevated` e `code`), `UblDocPractices`, **`UblDocThemeSwitcher`**, `UblDocPropsTable` e `UblDocTokenSwatch`. Seção 2 intitulada «Especificações técnicas»; seção 6 atendida pelo `UblDocThemeSwitcher`. Barras de seção em `#716C98` (`brandpurple-600`). O `UblDocDecisions` é obrigatório em toda estória.

### 16.6. Registro de Decisões de Design
Não há «desvios em relação ao Figma», porque não há arquivo. O que se registra, com o `UblDocDecisions` em cada estória, é toda escolha que não seja mera aplicação de um token. Decisões de 2026-09-30 com consequência ampla:
- **Página branca e cartões lavanda**, o inverso do jornal, e **cantos macios** (12/16px nos cartões, cápsula nos controles): é o que distingue o blog por composição.
- **Código sempre em superfície escura**, nos dois temas, **sem realce de sintaxe**: o bloco é uma região rolável e focável pelo teclado, com nome que cita arquivo, linguagem e linhas destacadas; copiar usa `navigator.clipboard` em try/catch e anuncia o resultado em região `aria-live`.
- **Avisos com fundo translúcido nomeado** (`opacity-*-100` da Unooria) e **tom também em texto oculto** («Dica:», «Atenção:»): o estado nunca depende só da cor; o título do aviso é parágrafo, e não cabeçalho, para não entrar no sumário.
- **Cabeçalho do site translúcido com desfoque** (`--ubl-blur-bar`, literal de `--unooria-blur-400`, como a barra da Unoogaleria): sem o desfoque o texto e o código que passam por baixo ficavam legíveis através da barra. Só a captura de tela acusou — os testes passavam.
- **`PostCard` `featured`**: o corpo (título, resumo e véu) é posicionado, porque a capa, posicionada, pintava por cima dele e o texto sumia; o véu chega ao `media-scrim` em 45% porque sobre uma capa clara o título caía na zona ainda transparente do degradê. Também só a captura acusou.
- **Tópico e série no `PostCard` são `Badge`**, e não `TopicChip`: um chip clicável dentro do cartão criaria um segundo ponto de foco; o cartão inteiro é um alvo único, pelo título.
- **O destaque do início não se repete no feed** e some quando um tópico é escolhido: evita dois botões com o mesmo nome e um cartão duplicado.
- **Progresso de leitura medido até o fim do texto**, e não da página: comentários e rodapé não contam como leitura. `setProgress` sai a cada 5 pontos e só avança; `markRead` sai uma vez, ao passar de 80%.
- **Compartilhar abre um diálogo com o link** (folha inferior no compacto) e «Copiar link»; não usa `navigator.share`, que abriria um seletor nativo que o app não controla.
- **O `CommentComposer` limpa remontando o `TextArea`**, e não escrevendo no nó: escrever por fora deixava o contador defasado, e a digitação seguinte voltava a anexar ao texto antigo (reproduzido).
- **Sumário**: itens de 36px na barra lateral (a coluna só existe no largo) e 44px no bloco recolhível do compacto; o item ativo leva barra lateral e `aria-current="location"`.
- **Contorno de controle em `border-control`** (≥ 3:1), como no jornal.
- **`readingMinutes` das fixtures é derivado do corpo** (`ublReadingTime`): os textos de demonstração são curtos e dão 2 a 4 minutos.
- **Pilha monoespaçada do sistema**: a Unooria não publica fonte monoespaçada, e uma nova exigiria arquivos de fonte e sairia da paridade.
