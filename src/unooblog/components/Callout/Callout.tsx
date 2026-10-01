import React from 'react';
import { Icon } from '../Icon';
import type { UblIconName } from '../Icon';
import type { UblCalloutProps, UblCalloutTone } from './Callout.types';
import './Callout.css';

/**
 * Glifo de cada tom: a dica tem lâmpada, a atenção tem triângulo, a informação
 * tem o "i" — o tom se reconhece também pela forma.
 */
const TONE_ICON: Record<UblCalloutTone, UblIconName> = {
  info: 'info',
  tip: 'tip',
  warning: 'warning',
};

/**
 * Anúncio padrão do tom, em texto oculto.
 */
const TONE_LABEL: Record<UblCalloutTone, string> = {
  info: 'Informação:',
  tip: 'Dica:',
  warning: 'Atenção:',
};

/**
 * Componente Callout — Design System Unooblog
 *
 * Aviso dentro do post: um `<aside role="note">` com barra lateral de 4px e
 * glifo na cor de status do tom, sobre fundo translúcido (`fill-*`). O título
 * é opcional e o tom é anunciado também em texto oculto ("Dica:"), de modo que
 * o aviso não dependa de cor para ser entendido.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Callout = React.forwardRef<HTMLElement, UblCalloutProps>(
  ({ tone = 'info', title, toneLabel, children, theme, className = '', ...restProps }, ref) => {
    const classes = ['ubl-callout', `ubl-callout--${tone}`, className].filter(Boolean).join(' ');

    return (
      <aside ref={ref} role="note" data-ubl-theme={theme} className={classes} {...restProps}>
        <span className="ubl-callout__icon">
          <Icon name={TONE_ICON[tone]} size="md" tone="inherit" />
        </span>
        <div className="ubl-callout__content">
          {title && <p className="ubl-callout__title">{title}</p>}
          <div className="ubl-callout__body">
            <span className="ubl-callout__tone-label">{toneLabel ?? TONE_LABEL[tone]} </span>
            {children}
          </div>
        </div>
      </aside>
    );
  }
);

Callout.displayName = 'Callout';
