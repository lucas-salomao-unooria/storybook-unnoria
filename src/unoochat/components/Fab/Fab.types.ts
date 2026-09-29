import React from 'react';

/**
 * Variantes de botão de ação flutuante.
 * - 'chat': 52px, `--unc-color-accent`, glifo de envelope
 * - 'camera': 54px, `--unc-color-accent`, glifo de câmera
 * - 'call': 54px, `--unc-color-accent`, glifo de telefone com "+"
 * - 'mic': 43px, `--unc-color-accent`, glifo de microfone
 * - 'edit': 41px, `--unc-color-surface-elevated`, glifo de lápis
 * - 'endCall': 58px, `--unc-color-danger-endcall`, telefone girado
 */
export type UncFabVariant = 'chat' | 'camera' | 'call' | 'mic' | 'edit' | 'endCall';

/**
 * Propriedades do componente Fab do Unoochat.
 */
export interface UncFabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual do botão.
   * @default 'chat'
   */
  variant?: UncFabVariant;

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
