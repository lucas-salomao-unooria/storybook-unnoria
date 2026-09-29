import React from 'react';

/**
 * Propriedades do componente Radio do Unoochat.
 */
export interface UncRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Rótulo exibido ao lado do controle.
   */
  label: React.ReactNode;

  /**
   * Indica se a opção está selecionada.
   */
  checked?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
