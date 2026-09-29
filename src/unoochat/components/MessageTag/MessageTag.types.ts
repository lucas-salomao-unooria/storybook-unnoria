import React from 'react';

/**
 * Propriedades do componente MessageTag do Unoochat.
 *
 * Extensão: etiqueta de classificação presa a uma mensagem — como a marca
 * "encaminhada com frequência".
 */
export interface UncMessageTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Rótulo por extenso. Obrigatório: é ele, e não a cor, que diz o que a
   * etiqueta afirma.
   */
  children: React.ReactNode;
  /**
   * Pictograma exibido antes do rótulo — um caractere ou um `Icon`. Duas
   * etiquetas lado a lado devem se distinguir pela FORMA do pictograma, nunca
   * só pela cor.
   */
  icon?: React.ReactNode;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
