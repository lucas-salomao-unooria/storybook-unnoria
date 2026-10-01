import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente OpinionBox da Unoojornal.
 */
export interface UjnOpinionBoxProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Sobrescrito acima do título, com o glifo de opinião.
   * @default 'Opinião em destaque'
   */
  eyebrow?: string;

  /**
   * Título do texto de opinião. É o alvo principal do cartão.
   */
  title: string;

  /**
   * Trecho em destaque, em itálico, sem aspas (o componente as acrescenta).
   */
  quote: string;

  /**
   * Autoria ("Editorial da Redação").
   */
  author: string;

  /**
   * Apoio ao lado da autoria ("Espaço Aberto").
   */
  meta?: string;

  /**
   * Endereço do texto. Com `href`, o título é um `<a>`.
   */
  href?: string;

  /**
   * Abrir o texto. Sem `href`, o título é um `<button>` que chama esta função;
   * com `href`, ela é chamada no clique do link.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
