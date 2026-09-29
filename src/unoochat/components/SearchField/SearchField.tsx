'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UncSearchFieldProps } from './SearchField.types';
import './SearchField.css';

/**
 * Componente SearchField — Design System Unoochat
 *
 * Barra de busca que substitui a barra superior. Os controles de navegação
 * entre resultados reaproveitam o glifo `callOut` girado: as setas de cima e
 * de baixo são a mesma seta em rotações opostas.
 */
export const SearchField = React.forwardRef<HTMLDivElement, UncSearchFieldProps>(
  (
    {
      value,
      placeholder = 'Buscar...',
      onChange,
      onBack,
      showNavigation = false,
      onPrevious,
      onNext,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <div
      ref={ref}
      role="search"
      className={['unc-searchfield', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <button
        type="button"
        className="unc-searchfield__button"
        onClick={onBack}
        aria-label="Cancelar busca"
      >
        <Icon name="back" size={24} tone="back" />
      </button>

      <input
        className="unc-searchfield__input"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        aria-label="Buscar"
      />

      {showNavigation && (
        <div className="unc-searchfield__navigation">
          <button
            type="button"
            className="unc-searchfield__button unc-searchfield__button--nav"
            onClick={onPrevious}
            aria-label="Resultado anterior"
          >
            <Icon name="callIn" size={20} tone="appbar" />
          </button>
          <button
            type="button"
            className="unc-searchfield__button unc-searchfield__button--nav"
            onClick={onNext}
            aria-label="Próximo resultado"
          >
            <Icon name="callOut" size={20} tone="appbar" />
          </button>
        </div>
      )}
    </div>
  )
);

SearchField.displayName = 'SearchField';
