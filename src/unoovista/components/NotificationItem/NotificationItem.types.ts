import React from 'react';
import type { UnvTheme } from '../../tokens';
import type { UnvAvatarRing } from '../Avatar';

/**
 * Propriedades do componente NotificationItem do Unoovista.
 */
export interface UnvNotificationItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * URL do avatar do autor da atividade.
   */
  avatarSrc?: string;

  /**
   * Iniciais exibidas quando não há avatar.
   */
  initials?: string;

  /**
   * Anel aplicado ao avatar (o anel indica história ativa do autor).
   * @default 'none'
   */
  avatarRing?: UnvAvatarRing;

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
   * Notificação ainda não lida: um ponto sobre o avatar e o texto "Não lida"
   * para leitores de tela.
   * @default false
   */
  unread?: boolean;

  /**
   * Texto lido por leitores de tela quando `unread` está ligado.
   * @default 'Não lida'
   */
  unreadLabel?: string;

  /**
   * Callback de clique na linha.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner ancestral (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
