import React from 'react';

/**
 * Propriedades da seção de playlist.
 *
 * Reproduz o nó `Media/Playlist` (`19:1562`): 1200×288, delimitado por um fio
 * acima e outro abaixo, com o cabeçalho de título e o botão "Play all" e uma
 * linha de cinco cartões compactos.
 */
export interface UniPlaylistProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Título da playlist.
   */
  playlistTitle: React.ReactNode;

  /**
   * Rótulo do botão de reprodução em sequência.
   * @default 'Play all'
   */
  playAllLabel?: React.ReactNode;

  /**
   * Exibe o botão "Play all".
   * @default true
   */
  showPlayAll?: boolean;

  /**
   * Chamado ao acionar o botão "Play all".
   */
  onPlayAll?: () => void;

  /**
   * Cartões da linha. Componha com `VideoCardSmall`.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
