import type React from 'react';
import type { AvatarSize } from '../Avatar/Avatar.types';
import type { UnooriaTheme } from '../../tokens';

/**
 * Tamanhos do avatar do agente — os MESMOS do `Avatar`, para que o agente e as
 * pessoas se alinhem numa conversa sem medida nova:
 * `xs` 32px, `sm` 40px, `md` 48px, `lg` 72px e `xl` 100px.
 */
export type AgentAvatarSize = AvatarSize;

/**
 * Propriedades do `AgentAvatar`, o rosto do agente de IA do professor.
 *
 * O desenho vem embutido no pacote (não há `src`): é identidade da marca, como
 * o `Logo`. Não há iniciais, status, selo nem botão de remover — o agente não é
 * uma pessoa, e o `Avatar` de pessoa continua sendo o lugar dessas coisas.
 */
export interface AgentAvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Tamanho, na escala do `Avatar`.
   * @default 'md'
   */
  size?: AgentAvatarSize;

  /**
   * Texto alternativo do desenho.
   * @default 'Agente de IA do professor'
   */
  alt?: string;

  /**
   * Decorativo: o avatar sai da árvore acessível (`aria-hidden`). Use quando o
   * nome do agente já está escrito ao lado — no cabeçalho do painel, numa
   * mensagem com rótulo, dentro do botão que abre o chat.
   * @default false
   */
  decorative?: boolean;

  /**
   * Tema visual: muda o disco atrás do desenho (lavanda no claro, roxo-marinho
   * no escuro). O desenho não muda.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}
