import React from 'react';

/**
 * Propriedades da folha inferior.
 */
export interface TikSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rótulo acessível da folha, quando não há cabeçalho com título.
   */
  ariaLabel?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do cabeçalho da folha.
 */
export interface TikSheetHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título centralizado, em Semibold 13.
   */
  title?: React.ReactNode;

  /**
   * Exibe o botão de fechar à direita, como na folha de comentários.
   * @default false
   */
  showClose?: boolean;

  /**
   * Rótulo acessível do botão de fechar.
   * @default 'Fechar'
   */
  closeLabel?: string;

  /**
   * Acionado ao clicar no botão de fechar.
   */
  onClose?: () => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do corpo rolável da folha.
 */
export interface TikSheetBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
