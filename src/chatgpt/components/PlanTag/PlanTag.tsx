import React from 'react';
import type { GptPlanTagProps } from './PlanTag.types';
import './PlanTag.css';

/**
 * Componente PlanTag — Design System ChatGPT
 *
 * Réplica da cápsula `Tag` que segue o logotipo na tela de nova conversa:
 * 32 × 20 com padding 2/4, raio 4 e rótulo Inter Regular de 12/16 em branco
 * sobre `color/purple/400`.
 *
 * É o único alvo da tela que **não** muda entre os temas: o arquivo pinta
 * `#ADADFB` nas duas versões.
 */
export const PlanTag = React.forwardRef<HTMLSpanElement, GptPlanTagProps>(
  ({ theme, children = 'Plus', className = '', ...restProps }, ref) => (
    <span
      ref={ref}
      data-gpt-theme={theme}
      className={['gpt-plan-tag', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </span>
  )
);

PlanTag.displayName = 'PlanTag';
