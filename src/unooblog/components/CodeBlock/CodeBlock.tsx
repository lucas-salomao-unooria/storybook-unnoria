'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UblCodeBlockProps } from './CodeBlock.types';
import './CodeBlock.css';

/**
 * Tempo, em milissegundos, que a confirmação "Copiado" fica no botão.
 */
const FEEDBACK_MS = 2000;

/**
 * Separa o código em linhas, ignorando a quebra final.
 */
const splitLines = (code: string): string[] => {
  const lines = code.replace(/\r\n?/g, '\n').split('\n');
  if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
  return lines;
};

/**
 * Componente CodeBlock — Design System Unooblog
 *
 * Bloco de código do post, sobre a superfície INVARIANTE `--ubl-color-code-*`
 * (escura nos dois temas). Barra superior com o nome do arquivo ou a linguagem
 * à esquerda e o botão de copiar à direita; corpo `<pre><code>` rolável, que
 * recebe foco por teclado (`role="region"`, `tabIndex={0}`, nome acessível) para
 * que linhas longas possam ser roladas com as setas. Numeração de linhas
 * opcional (não selecionável) e linhas destacadas com faixa de fundo e barra
 * lateral. A cópia usa `navigator.clipboard` em `try/catch` e a confirmação é
 * anunciada numa região `aria-live`. Sem realce de sintaxe, de propósito.
 *
 * Client Component: guarda o estado de "copiado" e usa a área de transferência.
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, UblCodeBlockProps>(
  (
    {
      code,
      language,
      filename,
      showLineNumbers = false,
      highlightLines,
      copyLabel = 'Copiar código',
      copiedLabel = 'Copiado',
      copyFailedLabel = 'Não foi possível copiar',
      onCopy,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [status, setStatus] = React.useState<'idle' | 'copied' | 'failed'>('idle');
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      []
    );

    const lines = React.useMemo(() => splitLines(code), [code]);
    const highlighted = React.useMemo(() => new Set(highlightLines ?? []), [highlightLines]);
    const highlightedList = React.useMemo(
      () => Array.from(highlighted).filter((n) => n >= 1 && n <= lines.length).sort((a, b) => a - b),
      [highlighted, lines.length]
    );

    const handleCopy = async () => {
      let next: 'copied' | 'failed' = 'failed';
      try {
        await navigator.clipboard.writeText(code);
        next = 'copied';
      } catch {
        next = 'failed';
      }
      if (next === 'copied') onCopy?.(code);
      setStatus(next);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus('idle'), FEEDBACK_MS);
    };

    const barLabel = filename ?? language;
    const regionLabel = [
      filename ? `Código do arquivo ${filename}` : language ? `Código em ${language}` : 'Código',
      highlightedList.length > 0
        ? `linhas destacadas: ${highlightedList.join(', ')}`
        : null,
    ]
      .filter(Boolean)
      .join(', ');

    const announcement =
      status === 'copied' ? copiedLabel : status === 'failed' ? copyFailedLabel : '';

    const classes = [
      'ubl-code-block',
      showLineNumbers ? 'ubl-code-block--numbered' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        <div className="ubl-code-block__bar">
          <span className="ubl-code-block__label">
            <Icon name="code" size="xs" tone="inherit" />
            {barLabel && <span className="ubl-code-block__name">{barLabel}</span>}
            {filename && language && <span className="ubl-code-block__language">{language}</span>}
          </span>
          <button
            type="button"
            className={`ubl-code-block__copy${status === 'copied' ? ' ubl-code-block__copy--done' : ''}`}
            aria-label={copyLabel}
            onClick={handleCopy}
          >
            <Icon name={status === 'copied' ? 'check' : 'copy'} size="sm" tone="inherit" />
            <span className="ubl-code-block__copy-text" aria-hidden="true">
              {status === 'copied' ? copiedLabel : status === 'failed' ? copyFailedLabel : copyLabel}
            </span>
          </button>
        </div>

        <div className="ubl-code-block__scroll" role="region" aria-label={regionLabel} tabIndex={0}>
          <pre className="ubl-code-block__pre">
            <code className="ubl-code-block__code" data-language={language}>
              {lines.map((line, index) => {
                const number = index + 1;
                const isHighlighted = highlighted.has(number);
                return (
                  <span
                    key={number}
                    className={`ubl-code-block__line${isHighlighted ? ' ubl-code-block__line--highlighted' : ''}`}
                    data-highlighted={isHighlighted ? 'true' : undefined}
                  >
                    {showLineNumbers && (
                      <span className="ubl-code-block__number" aria-hidden="true">
                        {number}
                      </span>
                    )}
                    <span className="ubl-code-block__text">{line}</span>
                  </span>
                );
              })}
            </code>
          </pre>
        </div>

        <span className="ubl-code-block__live" role="status" aria-live="polite">
          {announcement}
        </span>
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';
