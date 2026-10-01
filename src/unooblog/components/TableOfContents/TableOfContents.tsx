'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UblTableOfContentsProps } from './TableOfContents.types';
import './TableOfContents.css';

/** Largura de contêiner a partir da qual o bloco `inline` abre sozinho. */
const INLINE_OPEN_MIN_WIDTH = 640;

/**
 * Componente TableOfContents — Design System Unooblog
 *
 * Sumário do post: uma lista de links `<a href="#id">` para os títulos, com o
 * item em leitura marcado por `aria-current="location"`, barra lateral de 2px em
 * `--ubl-color-action-primary` e peso maior (o estado não depende só da cor). O
 * nível 3 aparece recuado.
 *
 * - **`sidebar`**: coluna `position: sticky` de `--ubl-toc-width`, com o título
 *   "Neste post" acima da lista.
 * - **`inline`**: bloco recolhível (`<details>` com `<summary>`) para o topo do
 *   post no compacto. Sem `defaultOpen`, abre sozinho quando o contêiner tem
 *   640px ou mais.
 *
 * Os itens são links nativos: Tab, Shift+Tab e Enter funcionam sem escuta de
 * tecla. É Client Component: guarda o estado do bloco recolhível e repassa
 * funções aos links.
 */
export const TableOfContents = React.forwardRef<HTMLElement, UblTableOfContentsProps>(
  (
    {
      items,
      activeId,
      onSelect,
      title = 'Neste post',
      variant = 'sidebar',
      defaultOpen,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const headingId = React.useId();
    const isInline = variant === 'inline';
    const detailsRef = React.useRef<HTMLDetailsElement | null>(null);
    const [open, setOpen] = React.useState<boolean>(defaultOpen ?? false);

    React.useEffect(() => {
      if (!isInline || defaultOpen !== undefined) return;
      const width = detailsRef.current?.getBoundingClientRect().width ?? 0;
      if (width >= INLINE_OPEN_MIN_WIDTH) setOpen(true);
    }, [isInline, defaultOpen]);

    const classes = [
      'ubl-toc',
      `ubl-toc--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const list = (
      <ol className="ubl-toc__list">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const linkClasses = [
            'ubl-toc__link',
            `ubl-toc__link--level-${item.level}`,
            isActive ? 'ubl-toc__link--active' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li key={item.id} className="ubl-toc__item">
              <a
                className={linkClasses}
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => onSelect?.(item.id, event)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    );

    if (isInline) {
      return (
        <nav
          ref={ref}
          aria-labelledby={headingId}
          data-ubl-theme={theme}
          className={classes}
          {...restProps}
        >
          <details
            ref={detailsRef}
            className="ubl-toc__details"
            open={open}
            onToggle={(event) => setOpen(event.currentTarget.open)}
          >
            <summary className="ubl-toc__summary">
              <Icon name="tableOfContents" size="sm" tone="accent" />
              <span id={headingId} className="ubl-toc__title">
                {title}
              </span>
              <span className="ubl-toc__chevron" aria-hidden="true">
                <Icon name="chevronDown" size="sm" tone="secondary" />
              </span>
            </summary>
            {list}
          </details>
        </nav>
      );
    }

    return (
      <nav
        ref={ref}
        aria-labelledby={headingId}
        data-ubl-theme={theme}
        className={classes}
        {...restProps}
      >
        <h2 id={headingId} className="ubl-toc__title">
          {title}
        </h2>
        {list}
      </nav>
    );
  }
);

TableOfContents.displayName = 'TableOfContents';
