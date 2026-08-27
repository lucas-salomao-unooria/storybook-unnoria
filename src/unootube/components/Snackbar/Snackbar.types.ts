import React from 'react';

/**
 * Tom do aviso.
 *
 * São só dois, e é deliberado. O Unootube publica **um** vermelho semântico
 * (`--uni-color-brand-primary`) e nenhum verde, âmbar ou azul de estado —
 * acrescentar uma escada de severidade exigiria inventar três famílias de cor
 * que nenhum dos dois arquivos de origem tem. Quando o produto precisar
 * distinguir sucesso de alerta, faça isso pelo texto.
 */
export type UniSnackbarVariant = 'default' | 'danger';

/**
 * Propriedades do aviso flutuante do Unootube.
 *
 * EXTENSÃO DECLARADA: nenhum dos dois arquivos de origem publica aviso
 * flutuante. A forma vem da superfície interativa `background/surface`, do
 * degrau `Elevation/Medium` — descrito no quadro `Elevation` (`106:3222`) como
 * "flutuante: menus suspensos e popovers" — e do degrau `Body/Medium`.
 */
export interface UniSnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controla a visibilidade. Fechado, o componente não renderiza nada.
   * @default true
   */
  open?: boolean;

  /** Texto do aviso. */
  message: React.ReactNode;

  /**
   * Tom do aviso.
   * @default 'default'
   */
  variant?: UniSnackbarVariant;

  /** Rótulo da ação à direita. Sem ele, nenhuma ação é renderizada. */
  actionLabel?: React.ReactNode;

  /** Chamado ao acionar a ação. */
  onAction?: () => void;

  /**
   * Fecha automaticamente após o número de milissegundos informado. `0`
   * desliga o fechamento automático.
   * @default 5000
   */
  duration?: number;

  /** Chamado quando o aviso se fecha, por tempo ou por ação. */
  onClose?: () => void;

  /**
   * Posiciona o aviso fixo na janela, no canto inferior esquerdo — a posição do
   * produto de origem. Sem isso, o aviso é um bloco em fluxo, útil para
   * documentação e para quem já tem uma região de avisos própria.
   * @default false
   */
  floating?: boolean;

  /**
   * Tema aplicado ao nó raiz. Como o aviso costuma ser renderizado fora da
   * árvore da tela, nem sempre herda o `data-uni-theme` do ancestral.
   */
  theme?: 'light' | 'dark';

  /** Classe CSS adicional. */
  className?: string;
}
