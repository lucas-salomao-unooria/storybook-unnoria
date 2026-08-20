import React from 'react';

/**
 * Diâmetros de avatar publicados pelo arquivo de design. Os seis degraus são
 * preservados como aparecem no Figma — nenhum foi consolidado.
 *
 * - 'xs': 32px (comentário)
 * - 'sm': 47px (autor do vídeo no feed)
 * - 'md': 49px (alvo de compartilhamento da folha)
 * - 'lg': 56px (linha social de "Find friends")
 * - 'xl': 90px (seletor de foto e vídeo do perfil)
 * - 'xxl': 96px (cabeçalho do perfil)
 */
export type TikAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Propriedades do avatar do Tik Tooria.
 */
export interface TikAvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Diâmetro do avatar. Aceita um token nomeado ou um valor em pixels.
   * @default 'sm'
   */
  size?: TikAvatarSize | number;

  /**
   * Endereço da fotografia. As fotografias do arquivo são bitmaps colados nos
   * frames e são informadas por prop, nunca embutidas no pacote.
   */
  src?: string;

  /**
   * Texto alternativo da fotografia.
   */
  alt?: string;

  /**
   * Glifo exibido no lugar da fotografia, como nas linhas "Invite friends" e
   * "Find contacts".
   */
  icon?: React.ReactNode;

  /**
   * Cor de fundo do disco quando não há fotografia. Aceita qualquer token de
   * cor do módulo (por exemplo `var(--tik-color-avatar-invite)`).
   */
  background?: string;

  /**
   * Aplica o anel branco de 1px por fora do disco, como no avatar do autor do
   * vídeo sobre o feed (node 4:852).
   * @default false
   */
  ring?: boolean;

  /**
   * Exibe o botão de seguir de 21px sobreposto à base do avatar (node 4:1087).
   * @default false
   */
  followable?: boolean;

  /**
   * Rótulo acessível do botão de seguir.
   * @default 'Seguir'
   */
  followLabel?: string;

  /**
   * Acionado ao clicar no botão de seguir.
   */
  onFollow?: () => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
