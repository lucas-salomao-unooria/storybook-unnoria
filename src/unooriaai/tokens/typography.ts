/**
 * Tokens de Tipografia do Design System UnooriaAI.
 *
 * Espelho TypeScript de `typography.css`: família e degraus da Plataforma
 * Unooria (Open Sans). Pesos 400, 500, 600 e 700; sem letter-spacing.
 */

/**
 * Nomes dos estilos de texto.
 */
export type UaiTextStyleName =
  | 'displayXl'
  | 'displayLg'
  | 'headingH1'
  | 'headingH2'
  | 'headingH3'
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'bodyXs'
  | 'labelLg'
  | 'labelMd'
  | 'labelSm'
  | 'caption';

/**
 * Definição de um estilo de texto.
 */
export interface UaiTextStyle {
  /** Nome do estilo na escala do UnooriaAI (ex.: "Body/SM") */
  styleName: string;
  /** Token da Unooria de que o tamanho foi copiado (ex.: "--unooria-size-body-xs") */
  unooria: string;
  /** Tamanho da fonte em px */
  fontSize: number;
  /** Altura de linha em px */
  lineHeight: number;
  /** Peso da fonte */
  fontWeight: 400 | 500 | 600 | 700;
  /** Espaçamento entre letras em px (sempre 0) */
  letterSpacing: 0;
  /** Prefixo das variáveis CSS do estilo (`-size`, `-weight`, `-line`, `-tracking`) */
  cssPrefix: string;
  /** Uso recomendado dentro do produto */
  usage: string;
}

/**
 * Família tipográfica com cadeia de fallback multiplataforma.
 */
export const uaiFontFamily = "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/**
 * Pesos disponíveis.
 */
export const uaiFontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Escala tipográfica completa.
 */
export const uaiTextStyles: Record<UaiTextStyleName, UaiTextStyle> = {
  displayXl: {
    styleName: 'Display/XL',
    unooria: '--unooria-size-heading-4xl',
    fontSize: 60,
    lineHeight: 78,
    fontWeight: 700,
    letterSpacing: 0,
    cssPrefix: '--uai-font-display-xl',
    usage: "Título de boas-vindas em tela cheia",
  },
  displayLg: {
    styleName: 'Display/LG',
    unooria: '--unooria-size-heading-xxxl',
    fontSize: 48,
    lineHeight: 64,
    fontWeight: 700,
    letterSpacing: 0,
    cssPrefix: '--uai-font-display-lg',
    usage: "Título de destaque",
  },
  headingH1: {
    styleName: 'Heading/H1',
    unooria: '--unooria-size-heading-xxl',
    fontSize: 34,
    lineHeight: 48,
    fontWeight: 700,
    letterSpacing: 0,
    cssPrefix: '--uai-font-heading-h1',
    usage: "Título de página",
  },
  headingH2: {
    styleName: 'Heading/H2',
    unooria: '--unooria-size-title-xl',
    fontSize: 24,
    lineHeight: 34,
    fontWeight: 600,
    letterSpacing: 0,
    cssPrefix: '--uai-font-heading-h2',
    usage: "Título de diálogo e de seção",
  },
  headingH3: {
    styleName: 'Heading/H3',
    unooria: '--unooria-size-body-m',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 600,
    letterSpacing: 0,
    cssPrefix: '--uai-font-heading-h3',
    usage: "Subtítulo e título de coluna",
  },
  bodyLg: {
    styleName: 'Body/LG',
    unooria: '--unooria-size-body-m',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 400,
    letterSpacing: 0,
    cssPrefix: '--uai-font-body-lg',
    usage: "Texto de leitura ampliado",
  },
  bodyMd: {
    styleName: 'Body/MD',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
    letterSpacing: 0,
    cssPrefix: '--uai-font-body-md',
    usage: "Texto de leitura",
  },
  bodySm: {
    styleName: 'Body/SM',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
    letterSpacing: 0,
    cssPrefix: '--uai-font-body-sm',
    usage: "Corpo padrão da interface",
  },
  bodyXs: {
    styleName: 'Body/XS',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 400,
    letterSpacing: 0,
    cssPrefix: '--uai-font-body-xs',
    usage: "Texto auxiliar",
  },
  labelLg: {
    styleName: 'Label/LG',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 600,
    letterSpacing: 0,
    cssPrefix: '--uai-font-label-lg',
    usage: "Rótulo de botão grande",
  },
  labelMd: {
    styleName: 'Label/MD',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 600,
    letterSpacing: 0,
    cssPrefix: '--uai-font-label-md',
    usage: "Rótulo de botão e de campo",
  },
  labelSm: {
    styleName: 'Label/SM',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 600,
    letterSpacing: 0,
    cssPrefix: '--uai-font-label-sm',
    usage: "Rótulo de selo e de seção",
  },
  caption: {
    styleName: 'Caption',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 400,
    letterSpacing: 0,
    cssPrefix: '--uai-font-caption',
    usage: "Legenda e texto de ajuda",
  },
};
