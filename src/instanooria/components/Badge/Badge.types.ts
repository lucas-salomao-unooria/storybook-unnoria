import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Variantes visuais do Badge do Instanooria.
 * - 'live': cápsula com gradiente magenta e contorno branco (etiqueta LIVE)
 * - 'counter': cápsula neutra sobre mídia com contagem de itens (ex.: "1/3")
 * - 'notification': ponto ou contagem vermelha de novidades
 * - 'neutral': cápsula neutra sobre superfícies claras
 */
export type InstaBadgeVariant = 'live' | 'counter' | 'notification' | 'neutral';

/**
 * Propriedades do componente Badge do Instanooria.
 */
export interface InstaBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante visual do badge.
   * @default 'neutral'
   */
  variant?: InstaBadgeVariant;

  /**
   * Renderiza apenas o ponto indicador de 8×8px, sem rótulo.
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
   * longa numa largura fixa (a ficha técnica sob um Story, uma tag de
   * classificação): sem ela, a cápsula passa da borda da tela. O raio desce da
   * cápsula para o do cartão (`--insta-radius-l`), porque uma pílula de três
   * linhas vira uma bolha. Sem efeito com `dot`.
   * @default false
   */
  wrap?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Conteúdo textual do badge.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
