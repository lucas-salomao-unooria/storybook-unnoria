import React from 'react';

/**
 * Tons de fio disponíveis. `hairline` (`#D0D1D3`) separa seções de
 * configuração; `sheet` (`#DADBDB`) separa as duas faixas da folha de
 * compartilhamento. São dois valores distintos no arquivo, preservados.
 */
export type TikSeparatorTone = 'hairline' | 'sheet';

/**
 * Propriedades do fio separador.
 */
export interface TikSeparatorProps extends Omit<React.HTMLAttributes<HTMLHRElement>, 'children'> {
  /**
   * Tom do fio.
   * @default 'hairline'
   */
  tone?: TikSeparatorTone;

  /**
   * Aplica a calha lateral de 16px, como nos separadores de 382px do arquivo.
   * @default true
   */
  inset?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
