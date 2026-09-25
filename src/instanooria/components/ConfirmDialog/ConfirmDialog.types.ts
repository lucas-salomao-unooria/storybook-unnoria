import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Tom da ação de confirmação.
 * - 'default': ação azul em peso forte (`--insta-color-action-primary`)
 * - 'destructive': ação vermelha em peso forte (`--insta-color-brand-like`) —
 *   e o alerta abre com o foco em "Cancelar"
 */
export type InstaConfirmDialogTone = 'default' | 'destructive';

/**
 * Propriedades do componente ConfirmDialog do Instanooria.
 *
 * Extensão: o alerta do iOS que o Instagram usa ("Descartar publicação?"). O
 * arquivo de origem não publica diálogo nenhum.
 *
 * Controlado: quem decide se o alerta está aberto é o produto. Fechado, não
 * renderiza nada.
 */
export interface InstaConfirmDialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
   * Rótulo da ação de confirmação, a primeira da pilha.
   */
  confirmLabel: React.ReactNode;

  /**
   * Rótulo da ação de cancelar, a última da pilha.
   */
  cancelLabel: React.ReactNode;

  /**
   * Chamado ao confirmar.
   */
  onConfirm: () => void;

  /**
   * Chamado ao cancelar: botão "Cancelar" ou ESC. O toque no véu NÃO cancela —
   * como no alerta do iOS.
   */
  onCancel: () => void;

  /**
   * Tom da ação de confirmação.
   * @default 'default'
   */
  tone?: InstaConfirmDialogTone;

  /**
   * Operação em andamento: as duas ações e o ESC ficam travados, o alerta
   * declara `aria-busy` e continua com o foco onde estava.
   * @default false
   */
  busy?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
