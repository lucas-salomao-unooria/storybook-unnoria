import React from 'react';

/**
 * Estado da atualização de status.
 * - 'own': "Meu status" — título em `--unc-color-text-primary`, sem anel
 * - 'recent': atualização não vista — título em `--unc-font-title-sm-*` na cor
 *   `--unc-color-text-primary`
 * - 'viewed': atualização já vista — título no mesmo degrau, na cor
 *   `--unc-color-text-primary`
 */
export type UncStatusListItemState = 'own' | 'recent' | 'viewed';

/**
 * Propriedades do componente StatusListItem do Unoochat.
 */
export interface UncStatusListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Nome do autor da atualização.
   */
  name: string;

  /**
   * Momento da atualização, como "há 30 minutos".
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
  state?: UncStatusListItemState;

  /**
   * Exibe o menu de opções à direita, presente apenas na linha "Meu status".
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
