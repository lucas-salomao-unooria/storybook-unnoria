import React from 'react';

/**
 * Propriedades da métrica do cabeçalho do perfil.
 */
export interface TikStatTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Valor da métrica, em Bold 17.
   */
  value: React.ReactNode;

  /**
   * Rótulo da métrica, em Regular 13 e `--tik-color-text-secondary`.
   */
  label: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
