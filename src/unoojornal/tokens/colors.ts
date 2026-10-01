/**
 * Tokens de Cores do Design System Unoojornal.
 *
 * Espelho TypeScript de `colors.css` (gerado da mesma tabela). Cada token traz o
 * valor nos dois temas e o nome do token da Plataforma Unooria de que o literal
 * foi copiado.
 */

/**
 * Temas suportados pelo módulo.
 */
export type UjnTheme = 'light' | 'dark';

/**
 * Valor de um token em um tema, com rastreabilidade até a Plataforma Unooria.
 */
export interface UjnColorValue {
  /** Literal copiado da Unooria */
  value: string;
  /** Token de origem em `src/unooria/tokens/` */
  unooria: string;
}

/**
 * Descrição de um token que muda entre os temas.
 */
export interface UjnColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Agrupamento usado na documentação */
  group: string;
  /** Onde o token é aplicado no produto */
  usage: string;
  light: UjnColorValue;
  dark: UjnColorValue;
}

/**
 * Descrição de um token invariante entre temas.
 */
export interface UjnInvariantColorToken extends UjnColorValue {
  cssVar: string;
  group: string;
  usage: string;
}

/**
 * Grupos de tokens, na ordem de exibição da documentação.
 */
export const ujnColorGroups = ["Superfícies","Texto","Ícones","Bordas","Ações","Marca","Overlays","Elevação","Rodapé","Mídia","Aparelho"] as const;

/**
 * Tokens que variam entre os temas claro e escuro.
 */
