import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Propriedades do componente PhoneFrame do Instanooria.
 */
export interface InstaPhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Horário exibido na status bar.
   * @default '9:41'
   */
  time?: string;

  /**
   * Exibe a status bar do iPhone X no topo do quadro.
   * @default true
   */
  withStatusBar?: boolean;

  /**
   * Exibe o home indicator na base do quadro.
   * @default true
   */
  withHomeIndicator?: boolean;

  /**
   * Aplica cantos arredondados e sombra ao redor do quadro, para exibição em
   * galerias de documentação.
   * @default true
   */
  framed?: boolean;

  /**
   * Cor de fundo da status bar. Por padrão acompanha a superfície da tela.
   */
  statusBarBackground?: string;

  /**
   * Altura útil do quadro em pixels.
   * @default 812
   */
  height?: number;

  /**
   * Rótulo acessível do quadro.
   */
  ariaLabel?: string;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Conteúdo da tela.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
