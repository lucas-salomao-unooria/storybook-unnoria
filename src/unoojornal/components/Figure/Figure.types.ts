import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente Figure da Unoojornal.
 */
export interface UjnFigureProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Endereço da imagem (informado por prop; o pacote não embute bitmaps).
   */
  src: string;

  /**
   * Descrição da imagem para leitores de tela. Obrigatória: imagem sem
   * descrição só serve a quem enxerga.
   */
  alt: string;

  /**
   * Legenda visível, abaixo da imagem.
   */
  caption?: string;

  /**
   * Crédito da fotografia ("Foto: Sofia Almeida").
   */
  credit?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
