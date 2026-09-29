import React from 'react';
import { Icon } from '../Icon';
import type { UncForwardButtonProps } from './ForwardButton.types';
import './ForwardButton.css';

/**
 * Componente ForwardButton — Design System Unoochat
 *
 * Atalho circular de encaminhar, posicionado ao lado do balão. Em repouso
 * mostra o glifo `forward`; escolhido, mostra o `tick` sobre o acento do selo;
 * esgotado (`exhausted`), esmaece sem deixar de responder ao toque. Extensão:
 * os dois glifos são do registro de ícones.
 */
export const ForwardButton = React.forwardRef<HTMLButtonElement, UncForwardButtonProps>(
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
          'unc-forwardbutton',
          selected ? 'unc-forwardbutton--selected' : '',
          esgotado ? 'unc-forwardbutton--exhausted' : '',
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
