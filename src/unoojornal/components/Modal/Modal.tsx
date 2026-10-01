'use client';

import React from 'react';
import { IconButton } from '../IconButton';
import { useModalFocus } from '../../hooks';
import type { UjnModalProps } from './Modal.types';
import './Modal.css';

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

interface ModalLayerProps extends Omit<UjnModalProps, 'open'> {
  forwardedRef: React.Ref<HTMLDivElement>;
}

/**
 * A camada aberta. Existe só enquanto o diálogo está aberto: montar é abrir e
 * desmontar é fechar, então o hook de foco devolve o foco a quem abriu quando a
 * camada sai.
 */
const ModalLayer: React.FC<ModalLayerProps> = ({
  forwardedRef,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
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

  useModalFocus(panelRef, true, onClose, initialFocusRef ?? (showClose ? closeRef : undefined));

  const setPanel = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    assignRef(forwardedRef, node);
  };

  /*
   * Nome acessível (AGENTS.md, 4.3): `aria-labelledby` explícito manda; com
   * `aria-label` explícito, o diálogo não recebe `aria-labelledby`, que o
   * calaria no cálculo do nome.
   */
  const explicitLabelledBy = restProps['aria-labelledby'];
  const explicitLabel = restProps['aria-label'];
  const explicitDescribedBy = restProps['aria-describedby'];

  return (
    <div
      data-ujn-theme={theme}
      className={['ujn-modal-layer', dismissOnScrim ? 'ujn-modal-layer--dismissable' : '']
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
        className={['ujn-modal', `ujn-modal--${size}`, className].filter(Boolean).join(' ')}
        {...restProps}
        aria-labelledby={explicitLabelledBy ?? (!explicitLabel ? titleId : undefined)}
        aria-describedby={explicitDescribedBy ?? (description ? descriptionId : undefined)}
      >
        <div className="ujn-modal__header">
          <div className="ujn-modal__heading">
            <h2 id={titleId} className="ujn-modal__title">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="ujn-modal__description">
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
              className="ujn-modal__close"
              onClick={onClose}
            />
          )}
        </div>

        {children !== undefined && children !== null && (
          <div className="ujn-modal__body">{children}</div>
        )}

        {footer && <div className="ujn-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

/**
 * Componente Modal — Design System Unoojornal
 *
 * Diálogo modal informativo: a carta à redação, a ficha técnica de uma matéria,
 * o aviso de correção. Cartão em `background-elevated` com
 * `--ujn-elevation-overlay`, cantos de `radius-m`, sobre o véu
 * `--ujn-color-overlay-scrim`, centrado na tela.
 *
 * É uma camada da TELA, não da janela: `position: absolute; inset: 0` no
 * contêiner posicionado mais próximo — a tela do `PhoneFrame` ou do
 * `DesktopFrame`. Sem portal.
 *
 * `role="dialog"` com `aria-modal`, **nomeado pelo título renderizado** (e
 * descrito pela descrição). `aria-label` explícito vence e então não há
 * `aria-labelledby`. Usa o `useModalFocus` do módulo: foco preso, Esc fecha (só
 * a camada do topo responde), fundo `aria-hidden` com restauração e foco
 * devolvido a quem abriu. Por ser informativo, o toque no véu também fecha
 * (desligue com `dismissOnScrim={false}` quando houver texto a perder). Fechado,
 * não renderiza nada.
 */
export const Modal = React.forwardRef<HTMLDivElement, UjnModalProps>(
  ({ open, ...props }, ref) => {
    if (!open) {
      return null;
    }

    return <ModalLayer {...props} forwardedRef={ref} />;
  }
);

Modal.displayName = 'Modal';
