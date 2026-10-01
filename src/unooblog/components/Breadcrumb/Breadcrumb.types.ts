import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Item da trilha de navegação.
 */
export interface UblBreadcrumbItem {
  /**
   * Texto do item.
   */
  label: string;

  /**
   * Destino. Com `href` o item é um `<a>`.
   */
  href?: string;

  /**
   * Chamado ao acionar o item. Sem `href`, o item vira um `<button>`.
   */
  onClick?: () => void;
}

/**
 * Propriedades do componente Breadcrumb da Unooblog.
 *
 * Os atributos nativos de `<nav>` (`id`, `data-*`…) vão para o invólucro.
 */
export interface UblBreadcrumbProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Itens da trilha, do mais geral ao mais específico. O último é a página
   * atual: nunca é link, e recebe `aria-current="page"`.
   */
  items: UblBreadcrumbItem[];

  /**
   * Nome acessível do marco de navegação.
   * @default 'Trilha de navegação'
   */
  ariaLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
