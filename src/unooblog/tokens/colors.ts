/**
 * Tokens de Cores do Design System Unooblog.
 *
 * Espelho TypeScript de `colors.css` (gerado da mesma tabela). Cada token traz o
 * valor nos dois temas e o nome do token da Plataforma Unooria de que o literal
 * foi copiado.
 */

/**
 * Temas suportados pelo módulo.
 */
export type UblTheme = 'light' | 'dark';

/**
 * Valor de um token em um tema, com rastreabilidade até a Plataforma Unooria.
 */
export interface UblColorValue {
  /** Literal copiado da Unooria */
  value: string;
  /** Token de origem em `src/unooria/tokens/` */
  unooria: string;
}

/**
 * Descrição de um token que muda entre os temas.
 */
export interface UblColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Agrupamento usado na documentação */
  group: string;
  /** Onde o token é aplicado no produto */
  usage: string;
  light: UblColorValue;
  dark: UblColorValue;
}

/**
 * Descrição de um token invariante entre temas.
 */
export interface UblInvariantColorToken extends UblColorValue {
  cssVar: string;
  group: string;
  usage: string;
}

/**
 * Grupos de tokens, na ordem de exibição da documentação.
 */
export const ublColorGroups = ["Superfícies","Texto","Ícones","Bordas","Ações","Marca","Overlays","Elevação","Código","Mídia","Aparelho"] as const;

/**
 * Tokens que variam entre os temas claro e escuro.
 */
