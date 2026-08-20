import React from 'react';
import type { InstaTheme } from '../../tokens';
import type { InstaAvatarRing } from '../Avatar';

/**
 * Estatística exibida ao lado do avatar do perfil.
 */
export interface InstaProfileStat {
  /** Identificador único da estatística */
  id: string;
  /** Valor numérico já formatado (ex.: "54", "834") */
  value: React.ReactNode;
  /** Rótulo da estatística (ex.: "Posts", "Seguidores") */
  label: string;
}

/**
 * Propriedades do componente ProfileHeader do Instanooria.
 */
export interface InstaProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * URL do avatar do perfil.
   */
  avatarSrc?: string;

  /**
   * Iniciais exibidas quando não há avatar.
   */
  initials?: string;

  /**
   * Anel aplicado ao avatar.
   * @default 'story'
   */
  avatarRing?: InstaAvatarRing;

  /**
   * Diâmetro do avatar em pixels.
   * @default 80
   */
  avatarSize?: number;

  /**
   * Nome completo exibido em negrito abaixo das estatísticas.
   */
  name?: string;

  /**
   * Biografia do perfil. Aceita nós ricos para menções e links.
   */
  bio?: React.ReactNode;

  /**
   * Endereço do site exibido como link.
   */
  website?: string;

  /**
   * URL de destino do site. Quando ausente, usa `website`.
   */
  websiteHref?: string;

  /**
   * Estatísticas exibidas à direita do avatar.
   */
  stats?: InstaProfileStat[];

  /**
   * Callback disparado ao selecionar uma estatística.
   */
  onStatClick?: (stat: InstaProfileStat, index: number) => void;

  /**
   * Ações exibidas abaixo da biografia (ex.: botão "Editar perfil").
   */
  actions?: React.ReactNode;

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
