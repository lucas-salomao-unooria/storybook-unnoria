import React from 'react';
import type { UaiPlanTagProps } from './PlanTag.types';
import './PlanTag.css';

/**
 * Componente PlanTag — Design System UnooriaAI
 *
 * Cápsula que acompanha o logotipo e anuncia o plano da conta: padding 2/4,
 * raio 4 e rótulo Open Sans Regular de 12/18 em `brandpurple-950` sobre
 * `brandpurple-400`.
 *
 * A superfície e o rótulo vêm de `--uai-color-plan-tag-fill` e
 * `--uai-color-plan-tag-text`, definidos em cada `[data-uai-theme]` (texto
 * ≥ 4,5:1 e limite ≥ 3:1 sobre a tela, nos dois temas).
 */
export const PlanTag = React.forwardRef<HTMLSpanElement, UaiPlanTagProps>(
  ({ theme, children = 'Pro', className = '', ...restProps }, ref) => (
    <span
      ref={ref}
      data-uai-theme={theme}
      className={['uai-plan-tag', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </span>
  )
);

PlanTag.displayName = 'PlanTag';
