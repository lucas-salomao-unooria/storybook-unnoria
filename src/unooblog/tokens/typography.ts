/**
 * Tokens de Tipografia do Design System Unooblog.
 * Família e degraus da Plataforma Unooria (Open Sans). Espelho TypeScript de
 * `typography.css`, gerado da mesma tabela.
 */

/**
 * Chaves da escala tipográfica do módulo.
 */
export type UblTypographyToken =
  | 'display'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'lead'
  | 'prose'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'quote'
  | 'labelLarge'
  | 'label'
  | 'caption'
  | 'captionStrong'
  | 'code';

/**
 * Definição completa de um estilo tipográfico.
 */
export interface UblTypographyStyle {
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
export const ublFontFamily =
  "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/**
 * Pilha monoespaçada do sistema (a Unooria não publica fonte monoespaçada).
 */
export const ublFontMono =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

/**
 * Família da biblioteca de ícones (fonte de ligadura).
 */
export const ublIconFontFamily = "'Material Symbols Rounded', sans-serif";

/**
 * Pesos disponíveis.
 */
export const ublFontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const;

/**
 * Escala tipográfica completa.
 */
export const ublTypography: Record<UblTypographyToken, UblTypographyStyle> = {
  display: {
    styleName: 'Display',
    unooria: '--unooria-size-heading-4xl',
    fontSize: 60,
    fontWeight: 700,
    lineHeight: 78,
    letterSpacing: 0,
    cssVar: '--ubl-font-display-size',
    className: 'ubl-text--display',
    usage: "Título do post em destaque na capa do blog.",
  },
  heading1: {
    styleName: 'Heading/1',
    unooria: '--unooria-size-heading-xxxl',
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 64,
    letterSpacing: 0,
    cssVar: '--ubl-font-heading-1-size',
    className: 'ubl-text--heading-1',
    usage: "Título do post aberto (h1).",
  },
  heading2: {
    styleName: 'Heading/2',
    unooria: '--unooria-size-heading-xxl',
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 48,
    letterSpacing: 0,
    cssVar: '--ubl-font-heading-2-size',
    className: 'ubl-text--heading-2',
    usage: "Título de seção do post (h2) e da página.",
  },
  heading3: {
    styleName: 'Heading/3',
    unooria: '--unooria-size-title-xl',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 34,
    letterSpacing: 0,
    cssVar: '--ubl-font-heading-3-size',
    className: 'ubl-text--heading-3',
    usage: "Subtítulo de seção do post (h3) e título de cartão em destaque.",
  },
  heading4: {
    styleName: 'Heading/4',
    unooria: '--unooria-size-title-l',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 30,
    letterSpacing: 0,
    cssVar: '--ubl-font-heading-4-size',
    className: 'ubl-text--heading-4',
    usage: "Título de cartão, de série e de autor (h4).",
  },
  lead: {
    styleName: 'Lead',
    unooria: '--unooria-size-title-l',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 30,
    letterSpacing: 0,
    cssVar: '--ubl-font-lead-size',
    className: 'ubl-text--lead',
    usage: "Subtítulo do post sob o título.",
  },
  prose: {
    styleName: 'Prose',
    unooria: '--unooria-size-body-m',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 28,
    letterSpacing: 0,
    cssVar: '--ubl-font-prose-size',
    className: 'ubl-text--prose',
    usage: "Corpo do post: parágrafos, listas e comentários.",
  },
  bodyLarge: {
    styleName: 'Body/Large',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0,
    cssVar: '--ubl-font-body-lg-size',
    className: 'ubl-text--body-lg',
    usage: "Resumo do cartão, campos e texto de caixas.",
  },
  bodyMedium: {
    styleName: 'Body/Medium',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0,
    cssVar: '--ubl-font-body-md-size',
    className: 'ubl-text--body-md',
    usage: "Metadados, legenda e texto de apoio.",
  },
  quote: {
    styleName: 'Quote',
    unooria: '--unooria-size-title-xl',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 34,
    letterSpacing: 0,
    cssVar: '--ubl-font-quote-size',
    className: 'ubl-text--quote',
    usage: "Citação em bloco (itálico).",
  },
  labelLarge: {
    styleName: 'Label/Large',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0,
    cssVar: '--ubl-font-label-lg-size',
    className: 'ubl-text--label-lg',
    usage: "Rótulo de botão.",
  },
  label: {
    styleName: 'Label',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0,
    cssVar: '--ubl-font-label-size',
    className: 'ubl-text--label',
    usage: "Navegação, chips, abas e ações de texto.",
  },
  caption: {
    styleName: 'Caption',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: 0,
    cssVar: '--ubl-font-caption-size',
    className: 'ubl-text--caption',
    usage: "Data, contagem e direitos autorais.",
  },
  captionStrong: {
    styleName: 'Caption/Strong',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 18,
    letterSpacing: 0,
    cssVar: '--ubl-font-caption-strong-size',
    className: 'ubl-text--caption-strong',
    usage: "Selo, contagem destacada e rótulo de tópico.",
  },
  code: {
    styleName: 'Code',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0,
    cssVar: '--ubl-font-code-size',
    className: 'ubl-text--code',
    usage: "Código em bloco e em linha (pilha monoespaçada do sistema).",
  },
};

/**
 * Ordem canônica de exibição da escala em documentação.
 */
export const ublTypographyOrder: UblTypographyToken[] = [
  'display',
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'lead',
  'prose',
  'bodyLarge',
  'bodyMedium',
  'quote',
  'labelLarge',
  'label',
  'caption',
  'captionStrong',
  'code',
];
