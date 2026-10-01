/**
 * Tokens de Tipografia do Design System Unoojornal.
 * Família e degraus da Plataforma Unooria (Open Sans). Espelho TypeScript de
 * `typography.css`, gerado da mesma tabela.
 */

/**
 * Chaves da escala tipográfica do módulo.
 */
export type UjnTypographyToken =
  | 'masthead'
  | 'headlineXl'
  | 'headline'
  | 'titleLarge'
  | 'titleMedium'
  | 'deck'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'quote'
  | 'labelLarge'
  | 'label'
  | 'kicker'
  | 'caption';

/**
 * Definição completa de um estilo tipográfico.
 */
export interface UjnTypographyStyle {
  /** Nome do estilo na escala (ex.: "Title/Large") */
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
  /** Variável CSS de tamanho (as demais trocam o sufixo) */
  cssVar: string;
  /** Classe utilitária CSS correspondente */
  className: string;
  /** Uso recomendado dentro do produto */
  usage: string;
}

/**
 * Família tipográfica com cadeia de fallback multiplataforma.
 */
export const ujnFontFamily =
  "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/**
 * Família da biblioteca de ícones (fonte de ligadura).
 */
export const ujnIconFontFamily = "'Material Symbols Rounded', sans-serif";

/**
 * Pesos disponíveis.
 */
export const ujnFontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const;

/**
 * Escala tipográfica completa.
 */
export const ujnTypography: Record<UjnTypographyToken, UjnTypographyStyle> = {
  masthead: {
    styleName: 'Masthead',
    unooria: '--unooria-size-heading-4xl',
    fontSize: 60,
    fontWeight: 700,
    lineHeight: 78,
    letterSpacing: 0,
    cssVar: '--ujn-font-masthead-size',
    className: 'ujn-text--masthead',
    usage: "Nome da publicação no cabeçalho.",
  },
  headlineXl: {
    styleName: 'Headline/XL',
    unooria: '--unooria-size-heading-xxxl',
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 64,
    letterSpacing: 0,
    cssVar: '--ujn-font-headline-xl-size',
    className: 'ujn-text--headline-xl',
    usage: "Título da matéria aberta.",
  },
  headline: {
    styleName: 'Headline',
    unooria: '--unooria-size-heading-xxl',
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 48,
    letterSpacing: 0,
    cssVar: '--ujn-font-headline-size',
    className: 'ujn-text--headline',
    usage: "Título da matéria de capa.",
  },
  titleLarge: {
    styleName: 'Title/Large',
    unooria: '--unooria-size-title-xl',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 34,
    letterSpacing: 0,
    cssVar: '--ujn-font-title-lg-size',
    className: 'ujn-text--title-lg',
    usage: "Título de seção e da caixa de opinião.",
  },
  titleMedium: {
    styleName: 'Title/Medium',
    unooria: '--unooria-size-title-l',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 30,
    letterSpacing: 0,
    cssVar: '--ujn-font-title-md-size',
    className: 'ujn-text--title-md',
    usage: "Título de item de lista e de cartão.",
  },
  deck: {
    styleName: 'Deck',
    unooria: '--unooria-size-title-l',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 30,
    letterSpacing: 0,
    cssVar: '--ujn-font-deck-size',
    className: 'ujn-text--deck',
    usage: "Linha fina sob o título da matéria.",
  },
  bodyLarge: {
    styleName: 'Body/Large',
    unooria: '--unooria-size-body-m',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 28,
    letterSpacing: 0,
    cssVar: '--ujn-font-body-lg-size',
    className: 'ujn-text--body-lg',
    usage: "Corpo da matéria aberta.",
  },
  bodyMedium: {
    styleName: 'Body/Medium',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0,
    cssVar: '--ujn-font-body-md-size',
    className: 'ujn-text--body-md',
    usage: "Resumo do item de lista, texto de caixas e campos.",
  },
  bodySmall: {
    styleName: 'Body/Small',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0,
    cssVar: '--ujn-font-body-sm-size',
    className: 'ujn-text--body-sm',
    usage: "Autoria, legenda e texto de apoio.",
  },
  quote: {
    styleName: 'Quote',
    unooria: '--unooria-size-title-xl',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 34,
    letterSpacing: 0,
    cssVar: '--ujn-font-quote-size',
    className: 'ujn-text--quote',
    usage: "Citação em destaque (itálico).",
  },
  labelLarge: {
    styleName: 'Label/Large',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0,
    cssVar: '--ujn-font-label-lg-size',
    className: 'ujn-text--label-lg',
    usage: "Rótulo de botão.",
  },
  label: {
    styleName: 'Label',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0,
    cssVar: '--ujn-font-label-size',
    className: 'ujn-text--label',
    usage: "Navegação, pílulas de filtro e ações de texto.",
  },
  kicker: {
    styleName: 'Kicker',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 18,
    letterSpacing: 0,
    cssVar: '--ujn-font-kicker-size',
    className: 'ujn-text--kicker',
    usage: "Categoria sobre o título (caixa alta).",
  },
  caption: {
    styleName: 'Caption',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: 0,
    cssVar: '--ujn-font-caption-size',
    className: 'ujn-text--caption',
    usage: "Tempo de leitura, hora e direitos autorais.",
  },
};

/**
 * Ordem canônica de exibição da escala em documentação.
 */
export const ujnTypographyOrder: UjnTypographyToken[] = [
  'masthead',
  'headlineXl',
  'headline',
  'titleLarge',
  'titleMedium',
  'deck',
  'bodyLarge',
  'bodyMedium',
  'bodySmall',
  'quote',
  'labelLarge',
  'label',
  'kicker',
  'caption',
];
