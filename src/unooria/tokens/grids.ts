/**
 * Tokens de Grid & Layout do Design System 'Plataforma Unooria'
 * Extraídos das especificações do Figma.
 */

export type GridBreakpointKey = 'mobile' | 'tablet' | 'notebook' | 'desktop';

export interface GridBreakpointConfig {
  /** Nome identificador do dispositivo/breakpoint */
  name: string;
  /** Descrição de uso e aplicação do breakpoint */
  description: string;
  /** Largura mínima da viewport (em px) para acionamento das regras de media query */
  minWidthPx: number;
  /** Largura mínima formatada em string (ex: '0px', '768px', '1280px', '1920px') */
  minWidth: string;
  /** Largura de referência do canvas no Figma (em px) */
  canvasWidthPx: number;
  /** Número de colunas do grid */
  columns: number;
  /** Largura da coluna no canvas de referência (em px) */
  columnWidthPx: number;
  /** Espaçamento entre colunas (gutter / gap) em px */
  gutterPx: number;
  /** Espaçamento entre colunas (gutter / gap) formatado (ex: '12px' ou '24px') */
  gutter: string;
  /** Margem externa / padding nas extremidades (corners) em px */
  marginPx: number;
  /** Margem externa / padding nas extremidades formatado (ex: '12px', '24px', '48px') */
  margin: string;
  /** Largura máxima útil do container em px (colunas * largura_coluna + gutters) */
  maxContainerWidthPx: number;
  /** Largura máxima útil do container formatada */
  maxContainerWidth: string;
}

/** Configurações detalhadas dos breakpoints do sistema de grid da Plataforma Unooria */
export const gridBreakpoints: Record<GridBreakpointKey, GridBreakpointConfig> = {
  mobile: {
    name: 'Mobile',
    description: 'Dispositivos móveis e telas pequenas (smartphones)',
    minWidthPx: 0,
    minWidth: '0px',
    canvasWidthPx: 375,
    columns: 4,
    columnWidthPx: 75,
    gutterPx: 12,
    gutter: '12px',
    marginPx: 12,
    margin: '12px',
    maxContainerWidthPx: 351,
    maxContainerWidth: '351px',
  },
  tablet: {
    name: 'Tablet',
    description: 'Tablets em orientação retrato/paisagem e telas intermediárias',
    minWidthPx: 768,
    minWidth: '768px',
    canvasWidthPx: 1280,
    columns: 8,
    columnWidthPx: 133,
    gutterPx: 24,
    gutter: '24px',
    marginPx: 24,
    margin: '24px',
    maxContainerWidthPx: 1232,
    maxContainerWidth: '1232px',
  },
  notebook: {
    name: 'Notebook',
    description: 'Laptops, notebooks e monitores compactos',
    minWidthPx: 1280,
    minWidth: '1280px',
    canvasWidthPx: 1440,
    columns: 12,
    columnWidthPx: 90,
    gutterPx: 24,
    gutter: '24px',
    marginPx: 48,
    margin: '48px',
    maxContainerWidthPx: 1344,
    maxContainerWidth: '1344px',
  },
  desktop: {
    name: 'Desktop',
    description: 'Monitores de alta resolução e monitores widescreen',
    minWidthPx: 1920,
    minWidth: '1920px',
    canvasWidthPx: 1920,
    columns: 12,
    columnWidthPx: 130,
    gutterPx: 24,
    gutter: '24px',
    marginPx: 48,
    margin: '48px',
    maxContainerWidthPx: 1824,
    maxContainerWidth: '1824px',
  },
};

/** Mapeamento de quantidade de colunas por breakpoint */
export const gridColumns: Record<GridBreakpointKey, number> = {
  mobile: gridBreakpoints.mobile.columns,
  tablet: gridBreakpoints.tablet.columns,
  notebook: gridBreakpoints.notebook.columns,
  desktop: gridBreakpoints.desktop.columns,
};

/** Mapeamento de espaçamentos entre colunas (gutters) por breakpoint */
export const gridGutters: Record<GridBreakpointKey, string> = {
  mobile: gridBreakpoints.mobile.gutter,
  tablet: gridBreakpoints.tablet.gutter,
  notebook: gridBreakpoints.notebook.gutter,
  desktop: gridBreakpoints.desktop.gutter,
};

/** Mapeamento de margens laterais externas por breakpoint */
export const gridMargins: Record<GridBreakpointKey, string> = {
  mobile: gridBreakpoints.mobile.margin,
  tablet: gridBreakpoints.tablet.margin,
  notebook: gridBreakpoints.notebook.margin,
  desktop: gridBreakpoints.desktop.margin,
};

/** Mapeamento de larguras máximas de container por breakpoint */
export const gridContainerWidths: Record<GridBreakpointKey, string> = {
  mobile: gridBreakpoints.mobile.maxContainerWidth,
  tablet: gridBreakpoints.tablet.maxContainerWidth,
  notebook: gridBreakpoints.notebook.maxContainerWidth,
  desktop: gridBreakpoints.desktop.maxContainerWidth,
};

/** Mapeamento de pontos de interrupção (breakpoints de media query) */
export const breakpoints = {
  mobile: gridBreakpoints.mobile.minWidth,
  tablet: gridBreakpoints.tablet.minWidth,
  notebook: gridBreakpoints.notebook.minWidth,
  desktop: gridBreakpoints.desktop.minWidth,
} as const;

