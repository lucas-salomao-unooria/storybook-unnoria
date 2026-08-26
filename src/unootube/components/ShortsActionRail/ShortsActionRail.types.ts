import React from 'react';

/**
 * As duas formas de trilha publicadas pelo arquivo.
 *
 * - `overlay`: coluna de 36px **sobre** o vídeo, na tela móvel (`3:210`). O
 *   glifo é branco e não tem fundo — o contraste vem do véu do reprodutor.
 * - `standalone`: coluna de 59px **ao lado** do vídeo, na área de trabalho
 *   (`3:453`). Cada ação é um botão circular de 54px sobre a superfície
 *   interativa, e a trilha fica fora do quadro.
 *
 * A diferença não é de espaçamento: numa o alvo é o glifo, na outra é um
 * círculo com fundo próprio. É por isso que as duas convivem.
 */
export type UniShortsRailVariant = 'overlay' | 'standalone';

/**
 * Propriedades de uma ação da trilha.
 */
export interface UniShortsActionRailItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Glifo da ação. Componha com `Icon` — a trilha não escolhe glifo por nome,
   * para que um produto com biblioteca própria possa injetar a dele.
   */
  icon: React.ReactNode;

  /**
   * Rótulo exibido sob o glifo, como o arquivo escreve ("245K", "Dislike",
   * "952", "Share"). Quando omitido, nenhuma linha é reservada.
   */
  label?: React.ReactNode;

  /**
   * Marca a ação como acionada — curtido, não curtido, inscrito. O arquivo é
   * estático e não publica esse estado; ele existe para que a trilha seja
   * utilizável, e só altera a cor do glifo.
   * @default false
   */
  active?: boolean;

  /**
   * Rótulo acessível do botão. Obrigatório quando `label` não é um texto
   * simples — a contagem "245K" não descreve a ação.
   */
  'aria-label'?: string;

  /** Classe CSS adicional. */
  className?: string;
}

/**
 * Propriedades da trilha de ações do Shorts.
 */
export interface UniShortsActionRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Forma da trilha.
   * @default 'overlay'
   */
  variant?: UniShortsRailVariant;

  /**
   * Conteúdo fixado no topo da coluna, acima do grupo de ações. No arquivo é o
   * menu de reticências (`3:211`).
   */
  header?: React.ReactNode;

  /**
   * Conteúdo fixado na base da coluna, abaixo do grupo de ações. No arquivo é
   * o botão de som com a capa do áudio (`3:237`).
   */
  footer?: React.ReactNode;

  /** Compõe com `ShortsActionRail.Item`. */
  children?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}
