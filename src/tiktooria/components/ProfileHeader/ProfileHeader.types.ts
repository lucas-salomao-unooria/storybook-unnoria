import React from 'react';

/**
 * Uma métrica do cabeçalho do perfil.
 */
export interface TikProfileStat {
  /** Valor exibido em Bold 17 */
  value: React.ReactNode;
  /** Rótulo exibido em Regular 13 */
  label: React.ReactNode;
}

/**
 * Propriedades do cabeçalho do perfil.
 */
export interface TikProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Identificador do perfil, como `@jacob_w`, em Semibold 17.
   */
  handle: React.ReactNode;

  /**
   * Endereço da fotografia de perfil, exibida em 96px.
   */
  avatarSrc?: string;

  /**
   * Texto alternativo da fotografia de perfil.
   */
  avatarAlt?: string;

  /**
   * As três métricas do arquivo: seguindo, seguidores e curtidas.
   */
  stats?: TikProfileStat[];

  /**
   * Biografia ou convite para adicioná-la, em Regular 14.
   */
  bio?: React.ReactNode;

  /**
   * Ações exibidas entre as métricas e a biografia — no arquivo, o botão
   * "Edit profile" e o alvo de salvos.
   */
  actions?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