/**
 * ESPECIFICAÇÕES DE GRIDS WIDGETS
 * Extraídas diretamente do Figma (node 17777:3282 - Grids Widgets)
 */

export type GridWidgetKey =
  | 'mobile360'
  | 'mobile375'
  | 'tabletPortrait'
  | 'tabletLandscape'
  | 'notebook'
  | 'desktop';

export interface WidgetLayoutItem {
  /** Nome ou rótulo da área do widget */
  label: string;
  /** Número de colunas ocupadas (span) */
  columnsSpan: number;
  /** Largura de referência no canvas em px */
  widthPx: number;
  /** Percentual de flexibilidade referente à largura do canvas */
  flexiblePercentage: string;
  /** Valor numérico do percentual */
  percentageValue: number;
}

export interface GridWidgetSpec {
  /** Identificador legível */
  name: string;
  /** Categoria do dispositivo */
  deviceCategory: 'Mobile' | 'Tablet' | 'Notebook' | 'Desktop';
  /** Orientação ou nota */
  orientation?: string;
  /** Largura de referência do canvas no Figma */
  canvasWidthPx: number;
  /** Margem lateral / padding externo em px */
  marginPx: number;
  /** Margem lateral formatada */
  margin: string;
  /** Gutter / Gap entre widgets em px */
  gutterPx: number;
  /** Gutter formatado */
  gutter: string;
  /** Lista de widgets dispostos no layout de referência */
  widgets: WidgetLayoutItem[];
}

/** Configuração detalhada dos layouts de Grids Widgets por breakpoint do Figma */
export const gridWidgetsBreakpoints: Record<GridWidgetKey, GridWidgetSpec> = {
  mobile360: {
    name: 'Mobile 360px',
    deviceCategory: 'Mobile',
    canvasWidthPx: 360,
    marginPx: 16,
    margin: '16px',
    gutterPx: 0,
    gutter: '0px',
    widgets: [
      {
        label: 'Widget Unico',
        columnsSpan: 4,
        widthPx: 328,
        flexiblePercentage: '93,33%',
        percentageValue: 93.33,
      },
    ],
  },
  mobile375: {
    name: 'Mobile 375px',
    deviceCategory: 'Mobile',
    canvasWidthPx: 375,
    marginPx: 16,
    margin: '16px',
    gutterPx: 0,
    gutter: '0px',
    widgets: [
      {
        label: 'Widget Unico',
        columnsSpan: 4,
        widthPx: 343,
        flexiblePercentage: '93,60%',
        percentageValue: 93.6,
      },
    ],
  },
  tabletPortrait: {
    name: 'Tablet (Retrato)',
    deviceCategory: 'Tablet',
    orientation: 'Portrait',
    canvasWidthPx: 800,
    marginPx: 24,
    margin: '24px',
    gutterPx: 24,
    gutter: '24px',
    widgets: [
      {
        label: 'Widget Card 1',
        columnsSpan: 4,
        widthPx: 336,
        flexiblePercentage: '42,00%',
        percentageValue: 42.0,
      },
      {
        label: 'Widget Card 2',
        columnsSpan: 4,
        widthPx: 336,
        flexiblePercentage: '42,00%',
        percentageValue: 42.0,
      },
    ],
  },
  tabletLandscape: {
    name: 'Tablet (Paisagem)',
    deviceCategory: 'Tablet',
    orientation: 'Landscape',
    canvasWidthPx: 1280,
    marginPx: 24,
    margin: '24px',
    gutterPx: 24,
    gutter: '24px',
    widgets: [
      {
        label: 'Widget Card',
        columnsSpan: 2,
        widthPx: 336,
        flexiblePercentage: '26,25%',
        percentageValue: 26.25,
      },
      {
        label: 'Widget Card',
        columnsSpan: 2,
        widthPx: 336,
        flexiblePercentage: '26,25%',
        percentageValue: 26.25,
      },
    ],
  },
  notebook: {
    name: 'Notebook',
    deviceCategory: 'Notebook',
    canvasWidthPx: 1440,
    marginPx: 48,
    margin: '48px',
    gutterPx: 24,
    gutter: '24px',
    widgets: [
      {
        label: 'Widget Esquerda',
        columnsSpan: 2,
        widthPx: 204,
        flexiblePercentage: '14,17%',
        percentageValue: 14.17,
      },
      {
        label: 'Widget Central',
        columnsSpan: 6,
        widthPx: 660,
        flexiblePercentage: '45,83%',
        percentageValue: 45.83,
      },
      {
        label: 'Widget Direita',
        columnsSpan: 2,
        widthPx: 204,
        flexiblePercentage: '14,17%',
        percentageValue: 14.17,
      },
    ],
  },
  desktop: {
    name: 'Desktop',
    deviceCategory: 'Desktop',
    canvasWidthPx: 1920,
    marginPx: 48,
    margin: '48px',
    gutterPx: 24,
    gutter: '24px',
    widgets: [
      {
        label: 'Widget Esquerda',
        columnsSpan: 2,
        widthPx: 284,
        flexiblePercentage: '14,79%',
        percentageValue: 14.79,
      },
      {
        label: 'Widget Central',
        columnsSpan: 6,
        widthPx: 900,
        flexiblePercentage: '46,88%',
        percentageValue: 46.88,
      },
      {
        label: 'Widget Direita',
        columnsSpan: 2,
        widthPx: 284,
        flexiblePercentage: '14,79%',
        percentageValue: 14.79,
      },
    ],
  },
};

