import React from 'react';
import type { InstaInlineHintProps } from './InlineHint.types';
import './InlineHint.css';

/**
 * Componente InlineHint — Design System Instanooria
 *
 * A faixa de dica sob a barra superior, como no app real: texto de uma ou duas
 * linhas numa superfície secundária, com o fio de 0,33px da barra. Orienta
 * (`neutral`) ou avisa de um atrito (`friction`) sem cobrir a tela e sem pedir
 * toque. Extensão sem quadro no arquivo de origem: a medida vem das barras
 * (calha de 15px, fio `--insta-elevation-hairline-bottom`).
 *
 * O texto é sempre o PRIMÁRIO: o secundário do app (#8E8E93 sobre branco) não
 * passa o contraste AA de 4,5:1 em corpo de 13px.
 */
export const InlineHint = React.forwardRef<HTMLDivElement, InstaInlineHintProps>(
  (
    { children, tone = 'neutral', announce = false, theme = 'light', className = '', ...restProps },
    ref
  ) => {
    const classes = ['insta-inline-hint', `insta-inline-hint--${tone}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        data-insta-theme={theme}
        className={classes}
        {...(announce ? { role: 'status', 'aria-live': 'polite' as const } : {})}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

InlineHint.displayName = 'InlineHint';
