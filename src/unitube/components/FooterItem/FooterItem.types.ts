import React from 'react';

/**
 * Propriedades do item de rodapé da barra lateral.
 *
 * Reproduz o nó `Navigation/FooterItem` (`9:3231`): recuo `0/8/0/0` e rótulo em
 * Roboto Bold 13 sobre `--uni-color-text-secondary`.
 */
export interface UniFooterItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /**
   * Texto do item.
   */
  label: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
