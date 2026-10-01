'use client';

import React from 'react';
import type { UjnReadingProgressProps } from './ReadingProgress.types';
import './ReadingProgress.css';

/**
 * Limita o progresso ao intervalo de 0 a 100.
 */
const clamp = (progress: number): number => {
  if (!Number.isFinite(progress)) return 0;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Progresso de rolagem de um elemento, de 0 a 100. Sem rolagem possível (o
 * conteúdo cabe inteiro), o progresso é 0.
 */
const readScrollProgress = (element: HTMLElement): number => {
  const scrollable = element.scrollHeight - element.clientHeight;
  if (scrollable <= 0) return 0;
  return clamp((element.scrollTop / scrollable) * 100);
};

/**
 * Componente ReadingProgress — Design System Unoojornal
 *
 * Faixa de `--ujn-progress-height` (4px) que mostra quanto da matéria já foi
 * lido: trilha em `--ujn-color-border-subtle` e preenchimento em
 * `--ujn-color-action-primary`. É um `role="progressbar"` com `aria-valuemin`,
 * `aria-valuemax`, `aria-valuenow` e `aria-valuetext` em porcentagem.
 *
 * - **`value`**: o produto informa o progresso (0–100).
 * - **`targetRef`**: o componente lê a rolagem do elemento, com ouvinte passivo
 *   removido ao desmontar, e acompanha mudanças de tamanho.
 *
 * Em `prefers-reduced-motion` a largura muda sem transição. Marcado como Client
 * Component porque usa estado e efeito para ler a rolagem.
 */
export const ReadingProgress = React.forwardRef<HTMLDivElement, UjnReadingProgressProps>(
  (
    {
      value,
      targetRef,
      label = 'Progresso de leitura',
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const [scrolled, setScrolled] = React.useState(0);
    const isValueMode = value !== undefined;

    React.useEffect(() => {
      if (isValueMode) return undefined;
      const element = targetRef?.current;
      if (!element) return undefined;

      const update = () => setScrolled(readScrollProgress(element));
      update();

      element.addEventListener('scroll', update, { passive: true });
      const observer =
        typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : undefined;
      observer?.observe(element);

      return () => {
        element.removeEventListener('scroll', update);
        observer?.disconnect();
      };
    }, [isValueMode, targetRef]);

    const progress = clamp(isValueMode ? (value as number) : scrolled);
    const rounded = Math.round(progress);

    const classes = ['ujn-reading-progress', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        data-ujn-theme={theme}
        className={classes}
        style={style}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={`${rounded}%`}
        {...restProps}
      >
        <span className="ujn-reading-progress__fill" style={{ width: `${progress}%` }} />
      </div>
    );
  }
);

ReadingProgress.displayName = 'ReadingProgress';
