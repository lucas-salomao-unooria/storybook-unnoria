import React from 'react';
import type { UblIconName } from '../Icon';
import type { UblTheme } from '../../tokens';

/**
 * Tons do selo.
 * - 'neutral': preenchimento de campo, texto secundário (contagens, estados sem urgência)
 * - 'accent': roxo de ação cheio (novo, em destaque)
 * - 'success': fundo translúcido verde, contorno e glifo de sucesso
 * - 'warning': fundo translúcido âmbar, contorno e glifo de atenção
 * - 'info': fundo translúcido azul, contorno e glifo informativo
 */
export type UblBadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'info';

/**
 * Tamanhos do selo.
 * - 'sm': 20px de altura, em linha com metadados
 * - 'md': 28px de altura (padrão)
 */
export type UblBadgeSize = 'sm' | 'md';

/**
 * Propriedades do componente Badge da Unooblog.
 */
export interface UblBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Tom semântico.
   * @default 'neutral'
   */
  tone?: UblBadgeTone;

  /**
   * Tamanho do selo.
   * @default 'md'
   */
  size?: UblBadgeSize;

  /**
   * Glifo do registro antes do texto. Os tons `success`, `warning` e `info`
   * trazem um glifo próprio quando este não é informado — o estado nunca vive só
   * na cor.
   */
  icon?: UblIconName;

  /**
   * Texto do selo.
   */
  children: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
