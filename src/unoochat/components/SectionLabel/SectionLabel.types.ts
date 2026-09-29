import React from 'react';

/**
 * Propriedades do componente SectionLabel do Unoochat.
 */
export interface UncSectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Texto do rótulo, como "Atualizações recentes" ou "Atualizações vistas".
   */
  children: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
