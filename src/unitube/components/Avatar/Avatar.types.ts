import React from 'react';

/**
 * Os seis diâmetros de avatar publicados pelo arquivo.
 *
 * Cada um foi medido em um contexto distinto e todos são literais — é proibido
 * consolidá-los em uma escala derivada por cálculo:
 *
 * - 'xs': 24px — componente base `Avatar/UserAvatar` (7:58)
 * - 'sm': 32px — perfil compacto da barra superior (7:87)
 * - 'md': 36px — cartão de vídeo da grade inicial (12:593)
 * - 'lg': 40px — comentário (24:2191)
 * - 'xl': 48px — descrição do vídeo (20:2989)
 * - '2xl': 80px — cabeçalho de canal (17:2796)
 */
export type UniAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Propriedades do componente Avatar do Unitube.
 */
export interface UniAvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Endereço da imagem do avatar. Os retratos são bitmaps colados nos frames do
   * arquivo e não integram o pacote: são sempre informados por prop.
   */
  src?: string;

  /**
   * Texto alternativo da imagem. Obrigatório quando `src` é informado, para que
   * o avatar não fique sem descrição para leitores de tela.
   */
  alt?: string;

  /**
   * Diâmetro do avatar.
   * @default 'xs'
   */
  size?: UniAvatarSize | number;

  /**
   * Iniciais exibidas quando `src` não é informado. Substituto puramente
   * tipográfico, construído sobre os tokens da própria marca — o arquivo não
   * publica estado vazio de avatar.
   */
  initials?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
