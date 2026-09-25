import React from 'react';

/**
 * Propriedades do componente SystemMessage do WhatsApp Mobile.
 *
 * Extensão: o aviso de sistema da conversa ("Você entrou usando o link de
 * convite deste grupo") não aparece no arquivo de origem.
 */
export interface WaSystemMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Texto do aviso. Pode quebrar em mais de uma linha.
   */
  children: React.ReactNode;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
