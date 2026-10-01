import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Apresentação do aparelho.
 * - 'bezel': o aparelho inteiro — corpo, aro, botões laterais e tela
 * - 'screen': só a tela, de cantos arredondados, sem o corpo
 */
export type UjnPhoneFrameDevice = 'bezel' | 'screen';

/**
 * Propriedades do componente PhoneFrame da Unoojornal.
 */
export interface UjnPhoneFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Apresentação do aparelho.
   * @default 'bezel'
   */
  device?: UjnPhoneFrameDevice;

  /**
   * Horário exibido na barra de status.
   * @default '9:41'
   */
  time?: string;

  /**
   * Carga da bateria, de 0 a 100. Escolhe o glifo e o rótulo acessível.
   * @default 82
   */
  battery?: number;

  /**
   * Exibe a barra de status (horário, sinal, conexão e bateria) e a ilha da
   * câmera. Quando ligada, a tela recebe a área segura superior.
   * @default true
   */
  statusBar?: boolean;

  /**
   * Exibe a barra de gesto na base. Quando ligada, a tela recebe a área segura
   * inferior.
   * @default true
   */
  homeIndicator?: boolean;

  /**
   * Escala de exibição, para caber em páginas de documentação. O aparelho
   * encolhe inteiro e ocupa o espaço já escalado.
   * @default 1
   */
  scale?: number;

  /**
   * Rótulo acessível do aparelho (vira `role="group"`).
   */
  ariaLabel?: string;

  /**
   * Força o tema visual da tela. Quando omitido, herda o tema do contêiner
   * ancestral por `data-ujn-theme`.
   */
  theme?: UjnTheme;

  /**
   * Conteúdo da tela. Sobreposições (folhas, diálogos e avisos)
   * se posicionam dentro dela, e não na janela.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
