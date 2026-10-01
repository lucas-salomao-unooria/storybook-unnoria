import React from 'react';
import type { UblIconName } from '../Icon';
import type { UblTheme } from '../../tokens';

/**
 * Posição do aviso dentro do contêiner.
 * - 'bottom': acima da barra de gesto (`--ubl-safe-area-bottom`) e de `offset`
 * - 'top': abaixo da barra de status (`--ubl-safe-area-top`) e de `offset`
 */
export type UblToastPosition = 'bottom' | 'top';

/**
 * Propriedades do componente Toast da Unooblog.
 */
export interface UblToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Exibe o aviso. A região viva existe sempre; só o conteúdo entra e sai.
   */
  open: boolean;

  /**
   * Mensagem do aviso ("Post salvo para ler depois").
   */
  message: React.ReactNode;

  /**
   * Glifo do registro antes da mensagem (por exemplo `checkCircle` ou `bookmarkFilled`).
   */
  icon?: UblIconName;

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
   * depois da ação. Quem troca `open` para `false` é o produto.
   */
  onClose?: () => void;

  /**
   * Tempo em milissegundos até fechar sozinho. `0` não fecha sozinho. A contagem
   * pausa enquanto o ponteiro está sobre o aviso ou o foco está dentro dele.
   * @default 5000
   */
  duration?: number;

  /**
   * Posição dentro do contêiner.
   * @default 'bottom'
   */
  position?: UblToastPosition;

  /**
   * Distância extra em pixels, somada à área segura — para ficar acima de uma
   * barra fixa na base da tela.
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
  theme?: UblTheme;
}
