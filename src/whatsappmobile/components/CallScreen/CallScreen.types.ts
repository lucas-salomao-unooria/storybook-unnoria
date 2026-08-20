import React from 'react';

/**
 * Modalidade da chamada.
 * - 'voice': chamada de voz (frame "Voice call", node 1:4595)
 * - 'video': chamada de vídeo (frame "Video Call", node 1:4550)
 */
export type WaCallMode = 'voice' | 'video';

/**
 * Propriedades do componente CallScreen do WhatsApp Mobile.
 */
export interface WaCallScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Nome do contato em chamada.
   */
  name: string;

  /**
   * Estado da chamada, como "Calling" ou "02:14".
   * @default 'Calling'
   */
  state?: string;

  /**
   * Exibe o aviso "End-to-end encrypted" acima do nome.
   * @default true
   */
  showEncryptionLabel?: boolean;

  /**
   * Texto do aviso de criptografia.
   * @default 'End-to-end encrypted'
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
  mode?: WaCallMode;

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
