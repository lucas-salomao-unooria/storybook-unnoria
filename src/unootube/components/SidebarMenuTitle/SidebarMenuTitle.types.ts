import React from 'react';

/**
 * Propriedades do rótulo de seção da barra lateral.
 *
 * Reproduz o nó `Navigation/SidebarMenuTitle` (`9:1933`): 224×32 com recuo
 * `8/24` e rótulo em Label/Large sobre `--uni-color-text-secondary`.
 */
export interface UniSidebarMenuTitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'title'> {
  /**
   * Texto do rótulo. O arquivo o escreve em caixa alta ("SECTION TITLE",
   * "SUBSCRIPTIONS", "MORE FROM YOUTUBE"); a caixa é aplicada por CSS, de modo
   * que o texto informado permaneça legível para leitores de tela.
   */
  title: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
