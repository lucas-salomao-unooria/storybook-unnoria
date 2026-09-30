import React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Variantes do botão de glifo.
 * - 'plain': só o glifo, sobre a superfície (barras e linhas)
 * - 'tinted': glifo no roxo de ação sobre o preenchimento de campo
 * - 'immersive': círculo translúcido sobre a mídia e a superfície imersiva
 * - 'bar': glifo branco sem fundo — ações do visualizador sobre a barra imersiva
 */
export type UglIconButtonVariant = 'plain' | 'tinted' | 'immersive' | 'bar';

/**
 * Tamanhos do alvo (sempre quadrado).
 * - 'sm': 32px (dentro de campos e selos)
 * - 'md': 44px (padrão, alvo mínimo de toque)
 * - 'lg': 56px (reproduzir no centro do vídeo)
 */
export type UglIconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente IconButton da Unoogaleria.
 */
export interface UglIconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Glifo do registro.
   */
  icon: UglIconName;

  /**
   * Nome acessível. Obrigatório: um botão só com glifo não tem outro nome.
   */
  label: string;

  /**
   * Variante visual.
   * @default 'plain'
   */
  variant?: UglIconButtonVariant;

  /**
   * Tamanho do alvo.
   * @default 'md'
   */
  size?: UglIconButtonSize;

  /**
   * Estado de alternância (favoritar, som). Quando definido, vira `aria-pressed`.
   */
  pressed?: boolean;

  /**
   * Força o eixo `FILL` do glifo.
   */
  filled?: boolean;

  /**
   * Tom do glifo quando `pressed` — por exemplo, o coração de favorito.
   */
  pressedTone?: 'favorite' | 'accent';

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
