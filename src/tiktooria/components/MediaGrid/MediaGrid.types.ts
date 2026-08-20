import React from 'react';

/**
 * Uma miniatura da grade de mídia.
 */
export interface TikMediaItem {
  /** Endereço da imagem. As imagens são bitmaps informados por prop. */
  src?: string;
  /** Texto alternativo */
  alt?: string;
  /** Sobreposição livre, por exemplo um contador de visualizações */
  overlay?: React.ReactNode;
}

/**
 * Propriedades da grade de mídia do perfil.
 */
export interface TikMediaGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Miniaturas exibidas, em ordem de leitura.
   */
  items: TikMediaItem[];

  /**
   * Número de colunas. O arquivo publica três.
   * @default 3
   */
  columns?: number;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
