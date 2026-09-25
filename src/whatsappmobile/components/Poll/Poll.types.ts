import React from 'react';

/**
 * Uma opção da enquete.
 */
export interface WaPollOption {
  /** Identificador devolvido em `onChange`. */
  id: string;
  /** Texto da opção. */
  label: React.ReactNode;
}

/**
 * Propriedades do componente Poll do WhatsApp Mobile.
 *
 * Extensão: a enquete da conversa. O arquivo de origem não a publica; os
 * controles são o `Radio` do diálogo.
 *
 * Controlado de ponta a ponta: quem guarda a opção marcada e o fato de já ter
 * votado é o produto. A enquete não sabe se uma opção é "certa" — e não deve:
 * o que ela devolve é só o `id` escolhido.
 */
export interface WaPollProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** A pergunta. Vira o nome acessível do grupo de opções. */
  question: React.ReactNode;
  /** Linha de apoio abaixo da pergunta, como "Selecione uma opção". */
  hint?: React.ReactNode;
  /** As opções, na ordem em que aparecem. */
  options: WaPollOption[];
  /** O `id` da opção marcada, ou `null`. */
  value?: string | null;
  /** Callback ao marcar uma opção. */
  onChange?: (id: string) => void;
  /** Callback do botão de votar. Só é acionável com uma opção marcada. */
  onVote?: () => void;
  /**
   * O voto já foi enviado: as opções congelam e o botão dá lugar a `votedLabel`.
   * @default false
   */
  voted?: boolean;
  /**
   * Rótulo do botão de votar.
   * @default 'Votar'
   */
  voteLabel?: React.ReactNode;
  /**
   * Texto exibido no lugar do botão depois do voto.
   * @default 'Voto enviado'
   */
  votedLabel?: React.ReactNode;
  /**
   * Congela as opções e o botão sem ter votado.
   * @default false
   */
  disabled?: boolean;
  /** Nome do grupo de rádios. Ausente, um identificador único é gerado. */
  name?: string;
  /** Classe CSS adicional. */
  className?: string;
}
