import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente AgendaList da Unoojornal.
 */
export interface UjnAgendaListProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título do cartão.
   * @default 'Agenda da escola'
   */
  title?: string;

  /**
   * Os compromissos: um `AgendaList.Item` por evento.
   */
  children: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}

/**
 * Propriedades de `AgendaList.Item`.
 */
export interface UjnAgendaItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
  /**
   * Dia do mês, em destaque na tarja ("12").
   */
  day: string | number;

  /**
   * Mês, abreviado ou por extenso; a tarja o mostra em caixa alta ("mar").
   */
  month: string;

  /**
   * Nome do compromisso.
   */
  title: string;

  /**
   * Horário ou intervalo ("14h às 16h").
   */
  time?: string;

  /**
   * Endereço do compromisso. Com `href`, o título é um `<a>`.
   */
  href?: string;
}