export const ublColorTokens = {
  backgroundPage: {
    cssVar: '--ubl-color-background-page',
    group: "Superfícies",
    usage: "Fundo da página e da coluna de leitura",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  backgroundCard: {
    cssVar: '--ubl-color-background-card',
    group: "Superfícies",
    usage: "Cartões de post, autor, série e newsletter",
    light: { value: '#F7F6FA', unooria: '--unooria-color-brandpurple-50' },
    dark: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
  },
  backgroundSubtle: {
    cssVar: '--ubl-color-background-subtle',
    group: "Superfícies",
    usage: "Capa ainda não carregada, comentários respondidos e blocos sutis",
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  backgroundElevated: {
    cssVar: '--ubl-color-background-elevated',
    group: "Superfícies",
    usage: "Menus, folhas inferiores e diálogos",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  surfaceBar: {
    cssVar: '--ubl-color-surface-bar',
    group: "Superfícies",
    usage: "Cabeçalho do site translúcido sobre a rolagem",
    light: { value: 'rgba(255, 255, 255, 0.90)', unooria: '--unooria-color-opacity-neutrallight-900' },
    dark: { value: 'rgba(14, 16, 57, 0.90)', unooria: '--unooria-color-opacity-brandpurple-900' },
  },
  textPrimary: {
    cssVar: '--ubl-color-text-primary',
    group: "Texto",
    usage: "Títulos, corpo do post e texto de alto contraste",
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
  },
  textSecondary: {
    cssVar: '--ubl-color-text-secondary',
    group: "Texto",
    usage: "Subtítulo, resumo, autoria e metadados",
    light: { value: '#475157', unooria: '--unooria-color-neutral-700' },
    dark: { value: '#CBD4D6', unooria: '--unooria-color-neutraldark-900' },
  },
  textMuted: {
    cssVar: '--ubl-color-text-muted',
    group: "Texto",
    usage: "Tempo de leitura, legendas e espaço reservado dos campos",
    light: { value: '#536167', unooria: '--unooria-color-neutral-600' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  textAccent: {
    cssVar: '--ubl-color-text-accent',
    group: "Texto",
    usage: "Links, tópicos e ações de texto",
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  textOnAction: {
    cssVar: '--ubl-color-text-on-action',
    group: "Texto",
    usage: "Rótulo sobre o preenchimento de ação",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  textDanger: {
    cssVar: '--ubl-color-text-danger',
    group: "Texto",
    usage: "Ações destrutivas em texto e erro de campo",
    light: { value: '#C11414', unooria: '--unooria-color-danger-700' },
    dark: { value: '#FFA1A1', unooria: '--unooria-color-danger-300' },
  },
  textOnDanger: {
    cssVar: '--ubl-color-text-on-danger',
    group: "Texto",
    usage: "Rótulo sobre o botão destrutivo preenchido",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  iconPrimary: {
    cssVar: '--ubl-color-icon-primary',
    group: "Ícones",
    usage: "Glifos ativos da navegação e das barras",
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
  },
  iconSecondary: {
    cssVar: '--ubl-color-icon-secondary',
    group: "Ícones",
    usage: "Glifos de apoio e setas",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  iconAccent: {
    cssVar: '--ubl-color-icon-accent',
    group: "Ícones",
    usage: "Glifo de destaque: post salvo, autor seguido",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  borderSubtle: {
    cssVar: '--ubl-color-border-subtle',
    group: "Bordas",
    usage: "Divisores e contorno de cartão",
    light: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  borderDefault: {
    cssVar: '--ubl-color-border-default',
    group: "Bordas",
    usage: "Contorno de superfície e de controle desabilitado",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  borderControl: {
    cssVar: '--ubl-color-border-control',
    group: "Bordas",
    usage: "Contorno de campo e de controle (gráfico ≥ 3:1)",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  actionPrimary: {
    cssVar: '--ubl-color-action-primary',
    group: "Ações",
    usage: "Botão primário, item ativo, progresso de leitura e sumário ativo",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  actionPressed: {
    cssVar: '--ubl-color-action-pressed',
    group: "Ações",
    usage: "Estado pressionado da ação primária",
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  actionDisabled: {
    cssVar: '--ubl-color-action-disabled',
    group: "Ações",
    usage: "Ação primária desabilitada",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  actionDanger: {
    cssVar: '--ubl-color-action-danger',
    group: "Ações",
    usage: "Botão destrutivo preenchido",
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
  },
  fillField: {
    cssVar: '--ubl-color-fill-field',
    group: "Ações",
    usage: "Preenchimento de campo, de chip e do controle segmentado",
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  stateHover: {
    cssVar: '--ubl-color-state-hover',
    group: "Ações",
    usage: "Realce de hover sobre qualquer superfície",
    light: { value: 'rgba(14, 16, 57, 0.05)', unooria: '--unooria-color-opacity-brandpurple-50' },
    dark: { value: 'rgba(255, 255, 255, 0.10)', unooria: '--unooria-color-opacity-neutrallight-100' },
  },
  statePressed: {
    cssVar: '--ubl-color-state-pressed',
    group: "Ações",
    usage: "Realce de pressionado sobre qualquer superfície",
    light: { value: 'rgba(14, 16, 57, 0.10)', unooria: '--unooria-color-opacity-brandpurple-100' },
    dark: { value: 'rgba(255, 255, 255, 0.20)', unooria: '--unooria-color-opacity-neutrallight-200' },
  },
  focusRing: {
    cssVar: '--ubl-color-focus-ring',
    group: "Ações",
    usage: "Anel de foco de 2px (gráfico ≥ 3:1)",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  brandLike: {
    cssVar: '--ubl-color-brand-like',
    group: "Marca",
    usage: "Coração de curtida quando ativo",
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
  },
  statusInfo: {
    cssVar: '--ubl-color-status-info',
    group: "Marca",
    usage: "Barra e glifo do aviso informativo",
    light: { value: '#005CE6', unooria: '--unooria-color-info-700' },
    dark: { value: '#26D4FF', unooria: '--unooria-color-info-300' },
  },
  statusSuccess: {
    cssVar: '--ubl-color-status-success',
    group: "Marca",
    usage: "Barra e glifo da dica e confirmação de inscrição",
    light: { value: '#008257', unooria: '--unooria-color-success-700' },
    dark: { value: '#26E197', unooria: '--unooria-color-success-400' },
  },
  statusWarning: {
    cssVar: '--ubl-color-status-warning',
    group: "Marca",
    usage: "Barra e glifo do aviso de atenção",
    light: { value: '#B73506', unooria: '--unooria-color-warning-700' },
    dark: { value: '#FFB74A', unooria: '--unooria-color-warning-300' },
  },
  fillInfo: {
    cssVar: '--ubl-color-fill-info',
    group: "Marca",
    usage: "Fundo translúcido do aviso informativo",
    light: { value: 'rgba(0, 134, 255, 0.10)', unooria: '--unooria-color-opacity-info-100' },
    dark: { value: 'rgba(0, 134, 255, 0.10)', unooria: '--unooria-color-opacity-info-100' },
  },
  fillSuccess: {
    cssVar: '--ubl-color-fill-success',
    group: "Marca",
    usage: "Fundo translúcido da dica",
    light: { value: 'rgba(1, 181, 116, 0.10)', unooria: '--unooria-color-opacity-success-100' },
    dark: { value: 'rgba(1, 181, 116, 0.10)', unooria: '--unooria-color-opacity-success-100' },
  },
  fillWarning: {
    cssVar: '--ubl-color-fill-warning',
    group: "Marca",
    usage: "Fundo translúcido do aviso de atenção",
    light: { value: 'rgba(249, 118, 7, 0.10)', unooria: '--unooria-color-opacity-warning-100' },
    dark: { value: 'rgba(249, 118, 7, 0.10)', unooria: '--unooria-color-opacity-warning-100' },
  },
  overlayScrim: {
    cssVar: '--ubl-color-overlay-scrim',
    group: "Overlays",
    usage: "Véu atrás de folhas e diálogos",
    light: { value: 'rgba(14, 16, 57, 0.50)', unooria: '--unooria-color-opacity-brandpurple-500' },
    dark: { value: 'rgba(14, 16, 57, 0.70)', unooria: '--unooria-color-opacity-brandpurple-700' },
  },
  toastSurface: {
    cssVar: '--ubl-color-toast-surface',
    group: "Overlays",
    usage: "Fundo do aviso passageiro (cores invertidas)",
    light: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
    dark: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
  },
  toastText: {
    cssVar: '--ubl-color-toast-text',
    group: "Overlays",
    usage: "Texto do aviso passageiro",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  toastAction: {
    cssVar: '--ubl-color-toast-action',
    group: "Overlays",
    usage: "Ação do aviso passageiro (\"Desfazer\")",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  elevationOverlay: {
    cssVar: '--ubl-elevation-overlay',
    group: "Elevação",
    usage: "Menus, folhas, diálogos e avisos",
    light: { value: '0px 0px 10px 0px rgba(14, 16, 57, 0.3)', unooria: '--unooria-elevation-brand-secondary' },
    dark: { value: '0px 0px 8px 4px rgba(255, 255, 255, 0.1)', unooria: '--unooria-elevation-neutral-2' },
  },
} as const satisfies Record<string, UblColorToken>;

export type UblColorKey = keyof typeof ublColorTokens;

/**
 * Tokens invariantes entre os temas.
 */
export const ublInvariantColors = {
  codeSurface: {
    cssVar: '--ubl-color-code-surface',
    group: "Código",
    usage: "Fundo do bloco de código, nos dois temas",
    value: '#080922',
    unooria: '--unooria-color-brandpurple-950',
  },
  codeText: {
    cssVar: '--ubl-color-code-text',
    group: "Código",
    usage: "Texto do bloco de código",
    value: '#FFFFFF',
    unooria: '--unooria-color-neutral-50',
  },
  codeTextMuted: {
    cssVar: '--ubl-color-code-text-muted',
    group: "Código",
    usage: "Nome do arquivo, linguagem e numeração das linhas",
    value: '#CCC9DE',
    unooria: '--unooria-color-brandpurple-300',
  },
  codeAccent: {
    cssVar: '--ubl-color-code-accent',
    group: "Código",
    usage: "Linha destacada e confirmação de cópia",
    value: '#AAA5C2',
    unooria: '--unooria-color-brandpurple-400',
  },
  codeBorder: {
    cssVar: '--ubl-color-code-border',
    group: "Código",
    usage: "Fio entre a barra e o corpo do bloco de código",
    value: 'rgba(255, 255, 255, 0.30)',
    unooria: '--unooria-color-opacity-neutrallight-300',
  },
  codeControl: {
    cssVar: '--ubl-color-code-control',
    group: "Código",
    usage: "Fundo do botão de copiar em hover",
    value: 'rgba(255, 255, 255, 0.20)',
    unooria: '--unooria-color-opacity-neutrallight-200',
  },
  mediaScrim: {
    cssVar: '--ubl-color-media-scrim',
    group: "Mídia",
    usage: "Véu da base da capa, atrás de texto sobre a mídia",
    value: 'rgba(14, 16, 57, 0.60)',
    unooria: '--unooria-color-opacity-brandpurple-600',
  },
  mediaText: {
    cssVar: '--ubl-color-media-text',
    group: "Mídia",
    usage: "Texto sobre a capa (sempre branco)",
    value: '#FFFFFF',
    unooria: '--unooria-color-neutral-50',
  },
  deviceBody: {
    cssVar: '--ubl-color-device-body',
    group: "Aparelho",
    usage: "Corpo do aparelho do mockup e ilha da câmera",
    value: '#080922',
    unooria: '--unooria-color-brandpurple-950',
  },
  deviceEdge: {
    cssVar: '--ubl-color-device-edge',
    group: "Aparelho",
    usage: "Aro metálico do aparelho",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
  deviceButton: {
    cssVar: '--ubl-color-device-button',
    group: "Aparelho",
    usage: "Botões laterais do aparelho",
    value: '#57547D',
    unooria: '--unooria-color-brandpurple-700',
  },
  deviceLens: {
    cssVar: '--ubl-color-device-lens',
    group: "Aparelho",
    usage: "Lente da câmera frontal",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
  deviceChrome: {
    cssVar: '--ubl-color-device-chrome',
    group: "Aparelho",
    usage: "Barra do navegador do mockup de área de trabalho",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
  deviceChromeField: {
    cssVar: '--ubl-color-device-chrome-field',
    group: "Aparelho",
    usage: "Campo de endereço do mockup de área de trabalho",
    value: '#0E1039',
    unooria: '--unooria-color-brandpurple-900',
  },
  deviceChromeText: {
    cssVar: '--ubl-color-device-chrome-text',
    group: "Aparelho",
    usage: "Texto do endereço no mockup de área de trabalho",
    value: '#CBD4D6',
    unooria: '--unooria-color-neutraldark-900',
  },
} as const satisfies Record<string, UblInvariantColorToken>;

export type UblInvariantColorKey = keyof typeof ublInvariantColors;

/**
 * Valores resolvidos de cada tema, por chave.
 */
export const ublColorThemes: Record<UblTheme, Record<UblColorKey, string>> = {
  light: Object.fromEntries(
    Object.entries(ublColorTokens).map(([key, token]) => [key, token.light.value])
  ) as Record<UblColorKey, string>,
  dark: Object.fromEntries(
    Object.entries(ublColorTokens).map(([key, token]) => [key, token.dark.value])
  ) as Record<UblColorKey, string>,
};

/**
 * Referências `var(--ubl-…)` prontas para uso em estilos inline.
 */
export const ublColorCssVars = Object.fromEntries(
  [...Object.entries(ublColorTokens), ...Object.entries(ublInvariantColors)].map(([key, token]) => [
    key,
    `var(${token.cssVar})`,
  ])
) as Record<UblColorKey | UblInvariantColorKey, string>;

/**
 * Gradientes compostos do módulo.
 */
export const ublGradients = {
  mediaBottom: { cssVar: '--ubl-gradient-media-bottom', usage: "Véu da base da capa, atrás do título sobre a mídia" },
} as const;

/**
 * Par de contraste medido nos dois temas.
 */
export interface UblContrastPair {
  /** Chave do token de frente */
  foreground: string;
  /** Chave do fundo; `a@b` é a camada a composta sobre b */
  background: string;
  /** 'text' exige 4,5:1; 'graphic', 3:1 (WCAG 1.4.3 e 1.4.11) */
  kind: 'text' | 'graphic';
  minimum: number;
  light: number;
  dark: number;
  usage: string;
}

/**
 * Pares de uso real e a razão de contraste medida em cada tema. O script que
 * gera este arquivo recusa gravar se algum par ficar abaixo do mínimo.
 */
export const ublContrastPairs: readonly UblContrastPair[] = [
  {foreground: "textPrimary",background: "backgroundPage",kind: "text",minimum: 4.5,light: 15.09,dark: 17.96,usage: "Título e corpo do post"},
  {foreground: "textSecondary",background: "backgroundPage",kind: "text",minimum: 4.5,light: 8.13,dark: 12.99,usage: "Subtítulo, resumo e metadado"},
  {foreground: "textMuted",background: "backgroundPage",kind: "text",minimum: 4.5,light: 6.42,dark: 9.28,usage: "Tempo de leitura, legenda e espaço reservado"},
  {foreground: "textAccent",background: "backgroundPage",kind: "text",minimum: 4.5,light: 7.07,dark: 12.1,usage: "Link, tópico e ação de texto"},
  {foreground: "textDanger",background: "backgroundPage",kind: "text",minimum: 4.5,light: 6.22,dark: 10.13,usage: "Ação destrutiva e erro de campo"},
  {foreground: "iconSecondary",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.96,dark: 9.28,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.88,dark: 8.27,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.88,dark: 8.27,usage: "Limite do controle selecionado e preenchimento do progresso"},
  {foreground: "borderControl",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.96,dark: 9.28,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.88,dark: 12.1,usage: "Anel de foco"},
  {foreground: "brandLike",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.74,dark: 7.01,usage: "Coração de curtida ativo"},
  {foreground: "textPrimary",background: "backgroundCard",kind: "text",minimum: 4.5,light: 14.02,dark: 16.72,usage: "Título e corpo do post"},
  {foreground: "textSecondary",background: "backgroundCard",kind: "text",minimum: 4.5,light: 7.56,dark: 12.09,usage: "Subtítulo, resumo e metadado"},
  {foreground: "textMuted",background: "backgroundCard",kind: "text",minimum: 4.5,light: 5.96,dark: 8.64,usage: "Tempo de leitura, legenda e espaço reservado"},
  {foreground: "textAccent",background: "backgroundCard",kind: "text",minimum: 4.5,light: 6.57,dark: 11.27,usage: "Link, tópico e ação de texto"},
  {foreground: "textDanger",background: "backgroundCard",kind: "text",minimum: 4.5,light: 5.78,dark: 9.43,usage: "Ação destrutiva e erro de campo"},
  {foreground: "iconSecondary",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.61,dark: 8.64,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.54,dark: 7.7,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.54,dark: 7.7,usage: "Limite do controle selecionado e preenchimento do progresso"},
  {foreground: "borderControl",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.61,dark: 8.64,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.54,dark: 11.27,usage: "Anel de foco"},
  {foreground: "brandLike",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.41,dark: 6.53,usage: "Coração de curtida ativo"},
  {foreground: "textPrimary",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 15.09,dark: 10.43,usage: "Título e corpo do post"},
  {foreground: "textSecondary",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 8.13,dark: 7.54,usage: "Subtítulo, resumo e metadado"},
  {foreground: "textMuted",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 6.42,dark: 5.39,usage: "Tempo de leitura, legenda e espaço reservado"},
  {foreground: "textAccent",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 7.07,dark: 7.03,usage: "Link, tópico e ação de texto"},
  {foreground: "textDanger",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 6.22,dark: 5.88,usage: "Ação destrutiva e erro de campo"},
  {foreground: "iconSecondary",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.96,dark: 5.39,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 4.8,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 4.8,usage: "Limite do controle selecionado e preenchimento do progresso"},
  {foreground: "borderControl",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.96,dark: 5.39,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 7.03,usage: "Anel de foco"},
  {foreground: "brandLike",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.74,dark: 4.07,usage: "Coração de curtida ativo"},
  {foreground: "textPrimary",background: "backgroundSubtle",kind: "text",minimum: 4.5,light: 13.09,dark: 10.43,usage: "Texto sobre bloco sutil"},
  {foreground: "textSecondary",background: "backgroundSubtle",kind: "text",minimum: 4.5,light: 7.05,dark: 7.54,usage: "Metadado sobre bloco sutil"},
  {foreground: "textMuted",background: "backgroundSubtle",kind: "text",minimum: 4.5,light: 5.57,dark: 5.39,usage: "Legenda sobre bloco sutil"},
  {foreground: "textAccent",background: "backgroundSubtle",kind: "text",minimum: 4.5,light: 6.14,dark: 7.03,usage: "Ação de texto sobre bloco sutil"},
  {foreground: "textPrimary",background: "fillField@backgroundPage",kind: "text",minimum: 4.5,light: 13.09,dark: 10.43,usage: "Texto em chip e campo"},
  {foreground: "textMuted",background: "fillField@backgroundPage",kind: "text",minimum: 4.5,light: 5.57,dark: 5.39,usage: "Espaço reservado do campo de busca"},
  {foreground: "textAccent",background: "fillField@backgroundCard",kind: "text",minimum: 4.5,light: 6.14,dark: 7.03,usage: "Chip de tópico"},
  {foreground: "textPrimary",background: "surfaceBar@backgroundPage",kind: "text",minimum: 4.5,light: 15.09,dark: 16.86,usage: "Navegação no cabeçalho translúcido"},
  {foreground: "textSecondary",background: "surfaceBar@backgroundPage",kind: "text",minimum: 4.5,light: 8.13,dark: 12.19,usage: "Item inativo no cabeçalho translúcido"},
  {foreground: "textOnAction",background: "actionPrimary",kind: "text",minimum: 4.5,light: 4.88,dark: 8.27,usage: "Rótulo do botão primário"},
  {foreground: "textOnAction",background: "actionPressed",kind: "text",minimum: 4.5,light: 7.07,dark: 12.1,usage: "Rótulo do botão primário pressionado"},
  {foreground: "textOnDanger",background: "actionDanger",kind: "text",minimum: 4.5,light: 4.74,dark: 7.01,usage: "Rótulo do botão destrutivo"},
  {foreground: "textPrimary",background: "fillInfo@backgroundPage",kind: "text",minimum: 4.5,light: 13.37,dark: 16.36,usage: "Texto do aviso informativo"},
  {foreground: "textPrimary",background: "fillSuccess@backgroundPage",kind: "text",minimum: 4.5,light: 13.65,dark: 16.15,usage: "Texto da dica"},
  {foreground: "textPrimary",background: "fillWarning@backgroundPage",kind: "text",minimum: 4.5,light: 13.65,dark: 16.31,usage: "Texto do aviso de atenção"},
  {foreground: "statusInfo",background: "fillInfo@backgroundPage",kind: "graphic",minimum: 3,light: 5.06,dark: 10.14,usage: "Barra e glifo do aviso informativo"},
  {foreground: "statusSuccess",background: "fillSuccess@backgroundPage",kind: "graphic",minimum: 3,light: 4.39,dark: 10.31,usage: "Barra e glifo da dica"},
  {foreground: "statusWarning",background: "fillWarning@backgroundPage",kind: "graphic",minimum: 3,light: 5.39,dark: 10.26,usage: "Barra e glifo do aviso de atenção"},
  {foreground: "statusSuccess",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.51,dark: 10.68,usage: "Confirmação de inscrição"},
  {foreground: "toastText",background: "toastSurface",kind: "text",minimum: 4.5,light: 18.23,dark: 16.99,usage: "Texto do aviso"},
  {foreground: "toastAction",background: "toastSurface",kind: "text",minimum: 4.5,light: 11.27,dark: 6.14,usage: "Ação do aviso"},
  {foreground: "codeText",background: "codeSurface",kind: "text",minimum: 4.5,light: 19.58,dark: 19.58,usage: "Código"},
  {foreground: "codeTextMuted",background: "codeSurface",kind: "text",minimum: 4.5,light: 12.1,dark: 12.1,usage: "Nome do arquivo e numeração das linhas"},
  {foreground: "codeAccent",background: "codeSurface",kind: "text",minimum: 4.5,light: 8.27,dark: 8.27,usage: "Confirmação de cópia"},
  {foreground: "codeText",background: "codeControl@codeSurface",kind: "text",minimum: 4.5,light: 11.07,dark: 11.07,usage: "Botão de copiar em hover"},
  {foreground: "deviceChromeText",background: "deviceChromeField",kind: "text",minimum: 4.5,light: 12.09,dark: 12.09,usage: "Endereço no mockup de área de trabalho"},
  {foreground: "mediaText",background: "mediaScrim@branco",kind: "text",minimum: 4.5,light: 4.86,dark: 4.86,usage: "Título sobre a capa (pior caso: capa branca)"},
];
