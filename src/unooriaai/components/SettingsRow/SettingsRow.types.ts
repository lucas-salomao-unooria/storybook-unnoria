import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do componente `SettingsRow` do Design System UnooriaAI.
 *
 * A linha de rótulo e valor usada nas telas de configuração.
 */
export interface UaiSettingsRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Rótulo da configuração.
   */
  label: React.ReactNode;

  /**
   * Valor exibido à direita. Aceita texto ou controles (`Toggle`, `Button`).
   */
  value?: React.ReactNode;

  /**
   * Ocupa toda a largura disponível. Quando `false`, mantém a largura de
   * 400px.
   * @default false
   */
  block?: boolean;

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
