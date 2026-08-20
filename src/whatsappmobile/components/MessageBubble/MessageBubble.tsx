import React from 'react';
import { Icon } from '../Icon';
import type {
  WaMessageBubbleProps,
  WaMessageDocumentProps,
  WaMessageMediaProps,
} from './MessageBubble.types';
import './MessageBubble.css';

/**
 * Miniatura de mídia anexada, com raio de 5px como no frame de origem.
 */
const MessageMedia: React.FC<WaMessageMediaProps> = ({
  src,
  alt,
  ratio = '16 / 9',
  className = '',
  style,
  ...restProps
}) => (
  <div
    className={['wa-messagebubble__media', className].filter(Boolean).join(' ')}
    style={{ aspectRatio: ratio, ...style }}
    {...restProps}
  >
    <img src={src} alt={alt} />
  </div>
);

MessageMedia.displayName = 'MessageBubble.Media';

/**
 * Faixa de documento anexado em `--wa-color-surface-bubble-out-strip`.
 */
const MessageDocument: React.FC<WaMessageDocumentProps> = ({
  name,
  details = [],
  className = '',
  ...restProps
}) => (
  <div
    className={['wa-messagebubble__document', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    <Icon name="filePdf" size={22} tone="inherit" title="Documento PDF" />
    <span className="wa-messagebubble__document-name">{name}</span>
    {details.length > 0 && (
      <span className="wa-messagebubble__document-details">
        {details.map((detail, index) => (
          <React.Fragment key={detail}>
            {index > 0 && <span className="wa-messagebubble__document-separator" />}
            <span>{detail}</span>
          </React.Fragment>
        ))}
      </span>
    )}
  </div>
);

MessageDocument.displayName = 'MessageBubble.Document';

/**
 * Componente MessageBubble — Design System WhatsApp Mobile
 *
 * Balão de mensagem com composição modular. O balão enviado reproduz o
 * preenchimento #054640 e a cauda inferior direita do vetor original
 * (node 1:2931); o balão recebido usa `--wa-color-surface-bubble-in` — desvio
 * registrado, já que o arquivo de origem não publica esse frame.
 */
const MessageBubbleRoot = React.forwardRef<HTMLDivElement, WaMessageBubbleProps>(
  (
    {
      direction = 'out',
      children,
      time,
      delivery = 'none',
      starred = false,
      tail = true,
      maxWidth = 240,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = ['wa-messagebubble', `wa-messagebubble--${direction}`, className]
      .filter(Boolean)
      .join(' ');

    const isPlainText = typeof children === 'string' || typeof children === 'number';

    return (
      <div
        ref={ref}
        className={classes}
        style={
          {
            ['--wa-messagebubble-max-width' as string]: `${maxWidth}px`,
            ...style,
          } as React.CSSProperties
        }
        {...restProps}
      >
        {isPlainText ? <p className="wa-messagebubble__text">{children}</p> : children}

        {(time || delivery !== 'none' || starred) && (
          <div className="wa-messagebubble__footer">
            {starred && <Icon name="star" size={11} tone="star" title="Favoritada" />}
            {time && <span>{time}</span>}
            {delivery !== 'none' && (
              <>
                <Icon
                  name="tick"
                  size={13}
                  tone="tick"
                  title={delivery === 'read' ? 'Lida' : 'Entregue'}
                />
                {delivery === 'read' && <Icon name="tick" size={13} tone="tick" />}
              </>
            )}
          </div>
        )}

        {tail && <span className="wa-messagebubble__tail" />}
      </div>
    );
  }
);

MessageBubbleRoot.displayName = 'MessageBubble';

/**
 * Balão de mensagem com os subcomponentes `Media` e `Document`.
 */
export const MessageBubble = Object.assign(MessageBubbleRoot, {
  Media: MessageMedia,
  Document: MessageDocument,
});
