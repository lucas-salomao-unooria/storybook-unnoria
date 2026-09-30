import React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Alturas do chip.
 * - 'sm': 32px (filtros sobre a grade e sugestões compactas)
 * - 'md': 40px (padrão, categorias da busca)
 *
 * Nos dois tamanhos a área de toque é estendida a 44px por uma camada
 * invisível, sem mudar o desenho.
 */
export type UglChipSize = 'sm' | 'md';

/**
 * Variantes do chip.
 * - 'filled': preenchimento suave (`--ugl-color-fill-field`)
 * - 'outline': contorno de 1px (`--ugl-color-border-default`) sobre transparente
 */
export type UglChipVariant = 'filled' | 'outline';

/**
 * Propriedades do componente Chip da Unoogaleria.
 */
export interface UglChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Rótulo do chip.
   */
  label: React.ReactNode;

  /**
   * Glifo antes do rótulo.
   */
  icon?: UglIconName;

  /**
   * Estado de alternância (filtro ligado). Quando definido, vira
   * `aria-pressed`; quando omitido, o chip é um botão comum (sugestão).
   */
  selected?: boolean;

  /**
   * Altura do chip.
   * @default 'md'
   */
  size?: UglChipSize;

  /**
   * Variante visual.
   * @default 'filled'
   */
  variant?: UglChipVariant;

  /**
   * Conteúdo depois do rótulo: contagem, seta de expandir.
   */
  trailing?: React.ReactNode;

  /**
   * Desabilita o chip.
   * @default false
   */
  disabled?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
