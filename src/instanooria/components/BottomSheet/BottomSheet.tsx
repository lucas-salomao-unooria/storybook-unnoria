'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { InstaBottomSheetProps } from './BottomSheet.types';
import { useModalFocus } from './useModalFocus';
import './BottomSheet.css';

/**
 * Encaminha o nó para a ref externa (callback ou objeto). Fora do componente
 * para deixar explícito que a escrita ocorre no commit, não na renderização.
 */
const assignRef = (target: React.Ref<HTMLElement> | undefined, node: HTMLElement | null) => {
  if (typeof target === 'function') {
    target(node);
  } else if (target && 'current' in target) {
    (target as React.MutableRefObject<HTMLElement | null>).current = node;
  }
};

/**
 * Componente BottomSheet — Design System Instanooria
 *
 * Folha inferior do app real: cantos arredondados em cima, alça e a superfície
 * elevada. Extensão — o arquivo publica só a gaveta lateral do menu do perfil
 * (`0:1161` / `0:2938`), de onde vêm a superfície, a tipografia do corpo e a
 * separação por hairline, sem sombra.
 *
 * No modo modal prende o foco, fecha no ESC e no toque no véu e devolve o foco
 * a quem abriu. No não modal é um disclosure: a alça é um botão com
 * `aria-expanded`, e o conteúdo por baixo continua acessível.
 */
export const BottomSheet = React.forwardRef<HTMLElement, InstaBottomSheetProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      modal = true,
      title,
      collapsedLabel = 'Ver detalhes',
      maxHeight = '85%',
      children,
      theme = 'light',
      className = '',
      style,
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const panelRef = React.useRef<HTMLElement | null>(null);
    const toggleRef = React.useRef<HTMLButtonElement | null>(null);
    const titleId = React.useId();
    const bodyId = React.useId();

    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = isControlled ? open : internalOpen;

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (!isControlled) {
          setInternalOpen(next);
        }
        onOpenChange?.(next);
      },
      [isControlled, onOpenChange]
    );

    const close = React.useCallback(() => setOpen(false), [setOpen]);

    useModalFocus(panelRef, modal && isOpen, close);

    const setPanel = (node: HTMLElement | null) => {
      panelRef.current = node;
      assignRef(ref, node);
    };

    const resolvedStyle: React.CSSProperties = { maxHeight, ...style };

    /*
     * Nome acessível (seção 4.3): `aria-labelledby` explícito manda; com
     * `aria-label` explícito, a folha não recebe `aria-labelledby`, que o calaria.
     */
    const explicitLabelledBy = restProps['aria-labelledby'];
    const explicitLabel = restProps['aria-label'];

    if (modal) {
      if (!isOpen) {
        return null;
      }

      return (
        <div
          data-insta-theme={theme}
          className="insta-bottom-sheet-scrim"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              close();
            }
          }}
        >
          <div
            ref={setPanel}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className={['insta-bottom-sheet', 'insta-bottom-sheet--modal', className]
              .filter(Boolean)
              .join(' ')}
            style={resolvedStyle}
            onKeyDown={onKeyDown}
            {...restProps}
            aria-labelledby={
              explicitLabelledBy ?? (title && !explicitLabel ? titleId : undefined)
            }
          >
            <span className="insta-bottom-sheet__handle" aria-hidden="true" />
            {title && (
              <h2 id={titleId} className="insta-bottom-sheet__title">
                {title}
              </h2>
            )}
            <div className="insta-bottom-sheet__body">{children}</div>
          </div>
        </div>
      );
    }

    const toggleLabel = isOpen ? (title ?? collapsedLabel) : collapsedLabel;

    return (
      <section
        ref={setPanel}
        data-insta-theme={theme}
        className={[
          'insta-bottom-sheet',
          'insta-bottom-sheet--inline',
          isOpen ? 'insta-bottom-sheet--open' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={resolvedStyle}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === 'Escape' && isOpen) {
            event.stopPropagation();
            setOpen(false);
            toggleRef.current?.focus();
          }
        }}
        {...restProps}
        aria-labelledby={explicitLabelledBy ?? (explicitLabel ? undefined : titleId)}
      >
        <button
          ref={toggleRef}
          type="button"
          className="insta-bottom-sheet__toggle"
          aria-expanded={isOpen}
          aria-controls={bodyId}
          onClick={() => setOpen(!isOpen)}
        >
          <span className="insta-bottom-sheet__handle" aria-hidden="true" />
          <span className="insta-bottom-sheet__toggle-row">
            <span id={titleId} className="insta-bottom-sheet__toggle-label">
              {toggleLabel}
            </span>
            <span className="insta-bottom-sheet__chevron" aria-hidden="true">
              <Icon name="chevronDown" size={11} tone="inherit" theme={theme} />
            </span>
          </span>
        </button>

        <div id={bodyId} className="insta-bottom-sheet__body" hidden={!isOpen}>
          {children}
        </div>
      </section>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
