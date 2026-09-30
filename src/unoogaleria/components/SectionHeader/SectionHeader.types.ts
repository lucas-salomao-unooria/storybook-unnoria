import type React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Ação de texto do cabeçalho ("Selecionar", "Desmarcar", "Ver tudo").
 */
export interface UglSectionHeaderAction {
  /** Rótulo visível */
  label: string;
  /** Acionamento */
  onClick: () => void;
  /**
   * Nome acessível completo, quando o rótulo sozinho é ambíguo — na grade há um
   * "Selecionar" por grupo, então a grade passa "Selecionar Hoje". Deve conter
   * o rótulo visível.
   */
  ariaLabel?: string;
}

/**
 * Tamanhos do cabeçalho.
 * - 'md': título em `title-sm` (16px) — o cabeçalho colante da grade
 * - 'lg': título em `title-lg` (20px) — seções de página ("Meus álbuns")
 */
export type UglSectionHeaderSize = 'md' | 'lg';

/**
 * Propriedades do componente SectionHeader da Unoogaleria.
 */
export interface UglSectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título do grupo ("Hoje", "Ontem", "Meus álbuns").
   */
  title: string;

  /**
   * Linha de apoio sob o título (o lugar mais frequente do grupo).
   */
  subtitle?: string;

  /**
   * Ação de texto à direita.
   */
  action?: UglSectionHeaderAction;

  /**
   * Nível do título.
   * @default 2
   */
  headingLevel?: 2 | 3;

  /**
   * Cola no topo do contêiner de rolagem, sobre a barra translúcida. O topo
   * vem de `--ugl-section-header-sticky-top` (a grade o define com a área
   * segura e o recuo das barras sobrepostas).
   * @default false
   */
  sticky?: boolean;

  /**
   * Tamanho do título.
   * @default 'md'
   */
  size?: UglSectionHeaderSize;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
