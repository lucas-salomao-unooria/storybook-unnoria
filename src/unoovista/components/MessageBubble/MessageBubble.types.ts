import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Sentido da mensagem.
 * - 'incoming': recebida — à esquerda, na superfície primária com contorno, com a coluna do avatar
 * - 'outgoing': enviada — à direita, na superfície terciária (lavanda no claro, roxo no escuro)
 */
export type UnvMessageDirection = 'incoming' | 'outgoing';

/**
 * Posição do balão num grupo de mensagens seguidas do mesmo autor. Os cantos
 * voltados para o autor encolhem entre balões do mesmo grupo, e só o balão
 * isolado e o último do grupo levam o "rabo" (canto inferior em `radius-xs`).
 * - 'single': mensagem isolada — quatro cantos cheios, exceto o "rabo"
 * - 'first': abre o grupo — encolhe o canto inferior do lado do autor
 * - 'middle': meio do grupo — encolhe os dois cantos do lado do autor
 * - 'last': fecha o grupo — encolhe o canto superior e leva o "rabo" embaixo
 */
export type UnvMessagePosition = 'single' | 'first' | 'middle' | 'last';

/**
 * Propriedades do componente MessageBubble do Unoovista.
 *
 * Extensão do módulo: o balão da conversa aberta (`DirectThread`). Cada
 * decisão de cor e medida está registrada na estória do componente.
 */
export interface UnvMessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Sentido da mensagem.
   */
  direction: UnvMessageDirection;

  /**
   * Conteúdo do balão. Quebras de linha do texto são preservadas.
   */
  children: React.ReactNode;

  /**
   * Posição no grupo de mensagens seguidas do mesmo autor.
   * @default 'single'
   */
  position?: UnvMessagePosition;

  /**
   * Avatar ao lado do balão recebido. Passe-o só no ÚLTIMO balão de um grupo;
   * os demais recebidos reservam a mesma coluna vazia, para que o grupo fique
   * alinhado. Ignorado em mensagens enviadas.
   */
  avatarSrc?: string;

  /**
   * Linha abaixo do balão, do lado do autor, em `caption-md` — o carimbo de
   * hora ou o estado ("Visto", "10:42").
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
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
