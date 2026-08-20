'use client';

import React, { forwardRef, useState, useRef, useId, useEffect, cloneElement } from 'react';
import { TooltipProps, TooltipPlacement } from './Tooltip.types';
import './Tooltip.css';

/**
 * Subconjunto de props que o Tooltip lê e reinjeta no elemento filho clonado.
 */
type TooltipChildProps = {
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  'aria-describedby'?: string;
};

/**
 * Renderiza o triângulo SVG oficial da seta conforme a orientação
 */
const renderArrowSvg = (placement: TooltipPlacement) => {
  if (placement.startsWith('top')) {
    // Seta apontando para baixo (Base 8px, Altura 4px)
    return (
      <svg className="unooria-tooltip__arrow-svg" width="8" height="4" viewBox="0 0 8 4">
        <polygon points="0,0 8,0 4,4" />
      </svg>
    );
  }
  if (placement.startsWith('bottom')) {
    // Seta apontando para cima (Base 8px, Altura 4px)
    return (
      <svg className="unooria-tooltip__arrow-svg" width="8" height="4" viewBox="0 0 8 4">
        <polygon points="0,4 8,4 4,0" />
      </svg>
    );
  }
  if (placement.startsWith('left')) {
    // Seta apontando para direita (Base 8px, Largura 4px)
    return (
      <svg className="unooria-tooltip__arrow-svg" width="4" height="8" viewBox="0 0 4 8">
        <polygon points="0,0 0,8 4,4" />
      </svg>
    );
  }
  if (placement.startsWith('right')) {
    // Seta apontando para esquerda (Base 8px, Largura 4px)
    return (
      <svg className="unooria-tooltip__arrow-svg" width="4" height="8" viewBox="0 0 4 8">
        <polygon points="4,0 4,8 0,4" />
      </svg>
    );
  }
  return null;
};

/**
 * Componente oficial Tooltip (Balão de Dica Contextual) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 6034:1092 / Component Set 6034:1213)
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      placement = 'top',
      showArrow = true,
      trigger = ['hover', 'focus'],
      open,
      defaultOpen = false,
      onOpenChange,
      enterDelay = 150,
      leaveDelay = 100,
      disabled = false,
      maxWidth = 240,
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    // `useId` em vez de `Math.random()`: o id alimenta `aria-describedby` e
    // precisa coincidir entre a árvore renderizada no servidor e a do cliente.
    const tooltipId = `unooria-tooltip-${useId()}`;

    const isControlled = open !== undefined;
    const isVisible = !disabled && (isControlled ? open : internalOpen);

    const triggerList = Array.isArray(trigger) ? trigger : [trigger];
    const hasHoverTrigger = triggerList.includes('hover');
    const hasFocusTrigger = triggerList.includes('focus');
    const hasClickTrigger = triggerList.includes('click');

    const handleVisibilityChange = (nextOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    };

    const showWithDelay = () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      if (enterDelay > 0) {
        enterTimeoutRef.current = setTimeout(() => {
          handleVisibilityChange(true);
        }, enterDelay);
      } else {
        handleVisibilityChange(true);
      }
    };

    const hideWithDelay = () => {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      if (leaveDelay > 0) {
        leaveTimeoutRef.current = setTimeout(() => {
          handleVisibilityChange(false);
        }, leaveDelay);
      } else {
        handleVisibilityChange(false);
      }
    };

    useEffect(() => {
      return () => {
        if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
        if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      };
    }, []);

    // Handlers para o elemento filho
    const childProps = children.props as TooltipChildProps;

    const handleMouseEnter = (e: React.MouseEvent) => {
      childProps.onMouseEnter?.(e);
      if (hasHoverTrigger) showWithDelay();
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
      childProps.onMouseLeave?.(e);
      if (hasHoverTrigger) hideWithDelay();
    };

    const handleFocus = (e: React.FocusEvent) => {
      childProps.onFocus?.(e);
      if (hasFocusTrigger) showWithDelay();
    };

    const handleBlur = (e: React.FocusEvent) => {
      childProps.onBlur?.(e);
      if (hasFocusTrigger) hideWithDelay();
    };

    const handleClick = (e: React.MouseEvent) => {
      childProps.onClick?.(e);
      if (hasClickTrigger) {
        handleVisibilityChange(!isVisible);
      }
    };

    const clonedChild = cloneElement(children as React.ReactElement<TooltipChildProps>, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onClick: handleClick,
      'aria-describedby': isVisible ? tooltipId : childProps['aria-describedby'],
    });

    const placementClass = `unooria-tooltip--placement-${placement}`;
    const openClass = isVisible ? 'unooria-tooltip--open' : '';
    const themeClass = theme === 'dark' ? 'unooria-tooltip--theme-dark' : '';

    const tooltipClassName = [
      'unooria-tooltip',
      placementClass,
      openClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span className="unooria-tooltip-wrapper">
        {clonedChild}

        {!disabled && (
          <div
            ref={ref}
            id={tooltipId}
            role="tooltip"
            aria-hidden={!isVisible}
            className={tooltipClassName}
            style={{
              maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
              ...style,
            }}
            {...rest}
          >
            <div className="unooria-tooltip__content">{content}</div>
            {showArrow && placement !== 'none' && (
              <span className="unooria-tooltip__arrow">{renderArrowSvg(placement)}</span>
            )}
          </div>
        )}
      </span>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
