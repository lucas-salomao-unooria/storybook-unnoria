import React from 'react';
import type { WaListItemProps } from './ListItem.types';
import './ListItem.css';

/**
 * Componente ListItem — Design System WhatsApp Mobile
 *
 * Estrutura de linha compartilhada por todas as listas do produto. Reproduz a
 * calha lateral de 19px, o recuo de 21px entre avatar e texto e o divisor
 * inferior recuado que começa alinhado ao título (Line 1, node 1:2027).
 */
export const ListItem = React.forwardRef<HTMLElement, WaListItemProps>(
  (
    {
      as,
      leading,
      title,
      subtitle,
      meta,
      trailing,
      density = 'chat',
      divider = true,
      dividerInset = 71,
      onClick,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const isInteractive = Boolean(onClick);
    const Component = (as || (isInteractive ? 'button' : 'li')) as React.ElementType;

    const classes = [
      'wa-listitem',
      `wa-listitem--density-${density}`,
      isInteractive ? 'wa-listitem--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        className={classes}
        style={
          {
            ['--wa-listitem-divider-inset' as string]: `${dividerInset}px`,
            ...style,
          } as React.CSSProperties
        }
        onClick={onClick}
        type={Component === 'button' ? 'button' : undefined}
        {...restProps}
      >
        {leading && <span className="wa-listitem__leading">{leading}</span>}

        <span className="wa-listitem__content">
          <span className="wa-listitem__title">{title}</span>
          {subtitle && <span className="wa-listitem__subtitle">{subtitle}</span>}
        </span>

        {(meta || trailing) && (
          <span className="wa-listitem__aside">
            {meta && <span className="wa-listitem__meta">{meta}</span>}
            {trailing && <span className="wa-listitem__trailing">{trailing}</span>}
          </span>
        )}

        {divider && <span className="wa-listitem__divider" />}
      </Component>
    );
  }
);

ListItem.displayName = 'ListItem';
