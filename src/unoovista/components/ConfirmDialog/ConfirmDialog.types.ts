import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Tom da ação de confirmação.
 * - 'default': cápsula preenchida em roxo de ação (`--unv-color-action-primary`)
 * - 'destructive': cápsula preenchida no vermelho de alerta (`--unv-color-brand-like`)
 */
export type UnvConfirmDialogTone = 'default' | 'destructive';

/**
 * Propriedades do componente ConfirmDialog do Unoovista.
 *
 * Extensão do módulo: o diálogo de confirmação ("Descartar publicação?").
 *
 * Controlado: quem decide se o diálogo está aberto é o produto. Fechado, não
 * renderiza nada.
 */
export interface UnvConfirmDialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Abre o alerta.
   */
  open: boolean;

  /**
   * Título do alerta. É o nome acessível do `alertdialog`.
   */
  title: React.ReactNode;

  /**
   * Mensagem de apoio. É a descrição acessível do `alertdialog`.
   */
  message?: React.ReactNode;

  /**
   * Rótulo da ação de confirmação, a da direita.
   */
  confirmLabel: React.ReactNode;

  /**
   * Rótulo da ação de cancelar, a da esquerda; recebe o foco ao abrir.
   */
  cancelLabel: React.ReactNode;

  /**
   * Chamado ao confirmar.
   */
  onConfirm: () => void;

  /**
   * Chamado ao cancelar: botão "Cancelar" ou ESC. O toque no véu NÃO cancela,
   * para que um toque perdido não descarte a decisão.
   */
  onCancel: () => void;

  /**
   * Tom da ação de confirmação.
   * @default 'default'
   */
  tone?: UnvConfirmDialogTone;

  /**
   * Operação em andamento: as duas ações e o ESC ficam travados, o alerta
   * declara `aria-busy` e continua com o foco onde estava.
   * @default false
   */
  busy?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
