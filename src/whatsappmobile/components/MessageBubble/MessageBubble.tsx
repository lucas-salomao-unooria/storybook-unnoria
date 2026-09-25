import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type {
  WaMessageBubbleProps,
  WaMessageDocumentProps,
  WaMessageInviteProps,
  WaMessageLinkPreviewProps,
  WaMessageMediaProps,
} from './MessageBubble.types';
import './MessageBubble.css';

/**
 * Miniatura de mídia anexada, com raio de 5px como no frame de origem.
 *
 * Sem `src`, a moldura exibe os `children` — a mídia desenhada — e se anuncia
 * como imagem pelo `alt`, para que o leitor de tela leia o mesmo que a imagem
 * leria.
 */
const MessageMedia: React.FC<WaMessageMediaProps> = ({
  src,
  alt,
  ratio = '16 / 9',
  children,
  className = '',
  style,
  ...restProps
}) => (
  <div
    className={[
      'wa-messagebubble__media',
      src ? '' : 'wa-messagebubble__media--drawn',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    style={{ aspectRatio: ratio, ...style }}
    {...(src ? {} : { role: 'img', 'aria-label': alt })}
    {...restProps}
  >
    {src ? <img src={src} alt={alt} /> : children}
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
 * Cartão de pré-visualização de link: miniatura opcional, manchete, resumo e
 * domínio, sobre a faixa `--wa-color-surface-bubble-out-strip` — a mesma
 * superfície que o arquivo usa para o documento anexado.
 */
const MessageLinkPreview: React.FC<WaMessageLinkPreviewProps> = ({
  title,
  description,
  domain,
  thumbnail,
  onClick,
  className = '',
  ...restProps
}) => {
  const classes = [
    'wa-messagebubble__link',
    onClick ? 'wa-messagebubble__link--action' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {thumbnail && <span className="wa-messagebubble__link-thumb">{thumbnail}</span>}
      <span className="wa-messagebubble__link-body">
        <span className="wa-messagebubble__link-title">{title}</span>
        {description && (
          <span className="wa-messagebubble__link-description">{description}</span>
        )}
        <span className="wa-messagebubble__link-domain">{domain}</span>
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={classes} {...(restProps as React.HTMLAttributes<HTMLDivElement>)}>
      {content}
    </div>
  );
};

MessageLinkPreview.displayName = 'MessageBubble.LinkPreview';

/**
 * Convite para grupo: avatar, nome e linha de apoio sobre a faixa da mensagem,
 * com a ação de entrar separada por um divisor — como a ação de um diálogo, em
 * `--wa-color-accent-action`.
 */
const MessageInvite: React.FC<WaMessageInviteProps> = ({
  title,
  subtitle,
  avatarSrc,
  initials,
  actionLabel,
  onAction,
  actionDisabled = false,
  className = '',
  ...restProps
}) => (
  <div
    className={['wa-messagebubble__invite', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    <div className="wa-messagebubble__invite-head">
      <Avatar src={avatarSrc} initials={initials} size="md" alt="" />
      <span className="wa-messagebubble__invite-text">
        <span className="wa-messagebubble__invite-title">{title}</span>
        {subtitle && <span className="wa-messagebubble__invite-subtitle">{subtitle}</span>}
      </span>
    </div>
    <button
      type="button"
      className="wa-messagebubble__invite-action"
      onClick={onAction}
      disabled={actionDisabled}
    >
      {actionLabel}
    </button>
  </div>
);

MessageInvite.displayName = 'MessageBubble.Invite';

/**
 * Componente MessageBubble — Design System WhatsApp Mobile
 *
 * Balão de mensagem com composição modular. O balão enviado reproduz o
 * preenchimento #054640 e a cauda inferior direita do vetor original
 * (node 1:2931); o balão recebido usa `--wa-color-surface-bubble-in` — desvio
 * registrado, já que o arquivo de origem não publica esse frame.
 *
 * `sender` e `forwardedLabel` são extensões: o arquivo não publica conversa de
 * grupo nem mensagem encaminhada.
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
      sender,
      forwardedLabel,
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
        {sender && <span className="wa-messagebubble__sender">{sender}</span>}

        {forwardedLabel && (
          <span className="wa-messagebubble__forwarded">
            <Icon name="forward" size={12} tone="inherit" aria-hidden="true" />
            {forwardedLabel}
          </span>
        )}

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
 * Balão de mensagem com os subcomponentes `Media`, `Document`, `LinkPreview` e
 * `Invite`.
 */
export const MessageBubble = Object.assign(MessageBubbleRoot, {
  Media: MessageMedia,
  Document: MessageDocument,
  LinkPreview: MessageLinkPreview,
  Invite: MessageInvite,
});
