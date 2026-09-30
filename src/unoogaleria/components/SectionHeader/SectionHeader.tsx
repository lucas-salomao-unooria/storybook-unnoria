'use client';

import React from 'react';
import { Button } from '../Button';
import type { UglSectionHeaderProps } from './SectionHeader.types';
import './SectionHeader.css';

/**
 * Componente SectionHeader — Design System Unoogaleria
 *
 * Cabeçalho de um grupo: o dia na grade ("Hoje", "Ontem"), com o lugar na linha
 * de apoio, ou uma seção de página ("Meus álbuns"). A ação de texto à direita é
 * um `Button` terciário — na grade, "Selecionar" e "Desmarcar" do grupo.
 *
 * Com `sticky`, cola no topo do contêiner de rolagem sobre a barra translúcida
 * com desfoque. Marcado como Client Component porque repassa `action.onClick`
 * ao botão.
 */
export const SectionHeader = React.forwardRef<HTMLDivElement, UglSectionHeaderProps>(
  (
    {
      title,
      subtitle,
      action,
      headingLevel = 2,
      sticky = false,
      size = 'md',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const Heading = headingLevel === 3 ? 'h3' : 'h2';

    const classes = [
      'ugl-section-header',
      `ugl-section-header--${size}`,
      sticky ? 'ugl-section-header--sticky' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ugl-theme={theme} className={classes} {...restProps}>
        <div className="ugl-section-header__text">
          <Heading className="ugl-section-header__title">{title}</Heading>
          {subtitle && <p className="ugl-section-header__subtitle">{subtitle}</p>}
        </div>
        {action && (
          <Button
            variant="tertiary"
            size="md"
            className="ugl-section-header__action"
            aria-label={action.ariaLabel}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
