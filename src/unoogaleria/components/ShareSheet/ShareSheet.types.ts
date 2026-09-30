import React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';
import type { UglMediaItem, UglPerson } from '../../media';
import type { UglBottomSheetHeight, UglBottomSheetVariant } from '../BottomSheet';

/**
 * Uma ação da lista de compartilhamento.
 */
export interface UglShareAction {
  /** Identificador devolvido em `onAction` */
  id: string;
  /** Rótulo exibido e nome acessível */
  label: string;
  /** Glifo à direita do rótulo */
  icon: UglIconName;
}

/**
 * Propriedades do componente ShareSheet da Unoogaleria.
 */
export interface UglShareSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /**
   * Folha aberta. Fechada, o componente não renderiza nada.
   */
  open: boolean;

  /**
   * Pedido de fechamento: botão "Fechar", Esc e toque no véu.
   */
  onClose: () => void;

  /**
   * Mídias a compartilhar: viram a tira de prévia e a contagem do cabeçalho.
   */
  items: UglMediaItem[];

  /**
   * Contatos sugeridos: a linha de retratos com nome ("Enviar para Ana").
   */
  contacts?: UglPerson[];

  /**
   * Ações da lista. Sem valor, usa `uglDefaultShareActions` (Copiar link,
   * Copiar, Duplicar, Adicionar a um álbum, Salvar em arquivos, Imprimir,
   * Apresentação e Ocultar).
   */
  actions?: readonly UglShareAction[];

  /**
   * Toque num contato. A folha não fecha sozinha: quem decide é o produto.
   */
  onContact?: (person: UglPerson) => void;

  /**
   * Toque numa ação, com o `id` dela. A folha não fecha sozinha.
   */
  onAction?: (id: string) => void;

  /**
   * Título da folha.
   * @default 'Compartilhar'
   */
  title?: string;

  /**
   * Nome acessível do botão de fechar.
   * @default 'Fechar'
   */
  closeLabel?: string;

  /**
   * Altura inicial da folha.
   * @default 'auto'
   */
  height?: UglBottomSheetHeight;

  /**
   * Variante visual. 'immersive' para abrir sobre o visualizador.
   * @default 'default'
   */
  variant?: UglBottomSheetVariant;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
