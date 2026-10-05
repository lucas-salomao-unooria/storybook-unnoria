import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Propriedades da raiz do PostCard.
 */
export interface UnvPostCardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner ancestral (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /**
   * Conteúdo composto do cartão (Header, Media, Actions, Likes, Caption, Timestamp).
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do cabeçalho da publicação: avatar, nome, selo, local e opções.
 */
export interface UnvPostHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nome de usuário do autor */
  username: string;
  /** Localização exibida abaixo do nome */
  location?: string;
  /** URL do avatar do autor */
  avatarSrc?: string;
  /** Iniciais exibidas quando não há avatar */
  initials?: string;
  /** Exibe o selo de conta oficial */
  verified?: boolean;
  /** Anel aplicado ao avatar do autor */
  ring?: 'none' | 'story' | 'live' | 'seen';
  /** Callback do botão de opções (…) */
  onMore?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Rótulo acessível do botão de opções */
  moreLabel?: string;
  /** Tema visual; sem valor, herda o do contêiner */
  theme?: UnvTheme;
}

/**
 * Propriedades da mídia da publicação (quadrada por padrão, cantos de 12px).
 *
 * Três estados:
 * - com `src`: a imagem;
 * - com `src` que falha ao carregar: o estado de erro, com `errorLabel` e o
 *   botão "Tentar novamente";
 * - sem `src`: `children` é o slide — um cartão de texto ou um desenho do
 *   produto no lugar da fotografia.
 */
export interface UnvPostMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL da imagem exibida. Ausente, `children` é o conteúdo do slide. */
  src?: string;
  /**
   * Texto alternativo da imagem — obrigatório quando há `src`. Sem `src`,
   * nomeia o slide (`role="group"`), cujo texto continua legível.
   */
  alt?: string;
  /** Conteúdo do slide quando não há `src`. */
  children?: React.ReactNode;
  /**
   * Chamado ao tocar "Tentar novamente". A mídia já refaz o carregamento; o
   * callback serve para o produto trocar a `src` ou cair para `children`.
   */
  onRetry?: () => void;
  /** Chamado quando a imagem de `src` falha ao carregar. */
  onMediaError?: () => void;
  /**
   * Texto do estado de erro.
   * @default 'Não foi possível carregar a imagem.'
   */
  errorLabel?: React.ReactNode;
  /**
   * O que a imagem mostrava, dito sob o `errorLabel` quando ela falha. Sem
   * isto, a falha apagaria a descrição junto com o `<img>`: quem enxerga veria
   * só "não carregou", e o leitor de tela perderia o `alt`. O padrão é o
   * próprio `alt`; `null` esconde.
   * @default alt
   */
  errorDescription?: React.ReactNode;
  /**
   * Rótulo do botão do estado de erro.
   * @default 'Tentar novamente'
   */
  retryLabel?: React.ReactNode;
  /** Índice do item atual no carrossel, começando em 1 */
  currentIndex?: number;
  /** Total de itens do carrossel; acima de 1, a mídia mostra o contador e os pontos */
  totalCount?: number;
  /** Proporção da mídia (largura / altura) */
  aspectRatio?: number;
  /** Tema visual; sem valor, herda o do contêiner */
  theme?: UnvTheme;
}

/** As ações à esquerda da barra. Salvar não entra: ele sempre aparece, à direita. */
export type UnvPostAction = 'like' | 'comment' | 'share';

/**
 * Propriedades da barra de ações da publicação. Logo depois de `PostCard.Media`,
 * ela vira uma pílula sobreposta à base da mídia; solta, é uma linha simples.
 */
export interface UnvPostActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Quais ações aparecem à esquerda, na ordem fixa do app (curtir, comentar,
   * compartilhar). Padrão: as três. Uma ação que não faz nada na tela é um
   * botão morto: quem usa o post só para salvar passa `[]`, e a barra vira a
   * pílula de um botão só, encostada à direita.
   */
  actions?: readonly UnvPostAction[];
  /** Estado de curtida da publicação */
  liked?: boolean;
  /** Estado de salvamento da publicação */
  saved?: boolean;
  /** Índice do item atual no carrossel, começando em 1 */
  currentIndex?: number;
  /** Total de itens do carrossel; quando maior que 1, exibe a paginação em pontos */
  totalCount?: number;
  /** Callback de curtir */
  onLike?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback de comentar */
  onComment?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback de compartilhar */
  onShare?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback de salvar */
  onSave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Tema visual; sem valor, herda o do contêiner */
  theme?: UnvTheme;
}

/**
 * Propriedades da prova social de curtidas.
 */
export interface UnvPostLikesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL do avatar do primeiro curtidor */
  avatarSrc?: string;
  /** Nome de usuário do primeiro curtidor */
  username?: string;
  /** Quantidade de curtidas restantes */
  count?: number;
  /** Tema visual; sem valor, herda o do contêiner */
  theme?: UnvTheme;
}

/**
 * Propriedades da legenda do post.
 */
export interface UnvPostCaptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Nome de usuário do autor, exibido em negrito antes do texto */
  username?: string;
  /** Texto da legenda */
  children?: React.ReactNode;
  /** Tema visual; sem valor, herda o do contêiner */
  theme?: UnvTheme;
}

/**
 * Propriedades do carimbo de data da publicação.
 */
export interface UnvPostTimestampProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Texto da data de publicação */
  children?: React.ReactNode;
  /** Tema visual; sem valor, herda o do contêiner */
  theme?: UnvTheme;
}
