import React from 'react';

/**
 * Propriedades do botão de gravação da câmera.
 */
export interface TikRecordButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Diâmetro em pixels. O arquivo publica 80px.
   * @default 80
   */
  size?: number;

  /**
   * Rótulo acessível.
   * @default 'Gravar'
   */
  label?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
