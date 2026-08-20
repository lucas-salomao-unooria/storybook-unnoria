import React from 'react';
import type { InstaTheme } from '../../tokens';
import type { InstaIconName } from '../Icon';

/**
 * Descrição de um segmento.
 */
export interface InstaSegmentItem {
  /** Identificador único do segmento */
  id: string;
  /** Rótulo textual do segmento (usado como texto ou como rótulo acessível) */
  label: string;
  /** Glifo exibido no lugar do rótulo textual */
  icon?: InstaIconName;
}

/**
 * Variantes de segmentação.
 * - 'text': rótulos textuais (Following / You)
 * - 'icon': apenas glifos (grade / marcações do perfil)
 */
export type InstaSegmentedTabsVariant = 'text' | 'icon';

/**
 * Propriedades do componente SegmentedTabs do Instanooria.
 */
export interface InstaSegmentedTabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Segmentos exibidos.
   */
  items: InstaSegmentItem[];

  /**
   * Identificador do segmento ativo.
   */
  activeId: string;

  /**
   * Callback disparado ao selecionar um segmento.
   */
  onChange?: (id: string, item: InstaSegmentItem, index: number) => void;

  /**
   * Variante de conteúdo dos segmentos.
   * @default 'text'
   */
  variant?: InstaSegmentedTabsVariant;

  /**
   * Rótulo acessível do grupo de abas.
   * @default 'Seções'
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
