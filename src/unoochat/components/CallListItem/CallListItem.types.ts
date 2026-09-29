import React from 'react';

/**
 * Direção do registro de chamada.
 * - 'outgoing': seta em `--unc-color-accent-call-out`
 * - 'incoming': seta em `--unc-color-danger-call-in`
 */
export type UncCallDirection = 'outgoing' | 'incoming';

/**
 * Tipo de chamada e, por consequência, o ícone de ação à direita.
 * - 'voice': ícone de telefone em `--unc-color-accent`
 * - 'video': ícone de câmera em `--unc-color-accent`
 */
export type UncCallKind = 'voice' | 'video';

/**
 * Propriedades do componente CallListItem do Unoochat.
 */
export interface UncCallListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Nome do contato.
   */
  name: string;

  /**
   * Momento da chamada, como "Ontem, 10:55".
   */
  timestamp: string;

  /**
   * Quantidade de tentativas agrupadas, exibida entre parênteses.
   */
  count?: number;

  /**
   * Direção do registro.
   * @default 'outgoing'
   */
  direction?: UncCallDirection;

  /**
   * Tipo de chamada, que define o ícone de ação à direita.
   * @default 'voice'
   */
  kind?: UncCallKind;

  /**
   * URL do avatar do contato.
   */
  avatarSrc?: string;

  /**
   * Iniciais usadas quando não há avatar.
   */
  initials?: string;

  /**
   * Callback do botão de rediscagem.
   */
  onCall?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Desenha o divisor inferior.
   * @default true
   */
  divider?: boolean;

  /**
   * Callback de abertura do registro.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
