import React from 'react';
import { UnooriaTheme } from '../../tokens';

export type OutlineLevel = 1 | 2 | 3 | 4 | 5 | number;

export type OutlineActionType =
  | 'move'
  | 'add-subitem'
  | 'indent'
  | 'outdent'
  | 'delete';

export interface OutlineActionItem {
  type: OutlineActionType;
  label: string;
  icon: string;
  tooltip: string;
  disabled?: boolean;
}

export interface OutlineItemData {
  id: string;
  number?: string;
  title: string;
  level?: OutlineLevel;
  isSelected?: boolean;
  isExpanded?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children?: OutlineItemData[];
  data?: Record<string, any>;
}

export interface OutlineItemProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'title' | 'onSelect' | 'prefix'
  > {
  /**
   * Identificador único do item.
   */
  id: string;

  /**
   * Numeração hierárquica do item (ex: "1.", "1.1", "1.1.1").
   */
  number?: string;

  /**
   * Título ou conteúdo textual do item.
   */
  title: React.ReactNode;

  /**
   * Nível de profundidade hierárquica (1, 2, 3, etc.).
   * Determina o recuo à esquerda: (level - 1) * 16px.
   * @default 1
   */
  level?: OutlineLevel;

  /**
   * Nível máximo permitido para indentação.
   * @default 5
   */
  maxLevel?: number;

  /**
   * Define se o item está selecionado / em foco de edição (revela as ações contextuais).
   * @default false
   */
  isSelected?: boolean;

  /**
   * Se true, o título pode ser editado inline (ao dar duplo clique ou apertar F2 / Enter).
   * @default false
   */
  editable?: boolean;

  /**
   * Se true, exibe botão de expandir/recolher caso o item possua filhos.
   * @default false
   */
  collapsible?: boolean;

  /**
   * Se true, indica que os filhos estão expandidos.
   * @default true
   */
  isExpanded?: boolean;

  /**
   * Se true, desativa o item e impede interações.
   * @default false
   */
  disabled?: boolean;

  /**
   * Se true, o item não exibe a barra de ações contextuais.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Tema visual do item (light ou dark).
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Elemento customizado renderizado antes do número/título (ex: ícone de status, checkbox, drag handle).
   */
  prefix?: React.ReactNode;

  /**
   * Elemento customizado renderizado após o título e antes das ações (ex: tag de duração, badge, badge de status).
   */
  suffix?: React.ReactNode;

  /**
   * Ações customizadas ou visíveis. Se não fornecido, exibe as 5 ações oficiais do Figma.
   */
  actions?: OutlineActionItem[];

  /**
   * Renderizador customizado para o grupo de ações.
   */
  renderActions?: (itemProps: OutlineItemProps) => React.ReactNode;

  /**
   * Callback disparado quando o item é clicado / selecionado.
   */
  onItemClick?: (id: string, e: React.MouseEvent) => void;

  /**
   * Callback disparado ao alterar o título inline no modo editável.
   */
  onTitleChange?: (id: string, newTitle: string) => void;

  /**
   * Callback disparado ao alternar expansão/recolhimento de sub-itens.
   */
  onToggleExpand?: (id: string, isExpanded: boolean) => void;

  /**
   * Callback disparado ao acionar uma ação contextual.
   */
  onActionClick?: (actionType: OutlineActionType, id: string, e: React.MouseEvent) => void;

  /**
   * Callback disparado ao clicar em Mover item (`swap_vert`).
   */
  onMove?: (id: string, e: React.MouseEvent) => void;

  /**
   * Callback disparado ao clicar em Adicionar sub-item (`switch_access_shortcut_add`).
   */
  onAddSubItem?: (id: string, e: React.MouseEvent) => void;

  /**
   * Callback disparado ao clicar em Descer na hierarquia / Indentar (`subdirectory_arrow_right`).
   */
  onIndent?: (id: string, e: React.MouseEvent) => void;

  /**
   * Callback disparado ao clicar em Subir na hierarquia / Outdentar (`subdirectory_arrow_left`).
   */
  onOutdent?: (id: string, e: React.MouseEvent) => void;

  /**
   * Callback disparado ao clicar em Excluir item (`delete`).
   */
  onDelete?: (id: string, e: React.MouseEvent) => void;

  /**
   * Conteúdo customizado ou slots adicionais.
   */
  children?: React.ReactNode;
}

export interface OutlineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  /**
   * Lista de itens estruturados para compor a árvore de tópicos.
   */
  items?: OutlineItemData[];

  /**
   * ID do item selecionado no momento (controlado).
   */
  selectedId?: string | null;

  /**
   * ID do item inicialmente selecionado (não-controlado).
   */
  defaultSelectedId?: string | null;

  /**
   * Se true, gera numeração hierárquica automática (ex: 1., 1.1, 1.1.1) para itens sem `number` explícito.
   * @default false
   */
  autoNumber?: boolean;

  /**
   * Se true, permite edição inline dos títulos dos itens.
   * @default false
   */
  editable?: boolean;

  /**
   * Se true, permite recolher/expandir galhos de itens com filhos.
   * @default false
   */
  collapsible?: boolean;

  /**
   * Nível máximo permitido para indentação nos itens da árvore.
   * @default 5
   */
  maxLevel?: number;

  /**
   * Se true, desativa a edição e oculta as ações contextuais em todos os itens.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Tema visual da lista (light ou dark).
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Callback disparado quando um item é selecionado.
   */
  onSelect?: (id: string, item: OutlineItemData) => void;

  /**
   * Callback disparado quando o título de um item é editado inline.
   */
  onTitleChange?: (id: string, newTitle: string) => void;

  /**
   * Callback geral quando qualquer ação é acionada.
   */
  onAction?: (actionType: OutlineActionType, id: string, item: OutlineItemData) => void;

  /**
   * Callback disparado ao reordenar itens.
   */
  onReorder?: (sourceId: string, targetId: string) => void;

  /**
   * Callback disparado ao adicionar sub-item.
   */
  onAddSubItem?: (parentId: string) => void;

  /**
   * Callback disparado ao aumentar indentação (descer nível).
   */
  onIndent?: (id: string) => void;

  /**
   * Callback disparado ao diminuir indentação (subir nível).
   */
  onOutdent?: (id: string) => void;

  /**
   * Callback disparado ao excluir item.
   */
  onDelete?: (id: string) => void;

  /**
   * Callback disparado com a árvore atualizada de itens após qualquer mutação.
   */
  onChange?: (newItems: OutlineItemData[]) => void;

  /**
   * Conteúdo customizado ou composto via subcomponentes.
   */
  children?: React.ReactNode;
}
