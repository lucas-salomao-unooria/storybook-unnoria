import React, { forwardRef } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import type { SpeechBubbleMood, SpeechBubbleProps } from './SpeechBubble.types';
import './SpeechBubble.css';

/** O ícone e o nome acessível de cada humor com acento. */
const HUMORES: Record<Exclude<SpeechBubbleMood, 'neutral'>, { icone: string; rotulo: string }> = {
  upset: { icone: 'sentiment_dissatisfied', rotulo: 'Não gostou' },
  happy: { icone: 'sentiment_satisfied', rotulo: 'Gostou' },
};

/**
 * Componente SpeechBubble — Plataforma Unooria
 *
 * O balão de fala da redação: o avatar, o nome de quem fala em semibold e a
 * fala em 16px, numa nuvem de raio 16px com a ponta apontando para o avatar.
 * O guia tem destaque de marca; o leitor é neutro e pode carregar um humor
 * (acento de cor MAIS ícone com nome — nunca só cor). Design próprio: a seção
 * não tem quadro de balão no Figma; o avatar é o `Avatar` `sm` do pacote, o
 * raio e o fio são os do `Card`.
 *
 * **Por que `<figure>`, e não `div role="group"`.** Uma fala atribuída a
 * alguém é, em HTML, uma citação com legenda: `<figure>` com `<blockquote>` (a
 * fala) e `<figcaption>` (quem fala). A figura se nomeia pela legenda sem
 * `aria-label` duplicado e sem `useId` — então funciona mesmo quando o
 * `speaker` é um elemento, e o componente segue Server Component. A legenda
 * guarda SÓ o nome: o ícone de humor e a ação são irmãos dela, para que o nome
 * da figura seja "Bento", e não "Bento Gostou Ouvir".
 *
 * A legenda precisa ser filha direta da figura (primeira ou última), então o
 * balão não é um elemento: é o `::before` da grade, estendido sobre as células
 * do nome, do humor, da ação e da fala. A ponta é o `::after`.
 *
 * O avatar é decorativo (o nome está escrito ao lado): fica sob `aria-hidden`.
 */
export const SpeechBubble = forwardRef<HTMLElement, SpeechBubbleProps>(
  (
    {
      speaker,
      children,
      tone = 'reader',
      mood = 'neutral',
      moodLabel,
      avatarSrc,
      avatarInitials,
      side = 'start',
      action,
      theme = 'light',
      className = '',
      ...rest
    },
    ref
  ) => {
    const humor = tone === 'reader' && mood !== 'neutral' ? HUMORES[mood] : null;
    const nomeEmTexto = typeof speaker === 'string' ? speaker : undefined;
    const temAcao = action !== null && action !== undefined && action !== false;

    const classes = [
      'unooria-speech-bubble',
      `unooria-speech-bubble--tone-${tone}`,
      `unooria-speech-bubble--side-${side}`,
      humor ? `unooria-speech-bubble--mood-${mood}` : '',
      theme === 'dark' ? 'unooria-speech-bubble--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <figure ref={ref} className={classes} {...rest}>
        <figcaption className="unooria-speech-bubble__speaker">{speaker}</figcaption>

        {/* O `Avatar` mostra a foto; sem ela, as iniciais do `name`; sem
            `name`, o que vier como filho. Por isso `avatarInitials` entra como
            filho e, quando existe, o `name` fica de fora — senão ele venceria. */}
        <span className="unooria-speech-bubble__avatar" aria-hidden="true">
          <Avatar
            size="sm"
            theme={theme}
            selected={tone === 'guide'}
            src={avatarSrc}
            name={avatarInitials ? undefined : nomeEmTexto}
          >
            {avatarInitials}
          </Avatar>
        </span>

        {humor && (
          <span className="unooria-speech-bubble__mood">
            <Icon name={humor.icone} size="xxs" color="currentColor" aria-label={moodLabel || humor.rotulo} />
          </span>
        )}

        <blockquote className="unooria-speech-bubble__speech">{children}</blockquote>

        {temAcao && <div className="unooria-speech-bubble__action">{action}</div>}
      </figure>
    );
  }
);

SpeechBubble.displayName = 'SpeechBubble';

export default SpeechBubble;
