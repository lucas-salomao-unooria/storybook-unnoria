import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente EditionBar da Unoojornal.
 *
 * Os atributos nativos de `<div>` (`id`, `data-*`, `aria-*`…) vão para o
 * invólucro da faixa.
 */
export interface UjnEditionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Instituição que publica o jornal, à esquerda da faixa.
   */
  institution: React.ReactNode;

  /**
   * Identificação da edição (número, volume, período), ao centro. Na largura
   * compacta ela se esconde: a faixa fica só com a instituição e a data.
   */
  edition: React.ReactNode;

  /**
   * Data da edição, à direita.
   */
  date: React.ReactNode;

  /**
   * Texto de atualização, à direita da data (ex.: "Atualizado às 14:32 BRT").
   */
  updatedLabel?: React.ReactNode;

  /**
   * Mostra o ponto de status ao lado do texto de atualização. O ponto nunca
   * vai sozinho: quem comunica o estado é o texto.
   * @default false
   */
  live?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
