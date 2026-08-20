import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Propriedades da raiz do PostCard.
 */
export interface InstaPostCardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

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
 * Propriedades do cabeçalho do post (frame "Post / Top", 375×54px).
 */
export interface InstaPostHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nome de usuário do autor */
  username: string;
  /** Localização exibida abaixo do nome */
  location?: string;
  /** URL do avatar do autor */
  avatarSrc?: string;
  /** Iniciais exibidas quando não há avatar */
  initials?: string;
  /** Exibe o selo azul de conta oficial */
  verified?: boolean;
  /** Anel aplicado ao avatar do autor */
  ring?: 'none' | 'story' | 'live' | 'seen';
  /** Callback do botão de opções (…) */
  onMore?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Rótulo acessível do botão de opções */
  moreLabel?: string;
  /** Tema visual */
  theme?: InstaTheme;
}

/**
 * Propriedades da mídia do post (quadrado de 375×375px).
 */
export interface InstaPostMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL da imagem exibida */
  src: string;
  /** Texto alternativo da imagem */
  alt: string;
  /** Índice do item atual no carrossel, começando em 1 */
  currentIndex?: number;
  /** Total de itens do carrossel */
  totalCount?: number;
  /** Proporção da mídia (largura / altura) */
  aspectRatio?: number;
  /** Tema visual */
  theme?: InstaTheme;
}

/**
 * Propriedades da barra de ações do post.
 */
export interface InstaPostActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Estado de curtida da publicação */
  liked?: boolean;
  /** Estado de salvamento da publicação */
  saved?: boolean;
  /** Índice do item atual no carrossel, começando em 1 */
  currentIndex?: number;
  /** Total de itens do carrossel; quando maior que 1, exibe a paginação */
  totalCount?: number;
  /** Callback de curtir */
  onLike?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback de comentar */
  onComment?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback de compartilhar */
  onShare?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback de salvar */
  onSave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Tema visual */
  theme?: InstaTheme;
}

/**
 * Propriedades da prova social de curtidas.
 */
export interface InstaPostLikesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL do avatar do primeiro curtidor */
  avatarSrc?: string;
  /** Nome de usuário do primeiro curtidor */
  username?: string;
  /** Quantidade de curtidas restantes */
  count?: number;
  /** Tema visual */
  theme?: InstaTheme;
}

/**
 * Propriedades da legenda do post.
 */
export interface InstaPostCaptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Nome de usuário do autor, exibido em negrito antes do texto */
  username?: string;
  /** Texto da legenda */
  children?: React.ReactNode;
  /** Tema visual */
  theme?: InstaTheme;
}

/**
 * Propriedades do carimbo de data do post.
 */
export interface InstaPostTimestampProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Texto da data de publicação */
  children?: React.ReactNode;
  /** Tema visual */
  theme?: InstaTheme;
}
