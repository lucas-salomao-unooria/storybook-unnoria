import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Tons da faixa de dica.
 * - 'neutral': orientação — o que fazer nesta tela ("Salve os posts que achar mais completos").
 * - 'friction': atrito — algo impede seguir ("Remova 1 post para continuar"). A cor
 *   de alerta vai na BORDA, nunca no texto: o vermelho do app sobre branco não
 *   passa o contraste de texto.
 */
export type InstaInlineHintTone = 'neutral' | 'friction';

/**
 * Propriedades do componente InlineHint do Instanooria.
 *
 * Extensão: a faixa de texto que o app real põe logo abaixo da barra superior
 * para orientar ou avisar sem interromper ("Você está vendo publicações de…").
 * O arquivo de origem não publica tooltip nem faixa inline.
 */
export interface InstaInlineHintProps extends React.HTMLAttributes<HTMLDivElement> {
  /** O texto da dica. */
  children: React.ReactNode;

  /**
   * Tom da faixa.
   * @default 'neutral'
   */
  tone?: InstaInlineHintTone;

  /**
   * Anuncia a mudança ao leitor de tela (`role="status"`, educado). Ligue quando
   * a faixa aparece ou muda POR CAUSA de uma ação da pessoa — o aviso de atrito
   * que nasce depois de um toque. Para a orientação fixa da tela, deixe
   * desligado: ela é lida na ordem da página.
   * @default false
   */
  announce?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
