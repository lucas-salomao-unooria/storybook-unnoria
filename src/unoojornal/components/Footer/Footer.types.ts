import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente Footer da Unoojornal.
 */
export interface UjnFooterProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Nome da publicação, na cor de destaque do rodapé.
   */
  title: string;

  /**
   * Descrição curta da publicação, sob o nome.
   */
  description?: string;

  /**
   * Linha de direitos, na base ("© 2026 …. Todos os direitos reservados.").
   */
  copyright?: string;

  /**
   * Nota complementar da base, à direita da linha de direitos.
   */
  note?: string;

  /**
   * As colunas de links: um `Footer.Column` por coluna.
   */
  children?: React.ReactNode;

  /**
   * Força o tema visual. O rodapé é uma superfície escura invariante: o tema só
   * afeta o contêiner, não as cores do rodapé.
   */
  theme?: UjnTheme;
}

/**
 * Propriedades de `Footer.Column`.
 */
export interface UjnFooterColumnProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Cabeçalho da coluna, em caixa alta ("Redação").
   */
  heading: string;

  /**
   * Conteúdo da coluna: links ou linhas de texto.
   */
  children: React.ReactNode;
}
