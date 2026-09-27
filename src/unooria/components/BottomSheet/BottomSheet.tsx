'use client';

import React, { forwardRef, useCallback, useEffect, useId, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../Icon/Icon';
import type { BottomSheetProps } from './BottomSheet.types';
import './BottomSheet.css';

// ============================================================================
// Hidratação segura (SSR) — o mesmo mecanismo do `Modal`
// ============================================================================

/** Assinatura vazia: o valor de hidratação nunca muda depois de resolvido. */
const assinarNada = () => () => {};
const hidratadoNoCliente = () => true;
const naoHidratadoNoServidor = () => false;

/**
 * `false` no servidor e durante a hidratação, `true` daí em diante. O portal só
 * existe no cliente: renderizar `null` até lá mantém as duas árvores iguais.
 */
function useEstaHidratado(): boolean {
  return useSyncExternalStore(assinarNada, hidratadoNoCliente, naoHidratadoNoServidor);
}

// ============================================================================
// Focáveis que o Tab de fato alcança
// ============================================================================

const SELETOR_FOCAVEL = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  'summary',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
].join(', ');

/**
 * Os focáveis da folha que o Tab alcança — e SÓ eles. Um botão dentro de uma
 * pista fechada (`hidden`, logo `display: none`) aparece no `querySelectorAll`,
 * mas não na ordem do Tab. Se ele entrasse na conta como "último focável", a
 * prisão do Tab nunca reconheceria o último de verdade e o foco escaparia da
 * gaveta — o mesmo sequestro de Tab que o `Collapse` já cobrou no monorepo.
 * Por isso o filtro por caixa renderizada (`getClientRects`), `inert` e
 * `visibility`.
 */
const focaveisAlcancaveis = (raiz: HTMLElement): HTMLElement[] =>
  Array.from(raiz.querySelectorAll<HTMLElement>(SELETOR_FOCAVEL)).filter(
    (elemento) =>
      elemento.tabIndex >= 0 &&
      !elemento.closest('[inert]') &&
      elemento.getClientRects().length > 0 &&
      getComputedStyle(elemento).visibility !== 'hidden'
  );

/** `ReactNode` que de fato pinta alguma coisa (`0` pinta; `''`, `false` e `null`, não). */
const temConteudo = (no: React.ReactNode): boolean =>
  no !== undefined && no !== null && no !== false && no !== '';

/**
 * Componente BottomSheet — Plataforma Unooria
 *
 * A gaveta: folha que sobe de baixo sobre um véu, com alça decorativa,
 * cabeçalho (título + X), corpo que rola por dentro e rodapé fixo opcional.
 * É um diálogo modal completo, com o comportamento do `Modal` do pacote: Esc
 * no `window` em fase de captura, trava de rolagem do `body`, foco inicial no
 * primeiro focável, prisão do Tab, clique no véu sem falso positivo de
 * seleção, devolução do foco ao fechar e portal seguro para SSR.
 *
 * Design próprio — a seção não tem quadro de folha inferior no Figma. O raio
 * de 16px e o véu são os do `Modal`; o botão X tem 48px, alvo de toque para
 * criança. Não há gesto de arrastar: fechar é pelo X, pelo Esc ou pelo véu.
 */
