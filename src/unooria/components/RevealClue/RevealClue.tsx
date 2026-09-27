'use client';

import React, { forwardRef, useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import type { RevealClueProps } from './RevealClue.types';
import './RevealClue.css';

/**
 * Componente RevealClue — Plataforma Unooria
 *
 * A pista que se revela: um botão largo (o "chip grande" de 64px, alvo de
 * toque para criança) que abre e fecha um painel logo abaixo. É o padrão de
 * disclosure da WAI-ARIA: `aria-expanded` e `aria-controls` no botão, e o
 * painel como `region` nomeada pelo próprio botão.
 *
 * Design próprio — a seção não tem quadro de pista no Figma. O raio de 12px e
 * o fio de 1px são os do `Card`; o foco de 2px é o do `Button`.
 *
 * O painel fechado leva `hidden`, e não `aria-hidden`: some da árvore de
 * acessibilidade E da ordem do Tab. Os filhos continuam montados — uma imagem
 * dentro da pista não recarrega a cada toque —, só não são alcançáveis.
 */
export const RevealClue = forwardRef<HTMLDivElement, RevealClueProps>(
  (
    {
      label,
      question,
      icon,
      children,
      open,
      defaultOpen = false,
      onOpenChange,
      theme = 'light',
      className = '',
      ...rest
    },
    ref
  ) => {
    const baseId = useId();
    const botaoId = `${baseId}-botao`;
    const painelId = `${baseId}-painel`;

    const controlado = open !== undefined;
    const [abertoInterno, setAbertoInterno] = useState(defaultOpen);
    const aberto = controlado ? open : abertoInterno;

    const alternar = () => {
      const proximo = !aberto;
      if (!controlado) setAbertoInterno(proximo);
      onOpenChange?.(proximo);
    };

    const classes = [
      'unooria-reveal-clue',
      aberto ? 'unooria-reveal-clue--open' : '',
      theme === 'dark' ? 'unooria-reveal-clue--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <button
          type="button"
          id={botaoId}
          className="unooria-reveal-clue__trigger"
          aria-expanded={aberto}
          aria-controls={painelId}
          onClick={alternar}
        >
          {icon && (
            <span className="unooria-reveal-clue__icon">
              <Icon name={icon} size="s" color="currentColor" />
            </span>
          )}
          <span className="unooria-reveal-clue__text">
            <span className="unooria-reveal-clue__label">{label}</span>
            {question && <span className="unooria-reveal-clue__question">{question}</span>}
          </span>
          <Icon
            name="keyboard_arrow_down"
            size="s"
            color="currentColor"
            className="unooria-reveal-clue__chevron"
          />
        </button>

        <div
          id={painelId}
          role="region"
          aria-labelledby={botaoId}
          className="unooria-reveal-clue__panel"
          hidden={!aberto}
        >
          {children}
        </div>
      </div>
    );
  }
);

RevealClue.displayName = 'RevealClue';

export default RevealClue;
