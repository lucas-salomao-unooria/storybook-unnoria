import React from 'react';
import type { TikSurface } from '../../tokens/colors';

/**
 * Propriedades do indicador de home do iPhone X.
 */
export interface TikHomeIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Contexto de superfície. O arquivo usa `#060606` sobre cromo claro e
   * `#E9E9E9` sobre superfície imersiva — dois tokens distintos, não uma
   * inversão calculada.
   * @default 'chrome'
   */
  surface?: TikSurface;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
