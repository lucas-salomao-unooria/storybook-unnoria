import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Alinhamento do cabeçalho da matéria.
 * - 'center': kicker, título, linha de apoio e assinatura centralizados
 * - 'start': tudo alinhado ao início da coluna
 */
export type UjnArticleHeaderAlign = 'start' | 'center';

/**
 * Propriedades do componente ArticleHeader da Unoojornal.
 */
export interface UjnArticleHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Chapéu: o assunto em poucas palavras ("Ciência e tecnologia"). Aparece
   * como `Tag` de destaque acima do título.
   */
  kicker: string;

  /**
   * Título da matéria. Vira o `<h1>` da página.
   */
  title: string;

  /**
   * Linha de apoio, logo abaixo do título.
   */
  deck?: string;

  /**
   * Nome de quem assina.
   */
  author: string;

  /**
   * Papel ou turma de quem assina ("3º ano B").
   */
  authorRole?: string;

  /**
   * Retrato de quem assina (quadrado). Sem ele, o `Avatar` mostra as iniciais.
   */
  avatarSrc?: string;

  /**
   * Data de publicação já por extenso ("20 de março de 2026").
   */
  date?: string;

  /**
   * Data em formato ISO (`2026-03-20T14:32:00-03:00`), usada no atributo
   * `datetime` do `<time>`. Sem ela, a data é texto simples.
   */
  dateTime?: string;

  /**
   * Tempo de leitura. Um número são minutos ("6 min de leitura"); um texto é
   * exibido como veio.
   */
  readingTime?: number | string;

  /**
   * Alinhamento do cabeçalho.
   * @default 'center'
   */
  align?: UjnArticleHeaderAlign;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
