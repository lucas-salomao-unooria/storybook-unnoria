import React from 'react';

/**
 * Variante visual do botão.
 * - 'filled': preenchido em `--unc-color-accent`, rótulo em
 *   `--unc-color-text-on-accent` — a ação principal da tela
 * - 'outline': contorno e rótulo em `--unc-color-accent` — a ação
 *   secundária ao lado da principal
 */
export type UncButtonVariant = 'filled' | 'outline';

/**
 * Altura do botão.
 * - 'md': 44px, o alvo mínimo de toque
 * - 'lg': 56px, para a ação que decide a tela
 */
export type UncButtonSize = 'md' | 'lg';

/**
 * Propriedades do componente Button do Unoochat.
 *
 * Extensão: botão preenchido. A forma é a cápsula do chip de filtro
 * (`--unc-radius-pill`) e as cores são as da ação de texto do diálogo.
 */
export interface UncButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual.
   * @default 'filled'
   */
  variant?: UncButtonVariant;
  /**
   * Altura do botão.
   * @default 'md'
   */
  size?: UncButtonSize;
  /**
   * Ocupa toda a largura do contêiner.
   * @default false
   */
  block?: boolean;
  /**
   * Rótulo do botão.
   */
  children: React.ReactNode;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
