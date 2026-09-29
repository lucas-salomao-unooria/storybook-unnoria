import React from 'react';

/**
 * Propriedades do componente SystemMessage do Unoochat.
 *
 * Extensão: o aviso de sistema da conversa ("Você entrou usando o link de
 * convite deste grupo") é uma extensão.
 */
export interface UncSystemMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Texto do aviso. Pode quebrar em mais de uma linha.
   */
  children: React.ReactNode;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
