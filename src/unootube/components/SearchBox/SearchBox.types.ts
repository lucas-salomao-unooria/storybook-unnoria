import React from 'react';

/**
 * Propriedades da caixa de busca do Unootube.
 *
 * Reproduz o nó `Navigation/SearchBox` (`7:49`): 470×40 no total, formado pelo
 * campo de 362px, pelo botão de lupa de 64px e pelo botão circular de
 * microfone de 40px, separado por 4px do conjunto.
 */
export interface UniSearchBoxProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /**
   * Texto de espera do campo.
   * @default 'Search'
   */
  placeholder?: string;

  /**
   * Valor do campo. Informe junto de `onValueChange` para operar de forma
   * controlada.
   */
  value?: string;

  /**
   * Valor inicial no modo não controlado.
   */
  defaultValue?: string;

  /**
   * Chamado a cada digitação, com o novo valor do campo.
   */
  onValueChange?: (value: string) => void;

  /**
   * Chamado quando a busca é enviada, pelo botão de lupa ou por Enter.
   */
  onSearch?: (value: string) => void;

  /**
   * Chamado ao acionar o botão de microfone.
   */
  onVoiceSearch?: () => void;

  /**
   * Exibe o botão circular de busca por voz.
   * @default true
   */
  showVoiceSearch?: boolean;

  /**
   * Rótulo acessível do campo, usado como `aria-label`.
   * @default 'Buscar'
   */
  fieldLabel?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
