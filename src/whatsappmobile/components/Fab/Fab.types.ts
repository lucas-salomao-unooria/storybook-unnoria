import React from 'react';

/**
 * Variantes de botão de ação flutuante presentes no arquivo Figma.
 * - 'chat': 52px, `--wa-color-accent-fab-chat`, glifo de envelope (node 1:2128)
 * - 'camera': 54px, `--wa-color-accent-fab`, glifo de câmera (node 1:165)
 * - 'call': 54px, `--wa-color-accent-fab`, glifo de telefone com "+" (node 1:696)
 * - 'mic': 43px, `--wa-color-accent-fab-mic`, glifo de microfone (node 1:3031)
 * - 'edit': 41px, `--wa-color-surface-elevated`, glifo de lápis (node 1:162)
 * - 'endCall': 58px, `--wa-color-danger-endcall`, telefone girado (node 1:4631)
 */
export type WaFabVariant = 'chat' | 'camera' | 'call' | 'mic' | 'edit' | 'endCall';

/**
 * Propriedades do componente Fab do WhatsApp Mobile.
 */
export interface WaFabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual do botão.
   * @default 'chat'
   */
  variant?: WaFabVariant;

  /**
   * Diâmetro em pixels. Quando omitido, usa a medida oficial da variante.
   */
  size?: number;

  /**
   * Rótulo acessível obrigatório, já que o botão exibe apenas um glifo.
   */
  label: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
