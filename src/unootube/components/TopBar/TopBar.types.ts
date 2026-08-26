import React from 'react';

/**
 * Propriedades da barra superior do Unootube.
 *
 * Reproduz o nó `Navigation/TopBar` (`7:111`): 1440×56 sobre
 * `--uni-color-background-secondary`, com o bloco de marca à esquerda (recuo de
 * 16px), a caixa de busca centrada e o perfil expandido à direita.
 */
export interface UniTopBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Endereço do retrato do usuário, repassado ao perfil expandido.
   */
  avatarSrc?: string;

  /**
   * Iniciais exibidas quando `avatarSrc` não é informado.
   */
  avatarInitials?: string;

  /**
   * Quantidade de notificações não lidas.
   */
  notificationCount?: number;

  /**
   * Chamado ao acionar o botão de alternância da barra lateral.
   */
  onToggleSidebar?: () => void;

  /**
   * Chamado quando a busca é enviada.
   */
  onSearch?: (value: string) => void;

  /**
   * Chamado ao acionar a busca por voz.
   */
  onVoiceSearch?: () => void;

  /**
   * Substitui a caixa de busca padrão. Use para injetar um campo controlado
   * pelo produto, com sugestões próprias.
   */
  search?: React.ReactNode;

  /**
   * Substitui o bloco direito padrão (criar, aplicativos, notificações e
   * perfil) — por exemplo, por um botão de entrar quando não há sessão.
   */
  actions?: React.ReactNode;

  /**
   * Endereço para o qual o logotipo aponta. Quando informado, o logotipo é
   * renderizado como âncora.
   */
  logoHref?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
