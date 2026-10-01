import React from 'react';
import type { UjnRuleProps } from './Rule.types';
import './Rule.css';

/**
 * Componente Rule — Design System Unoojornal
 *
 * O fio do jornal: fino para separar itens, grosso para fechar uma seção e
 * duplo para o cabeçalho da publicação. Por padrão é decorativo; com
 * `decorative={false}` é um separador anunciado (`role="separator"`).
 *
 * Server Component: só recebe props e renderiza.
 */
export const Rule = React.forwardRef<HTMLDivElement, UjnRuleProps>(
  (
    {
      variant = 'thin',
      orientation = 'horizontal',
      decorative = true,
      tone = 'subtle',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'ujn-rule',
      `ujn-rule--${variant}`,
      `ujn-rule--${orientation}`,
      variant === 'thin' && tone === 'ink' ? 'ujn-rule--ink' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const semantics = decorative
      ? { 'aria-hidden': true as const }
      : { role: 'separator', 'aria-orientation': orientation };

    return <div ref={ref} data-ujn-theme={theme} className={classes} {...semantics} {...restProps} />;
  }
);

Rule.displayName = 'Rule';
