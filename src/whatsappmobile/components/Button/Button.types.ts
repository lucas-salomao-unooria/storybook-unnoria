import React from 'react';

/**
 * Variante visual do botão.
 * - 'filled': preenchido em `--wa-color-accent-action`, rótulo em
 *   `--wa-color-text-on-accent` — a ação principal da tela
 * - 'outline': contorno e rótulo em `--wa-color-accent-action` — a ação
 *   secundária ao lado da principal
 */
export type WaButtonVariant = 'filled' | 'outline';

/**
 * Altura do botão.
 * - 'md': 44px, o alvo mínimo de toque
 * - 'lg': 56px, para a ação que decide a tela
 */
export type WaButtonSize = 'md' | 'lg';

/**
 * Propriedades do componente Button do WhatsApp Mobile.
 *
 * Extensão: o arquivo de origem não publica botão preenchido. A forma deriva
 * da cápsula do chip de filtro (`--wa-radius-pill`) e as cores, da ação de
 * texto do diálogo.
 */
export interface WaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual.
   * @default 'filled'
   */
  variant?: WaButtonVariant;
  /**
   * Altura do botão.
   * @default 'md'
   */
  size?: WaButtonSize;
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
