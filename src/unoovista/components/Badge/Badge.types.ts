import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Variantes visuais do Badge do Unoovista. Todas são cápsulas.
 * - 'live': gradiente `--unv-gradient-livebadge`, texto sobre mídia e contorno
 *   na cor do fundo (etiqueta LIVE)
 * - 'counter': cápsula sobre superfície terciária com contagem de itens (ex.: "1/3")
 * - 'notification': ponto ou contagem em `--unv-color-brand-notification`
 * - 'neutral': cápsula de rótulo sobre superfície terciária
 */
export type UnvBadgeVariant = 'live' | 'counter' | 'notification' | 'neutral';

/**
 * Propriedades do componente Badge do Unoovista.
 */
export interface UnvBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante visual do badge.
   * @default 'neutral'
   */
  variant?: UnvBadgeVariant;

  /**
   * Renderiza apenas o ponto indicador de 8×8px, sem rótulo (decorativo:
   * `aria-hidden`; quem precisa anunciar a novidade a dá por outro meio).
   * @default false
   */
  dot?: boolean;

  /**
   * Contagem numérica exibida no badge.
   */
  count?: number;

  /**
   * Valor máximo exibido antes de truncar como "99+".
   * @default 99
   */
  overflowCount?: number;

  /**
   * Deixa o rótulo QUEBRAR LINHA em vez de seguir numa linha só. Para etiqueta
   * longa numa largura fixa (a ficha técnica sob uma história, uma tag de
   * classificação): sem ela, a cápsula passa da borda da tela. O raio desce da
   * cápsula para o do cartão (`--unv-radius-l`), porque uma pílula de três
   * linhas vira uma bolha. Sem efeito com `dot`.
   * @default false
   */
  wrap?: boolean;

  /**
   * Força o tema visual do selo. Quando omitido, herda o tema do contêiner
   * ancestral por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Conteúdo textual do badge.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
