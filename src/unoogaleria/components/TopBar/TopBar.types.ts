import type React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Variantes da barra superior.
 * - 'large': título grande (`display`) à esquerda, com a linha de apoio acima e
 *   as ações à direita na linha do título — o topo da Biblioteca, dos Álbuns e
 *   da Busca
 * - 'compact': título centralizado (`title-md`) com o lado esquerdo e as ações
 *   — um álbum aberto
 * - 'overlay': como 'compact', mas translúcida e absoluta no topo do
 *   contêiner, sobre a grade que corre por baixo
 */
export type UglTopBarVariant = 'large' | 'compact' | 'overlay';

/**
 * Propriedades do componente TopBar da Unoogaleria.
 */
export interface UglTopBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título da tela.
   */
  title: React.ReactNode;

  /**
   * Linha de apoio: acima do título na 'large' ("30 de setembro de 2026") e
   * abaixo dele nas outras ("12 itens").
   */
  subtitle?: React.ReactNode;

  /**
   * Variante.
   * @default 'large'
   */
  variant?: UglTopBarVariant;

  /**
   * Ações à direita (`IconButton`, `Button` terciário).
   */
  actions?: React.ReactNode;

  /**
   * Conteúdo à esquerda, depois do voltar (nas variantes compactas).
   */
  leading?: React.ReactNode;

  /**
   * Mostra o botão de voltar (glifo `back`) e o aciona.
   */
  onBack?: () => void;

  /**
   * Nome acessível do voltar.
   * @default 'Voltar'
   */
  backLabel?: string;

  /**
   * Texto visível ao lado do glifo de voltar (o nome da tela anterior:
   * "Álbuns"). O nome acessível passa a ser "Voltar: Álbuns".
   */
  backText?: string;

  /**
   * Fio inferior de 1px.
   * @default false
   */
  bordered?: boolean;

  /**
   * Nível do título.
   * @default 1
   */
  headingLevel?: 1 | 2;

  /**
   * Cola no topo do contêiner de rolagem, translúcida com desfoque.
   * @default false
   */
  sticky?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
