import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type {
  UncMessageBubbleProps,
  UncMessageDocumentProps,
  UncMessageInviteProps,
  UncMessageLinkPreviewProps,
  UncMessageMediaProps,
} from './MessageBubble.types';
import './MessageBubble.css';

/**
 * Miniatura de mídia anexada, com raio de 5px.
 *
 * Sem `src`, a moldura exibe os `children` — a mídia desenhada — e se anuncia
 * como imagem pelo `alt`, para que o leitor de tela leia o mesmo que a imagem
 * leria.
 *
 * Com `onClick`, a moldura é um `<button>` com o mesmo desenho. Ali a mídia
 * desenhada NÃO leva `role="img"`: os filhos de um botão são apresentacionais,
 * e o nome dele é o `actionLabel` — ou, sem ele, o `alt`.
 */
const MessageMedia: React.FC<UncMessageMediaProps> = ({
  src,
  alt,
  ratio = '16 / 9',
  children,
  onClick,
  actionLabel,
  className = '',
  style,
  ...restProps
}) => {
  const classes = [
    'unc-messagebubble__media',
    src ? '' : 'unc-messagebubble__media--drawn',
    onClick ? 'unc-messagebubble__media--action' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const estilo = { aspectRatio: ratio, ...style };
  const conteudo = src ? <img src={src} alt={alt} /> : children;

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        style={estilo}
        onClick={onClick}
        aria-label={actionLabel ?? (src ? undefined : alt)}
        {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {conteudo}
      </button>
    );
  }

  return (
    <div
      className={classes}
      style={estilo}
      {...(src ? {} : { role: 'img', 'aria-label': alt })}
      {...(restProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {conteudo}
    </div>
  );
};

MessageMedia.displayName = 'MessageBubble.Media';

/**
 * Faixa de documento anexado em `--unc-color-surface-bubble-out-strip`.
 */
const MessageDocument: React.FC<UncMessageDocumentProps> = ({
  name,
  details = [],
  className = '',
  ...restProps
}) => (
  <div
    className={['unc-messagebubble__document', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    <Icon name="filePdf" size={22} tone="inherit" title="Documento PDF" />
    <span className="unc-messagebubble__document-name">{name}</span>
    {details.length > 0 && (
      <span className="unc-messagebubble__document-details">
        {details.map((detail, index) => (
          <React.Fragment key={detail}>
            {index > 0 && <span className="unc-messagebubble__document-separator" />}
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
 * domínio, sobre a faixa `--unc-color-surface-bubble-out-strip` — a mesma
 * superfície do documento anexado.
 */
const MessageLinkPreview: React.FC<UncMessageLinkPreviewProps> = ({
  title,
  description,
  domain,
  thumbnail,
  onClick,
  className = '',
  ...restProps
}) => {
  const classes = [
    'unc-messagebubble__link',
    onClick ? 'unc-messagebubble__link--action' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {thumbnail && <span className="unc-messagebubble__link-thumb">{thumbnail}</span>}
      <span className="unc-messagebubble__link-body">
        <span className="unc-messagebubble__link-title">{title}</span>
        {description && (
          <span className="unc-messagebubble__link-description">{description}</span>
        )}
        <span className="unc-messagebubble__link-domain">{domain}</span>
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
 * `--unc-color-accent`.
 */
const MessageInvite: React.FC<UncMessageInviteProps> = ({
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
    className={['unc-messagebubble__invite', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    <div className="unc-messagebubble__invite-head">
      <Avatar src={avatarSrc} initials={initials} size="md" alt="" />
      <span className="unc-messagebubble__invite-text">
        <span className="unc-messagebubble__invite-title">{title}</span>
        {subtitle && <span className="unc-messagebubble__invite-subtitle">{subtitle}</span>}
      </span>
    </div>
    <button
      type="button"
      className="unc-messagebubble__invite-action"
      onClick={onAction}
      disabled={actionDisabled}
    >
      {actionLabel}
    </button>
  </div>
);

MessageInvite.displayName = 'MessageBubble.Invite';

/**
 * Componente MessageBubble — Design System Unoochat
 *
 * Balão de mensagem com composição modular. O balão enviado usa
 * `--unc-color-surface-bubble-out` e leva a cauda inferior direita; o recebido
 * usa `--unc-color-surface-bubble-in`.
 *
 * `sender` e `forwardedLabel` são extensões: o nome de quem escreve em conversa
 * de grupo e o selo de mensagem encaminhada.
 */
const MessageBubbleRoot = React.forwardRef<HTMLDivElement, UncMessageBubbleProps>(
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
    const classes = ['unc-messagebubble', `unc-messagebubble--${direction}`, className]
      .filter(Boolean)
      .join(' ');

    const isPlainText = typeof children === 'string' || typeof children === 'number';

    return (
      <div
        ref={ref}
        className={classes}
        style={
          {
            ['--unc-messagebubble-max-width' as string]: `${maxWidth}px`,
            ...style,
          } as React.CSSProperties
        }
        {...restProps}
      >
        {sender && <span className="unc-messagebubble__sender">{sender}</span>}

        {forwardedLabel && (
          <span className="unc-messagebubble__forwarded">
            <Icon name="forward" size={12} tone="inherit" aria-hidden="true" />
            {forwardedLabel}
          </span>
        )}

        {isPlainText ? <p className="unc-messagebubble__text">{children}</p> : children}

        {(time || delivery !== 'none' || starred) && (
          <div className="unc-messagebubble__footer">
            {starred && <Icon name="star" size={11} tone="star" title="Favoritada" />}
            {time && <span>{time}</span>}
            {delivery !== 'none' && (
              <>
                <Icon
                  name={delivery === 'read' ? 'tickDouble' : 'tick'}
                  size={16}
                  tone="tick"
                  title={delivery === 'read' ? 'Lida' : 'Entregue'}
                />
              </>
            )}
          </div>
        )}

        {tail && <span className="unc-messagebubble__tail" />}
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
