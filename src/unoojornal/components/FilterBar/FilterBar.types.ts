import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Um filtro da barra.
 */
export interface UjnFilterBarItem {
  /**
   * Identificador estável do filtro (o valor da barra).
   */
  id: string;

  /**
   * Rótulo da pílula.
   */
  label: string;

  /**
   * Quantidade de matérias do filtro, exibida na pílula.
   */
  count?: number;
}

/**
 * Propriedades do componente FilterBar da Unoojornal.
 *
 * Os atributos nativos de `<div>` (`id`, `data-*`…) vão para o invólucro
 * `role="group"`.
 */
export interface UjnFilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /**
   * Filtros, na ordem de exibição. Em geral o primeiro é o que representa
   * "todas" (`allId`).
   */
  items: UjnFilterBarItem[];

  /**
   * `id` do filtro selecionado (modo controlado).
   */
  value?: string;

  /**
   * `id` do filtro inicialmente selecionado (modo não controlado).
   * @default allId
   */
  defaultValue?: string;

  /**
   * Chamado com o `id` do novo filtro. Acionar a pílula já selecionada, quando
   * ela não é a de `allId`, devolve `allId` (limpa o filtro).
   */
  onValueChange?: (id: string) => void;

  /**
   * Nome acessível do grupo de filtros (ex.: "Filtrar matérias por seção").
   */
  ariaLabel: string;

  /**
   * `id` que representa "sem filtro". Acionar a pílula selecionada de qualquer
   * outro `id` volta a ele.
   * @default 'todas'
   */
  allId?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
