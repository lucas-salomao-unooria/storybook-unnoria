import React from 'react';

/**
 * Direção do registro de chamada.
 * - 'outgoing': seta em `--wa-color-accent-call-out` (#17B49F)
 * - 'incoming': seta em `--wa-color-danger-call-in` (#DF788B)
 */
export type WaCallDirection = 'outgoing' | 'incoming';

/**
 * Tipo de chamada e, por consequência, o ícone de ação à direita.
 * - 'voice': ícone de telefone em `--wa-color-accent-icon-call`
 * - 'video': ícone de câmera em `--wa-color-accent-icon-video`
 */
export type WaCallKind = 'voice' | 'video';

/**
 * Propriedades do componente CallListItem do WhatsApp Mobile.
 */
export interface WaCallListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Nome do contato.
   */
  name: string;

  /**
   * Momento da chamada, como "Yesterday, 10:55 am".
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
  direction?: WaCallDirection;

  /**
   * Tipo de chamada, que define o ícone de ação à direita.
   * @default 'voice'
   */
  kind?: WaCallKind;

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
