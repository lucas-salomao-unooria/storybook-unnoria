import React from 'react';

/**
 * Propriedades da barra superior móvel.
 */
export interface UniMobileTopBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Marca exibida à esquerda. Componha com `Logo`; quando omitida, o `Logo`
   * padrão é montado na largura literal do arquivo (90×20).
   */
  logo?: React.ReactNode;

  /** Chamado ao acionar a transmissão para TV. */
  onCast?: () => void;
  /** Chamado ao abrir as notificações. */
  onNotifications?: () => void;
  /** Chamado ao abrir a busca. */
  onSearch?: () => void;
  /** Chamado ao acionar o retrato do perfil. */
  onProfile?: () => void;

  /** Retrato do perfil, à direita da barra. */
  avatarSrc?: string;
  /** Iniciais exibidas quando não há retrato. */
  avatarInitials?: string;

  /**
   * Substitui o conjunto inteiro de ações à direita. Use quando o produto tiver
   * outra combinação — os quatro alvos do arquivo são transmitir, notificar,
   * buscar e perfil.
   */
  actions?: React.ReactNode;

  /**
   * Faixa exibida abaixo da barra. No arquivo é a régua de pílulas de filtro
   * (`1:219`), que aparece recolhida a zero de altura; componha com
   * `TopMenuBar` quando o produto a exibir.
   */
  filters?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}
