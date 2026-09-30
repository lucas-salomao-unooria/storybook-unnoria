'use client';

import React from 'react';
import { IconButton } from '../IconButton';
import { uglFormatSelection } from '../../media';
import type { UglSelectionBarAction, UglSelectionBarProps } from './SelectionBar.types';
import './SelectionBar.css';

/**
 * Componente SelectionBar — Design System Unoogaleria
 *
 * Barra inferior do modo de seleção: o rótulo com a contagem ("3 itens
 * selecionados") no centro e as ações dos dois lados. Com zero itens, todas as
 * ações ficam desabilitadas. Translúcida com desfoque e fio superior, soma
 * `--ugl-safe-area-bottom` ao próprio recuo.
 *
 * É uma barra de ferramentas (`role="toolbar"`) com um só ponto de Tab: as
 * setas, Home e End andam entre as ações habilitadas. O rótulo é uma região
 * viva educada, então cada troca de contagem é anunciada.
 */
export const SelectionBar = React.forwardRef<HTMLDivElement, UglSelectionBarProps>(
  (
    {
      count,
      label,
      actions,
      ariaLabel = 'Ações da seleção',
      floating = false,
      theme,
      className = '',
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const [focusedId, setFocusedId] = React.useState<string | null>(null);
    const toolbarRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => toolbarRef.current as HTMLDivElement);

    const isEnabled = (action: UglSelectionBarAction) => count > 0 && !action.disabled;
    const enabled = actions.filter(isEnabled);
    const tabStop = enabled.some((action) => action.id === focusedId) ? focusedId : (enabled[0]?.id ?? null);

    const focusAction = (id: string) => {
      setFocusedId(id);
      toolbarRef.current?.querySelector<HTMLButtonElement>(`[data-ugl-action="${CSS.escape(id)}"]`)?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || enabled.length === 0) return;
      const id = (event.target as HTMLElement).dataset?.uglAction;
      const current = enabled.findIndex((action) => action.id === id);
      if (current < 0) return;

      let next: number;
      switch (event.key) {
        case 'ArrowRight':
          next = (current + 1) % enabled.length;
          break;
        case 'ArrowLeft':
          next = (current - 1 + enabled.length) % enabled.length;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = enabled.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      focusAction(enabled[next].id);
    };

    const split = Math.floor(actions.length / 2);

    const renderAction = (action: UglSelectionBarAction) => (
      <IconButton
        key={action.id}
        icon={action.icon}
        label={action.label}
        data-ugl-action={action.id}
        className={[
          'ugl-selection-bar__action',
          action.tone === 'danger' ? 'ugl-selection-bar__action--danger' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={!isEnabled(action)}
        tabIndex={action.id === tabStop ? 0 : -1}
        onFocus={() => setFocusedId(action.id)}
        onClick={action.onClick}
      />
    );

    const classes = ['ugl-selection-bar', floating ? 'ugl-selection-bar--floating' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        data-ugl-theme={theme}
        className={classes}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        <div className="ugl-selection-bar__content">
          <div className="ugl-selection-bar__group ugl-selection-bar__group--start">
            {actions.slice(0, split).map(renderAction)}
          </div>
          <p className="ugl-selection-bar__label" aria-live="polite">
            {label ?? uglFormatSelection(count)}
          </p>
          <div className="ugl-selection-bar__group ugl-selection-bar__group--end">
            {actions.slice(split).map(renderAction)}
          </div>
        </div>
      </div>
    );
  }
);

SelectionBar.displayName = 'SelectionBar';
