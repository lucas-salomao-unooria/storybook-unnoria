import React, { forwardRef, useState, useEffect } from 'react';
import { TabsProps } from './Tab.types';
import { Tab, TabsContext } from './Tab';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';
import './Tab.css';

interface TabsComponent
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  List: typeof TabList;
  Tab: typeof Tab;
  Panel: typeof TabPanel;
}

/**
 * Componente oficial de Abas (Tab / Tabs) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 12694:10183 / Component Set 12694:10195)
 *
 * Organiza conteúdos relacionados em seções separadas, permitindo alternar entre diferentes
 * visões sem sair da mesma página.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      items,
      variant = 'line',
      size = 'md',
      fullWidth = false,
      theme = 'light',
      children,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    // Determina o valor inicial da aba ativa
    const initialValue =
      controlledValue !== undefined
        ? controlledValue
        : defaultValue !== undefined
        ? defaultValue
        : items && items.length > 0
        ? items[0].value
        : undefined;

    const [activeValue, setActiveValueState] = useState<string | number | undefined>(initialValue);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setActiveValueState(controlledValue);
      }
    }, [controlledValue]);

    const setActiveValue = (val: string | number) => {
      if (controlledValue === undefined) {
        setActiveValueState(val);
      }
      onChange?.(val);
    };

    const variantClass = `unooria-tabs--variant-${variant}`;
    const sizeClass = `unooria-tabs--size-${size}`;
    const themeClass = theme === 'dark' ? 'unooria-tabs--theme-dark' : '';

    const combinedClassName = [
      'unooria-tabs',
      variantClass,
      sizeClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const contextValue = {
      activeValue,
      setActiveValue,
      variant,
      size,
      fullWidth,
      theme,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={combinedClassName} style={style} {...rest}>
          {/* Se passou `items`, renderiza automaticamente a barra e os painéis */}
          {items && items.length > 0 ? (
            <>
              <TabList fullWidth={fullWidth}>
                {items.map((item) => (
                  <Tab
                    key={item.value}
                    value={item.value}
                    label={item.label}
                    icon={item.icon}
                    showIcon={item.showIcon}
                    badge={item.badge}
                    showBadge={item.showBadge}
                    disabled={item.disabled}
                  />
                ))}
              </TabList>

              {items.map((item) =>
                item.content ? (
                  <TabPanel key={item.value} value={item.value}>
                    {item.content}
                  </TabPanel>
                ) : null
              )}
            </>
          ) : (
            children
          )}
        </div>
      </TabsContext.Provider>
    );
  }
) as TabsComponent;

Tabs.displayName = 'Tabs';
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
