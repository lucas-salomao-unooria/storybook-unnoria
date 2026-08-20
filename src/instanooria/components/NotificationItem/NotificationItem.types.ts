import React from 'react';
import type { InstaTheme } from '../../tokens';
import type { InstaAvatarRing } from '../Avatar';

/**
 * Propriedades do componente NotificationItem do Instanooria.
 */
export interface InstaNotificationItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * URL do avatar do autor da atividade.
   */
  avatarSrc?: string;

  /**
   * Iniciais exibidas quando não há avatar.
   */
  initials?: string;

  /**
   * Anel aplicado ao avatar (o gradiente indica story ativo do autor).
   * @default 'none'
   */
  avatarRing?: InstaAvatarRing;

  /**
   * Nome de usuário exibido em negrito no início da frase.
   */
  username?: string;

  /**
   * Descrição da atividade ("curtiu sua foto", "começou a seguir você").
   */
  action?: React.ReactNode;

  /**
   * Tempo decorrido desde a atividade ("3h", "2d").
   */
  timestamp?: string;

  /**
   * URL da miniatura da publicação relacionada, exibida à direita.
   */
  thumbnailSrc?: string;

  /**
   * Texto alternativo da miniatura.
   */
  thumbnailAlt?: string;

  /**
   * Ação alinhada à direita (ex.: botão "Seguir" ou "Mensagem").
   * Tem precedência sobre `thumbnailSrc`.
   */
  trailing?: React.ReactNode;

  /**
   * Conteúdo adicional renderizado abaixo do texto (ex.: ação "Responder").
   */
  footer?: React.ReactNode;

  /**
   * Callback de clique na linha.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
