import React, { forwardRef, useContext } from 'react';
import { TabListProps } from './Tab.types';
import { TabsContext } from './Tab';
import './Tab.css';

/**
 * Subcomponente TabList (Container de Abas)
 * Plataforma Unooria - Extraído do Figma (Node 12694:10183)
 */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ fullWidth, children, className = '', style, ...rest }, ref) => {
    const context = useContext(TabsContext);
    const isFullWidth = fullWidth !== undefined ? fullWidth : context?.fullWidth;

    const fullWidthClass = isFullWidth ? 'unooria-tab-list--full-width' : '';

    const combinedClassName = ['unooria-tab-list', fullWidthClass, className]
      .filter(Boolean)
      .join(' ');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const tabs = Array.from(
        e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
      );
      if (tabs.length === 0) return;

      const activeIndex = tabs.findIndex((tab) => tab === document.activeElement);

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (activeIndex + 1) % tabs.length;
        tabs[nextIndex]?.focus();
        tabs[nextIndex]?.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (activeIndex - 1 + tabs.length) % tabs.length;
        tabs[prevIndex]?.focus();
        tabs[prevIndex]?.click();
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabs[0]?.focus();
        tabs[0]?.click();
      } else if (e.key === 'End') {
        e.preventDefault();
        tabs[tabs.length - 1]?.focus();
        tabs[tabs.length - 1]?.click();
      }
    };

    return (
      <div
        ref={ref}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={combinedClassName}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

export default TabList;
