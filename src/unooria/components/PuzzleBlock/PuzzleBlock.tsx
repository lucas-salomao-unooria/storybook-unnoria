'use client';

import React, { forwardRef, useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { PUZZLE_BLOCK_DRAG_TYPE, type PuzzleBlockProps } from './PuzzleBlock.types';
import './PuzzleBlock.css';

/** `0` é conteúdo; `null`, `undefined`, `false` e `''` não. */
const temConteudo = (no: React.ReactNode): boolean =>
  no !== undefined && no !== null && no !== false && no !== '';

/**
 * Componente PuzzleBlock — Plataforma Unooria
 *
 * A peça da "Chave do Editor": um `<button>` com forma de quebra-cabeça — um
 * recorte à esquerda e uma saliência à direita, feitos só com CSS — que a
 * criança TOCA para encaixar na calha (`PuzzleTrack`). O caminho principal é o
 * TOQUE: num Chromebook de escola e com leitor de tela, arrastar é a interação
 * que mais exclui, e o toque sequencial faz a mesma coisa com um botão comum.
 *
 * Com `dragData`, o bloco também se ARRASTA (HTML5 drag and drop nativo, sem
 * biblioteca): o `dragstart` grava o dado com o tipo `PUZZLE_BLOCK_DRAG_TYPE`,
 * que a vaga do `PuzzleTrack` com `onSlotDrop` lê na soltura. É um caminho a
 * mais para quem tem mouse; o toque continua funcionando igual.
 *
 * O bloco NÃO decide se é certo. Ele só desenha o `state` que o consumidor
 * informa, porque o gabarito mora no servidor — um bloco que soubesse a
 * resposta a entregaria no bundle.
 *
 * Nome e descrição acessíveis são separados de propósito: o NOME é só o
 * `label` ("Fonte"), a pergunta de apoio e o aviso de `returned` vão para a
 * DESCRIÇÃO. Quem navega por Tab ouve primeiro a peça, e o resto em seguida,
 * em vez de uma frase comprida a cada bloco. É isso que pede `useId` — e, com
 * ele, o `'use client'` (seção 4.5 do AGENTS.md).
 *
 * `selected` (opcional) é o primeiro tempo do toque sequencial "toca o cartão,
 * toca a vaga": o bloco escolhido vira botão de alternância (`aria-pressed`),
 * ganha contorno de 2px na peça inteira e o glifo `check_circle`. Sem a prop,
 * o bloco não recebe `aria-pressed` — o comportamento de antes.
 *
 * `size="sm"` é a peça compacta da vaga estreita (alvo de 44px, rótulo em caixa
 * normal, quebra só entre palavras); o `md` de sempre é o padrão.
 *
 * `locked` usa `aria-disabled`, não `disabled`: o bloco continua no Tab e é
 * lido ("Fonte, indisponível"), mas o toque não chama `onClick`. Um `disabled`
 * nativo o tiraria da navegação, e a chave formada sumiria para quem não vê.
 */
export const PuzzleBlock = forwardRef<HTMLButtonElement, PuzzleBlockProps>(
  (
    {
      label,
      description,
      icon,
      state = 'idle',
      returnedLabel = 'Voltou para a bandeja',
      selected,
      size = 'md',
      dragData,
      theme = 'light',
      className = '',
      type = 'button',
      onClick,
      onDragStart,
      onDragEnd,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-disabled': ariaDisabled,
      'aria-pressed': ariaPressed,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    const [arrastando, setArrastando] = useState(false);
    const rotuloId = `${id}-rotulo`;
    const avisoId = `${id}-aviso`;
    const descricaoId = `${id}-descricao`;

    const travado = state === 'locked';
    const voltou = state === 'returned';
    const temDescricao = temConteudo(description);
    // Só vira botão de alternância quando o consumidor fala de seleção: sem a
    // prop, o `aria-pressed` não aparece e o bloco é o de sempre.
    const pressionado = ariaPressed ?? selected;
    // O visual de escolhido não se soma ao de travado: com a chave formada, o
    // cadeado e o fundo de sucesso mandam. O `aria-pressed` segue a prop.
    const escolhido = selected === true && !travado;
    // A chave formada não se mexe: travado não arrasta, nem com `dragData`.
    const arrastavel = dragData !== undefined && !travado;

    const iniciarArraste = (evento: React.DragEvent<HTMLButtonElement>) => {
      if (arrastavel) {
        evento.dataTransfer.setData(PUZZLE_BLOCK_DRAG_TYPE, dragData);
        evento.dataTransfer.effectAllowed = 'move';
        setArrastando(true);
      }
      onDragStart?.(evento);
    };

    const encerrarArraste = (evento: React.DragEvent<HTMLButtonElement>) => {
      setArrastando(false);
      onDragEnd?.(evento);
    };

    // `aria-labelledby` explícito manda; com `aria-label` explícito o botão NÃO
    // recebe o nosso `aria-labelledby`, que venceria o `aria-label` no cálculo
    // do nome e o calaria sem aviso (a mesma precedência do `Modal`, seção 4.3).
    const nomeadoPor = ariaLabelledBy ?? (ariaLabel ? undefined : rotuloId);

    // O aviso vem antes da pergunta: é a novidade da jogada.
    const descritoPor =
      [voltou ? avisoId : '', temDescricao ? descricaoId : '', ariaDescribedBy ?? '']
        .filter(Boolean)
        .join(' ') || undefined;

    const classes = [
      'unooria-puzzle-block',
      `unooria-puzzle-block--${state}`,
      escolhido ? 'unooria-puzzle-block--selected' : '',
      arrastavel ? 'unooria-puzzle-block--draggable' : '',
      arrastavel && arrastando ? 'unooria-puzzle-block--dragging' : '',
      size === 'sm' ? 'unooria-puzzle-block--size-sm' : '',
      theme === 'dark' ? 'unooria-puzzle-block--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        data-state={state}
        data-selected={escolhido ? 'true' : undefined}
        data-dragging={arrastavel && arrastando ? 'true' : undefined}
        // Sem `dragData`, nenhum atributo novo: o bloco é o de sempre.
        draggable={arrastavel ? true : undefined}
        onDragStart={arrastavel || onDragStart ? iniciarArraste : undefined}
        onDragEnd={arrastavel || onDragEnd ? encerrarArraste : undefined}
        aria-label={ariaLabel}
        aria-labelledby={nomeadoPor}
        aria-describedby={descritoPor}
        aria-disabled={travado ? true : ariaDisabled}
        aria-pressed={pressionado}
        // Sem função nova aqui dentro: o `onClick` do consumidor passa direto,
        // ou some quando travado. Assim o toque num bloco travado não faz nada,
        // pelo mouse, pelo toque ou por Enter/Espaço.
        onClick={travado ? undefined : onClick}
        {...rest}
      >
        <span className="unooria-puzzle-block__shape" aria-hidden="true" />

        <span className="unooria-puzzle-block__body">
          {icon && <Icon name={icon} size="s" className="unooria-puzzle-block__icon" />}

          <span className="unooria-puzzle-block__text">
            <span id={rotuloId} className="unooria-puzzle-block__label">
              {label}
            </span>

            {temDescricao && (
              <span id={descricaoId} className="unooria-puzzle-block__description">
                {description}
              </span>
            )}

            {voltou && (
              <span id={avisoId} className="unooria-puzzle-block__returned">
                <Icon name="replay" size="3xs" className="unooria-puzzle-block__returned-icon" />
                <span>{returnedLabel}</span>
              </span>
            )}
          </span>

          {escolhido && (
            <Icon name="check_circle" size="xs" fill className="unooria-puzzle-block__check" />
          )}
          {travado && <Icon name="lock" size="xs" className="unooria-puzzle-block__lock" />}
        </span>
      </button>
    );
  }
);

PuzzleBlock.displayName = 'PuzzleBlock';

export default PuzzleBlock;
