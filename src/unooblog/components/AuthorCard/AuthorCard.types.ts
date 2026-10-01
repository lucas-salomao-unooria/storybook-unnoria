import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Disposição do cartão de autoria.
 * - 'card': cartão lavanda com avatar grande, cargo, bio e seguidores
 * - 'inline': avatar, nome, cargo e botão em uma linha, sem cartão
 */
export type UblAuthorCardLayout = 'card' | 'inline';

/**
 * Propriedades do componente AuthorCard da Unooblog.
 */
export interface UblAuthorCardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Nome de quem assina. Com `href`, é o alvo principal do cartão.
   */
  name: string;

  /**
   * Cargo ou papel ("Engenheira de design").
   */
  role?: string;

  /**
   * Minibiografia, cortada em três linhas no `card`. Omitida no `inline`.
   */
  bio?: string;

  /**
   * Retrato. Sem ele, o avatar mostra as iniciais.
   */
  avatarSrc?: string;

  /**
   * Quantidade de seguidores. Formatada em pt-BR e abreviada acima de mil
   * ("1,2 mil seguidores").
   */
  followers?: number;

  /**
   * Autor seguido: o botão fica pressionado (`aria-pressed`), o rótulo vira
   * "Seguindo" e o glifo, "following".
   * @default false
   */
  following?: boolean;

  /**
   * Alterna o seguir e recebe o novo valor. Quando informada, o botão
   * "Seguir" aparece; ele nunca abre o perfil.
   */
  onToggleFollow?: (following: boolean) => void;

  /**
   * Endereço do perfil. Com `href`, o nome é um `<a>` e o cartão inteiro clica.
   */
  href?: string;

  /**
   * Disposição do cartão.
   * @default 'card'
   */
  layout?: UblAuthorCardLayout;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
