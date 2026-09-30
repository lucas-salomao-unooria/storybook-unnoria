/**
 * Tokens de Cores do Design System Unoogaleria.
 *
 * Espelho TypeScript de `colors.css` (gerado da mesma tabela). Cada token traz o
 * valor nos dois temas e o nome do token da Plataforma Unooria de que o literal
 * foi copiado.
 */

/**
 * Temas suportados pelo módulo.
 */
export type UglTheme = 'light' | 'dark';

/**
 * Valor de um token em um tema, com rastreabilidade até a Plataforma Unooria.
 */
export interface UglColorValue {
  /** Literal copiado da Unooria */
  value: string;
  /** Token de origem em `src/unooria/tokens/` */
  unooria: string;
}

/**
 * Descrição de um token que muda entre os temas.
 */
export interface UglColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Agrupamento usado na documentação */
  group: string;
  /** Onde o token é aplicado no produto */
  usage: string;
  light: UglColorValue;
  dark: UglColorValue;
}

/**
 * Descrição de um token invariante entre temas.
 */
export interface UglInvariantColorToken extends UglColorValue {
  cssVar: string;
  group: string;
  usage: string;
}

/**
 * Grupos de tokens, na ordem de exibição da documentação.
 */
export const uglColorGroups = ["Superfícies","Texto","Ícones","Bordas","Ações","Marca","Overlays","Elevação","Imersivo","Mídia","Aparelho"] as const;

/**
 * Tokens que variam entre os temas claro e escuro.
 */
