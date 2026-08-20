import React from 'react';

/**
 * Propriedades da coluna secundária da tela de vídeo.
 *
 * Reproduz o nó `Layout/SecondaryColumn` (`20:2996`): 426×968 sobre
 * `--uni-color-background-primary`, com recuo `24/24/0/0`, contendo a barra de
 * filtros e a pilha de sugestões.
 */
export interface UniSecondaryColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo exibido acima da pilha — no arquivo, a barra de filtros.
   */
  header?: React.ReactNode;

  /**
   * Conteúdo da coluna. Componha com `VideoCardSidebar`.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
