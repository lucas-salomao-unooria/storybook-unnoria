import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente FilterPill da Unoojornal.
 *
 * Os atributos nativos de `<button>` (`name`, `value`, `tabIndex`, `aria-*`…)
 * vão para o botão.
 */
export interface UjnFilterPillProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  /**
   * Pílula selecionada: preenchimento de ação, rótulo sobre a ação, marca de
   * seleção e `aria-pressed="true"`.
   * @default false
   */
  selected?: boolean;

  /**
   * Quantidade de matérias do filtro, exibida depois do rótulo.
   */
  count?: number;

  /**
   * Pílula desabilitada: esmaecida, fora do Tab e sem resposta ao toque.
   * @default false
   */
  disabled?: boolean;

  /**
   * Rótulo do filtro.
   */
  children: React.ReactNode;

  /**
   * Chamado no clique (ou Enter/Espaço).
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
