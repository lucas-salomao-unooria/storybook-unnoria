import React from 'react';

/**
 * Propriedades do componente TextButton do WhatsApp Mobile.
 */
export interface WaTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Rótulo do botão, exibido em caixa alta no arquivo de origem.
   */
  children: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
