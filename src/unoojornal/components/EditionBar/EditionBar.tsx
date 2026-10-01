import React from 'react';
import type { UjnEditionBarProps } from './EditionBar.types';
import './EditionBar.css';

/**
 * Componente EditionBar — Design System Unoojornal
 *
 * Faixa fina no topo do jornal: instituição à esquerda, edição ao centro, data
 * e texto de atualização à direita. Com `live`, um ponto de status acompanha o
 * texto de atualização — o ponto reforça, nunca substitui: sem texto, ele não
 * aparece.
 *
 * Na largura compacta (contêiner abaixo de 640px) a edição se esconde e a
 * faixa empilha a instituição sobre a data. Só recebe props e renderiza
 * marcação, então roda como Server Component.
 */
export const EditionBar = React.forwardRef<HTMLDivElement, UjnEditionBarProps>(
  (
    { institution, edition, date, updatedLabel, live = false, theme, className = '', ...restProps },
    ref
  ) => {
    const classes = ['ujn-edition-bar', className].filter(Boolean).join(' ');
    const showLive = live && Boolean(updatedLabel);

    return (
      <div ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-edition-bar__inner">
          <span className="ujn-edition-bar__institution">{institution}</span>
          <span className="ujn-edition-bar__edition">{edition}</span>
          <span className="ujn-edition-bar__meta">
            <span className="ujn-edition-bar__date">{date}</span>
            {updatedLabel ? (
              <span
                className={[
                  'ujn-edition-bar__updated',
                  showLive ? 'ujn-edition-bar__updated--live' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {showLive && <span className="ujn-edition-bar__dot" aria-hidden="true" />}
                {updatedLabel}
              </span>
            ) : null}
          </span>
        </div>
      </div>
    );
  }
);

EditionBar.displayName = 'EditionBar';
