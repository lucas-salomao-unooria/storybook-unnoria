import React from 'react';
import type { TikIconName } from '../Icon';

/**
 * Propriedades da linha de 52px das telas de configuração e edição de perfil.
 */
export interface TikSettingsRowProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /**
   * Rótulo da linha, em Regular 15.
   */
  label: React.ReactNode;

  /**
   * Glifo à esquerda. Quando informado, o rótulo recua 48px, como nas telas de
   * configuração; quando omitido, recua apenas a calha de 16px, como nas linhas
   * de edição de perfil.
   */
  icon?: TikIconName;

  /**
   * Valor alinhado à direita, em Regular 15 e `--tik-color-text-secondary`.
   */
  value?: React.ReactNode;

  /**
   * Exibe a divisa de avanço à direita.
   * @default true
   */
  showChevron?: boolean;

  /**
   * Glifo de ação à direita, no lugar da divisa (como o de copiar da linha
   * `tiktok.com@jacob_w`).
   */
  trailingIcon?: TikIconName;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
