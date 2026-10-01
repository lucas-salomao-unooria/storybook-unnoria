import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Propriedades do componente ReactionBar da Unooblog.
 *
 * Curtir sempre aparece. "Comentários" aparece quando há `comments` ou
 * `onOpenComments`; "Salvar" aparece quando há `saved`, `defaultSaved` ou
 * `onToggleSave`.
 */
export interface UblReactionBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Quantidade de curtidas, já contando a da própria pessoa quando `liked` é
   * verdadeiro. Entra no nome acessível do botão ("Curtir, 128 curtidas").
   */
  likes: number;

  /**
   * Post curtido. Quando informado, o estado é do produto (controlado) e o
   * botão só pede a troca por `onToggleLike`; `likes` é a contagem final.
   * Quando omitido, o componente guarda o estado a partir de `defaultLiked` e
   * ajusta a contagem exibida em ±1.
   */
  liked?: boolean;

  /**
   * Estado inicial de "curtido" no modo não controlado.
   * @default false
   */
  defaultLiked?: boolean;

  /**
   * Chamado ao alternar o botão de curtir, com o novo estado (`true` = curtido).
   */
  onToggleLike?: (liked: boolean) => void;

  /**
   * Quantidade de comentários. Entra no nome acessível do botão.
   */
  comments?: number;

  /**
   * Chamado ao acionar "Ver comentários" (por exemplo, rolar até a seção).
   */
  onOpenComments?: () => void;

  /**
   * Post salvo. Quando informado, o estado é do produto (controlado).
   */
  saved?: boolean;

  /**
   * Estado inicial de "salvo" no modo não controlado. Informá-lo (mesmo
   * `false`) já faz o botão de salvar aparecer.
   */
  defaultSaved?: boolean;

  /**
   * Chamado ao alternar "Salvar para ler depois", com o novo estado
   * (`true` = salvo).
   */
  onToggleSave?: (saved: boolean) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
