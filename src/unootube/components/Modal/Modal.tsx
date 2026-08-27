'use client';

import React from 'react';
import type {
  UniModalBodyProps,
  UniModalFooterProps,
  UniModalHeaderProps,
  UniModalProps,
} from './Modal.types';
import './Modal.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Cabeçalho do diálogo — título em `Heading/H3` e botão de fechar opcional.
 */
const ModalHeader: React.FC<UniModalHeaderProps> = ({
  onClose,
  closeLabel = 'Fechar',
  closeIcon,
  children,
  className = '',
  ...restProps
}) => (
  <div className={['uni-modal__header', className].filter(Boolean).join(' ')} {...restProps}>
    <h2 className="uni-modal__title">{children}</h2>
    {onClose && (
      <button type="button" className="uni-modal__close" aria-label={closeLabel} onClick={onClose}>
        {/*
         * Os 52 glifos da biblioteca vêm dos dois arquivos de origem, e nenhum
         * deles desenha um "fechar" — as seis telas publicadas não abrem camada
         * nenhuma. Desenhar um X à mão violaria a regra de iconografia da seção
         * 10.4, e girar um glifo existente produziria uma forma que não é a de
         * fechar. O padrão é o caractere tipográfico ✕ na própria família
         * Roboto, e a prop `closeIcon` existe para que um produto com família
         * vetorial própria injete a sua sem alterar o componente.
         */}
        {closeIcon ?? <span aria-hidden="true">✕</span>}
      </button>
    )}
  </div>
);

ModalHeader.displayName = 'Modal.Header';

/** Corpo do diálogo — texto em `Body/Medium`. */
const ModalBody: React.FC<UniModalBodyProps> = ({ children, className = '', ...restProps }) => (
  <div className={['uni-modal__body', className].filter(Boolean).join(' ')} {...restProps}>
    {children}
  </div>
);

ModalBody.displayName = 'Modal.Body';

/** Rodapé do diálogo — faixa de ações alinhada à direita. */
const ModalFooter: React.FC<UniModalFooterProps> = ({ children, className = '', ...restProps }) => (
  <div className={['uni-modal__footer', className].filter(Boolean).join(' ')} {...restProps}>
    {children}
  </div>
);

ModalFooter.displayName = 'Modal.Footer';

interface ModalComponent
  extends React.ForwardRefExoticComponent<UniModalProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

/**
 * Componente Modal — Design System Unootube
 *
 * EXTENSÃO DECLARADA. Nenhum dos dois arquivos de origem publica diálogo: o
 * "YouTube UI Clone Design" cobre três telas e o "Free YouTube Shorts Mockups"
 * cobre outras três, e nenhuma delas abre uma camada modal. O componente existe
 * porque produto precisa de confirmação destrutiva e de formulário sobreposto,
 * e a alternativa — usar o `Modal` da Plataforma Unooria dentro de uma tela
 * Unootube — traria Open Sans e a paleta navy para o meio do Roboto e do
 * vermelho.
 *
 * Nada aqui foi inventado do zero. A superfície é `background/secondary`, a
 * mesma das barras de navegação; a sombra é `Elevation/High`, que o quadro
 * `Elevation` (`106:3226`) descreve literalmente como "modal: diálogos e
 * folhas"; o título usa `Heading/H3` e o corpo `Body/Medium`, degraus
 * publicados. O único valor novo é o véu, registrado como
 * `--uni-color-scrim`.
 *
 * Acessibilidade: `role="dialog"` com `aria-modal`, fechamento por `ESC`,
 * confinamento de foco com `Tab`/`Shift+Tab` e devolução do foco ao elemento
 * que abriu o diálogo.
 */
export const Modal = React.forwardRef<HTMLDivElement, UniModalProps>(
  (
    {
      open = true,
      onClose,
      title,
      size = 'md',
      withOverlay = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      closeLabel = 'Fechar',
      closeIcon,
      theme,
      children,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const surfaceRef = React.useRef<HTMLDivElement | null>(null);
    const previouslyFocused = React.useRef<HTMLElement | null>(null);

    React.useImperativeHandle(ref, () => surfaceRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!open) return undefined;

      previouslyFocused.current = document.activeElement as HTMLElement | null;
      const surface = surfaceRef.current;
      const focusables = surface?.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focusables && focusables.length ? focusables[0] : surface)?.focus();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEscape) {
          event.stopPropagation();
          onClose?.();
          return;
        }

        if (event.key !== 'Tab' || !surfaceRef.current) return;

        const items = Array.from(surfaceRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (items.length === 0) {
          event.preventDefault();
          return;
        }

        const first = items[0];
        const last = items[items.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener('keydown', handleKeyDown, true);
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
        previouslyFocused.current?.focus?.();
      };
    }, [open, closeOnEscape, onClose]);

    if (!open) return null;

    const surface = (
      <div
        ref={surfaceRef}
        className={['uni-modal', `uni-modal--${size}`, className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...restProps}
      >
        {title !== undefined && (
          <ModalHeader onClose={onClose} closeLabel={closeLabel} closeIcon={closeIcon}>
            {title}
          </ModalHeader>
        )}
        {children}
      </div>
    );

    if (!withOverlay) {
      return (
        <div data-uni-theme={theme} className="uni-modal-root">
          {surface}
        </div>
      );
    }

    return (
      <div
        data-uni-theme={theme}
        className="uni-modal-overlay"
        onClick={closeOnOverlayClick ? () => onClose?.() : undefined}
      >
        <div className="uni-modal-overlay__inner" onClick={(event) => event.stopPropagation()}>
          {surface}
        </div>
      </div>
    );
  }
) as ModalComponent;

Modal.displayName = 'Modal';
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
