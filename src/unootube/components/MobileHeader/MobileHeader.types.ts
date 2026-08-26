import React from 'react';

/**
 * As três superfícies em que o cabeçalho móvel aparece.
 *
 * - `chrome`: a barra do reprodutor de Shorts (`3:245`), preenchida com a tinta
 *   escura do arquivo. Os glifos são sempre brancos, porque a superfície não
 *   muda com o tema.
 * - `page`: a barra do cabeçalho de canal (`16:1070`), que acompanha a
 *   superfície de navegação do tema — escura no escuro, clara no claro.
 * - `transparent`: o mesmo cabeçalho **sobre** o vídeo, sem preenchimento, para
 *   quando o reprodutor ocupa a tela inteira.
 */
export type UniMobileHeaderSurface = 'chrome' | 'page' | 'transparent';

/**
 * Propriedades do cabeçalho móvel.
 */
export interface UniMobileHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título exibido entre os dois alvos. O arquivo deixa o centro vazio nas duas
   * telas em que desenha o cabeçalho; a prop existe para as telas do produto
   * que precisarem dele.
   */
  title?: React.ReactNode;

  /** Chamado ao acionar o alvo de voltar. */
  onBack?: () => void;

  /**
   * Rótulo acessível do alvo de voltar.
   * @default 'Voltar'
   */
  backLabel?: string;

  /**
   * Oculta o alvo de voltar.
   * @default false
   */
  hideBack?: boolean;

  /**
   * Alvo exibido à direita. No reprodutor de Shorts é a câmera (`3:250`); no
   * cabeçalho de canal, o menu de reticências (`16:1076`).
   */
  action?: React.ReactNode;

  /**
   * Superfície do cabeçalho.
   * @default 'chrome'
   */
  surface?: UniMobileHeaderSurface;

  /** Classe CSS adicional. */
  className?: string;
}
