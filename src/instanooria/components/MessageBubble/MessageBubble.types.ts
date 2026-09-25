import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Sentido da mensagem.
 * - 'incoming': recebida — à esquerda, na superfície da tela com contorno, com a coluna do avatar
 * - 'outgoing': enviada — à direita, no preenchimento neutro do campo de busca
 */
export type InstaMessageDirection = 'incoming' | 'outgoing';

/**
 * Posição do balão num grupo de mensagens seguidas do mesmo autor. Como no app
 * real, os cantos voltados para o autor encolhem entre balões do mesmo grupo.
 * - 'single': mensagem isolada, os quatro cantos cheios
 * - 'first': abre o grupo — encolhe o canto inferior do lado do autor
 * - 'middle': meio do grupo — encolhe os dois cantos do lado do autor
 * - 'last': fecha o grupo — encolhe o canto superior do lado do autor
 */
export type InstaMessagePosition = 'single' | 'first' | 'middle' | 'last';

/**
 * Propriedades do componente MessageBubble do Instanooria.
 *
 * Extensão: o arquivo de origem publica só a lista de conversas (`0:2482`),
 * nunca uma conversa aberta. NÃO é o `MessageBubble` do WhatsApp Mobile — cada
 * marca tem o seu, com os próprios tokens.
 */
export interface InstaMessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Sentido da mensagem.
   */
  direction: InstaMessageDirection;

  /**
   * Conteúdo do balão. Quebras de linha do texto são preservadas.
   */
  children: React.ReactNode;

  /**
   * Posição no grupo de mensagens seguidas do mesmo autor.
   * @default 'single'
   */
  position?: InstaMessagePosition;

  /**
   * Avatar ao lado do balão recebido. Como no app real, passe-o só no ÚLTIMO
   * balão de um grupo; os demais recebidos reservam a mesma coluna vazia, para
   * que o grupo fique alinhado. Ignorado em mensagens enviadas.
   */
  avatarSrc?: string;

  /**
   * Linha abaixo do balão, do lado do autor — por exemplo "Visto".
   */
  meta?: React.ReactNode;

  /**
   * Quem enviou, anunciado só ao leitor de tela antes do texto ("Amara",
   * "Você"). Visualmente, o lado do balão já diz isso; ao leitor de tela, não.
   */
  senderLabel?: string;

  /**
   * Remove o preenchimento e o recuo do balão, mantendo o lado, a coluna do
   * avatar e o `meta`. Serve para mensagens que já são um cartão — como a
   * enquete `DmPoll` enviada pela outra pessoa.
   * @default false
   */
  bare?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
