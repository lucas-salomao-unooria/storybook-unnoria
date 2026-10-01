import React from 'react';
import type { UjnIconName } from '../Icon';
import type { UjnTheme } from '../../tokens';

/**
 * Um item da navegação principal.
 */
export interface UjnMainNavItem {
  /**
   * Identificador estável do item (devolvido em `onNavigate`).
   */
  id: string;

  /**
   * Rótulo do item.
   */
  label: string;

  /**
   * Endereço do destino. Sem ele, o item é um botão.
   */
  href?: string;

  /**
   * Glifo antes do rótulo (nome de `ujnIcons`).
   */
  icon?: UjnIconName;
}

/**
 * Propriedades do componente MainNav da Unoojornal.
 *
 * Os atributos nativos de `<nav>` (`id`, `data-*`…) vão para o invólucro.
 */
export interface UjnMainNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Seções do jornal, na ordem de exibição.
   */
  items: UjnMainNavItem[];

  /**
   * `id` do item da página atual (recebe `aria-current="page"`).
   */
  activeId: string;

  /**
   * Chamado com o `id` do item quando a pessoa o aciona. Não impede a
   * navegação nativa de um item com `href`.
   */
  onNavigate?: (id: string) => void;

  /**
   * Nome acessível do marco de navegação.
   * @default 'Seções do jornal'
   */
  ariaLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
