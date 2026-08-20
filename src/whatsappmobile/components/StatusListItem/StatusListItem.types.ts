import React from 'react';

/**
 * Estado da atualização de status.
 * - 'own': "My status" — título em `--wa-color-text-status-own`, sem anel
 * - 'recent': atualização não vista — título de 21px em `--wa-color-text-primary`
 * - 'viewed': atualização já vista — título de 18,54px em
 *   `--wa-color-text-status-viewed`
 */
export type WaStatusListItemState = 'own' | 'recent' | 'viewed';

/**
 * Propriedades do componente StatusListItem do WhatsApp Mobile.
 */
export interface WaStatusListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Nome do autor da atualização.
   */
  name: string;

  /**
   * Momento da atualização, como "30 minutes ago".
   */
  timestamp: string;

  /**
   * URL do avatar do autor.
   */
  avatarSrc?: string;

  /**
   * Iniciais usadas quando não há avatar.
   */
  initials?: string;

  /**
   * Estado da atualização.
   * @default 'recent'
   */
  state?: WaStatusListItemState;

  /**
   * Exibe o menu de opções à direita, presente apenas na linha "My status".
   * @default false
   */
  showMenu?: boolean;

  /**
   * Callback do menu de opções.
   */
  onMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Desenha o divisor inferior.
   * @default true
   */
  divider?: boolean;

  /**
   * Callback de abertura da atualização.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
