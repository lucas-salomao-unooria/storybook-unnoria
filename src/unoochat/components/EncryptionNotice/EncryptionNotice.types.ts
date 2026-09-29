import React from 'react';

/**
 * Propriedades do componente EncryptionNotice do Unoochat.
 */
export interface UncEncryptionNoticeProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  /**
   * Texto do aviso.
   * @default 'As mensagens e as chamadas são protegidas com criptografia de ponta a ponta. Ninguém de fora desta conversa, nem mesmo a Unooria, pode lê-las ou ouvi-las. Toque para saber mais.'
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
