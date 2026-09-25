import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Propriedades do componente BottomSheet do Instanooria.
 *
 * Extensão: o arquivo de origem não publica folha inferior — só a gaveta
 * LATERAL do menu do perfil (`0:1161` / `0:2938`). A forma vem do app real; a
 * superfície, dos degraus que o arquivo publica.
 *
 * Dois modos:
 * - `modal` (padrão): véu, foco preso, ESC e toque no véu fecham. Fechada, não
 *   renderiza nada.
 * - não modal (`modal={false}`): a folha fica sobre o conteúdo sem bloqueá-lo —
 *   a "Ficha técnica" sobre o Story. Recolhida, mostra só a alça e
 *   `collapsedLabel`; o botão da alça expande e recolhe (`aria-expanded`).
 *
 * `open` é controlado quando informado. Sem ele, a folha guarda o próprio
 * estado a partir de `defaultOpen`.
 */
export interface InstaBottomSheetProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Expandida (não modal) ou aberta (modal). Informada, a folha é controlada.
   */
  open?: boolean;

  /**
   * Estado inicial quando `open` não é informado.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Chamado quando a folha pede para mudar de estado: toque na alça, ESC ou
   * toque no véu.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Camada modal (véu e foco preso) ou folha sobre o conteúdo.
   * @default true
   */
  modal?: boolean;

  /**
   * Título da folha. No modo modal, é o nome acessível do diálogo; no não
   * modal, substitui `collapsedLabel` na alça quando expandida.
   */
  title?: React.ReactNode;

  /**
   * Rótulo da alça recolhida (só no modo não modal).
   * @default 'Ver detalhes'
   */
  collapsedLabel?: React.ReactNode;

  /**
   * Altura máxima da folha, relativa ao contêiner posicionado. A missão "A
   * Seleção" usa `'45%'` sobre o Story.
   * @default '85%'
   */
  maxHeight?: number | string;

  /**
   * Conteúdo da folha. Rola por conta própria quando passa de `maxHeight`.
   */
  children?: React.ReactNode;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
