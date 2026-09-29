import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Propriedades do componente StoryComposer do Unoovista.
 *
 * Extensão: o compositor de história com legenda — prévia, campo com contador
 * e a ação de envio.
 *
 * **Campo controlado só quando o consumidor passa `value`** (regra 4.5.1 do
 * AGENTS.md). Sem `value`, quem guarda o texto é o DOM, a partir de
 * `defaultValue`; o contador acompanha pelo `onChange`.
 */
export interface UnvStoryComposerProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit'> {
  /**
   * Texto da legenda. Informado, o campo é controlado.
   */
  value?: string;

  /**
   * Texto inicial quando `value` não é informado.
   */
  defaultValue?: string;

  /**
   * Chamado a cada alteração da legenda.
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Máximo de caracteres, contados em code points (um emoji é um). O campo
   * corta o excesso na digitação e o contador mostra "{n}/{maxLength}".
   */
  maxLength: number;

  /**
   * Mínimo de caracteres, contados em code points. Abaixo dele, o envio fica
   * desabilitado.
   */
  minLength?: number;

  /**
   * Texto de espera do campo.
   * @default 'Escreva uma legenda…'
   */
  placeholder?: string;

  /**
   * Nome acessível do campo.
   * @default 'Legenda da história'
   */
  label?: string;

  /**
   * Atributo `name` do campo, para quem lê o `FormData`.
   */
  name?: string;

  /**
   * Rótulo do botão de envio.
   * @default 'Sua história'
   */
  submitLabel?: React.ReactNode;

  /**
   * Chamado no envio com o texto da legenda.
   */
  onSubmit?: (value: string) => void;

  /**
   * Desabilita o envio — além do bloqueio automático abaixo de `minLength`.
   * @default false
   */
  submitDisabled?: boolean;

  /**
   * Avatar da pessoa no botão de envio.
   */
  avatarSrc?: string;

  /**
   * Prévia da história, acima da legenda (as mídias escolhidas, por exemplo).
   */
  children?: React.ReactNode;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem ele, o
   * componente herda o tema do contêiner.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
