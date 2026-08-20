import React from 'react';

/**
 * Propriedades do campo de busca preenchido.
 */
export interface TikSearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Texto de reserva. O arquivo usa "Search".
   * @default 'Search'
   */
  placeholder?: string;

  /**
   * Rótulo acessível do campo.
   * @default 'Buscar'
   */
  ariaLabel?: string;

  /**
   * Classe CSS adicional aplicada ao contêiner.
   */
  className?: string;
}
