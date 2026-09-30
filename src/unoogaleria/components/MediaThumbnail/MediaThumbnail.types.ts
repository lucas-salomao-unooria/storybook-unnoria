import type React from 'react';
import type { UglMediaItem } from '../../media';
import type { UglTheme } from '../../tokens';

/**
 * Proporção da miniatura.
 * - 'square': quadrada, com a mídia cortada ao centro (`object-fit: cover`) — a grade
 * - 'original': na proporção exibida da mídia, já com a rotação e o corte da edição
 */
export type UglMediaThumbnailAspect = 'square' | 'original';

/**
 * Propriedades do componente MediaThumbnail da Unoogaleria.
 */
export interface UglMediaThumbnailProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'> {
  /**
   * A foto ou o vídeo exibido. A edição não destrutiva (`item.edit`) é aplicada
   * na exibição.
   */
  item: UglMediaItem;

  /**
   * Proporção da miniatura.
   * @default 'square'
   */
  aspect?: UglMediaThumbnailAspect;

  /**
   * Modo de seleção: mostra o círculo de seleção e vira botão de alternância
   * (`aria-pressed`).
   * @default false
   */
  selectable?: boolean;

  /**
   * Selecionada (só tem efeito com `selectable`).
   * @default false
   */
  selected?: boolean;

  /**
   * Toque ou clique na miniatura (abrir ou alternar a seleção, conforme o
   * produto). Sem `onClick`, `selectable` nem `onLongPress`, a miniatura é só
   * uma imagem (`role="img"`).
   */
  onClick?: (item: UglMediaItem, event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Pressão longa (500ms com o ponteiro parado), clique secundário ou a tecla
   * de menu de contexto (ContextMenu, Shift+F10). Costuma entrar no modo de
   * seleção. O clique que encerra a pressão longa não dispara `onClick`.
   */
  onLongPress?: (item: UglMediaItem) => void;

  /**
   * Mostra o coração de favorito no canto inferior esquerdo quando
   * `item.favorite`.
   * @default true
   */
  showFavorite?: boolean;

  /**
   * Mostra a duração do vídeo no canto inferior direito.
   * @default true
   */
  showDuration?: boolean;

  /**
   * Mostra os selos de subtipo (selfie, foto com movimento, HDR...) no canto
   * superior esquerdo.
   * @default false
   */
  showSubtype?: boolean;

  /**
   * Dias restantes em Excluídos recentemente. Quando definido, mostra a
   * cápsula "1 dia" / "N dias" no lugar do coração e acrescenta o prazo ao
   * nome acessível.
   */
  daysLeft?: number;

  /**
   * Esmaece a mídia (item indisponível numa escolha, por exemplo).
   * @default false
   */
  dimmed?: boolean;

  /**
   * Momento de referência das datas do nome acessível.
   */
  now?: Date | string;

  /**
   * Fuso de leitura das datas do nome acessível.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
