import React from 'react';
import type { UglEditState, UglFilterId } from '../../media';
import type { UglTheme } from '../../tokens';

/**
 * Propriedades do componente FilterPicker da Unoogaleria.
 */
export interface UglFilterPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  /**
   * Imagem usada nas amostras — a mesma foto que está sendo editada.
   */
  src: string;

  /**
   * Descrição da foto. As amostras são decorativas (o nome de cada opção é o do
   * filtro); o `alt` vira a descrição do grupo ("Amostras de: …").
   */
  alt: string;

  /**
   * Filtro escolhido.
   */
  value: UglFilterId;

  /**
   * Chamado ao escolher outro filtro, por toque ou pelas setas.
   */
  onChange: (id: UglFilterId) => void;

  /**
   * Intensidade aplicada à amostra do filtro escolhido, de 0 a 100. As outras
   * amostras mostram o filtro em intensidade total, para que a comparação seja
   * justa.
   * @default 100
   */
  intensity?: number;

  /**
   * Edição em curso. Os ajustes finos, a rotação, o espelho e o endireitamento
   * entram em todas as amostras, para que cada uma mostre o resultado real.
   */
  edit?: UglEditState;

  /**
   * Nome acessível do grupo.
   * @default 'Filtros'
   */
  ariaLabel?: string;

  /**
   * Força o tema visual. As cores do componente são as invariantes da
   * superfície imersiva, então o tema só afeta o que for herdado.
   */
  theme?: UglTheme;
}
