import React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Variantes do campo.
 * - 'default': sobre as superfícies do tema (folhas, diálogos, telas)
 * - 'immersive': sobre a superfície imersiva do visualizador e do editor,
 *   invariante entre temas
 */
export type UglTextFieldVariant = 'default' | 'immersive';

/**
 * Elemento nativo do campo: `<input>` ou, com `multiline`, `<textarea>`.
 */
export type UglTextFieldElement = HTMLInputElement | HTMLTextAreaElement;

/**
 * Propriedades do componente TextField da Unoogaleria.
 *
 * Os atributos nativos (`name`, `required`, `autoComplete`, `inputMode`,
 * `aria-*`…) vão para o `<input>` ou `<textarea>`, que é também quem recebe a
 * `ref`; `className`, `style` e `theme` vão para o invólucro.
 */
export interface UglTextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'maxLength' | 'size' | 'placeholder'
  > {
  /**
   * Rótulo do campo, ligado por `htmlFor`. Obrigatório: é o nome acessível.
   */
  label: string;

  /**
   * Esconde o rótulo visualmente, mantendo-o para o leitor de tela.
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Texto (modo controlado). Só é repassado ao elemento nativo quando definido
   * (AGENTS.md, 4.5.1).
   */
  value?: string;

  /**
   * Texto inicial (modo não controlado: o texto mora no DOM).
   */
  defaultValue?: string;

  /**
   * Chamado a cada alteração, com o texto novo e o evento.
   */
  onChange?: (value: string, event: React.ChangeEvent<UglTextFieldElement>) => void;

  /**
   * Texto do campo vazio.
   */
  placeholder?: string;

  /**
   * Usa `<textarea>` em vez de `<input>` (legendas, descrições).
   * @default false
   */
  multiline?: boolean;

  /**
   * Linhas visíveis da área de texto.
   * @default 3
   */
  rows?: number;

  /**
   * Limite de caracteres, contado em **code points** (um emoji conta um). Exibe
   * o contador e marca o campo como inválido quando o texto passa do limite;
   * não usa o atributo nativo `maxLength`, que conta unidades UTF-16.
   */
  maxLength?: number;

  /**
   * Texto de apoio abaixo do campo.
   */
  helperText?: string;

  /**
   * Mensagem de erro. Substitui o texto de apoio, liga `aria-invalid` e entra no
   * `aria-describedby`.
   */
  error?: string;

  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UglTextFieldVariant;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
