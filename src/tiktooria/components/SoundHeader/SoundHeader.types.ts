import React from 'react';

/**
 * Propriedades do cabeçalho da página de som.
 */
export interface TikSoundHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Nome da trilha, em Semibold 20.
   */
  title: React.ReactNode;

  /**
   * Autor da trilha, em Regular 13.
   */
  artist?: React.ReactNode;

  /**
   * Contagem de vídeos que usam a trilha, em Regular 13.
   */
  videoCount?: React.ReactNode;

  /**
   * Endereço da capa do álbum, exibida em 120px.
   */
  coverSrc?: string;

  /**
   * Texto alternativo da capa.
   */
  coverAlt?: string;

  /**
   * Ação exibida sob os metadados — no arquivo, o chip "Add to Favorites".
   */
  action?: React.ReactNode;

  /**
   * Acionado ao clicar na seta de retorno.
   */
  onBack?: () => void;

  /**
   * Acionado ao clicar na ação de compartilhar.
   */
  onShare?: () => void;

  /**
   * Acionado ao clicar na capa para reproduzir.
   */
  onPlay?: () => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
