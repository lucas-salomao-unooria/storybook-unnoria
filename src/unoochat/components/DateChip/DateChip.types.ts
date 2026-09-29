import React from 'react';

/**
 * Propriedades do componente DateChip do Unoochat.
 */
export interface UncDateChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rótulo exibido, como "HOJE" ou "ONTEM".
   */
  children: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
