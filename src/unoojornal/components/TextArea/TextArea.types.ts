import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente TextArea da Unoojornal.
 *
 * Os atributos nativos (`name`, `placeholder`, `disabled`, `aria-*`…) vão para o
 * `<textarea>`, que é também quem recebe a `ref`; `className`, `style` e `theme`
 * vão para o invólucro. Os atributos nativos `minLength` e `maxLength` não são
 * aceitos: medem unidades UTF-16 e cortariam um emoji ao meio. O limite é
 * `maxLength`, contado em code points.
 */
export interface UjnTextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'defaultValue' | 'maxLength' | 'minLength' | 'rows'
  > {
  /**
   * Rótulo do campo, ligado por `htmlFor`. Obrigatório: é o nome acessível.
   */
  label: React.ReactNode;

  /**
   * Texto de apoio abaixo do campo.
   */
  hint?: React.ReactNode;

  /**
   * Mensagem de erro. Substitui o texto de apoio, liga `aria-invalid` e entra no
   * `aria-describedby`, com glifo e texto — nunca só a cor.
   */
  error?: React.ReactNode;

  /**
   * Texto (modo controlado). Só é repassado ao elemento nativo quando definido
   * (AGENTS.md, 4.5.1); sem ele, o texto mora no DOM.
   */
  value?: string;

  /**
   * Texto inicial (modo não controlado).
   */
  defaultValue?: string;

  /**
   * Linhas visíveis da área de texto.
   * @default 4
   */
  rows?: number;

  /**
   * Limite de caracteres, contado em **code points** (um emoji conta um). O texto
   * que passa do limite — digitado ou colado — é cortado no limite, e um valor
   * controlado que já chega acima dele marca o campo como inválido. Implica
   * `showCount`, a não ser que `showCount` seja `false`.
   */
  maxLength?: number;

  /**
   * Exibe o contador de caracteres (em code points). Sem `maxLength`, mostra só
   * a contagem.
   * @default true quando há `maxLength`
   */
  showCount?: boolean;

  /**
   * Campo obrigatório: liga o atributo nativo e acrescenta o asterisco ao rótulo.
   */
  required?: boolean;

  /**
   * Id do campo. Sem ele, usa `useId`; o do consumidor vence.
   */
  id?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
