import React from 'react';
import { Icon } from '../Icon';
import type { UnvIconName } from '../Icon';
import type { UnvInlineHintProps, UnvInlineHintTone } from './InlineHint.types';
import './InlineHint.css';

/**
 * Glifo de cada tom: o atrito não se distingue só pela cor.
 */
const ICON_BY_TONE: Record<UnvInlineHintTone, UnvIconName> = {
  neutral: 'info',
  friction: 'warning',
};

/**
 * Componente InlineHint — Design System Unoovista
 *
 * A faixa de dica sob a barra superior: um cartão macio de uma ou duas linhas,
 * com glifo à esquerda. Orienta (`neutral`) ou avisa de um atrito (`friction`)
 * sem cobrir a tela e sem pedir toque.
 *
 * O texto é sempre o PRIMÁRIO, para o contraste de 4,5:1 nos dois temas; o tom
 * de atrito se distingue por glifo, contorno e prefixo lido — nunca só por cor.
 */
export const InlineHint = React.forwardRef<HTMLDivElement, UnvInlineHintProps>(
  (
    {
      children,
      tone = 'neutral',
      announce = false,
      frictionLabel = 'Atenção:',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['unv-inline-hint', `unv-inline-hint--${tone}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        data-unv-theme={theme}
        className={classes}
        {...(announce ? { role: 'status', 'aria-live': 'polite' as const } : {})}
        {...restProps}
      >
        <Icon
          name={ICON_BY_TONE[tone]}
          size="md"
          tone={tone === 'friction' ? 'like' : 'secondary'}
        />
        <span className="unv-inline-hint__text">
          {tone === 'friction' && frictionLabel && (
            <span className="unv-inline-hint__prefix">{frictionLabel} </span>
          )}
          {children}
        </span>
      </div>
    );
  }
);

InlineHint.displayName = 'InlineHint';
