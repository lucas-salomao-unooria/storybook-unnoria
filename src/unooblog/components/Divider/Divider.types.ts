import React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Orientação do divisor.
 * - 'horizontal': fio de 1px na largura do contêiner
 * - 'vertical': fio de 1px na altura do contêiner (separa controles numa barra)
 */
export type UblDividerOrientation = 'horizontal' | 'vertical';

/**
 * Propriedades do componente Divider da Unooblog.
 */
export interface UblDividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Orientação do fio.
   * @default 'horizontal'
   */
  orientation?: UblDividerOrientation;

  /**
   * Divisor puramente visual: sai da árvore de acessibilidade. Com `label`, o
   * divisor passa a ser anunciado (`role="separator"` com o texto como nome),
   * porque o texto é conteúdo e não pode sumir para o leitor de tela.
   * @default true
   */
  decorative?: boolean;

  /**
   * Texto no meio do fio horizontal ("ou", "Comentários"). Ignorado no divisor
   * vertical.
   */
  label?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
