import React from 'react';

/**
 * Propriedades do componente EncryptionNotice do WhatsApp Mobile.
 */
export interface WaEncryptionNoticeProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  /**
   * Texto do aviso.
   * @default 'Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more.'
   */
  children?: React.ReactNode;

  /**
   * Callback de toque no aviso. Quando informado, o componente é renderizado
   * como `<button>` — acionável por Enter e Espaço.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
