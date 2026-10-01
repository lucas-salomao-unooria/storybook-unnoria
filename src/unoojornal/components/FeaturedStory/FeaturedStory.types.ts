import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente FeaturedStory da Unoojornal.
 */
export interface UjnFeaturedStoryProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Etiqueta da seção, em caixa alta ("Vida escolar").
   */
  kicker: string;

  /**
   * Título da matéria de capa.
   */
  title: string;

  /**
   * Resumo da matéria, de duas a quatro linhas.
   */
  summary: string;

  /**
   * Endereço da fotografia (informado por prop, nunca embutido no pacote).
   */
  imageSrc: string;

  /**
   * Descrição da fotografia para leitores de tela.
   */
  imageAlt: string;

  /**
   * Nome de quem assina.
   */
  author: string;

  /**
   * Papel ou turma de quem assina.
   */
  authorRole?: string;

  /**
   * Tempo de leitura, já formatado ("6 min de leitura").
   */
  readingTime?: string;

  /**
   * Rótulo do botão de abrir a matéria.
   * @default 'Ler a reportagem'
   */
  ctaLabel?: string;

  /**
   * Endereço da matéria. Com `href`, o botão é um `<a>`.
   */
  href?: string;

  /**
   * Abrir a matéria. Sem `href`, o botão chama esta função; com `href`, ela é
   * chamada no clique do link (use `event.preventDefault()` para navegar por
   * conta própria).
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
