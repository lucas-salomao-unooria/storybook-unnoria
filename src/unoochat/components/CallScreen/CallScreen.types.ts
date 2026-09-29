import React from 'react';

/**
 * Modalidade da chamada.
 * - 'voice': chamada de voz
 * - 'video': chamada de vídeo
 */
export type UncCallMode = 'voice' | 'video';

/**
 * Propriedades do componente CallScreen do Unoochat.
 */
export interface UncCallScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Nome do contato em chamada.
   */
  name: string;

  /**
   * Estado da chamada, como "Chamando" ou "02:14".
   * @default 'Chamando'
   */
  state?: string;

  /**
   * Exibe o aviso de criptografia acima do nome.
   * @default true
   */
  showEncryptionLabel?: boolean;

  /**
   * Texto do aviso de criptografia.
   * @default 'Criptografia de ponta a ponta'
   */
  encryptionLabel?: string;

  /**
   * URL do retrato exibido ao centro.
   */
  portraitSrc?: string;

  /**
   * Modalidade da chamada.
   * @default 'voice'
   */
  mode?: UncCallMode;

  /**
   * Indica se o alto-falante está ativo.
   * @default false
   */
  speakerOn?: boolean;

  /**
   * Indica se o microfone está silenciado.
   * @default false
   */
  muted?: boolean;

  /**
   * Callback do alto-falante.
   */
  onToggleSpeaker?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do vídeo.
   */
  onToggleVideo?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do microfone.
   */
  onToggleMute?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback de encerramento da chamada.
   */
  onEndCall?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
