'use client';

import React from 'react';
import { IconButton } from '../IconButton';
import { useModalFocus } from '../../hooks';
import type { UjnBottomSheetProps } from './BottomSheet.types';
import './BottomSheet.css';

/**
 * Encaminha o nó para a ref externa (callback ou objeto). Fora do componente
 * para deixar explícito que a escrita ocorre no commit, não na renderização.
 */
const assignRef = (target: React.Ref<HTMLDivElement> | undefined, node: HTMLDivElement | null) => {
  if (typeof target === 'function') {
    target(node);
  } else if (target && 'current' in target) {
    (target as React.MutableRefObject<HTMLDivElement | null>).current = node;
  }
};

interface BottomSheetLayerProps extends Omit<UjnBottomSheetProps, 'open'> {
  forwardedRef: React.Ref<HTMLDivElement>;
}

/**
 * A camada aberta. Existe só enquanto a folha está aberta: montar é abrir e
 * desmontar é fechar, então a alça volta ao estado inicial a cada abertura e o
 * hook de foco devolve o foco a quem abriu quando a camada sai.
 */
const BottomSheetLayer: React.FC<BottomSheetLayerProps> = ({
  forwardedRef,
  onClose,
  title,
  description,
  children,
  footer,
  height = 'auto',
  handle = true,
  closeLabel = 'Fechar',
  showClose = true,
  dismissOnScrim = true,
  initialFocusRef,
  theme,
  className = '',
  ...restProps
}) => {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const pointerDownOnScrimRef = React.useRef(false);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const [toggled, setToggled] = React.useState(false);

  /* A alça alterna entre a altura pedida e a tela inteira; de 'full', recolhe para metade. */
  const expanded = (height === 'full') !== toggled;
  const shownHeight = expanded ? 'full' : height === 'full' ? 'half' : height;

  useModalFocus(panelRef, true, onClose, initialFocusRef ?? (showClose ? closeRef : undefined));

  const setPanel = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    assignRef(forwardedRef, node);
  };

  /*
   * Nome acessível (AGENTS.md, 4.3): `aria-labelledby` explícito manda; com
   * `aria-label` explícito, a folha não recebe `aria-labelledby`, que o calaria.
   */
  const explicitLabelledBy = restProps['aria-labelledby'];
  const explicitLabel = restProps['aria-label'];
  const explicitDescribedBy = restProps['aria-describedby'];
  const hasHeader = Boolean(title || description || showClose);

  return (
    <div
      data-ujn-theme={theme}
      className={['ujn-bottom-sheet-layer', dismissOnScrim ? 'ujn-bottom-sheet-layer--dismissable' : '']
        .filter(Boolean)
        .join(' ')}
      onPointerDown={(event) => {
        pointerDownOnScrimRef.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        /* Só fecha se o gesto inteiro começou e terminou no véu: arrastar uma seleção para fora não fecha. */
        if (dismissOnScrim && event.target === event.currentTarget && pointerDownOnScrimRef.current) {
          onClose();
        }
        pointerDownOnScrimRef.current = false;
      }}
    >
      <div
        ref={setPanel}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={['ujn-bottom-sheet', `ujn-bottom-sheet--height-${shownHeight}`, className]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
        aria-labelledby={explicitLabelledBy ?? (title && !explicitLabel ? titleId : undefined)}
        aria-describedby={explicitDescribedBy ?? (description ? descriptionId : undefined)}
      >
        {handle && (
          <button
            type="button"
            className="ujn-bottom-sheet__handle"
            aria-expanded={expanded}
            aria-label={expanded ? 'Recolher' : 'Expandir'}
            onClick={() => setToggled((current) => !current)}
          >
            <span className="ujn-bottom-sheet__grip" aria-hidden="true" />
          </button>
        )}

        {hasHeader && (
          <div
            className={[
              'ujn-bottom-sheet__header',
              handle ? '' : 'ujn-bottom-sheet__header--no-handle',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="ujn-bottom-sheet__heading">
              {title && (
                <h2 id={titleId} className="ujn-bottom-sheet__title">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="ujn-bottom-sheet__description">
                  {description}
                </p>
              )}
            </div>
            {showClose && (
              <IconButton
                ref={closeRef}
                icon="close"
                label={closeLabel}
                variant="ghost"
                size="md"
                className="ujn-bottom-sheet__close"
                onClick={onClose}
              />
            )}
          </div>
        )}

        <div className="ujn-bottom-sheet__body">{children}</div>

        {footer && <div className="ujn-bottom-sheet__footer">{footer}</div>}
      </div>
    </div>
  );
};

/**
 * Componente BottomSheet — Design System Unoojornal
 *
 * Folha inferior modal: sobe da base da tela sobre o véu `overlay-scrim`, em
 * `background-elevated` com cantos de `radius-l` no topo e
 * `--ujn-elevation-overlay`. No jornal serve ao menu de seções no móvel, aos
 * filtros, ao compartilhar e às ações de uma matéria.
 *
 * É uma camada da TELA, não da janela: `position: absolute; inset: 0` no
 * contêiner posicionado mais próximo — dentro do `PhoneFrame`, a tela do
 * aparelho. O recuo inferior soma `--ujn-safe-area-bottom`. Sem portal.
 *
 * `role="dialog"` com `aria-modal`, nomeado pelo título renderizado. Usa o
 * `useModalFocus` do módulo: foco preso, Esc fecha (só a camada do topo
 * responde), fundo `aria-hidden` e foco devolvido a quem abriu. A alça é um
 * botão "Expandir"/"Recolher" com `aria-expanded`; não há arraste. Fechada, não
 * renderiza nada.
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, UjnBottomSheetProps>(
  ({ open, ...props }, ref) => {
    if (!open) {
      return null;
    }

    return <BottomSheetLayer {...props} forwardedRef={ref} />;
  }
);

BottomSheet.displayName = 'BottomSheet';
