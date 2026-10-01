import React from 'react';
import type { UblPostListProps } from './PostList.types';
import './PostList.css';

/**
 * Achata os fragmentos: `<>...</>` ou um `.map()` dentro de um fragmento geram
 * um item por cartão, e não um item só.
 */
const flattenChildren = (nodes: React.ReactNode): React.ReactNode[] =>
  React.Children.toArray(nodes).flatMap((child) =>
    React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === React.Fragment
      ? flattenChildren(child.props.children)
      : [child]
  );

/**
 * Componente PostList — Design System Unooblog
 *
 * Lista de cartões de post. Na grade (`grid`), as colunas vêm da LARGURA DO
 * CONTÊINER, nunca da janela: uma coluna no compacto (< 640px), duas no médio
 * (≥ 640px) e até `columns` (2 ou 3) no largo (≥ 960px). Na `list`, os cartões
 * correm em uma coluna só. É uma lista de verdade (`<ul>` com `<li>`), com nome
 * acessível pela prop `ariaLabel`, de modo que o leitor de tela anuncia a
 * quantidade de posts. Fragmentos nos filhos são achatados: cada cartão vira um
 * item.
 *
 * Só recebe props e renderiza markup: é Server Component.
 */
export const PostList = React.forwardRef<HTMLUListElement, UblPostListProps>(
  ({ layout = 'grid', columns = 3, ariaLabel, children, theme, className = '', ...restProps }, ref) => {
    const classes = [
      'ubl-post-list',
      `ubl-post-list--${layout}`,
      layout === 'grid' ? `ubl-post-list--cols-${columns}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="ubl-post-list-container" data-ubl-theme={theme}>
        <ul ref={ref} className={classes} aria-label={ariaLabel} {...restProps}>
          {flattenChildren(children).map((child, index) => (
            <li
              className="ubl-post-list__item"
              key={`${index}-${React.isValidElement(child) && child.key != null ? child.key : ''}`}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

PostList.displayName = 'PostList';
