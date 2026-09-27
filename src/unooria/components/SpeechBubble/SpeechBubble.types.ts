import type { HTMLAttributes, ReactNode } from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Quem fala.
 * - `guide`: o guia da missão (no Jornal da Escola, o Bento, colega editor) —
 *   balão com destaque de marca e o anel em gradiente no avatar.
 * - `reader`: um leitor que reage (a família no portão, o professor, a
 *   secretaria) — balão neutro.
 */
export type SpeechBubbleTone = 'guide' | 'reader';

/**
 * Como o LEITOR recebeu a edição. Vale só para `tone="reader"`: o guia não
 * tem humor, ele conduz.
 * - `neutral`: sem acento.
 * - `upset`: acento de aviso e o ícone `sentiment_dissatisfied`.
 * - `happy`: acento de sucesso e o ícone `sentiment_satisfied`.
 *
 * O humor nunca é só cor: o ícone muda de forma e tem nome acessível.
 */
export type SpeechBubbleMood = 'neutral' | 'upset' | 'happy';

/** De que lado ficam o avatar e a ponta do balão. */
export type SpeechBubbleSide = 'start' | 'end';

/**
 * Propriedades do componente SpeechBubble da Plataforma Unooria.
 *
 * O balão de fala da redação: um avatar, o nome de quem fala e a fala, numa
 * nuvem com ponta apontando para o avatar.
 */
export interface SpeechBubbleProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** O nome de quem fala, visível acima da fala. Nomeia a figura. */
  speaker: ReactNode;

  /** A fala. */
  children: ReactNode;

  /**
   * Guia (destaque de marca) ou leitor (neutro).
   * @default 'reader'
   */
  tone?: SpeechBubbleTone;

  /**
   * O humor do leitor; ignorado para o guia.
   * @default 'neutral'
   */
  mood?: SpeechBubbleMood;

  /**
   * O nome acessível do ícone de humor. Sem ele, "Não gostou" (`upset`) ou
   * "Gostou" (`happy`) — palavras de criança, sem gênero, que servem para a
   * família, o professor e a secretaria.
   */
  moodLabel?: string;

  /** A foto de quem fala. */
  avatarSrc?: string;

  /**
   * As iniciais no avatar, quando não há foto. Sem elas, saem do `speaker`
   * quando ele é texto ("Família no portão" → "FP").
   */
  avatarInitials?: string;

  /**
   * O lado do avatar e da ponta do balão. `end` serve para alternar vozes numa
   * conversa; o texto continua alinhado ao início.
   * @default 'start'
   */
  side?: SpeechBubbleSide;

  /**
   * Um slot à direita do nome — na missão, o botão de ouvir a fala quando há
   * gravação. No DOM ele vem DEPOIS da fala: quem ouve pelo leitor de tela
   * escuta a fala e só então encontra o botão que a repete.
   */
  action?: ReactNode;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
