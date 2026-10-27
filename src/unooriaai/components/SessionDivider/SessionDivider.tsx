import React from 'react';
import type { UaiSessionDividerProps } from './SessionDivider.types';
import './SessionDivider.css';

/**
 * Componente SessionDivider — Design System UnooriaAI
 *
 * Separador de sessão no fluxo da conversa: dois fios de 1px na escada
 * translúcida `--uai-fill-10` (o mesmo traço do `Divider`) com o texto no meio,
 * em `caption` e `--uai-text-secondary`. O texto quebra linha e continua
 * centrado; os fios encolhem, mas não somem.
 *
 * O texto é TEXTO, e não o nome de um `role="separator"`: os filhos de um
 * separador são apresentacionais, e há leitores de tela que pulam separadores
 * no modo de leitura — e aqui o texto é conteúdo (quem, qual sessão, quando).
 * Os fios são decorativos (`aria-hidden`).
 *
 * Server Component: só recebe props e desenha.
 */
export const SessionDivider = React.forwardRef<HTMLDivElement, UaiSessionDividerProps>(
  ({ label, theme, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      data-uai-theme={theme}
      className={['uai-session-divider', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <span className="uai-session-divider__line" aria-hidden="true" />
      <p className="uai-session-divider__label">{label}</p>
      <span className="uai-session-divider__line" aria-hidden="true" />
    </div>
  )
);

SessionDivider.displayName = 'SessionDivider';
