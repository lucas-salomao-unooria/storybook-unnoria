'use client';

import React from 'react';
import type { UncListItemProps } from './ListItem.types';
import './ListItem.css';

/**
 * Componente ListItem — Design System Unoochat
 *
 * Estrutura de linha compartilhada por todas as listas do produto: calha
 * lateral de 19px, recuo de 21px entre avatar e texto e divisor inferior
 * recuado que começa alinhado ao título.
 */
export const ListItem = React.forwardRef<HTMLElement, UncListItemProps>(
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
    const Component = (as || 'li') as React.ElementType;

    const classes = [
      'unc-listitem',
      `unc-listitem--density-${density}`,
      isInteractive ? 'unc-listitem--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const body = (
      <>
        {leading && <span className="unc-listitem__leading">{leading}</span>}

        <span className="unc-listitem__content">
          <span className="unc-listitem__title">{title}</span>
          {subtitle && <span className="unc-listitem__subtitle">{subtitle}</span>}
        </span>
      </>
    );

    return (
      <Component
        ref={ref as never}
        className={classes}
        style={
          {
            ['--unc-listitem-divider-inset' as string]: `${dividerInset}px`,
            ...style,
          } as React.CSSProperties
        }
        {...restProps}
      >
        {/* O alvo principal é um <button> interno, e não a própria linha: o slot
            `trailing` costuma conter outro botão (rediscar, opções do status), e
            aninhar botões é HTML inválido — o filho fica inalcançável para
            leitores de tela e para o teclado. */}
        {isInteractive ? (
          <button type="button" className="unc-listitem__main" onClick={onClick}>
            {body}
          </button>
        ) : (
          <span className="unc-listitem__main">{body}</span>
        )}

        {(meta || trailing) && (
          <span className="unc-listitem__aside">
            {meta && <span className="unc-listitem__meta">{meta}</span>}
            {trailing && <span className="unc-listitem__trailing">{trailing}</span>}
          </span>
        )}

        {divider && <span className="unc-listitem__divider" />}
      </Component>
    );
  }
);

ListItem.displayName = 'ListItem';
