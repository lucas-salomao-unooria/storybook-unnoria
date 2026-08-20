import React from 'react';
import type { WaMenuProps } from './Menu.types';
import './Menu.css';

/**
 * Componente Menu — Design System WhatsApp Mobile
 *
 * Menu suspenso da barra superior. Reproduz o retângulo de 190px em
 * `--wa-color-surface-elevated` com itens de 44px de passo e texto de 19px em
 * `--wa-color-text-menu`, conforme o frame "General settings".
 */
export const Menu = React.forwardRef<HTMLDivElement, WaMenuProps>(
  (
    {
      items,
      onSelect,
      onClose,
      width = 190,
      label = 'Mais opções',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    React.useEffect(() => {
      if (!onClose) {
        return undefined;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
      <div
        ref={ref}
        role="menu"
        aria-label={label}
        className={['wa-menu', className].filter(Boolean).join(' ')}
        style={{ ['--wa-menu-width' as string]: `${width}px`, ...style } as React.CSSProperties}
        {...restProps}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className="wa-menu__item"
            disabled={item.disabled}
            onClick={() => onSelect?.(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }
);

Menu.displayName = 'Menu';
