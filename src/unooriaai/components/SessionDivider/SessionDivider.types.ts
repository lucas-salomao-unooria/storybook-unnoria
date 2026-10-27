import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do componente `SessionDivider` do Design System UnooriaAI.
 *
 * O aviso de sistema que separa trechos de uma conversa: uma linha com o texto
 * no meio ("Sessão 2/3: Beatriz (23h45)"). Não é fala de ninguém — é a
 * plataforma marcando onde uma sessão termina e a outra começa.
 */
export interface UaiSessionDividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * O texto do separador: qual sessão, de quem, quando. Fica no fluxo de
   * leitura, e o leitor de tela o lê entre as falas, como texto.
   */
  label: React.ReactNode;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
