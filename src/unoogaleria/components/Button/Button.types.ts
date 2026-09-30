import React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Variantes do botão.
 * - 'primary': preenchido no roxo de ação — a ação principal da tela
 * - 'secondary': contorno sobre a superfície — ação alternativa
 * - 'tertiary': só texto no roxo de texto — ações de barra ("Selecionar")
 * - 'danger': preenchido no vermelho — excluir de vez
 * - 'danger-tertiary': só texto no vermelho — "Excluir" em barras e folhas
 * - 'immersive': sobre a superfície imersiva (visualizador e editor)
 */
export type UglButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'danger-tertiary'
  | 'immersive';

/**
 * Alturas do botão.
 * - 'sm': 32px (chips de ação e barras compactas)
 * - 'md': 44px (padrão, alvo mínimo de toque)
 * - 'lg': 52px (ações de página inteira e de diálogos)
 */
export type UglButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente Button da Unoogaleria.
 */
export interface UglButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual.
   * @default 'primary'
   */
  variant?: UglButtonVariant;

  /**
   * Altura do botão.
   * @default 'md'
   */
  size?: UglButtonSize;

  /**
   * Ocupa toda a largura do contêiner.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Glifo antes do rótulo.
   */
  iconStart?: UglIconName;

  /**
   * Glifo depois do rótulo.
   */
  iconEnd?: UglIconName;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;

  /**
   * Rótulo do botão.
   */
  children?: React.ReactNode;
}
