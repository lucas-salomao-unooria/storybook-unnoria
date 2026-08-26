import React from 'react';

/**
 * Propriedades do perfil expandido do Unootube.
 *
 * Reproduz o nó `Navigation/ProfileExpanded` (`7:93`): 204×40, formado por três
 * alvos de ícone de 40px — criar, aplicativos e notificações — seguidos do
 * perfil compacto de 60px, com 8px de intervalo entre eles.
 */
export interface UniProfileExpandedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Endereço do retrato do usuário.
   */
  src?: string;

  /**
   * Texto alternativo do retrato.
   * @default 'Perfil'
   */
  alt?: string;

  /**
   * Iniciais exibidas quando `src` não é informado.
   */
  initials?: string;

  /**
   * Quantidade de notificações não lidas. Quando maior que zero, o alvo de
   * notificações exibe um selo. O arquivo não publica o selo — é extensão
   * registrada como desvio na estória.
   */
  notificationCount?: number;

  /** Chamado ao acionar o alvo de criar vídeo. */
  onCreate?: () => void;

  /** Chamado ao acionar a grade de aplicativos. */
  onApps?: () => void;

  /** Chamado ao acionar as notificações. */
  onNotifications?: () => void;

  /** Chamado ao acionar o avatar. */
  onProfile?: () => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
