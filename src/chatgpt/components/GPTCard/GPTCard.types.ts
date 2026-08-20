import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `GPTCard` do Design System ChatGPT.
 *
 * Reproduz o componente `GPTCard` do Figma — a linha de catálogo usada na
 * tela `Explore GPTs`.
 */
export interface GptCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Nome do GPT.
   */
  name: React.ReactNode;

  /**
   * Descrição curta das capacidades do GPT.
   */
  description?: React.ReactNode;

  /**
   * Inicial exibida no avatar circular de 40px. O arquivo usa `G`.
   * @default 'G'
   */
  initial?: string;

  /**
   * Substitui o avatar circular por um nó arbitrário (imagem, ícone).
   */
  icon?: React.ReactNode;

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
   * Ocupa toda a largura disponível. Quando `false`, mantém a largura de
   * 320px do arquivo de design.
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
