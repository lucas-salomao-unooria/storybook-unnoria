import React from 'react';

/**
 * Contexto visual da barra de status.
 * - 'app': fundo do canvas das telas de listagem e conversa
 * - 'call': verde escuro da tela de chamada (`--wa-color-call-statusbar`)
 * - 'transparent': sem preenchimento, para uso sobre mídia em tela cheia
 */
export type WaStatusBarVariant = 'app' | 'call' | 'transparent';

/**
 * Propriedades do componente StatusBar do WhatsApp Mobile.
 */
export interface WaStatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Relógio exibido à esquerda.
   * @default '08:34'
   */
  time?: string;

  /**
   * Rótulo da tecnologia de rede exibido antes das barras de sinal.
   * @default '4G'
   */
  network?: string;

  /**
   * Quantidade de barras de sinal preenchidas, de 0 a 4.
   * @default 3
   */
  signalBars?: number;

  /**
   * Percentual de bateria exibido em texto.
   * @default '7%'
   */
  batteryLabel?: string;

  /**
   * Proporção preenchida do glifo de bateria, de 0 a 1.
   * @default 0.54
   */
  batteryLevel?: number;

  /**
   * Exibe o alerta triangular do sistema.
   * @default true
   */
  showAlert?: boolean;

  /**
   * Exibe o indicador de modo silencioso.
   * @default true
   */
  showSilent?: boolean;

  /**
   * Exibe o indicador do sistema Android.
   * @default true
   */
  showAndroid?: boolean;

  /**
   * Contexto visual aplicado ao fundo.
   * @default 'app'
   */
  variant?: WaStatusBarVariant;

  /**
   * Altura da barra em pixels. Os frames do arquivo variam entre 21px e 27px.
   * @default 21
   */
  height?: number;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
