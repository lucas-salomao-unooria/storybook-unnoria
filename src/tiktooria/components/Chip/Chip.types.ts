import React from 'react';
import type { TikIconName } from '../Icon';

/**
 * Propriedades do chip contornado.
 */
export interface TikChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Glifo exibido antes do rótulo.
   */
  icon?: TikIconName;

  /**
   * Aplica a largura fixa de 152px publicada pelo arquivo.
   * @default false
   */
  fixedWidth?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
