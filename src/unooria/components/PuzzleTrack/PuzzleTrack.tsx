'use client';

import React, { forwardRef, useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { PUZZLE_BLOCK_DRAG_TYPE } from '../PuzzleBlock/PuzzleBlock.types';
import type { PuzzleTrackProps } from './PuzzleTrack.types';
import './PuzzleTrack.css';

/** Vaga vazia: `null`, `undefined` ou `false`. Qualquer outro nó é um bloco encaixado. */
const vagaVazia = (vaga: React.ReactNode): boolean => vaga === null || vaga === undefined || vaga === false;

/** `0` é conteúdo; `null`, `undefined`, `false` e `''` não. */
const temConteudo = (no: React.ReactNode): boolean =>
  no !== undefined && no !== null && no !== false && no !== '';

/** O arraste traz um `PuzzleBlock`? Na passagem (`dragover`), só os TIPOS são legíveis, não o dado. */
const trazBloco = (evento: React.DragEvent): boolean =>
  Array.from(evento.dataTransfer?.types ?? []).includes(PUZZLE_BLOCK_DRAG_TYPE);

const rotuloDeVagaPadrao = (indice: number): React.ReactNode => `Vaga ${indice + 1}, vazia`;

/**
 * Componente PuzzleTrack — Plataforma Unooria
 *
 * A calha da "Chave do Editor": uma fileira de vagas em forma de peça, onde os
 * `PuzzleBlock` se encaixam por toque. Cada vaga vazia é um encaixe tracejado
 * com o número da posição (ou, com `showEmptySlotLabel`, com o próprio rótulo
 * à vista); com `complete`, as vagas se juntam num bloco só, com
 * fundo de sucesso e o glifo `key`.
 *
 * A calha não tem gabarito nem estado: `slots`, `complete` e `status` vêm de
 * quem usa, porque quem sabe se a chave abre é o servidor. Isso também mantém
 * a interação inteira na mão do consumidor — a calha não precisa saber se o
 * bloco chegou por toque, por teclado ou por uma resposta da api.
 *
 * Com `onSlotActivate`, a vaga VAZIA vira botão: é o segundo tempo do toque
 * sequencial "toca o cartão, toca a vaga" (o primeiro é o `selected` do
 * `PuzzleBlock`). Sem a prop, a calha é a de antes — só desenho.
 *
 * Com `onSlotDrop`, cada vaga (vazia ou ocupada) também recebe a SOLTURA de um
 * `PuzzleBlock` arrastado com `dragData`, e a função recebe o índice e o dado.
 * É um caminho a mais; o toque segue sendo o principal.
 *
 * Três decisões de acessibilidade:
 *   - A raiz é `role="group"` nomeada pelo `label` (por `aria-labelledby`, e daí
 *     o `useId` e o `'use client'`). Entrando nela pelo Tab, o leitor de tela
 *     diz "Chave do Editor, grupo" antes do primeiro bloco.
 *   - As vagas são uma lista ordenada: "lista, 3 itens" conta quantas vagas há,
 *     e a vaga vazia diz o que é ("Vaga 1, vazia") em vez do número solto.
 *   - A região `aria-live="polite"` é renderizada SEMPRE, mesmo vazia. Região
 *     que nasce junto com o texto costuma não ser anunciada; a que já existe e
 *     muda, é. O `completeLabel` mora dentro dela, então a chave formada é
 *     anunciada sem o consumidor repetir o texto no `status`.
 */
export const PuzzleTrack = forwardRef<HTMLDivElement, PuzzleTrackProps>(
  (
    {
      label,
      slots,
      emptySlotLabel = rotuloDeVagaPadrao,
      showEmptySlotLabel = false,
      complete = false,
      completeLabel = 'Chave do Editor formada',
      status,
      onSlotActivate,
      onSlotDrop,
      slotsDisabled = false,
      theme = 'light',
      className = '',
      style,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    },
    ref
  ) => {
    const rotuloId = useId();
    // A vaga sobre a qual um bloco está passando agora, para o realce.
    const [alvo, setAlvo] = useState<number | null>(null);

    // Mesma precedência do `PuzzleBlock` e do `Modal`: o `aria-labelledby`
    // explícito manda, e um `aria-label` explícito não é calado pelo nosso.
    const nomeadoPor = ariaLabelledBy ?? (ariaLabel ? undefined : rotuloId);

    const acionavel = typeof onSlotActivate === 'function';
    const recebeSoltura = typeof onSlotDrop === 'function';

    // Os ouvintes de soltura de uma vaga. Ficam no `<li>`, e não no botão da
    // vaga vazia, para a vaga OCUPADA também receber (o bloco encaixado é do
    // consumidor). `preventDefault` no `dragover` é o que autoriza o `drop`.
    const ouvintesDeSoltura = (indice: number): React.LiHTMLAttributes<HTMLLIElement> =>
      recebeSoltura
        ? {
            onDragEnter: (evento) => {
              if (!trazBloco(evento)) return;
              evento.preventDefault();
              setAlvo(indice);
            },
            onDragOver: (evento) => {
              if (!trazBloco(evento)) return;
              evento.preventDefault();
              evento.dataTransfer.dropEffect = 'move';
              if (alvo !== indice) setAlvo(indice);
            },
            onDragLeave: (evento) => {
              // Passar de um filho para outro da mesma vaga também dispara
              // `dragleave`: só apaga quando o ponteiro sai da vaga de fato.
              const destino = evento.relatedTarget as Node | null;
              if (destino && evento.currentTarget.contains(destino)) return;
              setAlvo((atual) => (atual === indice ? null : atual));
            },
            onDrop: (evento) => {
              if (!trazBloco(evento)) return;
              evento.preventDefault();
              setAlvo(null);
              onSlotDrop?.(indice, evento.dataTransfer.getData(PUZZLE_BLOCK_DRAG_TYPE));
            },
          }
        : {};

    const classes = [
      'unooria-puzzle-track',
      complete ? 'unooria-puzzle-track--complete' : '',
      acionavel ? 'unooria-puzzle-track--actionable' : '',
      recebeSoltura ? 'unooria-puzzle-track--droppable' : '',
      theme === 'dark' ? 'unooria-puzzle-track--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // O número de vagas decide a partir de que largura elas cabem lado a lado
    // (ver `--unooria-puzzle-track-threshold` no CSS).
    const estilo = {
      ...style,
      '--unooria-puzzle-track-count': Math.max(slots.length, 1),
    } as React.CSSProperties;

    // O miolo da vaga vazia. Por padrão, o número à vista e o rótulo só para o
    // leitor de tela; com `showEmptySlotLabel`, o rótulo à vista e nada
    // escondido — o nome acessível é o mesmo texto, sem cópia.
    const miolo = (indice: number) =>
      showEmptySlotLabel ? (
        <span className="unooria-puzzle-track__socket-text">{emptySlotLabel(indice)}</span>
      ) : (
        <>
          <span className="unooria-puzzle-track__socket-number" aria-hidden="true">
            {indice + 1}
          </span>
          <span className="unooria-puzzle-track__sr-only">{emptySlotLabel(indice)}</span>
        </>
      );

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={nomeadoPor}
        className={classes}
        data-complete={complete ? 'true' : undefined}
        style={estilo}
        {...rest}
      >
        <p id={rotuloId} className="unooria-puzzle-track__label">
          {label}
        </p>

        {/* `role="list"` explícito: com `list-style: none`, o Safari tira a
            semântica de lista do `<ol>` e o "lista, 3 itens" some. */}
        <ol className="unooria-puzzle-track__slots" role="list">
          {slots.map((vaga, indice) => {
            const vazia = vagaVazia(vaga);
            const realcada = recebeSoltura && alvo === indice;
            return (
              // A posição É a identidade da vaga: a chave por índice está certa aqui.
              <li
                key={indice}
                className={[
                  'unooria-puzzle-track__slot',
                  vazia ? 'unooria-puzzle-track__slot--empty' : '',
                  realcada ? 'unooria-puzzle-track__slot--drop-target' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                data-slot-index={recebeSoltura ? indice : undefined}
                data-drop-target={realcada ? 'true' : undefined}
                {...ouvintesDeSoltura(indice)}
              >
                {vazia && acionavel ? (
                  // `aria-disabled`, e não `disabled`: a vaga à espera continua
                  // no Tab e legível, como o `locked` do `PuzzleBlock`.
                  <button
                    type="button"
                    className="unooria-puzzle-track__socket unooria-puzzle-track__socket--action"
                    aria-disabled={slotsDisabled || undefined}
                    data-slot-index={indice}
                    onClick={slotsDisabled ? undefined : () => onSlotActivate?.(indice)}
                  >
                    <span className="unooria-puzzle-track__socket-shape" aria-hidden="true" />
                    {miolo(indice)}
                  </button>
                ) : vazia ? (
                  <span className="unooria-puzzle-track__socket">
                    <span className="unooria-puzzle-track__socket-shape" aria-hidden="true" />
                    {miolo(indice)}
                  </span>
                ) : (
                  vaga
                )}
              </li>
            );
          })}
        </ol>

        <div className="unooria-puzzle-track__status" aria-live="polite" aria-atomic="true">
          {complete && (
            <span className="unooria-puzzle-track__complete">
              <Icon name="key" size="s" className="unooria-puzzle-track__complete-icon" />
              <span>{completeLabel}</span>
            </span>
          )}
          {temConteudo(status) && <span className="unooria-puzzle-track__status-text">{status}</span>}
        </div>
      </div>
    );
  }
);

PuzzleTrack.displayName = 'PuzzleTrack';

export default PuzzleTrack;
