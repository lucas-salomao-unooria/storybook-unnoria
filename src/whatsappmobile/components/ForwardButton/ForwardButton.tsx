import React from 'react';
import { Icon } from '../Icon';
import type { WaForwardButtonProps } from './ForwardButton.types';
import './ForwardButton.css';

/**
 * Componente ForwardButton — Design System WhatsApp Mobile
 *
 * Atalho circular de encaminhar, posicionado ao lado do balão. Em repouso
 * mostra o glifo `forward`; escolhido, mostra o `tick` sobre o verde-água do
 * selo; esgotado (`exhausted`), esmaece sem deixar de responder ao toque.
 * Extensão sem frame de origem: os dois glifos são literais do arquivo.
 */
export const ForwardButton = React.forwardRef<HTMLButtonElement, WaForwardButtonProps>(
  ({ label, selected = false, exhausted = false, type = 'button', className = '', ...restProps }, ref) => {
    const esgotado = exhausted && !selected;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        aria-pressed={selected}
        aria-disabled={esgotado || undefined}
        className={[
          'wa-forwardbutton',
          selected ? 'wa-forwardbutton--selected' : '',
          esgotado ? 'wa-forwardbutton--exhausted' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
      >
        <Icon name={selected ? 'tick' : 'forward'} size={16} tone="inherit" aria-hidden="true" />
      </button>
    );
  }
);

ForwardButton.displayName = 'ForwardButton';
