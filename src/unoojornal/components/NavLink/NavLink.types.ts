import React from 'react';
import type { UjnIconName } from '../Icon';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente NavLink da Unoojornal.
 *
 * Com `href` o item é um link (`<a>`); sem `href`, um botão (`<button
 * type="button">`). Os demais atributos nativos vão para esse elemento.
 */
export interface UjnNavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'onClick'> {
  /**
   * Endereço do destino. Sem ele, o item é um botão.
   */
  href?: string;

  /**
   * Página atual: sublinhado de 2px na cor de ação, `font-weight` de destaque,
   * glifo preenchido e `aria-current="page"`.
   * @default false
   */
  active?: boolean;

  /**
   * Glifo antes do rótulo (nome de `ujnIcons`). Preenchido quando `active`.
   */
  icon?: UjnIconName;

  /**
   * Rótulo do item.
   */
  children: React.ReactNode;

  /**
   * Chamado no clique (ou no Enter/Espaço, quando o item é botão).
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
