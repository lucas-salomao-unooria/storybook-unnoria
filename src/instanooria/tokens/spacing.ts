/**
 * Tokens de Espaçamento, Raios, Dimensões e Elevação do Instanooria.
 * Medidas derivadas dos frames de 375×812 do Figma.
 */

/**
 * Chaves da escala de espaçamento.
 */
export type InstaSpacingToken =
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
export const instaSpacing: Record<InstaSpacingToken, number> = {
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
export const instaSpacingOrder: InstaSpacingToken[] = [
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
export const instaSpacingUsage: Record<InstaSpacingToken, string> = {
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
 * Margem lateral padrão das telas (4% de 375px).
 */
export const instaGutter = 15;

/**
 * Raios de borda oficiais.
 */
export const instaRadius = {
  /** Etiqueta LIVE */
  xs: 3,
  /** Botões e cartões compactos */
  s: 4,
  /** Mídia de story e blocos arredondados */
  m: 8,
  /** Campo de busca */
  l: 10,
  /** Composer de mensagem do story */
  xl: 21.5,
  /** Cápsulas e avatares */
  full: 1000,
} as const;

/**
 * Dimensões estruturais das telas de 375×812.
 */
export const instaLayout = {
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
export const instaAvatarSizes = {
  xs: 17,
  sm: 23,
  md: 32,
  lg: 56,
  xl: 80,
} as const;

/**
 * Elevações hairline no padrão iOS.
 */
export const instaElevation = {
  hairlineBottom: '0 0.33px 0 0 rgba(60, 60, 67, 0.29)',
  hairlineTop: '0 -0.33px 0 0 rgba(60, 60, 67, 0.29)',
  barBottom: '0 0.33px 0 0 #A6A6AA',
  barTop: '0 -0.33px 0 0 #A6A6AA',
  drawer: '-0.33px 0 0 0 rgba(60, 60, 67, 0.29)',
} as const;
