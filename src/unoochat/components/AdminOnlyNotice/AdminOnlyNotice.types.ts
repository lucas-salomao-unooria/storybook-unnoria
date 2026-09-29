import React from 'react';

/**
 * Propriedades do componente AdminOnlyNotice do Unoochat.
 *
 * Extensão: a barra que ocupa o lugar do compositor em grupo onde só os
 * administradores escrevem.
 */
export interface UncAdminOnlyNoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Texto da barra, como "Apenas administradores podem enviar mensagens".
   */
  children: React.ReactNode;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
