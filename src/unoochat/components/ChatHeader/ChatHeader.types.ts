import React from 'react';

/**
 * Propriedades do componente ChatHeader do Unoochat.
 */
export interface UncChatHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Nome do contato ou do grupo exibido no cabeçalho.
   */
  name: string;

  /**
   * Linha de presença exibida abaixo do nome, como "online".
   */
  presence?: string;

  /**
   * URL do avatar do contato.
   */
  avatarSrc?: string;

  /**
   * Iniciais usadas quando não há avatar.
   */
  initials?: string;

  /**
   * Callback da seta de voltar.
   */
  onBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback da chamada de vídeo.
   */
  onVideoCall?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback da chamada de voz.
   */
  onVoiceCall?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do menu de opções.
   */
  onMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback de toque no nome ou avatar, que abre o perfil do contato.
   */
  onOpenProfile?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
