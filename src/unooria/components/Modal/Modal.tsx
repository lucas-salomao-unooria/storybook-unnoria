import React, {
  forwardRef,
  useRef,
  useEffect,
  useId,
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
  titleId: string;
  descriptionId: string;
  showCloseButton: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  return useContext(ModalContext);
};

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

    return React.createElement(
      Component,
      {
        ref: ref as any,
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

    return React.createElement(
      Component,
      {
        ref: ref as any,
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

    const internalContainerRef = useRef<HTMLDivElement | null>(null);
    const mouseDownTargetRef = useRef<EventTarget | null>(null);
    const previousActiveElementRef = useRef<HTMLElement | null>(null);

    const descText = description || subtitle;
    const computedTitleId = ariaLabelledBy || (title ? autoTitleId : undefined);
    const computedDescId = ariaDescribedBy || (descText ? autoDescId : undefined);

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
      titleId: computedTitleId || autoTitleId,
      descriptionId: computedDescId || autoDescId,
      showCloseButton,
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
    if (typeof document === 'undefined') {
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
