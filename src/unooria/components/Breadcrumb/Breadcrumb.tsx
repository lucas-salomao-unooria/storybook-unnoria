import React, { useState } from 'react';
import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';
import './Breadcrumb.css';

/**
 * Ícone Padrão de Separador (Chevron Right)
 */
const DefaultSeparator: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path
      d="M6 12L10 8L6 4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Componente Breadcrumb - Plataforma Unooria
 *
 * Exibe a hierarquia de navegação da página atual, garantindo total
 * acessibilidade (WCAG), suporte a Light/Dark Mode, ícones e colapso de itens.
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [],
  separator = <DefaultSeparator />,
  theme = 'light',
  ariaLabel = 'Breadcrumb',
  size = 's',
  maxItems,
  className = '',
  style,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!items || items.length === 0) {
    return null;
  }

  // Determinar quais itens devem ser exibidos caso maxItems esteja definido
  const shouldCollapse = maxItems !== undefined && maxItems > 1 && items.length > maxItems && !isExpanded;

  let visibleItems: { item: BreadcrumbItem; originalIndex: number }[] = [];
  let collapsedItemsCount = 0;

  if (shouldCollapse) {
    // Mantém o primeiro item e os últimos (maxItems - 1) itens
    const keepLastCount = Math.max(1, maxItems - 1);
    const firstItem = { item: items[0], originalIndex: 0 };
    const lastItems = items.slice(items.length - keepLastCount).map((item, idx) => ({
      item,
      originalIndex: items.length - keepLastCount + idx,
    }));

    visibleItems = [firstItem, ...lastItems];
    collapsedItemsCount = items.length - 1 - keepLastCount;
  } else {
    visibleItems = items.map((item, index) => ({ item, originalIndex: index }));
  }

  const handleExpand = () => {
    setIsExpanded(true);
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={`unooria-breadcrumb unooria-breadcrumb--${theme} unooria-breadcrumb--size-${size} ${className}`.trim()}
      style={style}
    >
      <ol className="unooria-breadcrumb__list">
        {visibleItems.map(({ item, originalIndex }, visibleIndex) => {
          const isLastVisible = visibleIndex === visibleItems.length - 1;
          const isCurrent = item.isCurrent ?? (originalIndex === items.length - 1);
          const showEllipsisAfter = shouldCollapse && visibleIndex === 0;

          return (
            <React.Fragment key={originalIndex}>
              <li className="unooria-breadcrumb__item">
                {isCurrent ? (
                  <span
                    className="unooria-breadcrumb__link unooria-breadcrumb__link--current"
                    aria-current="page"
                    aria-label={item.ariaLabel}
                  >
                    {item.icon && <span className="unooria-breadcrumb__icon">{item.icon}</span>}
                    <span>{item.label}</span>
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="unooria-breadcrumb__link"
                    onClick={item.onClick}
                    aria-label={item.ariaLabel}
                  >
                    {item.icon && <span className="unooria-breadcrumb__icon">{item.icon}</span>}
                    <span>{item.label}</span>
                  </a>
                ) : item.onClick ? (
                  <button
                    type="button"
                    className="unooria-breadcrumb__link"
                    onClick={item.onClick}
                    aria-label={item.ariaLabel}
                  >
                    {item.icon && <span className="unooria-breadcrumb__icon">{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <span className="unooria-breadcrumb__link" aria-label={item.ariaLabel}>
                    {item.icon && <span className="unooria-breadcrumb__icon">{item.icon}</span>}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>

              {/* Botão de colapso (...) entre o 1º item e os subsequentes */}
              {showEllipsisAfter && (
                <>
                  <li className="unooria-breadcrumb__separator" aria-hidden="true">
                    {separator}
                  </li>
                  <li className="unooria-breadcrumb__item">
                    <button
                      type="button"
                      className="unooria-breadcrumb__ellipsis-btn"
                      onClick={handleExpand}
                      aria-label={`Mostrar mais ${collapsedItemsCount} níveis de navegação`}
                      title="Expandir caminho"
                    >
                      ...
                    </button>
                  </li>
                </>
              )}

              {/* Separador entre os itens comuns */}
              {!isLastVisible && (
                <li className="unooria-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
