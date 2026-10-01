import React from 'react';
import type { UjnIconName } from '../Icon';
import type { UjnTheme } from '../../tokens';

/**
 * Variantes do botão de glifo.
 * - 'ghost': só o glifo, sobre a superfície (barras e linhas)
 * - 'filled': glifo no roxo de texto sobre o preenchimento de campo
 * - 'outline': glifo com contorno de 1px em `border-default`
 */
export type UjnIconButtonVariant = 'ghost' | 'filled' | 'outline';

/**
 * Tamanhos do alvo (sempre quadrado).
 * - 'sm': 32px (dentro de campos e cartões; o alvo de toque continua com 44px)
 * - 'md': 44px (padrão, alvo mínimo de toque)
 * - 'lg': 56px (ações de destaque)
 */
export type UjnIconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente IconButton da Unoojornal.
 */
export interface UjnIconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Glifo do registro.
   */
  icon: UjnIconName;

  /**
   * Nome acessível. Obrigatório: um botão só com glifo não tem outro nome.
   * Também vira a dica de ferramenta (`title`).
   */
  label: string;

  /**
   * Variante visual.
   * @default 'ghost'
   */
  variant?: UjnIconButtonVariant;

  /**
   * Tamanho do alvo.
   * @default 'md'
   */
  size?: UjnIconButtonSize;

  /**
   * Estado de alternância (salvar, tema escuro). Quando definido, vira
   * `aria-pressed`, o glifo passa a preenchido e o botão ganha o roxo de destaque.
   */
  pressed?: boolean;

  /**
   * Contagem exibida num selo no canto (por exemplo, matérias salvas). Valores
   * acima de 99 aparecem como “99+”; o número entra no nome acessível. Com 0 ou
   * sem a prop, nada é exibido.
   */
  badge?: number;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