export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      footer,
      maxHeight = '85%',
      closeLabel = 'Fechar',
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEsc = true,
      initialFocusRef,
      finalFocusRef,
      portalContainer,
      theme = 'light',
      className = '',
      style,
      onKeyDown,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const tituloId = useId();
    const descricaoId = useId();
    const estaHidratado = useEstaHidratado();
    const folhaRef = useRef<HTMLDivElement | null>(null);
    const alvoDoMouseDownRef = useRef<EventTarget | null>(null);

    const temTitulo = temConteudo(title);
    const temDescricao = temConteudo(description);
    const temRodape = temConteudo(footer);

    /**
     * Precedência do nome acessível (a mesma do `Modal`, seção 4.3):
     * 1. `aria-labelledby` explícito — manda sempre;
     * 2. `aria-label` explícito — o diálogo NÃO recebe `aria-labelledby`, que
     *    venceria o `aria-label` no cálculo do nome e o calaria sem aviso;
     * 3. o título renderizado, pelo id automático.
     */
    const nomeadoPor = ariaLabelledBy || (ariaLabel ? undefined : temTitulo ? tituloId : undefined);
    const descritoPor = ariaDescribedBy || (temDescricao ? descricaoId : undefined);

    // ========================================================================
    // Esc fecha — no `window`, em captura, para vencer quem estiver por baixo
    // ========================================================================
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return undefined;

      const aoTeclar = (evento: KeyboardEvent) => {
        // Esc durante a composição de um acento (IME) cancela o acento, não a gaveta.
        if (evento.key !== 'Escape' || evento.isComposing) return;
        evento.stopPropagation();
        onClose();
      };

      window.addEventListener('keydown', aoTeclar, true);
      return () => window.removeEventListener('keydown', aoTeclar, true);
    }, [isOpen, closeOnEsc, onClose]);

    // ========================================================================
    // Trava de rolagem do body, com a compensação da barra (sem pulo de layout)
    // ========================================================================
    useEffect(() => {
      if (!isOpen || typeof document === 'undefined') return undefined;

      const { body, documentElement } = document;
      const overflowOriginal = body.style.overflow;
      const paddingOriginal = body.style.paddingRight;

      const larguraDaBarra = window.innerWidth - documentElement.clientWidth;
      if (larguraDaBarra > 0) body.style.paddingRight = `${larguraDaBarra}px`;
      body.style.overflow = 'hidden';

      return () => {
        body.style.overflow = overflowOriginal;
        body.style.paddingRight = paddingOriginal;
      };
    }, [isOpen]);

    // ========================================================================
    // Foco: entra na folha ao abrir, volta a quem abriu ao fechar
    // ========================================================================
    useEffect(() => {
      // Na passada de hidratação o portal ainda não existe: espera a próxima.
      if (!isOpen || !estaHidratado || typeof document === 'undefined') return undefined;

      const anterior = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const folha = folhaRef.current;
      const alvoInicial =
        initialFocusRef?.current ?? (folha ? focaveisAlcancaveis(folha)[0] : undefined) ?? folha;
      alvoInicial?.focus();

      return () => {
        // `finalFocusRef.current` é lido no FECHAMENTO, e não na abertura: o
        // alvo pode ter sido montado depois que a gaveta abriu (o mesmo motivo
        // do `Modal`). Copiar o valor no início do efeito, como a regra sugere,
        // devolveria o foco ao alvo errado — por isso ela é suprimida aqui.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const alvoFinal = finalFocusRef?.current ?? anterior;
        if (alvoFinal && alvoFinal.isConnected) alvoFinal.focus();
      };
    }, [isOpen, estaHidratado, initialFocusRef, finalFocusRef]);

    // ========================================================================
    // Prisão do Tab
    // ========================================================================
    const prenderTab = (evento: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(evento);
      if (evento.defaultPrevented || evento.key !== 'Tab') return;

      const folha = folhaRef.current;
      if (!folha) return;

      const focaveis = focaveisAlcancaveis(folha);
      if (focaveis.length === 0) {
        evento.preventDefault();
        folha.focus();
        return;
      }

      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      const indice = focaveis.indexOf(document.activeElement as HTMLElement);

      if (evento.shiftKey) {
        // Do primeiro (ou da própria folha) para trás: dá a volta até o último.
        if (indice <= 0) {
          evento.preventDefault();
          ultimo.focus();
        }
      } else if (indice === -1 || indice === focaveis.length - 1) {
        evento.preventDefault();
        primeiro.focus();
      }
    };

    // ========================================================================
    // Clique no véu: só fecha se o gesto começou E terminou no véu
    // ========================================================================
    const aoPressionarVeu = (evento: React.MouseEvent<HTMLDivElement>) => {
      alvoDoMouseDownRef.current = evento.target;
      // O véu não é focável: sem isto, clicar nele mandaria o foco para o
      // `body`, fora da gaveta, e o próximo Tab escaparia para a página.
      if (evento.target === evento.currentTarget) evento.preventDefault();
    };

    const aoClicarVeu = (evento: React.MouseEvent<HTMLDivElement>) => {
      // Arrastar uma seleção de texto de dentro da folha e soltar no véu
      // dispara `click` no véu — não é pedido de fechar.
      if (
        closeOnOverlayClick &&
        evento.target === evento.currentTarget &&
        alvoDoMouseDownRef.current === evento.currentTarget
      ) {
        onClose();
      }
    };

    const juntarRefs = useCallback(
      (no: HTMLDivElement | null) => {
        folhaRef.current = no;
        if (typeof ref === 'function') {
          ref(no);
        } else if (ref) {
          ref.current = no;
        }
      },
      [ref]
    );

    if (!isOpen || !estaHidratado) {
      return null;
    }

    const escuro = theme === 'dark';

    const classesDoVeu = ['unooria-bottom-sheet-overlay', escuro ? 'unooria-bottom-sheet-overlay--theme-dark' : '']
      .filter(Boolean)
      .join(' ');

    const classesDaFolha = ['unooria-bottom-sheet', escuro ? 'unooria-bottom-sheet--theme-dark' : '', className]
      .filter(Boolean)
      .join(' ');

    const temCabecalho = temTitulo || temDescricao || showCloseButton;

    const conteudo = (
      <div className={classesDoVeu} onMouseDown={aoPressionarVeu} onClick={aoClicarVeu}>
        <div
          {...rest}
          ref={juntarRefs}
          role="dialog"
          aria-modal="true"
          aria-labelledby={nomeadoPor}
          aria-describedby={descritoPor}
          aria-label={ariaLabel}
          tabIndex={-1}
          className={classesDaFolha}
          style={{ maxHeight, ...style }}
          onKeyDown={prenderTab}
        >
          <div className="unooria-bottom-sheet__handle" aria-hidden="true" />

          {temCabecalho && (
            <div className="unooria-bottom-sheet__header">
              {(temTitulo || temDescricao) && (
                <div className="unooria-bottom-sheet__heading">
                  {temTitulo && (
                    <h2 id={tituloId} className="unooria-bottom-sheet__title">
                      {title}
                    </h2>
                  )}
                  {temDescricao && (
                    <p id={descricaoId} className="unooria-bottom-sheet__description">
                      {description}
                    </p>
                  )}
                </div>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="unooria-bottom-sheet__close"
                  aria-label={closeLabel}
                  onClick={onClose}
                >
                  <Icon name="close" size="s" color="currentColor" />
                </button>
              )}
            </div>
          )}

          <div className="unooria-bottom-sheet__body">{children}</div>

          {temRodape && <div className="unooria-bottom-sheet__footer">{footer}</div>}
        </div>
      </div>
    );

    return createPortal(conteudo, portalContainer || document.body);
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
