'use client';

import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import type { HeaderMenuItem, HeaderMenuProps } from './HeaderMenu.types';
import './HeaderMenu.css';

/**
 * Componente HeaderMenu - Design System Plataforma Unooria
 *
 * Menu recolhível do header. O gatilho fica fixo na borda direita (por padrão o
 * avatar do usuário) e a faixa de ações se revela **da direita para a esquerda**,
 * item por item, ancorada na borda direita do gatilho.
 *
 * Extraído do Figma (Node 21765:12693 — component set `Menu Desk`, variantes
 * `Menu=Close` 40x44, `Menu=Open` 280x44, `Menu=Iniciativas` e `Menu=Linguagem`).
 *
 * Teclado: Enter/Espaço abrem no gatilho; setas navegam entre os itens; Home e
 * End vão ao primeiro e ao último; Tab circula preso dentro da faixa; Escape
 * fecha e devolve o foco ao gatilho (e, se um painel estiver aberto, fecha
 * primeiro o painel devolvendo o foco ao item que o abriu).
 */
export const HeaderMenu = forwardRef<HTMLDivElement, HeaderMenuProps>(
  (
    {
      items,
      children,
      avatarSrc,
      avatarName,
      avatarAlt,
      triggerLabel = 'Menu da conta',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      closeOnSelect = true,
      showTooltips = true,
      theme = 'light',
      className,
      style,
      id,
    },
    ref
  ) => {
    const generatedId = useId();
    const baseId = id ?? `unooria-header-menu-${generatedId}`;
    const stripId = `${baseId}-faixa`;

    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
    const [openPanelKey, setOpenPanelKey] = useState<string | null>(null);

    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? Boolean(openProp) : uncontrolledOpen;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

    /**
     * Só os itens habilitados entram na navegação por teclado. Guardamos o
     * índice ORIGINAL para poder indexar `itemRefs` sem desalinhar quando um
     * item do meio está desabilitado.
     */
    const enabledIndexes = useMemo(
      () => items.reduce<number[]>((acc, item, index) => (item.disabled ? acc : [...acc, index]), []),
      [items]
    );

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isControlled) setUncontrolledOpen(next);
        if (!next) setOpenPanelKey(null);
        onOpenChange?.(next);
      },
      [isControlled, onOpenChange]
    );

    const focusItem = useCallback((index: number) => {
      itemRefs.current[index]?.focus();
    }, []);

    const closeAndReturnFocus = useCallback(() => {
      setOpen(false);
      triggerRef.current?.focus();
    }, [setOpen]);

    /**
     * Ao abrir, o foco entra na faixa pelo primeiro item habilitado — é o que a
     * ARIA espera de um gatilho `aria-haspopup="menu"`. Sem isso o menu abre e
     * o teclado continua no gatilho, e as setas não têm onde agir.
     */
    const previousOpenRef = useRef<boolean>(isOpen);
    useEffect(() => {
      const acabouDeAbrir = isOpen && !previousOpenRef.current;
      previousOpenRef.current = isOpen;
      if (!acabouDeAbrir) return;
      const primeiro = enabledIndexes[0];
      if (primeiro === undefined) return;
      /*
       * A faixa sai de `visibility: hidden`, e um elemento invisível não recebe
       * foco. O rAF espera o navegador aplicar o estilo do estado aberto.
       */
      const quadro = requestAnimationFrame(() => focusItem(primeiro));
      return () => cancelAnimationFrame(quadro);
    }, [isOpen, enabledIndexes, focusItem]);

    /** Clique fora fecha o menu — sem devolver o foco, que já foi para fora. */
    useEffect(() => {
      if (!isOpen) return;

      const aoApontarFora = (event: MouseEvent) => {
        const alvo = event.target as Node | null;
        if (alvo && containerRef.current && !containerRef.current.contains(alvo)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', aoApontarFora);
      return () => document.removeEventListener('mousedown', aoApontarFora);
    }, [isOpen, setOpen]);

    const moverFoco = useCallback(
      (indiceAtual: number, passo: 1 | -1) => {
        if (enabledIndexes.length === 0) return;
        const posicao = enabledIndexes.indexOf(indiceAtual);
        const proxima = (posicao + passo + enabledIndexes.length) % enabledIndexes.length;
        focusItem(enabledIndexes[proxima]);
      },
      [enabledIndexes, focusItem]
    );

    const aoTeclarNoItem = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>, indice: number, item: HeaderMenuItem) => {
        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            event.preventDefault();
            moverFoco(indice, 1);
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            event.preventDefault();
            moverFoco(indice, -1);
            break;
          case 'Home':
            event.preventDefault();
            if (enabledIndexes.length > 0) focusItem(enabledIndexes[0]);
            break;
          case 'End':
            event.preventDefault();
            if (enabledIndexes.length > 0) focusItem(enabledIndexes[enabledIndexes.length - 1]);
            break;
          case 'Tab':
            /*
             * Foco preso: enquanto o menu está aberto, Tab circula entre os
             * itens em vez de sair para o resto da página. A saída é o Escape,
             * que devolve o foco ao gatilho.
             */
            event.preventDefault();
            moverFoco(indice, event.shiftKey ? -1 : 1);
            break;
          case 'Escape':
            event.preventDefault();
            if (item.panel && openPanelKey === item.key) {
              setOpenPanelKey(null);
              focusItem(indice);
            } else {
              closeAndReturnFocus();
            }
            break;
          default:
            break;
        }
      },
      [moverFoco, enabledIndexes, focusItem, openPanelKey, closeAndReturnFocus]
    );

    const aoTeclarNoGatilho = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Escape' && isOpen) {
          event.preventDefault();
          closeAndReturnFocus();
        }
      },
      [isOpen, closeAndReturnFocus]
    );

    const aoClicarNoItem = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>, item: HeaderMenuItem) => {
        if (item.disabled) {
          event.preventDefault();
          return;
        }

        item.onClick?.(event);

        if (item.panel) {
          setOpenPanelKey((atual) => (atual === item.key ? null : item.key));
          return;
        }

        if (closeOnSelect) closeAndReturnFocus();
      },
      [closeOnSelect, closeAndReturnFocus]
    );

    const classesDoContainer = ['unooria-header-menu', className].filter(Boolean).join(' ');

    const itemComPainelAberto = items.find(
      (item) => item.panel && item.key === openPanelKey
    );

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={classesDoContainer}
        style={style}
        data-theme={theme}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <div
          id={stripId}
          role="menu"
          aria-orientation="horizontal"
          aria-label={triggerLabel}
          className="unooria-header-menu__faixa"
        >
          {items.map((item, indice) => {
            const painelAberto = Boolean(item.panel) && openPanelKey === item.key;
            const pressionado = painelAberto || Boolean(item.active && !item.panel);

            return (
              <button
                key={item.key}
                ref={(node) => {
                  itemRefs.current[indice] = node;
                }}
                type="button"
                role="menuitem"
                /*
                 * Tabindex de rovagem: o menu inteiro é uma única parada de
                 * tabulação e a movimentação interna é por setas. `-1` em todos
                 * porque o foco entra programaticamente na abertura.
                 */
                tabIndex={-1}
                aria-label={item.label}
                aria-disabled={item.disabled || undefined}
                aria-haspopup={item.panel ? 'menu' : undefined}
                aria-expanded={item.panel ? painelAberto : undefined}
                data-danger={item.danger || undefined}
                data-pressed={pressionado || undefined}
                /*
                 * O atraso cresce da DIREITA para a ESQUERDA: o último item
                 * (encostado no gatilho) entra primeiro. É o que dá a leitura
                 * de "desenrolar" a partir do gatilho.
                 */
                style={{ ['--unooria-header-menu-ordem' as string]: String(items.length - 1 - indice) }}
                className={['unooria-header-menu__item', item.className].filter(Boolean).join(' ')}
                onClick={(event) => aoClicarNoItem(event, item)}
                onKeyDown={(event) => aoTeclarNoItem(event, indice, item)}
              >
                {item.text ? (
                  <span className="unooria-header-menu__texto">{item.text}</span>
                ) : (
                  item.icon && (
                    <Icon
                      name={item.icon}
                      size={18}
                      color="currentColor"
                      className="unooria-header-menu__icone"
                      aria-hidden="true"
                    />
                  )
                )}

                {showTooltips && (
                  <span className="unooria-header-menu__dica" aria-hidden="true">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={stripId}
          aria-label={triggerLabel}
          className="unooria-header-menu__gatilho"
          onClick={() => setOpen(!isOpen)}
          onKeyDown={aoTeclarNoGatilho}
        >
          {children ?? (
            <Avatar
              as="span"
              size="sm"
              variant="circle"
              state="selected"
              src={avatarSrc}
              name={avatarName}
              alt={avatarAlt}
              theme={theme}
            />
          )}
        </button>

        {itemComPainelAberto && (
          <div role="none" className="unooria-header-menu__painel">
            {itemComPainelAberto.panel}
          </div>
        )}
      </div>
    );
  }
);

HeaderMenu.displayName = 'HeaderMenu';

export default HeaderMenu;
