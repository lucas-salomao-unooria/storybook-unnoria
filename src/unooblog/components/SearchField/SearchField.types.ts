import React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Propriedades do componente SearchField da Unooblog.
 *
 * Os atributos nativos do campo (`name`, `disabled`, `autoComplete`,
 * `inputMode`, `aria-*`…) vão para o `<input>`, que é também quem recebe a
 * `ref`; `className`, `style` e `theme` vão para o `<form role="search">`.
 */
export interface UblSearchFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onSubmit'
    | 'type'
    | 'size'
    | 'placeholder'
    | 'className'
    | 'style'
  > {
  /**
   * Texto da busca (modo controlado). Só é repassado ao `<input>` quando
   * definido (AGENTS.md, 4.5.1).
   */
  value?: string;

  /**
   * Texto inicial (modo não controlado: o texto mora no DOM).
   */
  defaultValue?: string;

  /**
   * Chamado a cada alteração do texto — inclusive quando o botão de limpar (ou
   * Esc) esvazia o campo —, com o texto novo.
   */
  onValueChange?: (value: string) => void;

  /**
   * Chamado com o texto atual quando a pessoa confirma a busca (Enter ou botão
   * da lupa).
   */
  onSubmit?: (value: string) => void;

  /**
   * Texto do campo vazio.
   * @default 'Buscar no blog'
   */
  placeholder?: string;

  /**
   * Nome acessível do campo e do botão de confirmar. O rótulo fica oculto à
   * vista (o campo tem lupa e texto de apoio) e visível ao leitor de tela.
   * @default 'Buscar'
   */
  label?: string;

  /**
   * Exibe o botão de limpar quando há texto.
   * @default true
   */
  clearable?: boolean;

  /**
   * Nome acessível do botão de limpar.
   * @default 'Limpar busca'
   */
  clearLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional (no `<form role="search">`).
   */
  className?: string;

  /**
   * Estilo em linha (no `<form role="search">`).
   */
  style?: React.CSSProperties;
}
