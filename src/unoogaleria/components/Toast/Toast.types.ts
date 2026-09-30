import React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Posição do aviso dentro do contêiner.
 * - 'bottom': acima da barra de gesto (`--ugl-safe-area-bottom`) e de `offset`
 * - 'top': abaixo da barra de status (`--ugl-safe-area-top`) e de `offset`
 */
export type UglToastPosition = 'bottom' | 'top';

/**
 * Propriedades do componente Toast da Unoogaleria.
 */
export interface UglToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Exibe o aviso. A região viva existe sempre; só o conteúdo entra e sai.
   */
  open: boolean;

  /**
   * Mensagem do aviso ("3 itens movidos para Excluídos recentemente").
   */
  message: React.ReactNode;

  /**
   * Glifo antes da mensagem (por exemplo `checkCircle` ou `delete`).
   */
  icon?: UglIconName;

  /**
   * Rótulo da ação ("Desfazer"). Só aparece com `onAction`.
   */
  actionLabel?: string;

  /**
   * Chamado quando a pessoa aciona a ação. Em seguida o aviso pede para
   * fechar (`onClose`).
   */
  onAction?: () => void;

  /**
   * Chamado quando o aviso deve fechar: fim do tempo, Esc, botão de fechar ou
   * depois da ação. O produto é quem troca `open` para `false`.
   */
  onClose?: () => void;

  /**
   * Tempo em milissegundos até fechar sozinho. `0` não fecha sozinho. A contagem
   * pausa enquanto o ponteiro está sobre o aviso ou o foco está dentro dele.
   * @default 4000
   */
  duration?: number;

  /**
   * Posição dentro do contêiner.
   * @default 'bottom'
   */
  position?: UglToastPosition;

  /**
   * Distância extra em pixels, somada à área segura — para ficar acima da barra
   * de abas ou da barra de seleção.
   * @default 0
   */
  offset?: number;

  /**
   * Exibe o botão de fechar. Padrão: ligado quando o aviso não fecha sozinho
   * (`duration` 0), para que ele nunca fique preso na tela.
   */
  showClose?: boolean;

  /**
   * Nome acessível do botão de fechar.
   * @default 'Fechar aviso'
   */
  closeLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
