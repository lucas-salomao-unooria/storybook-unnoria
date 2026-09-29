import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do componente `SearchInput` do Design System UnooriaAI.
 *
 * O campo de busca de conversas usado no topo da barra lateral.
 */
export interface UaiSearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref' | 'size'> {
  /**
   * Glifo de busca renderizado antes do campo. Por padrão, o ícone `search`
   * da biblioteca de ícones do módulo, em 20px.
   */
  glyph?: React.ReactNode;

  /**
   * Ocupa toda a largura disponível. Quando `false`, mantém a largura de
   * 260px.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Classe CSS adicional aplicada ao contêiner do campo.
   */
  className?: string;
}
