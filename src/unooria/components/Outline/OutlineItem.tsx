import React, { forwardRef, useState, useEffect, useRef } from 'react';
import {
  OutlineItemProps,
  OutlineActionType,
  OutlineActionItem,
} from './Outline.types';
import { Icon } from '../Icon/Icon';
import './Outline.css';

/**
 * Ações padrão oficiais extraídas do Figma (Node 24199:85 / 24199:513)
 */
const DEFAULT_ACTIONS: OutlineActionItem[] = [
  {
    type: 'move',
    label: 'Mover item',
    icon: 'swap_vert',
    tooltip: 'Mover item',
  },
  {
    type: 'add-subitem',
    label: 'Adicionar sub-item',
    icon: 'switch_access_shortcut_add',
    tooltip: 'Adicionar sub-item',
  },
  {
    type: 'indent',
    label: 'Descer na hierarquia',
    icon: 'subdirectory_arrow_right',
    tooltip: 'Descer na hierarquia',
  },
  {
    type: 'outdent',
    label: 'Subir na hierarquia',
    icon: 'subdirectory_arrow_left',
    tooltip: 'Subir na hierarquia',
  },
  {
    type: 'delete',
    label: 'Excluir item',
    icon: 'delete',
    tooltip: 'Excluir item',
  },
];

/**
 * Componente individual de item de tópicos hierárquicos do Outline.
 * Plataforma Unooria (Figma Node: 24199:85)
 */
