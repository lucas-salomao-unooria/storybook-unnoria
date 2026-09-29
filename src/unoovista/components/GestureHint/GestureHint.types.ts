import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * O gesto demonstrado.
 * - 'swipe-up': rolar o feed (o dedo sobe).
 * - 'swipe-left': passar ao próximo item de um carrossel.
 * - 'tap': tocar num ponto (um pulso no lugar).
 */
export type UnvGestureHintGesture = 'swipe-up' | 'swipe-left' | 'tap';

/**
 * Propriedades do componente GestureHint do Unoovista.
 *
 * Extensão: a marca translúcida de toque que demonstra um gesto uma vez, como
 * nas dicas de primeiro uso. **Decorativa** (`aria-hidden`): o que
 * ela ensina precisa estar também em texto na tela.
 *
 * Posiciona-se contra o contêiner posicionado mais próximo (`position:
 * relative`). Com `prefers-reduced-motion: reduce` ela não aparece — e
 * `onEnd` não é chamado, porque não há animação para terminar.
 */
export interface UnvGestureHintProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * O gesto demonstrado.
   * @default 'swipe-up'
   */
  gesture?: UnvGestureHintGesture;

  /**
   * Quantas vezes o gesto se repete. A dica é para ser vista, não para ficar
   * piscando: o padrão é uma.
   * @default 1
   */
  iterations?: number;

  /** Chamado quando a última repetição termina — para o consumidor desmontar a dica. */
  onEnd?: () => void;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem ele, o
   * componente herda o tema do contêiner.
   */
  theme?: UnvTheme;

  /** Classe CSS adicional. */
  className?: string;
}
