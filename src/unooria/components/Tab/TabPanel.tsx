'use client';

import React, { forwardRef, useContext } from 'react';
import { TabPanelProps } from './Tab.types';
import { TabsContext } from './Tab';
import './Tab.css';

/**
 * Subcomponente TabPanel (Painel de Conteúdo de cada Aba)
 * Plataforma Unooria - Extraído do Figma (Node 12694:10183)
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, children, className = '', style, ...rest }, ref) => {
    const context = useContext(TabsContext);

    const isSelected = context ? context.activeValue === value : false;

    if (!isSelected) {
      return null;
    }

    const combinedClassName = ['unooria-tab-panel', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className={combinedClassName}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

export default TabPanel;
