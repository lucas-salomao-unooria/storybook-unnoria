import React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Propriedades do componente CommentItem da Unooblog.
 *
 * Todos os atributos nativos de `<article>` (`id`, `aria-*`, `data-*`…) vão para
 * a raiz; `className`, `style` e `theme` também.
 */
export interface UblCommentItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Nome de quem comentou. Vira o nome acessível do comentário.
   */
  author: string;

  /**
   * Retrato de quem comentou. Sem ele, o avatar mostra as iniciais.
   */
  avatarSrc?: string;

  /**
   * Texto do comentário. As quebras de linha são preservadas.
   */
  text: string;

  /**
   * Data já formatada (por exemplo, “Há 2 horas”). O componente não formata
   * datas: o texto vem pronto.
   */
  date: string;

  /**
   * Data legível por máquina (ISO 8601), no atributo `dateTime` do `<time>`.
   */
  dateTime?: string;

  /**
   * Número de curtidas. Entra no nome acessível do botão de curtir.
   */
  likes: number;

  /**
   * Quem lê já curtiu este comentário. Liga `aria-pressed` no botão de curtir.
   * @default false
   */
  liked?: boolean;

  /**
   * O comentário é de quem lê: só então o botão “Excluir meu comentário” aparece.
   * @default false
   */
  mine?: boolean;

  /**
   * Resposta a outro comentário: fica recuada, com um filete à esquerda.
   * @default false
   */
  isReply?: boolean;

  /**
   * Comentário em destaque (por exemplo, o recém-publicado): o fundo muda e o
   * texto “em destaque” é anunciado a quem usa leitor de tela — nunca só a cor.
   * @default false
   */
  highlighted?: boolean;

  /**
   * Quando a resposta é a outra resposta (a árvore achata no nível 1), o nome de
   * quem foi respondido aparece como menção no começo do texto.
   */
  replyingToName?: string;

  /**
   * Existe um compositor de resposta aberto sob este comentário. Liga
   * `aria-expanded` no botão “Responder”.
   */
  replying?: boolean;

  /**
   * Rótulo do botão de responder.
   * @default 'Responder'
   */
  replyLabel?: string;

  /**
   * Rótulo do botão de excluir.
   * @default 'Excluir meu comentário'
   */
  deleteLabel?: string;

  /**
   * Chamado ao curtir ou descurtir.
   */
  onToggleLike?: () => void;

  /**
   * Chamado ao pedir para responder.
   */
  onReply?: () => void;

  /**
   * Chamado ao excluir. O botão só existe quando `mine` é verdadeiro.
   */
  onDelete?: () => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