export const ujnColorTokens = {
  backgroundPage: {
    cssVar: '--ujn-color-background-page',
    group: "Superfícies",
    usage: "Fundo da página: o papel atrás das colunas",
    light: { value: '#F7F6FA', unooria: '--unooria-color-brandpurple-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  backgroundCard: {
    cssVar: '--ujn-color-background-card',
    group: "Superfícies",
    usage: "Cartões, caixas laterais e a coluna de leitura",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
  },
  backgroundSubtle: {
    cssVar: '--ujn-color-background-subtle',
    group: "Superfícies",
    usage: "Mídia ainda não carregada, tarja de data e blocos sutis",
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  backgroundElevated: {
    cssVar: '--ujn-color-background-elevated',
    group: "Superfícies",
    usage: "Menus, folhas inferiores e diálogos",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  surfaceBar: {
    cssVar: '--ujn-color-surface-bar',
    group: "Superfícies",
    usage: "Barra superior translúcida do leitor de matéria",
    light: { value: 'rgba(255, 255, 255, 0.90)', unooria: '--unooria-color-opacity-neutrallight-900' },
    dark: { value: 'rgba(14, 16, 57, 0.90)', unooria: '--unooria-color-opacity-brandpurple-900' },
  },
  textPrimary: {
    cssVar: '--ujn-color-text-primary',
    group: "Texto",
    usage: "Títulos, rótulos e texto de alto contraste",
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
  },
  textSecondary: {
    cssVar: '--ujn-color-text-secondary',
    group: "Texto",
    usage: "Resumos, autoria, datas e metadados",
    light: { value: '#475157', unooria: '--unooria-color-neutral-700' },
    dark: { value: '#CBD4D6', unooria: '--unooria-color-neutraldark-900' },
  },
  textMuted: {
    cssVar: '--ujn-color-text-muted',
    group: "Texto",
    usage: "Tempo de leitura, legendas e espaço reservado dos campos",
    light: { value: '#536167', unooria: '--unooria-color-neutral-600' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  textAccent: {
    cssVar: '--ujn-color-text-accent',
    group: "Texto",
    usage: "Kicker, links e ações de texto",
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  textOnAction: {
    cssVar: '--ujn-color-text-on-action',
    group: "Texto",
    usage: "Rótulo sobre o preenchimento de ação e sobre a pílula selecionada",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  textDanger: {
    cssVar: '--ujn-color-text-danger',
    group: "Texto",
    usage: "Ações destrutivas em texto e erro de campo",
    light: { value: '#C11414', unooria: '--unooria-color-danger-700' },
    dark: { value: '#FFA1A1', unooria: '--unooria-color-danger-300' },
  },
  textOnDanger: {
    cssVar: '--ujn-color-text-on-danger',
    group: "Texto",
    usage: "Rótulo sobre o botão destrutivo preenchido",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  iconPrimary: {
    cssVar: '--ujn-color-icon-primary',
    group: "Ícones",
    usage: "Glifos ativos da navegação e das barras",
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
  },
  iconSecondary: {
    cssVar: '--ujn-color-icon-secondary',
    group: "Ícones",
    usage: "Glifos de apoio e setas",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  iconAccent: {
    cssVar: '--ujn-color-icon-accent',
    group: "Ícones",
    usage: "Glifo de destaque: matéria salva, item ativo",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  borderSubtle: {
    cssVar: '--ujn-color-border-subtle',
    group: "Bordas",
    usage: "Divisores entre itens da lista e contorno de cartão",
    light: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  borderDefault: {
    cssVar: '--ujn-color-border-default',
    group: "Bordas",
    usage: "Contorno do botão secundário e da pílula em repouso",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  borderRule: {
    cssVar: '--ujn-color-border-rule',
    group: "Bordas",
    usage: "Fio grosso e fio duplo do cabeçalho: a tinta do jornal (gráfico ≥ 3:1)",
    light: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
    dark: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
  },
  borderControl: {
    cssVar: '--ujn-color-border-control',
    group: "Bordas",
    usage: "Contorno de campo e de controle (gráfico ≥ 3:1)",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  actionPrimary: {
    cssVar: '--ujn-color-action-primary',
    group: "Ações",
    usage: "Botão primário, pílula selecionada, progresso de leitura e item ativo",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  actionPressed: {
    cssVar: '--ujn-color-action-pressed',
    group: "Ações",
    usage: "Estado pressionado da ação primária",
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  actionDisabled: {
    cssVar: '--ujn-color-action-disabled',
    group: "Ações",
    usage: "Ação primária desabilitada",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  actionDanger: {
    cssVar: '--ujn-color-action-danger',
    group: "Ações",
    usage: "Botão destrutivo preenchido",
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
  },
  fillField: {
    cssVar: '--ujn-color-fill-field',
    group: "Ações",
    usage: "Preenchimento de campo, de etiqueta de destaque e de pílula em repouso",
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  stateHover: {
    cssVar: '--ujn-color-state-hover',
    group: "Ações",
    usage: "Realce de hover sobre qualquer superfície",
    light: { value: 'rgba(14, 16, 57, 0.05)', unooria: '--unooria-color-opacity-brandpurple-50' },
    dark: { value: 'rgba(255, 255, 255, 0.10)', unooria: '--unooria-color-opacity-neutrallight-100' },
  },
  statePressed: {
    cssVar: '--ujn-color-state-pressed',
    group: "Ações",
    usage: "Realce de pressionado sobre qualquer superfície",
    light: { value: 'rgba(14, 16, 57, 0.10)', unooria: '--unooria-color-opacity-brandpurple-100' },
    dark: { value: 'rgba(255, 255, 255, 0.20)', unooria: '--unooria-color-opacity-neutrallight-200' },
  },
  focusRing: {
    cssVar: '--ujn-color-focus-ring',
    group: "Ações",
    usage: "Anel de foco de 2px (gráfico ≥ 3:1)",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  statusLive: {
    cssVar: '--ujn-color-status-live',
    group: "Marca",
    usage: "Marcador \"Atualizado agora\" e confirmação de envio da carta",
    light: { value: '#008257', unooria: '--unooria-color-success-700' },
    dark: { value: '#26E197', unooria: '--unooria-color-success-400' },
  },
  statusWarning: {
    cssVar: '--ujn-color-status-warning',
    group: "Marca",
    usage: "Nota de correção publicada",
    light: { value: '#B73506', unooria: '--unooria-color-warning-700' },
    dark: { value: '#FFB74A', unooria: '--unooria-color-warning-300' },
  },
  overlayScrim: {
    cssVar: '--ujn-color-overlay-scrim',
    group: "Overlays",
    usage: "Véu atrás de folhas e diálogos",
    light: { value: 'rgba(14, 16, 57, 0.50)', unooria: '--unooria-color-opacity-brandpurple-500' },
    dark: { value: 'rgba(14, 16, 57, 0.70)', unooria: '--unooria-color-opacity-brandpurple-700' },
  },
  toastSurface: {
    cssVar: '--ujn-color-toast-surface',
    group: "Overlays",
    usage: "Fundo do aviso passageiro (cores invertidas)",
    light: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
    dark: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
  },
  toastText: {
    cssVar: '--ujn-color-toast-text',
    group: "Overlays",
    usage: "Texto do aviso passageiro",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  toastAction: {
    cssVar: '--ujn-color-toast-action',
    group: "Overlays",
    usage: "Ação do aviso passageiro (\"Desfazer\")",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  elevationOverlay: {
    cssVar: '--ujn-elevation-overlay',
    group: "Elevação",
    usage: "Menus, folhas, diálogos e avisos",
    light: { value: '0px 0px 10px 0px rgba(14, 16, 57, 0.3)', unooria: '--unooria-elevation-brand-secondary' },
    dark: { value: '0px 0px 8px 4px rgba(255, 255, 255, 0.1)', unooria: '--unooria-elevation-neutral-2' },
  },
} as const satisfies Record<string, UjnColorToken>;

export type UjnColorKey = keyof typeof ujnColorTokens;

/**
 * Tokens invariantes entre os temas.
 */
export const ujnInvariantColors = {
  footerSurface: {
    cssVar: '--ujn-color-footer-surface',
    group: "Rodapé",
    usage: "Fundo do rodapé escuro, nos dois temas",
    value: '#0E1039',
    unooria: '--unooria-color-brandpurple-900',
  },
  footerText: {
    cssVar: '--ujn-color-footer-text',
    group: "Rodapé",
    usage: "Texto principal do rodapé",
    value: '#FFFFFF',
    unooria: '--unooria-color-neutral-50',
  },
  footerTextSecondary: {
    cssVar: '--ujn-color-footer-text-secondary',
    group: "Rodapé",
    usage: "Descrição e direitos autorais do rodapé",
    value: '#CCC9DE',
    unooria: '--unooria-color-brandpurple-300',
  },
  footerAccent: {
    cssVar: '--ujn-color-footer-accent',
    group: "Rodapé",
    usage: "Título das colunas e links do rodapé",
    value: '#AAA5C2',
    unooria: '--unooria-color-brandpurple-400',
  },
  footerBorder: {
    cssVar: '--ujn-color-footer-border',
    group: "Rodapé",
    usage: "Fio que separa o rodapé da última linha de direitos",
    value: 'rgba(255, 255, 255, 0.30)',
    unooria: '--unooria-color-opacity-neutrallight-300',
  },
  mediaScrim: {
    cssVar: '--ujn-color-media-scrim',
    group: "Mídia",
    usage: "Véu da base da fotografia, atrás de texto sobre a mídia",
    value: 'rgba(14, 16, 57, 0.60)',
    unooria: '--unooria-color-opacity-brandpurple-600',
  },
  mediaText: {
    cssVar: '--ujn-color-media-text',
    group: "Mídia",
    usage: "Texto sobre fotografia (sempre branco)",
    value: '#FFFFFF',
    unooria: '--unooria-color-neutral-50',
  },
  deviceBody: {
    cssVar: '--ujn-color-device-body',
    group: "Aparelho",
    usage: "Corpo do aparelho do mockup e ilha da câmera",
    value: '#080922',
    unooria: '--unooria-color-brandpurple-950',
  },
  deviceEdge: {
    cssVar: '--ujn-color-device-edge',
    group: "Aparelho",
    usage: "Aro metálico do aparelho",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
  deviceButton: {
    cssVar: '--ujn-color-device-button',
    group: "Aparelho",
    usage: "Botões laterais do aparelho",
    value: '#57547D',
    unooria: '--unooria-color-brandpurple-700',
  },
  deviceLens: {
    cssVar: '--ujn-color-device-lens',
    group: "Aparelho",
    usage: "Lente da câmera frontal",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
  deviceChrome: {
    cssVar: '--ujn-color-device-chrome',
    group: "Aparelho",
    usage: "Barra do navegador do mockup de área de trabalho",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
  deviceChromeField: {
    cssVar: '--ujn-color-device-chrome-field',
    group: "Aparelho",
    usage: "Campo de endereço do mockup de área de trabalho",
    value: '#0E1039',
    unooria: '--unooria-color-brandpurple-900',
  },
  deviceChromeText: {
    cssVar: '--ujn-color-device-chrome-text',
    group: "Aparelho",
    usage: "Texto do endereço no mockup de área de trabalho",
    value: '#CBD4D6',
    unooria: '--unooria-color-neutraldark-900',
  },
} as const satisfies Record<string, UjnInvariantColorToken>;

export type UjnInvariantColorKey = keyof typeof ujnInvariantColors;

/**
 * Valores resolvidos de cada tema, por chave.
 */
export const ujnColorThemes: Record<UjnTheme, Record<UjnColorKey, string>> = {
  light: Object.fromEntries(
    Object.entries(ujnColorTokens).map(([key, token]) => [key, token.light.value])
  ) as Record<UjnColorKey, string>,
  dark: Object.fromEntries(
    Object.entries(ujnColorTokens).map(([key, token]) => [key, token.dark.value])
  ) as Record<UjnColorKey, string>,
};

/**
 * Referências `var(--ujn-…)` prontas para uso em estilos inline.
 */
export const ujnColorCssVars = Object.fromEntries(
  [...Object.entries(ujnColorTokens), ...Object.entries(ujnInvariantColors)].map(([key, token]) => [
    key,
    `var(${token.cssVar})`,
  ])
) as Record<UjnColorKey | UjnInvariantColorKey, string>;

/**
 * Gradientes compostos do módulo.
 */
export const ujnGradients = {
  mediaBottom: { cssVar: '--ujn-gradient-media-bottom', usage: "Véu da base da fotografia, atrás do texto sobre a mídia" },
  ruleDouble: { cssVar: '--ujn-gradient-rule-double', usage: "Fio duplo da tinta: 3px, vão de 2px e 1px (altura total de 6px)" },
} as const;

/**
 * Par de contraste medido nos dois temas.
 */
export interface UjnContrastPair {
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
export const ujnContrastPairs: readonly UjnContrastPair[] = [
  {foreground: "textPrimary",background: "backgroundPage",kind: "text",minimum: 4.5,light: 14.02,dark: 17.96,usage: "Título e texto principal"},
  {foreground: "textSecondary",background: "backgroundPage",kind: "text",minimum: 4.5,light: 7.56,dark: 12.99,usage: "Resumo, autoria e metadado"},
  {foreground: "textMuted",background: "backgroundPage",kind: "text",minimum: 4.5,light: 5.96,dark: 9.28,usage: "Tempo de leitura, legenda e espaço reservado"},
  {foreground: "textAccent",background: "backgroundPage",kind: "text",minimum: 4.5,light: 6.57,dark: 12.1,usage: "Kicker, link e ação de texto"},
  {foreground: "textDanger",background: "backgroundPage",kind: "text",minimum: 4.5,light: 5.78,dark: 10.13,usage: "Ação destrutiva e erro de campo"},
  {foreground: "iconSecondary",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.61,dark: 9.28,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.54,dark: 8.27,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.54,dark: 8.27,usage: "Limite da pílula selecionada e preenchimento do progresso"},
  {foreground: "borderRule",background: "backgroundPage",kind: "graphic",minimum: 3,light: 16.94,dark: 14.62,usage: "Fio grosso e fio duplo do cabeçalho"},
  {foreground: "borderControl",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.61,dark: 9.28,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundPage",kind: "graphic",minimum: 3,light: 4.54,dark: 12.1,usage: "Anel de foco"},
  {foreground: "textPrimary",background: "backgroundCard",kind: "text",minimum: 4.5,light: 15.09,dark: 16.72,usage: "Título e texto principal"},
  {foreground: "textSecondary",background: "backgroundCard",kind: "text",minimum: 4.5,light: 8.13,dark: 12.09,usage: "Resumo, autoria e metadado"},
  {foreground: "textMuted",background: "backgroundCard",kind: "text",minimum: 4.5,light: 6.42,dark: 8.64,usage: "Tempo de leitura, legenda e espaço reservado"},
  {foreground: "textAccent",background: "backgroundCard",kind: "text",minimum: 4.5,light: 7.07,dark: 11.27,usage: "Kicker, link e ação de texto"},
  {foreground: "textDanger",background: "backgroundCard",kind: "text",minimum: 4.5,light: 6.22,dark: 9.43,usage: "Ação destrutiva e erro de campo"},
  {foreground: "iconSecondary",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.96,dark: 8.64,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.88,dark: 7.7,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.88,dark: 7.7,usage: "Limite da pílula selecionada e preenchimento do progresso"},
  {foreground: "borderRule",background: "backgroundCard",kind: "graphic",minimum: 3,light: 18.23,dark: 13.61,usage: "Fio grosso e fio duplo do cabeçalho"},
  {foreground: "borderControl",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.96,dark: 8.64,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.88,dark: 11.27,usage: "Anel de foco"},
  {foreground: "textPrimary",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 15.09,dark: 10.43,usage: "Título e texto principal"},
  {foreground: "textSecondary",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 8.13,dark: 7.54,usage: "Resumo, autoria e metadado"},
  {foreground: "textMuted",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 6.42,dark: 5.39,usage: "Tempo de leitura, legenda e espaço reservado"},
  {foreground: "textAccent",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 7.07,dark: 7.03,usage: "Kicker, link e ação de texto"},
  {foreground: "textDanger",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 6.22,dark: 5.88,usage: "Ação destrutiva e erro de campo"},
  {foreground: "iconSecondary",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.96,dark: 5.39,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 4.8,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 4.8,usage: "Limite da pílula selecionada e preenchimento do progresso"},
  {foreground: "borderRule",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 18.23,dark: 8.49,usage: "Fio grosso e fio duplo do cabeçalho"},
  {foreground: "borderControl",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.96,dark: 5.39,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 7.03,usage: "Anel de foco"},
  {foreground: "textPrimary",background: "backgroundSubtle",kind: "text",minimum: 4.5,light: 13.09,dark: 10.43,usage: "Texto sobre bloco sutil"},
  {foreground: "textSecondary",background: "backgroundSubtle",kind: "text",minimum: 4.5,light: 7.05,dark: 7.54,usage: "Metadado sobre bloco sutil"},
  {foreground: "textMuted",background: "backgroundSubtle",kind: "text",minimum: 4.5,light: 5.57,dark: 5.39,usage: "Legenda sobre bloco sutil"},
  {foreground: "textAccent",background: "backgroundSubtle",kind: "text",minimum: 4.5,light: 6.14,dark: 7.03,usage: "Ação de texto sobre bloco sutil"},
  {foreground: "textPrimary",background: "fillField@backgroundPage",kind: "text",minimum: 4.5,light: 13.09,dark: 10.43,usage: "Texto em pílula de filtro e campo"},
  {foreground: "textMuted",background: "fillField@backgroundPage",kind: "text",minimum: 4.5,light: 5.57,dark: 5.39,usage: "Espaço reservado do campo de busca"},
  {foreground: "textAccent",background: "fillField@backgroundCard",kind: "text",minimum: 4.5,light: 6.14,dark: 7.03,usage: "Etiqueta de destaque"},
  {foreground: "textPrimary",background: "surfaceBar@backgroundPage",kind: "text",minimum: 4.5,light: 14.98,dark: 16.86,usage: "Título na barra translúcida do leitor"},
  {foreground: "textSecondary",background: "surfaceBar@backgroundPage",kind: "text",minimum: 4.5,light: 8.07,dark: 12.19,usage: "Edição na barra translúcida do leitor"},
  {foreground: "textOnAction",background: "actionPrimary",kind: "text",minimum: 4.5,light: 4.88,dark: 8.27,usage: "Rótulo do botão primário e da pílula selecionada"},
  {foreground: "textOnAction",background: "actionPressed",kind: "text",minimum: 4.5,light: 7.07,dark: 12.1,usage: "Rótulo do botão primário pressionado"},
  {foreground: "textOnDanger",background: "actionDanger",kind: "text",minimum: 4.5,light: 4.74,dark: 7.01,usage: "Rótulo do botão destrutivo"},
  {foreground: "statusLive",background: "backgroundCard",kind: "graphic",minimum: 3,light: 4.85,dark: 10.68,usage: "Marcador \"Atualizado agora\""},
  {foreground: "statusWarning",background: "backgroundCard",kind: "graphic",minimum: 3,light: 5.96,dark: 10.53,usage: "Marcador da nota de correção"},
  {foreground: "toastText",background: "toastSurface",kind: "text",minimum: 4.5,light: 18.23,dark: 16.99,usage: "Texto do aviso"},
  {foreground: "toastAction",background: "toastSurface",kind: "text",minimum: 4.5,light: 11.27,dark: 6.14,usage: "Ação do aviso"},
  {foreground: "footerText",background: "footerSurface",kind: "text",minimum: 4.5,light: 18.23,dark: 18.23,usage: "Texto do rodapé"},
  {foreground: "footerTextSecondary",background: "footerSurface",kind: "text",minimum: 4.5,light: 11.27,dark: 11.27,usage: "Descrição e direitos autorais do rodapé"},
  {foreground: "footerAccent",background: "footerSurface",kind: "text",minimum: 4.5,light: 7.7,dark: 7.7,usage: "Título das colunas e links do rodapé"},
  {foreground: "deviceChromeText",background: "deviceChromeField",kind: "text",minimum: 4.5,light: 12.09,dark: 12.09,usage: "Endereço no mockup de área de trabalho"},
  {foreground: "mediaText",background: "mediaScrim@branco",kind: "text",minimum: 4.5,light: 4.86,dark: 4.86,usage: "Legenda sobre a fotografia (pior caso: foto branca)"},
];
