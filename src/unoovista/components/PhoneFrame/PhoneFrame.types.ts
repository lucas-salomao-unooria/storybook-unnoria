import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Propriedades do componente PhoneFrame do Unoovista.
 */
export interface UnvPhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Horário exibido na barra de status.
   * @default '9:41'
   */
  time?: string;

  /**
   * Exibe a barra de status do cromo de sistema no topo do quadro.
   * @default true
   */
  withStatusBar?: boolean;

  /**
   * Exibe a barra de gesto na base do quadro.
   * @default true
   */
  withHomeIndicator?: boolean;

  /**
   * Aplica cantos arredondados e um fio de contorno ao redor do quadro, para
   * exibição em galerias de documentação.
   * @default true
   */
  framed?: boolean;

  /**
   * Cor de fundo da barra de status. Por padrão acompanha a superfície da tela.
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
   * Força o tema visual do quadro. Quando omitido, herda o tema do contêiner
   * ancestral por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Conteúdo da tela.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
