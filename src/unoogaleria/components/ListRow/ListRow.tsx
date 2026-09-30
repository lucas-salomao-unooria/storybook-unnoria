import React from 'react';
import { Icon } from '../Icon';
import type { UglListRowProps } from './ListRow.types';
import './ListRow.css';

/**
 * Componente ListRow — Design System Unoogaleria
 *
 * Linha de lista agrupada: "Vídeos 3 ›", "Ocultos 🔒 2 ›", "Importados". Tem
 * altura mínima de 52px, glifo opcional à esquerda, título e apoio, e à direita
 * a contagem, um conteúdo livre e a seta. Com `href` é um link; com `onClick`,
 * um botão; sem nenhum dos dois, só informa.
 *
 * O fio divisor fica recuado até o texto, como nas listas agrupadas, e some no
 * último item de um `ListGroup`. Server Component: só recebe props e renderiza.
 */
export const ListRow = React.forwardRef<HTMLElement, UglListRowProps>(
  (
    {
      icon,
      iconTone,
      title,
      subtitle,
      detail,
      trailing,
      chevron,
      locked = false,
      onClick,
      href,
      target,
      rel,
      divider = true,
      destructive = false,
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
    const showChevron = chevron ?? isInteractive;
    const resolvedTone = iconTone ?? (destructive ? 'danger' : 'accent');
    const formattedDetail =
      typeof detail === 'number' ? detail.toLocaleString('pt-BR') : detail;

    const classes = [
      'ugl-list-row',
      isInteractive ? 'ugl-list-row--interactive' : '',
      divider ? 'ugl-list-row--divider' : '',
      destructive ? 'ugl-list-row--destructive' : '',
      disabled ? 'ugl-list-row--disabled' : '',
      icon ? 'ugl-list-row--with-icon' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {icon && (
          <span className="ugl-list-row__icon">
            <Icon name={icon} size="md" tone={resolvedTone} />
          </span>
        )}
        <span className="ugl-list-row__body">
          <span className="ugl-list-row__text">
            <span className="ugl-list-row__title">{title}</span>
            {subtitle && (
              <span className="ugl-list-row__subtitle">
                <span className="ugl-list-row__visually-hidden">, </span>
                {subtitle}
              </span>
            )}
          </span>

          {(locked ||
            formattedDetail !== undefined ||
            trailing !== undefined ||
            showChevron) && (
            <span className="ugl-list-row__end">
              {locked && (
                <>
                  <Icon name="lock" size="xs" tone="secondary" />
                  <span className="ugl-list-row__visually-hidden">, protegido</span>
                </>
              )}
              {formattedDetail !== undefined && (
                <span className="ugl-list-row__detail">
                  <span className="ugl-list-row__visually-hidden">, </span>
                  {formattedDetail}
                </span>
              )}
              {trailing !== undefined && <span className="ugl-list-row__trailing">{trailing}</span>}
              {showChevron && (
                <Icon
                  name="chevronRight"
                  size="sm"
                  tone="secondary"
                  className="ugl-list-row__chevron"
                />
              )}
            </span>
          )}
        </span>
      </>
    );

    if (isLink) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          data-ugl-theme={theme}
          className={classes}
          href={disabled ? undefined : href}
          target={disabled ? undefined : target}
          rel={rel}
          aria-disabled={disabled || undefined}
          role={disabled ? 'link' : undefined}
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
          data-ugl-theme={theme}
          className={classes}
          disabled={disabled}
          onClick={onClick}
          {...restProps}
        >
          {content}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        data-ugl-theme={theme}
        className={classes}
        {...restProps}
      >
        {content}
      </div>
    );
  }
);

ListRow.displayName = 'ListRow';
