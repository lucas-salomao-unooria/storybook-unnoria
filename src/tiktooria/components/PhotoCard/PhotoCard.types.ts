import React from 'react';

/**
 * Propriedades do cartão de fotografia do seletor de upload.
 */
export interface TikPhotoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Endereço da fotografia.
   */
  src?: string;

  /**
   * Texto alternativo.
   */
  alt?: string;

  /**
   * Largura em pixels. O arquivo publica 248px no cartão frontal e 235px nos de
   * trás.
   * @default 248
   */
  width?: number;

  /**
   * Altura em pixels. O arquivo publica 440px no cartão frontal.
   * @default 440
   */
  height?: number;

  /**
   * Contador exibido sobre o cartão, como "3/22".
   */
  counter?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
