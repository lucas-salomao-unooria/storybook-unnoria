import React from 'react';
import type { TikSurface } from '../../tokens/colors';

/**
 * Propriedades da moldura de documentação do Tik Tooria.
 */
export interface TikPhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Contexto de superfície do conteúdo. Define o fundo do palco e o atributo
   * `data-tik-surface` herdado pelos descendentes.
   * @default 'chrome'
   */
  surface?: TikSurface;

  /**
   * Rótulo exibido acima da moldura, usado nas estórias de telas compostas.
   */
  label?: string;

  /**
   * Escala aplicada à moldura, para exibir várias telas lado a lado.
   * @default 1
   */
  scale?: number;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
