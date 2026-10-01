import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente ArticleListItem da Unoojornal.
 */
export interface UjnArticleListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Etiqueta da seção ("Ciência").
   */
  kicker: string;

  /**
   * Tempo desde a publicação, já formatado ("Há 2 horas").
   */
  timeAgo?: string;

  /**
   * Título da matéria. É o alvo principal do item.
   */
  title: string;

  /**
   * Resumo, cortado em duas linhas.
   */
  summary?: string;

  /**
   * Nome de quem assina.
   */
  author: string;

  /**
   * Papel ou turma de quem assina.
   */
  authorRole?: string;

  /**
   * Tempo de leitura, já formatado ("4 min de leitura").
   */
  readingTime?: string;

  /**
   * Endereço da matéria. Com `href`, o título é um `<a>`.
   */
  href?: string;

  /**
   * Abrir a matéria. Sem `href`, o título é um `<button>` que chama esta
   * função; com `href`, ela é chamada no clique do link.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Matéria salva para ler depois: o botão de salvar fica pressionado e o
   * glifo, preenchido.
   * @default false
   */
  saved?: boolean;

  /**
   * Alterna o salvamento e recebe o novo valor. Quando informada, o botão de
   * salvar aparece; ele nunca abre a matéria.
   */
  onToggleSave?: (saved: boolean) => void;

  /**
   * Matéria já lida: o texto vai para o tom `muted` e o item ganha o selo
   * "Lida" (o estado nunca fica só na cor).
   * @default false
   */
  read?: boolean;

  /**
   * Matéria aberta no momento: barra lateral de 3px e `aria-current`.
   * @default false
   */
  current?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
