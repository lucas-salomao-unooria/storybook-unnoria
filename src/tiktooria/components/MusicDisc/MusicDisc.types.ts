import React from 'react';

/**
 * Propriedades do disco giratório de música.
 */
export interface TikMusicDiscProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Diâmetro do disco em pixels. O arquivo publica 49px.
   * @default 49
   */
  size?: number;

  /**
   * Exibe as notas flutuantes ao lado do disco (node 4:1093).
   * @default true
   */
  showTones?: boolean;

  /**
   * Anima a rotação do disco. O arquivo é estático; a rotação é uma extensão
   * documentada no registro de desvios.
   * @default false
   */
  spinning?: boolean;

  /**
   * Rótulo acessível do disco.
   */
  title?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
