import React from 'react';
import type { UglPerson } from '../../media';
import './ShareSheet.css';

/**
 * Iniciais de um nome: primeira letra da primeira e da última palavra.
 */
export const uglInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const first = [...words[0]][0] ?? '';
  const last = words.length > 1 ? ([...words[words.length - 1]][0] ?? '') : '';
  return `${first}${last}`.toLocaleUpperCase('pt-BR');
};

/**
 * Propriedades do retrato interno do compartilhamento e do painel de
 * informações.
 */
export interface UglSharePortraitProps {
  /** Pessoa retratada */
  person: UglPerson;
  /**
   * Diâmetro: 'md' 48px (painel de informações) ou 'lg' 64px (contatos).
   * @default 'lg'
   */
  size?: 'md' | 'lg';
}

/**
 * Retrato circular de uma pessoa, com as iniciais quando não há imagem.
 *
 * É peça INTERNA do ShareSheet e do InfoPanel (não é exportada pelo pacote):
 * o `Avatar` do módulo é escrito em paralelo e ainda não existe. O retrato é
 * sempre decorativo — o nome da pessoa aparece ao lado e nomeia o controle —,
 * por isso a imagem tem `alt` vazio e as iniciais ficam `aria-hidden`.
 *
 * Server Component: só recebe props e renderiza.
 */
export const SharePortrait: React.FC<UglSharePortraitProps> = ({ person, size = 'lg' }) => (
  <span className={`ugl-share-portrait ugl-share-portrait--${size}`} aria-hidden="true">
    <span className="ugl-share-portrait__initials">{uglInitials(person.name)}</span>
    {person.avatarSrc && (
      <img
        className="ugl-share-portrait__image"
        src={person.avatarSrc}
        alt=""
        loading="lazy"
        decoding="async"
      />
    )}
  </span>
);
