import React from 'react';

/**
 * Propriedades do perfil compacto do Unootube.
 *
 * Reproduz o nó `Navigation/ProfileCompact` (`7:87`): um alvo de 60×40 com
 * recuo 4/14 e avatar de 32px.
 */
export interface UniProfileCompactProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Endereço do retrato do usuário. Os bitmaps não integram o pacote.
   */
  src?: string;

  /**
   * Texto alternativo do retrato.
   * @default 'Perfil'
   */
  alt?: string;

  /**
   * Iniciais exibidas quando `src` não é informado.
   */
  initials?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
