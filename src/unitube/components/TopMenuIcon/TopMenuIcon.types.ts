import React from 'react';
import type { UniIconName } from '../Icon';

/**
 * Propriedades do alvo de ícone do menu superior.
 *
 * Reproduz o nó `Navigation/TopMenuIcon` (`10:665`): 56×56 com recuo de 20px e
 * glifo de 16px, sobre `--uni-color-background-secondary`.
 */
export interface UniTopMenuIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Glifo exibido no centro do alvo.
   * @default 'leftBottom'
   */
  icon?: UniIconName;

  /**
   * Rótulo acessível do botão.
   * @default 'Avançar'
   */
  label?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
