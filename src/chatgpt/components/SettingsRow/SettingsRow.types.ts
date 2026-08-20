import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `SettingsRow` do Design System ChatGPT.
 *
 * Reproduz o componente `SettingsRow` do Figma — a linha de rótulo e valor
 * usada nas telas de configuração.
 */
export interface GptSettingsRowProps
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
   * 400px do arquivo de design.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
