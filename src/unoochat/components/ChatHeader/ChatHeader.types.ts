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
   * Conteúdo à direita do cabeçalho, como um chip de status
   * ("Publicações Oficiais Disponíveis: 3/3" num `MessageTag`).
   *
   * Presente, ele SUBSTITUI os botões de chamada de vídeo e de voz — um canal
   * que exibe um status não é uma conversa que se liga, e os dois não cabem
   * juntos em 375px. O botão "Mais opções" continua, mas só quando `onMenu`
   * for informado. Ausente, o cabeçalho é o de sempre, com as três ações.
   */
  trailing?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
