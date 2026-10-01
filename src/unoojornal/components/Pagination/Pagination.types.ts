import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente Pagination da Unoojornal.
 *
 * Os atributos nativos de `<nav>` (`id`, `data-*`…) vão para o invólucro.
 */
export interface UjnPaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Página atual, de 1 a `pageCount` (o valor é limitado a esse intervalo).
   */
  page: number;

  /**
   * Total de páginas.
   */
  pageCount: number;

  /**
   * Chamado com o número da página escolhida. O componente é sempre
   * controlado: quem guarda a página é o produto.
   */
  onPageChange?: (page: number) => void;

  /**
   * Quantas páginas aparecem de cada lado da atual. Acima do que cabe, o
   * restante vira reticências.
   * @default 1
   */
  siblingCount?: number;

  /**
   * Nome acessível do marco de navegação.
   * @default 'Paginação'
   */
  ariaLabel?: string;

  /**
   * Nome acessível do botão de voltar.
   * @default 'Página anterior'
   */
  previousLabel?: string;

  /**
   * Nome acessível do botão de avançar.
   * @default 'Próxima página'
   */
  nextLabel?: string;

  /**
   * Nome acessível do botão de uma página.
   * @default (n) => `Página ${n}`
   */
  pageLabel?: (page: number) => string;

  /**
   * Texto que substitui a lista de números na largura compacta.
   * @default (page, count) => `Página ${page} de ${count}`
   */
  summaryLabel?: (page: number, pageCount: number) => string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
