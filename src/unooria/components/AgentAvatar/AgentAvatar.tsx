import React, { forwardRef } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { AGENT_IMAGES_BASE64 } from '../../assets/agent/agentImages';
import type { AgentAvatarProps, AgentAvatarSize } from './AgentAvatar.types';
import './AgentAvatar.css';

/** Rótulo padrão: o nome do produto, nunca "assistente", "guia" nem "chatbot". */
export const AGENT_NAME = 'Agente de IA do professor';

/**
 * Qual dos dois bitmaps embutidos serve cada tamanho. O de 128px cobre até o
 * `md` (48px) em tela 2x; o de 256px, o `lg` (72px) e o `xl` (100px).
 */
const IMAGEM_POR_TAMANHO: Record<AgentAvatarSize, string> = {
  xs: AGENT_IMAGES_BASE64[128],
  sm: AGENT_IMAGES_BASE64[128],
  md: AGENT_IMAGES_BASE64[128],
  lg: AGENT_IMAGES_BASE64[256],
  xl: AGENT_IMAGES_BASE64[256],
};

/**
 * AgentAvatar — o rosto do agente de IA do professor (Plataforma Unooria).
 *
 * Composição sobre o `Avatar` do pacote, e não variante dele: o bitmap
 * embutido (~22 KB em base64) só entra no bundle de quem importa este
 * componente. Uma variante do `Avatar` arrastaria o mascote para toda tela que
 * mostra a foto de uma pessoa.
 *
 * Server Component: não usa hook e não repassa função.
 */
export const AgentAvatar = forwardRef<HTMLDivElement, AgentAvatarProps>(
  (
    {
      size = 'md',
      alt = AGENT_NAME,
      decorative = false,
      theme = 'light',
      className = '',
      ...rest
    },
    ref
  ) => (
    <Avatar
      {...rest}
      ref={ref}
      src={IMAGEM_POR_TAMANHO[size]}
      alt={alt}
      size={size}
      theme={theme}
      variant="circle"
      aria-hidden={decorative ? true : rest['aria-hidden']}
      className={['unooria-agent-avatar', className].filter(Boolean).join(' ')}
    />
  )
);

AgentAvatar.displayName = 'AgentAvatar';

export default AgentAvatar;
