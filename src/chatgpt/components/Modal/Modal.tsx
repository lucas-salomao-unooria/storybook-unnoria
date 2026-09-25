'use client';

import React from 'react';
import type {
  GptModalBodyProps,
  GptModalFooterProps,
  GptModalHeaderProps,
  GptModalProps,
} from './Modal.types';
import { gptGlyphs } from '../../tokens';
import './Modal.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Ligação entre a superfície e o título do cabeçalho. O `Modal.Header` se
 * anuncia com o id do seu título, e a superfície com `role="dialog"` passa a
 * citá-lo em `aria-labelledby` — composta ou pelo atalho `title=`. Sem isso o
 * diálogo saía sem nome acessível, e o leitor de tela anunciava só "diálogo".
 */
interface ModalTitleContextValue {
  /** Registra o id do título montado; devolve a função que desfaz o registro. */
  registerTitle: (id: string) => () => void;
}

const ModalTitleContext = React.createContext<ModalTitleContextValue | null>(null);

/**
 * `useLayoutEffect` no browser e `useEffect` no servidor: o registro precisa
 * acontecer ANTES da pintura, senão o diálogo aparece um quadro sem nome — e é
 * ao abrir que o leitor de tela o anuncia.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * Cabeçalho do diálogo — título em `Heading/H3` e botão de fechar opcional.
 * Dentro de um `Modal`, o título nomeia o diálogo (`aria-labelledby`).
 */
const ModalHeader: React.FC<GptModalHeaderProps> = ({
  onClose,
  closeLabel = 'Fechar',
  children,
  className = '',
  ...restProps
}) => {
  const registerTitle = React.useContext(ModalTitleContext)?.registerTitle;
  const ownTitleId = React.useId();
  const titleId = registerTitle ? ownTitleId : undefined;

  useIsomorphicLayoutEffect(() => {
    if (!registerTitle || !titleId) return undefined;
    return registerTitle(titleId);
  }, [registerTitle, titleId]);

  return (
    <div className={['gpt-modal__header', className].filter(Boolean).join(' ')} {...restProps}>
      <h2 id={titleId} className="gpt-modal__title">
        {children}
      </h2>
      {onClose && (
        <button type="button" className="gpt-modal__close" aria-label={closeLabel} onClick={onClose}>
          <span aria-hidden="true">{gptGlyphs.close}</span>
        </button>
      )}
    </div>
  );
};

ModalHeader.displayName = 'Modal.Header';

/**
 * Corpo do diálogo — texto em `Body/SM` a 70% de opacidade.
 */
const ModalBody: React.FC<GptModalBodyProps> = ({ children, className = '', ...restProps }) => (
  <div className={['gpt-modal__body', className].filter(Boolean).join(' ')} {...restProps}>
    {children}
  </div>
);

ModalBody.displayName = 'Modal.Body';

/**
 * Rodapé do diálogo — faixa de ações alinhada à direita.
 */
const ModalFooter: React.FC<GptModalFooterProps> = ({ children, className = '', ...restProps }) => (
  <div className={['gpt-modal__footer', className].filter(Boolean).join(' ')} {...restProps}>
    {children}
  </div>
);

ModalFooter.displayName = 'Modal.Footer';

interface ModalComponent
  extends React.ForwardRefExoticComponent<GptModalProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

/**
 * Componente Modal — Design System ChatGPT
 *
 * Réplica do componente `Modal` do Figma: superfície de 480px com padding 24,
 * gap 16, raio 16 e a sombra local `0 8 32 -4 · preto 15%`.
 *
 * Acessibilidade: `role="dialog"` com `aria-modal`, nome acessível pelo título
 * do cabeçalho (`aria-labelledby`, composto ou pelo atalho `title`), fechamento
 * por `ESC`, confinamento de foco com `Tab`/`Shift+Tab` e devolução do foco ao
 * elemento que abriu o diálogo.
 */
export const Modal = React.forwardRef<HTMLDivElement, GptModalProps>(
  (
    {
      open = true,
      onClose,
      title,
      withOverlay = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      closeLabel = 'Fechar',
      theme,
      children,
      className = '',
      'aria-labelledby': ariaLabelledBy,
      'aria-label': ariaLabel,
      ...restProps
    },
    ref
  ) => {
    const surfaceRef = React.useRef<HTMLDivElement | null>(null);
    const previouslyFocused = React.useRef<HTMLElement | null>(null);

    const [announcedTitleId, setAnnouncedTitleId] = React.useState<string | null>(null);
    const registerTitle = React.useCallback((id: string) => {
      setAnnouncedTitleId(id);
      return () => setAnnouncedTitleId((current) => (current === id ? null : current));
    }, []);
    const titleContext = React.useMemo(() => ({ registerTitle }), [registerTitle]);

    /**
     * Precedência do nome acessível: `aria-labelledby` explícito manda; com
     * `aria-label` explícito, nada de `aria-labelledby` — ele venceria o
     * `aria-label` no cálculo do nome e o calaria sem aviso; sem nenhum dos
     * dois, o título do `Modal.Header` montado dentro do diálogo.
     */
    const labelledBy = ariaLabelledBy || (ariaLabel ? undefined : announcedTitleId || undefined);

    React.useImperativeHandle(ref, () => surfaceRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!open) return;

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
      <ModalTitleContext.Provider value={titleContext}>
        <div
          ref={surfaceRef}
          className={['gpt-modal', className].filter(Boolean).join(' ')}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          aria-label={ariaLabel}
          tabIndex={-1}
          {...restProps}
        >
          {title !== undefined && (
            <ModalHeader onClose={onClose} closeLabel={closeLabel}>
              {title}
            </ModalHeader>
          )}
          {children}
        </div>
      </ModalTitleContext.Provider>
    );

    if (!withOverlay) {
      return (
        <div data-gpt-theme={theme} className="gpt-modal-root">
          {surface}
        </div>
      );
    }

    return (
      <div
        data-gpt-theme={theme}
        className="gpt-modal-overlay"
        onClick={closeOnOverlayClick ? () => onClose?.() : undefined}
      >
        <div
          className="gpt-modal-overlay__inner"
          onClick={(event) => event.stopPropagation()}
        >
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
