import React from 'react';
import type { UnvTheme } from '../../tokens';
import type { UnvAvatarRing } from '../Avatar';

/**
 * Estatística exibida em um cartão-pílula do perfil.
 */
export interface UnvProfileStat {
  /** Identificador único da estatística */
  id: string;
  /** Valor numérico já formatado (ex.: "54", "834") */
  value: React.ReactNode;
  /** Rótulo da estatística (ex.: "Publicações", "Seguidores") */
  label: string;
}

/**
 * Propriedades do componente ProfileHeader do Unoovista.
 */
export interface UnvProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
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
  avatarRing?: UnvAvatarRing;

  /**
   * Diâmetro do avatar em pixels.
   * @default 80
   */
  avatarSize?: number;

  /**
   * Nome completo exibido em destaque abaixo do avatar.
   */
  name?: string;

  /**
   * Exibe o selo de conta oficial ao lado do nome.
   * @default false
   */
  verified?: boolean;

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
   * Estatísticas exibidas em cartões-pílula lado a lado, abaixo da biografia.
   */
  stats?: UnvProfileStat[];

  /**
   * Callback disparado ao selecionar uma estatística. Com ele, cada cartão vira
   * um botão; sem ele, é só informação.
   */
  onStatClick?: (stat: UnvProfileStat, index: number) => void;

  /**
   * Ações em largura total, abaixo das estatísticas (ex.: botão "Editar perfil").
   */
  actions?: React.ReactNode;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner ancestral (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
