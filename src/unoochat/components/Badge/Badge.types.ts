import React from 'react';

/**
 * Variantes do selo.
 * - 'tab': selo de 19px ao lado do rótulo da aba
 * - 'row': selo de 19px na linha de conversa da busca
 */
export type UncBadgeVariant = 'tab' | 'row';

/**
 * Propriedades do componente Badge do Unoochat.
 */
export interface UncBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Quantidade exibida dentro do selo.
   */
  count: number;

  /**
   * Valor máximo exibido antes de aplicar o sufixo `+`.
   * @default 99
   */
  max?: number;

  /**
   * Variante visual do selo.
   * @default 'tab'
   */
  variant?: UncBadgeVariant;

  /**
   * Diâmetro do selo em pixels.
   * @default 19
   */
  size?: number;

  /**
   * Rótulo acessível anunciado por leitores de tela.
   */
  label?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
