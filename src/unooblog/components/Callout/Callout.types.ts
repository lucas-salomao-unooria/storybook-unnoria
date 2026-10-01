import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Tom do aviso.
 * - 'info': informação de contexto (barra e glifo em `status-info`)
 * - 'tip': dica ou boa prática (barra e glifo em `status-success`)
 * - 'warning': atenção, algo que pode dar errado (barra e glifo em `status-warning`)
 */
export type UblCalloutTone = 'info' | 'tip' | 'warning';

/**
 * Propriedades do componente Callout da Unooblog.
 */
export interface UblCalloutProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Tom do aviso. Define o glifo, a cor da barra e o texto oculto que o leitor
   * de tela anuncia ("Dica:"), para que o tom nunca dependa só da cor.
   * @default 'info'
   */
  tone?: UblCalloutTone;

  /**
   * Título curto do aviso, em negrito.
   */
  title?: string;

  /**
   * Texto que anuncia o tom ao leitor de tela, lido antes do conteúdo. Sem ele,
   * valem "Informação:", "Dica:" e "Atenção:".
   */
  toneLabel?: string;

  /**
   * Conteúdo do aviso.
   */
  children: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
