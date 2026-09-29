import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Tamanhos do `Avatar`, alinhados aos tokens `--uai-size-avatar-*`.
 * - `sm`: 24px · iniciais 10px
 * - `md`: 32px · iniciais 12px
 * - `lg`: 40px · iniciais 16px
 * - `xl`: 48px · iniciais 18px
 */
export type UaiAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Propriedades do componente `Avatar` do Design System UnooriaAI.
 */
export interface UaiAvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Tamanho do avatar.
   * @default 'md'
   */
  size?: UaiAvatarSize;

  /**
   * Iniciais exibidas quando não há imagem. O padrão é a inicial única `U`.
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
   * Superfície do avatar. `brand` usa `--uai-bg-brand`; `inverse` usa
   * `--uai-bg-inverse`, o avatar de alto contraste do assistente no `ChatBubble`.
   * @default 'brand'
   */
  tone?: 'brand' | 'inverse';

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
