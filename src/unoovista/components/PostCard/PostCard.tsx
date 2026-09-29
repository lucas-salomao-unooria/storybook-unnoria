'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type {
  UnvPostActionsProps,
  UnvPostCaptionProps,
  UnvPostCardProps,
  UnvPostHeaderProps,
  UnvPostLikesProps,
  UnvPostMediaProps,
  UnvPostTimestampProps,
} from './PostCard.types';
import './PostCard.css';

/**
 * Cabeçalho da publicação: avatar, nome, selo de conta oficial, local e o
 * botão de opções em círculo, alinhado à direita.
 */
const PostCardHeader: React.FC<UnvPostHeaderProps> = ({
  username,
  location,
  avatarSrc,
  initials,
  verified = false,
  ring = 'none',
  onMore,
  moreLabel = 'Opções da publicação',
  theme,
  className = '',
  ...restProps
}) => (
  <div
    data-unv-theme={theme}
    className={['unv-post-card__header', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    <Avatar src={avatarSrc} alt="" initials={initials} size={40} ring={ring} theme={theme} />

    <div className="unv-post-card__identity">
      <div className="unv-post-card__username-row">
        <p className="unv-post-card__username">{username}</p>
        {verified && (
          <Icon
            name="verified"
            size="sm"
            tone="inherit"
            title="Conta oficial"
            className="unv-post-card__verified"
            theme={theme}
          />
        )}
      </div>
      {location && <p className="unv-post-card__location">{location}</p>}
    </div>

    {onMore && (
      <button
        type="button"
        className="unv-post-card__more"
        onClick={onMore}
        aria-label={moreLabel}
      >
        <Icon name="more" size="md" tone="inherit" theme={theme} />
      </button>
    )}
  </div>
);

PostCardHeader.displayName = 'PostCard.Header';

/**
 * Mídia da publicação, com cantos arredondados, contador e pontos de carrossel
 * opcionais.
 *
 * Sem `src`, `children` é o slide. Com `src` que não carrega, entra o estado
 * de erro com "Tentar novamente". Quando a barra de ações vem logo depois, ela
 * se sobrepõe à base da mídia e os pontos do carrossel sobem para acima dela.
 */
const PostCardMedia: React.FC<UnvPostMediaProps> = ({
  src,
  alt,
  currentIndex,
  totalCount,
  aspectRatio = 1,
  children,
  onRetry,
  onMediaError,
  errorLabel = 'Não foi possível carregar a imagem.',
  errorDescription,
  retryLabel = 'Tentar novamente',
  theme,
  className = '',
  style,
  ...restProps
}) => {
  /*
   * O erro fica preso à `src` que falhou: trocar a `src` limpa o estado sem
   * efeito nenhum, e "Tentar novamente" remonta o <img> pela chave.
   */
  const [failedSrc, setFailedSrc] = React.useState<string | null>(null);
  const [attempt, setAttempt] = React.useState(0);
  const hasImage = src !== undefined && src !== '';
  const hasError = hasImage && failedSrc === src;
  // `undefined` herda o `alt`; `null` (ou string vazia) é o consumidor pedindo silêncio.
  const description = errorDescription === undefined ? alt : errorDescription;
  const isCarousel = currentIndex !== undefined && totalCount !== undefined && totalCount > 1;

  const handleError = () => {
    if (hasImage) {
      setFailedSrc(src);
      onMediaError?.();
    }
  };

  /*
   * Uma imagem que falha antes da hidratação não dispara o `onError` do React.
   * Ao montar, o nó já diz: completo e sem largura natural é imagem quebrada.
   */
  const detectBrokenImage = (node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth === 0 && node.currentSrc !== '') {
      handleError();
    }
  };

  const handleRetry = () => {
    setFailedSrc(null);
    setAttempt((value) => value + 1);
    onRetry?.();
  };

  return (
    <div
      data-unv-theme={theme}
      className={['unv-post-card__media', className].filter(Boolean).join(' ')}
      style={{ aspectRatio: `${aspectRatio} / 1`, ...style }}
      {...restProps}
    >
      {hasImage && !hasError && (
        <img
          key={attempt}
          ref={detectBrokenImage}
          className="unv-post-card__media-image"
          src={src}
          alt={alt ?? ''}
          onError={handleError}
        />
      )}

      {!hasImage && children !== undefined && (
        <div
          className="unv-post-card__media-slide"
          role={alt ? 'group' : undefined}
          aria-label={alt || undefined}
        >
          {children}
        </div>
      )}

      {hasError && (
        <div className="unv-post-card__media-error">
          <p className="unv-post-card__media-error-label">{errorLabel}</p>
          {description !== null && description !== undefined && description !== '' && (
            <p className="unv-post-card__media-error-description">{description}</p>
          )}
          <Button variant="secondary" size="sm" theme={theme} onClick={handleRetry}>
            {retryLabel}
          </Button>
        </div>
      )}

      {isCarousel && (
        <Badge variant="counter" theme={theme} className="unv-post-card__media-counter">
          {currentIndex}/{totalCount}
        </Badge>
      )}

      {isCarousel && (
        <div className="unv-post-card__media-dots" aria-hidden="true">
          {Array.from({ length: totalCount }, (_, index) => (
            <span
              key={index}
              className={[
                'unv-post-card__dot',
                index + 1 === currentIndex ? 'unv-post-card__dot--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

PostCardMedia.displayName = 'PostCard.Media';

/**
 * Barra de ações da publicação: curtir, comentar e compartilhar à esquerda,
 * salvar à direita. Logo depois da mídia, vira uma pílula sobreposta à base
 * dela; solta, é uma linha simples.
 */
const PostCardActions: React.FC<UnvPostActionsProps> = ({
  liked = false,
  saved = false,
  currentIndex = 1,
  totalCount = 1,
  onLike,
  onComment,
  onShare,
  onSave,
  theme,
  className = '',
  ...restProps
}) => (
  <div
    data-unv-theme={theme}
    className={['unv-post-card__actions', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    <div className="unv-post-card__actions-group">
      <button
        type="button"
        className={[
          'unv-post-card__action',
          liked ? 'unv-post-card__action--liked' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={onLike}
        aria-pressed={liked}
        aria-label={liked ? 'Descurtir publicação' : 'Curtir publicação'}
      >
        <Icon name={liked ? 'heartFilled' : 'heart'} size="md" tone="inherit" theme={theme} />
      </button>

      <button
        type="button"
        className="unv-post-card__action"
        onClick={onComment}
        aria-label="Comentar publicação"
      >
        <Icon name="comment" size="md" tone="inherit" theme={theme} />
      </button>

      <button
        type="button"
        className="unv-post-card__action"
        onClick={onShare}
        aria-label="Compartilhar publicação"
      >
        <Icon name="share" size="md" tone="inherit" theme={theme} />
      </button>
    </div>

    {totalCount > 1 && (
      <div className="unv-post-card__pagination" aria-hidden="true">
        {Array.from({ length: totalCount }, (_, index) => (
          <span
            key={index}
            className={[
              'unv-post-card__dot',
              index + 1 === currentIndex ? 'unv-post-card__dot--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>
    )}

    <button
      type="button"
      className={[
        'unv-post-card__action',
        'unv-post-card__action--save',
        saved ? 'unv-post-card__action--saved' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onSave}
      aria-pressed={saved}
      aria-label={saved ? 'Remover dos salvos' : 'Salvar publicação'}
    >
      <Icon name={saved ? 'bookmarkFilled' : 'bookmark'} size="md" tone="inherit" theme={theme} />
    </button>
  </div>
);

PostCardActions.displayName = 'PostCard.Actions';

/**
 * Prova social de curtidas: avatar pequeno e contagem em negrito.
 */
const PostCardLikes: React.FC<UnvPostLikesProps> = ({
  avatarSrc,
  username,
  count,
  theme,
  className = '',
  children,
  ...restProps
}) => (
  <div
    data-unv-theme={theme}
    className={['unv-post-card__likes', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    {avatarSrc && <Avatar src={avatarSrc} alt="" size={20} theme={theme} />}
    <p className="unv-post-card__likes-text">
      {children ?? (
        <>
          Curtido por <span className="unv-post-card__strong">{username}</span>
          {count !== undefined && (
            <>
              {' e '}
              <span className="unv-post-card__strong">{count.toLocaleString('pt-BR')} outras pessoas</span>
            </>
          )}
        </>
      )}
    </p>
  </div>
);

PostCardLikes.displayName = 'PostCard.Likes';

/**
 * Legenda da publicação: nome do autor em negrito seguido do texto.
 */
const PostCardCaption: React.FC<UnvPostCaptionProps> = ({
  username,
  children,
  theme,
  className = '',
  ...restProps
}) => (
  <p
    data-unv-theme={theme}
    className={['unv-post-card__caption', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    {username && <span className="unv-post-card__caption-author">{username} </span>}
    {children}
  </p>
);

PostCardCaption.displayName = 'PostCard.Caption';

/**
 * Carimbo de data da publicação.
 */
const PostCardTimestamp: React.FC<UnvPostTimestampProps> = ({
  children,
  theme,
  className = '',
  ...restProps
}) => (
  <p
    data-unv-theme={theme}
    className={['unv-post-card__timestamp', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    {children}
  </p>
);

PostCardTimestamp.displayName = 'PostCard.Timestamp';

/**
 * Raiz do PostCard: o cartão único que abriga as zonas.
 */
const PostCardRoot = React.forwardRef<HTMLElement, UnvPostCardProps>(
  ({ theme, children, className = '', ...restProps }, ref) => (
    <article
      ref={ref}
      data-unv-theme={theme}
      className={['unv-post-card', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </article>
  )
);

PostCardRoot.displayName = 'PostCard';

/**
 * Componente PostCard — Design System Unoovista
 *
 * Publicação do feed montada por composição modular, num cartão único de
 * superfície primária: cabeçalho do autor, mídia de cantos arredondados, barra
 * de ações em pílula sobreposta à base da mídia, curtidas, legenda e data.
 *
 * @example
 * <PostCard>
 *   <PostCard.Header username="caioDev" location="Tóquio, Japão" verified />
 *   <PostCard.Media src={photo} alt="Cruzamento de Shibuya" currentIndex={1} totalCount={3} />
 *   <PostCard.Actions liked currentIndex={1} totalCount={3} />
 *   <PostCard.Likes avatarSrc={friend} username="biaRaiz" count={44686} />
 *   <PostCard.Caption username="caioDev">Tóquio foi incrível.</PostCard.Caption>
 *   <PostCard.Timestamp>19 de setembro</PostCard.Timestamp>
 * </PostCard>
 */
export const PostCard = Object.assign(PostCardRoot, {
  Header: PostCardHeader,
  Media: PostCardMedia,
  Actions: PostCardActions,
  Likes: PostCardLikes,
  Caption: PostCardCaption,
  Timestamp: PostCardTimestamp,
});
