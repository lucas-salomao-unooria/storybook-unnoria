import React from 'react';
import type { UblIconName } from '../Icon';
import type { UblTheme } from '../../tokens';

/**
 * Variantes do botão de glifo.
 * - 'ghost': só o glifo, sobre a superfície (barras e linhas)
 * - 'filled': glifo no roxo de texto sobre o preenchimento de campo
 * - 'outline': glifo com contorno de 1px em `border-control` (≥ 3:1)
 */
export type UblIconButtonVariant = 'ghost' | 'filled' | 'outline';

/**
 * Tamanhos do alvo (sempre circular, com a mesma aresta nos dois eixos).
 * - 'sm': 32px (dentro de campos e cartões; o alvo de toque continua com 44px)
 * - 'md': 44px (padrão, alvo mínimo de toque)
 * - 'lg': 56px (ações de destaque)
 */
export type UblIconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente IconButton da Unooblog.
 */
export interface UblIconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Glifo do registro.
   */
  icon: UblIconName;

  /**
   * Nome acessível. Obrigatório: um botão só com glifo não tem outro nome.
   * Também vira a dica de ferramenta (`title`).
   */
  label: string;

  /**
   * Variante visual.
   * @default 'ghost'
   */
  variant?: UblIconButtonVariant;

  /**
   * Tamanho do alvo.
   * @default 'md'
   */
  size?: UblIconButtonSize;

  /**
   * Estado de alternância (salvar, curtir, tema escuro). Quando definido, vira
   * `aria-pressed`, o glifo passa a preenchido e o botão ganha o roxo de destaque.
   */
  pressed?: boolean;

  /**
   * Contagem exibida num selo no canto (por exemplo, posts salvos). Valores
   * acima de 99 aparecem como “99+”; o número entra no nome acessível. Com 0 ou
   * sem a prop, nada é exibido.
   */
  badge?: number;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
