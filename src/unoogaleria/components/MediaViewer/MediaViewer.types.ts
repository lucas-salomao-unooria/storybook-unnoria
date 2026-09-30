import React from 'react';
import type { UglMediaItem } from '../../media';
import type { UglTheme } from '../../tokens';

/**
 * Propriedades do componente MediaViewer da Unoogaleria.
 *
 * O visualizador não guarda a biblioteca: recebe os itens e devolve intenções
 * (compartilhar, favoritar, excluir…). Cada ação da barra inferior só aparece
 * quando o seu callback é informado — um produto sem exclusão não mostra a
 * lixeira.
 */
export interface UglMediaViewerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Mídias navegáveis, na ordem em que se desliza entre elas.
   */
  items: UglMediaItem[];

  /**
   * Índice da mídia aberta (controlado).
   */
  index?: number;

  /**
   * Índice inicial quando não controlado.
   * @default 0
   */
  defaultIndex?: number;

  /**
   * Chamado quando a mídia aberta muda (deslize, setas, tira de miniaturas).
   */
  onIndexChange?: (index: number) => void;

  /**
   * Visualizador aberto. Fechado, não renderiza nada.
   * @default true
   */
  open?: boolean;

  /**
   * Pedido de fechar: botão voltar, Esc ou arrastar para baixo em 1×.
   */
  onClose: () => void;

  /**
   * Momento de referência para "Hoje" e "Ontem" no título.
   */
  now?: Date | string;

  /**
   * Fuso de leitura das datas.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Compartilhar a mídia aberta.
   */
  onShare?: (item: UglMediaItem) => void;

  /**
   * Favoritar ou desfavoritar, com o próximo estado.
   */
  onFavorite?: (item: UglMediaItem, next: boolean) => void;

  /**
   * Abrir o painel de informações (também por deslizar para cima).
   */
  onInfo?: (item: UglMediaItem) => void;

  /**
   * Abrir o editor. Só aparece em fotos.
   */
  onEdit?: (item: UglMediaItem) => void;

  /**
   * Excluir a mídia aberta.
   */
  onDelete?: (item: UglMediaItem) => void;

  /**
   * Abrir o menu de opções, ancorado no botão "Mais".
   */
  onMore?: (item: UglMediaItem, anchorEl: HTMLButtonElement) => void;

  /**
   * O painel de informações está aberto: pressiona o botão de informações.
   * @default false
   */
  infoOpen?: boolean;

  /**
   * Cromo (barras, setas e tira) escondido — controlado.
   */
  chromeHidden?: boolean;

  /**
   * Cromo escondido ao abrir, quando não controlado.
   * @default false
   */
  defaultChromeHidden?: boolean;

  /**
   * Chamado quando um toque na mídia mostra ou esconde o cromo.
   */
  onChromeHiddenChange?: (hidden: boolean) => void;

  /**
   * Exibe a tira de miniaturas acima das ações (a partir de dois itens).
   * @default true
   */
  showFilmstrip?: boolean;

  /**
   * Nome acessível do diálogo.
   * @default 'Visualizador de fotos'
   */
  ariaLabel?: string;

  /**
   * Camada extra renderizada por cima, dentro do visualizador: folhas, menus e
   * diálogos do produto (informações, compartilhar, confirmar exclusão).
   */
  children?: React.ReactNode;

  /**
   * Força o tema visual. O visualizador é imersivo e invariante; o tema chega
   * às camadas de `children`.
   */
  theme?: UglTheme;

  /**
   * Classe CSS adicional (na camada raiz).
   */
  className?: string;
}
