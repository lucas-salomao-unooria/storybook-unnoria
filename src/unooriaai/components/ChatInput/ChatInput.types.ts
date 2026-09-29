import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do componente `ChatInput` do Design System UnooriaAI.
 *
 * O compositor de mensagem que ancora a base de todas as telas de conversa.
 */
export interface UaiChatInputProps
  extends Omit<
    React.HTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'children' | 'defaultValue'
  > {
  /**
   * Texto do campo (uso controlado). O campo só é controlado quando esta prop
   * é passada.
   */
  value?: string;

  /**
   * Texto inicial do campo em modo não controlado.
   */
  defaultValue?: string;

  /**
   * Notifica cada alteração do texto.
   */
  onValueChange?: (value: string) => void;

  /**
   * Texto do placeholder.
   * @default 'Escreva uma mensagem'
   */
  placeholder?: string;

  /**
   * Chamado ao acionar o botão de envio ou pressionar `Enter`, com o texto
   * atual do campo.
   */
  onSend?: (value: string) => void;

  /**
   * Glifo do botão de envio. Por padrão, o ícone `arrowUpward` da biblioteca
   * de ícones do módulo, em 20px.
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
   * 600px.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
