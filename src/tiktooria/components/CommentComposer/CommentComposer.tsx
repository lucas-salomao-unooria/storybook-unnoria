import React from 'react';
import { Icon } from '../Icon';
import type { TikCommentComposerProps } from './CommentComposer.types';
import './CommentComposer.css';

/**
 * Componente CommentComposer — Design System Tik Tooria
 *
 * Barra inferior branca de 414×83 da tela de comentários (node 4:959). Não há
 * campo desenhado no arquivo: apenas o texto de reserva em Regular 15 e os dois
 * glifos de 22px na borda direita. Os 83px incluem os 35px do indicador de home,
 * por isso o conteúdo se alinha ao topo da barra.
 */
export const CommentComposer = React.forwardRef<HTMLInputElement, TikCommentComposerProps>(
  (
    {
      placeholder = 'Add comment...',
      ariaLabel = 'Adicionar comentário',
      onTagPress,
      onEmojiPress,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <div className={['tik-commentcomposer', className].filter(Boolean).join(' ')}>
      <input
        ref={ref}
        type="text"
        className="tik-commentcomposer__input"
        placeholder={placeholder}
        aria-label={ariaLabel}
        {...restProps}
      />

      <button
        type="button"
        className="tik-commentcomposer__action"
        onClick={onTagPress}
        aria-label="Marcar conteúdo publicitário"
      >
        <Icon name="adSign" size={22} tone="primary" />
      </button>

      <button
        type="button"
        className="tik-commentcomposer__action"
        onClick={onEmojiPress}
        aria-label="Inserir emoji"
      >
        <Icon name="emoji" size={22} tone="primary" />
      </button>
    </div>
  )
);

CommentComposer.displayName = 'CommentComposer';
