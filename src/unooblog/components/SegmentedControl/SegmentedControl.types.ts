import React from 'react';
import type { UblIconName } from '../Icon';
import type { UblTheme } from '../../tokens';

/**
 * Um segmento do controle.
 */
export interface UblSegmentedItem {
  /** Identificador devolvido por `onValueChange`. */
  id: string;
  /** Rótulo visível — é também o nome acessível do segmento. */
  label: string;
  /** Glifo do registro antes do rótulo. */
  icon?: UblIconName;
}

/**
 * Alturas do controle.
 * - 'sm': 32px (barras e cartões compactos)
 * - 'md': 40px (padrão)
 */
export type UblSegmentedControlSize = 'sm' | 'md';

/**
 * Propriedades do componente SegmentedControl da Unooblog.
 */
export interface UblSegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /**
   * Segmentos, na ordem de exibição. Todos têm a mesma largura.
   */
  items: UblSegmentedItem[];

  /**
   * Segmento escolhido (modo controlado).
   */
  value?: string;

  /**
   * Segmento escolhido inicialmente (modo não controlado). Sem ele, vale o primeiro.
   */
  defaultValue?: string;

  /**
   * Chamado com o `id` do segmento escolhido — por clique, toque ou teclado.
   */
  onValueChange?: (id: string) => void;

  /**
   * Altura do controle.
   * @default 'md'
   */
  size?: UblSegmentedControlSize;

  /**
   * Nome acessível do grupo (`aria-label` do `radiogroup`). Obrigatório: o
   * leitor de tela precisa saber o que o grupo escolhe ("Ordenar comentários").
   */
  ariaLabel: string;

  /**
   * Ocupa toda a largura do contêiner.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
