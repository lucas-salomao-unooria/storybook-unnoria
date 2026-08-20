import React from 'react';

/**
 * Propriedades do bloco de metadados do vídeo.
 */
export interface TikVideoMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Identificador do autor, como `@craig_love`. Renderizado em Semibold 17.
   */
  handle: React.ReactNode;

  /**
   * Legenda do vídeo, em Regular 15 com altura de linha de 19,5px — o único
   * degrau tipográfico do arquivo com altura de linha declarada.
   */
  caption?: React.ReactNode;

  /**
   * Etiquetas exibidas após a legenda, em Semibold 15. No arquivo aparecem como
   * hashtags dentro do mesmo parágrafo.
   */
  tags?: React.ReactNode;

  /**
   * Nome da trilha sonora, exibido no letreiro com esmaecimento nas pontas.
   */
  music?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
