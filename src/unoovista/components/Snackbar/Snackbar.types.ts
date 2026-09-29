import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Borda do contêiner em que o aviso aparece.
 */
export type UnvSnackbarPlacement = 'bottom' | 'top';

/**
 * Propriedades do componente Snackbar do Unoovista.
 *
 * Extensão: o aviso passageiro ("Link copiado", "Sem conexão com a internet"),
 * em cores INVERTIDAS — fundo na cor do texto, texto na cor da superfície.
 *
 * Flutua sobre o contêiner posicionado mais próximo (`position: relative`),
 * fora do fluxo: aparecer não empurra o conteúdo, e o dedo que mirava uma
 * publicação não erra o alvo. Fica sempre montado como região `role="status"`:
 * o leitor de tela anuncia o texto quando ele aparece.
 */
export interface UnvSnackbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Mostra o aviso. Falso, a região continua montada e vazia. */
  open: boolean;

  /** O texto do aviso. */
  message: React.ReactNode;

  /** Rótulo da ação opcional ("Desfazer", "Ver"). Sem `onAction`, não aparece. */
  actionLabel?: React.ReactNode;

  /** Chamado ao tocar a ação. */
  onAction?: () => void;

  /**
   * Fecha sozinho depois de tantos milissegundos, chamando `onClose`. Ausente,
   * o aviso fica até o consumidor fechar — é o caso de um estado que dura
   * (sem conexão), e não de uma confirmação.
   */
  duration?: number;

  /** Chamado quando `duration` se esgota. */
  onClose?: () => void;

  /**
   * Borda do contêiner.
   * @default 'bottom'
   */
  placement?: UnvSnackbarPlacement;

  /**
   * Distância da borda. O padrão deixa livre a doca de navegação (embaixo) ou
   * a barra superior (em cima).
   */
  offset?: number | string;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem ele, o
   * componente herda o tema do contêiner.
   */
  theme?: UnvTheme;

  /** Classe CSS adicional. */
  className?: string;
}
