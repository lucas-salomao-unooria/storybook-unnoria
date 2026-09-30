/**
 * Tokens de Tipografia do Design System Unoogaleria.
 * Família e degraus da Plataforma Unooria (Open Sans). Espelho TypeScript de
 * `typography.css`, gerado da mesma tabela.
 */

/**
 * Chaves da escala tipográfica da Unoogaleria.
 */
export type UglTypographyToken =
  | 'display'
  | 'heading'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'label'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'captionStrong'
  | 'caption';

/**
 * Definição completa de um estilo tipográfico.
 */
export interface UglTypographyStyle {
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
export const uglFontFamily =
  "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/**
 * Família da biblioteca de ícones (fonte de ligadura).
 */
export const uglIconFontFamily = "'Material Symbols Rounded', sans-serif";

/**
 * Pesos disponíveis.
 */
export const uglFontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const;

/**
 * Escala tipográfica completa.
 */
export const uglTypography: Record<UglTypographyToken, UglTypographyStyle> = {
  display: {
    styleName: 'Display',
    unooria: '--unooria-size-heading-xxl',
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 48,
    letterSpacing: 0,
    cssVar: '--ugl-font-display-size',
    className: 'ugl-text--display',
    usage: "Título grande das telas: Biblioteca, Álbuns e Busca.",
  },
  heading: {
    styleName: 'Heading',
    unooria: '--unooria-size-title-xl',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 34,
    letterSpacing: 0,
    cssVar: '--ugl-font-heading-size',
    className: 'ugl-text--heading',
    usage: "Título de álbum aberto e de memória sobre a capa.",
  },
  titleLarge: {
    styleName: 'Title/Large',
    unooria: '--unooria-size-title-l',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 30,
    letterSpacing: 0,
    cssVar: '--ugl-font-title-lg-size',
    className: 'ugl-text--title-lg',
    usage: "Título de seção: \"Meus álbuns\", \"Hoje\", \"Tipos de mídia\".",
  },
  titleMedium: {
    styleName: 'Title/Medium',
    unooria: '--unooria-size-body-m',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 28,
    letterSpacing: 0,
    cssVar: '--ugl-font-title-md-size',
    className: 'ugl-text--title-md',
    usage: "Título da barra compacta, de diálogos e do visualizador.",
  },
  titleSmall: {
    styleName: 'Title/Small',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0,
    cssVar: '--ugl-font-title-sm-size',
    className: 'ugl-text--title-sm',
    usage: "Título de linha de lista, de folha inferior e botão grande.",
  },
  label: {
    styleName: 'Label',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0,
    cssVar: '--ugl-font-label-size',
    className: 'ugl-text--label',
    usage: "Rótulos de botão, chip, segmento e ações de texto.",
  },
  bodyLarge: {
    styleName: 'Body/Large',
    unooria: '--unooria-size-body-s',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0,
    cssVar: '--ugl-font-body-lg-size',
    className: 'ugl-text--body-lg',
    usage: "Campos, legenda da foto e descrição de estado vazio.",
  },
  bodyMedium: {
    styleName: 'Body/Medium',
    unooria: '--unooria-size-body-xs',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0,
    cssVar: '--ugl-font-body-md-size',
    className: 'ugl-text--body-md',
    usage: "Itens de menu, metadados do painel de informações e textos de apoio.",
  },
  captionStrong: {
    styleName: 'Caption/Strong',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 18,
    letterSpacing: 0,
    cssVar: '--ugl-font-caption-strong-size',
    className: 'ugl-text--caption-strong',
    usage: "Rótulos da barra de abas, duração do vídeo e contagem da seleção.",
  },
  caption: {
    styleName: 'Caption',
    unooria: '--unooria-size-body-xxs',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: 0,
    cssVar: '--ugl-font-caption-size',
    className: 'ugl-text--caption',
    usage: "Contagem de itens do álbum, hora e rótulo dos filtros do editor.",
  },
};

/**
 * Ordem canônica de exibição da escala em documentação.
 */
export const uglTypographyOrder: UglTypographyToken[] = [
  'display',
  'heading',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'label',
  'bodyLarge',
  'bodyMedium',
  'captionStrong',
  'caption',
];
