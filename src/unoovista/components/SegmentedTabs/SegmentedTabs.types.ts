import React from 'react';
import type { UnvTheme } from '../../tokens';
import type { UnvIconName } from '../Icon';

/**
 * Descrição de um segmento.
 */
export interface UnvSegmentItem {
  /** Identificador único do segmento */
  id: string;
  /** Rótulo textual do segmento (usado como texto ou como rótulo acessível) */
  label: string;
  /** Glifo exibido no lugar do rótulo textual */
  icon?: UnvIconName;
}

/**
 * Variantes de segmentação.
 * - 'text': rótulos textuais (Seguindo / Você)
 * - 'icon': apenas glifos (grade e marcações do perfil); o rótulo vira nome acessível
 */
export type UnvSegmentedTabsVariant = 'text' | 'icon';

/**
 * Propriedades do componente SegmentedTabs do Unoovista.
 */
export interface UnvSegmentedTabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Segmentos exibidos.
   */
  items: UnvSegmentItem[];

  /**
   * Identificador do segmento ativo.
   */
  activeId: string;

  /**
   * Callback disparado ao selecionar um segmento.
   */
  onChange?: (id: string, item: UnvSegmentItem, index: number) => void;

  /**
   * Variante de conteúdo dos segmentos.
   * @default 'text'
   */
  variant?: UnvSegmentedTabsVariant;

  /**
   * Rótulo acessível do grupo de abas.
   * @default 'Seções'
   */
  ariaLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral
   * por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
