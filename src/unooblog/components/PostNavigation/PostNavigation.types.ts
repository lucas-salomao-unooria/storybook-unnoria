import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Direção da navegação entre posts.
 */
export type UblPostNavigationDirection = 'previous' | 'next';

/**
 * Um dos dois destinos da navegação.
 */
export interface UblPostNavigationTarget {
  /** Título do post de destino */
  title: string;
  /** Endereço do post; com ele, o cartão é um `<a>`; sem ele, um `<button>` */
  href?: string;
}

/**
 * Propriedades do componente PostNavigation da Unooblog.
 */
export interface UblPostNavigationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Post anterior (o mais antigo). Sem ele, o cartão não aparece.
   */
  previous?: UblPostNavigationTarget;

  /**
   * Próximo post (o mais novo). Sem ele, o cartão não aparece.
   */
  next?: UblPostNavigationTarget;

  /**
   * Chamado ao acionar um dos cartões, com a direção. Cartões com `href`
   * navegam pelo link e também chamam esta função.
   */
  onNavigate?: (direction: UblPostNavigationDirection) => void;

  /**
   * Rótulo pequeno do cartão do post anterior.
   * @default 'Post anterior'
   */
  previousLabel?: string;

  /**
   * Rótulo pequeno do cartão do próximo post.
   * @default 'Próximo post'
   */
  nextLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
