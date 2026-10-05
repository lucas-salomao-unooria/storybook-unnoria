import type React from 'react';
import type { UncSenderTone } from '../MessageBubble';

/**
 * Propriedades do `TypingIndicator` do Unoochat: o balão recebido com três
 * pontos — "fulano está digitando".
 */
export interface UncTypingIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Nome de quem está digitando, no topo do balão — como o `sender` do
   * `MessageBubble`, em conversa de grupo.
   */
  sender?: React.ReactNode;

  /**
   * Cor do nome do remetente, de 1 a 8 (`--unc-color-sender-*`). Use o mesmo
   * tom que a pessoa tem nos balões dela. Ausente, o nome fica em
   * `--unc-color-accent`.
   */
  senderTone?: UncSenderTone;

  /**
   * Desenha a cauda triangular na base do balão. Desligue quando o indicador
   * vier logo abaixo de outra mensagem da mesma pessoa.
   * @default true
   */
  tail?: boolean;

  /**
   * Nome acessível da região (`role="status"`). É também o texto que aparece
   * ao lado dos pontos com `prefers-reduced-motion: reduce`, quando eles param.
   * @default 'digitando'
   */
  'aria-label'?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
