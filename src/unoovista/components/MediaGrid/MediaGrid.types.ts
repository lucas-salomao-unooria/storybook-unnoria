import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Tipo de mídia de um bloco da grade.
 * - 'image': foto única, sem indicador
 * - 'video': vídeo, exibe a cápsula com o glifo de vídeo no canto inferior
 *
 * A grade não tem indicador de carrossel: só imagem e vídeo.
 */
export type UnvMediaType = 'image' | 'video';

/**
 * Descrição de um bloco da grade de mídias.
 */
export interface UnvMediaItem {
  /** Identificador único do bloco */
  id: string;
  /** URL da imagem de capa */
  src: string;
  /** Texto alternativo da imagem */
  alt: string;
  /** Tipo de mídia representado pelo bloco */
  type?: UnvMediaType;
}

/**
 * Propriedades do componente MediaGrid do Unoovista.
 */
export interface UnvMediaGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onToggle'> {
  /**
   * Blocos exibidos na grade.
   */
  items: UnvMediaItem[];

  /**
   * Quantidade de colunas.
   * @default 3
   */
  columns?: number;

  /**
   * Espaço entre os blocos em pixels. Sem valor, usa `--unv-spacing-3xs` (4px).
   */
  gap?: number;

  /**
   * Callback disparado ao selecionar um bloco. Fora do modo de seleção.
   */
  onSelect?: (item: UnvMediaItem, index: number) => void;

  /**
   * Modo de seleção múltipla: cada bloco vira um botão com `aria-pressed` e
   * ganha o círculo de seleção, numerado na ordem em que foi escolhido. O
   * toque chama `onToggle`, e não `onSelect`.
   * @default false
   */
  selectable?: boolean;

  /**
   * Identificadores selecionados, NA ORDEM DE SELEÇÃO — é ela que numera os
   * círculos. Controlado: a grade não guarda seleção própria.
   * @default []
   */
  selectedIds?: string[];

  /**
   * Chamado ao tocar um bloco no modo de seleção. Quem decide se o bloco entra
   * ou sai (e o limite, se houver) é o produto, atualizando `selectedIds`.
   */
  onToggle?: (item: UnvMediaItem, index: number) => void;

  /**
   * Rótulo acessível da grade.
   * @default 'Publicações'
   */
  ariaLabel?: string;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner ancestral (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
