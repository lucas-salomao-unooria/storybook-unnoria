import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `ChatInput` do Design System ChatGPT.
 *
 * Reproduz o componente `ChatInput` do Figma — o compositor de mensagem que
 * ancora a base de todas as telas de conversa.
 */
export interface GptChatInputProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  /**
   * Texto do campo (uso controlado).
   */
  value?: string;

  /**
   * Notifica cada alteração do texto.
   */
  onValueChange?: (value: string) => void;

  /**
   * Texto do placeholder.
   * @default 'Type message'
   */
  placeholder?: string;

  /**
   * Chamado ao acionar o botão de envio ou pressionar `Enter`, com o texto
   * atual do campo.
   */
  onSend?: (value: string) => void;

  /**
   * Glifo do botão de envio. O arquivo usa `↑` (`gptGlyphs.send`).
   */
  sendGlyph?: React.ReactNode;

  /**
   * Rótulo acessível do botão de envio.
   * @default 'Enviar mensagem'
   */
  sendLabel?: string;

  /**
   * Desabilita o campo e o botão de envio.
   * @default false
   */
  disabled?: boolean;

  /**
   * Torna o campo somente leitura — útil em vitrines de documentação.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Ocupa toda a largura disponível. Quando `false`, mantém a largura de
   * 600px do arquivo de design.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
