import React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Tom do diálogo.
 * - 'default': confirmação comum ("Criar", "Salvar")
 * - 'danger': ação destrutiva ("Excluir", "Apagar tudo") — vira `alertdialog`
 */
export type UglConfirmDialogTone = 'default' | 'danger';

/**
 * Propriedades do componente ConfirmDialog da Unoogaleria.
 */
export interface UglConfirmDialogProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'title' | 'children' | 'onSubmit'> {
  /**
   * Diálogo aberto. Fechado, o componente não renderiza nada.
   */
  open: boolean;

  /**
   * Pergunta do diálogo. Nomeia o diálogo (`aria-labelledby`).
   */
  title: React.ReactNode;

  /**
   * Consequência da ação. Descreve o diálogo (`aria-describedby`).
   */
  description?: React.ReactNode;

  /**
   * Rótulo da ação de confirmação.
   * @default 'Confirmar'
   */
  confirmLabel?: string;

  /**
   * Rótulo da ação de cancelar.
   * @default 'Cancelar'
   */
  cancelLabel?: string;

  /**
   * Tom do diálogo. 'danger' pinta a confirmação de vermelho, usa
   * `role="alertdialog"` e abre com o foco em "Cancelar".
   * @default 'default'
   */
  tone?: UglConfirmDialogTone;

  /**
   * Confirmação: botão de confirmar ou Enter num campo do `children`.
   */
  onConfirm: () => void;

  /**
   * Cancelamento: botão de cancelar ou Esc. O toque no véu NÃO cancela.
   */
  onCancel: () => void;

  /**
   * Conteúdo entre a descrição e as ações — por exemplo, o campo de nome de
   * "Novo álbum". No tom 'default', o primeiro campo recebe o foco ao abrir.
   */
  children?: React.ReactNode;

  /**
   * Desabilita a confirmação (campo obrigatório vazio).
   * @default false
   */
  confirmDisabled?: boolean;

  /**
   * Operação em andamento: as duas ações ficam indisponíveis, sem perder o foco,
   * e o Esc deixa de cancelar.
   * @default false
   */
  busy?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
