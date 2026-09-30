import type React from 'react';
import type { UglGroupBy, UglMediaItem, UglMediaSection } from '../../media';
import type { UglTheme } from '../../tokens';
import type { UglMediaThumbnailProps } from '../MediaThumbnail';

/**
 * Props de miniatura que a grade aceita por item (selos e esmaecimento). Só
 * valores primitivos, para que a memoização da miniatura continue valendo.
 */
export type UglMediaGridThumbnailOverrides = Partial<
  Pick<UglMediaThumbnailProps, 'daysLeft' | 'dimmed' | 'showFavorite' | 'showDuration' | 'showSubtype'>
>;

/**
 * Propriedades do componente MediaGrid da Unoogaleria.
 */
export interface UglMediaGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /**
   * Grupos já montados. Quando informado, `items` e `groupBy` são ignorados.
   */
  sections?: UglMediaSection[];

  /**
   * Mídia solta, que a grade agrupa com `uglGroupMedia` (do mais recente ao mais
   * antigo).
   */
  items?: UglMediaItem[];

  /**
   * Agrupamento de `items`.
   * @default 'day'
   */
  groupBy?: UglGroupBy;

  /**
   * Colunas (controlado). Com `columns`, a grade só pede a troca por
   * `onColumnsChange`.
   */
  columns?: number;

  /**
   * Colunas iniciais (não controlado).
   * @default 3
   */
  defaultColumns?: number;

  /**
   * Pedido de troca de colunas: pinça com dois ponteiros, Ctrl/⌘ + roda e as
   * teclas `+` e `-` com o foco na grade.
   */
  onColumnsChange?: (columns: number) => void;

  /**
   * Níveis de zoom, em colunas. A pinça e a roda andam de um nível para o
   * vizinho.
   * @default [3, 5, 7]
   */
  zoomLevels?: number[];

  /**
   * Espaço entre miniaturas, em px.
   * @default 2 (`--ugl-grid-gap`)
   */
  gap?: number;

  /**
   * Modo de seleção: miniaturas viram alternâncias e cada grupo ganha a ação
   * "Selecionar" / "Desmarcar".
   * @default false
   */
  selectable?: boolean;

  /**
   * Identificadores selecionados. A grade não guarda seleção: quem guarda é o
   * produto.
   * @default []
   */
  selectedIds?: string[];

  /**
   * Toque numa miniatura no modo de seleção.
   */
  onToggle?: (item: UglMediaItem) => void;

  /**
   * Ação do cabeçalho do grupo no modo de seleção. `allSelected` diz se o grupo
   * inteiro JÁ estava selecionado (então a ação era "Desmarcar").
   */
  onToggleSection?: (section: UglMediaSection, allSelected: boolean) => void;

  /**
   * Toque numa miniatura fora do modo de seleção (abrir no visualizador).
   * Recebe o índice na lista achatada e a própria lista, na ordem da grade.
   */
  onOpen?: (item: UglMediaItem, index: number, flatItems: UglMediaItem[]) => void;

  /**
   * Pressão longa, clique secundário ou tecla de menu de contexto numa
   * miniatura (costuma entrar no modo de seleção).
   */
  onLongPress?: (item: UglMediaItem) => void;

  /**
   * Seleção por arraste: chamada sempre que o intervalo entre a miniatura em
   * que o arraste começou (`anchor`) e a que está sob o ponteiro muda. O
   * produto aplica.
   */
  onRangeSelect?: (items: UglMediaItem[], anchor: UglMediaItem) => void;

  /**
   * Liga a seleção por arraste no modo de seleção.
   * @default true
   */
  dragSelect?: boolean;

  /**
   * Cabeçalhos colantes.
   * @default true
   */
  stickyHeaders?: boolean;

  /**
   * Mostra os cabeçalhos dos grupos.
   * @default true
   */
  showHeaders?: boolean;

  /**
   * Nome acessível da região da grade.
   * @default 'Fotos e vídeos'
   */
  ariaLabel?: string;

  /**
   * Conteúdo quando não há mídia (um `EmptyState`, por exemplo).
   */
  emptyState?: React.ReactNode;

  /**
   * Momento de referência de "Hoje" e "Ontem" e das datas dos nomes acessíveis.
   */
  now?: Date | string;

  /**
   * Fuso de leitura das datas.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Rodapé depois da última linha (a contagem `uglFormatCount`, por exemplo).
   */
  footer?: React.ReactNode;

  /**
   * Recuo superior em px, somado a `--ugl-safe-area-top` — a altura de uma
   * barra sobreposta (`TopBar variant="overlay"`).
   * @default 0
   */
  topInset?: number;

  /**
   * Recuo inferior em px, somado a `--ugl-safe-area-bottom` — a altura de uma
   * barra sobreposta (`TabBar` ou `SelectionBar` com `floating`).
   * @default 0
   */
  bottomInset?: number;

  /**
   * Selos e esmaecimento por item (a lixeira passa `daysLeft`, por exemplo).
   * Extensão do contrato: devolva só valores primitivos.
   */
  thumbnailProps?: (item: UglMediaItem) => UglMediaGridThumbnailOverrides | undefined;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
