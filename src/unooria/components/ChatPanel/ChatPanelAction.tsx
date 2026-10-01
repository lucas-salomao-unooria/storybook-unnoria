'use client';

import React, { forwardRef } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
import type { ChatPanelActionProps } from './ChatPanel.types';

/**
 * ChatPanelAction — botão de ícone do cabeçalho do `ChatPanel`.
 *
 * O `Button` `ghost` `sm` do pacote, quadrado (36 x 36), com o glifo e o
 * `Tooltip` do pacote para quem usa ponteiro. O nome é o `label`; com
 * `pressed`, é um botão de alternar (`aria-pressed`).
 *
 * Glifos do quadro `6024:2923` que o agente usa: `add_comment` (nova conversa),
 * `history` (histórico), `open_in_full` / `close_fullscreen` (expandir /
 * recolher) e `close` (fechar).
 */
export const ChatPanelAction = forwardRef<HTMLButtonElement, ChatPanelActionProps>(
  ({ icon, label, pressed, theme = 'light', className = '', ...rest }, ref) => (
    <Tooltip content={label} placement="bottom" theme={theme}>
      <Button
        {...rest}
        ref={ref}
        variant="ghost"
        size="sm"
        theme={theme}
        aria-label={label}
        aria-pressed={pressed}
        className={[
          'unooria-chat-panel__action',
          pressed ? 'unooria-chat-panel__action--pressed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        leftIcon={<Icon name={icon} size="xs" color="currentColor" />}
      />
    </Tooltip>
  )
);

ChatPanelAction.displayName = 'ChatPanelAction';

export default ChatPanelAction;