export const OutlineItem = forwardRef<HTMLDivElement, OutlineItemProps>(
  (
    {
      id,
      number,
      title,
      level = 1,
      maxLevel = 5,
      isSelected = false,
      editable = false,
      collapsible = false,
      isExpanded = true,
      disabled = false,
      readOnly = false,
      theme = 'light',
      prefix,
      suffix,
      actions,
      renderActions,
      onItemClick,
      onTitleChange,
      onToggleExpand,
      onActionClick,
      onMove,
      onAddSubItem,
      onIndent,
      onOutdent,
      onDelete,
      className = '',
      style,
      children,
      ...rest
    },
    ref
  ) => {
    // Estado para edição inline do título
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(
      typeof title === 'string' ? title : ''
    );
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (typeof title === 'string') {
        setEditValue(title);
      }
    }, [title]);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isEditing]);

    // Cálculo do recuo à esquerda baseado no nível: (N - 1) * 16px
    const normalizedLevel = Math.max(1, level);
    const indentationPx = (normalizedLevel - 1) * 16;

    // Lista de ações a serem exibidas
    const actionsToRender = actions || DEFAULT_ACTIONS;

    const handleItemClick = (e: React.MouseEvent) => {
      if (disabled || isEditing) return;
      onItemClick?.(id, e);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
      if (disabled || !editable) return;
      e.stopPropagation();
      setIsEditing(true);
    };

    const handleSaveTitle = () => {
      setIsEditing(false);
      const trimmed = editValue.trim();
      if (trimmed && trimmed !== title) {
        onTitleChange?.(id, trimmed);
      } else if (typeof title === 'string') {
        setEditValue(title);
      }
    };

    const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSaveTitle();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsEditing(false);
        if (typeof title === 'string') {
          setEditValue(title);
        }
      }
    };

    const handleActionClick = (
      actionType: OutlineActionType,
      e: React.MouseEvent
    ) => {
      e.stopPropagation();
      if (disabled) return;

      onActionClick?.(actionType, id, e);

      switch (actionType) {
        case 'move':
          onMove?.(id, e);
          break;
        case 'add-subitem':
          onAddSubItem?.(id, e);
          break;
        case 'indent':
          onIndent?.(id, e);
          break;
        case 'outdent':
          onOutdent?.(id, e);
          break;
        case 'delete':
          onDelete?.(id, e);
          break;
      }
    };

    const handleToggleExpand = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      onToggleExpand?.(id, !isExpanded);
    };

    const isThemeDark = theme === 'dark';

    return (
      <div
        ref={ref}
        role="treeitem"
        aria-selected={isSelected}
        aria-level={normalizedLevel}
        aria-expanded={collapsible ? isExpanded : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleItemClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={(e) => {
          if (disabled) return;
          if (isEditing) return;

          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onItemClick?.(id, e as unknown as React.MouseEvent);
          } else if (e.key === 'F2' && editable) {
            e.preventDefault();
            setIsEditing(true);
          } else if (e.key === 'ArrowRight' && onIndent && normalizedLevel < maxLevel) {
            e.preventDefault();
            onIndent(id, e as unknown as React.MouseEvent);
          } else if (e.key === 'ArrowLeft' && onOutdent && normalizedLevel > 1) {
            e.preventDefault();
            onOutdent(id, e as unknown as React.MouseEvent);
          } else if (e.key === 'Delete' && onDelete) {
            e.preventDefault();
            onDelete(id, e as unknown as React.MouseEvent);
          }
        }}
        className={`unooria-outline-item ${isSelected ? 'unooria-outline-item--selected' : ''} ${
          disabled ? 'unooria-outline-item--disabled' : ''
        } ${isThemeDark ? 'unooria-outline-item--theme-dark' : ''} ${className}`.trim()}
        style={{
          paddingLeft: `${8 + indentationPx}px`,
          ...style,
        }}
        {...rest}
      >
        {/* Conteúdo: Expand Button + Prefix + Número + Título/Input + Suffix */}
        <div className="unooria-outline-item__content">
          {/* Botão de Expandir / Recolher se collapsible */}
          {collapsible && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleToggleExpand}
              className={`unooria-outline-item__collapse-btn ${
                !isExpanded ? 'unooria-outline-item__collapse-btn--collapsed' : ''
              }`}
              aria-label={isExpanded ? 'Recolher subtópicos' : 'Expandir subtópicos'}
            >
              <Icon name="keyboard_arrow_down" size="xs" color="currentColor" />
            </button>
          )}

          {/* Slot de Prefixo */}
          {prefix && <span className="unooria-outline-item__prefix">{prefix}</span>}

          {/* Número hierárquico */}
          {number && <span className="unooria-outline-item__number">{number}</span>}

          {/* Título ou Input Inline */}
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={handleKeyDownInput}
              onClick={(e) => e.stopPropagation()}
              className="unooria-outline-item__title-input"
            />
          ) : (
            <span className="unooria-outline-item__title" title={typeof title === 'string' ? title : undefined}>
              {title}
            </span>
          )}

          {/* Slot de Sufixo */}
          {suffix && <span className="unooria-outline-item__suffix">{suffix}</span>}

          {children}
        </div>

        {/* Grupo de Ações Contextuais */}
        {!readOnly && (
          <div
            className="unooria-outline-item__actions"
            onClick={(e) => e.stopPropagation()}
            aria-label="Ações do item"
          >
            {renderActions ? (
              renderActions({
                id,
                number,
                title,
                level: normalizedLevel,
                isSelected,
                disabled,
                readOnly,
                theme,
              })
            ) : (
              actionsToRender.map((action) => {
                // Regra do Figma: "Subir na hierarquia" (outdent) fica oculto no Nível 1 pois já é topo
                if (action.type === 'outdent' && normalizedLevel <= 1) {
                  return null;
                }

                // Regra: "Descer na hierarquia" desativa se atingir maxLevel
                const isIndentDisabled = action.type === 'indent' && normalizedLevel >= maxLevel;
                const isDelete = action.type === 'delete';

                return (
                  <button
                    key={action.type}
                    type="button"
                    title={action.tooltip}
                    disabled={action.disabled || disabled || isIndentDisabled}
                    onClick={(e) => handleActionClick(action.type, e)}
                    className={`unooria-outline-item__action-btn ${
                      isDelete ? 'unooria-outline-item__action-btn--delete' : ''
                    }`}
                    aria-label={action.label}
                  >
                    <Icon
                      name={action.icon}
                      size="s"
                      weight={300}
                      color="currentColor"
                    />
                    <span className="unooria-outline-item__tooltip">
                      {action.tooltip}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }
);

OutlineItem.displayName = 'OutlineItem';

export default OutlineItem;
