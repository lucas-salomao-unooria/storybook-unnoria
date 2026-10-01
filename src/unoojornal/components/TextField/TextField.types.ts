import React from 'react';
import type { UjnIconName } from '../Icon';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente TextField da Unoojornal.
 *
 * Os atributos nativos (`name`, `placeholder`, `autoComplete`, `inputMode`,
 * `disabled`, `aria-*`…) vão para o `<input>`, que é também quem recebe a `ref`;
 * `className`, `style` e `theme` vão para o invólucro. Para texto longo, use o
 * `TextArea`.
 */
export interface UjnTextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'size' | 'maxLength' | 'minLength'
  > {
  /**
   * Rótulo do campo, ligado por `htmlFor`. Obrigatório: é o nome acessível.
   */
  label: React.ReactNode;

  /**
   * Texto de apoio abaixo do campo ("Aparece junto da sua carta").
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
   * Glifo do registro à esquerda, dentro do campo.
   */
  iconStart?: UjnIconName;

  /**
   * Tipo do `<input>`.
   * @default 'text'
   */
  type?: React.HTMLInputTypeAttribute;

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
