import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Uma opção da enquete de escolha única.
 */
export interface UaiChoicePollOption {
  /** Identificador devolvido em `onVote`. */
  id: string;
  /** Texto da opção. Pode ocupar duas ou três linhas: a opção cresce e quebra. */
  label: React.ReactNode;
}

/**
 * Propriedades do componente `ChoicePoll` do Design System UnooriaAI.
 *
 * Extensão do módulo: a enquete de escolha única que encerra uma resposta —
 * uma pergunta, opções em frases inteiras, um voto.
 *
 * **Não mostra contagem nem porcentagem, e não sabe se uma opção é "certa"** —
 * devolve só o `id`: quem responde não vê a escolha dos outros, e a correção,
 * se houver, é do servidor.
 *
 * Voto único. Depois dele, as opções travam e aparece `sentLabel`.
 * - `value` ausente (`undefined`): a enquete guarda o voto sozinha e trava no
 *   primeiro toque.
 * - `value` informado: controlada. Uma string é o voto já enviado (a enquete
 *   reabre travada depois de recarregar a página); `null` é "ainda não
 *   respondeu" — o toque chama `onVote` e a enquete só trava quando o produto
 *   devolver o `id` em `value`. Enquanto o envio estiver em curso, passe
 *   `disabled` para impedir um segundo voto.
 */
export interface UaiChoicePollProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** A pergunta. Vira o nome acessível do grupo de opções. */
  question: React.ReactNode;

  /** As opções, na ordem em que aparecem. */
  options: UaiChoicePollOption[];

  /** O `id` votado, `null` para "ainda não respondeu" ou ausente para não controlada. */
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
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral (`data-uai-theme`).
   */
  theme?: UaiTheme;

  /** Classe CSS adicional. */
  className?: string;
}
