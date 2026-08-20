import React from 'react';

/**
 * Propriedades do componente EncryptionNotice do WhatsApp Mobile.
 */
export interface WaEncryptionNoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Texto do aviso.
   * @default 'Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more.'
   */
  children?: React.ReactNode;

  /**
   * Callback de toque no aviso.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
