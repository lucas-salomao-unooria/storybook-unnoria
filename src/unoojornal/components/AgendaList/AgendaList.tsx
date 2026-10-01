import React from 'react';
import { Icon } from '../Icon';
import type { UjnAgendaItemProps, UjnAgendaListProps } from './AgendaList.types';
import './AgendaList.css';

/**
 * Compromisso da agenda: tarja de data (dia grande e mês em caixa alta), título
 * e horário. Com `href`, o título é um link e o item inteiro clica por
 * pseudo-elemento; sem ele, só informa. Renderiza um `<li>`.
 */
const AgendaItem = React.forwardRef<HTMLLIElement, UjnAgendaItemProps>(
  ({ day, month, title, time, href, className = '', ...restProps }, ref) => {
    const classes = ['ujn-agenda-item', href ? 'ujn-agenda-item--interactive' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <li ref={ref} className={classes} {...restProps}>
        <span className="ujn-agenda-item__date">
          <span className="ujn-agenda-item__day">{day}</span>
          <span className="ujn-agenda-item__month">{month}</span>
        </span>
        <span className="ujn-agenda-item__text">
          <span className="ujn-agenda-item__title">
            {href ? (
              <a className="ujn-agenda-item__link" href={href}>
                {title}
              </a>
            ) : (
              title
            )}
          </span>
          {time && (
            <span className="ujn-agenda-item__time">
              <Icon name="schedule" size="xs" tone="inherit" />
              {time}
            </span>
          )}
        </span>
      </li>
    );
  }
);

AgendaItem.displayName = 'AgendaList.Item';

/**
 * Componente AgendaList — Design System Unoojornal
 *
 * Cartão "Agenda da escola" da barra lateral: título e uma lista de
 * compromissos (`AgendaList.Item`), cada um com tarja de data sobre
 * `background-subtle`. É uma região nomeada pelo título e uma lista de verdade.
 * Só recebe props e renderiza markup: é Server Component.
 */
const AgendaListRoot = React.forwardRef<HTMLElement, UjnAgendaListProps>(
  ({ title = 'Agenda da escola', children, theme, className = '', ...restProps }, ref) => {
    const classes = ['ujn-agenda-list', className].filter(Boolean).join(' ');

    return (
      <section ref={ref} data-ujn-theme={theme} className={classes} aria-label={title} {...restProps}>
        <h3 className="ujn-agenda-list__title">{title}</h3>
        <ul className="ujn-agenda-list__items" role="list">
          {children}
        </ul>
      </section>
    );
  }
);

AgendaListRoot.displayName = 'AgendaList';

export const AgendaList = Object.assign(AgendaListRoot, { Item: AgendaItem });
