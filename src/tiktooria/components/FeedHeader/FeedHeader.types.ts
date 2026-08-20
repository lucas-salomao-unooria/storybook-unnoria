import React from 'react';

/**
 * Abas do cabeçalho do feed imersivo.
 */
export type TikFeedTab = 'following' | 'forYou';

/**
 * Propriedades do cabeçalho de abas do feed.
 */
export interface TikFeedHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
   * Aba ativa.
   * @default 'forYou'
   */
  active?: TikFeedTab;

  /**
   * Rótulo da aba de seguidos.
   * @default 'Following'
   */
  followingLabel?: string;

  /**
   * Rótulo da aba recomendada.
   * @default 'For You'
   */
  forYouLabel?: string;

  /**
   * Acionado ao selecionar uma aba.
   */
  onSelect?: (tab: TikFeedTab) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
