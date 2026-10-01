import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Um tópico da nuvem.
 */
export interface UblTopicCloudItem {
  /** Identificador do tópico, devolvido por `onSelect`. */
  id: string;
  /** Nome exibido no chip ("Design Systems"). */
  label: string;
  /** Quantidade de posts do tópico, mostrada no chip. */
  count?: number;
}

/**
 * Propriedades do componente TopicCloud da Unooblog.
 */
export interface UblTopicCloudProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'onSelect'> {
  /**
   * Tópicos exibidos, na ordem recebida.
   */
  topics: UblTopicCloudItem[];

  /**
   * Identificador do tópico selecionado (modo controlado). O chip selecionado
   * liga `aria-pressed`.
   */
  selectedId?: string;

  /**
   * Chamado com o `id` do chip tocado. Tocar o já selecionado chama a função
   * com o mesmo `id`: quem decide limpar o filtro é o consumidor.
   */
  onSelect?: (id: string) => void;

  /**
   * Título visível da seção ("Explore por tópico"). Quando informado, nomeia a
   * região e `ariaLabel` não é usado.
   */
  title?: string;

  /**
   * Nome da região para o leitor de tela quando não há `title`.
   * @default 'Tópicos'
   */
  ariaLabel?: string;

  /**
   * Nível do título (`<h2>` ou `<h3>`).
   * @default 2
   */
  headingLevel?: 2 | 3;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
