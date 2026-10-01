import type React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Propriedades do `ChatComposer`, o campo em que o professor escreve para o
 * agente de IA do professor.
 *
 * Só texto — não há anexo. Os atributos de `<textarea>` que não estão aqui
 * (`name`, `id`, `autoFocus`, `onFocus`…) vão ao campo.
 */
export interface ChatComposerProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'defaultValue' | 'onChange' | 'maxLength' | 'rows' | 'children'
  > {
  /**
   * O texto, em modo controlado. **Só passe se for controlar**: sem `value`, o
   * DOM guarda o texto (seção 4.5.1 do AGENTS.md) e o preenchimento automático
   * do navegador não se perde.
   */
  value?: string;

  /** O texto inicial, em modo não controlado. */
  defaultValue?: string;

  /**
   * Chamado a cada mudança do texto — e com `''` depois de um envio, para o
   * modo controlado limpar o campo sem código a mais.
   */
  onValueChange?: (texto: string) => void;

  /**
   * Envio: Enter (sem Shift) ou o botão Enviar. Recebe o texto sem os espaços
   * das pontas; texto vazio não envia. Em modo não controlado o campo se
   * limpa sozinho.
   */
  onSend: (texto: string) => void;

  /** "Parar": interrompe a resposta que está chegando. Aparece com `transmitindo`. */
  onStop?: () => void;

  /**
   * O agente está respondendo: o botão Enviar vira "Parar" e o Enter não envia
   * (o texto que a pessoa já começou a escrever fica).
   * @default false
   */
  transmitindo?: boolean;

  /**
   * Desliga o campo e os botões.
   * @default false
   */
  disabled?: boolean;

  /** Limite de caracteres, com o contador "12/4.000" sob o campo. */
  maxLength?: number;

  /**
   * Até quantas linhas o campo cresce antes de rolar por dentro.
   * @default 6
   */
  maxRows?: number;

  /** @default 'Pergunte ao agente de IA do professor' */
  placeholder?: string;

  /**
   * Nome acessível do campo (não há rótulo visível: o placeholder não nomeia).
   * @default 'Mensagem para o agente de IA do professor'
   */
  label?: string;

  /** @default 'Enviar' */
  sendLabel?: string;

  /** @default 'Parar' */
  stopLabel?: string;

  /**
   * Instrução de teclado, lida como descrição do campo (não aparece na tela).
   * @default 'Enter envia. Shift + Enter quebra a linha.'
   */
  hint?: string;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe da raiz do compositor. */
  className?: string;

  /** Estilo da raiz do compositor. */
  style?: React.CSSProperties;
}
