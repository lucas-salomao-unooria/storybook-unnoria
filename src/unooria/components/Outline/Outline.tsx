import React, { forwardRef, useState } from 'react';
import {
  OutlineProps,
  OutlineItemData,
  OutlineActionType,
} from './Outline.types';
import { OutlineItem } from './OutlineItem';
import './Outline.css';

/**
 * Função utilitária para calcular a numeração automática hierárquica (ex: "1.", "1.1", "1.1.1")
 */
function computeHierarchicalNumber(
  prefix: string,
  index: number,
  level: number
): string {
  const currentNum = `${index + 1}`;
  if (!prefix) {
    return `${currentNum}.`;
  }
  return `${prefix}${currentNum}`;
}

/**
 * Renderiza recursivamente a árvore de tópicos do Outline
 */
function renderOutlineTree(
  items: OutlineItemData[],
  currentSelectedId: string | null | undefined,
  handleSelect: (id: string, item: OutlineItemData) => void,
  handleTitleChange: (id: string, newTitle: string) => void,
  handleAction: (
    actionType: OutlineActionType,
    id: string,
    item: OutlineItemData
  ) => void,
  expandedMap: Record<string, boolean>,
  toggleExpand: (id: string) => void,
  options: {
    autoNumber: boolean;
    editable: boolean;
    collapsible: boolean;
    readOnly: boolean;
    theme: 'light' | 'dark';
    maxLevel: number;
  },
  currentLevel: number = 1,
  numberPrefix: string = ''
): React.ReactNode {
  return items.map((item, index) => {
    const itemLevel = item.level !== undefined ? item.level : currentLevel;
    const isSelected =
      item.isSelected !== undefined
        ? item.isSelected
        : currentSelectedId === item.id;

    // Numeração: se autoNumber ativo e item.number ausente, calcula dinamicamente
    const computedNumber = options.autoNumber
      ? item.number ||
        computeHierarchicalNumber(numberPrefix, index, itemLevel)
      : item.number;

    const childNumberPrefix =
      options.autoNumber && computedNumber
        ? `${computedNumber.endsWith('.') ? computedNumber : `${computedNumber}.`}`
        : '';

    // Gestão de filhos e expansão
    const hasChildren =
      Array.isArray(item.children) && item.children.length > 0;
    const isExpanded =
      expandedMap[item.id] !== undefined
        ? expandedMap[item.id]
        : item.isExpanded !== undefined
        ? item.isExpanded
        : true;

    return (
      <React.Fragment key={item.id || index}>
        <OutlineItem
          id={item.id}
          number={computedNumber}
          title={item.title}
          level={itemLevel}
          maxLevel={options.maxLevel}
          isSelected={isSelected}
          editable={options.editable}
          collapsible={options.collapsible && hasChildren}
          isExpanded={isExpanded}
          disabled={item.disabled}
          readOnly={options.readOnly}
          theme={options.theme}
          prefix={item.prefix}
          suffix={item.suffix}
          onItemClick={() => handleSelect(item.id, item)}
          onTitleChange={(id, newTitle) => handleTitleChange(id, newTitle)}
          onToggleExpand={() => toggleExpand(item.id)}
          onActionClick={(actionType) =>
            handleAction(actionType, item.id, item)
          }
        />
        {hasChildren &&
          isExpanded &&
          renderOutlineTree(
            item.children!,
            currentSelectedId,
            handleSelect,
            handleTitleChange,
            handleAction,
            expandedMap,
            toggleExpand,
            options,
            itemLevel + 1,
            childNumberPrefix
          )}
      </React.Fragment>
    );
  });
}

/**
 * Componente principal Outline (Árvore de Tópicos Hierárquicos).
 * Plataforma Unooria - Extraído do Figma (Node 24199:85)
 */
export const Outline = forwardRef<HTMLDivElement, OutlineProps>(
  (
    {
      items = [],
      selectedId: controlledSelectedId,
      defaultSelectedId = null,
      autoNumber = false,
      editable = false,
      collapsible = false,
      maxLevel = 5,
      readOnly = false,
      theme = 'light',
      onSelect,
      onTitleChange,
      onAction,
      onReorder,
      onAddSubItem,
      onIndent,
      onOutdent,
      onDelete,
      onChange,
      className = '',
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
      defaultSelectedId
    );
    const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

    const isControlled = controlledSelectedId !== undefined;
    const activeSelectedId = isControlled
      ? controlledSelectedId
      : internalSelectedId;

    const handleSelect = (id: string, item: OutlineItemData) => {
      if (!isControlled) {
        setInternalSelectedId(id);
      }
      onSelect?.(id, item);
    };

    const handleTitleChange = (id: string, newTitle: string) => {
      onTitleChange?.(id, newTitle);
    };

    const toggleExpand = (id: string) => {
      setExpandedMap((prev) => ({
        ...prev,
        [id]: prev[id] !== undefined ? !prev[id] : false,
      }));
    };

    const handleAction = (
      actionType: OutlineActionType,
      id: string,
      item: OutlineItemData
    ) => {
      onAction?.(actionType, id, item);

      switch (actionType) {
        case 'move':
          onReorder?.(id, id);
          break;
        case 'add-subitem':
          onAddSubItem?.(id);
          break;
        case 'indent':
          onIndent?.(id);
          break;
        case 'outdent':
          onOutdent?.(id);
          break;
        case 'delete':
          onDelete?.(id);
          break;
      }
    };

    const isThemeDark = theme === 'dark';

    return (
      <div
        ref={ref}
        role="tree"
        aria-readonly={readOnly}
        className={`unooria-outline ${
          isThemeDark ? 'unooria-outline--theme-dark' : ''
        } ${className}`.trim()}
        style={style}
        {...rest}
      >
        {items.length > 0
          ? renderOutlineTree(
              items,
              activeSelectedId,
              handleSelect,
              handleTitleChange,
              handleAction,
              expandedMap,
              toggleExpand,
              {
                autoNumber,
                editable,
                collapsible,
                readOnly,
                theme,
                maxLevel,
              }
            )
          : children}
      </div>
    );
  }
) as React.ForwardRefExoticComponent<
  OutlineProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: typeof OutlineItem;
};

Outline.Item = OutlineItem;
Outline.displayName = 'Outline';

export default Outline;
