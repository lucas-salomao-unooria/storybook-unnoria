import React, { useState } from 'react';
import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import '../../tokens/elevation.css';
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
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
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
 * acessibilidade (WCAG), suporte a Light/Dark Mode, ícones, polimorfismo (`as`) e colapso de itens.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items = [],
      separator = <DefaultSeparator />,
      theme = 'light',
      ariaLabel = 'Breadcrumb',
      size = 's',
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    if (!items || items.length === 0) {
      return null;
    }

    const beforeCount = Math.max(1, itemsBeforeCollapse ?? 1);
    const afterCount = Math.max(1, itemsAfterCollapse ?? 1);
    const shouldCollapse =
      Boolean(maxItems && maxItems > 0 && items.length > maxItems && !isExpanded);
    const canCollapse = shouldCollapse && beforeCount + afterCount < items.length;

    let visibleBefore: { item: BreadcrumbItem; originalIndex: number }[] = [];
    let visibleAfter: { item: BreadcrumbItem; originalIndex: number }[] = [];

    if (canCollapse) {
      visibleBefore = items.slice(0, beforeCount).map((item, idx) => ({
        item,
        originalIndex: idx,
      }));
      visibleAfter = items.slice(items.length - afterCount).map((item, idx) => ({
        item,
        originalIndex: items.length - afterCount + idx,
      }));
    } else {
      visibleBefore = items.map((item, index) => ({ item, originalIndex: index }));
    }

    const renderItemContent = (item: BreadcrumbItem, originalIndex: number) => {
      const {
        label,
        href,
        icon,
        isCurrent: itemIsCurrent,
        onClick,
        as: ComponentAs,
        className: itemClassName = '',
        style: itemStyle,
        ariaLabel: itemAriaLabel,
        ...itemRestProps
      } = item;

      const isCurrent = itemIsCurrent ?? (originalIndex === items.length - 1);
      const linkClasses = `unooria-breadcrumb__link unooria-breadcrumb-link ${
        isCurrent ? 'unooria-breadcrumb__link--current unooria-breadcrumb-link--current' : ''
      } ${itemClassName}`.trim();

      const innerContent = (
        <>
          {icon && (
            <span className="unooria-breadcrumb__icon unooria-breadcrumb-icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{label}</span>
        </>
      );

      if (ComponentAs) {
        const Component = ComponentAs;
        return (
          <Component
            href={href}
            onClick={onClick}
            aria-label={itemAriaLabel}
            aria-current={isCurrent ? 'page' : undefined}
            className={linkClasses}
            style={itemStyle}
            {...itemRestProps}
          >
            {innerContent}
          </Component>
        );
      }

      if (isCurrent) {
        return (
          <span
            aria-current="page"
            aria-label={itemAriaLabel}
            className={linkClasses}
            style={itemStyle}
            {...itemRestProps}
          >
            {innerContent}
          </span>
        );
      }

      if (href) {
        return (
          <a
            href={href}
            onClick={onClick}
            aria-label={itemAriaLabel}
            className={linkClasses}
            style={itemStyle}
            {...itemRestProps}
          >
            {innerContent}
          </a>
        );
      }

      if (onClick) {
        return (
          <button
            type="button"
            onClick={onClick}
            aria-label={itemAriaLabel}
            className={linkClasses}
            style={itemStyle}
            {...itemRestProps}
          >
            {innerContent}
          </button>
        );
      }

      return (
        <span
          aria-label={itemAriaLabel}
          className={linkClasses}
          style={itemStyle}
          {...itemRestProps}
        >
          {innerContent}
        </span>
      );
    };

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel || 'Breadcrumb'}
        className={`unooria-breadcrumb unooria-breadcrumb--${theme} unooria-breadcrumb--size-${size} ${className}`.trim()}
        style={style}
        {...restProps}
      >
        <ol className="unooria-breadcrumb__list unooria-breadcrumb-list">
          {canCollapse ? (
            <>
              {/* Itens antes do colapso */}
              {visibleBefore.map(({ item, originalIndex }) => (
                <React.Fragment key={originalIndex}>
                  <li className="unooria-breadcrumb__item unooria-breadcrumb-item">
                    {renderItemContent(item, originalIndex)}
                  </li>
                  <li className="unooria-breadcrumb__separator unooria-breadcrumb-separator" aria-hidden="true">
                    {separator}
                  </li>
                </React.Fragment>
              ))}

              {/* Botão de expansão do colapso */}
              <li className="unooria-breadcrumb__item unooria-breadcrumb-item">
                <button
                  type="button"
                  className="unooria-breadcrumb__ellipsis-btn unooria-breadcrumb-ellipsis-btn"
                  onClick={() => setIsExpanded(true)}
                  aria-label="Mostrar mais níveis de navegação"
                  title="Expandir caminho"
                >
                  ...
                </button>
              </li>

              {/* Separador pós-botão de expansão */}
              <li className="unooria-breadcrumb__separator unooria-breadcrumb-separator" aria-hidden="true">
                {separator}
              </li>

              {/* Itens após o colapso */}
              {visibleAfter.map(({ item, originalIndex }, idx) => {
                const isLast = idx === visibleAfter.length - 1;
                return (
                  <React.Fragment key={originalIndex}>
                    <li className="unooria-breadcrumb__item unooria-breadcrumb-item">
                      {renderItemContent(item, originalIndex)}
                    </li>
                    {!isLast && (
                      <li className="unooria-breadcrumb__separator unooria-breadcrumb-separator" aria-hidden="true">
                        {separator}
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            /* Renderização padrão sem colapso ativo */
            visibleBefore.map(({ item, originalIndex }, idx) => {
              const isLast = idx === visibleBefore.length - 1;
              return (
                <React.Fragment key={originalIndex}>
                  <li className="unooria-breadcrumb__item unooria-breadcrumb-item">
                    {renderItemContent(item, originalIndex)}
                  </li>
                  {!isLast && (
                    <li className="unooria-breadcrumb__separator unooria-breadcrumb-separator" aria-hidden="true">
                      {separator}
                    </li>
                  )}
                </React.Fragment>
              );
            })
          )}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
