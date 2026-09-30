import React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Uma opção do controle segmentado.
 */
export interface UglSegmentedOption {
  /** Identificador devolvido por `onChange` */
  id: string;
  /** Rótulo visível — é também o nome acessível do segmento */
  label: string;
  /** Glifo antes do rótulo */
  icon?: UglIconName;
}

/**
 * Alturas do controle.
 * - 'sm': 32px (sobre a grade e em barras compactas)
 * - 'md': 40px (padrão, dentro de telas e folhas)
 */
export type UglSegmentedControlSize = 'sm' | 'md';

/**
 * Variantes do controle.
 * - 'default': trilha no preenchimento de campo, dentro do fluxo da tela
 * - 'floating': cápsula translúcida com desfoque e sombra de sobreposição,
 *   para flutuar sobre a grade ("Anos | Meses | Todas")
 */
export type UglSegmentedControlVariant = 'default' | 'floating';

/**
 * Propriedades do componente SegmentedControl da Unoogaleria.
 */
export interface UglSegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /**
   * Opções, na ordem de exibição. Todos os segmentos têm a mesma largura.
   */
  options: UglSegmentedOption[];

  /**
   * Opção escolhida (modo controlado).
   */
  value?: string;

  /**
   * Opção escolhida inicialmente (modo não controlado). Quando omitida, vale a
   * primeira opção.
   */
  defaultValue?: string;

  /**
   * Chamado com o `id` da opção escolhida — por clique, toque ou teclado.
   */
  onChange?: (id: string) => void;

  /**
   * Nome acessível do grupo (`aria-label` do `radiogroup`). Obrigatório: o
   * leitor de tela precisa saber o que o grupo escolhe.
   */
  ariaLabel: string;

  /**
   * Altura do controle.
   * @default 'md'
   */
  size?: UglSegmentedControlSize;

  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UglSegmentedControlVariant;

  /**
   * Ocupa toda a largura do contêiner.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
