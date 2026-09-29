import React from 'react';

/**
 * Propriedades do componente TextButton do Unoochat.
 */
export interface UncTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Rótulo do botão, exibido em caixa alta.
   */
  children: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