export const uglColorTokens = {
  backgroundPrimary: {
    cssVar: '--ugl-color-background-primary',
    group: "Superfícies",
    usage: "Fundo das telas: biblioteca, álbuns e busca",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
  },
  backgroundSecondary: {
    cssVar: '--ugl-color-background-secondary',
    group: "Superfícies",
    usage: "Fundo de listas agrupadas e da tela atrás dos cartões",
    light: { value: '#F7F6FA', unooria: '--unooria-color-brandpurple-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  backgroundTertiary: {
    cssVar: '--ugl-color-background-tertiary',
    group: "Superfícies",
    usage: "Mídia ainda não carregada, cápsulas e blocos sutis",
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  backgroundElevated: {
    cssVar: '--ugl-color-background-elevated',
    group: "Superfícies",
    usage: "Folhas inferiores, menus e diálogos",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  surfaceBar: {
    cssVar: '--ugl-color-surface-bar',
    group: "Superfícies",
    usage: "Barras translúcidas sobre a grade (topo, abas e seleção)",
    light: { value: 'rgba(255, 255, 255, 0.90)', unooria: '--unooria-color-opacity-neutrallight-900' },
    dark: { value: 'rgba(14, 16, 57, 0.90)', unooria: '--unooria-color-opacity-brandpurple-900' },
  },
  textPrimary: {
    cssVar: '--ugl-color-text-primary',
    group: "Texto",
    usage: "Títulos, rótulos e texto de alto contraste",
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
  },
  textSecondary: {
    cssVar: '--ugl-color-text-secondary',
    group: "Texto",
    usage: "Datas, contagens, metadados e abas inativas",
    light: { value: '#475157', unooria: '--unooria-color-neutral-700' },
    dark: { value: '#CBD4D6', unooria: '--unooria-color-neutraldark-900' },
  },
  textPlaceholder: {
    cssVar: '--ugl-color-text-placeholder',
    group: "Texto",
    usage: "Espaço reservado dos campos",
    light: { value: '#536167', unooria: '--unooria-color-neutral-600' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  textAccent: {
    cssVar: '--ugl-color-text-accent',
    group: "Texto",
    usage: "Ações de texto: \"Selecionar\", \"Ver tudo\", links",
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  textOnAction: {
    cssVar: '--ugl-color-text-on-action',
    group: "Texto",
    usage: "Rótulo e glifo sobre o preenchimento de ação e o círculo de seleção",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  textDanger: {
    cssVar: '--ugl-color-text-danger',
    group: "Texto",
    usage: "Ações destrutivas em texto: \"Excluir\", \"Apagar tudo\"",
    light: { value: '#C11414', unooria: '--unooria-color-danger-700' },
    dark: { value: '#FFA1A1', unooria: '--unooria-color-danger-300' },
  },
  textOnDanger: {
    cssVar: '--ugl-color-text-on-danger',
    group: "Texto",
    usage: "Rótulo sobre o botão destrutivo preenchido",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  iconPrimary: {
    cssVar: '--ugl-color-icon-primary',
    group: "Ícones",
    usage: "Glifos ativos das barras e das linhas de lista",
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
  },
  iconSecondary: {
    cssVar: '--ugl-color-icon-secondary',
    group: "Ícones",
    usage: "Glifos inativos, de apoio e setas de navegação",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  iconAccent: {
    cssVar: '--ugl-color-icon-accent',
    group: "Ícones",
    usage: "Glifo da aba ativa e das linhas de álbum",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  borderSubtle: {
    cssVar: '--ugl-color-border-subtle',
    group: "Bordas",
    usage: "Divisores entre linhas e fios de barra",
    light: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  borderDefault: {
    cssVar: '--ugl-color-border-default',
    group: "Bordas",
    usage: "Contorno de cartões e do botão secundário",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  borderControl: {
    cssVar: '--ugl-color-border-control',
    group: "Bordas",
    usage: "Contorno de campo e de controle (gráfico ≥ 3:1)",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  actionPrimary: {
    cssVar: '--ugl-color-action-primary',
    group: "Ações",
    usage: "Botão primário, aba ativa, controle selecionado e círculo de seleção",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  actionPressed: {
    cssVar: '--ugl-color-action-pressed',
    group: "Ações",
    usage: "Estado pressionado da ação primária",
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  actionDisabled: {
    cssVar: '--ugl-color-action-disabled',
    group: "Ações",
    usage: "Ação primária desabilitada",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  actionDanger: {
    cssVar: '--ugl-color-action-danger',
    group: "Ações",
    usage: "Botão destrutivo preenchido (excluir de vez)",
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
  },
  fillField: {
    cssVar: '--ugl-color-fill-field',
    group: "Ações",
    usage: "Preenchimento do campo de busca, dos chips e do controle segmentado",
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  stateHover: {
    cssVar: '--ugl-color-state-hover',
    group: "Ações",
    usage: "Realce de hover sobre qualquer superfície",
    light: { value: 'rgba(14, 16, 57, 0.05)', unooria: '--unooria-color-opacity-brandpurple-50' },
    dark: { value: 'rgba(255, 255, 255, 0.10)', unooria: '--unooria-color-opacity-neutrallight-100' },
  },
  statePressed: {
    cssVar: '--ugl-color-state-pressed',
    group: "Ações",
    usage: "Realce de pressionado sobre qualquer superfície",
    light: { value: 'rgba(14, 16, 57, 0.10)', unooria: '--unooria-color-opacity-brandpurple-100' },
    dark: { value: 'rgba(255, 255, 255, 0.20)', unooria: '--unooria-color-opacity-neutrallight-200' },
  },
  focusRing: {
    cssVar: '--ugl-color-focus-ring',
    group: "Ações",
    usage: "Anel de foco de 2px (gráfico ≥ 3:1)",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  brandFavorite: {
    cssVar: '--ugl-color-brand-favorite',
    group: "Marca",
    usage: "Coração de favorito fora do visualizador",
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
  },
  statusSuccess: {
    cssVar: '--ugl-color-status-success',
    group: "Marca",
    usage: "Confirmação: salvo, restaurado, copiado",
    light: { value: '#008257', unooria: '--unooria-color-success-700' },
    dark: { value: '#26E197', unooria: '--unooria-color-success-400' },
  },
  statusWarning: {
    cssVar: '--ugl-color-status-warning',
    group: "Marca",
    usage: "Prazo curto na lixeira (\"1 dia\")",
    light: { value: '#B73506', unooria: '--unooria-color-warning-700' },
    dark: { value: '#FFB74A', unooria: '--unooria-color-warning-300' },
  },
  overlayScrim: {
    cssVar: '--ugl-color-overlay-scrim',
    group: "Overlays",
    usage: "Véu atrás de folhas e diálogos",
    light: { value: 'rgba(14, 16, 57, 0.50)', unooria: '--unooria-color-opacity-brandpurple-500' },
    dark: { value: 'rgba(14, 16, 57, 0.70)', unooria: '--unooria-color-opacity-brandpurple-700' },
  },
  toastSurface: {
    cssVar: '--ugl-color-toast-surface',
    group: "Overlays",
    usage: "Fundo do aviso passageiro (cores invertidas)",
    light: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
    dark: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
  },
  toastText: {
    cssVar: '--ugl-color-toast-text',
    group: "Overlays",
    usage: "Texto do aviso passageiro",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  toastAction: {
    cssVar: '--ugl-color-toast-action',
    group: "Overlays",
    usage: "Ação do aviso passageiro (\"Desfazer\")",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  elevationOverlay: {
    cssVar: '--ugl-elevation-overlay',
    group: "Elevação",
    usage: "Folhas, menus, diálogos, avisos e o controle flutuante",
    light: { value: '0px 0px 10px 0px rgba(14, 16, 57, 0.3)', unooria: '--unooria-elevation-brand-secondary' },
    dark: { value: '0px 0px 8px 4px rgba(255, 255, 255, 0.1)', unooria: '--unooria-elevation-neutral-2' },
  },
} as const satisfies Record<string, UglColorToken>;

export type UglColorKey = keyof typeof uglColorTokens;

/**
 * Tokens invariantes: superfície imersiva, mídia e aparelho do mockup.
 */
export const uglInvariantColors = {
  immersiveSurface: {
    cssVar: '--ugl-color-immersive-surface',
    group: "Imersivo",
    usage: "Fundo do visualizador e do editor, nos dois temas",
    value: '#080922',
    unooria: '--unooria-color-brandpurple-950',
  },
  immersiveBar: {
    cssVar: '--ugl-color-immersive-bar',
    group: "Imersivo",
    usage: "Barras do visualizador e do editor sobre a mídia",
    value: 'rgba(14, 16, 57, 0.70)',
    unooria: '--unooria-color-opacity-brandpurple-700',
  },
  immersiveText: {
    cssVar: '--ugl-color-immersive-text',
    group: "Imersivo",
    usage: "Texto e glifo sobre a superfície imersiva e sobre mídia",
    value: '#FFFFFF',
    unooria: '--unooria-color-neutral-50',
  },
  immersiveTextSecondary: {
    cssVar: '--ugl-color-immersive-text-secondary',
    group: "Imersivo",
    usage: "Metadado sobre a superfície imersiva (hora, lugar)",
    value: '#CBD4D6',
    unooria: '--unooria-color-neutraldark-900',
  },
  immersiveAccent: {
    cssVar: '--ugl-color-immersive-accent',
    group: "Imersivo",
    usage: "Ferramenta ativa, trilha preenchida e filtro escolhido no editor",
    value: '#AAA5C2',
    unooria: '--unooria-color-brandpurple-400',
  },
  immersiveTextOnAccent: {
    cssVar: '--ugl-color-immersive-text-on-accent',
    group: "Imersivo",
    usage: "Rótulo sobre o acento imersivo",
    value: '#080922',
    unooria: '--unooria-color-brandpurple-950',
  },
  immersiveControl: {
    cssVar: '--ugl-color-immersive-control',
    group: "Imersivo",
    usage: "Fundo dos botões circulares sobre mídia",
    value: 'rgba(255, 255, 255, 0.20)',
    unooria: '--unooria-color-opacity-neutrallight-200',
  },
  immersiveControlPressed: {
    cssVar: '--ugl-color-immersive-control-pressed',
    group: "Imersivo",
    usage: "Botão circular pressionado sobre mídia",
    value: 'rgba(255, 255, 255, 0.30)',
    unooria: '--unooria-color-opacity-neutrallight-300',
  },
  immersiveTrack: {
    cssVar: '--ugl-color-immersive-track',
    group: "Imersivo",
    usage: "Trilha vazia do deslizador e da linha do tempo",
    value: 'rgba(255, 255, 255, 0.40)',
    unooria: '--unooria-color-opacity-neutrallight-400',
  },
  immersiveBorder: {
    cssVar: '--ugl-color-immersive-border',
    group: "Imersivo",
    usage: "Fio e contorno sobre a superfície imersiva",
    value: 'rgba(255, 255, 255, 0.30)',
    unooria: '--unooria-color-opacity-neutrallight-300',
  },
  immersiveFavorite: {
    cssVar: '--ugl-color-immersive-favorite',
    group: "Imersivo",
    usage: "Coração de favorito no visualizador",
    value: '#FF6A6A',
    unooria: '--unooria-color-danger-400',
  },
  immersiveDanger: {
    cssVar: '--ugl-color-immersive-danger',
    group: "Imersivo",
    usage: "Ação de excluir no visualizador",
    value: '#FF6A6A',
    unooria: '--unooria-color-danger-400',
  },
  mediaScrim: {
    cssVar: '--ugl-color-media-scrim',
    group: "Mídia",
    usage: "Cápsula da duração e dos selos sobre a miniatura",
    value: 'rgba(14, 16, 57, 0.60)',
    unooria: '--unooria-color-opacity-brandpurple-600',
  },
  mediaVeilSelected: {
    cssVar: '--ugl-color-media-veil-selected',
    group: "Mídia",
    usage: "Véu claro sobre a miniatura selecionada",
    value: 'rgba(255, 255, 255, 0.30)',
    unooria: '--unooria-color-opacity-neutrallight-300',
  },
  mediaText: {
    cssVar: '--ugl-color-media-text',
    group: "Mídia",
    usage: "Texto e glifo sobre miniatura e capa (sempre branco)",
    value: '#FFFFFF',
    unooria: '--unooria-color-neutral-50',
  },
  deviceBody: {
    cssVar: '--ugl-color-device-body',
    group: "Aparelho",
    usage: "Corpo do aparelho do mockup e ilha da câmera",
    value: '#080922',
    unooria: '--unooria-color-brandpurple-950',
  },
  deviceEdge: {
    cssVar: '--ugl-color-device-edge',
    group: "Aparelho",
    usage: "Aro metálico do aparelho",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
  deviceButton: {
    cssVar: '--ugl-color-device-button',
    group: "Aparelho",
    usage: "Botões laterais do aparelho",
    value: '#57547D',
    unooria: '--unooria-color-brandpurple-700',
  },
  deviceLens: {
    cssVar: '--ugl-color-device-lens',
    group: "Aparelho",
    usage: "Lente da câmera frontal",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
} as const satisfies Record<string, UglInvariantColorToken>;

export type UglInvariantColorKey = keyof typeof uglInvariantColors;

/**
 * Valores resolvidos de cada tema, por chave.
 */
export const uglColorThemes: Record<UglTheme, Record<UglColorKey, string>> = {
  light: Object.fromEntries(
    Object.entries(uglColorTokens).map(([key, token]) => [key, token.light.value])
  ) as Record<UglColorKey, string>,
  dark: Object.fromEntries(
    Object.entries(uglColorTokens).map(([key, token]) => [key, token.dark.value])
  ) as Record<UglColorKey, string>,
};

/**
 * Referências `var(--ugl-…)` prontas para uso em estilos inline.
 */
export const uglColorCssVars = Object.fromEntries(
  [...Object.entries(uglColorTokens), ...Object.entries(uglInvariantColors)].map(([key, token]) => [
    key,
    `var(${token.cssVar})`,
  ])
) as Record<UglColorKey | UglInvariantColorKey, string>;

/**
 * Gradientes compostos do módulo.
 */
export const uglGradients = {
  mediaTop: { cssVar: '--ugl-gradient-media-top', usage: 'Véu do topo da mídia, atrás da barra do visualizador' },
  mediaBottom: { cssVar: '--ugl-gradient-media-bottom', usage: 'Véu da base da mídia, atrás do título de capas e memórias' },
} as const;

/**
 * Par de contraste medido em um tema.
 */
export interface UglContrastPair {
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
export const uglContrastPairs: readonly UglContrastPair[] = [
  {foreground: "textPrimary",background: "backgroundPrimary",kind: "text",minimum: 4.5,light: 15.09,dark: 16.72,usage: "Texto principal"},
  {foreground: "textSecondary",background: "backgroundPrimary",kind: "text",minimum: 4.5,light: 8.13,dark: 12.09,usage: "Texto de apoio"},
  {foreground: "textAccent",background: "backgroundPrimary",kind: "text",minimum: 4.5,light: 7.07,dark: 11.27,usage: "Ação de texto"},
  {foreground: "textDanger",background: "backgroundPrimary",kind: "text",minimum: 4.5,light: 6.22,dark: 9.43,usage: "Ação destrutiva em texto"},
  {foreground: "iconSecondary",background: "backgroundPrimary",kind: "graphic",minimum: 3,light: 4.96,dark: 8.64,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundPrimary",kind: "graphic",minimum: 3,light: 4.88,dark: 7.7,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundPrimary",kind: "graphic",minimum: 3,light: 4.88,dark: 7.7,usage: "Limite de controle selecionado"},
  {foreground: "borderControl",background: "backgroundPrimary",kind: "graphic",minimum: 3,light: 4.96,dark: 8.64,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundPrimary",kind: "graphic",minimum: 3,light: 4.88,dark: 11.27,usage: "Anel de foco"},
  {foreground: "textPrimary",background: "backgroundSecondary",kind: "text",minimum: 4.5,light: 14.02,dark: 17.96,usage: "Texto principal"},
  {foreground: "textSecondary",background: "backgroundSecondary",kind: "text",minimum: 4.5,light: 7.56,dark: 12.99,usage: "Texto de apoio"},
  {foreground: "textAccent",background: "backgroundSecondary",kind: "text",minimum: 4.5,light: 6.57,dark: 12.1,usage: "Ação de texto"},
  {foreground: "textDanger",background: "backgroundSecondary",kind: "text",minimum: 4.5,light: 5.78,dark: 10.13,usage: "Ação destrutiva em texto"},
  {foreground: "iconSecondary",background: "backgroundSecondary",kind: "graphic",minimum: 3,light: 4.61,dark: 9.28,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundSecondary",kind: "graphic",minimum: 3,light: 4.54,dark: 8.27,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundSecondary",kind: "graphic",minimum: 3,light: 4.54,dark: 8.27,usage: "Limite de controle selecionado"},
  {foreground: "borderControl",background: "backgroundSecondary",kind: "graphic",minimum: 3,light: 4.61,dark: 9.28,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundSecondary",kind: "graphic",minimum: 3,light: 4.54,dark: 12.1,usage: "Anel de foco"},
  {foreground: "textPrimary",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 15.09,dark: 10.43,usage: "Texto principal"},
  {foreground: "textSecondary",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 8.13,dark: 7.54,usage: "Texto de apoio"},
  {foreground: "textAccent",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 7.07,dark: 7.03,usage: "Ação de texto"},
  {foreground: "textDanger",background: "backgroundElevated",kind: "text",minimum: 4.5,light: 6.22,dark: 5.88,usage: "Ação destrutiva em texto"},
  {foreground: "iconSecondary",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.96,dark: 5.39,usage: "Glifo de apoio"},
  {foreground: "iconAccent",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 4.8,usage: "Glifo de destaque"},
  {foreground: "actionPrimary",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 4.8,usage: "Limite de controle selecionado"},
  {foreground: "borderControl",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.96,dark: 5.39,usage: "Contorno de campo e de controle"},
  {foreground: "focusRing",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.88,dark: 7.03,usage: "Anel de foco"},
  {foreground: "textPrimary",background: "surfaceBar@backgroundPrimary",kind: "text",minimum: 4.5,light: 15.09,dark: 16.72,usage: "Título na barra translúcida"},
  {foreground: "textSecondary",background: "surfaceBar@backgroundPrimary",kind: "text",minimum: 4.5,light: 8.13,dark: 12.09,usage: "Rótulo de aba inativa"},
  {foreground: "iconAccent",background: "surfaceBar@backgroundPrimary",kind: "graphic",minimum: 3,light: 4.88,dark: 7.7,usage: "Glifo da aba ativa"},
  {foreground: "textAccent",background: "surfaceBar@backgroundPrimary",kind: "text",minimum: 4.5,light: 7.07,dark: 11.27,usage: "Rótulo da aba ativa e ação de texto na barra"},
  {foreground: "textPrimary",background: "fillField@backgroundPrimary",kind: "text",minimum: 4.5,light: 13.09,dark: 10.43,usage: "Texto em chip e campo"},
  {foreground: "textPlaceholder",background: "fillField@backgroundPrimary",kind: "text",minimum: 4.5,light: 5.57,dark: 5.39,usage: "Espaço reservado do campo de busca"},
  {foreground: "textSecondary",background: "backgroundTertiary",kind: "text",minimum: 4.5,light: 7.05,dark: 7.54,usage: "Rótulo sobre bloco sutil"},
  {foreground: "textOnAction",background: "actionPrimary",kind: "text",minimum: 4.5,light: 4.88,dark: 8.27,usage: "Rótulo do botão primário e visto do círculo de seleção"},
  {foreground: "textOnAction",background: "actionPressed",kind: "text",minimum: 4.5,light: 7.07,dark: 12.1,usage: "Rótulo do botão primário pressionado"},
  {foreground: "textOnDanger",background: "actionDanger",kind: "text",minimum: 4.5,light: 4.74,dark: 7.01,usage: "Rótulo do botão destrutivo"},
  {foreground: "brandFavorite",background: "backgroundPrimary",kind: "graphic",minimum: 3,light: 4.74,dark: 6.53,usage: "Coração de favorito"},
  {foreground: "statusSuccess",background: "backgroundElevated",kind: "graphic",minimum: 3,light: 4.85,dark: 6.66,usage: "Glifo de confirmação"},
  {foreground: "statusWarning",background: "backgroundPrimary",kind: "text",minimum: 4.5,light: 5.96,dark: 10.53,usage: "Prazo curto na lixeira"},
  {foreground: "toastText",background: "toastSurface",kind: "text",minimum: 4.5,light: 18.23,dark: 16.99,usage: "Texto do aviso"},
  {foreground: "toastAction",background: "toastSurface",kind: "text",minimum: 4.5,light: 11.27,dark: 6.14,usage: "Ação do aviso"},
  {foreground: "immersiveText",background: "immersiveSurface",kind: "text",minimum: 4.5,light: 19.58,dark: 19.58,usage: "Texto no visualizador"},
  {foreground: "immersiveTextSecondary",background: "immersiveSurface",kind: "text",minimum: 4.5,light: 12.99,dark: 12.99,usage: "Metadado no visualizador"},
  {foreground: "immersiveText",background: "immersiveBar@immersiveSurface",kind: "text",minimum: 4.5,light: 18.68,dark: 18.68,usage: "Texto na barra do visualizador"},
  {foreground: "immersiveTextSecondary",background: "immersiveBar@immersiveSurface",kind: "text",minimum: 4.5,light: 12.39,dark: 12.39,usage: "Metadado na barra do visualizador"},
  {foreground: "immersiveText",background: "immersiveControl@immersiveSurface",kind: "text",minimum: 4.5,light: 11.07,dark: 11.07,usage: "Glifo no botão circular"},
  {foreground: "immersiveAccent",background: "immersiveSurface",kind: "graphic",minimum: 3,light: 8.27,dark: 8.27,usage: "Ferramenta ativa e trilha preenchida"},
  {foreground: "immersiveTextOnAccent",background: "immersiveAccent",kind: "text",minimum: 4.5,light: 8.27,dark: 8.27,usage: "Rótulo sobre o acento imersivo"},
  {foreground: "immersiveTrack",background: "immersiveSurface",kind: "graphic",minimum: 3,light: 3.75,dark: 3.75,usage: "Trilha vazia do deslizador e da linha do tempo"},
  {foreground: "immersiveFavorite",background: "immersiveBar@immersiveSurface",kind: "graphic",minimum: 3,light: 6.69,dark: 6.69,usage: "Favorito no visualizador"},
  {foreground: "immersiveDanger",background: "immersiveBar@immersiveSurface",kind: "graphic",minimum: 3,light: 6.69,dark: 6.69,usage: "Excluir no visualizador"},
  {foreground: "mediaText",background: "mediaScrim@branco",kind: "text",minimum: 4.5,light: 4.86,dark: 4.86,usage: "Duração sobre a miniatura (pior caso: foto branca)"},
];
