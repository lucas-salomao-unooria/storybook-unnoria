import React from 'react';
import type { TikSurface } from '../../tokens/colors';

/**
 * Propriedades da barra de status do iPhone X do Tik Tooria.
 */
export interface TikStatusBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Contexto de superfície. `chrome` pinta o relógio e os glifos em
   * `--tik-color-text-statusbar`; `immersive` os pinta em branco.
   * @default 'chrome'
   */
  surface?: TikSurface;

  /**
   * Horário exibido. O arquivo de design fixa `9:41` em todas as 15 telas.
   * @default '9:41'
   */
  time?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
