import React from 'react';
import { Icon } from '../Icon';
import type { UblTopicChipProps } from './TopicChip.types';
import './TopicChip.css';

/**
 * Componente TopicChip — Design System Unooblog
 *
 * Chip em cápsula de um tópico: filtra o feed ("Acessibilidade"), leva à página
 * do tópico (com `href`) ou só rotula um post (sem ação). Contorno de controle
 * (`border-control`, ≥ 3:1). Escolhido, vira roxo de ação **e** ganha o glifo de
 * marcação, de modo que a seleção não depende da cor. A contagem de posts aparece
 * ao lado do nome e entra no nome acessível.
 *
 * Server Component: só recebe props e renderiza — quem repassa `onClick` é o
 * consumidor.
 */
export const TopicChip = React.forwardRef<HTMLElement, UblTopicChipProps>(
  (
    {
      children,
      selected = false,
      count,
      href,
      onClick,
      size = 'md',
      disabled = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const isLink = href !== undefined;
    const isButton = !isLink && onClick !== undefined;
    const isInteractive = isLink || isButton;

    const classes = [
      'ubl-topic-chip',
      `ubl-topic-chip--${size}`,
      isInteractive ? 'ubl-topic-chip--interactive' : '',
      selected ? 'ubl-topic-chip--selected' : '',
      isInteractive && disabled ? 'ubl-topic-chip--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {selected && <Icon name="check" size="xs" tone="inherit" className="ubl-topic-chip__check" />}
        <span className="ubl-topic-chip__label">
          {children}
          {typeof count === 'number' && (
            <span className="ubl-topic-chip__sr">{`, ${count} ${count === 1 ? 'post' : 'posts'}`}</span>
          )}
        </span>
        {typeof count === 'number' && (
          <span className="ubl-topic-chip__count" aria-hidden="true">
            {count}
          </span>
        )}
      </>
    );

    if (isLink) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          data-ubl-theme={theme}
          className={classes}
          href={disabled ? undefined : href}
          aria-current={selected ? 'true' : undefined}
          aria-disabled={disabled || undefined}
          onClick={disabled ? undefined : onClick}
          {...restProps}
        >
          {content}
        </a>
      );
    }

    if (isButton) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          data-ubl-theme={theme}
          className={classes}
          aria-pressed={selected}
          disabled={disabled}
          onClick={onClick}
          {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} data-ubl-theme={theme} className={classes} {...restProps}>
        {content}
      </span>
    );
  }
);

TopicChip.displayName = 'TopicChip';
