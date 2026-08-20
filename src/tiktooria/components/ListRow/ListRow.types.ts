import React from 'react';

/**
 * Propriedades da linha social de 76px da tela "Find friends".
 */
export interface TikListRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Rótulo da linha, em Regular 15.
   */
  label: React.ReactNode;

  /**
   * Elemento à esquerda — no arquivo, sempre um disco de 56px com glifo ou
   * logotipo. Aceita `Avatar` ou `SocialLogo`.
   */
  leading?: React.ReactNode;

  /**
   * Exibe a divisa de avanço à direita.
   * @default true
   */
  showChevron?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
