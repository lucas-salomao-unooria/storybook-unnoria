'use client';

import React, { forwardRef } from 'react';
import { SectionHeaderProps } from './SectionHeader.types';
import { SearchInput } from '../TextField/SearchInput';
import { Icon } from '../Icon/Icon';
import './SectionHeader.css';

/**
 * Componente oficial SectionHeader (Cabeçalho de Seção e Página) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 22677:2549 / Component Set 24591:12975)
 */
export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      description,
      showBack = false,
      onBack,
      badge,
      showSearch = false,
      searchValue,
      defaultSearchValue,
      onSearchChange,
      onSearchSubmit,
      searchPlaceholder = 'Pesquisar...',
      showFilter = false,
      onFilterClick,
      filterActive = false,
      actions,
      divider = false,
      variant = 'default',
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const dividerClass = divider ? 'unooria-section-header--divider' : '';
    const variantClass = `unooria-section-header--variant-${variant}`;
    const themeClass = theme === 'dark' ? 'unooria-section-header--theme-dark' : '';

    const containerClassName = [
      'unooria-section-header',
      dividerClass,
      variantClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasRightControls = showSearch || showFilter || actions;

    return (
      <header ref={ref} className={containerClassName} style={style} {...rest}>
        {/* Lado Esquerdo (Navegação & Título) */}
        <div className="unooria-section-header__left">
          <div className="unooria-section-header__title-row">
            {showBack && (
              <button
                type="button"
                aria-label="Voltar para a página anterior"
                onClick={onBack}
                className="unooria-section-header__back-btn"
              >
                <Icon name="arrow_back" size="s" color="currentColor" />
              </button>
            )}

            <h2 className="unooria-section-header__title">{title}</h2>

            {badge && <span className="unooria-section-header__badge">{badge}</span>}
          </div>

          {description && (
            <p className="unooria-section-header__description">{description}</p>
          )}
        </div>

        {/* Lado Direito (Ações e Controles) */}
        {hasRightControls && (
          <div className="unooria-section-header__right">
            {showSearch && (
              <div className="unooria-section-header__search-wrapper">
                <SearchInput
                  size="sm"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  defaultValue={defaultSearchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  onSearch={onSearchSubmit}
                  theme={theme}
                />
              </div>
            )}

            {showFilter && (
              <button
                type="button"
                aria-label="Filtrar dados da seção"
                onClick={onFilterClick}
                className={`unooria-section-header__filter-btn ${
                  filterActive ? 'unooria-section-header__filter-btn--active' : ''
                }`}
              >
                <Icon name="filter_alt" size="xs" color="#FFFFFF" />
              </button>
            )}

            {actions && <div className="unooria-section-header__actions">{actions}</div>}
          </div>
        )}
      </header>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
