import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Variantes da etiqueta (quadro `6:59`, estrutura herdada).
 * - 'outline': contorno sobre a superfície, texto de destaque — categoria
 * - 'accent': preenchimento de campo e texto de destaque — selo de ênfase
 * - 'neutral': superfície sutil e texto secundário — metadado
 */
export type UjnTagVariant = 'outline' | 'accent' | 'neutral';

/**
 * Tamanhos da etiqueta.
 * - 'sm': 20px de altura
 * - 'md': 24px de altura
 */
export type UjnTagSize = 'sm' | 'md';

/**
 * Propriedades do componente Tag da Unoojornal.
 *
 * O elemento depende das props: com `href` é um link (`<a>`); com `onClick`,
 * um botão (`<button>`); sem nenhum dos dois, um `<span>` informativo.
 */
export interface UjnTagProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'children'> {
  /**
   * Variante visual.
   * @default 'outline'
   */
  variant?: UjnTagVariant;

  /**
   * Tamanho.
   * @default 'md'
   */
  size?: UjnTagSize;

  /**
   * Destino. Faz da etiqueta um link.
   */
  href?: string;

  /**
   * Ação de clique. Faz da etiqueta um botão (quando não há `href`).
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * Etiqueta interativa desabilitada: o botão fica `disabled`; o link perde o
   * `href` e ganha `aria-disabled`. Sem efeito num `<span>` informativo.
   * @default false
   */
  disabled?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Texto da etiqueta.
   */
  children: React.ReactNode;
}
