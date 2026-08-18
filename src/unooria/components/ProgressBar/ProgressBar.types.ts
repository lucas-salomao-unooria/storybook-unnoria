import React from 'react';
import { UnooriaTheme } from '../../tokens';

export type ProgressBarVariant =
  | 'brand'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

export type ProgressBarValuePosition = 'top' | 'inline' | 'bottom' | 'none';

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Valor numérico atual do progresso.
   * @default 0
   */
  value?: number;

  /**
   * Valor máximo da escala.
   * @default 100
   */
  max?: number;

  /**
   * Valor mínimo da escala.
   * @default 0
   */
  min?: number;

  /**
   * Título ou rótulo descritivo do processo (ex: "Carregando arquivos...", "Etapa 2 de 3").
   */
  label?: React.ReactNode;

  /**
   * Se true, exibe o valor percentual ou formatado.
   * @default true
   */
  showValue?: boolean;

  /**
   * Posição do texto de valor/percentual:
   * - `top`: Variante 1 do Figma (Título à esquerda e % à direita na linha superior).
   * - `inline`: Variante 2 do Figma (Título no topo e % ao lado direito da barra).
   * - `bottom`: Abaixo da barra de progresso.
   * - `none`: Oculta o valor numérico.
   * @default 'top'
   */
  valuePosition?: ProgressBarValuePosition;

  /**
   * Função customizada para formatar a exibição do texto de valor (ex: `(v, m, pct) => `${pct}%`` ou `"Etapa ${v} de ${m}"`).
   */
  valueFormatter?: (value: number, max: number, percentage: number) => React.ReactNode;

  /**
   * Variante cromática da barra de progresso:
   * - `brand`: Azul Navy Unooria (#7FA5E2) - Padrão oficial do Figma
   * - `primary`: Azul Primário (#0086FF)
   * - `success`: Verde Sucesso (#01B574)
   * - `warning`: Laranja Alerta (#F97607)
   * - `danger`: Vermelho Perigo (#E31A1A)
   * @default 'brand'
   */
  variant?: ProgressBarVariant;

  /**
   * Se true, altera automaticamente a variante para `success` quando `value >= max`.
   * @default false
   */
  autoStatus?: boolean;

  /**
   * Altura visual da barra:
   * - `xs`: 4px
   * - `sm`: 8px (Padrão oficial do Figma Node 18644:1049)
   * - `md`: 12px
   * - `lg`: 16px
   * @default 'sm'
   */
  size?: ProgressBarSize;

  /**
   * Se true, ativa o modo indeterminado com animação contínua (para tarefas com tempo desconhecido).
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Se true, aplica padrão visual com listras diagonais no preenchimento.
   * @default false
   */
  striped?: boolean;

  /**
   * Se true, anima continuamente o padrão de listras.
   * @default false
   */
  animated?: boolean;

  /**
   * Tema visual (`light` ou `dark`).
   * @default 'light'
   */
  theme?: UnooriaTheme;
}
