/**
 * Tokens de Cores do Design System Unoovista.
 *
 * Espelho TypeScript de `colors.css` (gerado da mesma tabela). Cada token traz o
 * valor nos dois temas e o nome do token da Plataforma Unooria de que o literal
 * foi copiado.
 */

/**
 * Temas suportados pelo módulo.
 */
export type UnvTheme = 'light' | 'dark';

/**
 * Valor de um token em um tema, com rastreabilidade até a Plataforma Unooria.
 */
export interface UnvColorValue {
  /** Literal copiado da Unooria */
  value: string;
  /** Token de origem em `src/unooria/tokens/` */
  unooria: string;
}

/**
 * Descrição de um token que muda entre os temas.
 */
export interface UnvColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Agrupamento usado na documentação */
  group: string;
  /** Onde o token é aplicado no produto */
  usage: string;
  light: UnvColorValue;
  dark: UnvColorValue;
}

/**
 * Descrição de um token invariante entre temas.
 */
export interface UnvInvariantColorToken extends UnvColorValue {
  cssVar: string;
  group: string;
  usage: string;
}

/**
 * Grupos de tokens, na ordem de exibição da documentação.
 */
export const unvColorGroups = ["Superfícies","Texto","Ícones","Bordas","Ações","Overlays","Marca","Gradientes","Elevação"] as const;

/**
 * Tokens que variam entre os temas claro e escuro.
 */
