import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente DesktopFrame da Unoojornal.
 */
export interface UjnDesktopFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Endereço exibido no campo da barra do navegador ("gazetadopatio.escola.br").
   * Sem ele, o campo não é renderizado.
   */
  url?: string;

  /**
   * Largura da tela, em pixels (a página do jornal tem 1440px).
   * @default 1440
   */
  width?: number;

  /**
   * Altura da tela, em pixels, sem contar a barra do navegador.
   * @default 1024
   */
  height?: number;

  /**
   * Escala de exibição, para caber em páginas de documentação. O quadro encolhe
   * inteiro e ocupa o espaço já escalado.
   * @default 1
   */
  scale?: number;

  /**
   * Conteúdo da tela. Sobreposições (diálogos, folhas e avisos) se posicionam
   * dentro dela, e não na janela. A tela não rola: o conteúdo cuida da própria
   * rolagem.
   */
  children?: React.ReactNode;

  /**
   * Rótulo acessível do quadro (vira `role="group"`).
   */
  ariaLabel?: string;

  /**
   * Força o tema visual da tela. Quando omitido, herda o tema do contêiner
   * ancestral por `data-ujn-theme`.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
