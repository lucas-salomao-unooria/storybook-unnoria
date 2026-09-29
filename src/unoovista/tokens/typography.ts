/**
 * Tokens de Tipografia do Design System Unoovista.
 * Família e degraus da Plataforma Unooria (Open Sans). Espelho TypeScript de
 * `typography.css`.
 */

/**
 * Chaves da escala tipográfica do Unoovista.
 */
export type UnvTypographyToken =
  | 'headingH3'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'labelLarge'
  | 'labelMedium'
  | 'captionLarge'
  | 'captionMedium'
  | 'overlineDefault'
  | 'overlineSmall'
  | 'navigationTitle'
  | 'navigationBadge';

/**
 * Definição completa de um estilo tipográfico.
 */
export interface UnvTypographyStyle {
  /** Nome do estilo na escala do Unoovista (ex.: "Title/Large") */
  styleName: string;
  /** Token da Unooria de que o tamanho foi copiado (ex.: "--unooria-size-body-s") */
  unooria: string;
  /** Tamanho da fonte em pixels */
  fontSize: number;
  /** Peso da fonte (400, 500, 600 ou 700) */
  fontWeight: number;
  /** Altura de linha em pixels */
  lineHeight: number;
  /** Espaçamento entre letras em pixels (sempre 0) */
  letterSpacing: number;
  /** Classe utilitária CSS correspondente */
  className: string;
  /** Uso recomendado dentro do produto */
  usage: string;
}

/**
 * Família tipográfica com cadeia de fallback multiplataforma.
 */
export const unvFontFamily =
  "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/**
 * Pesos disponíveis.
 */
export const unvFontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Escala tipográfica completa.
 */
export const unvTypography: Record<UnvTypographyToken, UnvTypographyStyle> = {
  headingH3: {
    styleName: 'Heading/H3',
    unooria: '--unooria-size-title-l',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 30,
    letterSpacing: 0,
    className: 'unv-text--heading-h3',
    usage: "Títulos de seção e de estado vazio.",
  },
  titleLarge: {
    styleName: 'Title/Large',
    unooria: '--unooria-size-body-m',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 28,
    letterSpacing: 0,
    className: 'unv-text--title-lg',
    usage: "Título da barra superior e nome no perfil.",
  },
  titleMedium: {
    styleName: 'Title/Medium',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0,
    className: 'unv-text--title-md',
    usage: "Números das estatísticas do perfil e títulos de agrupamento.",
  },
  titleSmall: {
    styleName: 'Title/Small',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0,
    className: 'unv-text--title-sm',
    usage: "Rótulos de botões, abas segmentadas e chips.",
  },
  bodyLarge: {
    styleName: 'Body/Large',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0,
    className: 'unv-text--body-lg',
    usage: "Campos de entrada e textos longos de formulário.",
  },
  bodyMedium: {
    styleName: 'Body/Medium',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0,
    className: 'unv-text--body-md',
    usage: "Itens de menu, linhas de lista e compositor de story.",
  },
  labelLarge: {
    styleName: 'Label/Large',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 20,
    letterSpacing: 0,
    className: 'unv-text--label-lg',
    usage: "Nome de usuário no cabeçalho da publicação e termos em destaque.",
  },
  labelMedium: {
    styleName: 'Label/Medium',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0,
    className: 'unv-text--label-md',
    usage: "Legendas, prévia de mensagens e notificações.",
  },
  captionLarge: {
    styleName: 'Caption/Large',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 18,
    letterSpacing: 0,
    className: 'unv-text--caption-lg',
    usage: "Rótulos curtos em negrito e ações inline.",
  },
  captionMedium: {
    styleName: 'Caption/Medium',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: 0,
    className: 'unv-text--caption-md',
    usage: "Nome sob o story, contador de mídia e rótulos de destaque.",
  },
  overlineDefault: {
    styleName: 'Overline/Default',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 18,
    letterSpacing: 0,
    className: 'unv-text--overline',
    usage: "Rótulos auxiliares em negrito (separadores, seções).",
  },
  overlineSmall: {
    styleName: 'Overline/Small',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: 0,
    className: 'unv-text--overline-sm',
    usage: "Localização e data de publicação.",
  },
  navigationTitle: {
    styleName: 'Navigation/Title',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0,
    className: 'unv-text--nav-title',
    usage: "Nome do autor em overlays sobre mídia (Story, Live).",
  },
  navigationBadge: {
    styleName: 'Navigation/Badge',
    unooria: '--unooria-size-caption-xxxs',
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 14,
    letterSpacing: 0,
    className: 'unv-text--nav-badge',
    usage: "Etiqueta LIVE e selos minúsculos.",
  },
};

/**
 * Ordem canônica de exibição da escala em documentação.
 */
export const unvTypographyOrder: UnvTypographyToken[] = [
  'headingH3',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'bodyLarge',
  'bodyMedium',
  'labelLarge',
  'labelMedium',
  'captionLarge',
  'captionMedium',
  'overlineDefault',
  'overlineSmall',
  'navigationTitle',
  'navigationBadge',
];
