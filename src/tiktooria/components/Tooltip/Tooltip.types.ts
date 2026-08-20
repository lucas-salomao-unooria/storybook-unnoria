import React from 'react';

/**
 * Propriedades da chamada com rabicho do perfil.
 */
export interface TikTooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Primeira linha, em Bold 16 com tracking de 0,5px.
   */
  title: React.ReactNode;

  /**
   * Segunda linha, em Regular 15 com tracking de 0,5px.
   */
  description?: React.ReactNode;

  /**
   * Ilustração exibida no topo do balão. O arquivo desenha um grupo de dez nós
   * decorativos; o slot aceita qualquer `ReactNode` para que um produto possa
   * injetar a própria arte.
   */
  illustration?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
