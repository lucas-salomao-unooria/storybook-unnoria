import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Paleta de cores oficial do Design System Unooria para visualização de dados (DataViz).
 * Baseada no Figma Nó #5847:2154.
 */
export const UNOORIA_DATAVIZ_PALETTE = [
  '#7FA5E2', // Navy 600 - Base Primária
  '#A4BDE9', // Navy 400 - Azul Claro
  '#BDD0EF', // Navy 300 - Azul Pastel
  '#D3E0F5', // Navy 200 - Azul Suave
  '#2F4F7F', // Navy 800 - Azul Escuro
  '#8FAFE5', // Navy 500 - Azul Médio
  '#01B574', // Sucesso / Verde Esmeralda (Up)
  '#E31A1A', // Perigo / Vermelho Vivo (Down)
  '#DD5202', // Alerta / Laranja Vibrante
  '#8A38F5', // Purple 600 - Roxo Institucional
  '#E8EFFA', // Navy 100 - Fundo Suave
] as const;

export type DataVizPaletteColor = typeof UNOORIA_DATAVIZ_PALETTE[number] | string;
export type DataVizTheme = UnooriaTheme;

/**
 * Informações do balão / tooltip flutuante.
 */
export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  title?: string;
  label: string;
  value: string | number;
  color?: string;
}

/**
 * Ponto de dados padrão para gráficos.
 */
export interface DataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  color?: string;
  id?: string;
}

/**
 * Ponto de dados com múltiplos valores (para 1, 2, 3 ou 4 barras por categoria).
 */
export interface MultiBarDataPoint {
  label: string;
  values: number[];
  colors?: string[];
}

/**
 * Ponto de dados positivo/negativo.
 */
export interface PosNegDataPoint {
  label: string;
  positiveValues: number[];
  negativeValues: number[];
  colors?: string[];
}

/**
 * Série de dados para gráficos de linha ou área.
 */
export interface ChartSeries {
  id: string;
  name: string;
  data: number[];
  color?: string;
  strokeWidth?: number;
}

/**
 * Segmento para gráficos de pizza, donut e semi-donut.
 */
export interface DonutDataPoint {
  label: string;
  value: number;
  color?: string;
}

export type PieDataPoint = DonutDataPoint;

/**
 * Eixo ou variável do Gráfico Radar.
 */
export interface RadarAxis {
  label: string;
  value?: number; // 0 a maxValue
}

/**
 * Série de dados para o Gráfico Radar com múltiplos polígonos.
 */
export interface RadarSeries {
  name: string;
  values: number[];
  color?: string;
  fillOpacity?: number;
  strokeWidth?: number;
}

/**
 * Barra radial concêntrica.
 */
export interface RadialBarPoint {
  label: string;
  value: number; // 0 a 100
  color: string;
}

/**
 * Segmento da Barra de Progresso Empilhada.
 */
export interface StackedSegment {
  label: string;
  value: number;
  amountText?: string;
  color: string;
  /**
   * Como o segmento é desenhado. `'solid'` (padrão) é preenchido com `color`;
   * `'dashed'` não tem preenchimento e leva contorno TRACEJADO em `color` — na
   * barra e no marcador da legenda. Serve à categoria que é AUSÊNCIA, e não um
   * valor a mais (ex.: "não avaliado" num painel de níveis): sólida, ela seria
   * lida como mais um nível.
   */
  pattern?: StackedSegmentPattern;
}

/** O desenho de um segmento da barra empilhada. */
export type StackedSegmentPattern = 'solid' | 'dashed';

/**
 * Item de Ranking para o Top Courses / Ranking Card.
 */
export interface RankingItem {
  id: string;
  position: number;
  title: string;
  description?: string;
  tagText?: string;
  category?: string;
  score?: number | string;
}

/**
 * Propriedades base para os cards de DataViz.
 */
export interface BaseChartProps {
  title?: string;
  subtitle?: string;
  theme?: DataVizTheme;
  className?: string;
  style?: React.CSSProperties;
  showTooltip?: boolean;
}

export interface BarChartProps extends BaseChartProps {
  data: MultiBarDataPoint[] | DataPoint[];
  indicators?: { label: string; color: string }[];
  yAxisLabels?: string[];
  height?: number;
}

export interface PositiveNegativeBarChartProps extends BaseChartProps {
  data: PosNegDataPoint[];
  indicators?: { label: string; color: string }[];
  yAxisLabels?: string[];
  height?: number;
}

export interface LineChartProps extends BaseChartProps {
  categories: string[];
  series: ChartSeries[];
  isArea?: boolean;
  yAxisLabels?: string[];
  height?: number;
}

export interface PieChartProps extends BaseChartProps {
  data: PieDataPoint[];
  size?: number;
}

export interface SemiDonutChartProps extends BaseChartProps {
  data: DonutDataPoint[];
  size?: number;
}

export interface RadarChartProps extends BaseChartProps {
  /** Rótulos das categorias nos vértices (3 ou mais eixos dinâmicos) */
  axes?: (string | RadarAxis)[];
  /** Múltiplas séries poligonais sobrepostas */
  series?: RadarSeries[];
  /** Quantidade de níveis concêntricos de profundidade da grade (default: 4) */
  gridLevels?: number;
  /** Valor máximo da escala para cálculo proporcional (default: 100) */
  maxValue?: number;
  /** Exibir os rótulos de escala de profundidade na grade interna (default: false) */
  showGridLevelsLabels?: boolean;
  /** Opacidade de preenchimento dos polígonos de dados (default: 0.2) */
  fillOpacity?: number;
  /** Espessura do traço dos polígonos (default: 1.5) */
  strokeWidth?: number;
  /** Exibir marcadores circulares nos vértices (default: true) */
  showDots?: boolean;
  /** Índice do nível de grade a ser renderizado tracejado (default: 1) */
  dashedLevelIndex?: number;
  /** Cor padrão de fallback */
  color?: string;
}

export interface RadialBarChartProps extends BaseChartProps {
  data: RadialBarPoint[];
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  variant?: 'up' | 'down';
  /**
   * Variação a exibir na etiqueta (ex.: '+12%'). Sem ela a etiqueta não é
   * renderizada — o componente nunca inventa uma tendência.
   */
  tagText?: string;
  description?: string;
  theme?: DataVizTheme;
  className?: string;
  style?: React.CSSProperties;
}

export interface StackedProgressBarProps extends BaseChartProps {
  segments: StackedSegment[];
  totalLabel?: string;
  totalValue?: string | number;
}

export interface CircularProgressBarProps {
  value: number;
  size?: 48 | 56 | 66 | number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: string;
  theme?: DataVizTheme;
  className?: string;
}

export interface RankingCardProps extends BaseChartProps {
  items: RankingItem[];
  variant?: 'default' | 'label-only' | 'describe-only';
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  pageSize?: number;
}
