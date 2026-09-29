import React from 'react';

/**
 * Propriedades do componente Toast do Unoochat.
 *
 * Extensão: o aviso rápido do Android na base da tela.
 */
export interface UncToastProps extends React.HTMLAttributes<HTMLDivElement> {
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
