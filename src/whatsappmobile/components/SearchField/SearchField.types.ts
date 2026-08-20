import React from 'react';

/**
 * Propriedades do componente SearchField do WhatsApp Mobile.
 */
export interface WaSearchFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Valor do campo.
   */
  value?: string;

  /**
   * Texto de espaço reservado.
   * @default 'Search...'
   */
  placeholder?: string;

  /**
   * Callback de digitação.
   */
  onChange?: (value: string) => void;

  /**
   * Callback da seta de voltar.
   */
  onBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Exibe os controles de navegação entre resultados, presentes no frame
   * "Search in chat" (node 1:3271).
   * @default false
   */
  showNavigation?: boolean;

  /**
   * Callback de resultado anterior.
   */
  onPrevious?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback de próximo resultado.
   */
  onNext?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
