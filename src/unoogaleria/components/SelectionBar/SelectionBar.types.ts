import type React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Uma ação da seleção (Compartilhar, Adicionar a um álbum, Excluir).
 */
export interface UglSelectionBarAction {
  /** Identificador único */
  id: string;
  /** Glifo do botão */
  icon: UglIconName;
  /** Nome acessível e dica do botão */
  label: string;
  /** Acionamento */
  onClick: () => void;
  /**
   * Tom do glifo.
   * @default 'default'
   */
  tone?: 'default' | 'danger';
  /** Desabilita a ação mesmo com itens selecionados */
  disabled?: boolean;
}

/**
 * Propriedades do componente SelectionBar da Unoogaleria.
 */
export interface UglSelectionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Quantidade de itens selecionados. Com zero, todas as ações ficam
   * desabilitadas.
   */
  count: number;

  /**
   * Rótulo central. Anunciado a cada troca (`aria-live="polite"`).
   * @default uglFormatSelection(count)
   */
  label?: string;

  /**
   * Ações, na ordem da barra: a primeira metade à esquerda do rótulo, a outra à
   * direita.
   */
  actions: UglSelectionBarAction[];

  /**
   * Nome acessível da barra de ferramentas.
   * @default 'Ações da seleção'
   */
  ariaLabel?: string;

  /**
   * Absoluta na base do contêiner, sobre a grade que corre por baixo (passe
   * `bottomInset` à `MediaGrid`). Extensão do contrato.
   * @default false
   */
  floating?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