export const unvColorTokens = {
  backgroundPrimary: {
    cssVar: '--unv-color-background-primary',
    group: 'Superfícies',
    usage: "Fundo das telas: feed, perfil, busca, notificações e mensagens",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
  },
  backgroundSecondary: {
    cssVar: '--unv-color-background-secondary',
    group: 'Superfícies',
    usage: "Fundo do documento atrás das telas e dos cartões de publicação",
    light: { value: '#F7F6FA', unooria: '--unooria-color-brandpurple-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  backgroundTertiary: {
    cssVar: '--unv-color-background-tertiary',
    group: 'Superfícies',
    usage: "Cápsulas, contadores, blocos sutis e mídia ainda não carregada",
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  backgroundElevated: {
    cssVar: '--unv-color-background-elevated',
    group: 'Superfícies',
    usage: "Menus, folhas inferiores, diálogos e a doca de navegação",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  textPrimary: {
    cssVar: '--unv-color-text-primary',
    group: 'Texto',
    usage: "Nomes, títulos, legendas e rótulos de alto contraste",
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
  },
  textSecondary: {
    cssVar: '--unv-color-text-secondary',
    group: 'Texto',
    usage: "Horários, metadados, localização, contadores e abas inativas",
    light: { value: '#475157', unooria: '--unooria-color-neutral-700' },
    dark: { value: '#CBD4D6', unooria: '--unooria-color-neutraldark-900' },
  },
  textLink: {
    cssVar: '--unv-color-text-link',
    group: 'Texto',
    usage: "Menções, hashtags e ações de texto",
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  textPlaceholder: {
    cssVar: '--unv-color-text-placeholder',
    group: 'Texto',
    usage: "Texto de espaço reservado dos campos",
    light: { value: '#536167', unooria: '--unooria-color-neutral-600' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  textOnAction: {
    cssVar: '--unv-color-text-on-action',
    group: 'Texto',
    usage: "Rótulo e glifo sobre o preenchimento de ação (botão primário, círculo de seleção)",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  textOnNotification: {
    cssVar: '--unv-color-text-on-notification',
    group: 'Texto',
    usage: "Numeral sobre o selo de notificação",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
  },
  iconPrimary: {
    cssVar: '--unv-color-icon-primary',
    group: 'Ícones',
    usage: "Glifos ativos das barras e das ações da publicação",
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
  },
  iconSecondary: {
    cssVar: '--unv-color-icon-secondary',
    group: 'Ícones',
    usage: "Glifos inativos e de apoio",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  borderDefault: {
    cssVar: '--unv-color-border-default',
    group: 'Bordas',
    usage: "Contorno de cartões, botões secundários e divisores fortes",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  borderSubtle: {
    cssVar: '--unv-color-border-subtle',
    group: 'Bordas',
    usage: "Divisor entre linhas de lista e fios de barra",
    light: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  borderBar: {
    cssVar: '--unv-color-border-bar',
    group: 'Bordas',
    usage: "Fio de barras e da doca de navegação",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  borderControl: {
    cssVar: '--unv-color-border-control',
    group: 'Bordas',
    usage: "Contorno de campo, seleção e controles (gráfico ≥ 3:1)",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  actionPrimary: {
    cssVar: '--unv-color-action-primary',
    group: 'Ações',
    usage: "Botão primário, aba ativa, foco e controle selecionado",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  actionPressed: {
    cssVar: '--unv-color-action-pressed',
    group: 'Ações',
    usage: "Estado pressionado da ação primária",
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
  },
  actionDisabled: {
    cssVar: '--unv-color-action-disabled',
    group: 'Ações',
    usage: "Ação primária desabilitada",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  actionSecondaryBorder: {
    cssVar: '--unv-color-action-secondary-border',
    group: 'Ações',
    usage: "Contorno do botão secundário",
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
  },
  fillField: {
    cssVar: '--unv-color-fill-field',
    group: 'Ações',
    usage: "Preenchimento de campos de busca e de mensagem",
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
  },
  overlayScrim: {
    cssVar: '--unv-color-overlay-scrim',
    group: 'Overlays',
    usage: "Véu atrás de diálogos e folhas",
    light: { value: 'rgba(14, 16, 57, 0.50)', unooria: '--unooria-color-opacity-brandpurple-500' },
    dark: { value: 'rgba(14, 16, 57, 0.50)', unooria: '--unooria-color-opacity-brandpurple-500' },
  },
  overlayOnMedia: {
    cssVar: '--unv-color-overlay-onmedia',
    group: 'Overlays',
    usage: "Traço translúcido sobre mídia (barras de progresso do story)",
    light: { value: 'rgba(255, 255, 255, 0.40)', unooria: '--unooria-color-opacity-neutrallight-400' },
    dark: { value: 'rgba(255, 255, 255, 0.40)', unooria: '--unooria-color-opacity-neutrallight-400' },
  },
  brandLike: {
    cssVar: '--unv-color-brand-like',
    group: 'Marca',
    usage: "Coração curtido",
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
  },
  brandVerified: {
    cssVar: '--unv-color-brand-verified',
    group: 'Marca',
    usage: "Selo de conta oficial",
    light: { value: '#6487C2', unooria: '--unooria-color-brandnavy-700' },
    dark: { value: '#7FA5E2', unooria: '--unooria-color-brandnavy-600' },
  },
  brandNotification: {
    cssVar: '--unv-color-brand-notification',
    group: 'Marca',
    usage: "Selo de notificação",
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
  },
  highlightRing: {
    cssVar: '--unv-color-highlight-ring',
    group: 'Marca',
    usage: "Anel neutro dos destaques e das histórias já vistas (≥ 3:1 sobre a tela)",
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
  },
  ringInner: {
    cssVar: '--unv-color-ring-inner',
    group: 'Marca',
    usage: "Recorte interno dos anéis, igual ao fundo da tela",
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
  },
  storyStart: {
    cssVar: '--unv-color-story-gradient-start',
    group: 'Gradientes',
    usage: "Anel de story não visto — início",
    light: { value: '#6487C2', unooria: '--unooria-color-brandnavy-700' },
    dark: { value: '#7FA5E2', unooria: '--unooria-color-brandnavy-600' },
  },
  storyMid: {
    cssVar: '--unv-color-story-gradient-mid',
    group: 'Gradientes',
    usage: "Anel de story não visto — meio",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  storyEnd: {
    cssVar: '--unv-color-story-gradient-end',
    group: 'Gradientes',
    usage: "Anel de story não visto — fim",
    light: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    dark: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
  },
  liveStart: {
    cssVar: '--unv-color-live-gradient-start',
    group: 'Gradientes',
    usage: "Anel de transmissão ao vivo — início",
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
  },
  liveMid: {
    cssVar: '--unv-color-live-gradient-mid',
    group: 'Gradientes',
    usage: "Anel de transmissão ao vivo — meio",
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
  },
  liveEnd: {
    cssVar: '--unv-color-live-gradient-end',
    group: 'Gradientes',
    usage: "Anel de transmissão ao vivo — fim",
    light: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    dark: { value: '#7FA5E2', unooria: '--unooria-color-brandnavy-600' },
  },
  elevationOverlay: {
    cssVar: '--unv-elevation-overlay',
    group: 'Elevação',
    usage: "Doca, menus, diálogos, folhas e avisos",
    light: { value: '0px 0px 10px 0px rgba(14, 16, 57, 0.3)', unooria: '--unooria-elevation-brand-secondary' },
    dark: { value: '0px 0px 8px 4px rgba(255, 255, 255, 0.1)', unooria: '--unooria-elevation-neutral-2' },
  },
} as const satisfies Record<string, UnvColorToken>;

/**
 * Chave semântica de um token de cor que varia com o tema.
 */
export type UnvColorKey = keyof typeof unvColorTokens;

/**
 * Tokens invariantes entre temas.
 */
export const unvInvariantColors = {
  liveBadgeStart: {
    cssVar: '--unv-color-livebadge-gradient-start',
    group: 'Gradientes',
    usage: "Etiqueta LIVE — início (texto branco ≥ 4,5:1 nas duas pontas)",
    value: '#34375C',
    unooria: '--unooria-color-brandpurple-800',
  },
  liveBadgeEnd: {
    cssVar: '--unv-color-livebadge-gradient-end',
    group: 'Gradientes',
    usage: "Etiqueta LIVE — fim",
    value: '#E31A1A',
    unooria: '--unooria-color-danger-600',
  },
  onMedia: {
    cssVar: '--unv-color-text-on-media',
    group: 'Texto',
    usage: "Texto e glifo desenhados sobre fotografia ou vídeo (sempre branco)",
    value: '#FFFFFF',
    unooria: '--unooria-color-neutral-50',
  },
} as const satisfies Record<string, UnvInvariantColorToken>;

/**
 * Paleta de um tema como mapa chave → literal.
 */
export const unvColorThemes: Record<UnvTheme, Record<UnvColorKey, string>> = {
  light: Object.fromEntries(
    Object.entries(unvColorTokens).map(([key, token]) => [key, token.light.value])
  ) as Record<UnvColorKey, string>,
  dark: Object.fromEntries(
    Object.entries(unvColorTokens).map(([key, token]) => [key, token.dark.value])
  ) as Record<UnvColorKey, string>,
};

/**
 * Nome da variável CSS de cada token que varia com o tema.
 */
export const unvColorCssVars = Object.fromEntries(
  Object.entries(unvColorTokens).map(([key, token]) => [key, token.cssVar])
) as Record<UnvColorKey, string>;

/**
 * Paradas cromáticas dos gradientes, por tema (anéis) ou invariantes (etiqueta LIVE).
 */
export const unvGradients = {
  /** Anel de story não visto */
  story: {
    light: ['#6487C2', '#716C98', '#34375C'],
    dark: ['#7FA5E2', '#AAA5C2', '#DFDDEB'],
  },
  /** Anel de transmissão ao vivo */
  live: {
    light: ['#E31A1A', '#716C98', '#34375C'],
    dark: ['#FF6A6A', '#AAA5C2', '#7FA5E2'],
  },
  /** Etiqueta LIVE (invariante) */
  liveBadge: ['#34375C', '#E31A1A'],
} as const;
