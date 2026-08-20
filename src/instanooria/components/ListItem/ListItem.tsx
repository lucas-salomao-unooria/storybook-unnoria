import React from 'react';
import type { InstaListItemProps } from './ListItem.types';
import './ListItem.css';

/**
 * Componente ListItem — Design System Instanooria
 *
 * Linha genérica de lista usada em três contextos do arquivo de design: as
 * conversas da caixa de mensagens diretas (72px, avatar de 56px, prévia da
 * mensagem e horário), os itens do menu lateral do perfil (48px, glifo de 24px
 * e rótulo Body/Medium) e listas de sugestões de pessoas.
 */
export const ListItem = React.forwardRef<HTMLElement, InstaListItemProps>(
  (
    {
      as,
      leading,
      title,
      subtitle,
      meta,
      trailing,
      size = 'md',
      bordered = false,
      onClick,
      theme = 'light',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const isInteractive = Boolean(onClick);
    const Component = (as || (isInteractive ? 'button' : 'div')) as React.ElementType;

    const classes = [
      'insta-list-item',
      `insta-list-item--size-${size}`,
      bordered ? 'insta-list-item--bordered' : '',
      isInteractive ? 'insta-list-item--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-insta-theme={theme}
        className={classes}
        onClick={onClick}
        type={Component === 'button' ? 'button' : undefined}
        {...restProps}
      >
        {leading && <span className="insta-list-item__leading">{leading}</span>}

        <span className="insta-list-item__content">
          <span className="insta-list-item__title">{title}</span>
          {(subtitle || meta) && (
            <span className="insta-list-item__subtitle-row">
              {subtitle && <span className="insta-list-item__subtitle">{subtitle}</span>}
              {meta && <span className="insta-list-item__meta">{meta}</span>}
            </span>
          )}
        </span>

        {trailing && <span className="insta-list-item__trailing">{trailing}</span>}
      </Component>
    );
  }
);

ListItem.displayName = 'ListItem';
