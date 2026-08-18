import React, { useState, useRef, useEffect } from 'react';
import { TableDropdownMenuProps } from './Table.types';
import { Icon } from '../Icon/Icon';
import './Table.css';

/**
 * Menu de Ações Contextuais da Linha da Tabela (Dropdown de 3 pontos)
 * Plataforma Unooria - Extraído do Figma (Node 19493:47348)
 */
export const TableDropdownMenu: React.FC<TableDropdownMenuProps> = ({
  actions,
  theme = 'light',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="unooria-table-dropdown">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Mais opções"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="unooria-table-dropdown__trigger"
      >
        <Icon name="more_vert" size="s" color="currentColor" />
      </button>

      {isOpen && (
        <div className="unooria-table-dropdown__menu" role="menu">
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              role="menuitem"
              disabled={action.disabled}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                action.onClick?.();
              }}
              className={`unooria-table-dropdown__item ${
                action.danger ? 'unooria-table-dropdown__item--danger' : ''
              }`}
            >
              {action.icon && <Icon name={action.icon} size="xs" color="currentColor" />}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableDropdownMenu;
