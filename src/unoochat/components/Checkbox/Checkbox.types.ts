import React from 'react';

/**
 * Propriedades do componente Checkbox do Unoochat.
 */
export interface UncCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Rótulo exibido ao lado do controle.
   */
  label: React.ReactNode;

  /**
   * Indica se a caixa está marcada.
   */
  checked?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
