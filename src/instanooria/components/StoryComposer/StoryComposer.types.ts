import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Propriedades do componente StoryComposer do Instanooria.
 *
 * Extensão: o compositor de Story com legenda. O arquivo de origem publica só o
 * VISUALIZADOR de Story (`0:543` / `0:2236`); o compositor vem do app real,
 * com a barra inferior de 94px e a pílula de 43px do visualizador.
 *
 * **Campo controlado só quando o consumidor passa `value`** (seção 4.5.1 do
 * AGENTS.md). Sem `value`, quem guarda o texto é o DOM, a partir de
 * `defaultValue`; o contador acompanha pelo `onChange`.
 */
export interface InstaStoryComposerProps
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
   * Máximo de caracteres. O campo não aceita além dele e o contador mostra
   * "{n}/{maxLength}".
   */
  maxLength: number;

  /**
   * Mínimo de caracteres. Abaixo dele, o envio fica desabilitado.
   */
  minLength?: number;

  /**
   * Texto de espera do campo.
   * @default 'Escreva uma legenda…'
   */
  placeholder?: string;

  /**
   * Nome acessível do campo.
   * @default 'Legenda do story'
   */
  label?: string;

  /**
   * Atributo `name` do campo, para quem lê o `FormData`.
   */
  name?: string;

  /**
   * Rótulo do botão de envio.
   * @default 'Seu story'
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
   * Avatar da pessoa no botão "Seu story".
   */
  avatarSrc?: string;

  /**
   * Prévia do Story, acima da legenda (as mídias escolhidas, por exemplo).
   */
  children?: React.ReactNode;

  /**
   * Tema visual usado para resolver as variáveis de cor. Como o
   * `StoryViewer`, o compositor é imersivo e nasce escuro.
   * @default 'dark'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
