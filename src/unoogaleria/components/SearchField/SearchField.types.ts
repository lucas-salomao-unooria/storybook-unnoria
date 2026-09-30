import React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Propriedades do componente SearchField da Unoogaleria.
 *
 * Os atributos nativos (`name`, `disabled`, `autoComplete`, `inputMode`,
 * `aria-*`…) vão para o `<input>`, que é também quem recebe a `ref`;
 * `className`, `style` e `theme` vão para o invólucro `role="search"`.
 */
export interface UglSearchFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'onSubmit' | 'type' | 'size' | 'placeholder'
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
   * Chamado a cada alteração do texto — inclusive quando o botão de limpar
   * esvazia o campo —, com o texto novo e o evento.
   */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Chamado com o texto atual quando a pessoa confirma a busca (Enter).
   */
  onSubmit?: (value: string) => void;

  /**
   * Chamado depois que o botão de limpar (ou Esc) esvazia o campo.
   */
  onClear?: () => void;

  /**
   * Texto do campo vazio.
   * @default 'Buscar fotos, lugares, pessoas'
   */
  placeholder?: string;

  /**
   * Nome acessível do campo.
   * @default 'Buscar na galeria'
   */
  ariaLabel?: string;

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
   * Foca o campo ao montar (a tela de busca acabou de abrir).
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Quando definido, exibe o botão de texto "Cancelar" à direita, fora do
   * campo, e Esc com o campo vazio também o chama.
   */
  onCancel?: () => void;

  /**
   * Rótulo do botão de cancelar.
   * @default 'Cancelar'
   */
  cancelLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
