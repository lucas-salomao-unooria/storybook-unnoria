import React from 'react';

/**
 * Propriedades da moldura de área de trabalho.
 *
 * Reproduz as dimensões dos três quadros de tela do arquivo — `Home` (`3:185`),
 * `Channel` (`15:913`) e `Video` (`19:1900`) —, todos de 1440×1024.
 */
export interface UniDesktopFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rótulo exibido acima da moldura, para identificar a tela na documentação.
   */
  label?: React.ReactNode;

  /**
   * Altura da moldura em pixels. O padrão é a altura literal dos quadros do
   * arquivo.
   * @default 1024
   */
  height?: number;

  /**
   * Fator de escala aplicado à moldura, para que um quadro de 1440px caiba na
   * largura disponível da página de documentação.
   * @default 1
   */
  scale?: number;

  /**
   * Conteúdo da tela.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
