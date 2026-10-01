import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Disposição da linha de metadados.
 * - 'inline': avatar, autoria e detalhes na mesma linha (cartões e listas)
 * - 'stacked': autoria em cima e detalhes embaixo (cabeçalho do post)
 */
export type UblPostMetaLayout = 'inline' | 'stacked';

/**
 * Propriedades do componente PostMeta da Unooblog.
 */
export interface UblPostMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Nome de quem assina o post. Também é o texto das iniciais do avatar.
   */
  author: string;

  /**
   * Retrato de quem assina. Sem ele, o avatar mostra as iniciais.
   */
  avatarSrc?: string;

  /**
   * Data de publicação já formatada ("12 de mar. de 2026").
   */
  date: string;

  /**
   * Data legível por máquina (ISO 8601: "2026-03-12"). Quando informada, a data
   * vira um `<time datetime>`.
   */
  dateTime?: string;

  /**
   * Tempo de leitura já formatado ("7 min de leitura").
   */
  readingTime?: string;

  /**
   * Quantidade de comentários. Aparece com o glifo de comentários, formatada
   * em pt-BR, e entra no texto lido pelo leitor de tela ("1 comentário").
   */
  comments?: number;

  /**
   * Disposição da linha.
   * @default 'inline'
   */
  layout?: UblPostMetaLayout;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
