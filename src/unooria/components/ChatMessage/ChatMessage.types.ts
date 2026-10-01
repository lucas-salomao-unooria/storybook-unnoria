import type React from 'react';
import type { UnooriaTheme } from '../../tokens';

/** Quem escreveu: o professor (balão à direita) ou o agente (texto com o mascote). */
export type ChatMessageAuthor = 'professor' | 'agente';

/**
 * Em que pé está a mensagem.
 * - `enviando`: do professor, a caminho; do agente, antes do primeiro trecho
 *   (mostra o `TypingIndicator` quando ainda não há conteúdo).
 * - `transmitindo`: o agente está escrevendo — o conteúdo cresce por trechos.
 * - `pronta`: terminada.
 * - `erro`: não saiu (professor) ou parou no meio (agente). Mostra `erro` e,
 *   com `onRetry`, o botão de tentar de novo.
 */
export type ChatMessageStatus = 'enviando' | 'transmitindo' | 'pronta' | 'erro';

/**
 * Uma fonte citada pela resposta. Vira "Título, p. 12–13" (as duas páginas),
 * "Título, p. 12" (uma, ou as duas iguais) ou só "Título".
 */
export interface ChatMessageSource {
  titulo: string;
  paginaInicio?: number;
  paginaFim?: number;
}

/**
 * Propriedades do `ChatMessage`, uma mensagem da conversa com o agente de IA do
 * professor.
 */
export interface ChatMessageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Quem escreveu. */
  autor: ChatMessageAuthor;

  /**
   * O conteúdo, já renderizado pelo produto. Do agente, em geral um
   * `RichContent` com a saída do react-markdown; do professor, texto.
   */
  children?: React.ReactNode;

  /**
   * Em que pé está a mensagem.
   * @default 'pronta'
   */
  estado?: ChatMessageStatus;

  /** As fontes da resposta, numa linha "Fontes: …" abaixo do conteúdo. */
  fontes?: ChatMessageSource[];

  /**
   * Um aviso curto sobre a resposta ("Confira as datas com o calendário da
   * rede."), com o ícone de atenção, abaixo do conteúdo.
   */
  aviso?: React.ReactNode;

  /**
   * O texto do erro, com `estado="erro"`.
   * Sem ele: "Não foi possível gerar a resposta." (agente) ou "Não foi possível
   * enviar a mensagem." (professor).
   */
  erro?: React.ReactNode;

  /** Com `estado="erro"`, mostra o botão "Tentar de novo". */
  onRetry?: () => void;

  /**
   * Rótulo do botão de tentar de novo.
   * @default 'Tentar de novo'
   */
  retryLabel?: string;

  /**
   * Nome da mensagem para o leitor de tela (o `aria-label` do `<article>`).
   * Sem ele: "Você" (professor) ou "Agente de IA do professor" (agente).
   */
  authorLabel?: string;

  /**
   * Rótulo da linha de fontes.
   * @default 'Fontes'
   */
  sourcesLabel?: string;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}
