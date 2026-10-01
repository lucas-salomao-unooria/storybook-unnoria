import type React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Onde o botão fica.
 * - `bottom-right`: fixo no canto inferior direito da janela (padrão).
 * - `bottom-left`: fixo no canto inferior esquerdo.
 * - `inline`: no fluxo do documento — para documentação, e para quem monta o
 *   botão dentro de outra barra.
 *
 * Nos dois cantos, a distância à borda é `--unooria-chat-offset` (24px) somada
 * à área segura do aparelho (`env(safe-area-inset-*)`).
 */
export type ChatLauncherPlacement = 'bottom-right' | 'bottom-left' | 'inline';

/**
 * Propriedades do `ChatLauncher`, o botão flutuante que abre o painel do agente
 * de IA do professor.
 */
export interface ChatLauncherProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-expanded' | 'aria-controls'> {
  /**
   * O painel está aberto? Vira `aria-expanded`. O nome do botão NÃO muda com o
   * estado — quem anuncia aberto/fechado é o `aria-expanded`.
   * @default false
   */
  expanded?: boolean;

  /** O `id` do painel que o botão abre. Vira `aria-controls`. */
  controls?: string;

  /**
   * Nome acessível do botão.
   * @default 'Agente de IA do professor'
   */
  label?: string;

  /**
   * Selo sobre o botão: um número (respostas que chegaram com o painel fechado)
   * ou `true` para um ponto sem número. `0`, `false` ou ausente: sem selo.
   */
  badge?: number | boolean;

  /**
   * O que o selo quer dizer, para quem não o vê — entra na descrição do botão.
   * Sem ele: "1 resposta nova" / "N respostas novas" (número) ou "Resposta
   * nova" (ponto).
   */
  badgeLabel?: string;

  /**
   * Onde o botão fica.
   * @default 'bottom-right'
   */
  placement?: ChatLauncherPlacement;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}
