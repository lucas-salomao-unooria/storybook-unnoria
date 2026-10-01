import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Propriedades do componente Figure da Unooblog.
 */
export interface UblFigureProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Endereço da imagem (informado por prop; o pacote não embute bitmaps).
   */
  src: string;

  /**
   * Descrição da imagem para leitores de tela. Obrigatória: imagem sem
   * descrição só serve a quem enxerga. Imagem puramente decorativa usa `""`.
   */
  alt: string;

  /**
   * Legenda visível, abaixo da imagem.
   */
  caption?: string;

  /**
   * Crédito da imagem ("Ilustração: Marina Vaz").
   */
  credit?: string;

  /**
   * Extrapola a coluna de leitura até `--ubl-page-width`, quando o espaço ao
   * redor permite. Em contêineres estreitos não faz nada: a figura continua na
   * largura da coluna.
   * @default false
   */
  wide?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
