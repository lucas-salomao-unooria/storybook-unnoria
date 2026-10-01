import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Alinhamento do cabeçalho do post.
 * - 'start': tudo alinhado ao início da coluna de leitura
 * - 'center': tópicos, título, subtítulo e autoria centralizados
 */
export type UblPostHeaderAlign = 'start' | 'center';

/**
 * Indicação de série: "Parte 2 de 3 · Título da série".
 */
export interface UblPostHeaderSeries {
  /** Título da série */
  title: string;
  /** Posição deste post na série (a partir de 1) */
  part: number;
  /** Quantidade de posts da série */
  total: number;
}

/**
 * Propriedades do componente PostHeader da Unooblog.
 */
export interface UblPostHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título do post. Vira o `<h1>` da página.
   */
  title: string;

  /**
   * Subtítulo, logo abaixo do título (a linha de apoio, em `lead`).
   */
  subtitle?: string;

  /**
   * Tópicos do post, na ordem em que aparecem na trilha acima do título.
   */
  topics?: string[];

  /**
   * Série a que o post pertence. Aparece como "Parte N de M · título".
   */
  series?: UblPostHeaderSeries;

  /**
   * Nome de quem escreveu.
   */
  author: string;

  /**
   * Cargo ou papel de quem escreveu ("Engenheira de design systems").
   */
  authorRole?: string;

  /**
   * Retrato de quem escreveu (quadrado). Sem ele, o `Avatar` mostra as iniciais.
   */
  avatarSrc?: string;

  /**
   * Data de publicação já por extenso ("30 de setembro de 2026").
   */
  date: string;

  /**
   * Data em formato ISO (`2026-09-30T09:00:00-03:00`), usada no atributo
   * `datetime` do `<time>`. Sem ela, a data é texto simples.
   */
  dateTime?: string;

  /**
   * Data da última atualização, já por extenso. Aparece como "Atualizado em …".
   */
  updated?: string;

  /**
   * Tempo de leitura. Um número são minutos ("8 min de leitura"); um texto é
   * exibido como veio.
   */
  readingTime?: number | string;

  /**
   * Endereço da imagem de capa (16:9).
   */
  coverSrc?: string;

  /**
   * Descrição da capa para leitores de tela. Sem ela, a capa é decorativa.
   */
  coverAlt?: string;

  /**
   * Legenda da capa, visível abaixo da imagem.
   */
  coverCaption?: string;

  /**
   * Alinhamento do cabeçalho.
   * @default 'start'
   */
  align?: UblPostHeaderAlign;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
