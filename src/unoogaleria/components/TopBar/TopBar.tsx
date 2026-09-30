'use client';

import React from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import type { UglTopBarProps } from './TopBar.types';
import './TopBar.css';

/**
 * Componente TopBar — Design System Unoogaleria
 *
 * Barra superior das telas da galeria. Soma `--ugl-safe-area-top` ao próprio
 * recuo, então o conteúdo começa abaixo da barra de status do aparelho, e é um
 * `<header>` com o título num `<h1>` (ou `<h2>`).
 *
 * - **'large'**: título grande à esquerda, linha de apoio acima dele e ações na
 *   linha do título. O voltar, quando existe, ganha uma linha própria acima.
 * - **'compact'**: título centralizado entre o voltar e as ações.
 * - **'overlay'**: a compacta, translúcida com desfoque e absoluta no topo do
 *   contêiner — a grade corre por baixo (passe `topInset` à `MediaGrid`).
 *
 * Marcado como Client Component porque repassa `onBack` ao botão.
 */
export const TopBar = React.forwardRef<HTMLElement, UglTopBarProps>(
  (
    {
      title,
      subtitle,
      variant = 'large',
      actions,
      leading,
      onBack,
      backLabel = 'Voltar',
      backText,
      bordered = false,
      headingLevel = 1,
      sticky = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const Heading = headingLevel === 2 ? 'h2' : 'h1';
    const isLarge = variant === 'large';

    const classes = [
      'ugl-top-bar',
      `ugl-top-bar--${variant}`,
      bordered ? 'ugl-top-bar--bordered' : '',
      sticky ? 'ugl-top-bar--sticky' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const back = onBack ? (
      backText ? (
        <button
          type="button"
          className="ugl-top-bar__back"
          aria-label={`${backLabel}: ${backText}`}
          title={backLabel}
          onClick={onBack}
        >
          <Icon name="back" size="md" tone="inherit" />
          <span className="ugl-top-bar__back-text">{backText}</span>
        </button>
      ) : (
        <IconButton icon="back" label={backLabel} className="ugl-top-bar__back-icon" onClick={onBack} />
      )
    ) : null;

    if (isLarge) {
      return (
        <header ref={ref} data-ugl-theme={theme} className={classes} {...restProps}>
          {(back || leading) && (
            <div className="ugl-top-bar__nav">
              {back}
              {leading}
            </div>
          )}
          <div className="ugl-top-bar__title-row">
            <div className="ugl-top-bar__heading">
              {subtitle && <p className="ugl-top-bar__subtitle">{subtitle}</p>}
              <Heading className="ugl-top-bar__title">{title}</Heading>
            </div>
            {actions && <div className="ugl-top-bar__actions">{actions}</div>}
          </div>
        </header>
      );
    }

    return (
      <header ref={ref} data-ugl-theme={theme} className={classes} {...restProps}>
        <div className="ugl-top-bar__bar">
          <div className="ugl-top-bar__side ugl-top-bar__side--start">
            {back}
            {leading}
          </div>
          <div className="ugl-top-bar__heading ugl-top-bar__heading--center">
            <Heading className="ugl-top-bar__title">{title}</Heading>
            {subtitle && <p className="ugl-top-bar__subtitle">{subtitle}</p>}
          </div>
          <div className="ugl-top-bar__side ugl-top-bar__side--end">{actions}</div>
        </div>
      </header>
    );
  }
);

TopBar.displayName = 'TopBar';
