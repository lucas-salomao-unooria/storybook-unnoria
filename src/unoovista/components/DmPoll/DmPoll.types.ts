import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Uma opção da enquete.
 */
export interface UnvDmPollOption {
  /** Identificador devolvido em `onVote`. */
  id: string;
  /** Texto da opção. */
  label: React.ReactNode;
}

/**
 * Propriedades do componente DmPoll do Unoovista.
 *
 * Extensão do módulo: a enquete dentro da conversa aberta.
 *
 * **Não mostra contagem nem porcentagem, e não sabe se uma opção é "certa"** —
 * devolve só o `id`: quem vota não vê a escolha dos
 * outros, e a correção, se houver, é do servidor.
 *
 * Voto único. Depois dele, as opções travam e aparece `sentLabel`.
 * - `value` ausente (`undefined`): a enquete guarda o voto sozinha e trava no
 *   primeiro toque.
 * - `value` informado: controlada. Uma string é o voto já enviado (a enquete
 *   reabre travada depois de um F5); `null` é "ainda não votou" — o toque chama
 *   `onVote` e a enquete só trava quando o produto devolver o `id` em `value`.
 */
export interface UnvDmPollProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** A pergunta. Vira o nome acessível do grupo de opções. */
  question: React.ReactNode;

  /** As opções, na ordem em que aparecem. */
  options: UnvDmPollOption[];

  /** O `id` votado, `null` para "ainda não votou" ou ausente para não controlada. */
  value?: string | null;

  /** Chamado com o `id` escolhido, uma única vez por voto. */
  onVote?: (id: string) => void;

  /**
   * Trava as opções sem ter votado.
   * @default false
   */
  disabled?: boolean;

  /**
   * Confirmação exibida depois do voto.
   * @default 'Resposta enviada ✓'
   */
  sentLabel?: React.ReactNode;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /** Classe CSS adicional. */
  className?: string;
}
