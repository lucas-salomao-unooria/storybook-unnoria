import React from 'react';

/**
 * Propriedades do componente DateChip do WhatsApp Mobile.
 */
export interface WaDateChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rótulo exibido, como "TODAY" ou "YESTERDAY".
   */
  children: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
