import React from 'react';

/**
 * Variantes do selo, correspondentes às duas ocorrências no arquivo Figma.
 * - 'tab': selo de 19px ao lado do rótulo CHATS (Ellipse 1, node 1:2143)
 * - 'row': selo de 19px na linha de conversa da busca (node 1:1916)
 */
export type WaBadgeVariant = 'tab' | 'row';

/**
 * Propriedades do componente Badge do WhatsApp Mobile.
 */
export interface WaBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
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
  variant?: WaBadgeVariant;

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
