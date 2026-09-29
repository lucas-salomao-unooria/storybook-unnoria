/**
 * Tokens de Espaçamento, Raios, Dimensões e Elevação do Unoovista.
 * Medidas do módulo sobre a estrutura de tela de 375×812.
 */

/**
 * Chaves da escala de espaçamento.
 */
export type UnvSpacingToken =
  | '4xs'
  | '3xs'
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | '3xl'
  | '4xl';

/**
 * Escala de espaçamento em pixels.
 */
export const unvSpacing: Record<UnvSpacingToken, number> = {
  '4xs': 2,
  '3xs': 4,
  xxs: 6,
  xs: 8,
  s: 10,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  '3xl': 32,
  '4xl': 48,
};

/**
 * Ordem canônica da escala para exibição em documentação.
 */
export const unvSpacingOrder: UnvSpacingToken[] = [
  '4xs',
  '3xs',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  '3xl',
  '4xl',
];

/**
 * Uso recomendado de cada degrau da escala.
 */
export const unvSpacingUsage: Record<UnvSpacingToken, string> = {
  '4xs': 'Folga da barra de progresso do story e ajustes ópticos.',
  '3xs': 'Distância entre nome e selo de verificação.',
  xxs: 'Respiro entre ícone e rótulo em chips.',
  xs: 'Gap entre ações do post e entre chips da busca.',
  s: 'Padding interno de cápsulas e contadores.',
  m: 'Espaço entre avatar e texto em linhas de lista.',
  l: 'Padding lateral de cartões e botões de bloco.',
  xl: 'Distância entre grupos dentro de um bloco.',
  xxl: 'Separação entre seções do perfil.',
  '3xl': 'Respiro superior de telas de autenticação.',
  '4xl': 'Blocos isolados em telas vazias.',
};

/**
 * Margem lateral padrão das telas .
 */
export const unvGutter = 16;

/**
 * Raios de borda (degraus de 4px).
 */
export const unvRadius = {
  /** Etiqueta LIVE e cantos mínimos */
  xs: 4,
  /** Botões, campos e cartões compactos */
  s: 8,
  /** Mídia, blocos e cartões */
  m: 12,
  /** Cartão de publicação e folhas */
  l: 16,
  /** Campo de busca e compositor */
  xl: 24,
  /** Cápsulas e avatares */
  full: 1000,
} as const;

/**
 * Dimensões estruturais das telas de 375×812.
 */
export const unvLayout = {
  screenWidth: 375,
  screenHeight: 812,
  statusBarHeight: 44,
  topBarHeight: 88,
  topBarContentHeight: 44,
  tabBarHeight: 79,
  tabBarContentHeight: 50,
  homeIndicatorHeight: 34,
} as const;

/**
 * Diâmetros de avatar (recorte interno, sem o anel).
 */
export const unvAvatarSizes = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 56,
  xl: 80,
} as const;

/**
 * Tamanhos nomeados de ícone (degraus de `--unooria-icon-size-*`).
 */
export const unvIconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

/**
 * Fios de 1px que separam barras e listas, como declarados em `spacing.css`.
 */
export const unvElevation = {
  hairlineBottom: '0 1px 0 0 var(--unv-color-border-subtle)',
  hairlineTop: '0 -1px 0 0 var(--unv-color-border-subtle)',
  barBottom: '0 1px 0 0 var(--unv-color-border-bar)',
  barTop: '0 -1px 0 0 var(--unv-color-border-bar)',
  drawer: '-1px 0 0 0 var(--unv-color-border-subtle)',
} as const;
