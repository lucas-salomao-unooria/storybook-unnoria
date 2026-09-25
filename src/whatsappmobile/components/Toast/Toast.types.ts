import React from 'react';

/**
 * Propriedades do componente Toast do WhatsApp Mobile.
 *
 * Extensão: o aviso rápido do Android na base da tela. O arquivo de origem não
 * o publica.
 */
export interface WaToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Exibe o aviso. A região viva continua montada quando fechada, para que o
   * leitor de tela anuncie o texto no momento em que ele aparece.
   * @default true
   */
  open?: boolean;
  /**
   * Texto do aviso.
   */
  children?: React.ReactNode;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
