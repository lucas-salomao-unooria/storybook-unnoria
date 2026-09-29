import React from 'react';

/**
 * Propriedades do componente SearchField do Unoochat.
 */
export interface UncSearchFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Valor do campo.
   */
  value?: string;

  /**
   * Texto de espaço reservado.
   * @default 'Buscar...'
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
   * Exibe os controles de navegação entre resultados, usados na busca
   * dentro da conversa.
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
