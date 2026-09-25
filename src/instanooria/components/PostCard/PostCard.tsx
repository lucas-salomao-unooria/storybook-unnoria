'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type {
  InstaPostActionsProps,
  InstaPostCaptionProps,
  InstaPostCardProps,
  InstaPostHeaderProps,
  InstaPostLikesProps,
  InstaPostMediaProps,
  InstaPostTimestampProps,
} from './PostCard.types';
import './PostCard.css';

/**
 * Cabeçalho do post — frame "Post / Top" (375×54px).
 *
 * Reúne o avatar de 32px, o nome de usuário, o selo de conta oficial, a
 * localização e o botão de opções alinhado à direita.
 */
const PostCardHeader: React.FC<InstaPostHeaderProps> = ({
  username,
  location,
  avatarSrc,
  initials,
  verified = false,
  ring = 'none',
  onMore,
  moreLabel = 'Opções da publicação',
  theme = 'light',
  className = '',
  ...restProps
}) => (
  <div
    data-insta-theme={theme}
    className={['insta-post-card__header', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    <Avatar src={avatarSrc} alt="" initials={initials} size={32} ring={ring} theme={theme} />

    <div className="insta-post-card__identity">
      <div className="insta-post-card__username-row">
        <p className="insta-post-card__username">{username}</p>
        {verified && <Icon name="verified" size={10} title="Conta oficial" theme={theme} />}
      </div>
      {location && <p className="insta-post-card__location">{location}</p>}
    </div>

    {onMore && (
      <button
        type="button"
        className="insta-post-card__more"
        onClick={onMore}
        aria-label={moreLabel}
      >
        <Icon name="more" size={14} theme={theme} />
      </button>
    )}
  </div>
);

PostCardHeader.displayName = 'PostCard.Header';

/**
 * Mídia do post — retângulo de 375×375px com contador de carrossel opcional.
 *
 * Sem `src`, `children` é o slide. Com `src` que não carrega, entra o estado
 * de erro com "Tentar novamente" — o quadro não publica nenhum dos dois.
 */
const PostCardMedia: React.FC<InstaPostMediaProps> = ({
  src,
  alt,
  currentIndex,
  totalCount,
  aspectRatio = 1,
  children,
  onRetry,
  onMediaError,
  errorLabel = 'Não foi possível carregar a imagem.',
  retryLabel = 'Tentar novamente',
  theme = 'light',
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
      data-insta-theme={theme}
      className={['insta-post-card__media', className].filter(Boolean).join(' ')}
      style={{ aspectRatio: `${aspectRatio} / 1`, ...style }}
      {...restProps}
    >
      {hasImage && !hasError && (
        <img
          key={attempt}
          ref={detectBrokenImage}
          className="insta-post-card__media-image"
          src={src}
          alt={alt ?? ''}
          onError={handleError}
        />
      )}

      {!hasImage && children !== undefined && (
        <div
          className="insta-post-card__media-slide"
          role={alt ? 'group' : undefined}
          aria-label={alt || undefined}
        >
          {children}
        </div>
      )}

      {hasError && (
        <div className="insta-post-card__media-error">
          <p className="insta-post-card__media-error-label">{errorLabel}</p>
          <Button variant="secondary" size="sm" theme={theme} onClick={handleRetry}>
            {retryLabel}
          </Button>
        </div>
      )}

      {currentIndex !== undefined && totalCount !== undefined && totalCount > 1 && (
        <Badge variant="counter" theme={theme} className="insta-post-card__media-counter">
          {currentIndex}/{totalCount}
        </Badge>
      )}
    </div>
  );
};

PostCardMedia.displayName = 'PostCard.Media';

/**
 * Barra de ações do post — curtir, comentar, compartilhar, salvar e paginação.
 */
const PostCardActions: React.FC<InstaPostActionsProps> = ({
  liked = false,
  saved = false,
  currentIndex = 1,
  totalCount = 1,
  onLike,
  onComment,
  onShare,
  onSave,
  theme = 'light',
  className = '',
  ...restProps
}) => (
  <div
    data-insta-theme={theme}
    className={['insta-post-card__actions', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    <button
      type="button"
      className={[
        'insta-post-card__action',
        liked ? 'insta-post-card__action--liked' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onLike}
      aria-pressed={liked}
      aria-label={liked ? 'Descurtir publicação' : 'Curtir publicação'}
    >
      <Icon name={liked ? 'heartFilled' : 'heart'} size={24} tone="inherit" theme={theme} />
    </button>

    <button
      type="button"
      className="insta-post-card__action"
      onClick={onComment}
      aria-label="Comentar publicação"
    >
      <Icon name="comment" size={23} tone="inherit" theme={theme} />
    </button>

    <button
      type="button"
      className="insta-post-card__action"
      onClick={onShare}
      aria-label="Compartilhar publicação"
    >
      <Icon name="share" size={23} tone="inherit" theme={theme} />
    </button>

    {totalCount > 1 && (
      <div className="insta-post-card__pagination" aria-hidden="true">
        {Array.from({ length: totalCount }, (_, index) => (
          <span
            key={index}
            className={[
              'insta-post-card__dot',
              index + 1 === currentIndex ? 'insta-post-card__dot--active' : '',
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
        'insta-post-card__action',
        'insta-post-card__action--save',
        saved ? 'insta-post-card__action--saved' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onSave}
      aria-pressed={saved}
      aria-label={saved ? 'Remover dos salvos' : 'Salvar publicação'}
    >
      <Icon name={saved ? 'bookmarkFilled' : 'bookmark'} size={23} tone="inherit" theme={theme} />
    </button>
  </div>
);

PostCardActions.displayName = 'PostCard.Actions';

/**
 * Prova social de curtidas — avatar de 17px e contagem em negrito.
 */
const PostCardLikes: React.FC<InstaPostLikesProps> = ({
  avatarSrc,
  username,
  count,
  theme = 'light',
  className = '',
  children,
  ...restProps
}) => (
  <div
    data-insta-theme={theme}
    className={['insta-post-card__likes', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    {avatarSrc && <Avatar src={avatarSrc} alt="" size={17} theme={theme} />}
    <p className="insta-post-card__likes-text">
      {children ?? (
        <>
          Curtido por <span className="insta-post-card__strong">{username}</span>
          {count !== undefined && (
            <>
              {' e '}
              <span className="insta-post-card__strong">{count.toLocaleString('pt-BR')} outras pessoas</span>
            </>
          )}
        </>
      )}
    </p>
  </div>
);

PostCardLikes.displayName = 'PostCard.Likes';

/**
 * Legenda do post — nome do autor em negrito seguido do texto.
 */
const PostCardCaption: React.FC<InstaPostCaptionProps> = ({
  username,
  children,
  theme = 'light',
  className = '',
  ...restProps
}) => (
  <p
    data-insta-theme={theme}
    className={['insta-post-card__caption', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    {username && <span className="insta-post-card__caption-author">{username} </span>}
    {children}
  </p>
);

PostCardCaption.displayName = 'PostCard.Caption';

/**
 * Carimbo de data do post.
 */
const PostCardTimestamp: React.FC<InstaPostTimestampProps> = ({
  children,
  theme = 'light',
  className = '',
  ...restProps
}) => (
  <p
    data-insta-theme={theme}
    className={['insta-post-card__timestamp', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    {children}
  </p>
);

PostCardTimestamp.displayName = 'PostCard.Timestamp';

/**
 * Raiz do PostCard.
 */
const PostCardRoot = React.forwardRef<HTMLElement, InstaPostCardProps>(
  ({ theme = 'light', children, className = '', ...restProps }, ref) => (
    <article
      ref={ref}
      data-insta-theme={theme}
      className={['insta-post-card', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </article>
  )
);

PostCardRoot.displayName = 'PostCard';

/**
 * Componente PostCard — Design System Instanooria
 *
 * Publicação do Feed montada por composição modular, espelhando a anatomia do
 * frame "Post" do Figma: `Post / Top` (54px), a mídia quadrada de 375px e
 * `Post / Bottom` (147px) com ações, prova social, legenda e data.
 *
 * @example
 * <PostCard>
 *   <PostCard.Header username="joshua_l" location="Tokyo, Japan" verified />
 *   <PostCard.Media src={photo} alt="Shibuya" currentIndex={1} totalCount={3} />
 *   <PostCard.Actions liked currentIndex={1} totalCount={3} />
 *   <PostCard.Likes avatarSrc={friend} username="craig_love" count={44686} />
 *   <PostCard.Caption username="joshua_l">Tóquio foi incrível.</PostCard.Caption>
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
