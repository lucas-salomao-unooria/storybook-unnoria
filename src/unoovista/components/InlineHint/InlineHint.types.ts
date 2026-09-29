import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Tons da faixa de dica.
 * - 'neutral': orientação — o que fazer nesta tela ("Salve as publicações mais completas").
 * - 'friction': atrito — algo impede seguir ("Remova 1 publicação para continuar").
 *   O tom NÃO depende só de cor: leva o glifo de atenção, um contorno de
 *   controle e o prefixo "Atenção:" para leitor de tela.
 */
export type UnvInlineHintTone = 'neutral' | 'friction';

/**
 * Propriedades do componente InlineHint do Unoovista.
 *
 * Extensão: a faixa de texto, logo abaixo da barra superior, que orienta ou
 * avisa de um atrito sem interromper a pessoa.
 */
export interface UnvInlineHintProps extends React.HTMLAttributes<HTMLDivElement> {
  /** O texto da dica. */
  children: React.ReactNode;

  /**
   * Tom da faixa.
   * @default 'neutral'
   */
  tone?: UnvInlineHintTone;

  /**
   * Anuncia a mudança ao leitor de tela (`role="status"`, educado). Ligue quando
   * a faixa aparece ou muda POR CAUSA de uma ação da pessoa — o aviso de atrito
   * que nasce depois de um toque. Para a orientação fixa da tela, deixe
   * desligado: ela é lida na ordem da página.
   * @default false
   */
  announce?: boolean;

  /**
   * Texto lido antes de uma dica de atrito, para que o tom chegue a quem não
   * vê o glifo nem a cor. Ignorado no tom `neutral`.
   * @default 'Atenção:'
   */
  frictionLabel?: string;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem ele, o
   * componente herda o tema do contêiner.
   */
  theme?: UnvTheme;

  /** Classe CSS adicional. */
  className?: string;
}
