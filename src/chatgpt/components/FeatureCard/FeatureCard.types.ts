import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `FeatureCard` do Design System ChatGPT.
 *
 * Reproduz o componente `FeatureCard` do Figma — o cartão de capacidade
 * exibido em grade na tela de nova conversa.
 */
export interface GptFeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título do recurso.
   */
  title: React.ReactNode;

  /**
   * Descrição curta do recurso ou capacidade.
   */
  description?: React.ReactNode;

  /**
   * Elemento raiz renderizado — use `'button'` ou `'a'` quando o cartão for
   * acionável.
   * @default 'div'
   */
  as?: React.ElementType;

  /**
   * URL de destino quando `as` renderiza uma âncora.
   */
  href?: string;

  /**
   * Alvo de navegação quando `as` renderiza uma âncora.
   */
  target?: React.HTMLAttributeAnchorTarget;

  /**
   * Relação do link quando `as` renderiza uma âncora.
   */
  rel?: string;

  /**
   * Tipo do botão quando `as` renderiza um `button`.
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Desabilita a interação quando `as` renderiza um `button`.
   */
  disabled?: boolean;

  /**
   * Ocupa toda a largura disponível. Quando `false`, mantém as medidas de
   * 240 × 120 do arquivo de design.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
