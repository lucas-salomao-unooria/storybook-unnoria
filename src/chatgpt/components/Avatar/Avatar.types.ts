import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Tamanhos do conjunto `Avatar` do Figma (propriedade `Size`), alinhados aos
 * tokens `size/avatar-*` de `Primitives/Sizing`.
 * - `sm`: 24px · iniciais 10px
 * - `md`: 32px · iniciais 13px
 * - `lg`: 40px · iniciais 16px
 * - `xl`: 48px · iniciais 19px
 */
export type GptAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Propriedades do componente `Avatar` do Design System ChatGPT.
 */
export interface GptAvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Tamanho do avatar.
   * @default 'md'
   */
  size?: GptAvatarSize;

  /**
   * Iniciais exibidas quando não há imagem. O arquivo de design usa a
   * inicial única `U`.
   * @default 'U'
   */
  initials?: string;

  /**
   * URL da imagem de perfil. Quando presente, substitui as iniciais.
   */
  src?: string;

  /**
   * Texto alternativo da imagem — obrigatório sempre que `src` é usado.
   */
  alt?: string;

  /**
   * Superfície do avatar. `brand` reproduz o `bg/brand` do arquivo;
   * `inverse` reproduz o avatar preto do assistente no `ChatBubble`.
   * @default 'brand'
   */
  tone?: 'brand' | 'inverse';

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
