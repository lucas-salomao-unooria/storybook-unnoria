import React from 'react';

/**
 * Propriedades da moldura do leitor de QR.
 */
export interface TikScannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Lado da moldura em pixels. O arquivo publica 250px.
   * @default 250
   */
  size?: number;

  /**
   * Dica exibida sob a moldura, em Regular 13.
   */
  hint?: React.ReactNode;

  /**
   * Aplica o véu ao redor da moldura, reproduzindo a operação booleana do
   * arquivo (retângulo de tela cheia menos o quadrado de 250px, node 4:746).
   * @default true
   */
  scrim?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
