'use client';

import React, {
  forwardRef,
  useRef,
  useEffect,
  useLayoutEffect,
  useId,
  useState,
  useSyncExternalStore,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import {
  ModalProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseButtonProps,
  ModalTheme,
  ModalSize,
} from './Modal.types';
import './Modal.css';

// ============================================================================
// Contexto do Modal
// ============================================================================
interface ModalContextValue {
  onClose: () => void;
  theme: ModalTheme;
  size: ModalSize;
  /** Id que `ModalTitle` adota quando não recebe `id` próprio. */
  titleId: string;
  /** Id que `ModalDescription` adota quando não recebe `id` próprio. */
  descriptionId: string;
  showCloseButton: boolean;
  /**
   * `ModalTitle` e `ModalDescription` se anunciam ao diálogo com o id que de
   * fato renderizaram. É o que permite ao `Modal` apontar `aria-labelledby` e
   * `aria-describedby` para eles também na composição manual, e não só pelo
   * atalho `title=` — sem isso, o diálogo composto saía sem nome acessível.
   * Devolvem a função que desfaz o anúncio, para o desmonte.
   */
  registerTitle: (id: string) => () => void;
  registerDescription: (id: string) => () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  return useContext(ModalContext);
};

/**
 * `useLayoutEffect` no browser e `useEffect` no servidor. O anúncio do título
 * precisa acontecer ANTES da pintura: com `useEffect`, o diálogo apareceria um
 * quadro sem nome, e é justamente ao abrir que o leitor de tela o anuncia. No
 * servidor não há pintura, e o `useLayoutEffect` do React 18 emite aviso.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Anuncia ao `Modal` mais próximo o id de um título ou descrição montado
 * dentro dele. Fora de um `Modal`, não faz nada.
 */
function useAnnounceToModal(
  register: ((id: string) => () => void) | undefined,
  id: string | undefined
) {
  useIsomorphicLayoutEffect(() => {
    if (!register || !id) return undefined;
    return register(id);
  }, [register, id]);
}

// ============================================================================
// Ícone de Fechamento Padrão (SVG X)
// ============================================================================
const DefaultCloseIcon: React.FC<{ className?: string }> = ({ className = 'unooria-modal__close-icon' }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ============================================================================
// Subcomponente: ModalCloseButton (Modal.CloseButton)
// ============================================================================
export const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  (
    {
      ariaLabel = 'Fechar modal',
      icon,
      onClick,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const context = useModalContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      } else if (context?.onClose) {
        context.onClose();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`unooria-modal__close-btn ${className}`.trim()}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...restProps}
      >
        {icon || <DefaultCloseIcon />}
      </button>
    );
  }
);
ModalCloseButton.displayName = 'ModalCloseButton';

// ============================================================================
// Subcomponente: ModalTitle (Modal.Title)
// ============================================================================
export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ as: Component = 'h2', className = '', id, children, ...restProps }, ref) => {
    const context = useModalContext();
    const titleId = id || context?.titleId;
    useAnnounceToModal(context?.registerTitle, titleId);

    return React.createElement(
      Component,
      {
        ref: ref as React.Ref<HTMLElement>,
        id: titleId,
        className: `unooria-modal__title ${className}`.trim(),
        ...restProps,
      },
      children
    );
  }
);
ModalTitle.displayName = 'ModalTitle';

// ============================================================================
// Subcomponente: ModalDescription (Modal.Description)
// ============================================================================
export const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ as: Component = 'p', className = '', id, children, ...restProps }, ref) => {
    const context = useModalContext();
    const descriptionId = id || context?.descriptionId;
    useAnnounceToModal(context?.registerDescription, descriptionId);

    return React.createElement(
      Component,
      {
        ref: ref as React.Ref<HTMLElement>,
        id: descriptionId,
        className: `unooria-modal__description ${className}`.trim(),
        ...restProps,
      },
      children
    );
  }
);
ModalDescription.displayName = 'ModalDescription';

