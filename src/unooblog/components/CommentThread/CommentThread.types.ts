import React from 'react';
import type { UblComment } from '../../content';
import type { UblTheme } from '../../tokens';

/**
 * Propriedades do componente CommentThread da Unooblog.
 *
 * Os atributos nativos de `<section>` (`id`, `aria-*`, `data-*`…) vão para a
 * raiz; `className`, `style` e `theme` também.
 */
export interface UblCommentThreadProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'children'> {
  /**
   * Título da seção. A contagem total aparece ao lado, num selo neutro.
   * @default 'Comentários'
   */
  title?: string;

  /**
   * Nível do título, para encaixar a seção na hierarquia da página.
   * @default 'h2'
   */
  headingLevel?: 'h2' | 'h3';

  /**
   * Comentários em lista plana. Os que têm `parentId` viram respostas do
   * comentário apontado, em ordem cronológica; resposta de resposta se achata
   * no nível 1 e mantém a menção a quem foi respondido.
   */
  comments: UblComment[];

  /**
   * Chamado com o id do comentário curtido ou descurtido.
   */
  onToggleLike?: (id: string) => void;

  /**
   * Chamado com o id do comentário que a pessoa quer responder.
   */
  onReply?: (id: string) => void;

  /**
   * Chamado com o id do comentário a excluir. O botão só aparece nos comentários
   * com `mine`.
   */
  onDelete?: (id: string) => void;

  /**
   * Ids dos comentários que quem lê já curtiu (`aria-pressed` no botão).
   */
  likedIds?: string[];

  /**
   * Id do comentário em destaque (por exemplo, o recém-publicado).
   */
  highlightedId?: string;

  /**
   * Id do comentário que está sendo respondido: o compositor desenhado por
   * `renderComposer` abre logo abaixo dele.
   */
  replyingToId?: string;

  /**
   * Desenha o compositor sob o comentário respondido (`replyingToId`). Recebe o
   * id desse comentário.
   */
  renderComposer?: (parentId: string) => React.ReactNode;

  /**
   * Slot fixo entre o título e a lista, por exemplo o compositor de um novo
   * comentário.
   */
  composer?: React.ReactNode;

  /**
   * Texto do estado vazio.
   * @default 'Ainda não há comentários. Seja a primeira pessoa a comentar.'
   */
  emptyLabel?: string;

  /**
   * Instante de referência das datas relativas (“Há 2 horas”). Sem ele, usa o
   * momento da renderização; fixe-o em estórias e testes.
   */
  now?: Date | string;

  /**
   * Fuso em que as datas são lidas. O padrão é o de `ublTimeAgo`.
   */
  timeZone?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
