import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Propriedades do componente BottomSheet da Plataforma Unooria.
 *
 * A gaveta: uma folha que sobe de baixo, sobre um véu, e é um diálogo modal de
 * verdade (`role="dialog"` + `aria-modal`). Na missão "Jornal da Escola" do 4º
 * ano, é o que abre quando a criança toca num cartão de notícia na mesa da
 * redação: a matéria original, as pistas e a ação "Adicionar ao jornal".
 *
 * **Fechar é sempre por botão, Esc ou véu — nunca só por gesto.** A escola usa
 * Chromebook e há quem navegue com leitor de tela: arrastar a folha para baixo
 * não é caminho que todos alcancem, então a gaveta não depende dele.
 *
 * **Ao fechar, o foco volta ao elemento que a abriu** (o cartão da mesa), ou
 * ao `finalFocusRef`. Sem isso, quem navega por teclado cai no topo da página
 * e perde o lugar na mesa.
 *
 * Os atributos HTML restantes (`id`, `style`, `data-*`...) vão para a folha,
 * o elemento com `role="dialog"`.
 */
export interface BottomSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** Controla se a gaveta está aberta. Fechada, nada é renderizado. */
  isOpen: boolean;

  /** Chamado quando a pessoa pede para fechar: botão X, Esc ou clique no véu. */
  onClose: () => void;

  /**
   * Título visível no cabeçalho. Nomeia o diálogo automaticamente
   * (`aria-labelledby`), salvo se `aria-label` ou `aria-labelledby` vierem.
   */
  title?: React.ReactNode;

  /** Linha de apoio sob o título; liga `aria-describedby` ao diálogo. */
  description?: React.ReactNode;

  /** O corpo. Passando da altura da folha, ele rola por dentro — o cabeçalho e o rodapé ficam. */
  children: React.ReactNode;

  /** Área fixa embaixo, para a ação principal (ex.: "Adicionar ao jornal"). */
  footer?: React.ReactNode;

  /**
   * Altura máxima da folha, relativa à janela (ou ao contêiner do portal).
   * @default '85%'
   */
  maxHeight?: string;

  /**
   * Nome acessível do botão X.
   * @default 'Fechar'
   */
  closeLabel?: string;

  /**
   * Exibe o botão X no cabeçalho.
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Fecha ao clicar no véu, fora da folha.
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Fecha com a tecla Esc.
   * @default true
   */
  closeOnEsc?: boolean;

  /** Elemento que recebe o foco ao abrir. Sem ele, o primeiro focável da folha. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;

  /** Elemento que recebe o foco ao fechar. Sem ele, o que tinha o foco antes de abrir. */
  finalFocusRef?: React.RefObject<HTMLElement | null>;

  /**
   * Elemento em que o portal é montado.
   * @default document.body
   */
  portalContainer?: HTMLElement | null;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional na folha. */
  className?: string;

  /**
   * Nome acessível direto. Informado, o diálogo NÃO recebe `aria-labelledby`
   * automático — que venceria o `aria-label` no cálculo do nome e o calaria.
   */
  'aria-label'?: string;

  /** Id do elemento que nomeia o diálogo. Vence o título e o `aria-label`. */
  'aria-labelledby'?: string;
}
