import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Tipo de mídia de um bloco da grade.
 * - 'image': foto única, sem indicador
 * - 'video': vídeo, exibe o glifo de câmera de vídeo no canto superior direito
 *
 * O arquivo Figma declara apenas estes dois casos no frame "Posts"; não existe
 * indicador de carrossel na grade do perfil.
 */
export type InstaMediaType = 'image' | 'video';

/**
 * Descrição de um bloco da grade de mídias.
 */
export interface InstaMediaItem {
  /** Identificador único do bloco */
  id: string;
  /** URL da imagem de capa */
  src: string;
  /** Texto alternativo da imagem */
  alt: string;
  /** Tipo de mídia representado pelo bloco */
  type?: InstaMediaType;
}

/**
 * Propriedades do componente MediaGrid do Instanooria.
 */
export interface InstaMediaGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onToggle'> {
  /**
   * Blocos exibidos na grade.
   */
  items: InstaMediaItem[];

  /**
   * Quantidade de colunas.
   * @default 3
   */
  columns?: number;

  /**
   * Espaço entre os blocos em pixels.
   * @default 1
   */
  gap?: number;

  /**
   * Callback disparado ao selecionar um bloco. Fora do modo de seleção.
   */
  onSelect?: (item: InstaMediaItem, index: number) => void;

  /**
   * Modo de seleção múltipla, como o "SELECT MULTIPLE" da tela de adicionar
   * imagem (`0:1366` / `0:3163`): cada bloco vira um botão com `aria-pressed`
   * e ganha o círculo de seleção, numerado na ordem em que foi escolhido. O
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
  onToggle?: (item: InstaMediaItem, index: number) => void;

  /**
   * Rótulo acessível da grade.
   * @default 'Publicações'
   */
  ariaLabel?: string;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
