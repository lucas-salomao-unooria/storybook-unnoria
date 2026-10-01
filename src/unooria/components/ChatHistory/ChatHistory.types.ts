import type React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Uma conversa do histórico. `atualizadaEm` chega PRONTA ("Hoje, 14:32",
 * "29/09/2026"): o DS não formata data — quem formata, com o fuso da rede, é o
 * produto.
 */
export interface ChatHistoryItem {
  id: string;
  /** O título que o agente gerou para a conversa. */
  titulo: string;
  /** Quando a conversa mudou pela última vez, já formatado pelo produto. */
  atualizadaEm: string;
}

/**
 * Propriedades do `ChatHistory`, a lista de conversas com o agente de IA do
 * professor.
 */
export interface ChatHistoryProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** As conversas, na ordem em que devem aparecer (em geral, a mais recente primeiro). */
  items: ChatHistoryItem[];

  /** A conversa aberta agora: ganha destaque e `aria-current`. */
  activeId?: string;

  /** Abrir uma conversa. */
  onSelect?: (id: string) => void;

  /**
   * Excluir uma conversa — chamado só DEPOIS da confirmação na própria linha
   * (dois passos, sem diálogo). Sem ele, a lista não mostra o botão de excluir.
   */
  onDelete?: (id: string) => void;

  /**
   * Carregando: três linhas-esqueleto e o aviso "Carregando conversas…" para o
   * leitor de tela.
   * @default false
   */
  loading?: boolean;

  /**
   * Nome da navegação.
   * @default 'Histórico de conversas'
   */
  label?: string;

  /** @default 'Nenhuma conversa ainda' */
  emptyTitle?: React.ReactNode;

  /** @default 'As conversas com o agente de IA do professor aparecem aqui.' */
  emptyDescription?: React.ReactNode;

  /** @default 'Carregando conversas…' */
  loadingLabel?: string;

  /** @default 'Excluir esta conversa?' */
  confirmQuestion?: string;

  /** @default 'Excluir' */
  confirmLabel?: string;

  /** @default 'Cancelar' */
  cancelLabel?: string;

  /**
   * Nome do botão de excluir de cada linha, a partir do título.
   * @default (titulo) => `Excluir a conversa “${titulo}”`
   */
  deleteLabel?: (titulo: string) => string;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}
