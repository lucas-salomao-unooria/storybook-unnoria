import React from 'react';

/**
 * Propriedades do componente SectionLabel do WhatsApp Mobile.
 */
export interface WaSectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Texto do rótulo, como "Recent updates" ou "Viewed updates".
   */
  children: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
