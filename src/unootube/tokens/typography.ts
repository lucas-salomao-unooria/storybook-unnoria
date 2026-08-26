/**
 * Tokens de Tipografia do Design System Unootube.
 *
 * Espelho TypeScript de `typography.css`. Extraídos do quadro `Typography`
 * (`106:3067`) da página `🎨 Design System`. O arquivo declara onze degraus em
 * Roboto, com dois pesos e `letter-spacing` zero em todos eles.
 */

/**
 * Descrição de um degrau da escala tipográfica.
 */
export interface UniTypographyToken {
  /** Nome do estilo no arquivo de design */
  figmaName: string;
  /** Node do Figma em que o degrau foi medido */
  figmaNode: string;
  /** Prefixo das variáveis CSS correspondentes */
  cssVarPrefix: string;
  /** Corpo em pixels */
  fontSize: number;
  /** Altura de linha em pixels */
  lineHeight: number;
  /** Peso da fonte */
  fontWeight: 400 | 700;
  /** Uso declarado pelo arquivo */
  usage: string;
}

/**
 * Família tipográfica única do arquivo.
 *
 * Roboto é distribuída pelo Google Fonts sob licença Apache 2.0, portanto pode
 * ser carregada diretamente — ao contrário da Proxima Nova do Tik Tooria, não
 * há necessidade de pilha substituta.
 */
export const UNI_FONT_FAMILY =
  "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif";

/**
 * Os onze degraus publicados pelo arquivo, na ordem do quadro.
 */
export const uniTypography: Record<string, UniTypographyToken> = {
  headingH1: { figmaName: 'Heading/H1', figmaNode: '106:3070', cssVarPrefix: '--uni-font-heading-h1', fontSize: 24, lineHeight: 32, fontWeight: 700, usage: 'Títulos de página e texto de destaque' },
  headingH2: { figmaName: 'Heading/H2', figmaNode: '106:3075', cssVarPrefix: '--uni-font-heading-h2', fontSize: 20, lineHeight: 28, fontWeight: 700, usage: 'Cabeçalhos de seção' },
  headingH3: { figmaName: 'Heading/H3', figmaNode: '106:3080', cssVarPrefix: '--uni-font-heading-h3', fontSize: 18, lineHeight: 24, fontWeight: 700, usage: 'Títulos de cartão e subtítulos' },
  headingH4: { figmaName: 'Heading/H4', figmaNode: '106:3085', cssVarPrefix: '--uni-font-heading-h4', fontSize: 16, lineHeight: 22, fontWeight: 700, usage: 'Cabeçalhos da barra lateral' },
  bodyLg: { figmaName: 'Body/Large', figmaNode: '106:3090', cssVarPrefix: '--uni-font-body-lg', fontSize: 16, lineHeight: 24, fontWeight: 400, usage: 'Descrições e parágrafos' },
  bodyMd: { figmaName: 'Body/Medium', figmaNode: '106:3095', cssVarPrefix: '--uni-font-body-md', fontSize: 14, lineHeight: 20, fontWeight: 400, usage: 'Corpo de texto padrão' },
  bodySm: { figmaName: 'Body/Small', figmaNode: '106:3100', cssVarPrefix: '--uni-font-body-sm', fontSize: 13, lineHeight: 18, fontWeight: 400, usage: 'Conteúdo secundário' },
  caption: { figmaName: 'Caption/Default', figmaNode: '106:3105', cssVarPrefix: '--uni-font-caption', fontSize: 12, lineHeight: 18, fontWeight: 400, usage: 'Metadados e datas' },
  captionSm: { figmaName: 'Caption/Small', figmaNode: '106:3110', cssVarPrefix: '--uni-font-caption-sm', fontSize: 10, lineHeight: 14, fontWeight: 400, usage: 'Informação terciária e selos' },
  labelLg: { figmaName: 'Label/Large', figmaNode: '106:3115', cssVarPrefix: '--uni-font-label-lg', fontSize: 14, lineHeight: 20, fontWeight: 700, usage: 'Rótulo de botão e de navegação' },
  labelMd: { figmaName: 'Label/Medium', figmaNode: '106:3120', cssVarPrefix: '--uni-font-label-md', fontSize: 12, lineHeight: 18, fontWeight: 700, usage: 'Botões pequenos e abas' },
};