// ============================================================================
// Subcomponente: ModalHeader (Modal.Header)
// ============================================================================
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (
    {
      title,
      description,
      subtitle,
      showCloseButton,
      onClose,
      action,
      className = '',
      children,
      ...restProps
    },
    ref
  ) => {
    const context = useModalContext();
    const shouldShowClose = showCloseButton !== undefined ? showCloseButton : context?.showCloseButton ?? true;
    const descContent = description || subtitle;

    const hasShorthand = Boolean(title || descContent || action);

    return (
      <div
        ref={ref}
        className={`unooria-modal__header ${className}`.trim()}
        {...restProps}
      >
        {hasShorthand ? (
          <>
            <div className="unooria-modal__header-content">
              {typeof title === 'string' ? <ModalTitle>{title}</ModalTitle> : title}
              {typeof descContent === 'string' ? (
                <ModalDescription>{descContent}</ModalDescription>
              ) : (
                descContent
              )}
            </div>

            <div className="unooria-modal__header-actions">
              {action}
              {shouldShowClose && <ModalCloseButton onClick={onClose} />}
            </div>
          </>
        ) : (
          <>
            <div className="unooria-modal__header-content">{children}</div>
            {shouldShowClose && (
              <div className="unooria-modal__header-actions">
                <ModalCloseButton onClick={onClose} />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);
ModalHeader.displayName = 'ModalHeader';

// ============================================================================
// Subcomponente: ModalBody (Modal.Body)
// ============================================================================
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (
    {
      padding = 'md',
      scrollable = true,
      maxHeight,
      className = '',
      style,
      children,
      ...restProps
    },
    ref
  ) => {
    const isNamedPadding = typeof padding === 'string' && ['none', 'sm', 'md', 'lg'].includes(padding);
    const paddingClass = isNamedPadding ? `unooria-modal__body--padding-${padding}` : '';
    const customPaddingStyle: React.CSSProperties =
      !isNamedPadding && padding !== undefined ? { padding } : {};

    const customStyle: React.CSSProperties = {
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      ...customPaddingStyle,
      ...style,
    };

    const classes = [
      'unooria-modal__body',
      paddingClass,
      scrollable ? 'unooria-modal__body--scrollable' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} style={customStyle} {...restProps}>
        {children}
      </div>
    );
  }
);
ModalBody.displayName = 'ModalBody';

// ============================================================================
// Subcomponente: ModalFooter (Modal.Footer)
// ============================================================================
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  (
    {
      align = 'end',
      gap = '16px',
      divider = false,
      primaryAction,
      secondaryAction,
      className = '',
      style,
      children,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unooria-modal__footer',
      `unooria-modal__footer--align-${align}`,
      divider ? 'unooria-modal__footer--divider' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle: React.CSSProperties = {
      gap,
      ...style,
    };

    return (
      <div ref={ref} className={classes} style={customStyle} {...restProps}>
        {children ? (
          children
        ) : (
          <div className="unooria-modal__footer-actions" style={{ gap }}>
            {secondaryAction}
            {primaryAction}
          </div>
        )}
      </div>
    );
  }
);
ModalFooter.displayName = 'ModalFooter';

// ============================================================================
// Hidratação segura (SSR)
// ============================================================================

/** Assinatura vazia: o valor de hidratação nunca muda depois de resolvido. */
const subscribeToNothing = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Retorna `false` no servidor e durante a hidratação, e `true` a partir daí.
 * Em renderização puramente client-side já retorna `true` na primeira passada,
 * preservando o comportamento atual no browser.
 */
function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribeToNothing, getHydratedSnapshot, getServerSnapshot);
}

// ============================================================================
// Componente Principal: Modal
// ============================================================================
export interface ModalComponent
  extends React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  CloseButton: typeof ModalCloseButton;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = 'md',
      theme = 'light',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      showCloseButton = true,
      lockScroll = true,
      trapFocus = true,
      initialFocusRef,
      finalFocusRef,
      portalContainer,
      title,
      description,
      subtitle,
      footer,
      primaryAction,
      secondaryAction,
      footerAlign = 'end',
      className = '',
      overlayClassName = '',
      style,
      overlayStyle,
      children,
      role = 'dialog',
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-label': ariaLabel,
      'data-testid': testId = 'unooria-modal',
      ...restProps
    },
    ref
  ) => {
    const autoTitleId = useId();
    const autoDescId = useId();

    /**
     * Ids do `ModalTitle` e do `ModalDescription` montados dentro do diálogo,
     * seja pela composição manual, seja pelo atalho. `null` enquanto nenhum
     * se anunciou.
     */
    const [announcedTitleId, setAnnouncedTitleId] = useState<string | null>(null);
    const [announcedDescId, setAnnouncedDescId] = useState<string | null>(null);

    const registerTitle = useCallback((id: string) => {
      setAnnouncedTitleId(id);
      return () => setAnnouncedTitleId((current) => (current === id ? null : current));
    }, []);

    const registerDescription = useCallback((id: string) => {
      setAnnouncedDescId(id);
      return () => setAnnouncedDescId((current) => (current === id ? null : current));
    }, []);

    /**
     * O portal só pode ser criado no cliente. Renderizar `null` no servidor e
     * durante a hidratação mantém a árvore idêntica dos dois lados.
     */
    const isHydrated = useIsHydrated();

    const internalContainerRef = useRef<HTMLDivElement | null>(null);
    const mouseDownTargetRef = useRef<EventTarget | null>(null);
    const previousActiveElementRef = useRef<HTMLElement | null>(null);

    const descText = description || subtitle;

    /**
     * Precedência do nome acessível:
     * 1. `aria-labelledby` explícito — manda sempre;
     * 2. `aria-label` explícito — o diálogo NÃO recebe `aria-labelledby`, que
     *    venceria o `aria-label` no cálculo do nome e o calaria sem aviso;
     * 3. o `ModalTitle` montado dentro do diálogo, com o id que ele renderizou
     *    (o próprio `id`, quando passado, ou o automático);
     * 4. o atalho `title=`, pelo id automático — que cobre também o `title`
     *    passado como elemento, como já era.
     * A descrição segue a mesma ordem, sem o degrau do `aria-label`.
     */
    const computedTitleId =
      ariaLabelledBy ||
      (ariaLabel ? undefined : announcedTitleId || (title ? autoTitleId : undefined));
    const computedDescId =
      ariaDescribedBy || announcedDescId || (descText ? autoDescId : undefined);

    // ========================================================================
    // Fechamento com Tecla Escape
    // ========================================================================
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown, true);
      return () => {
        window.removeEventListener('keydown', handleKeyDown, true);
      };
    }, [isOpen, closeOnEsc, onClose]);

    // ========================================================================
    // Bloqueio de Scroll no Body (Scroll Lock)
    // ========================================================================
    useEffect(() => {
      if (!isOpen || !lockScroll || typeof document === 'undefined') return;

      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // Compensação da scrollbar para evitar layout shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }, [isOpen, lockScroll]);

    // ========================================================================
    // Focus Trap & Gerenciamento de Foco
    // ========================================================================
    useEffect(() => {
      if (!isOpen || typeof document === 'undefined') return;

      previousActiveElementRef.current = document.activeElement as HTMLElement;

      const focusTimer = setTimeout(() => {
        if (initialFocusRef && initialFocusRef.current) {
          initialFocusRef.current.focus();
        } else if (internalContainerRef.current) {
          const focusableElements = internalContainerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            internalContainerRef.current.focus();
          }
        }
      }, 50);

      return () => {
        clearTimeout(focusTimer);
        // A leitura de `finalFocusRef.current` precisa acontecer no momento do
        // cleanup (fechamento do modal), e não na montagem: o elemento que
        // deve receber o foco pode ser montado depois da abertura. Copiar o
        // valor no início do efeito, como sugere a regra, devolveria o foco ao
        // alvo errado, então a checagem é suprimida deliberadamente.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const finalTarget = finalFocusRef?.current || previousActiveElementRef.current;
        if (finalTarget && typeof finalTarget.focus === 'function') {
          finalTarget.focus();
        }
      };
    }, [isOpen, initialFocusRef, finalFocusRef]);

    // Confinamento de navegação Tab (Focus Trap)
    const handleKeyDownTrap = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!trapFocus || event.key !== 'Tab' || !internalContainerRef.current) return;

        const focusableElements = internalContainerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      },
      [trapFocus]
    );

    // ========================================================================
    // Tratamento Seguro de Clique no Overlay (Previne falso positivo em seleção)
    // ========================================================================
    const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      mouseDownTargetRef.current = e.target;
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        closeOnOverlayClick &&
        e.target === e.currentTarget &&
        mouseDownTargetRef.current === e.currentTarget
      ) {
        onClose();
      }
    };

    if (!isOpen) {
      return null;
    }

    const contextValue: ModalContextValue = {
      onClose,
      theme,
      size,
      // Um `aria-labelledby` explícito continua sendo o id que o título adota
      // quando não tem o seu — era assim antes da ligação automática, e há
      // quem componha `<Modal aria-labelledby="x"><ModalTitle>` contando com isso.
      titleId: ariaLabelledBy || autoTitleId,
      descriptionId: ariaDescribedBy || autoDescId,
      showCloseButton,
      registerTitle,
      registerDescription,
    };

    const overlayClasses = [
      'unooria-modal-overlay',
      `unooria-modal-overlay--${theme}`,
      overlayClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      'unooria-modal__container',
      `unooria-modal__container--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasShorthand = Boolean(
      title || descText || footer || primaryAction || secondaryAction
    );

    const modalContent = (
      <ModalContext.Provider value={contextValue}>
        <div
          className={overlayClasses}
          style={overlayStyle}
          onMouseDown={handleOverlayMouseDown}
          onClick={handleOverlayClick}
          data-theme={theme}
        >
          <div
            ref={(node) => {
              internalContainerRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
              }
            }}
            role={role}
            aria-modal="true"
            aria-labelledby={computedTitleId}
            aria-describedby={computedDescId}
            aria-label={ariaLabel}
            tabIndex={-1}
            data-testid={testId}
            className={containerClasses}
            style={style}
            onKeyDown={handleKeyDownTrap}
            {...restProps}
          >
            {hasShorthand ? (
              <>
                {(title || descText || showCloseButton) && (
                  <ModalHeader
                    title={title}
                    description={descText}
                    showCloseButton={showCloseButton}
                    onClose={onClose}
                  />
                )}

                {children && <ModalBody>{children}</ModalBody>}

                {(footer || primaryAction || secondaryAction) && (
                  <ModalFooter
                    align={footerAlign}
                    primaryAction={primaryAction}
                    secondaryAction={secondaryAction}
                  >
                    {footer}
                  </ModalFooter>
                )}
              </>
            ) : (
              children
            )}
          </div>
        </div>
      </ModalContext.Provider>
    );

    // SSR Safe Portal Rendering
    if (!isHydrated) {
      return null;
    }

    const targetPortal = portalContainer || document.body;
    return createPortal(modalContent, targetPortal);
  }
) as ModalComponent;

Modal.displayName = 'Modal';
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseButton = ModalCloseButton;
