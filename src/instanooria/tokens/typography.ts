/**
 * Tokens de Tipografia do Design System Instanooria.
 * Escala oficial do Figma na família SF Pro (iOS).
 */

/**
 * Chaves da escala tipográfica oficial do Instanooria.
 */
export type InstaTypographyToken =
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
export interface InstaTypographyStyle {
  /** Nome do estilo no Figma (ex.: "Title/Large") */
  figmaName: string;
  /** Tamanho da fonte em pixels */
  fontSize: number;
  /** Peso da fonte (400 Regular, 510 Medium, 590 Semibold) */
  fontWeight: number;
  /** Altura de linha em pixels ou multiplicador quando o Figma usa "100%" */
  lineHeight: number | string;
  /** Espaçamento entre letras em pixels */
  letterSpacing: number;
  /** Classe utilitária CSS correspondente */
  className: string;
  /** Uso recomendado dentro do produto */
  usage: string;
}

/**
 * Família tipográfica oficial com cadeia de fallback multiplataforma.
 */
export const instaFontFamily =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/**
 * Pesos disponíveis na família SF Pro.
 */
export const instaFontWeights = {
  regular: 400,
  medium: 510,
  semibold: 590,
} as const;

/**
 * Escala tipográfica completa extraída do Figma.
 */
export const instaTypography: Record<InstaTypographyToken, InstaTypographyStyle> = {
  headingH3: {
    figmaName: 'Heading/H3',
    fontSize: 17,
    fontWeight: 590,
    lineHeight: 1,
    letterSpacing: -0.5,
    className: 'insta-text--heading-h3',
    usage: 'Títulos de seção em telas de conteúdo (IGTV, coleções).',
  },
  titleLarge: {
    figmaName: 'Title/Large',
    fontSize: 16,
    fontWeight: 590,
    lineHeight: 21,
    letterSpacing: -0.33,
    className: 'insta-text--title-lg',
    usage: 'Título da barra superior e nome de usuário no perfil.',
  },
  titleMedium: {
    figmaName: 'Title/Medium',
    fontSize: 15,
    fontWeight: 590,
    lineHeight: 1,
    letterSpacing: -0.3,
    className: 'insta-text--title-md',
    usage: 'Números de estatísticas do perfil e títulos de agrupamento.',
  },
  titleSmall: {
    figmaName: 'Title/Small',
    fontSize: 14,
    fontWeight: 590,
    lineHeight: 1,
    letterSpacing: -0.15,
    className: 'insta-text--title-sm',
    usage: 'Rótulos de botões, abas segmentadas e chips.',
  },
  bodyLarge: {
    figmaName: 'Body/Large',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.3,
    className: 'insta-text--body-lg',
    usage: 'Campos de entrada, busca e textos longos de formulário.',
  },
  bodyMedium: {
    figmaName: 'Body/Medium',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: -0.25,
    className: 'insta-text--body-md',
    usage: 'Itens de menu lateral, linhas de lista e composer de story.',
  },
  labelLarge: {
    figmaName: 'Label/Large',
    fontSize: 13,
    fontWeight: 590,
    lineHeight: 18,
    letterSpacing: -0.1,
    className: 'insta-text--label-lg',
    usage: 'Nome de usuário no cabeçalho do post e termos em destaque.',
  },
  labelMedium: {
    figmaName: 'Label/Medium',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: -0.1,
    className: 'insta-text--label-md',
    usage: 'Corpo de legendas, prévia de mensagens e notificações.',
  },
  captionLarge: {
    figmaName: 'Caption/Large',
    fontSize: 12,
    fontWeight: 590,
    lineHeight: 1,
    letterSpacing: 0,
    className: 'insta-text--caption-lg',
    usage: 'Rótulos curtos em negrito e ações inline.',
  },
  captionMedium: {
    figmaName: 'Caption/Medium',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: 0,
    className: 'insta-text--caption-md',
    usage: 'Nome sob o story, contador de mídia e rótulos de destaque.',
  },
  overlineDefault: {
    figmaName: 'Overline/Default',
    fontSize: 11,
    fontWeight: 590,
    lineHeight: 1,
    letterSpacing: 0,
    className: 'insta-text--overline',
    usage: 'Rótulos auxiliares em negrito (separadores "OR", seções).',
  },
  overlineSmall: {
    figmaName: 'Overline/Small',
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: 0.07,
    className: 'insta-text--overline-sm',
    usage: 'Localização do post e data de publicação.',
  },
  navigationTitle: {
    figmaName: 'Navigation/Title',
    fontSize: 14,
    fontWeight: 510,
    lineHeight: 1,
    letterSpacing: 0.33,
    className: 'insta-text--nav-title',
    usage: 'Nome do autor em overlays sobre mídia (Story, Live).',
  },
  navigationBadge: {
    figmaName: 'Navigation/Badge',
    fontSize: 8,
    fontWeight: 510,
    lineHeight: 1,
    letterSpacing: 0.5,
    className: 'insta-text--nav-badge',
    usage: 'Etiqueta LIVE e selos minúsculos sobre anéis de story.',
  },
};

/**
 * Ordem canônica de exibição da escala em documentação.
 */
export const instaTypographyOrder: InstaTypographyToken[] = [
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
